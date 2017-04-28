/*
*/


var My_Lib = {};

My_Lib.Viewport = {};

	//FIX
	THREE.Vector3.prototype.applyMatrix4_rotation = function ( m ) 
	{
		// input: THREE.Matrix4 affine matrix

		var x = this.x, y = this.y, z = this.z;
		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		return this;
 	}


My_Lib.Resource_Manager = function ()
{
	this.resources = {};
	this.texture_loader = new THREE.TextureLoader();
}

My_Lib.Resource_Manager.prototype.get = function (name)
{
	return this.resources[name];
}

My_Lib.Resource_Manager.prototype.get_async = function (name, callback)
{
	//already loaded?
	var texture = this.get(name);
	if (texture) {
		if (callback) {
			callback(texture);
		}
		return texture;
	}

	//if not load this async
	var self = this;
	texture = this.texture_loader.load(url, function (texture)
	{
		if (callback) {
			callback(texture);
		}
	});
	this.resources[name] = texture;	
	return texture;
}

My_Lib.Resource_Manager.prototype.load_list = function (resource_list, on_load)
{
	var self = this;
	
	var resource_index = 0;
	
	
	function load_texture(url) 
	{
		var texture = self.texture_loader.load(url, next, progress, error);
	}
	
	function next(loaded_resource)
	{
		self.resources[resource_list[resource_index]] = loaded_resource;
		resource_index++;
		if (resource_index < resource_list.length) {
			load_texture(resource_list[resource_index]);
		} else {
			if (on_load) {
				on_load();
			}
		}
	}
	function error(error) 
	{
		console.log("ERROR loading texture", error, self.resource_list[resource_index]);
	}
	function progress()
	{
	}
	
	load_texture(resource_list[0]);
}

My_Lib.Texture_Manager = new My_Lib.Resource_Manager();	
	
My_Lib.Object_Animation = function (object, animation)
{
	this.object = object;
	this.animation = animation;
}

My_Lib.Object_Animation.prototype.update = function (dt)
{
	this.animation(this.object, dt);
}

My_Lib.create_text_image = function (width, height, text, npot, background) 
{
	// create a canvas element
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext('2d');
	if (background) 
	{
		context.fillStyle = background;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}
	context.font = "Bold 40px Arial";
	context.fillStyle = "rgba(0,255,0,0.95)";
    context.fillText('Hello, world!', 0, 50);
    
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	if (npot) {
		texture.wrapS = texture.wrapT = THREE.TextureWrapping.ClampToEdgeWrapping;
		texture.minFilter = THREE.LinearFilter;
	}
	texture.needsUpdate = true; 	
	return texture;
}



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
			m = new THREE.Mesh(p, mat);	
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


/*
Animation
*/

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



My_Lib.Create_Quad = function (width, height, vertex_shader, fragment_shader)
{
	//plane created turn away from camera
	var plane = new THREE.PlaneBufferGeometry( width, height);
	
	var material = new THREE.ShaderMaterial( {
		vertexShader: vertex_shader,
		fragmentShader: fragment_shader
	} ); 

	var quad = new THREE.Mesh( plane, material );
	quad.rotation.y = Math.PI;
	return quad;
}


My_Lib.Render_Target = function (width, height)
{
	this.target = new THREE.WebGLRenderTarget( 
	width, 
	height, 
	{ 
		minFilter: THREE.LinearFilter, 
		magFilter: THREE.NearestFilter, 
		format: THREE.RGBFormat 
	} ); 
	
	this.camera = new THREE.PerspectiveCamera(80, width/height, 0.1, 1000);
}

My_Lib.Render_Target.prototype.render = function (scene, renderer)
{
	renderer.render( scene, 
		this.camera, 
		this.target, 
		true  //forceClear
		);
}


My_Lib.create_overlay_camera = function (width, height)
{
	var camera =  new THREE.OrthographicCamera( 
		width / - 2, 
		width / 2, 
		height / 2, 
		height /- 2, -10000, 10000 );
	return camera;
}

My_Lib.Overlay = function (width, height)
{
	this.camera = My_Lib.create_overlay_camera(width, height);
}

My_Lib.Overlay.prototype.render = function (renderer)
{
	if (!this.scene) {
		return;
	}
	
	renderer.autoClear = false;
	renderer.render(this.scene, this.camera);
	renderer.autoClear = true;
}


My_Lib.mouse_coords_to_vector = function (dom_screen, event) 
{
	var offset = dom_screen.getBoundingClientRect();
	var width = dom_screen.clientWidth;
	var height = dom_screen.clientHeight;
	var x = ((event.clientX - offset.left) / width) * 2 - 1;
	var y = -(((event.clientY - offset.top) / height) * 2 - 1);
	var vector = new THREE.Vector3( x, y, 1 );
	return vector;
}

My_Lib.mouse_coords_to_ray = function (dom_screen, event, camera) 
{
	var offset = dom_screen.getBoundingClientRect();
	var width = dom_screen.clientWidth;
	var height = dom_screen.clientHeight;
	var x = ((event.clientX - offset.left) / width) * 2 - 1;
	var y = -(((event.clientY - offset.top) / height) * 2 - 1);
	var vector = new THREE.Vector3( x, y, 1 );

	vector.unproject(camera);
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	return ray;
}


My_Lib.find_intersection_with_mouse_vector = function(vector, camera, root)
{
	vector.unproject(camera);
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	// create an array containing all objects in the scene with which the ray intersects
	//var intersects = ray.intersectObjects( [grid_text.root], true ); 
	//console.log(fake_plane.root.children[0].geometry);
	var intersects = ray.intersectObjects( [root], true ); 
	return intersects;
}

My_Lib.Mouse_Controller = function (root, over, click, callback)
{
	this.root = root;
	this.over = over;
	this.click = !!click;
	this.callback = callback;
}

/*
main class
this has abstract virtual methods
start - which create renderer and conduct start initializations
update - updated scene objects, animations, phisics
render - control scene rendering
this methods must rewrite on derived classes
need set 
main_camera - camera which point of view render whole scene and user interacts
dom_screen - dom element which contain canvas and display scene


*/

My_Lib.copy_object = function (dest, source)
{
	for(var key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			dest[key] = source[key];
		}
	}
}

My_Lib.create_clone_object = function (source)
{
	var obj = {};
	My_Lib.copy_object(obj, source);
	return obj;
}

My_Lib.copy_field_list = function (source, dest, list)
{
	var field;
	for(var i = 0; i < list.length; i++) {
		field = list[i];
		dest[field] = source[field];
	}
}

My_Lib.create_clone_field_list = function (source, list)
{
	var obj = {};

	var field;
	for(var i = 0; i < list.length; i++) {
		field = list[i];
		obj[field] = source[field];
	}
	
	return obj;
}


My_Lib.clone_field_list_one_level_recursion = function (source, dest, list)
{
	var field;
	for(var i = 0; i < list.length; i++) {
		field = list[i];
		if (typeof field === 'object') {
			dest[field] = My_Lib.create_clone_object(source[field]);
		} else {
			dest[field] = source[field];
		}
	}

}


My_Lib.extend_application = function (methods)
{
	var app = Object.create(My_Lib.Application.prototype);
	My_Lib.copy_object(app, methods);
	My_Lib.Application.call(app);
	return app;
}

My_Lib.extend_proto = function (proto, methods)
{
	var obj = Object.create(proto);
	My_Lib.copy_object(obj, methods);
	My_Lib.Application.call(app);
	return app;
}


My_Lib.Application = function ()
{
	this.clock = new THREE.Clock();	
	this.delta_time = 0;
	this.animated_objects = [];
	
	//create run function
	var run = window.requestAnimationFrame;
	/*run = function(callback){
		window.setTimeout(callback, 1000 / 60);
	}
	*/
	var self = this;
	this.run = function ()
	{
		run(function () 
		{ 
			self.loop();
		});
	}
	
	this.mouse_controllers = [];
	
	/*
	if (this["start"]) {
		this.start();
	}
	*/
}



My_Lib.Application.prototype.loop = function () 
{
	var delta = this.clock.getDelta();
	//fix this - add options to control min frame rate
	if (delta > 0.1) {
		delta = 0.1;
	}
	this.delta_time = delta;
	this.update(delta);
	this.render(delta);
	this.run();		
}


My_Lib.Application.prototype.add_animated_object = function (obj)
{
	//fix probably duplicates
	this.animated_objects.push(obj);
}

My_Lib.Application.prototype.update_all = function (delta)
{
	var obj;
	for(var i = 0, len = this.animated_objects.length; i < len; i++) {
		obj = this.animated_objects[i];
		if (obj["update"]) {
			obj.update(delta);
		}
	}
}

My_Lib.Application.prototype.create_mouse_move_listener = function ()
{
	if (this["mouse_move_listener"]) {
		return;
	}
	var self = this;
	this.mouse_move_listener = true;
	function mouse_move_listener(event) {
		var vector = My_Lib.mouse_coords_to_vector(self.dom_screen, event);		
		self.find_mouse_over_intersections(vector);
	};
	document.addEventListener("mousemove", mouse_move_listener);
}

My_Lib.Application.prototype.find_mouse_over_intersections = function(vector)
{
	vector.unproject(this.main_camera);
	var ray = new THREE.Raycaster( this.main_camera.position, vector.sub( this.main_camera.position ).normalize() );
	var obj;
	for(var i =0, len = this.mouse_controllers.length; i < len; i++){
		obj = this.mouse_controllers[i];
		if (obj.over) {
			// create an array containing all objects in the scene with which the ray intersects
			//var intersects = ray.intersectObjects( [grid_text.root], true ); 
			//console.log(fake_plane.root.children[0].geometry);
			var intersects = ray.intersectObjects( [obj.root], true ); 
			obj.callback(intersects);
		}
	}
}

My_Lib.Application.prototype.add_mouse_controller = function (root, over, click, callback)
{
	var tmp = new My_Lib.Mouse_Controller(root, over, click, callback)
	this.mouse_controllers.push( tmp );
	if (over) {
		this.create_mouse_move_listener();
	}
	return tmp;
}



My_Lib.Application.prototype.set_viewport = function (width, height)
{
	My_Lib.Viewport.width = width;
	My_Lib.Viewport.height = height;
}



My_Lib.Euler_Controller = function (obj, x, y, z)
{
	this.obj = obj;
	this.xspeed = x * Math.PI / 180;;
	this.yspeed = y * Math.PI / 180;;
	this.zspeed = z * Math.PI / 180;;
}

My_Lib.Euler_Controller.prototype.update = function (dt)
{
	this.obj.rotation.x += this.xspeed * dt;
	this.obj.rotation.y += this.yspeed * dt;
	this.obj.rotation.z += this.zspeed * dt;
}

//Class Library
My_Lib.Registered_Classes = {};

My_Lib.Register_Class = function (name, func)
{
	if (My_Lib.Registered_Classes[name]){
		console.log("Register Class ERROR! Class with this name already exists!", name);
	}
	My_Lib.Registered_Classes[name] = func;
}

My_Lib.Get_Class = function (name)
{
	return My_Lib.Registered_Classes[name];
}