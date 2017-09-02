var Engine =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return My_Lib; });
/*
*/


var My_Lib = {};

My_Lib.Viewport = {};


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


My_Lib.Mouse_Controller = function (root, over, click, callback)
{
	this.root = root;
	this.over = over;
	this.click = !!click;
	this.callback = callback;
}



/*
ugly hack
*/

My_Lib.event_hub = new Event_Hub();

function Event_Hub() {
    this.events = {};
}



Event_Hub.prototype.add_event_listener = function (name, func, obj)
{
    if (!this.events[name]) {
        this.events[name] = [];
    }
    this.events[name].push( {name: name, func: func, obj: obj} );
}

Event_Hub.prototype.on  = Event_Hub.prototype.add_event_listener;

Event_Hub.prototype.emit = function(name, obj)
{
    var listeners = this.events[name];
    if (listeners) {
        for(var i = 0; i < listeners.length; i++) {
            var t = listeners[i];
            t.func.call(t.obj, obj);            
        }
    }
}


var run_function = //window.requestAnimationFrame;
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	}


My_Lib.create_run_function = function (app) 
{
    My_Lib.run = function () { run_function( function () { app.loop(); }); }
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


My_Lib.create_class = function(parent, child, props, name)
{
    if (parent) {
        child.prototype = Object.create(parent.prototype);
    } 
    _.copy_object(child.prototype, props);
    child.prototype.contructor = child;                
    My_Lib.Register_Class(child, name);
}

My_Lib.Abstract_Fabric = function (data)
{
    var constructor = My_Lib.Get_Class(data.type);
    if (constructor) {
        var object = new constructor();
        object.parse(data);
        return object;
    }
    return undefined;
}

My_Lib.Print_Classes = function ()
{
    for(var key in this.Registered_Classes) {
        console.log("class registered :", key, this.Registered_Classes[key]);
    }
}






/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Affector; });
/* unused harmony export Force_Affector */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);


//base class for particle affector
function Particle_Affector()
{
    this.id = _.generateUUID();
}


Particle_Affector.prototype.affect = function (dt, pdata, vert, color)
{
	return true;
}

Particle_Affector.prototype.toJSON = function (child)
{
	if (child) {
		return {};
	}
	var data = {
        id: this.id,
		"name": "Particle_Affector",
		params : {}
	};
    if (child) {
        return params;
    }
	return data;
}

Particle_Affector.prototype.parse = function (json)
{
}

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Particle_Affector", Particle_Affector);

function Force_Affector()
{
    Particle_Affector.call(this);
	this.forces = new Array();
}

Force_Affector.prototype = Object.create(Particle_Affector.prototype);

_.copy_object(Force_Affector.prototype, {
	constructor: Force_Affector,
	add_force: function (force)
	{
		this.forces.push(force);
	},
	apply_forces: function (dt, particle, vert, color)
	{
		var acceleration = {x:0, y:0, z:0};
		for(var i = 0; i < this.forces.length; i++) {
			this.forces[i].calc(dt, particle, acceleration);
		}
		//integrate
		particle.velocity.x += acceleration.x * dt;
		particle.velocity.y += acceleration.y * dt;
		particle.velocity.z += acceleration.z * dt;
	},
	affect: function (dt, particle, vert, color)
	{
		this.apply_forces(dt, particle, vert, color);
		return true;
	},
	toJSON: function (child)
	{
		var data = {};
		data.name = "Force_Affector";		
        data.uuid = this.uuid;
		data.params = Particle_Affector.prototype.toJSON.call(this, this);
		if (this.forces.length > 0) {
			data.params.forces = new Array();
			for(var i = 0; i < this.forces.length; i++) {
				data.params.forces.push( this.forces[i].toJSON() );
			}
		}
		return data;
	},
	parse: function (json)
	{
		var f, item;
		if (json.forces) {
				
			for(var i =0; i < json.forces.length; i++) {
				item = json.forces[i];
				f = __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Get_Class(item.name);
				if (f) {
					f = new f();
					f.parse(item);
					this.add_force(f);
				} 
			}
		}
	}
});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Force_Affector", Force_Affector);



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Emitter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);


//Base class for Particle Emitters
function Particle_Emitter(emit_per_second)
{
    this.uuid = _.generateUUID();
    this.name = '';
	this.emit_delta = 0;
	this.emit_count = 0;
	this.emit_per_second = emit_per_second || 5;
	//linear interpolation = min + random * (max-min)	
	this.lifetime = {"min": 0, "max":2.0};
}

Particle_Emitter.prototype.emit_life = function ()
{
	return this.lifetime.min + Math.random() * (this.lifetime.max - this.lifetime.min);
}

Particle_Emitter.prototype.calc_emitted_particles = function (dt)
{
	//count particles need emit
	this.emit_delta += this.emit_per_second*dt;
	var need_emit = Math.floor(this.emit_delta);
	if (need_emit > 0) {
		this.emit_delta -= need_emit;
		//this.emit_count += need_emit;
		//need_emit = this.emit_count;
	}
	return need_emit;
}


Particle_Emitter.prototype.emit = function (p, c, matrix)
{
    p.position.set(0, 0, 0);
    p.velocity.set(0, 1, 0);
    
    if (matrix) {
        p.position.applyMatrix4(matrix);
        p.velocity.applyMatrix4_rotation(matrix);
    }
}


Particle_Emitter.prototype.toJSON = function (child)
{
	var params = {
        "uuid": this.uuid,
		"emit_per_second": this.emit_per_second,
		"lifetime": {
			"min": this.lifetime.min,
			"max": this.lifetime.max
		},
	};
    if (this.name) {
        params.name = this.name;
    }
	if (child) {
		return params;
	}
	var data = {};
	data.name = "Particle_Emitter";
	data.params = params;	
	return data;
}

Particle_Emitter.prototype.parse = function (data)
{
	this.emit_per_second = data.emit_per_second;
    this.name = data.name;
    this.uuid = data.uuid || _.generateUUID();
	_.copy_object(this.lifetime, data.lifetime);
}

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Particle_Emitter", Particle_Emitter);




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mouse_Camera_Controller; });
//Unfortunately, canvas properties can change permanenty. 
//Because, you need do refresh_canvas on each call!
//each time you need recacl BoundingRect and clientRect of the fucking canvas
//also, camera may be not that camera, who render scene. it may be other camera
//because you need refresh camera on eash call
//i could done this normal function, but this object may do different job
//this is single-time object
//it easy economyfy number of arguments on calling functions

//not, this class doesn't store reference to canvas, 
//this store only information about canvas size and position 
//i.e. BoundingClientRect and clientWidth,clientHeight
//yes, this class store reference to camera

//probably, it may be mixin to camera


function Mouse_Camera_Controller(canvas, camera)
{
    if (canvas === undefined) {
        console.error("Mouse_Camera_Controller. Propable premordial creating object. canvas is undefined. Do nothing");
    } else {
        this.set_canvas_info(canvas);
    }
    this.camera = camera;
}

_.copy_object(Mouse_Camera_Controller.prototype,{
    constructor : Mouse_Camera_Controller,
    set_canvas_info: function (canvas)
    {
        var offset = canvas.getBoundingClientRect();
        this.offset = 
        {
            left: offset.left,
            top : offset.top
        };
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
    },
    refresh_canvas: function (new_canvas)
    {
        this.set_canvas_info(new_canvas);
    }
    ,
    get_normalized_screen_coordinates: function (x,y)
    {
        //step 1 : normalized
        x = (x - this.offset.left) / this.width;
        y = (y - this.offset.top) / this.height;
        //step 2 : from unsigned to signed, translate origin from top left corner to center 
        var x = x * 2.0 - 1.0;
        var y = -(y * 2.0 - 1.0);
        var vector = new THREE.Vector3( x, y, 1 );
        return vector;        
    },
    
    //do some what prevent method, only give mouse event instead x,y coordiantes
    get_normalize_mouse_position: function (event) 
    {
        return this.get_normalized_screen_coordinates(event.clientX, event.clientY);
    },
    
    //return new unproject vector, not change given
    //used THREE.Vector3.unproject method
    //including apply inver camera matrix
    //on my view, that wrong, because method do it big then promise
    //unproject must do only unproject, not else thing
    //because my need new method, who will do only unproject 
    unproject: function(vector)
    {
        var r = new THREE.Vector3();
        r.copy(vector);
        r.unproject(this.camera);
        //this aready done 
        //r.applyMatrix4(camera.matrixWorldInverse);    
        return r;
    },
    
    
    //get ray with origin in camera position and direction, 
    //pointed to far away where unproject screen point are
    get_ray_from_camera_in_screen_coordinates: function (x,y) 
    {
        var vector = this.get_normalized_screen_coordinates(x,y);
        vector = this.unproject(vector);
        var ray = new THREE.Ray( this.camera.position, vector.sub( this.camera.position ).normalize() );
        return ray;
    },
    
    //do same what prevent method, only give mouse event for convience
    //see it as overriding function in C++
    get_ray_from_camera_in_mouse_position: function (event)
    {
        return this.get_ray_from_camera_in_screen_coordinates(event.x, event.y);
    },


});




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particles_Points; });
    
function Particles_Points (geometry, material)
{
    THREE.Points.call(this, geometry, material);
    this.type = 'particles_points';
    
    this.boundingSphere = new THREE.Sphere();
    this.boundingSphere.radius = 10.0;
}

Particles_Points.prototype = Object.create( THREE.Points.prototype )

Particles_Points.prototype.constructor = Particles_Points;

Particles_Points.prototype.getBoundingSphere = function()
{
    return this.boundingSphere;
}

Particles_Points.prototype.toJSON = function (meta)
{
    var mat = this.material;
    var geom = this.geometry;
    this.material = undefined;
    this.geometry = undefined;
    var object =  THREE.Object3D.prototype.toJSON.call(this, meta);
    this.material = mat;
    this.geometry = geom;
    return object;
}

//WTF?
Particles_Points.prototype.raycast = function (raycaster, intersects)
{
    var sphere = new THREE.Sphere()
    sphere.copy( this.boundingSphere );
    sphere.applyMatrix4( this.matrixWorld ); 
    var r = raycaster.ray.intersectsSphere( sphere );
    if ( r === false ) return;
    console.log("INTERSECTION1", this.name, sphere);
    return;
    
    var shit  = new THREE.Vector3();
    shit.copy(this.position);
    var tr = new THREE.Ray( new THREE.Vector3(0, 0, 20), shit);
    console.log("test ", tr.intersectsSphere(sphere), sphere);
    console.log("hit sphere "  + this.name, sphere, raycaster.ray);
    return raycaster.ray.intersectsSphere( sphere );
    
    
    console.log("hit sphere " + this.type, "shpere is ", sphere, "ray is ", r);
    if (r) {
            var tmp = new THREE.Vector3(this.position);
            tmp.sub(r);
   			intersects.push( {
				distance: Math.sqrt( tmp.dot(tmp) ),
				point: this.position,
				object: this
			} ); 
    }
}





/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return main_event_hub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Event_Hub; });
function Event_Hub() {
    this.events = {};
}



Event_Hub.prototype.add_event_listener = function (name, func, obj)
{
    if (!this.events[name]) {
        this.events[name] = [];
    }
    this.events[name].push( {name: name, func: func, obj: obj} );
}

Event_Hub.prototype.on  = Event_Hub.prototype.add_event_listener;

Event_Hub.prototype.emit = function(name, obj)
{
    var listeners = this.events[name];
    if (listeners) {
        for(var i = 0; i < listeners.length; i++) {
            var t = listeners[i];
            t.func.call(t.obj, obj);            
        }
    }
}

var main_event_hub = new Event_Hub();



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mouse_Intersector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__simple_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mouse_camera_controller_js__ = __webpack_require__(3);
var Mouse_Intersector = {};





Mouse_Intersector.get_normalized_screen_coords = function (canvas, x, y)
{
	var offset = canvas.getBoundingClientRect();
	var width = canvas.clientWidth;
	var height = canvas.clientHeight;
    //normalize coordinates
    var x = (x - offset.left) / width;
    var y = (y - offset.top) / height;
	var x = x * 2 - 1;
	var y = -(y * 2 - 1);
	var vector = new THREE.Vector3( x, y, 1 );
	return vector;
}

Mouse_Intersector.mouse_coords_to_vector = function (canvas, event) 
{
    return this.get_normalized_screen_coords(canvas, event.clientX, event.clientY);
}


Mouse_Intersector.unproject = function(vector, camera)
{
    var r = new THREE.Vector3();
    r.copy(vector);
	r.unproject(camera);
    //this done yet
    //r.applyMatrix4(camera.matrixWorldInverse);    
    return r;
}

Mouse_Intersector.mouse_coords_to_ray = function (canvas, event, camera) 
{
    var vector = this.mouse_coords_to_vector(canvas, event);
    vector = this.unproject(vector, camera);
	var ray = new THREE.Ray( camera.position, vector.sub( camera.position ).normalize() );
	return ray;
}



Mouse_Intersector.find_intersection_with_mouse_vector = function(vector, camera, scene)
{
	vector.unproject(camera);
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	// create an array containing all objects in the scene with which the ray intersects
	//var intersects = ray.intersectObjects( [grid_text.root], true ); 
	//console.log(fake_plane.root.children[0].geometry);
	var intersects = ray.intersectObjects( [scene], true ); 
	return intersects;
}


Mouse_Intersector.find_intersected_object = function (scene, ray)
{

    var collider = new __WEBPACK_IMPORTED_MODULE_0__simple_collider_js__["a" /* Simple_Collider */](scene);
    var intersects = collider.check_ray(ray);
    return intersects;
}




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Simple_Collider; });
function Simple_Collider(root, params)
{
    this.root = root;
    if (params === undefined) {
        params = {};
    }
    this.params = 
    {
        recursive: params.recursive === undefined ? true : params.recursive,
        check_invisible: params.check_invisible === undefined ? true : params.check_invisible 
    };
    this.intersected_objects = [];
    this._tested_sphere = new THREE.Sphere();    
}

Simple_Collider.prototype.prepare_check = function (ray)
{
    this.intersected_objects = [];
    this.intersected_map = {};
    this._fakecaster = {ray: ray};    
}

Simple_Collider.prototype.check_ray = function (ray)
{
    this.prepare_check(ray);
    
    this.find_intersection_with_bounding_sphere( this.root); 
    
    return this.intersected_objects;
}

Simple_Collider.prototype.add_intersected = function (obj)
{
    if (!this.intersected_map[obj.uuid]) {
        this.intersected_map[obj.uuid] = obj;
        this.intersected_objects.push(obj);
    }
}

Simple_Collider.prototype.check_object_bounding_sphere = function(obj)
{
    //get bounding sphere
    if (obj.getBoundingSphere) {
        this._tested_sphere.copy( obj.getBoundingSphere() );
    } else if (obj.geometry)  {
        //fuck this shit, why don't exists method getBoundingSphere, which encapsulates this?
        if ( obj.geometry.boundingSphere === null ) obj.geometry.computeBoundingSphere();
         //copy sphere from object geometry and transform it with object. matrixWorld
        this._tested_sphere.copy( obj.geometry.boundingSphere );
        //console.log("get bounding sphere", this._tested_sphere);
    } else {
        return false;
    }

    //test bounding spere
    obj.updateMatrixWorld(true);        
    this._tested_sphere.applyMatrix4( obj.matrixWorld );
    //find intersection
    var inter = this._fakecaster.ray.intersectsSphere( this._tested_sphere );
    //console.log("inter with sphere, level", level, inter, sphere.center, raycaster.ray);
    //add to intersected list, if success
    if (inter) {
        this.intersected_objects.push(obj);
        return true;
    } else {
        return false;
    }
}


Simple_Collider.prototype.find_intersection_with_bounding_sphere = function(object, top ) {

    if ( !object.non_collideble && (object.visible || this.params.check_invisible)) {
        this.check_object_bounding_sphere(object);
    }
    if ( !this.params.recursive) return;
    
    
    //test children
    var children = object.children;
    for ( var i = 0; i < children.length; i ++ ) {
        var child = children[i];
        this.find_intersection_with_bounding_sphere( child );
    }
}





/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Color_Domain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Table_Color; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);


function Color_Domain(r,g,b)
{
    this.color = new THREE.Color(r,g,b);
    this.uuid = _.generateUUID();
    this.name = '';
    this.type = "Color_Domain";
}

_.copy_object(Color_Domain.prototype, {
    toJSON: function (child)
    {
        var data = {};
        data.uuid = this.uuid;
        if (this.name !== '') {
            data.name = this.name;
        }
        data.type = this.type;
        data.color = {r: this.color.r, g: this.color.g, b: this.color.b};
        return ;
    },
    parse: function (json)
    {
        this.uuid = json.uuid;
        if (json.name !== undefined) {
            this.name = json.name;
        }
        if (json.color !== undefined) {
            this.color.set(json.color.r, json.color.g, json.color.b);
        }
    },
    emit: function (color)
    {
        color.r = this.color.r;
        color.g = this.color.g;
        color.b = this.color.b;
    },
    fill: function (color, offset) 
    {
        color[offset+0] = this.color.r;
        color[offset+1] = this.color.g;
        color[offset+2] = this.color.b;
    }
});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class('Color_Domain', Color_Domain);

function Table_Color(table)
{
    if (table !== undefined) {
        this.copy_table(table);        
    } else {
        this.default_table();
    }
}

Table_Color.prototype = Object.create(Color_Domain);

_.copy_object(Table_Color.prototype, {
    constructor: Table_Color,
    copy_table: function (table)
    {
        this.table = new Array(table.length);
        for(var i = 0; i < table.length; i++) {
            this.table = new THREE.Color(table[i]);
        }
    },
    emit: function (color)
    {
        var index = Math.ceil(Math.random() * this.table.length) % this.table.length;
        var src = this.table[index];
        color.r = src.r;
        color.g = src.g;
        color.b = src.b;
    },
    fill: function (color, offset) 
    {
        var index = Math.ceil(Math.random() * this.table.length) % this.table.length;
        var src = this.table[index];
        color[offset] = src.r;
        color[offset+1] = src.g;
        color[offset+2] = src.b;
    },
    default_table: function ()
    {
        this.table = new Array(8);
        this.table[0] = new THREE.Color(1, 0, 0);
        this.table[1] = new THREE.Color(0, 1, 0);
        this.table[2] = new THREE.Color(0, 0, 1);
        this.table[3] = new THREE.Color(1, 0, 1);
        this.table[4] = new THREE.Color(1, 1, 0);
        this.table[5] = new THREE.Color(1, 0.4, 0.4);
        this.table[6] = new THREE.Color(0.5, 0.7, 0.98);
        this.table[7] = new THREE.Color(0.9, 0.4, 0.4);
    },
    get: function ()
    {
        var r = {r: 0, g: 0, b: 0};
        this.emit(r);
        return r;
    }
});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Table_Color", Table_Color);



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Shaders; });
var Particle_Shaders = {};

(function () 
{

//particle attributes:
//position
//color
//left, size
var vertex_shader = [
//'attribute vec4 position;',
'attribute vec4 color;',
'attribute float params;',
'varying vec4 vcolor;',
'uniform float lifetime;',
'uniform float point_size;',
'uniform vec2 screen_size;',
'#ifndef DYNAMIC_COLORS',
    'uniform vec3 particle_color;',
'#endif',
'void main () {',
	'gl_Position = projectionMatrix * viewMatrix * vec4( position, 1.0 );',
'#ifdef DYNAMIC_COLORS',
	'vcolor.rgb = color.rgb;',
'#else',
    'vcolor.rgb = particle_color.rgb;',
'#endif',
'#ifdef NO_FADE_COLOR',
	'vcolor.a = 1.0;',
'#else',
	//params contains life length which decreased by time
	'float tmp = params / lifetime;',
	'tmp = min(tmp, 1.0);',	
	'vcolor.a = tmp;',
'#endif',
	'float t =  screen_size.y* projectionMatrix[1][1] / gl_Position.w;',
	't = t * point_size;',
	'if (params > 0.0) {',
		'gl_PointSize = t;',
	'}',
	'else {',
		//'vcolor.a = 0.0;',
		'gl_PointSize = 0.0;',
        'gl_Position.z = -1000.0;',
	'}',
'}'
];

var fragment_shader = [
	'varying vec4 vcolor;',
	'#ifdef PARTICLE_TEXTURE',
		'uniform sampler2D sprite;',
	'#endif',
	'void main() {',
	'#ifdef PARTICLE_TEXTURE',
		'vec4 tex = texture2D( sprite, gl_PointCoord );',
		'vec3 fragment_color = tex.rgb;',
		'fragment_color.rgb *= vcolor.rgb;',
		'float alpha = tex.a;',	
	'#else',
		'vec3 fragment_color = vcolor.rgb;',
		'float alpha = 1.0;',
	'#endif',
	'#ifdef PRE_ALPHA',
		'fragment_color.rgb *= alpha;',
	'#endif',
	'#ifndef NO_FADE_COLOR',
		'float fragment_alpha = alpha * vcolor.a;',
	'#else',
		'float fragment_alpha = alpha;',
	'#endif',
		'gl_FragColor = vec4(fragment_color.rgb, fragment_alpha);',
	'}',
];

Particle_Shaders.vertex = vertex_shader.join( '\n' );
Particle_Shaders.fragment = fragment_shader.join( '\n' );
})();



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_System; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__particle_affector_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particles_points_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particle_shaders_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__color_domain_js__ = __webpack_require__(8);








function Particle_System(data)
{
    this.uuid = _.generateUUID();    
    
    this.params = this.config_params(data);

  
	this.emitter = this.params.emitter;
	this.affector = this.params.affector;    
    this.particle_lifetime = this.params.particle_lifetime;
    this.texture = this.params.texture;
	
	this.dynamic_color = false;

	var count = this.params.count;
	
	this.material = this.create_particle_material();
	this.node = new __WEBPACK_IMPORTED_MODULE_3__particles_points_js__["a" /* Particles_Points */](this.create_particle_geometry(count), this.material);
    this.node.name = this.name;
    this.node.boundingSphere.radius = this.params.bounding_radius;
    this.node.non_collideble = this.params.non_collideble;
    
}


Particle_System.prototype.config_params = function (data)
{
    var params = 
    {
    };
    //default
    params.particle_lifetime = 3.0;
    params.no_fade_color = false;
    params.pre_alpha = true;
    params.depth_test = true;
    params.depth_write = false;
    params.color  = {"r":1, "g":1, "b":1};
	params.blending = "one_alpha";
    params.size = 1;
    params.count = 100;
    params.name = '';
    params.bounding_radius = 2.0;
    params.discrete_emission = false;
    params.apply_world_matrix_on_emit = true;
    params.non_collideble = false;
    
    for(var key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)){
            if (data[key] !== undefined) {
                params[key] = data[key];
            }
        }
    }
    
	params.emitter = data.emitter || new __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__["a" /* Particle_Emitter */](1);
	params.affector = data.affector || new __WEBPACK_IMPORTED_MODULE_2__particle_affector_js__["a" /* Particle_Affector */]();
    
    return params;
}

Particle_System.prototype.set_name = function (name)
{
    this.name = name;
    this.node.name = name;
}

Particle_System.prototype.suicide = function ()
{
	this.node.parent.remove(this.node);
    main_event_hub.emit("kill_me", this);
}


Particle_System.prototype.create_particle_data = function (count)
{
    var particle_data = new Array(count);
    var p;
    //var matrix = this.node.worldMatrix();
    for(var i =0;i < count; i++) {
		p = {};
		p.position = new THREE.Vector3(0,0,0);
		p.velocity = new THREE.Vector3(0,0,0);
        
        //p.position.copy(this.node.position);
        //p.position.applyMatrix4(matrix);
        //p.velocity.applyMatrix4_rotation(matrix);
        
		p.lifetime = 0;        
		particle_data[i] = p;
    }
    this.particle_data = particle_data;
}

Particle_System.prototype.create_particle_geometry = function(count)
{
    this.create_particle_data(count);
    
	var vertices = new Float32Array(count * 3); // position
	var colors = new Float32Array(count * 3);
	var params = new Float32Array(count);
	
    var particle;
    for (var i = 0; i < count; i++) {
        particle = this.particle_data[i];
		//create particle
		vertices[i*3] = particle.position.x;
		vertices[i*3+1] = particle.position.y;
		vertices[i*3+2] = particle.position.z;

		params[i] = 0.0;
        
        if (this.params.color_domain) {
            this.params.color_domain.fill(colors, i*3);
        } else {
            colors[i*3] = this.params.color.r;
            colors[i*3+1] = this.params.color.g;
            colors[i*3+2] = this.params.color.b;
       }
	}

	this.geometry = {};
	this.geometry.vertices = new THREE.BufferAttribute(vertices, 3).setDynamic(true);
	this.geometry.colors = new THREE.BufferAttribute(colors, 3)
	if (this.dynamic_color) {
		this.geometry.colors.setDynamic(true);
	}
	this.geometry.params = new THREE.BufferAttribute(params, 1).setDynamic(true);
	var geom = new THREE.BufferGeometry(); 	
	this.geometry.buffer = geom;	
	geom.addAttribute('position', this.geometry.vertices);
	geom.addAttribute('color', this.geometry.colors);
	geom.addAttribute('params', this.geometry.params);	

    return geom;
}


Particle_System.prototype.discrete_emit = function (count)
{
    this.emit_particles(0, count);
	this.geometry.vertices.needsUpdate = true;
	this.geometry.params.needsUpdate = true;
	this.geometry.colors.needsUpdate = true;
}


Particle_System.prototype.emit_particles = function (dt, need_emit)
{
	//emit particles
	var p;
	var verts = this.geometry.vertices.array;
	var params = this.geometry.params.array;
	
    var old_need_emit = need_emit;
    this.node.updateMatrixWorld(true);
    var matrix = this.node.matrixWorld;
	for(var i =0; i < this.particle_data.length && need_emit > 0; i++) {
		if (!(params[i] > 0)) {
        
			p = this.particle_data[i];
			this.emitter.emit(p, null, matrix);
			p.lifetime = this.particle_lifetime;
            
			verts[i*3] = p.position.x;
			verts[i*3+1] = p.position.y;
			verts[i*3+2] = p.position.z;
			params[i] = p.lifetime;
			need_emit--;
			//colors[i*3] = this.params.color.r
			//colors[i*3+1] = this.params.color.g;
			//colors[i*3+2] = this.params.color.b;
		}
	}
    //console.log("created new particles ", old_need_emit - need_emit);
}

Particle_System.prototype.update_particle_geometry = function (dt)
{
	var verts = this.geometry.vertices.array;
	var params = this.geometry.params.array;
	var p;
	var vert = new THREE.Vector3(0,0,0);
	var dummy_color = {"r":1, "b":1, "g":1};
	for(var i = 0; i < this.particle_data.length; i++) {
	
		if (params[i] > 0) {
			p = this.particle_data[i];
			
			//integrate
			p.position.x += p.velocity.x * dt;
			p.position.y += p.velocity.y * dt;
			p.position.z += p.velocity.z * dt;
			p.lifetime -= dt;
			
			if (p.lifetime <= 0 || !this.affector.affect(dt, p, vert, dummy_color)) {
				p.lifetime = 0;
			}
			params[i] = p.lifetime;			
			verts[i*3] = p.position.x;
			verts[i*3+1] = p.position.y;
			verts[i*3+2] = p.position.z;
		}
	}

    if (!this.params.discrete_emission) {
        var need_emit = this.emitter.calc_emitted_particles(dt);
        this.emit_particles(dt, need_emit);
    }
	
	this.geometry.vertices.needsUpdate = true;
	this.geometry.params.needsUpdate = true;
	this.geometry.colors.needsUpdate = true;
}




Particle_System.prototype.update = function (dt)
{
	this.update_particle_geometry(dt);
}


Particle_System.prototype.generate_material_name = function ()
{
	var my_name = "MY_PARTICLE_MATERIAL";
	if (!!this.texture) {
		my_name +=  "_WITH_TEXTURE";
	}
	if (this.params.no_fade_color) {
		my_name += "_NO_FADE_COLOR";
	}
	return my_name;
}

Particle_System.prototype.blending_mode = 
{
	"additive": {
		"blendSrc": THREE.OneFactor,
		"blendDst": THREE.OneFactor
	},
	"alpha": {
		"blendSrc": THREE.SrcAlphaFactor,
		"blendDst": THREE.OneMinusSrcAlphaFactor
	},
	"one_alpha": {
		"blendSrc": THREE.OneFactor,
		"blendDst": THREE.OneMinusSrcAlphaFactor
	},
	"alpha_one": {
		"blendSrc": THREE.SrcAlphaFactor,
		"blendDst": THREE.OneFactor
	}
};

Particle_System.prototype.convert_blending_mode = function (blending)
{
    var three_blending;
	var factors = this.blending_mode["one_alpha"];
    if (blending === 'no') {
        three_blending = THREE.NoBlending;
    } else {
        three_blending = THREE.CustomBlending;    
        if (this.blending_mode[blending]) {
            factors = this.blending_mode[blending];
        }
    }
    return {"blending": three_blending, "factors":factors};
}

Particle_System.prototype.set_texture = function (texture)
{
	if (typeof texture === 'string') {
        if (this.params.texture === texture) {
            return;
        }
        this.params.texture = texture;
		this.texture = __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Texture_Manager.get(texture);
	} else {
        console.error("Oh Shit! texture in set_texture is not string! it's object or undefined!", texture);
    }

    if (this.material.uniforms.sprite) {
        this.material.uniforms.sprite.value = this.texture;
    } else {
        //this.material.uniforms.sprite = {value: texture};
        this.recreate_material();
        console.error("Oh Shit! Our shader has not texture! Need create shader with texture!");
    }
}


Particle_System.prototype.create_uniforms = function ()
{
    var uniforms = 
    {
        "lifetime": {
            value: this.particle_lifetime
        },
        "point_size": {
            value: this.params.size
        },
        "screen_size": {
            value: new THREE.Vector2(__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Viewport.width, __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Viewport.height)
        }
    };
    if (!!this.texture) {
        uniforms["sprite"] = {
            value: this.texture
        }
    };
    if (!this.dynamic_color) {
        uniforms["particle_color"] = {value: this.params.color};
    }
    return uniforms;
}

Particle_System.prototype.calc_defines = function ()
{
    var defines = {};
    if (this.params.pre_alpha) {
        defines["PRE_ALPHA"] = true;
    }
	if (!!this.texture) {
        defines["PARTICLE_TEXTURE"] = true;
    }
    if (this.params.no_fade_color) {
        defines["NO_FADE_COLOR"] = true;
    }
    if (this.params.color_domain) {
        defines["DYNAMIC_COLORS"] = true;
    }
    return defines;
}


Particle_System.prototype.select_texture = function (texture)
{
	if (typeof this.texture === 'string') {
		this.texture = __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Texture_Manager.get(this.texture);
        if (!this.texture) {
            console.error("Oh, not found texture <" + this.params.texture + "> in create particle material! Instead get "+this.texture);
        }
	}
}

Particle_System.prototype.create_particle_material = function()
{
	
    this.select_texture(this.texture);
    
    var blend_obj = this.convert_blending_mode(this.params.blending);
    
    
    var uniforms = this.create_uniforms();
    var defines = this.calc_defines();
    
	var mat = new THREE.ShaderMaterial({
		transparent: true,
		depthWrite: this.params.depth_write,
		depthTest: this.params.depth_test,
        blending: blend_obj.blending,
        blendSrc: blend_obj.factors.blendSrc,
        blendDst: blend_obj.factors.blendDst,
		defines: defines,
		uniforms: uniforms,
		vertexShader: __WEBPACK_IMPORTED_MODULE_4__particle_shaders_js__["a" /* Particle_Shaders */].vertex,
		fragmentShader: __WEBPACK_IMPORTED_MODULE_4__particle_shaders_js__["a" /* Particle_Shaders */].fragment
	});
	return mat;
}

Particle_System.prototype.recreate_material = function ()
{
    this.node.material = this.material = this.create_particle_material();
}


Particle_System.prototype.set_pre_alpha = function (pre_alpha)
{
    if (this.params.pre_alpha !== !!pre_alpha) {
        this.params.pre_alpha = pre_alpha;
        this.recreate_material();
    }
}

Particle_System.prototype.set_point_size = function (size)
{
    if (this.params.size != size) {
        this.params.size = size;
        this.node.material.uniforms["point_size"].value = size;
    }
}

Particle_System.prototype.set_blending = function (blending)
{
    this.params.blending = blending;
    var b = this.convert_blending_mode(blending);
    this.material.blending = b.blending;
    this.material.blendSrc = b.factors.blendSrc;
    this.material.blendDst = b.factors.blendDst;
}




Particle_System.prototype.toJSON = function ()
{
	var data = {};
    data.uuid = this.uuid;
    data.node = this.node.uuid;
    if (this.name || this.node.name) {
        data.name = this.name || this.node.name;
    }
	data.params = {};
	if (this.params) {
		_.copy_object(data.params, this.params);
	}
	data.params.emitter = this.emitter.toJSON();
	data.params.affector = this.affector.toJSON();
	return data;
}


Particle_System.prototype.set_emitter = function (emitter)
{
    this.emitter = this.params.emitter = emitter;
}

Particle_System.prototype.set_particle_life_length = function (val)
{
	if (val !== this.params.particle_lifetime) {
		this.params.particle_lifetime = this.particle_lifetime = val;
		this.material.uniforms['lifetime'].value = val;
	}
}

Particle_System.prototype.set_emission_per_second = function (val)
{
	this.emitter.emit_per_second = val;
}

Particle_System.prototype.set_particle_count = function (count)
{
	if (count !== this.particle_data.length) {
		this.params.count = count;
		this.node.geometry = this.create_particle_geometry(count);
	}
}

Particle_System.prototype.set_color = function (color)
{
    this.params.color.r = color.r;
    this.params.color.g = color.g;
    this.params.color.b = color.b;
}

Particle_System.prototype.set_bounding_sphere_radius = function (radius)
{
    this.node.boundingSphere.radius = radius;
}



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Manager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__particle_affector_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particles_points_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particles_js__ = __webpack_require__(10);







 function Particle_Manager ()
{
	this.particles = {};
    this.particles_array = [];
}

_.copy_object(Particle_Manager.prototype, 
    {
    constructor: Particle_Manager,
    add:  function (ps,name)
    {
        if (!this.particles[name]) {
            this.particles[name] = ps;
            this.particles_array.push(ps);
        }
    },
    remove_particles:  function (name)
    {
        var ps = this.particles[name];
        var i = this.particles_array.indexOf(ps);
        if (i >= 0) {
            this.particles_array.splice(i, 1);
        }
        if (ps) {
            ps.suicide();
            delete this.particles[name];
        }
    },
    get_particle_names:  function ()
    {
        var names = [];
        for(var key in this.particles) {
            names.push(key);
        }
        return names;
    },

    update : function (dt)
    {
        for(var i = 0; i < this.particles_array.length; i++) {
            this.particles_array[i].update(dt);
        }
    },
    
    create_by_params: function (params)
    {
        var ps = new __WEBPACK_IMPORTED_MODULE_4__particles_js__["a" /* Particle_System */](params);
        this.add(ps);
        return ps;
    },


    toJSON : function ()
    {
        var arr = []
        
        var data;
        var p;
        for(var key in this.particles){
            p = this.particles[key];
            if (p.uuid) {
                data = p.toJSON();
                arr.push(data);
            }
        }

        return arr;
    },

    emitter_fabric:  function (params)
    {
        if (params.emitter) {
            var emitter = __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Get_Class(params.emitter.name);
            if (emitter) {
                emitter = new emitter();
            } else {
                emitter = new __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__["a" /* Particle_Emitter */]();
            }
            emitter.parse(params.emitter.params);
            return emitter;        
        } 
        return undefined;
    },

    affector_fabric:  function (params)
    {
        if (params.affector) {
            var affector = __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Get_Class(params.affector.name);
            if (affector) {
                affector = new affector();
            } else {
                affector = new __WEBPACK_IMPORTED_MODULE_2__particle_affector_js__["a" /* Particle_Affector */]();
            }
            affector.parse(params.affector.params);
            return affector;
        }
        return undefined;
    },

    fromJSON: function (json, callback, root, name)
    {
        if (this.particles[name]) {
            console.log("WARNING Particle Manager! Particle System with this name already exists", name);
        }
        
        try
        {
            var data = JSON.parse(json);
        }
        catch (e)
        {
            console.log("error parsing json on ", name, json);
            throw e;
        }
        
        return this.parse(data, root, name);
    },


    parse: function (data, root, name)
    {
        var emitter = this.emitter_fabric(data.params);
        var affector = this.affector_fabric(data.params);
        data.params.emitter = emitter;
        data.params.affector = affector;
        
        var ps = new __WEBPACK_IMPORTED_MODULE_4__particles_js__["a" /* Particle_System */](data.params);
        ps.set_name(data.name);

            //add to scene graph
        if (data.params.parent) {
            var parent = root.getObjectByName(data.params.parent);
            //console.log(data.params.parent, "parent particles", name, root);
            parent.add(ps.node);
        } else {
           root.add(ps.node);
        }

        //ugly fucking hack
        //copy node properties
        this.add(ps, name);    
        return ps;
    },

    load_particles:  function (json, root)
    {
        var particles = json.particles;
        for(var i =0; i < particles.length; i++)
        {
            var p = particles[i];
            var ps = this.parse(p, root, p.name);
            ps.node.uuid = p.node;
            ps.node.name = p.name;
            var obj = root.getObjectByProperty("uuid", p.node);
            if (obj) {
                ps.node.replace_object_with_this(obj);
            }
        }
    },

    create_name:  function ()
    {
        var number = this.particles_array.length + 1;
        var begin_name = 'Particle_System_';
        var testing = true;
        while (testing) {
            name = begin_name + number;
            if (this.particles[name] !== undefined) {
                number ++;
            } else {
                return name;
            }
        }
    },

    create_new : function ()
    {
        var name = this.create_name();
        
        var params = {};
        var ps = new __WEBPACK_IMPORTED_MODULE_4__particles_js__["a" /* Particle_System */](params);
        ps.set_name(name);
        this.add(ps, name);
        return ps;
    }
});


if (__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].particle_manager === undefined) 
{
    __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].particle_manager = new Particle_Manager();
}

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Particles_Config = {
"box_size": 10
};




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Point_Generators; });
var Point_Generators = {};


Point_Generators.Random_Direction = function ()
{
}

Point_Generators.Random_Direction.prototype.get_direction = function (vector)
{
	vector.x = Math.random(); 
	vector.y = Math.random(); 
	vector.z = Math.random();
}

Point_Generators.Sphere = function (radius)
{
	this.radius = radius;
}

Point_Generators.Sphere.prototype.get_inner_point = function (vector)
{
	var alpha = Math.random() * Math.PI * 2;
	var beta = Math.random() * Math.PI;
	vector.x = Math.cos(alpha) * Math.sin(beta);
	vector.y = Math.cos(beta);
	vector.z = Math.sin(alpha) * Math.sin(beta);
}

Point_Generators.Sphere.prototype.get_normal = function (vector)
{
	vector.x = Math.random() * 2 - 1;
	vector.y = Math.random() * 2 - 1;
	vector.z = Math.random() * 2 - 1;
	vector.normalize();
}

Point_Generators.Sphere.prototype.get_point = function (vector) 
{
	this.get_normal(vector);
	vector.multiplyScalar(this.radius);
}




/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Application; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_event_hub_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_mouse_intersector_js__ = __webpack_require__(6);
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






function Application (config)
{

    this._lifecycle_event("before_created");
   
    this._init_timer();
    this._create_loop_function();
    
	this.mouse_controllers = [];
    
    __WEBPACK_IMPORTED_MODULE_1__base_event_hub_js__["a" /* main_event_hub */].add_event_listener("kill_me", function (obj) {
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
    __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].particle_manager.update(delta);
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
		var vector = __WEBPACK_IMPORTED_MODULE_2__base_mouse_intersector_js__["a" /* Mouse_Intersector */].mouse_coords_to_vector(self.dom_screen, event);		
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
	var tmp = new __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Mouse_Controller(root, over, click, callback)
	this.mouse_controllers.push( tmp );
	if (over) {
		this.create_mouse_move_listener();
	}
	return tmp;
}



Application.prototype.set_viewport = function (width, height)
{
	__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Viewport.width = width;
	__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Viewport.height = height;
}

Application.prototype.render = function (delta) 
{
	this.renderer.setClearColor(this.configuration.clear_color);
	this.renderer.autoClear = true;
	this.renderer.render(this.main_scene, this.main_camera);
}





/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Base_Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Euler_Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Scale_Animation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(0);


//length - simple length of animations
//-1 - infinite
//0 - stop
//> 0 - length of animation, 
//if time > length, animation stop
//need rewrite this crap to safe floating point mannere
//and append more controle on animation 
    function Base_Animation ()
    {
        this.time = 0;
        this.time_scale = 1.0;
        this.type = "Base_Animation";
        this.uuid = _.generateUUID();
        this.length = -1;
        this.stopped = false;
    }
    
    Base_Animation.prototype.update = function (dt)
    {
        var scaled_dt = dt * this.time_scale;
        this.time += scaled_dt;
        if (this.length < 0 || this.time < this.length) {
            this.calc_animation(dt);
        }
    }
    
    Base_Animation.prototype.stop = function ()
    {
        this.stopped = true;
    }
    
    Base_Animation.prototype.start = function ()
    {
        this.stopped = false;
    }
    
    Base_Animation.prototype.reset = function ()
    {
        this.time = 0;
    }
    
    Base_Animation.prototype.calc_animation = function (dt)
    {
        
    }
    
    Base_Animation.prototype.apply = function(obj)
    {
    }
    
    Base_Animation.prototype.toJSON = function (data)
    {
        var data = {};
        data.uuid = this.uuid;
        data.type = this.type;
        if (this.name !== '') {
            data.name = this.name;
        }
        data.time_scale = this.time_scale === undefined ? 1.0 : this.time_scale;
        data.length = this.length;
        return data;
    }
    
    Base_Animation.prototype.parse = function (param)
    {
        this.type = param.type;
        this.uuid = param.uuid;
        this.name = param.name ? param.name : '';
        this.time_scale = (param.time_scale === undefined) ? 1.0 : param.time_scale;
        this.length = param.length === undefined ? -1 : param.length;
    }
    

    
    
        
function Euler_Animation (x, y, z)
{
    Base_Animation.call(this);
    this.type = "Euler_Animation";
	this.xspeed = x;
	this.yspeed = y;
	this.zspeed = z;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.name = '';
}

Euler_Animation.prototype = Object.create(Base_Animation.prototype);


Euler_Animation.prototype.constructor = Euler_Animation;

Euler_Animation.prototype.calc_animation = function (dt)
{
    //console.log(this.xspeed,this.yspeed, this.zpeed, dt, this.time_scale);
    dt *= this.time_scale;
	this.x += this.xspeed * dt;
	this.y += this.yspeed * dt;
	this.z += this.zspeed * dt;
}
    
Euler_Animation.prototype.apply = function (obj)
{
    obj.rotation.set(this.x,this.y, this.z);
}

Euler_Animation.prototype.toJSON = function (json)
{
   var data = Base_Animation.prototype.toJSON.call(this);
   data.xspeed = this.xspeed;
   data.yspeed = this.yspeed;
   data.zspeed = this.zspeed;
   return data;
}

Euler_Animation.prototype.parse = function (param)
{
    Base_Animation.prototype.parse.call(this, param);
    this.xspeed = param.xspeed;
    this.yspeed = param.yspeed;
    this.zspeed = param.zspeed;
    this.x = this.y = this.z = 0;    
}


function Scale_Animation(x, y, z)
{
    Base_Animation.call(this);
    //speed of scale
    this.xscale = x;
    this.yscale = y;
    this.zscale = z;
    this.x = 1.0;
    this.y = 1.0;
    this.z = 1.0;
}

Scale_Animation.prototype = Object.create(Base_Animation.prototype);

_.copy_object(Scale_Animation.prototype, {
    constructor: Scale_Animation,
    calc_animation: function (dt) 
    {
        dt = dt * this.time_scale;
        this.x += this.xscale * dt;
        this.y += this.yscale * dt;
        this.z += this.zscale * dt;
    },
    apply:function (obj) {
        obj.scale.set(this.x, this.y, this.z);
    },
    reset: function () {
        if (this.first) {
        }
        this.x = 1.0;
        this.y = 1.0;
        this.z = 1.0;
        this.time = 0;
    }
});


__WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].Register_Class("Base_Animation", Base_Animation);
__WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].Register_Class("Euler_Animation", Euler_Animation);
__WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].Register_Class("Scale_Animation", Scale_Animation);





/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Loading_Manager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(0);


//events: 
//item_loaded
//onerror
//onprogress
//finished
function Chain_Loader()
{
}

Chain_Loader.prototype = {
	constructor: Chain_Loader,
	start: function (list) 
	{
		this.list = list;
		this.index = 0;
		this.load(this.list[0]);
		this.stop_by_error = false;
	},
	
	next: function(resource)
	{
		if (this.item_loaded && resource) {
			this.item_loaded(resource,this.list[this.index]);
		}
		this.index++;
		if (this.index < this.list.length) {
			this.load(this.list[this.index]);
		} else {
			if (this.finished) {
				this.finished();
			}
		}
	},
	
	do_error: function (error)
	{
		if (this.onerror) {
			this.onerror(error);
		} else {
			console.error("Chain Loader Error!", error);
		}
		if (!this.stop_by_error) {
			this.next();
		}
	},
	
	do_progress: function ()
	{
		if (this.onprogress) {
			this.onprogress.apply(this, arguments);
		}
	},
		
	load: function (item)
	{
		var self = this;
		if (this.load_func) {
			this.load_func(item, 
			function (item) { self.next.apply(self, arguments); },
			function (item) { self.do_error.apply(self, arguments); },
			function (item) { self.do_progress.apply(self, arguments); });
		}
	}
};


function test_chain_loader() 
{
	var cl = new Chain_Loader();
	cl.item_loaded = function (item) {console.log("load item ", item);}
	cl.finished = function (item) {console.log("loader manager - job done");}
	cl.load_func = function (item, next, error, progress) { 
		if (item) {
			next(item);
		} else {
			error(item);
		}
	}
	cl.start(["first", "second", null, "tree"]);
}
//test_chain_loader();




function Loading_Manager ()
{
	this.resources = {};
	this.texture_loader = new THREE.TextureLoader();
}

Loading_Manager.prototype = {
	constructor: Loading_Manager,
	get: function (name)
	{
		return this.resources[name];
	},
	
	get_async: function (name, callback)
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
		texture = this.texture_loader.load(name, function (texture)
		{
			if (callback) {
				callback(texture);
			}
		});
		this.resources[name] = texture;	
		return texture;
	},
	

	load_list: function (resource_list, on_load, load_func, on_progress)
	{
		var self = this;
		
		var cl = new Chain_Loader();
		var self = this;
		cl.onerror = function (error) {
			console.error("ERROR loading texture", error, cl.list[cl.index]);	
		}
		cl.item_loaded = function (resource, name) {
			self.resources[name] = resource;
			if (self.on_resource_loaded) {
				self.on_resource_loaded(resource);
			}
		}
		cl.on_progress = function () {
			if (on_progress) {
				on_progress();
			}
		}
		cl.load_func = function () {
			load_func.apply(this, arguments);
		}
		cl.finished = function ()
		{
			if (on_load) {
				on_load();
			}
		}
		cl.start(resource_list);
		
	},

	load_list_textures: function (resource_list, on_load)
	{
		var self = this;
		this.load_list(resource_list, on_load, function (url, next, error, progress ) 
		{
			var texture = self.texture_loader.load(url, next, progress, error);
		});
	},

	load_list_json: function (resource_list, on_load, progress)
	{
		var self = this;
		var loader = new THREE.XHRLoader();	
		this.load_list(resource_list, on_load, function (url, next, error, progress) 
		{
			var texture = loader.load(url, next, progress, error);
		}, progress);
	},
	
	free: function ()
	{
		this.resources = {};
	}
};


__WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].Texture_Manager = new Loading_Manager();	



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Package_Manager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(0);
//TODO: remove this ugly crap and replace something reasonable



//this ugly class loading texture list in json format, parse it, and loading textures
//then it call event data_loaded, when give texture list in json format

function Package_Manager()
{
    this.state = {};
}

//load json file with descriptions of package: texture list, particles list, scene objects list
Package_Manager.prototype.load = function (url, defaults)
{
    this.defaults = defaults;
    var self = this;
    this.state = {
        "type": "start"
    };
    
    var self = this;
    function onload (data) {
        self.state["type"] = "done";
        self.state["data"] = data;
        
        self.parse_package_description(data);        
    }    
    function error(event) {
        self.state["type"] = "error";
        self.state["error"] = event;
        console.error("ERror! Failed loading resources with url "+url, event.target);        
        if (self.error){
            self.error(event.target);
        }
        self.pack = self.defaults
        self.load_resources(self.defaults);

    }
    function progress()
    {
    }
    var xhr = new THREE.XHRLoader();
    xhr.load(url, onload, progress, error);
}

//parse loaded json file 
Package_Manager.prototype.parse_package_description = function (data)
{
    console.log("packaged description loaded, begin parsing...");
  try {
        var pack = JSON.parse(data);
        this.pack = pack;
        if (this.loaded) {
            this.loaded(pack);
        }
        
   } 
   catch(e) {
        console.error("error parsing resources ", e);
        if (this.error){
            this.error(event);
        }
        return;        
   }
   this.load_resources(pack);
}


Package_Manager.prototype.load_resources = function (pack)
{
    var self = this;
    //load textures
   console.log("Package Manager: begin loading textures...");    
    __WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].Texture_Manager.load_list_textures(pack.textures, function (){
        //load json descriptions files
                if (self.data_loaded) {
                    self.data_loaded(pack);
                }
    })
}




/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scene_Serializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particles_particles_manager_js__ = __webpack_require__(11);



function Scene_Serializer(root)
{
    this.animation_library = {};
}

Scene_Serializer.prototype.toJSON = function (root)
{
    this.json = root.toJSON();
    console.log("my lib particle manager", __WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].particle_manager);
    this.json["particles"] = __WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].particle_manager.toJSON();
    var anims = root.collect_animations(root);
    if (anims.count > 0) {
        this.json["myanimations"] = anims;
    }
    
    return this.json;
}



Scene_Serializer.prototype.create_animations = function (animations) {
    for(var key in animations) {
        if ( this.animation_library[key] === undefined && Object.prototype.hasOwnProperty.call(animations, key)) {
            var data = animations[key];
            //console.log("create animations ", data.uuid);            
            var anim =  __WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].Abstract_Fabric(data);
            if (anim) {
                this.animation_library[key] = anim;
            }
        }
    }
}



Scene_Serializer.prototype.bind_animations = function (animdata)
{
    if (!animdata) return;
    
    var bindings = animdata.bindings;
    
    //console.log("bind animation");
    var self = this;
    function copy_animations(obj, bind)
    {
        for(var i = 0; i < bind.animations.length; i++){
            var anim_uuid = bind.animations[i];
            obj.add_animation( self.animation_library[anim_uuid] );
        }
    }
    
     for(var i =0; i < bindings.length; i++) {
        var bind = bindings[i];
        var uuid = bind.uuid;
        var obj = this.root.getObjectByProperty("uuid", uuid);
        if (obj) {
            //console.log("binding " + uuid + " object to animation "+uuid);
            copy_animations(obj, bind);
        }
    }
}


Scene_Serializer.prototype.load_from_json = function (url)
{
    var self = this;
    function onload(json)
    {
        try {
            var data = JSON.parse(json);
        }
        catch(e) {
            console.error("Failed to parse scene ", e);
            throw e;
        }
        if (data === undefined) {
            console.error("Something fucking happened, failed to load scene ", url);
            return;
        }
        self.load(data);
    }
    function progress()
    {
    }
    function error(e)
    {
        console.error(e.target);
        throw e;
    }
    var xhr = new THREE.XHRLoader();
    xhr.load(url, onload, progress, error);
}

Scene_Serializer.prototype.load = function (json)
{
    this.animation_library = {};
    var o = new THREE.ObjectLoader();
    if (json !== undefined) {
        this.json = json;
    }
    var root = o.parse(this.json, function () {console.log("onload")});
    this.root = root;    

    __WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].particle_manager.load_particles(this.json, root);
    
    this.create_animations(this.json.myanimations.animations);
    this.bind_animations(this.json.myanimations);
    this.main_camera = root.getObjectByName("main_camera");
    
    if (this.scene_loaded) {
        this.scene_loaded(root);
    }
    return root;
}



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mixin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_mouse_camera_controller_js__ = __webpack_require__(3);


function Mixin()
{

    //need for unproject object and dragging
    THREE.PerspectiveCamera.prototype.get_forward_plane_by_object = function (obj)
    {
        var z = new THREE.Vector3();
        z.setFromMatrixColumn( this.matrixWorld, 2 );
        var dist = obj.position.dot(z);             
        var plane= new THREE.Plane(z.negate(), dist);
        return plane;
    }

    
    THREE.PerspectiveCamera.prototype.get_ray_from_screen_coordinates = function (canvas, x,y)
    {
        var mc = new __WEBPACK_IMPORTED_MODULE_0__base_mouse_camera_controller_js__["a" /* Mouse_Camera_Controller */](canvas, this);
        var ray = mc.get_ray_from_camera_in_screen_coordinates(x,y);
        return ray;
    }

    
}

Mixin();


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mix_It; });
function Mix_It()
{



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

var Object3D_Animation_Mixin = {
    
    add_animation: function (anim)
    {
        if (!this.animations) {
            this.animations = [];
        }
        if (this.animations.indexOf(anim) < 0) {
            this.animations.push(anim);
        }
    },
    
    remove_animation: function (anim)
    {
        if (this.animations) {
            var i = this.animations.indexOf(anim);
            if (i > -1) {
                this.animations.splice(i, 1);
            }
        }
    },
    
    update:  function (dt)
    {
        //console.log("object update", dt);
        if (this.animations !== undefined) {
            for(var i =0; i < this.animations.length; i++) {
                var anim = this.animations[i];
                anim.update(dt);
                //console.log(this.rotation);
                anim.apply(this);
                //console.log(this.rotation);
            }
        }
    
        for(var i = 0; i < this.children.length; i++) {
            var obj = this.children[i];
            if (obj.update) {
                obj.update(dt);
            }
        }
    },
    
    
};
_.copy_object(THREE.Object3D.prototype, Object3D_Animation_Mixin);


THREE.Object3D.prototype.old_toJson = THREE.Object3D.toJSON;

var Object3D_Serialization_Mixin = 
{
    standard_serialization: function (meta) 
    {
		// standard Object3D serialization
		var object = {};

		object.uuid = this.uuid;
		object.type = this.type;
		if ( this.name !== '' ) object.name = this.name;
		if ( JSON.stringify( this.userData ) !== '{}' ) object.userData = this.userData;
		if ( this.castShadow === true ) object.castShadow = true;
		if ( this.receiveShadow === true ) object.receiveShadow = true;
		if ( this.visible === false ) object.visible = false;

		object.matrix = this.matrix.toArray();
        

        if (this.type !== "particles_points")
        {
            if (this.geometry !== undefined) {
                object.geometry = this.geometry.uuid;
            }
            if ( this.material !== undefined ) {
                object.material = this.material.uuid;
            }
            
            if ( this.material !== undefined  &&  meta.materials[ this.material.uuid ] === undefined ) {
                    meta.materials[ this.material.uuid ] = this.material.toJSON( meta);
            }

            if ( this.geometry !== undefined && meta.geometries[ this.geometry.uuid ] === undefined ) {
                    meta.geometries[ this.geometry.uuid ] = this.geometry.toJSON( meta );
            }
        }
        
        if (this.animations) {
            object.animations = [];
            for(var i =0; i < this.animations.length; i++) {
                object.animations.push ( this.animations[i].uuid );
            }
        }
        
		if ( this.children.length > 0 ) {
			object.children = [];
			for ( var i = 0; i < this.children.length; i ++ ) 
            {
                var child = this.children[ i ];
				//object.children.push( child.standard_serialization( meta ) );
                object.children.push( child.toJSON( meta ) );
			}
		}
        return object;
    },
    
    collect_materials: function (meta) 
    {
		if ( this.material !== undefined  &&  meta.materials[ this.material.uuid ] === undefined ) {
                meta.materials[ this.material.uuid ] = this.material.toJSON( meta);
		}
        
		for ( var i = 0; i < this.children.length; i ++ ) {
			this.children[ i ].collect_materials(meta);
		}
    },
    
    collect_geometry: function (meta)
    {
		if ( this.geometry !== undefined && meta.geometries[ this.geometry.uuid ] === undefined ) {
				meta.geometries[ this.geometry.uuid ] = this.geometry.toJSON( meta );
		}

		for ( var i = 0; i < this.children.length; i ++ ) {
			this.children[ i ].collect_geometry(meta);
		}
    },
    
	toJSON1: function ( meta ) {
    
		// extract data from the cache hash
		// remove metadata on each item
		// and return as array
		function extractFromCache( cache, t ) {
			var values = [];
			for ( var key in cache ) {
				var data = cache[ key ];
				delete data.metadata;
				values.push( data );
			}
			return values;
		}
    

        this.updateMatrixWorld(true);
        
		// meta is '' when called from JSON.stringify
		var isRootObject = ( meta === undefined || meta === '' );

		var output = {};

		if ( isRootObject ) {

            meta = {
				geometries: {},
				materials: {},
				textures: {},
				images: {}
			};
            
            
            //this.collect_materials(meta);
            //this.collect_geometry(meta);
            var object = this.standard_serialization(meta);
            
            
			output.metadata = {
				version: 4.4,
				type: 'Object',
				generator: 'Object3D.toJSON'
			};

			var geometries = extractFromCache( meta.geometries, "geoim" );
			var materials = extractFromCache( meta.materials, "materials" );
			var textures = extractFromCache( meta.textures, "textures" );
			var images = extractFromCache( meta.images, "images" );

			if ( geometries.length > 0 ) output.geometries = geometries;
			if ( materials.length > 0 ) output.materials = materials;
			if ( textures.length > 0 ) output.textures = textures;
			if ( images.length > 0 ) output.images = images;

            var anims = this.collect_animations(this);
            if (anims.count > 0) {
                output["myanimations"] = anims;
            }
           
            output.object = object;
		} else {
            output.object = this.standard_serialization(meta);
            output.type = this.type;
            if (output.object === undefined) {
                console.log("i am undefined", this);
            }
        }

		return output;


	},
    
    collect_animations: function (scene)
    {
        var data = {
            animations : {},
            bindings : [],
            count: 0
        };
        
        function collect_animations_recursive(root)
        {
            if (root.animations) {
                for(var i =0; i < root.animations.length; i++) {
                    var anim = root.animations[i];
                    if (data.animations[ anim.uuid ] === undefined) {
                        data.animations[ anim.uuid] = anim.toJSON() ;
                        data.count++;
                    }
                }
                
                var bind = {};
                bind.uuid = root.uuid
                bind.animations = [];
                for(var i =0; i < root.animations.length; i++) {
                    bind.animations.push( root.animations[i].uuid);
                }
                data.bindings.push(bind);
            }
            
            if (root.children) {
                for(var i = 0; i < root.children.length; i++) {
                    collect_animations_recursive( root.children[i] );
                }
            }
        }
        collect_animations_recursive(scene);
        return data;
    },
    
 
};


  _.copy_object(THREE.Object3D.prototype, Object3D_Serialization_Mixin);
  
THREE.Object3D.prototype.dm_mark = 'yes,this object has been marked by black magic, owned by me, dark matters'; 

//replace source with this
THREE.Object3D.prototype.replace_object_with_this = function ( source ) {

    this.uuid = source.uuid;
    this.name = source.name;

    this.up.copy( source.up );
    this.position.copy( source.position );
    this.quaternion.copy( source.quaternion );
    this.scale.copy( source.scale );

    this.matrix.copy( source.matrix );
    this.matrixWorld.copy( source.matrixWorld );

    this.matrixAutoUpdate = source.matrixAutoUpdate;
    this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

    this.visible = source.visible;

    this.castShadow = source.castShadow;
    this.receiveShadow = source.receiveShadow;

    this.frustumCulled = source.frustumCulled;
    this.renderOrder = source.renderOrder;

    this.userData = JSON.parse( JSON.stringify( source.userData ) );

    //copy array of children, not clone
    for ( var i = 0; i < source.children.length; i ++ ) {
        this.add( source.children[ i ] );
    }
    source.parent.add(this);
    source.parent.remove(source);
    
    this.animations = source.animations;
}


}

Mix_It();



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Custom_Affector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_affector_js__ = __webpack_require__(1);



function Custom_Affector()
{
	__WEBPACK_IMPORTED_MODULE_1__particle_affector_js__["a" /* Particle_Affector */].apply(this, arguments);
    this.custom_func = function dummy () {return true;};
}


Custom_Affector.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_1__particle_affector_js__["a" /* Particle_Affector */].prototype);

_.copy_object(Custom_Affector.prototype, 
    {
    constructor: Custom_Affector,
   	affect: function (dt, pdata, vert)
	{
        return this.custom_func(dt, p, vert);
	},
    test_func: function () {
        var p = {
            position: {x: 0, y: 0, z: 0},
            velocity: {x: 0, y: 0, z: 0}
        };
        var color = {r: 0, g: 0, b: 0};
        this.custom_func(p, color);
    },
    set_affect_function: function (source) {    
        if (typeof source === 'function') {
            this.custom_func = source;
        } else if (typeof source  === 'string') {
            try {
                this.custom_func = new Function ('dt,p,vert', source);
                this.test_func();
            }
            catch (e) {
                alert(e);
                this.custom_func = undefined;
            }
            this.source_code = source;
        }
    },
    
	toJSON: function ()
	{
        var data = {
            name: "Custom_Affector"
        };
		data.params = __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Particle_Affector.prototype.toJSON.call(this, this);
		params["source_code"] = this.source_code;
		return data;
	},
	parse: function (json)
	{
		__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Particle_Affector.prototype.parse(this, json);
		this.set_affect_func(json.source_code);
	}

});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Custom_Affector", Custom_Affector);



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Custom_Emitter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__ = __webpack_require__(2);




function Custom_Emitter()
{
	__WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__["a" /* Particle_Emitter */].apply(this, arguments);
}


Custom_Emitter.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__["a" /* Particle_Emitter */].prototype);

var methods = {
    emit: function (p, color) {
        if (this.custom_func) {
            this.custom_func(p, color);
        }
    },
    test_func: function () {
        var p = {
            position: {x: 0, y: 0, z: 0},
            velocity: {x: 0, y: 0, z: 0}
        };
        var color = {r: 0, g: 0, b: 0};
        this.custom_func(p, color);
    },
    set_emit_function: function (source) {
        if (typeof source === 'function') {
            this.custom_func = source;
        } else if (typeof source  === 'string') {
            try {
                this.custom_func = new Function ('p', 'color', source);
                this.test_func();
            }
            catch (e) {
                alert(e);
                this.custom_func = undefined;
            }
            this.source_code = source;
        }
    },
    toJSON: function () {
        var data = {};
        data.name = "Custom_Emitter";
        data.params = __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Particle_Emitter.prototype.toJSON.call(this, this);
        if (this.source_code) {
            data.params.source_code = this.source_code;
        }
        return data;
    },
    parse: function (data) {
        __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Particle_Emitter.prototype.parse.call(this, data);        
        this.set_emit_function (data.source_code);
    },
    constructor: Custom_Emitter,
};

_.copy_object(Custom_Emitter.prototype, methods);
__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Custom_Emitter", Custom_Emitter);


function test()
{
    var t = new Custom_Emitter();
    var source = 'p.position.z = -100; p.velocity.y = 100;';
    t.set_emit_function(source);
    var p = {
        velocity: {x: 0, y: 0, z: 0},
        position: {x: 0, y: 0, z: 0}
    };
    t.custom_func(p);
    console.log(p);
    var json = t.toJSON();
    console.log(json);
    
    t = new Custom_Emitter();
    t.parse(json.params);
    //console.log(t.custom_func);    
}

//test();

/*
Custom_Emitter.prototype = Object.create(My_Lib.Particle_Emitter.prototype);
Custom_Emitter.prototype.constructor = Cone_Emitter;
My_Lib.Register_Class("Custom_Emitter", Cone_Emitter);
*/



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Forces; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);


var Particle_Forces = {};

//base class
Particle_Forces.Force = function ()
{
}


_.copy_object(Particle_Forces.Force.prototype,{
		calc: function (dt, particle, acceleration) 
		{
		},
		toJSON: function (child) 
		{
			return {};
		},
		parse: function (json) 
		{
		},
});

//constant force
Particle_Forces.Constant_Force = function (force)
{
	if (typeof force !== 'undefined') {
		this.force = force;
	} else {
		this.force = {x:0, y:0, z:0};
	}
}

Particle_Forces.Constant_Force.prototype = Object.create(Particle_Forces.Force.prototype);
_.copy_object(Particle_Forces.Constant_Force.prototype, {
	constructor: Particle_Forces.Constant_Force,
	calc: function (dt, p, acceleration) 
	{
		acceleration.x += this.force.x;
		acceleration.y += this.force.y;
		acceleration.z += this.force.z;
	},
	toJSON: function (child)
	{
		var data = {};
		data.name = "Constant_Force";
		data.force = _.create_clone_object(this.force);
		return data;
	},
	parse: function (json)
	{	
		if (json.force) {
			_.copy_object(this.force, json.force);
		}
	}
});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Constant_Force", Particle_Forces.Constant_Force);



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cone_Emitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Star_Dust_Emitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Sphere_Emitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Star_Dust_Affector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point_generators_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particle_affector_js__ = __webpack_require__(1);





function  Cone_Emitter()
{
	__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].apply(this, arguments);
	this.generator = new __WEBPACK_IMPORTED_MODULE_1__point_generators_js__["a" /* Point_Generators */].Random_Direction();
	this.origin = new THREE.Vector3(1, 1, 0);
	this.velocity = new THREE.Vector3(0, 1, 0);
	this.dispersion = {"min": 5, "max": 10};
	this.dispersion.delta = 5;
	this.speed = {min: 5, max: 10, delta:5};
	this.color = new THREE.Color(1, 1, 1);
}

Cone_Emitter.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype);
Cone_Emitter.prototype.constructor = Cone_Emitter;
__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Cone_Emitter", Cone_Emitter);

Cone_Emitter.prototype.toJSON = function ()
{
	var data = {};
	data.name = "Cone_Emitter";
	data.params = __WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype.toJSON.call(this, this);
	_.clone_field_list_one_level_recursion(this, data.params, 
	["origin", 
	"velocity", 
	"dispersion",
	"speed"]);
	
	return data;
}

Cone_Emitter.prototype.parse = function (data)
{
	__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype.parse.call(this, data);
	this.origin.copy(data.origin);
	this.velocity.copy(data.velocity);
	this.set_dispersion(data.dispersion.min, data.dispersion.max);
	this.set_speed(data.speed.min, data.speed.max);
}

Cone_Emitter.prototype.set_speed = function (min, max)
{
	this.speed.min = min;
	this.speed.max = max;
	this.speed.delta = max - min;
}


Cone_Emitter.prototype.set_dispersion = function (min, max)
{
	this.dispersion.min = min;
	this.dispersion.max = max;
	this.dispersion.delta = max - min;
}




Cone_Emitter.prototype.emit = function (p, color, matrix)
{
	p.position.copy(this.origin);
	
	this.generator.get_direction(p.velocity);
	p.velocity.multiplyScalar(Math.random()*this.dispersion.delta + this.dispersion.min);	
	p.velocity.add(this.velocity).normalize();
	
    if (matrix) {
        p.position.applyMatrix4(matrix);
        p.velocity.applyMatrix4_rotation(matrix);
    }
        
	p.velocity.multiplyScalar(Math.random()*this.speed.delta + this.speed.min);	
	
    
	if (color) {
		this.emit_color(color);
	}
    
}

Cone_Emitter.prototype.emit_color = function (color) 
{
	color.copy(this.color);
}

function Sphere_Emitter(radius, speed)
{
	__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].call(this);
	this.radius = radius || 1;
    this.speed = speed || 1;
	this.generator = new __WEBPACK_IMPORTED_MODULE_1__point_generators_js__["a" /* Point_Generators */].Sphere(radius);
    this.from_center = true;
    Object.defineProperty(this, 'radius', {
        configurable: true,
        enumerable: true,
        set: function (value) { radius = value; generator.radius = value;}
    });
}

Sphere_Emitter.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype);

_.copy_object(Sphere_Emitter.prototype, {
    constructor: Sphere_Emitter,
    emit: function (p, color, matrix)
    {
        if (this.from_center) {
            p.position.set(0,0,0);
        } else {
            this.generator.get_point(p.position);
        }
        this.generator.get_normal(p.velocity);
        if (matrix) {
            p.position.applyMatrix4(matrix);
            p.velocity.applyMatrix4_rotation(matrix);
        }
        p.velocity.multiplyScalar(this.speed);
    },
    toJSON: function (json) {
		var params = __WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype.toJSON.call(this, this);
        params.radius = this.radius;
        params.speed = this.speed;
        //params.generator.radius = this.radius;
    },
    parse: function (json) {
		__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype.parse.call(this, json);
        this.radius = json.radius;
        this.speed = json.speed;
    }
});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Sphere_Emitter", Sphere_Emitter);


function Star_Dust_Emitter ()
{
	__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].apply(this, arguments);
	this.start_position = new THREE.Vector3(0, 0, 0);
	this.end_position = new THREE.Vector3(1, 1, 1);
	this.delta = new THREE.Vector3(1, 1, 1);	
	this.velocity = new THREE.Vector3(0, 0, 1);
}

Star_Dust_Emitter.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype);
Star_Dust_Emitter.prototype.constructor = Star_Dust_Emitter;
_.copy_object( Star_Dust_Emitter.prototype,{
	set_velocity: function (x,y, z) 
	{
		this.velocity.set(x, y, z);
	},
	set_position_range : function (start, end)
	{
		this.start_position.copy(start);
		this.end_position.copy(end);
		this.delta.set(end.x - start.x, end.y-start.y, end.z-start.z);
		
	},
	get_position: function (vector)
	{
		vector.x = Math.random() * this.delta.x + this.start_position.x;
		vector.y = Math.random() * this.delta.y + this.start_position.y;
		vector.z = Math.random() * this.delta.z + this.start_position.z;
	},
	get_velocity: function (vector)
	{
		vector.x = this.velocity.x;
		vector.y = this.velocity.y;
		vector.z = this.velocity.z;
	},
	emit: function (p)
	{
		this.get_position(p.position);
		if (this.parent) {
			this.parent.localToWorld(p.position);
		}
		this.get_velocity(p.velocity);
	},
	toJSON: function ()
	{
		var params = __WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype.toJSON.call(this, this);
		_.clone_field_list_one_level_recursion(this, params, ["velocity", 
		"start_position",
		"end_position"])
		var data = {
			"name": "Star_Dust_Emitter",
			"params": params,
		};
		return data;
	},
	parse: function (json)
	{
		__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype.parse.call(this, json);
		this.set_position_range(json.start_position, json.end_position);
		this.velocity.copy(json.velocity);
	}
	
});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Star_Dust_Emitter", Star_Dust_Emitter);


function Star_Dust_Affector (end)
{
	this.end = end || 0;
}


Star_Dust_Affector.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_3__particle_affector_js__["a" /* Particle_Affector */].prototype);
Star_Dust_Affector.prototype.constructor = Star_Dust_Affector;

_.copy_object(Star_Dust_Affector.prototype,{
	affect: function (dt, pdata, vert)
	{
		if (pdata.position.z > this.end) {
			return false;
		}
		return true;
	},
	toJSON: function ()
	{
		var params = __WEBPACK_IMPORTED_MODULE_3__particle_affector_js__["a" /* Particle_Affector */].prototype.toJSON.call(this, this);
		params["end"] = this.end;
		var data = {
			"name": "Star_Dust_Affector",
			"params": params,

		};
		return data;
	},
	parse: function (json)
	{
		__WEBPACK_IMPORTED_MODULE_3__particle_affector_js__["a" /* Particle_Affector */].prototype.parse(this, json);
		this.end = json.end;
	}
});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Star_Dust_Affector", Star_Dust_Affector);



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_event_hub_js__ = __webpack_require__(5);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "main_event_hub", function() { return __WEBPACK_IMPORTED_MODULE_0__base_event_hub_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Event_Hub", function() { return __WEBPACK_IMPORTED_MODULE_0__base_event_hub_js__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_my_lib_js__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "My_Lib", function() { return __WEBPACK_IMPORTED_MODULE_1__base_my_lib_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_animations_js__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Base_Animation", function() { return __WEBPACK_IMPORTED_MODULE_2__base_animations_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Euler_Animation", function() { return __WEBPACK_IMPORTED_MODULE_2__base_animations_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Scale_Animation", function() { return __WEBPACK_IMPORTED_MODULE_2__base_animations_js__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_mouse_intersector_js__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Mouse_Intersector", function() { return __WEBPACK_IMPORTED_MODULE_3__base_mouse_intersector_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_mouse_camera_controller_js__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Mouse_Camera_Controller", function() { return __WEBPACK_IMPORTED_MODULE_4__base_mouse_camera_controller_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_loading_manager_js__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Loading_Manager", function() { return __WEBPACK_IMPORTED_MODULE_5__base_loading_manager_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__base_package_manager_js__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Package_Manager", function() { return __WEBPACK_IMPORTED_MODULE_6__base_package_manager_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__particles_particles_points_js__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particles_Points", function() { return __WEBPACK_IMPORTED_MODULE_7__particles_particles_points_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__particles_particle_emitter_js__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particle_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_8__particles_particle_emitter_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__particles_forces_js__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particle_Forces", function() { return __WEBPACK_IMPORTED_MODULE_9__particles_forces_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__particles_particle_affector_js__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particle_Affector", function() { return __WEBPACK_IMPORTED_MODULE_10__particles_particle_affector_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__particles_point_generators_js__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Point_Generators", function() { return __WEBPACK_IMPORTED_MODULE_11__particles_point_generators_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__particles_custom_emitter_js__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Custom_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_12__particles_custom_emitter_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__particles_custom_affector_js__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Custom_Affector", function() { return __WEBPACK_IMPORTED_MODULE_13__particles_custom_affector_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__particles_test_emitters_js__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Cone_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_14__particles_test_emitters_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Star_Dust_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_14__particles_test_emitters_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Sphere_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_14__particles_test_emitters_js__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Star_Dust_Affector", function() { return __WEBPACK_IMPORTED_MODULE_14__particles_test_emitters_js__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__particles_particle_shaders_js__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particle_Shaders", function() { return __WEBPACK_IMPORTED_MODULE_15__particles_particle_shaders_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__particles_particles_js__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particle_System", function() { return __WEBPACK_IMPORTED_MODULE_16__particles_particles_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__particles_particles_manager_js__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particle_Manager", function() { return __WEBPACK_IMPORTED_MODULE_17__particles_particles_manager_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__base_scene_serializer_js__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Scene_Serializer", function() { return __WEBPACK_IMPORTED_MODULE_18__base_scene_serializer_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__mixins_threejs_mixins_js__ = __webpack_require__(19);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Mix_It", function() { return __WEBPACK_IMPORTED_MODULE_19__mixins_threejs_mixins_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__mixins_camera_mixin_js__ = __webpack_require__(18);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Mixin", function() { return __WEBPACK_IMPORTED_MODULE_20__mixins_camera_mixin_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__app_application_js__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return __WEBPACK_IMPORTED_MODULE_21__app_application_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__particles_color_domain_js__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Color_Domain", function() { return __WEBPACK_IMPORTED_MODULE_22__particles_color_domain_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Table_Color", function() { return __WEBPACK_IMPORTED_MODULE_22__particles_color_domain_js__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__base_simple_collider_js__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Simple_Collider", function() { return __WEBPACK_IMPORTED_MODULE_23__base_simple_collider_js__["a"]; });













































/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWViOWQ4MjM2MzA1NzdlMGZkNzQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2UvbXlfbGliLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVfYWZmZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZV9lbWl0dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXNlL21vdXNlX2NhbWVyYV9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVzX3BvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS9ldmVudF9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2UvbW91c2VfaW50ZXJzZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2Uvc2ltcGxlX2NvbGxpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvY29sb3JfZG9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVfc2hhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlc19tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvcG9pbnRfZ2VuZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXNlL2FuaW1hdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2UvbG9hZGluZ19tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXNlL3BhY2thZ2VfbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS9zY2VuZV9zZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9taXhpbnMvY2FtZXJhX21peGluLmpzIiwid2VicGFjazovLy8uL3NyYy9taXhpbnMvdGhyZWVqc19taXhpbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9jdXN0b21fYWZmZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9jdXN0b21fZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL2ZvcmNlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL3Rlc3RfZW1pdHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZV9tYWluX3dlYnBhY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoRUE7QUFBQTtBQUNBOzs7QUFHQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFF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Q0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0I7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRDtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMLENBQUM7Ozs7Ozs7Ozs7OztBQ2pHRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLEc7QUFDSjtBQUNBOzs7QUFHUTs7Ozs7Ozs7O0FDL0RSO0FBQUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixpQ0FBaUM7QUFDOUQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isc0JBQXNCO0FBQzVDO0FBQ0Esb0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7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Q0FBc0M7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNwZGU7QUFDVTtBQUNDO0FBQ0Q7QUFDRDs7O0FBR3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxzQkFBc0IsaUNBQWlDO0FBQ3ZEO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsMkI7QUFDQSxTO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDMU1BO0FBQUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEI7QUFDQSwwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDeENBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBOztBQUVlO0FBQ21CO0FBQ1I7OztBQUcxQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsZ0M7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUEscUU7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEO0FBQ0Esd0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxrQ0FBa0M7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELFNBQVM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsU0FBUztBQUM1RDtBQUNBO0FBQ0E7QUFDQSxxRTtBQUNBO0FBQ0EsNkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDL1hlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7OztBQUdROzs7Ozs7Ozs7O0FDM0tPOztBQUVmO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvT0E7O0FBRWU7O0FBRTBDO0FBQy9CO0FBQ007QUFDUjtBQUNBOzs7OztBQUtDO0FBQ0E7O0FBRUQ7O0FBRUU7O0FBRUQ7O0FBRUY7O0FBRUM7O0FBRW9EOztBQUVuRDs7QUFFRDs7QUFFQzs7QUFFQTtBQUN6QjtBQUNBOztBQUVvQjs7QUFFYyIsImZpbGUiOiJlbmdpbmUuZGV2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWViOWQ4MjM2MzA1NzdlMGZkNzQiLCIvKlxyXG4qL1xyXG5cclxuXHJcbnZhciBNeV9MaWIgPSB7fTtcclxuXHJcbk15X0xpYi5WaWV3cG9ydCA9IHt9O1xyXG5cclxuXHJcbk15X0xpYi5PYmplY3RfQW5pbWF0aW9uID0gZnVuY3Rpb24gKG9iamVjdCwgYW5pbWF0aW9uKVxyXG57XHJcblx0dGhpcy5vYmplY3QgPSBvYmplY3Q7XHJcblx0dGhpcy5hbmltYXRpb24gPSBhbmltYXRpb247XHJcbn1cclxuXHJcbk15X0xpYi5PYmplY3RfQW5pbWF0aW9uLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpXHJcbntcclxuXHR0aGlzLmFuaW1hdGlvbih0aGlzLm9iamVjdCwgZHQpO1xyXG59XHJcblxyXG5NeV9MaWIuY3JlYXRlX3RleHRfaW1hZ2UgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgdGV4dCwgbnBvdCwgYmFja2dyb3VuZCkgXHJcbntcclxuXHQvLyBjcmVhdGUgYSBjYW52YXMgZWxlbWVudFxyXG5cdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuXHRjYW52YXMud2lkdGggPSB3aWR0aDtcclxuXHRjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblx0aWYgKGJhY2tncm91bmQpIFxyXG5cdHtcclxuXHRcdGNvbnRleHQuZmlsbFN0eWxlID0gYmFja2dyb3VuZDtcclxuXHRcdGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHR9XHJcblx0Y29udGV4dC5mb250ID0gXCJCb2xkIDQwcHggQXJpYWxcIjtcclxuXHRjb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgwLDI1NSwwLDAuOTUpXCI7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KCdIZWxsbywgd29ybGQhJywgMCwgNTApO1xyXG4gICAgXHJcblx0Ly8gY2FudmFzIGNvbnRlbnRzIHdpbGwgYmUgdXNlZCBmb3IgYSB0ZXh0dXJlXHJcblx0dmFyIHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShjYW52YXMpIFxyXG5cdGlmIChucG90KSB7XHJcblx0XHR0ZXh0dXJlLndyYXBTID0gdGV4dHVyZS53cmFwVCA9IFRIUkVFLlRleHR1cmVXcmFwcGluZy5DbGFtcFRvRWRnZVdyYXBwaW5nO1xyXG5cdFx0dGV4dHVyZS5taW5GaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XHJcblx0fVxyXG5cdHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlOyBcdFxyXG5cdHJldHVybiB0ZXh0dXJlO1xyXG59XHJcblxyXG5cclxuTXlfTGliLkNyZWF0ZV9RdWFkID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIHZlcnRleF9zaGFkZXIsIGZyYWdtZW50X3NoYWRlcilcclxue1xyXG5cdC8vcGxhbmUgY3JlYXRlZCB0dXJuIGF3YXkgZnJvbSBjYW1lcmFcclxuXHR2YXIgcGxhbmUgPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggd2lkdGgsIGhlaWdodCk7XHJcblx0XHJcblx0dmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCB7XHJcblx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleF9zaGFkZXIsXHJcblx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnRfc2hhZGVyXHJcblx0fSApOyBcclxuXHJcblx0dmFyIHF1YWQgPSBuZXcgVEhSRUUuTWVzaCggcGxhbmUsIG1hdGVyaWFsICk7XHJcblx0cXVhZC5yb3RhdGlvbi55ID0gTWF0aC5QSTtcclxuXHRyZXR1cm4gcXVhZDtcclxufVxyXG5cclxuXHJcbk15X0xpYi5SZW5kZXJfVGFyZ2V0ID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpXHJcbntcclxuXHR0aGlzLnRhcmdldCA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlclRhcmdldCggXHJcblx0d2lkdGgsIFxyXG5cdGhlaWdodCwgXHJcblx0eyBcclxuXHRcdG1pbkZpbHRlcjogVEhSRUUuTGluZWFyRmlsdGVyLCBcclxuXHRcdG1hZ0ZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlciwgXHJcblx0XHRmb3JtYXQ6IFRIUkVFLlJHQkZvcm1hdCBcclxuXHR9ICk7IFxyXG5cdFxyXG5cdHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDgwLCB3aWR0aC9oZWlnaHQsIDAuMSwgMTAwMCk7XHJcbn1cclxuXHJcbk15X0xpYi5SZW5kZXJfVGFyZ2V0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoc2NlbmUsIHJlbmRlcmVyKVxyXG57XHJcblx0cmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgXHJcblx0XHR0aGlzLmNhbWVyYSwgXHJcblx0XHR0aGlzLnRhcmdldCwgXHJcblx0XHR0cnVlICAvL2ZvcmNlQ2xlYXJcclxuXHRcdCk7XHJcbn1cclxuXHJcblxyXG5NeV9MaWIuY3JlYXRlX292ZXJsYXlfY2FtZXJhID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpXHJcbntcclxuXHR2YXIgY2FtZXJhID0gIG5ldyBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEoIFxyXG5cdFx0d2lkdGggLyAtIDIsIFxyXG5cdFx0d2lkdGggLyAyLCBcclxuXHRcdGhlaWdodCAvIDIsIFxyXG5cdFx0aGVpZ2h0IC8tIDIsIC0xMDAwMCwgMTAwMDAgKTtcclxuXHRyZXR1cm4gY2FtZXJhO1xyXG59XHJcblxyXG5NeV9MaWIuT3ZlcmxheSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KVxyXG57XHJcblx0dGhpcy5jYW1lcmEgPSBNeV9MaWIuY3JlYXRlX292ZXJsYXlfY2FtZXJhKHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcblxyXG5NeV9MaWIuT3ZlcmxheS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlcmVyKVxyXG57XHJcblx0aWYgKCF0aGlzLnNjZW5lKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdFxyXG5cdHJlbmRlcmVyLmF1dG9DbGVhciA9IGZhbHNlO1xyXG5cdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XHJcblx0cmVuZGVyZXIuYXV0b0NsZWFyID0gdHJ1ZTtcclxufVxyXG5cclxuXHJcbk15X0xpYi5Nb3VzZV9Db250cm9sbGVyID0gZnVuY3Rpb24gKHJvb3QsIG92ZXIsIGNsaWNrLCBjYWxsYmFjaylcclxue1xyXG5cdHRoaXMucm9vdCA9IHJvb3Q7XHJcblx0dGhpcy5vdmVyID0gb3ZlcjtcclxuXHR0aGlzLmNsaWNrID0gISFjbGljaztcclxuXHR0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbn1cclxuXHJcblxyXG5cclxuLypcclxudWdseSBoYWNrXHJcbiovXHJcblxyXG5NeV9MaWIuZXZlbnRfaHViID0gbmV3IEV2ZW50X0h1YigpO1xyXG5cclxuZnVuY3Rpb24gRXZlbnRfSHViKCkge1xyXG4gICAgdGhpcy5ldmVudHMgPSB7fTtcclxufVxyXG5cclxuXHJcblxyXG5FdmVudF9IdWIucHJvdG90eXBlLmFkZF9ldmVudF9saXN0ZW5lciA9IGZ1bmN0aW9uIChuYW1lLCBmdW5jLCBvYmopXHJcbntcclxuICAgIGlmICghdGhpcy5ldmVudHNbbmFtZV0pIHtcclxuICAgICAgICB0aGlzLmV2ZW50c1tuYW1lXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ldmVudHNbbmFtZV0ucHVzaCgge25hbWU6IG5hbWUsIGZ1bmM6IGZ1bmMsIG9iajogb2JqfSApO1xyXG59XHJcblxyXG5FdmVudF9IdWIucHJvdG90eXBlLm9uICA9IEV2ZW50X0h1Yi5wcm90b3R5cGUuYWRkX2V2ZW50X2xpc3RlbmVyO1xyXG5cclxuRXZlbnRfSHViLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24obmFtZSwgb2JqKVxyXG57XHJcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNbbmFtZV07XHJcbiAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdCA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgdC5mdW5jLmNhbGwodC5vYmosIG9iaik7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxudmFyIHJ1bl9mdW5jdGlvbiA9IC8vd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuXHRmdW5jdGlvbihjYWxsYmFjayl7XHJcblx0XHR3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuXHR9XHJcblxyXG5cclxuTXlfTGliLmNyZWF0ZV9ydW5fZnVuY3Rpb24gPSBmdW5jdGlvbiAoYXBwKSBcclxue1xyXG4gICAgTXlfTGliLnJ1biA9IGZ1bmN0aW9uICgpIHsgcnVuX2Z1bmN0aW9uKCBmdW5jdGlvbiAoKSB7IGFwcC5sb29wKCk7IH0pOyB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbk15X0xpYi5FdWxlcl9Db250cm9sbGVyID0gZnVuY3Rpb24gKG9iaiwgeCwgeSwgeilcclxue1xyXG5cdHRoaXMub2JqID0gb2JqO1xyXG5cdHRoaXMueHNwZWVkID0geCAqIE1hdGguUEkgLyAxODA7O1xyXG5cdHRoaXMueXNwZWVkID0geSAqIE1hdGguUEkgLyAxODA7O1xyXG5cdHRoaXMuenNwZWVkID0geiAqIE1hdGguUEkgLyAxODA7O1xyXG59XHJcblxyXG5NeV9MaWIuRXVsZXJfQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KVxyXG57XHJcblx0dGhpcy5vYmoucm90YXRpb24ueCArPSB0aGlzLnhzcGVlZCAqIGR0O1xyXG5cdHRoaXMub2JqLnJvdGF0aW9uLnkgKz0gdGhpcy55c3BlZWQgKiBkdDtcclxuXHR0aGlzLm9iai5yb3RhdGlvbi56ICs9IHRoaXMuenNwZWVkICogZHQ7XHJcbn1cclxuXHJcbi8vQ2xhc3MgTGlicmFyeVxyXG5NeV9MaWIuUmVnaXN0ZXJlZF9DbGFzc2VzID0ge307XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MgPSBmdW5jdGlvbiAobmFtZSwgZnVuYylcclxue1xyXG5cdGlmIChNeV9MaWIuUmVnaXN0ZXJlZF9DbGFzc2VzW25hbWVdKXtcclxuXHRcdGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgQ2xhc3MgRVJST1IhIENsYXNzIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzIVwiLCBuYW1lKTtcclxuXHR9XHJcblx0TXlfTGliLlJlZ2lzdGVyZWRfQ2xhc3Nlc1tuYW1lXSA9IGZ1bmM7XHJcbn1cclxuXHJcbk15X0xpYi5HZXRfQ2xhc3MgPSBmdW5jdGlvbiAobmFtZSlcclxue1xyXG5cdHJldHVybiBNeV9MaWIuUmVnaXN0ZXJlZF9DbGFzc2VzW25hbWVdO1xyXG59XHJcblxyXG5cclxuTXlfTGliLmNyZWF0ZV9jbGFzcyA9IGZ1bmN0aW9uKHBhcmVudCwgY2hpbGQsIHByb3BzLCBuYW1lKVxyXG57XHJcbiAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgY2hpbGQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQucHJvdG90eXBlKTtcclxuICAgIH0gXHJcbiAgICBfLmNvcHlfb2JqZWN0KGNoaWxkLnByb3RvdHlwZSwgcHJvcHMpO1xyXG4gICAgY2hpbGQucHJvdG90eXBlLmNvbnRydWN0b3IgPSBjaGlsZDsgICAgICAgICAgICAgICAgXHJcbiAgICBNeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoY2hpbGQsIG5hbWUpO1xyXG59XHJcblxyXG5NeV9MaWIuQWJzdHJhY3RfRmFicmljID0gZnVuY3Rpb24gKGRhdGEpXHJcbntcclxuICAgIHZhciBjb25zdHJ1Y3RvciA9IE15X0xpYi5HZXRfQ2xhc3MoZGF0YS50eXBlKTtcclxuICAgIGlmIChjb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgIHZhciBvYmplY3QgPSBuZXcgY29uc3RydWN0b3IoKTtcclxuICAgICAgICBvYmplY3QucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbk15X0xpYi5QcmludF9DbGFzc2VzID0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgZm9yKHZhciBrZXkgaW4gdGhpcy5SZWdpc3RlcmVkX0NsYXNzZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNsYXNzIHJlZ2lzdGVyZWQgOlwiLCBrZXksIHRoaXMuUmVnaXN0ZXJlZF9DbGFzc2VzW2tleV0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgTXlfTGliIH07XHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYXNlL215X2xpYi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5cclxuLy9iYXNlIGNsYXNzIGZvciBwYXJ0aWNsZSBhZmZlY3RvclxyXG5mdW5jdGlvbiBQYXJ0aWNsZV9BZmZlY3RvcigpXHJcbntcclxuICAgIHRoaXMuaWQgPSBfLmdlbmVyYXRlVVVJRCgpO1xyXG59XHJcblxyXG5cclxuUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLmFmZmVjdCA9IGZ1bmN0aW9uIChkdCwgcGRhdGEsIHZlcnQsIGNvbG9yKVxyXG57XHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcblBhcnRpY2xlX0FmZmVjdG9yLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoY2hpbGQpXHJcbntcclxuXHRpZiAoY2hpbGQpIHtcclxuXHRcdHJldHVybiB7fTtcclxuXHR9XHJcblx0dmFyIGRhdGEgPSB7XHJcbiAgICAgICAgaWQ6IHRoaXMuaWQsXHJcblx0XHRcIm5hbWVcIjogXCJQYXJ0aWNsZV9BZmZlY3RvclwiLFxyXG5cdFx0cGFyYW1zIDoge31cclxuXHR9O1xyXG4gICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgIH1cclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG5cclxuUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKGpzb24pXHJcbntcclxufVxyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiUGFydGljbGVfQWZmZWN0b3JcIiwgUGFydGljbGVfQWZmZWN0b3IpO1xyXG5cclxuZnVuY3Rpb24gRm9yY2VfQWZmZWN0b3IoKVxyXG57XHJcbiAgICBQYXJ0aWNsZV9BZmZlY3Rvci5jYWxsKHRoaXMpO1xyXG5cdHRoaXMuZm9yY2VzID0gbmV3IEFycmF5KCk7XHJcbn1cclxuXHJcbkZvcmNlX0FmZmVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlKTtcclxuXHJcbl8uY29weV9vYmplY3QoRm9yY2VfQWZmZWN0b3IucHJvdG90eXBlLCB7XHJcblx0Y29uc3RydWN0b3I6IEZvcmNlX0FmZmVjdG9yLFxyXG5cdGFkZF9mb3JjZTogZnVuY3Rpb24gKGZvcmNlKVxyXG5cdHtcclxuXHRcdHRoaXMuZm9yY2VzLnB1c2goZm9yY2UpO1xyXG5cdH0sXHJcblx0YXBwbHlfZm9yY2VzOiBmdW5jdGlvbiAoZHQsIHBhcnRpY2xlLCB2ZXJ0LCBjb2xvcilcclxuXHR7XHJcblx0XHR2YXIgYWNjZWxlcmF0aW9uID0ge3g6MCwgeTowLCB6OjB9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZm9yY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMuZm9yY2VzW2ldLmNhbGMoZHQsIHBhcnRpY2xlLCBhY2NlbGVyYXRpb24pO1xyXG5cdFx0fVxyXG5cdFx0Ly9pbnRlZ3JhdGVcclxuXHRcdHBhcnRpY2xlLnZlbG9jaXR5LnggKz0gYWNjZWxlcmF0aW9uLnggKiBkdDtcclxuXHRcdHBhcnRpY2xlLnZlbG9jaXR5LnkgKz0gYWNjZWxlcmF0aW9uLnkgKiBkdDtcclxuXHRcdHBhcnRpY2xlLnZlbG9jaXR5LnogKz0gYWNjZWxlcmF0aW9uLnogKiBkdDtcclxuXHR9LFxyXG5cdGFmZmVjdDogZnVuY3Rpb24gKGR0LCBwYXJ0aWNsZSwgdmVydCwgY29sb3IpXHJcblx0e1xyXG5cdFx0dGhpcy5hcHBseV9mb3JjZXMoZHQsIHBhcnRpY2xlLCB2ZXJ0LCBjb2xvcik7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9LFxyXG5cdHRvSlNPTjogZnVuY3Rpb24gKGNoaWxkKVxyXG5cdHtcclxuXHRcdHZhciBkYXRhID0ge307XHJcblx0XHRkYXRhLm5hbWUgPSBcIkZvcmNlX0FmZmVjdG9yXCI7XHRcdFxyXG4gICAgICAgIGRhdGEudXVpZCA9IHRoaXMudXVpZDtcclxuXHRcdGRhdGEucGFyYW1zID0gUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMsIHRoaXMpO1xyXG5cdFx0aWYgKHRoaXMuZm9yY2VzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0ZGF0YS5wYXJhbXMuZm9yY2VzID0gbmV3IEFycmF5KCk7XHJcblx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmZvcmNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGRhdGEucGFyYW1zLmZvcmNlcy5wdXNoKCB0aGlzLmZvcmNlc1tpXS50b0pTT04oKSApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9LFxyXG5cdHBhcnNlOiBmdW5jdGlvbiAoanNvbilcclxuXHR7XHJcblx0XHR2YXIgZiwgaXRlbTtcclxuXHRcdGlmIChqc29uLmZvcmNlcykge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRmb3IodmFyIGkgPTA7IGkgPCBqc29uLmZvcmNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGl0ZW0gPSBqc29uLmZvcmNlc1tpXTtcclxuXHRcdFx0XHRmID0gTXlfTGliLkdldF9DbGFzcyhpdGVtLm5hbWUpO1xyXG5cdFx0XHRcdGlmIChmKSB7XHJcblx0XHRcdFx0XHRmID0gbmV3IGYoKTtcclxuXHRcdFx0XHRcdGYucGFyc2UoaXRlbSk7XHJcblx0XHRcdFx0XHR0aGlzLmFkZF9mb3JjZShmKTtcclxuXHRcdFx0XHR9IFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIkZvcmNlX0FmZmVjdG9yXCIsIEZvcmNlX0FmZmVjdG9yKTtcclxuXHJcbmV4cG9ydCB7IFBhcnRpY2xlX0FmZmVjdG9yLCBGb3JjZV9BZmZlY3RvciB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZV9hZmZlY3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5cclxuLy9CYXNlIGNsYXNzIGZvciBQYXJ0aWNsZSBFbWl0dGVyc1xyXG5mdW5jdGlvbiBQYXJ0aWNsZV9FbWl0dGVyKGVtaXRfcGVyX3NlY29uZClcclxue1xyXG4gICAgdGhpcy51dWlkID0gXy5nZW5lcmF0ZVVVSUQoKTtcclxuICAgIHRoaXMubmFtZSA9ICcnO1xyXG5cdHRoaXMuZW1pdF9kZWx0YSA9IDA7XHJcblx0dGhpcy5lbWl0X2NvdW50ID0gMDtcclxuXHR0aGlzLmVtaXRfcGVyX3NlY29uZCA9IGVtaXRfcGVyX3NlY29uZCB8fCA1O1xyXG5cdC8vbGluZWFyIGludGVycG9sYXRpb24gPSBtaW4gKyByYW5kb20gKiAobWF4LW1pbilcdFxyXG5cdHRoaXMubGlmZXRpbWUgPSB7XCJtaW5cIjogMCwgXCJtYXhcIjoyLjB9O1xyXG59XHJcblxyXG5QYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS5lbWl0X2xpZmUgPSBmdW5jdGlvbiAoKVxyXG57XHJcblx0cmV0dXJuIHRoaXMubGlmZXRpbWUubWluICsgTWF0aC5yYW5kb20oKSAqICh0aGlzLmxpZmV0aW1lLm1heCAtIHRoaXMubGlmZXRpbWUubWluKTtcclxufVxyXG5cclxuUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUuY2FsY19lbWl0dGVkX3BhcnRpY2xlcyA9IGZ1bmN0aW9uIChkdClcclxue1xyXG5cdC8vY291bnQgcGFydGljbGVzIG5lZWQgZW1pdFxyXG5cdHRoaXMuZW1pdF9kZWx0YSArPSB0aGlzLmVtaXRfcGVyX3NlY29uZCpkdDtcclxuXHR2YXIgbmVlZF9lbWl0ID0gTWF0aC5mbG9vcih0aGlzLmVtaXRfZGVsdGEpO1xyXG5cdGlmIChuZWVkX2VtaXQgPiAwKSB7XHJcblx0XHR0aGlzLmVtaXRfZGVsdGEgLT0gbmVlZF9lbWl0O1xyXG5cdFx0Ly90aGlzLmVtaXRfY291bnQgKz0gbmVlZF9lbWl0O1xyXG5cdFx0Ly9uZWVkX2VtaXQgPSB0aGlzLmVtaXRfY291bnQ7XHJcblx0fVxyXG5cdHJldHVybiBuZWVkX2VtaXQ7XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKHAsIGMsIG1hdHJpeClcclxue1xyXG4gICAgcC5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XHJcbiAgICBwLnZlbG9jaXR5LnNldCgwLCAxLCAwKTtcclxuICAgIFxyXG4gICAgaWYgKG1hdHJpeCkge1xyXG4gICAgICAgIHAucG9zaXRpb24uYXBwbHlNYXRyaXg0KG1hdHJpeCk7XHJcbiAgICAgICAgcC52ZWxvY2l0eS5hcHBseU1hdHJpeDRfcm90YXRpb24obWF0cml4KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIChjaGlsZClcclxue1xyXG5cdHZhciBwYXJhbXMgPSB7XHJcbiAgICAgICAgXCJ1dWlkXCI6IHRoaXMudXVpZCxcclxuXHRcdFwiZW1pdF9wZXJfc2Vjb25kXCI6IHRoaXMuZW1pdF9wZXJfc2Vjb25kLFxyXG5cdFx0XCJsaWZldGltZVwiOiB7XHJcblx0XHRcdFwibWluXCI6IHRoaXMubGlmZXRpbWUubWluLFxyXG5cdFx0XHRcIm1heFwiOiB0aGlzLmxpZmV0aW1lLm1heFxyXG5cdFx0fSxcclxuXHR9O1xyXG4gICAgaWYgKHRoaXMubmFtZSkge1xyXG4gICAgICAgIHBhcmFtcy5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgfVxyXG5cdGlmIChjaGlsZCkge1xyXG5cdFx0cmV0dXJuIHBhcmFtcztcclxuXHR9XHJcblx0dmFyIGRhdGEgPSB7fTtcclxuXHRkYXRhLm5hbWUgPSBcIlBhcnRpY2xlX0VtaXR0ZXJcIjtcclxuXHRkYXRhLnBhcmFtcyA9IHBhcmFtcztcdFxyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChkYXRhKVxyXG57XHJcblx0dGhpcy5lbWl0X3Blcl9zZWNvbmQgPSBkYXRhLmVtaXRfcGVyX3NlY29uZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMudXVpZCA9IGRhdGEudXVpZCB8fCBfLmdlbmVyYXRlVVVJRCgpO1xyXG5cdF8uY29weV9vYmplY3QodGhpcy5saWZldGltZSwgZGF0YS5saWZldGltZSk7XHJcbn1cclxuXHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIlBhcnRpY2xlX0VtaXR0ZXJcIiwgUGFydGljbGVfRW1pdHRlcik7XHJcblxyXG5leHBvcnQgeyBQYXJ0aWNsZV9FbWl0dGVyIH07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZV9lbWl0dGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vVW5mb3J0dW5hdGVseSwgY2FudmFzIHByb3BlcnRpZXMgY2FuIGNoYW5nZSBwZXJtYW5lbnR5LiBcclxuLy9CZWNhdXNlLCB5b3UgbmVlZCBkbyByZWZyZXNoX2NhbnZhcyBvbiBlYWNoIGNhbGwhXHJcbi8vZWFjaCB0aW1lIHlvdSBuZWVkIHJlY2FjbCBCb3VuZGluZ1JlY3QgYW5kIGNsaWVudFJlY3Qgb2YgdGhlIGZ1Y2tpbmcgY2FudmFzXHJcbi8vYWxzbywgY2FtZXJhIG1heSBiZSBub3QgdGhhdCBjYW1lcmEsIHdobyByZW5kZXIgc2NlbmUuIGl0IG1heSBiZSBvdGhlciBjYW1lcmFcclxuLy9iZWNhdXNlIHlvdSBuZWVkIHJlZnJlc2ggY2FtZXJhIG9uIGVhc2ggY2FsbFxyXG4vL2kgY291bGQgZG9uZSB0aGlzIG5vcm1hbCBmdW5jdGlvbiwgYnV0IHRoaXMgb2JqZWN0IG1heSBkbyBkaWZmZXJlbnQgam9iXHJcbi8vdGhpcyBpcyBzaW5nbGUtdGltZSBvYmplY3RcclxuLy9pdCBlYXN5IGVjb25vbXlmeSBudW1iZXIgb2YgYXJndW1lbnRzIG9uIGNhbGxpbmcgZnVuY3Rpb25zXHJcblxyXG4vL25vdCwgdGhpcyBjbGFzcyBkb2Vzbid0IHN0b3JlIHJlZmVyZW5jZSB0byBjYW52YXMsIFxyXG4vL3RoaXMgc3RvcmUgb25seSBpbmZvcm1hdGlvbiBhYm91dCBjYW52YXMgc2l6ZSBhbmQgcG9zaXRpb24gXHJcbi8vaS5lLiBCb3VuZGluZ0NsaWVudFJlY3QgYW5kIGNsaWVudFdpZHRoLGNsaWVudEhlaWdodFxyXG4vL3llcywgdGhpcyBjbGFzcyBzdG9yZSByZWZlcmVuY2UgdG8gY2FtZXJhXHJcblxyXG4vL3Byb2JhYmx5LCBpdCBtYXkgYmUgbWl4aW4gdG8gY2FtZXJhXHJcblxyXG5cclxuZnVuY3Rpb24gTW91c2VfQ2FtZXJhX0NvbnRyb2xsZXIoY2FudmFzLCBjYW1lcmEpXHJcbntcclxuICAgIGlmIChjYW52YXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb3VzZV9DYW1lcmFfQ29udHJvbGxlci4gUHJvcGFibGUgcHJlbW9yZGlhbCBjcmVhdGluZyBvYmplY3QuIGNhbnZhcyBpcyB1bmRlZmluZWQuIERvIG5vdGhpbmdcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2V0X2NhbnZhc19pbmZvKGNhbnZhcyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcclxufVxyXG5cclxuXy5jb3B5X29iamVjdChNb3VzZV9DYW1lcmFfQ29udHJvbGxlci5wcm90b3R5cGUse1xyXG4gICAgY29uc3RydWN0b3IgOiBNb3VzZV9DYW1lcmFfQ29udHJvbGxlcixcclxuICAgIHNldF9jYW52YXNfaW5mbzogZnVuY3Rpb24gKGNhbnZhcylcclxuICAgIHtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZWZ0OiBvZmZzZXQubGVmdCxcclxuICAgICAgICAgICAgdG9wIDogb2Zmc2V0LnRvcFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XHJcbiAgICB9LFxyXG4gICAgcmVmcmVzaF9jYW52YXM6IGZ1bmN0aW9uIChuZXdfY2FudmFzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2V0X2NhbnZhc19pbmZvKG5ld19jYW52YXMpO1xyXG4gICAgfVxyXG4gICAgLFxyXG4gICAgZ2V0X25vcm1hbGl6ZWRfc2NyZWVuX2Nvb3JkaW5hdGVzOiBmdW5jdGlvbiAoeCx5KVxyXG4gICAge1xyXG4gICAgICAgIC8vc3RlcCAxIDogbm9ybWFsaXplZFxyXG4gICAgICAgIHggPSAoeCAtIHRoaXMub2Zmc2V0LmxlZnQpIC8gdGhpcy53aWR0aDtcclxuICAgICAgICB5ID0gKHkgLSB0aGlzLm9mZnNldC50b3ApIC8gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgLy9zdGVwIDIgOiBmcm9tIHVuc2lnbmVkIHRvIHNpZ25lZCwgdHJhbnNsYXRlIG9yaWdpbiBmcm9tIHRvcCBsZWZ0IGNvcm5lciB0byBjZW50ZXIgXHJcbiAgICAgICAgdmFyIHggPSB4ICogMi4wIC0gMS4wO1xyXG4gICAgICAgIHZhciB5ID0gLSh5ICogMi4wIC0gMS4wKTtcclxuICAgICAgICB2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoIHgsIHksIDEgKTtcclxuICAgICAgICByZXR1cm4gdmVjdG9yOyAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvL2RvIHNvbWUgd2hhdCBwcmV2ZW50IG1ldGhvZCwgb25seSBnaXZlIG1vdXNlIGV2ZW50IGluc3RlYWQgeCx5IGNvb3JkaWFudGVzXHJcbiAgICBnZXRfbm9ybWFsaXplX21vdXNlX3Bvc2l0aW9uOiBmdW5jdGlvbiAoZXZlbnQpIFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldF9ub3JtYWxpemVkX3NjcmVlbl9jb29yZGluYXRlcyhldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIC8vcmV0dXJuIG5ldyB1bnByb2plY3QgdmVjdG9yLCBub3QgY2hhbmdlIGdpdmVuXHJcbiAgICAvL3VzZWQgVEhSRUUuVmVjdG9yMy51bnByb2plY3QgbWV0aG9kXHJcbiAgICAvL2luY2x1ZGluZyBhcHBseSBpbnZlciBjYW1lcmEgbWF0cml4XHJcbiAgICAvL29uIG15IHZpZXcsIHRoYXQgd3JvbmcsIGJlY2F1c2UgbWV0aG9kIGRvIGl0IGJpZyB0aGVuIHByb21pc2VcclxuICAgIC8vdW5wcm9qZWN0IG11c3QgZG8gb25seSB1bnByb2plY3QsIG5vdCBlbHNlIHRoaW5nXHJcbiAgICAvL2JlY2F1c2UgbXkgbmVlZCBuZXcgbWV0aG9kLCB3aG8gd2lsbCBkbyBvbmx5IHVucHJvamVjdCBcclxuICAgIHVucHJvamVjdDogZnVuY3Rpb24odmVjdG9yKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxuICAgICAgICByLmNvcHkodmVjdG9yKTtcclxuICAgICAgICByLnVucHJvamVjdCh0aGlzLmNhbWVyYSk7XHJcbiAgICAgICAgLy90aGlzIGFyZWFkeSBkb25lIFxyXG4gICAgICAgIC8vci5hcHBseU1hdHJpeDQoY2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZSk7ICAgIFxyXG4gICAgICAgIHJldHVybiByO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL2dldCByYXkgd2l0aCBvcmlnaW4gaW4gY2FtZXJhIHBvc2l0aW9uIGFuZCBkaXJlY3Rpb24sIFxyXG4gICAgLy9wb2ludGVkIHRvIGZhciBhd2F5IHdoZXJlIHVucHJvamVjdCBzY3JlZW4gcG9pbnQgYXJlXHJcbiAgICBnZXRfcmF5X2Zyb21fY2FtZXJhX2luX3NjcmVlbl9jb29yZGluYXRlczogZnVuY3Rpb24gKHgseSkgXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHZlY3RvciA9IHRoaXMuZ2V0X25vcm1hbGl6ZWRfc2NyZWVuX2Nvb3JkaW5hdGVzKHgseSk7XHJcbiAgICAgICAgdmVjdG9yID0gdGhpcy51bnByb2plY3QodmVjdG9yKTtcclxuICAgICAgICB2YXIgcmF5ID0gbmV3IFRIUkVFLlJheSggdGhpcy5jYW1lcmEucG9zaXRpb24sIHZlY3Rvci5zdWIoIHRoaXMuY2FtZXJhLnBvc2l0aW9uICkubm9ybWFsaXplKCkgKTtcclxuICAgICAgICByZXR1cm4gcmF5O1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgLy9kbyBzYW1lIHdoYXQgcHJldmVudCBtZXRob2QsIG9ubHkgZ2l2ZSBtb3VzZSBldmVudCBmb3IgY29udmllbmNlXHJcbiAgICAvL3NlZSBpdCBhcyBvdmVycmlkaW5nIGZ1bmN0aW9uIGluIEMrK1xyXG4gICAgZ2V0X3JheV9mcm9tX2NhbWVyYV9pbl9tb3VzZV9wb3NpdGlvbjogZnVuY3Rpb24gKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldF9yYXlfZnJvbV9jYW1lcmFfaW5fc2NyZWVuX2Nvb3JkaW5hdGVzKGV2ZW50LngsIGV2ZW50LnkpO1xyXG4gICAgfSxcclxuXHJcblxyXG59KTtcclxuXHJcblxyXG5leHBvcnQgeyBNb3VzZV9DYW1lcmFfQ29udHJvbGxlciB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Jhc2UvbW91c2VfY2FtZXJhX2NvbnRyb2xsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiICAgIFxyXG5mdW5jdGlvbiBQYXJ0aWNsZXNfUG9pbnRzIChnZW9tZXRyeSwgbWF0ZXJpYWwpXHJcbntcclxuICAgIFRIUkVFLlBvaW50cy5jYWxsKHRoaXMsIGdlb21ldHJ5LCBtYXRlcmlhbCk7XHJcbiAgICB0aGlzLnR5cGUgPSAncGFydGljbGVzX3BvaW50cyc7XHJcbiAgICBcclxuICAgIHRoaXMuYm91bmRpbmdTcGhlcmUgPSBuZXcgVEhSRUUuU3BoZXJlKCk7XHJcbiAgICB0aGlzLmJvdW5kaW5nU3BoZXJlLnJhZGl1cyA9IDEwLjA7XHJcbn1cclxuXHJcblBhcnRpY2xlc19Qb2ludHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVEhSRUUuUG9pbnRzLnByb3RvdHlwZSApXHJcblxyXG5QYXJ0aWNsZXNfUG9pbnRzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFBhcnRpY2xlc19Qb2ludHM7XHJcblxyXG5QYXJ0aWNsZXNfUG9pbnRzLnByb3RvdHlwZS5nZXRCb3VuZGluZ1NwaGVyZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuYm91bmRpbmdTcGhlcmU7XHJcbn1cclxuXHJcblBhcnRpY2xlc19Qb2ludHMucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIChtZXRhKVxyXG57XHJcbiAgICB2YXIgbWF0ID0gdGhpcy5tYXRlcmlhbDtcclxuICAgIHZhciBnZW9tID0gdGhpcy5nZW9tZXRyeTtcclxuICAgIHRoaXMubWF0ZXJpYWwgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmdlb21ldHJ5ID0gdW5kZWZpbmVkO1xyXG4gICAgdmFyIG9iamVjdCA9ICBUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgbWV0YSk7XHJcbiAgICB0aGlzLm1hdGVyaWFsID0gbWF0O1xyXG4gICAgdGhpcy5nZW9tZXRyeSA9IGdlb207XHJcbiAgICByZXR1cm4gb2JqZWN0O1xyXG59XHJcblxyXG4vL1dURj9cclxuUGFydGljbGVzX1BvaW50cy5wcm90b3R5cGUucmF5Y2FzdCA9IGZ1bmN0aW9uIChyYXljYXN0ZXIsIGludGVyc2VjdHMpXHJcbntcclxuICAgIHZhciBzcGhlcmUgPSBuZXcgVEhSRUUuU3BoZXJlKClcclxuICAgIHNwaGVyZS5jb3B5KCB0aGlzLmJvdW5kaW5nU3BoZXJlICk7XHJcbiAgICBzcGhlcmUuYXBwbHlNYXRyaXg0KCB0aGlzLm1hdHJpeFdvcmxkICk7IFxyXG4gICAgdmFyIHIgPSByYXljYXN0ZXIucmF5LmludGVyc2VjdHNTcGhlcmUoIHNwaGVyZSApO1xyXG4gICAgaWYgKCByID09PSBmYWxzZSApIHJldHVybjtcclxuICAgIGNvbnNvbGUubG9nKFwiSU5URVJTRUNUSU9OMVwiLCB0aGlzLm5hbWUsIHNwaGVyZSk7XHJcbiAgICByZXR1cm47XHJcbiAgICBcclxuICAgIHZhciBzaGl0ICA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbiAgICBzaGl0LmNvcHkodGhpcy5wb3NpdGlvbik7XHJcbiAgICB2YXIgdHIgPSBuZXcgVEhSRUUuUmF5KCBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAyMCksIHNoaXQpO1xyXG4gICAgY29uc29sZS5sb2coXCJ0ZXN0IFwiLCB0ci5pbnRlcnNlY3RzU3BoZXJlKHNwaGVyZSksIHNwaGVyZSk7XHJcbiAgICBjb25zb2xlLmxvZyhcImhpdCBzcGhlcmUgXCIgICsgdGhpcy5uYW1lLCBzcGhlcmUsIHJheWNhc3Rlci5yYXkpO1xyXG4gICAgcmV0dXJuIHJheWNhc3Rlci5yYXkuaW50ZXJzZWN0c1NwaGVyZSggc3BoZXJlICk7XHJcbiAgICBcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coXCJoaXQgc3BoZXJlIFwiICsgdGhpcy50eXBlLCBcInNocGVyZSBpcyBcIiwgc3BoZXJlLCBcInJheSBpcyBcIiwgcik7XHJcbiAgICBpZiAocikge1xyXG4gICAgICAgICAgICB2YXIgdG1wID0gbmV3IFRIUkVFLlZlY3RvcjModGhpcy5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRtcC5zdWIocik7XHJcbiAgIFx0XHRcdGludGVyc2VjdHMucHVzaCgge1xyXG5cdFx0XHRcdGRpc3RhbmNlOiBNYXRoLnNxcnQoIHRtcC5kb3QodG1wKSApLFxyXG5cdFx0XHRcdHBvaW50OiB0aGlzLnBvc2l0aW9uLFxyXG5cdFx0XHRcdG9iamVjdDogdGhpc1xyXG5cdFx0XHR9ICk7IFxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZXNfUG9pbnRzfTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlc19wb2ludHMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gRXZlbnRfSHViKCkge1xyXG4gICAgdGhpcy5ldmVudHMgPSB7fTtcclxufVxyXG5cclxuXHJcblxyXG5FdmVudF9IdWIucHJvdG90eXBlLmFkZF9ldmVudF9saXN0ZW5lciA9IGZ1bmN0aW9uIChuYW1lLCBmdW5jLCBvYmopXHJcbntcclxuICAgIGlmICghdGhpcy5ldmVudHNbbmFtZV0pIHtcclxuICAgICAgICB0aGlzLmV2ZW50c1tuYW1lXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ldmVudHNbbmFtZV0ucHVzaCgge25hbWU6IG5hbWUsIGZ1bmM6IGZ1bmMsIG9iajogb2JqfSApO1xyXG59XHJcblxyXG5FdmVudF9IdWIucHJvdG90eXBlLm9uICA9IEV2ZW50X0h1Yi5wcm90b3R5cGUuYWRkX2V2ZW50X2xpc3RlbmVyO1xyXG5cclxuRXZlbnRfSHViLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24obmFtZSwgb2JqKVxyXG57XHJcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNbbmFtZV07XHJcbiAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdCA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgdC5mdW5jLmNhbGwodC5vYmosIG9iaik7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG52YXIgbWFpbl9ldmVudF9odWIgPSBuZXcgRXZlbnRfSHViKCk7XHJcblxyXG5leHBvcnQge21haW5fZXZlbnRfaHViLCBFdmVudF9IdWJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Jhc2UvZXZlbnRfaHViLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBNb3VzZV9JbnRlcnNlY3RvciA9IHt9O1xyXG5cclxuaW1wb3J0IHtTaW1wbGVfQ29sbGlkZXJ9IGZyb20gXCIuL3NpbXBsZV9jb2xsaWRlci5qc1wiO1xyXG5pbXBvcnQge01vdXNlX0NhbWVyYV9Db250cm9sbGVyfSBmcm9tICcuL21vdXNlX2NhbWVyYV9jb250cm9sbGVyLmpzJztcclxuXHJcblxyXG5Nb3VzZV9JbnRlcnNlY3Rvci5nZXRfbm9ybWFsaXplZF9zY3JlZW5fY29vcmRzID0gZnVuY3Rpb24gKGNhbnZhcywgeCwgeSlcclxue1xyXG5cdHZhciBvZmZzZXQgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0dmFyIHdpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoO1xyXG5cdHZhciBoZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xyXG4gICAgLy9ub3JtYWxpemUgY29vcmRpbmF0ZXNcclxuICAgIHZhciB4ID0gKHggLSBvZmZzZXQubGVmdCkgLyB3aWR0aDtcclxuICAgIHZhciB5ID0gKHkgLSBvZmZzZXQudG9wKSAvIGhlaWdodDtcclxuXHR2YXIgeCA9IHggKiAyIC0gMTtcclxuXHR2YXIgeSA9IC0oeSAqIDIgLSAxKTtcclxuXHR2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoIHgsIHksIDEgKTtcclxuXHRyZXR1cm4gdmVjdG9yO1xyXG59XHJcblxyXG5Nb3VzZV9JbnRlcnNlY3Rvci5tb3VzZV9jb29yZHNfdG9fdmVjdG9yID0gZnVuY3Rpb24gKGNhbnZhcywgZXZlbnQpIFxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5nZXRfbm9ybWFsaXplZF9zY3JlZW5fY29vcmRzKGNhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbn1cclxuXHJcblxyXG5Nb3VzZV9JbnRlcnNlY3Rvci51bnByb2plY3QgPSBmdW5jdGlvbih2ZWN0b3IsIGNhbWVyYSlcclxue1xyXG4gICAgdmFyIHIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgci5jb3B5KHZlY3Rvcik7XHJcblx0ci51bnByb2plY3QoY2FtZXJhKTtcclxuICAgIC8vdGhpcyBkb25lIHlldFxyXG4gICAgLy9yLmFwcGx5TWF0cml4NChjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlKTsgICAgXHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuTW91c2VfSW50ZXJzZWN0b3IubW91c2VfY29vcmRzX3RvX3JheSA9IGZ1bmN0aW9uIChjYW52YXMsIGV2ZW50LCBjYW1lcmEpIFxyXG57XHJcbiAgICB2YXIgdmVjdG9yID0gdGhpcy5tb3VzZV9jb29yZHNfdG9fdmVjdG9yKGNhbnZhcywgZXZlbnQpO1xyXG4gICAgdmVjdG9yID0gdGhpcy51bnByb2plY3QodmVjdG9yLCBjYW1lcmEpO1xyXG5cdHZhciByYXkgPSBuZXcgVEhSRUUuUmF5KCBjYW1lcmEucG9zaXRpb24sIHZlY3Rvci5zdWIoIGNhbWVyYS5wb3NpdGlvbiApLm5vcm1hbGl6ZSgpICk7XHJcblx0cmV0dXJuIHJheTtcclxufVxyXG5cclxuXHJcblxyXG5Nb3VzZV9JbnRlcnNlY3Rvci5maW5kX2ludGVyc2VjdGlvbl93aXRoX21vdXNlX3ZlY3RvciA9IGZ1bmN0aW9uKHZlY3RvciwgY2FtZXJhLCBzY2VuZSlcclxue1xyXG5cdHZlY3Rvci51bnByb2plY3QoY2FtZXJhKTtcclxuXHR2YXIgcmF5ID0gbmV3IFRIUkVFLlJheWNhc3RlciggY2FtZXJhLnBvc2l0aW9uLCB2ZWN0b3Iuc3ViKCBjYW1lcmEucG9zaXRpb24gKS5ub3JtYWxpemUoKSApO1xyXG5cdC8vIGNyZWF0ZSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvYmplY3RzIGluIHRoZSBzY2VuZSB3aXRoIHdoaWNoIHRoZSByYXkgaW50ZXJzZWN0c1xyXG5cdC8vdmFyIGludGVyc2VjdHMgPSByYXkuaW50ZXJzZWN0T2JqZWN0cyggW2dyaWRfdGV4dC5yb290XSwgdHJ1ZSApOyBcclxuXHQvL2NvbnNvbGUubG9nKGZha2VfcGxhbmUucm9vdC5jaGlsZHJlblswXS5nZW9tZXRyeSk7XHJcblx0dmFyIGludGVyc2VjdHMgPSByYXkuaW50ZXJzZWN0T2JqZWN0cyggW3NjZW5lXSwgdHJ1ZSApOyBcclxuXHRyZXR1cm4gaW50ZXJzZWN0cztcclxufVxyXG5cclxuXHJcbk1vdXNlX0ludGVyc2VjdG9yLmZpbmRfaW50ZXJzZWN0ZWRfb2JqZWN0ID0gZnVuY3Rpb24gKHNjZW5lLCByYXkpXHJcbntcclxuXHJcbiAgICB2YXIgY29sbGlkZXIgPSBuZXcgU2ltcGxlX0NvbGxpZGVyKHNjZW5lKTtcclxuICAgIHZhciBpbnRlcnNlY3RzID0gY29sbGlkZXIuY2hlY2tfcmF5KHJheSk7XHJcbiAgICByZXR1cm4gaW50ZXJzZWN0cztcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IE1vdXNlX0ludGVyc2VjdG9yIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFzZS9tb3VzZV9pbnRlcnNlY3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBTaW1wbGVfQ29sbGlkZXIocm9vdCwgcGFyYW1zKVxyXG57XHJcbiAgICB0aGlzLnJvb3QgPSByb290O1xyXG4gICAgaWYgKHBhcmFtcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcGFyYW1zID0ge307XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhcmFtcyA9IFxyXG4gICAge1xyXG4gICAgICAgIHJlY3Vyc2l2ZTogcGFyYW1zLnJlY3Vyc2l2ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHBhcmFtcy5yZWN1cnNpdmUsXHJcbiAgICAgICAgY2hlY2tfaW52aXNpYmxlOiBwYXJhbXMuY2hlY2tfaW52aXNpYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogcGFyYW1zLmNoZWNrX2ludmlzaWJsZSBcclxuICAgIH07XHJcbiAgICB0aGlzLmludGVyc2VjdGVkX29iamVjdHMgPSBbXTtcclxuICAgIHRoaXMuX3Rlc3RlZF9zcGhlcmUgPSBuZXcgVEhSRUUuU3BoZXJlKCk7ICAgIFxyXG59XHJcblxyXG5TaW1wbGVfQ29sbGlkZXIucHJvdG90eXBlLnByZXBhcmVfY2hlY2sgPSBmdW5jdGlvbiAocmF5KVxyXG57XHJcbiAgICB0aGlzLmludGVyc2VjdGVkX29iamVjdHMgPSBbXTtcclxuICAgIHRoaXMuaW50ZXJzZWN0ZWRfbWFwID0ge307XHJcbiAgICB0aGlzLl9mYWtlY2FzdGVyID0ge3JheTogcmF5fTsgICAgXHJcbn1cclxuXHJcblNpbXBsZV9Db2xsaWRlci5wcm90b3R5cGUuY2hlY2tfcmF5ID0gZnVuY3Rpb24gKHJheSlcclxue1xyXG4gICAgdGhpcy5wcmVwYXJlX2NoZWNrKHJheSk7XHJcbiAgICBcclxuICAgIHRoaXMuZmluZF9pbnRlcnNlY3Rpb25fd2l0aF9ib3VuZGluZ19zcGhlcmUoIHRoaXMucm9vdCk7IFxyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcy5pbnRlcnNlY3RlZF9vYmplY3RzO1xyXG59XHJcblxyXG5TaW1wbGVfQ29sbGlkZXIucHJvdG90eXBlLmFkZF9pbnRlcnNlY3RlZCA9IGZ1bmN0aW9uIChvYmopXHJcbntcclxuICAgIGlmICghdGhpcy5pbnRlcnNlY3RlZF9tYXBbb2JqLnV1aWRdKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlcnNlY3RlZF9tYXBbb2JqLnV1aWRdID0gb2JqO1xyXG4gICAgICAgIHRoaXMuaW50ZXJzZWN0ZWRfb2JqZWN0cy5wdXNoKG9iaik7XHJcbiAgICB9XHJcbn1cclxuXHJcblNpbXBsZV9Db2xsaWRlci5wcm90b3R5cGUuY2hlY2tfb2JqZWN0X2JvdW5kaW5nX3NwaGVyZSA9IGZ1bmN0aW9uKG9iailcclxue1xyXG4gICAgLy9nZXQgYm91bmRpbmcgc3BoZXJlXHJcbiAgICBpZiAob2JqLmdldEJvdW5kaW5nU3BoZXJlKSB7XHJcbiAgICAgICAgdGhpcy5fdGVzdGVkX3NwaGVyZS5jb3B5KCBvYmouZ2V0Qm91bmRpbmdTcGhlcmUoKSApO1xyXG4gICAgfSBlbHNlIGlmIChvYmouZ2VvbWV0cnkpICB7XHJcbiAgICAgICAgLy9mdWNrIHRoaXMgc2hpdCwgd2h5IGRvbid0IGV4aXN0cyBtZXRob2QgZ2V0Qm91bmRpbmdTcGhlcmUsIHdoaWNoIGVuY2Fwc3VsYXRlcyB0aGlzP1xyXG4gICAgICAgIGlmICggb2JqLmdlb21ldHJ5LmJvdW5kaW5nU3BoZXJlID09PSBudWxsICkgb2JqLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xyXG4gICAgICAgICAvL2NvcHkgc3BoZXJlIGZyb20gb2JqZWN0IGdlb21ldHJ5IGFuZCB0cmFuc2Zvcm0gaXQgd2l0aCBvYmplY3QuIG1hdHJpeFdvcmxkXHJcbiAgICAgICAgdGhpcy5fdGVzdGVkX3NwaGVyZS5jb3B5KCBvYmouZ2VvbWV0cnkuYm91bmRpbmdTcGhlcmUgKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0IGJvdW5kaW5nIHNwaGVyZVwiLCB0aGlzLl90ZXN0ZWRfc3BoZXJlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdGVzdCBib3VuZGluZyBzcGVyZVxyXG4gICAgb2JqLnVwZGF0ZU1hdHJpeFdvcmxkKHRydWUpOyAgICAgICAgXHJcbiAgICB0aGlzLl90ZXN0ZWRfc3BoZXJlLmFwcGx5TWF0cml4NCggb2JqLm1hdHJpeFdvcmxkICk7XHJcbiAgICAvL2ZpbmQgaW50ZXJzZWN0aW9uXHJcbiAgICB2YXIgaW50ZXIgPSB0aGlzLl9mYWtlY2FzdGVyLnJheS5pbnRlcnNlY3RzU3BoZXJlKCB0aGlzLl90ZXN0ZWRfc3BoZXJlICk7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiaW50ZXIgd2l0aCBzcGhlcmUsIGxldmVsXCIsIGxldmVsLCBpbnRlciwgc3BoZXJlLmNlbnRlciwgcmF5Y2FzdGVyLnJheSk7XHJcbiAgICAvL2FkZCB0byBpbnRlcnNlY3RlZCBsaXN0LCBpZiBzdWNjZXNzXHJcbiAgICBpZiAoaW50ZXIpIHtcclxuICAgICAgICB0aGlzLmludGVyc2VjdGVkX29iamVjdHMucHVzaChvYmopO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5TaW1wbGVfQ29sbGlkZXIucHJvdG90eXBlLmZpbmRfaW50ZXJzZWN0aW9uX3dpdGhfYm91bmRpbmdfc3BoZXJlID0gZnVuY3Rpb24ob2JqZWN0LCB0b3AgKSB7XHJcblxyXG4gICAgaWYgKCAhb2JqZWN0Lm5vbl9jb2xsaWRlYmxlICYmIChvYmplY3QudmlzaWJsZSB8fCB0aGlzLnBhcmFtcy5jaGVja19pbnZpc2libGUpKSB7XHJcbiAgICAgICAgdGhpcy5jaGVja19vYmplY3RfYm91bmRpbmdfc3BoZXJlKG9iamVjdCk7XHJcbiAgICB9XHJcbiAgICBpZiAoICF0aGlzLnBhcmFtcy5yZWN1cnNpdmUpIHJldHVybjtcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL3Rlc3QgY2hpbGRyZW5cclxuICAgIHZhciBjaGlsZHJlbiA9IG9iamVjdC5jaGlsZHJlbjtcclxuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcclxuICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICB0aGlzLmZpbmRfaW50ZXJzZWN0aW9uX3dpdGhfYm91bmRpbmdfc3BoZXJlKCBjaGlsZCApO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7U2ltcGxlX0NvbGxpZGVyfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYXNlL3NpbXBsZV9jb2xsaWRlci5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5cclxuZnVuY3Rpb24gQ29sb3JfRG9tYWluKHIsZyxiKVxyXG57XHJcbiAgICB0aGlzLmNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKHIsZyxiKTtcclxuICAgIHRoaXMudXVpZCA9IF8uZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICB0aGlzLm5hbWUgPSAnJztcclxuICAgIHRoaXMudHlwZSA9IFwiQ29sb3JfRG9tYWluXCI7XHJcbn1cclxuXHJcbl8uY29weV9vYmplY3QoQ29sb3JfRG9tYWluLnByb3RvdHlwZSwge1xyXG4gICAgdG9KU09OOiBmdW5jdGlvbiAoY2hpbGQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICBkYXRhLnV1aWQgPSB0aGlzLnV1aWQ7XHJcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgZGF0YS5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgZGF0YS5jb2xvciA9IHtyOiB0aGlzLmNvbG9yLnIsIGc6IHRoaXMuY29sb3IuZywgYjogdGhpcy5jb2xvci5ifTtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfSxcclxuICAgIHBhcnNlOiBmdW5jdGlvbiAoanNvbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnV1aWQgPSBqc29uLnV1aWQ7XHJcbiAgICAgICAgaWYgKGpzb24ubmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGpzb24uY29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9yLnNldChqc29uLmNvbG9yLnIsIGpzb24uY29sb3IuZywganNvbi5jb2xvci5iKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZW1pdDogZnVuY3Rpb24gKGNvbG9yKVxyXG4gICAge1xyXG4gICAgICAgIGNvbG9yLnIgPSB0aGlzLmNvbG9yLnI7XHJcbiAgICAgICAgY29sb3IuZyA9IHRoaXMuY29sb3IuZztcclxuICAgICAgICBjb2xvci5iID0gdGhpcy5jb2xvci5iO1xyXG4gICAgfSxcclxuICAgIGZpbGw6IGZ1bmN0aW9uIChjb2xvciwgb2Zmc2V0KSBcclxuICAgIHtcclxuICAgICAgICBjb2xvcltvZmZzZXQrMF0gPSB0aGlzLmNvbG9yLnI7XHJcbiAgICAgICAgY29sb3Jbb2Zmc2V0KzFdID0gdGhpcy5jb2xvci5nO1xyXG4gICAgICAgIGNvbG9yW29mZnNldCsyXSA9IHRoaXMuY29sb3IuYjtcclxuICAgIH1cclxufSk7XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoJ0NvbG9yX0RvbWFpbicsIENvbG9yX0RvbWFpbik7XHJcblxyXG5mdW5jdGlvbiBUYWJsZV9Db2xvcih0YWJsZSlcclxue1xyXG4gICAgaWYgKHRhYmxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmNvcHlfdGFibGUodGFibGUpOyAgICAgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdF90YWJsZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5UYWJsZV9Db2xvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbG9yX0RvbWFpbik7XHJcblxyXG5fLmNvcHlfb2JqZWN0KFRhYmxlX0NvbG9yLnByb3RvdHlwZSwge1xyXG4gICAgY29uc3RydWN0b3I6IFRhYmxlX0NvbG9yLFxyXG4gICAgY29weV90YWJsZTogZnVuY3Rpb24gKHRhYmxlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgQXJyYXkodGFibGUubGVuZ3RoKTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGFibGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBUSFJFRS5Db2xvcih0YWJsZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVtaXQ6IGZ1bmN0aW9uIChjb2xvcilcclxuICAgIHtcclxuICAgICAgICB2YXIgaW5kZXggPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIHRoaXMudGFibGUubGVuZ3RoKSAlIHRoaXMudGFibGUubGVuZ3RoO1xyXG4gICAgICAgIHZhciBzcmMgPSB0aGlzLnRhYmxlW2luZGV4XTtcclxuICAgICAgICBjb2xvci5yID0gc3JjLnI7XHJcbiAgICAgICAgY29sb3IuZyA9IHNyYy5nO1xyXG4gICAgICAgIGNvbG9yLmIgPSBzcmMuYjtcclxuICAgIH0sXHJcbiAgICBmaWxsOiBmdW5jdGlvbiAoY29sb3IsIG9mZnNldCkgXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiB0aGlzLnRhYmxlLmxlbmd0aCkgJSB0aGlzLnRhYmxlLmxlbmd0aDtcclxuICAgICAgICB2YXIgc3JjID0gdGhpcy50YWJsZVtpbmRleF07XHJcbiAgICAgICAgY29sb3Jbb2Zmc2V0XSA9IHNyYy5yO1xyXG4gICAgICAgIGNvbG9yW29mZnNldCsxXSA9IHNyYy5nO1xyXG4gICAgICAgIGNvbG9yW29mZnNldCsyXSA9IHNyYy5iO1xyXG4gICAgfSxcclxuICAgIGRlZmF1bHRfdGFibGU6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBBcnJheSg4KTtcclxuICAgICAgICB0aGlzLnRhYmxlWzBdID0gbmV3IFRIUkVFLkNvbG9yKDEsIDAsIDApO1xyXG4gICAgICAgIHRoaXMudGFibGVbMV0gPSBuZXcgVEhSRUUuQ29sb3IoMCwgMSwgMCk7XHJcbiAgICAgICAgdGhpcy50YWJsZVsyXSA9IG5ldyBUSFJFRS5Db2xvcigwLCAwLCAxKTtcclxuICAgICAgICB0aGlzLnRhYmxlWzNdID0gbmV3IFRIUkVFLkNvbG9yKDEsIDAsIDEpO1xyXG4gICAgICAgIHRoaXMudGFibGVbNF0gPSBuZXcgVEhSRUUuQ29sb3IoMSwgMSwgMCk7XHJcbiAgICAgICAgdGhpcy50YWJsZVs1XSA9IG5ldyBUSFJFRS5Db2xvcigxLCAwLjQsIDAuNCk7XHJcbiAgICAgICAgdGhpcy50YWJsZVs2XSA9IG5ldyBUSFJFRS5Db2xvcigwLjUsIDAuNywgMC45OCk7XHJcbiAgICAgICAgdGhpcy50YWJsZVs3XSA9IG5ldyBUSFJFRS5Db2xvcigwLjksIDAuNCwgMC40KTtcclxuICAgIH0sXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHIgPSB7cjogMCwgZzogMCwgYjogMH07XHJcbiAgICAgICAgdGhpcy5lbWl0KHIpO1xyXG4gICAgICAgIHJldHVybiByO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIlRhYmxlX0NvbG9yXCIsIFRhYmxlX0NvbG9yKTtcclxuXHJcbmV4cG9ydCB7Q29sb3JfRG9tYWluLCBUYWJsZV9Db2xvcn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFydGljbGVzL2NvbG9yX2RvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgUGFydGljbGVfU2hhZGVycyA9IHt9O1xyXG5cclxuKGZ1bmN0aW9uICgpIFxyXG57XHJcblxyXG4vL3BhcnRpY2xlIGF0dHJpYnV0ZXM6XHJcbi8vcG9zaXRpb25cclxuLy9jb2xvclxyXG4vL2xlZnQsIHNpemVcclxudmFyIHZlcnRleF9zaGFkZXIgPSBbXHJcbi8vJ2F0dHJpYnV0ZSB2ZWM0IHBvc2l0aW9uOycsXHJcbidhdHRyaWJ1dGUgdmVjNCBjb2xvcjsnLFxyXG4nYXR0cmlidXRlIGZsb2F0IHBhcmFtczsnLFxyXG4ndmFyeWluZyB2ZWM0IHZjb2xvcjsnLFxyXG4ndW5pZm9ybSBmbG9hdCBsaWZldGltZTsnLFxyXG4ndW5pZm9ybSBmbG9hdCBwb2ludF9zaXplOycsXHJcbid1bmlmb3JtIHZlYzIgc2NyZWVuX3NpemU7JyxcclxuJyNpZm5kZWYgRFlOQU1JQ19DT0xPUlMnLFxyXG4gICAgJ3VuaWZvcm0gdmVjMyBwYXJ0aWNsZV9jb2xvcjsnLFxyXG4nI2VuZGlmJyxcclxuJ3ZvaWQgbWFpbiAoKSB7JyxcclxuXHQnZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmlld01hdHJpeCAqIHZlYzQoIHBvc2l0aW9uLCAxLjAgKTsnLFxyXG4nI2lmZGVmIERZTkFNSUNfQ09MT1JTJyxcclxuXHQndmNvbG9yLnJnYiA9IGNvbG9yLnJnYjsnLFxyXG4nI2Vsc2UnLFxyXG4gICAgJ3Zjb2xvci5yZ2IgPSBwYXJ0aWNsZV9jb2xvci5yZ2I7JyxcclxuJyNlbmRpZicsXHJcbicjaWZkZWYgTk9fRkFERV9DT0xPUicsXHJcblx0J3Zjb2xvci5hID0gMS4wOycsXHJcbicjZWxzZScsXHJcblx0Ly9wYXJhbXMgY29udGFpbnMgbGlmZSBsZW5ndGggd2hpY2ggZGVjcmVhc2VkIGJ5IHRpbWVcclxuXHQnZmxvYXQgdG1wID0gcGFyYW1zIC8gbGlmZXRpbWU7JyxcclxuXHQndG1wID0gbWluKHRtcCwgMS4wKTsnLFx0XHJcblx0J3Zjb2xvci5hID0gdG1wOycsXHJcbicjZW5kaWYnLFxyXG5cdCdmbG9hdCB0ID0gIHNjcmVlbl9zaXplLnkqIHByb2plY3Rpb25NYXRyaXhbMV1bMV0gLyBnbF9Qb3NpdGlvbi53OycsXHJcblx0J3QgPSB0ICogcG9pbnRfc2l6ZTsnLFxyXG5cdCdpZiAocGFyYW1zID4gMC4wKSB7JyxcclxuXHRcdCdnbF9Qb2ludFNpemUgPSB0OycsXHJcblx0J30nLFxyXG5cdCdlbHNlIHsnLFxyXG5cdFx0Ly8ndmNvbG9yLmEgPSAwLjA7JyxcclxuXHRcdCdnbF9Qb2ludFNpemUgPSAwLjA7JyxcclxuICAgICAgICAnZ2xfUG9zaXRpb24ueiA9IC0xMDAwLjA7JyxcclxuXHQnfScsXHJcbid9J1xyXG5dO1xyXG5cclxudmFyIGZyYWdtZW50X3NoYWRlciA9IFtcclxuXHQndmFyeWluZyB2ZWM0IHZjb2xvcjsnLFxyXG5cdCcjaWZkZWYgUEFSVElDTEVfVEVYVFVSRScsXHJcblx0XHQndW5pZm9ybSBzYW1wbGVyMkQgc3ByaXRlOycsXHJcblx0JyNlbmRpZicsXHJcblx0J3ZvaWQgbWFpbigpIHsnLFxyXG5cdCcjaWZkZWYgUEFSVElDTEVfVEVYVFVSRScsXHJcblx0XHQndmVjNCB0ZXggPSB0ZXh0dXJlMkQoIHNwcml0ZSwgZ2xfUG9pbnRDb29yZCApOycsXHJcblx0XHQndmVjMyBmcmFnbWVudF9jb2xvciA9IHRleC5yZ2I7JyxcclxuXHRcdCdmcmFnbWVudF9jb2xvci5yZ2IgKj0gdmNvbG9yLnJnYjsnLFxyXG5cdFx0J2Zsb2F0IGFscGhhID0gdGV4LmE7JyxcdFxyXG5cdCcjZWxzZScsXHJcblx0XHQndmVjMyBmcmFnbWVudF9jb2xvciA9IHZjb2xvci5yZ2I7JyxcclxuXHRcdCdmbG9hdCBhbHBoYSA9IDEuMDsnLFxyXG5cdCcjZW5kaWYnLFxyXG5cdCcjaWZkZWYgUFJFX0FMUEhBJyxcclxuXHRcdCdmcmFnbWVudF9jb2xvci5yZ2IgKj0gYWxwaGE7JyxcclxuXHQnI2VuZGlmJyxcclxuXHQnI2lmbmRlZiBOT19GQURFX0NPTE9SJyxcclxuXHRcdCdmbG9hdCBmcmFnbWVudF9hbHBoYSA9IGFscGhhICogdmNvbG9yLmE7JyxcclxuXHQnI2Vsc2UnLFxyXG5cdFx0J2Zsb2F0IGZyYWdtZW50X2FscGhhID0gYWxwaGE7JyxcclxuXHQnI2VuZGlmJyxcclxuXHRcdCdnbF9GcmFnQ29sb3IgPSB2ZWM0KGZyYWdtZW50X2NvbG9yLnJnYiwgZnJhZ21lbnRfYWxwaGEpOycsXHJcblx0J30nLFxyXG5dO1xyXG5cclxuUGFydGljbGVfU2hhZGVycy52ZXJ0ZXggPSB2ZXJ0ZXhfc2hhZGVyLmpvaW4oICdcXG4nICk7XHJcblBhcnRpY2xlX1NoYWRlcnMuZnJhZ21lbnQgPSBmcmFnbWVudF9zaGFkZXIuam9pbiggJ1xcbicgKTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7UGFydGljbGVfU2hhZGVyc307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlX3NoYWRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9FbWl0dGVyfSBmcm9tICcuL3BhcnRpY2xlX2VtaXR0ZXIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0FmZmVjdG9yfSBmcm9tICcuL3BhcnRpY2xlX2FmZmVjdG9yLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZXNfUG9pbnRzfSBmcm9tICcuL3BhcnRpY2xlc19wb2ludHMuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX1NoYWRlcnN9IGZyb20gJy4vcGFydGljbGVfc2hhZGVycy5qcyc7XHJcbmltcG9ydCB7Q29sb3JfRG9tYWlufSBmcm9tICcuL2NvbG9yX2RvbWFpbi5qcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gUGFydGljbGVfU3lzdGVtKGRhdGEpXHJcbntcclxuICAgIHRoaXMudXVpZCA9IF8uZ2VuZXJhdGVVVUlEKCk7ICAgIFxyXG4gICAgXHJcbiAgICB0aGlzLnBhcmFtcyA9IHRoaXMuY29uZmlnX3BhcmFtcyhkYXRhKTtcclxuXHJcbiAgXHJcblx0dGhpcy5lbWl0dGVyID0gdGhpcy5wYXJhbXMuZW1pdHRlcjtcclxuXHR0aGlzLmFmZmVjdG9yID0gdGhpcy5wYXJhbXMuYWZmZWN0b3I7ICAgIFxyXG4gICAgdGhpcy5wYXJ0aWNsZV9saWZldGltZSA9IHRoaXMucGFyYW1zLnBhcnRpY2xlX2xpZmV0aW1lO1xyXG4gICAgdGhpcy50ZXh0dXJlID0gdGhpcy5wYXJhbXMudGV4dHVyZTtcclxuXHRcclxuXHR0aGlzLmR5bmFtaWNfY29sb3IgPSBmYWxzZTtcclxuXHJcblx0dmFyIGNvdW50ID0gdGhpcy5wYXJhbXMuY291bnQ7XHJcblx0XHJcblx0dGhpcy5tYXRlcmlhbCA9IHRoaXMuY3JlYXRlX3BhcnRpY2xlX21hdGVyaWFsKCk7XHJcblx0dGhpcy5ub2RlID0gbmV3IFBhcnRpY2xlc19Qb2ludHModGhpcy5jcmVhdGVfcGFydGljbGVfZ2VvbWV0cnkoY291bnQpLCB0aGlzLm1hdGVyaWFsKTtcclxuICAgIHRoaXMubm9kZS5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgdGhpcy5ub2RlLmJvdW5kaW5nU3BoZXJlLnJhZGl1cyA9IHRoaXMucGFyYW1zLmJvdW5kaW5nX3JhZGl1cztcclxuICAgIHRoaXMubm9kZS5ub25fY29sbGlkZWJsZSA9IHRoaXMucGFyYW1zLm5vbl9jb2xsaWRlYmxlO1xyXG4gICAgXHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmNvbmZpZ19wYXJhbXMgPSBmdW5jdGlvbiAoZGF0YSlcclxue1xyXG4gICAgdmFyIHBhcmFtcyA9IFxyXG4gICAge1xyXG4gICAgfTtcclxuICAgIC8vZGVmYXVsdFxyXG4gICAgcGFyYW1zLnBhcnRpY2xlX2xpZmV0aW1lID0gMy4wO1xyXG4gICAgcGFyYW1zLm5vX2ZhZGVfY29sb3IgPSBmYWxzZTtcclxuICAgIHBhcmFtcy5wcmVfYWxwaGEgPSB0cnVlO1xyXG4gICAgcGFyYW1zLmRlcHRoX3Rlc3QgPSB0cnVlO1xyXG4gICAgcGFyYW1zLmRlcHRoX3dyaXRlID0gZmFsc2U7XHJcbiAgICBwYXJhbXMuY29sb3IgID0ge1wiclwiOjEsIFwiZ1wiOjEsIFwiYlwiOjF9O1xyXG5cdHBhcmFtcy5ibGVuZGluZyA9IFwib25lX2FscGhhXCI7XHJcbiAgICBwYXJhbXMuc2l6ZSA9IDE7XHJcbiAgICBwYXJhbXMuY291bnQgPSAxMDA7XHJcbiAgICBwYXJhbXMubmFtZSA9ICcnO1xyXG4gICAgcGFyYW1zLmJvdW5kaW5nX3JhZGl1cyA9IDIuMDtcclxuICAgIHBhcmFtcy5kaXNjcmV0ZV9lbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgcGFyYW1zLmFwcGx5X3dvcmxkX21hdHJpeF9vbl9lbWl0ID0gdHJ1ZTtcclxuICAgIHBhcmFtcy5ub25fY29sbGlkZWJsZSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICBmb3IodmFyIGtleSBpbiBkYXRhKSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpKXtcclxuICAgICAgICAgICAgaWYgKGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXNba2V5XSA9IGRhdGFba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cdHBhcmFtcy5lbWl0dGVyID0gZGF0YS5lbWl0dGVyIHx8IG5ldyBQYXJ0aWNsZV9FbWl0dGVyKDEpO1xyXG5cdHBhcmFtcy5hZmZlY3RvciA9IGRhdGEuYWZmZWN0b3IgfHwgbmV3IFBhcnRpY2xlX0FmZmVjdG9yKCk7XHJcbiAgICBcclxuICAgIHJldHVybiBwYXJhbXM7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X25hbWUgPSBmdW5jdGlvbiAobmFtZSlcclxue1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMubm9kZS5uYW1lID0gbmFtZTtcclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zdWljaWRlID0gZnVuY3Rpb24gKClcclxue1xyXG5cdHRoaXMubm9kZS5wYXJlbnQucmVtb3ZlKHRoaXMubm9kZSk7XHJcbiAgICBtYWluX2V2ZW50X2h1Yi5lbWl0KFwia2lsbF9tZVwiLCB0aGlzKTtcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuY3JlYXRlX3BhcnRpY2xlX2RhdGEgPSBmdW5jdGlvbiAoY291bnQpXHJcbntcclxuICAgIHZhciBwYXJ0aWNsZV9kYXRhID0gbmV3IEFycmF5KGNvdW50KTtcclxuICAgIHZhciBwO1xyXG4gICAgLy92YXIgbWF0cml4ID0gdGhpcy5ub2RlLndvcmxkTWF0cml4KCk7XHJcbiAgICBmb3IodmFyIGkgPTA7aSA8IGNvdW50OyBpKyspIHtcclxuXHRcdHAgPSB7fTtcclxuXHRcdHAucG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygwLDAsMCk7XHJcblx0XHRwLnZlbG9jaXR5ID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwwLDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vcC5wb3NpdGlvbi5jb3B5KHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgLy9wLnBvc2l0aW9uLmFwcGx5TWF0cml4NChtYXRyaXgpO1xyXG4gICAgICAgIC8vcC52ZWxvY2l0eS5hcHBseU1hdHJpeDRfcm90YXRpb24obWF0cml4KTtcclxuICAgICAgICBcclxuXHRcdHAubGlmZXRpbWUgPSAwOyAgICAgICAgXHJcblx0XHRwYXJ0aWNsZV9kYXRhW2ldID0gcDtcclxuICAgIH1cclxuICAgIHRoaXMucGFydGljbGVfZGF0YSA9IHBhcnRpY2xlX2RhdGE7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuY3JlYXRlX3BhcnRpY2xlX2dlb21ldHJ5ID0gZnVuY3Rpb24oY291bnQpXHJcbntcclxuICAgIHRoaXMuY3JlYXRlX3BhcnRpY2xlX2RhdGEoY291bnQpO1xyXG4gICAgXHJcblx0dmFyIHZlcnRpY2VzID0gbmV3IEZsb2F0MzJBcnJheShjb3VudCAqIDMpOyAvLyBwb3NpdGlvblxyXG5cdHZhciBjb2xvcnMgPSBuZXcgRmxvYXQzMkFycmF5KGNvdW50ICogMyk7XHJcblx0dmFyIHBhcmFtcyA9IG5ldyBGbG9hdDMyQXJyYXkoY291bnQpO1xyXG5cdFxyXG4gICAgdmFyIHBhcnRpY2xlO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgcGFydGljbGUgPSB0aGlzLnBhcnRpY2xlX2RhdGFbaV07XHJcblx0XHQvL2NyZWF0ZSBwYXJ0aWNsZVxyXG5cdFx0dmVydGljZXNbaSozXSA9IHBhcnRpY2xlLnBvc2l0aW9uLng7XHJcblx0XHR2ZXJ0aWNlc1tpKjMrMV0gPSBwYXJ0aWNsZS5wb3NpdGlvbi55O1xyXG5cdFx0dmVydGljZXNbaSozKzJdID0gcGFydGljbGUucG9zaXRpb24uejtcclxuXHJcblx0XHRwYXJhbXNbaV0gPSAwLjA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW1zLmNvbG9yX2RvbWFpbikge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5jb2xvcl9kb21haW4uZmlsbChjb2xvcnMsIGkqMyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29sb3JzW2kqM10gPSB0aGlzLnBhcmFtcy5jb2xvci5yO1xyXG4gICAgICAgICAgICBjb2xvcnNbaSozKzFdID0gdGhpcy5wYXJhbXMuY29sb3IuZztcclxuICAgICAgICAgICAgY29sb3JzW2kqMysyXSA9IHRoaXMucGFyYW1zLmNvbG9yLmI7XHJcbiAgICAgICB9XHJcblx0fVxyXG5cclxuXHR0aGlzLmdlb21ldHJ5ID0ge307XHJcblx0dGhpcy5nZW9tZXRyeS52ZXJ0aWNlcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUodmVydGljZXMsIDMpLnNldER5bmFtaWModHJ1ZSk7XHJcblx0dGhpcy5nZW9tZXRyeS5jb2xvcnMgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGNvbG9ycywgMylcclxuXHRpZiAodGhpcy5keW5hbWljX2NvbG9yKSB7XHJcblx0XHR0aGlzLmdlb21ldHJ5LmNvbG9ycy5zZXREeW5hbWljKHRydWUpO1xyXG5cdH1cclxuXHR0aGlzLmdlb21ldHJ5LnBhcmFtcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocGFyYW1zLCAxKS5zZXREeW5hbWljKHRydWUpO1xyXG5cdHZhciBnZW9tID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7IFx0XHJcblx0dGhpcy5nZW9tZXRyeS5idWZmZXIgPSBnZW9tO1x0XHJcblx0Z2VvbS5hZGRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5nZW9tZXRyeS52ZXJ0aWNlcyk7XHJcblx0Z2VvbS5hZGRBdHRyaWJ1dGUoJ2NvbG9yJywgdGhpcy5nZW9tZXRyeS5jb2xvcnMpO1xyXG5cdGdlb20uYWRkQXR0cmlidXRlKCdwYXJhbXMnLCB0aGlzLmdlb21ldHJ5LnBhcmFtcyk7XHRcclxuXHJcbiAgICByZXR1cm4gZ2VvbTtcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuZGlzY3JldGVfZW1pdCA9IGZ1bmN0aW9uIChjb3VudClcclxue1xyXG4gICAgdGhpcy5lbWl0X3BhcnRpY2xlcygwLCBjb3VudCk7XHJcblx0dGhpcy5nZW9tZXRyeS52ZXJ0aWNlcy5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0dGhpcy5nZW9tZXRyeS5wYXJhbXMubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cdHRoaXMuZ2VvbWV0cnkuY29sb3JzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuZW1pdF9wYXJ0aWNsZXMgPSBmdW5jdGlvbiAoZHQsIG5lZWRfZW1pdClcclxue1xyXG5cdC8vZW1pdCBwYXJ0aWNsZXNcclxuXHR2YXIgcDtcclxuXHR2YXIgdmVydHMgPSB0aGlzLmdlb21ldHJ5LnZlcnRpY2VzLmFycmF5O1xyXG5cdHZhciBwYXJhbXMgPSB0aGlzLmdlb21ldHJ5LnBhcmFtcy5hcnJheTtcclxuXHRcclxuICAgIHZhciBvbGRfbmVlZF9lbWl0ID0gbmVlZF9lbWl0O1xyXG4gICAgdGhpcy5ub2RlLnVwZGF0ZU1hdHJpeFdvcmxkKHRydWUpO1xyXG4gICAgdmFyIG1hdHJpeCA9IHRoaXMubm9kZS5tYXRyaXhXb3JsZDtcclxuXHRmb3IodmFyIGkgPTA7IGkgPCB0aGlzLnBhcnRpY2xlX2RhdGEubGVuZ3RoICYmIG5lZWRfZW1pdCA+IDA7IGkrKykge1xyXG5cdFx0aWYgKCEocGFyYW1zW2ldID4gMCkpIHtcclxuICAgICAgICBcclxuXHRcdFx0cCA9IHRoaXMucGFydGljbGVfZGF0YVtpXTtcclxuXHRcdFx0dGhpcy5lbWl0dGVyLmVtaXQocCwgbnVsbCwgbWF0cml4KTtcclxuXHRcdFx0cC5saWZldGltZSA9IHRoaXMucGFydGljbGVfbGlmZXRpbWU7XHJcbiAgICAgICAgICAgIFxyXG5cdFx0XHR2ZXJ0c1tpKjNdID0gcC5wb3NpdGlvbi54O1xyXG5cdFx0XHR2ZXJ0c1tpKjMrMV0gPSBwLnBvc2l0aW9uLnk7XHJcblx0XHRcdHZlcnRzW2kqMysyXSA9IHAucG9zaXRpb24uejtcclxuXHRcdFx0cGFyYW1zW2ldID0gcC5saWZldGltZTtcclxuXHRcdFx0bmVlZF9lbWl0LS07XHJcblx0XHRcdC8vY29sb3JzW2kqM10gPSB0aGlzLnBhcmFtcy5jb2xvci5yXHJcblx0XHRcdC8vY29sb3JzW2kqMysxXSA9IHRoaXMucGFyYW1zLmNvbG9yLmc7XHJcblx0XHRcdC8vY29sb3JzW2kqMysyXSA9IHRoaXMucGFyYW1zLmNvbG9yLmI7XHJcblx0XHR9XHJcblx0fVxyXG4gICAgLy9jb25zb2xlLmxvZyhcImNyZWF0ZWQgbmV3IHBhcnRpY2xlcyBcIiwgb2xkX25lZWRfZW1pdCAtIG5lZWRfZW1pdCk7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUudXBkYXRlX3BhcnRpY2xlX2dlb21ldHJ5ID0gZnVuY3Rpb24gKGR0KVxyXG57XHJcblx0dmFyIHZlcnRzID0gdGhpcy5nZW9tZXRyeS52ZXJ0aWNlcy5hcnJheTtcclxuXHR2YXIgcGFyYW1zID0gdGhpcy5nZW9tZXRyeS5wYXJhbXMuYXJyYXk7XHJcblx0dmFyIHA7XHJcblx0dmFyIHZlcnQgPSBuZXcgVEhSRUUuVmVjdG9yMygwLDAsMCk7XHJcblx0dmFyIGR1bW15X2NvbG9yID0ge1wiclwiOjEsIFwiYlwiOjEsIFwiZ1wiOjF9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlX2RhdGEubGVuZ3RoOyBpKyspIHtcclxuXHRcclxuXHRcdGlmIChwYXJhbXNbaV0gPiAwKSB7XHJcblx0XHRcdHAgPSB0aGlzLnBhcnRpY2xlX2RhdGFbaV07XHJcblx0XHRcdFxyXG5cdFx0XHQvL2ludGVncmF0ZVxyXG5cdFx0XHRwLnBvc2l0aW9uLnggKz0gcC52ZWxvY2l0eS54ICogZHQ7XHJcblx0XHRcdHAucG9zaXRpb24ueSArPSBwLnZlbG9jaXR5LnkgKiBkdDtcclxuXHRcdFx0cC5wb3NpdGlvbi56ICs9IHAudmVsb2NpdHkueiAqIGR0O1xyXG5cdFx0XHRwLmxpZmV0aW1lIC09IGR0O1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKHAubGlmZXRpbWUgPD0gMCB8fCAhdGhpcy5hZmZlY3Rvci5hZmZlY3QoZHQsIHAsIHZlcnQsIGR1bW15X2NvbG9yKSkge1xyXG5cdFx0XHRcdHAubGlmZXRpbWUgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHRcdHBhcmFtc1tpXSA9IHAubGlmZXRpbWU7XHRcdFx0XHJcblx0XHRcdHZlcnRzW2kqM10gPSBwLnBvc2l0aW9uLng7XHJcblx0XHRcdHZlcnRzW2kqMysxXSA9IHAucG9zaXRpb24ueTtcclxuXHRcdFx0dmVydHNbaSozKzJdID0gcC5wb3NpdGlvbi56O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgICBpZiAoIXRoaXMucGFyYW1zLmRpc2NyZXRlX2VtaXNzaW9uKSB7XHJcbiAgICAgICAgdmFyIG5lZWRfZW1pdCA9IHRoaXMuZW1pdHRlci5jYWxjX2VtaXR0ZWRfcGFydGljbGVzKGR0KTtcclxuICAgICAgICB0aGlzLmVtaXRfcGFydGljbGVzKGR0LCBuZWVkX2VtaXQpO1xyXG4gICAgfVxyXG5cdFxyXG5cdHRoaXMuZ2VvbWV0cnkudmVydGljZXMubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cdHRoaXMuZ2VvbWV0cnkucGFyYW1zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHR0aGlzLmdlb21ldHJ5LmNvbG9ycy5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KVxyXG57XHJcblx0dGhpcy51cGRhdGVfcGFydGljbGVfZ2VvbWV0cnkoZHQpO1xyXG59XHJcblxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5nZW5lcmF0ZV9tYXRlcmlhbF9uYW1lID0gZnVuY3Rpb24gKClcclxue1xyXG5cdHZhciBteV9uYW1lID0gXCJNWV9QQVJUSUNMRV9NQVRFUklBTFwiO1xyXG5cdGlmICghIXRoaXMudGV4dHVyZSkge1xyXG5cdFx0bXlfbmFtZSArPSAgXCJfV0lUSF9URVhUVVJFXCI7XHJcblx0fVxyXG5cdGlmICh0aGlzLnBhcmFtcy5ub19mYWRlX2NvbG9yKSB7XHJcblx0XHRteV9uYW1lICs9IFwiX05PX0ZBREVfQ09MT1JcIjtcclxuXHR9XHJcblx0cmV0dXJuIG15X25hbWU7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuYmxlbmRpbmdfbW9kZSA9IFxyXG57XHJcblx0XCJhZGRpdGl2ZVwiOiB7XHJcblx0XHRcImJsZW5kU3JjXCI6IFRIUkVFLk9uZUZhY3RvcixcclxuXHRcdFwiYmxlbmREc3RcIjogVEhSRUUuT25lRmFjdG9yXHJcblx0fSxcclxuXHRcImFscGhhXCI6IHtcclxuXHRcdFwiYmxlbmRTcmNcIjogVEhSRUUuU3JjQWxwaGFGYWN0b3IsXHJcblx0XHRcImJsZW5kRHN0XCI6IFRIUkVFLk9uZU1pbnVzU3JjQWxwaGFGYWN0b3JcclxuXHR9LFxyXG5cdFwib25lX2FscGhhXCI6IHtcclxuXHRcdFwiYmxlbmRTcmNcIjogVEhSRUUuT25lRmFjdG9yLFxyXG5cdFx0XCJibGVuZERzdFwiOiBUSFJFRS5PbmVNaW51c1NyY0FscGhhRmFjdG9yXHJcblx0fSxcclxuXHRcImFscGhhX29uZVwiOiB7XHJcblx0XHRcImJsZW5kU3JjXCI6IFRIUkVFLlNyY0FscGhhRmFjdG9yLFxyXG5cdFx0XCJibGVuZERzdFwiOiBUSFJFRS5PbmVGYWN0b3JcclxuXHR9XHJcbn07XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmNvbnZlcnRfYmxlbmRpbmdfbW9kZSA9IGZ1bmN0aW9uIChibGVuZGluZylcclxue1xyXG4gICAgdmFyIHRocmVlX2JsZW5kaW5nO1xyXG5cdHZhciBmYWN0b3JzID0gdGhpcy5ibGVuZGluZ19tb2RlW1wib25lX2FscGhhXCJdO1xyXG4gICAgaWYgKGJsZW5kaW5nID09PSAnbm8nKSB7XHJcbiAgICAgICAgdGhyZWVfYmxlbmRpbmcgPSBUSFJFRS5Ob0JsZW5kaW5nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJlZV9ibGVuZGluZyA9IFRIUkVFLkN1c3RvbUJsZW5kaW5nOyAgICBcclxuICAgICAgICBpZiAodGhpcy5ibGVuZGluZ19tb2RlW2JsZW5kaW5nXSkge1xyXG4gICAgICAgICAgICBmYWN0b3JzID0gdGhpcy5ibGVuZGluZ19tb2RlW2JsZW5kaW5nXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1wiYmxlbmRpbmdcIjogdGhyZWVfYmxlbmRpbmcsIFwiZmFjdG9yc1wiOmZhY3RvcnN9O1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNldF90ZXh0dXJlID0gZnVuY3Rpb24gKHRleHR1cmUpXHJcbntcclxuXHRpZiAodHlwZW9mIHRleHR1cmUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW1zLnRleHR1cmUgPT09IHRleHR1cmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmFtcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuXHRcdHRoaXMudGV4dHVyZSA9IE15X0xpYi5UZXh0dXJlX01hbmFnZXIuZ2V0KHRleHR1cmUpO1xyXG5cdH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk9oIFNoaXQhIHRleHR1cmUgaW4gc2V0X3RleHR1cmUgaXMgbm90IHN0cmluZyEgaXQncyBvYmplY3Qgb3IgdW5kZWZpbmVkIVwiLCB0ZXh0dXJlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5zcHJpdGUpIHtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnNwcml0ZS52YWx1ZSA9IHRoaXMudGV4dHVyZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy90aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnNwcml0ZSA9IHt2YWx1ZTogdGV4dHVyZX07XHJcbiAgICAgICAgdGhpcy5yZWNyZWF0ZV9tYXRlcmlhbCgpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJPaCBTaGl0ISBPdXIgc2hhZGVyIGhhcyBub3QgdGV4dHVyZSEgTmVlZCBjcmVhdGUgc2hhZGVyIHdpdGggdGV4dHVyZSFcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZV91bmlmb3JtcyA9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHZhciB1bmlmb3JtcyA9IFxyXG4gICAge1xyXG4gICAgICAgIFwibGlmZXRpbWVcIjoge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wYXJ0aWNsZV9saWZldGltZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwb2ludF9zaXplXCI6IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucGFyYW1zLnNpemVcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic2NyZWVuX3NpemVcIjoge1xyXG4gICAgICAgICAgICB2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoTXlfTGliLlZpZXdwb3J0LndpZHRoLCBNeV9MaWIuVmlld3BvcnQuaGVpZ2h0KVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBpZiAoISF0aGlzLnRleHR1cmUpIHtcclxuICAgICAgICB1bmlmb3Jtc1tcInNwcml0ZVwiXSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudGV4dHVyZVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBpZiAoIXRoaXMuZHluYW1pY19jb2xvcikge1xyXG4gICAgICAgIHVuaWZvcm1zW1wicGFydGljbGVfY29sb3JcIl0gPSB7dmFsdWU6IHRoaXMucGFyYW1zLmNvbG9yfTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmlmb3JtcztcclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5jYWxjX2RlZmluZXMgPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICB2YXIgZGVmaW5lcyA9IHt9O1xyXG4gICAgaWYgKHRoaXMucGFyYW1zLnByZV9hbHBoYSkge1xyXG4gICAgICAgIGRlZmluZXNbXCJQUkVfQUxQSEFcIl0gPSB0cnVlO1xyXG4gICAgfVxyXG5cdGlmICghIXRoaXMudGV4dHVyZSkge1xyXG4gICAgICAgIGRlZmluZXNbXCJQQVJUSUNMRV9URVhUVVJFXCJdID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBhcmFtcy5ub19mYWRlX2NvbG9yKSB7XHJcbiAgICAgICAgZGVmaW5lc1tcIk5PX0ZBREVfQ09MT1JcIl0gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucGFyYW1zLmNvbG9yX2RvbWFpbikge1xyXG4gICAgICAgIGRlZmluZXNbXCJEWU5BTUlDX0NPTE9SU1wiXSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmaW5lcztcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2VsZWN0X3RleHR1cmUgPSBmdW5jdGlvbiAodGV4dHVyZSlcclxue1xyXG5cdGlmICh0eXBlb2YgdGhpcy50ZXh0dXJlID09PSAnc3RyaW5nJykge1xyXG5cdFx0dGhpcy50ZXh0dXJlID0gTXlfTGliLlRleHR1cmVfTWFuYWdlci5nZXQodGhpcy50ZXh0dXJlKTtcclxuICAgICAgICBpZiAoIXRoaXMudGV4dHVyZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiT2gsIG5vdCBmb3VuZCB0ZXh0dXJlIDxcIiArIHRoaXMucGFyYW1zLnRleHR1cmUgKyBcIj4gaW4gY3JlYXRlIHBhcnRpY2xlIG1hdGVyaWFsISBJbnN0ZWFkIGdldCBcIit0aGlzLnRleHR1cmUpO1xyXG4gICAgICAgIH1cclxuXHR9XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuY3JlYXRlX3BhcnRpY2xlX21hdGVyaWFsID0gZnVuY3Rpb24oKVxyXG57XHJcblx0XHJcbiAgICB0aGlzLnNlbGVjdF90ZXh0dXJlKHRoaXMudGV4dHVyZSk7XHJcbiAgICBcclxuICAgIHZhciBibGVuZF9vYmogPSB0aGlzLmNvbnZlcnRfYmxlbmRpbmdfbW9kZSh0aGlzLnBhcmFtcy5ibGVuZGluZyk7XHJcbiAgICBcclxuICAgIFxyXG4gICAgdmFyIHVuaWZvcm1zID0gdGhpcy5jcmVhdGVfdW5pZm9ybXMoKTtcclxuICAgIHZhciBkZWZpbmVzID0gdGhpcy5jYWxjX2RlZmluZXMoKTtcclxuICAgIFxyXG5cdHZhciBtYXQgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoe1xyXG5cdFx0dHJhbnNwYXJlbnQ6IHRydWUsXHJcblx0XHRkZXB0aFdyaXRlOiB0aGlzLnBhcmFtcy5kZXB0aF93cml0ZSxcclxuXHRcdGRlcHRoVGVzdDogdGhpcy5wYXJhbXMuZGVwdGhfdGVzdCxcclxuICAgICAgICBibGVuZGluZzogYmxlbmRfb2JqLmJsZW5kaW5nLFxyXG4gICAgICAgIGJsZW5kU3JjOiBibGVuZF9vYmouZmFjdG9ycy5ibGVuZFNyYyxcclxuICAgICAgICBibGVuZERzdDogYmxlbmRfb2JqLmZhY3RvcnMuYmxlbmREc3QsXHJcblx0XHRkZWZpbmVzOiBkZWZpbmVzLFxyXG5cdFx0dW5pZm9ybXM6IHVuaWZvcm1zLFxyXG5cdFx0dmVydGV4U2hhZGVyOiBQYXJ0aWNsZV9TaGFkZXJzLnZlcnRleCxcclxuXHRcdGZyYWdtZW50U2hhZGVyOiBQYXJ0aWNsZV9TaGFkZXJzLmZyYWdtZW50XHJcblx0fSk7XHJcblx0cmV0dXJuIG1hdDtcclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5yZWNyZWF0ZV9tYXRlcmlhbCA9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHRoaXMubm9kZS5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWwgPSB0aGlzLmNyZWF0ZV9wYXJ0aWNsZV9tYXRlcmlhbCgpO1xyXG59XHJcblxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfcHJlX2FscGhhID0gZnVuY3Rpb24gKHByZV9hbHBoYSlcclxue1xyXG4gICAgaWYgKHRoaXMucGFyYW1zLnByZV9hbHBoYSAhPT0gISFwcmVfYWxwaGEpIHtcclxuICAgICAgICB0aGlzLnBhcmFtcy5wcmVfYWxwaGEgPSBwcmVfYWxwaGE7XHJcbiAgICAgICAgdGhpcy5yZWNyZWF0ZV9tYXRlcmlhbCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNldF9wb2ludF9zaXplID0gZnVuY3Rpb24gKHNpemUpXHJcbntcclxuICAgIGlmICh0aGlzLnBhcmFtcy5zaXplICE9IHNpemUpIHtcclxuICAgICAgICB0aGlzLnBhcmFtcy5zaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLm5vZGUubWF0ZXJpYWwudW5pZm9ybXNbXCJwb2ludF9zaXplXCJdLnZhbHVlID0gc2l6ZTtcclxuICAgIH1cclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfYmxlbmRpbmcgPSBmdW5jdGlvbiAoYmxlbmRpbmcpXHJcbntcclxuICAgIHRoaXMucGFyYW1zLmJsZW5kaW5nID0gYmxlbmRpbmc7XHJcbiAgICB2YXIgYiA9IHRoaXMuY29udmVydF9ibGVuZGluZ19tb2RlKGJsZW5kaW5nKTtcclxuICAgIHRoaXMubWF0ZXJpYWwuYmxlbmRpbmcgPSBiLmJsZW5kaW5nO1xyXG4gICAgdGhpcy5tYXRlcmlhbC5ibGVuZFNyYyA9IGIuZmFjdG9ycy5ibGVuZFNyYztcclxuICAgIHRoaXMubWF0ZXJpYWwuYmxlbmREc3QgPSBiLmZhY3RvcnMuYmxlbmREc3Q7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKClcclxue1xyXG5cdHZhciBkYXRhID0ge307XHJcbiAgICBkYXRhLnV1aWQgPSB0aGlzLnV1aWQ7XHJcbiAgICBkYXRhLm5vZGUgPSB0aGlzLm5vZGUudXVpZDtcclxuICAgIGlmICh0aGlzLm5hbWUgfHwgdGhpcy5ub2RlLm5hbWUpIHtcclxuICAgICAgICBkYXRhLm5hbWUgPSB0aGlzLm5hbWUgfHwgdGhpcy5ub2RlLm5hbWU7XHJcbiAgICB9XHJcblx0ZGF0YS5wYXJhbXMgPSB7fTtcclxuXHRpZiAodGhpcy5wYXJhbXMpIHtcclxuXHRcdF8uY29weV9vYmplY3QoZGF0YS5wYXJhbXMsIHRoaXMucGFyYW1zKTtcclxuXHR9XHJcblx0ZGF0YS5wYXJhbXMuZW1pdHRlciA9IHRoaXMuZW1pdHRlci50b0pTT04oKTtcclxuXHRkYXRhLnBhcmFtcy5hZmZlY3RvciA9IHRoaXMuYWZmZWN0b3IudG9KU09OKCk7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNldF9lbWl0dGVyID0gZnVuY3Rpb24gKGVtaXR0ZXIpXHJcbntcclxuICAgIHRoaXMuZW1pdHRlciA9IHRoaXMucGFyYW1zLmVtaXR0ZXIgPSBlbWl0dGVyO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNldF9wYXJ0aWNsZV9saWZlX2xlbmd0aCA9IGZ1bmN0aW9uICh2YWwpXHJcbntcclxuXHRpZiAodmFsICE9PSB0aGlzLnBhcmFtcy5wYXJ0aWNsZV9saWZldGltZSkge1xyXG5cdFx0dGhpcy5wYXJhbXMucGFydGljbGVfbGlmZXRpbWUgPSB0aGlzLnBhcnRpY2xlX2xpZmV0aW1lID0gdmFsO1xyXG5cdFx0dGhpcy5tYXRlcmlhbC51bmlmb3Jtc1snbGlmZXRpbWUnXS52YWx1ZSA9IHZhbDtcclxuXHR9XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X2VtaXNzaW9uX3Blcl9zZWNvbmQgPSBmdW5jdGlvbiAodmFsKVxyXG57XHJcblx0dGhpcy5lbWl0dGVyLmVtaXRfcGVyX3NlY29uZCA9IHZhbDtcclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfcGFydGljbGVfY291bnQgPSBmdW5jdGlvbiAoY291bnQpXHJcbntcclxuXHRpZiAoY291bnQgIT09IHRoaXMucGFydGljbGVfZGF0YS5sZW5ndGgpIHtcclxuXHRcdHRoaXMucGFyYW1zLmNvdW50ID0gY291bnQ7XHJcblx0XHR0aGlzLm5vZGUuZ2VvbWV0cnkgPSB0aGlzLmNyZWF0ZV9wYXJ0aWNsZV9nZW9tZXRyeShjb3VudCk7XHJcblx0fVxyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNldF9jb2xvciA9IGZ1bmN0aW9uIChjb2xvcilcclxue1xyXG4gICAgdGhpcy5wYXJhbXMuY29sb3IuciA9IGNvbG9yLnI7XHJcbiAgICB0aGlzLnBhcmFtcy5jb2xvci5nID0gY29sb3IuZztcclxuICAgIHRoaXMucGFyYW1zLmNvbG9yLmIgPSBjb2xvci5iO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNldF9ib3VuZGluZ19zcGhlcmVfcmFkaXVzID0gZnVuY3Rpb24gKHJhZGl1cylcclxue1xyXG4gICAgdGhpcy5ub2RlLmJvdW5kaW5nU3BoZXJlLnJhZGl1cyA9IHJhZGl1cztcclxufVxyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9TeXN0ZW19O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuLi9iYXNlL215X2xpYi5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVfRW1pdHRlcn0gZnJvbSAnLi9wYXJ0aWNsZV9lbWl0dGVyLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9BZmZlY3Rvcn0gZnJvbSAnLi9wYXJ0aWNsZV9hZmZlY3Rvci5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVzX1BvaW50c30gZnJvbSAnLi9wYXJ0aWNsZXNfcG9pbnRzLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9TeXN0ZW19IGZyb20gJy4vcGFydGljbGVzLmpzJztcclxuXHJcblxyXG4gZnVuY3Rpb24gUGFydGljbGVfTWFuYWdlciAoKVxyXG57XHJcblx0dGhpcy5wYXJ0aWNsZXMgPSB7fTtcclxuICAgIHRoaXMucGFydGljbGVzX2FycmF5ID0gW107XHJcbn1cclxuXHJcbl8uY29weV9vYmplY3QoUGFydGljbGVfTWFuYWdlci5wcm90b3R5cGUsIFxyXG4gICAge1xyXG4gICAgY29uc3RydWN0b3I6IFBhcnRpY2xlX01hbmFnZXIsXHJcbiAgICBhZGQ6ICBmdW5jdGlvbiAocHMsbmFtZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMucGFydGljbGVzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW25hbWVdID0gcHM7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzX2FycmF5LnB1c2gocHMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmVfcGFydGljbGVzOiAgZnVuY3Rpb24gKG5hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHBzID0gdGhpcy5wYXJ0aWNsZXNbbmFtZV07XHJcbiAgICAgICAgdmFyIGkgPSB0aGlzLnBhcnRpY2xlc19hcnJheS5pbmRleE9mKHBzKTtcclxuICAgICAgICBpZiAoaSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzX2FycmF5LnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBzKSB7XHJcbiAgICAgICAgICAgIHBzLnN1aWNpZGUoKTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMucGFydGljbGVzW25hbWVdO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRfcGFydGljbGVfbmFtZXM6ICBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMucGFydGljbGVzKSB7XHJcbiAgICAgICAgICAgIG5hbWVzLnB1c2goa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hbWVzO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgOiBmdW5jdGlvbiAoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFydGljbGVzX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzX2FycmF5W2ldLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgY3JlYXRlX2J5X3BhcmFtczogZnVuY3Rpb24gKHBhcmFtcylcclxuICAgIHtcclxuICAgICAgICB2YXIgcHMgPSBuZXcgUGFydGljbGVfU3lzdGVtKHBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5hZGQocHMpO1xyXG4gICAgICAgIHJldHVybiBwcztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHRvSlNPTiA6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFyciA9IFtdXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGRhdGE7XHJcbiAgICAgICAgdmFyIHA7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5wYXJ0aWNsZXMpe1xyXG4gICAgICAgICAgICBwID0gdGhpcy5wYXJ0aWNsZXNba2V5XTtcclxuICAgICAgICAgICAgaWYgKHAudXVpZCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHAudG9KU09OKCk7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH0sXHJcblxyXG4gICAgZW1pdHRlcl9mYWJyaWM6ICBmdW5jdGlvbiAocGFyYW1zKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChwYXJhbXMuZW1pdHRlcikge1xyXG4gICAgICAgICAgICB2YXIgZW1pdHRlciA9IE15X0xpYi5HZXRfQ2xhc3MocGFyYW1zLmVtaXR0ZXIubmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChlbWl0dGVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyID0gbmV3IGVtaXR0ZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIgPSBuZXcgUGFydGljbGVfRW1pdHRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVtaXR0ZXIucGFyc2UocGFyYW1zLmVtaXR0ZXIucGFyYW1zKTtcclxuICAgICAgICAgICAgcmV0dXJuIGVtaXR0ZXI7ICAgICAgICBcclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGFmZmVjdG9yX2ZhYnJpYzogIGZ1bmN0aW9uIChwYXJhbXMpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hZmZlY3Rvcikge1xyXG4gICAgICAgICAgICB2YXIgYWZmZWN0b3IgPSBNeV9MaWIuR2V0X0NsYXNzKHBhcmFtcy5hZmZlY3Rvci5uYW1lKTtcclxuICAgICAgICAgICAgaWYgKGFmZmVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBhZmZlY3RvciA9IG5ldyBhZmZlY3RvcigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWZmZWN0b3IgPSBuZXcgUGFydGljbGVfQWZmZWN0b3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZmZlY3Rvci5wYXJzZShwYXJhbXMuYWZmZWN0b3IucGFyYW1zKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFmZmVjdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSxcclxuXHJcbiAgICBmcm9tSlNPTjogZnVuY3Rpb24gKGpzb24sIGNhbGxiYWNrLCByb290LCBuYW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcnRpY2xlc1tuYW1lXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkcgUGFydGljbGUgTWFuYWdlciEgUGFydGljbGUgU3lzdGVtIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0cnlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShqc29uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHBhcnNpbmcganNvbiBvbiBcIiwgbmFtZSwganNvbik7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGRhdGEsIHJvb3QsIG5hbWUpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChkYXRhLCByb290LCBuYW1lKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBlbWl0dGVyID0gdGhpcy5lbWl0dGVyX2ZhYnJpYyhkYXRhLnBhcmFtcyk7XHJcbiAgICAgICAgdmFyIGFmZmVjdG9yID0gdGhpcy5hZmZlY3Rvcl9mYWJyaWMoZGF0YS5wYXJhbXMpO1xyXG4gICAgICAgIGRhdGEucGFyYW1zLmVtaXR0ZXIgPSBlbWl0dGVyO1xyXG4gICAgICAgIGRhdGEucGFyYW1zLmFmZmVjdG9yID0gYWZmZWN0b3I7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHBzID0gbmV3IFBhcnRpY2xlX1N5c3RlbShkYXRhLnBhcmFtcyk7XHJcbiAgICAgICAgcHMuc2V0X25hbWUoZGF0YS5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgIC8vYWRkIHRvIHNjZW5lIGdyYXBoXHJcbiAgICAgICAgaWYgKGRhdGEucGFyYW1zLnBhcmVudCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gcm9vdC5nZXRPYmplY3RCeU5hbWUoZGF0YS5wYXJhbXMucGFyZW50KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhLnBhcmFtcy5wYXJlbnQsIFwicGFyZW50IHBhcnRpY2xlc1wiLCBuYW1lLCByb290KTtcclxuICAgICAgICAgICAgcGFyZW50LmFkZChwcy5ub2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgIHJvb3QuYWRkKHBzLm5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy91Z2x5IGZ1Y2tpbmcgaGFja1xyXG4gICAgICAgIC8vY29weSBub2RlIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLmFkZChwcywgbmFtZSk7ICAgIFxyXG4gICAgICAgIHJldHVybiBwcztcclxuICAgIH0sXHJcblxyXG4gICAgbG9hZF9wYXJ0aWNsZXM6ICBmdW5jdGlvbiAoanNvbiwgcm9vdClcclxuICAgIHtcclxuICAgICAgICB2YXIgcGFydGljbGVzID0ganNvbi5wYXJ0aWNsZXM7XHJcbiAgICAgICAgZm9yKHZhciBpID0wOyBpIDwgcGFydGljbGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHAgPSBwYXJ0aWNsZXNbaV07XHJcbiAgICAgICAgICAgIHZhciBwcyA9IHRoaXMucGFyc2UocCwgcm9vdCwgcC5uYW1lKTtcclxuICAgICAgICAgICAgcHMubm9kZS51dWlkID0gcC5ub2RlO1xyXG4gICAgICAgICAgICBwcy5ub2RlLm5hbWUgPSBwLm5hbWU7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSByb290LmdldE9iamVjdEJ5UHJvcGVydHkoXCJ1dWlkXCIsIHAubm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChvYmopIHtcclxuICAgICAgICAgICAgICAgIHBzLm5vZGUucmVwbGFjZV9vYmplY3Rfd2l0aF90aGlzKG9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZV9uYW1lOiAgZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICB2YXIgbnVtYmVyID0gdGhpcy5wYXJ0aWNsZXNfYXJyYXkubGVuZ3RoICsgMTtcclxuICAgICAgICB2YXIgYmVnaW5fbmFtZSA9ICdQYXJ0aWNsZV9TeXN0ZW1fJztcclxuICAgICAgICB2YXIgdGVzdGluZyA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUgKHRlc3RpbmcpIHtcclxuICAgICAgICAgICAgbmFtZSA9IGJlZ2luX25hbWUgKyBudW1iZXI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnRpY2xlc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBudW1iZXIgKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlX25ldyA6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmNyZWF0ZV9uYW1lKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgIHZhciBwcyA9IG5ldyBQYXJ0aWNsZV9TeXN0ZW0ocGFyYW1zKTtcclxuICAgICAgICBwcy5zZXRfbmFtZShuYW1lKTtcclxuICAgICAgICB0aGlzLmFkZChwcywgbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHBzO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5pZiAoTXlfTGliLnBhcnRpY2xlX21hbmFnZXIgPT09IHVuZGVmaW5lZCkgXHJcbntcclxuICAgIE15X0xpYi5wYXJ0aWNsZV9tYW5hZ2VyID0gbmV3IFBhcnRpY2xlX01hbmFnZXIoKTtcclxufVxyXG5cclxuTXlfTGliLlBhcnRpY2xlc19Db25maWcgPSB7XHJcblwiYm94X3NpemVcIjogMTBcclxufTtcclxuXHJcblxyXG5leHBvcnQge1BhcnRpY2xlX01hbmFnZXJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZXNfbWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFBvaW50X0dlbmVyYXRvcnMgPSB7fTtcclxuXHJcblxyXG5Qb2ludF9HZW5lcmF0b3JzLlJhbmRvbV9EaXJlY3Rpb24gPSBmdW5jdGlvbiAoKVxyXG57XHJcbn1cclxuXHJcblBvaW50X0dlbmVyYXRvcnMuUmFuZG9tX0RpcmVjdGlvbi5wcm90b3R5cGUuZ2V0X2RpcmVjdGlvbiA9IGZ1bmN0aW9uICh2ZWN0b3IpXHJcbntcclxuXHR2ZWN0b3IueCA9IE1hdGgucmFuZG9tKCk7IFxyXG5cdHZlY3Rvci55ID0gTWF0aC5yYW5kb20oKTsgXHJcblx0dmVjdG9yLnogPSBNYXRoLnJhbmRvbSgpO1xyXG59XHJcblxyXG5Qb2ludF9HZW5lcmF0b3JzLlNwaGVyZSA9IGZ1bmN0aW9uIChyYWRpdXMpXHJcbntcclxuXHR0aGlzLnJhZGl1cyA9IHJhZGl1cztcclxufVxyXG5cclxuUG9pbnRfR2VuZXJhdG9ycy5TcGhlcmUucHJvdG90eXBlLmdldF9pbm5lcl9wb2ludCA9IGZ1bmN0aW9uICh2ZWN0b3IpXHJcbntcclxuXHR2YXIgYWxwaGEgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XHJcblx0dmFyIGJldGEgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSTtcclxuXHR2ZWN0b3IueCA9IE1hdGguY29zKGFscGhhKSAqIE1hdGguc2luKGJldGEpO1xyXG5cdHZlY3Rvci55ID0gTWF0aC5jb3MoYmV0YSk7XHJcblx0dmVjdG9yLnogPSBNYXRoLnNpbihhbHBoYSkgKiBNYXRoLnNpbihiZXRhKTtcclxufVxyXG5cclxuUG9pbnRfR2VuZXJhdG9ycy5TcGhlcmUucHJvdG90eXBlLmdldF9ub3JtYWwgPSBmdW5jdGlvbiAodmVjdG9yKVxyXG57XHJcblx0dmVjdG9yLnggPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XHJcblx0dmVjdG9yLnkgPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XHJcblx0dmVjdG9yLnogPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XHJcblx0dmVjdG9yLm5vcm1hbGl6ZSgpO1xyXG59XHJcblxyXG5Qb2ludF9HZW5lcmF0b3JzLlNwaGVyZS5wcm90b3R5cGUuZ2V0X3BvaW50ID0gZnVuY3Rpb24gKHZlY3RvcikgXHJcbntcclxuXHR0aGlzLmdldF9ub3JtYWwodmVjdG9yKTtcclxuXHR2ZWN0b3IubXVsdGlwbHlTY2FsYXIodGhpcy5yYWRpdXMpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHtQb2ludF9HZW5lcmF0b3JzfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wYXJ0aWNsZXMvcG9pbnRfZ2VuZXJhdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcclxubWFpbiBjbGFzc1xyXG50aGlzIGhhcyBhYnN0cmFjdCB2aXJ0dWFsIG1ldGhvZHNcclxuc3RhcnQgLSB3aGljaCBjcmVhdGUgcmVuZGVyZXIgYW5kIGNvbmR1Y3Qgc3RhcnQgaW5pdGlhbGl6YXRpb25zXHJcbnVwZGF0ZSAtIHVwZGF0ZWQgc2NlbmUgb2JqZWN0cywgYW5pbWF0aW9ucywgcGhpc2ljc1xyXG5yZW5kZXIgLSBjb250cm9sIHNjZW5lIHJlbmRlcmluZ1xyXG50aGlzIG1ldGhvZHMgbXVzdCByZXdyaXRlIG9uIGRlcml2ZWQgY2xhc3Nlc1xyXG5uZWVkIHNldCBcclxuUFJPUEVSVElFU1xyXG5tYWluX2NhbWVyYSAtIGNhbWVyYSB3aGljaCBwb2ludCBvZiB2aWV3IHJlbmRlciB3aG9sZSBzY2VuZSBhbmQgdXNlciBpbnRlcmFjdHNcclxuZG9tX3NjcmVlbiAtIGRvbSBlbGVtZW50IHdoaWNoIGNvbnRhaW4gY2FudmFzIGFuZCBkaXNwbGF5IHNjZW5lXHJcbnJlbmRlcmVyIC0gdGhyZWUuanMgcmVuZGVyZXJcclxuY2FudmFzIC0gaXMgY3JlYXRlZCBieSB0aHJlZS5qcyByZW5kZXJlciwgaXQgaGF2ZSB0byBhcHBlbmQgdG8gZG9tX3NjcmVlbiBjaGlsZHJlbiwgZnVjayBpdFxyXG5jYW52YXMgd2lkdGggYW5kIGhlaWdodCBkZWZpbmluZyBvbiBjcmVhdGluZyBpdCBieSByZW5kZXJlciwgZnVjayBpdFxyXG5cclxuXHJcblxyXG4qL1xyXG5cclxuaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuaW1wb3J0IHttYWluX2V2ZW50X2h1YiwgRXZlbnRfSHVifSBmcm9tICcuLi9iYXNlL2V2ZW50X2h1Yi5qcyc7XHJcbmltcG9ydCB7TW91c2VfSW50ZXJzZWN0b3J9IGZyb20gJy4uL2Jhc2UvbW91c2VfaW50ZXJzZWN0b3IuanMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIEFwcGxpY2F0aW9uIChjb25maWcpXHJcbntcclxuXHJcbiAgICB0aGlzLl9saWZlY3ljbGVfZXZlbnQoXCJiZWZvcmVfY3JlYXRlZFwiKTtcclxuICAgXHJcbiAgICB0aGlzLl9pbml0X3RpbWVyKCk7XHJcbiAgICB0aGlzLl9jcmVhdGVfbG9vcF9mdW5jdGlvbigpO1xyXG4gICAgXHJcblx0dGhpcy5tb3VzZV9jb250cm9sbGVycyA9IFtdO1xyXG4gICAgXHJcbiAgICBtYWluX2V2ZW50X2h1Yi5hZGRfZXZlbnRfbGlzdGVuZXIoXCJraWxsX21lXCIsIGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICB0aGlzLnJlbW92ZV9hbmltYXRlZF9vYmplY3Qob2JqKTtcclxuICAgIH0sIHRoaXMpO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoY29uZmlnKVxyXG57XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0IGFwcGxpY2F0aW9uLi4uXCIpO1xyXG4gICB0aGlzLl9zZXRfY29uZmlndXJhdGlvbihjb25maWcpO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuX2xpZmVjeWNsZV9ldmVudCA9IGZ1bmN0aW9uIChuYW1lLCBldmVudClcclxue1xyXG4gICAgaWYgKHRoaXNbbmFtZV0pIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tuYW1lXShldmVudCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuX2luaXRfdGltZXIgPSBmdW5jdGlvbiAoKVxyXG57XHJcblx0dGhpcy5jbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1x0XHJcblx0dGhpcy5kZWx0YV90aW1lID0gMDtcclxuXHR0aGlzLmFuaW1hdGVkX29iamVjdHMgPSBbXTtcclxufVxyXG5cclxuXHJcbnZhciBydW5fZnVuY3Rpb24gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcblx0ZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdFx0d2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcblx0fVxyXG5cdFxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5fY3JlYXRlX2xvb3BfZnVuY3Rpb24gPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblx0dGhpcy5ydW4gPSBmdW5jdGlvbiAoKVxyXG5cdHtcclxuXHRcdHJ1bl9mdW5jdGlvbihmdW5jdGlvbiAoKSBcclxuXHRcdHsgXHJcblx0XHRcdHNlbGYubG9vcCgpO1xyXG4gICAgICAgICAgICAvL21haW5fZXZlbnRfaHViLmVtaXQoXCJuZXdfZnJhbWVcIik7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcbiAgICAvL015X0xpYi5jcmVhdGVfcnVuX2Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgXHJcbiAgICAvL21haW5fZXZlbl9odWIuYWRkX2V2ZW50X2xpc3RlbmVyKFwibmV3X2ZyYW1lXCIsIHRoaXMubG9vcCwgdGhpcyk7ICAgIFxyXG59XHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLmdldF9kZWZhdWx0X2NvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFwiZG9tX2VsZW1lbnRcIjogXCJzY3JlZW5cIixcclxuICAgICAgICBcInJlbmRlcl9wYXJhbXNcIjoge1xyXG4gICAgICAgICAgICBcInByZW11bHRpcGxpZWRBbHBoYVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImFscGhhXCI6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidmlld3BvcnRcIjoge1xyXG4gICAgICAgICAgICBcIndpZHRoXCI6IDgwMCxcclxuICAgICAgICAgICAgXCJoZWlnaHRcIjogNjAwXHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgIFwiY2xlYXJfY29sb3JcIjogMHgwMDAwRkYsXHJcbiAgICAgICAgXCJtYWluX2NhbWVyYVwiOiB7XHJcbiAgICAgICAgICAgIFwiZm92XCI6IDgwLFxyXG4gICAgICAgICAgICBcIm5lYXJcIjogMC4xLFxyXG4gICAgICAgICAgICBcImZhclwiOiAxMDAwLFxyXG4gICAgICAgICAgICBcImFzcGVjdF9yYXRpb1wiOiAxLjMzMzMzMzMzMzMzMzMzMzMsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ4XCI6IDAsXHJcbiAgICAgICAgICAgICAgICBcInlcIjogMCxcclxuICAgICAgICAgICAgICAgIFwielwiOiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuX2NyZWF0ZV9yZW5kZXIgPSBmdW5jdGlvbiAoanNvbilcclxue1xyXG4gICAgaWYgKHRoaXMuZG9tX3NjcmVlbiB8fCB0aGlzLnJlbmRlcmVyKSB7XHJcbiAgICAgICAgYWxlcnQoXCJDcmVhdGUgcmVuZGVyIGFsZXJ0ISBTb21ldGhpbmcgc3RyYW5nZSBoYXBwZW5lcyFcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuZG9tX3NjcmVlbikge1xyXG4gICAgICAgIHRoaXMuZG9tX3NjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGpzb24uZG9tX2VsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnJlbmRlcmVyKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKGpzb24ucmVuZGVyX3BhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoISEhdGhpcy5kb21fc2NyZWVuIHx8IHR5cGVvZiB0aGlzLmRvbV9zY3JlZW4gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNvbWUgdGVycm9yb3VzIGhhcHBlbnMhIGRvbSBlbGVtZW50IGZvciBzY3JlZW4gbm90IGZvdW5kISBlbGVtZW50IGlkIGlzIFwiICsganNvbi5kb21fZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiZm91bmQgZG9tZSBlbGVtZW50IFwiICsganNvbi5kb21fZWxlbWVudCk7XHJcbiAgICB0aGlzLmRvbV9zY3JlZW4uYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcclxuICAgIHRoaXMuY2FudmFzID0gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50O1xyXG4gICAgXHJcbiAgICBcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZShqc29uLnZpZXdwb3J0LndpZHRoLCBqc29uLnZpZXdwb3J0LmhlaWdodCk7XHJcbiAgICB0aGlzLnNldF92aWV3cG9ydChqc29uLnZpZXdwb3J0LndpZHRoLCBqc29uLnZpZXdwb3J0LmhlaWdodCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoanNvbi5jbGVhcl9jb2xvcik7XHJcbiAgICBcclxuICAgIHRoaXMuX2xpZmVjeWNsZV9ldmVudChcInJlbmRlcl9jcmVhdGVkXCIpO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuX2NyZWF0ZV9tYWluX3NjZW5lID0gZnVuY3Rpb24gKGpzb24pXHJcbntcclxuICAgIHZhciBldmVudCA9IHtwcmV2ZW50OiBmYWxzZX07XHJcbiAgICB0aGlzLl9saWZlY3ljbGVfZXZlbnQoXCJiZWZvcmVfY3JlYXRlX21haW5fc2NlbmVcIiwgZXZlbnQpO1xyXG4gICAgLypcclxuICAgIGlmIChldmVudC5wcmV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIGlmICghdGhpcy5tYWluX3NjZW5lKSB7XHJcbiAgICAgICAgdGhpcy5tYWluX3NjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciBjYW1lcmEgPSBqc29uLm1haW5fY2FtZXJhOyAgICBcclxuICAgIGlmICghdGhpcy5tYWluX2NhbWVyYSkge1xyXG4gICAgICAgIHRoaXMubWFpbl9jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoY2FtZXJhLmZvdiwgY2FtZXJhLmFzcGVjdF9yYXRpbywgY2FtZXJhLm5lYXIsIGNhbWVyYS5mYXIpO1xyXG4gICAgICAgIHRoaXMubWFpbl9zY2VuZS5hZGQodGhpcy5tYWluX2NhbWVyYSk7XHJcbiAgICAgICAgdGhpcy5tYWluX2NhbWVyYS5uYW1lID0gXCJtYWluX2NhbWVyYVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1haW5fY2FtZXJhLmZvdiA9IGNhbWVyYS5mb3Y7XHJcbiAgICAgICAgdGhpcy5tYWluX2NhbWVyYS5uZWFyID0gY2FtZXJhLm5lYXI7XHJcbiAgICAgICAgdGhpcy5tYWluX2NhbWVyYS5mYXIgPSBjYW1lcmEuZmFyO1xyXG4gICAgICAgIHRoaXMubWFpbl9jYW1lcmEuYXNwZWN0ID0gY2FtZXJhLmFzcGVjdF9yYXRpbztcclxuICAgICAgICB0aGlzLm1haW5fY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5tYWluX2NhbWVyYS5wb3NpdGlvbi5zZXQoY2FtZXJhLnBvc2l0aW9uLngsIGNhbWVyYS5wb3NpdGlvbi55LCBjYW1lcmEucG9zaXRpb24ueik7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5hcHBseV9jb25maWd1cmF0aW9uID0gZnVuY3Rpb24gKGpzb24pXHJcbntcclxuICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGpzb247XHJcbiAgICB0aGlzLl9jcmVhdGVfcmVuZGVyKGpzb24pO1xyXG4gICAgdGhpcy5fY3JlYXRlX21haW5fc2NlbmUoanNvbik7XHJcbiAgICB0aGlzLl9saWZlY3ljbGVfZXZlbnQoXCJjcmVhdGVkXCIpO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUubG9hZF9jb25maWd1cmF0aW9uID0gZnVuY3Rpb24gKHVybClcclxue1xyXG4gICAgdmFyIHhociA9IG5ldyBUSFJFRS5YSFJMb2FkZXIoKTtcclxuICAgIFxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgXHJcbiAgICB2YXIgY29uZmlnID0gc2VsZi5nZXRfZGVmYXVsdF9jb25maWd1cmF0aW9uKCk7XHJcbiAgICBcclxuICAgIHZhciBjb25maWd1cmF0aW9uX2lzX2FwcGxpZWQgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gb25sb2FkIChkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25maWd1cmF0aW9uIGxvYWRlZCBmcm9tIHVybCA8PFwiICsgdXJsICsgXCI+PlwiKTtcclxuICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAvL3VzZXIgY29uZmlnIGFwcGVuZCB0byBkZWZhdWx0IGNvbmZpZyBhbmQgbWF5IHJld3JpdGUgdGhlbSwgXHJcbiAgICAgICAgLy90aG91Z2ggdXNlciBuYXZlbid0IHRvIHJld3JpdGUgQUxMIGNvbmZpZyB0byBjaGFuZ2Ugc29tZSBwYXJhbXNcclxuICAgICAgICBfLmNvcHlfb2JqZWN0KGNvbmZpZywgb2JqKTtcclxuICAgICAgICBzZWxmLmFwcGx5X2NvbmZpZ3VyYXRpb24oY29uZmlnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb25maWd1cmF0aW9uX2lzX2FwcGxpZWQsIFwib25sb2FkXCIpOyAgICAgICAgXHJcbiAgICAgICAgY29uZmlndXJhdGlvbl9pc19hcHBsaWVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHByb2dyZXNzKCkge31cclxuICAgIGZ1bmN0aW9uIGVycm9yKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIG9uIGxvYWRpbmcgY29uZmlnIVwiLCBldmVudC50YXJnZXQuc3RhdHVzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgZGVmYXVsdCBjb25maWd1cmF0aW9uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvbmZpZ3VyYXRpb25faXNfYXBwbGllZCwgXCJlcnJvclwiKTsgICAgICAgIFxyXG4gICAgICAgIGNvbmZpZ3VyYXRpb25faXNfYXBwbGllZCA9IHRydWU7ICAgICAgICBcclxuICAgICAgICBzZWxmLmFwcGx5X2NvbmZpZ3VyYXRpb24oY29uZmlnKTtcclxuICAgIH1cclxuICAgIHhoci5sb2FkKHVybCwgb25sb2FkLCBwcm9ncmVzcywgZXJyb3IpO1xyXG59XHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLl9zZXRfY29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uIChjb25maWcpXHJcbntcclxuICAgIHZhciBkZWZhdWx0X2NvbmZpZyA9IHRoaXMuZ2V0X2RlZmF1bHRfY29uZmlndXJhdGlvbigpO1xyXG4gICAgXHJcbiAgICAvL3RoaXMgaXMgdXJsIG9mIGNvbmZpZ3VyYXRpb24gZmlsZVxyXG4gICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXQgY29uZmlndXJhdGlvbiBmcm9tIHVybCA+PiBcIiArIGNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5sb2FkX2NvbmZpZ3VyYXRpb24oY29uZmlnKTtcclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMgaXMgb2JqZWN0IGZpbGxlZCB3aXRoIGRhdGFcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldCBjb25maWd1cmF0aW9uIGZyb20gdXNlciBvYmplY3RcIik7XHJcbiAgICAgICAgXy5jb3B5X29iamVjdChkZWZhdWx0X2NvbmZpZyxjb25maWcpO1xyXG4gICAgICAgIHRoaXMuYXBwbHlfY29uZmlndXJhdGlvbihkZWZhdWx0X2NvbmZpZyk7XHJcbiAgICAvL2NvbmZpZ3VyYXRpb24gbm90IGdpdmVuLCB1c2UgZGVmYXVsdFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIl9zZXRfY29uZmlndXJhdGlvbjogc2V0IGRlZmF1bHQgY29uZmlncmF0aW9uXCIpO1xyXG4gICAgICAgdGhpcy5hcHBseV9jb25maWd1cmF0aW9uKGRlZmF1bHRfY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuQXBwbGljYXRpb24uZXh0ZW5kID0gZnVuY3Rpb24gKG1ldGhvZHMsIGNoaWxkX2Z1bmMpXHJcbntcclxuXHJcbiAgICB2YXIgQ2hpbGQ7XHJcbiAgICBpZiAodHlwZW9mIGNoaWxkX2Z1bmMgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgQ2hpbGQgPSBmdW5jdGlvbiAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQXBwbGljYXRpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIENoaWxkID0gY2hpbGRfZnVuYztcclxuICAgIH1cclxuXHJcbiAgICAvL2NyZWF0ZSBuZXcgb2JqZWN0IGFuZCBzZXQgcHJvdG90eXBlIGNoYWluXHJcblx0Q2hpbGQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShBcHBsaWNhdGlvbi5wcm90b3R5cGUpO1xyXG4gICAgLy9jb3B5IG1ldGhvZHMgdG8gbmV3IG9iamVjdFxyXG5cdF8uY29weV9vYmplY3QoQ2hpbGQucHJvdG90eXBlLCBtZXRob2RzKTtcclxuICAgIENoaWxkLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENoaWxkO1xyXG4gICBcclxuICAgIHJldHVybiBDaGlsZDtcclxufVxyXG5cclxuQXBwbGljYXRpb24uZXh0ZW5kX3Byb3RvID0gZnVuY3Rpb24gKHByb3RvLCBtZXRob2RzKVxyXG57XHJcblx0dmFyIG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xyXG5cdF8uY29weV9vYmplY3Qob2JqLCBtZXRob2RzKTtcclxuXHRBcHBsaWNhdGlvbi5jYWxsKG9iaik7XHJcblx0cmV0dXJuIG9iajtcclxufVxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24gKCkgXHJcbntcclxuXHR2YXIgZGVsdGEgPSB0aGlzLmNsb2NrLmdldERlbHRhKCk7XHJcblx0Ly9maXggdGhpcyAtIGFkZCBvcHRpb25zIHRvIGNvbnRyb2wgbWluIGZyYW1lIHJhdGVcclxuXHRpZiAoZGVsdGEgPiAwLjEpIHtcclxuXHRcdGRlbHRhID0gMC4xO1xyXG5cdH1cclxuXHR0aGlzLmRlbHRhX3RpbWUgPSBkZWx0YTtcclxuICAgIHRoaXMuZG9fdXBkYXRlKGRlbHRhKTtcclxuXHR0aGlzLnVwZGF0ZShkZWx0YSk7XHJcblx0dGhpcy5yZW5kZXIoZGVsdGEpO1xyXG5cdHRoaXMucnVuKCk7XHJcbiAgICAvL015X0xpYi5ydW4oKTtcclxufVxyXG5cclxuXHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuYWRkX2FuaW1hdGVkX29iamVjdCA9IGZ1bmN0aW9uIChvYmopXHJcbntcclxuXHQvL2ZpeCBwcm9iYWJseSBkdXBsaWNhdGVzXHJcblx0dGhpcy5hbmltYXRlZF9vYmplY3RzLnB1c2gob2JqKTtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLnJlbW92ZV9hbmltYXRlZF9vYmplY3QgPSBmdW5jdGlvbiAob2JqKVxyXG57XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuYW5pbWF0ZWRfb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0aWYgKHRoaXMuYW5pbWF0ZWRfb2JqZWN0c1tpXSA9PT0gb2JqKSB7XHJcblx0XHRcdHRoaXMuYW5pbWF0ZWRfb2JqZWN0cy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuXHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUudXBkYXRlX2FsbCA9IGZ1bmN0aW9uIChkZWx0YSlcclxue1xyXG5cdHZhciBvYmo7XHJcblx0Zm9yKHZhciBpID0gMCwgbGVuID0gdGhpcy5hbmltYXRlZF9vYmplY3RzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRvYmogPSB0aGlzLmFuaW1hdGVkX29iamVjdHNbaV07XHJcblx0XHRpZiAob2JqW1widXBkYXRlXCJdKSB7XHJcblx0XHRcdG9iai51cGRhdGUoZGVsdGEpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLnByZV91cGRhdGUgPSBmdW5jdGlvbiAoZGVsdGEpXHJcbntcclxuXHR0aGlzLnVwZGF0ZV9hbGwoZGVsdGEpO1xyXG4gICAgTXlfTGliLnBhcnRpY2xlX21hbmFnZXIudXBkYXRlKGRlbHRhKTtcclxuICAgIC8vZXZlbnRcclxuICAgIGlmICh0aGlzLmJlZm9yZV91cGRhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYmVmb3JlX3VwZGF0ZShkZWx0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuZG9fdXBkYXRlID0gZnVuY3Rpb24gKGR0KVxyXG57XHJcbiAgICB0aGlzLnByZV91cGRhdGUoZHQpO1xyXG4gICAgdGhpcy51cGRhdGUoZHQpO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRlbHRhKVxyXG57XHJcbn1cclxuXHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuY3JlYXRlX21vdXNlX21vdmVfbGlzdGVuZXIgPSBmdW5jdGlvbiAoKVxyXG57XHJcblx0aWYgKHRoaXNbXCJtb3VzZV9tb3ZlX2xpc3RlbmVyXCJdKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHR0aGlzLm1vdXNlX21vdmVfbGlzdGVuZXIgPSB0cnVlO1xyXG5cdGZ1bmN0aW9uIG1vdXNlX21vdmVfbGlzdGVuZXIoZXZlbnQpIHtcclxuXHRcdHZhciB2ZWN0b3IgPSBNb3VzZV9JbnRlcnNlY3Rvci5tb3VzZV9jb29yZHNfdG9fdmVjdG9yKHNlbGYuZG9tX3NjcmVlbiwgZXZlbnQpO1x0XHRcclxuXHRcdHNlbGYuZmluZF9tb3VzZV9vdmVyX2ludGVyc2VjdGlvbnModmVjdG9yKTtcclxuXHR9O1xyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW91c2VfbW92ZV9saXN0ZW5lcik7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5maW5kX21vdXNlX292ZXJfaW50ZXJzZWN0aW9ucyA9IGZ1bmN0aW9uKHZlY3Rvcilcclxue1xyXG5cdHZlY3Rvci51bnByb2plY3QodGhpcy5tYWluX2NhbWVyYSk7XHJcblx0dmFyIHJheSA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoIHRoaXMubWFpbl9jYW1lcmEucG9zaXRpb24sIHZlY3Rvci5zdWIoIHRoaXMubWFpbl9jYW1lcmEucG9zaXRpb24gKS5ub3JtYWxpemUoKSApO1xyXG5cdHZhciBvYmo7XHJcblx0Zm9yKHZhciBpID0wLCBsZW4gPSB0aGlzLm1vdXNlX2NvbnRyb2xsZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcclxuXHRcdG9iaiA9IHRoaXMubW91c2VfY29udHJvbGxlcnNbaV07XHJcblx0XHRpZiAob2JqLm92ZXIpIHtcclxuXHRcdFx0Ly8gY3JlYXRlIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9iamVjdHMgaW4gdGhlIHNjZW5lIHdpdGggd2hpY2ggdGhlIHJheSBpbnRlcnNlY3RzXHJcblx0XHRcdC8vdmFyIGludGVyc2VjdHMgPSByYXkuaW50ZXJzZWN0T2JqZWN0cyggW2dyaWRfdGV4dC5yb290XSwgdHJ1ZSApOyBcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhmYWtlX3BsYW5lLnJvb3QuY2hpbGRyZW5bMF0uZ2VvbWV0cnkpO1xyXG5cdFx0XHR2YXIgaW50ZXJzZWN0cyA9IHJheS5pbnRlcnNlY3RPYmplY3RzKCBbb2JqLnJvb3RdLCB0cnVlICk7IFxyXG5cdFx0XHRvYmouY2FsbGJhY2soaW50ZXJzZWN0cyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuYWRkX21vdXNlX2NvbnRyb2xsZXIgPSBmdW5jdGlvbiAocm9vdCwgb3ZlciwgY2xpY2ssIGNhbGxiYWNrKVxyXG57XHJcblx0dmFyIHRtcCA9IG5ldyBNeV9MaWIuTW91c2VfQ29udHJvbGxlcihyb290LCBvdmVyLCBjbGljaywgY2FsbGJhY2spXHJcblx0dGhpcy5tb3VzZV9jb250cm9sbGVycy5wdXNoKCB0bXAgKTtcclxuXHRpZiAob3Zlcikge1xyXG5cdFx0dGhpcy5jcmVhdGVfbW91c2VfbW92ZV9saXN0ZW5lcigpO1xyXG5cdH1cclxuXHRyZXR1cm4gdG1wO1xyXG59XHJcblxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5zZXRfdmlld3BvcnQgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodClcclxue1xyXG5cdE15X0xpYi5WaWV3cG9ydC53aWR0aCA9IHdpZHRoO1xyXG5cdE15X0xpYi5WaWV3cG9ydC5oZWlnaHQgPSBoZWlnaHQ7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZGVsdGEpIFxyXG57XHJcblx0dGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKHRoaXMuY29uZmlndXJhdGlvbi5jbGVhcl9jb2xvcik7XHJcblx0dGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSB0cnVlO1xyXG5cdHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMubWFpbl9zY2VuZSwgdGhpcy5tYWluX2NhbWVyYSk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHtBcHBsaWNhdGlvbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwL2FwcGxpY2F0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi9teV9saWIuanMnO1xyXG5cclxuLy9sZW5ndGggLSBzaW1wbGUgbGVuZ3RoIG9mIGFuaW1hdGlvbnNcclxuLy8tMSAtIGluZmluaXRlXHJcbi8vMCAtIHN0b3BcclxuLy8+IDAgLSBsZW5ndGggb2YgYW5pbWF0aW9uLCBcclxuLy9pZiB0aW1lID4gbGVuZ3RoLCBhbmltYXRpb24gc3RvcFxyXG4vL25lZWQgcmV3cml0ZSB0aGlzIGNyYXAgdG8gc2FmZSBmbG9hdGluZyBwb2ludCBtYW5uZXJlXHJcbi8vYW5kIGFwcGVuZCBtb3JlIGNvbnRyb2xlIG9uIGFuaW1hdGlvbiBcclxuICAgIGZ1bmN0aW9uIEJhc2VfQW5pbWF0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gMDtcclxuICAgICAgICB0aGlzLnRpbWVfc2NhbGUgPSAxLjA7XHJcbiAgICAgICAgdGhpcy50eXBlID0gXCJCYXNlX0FuaW1hdGlvblwiO1xyXG4gICAgICAgIHRoaXMudXVpZCA9IF8uZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSAtMTtcclxuICAgICAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2NhbGVkX2R0ID0gZHQgKiB0aGlzLnRpbWVfc2NhbGU7XHJcbiAgICAgICAgdGhpcy50aW1lICs9IHNjYWxlZF9kdDtcclxuICAgICAgICBpZiAodGhpcy5sZW5ndGggPCAwIHx8IHRoaXMudGltZSA8IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY19hbmltYXRpb24oZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RvcHBlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdG9wcGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLmNhbGNfYW5pbWF0aW9uID0gZnVuY3Rpb24gKGR0KVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBCYXNlX0FuaW1hdGlvbi5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbihvYmopXHJcbiAgICB7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoZGF0YSlcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHt9O1xyXG4gICAgICAgIGRhdGEudXVpZCA9IHRoaXMudXVpZDtcclxuICAgICAgICBkYXRhLnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgZGF0YS5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLnRpbWVfc2NhbGUgPSB0aGlzLnRpbWVfc2NhbGUgPT09IHVuZGVmaW5lZCA/IDEuMCA6IHRoaXMudGltZV9zY2FsZTtcclxuICAgICAgICBkYXRhLmxlbmd0aCA9IHRoaXMubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBCYXNlX0FuaW1hdGlvbi5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAocGFyYW0pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gcGFyYW0udHlwZTtcclxuICAgICAgICB0aGlzLnV1aWQgPSBwYXJhbS51dWlkO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IHBhcmFtLm5hbWUgPyBwYXJhbS5uYW1lIDogJyc7XHJcbiAgICAgICAgdGhpcy50aW1lX3NjYWxlID0gKHBhcmFtLnRpbWVfc2NhbGUgPT09IHVuZGVmaW5lZCkgPyAxLjAgOiBwYXJhbS50aW1lX3NjYWxlO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gcGFyYW0ubGVuZ3RoID09PSB1bmRlZmluZWQgPyAtMSA6IHBhcmFtLmxlbmd0aDtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgXHJcbmZ1bmN0aW9uIEV1bGVyX0FuaW1hdGlvbiAoeCwgeSwgeilcclxue1xyXG4gICAgQmFzZV9BbmltYXRpb24uY2FsbCh0aGlzKTtcclxuICAgIHRoaXMudHlwZSA9IFwiRXVsZXJfQW5pbWF0aW9uXCI7XHJcblx0dGhpcy54c3BlZWQgPSB4O1xyXG5cdHRoaXMueXNwZWVkID0geTtcclxuXHR0aGlzLnpzcGVlZCA9IHo7XHJcbiAgICB0aGlzLnggPSAwO1xyXG4gICAgdGhpcy55ID0gMDtcclxuICAgIHRoaXMueiA9IDA7XHJcbiAgICB0aGlzLm5hbWUgPSAnJztcclxufVxyXG5cclxuRXVsZXJfQW5pbWF0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZV9BbmltYXRpb24ucHJvdG90eXBlKTtcclxuXHJcblxyXG5FdWxlcl9BbmltYXRpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRXVsZXJfQW5pbWF0aW9uO1xyXG5cclxuRXVsZXJfQW5pbWF0aW9uLnByb3RvdHlwZS5jYWxjX2FuaW1hdGlvbiA9IGZ1bmN0aW9uIChkdClcclxue1xyXG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLnhzcGVlZCx0aGlzLnlzcGVlZCwgdGhpcy56cGVlZCwgZHQsIHRoaXMudGltZV9zY2FsZSk7XHJcbiAgICBkdCAqPSB0aGlzLnRpbWVfc2NhbGU7XHJcblx0dGhpcy54ICs9IHRoaXMueHNwZWVkICogZHQ7XHJcblx0dGhpcy55ICs9IHRoaXMueXNwZWVkICogZHQ7XHJcblx0dGhpcy56ICs9IHRoaXMuenNwZWVkICogZHQ7XHJcbn1cclxuICAgIFxyXG5FdWxlcl9BbmltYXRpb24ucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24gKG9iailcclxue1xyXG4gICAgb2JqLnJvdGF0aW9uLnNldCh0aGlzLngsdGhpcy55LCB0aGlzLnopO1xyXG59XHJcblxyXG5FdWxlcl9BbmltYXRpb24ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIChqc29uKVxyXG57XHJcbiAgIHZhciBkYXRhID0gQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMpO1xyXG4gICBkYXRhLnhzcGVlZCA9IHRoaXMueHNwZWVkO1xyXG4gICBkYXRhLnlzcGVlZCA9IHRoaXMueXNwZWVkO1xyXG4gICBkYXRhLnpzcGVlZCA9IHRoaXMuenNwZWVkO1xyXG4gICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuRXVsZXJfQW5pbWF0aW9uLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChwYXJhbSlcclxue1xyXG4gICAgQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLnBhcnNlLmNhbGwodGhpcywgcGFyYW0pO1xyXG4gICAgdGhpcy54c3BlZWQgPSBwYXJhbS54c3BlZWQ7XHJcbiAgICB0aGlzLnlzcGVlZCA9IHBhcmFtLnlzcGVlZDtcclxuICAgIHRoaXMuenNwZWVkID0gcGFyYW0uenNwZWVkO1xyXG4gICAgdGhpcy54ID0gdGhpcy55ID0gdGhpcy56ID0gMDsgICAgXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBTY2FsZV9BbmltYXRpb24oeCwgeSwgeilcclxue1xyXG4gICAgQmFzZV9BbmltYXRpb24uY2FsbCh0aGlzKTtcclxuICAgIC8vc3BlZWQgb2Ygc2NhbGVcclxuICAgIHRoaXMueHNjYWxlID0geDtcclxuICAgIHRoaXMueXNjYWxlID0geTtcclxuICAgIHRoaXMuenNjYWxlID0gejtcclxuICAgIHRoaXMueCA9IDEuMDtcclxuICAgIHRoaXMueSA9IDEuMDtcclxuICAgIHRoaXMueiA9IDEuMDtcclxufVxyXG5cclxuU2NhbGVfQW5pbWF0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZV9BbmltYXRpb24ucHJvdG90eXBlKTtcclxuXHJcbl8uY29weV9vYmplY3QoU2NhbGVfQW5pbWF0aW9uLnByb3RvdHlwZSwge1xyXG4gICAgY29uc3RydWN0b3I6IFNjYWxlX0FuaW1hdGlvbixcclxuICAgIGNhbGNfYW5pbWF0aW9uOiBmdW5jdGlvbiAoZHQpIFxyXG4gICAge1xyXG4gICAgICAgIGR0ID0gZHQgKiB0aGlzLnRpbWVfc2NhbGU7XHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMueHNjYWxlICogZHQ7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMueXNjYWxlICogZHQ7XHJcbiAgICAgICAgdGhpcy56ICs9IHRoaXMuenNjYWxlICogZHQ7XHJcbiAgICB9LFxyXG4gICAgYXBwbHk6ZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIG9iai5zY2FsZS5zZXQodGhpcy54LCB0aGlzLnksIHRoaXMueik7XHJcbiAgICB9LFxyXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5maXJzdCkge1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnggPSAxLjA7XHJcbiAgICAgICAgdGhpcy55ID0gMS4wO1xyXG4gICAgICAgIHRoaXMueiA9IDEuMDtcclxuICAgICAgICB0aGlzLnRpbWUgPSAwO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJCYXNlX0FuaW1hdGlvblwiLCBCYXNlX0FuaW1hdGlvbik7XHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIkV1bGVyX0FuaW1hdGlvblwiLCBFdWxlcl9BbmltYXRpb24pO1xyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJTY2FsZV9BbmltYXRpb25cIiwgU2NhbGVfQW5pbWF0aW9uKTtcclxuXHJcblxyXG5leHBvcnQgeyBCYXNlX0FuaW1hdGlvbiwgRXVsZXJfQW5pbWF0aW9uLCBTY2FsZV9BbmltYXRpb24gfTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFzZS9hbmltYXRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi9teV9saWIuanMnO1xyXG5cclxuLy9ldmVudHM6IFxyXG4vL2l0ZW1fbG9hZGVkXHJcbi8vb25lcnJvclxyXG4vL29ucHJvZ3Jlc3NcclxuLy9maW5pc2hlZFxyXG5mdW5jdGlvbiBDaGFpbl9Mb2FkZXIoKVxyXG57XHJcbn1cclxuXHJcbkNoYWluX0xvYWRlci5wcm90b3R5cGUgPSB7XHJcblx0Y29uc3RydWN0b3I6IENoYWluX0xvYWRlcixcclxuXHRzdGFydDogZnVuY3Rpb24gKGxpc3QpIFxyXG5cdHtcclxuXHRcdHRoaXMubGlzdCA9IGxpc3Q7XHJcblx0XHR0aGlzLmluZGV4ID0gMDtcclxuXHRcdHRoaXMubG9hZCh0aGlzLmxpc3RbMF0pO1xyXG5cdFx0dGhpcy5zdG9wX2J5X2Vycm9yID0gZmFsc2U7XHJcblx0fSxcclxuXHRcclxuXHRuZXh0OiBmdW5jdGlvbihyZXNvdXJjZSlcclxuXHR7XHJcblx0XHRpZiAodGhpcy5pdGVtX2xvYWRlZCAmJiByZXNvdXJjZSkge1xyXG5cdFx0XHR0aGlzLml0ZW1fbG9hZGVkKHJlc291cmNlLHRoaXMubGlzdFt0aGlzLmluZGV4XSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmluZGV4Kys7XHJcblx0XHRpZiAodGhpcy5pbmRleCA8IHRoaXMubGlzdC5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5sb2FkKHRoaXMubGlzdFt0aGlzLmluZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodGhpcy5maW5pc2hlZCkge1xyXG5cdFx0XHRcdHRoaXMuZmluaXNoZWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0XHJcblx0ZG9fZXJyb3I6IGZ1bmN0aW9uIChlcnJvcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5vbmVycm9yKSB7XHJcblx0XHRcdHRoaXMub25lcnJvcihlcnJvcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiQ2hhaW4gTG9hZGVyIEVycm9yIVwiLCBlcnJvcik7XHJcblx0XHR9XHJcblx0XHRpZiAoIXRoaXMuc3RvcF9ieV9lcnJvcikge1xyXG5cdFx0XHR0aGlzLm5leHQoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdFxyXG5cdGRvX3Byb2dyZXNzOiBmdW5jdGlvbiAoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLm9ucHJvZ3Jlc3MpIHtcclxuXHRcdFx0dGhpcy5vbnByb2dyZXNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRcdFxyXG5cdGxvYWQ6IGZ1bmN0aW9uIChpdGVtKVxyXG5cdHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdGlmICh0aGlzLmxvYWRfZnVuYykge1xyXG5cdFx0XHR0aGlzLmxvYWRfZnVuYyhpdGVtLCBcclxuXHRcdFx0ZnVuY3Rpb24gKGl0ZW0pIHsgc2VsZi5uZXh0LmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7IH0sXHJcblx0XHRcdGZ1bmN0aW9uIChpdGVtKSB7IHNlbGYuZG9fZXJyb3IuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTsgfSxcclxuXHRcdFx0ZnVuY3Rpb24gKGl0ZW0pIHsgc2VsZi5kb19wcm9ncmVzcy5hcHBseShzZWxmLCBhcmd1bWVudHMpOyB9KTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gdGVzdF9jaGFpbl9sb2FkZXIoKSBcclxue1xyXG5cdHZhciBjbCA9IG5ldyBDaGFpbl9Mb2FkZXIoKTtcclxuXHRjbC5pdGVtX2xvYWRlZCA9IGZ1bmN0aW9uIChpdGVtKSB7Y29uc29sZS5sb2coXCJsb2FkIGl0ZW0gXCIsIGl0ZW0pO31cclxuXHRjbC5maW5pc2hlZCA9IGZ1bmN0aW9uIChpdGVtKSB7Y29uc29sZS5sb2coXCJsb2FkZXIgbWFuYWdlciAtIGpvYiBkb25lXCIpO31cclxuXHRjbC5sb2FkX2Z1bmMgPSBmdW5jdGlvbiAoaXRlbSwgbmV4dCwgZXJyb3IsIHByb2dyZXNzKSB7IFxyXG5cdFx0aWYgKGl0ZW0pIHtcclxuXHRcdFx0bmV4dChpdGVtKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVycm9yKGl0ZW0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjbC5zdGFydChbXCJmaXJzdFwiLCBcInNlY29uZFwiLCBudWxsLCBcInRyZWVcIl0pO1xyXG59XHJcbi8vdGVzdF9jaGFpbl9sb2FkZXIoKTtcclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIExvYWRpbmdfTWFuYWdlciAoKVxyXG57XHJcblx0dGhpcy5yZXNvdXJjZXMgPSB7fTtcclxuXHR0aGlzLnRleHR1cmVfbG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcclxufVxyXG5cclxuTG9hZGluZ19NYW5hZ2VyLnByb3RvdHlwZSA9IHtcclxuXHRjb25zdHJ1Y3RvcjogTG9hZGluZ19NYW5hZ2VyLFxyXG5cdGdldDogZnVuY3Rpb24gKG5hbWUpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMucmVzb3VyY2VzW25hbWVdO1xyXG5cdH0sXHJcblx0XHJcblx0Z2V0X2FzeW5jOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spXHJcblx0e1xyXG5cdFx0Ly9hbHJlYWR5IGxvYWRlZD9cclxuXHRcdHZhciB0ZXh0dXJlID0gdGhpcy5nZXQobmFtZSk7XHJcblx0XHRpZiAodGV4dHVyZSkge1xyXG5cdFx0XHRpZiAoY2FsbGJhY2spIHtcclxuXHRcdFx0XHRjYWxsYmFjayh0ZXh0dXJlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGV4dHVyZTtcclxuXHRcdH1cclxuXHJcblx0XHQvL2lmIG5vdCBsb2FkIHRoaXMgYXN5bmNcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHRleHR1cmUgPSB0aGlzLnRleHR1cmVfbG9hZGVyLmxvYWQobmFtZSwgZnVuY3Rpb24gKHRleHR1cmUpXHJcblx0XHR7XHJcblx0XHRcdGlmIChjYWxsYmFjaykge1xyXG5cdFx0XHRcdGNhbGxiYWNrKHRleHR1cmUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHRoaXMucmVzb3VyY2VzW25hbWVdID0gdGV4dHVyZTtcdFxyXG5cdFx0cmV0dXJuIHRleHR1cmU7XHJcblx0fSxcclxuXHRcclxuXHJcblx0bG9hZF9saXN0OiBmdW5jdGlvbiAocmVzb3VyY2VfbGlzdCwgb25fbG9hZCwgbG9hZF9mdW5jLCBvbl9wcm9ncmVzcylcclxuXHR7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdHZhciBjbCA9IG5ldyBDaGFpbl9Mb2FkZXIoKTtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdGNsLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkVSUk9SIGxvYWRpbmcgdGV4dHVyZVwiLCBlcnJvciwgY2wubGlzdFtjbC5pbmRleF0pO1x0XHJcblx0XHR9XHJcblx0XHRjbC5pdGVtX2xvYWRlZCA9IGZ1bmN0aW9uIChyZXNvdXJjZSwgbmFtZSkge1xyXG5cdFx0XHRzZWxmLnJlc291cmNlc1tuYW1lXSA9IHJlc291cmNlO1xyXG5cdFx0XHRpZiAoc2VsZi5vbl9yZXNvdXJjZV9sb2FkZWQpIHtcclxuXHRcdFx0XHRzZWxmLm9uX3Jlc291cmNlX2xvYWRlZChyZXNvdXJjZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNsLm9uX3Byb2dyZXNzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAob25fcHJvZ3Jlc3MpIHtcclxuXHRcdFx0XHRvbl9wcm9ncmVzcygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjbC5sb2FkX2Z1bmMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGxvYWRfZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0fVxyXG5cdFx0Y2wuZmluaXNoZWQgPSBmdW5jdGlvbiAoKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAob25fbG9hZCkge1xyXG5cdFx0XHRcdG9uX2xvYWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2wuc3RhcnQocmVzb3VyY2VfbGlzdCk7XHJcblx0XHRcclxuXHR9LFxyXG5cclxuXHRsb2FkX2xpc3RfdGV4dHVyZXM6IGZ1bmN0aW9uIChyZXNvdXJjZV9saXN0LCBvbl9sb2FkKVxyXG5cdHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHRoaXMubG9hZF9saXN0KHJlc291cmNlX2xpc3QsIG9uX2xvYWQsIGZ1bmN0aW9uICh1cmwsIG5leHQsIGVycm9yLCBwcm9ncmVzcyApIFxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgdGV4dHVyZSA9IHNlbGYudGV4dHVyZV9sb2FkZXIubG9hZCh1cmwsIG5leHQsIHByb2dyZXNzLCBlcnJvcik7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRsb2FkX2xpc3RfanNvbjogZnVuY3Rpb24gKHJlc291cmNlX2xpc3QsIG9uX2xvYWQsIHByb2dyZXNzKVxyXG5cdHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHZhciBsb2FkZXIgPSBuZXcgVEhSRUUuWEhSTG9hZGVyKCk7XHRcclxuXHRcdHRoaXMubG9hZF9saXN0KHJlc291cmNlX2xpc3QsIG9uX2xvYWQsIGZ1bmN0aW9uICh1cmwsIG5leHQsIGVycm9yLCBwcm9ncmVzcykgXHJcblx0XHR7XHJcblx0XHRcdHZhciB0ZXh0dXJlID0gbG9hZGVyLmxvYWQodXJsLCBuZXh0LCBwcm9ncmVzcywgZXJyb3IpO1xyXG5cdFx0fSwgcHJvZ3Jlc3MpO1xyXG5cdH0sXHJcblx0XHJcblx0ZnJlZTogZnVuY3Rpb24gKClcclxuXHR7XHJcblx0XHR0aGlzLnJlc291cmNlcyA9IHt9O1xyXG5cdH1cclxufTtcclxuXHJcblxyXG5NeV9MaWIuVGV4dHVyZV9NYW5hZ2VyID0gbmV3IExvYWRpbmdfTWFuYWdlcigpO1x0XHJcblxyXG5leHBvcnQgeyBMb2FkaW5nX01hbmFnZXIgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYXNlL2xvYWRpbmdfbWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy9UT0RPOiByZW1vdmUgdGhpcyB1Z2x5IGNyYXAgYW5kIHJlcGxhY2Ugc29tZXRoaW5nIHJlYXNvbmFibGVcclxuXHJcbmltcG9ydCB7TXlfTGlifSBmcm9tICcuL215X2xpYi5qcyc7XHJcblxyXG4vL3RoaXMgdWdseSBjbGFzcyBsb2FkaW5nIHRleHR1cmUgbGlzdCBpbiBqc29uIGZvcm1hdCwgcGFyc2UgaXQsIGFuZCBsb2FkaW5nIHRleHR1cmVzXHJcbi8vdGhlbiBpdCBjYWxsIGV2ZW50IGRhdGFfbG9hZGVkLCB3aGVuIGdpdmUgdGV4dHVyZSBsaXN0IGluIGpzb24gZm9ybWF0XHJcblxyXG5mdW5jdGlvbiBQYWNrYWdlX01hbmFnZXIoKVxyXG57XHJcbiAgICB0aGlzLnN0YXRlID0ge307XHJcbn1cclxuXHJcbi8vbG9hZCBqc29uIGZpbGUgd2l0aCBkZXNjcmlwdGlvbnMgb2YgcGFja2FnZTogdGV4dHVyZSBsaXN0LCBwYXJ0aWNsZXMgbGlzdCwgc2NlbmUgb2JqZWN0cyBsaXN0XHJcblBhY2thZ2VfTWFuYWdlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICh1cmwsIGRlZmF1bHRzKVxyXG57XHJcbiAgICB0aGlzLmRlZmF1bHRzID0gZGVmYXVsdHM7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgIFwidHlwZVwiOiBcInN0YXJ0XCJcclxuICAgIH07XHJcbiAgICBcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGZ1bmN0aW9uIG9ubG9hZCAoZGF0YSkge1xyXG4gICAgICAgIHNlbGYuc3RhdGVbXCJ0eXBlXCJdID0gXCJkb25lXCI7XHJcbiAgICAgICAgc2VsZi5zdGF0ZVtcImRhdGFcIl0gPSBkYXRhO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNlbGYucGFyc2VfcGFja2FnZV9kZXNjcmlwdGlvbihkYXRhKTsgICAgICAgIFxyXG4gICAgfSAgICBcclxuICAgIGZ1bmN0aW9uIGVycm9yKGV2ZW50KSB7XHJcbiAgICAgICAgc2VsZi5zdGF0ZVtcInR5cGVcIl0gPSBcImVycm9yXCI7XHJcbiAgICAgICAgc2VsZi5zdGF0ZVtcImVycm9yXCJdID0gZXZlbnQ7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVScm9yISBGYWlsZWQgbG9hZGluZyByZXNvdXJjZXMgd2l0aCB1cmwgXCIrdXJsLCBldmVudC50YXJnZXQpOyAgICAgICAgXHJcbiAgICAgICAgaWYgKHNlbGYuZXJyb3Ipe1xyXG4gICAgICAgICAgICBzZWxmLmVycm9yKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYucGFjayA9IHNlbGYuZGVmYXVsdHNcclxuICAgICAgICBzZWxmLmxvYWRfcmVzb3VyY2VzKHNlbGYuZGVmYXVsdHMpO1xyXG5cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHByb2dyZXNzKClcclxuICAgIHtcclxuICAgIH1cclxuICAgIHZhciB4aHIgPSBuZXcgVEhSRUUuWEhSTG9hZGVyKCk7XHJcbiAgICB4aHIubG9hZCh1cmwsIG9ubG9hZCwgcHJvZ3Jlc3MsIGVycm9yKTtcclxufVxyXG5cclxuLy9wYXJzZSBsb2FkZWQganNvbiBmaWxlIFxyXG5QYWNrYWdlX01hbmFnZXIucHJvdG90eXBlLnBhcnNlX3BhY2thZ2VfZGVzY3JpcHRpb24gPSBmdW5jdGlvbiAoZGF0YSlcclxue1xyXG4gICAgY29uc29sZS5sb2coXCJwYWNrYWdlZCBkZXNjcmlwdGlvbiBsb2FkZWQsIGJlZ2luIHBhcnNpbmcuLi5cIik7XHJcbiAgdHJ5IHtcclxuICAgICAgICB2YXIgcGFjayA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgdGhpcy5wYWNrID0gcGFjaztcclxuICAgICAgICBpZiAodGhpcy5sb2FkZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQocGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICB9IFxyXG4gICBjYXRjaChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yIHBhcnNpbmcgcmVzb3VyY2VzIFwiLCBlKTtcclxuICAgICAgICBpZiAodGhpcy5lcnJvcil7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47ICAgICAgICBcclxuICAgfVxyXG4gICB0aGlzLmxvYWRfcmVzb3VyY2VzKHBhY2spO1xyXG59XHJcblxyXG5cclxuUGFja2FnZV9NYW5hZ2VyLnByb3RvdHlwZS5sb2FkX3Jlc291cmNlcyA9IGZ1bmN0aW9uIChwYWNrKVxyXG57XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAvL2xvYWQgdGV4dHVyZXNcclxuICAgY29uc29sZS5sb2coXCJQYWNrYWdlIE1hbmFnZXI6IGJlZ2luIGxvYWRpbmcgdGV4dHVyZXMuLi5cIik7ICAgIFxyXG4gICAgTXlfTGliLlRleHR1cmVfTWFuYWdlci5sb2FkX2xpc3RfdGV4dHVyZXMocGFjay50ZXh0dXJlcywgZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgLy9sb2FkIGpzb24gZGVzY3JpcHRpb25zIGZpbGVzXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXRhX2xvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YV9sb2FkZWQocGFjayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgUGFja2FnZV9NYW5hZ2VyIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFzZS9wYWNrYWdlX21hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuL215X2xpYi5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVfTWFuYWdlcn0gZnJvbSAnLi4vcGFydGljbGVzL3BhcnRpY2xlc19tYW5hZ2VyLmpzJ1xyXG5cclxuZnVuY3Rpb24gU2NlbmVfU2VyaWFsaXplcihyb290KVxyXG57XHJcbiAgICB0aGlzLmFuaW1hdGlvbl9saWJyYXJ5ID0ge307XHJcbn1cclxuXHJcblNjZW5lX1NlcmlhbGl6ZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIChyb290KVxyXG57XHJcbiAgICB0aGlzLmpzb24gPSByb290LnRvSlNPTigpO1xyXG4gICAgY29uc29sZS5sb2coXCJteSBsaWIgcGFydGljbGUgbWFuYWdlclwiLCBNeV9MaWIucGFydGljbGVfbWFuYWdlcik7XHJcbiAgICB0aGlzLmpzb25bXCJwYXJ0aWNsZXNcIl0gPSBNeV9MaWIucGFydGljbGVfbWFuYWdlci50b0pTT04oKTtcclxuICAgIHZhciBhbmltcyA9IHJvb3QuY29sbGVjdF9hbmltYXRpb25zKHJvb3QpO1xyXG4gICAgaWYgKGFuaW1zLmNvdW50ID4gMCkge1xyXG4gICAgICAgIHRoaXMuanNvbltcIm15YW5pbWF0aW9uc1wiXSA9IGFuaW1zO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcy5qc29uO1xyXG59XHJcblxyXG5cclxuXHJcblNjZW5lX1NlcmlhbGl6ZXIucHJvdG90eXBlLmNyZWF0ZV9hbmltYXRpb25zID0gZnVuY3Rpb24gKGFuaW1hdGlvbnMpIHtcclxuICAgIGZvcih2YXIga2V5IGluIGFuaW1hdGlvbnMpIHtcclxuICAgICAgICBpZiAoIHRoaXMuYW5pbWF0aW9uX2xpYnJhcnlba2V5XSA9PT0gdW5kZWZpbmVkICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhbmltYXRpb25zLCBrZXkpKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gYW5pbWF0aW9uc1trZXldO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY3JlYXRlIGFuaW1hdGlvbnMgXCIsIGRhdGEudXVpZCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBhbmltID0gIE15X0xpYi5BYnN0cmFjdF9GYWJyaWMoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChhbmltKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbl9saWJyYXJ5W2tleV0gPSBhbmltO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblNjZW5lX1NlcmlhbGl6ZXIucHJvdG90eXBlLmJpbmRfYW5pbWF0aW9ucyA9IGZ1bmN0aW9uIChhbmltZGF0YSlcclxue1xyXG4gICAgaWYgKCFhbmltZGF0YSkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICB2YXIgYmluZGluZ3MgPSBhbmltZGF0YS5iaW5kaW5ncztcclxuICAgIFxyXG4gICAgLy9jb25zb2xlLmxvZyhcImJpbmQgYW5pbWF0aW9uXCIpO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgZnVuY3Rpb24gY29weV9hbmltYXRpb25zKG9iaiwgYmluZClcclxuICAgIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYmluZC5hbmltYXRpb25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdmFyIGFuaW1fdXVpZCA9IGJpbmQuYW5pbWF0aW9uc1tpXTtcclxuICAgICAgICAgICAgb2JqLmFkZF9hbmltYXRpb24oIHNlbGYuYW5pbWF0aW9uX2xpYnJhcnlbYW5pbV91dWlkXSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgIGZvcih2YXIgaSA9MDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGJpbmQgPSBiaW5kaW5nc1tpXTtcclxuICAgICAgICB2YXIgdXVpZCA9IGJpbmQudXVpZDtcclxuICAgICAgICB2YXIgb2JqID0gdGhpcy5yb290LmdldE9iamVjdEJ5UHJvcGVydHkoXCJ1dWlkXCIsIHV1aWQpO1xyXG4gICAgICAgIGlmIChvYmopIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImJpbmRpbmcgXCIgKyB1dWlkICsgXCIgb2JqZWN0IHRvIGFuaW1hdGlvbiBcIit1dWlkKTtcclxuICAgICAgICAgICAgY29weV9hbmltYXRpb25zKG9iaiwgYmluZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuU2NlbmVfU2VyaWFsaXplci5wcm90b3R5cGUubG9hZF9mcm9tX2pzb24gPSBmdW5jdGlvbiAodXJsKVxyXG57XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBmdW5jdGlvbiBvbmxvYWQoanNvbilcclxuICAgIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoanNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBwYXJzZSBzY2VuZSBcIiwgZSk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNvbWV0aGluZyBmdWNraW5nIGhhcHBlbmVkLCBmYWlsZWQgdG8gbG9hZCBzY2VuZSBcIiwgdXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmxvYWQoZGF0YSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwcm9ncmVzcygpXHJcbiAgICB7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBlcnJvcihlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZS50YXJnZXQpO1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbiAgICB2YXIgeGhyID0gbmV3IFRIUkVFLlhIUkxvYWRlcigpO1xyXG4gICAgeGhyLmxvYWQodXJsLCBvbmxvYWQsIHByb2dyZXNzLCBlcnJvcik7XHJcbn1cclxuXHJcblNjZW5lX1NlcmlhbGl6ZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoanNvbilcclxue1xyXG4gICAgdGhpcy5hbmltYXRpb25fbGlicmFyeSA9IHt9O1xyXG4gICAgdmFyIG8gPSBuZXcgVEhSRUUuT2JqZWN0TG9hZGVyKCk7XHJcbiAgICBpZiAoanNvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5qc29uID0ganNvbjtcclxuICAgIH1cclxuICAgIHZhciByb290ID0gby5wYXJzZSh0aGlzLmpzb24sIGZ1bmN0aW9uICgpIHtjb25zb2xlLmxvZyhcIm9ubG9hZFwiKX0pO1xyXG4gICAgdGhpcy5yb290ID0gcm9vdDsgICAgXHJcblxyXG4gICAgTXlfTGliLnBhcnRpY2xlX21hbmFnZXIubG9hZF9wYXJ0aWNsZXModGhpcy5qc29uLCByb290KTtcclxuICAgIFxyXG4gICAgdGhpcy5jcmVhdGVfYW5pbWF0aW9ucyh0aGlzLmpzb24ubXlhbmltYXRpb25zLmFuaW1hdGlvbnMpO1xyXG4gICAgdGhpcy5iaW5kX2FuaW1hdGlvbnModGhpcy5qc29uLm15YW5pbWF0aW9ucyk7XHJcbiAgICB0aGlzLm1haW5fY2FtZXJhID0gcm9vdC5nZXRPYmplY3RCeU5hbWUoXCJtYWluX2NhbWVyYVwiKTtcclxuICAgIFxyXG4gICAgaWYgKHRoaXMuc2NlbmVfbG9hZGVkKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZV9sb2FkZWQocm9vdCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm9vdDtcclxufVxyXG5cclxuZXhwb3J0IHsgU2NlbmVfU2VyaWFsaXplciB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Jhc2Uvc2NlbmVfc2VyaWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtNb3VzZV9DYW1lcmFfQ29udHJvbGxlcn0gZnJvbSAnLi4vYmFzZS9tb3VzZV9jYW1lcmFfY29udHJvbGxlci5qcyc7XHJcblxyXG5mdW5jdGlvbiBNaXhpbigpXHJcbntcclxuXHJcbiAgICAvL25lZWQgZm9yIHVucHJvamVjdCBvYmplY3QgYW5kIGRyYWdnaW5nXHJcbiAgICBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYS5wcm90b3R5cGUuZ2V0X2ZvcndhcmRfcGxhbmVfYnlfb2JqZWN0ID0gZnVuY3Rpb24gKG9iailcclxuICAgIHtcclxuICAgICAgICB2YXIgeiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbiAgICAgICAgei5zZXRGcm9tTWF0cml4Q29sdW1uKCB0aGlzLm1hdHJpeFdvcmxkLCAyICk7XHJcbiAgICAgICAgdmFyIGRpc3QgPSBvYmoucG9zaXRpb24uZG90KHopOyAgICAgICAgICAgICBcclxuICAgICAgICB2YXIgcGxhbmU9IG5ldyBUSFJFRS5QbGFuZSh6Lm5lZ2F0ZSgpLCBkaXN0KTtcclxuICAgICAgICByZXR1cm4gcGxhbmU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYS5wcm90b3R5cGUuZ2V0X3JheV9mcm9tX3NjcmVlbl9jb29yZGluYXRlcyA9IGZ1bmN0aW9uIChjYW52YXMsIHgseSlcclxuICAgIHtcclxuICAgICAgICB2YXIgbWMgPSBuZXcgTW91c2VfQ2FtZXJhX0NvbnRyb2xsZXIoY2FudmFzLCB0aGlzKTtcclxuICAgICAgICB2YXIgcmF5ID0gbWMuZ2V0X3JheV9mcm9tX2NhbWVyYV9pbl9zY3JlZW5fY29vcmRpbmF0ZXMoeCx5KTtcclxuICAgICAgICByZXR1cm4gcmF5O1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG59XHJcblxyXG5NaXhpbigpO1xyXG5leHBvcnQge01peGlufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9taXhpbnMvY2FtZXJhX21peGluLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBNaXhfSXQoKVxyXG57XHJcblxyXG5cclxuXHJcblx0Ly9GSVhcclxuXHRUSFJFRS5WZWN0b3IzLnByb3RvdHlwZS5hcHBseU1hdHJpeDRfcm90YXRpb24gPSBmdW5jdGlvbiAoIG0gKSBcclxuXHR7XHJcblx0XHQvLyBpbnB1dDogVEhSRUUuTWF0cml4NCBhZmZpbmUgbWF0cml4XHJcblxyXG5cdFx0dmFyIHggPSB0aGlzLngsIHkgPSB0aGlzLnksIHogPSB0aGlzLno7XHJcblx0XHR2YXIgZSA9IG0uZWxlbWVudHM7XHJcblxyXG5cdFx0dGhpcy54ID0gZVsgMCBdICogeCArIGVbIDQgXSAqIHkgKyBlWyA4IF0gICogejtcclxuXHRcdHRoaXMueSA9IGVbIDEgXSAqIHggKyBlWyA1IF0gKiB5ICsgZVsgOSBdICAqIHo7XHJcblx0XHR0aGlzLnogPSBlWyAyIF0gKiB4ICsgZVsgNiBdICogeSArIGVbIDEwIF0gKiB6O1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG4gXHR9XHJcblxyXG52YXIgT2JqZWN0M0RfQW5pbWF0aW9uX01peGluID0ge1xyXG4gICAgXHJcbiAgICBhZGRfYW5pbWF0aW9uOiBmdW5jdGlvbiAoYW5pbSlcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMuYW5pbWF0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9ucy5pbmRleE9mKGFuaW0pIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMucHVzaChhbmltKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICByZW1vdmVfYW5pbWF0aW9uOiBmdW5jdGlvbiAoYW5pbSlcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBpID0gdGhpcy5hbmltYXRpb25zLmluZGV4T2YoYW5pbSk7XHJcbiAgICAgICAgICAgIGlmIChpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICB1cGRhdGU6ICBmdW5jdGlvbiAoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIm9iamVjdCB1cGRhdGVcIiwgZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPTA7IGkgPCB0aGlzLmFuaW1hdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbmltID0gdGhpcy5hbmltYXRpb25zW2ldO1xyXG4gICAgICAgICAgICAgICAgYW5pbS51cGRhdGUoZHQpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnJvdGF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGFuaW0uYXBwbHkodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChvYmoudXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoudXBkYXRlKGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIFxyXG59O1xyXG5fLmNvcHlfb2JqZWN0KFRIUkVFLk9iamVjdDNELnByb3RvdHlwZSwgT2JqZWN0M0RfQW5pbWF0aW9uX01peGluKTtcclxuXHJcblxyXG5USFJFRS5PYmplY3QzRC5wcm90b3R5cGUub2xkX3RvSnNvbiA9IFRIUkVFLk9iamVjdDNELnRvSlNPTjtcclxuXHJcbnZhciBPYmplY3QzRF9TZXJpYWxpemF0aW9uX01peGluID0gXHJcbntcclxuICAgIHN0YW5kYXJkX3NlcmlhbGl6YXRpb246IGZ1bmN0aW9uIChtZXRhKSBcclxuICAgIHtcclxuXHRcdC8vIHN0YW5kYXJkIE9iamVjdDNEIHNlcmlhbGl6YXRpb25cclxuXHRcdHZhciBvYmplY3QgPSB7fTtcclxuXHJcblx0XHRvYmplY3QudXVpZCA9IHRoaXMudXVpZDtcclxuXHRcdG9iamVjdC50eXBlID0gdGhpcy50eXBlO1xyXG5cdFx0aWYgKCB0aGlzLm5hbWUgIT09ICcnICkgb2JqZWN0Lm5hbWUgPSB0aGlzLm5hbWU7XHJcblx0XHRpZiAoIEpTT04uc3RyaW5naWZ5KCB0aGlzLnVzZXJEYXRhICkgIT09ICd7fScgKSBvYmplY3QudXNlckRhdGEgPSB0aGlzLnVzZXJEYXRhO1xyXG5cdFx0aWYgKCB0aGlzLmNhc3RTaGFkb3cgPT09IHRydWUgKSBvYmplY3QuY2FzdFNoYWRvdyA9IHRydWU7XHJcblx0XHRpZiAoIHRoaXMucmVjZWl2ZVNoYWRvdyA9PT0gdHJ1ZSApIG9iamVjdC5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcclxuXHRcdGlmICggdGhpcy52aXNpYmxlID09PSBmYWxzZSApIG9iamVjdC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG5cdFx0b2JqZWN0Lm1hdHJpeCA9IHRoaXMubWF0cml4LnRvQXJyYXkoKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gXCJwYXJ0aWNsZXNfcG9pbnRzXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nZW9tZXRyeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuZ2VvbWV0cnkgPSB0aGlzLmdlb21ldHJ5LnV1aWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCB0aGlzLm1hdGVyaWFsICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsLnV1aWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5tYXRlcmlhbCAhPT0gdW5kZWZpbmVkICAmJiAgbWV0YS5tYXRlcmlhbHNbIHRoaXMubWF0ZXJpYWwudXVpZCBdID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0YS5tYXRlcmlhbHNbIHRoaXMubWF0ZXJpYWwudXVpZCBdID0gdGhpcy5tYXRlcmlhbC50b0pTT04oIG1ldGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMuZ2VvbWV0cnkgIT09IHVuZGVmaW5lZCAmJiBtZXRhLmdlb21ldHJpZXNbIHRoaXMuZ2VvbWV0cnkudXVpZCBdID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0YS5nZW9tZXRyaWVzWyB0aGlzLmdlb21ldHJ5LnV1aWQgXSA9IHRoaXMuZ2VvbWV0cnkudG9KU09OKCBtZXRhICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9ucykge1xyXG4gICAgICAgICAgICBvYmplY3QuYW5pbWF0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPTA7IGkgPCB0aGlzLmFuaW1hdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5hbmltYXRpb25zLnB1c2ggKCB0aGlzLmFuaW1hdGlvbnNbaV0udXVpZCApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cdFx0aWYgKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDAgKSB7XHJcblx0XHRcdG9iamVjdC5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSB0aGlzLmNoaWxkcmVuWyBpIF07XHJcblx0XHRcdFx0Ly9vYmplY3QuY2hpbGRyZW4ucHVzaCggY2hpbGQuc3RhbmRhcmRfc2VyaWFsaXphdGlvbiggbWV0YSApICk7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuY2hpbGRyZW4ucHVzaCggY2hpbGQudG9KU09OKCBtZXRhICkgKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBjb2xsZWN0X21hdGVyaWFsczogZnVuY3Rpb24gKG1ldGEpIFxyXG4gICAge1xyXG5cdFx0aWYgKCB0aGlzLm1hdGVyaWFsICE9PSB1bmRlZmluZWQgICYmICBtZXRhLm1hdGVyaWFsc1sgdGhpcy5tYXRlcmlhbC51dWlkIF0gPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgIG1ldGEubWF0ZXJpYWxzWyB0aGlzLm1hdGVyaWFsLnV1aWQgXSA9IHRoaXMubWF0ZXJpYWwudG9KU09OKCBtZXRhKTtcclxuXHRcdH1cclxuICAgICAgICBcclxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpICsrICkge1xyXG5cdFx0XHR0aGlzLmNoaWxkcmVuWyBpIF0uY29sbGVjdF9tYXRlcmlhbHMobWV0YSk7XHJcblx0XHR9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBjb2xsZWN0X2dlb21ldHJ5OiBmdW5jdGlvbiAobWV0YSlcclxuICAgIHtcclxuXHRcdGlmICggdGhpcy5nZW9tZXRyeSAhPT0gdW5kZWZpbmVkICYmIG1ldGEuZ2VvbWV0cmllc1sgdGhpcy5nZW9tZXRyeS51dWlkIF0gPT09IHVuZGVmaW5lZCApIHtcclxuXHRcdFx0XHRtZXRhLmdlb21ldHJpZXNbIHRoaXMuZ2VvbWV0cnkudXVpZCBdID0gdGhpcy5nZW9tZXRyeS50b0pTT04oIG1ldGEgKTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcclxuXHRcdFx0dGhpcy5jaGlsZHJlblsgaSBdLmNvbGxlY3RfZ2VvbWV0cnkobWV0YSk7XHJcblx0XHR9XHJcbiAgICB9LFxyXG4gICAgXHJcblx0dG9KU09OMTogZnVuY3Rpb24gKCBtZXRhICkge1xyXG4gICAgXHJcblx0XHQvLyBleHRyYWN0IGRhdGEgZnJvbSB0aGUgY2FjaGUgaGFzaFxyXG5cdFx0Ly8gcmVtb3ZlIG1ldGFkYXRhIG9uIGVhY2ggaXRlbVxyXG5cdFx0Ly8gYW5kIHJldHVybiBhcyBhcnJheVxyXG5cdFx0ZnVuY3Rpb24gZXh0cmFjdEZyb21DYWNoZSggY2FjaGUsIHQgKSB7XHJcblx0XHRcdHZhciB2YWx1ZXMgPSBbXTtcclxuXHRcdFx0Zm9yICggdmFyIGtleSBpbiBjYWNoZSApIHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IGNhY2hlWyBrZXkgXTtcclxuXHRcdFx0XHRkZWxldGUgZGF0YS5tZXRhZGF0YTtcclxuXHRcdFx0XHR2YWx1ZXMucHVzaCggZGF0YSApO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB2YWx1ZXM7XHJcblx0XHR9XHJcbiAgICBcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXhXb3JsZCh0cnVlKTtcclxuICAgICAgICBcclxuXHRcdC8vIG1ldGEgaXMgJycgd2hlbiBjYWxsZWQgZnJvbSBKU09OLnN0cmluZ2lmeVxyXG5cdFx0dmFyIGlzUm9vdE9iamVjdCA9ICggbWV0YSA9PT0gdW5kZWZpbmVkIHx8IG1ldGEgPT09ICcnICk7XHJcblxyXG5cdFx0dmFyIG91dHB1dCA9IHt9O1xyXG5cclxuXHRcdGlmICggaXNSb290T2JqZWN0ICkge1xyXG5cclxuICAgICAgICAgICAgbWV0YSA9IHtcclxuXHRcdFx0XHRnZW9tZXRyaWVzOiB7fSxcclxuXHRcdFx0XHRtYXRlcmlhbHM6IHt9LFxyXG5cdFx0XHRcdHRleHR1cmVzOiB7fSxcclxuXHRcdFx0XHRpbWFnZXM6IHt9XHJcblx0XHRcdH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy90aGlzLmNvbGxlY3RfbWF0ZXJpYWxzKG1ldGEpO1xyXG4gICAgICAgICAgICAvL3RoaXMuY29sbGVjdF9nZW9tZXRyeShtZXRhKTtcclxuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHRoaXMuc3RhbmRhcmRfc2VyaWFsaXphdGlvbihtZXRhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cdFx0XHRvdXRwdXQubWV0YWRhdGEgPSB7XHJcblx0XHRcdFx0dmVyc2lvbjogNC40LFxyXG5cdFx0XHRcdHR5cGU6ICdPYmplY3QnLFxyXG5cdFx0XHRcdGdlbmVyYXRvcjogJ09iamVjdDNELnRvSlNPTidcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBnZW9tZXRyaWVzID0gZXh0cmFjdEZyb21DYWNoZSggbWV0YS5nZW9tZXRyaWVzLCBcImdlb2ltXCIgKTtcclxuXHRcdFx0dmFyIG1hdGVyaWFscyA9IGV4dHJhY3RGcm9tQ2FjaGUoIG1ldGEubWF0ZXJpYWxzLCBcIm1hdGVyaWFsc1wiICk7XHJcblx0XHRcdHZhciB0ZXh0dXJlcyA9IGV4dHJhY3RGcm9tQ2FjaGUoIG1ldGEudGV4dHVyZXMsIFwidGV4dHVyZXNcIiApO1xyXG5cdFx0XHR2YXIgaW1hZ2VzID0gZXh0cmFjdEZyb21DYWNoZSggbWV0YS5pbWFnZXMsIFwiaW1hZ2VzXCIgKTtcclxuXHJcblx0XHRcdGlmICggZ2VvbWV0cmllcy5sZW5ndGggPiAwICkgb3V0cHV0Lmdlb21ldHJpZXMgPSBnZW9tZXRyaWVzO1xyXG5cdFx0XHRpZiAoIG1hdGVyaWFscy5sZW5ndGggPiAwICkgb3V0cHV0Lm1hdGVyaWFscyA9IG1hdGVyaWFscztcclxuXHRcdFx0aWYgKCB0ZXh0dXJlcy5sZW5ndGggPiAwICkgb3V0cHV0LnRleHR1cmVzID0gdGV4dHVyZXM7XHJcblx0XHRcdGlmICggaW1hZ2VzLmxlbmd0aCA+IDAgKSBvdXRwdXQuaW1hZ2VzID0gaW1hZ2VzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFuaW1zID0gdGhpcy5jb2xsZWN0X2FuaW1hdGlvbnModGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChhbmltcy5jb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dFtcIm15YW5pbWF0aW9uc1wiXSA9IGFuaW1zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG91dHB1dC5vYmplY3QgPSBvYmplY3Q7XHJcblx0XHR9IGVsc2Uge1xyXG4gICAgICAgICAgICBvdXRwdXQub2JqZWN0ID0gdGhpcy5zdGFuZGFyZF9zZXJpYWxpemF0aW9uKG1ldGEpO1xyXG4gICAgICAgICAgICBvdXRwdXQudHlwZSA9IHRoaXMudHlwZTtcclxuICAgICAgICAgICAgaWYgKG91dHB1dC5vYmplY3QgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpIGFtIHVuZGVmaW5lZFwiLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblx0XHRyZXR1cm4gb3V0cHV0O1xyXG5cclxuXHJcblx0fSxcclxuICAgIFxyXG4gICAgY29sbGVjdF9hbmltYXRpb25zOiBmdW5jdGlvbiAoc2NlbmUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnMgOiB7fSxcclxuICAgICAgICAgICAgYmluZGluZ3MgOiBbXSxcclxuICAgICAgICAgICAgY291bnQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbGxlY3RfYW5pbWF0aW9uc19yZWN1cnNpdmUocm9vdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChyb290LmFuaW1hdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9MDsgaSA8IHJvb3QuYW5pbWF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbmltID0gcm9vdC5hbmltYXRpb25zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmFuaW1hdGlvbnNbIGFuaW0udXVpZCBdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hbmltYXRpb25zWyBhbmltLnV1aWRdID0gYW5pbS50b0pTT04oKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBiaW5kID0ge307XHJcbiAgICAgICAgICAgICAgICBiaW5kLnV1aWQgPSByb290LnV1aWRcclxuICAgICAgICAgICAgICAgIGJpbmQuYW5pbWF0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0wOyBpIDwgcm9vdC5hbmltYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluZC5hbmltYXRpb25zLnB1c2goIHJvb3QuYW5pbWF0aW9uc1tpXS51dWlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRhdGEuYmluZGluZ3MucHVzaChiaW5kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJvb3QuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCByb290LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdF9hbmltYXRpb25zX3JlY3Vyc2l2ZSggcm9vdC5jaGlsZHJlbltpXSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbGxlY3RfYW5pbWF0aW9uc19yZWN1cnNpdmUoc2NlbmUpO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSxcclxuICAgIFxyXG4gXHJcbn07XHJcblxyXG5cclxuICBfLmNvcHlfb2JqZWN0KFRIUkVFLk9iamVjdDNELnByb3RvdHlwZSwgT2JqZWN0M0RfU2VyaWFsaXphdGlvbl9NaXhpbik7XHJcbiAgXHJcblRIUkVFLk9iamVjdDNELnByb3RvdHlwZS5kbV9tYXJrID0gJ3llcyx0aGlzIG9iamVjdCBoYXMgYmVlbiBtYXJrZWQgYnkgYmxhY2sgbWFnaWMsIG93bmVkIGJ5IG1lLCBkYXJrIG1hdHRlcnMnOyBcclxuXHJcbi8vcmVwbGFjZSBzb3VyY2Ugd2l0aCB0aGlzXHJcblRIUkVFLk9iamVjdDNELnByb3RvdHlwZS5yZXBsYWNlX29iamVjdF93aXRoX3RoaXMgPSBmdW5jdGlvbiAoIHNvdXJjZSApIHtcclxuXHJcbiAgICB0aGlzLnV1aWQgPSBzb3VyY2UudXVpZDtcclxuICAgIHRoaXMubmFtZSA9IHNvdXJjZS5uYW1lO1xyXG5cclxuICAgIHRoaXMudXAuY29weSggc291cmNlLnVwICk7XHJcbiAgICB0aGlzLnBvc2l0aW9uLmNvcHkoIHNvdXJjZS5wb3NpdGlvbiApO1xyXG4gICAgdGhpcy5xdWF0ZXJuaW9uLmNvcHkoIHNvdXJjZS5xdWF0ZXJuaW9uICk7XHJcbiAgICB0aGlzLnNjYWxlLmNvcHkoIHNvdXJjZS5zY2FsZSApO1xyXG5cclxuICAgIHRoaXMubWF0cml4LmNvcHkoIHNvdXJjZS5tYXRyaXggKTtcclxuICAgIHRoaXMubWF0cml4V29ybGQuY29weSggc291cmNlLm1hdHJpeFdvcmxkICk7XHJcblxyXG4gICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gc291cmNlLm1hdHJpeEF1dG9VcGRhdGU7XHJcbiAgICB0aGlzLm1hdHJpeFdvcmxkTmVlZHNVcGRhdGUgPSBzb3VyY2UubWF0cml4V29ybGROZWVkc1VwZGF0ZTtcclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSBzb3VyY2UudmlzaWJsZTtcclxuXHJcbiAgICB0aGlzLmNhc3RTaGFkb3cgPSBzb3VyY2UuY2FzdFNoYWRvdztcclxuICAgIHRoaXMucmVjZWl2ZVNoYWRvdyA9IHNvdXJjZS5yZWNlaXZlU2hhZG93O1xyXG5cclxuICAgIHRoaXMuZnJ1c3R1bUN1bGxlZCA9IHNvdXJjZS5mcnVzdHVtQ3VsbGVkO1xyXG4gICAgdGhpcy5yZW5kZXJPcmRlciA9IHNvdXJjZS5yZW5kZXJPcmRlcjtcclxuXHJcbiAgICB0aGlzLnVzZXJEYXRhID0gSlNPTi5wYXJzZSggSlNPTi5zdHJpbmdpZnkoIHNvdXJjZS51c2VyRGF0YSApICk7XHJcblxyXG4gICAgLy9jb3B5IGFycmF5IG9mIGNoaWxkcmVuLCBub3QgY2xvbmVcclxuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHNvdXJjZS5jaGlsZHJlbi5sZW5ndGg7IGkgKysgKSB7XHJcbiAgICAgICAgdGhpcy5hZGQoIHNvdXJjZS5jaGlsZHJlblsgaSBdICk7XHJcbiAgICB9XHJcbiAgICBzb3VyY2UucGFyZW50LmFkZCh0aGlzKTtcclxuICAgIHNvdXJjZS5wYXJlbnQucmVtb3ZlKHNvdXJjZSk7XHJcbiAgICBcclxuICAgIHRoaXMuYW5pbWF0aW9ucyA9IHNvdXJjZS5hbmltYXRpb25zO1xyXG59XHJcblxyXG5cclxufVxyXG5cclxuTWl4X0l0KCk7XHJcblxyXG5leHBvcnQge01peF9JdH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWl4aW5zL3RocmVlanNfbWl4aW5zLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0FmZmVjdG9yfSBmcm9tICcuL3BhcnRpY2xlX2FmZmVjdG9yLmpzJztcclxuXHJcbmZ1bmN0aW9uIEN1c3RvbV9BZmZlY3RvcigpXHJcbntcclxuXHRQYXJ0aWNsZV9BZmZlY3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5jdXN0b21fZnVuYyA9IGZ1bmN0aW9uIGR1bW15ICgpIHtyZXR1cm4gdHJ1ZTt9O1xyXG59XHJcblxyXG5cclxuQ3VzdG9tX0FmZmVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlKTtcclxuXHJcbl8uY29weV9vYmplY3QoQ3VzdG9tX0FmZmVjdG9yLnByb3RvdHlwZSwgXHJcbiAgICB7XHJcbiAgICBjb25zdHJ1Y3RvcjogQ3VzdG9tX0FmZmVjdG9yLFxyXG4gICBcdGFmZmVjdDogZnVuY3Rpb24gKGR0LCBwZGF0YSwgdmVydClcclxuXHR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tX2Z1bmMoZHQsIHAsIHZlcnQpO1xyXG5cdH0sXHJcbiAgICB0ZXN0X2Z1bmM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcCA9IHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcclxuICAgICAgICAgICAgdmVsb2NpdHk6IHt4OiAwLCB5OiAwLCB6OiAwfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNvbG9yID0ge3I6IDAsIGc6IDAsIGI6IDB9O1xyXG4gICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMocCwgY29sb3IpO1xyXG4gICAgfSxcclxuICAgIHNldF9hZmZlY3RfZnVuY3Rpb246IGZ1bmN0aW9uIChzb3VyY2UpIHsgICAgXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21fZnVuYyA9IHNvdXJjZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzb3VyY2UgID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21fZnVuYyA9IG5ldyBGdW5jdGlvbiAoJ2R0LHAsdmVydCcsIHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RfZnVuYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zb3VyY2VfY29kZSA9IHNvdXJjZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcblx0dG9KU09OOiBmdW5jdGlvbiAoKVxyXG5cdHtcclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgbmFtZTogXCJDdXN0b21fQWZmZWN0b3JcIlxyXG4gICAgICAgIH07XHJcblx0XHRkYXRhLnBhcmFtcyA9IE15X0xpYi5QYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdGhpcyk7XHJcblx0XHRwYXJhbXNbXCJzb3VyY2VfY29kZVwiXSA9IHRoaXMuc291cmNlX2NvZGU7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9LFxyXG5cdHBhcnNlOiBmdW5jdGlvbiAoanNvbilcclxuXHR7XHJcblx0XHRNeV9MaWIuUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnBhcnNlKHRoaXMsIGpzb24pO1xyXG5cdFx0dGhpcy5zZXRfYWZmZWN0X2Z1bmMoanNvbi5zb3VyY2VfY29kZSk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJDdXN0b21fQWZmZWN0b3JcIiwgQ3VzdG9tX0FmZmVjdG9yKTtcclxuXHJcbmV4cG9ydCB7Q3VzdG9tX0FmZmVjdG9yfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wYXJ0aWNsZXMvY3VzdG9tX2FmZmVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0VtaXR0ZXJ9IGZyb20gJy4vcGFydGljbGVfZW1pdHRlci5qcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gQ3VzdG9tX0VtaXR0ZXIoKVxyXG57XHJcblx0UGFydGljbGVfRW1pdHRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5cclxuQ3VzdG9tX0VtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZSk7XHJcblxyXG52YXIgbWV0aG9kcyA9IHtcclxuICAgIGVtaXQ6IGZ1bmN0aW9uIChwLCBjb2xvcikge1xyXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbV9mdW5jKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMocCwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0ZXN0X2Z1bmM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcCA9IHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcclxuICAgICAgICAgICAgdmVsb2NpdHk6IHt4OiAwLCB5OiAwLCB6OiAwfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNvbG9yID0ge3I6IDAsIGc6IDAsIGI6IDB9O1xyXG4gICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMocCwgY29sb3IpO1xyXG4gICAgfSxcclxuICAgIHNldF9lbWl0X2Z1bmN0aW9uOiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21fZnVuYyA9IHNvdXJjZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzb3VyY2UgID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21fZnVuYyA9IG5ldyBGdW5jdGlvbiAoJ3AnLCAnY29sb3InLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0X2Z1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbV9mdW5jID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlX2NvZGUgPSBzb3VyY2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRvSlNPTjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgZGF0YS5uYW1lID0gXCJDdXN0b21fRW1pdHRlclwiO1xyXG4gICAgICAgIGRhdGEucGFyYW1zID0gTXlfTGliLlBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMsIHRoaXMpO1xyXG4gICAgICAgIGlmICh0aGlzLnNvdXJjZV9jb2RlKSB7XHJcbiAgICAgICAgICAgIGRhdGEucGFyYW1zLnNvdXJjZV9jb2RlID0gdGhpcy5zb3VyY2VfY29kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9LFxyXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgTXlfTGliLlBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnBhcnNlLmNhbGwodGhpcywgZGF0YSk7ICAgICAgICBcclxuICAgICAgICB0aGlzLnNldF9lbWl0X2Z1bmN0aW9uIChkYXRhLnNvdXJjZV9jb2RlKTtcclxuICAgIH0sXHJcbiAgICBjb25zdHJ1Y3RvcjogQ3VzdG9tX0VtaXR0ZXIsXHJcbn07XHJcblxyXG5fLmNvcHlfb2JqZWN0KEN1c3RvbV9FbWl0dGVyLnByb3RvdHlwZSwgbWV0aG9kcyk7XHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIkN1c3RvbV9FbWl0dGVyXCIsIEN1c3RvbV9FbWl0dGVyKTtcclxuXHJcblxyXG5mdW5jdGlvbiB0ZXN0KClcclxue1xyXG4gICAgdmFyIHQgPSBuZXcgQ3VzdG9tX0VtaXR0ZXIoKTtcclxuICAgIHZhciBzb3VyY2UgPSAncC5wb3NpdGlvbi56ID0gLTEwMDsgcC52ZWxvY2l0eS55ID0gMTAwOyc7XHJcbiAgICB0LnNldF9lbWl0X2Z1bmN0aW9uKHNvdXJjZSk7XHJcbiAgICB2YXIgcCA9IHtcclxuICAgICAgICB2ZWxvY2l0eToge3g6IDAsIHk6IDAsIHo6IDB9LFxyXG4gICAgICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH1cclxuICAgIH07XHJcbiAgICB0LmN1c3RvbV9mdW5jKHApO1xyXG4gICAgY29uc29sZS5sb2cocCk7XHJcbiAgICB2YXIganNvbiA9IHQudG9KU09OKCk7XHJcbiAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuICAgIFxyXG4gICAgdCA9IG5ldyBDdXN0b21fRW1pdHRlcigpO1xyXG4gICAgdC5wYXJzZShqc29uLnBhcmFtcyk7XHJcbiAgICAvL2NvbnNvbGUubG9nKHQuY3VzdG9tX2Z1bmMpOyAgICBcclxufVxyXG5cclxuLy90ZXN0KCk7XHJcblxyXG4vKlxyXG5DdXN0b21fRW1pdHRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE15X0xpYi5QYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZSk7XHJcbkN1c3RvbV9FbWl0dGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbmVfRW1pdHRlcjtcclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiQ3VzdG9tX0VtaXR0ZXJcIiwgQ29uZV9FbWl0dGVyKTtcclxuKi9cclxuXHJcbmV4cG9ydCB7Q3VzdG9tX0VtaXR0ZXJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhcnRpY2xlcy9jdXN0b21fZW1pdHRlci5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuXHJcbnZhciBQYXJ0aWNsZV9Gb3JjZXMgPSB7fTtcclxuXHJcbi8vYmFzZSBjbGFzc1xyXG5QYXJ0aWNsZV9Gb3JjZXMuRm9yY2UgPSBmdW5jdGlvbiAoKVxyXG57XHJcbn1cclxuXHJcblxyXG5fLmNvcHlfb2JqZWN0KFBhcnRpY2xlX0ZvcmNlcy5Gb3JjZS5wcm90b3R5cGUse1xyXG5cdFx0Y2FsYzogZnVuY3Rpb24gKGR0LCBwYXJ0aWNsZSwgYWNjZWxlcmF0aW9uKSBcclxuXHRcdHtcclxuXHRcdH0sXHJcblx0XHR0b0pTT046IGZ1bmN0aW9uIChjaGlsZCkgXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiB7fTtcclxuXHRcdH0sXHJcblx0XHRwYXJzZTogZnVuY3Rpb24gKGpzb24pIFxyXG5cdFx0e1xyXG5cdFx0fSxcclxufSk7XHJcblxyXG4vL2NvbnN0YW50IGZvcmNlXHJcblBhcnRpY2xlX0ZvcmNlcy5Db25zdGFudF9Gb3JjZSA9IGZ1bmN0aW9uIChmb3JjZSlcclxue1xyXG5cdGlmICh0eXBlb2YgZm9yY2UgIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHR0aGlzLmZvcmNlID0gZm9yY2U7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRoaXMuZm9yY2UgPSB7eDowLCB5OjAsIHo6MH07XHJcblx0fVxyXG59XHJcblxyXG5QYXJ0aWNsZV9Gb3JjZXMuQ29uc3RhbnRfRm9yY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZV9Gb3JjZXMuRm9yY2UucHJvdG90eXBlKTtcclxuXy5jb3B5X29iamVjdChQYXJ0aWNsZV9Gb3JjZXMuQ29uc3RhbnRfRm9yY2UucHJvdG90eXBlLCB7XHJcblx0Y29uc3RydWN0b3I6IFBhcnRpY2xlX0ZvcmNlcy5Db25zdGFudF9Gb3JjZSxcclxuXHRjYWxjOiBmdW5jdGlvbiAoZHQsIHAsIGFjY2VsZXJhdGlvbikgXHJcblx0e1xyXG5cdFx0YWNjZWxlcmF0aW9uLnggKz0gdGhpcy5mb3JjZS54O1xyXG5cdFx0YWNjZWxlcmF0aW9uLnkgKz0gdGhpcy5mb3JjZS55O1xyXG5cdFx0YWNjZWxlcmF0aW9uLnogKz0gdGhpcy5mb3JjZS56O1xyXG5cdH0sXHJcblx0dG9KU09OOiBmdW5jdGlvbiAoY2hpbGQpXHJcblx0e1xyXG5cdFx0dmFyIGRhdGEgPSB7fTtcclxuXHRcdGRhdGEubmFtZSA9IFwiQ29uc3RhbnRfRm9yY2VcIjtcclxuXHRcdGRhdGEuZm9yY2UgPSBfLmNyZWF0ZV9jbG9uZV9vYmplY3QodGhpcy5mb3JjZSk7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9LFxyXG5cdHBhcnNlOiBmdW5jdGlvbiAoanNvbilcclxuXHR7XHRcclxuXHRcdGlmIChqc29uLmZvcmNlKSB7XHJcblx0XHRcdF8uY29weV9vYmplY3QodGhpcy5mb3JjZSwganNvbi5mb3JjZSk7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIkNvbnN0YW50X0ZvcmNlXCIsIFBhcnRpY2xlX0ZvcmNlcy5Db25zdGFudF9Gb3JjZSk7XHJcblxyXG5leHBvcnQge1BhcnRpY2xlX0ZvcmNlc307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFydGljbGVzL2ZvcmNlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuaW1wb3J0IHtQb2ludF9HZW5lcmF0b3JzfSBmcm9tICcuL3BvaW50X2dlbmVyYXRvcnMuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0VtaXR0ZXJ9IGZyb20gJy4vcGFydGljbGVfZW1pdHRlci5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVfQWZmZWN0b3J9IGZyb20gJy4vcGFydGljbGVfYWZmZWN0b3IuanMnO1xyXG5cclxuZnVuY3Rpb24gIENvbmVfRW1pdHRlcigpXHJcbntcclxuXHRQYXJ0aWNsZV9FbWl0dGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0dGhpcy5nZW5lcmF0b3IgPSBuZXcgUG9pbnRfR2VuZXJhdG9ycy5SYW5kb21fRGlyZWN0aW9uKCk7XHJcblx0dGhpcy5vcmlnaW4gPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAwKTtcclxuXHR0aGlzLnZlbG9jaXR5ID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCk7XHJcblx0dGhpcy5kaXNwZXJzaW9uID0ge1wibWluXCI6IDUsIFwibWF4XCI6IDEwfTtcclxuXHR0aGlzLmRpc3BlcnNpb24uZGVsdGEgPSA1O1xyXG5cdHRoaXMuc3BlZWQgPSB7bWluOiA1LCBtYXg6IDEwLCBkZWx0YTo1fTtcclxuXHR0aGlzLmNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKDEsIDEsIDEpO1xyXG59XHJcblxyXG5Db25lX0VtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZSk7XHJcbkNvbmVfRW1pdHRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb25lX0VtaXR0ZXI7XHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIkNvbmVfRW1pdHRlclwiLCBDb25lX0VtaXR0ZXIpO1xyXG5cclxuQ29uZV9FbWl0dGVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKVxyXG57XHJcblx0dmFyIGRhdGEgPSB7fTtcclxuXHRkYXRhLm5hbWUgPSBcIkNvbmVfRW1pdHRlclwiO1xyXG5cdGRhdGEucGFyYW1zID0gUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdGhpcyk7XHJcblx0Xy5jbG9uZV9maWVsZF9saXN0X29uZV9sZXZlbF9yZWN1cnNpb24odGhpcywgZGF0YS5wYXJhbXMsIFxyXG5cdFtcIm9yaWdpblwiLCBcclxuXHRcInZlbG9jaXR5XCIsIFxyXG5cdFwiZGlzcGVyc2lvblwiLFxyXG5cdFwic3BlZWRcIl0pO1xyXG5cdFxyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5Db25lX0VtaXR0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKGRhdGEpXHJcbntcclxuXHRQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS5wYXJzZS5jYWxsKHRoaXMsIGRhdGEpO1xyXG5cdHRoaXMub3JpZ2luLmNvcHkoZGF0YS5vcmlnaW4pO1xyXG5cdHRoaXMudmVsb2NpdHkuY29weShkYXRhLnZlbG9jaXR5KTtcclxuXHR0aGlzLnNldF9kaXNwZXJzaW9uKGRhdGEuZGlzcGVyc2lvbi5taW4sIGRhdGEuZGlzcGVyc2lvbi5tYXgpO1xyXG5cdHRoaXMuc2V0X3NwZWVkKGRhdGEuc3BlZWQubWluLCBkYXRhLnNwZWVkLm1heCk7XHJcbn1cclxuXHJcbkNvbmVfRW1pdHRlci5wcm90b3R5cGUuc2V0X3NwZWVkID0gZnVuY3Rpb24gKG1pbiwgbWF4KVxyXG57XHJcblx0dGhpcy5zcGVlZC5taW4gPSBtaW47XHJcblx0dGhpcy5zcGVlZC5tYXggPSBtYXg7XHJcblx0dGhpcy5zcGVlZC5kZWx0YSA9IG1heCAtIG1pbjtcclxufVxyXG5cclxuXHJcbkNvbmVfRW1pdHRlci5wcm90b3R5cGUuc2V0X2Rpc3BlcnNpb24gPSBmdW5jdGlvbiAobWluLCBtYXgpXHJcbntcclxuXHR0aGlzLmRpc3BlcnNpb24ubWluID0gbWluO1xyXG5cdHRoaXMuZGlzcGVyc2lvbi5tYXggPSBtYXg7XHJcblx0dGhpcy5kaXNwZXJzaW9uLmRlbHRhID0gbWF4IC0gbWluO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5Db25lX0VtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAocCwgY29sb3IsIG1hdHJpeClcclxue1xyXG5cdHAucG9zaXRpb24uY29weSh0aGlzLm9yaWdpbik7XHJcblx0XHJcblx0dGhpcy5nZW5lcmF0b3IuZ2V0X2RpcmVjdGlvbihwLnZlbG9jaXR5KTtcclxuXHRwLnZlbG9jaXR5Lm11bHRpcGx5U2NhbGFyKE1hdGgucmFuZG9tKCkqdGhpcy5kaXNwZXJzaW9uLmRlbHRhICsgdGhpcy5kaXNwZXJzaW9uLm1pbik7XHRcclxuXHRwLnZlbG9jaXR5LmFkZCh0aGlzLnZlbG9jaXR5KS5ub3JtYWxpemUoKTtcclxuXHRcclxuICAgIGlmIChtYXRyaXgpIHtcclxuICAgICAgICBwLnBvc2l0aW9uLmFwcGx5TWF0cml4NChtYXRyaXgpO1xyXG4gICAgICAgIHAudmVsb2NpdHkuYXBwbHlNYXRyaXg0X3JvdGF0aW9uKG1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcblx0cC52ZWxvY2l0eS5tdWx0aXBseVNjYWxhcihNYXRoLnJhbmRvbSgpKnRoaXMuc3BlZWQuZGVsdGEgKyB0aGlzLnNwZWVkLm1pbik7XHRcclxuXHRcclxuICAgIFxyXG5cdGlmIChjb2xvcikge1xyXG5cdFx0dGhpcy5lbWl0X2NvbG9yKGNvbG9yKTtcclxuXHR9XHJcbiAgICBcclxufVxyXG5cclxuQ29uZV9FbWl0dGVyLnByb3RvdHlwZS5lbWl0X2NvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSBcclxue1xyXG5cdGNvbG9yLmNvcHkodGhpcy5jb2xvcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNwaGVyZV9FbWl0dGVyKHJhZGl1cywgc3BlZWQpXHJcbntcclxuXHRQYXJ0aWNsZV9FbWl0dGVyLmNhbGwodGhpcyk7XHJcblx0dGhpcy5yYWRpdXMgPSByYWRpdXMgfHwgMTtcclxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZCB8fCAxO1xyXG5cdHRoaXMuZ2VuZXJhdG9yID0gbmV3IFBvaW50X0dlbmVyYXRvcnMuU3BoZXJlKHJhZGl1cyk7XHJcbiAgICB0aGlzLmZyb21fY2VudGVyID0gdHJ1ZTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmFkaXVzJywge1xyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7IHJhZGl1cyA9IHZhbHVlOyBnZW5lcmF0b3IucmFkaXVzID0gdmFsdWU7fVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblNwaGVyZV9FbWl0dGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUpO1xyXG5cclxuXy5jb3B5X29iamVjdChTcGhlcmVfRW1pdHRlci5wcm90b3R5cGUsIHtcclxuICAgIGNvbnN0cnVjdG9yOiBTcGhlcmVfRW1pdHRlcixcclxuICAgIGVtaXQ6IGZ1bmN0aW9uIChwLCBjb2xvciwgbWF0cml4KVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmZyb21fY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHAucG9zaXRpb24uc2V0KDAsMCwwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRvci5nZXRfcG9pbnQocC5wb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2VuZXJhdG9yLmdldF9ub3JtYWwocC52ZWxvY2l0eSk7XHJcbiAgICAgICAgaWYgKG1hdHJpeCkge1xyXG4gICAgICAgICAgICBwLnBvc2l0aW9uLmFwcGx5TWF0cml4NChtYXRyaXgpO1xyXG4gICAgICAgICAgICBwLnZlbG9jaXR5LmFwcGx5TWF0cml4NF9yb3RhdGlvbihtYXRyaXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwLnZlbG9jaXR5Lm11bHRpcGx5U2NhbGFyKHRoaXMuc3BlZWQpO1xyXG4gICAgfSxcclxuICAgIHRvSlNPTjogZnVuY3Rpb24gKGpzb24pIHtcclxuXHRcdHZhciBwYXJhbXMgPSBQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS50b0pTT04uY2FsbCh0aGlzLCB0aGlzKTtcclxuICAgICAgICBwYXJhbXMucmFkaXVzID0gdGhpcy5yYWRpdXM7XHJcbiAgICAgICAgcGFyYW1zLnNwZWVkID0gdGhpcy5zcGVlZDtcclxuICAgICAgICAvL3BhcmFtcy5nZW5lcmF0b3IucmFkaXVzID0gdGhpcy5yYWRpdXM7XHJcbiAgICB9LFxyXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChqc29uKSB7XHJcblx0XHRQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS5wYXJzZS5jYWxsKHRoaXMsIGpzb24pO1xyXG4gICAgICAgIHRoaXMucmFkaXVzID0ganNvbi5yYWRpdXM7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IGpzb24uc3BlZWQ7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiU3BoZXJlX0VtaXR0ZXJcIiwgU3BoZXJlX0VtaXR0ZXIpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIFN0YXJfRHVzdF9FbWl0dGVyICgpXHJcbntcclxuXHRQYXJ0aWNsZV9FbWl0dGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0dGhpcy5zdGFydF9wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApO1xyXG5cdHRoaXMuZW5kX3Bvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMSk7XHJcblx0dGhpcy5kZWx0YSA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpO1x0XHJcblx0dGhpcy52ZWxvY2l0eSA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDEpO1xyXG59XHJcblxyXG5TdGFyX0R1c3RfRW1pdHRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlKTtcclxuU3Rhcl9EdXN0X0VtaXR0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3Rhcl9EdXN0X0VtaXR0ZXI7XHJcbl8uY29weV9vYmplY3QoIFN0YXJfRHVzdF9FbWl0dGVyLnByb3RvdHlwZSx7XHJcblx0c2V0X3ZlbG9jaXR5OiBmdW5jdGlvbiAoeCx5LCB6KSBcclxuXHR7XHJcblx0XHR0aGlzLnZlbG9jaXR5LnNldCh4LCB5LCB6KTtcclxuXHR9LFxyXG5cdHNldF9wb3NpdGlvbl9yYW5nZSA6IGZ1bmN0aW9uIChzdGFydCwgZW5kKVxyXG5cdHtcclxuXHRcdHRoaXMuc3RhcnRfcG9zaXRpb24uY29weShzdGFydCk7XHJcblx0XHR0aGlzLmVuZF9wb3NpdGlvbi5jb3B5KGVuZCk7XHJcblx0XHR0aGlzLmRlbHRhLnNldChlbmQueCAtIHN0YXJ0LngsIGVuZC55LXN0YXJ0LnksIGVuZC56LXN0YXJ0LnopO1xyXG5cdFx0XHJcblx0fSxcclxuXHRnZXRfcG9zaXRpb246IGZ1bmN0aW9uICh2ZWN0b3IpXHJcblx0e1xyXG5cdFx0dmVjdG9yLnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5kZWx0YS54ICsgdGhpcy5zdGFydF9wb3NpdGlvbi54O1xyXG5cdFx0dmVjdG9yLnkgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5kZWx0YS55ICsgdGhpcy5zdGFydF9wb3NpdGlvbi55O1xyXG5cdFx0dmVjdG9yLnogPSBNYXRoLnJhbmRvbSgpICogdGhpcy5kZWx0YS56ICsgdGhpcy5zdGFydF9wb3NpdGlvbi56O1xyXG5cdH0sXHJcblx0Z2V0X3ZlbG9jaXR5OiBmdW5jdGlvbiAodmVjdG9yKVxyXG5cdHtcclxuXHRcdHZlY3Rvci54ID0gdGhpcy52ZWxvY2l0eS54O1xyXG5cdFx0dmVjdG9yLnkgPSB0aGlzLnZlbG9jaXR5Lnk7XHJcblx0XHR2ZWN0b3IueiA9IHRoaXMudmVsb2NpdHkuejtcclxuXHR9LFxyXG5cdGVtaXQ6IGZ1bmN0aW9uIChwKVxyXG5cdHtcclxuXHRcdHRoaXMuZ2V0X3Bvc2l0aW9uKHAucG9zaXRpb24pO1xyXG5cdFx0aWYgKHRoaXMucGFyZW50KSB7XHJcblx0XHRcdHRoaXMucGFyZW50LmxvY2FsVG9Xb3JsZChwLnBvc2l0aW9uKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZ2V0X3ZlbG9jaXR5KHAudmVsb2NpdHkpO1xyXG5cdH0sXHJcblx0dG9KU09OOiBmdW5jdGlvbiAoKVxyXG5cdHtcclxuXHRcdHZhciBwYXJhbXMgPSBQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS50b0pTT04uY2FsbCh0aGlzLCB0aGlzKTtcclxuXHRcdF8uY2xvbmVfZmllbGRfbGlzdF9vbmVfbGV2ZWxfcmVjdXJzaW9uKHRoaXMsIHBhcmFtcywgW1widmVsb2NpdHlcIiwgXHJcblx0XHRcInN0YXJ0X3Bvc2l0aW9uXCIsXHJcblx0XHRcImVuZF9wb3NpdGlvblwiXSlcclxuXHRcdHZhciBkYXRhID0ge1xyXG5cdFx0XHRcIm5hbWVcIjogXCJTdGFyX0R1c3RfRW1pdHRlclwiLFxyXG5cdFx0XHRcInBhcmFtc1wiOiBwYXJhbXMsXHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fSxcclxuXHRwYXJzZTogZnVuY3Rpb24gKGpzb24pXHJcblx0e1xyXG5cdFx0UGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUucGFyc2UuY2FsbCh0aGlzLCBqc29uKTtcclxuXHRcdHRoaXMuc2V0X3Bvc2l0aW9uX3JhbmdlKGpzb24uc3RhcnRfcG9zaXRpb24sIGpzb24uZW5kX3Bvc2l0aW9uKTtcclxuXHRcdHRoaXMudmVsb2NpdHkuY29weShqc29uLnZlbG9jaXR5KTtcclxuXHR9XHJcblx0XHJcbn0pO1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiU3Rhcl9EdXN0X0VtaXR0ZXJcIiwgU3Rhcl9EdXN0X0VtaXR0ZXIpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIFN0YXJfRHVzdF9BZmZlY3RvciAoZW5kKVxyXG57XHJcblx0dGhpcy5lbmQgPSBlbmQgfHwgMDtcclxufVxyXG5cclxuXHJcblN0YXJfRHVzdF9BZmZlY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcnRpY2xlX0FmZmVjdG9yLnByb3RvdHlwZSk7XHJcblN0YXJfRHVzdF9BZmZlY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdGFyX0R1c3RfQWZmZWN0b3I7XHJcblxyXG5fLmNvcHlfb2JqZWN0KFN0YXJfRHVzdF9BZmZlY3Rvci5wcm90b3R5cGUse1xyXG5cdGFmZmVjdDogZnVuY3Rpb24gKGR0LCBwZGF0YSwgdmVydClcclxuXHR7XHJcblx0XHRpZiAocGRhdGEucG9zaXRpb24ueiA+IHRoaXMuZW5kKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0sXHJcblx0dG9KU09OOiBmdW5jdGlvbiAoKVxyXG5cdHtcclxuXHRcdHZhciBwYXJhbXMgPSBQYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdGhpcyk7XHJcblx0XHRwYXJhbXNbXCJlbmRcIl0gPSB0aGlzLmVuZDtcclxuXHRcdHZhciBkYXRhID0ge1xyXG5cdFx0XHRcIm5hbWVcIjogXCJTdGFyX0R1c3RfQWZmZWN0b3JcIixcclxuXHRcdFx0XCJwYXJhbXNcIjogcGFyYW1zLFxyXG5cclxuXHRcdH07XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9LFxyXG5cdHBhcnNlOiBmdW5jdGlvbiAoanNvbilcclxuXHR7XHJcblx0XHRQYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUucGFyc2UodGhpcywganNvbik7XHJcblx0XHR0aGlzLmVuZCA9IGpzb24uZW5kO1xyXG5cdH1cclxufSk7XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJTdGFyX0R1c3RfQWZmZWN0b3JcIiwgU3Rhcl9EdXN0X0FmZmVjdG9yKTtcclxuXHJcbmV4cG9ydCB7Q29uZV9FbWl0dGVyLCBTdGFyX0R1c3RfRW1pdHRlciwgU3BoZXJlX0VtaXR0ZXIsIFN0YXJfRHVzdF9BZmZlY3Rvcn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFydGljbGVzL3Rlc3RfZW1pdHRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gJy4vYmFzZS9ldmVudF9odWIuanMnO1xyXG5cclxuZXhwb3J0IHtNeV9MaWJ9IGZyb20gJy4vYmFzZS9teV9saWIuanMnO1xyXG5cclxuZXhwb3J0IHtCYXNlX0FuaW1hdGlvbiwgRXVsZXJfQW5pbWF0aW9uLCBTY2FsZV9BbmltYXRpb259IGZyb20gJy4vYmFzZS9hbmltYXRpb25zLmpzJztcclxuZXhwb3J0IHtNb3VzZV9JbnRlcnNlY3Rvcn0gZnJvbSAnLi9iYXNlL21vdXNlX2ludGVyc2VjdG9yLmpzJztcclxuZXhwb3J0IHtNb3VzZV9DYW1lcmFfQ29udHJvbGxlcn0gZnJvbSAnLi9iYXNlL21vdXNlX2NhbWVyYV9jb250cm9sbGVyLmpzJztcclxuZXhwb3J0IHtMb2FkaW5nX01hbmFnZXJ9IGZyb20gJy4vYmFzZS9sb2FkaW5nX21hbmFnZXIuanMnO1xyXG5leHBvcnQge1BhY2thZ2VfTWFuYWdlcn0gZnJvbSAnLi9iYXNlL3BhY2thZ2VfbWFuYWdlci5qcyc7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQge1BhcnRpY2xlc19Qb2ludHN9IGZyb20gJy4vcGFydGljbGVzL3BhcnRpY2xlc19wb2ludHMuanMnO1xyXG5leHBvcnQge1BhcnRpY2xlX0VtaXR0ZXJ9IGZyb20gJy4vcGFydGljbGVzL3BhcnRpY2xlX2VtaXR0ZXIuanMnO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9Gb3JjZXN9IGZyb20gJy4vcGFydGljbGVzL2ZvcmNlcy5qcyc7XHJcblxyXG5leHBvcnQge1BhcnRpY2xlX0FmZmVjdG9yfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZV9hZmZlY3Rvci5qcyc7XHJcblxyXG5leHBvcnQge1BvaW50X0dlbmVyYXRvcnN9IGZyb20gJy4vcGFydGljbGVzL3BvaW50X2dlbmVyYXRvcnMuanMnO1xyXG5cclxuZXhwb3J0IHtDdXN0b21fRW1pdHRlcn0gZnJvbSAnLi9wYXJ0aWNsZXMvY3VzdG9tX2VtaXR0ZXIuanMnO1xyXG5cclxuZXhwb3J0IHtDdXN0b21fQWZmZWN0b3J9IGZyb20gJy4vcGFydGljbGVzL2N1c3RvbV9hZmZlY3Rvci5qcyc7XHJcblxyXG5leHBvcnQge0NvbmVfRW1pdHRlciwgU3Rhcl9EdXN0X0VtaXR0ZXIsIFNwaGVyZV9FbWl0dGVyLCBTdGFyX0R1c3RfQWZmZWN0b3J9IGZyb20gJy4vcGFydGljbGVzL3Rlc3RfZW1pdHRlcnMuanMnO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9TaGFkZXJzfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZV9zaGFkZXJzLmpzJztcclxuXHJcbmV4cG9ydCB7UGFydGljbGVfU3lzdGVtfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZXMuanMnO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9NYW5hZ2VyfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZXNfbWFuYWdlci5qcyc7XHJcblxyXG5leHBvcnQge1NjZW5lX1NlcmlhbGl6ZXJ9IGZyb20gJy4vYmFzZS9zY2VuZV9zZXJpYWxpemVyLmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi9taXhpbnMvdGhyZWVqc19taXhpbnMuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL21peGlucy9jYW1lcmFfbWl4aW4uanMnO1xyXG5cclxuZXhwb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSAnLi9hcHAvYXBwbGljYXRpb24uanMnO1xyXG5cclxuZXhwb3J0IHtDb2xvcl9Eb21haW4sIFRhYmxlX0NvbG9yfSBmcm9tICcuL3BhcnRpY2xlcy9jb2xvcl9kb21haW4uanMnO1xyXG5cclxuXHJcbmV4cG9ydCB7U2ltcGxlX0NvbGxpZGVyfSBmcm9tICcuL2Jhc2Uvc2ltcGxlX2NvbGxpZGVyLmpzJztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9lbmdpbmVfbWFpbl93ZWJwYWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9