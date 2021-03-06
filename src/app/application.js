/*
main class
this has abstract virtual methods
start - which create renderer and conduct start initializations
update - updated scene objects, animations, phisics
render - control scene rendering
this methods must rewrite on derived classes
need set 
PROPERTIES
main_camera - camera which point of view render whole scene and user interacts
dom_screen - dom element which contain canvas and display scene
renderer - three.js renderer
canvas - is created by three.js renderer, it have to append to dom_screen children, fuck it
canvas width and height defining on creating it by renderer, fuck it



*/

import {My_Lib} from '../base/my_lib.js';
import {main_event_hub, Event_Hub} from '../base/event_hub.js';
import {Mouse_Intersector} from '../base/mouse_intersector.js';


function Application (config)
{

    this._lifecycle_event("before_created");
   
    this._init_timer();
    this._create_loop_function();
    
	this.mouse_controllers = [];
    
    main_event_hub.add_event_listener("kill_me", function (obj) {
        this.remove_animated_object(obj);
    }, this);
}

Application.prototype.start = function (config)
{
    console.log("start application...");
   this._set_configuration(config);
}

Application.prototype._lifecycle_event = function (name, event)
{
    if (this[name]) {
        return this[name](event);
    }
    return false;
}


Application.prototype._init_timer = function ()
{
	this.clock = new THREE.Clock();	
	this.delta_time = 0;
	this.animated_objects = [];
}


var run_function = window.requestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	}
	


Application.prototype._create_loop_function = function ()
{
    var self = this;
	this.run = function ()
	{
		run_function(function () 
		{ 
			self.loop();
            //main_event_hub.emit("new_frame");
		});
	}
	
    //My_Lib.create_run_function(this);
    
    //main_even_hub.add_event_listener("new_frame", this.loop, this);    
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
    if (this.dom_screen || this.renderer) {
        alert("Create render alert! Something strange happenes!");
    }
    if (!this.dom_screen) {
        this.dom_screen = document.getElementById(json.dom_element);
    }
    if (!this.renderer) {
        this.renderer = new THREE.WebGLRenderer(json.render_params);
    }
    if (!!!this.dom_screen || typeof this.dom_screen === 'undefined') {
        console.error("Some terrorous happens! dom element for screen not found! element id is " + json.dom_element);
    }
    //console.log("found dome element " + json.dom_element);
    this.dom_screen.appendChild(this.renderer.domElement);
    this.canvas = this.renderer.domElement;
    
    
    this.renderer.setSize(json.viewport.width, json.viewport.height);
    this.set_viewport(json.viewport.width, json.viewport.height);
    this.renderer.setClearColor(json.clear_color);
    
    this._lifecycle_event("render_created");
}

Application.prototype._create_main_scene = function (json)
{
    var event = {prevent: false};
    this._lifecycle_event("before_create_main_scene", event);
    /*
    if (event.prevent) {
        return;
    }
    */
    if (!this.main_scene) {
        this.main_scene = new THREE.Scene();
    }
    
    var camera = json.main_camera;    
    if (!this.main_camera) {
        this.main_camera = new THREE.PerspectiveCamera(camera.fov, camera.aspect_ratio, camera.near, camera.far);
        this.main_scene.add(this.main_camera);
        this.main_camera.name = "main_camera";
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
    
    var configuration_is_applied = false;
    
    function onload (data) {
        console.log("configuration loaded from url <<" + url + ">>");
        var obj = JSON.parse(data);
        //user config append to default config and may rewrite them, 
        //though user naven't to rewrite ALL config to change some params
        _.copy_object(config, obj);
        self.apply_configuration(config);
        console.log(configuration_is_applied, "onload");        
        configuration_is_applied = true;
    }
    function progress() {}
    function error(event) {
        console.error("Error on loading config!", event.target.status);
        console.log("Setting default configuration");
        console.log(configuration_is_applied, "error");        
        configuration_is_applied = true;        
        self.apply_configuration(config);
    }
    xhr.load(url, onload, progress, error);
}


Application.prototype._set_configuration = function (config)
{
    var default_config = this.get_default_configuration();
    
    //this is url of configuration file
    if (typeof config === 'string') {
        console.log("get configuration from url >> " + config);
        this.load_configuration(config);
        
        //this is object filled with data
    } else if (typeof config === 'object') {
        console.log("get configuration from user object");
        _.copy_object(default_config,config);
        this.apply_configuration(default_config);
    //configuration not given, use default
    } else {
        console.log("_set_configuration: set default configration");
       this.apply_configuration(default_config);
    }
}

Application.extend = function (methods, child_func)
{

    var Child;
    if (typeof child_func === 'undefined') {
        Child = function ()
        {
            Application.apply(this, arguments);
        }
    } else {
        Child = child_func;
    }

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
    this.do_update(delta);
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

Application.prototype.pre_update = function (delta)
{
	this.update_all(delta);
    My_Lib.particle_manager.update(delta);
    //event
    if (this.before_update !== undefined) {
        this.before_update(delta);
    }
}


Application.prototype.do_update = function (dt)
{
    this.pre_update(dt);
    this.update(dt);
}

Application.prototype.update = function (delta)
{
}


Application.prototype.create_mouse_move_listener = function ()
{
	if (this["mouse_move_listener"]) {
		return;
	}
	var self = this;
	this.mouse_move_listener = true;
	function mouse_move_listener(event) {
		var vector = Mouse_Intersector.mouse_coords_to_vector(self.dom_screen, event);		
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



export {Application};