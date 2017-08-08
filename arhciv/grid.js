/*
Grid
*/

My_Lib.Grid = function (width, height, xsegments, ysegments, texture, material)
{
	this.xsegments = xsegments;
	this.ysegments = ysegments;
	var xsize = width/xsegments;
	var ysize = height/ysegments;
	var xstart = width/-2.0 + xsize/2;
	var ystart = height/-2.0 + ysize/2;
	
	var mat = material;
	if (!material) {
		mat = new THREE.MeshBasicMaterial({ 
			opacity: 1, 
			transparent: true, 
			depthWrite: true,
			depthTest: false,
			map: texture
		});
	}
	
	this.material = mat;

	var p;
	this.segments = new Array();
	this.root = new THREE.Object3D();
	var tmp = new Array(8);
	
	var usize = 1.0 / xsegments;
	var vsize = 1.0 / ysegments;
	for(var i = 0;i< ysegments; i++) {
		for(var k = 0; k < xsegments; k++) {
			p = new THREE.PlaneBufferGeometry( xsize, ysize);	
			var m = new THREE.Mesh(p, mat);	
			m.position.x = xstart+k * xsize;
			m.position.y = ystart+i * ysize;
			m._row = k;
			m._col = i;
			this.segments.push(m);
			this.root.add(m);
			
			m._pos = new THREE.Vector3(m.position);
			
			//0,0, 1, 0, 0, 1, 1, 1	
			
			var vrow = 1.0 - vsize*i - vsize;
			tmp[0] = usize * k; tmp[1] = vrow;
			tmp[2] = usize * k + usize; tmp[3] = vrow;
			tmp[4] = usize * k; tmp[5] = vrow + vsize;
			tmp[6] = usize * k+usize; tmp[7] = vrow + vsize;
			
			//01, 11, 00, 10
			//01, 11, 00, 10
			/*
			var vrow = vsize*i + vsize;
			tmp[0] = usize * k; tmp[1] = vrow+ vsize;
			tmp[2] = usize * k + usize; tmp[3] = vrow+vsize;
			tmp[4] = usize * k; tmp[5] = vrow;
			tmp[6] = usize * k+usize; tmp[7] = vrow;
			*/
			p.attributes.uv.array = new Float32Array(tmp);			
		}
	}
	
}

My_Lib.Grid.prototype.update = function (dt)
{
	if (this.animation && this.animation_live) {
		this.update_animation(dt);
	}
}


My_Lib.Grid.prototype.start_animation = function ()
{
	if (!this.animation) {
		console.log("Grid Error! Trying start animaton, but animation undefined!");
		return;
	}
	//dont start new animation, until other is lived
	if (this.animation_live) {
		return;
	}
	for(var k = 0; k < this.segments.length; k++) {
		this.animation.start(this.segments[k]);
	}
	this.animation_live = true;
}

My_Lib.Grid.prototype.update_animation = function (dt)
{
	var animation_live = false;
	for(var k = 0; k < this.segments.length; k++) {
		var s = this.segments[k];
		if (s._wait > 0) {
			s._wait -= dt;
			animation_live = true;
		}
		else {
			this.animation.run(dt, s);
			if (!animation_live) {
				animation_live = (s._is_live);
			}
		}
	}
	this.animation_live = animation_live;
	if (!this.animation_live) {
		this.animation.done();
	}
}



My_Lib.Rotate_Animation = function (wait, speed)
{
	this.wait = wait;
	this.animation_speed = speed;	
	//object.rotation_vector = current_rotation_scalar * rotation_axis_vector
	this.rotation_axis = [0, 0, 1];
	//absolute value!
	this.end_rotation_value = Math.PI * 2;
}

My_Lib.Rotate_Animation.prototype.done = function ()
{
	if (this.onAnimationEnding) {
		this.onAnimationEnding();
	}
}

My_Lib.Rotate_Animation.prototype.start = function (s)
{
	s._wait = Math.random() * this.wait;
	if (this.col_waiting) {
		s._wait += this.col_waiting * s._col;
	}
	if (this.row_waiting) {
		s._wait += this.row_waiting * s._row;
	}
	s._is_live = true;	
	s._mrotate = 0;
	if (this.swap_dir) {
		s._dir = (Math.random() * 100 - 50) > 0 ? 1 : -1;
	}
	else {
		s._dir = 1;
	}
	this.live = true;
}

My_Lib.Rotate_Animation.prototype.run = function (dt, s)
{
	if (s._is_live) {
		s._mrotate += this.animation_speed*dt * s._dir;
		if (Math.abs(s._mrotate) >= this.end_rotation_value)	{
			s._mrotate = this.end_rotation_value;
			s._is_live = false;
		}
	}
	s.rotation.x = s._mrotate * this.rotation_axis[0];
	s.rotation.y = s._mrotate * this.rotation_axis[1];
	s.rotation.z = s._mrotate * this.rotation_axis[2];
}


