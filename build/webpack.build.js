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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__ = __webpack_require__(18);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "My_Lib", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Base_Animation", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Euler_Animation", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Scale_Animation", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Mouse_Intersector", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Loading_Manager", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Package_Manager", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particles_Points", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particle_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particle_Forces", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particle_Affector", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Point_Generators", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Custom_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Custom_Affector", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Cone_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Star_Dust_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Sphere_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Star_Dust_Affector", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particle_Shaders", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particle_System", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particle_Manager", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["u"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Scene_Serializer", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["v"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["w"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Color_Domain", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["x"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Table_Color", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["y"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Mouse_Camera_Controller", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["z"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Simple_Collider", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["A"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "main_event_hub", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["B"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Event_Hub", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["C"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Mix_It", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["D"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Mixin", function() { return __WEBPACK_IMPORTED_MODULE_0__engine_main_webpack_js__["E"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gui_main_webpack_js__ = __webpack_require__(19);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "create_vue_app", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_main_webpack_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Color_Picker", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_main_webpack_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Texture_Panel", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_main_webpack_js__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particles_Props", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_main_webpack_js__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Particles_Panel", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_main_webpack_js__["e"]; });



/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Affector; });
/* unused harmony export Force_Affector */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(1);


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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Emitter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(1);


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
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mouse_Intersector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__simple_collider_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mouse_camera_controller_js__ = __webpack_require__(4);
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
/* 8 */
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

    if (object.visible === false && !this.params.check_invisible) return;

    this.check_object_bounding_sphere(object);
    if (!this.params.recursive) return;

    //test children
    var children = object.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        this.find_intersection_with_bounding_sphere(child);
    }
};



/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particles_Panel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__particles_props_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__texture_panel_js__ = __webpack_require__(12);



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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particles_Props; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__color_picker_js__ = __webpack_require__(9);


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
/* 12 */
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Color_Domain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Table_Color; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(1);


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
/* 14 */
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_System; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__particle_affector_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particles_points_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particle_shaders_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__color_domain_js__ = __webpack_require__(13);







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
    for (var i = 0; i < count; i++) {
        p = {};
        p.position = new THREE.Vector3(0, 0, 0);
        p.velocity = new THREE.Vector3(0, 0, 0);
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

    for (var i = 0; i < count; i++) {
        //create particle
        vertices[i * 3] = 0;
        vertices[i * 3 + 1] = 0;
        vertices[i * 3 + 2] = 0;

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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Manager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__particle_affector_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particles_points_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particles_js__ = __webpack_require__(15);






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
/* 17 */
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_event_hub_js__ = __webpack_require__(6);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_0__base_event_hub_js__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_0__base_event_hub_js__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_my_lib_js__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__base_my_lib_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_animations_js__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__base_animations_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__base_animations_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__base_animations_js__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_mouse_intersector_js__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__base_mouse_intersector_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_loading_manager_js__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__base_loading_manager_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_package_manager_js__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_5__base_package_manager_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__particles_particles_points_js__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_6__particles_particles_points_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__particles_particle_emitter_js__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_7__particles_particle_emitter_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__particles_forces_js__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_8__particles_forces_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__particles_particle_affector_js__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_9__particles_particle_affector_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__particles_point_generators_js__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_10__particles_point_generators_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__particles_custom_emitter_js__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_11__particles_custom_emitter_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__particles_custom_affector_js__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_12__particles_custom_affector_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__particles_test_emitters_js__ = __webpack_require__(31);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_13__particles_test_emitters_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_13__particles_test_emitters_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_13__particles_test_emitters_js__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_13__particles_test_emitters_js__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__particles_particle_shaders_js__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_14__particles_particle_shaders_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__particles_particles_js__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_15__particles_particles_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__particles_particles_manager_js__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_16__particles_particles_manager_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__base_scene_serializer_js__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_17__base_scene_serializer_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__mixins_threejs_mixins_js__ = __webpack_require__(27);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_18__mixins_threejs_mixins_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__mixins_camera_mixin_js__ = __webpack_require__(26);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_19__mixins_camera_mixin_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__app_application_js__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_20__app_application_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__particles_color_domain_js__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_21__particles_color_domain_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_21__particles_color_domain_js__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__base_mouse_camera_controller_js__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_22__base_mouse_camera_controller_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__base_simple_collider_js__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_23__base_simple_collider_js__["a"]; });









































/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gui_vueapp_js__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__gui_vueapp_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gui_color_picker_js__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_color_picker_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gui_texture_panel_js__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__gui_texture_panel_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gui_particles_props_js__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__gui_particles_props_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gui_particles_panel_js__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__gui_particles_panel_js__["a"]; });






/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Application; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_event_hub_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_mouse_intersector_js__ = __webpack_require__(7);
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Base_Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Euler_Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Scale_Animation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(1);


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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Loading_Manager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(1);


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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Package_Manager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(1);
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scene_Serializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particles_particles_manager_js__ = __webpack_require__(16);



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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return create_vue_app; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__particles_panel_js__ = __webpack_require__(10);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_mouse_camera_controller_js__ = __webpack_require__(4);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_affector_js__ = __webpack_require__(2);



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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__ = __webpack_require__(3);



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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(1);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point_generators_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particle_affector_js__ = __webpack_require__(2);





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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWE0YTQ1MjM2ZWRjZjI5ZTA1MDciLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkaXRvcl93ZWJwYWNrX2Rldi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS9teV9saWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZV9hZmZlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlX2VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2UvbW91c2VfY2FtZXJhX2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZXNfcG9pbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXNlL2V2ZW50X2h1Yi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS9tb3VzZV9pbnRlcnNlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS9zaW1wbGVfY29sbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aS9jb2xvcl9waWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aS9wYXJ0aWNsZXNfcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aS9wYXJ0aWNsZXNfcHJvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aS90ZXh0dXJlX3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvY29sb3JfZG9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVfc2hhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlc19tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvcG9pbnRfZ2VuZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lX21haW5fd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3VpX21haW5fd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXNlL2FuaW1hdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2UvbG9hZGluZ19tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXNlL3BhY2thZ2VfbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS9zY2VuZV9zZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9ndWkvdnVlYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9taXhpbnMvY2FtZXJhX21peGluLmpzIiwid2VicGFjazovLy8uL3NyYy9taXhpbnMvdGhyZWVqc19taXhpbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9jdXN0b21fYWZmZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9jdXN0b21fZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL2ZvcmNlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL3Rlc3RfZW1pdHRlcnMuanMiXSwibmFtZXMiOlsiTXlfTGliIiwiVmlld3BvcnQiLCJPYmplY3RfQW5pbWF0aW9uIiwib2JqZWN0IiwiYW5pbWF0aW9uIiwicHJvdG90eXBlIiwidXBkYXRlIiwiZHQiLCJjcmVhdGVfdGV4dF9pbWFnZSIsIndpZHRoIiwiaGVpZ2h0IiwidGV4dCIsIm5wb3QiLCJiYWNrZ3JvdW5kIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dCIsImdldENvbnRleHQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImZvbnQiLCJmaWxsVGV4dCIsInRleHR1cmUiLCJUSFJFRSIsIlRleHR1cmUiLCJ3cmFwUyIsIndyYXBUIiwiVGV4dHVyZVdyYXBwaW5nIiwiQ2xhbXBUb0VkZ2VXcmFwcGluZyIsIm1pbkZpbHRlciIsIkxpbmVhckZpbHRlciIsIm5lZWRzVXBkYXRlIiwiQ3JlYXRlX1F1YWQiLCJ2ZXJ0ZXhfc2hhZGVyIiwiZnJhZ21lbnRfc2hhZGVyIiwicGxhbmUiLCJQbGFuZUJ1ZmZlckdlb21ldHJ5IiwibWF0ZXJpYWwiLCJTaGFkZXJNYXRlcmlhbCIsInZlcnRleFNoYWRlciIsImZyYWdtZW50U2hhZGVyIiwicXVhZCIsIk1lc2giLCJyb3RhdGlvbiIsInkiLCJNYXRoIiwiUEkiLCJSZW5kZXJfVGFyZ2V0IiwidGFyZ2V0IiwiV2ViR0xSZW5kZXJUYXJnZXQiLCJtYWdGaWx0ZXIiLCJOZWFyZXN0RmlsdGVyIiwiZm9ybWF0IiwiUkdCRm9ybWF0IiwiY2FtZXJhIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJyZW5kZXIiLCJzY2VuZSIsInJlbmRlcmVyIiwiY3JlYXRlX292ZXJsYXlfY2FtZXJhIiwiT3J0aG9ncmFwaGljQ2FtZXJhIiwiT3ZlcmxheSIsImF1dG9DbGVhciIsIk1vdXNlX0NvbnRyb2xsZXIiLCJyb290Iiwib3ZlciIsImNsaWNrIiwiY2FsbGJhY2siLCJldmVudF9odWIiLCJFdmVudF9IdWIiLCJldmVudHMiLCJhZGRfZXZlbnRfbGlzdGVuZXIiLCJuYW1lIiwiZnVuYyIsIm9iaiIsInB1c2giLCJvbiIsImVtaXQiLCJsaXN0ZW5lcnMiLCJpIiwibGVuZ3RoIiwidCIsImNhbGwiLCJydW5fZnVuY3Rpb24iLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiY3JlYXRlX3J1bl9mdW5jdGlvbiIsImFwcCIsInJ1biIsImxvb3AiLCJFdWxlcl9Db250cm9sbGVyIiwieCIsInoiLCJ4c3BlZWQiLCJ5c3BlZWQiLCJ6c3BlZWQiLCJSZWdpc3RlcmVkX0NsYXNzZXMiLCJSZWdpc3Rlcl9DbGFzcyIsImNvbnNvbGUiLCJsb2ciLCJHZXRfQ2xhc3MiLCJjcmVhdGVfY2xhc3MiLCJwYXJlbnQiLCJjaGlsZCIsInByb3BzIiwiT2JqZWN0IiwiY3JlYXRlIiwiXyIsImNvcHlfb2JqZWN0IiwiY29udHJ1Y3RvciIsIkFic3RyYWN0X0ZhYnJpYyIsImRhdGEiLCJjb25zdHJ1Y3RvciIsInR5cGUiLCJwYXJzZSIsInVuZGVmaW5lZCIsIlByaW50X0NsYXNzZXMiLCJrZXkiLCJQYXJ0aWNsZV9BZmZlY3RvciIsImlkIiwiZ2VuZXJhdGVVVUlEIiwiYWZmZWN0IiwicGRhdGEiLCJ2ZXJ0IiwiY29sb3IiLCJ0b0pTT04iLCJwYXJhbXMiLCJqc29uIiwiRm9yY2VfQWZmZWN0b3IiLCJmb3JjZXMiLCJBcnJheSIsImFkZF9mb3JjZSIsImZvcmNlIiwiYXBwbHlfZm9yY2VzIiwicGFydGljbGUiLCJhY2NlbGVyYXRpb24iLCJjYWxjIiwidmVsb2NpdHkiLCJ1dWlkIiwiZiIsIml0ZW0iLCJQYXJ0aWNsZV9FbWl0dGVyIiwiZW1pdF9wZXJfc2Vjb25kIiwiZW1pdF9kZWx0YSIsImVtaXRfY291bnQiLCJsaWZldGltZSIsImVtaXRfbGlmZSIsIm1pbiIsInJhbmRvbSIsIm1heCIsImNhbGNfZW1pdHRlZF9wYXJ0aWNsZXMiLCJuZWVkX2VtaXQiLCJmbG9vciIsInAiLCJjIiwibWF0cml4IiwicG9zaXRpb24iLCJzZXQiLCJhcHBseU1hdHJpeDQiLCJhcHBseU1hdHJpeDRfcm90YXRpb24iLCJNb3VzZV9DYW1lcmFfQ29udHJvbGxlciIsImVycm9yIiwic2V0X2NhbnZhc19pbmZvIiwib2Zmc2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInRvcCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwicmVmcmVzaF9jYW52YXMiLCJuZXdfY2FudmFzIiwiZ2V0X25vcm1hbGl6ZWRfc2NyZWVuX2Nvb3JkaW5hdGVzIiwidmVjdG9yIiwiVmVjdG9yMyIsImdldF9ub3JtYWxpemVfbW91c2VfcG9zaXRpb24iLCJldmVudCIsImNsaWVudFgiLCJjbGllbnRZIiwidW5wcm9qZWN0IiwiciIsImNvcHkiLCJnZXRfcmF5X2Zyb21fY2FtZXJhX2luX3NjcmVlbl9jb29yZGluYXRlcyIsInJheSIsIlJheSIsInN1YiIsIm5vcm1hbGl6ZSIsImdldF9yYXlfZnJvbV9jYW1lcmFfaW5fbW91c2VfcG9zaXRpb24iLCJQYXJ0aWNsZXNfUG9pbnRzIiwiZ2VvbWV0cnkiLCJQb2ludHMiLCJib3VuZGluZ1NwaGVyZSIsIlNwaGVyZSIsInJhZGl1cyIsImdldEJvdW5kaW5nU3BoZXJlIiwibWV0YSIsIm1hdCIsImdlb20iLCJPYmplY3QzRCIsInJheWNhc3QiLCJyYXljYXN0ZXIiLCJpbnRlcnNlY3RzIiwic3BoZXJlIiwibWF0cml4V29ybGQiLCJpbnRlcnNlY3RzU3BoZXJlIiwic2hpdCIsInRyIiwidG1wIiwiZGlzdGFuY2UiLCJzcXJ0IiwiZG90IiwicG9pbnQiLCJtYWluX2V2ZW50X2h1YiIsIk1vdXNlX0ludGVyc2VjdG9yIiwiZ2V0X25vcm1hbGl6ZWRfc2NyZWVuX2Nvb3JkcyIsIm1vdXNlX2Nvb3Jkc190b192ZWN0b3IiLCJtb3VzZV9jb29yZHNfdG9fcmF5IiwiZmluZF9pbnRlcnNlY3Rpb25fd2l0aF9tb3VzZV92ZWN0b3IiLCJSYXljYXN0ZXIiLCJpbnRlcnNlY3RPYmplY3RzIiwiZmluZF9pbnRlcnNlY3RlZF9vYmplY3QiLCJjb2xsaWRlciIsImNoZWNrX3JheSIsIlNpbXBsZV9Db2xsaWRlciIsInJlY3Vyc2l2ZSIsImNoZWNrX2ludmlzaWJsZSIsImludGVyc2VjdGVkX29iamVjdHMiLCJfdGVzdGVkX3NwaGVyZSIsInByZXBhcmVfY2hlY2siLCJpbnRlcnNlY3RlZF9tYXAiLCJfZmFrZWNhc3RlciIsImZpbmRfaW50ZXJzZWN0aW9uX3dpdGhfYm91bmRpbmdfc3BoZXJlIiwiYWRkX2ludGVyc2VjdGVkIiwiY2hlY2tfb2JqZWN0X2JvdW5kaW5nX3NwaGVyZSIsImNvbXB1dGVCb3VuZGluZ1NwaGVyZSIsInVwZGF0ZU1hdHJpeFdvcmxkIiwiaW50ZXIiLCJ2aXNpYmxlIiwiY2hpbGRyZW4iLCJDb2xvcl9QaWNrZXIiLCJ2YWx1ZSIsImRlZmF1bHQiLCJnIiwiYiIsInRlbXBsYXRlIiwibmV3X3ZhbHVlIiwibWV0aG9kcyIsImNoYW5nZWQiLCIkZW1pdCIsIlBhcnRpY2xlc19QYW5lbCIsInBhcnRpY2xlcyIsInRleHR1cmVzIiwic2VsZWN0ZWQiLCJTdHJpbmciLCJmaXJzdF90aW1lIiwicGFydGljbGVfcGFyYW1zIiwibXlfc2VsZWN0ZWQiLCJ0ZXh0dXJlX3BhbmVsX2lzX3Zpc2libGUiLCJhZGRfdG9fc2VsZWN0IiwiY3JlYXRlX3BhcnRpY2xlcyIsInJlbW92ZV9wYXJ0aWNsZXMiLCJzcGxpY2UiLCJjaGFuZ2VfY29sb3JzIiwic2hvd190ZXh0dXJlX3BhbmVsIiwic2VsZWN0X3BhcnRpY2xlcyIsImdldF9wYXJ0aWNsZV9wYXJhbXMiLCJwbGF5IiwiY3JlYXRlZCIsInNlbGYiLCIkb24iLCJ3YXRjaCIsImFyciIsIm5ld19zZWxlY3RlZCIsImNvbXBvbmVudHMiLCJUZXh0dXJlX1BhbmVsIiwiQmxlbmRpbmdfU2VsZWN0b3IiLCJyZXF1aXJlZCIsInNlbGVjdCIsImJsZW5kaW5nIiwiQmVoYXZpb3IiLCJiZWhhdmlvciIsInNob3dfYmVoYXZpb3IiLCJQYXJ0aWNsZV9QYXJhbXMiLCJmaXJlIiwiJHBhcmVudCIsIlBhcnRpY2xlc19Qcm9wcyIsImJsZW5kaW5nX2NoYW5nZSIsImVtaXRfcGFyYW1fY2hhbmdlIiwiY2hlY2tlZCIsInVwZGF0ZV9jb2xvciIsInNlbGVjdGVkX3RleHR1cmUiLCJ0ZXh0dXJlX3dpZHRoIiwidGV4dHVyZV9oZWlnaHQiLCJwYW5lbF92aXNpYmxlIiwic2hvd19wYW5lbCIsImNob29zZV90ZXh0dXJlIiwiZHJhd190ZXh0dXJlIiwiYXBwbHkiLCJvYmplY3RfaWQiLCJnZXRfdGV4dHVyZSIsInRleHR1cmVfZm9ybWF0X3RvX3N0cmluZyIsImltYWdlIiwibmF0dXJhbFdpZHRoIiwibmF0dXJhbEhlaWdodCIsIiRyZWZzIiwibXlfZHJhd19pbWFnZSIsImdldF90ZXh0dXJlX2Zyb21fcGFydGljbGVzIiwibW91bnRlZCIsIkNvbG9yX0RvbWFpbiIsIkNvbG9yIiwiZmlsbCIsIlRhYmxlX0NvbG9yIiwidGFibGUiLCJjb3B5X3RhYmxlIiwiZGVmYXVsdF90YWJsZSIsImluZGV4IiwiY2VpbCIsInNyYyIsImdldCIsIlBhcnRpY2xlX1NoYWRlcnMiLCJ2ZXJ0ZXgiLCJqb2luIiwiZnJhZ21lbnQiLCJQYXJ0aWNsZV9TeXN0ZW0iLCJjb25maWdfcGFyYW1zIiwiZW1pdHRlciIsImFmZmVjdG9yIiwicGFydGljbGVfbGlmZXRpbWUiLCJkeW5hbWljX2NvbG9yIiwiY291bnQiLCJjcmVhdGVfcGFydGljbGVfbWF0ZXJpYWwiLCJub2RlIiwiY3JlYXRlX3BhcnRpY2xlX2dlb21ldHJ5IiwiYm91bmRpbmdfcmFkaXVzIiwibm9fZmFkZV9jb2xvciIsInByZV9hbHBoYSIsImRlcHRoX3Rlc3QiLCJkZXB0aF93cml0ZSIsInNpemUiLCJkaXNjcmV0ZV9lbWlzc2lvbiIsImFwcGx5X3dvcmxkX21hdHJpeF9vbl9lbWl0IiwiaGFzT3duUHJvcGVydHkiLCJzZXRfbmFtZSIsInN1aWNpZGUiLCJyZW1vdmUiLCJjcmVhdGVfcGFydGljbGVfZGF0YSIsInBhcnRpY2xlX2RhdGEiLCJ2ZXJ0aWNlcyIsIkZsb2F0MzJBcnJheSIsImNvbG9ycyIsImNvbG9yX2RvbWFpbiIsIkJ1ZmZlckF0dHJpYnV0ZSIsInNldER5bmFtaWMiLCJCdWZmZXJHZW9tZXRyeSIsImJ1ZmZlciIsImFkZEF0dHJpYnV0ZSIsImRpc2NyZXRlX2VtaXQiLCJlbWl0X3BhcnRpY2xlcyIsInZlcnRzIiwiYXJyYXkiLCJvbGRfbmVlZF9lbWl0IiwidXBkYXRlX3BhcnRpY2xlX2dlb21ldHJ5IiwiZHVtbXlfY29sb3IiLCJnZW5lcmF0ZV9tYXRlcmlhbF9uYW1lIiwibXlfbmFtZSIsImJsZW5kaW5nX21vZGUiLCJPbmVGYWN0b3IiLCJTcmNBbHBoYUZhY3RvciIsIk9uZU1pbnVzU3JjQWxwaGFGYWN0b3IiLCJjb252ZXJ0X2JsZW5kaW5nX21vZGUiLCJ0aHJlZV9ibGVuZGluZyIsImZhY3RvcnMiLCJOb0JsZW5kaW5nIiwiQ3VzdG9tQmxlbmRpbmciLCJzZXRfdGV4dHVyZSIsIlRleHR1cmVfTWFuYWdlciIsInVuaWZvcm1zIiwic3ByaXRlIiwicmVjcmVhdGVfbWF0ZXJpYWwiLCJjcmVhdGVfdW5pZm9ybXMiLCJWZWN0b3IyIiwiY2FsY19kZWZpbmVzIiwiZGVmaW5lcyIsInNlbGVjdF90ZXh0dXJlIiwiYmxlbmRfb2JqIiwidHJhbnNwYXJlbnQiLCJkZXB0aFdyaXRlIiwiZGVwdGhUZXN0IiwiYmxlbmRTcmMiLCJibGVuZERzdCIsInNldF9wcmVfYWxwaGEiLCJzZXRfcG9pbnRfc2l6ZSIsInNldF9ibGVuZGluZyIsInNldF9lbWl0dGVyIiwic2V0X3BhcnRpY2xlX2xpZmVfbGVuZ3RoIiwidmFsIiwic2V0X2VtaXNzaW9uX3Blcl9zZWNvbmQiLCJzZXRfcGFydGljbGVfY291bnQiLCJzZXRfY29sb3IiLCJzZXRfYm91bmRpbmdfc3BoZXJlX3JhZGl1cyIsIlBhcnRpY2xlX01hbmFnZXIiLCJwYXJ0aWNsZXNfYXJyYXkiLCJhZGQiLCJwcyIsImluZGV4T2YiLCJnZXRfcGFydGljbGVfbmFtZXMiLCJuYW1lcyIsImNyZWF0ZV9ieV9wYXJhbXMiLCJlbWl0dGVyX2ZhYnJpYyIsImFmZmVjdG9yX2ZhYnJpYyIsImZyb21KU09OIiwiSlNPTiIsImUiLCJnZXRPYmplY3RCeU5hbWUiLCJsb2FkX3BhcnRpY2xlcyIsImdldE9iamVjdEJ5UHJvcGVydHkiLCJyZXBsYWNlX29iamVjdF93aXRoX3RoaXMiLCJjcmVhdGVfbmFtZSIsIm51bWJlciIsImJlZ2luX25hbWUiLCJ0ZXN0aW5nIiwiY3JlYXRlX25ldyIsInBhcnRpY2xlX21hbmFnZXIiLCJQYXJ0aWNsZXNfQ29uZmlnIiwiUG9pbnRfR2VuZXJhdG9ycyIsIlJhbmRvbV9EaXJlY3Rpb24iLCJnZXRfZGlyZWN0aW9uIiwiZ2V0X2lubmVyX3BvaW50IiwiYWxwaGEiLCJiZXRhIiwiY29zIiwic2luIiwiZ2V0X25vcm1hbCIsImdldF9wb2ludCIsIm11bHRpcGx5U2NhbGFyIiwiQXBwbGljYXRpb24iLCJjb25maWciLCJfbGlmZWN5Y2xlX2V2ZW50IiwiX2luaXRfdGltZXIiLCJfY3JlYXRlX2xvb3BfZnVuY3Rpb24iLCJtb3VzZV9jb250cm9sbGVycyIsInJlbW92ZV9hbmltYXRlZF9vYmplY3QiLCJzdGFydCIsIl9zZXRfY29uZmlndXJhdGlvbiIsImNsb2NrIiwiQ2xvY2siLCJkZWx0YV90aW1lIiwiYW5pbWF0ZWRfb2JqZWN0cyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImdldF9kZWZhdWx0X2NvbmZpZ3VyYXRpb24iLCJfY3JlYXRlX3JlbmRlciIsImRvbV9zY3JlZW4iLCJhbGVydCIsImdldEVsZW1lbnRCeUlkIiwiZG9tX2VsZW1lbnQiLCJXZWJHTFJlbmRlcmVyIiwicmVuZGVyX3BhcmFtcyIsImFwcGVuZENoaWxkIiwiZG9tRWxlbWVudCIsInNldFNpemUiLCJ2aWV3cG9ydCIsInNldF92aWV3cG9ydCIsInNldENsZWFyQ29sb3IiLCJjbGVhcl9jb2xvciIsIl9jcmVhdGVfbWFpbl9zY2VuZSIsInByZXZlbnQiLCJtYWluX3NjZW5lIiwiU2NlbmUiLCJtYWluX2NhbWVyYSIsImZvdiIsImFzcGVjdF9yYXRpbyIsIm5lYXIiLCJmYXIiLCJhc3BlY3QiLCJ1cGRhdGVQcm9qZWN0aW9uTWF0cml4IiwiYXBwbHlfY29uZmlndXJhdGlvbiIsImNvbmZpZ3VyYXRpb24iLCJsb2FkX2NvbmZpZ3VyYXRpb24iLCJ1cmwiLCJ4aHIiLCJYSFJMb2FkZXIiLCJjb25maWd1cmF0aW9uX2lzX2FwcGxpZWQiLCJvbmxvYWQiLCJwcm9ncmVzcyIsInN0YXR1cyIsImxvYWQiLCJkZWZhdWx0X2NvbmZpZyIsImV4dGVuZCIsImNoaWxkX2Z1bmMiLCJDaGlsZCIsImFyZ3VtZW50cyIsImV4dGVuZF9wcm90byIsInByb3RvIiwiZGVsdGEiLCJnZXREZWx0YSIsImRvX3VwZGF0ZSIsImFkZF9hbmltYXRlZF9vYmplY3QiLCJ1cGRhdGVfYWxsIiwibGVuIiwicHJlX3VwZGF0ZSIsImJlZm9yZV91cGRhdGUiLCJjcmVhdGVfbW91c2VfbW92ZV9saXN0ZW5lciIsIm1vdXNlX21vdmVfbGlzdGVuZXIiLCJmaW5kX21vdXNlX292ZXJfaW50ZXJzZWN0aW9ucyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRfbW91c2VfY29udHJvbGxlciIsIkJhc2VfQW5pbWF0aW9uIiwidGltZSIsInRpbWVfc2NhbGUiLCJzdG9wcGVkIiwic2NhbGVkX2R0IiwiY2FsY19hbmltYXRpb24iLCJzdG9wIiwicmVzZXQiLCJwYXJhbSIsIkV1bGVyX0FuaW1hdGlvbiIsIlNjYWxlX0FuaW1hdGlvbiIsInhzY2FsZSIsInlzY2FsZSIsInpzY2FsZSIsInNjYWxlIiwiZmlyc3QiLCJDaGFpbl9Mb2FkZXIiLCJsaXN0Iiwic3RvcF9ieV9lcnJvciIsIm5leHQiLCJyZXNvdXJjZSIsIml0ZW1fbG9hZGVkIiwiZmluaXNoZWQiLCJkb19lcnJvciIsIm9uZXJyb3IiLCJkb19wcm9ncmVzcyIsIm9ucHJvZ3Jlc3MiLCJsb2FkX2Z1bmMiLCJ0ZXN0X2NoYWluX2xvYWRlciIsImNsIiwiTG9hZGluZ19NYW5hZ2VyIiwicmVzb3VyY2VzIiwidGV4dHVyZV9sb2FkZXIiLCJUZXh0dXJlTG9hZGVyIiwiZ2V0X2FzeW5jIiwibG9hZF9saXN0IiwicmVzb3VyY2VfbGlzdCIsIm9uX2xvYWQiLCJvbl9wcm9ncmVzcyIsIm9uX3Jlc291cmNlX2xvYWRlZCIsImxvYWRfbGlzdF90ZXh0dXJlcyIsImxvYWRfbGlzdF9qc29uIiwibG9hZGVyIiwiZnJlZSIsIlBhY2thZ2VfTWFuYWdlciIsInN0YXRlIiwiZGVmYXVsdHMiLCJwYXJzZV9wYWNrYWdlX2Rlc2NyaXB0aW9uIiwicGFjayIsImxvYWRfcmVzb3VyY2VzIiwibG9hZGVkIiwiZGF0YV9sb2FkZWQiLCJTY2VuZV9TZXJpYWxpemVyIiwiYW5pbWF0aW9uX2xpYnJhcnkiLCJhbmltcyIsImNvbGxlY3RfYW5pbWF0aW9ucyIsImNyZWF0ZV9hbmltYXRpb25zIiwiYW5pbWF0aW9ucyIsImFuaW0iLCJiaW5kX2FuaW1hdGlvbnMiLCJhbmltZGF0YSIsImJpbmRpbmdzIiwiY29weV9hbmltYXRpb25zIiwiYmluZCIsImFuaW1fdXVpZCIsImFkZF9hbmltYXRpb24iLCJsb2FkX2Zyb21fanNvbiIsIm8iLCJPYmplY3RMb2FkZXIiLCJteWFuaW1hdGlvbnMiLCJzY2VuZV9sb2FkZWQiLCJjcmVhdGVfdnVlX2FwcCIsImFwcDIiLCJWdWUiLCJlbCIsIk1peGluIiwiZ2V0X2ZvcndhcmRfcGxhbmVfYnlfb2JqZWN0Iiwic2V0RnJvbU1hdHJpeENvbHVtbiIsImRpc3QiLCJQbGFuZSIsIm5lZ2F0ZSIsImdldF9yYXlfZnJvbV9zY3JlZW5fY29vcmRpbmF0ZXMiLCJtYyIsIk1peF9JdCIsIm0iLCJlbGVtZW50cyIsIk9iamVjdDNEX0FuaW1hdGlvbl9NaXhpbiIsInJlbW92ZV9hbmltYXRpb24iLCJvbGRfdG9Kc29uIiwiT2JqZWN0M0RfU2VyaWFsaXphdGlvbl9NaXhpbiIsInN0YW5kYXJkX3NlcmlhbGl6YXRpb24iLCJzdHJpbmdpZnkiLCJ1c2VyRGF0YSIsImNhc3RTaGFkb3ciLCJyZWNlaXZlU2hhZG93IiwidG9BcnJheSIsIm1hdGVyaWFscyIsImdlb21ldHJpZXMiLCJjb2xsZWN0X21hdGVyaWFscyIsImNvbGxlY3RfZ2VvbWV0cnkiLCJ0b0pTT04xIiwiZXh0cmFjdEZyb21DYWNoZSIsImNhY2hlIiwidmFsdWVzIiwibWV0YWRhdGEiLCJpc1Jvb3RPYmplY3QiLCJvdXRwdXQiLCJpbWFnZXMiLCJ2ZXJzaW9uIiwiZ2VuZXJhdG9yIiwiY29sbGVjdF9hbmltYXRpb25zX3JlY3Vyc2l2ZSIsImRtX21hcmsiLCJzb3VyY2UiLCJ1cCIsInF1YXRlcm5pb24iLCJtYXRyaXhBdXRvVXBkYXRlIiwibWF0cml4V29ybGROZWVkc1VwZGF0ZSIsImZydXN0dW1DdWxsZWQiLCJyZW5kZXJPcmRlciIsIkN1c3RvbV9BZmZlY3RvciIsImN1c3RvbV9mdW5jIiwiZHVtbXkiLCJ0ZXN0X2Z1bmMiLCJzZXRfYWZmZWN0X2Z1bmN0aW9uIiwiRnVuY3Rpb24iLCJzb3VyY2VfY29kZSIsInNldF9hZmZlY3RfZnVuYyIsIkN1c3RvbV9FbWl0dGVyIiwic2V0X2VtaXRfZnVuY3Rpb24iLCJ0ZXN0IiwiUGFydGljbGVfRm9yY2VzIiwiRm9yY2UiLCJDb25zdGFudF9Gb3JjZSIsImNyZWF0ZV9jbG9uZV9vYmplY3QiLCJDb25lX0VtaXR0ZXIiLCJvcmlnaW4iLCJkaXNwZXJzaW9uIiwic3BlZWQiLCJjbG9uZV9maWVsZF9saXN0X29uZV9sZXZlbF9yZWN1cnNpb24iLCJzZXRfZGlzcGVyc2lvbiIsInNldF9zcGVlZCIsImVtaXRfY29sb3IiLCJTcGhlcmVfRW1pdHRlciIsImZyb21fY2VudGVyIiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiU3Rhcl9EdXN0X0VtaXR0ZXIiLCJzdGFydF9wb3NpdGlvbiIsImVuZF9wb3NpdGlvbiIsInNldF92ZWxvY2l0eSIsInNldF9wb3NpdGlvbl9yYW5nZSIsImVuZCIsImdldF9wb3NpdGlvbiIsImdldF92ZWxvY2l0eSIsImxvY2FsVG9Xb3JsZCIsIlN0YXJfRHVzdF9BZmZlY3RvciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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YnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDFhNGE0NTIzNmVkY2YyOWUwNTA3IiwiZXhwb3J0ICogZnJvbSAnLi9lbmdpbmVfbWFpbl93ZWJwYWNrLmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi9ndWlfbWFpbl93ZWJwYWNrLmpzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRpdG9yX3dlYnBhY2tfZGV2LmpzIiwiLypcclxuKi9cclxuXHJcblxyXG52YXIgTXlfTGliID0ge307XHJcblxyXG5NeV9MaWIuVmlld3BvcnQgPSB7fTtcclxuXHJcblxyXG5NeV9MaWIuT2JqZWN0X0FuaW1hdGlvbiA9IGZ1bmN0aW9uIChvYmplY3QsIGFuaW1hdGlvbilcclxue1xyXG5cdHRoaXMub2JqZWN0ID0gb2JqZWN0O1xyXG5cdHRoaXMuYW5pbWF0aW9uID0gYW5pbWF0aW9uO1xyXG59XHJcblxyXG5NeV9MaWIuT2JqZWN0X0FuaW1hdGlvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KVxyXG57XHJcblx0dGhpcy5hbmltYXRpb24odGhpcy5vYmplY3QsIGR0KTtcclxufVxyXG5cclxuTXlfTGliLmNyZWF0ZV90ZXh0X2ltYWdlID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIHRleHQsIG5wb3QsIGJhY2tncm91bmQpIFxyXG57XHJcblx0Ly8gY3JlYXRlIGEgY2FudmFzIGVsZW1lbnRcclxuXHR2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcblx0Y2FudmFzLndpZHRoID0gd2lkdGg7XHJcblx0Y2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHR2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cdGlmIChiYWNrZ3JvdW5kKSBcclxuXHR7XHJcblx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGJhY2tncm91bmQ7XHJcblx0XHRjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblx0fVxyXG5cdGNvbnRleHQuZm9udCA9IFwiQm9sZCA0MHB4IEFyaWFsXCI7XHJcblx0Y29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMCwyNTUsMCwwLjk1KVwiO1xyXG4gICAgY29udGV4dC5maWxsVGV4dCgnSGVsbG8sIHdvcmxkIScsIDAsIDUwKTtcclxuICAgIFxyXG5cdC8vIGNhbnZhcyBjb250ZW50cyB3aWxsIGJlIHVzZWQgZm9yIGEgdGV4dHVyZVxyXG5cdHZhciB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoY2FudmFzKSBcclxuXHRpZiAobnBvdCkge1xyXG5cdFx0dGV4dHVyZS53cmFwUyA9IHRleHR1cmUud3JhcFQgPSBUSFJFRS5UZXh0dXJlV3JhcHBpbmcuQ2xhbXBUb0VkZ2VXcmFwcGluZztcclxuXHRcdHRleHR1cmUubWluRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xyXG5cdH1cclxuXHR0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTsgXHRcclxuXHRyZXR1cm4gdGV4dHVyZTtcclxufVxyXG5cclxuXHJcbk15X0xpYi5DcmVhdGVfUXVhZCA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCB2ZXJ0ZXhfc2hhZGVyLCBmcmFnbWVudF9zaGFkZXIpXHJcbntcclxuXHQvL3BsYW5lIGNyZWF0ZWQgdHVybiBhd2F5IGZyb20gY2FtZXJhXHJcblx0dmFyIHBsYW5lID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoIHdpZHRoLCBoZWlnaHQpO1xyXG5cdFxyXG5cdHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCgge1xyXG5cdFx0dmVydGV4U2hhZGVyOiB2ZXJ0ZXhfc2hhZGVyLFxyXG5cdFx0ZnJhZ21lbnRTaGFkZXI6IGZyYWdtZW50X3NoYWRlclxyXG5cdH0gKTsgXHJcblxyXG5cdHZhciBxdWFkID0gbmV3IFRIUkVFLk1lc2goIHBsYW5lLCBtYXRlcmlhbCApO1xyXG5cdHF1YWQucm90YXRpb24ueSA9IE1hdGguUEk7XHJcblx0cmV0dXJuIHF1YWQ7XHJcbn1cclxuXHJcblxyXG5NeV9MaWIuUmVuZGVyX1RhcmdldCA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KVxyXG57XHJcblx0dGhpcy50YXJnZXQgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXQoIFxyXG5cdHdpZHRoLCBcclxuXHRoZWlnaHQsIFxyXG5cdHsgXHJcblx0XHRtaW5GaWx0ZXI6IFRIUkVFLkxpbmVhckZpbHRlciwgXHJcblx0XHRtYWdGaWx0ZXI6IFRIUkVFLk5lYXJlc3RGaWx0ZXIsIFxyXG5cdFx0Zm9ybWF0OiBUSFJFRS5SR0JGb3JtYXQgXHJcblx0fSApOyBcclxuXHRcclxuXHR0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg4MCwgd2lkdGgvaGVpZ2h0LCAwLjEsIDEwMDApO1xyXG59XHJcblxyXG5NeV9MaWIuUmVuZGVyX1RhcmdldC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHNjZW5lLCByZW5kZXJlcilcclxue1xyXG5cdHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIFxyXG5cdFx0dGhpcy5jYW1lcmEsIFxyXG5cdFx0dGhpcy50YXJnZXQsIFxyXG5cdFx0dHJ1ZSAgLy9mb3JjZUNsZWFyXHJcblx0XHQpO1xyXG59XHJcblxyXG5cclxuTXlfTGliLmNyZWF0ZV9vdmVybGF5X2NhbWVyYSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KVxyXG57XHJcblx0dmFyIGNhbWVyYSA9ICBuZXcgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhKCBcclxuXHRcdHdpZHRoIC8gLSAyLCBcclxuXHRcdHdpZHRoIC8gMiwgXHJcblx0XHRoZWlnaHQgLyAyLCBcclxuXHRcdGhlaWdodCAvLSAyLCAtMTAwMDAsIDEwMDAwICk7XHJcblx0cmV0dXJuIGNhbWVyYTtcclxufVxyXG5cclxuTXlfTGliLk92ZXJsYXkgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodClcclxue1xyXG5cdHRoaXMuY2FtZXJhID0gTXlfTGliLmNyZWF0ZV9vdmVybGF5X2NhbWVyYSh3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5cclxuTXlfTGliLk92ZXJsYXkucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJlcilcclxue1xyXG5cdGlmICghdGhpcy5zY2VuZSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRcclxuXHRyZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcclxuXHRyZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xyXG5cdHJlbmRlcmVyLmF1dG9DbGVhciA9IHRydWU7XHJcbn1cclxuXHJcblxyXG5NeV9MaWIuTW91c2VfQ29udHJvbGxlciA9IGZ1bmN0aW9uIChyb290LCBvdmVyLCBjbGljaywgY2FsbGJhY2spXHJcbntcclxuXHR0aGlzLnJvb3QgPSByb290O1xyXG5cdHRoaXMub3ZlciA9IG92ZXI7XHJcblx0dGhpcy5jbGljayA9ICEhY2xpY2s7XHJcblx0dGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG59XHJcblxyXG5cclxuXHJcbi8qXHJcbnVnbHkgaGFja1xyXG4qL1xyXG5cclxuTXlfTGliLmV2ZW50X2h1YiA9IG5ldyBFdmVudF9IdWIoKTtcclxuXHJcbmZ1bmN0aW9uIEV2ZW50X0h1YigpIHtcclxuICAgIHRoaXMuZXZlbnRzID0ge307XHJcbn1cclxuXHJcblxyXG5cclxuRXZlbnRfSHViLnByb3RvdHlwZS5hZGRfZXZlbnRfbGlzdGVuZXIgPSBmdW5jdGlvbiAobmFtZSwgZnVuYywgb2JqKVxyXG57XHJcbiAgICBpZiAoIXRoaXMuZXZlbnRzW25hbWVdKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHNbbmFtZV0gPSBbXTtcclxuICAgIH1cclxuICAgIHRoaXMuZXZlbnRzW25hbWVdLnB1c2goIHtuYW1lOiBuYW1lLCBmdW5jOiBmdW5jLCBvYmo6IG9ian0gKTtcclxufVxyXG5cclxuRXZlbnRfSHViLnByb3RvdHlwZS5vbiAgPSBFdmVudF9IdWIucHJvdG90eXBlLmFkZF9ldmVudF9saXN0ZW5lcjtcclxuXHJcbkV2ZW50X0h1Yi5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKG5hbWUsIG9iailcclxue1xyXG4gICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZXZlbnRzW25hbWVdO1xyXG4gICAgaWYgKGxpc3RlbmVycykge1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHQgPSBsaXN0ZW5lcnNbaV07XHJcbiAgICAgICAgICAgIHQuZnVuYy5jYWxsKHQub2JqLCBvYmopOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbnZhciBydW5fZnVuY3Rpb24gPSAvL3dpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XHJcblx0ZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdFx0d2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcblx0fVxyXG5cclxuXHJcbk15X0xpYi5jcmVhdGVfcnVuX2Z1bmN0aW9uID0gZnVuY3Rpb24gKGFwcCkgXHJcbntcclxuICAgIE15X0xpYi5ydW4gPSBmdW5jdGlvbiAoKSB7IHJ1bl9mdW5jdGlvbiggZnVuY3Rpb24gKCkgeyBhcHAubG9vcCgpOyB9KTsgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5NeV9MaWIuRXVsZXJfQ29udHJvbGxlciA9IGZ1bmN0aW9uIChvYmosIHgsIHksIHopXHJcbntcclxuXHR0aGlzLm9iaiA9IG9iajtcclxuXHR0aGlzLnhzcGVlZCA9IHggKiBNYXRoLlBJIC8gMTgwOztcclxuXHR0aGlzLnlzcGVlZCA9IHkgKiBNYXRoLlBJIC8gMTgwOztcclxuXHR0aGlzLnpzcGVlZCA9IHogKiBNYXRoLlBJIC8gMTgwOztcclxufVxyXG5cclxuTXlfTGliLkV1bGVyX0NvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdClcclxue1xyXG5cdHRoaXMub2JqLnJvdGF0aW9uLnggKz0gdGhpcy54c3BlZWQgKiBkdDtcclxuXHR0aGlzLm9iai5yb3RhdGlvbi55ICs9IHRoaXMueXNwZWVkICogZHQ7XHJcblx0dGhpcy5vYmoucm90YXRpb24ueiArPSB0aGlzLnpzcGVlZCAqIGR0O1xyXG59XHJcblxyXG4vL0NsYXNzIExpYnJhcnlcclxuTXlfTGliLlJlZ2lzdGVyZWRfQ2xhc3NlcyA9IHt9O1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMpXHJcbntcclxuXHRpZiAoTXlfTGliLlJlZ2lzdGVyZWRfQ2xhc3Nlc1tuYW1lXSl7XHJcblx0XHRjb25zb2xlLmxvZyhcIlJlZ2lzdGVyIENsYXNzIEVSUk9SISBDbGFzcyB3aXRoIHRoaXMgbmFtZSBhbHJlYWR5IGV4aXN0cyFcIiwgbmFtZSk7XHJcblx0fVxyXG5cdE15X0xpYi5SZWdpc3RlcmVkX0NsYXNzZXNbbmFtZV0gPSBmdW5jO1xyXG59XHJcblxyXG5NeV9MaWIuR2V0X0NsYXNzID0gZnVuY3Rpb24gKG5hbWUpXHJcbntcclxuXHRyZXR1cm4gTXlfTGliLlJlZ2lzdGVyZWRfQ2xhc3Nlc1tuYW1lXTtcclxufVxyXG5cclxuXHJcbk15X0xpYi5jcmVhdGVfY2xhc3MgPSBmdW5jdGlvbihwYXJlbnQsIGNoaWxkLCBwcm9wcywgbmFtZSlcclxue1xyXG4gICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgIGNoaWxkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50LnByb3RvdHlwZSk7XHJcbiAgICB9IFxyXG4gICAgXy5jb3B5X29iamVjdChjaGlsZC5wcm90b3R5cGUsIHByb3BzKTtcclxuICAgIGNoaWxkLnByb3RvdHlwZS5jb250cnVjdG9yID0gY2hpbGQ7ICAgICAgICAgICAgICAgIFxyXG4gICAgTXlfTGliLlJlZ2lzdGVyX0NsYXNzKGNoaWxkLCBuYW1lKTtcclxufVxyXG5cclxuTXlfTGliLkFic3RyYWN0X0ZhYnJpYyA9IGZ1bmN0aW9uIChkYXRhKVxyXG57XHJcbiAgICB2YXIgY29uc3RydWN0b3IgPSBNeV9MaWIuR2V0X0NsYXNzKGRhdGEudHlwZSk7XHJcbiAgICBpZiAoY29uc3RydWN0b3IpIHtcclxuICAgICAgICB2YXIgb2JqZWN0ID0gbmV3IGNvbnN0cnVjdG9yKCk7XHJcbiAgICAgICAgb2JqZWN0LnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5NeV9MaWIuUHJpbnRfQ2xhc3NlcyA9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIGZvcih2YXIga2V5IGluIHRoaXMuUmVnaXN0ZXJlZF9DbGFzc2VzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGFzcyByZWdpc3RlcmVkIDpcIiwga2V5LCB0aGlzLlJlZ2lzdGVyZWRfQ2xhc3Nlc1trZXldKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IE15X0xpYiB9O1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Jhc2UvbXlfbGliLmpzIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuXHJcbi8vYmFzZSBjbGFzcyBmb3IgcGFydGljbGUgYWZmZWN0b3JcclxuZnVuY3Rpb24gUGFydGljbGVfQWZmZWN0b3IoKVxyXG57XHJcbiAgICB0aGlzLmlkID0gXy5nZW5lcmF0ZVVVSUQoKTtcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX0FmZmVjdG9yLnByb3RvdHlwZS5hZmZlY3QgPSBmdW5jdGlvbiAoZHQsIHBkYXRhLCB2ZXJ0LCBjb2xvcilcclxue1xyXG5cdHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKGNoaWxkKVxyXG57XHJcblx0aWYgKGNoaWxkKSB7XHJcblx0XHRyZXR1cm4ge307XHJcblx0fVxyXG5cdHZhciBkYXRhID0ge1xyXG4gICAgICAgIGlkOiB0aGlzLmlkLFxyXG5cdFx0XCJuYW1lXCI6IFwiUGFydGljbGVfQWZmZWN0b3JcIixcclxuXHRcdHBhcmFtcyA6IHt9XHJcblx0fTtcclxuICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICB9XHJcblx0cmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcblBhcnRpY2xlX0FmZmVjdG9yLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChqc29uKVxyXG57XHJcbn1cclxuXHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIlBhcnRpY2xlX0FmZmVjdG9yXCIsIFBhcnRpY2xlX0FmZmVjdG9yKTtcclxuXHJcbmZ1bmN0aW9uIEZvcmNlX0FmZmVjdG9yKClcclxue1xyXG4gICAgUGFydGljbGVfQWZmZWN0b3IuY2FsbCh0aGlzKTtcclxuXHR0aGlzLmZvcmNlcyA9IG5ldyBBcnJheSgpO1xyXG59XHJcblxyXG5Gb3JjZV9BZmZlY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcnRpY2xlX0FmZmVjdG9yLnByb3RvdHlwZSk7XHJcblxyXG5fLmNvcHlfb2JqZWN0KEZvcmNlX0FmZmVjdG9yLnByb3RvdHlwZSwge1xyXG5cdGNvbnN0cnVjdG9yOiBGb3JjZV9BZmZlY3RvcixcclxuXHRhZGRfZm9yY2U6IGZ1bmN0aW9uIChmb3JjZSlcclxuXHR7XHJcblx0XHR0aGlzLmZvcmNlcy5wdXNoKGZvcmNlKTtcclxuXHR9LFxyXG5cdGFwcGx5X2ZvcmNlczogZnVuY3Rpb24gKGR0LCBwYXJ0aWNsZSwgdmVydCwgY29sb3IpXHJcblx0e1xyXG5cdFx0dmFyIGFjY2VsZXJhdGlvbiA9IHt4OjAsIHk6MCwgejowfTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmZvcmNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLmZvcmNlc1tpXS5jYWxjKGR0LCBwYXJ0aWNsZSwgYWNjZWxlcmF0aW9uKTtcclxuXHRcdH1cclxuXHRcdC8vaW50ZWdyYXRlXHJcblx0XHRwYXJ0aWNsZS52ZWxvY2l0eS54ICs9IGFjY2VsZXJhdGlvbi54ICogZHQ7XHJcblx0XHRwYXJ0aWNsZS52ZWxvY2l0eS55ICs9IGFjY2VsZXJhdGlvbi55ICogZHQ7XHJcblx0XHRwYXJ0aWNsZS52ZWxvY2l0eS56ICs9IGFjY2VsZXJhdGlvbi56ICogZHQ7XHJcblx0fSxcclxuXHRhZmZlY3Q6IGZ1bmN0aW9uIChkdCwgcGFydGljbGUsIHZlcnQsIGNvbG9yKVxyXG5cdHtcclxuXHRcdHRoaXMuYXBwbHlfZm9yY2VzKGR0LCBwYXJ0aWNsZSwgdmVydCwgY29sb3IpO1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSxcclxuXHR0b0pTT046IGZ1bmN0aW9uIChjaGlsZClcclxuXHR7XHJcblx0XHR2YXIgZGF0YSA9IHt9O1xyXG5cdFx0ZGF0YS5uYW1lID0gXCJGb3JjZV9BZmZlY3RvclwiO1x0XHRcclxuICAgICAgICBkYXRhLnV1aWQgPSB0aGlzLnV1aWQ7XHJcblx0XHRkYXRhLnBhcmFtcyA9IFBhcnRpY2xlX0FmZmVjdG9yLnByb3RvdHlwZS50b0pTT04uY2FsbCh0aGlzLCB0aGlzKTtcclxuXHRcdGlmICh0aGlzLmZvcmNlcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGRhdGEucGFyYW1zLmZvcmNlcyA9IG5ldyBBcnJheSgpO1xyXG5cdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5mb3JjZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRkYXRhLnBhcmFtcy5mb3JjZXMucHVzaCggdGhpcy5mb3JjZXNbaV0udG9KU09OKCkgKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fSxcclxuXHRwYXJzZTogZnVuY3Rpb24gKGpzb24pXHJcblx0e1xyXG5cdFx0dmFyIGYsIGl0ZW07XHJcblx0XHRpZiAoanNvbi5mb3JjZXMpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0Zm9yKHZhciBpID0wOyBpIDwganNvbi5mb3JjZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpdGVtID0ganNvbi5mb3JjZXNbaV07XHJcblx0XHRcdFx0ZiA9IE15X0xpYi5HZXRfQ2xhc3MoaXRlbS5uYW1lKTtcclxuXHRcdFx0XHRpZiAoZikge1xyXG5cdFx0XHRcdFx0ZiA9IG5ldyBmKCk7XHJcblx0XHRcdFx0XHRmLnBhcnNlKGl0ZW0pO1xyXG5cdFx0XHRcdFx0dGhpcy5hZGRfZm9yY2UoZik7XHJcblx0XHRcdFx0fSBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJGb3JjZV9BZmZlY3RvclwiLCBGb3JjZV9BZmZlY3Rvcik7XHJcblxyXG5leHBvcnQgeyBQYXJ0aWNsZV9BZmZlY3RvciwgRm9yY2VfQWZmZWN0b3IgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlX2FmZmVjdG9yLmpzIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuXHJcbi8vQmFzZSBjbGFzcyBmb3IgUGFydGljbGUgRW1pdHRlcnNcclxuZnVuY3Rpb24gUGFydGljbGVfRW1pdHRlcihlbWl0X3Blcl9zZWNvbmQpXHJcbntcclxuICAgIHRoaXMudXVpZCA9IF8uZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICB0aGlzLm5hbWUgPSAnJztcclxuXHR0aGlzLmVtaXRfZGVsdGEgPSAwO1xyXG5cdHRoaXMuZW1pdF9jb3VudCA9IDA7XHJcblx0dGhpcy5lbWl0X3Blcl9zZWNvbmQgPSBlbWl0X3Blcl9zZWNvbmQgfHwgNTtcclxuXHQvL2xpbmVhciBpbnRlcnBvbGF0aW9uID0gbWluICsgcmFuZG9tICogKG1heC1taW4pXHRcclxuXHR0aGlzLmxpZmV0aW1lID0ge1wibWluXCI6IDAsIFwibWF4XCI6Mi4wfTtcclxufVxyXG5cclxuUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUuZW1pdF9saWZlID0gZnVuY3Rpb24gKClcclxue1xyXG5cdHJldHVybiB0aGlzLmxpZmV0aW1lLm1pbiArIE1hdGgucmFuZG9tKCkgKiAodGhpcy5saWZldGltZS5tYXggLSB0aGlzLmxpZmV0aW1lLm1pbik7XHJcbn1cclxuXHJcblBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLmNhbGNfZW1pdHRlZF9wYXJ0aWNsZXMgPSBmdW5jdGlvbiAoZHQpXHJcbntcclxuXHQvL2NvdW50IHBhcnRpY2xlcyBuZWVkIGVtaXRcclxuXHR0aGlzLmVtaXRfZGVsdGEgKz0gdGhpcy5lbWl0X3Blcl9zZWNvbmQqZHQ7XHJcblx0dmFyIG5lZWRfZW1pdCA9IE1hdGguZmxvb3IodGhpcy5lbWl0X2RlbHRhKTtcclxuXHRpZiAobmVlZF9lbWl0ID4gMCkge1xyXG5cdFx0dGhpcy5lbWl0X2RlbHRhIC09IG5lZWRfZW1pdDtcclxuXHRcdC8vdGhpcy5lbWl0X2NvdW50ICs9IG5lZWRfZW1pdDtcclxuXHRcdC8vbmVlZF9lbWl0ID0gdGhpcy5lbWl0X2NvdW50O1xyXG5cdH1cclxuXHRyZXR1cm4gbmVlZF9lbWl0O1xyXG59XHJcblxyXG5cclxuUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChwLCBjLCBtYXRyaXgpXHJcbntcclxuICAgIHAucG9zaXRpb24uc2V0KDAsIDAsIDApO1xyXG4gICAgcC52ZWxvY2l0eS5zZXQoMCwgMSwgMCk7XHJcbiAgICBcclxuICAgIGlmIChtYXRyaXgpIHtcclxuICAgICAgICBwLnBvc2l0aW9uLmFwcGx5TWF0cml4NChtYXRyaXgpO1xyXG4gICAgICAgIHAudmVsb2NpdHkuYXBwbHlNYXRyaXg0X3JvdGF0aW9uKG1hdHJpeCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoY2hpbGQpXHJcbntcclxuXHR2YXIgcGFyYW1zID0ge1xyXG4gICAgICAgIFwidXVpZFwiOiB0aGlzLnV1aWQsXHJcblx0XHRcImVtaXRfcGVyX3NlY29uZFwiOiB0aGlzLmVtaXRfcGVyX3NlY29uZCxcclxuXHRcdFwibGlmZXRpbWVcIjoge1xyXG5cdFx0XHRcIm1pblwiOiB0aGlzLmxpZmV0aW1lLm1pbixcclxuXHRcdFx0XCJtYXhcIjogdGhpcy5saWZldGltZS5tYXhcclxuXHRcdH0sXHJcblx0fTtcclxuICAgIGlmICh0aGlzLm5hbWUpIHtcclxuICAgICAgICBwYXJhbXMubmFtZSA9IHRoaXMubmFtZTtcclxuICAgIH1cclxuXHRpZiAoY2hpbGQpIHtcclxuXHRcdHJldHVybiBwYXJhbXM7XHJcblx0fVxyXG5cdHZhciBkYXRhID0ge307XHJcblx0ZGF0YS5uYW1lID0gXCJQYXJ0aWNsZV9FbWl0dGVyXCI7XHJcblx0ZGF0YS5wYXJhbXMgPSBwYXJhbXM7XHRcclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG5cclxuUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAoZGF0YSlcclxue1xyXG5cdHRoaXMuZW1pdF9wZXJfc2Vjb25kID0gZGF0YS5lbWl0X3Blcl9zZWNvbmQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLnV1aWQgPSBkYXRhLnV1aWQgfHwgXy5nZW5lcmF0ZVVVSUQoKTtcclxuXHRfLmNvcHlfb2JqZWN0KHRoaXMubGlmZXRpbWUsIGRhdGEubGlmZXRpbWUpO1xyXG59XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJQYXJ0aWNsZV9FbWl0dGVyXCIsIFBhcnRpY2xlX0VtaXR0ZXIpO1xyXG5cclxuZXhwb3J0IHsgUGFydGljbGVfRW1pdHRlciB9O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlX2VtaXR0ZXIuanMiLCIvL1VuZm9ydHVuYXRlbHksIGNhbnZhcyBwcm9wZXJ0aWVzIGNhbiBjaGFuZ2UgcGVybWFuZW50eS4gXHJcbi8vQmVjYXVzZSwgeW91IG5lZWQgZG8gcmVmcmVzaF9jYW52YXMgb24gZWFjaCBjYWxsIVxyXG4vL2VhY2ggdGltZSB5b3UgbmVlZCByZWNhY2wgQm91bmRpbmdSZWN0IGFuZCBjbGllbnRSZWN0IG9mIHRoZSBmdWNraW5nIGNhbnZhc1xyXG4vL2Fsc28sIGNhbWVyYSBtYXkgYmUgbm90IHRoYXQgY2FtZXJhLCB3aG8gcmVuZGVyIHNjZW5lLiBpdCBtYXkgYmUgb3RoZXIgY2FtZXJhXHJcbi8vYmVjYXVzZSB5b3UgbmVlZCByZWZyZXNoIGNhbWVyYSBvbiBlYXNoIGNhbGxcclxuLy9pIGNvdWxkIGRvbmUgdGhpcyBub3JtYWwgZnVuY3Rpb24sIGJ1dCB0aGlzIG9iamVjdCBtYXkgZG8gZGlmZmVyZW50IGpvYlxyXG4vL3RoaXMgaXMgc2luZ2xlLXRpbWUgb2JqZWN0XHJcbi8vaXQgZWFzeSBlY29ub215ZnkgbnVtYmVyIG9mIGFyZ3VtZW50cyBvbiBjYWxsaW5nIGZ1bmN0aW9uc1xyXG5cclxuLy9ub3QsIHRoaXMgY2xhc3MgZG9lc24ndCBzdG9yZSByZWZlcmVuY2UgdG8gY2FudmFzLCBcclxuLy90aGlzIHN0b3JlIG9ubHkgaW5mb3JtYXRpb24gYWJvdXQgY2FudmFzIHNpemUgYW5kIHBvc2l0aW9uIFxyXG4vL2kuZS4gQm91bmRpbmdDbGllbnRSZWN0IGFuZCBjbGllbnRXaWR0aCxjbGllbnRIZWlnaHRcclxuLy95ZXMsIHRoaXMgY2xhc3Mgc3RvcmUgcmVmZXJlbmNlIHRvIGNhbWVyYVxyXG5cclxuLy9wcm9iYWJseSwgaXQgbWF5IGJlIG1peGluIHRvIGNhbWVyYVxyXG5mdW5jdGlvbiBNb3VzZV9DYW1lcmFfQ29udHJvbGxlcihjYW52YXMsIGNhbWVyYSlcclxue1xyXG4gICAgaWYgKGNhbnZhcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk1vdXNlX0NhbWVyYV9Db250cm9sbGVyLiBQcm9wYWJsZSBwcmVtb3JkaWFsIGNyZWF0aW5nIG9iamVjdC4gY2FudmFzIGlzIHVuZGVmaW5lZC4gRG8gbm90aGluZ1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZXRfY2FudmFzX2luZm8oY2FudmFzKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xyXG59XHJcblxyXG5fLmNvcHlfb2JqZWN0KE1vdXNlX0NhbWVyYV9Db250cm9sbGVyLnByb3RvdHlwZSx7XHJcbiAgICBjb25zdHJ1Y3RvciA6IE1vdXNlX0NhbWVyYV9Db250cm9sbGVyLFxyXG4gICAgc2V0X2NhbnZhc19pbmZvOiBmdW5jdGlvbiAoY2FudmFzKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBvZmZzZXQgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxlZnQ6IG9mZnNldC5sZWZ0LFxyXG4gICAgICAgICAgICB0b3AgOiBvZmZzZXQudG9wXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcclxuICAgIH0sXHJcbiAgICByZWZyZXNoX2NhbnZhczogZnVuY3Rpb24gKG5ld19jYW52YXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXRfY2FudmFzX2luZm8obmV3X2NhbnZhcyk7XHJcbiAgICB9XHJcbiAgICAsXHJcbiAgICBnZXRfbm9ybWFsaXplZF9zY3JlZW5fY29vcmRpbmF0ZXM6IGZ1bmN0aW9uICh4LHkpXHJcbiAgICB7XHJcbiAgICAgICAgLy9zdGVwIDEgOiBub3JtYWxpemVkXHJcbiAgICAgICAgeCA9ICh4IC0gdGhpcy5vZmZzZXQubGVmdCkgLyB0aGlzLndpZHRoO1xyXG4gICAgICAgIHkgPSAoeSAtIHRoaXMub2Zmc2V0LnRvcCkgLyB0aGlzLmhlaWdodDtcclxuICAgICAgICAvL3N0ZXAgMiA6IGZyb20gdW5zaWduZWQgdG8gc2lnbmVkLCB0cmFuc2xhdGUgb3JpZ2luIGZyb20gdG9wIGxlZnQgY29ybmVyIHRvIGNlbnRlciBcclxuICAgICAgICB2YXIgeCA9IHggKiAyLjAgLSAxLjA7XHJcbiAgICAgICAgdmFyIHkgPSAtKHkgKiAyLjAgLSAxLjApO1xyXG4gICAgICAgIHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMyggeCwgeSwgMSApO1xyXG4gICAgICAgIHJldHVybiB2ZWN0b3I7ICAgICAgICBcclxuICAgIH0sXHJcbiAgICBcclxuICAgIC8vZG8gc29tZSB3aGF0IHByZXZlbnQgbWV0aG9kLCBvbmx5IGdpdmUgbW91c2UgZXZlbnQgaW5zdGVhZCB4LHkgY29vcmRpYW50ZXNcclxuICAgIGdldF9ub3JtYWxpemVfbW91c2VfcG9zaXRpb246IGZ1bmN0aW9uIChldmVudCkgXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X25vcm1hbGl6ZWRfc2NyZWVuX2Nvb3JkaW5hdGVzKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgLy9yZXR1cm4gbmV3IHVucHJvamVjdCB2ZWN0b3IsIG5vdCBjaGFuZ2UgZ2l2ZW5cclxuICAgIC8vdXNlZCBUSFJFRS5WZWN0b3IzLnVucHJvamVjdCBtZXRob2RcclxuICAgIC8vaW5jbHVkaW5nIGFwcGx5IGludmVyIGNhbWVyYSBtYXRyaXhcclxuICAgIC8vb24gbXkgdmlldywgdGhhdCB3cm9uZywgYmVjYXVzZSBtZXRob2QgZG8gaXQgYmlnIHRoZW4gcHJvbWlzZVxyXG4gICAgLy91bnByb2plY3QgbXVzdCBkbyBvbmx5IHVucHJvamVjdCwgbm90IGVsc2UgdGhpbmdcclxuICAgIC8vYmVjYXVzZSBteSBuZWVkIG5ldyBtZXRob2QsIHdobyB3aWxsIGRvIG9ubHkgdW5wcm9qZWN0IFxyXG4gICAgdW5wcm9qZWN0OiBmdW5jdGlvbih2ZWN0b3IpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgICAgIHIuY29weSh2ZWN0b3IpO1xyXG4gICAgICAgIHIudW5wcm9qZWN0KHRoaXMuY2FtZXJhKTtcclxuICAgICAgICAvL3RoaXMgYXJlYWR5IGRvbmUgXHJcbiAgICAgICAgLy9yLmFwcGx5TWF0cml4NChjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlKTsgICAgXHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBcclxuICAgIC8vZ2V0IHJheSB3aXRoIG9yaWdpbiBpbiBjYW1lcmEgcG9zaXRpb24gYW5kIGRpcmVjdGlvbiwgXHJcbiAgICAvL3BvaW50ZWQgdG8gZmFyIGF3YXkgd2hlcmUgdW5wcm9qZWN0IHNjcmVlbiBwb2ludCBhcmVcclxuICAgIGdldF9yYXlfZnJvbV9jYW1lcmFfaW5fc2NyZWVuX2Nvb3JkaW5hdGVzOiBmdW5jdGlvbiAoeCx5KSBcclxuICAgIHtcclxuICAgICAgICB2YXIgdmVjdG9yID0gdGhpcy5nZXRfbm9ybWFsaXplZF9zY3JlZW5fY29vcmRpbmF0ZXMoeCx5KTtcclxuICAgICAgICB2ZWN0b3IgPSB0aGlzLnVucHJvamVjdCh2ZWN0b3IpO1xyXG4gICAgICAgIHZhciByYXkgPSBuZXcgVEhSRUUuUmF5KCB0aGlzLmNhbWVyYS5wb3NpdGlvbiwgdmVjdG9yLnN1YiggdGhpcy5jYW1lcmEucG9zaXRpb24gKS5ub3JtYWxpemUoKSApO1xyXG4gICAgICAgIHJldHVybiByYXk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvL2RvIHNhbWUgd2hhdCBwcmV2ZW50IG1ldGhvZCwgb25seSBnaXZlIG1vdXNlIGV2ZW50IGZvciBjb252aWVuY2VcclxuICAgIC8vc2VlIGl0IGFzIG92ZXJyaWRpbmcgZnVuY3Rpb24gaW4gQysrXHJcbiAgICBnZXRfcmF5X2Zyb21fY2FtZXJhX2luX21vdXNlX3Bvc2l0aW9uOiBmdW5jdGlvbiAoZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3JheV9mcm9tX2NhbWVyYV9pbl9zY3JlZW5fY29vcmRpbmF0ZXMoZXZlbnQueCwgZXZlbnQueSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbn0pO1xyXG5cclxuXHJcbmV4cG9ydCB7TW91c2VfQ2FtZXJhX0NvbnRyb2xsZXJ9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXNlL21vdXNlX2NhbWVyYV9jb250cm9sbGVyLmpzIiwiICAgIFxyXG5mdW5jdGlvbiBQYXJ0aWNsZXNfUG9pbnRzIChnZW9tZXRyeSwgbWF0ZXJpYWwpXHJcbntcclxuICAgIFRIUkVFLlBvaW50cy5jYWxsKHRoaXMsIGdlb21ldHJ5LCBtYXRlcmlhbCk7XHJcbiAgICB0aGlzLnR5cGUgPSAncGFydGljbGVzX3BvaW50cyc7XHJcbiAgICBcclxuICAgIHRoaXMuYm91bmRpbmdTcGhlcmUgPSBuZXcgVEhSRUUuU3BoZXJlKCk7XHJcbiAgICB0aGlzLmJvdW5kaW5nU3BoZXJlLnJhZGl1cyA9IDEwLjA7XHJcbn1cclxuXHJcblBhcnRpY2xlc19Qb2ludHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVEhSRUUuUG9pbnRzLnByb3RvdHlwZSApXHJcblxyXG5QYXJ0aWNsZXNfUG9pbnRzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFBhcnRpY2xlc19Qb2ludHM7XHJcblxyXG5QYXJ0aWNsZXNfUG9pbnRzLnByb3RvdHlwZS5nZXRCb3VuZGluZ1NwaGVyZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuYm91bmRpbmdTcGhlcmU7XHJcbn1cclxuXHJcblBhcnRpY2xlc19Qb2ludHMucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIChtZXRhKVxyXG57XHJcbiAgICB2YXIgbWF0ID0gdGhpcy5tYXRlcmlhbDtcclxuICAgIHZhciBnZW9tID0gdGhpcy5nZW9tZXRyeTtcclxuICAgIHRoaXMubWF0ZXJpYWwgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmdlb21ldHJ5ID0gdW5kZWZpbmVkO1xyXG4gICAgdmFyIG9iamVjdCA9ICBUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgbWV0YSk7XHJcbiAgICB0aGlzLm1hdGVyaWFsID0gbWF0O1xyXG4gICAgdGhpcy5nZW9tZXRyeSA9IGdlb207XHJcbiAgICByZXR1cm4gb2JqZWN0O1xyXG59XHJcblxyXG4vL1dURj9cclxuUGFydGljbGVzX1BvaW50cy5wcm90b3R5cGUucmF5Y2FzdCA9IGZ1bmN0aW9uIChyYXljYXN0ZXIsIGludGVyc2VjdHMpXHJcbntcclxuICAgIHZhciBzcGhlcmUgPSBuZXcgVEhSRUUuU3BoZXJlKClcclxuICAgIHNwaGVyZS5jb3B5KCB0aGlzLmJvdW5kaW5nU3BoZXJlICk7XHJcbiAgICBzcGhlcmUuYXBwbHlNYXRyaXg0KCB0aGlzLm1hdHJpeFdvcmxkICk7IFxyXG4gICAgdmFyIHIgPSByYXljYXN0ZXIucmF5LmludGVyc2VjdHNTcGhlcmUoIHNwaGVyZSApO1xyXG4gICAgaWYgKCByID09PSBmYWxzZSApIHJldHVybjtcclxuICAgIGNvbnNvbGUubG9nKFwiSU5URVJTRUNUSU9OMVwiLCB0aGlzLm5hbWUsIHNwaGVyZSk7XHJcbiAgICByZXR1cm47XHJcbiAgICBcclxuICAgIHZhciBzaGl0ICA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbiAgICBzaGl0LmNvcHkodGhpcy5wb3NpdGlvbik7XHJcbiAgICB2YXIgdHIgPSBuZXcgVEhSRUUuUmF5KCBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAyMCksIHNoaXQpO1xyXG4gICAgY29uc29sZS5sb2coXCJ0ZXN0IFwiLCB0ci5pbnRlcnNlY3RzU3BoZXJlKHNwaGVyZSksIHNwaGVyZSk7XHJcbiAgICBjb25zb2xlLmxvZyhcImhpdCBzcGhlcmUgXCIgICsgdGhpcy5uYW1lLCBzcGhlcmUsIHJheWNhc3Rlci5yYXkpO1xyXG4gICAgcmV0dXJuIHJheWNhc3Rlci5yYXkuaW50ZXJzZWN0c1NwaGVyZSggc3BoZXJlICk7XHJcbiAgICBcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coXCJoaXQgc3BoZXJlIFwiICsgdGhpcy50eXBlLCBcInNocGVyZSBpcyBcIiwgc3BoZXJlLCBcInJheSBpcyBcIiwgcik7XHJcbiAgICBpZiAocikge1xyXG4gICAgICAgICAgICB2YXIgdG1wID0gbmV3IFRIUkVFLlZlY3RvcjModGhpcy5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRtcC5zdWIocik7XHJcbiAgIFx0XHRcdGludGVyc2VjdHMucHVzaCgge1xyXG5cdFx0XHRcdGRpc3RhbmNlOiBNYXRoLnNxcnQoIHRtcC5kb3QodG1wKSApLFxyXG5cdFx0XHRcdHBvaW50OiB0aGlzLnBvc2l0aW9uLFxyXG5cdFx0XHRcdG9iamVjdDogdGhpc1xyXG5cdFx0XHR9ICk7IFxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZXNfUG9pbnRzfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZXNfcG9pbnRzLmpzIiwiZnVuY3Rpb24gRXZlbnRfSHViKCkge1xyXG4gICAgdGhpcy5ldmVudHMgPSB7fTtcclxufVxyXG5cclxuXHJcblxyXG5FdmVudF9IdWIucHJvdG90eXBlLmFkZF9ldmVudF9saXN0ZW5lciA9IGZ1bmN0aW9uIChuYW1lLCBmdW5jLCBvYmopXHJcbntcclxuICAgIGlmICghdGhpcy5ldmVudHNbbmFtZV0pIHtcclxuICAgICAgICB0aGlzLmV2ZW50c1tuYW1lXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ldmVudHNbbmFtZV0ucHVzaCgge25hbWU6IG5hbWUsIGZ1bmM6IGZ1bmMsIG9iajogb2JqfSApO1xyXG59XHJcblxyXG5FdmVudF9IdWIucHJvdG90eXBlLm9uICA9IEV2ZW50X0h1Yi5wcm90b3R5cGUuYWRkX2V2ZW50X2xpc3RlbmVyO1xyXG5cclxuRXZlbnRfSHViLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24obmFtZSwgb2JqKVxyXG57XHJcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNbbmFtZV07XHJcbiAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdCA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgdC5mdW5jLmNhbGwodC5vYmosIG9iaik7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG52YXIgbWFpbl9ldmVudF9odWIgPSBuZXcgRXZlbnRfSHViKCk7XHJcblxyXG5leHBvcnQge21haW5fZXZlbnRfaHViLCBFdmVudF9IdWJ9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXNlL2V2ZW50X2h1Yi5qcyIsInZhciBNb3VzZV9JbnRlcnNlY3RvciA9IHt9O1xyXG5cclxuaW1wb3J0IHtTaW1wbGVfQ29sbGlkZXJ9IGZyb20gXCIuL3NpbXBsZV9jb2xsaWRlci5qc1wiO1xyXG5pbXBvcnQge01vdXNlX0NhbWVyYV9Db250cm9sbGVyfSBmcm9tICcuL21vdXNlX2NhbWVyYV9jb250cm9sbGVyLmpzJztcclxuXHJcblxyXG5Nb3VzZV9JbnRlcnNlY3Rvci5nZXRfbm9ybWFsaXplZF9zY3JlZW5fY29vcmRzID0gZnVuY3Rpb24gKGNhbnZhcywgeCwgeSlcclxue1xyXG5cdHZhciBvZmZzZXQgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0dmFyIHdpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoO1xyXG5cdHZhciBoZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xyXG4gICAgLy9ub3JtYWxpemUgY29vcmRpbmF0ZXNcclxuICAgIHZhciB4ID0gKHggLSBvZmZzZXQubGVmdCkgLyB3aWR0aDtcclxuICAgIHZhciB5ID0gKHkgLSBvZmZzZXQudG9wKSAvIGhlaWdodDtcclxuXHR2YXIgeCA9IHggKiAyIC0gMTtcclxuXHR2YXIgeSA9IC0oeSAqIDIgLSAxKTtcclxuXHR2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoIHgsIHksIDEgKTtcclxuXHRyZXR1cm4gdmVjdG9yO1xyXG59XHJcblxyXG5Nb3VzZV9JbnRlcnNlY3Rvci5tb3VzZV9jb29yZHNfdG9fdmVjdG9yID0gZnVuY3Rpb24gKGNhbnZhcywgZXZlbnQpIFxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5nZXRfbm9ybWFsaXplZF9zY3JlZW5fY29vcmRzKGNhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbn1cclxuXHJcblxyXG5Nb3VzZV9JbnRlcnNlY3Rvci51bnByb2plY3QgPSBmdW5jdGlvbih2ZWN0b3IsIGNhbWVyYSlcclxue1xyXG4gICAgdmFyIHIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgci5jb3B5KHZlY3Rvcik7XHJcblx0ci51bnByb2plY3QoY2FtZXJhKTtcclxuICAgIC8vdGhpcyBkb25lIHlldFxyXG4gICAgLy9yLmFwcGx5TWF0cml4NChjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlKTsgICAgXHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuTW91c2VfSW50ZXJzZWN0b3IubW91c2VfY29vcmRzX3RvX3JheSA9IGZ1bmN0aW9uIChjYW52YXMsIGV2ZW50LCBjYW1lcmEpIFxyXG57XHJcbiAgICB2YXIgdmVjdG9yID0gdGhpcy5tb3VzZV9jb29yZHNfdG9fdmVjdG9yKGNhbnZhcywgZXZlbnQpO1xyXG4gICAgdmVjdG9yID0gdGhpcy51bnByb2plY3QodmVjdG9yLCBjYW1lcmEpO1xyXG5cdHZhciByYXkgPSBuZXcgVEhSRUUuUmF5KCBjYW1lcmEucG9zaXRpb24sIHZlY3Rvci5zdWIoIGNhbWVyYS5wb3NpdGlvbiApLm5vcm1hbGl6ZSgpICk7XHJcblx0cmV0dXJuIHJheTtcclxufVxyXG5cclxuXHJcblxyXG5Nb3VzZV9JbnRlcnNlY3Rvci5maW5kX2ludGVyc2VjdGlvbl93aXRoX21vdXNlX3ZlY3RvciA9IGZ1bmN0aW9uKHZlY3RvciwgY2FtZXJhLCBzY2VuZSlcclxue1xyXG5cdHZlY3Rvci51bnByb2plY3QoY2FtZXJhKTtcclxuXHR2YXIgcmF5ID0gbmV3IFRIUkVFLlJheWNhc3RlciggY2FtZXJhLnBvc2l0aW9uLCB2ZWN0b3Iuc3ViKCBjYW1lcmEucG9zaXRpb24gKS5ub3JtYWxpemUoKSApO1xyXG5cdC8vIGNyZWF0ZSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvYmplY3RzIGluIHRoZSBzY2VuZSB3aXRoIHdoaWNoIHRoZSByYXkgaW50ZXJzZWN0c1xyXG5cdC8vdmFyIGludGVyc2VjdHMgPSByYXkuaW50ZXJzZWN0T2JqZWN0cyggW2dyaWRfdGV4dC5yb290XSwgdHJ1ZSApOyBcclxuXHQvL2NvbnNvbGUubG9nKGZha2VfcGxhbmUucm9vdC5jaGlsZHJlblswXS5nZW9tZXRyeSk7XHJcblx0dmFyIGludGVyc2VjdHMgPSByYXkuaW50ZXJzZWN0T2JqZWN0cyggW3NjZW5lXSwgdHJ1ZSApOyBcclxuXHRyZXR1cm4gaW50ZXJzZWN0cztcclxufVxyXG5cclxuXHJcbk1vdXNlX0ludGVyc2VjdG9yLmZpbmRfaW50ZXJzZWN0ZWRfb2JqZWN0ID0gZnVuY3Rpb24gKHNjZW5lLCByYXkpXHJcbntcclxuXHJcbiAgICB2YXIgY29sbGlkZXIgPSBuZXcgU2ltcGxlX0NvbGxpZGVyKHNjZW5lKTtcclxuICAgIHZhciBpbnRlcnNlY3RzID0gY29sbGlkZXIuY2hlY2tfcmF5KHJheSk7XHJcbiAgICByZXR1cm4gaW50ZXJzZWN0cztcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IE1vdXNlX0ludGVyc2VjdG9yIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Jhc2UvbW91c2VfaW50ZXJzZWN0b3IuanMiLCJmdW5jdGlvbiBTaW1wbGVfQ29sbGlkZXIocm9vdCwgcGFyYW1zKVxyXG57XHJcbiAgICB0aGlzLnJvb3QgPSByb290O1xyXG4gICAgaWYgKHBhcmFtcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcGFyYW1zID0ge307XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhcmFtcyA9IFxyXG4gICAge1xyXG4gICAgICAgIHJlY3Vyc2l2ZTogcGFyYW1zLnJlY3Vyc2l2ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHBhcmFtcy5yZWN1cnNpdmUsXHJcbiAgICAgICAgY2hlY2tfaW52aXNpYmxlOiBwYXJhbXMuY2hlY2tfaW52aXNpYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogcGFyYW1zLmNoZWNrX2ludmlzaWJsZSBcclxuICAgIH07XHJcbiAgICB0aGlzLmludGVyc2VjdGVkX29iamVjdHMgPSBbXTtcclxuICAgIHRoaXMuX3Rlc3RlZF9zcGhlcmUgPSBuZXcgVEhSRUUuU3BoZXJlKCk7ICAgIFxyXG59XHJcblxyXG5TaW1wbGVfQ29sbGlkZXIucHJvdG90eXBlLnByZXBhcmVfY2hlY2sgPSBmdW5jdGlvbiAocmF5KVxyXG57XHJcbiAgICB0aGlzLmludGVyc2VjdGVkX29iamVjdHMgPSBbXTtcclxuICAgIHRoaXMuaW50ZXJzZWN0ZWRfbWFwID0ge307XHJcbiAgICB0aGlzLl9mYWtlY2FzdGVyID0ge3JheTogcmF5fTsgICAgXHJcbn1cclxuXHJcblNpbXBsZV9Db2xsaWRlci5wcm90b3R5cGUuY2hlY2tfcmF5ID0gZnVuY3Rpb24gKHJheSlcclxue1xyXG4gICAgdGhpcy5wcmVwYXJlX2NoZWNrKHJheSk7XHJcbiAgICBcclxuICAgIHRoaXMuZmluZF9pbnRlcnNlY3Rpb25fd2l0aF9ib3VuZGluZ19zcGhlcmUoIHRoaXMucm9vdCk7IFxyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcy5pbnRlcnNlY3RlZF9vYmplY3RzO1xyXG59XHJcblxyXG5TaW1wbGVfQ29sbGlkZXIucHJvdG90eXBlLmFkZF9pbnRlcnNlY3RlZCA9IGZ1bmN0aW9uIChvYmopXHJcbntcclxuICAgIGlmICghdGhpcy5pbnRlcnNlY3RlZF9tYXBbb2JqLnV1aWRdKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlcnNlY3RlZF9tYXBbb2JqLnV1aWRdID0gb2JqO1xyXG4gICAgICAgIHRoaXMuaW50ZXJzZWN0ZWRfb2JqZWN0cy5wdXNoKG9iaik7XHJcbiAgICB9XHJcbn1cclxuXHJcblNpbXBsZV9Db2xsaWRlci5wcm90b3R5cGUuY2hlY2tfb2JqZWN0X2JvdW5kaW5nX3NwaGVyZSA9IGZ1bmN0aW9uKG9iailcclxue1xyXG4gICAgLy9nZXQgYm91bmRpbmcgc3BoZXJlXHJcbiAgICBpZiAob2JqLmdldEJvdW5kaW5nU3BoZXJlKSB7XHJcbiAgICAgICAgdGhpcy5fdGVzdGVkX3NwaGVyZS5jb3B5KCBvYmouZ2V0Qm91bmRpbmdTcGhlcmUoKSApO1xyXG4gICAgfSBlbHNlIGlmIChvYmouZ2VvbWV0cnkpICB7XHJcbiAgICAgICAgLy9mdWNrIHRoaXMgc2hpdCwgd2h5IGRvbid0IGV4aXN0cyBtZXRob2QgZ2V0Qm91bmRpbmdTcGhlcmUsIHdoaWNoIGVuY2Fwc3VsYXRlcyB0aGlzP1xyXG4gICAgICAgIGlmICggb2JqLmdlb21ldHJ5LmJvdW5kaW5nU3BoZXJlID09PSBudWxsICkgb2JqLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xyXG4gICAgICAgICAvL2NvcHkgc3BoZXJlIGZyb20gb2JqZWN0IGdlb21ldHJ5IGFuZCB0cmFuc2Zvcm0gaXQgd2l0aCBvYmplY3QuIG1hdHJpeFdvcmxkXHJcbiAgICAgICAgdGhpcy5fdGVzdGVkX3NwaGVyZS5jb3B5KCBvYmouZ2VvbWV0cnkuYm91bmRpbmdTcGhlcmUgKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0IGJvdW5kaW5nIHNwaGVyZVwiLCB0aGlzLl90ZXN0ZWRfc3BoZXJlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdGVzdCBib3VuZGluZyBzcGVyZVxyXG4gICAgb2JqLnVwZGF0ZU1hdHJpeFdvcmxkKHRydWUpOyAgICAgICAgXHJcbiAgICB0aGlzLl90ZXN0ZWRfc3BoZXJlLmFwcGx5TWF0cml4NCggb2JqLm1hdHJpeFdvcmxkICk7XHJcbiAgICAvL2ZpbmQgaW50ZXJzZWN0aW9uXHJcbiAgICB2YXIgaW50ZXIgPSB0aGlzLl9mYWtlY2FzdGVyLnJheS5pbnRlcnNlY3RzU3BoZXJlKCB0aGlzLl90ZXN0ZWRfc3BoZXJlICk7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiaW50ZXIgd2l0aCBzcGhlcmUsIGxldmVsXCIsIGxldmVsLCBpbnRlciwgc3BoZXJlLmNlbnRlciwgcmF5Y2FzdGVyLnJheSk7XHJcbiAgICAvL2FkZCB0byBpbnRlcnNlY3RlZCBsaXN0LCBpZiBzdWNjZXNzXHJcbiAgICBpZiAoaW50ZXIpIHtcclxuICAgICAgICB0aGlzLmludGVyc2VjdGVkX29iamVjdHMucHVzaChvYmopO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5TaW1wbGVfQ29sbGlkZXIucHJvdG90eXBlLmZpbmRfaW50ZXJzZWN0aW9uX3dpdGhfYm91bmRpbmdfc3BoZXJlID0gZnVuY3Rpb24ob2JqZWN0LCB0b3AgKSB7XHJcblxyXG4gICAgaWYgKCBvYmplY3QudmlzaWJsZSA9PT0gZmFsc2UgJiYgIXRoaXMucGFyYW1zLmNoZWNrX2ludmlzaWJsZSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuY2hlY2tfb2JqZWN0X2JvdW5kaW5nX3NwaGVyZShvYmplY3QpO1xyXG4gICAgaWYgKCAhdGhpcy5wYXJhbXMucmVjdXJzaXZlKSByZXR1cm47XHJcbiAgICBcclxuICAgIFxyXG4gICAgLy90ZXN0IGNoaWxkcmVuXHJcbiAgICB2YXIgY2hpbGRyZW4gPSBvYmplY3QuY2hpbGRyZW47XHJcbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkgKysgKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgdGhpcy5maW5kX2ludGVyc2VjdGlvbl93aXRoX2JvdW5kaW5nX3NwaGVyZSggY2hpbGQgKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQge1NpbXBsZV9Db2xsaWRlcn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Jhc2Uvc2ltcGxlX2NvbGxpZGVyLmpzIiwiXHJcbnZhciBDb2xvcl9QaWNrZXIgPSB7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgZGVmYXVsdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtyOiAwLCBnOiAwLCBiOjB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6ICc8ZGl2PlxcXHJcbiAgICA8cD5SZWQgR3JlZW4gQmx1ZSBDb2xvclxcXHJcbiAgICA8cD5cXFxyXG4gICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIyNTVcIiBAY2hhbmdlPVwiY2hhbmdlZFwiIDp2YWx1ZT1cInZhbHVlLnJcIiByZWY9XCJyXCIgaWQ9XCJyXCIgPlxcXHJcbiAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjI1NVwiIEBjaGFuZ2U9XCJjaGFuZ2VkXCIgOnZhbHVlPVwidmFsdWUuZ1wiIHJlZj1cImdcIiBpZD1cImdcIj5cXFxyXG4gICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIyNTVcIiBAY2hhbmdlPVwiY2hhbmdlZFwiIDp2YWx1ZT1cInZhbHVlLmJcIiByZWY9XCJiXCIgaWQ9XCJiXCI+XFxcclxuICAgIDwvZGl2PicsXHJcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmV3X3ZhbHVlIDoge1xyXG4gICAgICAgICAgICAgICAgcjogMCxcclxuICAgICAgICAgICAgICAgIGc6IDAsXHJcbiAgICAgICAgICAgICAgICBiOiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGNoYW5nZWQ6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlW2V2ZW50LnRhcmdldC5pZF0gPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgdGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8vVnVlLmNvbXBvbmVudChcImNvbG9yLXBpY2tlclwiLCBDb2xvcl9QaWNrZXIpO1xyXG5cclxuZXhwb3J0IHtDb2xvcl9QaWNrZXJ9O1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2d1aS9jb2xvcl9waWNrZXIuanMiLCJpbXBvcnQge1BhcnRpY2xlc19Qcm9wc30gZnJvbSAnLi9wYXJ0aWNsZXNfcHJvcHMuanMnO1xyXG5pbXBvcnQge1RleHR1cmVfUGFuZWx9IGZyb20gJy4vdGV4dHVyZV9wYW5lbC5qcyc7XHJcblxyXG52YXIgUGFydGljbGVzX1BhbmVsID0gXHJcbntcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgcGFydGljbGVzIDoge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGV4dHVyZXMgOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgZGVmYXVsdDogZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RlZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHRkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBcclxuICAgICAgIFxyXG4gICAgICAgcmV0dXJuICB7XHJcbiAgICAgICAgICAgICAgICBmaXJzdF90aW1lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcGFydGljbGVfcGFyYW1zOiB7fSxcclxuICAgICAgICAgICAgICAgIG15X3NlbGVjdGVkIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlX3BhbmVsX2lzX3Zpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6XHJcbiAgICB7XHJcbiAgICAgICAgYWRkX3RvX3NlbGVjdDogZnVuY3Rpb24gKGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInNlbGVjdCBuZXcgXCIsIGlkLCB0aGlzLnBhcnRpY2xlcyk7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzLnB1c2goaWQpO1xyXG4gICAgICAgICAgICB0aGlzLm15X3NlbGVjdGVkID0gaWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVfcGFydGljbGVzOiBmdW5jdGlvbiAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZXZlbnRfaHViLiRlbWl0KFwiY3JlYXRlX3BhcnRpY2xlc1wiKTtcclxuICAgICAgICB9LFxyXG5cdFx0cmVtb3ZlX3BhcnRpY2xlczogZnVuY3Rpb24gKGV2ZW50KSBcclxuXHRcdHtcclxuICAgICAgICAgICBldmVudF9odWIuJGVtaXQoXCJyZW1vdmVfcGFydGljbGVzXCIsIHRoaXMubXlfc2VsZWN0ZWQpOyAgICAgICAgXHJcblx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmICh0aGlzLnBhcnRpY2xlc1tpXSA9PSB0aGlzLm15X3NlbGVjdGVkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RlIG5leHQgYXZhaWxhYmxlIHBhcnRpY2xlcyBvciBlbXB0eVxyXG5cdFx0XHRcdFx0aWYgKHRoaXMucGFydGljbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkrIDEgPCB0aGlzLnBhcnRpY2xlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXlfc2VsZWN0ZWQgPSB0aGlzLnBhcnRpY2xlc1tpKzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXlfc2VsZWN0ZWQgPSB0aGlzLnBhcnRpY2xlc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5teV9zZWxlY3RlZCA9ICcnO1xyXG5cdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuICAgICAgICAgICB9XHJcblx0XHR9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIGNoYW5nZV9jb2xvcnM6IGZ1bmN0aW9uIChldmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGV2ZW50X2h1Yi4kZW1pdChcImNoYW5nZV9wYXJ0aWNsZXNfY29sb3JcIiwgdGhpcy5teV9zZWxlY3RlZCwgZXZlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgc2hvd190ZXh0dXJlX3BhbmVsOiBmdW5jdGlvbiAoZXZlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRleHR1cmVfcGFuZWxfaXNfdmlzaWJsZSA9ICF0aGlzLnRleHR1cmVfcGFuZWxfaXNfdmlzaWJsZTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMgXCIsIHRoaXMudGV4dHVyZV9wYW5lbF9pc192aXNpYmxlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG5cdFx0c2VsZWN0X3BhcnRpY2xlczogZnVuY3Rpb24gKGV2ZW50KVxyXG5cdFx0e1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlX3BhcmFtcyA9IGV2ZW50X2h1Yi5nZXRfcGFydGljbGVfcGFyYW1zKHRoaXMubXlfc2VsZWN0ZWQpOyAgICAgICAgICAgICAgICAgIFxyXG5cdFx0fSxcclxuXHRcdHBsYXk6IGZ1bmN0aW9uIChldmVudClcclxuXHRcdHtcclxuICAgICAgICAgICAgZXZlbnRfaHViLiRlbWl0KFwicmVwbGF5XCIsIHRoaXMubXlfc2VsZWN0ZWQsIHRoaXMucGFydGljbGVfcGFyYW1zKTtcclxuXHRcdH0sXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlZDogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgIFxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBldmVudF9odWIuJG9uKFwiYWRkaW5nX3BhcnRpY2xlc1wiLCBmdW5jdGlvbiAoaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZWxmLmFkZF90b19zZWxlY3QoaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKCEhdGhpcy5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm15X3NlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJ0aWNsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5teV9zZWxlY3RlZCA9IHRoaXMucGFydGljbGVzWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm15X3NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVfcGFyYW1zID0gZXZlbnRfaHViLmdldF9wYXJ0aWNsZV9wYXJhbXModGhpcy5teV9zZWxlY3RlZCk7ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHdhdGNoOiB7XHJcbiAgICAgICAgcGFydGljbGVzOiBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ3YXRjaCBwYXJ0aWNsZXNcIiwgYXJyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFydGljbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpcnN0X3RpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15X3NlbGVjdGVkID0gdGhpcy5wYXJ0aWNsZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdF90aW1lID0gZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBteV9zZWxlY3RlZDogZnVuY3Rpb24gKG5ld19zZWxlY3RlZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwid2F0Y2ggbmV3IHNlbGVjdGVkXCIsIG5ld19zZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVfcGFyYW1zID0gZXZlbnRfaHViLmdldF9wYXJ0aWNsZV9wYXJhbXModGhpcy5teV9zZWxlY3RlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgICAgICBcclxuICAgIHRlbXBsYXRlOiBcclxuICAgICc8ZGl2PlxcXHJcblx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJidG4tYWRkXCIgdi1vbjpjbGljaz1cImNyZWF0ZV9wYXJ0aWNsZXNcIj5OZXc8L2J1dHRvbj5cXFxyXG5cdDxicj5cXFxyXG5cdDxzZWxlY3Qgdi1tb2RlbD1cIm15X3NlbGVjdGVkXCIgaWQ9XCJvYmplY3QtbGlzdFwiIHJlZj1cInBhcnRpY2xlc19saXN0XCI+XFxcclxuXHRcdDxvcHRpb24gZGlzYWJsZWQgdmFsdWU9XCJcIj5QbGVhc2Ugc2VsZWN0IG9uZTwvb3B0aW9uPlxcXHJcblx0ICA8b3B0aW9uIHYtZm9yPVwib3B0aW9uIGluIHBhcnRpY2xlc1wiIHYtYmluZDp2YWx1ZT1cIm9wdGlvblwiPlxcXHJcblx0XHR7eyBvcHRpb24gfX1cXFxyXG5cdCAgPC9vcHRpb24+XFxcclxuXHQ8L3NlbGVjdD5cXFxyXG5cdDxicj5cXFxyXG4gICAgPHNwYW4+U2VsZWN0ZWQ6IHt7IG15X3NlbGVjdGVkIH19PC9zcGFuPjxicj5cXFxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwiYnRuLXBsYXlcIiB2LW9uOmNsaWNrPVwicGxheVwiPlJlZnJlc2g8L2J1dHRvbj5cXFxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwiYnRuLXJlbW92ZVwiIHYtb246Y2xpY2s9XCJyZW1vdmVfcGFydGljbGVzXCI+UmVtb3ZlPC9idXR0b24+XFxcclxuICAgIDxwPiAgPHNwYW4gY2xhc3M9XCJpbmZvLXBhbmVsXCI+UGFydGljbGVzIHByb3BlcnRpZXM8L3NwYW4+PC9wPlxcXHJcbiAgICA8ZGl2IGNsYXNzPVwicGFydGljbGVzLXByb3BlcnRpZXNcIj5cXFxyXG4gICAgICAgIDxkaXYgdi1pZj1cIm15X3NlbGVjdGVkXCIgPlxcXHJcbiAgICAgICAgICAgIDxQYXJ0aWNsZXNQcm9wcyAgOnBhcmFtcz1cInBhcnRpY2xlX3BhcmFtc1wiIC8+XFxcclxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIEBjbGljaz1cInNob3dfdGV4dHVyZV9wYW5lbFwiPlNob3cgdGV4dHVyZSBwYW5lbDwvYT5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHVtbXlcIiB2LWlmPVwidGV4dHVyZV9wYW5lbF9pc192aXNpYmxlXCI+XFxcclxuICAgICAgICAgICAgPHRleHR1cmUtcGFuZWwgOnRleHR1cmVzPVwidGV4dHVyZXNcIiA6b2JqZWN0X2lkPVwibXlfc2VsZWN0ZWRcIiA6c2VsZWN0ZWQ9XCJwYXJ0aWNsZV9wYXJhbXMudGV4dHVyZVwiLz5cXFxyXG4gICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgIDwvZGl2PlxcXHJcbiAgICA8L2Rpdj5cXFxyXG4gICAgPC9kaXY+JyxcclxuICAgXHJcbiAgIFxyXG4gICAgY29tcG9uZW50czoge1xyXG4gICAgICAgICdQYXJ0aWNsZXNQcm9wcyc6IFBhcnRpY2xlc19Qcm9wcyxcclxuICAgICAgICAndGV4dHVyZS1wYW5lbCc6IFRleHR1cmVfUGFuZWwsXHJcbiAgICB9LFxyXG59O1xyXG5cclxuXHJcbi8vVnVlLmNvbXBvbmVudChcInBhcnRpY2xlcy1wYW5lbFwiLCBQYXJ0aWNsZXNfUGFuZWwpO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZXNfUGFuZWx9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ndWkvcGFydGljbGVzX3BhbmVsLmpzIiwiaW1wb3J0IHtDb2xvcl9QaWNrZXJ9IGZyb20gJy4vY29sb3JfcGlja2VyLmpzJztcclxuXHJcbnZhciBCbGVuZGluZ19TZWxlY3RvciA9IHtcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgXCJibGVuZGluZ1wiOiB7XHJcbiAgICAgICAgICAgIHR5cGUgOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIm5vXCJcclxuICAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZTpcclxuICAgICAgICAnPHNlbGVjdCB2LW1vZGVsPVwiYmxlbmRpbmdcIiBpZD1cImJsZW5kaW5nXCIgdi1vbjpjaGFuZ2U9XCJzZWxlY3RcIj5cXFxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibm9cIj5ubzwvb3B0aW9uPlxcXHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhZGRpdGl2ZVwiPmFkZGl0aXZlPC9vcHRpb24+XFxcclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm9uZV9hbHBoYVwiPm9uZSwgbWludXMgc3JjIGFscGhhPC9vcHRpb24+XFxcclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFscGhhX29uZVwiPm1pbnVzIHNyYyBhbHBoYSwgb25lPC9vcHRpb24+XFxcclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFscGhhXCI+YWxwaGE8L29wdGlvbj5cXFxyXG4gICAgICAgIDwvc2VsZWN0PicsXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgc2VsZWN0OiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB0aGlzLmJsZW5kaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG5cclxudmFyIEJlaGF2aW9yID0ge1xyXG4gICAgcHJvcHM6IFtcImFmZmVjdF9tZXRob2RcIiwgXCJlbWl0X21ldGhvZFwiXSxcclxuICAgIFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGVtcGxhdGU6ICc8ZGl2PlxcXHJcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBAY2xpY2s9XCJzaG93X2JlaGF2aW9yXCI+U2hvdyBCZWhhdmlvdXI8L2J1dHRvbj5cXFxyXG4gICAgPGRpdiBjbGFzcz1cImJlaGF2aW9yXCIgdi1pZj1cImJlaGF2aW9yXCI+XFxcclxuICAgIDxwPmFmZmVjdCBtZXRob2Q8YnI+XFxcclxuICAgIDx0ZXh0YXJlYSB2LW1vZGVsPVwiYWZmZWN0X21ldGhvZFwiPjwvdGV4dGFyZWE+XFxcclxuICAgIDxwPmVtaXQgbWV0aG9kPGJyPlxcXHJcbiAgICA8dGV4dGFyZWEgdi1tb2RlbD1cImVtaXRfbWV0aG9kXCI+PC90ZXh0YXJlYT5cXFxyXG4gICAgPC9kaXY+JyxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBzaG93X2JlaGF2aW9yOiBmdW5jdGlvbihmKSB7XHJcbiAgICAgICAgICAgIHZhciBiZWhhdmlvciA9ICF0aGlzLmJlaGF2aW9yO1xyXG4gICAgICAgICAgICB0aGlzLmJlaGF2aW9yID0gYmVoYXZpb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn07XHJcblxyXG52YXIgUGFydGljbGVfUGFyYW1zID0gXHJcbntcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgXCJwYXJhbXNcIjoge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGVtcGxhdGU6ICc8ZGl2IEBrZXl1cC4xMz1cImZpcmVcIj5cXFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9wLWNvbHVtblwiPlxcXHJcbiAgICAgICAgICAgIExpZmUgTGVuZ3RoOiA8YnIvPlxcXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibGlmZV9sZW5ndGhcIiB2LW1vZGVsLm51bWJlcj1cInBhcmFtcy5saWZlX2xlbmd0aFwiIHR5cGU9XCJudW1iZXJcIiBzdGVwPVwiMC4xXCIgLz5cXFxyXG4gICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb3AtY29sdW1uXCI+XFxcclxuICAgICAgICAgICAgRW1pdCBwZXIgc2Vjb25kIDxici8+XFxcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJlbWl0X3Blcl9zZWNvbmRcIiB2LW1vZGVsLm51bWJlcj1cInBhcmFtcy5lbWl0X3Blcl9zZWNvbmRcIiB0eXBlPVwibnVtYmVyXCIgLz5cXFxyXG4gICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb3AtY29sdW1uXCI+XFxcclxuICAgICAgICAgICAgTnVtYmVyIG9mIHBhcnRpY2xlczxici8+XFxcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJjb3VudFwiIHYtbW9kZWwubnVtYmVyPVwicGFyYW1zLmNvdW50XCIgdHlwZT1cIm51bWJlclwiIC8+XFxcclxuICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9wLWNvbHVtblwiPlxcXHJcbiAgICAgICAgICAgIFBvaW50IFNpemU8YnIvPlxcXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwic2l6ZVwiIHYtbW9kZWwubnVtYmVyPVwicGFyYW1zLnNpemVcIiB0eXBlPVwibnVtYmVyXCIgc3RlcD1cIjAuMVwiIC8+XFxcclxuICAgICAgICA8L2Rpdj5cXFxyXG48L2Rpdj4nLFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGZpcmU6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZmlyZShldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4gICBcclxudmFyIFBhcnRpY2xlc19Qcm9wcyA9IFxyXG57XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIFwicGFyYW1zXCI6IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6ICc8ZGl2PiAgPHBhcnRpY2xlLXBhcmFtcyA6cGFyYW1zPXBhcmFtcyAvPlxcXHJcbiAgICAgICAgPGNvbG9yLXBpY2tlciA6dmFsdWU9XCJwYXJhbXMuY29sb3JcIiBAaW5wdXQ9XCJ1cGRhdGVfY29sb3JcIj48L2NvbG9yLXBpY2tlcj5cXFxyXG4gICAgICAgIDxwPkJsZW5kaW5nIG1vZGU8L3A+XFxcclxuICAgICAgICAgICAgPGJsZW5kaW5nLW1vZGUgOmJsZW5kaW5nPXBhcmFtcy5ibGVuZGluZyBAY2hhbmdlPVwiYmxlbmRpbmdfY2hhbmdlXCI+IDwvYmxlbmRpbmctbW9kZT5cXFxyXG4gICAgICAgIDxwPlByZWNvbXB1dGVkIGFscGhhIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2LW1vZGVsPVwicGFyYW1zLnByZWNvbXB1dGVkX2FscGhhXCIgQGNoYW5nZT1cImZpcmVcIiBpZD1cInByZV9hbHBoYVwiPjwvcD5cXFxyXG4gICAgICAgIDxiZWhhdmlvciA6YWZmZWN0X21ldGhvZD1wYXJhbXMuYWZmZWN0X21ldGhvZCA6ZW1pdF9tZXRob2Q9cGFyYW1zLmVtaXRfbWV0aG9kIC8+XFxcclxuICAgIDxkaXY+JyxcclxuICAgIFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICAgIHBhcmFtczogZnVuY3Rpb24gKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjaGFuZ2UgXCIsIHRoaXMucGFyYW1zLmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGJsZW5kaW5nX2NoYW5nZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmJsZW5kaW5nID0gZXZlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdF9wYXJhbV9jaGFuZ2UoXCJibGVuZGluZ1wiLCBldmVudCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbWl0X3BhcmFtX2NoYW5nZTogZnVuY3Rpb24gKGtleSwgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID17fTtcclxuICAgICAgICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgZXZlbnRfaHViLiRlbWl0KFwiY2hhbmdlX3BhcmFtc1wiLCB0aGlzLnBhcmFtcy5pZCwgcGFyYW1zKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpcmU6IGZ1bmN0aW9uIChldmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IChldmVudC50YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94JykgPyBldmVudC50YXJnZXQuY2hlY2tlZCA6IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5lbWl0X3BhcmFtX2NoYW5nZShldmVudC50YXJnZXQuaWQsIHZhbHVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIHVwZGF0ZV9jb2xvcjogZnVuY3Rpb24gKGV2ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZXZlbnRfaHViLiRlbWl0KCdjaGFuZ2VfY29sb3InLCB0aGlzLnBhcmFtcy5pZCwgZXZlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICBcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgICAgJ2NvbG9yLXBpY2tlcic6IENvbG9yX1BpY2tlcixcclxuICAgICAgICAnYmxlbmRpbmctbW9kZSc6IEJsZW5kaW5nX1NlbGVjdG9yLFxyXG4gICAgICAgICdiZWhhdmlvcic6IEJlaGF2aW9yLFxyXG4gICAgICAgICdwYXJ0aWNsZS1wYXJhbXMnOiBQYXJ0aWNsZV9QYXJhbXMsXHJcbiAgICB9LFxyXG59O1xyXG5cclxuLy9WdWUuY29tcG9uZW50KFwiUGFydGljbGVzUHJvcHNcIiwgUGFydGljbGVzX1Byb3BzKTtcclxuXHJcblxyXG5leHBvcnQge1BhcnRpY2xlc19Qcm9wc307XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2d1aS9wYXJ0aWNsZXNfcHJvcHMuanMiLCJcclxudmFyIFRleHR1cmVfUGFuZWwgPSBcclxue1xyXG4gICAgdGVtcGxhdGU6IFxyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidGV4dHVyZS1wYW5lbFwiPlxcXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWdoLXRvb2xzLXBhbmVsXCI+XFxcclxuICAgICAgICAgICAgPHNlbGVjdCBpZD1cInRleHR1cmVfc2VsZWN0XCIgdi1tb2RlbD1cInNlbGVjdGVkXCIgdi1vbjpjaGFuZ2U9XCJjaG9vc2VfdGV4dHVyZVwiPlxcXHJcbiAgICAgICAgICAgIDxvcHRpb24gdi1mb3I9XCJvcHRpb24gaW4gdGV4dHVyZXNcIiB2LWJpbmQ6dmFsdWU9XCJvcHRpb25cIj5cXFxyXG4gICAgICAgICAgICAgICAge3sgb3B0aW9uIH19XFxcclxuICAgICAgICAgICAgPC9vcHRpb24+XFxcclxuICAgICAgICAgICAgPC9zZWxlY3Q+XFxcclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdi1vbjpjbGljaz1cImFwcGx5XCI+YXBwbHk8L2J1dHRvbj5cXFxyXG4gICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dHVyZS1jYW52YXNcIj5cXFxyXG4gICAgICAgICAgICA8Y2FudmFzIGlkPVwidGV4dHVyZS1jYW52YXMtb2JqXCIgY2xhc3M9XCJ0ZXh0dXJlLWNhbnZhc1wiIHJlZj1cImNhbnZhc1wiPlxcXHJcbiAgICAgICAgICAgIDwvY2FudmFzPlxcXHJcbiAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0dXJlLWluZm9cIj5cXFxyXG4gICAgICAgICAgICAgICAgVGV4dHVyZSBGb3JtYXQgIHt7Zm9ybWF0fX0gPGJyIC8+XFxcclxuICAgICAgICAgICAgICAgIFRleHR1cmUgV2lkdGgge3t0ZXh0dXJlX3dpZHRofX0gSGVpZ2h0IHt7dGV4dHVyZV9oZWlnaHR9fVxcXHJcbiAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbGVhclwiIC8+XFxcclxuICAgICAgICA8L2Rpdj4nLFxyXG5cclxuICAgICAgICAvL3RleHR1cmUgZGljdGlvbmFyaWVzLCBzZWxlY3RlZCB0ZXh0dXJlLCBvYmplY3QgaWQsIHdoaWNoIHNlbGVjdGVkIHRleHR1cmVcclxuICAgIHByb3BzOiBbXCJ0ZXh0dXJlc1wiLCBcInNlbGVjdGVkXCIsIFwib2JqZWN0X2lkXCJdLFxyXG4gICAgXHJcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRfdGV4dHVyZTogJycsXHJcbiAgICAgICAgICAgIHRleHR1cmVfd2lkdGggOiAwLFxyXG4gICAgICAgICAgICB0ZXh0dXJlX2hlaWdodCA6IDAsXHJcbiAgICAgICAgICAgIGZvcm1hdCA6ICcnLFxyXG4gICAgICAgICAgICBwYW5lbF92aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6ICcnLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBzaG93X3BhbmVsOiBmdW5jdGlvbiAoZXZlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsX3Zpc2libGUgPSAhdGhpcy5wYW5lbF92aXNpYmxlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hvb3NlX3RleHR1cmU6IGZ1bmN0aW9uKGV2ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZF90ZXh0dXJlID0gdGhpcy5zZWxlY3RlZDtcclxuICAgICAgICAgICAgdGhpcy5kcmF3X3RleHR1cmUodGhpcy5zZWxlY3RlZF90ZXh0dXJlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImFwcGx5IG9mIFwiLCB0aGlzLm9iamVjdF9pZCwgdGhpcy5zZWxlY3RlZF90ZXh0dXJlKTtcclxuICAgICAgICAgICAgZXZlbnRfaHViLiRlbWl0KFwic2VsZWN0X3RleHR1cmVcIiwgdGhpcy5vYmplY3RfaWQsIHRoaXMuc2VsZWN0ZWRfdGV4dHVyZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkcmF3X3RleHR1cmU6IGZ1bmN0aW9uIChuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFuYW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gZXZlbnRfaHViLmdldF90ZXh0dXJlKG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoIXRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJPaCwgRnVjayEgVGV4dHVyZSBcIiArIG5hbWUgKyBcIiBub3QgZm91bmQhXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0ID0gdGV4dHVyZV9mb3JtYXRfdG9fc3RyaW5nKHRleHR1cmUuZm9ybWF0KTtcclxuICAgICAgICAgICAgdmFyIGltYWdlID0gdGV4dHVyZS5pbWFnZTtcclxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlX3dpZHRoID0gaW1hZ2UubmF0dXJhbFdpZHRoIHx8IGltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLnRleHR1cmVfaGVpZ2h0ID0gaW1hZ2UubmF0dXJhbEhlaWdodCB8fCBpbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgY2FudmFzID0gdGhpcy4kcmVmc1tcImNhbnZhc1wiXTtcclxuICAgICAgICAgICAgbXlfZHJhd19pbWFnZShjYW52YXMsIGltYWdlLCAwLCAwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIGdldF90ZXh0dXJlX2Zyb21fcGFydGljbGVzOiBmdW5jdGlvbiAoaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZF90ZXh0dXJlID0gZXZlbnRfaHViLmdldF90ZXh0dXJlX2Zyb21fcGFydGljbGVzKGlkKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3X3RleHR1cmUodGhpcy5zZWxlY3RlZF90ZXh0dXJlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5nZXRfdGV4dHVyZV9mcm9tX3BhcnRpY2xlcyh0aGlzLm9iamVjdF9pZCk7XHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJtb3VudCBvZiB0ZXh0dXJlIHBhbmVsXCIsIHRoaXMub2JqZWN0X2lkLCB0aGlzLnNlbGVjdGVkX3RleHR1cmUsIHRoaXMuc2VsZWN0ZWQpO1xyXG4gICAgICAvL3ByaW50KFwiPGgzPkhpISBJIG1vdW50ZWQgYW5kIG15IHRleHR1cmUgaXMgXCIgKyB0aGlzLnNlbGVjdGVkX3RleHR1cmUgKyBcIixcIiArIHRoaXMuc2VsZWN0ZWQgKyBcIjwvaDM+XCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgICAgb2JqZWN0X2lkOiBmdW5jdGlvbiAodmFsdWUpIHsgXHJcbiAgICAgICAgICAgdGhpcy5nZXRfdGV4dHVyZV9mcm9tX3BhcnRpY2xlcyh2YWx1ZSk7XHJcbiAgICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICBcclxuICAgIFxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IHtUZXh0dXJlX1BhbmVsfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ3VpL3RleHR1cmVfcGFuZWwuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5cclxuZnVuY3Rpb24gQ29sb3JfRG9tYWluKHIsZyxiKVxyXG57XHJcbiAgICB0aGlzLmNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKHIsZyxiKTtcclxuICAgIHRoaXMudXVpZCA9IF8uZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICB0aGlzLm5hbWUgPSAnJztcclxuICAgIHRoaXMudHlwZSA9IFwiQ29sb3JfRG9tYWluXCI7XHJcbn1cclxuXHJcbl8uY29weV9vYmplY3QoQ29sb3JfRG9tYWluLnByb3RvdHlwZSwge1xyXG4gICAgdG9KU09OOiBmdW5jdGlvbiAoY2hpbGQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICBkYXRhLnV1aWQgPSB0aGlzLnV1aWQ7XHJcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgZGF0YS5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgZGF0YS5jb2xvciA9IHtyOiB0aGlzLmNvbG9yLnIsIGc6IHRoaXMuY29sb3IuZywgYjogdGhpcy5jb2xvci5ifTtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfSxcclxuICAgIHBhcnNlOiBmdW5jdGlvbiAoanNvbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnV1aWQgPSBqc29uLnV1aWQ7XHJcbiAgICAgICAgaWYgKGpzb24ubmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGpzb24uY29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9yLnNldChqc29uLmNvbG9yLnIsIGpzb24uY29sb3IuZywganNvbi5jb2xvci5iKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZW1pdDogZnVuY3Rpb24gKGNvbG9yKVxyXG4gICAge1xyXG4gICAgICAgIGNvbG9yLnIgPSB0aGlzLmNvbG9yLnI7XHJcbiAgICAgICAgY29sb3IuZyA9IHRoaXMuY29sb3IuZztcclxuICAgICAgICBjb2xvci5iID0gdGhpcy5jb2xvci5iO1xyXG4gICAgfSxcclxuICAgIGZpbGw6IGZ1bmN0aW9uIChjb2xvciwgb2Zmc2V0KSBcclxuICAgIHtcclxuICAgICAgICBjb2xvcltvZmZzZXQrMF0gPSB0aGlzLmNvbG9yLnI7XHJcbiAgICAgICAgY29sb3Jbb2Zmc2V0KzFdID0gdGhpcy5jb2xvci5nO1xyXG4gICAgICAgIGNvbG9yW29mZnNldCsyXSA9IHRoaXMuY29sb3IuYjtcclxuICAgIH1cclxufSk7XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoJ0NvbG9yX0RvbWFpbicsIENvbG9yX0RvbWFpbik7XHJcblxyXG5mdW5jdGlvbiBUYWJsZV9Db2xvcih0YWJsZSlcclxue1xyXG4gICAgaWYgKHRhYmxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmNvcHlfdGFibGUodGFibGUpOyAgICAgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdF90YWJsZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5UYWJsZV9Db2xvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbG9yX0RvbWFpbik7XHJcblxyXG5fLmNvcHlfb2JqZWN0KFRhYmxlX0NvbG9yLnByb3RvdHlwZSwge1xyXG4gICAgY29uc3RydWN0b3I6IFRhYmxlX0NvbG9yLFxyXG4gICAgY29weV90YWJsZTogZnVuY3Rpb24gKHRhYmxlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgQXJyYXkodGFibGUubGVuZ3RoKTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGFibGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBUSFJFRS5Db2xvcih0YWJsZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVtaXQ6IGZ1bmN0aW9uIChjb2xvcilcclxuICAgIHtcclxuICAgICAgICB2YXIgaW5kZXggPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIHRoaXMudGFibGUubGVuZ3RoKSAlIHRoaXMudGFibGUubGVuZ3RoO1xyXG4gICAgICAgIHZhciBzcmMgPSB0aGlzLnRhYmxlW2luZGV4XTtcclxuICAgICAgICBjb2xvci5yID0gc3JjLnI7XHJcbiAgICAgICAgY29sb3IuZyA9IHNyYy5nO1xyXG4gICAgICAgIGNvbG9yLmIgPSBzcmMuYjtcclxuICAgIH0sXHJcbiAgICBmaWxsOiBmdW5jdGlvbiAoY29sb3IsIG9mZnNldCkgXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiB0aGlzLnRhYmxlLmxlbmd0aCkgJSB0aGlzLnRhYmxlLmxlbmd0aDtcclxuICAgICAgICB2YXIgc3JjID0gdGhpcy50YWJsZVtpbmRleF07XHJcbiAgICAgICAgY29sb3Jbb2Zmc2V0XSA9IHNyYy5yO1xyXG4gICAgICAgIGNvbG9yW29mZnNldCsxXSA9IHNyYy5nO1xyXG4gICAgICAgIGNvbG9yW29mZnNldCsyXSA9IHNyYy5iO1xyXG4gICAgfSxcclxuICAgIGRlZmF1bHRfdGFibGU6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBBcnJheSg4KTtcclxuICAgICAgICB0aGlzLnRhYmxlWzBdID0gbmV3IFRIUkVFLkNvbG9yKDEsIDAsIDApO1xyXG4gICAgICAgIHRoaXMudGFibGVbMV0gPSBuZXcgVEhSRUUuQ29sb3IoMCwgMSwgMCk7XHJcbiAgICAgICAgdGhpcy50YWJsZVsyXSA9IG5ldyBUSFJFRS5Db2xvcigwLCAwLCAxKTtcclxuICAgICAgICB0aGlzLnRhYmxlWzNdID0gbmV3IFRIUkVFLkNvbG9yKDEsIDAsIDEpO1xyXG4gICAgICAgIHRoaXMudGFibGVbNF0gPSBuZXcgVEhSRUUuQ29sb3IoMSwgMSwgMCk7XHJcbiAgICAgICAgdGhpcy50YWJsZVs1XSA9IG5ldyBUSFJFRS5Db2xvcigxLCAwLjQsIDAuNCk7XHJcbiAgICAgICAgdGhpcy50YWJsZVs2XSA9IG5ldyBUSFJFRS5Db2xvcigwLjUsIDAuNywgMC45OCk7XHJcbiAgICAgICAgdGhpcy50YWJsZVs3XSA9IG5ldyBUSFJFRS5Db2xvcigwLjksIDAuNCwgMC40KTtcclxuICAgIH0sXHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHIgPSB7cjogMCwgZzogMCwgYjogMH07XHJcbiAgICAgICAgdGhpcy5lbWl0KHIpO1xyXG4gICAgICAgIHJldHVybiByO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIlRhYmxlX0NvbG9yXCIsIFRhYmxlX0NvbG9yKTtcclxuXHJcbmV4cG9ydCB7Q29sb3JfRG9tYWluLCBUYWJsZV9Db2xvcn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhcnRpY2xlcy9jb2xvcl9kb21haW4uanMiLCJ2YXIgUGFydGljbGVfU2hhZGVycyA9IHt9O1xyXG5cclxuKGZ1bmN0aW9uICgpIFxyXG57XHJcblxyXG4vL3BhcnRpY2xlIGF0dHJpYnV0ZXM6XHJcbi8vcG9zaXRpb25cclxuLy9jb2xvclxyXG4vL2xlZnQsIHNpemVcclxudmFyIHZlcnRleF9zaGFkZXIgPSBbXHJcbi8vJ2F0dHJpYnV0ZSB2ZWM0IHBvc2l0aW9uOycsXHJcbidhdHRyaWJ1dGUgdmVjNCBjb2xvcjsnLFxyXG4nYXR0cmlidXRlIGZsb2F0IHBhcmFtczsnLFxyXG4ndmFyeWluZyB2ZWM0IHZjb2xvcjsnLFxyXG4ndW5pZm9ybSBmbG9hdCBsaWZldGltZTsnLFxyXG4ndW5pZm9ybSBmbG9hdCBwb2ludF9zaXplOycsXHJcbid1bmlmb3JtIHZlYzIgc2NyZWVuX3NpemU7JyxcclxuJyNpZm5kZWYgRFlOQU1JQ19DT0xPUlMnLFxyXG4gICAgJ3VuaWZvcm0gdmVjMyBwYXJ0aWNsZV9jb2xvcjsnLFxyXG4nI2VuZGlmJyxcclxuJ3ZvaWQgbWFpbiAoKSB7JyxcclxuXHQnZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmlld01hdHJpeCAqIHZlYzQoIHBvc2l0aW9uLCAxLjAgKTsnLFxyXG4nI2lmZGVmIERZTkFNSUNfQ09MT1JTJyxcclxuXHQndmNvbG9yLnJnYiA9IGNvbG9yLnJnYjsnLFxyXG4nI2Vsc2UnLFxyXG4gICAgJ3Zjb2xvci5yZ2IgPSBwYXJ0aWNsZV9jb2xvci5yZ2I7JyxcclxuJyNlbmRpZicsXHJcbicjaWZkZWYgTk9fRkFERV9DT0xPUicsXHJcblx0J3Zjb2xvci5hID0gMS4wOycsXHJcbicjZWxzZScsXHJcblx0Ly9wYXJhbXMgY29udGFpbnMgbGlmZSBsZW5ndGggd2hpY2ggZGVjcmVhc2VkIGJ5IHRpbWVcclxuXHQnZmxvYXQgdG1wID0gcGFyYW1zIC8gbGlmZXRpbWU7JyxcclxuXHQndG1wID0gbWluKHRtcCwgMS4wKTsnLFx0XHJcblx0J3Zjb2xvci5hID0gdG1wOycsXHJcbicjZW5kaWYnLFxyXG5cdCdmbG9hdCB0ID0gIHNjcmVlbl9zaXplLnkqIHByb2plY3Rpb25NYXRyaXhbMV1bMV0gLyBnbF9Qb3NpdGlvbi53OycsXHJcblx0J3QgPSB0ICogcG9pbnRfc2l6ZTsnLFxyXG5cdCdpZiAocGFyYW1zID4gMC4wKSB7JyxcclxuXHRcdCdnbF9Qb2ludFNpemUgPSB0OycsXHJcblx0J30nLFxyXG5cdCdlbHNlIHsnLFxyXG5cdFx0Ly8ndmNvbG9yLmEgPSAwLjA7JyxcclxuXHRcdCdnbF9Qb2ludFNpemUgPSAwLjA7JyxcclxuICAgICAgICAnZ2xfUG9zaXRpb24ueiA9IC0xMDAwLjA7JyxcclxuXHQnfScsXHJcbid9J1xyXG5dO1xyXG5cclxudmFyIGZyYWdtZW50X3NoYWRlciA9IFtcclxuXHQndmFyeWluZyB2ZWM0IHZjb2xvcjsnLFxyXG5cdCcjaWZkZWYgUEFSVElDTEVfVEVYVFVSRScsXHJcblx0XHQndW5pZm9ybSBzYW1wbGVyMkQgc3ByaXRlOycsXHJcblx0JyNlbmRpZicsXHJcblx0J3ZvaWQgbWFpbigpIHsnLFxyXG5cdCcjaWZkZWYgUEFSVElDTEVfVEVYVFVSRScsXHJcblx0XHQndmVjNCB0ZXggPSB0ZXh0dXJlMkQoIHNwcml0ZSwgZ2xfUG9pbnRDb29yZCApOycsXHJcblx0XHQndmVjMyBmcmFnbWVudF9jb2xvciA9IHRleC5yZ2I7JyxcclxuXHRcdCdmcmFnbWVudF9jb2xvci5yZ2IgKj0gdmNvbG9yLnJnYjsnLFxyXG5cdFx0J2Zsb2F0IGFscGhhID0gdGV4LmE7JyxcdFxyXG5cdCcjZWxzZScsXHJcblx0XHQndmVjMyBmcmFnbWVudF9jb2xvciA9IHZjb2xvci5yZ2I7JyxcclxuXHRcdCdmbG9hdCBhbHBoYSA9IDEuMDsnLFxyXG5cdCcjZW5kaWYnLFxyXG5cdCcjaWZkZWYgUFJFX0FMUEhBJyxcclxuXHRcdCdmcmFnbWVudF9jb2xvci5yZ2IgKj0gYWxwaGE7JyxcclxuXHQnI2VuZGlmJyxcclxuXHQnI2lmbmRlZiBOT19GQURFX0NPTE9SJyxcclxuXHRcdCdmbG9hdCBmcmFnbWVudF9hbHBoYSA9IGFscGhhICogdmNvbG9yLmE7JyxcclxuXHQnI2Vsc2UnLFxyXG5cdFx0J2Zsb2F0IGZyYWdtZW50X2FscGhhID0gYWxwaGE7JyxcclxuXHQnI2VuZGlmJyxcclxuXHRcdCdnbF9GcmFnQ29sb3IgPSB2ZWM0KGZyYWdtZW50X2NvbG9yLnJnYiwgZnJhZ21lbnRfYWxwaGEpOycsXHJcblx0J30nLFxyXG5dO1xyXG5cclxuUGFydGljbGVfU2hhZGVycy52ZXJ0ZXggPSB2ZXJ0ZXhfc2hhZGVyLmpvaW4oICdcXG4nICk7XHJcblBhcnRpY2xlX1NoYWRlcnMuZnJhZ21lbnQgPSBmcmFnbWVudF9zaGFkZXIuam9pbiggJ1xcbicgKTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7UGFydGljbGVfU2hhZGVyc307XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZV9zaGFkZXJzLmpzIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9FbWl0dGVyfSBmcm9tICcuL3BhcnRpY2xlX2VtaXR0ZXIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0FmZmVjdG9yfSBmcm9tICcuL3BhcnRpY2xlX2FmZmVjdG9yLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZXNfUG9pbnRzfSBmcm9tICcuL3BhcnRpY2xlc19wb2ludHMuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX1NoYWRlcnN9IGZyb20gJy4vcGFydGljbGVfc2hhZGVycy5qcyc7XHJcbmltcG9ydCB7Q29sb3JfRG9tYWlufSBmcm9tICcuL2NvbG9yX2RvbWFpbi5qcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gUGFydGljbGVfU3lzdGVtKGRhdGEpXHJcbntcclxuICAgIHRoaXMudXVpZCA9IF8uZ2VuZXJhdGVVVUlEKCk7ICAgIFxyXG4gICAgXHJcbiAgICB0aGlzLnBhcmFtcyA9IHRoaXMuY29uZmlnX3BhcmFtcyhkYXRhKTtcclxuXHJcbiAgXHJcblx0dGhpcy5lbWl0dGVyID0gdGhpcy5wYXJhbXMuZW1pdHRlcjtcclxuXHR0aGlzLmFmZmVjdG9yID0gdGhpcy5wYXJhbXMuYWZmZWN0b3I7ICAgIFxyXG4gICAgdGhpcy5wYXJ0aWNsZV9saWZldGltZSA9IHRoaXMucGFyYW1zLnBhcnRpY2xlX2xpZmV0aW1lO1xyXG4gICAgdGhpcy50ZXh0dXJlID0gdGhpcy5wYXJhbXMudGV4dHVyZTtcclxuXHRcclxuXHR0aGlzLmR5bmFtaWNfY29sb3IgPSBmYWxzZTtcclxuXHJcblx0dmFyIGNvdW50ID0gdGhpcy5wYXJhbXMuY291bnQ7XHJcblx0XHJcblx0dGhpcy5tYXRlcmlhbCA9IHRoaXMuY3JlYXRlX3BhcnRpY2xlX21hdGVyaWFsKCk7XHJcblx0dGhpcy5ub2RlID0gbmV3IFBhcnRpY2xlc19Qb2ludHModGhpcy5jcmVhdGVfcGFydGljbGVfZ2VvbWV0cnkoY291bnQpLCB0aGlzLm1hdGVyaWFsKTtcclxuICAgIHRoaXMubm9kZS5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgdGhpcy5ub2RlLmJvdW5kaW5nU3BoZXJlLnJhZGl1cyA9IHRoaXMucGFyYW1zLmJvdW5kaW5nX3JhZGl1cztcclxuXHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmNvbmZpZ19wYXJhbXMgPSBmdW5jdGlvbiAoZGF0YSlcclxue1xyXG4gICAgdmFyIHBhcmFtcyA9IFxyXG4gICAge1xyXG4gICAgfTtcclxuICAgIC8vZGVmYXVsdFxyXG4gICAgcGFyYW1zLnBhcnRpY2xlX2xpZmV0aW1lID0gMy4wO1xyXG4gICAgcGFyYW1zLm5vX2ZhZGVfY29sb3IgPSBmYWxzZTtcclxuICAgIHBhcmFtcy5wcmVfYWxwaGEgPSB0cnVlO1xyXG4gICAgcGFyYW1zLmRlcHRoX3Rlc3QgPSB0cnVlO1xyXG4gICAgcGFyYW1zLmRlcHRoX3dyaXRlID0gZmFsc2U7XHJcbiAgICBwYXJhbXMuY29sb3IgID0ge1wiclwiOjEsIFwiZ1wiOjEsIFwiYlwiOjF9O1xyXG5cdHBhcmFtcy5ibGVuZGluZyA9IFwib25lX2FscGhhXCI7XHJcbiAgICBwYXJhbXMuc2l6ZSA9IDE7XHJcbiAgICBwYXJhbXMuY291bnQgPSAxMDA7XHJcbiAgICBwYXJhbXMubmFtZSA9ICcnO1xyXG4gICAgcGFyYW1zLmJvdW5kaW5nX3JhZGl1cyA9IDIuMDtcclxuICAgIHBhcmFtcy5kaXNjcmV0ZV9lbWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgcGFyYW1zLmFwcGx5X3dvcmxkX21hdHJpeF9vbl9lbWl0ID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgZm9yKHZhciBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSl7XHJcbiAgICAgICAgICAgIGlmIChkYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zW2tleV0gPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHRwYXJhbXMuZW1pdHRlciA9IGRhdGEuZW1pdHRlciB8fCBuZXcgUGFydGljbGVfRW1pdHRlcigxKTtcclxuXHRwYXJhbXMuYWZmZWN0b3IgPSBkYXRhLmFmZmVjdG9yIHx8IG5ldyBQYXJ0aWNsZV9BZmZlY3RvcigpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gcGFyYW1zO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNldF9uYW1lID0gZnVuY3Rpb24gKG5hbWUpXHJcbntcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLm5vZGUubmFtZSA9IG5hbWU7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc3VpY2lkZSA9IGZ1bmN0aW9uICgpXHJcbntcclxuXHR0aGlzLm5vZGUucGFyZW50LnJlbW92ZSh0aGlzLm5vZGUpO1xyXG4gICAgbWFpbl9ldmVudF9odWIuZW1pdChcImtpbGxfbWVcIiwgdGhpcyk7XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZV9wYXJ0aWNsZV9kYXRhID0gZnVuY3Rpb24gKGNvdW50KVxyXG57XHJcbiAgICB2YXIgcGFydGljbGVfZGF0YSA9IG5ldyBBcnJheShjb3VudCk7XHJcbiAgICB2YXIgcDtcclxuICAgIGZvcih2YXIgaSA9MDtpIDwgY291bnQ7IGkrKykge1xyXG5cdFx0cCA9IHt9O1xyXG5cdFx0cC5wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsMCwwKTtcclxuXHRcdHAudmVsb2NpdHkgPSBuZXcgVEhSRUUuVmVjdG9yMygwLDAsMCk7XHJcblx0XHRwLmxpZmV0aW1lID0gMDsgICAgICAgIFxyXG5cdFx0cGFydGljbGVfZGF0YVtpXSA9IHA7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhcnRpY2xlX2RhdGEgPSBwYXJ0aWNsZV9kYXRhO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZV9wYXJ0aWNsZV9nZW9tZXRyeSA9IGZ1bmN0aW9uKGNvdW50KVxyXG57XHJcbiAgICB0aGlzLmNyZWF0ZV9wYXJ0aWNsZV9kYXRhKGNvdW50KTtcclxuICAgIFxyXG5cdHZhciB2ZXJ0aWNlcyA9IG5ldyBGbG9hdDMyQXJyYXkoY291bnQgKiAzKTsgLy8gcG9zaXRpb25cclxuXHR2YXIgY29sb3JzID0gbmV3IEZsb2F0MzJBcnJheShjb3VudCAqIDMpO1xyXG5cdHZhciBwYXJhbXMgPSBuZXcgRmxvYXQzMkFycmF5KGNvdW50KTtcclxuXHRcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cdFx0Ly9jcmVhdGUgcGFydGljbGVcclxuXHRcdHZlcnRpY2VzW2kqM10gPSAwO1xyXG5cdFx0dmVydGljZXNbaSozKzFdID0gMDtcclxuXHRcdHZlcnRpY2VzW2kqMysyXSA9IDA7XHJcblxyXG5cdFx0cGFyYW1zW2ldID0gMC4wO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtcy5jb2xvcl9kb21haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuY29sb3JfZG9tYWluLmZpbGwoY29sb3JzLCBpKjMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbG9yc1tpKjNdID0gdGhpcy5wYXJhbXMuY29sb3IucjtcclxuICAgICAgICAgICAgY29sb3JzW2kqMysxXSA9IHRoaXMucGFyYW1zLmNvbG9yLmc7XHJcbiAgICAgICAgICAgIGNvbG9yc1tpKjMrMl0gPSB0aGlzLnBhcmFtcy5jb2xvci5iO1xyXG4gICAgICAgfVxyXG5cdH1cclxuXHJcblx0dGhpcy5nZW9tZXRyeSA9IHt9O1xyXG5cdHRoaXMuZ2VvbWV0cnkudmVydGljZXMgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHZlcnRpY2VzLCAzKS5zZXREeW5hbWljKHRydWUpO1xyXG5cdHRoaXMuZ2VvbWV0cnkuY29sb3JzID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShjb2xvcnMsIDMpXHJcblx0aWYgKHRoaXMuZHluYW1pY19jb2xvcikge1xyXG5cdFx0dGhpcy5nZW9tZXRyeS5jb2xvcnMuc2V0RHluYW1pYyh0cnVlKTtcclxuXHR9XHJcblx0dGhpcy5nZW9tZXRyeS5wYXJhbXMgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBhcmFtcywgMSkuc2V0RHluYW1pYyh0cnVlKTtcclxuXHR2YXIgZ2VvbSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpOyBcdFxyXG5cdHRoaXMuZ2VvbWV0cnkuYnVmZmVyID0gZ2VvbTtcdFxyXG5cdGdlb20uYWRkQXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuZ2VvbWV0cnkudmVydGljZXMpO1xyXG5cdGdlb20uYWRkQXR0cmlidXRlKCdjb2xvcicsIHRoaXMuZ2VvbWV0cnkuY29sb3JzKTtcclxuXHRnZW9tLmFkZEF0dHJpYnV0ZSgncGFyYW1zJywgdGhpcy5nZW9tZXRyeS5wYXJhbXMpO1x0XHJcblxyXG4gICAgcmV0dXJuIGdlb207XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmRpc2NyZXRlX2VtaXQgPSBmdW5jdGlvbiAoY291bnQpXHJcbntcclxuICAgIHRoaXMuZW1pdF9wYXJ0aWNsZXMoMCwgY291bnQpO1xyXG5cdHRoaXMuZ2VvbWV0cnkudmVydGljZXMubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cdHRoaXMuZ2VvbWV0cnkucGFyYW1zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHR0aGlzLmdlb21ldHJ5LmNvbG9ycy5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmVtaXRfcGFydGljbGVzID0gZnVuY3Rpb24gKGR0LCBuZWVkX2VtaXQpXHJcbntcclxuXHQvL2VtaXQgcGFydGljbGVzXHJcblx0dmFyIHA7XHJcblx0dmFyIHZlcnRzID0gdGhpcy5nZW9tZXRyeS52ZXJ0aWNlcy5hcnJheTtcclxuXHR2YXIgcGFyYW1zID0gdGhpcy5nZW9tZXRyeS5wYXJhbXMuYXJyYXk7XHJcblx0XHJcbiAgICB2YXIgb2xkX25lZWRfZW1pdCA9IG5lZWRfZW1pdDtcclxuICAgIHRoaXMubm9kZS51cGRhdGVNYXRyaXhXb3JsZCh0cnVlKTtcclxuICAgIHZhciBtYXRyaXggPSB0aGlzLm5vZGUubWF0cml4V29ybGQ7XHJcblx0Zm9yKHZhciBpID0wOyBpIDwgdGhpcy5wYXJ0aWNsZV9kYXRhLmxlbmd0aCAmJiBuZWVkX2VtaXQgPiAwOyBpKyspIHtcclxuXHRcdGlmICghKHBhcmFtc1tpXSA+IDApKSB7XHJcbiAgICAgICAgXHJcblx0XHRcdHAgPSB0aGlzLnBhcnRpY2xlX2RhdGFbaV07XHJcblx0XHRcdHRoaXMuZW1pdHRlci5lbWl0KHAsIG51bGwsIG1hdHJpeCk7XHJcblx0XHRcdHAubGlmZXRpbWUgPSB0aGlzLnBhcnRpY2xlX2xpZmV0aW1lO1xyXG4gICAgICAgICAgICBcclxuXHRcdFx0dmVydHNbaSozXSA9IHAucG9zaXRpb24ueDtcclxuXHRcdFx0dmVydHNbaSozKzFdID0gcC5wb3NpdGlvbi55O1xyXG5cdFx0XHR2ZXJ0c1tpKjMrMl0gPSBwLnBvc2l0aW9uLno7XHJcblx0XHRcdHBhcmFtc1tpXSA9IHAubGlmZXRpbWU7XHJcblx0XHRcdG5lZWRfZW1pdC0tO1xyXG5cdFx0XHQvL2NvbG9yc1tpKjNdID0gdGhpcy5wYXJhbXMuY29sb3IuclxyXG5cdFx0XHQvL2NvbG9yc1tpKjMrMV0gPSB0aGlzLnBhcmFtcy5jb2xvci5nO1xyXG5cdFx0XHQvL2NvbG9yc1tpKjMrMl0gPSB0aGlzLnBhcmFtcy5jb2xvci5iO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIC8vY29uc29sZS5sb2coXCJjcmVhdGVkIG5ldyBwYXJ0aWNsZXMgXCIsIG9sZF9uZWVkX2VtaXQgLSBuZWVkX2VtaXQpO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnVwZGF0ZV9wYXJ0aWNsZV9nZW9tZXRyeSA9IGZ1bmN0aW9uIChkdClcclxue1xyXG5cdHZhciB2ZXJ0cyA9IHRoaXMuZ2VvbWV0cnkudmVydGljZXMuYXJyYXk7XHJcblx0dmFyIHBhcmFtcyA9IHRoaXMuZ2VvbWV0cnkucGFyYW1zLmFycmF5O1xyXG5cdHZhciBwO1xyXG5cdHZhciB2ZXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwwLDApO1xyXG5cdHZhciBkdW1teV9jb2xvciA9IHtcInJcIjoxLCBcImJcIjoxLCBcImdcIjoxfTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJ0aWNsZV9kYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHJcblx0XHRpZiAocGFyYW1zW2ldID4gMCkge1xyXG5cdFx0XHRwID0gdGhpcy5wYXJ0aWNsZV9kYXRhW2ldO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly9pbnRlZ3JhdGVcclxuXHRcdFx0cC5wb3NpdGlvbi54ICs9IHAudmVsb2NpdHkueCAqIGR0O1xyXG5cdFx0XHRwLnBvc2l0aW9uLnkgKz0gcC52ZWxvY2l0eS55ICogZHQ7XHJcblx0XHRcdHAucG9zaXRpb24ueiArPSBwLnZlbG9jaXR5LnogKiBkdDtcclxuXHRcdFx0cC5saWZldGltZSAtPSBkdDtcclxuXHRcdFx0XHJcblx0XHRcdGlmIChwLmxpZmV0aW1lIDw9IDAgfHwgIXRoaXMuYWZmZWN0b3IuYWZmZWN0KGR0LCBwLCB2ZXJ0LCBkdW1teV9jb2xvcikpIHtcclxuXHRcdFx0XHRwLmxpZmV0aW1lID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHRwYXJhbXNbaV0gPSBwLmxpZmV0aW1lO1x0XHRcdFxyXG5cdFx0XHR2ZXJ0c1tpKjNdID0gcC5wb3NpdGlvbi54O1xyXG5cdFx0XHR2ZXJ0c1tpKjMrMV0gPSBwLnBvc2l0aW9uLnk7XHJcblx0XHRcdHZlcnRzW2kqMysyXSA9IHAucG9zaXRpb24uejtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBhcmFtcy5kaXNjcmV0ZV9lbWlzc2lvbikge1xyXG4gICAgICAgIHZhciBuZWVkX2VtaXQgPSB0aGlzLmVtaXR0ZXIuY2FsY19lbWl0dGVkX3BhcnRpY2xlcyhkdCk7XHJcbiAgICAgICAgdGhpcy5lbWl0X3BhcnRpY2xlcyhkdCwgbmVlZF9lbWl0KTtcclxuICAgIH1cclxuXHRcclxuXHR0aGlzLmdlb21ldHJ5LnZlcnRpY2VzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHR0aGlzLmdlb21ldHJ5LnBhcmFtcy5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0dGhpcy5nZW9tZXRyeS5jb2xvcnMubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdClcclxue1xyXG5cdHRoaXMudXBkYXRlX3BhcnRpY2xlX2dlb21ldHJ5KGR0KTtcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuZ2VuZXJhdGVfbWF0ZXJpYWxfbmFtZSA9IGZ1bmN0aW9uICgpXHJcbntcclxuXHR2YXIgbXlfbmFtZSA9IFwiTVlfUEFSVElDTEVfTUFURVJJQUxcIjtcclxuXHRpZiAoISF0aGlzLnRleHR1cmUpIHtcclxuXHRcdG15X25hbWUgKz0gIFwiX1dJVEhfVEVYVFVSRVwiO1xyXG5cdH1cclxuXHRpZiAodGhpcy5wYXJhbXMubm9fZmFkZV9jb2xvcikge1xyXG5cdFx0bXlfbmFtZSArPSBcIl9OT19GQURFX0NPTE9SXCI7XHJcblx0fVxyXG5cdHJldHVybiBteV9uYW1lO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmJsZW5kaW5nX21vZGUgPSBcclxue1xyXG5cdFwiYWRkaXRpdmVcIjoge1xyXG5cdFx0XCJibGVuZFNyY1wiOiBUSFJFRS5PbmVGYWN0b3IsXHJcblx0XHRcImJsZW5kRHN0XCI6IFRIUkVFLk9uZUZhY3RvclxyXG5cdH0sXHJcblx0XCJhbHBoYVwiOiB7XHJcblx0XHRcImJsZW5kU3JjXCI6IFRIUkVFLlNyY0FscGhhRmFjdG9yLFxyXG5cdFx0XCJibGVuZERzdFwiOiBUSFJFRS5PbmVNaW51c1NyY0FscGhhRmFjdG9yXHJcblx0fSxcclxuXHRcIm9uZV9hbHBoYVwiOiB7XHJcblx0XHRcImJsZW5kU3JjXCI6IFRIUkVFLk9uZUZhY3RvcixcclxuXHRcdFwiYmxlbmREc3RcIjogVEhSRUUuT25lTWludXNTcmNBbHBoYUZhY3RvclxyXG5cdH0sXHJcblx0XCJhbHBoYV9vbmVcIjoge1xyXG5cdFx0XCJibGVuZFNyY1wiOiBUSFJFRS5TcmNBbHBoYUZhY3RvcixcclxuXHRcdFwiYmxlbmREc3RcIjogVEhSRUUuT25lRmFjdG9yXHJcblx0fVxyXG59O1xyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5jb252ZXJ0X2JsZW5kaW5nX21vZGUgPSBmdW5jdGlvbiAoYmxlbmRpbmcpXHJcbntcclxuICAgIHZhciB0aHJlZV9ibGVuZGluZztcclxuXHR2YXIgZmFjdG9ycyA9IHRoaXMuYmxlbmRpbmdfbW9kZVtcIm9uZV9hbHBoYVwiXTtcclxuICAgIGlmIChibGVuZGluZyA9PT0gJ25vJykge1xyXG4gICAgICAgIHRocmVlX2JsZW5kaW5nID0gVEhSRUUuTm9CbGVuZGluZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyZWVfYmxlbmRpbmcgPSBUSFJFRS5DdXN0b21CbGVuZGluZzsgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuYmxlbmRpbmdfbW9kZVtibGVuZGluZ10pIHtcclxuICAgICAgICAgICAgZmFjdG9ycyA9IHRoaXMuYmxlbmRpbmdfbW9kZVtibGVuZGluZ107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcImJsZW5kaW5nXCI6IHRocmVlX2JsZW5kaW5nLCBcImZhY3RvcnNcIjpmYWN0b3JzfTtcclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfdGV4dHVyZSA9IGZ1bmN0aW9uICh0ZXh0dXJlKVxyXG57XHJcblx0aWYgKHR5cGVvZiB0ZXh0dXJlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtcy50ZXh0dXJlID09PSB0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJhbXMudGV4dHVyZSA9IHRleHR1cmU7XHJcblx0XHR0aGlzLnRleHR1cmUgPSBNeV9MaWIuVGV4dHVyZV9NYW5hZ2VyLmdldCh0ZXh0dXJlKTtcclxuXHR9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJPaCBTaGl0ISB0ZXh0dXJlIGluIHNldF90ZXh0dXJlIGlzIG5vdCBzdHJpbmchIGl0J3Mgb2JqZWN0IG9yIHVuZGVmaW5lZCFcIiwgdGV4dHVyZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubWF0ZXJpYWwudW5pZm9ybXMuc3ByaXRlKSB7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5zcHJpdGUudmFsdWUgPSB0aGlzLnRleHR1cmU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy5zcHJpdGUgPSB7dmFsdWU6IHRleHR1cmV9O1xyXG4gICAgICAgIHRoaXMucmVjcmVhdGVfbWF0ZXJpYWwoKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiT2ggU2hpdCEgT3VyIHNoYWRlciBoYXMgbm90IHRleHR1cmUhIE5lZWQgY3JlYXRlIHNoYWRlciB3aXRoIHRleHR1cmUhXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5jcmVhdGVfdW5pZm9ybXMgPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICB2YXIgdW5pZm9ybXMgPSBcclxuICAgIHtcclxuICAgICAgICBcImxpZmV0aW1lXCI6IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucGFydGljbGVfbGlmZXRpbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicG9pbnRfc2l6ZVwiOiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnBhcmFtcy5zaXplXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjcmVlbl9zaXplXCI6IHtcclxuICAgICAgICAgICAgdmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKE15X0xpYi5WaWV3cG9ydC53aWR0aCwgTXlfTGliLlZpZXdwb3J0LmhlaWdodClcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgaWYgKCEhdGhpcy50ZXh0dXJlKSB7XHJcbiAgICAgICAgdW5pZm9ybXNbXCJzcHJpdGVcIl0gPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnRleHR1cmVcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgaWYgKCF0aGlzLmR5bmFtaWNfY29sb3IpIHtcclxuICAgICAgICB1bmlmb3Jtc1tcInBhcnRpY2xlX2NvbG9yXCJdID0ge3ZhbHVlOiB0aGlzLnBhcmFtcy5jb2xvcn07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5pZm9ybXM7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuY2FsY19kZWZpbmVzID0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgdmFyIGRlZmluZXMgPSB7fTtcclxuICAgIGlmICh0aGlzLnBhcmFtcy5wcmVfYWxwaGEpIHtcclxuICAgICAgICBkZWZpbmVzW1wiUFJFX0FMUEhBXCJdID0gdHJ1ZTtcclxuICAgIH1cclxuXHRpZiAoISF0aGlzLnRleHR1cmUpIHtcclxuICAgICAgICBkZWZpbmVzW1wiUEFSVElDTEVfVEVYVFVSRVwiXSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wYXJhbXMubm9fZmFkZV9jb2xvcikge1xyXG4gICAgICAgIGRlZmluZXNbXCJOT19GQURFX0NPTE9SXCJdID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBhcmFtcy5jb2xvcl9kb21haW4pIHtcclxuICAgICAgICBkZWZpbmVzW1wiRFlOQU1JQ19DT0xPUlNcIl0gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZmluZXM7XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNlbGVjdF90ZXh0dXJlID0gZnVuY3Rpb24gKHRleHR1cmUpXHJcbntcclxuXHRpZiAodHlwZW9mIHRoaXMudGV4dHVyZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdHRoaXMudGV4dHVyZSA9IE15X0xpYi5UZXh0dXJlX01hbmFnZXIuZ2V0KHRoaXMudGV4dHVyZSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRleHR1cmUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk9oLCBub3QgZm91bmQgdGV4dHVyZSA8XCIgKyB0aGlzLnBhcmFtcy50ZXh0dXJlICsgXCI+IGluIGNyZWF0ZSBwYXJ0aWNsZSBtYXRlcmlhbCEgSW5zdGVhZCBnZXQgXCIrdGhpcy50ZXh0dXJlKTtcclxuICAgICAgICB9XHJcblx0fVxyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZV9wYXJ0aWNsZV9tYXRlcmlhbCA9IGZ1bmN0aW9uKClcclxue1xyXG5cdFxyXG4gICAgdGhpcy5zZWxlY3RfdGV4dHVyZSh0aGlzLnRleHR1cmUpO1xyXG4gICAgXHJcbiAgICB2YXIgYmxlbmRfb2JqID0gdGhpcy5jb252ZXJ0X2JsZW5kaW5nX21vZGUodGhpcy5wYXJhbXMuYmxlbmRpbmcpO1xyXG4gICAgXHJcbiAgICBcclxuICAgIHZhciB1bmlmb3JtcyA9IHRoaXMuY3JlYXRlX3VuaWZvcm1zKCk7XHJcbiAgICB2YXIgZGVmaW5lcyA9IHRoaXMuY2FsY19kZWZpbmVzKCk7XHJcbiAgICBcclxuXHR2YXIgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKHtcclxuXHRcdHRyYW5zcGFyZW50OiB0cnVlLFxyXG5cdFx0ZGVwdGhXcml0ZTogdGhpcy5wYXJhbXMuZGVwdGhfd3JpdGUsXHJcblx0XHRkZXB0aFRlc3Q6IHRoaXMucGFyYW1zLmRlcHRoX3Rlc3QsXHJcbiAgICAgICAgYmxlbmRpbmc6IGJsZW5kX29iai5ibGVuZGluZyxcclxuICAgICAgICBibGVuZFNyYzogYmxlbmRfb2JqLmZhY3RvcnMuYmxlbmRTcmMsXHJcbiAgICAgICAgYmxlbmREc3Q6IGJsZW5kX29iai5mYWN0b3JzLmJsZW5kRHN0LFxyXG5cdFx0ZGVmaW5lczogZGVmaW5lcyxcclxuXHRcdHVuaWZvcm1zOiB1bmlmb3JtcyxcclxuXHRcdHZlcnRleFNoYWRlcjogUGFydGljbGVfU2hhZGVycy52ZXJ0ZXgsXHJcblx0XHRmcmFnbWVudFNoYWRlcjogUGFydGljbGVfU2hhZGVycy5mcmFnbWVudFxyXG5cdH0pO1xyXG5cdHJldHVybiBtYXQ7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUucmVjcmVhdGVfbWF0ZXJpYWwgPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICB0aGlzLm5vZGUubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsID0gdGhpcy5jcmVhdGVfcGFydGljbGVfbWF0ZXJpYWwoKTtcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X3ByZV9hbHBoYSA9IGZ1bmN0aW9uIChwcmVfYWxwaGEpXHJcbntcclxuICAgIGlmICh0aGlzLnBhcmFtcy5wcmVfYWxwaGEgIT09ICEhcHJlX2FscGhhKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMucHJlX2FscGhhID0gcHJlX2FscGhhO1xyXG4gICAgICAgIHRoaXMucmVjcmVhdGVfbWF0ZXJpYWwoKTtcclxuICAgIH1cclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfcG9pbnRfc2l6ZSA9IGZ1bmN0aW9uIChzaXplKVxyXG57XHJcbiAgICBpZiAodGhpcy5wYXJhbXMuc2l6ZSAhPSBzaXplKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5ub2RlLm1hdGVyaWFsLnVuaWZvcm1zW1wicG9pbnRfc2l6ZVwiXS52YWx1ZSA9IHNpemU7XHJcbiAgICB9XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X2JsZW5kaW5nID0gZnVuY3Rpb24gKGJsZW5kaW5nKVxyXG57XHJcbiAgICB0aGlzLnBhcmFtcy5ibGVuZGluZyA9IGJsZW5kaW5nO1xyXG4gICAgdmFyIGIgPSB0aGlzLmNvbnZlcnRfYmxlbmRpbmdfbW9kZShibGVuZGluZyk7XHJcbiAgICB0aGlzLm1hdGVyaWFsLmJsZW5kaW5nID0gYi5ibGVuZGluZztcclxuICAgIHRoaXMubWF0ZXJpYWwuYmxlbmRTcmMgPSBiLmZhY3RvcnMuYmxlbmRTcmM7XHJcbiAgICB0aGlzLm1hdGVyaWFsLmJsZW5kRHN0ID0gYi5mYWN0b3JzLmJsZW5kRHN0O1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpXHJcbntcclxuXHR2YXIgZGF0YSA9IHt9O1xyXG4gICAgZGF0YS51dWlkID0gdGhpcy51dWlkO1xyXG4gICAgZGF0YS5ub2RlID0gdGhpcy5ub2RlLnV1aWQ7XHJcbiAgICBpZiAodGhpcy5uYW1lIHx8IHRoaXMubm9kZS5uYW1lKSB7XHJcbiAgICAgICAgZGF0YS5uYW1lID0gdGhpcy5uYW1lIHx8IHRoaXMubm9kZS5uYW1lO1xyXG4gICAgfVxyXG5cdGRhdGEucGFyYW1zID0ge307XHJcblx0aWYgKHRoaXMucGFyYW1zKSB7XHJcblx0XHRfLmNvcHlfb2JqZWN0KGRhdGEucGFyYW1zLCB0aGlzLnBhcmFtcyk7XHJcblx0fVxyXG5cdGRhdGEucGFyYW1zLmVtaXR0ZXIgPSB0aGlzLmVtaXR0ZXIudG9KU09OKCk7XHJcblx0ZGF0YS5wYXJhbXMuYWZmZWN0b3IgPSB0aGlzLmFmZmVjdG9yLnRvSlNPTigpO1xyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfZW1pdHRlciA9IGZ1bmN0aW9uIChlbWl0dGVyKVxyXG57XHJcbiAgICB0aGlzLmVtaXR0ZXIgPSB0aGlzLnBhcmFtcy5lbWl0dGVyID0gZW1pdHRlcjtcclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfcGFydGljbGVfbGlmZV9sZW5ndGggPSBmdW5jdGlvbiAodmFsKVxyXG57XHJcblx0aWYgKHZhbCAhPT0gdGhpcy5wYXJhbXMucGFydGljbGVfbGlmZXRpbWUpIHtcclxuXHRcdHRoaXMucGFyYW1zLnBhcnRpY2xlX2xpZmV0aW1lID0gdGhpcy5wYXJ0aWNsZV9saWZldGltZSA9IHZhbDtcclxuXHRcdHRoaXMubWF0ZXJpYWwudW5pZm9ybXNbJ2xpZmV0aW1lJ10udmFsdWUgPSB2YWw7XHJcblx0fVxyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNldF9lbWlzc2lvbl9wZXJfc2Vjb25kID0gZnVuY3Rpb24gKHZhbClcclxue1xyXG5cdHRoaXMuZW1pdHRlci5lbWl0X3Blcl9zZWNvbmQgPSB2YWw7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X3BhcnRpY2xlX2NvdW50ID0gZnVuY3Rpb24gKGNvdW50KVxyXG57XHJcblx0aWYgKGNvdW50ICE9PSB0aGlzLnBhcnRpY2xlX2RhdGEubGVuZ3RoKSB7XHJcblx0XHR0aGlzLnBhcmFtcy5jb3VudCA9IGNvdW50O1xyXG5cdFx0dGhpcy5ub2RlLmdlb21ldHJ5ID0gdGhpcy5jcmVhdGVfcGFydGljbGVfZ2VvbWV0cnkoY291bnQpO1xyXG5cdH1cclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfY29sb3IgPSBmdW5jdGlvbiAoY29sb3IpXHJcbntcclxuICAgIHRoaXMucGFyYW1zLmNvbG9yLnIgPSBjb2xvci5yO1xyXG4gICAgdGhpcy5wYXJhbXMuY29sb3IuZyA9IGNvbG9yLmc7XHJcbiAgICB0aGlzLnBhcmFtcy5jb2xvci5iID0gY29sb3IuYjtcclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfYm91bmRpbmdfc3BoZXJlX3JhZGl1cyA9IGZ1bmN0aW9uIChyYWRpdXMpXHJcbntcclxuICAgIHRoaXMubm9kZS5ib3VuZGluZ1NwaGVyZS5yYWRpdXMgPSByYWRpdXM7XHJcbn1cclxuXHJcbmV4cG9ydCB7UGFydGljbGVfU3lzdGVtfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlcy5qcyIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuLi9iYXNlL215X2xpYi5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVfRW1pdHRlcn0gZnJvbSAnLi9wYXJ0aWNsZV9lbWl0dGVyLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9BZmZlY3Rvcn0gZnJvbSAnLi9wYXJ0aWNsZV9hZmZlY3Rvci5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVzX1BvaW50c30gZnJvbSAnLi9wYXJ0aWNsZXNfcG9pbnRzLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9TeXN0ZW19IGZyb20gJy4vcGFydGljbGVzLmpzJztcclxuXHJcblxyXG4gZnVuY3Rpb24gUGFydGljbGVfTWFuYWdlciAoKVxyXG57XHJcblx0dGhpcy5wYXJ0aWNsZXMgPSB7fTtcclxuICAgIHRoaXMucGFydGljbGVzX2FycmF5ID0gW107XHJcbn1cclxuXHJcbl8uY29weV9vYmplY3QoUGFydGljbGVfTWFuYWdlci5wcm90b3R5cGUsIFxyXG4gICAge1xyXG4gICAgY29uc3RydWN0b3I6IFBhcnRpY2xlX01hbmFnZXIsXHJcbiAgICBhZGQ6ICBmdW5jdGlvbiAocHMsbmFtZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMucGFydGljbGVzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzW25hbWVdID0gcHM7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzX2FycmF5LnB1c2gocHMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmVfcGFydGljbGVzOiAgZnVuY3Rpb24gKG5hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHBzID0gdGhpcy5wYXJ0aWNsZXNbbmFtZV07XHJcbiAgICAgICAgdmFyIGkgPSB0aGlzLnBhcnRpY2xlc19hcnJheS5pbmRleE9mKHBzKTtcclxuICAgICAgICBpZiAoaSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzX2FycmF5LnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBzKSB7XHJcbiAgICAgICAgICAgIHBzLnN1aWNpZGUoKTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMucGFydGljbGVzW25hbWVdO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRfcGFydGljbGVfbmFtZXM6ICBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMucGFydGljbGVzKSB7XHJcbiAgICAgICAgICAgIG5hbWVzLnB1c2goa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hbWVzO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgOiBmdW5jdGlvbiAoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFydGljbGVzX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzX2FycmF5W2ldLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgY3JlYXRlX2J5X3BhcmFtczogZnVuY3Rpb24gKHBhcmFtcylcclxuICAgIHtcclxuICAgICAgICB2YXIgcHMgPSBuZXcgUGFydGljbGVfU3lzdGVtKHBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5hZGQocHMpO1xyXG4gICAgICAgIHJldHVybiBwcztcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHRvSlNPTiA6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFyciA9IFtdXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGRhdGE7XHJcbiAgICAgICAgdmFyIHA7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5wYXJ0aWNsZXMpe1xyXG4gICAgICAgICAgICBwID0gdGhpcy5wYXJ0aWNsZXNba2V5XTtcclxuICAgICAgICAgICAgaWYgKHAudXVpZCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHAudG9KU09OKCk7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH0sXHJcblxyXG4gICAgZW1pdHRlcl9mYWJyaWM6ICBmdW5jdGlvbiAocGFyYW1zKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChwYXJhbXMuZW1pdHRlcikge1xyXG4gICAgICAgICAgICB2YXIgZW1pdHRlciA9IE15X0xpYi5HZXRfQ2xhc3MocGFyYW1zLmVtaXR0ZXIubmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChlbWl0dGVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyID0gbmV3IGVtaXR0ZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIgPSBuZXcgUGFydGljbGVfRW1pdHRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVtaXR0ZXIucGFyc2UocGFyYW1zLmVtaXR0ZXIucGFyYW1zKTtcclxuICAgICAgICAgICAgcmV0dXJuIGVtaXR0ZXI7ICAgICAgICBcclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGFmZmVjdG9yX2ZhYnJpYzogIGZ1bmN0aW9uIChwYXJhbXMpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hZmZlY3Rvcikge1xyXG4gICAgICAgICAgICB2YXIgYWZmZWN0b3IgPSBNeV9MaWIuR2V0X0NsYXNzKHBhcmFtcy5hZmZlY3Rvci5uYW1lKTtcclxuICAgICAgICAgICAgaWYgKGFmZmVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBhZmZlY3RvciA9IG5ldyBhZmZlY3RvcigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWZmZWN0b3IgPSBuZXcgUGFydGljbGVfQWZmZWN0b3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZmZlY3Rvci5wYXJzZShwYXJhbXMuYWZmZWN0b3IucGFyYW1zKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFmZmVjdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSxcclxuXHJcbiAgICBmcm9tSlNPTjogZnVuY3Rpb24gKGpzb24sIGNhbGxiYWNrLCByb290LCBuYW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcnRpY2xlc1tuYW1lXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkcgUGFydGljbGUgTWFuYWdlciEgUGFydGljbGUgU3lzdGVtIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzXCIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0cnlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShqc29uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHBhcnNpbmcganNvbiBvbiBcIiwgbmFtZSwganNvbik7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGRhdGEsIHJvb3QsIG5hbWUpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChkYXRhLCByb290LCBuYW1lKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBlbWl0dGVyID0gdGhpcy5lbWl0dGVyX2ZhYnJpYyhkYXRhLnBhcmFtcyk7XHJcbiAgICAgICAgdmFyIGFmZmVjdG9yID0gdGhpcy5hZmZlY3Rvcl9mYWJyaWMoZGF0YS5wYXJhbXMpO1xyXG4gICAgICAgIGRhdGEucGFyYW1zLmVtaXR0ZXIgPSBlbWl0dGVyO1xyXG4gICAgICAgIGRhdGEucGFyYW1zLmFmZmVjdG9yID0gYWZmZWN0b3I7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHBzID0gbmV3IFBhcnRpY2xlX1N5c3RlbShkYXRhLnBhcmFtcyk7XHJcbiAgICAgICAgcHMuc2V0X25hbWUoZGF0YS5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgIC8vYWRkIHRvIHNjZW5lIGdyYXBoXHJcbiAgICAgICAgaWYgKGRhdGEucGFyYW1zLnBhcmVudCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gcm9vdC5nZXRPYmplY3RCeU5hbWUoZGF0YS5wYXJhbXMucGFyZW50KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhLnBhcmFtcy5wYXJlbnQsIFwicGFyZW50IHBhcnRpY2xlc1wiLCBuYW1lLCByb290KTtcclxuICAgICAgICAgICAgcGFyZW50LmFkZChwcy5ub2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgIHJvb3QuYWRkKHBzLm5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy91Z2x5IGZ1Y2tpbmcgaGFja1xyXG4gICAgICAgIC8vY29weSBub2RlIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLmFkZChwcywgbmFtZSk7ICAgIFxyXG4gICAgICAgIHJldHVybiBwcztcclxuICAgIH0sXHJcblxyXG4gICAgbG9hZF9wYXJ0aWNsZXM6ICBmdW5jdGlvbiAoanNvbiwgcm9vdClcclxuICAgIHtcclxuICAgICAgICB2YXIgcGFydGljbGVzID0ganNvbi5wYXJ0aWNsZXM7XHJcbiAgICAgICAgZm9yKHZhciBpID0wOyBpIDwgcGFydGljbGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHAgPSBwYXJ0aWNsZXNbaV07XHJcbiAgICAgICAgICAgIHZhciBwcyA9IHRoaXMucGFyc2UocCwgcm9vdCwgcC5uYW1lKTtcclxuICAgICAgICAgICAgcHMubm9kZS51dWlkID0gcC5ub2RlO1xyXG4gICAgICAgICAgICBwcy5ub2RlLm5hbWUgPSBwLm5hbWU7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSByb290LmdldE9iamVjdEJ5UHJvcGVydHkoXCJ1dWlkXCIsIHAubm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChvYmopIHtcclxuICAgICAgICAgICAgICAgIHBzLm5vZGUucmVwbGFjZV9vYmplY3Rfd2l0aF90aGlzKG9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZV9uYW1lOiAgZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICB2YXIgbnVtYmVyID0gdGhpcy5wYXJ0aWNsZXNfYXJyYXkubGVuZ3RoICsgMTtcclxuICAgICAgICB2YXIgYmVnaW5fbmFtZSA9ICdQYXJ0aWNsZV9TeXN0ZW1fJztcclxuICAgICAgICB2YXIgdGVzdGluZyA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUgKHRlc3RpbmcpIHtcclxuICAgICAgICAgICAgbmFtZSA9IGJlZ2luX25hbWUgKyBudW1iZXI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnRpY2xlc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBudW1iZXIgKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlX25ldyA6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmNyZWF0ZV9uYW1lKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgIHZhciBwcyA9IG5ldyBQYXJ0aWNsZV9TeXN0ZW0ocGFyYW1zKTtcclxuICAgICAgICBwcy5zZXRfbmFtZShuYW1lKTtcclxuICAgICAgICB0aGlzLmFkZChwcywgbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHBzO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5pZiAoTXlfTGliLnBhcnRpY2xlX21hbmFnZXIgPT09IHVuZGVmaW5lZCkgXHJcbntcclxuICAgIE15X0xpYi5wYXJ0aWNsZV9tYW5hZ2VyID0gbmV3IFBhcnRpY2xlX01hbmFnZXIoKTtcclxufVxyXG5cclxuTXlfTGliLlBhcnRpY2xlc19Db25maWcgPSB7XHJcblwiYm94X3NpemVcIjogMTBcclxufTtcclxuXHJcblxyXG5leHBvcnQge1BhcnRpY2xlX01hbmFnZXJ9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVzX21hbmFnZXIuanMiLCJ2YXIgUG9pbnRfR2VuZXJhdG9ycyA9IHt9O1xyXG5cclxuXHJcblBvaW50X0dlbmVyYXRvcnMuUmFuZG9tX0RpcmVjdGlvbiA9IGZ1bmN0aW9uICgpXHJcbntcclxufVxyXG5cclxuUG9pbnRfR2VuZXJhdG9ycy5SYW5kb21fRGlyZWN0aW9uLnByb3RvdHlwZS5nZXRfZGlyZWN0aW9uID0gZnVuY3Rpb24gKHZlY3Rvcilcclxue1xyXG5cdHZlY3Rvci54ID0gTWF0aC5yYW5kb20oKTsgXHJcblx0dmVjdG9yLnkgPSBNYXRoLnJhbmRvbSgpOyBcclxuXHR2ZWN0b3IueiA9IE1hdGgucmFuZG9tKCk7XHJcbn1cclxuXHJcblBvaW50X0dlbmVyYXRvcnMuU3BoZXJlID0gZnVuY3Rpb24gKHJhZGl1cylcclxue1xyXG5cdHRoaXMucmFkaXVzID0gcmFkaXVzO1xyXG59XHJcblxyXG5Qb2ludF9HZW5lcmF0b3JzLlNwaGVyZS5wcm90b3R5cGUuZ2V0X2lubmVyX3BvaW50ID0gZnVuY3Rpb24gKHZlY3Rvcilcclxue1xyXG5cdHZhciBhbHBoYSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcclxuXHR2YXIgYmV0YSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJO1xyXG5cdHZlY3Rvci54ID0gTWF0aC5jb3MoYWxwaGEpICogTWF0aC5zaW4oYmV0YSk7XHJcblx0dmVjdG9yLnkgPSBNYXRoLmNvcyhiZXRhKTtcclxuXHR2ZWN0b3IueiA9IE1hdGguc2luKGFscGhhKSAqIE1hdGguc2luKGJldGEpO1xyXG59XHJcblxyXG5Qb2ludF9HZW5lcmF0b3JzLlNwaGVyZS5wcm90b3R5cGUuZ2V0X25vcm1hbCA9IGZ1bmN0aW9uICh2ZWN0b3IpXHJcbntcclxuXHR2ZWN0b3IueCA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcclxuXHR2ZWN0b3IueSA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcclxuXHR2ZWN0b3IueiA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcclxuXHR2ZWN0b3Iubm9ybWFsaXplKCk7XHJcbn1cclxuXHJcblBvaW50X0dlbmVyYXRvcnMuU3BoZXJlLnByb3RvdHlwZS5nZXRfcG9pbnQgPSBmdW5jdGlvbiAodmVjdG9yKSBcclxue1xyXG5cdHRoaXMuZ2V0X25vcm1hbCh2ZWN0b3IpO1xyXG5cdHZlY3Rvci5tdWx0aXBseVNjYWxhcih0aGlzLnJhZGl1cyk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQge1BvaW50X0dlbmVyYXRvcnN9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvcG9pbnRfZ2VuZXJhdG9ycy5qcyIsImV4cG9ydCAqIGZyb20gJy4vYmFzZS9ldmVudF9odWIuanMnO1xyXG5cclxuZXhwb3J0IHtNeV9MaWJ9IGZyb20gJy4vYmFzZS9teV9saWIuanMnO1xyXG5cclxuZXhwb3J0IHtCYXNlX0FuaW1hdGlvbiwgRXVsZXJfQW5pbWF0aW9uLCBTY2FsZV9BbmltYXRpb259IGZyb20gJy4vYmFzZS9hbmltYXRpb25zLmpzJztcclxuZXhwb3J0IHtNb3VzZV9JbnRlcnNlY3Rvcn0gZnJvbSAnLi9iYXNlL21vdXNlX2ludGVyc2VjdG9yLmpzJztcclxuZXhwb3J0IHtMb2FkaW5nX01hbmFnZXJ9IGZyb20gJy4vYmFzZS9sb2FkaW5nX21hbmFnZXIuanMnO1xyXG5leHBvcnQge1BhY2thZ2VfTWFuYWdlcn0gZnJvbSAnLi9iYXNlL3BhY2thZ2VfbWFuYWdlci5qcyc7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQge1BhcnRpY2xlc19Qb2ludHN9IGZyb20gJy4vcGFydGljbGVzL3BhcnRpY2xlc19wb2ludHMuanMnO1xyXG5leHBvcnQge1BhcnRpY2xlX0VtaXR0ZXJ9IGZyb20gJy4vcGFydGljbGVzL3BhcnRpY2xlX2VtaXR0ZXIuanMnO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9Gb3JjZXN9IGZyb20gJy4vcGFydGljbGVzL2ZvcmNlcy5qcyc7XHJcblxyXG5leHBvcnQge1BhcnRpY2xlX0FmZmVjdG9yfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZV9hZmZlY3Rvci5qcyc7XHJcblxyXG5leHBvcnQge1BvaW50X0dlbmVyYXRvcnN9IGZyb20gJy4vcGFydGljbGVzL3BvaW50X2dlbmVyYXRvcnMuanMnO1xyXG5cclxuZXhwb3J0IHtDdXN0b21fRW1pdHRlcn0gZnJvbSAnLi9wYXJ0aWNsZXMvY3VzdG9tX2VtaXR0ZXIuanMnO1xyXG5cclxuZXhwb3J0IHtDdXN0b21fQWZmZWN0b3J9IGZyb20gJy4vcGFydGljbGVzL2N1c3RvbV9hZmZlY3Rvci5qcyc7XHJcblxyXG5leHBvcnQge0NvbmVfRW1pdHRlciwgU3Rhcl9EdXN0X0VtaXR0ZXIsIFNwaGVyZV9FbWl0dGVyLCBTdGFyX0R1c3RfQWZmZWN0b3J9IGZyb20gJy4vcGFydGljbGVzL3Rlc3RfZW1pdHRlcnMuanMnO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9TaGFkZXJzfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZV9zaGFkZXJzLmpzJztcclxuXHJcbmV4cG9ydCB7UGFydGljbGVfU3lzdGVtfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZXMuanMnO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9NYW5hZ2VyfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZXNfbWFuYWdlci5qcyc7XHJcblxyXG5leHBvcnQge1NjZW5lX1NlcmlhbGl6ZXJ9IGZyb20gJy4vYmFzZS9zY2VuZV9zZXJpYWxpemVyLmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi9taXhpbnMvdGhyZWVqc19taXhpbnMuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL21peGlucy9jYW1lcmFfbWl4aW4uanMnO1xyXG5cclxuZXhwb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSAnLi9hcHAvYXBwbGljYXRpb24uanMnO1xyXG5cclxuZXhwb3J0IHtDb2xvcl9Eb21haW4sIFRhYmxlX0NvbG9yfSBmcm9tICcuL3BhcnRpY2xlcy9jb2xvcl9kb21haW4uanMnO1xyXG5cclxuZXhwb3J0IHtNb3VzZV9DYW1lcmFfQ29udHJvbGxlcn0gZnJvbSAnLi9iYXNlL21vdXNlX2NhbWVyYV9jb250cm9sbGVyLmpzJztcclxuZXhwb3J0IHtTaW1wbGVfQ29sbGlkZXJ9IGZyb20gJy4vYmFzZS9zaW1wbGVfY29sbGlkZXIuanMnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbmdpbmVfbWFpbl93ZWJwYWNrLmpzIiwiZXhwb3J0IHtjcmVhdGVfdnVlX2FwcH0gZnJvbSAnLi9ndWkvdnVlYXBwLmpzJztcclxuZXhwb3J0IHtDb2xvcl9QaWNrZXJ9IGZyb20gJy4vZ3VpL2NvbG9yX3BpY2tlci5qcyc7XHJcbmV4cG9ydCB7VGV4dHVyZV9QYW5lbH0gZnJvbSAnLi9ndWkvdGV4dHVyZV9wYW5lbC5qcyc7XHJcbmV4cG9ydCB7UGFydGljbGVzX1Byb3BzfSBmcm9tICcuL2d1aS9wYXJ0aWNsZXNfcHJvcHMuanMnO1xyXG5leHBvcnQge1BhcnRpY2xlc19QYW5lbH0gZnJvbSAnLi9ndWkvcGFydGljbGVzX3BhbmVsLmpzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ3VpX21haW5fd2VicGFjay5qcyIsIi8qXHJcbm1haW4gY2xhc3NcclxudGhpcyBoYXMgYWJzdHJhY3QgdmlydHVhbCBtZXRob2RzXHJcbnN0YXJ0IC0gd2hpY2ggY3JlYXRlIHJlbmRlcmVyIGFuZCBjb25kdWN0IHN0YXJ0IGluaXRpYWxpemF0aW9uc1xyXG51cGRhdGUgLSB1cGRhdGVkIHNjZW5lIG9iamVjdHMsIGFuaW1hdGlvbnMsIHBoaXNpY3NcclxucmVuZGVyIC0gY29udHJvbCBzY2VuZSByZW5kZXJpbmdcclxudGhpcyBtZXRob2RzIG11c3QgcmV3cml0ZSBvbiBkZXJpdmVkIGNsYXNzZXNcclxubmVlZCBzZXQgXHJcblBST1BFUlRJRVNcclxubWFpbl9jYW1lcmEgLSBjYW1lcmEgd2hpY2ggcG9pbnQgb2YgdmlldyByZW5kZXIgd2hvbGUgc2NlbmUgYW5kIHVzZXIgaW50ZXJhY3RzXHJcbmRvbV9zY3JlZW4gLSBkb20gZWxlbWVudCB3aGljaCBjb250YWluIGNhbnZhcyBhbmQgZGlzcGxheSBzY2VuZVxyXG5yZW5kZXJlciAtIHRocmVlLmpzIHJlbmRlcmVyXHJcbmNhbnZhcyAtIGlzIGNyZWF0ZWQgYnkgdGhyZWUuanMgcmVuZGVyZXIsIGl0IGhhdmUgdG8gYXBwZW5kIHRvIGRvbV9zY3JlZW4gY2hpbGRyZW4sIGZ1Y2sgaXRcclxuY2FudmFzIHdpZHRoIGFuZCBoZWlnaHQgZGVmaW5pbmcgb24gY3JlYXRpbmcgaXQgYnkgcmVuZGVyZXIsIGZ1Y2sgaXRcclxuXHJcblxyXG5cclxuKi9cclxuXHJcbmltcG9ydCB7TXlfTGlifSBmcm9tICcuLi9iYXNlL215X2xpYi5qcyc7XHJcbmltcG9ydCB7bWFpbl9ldmVudF9odWIsIEV2ZW50X0h1Yn0gZnJvbSAnLi4vYmFzZS9ldmVudF9odWIuanMnO1xyXG5pbXBvcnQge01vdXNlX0ludGVyc2VjdG9yfSBmcm9tICcuLi9iYXNlL21vdXNlX2ludGVyc2VjdG9yLmpzJztcclxuXHJcblxyXG5mdW5jdGlvbiBBcHBsaWNhdGlvbiAoY29uZmlnKVxyXG57XHJcblxyXG4gICAgdGhpcy5fbGlmZWN5Y2xlX2V2ZW50KFwiYmVmb3JlX2NyZWF0ZWRcIik7XHJcbiAgIFxyXG4gICAgdGhpcy5faW5pdF90aW1lcigpO1xyXG4gICAgdGhpcy5fY3JlYXRlX2xvb3BfZnVuY3Rpb24oKTtcclxuICAgIFxyXG5cdHRoaXMubW91c2VfY29udHJvbGxlcnMgPSBbXTtcclxuICAgIFxyXG4gICAgbWFpbl9ldmVudF9odWIuYWRkX2V2ZW50X2xpc3RlbmVyKFwia2lsbF9tZVwiLCBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVfYW5pbWF0ZWRfb2JqZWN0KG9iaik7XHJcbiAgICB9LCB0aGlzKTtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKGNvbmZpZylcclxue1xyXG4gICAgY29uc29sZS5sb2coXCJzdGFydCBhcHBsaWNhdGlvbi4uLlwiKTtcclxuICAgdGhpcy5fc2V0X2NvbmZpZ3VyYXRpb24oY29uZmlnKTtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLl9saWZlY3ljbGVfZXZlbnQgPSBmdW5jdGlvbiAobmFtZSwgZXZlbnQpXHJcbntcclxuICAgIGlmICh0aGlzW25hbWVdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbbmFtZV0oZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLl9pbml0X3RpbWVyID0gZnVuY3Rpb24gKClcclxue1xyXG5cdHRoaXMuY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcdFxyXG5cdHRoaXMuZGVsdGFfdGltZSA9IDA7XHJcblx0dGhpcy5hbmltYXRlZF9vYmplY3RzID0gW107XHJcbn1cclxuXHJcblxyXG52YXIgcnVuX2Z1bmN0aW9uID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG5cdGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xyXG5cdH1cclxuXHRcclxuXHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuX2NyZWF0ZV9sb29wX2Z1bmN0aW9uID0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMucnVuID0gZnVuY3Rpb24gKClcclxuXHR7XHJcblx0XHRydW5fZnVuY3Rpb24oZnVuY3Rpb24gKCkgXHJcblx0XHR7IFxyXG5cdFx0XHRzZWxmLmxvb3AoKTtcclxuICAgICAgICAgICAgLy9tYWluX2V2ZW50X2h1Yi5lbWl0KFwibmV3X2ZyYW1lXCIpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG4gICAgLy9NeV9MaWIuY3JlYXRlX3J1bl9mdW5jdGlvbih0aGlzKTtcclxuICAgIFxyXG4gICAgLy9tYWluX2V2ZW5faHViLmFkZF9ldmVudF9saXN0ZW5lcihcIm5ld19mcmFtZVwiLCB0aGlzLmxvb3AsIHRoaXMpOyAgICBcclxufVxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5nZXRfZGVmYXVsdF9jb25maWd1cmF0aW9uID0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBcImRvbV9lbGVtZW50XCI6IFwic2NyZWVuXCIsXHJcbiAgICAgICAgXCJyZW5kZXJfcGFyYW1zXCI6IHtcclxuICAgICAgICAgICAgXCJwcmVtdWx0aXBsaWVkQWxwaGFcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJhbHBoYVwiOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInZpZXdwb3J0XCI6IHtcclxuICAgICAgICAgICAgXCJ3aWR0aFwiOiA4MDAsXHJcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IDYwMFxyXG4gICAgICAgICB9LFxyXG4gICAgICAgICBcImNsZWFyX2NvbG9yXCI6IDB4MDAwMEZGLFxyXG4gICAgICAgIFwibWFpbl9jYW1lcmFcIjoge1xyXG4gICAgICAgICAgICBcImZvdlwiOiA4MCxcclxuICAgICAgICAgICAgXCJuZWFyXCI6IDAuMSxcclxuICAgICAgICAgICAgXCJmYXJcIjogMTAwMCxcclxuICAgICAgICAgICAgXCJhc3BlY3RfcmF0aW9cIjogMS4zMzMzMzMzMzMzMzMzMzMzLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwieFwiOiAwLFxyXG4gICAgICAgICAgICAgICAgXCJ5XCI6IDAsXHJcbiAgICAgICAgICAgICAgICBcInpcIjogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLl9jcmVhdGVfcmVuZGVyID0gZnVuY3Rpb24gKGpzb24pXHJcbntcclxuICAgIGlmICh0aGlzLmRvbV9zY3JlZW4gfHwgdGhpcy5yZW5kZXJlcikge1xyXG4gICAgICAgIGFsZXJ0KFwiQ3JlYXRlIHJlbmRlciBhbGVydCEgU29tZXRoaW5nIHN0cmFuZ2UgaGFwcGVuZXMhXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmRvbV9zY3JlZW4pIHtcclxuICAgICAgICB0aGlzLmRvbV9zY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChqc29uLmRvbV9lbGVtZW50KTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5yZW5kZXJlcikge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcihqc29uLnJlbmRlcl9wYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKCEhIXRoaXMuZG9tX3NjcmVlbiB8fCB0eXBlb2YgdGhpcy5kb21fc2NyZWVuID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb21lIHRlcnJvcm91cyBoYXBwZW5zISBkb20gZWxlbWVudCBmb3Igc2NyZWVuIG5vdCBmb3VuZCEgZWxlbWVudCBpZCBpcyBcIiArIGpzb24uZG9tX2VsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgLy9jb25zb2xlLmxvZyhcImZvdW5kIGRvbWUgZWxlbWVudCBcIiArIGpzb24uZG9tX2VsZW1lbnQpO1xyXG4gICAgdGhpcy5kb21fc2NyZWVuLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudDtcclxuICAgIFxyXG4gICAgXHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUoanNvbi52aWV3cG9ydC53aWR0aCwganNvbi52aWV3cG9ydC5oZWlnaHQpO1xyXG4gICAgdGhpcy5zZXRfdmlld3BvcnQoanNvbi52aWV3cG9ydC53aWR0aCwganNvbi52aWV3cG9ydC5oZWlnaHQpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKGpzb24uY2xlYXJfY29sb3IpO1xyXG4gICAgXHJcbiAgICB0aGlzLl9saWZlY3ljbGVfZXZlbnQoXCJyZW5kZXJfY3JlYXRlZFwiKTtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLl9jcmVhdGVfbWFpbl9zY2VuZSA9IGZ1bmN0aW9uIChqc29uKVxyXG57XHJcbiAgICB2YXIgZXZlbnQgPSB7cHJldmVudDogZmFsc2V9O1xyXG4gICAgdGhpcy5fbGlmZWN5Y2xlX2V2ZW50KFwiYmVmb3JlX2NyZWF0ZV9tYWluX3NjZW5lXCIsIGV2ZW50KTtcclxuICAgIC8qXHJcbiAgICBpZiAoZXZlbnQucHJldmVudCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgICovXHJcbiAgICBpZiAoIXRoaXMubWFpbl9zY2VuZSkge1xyXG4gICAgICAgIHRoaXMubWFpbl9zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgY2FtZXJhID0ganNvbi5tYWluX2NhbWVyYTsgICAgXHJcbiAgICBpZiAoIXRoaXMubWFpbl9jYW1lcmEpIHtcclxuICAgICAgICB0aGlzLm1haW5fY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKGNhbWVyYS5mb3YsIGNhbWVyYS5hc3BlY3RfcmF0aW8sIGNhbWVyYS5uZWFyLCBjYW1lcmEuZmFyKTtcclxuICAgICAgICB0aGlzLm1haW5fc2NlbmUuYWRkKHRoaXMubWFpbl9jYW1lcmEpO1xyXG4gICAgICAgIHRoaXMubWFpbl9jYW1lcmEubmFtZSA9IFwibWFpbl9jYW1lcmFcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tYWluX2NhbWVyYS5mb3YgPSBjYW1lcmEuZm92O1xyXG4gICAgICAgIHRoaXMubWFpbl9jYW1lcmEubmVhciA9IGNhbWVyYS5uZWFyO1xyXG4gICAgICAgIHRoaXMubWFpbl9jYW1lcmEuZmFyID0gY2FtZXJhLmZhcjtcclxuICAgICAgICB0aGlzLm1haW5fY2FtZXJhLmFzcGVjdCA9IGNhbWVyYS5hc3BlY3RfcmF0aW87XHJcbiAgICAgICAgdGhpcy5tYWluX2NhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMubWFpbl9jYW1lcmEucG9zaXRpb24uc2V0KGNhbWVyYS5wb3NpdGlvbi54LCBjYW1lcmEucG9zaXRpb24ueSwgY2FtZXJhLnBvc2l0aW9uLnopO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuYXBwbHlfY29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uIChqc29uKVxyXG57XHJcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBqc29uO1xyXG4gICAgdGhpcy5fY3JlYXRlX3JlbmRlcihqc29uKTtcclxuICAgIHRoaXMuX2NyZWF0ZV9tYWluX3NjZW5lKGpzb24pO1xyXG4gICAgdGhpcy5fbGlmZWN5Y2xlX2V2ZW50KFwiY3JlYXRlZFwiKTtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLmxvYWRfY29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uICh1cmwpXHJcbntcclxuICAgIHZhciB4aHIgPSBuZXcgVEhSRUUuWEhSTG9hZGVyKCk7XHJcbiAgICBcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIFxyXG4gICAgdmFyIGNvbmZpZyA9IHNlbGYuZ2V0X2RlZmF1bHRfY29uZmlndXJhdGlvbigpO1xyXG4gICAgXHJcbiAgICB2YXIgY29uZmlndXJhdGlvbl9pc19hcHBsaWVkID0gZmFsc2U7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIG9ubG9hZCAoZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29uZmlndXJhdGlvbiBsb2FkZWQgZnJvbSB1cmwgPDxcIiArIHVybCArIFwiPj5cIik7XHJcbiAgICAgICAgdmFyIG9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgLy91c2VyIGNvbmZpZyBhcHBlbmQgdG8gZGVmYXVsdCBjb25maWcgYW5kIG1heSByZXdyaXRlIHRoZW0sIFxyXG4gICAgICAgIC8vdGhvdWdoIHVzZXIgbmF2ZW4ndCB0byByZXdyaXRlIEFMTCBjb25maWcgdG8gY2hhbmdlIHNvbWUgcGFyYW1zXHJcbiAgICAgICAgXy5jb3B5X29iamVjdChjb25maWcsIG9iaik7XHJcbiAgICAgICAgc2VsZi5hcHBseV9jb25maWd1cmF0aW9uKGNvbmZpZyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29uZmlndXJhdGlvbl9pc19hcHBsaWVkLCBcIm9ubG9hZFwiKTsgICAgICAgIFxyXG4gICAgICAgIGNvbmZpZ3VyYXRpb25faXNfYXBwbGllZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwcm9ncmVzcygpIHt9XHJcbiAgICBmdW5jdGlvbiBlcnJvcihldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBvbiBsb2FkaW5nIGNvbmZpZyFcIiwgZXZlbnQudGFyZ2V0LnN0YXR1cyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZXR0aW5nIGRlZmF1bHQgY29uZmlndXJhdGlvblwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb25maWd1cmF0aW9uX2lzX2FwcGxpZWQsIFwiZXJyb3JcIik7ICAgICAgICBcclxuICAgICAgICBjb25maWd1cmF0aW9uX2lzX2FwcGxpZWQgPSB0cnVlOyAgICAgICAgXHJcbiAgICAgICAgc2VsZi5hcHBseV9jb25maWd1cmF0aW9uKGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICB4aHIubG9hZCh1cmwsIG9ubG9hZCwgcHJvZ3Jlc3MsIGVycm9yKTtcclxufVxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5fc2V0X2NvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbiAoY29uZmlnKVxyXG57XHJcbiAgICB2YXIgZGVmYXVsdF9jb25maWcgPSB0aGlzLmdldF9kZWZhdWx0X2NvbmZpZ3VyYXRpb24oKTtcclxuICAgIFxyXG4gICAgLy90aGlzIGlzIHVybCBvZiBjb25maWd1cmF0aW9uIGZpbGVcclxuICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0IGNvbmZpZ3VyYXRpb24gZnJvbSB1cmwgPj4gXCIgKyBjb25maWcpO1xyXG4gICAgICAgIHRoaXMubG9hZF9jb25maWd1cmF0aW9uKGNvbmZpZyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzIGlzIG9iamVjdCBmaWxsZWQgd2l0aCBkYXRhXHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXQgY29uZmlndXJhdGlvbiBmcm9tIHVzZXIgb2JqZWN0XCIpO1xyXG4gICAgICAgIF8uY29weV9vYmplY3QoZGVmYXVsdF9jb25maWcsY29uZmlnKTtcclxuICAgICAgICB0aGlzLmFwcGx5X2NvbmZpZ3VyYXRpb24oZGVmYXVsdF9jb25maWcpO1xyXG4gICAgLy9jb25maWd1cmF0aW9uIG5vdCBnaXZlbiwgdXNlIGRlZmF1bHRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJfc2V0X2NvbmZpZ3VyYXRpb246IHNldCBkZWZhdWx0IGNvbmZpZ3JhdGlvblwiKTtcclxuICAgICAgIHRoaXMuYXBwbHlfY29uZmlndXJhdGlvbihkZWZhdWx0X2NvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLmV4dGVuZCA9IGZ1bmN0aW9uIChtZXRob2RzLCBjaGlsZF9mdW5jKVxyXG57XHJcblxyXG4gICAgdmFyIENoaWxkO1xyXG4gICAgaWYgKHR5cGVvZiBjaGlsZF9mdW5jID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIENoaWxkID0gZnVuY3Rpb24gKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBDaGlsZCA9IGNoaWxkX2Z1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jcmVhdGUgbmV3IG9iamVjdCBhbmQgc2V0IHByb3RvdHlwZSBjaGFpblxyXG5cdENoaWxkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQXBwbGljYXRpb24ucHJvdG90eXBlKTtcclxuICAgIC8vY29weSBtZXRob2RzIHRvIG5ldyBvYmplY3RcclxuXHRfLmNvcHlfb2JqZWN0KENoaWxkLnByb3RvdHlwZSwgbWV0aG9kcyk7XHJcbiAgICBDaGlsZC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDaGlsZDtcclxuICAgXHJcbiAgICByZXR1cm4gQ2hpbGQ7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLmV4dGVuZF9wcm90byA9IGZ1bmN0aW9uIChwcm90bywgbWV0aG9kcylcclxue1xyXG5cdHZhciBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcclxuXHRfLmNvcHlfb2JqZWN0KG9iaiwgbWV0aG9kcyk7XHJcblx0QXBwbGljYXRpb24uY2FsbChvYmopO1xyXG5cdHJldHVybiBvYmo7XHJcbn1cclxuXHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uICgpIFxyXG57XHJcblx0dmFyIGRlbHRhID0gdGhpcy5jbG9jay5nZXREZWx0YSgpO1xyXG5cdC8vZml4IHRoaXMgLSBhZGQgb3B0aW9ucyB0byBjb250cm9sIG1pbiBmcmFtZSByYXRlXHJcblx0aWYgKGRlbHRhID4gMC4xKSB7XHJcblx0XHRkZWx0YSA9IDAuMTtcclxuXHR9XHJcblx0dGhpcy5kZWx0YV90aW1lID0gZGVsdGE7XHJcbiAgICB0aGlzLmRvX3VwZGF0ZShkZWx0YSk7XHJcblx0dGhpcy51cGRhdGUoZGVsdGEpO1xyXG5cdHRoaXMucmVuZGVyKGRlbHRhKTtcclxuXHR0aGlzLnJ1bigpO1xyXG4gICAgLy9NeV9MaWIucnVuKCk7XHJcbn1cclxuXHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLmFkZF9hbmltYXRlZF9vYmplY3QgPSBmdW5jdGlvbiAob2JqKVxyXG57XHJcblx0Ly9maXggcHJvYmFibHkgZHVwbGljYXRlc1xyXG5cdHRoaXMuYW5pbWF0ZWRfb2JqZWN0cy5wdXNoKG9iaik7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5yZW1vdmVfYW5pbWF0ZWRfb2JqZWN0ID0gZnVuY3Rpb24gKG9iailcclxue1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmFuaW1hdGVkX29iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmICh0aGlzLmFuaW1hdGVkX29iamVjdHNbaV0gPT09IG9iaikge1xyXG5cdFx0XHR0aGlzLmFuaW1hdGVkX29iamVjdHMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLnVwZGF0ZV9hbGwgPSBmdW5jdGlvbiAoZGVsdGEpXHJcbntcclxuXHR2YXIgb2JqO1xyXG5cdGZvcih2YXIgaSA9IDAsIGxlbiA9IHRoaXMuYW5pbWF0ZWRfb2JqZWN0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0b2JqID0gdGhpcy5hbmltYXRlZF9vYmplY3RzW2ldO1xyXG5cdFx0aWYgKG9ialtcInVwZGF0ZVwiXSkge1xyXG5cdFx0XHRvYmoudXBkYXRlKGRlbHRhKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5wcmVfdXBkYXRlID0gZnVuY3Rpb24gKGRlbHRhKVxyXG57XHJcblx0dGhpcy51cGRhdGVfYWxsKGRlbHRhKTtcclxuICAgIE15X0xpYi5wYXJ0aWNsZV9tYW5hZ2VyLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAvL2V2ZW50XHJcbiAgICBpZiAodGhpcy5iZWZvcmVfdXBkYXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmJlZm9yZV91cGRhdGUoZGVsdGEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLmRvX3VwZGF0ZSA9IGZ1bmN0aW9uIChkdClcclxue1xyXG4gICAgdGhpcy5wcmVfdXBkYXRlKGR0KTtcclxuICAgIHRoaXMudXBkYXRlKGR0KTtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YSlcclxue1xyXG59XHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLmNyZWF0ZV9tb3VzZV9tb3ZlX2xpc3RlbmVyID0gZnVuY3Rpb24gKClcclxue1xyXG5cdGlmICh0aGlzW1wibW91c2VfbW92ZV9saXN0ZW5lclwiXSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0dGhpcy5tb3VzZV9tb3ZlX2xpc3RlbmVyID0gdHJ1ZTtcclxuXHRmdW5jdGlvbiBtb3VzZV9tb3ZlX2xpc3RlbmVyKGV2ZW50KSB7XHJcblx0XHR2YXIgdmVjdG9yID0gTW91c2VfSW50ZXJzZWN0b3IubW91c2VfY29vcmRzX3RvX3ZlY3RvcihzZWxmLmRvbV9zY3JlZW4sIGV2ZW50KTtcdFx0XHJcblx0XHRzZWxmLmZpbmRfbW91c2Vfb3Zlcl9pbnRlcnNlY3Rpb25zKHZlY3Rvcik7XHJcblx0fTtcclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdXNlX21vdmVfbGlzdGVuZXIpO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuZmluZF9tb3VzZV9vdmVyX2ludGVyc2VjdGlvbnMgPSBmdW5jdGlvbih2ZWN0b3IpXHJcbntcclxuXHR2ZWN0b3IudW5wcm9qZWN0KHRoaXMubWFpbl9jYW1lcmEpO1xyXG5cdHZhciByYXkgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKCB0aGlzLm1haW5fY2FtZXJhLnBvc2l0aW9uLCB2ZWN0b3Iuc3ViKCB0aGlzLm1haW5fY2FtZXJhLnBvc2l0aW9uICkubm9ybWFsaXplKCkgKTtcclxuXHR2YXIgb2JqO1xyXG5cdGZvcih2YXIgaSA9MCwgbGVuID0gdGhpcy5tb3VzZV9jb250cm9sbGVycy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XHJcblx0XHRvYmogPSB0aGlzLm1vdXNlX2NvbnRyb2xsZXJzW2ldO1xyXG5cdFx0aWYgKG9iai5vdmVyKSB7XHJcblx0XHRcdC8vIGNyZWF0ZSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvYmplY3RzIGluIHRoZSBzY2VuZSB3aXRoIHdoaWNoIHRoZSByYXkgaW50ZXJzZWN0c1xyXG5cdFx0XHQvL3ZhciBpbnRlcnNlY3RzID0gcmF5LmludGVyc2VjdE9iamVjdHMoIFtncmlkX3RleHQucm9vdF0sIHRydWUgKTsgXHJcblx0XHRcdC8vY29uc29sZS5sb2coZmFrZV9wbGFuZS5yb290LmNoaWxkcmVuWzBdLmdlb21ldHJ5KTtcclxuXHRcdFx0dmFyIGludGVyc2VjdHMgPSByYXkuaW50ZXJzZWN0T2JqZWN0cyggW29iai5yb290XSwgdHJ1ZSApOyBcclxuXHRcdFx0b2JqLmNhbGxiYWNrKGludGVyc2VjdHMpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLmFkZF9tb3VzZV9jb250cm9sbGVyID0gZnVuY3Rpb24gKHJvb3QsIG92ZXIsIGNsaWNrLCBjYWxsYmFjaylcclxue1xyXG5cdHZhciB0bXAgPSBuZXcgTXlfTGliLk1vdXNlX0NvbnRyb2xsZXIocm9vdCwgb3ZlciwgY2xpY2ssIGNhbGxiYWNrKVxyXG5cdHRoaXMubW91c2VfY29udHJvbGxlcnMucHVzaCggdG1wICk7XHJcblx0aWYgKG92ZXIpIHtcclxuXHRcdHRoaXMuY3JlYXRlX21vdXNlX21vdmVfbGlzdGVuZXIoKTtcclxuXHR9XHJcblx0cmV0dXJuIHRtcDtcclxufVxyXG5cclxuXHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuc2V0X3ZpZXdwb3J0ID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpXHJcbntcclxuXHRNeV9MaWIuVmlld3BvcnQud2lkdGggPSB3aWR0aDtcclxuXHRNeV9MaWIuVmlld3BvcnQuaGVpZ2h0ID0gaGVpZ2h0O1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGRlbHRhKSBcclxue1xyXG5cdHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcih0aGlzLmNvbmZpZ3VyYXRpb24uY2xlYXJfY29sb3IpO1xyXG5cdHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gdHJ1ZTtcclxuXHR0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLm1haW5fc2NlbmUsIHRoaXMubWFpbl9jYW1lcmEpO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7QXBwbGljYXRpb259O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvYXBwbGljYXRpb24uanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi9teV9saWIuanMnO1xyXG5cclxuLy9sZW5ndGggLSBzaW1wbGUgbGVuZ3RoIG9mIGFuaW1hdGlvbnNcclxuLy8tMSAtIGluZmluaXRlXHJcbi8vMCAtIHN0b3BcclxuLy8+IDAgLSBsZW5ndGggb2YgYW5pbWF0aW9uLCBcclxuLy9pZiB0aW1lID4gbGVuZ3RoLCBhbmltYXRpb24gc3RvcFxyXG4vL25lZWQgcmV3cml0ZSB0aGlzIGNyYXAgdG8gc2FmZSBmbG9hdGluZyBwb2ludCBtYW5uZXJlXHJcbi8vYW5kIGFwcGVuZCBtb3JlIGNvbnRyb2xlIG9uIGFuaW1hdGlvbiBcclxuICAgIGZ1bmN0aW9uIEJhc2VfQW5pbWF0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gMDtcclxuICAgICAgICB0aGlzLnRpbWVfc2NhbGUgPSAxLjA7XHJcbiAgICAgICAgdGhpcy50eXBlID0gXCJCYXNlX0FuaW1hdGlvblwiO1xyXG4gICAgICAgIHRoaXMudXVpZCA9IF8uZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSAtMTtcclxuICAgICAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2NhbGVkX2R0ID0gZHQgKiB0aGlzLnRpbWVfc2NhbGU7XHJcbiAgICAgICAgdGhpcy50aW1lICs9IHNjYWxlZF9kdDtcclxuICAgICAgICBpZiAodGhpcy5sZW5ndGggPCAwIHx8IHRoaXMudGltZSA8IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY19hbmltYXRpb24oZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RvcHBlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdG9wcGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLmNhbGNfYW5pbWF0aW9uID0gZnVuY3Rpb24gKGR0KVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBCYXNlX0FuaW1hdGlvbi5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbihvYmopXHJcbiAgICB7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoZGF0YSlcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHt9O1xyXG4gICAgICAgIGRhdGEudXVpZCA9IHRoaXMudXVpZDtcclxuICAgICAgICBkYXRhLnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgaWYgKHRoaXMubmFtZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgZGF0YS5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLnRpbWVfc2NhbGUgPSB0aGlzLnRpbWVfc2NhbGUgPT09IHVuZGVmaW5lZCA/IDEuMCA6IHRoaXMudGltZV9zY2FsZTtcclxuICAgICAgICBkYXRhLmxlbmd0aCA9IHRoaXMubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBCYXNlX0FuaW1hdGlvbi5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAocGFyYW0pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gcGFyYW0udHlwZTtcclxuICAgICAgICB0aGlzLnV1aWQgPSBwYXJhbS51dWlkO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IHBhcmFtLm5hbWUgPyBwYXJhbS5uYW1lIDogJyc7XHJcbiAgICAgICAgdGhpcy50aW1lX3NjYWxlID0gKHBhcmFtLnRpbWVfc2NhbGUgPT09IHVuZGVmaW5lZCkgPyAxLjAgOiBwYXJhbS50aW1lX3NjYWxlO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gcGFyYW0ubGVuZ3RoID09PSB1bmRlZmluZWQgPyAtMSA6IHBhcmFtLmxlbmd0aDtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgXHJcbmZ1bmN0aW9uIEV1bGVyX0FuaW1hdGlvbiAoeCwgeSwgeilcclxue1xyXG4gICAgQmFzZV9BbmltYXRpb24uY2FsbCh0aGlzKTtcclxuICAgIHRoaXMudHlwZSA9IFwiRXVsZXJfQW5pbWF0aW9uXCI7XHJcblx0dGhpcy54c3BlZWQgPSB4O1xyXG5cdHRoaXMueXNwZWVkID0geTtcclxuXHR0aGlzLnpzcGVlZCA9IHo7XHJcbiAgICB0aGlzLnggPSAwO1xyXG4gICAgdGhpcy55ID0gMDtcclxuICAgIHRoaXMueiA9IDA7XHJcbiAgICB0aGlzLm5hbWUgPSAnJztcclxufVxyXG5cclxuRXVsZXJfQW5pbWF0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZV9BbmltYXRpb24ucHJvdG90eXBlKTtcclxuXHJcblxyXG5FdWxlcl9BbmltYXRpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRXVsZXJfQW5pbWF0aW9uO1xyXG5cclxuRXVsZXJfQW5pbWF0aW9uLnByb3RvdHlwZS5jYWxjX2FuaW1hdGlvbiA9IGZ1bmN0aW9uIChkdClcclxue1xyXG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLnhzcGVlZCx0aGlzLnlzcGVlZCwgdGhpcy56cGVlZCwgZHQsIHRoaXMudGltZV9zY2FsZSk7XHJcbiAgICBkdCAqPSB0aGlzLnRpbWVfc2NhbGU7XHJcblx0dGhpcy54ICs9IHRoaXMueHNwZWVkICogZHQ7XHJcblx0dGhpcy55ICs9IHRoaXMueXNwZWVkICogZHQ7XHJcblx0dGhpcy56ICs9IHRoaXMuenNwZWVkICogZHQ7XHJcbn1cclxuICAgIFxyXG5FdWxlcl9BbmltYXRpb24ucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24gKG9iailcclxue1xyXG4gICAgb2JqLnJvdGF0aW9uLnNldCh0aGlzLngsdGhpcy55LCB0aGlzLnopO1xyXG59XHJcblxyXG5FdWxlcl9BbmltYXRpb24ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIChqc29uKVxyXG57XHJcbiAgIHZhciBkYXRhID0gQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMpO1xyXG4gICBkYXRhLnhzcGVlZCA9IHRoaXMueHNwZWVkO1xyXG4gICBkYXRhLnlzcGVlZCA9IHRoaXMueXNwZWVkO1xyXG4gICBkYXRhLnpzcGVlZCA9IHRoaXMuenNwZWVkO1xyXG4gICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuRXVsZXJfQW5pbWF0aW9uLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChwYXJhbSlcclxue1xyXG4gICAgQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLnBhcnNlLmNhbGwodGhpcywgcGFyYW0pO1xyXG4gICAgdGhpcy54c3BlZWQgPSBwYXJhbS54c3BlZWQ7XHJcbiAgICB0aGlzLnlzcGVlZCA9IHBhcmFtLnlzcGVlZDtcclxuICAgIHRoaXMuenNwZWVkID0gcGFyYW0uenNwZWVkO1xyXG4gICAgdGhpcy54ID0gdGhpcy55ID0gdGhpcy56ID0gMDsgICAgXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBTY2FsZV9BbmltYXRpb24oeCwgeSwgeilcclxue1xyXG4gICAgQmFzZV9BbmltYXRpb24uY2FsbCh0aGlzKTtcclxuICAgIC8vc3BlZWQgb2Ygc2NhbGVcclxuICAgIHRoaXMueHNjYWxlID0geDtcclxuICAgIHRoaXMueXNjYWxlID0geTtcclxuICAgIHRoaXMuenNjYWxlID0gejtcclxuICAgIHRoaXMueCA9IDEuMDtcclxuICAgIHRoaXMueSA9IDEuMDtcclxuICAgIHRoaXMueiA9IDEuMDtcclxufVxyXG5cclxuU2NhbGVfQW5pbWF0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZV9BbmltYXRpb24ucHJvdG90eXBlKTtcclxuXHJcbl8uY29weV9vYmplY3QoU2NhbGVfQW5pbWF0aW9uLnByb3RvdHlwZSwge1xyXG4gICAgY29uc3RydWN0b3I6IFNjYWxlX0FuaW1hdGlvbixcclxuICAgIGNhbGNfYW5pbWF0aW9uOiBmdW5jdGlvbiAoZHQpIFxyXG4gICAge1xyXG4gICAgICAgIGR0ID0gZHQgKiB0aGlzLnRpbWVfc2NhbGU7XHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMueHNjYWxlICogZHQ7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMueXNjYWxlICogZHQ7XHJcbiAgICAgICAgdGhpcy56ICs9IHRoaXMuenNjYWxlICogZHQ7XHJcbiAgICB9LFxyXG4gICAgYXBwbHk6ZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIG9iai5zY2FsZS5zZXQodGhpcy54LCB0aGlzLnksIHRoaXMueik7XHJcbiAgICB9LFxyXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5maXJzdCkge1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnggPSAxLjA7XHJcbiAgICAgICAgdGhpcy55ID0gMS4wO1xyXG4gICAgICAgIHRoaXMueiA9IDEuMDtcclxuICAgICAgICB0aGlzLnRpbWUgPSAwO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJCYXNlX0FuaW1hdGlvblwiLCBCYXNlX0FuaW1hdGlvbik7XHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIkV1bGVyX0FuaW1hdGlvblwiLCBFdWxlcl9BbmltYXRpb24pO1xyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJTY2FsZV9BbmltYXRpb25cIiwgU2NhbGVfQW5pbWF0aW9uKTtcclxuXHJcblxyXG5leHBvcnQgeyBCYXNlX0FuaW1hdGlvbiwgRXVsZXJfQW5pbWF0aW9uLCBTY2FsZV9BbmltYXRpb24gfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Jhc2UvYW5pbWF0aW9ucy5qcyIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuL215X2xpYi5qcyc7XHJcblxyXG4vL2V2ZW50czogXHJcbi8vaXRlbV9sb2FkZWRcclxuLy9vbmVycm9yXHJcbi8vb25wcm9ncmVzc1xyXG4vL2ZpbmlzaGVkXHJcbmZ1bmN0aW9uIENoYWluX0xvYWRlcigpXHJcbntcclxufVxyXG5cclxuQ2hhaW5fTG9hZGVyLnByb3RvdHlwZSA9IHtcclxuXHRjb25zdHJ1Y3RvcjogQ2hhaW5fTG9hZGVyLFxyXG5cdHN0YXJ0OiBmdW5jdGlvbiAobGlzdCkgXHJcblx0e1xyXG5cdFx0dGhpcy5saXN0ID0gbGlzdDtcclxuXHRcdHRoaXMuaW5kZXggPSAwO1xyXG5cdFx0dGhpcy5sb2FkKHRoaXMubGlzdFswXSk7XHJcblx0XHR0aGlzLnN0b3BfYnlfZXJyb3IgPSBmYWxzZTtcclxuXHR9LFxyXG5cdFxyXG5cdG5leHQ6IGZ1bmN0aW9uKHJlc291cmNlKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLml0ZW1fbG9hZGVkICYmIHJlc291cmNlKSB7XHJcblx0XHRcdHRoaXMuaXRlbV9sb2FkZWQocmVzb3VyY2UsdGhpcy5saXN0W3RoaXMuaW5kZXhdKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuaW5kZXgrKztcclxuXHRcdGlmICh0aGlzLmluZGV4IDwgdGhpcy5saXN0Lmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLmxvYWQodGhpcy5saXN0W3RoaXMuaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0aGlzLmZpbmlzaGVkKSB7XHJcblx0XHRcdFx0dGhpcy5maW5pc2hlZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRcclxuXHRkb19lcnJvcjogZnVuY3Rpb24gKGVycm9yKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLm9uZXJyb3IpIHtcclxuXHRcdFx0dGhpcy5vbmVycm9yKGVycm9yKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJDaGFpbiBMb2FkZXIgRXJyb3IhXCIsIGVycm9yKTtcclxuXHRcdH1cclxuXHRcdGlmICghdGhpcy5zdG9wX2J5X2Vycm9yKSB7XHJcblx0XHRcdHRoaXMubmV4dCgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0XHJcblx0ZG9fcHJvZ3Jlc3M6IGZ1bmN0aW9uICgpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMub25wcm9ncmVzcykge1xyXG5cdFx0XHR0aGlzLm9ucHJvZ3Jlc3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdFx0XHJcblx0bG9hZDogZnVuY3Rpb24gKGl0ZW0pXHJcblx0e1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0aWYgKHRoaXMubG9hZF9mdW5jKSB7XHJcblx0XHRcdHRoaXMubG9hZF9mdW5jKGl0ZW0sIFxyXG5cdFx0XHRmdW5jdGlvbiAoaXRlbSkgeyBzZWxmLm5leHQuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTsgfSxcclxuXHRcdFx0ZnVuY3Rpb24gKGl0ZW0pIHsgc2VsZi5kb19lcnJvci5hcHBseShzZWxmLCBhcmd1bWVudHMpOyB9LFxyXG5cdFx0XHRmdW5jdGlvbiAoaXRlbSkgeyBzZWxmLmRvX3Byb2dyZXNzLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7IH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiB0ZXN0X2NoYWluX2xvYWRlcigpIFxyXG57XHJcblx0dmFyIGNsID0gbmV3IENoYWluX0xvYWRlcigpO1xyXG5cdGNsLml0ZW1fbG9hZGVkID0gZnVuY3Rpb24gKGl0ZW0pIHtjb25zb2xlLmxvZyhcImxvYWQgaXRlbSBcIiwgaXRlbSk7fVxyXG5cdGNsLmZpbmlzaGVkID0gZnVuY3Rpb24gKGl0ZW0pIHtjb25zb2xlLmxvZyhcImxvYWRlciBtYW5hZ2VyIC0gam9iIGRvbmVcIik7fVxyXG5cdGNsLmxvYWRfZnVuYyA9IGZ1bmN0aW9uIChpdGVtLCBuZXh0LCBlcnJvciwgcHJvZ3Jlc3MpIHsgXHJcblx0XHRpZiAoaXRlbSkge1xyXG5cdFx0XHRuZXh0KGl0ZW0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZXJyb3IoaXRlbSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNsLnN0YXJ0KFtcImZpcnN0XCIsIFwic2Vjb25kXCIsIG51bGwsIFwidHJlZVwiXSk7XHJcbn1cclxuLy90ZXN0X2NoYWluX2xvYWRlcigpO1xyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gTG9hZGluZ19NYW5hZ2VyICgpXHJcbntcclxuXHR0aGlzLnJlc291cmNlcyA9IHt9O1xyXG5cdHRoaXMudGV4dHVyZV9sb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xyXG59XHJcblxyXG5Mb2FkaW5nX01hbmFnZXIucHJvdG90eXBlID0ge1xyXG5cdGNvbnN0cnVjdG9yOiBMb2FkaW5nX01hbmFnZXIsXHJcblx0Z2V0OiBmdW5jdGlvbiAobmFtZSlcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5yZXNvdXJjZXNbbmFtZV07XHJcblx0fSxcclxuXHRcclxuXHRnZXRfYXN5bmM6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaylcclxuXHR7XHJcblx0XHQvL2FscmVhZHkgbG9hZGVkP1xyXG5cdFx0dmFyIHRleHR1cmUgPSB0aGlzLmdldChuYW1lKTtcclxuXHRcdGlmICh0ZXh0dXJlKSB7XHJcblx0XHRcdGlmIChjYWxsYmFjaykge1xyXG5cdFx0XHRcdGNhbGxiYWNrKHRleHR1cmUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0ZXh0dXJlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vaWYgbm90IGxvYWQgdGhpcyBhc3luY1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0dGV4dHVyZSA9IHRoaXMudGV4dHVyZV9sb2FkZXIubG9hZChuYW1lLCBmdW5jdGlvbiAodGV4dHVyZSlcclxuXHRcdHtcclxuXHRcdFx0aWYgKGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2sodGV4dHVyZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5yZXNvdXJjZXNbbmFtZV0gPSB0ZXh0dXJlO1x0XHJcblx0XHRyZXR1cm4gdGV4dHVyZTtcclxuXHR9LFxyXG5cdFxyXG5cclxuXHRsb2FkX2xpc3Q6IGZ1bmN0aW9uIChyZXNvdXJjZV9saXN0LCBvbl9sb2FkLCBsb2FkX2Z1bmMsIG9uX3Byb2dyZXNzKVxyXG5cdHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFxyXG5cdFx0dmFyIGNsID0gbmV3IENoYWluX0xvYWRlcigpO1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0Y2wub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRVJST1IgbG9hZGluZyB0ZXh0dXJlXCIsIGVycm9yLCBjbC5saXN0W2NsLmluZGV4XSk7XHRcclxuXHRcdH1cclxuXHRcdGNsLml0ZW1fbG9hZGVkID0gZnVuY3Rpb24gKHJlc291cmNlLCBuYW1lKSB7XHJcblx0XHRcdHNlbGYucmVzb3VyY2VzW25hbWVdID0gcmVzb3VyY2U7XHJcblx0XHRcdGlmIChzZWxmLm9uX3Jlc291cmNlX2xvYWRlZCkge1xyXG5cdFx0XHRcdHNlbGYub25fcmVzb3VyY2VfbG9hZGVkKHJlc291cmNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2wub25fcHJvZ3Jlc3MgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChvbl9wcm9ncmVzcykge1xyXG5cdFx0XHRcdG9uX3Byb2dyZXNzKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNsLmxvYWRfZnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0bG9hZF9mdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcblx0XHRjbC5maW5pc2hlZCA9IGZ1bmN0aW9uICgpXHJcblx0XHR7XHJcblx0XHRcdGlmIChvbl9sb2FkKSB7XHJcblx0XHRcdFx0b25fbG9hZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjbC5zdGFydChyZXNvdXJjZV9saXN0KTtcclxuXHRcdFxyXG5cdH0sXHJcblxyXG5cdGxvYWRfbGlzdF90ZXh0dXJlczogZnVuY3Rpb24gKHJlc291cmNlX2xpc3QsIG9uX2xvYWQpXHJcblx0e1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0dGhpcy5sb2FkX2xpc3QocmVzb3VyY2VfbGlzdCwgb25fbG9hZCwgZnVuY3Rpb24gKHVybCwgbmV4dCwgZXJyb3IsIHByb2dyZXNzICkgXHJcblx0XHR7XHJcblx0XHRcdHZhciB0ZXh0dXJlID0gc2VsZi50ZXh0dXJlX2xvYWRlci5sb2FkKHVybCwgbmV4dCwgcHJvZ3Jlc3MsIGVycm9yKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGxvYWRfbGlzdF9qc29uOiBmdW5jdGlvbiAocmVzb3VyY2VfbGlzdCwgb25fbG9hZCwgcHJvZ3Jlc3MpXHJcblx0e1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0dmFyIGxvYWRlciA9IG5ldyBUSFJFRS5YSFJMb2FkZXIoKTtcdFxyXG5cdFx0dGhpcy5sb2FkX2xpc3QocmVzb3VyY2VfbGlzdCwgb25fbG9hZCwgZnVuY3Rpb24gKHVybCwgbmV4dCwgZXJyb3IsIHByb2dyZXNzKSBcclxuXHRcdHtcclxuXHRcdFx0dmFyIHRleHR1cmUgPSBsb2FkZXIubG9hZCh1cmwsIG5leHQsIHByb2dyZXNzLCBlcnJvcik7XHJcblx0XHR9LCBwcm9ncmVzcyk7XHJcblx0fSxcclxuXHRcclxuXHRmcmVlOiBmdW5jdGlvbiAoKVxyXG5cdHtcclxuXHRcdHRoaXMucmVzb3VyY2VzID0ge307XHJcblx0fVxyXG59O1xyXG5cclxuXHJcbk15X0xpYi5UZXh0dXJlX01hbmFnZXIgPSBuZXcgTG9hZGluZ19NYW5hZ2VyKCk7XHRcclxuXHJcbmV4cG9ydCB7IExvYWRpbmdfTWFuYWdlciB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXNlL2xvYWRpbmdfbWFuYWdlci5qcyIsIi8vVE9ETzogcmVtb3ZlIHRoaXMgdWdseSBjcmFwIGFuZCByZXBsYWNlIHNvbWV0aGluZyByZWFzb25hYmxlXHJcblxyXG5pbXBvcnQge015X0xpYn0gZnJvbSAnLi9teV9saWIuanMnO1xyXG5cclxuLy90aGlzIHVnbHkgY2xhc3MgbG9hZGluZyB0ZXh0dXJlIGxpc3QgaW4ganNvbiBmb3JtYXQsIHBhcnNlIGl0LCBhbmQgbG9hZGluZyB0ZXh0dXJlc1xyXG4vL3RoZW4gaXQgY2FsbCBldmVudCBkYXRhX2xvYWRlZCwgd2hlbiBnaXZlIHRleHR1cmUgbGlzdCBpbiBqc29uIGZvcm1hdFxyXG5cclxuZnVuY3Rpb24gUGFja2FnZV9NYW5hZ2VyKClcclxue1xyXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xyXG59XHJcblxyXG4vL2xvYWQganNvbiBmaWxlIHdpdGggZGVzY3JpcHRpb25zIG9mIHBhY2thZ2U6IHRleHR1cmUgbGlzdCwgcGFydGljbGVzIGxpc3QsIHNjZW5lIG9iamVjdHMgbGlzdFxyXG5QYWNrYWdlX01hbmFnZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAodXJsLCBkZWZhdWx0cylcclxue1xyXG4gICAgdGhpcy5kZWZhdWx0cyA9IGRlZmF1bHRzO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICBcInR5cGVcIjogXCJzdGFydFwiXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBmdW5jdGlvbiBvbmxvYWQgKGRhdGEpIHtcclxuICAgICAgICBzZWxmLnN0YXRlW1widHlwZVwiXSA9IFwiZG9uZVwiO1xyXG4gICAgICAgIHNlbGYuc3RhdGVbXCJkYXRhXCJdID0gZGF0YTtcclxuICAgICAgICBcclxuICAgICAgICBzZWxmLnBhcnNlX3BhY2thZ2VfZGVzY3JpcHRpb24oZGF0YSk7ICAgICAgICBcclxuICAgIH0gICAgXHJcbiAgICBmdW5jdGlvbiBlcnJvcihldmVudCkge1xyXG4gICAgICAgIHNlbGYuc3RhdGVbXCJ0eXBlXCJdID0gXCJlcnJvclwiO1xyXG4gICAgICAgIHNlbGYuc3RhdGVbXCJlcnJvclwiXSA9IGV2ZW50O1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUnJvciEgRmFpbGVkIGxvYWRpbmcgcmVzb3VyY2VzIHdpdGggdXJsIFwiK3VybCwgZXZlbnQudGFyZ2V0KTsgICAgICAgIFxyXG4gICAgICAgIGlmIChzZWxmLmVycm9yKXtcclxuICAgICAgICAgICAgc2VsZi5lcnJvcihldmVudC50YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnBhY2sgPSBzZWxmLmRlZmF1bHRzXHJcbiAgICAgICAgc2VsZi5sb2FkX3Jlc291cmNlcyhzZWxmLmRlZmF1bHRzKTtcclxuXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwcm9ncmVzcygpXHJcbiAgICB7XHJcbiAgICB9XHJcbiAgICB2YXIgeGhyID0gbmV3IFRIUkVFLlhIUkxvYWRlcigpO1xyXG4gICAgeGhyLmxvYWQodXJsLCBvbmxvYWQsIHByb2dyZXNzLCBlcnJvcik7XHJcbn1cclxuXHJcbi8vcGFyc2UgbG9hZGVkIGpzb24gZmlsZSBcclxuUGFja2FnZV9NYW5hZ2VyLnByb3RvdHlwZS5wYXJzZV9wYWNrYWdlX2Rlc2NyaXB0aW9uID0gZnVuY3Rpb24gKGRhdGEpXHJcbntcclxuICAgIGNvbnNvbGUubG9nKFwicGFja2FnZWQgZGVzY3JpcHRpb24gbG9hZGVkLCBiZWdpbiBwYXJzaW5nLi4uXCIpO1xyXG4gIHRyeSB7XHJcbiAgICAgICAgdmFyIHBhY2sgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIHRoaXMucGFjayA9IHBhY2s7XHJcbiAgICAgICAgaWYgKHRoaXMubG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVkKHBhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgfSBcclxuICAgY2F0Y2goZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvciBwYXJzaW5nIHJlc291cmNlcyBcIiwgZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZXJyb3Ipe1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuOyAgICAgICAgXHJcbiAgIH1cclxuICAgdGhpcy5sb2FkX3Jlc291cmNlcyhwYWNrKTtcclxufVxyXG5cclxuXHJcblBhY2thZ2VfTWFuYWdlci5wcm90b3R5cGUubG9hZF9yZXNvdXJjZXMgPSBmdW5jdGlvbiAocGFjaylcclxue1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgLy9sb2FkIHRleHR1cmVzXHJcbiAgIGNvbnNvbGUubG9nKFwiUGFja2FnZSBNYW5hZ2VyOiBiZWdpbiBsb2FkaW5nIHRleHR1cmVzLi4uXCIpOyAgICBcclxuICAgIE15X0xpYi5UZXh0dXJlX01hbmFnZXIubG9hZF9saXN0X3RleHR1cmVzKHBhY2sudGV4dHVyZXMsIGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIC8vbG9hZCBqc29uIGRlc2NyaXB0aW9ucyBmaWxlc1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZGF0YV9sb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGFfbG9hZGVkKHBhY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IFBhY2thZ2VfTWFuYWdlciB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXNlL3BhY2thZ2VfbWFuYWdlci5qcyIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuL215X2xpYi5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVfTWFuYWdlcn0gZnJvbSAnLi4vcGFydGljbGVzL3BhcnRpY2xlc19tYW5hZ2VyLmpzJ1xyXG5cclxuZnVuY3Rpb24gU2NlbmVfU2VyaWFsaXplcihyb290KVxyXG57XHJcbiAgICB0aGlzLmFuaW1hdGlvbl9saWJyYXJ5ID0ge307XHJcbn1cclxuXHJcblNjZW5lX1NlcmlhbGl6ZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIChyb290KVxyXG57XHJcbiAgICB0aGlzLmpzb24gPSByb290LnRvSlNPTigpO1xyXG4gICAgY29uc29sZS5sb2coXCJteSBsaWIgcGFydGljbGUgbWFuYWdlclwiLCBNeV9MaWIucGFydGljbGVfbWFuYWdlcik7XHJcbiAgICB0aGlzLmpzb25bXCJwYXJ0aWNsZXNcIl0gPSBNeV9MaWIucGFydGljbGVfbWFuYWdlci50b0pTT04oKTtcclxuICAgIHZhciBhbmltcyA9IHJvb3QuY29sbGVjdF9hbmltYXRpb25zKHJvb3QpO1xyXG4gICAgaWYgKGFuaW1zLmNvdW50ID4gMCkge1xyXG4gICAgICAgIHRoaXMuanNvbltcIm15YW5pbWF0aW9uc1wiXSA9IGFuaW1zO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcy5qc29uO1xyXG59XHJcblxyXG5cclxuXHJcblNjZW5lX1NlcmlhbGl6ZXIucHJvdG90eXBlLmNyZWF0ZV9hbmltYXRpb25zID0gZnVuY3Rpb24gKGFuaW1hdGlvbnMpIHtcclxuICAgIGZvcih2YXIga2V5IGluIGFuaW1hdGlvbnMpIHtcclxuICAgICAgICBpZiAoIHRoaXMuYW5pbWF0aW9uX2xpYnJhcnlba2V5XSA9PT0gdW5kZWZpbmVkICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhbmltYXRpb25zLCBrZXkpKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gYW5pbWF0aW9uc1trZXldO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY3JlYXRlIGFuaW1hdGlvbnMgXCIsIGRhdGEudXVpZCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBhbmltID0gIE15X0xpYi5BYnN0cmFjdF9GYWJyaWMoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChhbmltKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbl9saWJyYXJ5W2tleV0gPSBhbmltO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblNjZW5lX1NlcmlhbGl6ZXIucHJvdG90eXBlLmJpbmRfYW5pbWF0aW9ucyA9IGZ1bmN0aW9uIChhbmltZGF0YSlcclxue1xyXG4gICAgaWYgKCFhbmltZGF0YSkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICB2YXIgYmluZGluZ3MgPSBhbmltZGF0YS5iaW5kaW5ncztcclxuICAgIFxyXG4gICAgLy9jb25zb2xlLmxvZyhcImJpbmQgYW5pbWF0aW9uXCIpO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgZnVuY3Rpb24gY29weV9hbmltYXRpb25zKG9iaiwgYmluZClcclxuICAgIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYmluZC5hbmltYXRpb25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdmFyIGFuaW1fdXVpZCA9IGJpbmQuYW5pbWF0aW9uc1tpXTtcclxuICAgICAgICAgICAgb2JqLmFkZF9hbmltYXRpb24oIHNlbGYuYW5pbWF0aW9uX2xpYnJhcnlbYW5pbV91dWlkXSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgIGZvcih2YXIgaSA9MDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGJpbmQgPSBiaW5kaW5nc1tpXTtcclxuICAgICAgICB2YXIgdXVpZCA9IGJpbmQudXVpZDtcclxuICAgICAgICB2YXIgb2JqID0gdGhpcy5yb290LmdldE9iamVjdEJ5UHJvcGVydHkoXCJ1dWlkXCIsIHV1aWQpO1xyXG4gICAgICAgIGlmIChvYmopIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImJpbmRpbmcgXCIgKyB1dWlkICsgXCIgb2JqZWN0IHRvIGFuaW1hdGlvbiBcIit1dWlkKTtcclxuICAgICAgICAgICAgY29weV9hbmltYXRpb25zKG9iaiwgYmluZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuU2NlbmVfU2VyaWFsaXplci5wcm90b3R5cGUubG9hZF9mcm9tX2pzb24gPSBmdW5jdGlvbiAodXJsKVxyXG57XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBmdW5jdGlvbiBvbmxvYWQoanNvbilcclxuICAgIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoanNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBwYXJzZSBzY2VuZSBcIiwgZSk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNvbWV0aGluZyBmdWNraW5nIGhhcHBlbmVkLCBmYWlsZWQgdG8gbG9hZCBzY2VuZSBcIiwgdXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmxvYWQoZGF0YSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwcm9ncmVzcygpXHJcbiAgICB7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBlcnJvcihlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZS50YXJnZXQpO1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbiAgICB2YXIgeGhyID0gbmV3IFRIUkVFLlhIUkxvYWRlcigpO1xyXG4gICAgeGhyLmxvYWQodXJsLCBvbmxvYWQsIHByb2dyZXNzLCBlcnJvcik7XHJcbn1cclxuXHJcblNjZW5lX1NlcmlhbGl6ZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoanNvbilcclxue1xyXG4gICAgdGhpcy5hbmltYXRpb25fbGlicmFyeSA9IHt9O1xyXG4gICAgdmFyIG8gPSBuZXcgVEhSRUUuT2JqZWN0TG9hZGVyKCk7XHJcbiAgICBpZiAoanNvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5qc29uID0ganNvbjtcclxuICAgIH1cclxuICAgIHZhciByb290ID0gby5wYXJzZSh0aGlzLmpzb24sIGZ1bmN0aW9uICgpIHtjb25zb2xlLmxvZyhcIm9ubG9hZFwiKX0pO1xyXG4gICAgdGhpcy5yb290ID0gcm9vdDsgICAgXHJcblxyXG4gICAgTXlfTGliLnBhcnRpY2xlX21hbmFnZXIubG9hZF9wYXJ0aWNsZXModGhpcy5qc29uLCByb290KTtcclxuICAgIFxyXG4gICAgdGhpcy5jcmVhdGVfYW5pbWF0aW9ucyh0aGlzLmpzb24ubXlhbmltYXRpb25zLmFuaW1hdGlvbnMpO1xyXG4gICAgdGhpcy5iaW5kX2FuaW1hdGlvbnModGhpcy5qc29uLm15YW5pbWF0aW9ucyk7XHJcbiAgICB0aGlzLm1haW5fY2FtZXJhID0gcm9vdC5nZXRPYmplY3RCeU5hbWUoXCJtYWluX2NhbWVyYVwiKTtcclxuICAgIFxyXG4gICAgaWYgKHRoaXMuc2NlbmVfbG9hZGVkKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZV9sb2FkZWQocm9vdCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm9vdDtcclxufVxyXG5cclxuZXhwb3J0IHsgU2NlbmVfU2VyaWFsaXplciB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXNlL3NjZW5lX3NlcmlhbGl6ZXIuanMiLCJpbXBvcnQge1BhcnRpY2xlc19QYW5lbH0gZnJvbSAnLi9wYXJ0aWNsZXNfcGFuZWwuanMnO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlX3Z1ZV9hcHAoaWQpIHtcclxuXHJcblx0dmFyIGFwcDIgPSBuZXcgVnVlKHtcclxuXHRcdGVsOiBpZCxcclxuICAgICAgICBcclxuICAgICAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgICAgICAgICdwYXJ0aWNsZXMtcGFuZWwnOiBQYXJ0aWNsZXNfUGFuZWwsXHJcbiAgICAgICAgfSxcclxuXHRcdGRhdGE6IHtcclxuICAgICAgICAgICAgcGFydGljbGVzOiBbXSxcclxuICAgICAgICAgICAgdGV4dHVyZXM6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGlkPVwiYXBwXCI+XFxcclxuICAgICAgICAgICAgPHBhcnRpY2xlcy1wYW5lbCA6cGFydGljbGVzPVwicGFydGljbGVzXCIgOnRleHR1cmVzPVwidGV4dHVyZXNcIj48L3BhcnRpY2xlcy1wYW5lbD5cXFxyXG4gICAgICAgICAgICA8L2Rpdj4nLFxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gYXBwMjtcclxufVxyXG5cclxuZXhwb3J0IHtjcmVhdGVfdnVlX2FwcH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2d1aS92dWVhcHAuanMiLCJpbXBvcnQge01vdXNlX0NhbWVyYV9Db250cm9sbGVyfSBmcm9tICcuLi9iYXNlL21vdXNlX2NhbWVyYV9jb250cm9sbGVyLmpzJztcclxuXHJcbmZ1bmN0aW9uIE1peGluKClcclxue1xyXG5cclxuICAgIC8vbmVlZCBmb3IgdW5wcm9qZWN0IG9iamVjdCBhbmQgZHJhZ2dpbmdcclxuICAgIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhLnByb3RvdHlwZS5nZXRfZm9yd2FyZF9wbGFuZV9ieV9vYmplY3QgPSBmdW5jdGlvbiAob2JqKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB6ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxuICAgICAgICB6LnNldEZyb21NYXRyaXhDb2x1bW4oIHRoaXMubWF0cml4V29ybGQsIDIgKTtcclxuICAgICAgICB2YXIgZGlzdCA9IG9iai5wb3NpdGlvbi5kb3Qoeik7ICAgICAgICAgICAgIFxyXG4gICAgICAgIHZhciBwbGFuZT0gbmV3IFRIUkVFLlBsYW5lKHoubmVnYXRlKCksIGRpc3QpO1xyXG4gICAgICAgIHJldHVybiBwbGFuZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhLnByb3RvdHlwZS5nZXRfcmF5X2Zyb21fc2NyZWVuX2Nvb3JkaW5hdGVzID0gZnVuY3Rpb24gKGNhbnZhcywgeCx5KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBtYyA9IG5ldyBNb3VzZV9DYW1lcmFfQ29udHJvbGxlcihjYW52YXMsIHRoaXMpO1xyXG4gICAgICAgIHZhciByYXkgPSBtYy5nZXRfcmF5X2Zyb21fY2FtZXJhX2luX3NjcmVlbl9jb29yZGluYXRlcyh4LHkpO1xyXG4gICAgICAgIHJldHVybiByYXk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn1cclxuXHJcbk1peGluKCk7XHJcbmV4cG9ydCB7TWl4aW59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9taXhpbnMvY2FtZXJhX21peGluLmpzIiwiZnVuY3Rpb24gTWl4X0l0KClcclxue1xyXG5cclxuXHJcblxyXG5cdC8vRklYXHJcblx0VEhSRUUuVmVjdG9yMy5wcm90b3R5cGUuYXBwbHlNYXRyaXg0X3JvdGF0aW9uID0gZnVuY3Rpb24gKCBtICkgXHJcblx0e1xyXG5cdFx0Ly8gaW5wdXQ6IFRIUkVFLk1hdHJpeDQgYWZmaW5lIG1hdHJpeFxyXG5cclxuXHRcdHZhciB4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB6ID0gdGhpcy56O1xyXG5cdFx0dmFyIGUgPSBtLmVsZW1lbnRzO1xyXG5cclxuXHRcdHRoaXMueCA9IGVbIDAgXSAqIHggKyBlWyA0IF0gKiB5ICsgZVsgOCBdICAqIHo7XHJcblx0XHR0aGlzLnkgPSBlWyAxIF0gKiB4ICsgZVsgNSBdICogeSArIGVbIDkgXSAgKiB6O1xyXG5cdFx0dGhpcy56ID0gZVsgMiBdICogeCArIGVbIDYgXSAqIHkgKyBlWyAxMCBdICogejtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuIFx0fVxyXG5cclxudmFyIE9iamVjdDNEX0FuaW1hdGlvbl9NaXhpbiA9IHtcclxuICAgIFxyXG4gICAgYWRkX2FuaW1hdGlvbjogZnVuY3Rpb24gKGFuaW0pXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbnMuaW5kZXhPZihhbmltKSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnB1c2goYW5pbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgcmVtb3ZlX2FuaW1hdGlvbjogZnVuY3Rpb24gKGFuaW0pXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMuYW5pbWF0aW9ucy5pbmRleE9mKGFuaW0pO1xyXG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgdXBkYXRlOiAgZnVuY3Rpb24gKGR0KVxyXG4gICAge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJvYmplY3QgdXBkYXRlXCIsIGR0KTtcclxuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0wOyBpIDwgdGhpcy5hbmltYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYW5pbSA9IHRoaXMuYW5pbWF0aW9uc1tpXTtcclxuICAgICAgICAgICAgICAgIGFuaW0udXBkYXRlKGR0KTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5yb3RhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBhbmltLmFwcGx5KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnJvdGF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAob2JqLnVwZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBcclxufTtcclxuXy5jb3B5X29iamVjdChUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUsIE9iamVjdDNEX0FuaW1hdGlvbl9NaXhpbik7XHJcblxyXG5cclxuVEhSRUUuT2JqZWN0M0QucHJvdG90eXBlLm9sZF90b0pzb24gPSBUSFJFRS5PYmplY3QzRC50b0pTT047XHJcblxyXG52YXIgT2JqZWN0M0RfU2VyaWFsaXphdGlvbl9NaXhpbiA9IFxyXG57XHJcbiAgICBzdGFuZGFyZF9zZXJpYWxpemF0aW9uOiBmdW5jdGlvbiAobWV0YSkgXHJcbiAgICB7XHJcblx0XHQvLyBzdGFuZGFyZCBPYmplY3QzRCBzZXJpYWxpemF0aW9uXHJcblx0XHR2YXIgb2JqZWN0ID0ge307XHJcblxyXG5cdFx0b2JqZWN0LnV1aWQgPSB0aGlzLnV1aWQ7XHJcblx0XHRvYmplY3QudHlwZSA9IHRoaXMudHlwZTtcclxuXHRcdGlmICggdGhpcy5uYW1lICE9PSAnJyApIG9iamVjdC5uYW1lID0gdGhpcy5uYW1lO1xyXG5cdFx0aWYgKCBKU09OLnN0cmluZ2lmeSggdGhpcy51c2VyRGF0YSApICE9PSAne30nICkgb2JqZWN0LnVzZXJEYXRhID0gdGhpcy51c2VyRGF0YTtcclxuXHRcdGlmICggdGhpcy5jYXN0U2hhZG93ID09PSB0cnVlICkgb2JqZWN0LmNhc3RTaGFkb3cgPSB0cnVlO1xyXG5cdFx0aWYgKCB0aGlzLnJlY2VpdmVTaGFkb3cgPT09IHRydWUgKSBvYmplY3QucmVjZWl2ZVNoYWRvdyA9IHRydWU7XHJcblx0XHRpZiAoIHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgKSBvYmplY3QudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuXHRcdG9iamVjdC5tYXRyaXggPSB0aGlzLm1hdHJpeC50b0FycmF5KCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT09IFwicGFydGljbGVzX3BvaW50c1wiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2VvbWV0cnkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lmdlb21ldHJ5ID0gdGhpcy5nZW9tZXRyeS51dWlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5tYXRlcmlhbCAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbC51dWlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIHRoaXMubWF0ZXJpYWwgIT09IHVuZGVmaW5lZCAgJiYgIG1ldGEubWF0ZXJpYWxzWyB0aGlzLm1hdGVyaWFsLnV1aWQgXSA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGEubWF0ZXJpYWxzWyB0aGlzLm1hdGVyaWFsLnV1aWQgXSA9IHRoaXMubWF0ZXJpYWwudG9KU09OKCBtZXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLmdlb21ldHJ5ICE9PSB1bmRlZmluZWQgJiYgbWV0YS5nZW9tZXRyaWVzWyB0aGlzLmdlb21ldHJ5LnV1aWQgXSA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGEuZ2VvbWV0cmllc1sgdGhpcy5nZW9tZXRyeS51dWlkIF0gPSB0aGlzLmdlb21ldHJ5LnRvSlNPTiggbWV0YSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbnMpIHtcclxuICAgICAgICAgICAgb2JqZWN0LmFuaW1hdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0wOyBpIDwgdGhpcy5hbmltYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuYW5pbWF0aW9ucy5wdXNoICggdGhpcy5hbmltYXRpb25zW2ldLnV1aWQgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHRcdGlmICggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwICkge1xyXG5cdFx0XHRvYmplY3QuY2hpbGRyZW4gPSBbXTtcclxuXHRcdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgKysgKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdGhpcy5jaGlsZHJlblsgaSBdO1xyXG5cdFx0XHRcdC8vb2JqZWN0LmNoaWxkcmVuLnB1c2goIGNoaWxkLnN0YW5kYXJkX3NlcmlhbGl6YXRpb24oIG1ldGEgKSApO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LmNoaWxkcmVuLnB1c2goIGNoaWxkLnRvSlNPTiggbWV0YSApICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgY29sbGVjdF9tYXRlcmlhbHM6IGZ1bmN0aW9uIChtZXRhKSBcclxuICAgIHtcclxuXHRcdGlmICggdGhpcy5tYXRlcmlhbCAhPT0gdW5kZWZpbmVkICAmJiAgbWV0YS5tYXRlcmlhbHNbIHRoaXMubWF0ZXJpYWwudXVpZCBdID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBtZXRhLm1hdGVyaWFsc1sgdGhpcy5tYXRlcmlhbC51dWlkIF0gPSB0aGlzLm1hdGVyaWFsLnRvSlNPTiggbWV0YSk7XHJcblx0XHR9XHJcbiAgICAgICAgXHJcblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcclxuXHRcdFx0dGhpcy5jaGlsZHJlblsgaSBdLmNvbGxlY3RfbWF0ZXJpYWxzKG1ldGEpO1xyXG5cdFx0fVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgY29sbGVjdF9nZW9tZXRyeTogZnVuY3Rpb24gKG1ldGEpXHJcbiAgICB7XHJcblx0XHRpZiAoIHRoaXMuZ2VvbWV0cnkgIT09IHVuZGVmaW5lZCAmJiBtZXRhLmdlb21ldHJpZXNbIHRoaXMuZ2VvbWV0cnkudXVpZCBdID09PSB1bmRlZmluZWQgKSB7XHJcblx0XHRcdFx0bWV0YS5nZW9tZXRyaWVzWyB0aGlzLmdlb21ldHJ5LnV1aWQgXSA9IHRoaXMuZ2VvbWV0cnkudG9KU09OKCBtZXRhICk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgKysgKSB7XHJcblx0XHRcdHRoaXMuY2hpbGRyZW5bIGkgXS5jb2xsZWN0X2dlb21ldHJ5KG1ldGEpO1xyXG5cdFx0fVxyXG4gICAgfSxcclxuICAgIFxyXG5cdHRvSlNPTjE6IGZ1bmN0aW9uICggbWV0YSApIHtcclxuICAgIFxyXG5cdFx0Ly8gZXh0cmFjdCBkYXRhIGZyb20gdGhlIGNhY2hlIGhhc2hcclxuXHRcdC8vIHJlbW92ZSBtZXRhZGF0YSBvbiBlYWNoIGl0ZW1cclxuXHRcdC8vIGFuZCByZXR1cm4gYXMgYXJyYXlcclxuXHRcdGZ1bmN0aW9uIGV4dHJhY3RGcm9tQ2FjaGUoIGNhY2hlLCB0ICkge1xyXG5cdFx0XHR2YXIgdmFsdWVzID0gW107XHJcblx0XHRcdGZvciAoIHZhciBrZXkgaW4gY2FjaGUgKSB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBjYWNoZVsga2V5IF07XHJcblx0XHRcdFx0ZGVsZXRlIGRhdGEubWV0YWRhdGE7XHJcblx0XHRcdFx0dmFsdWVzLnB1c2goIGRhdGEgKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdmFsdWVzO1xyXG5cdFx0fVxyXG4gICAgXHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4V29ybGQodHJ1ZSk7XHJcbiAgICAgICAgXHJcblx0XHQvLyBtZXRhIGlzICcnIHdoZW4gY2FsbGVkIGZyb20gSlNPTi5zdHJpbmdpZnlcclxuXHRcdHZhciBpc1Jvb3RPYmplY3QgPSAoIG1ldGEgPT09IHVuZGVmaW5lZCB8fCBtZXRhID09PSAnJyApO1xyXG5cclxuXHRcdHZhciBvdXRwdXQgPSB7fTtcclxuXHJcblx0XHRpZiAoIGlzUm9vdE9iamVjdCApIHtcclxuXHJcbiAgICAgICAgICAgIG1ldGEgPSB7XHJcblx0XHRcdFx0Z2VvbWV0cmllczoge30sXHJcblx0XHRcdFx0bWF0ZXJpYWxzOiB7fSxcclxuXHRcdFx0XHR0ZXh0dXJlczoge30sXHJcblx0XHRcdFx0aW1hZ2VzOiB7fVxyXG5cdFx0XHR9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdGhpcy5jb2xsZWN0X21hdGVyaWFscyhtZXRhKTtcclxuICAgICAgICAgICAgLy90aGlzLmNvbGxlY3RfZ2VvbWV0cnkobWV0YSk7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB0aGlzLnN0YW5kYXJkX3NlcmlhbGl6YXRpb24obWV0YSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHRcdFx0b3V0cHV0Lm1ldGFkYXRhID0ge1xyXG5cdFx0XHRcdHZlcnNpb246IDQuNCxcclxuXHRcdFx0XHR0eXBlOiAnT2JqZWN0JyxcclxuXHRcdFx0XHRnZW5lcmF0b3I6ICdPYmplY3QzRC50b0pTT04nXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgZ2VvbWV0cmllcyA9IGV4dHJhY3RGcm9tQ2FjaGUoIG1ldGEuZ2VvbWV0cmllcywgXCJnZW9pbVwiICk7XHJcblx0XHRcdHZhciBtYXRlcmlhbHMgPSBleHRyYWN0RnJvbUNhY2hlKCBtZXRhLm1hdGVyaWFscywgXCJtYXRlcmlhbHNcIiApO1xyXG5cdFx0XHR2YXIgdGV4dHVyZXMgPSBleHRyYWN0RnJvbUNhY2hlKCBtZXRhLnRleHR1cmVzLCBcInRleHR1cmVzXCIgKTtcclxuXHRcdFx0dmFyIGltYWdlcyA9IGV4dHJhY3RGcm9tQ2FjaGUoIG1ldGEuaW1hZ2VzLCBcImltYWdlc1wiICk7XHJcblxyXG5cdFx0XHRpZiAoIGdlb21ldHJpZXMubGVuZ3RoID4gMCApIG91dHB1dC5nZW9tZXRyaWVzID0gZ2VvbWV0cmllcztcclxuXHRcdFx0aWYgKCBtYXRlcmlhbHMubGVuZ3RoID4gMCApIG91dHB1dC5tYXRlcmlhbHMgPSBtYXRlcmlhbHM7XHJcblx0XHRcdGlmICggdGV4dHVyZXMubGVuZ3RoID4gMCApIG91dHB1dC50ZXh0dXJlcyA9IHRleHR1cmVzO1xyXG5cdFx0XHRpZiAoIGltYWdlcy5sZW5ndGggPiAwICkgb3V0cHV0LmltYWdlcyA9IGltYWdlcztcclxuXHJcbiAgICAgICAgICAgIHZhciBhbmltcyA9IHRoaXMuY29sbGVjdF9hbmltYXRpb25zKHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAoYW5pbXMuY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXRbXCJteWFuaW1hdGlvbnNcIl0gPSBhbmltcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBvdXRwdXQub2JqZWN0ID0gb2JqZWN0O1xyXG5cdFx0fSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0cHV0Lm9iamVjdCA9IHRoaXMuc3RhbmRhcmRfc2VyaWFsaXphdGlvbihtZXRhKTtcclxuICAgICAgICAgICAgb3V0cHV0LnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgICAgIGlmIChvdXRwdXQub2JqZWN0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaSBhbSB1bmRlZmluZWRcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cdFx0cmV0dXJuIG91dHB1dDtcclxuXHJcblxyXG5cdH0sXHJcbiAgICBcclxuICAgIGNvbGxlY3RfYW5pbWF0aW9uczogZnVuY3Rpb24gKHNjZW5lKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICBhbmltYXRpb25zIDoge30sXHJcbiAgICAgICAgICAgIGJpbmRpbmdzIDogW10sXHJcbiAgICAgICAgICAgIGNvdW50OiAwXHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBjb2xsZWN0X2FuaW1hdGlvbnNfcmVjdXJzaXZlKHJvb3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAocm9vdC5hbmltYXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPTA7IGkgPCByb290LmFuaW1hdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYW5pbSA9IHJvb3QuYW5pbWF0aW9uc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5hbmltYXRpb25zWyBhbmltLnV1aWQgXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYW5pbWF0aW9uc1sgYW5pbS51dWlkXSA9IGFuaW0udG9KU09OKCkgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgYmluZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmluZC51dWlkID0gcm9vdC51dWlkXHJcbiAgICAgICAgICAgICAgICBiaW5kLmFuaW1hdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9MDsgaSA8IHJvb3QuYW5pbWF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmQuYW5pbWF0aW9ucy5wdXNoKCByb290LmFuaW1hdGlvbnNbaV0udXVpZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYXRhLmJpbmRpbmdzLnB1c2goYmluZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyb290LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcm9vdC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3RfYW5pbWF0aW9uc19yZWN1cnNpdmUoIHJvb3QuY2hpbGRyZW5baV0gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb2xsZWN0X2FuaW1hdGlvbnNfcmVjdXJzaXZlKHNjZW5lKTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH0sXHJcbiAgICBcclxuIFxyXG59O1xyXG5cclxuXHJcbiAgXy5jb3B5X29iamVjdChUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUsIE9iamVjdDNEX1NlcmlhbGl6YXRpb25fTWl4aW4pO1xyXG4gIFxyXG5USFJFRS5PYmplY3QzRC5wcm90b3R5cGUuZG1fbWFyayA9ICd5ZXMsdGhpcyBvYmplY3QgaGFzIGJlZW4gbWFya2VkIGJ5IGJsYWNrIG1hZ2ljLCBvd25lZCBieSBtZSwgZGFyayBtYXR0ZXJzJzsgXHJcblxyXG4vL3JlcGxhY2Ugc291cmNlIHdpdGggdGhpc1xyXG5USFJFRS5PYmplY3QzRC5wcm90b3R5cGUucmVwbGFjZV9vYmplY3Rfd2l0aF90aGlzID0gZnVuY3Rpb24gKCBzb3VyY2UgKSB7XHJcblxyXG4gICAgdGhpcy51dWlkID0gc291cmNlLnV1aWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBzb3VyY2UubmFtZTtcclxuXHJcbiAgICB0aGlzLnVwLmNvcHkoIHNvdXJjZS51cCApO1xyXG4gICAgdGhpcy5wb3NpdGlvbi5jb3B5KCBzb3VyY2UucG9zaXRpb24gKTtcclxuICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KCBzb3VyY2UucXVhdGVybmlvbiApO1xyXG4gICAgdGhpcy5zY2FsZS5jb3B5KCBzb3VyY2Uuc2NhbGUgKTtcclxuXHJcbiAgICB0aGlzLm1hdHJpeC5jb3B5KCBzb3VyY2UubWF0cml4ICk7XHJcbiAgICB0aGlzLm1hdHJpeFdvcmxkLmNvcHkoIHNvdXJjZS5tYXRyaXhXb3JsZCApO1xyXG5cclxuICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IHNvdXJjZS5tYXRyaXhBdXRvVXBkYXRlO1xyXG4gICAgdGhpcy5tYXRyaXhXb3JsZE5lZWRzVXBkYXRlID0gc291cmNlLm1hdHJpeFdvcmxkTmVlZHNVcGRhdGU7XHJcblxyXG4gICAgdGhpcy52aXNpYmxlID0gc291cmNlLnZpc2libGU7XHJcblxyXG4gICAgdGhpcy5jYXN0U2hhZG93ID0gc291cmNlLmNhc3RTaGFkb3c7XHJcbiAgICB0aGlzLnJlY2VpdmVTaGFkb3cgPSBzb3VyY2UucmVjZWl2ZVNoYWRvdztcclxuXHJcbiAgICB0aGlzLmZydXN0dW1DdWxsZWQgPSBzb3VyY2UuZnJ1c3R1bUN1bGxlZDtcclxuICAgIHRoaXMucmVuZGVyT3JkZXIgPSBzb3VyY2UucmVuZGVyT3JkZXI7XHJcblxyXG4gICAgdGhpcy51c2VyRGF0YSA9IEpTT04ucGFyc2UoIEpTT04uc3RyaW5naWZ5KCBzb3VyY2UudXNlckRhdGEgKSApO1xyXG5cclxuICAgIC8vY29weSBhcnJheSBvZiBjaGlsZHJlbiwgbm90IGNsb25lXHJcbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzb3VyY2UuY2hpbGRyZW4ubGVuZ3RoOyBpICsrICkge1xyXG4gICAgICAgIHRoaXMuYWRkKCBzb3VyY2UuY2hpbGRyZW5bIGkgXSApO1xyXG4gICAgfVxyXG4gICAgc291cmNlLnBhcmVudC5hZGQodGhpcyk7XHJcbiAgICBzb3VyY2UucGFyZW50LnJlbW92ZShzb3VyY2UpO1xyXG4gICAgXHJcbiAgICB0aGlzLmFuaW1hdGlvbnMgPSBzb3VyY2UuYW5pbWF0aW9ucztcclxufVxyXG5cclxuXHJcbn1cclxuXHJcbk1peF9JdCgpO1xyXG5cclxuZXhwb3J0IHtNaXhfSXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9taXhpbnMvdGhyZWVqc19taXhpbnMuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0FmZmVjdG9yfSBmcm9tICcuL3BhcnRpY2xlX2FmZmVjdG9yLmpzJztcclxuXHJcbmZ1bmN0aW9uIEN1c3RvbV9BZmZlY3RvcigpXHJcbntcclxuXHRQYXJ0aWNsZV9BZmZlY3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5jdXN0b21fZnVuYyA9IGZ1bmN0aW9uIGR1bW15ICgpIHtyZXR1cm4gdHJ1ZTt9O1xyXG59XHJcblxyXG5cclxuQ3VzdG9tX0FmZmVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlKTtcclxuXHJcbl8uY29weV9vYmplY3QoQ3VzdG9tX0FmZmVjdG9yLnByb3RvdHlwZSwgXHJcbiAgICB7XHJcbiAgICBjb25zdHJ1Y3RvcjogQ3VzdG9tX0FmZmVjdG9yLFxyXG4gICBcdGFmZmVjdDogZnVuY3Rpb24gKGR0LCBwZGF0YSwgdmVydClcclxuXHR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tX2Z1bmMoZHQsIHAsIHZlcnQpO1xyXG5cdH0sXHJcbiAgICB0ZXN0X2Z1bmM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcCA9IHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcclxuICAgICAgICAgICAgdmVsb2NpdHk6IHt4OiAwLCB5OiAwLCB6OiAwfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNvbG9yID0ge3I6IDAsIGc6IDAsIGI6IDB9O1xyXG4gICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMocCwgY29sb3IpO1xyXG4gICAgfSxcclxuICAgIHNldF9hZmZlY3RfZnVuY3Rpb246IGZ1bmN0aW9uIChzb3VyY2UpIHsgICAgXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21fZnVuYyA9IHNvdXJjZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzb3VyY2UgID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21fZnVuYyA9IG5ldyBGdW5jdGlvbiAoJ2R0LHAsdmVydCcsIHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RfZnVuYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zb3VyY2VfY29kZSA9IHNvdXJjZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcblx0dG9KU09OOiBmdW5jdGlvbiAoKVxyXG5cdHtcclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgbmFtZTogXCJDdXN0b21fQWZmZWN0b3JcIlxyXG4gICAgICAgIH07XHJcblx0XHRkYXRhLnBhcmFtcyA9IE15X0xpYi5QYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdGhpcyk7XHJcblx0XHRwYXJhbXNbXCJzb3VyY2VfY29kZVwiXSA9IHRoaXMuc291cmNlX2NvZGU7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9LFxyXG5cdHBhcnNlOiBmdW5jdGlvbiAoanNvbilcclxuXHR7XHJcblx0XHRNeV9MaWIuUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnBhcnNlKHRoaXMsIGpzb24pO1xyXG5cdFx0dGhpcy5zZXRfYWZmZWN0X2Z1bmMoanNvbi5zb3VyY2VfY29kZSk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJDdXN0b21fQWZmZWN0b3JcIiwgQ3VzdG9tX0FmZmVjdG9yKTtcclxuXHJcbmV4cG9ydCB7Q3VzdG9tX0FmZmVjdG9yfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFydGljbGVzL2N1c3RvbV9hZmZlY3Rvci5qcyIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuLi9iYXNlL215X2xpYi5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVfRW1pdHRlcn0gZnJvbSAnLi9wYXJ0aWNsZV9lbWl0dGVyLmpzJztcclxuXHJcblxyXG5mdW5jdGlvbiBDdXN0b21fRW1pdHRlcigpXHJcbntcclxuXHRQYXJ0aWNsZV9FbWl0dGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcblxyXG5DdXN0b21fRW1pdHRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlKTtcclxuXHJcbnZhciBtZXRob2RzID0ge1xyXG4gICAgZW1pdDogZnVuY3Rpb24gKHAsIGNvbG9yKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tX2Z1bmMpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21fZnVuYyhwLCBjb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRlc3RfZnVuYzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBwID0ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjoge3g6IDAsIHk6IDAsIHo6IDB9LFxyXG4gICAgICAgICAgICB2ZWxvY2l0eToge3g6IDAsIHk6IDAsIHo6IDB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgY29sb3IgPSB7cjogMCwgZzogMCwgYjogMH07XHJcbiAgICAgICAgdGhpcy5jdXN0b21fZnVuYyhwLCBjb2xvcik7XHJcbiAgICB9LFxyXG4gICAgc2V0X2VtaXRfZnVuY3Rpb246IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbV9mdW5jID0gc291cmNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNvdXJjZSAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbV9mdW5jID0gbmV3IEZ1bmN0aW9uICgncCcsICdjb2xvcicsIHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RfZnVuYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zb3VyY2VfY29kZSA9IHNvdXJjZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdG9KU09OOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICBkYXRhLm5hbWUgPSBcIkN1c3RvbV9FbWl0dGVyXCI7XHJcbiAgICAgICAgZGF0YS5wYXJhbXMgPSBNeV9MaWIuUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuc291cmNlX2NvZGUpIHtcclxuICAgICAgICAgICAgZGF0YS5wYXJhbXMuc291cmNlX2NvZGUgPSB0aGlzLnNvdXJjZV9jb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH0sXHJcbiAgICBwYXJzZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBNeV9MaWIuUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUucGFyc2UuY2FsbCh0aGlzLCBkYXRhKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0X2VtaXRfZnVuY3Rpb24gKGRhdGEuc291cmNlX2NvZGUpO1xyXG4gICAgfSxcclxuICAgIGNvbnN0cnVjdG9yOiBDdXN0b21fRW1pdHRlcixcclxufTtcclxuXHJcbl8uY29weV9vYmplY3QoQ3VzdG9tX0VtaXR0ZXIucHJvdG90eXBlLCBtZXRob2RzKTtcclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiQ3VzdG9tX0VtaXR0ZXJcIiwgQ3VzdG9tX0VtaXR0ZXIpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHRlc3QoKVxyXG57XHJcbiAgICB2YXIgdCA9IG5ldyBDdXN0b21fRW1pdHRlcigpO1xyXG4gICAgdmFyIHNvdXJjZSA9ICdwLnBvc2l0aW9uLnogPSAtMTAwOyBwLnZlbG9jaXR5LnkgPSAxMDA7JztcclxuICAgIHQuc2V0X2VtaXRfZnVuY3Rpb24oc291cmNlKTtcclxuICAgIHZhciBwID0ge1xyXG4gICAgICAgIHZlbG9jaXR5OiB7eDogMCwgeTogMCwgejogMH0sXHJcbiAgICAgICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfVxyXG4gICAgfTtcclxuICAgIHQuY3VzdG9tX2Z1bmMocCk7XHJcbiAgICBjb25zb2xlLmxvZyhwKTtcclxuICAgIHZhciBqc29uID0gdC50b0pTT04oKTtcclxuICAgIGNvbnNvbGUubG9nKGpzb24pO1xyXG4gICAgXHJcbiAgICB0ID0gbmV3IEN1c3RvbV9FbWl0dGVyKCk7XHJcbiAgICB0LnBhcnNlKGpzb24ucGFyYW1zKTtcclxuICAgIC8vY29uc29sZS5sb2codC5jdXN0b21fZnVuYyk7ICAgIFxyXG59XHJcblxyXG4vL3Rlc3QoKTtcclxuXHJcbi8qXHJcbkN1c3RvbV9FbWl0dGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTXlfTGliLlBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlKTtcclxuQ3VzdG9tX0VtaXR0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29uZV9FbWl0dGVyO1xyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJDdXN0b21fRW1pdHRlclwiLCBDb25lX0VtaXR0ZXIpO1xyXG4qL1xyXG5cclxuZXhwb3J0IHtDdXN0b21fRW1pdHRlcn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhcnRpY2xlcy9jdXN0b21fZW1pdHRlci5qcyIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuLi9iYXNlL215X2xpYi5qcyc7XHJcblxyXG52YXIgUGFydGljbGVfRm9yY2VzID0ge307XHJcblxyXG4vL2Jhc2UgY2xhc3NcclxuUGFydGljbGVfRm9yY2VzLkZvcmNlID0gZnVuY3Rpb24gKClcclxue1xyXG59XHJcblxyXG5cclxuXy5jb3B5X29iamVjdChQYXJ0aWNsZV9Gb3JjZXMuRm9yY2UucHJvdG90eXBlLHtcclxuXHRcdGNhbGM6IGZ1bmN0aW9uIChkdCwgcGFydGljbGUsIGFjY2VsZXJhdGlvbikgXHJcblx0XHR7XHJcblx0XHR9LFxyXG5cdFx0dG9KU09OOiBmdW5jdGlvbiAoY2hpbGQpIFxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4ge307XHJcblx0XHR9LFxyXG5cdFx0cGFyc2U6IGZ1bmN0aW9uIChqc29uKSBcclxuXHRcdHtcclxuXHRcdH0sXHJcbn0pO1xyXG5cclxuLy9jb25zdGFudCBmb3JjZVxyXG5QYXJ0aWNsZV9Gb3JjZXMuQ29uc3RhbnRfRm9yY2UgPSBmdW5jdGlvbiAoZm9yY2UpXHJcbntcclxuXHRpZiAodHlwZW9mIGZvcmNlICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0dGhpcy5mb3JjZSA9IGZvcmNlO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aGlzLmZvcmNlID0ge3g6MCwgeTowLCB6OjB9O1xyXG5cdH1cclxufVxyXG5cclxuUGFydGljbGVfRm9yY2VzLkNvbnN0YW50X0ZvcmNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFydGljbGVfRm9yY2VzLkZvcmNlLnByb3RvdHlwZSk7XHJcbl8uY29weV9vYmplY3QoUGFydGljbGVfRm9yY2VzLkNvbnN0YW50X0ZvcmNlLnByb3RvdHlwZSwge1xyXG5cdGNvbnN0cnVjdG9yOiBQYXJ0aWNsZV9Gb3JjZXMuQ29uc3RhbnRfRm9yY2UsXHJcblx0Y2FsYzogZnVuY3Rpb24gKGR0LCBwLCBhY2NlbGVyYXRpb24pIFxyXG5cdHtcclxuXHRcdGFjY2VsZXJhdGlvbi54ICs9IHRoaXMuZm9yY2UueDtcclxuXHRcdGFjY2VsZXJhdGlvbi55ICs9IHRoaXMuZm9yY2UueTtcclxuXHRcdGFjY2VsZXJhdGlvbi56ICs9IHRoaXMuZm9yY2UuejtcclxuXHR9LFxyXG5cdHRvSlNPTjogZnVuY3Rpb24gKGNoaWxkKVxyXG5cdHtcclxuXHRcdHZhciBkYXRhID0ge307XHJcblx0XHRkYXRhLm5hbWUgPSBcIkNvbnN0YW50X0ZvcmNlXCI7XHJcblx0XHRkYXRhLmZvcmNlID0gXy5jcmVhdGVfY2xvbmVfb2JqZWN0KHRoaXMuZm9yY2UpO1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fSxcclxuXHRwYXJzZTogZnVuY3Rpb24gKGpzb24pXHJcblx0e1x0XHJcblx0XHRpZiAoanNvbi5mb3JjZSkge1xyXG5cdFx0XHRfLmNvcHlfb2JqZWN0KHRoaXMuZm9yY2UsIGpzb24uZm9yY2UpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJDb25zdGFudF9Gb3JjZVwiLCBQYXJ0aWNsZV9Gb3JjZXMuQ29uc3RhbnRfRm9yY2UpO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9Gb3JjZXN9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvZm9yY2VzLmpzIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuaW1wb3J0IHtQb2ludF9HZW5lcmF0b3JzfSBmcm9tICcuL3BvaW50X2dlbmVyYXRvcnMuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0VtaXR0ZXJ9IGZyb20gJy4vcGFydGljbGVfZW1pdHRlci5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVfQWZmZWN0b3J9IGZyb20gJy4vcGFydGljbGVfYWZmZWN0b3IuanMnO1xyXG5cclxuZnVuY3Rpb24gIENvbmVfRW1pdHRlcigpXHJcbntcclxuXHRQYXJ0aWNsZV9FbWl0dGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0dGhpcy5nZW5lcmF0b3IgPSBuZXcgUG9pbnRfR2VuZXJhdG9ycy5SYW5kb21fRGlyZWN0aW9uKCk7XHJcblx0dGhpcy5vcmlnaW4gPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAwKTtcclxuXHR0aGlzLnZlbG9jaXR5ID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCk7XHJcblx0dGhpcy5kaXNwZXJzaW9uID0ge1wibWluXCI6IDUsIFwibWF4XCI6IDEwfTtcclxuXHR0aGlzLmRpc3BlcnNpb24uZGVsdGEgPSA1O1xyXG5cdHRoaXMuc3BlZWQgPSB7bWluOiA1LCBtYXg6IDEwLCBkZWx0YTo1fTtcclxuXHR0aGlzLmNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKDEsIDEsIDEpO1xyXG59XHJcblxyXG5Db25lX0VtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZSk7XHJcbkNvbmVfRW1pdHRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb25lX0VtaXR0ZXI7XHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIkNvbmVfRW1pdHRlclwiLCBDb25lX0VtaXR0ZXIpO1xyXG5cclxuQ29uZV9FbWl0dGVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKVxyXG57XHJcblx0dmFyIGRhdGEgPSB7fTtcclxuXHRkYXRhLm5hbWUgPSBcIkNvbmVfRW1pdHRlclwiO1xyXG5cdGRhdGEucGFyYW1zID0gUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdGhpcyk7XHJcblx0Xy5jbG9uZV9maWVsZF9saXN0X29uZV9sZXZlbF9yZWN1cnNpb24odGhpcywgZGF0YS5wYXJhbXMsIFxyXG5cdFtcIm9yaWdpblwiLCBcclxuXHRcInZlbG9jaXR5XCIsIFxyXG5cdFwiZGlzcGVyc2lvblwiLFxyXG5cdFwic3BlZWRcIl0pO1xyXG5cdFxyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5Db25lX0VtaXR0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKGRhdGEpXHJcbntcclxuXHRQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS5wYXJzZS5jYWxsKHRoaXMsIGRhdGEpO1xyXG5cdHRoaXMub3JpZ2luLmNvcHkoZGF0YS5vcmlnaW4pO1xyXG5cdHRoaXMudmVsb2NpdHkuY29weShkYXRhLnZlbG9jaXR5KTtcclxuXHR0aGlzLnNldF9kaXNwZXJzaW9uKGRhdGEuZGlzcGVyc2lvbi5taW4sIGRhdGEuZGlzcGVyc2lvbi5tYXgpO1xyXG5cdHRoaXMuc2V0X3NwZWVkKGRhdGEuc3BlZWQubWluLCBkYXRhLnNwZWVkLm1heCk7XHJcbn1cclxuXHJcbkNvbmVfRW1pdHRlci5wcm90b3R5cGUuc2V0X3NwZWVkID0gZnVuY3Rpb24gKG1pbiwgbWF4KVxyXG57XHJcblx0dGhpcy5zcGVlZC5taW4gPSBtaW47XHJcblx0dGhpcy5zcGVlZC5tYXggPSBtYXg7XHJcblx0dGhpcy5zcGVlZC5kZWx0YSA9IG1heCAtIG1pbjtcclxufVxyXG5cclxuXHJcbkNvbmVfRW1pdHRlci5wcm90b3R5cGUuc2V0X2Rpc3BlcnNpb24gPSBmdW5jdGlvbiAobWluLCBtYXgpXHJcbntcclxuXHR0aGlzLmRpc3BlcnNpb24ubWluID0gbWluO1xyXG5cdHRoaXMuZGlzcGVyc2lvbi5tYXggPSBtYXg7XHJcblx0dGhpcy5kaXNwZXJzaW9uLmRlbHRhID0gbWF4IC0gbWluO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5Db25lX0VtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAocCwgY29sb3IsIG1hdHJpeClcclxue1xyXG5cdHAucG9zaXRpb24uY29weSh0aGlzLm9yaWdpbik7XHJcblx0XHJcblx0dGhpcy5nZW5lcmF0b3IuZ2V0X2RpcmVjdGlvbihwLnZlbG9jaXR5KTtcclxuXHRwLnZlbG9jaXR5Lm11bHRpcGx5U2NhbGFyKE1hdGgucmFuZG9tKCkqdGhpcy5kaXNwZXJzaW9uLmRlbHRhICsgdGhpcy5kaXNwZXJzaW9uLm1pbik7XHRcclxuXHRwLnZlbG9jaXR5LmFkZCh0aGlzLnZlbG9jaXR5KS5ub3JtYWxpemUoKTtcclxuXHRcclxuICAgIGlmIChtYXRyaXgpIHtcclxuICAgICAgICBwLnBvc2l0aW9uLmFwcGx5TWF0cml4NChtYXRyaXgpO1xyXG4gICAgICAgIHAudmVsb2NpdHkuYXBwbHlNYXRyaXg0X3JvdGF0aW9uKG1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcblx0cC52ZWxvY2l0eS5tdWx0aXBseVNjYWxhcihNYXRoLnJhbmRvbSgpKnRoaXMuc3BlZWQuZGVsdGEgKyB0aGlzLnNwZWVkLm1pbik7XHRcclxuXHRcclxuICAgIFxyXG5cdGlmIChjb2xvcikge1xyXG5cdFx0dGhpcy5lbWl0X2NvbG9yKGNvbG9yKTtcclxuXHR9XHJcbiAgICBcclxufVxyXG5cclxuQ29uZV9FbWl0dGVyLnByb3RvdHlwZS5lbWl0X2NvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSBcclxue1xyXG5cdGNvbG9yLmNvcHkodGhpcy5jb2xvcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNwaGVyZV9FbWl0dGVyKHJhZGl1cywgc3BlZWQpXHJcbntcclxuXHRQYXJ0aWNsZV9FbWl0dGVyLmNhbGwodGhpcyk7XHJcblx0dGhpcy5yYWRpdXMgPSByYWRpdXMgfHwgMTtcclxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZCB8fCAxO1xyXG5cdHRoaXMuZ2VuZXJhdG9yID0gbmV3IFBvaW50X0dlbmVyYXRvcnMuU3BoZXJlKHJhZGl1cyk7XHJcbiAgICB0aGlzLmZyb21fY2VudGVyID0gdHJ1ZTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmFkaXVzJywge1xyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7IHJhZGl1cyA9IHZhbHVlOyBnZW5lcmF0b3IucmFkaXVzID0gdmFsdWU7fVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblNwaGVyZV9FbWl0dGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUpO1xyXG5cclxuXy5jb3B5X29iamVjdChTcGhlcmVfRW1pdHRlci5wcm90b3R5cGUsIHtcclxuICAgIGNvbnN0cnVjdG9yOiBTcGhlcmVfRW1pdHRlcixcclxuICAgIGVtaXQ6IGZ1bmN0aW9uIChwLCBjb2xvciwgbWF0cml4KVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmZyb21fY2VudGVyKSB7XHJcbiAgICAgICAgICAgIHAucG9zaXRpb24uc2V0KDAsMCwwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRvci5nZXRfcG9pbnQocC5wb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2VuZXJhdG9yLmdldF9ub3JtYWwocC52ZWxvY2l0eSk7XHJcbiAgICAgICAgaWYgKG1hdHJpeCkge1xyXG4gICAgICAgICAgICBwLnBvc2l0aW9uLmFwcGx5TWF0cml4NChtYXRyaXgpO1xyXG4gICAgICAgICAgICBwLnZlbG9jaXR5LmFwcGx5TWF0cml4NF9yb3RhdGlvbihtYXRyaXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwLnZlbG9jaXR5Lm11bHRpcGx5U2NhbGFyKHRoaXMuc3BlZWQpO1xyXG4gICAgfSxcclxuICAgIHRvSlNPTjogZnVuY3Rpb24gKGpzb24pIHtcclxuXHRcdHZhciBwYXJhbXMgPSBQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS50b0pTT04uY2FsbCh0aGlzLCB0aGlzKTtcclxuICAgICAgICBwYXJhbXMucmFkaXVzID0gdGhpcy5yYWRpdXM7XHJcbiAgICAgICAgcGFyYW1zLnNwZWVkID0gdGhpcy5zcGVlZDtcclxuICAgICAgICAvL3BhcmFtcy5nZW5lcmF0b3IucmFkaXVzID0gdGhpcy5yYWRpdXM7XHJcbiAgICB9LFxyXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChqc29uKSB7XHJcblx0XHRQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS5wYXJzZS5jYWxsKHRoaXMsIGpzb24pO1xyXG4gICAgICAgIHRoaXMucmFkaXVzID0ganNvbi5yYWRpdXM7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IGpzb24uc3BlZWQ7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiU3BoZXJlX0VtaXR0ZXJcIiwgU3BoZXJlX0VtaXR0ZXIpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIFN0YXJfRHVzdF9FbWl0dGVyICgpXHJcbntcclxuXHRQYXJ0aWNsZV9FbWl0dGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0dGhpcy5zdGFydF9wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApO1xyXG5cdHRoaXMuZW5kX3Bvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMSk7XHJcblx0dGhpcy5kZWx0YSA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpO1x0XHJcblx0dGhpcy52ZWxvY2l0eSA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDEpO1xyXG59XHJcblxyXG5TdGFyX0R1c3RfRW1pdHRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlKTtcclxuU3Rhcl9EdXN0X0VtaXR0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3Rhcl9EdXN0X0VtaXR0ZXI7XHJcbl8uY29weV9vYmplY3QoIFN0YXJfRHVzdF9FbWl0dGVyLnByb3RvdHlwZSx7XHJcblx0c2V0X3ZlbG9jaXR5OiBmdW5jdGlvbiAoeCx5LCB6KSBcclxuXHR7XHJcblx0XHR0aGlzLnZlbG9jaXR5LnNldCh4LCB5LCB6KTtcclxuXHR9LFxyXG5cdHNldF9wb3NpdGlvbl9yYW5nZSA6IGZ1bmN0aW9uIChzdGFydCwgZW5kKVxyXG5cdHtcclxuXHRcdHRoaXMuc3RhcnRfcG9zaXRpb24uY29weShzdGFydCk7XHJcblx0XHR0aGlzLmVuZF9wb3NpdGlvbi5jb3B5KGVuZCk7XHJcblx0XHR0aGlzLmRlbHRhLnNldChlbmQueCAtIHN0YXJ0LngsIGVuZC55LXN0YXJ0LnksIGVuZC56LXN0YXJ0LnopO1xyXG5cdFx0XHJcblx0fSxcclxuXHRnZXRfcG9zaXRpb246IGZ1bmN0aW9uICh2ZWN0b3IpXHJcblx0e1xyXG5cdFx0dmVjdG9yLnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5kZWx0YS54ICsgdGhpcy5zdGFydF9wb3NpdGlvbi54O1xyXG5cdFx0dmVjdG9yLnkgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5kZWx0YS55ICsgdGhpcy5zdGFydF9wb3NpdGlvbi55O1xyXG5cdFx0dmVjdG9yLnogPSBNYXRoLnJhbmRvbSgpICogdGhpcy5kZWx0YS56ICsgdGhpcy5zdGFydF9wb3NpdGlvbi56O1xyXG5cdH0sXHJcblx0Z2V0X3ZlbG9jaXR5OiBmdW5jdGlvbiAodmVjdG9yKVxyXG5cdHtcclxuXHRcdHZlY3Rvci54ID0gdGhpcy52ZWxvY2l0eS54O1xyXG5cdFx0dmVjdG9yLnkgPSB0aGlzLnZlbG9jaXR5Lnk7XHJcblx0XHR2ZWN0b3IueiA9IHRoaXMudmVsb2NpdHkuejtcclxuXHR9LFxyXG5cdGVtaXQ6IGZ1bmN0aW9uIChwKVxyXG5cdHtcclxuXHRcdHRoaXMuZ2V0X3Bvc2l0aW9uKHAucG9zaXRpb24pO1xyXG5cdFx0aWYgKHRoaXMucGFyZW50KSB7XHJcblx0XHRcdHRoaXMucGFyZW50LmxvY2FsVG9Xb3JsZChwLnBvc2l0aW9uKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZ2V0X3ZlbG9jaXR5KHAudmVsb2NpdHkpO1xyXG5cdH0sXHJcblx0dG9KU09OOiBmdW5jdGlvbiAoKVxyXG5cdHtcclxuXHRcdHZhciBwYXJhbXMgPSBQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS50b0pTT04uY2FsbCh0aGlzLCB0aGlzKTtcclxuXHRcdF8uY2xvbmVfZmllbGRfbGlzdF9vbmVfbGV2ZWxfcmVjdXJzaW9uKHRoaXMsIHBhcmFtcywgW1widmVsb2NpdHlcIiwgXHJcblx0XHRcInN0YXJ0X3Bvc2l0aW9uXCIsXHJcblx0XHRcImVuZF9wb3NpdGlvblwiXSlcclxuXHRcdHZhciBkYXRhID0ge1xyXG5cdFx0XHRcIm5hbWVcIjogXCJTdGFyX0R1c3RfRW1pdHRlclwiLFxyXG5cdFx0XHRcInBhcmFtc1wiOiBwYXJhbXMsXHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fSxcclxuXHRwYXJzZTogZnVuY3Rpb24gKGpzb24pXHJcblx0e1xyXG5cdFx0UGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUucGFyc2UuY2FsbCh0aGlzLCBqc29uKTtcclxuXHRcdHRoaXMuc2V0X3Bvc2l0aW9uX3JhbmdlKGpzb24uc3RhcnRfcG9zaXRpb24sIGpzb24uZW5kX3Bvc2l0aW9uKTtcclxuXHRcdHRoaXMudmVsb2NpdHkuY29weShqc29uLnZlbG9jaXR5KTtcclxuXHR9XHJcblx0XHJcbn0pO1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiU3Rhcl9EdXN0X0VtaXR0ZXJcIiwgU3Rhcl9EdXN0X0VtaXR0ZXIpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIFN0YXJfRHVzdF9BZmZlY3RvciAoZW5kKVxyXG57XHJcblx0dGhpcy5lbmQgPSBlbmQgfHwgMDtcclxufVxyXG5cclxuXHJcblN0YXJfRHVzdF9BZmZlY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcnRpY2xlX0FmZmVjdG9yLnByb3RvdHlwZSk7XHJcblN0YXJfRHVzdF9BZmZlY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdGFyX0R1c3RfQWZmZWN0b3I7XHJcblxyXG5fLmNvcHlfb2JqZWN0KFN0YXJfRHVzdF9BZmZlY3Rvci5wcm90b3R5cGUse1xyXG5cdGFmZmVjdDogZnVuY3Rpb24gKGR0LCBwZGF0YSwgdmVydClcclxuXHR7XHJcblx0XHRpZiAocGRhdGEucG9zaXRpb24ueiA+IHRoaXMuZW5kKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0sXHJcblx0dG9KU09OOiBmdW5jdGlvbiAoKVxyXG5cdHtcclxuXHRcdHZhciBwYXJhbXMgPSBQYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdGhpcyk7XHJcblx0XHRwYXJhbXNbXCJlbmRcIl0gPSB0aGlzLmVuZDtcclxuXHRcdHZhciBkYXRhID0ge1xyXG5cdFx0XHRcIm5hbWVcIjogXCJTdGFyX0R1c3RfQWZmZWN0b3JcIixcclxuXHRcdFx0XCJwYXJhbXNcIjogcGFyYW1zLFxyXG5cclxuXHRcdH07XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9LFxyXG5cdHBhcnNlOiBmdW5jdGlvbiAoanNvbilcclxuXHR7XHJcblx0XHRQYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUucGFyc2UodGhpcywganNvbik7XHJcblx0XHR0aGlzLmVuZCA9IGpzb24uZW5kO1xyXG5cdH1cclxufSk7XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJTdGFyX0R1c3RfQWZmZWN0b3JcIiwgU3Rhcl9EdXN0X0FmZmVjdG9yKTtcclxuXHJcbmV4cG9ydCB7Q29uZV9FbWl0dGVyLCBTdGFyX0R1c3RfRW1pdHRlciwgU3BoZXJlX0VtaXR0ZXIsIFN0YXJfRHVzdF9BZmZlY3Rvcn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhcnRpY2xlcy90ZXN0X2VtaXR0ZXJzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==