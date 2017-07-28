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
