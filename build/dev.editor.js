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

My_Lib.Object_Animation = function (object, animation) {
	this.object = object;
	this.animation = animation;
};

My_Lib.Object_Animation.prototype.update = function (dt) {
	this.animation(this.object, dt);
};

My_Lib.create_text_image = function (width, height, text, npot, background) {
	// create a canvas element
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext('2d');
	if (background) {
		context.fillStyle = background;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}
	context.font = "Bold 40px Arial";
	context.fillStyle = "rgba(0,255,0,0.95)";
	context.fillText('Hello, world!', 0, 50);

	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas);
	if (npot) {
		texture.wrapS = texture.wrapT = THREE.TextureWrapping.ClampToEdgeWrapping;
		texture.minFilter = THREE.LinearFilter;
	}
	texture.needsUpdate = true;
	return texture;
};

My_Lib.Create_Quad = function (width, height, vertex_shader, fragment_shader) {
	//plane created turn away from camera
	var plane = new THREE.PlaneBufferGeometry(width, height);

	var material = new THREE.ShaderMaterial({
		vertexShader: vertex_shader,
		fragmentShader: fragment_shader
	});

	var quad = new THREE.Mesh(plane, material);
	quad.rotation.y = Math.PI;
	return quad;
};

My_Lib.Render_Target = function (width, height) {
	this.target = new THREE.WebGLRenderTarget(width, height, {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBFormat
	});

	this.camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 1000);
};

My_Lib.Render_Target.prototype.render = function (scene, renderer) {
	renderer.render(scene, this.camera, this.target, true //forceClear
	);
};

My_Lib.create_overlay_camera = function (width, height) {
	var camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, -10000, 10000);
	return camera;
};

My_Lib.Overlay = function (width, height) {
	this.camera = My_Lib.create_overlay_camera(width, height);
};

My_Lib.Overlay.prototype.render = function (renderer) {
	if (!this.scene) {
		return;
	}

	renderer.autoClear = false;
	renderer.render(this.scene, this.camera);
	renderer.autoClear = true;
};

My_Lib.Mouse_Controller = function (root, over, click, callback) {
	this.root = root;
	this.over = over;
	this.click = !!click;
	this.callback = callback;
};

/*
ugly hack
*/

My_Lib.event_hub = new Event_Hub();

function Event_Hub() {
	this.events = {};
}

Event_Hub.prototype.add_event_listener = function (name, func, obj) {
	if (!this.events[name]) {
		this.events[name] = [];
	}
	this.events[name].push({ name: name, func: func, obj: obj });
};

Event_Hub.prototype.on = Event_Hub.prototype.add_event_listener;

Event_Hub.prototype.emit = function (name, obj) {
	var listeners = this.events[name];
	if (listeners) {
		for (var i = 0; i < listeners.length; i++) {
			var t = listeners[i];
			t.func.call(t.obj, obj);
		}
	}
};

var run_function = //window.requestAnimationFrame;
function (callback) {
	window.setTimeout(callback, 1000 / 60);
};

My_Lib.create_run_function = function (app) {
	My_Lib.run = function () {
		run_function(function () {
			app.loop();
		});
	};
};

My_Lib.Euler_Controller = function (obj, x, y, z) {
	this.obj = obj;
	this.xspeed = x * Math.PI / 180;;
	this.yspeed = y * Math.PI / 180;;
	this.zspeed = z * Math.PI / 180;;
};

My_Lib.Euler_Controller.prototype.update = function (dt) {
	this.obj.rotation.x += this.xspeed * dt;
	this.obj.rotation.y += this.yspeed * dt;
	this.obj.rotation.z += this.zspeed * dt;
};

//Class Library
My_Lib.Registered_Classes = {};

My_Lib.Register_Class = function (name, func) {
	if (My_Lib.Registered_Classes[name]) {
		console.log("Register Class ERROR! Class with this name already exists!", name);
	}
	My_Lib.Registered_Classes[name] = func;
};

My_Lib.Get_Class = function (name) {
	return My_Lib.Registered_Classes[name];
};

My_Lib.create_class = function (parent, child, props, name) {
	if (parent) {
		child.prototype = Object.create(parent.prototype);
	}
	_.copy_object(child.prototype, props);
	child.prototype.contructor = child;
	My_Lib.Register_Class(child, name);
};

My_Lib.Abstract_Fabric = function (data) {
	var constructor = My_Lib.Get_Class(data.type);
	if (constructor) {
		var object = new constructor();
		object.parse(data);
		return object;
	}
	return undefined;
};

My_Lib.Print_Classes = function () {
	for (var key in this.Registered_Classes) {
		console.log("class registered :", key, this.Registered_Classes[key]);
	}
};



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Affector; });
/* unused harmony export Force_Affector */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);


//base class for particle affector
function Particle_Affector() {
	this.id = _.generateUUID();
}

Particle_Affector.prototype.affect = function (dt, pdata, vert, color) {
	return true;
};

Particle_Affector.prototype.toJSON = function (child) {
	if (child) {
		return {};
	}
	var data = {
		id: this.id,
		"name": "Particle_Affector",
		params: {}
	};
	if (child) {
		return params;
	}
	return data;
};

Particle_Affector.prototype.parse = function (json) {};

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Particle_Affector", Particle_Affector);

function Force_Affector() {
	Particle_Affector.call(this);
	this.forces = new Array();
}

Force_Affector.prototype = Object.create(Particle_Affector.prototype);

_.copy_object(Force_Affector.prototype, {
	constructor: Force_Affector,
	add_force: function (force) {
		this.forces.push(force);
	},
	apply_forces: function (dt, particle, vert, color) {
		var acceleration = { x: 0, y: 0, z: 0 };
		for (var i = 0; i < this.forces.length; i++) {
			this.forces[i].calc(dt, particle, acceleration);
		}
		//integrate
		particle.velocity.x += acceleration.x * dt;
		particle.velocity.y += acceleration.y * dt;
		particle.velocity.z += acceleration.z * dt;
	},
	affect: function (dt, particle, vert, color) {
		this.apply_forces(dt, particle, vert, color);
		return true;
	},
	toJSON: function (child) {
		var data = {};
		data.name = "Force_Affector";
		data.uuid = this.uuid;
		data.params = Particle_Affector.prototype.toJSON.call(this, this);
		if (this.forces.length > 0) {
			data.params.forces = new Array();
			for (var i = 0; i < this.forces.length; i++) {
				data.params.forces.push(this.forces[i].toJSON());
			}
		}
		return data;
	},
	parse: function (json) {
		var f, item;
		if (json.forces) {

			for (var i = 0; i < json.forces.length; i++) {
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
function Particle_Emitter(emit_per_second) {
	this.uuid = _.generateUUID();
	this.name = '';
	this.emit_delta = 0;
	this.emit_count = 0;
	this.emit_per_second = emit_per_second || 5;
	//linear interpolation = min + random * (max-min)	
	this.lifetime = { "min": 0, "max": 2.0 };
}

Particle_Emitter.prototype.emit_life = function () {
	return this.lifetime.min + Math.random() * (this.lifetime.max - this.lifetime.min);
};

Particle_Emitter.prototype.calc_emitted_particles = function (dt) {
	//count particles need emit
	this.emit_delta += this.emit_per_second * dt;
	var need_emit = Math.floor(this.emit_delta);
	if (need_emit > 0) {
		this.emit_delta -= need_emit;
		//this.emit_count += need_emit;
		//need_emit = this.emit_count;
	}
	return need_emit;
};

Particle_Emitter.prototype.emit = function (p, c, matrix) {
	p.position.set(0, 0, 0);
	p.velocity.set(0, 1, 0);

	if (matrix) {
		p.position.applyMatrix4(matrix);
		p.velocity.applyMatrix4_rotation(matrix);
	}
};

Particle_Emitter.prototype.toJSON = function (child) {
	var params = {
		"uuid": this.uuid,
		"emit_per_second": this.emit_per_second,
		"lifetime": {
			"min": this.lifetime.min,
			"max": this.lifetime.max
		}
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
};

Particle_Emitter.prototype.parse = function (data) {
	this.emit_per_second = data.emit_per_second;
	this.name = data.name;
	this.uuid = data.uuid || _.generateUUID();
	_.copy_object(this.lifetime, data.lifetime);
};

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


function Mouse_Camera_Controller(canvas, camera) {
    if (canvas === undefined) {
        console.error("Mouse_Camera_Controller. Propable premordial creating object. canvas is undefined. Do nothing");
    } else {
        this.set_canvas_info(canvas);
    }
    this.camera = camera;
}

_.copy_object(Mouse_Camera_Controller.prototype, {
    constructor: Mouse_Camera_Controller,
    set_canvas_info: function (canvas) {
        var offset = canvas.getBoundingClientRect();
        this.offset = {
            left: offset.left,
            top: offset.top
        };
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
    },
    refresh_canvas: function (new_canvas) {
        this.set_canvas_info(new_canvas);
    },

    get_normalized_screen_coordinates: function (x, y) {
        //step 1 : normalized
        x = (x - this.offset.left) / this.width;
        y = (y - this.offset.top) / this.height;
        //step 2 : from unsigned to signed, translate origin from top left corner to center 
        var x = x * 2.0 - 1.0;
        var y = -(y * 2.0 - 1.0);
        var vector = new THREE.Vector3(x, y, 1);
        return vector;
    },

    //do some what prevent method, only give mouse event instead x,y coordiantes
    get_normalize_mouse_position: function (event) {
        return this.get_normalized_screen_coordinates(event.clientX, event.clientY);
    },

    //return new unproject vector, not change given
    //used THREE.Vector3.unproject method
    //including apply inver camera matrix
    //on my view, that wrong, because method do it big then promise
    //unproject must do only unproject, not else thing
    //because my need new method, who will do only unproject 
    unproject: function (vector) {
        var r = new THREE.Vector3();
        r.copy(vector);
        r.unproject(this.camera);
        //this aready done 
        //r.applyMatrix4(camera.matrixWorldInverse);    
        return r;
    },

    //get ray with origin in camera position and direction, 
    //pointed to far away where unproject screen point are
    get_ray_from_camera_in_screen_coordinates: function (x, y) {
        var vector = this.get_normalized_screen_coordinates(x, y);
        vector = this.unproject(vector);
        var ray = new THREE.Ray(this.camera.position, vector.sub(this.camera.position).normalize());
        return ray;
    },

    //do same what prevent method, only give mouse event for convience
    //see it as overriding function in C++
    get_ray_from_camera_in_mouse_position: function (event) {
        return this.get_ray_from_camera_in_screen_coordinates(event.x, event.y);
    }

});



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particles_Points; });

function Particles_Points(geometry, material) {
    THREE.Points.call(this, geometry, material);
    this.type = 'particles_points';

    this.boundingSphere = new THREE.Sphere();
    this.boundingSphere.radius = 10.0;
}

Particles_Points.prototype = Object.create(THREE.Points.prototype);

Particles_Points.prototype.constructor = Particles_Points;

Particles_Points.prototype.getBoundingSphere = function () {
    return this.boundingSphere;
};

Particles_Points.prototype.toJSON = function (meta) {
    var mat = this.material;
    var geom = this.geometry;
    this.material = undefined;
    this.geometry = undefined;
    var object = THREE.Object3D.prototype.toJSON.call(this, meta);
    this.material = mat;
    this.geometry = geom;
    return object;
};

//WTF?
Particles_Points.prototype.raycast = function (raycaster, intersects) {
    var sphere = new THREE.Sphere();
    sphere.copy(this.boundingSphere);
    sphere.applyMatrix4(this.matrixWorld);
    var r = raycaster.ray.intersectsSphere(sphere);
    if (r === false) return;
    console.log("INTERSECTION1", this.name, sphere);
    return;

    var shit = new THREE.Vector3();
    shit.copy(this.position);
    var tr = new THREE.Ray(new THREE.Vector3(0, 0, 20), shit);
    console.log("test ", tr.intersectsSphere(sphere), sphere);
    console.log("hit sphere " + this.name, sphere, raycaster.ray);
    return raycaster.ray.intersectsSphere(sphere);

    console.log("hit sphere " + this.type, "shpere is ", sphere, "ray is ", r);
    if (r) {
        var tmp = new THREE.Vector3(this.position);
        tmp.sub(r);
        intersects.push({
            distance: Math.sqrt(tmp.dot(tmp)),
            point: this.position,
            object: this
        });
    }
};



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return main_event_hub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Event_Hub; });
function Event_Hub() {
    this.events = {};
}

Event_Hub.prototype.add_event_listener = function (name, func, obj) {
    if (!this.events[name]) {
        this.events[name] = [];
    }
    this.events[name].push({ name: name, func: func, obj: obj });
};

Event_Hub.prototype.on = Event_Hub.prototype.add_event_listener;

Event_Hub.prototype.emit = function (name, obj) {
    var listeners = this.events[name];
    if (listeners) {
        for (var i = 0; i < listeners.length; i++) {
            var t = listeners[i];
            t.func.call(t.obj, obj);
        }
    }
};

var main_event_hub = new Event_Hub();



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mouse_Intersector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__simple_collider_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mouse_camera_controller_js__ = __webpack_require__(3);
var Mouse_Intersector = {};




Mouse_Intersector.get_normalized_screen_coords = function (canvas, x, y) {
				var offset = canvas.getBoundingClientRect();
				var width = canvas.clientWidth;
				var height = canvas.clientHeight;
				//normalize coordinates
				var x = (x - offset.left) / width;
				var y = (y - offset.top) / height;
				var x = x * 2 - 1;
				var y = -(y * 2 - 1);
				var vector = new THREE.Vector3(x, y, 1);
				return vector;
};

Mouse_Intersector.mouse_coords_to_vector = function (canvas, event) {
				return this.get_normalized_screen_coords(canvas, event.clientX, event.clientY);
};

Mouse_Intersector.unproject = function (vector, camera) {
				var r = new THREE.Vector3();
				r.copy(vector);
				r.unproject(camera);
				//this done yet
				//r.applyMatrix4(camera.matrixWorldInverse);    
				return r;
};

Mouse_Intersector.mouse_coords_to_ray = function (canvas, event, camera) {
				var vector = this.mouse_coords_to_vector(canvas, event);
				vector = this.unproject(vector, camera);
				var ray = new THREE.Ray(camera.position, vector.sub(camera.position).normalize());
				return ray;
};

Mouse_Intersector.find_intersection_with_mouse_vector = function (vector, camera, scene) {
				vector.unproject(camera);
				var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
				// create an array containing all objects in the scene with which the ray intersects
				//var intersects = ray.intersectObjects( [grid_text.root], true ); 
				//console.log(fake_plane.root.children[0].geometry);
				var intersects = ray.intersectObjects([scene], true);
				return intersects;
};

Mouse_Intersector.find_intersected_object = function (scene, ray) {

				var collider = new __WEBPACK_IMPORTED_MODULE_0__simple_collider_js__["a" /* Simple_Collider */](scene);
				var intersects = collider.check_ray(ray);
				return intersects;
};



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Simple_Collider; });
function Simple_Collider(root, params) {
    this.root = root;
    if (params === undefined) {
        params = {};
    }
    this.params = {
        recursive: params.recursive === undefined ? true : params.recursive,
        check_invisible: params.check_invisible === undefined ? true : params.check_invisible
    };
    this.intersected_objects = [];
    this._tested_sphere = new THREE.Sphere();
}

Simple_Collider.prototype.prepare_check = function (ray) {
    this.intersected_objects = [];
    this.intersected_map = {};
    this._fakecaster = { ray: ray };
};

Simple_Collider.prototype.check_ray = function (ray) {
    this.prepare_check(ray);

    this.find_intersection_with_bounding_sphere(this.root);

    return this.intersected_objects;
};

Simple_Collider.prototype.add_intersected = function (obj) {
    if (!this.intersected_map[obj.uuid]) {
        this.intersected_map[obj.uuid] = obj;
        this.intersected_objects.push(obj);
    }
};

Simple_Collider.prototype.check_object_bounding_sphere = function (obj) {
    //get bounding sphere
    if (obj.getBoundingSphere) {
        this._tested_sphere.copy(obj.getBoundingSphere());
    } else if (obj.geometry) {
        //fuck this shit, why don't exists method getBoundingSphere, which encapsulates this?
        if (obj.geometry.boundingSphere === null) obj.geometry.computeBoundingSphere();
        //copy sphere from object geometry and transform it with object. matrixWorld
        this._tested_sphere.copy(obj.geometry.boundingSphere);
        //console.log("get bounding sphere", this._tested_sphere);
    } else {
        return false;
    }

    //test bounding spere
    obj.updateMatrixWorld(true);
    this._tested_sphere.applyMatrix4(obj.matrixWorld);
    //find intersection
    var inter = this._fakecaster.ray.intersectsSphere(this._tested_sphere);
    //console.log("inter with sphere, level", level, inter, sphere.center, raycaster.ray);
    //add to intersected list, if success
    if (inter) {
        this.intersected_objects.push(obj);
        return true;
    } else {
        return false;
    }
};

Simple_Collider.prototype.find_intersection_with_bounding_sphere = function (object, top) {

    if (!object.non_collideble && (object.visible || this.params.check_invisible)) {
        this.check_object_bounding_sphere(object);
    }
    if (!this.params.recursive) return;

    //test children
    var children = object.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        this.find_intersection_with_bounding_sphere(child);
    }
};



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Color_Picker; });

var Color_Picker = {
    props: {
        value: {
            type: Object,
            default: function () {
                return { r: 0, g: 0, b: 0 };
            }
        }
    },
    template: '<div>\
    <p>Red Green Blue Color\
    <p>\
    <input type="range" min="0" max="255" @change="changed" :value="value.r" ref="r" id="r" >\
    <input type="range" min="0" max="255" @change="changed" :value="value.g" ref="g" id="g">\
    <input type="range" min="0" max="255" @change="changed" :value="value.b" ref="b" id="b">\
    </div>',
    data: function () {
        return {
            new_value: {
                r: 0,
                g: 0,
                b: 0
            }
        };
    },
    methods: {
        changed: function (event) {
            this.value[event.target.id] = event.target.value;
            this.$emit('input', this.value);
        }
    }
};

//Vue.component("color-picker", Color_Picker);



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particles_Panel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__particles_props_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__texture_panel_js__ = __webpack_require__(11);



var Particles_Panel = {
    props: {
        particles: {
            type: Object,
            default: function () {
                return [];
            }
        },
        textures: {
            type: Object,
            default: function () {
                return [];
            }
        },
        selected: {
            type: String,
            default: ''
        }
    },
    data: function () {

        return {
            first_time: true,
            particle_params: {},
            my_selected: false,
            texture_panel_is_visible: false
        };
    },
    methods: {
        add_to_select: function (id) {
            //console.log("select new ", id, this.particles);
            this.particles.push(id);
            this.my_selected = id;
        },
        create_particles: function () {
            event_hub.$emit("create_particles");
        },
        remove_particles: function (event) {
            event_hub.$emit("remove_particles", this.my_selected);
            for (var i = 0; i < this.particles.length; i++) {
                if (this.particles[i] == this.my_selected) {
                    this.particles.splice(i, 1);
                    //selecte next available particles or empty
                    if (this.particles.length > 0) {
                        if (i + 1 < this.particles.length) {
                            this.my_selected = this.particles[i + 1];
                        } else {
                            this.my_selected = this.particles[0];
                        }
                    } else {
                        this.my_selected = '';
                    }

                    break;
                }
            }
        },

        change_colors: function (event) {
            event_hub.$emit("change_particles_color", this.my_selected, event);
        },

        show_texture_panel: function (event) {
            this.texture_panel_is_visible = !this.texture_panel_is_visible;
            //console.log("this ", this.texture_panel_is_visible);
        },

        select_particles: function (event) {
            this.particle_params = event_hub.get_particle_params(this.my_selected);
        },
        play: function (event) {
            event_hub.$emit("replay", this.my_selected, this.particle_params);
        }

    },
    created: function () {

        var self = this;
        event_hub.$on("adding_particles", function (id) {
            self.add_to_select(id);
        });

        if (!!this.selected) {
            this.my_selected = this.selected;
        } else {
            if (this.particles.length > 0) {
                this.my_selected = this.particles[0];
            }
        }
        if (this.my_selected) {
            this.particle_params = event_hub.get_particle_params(this.my_selected);
        }
    },

    watch: {
        particles: function (arr) {
            //console.log("watch particles", arr);
            if (this.particles.length > 0) {
                if (this.first_time) {
                    this.my_selected = this.particles[0];
                    this.first_time = false;
                }
            }
        },
        my_selected: function (new_selected) {
            //console.log("watch new selected", new_selected);
            this.particle_params = event_hub.get_particle_params(this.my_selected);
        }
    },

    template: '<div>\
	<button type="button" id="btn-add" v-on:click="create_particles">New</button>\
	<br>\
	<select v-model="my_selected" id="object-list" ref="particles_list">\
		<option disabled value="">Please select one</option>\
	  <option v-for="option in particles" v-bind:value="option">\
		{{ option }}\
	  </option>\
	</select>\
	<br>\
    <span>Selected: {{ my_selected }}</span><br>\
        <button type="button" id="btn-play" v-on:click="play">Refresh</button>\
        <button type="button" id="btn-remove" v-on:click="remove_particles">Remove</button>\
    <p>  <span class="info-panel">Particles properties</span></p>\
    <div class="particles-properties">\
        <div v-if="my_selected" >\
            <ParticlesProps  :params="particle_params" />\
            <a href="javascript:void(0)" @click="show_texture_panel">Show texture panel</a>\
            <div class="dummy" v-if="texture_panel_is_visible">\
            <texture-panel :textures="textures" :object_id="my_selected" :selected="particle_params.texture"/>\
            </div>\
        </div>\
    </div>\
    </div>',

    components: {
        'ParticlesProps': __WEBPACK_IMPORTED_MODULE_0__particles_props_js__["a" /* Particles_Props */],
        'texture-panel': __WEBPACK_IMPORTED_MODULE_1__texture_panel_js__["a" /* Texture_Panel */]
    }
};

//Vue.component("particles-panel", Particles_Panel);



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particles_Props; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__color_picker_js__ = __webpack_require__(8);


var Blending_Selector = {
    props: {
        "blending": {
            type: String,
            required: true,
            default: "no"
        }
    },
    template: '<select v-model="blending" id="blending" v-on:change="select">\
            <option value="no">no</option>\
            <option value="additive">additive</option>\
            <option value="one_alpha">one, minus src alpha</option>\
            <option value="alpha_one">minus src alpha, one</option>\
            <option value="alpha">alpha</option>\
        </select>',
    methods: {
        select: function (event) {
            this.$emit("change", this.blending);
        }
    }
};

var Behavior = {
    props: ["affect_method", "emit_method"],

    data: function () {
        return {
            behavior: false
        };
    },

    template: '<div>\
    <button type="button" @click="show_behavior">Show Behaviour</button>\
    <div class="behavior" v-if="behavior">\
    <p>affect method<br>\
    <textarea v-model="affect_method"></textarea>\
    <p>emit method<br>\
    <textarea v-model="emit_method"></textarea>\
    </div>',
    methods: {
        show_behavior: function (f) {
            var behavior = !this.behavior;
            this.behavior = behavior;
        }
    }

};

var Particle_Params = {
    props: {
        "params": {
            type: Object,
            default: function () {
                return {};
            }
        }
    },

    template: '<div @keyup.13="fire">\
        <div class="prop-column">\
            Life Length: <br/>\
            <input type="text" id="life_length" v-model.number="params.life_length" type="number" step="0.1" />\
        </div>\
        <div class="prop-column">\
            Emit per second <br/>\
            <input type="text" id="emit_per_second" v-model.number="params.emit_per_second" type="number" />\
        </div>\
        <div class="prop-column">\
            Number of particles<br/>\
            <input type="text" id="count" v-model.number="params.count" type="number" />\
        </div>\
        <div class="prop-column">\
            Point Size<br/>\
            <input type="text" id="size" v-model.number="params.size" type="number" step="0.1" />\
        </div>\
</div>',
    methods: {
        fire: function (event) {
            this.$parent.fire(event);
        }
    }
};

var Particles_Props = {
    props: {
        "params": {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    template: '<div>  <particle-params :params=params />\
        <color-picker :value="params.color" @input="update_color"></color-picker>\
        <p>Blending mode</p>\
            <blending-mode :blending=params.blending @change="blending_change"> </blending-mode>\
        <p>Precomputed alpha <input type="checkbox" v-model="params.precomputed_alpha" @change="fire" id="pre_alpha"></p>\
        <behavior :affect_method=params.affect_method :emit_method=params.emit_method />\
    <div>',

    data: function () {
        return {
            behavior: false
        };
    },
    watch: {
        params: function () {
            //console.log("change ", this.params.id);
        }
    },
    methods: {
        blending_change: function (event) {
            this.params.blending = event;
            this.emit_param_change("blending", event);
        },
        emit_param_change: function (key, value) {
            var params = {};
            params[key] = value;
            event_hub.$emit("change_params", this.params.id, params);
        },
        fire: function (event) {
            var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
            this.emit_param_change(event.target.id, value);
        },

        update_color: function (event) {
            event_hub.$emit('change_color', this.params.id, event);
        }

    },
    components: {
        'color-picker': __WEBPACK_IMPORTED_MODULE_0__color_picker_js__["a" /* Color_Picker */],
        'blending-mode': Blending_Selector,
        'behavior': Behavior,
        'particle-params': Particle_Params
    }
};

//Vue.component("ParticlesProps", Particles_Props);




/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Texture_Panel; });

var Texture_Panel = {
    template: '<div class="texture-panel">\
            <div class="high-tools-panel">\
            <select id="texture_select" v-model="selected" v-on:change="choose_texture">\
            <option v-for="option in textures" v-bind:value="option">\
                {{ option }}\
            </option>\
            </select>\
            <button type="button" v-on:click="apply">apply</button>\
            </div>\
            <div class="texture-canvas">\
            <canvas id="texture-canvas-obj" class="texture-canvas" ref="canvas">\
            </canvas>\
            </div>\
            <div class="texture-info">\
                Texture Format  {{format}} <br />\
                Texture Width {{texture_width}} Height {{texture_height}}\
            </div>\
            <div class="clear" />\
        </div>',

    //texture dictionaries, selected texture, object id, which selected texture
    props: ["textures", "selected", "object_id"],

    data: function () {
        return {
            selected_texture: '',
            texture_width: 0,
            texture_height: 0,
            format: '',
            panel_visible: false,
            selected: ''
        };
    },

    methods: {
        show_panel: function (event) {
            this.panel_visible = !this.panel_visible;
        },
        choose_texture: function (event) {
            this.selected = event.target.value;
            this.selected_texture = this.selected;
            this.draw_texture(this.selected_texture);
        },
        apply: function () {
            //console.log("apply of ", this.object_id, this.selected_texture);
            event_hub.$emit("select_texture", this.object_id, this.selected_texture);
        },
        draw_texture: function (name) {
            if (!name) return;
            var texture = event_hub.get_texture(name);
            if (!texture) {
                console.error("Oh, Fuck! Texture " + name + " not found!");
                return;
            }
            this.format = texture_format_to_string(texture.format);
            var image = texture.image;
            this.texture_width = image.naturalWidth || image.width;
            this.texture_height = image.naturalHeight || image.height;

            var canvas = this.$refs["canvas"];
            my_draw_image(canvas, image, 0, 0);
        },

        get_texture_from_particles: function (id) {
            if (!id) {
                return;
            }
            this.selected_texture = event_hub.get_texture_from_particles(id);
            this.draw_texture(this.selected_texture);
        }
    },

    mounted: function () {
        this.get_texture_from_particles(this.object_id);
        //console.log("mount of texture panel", this.object_id, this.selected_texture, this.selected);
        //print("<h3>Hi! I mounted and my texture is " + this.selected_texture + "," + this.selected + "</h3>");
    },

    watch: {
        object_id: function (value) {
            this.get_texture_from_particles(value);
        }
    }

};



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Color_Domain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Table_Color; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);


function Color_Domain(r, g, b) {
    this.color = new THREE.Color(r, g, b);
    this.uuid = _.generateUUID();
    this.name = '';
    this.type = "Color_Domain";
}

_.copy_object(Color_Domain.prototype, {
    toJSON: function (child) {
        var data = {};
        data.uuid = this.uuid;
        if (this.name !== '') {
            data.name = this.name;
        }
        data.type = this.type;
        data.color = { r: this.color.r, g: this.color.g, b: this.color.b };
        return;
    },
    parse: function (json) {
        this.uuid = json.uuid;
        if (json.name !== undefined) {
            this.name = json.name;
        }
        if (json.color !== undefined) {
            this.color.set(json.color.r, json.color.g, json.color.b);
        }
    },
    emit: function (color) {
        color.r = this.color.r;
        color.g = this.color.g;
        color.b = this.color.b;
    },
    fill: function (color, offset) {
        color[offset + 0] = this.color.r;
        color[offset + 1] = this.color.g;
        color[offset + 2] = this.color.b;
    }
});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class('Color_Domain', Color_Domain);

function Table_Color(table) {
    if (table !== undefined) {
        this.copy_table(table);
    } else {
        this.default_table();
    }
}

Table_Color.prototype = Object.create(Color_Domain);

_.copy_object(Table_Color.prototype, {
    constructor: Table_Color,
    copy_table: function (table) {
        this.table = new Array(table.length);
        for (var i = 0; i < table.length; i++) {
            this.table = new THREE.Color(table[i]);
        }
    },
    emit: function (color) {
        var index = Math.ceil(Math.random() * this.table.length) % this.table.length;
        var src = this.table[index];
        color.r = src.r;
        color.g = src.g;
        color.b = src.b;
    },
    fill: function (color, offset) {
        var index = Math.ceil(Math.random() * this.table.length) % this.table.length;
        var src = this.table[index];
        color[offset] = src.r;
        color[offset + 1] = src.g;
        color[offset + 2] = src.b;
    },
    default_table: function () {
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
    get: function () {
        var r = { r: 0, g: 0, b: 0 };
        this.emit(r);
        return r;
    }
});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Table_Color", Table_Color);



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Shaders; });
var Particle_Shaders = {};

(function () {

	//particle attributes:
	//position
	//color
	//left, size
	var vertex_shader = [
	//'attribute vec4 position;',
	'attribute vec4 color;', 'attribute float params;', 'varying vec4 vcolor;', 'uniform float lifetime;', 'uniform float point_size;', 'uniform vec2 screen_size;', '#ifndef DYNAMIC_COLORS', 'uniform vec3 particle_color;', '#endif', 'void main () {', 'gl_Position = projectionMatrix * viewMatrix * vec4( position, 1.0 );', '#ifdef DYNAMIC_COLORS', 'vcolor.rgb = color.rgb;', '#else', 'vcolor.rgb = particle_color.rgb;', '#endif', '#ifdef NO_FADE_COLOR', 'vcolor.a = 1.0;', '#else',
	//params contains life length which decreased by time
	'float tmp = params / lifetime;', 'tmp = min(tmp, 1.0);', 'vcolor.a = tmp;', '#endif', 'float t =  screen_size.y* projectionMatrix[1][1] / gl_Position.w;', 't = t * point_size;', 'if (params > 0.0) {', 'gl_PointSize = t;', '}', 'else {',
	//'vcolor.a = 0.0;',
	'gl_PointSize = 0.0;', 'gl_Position.z = -1000.0;', '}', '}'];

	var fragment_shader = ['varying vec4 vcolor;', '#ifdef PARTICLE_TEXTURE', 'uniform sampler2D sprite;', '#endif', 'void main() {', '#ifdef PARTICLE_TEXTURE', 'vec4 tex = texture2D( sprite, gl_PointCoord );', 'vec3 fragment_color = tex.rgb;', 'fragment_color.rgb *= vcolor.rgb;', 'float alpha = tex.a;', '#else', 'vec3 fragment_color = vcolor.rgb;', 'float alpha = 1.0;', '#endif', '#ifdef PRE_ALPHA', 'fragment_color.rgb *= alpha;', '#endif', '#ifndef NO_FADE_COLOR', 'float fragment_alpha = alpha * vcolor.a;', '#else', 'float fragment_alpha = alpha;', '#endif', 'gl_FragColor = vec4(fragment_color.rgb, fragment_alpha);', '}'];

	Particle_Shaders.vertex = vertex_shader.join('\n');
	Particle_Shaders.fragment = fragment_shader.join('\n');
})();



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_System; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__particle_affector_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particles_points_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particle_shaders_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__color_domain_js__ = __webpack_require__(12);







function Particle_System(data) {
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

Particle_System.prototype.config_params = function (data) {
    var params = {};
    //default
    params.particle_lifetime = 3.0;
    params.no_fade_color = false;
    params.pre_alpha = true;
    params.depth_test = true;
    params.depth_write = false;
    params.color = { "r": 1, "g": 1, "b": 1 };
    params.blending = "one_alpha";
    params.size = 1;
    params.count = 100;
    params.name = '';
    params.bounding_radius = 2.0;
    params.discrete_emission = false;
    params.apply_world_matrix_on_emit = true;
    params.non_collideble = false;

    for (var key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (data[key] !== undefined) {
                params[key] = data[key];
            }
        }
    }

    params.emitter = data.emitter || new __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__["a" /* Particle_Emitter */](1);
    params.affector = data.affector || new __WEBPACK_IMPORTED_MODULE_2__particle_affector_js__["a" /* Particle_Affector */]();

    return params;
};

Particle_System.prototype.set_name = function (name) {
    this.name = name;
    this.node.name = name;
};

Particle_System.prototype.suicide = function () {
    this.node.parent.remove(this.node);
    main_event_hub.emit("kill_me", this);
};

Particle_System.prototype.create_particle_data = function (count) {
    var particle_data = new Array(count);
    var p;
    //var matrix = this.node.worldMatrix();
    for (var i = 0; i < count; i++) {
        p = {};
        p.position = new THREE.Vector3(0, 0, 0);
        p.velocity = new THREE.Vector3(0, 0, 0);

        //p.position.copy(this.node.position);
        //p.position.applyMatrix4(matrix);
        //p.velocity.applyMatrix4_rotation(matrix);

        p.lifetime = 0;
        particle_data[i] = p;
    }
    this.particle_data = particle_data;
};

Particle_System.prototype.create_particle_geometry = function (count) {
    this.create_particle_data(count);

    var vertices = new Float32Array(count * 3); // position
    var colors = new Float32Array(count * 3);
    var params = new Float32Array(count);

    var particle;
    for (var i = 0; i < count; i++) {
        particle = this.particle_data[i];
        //create particle
        vertices[i * 3] = particle.position.x;
        vertices[i * 3 + 1] = particle.position.y;
        vertices[i * 3 + 2] = particle.position.z;

        params[i] = 0.0;

        if (this.params.color_domain) {
            this.params.color_domain.fill(colors, i * 3);
        } else {
            colors[i * 3] = this.params.color.r;
            colors[i * 3 + 1] = this.params.color.g;
            colors[i * 3 + 2] = this.params.color.b;
        }
    }

    this.geometry = {};
    this.geometry.vertices = new THREE.BufferAttribute(vertices, 3).setDynamic(true);
    this.geometry.colors = new THREE.BufferAttribute(colors, 3);
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
};

Particle_System.prototype.discrete_emit = function (count) {
    this.emit_particles(0, count);
    this.geometry.vertices.needsUpdate = true;
    this.geometry.params.needsUpdate = true;
    this.geometry.colors.needsUpdate = true;
};

Particle_System.prototype.emit_particles = function (dt, need_emit) {
    //emit particles
    var p;
    var verts = this.geometry.vertices.array;
    var params = this.geometry.params.array;

    var old_need_emit = need_emit;
    this.node.updateMatrixWorld(true);
    var matrix = this.node.matrixWorld;
    for (var i = 0; i < this.particle_data.length && need_emit > 0; i++) {
        if (!(params[i] > 0)) {

            p = this.particle_data[i];
            this.emitter.emit(p, null, matrix);
            p.lifetime = this.particle_lifetime;

            verts[i * 3] = p.position.x;
            verts[i * 3 + 1] = p.position.y;
            verts[i * 3 + 2] = p.position.z;
            params[i] = p.lifetime;
            need_emit--;
            //colors[i*3] = this.params.color.r
            //colors[i*3+1] = this.params.color.g;
            //colors[i*3+2] = this.params.color.b;
        }
    }
    //console.log("created new particles ", old_need_emit - need_emit);
};

Particle_System.prototype.update_particle_geometry = function (dt) {
    var verts = this.geometry.vertices.array;
    var params = this.geometry.params.array;
    var p;
    var vert = new THREE.Vector3(0, 0, 0);
    var dummy_color = { "r": 1, "b": 1, "g": 1 };
    for (var i = 0; i < this.particle_data.length; i++) {

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
            verts[i * 3] = p.position.x;
            verts[i * 3 + 1] = p.position.y;
            verts[i * 3 + 2] = p.position.z;
        }
    }

    if (!this.params.discrete_emission) {
        var need_emit = this.emitter.calc_emitted_particles(dt);
        this.emit_particles(dt, need_emit);
    }

    this.geometry.vertices.needsUpdate = true;
    this.geometry.params.needsUpdate = true;
    this.geometry.colors.needsUpdate = true;
};

Particle_System.prototype.update = function (dt) {
    this.update_particle_geometry(dt);
};

Particle_System.prototype.generate_material_name = function () {
    var my_name = "MY_PARTICLE_MATERIAL";
    if (!!this.texture) {
        my_name += "_WITH_TEXTURE";
    }
    if (this.params.no_fade_color) {
        my_name += "_NO_FADE_COLOR";
    }
    return my_name;
};

Particle_System.prototype.blending_mode = {
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

Particle_System.prototype.convert_blending_mode = function (blending) {
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
    return { "blending": three_blending, "factors": factors };
};

Particle_System.prototype.set_texture = function (texture) {
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
};

Particle_System.prototype.create_uniforms = function () {
    var uniforms = {
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
        };
    };
    if (!this.dynamic_color) {
        uniforms["particle_color"] = { value: this.params.color };
    }
    return uniforms;
};

Particle_System.prototype.calc_defines = function () {
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
};

Particle_System.prototype.select_texture = function (texture) {
    if (typeof this.texture === 'string') {
        this.texture = __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Texture_Manager.get(this.texture);
        if (!this.texture) {
            console.error("Oh, not found texture <" + this.params.texture + "> in create particle material! Instead get " + this.texture);
        }
    }
};

Particle_System.prototype.create_particle_material = function () {

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
};

Particle_System.prototype.recreate_material = function () {
    this.node.material = this.material = this.create_particle_material();
};

Particle_System.prototype.set_pre_alpha = function (pre_alpha) {
    if (this.params.pre_alpha !== !!pre_alpha) {
        this.params.pre_alpha = pre_alpha;
        this.recreate_material();
    }
};

Particle_System.prototype.set_point_size = function (size) {
    if (this.params.size != size) {
        this.params.size = size;
        this.node.material.uniforms["point_size"].value = size;
    }
};

Particle_System.prototype.set_blending = function (blending) {
    this.params.blending = blending;
    var b = this.convert_blending_mode(blending);
    this.material.blending = b.blending;
    this.material.blendSrc = b.factors.blendSrc;
    this.material.blendDst = b.factors.blendDst;
};

Particle_System.prototype.toJSON = function () {
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
};

Particle_System.prototype.set_emitter = function (emitter) {
    this.emitter = this.params.emitter = emitter;
};

Particle_System.prototype.set_particle_life_length = function (val) {
    if (val !== this.params.particle_lifetime) {
        this.params.particle_lifetime = this.particle_lifetime = val;
        this.material.uniforms['lifetime'].value = val;
    }
};

Particle_System.prototype.set_emission_per_second = function (val) {
    this.emitter.emit_per_second = val;
};

Particle_System.prototype.set_particle_count = function (count) {
    if (count !== this.particle_data.length) {
        this.params.count = count;
        this.node.geometry = this.create_particle_geometry(count);
    }
};

Particle_System.prototype.set_color = function (color) {
    this.params.color.r = color.r;
    this.params.color.g = color.g;
    this.params.color.b = color.b;
};

Particle_System.prototype.set_bounding_sphere_radius = function (radius) {
    this.node.boundingSphere.radius = radius;
};



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Manager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__particle_affector_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particles_points_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particles_js__ = __webpack_require__(14);






function Particle_Manager() {
    this.particles = {};
    this.particles_array = [];
}

_.copy_object(Particle_Manager.prototype, {
    constructor: Particle_Manager,
    add: function (ps, name) {
        if (!this.particles[name]) {
            this.particles[name] = ps;
            this.particles_array.push(ps);
        }
    },
    remove_particles: function (name) {
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
    get_particle_names: function () {
        var names = [];
        for (var key in this.particles) {
            names.push(key);
        }
        return names;
    },

    update: function (dt) {
        for (var i = 0; i < this.particles_array.length; i++) {
            this.particles_array[i].update(dt);
        }
    },

    create_by_params: function (params) {
        var ps = new __WEBPACK_IMPORTED_MODULE_4__particles_js__["a" /* Particle_System */](params);
        this.add(ps);
        return ps;
    },

    toJSON: function () {
        var arr = [];

        var data;
        var p;
        for (var key in this.particles) {
            p = this.particles[key];
            if (p.uuid) {
                data = p.toJSON();
                arr.push(data);
            }
        }

        return arr;
    },

    emitter_fabric: function (params) {
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

    affector_fabric: function (params) {
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

    fromJSON: function (json, callback, root, name) {
        if (this.particles[name]) {
            console.log("WARNING Particle Manager! Particle System with this name already exists", name);
        }

        try {
            var data = JSON.parse(json);
        } catch (e) {
            console.log("error parsing json on ", name, json);
            throw e;
        }

        return this.parse(data, root, name);
    },

    parse: function (data, root, name) {
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

    load_particles: function (json, root) {
        var particles = json.particles;
        for (var i = 0; i < particles.length; i++) {
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

    create_name: function () {
        var number = this.particles_array.length + 1;
        var begin_name = 'Particle_System_';
        var testing = true;
        while (testing) {
            name = begin_name + number;
            if (this.particles[name] !== undefined) {
                number++;
            } else {
                return name;
            }
        }
    },

    create_new: function () {
        var name = this.create_name();

        var params = {};
        var ps = new __WEBPACK_IMPORTED_MODULE_4__particles_js__["a" /* Particle_System */](params);
        ps.set_name(name);
        this.add(ps, name);
        return ps;
    }
});

if (__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].particle_manager === undefined) {
    __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].particle_manager = new Particle_Manager();
}

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Particles_Config = {
    "box_size": 10
};



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Point_Generators; });
var Point_Generators = {};

Point_Generators.Random_Direction = function () {};

Point_Generators.Random_Direction.prototype.get_direction = function (vector) {
	vector.x = Math.random();
	vector.y = Math.random();
	vector.z = Math.random();
};

Point_Generators.Sphere = function (radius) {
	this.radius = radius;
};

Point_Generators.Sphere.prototype.get_inner_point = function (vector) {
	var alpha = Math.random() * Math.PI * 2;
	var beta = Math.random() * Math.PI;
	vector.x = Math.cos(alpha) * Math.sin(beta);
	vector.y = Math.cos(beta);
	vector.z = Math.sin(alpha) * Math.sin(beta);
};

Point_Generators.Sphere.prototype.get_normal = function (vector) {
	vector.x = Math.random() * 2 - 1;
	vector.y = Math.random() * 2 - 1;
	vector.z = Math.random() * 2 - 1;
	vector.normalize();
};

Point_Generators.Sphere.prototype.get_point = function (vector) {
	this.get_normal(vector);
	vector.multiplyScalar(this.radius);
};



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_event_hub_js__ = __webpack_require__(5);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_0__base_event_hub_js__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_0__base_event_hub_js__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_my_lib_js__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__base_my_lib_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_animations_js__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__base_animations_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__base_animations_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__base_animations_js__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_mouse_intersector_js__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__base_mouse_intersector_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_mouse_camera_controller_js__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__base_mouse_camera_controller_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_loading_manager_js__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_5__base_loading_manager_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__base_package_manager_js__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_6__base_package_manager_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__particles_particles_points_js__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_7__particles_particles_points_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__particles_particle_emitter_js__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_8__particles_particle_emitter_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__particles_forces_js__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_9__particles_forces_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__particles_particle_affector_js__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_10__particles_particle_affector_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__particles_point_generators_js__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_11__particles_point_generators_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__particles_custom_emitter_js__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_12__particles_custom_emitter_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__particles_custom_affector_js__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_13__particles_custom_affector_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__particles_test_emitters_js__ = __webpack_require__(31);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_14__particles_test_emitters_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_14__particles_test_emitters_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_14__particles_test_emitters_js__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_14__particles_test_emitters_js__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__particles_particle_shaders_js__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_15__particles_particle_shaders_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__particles_particles_js__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_16__particles_particles_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__particles_particles_manager_js__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_17__particles_particles_manager_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__base_scene_serializer_js__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_18__base_scene_serializer_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__mixins_threejs_mixins_js__ = __webpack_require__(27);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_19__mixins_threejs_mixins_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__mixins_camera_mixin_js__ = __webpack_require__(26);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_20__mixins_camera_mixin_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__app_application_js__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_21__app_application_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__particles_color_domain_js__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_22__particles_color_domain_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_22__particles_color_domain_js__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__base_simple_collider_js__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_23__base_simple_collider_js__["a"]; });









































/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gui_vueapp_js__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__gui_vueapp_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gui_color_picker_js__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_color_picker_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gui_texture_panel_js__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__gui_texture_panel_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gui_particles_props_js__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__gui_particles_props_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gui_particles_panel_js__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__gui_particles_panel_js__["a"]; });






/***/ }),
/* 19 */
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





function Application(config) {

    this._lifecycle_event("before_created");

    this._init_timer();
    this._create_loop_function();

    this.mouse_controllers = [];

    __WEBPACK_IMPORTED_MODULE_1__base_event_hub_js__["a" /* main_event_hub */].add_event_listener("kill_me", function (obj) {
        this.remove_animated_object(obj);
    }, this);
}

Application.prototype.start = function (config) {
    console.log("start application...");
    this._set_configuration(config);
};

Application.prototype._lifecycle_event = function (name, event) {
    if (this[name]) {
        return this[name](event);
    }
    return false;
};

Application.prototype._init_timer = function () {
    this.clock = new THREE.Clock();
    this.delta_time = 0;
    this.animated_objects = [];
};

var run_function = window.requestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
};

Application.prototype._create_loop_function = function () {
    var self = this;
    this.run = function () {
        run_function(function () {
            self.loop();
            //main_event_hub.emit("new_frame");
        });
    };

    //My_Lib.create_run_function(this);

    //main_even_hub.add_event_listener("new_frame", this.loop, this);    
};

Application.prototype.get_default_configuration = function () {
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
};

Application.prototype._create_render = function (json) {
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
};

Application.prototype._create_main_scene = function (json) {
    var event = { prevent: false };
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
};

Application.prototype.apply_configuration = function (json) {
    this.configuration = json;
    this._create_render(json);
    this._create_main_scene(json);
    this._lifecycle_event("created");
};

Application.prototype.load_configuration = function (url) {
    var xhr = new THREE.XHRLoader();

    var self = this;

    var config = self.get_default_configuration();

    var configuration_is_applied = false;

    function onload(data) {
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
};

Application.prototype._set_configuration = function (config) {
    var default_config = this.get_default_configuration();

    //this is url of configuration file
    if (typeof config === 'string') {
        console.log("get configuration from url >> " + config);
        this.load_configuration(config);

        //this is object filled with data
    } else if (typeof config === 'object') {
        console.log("get configuration from user object");
        _.copy_object(default_config, config);
        this.apply_configuration(default_config);
        //configuration not given, use default
    } else {
        console.log("_set_configuration: set default configration");
        this.apply_configuration(default_config);
    }
};

Application.extend = function (methods, child_func) {

    var Child;
    if (typeof child_func === 'undefined') {
        Child = function () {
            Application.apply(this, arguments);
        };
    } else {
        Child = child_func;
    }

    //create new object and set prototype chain
    Child.prototype = Object.create(Application.prototype);
    //copy methods to new object
    _.copy_object(Child.prototype, methods);
    Child.prototype.constructor = Child;

    return Child;
};

Application.extend_proto = function (proto, methods) {
    var obj = Object.create(proto);
    _.copy_object(obj, methods);
    Application.call(obj);
    return obj;
};

Application.prototype.loop = function () {
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
};

Application.prototype.add_animated_object = function (obj) {
    //fix probably duplicates
    this.animated_objects.push(obj);
};

Application.prototype.remove_animated_object = function (obj) {
    for (var i = 0; i < this.animated_objects.length; i++) {
        if (this.animated_objects[i] === obj) {
            this.animated_objects.splice(i, 1);
            break;
        }
    }
};

Application.prototype.update_all = function (delta) {
    var obj;
    for (var i = 0, len = this.animated_objects.length; i < len; i++) {
        obj = this.animated_objects[i];
        if (obj["update"]) {
            obj.update(delta);
        }
    }
};

Application.prototype.pre_update = function (delta) {
    this.update_all(delta);
    __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].particle_manager.update(delta);
    //event
    if (this.before_update !== undefined) {
        this.before_update(delta);
    }
};

Application.prototype.do_update = function (dt) {
    this.pre_update(dt);
    this.update(dt);
};

Application.prototype.update = function (delta) {};

Application.prototype.create_mouse_move_listener = function () {
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
};

Application.prototype.find_mouse_over_intersections = function (vector) {
    vector.unproject(this.main_camera);
    var ray = new THREE.Raycaster(this.main_camera.position, vector.sub(this.main_camera.position).normalize());
    var obj;
    for (var i = 0, len = this.mouse_controllers.length; i < len; i++) {
        obj = this.mouse_controllers[i];
        if (obj.over) {
            // create an array containing all objects in the scene with which the ray intersects
            //var intersects = ray.intersectObjects( [grid_text.root], true ); 
            //console.log(fake_plane.root.children[0].geometry);
            var intersects = ray.intersectObjects([obj.root], true);
            obj.callback(intersects);
        }
    }
};

Application.prototype.add_mouse_controller = function (root, over, click, callback) {
    var tmp = new __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Mouse_Controller(root, over, click, callback);
    this.mouse_controllers.push(tmp);
    if (over) {
        this.create_mouse_move_listener();
    }
    return tmp;
};

Application.prototype.set_viewport = function (width, height) {
    __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Viewport.width = width;
    __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Viewport.height = height;
};

Application.prototype.render = function (delta) {
    this.renderer.setClearColor(this.configuration.clear_color);
    this.renderer.autoClear = true;
    this.renderer.render(this.main_scene, this.main_camera);
};



/***/ }),
/* 20 */
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
function Base_Animation() {
    this.time = 0;
    this.time_scale = 1.0;
    this.type = "Base_Animation";
    this.uuid = _.generateUUID();
    this.length = -1;
    this.stopped = false;
}

Base_Animation.prototype.update = function (dt) {
    var scaled_dt = dt * this.time_scale;
    this.time += scaled_dt;
    if (this.length < 0 || this.time < this.length) {
        this.calc_animation(dt);
    }
};

Base_Animation.prototype.stop = function () {
    this.stopped = true;
};

Base_Animation.prototype.start = function () {
    this.stopped = false;
};

Base_Animation.prototype.reset = function () {
    this.time = 0;
};

Base_Animation.prototype.calc_animation = function (dt) {};

Base_Animation.prototype.apply = function (obj) {};

Base_Animation.prototype.toJSON = function (data) {
    var data = {};
    data.uuid = this.uuid;
    data.type = this.type;
    if (this.name !== '') {
        data.name = this.name;
    }
    data.time_scale = this.time_scale === undefined ? 1.0 : this.time_scale;
    data.length = this.length;
    return data;
};

Base_Animation.prototype.parse = function (param) {
    this.type = param.type;
    this.uuid = param.uuid;
    this.name = param.name ? param.name : '';
    this.time_scale = param.time_scale === undefined ? 1.0 : param.time_scale;
    this.length = param.length === undefined ? -1 : param.length;
};

function Euler_Animation(x, y, z) {
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

Euler_Animation.prototype.calc_animation = function (dt) {
    //console.log(this.xspeed,this.yspeed, this.zpeed, dt, this.time_scale);
    dt *= this.time_scale;
    this.x += this.xspeed * dt;
    this.y += this.yspeed * dt;
    this.z += this.zspeed * dt;
};

Euler_Animation.prototype.apply = function (obj) {
    obj.rotation.set(this.x, this.y, this.z);
};

Euler_Animation.prototype.toJSON = function (json) {
    var data = Base_Animation.prototype.toJSON.call(this);
    data.xspeed = this.xspeed;
    data.yspeed = this.yspeed;
    data.zspeed = this.zspeed;
    return data;
};

Euler_Animation.prototype.parse = function (param) {
    Base_Animation.prototype.parse.call(this, param);
    this.xspeed = param.xspeed;
    this.yspeed = param.yspeed;
    this.zspeed = param.zspeed;
    this.x = this.y = this.z = 0;
};

function Scale_Animation(x, y, z) {
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
    calc_animation: function (dt) {
        dt = dt * this.time_scale;
        this.x += this.xscale * dt;
        this.y += this.yscale * dt;
        this.z += this.zscale * dt;
    },
    apply: function (obj) {
        obj.scale.set(this.x, this.y, this.z);
    },
    reset: function () {
        if (this.first) {}
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Loading_Manager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(0);


//events: 
//item_loaded
//onerror
//onprogress
//finished
function Chain_Loader() {}

Chain_Loader.prototype = {
	constructor: Chain_Loader,
	start: function (list) {
		this.list = list;
		this.index = 0;
		this.load(this.list[0]);
		this.stop_by_error = false;
	},

	next: function (resource) {
		if (this.item_loaded && resource) {
			this.item_loaded(resource, this.list[this.index]);
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

	do_error: function (error) {
		if (this.onerror) {
			this.onerror(error);
		} else {
			console.error("Chain Loader Error!", error);
		}
		if (!this.stop_by_error) {
			this.next();
		}
	},

	do_progress: function () {
		if (this.onprogress) {
			this.onprogress.apply(this, arguments);
		}
	},

	load: function (item) {
		var self = this;
		if (this.load_func) {
			this.load_func(item, function (item) {
				self.next.apply(self, arguments);
			}, function (item) {
				self.do_error.apply(self, arguments);
			}, function (item) {
				self.do_progress.apply(self, arguments);
			});
		}
	}
};

function test_chain_loader() {
	var cl = new Chain_Loader();
	cl.item_loaded = function (item) {
		console.log("load item ", item);
	};
	cl.finished = function (item) {
		console.log("loader manager - job done");
	};
	cl.load_func = function (item, next, error, progress) {
		if (item) {
			next(item);
		} else {
			error(item);
		}
	};
	cl.start(["first", "second", null, "tree"]);
}
//test_chain_loader();


function Loading_Manager() {
	this.resources = {};
	this.texture_loader = new THREE.TextureLoader();
}

Loading_Manager.prototype = {
	constructor: Loading_Manager,
	get: function (name) {
		return this.resources[name];
	},

	get_async: function (name, callback) {
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
		texture = this.texture_loader.load(name, function (texture) {
			if (callback) {
				callback(texture);
			}
		});
		this.resources[name] = texture;
		return texture;
	},

	load_list: function (resource_list, on_load, load_func, on_progress) {
		var self = this;

		var cl = new Chain_Loader();
		var self = this;
		cl.onerror = function (error) {
			console.error("ERROR loading texture", error, cl.list[cl.index]);
		};
		cl.item_loaded = function (resource, name) {
			self.resources[name] = resource;
			if (self.on_resource_loaded) {
				self.on_resource_loaded(resource);
			}
		};
		cl.on_progress = function () {
			if (on_progress) {
				on_progress();
			}
		};
		cl.load_func = function () {
			load_func.apply(this, arguments);
		};
		cl.finished = function () {
			if (on_load) {
				on_load();
			}
		};
		cl.start(resource_list);
	},

	load_list_textures: function (resource_list, on_load) {
		var self = this;
		this.load_list(resource_list, on_load, function (url, next, error, progress) {
			var texture = self.texture_loader.load(url, next, progress, error);
		});
	},

	load_list_json: function (resource_list, on_load, progress) {
		var self = this;
		var loader = new THREE.XHRLoader();
		this.load_list(resource_list, on_load, function (url, next, error, progress) {
			var texture = loader.load(url, next, progress, error);
		}, progress);
	},

	free: function () {
		this.resources = {};
	}
};

__WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].Texture_Manager = new Loading_Manager();



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Package_Manager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(0);
//TODO: remove this ugly crap and replace something reasonable



//this ugly class loading texture list in json format, parse it, and loading textures
//then it call event data_loaded, when give texture list in json format

function Package_Manager() {
    this.state = {};
}

//load json file with descriptions of package: texture list, particles list, scene objects list
Package_Manager.prototype.load = function (url, defaults) {
    this.defaults = defaults;
    var self = this;
    this.state = {
        "type": "start"
    };

    var self = this;
    function onload(data) {
        self.state["type"] = "done";
        self.state["data"] = data;

        self.parse_package_description(data);
    }
    function error(event) {
        self.state["type"] = "error";
        self.state["error"] = event;
        console.error("ERror! Failed loading resources with url " + url, event.target);
        if (self.error) {
            self.error(event.target);
        }
        self.pack = self.defaults;
        self.load_resources(self.defaults);
    }
    function progress() {}
    var xhr = new THREE.XHRLoader();
    xhr.load(url, onload, progress, error);
};

//parse loaded json file 
Package_Manager.prototype.parse_package_description = function (data) {
    console.log("packaged description loaded, begin parsing...");
    try {
        var pack = JSON.parse(data);
        this.pack = pack;
        if (this.loaded) {
            this.loaded(pack);
        }
    } catch (e) {
        console.error("error parsing resources ", e);
        if (this.error) {
            this.error(event);
        }
        return;
    }
    this.load_resources(pack);
};

Package_Manager.prototype.load_resources = function (pack) {
    var self = this;
    //load textures
    console.log("Package Manager: begin loading textures...");
    __WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].Texture_Manager.load_list_textures(pack.textures, function () {
        //load json descriptions files
        if (self.data_loaded) {
            self.data_loaded(pack);
        }
    });
};



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scene_Serializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particles_particles_manager_js__ = __webpack_require__(15);



function Scene_Serializer(root) {
    this.animation_library = {};
}

Scene_Serializer.prototype.toJSON = function (root) {
    this.json = root.toJSON();
    console.log("my lib particle manager", __WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].particle_manager);
    this.json["particles"] = __WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].particle_manager.toJSON();
    var anims = root.collect_animations(root);
    if (anims.count > 0) {
        this.json["myanimations"] = anims;
    }

    return this.json;
};

Scene_Serializer.prototype.create_animations = function (animations) {
    for (var key in animations) {
        if (this.animation_library[key] === undefined && Object.prototype.hasOwnProperty.call(animations, key)) {
            var data = animations[key];
            //console.log("create animations ", data.uuid);            
            var anim = __WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].Abstract_Fabric(data);
            if (anim) {
                this.animation_library[key] = anim;
            }
        }
    }
};

Scene_Serializer.prototype.bind_animations = function (animdata) {
    if (!animdata) return;

    var bindings = animdata.bindings;

    //console.log("bind animation");
    var self = this;
    function copy_animations(obj, bind) {
        for (var i = 0; i < bind.animations.length; i++) {
            var anim_uuid = bind.animations[i];
            obj.add_animation(self.animation_library[anim_uuid]);
        }
    }

    for (var i = 0; i < bindings.length; i++) {
        var bind = bindings[i];
        var uuid = bind.uuid;
        var obj = this.root.getObjectByProperty("uuid", uuid);
        if (obj) {
            //console.log("binding " + uuid + " object to animation "+uuid);
            copy_animations(obj, bind);
        }
    }
};

Scene_Serializer.prototype.load_from_json = function (url) {
    var self = this;
    function onload(json) {
        try {
            var data = JSON.parse(json);
        } catch (e) {
            console.error("Failed to parse scene ", e);
            throw e;
        }
        if (data === undefined) {
            console.error("Something fucking happened, failed to load scene ", url);
            return;
        }
        self.load(data);
    }
    function progress() {}
    function error(e) {
        console.error(e.target);
        throw e;
    }
    var xhr = new THREE.XHRLoader();
    xhr.load(url, onload, progress, error);
};

Scene_Serializer.prototype.load = function (json) {
    this.animation_library = {};
    var o = new THREE.ObjectLoader();
    if (json !== undefined) {
        this.json = json;
    }
    var root = o.parse(this.json, function () {
        console.log("onload");
    });
    this.root = root;

    __WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].particle_manager.load_particles(this.json, root);

    this.create_animations(this.json.myanimations.animations);
    this.bind_animations(this.json.myanimations);
    this.main_camera = root.getObjectByName("main_camera");

    if (this.scene_loaded) {
        this.scene_loaded(root);
    }
    return root;
};



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__ = __webpack_require__(17);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "My_Lib", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Base_Animation", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Euler_Animation", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Scale_Animation", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Mouse_Intersector", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Mouse_Camera_Controller", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Loading_Manager", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Package_Manager", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particles_Points", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particle_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particle_Forces", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particle_Affector", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Point_Generators", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Custom_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Custom_Affector", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Cone_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Star_Dust_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Sphere_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Star_Dust_Affector", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particle_Shaders", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particle_System", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["u"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particle_Manager", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["v"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Scene_Serializer", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["w"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["x"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Color_Domain", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["y"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Table_Color", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["z"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Simple_Collider", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["A"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "main_event_hub", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["B"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Event_Hub", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["C"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Mix_It", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["D"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Mixin", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["E"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gui_main_webpack_js__ = __webpack_require__(18);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "create_vue_app", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_main_webpack_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Color_Picker", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_main_webpack_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Texture_Panel", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_main_webpack_js__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particles_Props", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_main_webpack_js__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particles_Panel", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_main_webpack_js__["e"]; });



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return create_vue_app; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__particles_panel_js__ = __webpack_require__(9);


function create_vue_app(id) {

  var app2 = new Vue({
    el: id,

    components: {
      'particles-panel': __WEBPACK_IMPORTED_MODULE_0__particles_panel_js__["a" /* Particles_Panel */]
    },
    data: {
      particles: [],
      textures: []
    },
    template: '<div id="app">\
            <particles-panel :particles="particles" :textures="textures"></particles-panel>\
            </div>'
  });

  return app2;
}



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mixin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_mouse_camera_controller_js__ = __webpack_require__(3);


function Mixin() {

    //need for unproject object and dragging
    THREE.PerspectiveCamera.prototype.get_forward_plane_by_object = function (obj) {
        var z = new THREE.Vector3();
        z.setFromMatrixColumn(this.matrixWorld, 2);
        var dist = obj.position.dot(z);
        var plane = new THREE.Plane(z.negate(), dist);
        return plane;
    };

    THREE.PerspectiveCamera.prototype.get_ray_from_screen_coordinates = function (canvas, x, y) {
        var mc = new __WEBPACK_IMPORTED_MODULE_0__base_mouse_camera_controller_js__["a" /* Mouse_Camera_Controller */](canvas, this);
        var ray = mc.get_ray_from_camera_in_screen_coordinates(x, y);
        return ray;
    };
}

Mixin();


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mix_It; });
function Mix_It() {

    //FIX
    THREE.Vector3.prototype.applyMatrix4_rotation = function (m) {
        // input: THREE.Matrix4 affine matrix

        var x = this.x,
            y = this.y,
            z = this.z;
        var e = m.elements;

        this.x = e[0] * x + e[4] * y + e[8] * z;
        this.y = e[1] * x + e[5] * y + e[9] * z;
        this.z = e[2] * x + e[6] * y + e[10] * z;

        return this;
    };

    var Object3D_Animation_Mixin = {

        add_animation: function (anim) {
            if (!this.animations) {
                this.animations = [];
            }
            if (this.animations.indexOf(anim) < 0) {
                this.animations.push(anim);
            }
        },

        remove_animation: function (anim) {
            if (this.animations) {
                var i = this.animations.indexOf(anim);
                if (i > -1) {
                    this.animations.splice(i, 1);
                }
            }
        },

        update: function (dt) {
            //console.log("object update", dt);
            if (this.animations !== undefined) {
                for (var i = 0; i < this.animations.length; i++) {
                    var anim = this.animations[i];
                    anim.update(dt);
                    //console.log(this.rotation);
                    anim.apply(this);
                    //console.log(this.rotation);
                }
            }

            for (var i = 0; i < this.children.length; i++) {
                var obj = this.children[i];
                if (obj.update) {
                    obj.update(dt);
                }
            }
        }

    };
    _.copy_object(THREE.Object3D.prototype, Object3D_Animation_Mixin);

    THREE.Object3D.prototype.old_toJson = THREE.Object3D.toJSON;

    var Object3D_Serialization_Mixin = {
        standard_serialization: function (meta) {
            // standard Object3D serialization
            var object = {};

            object.uuid = this.uuid;
            object.type = this.type;
            if (this.name !== '') object.name = this.name;
            if (JSON.stringify(this.userData) !== '{}') object.userData = this.userData;
            if (this.castShadow === true) object.castShadow = true;
            if (this.receiveShadow === true) object.receiveShadow = true;
            if (this.visible === false) object.visible = false;

            object.matrix = this.matrix.toArray();

            if (this.type !== "particles_points") {
                if (this.geometry !== undefined) {
                    object.geometry = this.geometry.uuid;
                }
                if (this.material !== undefined) {
                    object.material = this.material.uuid;
                }

                if (this.material !== undefined && meta.materials[this.material.uuid] === undefined) {
                    meta.materials[this.material.uuid] = this.material.toJSON(meta);
                }

                if (this.geometry !== undefined && meta.geometries[this.geometry.uuid] === undefined) {
                    meta.geometries[this.geometry.uuid] = this.geometry.toJSON(meta);
                }
            }

            if (this.animations) {
                object.animations = [];
                for (var i = 0; i < this.animations.length; i++) {
                    object.animations.push(this.animations[i].uuid);
                }
            }

            if (this.children.length > 0) {
                object.children = [];
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    //object.children.push( child.standard_serialization( meta ) );
                    object.children.push(child.toJSON(meta));
                }
            }
            return object;
        },

        collect_materials: function (meta) {
            if (this.material !== undefined && meta.materials[this.material.uuid] === undefined) {
                meta.materials[this.material.uuid] = this.material.toJSON(meta);
            }

            for (var i = 0; i < this.children.length; i++) {
                this.children[i].collect_materials(meta);
            }
        },

        collect_geometry: function (meta) {
            if (this.geometry !== undefined && meta.geometries[this.geometry.uuid] === undefined) {
                meta.geometries[this.geometry.uuid] = this.geometry.toJSON(meta);
            }

            for (var i = 0; i < this.children.length; i++) {
                this.children[i].collect_geometry(meta);
            }
        },

        toJSON1: function (meta) {

            // extract data from the cache hash
            // remove metadata on each item
            // and return as array
            function extractFromCache(cache, t) {
                var values = [];
                for (var key in cache) {
                    var data = cache[key];
                    delete data.metadata;
                    values.push(data);
                }
                return values;
            }

            this.updateMatrixWorld(true);

            // meta is '' when called from JSON.stringify
            var isRootObject = meta === undefined || meta === '';

            var output = {};

            if (isRootObject) {

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

                var geometries = extractFromCache(meta.geometries, "geoim");
                var materials = extractFromCache(meta.materials, "materials");
                var textures = extractFromCache(meta.textures, "textures");
                var images = extractFromCache(meta.images, "images");

                if (geometries.length > 0) output.geometries = geometries;
                if (materials.length > 0) output.materials = materials;
                if (textures.length > 0) output.textures = textures;
                if (images.length > 0) output.images = images;

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

        collect_animations: function (scene) {
            var data = {
                animations: {},
                bindings: [],
                count: 0
            };

            function collect_animations_recursive(root) {
                if (root.animations) {
                    for (var i = 0; i < root.animations.length; i++) {
                        var anim = root.animations[i];
                        if (data.animations[anim.uuid] === undefined) {
                            data.animations[anim.uuid] = anim.toJSON();
                            data.count++;
                        }
                    }

                    var bind = {};
                    bind.uuid = root.uuid;
                    bind.animations = [];
                    for (var i = 0; i < root.animations.length; i++) {
                        bind.animations.push(root.animations[i].uuid);
                    }
                    data.bindings.push(bind);
                }

                if (root.children) {
                    for (var i = 0; i < root.children.length; i++) {
                        collect_animations_recursive(root.children[i]);
                    }
                }
            }
            collect_animations_recursive(scene);
            return data;
        }

    };

    _.copy_object(THREE.Object3D.prototype, Object3D_Serialization_Mixin);

    THREE.Object3D.prototype.dm_mark = 'yes,this object has been marked by black magic, owned by me, dark matters';

    //replace source with this
    THREE.Object3D.prototype.replace_object_with_this = function (source) {

        this.uuid = source.uuid;
        this.name = source.name;

        this.up.copy(source.up);
        this.position.copy(source.position);
        this.quaternion.copy(source.quaternion);
        this.scale.copy(source.scale);

        this.matrix.copy(source.matrix);
        this.matrixWorld.copy(source.matrixWorld);

        this.matrixAutoUpdate = source.matrixAutoUpdate;
        this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

        this.visible = source.visible;

        this.castShadow = source.castShadow;
        this.receiveShadow = source.receiveShadow;

        this.frustumCulled = source.frustumCulled;
        this.renderOrder = source.renderOrder;

        this.userData = JSON.parse(JSON.stringify(source.userData));

        //copy array of children, not clone
        for (var i = 0; i < source.children.length; i++) {
            this.add(source.children[i]);
        }
        source.parent.add(this);
        source.parent.remove(source);

        this.animations = source.animations;
    };
}

Mix_It();



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Custom_Affector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_affector_js__ = __webpack_require__(1);



function Custom_Affector() {
    __WEBPACK_IMPORTED_MODULE_1__particle_affector_js__["a" /* Particle_Affector */].apply(this, arguments);
    this.custom_func = function dummy() {
        return true;
    };
}

Custom_Affector.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_1__particle_affector_js__["a" /* Particle_Affector */].prototype);

_.copy_object(Custom_Affector.prototype, {
    constructor: Custom_Affector,
    affect: function (dt, pdata, vert) {
        return this.custom_func(dt, p, vert);
    },
    test_func: function () {
        var p = {
            position: { x: 0, y: 0, z: 0 },
            velocity: { x: 0, y: 0, z: 0 }
        };
        var color = { r: 0, g: 0, b: 0 };
        this.custom_func(p, color);
    },
    set_affect_function: function (source) {
        if (typeof source === 'function') {
            this.custom_func = source;
        } else if (typeof source === 'string') {
            try {
                this.custom_func = new Function('dt,p,vert', source);
                this.test_func();
            } catch (e) {
                alert(e);
                this.custom_func = undefined;
            }
            this.source_code = source;
        }
    },

    toJSON: function () {
        var data = {
            name: "Custom_Affector"
        };
        data.params = __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Particle_Affector.prototype.toJSON.call(this, this);
        params["source_code"] = this.source_code;
        return data;
    },
    parse: function (json) {
        __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Particle_Affector.prototype.parse(this, json);
        this.set_affect_func(json.source_code);
    }

});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Custom_Affector", Custom_Affector);



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Custom_Emitter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__ = __webpack_require__(2);



function Custom_Emitter() {
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
            position: { x: 0, y: 0, z: 0 },
            velocity: { x: 0, y: 0, z: 0 }
        };
        var color = { r: 0, g: 0, b: 0 };
        this.custom_func(p, color);
    },
    set_emit_function: function (source) {
        if (typeof source === 'function') {
            this.custom_func = source;
        } else if (typeof source === 'string') {
            try {
                this.custom_func = new Function('p', 'color', source);
                this.test_func();
            } catch (e) {
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
        this.set_emit_function(data.source_code);
    },
    constructor: Custom_Emitter
};

_.copy_object(Custom_Emitter.prototype, methods);
__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Custom_Emitter", Custom_Emitter);

function test() {
    var t = new Custom_Emitter();
    var source = 'p.position.z = -100; p.velocity.y = 100;';
    t.set_emit_function(source);
    var p = {
        velocity: { x: 0, y: 0, z: 0 },
        position: { x: 0, y: 0, z: 0 }
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Forces; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);


var Particle_Forces = {};

//base class
Particle_Forces.Force = function () {};

_.copy_object(Particle_Forces.Force.prototype, {
	calc: function (dt, particle, acceleration) {},
	toJSON: function (child) {
		return {};
	},
	parse: function (json) {}
});

//constant force
Particle_Forces.Constant_Force = function (force) {
	if (typeof force !== 'undefined') {
		this.force = force;
	} else {
		this.force = { x: 0, y: 0, z: 0 };
	}
};

Particle_Forces.Constant_Force.prototype = Object.create(Particle_Forces.Force.prototype);
_.copy_object(Particle_Forces.Constant_Force.prototype, {
	constructor: Particle_Forces.Constant_Force,
	calc: function (dt, p, acceleration) {
		acceleration.x += this.force.x;
		acceleration.y += this.force.y;
		acceleration.z += this.force.z;
	},
	toJSON: function (child) {
		var data = {};
		data.name = "Constant_Force";
		data.force = _.create_clone_object(this.force);
		return data;
	},
	parse: function (json) {
		if (json.force) {
			_.copy_object(this.force, json.force);
		}
	}
});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Constant_Force", Particle_Forces.Constant_Force);



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cone_Emitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Star_Dust_Emitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Sphere_Emitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Star_Dust_Affector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point_generators_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particle_affector_js__ = __webpack_require__(1);





function Cone_Emitter() {
	__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].apply(this, arguments);
	this.generator = new __WEBPACK_IMPORTED_MODULE_1__point_generators_js__["a" /* Point_Generators */].Random_Direction();
	this.origin = new THREE.Vector3(1, 1, 0);
	this.velocity = new THREE.Vector3(0, 1, 0);
	this.dispersion = { "min": 5, "max": 10 };
	this.dispersion.delta = 5;
	this.speed = { min: 5, max: 10, delta: 5 };
	this.color = new THREE.Color(1, 1, 1);
}

Cone_Emitter.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype);
Cone_Emitter.prototype.constructor = Cone_Emitter;
__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Cone_Emitter", Cone_Emitter);

Cone_Emitter.prototype.toJSON = function () {
	var data = {};
	data.name = "Cone_Emitter";
	data.params = __WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype.toJSON.call(this, this);
	_.clone_field_list_one_level_recursion(this, data.params, ["origin", "velocity", "dispersion", "speed"]);

	return data;
};

Cone_Emitter.prototype.parse = function (data) {
	__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype.parse.call(this, data);
	this.origin.copy(data.origin);
	this.velocity.copy(data.velocity);
	this.set_dispersion(data.dispersion.min, data.dispersion.max);
	this.set_speed(data.speed.min, data.speed.max);
};

Cone_Emitter.prototype.set_speed = function (min, max) {
	this.speed.min = min;
	this.speed.max = max;
	this.speed.delta = max - min;
};

Cone_Emitter.prototype.set_dispersion = function (min, max) {
	this.dispersion.min = min;
	this.dispersion.max = max;
	this.dispersion.delta = max - min;
};

Cone_Emitter.prototype.emit = function (p, color, matrix) {
	p.position.copy(this.origin);

	this.generator.get_direction(p.velocity);
	p.velocity.multiplyScalar(Math.random() * this.dispersion.delta + this.dispersion.min);
	p.velocity.add(this.velocity).normalize();

	if (matrix) {
		p.position.applyMatrix4(matrix);
		p.velocity.applyMatrix4_rotation(matrix);
	}

	p.velocity.multiplyScalar(Math.random() * this.speed.delta + this.speed.min);

	if (color) {
		this.emit_color(color);
	}
};

Cone_Emitter.prototype.emit_color = function (color) {
	color.copy(this.color);
};

function Sphere_Emitter(radius, speed) {
	__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].call(this);
	this.radius = radius || 1;
	this.speed = speed || 1;
	this.generator = new __WEBPACK_IMPORTED_MODULE_1__point_generators_js__["a" /* Point_Generators */].Sphere(radius);
	this.from_center = true;
	Object.defineProperty(this, 'radius', {
		configurable: true,
		enumerable: true,
		set: function (value) {
			radius = value;generator.radius = value;
		}
	});
}

Sphere_Emitter.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype);

_.copy_object(Sphere_Emitter.prototype, {
	constructor: Sphere_Emitter,
	emit: function (p, color, matrix) {
		if (this.from_center) {
			p.position.set(0, 0, 0);
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

function Star_Dust_Emitter() {
	__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].apply(this, arguments);
	this.start_position = new THREE.Vector3(0, 0, 0);
	this.end_position = new THREE.Vector3(1, 1, 1);
	this.delta = new THREE.Vector3(1, 1, 1);
	this.velocity = new THREE.Vector3(0, 0, 1);
}

Star_Dust_Emitter.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype);
Star_Dust_Emitter.prototype.constructor = Star_Dust_Emitter;
_.copy_object(Star_Dust_Emitter.prototype, {
	set_velocity: function (x, y, z) {
		this.velocity.set(x, y, z);
	},
	set_position_range: function (start, end) {
		this.start_position.copy(start);
		this.end_position.copy(end);
		this.delta.set(end.x - start.x, end.y - start.y, end.z - start.z);
	},
	get_position: function (vector) {
		vector.x = Math.random() * this.delta.x + this.start_position.x;
		vector.y = Math.random() * this.delta.y + this.start_position.y;
		vector.z = Math.random() * this.delta.z + this.start_position.z;
	},
	get_velocity: function (vector) {
		vector.x = this.velocity.x;
		vector.y = this.velocity.y;
		vector.z = this.velocity.z;
	},
	emit: function (p) {
		this.get_position(p.position);
		if (this.parent) {
			this.parent.localToWorld(p.position);
		}
		this.get_velocity(p.velocity);
	},
	toJSON: function () {
		var params = __WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype.toJSON.call(this, this);
		_.clone_field_list_one_level_recursion(this, params, ["velocity", "start_position", "end_position"]);
		var data = {
			"name": "Star_Dust_Emitter",
			"params": params
		};
		return data;
	},
	parse: function (json) {
		__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype.parse.call(this, json);
		this.set_position_range(json.start_position, json.end_position);
		this.velocity.copy(json.velocity);
	}

});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Star_Dust_Emitter", Star_Dust_Emitter);

function Star_Dust_Affector(end) {
	this.end = end || 0;
}

Star_Dust_Affector.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_3__particle_affector_js__["a" /* Particle_Affector */].prototype);
Star_Dust_Affector.prototype.constructor = Star_Dust_Affector;

_.copy_object(Star_Dust_Affector.prototype, {
	affect: function (dt, pdata, vert) {
		if (pdata.position.z > this.end) {
			return false;
		}
		return true;
	},
	toJSON: function () {
		var params = __WEBPACK_IMPORTED_MODULE_3__particle_affector_js__["a" /* Particle_Affector */].prototype.toJSON.call(this, this);
		params["end"] = this.end;
		var data = {
			"name": "Star_Dust_Affector",
			"params": params

		};
		return data;
	},
	parse: function (json) {
		__WEBPACK_IMPORTED_MODULE_3__particle_affector_js__["a" /* Particle_Affector */].prototype.parse(this, json);
		this.end = json.end;
	}
});

__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Register_Class("Star_Dust_Affector", Star_Dust_Affector);



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2RmNDc1N2UyZTdmMTVlZDRkYjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2UvbXlfbGliLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVfYWZmZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZV9lbWl0dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXNlL21vdXNlX2NhbWVyYV9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVzX3BvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS9ldmVudF9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2UvbW91c2VfaW50ZXJzZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2Uvc2ltcGxlX2NvbGxpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9ndWkvY29sb3JfcGlja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9ndWkvcGFydGljbGVzX3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9ndWkvcGFydGljbGVzX3Byb3BzLmpzIiwid2VicGFjazovLy8uL3NyYy9ndWkvdGV4dHVyZV9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL2NvbG9yX2RvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlX3NoYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZXNfbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL3BvaW50X2dlbmVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZV9tYWluX3dlYnBhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aV9tYWluX3dlYnBhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9hcHBsaWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS9hbmltYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXNlL2xvYWRpbmdfbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS9wYWNrYWdlX21hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2Uvc2NlbmVfc2VyaWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRpdG9yX3dlYnBhY2tfZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9ndWkvdnVlYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9taXhpbnMvY2FtZXJhX21peGluLmpzIiwid2VicGFjazovLy8uL3NyYy9taXhpbnMvdGhyZWVqc19taXhpbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9jdXN0b21fYWZmZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9jdXN0b21fZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL2ZvcmNlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL3Rlc3RfZW1pdHRlcnMuanMiXSwibmFtZXMiOlsiTXlfTGliIiwiVmlld3BvcnQiLCJPYmplY3RfQW5pbWF0aW9uIiwib2JqZWN0IiwiYW5pbWF0aW9uIiwicHJvdG90eXBlIiwidXBkYXRlIiwiZHQiLCJjcmVhdGVfdGV4dF9pbWFnZSIsIndpZHRoIiwiaGVpZ2h0IiwidGV4dCIsIm5wb3QiLCJiYWNrZ3JvdW5kIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dCIsImdldENvbnRleHQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImZvbnQiLCJmaWxsVGV4dCIsInRleHR1cmUiLCJUSFJFRSIsIlRleHR1cmUiLCJ3cmFwUyIsIndyYXBUIiwiVGV4dHVyZVdyYXBwaW5nIiwiQ2xhbXBUb0VkZ2VXcmFwcGluZyIsIm1pbkZpbHRlciIsIkxpbmVhckZpbHRlciIsIm5lZWRzVXBkYXRlIiwiQ3JlYXRlX1F1YWQiLCJ2ZXJ0ZXhfc2hhZGVyIiwiZnJhZ21lbnRfc2hhZGVyIiwicGxhbmUiLCJQbGFuZUJ1ZmZlckdlb21ldHJ5IiwibWF0ZXJpYWwiLCJTaGFkZXJNYXRlcmlhbCIsInZlcnRleFNoYWRlciIsImZyYWdtZW50U2hhZGVyIiwicXVhZCIsIk1lc2giLCJyb3RhdGlvbiIsInkiLCJNYXRoIiwiUEkiLCJSZW5kZXJfVGFyZ2V0IiwidGFyZ2V0IiwiV2ViR0xSZW5kZXJUYXJnZXQiLCJtYWdGaWx0ZXIiLCJOZWFyZXN0RmlsdGVyIiwiZm9ybWF0IiwiUkdCRm9ybWF0IiwiY2FtZXJhIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJyZW5kZXIiLCJzY2VuZSIsInJlbmRlcmVyIiwiY3JlYXRlX292ZXJsYXlfY2FtZXJhIiwiT3J0aG9ncmFwaGljQ2FtZXJhIiwiT3ZlcmxheSIsImF1dG9DbGVhciIsIk1vdXNlX0NvbnRyb2xsZXIiLCJyb290Iiwib3ZlciIsImNsaWNrIiwiY2FsbGJhY2siLCJldmVudF9odWIiLCJFdmVudF9IdWIiLCJldmVudHMiLCJhZGRfZXZlbnRfbGlzdGVuZXIiLCJuYW1lIiwiZnVuYyIsIm9iaiIsInB1c2giLCJvbiIsImVtaXQiLCJsaXN0ZW5lcnMiLCJpIiwibGVuZ3RoIiwidCIsImNhbGwiLCJydW5fZnVuY3Rpb24iLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiY3JlYXRlX3J1bl9mdW5jdGlvbiIsImFwcCIsInJ1biIsImxvb3AiLCJFdWxlcl9Db250cm9sbGVyIiwieCIsInoiLCJ4c3BlZWQiLCJ5c3BlZWQiLCJ6c3BlZWQiLCJSZWdpc3RlcmVkX0NsYXNzZXMiLCJSZWdpc3Rlcl9DbGFzcyIsImNvbnNvbGUiLCJsb2ciLCJHZXRfQ2xhc3MiLCJjcmVhdGVfY2xhc3MiLCJwYXJlbnQiLCJjaGlsZCIsInByb3BzIiwiT2JqZWN0IiwiY3JlYXRlIiwiXyIsImNvcHlfb2JqZWN0IiwiY29udHJ1Y3RvciIsIkFic3RyYWN0X0ZhYnJpYyIsImRhdGEiLCJjb25zdHJ1Y3RvciIsInR5cGUiLCJwYXJzZSIsInVuZGVmaW5lZCIsIlByaW50X0NsYXNzZXMiLCJrZXkiLCJQYXJ0aWNsZV9BZmZlY3RvciIsImlkIiwiZ2VuZXJhdGVVVUlEIiwiYWZmZWN0IiwicGRhdGEiLCJ2ZXJ0IiwiY29sb3IiLCJ0b0pTT04iLCJwYXJhbXMiLCJqc29uIiwiRm9yY2VfQWZmZWN0b3IiLCJmb3JjZXMiLCJBcnJheSIsImFkZF9mb3JjZSIsImZvcmNlIiwiYXBwbHlfZm9yY2VzIiwicGFydGljbGUiLCJhY2NlbGVyYXRpb24iLCJjYWxjIiwidmVsb2NpdHkiLCJ1dWlkIiwiZiIsIml0ZW0iLCJQYXJ0aWNsZV9FbWl0dGVyIiwiZW1pdF9wZXJfc2Vjb25kIiwiZW1pdF9kZWx0YSIsImVtaXRfY291bnQiLCJsaWZldGltZSIsImVtaXRfbGlmZSIsIm1pbiIsInJhbmRvbSIsIm1heCIsImNhbGNfZW1pdHRlZF9wYXJ0aWNsZXMiLCJuZWVkX2VtaXQiLCJmbG9vciIsInAiLCJjIiwibWF0cml4IiwicG9zaXRpb24iLCJzZXQiLCJhcHBseU1hdHJpeDQiLCJhcHBseU1hdHJpeDRfcm90YXRpb24iLCJNb3VzZV9DYW1lcmFfQ29udHJvbGxlciIsImVycm9yIiwic2V0X2NhbnZhc19pbmZvIiwib2Zmc2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInRvcCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwicmVmcmVzaF9jYW52YXMiLCJuZXdfY2FudmFzIiwiZ2V0X25vcm1hbGl6ZWRfc2NyZWVuX2Nvb3JkaW5hdGVzIiwidmVjdG9yIiwiVmVjdG9yMyIsImdldF9ub3JtYWxpemVfbW91c2VfcG9zaXRpb24iLCJldmVudCIsImNsaWVudFgiLCJjbGllbnRZIiwidW5wcm9qZWN0IiwiciIsImNvcHkiLCJnZXRfcmF5X2Zyb21fY2FtZXJhX2luX3NjcmVlbl9jb29yZGluYXRlcyIsInJheSIsIlJheSIsInN1YiIsIm5vcm1hbGl6ZSIsImdldF9yYXlfZnJvbV9jYW1lcmFfaW5fbW91c2VfcG9zaXRpb24iLCJQYXJ0aWNsZXNfUG9pbnRzIiwiZ2VvbWV0cnkiLCJQb2ludHMiLCJib3VuZGluZ1NwaGVyZSIsIlNwaGVyZSIsInJhZGl1cyIsImdldEJvdW5kaW5nU3BoZXJlIiwibWV0YSIsIm1hdCIsImdlb20iLCJPYmplY3QzRCIsInJheWNhc3QiLCJyYXljYXN0ZXIiLCJpbnRlcnNlY3RzIiwic3BoZXJlIiwibWF0cml4V29ybGQiLCJpbnRlcnNlY3RzU3BoZXJlIiwic2hpdCIsInRyIiwidG1wIiwiZGlzdGFuY2UiLCJzcXJ0IiwiZG90IiwicG9pbnQiLCJtYWluX2V2ZW50X2h1YiIsIk1vdXNlX0ludGVyc2VjdG9yIiwiZ2V0X25vcm1hbGl6ZWRfc2NyZWVuX2Nvb3JkcyIsIm1vdXNlX2Nvb3Jkc190b192ZWN0b3IiLCJtb3VzZV9jb29yZHNfdG9fcmF5IiwiZmluZF9pbnRlcnNlY3Rpb25fd2l0aF9tb3VzZV92ZWN0b3IiLCJSYXljYXN0ZXIiLCJpbnRlcnNlY3RPYmplY3RzIiwiZmluZF9pbnRlcnNlY3RlZF9vYmplY3QiLCJjb2xsaWRlciIsImNoZWNrX3JheSIsIlNpbXBsZV9Db2xsaWRlciIsInJlY3Vyc2l2ZSIsImNoZWNrX2ludmlzaWJsZSIsImludGVyc2VjdGVkX29iamVjdHMiLCJfdGVzdGVkX3NwaGVyZSIsInByZXBhcmVfY2hlY2siLCJpbnRlcnNlY3RlZF9tYXAiLCJfZmFrZWNhc3RlciIsImZpbmRfaW50ZXJzZWN0aW9uX3dpdGhfYm91bmRpbmdfc3BoZXJlIiwiYWRkX2ludGVyc2VjdGVkIiwiY2hlY2tfb2JqZWN0X2JvdW5kaW5nX3NwaGVyZSIsImNvbXB1dGVCb3VuZGluZ1NwaGVyZSIsInVwZGF0ZU1hdHJpeFdvcmxkIiwiaW50ZXIiLCJub25fY29sbGlkZWJsZSIsInZpc2libGUiLCJjaGlsZHJlbiIsIkNvbG9yX1BpY2tlciIsInZhbHVlIiwiZGVmYXVsdCIsImciLCJiIiwidGVtcGxhdGUiLCJuZXdfdmFsdWUiLCJtZXRob2RzIiwiY2hhbmdlZCIsIiRlbWl0IiwiUGFydGljbGVzX1BhbmVsIiwicGFydGljbGVzIiwidGV4dHVyZXMiLCJzZWxlY3RlZCIsIlN0cmluZyIsImZpcnN0X3RpbWUiLCJwYXJ0aWNsZV9wYXJhbXMiLCJteV9zZWxlY3RlZCIsInRleHR1cmVfcGFuZWxfaXNfdmlzaWJsZSIsImFkZF90b19zZWxlY3QiLCJjcmVhdGVfcGFydGljbGVzIiwicmVtb3ZlX3BhcnRpY2xlcyIsInNwbGljZSIsImNoYW5nZV9jb2xvcnMiLCJzaG93X3RleHR1cmVfcGFuZWwiLCJzZWxlY3RfcGFydGljbGVzIiwiZ2V0X3BhcnRpY2xlX3BhcmFtcyIsInBsYXkiLCJjcmVhdGVkIiwic2VsZiIsIiRvbiIsIndhdGNoIiwiYXJyIiwibmV3X3NlbGVjdGVkIiwiY29tcG9uZW50cyIsIlRleHR1cmVfUGFuZWwiLCJCbGVuZGluZ19TZWxlY3RvciIsInJlcXVpcmVkIiwic2VsZWN0IiwiYmxlbmRpbmciLCJCZWhhdmlvciIsImJlaGF2aW9yIiwic2hvd19iZWhhdmlvciIsIlBhcnRpY2xlX1BhcmFtcyIsImZpcmUiLCIkcGFyZW50IiwiUGFydGljbGVzX1Byb3BzIiwiYmxlbmRpbmdfY2hhbmdlIiwiZW1pdF9wYXJhbV9jaGFuZ2UiLCJjaGVja2VkIiwidXBkYXRlX2NvbG9yIiwic2VsZWN0ZWRfdGV4dHVyZSIsInRleHR1cmVfd2lkdGgiLCJ0ZXh0dXJlX2hlaWdodCIsInBhbmVsX3Zpc2libGUiLCJzaG93X3BhbmVsIiwiY2hvb3NlX3RleHR1cmUiLCJkcmF3X3RleHR1cmUiLCJhcHBseSIsIm9iamVjdF9pZCIsImdldF90ZXh0dXJlIiwidGV4dHVyZV9mb3JtYXRfdG9fc3RyaW5nIiwiaW1hZ2UiLCJuYXR1cmFsV2lkdGgiLCJuYXR1cmFsSGVpZ2h0IiwiJHJlZnMiLCJteV9kcmF3X2ltYWdlIiwiZ2V0X3RleHR1cmVfZnJvbV9wYXJ0aWNsZXMiLCJtb3VudGVkIiwiQ29sb3JfRG9tYWluIiwiQ29sb3IiLCJmaWxsIiwiVGFibGVfQ29sb3IiLCJ0YWJsZSIsImNvcHlfdGFibGUiLCJkZWZhdWx0X3RhYmxlIiwiaW5kZXgiLCJjZWlsIiwic3JjIiwiZ2V0IiwiUGFydGljbGVfU2hhZGVycyIsInZlcnRleCIsImpvaW4iLCJmcmFnbWVudCIsIlBhcnRpY2xlX1N5c3RlbSIsImNvbmZpZ19wYXJhbXMiLCJlbWl0dGVyIiwiYWZmZWN0b3IiLCJwYXJ0aWNsZV9saWZldGltZSIsImR5bmFtaWNfY29sb3IiLCJjb3VudCIsImNyZWF0ZV9wYXJ0aWNsZV9tYXRlcmlhbCIsIm5vZGUiLCJjcmVhdGVfcGFydGljbGVfZ2VvbWV0cnkiLCJib3VuZGluZ19yYWRpdXMiLCJub19mYWRlX2NvbG9yIiwicHJlX2FscGhhIiwiZGVwdGhfdGVzdCIsImRlcHRoX3dyaXRlIiwic2l6ZSIsImRpc2NyZXRlX2VtaXNzaW9uIiwiYXBwbHlfd29ybGRfbWF0cml4X29uX2VtaXQiLCJoYXNPd25Qcm9wZXJ0eSIsInNldF9uYW1lIiwic3VpY2lkZSIsInJlbW92ZSIsImNyZWF0ZV9wYXJ0aWNsZV9kYXRhIiwicGFydGljbGVfZGF0YSIsInZlcnRpY2VzIiwiRmxvYXQzMkFycmF5IiwiY29sb3JzIiwiY29sb3JfZG9tYWluIiwiQnVmZmVyQXR0cmlidXRlIiwic2V0RHluYW1pYyIsIkJ1ZmZlckdlb21ldHJ5IiwiYnVmZmVyIiwiYWRkQXR0cmlidXRlIiwiZGlzY3JldGVfZW1pdCIsImVtaXRfcGFydGljbGVzIiwidmVydHMiLCJhcnJheSIsIm9sZF9uZWVkX2VtaXQiLCJ1cGRhdGVfcGFydGljbGVfZ2VvbWV0cnkiLCJkdW1teV9jb2xvciIsImdlbmVyYXRlX21hdGVyaWFsX25hbWUiLCJteV9uYW1lIiwiYmxlbmRpbmdfbW9kZSIsIk9uZUZhY3RvciIsIlNyY0FscGhhRmFjdG9yIiwiT25lTWludXNTcmNBbHBoYUZhY3RvciIsImNvbnZlcnRfYmxlbmRpbmdfbW9kZSIsInRocmVlX2JsZW5kaW5nIiwiZmFjdG9ycyIsIk5vQmxlbmRpbmciLCJDdXN0b21CbGVuZGluZyIsInNldF90ZXh0dXJlIiwiVGV4dHVyZV9NYW5hZ2VyIiwidW5pZm9ybXMiLCJzcHJpdGUiLCJyZWNyZWF0ZV9tYXRlcmlhbCIsImNyZWF0ZV91bmlmb3JtcyIsIlZlY3RvcjIiLCJjYWxjX2RlZmluZXMiLCJkZWZpbmVzIiwic2VsZWN0X3RleHR1cmUiLCJibGVuZF9vYmoiLCJ0cmFuc3BhcmVudCIsImRlcHRoV3JpdGUiLCJkZXB0aFRlc3QiLCJibGVuZFNyYyIsImJsZW5kRHN0Iiwic2V0X3ByZV9hbHBoYSIsInNldF9wb2ludF9zaXplIiwic2V0X2JsZW5kaW5nIiwic2V0X2VtaXR0ZXIiLCJzZXRfcGFydGljbGVfbGlmZV9sZW5ndGgiLCJ2YWwiLCJzZXRfZW1pc3Npb25fcGVyX3NlY29uZCIsInNldF9wYXJ0aWNsZV9jb3VudCIsInNldF9jb2xvciIsInNldF9ib3VuZGluZ19zcGhlcmVfcmFkaXVzIiwiUGFydGljbGVfTWFuYWdlciIsInBhcnRpY2xlc19hcnJheSIsImFkZCIsInBzIiwiaW5kZXhPZiIsImdldF9wYXJ0aWNsZV9uYW1lcyIsIm5hbWVzIiwiY3JlYXRlX2J5X3BhcmFtcyIsImVtaXR0ZXJfZmFicmljIiwiYWZmZWN0b3JfZmFicmljIiwiZnJvbUpTT04iLCJKU09OIiwiZSIsImdldE9iamVjdEJ5TmFtZSIsImxvYWRfcGFydGljbGVzIiwiZ2V0T2JqZWN0QnlQcm9wZXJ0eSIsInJlcGxhY2Vfb2JqZWN0X3dpdGhfdGhpcyIsImNyZWF0ZV9uYW1lIiwibnVtYmVyIiwiYmVnaW5fbmFtZSIsInRlc3RpbmciLCJjcmVhdGVfbmV3IiwicGFydGljbGVfbWFuYWdlciIsIlBhcnRpY2xlc19Db25maWciLCJQb2ludF9HZW5lcmF0b3JzIiwiUmFuZG9tX0RpcmVjdGlvbiIsImdldF9kaXJlY3Rpb24iLCJnZXRfaW5uZXJfcG9pbnQiLCJhbHBoYSIsImJldGEiLCJjb3MiLCJzaW4iLCJnZXRfbm9ybWFsIiwiZ2V0X3BvaW50IiwibXVsdGlwbHlTY2FsYXIiLCJBcHBsaWNhdGlvbiIsImNvbmZpZyIsIl9saWZlY3ljbGVfZXZlbnQiLCJfaW5pdF90aW1lciIsIl9jcmVhdGVfbG9vcF9mdW5jdGlvbiIsIm1vdXNlX2NvbnRyb2xsZXJzIiwicmVtb3ZlX2FuaW1hdGVkX29iamVjdCIsInN0YXJ0IiwiX3NldF9jb25maWd1cmF0aW9uIiwiY2xvY2siLCJDbG9jayIsImRlbHRhX3RpbWUiLCJhbmltYXRlZF9vYmplY3RzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZ2V0X2RlZmF1bHRfY29uZmlndXJhdGlvbiIsIl9jcmVhdGVfcmVuZGVyIiwiZG9tX3NjcmVlbiIsImFsZXJ0IiwiZ2V0RWxlbWVudEJ5SWQiLCJkb21fZWxlbWVudCIsIldlYkdMUmVuZGVyZXIiLCJyZW5kZXJfcGFyYW1zIiwiYXBwZW5kQ2hpbGQiLCJkb21FbGVtZW50Iiwic2V0U2l6ZSIsInZpZXdwb3J0Iiwic2V0X3ZpZXdwb3J0Iiwic2V0Q2xlYXJDb2xvciIsImNsZWFyX2NvbG9yIiwiX2NyZWF0ZV9tYWluX3NjZW5lIiwicHJldmVudCIsIm1haW5fc2NlbmUiLCJTY2VuZSIsIm1haW5fY2FtZXJhIiwiZm92IiwiYXNwZWN0X3JhdGlvIiwibmVhciIsImZhciIsImFzcGVjdCIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJhcHBseV9jb25maWd1cmF0aW9uIiwiY29uZmlndXJhdGlvbiIsImxvYWRfY29uZmlndXJhdGlvbiIsInVybCIsInhociIsIlhIUkxvYWRlciIsImNvbmZpZ3VyYXRpb25faXNfYXBwbGllZCIsIm9ubG9hZCIsInByb2dyZXNzIiwic3RhdHVzIiwibG9hZCIsImRlZmF1bHRfY29uZmlnIiwiZXh0ZW5kIiwiY2hpbGRfZnVuYyIsIkNoaWxkIiwiYXJndW1lbnRzIiwiZXh0ZW5kX3Byb3RvIiwicHJvdG8iLCJkZWx0YSIsImdldERlbHRhIiwiZG9fdXBkYXRlIiwiYWRkX2FuaW1hdGVkX29iamVjdCIsInVwZGF0ZV9hbGwiLCJsZW4iLCJwcmVfdXBkYXRlIiwiYmVmb3JlX3VwZGF0ZSIsImNyZWF0ZV9tb3VzZV9tb3ZlX2xpc3RlbmVyIiwibW91c2VfbW92ZV9saXN0ZW5lciIsImZpbmRfbW91c2Vfb3Zlcl9pbnRlcnNlY3Rpb25zIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZF9tb3VzZV9jb250cm9sbGVyIiwiQmFzZV9BbmltYXRpb24iLCJ0aW1lIiwidGltZV9zY2FsZSIsInN0b3BwZWQiLCJzY2FsZWRfZHQiLCJjYWxjX2FuaW1hdGlvbiIsInN0b3AiLCJyZXNldCIsInBhcmFtIiwiRXVsZXJfQW5pbWF0aW9uIiwiU2NhbGVfQW5pbWF0aW9uIiwieHNjYWxlIiwieXNjYWxlIiwienNjYWxlIiwic2NhbGUiLCJmaXJzdCIsIkNoYWluX0xvYWRlciIsImxpc3QiLCJzdG9wX2J5X2Vycm9yIiwibmV4dCIsInJlc291cmNlIiwiaXRlbV9sb2FkZWQiLCJmaW5pc2hlZCIsImRvX2Vycm9yIiwib25lcnJvciIsImRvX3Byb2dyZXNzIiwib25wcm9ncmVzcyIsImxvYWRfZnVuYyIsInRlc3RfY2hhaW5fbG9hZGVyIiwiY2wiLCJMb2FkaW5nX01hbmFnZXIiLCJyZXNvdXJjZXMiLCJ0ZXh0dXJlX2xvYWRlciIsIlRleHR1cmVMb2FkZXIiLCJnZXRfYXN5bmMiLCJsb2FkX2xpc3QiLCJyZXNvdXJjZV9saXN0Iiwib25fbG9hZCIsIm9uX3Byb2dyZXNzIiwib25fcmVzb3VyY2VfbG9hZGVkIiwibG9hZF9saXN0X3RleHR1cmVzIiwibG9hZF9saXN0X2pzb24iLCJsb2FkZXIiLCJmcmVlIiwiUGFja2FnZV9NYW5hZ2VyIiwic3RhdGUiLCJkZWZhdWx0cyIsInBhcnNlX3BhY2thZ2VfZGVzY3JpcHRpb24iLCJwYWNrIiwibG9hZF9yZXNvdXJjZXMiLCJsb2FkZWQiLCJkYXRhX2xvYWRlZCIsIlNjZW5lX1NlcmlhbGl6ZXIiLCJhbmltYXRpb25fbGlicmFyeSIsImFuaW1zIiwiY29sbGVjdF9hbmltYXRpb25zIiwiY3JlYXRlX2FuaW1hdGlvbnMiLCJhbmltYXRpb25zIiwiYW5pbSIsImJpbmRfYW5pbWF0aW9ucyIsImFuaW1kYXRhIiwiYmluZGluZ3MiLCJjb3B5X2FuaW1hdGlvbnMiLCJiaW5kIiwiYW5pbV91dWlkIiwiYWRkX2FuaW1hdGlvbiIsImxvYWRfZnJvbV9qc29uIiwibyIsIk9iamVjdExvYWRlciIsIm15YW5pbWF0aW9ucyIsInNjZW5lX2xvYWRlZCIsImNyZWF0ZV92dWVfYXBwIiwiYXBwMiIsIlZ1ZSIsImVsIiwiTWl4aW4iLCJnZXRfZm9yd2FyZF9wbGFuZV9ieV9vYmplY3QiLCJzZXRGcm9tTWF0cml4Q29sdW1uIiwiZGlzdCIsIlBsYW5lIiwibmVnYXRlIiwiZ2V0X3JheV9mcm9tX3NjcmVlbl9jb29yZGluYXRlcyIsIm1jIiwiTWl4X0l0IiwibSIsImVsZW1lbnRzIiwiT2JqZWN0M0RfQW5pbWF0aW9uX01peGluIiwicmVtb3ZlX2FuaW1hdGlvbiIsIm9sZF90b0pzb24iLCJPYmplY3QzRF9TZXJpYWxpemF0aW9uX01peGluIiwic3RhbmRhcmRfc2VyaWFsaXphdGlvbiIsInN0cmluZ2lmeSIsInVzZXJEYXRhIiwiY2FzdFNoYWRvdyIsInJlY2VpdmVTaGFkb3ciLCJ0b0FycmF5IiwibWF0ZXJpYWxzIiwiZ2VvbWV0cmllcyIsImNvbGxlY3RfbWF0ZXJpYWxzIiwiY29sbGVjdF9nZW9tZXRyeSIsInRvSlNPTjEiLCJleHRyYWN0RnJvbUNhY2hlIiwiY2FjaGUiLCJ2YWx1ZXMiLCJtZXRhZGF0YSIsImlzUm9vdE9iamVjdCIsIm91dHB1dCIsImltYWdlcyIsInZlcnNpb24iLCJnZW5lcmF0b3IiLCJjb2xsZWN0X2FuaW1hdGlvbnNfcmVjdXJzaXZlIiwiZG1fbWFyayIsInNvdXJjZSIsInVwIiwicXVhdGVybmlvbiIsIm1hdHJpeEF1dG9VcGRhdGUiLCJtYXRyaXhXb3JsZE5lZWRzVXBkYXRlIiwiZnJ1c3R1bUN1bGxlZCIsInJlbmRlck9yZGVyIiwiQ3VzdG9tX0FmZmVjdG9yIiwiY3VzdG9tX2Z1bmMiLCJkdW1teSIsInRlc3RfZnVuYyIsInNldF9hZmZlY3RfZnVuY3Rpb24iLCJGdW5jdGlvbiIsInNvdXJjZV9jb2RlIiwic2V0X2FmZmVjdF9mdW5jIiwiQ3VzdG9tX0VtaXR0ZXIiLCJzZXRfZW1pdF9mdW5jdGlvbiIsInRlc3QiLCJQYXJ0aWNsZV9Gb3JjZXMiLCJGb3JjZSIsIkNvbnN0YW50X0ZvcmNlIiwiY3JlYXRlX2Nsb25lX29iamVjdCIsIkNvbmVfRW1pdHRlciIsIm9yaWdpbiIsImRpc3BlcnNpb24iLCJzcGVlZCIsImNsb25lX2ZpZWxkX2xpc3Rfb25lX2xldmVsX3JlY3Vyc2lvbiIsInNldF9kaXNwZXJzaW9uIiwic2V0X3NwZWVkIiwiZW1pdF9jb2xvciIsIlNwaGVyZV9FbWl0dGVyIiwiZnJvbV9jZW50ZXIiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJTdGFyX0R1c3RfRW1pdHRlciIsInN0YXJ0X3Bvc2l0aW9uIiwiZW5kX3Bvc2l0aW9uIiwic2V0X3ZlbG9jaXR5Iiwic2V0X3Bvc2l0aW9uX3JhbmdlIiwiZW5kIiwiZ2V0X3Bvc2l0aW9uIiwiZ2V0X3ZlbG9jaXR5IiwibG9jYWxUb1dvcmxkIiwiU3Rhcl9EdXN0X0FmZmVjdG9yIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7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QUFFVixhQUFVZTs7QUFGQSxHQUFYO0FBS0EsU0FBT2YsSUFBUDtBQUNBLEVBbEJ5QztBQW1CMUNHLFFBQU8sVUFBVWEsSUFBVixFQUNQO0FBQ0NULEVBQUEsZ0ZBQUFBLENBQWtCbEgsU0FBbEIsQ0FBNEI4RyxLQUE1QixDQUFrQyxJQUFsQyxFQUF3Q2EsSUFBeEM7QUFDQSxPQUFLbWhCLEdBQUwsR0FBV25oQixLQUFLbWhCLEdBQWhCO0FBQ0E7QUF2QnlDLENBQTNDOztBQTBCQSwrREFBQW5wQixDQUFPa0csY0FBUCxDQUFzQixvQkFBdEIsRUFBNENxakIsa0JBQTVDIiwiZmlsZSI6ImRldi5lZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjZGY0NzU3ZTJlN2YxNWVkNGRiOCIsIi8qXHJcbiovXHJcblxyXG5cclxudmFyIE15X0xpYiA9IHt9O1xyXG5cclxuTXlfTGliLlZpZXdwb3J0ID0ge307XHJcblxyXG5cclxuTXlfTGliLk9iamVjdF9BbmltYXRpb24gPSBmdW5jdGlvbiAob2JqZWN0LCBhbmltYXRpb24pXHJcbntcclxuXHR0aGlzLm9iamVjdCA9IG9iamVjdDtcclxuXHR0aGlzLmFuaW1hdGlvbiA9IGFuaW1hdGlvbjtcclxufVxyXG5cclxuTXlfTGliLk9iamVjdF9BbmltYXRpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdClcclxue1xyXG5cdHRoaXMuYW5pbWF0aW9uKHRoaXMub2JqZWN0LCBkdCk7XHJcbn1cclxuXHJcbk15X0xpYi5jcmVhdGVfdGV4dF9pbWFnZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCB0ZXh0LCBucG90LCBiYWNrZ3JvdW5kKSBcclxue1xyXG5cdC8vIGNyZWF0ZSBhIGNhbnZhcyBlbGVtZW50XHJcblx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5cdGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG5cdGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblx0dmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHRpZiAoYmFja2dyb3VuZCkgXHJcblx0e1xyXG5cdFx0Y29udGV4dC5maWxsU3R5bGUgPSBiYWNrZ3JvdW5kO1xyXG5cdFx0Y29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cdH1cclxuXHRjb250ZXh0LmZvbnQgPSBcIkJvbGQgNDBweCBBcmlhbFwiO1xyXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDAsMjU1LDAsMC45NSlcIjtcclxuICAgIGNvbnRleHQuZmlsbFRleHQoJ0hlbGxvLCB3b3JsZCEnLCAwLCA1MCk7XHJcbiAgICBcclxuXHQvLyBjYW52YXMgY29udGVudHMgd2lsbCBiZSB1c2VkIGZvciBhIHRleHR1cmVcclxuXHR2YXIgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlKGNhbnZhcykgXHJcblx0aWYgKG5wb3QpIHtcclxuXHRcdHRleHR1cmUud3JhcFMgPSB0ZXh0dXJlLndyYXBUID0gVEhSRUUuVGV4dHVyZVdyYXBwaW5nLkNsYW1wVG9FZGdlV3JhcHBpbmc7XHJcblx0XHR0ZXh0dXJlLm1pbkZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcclxuXHR9XHJcblx0dGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7IFx0XHJcblx0cmV0dXJuIHRleHR1cmU7XHJcbn1cclxuXHJcblxyXG5NeV9MaWIuQ3JlYXRlX1F1YWQgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgdmVydGV4X3NoYWRlciwgZnJhZ21lbnRfc2hhZGVyKVxyXG57XHJcblx0Ly9wbGFuZSBjcmVhdGVkIHR1cm4gYXdheSBmcm9tIGNhbWVyYVxyXG5cdHZhciBwbGFuZSA9IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KCB3aWR0aCwgaGVpZ2h0KTtcclxuXHRcclxuXHR2YXIgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHtcclxuXHRcdHZlcnRleFNoYWRlcjogdmVydGV4X3NoYWRlcixcclxuXHRcdGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudF9zaGFkZXJcclxuXHR9ICk7IFxyXG5cclxuXHR2YXIgcXVhZCA9IG5ldyBUSFJFRS5NZXNoKCBwbGFuZSwgbWF0ZXJpYWwgKTtcclxuXHRxdWFkLnJvdGF0aW9uLnkgPSBNYXRoLlBJO1xyXG5cdHJldHVybiBxdWFkO1xyXG59XHJcblxyXG5cclxuTXlfTGliLlJlbmRlcl9UYXJnZXQgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodClcclxue1xyXG5cdHRoaXMudGFyZ2V0ID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0KCBcclxuXHR3aWR0aCwgXHJcblx0aGVpZ2h0LCBcclxuXHR7IFxyXG5cdFx0bWluRmlsdGVyOiBUSFJFRS5MaW5lYXJGaWx0ZXIsIFxyXG5cdFx0bWFnRmlsdGVyOiBUSFJFRS5OZWFyZXN0RmlsdGVyLCBcclxuXHRcdGZvcm1hdDogVEhSRUUuUkdCRm9ybWF0IFxyXG5cdH0gKTsgXHJcblx0XHJcblx0dGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoODAsIHdpZHRoL2hlaWdodCwgMC4xLCAxMDAwKTtcclxufVxyXG5cclxuTXlfTGliLlJlbmRlcl9UYXJnZXQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChzY2VuZSwgcmVuZGVyZXIpXHJcbntcclxuXHRyZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBcclxuXHRcdHRoaXMuY2FtZXJhLCBcclxuXHRcdHRoaXMudGFyZ2V0LCBcclxuXHRcdHRydWUgIC8vZm9yY2VDbGVhclxyXG5cdFx0KTtcclxufVxyXG5cclxuXHJcbk15X0xpYi5jcmVhdGVfb3ZlcmxheV9jYW1lcmEgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodClcclxue1xyXG5cdHZhciBjYW1lcmEgPSAgbmV3IFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSggXHJcblx0XHR3aWR0aCAvIC0gMiwgXHJcblx0XHR3aWR0aCAvIDIsIFxyXG5cdFx0aGVpZ2h0IC8gMiwgXHJcblx0XHRoZWlnaHQgLy0gMiwgLTEwMDAwLCAxMDAwMCApO1xyXG5cdHJldHVybiBjYW1lcmE7XHJcbn1cclxuXHJcbk15X0xpYi5PdmVybGF5ID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpXHJcbntcclxuXHR0aGlzLmNhbWVyYSA9IE15X0xpYi5jcmVhdGVfb3ZlcmxheV9jYW1lcmEod2lkdGgsIGhlaWdodCk7XHJcbn1cclxuXHJcbk15X0xpYi5PdmVybGF5LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAocmVuZGVyZXIpXHJcbntcclxuXHRpZiAoIXRoaXMuc2NlbmUpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0XHJcblx0cmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2U7XHJcblx0cmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcclxuXHRyZW5kZXJlci5hdXRvQ2xlYXIgPSB0cnVlO1xyXG59XHJcblxyXG5cclxuTXlfTGliLk1vdXNlX0NvbnRyb2xsZXIgPSBmdW5jdGlvbiAocm9vdCwgb3ZlciwgY2xpY2ssIGNhbGxiYWNrKVxyXG57XHJcblx0dGhpcy5yb290ID0gcm9vdDtcclxuXHR0aGlzLm92ZXIgPSBvdmVyO1xyXG5cdHRoaXMuY2xpY2sgPSAhIWNsaWNrO1xyXG5cdHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxufVxyXG5cclxuXHJcblxyXG4vKlxyXG51Z2x5IGhhY2tcclxuKi9cclxuXHJcbk15X0xpYi5ldmVudF9odWIgPSBuZXcgRXZlbnRfSHViKCk7XHJcblxyXG5mdW5jdGlvbiBFdmVudF9IdWIoKSB7XHJcbiAgICB0aGlzLmV2ZW50cyA9IHt9O1xyXG59XHJcblxyXG5cclxuXHJcbkV2ZW50X0h1Yi5wcm90b3R5cGUuYWRkX2V2ZW50X2xpc3RlbmVyID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMsIG9iailcclxue1xyXG4gICAgaWYgKCF0aGlzLmV2ZW50c1tuYW1lXSkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzW25hbWVdID0gW107XHJcbiAgICB9XHJcbiAgICB0aGlzLmV2ZW50c1tuYW1lXS5wdXNoKCB7bmFtZTogbmFtZSwgZnVuYzogZnVuYywgb2JqOiBvYmp9ICk7XHJcbn1cclxuXHJcbkV2ZW50X0h1Yi5wcm90b3R5cGUub24gID0gRXZlbnRfSHViLnByb3RvdHlwZS5hZGRfZXZlbnRfbGlzdGVuZXI7XHJcblxyXG5FdmVudF9IdWIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihuYW1lLCBvYmopXHJcbntcclxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmV2ZW50c1tuYW1lXTtcclxuICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB0ID0gbGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICB0LmZ1bmMuY2FsbCh0Lm9iaiwgb2JqKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG52YXIgcnVuX2Z1bmN0aW9uID0gLy93aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xyXG5cdGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xyXG5cdH1cclxuXHJcblxyXG5NeV9MaWIuY3JlYXRlX3J1bl9mdW5jdGlvbiA9IGZ1bmN0aW9uIChhcHApIFxyXG57XHJcbiAgICBNeV9MaWIucnVuID0gZnVuY3Rpb24gKCkgeyBydW5fZnVuY3Rpb24oIGZ1bmN0aW9uICgpIHsgYXBwLmxvb3AoKTsgfSk7IH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuTXlfTGliLkV1bGVyX0NvbnRyb2xsZXIgPSBmdW5jdGlvbiAob2JqLCB4LCB5LCB6KVxyXG57XHJcblx0dGhpcy5vYmogPSBvYmo7XHJcblx0dGhpcy54c3BlZWQgPSB4ICogTWF0aC5QSSAvIDE4MDs7XHJcblx0dGhpcy55c3BlZWQgPSB5ICogTWF0aC5QSSAvIDE4MDs7XHJcblx0dGhpcy56c3BlZWQgPSB6ICogTWF0aC5QSSAvIDE4MDs7XHJcbn1cclxuXHJcbk15X0xpYi5FdWxlcl9Db250cm9sbGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpXHJcbntcclxuXHR0aGlzLm9iai5yb3RhdGlvbi54ICs9IHRoaXMueHNwZWVkICogZHQ7XHJcblx0dGhpcy5vYmoucm90YXRpb24ueSArPSB0aGlzLnlzcGVlZCAqIGR0O1xyXG5cdHRoaXMub2JqLnJvdGF0aW9uLnogKz0gdGhpcy56c3BlZWQgKiBkdDtcclxufVxyXG5cclxuLy9DbGFzcyBMaWJyYXJ5XHJcbk15X0xpYi5SZWdpc3RlcmVkX0NsYXNzZXMgPSB7fTtcclxuXHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyA9IGZ1bmN0aW9uIChuYW1lLCBmdW5jKVxyXG57XHJcblx0aWYgKE15X0xpYi5SZWdpc3RlcmVkX0NsYXNzZXNbbmFtZV0pe1xyXG5cdFx0Y29uc29sZS5sb2coXCJSZWdpc3RlciBDbGFzcyBFUlJPUiEgQ2xhc3Mgd2l0aCB0aGlzIG5hbWUgYWxyZWFkeSBleGlzdHMhXCIsIG5hbWUpO1xyXG5cdH1cclxuXHRNeV9MaWIuUmVnaXN0ZXJlZF9DbGFzc2VzW25hbWVdID0gZnVuYztcclxufVxyXG5cclxuTXlfTGliLkdldF9DbGFzcyA9IGZ1bmN0aW9uIChuYW1lKVxyXG57XHJcblx0cmV0dXJuIE15X0xpYi5SZWdpc3RlcmVkX0NsYXNzZXNbbmFtZV07XHJcbn1cclxuXHJcblxyXG5NeV9MaWIuY3JlYXRlX2NsYXNzID0gZnVuY3Rpb24ocGFyZW50LCBjaGlsZCwgcHJvcHMsIG5hbWUpXHJcbntcclxuICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICBjaGlsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudC5wcm90b3R5cGUpO1xyXG4gICAgfSBcclxuICAgIF8uY29weV9vYmplY3QoY2hpbGQucHJvdG90eXBlLCBwcm9wcyk7XHJcbiAgICBjaGlsZC5wcm90b3R5cGUuY29udHJ1Y3RvciA9IGNoaWxkOyAgICAgICAgICAgICAgICBcclxuICAgIE15X0xpYi5SZWdpc3Rlcl9DbGFzcyhjaGlsZCwgbmFtZSk7XHJcbn1cclxuXHJcbk15X0xpYi5BYnN0cmFjdF9GYWJyaWMgPSBmdW5jdGlvbiAoZGF0YSlcclxue1xyXG4gICAgdmFyIGNvbnN0cnVjdG9yID0gTXlfTGliLkdldF9DbGFzcyhkYXRhLnR5cGUpO1xyXG4gICAgaWYgKGNvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgdmFyIG9iamVjdCA9IG5ldyBjb25zdHJ1Y3RvcigpO1xyXG4gICAgICAgIG9iamVjdC5wYXJzZShkYXRhKTtcclxuICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuTXlfTGliLlByaW50X0NsYXNzZXMgPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICBmb3IodmFyIGtleSBpbiB0aGlzLlJlZ2lzdGVyZWRfQ2xhc3Nlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2xhc3MgcmVnaXN0ZXJlZCA6XCIsIGtleSwgdGhpcy5SZWdpc3RlcmVkX0NsYXNzZXNba2V5XSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBNeV9MaWIgfTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXNlL215X2xpYi5qcyIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuLi9iYXNlL215X2xpYi5qcyc7XHJcblxyXG4vL2Jhc2UgY2xhc3MgZm9yIHBhcnRpY2xlIGFmZmVjdG9yXHJcbmZ1bmN0aW9uIFBhcnRpY2xlX0FmZmVjdG9yKClcclxue1xyXG4gICAgdGhpcy5pZCA9IF8uZ2VuZXJhdGVVVUlEKCk7XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUuYWZmZWN0ID0gZnVuY3Rpb24gKGR0LCBwZGF0YSwgdmVydCwgY29sb3IpXHJcbntcclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIChjaGlsZClcclxue1xyXG5cdGlmIChjaGlsZCkge1xyXG5cdFx0cmV0dXJuIHt9O1xyXG5cdH1cclxuXHR2YXIgZGF0YSA9IHtcclxuICAgICAgICBpZDogdGhpcy5pZCxcclxuXHRcdFwibmFtZVwiOiBcIlBhcnRpY2xlX0FmZmVjdG9yXCIsXHJcblx0XHRwYXJhbXMgOiB7fVxyXG5cdH07XHJcbiAgICBpZiAoY2hpbGQpIHtcclxuICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgfVxyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAoanNvbilcclxue1xyXG59XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJQYXJ0aWNsZV9BZmZlY3RvclwiLCBQYXJ0aWNsZV9BZmZlY3Rvcik7XHJcblxyXG5mdW5jdGlvbiBGb3JjZV9BZmZlY3RvcigpXHJcbntcclxuICAgIFBhcnRpY2xlX0FmZmVjdG9yLmNhbGwodGhpcyk7XHJcblx0dGhpcy5mb3JjZXMgPSBuZXcgQXJyYXkoKTtcclxufVxyXG5cclxuRm9yY2VfQWZmZWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUpO1xyXG5cclxuXy5jb3B5X29iamVjdChGb3JjZV9BZmZlY3Rvci5wcm90b3R5cGUsIHtcclxuXHRjb25zdHJ1Y3RvcjogRm9yY2VfQWZmZWN0b3IsXHJcblx0YWRkX2ZvcmNlOiBmdW5jdGlvbiAoZm9yY2UpXHJcblx0e1xyXG5cdFx0dGhpcy5mb3JjZXMucHVzaChmb3JjZSk7XHJcblx0fSxcclxuXHRhcHBseV9mb3JjZXM6IGZ1bmN0aW9uIChkdCwgcGFydGljbGUsIHZlcnQsIGNvbG9yKVxyXG5cdHtcclxuXHRcdHZhciBhY2NlbGVyYXRpb24gPSB7eDowLCB5OjAsIHo6MH07XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5mb3JjZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5mb3JjZXNbaV0uY2FsYyhkdCwgcGFydGljbGUsIGFjY2VsZXJhdGlvbik7XHJcblx0XHR9XHJcblx0XHQvL2ludGVncmF0ZVxyXG5cdFx0cGFydGljbGUudmVsb2NpdHkueCArPSBhY2NlbGVyYXRpb24ueCAqIGR0O1xyXG5cdFx0cGFydGljbGUudmVsb2NpdHkueSArPSBhY2NlbGVyYXRpb24ueSAqIGR0O1xyXG5cdFx0cGFydGljbGUudmVsb2NpdHkueiArPSBhY2NlbGVyYXRpb24ueiAqIGR0O1xyXG5cdH0sXHJcblx0YWZmZWN0OiBmdW5jdGlvbiAoZHQsIHBhcnRpY2xlLCB2ZXJ0LCBjb2xvcilcclxuXHR7XHJcblx0XHR0aGlzLmFwcGx5X2ZvcmNlcyhkdCwgcGFydGljbGUsIHZlcnQsIGNvbG9yKTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0sXHJcblx0dG9KU09OOiBmdW5jdGlvbiAoY2hpbGQpXHJcblx0e1xyXG5cdFx0dmFyIGRhdGEgPSB7fTtcclxuXHRcdGRhdGEubmFtZSA9IFwiRm9yY2VfQWZmZWN0b3JcIjtcdFx0XHJcbiAgICAgICAgZGF0YS51dWlkID0gdGhpcy51dWlkO1xyXG5cdFx0ZGF0YS5wYXJhbXMgPSBQYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdGhpcyk7XHJcblx0XHRpZiAodGhpcy5mb3JjZXMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRkYXRhLnBhcmFtcy5mb3JjZXMgPSBuZXcgQXJyYXkoKTtcclxuXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZm9yY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0ZGF0YS5wYXJhbXMuZm9yY2VzLnB1c2goIHRoaXMuZm9yY2VzW2ldLnRvSlNPTigpICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH0sXHJcblx0cGFyc2U6IGZ1bmN0aW9uIChqc29uKVxyXG5cdHtcclxuXHRcdHZhciBmLCBpdGVtO1xyXG5cdFx0aWYgKGpzb24uZm9yY2VzKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdGZvcih2YXIgaSA9MDsgaSA8IGpzb24uZm9yY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aXRlbSA9IGpzb24uZm9yY2VzW2ldO1xyXG5cdFx0XHRcdGYgPSBNeV9MaWIuR2V0X0NsYXNzKGl0ZW0ubmFtZSk7XHJcblx0XHRcdFx0aWYgKGYpIHtcclxuXHRcdFx0XHRcdGYgPSBuZXcgZigpO1xyXG5cdFx0XHRcdFx0Zi5wYXJzZShpdGVtKTtcclxuXHRcdFx0XHRcdHRoaXMuYWRkX2ZvcmNlKGYpO1xyXG5cdFx0XHRcdH0gXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiRm9yY2VfQWZmZWN0b3JcIiwgRm9yY2VfQWZmZWN0b3IpO1xyXG5cclxuZXhwb3J0IHsgUGFydGljbGVfQWZmZWN0b3IsIEZvcmNlX0FmZmVjdG9yIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZV9hZmZlY3Rvci5qcyIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuLi9iYXNlL215X2xpYi5qcyc7XHJcblxyXG4vL0Jhc2UgY2xhc3MgZm9yIFBhcnRpY2xlIEVtaXR0ZXJzXHJcbmZ1bmN0aW9uIFBhcnRpY2xlX0VtaXR0ZXIoZW1pdF9wZXJfc2Vjb25kKVxyXG57XHJcbiAgICB0aGlzLnV1aWQgPSBfLmdlbmVyYXRlVVVJRCgpO1xyXG4gICAgdGhpcy5uYW1lID0gJyc7XHJcblx0dGhpcy5lbWl0X2RlbHRhID0gMDtcclxuXHR0aGlzLmVtaXRfY291bnQgPSAwO1xyXG5cdHRoaXMuZW1pdF9wZXJfc2Vjb25kID0gZW1pdF9wZXJfc2Vjb25kIHx8IDU7XHJcblx0Ly9saW5lYXIgaW50ZXJwb2xhdGlvbiA9IG1pbiArIHJhbmRvbSAqIChtYXgtbWluKVx0XHJcblx0dGhpcy5saWZldGltZSA9IHtcIm1pblwiOiAwLCBcIm1heFwiOjIuMH07XHJcbn1cclxuXHJcblBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLmVtaXRfbGlmZSA9IGZ1bmN0aW9uICgpXHJcbntcclxuXHRyZXR1cm4gdGhpcy5saWZldGltZS5taW4gKyBNYXRoLnJhbmRvbSgpICogKHRoaXMubGlmZXRpbWUubWF4IC0gdGhpcy5saWZldGltZS5taW4pO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS5jYWxjX2VtaXR0ZWRfcGFydGljbGVzID0gZnVuY3Rpb24gKGR0KVxyXG57XHJcblx0Ly9jb3VudCBwYXJ0aWNsZXMgbmVlZCBlbWl0XHJcblx0dGhpcy5lbWl0X2RlbHRhICs9IHRoaXMuZW1pdF9wZXJfc2Vjb25kKmR0O1xyXG5cdHZhciBuZWVkX2VtaXQgPSBNYXRoLmZsb29yKHRoaXMuZW1pdF9kZWx0YSk7XHJcblx0aWYgKG5lZWRfZW1pdCA+IDApIHtcclxuXHRcdHRoaXMuZW1pdF9kZWx0YSAtPSBuZWVkX2VtaXQ7XHJcblx0XHQvL3RoaXMuZW1pdF9jb3VudCArPSBuZWVkX2VtaXQ7XHJcblx0XHQvL25lZWRfZW1pdCA9IHRoaXMuZW1pdF9jb3VudDtcclxuXHR9XHJcblx0cmV0dXJuIG5lZWRfZW1pdDtcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAocCwgYywgbWF0cml4KVxyXG57XHJcbiAgICBwLnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcclxuICAgIHAudmVsb2NpdHkuc2V0KDAsIDEsIDApO1xyXG4gICAgXHJcbiAgICBpZiAobWF0cml4KSB7XHJcbiAgICAgICAgcC5wb3NpdGlvbi5hcHBseU1hdHJpeDQobWF0cml4KTtcclxuICAgICAgICBwLnZlbG9jaXR5LmFwcGx5TWF0cml4NF9yb3RhdGlvbihtYXRyaXgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKGNoaWxkKVxyXG57XHJcblx0dmFyIHBhcmFtcyA9IHtcclxuICAgICAgICBcInV1aWRcIjogdGhpcy51dWlkLFxyXG5cdFx0XCJlbWl0X3Blcl9zZWNvbmRcIjogdGhpcy5lbWl0X3Blcl9zZWNvbmQsXHJcblx0XHRcImxpZmV0aW1lXCI6IHtcclxuXHRcdFx0XCJtaW5cIjogdGhpcy5saWZldGltZS5taW4sXHJcblx0XHRcdFwibWF4XCI6IHRoaXMubGlmZXRpbWUubWF4XHJcblx0XHR9LFxyXG5cdH07XHJcbiAgICBpZiAodGhpcy5uYW1lKSB7XHJcbiAgICAgICAgcGFyYW1zLm5hbWUgPSB0aGlzLm5hbWU7XHJcbiAgICB9XHJcblx0aWYgKGNoaWxkKSB7XHJcblx0XHRyZXR1cm4gcGFyYW1zO1xyXG5cdH1cclxuXHR2YXIgZGF0YSA9IHt9O1xyXG5cdGRhdGEubmFtZSA9IFwiUGFydGljbGVfRW1pdHRlclwiO1xyXG5cdGRhdGEucGFyYW1zID0gcGFyYW1zO1x0XHJcblx0cmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcblBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKGRhdGEpXHJcbntcclxuXHR0aGlzLmVtaXRfcGVyX3NlY29uZCA9IGRhdGEuZW1pdF9wZXJfc2Vjb25kO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy51dWlkID0gZGF0YS51dWlkIHx8IF8uZ2VuZXJhdGVVVUlEKCk7XHJcblx0Xy5jb3B5X29iamVjdCh0aGlzLmxpZmV0aW1lLCBkYXRhLmxpZmV0aW1lKTtcclxufVxyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiUGFydGljbGVfRW1pdHRlclwiLCBQYXJ0aWNsZV9FbWl0dGVyKTtcclxuXHJcbmV4cG9ydCB7IFBhcnRpY2xlX0VtaXR0ZXIgfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZV9lbWl0dGVyLmpzIiwiLy9VbmZvcnR1bmF0ZWx5LCBjYW52YXMgcHJvcGVydGllcyBjYW4gY2hhbmdlIHBlcm1hbmVudHkuIFxyXG4vL0JlY2F1c2UsIHlvdSBuZWVkIGRvIHJlZnJlc2hfY2FudmFzIG9uIGVhY2ggY2FsbCFcclxuLy9lYWNoIHRpbWUgeW91IG5lZWQgcmVjYWNsIEJvdW5kaW5nUmVjdCBhbmQgY2xpZW50UmVjdCBvZiB0aGUgZnVja2luZyBjYW52YXNcclxuLy9hbHNvLCBjYW1lcmEgbWF5IGJlIG5vdCB0aGF0IGNhbWVyYSwgd2hvIHJlbmRlciBzY2VuZS4gaXQgbWF5IGJlIG90aGVyIGNhbWVyYVxyXG4vL2JlY2F1c2UgeW91IG5lZWQgcmVmcmVzaCBjYW1lcmEgb24gZWFzaCBjYWxsXHJcbi8vaSBjb3VsZCBkb25lIHRoaXMgbm9ybWFsIGZ1bmN0aW9uLCBidXQgdGhpcyBvYmplY3QgbWF5IGRvIGRpZmZlcmVudCBqb2JcclxuLy90aGlzIGlzIHNpbmdsZS10aW1lIG9iamVjdFxyXG4vL2l0IGVhc3kgZWNvbm9teWZ5IG51bWJlciBvZiBhcmd1bWVudHMgb24gY2FsbGluZyBmdW5jdGlvbnNcclxuXHJcbi8vbm90LCB0aGlzIGNsYXNzIGRvZXNuJ3Qgc3RvcmUgcmVmZXJlbmNlIHRvIGNhbnZhcywgXHJcbi8vdGhpcyBzdG9yZSBvbmx5IGluZm9ybWF0aW9uIGFib3V0IGNhbnZhcyBzaXplIGFuZCBwb3NpdGlvbiBcclxuLy9pLmUuIEJvdW5kaW5nQ2xpZW50UmVjdCBhbmQgY2xpZW50V2lkdGgsY2xpZW50SGVpZ2h0XHJcbi8veWVzLCB0aGlzIGNsYXNzIHN0b3JlIHJlZmVyZW5jZSB0byBjYW1lcmFcclxuXHJcbi8vcHJvYmFibHksIGl0IG1heSBiZSBtaXhpbiB0byBjYW1lcmFcclxuXHJcblxyXG5mdW5jdGlvbiBNb3VzZV9DYW1lcmFfQ29udHJvbGxlcihjYW52YXMsIGNhbWVyYSlcclxue1xyXG4gICAgaWYgKGNhbnZhcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk1vdXNlX0NhbWVyYV9Db250cm9sbGVyLiBQcm9wYWJsZSBwcmVtb3JkaWFsIGNyZWF0aW5nIG9iamVjdC4gY2FudmFzIGlzIHVuZGVmaW5lZC4gRG8gbm90aGluZ1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZXRfY2FudmFzX2luZm8oY2FudmFzKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xyXG59XHJcblxyXG5fLmNvcHlfb2JqZWN0KE1vdXNlX0NhbWVyYV9Db250cm9sbGVyLnByb3RvdHlwZSx7XHJcbiAgICBjb25zdHJ1Y3RvciA6IE1vdXNlX0NhbWVyYV9Db250cm9sbGVyLFxyXG4gICAgc2V0X2NhbnZhc19pbmZvOiBmdW5jdGlvbiAoY2FudmFzKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBvZmZzZXQgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxlZnQ6IG9mZnNldC5sZWZ0LFxyXG4gICAgICAgICAgICB0b3AgOiBvZmZzZXQudG9wXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcclxuICAgIH0sXHJcbiAgICByZWZyZXNoX2NhbnZhczogZnVuY3Rpb24gKG5ld19jYW52YXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXRfY2FudmFzX2luZm8obmV3X2NhbnZhcyk7XHJcbiAgICB9XHJcbiAgICAsXHJcbiAgICBnZXRfbm9ybWFsaXplZF9zY3JlZW5fY29vcmRpbmF0ZXM6IGZ1bmN0aW9uICh4LHkpXHJcbiAgICB7XHJcbiAgICAgICAgLy9zdGVwIDEgOiBub3JtYWxpemVkXHJcbiAgICAgICAgeCA9ICh4IC0gdGhpcy5vZmZzZXQubGVmdCkgLyB0aGlzLndpZHRoO1xyXG4gICAgICAgIHkgPSAoeSAtIHRoaXMub2Zmc2V0LnRvcCkgLyB0aGlzLmhlaWdodDtcclxuICAgICAgICAvL3N0ZXAgMiA6IGZyb20gdW5zaWduZWQgdG8gc2lnbmVkLCB0cmFuc2xhdGUgb3JpZ2luIGZyb20gdG9wIGxlZnQgY29ybmVyIHRvIGNlbnRlciBcclxuICAgICAgICB2YXIgeCA9IHggKiAyLjAgLSAxLjA7XHJcbiAgICAgICAgdmFyIHkgPSAtKHkgKiAyLjAgLSAxLjApO1xyXG4gICAgICAgIHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMyggeCwgeSwgMSApO1xyXG4gICAgICAgIHJldHVybiB2ZWN0b3I7ICAgICAgICBcclxuICAgIH0sXHJcbiAgICBcclxuICAgIC8vZG8gc29tZSB3aGF0IHByZXZlbnQgbWV0aG9kLCBvbmx5IGdpdmUgbW91c2UgZXZlbnQgaW5zdGVhZCB4LHkgY29vcmRpYW50ZXNcclxuICAgIGdldF9ub3JtYWxpemVfbW91c2VfcG9zaXRpb246IGZ1bmN0aW9uIChldmVudCkgXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X25vcm1hbGl6ZWRfc2NyZWVuX2Nvb3JkaW5hdGVzKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgLy9yZXR1cm4gbmV3IHVucHJvamVjdCB2ZWN0b3IsIG5vdCBjaGFuZ2UgZ2l2ZW5cclxuICAgIC8vdXNlZCBUSFJFRS5WZWN0b3IzLnVucHJvamVjdCBtZXRob2RcclxuICAgIC8vaW5jbHVkaW5nIGFwcGx5IGludmVyIGNhbWVyYSBtYXRyaXhcclxuICAgIC8vb24gbXkgdmlldywgdGhhdCB3cm9uZywgYmVjYXVzZSBtZXRob2QgZG8gaXQgYmlnIHRoZW4gcHJvbWlzZVxyXG4gICAgLy91bnByb2plY3QgbXVzdCBkbyBvbmx5IHVucHJvamVjdCwgbm90IGVsc2UgdGhpbmdcclxuICAgIC8vYmVjYXVzZSBteSBuZWVkIG5ldyBtZXRob2QsIHdobyB3aWxsIGRvIG9ubHkgdW5wcm9qZWN0IFxyXG4gICAgdW5wcm9qZWN0OiBmdW5jdGlvbih2ZWN0b3IpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgICAgIHIuY29weSh2ZWN0b3IpO1xyXG4gICAgICAgIHIudW5wcm9qZWN0KHRoaXMuY2FtZXJhKTtcclxuICAgICAgICAvL3RoaXMgYXJlYWR5IGRvbmUgXHJcbiAgICAgICAgLy9yLmFwcGx5TWF0cml4NChjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlKTsgICAgXHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBcclxuICAgIC8vZ2V0IHJheSB3aXRoIG9yaWdpbiBpbiBjYW1lcmEgcG9zaXRpb24gYW5kIGRpcmVjdGlvbiwgXHJcbiAgICAvL3BvaW50ZWQgdG8gZmFyIGF3YXkgd2hlcmUgdW5wcm9qZWN0IHNjcmVlbiBwb2ludCBhcmVcclxuICAgIGdldF9yYXlfZnJvbV9jYW1lcmFfaW5fc2NyZWVuX2Nvb3JkaW5hdGVzOiBmdW5jdGlvbiAoeCx5KSBcclxuICAgIHtcclxuICAgICAgICB2YXIgdmVjdG9yID0gdGhpcy5nZXRfbm9ybWFsaXplZF9zY3JlZW5fY29vcmRpbmF0ZXMoeCx5KTtcclxuICAgICAgICB2ZWN0b3IgPSB0aGlzLnVucHJvamVjdCh2ZWN0b3IpO1xyXG4gICAgICAgIHZhciByYXkgPSBuZXcgVEhSRUUuUmF5KCB0aGlzLmNhbWVyYS5wb3NpdGlvbiwgdmVjdG9yLnN1YiggdGhpcy5jYW1lcmEucG9zaXRpb24gKS5ub3JtYWxpemUoKSApO1xyXG4gICAgICAgIHJldHVybiByYXk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvL2RvIHNhbWUgd2hhdCBwcmV2ZW50IG1ldGhvZCwgb25seSBnaXZlIG1vdXNlIGV2ZW50IGZvciBjb252aWVuY2VcclxuICAgIC8vc2VlIGl0IGFzIG92ZXJyaWRpbmcgZnVuY3Rpb24gaW4gQysrXHJcbiAgICBnZXRfcmF5X2Zyb21fY2FtZXJhX2luX21vdXNlX3Bvc2l0aW9uOiBmdW5jdGlvbiAoZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3JheV9mcm9tX2NhbWVyYV9pbl9zY3JlZW5fY29vcmRpbmF0ZXMoZXZlbnQueCwgZXZlbnQueSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbn0pO1xyXG5cclxuXHJcbmV4cG9ydCB7IE1vdXNlX0NhbWVyYV9Db250cm9sbGVyIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Jhc2UvbW91c2VfY2FtZXJhX2NvbnRyb2xsZXIuanMiLCIgICAgXHJcbmZ1bmN0aW9uIFBhcnRpY2xlc19Qb2ludHMgKGdlb21ldHJ5LCBtYXRlcmlhbClcclxue1xyXG4gICAgVEhSRUUuUG9pbnRzLmNhbGwodGhpcywgZ2VvbWV0cnksIG1hdGVyaWFsKTtcclxuICAgIHRoaXMudHlwZSA9ICdwYXJ0aWNsZXNfcG9pbnRzJztcclxuICAgIFxyXG4gICAgdGhpcy5ib3VuZGluZ1NwaGVyZSA9IG5ldyBUSFJFRS5TcGhlcmUoKTtcclxuICAgIHRoaXMuYm91bmRpbmdTcGhlcmUucmFkaXVzID0gMTAuMDtcclxufVxyXG5cclxuUGFydGljbGVzX1BvaW50cy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUSFJFRS5Qb2ludHMucHJvdG90eXBlIClcclxuXHJcblBhcnRpY2xlc19Qb2ludHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUGFydGljbGVzX1BvaW50cztcclxuXHJcblBhcnRpY2xlc19Qb2ludHMucHJvdG90eXBlLmdldEJvdW5kaW5nU3BoZXJlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5ib3VuZGluZ1NwaGVyZTtcclxufVxyXG5cclxuUGFydGljbGVzX1BvaW50cy5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKG1ldGEpXHJcbntcclxuICAgIHZhciBtYXQgPSB0aGlzLm1hdGVyaWFsO1xyXG4gICAgdmFyIGdlb20gPSB0aGlzLmdlb21ldHJ5O1xyXG4gICAgdGhpcy5tYXRlcmlhbCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZ2VvbWV0cnkgPSB1bmRlZmluZWQ7XHJcbiAgICB2YXIgb2JqZWN0ID0gIFRIUkVFLk9iamVjdDNELnByb3RvdHlwZS50b0pTT04uY2FsbCh0aGlzLCBtZXRhKTtcclxuICAgIHRoaXMubWF0ZXJpYWwgPSBtYXQ7XHJcbiAgICB0aGlzLmdlb21ldHJ5ID0gZ2VvbTtcclxuICAgIHJldHVybiBvYmplY3Q7XHJcbn1cclxuXHJcbi8vV1RGP1xyXG5QYXJ0aWNsZXNfUG9pbnRzLnByb3RvdHlwZS5yYXljYXN0ID0gZnVuY3Rpb24gKHJheWNhc3RlciwgaW50ZXJzZWN0cylcclxue1xyXG4gICAgdmFyIHNwaGVyZSA9IG5ldyBUSFJFRS5TcGhlcmUoKVxyXG4gICAgc3BoZXJlLmNvcHkoIHRoaXMuYm91bmRpbmdTcGhlcmUgKTtcclxuICAgIHNwaGVyZS5hcHBseU1hdHJpeDQoIHRoaXMubWF0cml4V29ybGQgKTsgXHJcbiAgICB2YXIgciA9IHJheWNhc3Rlci5yYXkuaW50ZXJzZWN0c1NwaGVyZSggc3BoZXJlICk7XHJcbiAgICBpZiAoIHIgPT09IGZhbHNlICkgcmV0dXJuO1xyXG4gICAgY29uc29sZS5sb2coXCJJTlRFUlNFQ1RJT04xXCIsIHRoaXMubmFtZSwgc3BoZXJlKTtcclxuICAgIHJldHVybjtcclxuICAgIFxyXG4gICAgdmFyIHNoaXQgID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxuICAgIHNoaXQuY29weSh0aGlzLnBvc2l0aW9uKTtcclxuICAgIHZhciB0ciA9IG5ldyBUSFJFRS5SYXkoIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDIwKSwgc2hpdCk7XHJcbiAgICBjb25zb2xlLmxvZyhcInRlc3QgXCIsIHRyLmludGVyc2VjdHNTcGhlcmUoc3BoZXJlKSwgc3BoZXJlKTtcclxuICAgIGNvbnNvbGUubG9nKFwiaGl0IHNwaGVyZSBcIiAgKyB0aGlzLm5hbWUsIHNwaGVyZSwgcmF5Y2FzdGVyLnJheSk7XHJcbiAgICByZXR1cm4gcmF5Y2FzdGVyLnJheS5pbnRlcnNlY3RzU3BoZXJlKCBzcGhlcmUgKTtcclxuICAgIFxyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZyhcImhpdCBzcGhlcmUgXCIgKyB0aGlzLnR5cGUsIFwic2hwZXJlIGlzIFwiLCBzcGhlcmUsIFwicmF5IGlzIFwiLCByKTtcclxuICAgIGlmIChyKSB7XHJcbiAgICAgICAgICAgIHZhciB0bXAgPSBuZXcgVEhSRUUuVmVjdG9yMyh0aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdG1wLnN1YihyKTtcclxuICAgXHRcdFx0aW50ZXJzZWN0cy5wdXNoKCB7XHJcblx0XHRcdFx0ZGlzdGFuY2U6IE1hdGguc3FydCggdG1wLmRvdCh0bXApICksXHJcblx0XHRcdFx0cG9pbnQ6IHRoaXMucG9zaXRpb24sXHJcblx0XHRcdFx0b2JqZWN0OiB0aGlzXHJcblx0XHRcdH0gKTsgXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQge1BhcnRpY2xlc19Qb2ludHN9O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlc19wb2ludHMuanMiLCJmdW5jdGlvbiBFdmVudF9IdWIoKSB7XHJcbiAgICB0aGlzLmV2ZW50cyA9IHt9O1xyXG59XHJcblxyXG5cclxuXHJcbkV2ZW50X0h1Yi5wcm90b3R5cGUuYWRkX2V2ZW50X2xpc3RlbmVyID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMsIG9iailcclxue1xyXG4gICAgaWYgKCF0aGlzLmV2ZW50c1tuYW1lXSkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzW25hbWVdID0gW107XHJcbiAgICB9XHJcbiAgICB0aGlzLmV2ZW50c1tuYW1lXS5wdXNoKCB7bmFtZTogbmFtZSwgZnVuYzogZnVuYywgb2JqOiBvYmp9ICk7XHJcbn1cclxuXHJcbkV2ZW50X0h1Yi5wcm90b3R5cGUub24gID0gRXZlbnRfSHViLnByb3RvdHlwZS5hZGRfZXZlbnRfbGlzdGVuZXI7XHJcblxyXG5FdmVudF9IdWIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihuYW1lLCBvYmopXHJcbntcclxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmV2ZW50c1tuYW1lXTtcclxuICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB0ID0gbGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICB0LmZ1bmMuY2FsbCh0Lm9iaiwgb2JqKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBtYWluX2V2ZW50X2h1YiA9IG5ldyBFdmVudF9IdWIoKTtcclxuXHJcbmV4cG9ydCB7bWFpbl9ldmVudF9odWIsIEV2ZW50X0h1Yn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Jhc2UvZXZlbnRfaHViLmpzIiwidmFyIE1vdXNlX0ludGVyc2VjdG9yID0ge307XHJcblxyXG5pbXBvcnQge1NpbXBsZV9Db2xsaWRlcn0gZnJvbSBcIi4vc2ltcGxlX2NvbGxpZGVyLmpzXCI7XHJcbmltcG9ydCB7TW91c2VfQ2FtZXJhX0NvbnRyb2xsZXJ9IGZyb20gJy4vbW91c2VfY2FtZXJhX2NvbnRyb2xsZXIuanMnO1xyXG5cclxuXHJcbk1vdXNlX0ludGVyc2VjdG9yLmdldF9ub3JtYWxpemVkX3NjcmVlbl9jb29yZHMgPSBmdW5jdGlvbiAoY2FudmFzLCB4LCB5KVxyXG57XHJcblx0dmFyIG9mZnNldCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHR2YXIgd2lkdGggPSBjYW52YXMuY2xpZW50V2lkdGg7XHJcblx0dmFyIGhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XHJcbiAgICAvL25vcm1hbGl6ZSBjb29yZGluYXRlc1xyXG4gICAgdmFyIHggPSAoeCAtIG9mZnNldC5sZWZ0KSAvIHdpZHRoO1xyXG4gICAgdmFyIHkgPSAoeSAtIG9mZnNldC50b3ApIC8gaGVpZ2h0O1xyXG5cdHZhciB4ID0geCAqIDIgLSAxO1xyXG5cdHZhciB5ID0gLSh5ICogMiAtIDEpO1xyXG5cdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMyggeCwgeSwgMSApO1xyXG5cdHJldHVybiB2ZWN0b3I7XHJcbn1cclxuXHJcbk1vdXNlX0ludGVyc2VjdG9yLm1vdXNlX2Nvb3Jkc190b192ZWN0b3IgPSBmdW5jdGlvbiAoY2FudmFzLCBldmVudCkgXHJcbntcclxuICAgIHJldHVybiB0aGlzLmdldF9ub3JtYWxpemVkX3NjcmVlbl9jb29yZHMoY2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxufVxyXG5cclxuXHJcbk1vdXNlX0ludGVyc2VjdG9yLnVucHJvamVjdCA9IGZ1bmN0aW9uKHZlY3RvciwgY2FtZXJhKVxyXG57XHJcbiAgICB2YXIgciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbiAgICByLmNvcHkodmVjdG9yKTtcclxuXHRyLnVucHJvamVjdChjYW1lcmEpO1xyXG4gICAgLy90aGlzIGRvbmUgeWV0XHJcbiAgICAvL3IuYXBwbHlNYXRyaXg0KGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UpOyAgICBcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5Nb3VzZV9JbnRlcnNlY3Rvci5tb3VzZV9jb29yZHNfdG9fcmF5ID0gZnVuY3Rpb24gKGNhbnZhcywgZXZlbnQsIGNhbWVyYSkgXHJcbntcclxuICAgIHZhciB2ZWN0b3IgPSB0aGlzLm1vdXNlX2Nvb3Jkc190b192ZWN0b3IoY2FudmFzLCBldmVudCk7XHJcbiAgICB2ZWN0b3IgPSB0aGlzLnVucHJvamVjdCh2ZWN0b3IsIGNhbWVyYSk7XHJcblx0dmFyIHJheSA9IG5ldyBUSFJFRS5SYXkoIGNhbWVyYS5wb3NpdGlvbiwgdmVjdG9yLnN1YiggY2FtZXJhLnBvc2l0aW9uICkubm9ybWFsaXplKCkgKTtcclxuXHRyZXR1cm4gcmF5O1xyXG59XHJcblxyXG5cclxuXHJcbk1vdXNlX0ludGVyc2VjdG9yLmZpbmRfaW50ZXJzZWN0aW9uX3dpdGhfbW91c2VfdmVjdG9yID0gZnVuY3Rpb24odmVjdG9yLCBjYW1lcmEsIHNjZW5lKVxyXG57XHJcblx0dmVjdG9yLnVucHJvamVjdChjYW1lcmEpO1xyXG5cdHZhciByYXkgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKCBjYW1lcmEucG9zaXRpb24sIHZlY3Rvci5zdWIoIGNhbWVyYS5wb3NpdGlvbiApLm5vcm1hbGl6ZSgpICk7XHJcblx0Ly8gY3JlYXRlIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9iamVjdHMgaW4gdGhlIHNjZW5lIHdpdGggd2hpY2ggdGhlIHJheSBpbnRlcnNlY3RzXHJcblx0Ly92YXIgaW50ZXJzZWN0cyA9IHJheS5pbnRlcnNlY3RPYmplY3RzKCBbZ3JpZF90ZXh0LnJvb3RdLCB0cnVlICk7IFxyXG5cdC8vY29uc29sZS5sb2coZmFrZV9wbGFuZS5yb290LmNoaWxkcmVuWzBdLmdlb21ldHJ5KTtcclxuXHR2YXIgaW50ZXJzZWN0cyA9IHJheS5pbnRlcnNlY3RPYmplY3RzKCBbc2NlbmVdLCB0cnVlICk7IFxyXG5cdHJldHVybiBpbnRlcnNlY3RzO1xyXG59XHJcblxyXG5cclxuTW91c2VfSW50ZXJzZWN0b3IuZmluZF9pbnRlcnNlY3RlZF9vYmplY3QgPSBmdW5jdGlvbiAoc2NlbmUsIHJheSlcclxue1xyXG5cclxuICAgIHZhciBjb2xsaWRlciA9IG5ldyBTaW1wbGVfQ29sbGlkZXIoc2NlbmUpO1xyXG4gICAgdmFyIGludGVyc2VjdHMgPSBjb2xsaWRlci5jaGVja19yYXkocmF5KTtcclxuICAgIHJldHVybiBpbnRlcnNlY3RzO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgTW91c2VfSW50ZXJzZWN0b3IgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmFzZS9tb3VzZV9pbnRlcnNlY3Rvci5qcyIsImZ1bmN0aW9uIFNpbXBsZV9Db2xsaWRlcihyb290LCBwYXJhbXMpXHJcbntcclxuICAgIHRoaXMucm9vdCA9IHJvb3Q7XHJcbiAgICBpZiAocGFyYW1zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBwYXJhbXMgPSB7fTtcclxuICAgIH1cclxuICAgIHRoaXMucGFyYW1zID0gXHJcbiAgICB7XHJcbiAgICAgICAgcmVjdXJzaXZlOiBwYXJhbXMucmVjdXJzaXZlID09PSB1bmRlZmluZWQgPyB0cnVlIDogcGFyYW1zLnJlY3Vyc2l2ZSxcclxuICAgICAgICBjaGVja19pbnZpc2libGU6IHBhcmFtcy5jaGVja19pbnZpc2libGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBwYXJhbXMuY2hlY2tfaW52aXNpYmxlIFxyXG4gICAgfTtcclxuICAgIHRoaXMuaW50ZXJzZWN0ZWRfb2JqZWN0cyA9IFtdO1xyXG4gICAgdGhpcy5fdGVzdGVkX3NwaGVyZSA9IG5ldyBUSFJFRS5TcGhlcmUoKTsgICAgXHJcbn1cclxuXHJcblNpbXBsZV9Db2xsaWRlci5wcm90b3R5cGUucHJlcGFyZV9jaGVjayA9IGZ1bmN0aW9uIChyYXkpXHJcbntcclxuICAgIHRoaXMuaW50ZXJzZWN0ZWRfb2JqZWN0cyA9IFtdO1xyXG4gICAgdGhpcy5pbnRlcnNlY3RlZF9tYXAgPSB7fTtcclxuICAgIHRoaXMuX2Zha2VjYXN0ZXIgPSB7cmF5OiByYXl9OyAgICBcclxufVxyXG5cclxuU2ltcGxlX0NvbGxpZGVyLnByb3RvdHlwZS5jaGVja19yYXkgPSBmdW5jdGlvbiAocmF5KVxyXG57XHJcbiAgICB0aGlzLnByZXBhcmVfY2hlY2socmF5KTtcclxuICAgIFxyXG4gICAgdGhpcy5maW5kX2ludGVyc2VjdGlvbl93aXRoX2JvdW5kaW5nX3NwaGVyZSggdGhpcy5yb290KTsgXHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzLmludGVyc2VjdGVkX29iamVjdHM7XHJcbn1cclxuXHJcblNpbXBsZV9Db2xsaWRlci5wcm90b3R5cGUuYWRkX2ludGVyc2VjdGVkID0gZnVuY3Rpb24gKG9iailcclxue1xyXG4gICAgaWYgKCF0aGlzLmludGVyc2VjdGVkX21hcFtvYmoudXVpZF0pIHtcclxuICAgICAgICB0aGlzLmludGVyc2VjdGVkX21hcFtvYmoudXVpZF0gPSBvYmo7XHJcbiAgICAgICAgdGhpcy5pbnRlcnNlY3RlZF9vYmplY3RzLnB1c2gob2JqKTtcclxuICAgIH1cclxufVxyXG5cclxuU2ltcGxlX0NvbGxpZGVyLnByb3RvdHlwZS5jaGVja19vYmplY3RfYm91bmRpbmdfc3BoZXJlID0gZnVuY3Rpb24ob2JqKVxyXG57XHJcbiAgICAvL2dldCBib3VuZGluZyBzcGhlcmVcclxuICAgIGlmIChvYmouZ2V0Qm91bmRpbmdTcGhlcmUpIHtcclxuICAgICAgICB0aGlzLl90ZXN0ZWRfc3BoZXJlLmNvcHkoIG9iai5nZXRCb3VuZGluZ1NwaGVyZSgpICk7XHJcbiAgICB9IGVsc2UgaWYgKG9iai5nZW9tZXRyeSkgIHtcclxuICAgICAgICAvL2Z1Y2sgdGhpcyBzaGl0LCB3aHkgZG9uJ3QgZXhpc3RzIG1ldGhvZCBnZXRCb3VuZGluZ1NwaGVyZSwgd2hpY2ggZW5jYXBzdWxhdGVzIHRoaXM/XHJcbiAgICAgICAgaWYgKCBvYmouZ2VvbWV0cnkuYm91bmRpbmdTcGhlcmUgPT09IG51bGwgKSBvYmouZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nU3BoZXJlKCk7XHJcbiAgICAgICAgIC8vY29weSBzcGhlcmUgZnJvbSBvYmplY3QgZ2VvbWV0cnkgYW5kIHRyYW5zZm9ybSBpdCB3aXRoIG9iamVjdC4gbWF0cml4V29ybGRcclxuICAgICAgICB0aGlzLl90ZXN0ZWRfc3BoZXJlLmNvcHkoIG9iai5nZW9tZXRyeS5ib3VuZGluZ1NwaGVyZSApO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJnZXQgYm91bmRpbmcgc3BoZXJlXCIsIHRoaXMuX3Rlc3RlZF9zcGhlcmUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy90ZXN0IGJvdW5kaW5nIHNwZXJlXHJcbiAgICBvYmoudXBkYXRlTWF0cml4V29ybGQodHJ1ZSk7ICAgICAgICBcclxuICAgIHRoaXMuX3Rlc3RlZF9zcGhlcmUuYXBwbHlNYXRyaXg0KCBvYmoubWF0cml4V29ybGQgKTtcclxuICAgIC8vZmluZCBpbnRlcnNlY3Rpb25cclxuICAgIHZhciBpbnRlciA9IHRoaXMuX2Zha2VjYXN0ZXIucmF5LmludGVyc2VjdHNTcGhlcmUoIHRoaXMuX3Rlc3RlZF9zcGhlcmUgKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJpbnRlciB3aXRoIHNwaGVyZSwgbGV2ZWxcIiwgbGV2ZWwsIGludGVyLCBzcGhlcmUuY2VudGVyLCByYXljYXN0ZXIucmF5KTtcclxuICAgIC8vYWRkIHRvIGludGVyc2VjdGVkIGxpc3QsIGlmIHN1Y2Nlc3NcclxuICAgIGlmIChpbnRlcikge1xyXG4gICAgICAgIHRoaXMuaW50ZXJzZWN0ZWRfb2JqZWN0cy5wdXNoKG9iaik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblNpbXBsZV9Db2xsaWRlci5wcm90b3R5cGUuZmluZF9pbnRlcnNlY3Rpb25fd2l0aF9ib3VuZGluZ19zcGhlcmUgPSBmdW5jdGlvbihvYmplY3QsIHRvcCApIHtcclxuXHJcbiAgICBpZiAoICFvYmplY3Qubm9uX2NvbGxpZGVibGUgJiYgKG9iamVjdC52aXNpYmxlIHx8IHRoaXMucGFyYW1zLmNoZWNrX2ludmlzaWJsZSkpIHtcclxuICAgICAgICB0aGlzLmNoZWNrX29iamVjdF9ib3VuZGluZ19zcGhlcmUob2JqZWN0KTtcclxuICAgIH1cclxuICAgIGlmICggIXRoaXMucGFyYW1zLnJlY3Vyc2l2ZSkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICBcclxuICAgIC8vdGVzdCBjaGlsZHJlblxyXG4gICAgdmFyIGNoaWxkcmVuID0gb2JqZWN0LmNoaWxkcmVuO1xyXG4gICAgZm9yICggdmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpICsrICkge1xyXG4gICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgIHRoaXMuZmluZF9pbnRlcnNlY3Rpb25fd2l0aF9ib3VuZGluZ19zcGhlcmUoIGNoaWxkICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHtTaW1wbGVfQ29sbGlkZXJ9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXNlL3NpbXBsZV9jb2xsaWRlci5qcyIsIlxyXG52YXIgQ29sb3JfUGlja2VyID0ge1xyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7cjogMCwgZzogMCwgYjowfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRlbXBsYXRlOiAnPGRpdj5cXFxyXG4gICAgPHA+UmVkIEdyZWVuIEJsdWUgQ29sb3JcXFxyXG4gICAgPHA+XFxcclxuICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIwXCIgbWF4PVwiMjU1XCIgQGNoYW5nZT1cImNoYW5nZWRcIiA6dmFsdWU9XCJ2YWx1ZS5yXCIgcmVmPVwiclwiIGlkPVwiclwiID5cXFxyXG4gICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIyNTVcIiBAY2hhbmdlPVwiY2hhbmdlZFwiIDp2YWx1ZT1cInZhbHVlLmdcIiByZWY9XCJnXCIgaWQ9XCJnXCI+XFxcclxuICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIwXCIgbWF4PVwiMjU1XCIgQGNoYW5nZT1cImNoYW5nZWRcIiA6dmFsdWU9XCJ2YWx1ZS5iXCIgcmVmPVwiYlwiIGlkPVwiYlwiPlxcXHJcbiAgICA8L2Rpdj4nLFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5ld192YWx1ZSA6IHtcclxuICAgICAgICAgICAgICAgIHI6IDAsXHJcbiAgICAgICAgICAgICAgICBnOiAwLFxyXG4gICAgICAgICAgICAgICAgYjogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBjaGFuZ2VkOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtldmVudC50YXJnZXQuaWRdID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vL1Z1ZS5jb21wb25lbnQoXCJjb2xvci1waWNrZXJcIiwgQ29sb3JfUGlja2VyKTtcclxuXHJcbmV4cG9ydCB7Q29sb3JfUGlja2VyfTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ndWkvY29sb3JfcGlja2VyLmpzIiwiaW1wb3J0IHtQYXJ0aWNsZXNfUHJvcHN9IGZyb20gJy4vcGFydGljbGVzX3Byb3BzLmpzJztcclxuaW1wb3J0IHtUZXh0dXJlX1BhbmVsfSBmcm9tICcuL3RleHR1cmVfcGFuZWwuanMnO1xyXG5cclxudmFyIFBhcnRpY2xlc19QYW5lbCA9IFxyXG57XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHBhcnRpY2xlcyA6IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRleHR1cmVzIDoge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VsZWN0ZWQ6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblx0ZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgXHJcbiAgICAgICBcclxuICAgICAgIHJldHVybiAge1xyXG4gICAgICAgICAgICAgICAgZmlyc3RfdGltZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHBhcnRpY2xlX3BhcmFtczoge30sXHJcbiAgICAgICAgICAgICAgICBteV9zZWxlY3RlZCA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdGV4dHVyZV9wYW5lbF9pc192aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOlxyXG4gICAge1xyXG4gICAgICAgIGFkZF90b19zZWxlY3Q6IGZ1bmN0aW9uIChpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzZWxlY3QgbmV3IFwiLCBpZCwgdGhpcy5wYXJ0aWNsZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgdGhpcy5teV9zZWxlY3RlZCA9IGlkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlX3BhcnRpY2xlczogZnVuY3Rpb24gKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGV2ZW50X2h1Yi4kZW1pdChcImNyZWF0ZV9wYXJ0aWNsZXNcIik7XHJcbiAgICAgICAgfSxcclxuXHRcdHJlbW92ZV9wYXJ0aWNsZXM6IGZ1bmN0aW9uIChldmVudCkgXHJcblx0XHR7XHJcbiAgICAgICAgICAgZXZlbnRfaHViLiRlbWl0KFwicmVtb3ZlX3BhcnRpY2xlc1wiLCB0aGlzLm15X3NlbGVjdGVkKTsgICAgICAgIFxyXG5cdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJ0aWNsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAodGhpcy5wYXJ0aWNsZXNbaV0gPT0gdGhpcy5teV9zZWxlY3RlZCkge1xyXG5cdFx0XHRcdFx0dGhpcy5wYXJ0aWNsZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZSBuZXh0IGF2YWlsYWJsZSBwYXJ0aWNsZXMgb3IgZW1wdHlcclxuXHRcdFx0XHRcdGlmICh0aGlzLnBhcnRpY2xlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpKyAxIDwgdGhpcy5wYXJ0aWNsZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15X3NlbGVjdGVkID0gdGhpcy5wYXJ0aWNsZXNbaSsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15X3NlbGVjdGVkID0gdGhpcy5wYXJ0aWNsZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMubXlfc2VsZWN0ZWQgPSAnJztcclxuXHRcdFx0XHRcdH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgfVxyXG5cdFx0fSxcclxuICAgICAgICBcclxuICAgICAgICBjaGFuZ2VfY29sb3JzOiBmdW5jdGlvbiAoZXZlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBldmVudF9odWIuJGVtaXQoXCJjaGFuZ2VfcGFydGljbGVzX2NvbG9yXCIsIHRoaXMubXlfc2VsZWN0ZWQsIGV2ZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIHNob3dfdGV4dHVyZV9wYW5lbDogZnVuY3Rpb24gKGV2ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlX3BhbmVsX2lzX3Zpc2libGUgPSAhdGhpcy50ZXh0dXJlX3BhbmVsX2lzX3Zpc2libGU7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzIFwiLCB0aGlzLnRleHR1cmVfcGFuZWxfaXNfdmlzaWJsZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuXHRcdHNlbGVjdF9wYXJ0aWNsZXM6IGZ1bmN0aW9uIChldmVudClcclxuXHRcdHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZV9wYXJhbXMgPSBldmVudF9odWIuZ2V0X3BhcnRpY2xlX3BhcmFtcyh0aGlzLm15X3NlbGVjdGVkKTsgICAgICAgICAgICAgICAgICBcclxuXHRcdH0sXHJcblx0XHRwbGF5OiBmdW5jdGlvbiAoZXZlbnQpXHJcblx0XHR7XHJcbiAgICAgICAgICAgIGV2ZW50X2h1Yi4kZW1pdChcInJlcGxheVwiLCB0aGlzLm15X3NlbGVjdGVkLCB0aGlzLnBhcnRpY2xlX3BhcmFtcyk7XHJcblx0XHR9LFxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICBcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgZXZlbnRfaHViLiRvbihcImFkZGluZ19wYXJ0aWNsZXNcIiwgZnVuY3Rpb24gKGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2VsZi5hZGRfdG9fc2VsZWN0KGlkKTtcclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIGlmICghIXRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5teV9zZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFydGljbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXlfc2VsZWN0ZWQgPSB0aGlzLnBhcnRpY2xlc1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5teV9zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlX3BhcmFtcyA9IGV2ZW50X2h1Yi5nZXRfcGFydGljbGVfcGFyYW1zKHRoaXMubXlfc2VsZWN0ZWQpOyAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICAgIHBhcnRpY2xlczogZnVuY3Rpb24gKGFycikge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwid2F0Y2ggcGFydGljbGVzXCIsIGFycik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnRpY2xlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maXJzdF90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teV9zZWxlY3RlZCA9IHRoaXMucGFydGljbGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RfdGltZSA9IGZhbHNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbXlfc2VsZWN0ZWQ6IGZ1bmN0aW9uIChuZXdfc2VsZWN0ZWQpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIndhdGNoIG5ldyBzZWxlY3RlZFwiLCBuZXdfc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlX3BhcmFtcyA9IGV2ZW50X2h1Yi5nZXRfcGFydGljbGVfcGFyYW1zKHRoaXMubXlfc2VsZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICB0ZW1wbGF0ZTogXHJcbiAgICAnPGRpdj5cXFxyXG5cdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwiYnRuLWFkZFwiIHYtb246Y2xpY2s9XCJjcmVhdGVfcGFydGljbGVzXCI+TmV3PC9idXR0b24+XFxcclxuXHQ8YnI+XFxcclxuXHQ8c2VsZWN0IHYtbW9kZWw9XCJteV9zZWxlY3RlZFwiIGlkPVwib2JqZWN0LWxpc3RcIiByZWY9XCJwYXJ0aWNsZXNfbGlzdFwiPlxcXHJcblx0XHQ8b3B0aW9uIGRpc2FibGVkIHZhbHVlPVwiXCI+UGxlYXNlIHNlbGVjdCBvbmU8L29wdGlvbj5cXFxyXG5cdCAgPG9wdGlvbiB2LWZvcj1cIm9wdGlvbiBpbiBwYXJ0aWNsZXNcIiB2LWJpbmQ6dmFsdWU9XCJvcHRpb25cIj5cXFxyXG5cdFx0e3sgb3B0aW9uIH19XFxcclxuXHQgIDwvb3B0aW9uPlxcXHJcblx0PC9zZWxlY3Q+XFxcclxuXHQ8YnI+XFxcclxuICAgIDxzcGFuPlNlbGVjdGVkOiB7eyBteV9zZWxlY3RlZCB9fTwvc3Bhbj48YnI+XFxcclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cImJ0bi1wbGF5XCIgdi1vbjpjbGljaz1cInBsYXlcIj5SZWZyZXNoPC9idXR0b24+XFxcclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cImJ0bi1yZW1vdmVcIiB2LW9uOmNsaWNrPVwicmVtb3ZlX3BhcnRpY2xlc1wiPlJlbW92ZTwvYnV0dG9uPlxcXHJcbiAgICA8cD4gIDxzcGFuIGNsYXNzPVwiaW5mby1wYW5lbFwiPlBhcnRpY2xlcyBwcm9wZXJ0aWVzPC9zcGFuPjwvcD5cXFxyXG4gICAgPGRpdiBjbGFzcz1cInBhcnRpY2xlcy1wcm9wZXJ0aWVzXCI+XFxcclxuICAgICAgICA8ZGl2IHYtaWY9XCJteV9zZWxlY3RlZFwiID5cXFxyXG4gICAgICAgICAgICA8UGFydGljbGVzUHJvcHMgIDpwYXJhbXM9XCJwYXJ0aWNsZV9wYXJhbXNcIiAvPlxcXHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBAY2xpY2s9XCJzaG93X3RleHR1cmVfcGFuZWxcIj5TaG93IHRleHR1cmUgcGFuZWw8L2E+XFxcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImR1bW15XCIgdi1pZj1cInRleHR1cmVfcGFuZWxfaXNfdmlzaWJsZVwiPlxcXHJcbiAgICAgICAgICAgIDx0ZXh0dXJlLXBhbmVsIDp0ZXh0dXJlcz1cInRleHR1cmVzXCIgOm9iamVjdF9pZD1cIm15X3NlbGVjdGVkXCIgOnNlbGVjdGVkPVwicGFydGljbGVfcGFyYW1zLnRleHR1cmVcIi8+XFxcclxuICAgICAgICAgICAgPC9kaXY+XFxcclxuICAgICAgICA8L2Rpdj5cXFxyXG4gICAgPC9kaXY+XFxcclxuICAgIDwvZGl2PicsXHJcbiAgIFxyXG4gICBcclxuICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgICAnUGFydGljbGVzUHJvcHMnOiBQYXJ0aWNsZXNfUHJvcHMsXHJcbiAgICAgICAgJ3RleHR1cmUtcGFuZWwnOiBUZXh0dXJlX1BhbmVsLFxyXG4gICAgfSxcclxufTtcclxuXHJcblxyXG4vL1Z1ZS5jb21wb25lbnQoXCJwYXJ0aWNsZXMtcGFuZWxcIiwgUGFydGljbGVzX1BhbmVsKTtcclxuXHJcbmV4cG9ydCB7UGFydGljbGVzX1BhbmVsfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ3VpL3BhcnRpY2xlc19wYW5lbC5qcyIsImltcG9ydCB7Q29sb3JfUGlja2VyfSBmcm9tICcuL2NvbG9yX3BpY2tlci5qcyc7XHJcblxyXG52YXIgQmxlbmRpbmdfU2VsZWN0b3IgPSB7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIFwiYmxlbmRpbmdcIjoge1xyXG4gICAgICAgICAgICB0eXBlIDogU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJub1wiXHJcbiAgICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6XHJcbiAgICAgICAgJzxzZWxlY3Qgdi1tb2RlbD1cImJsZW5kaW5nXCIgaWQ9XCJibGVuZGluZ1wiIHYtb246Y2hhbmdlPVwic2VsZWN0XCI+XFxcclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm5vXCI+bm88L29wdGlvbj5cXFxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYWRkaXRpdmVcIj5hZGRpdGl2ZTwvb3B0aW9uPlxcXHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJvbmVfYWxwaGFcIj5vbmUsIG1pbnVzIHNyYyBhbHBoYTwvb3B0aW9uPlxcXHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbHBoYV9vbmVcIj5taW51cyBzcmMgYWxwaGEsIG9uZTwvb3B0aW9uPlxcXHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbHBoYVwiPmFscGhhPC9vcHRpb24+XFxcclxuICAgICAgICA8L3NlbGVjdD4nLFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIHNlbGVjdDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgdGhpcy5ibGVuZGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufTtcclxuXHJcbnZhciBCZWhhdmlvciA9IHtcclxuICAgIHByb3BzOiBbXCJhZmZlY3RfbWV0aG9kXCIsIFwiZW1pdF9tZXRob2RcIl0sXHJcbiAgICBcclxuICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiZWhhdmlvcjogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHRlbXBsYXRlOiAnPGRpdj5cXFxyXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgQGNsaWNrPVwic2hvd19iZWhhdmlvclwiPlNob3cgQmVoYXZpb3VyPC9idXR0b24+XFxcclxuICAgIDxkaXYgY2xhc3M9XCJiZWhhdmlvclwiIHYtaWY9XCJiZWhhdmlvclwiPlxcXHJcbiAgICA8cD5hZmZlY3QgbWV0aG9kPGJyPlxcXHJcbiAgICA8dGV4dGFyZWEgdi1tb2RlbD1cImFmZmVjdF9tZXRob2RcIj48L3RleHRhcmVhPlxcXHJcbiAgICA8cD5lbWl0IG1ldGhvZDxicj5cXFxyXG4gICAgPHRleHRhcmVhIHYtbW9kZWw9XCJlbWl0X21ldGhvZFwiPjwvdGV4dGFyZWE+XFxcclxuICAgIDwvZGl2PicsXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgc2hvd19iZWhhdmlvcjogZnVuY3Rpb24oZikge1xyXG4gICAgICAgICAgICB2YXIgYmVoYXZpb3IgPSAhdGhpcy5iZWhhdmlvcjtcclxuICAgICAgICAgICAgdGhpcy5iZWhhdmlvciA9IGJlaGF2aW9yO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG59O1xyXG5cclxudmFyIFBhcnRpY2xlX1BhcmFtcyA9IFxyXG57XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIFwicGFyYW1zXCI6IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHRlbXBsYXRlOiAnPGRpdiBAa2V5dXAuMTM9XCJmaXJlXCI+XFxcclxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvcC1jb2x1bW5cIj5cXFxyXG4gICAgICAgICAgICBMaWZlIExlbmd0aDogPGJyLz5cXFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxpZmVfbGVuZ3RoXCIgdi1tb2RlbC5udW1iZXI9XCJwYXJhbXMubGlmZV9sZW5ndGhcIiB0eXBlPVwibnVtYmVyXCIgc3RlcD1cIjAuMVwiIC8+XFxcclxuICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9wLWNvbHVtblwiPlxcXHJcbiAgICAgICAgICAgIEVtaXQgcGVyIHNlY29uZCA8YnIvPlxcXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZW1pdF9wZXJfc2Vjb25kXCIgdi1tb2RlbC5udW1iZXI9XCJwYXJhbXMuZW1pdF9wZXJfc2Vjb25kXCIgdHlwZT1cIm51bWJlclwiIC8+XFxcclxuICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9wLWNvbHVtblwiPlxcXHJcbiAgICAgICAgICAgIE51bWJlciBvZiBwYXJ0aWNsZXM8YnIvPlxcXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiY291bnRcIiB2LW1vZGVsLm51bWJlcj1cInBhcmFtcy5jb3VudFwiIHR5cGU9XCJudW1iZXJcIiAvPlxcXHJcbiAgICAgICAgPC9kaXY+XFxcclxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvcC1jb2x1bW5cIj5cXFxyXG4gICAgICAgICAgICBQb2ludCBTaXplPGJyLz5cXFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInNpemVcIiB2LW1vZGVsLm51bWJlcj1cInBhcmFtcy5zaXplXCIgdHlwZT1cIm51bWJlclwiIHN0ZXA9XCIwLjFcIiAvPlxcXHJcbiAgICAgICAgPC9kaXY+XFxcclxuPC9kaXY+JyxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBmaXJlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LmZpcmUoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuICAgXHJcbnZhciBQYXJ0aWNsZXNfUHJvcHMgPSBcclxue1xyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICBcInBhcmFtc1wiOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgZGVmYXVsdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRlbXBsYXRlOiAnPGRpdj4gIDxwYXJ0aWNsZS1wYXJhbXMgOnBhcmFtcz1wYXJhbXMgLz5cXFxyXG4gICAgICAgIDxjb2xvci1waWNrZXIgOnZhbHVlPVwicGFyYW1zLmNvbG9yXCIgQGlucHV0PVwidXBkYXRlX2NvbG9yXCI+PC9jb2xvci1waWNrZXI+XFxcclxuICAgICAgICA8cD5CbGVuZGluZyBtb2RlPC9wPlxcXHJcbiAgICAgICAgICAgIDxibGVuZGluZy1tb2RlIDpibGVuZGluZz1wYXJhbXMuYmxlbmRpbmcgQGNoYW5nZT1cImJsZW5kaW5nX2NoYW5nZVwiPiA8L2JsZW5kaW5nLW1vZGU+XFxcclxuICAgICAgICA8cD5QcmVjb21wdXRlZCBhbHBoYSA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdi1tb2RlbD1cInBhcmFtcy5wcmVjb21wdXRlZF9hbHBoYVwiIEBjaGFuZ2U9XCJmaXJlXCIgaWQ9XCJwcmVfYWxwaGFcIj48L3A+XFxcclxuICAgICAgICA8YmVoYXZpb3IgOmFmZmVjdF9tZXRob2Q9cGFyYW1zLmFmZmVjdF9tZXRob2QgOmVtaXRfbWV0aG9kPXBhcmFtcy5lbWl0X21ldGhvZCAvPlxcXHJcbiAgICA8ZGl2PicsXHJcbiAgICBcclxuICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiZWhhdmlvcjogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgd2F0Y2g6IHtcclxuICAgICAgICBwYXJhbXM6IGZ1bmN0aW9uICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2hhbmdlIFwiLCB0aGlzLnBhcmFtcy5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBibGVuZGluZ19jaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5ibGVuZGluZyA9IGV2ZW50O1xyXG4gICAgICAgICAgICB0aGlzLmVtaXRfcGFyYW1fY2hhbmdlKFwiYmxlbmRpbmdcIiwgZXZlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW1pdF9wYXJhbV9jaGFuZ2U6IGZ1bmN0aW9uIChrZXksIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9e307XHJcbiAgICAgICAgICAgIHBhcmFtc1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGV2ZW50X2h1Yi4kZW1pdChcImNoYW5nZV9wYXJhbXNcIiwgdGhpcy5wYXJhbXMuaWQsIHBhcmFtcyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaXJlOiBmdW5jdGlvbiAoZXZlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAoZXZlbnQudGFyZ2V0LnR5cGUgPT09ICdjaGVja2JveCcpID8gZXZlbnQudGFyZ2V0LmNoZWNrZWQgOiBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdF9wYXJhbV9jaGFuZ2UoZXZlbnQudGFyZ2V0LmlkLCB2YWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICB1cGRhdGVfY29sb3I6IGZ1bmN0aW9uIChldmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGV2ZW50X2h1Yi4kZW1pdCgnY2hhbmdlX2NvbG9yJywgdGhpcy5wYXJhbXMuaWQsIGV2ZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgXHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50czoge1xyXG4gICAgICAgICdjb2xvci1waWNrZXInOiBDb2xvcl9QaWNrZXIsXHJcbiAgICAgICAgJ2JsZW5kaW5nLW1vZGUnOiBCbGVuZGluZ19TZWxlY3RvcixcclxuICAgICAgICAnYmVoYXZpb3InOiBCZWhhdmlvcixcclxuICAgICAgICAncGFydGljbGUtcGFyYW1zJzogUGFydGljbGVfUGFyYW1zLFxyXG4gICAgfSxcclxufTtcclxuXHJcbi8vVnVlLmNvbXBvbmVudChcIlBhcnRpY2xlc1Byb3BzXCIsIFBhcnRpY2xlc19Qcm9wcyk7XHJcblxyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZXNfUHJvcHN9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ndWkvcGFydGljbGVzX3Byb3BzLmpzIiwiXHJcbnZhciBUZXh0dXJlX1BhbmVsID0gXHJcbntcclxuICAgIHRlbXBsYXRlOiBcclxuICAgICAgICAnPGRpdiBjbGFzcz1cInRleHR1cmUtcGFuZWxcIj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGlnaC10b29scy1wYW5lbFwiPlxcXHJcbiAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJ0ZXh0dXJlX3NlbGVjdFwiIHYtbW9kZWw9XCJzZWxlY3RlZFwiIHYtb246Y2hhbmdlPVwiY2hvb3NlX3RleHR1cmVcIj5cXFxyXG4gICAgICAgICAgICA8b3B0aW9uIHYtZm9yPVwib3B0aW9uIGluIHRleHR1cmVzXCIgdi1iaW5kOnZhbHVlPVwib3B0aW9uXCI+XFxcclxuICAgICAgICAgICAgICAgIHt7IG9wdGlvbiB9fVxcXHJcbiAgICAgICAgICAgIDwvb3B0aW9uPlxcXHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxcXHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHYtb246Y2xpY2s9XCJhcHBseVwiPmFwcGx5PC9idXR0b24+XFxcclxuICAgICAgICAgICAgPC9kaXY+XFxcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHR1cmUtY2FudmFzXCI+XFxcclxuICAgICAgICAgICAgPGNhbnZhcyBpZD1cInRleHR1cmUtY2FudmFzLW9ialwiIGNsYXNzPVwidGV4dHVyZS1jYW52YXNcIiByZWY9XCJjYW52YXNcIj5cXFxyXG4gICAgICAgICAgICA8L2NhbnZhcz5cXFxyXG4gICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dHVyZS1pbmZvXCI+XFxcclxuICAgICAgICAgICAgICAgIFRleHR1cmUgRm9ybWF0ICB7e2Zvcm1hdH19IDxiciAvPlxcXHJcbiAgICAgICAgICAgICAgICBUZXh0dXJlIFdpZHRoIHt7dGV4dHVyZV93aWR0aH19IEhlaWdodCB7e3RleHR1cmVfaGVpZ2h0fX1cXFxyXG4gICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJcIiAvPlxcXHJcbiAgICAgICAgPC9kaXY+JyxcclxuXHJcbiAgICAgICAgLy90ZXh0dXJlIGRpY3Rpb25hcmllcywgc2VsZWN0ZWQgdGV4dHVyZSwgb2JqZWN0IGlkLCB3aGljaCBzZWxlY3RlZCB0ZXh0dXJlXHJcbiAgICBwcm9wczogW1widGV4dHVyZXNcIiwgXCJzZWxlY3RlZFwiLCBcIm9iamVjdF9pZFwiXSxcclxuICAgIFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkX3RleHR1cmU6ICcnLFxyXG4gICAgICAgICAgICB0ZXh0dXJlX3dpZHRoIDogMCxcclxuICAgICAgICAgICAgdGV4dHVyZV9oZWlnaHQgOiAwLFxyXG4gICAgICAgICAgICBmb3JtYXQgOiAnJyxcclxuICAgICAgICAgICAgcGFuZWxfdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAnJyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgc2hvd19wYW5lbDogZnVuY3Rpb24gKGV2ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbF92aXNpYmxlID0gIXRoaXMucGFuZWxfdmlzaWJsZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNob29zZV90ZXh0dXJlOiBmdW5jdGlvbihldmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRfdGV4dHVyZSA9IHRoaXMuc2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd190ZXh0dXJlKHRoaXMuc2VsZWN0ZWRfdGV4dHVyZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcHBseTogZnVuY3Rpb24gKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhcHBseSBvZiBcIiwgdGhpcy5vYmplY3RfaWQsIHRoaXMuc2VsZWN0ZWRfdGV4dHVyZSk7XHJcbiAgICAgICAgICAgIGV2ZW50X2h1Yi4kZW1pdChcInNlbGVjdF90ZXh0dXJlXCIsIHRoaXMub2JqZWN0X2lkLCB0aGlzLnNlbGVjdGVkX3RleHR1cmUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZHJhd190ZXh0dXJlOiBmdW5jdGlvbiAobmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgdGV4dHVyZSA9IGV2ZW50X2h1Yi5nZXRfdGV4dHVyZShuYW1lKTtcclxuICAgICAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiT2gsIEZ1Y2shIFRleHR1cmUgXCIgKyBuYW1lICsgXCIgbm90IGZvdW5kIVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZvcm1hdCA9IHRleHR1cmVfZm9ybWF0X3RvX3N0cmluZyh0ZXh0dXJlLmZvcm1hdCk7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IHRleHR1cmUuaW1hZ2U7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZV93aWR0aCA9IGltYWdlLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlX2hlaWdodCA9IGltYWdlLm5hdHVyYWxIZWlnaHQgfHwgaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IHRoaXMuJHJlZnNbXCJjYW52YXNcIl07XHJcbiAgICAgICAgICAgIG15X2RyYXdfaW1hZ2UoY2FudmFzLCBpbWFnZSwgMCwgMCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICBnZXRfdGV4dHVyZV9mcm9tX3BhcnRpY2xlczogZnVuY3Rpb24gKGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFpZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRfdGV4dHVyZSA9IGV2ZW50X2h1Yi5nZXRfdGV4dHVyZV9mcm9tX3BhcnRpY2xlcyhpZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd190ZXh0dXJlKHRoaXMuc2VsZWN0ZWRfdGV4dHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuZ2V0X3RleHR1cmVfZnJvbV9wYXJ0aWNsZXModGhpcy5vYmplY3RfaWQpO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKFwibW91bnQgb2YgdGV4dHVyZSBwYW5lbFwiLCB0aGlzLm9iamVjdF9pZCwgdGhpcy5zZWxlY3RlZF90ZXh0dXJlLCB0aGlzLnNlbGVjdGVkKTtcclxuICAgICAgLy9wcmludChcIjxoMz5IaSEgSSBtb3VudGVkIGFuZCBteSB0ZXh0dXJlIGlzIFwiICsgdGhpcy5zZWxlY3RlZF90ZXh0dXJlICsgXCIsXCIgKyB0aGlzLnNlbGVjdGVkICsgXCI8L2gzPlwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICAgIG9iamVjdF9pZDogZnVuY3Rpb24gKHZhbHVlKSB7IFxyXG4gICAgICAgICAgIHRoaXMuZ2V0X3RleHR1cmVfZnJvbV9wYXJ0aWNsZXModmFsdWUpO1xyXG4gICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgXHJcbiAgICBcclxufTtcclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCB7VGV4dHVyZV9QYW5lbH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2d1aS90ZXh0dXJlX3BhbmVsLmpzIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuXHJcbmZ1bmN0aW9uIENvbG9yX0RvbWFpbihyLGcsYilcclxue1xyXG4gICAgdGhpcy5jb2xvciA9IG5ldyBUSFJFRS5Db2xvcihyLGcsYik7XHJcbiAgICB0aGlzLnV1aWQgPSBfLmdlbmVyYXRlVVVJRCgpO1xyXG4gICAgdGhpcy5uYW1lID0gJyc7XHJcbiAgICB0aGlzLnR5cGUgPSBcIkNvbG9yX0RvbWFpblwiO1xyXG59XHJcblxyXG5fLmNvcHlfb2JqZWN0KENvbG9yX0RvbWFpbi5wcm90b3R5cGUsIHtcclxuICAgIHRvSlNPTjogZnVuY3Rpb24gKGNoaWxkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgZGF0YS51dWlkID0gdGhpcy51dWlkO1xyXG4gICAgICAgIGlmICh0aGlzLm5hbWUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGRhdGEubmFtZSA9IHRoaXMubmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS50eXBlID0gdGhpcy50eXBlO1xyXG4gICAgICAgIGRhdGEuY29sb3IgPSB7cjogdGhpcy5jb2xvci5yLCBnOiB0aGlzLmNvbG9yLmcsIGI6IHRoaXMuY29sb3IuYn07XHJcbiAgICAgICAgcmV0dXJuIDtcclxuICAgIH0sXHJcbiAgICBwYXJzZTogZnVuY3Rpb24gKGpzb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51dWlkID0ganNvbi51dWlkO1xyXG4gICAgICAgIGlmIChqc29uLm5hbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChqc29uLmNvbG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2xvci5zZXQoanNvbi5jb2xvci5yLCBqc29uLmNvbG9yLmcsIGpzb24uY29sb3IuYik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVtaXQ6IGZ1bmN0aW9uIChjb2xvcilcclxuICAgIHtcclxuICAgICAgICBjb2xvci5yID0gdGhpcy5jb2xvci5yO1xyXG4gICAgICAgIGNvbG9yLmcgPSB0aGlzLmNvbG9yLmc7XHJcbiAgICAgICAgY29sb3IuYiA9IHRoaXMuY29sb3IuYjtcclxuICAgIH0sXHJcbiAgICBmaWxsOiBmdW5jdGlvbiAoY29sb3IsIG9mZnNldCkgXHJcbiAgICB7XHJcbiAgICAgICAgY29sb3Jbb2Zmc2V0KzBdID0gdGhpcy5jb2xvci5yO1xyXG4gICAgICAgIGNvbG9yW29mZnNldCsxXSA9IHRoaXMuY29sb3IuZztcclxuICAgICAgICBjb2xvcltvZmZzZXQrMl0gPSB0aGlzLmNvbG9yLmI7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKCdDb2xvcl9Eb21haW4nLCBDb2xvcl9Eb21haW4pO1xyXG5cclxuZnVuY3Rpb24gVGFibGVfQ29sb3IodGFibGUpXHJcbntcclxuICAgIGlmICh0YWJsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5jb3B5X3RhYmxlKHRhYmxlKTsgICAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRfdGFibGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuVGFibGVfQ29sb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDb2xvcl9Eb21haW4pO1xyXG5cclxuXy5jb3B5X29iamVjdChUYWJsZV9Db2xvci5wcm90b3R5cGUsIHtcclxuICAgIGNvbnN0cnVjdG9yOiBUYWJsZV9Db2xvcixcclxuICAgIGNvcHlfdGFibGU6IGZ1bmN0aW9uICh0YWJsZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRhYmxlID0gbmV3IEFycmF5KHRhYmxlLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRhYmxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGUgPSBuZXcgVEhSRUUuQ29sb3IodGFibGVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlbWl0OiBmdW5jdGlvbiAoY29sb3IpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiB0aGlzLnRhYmxlLmxlbmd0aCkgJSB0aGlzLnRhYmxlLmxlbmd0aDtcclxuICAgICAgICB2YXIgc3JjID0gdGhpcy50YWJsZVtpbmRleF07XHJcbiAgICAgICAgY29sb3IuciA9IHNyYy5yO1xyXG4gICAgICAgIGNvbG9yLmcgPSBzcmMuZztcclxuICAgICAgICBjb2xvci5iID0gc3JjLmI7XHJcbiAgICB9LFxyXG4gICAgZmlsbDogZnVuY3Rpb24gKGNvbG9yLCBvZmZzZXQpIFxyXG4gICAge1xyXG4gICAgICAgIHZhciBpbmRleCA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogdGhpcy50YWJsZS5sZW5ndGgpICUgdGhpcy50YWJsZS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHNyYyA9IHRoaXMudGFibGVbaW5kZXhdO1xyXG4gICAgICAgIGNvbG9yW29mZnNldF0gPSBzcmMucjtcclxuICAgICAgICBjb2xvcltvZmZzZXQrMV0gPSBzcmMuZztcclxuICAgICAgICBjb2xvcltvZmZzZXQrMl0gPSBzcmMuYjtcclxuICAgIH0sXHJcbiAgICBkZWZhdWx0X3RhYmxlOiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgQXJyYXkoOCk7XHJcbiAgICAgICAgdGhpcy50YWJsZVswXSA9IG5ldyBUSFJFRS5Db2xvcigxLCAwLCAwKTtcclxuICAgICAgICB0aGlzLnRhYmxlWzFdID0gbmV3IFRIUkVFLkNvbG9yKDAsIDEsIDApO1xyXG4gICAgICAgIHRoaXMudGFibGVbMl0gPSBuZXcgVEhSRUUuQ29sb3IoMCwgMCwgMSk7XHJcbiAgICAgICAgdGhpcy50YWJsZVszXSA9IG5ldyBUSFJFRS5Db2xvcigxLCAwLCAxKTtcclxuICAgICAgICB0aGlzLnRhYmxlWzRdID0gbmV3IFRIUkVFLkNvbG9yKDEsIDEsIDApO1xyXG4gICAgICAgIHRoaXMudGFibGVbNV0gPSBuZXcgVEhSRUUuQ29sb3IoMSwgMC40LCAwLjQpO1xyXG4gICAgICAgIHRoaXMudGFibGVbNl0gPSBuZXcgVEhSRUUuQ29sb3IoMC41LCAwLjcsIDAuOTgpO1xyXG4gICAgICAgIHRoaXMudGFibGVbN10gPSBuZXcgVEhSRUUuQ29sb3IoMC45LCAwLjQsIDAuNCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByID0ge3I6IDAsIGc6IDAsIGI6IDB9O1xyXG4gICAgICAgIHRoaXMuZW1pdChyKTtcclxuICAgICAgICByZXR1cm4gcjtcclxuICAgIH1cclxufSk7XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJUYWJsZV9Db2xvclwiLCBUYWJsZV9Db2xvcik7XHJcblxyXG5leHBvcnQge0NvbG9yX0RvbWFpbiwgVGFibGVfQ29sb3J9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvY29sb3JfZG9tYWluLmpzIiwidmFyIFBhcnRpY2xlX1NoYWRlcnMgPSB7fTtcclxuXHJcbihmdW5jdGlvbiAoKSBcclxue1xyXG5cclxuLy9wYXJ0aWNsZSBhdHRyaWJ1dGVzOlxyXG4vL3Bvc2l0aW9uXHJcbi8vY29sb3JcclxuLy9sZWZ0LCBzaXplXHJcbnZhciB2ZXJ0ZXhfc2hhZGVyID0gW1xyXG4vLydhdHRyaWJ1dGUgdmVjNCBwb3NpdGlvbjsnLFxyXG4nYXR0cmlidXRlIHZlYzQgY29sb3I7JyxcclxuJ2F0dHJpYnV0ZSBmbG9hdCBwYXJhbXM7JyxcclxuJ3ZhcnlpbmcgdmVjNCB2Y29sb3I7JyxcclxuJ3VuaWZvcm0gZmxvYXQgbGlmZXRpbWU7JyxcclxuJ3VuaWZvcm0gZmxvYXQgcG9pbnRfc2l6ZTsnLFxyXG4ndW5pZm9ybSB2ZWMyIHNjcmVlbl9zaXplOycsXHJcbicjaWZuZGVmIERZTkFNSUNfQ09MT1JTJyxcclxuICAgICd1bmlmb3JtIHZlYzMgcGFydGljbGVfY29sb3I7JyxcclxuJyNlbmRpZicsXHJcbid2b2lkIG1haW4gKCkgeycsXHJcblx0J2dsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIHZpZXdNYXRyaXggKiB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7JyxcclxuJyNpZmRlZiBEWU5BTUlDX0NPTE9SUycsXHJcblx0J3Zjb2xvci5yZ2IgPSBjb2xvci5yZ2I7JyxcclxuJyNlbHNlJyxcclxuICAgICd2Y29sb3IucmdiID0gcGFydGljbGVfY29sb3IucmdiOycsXHJcbicjZW5kaWYnLFxyXG4nI2lmZGVmIE5PX0ZBREVfQ09MT1InLFxyXG5cdCd2Y29sb3IuYSA9IDEuMDsnLFxyXG4nI2Vsc2UnLFxyXG5cdC8vcGFyYW1zIGNvbnRhaW5zIGxpZmUgbGVuZ3RoIHdoaWNoIGRlY3JlYXNlZCBieSB0aW1lXHJcblx0J2Zsb2F0IHRtcCA9IHBhcmFtcyAvIGxpZmV0aW1lOycsXHJcblx0J3RtcCA9IG1pbih0bXAsIDEuMCk7JyxcdFxyXG5cdCd2Y29sb3IuYSA9IHRtcDsnLFxyXG4nI2VuZGlmJyxcclxuXHQnZmxvYXQgdCA9ICBzY3JlZW5fc2l6ZS55KiBwcm9qZWN0aW9uTWF0cml4WzFdWzFdIC8gZ2xfUG9zaXRpb24udzsnLFxyXG5cdCd0ID0gdCAqIHBvaW50X3NpemU7JyxcclxuXHQnaWYgKHBhcmFtcyA+IDAuMCkgeycsXHJcblx0XHQnZ2xfUG9pbnRTaXplID0gdDsnLFxyXG5cdCd9JyxcclxuXHQnZWxzZSB7JyxcclxuXHRcdC8vJ3Zjb2xvci5hID0gMC4wOycsXHJcblx0XHQnZ2xfUG9pbnRTaXplID0gMC4wOycsXHJcbiAgICAgICAgJ2dsX1Bvc2l0aW9uLnogPSAtMTAwMC4wOycsXHJcblx0J30nLFxyXG4nfSdcclxuXTtcclxuXHJcbnZhciBmcmFnbWVudF9zaGFkZXIgPSBbXHJcblx0J3ZhcnlpbmcgdmVjNCB2Y29sb3I7JyxcclxuXHQnI2lmZGVmIFBBUlRJQ0xFX1RFWFRVUkUnLFxyXG5cdFx0J3VuaWZvcm0gc2FtcGxlcjJEIHNwcml0ZTsnLFxyXG5cdCcjZW5kaWYnLFxyXG5cdCd2b2lkIG1haW4oKSB7JyxcclxuXHQnI2lmZGVmIFBBUlRJQ0xFX1RFWFRVUkUnLFxyXG5cdFx0J3ZlYzQgdGV4ID0gdGV4dHVyZTJEKCBzcHJpdGUsIGdsX1BvaW50Q29vcmQgKTsnLFxyXG5cdFx0J3ZlYzMgZnJhZ21lbnRfY29sb3IgPSB0ZXgucmdiOycsXHJcblx0XHQnZnJhZ21lbnRfY29sb3IucmdiICo9IHZjb2xvci5yZ2I7JyxcclxuXHRcdCdmbG9hdCBhbHBoYSA9IHRleC5hOycsXHRcclxuXHQnI2Vsc2UnLFxyXG5cdFx0J3ZlYzMgZnJhZ21lbnRfY29sb3IgPSB2Y29sb3IucmdiOycsXHJcblx0XHQnZmxvYXQgYWxwaGEgPSAxLjA7JyxcclxuXHQnI2VuZGlmJyxcclxuXHQnI2lmZGVmIFBSRV9BTFBIQScsXHJcblx0XHQnZnJhZ21lbnRfY29sb3IucmdiICo9IGFscGhhOycsXHJcblx0JyNlbmRpZicsXHJcblx0JyNpZm5kZWYgTk9fRkFERV9DT0xPUicsXHJcblx0XHQnZmxvYXQgZnJhZ21lbnRfYWxwaGEgPSBhbHBoYSAqIHZjb2xvci5hOycsXHJcblx0JyNlbHNlJyxcclxuXHRcdCdmbG9hdCBmcmFnbWVudF9hbHBoYSA9IGFscGhhOycsXHJcblx0JyNlbmRpZicsXHJcblx0XHQnZ2xfRnJhZ0NvbG9yID0gdmVjNChmcmFnbWVudF9jb2xvci5yZ2IsIGZyYWdtZW50X2FscGhhKTsnLFxyXG5cdCd9JyxcclxuXTtcclxuXHJcblBhcnRpY2xlX1NoYWRlcnMudmVydGV4ID0gdmVydGV4X3NoYWRlci5qb2luKCAnXFxuJyApO1xyXG5QYXJ0aWNsZV9TaGFkZXJzLmZyYWdtZW50ID0gZnJhZ21lbnRfc2hhZGVyLmpvaW4oICdcXG4nICk7XHJcbn0pKCk7XHJcblxyXG5leHBvcnQge1BhcnRpY2xlX1NoYWRlcnN9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVfc2hhZGVycy5qcyIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuLi9iYXNlL215X2xpYi5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVfRW1pdHRlcn0gZnJvbSAnLi9wYXJ0aWNsZV9lbWl0dGVyLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9BZmZlY3Rvcn0gZnJvbSAnLi9wYXJ0aWNsZV9hZmZlY3Rvci5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVzX1BvaW50c30gZnJvbSAnLi9wYXJ0aWNsZXNfcG9pbnRzLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9TaGFkZXJzfSBmcm9tICcuL3BhcnRpY2xlX3NoYWRlcnMuanMnO1xyXG5pbXBvcnQge0NvbG9yX0RvbWFpbn0gZnJvbSAnLi9jb2xvcl9kb21haW4uanMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIFBhcnRpY2xlX1N5c3RlbShkYXRhKVxyXG57XHJcbiAgICB0aGlzLnV1aWQgPSBfLmdlbmVyYXRlVVVJRCgpOyAgICBcclxuICAgIFxyXG4gICAgdGhpcy5wYXJhbXMgPSB0aGlzLmNvbmZpZ19wYXJhbXMoZGF0YSk7XHJcblxyXG4gIFxyXG5cdHRoaXMuZW1pdHRlciA9IHRoaXMucGFyYW1zLmVtaXR0ZXI7XHJcblx0dGhpcy5hZmZlY3RvciA9IHRoaXMucGFyYW1zLmFmZmVjdG9yOyAgICBcclxuICAgIHRoaXMucGFydGljbGVfbGlmZXRpbWUgPSB0aGlzLnBhcmFtcy5wYXJ0aWNsZV9saWZldGltZTtcclxuICAgIHRoaXMudGV4dHVyZSA9IHRoaXMucGFyYW1zLnRleHR1cmU7XHJcblx0XHJcblx0dGhpcy5keW5hbWljX2NvbG9yID0gZmFsc2U7XHJcblxyXG5cdHZhciBjb3VudCA9IHRoaXMucGFyYW1zLmNvdW50O1xyXG5cdFxyXG5cdHRoaXMubWF0ZXJpYWwgPSB0aGlzLmNyZWF0ZV9wYXJ0aWNsZV9tYXRlcmlhbCgpO1xyXG5cdHRoaXMubm9kZSA9IG5ldyBQYXJ0aWNsZXNfUG9pbnRzKHRoaXMuY3JlYXRlX3BhcnRpY2xlX2dlb21ldHJ5KGNvdW50KSwgdGhpcy5tYXRlcmlhbCk7XHJcbiAgICB0aGlzLm5vZGUubmFtZSA9IHRoaXMubmFtZTtcclxuICAgIHRoaXMubm9kZS5ib3VuZGluZ1NwaGVyZS5yYWRpdXMgPSB0aGlzLnBhcmFtcy5ib3VuZGluZ19yYWRpdXM7XHJcbiAgICB0aGlzLm5vZGUubm9uX2NvbGxpZGVibGUgPSB0aGlzLnBhcmFtcy5ub25fY29sbGlkZWJsZTtcclxuICAgIFxyXG59XHJcblxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5jb25maWdfcGFyYW1zID0gZnVuY3Rpb24gKGRhdGEpXHJcbntcclxuICAgIHZhciBwYXJhbXMgPSBcclxuICAgIHtcclxuICAgIH07XHJcbiAgICAvL2RlZmF1bHRcclxuICAgIHBhcmFtcy5wYXJ0aWNsZV9saWZldGltZSA9IDMuMDtcclxuICAgIHBhcmFtcy5ub19mYWRlX2NvbG9yID0gZmFsc2U7XHJcbiAgICBwYXJhbXMucHJlX2FscGhhID0gdHJ1ZTtcclxuICAgIHBhcmFtcy5kZXB0aF90ZXN0ID0gdHJ1ZTtcclxuICAgIHBhcmFtcy5kZXB0aF93cml0ZSA9IGZhbHNlO1xyXG4gICAgcGFyYW1zLmNvbG9yICA9IHtcInJcIjoxLCBcImdcIjoxLCBcImJcIjoxfTtcclxuXHRwYXJhbXMuYmxlbmRpbmcgPSBcIm9uZV9hbHBoYVwiO1xyXG4gICAgcGFyYW1zLnNpemUgPSAxO1xyXG4gICAgcGFyYW1zLmNvdW50ID0gMTAwO1xyXG4gICAgcGFyYW1zLm5hbWUgPSAnJztcclxuICAgIHBhcmFtcy5ib3VuZGluZ19yYWRpdXMgPSAyLjA7XHJcbiAgICBwYXJhbXMuZGlzY3JldGVfZW1pc3Npb24gPSBmYWxzZTtcclxuICAgIHBhcmFtcy5hcHBseV93b3JsZF9tYXRyaXhfb25fZW1pdCA9IHRydWU7XHJcbiAgICBwYXJhbXMubm9uX2NvbGxpZGVibGUgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgZm9yKHZhciBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSl7XHJcbiAgICAgICAgICAgIGlmIChkYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zW2tleV0gPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHRwYXJhbXMuZW1pdHRlciA9IGRhdGEuZW1pdHRlciB8fCBuZXcgUGFydGljbGVfRW1pdHRlcigxKTtcclxuXHRwYXJhbXMuYWZmZWN0b3IgPSBkYXRhLmFmZmVjdG9yIHx8IG5ldyBQYXJ0aWNsZV9BZmZlY3RvcigpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gcGFyYW1zO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNldF9uYW1lID0gZnVuY3Rpb24gKG5hbWUpXHJcbntcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLm5vZGUubmFtZSA9IG5hbWU7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc3VpY2lkZSA9IGZ1bmN0aW9uICgpXHJcbntcclxuXHR0aGlzLm5vZGUucGFyZW50LnJlbW92ZSh0aGlzLm5vZGUpO1xyXG4gICAgbWFpbl9ldmVudF9odWIuZW1pdChcImtpbGxfbWVcIiwgdGhpcyk7XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZV9wYXJ0aWNsZV9kYXRhID0gZnVuY3Rpb24gKGNvdW50KVxyXG57XHJcbiAgICB2YXIgcGFydGljbGVfZGF0YSA9IG5ldyBBcnJheShjb3VudCk7XHJcbiAgICB2YXIgcDtcclxuICAgIC8vdmFyIG1hdHJpeCA9IHRoaXMubm9kZS53b3JsZE1hdHJpeCgpO1xyXG4gICAgZm9yKHZhciBpID0wO2kgPCBjb3VudDsgaSsrKSB7XHJcblx0XHRwID0ge307XHJcblx0XHRwLnBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwwLDApO1xyXG5cdFx0cC52ZWxvY2l0eSA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsMCwwKTtcclxuICAgICAgICBcclxuICAgICAgICAvL3AucG9zaXRpb24uY29weSh0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIC8vcC5wb3NpdGlvbi5hcHBseU1hdHJpeDQobWF0cml4KTtcclxuICAgICAgICAvL3AudmVsb2NpdHkuYXBwbHlNYXRyaXg0X3JvdGF0aW9uKG1hdHJpeCk7XHJcbiAgICAgICAgXHJcblx0XHRwLmxpZmV0aW1lID0gMDsgICAgICAgIFxyXG5cdFx0cGFydGljbGVfZGF0YVtpXSA9IHA7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhcnRpY2xlX2RhdGEgPSBwYXJ0aWNsZV9kYXRhO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZV9wYXJ0aWNsZV9nZW9tZXRyeSA9IGZ1bmN0aW9uKGNvdW50KVxyXG57XHJcbiAgICB0aGlzLmNyZWF0ZV9wYXJ0aWNsZV9kYXRhKGNvdW50KTtcclxuICAgIFxyXG5cdHZhciB2ZXJ0aWNlcyA9IG5ldyBGbG9hdDMyQXJyYXkoY291bnQgKiAzKTsgLy8gcG9zaXRpb25cclxuXHR2YXIgY29sb3JzID0gbmV3IEZsb2F0MzJBcnJheShjb3VudCAqIDMpO1xyXG5cdHZhciBwYXJhbXMgPSBuZXcgRmxvYXQzMkFycmF5KGNvdW50KTtcclxuXHRcclxuICAgIHZhciBwYXJ0aWNsZTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIHBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZV9kYXRhW2ldO1xyXG5cdFx0Ly9jcmVhdGUgcGFydGljbGVcclxuXHRcdHZlcnRpY2VzW2kqM10gPSBwYXJ0aWNsZS5wb3NpdGlvbi54O1xyXG5cdFx0dmVydGljZXNbaSozKzFdID0gcGFydGljbGUucG9zaXRpb24ueTtcclxuXHRcdHZlcnRpY2VzW2kqMysyXSA9IHBhcnRpY2xlLnBvc2l0aW9uLno7XHJcblxyXG5cdFx0cGFyYW1zW2ldID0gMC4wO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtcy5jb2xvcl9kb21haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuY29sb3JfZG9tYWluLmZpbGwoY29sb3JzLCBpKjMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbG9yc1tpKjNdID0gdGhpcy5wYXJhbXMuY29sb3IucjtcclxuICAgICAgICAgICAgY29sb3JzW2kqMysxXSA9IHRoaXMucGFyYW1zLmNvbG9yLmc7XHJcbiAgICAgICAgICAgIGNvbG9yc1tpKjMrMl0gPSB0aGlzLnBhcmFtcy5jb2xvci5iO1xyXG4gICAgICAgfVxyXG5cdH1cclxuXHJcblx0dGhpcy5nZW9tZXRyeSA9IHt9O1xyXG5cdHRoaXMuZ2VvbWV0cnkudmVydGljZXMgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHZlcnRpY2VzLCAzKS5zZXREeW5hbWljKHRydWUpO1xyXG5cdHRoaXMuZ2VvbWV0cnkuY29sb3JzID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShjb2xvcnMsIDMpXHJcblx0aWYgKHRoaXMuZHluYW1pY19jb2xvcikge1xyXG5cdFx0dGhpcy5nZW9tZXRyeS5jb2xvcnMuc2V0RHluYW1pYyh0cnVlKTtcclxuXHR9XHJcblx0dGhpcy5nZW9tZXRyeS5wYXJhbXMgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBhcmFtcywgMSkuc2V0RHluYW1pYyh0cnVlKTtcclxuXHR2YXIgZ2VvbSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpOyBcdFxyXG5cdHRoaXMuZ2VvbWV0cnkuYnVmZmVyID0gZ2VvbTtcdFxyXG5cdGdlb20uYWRkQXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuZ2VvbWV0cnkudmVydGljZXMpO1xyXG5cdGdlb20uYWRkQXR0cmlidXRlKCdjb2xvcicsIHRoaXMuZ2VvbWV0cnkuY29sb3JzKTtcclxuXHRnZW9tLmFkZEF0dHJpYnV0ZSgncGFyYW1zJywgdGhpcy5nZW9tZXRyeS5wYXJhbXMpO1x0XHJcblxyXG4gICAgcmV0dXJuIGdlb207XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmRpc2NyZXRlX2VtaXQgPSBmdW5jdGlvbiAoY291bnQpXHJcbntcclxuICAgIHRoaXMuZW1pdF9wYXJ0aWNsZXMoMCwgY291bnQpO1xyXG5cdHRoaXMuZ2VvbWV0cnkudmVydGljZXMubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cdHRoaXMuZ2VvbWV0cnkucGFyYW1zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHR0aGlzLmdlb21ldHJ5LmNvbG9ycy5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmVtaXRfcGFydGljbGVzID0gZnVuY3Rpb24gKGR0LCBuZWVkX2VtaXQpXHJcbntcclxuXHQvL2VtaXQgcGFydGljbGVzXHJcblx0dmFyIHA7XHJcblx0dmFyIHZlcnRzID0gdGhpcy5nZW9tZXRyeS52ZXJ0aWNlcy5hcnJheTtcclxuXHR2YXIgcGFyYW1zID0gdGhpcy5nZW9tZXRyeS5wYXJhbXMuYXJyYXk7XHJcblx0XHJcbiAgICB2YXIgb2xkX25lZWRfZW1pdCA9IG5lZWRfZW1pdDtcclxuICAgIHRoaXMubm9kZS51cGRhdGVNYXRyaXhXb3JsZCh0cnVlKTtcclxuICAgIHZhciBtYXRyaXggPSB0aGlzLm5vZGUubWF0cml4V29ybGQ7XHJcblx0Zm9yKHZhciBpID0wOyBpIDwgdGhpcy5wYXJ0aWNsZV9kYXRhLmxlbmd0aCAmJiBuZWVkX2VtaXQgPiAwOyBpKyspIHtcclxuXHRcdGlmICghKHBhcmFtc1tpXSA+IDApKSB7XHJcbiAgICAgICAgXHJcblx0XHRcdHAgPSB0aGlzLnBhcnRpY2xlX2RhdGFbaV07XHJcblx0XHRcdHRoaXMuZW1pdHRlci5lbWl0KHAsIG51bGwsIG1hdHJpeCk7XHJcblx0XHRcdHAubGlmZXRpbWUgPSB0aGlzLnBhcnRpY2xlX2xpZmV0aW1lO1xyXG4gICAgICAgICAgICBcclxuXHRcdFx0dmVydHNbaSozXSA9IHAucG9zaXRpb24ueDtcclxuXHRcdFx0dmVydHNbaSozKzFdID0gcC5wb3NpdGlvbi55O1xyXG5cdFx0XHR2ZXJ0c1tpKjMrMl0gPSBwLnBvc2l0aW9uLno7XHJcblx0XHRcdHBhcmFtc1tpXSA9IHAubGlmZXRpbWU7XHJcblx0XHRcdG5lZWRfZW1pdC0tO1xyXG5cdFx0XHQvL2NvbG9yc1tpKjNdID0gdGhpcy5wYXJhbXMuY29sb3IuclxyXG5cdFx0XHQvL2NvbG9yc1tpKjMrMV0gPSB0aGlzLnBhcmFtcy5jb2xvci5nO1xyXG5cdFx0XHQvL2NvbG9yc1tpKjMrMl0gPSB0aGlzLnBhcmFtcy5jb2xvci5iO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIC8vY29uc29sZS5sb2coXCJjcmVhdGVkIG5ldyBwYXJ0aWNsZXMgXCIsIG9sZF9uZWVkX2VtaXQgLSBuZWVkX2VtaXQpO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnVwZGF0ZV9wYXJ0aWNsZV9nZW9tZXRyeSA9IGZ1bmN0aW9uIChkdClcclxue1xyXG5cdHZhciB2ZXJ0cyA9IHRoaXMuZ2VvbWV0cnkudmVydGljZXMuYXJyYXk7XHJcblx0dmFyIHBhcmFtcyA9IHRoaXMuZ2VvbWV0cnkucGFyYW1zLmFycmF5O1xyXG5cdHZhciBwO1xyXG5cdHZhciB2ZXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwwLDApO1xyXG5cdHZhciBkdW1teV9jb2xvciA9IHtcInJcIjoxLCBcImJcIjoxLCBcImdcIjoxfTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJ0aWNsZV9kYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHJcblx0XHRpZiAocGFyYW1zW2ldID4gMCkge1xyXG5cdFx0XHRwID0gdGhpcy5wYXJ0aWNsZV9kYXRhW2ldO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly9pbnRlZ3JhdGVcclxuXHRcdFx0cC5wb3NpdGlvbi54ICs9IHAudmVsb2NpdHkueCAqIGR0O1xyXG5cdFx0XHRwLnBvc2l0aW9uLnkgKz0gcC52ZWxvY2l0eS55ICogZHQ7XHJcblx0XHRcdHAucG9zaXRpb24ueiArPSBwLnZlbG9jaXR5LnogKiBkdDtcclxuXHRcdFx0cC5saWZldGltZSAtPSBkdDtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChwLmxpZmV0aW1lIDw9IDAgfHwgIXRoaXMuYWZmZWN0b3IuYWZmZWN0KGR0LCBwLCB2ZXJ0LCBkdW1teV9jb2xvcikpIHtcclxuXHRcdFx0XHRwLmxpZmV0aW1lID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHRwYXJhbXNbaV0gPSBwLmxpZmV0aW1lO1x0XHRcdFxyXG5cdFx0XHR2ZXJ0c1tpKjNdID0gcC5wb3NpdGlvbi54O1xyXG5cdFx0XHR2ZXJ0c1tpKjMrMV0gPSBwLnBvc2l0aW9uLnk7XHJcblx0XHRcdHZlcnRzW2kqMysyXSA9IHAucG9zaXRpb24uejtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBhcmFtcy5kaXNjcmV0ZV9lbWlzc2lvbikge1xyXG4gICAgICAgIHZhciBuZWVkX2VtaXQgPSB0aGlzLmVtaXR0ZXIuY2FsY19lbWl0dGVkX3BhcnRpY2xlcyhkdCk7XHJcbiAgICAgICAgdGhpcy5lbWl0X3BhcnRpY2xlcyhkdCwgbmVlZF9lbWl0KTtcclxuICAgIH1cclxuXHRcclxuXHR0aGlzLmdlb21ldHJ5LnZlcnRpY2VzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHR0aGlzLmdlb21ldHJ5LnBhcmFtcy5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0dGhpcy5nZW9tZXRyeS5jb2xvcnMubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdClcclxue1xyXG5cdHRoaXMudXBkYXRlX3BhcnRpY2xlX2dlb21ldHJ5KGR0KTtcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuZ2VuZXJhdGVfbWF0ZXJpYWxfbmFtZSA9IGZ1bmN0aW9uICgpXHJcbntcclxuXHR2YXIgbXlfbmFtZSA9IFwiTVlfUEFSVElDTEVfTUFURVJJQUxcIjtcclxuXHRpZiAoISF0aGlzLnRleHR1cmUpIHtcclxuXHRcdG15X25hbWUgKz0gIFwiX1dJVEhfVEVYVFVSRVwiO1xyXG5cdH1cclxuXHRpZiAodGhpcy5wYXJhbXMubm9fZmFkZV9jb2xvcikge1xyXG5cdFx0bXlfbmFtZSArPSBcIl9OT19GQURFX0NPTE9SXCI7XHJcblx0fVxyXG5cdHJldHVybiBteV9uYW1lO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmJsZW5kaW5nX21vZGUgPSBcclxue1xyXG5cdFwiYWRkaXRpdmVcIjoge1xyXG5cdFx0XCJibGVuZFNyY1wiOiBUSFJFRS5PbmVGYWN0b3IsXHJcblx0XHRcImJsZW5kRHN0XCI6IFRIUkVFLk9uZUZhY3RvclxyXG5cdH0sXHJcblx0XCJhbHBoYVwiOiB7XHJcblx0XHRcImJsZW5kU3JjXCI6IFRIUkVFLlNyY0FscGhhRmFjdG9yLFxyXG5cdFx0XCJibGVuZERzdFwiOiBUSFJFRS5PbmVNaW51c1NyY0FscGhhRmFjdG9yXHJcblx0fSxcclxuXHRcIm9uZV9hbHBoYVwiOiB7XHJcblx0XHRcImJsZW5kU3JjXCI6IFRIUkVFLk9uZUZhY3RvcixcclxuXHRcdFwiYmxlbmREc3RcIjogVEhSRUUuT25lTWludXNTcmNBbHBoYUZhY3RvclxyXG5cdH0sXHJcblx0XCJhbHBoYV9vbmVcIjoge1xyXG5cdFx0XCJibGVuZFNyY1wiOiBUSFJFRS5TcmNBbHBoYUZhY3RvcixcclxuXHRcdFwiYmxlbmREc3RcIjogVEhSRUUuT25lRmFjdG9yXHJcblx0fVxyXG59O1xyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5jb252ZXJ0X2JsZW5kaW5nX21vZGUgPSBmdW5jdGlvbiAoYmxlbmRpbmcpXHJcbntcclxuICAgIHZhciB0aHJlZV9ibGVuZGluZztcclxuXHR2YXIgZmFjdG9ycyA9IHRoaXMuYmxlbmRpbmdfbW9kZVtcIm9uZV9hbHBoYVwiXTtcclxuICAgIGlmIChibGVuZGluZyA9PT0gJ25vJykge1xyXG4gICAgICAgIHRocmVlX2JsZW5kaW5nID0gVEhSRUUuTm9CbGVuZGluZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyZWVfYmxlbmRpbmcgPSBUSFJFRS5DdXN0b21CbGVuZGluZzsgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuYmxlbmRpbmdfbW9kZVtibGVuZGluZ10pIHtcclxuICAgICAgICAgICAgZmFjdG9ycyA9IHRoaXMuYmxlbmRpbmdfbW9kZVtibGVuZGluZ107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcImJsZW5kaW5nXCI6IHRocmVlX2JsZW5kaW5nLCBcImZhY3RvcnNcIjpmYWN0b3JzfTtcclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfdGV4dHVyZSA9IGZ1bmN0aW9uICh0ZXh0dXJlKVxyXG57XHJcblx0aWYgKHR5cGVvZiB0ZXh0dXJlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtcy50ZXh0dXJlID09PSB0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJhbXMudGV4dHVyZSA9IHRleHR1cmU7XHJcblx0XHR0aGlzLnRleHR1cmUgPSBNeV9MaWIuVGV4dHVyZV9NYW5hZ2VyLmdldCh0ZXh0dXJlKTtcclxuXHR9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJPaCBTaGl0ISB0ZXh0dXJlIGluIHNldF90ZXh0dXJlIGlzIG5vdCBzdHJpbmchIGl0J3Mgb2JqZWN0IG9yIHVuZGVmaW5lZCFcIiwgdGV4dHVyZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubWF0ZXJpYWwudW5pZm9ybXMuc3ByaXRlKSB7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5zcHJpdGUudmFsdWUgPSB0aGlzLnRleHR1cmU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5zcHJpdGUgPSB7dmFsdWU6IHRleHR1cmV9O1xyXG4gICAgICAgIHRoaXMucmVjcmVhdGVfbWF0ZXJpYWwoKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiT2ggU2hpdCEgT3VyIHNoYWRlciBoYXMgbm90IHRleHR1cmUhIE5lZWQgY3JlYXRlIHNoYWRlciB3aXRoIHRleHR1cmUhXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5jcmVhdGVfdW5pZm9ybXMgPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICB2YXIgdW5pZm9ybXMgPSBcclxuICAgIHtcclxuICAgICAgICBcImxpZmV0aW1lXCI6IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucGFydGljbGVfbGlmZXRpbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicG9pbnRfc2l6ZVwiOiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnBhcmFtcy5zaXplXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjcmVlbl9zaXplXCI6IHtcclxuICAgICAgICAgICAgdmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKE15X0xpYi5WaWV3cG9ydC53aWR0aCwgTXlfTGliLlZpZXdwb3J0LmhlaWdodClcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgaWYgKCEhdGhpcy50ZXh0dXJlKSB7XHJcbiAgICAgICAgdW5pZm9ybXNbXCJzcHJpdGVcIl0gPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnRleHR1cmVcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgaWYgKCF0aGlzLmR5bmFtaWNfY29sb3IpIHtcclxuICAgICAgICB1bmlmb3Jtc1tcInBhcnRpY2xlX2NvbG9yXCJdID0ge3ZhbHVlOiB0aGlzLnBhcmFtcy5jb2xvcn07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5pZm9ybXM7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuY2FsY19kZWZpbmVzID0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgdmFyIGRlZmluZXMgPSB7fTtcclxuICAgIGlmICh0aGlzLnBhcmFtcy5wcmVfYWxwaGEpIHtcclxuICAgICAgICBkZWZpbmVzW1wiUFJFX0FMUEhBXCJdID0gdHJ1ZTtcclxuICAgIH1cclxuXHRpZiAoISF0aGlzLnRleHR1cmUpIHtcclxuICAgICAgICBkZWZpbmVzW1wiUEFSVElDTEVfVEVYVFVSRVwiXSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wYXJhbXMubm9fZmFkZV9jb2xvcikge1xyXG4gICAgICAgIGRlZmluZXNbXCJOT19GQURFX0NPTE9SXCJdID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBhcmFtcy5jb2xvcl9kb21haW4pIHtcclxuICAgICAgICBkZWZpbmVzW1wiRFlOQU1JQ19DT0xPUlNcIl0gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZmluZXM7XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNlbGVjdF90ZXh0dXJlID0gZnVuY3Rpb24gKHRleHR1cmUpXHJcbntcclxuXHRpZiAodHlwZW9mIHRoaXMudGV4dHVyZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdHRoaXMudGV4dHVyZSA9IE15X0xpYi5UZXh0dXJlX01hbmFnZXIuZ2V0KHRoaXMudGV4dHVyZSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRleHR1cmUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk9oLCBub3QgZm91bmQgdGV4dHVyZSA8XCIgKyB0aGlzLnBhcmFtcy50ZXh0dXJlICsgXCI+IGluIGNyZWF0ZSBwYXJ0aWNsZSBtYXRlcmlhbCEgSW5zdGVhZCBnZXQgXCIrdGhpcy50ZXh0dXJlKTtcclxuICAgICAgICB9XHJcblx0fVxyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZV9wYXJ0aWNsZV9tYXRlcmlhbCA9IGZ1bmN0aW9uKClcclxue1xyXG5cdFxyXG4gICAgdGhpcy5zZWxlY3RfdGV4dHVyZSh0aGlzLnRleHR1cmUpO1xyXG4gICAgXHJcbiAgICB2YXIgYmxlbmRfb2JqID0gdGhpcy5jb252ZXJ0X2JsZW5kaW5nX21vZGUodGhpcy5wYXJhbXMuYmxlbmRpbmcpO1xyXG4gICAgXHJcbiAgICBcclxuICAgIHZhciB1bmlmb3JtcyA9IHRoaXMuY3JlYXRlX3VuaWZvcm1zKCk7XHJcbiAgICB2YXIgZGVmaW5lcyA9IHRoaXMuY2FsY19kZWZpbmVzKCk7XHJcbiAgICBcclxuXHR2YXIgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKHtcclxuXHRcdHRyYW5zcGFyZW50OiB0cnVlLFxyXG5cdFx0ZGVwdGhXcml0ZTogdGhpcy5wYXJhbXMuZGVwdGhfd3JpdGUsXHJcblx0XHRkZXB0aFRlc3Q6IHRoaXMucGFyYW1zLmRlcHRoX3Rlc3QsXHJcbiAgICAgICAgYmxlbmRpbmc6IGJsZW5kX29iai5ibGVuZGluZyxcclxuICAgICAgICBibGVuZFNyYzogYmxlbmRfb2JqLmZhY3RvcnMuYmxlbmRTcmMsXHJcbiAgICAgICAgYmxlbmREc3Q6IGJsZW5kX29iai5mYWN0b3JzLmJsZW5kRHN0LFxyXG5cdFx0ZGVmaW5lczogZGVmaW5lcyxcclxuXHRcdHVuaWZvcm1zOiB1bmlmb3JtcyxcclxuXHRcdHZlcnRleFNoYWRlcjogUGFydGljbGVfU2hhZGVycy52ZXJ0ZXgsXHJcblx0XHRmcmFnbWVudFNoYWRlcjogUGFydGljbGVfU2hhZGVycy5mcmFnbWVudFxyXG5cdH0pO1xyXG5cdHJldHVybiBtYXQ7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUucmVjcmVhdGVfbWF0ZXJpYWwgPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICB0aGlzLm5vZGUubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsID0gdGhpcy5jcmVhdGVfcGFydGljbGVfbWF0ZXJpYWwoKTtcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X3ByZV9hbHBoYSA9IGZ1bmN0aW9uIChwcmVfYWxwaGEpXHJcbntcclxuICAgIGlmICh0aGlzLnBhcmFtcy5wcmVfYWxwaGEgIT09ICEhcHJlX2FscGhhKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMucHJlX2FscGhhID0gcHJlX2FscGhhO1xyXG4gICAgICAgIHRoaXMucmVjcmVhdGVfbWF0ZXJpYWwoKTtcclxuICAgIH1cclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfcG9pbnRfc2l6ZSA9IGZ1bmN0aW9uIChzaXplKVxyXG57XHJcbiAgICBpZiAodGhpcy5wYXJhbXMuc2l6ZSAhPSBzaXplKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5ub2RlLm1hdGVyaWFsLnVuaWZvcm1zW1wicG9pbnRfc2l6ZVwiXS52YWx1ZSA9IHNpemU7XHJcbiAgICB9XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X2JsZW5kaW5nID0gZnVuY3Rpb24gKGJsZW5kaW5nKVxyXG57XHJcbiAgICB0aGlzLnBhcmFtcy5ibGVuZGluZyA9IGJsZW5kaW5nO1xyXG4gICAgdmFyIGIgPSB0aGlzLmNvbnZlcnRfYmxlbmRpbmdfbW9kZShibGVuZGluZyk7XHJcbiAgICB0aGlzLm1hdGVyaWFsLmJsZW5kaW5nID0gYi5ibGVuZGluZztcclxuICAgIHRoaXMubWF0ZXJpYWwuYmxlbmRTcmMgPSBiLmZhY3RvcnMuYmxlbmRTcmM7XHJcbiAgICB0aGlzLm1hdGVyaWFsLmJsZW5kRHN0ID0gYi5mYWN0b3JzLmJsZW5kRHN0O1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpXHJcbntcclxuXHR2YXIgZGF0YSA9IHt9O1xyXG4gICAgZGF0YS51dWlkID0gdGhpcy51dWlkO1xyXG4gICAgZGF0YS5ub2RlID0gdGhpcy5ub2RlLnV1aWQ7XHJcbiAgICBpZiAodGhpcy5uYW1lIHx8IHRoaXMubm9kZS5uYW1lKSB7XHJcbiAgICAgICAgZGF0YS5uYW1lID0gdGhpcy5uYW1lIHx8IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgfVxyXG5cdGRhdGEucGFyYW1zID0ge307XHJcblx0aWYgKHRoaXMucGFyYW1zKSB7XHJcblx0XHRfLmNvcHlfb2JqZWN0KGRhdGEucGFyYW1zLCB0aGlzLnBhcmFtcyk7XHJcblx0fVxyXG5cdGRhdGEucGFyYW1zLmVtaXR0ZXIgPSB0aGlzLmVtaXR0ZXIudG9KU09OKCk7XHJcblx0ZGF0YS5wYXJhbXMuYWZmZWN0b3IgPSB0aGlzLmFmZmVjdG9yLnRvSlNPTigpO1xyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfZW1pdHRlciA9IGZ1bmN0aW9uIChlbWl0dGVyKVxyXG57XHJcbiAgICB0aGlzLmVtaXR0ZXIgPSB0aGlzLnBhcmFtcy5lbWl0dGVyID0gZW1pdHRlcjtcclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfcGFydGljbGVfbGlmZV9sZW5ndGggPSBmdW5jdGlvbiAodmFsKVxyXG57XHJcblx0aWYgKHZhbCAhPT0gdGhpcy5wYXJhbXMucGFydGljbGVfbGlmZXRpbWUpIHtcclxuXHRcdHRoaXMucGFyYW1zLnBhcnRpY2xlX2xpZmV0aW1lID0gdGhpcy5wYXJ0aWNsZV9saWZldGltZSA9IHZhbDtcclxuXHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbJ2xpZmV0aW1lJ10udmFsdWUgPSB2YWw7XHJcblx0fVxyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNldF9lbWlzc2lvbl9wZXJfc2Vjb25kID0gZnVuY3Rpb24gKHZhbClcclxue1xyXG5cdHRoaXMuZW1pdHRlci5lbWl0X3Blcl9zZWNvbmQgPSB2YWw7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X3BhcnRpY2xlX2NvdW50ID0gZnVuY3Rpb24gKGNvdW50KVxyXG57XHJcblx0aWYgKGNvdW50ICE9PSB0aGlzLnBhcnRpY2xlX2RhdGEubGVuZ3RoKSB7XHJcblx0XHR0aGlzLnBhcmFtcy5jb3VudCA9IGNvdW50O1xyXG5cdFx0dGhpcy5ub2RlLmdlb21ldHJ5ID0gdGhpcy5jcmVhdGVfcGFydGljbGVfZ2VvbWV0cnkoY291bnQpO1xyXG5cdH1cclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfY29sb3IgPSBmdW5jdGlvbiAoY29sb3IpXHJcbntcclxuICAgIHRoaXMucGFyYW1zLmNvbG9yLnIgPSBjb2xvci5yO1xyXG4gICAgdGhpcy5wYXJhbXMuY29sb3IuZyA9IGNvbG9yLmc7XHJcbiAgICB0aGlzLnBhcmFtcy5jb2xvci5iID0gY29sb3IuYjtcclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfYm91bmRpbmdfc3BoZXJlX3JhZGl1cyA9IGZ1bmN0aW9uIChyYWRpdXMpXHJcbntcclxuICAgIHRoaXMubm9kZS5ib3VuZGluZ1NwaGVyZS5yYWRpdXMgPSByYWRpdXM7XHJcbn1cclxuXHJcbmV4cG9ydCB7UGFydGljbGVfU3lzdGVtfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlcy5qcyIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuLi9iYXNlL215X2xpYi5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVfRW1pdHRlcn0gZnJvbSAnLi9wYXJ0aWNsZV9lbWl0dGVyLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9BZmZlY3Rvcn0gZnJvbSAnLi9wYXJ0aWNsZV9hZmZlY3Rvci5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVzX1BvaW50c30gZnJvbSAnLi9wYXJ0aWNsZXNfcG9pbnRzLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9TeXN0ZW19IGZyb20gJy4vcGFydGljbGVzLmpzJztcclxuXHJcblxyXG4gZnVuY3Rpb24gUGFydGljbGVfTWFuYWdlciAoKVxyXG57XHJcblx0dGhpcy5wYXJ0aWNsZXMgPSB7fTtcclxuICAgIHRoaXMucGFydGljbGVzX2FycmF5ID0gW107XHJcbn1cclxuXHJcbl8uY29weV9vYmplY3QoUGFydGljbGVfTWFuYWdlci5wcm90b3R5cGUsIFxyXG4gICAge1xyXG4gICAgY29uc3RydWN0b3I6IFBhcnRpY2xlX01hbmFnZXIsXHJcbiAgICBhZGQ6ICBmdW5jdGlvbiAocHMsbmFtZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMucGFydGljbGVzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW25hbWVdID0gcHM7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzX2FycmF5LnB1c2gocHMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmVfcGFydGljbGVzOiAgZnVuY3Rpb24gKG5hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHBzID0gdGhpcy5wYXJ0aWNsZXNbbmFtZV07XHJcbiAgICAgICAgdmFyIGkgPSB0aGlzLnBhcnRpY2xlc19hcnJheS5pbmRleE9mKHBzKTtcclxuICAgICAgICBpZiAoaSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzX2FycmF5LnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBzKSB7XHJcbiAgICAgICAgICAgIHBzLnN1aWNpZGUoKTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMucGFydGljbGVzW25hbWVdO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRfcGFydGljbGVfbmFtZXM6ICBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMucGFydGljbGVzKSB7XHJcbiAgICAgICAgICAgIG5hbWVzLnB1c2goa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hbWVzO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgOiBmdW5jdGlvbiAoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFydGljbGVzX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzX2FycmF5W2ldLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgY3JlYXRlX2J5X3BhcmFtczogZnVuY3Rpb24gKHBhcmFtcylcclxuICAgIHtcclxuICAgICAgICB2YXIgcHMgPSBuZXcgUGFydGljbGVfU3lzdGVtKHBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5hZGQocHMpO1xyXG4gICAgICAgIHJldHVybiBwcztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHRvSlNPTiA6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFyciA9IFtdXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGRhdGE7XHJcbiAgICAgICAgdmFyIHA7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5wYXJ0aWNsZXMpe1xyXG4gICAgICAgICAgICBwID0gdGhpcy5wYXJ0aWNsZXNba2V5XTtcclxuICAgICAgICAgICAgaWYgKHAudXVpZCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHAudG9KU09OKCk7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH0sXHJcblxyXG4gICAgZW1pdHRlcl9mYWJyaWM6ICBmdW5jdGlvbiAocGFyYW1zKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChwYXJhbXMuZW1pdHRlcikge1xyXG4gICAgICAgICAgICB2YXIgZW1pdHRlciA9IE15X0xpYi5HZXRfQ2xhc3MocGFyYW1zLmVtaXR0ZXIubmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChlbWl0dGVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyID0gbmV3IGVtaXR0ZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIgPSBuZXcgUGFydGljbGVfRW1pdHRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVtaXR0ZXIucGFyc2UocGFyYW1zLmVtaXR0ZXIucGFyYW1zKTtcclxuICAgICAgICAgICAgcmV0dXJuIGVtaXR0ZXI7ICAgICAgICBcclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGFmZmVjdG9yX2ZhYnJpYzogIGZ1bmN0aW9uIChwYXJhbXMpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hZmZlY3Rvcikge1xyXG4gICAgICAgICAgICB2YXIgYWZmZWN0b3IgPSBNeV9MaWIuR2V0X0NsYXNzKHBhcmFtcy5hZmZlY3Rvci5uYW1lKTtcclxuICAgICAgICAgICAgaWYgKGFmZmVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBhZmZlY3RvciA9IG5ldyBhZmZlY3RvcigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWZmZWN0b3IgPSBuZXcgUGFydGljbGVfQWZmZWN0b3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZmZlY3Rvci5wYXJzZShwYXJhbXMuYWZmZWN0b3IucGFyYW1zKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFmZmVjdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSxcclxuXHJcbiAgICBmcm9tSlNPTjogZnVuY3Rpb24gKGpzb24sIGNhbGxiYWNrLCByb290LCBuYW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcnRpY2xlc1tuYW1lXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkcgUGFydGljbGUgTWFuYWdlciEgUGFydGljbGUgU3lzdGVtIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0cnlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShqc29uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHBhcnNpbmcganNvbiBvbiBcIiwgbmFtZSwganNvbik7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGRhdGEsIHJvb3QsIG5hbWUpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChkYXRhLCByb290LCBuYW1lKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBlbWl0dGVyID0gdGhpcy5lbWl0dGVyX2ZhYnJpYyhkYXRhLnBhcmFtcyk7XHJcbiAgICAgICAgdmFyIGFmZmVjdG9yID0gdGhpcy5hZmZlY3Rvcl9mYWJyaWMoZGF0YS5wYXJhbXMpO1xyXG4gICAgICAgIGRhdGEucGFyYW1zLmVtaXR0ZXIgPSBlbWl0dGVyO1xyXG4gICAgICAgIGRhdGEucGFyYW1zLmFmZmVjdG9yID0gYWZmZWN0b3I7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHBzID0gbmV3IFBhcnRpY2xlX1N5c3RlbShkYXRhLnBhcmFtcyk7XHJcbiAgICAgICAgcHMuc2V0X25hbWUoZGF0YS5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgIC8vYWRkIHRvIHNjZW5lIGdyYXBoXHJcbiAgICAgICAgaWYgKGRhdGEucGFyYW1zLnBhcmVudCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gcm9vdC5nZXRPYmplY3RCeU5hbWUoZGF0YS5wYXJhbXMucGFyZW50KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhLnBhcmFtcy5wYXJlbnQsIFwicGFyZW50IHBhcnRpY2xlc1wiLCBuYW1lLCByb290KTtcclxuICAgICAgICAgICAgcGFyZW50LmFkZChwcy5ub2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgIHJvb3QuYWRkKHBzLm5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy91Z2x5IGZ1Y2tpbmcgaGFja1xyXG4gICAgICAgIC8vY29weSBub2RlIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLmFkZChwcywgbmFtZSk7ICAgIFxyXG4gICAgICAgIHJldHVybiBwcztcclxuICAgIH0sXHJcblxyXG4gICAgbG9hZF9wYXJ0aWNsZXM6ICBmdW5jdGlvbiAoanNvbiwgcm9vdClcclxuICAgIHtcclxuICAgICAgICB2YXIgcGFydGljbGVzID0ganNvbi5wYXJ0aWNsZXM7XHJcbiAgICAgICAgZm9yKHZhciBpID0wOyBpIDwgcGFydGljbGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHAgPSBwYXJ0aWNsZXNbaV07XHJcbiAgICAgICAgICAgIHZhciBwcyA9IHRoaXMucGFyc2UocCwgcm9vdCwgcC5uYW1lKTtcclxuICAgICAgICAgICAgcHMubm9kZS51dWlkID0gcC5ub2RlO1xyXG4gICAgICAgICAgICBwcy5ub2RlLm5hbWUgPSBwLm5hbWU7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSByb290LmdldE9iamVjdEJ5UHJvcGVydHkoXCJ1dWlkXCIsIHAubm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChvYmopIHtcclxuICAgICAgICAgICAgICAgIHBzLm5vZGUucmVwbGFjZV9vYmplY3Rfd2l0aF90aGlzKG9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZV9uYW1lOiAgZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICB2YXIgbnVtYmVyID0gdGhpcy5wYXJ0aWNsZXNfYXJyYXkubGVuZ3RoICsgMTtcclxuICAgICAgICB2YXIgYmVnaW5fbmFtZSA9ICdQYXJ0aWNsZV9TeXN0ZW1fJztcclxuICAgICAgICB2YXIgdGVzdGluZyA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUgKHRlc3RpbmcpIHtcclxuICAgICAgICAgICAgbmFtZSA9IGJlZ2luX25hbWUgKyBudW1iZXI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnRpY2xlc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBudW1iZXIgKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlX25ldyA6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmNyZWF0ZV9uYW1lKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgIHZhciBwcyA9IG5ldyBQYXJ0aWNsZV9TeXN0ZW0ocGFyYW1zKTtcclxuICAgICAgICBwcy5zZXRfbmFtZShuYW1lKTtcclxuICAgICAgICB0aGlzLmFkZChwcywgbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHBzO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5pZiAoTXlfTGliLnBhcnRpY2xlX21hbmFnZXIgPT09IHVuZGVmaW5lZCkgXHJcbntcclxuICAgIE15X0xpYi5wYXJ0aWNsZV9tYW5hZ2VyID0gbmV3IFBhcnRpY2xlX01hbmFnZXIoKTtcclxufVxyXG5cclxuTXlfTGliLlBhcnRpY2xlc19Db25maWcgPSB7XHJcblwiYm94X3NpemVcIjogMTBcclxufTtcclxuXHJcblxyXG5leHBvcnQge1BhcnRpY2xlX01hbmFnZXJ9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVzX21hbmFnZXIuanMiLCJ2YXIgUG9pbnRfR2VuZXJhdG9ycyA9IHt9O1xyXG5cclxuXHJcblBvaW50X0dlbmVyYXRvcnMuUmFuZG9tX0RpcmVjdGlvbiA9IGZ1bmN0aW9uICgpXHJcbntcclxufVxyXG5cclxuUG9pbnRfR2VuZXJhdG9ycy5SYW5kb21fRGlyZWN0aW9uLnByb3RvdHlwZS5nZXRfZGlyZWN0aW9uID0gZnVuY3Rpb24gKHZlY3Rvcilcclxue1xyXG5cdHZlY3Rvci54ID0gTWF0aC5yYW5kb20oKTsgXHJcblx0dmVjdG9yLnkgPSBNYXRoLnJhbmRvbSgpOyBcclxuXHR2ZWN0b3IueiA9IE1hdGgucmFuZG9tKCk7XHJcbn1cclxuXHJcblBvaW50X0dlbmVyYXRvcnMuU3BoZXJlID0gZnVuY3Rpb24gKHJhZGl1cylcclxue1xyXG5cdHRoaXMucmFkaXVzID0gcmFkaXVzO1xyXG59XHJcblxyXG5Qb2ludF9HZW5lcmF0b3JzLlNwaGVyZS5wcm90b3R5cGUuZ2V0X2lubmVyX3BvaW50ID0gZnVuY3Rpb24gKHZlY3Rvcilcclxue1xyXG5cdHZhciBhbHBoYSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcclxuXHR2YXIgYmV0YSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJO1xyXG5cdHZlY3Rvci54ID0gTWF0aC5jb3MoYWxwaGEpICogTWF0aC5zaW4oYmV0YSk7XHJcblx0dmVjdG9yLnkgPSBNYXRoLmNvcyhiZXRhKTtcclxuXHR2ZWN0b3IueiA9IE1hdGguc2luKGFscGhhKSAqIE1hdGguc2luKGJldGEpO1xyXG59XHJcblxyXG5Qb2ludF9HZW5lcmF0b3JzLlNwaGVyZS5wcm90b3R5cGUuZ2V0X25vcm1hbCA9IGZ1bmN0aW9uICh2ZWN0b3IpXHJcbntcclxuXHR2ZWN0b3IueCA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcclxuXHR2ZWN0b3IueSA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcclxuXHR2ZWN0b3IueiA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcclxuXHR2ZWN0b3Iubm9ybWFsaXplKCk7XHJcbn1cclxuXHJcblBvaW50X0dlbmVyYXRvcnMuU3BoZXJlLnByb3RvdHlwZS5nZXRfcG9pbnQgPSBmdW5jdGlvbiAodmVjdG9yKSBcclxue1xyXG5cdHRoaXMuZ2V0X25vcm1hbCh2ZWN0b3IpO1xyXG5cdHZlY3Rvci5tdWx0aXBseVNjYWxhcih0aGlzLnJhZGl1cyk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQge1BvaW50X0dlbmVyYXRvcnN9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvcG9pbnRfZ2VuZXJhdG9ycy5qcyIsImV4cG9ydCAqIGZyb20gJy4vYmFzZS9ldmVudF9odWIuanMnO1xyXG5cclxuZXhwb3J0IHtNeV9MaWJ9IGZyb20gJy4vYmFzZS9teV9saWIuanMnO1xyXG5cclxuZXhwb3J0IHtCYXNlX0FuaW1hdGlvbiwgRXVsZXJfQW5pbWF0aW9uLCBTY2FsZV9BbmltYXRpb259IGZyb20gJy4vYmFzZS9hbmltYXRpb25zLmpzJztcclxuZXhwb3J0IHtNb3VzZV9JbnRlcnNlY3Rvcn0gZnJvbSAnLi9iYXNlL21vdXNlX2ludGVyc2VjdG9yLmpzJztcclxuZXhwb3J0IHtNb3VzZV9DYW1lcmFfQ29udHJvbGxlcn0gZnJvbSAnLi9iYXNlL21vdXNlX2NhbWVyYV9jb250cm9sbGVyLmpzJztcclxuZXhwb3J0IHtMb2FkaW5nX01hbmFnZXJ9IGZyb20gJy4vYmFzZS9sb2FkaW5nX21hbmFnZXIuanMnO1xyXG5leHBvcnQge1BhY2thZ2VfTWFuYWdlcn0gZnJvbSAnLi9iYXNlL3BhY2thZ2VfbWFuYWdlci5qcyc7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQge1BhcnRpY2xlc19Qb2ludHN9IGZyb20gJy4vcGFydGljbGVzL3BhcnRpY2xlc19wb2ludHMuanMnO1xyXG5leHBvcnQge1BhcnRpY2xlX0VtaXR0ZXJ9IGZyb20gJy4vcGFydGljbGVzL3BhcnRpY2xlX2VtaXR0ZXIuanMnO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9Gb3JjZXN9IGZyb20gJy4vcGFydGljbGVzL2ZvcmNlcy5qcyc7XHJcblxyXG5leHBvcnQge1BhcnRpY2xlX0FmZmVjdG9yfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZV9hZmZlY3Rvci5qcyc7XHJcblxyXG5leHBvcnQge1BvaW50X0dlbmVyYXRvcnN9IGZyb20gJy4vcGFydGljbGVzL3BvaW50X2dlbmVyYXRvcnMuanMnO1xyXG5cclxuZXhwb3J0IHtDdXN0b21fRW1pdHRlcn0gZnJvbSAnLi9wYXJ0aWNsZXMvY3VzdG9tX2VtaXR0ZXIuanMnO1xyXG5cclxuZXhwb3J0IHtDdXN0b21fQWZmZWN0b3J9IGZyb20gJy4vcGFydGljbGVzL2N1c3RvbV9hZmZlY3Rvci5qcyc7XHJcblxyXG5leHBvcnQge0NvbmVfRW1pdHRlciwgU3Rhcl9EdXN0X0VtaXR0ZXIsIFNwaGVyZV9FbWl0dGVyLCBTdGFyX0R1c3RfQWZmZWN0b3J9IGZyb20gJy4vcGFydGljbGVzL3Rlc3RfZW1pdHRlcnMuanMnO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9TaGFkZXJzfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZV9zaGFkZXJzLmpzJztcclxuXHJcbmV4cG9ydCB7UGFydGljbGVfU3lzdGVtfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZXMuanMnO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9NYW5hZ2VyfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZXNfbWFuYWdlci5qcyc7XHJcblxyXG5leHBvcnQge1NjZW5lX1NlcmlhbGl6ZXJ9IGZyb20gJy4vYmFzZS9zY2VuZV9zZXJpYWxpemVyLmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi9taXhpbnMvdGhyZWVqc19taXhpbnMuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL21peGlucy9jYW1lcmFfbWl4aW4uanMnO1xyXG5cclxuZXhwb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSAnLi9hcHAvYXBwbGljYXRpb24uanMnO1xyXG5cclxuZXhwb3J0IHtDb2xvcl9Eb21haW4sIFRhYmxlX0NvbG9yfSBmcm9tICcuL3BhcnRpY2xlcy9jb2xvcl9kb21haW4uanMnO1xyXG5cclxuXHJcbmV4cG9ydCB7U2ltcGxlX0NvbGxpZGVyfSBmcm9tICcuL2Jhc2Uvc2ltcGxlX2NvbGxpZGVyLmpzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW5naW5lX21haW5fd2VicGFjay5qcyIsImV4cG9ydCB7Y3JlYXRlX3Z1ZV9hcHB9IGZyb20gJy4vZ3VpL3Z1ZWFwcC5qcyc7XHJcbmV4cG9ydCB7Q29sb3JfUGlja2VyfSBmcm9tICcuL2d1aS9jb2xvcl9waWNrZXIuanMnO1xyXG5leHBvcnQge1RleHR1cmVfUGFuZWx9IGZyb20gJy4vZ3VpL3RleHR1cmVfcGFuZWwuanMnO1xyXG5leHBvcnQge1BhcnRpY2xlc19Qcm9wc30gZnJvbSAnLi9ndWkvcGFydGljbGVzX3Byb3BzLmpzJztcclxuZXhwb3J0IHtQYXJ0aWNsZXNfUGFuZWx9IGZyb20gJy4vZ3VpL3BhcnRpY2xlc19wYW5lbC5qcyc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2d1aV9tYWluX3dlYnBhY2suanMiLCIvKlxyXG5tYWluIGNsYXNzXHJcbnRoaXMgaGFzIGFic3RyYWN0IHZpcnR1YWwgbWV0aG9kc1xyXG5zdGFydCAtIHdoaWNoIGNyZWF0ZSByZW5kZXJlciBhbmQgY29uZHVjdCBzdGFydCBpbml0aWFsaXphdGlvbnNcclxudXBkYXRlIC0gdXBkYXRlZCBzY2VuZSBvYmplY3RzLCBhbmltYXRpb25zLCBwaGlzaWNzXHJcbnJlbmRlciAtIGNvbnRyb2wgc2NlbmUgcmVuZGVyaW5nXHJcbnRoaXMgbWV0aG9kcyBtdXN0IHJld3JpdGUgb24gZGVyaXZlZCBjbGFzc2VzXHJcbm5lZWQgc2V0IFxyXG5QUk9QRVJUSUVTXHJcbm1haW5fY2FtZXJhIC0gY2FtZXJhIHdoaWNoIHBvaW50IG9mIHZpZXcgcmVuZGVyIHdob2xlIHNjZW5lIGFuZCB1c2VyIGludGVyYWN0c1xyXG5kb21fc2NyZWVuIC0gZG9tIGVsZW1lbnQgd2hpY2ggY29udGFpbiBjYW52YXMgYW5kIGRpc3BsYXkgc2NlbmVcclxucmVuZGVyZXIgLSB0aHJlZS5qcyByZW5kZXJlclxyXG5jYW52YXMgLSBpcyBjcmVhdGVkIGJ5IHRocmVlLmpzIHJlbmRlcmVyLCBpdCBoYXZlIHRvIGFwcGVuZCB0byBkb21fc2NyZWVuIGNoaWxkcmVuLCBmdWNrIGl0XHJcbmNhbnZhcyB3aWR0aCBhbmQgaGVpZ2h0IGRlZmluaW5nIG9uIGNyZWF0aW5nIGl0IGJ5IHJlbmRlcmVyLCBmdWNrIGl0XHJcblxyXG5cclxuXHJcbiovXHJcblxyXG5pbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5pbXBvcnQge21haW5fZXZlbnRfaHViLCBFdmVudF9IdWJ9IGZyb20gJy4uL2Jhc2UvZXZlbnRfaHViLmpzJztcclxuaW1wb3J0IHtNb3VzZV9JbnRlcnNlY3Rvcn0gZnJvbSAnLi4vYmFzZS9tb3VzZV9pbnRlcnNlY3Rvci5qcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gQXBwbGljYXRpb24gKGNvbmZpZylcclxue1xyXG5cclxuICAgIHRoaXMuX2xpZmVjeWNsZV9ldmVudChcImJlZm9yZV9jcmVhdGVkXCIpO1xyXG4gICBcclxuICAgIHRoaXMuX2luaXRfdGltZXIoKTtcclxuICAgIHRoaXMuX2NyZWF0ZV9sb29wX2Z1bmN0aW9uKCk7XHJcbiAgICBcclxuXHR0aGlzLm1vdXNlX2NvbnRyb2xsZXJzID0gW107XHJcbiAgICBcclxuICAgIG1haW5fZXZlbnRfaHViLmFkZF9ldmVudF9saXN0ZW5lcihcImtpbGxfbWVcIiwgZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlX2FuaW1hdGVkX29iamVjdChvYmopO1xyXG4gICAgfSwgdGhpcyk7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uIChjb25maWcpXHJcbntcclxuICAgIGNvbnNvbGUubG9nKFwic3RhcnQgYXBwbGljYXRpb24uLi5cIik7XHJcbiAgIHRoaXMuX3NldF9jb25maWd1cmF0aW9uKGNvbmZpZyk7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5fbGlmZWN5Y2xlX2V2ZW50ID0gZnVuY3Rpb24gKG5hbWUsIGV2ZW50KVxyXG57XHJcbiAgICBpZiAodGhpc1tuYW1lXSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW25hbWVdKGV2ZW50KTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5faW5pdF90aW1lciA9IGZ1bmN0aW9uICgpXHJcbntcclxuXHR0aGlzLmNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XHRcclxuXHR0aGlzLmRlbHRhX3RpbWUgPSAwO1xyXG5cdHRoaXMuYW5pbWF0ZWRfb2JqZWN0cyA9IFtdO1xyXG59XHJcblxyXG5cclxudmFyIHJ1bl9mdW5jdGlvbiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuXHRmdW5jdGlvbihjYWxsYmFjayl7XHJcblx0XHR3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuXHR9XHJcblx0XHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLl9jcmVhdGVfbG9vcF9mdW5jdGlvbiA9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHR0aGlzLnJ1biA9IGZ1bmN0aW9uICgpXHJcblx0e1xyXG5cdFx0cnVuX2Z1bmN0aW9uKGZ1bmN0aW9uICgpIFxyXG5cdFx0eyBcclxuXHRcdFx0c2VsZi5sb29wKCk7XHJcbiAgICAgICAgICAgIC8vbWFpbl9ldmVudF9odWIuZW1pdChcIm5ld19mcmFtZVwiKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuICAgIC8vTXlfTGliLmNyZWF0ZV9ydW5fZnVuY3Rpb24odGhpcyk7XHJcbiAgICBcclxuICAgIC8vbWFpbl9ldmVuX2h1Yi5hZGRfZXZlbnRfbGlzdGVuZXIoXCJuZXdfZnJhbWVcIiwgdGhpcy5sb29wLCB0aGlzKTsgICAgXHJcbn1cclxuXHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuZ2V0X2RlZmF1bHRfY29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgXCJkb21fZWxlbWVudFwiOiBcInNjcmVlblwiLFxyXG4gICAgICAgIFwicmVuZGVyX3BhcmFtc1wiOiB7XHJcbiAgICAgICAgICAgIFwicHJlbXVsdGlwbGllZEFscGhhXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiYWxwaGFcIjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ2aWV3cG9ydFwiOiB7XHJcbiAgICAgICAgICAgIFwid2lkdGhcIjogODAwLFxyXG4gICAgICAgICAgICBcImhlaWdodFwiOiA2MDBcclxuICAgICAgICAgfSxcclxuICAgICAgICAgXCJjbGVhcl9jb2xvclwiOiAweDAwMDBGRixcclxuICAgICAgICBcIm1haW5fY2FtZXJhXCI6IHtcclxuICAgICAgICAgICAgXCJmb3ZcIjogODAsXHJcbiAgICAgICAgICAgIFwibmVhclwiOiAwLjEsXHJcbiAgICAgICAgICAgIFwiZmFyXCI6IDEwMDAsXHJcbiAgICAgICAgICAgIFwiYXNwZWN0X3JhdGlvXCI6IDEuMzMzMzMzMzMzMzMzMzMzMyxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInhcIjogMCxcclxuICAgICAgICAgICAgICAgIFwieVwiOiAwLFxyXG4gICAgICAgICAgICAgICAgXCJ6XCI6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5fY3JlYXRlX3JlbmRlciA9IGZ1bmN0aW9uIChqc29uKVxyXG57XHJcbiAgICBpZiAodGhpcy5kb21fc2NyZWVuIHx8IHRoaXMucmVuZGVyZXIpIHtcclxuICAgICAgICBhbGVydChcIkNyZWF0ZSByZW5kZXIgYWxlcnQhIFNvbWV0aGluZyBzdHJhbmdlIGhhcHBlbmVzIVwiKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5kb21fc2NyZWVuKSB7XHJcbiAgICAgICAgdGhpcy5kb21fc2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoanNvbi5kb21fZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMucmVuZGVyZXIpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoanNvbi5yZW5kZXJfcGFyYW1zKTtcclxuICAgIH1cclxuICAgIGlmICghISF0aGlzLmRvbV9zY3JlZW4gfHwgdHlwZW9mIHRoaXMuZG9tX3NjcmVlbiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29tZSB0ZXJyb3JvdXMgaGFwcGVucyEgZG9tIGVsZW1lbnQgZm9yIHNjcmVlbiBub3QgZm91bmQhIGVsZW1lbnQgaWQgaXMgXCIgKyBqc29uLmRvbV9lbGVtZW50KTtcclxuICAgIH1cclxuICAgIC8vY29uc29sZS5sb2coXCJmb3VuZCBkb21lIGVsZW1lbnQgXCIgKyBqc29uLmRvbV9lbGVtZW50KTtcclxuICAgIHRoaXMuZG9tX3NjcmVlbi5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XHJcbiAgICBcclxuICAgIFxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKGpzb24udmlld3BvcnQud2lkdGgsIGpzb24udmlld3BvcnQuaGVpZ2h0KTtcclxuICAgIHRoaXMuc2V0X3ZpZXdwb3J0KGpzb24udmlld3BvcnQud2lkdGgsIGpzb24udmlld3BvcnQuaGVpZ2h0KTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihqc29uLmNsZWFyX2NvbG9yKTtcclxuICAgIFxyXG4gICAgdGhpcy5fbGlmZWN5Y2xlX2V2ZW50KFwicmVuZGVyX2NyZWF0ZWRcIik7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5fY3JlYXRlX21haW5fc2NlbmUgPSBmdW5jdGlvbiAoanNvbilcclxue1xyXG4gICAgdmFyIGV2ZW50ID0ge3ByZXZlbnQ6IGZhbHNlfTtcclxuICAgIHRoaXMuX2xpZmVjeWNsZV9ldmVudChcImJlZm9yZV9jcmVhdGVfbWFpbl9zY2VuZVwiLCBldmVudCk7XHJcbiAgICAvKlxyXG4gICAgaWYgKGV2ZW50LnByZXZlbnQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgaWYgKCF0aGlzLm1haW5fc2NlbmUpIHtcclxuICAgICAgICB0aGlzLm1haW5fc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIGNhbWVyYSA9IGpzb24ubWFpbl9jYW1lcmE7ICAgIFxyXG4gICAgaWYgKCF0aGlzLm1haW5fY2FtZXJhKSB7XHJcbiAgICAgICAgdGhpcy5tYWluX2NhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShjYW1lcmEuZm92LCBjYW1lcmEuYXNwZWN0X3JhdGlvLCBjYW1lcmEubmVhciwgY2FtZXJhLmZhcik7XHJcbiAgICAgICAgdGhpcy5tYWluX3NjZW5lLmFkZCh0aGlzLm1haW5fY2FtZXJhKTtcclxuICAgICAgICB0aGlzLm1haW5fY2FtZXJhLm5hbWUgPSBcIm1haW5fY2FtZXJhXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubWFpbl9jYW1lcmEuZm92ID0gY2FtZXJhLmZvdjtcclxuICAgICAgICB0aGlzLm1haW5fY2FtZXJhLm5lYXIgPSBjYW1lcmEubmVhcjtcclxuICAgICAgICB0aGlzLm1haW5fY2FtZXJhLmZhciA9IGNhbWVyYS5mYXI7XHJcbiAgICAgICAgdGhpcy5tYWluX2NhbWVyYS5hc3BlY3QgPSBjYW1lcmEuYXNwZWN0X3JhdGlvO1xyXG4gICAgICAgIHRoaXMubWFpbl9jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLm1haW5fY2FtZXJhLnBvc2l0aW9uLnNldChjYW1lcmEucG9zaXRpb24ueCwgY2FtZXJhLnBvc2l0aW9uLnksIGNhbWVyYS5wb3NpdGlvbi56KTtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLmFwcGx5X2NvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbiAoanNvbilcclxue1xyXG4gICAgdGhpcy5jb25maWd1cmF0aW9uID0ganNvbjtcclxuICAgIHRoaXMuX2NyZWF0ZV9yZW5kZXIoanNvbik7XHJcbiAgICB0aGlzLl9jcmVhdGVfbWFpbl9zY2VuZShqc29uKTtcclxuICAgIHRoaXMuX2xpZmVjeWNsZV9ldmVudChcImNyZWF0ZWRcIik7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5sb2FkX2NvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbiAodXJsKVxyXG57XHJcbiAgICB2YXIgeGhyID0gbmV3IFRIUkVFLlhIUkxvYWRlcigpO1xyXG4gICAgXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBcclxuICAgIHZhciBjb25maWcgPSBzZWxmLmdldF9kZWZhdWx0X2NvbmZpZ3VyYXRpb24oKTtcclxuICAgIFxyXG4gICAgdmFyIGNvbmZpZ3VyYXRpb25faXNfYXBwbGllZCA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBvbmxvYWQgKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNvbmZpZ3VyYXRpb24gbG9hZGVkIGZyb20gdXJsIDw8XCIgKyB1cmwgKyBcIj4+XCIpO1xyXG4gICAgICAgIHZhciBvYmogPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIC8vdXNlciBjb25maWcgYXBwZW5kIHRvIGRlZmF1bHQgY29uZmlnIGFuZCBtYXkgcmV3cml0ZSB0aGVtLCBcclxuICAgICAgICAvL3Rob3VnaCB1c2VyIG5hdmVuJ3QgdG8gcmV3cml0ZSBBTEwgY29uZmlnIHRvIGNoYW5nZSBzb21lIHBhcmFtc1xyXG4gICAgICAgIF8uY29weV9vYmplY3QoY29uZmlnLCBvYmopO1xyXG4gICAgICAgIHNlbGYuYXBwbHlfY29uZmlndXJhdGlvbihjb25maWcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvbmZpZ3VyYXRpb25faXNfYXBwbGllZCwgXCJvbmxvYWRcIik7ICAgICAgICBcclxuICAgICAgICBjb25maWd1cmF0aW9uX2lzX2FwcGxpZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcHJvZ3Jlc3MoKSB7fVxyXG4gICAgZnVuY3Rpb24gZXJyb3IoZXZlbnQpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igb24gbG9hZGluZyBjb25maWchXCIsIGV2ZW50LnRhcmdldC5zdGF0dXMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2V0dGluZyBkZWZhdWx0IGNvbmZpZ3VyYXRpb25cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29uZmlndXJhdGlvbl9pc19hcHBsaWVkLCBcImVycm9yXCIpOyAgICAgICAgXHJcbiAgICAgICAgY29uZmlndXJhdGlvbl9pc19hcHBsaWVkID0gdHJ1ZTsgICAgICAgIFxyXG4gICAgICAgIHNlbGYuYXBwbHlfY29uZmlndXJhdGlvbihjb25maWcpO1xyXG4gICAgfVxyXG4gICAgeGhyLmxvYWQodXJsLCBvbmxvYWQsIHByb2dyZXNzLCBlcnJvcik7XHJcbn1cclxuXHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuX3NldF9jb25maWd1cmF0aW9uID0gZnVuY3Rpb24gKGNvbmZpZylcclxue1xyXG4gICAgdmFyIGRlZmF1bHRfY29uZmlnID0gdGhpcy5nZXRfZGVmYXVsdF9jb25maWd1cmF0aW9uKCk7XHJcbiAgICBcclxuICAgIC8vdGhpcyBpcyB1cmwgb2YgY29uZmlndXJhdGlvbiBmaWxlXHJcbiAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldCBjb25maWd1cmF0aW9uIGZyb20gdXJsID4+IFwiICsgY29uZmlnKTtcclxuICAgICAgICB0aGlzLmxvYWRfY29uZmlndXJhdGlvbihjb25maWcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcyBpcyBvYmplY3QgZmlsbGVkIHdpdGggZGF0YVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0IGNvbmZpZ3VyYXRpb24gZnJvbSB1c2VyIG9iamVjdFwiKTtcclxuICAgICAgICBfLmNvcHlfb2JqZWN0KGRlZmF1bHRfY29uZmlnLGNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5hcHBseV9jb25maWd1cmF0aW9uKGRlZmF1bHRfY29uZmlnKTtcclxuICAgIC8vY29uZmlndXJhdGlvbiBub3QgZ2l2ZW4sIHVzZSBkZWZhdWx0XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiX3NldF9jb25maWd1cmF0aW9uOiBzZXQgZGVmYXVsdCBjb25maWdyYXRpb25cIik7XHJcbiAgICAgICB0aGlzLmFwcGx5X2NvbmZpZ3VyYXRpb24oZGVmYXVsdF9jb25maWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5leHRlbmQgPSBmdW5jdGlvbiAobWV0aG9kcywgY2hpbGRfZnVuYylcclxue1xyXG5cclxuICAgIHZhciBDaGlsZDtcclxuICAgIGlmICh0eXBlb2YgY2hpbGRfZnVuYyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBDaGlsZCA9IGZ1bmN0aW9uICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBcHBsaWNhdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgQ2hpbGQgPSBjaGlsZF9mdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlIG5ldyBvYmplY3QgYW5kIHNldCBwcm90b3R5cGUgY2hhaW5cclxuXHRDaGlsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEFwcGxpY2F0aW9uLnByb3RvdHlwZSk7XHJcbiAgICAvL2NvcHkgbWV0aG9kcyB0byBuZXcgb2JqZWN0XHJcblx0Xy5jb3B5X29iamVjdChDaGlsZC5wcm90b3R5cGUsIG1ldGhvZHMpO1xyXG4gICAgQ2hpbGQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ2hpbGQ7XHJcbiAgIFxyXG4gICAgcmV0dXJuIENoaWxkO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5leHRlbmRfcHJvdG8gPSBmdW5jdGlvbiAocHJvdG8sIG1ldGhvZHMpXHJcbntcclxuXHR2YXIgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XHJcblx0Xy5jb3B5X29iamVjdChvYmosIG1ldGhvZHMpO1xyXG5cdEFwcGxpY2F0aW9uLmNhbGwob2JqKTtcclxuXHRyZXR1cm4gb2JqO1xyXG59XHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbiAoKSBcclxue1xyXG5cdHZhciBkZWx0YSA9IHRoaXMuY2xvY2suZ2V0RGVsdGEoKTtcclxuXHQvL2ZpeCB0aGlzIC0gYWRkIG9wdGlvbnMgdG8gY29udHJvbCBtaW4gZnJhbWUgcmF0ZVxyXG5cdGlmIChkZWx0YSA+IDAuMSkge1xyXG5cdFx0ZGVsdGEgPSAwLjE7XHJcblx0fVxyXG5cdHRoaXMuZGVsdGFfdGltZSA9IGRlbHRhO1xyXG4gICAgdGhpcy5kb191cGRhdGUoZGVsdGEpO1xyXG5cdHRoaXMudXBkYXRlKGRlbHRhKTtcclxuXHR0aGlzLnJlbmRlcihkZWx0YSk7XHJcblx0dGhpcy5ydW4oKTtcclxuICAgIC8vTXlfTGliLnJ1bigpO1xyXG59XHJcblxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5hZGRfYW5pbWF0ZWRfb2JqZWN0ID0gZnVuY3Rpb24gKG9iailcclxue1xyXG5cdC8vZml4IHByb2JhYmx5IGR1cGxpY2F0ZXNcclxuXHR0aGlzLmFuaW1hdGVkX29iamVjdHMucHVzaChvYmopO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUucmVtb3ZlX2FuaW1hdGVkX29iamVjdCA9IGZ1bmN0aW9uIChvYmopXHJcbntcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5hbmltYXRlZF9vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRpZiAodGhpcy5hbmltYXRlZF9vYmplY3RzW2ldID09PSBvYmopIHtcclxuXHRcdFx0dGhpcy5hbmltYXRlZF9vYmplY3RzLnNwbGljZShpLCAxKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS51cGRhdGVfYWxsID0gZnVuY3Rpb24gKGRlbHRhKVxyXG57XHJcblx0dmFyIG9iajtcclxuXHRmb3IodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmFuaW1hdGVkX29iamVjdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdG9iaiA9IHRoaXMuYW5pbWF0ZWRfb2JqZWN0c1tpXTtcclxuXHRcdGlmIChvYmpbXCJ1cGRhdGVcIl0pIHtcclxuXHRcdFx0b2JqLnVwZGF0ZShkZWx0YSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUucHJlX3VwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YSlcclxue1xyXG5cdHRoaXMudXBkYXRlX2FsbChkZWx0YSk7XHJcbiAgICBNeV9MaWIucGFydGljbGVfbWFuYWdlci51cGRhdGUoZGVsdGEpO1xyXG4gICAgLy9ldmVudFxyXG4gICAgaWYgKHRoaXMuYmVmb3JlX3VwZGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5iZWZvcmVfdXBkYXRlKGRlbHRhKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5kb191cGRhdGUgPSBmdW5jdGlvbiAoZHQpXHJcbntcclxuICAgIHRoaXMucHJlX3VwZGF0ZShkdCk7XHJcbiAgICB0aGlzLnVwZGF0ZShkdCk7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGVsdGEpXHJcbntcclxufVxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5jcmVhdGVfbW91c2VfbW92ZV9saXN0ZW5lciA9IGZ1bmN0aW9uICgpXHJcbntcclxuXHRpZiAodGhpc1tcIm1vdXNlX21vdmVfbGlzdGVuZXJcIl0pIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMubW91c2VfbW92ZV9saXN0ZW5lciA9IHRydWU7XHJcblx0ZnVuY3Rpb24gbW91c2VfbW92ZV9saXN0ZW5lcihldmVudCkge1xyXG5cdFx0dmFyIHZlY3RvciA9IE1vdXNlX0ludGVyc2VjdG9yLm1vdXNlX2Nvb3Jkc190b192ZWN0b3Ioc2VsZi5kb21fc2NyZWVuLCBldmVudCk7XHRcdFxyXG5cdFx0c2VsZi5maW5kX21vdXNlX292ZXJfaW50ZXJzZWN0aW9ucyh2ZWN0b3IpO1xyXG5cdH07XHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3VzZV9tb3ZlX2xpc3RlbmVyKTtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLmZpbmRfbW91c2Vfb3Zlcl9pbnRlcnNlY3Rpb25zID0gZnVuY3Rpb24odmVjdG9yKVxyXG57XHJcblx0dmVjdG9yLnVucHJvamVjdCh0aGlzLm1haW5fY2FtZXJhKTtcclxuXHR2YXIgcmF5ID0gbmV3IFRIUkVFLlJheWNhc3RlciggdGhpcy5tYWluX2NhbWVyYS5wb3NpdGlvbiwgdmVjdG9yLnN1YiggdGhpcy5tYWluX2NhbWVyYS5wb3NpdGlvbiApLm5vcm1hbGl6ZSgpICk7XHJcblx0dmFyIG9iajtcclxuXHRmb3IodmFyIGkgPTAsIGxlbiA9IHRoaXMubW91c2VfY29udHJvbGxlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xyXG5cdFx0b2JqID0gdGhpcy5tb3VzZV9jb250cm9sbGVyc1tpXTtcclxuXHRcdGlmIChvYmoub3Zlcikge1xyXG5cdFx0XHQvLyBjcmVhdGUgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2JqZWN0cyBpbiB0aGUgc2NlbmUgd2l0aCB3aGljaCB0aGUgcmF5IGludGVyc2VjdHNcclxuXHRcdFx0Ly92YXIgaW50ZXJzZWN0cyA9IHJheS5pbnRlcnNlY3RPYmplY3RzKCBbZ3JpZF90ZXh0LnJvb3RdLCB0cnVlICk7IFxyXG5cdFx0XHQvL2NvbnNvbGUubG9nKGZha2VfcGxhbmUucm9vdC5jaGlsZHJlblswXS5nZW9tZXRyeSk7XHJcblx0XHRcdHZhciBpbnRlcnNlY3RzID0gcmF5LmludGVyc2VjdE9iamVjdHMoIFtvYmoucm9vdF0sIHRydWUgKTsgXHJcblx0XHRcdG9iai5jYWxsYmFjayhpbnRlcnNlY3RzKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5hZGRfbW91c2VfY29udHJvbGxlciA9IGZ1bmN0aW9uIChyb290LCBvdmVyLCBjbGljaywgY2FsbGJhY2spXHJcbntcclxuXHR2YXIgdG1wID0gbmV3IE15X0xpYi5Nb3VzZV9Db250cm9sbGVyKHJvb3QsIG92ZXIsIGNsaWNrLCBjYWxsYmFjaylcclxuXHR0aGlzLm1vdXNlX2NvbnRyb2xsZXJzLnB1c2goIHRtcCApO1xyXG5cdGlmIChvdmVyKSB7XHJcblx0XHR0aGlzLmNyZWF0ZV9tb3VzZV9tb3ZlX2xpc3RlbmVyKCk7XHJcblx0fVxyXG5cdHJldHVybiB0bXA7XHJcbn1cclxuXHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLnNldF92aWV3cG9ydCA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KVxyXG57XHJcblx0TXlfTGliLlZpZXdwb3J0LndpZHRoID0gd2lkdGg7XHJcblx0TXlfTGliLlZpZXdwb3J0LmhlaWdodCA9IGhlaWdodDtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChkZWx0YSkgXHJcbntcclxuXHR0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IodGhpcy5jb25maWd1cmF0aW9uLmNsZWFyX2NvbG9yKTtcclxuXHR0aGlzLnJlbmRlcmVyLmF1dG9DbGVhciA9IHRydWU7XHJcblx0dGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5tYWluX3NjZW5lLCB0aGlzLm1haW5fY2FtZXJhKTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQge0FwcGxpY2F0aW9ufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2FwcGxpY2F0aW9uLmpzIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4vbXlfbGliLmpzJztcclxuXHJcbi8vbGVuZ3RoIC0gc2ltcGxlIGxlbmd0aCBvZiBhbmltYXRpb25zXHJcbi8vLTEgLSBpbmZpbml0ZVxyXG4vLzAgLSBzdG9wXHJcbi8vPiAwIC0gbGVuZ3RoIG9mIGFuaW1hdGlvbiwgXHJcbi8vaWYgdGltZSA+IGxlbmd0aCwgYW5pbWF0aW9uIHN0b3BcclxuLy9uZWVkIHJld3JpdGUgdGhpcyBjcmFwIHRvIHNhZmUgZmxvYXRpbmcgcG9pbnQgbWFubmVyZVxyXG4vL2FuZCBhcHBlbmQgbW9yZSBjb250cm9sZSBvbiBhbmltYXRpb24gXHJcbiAgICBmdW5jdGlvbiBCYXNlX0FuaW1hdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lX3NjYWxlID0gMS4wO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IFwiQmFzZV9BbmltYXRpb25cIjtcclxuICAgICAgICB0aGlzLnV1aWQgPSBfLmdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gLTE7XHJcbiAgICAgICAgdGhpcy5zdG9wcGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNjYWxlZF9kdCA9IGR0ICogdGhpcy50aW1lX3NjYWxlO1xyXG4gICAgICAgIHRoaXMudGltZSArPSBzY2FsZWRfZHQ7XHJcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoIDwgMCB8fCB0aGlzLnRpbWUgPCB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGNfYW5pbWF0aW9uKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0b3BwZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBCYXNlX0FuaW1hdGlvbi5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBCYXNlX0FuaW1hdGlvbi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZS5jYWxjX2FuaW1hdGlvbiA9IGZ1bmN0aW9uIChkdClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24ob2JqKVxyXG4gICAge1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBCYXNlX0FuaW1hdGlvbi5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICBkYXRhLnV1aWQgPSB0aGlzLnV1aWQ7XHJcbiAgICAgICAgZGF0YS50eXBlID0gdGhpcy50eXBlO1xyXG4gICAgICAgIGlmICh0aGlzLm5hbWUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGRhdGEubmFtZSA9IHRoaXMubmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS50aW1lX3NjYWxlID0gdGhpcy50aW1lX3NjYWxlID09PSB1bmRlZmluZWQgPyAxLjAgOiB0aGlzLnRpbWVfc2NhbGU7XHJcbiAgICAgICAgZGF0YS5sZW5ndGggPSB0aGlzLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKHBhcmFtKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHBhcmFtLnR5cGU7XHJcbiAgICAgICAgdGhpcy51dWlkID0gcGFyYW0udXVpZDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBwYXJhbS5uYW1lID8gcGFyYW0ubmFtZSA6ICcnO1xyXG4gICAgICAgIHRoaXMudGltZV9zY2FsZSA9IChwYXJhbS50aW1lX3NjYWxlID09PSB1bmRlZmluZWQpID8gMS4wIDogcGFyYW0udGltZV9zY2FsZTtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IHBhcmFtLmxlbmd0aCA9PT0gdW5kZWZpbmVkID8gLTEgOiBwYXJhbS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBcclxuICAgIFxyXG4gICAgICAgIFxyXG5mdW5jdGlvbiBFdWxlcl9BbmltYXRpb24gKHgsIHksIHopXHJcbntcclxuICAgIEJhc2VfQW5pbWF0aW9uLmNhbGwodGhpcyk7XHJcbiAgICB0aGlzLnR5cGUgPSBcIkV1bGVyX0FuaW1hdGlvblwiO1xyXG5cdHRoaXMueHNwZWVkID0geDtcclxuXHR0aGlzLnlzcGVlZCA9IHk7XHJcblx0dGhpcy56c3BlZWQgPSB6O1xyXG4gICAgdGhpcy54ID0gMDtcclxuICAgIHRoaXMueSA9IDA7XHJcbiAgICB0aGlzLnogPSAwO1xyXG4gICAgdGhpcy5uYW1lID0gJyc7XHJcbn1cclxuXHJcbkV1bGVyX0FuaW1hdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZSk7XHJcblxyXG5cclxuRXVsZXJfQW5pbWF0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEV1bGVyX0FuaW1hdGlvbjtcclxuXHJcbkV1bGVyX0FuaW1hdGlvbi5wcm90b3R5cGUuY2FsY19hbmltYXRpb24gPSBmdW5jdGlvbiAoZHQpXHJcbntcclxuICAgIC8vY29uc29sZS5sb2codGhpcy54c3BlZWQsdGhpcy55c3BlZWQsIHRoaXMuenBlZWQsIGR0LCB0aGlzLnRpbWVfc2NhbGUpO1xyXG4gICAgZHQgKj0gdGhpcy50aW1lX3NjYWxlO1xyXG5cdHRoaXMueCArPSB0aGlzLnhzcGVlZCAqIGR0O1xyXG5cdHRoaXMueSArPSB0aGlzLnlzcGVlZCAqIGR0O1xyXG5cdHRoaXMueiArPSB0aGlzLnpzcGVlZCAqIGR0O1xyXG59XHJcbiAgICBcclxuRXVsZXJfQW5pbWF0aW9uLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uIChvYmopXHJcbntcclxuICAgIG9iai5yb3RhdGlvbi5zZXQodGhpcy54LHRoaXMueSwgdGhpcy56KTtcclxufVxyXG5cclxuRXVsZXJfQW5pbWF0aW9uLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoanNvbilcclxue1xyXG4gICB2YXIgZGF0YSA9IEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZS50b0pTT04uY2FsbCh0aGlzKTtcclxuICAgZGF0YS54c3BlZWQgPSB0aGlzLnhzcGVlZDtcclxuICAgZGF0YS55c3BlZWQgPSB0aGlzLnlzcGVlZDtcclxuICAgZGF0YS56c3BlZWQgPSB0aGlzLnpzcGVlZDtcclxuICAgcmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbkV1bGVyX0FuaW1hdGlvbi5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAocGFyYW0pXHJcbntcclxuICAgIEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZS5wYXJzZS5jYWxsKHRoaXMsIHBhcmFtKTtcclxuICAgIHRoaXMueHNwZWVkID0gcGFyYW0ueHNwZWVkO1xyXG4gICAgdGhpcy55c3BlZWQgPSBwYXJhbS55c3BlZWQ7XHJcbiAgICB0aGlzLnpzcGVlZCA9IHBhcmFtLnpzcGVlZDtcclxuICAgIHRoaXMueCA9IHRoaXMueSA9IHRoaXMueiA9IDA7ICAgIFxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gU2NhbGVfQW5pbWF0aW9uKHgsIHksIHopXHJcbntcclxuICAgIEJhc2VfQW5pbWF0aW9uLmNhbGwodGhpcyk7XHJcbiAgICAvL3NwZWVkIG9mIHNjYWxlXHJcbiAgICB0aGlzLnhzY2FsZSA9IHg7XHJcbiAgICB0aGlzLnlzY2FsZSA9IHk7XHJcbiAgICB0aGlzLnpzY2FsZSA9IHo7XHJcbiAgICB0aGlzLnggPSAxLjA7XHJcbiAgICB0aGlzLnkgPSAxLjA7XHJcbiAgICB0aGlzLnogPSAxLjA7XHJcbn1cclxuXHJcblNjYWxlX0FuaW1hdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZSk7XHJcblxyXG5fLmNvcHlfb2JqZWN0KFNjYWxlX0FuaW1hdGlvbi5wcm90b3R5cGUsIHtcclxuICAgIGNvbnN0cnVjdG9yOiBTY2FsZV9BbmltYXRpb24sXHJcbiAgICBjYWxjX2FuaW1hdGlvbjogZnVuY3Rpb24gKGR0KSBcclxuICAgIHtcclxuICAgICAgICBkdCA9IGR0ICogdGhpcy50aW1lX3NjYWxlO1xyXG4gICAgICAgIHRoaXMueCArPSB0aGlzLnhzY2FsZSAqIGR0O1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnlzY2FsZSAqIGR0O1xyXG4gICAgICAgIHRoaXMueiArPSB0aGlzLnpzY2FsZSAqIGR0O1xyXG4gICAgfSxcclxuICAgIGFwcGx5OmZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBvYmouc2NhbGUuc2V0KHRoaXMueCwgdGhpcy55LCB0aGlzLnopO1xyXG4gICAgfSxcclxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlyc3QpIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy54ID0gMS4wO1xyXG4gICAgICAgIHRoaXMueSA9IDEuMDtcclxuICAgICAgICB0aGlzLnogPSAxLjA7XHJcbiAgICAgICAgdGhpcy50aW1lID0gMDtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiQmFzZV9BbmltYXRpb25cIiwgQmFzZV9BbmltYXRpb24pO1xyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJFdWxlcl9BbmltYXRpb25cIiwgRXVsZXJfQW5pbWF0aW9uKTtcclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiU2NhbGVfQW5pbWF0aW9uXCIsIFNjYWxlX0FuaW1hdGlvbik7XHJcblxyXG5cclxuZXhwb3J0IHsgQmFzZV9BbmltYXRpb24sIEV1bGVyX0FuaW1hdGlvbiwgU2NhbGVfQW5pbWF0aW9uIH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXNlL2FuaW1hdGlvbnMuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi9teV9saWIuanMnO1xyXG5cclxuLy9ldmVudHM6IFxyXG4vL2l0ZW1fbG9hZGVkXHJcbi8vb25lcnJvclxyXG4vL29ucHJvZ3Jlc3NcclxuLy9maW5pc2hlZFxyXG5mdW5jdGlvbiBDaGFpbl9Mb2FkZXIoKVxyXG57XHJcbn1cclxuXHJcbkNoYWluX0xvYWRlci5wcm90b3R5cGUgPSB7XHJcblx0Y29uc3RydWN0b3I6IENoYWluX0xvYWRlcixcclxuXHRzdGFydDogZnVuY3Rpb24gKGxpc3QpIFxyXG5cdHtcclxuXHRcdHRoaXMubGlzdCA9IGxpc3Q7XHJcblx0XHR0aGlzLmluZGV4ID0gMDtcclxuXHRcdHRoaXMubG9hZCh0aGlzLmxpc3RbMF0pO1xyXG5cdFx0dGhpcy5zdG9wX2J5X2Vycm9yID0gZmFsc2U7XHJcblx0fSxcclxuXHRcclxuXHRuZXh0OiBmdW5jdGlvbihyZXNvdXJjZSlcclxuXHR7XHJcblx0XHRpZiAodGhpcy5pdGVtX2xvYWRlZCAmJiByZXNvdXJjZSkge1xyXG5cdFx0XHR0aGlzLml0ZW1fbG9hZGVkKHJlc291cmNlLHRoaXMubGlzdFt0aGlzLmluZGV4XSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmluZGV4Kys7XHJcblx0XHRpZiAodGhpcy5pbmRleCA8IHRoaXMubGlzdC5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5sb2FkKHRoaXMubGlzdFt0aGlzLmluZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodGhpcy5maW5pc2hlZCkge1xyXG5cdFx0XHRcdHRoaXMuZmluaXNoZWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0XHJcblx0ZG9fZXJyb3I6IGZ1bmN0aW9uIChlcnJvcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5vbmVycm9yKSB7XHJcblx0XHRcdHRoaXMub25lcnJvcihlcnJvcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiQ2hhaW4gTG9hZGVyIEVycm9yIVwiLCBlcnJvcik7XHJcblx0XHR9XHJcblx0XHRpZiAoIXRoaXMuc3RvcF9ieV9lcnJvcikge1xyXG5cdFx0XHR0aGlzLm5leHQoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdFxyXG5cdGRvX3Byb2dyZXNzOiBmdW5jdGlvbiAoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLm9ucHJvZ3Jlc3MpIHtcclxuXHRcdFx0dGhpcy5vbnByb2dyZXNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRcdFxyXG5cdGxvYWQ6IGZ1bmN0aW9uIChpdGVtKVxyXG5cdHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdGlmICh0aGlzLmxvYWRfZnVuYykge1xyXG5cdFx0XHR0aGlzLmxvYWRfZnVuYyhpdGVtLCBcclxuXHRcdFx0ZnVuY3Rpb24gKGl0ZW0pIHsgc2VsZi5uZXh0LmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7IH0sXHJcblx0XHRcdGZ1bmN0aW9uIChpdGVtKSB7IHNlbGYuZG9fZXJyb3IuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTsgfSxcclxuXHRcdFx0ZnVuY3Rpb24gKGl0ZW0pIHsgc2VsZi5kb19wcm9ncmVzcy5hcHBseShzZWxmLCBhcmd1bWVudHMpOyB9KTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gdGVzdF9jaGFpbl9sb2FkZXIoKSBcclxue1xyXG5cdHZhciBjbCA9IG5ldyBDaGFpbl9Mb2FkZXIoKTtcclxuXHRjbC5pdGVtX2xvYWRlZCA9IGZ1bmN0aW9uIChpdGVtKSB7Y29uc29sZS5sb2coXCJsb2FkIGl0ZW0gXCIsIGl0ZW0pO31cclxuXHRjbC5maW5pc2hlZCA9IGZ1bmN0aW9uIChpdGVtKSB7Y29uc29sZS5sb2coXCJsb2FkZXIgbWFuYWdlciAtIGpvYiBkb25lXCIpO31cclxuXHRjbC5sb2FkX2Z1bmMgPSBmdW5jdGlvbiAoaXRlbSwgbmV4dCwgZXJyb3IsIHByb2dyZXNzKSB7IFxyXG5cdFx0aWYgKGl0ZW0pIHtcclxuXHRcdFx0bmV4dChpdGVtKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVycm9yKGl0ZW0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjbC5zdGFydChbXCJmaXJzdFwiLCBcInNlY29uZFwiLCBudWxsLCBcInRyZWVcIl0pO1xyXG59XHJcbi8vdGVzdF9jaGFpbl9sb2FkZXIoKTtcclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIExvYWRpbmdfTWFuYWdlciAoKVxyXG57XHJcblx0dGhpcy5yZXNvdXJjZXMgPSB7fTtcclxuXHR0aGlzLnRleHR1cmVfbG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcclxufVxyXG5cclxuTG9hZGluZ19NYW5hZ2VyLnByb3RvdHlwZSA9IHtcclxuXHRjb25zdHJ1Y3RvcjogTG9hZGluZ19NYW5hZ2VyLFxyXG5cdGdldDogZnVuY3Rpb24gKG5hbWUpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMucmVzb3VyY2VzW25hbWVdO1xyXG5cdH0sXHJcblx0XHJcblx0Z2V0X2FzeW5jOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spXHJcblx0e1xyXG5cdFx0Ly9hbHJlYWR5IGxvYWRlZD9cclxuXHRcdHZhciB0ZXh0dXJlID0gdGhpcy5nZXQobmFtZSk7XHJcblx0XHRpZiAodGV4dHVyZSkge1xyXG5cdFx0XHRpZiAoY2FsbGJhY2spIHtcclxuXHRcdFx0XHRjYWxsYmFjayh0ZXh0dXJlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGV4dHVyZTtcclxuXHRcdH1cclxuXHJcblx0XHQvL2lmIG5vdCBsb2FkIHRoaXMgYXN5bmNcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHRleHR1cmUgPSB0aGlzLnRleHR1cmVfbG9hZGVyLmxvYWQobmFtZSwgZnVuY3Rpb24gKHRleHR1cmUpXHJcblx0XHR7XHJcblx0XHRcdGlmIChjYWxsYmFjaykge1xyXG5cdFx0XHRcdGNhbGxiYWNrKHRleHR1cmUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHRoaXMucmVzb3VyY2VzW25hbWVdID0gdGV4dHVyZTtcdFxyXG5cdFx0cmV0dXJuIHRleHR1cmU7XHJcblx0fSxcclxuXHRcclxuXHJcblx0bG9hZF9saXN0OiBmdW5jdGlvbiAocmVzb3VyY2VfbGlzdCwgb25fbG9hZCwgbG9hZF9mdW5jLCBvbl9wcm9ncmVzcylcclxuXHR7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdHZhciBjbCA9IG5ldyBDaGFpbl9Mb2FkZXIoKTtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdGNsLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkVSUk9SIGxvYWRpbmcgdGV4dHVyZVwiLCBlcnJvciwgY2wubGlzdFtjbC5pbmRleF0pO1x0XHJcblx0XHR9XHJcblx0XHRjbC5pdGVtX2xvYWRlZCA9IGZ1bmN0aW9uIChyZXNvdXJjZSwgbmFtZSkge1xyXG5cdFx0XHRzZWxmLnJlc291cmNlc1tuYW1lXSA9IHJlc291cmNlO1xyXG5cdFx0XHRpZiAoc2VsZi5vbl9yZXNvdXJjZV9sb2FkZWQpIHtcclxuXHRcdFx0XHRzZWxmLm9uX3Jlc291cmNlX2xvYWRlZChyZXNvdXJjZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNsLm9uX3Byb2dyZXNzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAob25fcHJvZ3Jlc3MpIHtcclxuXHRcdFx0XHRvbl9wcm9ncmVzcygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjbC5sb2FkX2Z1bmMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGxvYWRfZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0fVxyXG5cdFx0Y2wuZmluaXNoZWQgPSBmdW5jdGlvbiAoKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAob25fbG9hZCkge1xyXG5cdFx0XHRcdG9uX2xvYWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2wuc3RhcnQocmVzb3VyY2VfbGlzdCk7XHJcblx0XHRcclxuXHR9LFxyXG5cclxuXHRsb2FkX2xpc3RfdGV4dHVyZXM6IGZ1bmN0aW9uIChyZXNvdXJjZV9saXN0LCBvbl9sb2FkKVxyXG5cdHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHRoaXMubG9hZF9saXN0KHJlc291cmNlX2xpc3QsIG9uX2xvYWQsIGZ1bmN0aW9uICh1cmwsIG5leHQsIGVycm9yLCBwcm9ncmVzcyApIFxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgdGV4dHVyZSA9IHNlbGYudGV4dHVyZV9sb2FkZXIubG9hZCh1cmwsIG5leHQsIHByb2dyZXNzLCBlcnJvcik7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRsb2FkX2xpc3RfanNvbjogZnVuY3Rpb24gKHJlc291cmNlX2xpc3QsIG9uX2xvYWQsIHByb2dyZXNzKVxyXG5cdHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHZhciBsb2FkZXIgPSBuZXcgVEhSRUUuWEhSTG9hZGVyKCk7XHRcclxuXHRcdHRoaXMubG9hZF9saXN0KHJlc291cmNlX2xpc3QsIG9uX2xvYWQsIGZ1bmN0aW9uICh1cmwsIG5leHQsIGVycm9yLCBwcm9ncmVzcykgXHJcblx0XHR7XHJcblx0XHRcdHZhciB0ZXh0dXJlID0gbG9hZGVyLmxvYWQodXJsLCBuZXh0LCBwcm9ncmVzcywgZXJyb3IpO1xyXG5cdFx0fSwgcHJvZ3Jlc3MpO1xyXG5cdH0sXHJcblx0XHJcblx0ZnJlZTogZnVuY3Rpb24gKClcclxuXHR7XHJcblx0XHR0aGlzLnJlc291cmNlcyA9IHt9O1xyXG5cdH1cclxufTtcclxuXHJcblxyXG5NeV9MaWIuVGV4dHVyZV9NYW5hZ2VyID0gbmV3IExvYWRpbmdfTWFuYWdlcigpO1x0XHJcblxyXG5leHBvcnQgeyBMb2FkaW5nX01hbmFnZXIgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmFzZS9sb2FkaW5nX21hbmFnZXIuanMiLCIvL1RPRE86IHJlbW92ZSB0aGlzIHVnbHkgY3JhcCBhbmQgcmVwbGFjZSBzb21ldGhpbmcgcmVhc29uYWJsZVxyXG5cclxuaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4vbXlfbGliLmpzJztcclxuXHJcbi8vdGhpcyB1Z2x5IGNsYXNzIGxvYWRpbmcgdGV4dHVyZSBsaXN0IGluIGpzb24gZm9ybWF0LCBwYXJzZSBpdCwgYW5kIGxvYWRpbmcgdGV4dHVyZXNcclxuLy90aGVuIGl0IGNhbGwgZXZlbnQgZGF0YV9sb2FkZWQsIHdoZW4gZ2l2ZSB0ZXh0dXJlIGxpc3QgaW4ganNvbiBmb3JtYXRcclxuXHJcbmZ1bmN0aW9uIFBhY2thZ2VfTWFuYWdlcigpXHJcbntcclxuICAgIHRoaXMuc3RhdGUgPSB7fTtcclxufVxyXG5cclxuLy9sb2FkIGpzb24gZmlsZSB3aXRoIGRlc2NyaXB0aW9ucyBvZiBwYWNrYWdlOiB0ZXh0dXJlIGxpc3QsIHBhcnRpY2xlcyBsaXN0LCBzY2VuZSBvYmplY3RzIGxpc3RcclxuUGFja2FnZV9NYW5hZ2VyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKHVybCwgZGVmYXVsdHMpXHJcbntcclxuICAgIHRoaXMuZGVmYXVsdHMgPSBkZWZhdWx0cztcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RhcnRcIlxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgZnVuY3Rpb24gb25sb2FkIChkYXRhKSB7XHJcbiAgICAgICAgc2VsZi5zdGF0ZVtcInR5cGVcIl0gPSBcImRvbmVcIjtcclxuICAgICAgICBzZWxmLnN0YXRlW1wiZGF0YVwiXSA9IGRhdGE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2VsZi5wYXJzZV9wYWNrYWdlX2Rlc2NyaXB0aW9uKGRhdGEpOyAgICAgICAgXHJcbiAgICB9ICAgIFxyXG4gICAgZnVuY3Rpb24gZXJyb3IoZXZlbnQpIHtcclxuICAgICAgICBzZWxmLnN0YXRlW1widHlwZVwiXSA9IFwiZXJyb3JcIjtcclxuICAgICAgICBzZWxmLnN0YXRlW1wiZXJyb3JcIl0gPSBldmVudDtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRVJyb3IhIEZhaWxlZCBsb2FkaW5nIHJlc291cmNlcyB3aXRoIHVybCBcIit1cmwsIGV2ZW50LnRhcmdldCk7ICAgICAgICBcclxuICAgICAgICBpZiAoc2VsZi5lcnJvcil7XHJcbiAgICAgICAgICAgIHNlbGYuZXJyb3IoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5wYWNrID0gc2VsZi5kZWZhdWx0c1xyXG4gICAgICAgIHNlbGYubG9hZF9yZXNvdXJjZXMoc2VsZi5kZWZhdWx0cyk7XHJcblxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgfVxyXG4gICAgdmFyIHhociA9IG5ldyBUSFJFRS5YSFJMb2FkZXIoKTtcclxuICAgIHhoci5sb2FkKHVybCwgb25sb2FkLCBwcm9ncmVzcywgZXJyb3IpO1xyXG59XHJcblxyXG4vL3BhcnNlIGxvYWRlZCBqc29uIGZpbGUgXHJcblBhY2thZ2VfTWFuYWdlci5wcm90b3R5cGUucGFyc2VfcGFja2FnZV9kZXNjcmlwdGlvbiA9IGZ1bmN0aW9uIChkYXRhKVxyXG57XHJcbiAgICBjb25zb2xlLmxvZyhcInBhY2thZ2VkIGRlc2NyaXB0aW9uIGxvYWRlZCwgYmVnaW4gcGFyc2luZy4uLlwiKTtcclxuICB0cnkge1xyXG4gICAgICAgIHZhciBwYWNrID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICB0aGlzLnBhY2sgPSBwYWNrO1xyXG4gICAgICAgIGlmICh0aGlzLmxvYWRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZChwYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgIH0gXHJcbiAgIGNhdGNoKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3IgcGFyc2luZyByZXNvdXJjZXMgXCIsIGUpO1xyXG4gICAgICAgIGlmICh0aGlzLmVycm9yKXtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcihldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjsgICAgICAgIFxyXG4gICB9XHJcbiAgIHRoaXMubG9hZF9yZXNvdXJjZXMocGFjayk7XHJcbn1cclxuXHJcblxyXG5QYWNrYWdlX01hbmFnZXIucHJvdG90eXBlLmxvYWRfcmVzb3VyY2VzID0gZnVuY3Rpb24gKHBhY2spXHJcbntcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIC8vbG9hZCB0ZXh0dXJlc1xyXG4gICBjb25zb2xlLmxvZyhcIlBhY2thZ2UgTWFuYWdlcjogYmVnaW4gbG9hZGluZyB0ZXh0dXJlcy4uLlwiKTsgICAgXHJcbiAgICBNeV9MaWIuVGV4dHVyZV9NYW5hZ2VyLmxvYWRfbGlzdF90ZXh0dXJlcyhwYWNrLnRleHR1cmVzLCBmdW5jdGlvbiAoKXtcclxuICAgICAgICAvL2xvYWQganNvbiBkZXNjcmlwdGlvbnMgZmlsZXNcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmRhdGFfbG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhX2xvYWRlZChwYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBQYWNrYWdlX01hbmFnZXIgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmFzZS9wYWNrYWdlX21hbmFnZXIuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi9teV9saWIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX01hbmFnZXJ9IGZyb20gJy4uL3BhcnRpY2xlcy9wYXJ0aWNsZXNfbWFuYWdlci5qcydcclxuXHJcbmZ1bmN0aW9uIFNjZW5lX1NlcmlhbGl6ZXIocm9vdClcclxue1xyXG4gICAgdGhpcy5hbmltYXRpb25fbGlicmFyeSA9IHt9O1xyXG59XHJcblxyXG5TY2VuZV9TZXJpYWxpemVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAocm9vdClcclxue1xyXG4gICAgdGhpcy5qc29uID0gcm9vdC50b0pTT04oKTtcclxuICAgIGNvbnNvbGUubG9nKFwibXkgbGliIHBhcnRpY2xlIG1hbmFnZXJcIiwgTXlfTGliLnBhcnRpY2xlX21hbmFnZXIpO1xyXG4gICAgdGhpcy5qc29uW1wicGFydGljbGVzXCJdID0gTXlfTGliLnBhcnRpY2xlX21hbmFnZXIudG9KU09OKCk7XHJcbiAgICB2YXIgYW5pbXMgPSByb290LmNvbGxlY3RfYW5pbWF0aW9ucyhyb290KTtcclxuICAgIGlmIChhbmltcy5jb3VudCA+IDApIHtcclxuICAgICAgICB0aGlzLmpzb25bXCJteWFuaW1hdGlvbnNcIl0gPSBhbmltcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuanNvbjtcclxufVxyXG5cclxuXHJcblxyXG5TY2VuZV9TZXJpYWxpemVyLnByb3RvdHlwZS5jcmVhdGVfYW5pbWF0aW9ucyA9IGZ1bmN0aW9uIChhbmltYXRpb25zKSB7XHJcbiAgICBmb3IodmFyIGtleSBpbiBhbmltYXRpb25zKSB7XHJcbiAgICAgICAgaWYgKCB0aGlzLmFuaW1hdGlvbl9saWJyYXJ5W2tleV0gPT09IHVuZGVmaW5lZCAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYW5pbWF0aW9ucywga2V5KSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGFuaW1hdGlvbnNba2V5XTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNyZWF0ZSBhbmltYXRpb25zIFwiLCBkYXRhLnV1aWQpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgYW5pbSA9ICBNeV9MaWIuQWJzdHJhY3RfRmFicmljKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoYW5pbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25fbGlicmFyeVtrZXldID0gYW5pbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5TY2VuZV9TZXJpYWxpemVyLnByb3RvdHlwZS5iaW5kX2FuaW1hdGlvbnMgPSBmdW5jdGlvbiAoYW5pbWRhdGEpXHJcbntcclxuICAgIGlmICghYW5pbWRhdGEpIHJldHVybjtcclxuICAgIFxyXG4gICAgdmFyIGJpbmRpbmdzID0gYW5pbWRhdGEuYmluZGluZ3M7XHJcbiAgICBcclxuICAgIC8vY29uc29sZS5sb2coXCJiaW5kIGFuaW1hdGlvblwiKTtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGZ1bmN0aW9uIGNvcHlfYW5pbWF0aW9ucyhvYmosIGJpbmQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGJpbmQuYW5pbWF0aW9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHZhciBhbmltX3V1aWQgPSBiaW5kLmFuaW1hdGlvbnNbaV07XHJcbiAgICAgICAgICAgIG9iai5hZGRfYW5pbWF0aW9uKCBzZWxmLmFuaW1hdGlvbl9saWJyYXJ5W2FuaW1fdXVpZF0gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgICBmb3IodmFyIGkgPTA7IGkgPCBiaW5kaW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBiaW5kID0gYmluZGluZ3NbaV07XHJcbiAgICAgICAgdmFyIHV1aWQgPSBiaW5kLnV1aWQ7XHJcbiAgICAgICAgdmFyIG9iaiA9IHRoaXMucm9vdC5nZXRPYmplY3RCeVByb3BlcnR5KFwidXVpZFwiLCB1dWlkKTtcclxuICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJiaW5kaW5nIFwiICsgdXVpZCArIFwiIG9iamVjdCB0byBhbmltYXRpb24gXCIrdXVpZCk7XHJcbiAgICAgICAgICAgIGNvcHlfYW5pbWF0aW9ucyhvYmosIGJpbmQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcblNjZW5lX1NlcmlhbGl6ZXIucHJvdG90eXBlLmxvYWRfZnJvbV9qc29uID0gZnVuY3Rpb24gKHVybClcclxue1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgZnVuY3Rpb24gb25sb2FkKGpzb24pXHJcbiAgICB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGpzb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcGFyc2Ugc2NlbmUgXCIsIGUpO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb21ldGhpbmcgZnVja2luZyBoYXBwZW5lZCwgZmFpbGVkIHRvIGxvYWQgc2NlbmUgXCIsIHVybCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5sb2FkKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZXJyb3IoZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUudGFyZ2V0KTtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgfVxyXG4gICAgdmFyIHhociA9IG5ldyBUSFJFRS5YSFJMb2FkZXIoKTtcclxuICAgIHhoci5sb2FkKHVybCwgb25sb2FkLCBwcm9ncmVzcywgZXJyb3IpO1xyXG59XHJcblxyXG5TY2VuZV9TZXJpYWxpemVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKGpzb24pXHJcbntcclxuICAgIHRoaXMuYW5pbWF0aW9uX2xpYnJhcnkgPSB7fTtcclxuICAgIHZhciBvID0gbmV3IFRIUkVFLk9iamVjdExvYWRlcigpO1xyXG4gICAgaWYgKGpzb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuanNvbiA9IGpzb247XHJcbiAgICB9XHJcbiAgICB2YXIgcm9vdCA9IG8ucGFyc2UodGhpcy5qc29uLCBmdW5jdGlvbiAoKSB7Y29uc29sZS5sb2coXCJvbmxvYWRcIil9KTtcclxuICAgIHRoaXMucm9vdCA9IHJvb3Q7ICAgIFxyXG5cclxuICAgIE15X0xpYi5wYXJ0aWNsZV9tYW5hZ2VyLmxvYWRfcGFydGljbGVzKHRoaXMuanNvbiwgcm9vdCk7XHJcbiAgICBcclxuICAgIHRoaXMuY3JlYXRlX2FuaW1hdGlvbnModGhpcy5qc29uLm15YW5pbWF0aW9ucy5hbmltYXRpb25zKTtcclxuICAgIHRoaXMuYmluZF9hbmltYXRpb25zKHRoaXMuanNvbi5teWFuaW1hdGlvbnMpO1xyXG4gICAgdGhpcy5tYWluX2NhbWVyYSA9IHJvb3QuZ2V0T2JqZWN0QnlOYW1lKFwibWFpbl9jYW1lcmFcIik7XHJcbiAgICBcclxuICAgIGlmICh0aGlzLnNjZW5lX2xvYWRlZCkge1xyXG4gICAgICAgIHRoaXMuc2NlbmVfbG9hZGVkKHJvb3QpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJvb3Q7XHJcbn1cclxuXHJcbmV4cG9ydCB7IFNjZW5lX1NlcmlhbGl6ZXIgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmFzZS9zY2VuZV9zZXJpYWxpemVyLmpzIiwiZXhwb3J0ICogZnJvbSAnLi9lbmdpbmVfbWFpbl93ZWJwYWNrLmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi9ndWlfbWFpbl93ZWJwYWNrLmpzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRpdG9yX3dlYnBhY2tfZGV2LmpzIiwiaW1wb3J0IHtQYXJ0aWNsZXNfUGFuZWx9IGZyb20gJy4vcGFydGljbGVzX3BhbmVsLmpzJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZV92dWVfYXBwKGlkKSB7XHJcblxyXG5cdHZhciBhcHAyID0gbmV3IFZ1ZSh7XHJcblx0XHRlbDogaWQsXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29tcG9uZW50czoge1xyXG4gICAgICAgICAgICAncGFydGljbGVzLXBhbmVsJzogUGFydGljbGVzX1BhbmVsLFxyXG4gICAgICAgIH0sXHJcblx0XHRkYXRhOiB7XHJcbiAgICAgICAgICAgIHBhcnRpY2xlczogW10sXHJcbiAgICAgICAgICAgIHRleHR1cmVzOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRlbXBsYXRlOiAnPGRpdiBpZD1cImFwcFwiPlxcXHJcbiAgICAgICAgICAgIDxwYXJ0aWNsZXMtcGFuZWwgOnBhcnRpY2xlcz1cInBhcnRpY2xlc1wiIDp0ZXh0dXJlcz1cInRleHR1cmVzXCI+PC9wYXJ0aWNsZXMtcGFuZWw+XFxcclxuICAgICAgICAgICAgPC9kaXY+JyxcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIGFwcDI7XHJcbn1cclxuXHJcbmV4cG9ydCB7Y3JlYXRlX3Z1ZV9hcHB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ndWkvdnVlYXBwLmpzIiwiaW1wb3J0IHtNb3VzZV9DYW1lcmFfQ29udHJvbGxlcn0gZnJvbSAnLi4vYmFzZS9tb3VzZV9jYW1lcmFfY29udHJvbGxlci5qcyc7XHJcblxyXG5mdW5jdGlvbiBNaXhpbigpXHJcbntcclxuXHJcbiAgICAvL25lZWQgZm9yIHVucHJvamVjdCBvYmplY3QgYW5kIGRyYWdnaW5nXHJcbiAgICBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYS5wcm90b3R5cGUuZ2V0X2ZvcndhcmRfcGxhbmVfYnlfb2JqZWN0ID0gZnVuY3Rpb24gKG9iailcclxuICAgIHtcclxuICAgICAgICB2YXIgeiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbiAgICAgICAgei5zZXRGcm9tTWF0cml4Q29sdW1uKCB0aGlzLm1hdHJpeFdvcmxkLCAyICk7XHJcbiAgICAgICAgdmFyIGRpc3QgPSBvYmoucG9zaXRpb24uZG90KHopOyAgICAgICAgICAgICBcclxuICAgICAgICB2YXIgcGxhbmU9IG5ldyBUSFJFRS5QbGFuZSh6Lm5lZ2F0ZSgpLCBkaXN0KTtcclxuICAgICAgICByZXR1cm4gcGxhbmU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYS5wcm90b3R5cGUuZ2V0X3JheV9mcm9tX3NjcmVlbl9jb29yZGluYXRlcyA9IGZ1bmN0aW9uIChjYW52YXMsIHgseSlcclxuICAgIHtcclxuICAgICAgICB2YXIgbWMgPSBuZXcgTW91c2VfQ2FtZXJhX0NvbnRyb2xsZXIoY2FudmFzLCB0aGlzKTtcclxuICAgICAgICB2YXIgcmF5ID0gbWMuZ2V0X3JheV9mcm9tX2NhbWVyYV9pbl9zY3JlZW5fY29vcmRpbmF0ZXMoeCx5KTtcclxuICAgICAgICByZXR1cm4gcmF5O1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG59XHJcblxyXG5NaXhpbigpO1xyXG5leHBvcnQge01peGlufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWl4aW5zL2NhbWVyYV9taXhpbi5qcyIsImZ1bmN0aW9uIE1peF9JdCgpXHJcbntcclxuXHJcblxyXG5cclxuXHQvL0ZJWFxyXG5cdFRIUkVFLlZlY3RvcjMucHJvdG90eXBlLmFwcGx5TWF0cml4NF9yb3RhdGlvbiA9IGZ1bmN0aW9uICggbSApIFxyXG5cdHtcclxuXHRcdC8vIGlucHV0OiBUSFJFRS5NYXRyaXg0IGFmZmluZSBtYXRyaXhcclxuXHJcblx0XHR2YXIgeCA9IHRoaXMueCwgeSA9IHRoaXMueSwgeiA9IHRoaXMuejtcclxuXHRcdHZhciBlID0gbS5lbGVtZW50cztcclxuXHJcblx0XHR0aGlzLnggPSBlWyAwIF0gKiB4ICsgZVsgNCBdICogeSArIGVbIDggXSAgKiB6O1xyXG5cdFx0dGhpcy55ID0gZVsgMSBdICogeCArIGVbIDUgXSAqIHkgKyBlWyA5IF0gICogejtcclxuXHRcdHRoaXMueiA9IGVbIDIgXSAqIHggKyBlWyA2IF0gKiB5ICsgZVsgMTAgXSAqIHo7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcbiBcdH1cclxuXHJcbnZhciBPYmplY3QzRF9BbmltYXRpb25fTWl4aW4gPSB7XHJcbiAgICBcclxuICAgIGFkZF9hbmltYXRpb246IGZ1bmN0aW9uIChhbmltKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy5hbmltYXRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25zLmluZGV4T2YoYW5pbSkgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wdXNoKGFuaW0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIHJlbW92ZV9hbmltYXRpb246IGZ1bmN0aW9uIChhbmltKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIGkgPSB0aGlzLmFuaW1hdGlvbnMuaW5kZXhPZihhbmltKTtcclxuICAgICAgICAgICAgaWYgKGkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIHVwZGF0ZTogIGZ1bmN0aW9uIChkdClcclxuICAgIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwib2JqZWN0IHVwZGF0ZVwiLCBkdCk7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9MDsgaSA8IHRoaXMuYW5pbWF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFuaW0gPSB0aGlzLmFuaW1hdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICBhbmltLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgICAgICAgICAgYW5pbS5hcHBseSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5yb3RhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKG9iai51cGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIG9iai51cGRhdGUoZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgXHJcbn07XHJcbl8uY29weV9vYmplY3QoVEhSRUUuT2JqZWN0M0QucHJvdG90eXBlLCBPYmplY3QzRF9BbmltYXRpb25fTWl4aW4pO1xyXG5cclxuXHJcblRIUkVFLk9iamVjdDNELnByb3RvdHlwZS5vbGRfdG9Kc29uID0gVEhSRUUuT2JqZWN0M0QudG9KU09OO1xyXG5cclxudmFyIE9iamVjdDNEX1NlcmlhbGl6YXRpb25fTWl4aW4gPSBcclxue1xyXG4gICAgc3RhbmRhcmRfc2VyaWFsaXphdGlvbjogZnVuY3Rpb24gKG1ldGEpIFxyXG4gICAge1xyXG5cdFx0Ly8gc3RhbmRhcmQgT2JqZWN0M0Qgc2VyaWFsaXphdGlvblxyXG5cdFx0dmFyIG9iamVjdCA9IHt9O1xyXG5cclxuXHRcdG9iamVjdC51dWlkID0gdGhpcy51dWlkO1xyXG5cdFx0b2JqZWN0LnR5cGUgPSB0aGlzLnR5cGU7XHJcblx0XHRpZiAoIHRoaXMubmFtZSAhPT0gJycgKSBvYmplY3QubmFtZSA9IHRoaXMubmFtZTtcclxuXHRcdGlmICggSlNPTi5zdHJpbmdpZnkoIHRoaXMudXNlckRhdGEgKSAhPT0gJ3t9JyApIG9iamVjdC51c2VyRGF0YSA9IHRoaXMudXNlckRhdGE7XHJcblx0XHRpZiAoIHRoaXMuY2FzdFNoYWRvdyA9PT0gdHJ1ZSApIG9iamVjdC5jYXN0U2hhZG93ID0gdHJ1ZTtcclxuXHRcdGlmICggdGhpcy5yZWNlaXZlU2hhZG93ID09PSB0cnVlICkgb2JqZWN0LnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xyXG5cdFx0aWYgKCB0aGlzLnZpc2libGUgPT09IGZhbHNlICkgb2JqZWN0LnZpc2libGUgPSBmYWxzZTtcclxuXHJcblx0XHRvYmplY3QubWF0cml4ID0gdGhpcy5tYXRyaXgudG9BcnJheSgpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBpZiAodGhpcy50eXBlICE9PSBcInBhcnRpY2xlc19wb2ludHNcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdlb21ldHJ5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5nZW9tZXRyeSA9IHRoaXMuZ2VvbWV0cnkudXVpZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHRoaXMubWF0ZXJpYWwgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWwudXVpZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCB0aGlzLm1hdGVyaWFsICE9PSB1bmRlZmluZWQgICYmICBtZXRhLm1hdGVyaWFsc1sgdGhpcy5tYXRlcmlhbC51dWlkIF0gPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRhLm1hdGVyaWFsc1sgdGhpcy5tYXRlcmlhbC51dWlkIF0gPSB0aGlzLm1hdGVyaWFsLnRvSlNPTiggbWV0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5nZW9tZXRyeSAhPT0gdW5kZWZpbmVkICYmIG1ldGEuZ2VvbWV0cmllc1sgdGhpcy5nZW9tZXRyeS51dWlkIF0gPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRhLmdlb21ldHJpZXNbIHRoaXMuZ2VvbWV0cnkudXVpZCBdID0gdGhpcy5nZW9tZXRyeS50b0pTT04oIG1ldGEgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25zKSB7XHJcbiAgICAgICAgICAgIG9iamVjdC5hbmltYXRpb25zID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9MDsgaSA8IHRoaXMuYW5pbWF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LmFuaW1hdGlvbnMucHVzaCAoIHRoaXMuYW5pbWF0aW9uc1tpXS51dWlkICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblx0XHRpZiAoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCApIHtcclxuXHRcdFx0b2JqZWN0LmNoaWxkcmVuID0gW107XHJcblx0XHRcdGZvciAoIHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpICsrICkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IHRoaXMuY2hpbGRyZW5bIGkgXTtcclxuXHRcdFx0XHQvL29iamVjdC5jaGlsZHJlbi5wdXNoKCBjaGlsZC5zdGFuZGFyZF9zZXJpYWxpemF0aW9uKCBtZXRhICkgKTtcclxuICAgICAgICAgICAgICAgIG9iamVjdC5jaGlsZHJlbi5wdXNoKCBjaGlsZC50b0pTT04oIG1ldGEgKSApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGNvbGxlY3RfbWF0ZXJpYWxzOiBmdW5jdGlvbiAobWV0YSkgXHJcbiAgICB7XHJcblx0XHRpZiAoIHRoaXMubWF0ZXJpYWwgIT09IHVuZGVmaW5lZCAgJiYgIG1ldGEubWF0ZXJpYWxzWyB0aGlzLm1hdGVyaWFsLnV1aWQgXSA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgbWV0YS5tYXRlcmlhbHNbIHRoaXMubWF0ZXJpYWwudXVpZCBdID0gdGhpcy5tYXRlcmlhbC50b0pTT04oIG1ldGEpO1xyXG5cdFx0fVxyXG4gICAgICAgIFxyXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgKysgKSB7XHJcblx0XHRcdHRoaXMuY2hpbGRyZW5bIGkgXS5jb2xsZWN0X21hdGVyaWFscyhtZXRhKTtcclxuXHRcdH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIGNvbGxlY3RfZ2VvbWV0cnk6IGZ1bmN0aW9uIChtZXRhKVxyXG4gICAge1xyXG5cdFx0aWYgKCB0aGlzLmdlb21ldHJ5ICE9PSB1bmRlZmluZWQgJiYgbWV0YS5nZW9tZXRyaWVzWyB0aGlzLmdlb21ldHJ5LnV1aWQgXSA9PT0gdW5kZWZpbmVkICkge1xyXG5cdFx0XHRcdG1ldGEuZ2VvbWV0cmllc1sgdGhpcy5nZW9tZXRyeS51dWlkIF0gPSB0aGlzLmdlb21ldHJ5LnRvSlNPTiggbWV0YSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpICsrICkge1xyXG5cdFx0XHR0aGlzLmNoaWxkcmVuWyBpIF0uY29sbGVjdF9nZW9tZXRyeShtZXRhKTtcclxuXHRcdH1cclxuICAgIH0sXHJcbiAgICBcclxuXHR0b0pTT04xOiBmdW5jdGlvbiAoIG1ldGEgKSB7XHJcbiAgICBcclxuXHRcdC8vIGV4dHJhY3QgZGF0YSBmcm9tIHRoZSBjYWNoZSBoYXNoXHJcblx0XHQvLyByZW1vdmUgbWV0YWRhdGEgb24gZWFjaCBpdGVtXHJcblx0XHQvLyBhbmQgcmV0dXJuIGFzIGFycmF5XHJcblx0XHRmdW5jdGlvbiBleHRyYWN0RnJvbUNhY2hlKCBjYWNoZSwgdCApIHtcclxuXHRcdFx0dmFyIHZhbHVlcyA9IFtdO1xyXG5cdFx0XHRmb3IgKCB2YXIga2V5IGluIGNhY2hlICkge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gY2FjaGVbIGtleSBdO1xyXG5cdFx0XHRcdGRlbGV0ZSBkYXRhLm1ldGFkYXRhO1xyXG5cdFx0XHRcdHZhbHVlcy5wdXNoKCBkYXRhICk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHZhbHVlcztcclxuXHRcdH1cclxuICAgIFxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeFdvcmxkKHRydWUpO1xyXG4gICAgICAgIFxyXG5cdFx0Ly8gbWV0YSBpcyAnJyB3aGVuIGNhbGxlZCBmcm9tIEpTT04uc3RyaW5naWZ5XHJcblx0XHR2YXIgaXNSb290T2JqZWN0ID0gKCBtZXRhID09PSB1bmRlZmluZWQgfHwgbWV0YSA9PT0gJycgKTtcclxuXHJcblx0XHR2YXIgb3V0cHV0ID0ge307XHJcblxyXG5cdFx0aWYgKCBpc1Jvb3RPYmplY3QgKSB7XHJcblxyXG4gICAgICAgICAgICBtZXRhID0ge1xyXG5cdFx0XHRcdGdlb21ldHJpZXM6IHt9LFxyXG5cdFx0XHRcdG1hdGVyaWFsczoge30sXHJcblx0XHRcdFx0dGV4dHVyZXM6IHt9LFxyXG5cdFx0XHRcdGltYWdlczoge31cclxuXHRcdFx0fTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoaXMuY29sbGVjdF9tYXRlcmlhbHMobWV0YSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5jb2xsZWN0X2dlb21ldHJ5KG1ldGEpO1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0gdGhpcy5zdGFuZGFyZF9zZXJpYWxpemF0aW9uKG1ldGEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcblx0XHRcdG91dHB1dC5tZXRhZGF0YSA9IHtcclxuXHRcdFx0XHR2ZXJzaW9uOiA0LjQsXHJcblx0XHRcdFx0dHlwZTogJ09iamVjdCcsXHJcblx0XHRcdFx0Z2VuZXJhdG9yOiAnT2JqZWN0M0QudG9KU09OJ1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIGdlb21ldHJpZXMgPSBleHRyYWN0RnJvbUNhY2hlKCBtZXRhLmdlb21ldHJpZXMsIFwiZ2VvaW1cIiApO1xyXG5cdFx0XHR2YXIgbWF0ZXJpYWxzID0gZXh0cmFjdEZyb21DYWNoZSggbWV0YS5tYXRlcmlhbHMsIFwibWF0ZXJpYWxzXCIgKTtcclxuXHRcdFx0dmFyIHRleHR1cmVzID0gZXh0cmFjdEZyb21DYWNoZSggbWV0YS50ZXh0dXJlcywgXCJ0ZXh0dXJlc1wiICk7XHJcblx0XHRcdHZhciBpbWFnZXMgPSBleHRyYWN0RnJvbUNhY2hlKCBtZXRhLmltYWdlcywgXCJpbWFnZXNcIiApO1xyXG5cclxuXHRcdFx0aWYgKCBnZW9tZXRyaWVzLmxlbmd0aCA+IDAgKSBvdXRwdXQuZ2VvbWV0cmllcyA9IGdlb21ldHJpZXM7XHJcblx0XHRcdGlmICggbWF0ZXJpYWxzLmxlbmd0aCA+IDAgKSBvdXRwdXQubWF0ZXJpYWxzID0gbWF0ZXJpYWxzO1xyXG5cdFx0XHRpZiAoIHRleHR1cmVzLmxlbmd0aCA+IDAgKSBvdXRwdXQudGV4dHVyZXMgPSB0ZXh0dXJlcztcclxuXHRcdFx0aWYgKCBpbWFnZXMubGVuZ3RoID4gMCApIG91dHB1dC5pbWFnZXMgPSBpbWFnZXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgYW5pbXMgPSB0aGlzLmNvbGxlY3RfYW5pbWF0aW9ucyh0aGlzKTtcclxuICAgICAgICAgICAgaWYgKGFuaW1zLmNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0W1wibXlhbmltYXRpb25zXCJdID0gYW5pbXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgb3V0cHV0Lm9iamVjdCA9IG9iamVjdDtcclxuXHRcdH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5vYmplY3QgPSB0aGlzLnN0YW5kYXJkX3NlcmlhbGl6YXRpb24obWV0YSk7XHJcbiAgICAgICAgICAgIG91dHB1dC50eXBlID0gdGhpcy50eXBlO1xyXG4gICAgICAgICAgICBpZiAob3V0cHV0Lm9iamVjdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImkgYW0gdW5kZWZpbmVkXCIsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdHJldHVybiBvdXRwdXQ7XHJcblxyXG5cclxuXHR9LFxyXG4gICAgXHJcbiAgICBjb2xsZWN0X2FuaW1hdGlvbnM6IGZ1bmN0aW9uIChzY2VuZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgYW5pbWF0aW9ucyA6IHt9LFxyXG4gICAgICAgICAgICBiaW5kaW5ncyA6IFtdLFxyXG4gICAgICAgICAgICBjb3VudDogMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY29sbGVjdF9hbmltYXRpb25zX3JlY3Vyc2l2ZShyb290KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHJvb3QuYW5pbWF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0wOyBpIDwgcm9vdC5hbmltYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuaW0gPSByb290LmFuaW1hdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYW5pbWF0aW9uc1sgYW5pbS51dWlkIF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmFuaW1hdGlvbnNbIGFuaW0udXVpZF0gPSBhbmltLnRvSlNPTigpIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIGJpbmQgPSB7fTtcclxuICAgICAgICAgICAgICAgIGJpbmQudXVpZCA9IHJvb3QudXVpZFxyXG4gICAgICAgICAgICAgICAgYmluZC5hbmltYXRpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPTA7IGkgPCByb290LmFuaW1hdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiaW5kLmFuaW1hdGlvbnMucHVzaCggcm9vdC5hbmltYXRpb25zW2ldLnV1aWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGF0YS5iaW5kaW5ncy5wdXNoKGJpbmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocm9vdC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHJvb3QuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0X2FuaW1hdGlvbnNfcmVjdXJzaXZlKCByb290LmNoaWxkcmVuW2ldICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29sbGVjdF9hbmltYXRpb25zX3JlY3Vyc2l2ZShzY2VuZSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9LFxyXG4gICAgXHJcbiBcclxufTtcclxuXHJcblxyXG4gIF8uY29weV9vYmplY3QoVEhSRUUuT2JqZWN0M0QucHJvdG90eXBlLCBPYmplY3QzRF9TZXJpYWxpemF0aW9uX01peGluKTtcclxuICBcclxuVEhSRUUuT2JqZWN0M0QucHJvdG90eXBlLmRtX21hcmsgPSAneWVzLHRoaXMgb2JqZWN0IGhhcyBiZWVuIG1hcmtlZCBieSBibGFjayBtYWdpYywgb3duZWQgYnkgbWUsIGRhcmsgbWF0dGVycyc7IFxyXG5cclxuLy9yZXBsYWNlIHNvdXJjZSB3aXRoIHRoaXNcclxuVEhSRUUuT2JqZWN0M0QucHJvdG90eXBlLnJlcGxhY2Vfb2JqZWN0X3dpdGhfdGhpcyA9IGZ1bmN0aW9uICggc291cmNlICkge1xyXG5cclxuICAgIHRoaXMudXVpZCA9IHNvdXJjZS51dWlkO1xyXG4gICAgdGhpcy5uYW1lID0gc291cmNlLm5hbWU7XHJcblxyXG4gICAgdGhpcy51cC5jb3B5KCBzb3VyY2UudXAgKTtcclxuICAgIHRoaXMucG9zaXRpb24uY29weSggc291cmNlLnBvc2l0aW9uICk7XHJcbiAgICB0aGlzLnF1YXRlcm5pb24uY29weSggc291cmNlLnF1YXRlcm5pb24gKTtcclxuICAgIHRoaXMuc2NhbGUuY29weSggc291cmNlLnNjYWxlICk7XHJcblxyXG4gICAgdGhpcy5tYXRyaXguY29weSggc291cmNlLm1hdHJpeCApO1xyXG4gICAgdGhpcy5tYXRyaXhXb3JsZC5jb3B5KCBzb3VyY2UubWF0cml4V29ybGQgKTtcclxuXHJcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBzb3VyY2UubWF0cml4QXV0b1VwZGF0ZTtcclxuICAgIHRoaXMubWF0cml4V29ybGROZWVkc1VwZGF0ZSA9IHNvdXJjZS5tYXRyaXhXb3JsZE5lZWRzVXBkYXRlO1xyXG5cclxuICAgIHRoaXMudmlzaWJsZSA9IHNvdXJjZS52aXNpYmxlO1xyXG5cclxuICAgIHRoaXMuY2FzdFNoYWRvdyA9IHNvdXJjZS5jYXN0U2hhZG93O1xyXG4gICAgdGhpcy5yZWNlaXZlU2hhZG93ID0gc291cmNlLnJlY2VpdmVTaGFkb3c7XHJcblxyXG4gICAgdGhpcy5mcnVzdHVtQ3VsbGVkID0gc291cmNlLmZydXN0dW1DdWxsZWQ7XHJcbiAgICB0aGlzLnJlbmRlck9yZGVyID0gc291cmNlLnJlbmRlck9yZGVyO1xyXG5cclxuICAgIHRoaXMudXNlckRhdGEgPSBKU09OLnBhcnNlKCBKU09OLnN0cmluZ2lmeSggc291cmNlLnVzZXJEYXRhICkgKTtcclxuXHJcbiAgICAvL2NvcHkgYXJyYXkgb2YgY2hpbGRyZW4sIG5vdCBjbG9uZVxyXG4gICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc291cmNlLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcclxuICAgICAgICB0aGlzLmFkZCggc291cmNlLmNoaWxkcmVuWyBpIF0gKTtcclxuICAgIH1cclxuICAgIHNvdXJjZS5wYXJlbnQuYWRkKHRoaXMpO1xyXG4gICAgc291cmNlLnBhcmVudC5yZW1vdmUoc291cmNlKTtcclxuICAgIFxyXG4gICAgdGhpcy5hbmltYXRpb25zID0gc291cmNlLmFuaW1hdGlvbnM7XHJcbn1cclxuXHJcblxyXG59XHJcblxyXG5NaXhfSXQoKTtcclxuXHJcbmV4cG9ydCB7TWl4X0l0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWl4aW5zL3RocmVlanNfbWl4aW5zLmpzIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9BZmZlY3Rvcn0gZnJvbSAnLi9wYXJ0aWNsZV9hZmZlY3Rvci5qcyc7XHJcblxyXG5mdW5jdGlvbiBDdXN0b21fQWZmZWN0b3IoKVxyXG57XHJcblx0UGFydGljbGVfQWZmZWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuY3VzdG9tX2Z1bmMgPSBmdW5jdGlvbiBkdW1teSAoKSB7cmV0dXJuIHRydWU7fTtcclxufVxyXG5cclxuXHJcbkN1c3RvbV9BZmZlY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcnRpY2xlX0FmZmVjdG9yLnByb3RvdHlwZSk7XHJcblxyXG5fLmNvcHlfb2JqZWN0KEN1c3RvbV9BZmZlY3Rvci5wcm90b3R5cGUsIFxyXG4gICAge1xyXG4gICAgY29uc3RydWN0b3I6IEN1c3RvbV9BZmZlY3RvcixcclxuICAgXHRhZmZlY3Q6IGZ1bmN0aW9uIChkdCwgcGRhdGEsIHZlcnQpXHJcblx0e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbV9mdW5jKGR0LCBwLCB2ZXJ0KTtcclxuXHR9LFxyXG4gICAgdGVzdF9mdW5jOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHAgPSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXHJcbiAgICAgICAgICAgIHZlbG9jaXR5OiB7eDogMCwgeTogMCwgejogMH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBjb2xvciA9IHtyOiAwLCBnOiAwLCBiOiAwfTtcclxuICAgICAgICB0aGlzLmN1c3RvbV9mdW5jKHAsIGNvbG9yKTtcclxuICAgIH0sXHJcbiAgICBzZXRfYWZmZWN0X2Z1bmN0aW9uOiBmdW5jdGlvbiAoc291cmNlKSB7ICAgIFxyXG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMgPSBzb3VyY2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc291cmNlICA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMgPSBuZXcgRnVuY3Rpb24gKCdkdCxwLHZlcnQnLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0X2Z1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbV9mdW5jID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlX2NvZGUgPSBzb3VyY2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG5cdHRvSlNPTjogZnVuY3Rpb24gKClcclxuXHR7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQ3VzdG9tX0FmZmVjdG9yXCJcclxuICAgICAgICB9O1xyXG5cdFx0ZGF0YS5wYXJhbXMgPSBNeV9MaWIuUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMsIHRoaXMpO1xyXG5cdFx0cGFyYW1zW1wic291cmNlX2NvZGVcIl0gPSB0aGlzLnNvdXJjZV9jb2RlO1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fSxcclxuXHRwYXJzZTogZnVuY3Rpb24gKGpzb24pXHJcblx0e1xyXG5cdFx0TXlfTGliLlBhcnRpY2xlX0FmZmVjdG9yLnByb3RvdHlwZS5wYXJzZSh0aGlzLCBqc29uKTtcclxuXHRcdHRoaXMuc2V0X2FmZmVjdF9mdW5jKGpzb24uc291cmNlX2NvZGUpO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiQ3VzdG9tX0FmZmVjdG9yXCIsIEN1c3RvbV9BZmZlY3Rvcik7XHJcblxyXG5leHBvcnQge0N1c3RvbV9BZmZlY3Rvcn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhcnRpY2xlcy9jdXN0b21fYWZmZWN0b3IuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0VtaXR0ZXJ9IGZyb20gJy4vcGFydGljbGVfZW1pdHRlci5qcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gQ3VzdG9tX0VtaXR0ZXIoKVxyXG57XHJcblx0UGFydGljbGVfRW1pdHRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5cclxuQ3VzdG9tX0VtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZSk7XHJcblxyXG52YXIgbWV0aG9kcyA9IHtcclxuICAgIGVtaXQ6IGZ1bmN0aW9uIChwLCBjb2xvcikge1xyXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbV9mdW5jKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMocCwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0ZXN0X2Z1bmM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcCA9IHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcclxuICAgICAgICAgICAgdmVsb2NpdHk6IHt4OiAwLCB5OiAwLCB6OiAwfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNvbG9yID0ge3I6IDAsIGc6IDAsIGI6IDB9O1xyXG4gICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMocCwgY29sb3IpO1xyXG4gICAgfSxcclxuICAgIHNldF9lbWl0X2Z1bmN0aW9uOiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21fZnVuYyA9IHNvdXJjZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzb3VyY2UgID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21fZnVuYyA9IG5ldyBGdW5jdGlvbiAoJ3AnLCAnY29sb3InLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0X2Z1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbV9mdW5jID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlX2NvZGUgPSBzb3VyY2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRvSlNPTjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgZGF0YS5uYW1lID0gXCJDdXN0b21fRW1pdHRlclwiO1xyXG4gICAgICAgIGRhdGEucGFyYW1zID0gTXlfTGliLlBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMsIHRoaXMpO1xyXG4gICAgICAgIGlmICh0aGlzLnNvdXJjZV9jb2RlKSB7XHJcbiAgICAgICAgICAgIGRhdGEucGFyYW1zLnNvdXJjZV9jb2RlID0gdGhpcy5zb3VyY2VfY29kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9LFxyXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgTXlfTGliLlBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnBhcnNlLmNhbGwodGhpcywgZGF0YSk7ICAgICAgICBcclxuICAgICAgICB0aGlzLnNldF9lbWl0X2Z1bmN0aW9uIChkYXRhLnNvdXJjZV9jb2RlKTtcclxuICAgIH0sXHJcbiAgICBjb25zdHJ1Y3RvcjogQ3VzdG9tX0VtaXR0ZXIsXHJcbn07XHJcblxyXG5fLmNvcHlfb2JqZWN0KEN1c3RvbV9FbWl0dGVyLnByb3RvdHlwZSwgbWV0aG9kcyk7XHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIkN1c3RvbV9FbWl0dGVyXCIsIEN1c3RvbV9FbWl0dGVyKTtcclxuXHJcblxyXG5mdW5jdGlvbiB0ZXN0KClcclxue1xyXG4gICAgdmFyIHQgPSBuZXcgQ3VzdG9tX0VtaXR0ZXIoKTtcclxuICAgIHZhciBzb3VyY2UgPSAncC5wb3NpdGlvbi56ID0gLTEwMDsgcC52ZWxvY2l0eS55ID0gMTAwOyc7XHJcbiAgICB0LnNldF9lbWl0X2Z1bmN0aW9uKHNvdXJjZSk7XHJcbiAgICB2YXIgcCA9IHtcclxuICAgICAgICB2ZWxvY2l0eToge3g6IDAsIHk6IDAsIHo6IDB9LFxyXG4gICAgICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH1cclxuICAgIH07XHJcbiAgICB0LmN1c3RvbV9mdW5jKHApO1xyXG4gICAgY29uc29sZS5sb2cocCk7XHJcbiAgICB2YXIganNvbiA9IHQudG9KU09OKCk7XHJcbiAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuICAgIFxyXG4gICAgdCA9IG5ldyBDdXN0b21fRW1pdHRlcigpO1xyXG4gICAgdC5wYXJzZShqc29uLnBhcmFtcyk7XHJcbiAgICAvL2NvbnNvbGUubG9nKHQuY3VzdG9tX2Z1bmMpOyAgICBcclxufVxyXG5cclxuLy90ZXN0KCk7XHJcblxyXG4vKlxyXG5DdXN0b21fRW1pdHRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE15X0xpYi5QYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZSk7XHJcbkN1c3RvbV9FbWl0dGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbmVfRW1pdHRlcjtcclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiQ3VzdG9tX0VtaXR0ZXJcIiwgQ29uZV9FbWl0dGVyKTtcclxuKi9cclxuXHJcbmV4cG9ydCB7Q3VzdG9tX0VtaXR0ZXJ9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvY3VzdG9tX2VtaXR0ZXIuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5cclxudmFyIFBhcnRpY2xlX0ZvcmNlcyA9IHt9O1xyXG5cclxuLy9iYXNlIGNsYXNzXHJcblBhcnRpY2xlX0ZvcmNlcy5Gb3JjZSA9IGZ1bmN0aW9uICgpXHJcbntcclxufVxyXG5cclxuXHJcbl8uY29weV9vYmplY3QoUGFydGljbGVfRm9yY2VzLkZvcmNlLnByb3RvdHlwZSx7XHJcblx0XHRjYWxjOiBmdW5jdGlvbiAoZHQsIHBhcnRpY2xlLCBhY2NlbGVyYXRpb24pIFxyXG5cdFx0e1xyXG5cdFx0fSxcclxuXHRcdHRvSlNPTjogZnVuY3Rpb24gKGNoaWxkKSBcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIHt9O1xyXG5cdFx0fSxcclxuXHRcdHBhcnNlOiBmdW5jdGlvbiAoanNvbikgXHJcblx0XHR7XHJcblx0XHR9LFxyXG59KTtcclxuXHJcbi8vY29uc3RhbnQgZm9yY2VcclxuUGFydGljbGVfRm9yY2VzLkNvbnN0YW50X0ZvcmNlID0gZnVuY3Rpb24gKGZvcmNlKVxyXG57XHJcblx0aWYgKHR5cGVvZiBmb3JjZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdHRoaXMuZm9yY2UgPSBmb3JjZTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhpcy5mb3JjZSA9IHt4OjAsIHk6MCwgejowfTtcclxuXHR9XHJcbn1cclxuXHJcblBhcnRpY2xlX0ZvcmNlcy5Db25zdGFudF9Gb3JjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcnRpY2xlX0ZvcmNlcy5Gb3JjZS5wcm90b3R5cGUpO1xyXG5fLmNvcHlfb2JqZWN0KFBhcnRpY2xlX0ZvcmNlcy5Db25zdGFudF9Gb3JjZS5wcm90b3R5cGUsIHtcclxuXHRjb25zdHJ1Y3RvcjogUGFydGljbGVfRm9yY2VzLkNvbnN0YW50X0ZvcmNlLFxyXG5cdGNhbGM6IGZ1bmN0aW9uIChkdCwgcCwgYWNjZWxlcmF0aW9uKSBcclxuXHR7XHJcblx0XHRhY2NlbGVyYXRpb24ueCArPSB0aGlzLmZvcmNlLng7XHJcblx0XHRhY2NlbGVyYXRpb24ueSArPSB0aGlzLmZvcmNlLnk7XHJcblx0XHRhY2NlbGVyYXRpb24ueiArPSB0aGlzLmZvcmNlLno7XHJcblx0fSxcclxuXHR0b0pTT046IGZ1bmN0aW9uIChjaGlsZClcclxuXHR7XHJcblx0XHR2YXIgZGF0YSA9IHt9O1xyXG5cdFx0ZGF0YS5uYW1lID0gXCJDb25zdGFudF9Gb3JjZVwiO1xyXG5cdFx0ZGF0YS5mb3JjZSA9IF8uY3JlYXRlX2Nsb25lX29iamVjdCh0aGlzLmZvcmNlKTtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH0sXHJcblx0cGFyc2U6IGZ1bmN0aW9uIChqc29uKVxyXG5cdHtcdFxyXG5cdFx0aWYgKGpzb24uZm9yY2UpIHtcclxuXHRcdFx0Xy5jb3B5X29iamVjdCh0aGlzLmZvcmNlLCBqc29uLmZvcmNlKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiQ29uc3RhbnRfRm9yY2VcIiwgUGFydGljbGVfRm9yY2VzLkNvbnN0YW50X0ZvcmNlKTtcclxuXHJcbmV4cG9ydCB7UGFydGljbGVfRm9yY2VzfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFydGljbGVzL2ZvcmNlcy5qcyIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuLi9iYXNlL215X2xpYi5qcyc7XHJcbmltcG9ydCB7UG9pbnRfR2VuZXJhdG9yc30gZnJvbSAnLi9wb2ludF9nZW5lcmF0b3JzLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9FbWl0dGVyfSBmcm9tICcuL3BhcnRpY2xlX2VtaXR0ZXIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0FmZmVjdG9yfSBmcm9tICcuL3BhcnRpY2xlX2FmZmVjdG9yLmpzJztcclxuXHJcbmZ1bmN0aW9uICBDb25lX0VtaXR0ZXIoKVxyXG57XHJcblx0UGFydGljbGVfRW1pdHRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdHRoaXMuZ2VuZXJhdG9yID0gbmV3IFBvaW50X0dlbmVyYXRvcnMuUmFuZG9tX0RpcmVjdGlvbigpO1xyXG5cdHRoaXMub3JpZ2luID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMCk7XHJcblx0dGhpcy52ZWxvY2l0eSA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApO1xyXG5cdHRoaXMuZGlzcGVyc2lvbiA9IHtcIm1pblwiOiA1LCBcIm1heFwiOiAxMH07XHJcblx0dGhpcy5kaXNwZXJzaW9uLmRlbHRhID0gNTtcclxuXHR0aGlzLnNwZWVkID0ge21pbjogNSwgbWF4OiAxMCwgZGVsdGE6NX07XHJcblx0dGhpcy5jb2xvciA9IG5ldyBUSFJFRS5Db2xvcigxLCAxLCAxKTtcclxufVxyXG5cclxuQ29uZV9FbWl0dGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUpO1xyXG5Db25lX0VtaXR0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29uZV9FbWl0dGVyO1xyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJDb25lX0VtaXR0ZXJcIiwgQ29uZV9FbWl0dGVyKTtcclxuXHJcbkNvbmVfRW1pdHRlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKClcclxue1xyXG5cdHZhciBkYXRhID0ge307XHJcblx0ZGF0YS5uYW1lID0gXCJDb25lX0VtaXR0ZXJcIjtcclxuXHRkYXRhLnBhcmFtcyA9IFBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMsIHRoaXMpO1xyXG5cdF8uY2xvbmVfZmllbGRfbGlzdF9vbmVfbGV2ZWxfcmVjdXJzaW9uKHRoaXMsIGRhdGEucGFyYW1zLCBcclxuXHRbXCJvcmlnaW5cIiwgXHJcblx0XCJ2ZWxvY2l0eVwiLCBcclxuXHRcImRpc3BlcnNpb25cIixcclxuXHRcInNwZWVkXCJdKTtcclxuXHRcclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG5cclxuQ29uZV9FbWl0dGVyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChkYXRhKVxyXG57XHJcblx0UGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUucGFyc2UuY2FsbCh0aGlzLCBkYXRhKTtcclxuXHR0aGlzLm9yaWdpbi5jb3B5KGRhdGEub3JpZ2luKTtcclxuXHR0aGlzLnZlbG9jaXR5LmNvcHkoZGF0YS52ZWxvY2l0eSk7XHJcblx0dGhpcy5zZXRfZGlzcGVyc2lvbihkYXRhLmRpc3BlcnNpb24ubWluLCBkYXRhLmRpc3BlcnNpb24ubWF4KTtcclxuXHR0aGlzLnNldF9zcGVlZChkYXRhLnNwZWVkLm1pbiwgZGF0YS5zcGVlZC5tYXgpO1xyXG59XHJcblxyXG5Db25lX0VtaXR0ZXIucHJvdG90eXBlLnNldF9zcGVlZCA9IGZ1bmN0aW9uIChtaW4sIG1heClcclxue1xyXG5cdHRoaXMuc3BlZWQubWluID0gbWluO1xyXG5cdHRoaXMuc3BlZWQubWF4ID0gbWF4O1xyXG5cdHRoaXMuc3BlZWQuZGVsdGEgPSBtYXggLSBtaW47XHJcbn1cclxuXHJcblxyXG5Db25lX0VtaXR0ZXIucHJvdG90eXBlLnNldF9kaXNwZXJzaW9uID0gZnVuY3Rpb24gKG1pbiwgbWF4KVxyXG57XHJcblx0dGhpcy5kaXNwZXJzaW9uLm1pbiA9IG1pbjtcclxuXHR0aGlzLmRpc3BlcnNpb24ubWF4ID0gbWF4O1xyXG5cdHRoaXMuZGlzcGVyc2lvbi5kZWx0YSA9IG1heCAtIG1pbjtcclxufVxyXG5cclxuXHJcblxyXG5cclxuQ29uZV9FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKHAsIGNvbG9yLCBtYXRyaXgpXHJcbntcclxuXHRwLnBvc2l0aW9uLmNvcHkodGhpcy5vcmlnaW4pO1xyXG5cdFxyXG5cdHRoaXMuZ2VuZXJhdG9yLmdldF9kaXJlY3Rpb24ocC52ZWxvY2l0eSk7XHJcblx0cC52ZWxvY2l0eS5tdWx0aXBseVNjYWxhcihNYXRoLnJhbmRvbSgpKnRoaXMuZGlzcGVyc2lvbi5kZWx0YSArIHRoaXMuZGlzcGVyc2lvbi5taW4pO1x0XHJcblx0cC52ZWxvY2l0eS5hZGQodGhpcy52ZWxvY2l0eSkubm9ybWFsaXplKCk7XHJcblx0XHJcbiAgICBpZiAobWF0cml4KSB7XHJcbiAgICAgICAgcC5wb3NpdGlvbi5hcHBseU1hdHJpeDQobWF0cml4KTtcclxuICAgICAgICBwLnZlbG9jaXR5LmFwcGx5TWF0cml4NF9yb3RhdGlvbihtYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG5cdHAudmVsb2NpdHkubXVsdGlwbHlTY2FsYXIoTWF0aC5yYW5kb20oKSp0aGlzLnNwZWVkLmRlbHRhICsgdGhpcy5zcGVlZC5taW4pO1x0XHJcblx0XHJcbiAgICBcclxuXHRpZiAoY29sb3IpIHtcclxuXHRcdHRoaXMuZW1pdF9jb2xvcihjb2xvcik7XHJcblx0fVxyXG4gICAgXHJcbn1cclxuXHJcbkNvbmVfRW1pdHRlci5wcm90b3R5cGUuZW1pdF9jb2xvciA9IGZ1bmN0aW9uIChjb2xvcikgXHJcbntcclxuXHRjb2xvci5jb3B5KHRoaXMuY29sb3IpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBTcGhlcmVfRW1pdHRlcihyYWRpdXMsIHNwZWVkKVxyXG57XHJcblx0UGFydGljbGVfRW1pdHRlci5jYWxsKHRoaXMpO1xyXG5cdHRoaXMucmFkaXVzID0gcmFkaXVzIHx8IDE7XHJcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQgfHwgMTtcclxuXHR0aGlzLmdlbmVyYXRvciA9IG5ldyBQb2ludF9HZW5lcmF0b3JzLlNwaGVyZShyYWRpdXMpO1xyXG4gICAgdGhpcy5mcm9tX2NlbnRlciA9IHRydWU7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3JhZGl1cycsIHtcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyByYWRpdXMgPSB2YWx1ZTsgZ2VuZXJhdG9yLnJhZGl1cyA9IHZhbHVlO31cclxuICAgIH0pO1xyXG59XHJcblxyXG5TcGhlcmVfRW1pdHRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlKTtcclxuXHJcbl8uY29weV9vYmplY3QoU3BoZXJlX0VtaXR0ZXIucHJvdG90eXBlLCB7XHJcbiAgICBjb25zdHJ1Y3RvcjogU3BoZXJlX0VtaXR0ZXIsXHJcbiAgICBlbWl0OiBmdW5jdGlvbiAocCwgY29sb3IsIG1hdHJpeClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5mcm9tX2NlbnRlcikge1xyXG4gICAgICAgICAgICBwLnBvc2l0aW9uLnNldCgwLDAsMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0b3IuZ2V0X3BvaW50KHAucG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdlbmVyYXRvci5nZXRfbm9ybWFsKHAudmVsb2NpdHkpO1xyXG4gICAgICAgIGlmIChtYXRyaXgpIHtcclxuICAgICAgICAgICAgcC5wb3NpdGlvbi5hcHBseU1hdHJpeDQobWF0cml4KTtcclxuICAgICAgICAgICAgcC52ZWxvY2l0eS5hcHBseU1hdHJpeDRfcm90YXRpb24obWF0cml4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcC52ZWxvY2l0eS5tdWx0aXBseVNjYWxhcih0aGlzLnNwZWVkKTtcclxuICAgIH0sXHJcbiAgICB0b0pTT046IGZ1bmN0aW9uIChqc29uKSB7XHJcblx0XHR2YXIgcGFyYW1zID0gUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdGhpcyk7XHJcbiAgICAgICAgcGFyYW1zLnJhZGl1cyA9IHRoaXMucmFkaXVzO1xyXG4gICAgICAgIHBhcmFtcy5zcGVlZCA9IHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgLy9wYXJhbXMuZ2VuZXJhdG9yLnJhZGl1cyA9IHRoaXMucmFkaXVzO1xyXG4gICAgfSxcclxuICAgIHBhcnNlOiBmdW5jdGlvbiAoanNvbikge1xyXG5cdFx0UGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUucGFyc2UuY2FsbCh0aGlzLCBqc29uKTtcclxuICAgICAgICB0aGlzLnJhZGl1cyA9IGpzb24ucmFkaXVzO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBqc29uLnNwZWVkO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIlNwaGVyZV9FbWl0dGVyXCIsIFNwaGVyZV9FbWl0dGVyKTtcclxuXHJcblxyXG5mdW5jdGlvbiBTdGFyX0R1c3RfRW1pdHRlciAoKVxyXG57XHJcblx0UGFydGljbGVfRW1pdHRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdHRoaXMuc3RhcnRfcG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKTtcclxuXHR0aGlzLmVuZF9wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpO1xyXG5cdHRoaXMuZGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKTtcdFxyXG5cdHRoaXMudmVsb2NpdHkgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAxKTtcclxufVxyXG5cclxuU3Rhcl9EdXN0X0VtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZSk7XHJcblN0YXJfRHVzdF9FbWl0dGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN0YXJfRHVzdF9FbWl0dGVyO1xyXG5fLmNvcHlfb2JqZWN0KCBTdGFyX0R1c3RfRW1pdHRlci5wcm90b3R5cGUse1xyXG5cdHNldF92ZWxvY2l0eTogZnVuY3Rpb24gKHgseSwgeikgXHJcblx0e1xyXG5cdFx0dGhpcy52ZWxvY2l0eS5zZXQoeCwgeSwgeik7XHJcblx0fSxcclxuXHRzZXRfcG9zaXRpb25fcmFuZ2UgOiBmdW5jdGlvbiAoc3RhcnQsIGVuZClcclxuXHR7XHJcblx0XHR0aGlzLnN0YXJ0X3Bvc2l0aW9uLmNvcHkoc3RhcnQpO1xyXG5cdFx0dGhpcy5lbmRfcG9zaXRpb24uY29weShlbmQpO1xyXG5cdFx0dGhpcy5kZWx0YS5zZXQoZW5kLnggLSBzdGFydC54LCBlbmQueS1zdGFydC55LCBlbmQuei1zdGFydC56KTtcclxuXHRcdFxyXG5cdH0sXHJcblx0Z2V0X3Bvc2l0aW9uOiBmdW5jdGlvbiAodmVjdG9yKVxyXG5cdHtcclxuXHRcdHZlY3Rvci54ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuZGVsdGEueCArIHRoaXMuc3RhcnRfcG9zaXRpb24ueDtcclxuXHRcdHZlY3Rvci55ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuZGVsdGEueSArIHRoaXMuc3RhcnRfcG9zaXRpb24ueTtcclxuXHRcdHZlY3Rvci56ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuZGVsdGEueiArIHRoaXMuc3RhcnRfcG9zaXRpb24uejtcclxuXHR9LFxyXG5cdGdldF92ZWxvY2l0eTogZnVuY3Rpb24gKHZlY3RvcilcclxuXHR7XHJcblx0XHR2ZWN0b3IueCA9IHRoaXMudmVsb2NpdHkueDtcclxuXHRcdHZlY3Rvci55ID0gdGhpcy52ZWxvY2l0eS55O1xyXG5cdFx0dmVjdG9yLnogPSB0aGlzLnZlbG9jaXR5Lno7XHJcblx0fSxcclxuXHRlbWl0OiBmdW5jdGlvbiAocClcclxuXHR7XHJcblx0XHR0aGlzLmdldF9wb3NpdGlvbihwLnBvc2l0aW9uKTtcclxuXHRcdGlmICh0aGlzLnBhcmVudCkge1xyXG5cdFx0XHR0aGlzLnBhcmVudC5sb2NhbFRvV29ybGQocC5wb3NpdGlvbik7XHJcblx0XHR9XHJcblx0XHR0aGlzLmdldF92ZWxvY2l0eShwLnZlbG9jaXR5KTtcclxuXHR9LFxyXG5cdHRvSlNPTjogZnVuY3Rpb24gKClcclxuXHR7XHJcblx0XHR2YXIgcGFyYW1zID0gUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdGhpcyk7XHJcblx0XHRfLmNsb25lX2ZpZWxkX2xpc3Rfb25lX2xldmVsX3JlY3Vyc2lvbih0aGlzLCBwYXJhbXMsIFtcInZlbG9jaXR5XCIsIFxyXG5cdFx0XCJzdGFydF9wb3NpdGlvblwiLFxyXG5cdFx0XCJlbmRfcG9zaXRpb25cIl0pXHJcblx0XHR2YXIgZGF0YSA9IHtcclxuXHRcdFx0XCJuYW1lXCI6IFwiU3Rhcl9EdXN0X0VtaXR0ZXJcIixcclxuXHRcdFx0XCJwYXJhbXNcIjogcGFyYW1zLFxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH0sXHJcblx0cGFyc2U6IGZ1bmN0aW9uIChqc29uKVxyXG5cdHtcclxuXHRcdFBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnBhcnNlLmNhbGwodGhpcywganNvbik7XHJcblx0XHR0aGlzLnNldF9wb3NpdGlvbl9yYW5nZShqc29uLnN0YXJ0X3Bvc2l0aW9uLCBqc29uLmVuZF9wb3NpdGlvbik7XHJcblx0XHR0aGlzLnZlbG9jaXR5LmNvcHkoanNvbi52ZWxvY2l0eSk7XHJcblx0fVxyXG5cdFxyXG59KTtcclxuXHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIlN0YXJfRHVzdF9FbWl0dGVyXCIsIFN0YXJfRHVzdF9FbWl0dGVyKTtcclxuXHJcblxyXG5mdW5jdGlvbiBTdGFyX0R1c3RfQWZmZWN0b3IgKGVuZClcclxue1xyXG5cdHRoaXMuZW5kID0gZW5kIHx8IDA7XHJcbn1cclxuXHJcblxyXG5TdGFyX0R1c3RfQWZmZWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUpO1xyXG5TdGFyX0R1c3RfQWZmZWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3Rhcl9EdXN0X0FmZmVjdG9yO1xyXG5cclxuXy5jb3B5X29iamVjdChTdGFyX0R1c3RfQWZmZWN0b3IucHJvdG90eXBlLHtcclxuXHRhZmZlY3Q6IGZ1bmN0aW9uIChkdCwgcGRhdGEsIHZlcnQpXHJcblx0e1xyXG5cdFx0aWYgKHBkYXRhLnBvc2l0aW9uLnogPiB0aGlzLmVuZCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9LFxyXG5cdHRvSlNPTjogZnVuY3Rpb24gKClcclxuXHR7XHJcblx0XHR2YXIgcGFyYW1zID0gUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMsIHRoaXMpO1xyXG5cdFx0cGFyYW1zW1wiZW5kXCJdID0gdGhpcy5lbmQ7XHJcblx0XHR2YXIgZGF0YSA9IHtcclxuXHRcdFx0XCJuYW1lXCI6IFwiU3Rhcl9EdXN0X0FmZmVjdG9yXCIsXHJcblx0XHRcdFwicGFyYW1zXCI6IHBhcmFtcyxcclxuXHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fSxcclxuXHRwYXJzZTogZnVuY3Rpb24gKGpzb24pXHJcblx0e1xyXG5cdFx0UGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnBhcnNlKHRoaXMsIGpzb24pO1xyXG5cdFx0dGhpcy5lbmQgPSBqc29uLmVuZDtcclxuXHR9XHJcbn0pO1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiU3Rhcl9EdXN0X0FmZmVjdG9yXCIsIFN0YXJfRHVzdF9BZmZlY3Rvcik7XHJcblxyXG5leHBvcnQge0NvbmVfRW1pdHRlciwgU3Rhcl9EdXN0X0VtaXR0ZXIsIFNwaGVyZV9FbWl0dGVyLCBTdGFyX0R1c3RfQWZmZWN0b3J9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvdGVzdF9lbWl0dGVycy5qcyJdLCJzb3VyY2VSb290IjoiIn0=