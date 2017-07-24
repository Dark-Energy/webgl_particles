Application = function (config)
{

    this._lifecycle_event("before_created");
   
    this._init_timer();
    this._create_loop_function();
    
	this.mouse_controllers = [];
    
    My_Lib.event_hub.add_event_listener("kill_me", function (obj) {
        this.remove_animated_object(obj);
    }, this);
}

Application.prototype.start = function (config)
{
   this._set_configuration(config);
}

Application.prototype._lifecycle_event = function (name)
{
    if (this[name]) {
        return this[name]();
    }
    return true;
}


Application.prototype._init_timer = function ()
{
	this.clock = new THREE.Clock();	
	this.delta_time = 0;
	this.animated_objects = [];
}

Application.prototype._create_loop_function = function ()
{
    var self = this;
	this.run = function ()
	{
		run_function(function () 
		{ 
			self.loop();
            //My_Lib.event_hub.emit("new_frame");
		});
	}
	
    //My_Lib.create_run_function(this);
    
    //My_Lib.event_hub.add_event_listener("new_frame", this.loop, this);    
}


Application.prototype.get_default_configuration = function ()
{
    return {
        "dom_element": "screen",
        "render_params": {
            "premultipliedAlpha": true,
            "alpha": true
        },
        "viewport": {
            "width": 800,
            "height": 600
         },
         "clear_color": 0x0000FF,
        "main_camera": {
            "fov": 80,
            "near": 0.1,
            "far": 1000,
            "aspect_ratio": 1.3333333333333333,
            "position": {
                "x": 0,
                "y": 0,
                "z": 0
            }
        }
    };
}

Application.prototype._create_render = function (json)
{
	this.renderer = new THREE.WebGLRenderer(json.render_params);
	this.dom_screen = document.getElementById(json.dom_element);
    if (!!!this.dom_screen || typeof this.dom_screen === 'undefined') {
        console.error("Some terrorous happens! dom element for screen not found! element id is " + json.dom_element);
    }
    console.log("found dome element " + json.dom_element);
    this.dom_screen.appendChild(this.renderer.domElement);
    
    
    this.renderer.setSize(json.viewport.width, json.viewport.height);
    this.set_viewport(json.viewport.width, json.viewport.height);
    this.renderer.setClearColor(json.clear_color);
    
    this._lifecycle_event("render_created");
}

Application.prototype._create_main_scene = function (json)
{
    if (!this._lifecycle_event("before_create_main_scene"))
    {
        return;
    }
    
    if (!this.main_scene) {
        this.main_scene = new THREE.Scene();
    }
    
    var camera = json.main_camera;    
    if (!this.main_camera) {
        this.main_camera = new THREE.PerspectiveCamera(camera.fov, camera.aspect_ratio, camera.near, camera.far);
        this.main_scene.add(this.main_camera);
    } else {
        this.main_camera.fov = camera.fov;
        this.main_camera.near = camera.near;
        this.main_camera.far = camera.far;
        this.main_camera.aspect = camera.aspect_ratio;
        this.main_camera.updateProjectionMatrix();
    }
    
    this.main_camera.position.set(camera.position.x, camera.position.y, camera.position.z);
}

Application.prototype.apply_configuration = function (json)
{
    this.configuration = json;
   this._create_render(json);
   this._create_main_scene(json);
   this._lifecycle_event("created");
}

Application.prototype.load_configuration = function (url)
{
    var xhr = new THREE.XHRLoader();
    
    var self = this;
    
    var config = self.get_default_configuration();
    function onload (data) {
        console.log("configuration loaded from url <<" + url + ">>");
        var obj = JSON.parse(data);
        //user config append to default config and may rewrite them, 
        //though user naven't to rewrite ALL config to change some params
        _.copy_object(config, obj);
        self.apply_configuration(config);
    }
    function progress() {}
    function error(event) {
        console.error("Error on loading config!", event.target.status);
        console.log("Setting default configuration");
        self.apply_configuration(config);
    }
    xhr.load(url, onload, progress, error);
}


Application.prototype._set_configuration = function (config)
{
    //this is url of configuration file
    if (typeof config === 'string') {
        console.log("get configuration from url >> " + config);
        this.load_configuration(config);
    //this is object filled with data
    } else if (typeof config === 'object') {
        console.log("get configuration from user object");
        this.apply_configuration(config);
    //configuration not given, use default
    } else {
        console.log("get default configration");
       this.apply_configuration(this.get_default_configuration());
    }
}

Application.extend = function (methods, child_func)
{

    var Child;
    if (typeof child_func === 'undefined') {
        Child = function ()
        {
            console.log("exec child constructor");
            Application.apply(this, arguments);
        }
    } else {
        Child = child_func;
    }

    console.log("create child");
    //create new object and set prototype chain
	Child.prototype = Object.create(Application.prototype);
    //copy methods to new object
	_.copy_object(Child.prototype, methods);
    Child.prototype.constructor = Child;
   
    return Child;
}

Application.extend_proto = function (proto, methods)
{
	var obj = Object.create(proto);
	_.copy_object(obj, methods);
	Application.call(obj);
	return obj;
}


Application.prototype.loop = function () 
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
    //My_Lib.run();
}



Application.prototype.add_animated_object = function (obj)
{
	//fix probably duplicates
	this.animated_objects.push(obj);
}

Application.prototype.remove_animated_object = function (obj)
{
	for(var i = 0; i < this.animated_objects.length; i++) {
		if (this.animated_objects[i] === obj) {
			this.animated_objects.splice(i, 1);
			break;
		}
	}
}

Application.prototype.update_all = function (delta)
{
	var obj;
	for(var i = 0, len = this.animated_objects.length; i < len; i++) {
		obj = this.animated_objects[i];
		if (obj["update"]) {
			obj.update(delta);
		}
	}
}

Application.prototype.update = function (delta)
{
	this.update_all(delta);
}


Application.prototype.create_mouse_move_listener = function ()
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

Application.prototype.find_mouse_over_intersections = function(vector)
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

Application.prototype.add_mouse_controller = function (root, over, click, callback)
{
	var tmp = new My_Lib.Mouse_Controller(root, over, click, callback)
	this.mouse_controllers.push( tmp );
	if (over) {
		this.create_mouse_move_listener();
	}
	return tmp;
}



Application.prototype.set_viewport = function (width, height)
{
	My_Lib.Viewport.width = width;
	My_Lib.Viewport.height = height;
}

Application.prototype.render = function (delta) 
{
	this.renderer.setClearColor(this.configuration.clear_color);
	this.renderer.autoClear = true;
	this.renderer.render(this.main_scene, this.main_camera);
}
