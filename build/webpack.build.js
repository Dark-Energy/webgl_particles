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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particles_Points; });

function Particles_Points(geometry, material) {
    THREE.Points.call(this, geometry, material);
    this.type = 'particles_points';

    this.boundingSphere = new THREE.Sphere();
    this.boundingSphere.radius = 10.0;
}

Particles_Points.prototype = Object.create(THREE.Points.prototype);

Particles_Points.prototype.constructor = Particles_Points;

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
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mouse_Intersector; });
var Mouse_Intersector = {};

Mouse_Intersector.mouse_coords_to_vector = function (canvas, event) {
	var offset = canvas.getBoundingClientRect();
	var width = canvas.clientWidth;
	var height = canvas.clientHeight;
	//normalize coordinates
	var x = (event.clientX - offset.left) / width;
	var y = (event.clientY - offset.top) / height;
	var x = x * 2 - 1;
	var y = -(y * 2 - 1);
	//console.log("mouse coords",  x,y, );    
	var vector = new THREE.Vector3(x, y, 1);
	return vector;
};

Mouse_Intersector.unproject = function (vector, camera) {
	var r = new THREE.Vector3();
	r.copy(vector);
	r.z = 1;
	r.unproject(camera);
	r.applyMatrix4(camera.matrixWorldInverse);
	return r;
};

Mouse_Intersector.mouse_coords_to_ray = function (canvas, event, camera) {
	var offset = canvas.getBoundingClientRect();
	var width = canvas.clientWidth;
	var height = canvas.clientHeight;
	var x = (event.clientX - offset.left) / width * 2 - 1;
	var y = -((event.clientY - offset.top) / height * 2 - 1);
	var vector = new THREE.Vector3(x, y, 1);

	vector.unproject(camera);
	var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
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



/***/ }),
/* 6 */
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
	'gl_PointSize = 0.0;', '}', '}'];

	var fragment_shader = ['varying vec4 vcolor;', '#ifdef PARTICLE_TEXTURE', 'uniform sampler2D sprite;', '#endif', 'void main() {', '#ifdef PARTICLE_TEXTURE', 'vec4 tex = texture2D( sprite, gl_PointCoord );', 'vec3 fragment_color = tex.rgb;', 'fragment_color.rgb *= vcolor.rgb;', 'float alpha = tex.a;', '#else', 'vec3 fragment_color = vcolor.rgb;', 'float alpha = 1.0;', '#endif', '#ifdef PRE_ALPHA', 'fragment_color.rgb *= alpha;', '#endif', '#ifndef NO_FADE_COLOR', 'float fragment_alpha = alpha * vcolor.a;', '#else', 'float fragment_alpha = alpha;', '#endif', 'gl_FragColor = vec4(fragment_color.rgb, fragment_alpha);', '}'];

	Particle_Shaders.vertex = vertex_shader.join('\n');
	Particle_Shaders.fragment = fragment_shader.join('\n');
})();



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_System; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__particle_affector_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particles_points_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particle_shaders_js__ = __webpack_require__(6);






function Particle_System(params) {
				this.uuid = _.generateUUID();

				//restricted params
				if (!params.emitter) {
								params.emitter = new __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__["a" /* Particle_Emitter */](1);
				}
				if (!params.affector) {
								params.affector = new __WEBPACK_IMPORTED_MODULE_2__particle_affector_js__["a" /* Particle_Affector */]();
				}
				params.no_fade_color = !!params.no_fade_color;
				params.particle_lifetime = params.particle_lifetime || 3.0;

				if (typeof params.pre_alpha === 'undefined') {
								params.pre_alpha = true;
				}

				if (typeof params.depth_test === 'undefined') {
								params.depth_test = true;
				}

				if (params["depth_write"] === undefined) {
								params.depth_write = false;
				}

				if (!params.color) {
								params.color = { "r": 1, "g": 1, "b": 1 };
				}

				if (!params.blending) {
								params.blending = "one_alpha";
				}

				params.size = params.size || 1;

				if (!params.count) params.count = 100;

				this.emitter = params.emitter;
				this.affector = params.affector;
				this.name = params.name || '';
				this.particle_lifetime = params.particle_lifetime;
				this.params = params;

				this.texture = params.texture;

				this.dynamic_color = !!params.end_color || !!params.random_color;

				var count = params.count;

				this.material = this.create_particle_material();
				this.node = new __WEBPACK_IMPORTED_MODULE_3__particles_points_js__["a" /* Particles_Points */](this.create_particle_geometry(count), this.material);
				this.node.name = this.name;

				if (typeof this.params.bounding_sphere !== 'undefined') {
								this.node.boundingSphere.radius = params.bounding_sphere;
				}
}

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

								colors[i * 3] = this.params.color.r;
								colors[i * 3 + 1] = this.params.color.g;
								colors[i * 3 + 2] = this.params.color.b;
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
				return defines;
};

Particle_System.prototype.select_texture = function (texture) {
				if (typeof this.texture === 'string') {
								this.texture = __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Texture_Manager.get(this.texture);
								console.log(__WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Texture_Manager.resources);
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

Particle_System.prototype.emit_particles = function (dt, need_emit) {
				//emit particles
				var p;
				var verts = this.geometry.vertices.array;
				var params = this.geometry.params.array;
				//var colors = this.geometry.colors.array;
				//var dummy_color = new THREE.Color(1,1,1);

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

				var need_emit = this.emitter.calc_emitted_particles(dt);
				this.emit_particles(dt, need_emit);

				this.geometry.vertices.needsUpdate = true;
				this.geometry.params.needsUpdate = true;
				this.geometry.colors.needsUpdate = true;
};

Particle_System.prototype.update = function (dt) {
				this.update_particle_geometry(dt);
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle_Manager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_emitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__particle_affector_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particles_points_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particles_js__ = __webpack_require__(7);






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
        var ps = new __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].Particle_System(params);
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
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Application; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_event_hub_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_mouse_intersector_js__ = __webpack_require__(5);
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

var run_function = //window.requestAnimationFrame;
function (callback) {
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

Application.prototype.update = function (delta) {
    this.update_all(delta);
    __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__["a" /* My_Lib */].particle_manager.update(delta);
};

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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Base_Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Euler_Animation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(0);


function Base_Animation() {
    this.time = 0;
    this.time_scale = 1.0;
    this.type = "Base_Animation";
}

Base_Animation.prototype.update = function (dt) {
    var scaled_dt = dt * this.time_scale;
    this.time += scaled_dt;
    this.calc_animation(dt);
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
    data.time_scale = this.time_scale;
    return data;
};

Base_Animation.prototype.parse = function (param) {
    this.type = param.type;
    this.uuid = param.uuid;
    this.name = param.name ? param.name : '';
    this.time_scale = param.time_scale === undefined ? 1.0 : param.time_scale;
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
    this.uuid = _.generateUUID();
}

Euler_Animation.prototype = Object.create(Base_Animation.prototype);

__WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].Register_Class("Base_Animation", Base_Animation);
__WEBPACK_IMPORTED_MODULE_0__my_lib_js__["a" /* My_Lib */].Register_Class("Euler_Animation", Euler_Animation);

Euler_Animation.prototype.constructor = Euler_Animation;

Euler_Animation.prototype.calc_animation = function (dt) {
    dt *= this.time_scale;
    this.x += this.xspeed * dt;
    this.y += this.yspeed * dt;
    this.z += this.zspeed * dt;
};

Euler_Animation.prototype.apply = function (obj) {
    obj.rotation.x = this.x;
    obj.rotation.y = this.y;
    obj.rotation.z = this.z;
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



/***/ }),
/* 12 */
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
			console.error("Error!", error);
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
/* 13 */
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scene_Serializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particles_particles_manager_js__ = __webpack_require__(8);



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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Mix_It */
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
            if (this.animations !== undefined) {
                for (var i = 0; i < this.animations.length; i++) {
                    var anim = this.animations[i];
                    anim.update(dt);
                    anim.apply(this);
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cone_Emitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Star_Dust_Emitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Sphere_Emitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Star_Dust_Affector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_my_lib_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point_generators_js__ = __webpack_require__(9);
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

function Sphere_Emitter(radius) {
	__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].call(this);
	this.radius = radius;
	this.generator = new __WEBPACK_IMPORTED_MODULE_1__point_generators_js__["a" /* Point_Generators */].Sphere(radius);
}

Sphere_Emitter.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_2__particle_emitter_js__["a" /* Particle_Emitter */].prototype);
Sphere_Emitter.prototype.constructor = Sphere_Emitter;

Sphere_Emitter.prototype.emit = function (p) {
	this.generator.get_point(p.position);
	this.generator.get_normal(p.velocity);
	p.velocity.multiplyScalar(10);
};

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



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_event_hub_js__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "main_event_hub", function() { return __WEBPACK_IMPORTED_MODULE_0__base_event_hub_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Event_Hub", function() { return __WEBPACK_IMPORTED_MODULE_0__base_event_hub_js__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_my_lib_js__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "My_Lib", function() { return __WEBPACK_IMPORTED_MODULE_1__base_my_lib_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_animations_js__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Base_Animation", function() { return __WEBPACK_IMPORTED_MODULE_2__base_animations_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Euler_Animation", function() { return __WEBPACK_IMPORTED_MODULE_2__base_animations_js__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_mouse_intersector_js__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Mouse_Intersector", function() { return __WEBPACK_IMPORTED_MODULE_3__base_mouse_intersector_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_loading_manager_js__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Loading_Manager", function() { return __WEBPACK_IMPORTED_MODULE_4__base_loading_manager_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_package_manager_js__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Package_Manager", function() { return __WEBPACK_IMPORTED_MODULE_5__base_package_manager_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__particles_particles_points_js__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particles_Points", function() { return __WEBPACK_IMPORTED_MODULE_6__particles_particles_points_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__particles_particle_emitter_js__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particle_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_7__particles_particle_emitter_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__particles_forces_js__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particle_Forces", function() { return __WEBPACK_IMPORTED_MODULE_8__particles_forces_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__particles_particle_affector_js__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particle_Affector", function() { return __WEBPACK_IMPORTED_MODULE_9__particles_particle_affector_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__particles_point_generators_js__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Point_Generators", function() { return __WEBPACK_IMPORTED_MODULE_10__particles_point_generators_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__particles_custom_emitter_js__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Custom_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_11__particles_custom_emitter_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__particles_custom_affector_js__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Custom_Affector", function() { return __WEBPACK_IMPORTED_MODULE_12__particles_custom_affector_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__particles_test_emitters_js__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Cone_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_13__particles_test_emitters_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Star_Dust_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_13__particles_test_emitters_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Sphere_Emitter", function() { return __WEBPACK_IMPORTED_MODULE_13__particles_test_emitters_js__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Star_Dust_Affector", function() { return __WEBPACK_IMPORTED_MODULE_13__particles_test_emitters_js__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__particles_particle_shaders_js__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particle_Shaders", function() { return __WEBPACK_IMPORTED_MODULE_14__particles_particle_shaders_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__particles_particles_js__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particle_System", function() { return __WEBPACK_IMPORTED_MODULE_15__particles_particles_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__particles_particles_manager_js__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particle_Manager", function() { return __WEBPACK_IMPORTED_MODULE_16__particles_particles_manager_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__base_scene_serializer_js__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Scene_Serializer", function() { return __WEBPACK_IMPORTED_MODULE_17__base_scene_serializer_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__base_threejs_mixins_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_application_js__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return __WEBPACK_IMPORTED_MODULE_19__app_application_js__["a"]; });



































/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzA4MzQ4MDJlMDEzZjg1YjY3MzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2UvbXlfbGliLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVfYWZmZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZV9lbWl0dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVzX3BvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS9ldmVudF9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2UvbW91c2VfaW50ZXJzZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZV9zaGFkZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVzX21hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9wb2ludF9nZW5lcmF0b3JzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvYXBwbGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2UvYW5pbWF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS9sb2FkaW5nX21hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2UvcGFja2FnZV9tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXNlL3NjZW5lX3NlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhc2UvdGhyZWVqc19taXhpbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9jdXN0b21fYWZmZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnRpY2xlcy9jdXN0b21fZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL2ZvcmNlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzL3Rlc3RfZW1pdHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZV9tYWluX3dlYnBhY2suanMiXSwibmFtZXMiOlsiTXlfTGliIiwiVmlld3BvcnQiLCJPYmplY3RfQW5pbWF0aW9uIiwib2JqZWN0IiwiYW5pbWF0aW9uIiwicHJvdG90eXBlIiwidXBkYXRlIiwiZHQiLCJjcmVhdGVfdGV4dF9pbWFnZSIsIndpZHRoIiwiaGVpZ2h0IiwidGV4dCIsIm5wb3QiLCJiYWNrZ3JvdW5kIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dCIsImdldENvbnRleHQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImZvbnQiLCJmaWxsVGV4dCIsInRleHR1cmUiLCJUSFJFRSIsIlRleHR1cmUiLCJ3cmFwUyIsIndyYXBUIiwiVGV4dHVyZVdyYXBwaW5nIiwiQ2xhbXBUb0VkZ2VXcmFwcGluZyIsIm1pbkZpbHRlciIsIkxpbmVhckZpbHRlciIsIm5lZWRzVXBkYXRlIiwiQ3JlYXRlX1F1YWQiLCJ2ZXJ0ZXhfc2hhZGVyIiwiZnJhZ21lbnRfc2hhZGVyIiwicGxhbmUiLCJQbGFuZUJ1ZmZlckdlb21ldHJ5IiwibWF0ZXJpYWwiLCJTaGFkZXJNYXRlcmlhbCIsInZlcnRleFNoYWRlciIsImZyYWdtZW50U2hhZGVyIiwicXVhZCIsIk1lc2giLCJyb3RhdGlvbiIsInkiLCJNYXRoIiwiUEkiLCJSZW5kZXJfVGFyZ2V0IiwidGFyZ2V0IiwiV2ViR0xSZW5kZXJUYXJnZXQiLCJtYWdGaWx0ZXIiLCJOZWFyZXN0RmlsdGVyIiwiZm9ybWF0IiwiUkdCRm9ybWF0IiwiY2FtZXJhIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJyZW5kZXIiLCJzY2VuZSIsInJlbmRlcmVyIiwiY3JlYXRlX292ZXJsYXlfY2FtZXJhIiwiT3J0aG9ncmFwaGljQ2FtZXJhIiwiT3ZlcmxheSIsImF1dG9DbGVhciIsIk1vdXNlX0NvbnRyb2xsZXIiLCJyb290Iiwib3ZlciIsImNsaWNrIiwiY2FsbGJhY2siLCJldmVudF9odWIiLCJFdmVudF9IdWIiLCJldmVudHMiLCJhZGRfZXZlbnRfbGlzdGVuZXIiLCJuYW1lIiwiZnVuYyIsIm9iaiIsInB1c2giLCJvbiIsImVtaXQiLCJsaXN0ZW5lcnMiLCJpIiwibGVuZ3RoIiwidCIsImNhbGwiLCJydW5fZnVuY3Rpb24iLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiY3JlYXRlX3J1bl9mdW5jdGlvbiIsImFwcCIsInJ1biIsImxvb3AiLCJFdWxlcl9Db250cm9sbGVyIiwieCIsInoiLCJ4c3BlZWQiLCJ5c3BlZWQiLCJ6c3BlZWQiLCJSZWdpc3RlcmVkX0NsYXNzZXMiLCJSZWdpc3Rlcl9DbGFzcyIsImNvbnNvbGUiLCJsb2ciLCJHZXRfQ2xhc3MiLCJjcmVhdGVfY2xhc3MiLCJwYXJlbnQiLCJjaGlsZCIsInByb3BzIiwiT2JqZWN0IiwiY3JlYXRlIiwiXyIsImNvcHlfb2JqZWN0IiwiY29udHJ1Y3RvciIsIkFic3RyYWN0X0ZhYnJpYyIsImRhdGEiLCJjb25zdHJ1Y3RvciIsInR5cGUiLCJwYXJzZSIsInVuZGVmaW5lZCIsIlByaW50X0NsYXNzZXMiLCJrZXkiLCJQYXJ0aWNsZV9BZmZlY3RvciIsImlkIiwiZ2VuZXJhdGVVVUlEIiwiYWZmZWN0IiwicGRhdGEiLCJ2ZXJ0IiwiY29sb3IiLCJ0b0pTT04iLCJwYXJhbXMiLCJqc29uIiwiRm9yY2VfQWZmZWN0b3IiLCJmb3JjZXMiLCJBcnJheSIsImFkZF9mb3JjZSIsImZvcmNlIiwiYXBwbHlfZm9yY2VzIiwicGFydGljbGUiLCJhY2NlbGVyYXRpb24iLCJjYWxjIiwidmVsb2NpdHkiLCJ1dWlkIiwiZiIsIml0ZW0iLCJQYXJ0aWNsZV9FbWl0dGVyIiwiZW1pdF9wZXJfc2Vjb25kIiwiZW1pdF9kZWx0YSIsImVtaXRfY291bnQiLCJsaWZldGltZSIsImVtaXRfbGlmZSIsIm1pbiIsInJhbmRvbSIsIm1heCIsImNhbGNfZW1pdHRlZF9wYXJ0aWNsZXMiLCJuZWVkX2VtaXQiLCJmbG9vciIsInAiLCJjIiwibWF0cml4IiwicG9zaXRpb24iLCJzZXQiLCJhcHBseU1hdHJpeDQiLCJhcHBseU1hdHJpeDRfcm90YXRpb24iLCJQYXJ0aWNsZXNfUG9pbnRzIiwiZ2VvbWV0cnkiLCJQb2ludHMiLCJib3VuZGluZ1NwaGVyZSIsIlNwaGVyZSIsInJhZGl1cyIsIm1ldGEiLCJtYXQiLCJnZW9tIiwiT2JqZWN0M0QiLCJyYXljYXN0IiwicmF5Y2FzdGVyIiwiaW50ZXJzZWN0cyIsInNwaGVyZSIsImNvcHkiLCJtYXRyaXhXb3JsZCIsInIiLCJyYXkiLCJpbnRlcnNlY3RzU3BoZXJlIiwic2hpdCIsIlZlY3RvcjMiLCJ0ciIsIlJheSIsInRtcCIsInN1YiIsImRpc3RhbmNlIiwic3FydCIsImRvdCIsInBvaW50IiwibWFpbl9ldmVudF9odWIiLCJNb3VzZV9JbnRlcnNlY3RvciIsIm1vdXNlX2Nvb3Jkc190b192ZWN0b3IiLCJldmVudCIsIm9mZnNldCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiY2xpZW50WCIsImxlZnQiLCJjbGllbnRZIiwidG9wIiwidmVjdG9yIiwidW5wcm9qZWN0IiwibWF0cml4V29ybGRJbnZlcnNlIiwibW91c2VfY29vcmRzX3RvX3JheSIsIlJheWNhc3RlciIsIm5vcm1hbGl6ZSIsImZpbmRfaW50ZXJzZWN0aW9uX3dpdGhfbW91c2VfdmVjdG9yIiwiaW50ZXJzZWN0T2JqZWN0cyIsIlBhcnRpY2xlX1NoYWRlcnMiLCJ2ZXJ0ZXgiLCJqb2luIiwiZnJhZ21lbnQiLCJQYXJ0aWNsZV9TeXN0ZW0iLCJlbWl0dGVyIiwiYWZmZWN0b3IiLCJub19mYWRlX2NvbG9yIiwicGFydGljbGVfbGlmZXRpbWUiLCJwcmVfYWxwaGEiLCJkZXB0aF90ZXN0IiwiZGVwdGhfd3JpdGUiLCJibGVuZGluZyIsInNpemUiLCJjb3VudCIsImR5bmFtaWNfY29sb3IiLCJlbmRfY29sb3IiLCJyYW5kb21fY29sb3IiLCJjcmVhdGVfcGFydGljbGVfbWF0ZXJpYWwiLCJub2RlIiwiY3JlYXRlX3BhcnRpY2xlX2dlb21ldHJ5IiwiYm91bmRpbmdfc3BoZXJlIiwic2V0X25hbWUiLCJzdWljaWRlIiwicmVtb3ZlIiwiY3JlYXRlX3BhcnRpY2xlX2RhdGEiLCJwYXJ0aWNsZV9kYXRhIiwidmVydGljZXMiLCJGbG9hdDMyQXJyYXkiLCJjb2xvcnMiLCJnIiwiYiIsIkJ1ZmZlckF0dHJpYnV0ZSIsInNldER5bmFtaWMiLCJCdWZmZXJHZW9tZXRyeSIsImJ1ZmZlciIsImFkZEF0dHJpYnV0ZSIsImdlbmVyYXRlX21hdGVyaWFsX25hbWUiLCJteV9uYW1lIiwiYmxlbmRpbmdfbW9kZSIsIk9uZUZhY3RvciIsIlNyY0FscGhhRmFjdG9yIiwiT25lTWludXNTcmNBbHBoYUZhY3RvciIsImNvbnZlcnRfYmxlbmRpbmdfbW9kZSIsInRocmVlX2JsZW5kaW5nIiwiZmFjdG9ycyIsIk5vQmxlbmRpbmciLCJDdXN0b21CbGVuZGluZyIsInNldF90ZXh0dXJlIiwiVGV4dHVyZV9NYW5hZ2VyIiwiZ2V0IiwiZXJyb3IiLCJ1bmlmb3JtcyIsInNwcml0ZSIsInZhbHVlIiwicmVjcmVhdGVfbWF0ZXJpYWwiLCJjcmVhdGVfdW5pZm9ybXMiLCJWZWN0b3IyIiwiY2FsY19kZWZpbmVzIiwiZGVmaW5lcyIsInNlbGVjdF90ZXh0dXJlIiwicmVzb3VyY2VzIiwiYmxlbmRfb2JqIiwidHJhbnNwYXJlbnQiLCJkZXB0aFdyaXRlIiwiZGVwdGhUZXN0IiwiYmxlbmRTcmMiLCJibGVuZERzdCIsInNldF9wcmVfYWxwaGEiLCJzZXRfcG9pbnRfc2l6ZSIsInNldF9ibGVuZGluZyIsImVtaXRfcGFydGljbGVzIiwidmVydHMiLCJhcnJheSIsInVwZGF0ZU1hdHJpeFdvcmxkIiwidXBkYXRlX3BhcnRpY2xlX2dlb21ldHJ5IiwiZHVtbXlfY29sb3IiLCJzZXRfZW1pdHRlciIsInNldF9wYXJ0aWNsZV9saWZlX2xlbmd0aCIsInZhbCIsInNldF9lbWlzc2lvbl9wZXJfc2Vjb25kIiwic2V0X3BhcnRpY2xlX2NvdW50Iiwic2V0X2NvbG9yIiwic2V0X2JvdW5kaW5nX3NwaGVyZV9yYWRpdXMiLCJQYXJ0aWNsZV9NYW5hZ2VyIiwicGFydGljbGVzIiwicGFydGljbGVzX2FycmF5IiwiYWRkIiwicHMiLCJyZW1vdmVfcGFydGljbGVzIiwiaW5kZXhPZiIsInNwbGljZSIsImdldF9wYXJ0aWNsZV9uYW1lcyIsIm5hbWVzIiwiYXJyIiwiZW1pdHRlcl9mYWJyaWMiLCJhZmZlY3Rvcl9mYWJyaWMiLCJmcm9tSlNPTiIsIkpTT04iLCJlIiwiZ2V0T2JqZWN0QnlOYW1lIiwibG9hZF9wYXJ0aWNsZXMiLCJnZXRPYmplY3RCeVByb3BlcnR5IiwicmVwbGFjZV9vYmplY3Rfd2l0aF90aGlzIiwiY3JlYXRlX25hbWUiLCJudW1iZXIiLCJiZWdpbl9uYW1lIiwidGVzdGluZyIsImNyZWF0ZV9uZXciLCJwYXJ0aWNsZV9tYW5hZ2VyIiwiUGFydGljbGVzX0NvbmZpZyIsIlBvaW50X0dlbmVyYXRvcnMiLCJSYW5kb21fRGlyZWN0aW9uIiwiZ2V0X2RpcmVjdGlvbiIsImdldF9pbm5lcl9wb2ludCIsImFscGhhIiwiYmV0YSIsImNvcyIsInNpbiIsImdldF9ub3JtYWwiLCJnZXRfcG9pbnQiLCJtdWx0aXBseVNjYWxhciIsIkFwcGxpY2F0aW9uIiwiY29uZmlnIiwiX2xpZmVjeWNsZV9ldmVudCIsIl9pbml0X3RpbWVyIiwiX2NyZWF0ZV9sb29wX2Z1bmN0aW9uIiwibW91c2VfY29udHJvbGxlcnMiLCJyZW1vdmVfYW5pbWF0ZWRfb2JqZWN0Iiwic3RhcnQiLCJfc2V0X2NvbmZpZ3VyYXRpb24iLCJjbG9jayIsIkNsb2NrIiwiZGVsdGFfdGltZSIsImFuaW1hdGVkX29iamVjdHMiLCJzZWxmIiwiZ2V0X2RlZmF1bHRfY29uZmlndXJhdGlvbiIsIl9jcmVhdGVfcmVuZGVyIiwiZG9tX3NjcmVlbiIsImFsZXJ0IiwiZ2V0RWxlbWVudEJ5SWQiLCJkb21fZWxlbWVudCIsIldlYkdMUmVuZGVyZXIiLCJyZW5kZXJfcGFyYW1zIiwiYXBwZW5kQ2hpbGQiLCJkb21FbGVtZW50Iiwic2V0U2l6ZSIsInZpZXdwb3J0Iiwic2V0X3ZpZXdwb3J0Iiwic2V0Q2xlYXJDb2xvciIsImNsZWFyX2NvbG9yIiwiX2NyZWF0ZV9tYWluX3NjZW5lIiwicHJldmVudCIsIm1haW5fc2NlbmUiLCJTY2VuZSIsIm1haW5fY2FtZXJhIiwiZm92IiwiYXNwZWN0X3JhdGlvIiwibmVhciIsImZhciIsImFzcGVjdCIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJhcHBseV9jb25maWd1cmF0aW9uIiwiY29uZmlndXJhdGlvbiIsImxvYWRfY29uZmlndXJhdGlvbiIsInVybCIsInhociIsIlhIUkxvYWRlciIsImNvbmZpZ3VyYXRpb25faXNfYXBwbGllZCIsIm9ubG9hZCIsInByb2dyZXNzIiwic3RhdHVzIiwibG9hZCIsImRlZmF1bHRfY29uZmlnIiwiZXh0ZW5kIiwibWV0aG9kcyIsImNoaWxkX2Z1bmMiLCJDaGlsZCIsImFwcGx5IiwiYXJndW1lbnRzIiwiZXh0ZW5kX3Byb3RvIiwicHJvdG8iLCJkZWx0YSIsImdldERlbHRhIiwiYWRkX2FuaW1hdGVkX29iamVjdCIsInVwZGF0ZV9hbGwiLCJsZW4iLCJjcmVhdGVfbW91c2VfbW92ZV9saXN0ZW5lciIsIm1vdXNlX21vdmVfbGlzdGVuZXIiLCJmaW5kX21vdXNlX292ZXJfaW50ZXJzZWN0aW9ucyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRfbW91c2VfY29udHJvbGxlciIsIkJhc2VfQW5pbWF0aW9uIiwidGltZSIsInRpbWVfc2NhbGUiLCJzY2FsZWRfZHQiLCJjYWxjX2FuaW1hdGlvbiIsInBhcmFtIiwiRXVsZXJfQW5pbWF0aW9uIiwiQ2hhaW5fTG9hZGVyIiwibGlzdCIsImluZGV4Iiwic3RvcF9ieV9lcnJvciIsIm5leHQiLCJyZXNvdXJjZSIsIml0ZW1fbG9hZGVkIiwiZmluaXNoZWQiLCJkb19lcnJvciIsIm9uZXJyb3IiLCJkb19wcm9ncmVzcyIsIm9ucHJvZ3Jlc3MiLCJsb2FkX2Z1bmMiLCJ0ZXN0X2NoYWluX2xvYWRlciIsImNsIiwiTG9hZGluZ19NYW5hZ2VyIiwidGV4dHVyZV9sb2FkZXIiLCJUZXh0dXJlTG9hZGVyIiwiZ2V0X2FzeW5jIiwibG9hZF9saXN0IiwicmVzb3VyY2VfbGlzdCIsIm9uX2xvYWQiLCJvbl9wcm9ncmVzcyIsIm9uX3Jlc291cmNlX2xvYWRlZCIsImxvYWRfbGlzdF90ZXh0dXJlcyIsImxvYWRfbGlzdF9qc29uIiwibG9hZGVyIiwiZnJlZSIsIlBhY2thZ2VfTWFuYWdlciIsInN0YXRlIiwiZGVmYXVsdHMiLCJwYXJzZV9wYWNrYWdlX2Rlc2NyaXB0aW9uIiwicGFjayIsImxvYWRfcmVzb3VyY2VzIiwibG9hZGVkIiwidGV4dHVyZXMiLCJkYXRhX2xvYWRlZCIsIlNjZW5lX1NlcmlhbGl6ZXIiLCJhbmltYXRpb25fbGlicmFyeSIsImFuaW1zIiwiY29sbGVjdF9hbmltYXRpb25zIiwiY3JlYXRlX2FuaW1hdGlvbnMiLCJhbmltYXRpb25zIiwiaGFzT3duUHJvcGVydHkiLCJhbmltIiwiYmluZF9hbmltYXRpb25zIiwiYW5pbWRhdGEiLCJiaW5kaW5ncyIsImNvcHlfYW5pbWF0aW9ucyIsImJpbmQiLCJhbmltX3V1aWQiLCJhZGRfYW5pbWF0aW9uIiwibG9hZF9mcm9tX2pzb24iLCJvIiwiT2JqZWN0TG9hZGVyIiwibXlhbmltYXRpb25zIiwic2NlbmVfbG9hZGVkIiwiTWl4X0l0IiwibSIsImVsZW1lbnRzIiwiT2JqZWN0M0RfQW5pbWF0aW9uX01peGluIiwicmVtb3ZlX2FuaW1hdGlvbiIsImNoaWxkcmVuIiwib2xkX3RvSnNvbiIsIk9iamVjdDNEX1NlcmlhbGl6YXRpb25fTWl4aW4iLCJzdGFuZGFyZF9zZXJpYWxpemF0aW9uIiwic3RyaW5naWZ5IiwidXNlckRhdGEiLCJjYXN0U2hhZG93IiwicmVjZWl2ZVNoYWRvdyIsInZpc2libGUiLCJ0b0FycmF5IiwibWF0ZXJpYWxzIiwiZ2VvbWV0cmllcyIsImNvbGxlY3RfbWF0ZXJpYWxzIiwiY29sbGVjdF9nZW9tZXRyeSIsInRvSlNPTjEiLCJleHRyYWN0RnJvbUNhY2hlIiwiY2FjaGUiLCJ2YWx1ZXMiLCJtZXRhZGF0YSIsImlzUm9vdE9iamVjdCIsIm91dHB1dCIsImltYWdlcyIsInZlcnNpb24iLCJnZW5lcmF0b3IiLCJjb2xsZWN0X2FuaW1hdGlvbnNfcmVjdXJzaXZlIiwic291cmNlIiwidXAiLCJxdWF0ZXJuaW9uIiwic2NhbGUiLCJtYXRyaXhBdXRvVXBkYXRlIiwibWF0cml4V29ybGROZWVkc1VwZGF0ZSIsImZydXN0dW1DdWxsZWQiLCJyZW5kZXJPcmRlciIsIkN1c3RvbV9BZmZlY3RvciIsImN1c3RvbV9mdW5jIiwiZHVtbXkiLCJ0ZXN0X2Z1bmMiLCJzZXRfYWZmZWN0X2Z1bmN0aW9uIiwiRnVuY3Rpb24iLCJzb3VyY2VfY29kZSIsInNldF9hZmZlY3RfZnVuYyIsIkN1c3RvbV9FbWl0dGVyIiwic2V0X2VtaXRfZnVuY3Rpb24iLCJ0ZXN0IiwiUGFydGljbGVfRm9yY2VzIiwiRm9yY2UiLCJDb25zdGFudF9Gb3JjZSIsImNyZWF0ZV9jbG9uZV9vYmplY3QiLCJDb25lX0VtaXR0ZXIiLCJvcmlnaW4iLCJkaXNwZXJzaW9uIiwic3BlZWQiLCJDb2xvciIsImNsb25lX2ZpZWxkX2xpc3Rfb25lX2xldmVsX3JlY3Vyc2lvbiIsInNldF9kaXNwZXJzaW9uIiwic2V0X3NwZWVkIiwiZW1pdF9jb2xvciIsIlNwaGVyZV9FbWl0dGVyIiwiU3Rhcl9EdXN0X0VtaXR0ZXIiLCJzdGFydF9wb3NpdGlvbiIsImVuZF9wb3NpdGlvbiIsInNldF92ZWxvY2l0eSIsInNldF9wb3NpdGlvbl9yYW5nZSIsImVuZCIsImdldF9wb3NpdGlvbiIsImdldF92ZWxvY2l0eSIsImxvY2FsVG9Xb3JsZCIsIlN0YXJfRHVzdF9BZmZlY3RvciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoRUE7QUFBQTs7O0FBSUEsSUFBSUEsU0FBUyxFQUFiOztBQUVBQSxPQUFPQyxRQUFQLEdBQWtCLEVBQWxCOztBQUdBRCxPQUFPRSxnQkFBUCxHQUEwQixVQUFVQyxNQUFWLEVBQWtCQyxTQUFsQixFQUMxQjtBQUNDLE1BQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLE1BQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsQ0FKRDs7QUFNQUosT0FBT0UsZ0JBQVAsQ0FBd0JHLFNBQXhCLENBQWtDQyxNQUFsQyxHQUEyQyxVQUFVQyxFQUFWLEVBQzNDO0FBQ0MsTUFBS0gsU0FBTCxDQUFlLEtBQUtELE1BQXBCLEVBQTRCSSxFQUE1QjtBQUNBLENBSEQ7O0FBS0FQLE9BQU9RLGlCQUFQLEdBQTJCLFVBQVVDLEtBQVYsRUFBaUJDLE1BQWpCLEVBQXlCQyxJQUF6QixFQUErQkMsSUFBL0IsRUFBcUNDLFVBQXJDLEVBQzNCO0FBQ0M7QUFDQSxLQUFJQyxTQUFTQyxTQUFTQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQUYsUUFBT0wsS0FBUCxHQUFlQSxLQUFmO0FBQ0FLLFFBQU9KLE1BQVAsR0FBZ0JBLE1BQWhCO0FBQ0EsS0FBSU8sVUFBVUgsT0FBT0ksVUFBUCxDQUFrQixJQUFsQixDQUFkO0FBQ0EsS0FBSUwsVUFBSixFQUNBO0FBQ0NJLFVBQVFFLFNBQVIsR0FBb0JOLFVBQXBCO0FBQ0FJLFVBQVFHLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUJOLE9BQU9MLEtBQTlCLEVBQXFDSyxPQUFPSixNQUE1QztBQUNBO0FBQ0RPLFNBQVFJLElBQVIsR0FBZSxpQkFBZjtBQUNBSixTQUFRRSxTQUFSLEdBQW9CLG9CQUFwQjtBQUNHRixTQUFRSyxRQUFSLENBQWlCLGVBQWpCLEVBQWtDLENBQWxDLEVBQXFDLEVBQXJDOztBQUVIO0FBQ0EsS0FBSUMsVUFBVSxJQUFJQyxNQUFNQyxPQUFWLENBQWtCWCxNQUFsQixDQUFkO0FBQ0EsS0FBSUYsSUFBSixFQUFVO0FBQ1RXLFVBQVFHLEtBQVIsR0FBZ0JILFFBQVFJLEtBQVIsR0FBZ0JILE1BQU1JLGVBQU4sQ0FBc0JDLG1CQUF0RDtBQUNBTixVQUFRTyxTQUFSLEdBQW9CTixNQUFNTyxZQUExQjtBQUNBO0FBQ0RSLFNBQVFTLFdBQVIsR0FBc0IsSUFBdEI7QUFDQSxRQUFPVCxPQUFQO0FBQ0EsQ0F4QkQ7O0FBMkJBdkIsT0FBT2lDLFdBQVAsR0FBcUIsVUFBVXhCLEtBQVYsRUFBaUJDLE1BQWpCLEVBQXlCd0IsYUFBekIsRUFBd0NDLGVBQXhDLEVBQ3JCO0FBQ0M7QUFDQSxLQUFJQyxRQUFRLElBQUlaLE1BQU1hLG1CQUFWLENBQStCNUIsS0FBL0IsRUFBc0NDLE1BQXRDLENBQVo7O0FBRUEsS0FBSTRCLFdBQVcsSUFBSWQsTUFBTWUsY0FBVixDQUEwQjtBQUN4Q0MsZ0JBQWNOLGFBRDBCO0FBRXhDTyxrQkFBZ0JOO0FBRndCLEVBQTFCLENBQWY7O0FBS0EsS0FBSU8sT0FBTyxJQUFJbEIsTUFBTW1CLElBQVYsQ0FBZ0JQLEtBQWhCLEVBQXVCRSxRQUF2QixDQUFYO0FBQ0FJLE1BQUtFLFFBQUwsQ0FBY0MsQ0FBZCxHQUFrQkMsS0FBS0MsRUFBdkI7QUFDQSxRQUFPTCxJQUFQO0FBQ0EsQ0FiRDs7QUFnQkExQyxPQUFPZ0QsYUFBUCxHQUF1QixVQUFVdkMsS0FBVixFQUFpQkMsTUFBakIsRUFDdkI7QUFDQyxNQUFLdUMsTUFBTCxHQUFjLElBQUl6QixNQUFNMEIsaUJBQVYsQ0FDZHpDLEtBRGMsRUFFZEMsTUFGYyxFQUdkO0FBQ0NvQixhQUFXTixNQUFNTyxZQURsQjtBQUVDb0IsYUFBVzNCLE1BQU00QixhQUZsQjtBQUdDQyxVQUFRN0IsTUFBTThCO0FBSGYsRUFIYyxDQUFkOztBQVNBLE1BQUtDLE1BQUwsR0FBYyxJQUFJL0IsTUFBTWdDLGlCQUFWLENBQTRCLEVBQTVCLEVBQWdDL0MsUUFBTUMsTUFBdEMsRUFBOEMsR0FBOUMsRUFBbUQsSUFBbkQsQ0FBZDtBQUNBLENBWkQ7O0FBY0FWLE9BQU9nRCxhQUFQLENBQXFCM0MsU0FBckIsQ0FBK0JvRCxNQUEvQixHQUF3QyxVQUFVQyxLQUFWLEVBQWlCQyxRQUFqQixFQUN4QztBQUNDQSxVQUFTRixNQUFULENBQWlCQyxLQUFqQixFQUNDLEtBQUtILE1BRE4sRUFFQyxLQUFLTixNQUZOLEVBR0MsSUFIRCxDQUdPO0FBSFA7QUFLQSxDQVBEOztBQVVBakQsT0FBTzRELHFCQUFQLEdBQStCLFVBQVVuRCxLQUFWLEVBQWlCQyxNQUFqQixFQUMvQjtBQUNDLEtBQUk2QyxTQUFVLElBQUkvQixNQUFNcUMsa0JBQVYsQ0FDYnBELFFBQVEsQ0FBRSxDQURHLEVBRWJBLFFBQVEsQ0FGSyxFQUdiQyxTQUFTLENBSEksRUFJYkEsU0FBUSxDQUFFLENBSkcsRUFJQSxDQUFDLEtBSkQsRUFJUSxLQUpSLENBQWQ7QUFLQSxRQUFPNkMsTUFBUDtBQUNBLENBUkQ7O0FBVUF2RCxPQUFPOEQsT0FBUCxHQUFpQixVQUFVckQsS0FBVixFQUFpQkMsTUFBakIsRUFDakI7QUFDQyxNQUFLNkMsTUFBTCxHQUFjdkQsT0FBTzRELHFCQUFQLENBQTZCbkQsS0FBN0IsRUFBb0NDLE1BQXBDLENBQWQ7QUFDQSxDQUhEOztBQUtBVixPQUFPOEQsT0FBUCxDQUFlekQsU0FBZixDQUF5Qm9ELE1BQXpCLEdBQWtDLFVBQVVFLFFBQVYsRUFDbEM7QUFDQyxLQUFJLENBQUMsS0FBS0QsS0FBVixFQUFpQjtBQUNoQjtBQUNBOztBQUVEQyxVQUFTSSxTQUFULEdBQXFCLEtBQXJCO0FBQ0FKLFVBQVNGLE1BQVQsQ0FBZ0IsS0FBS0MsS0FBckIsRUFBNEIsS0FBS0gsTUFBakM7QUFDQUksVUFBU0ksU0FBVCxHQUFxQixJQUFyQjtBQUNBLENBVEQ7O0FBWUEvRCxPQUFPZ0UsZ0JBQVAsR0FBMEIsVUFBVUMsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0JDLEtBQXRCLEVBQTZCQyxRQUE3QixFQUMxQjtBQUNDLE1BQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLE1BQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLE1BQUtDLEtBQUwsR0FBYSxDQUFDLENBQUNBLEtBQWY7QUFDQSxNQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLENBTkQ7O0FBVUE7Ozs7QUFJQXBFLE9BQU9xRSxTQUFQLEdBQW1CLElBQUlDLFNBQUosRUFBbkI7O0FBRUEsU0FBU0EsU0FBVCxHQUFxQjtBQUNqQixNQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNIOztBQUlERCxVQUFVakUsU0FBVixDQUFvQm1FLGtCQUFwQixHQUF5QyxVQUFVQyxJQUFWLEVBQWdCQyxJQUFoQixFQUFzQkMsR0FBdEIsRUFDekM7QUFDSSxLQUFJLENBQUMsS0FBS0osTUFBTCxDQUFZRSxJQUFaLENBQUwsRUFBd0I7QUFDcEIsT0FBS0YsTUFBTCxDQUFZRSxJQUFaLElBQW9CLEVBQXBCO0FBQ0g7QUFDRCxNQUFLRixNQUFMLENBQVlFLElBQVosRUFBa0JHLElBQWxCLENBQXdCLEVBQUNILE1BQU1BLElBQVAsRUFBYUMsTUFBTUEsSUFBbkIsRUFBeUJDLEtBQUtBLEdBQTlCLEVBQXhCO0FBQ0gsQ0FORDs7QUFRQUwsVUFBVWpFLFNBQVYsQ0FBb0J3RSxFQUFwQixHQUEwQlAsVUFBVWpFLFNBQVYsQ0FBb0JtRSxrQkFBOUM7O0FBRUFGLFVBQVVqRSxTQUFWLENBQW9CeUUsSUFBcEIsR0FBMkIsVUFBU0wsSUFBVCxFQUFlRSxHQUFmLEVBQzNCO0FBQ0ksS0FBSUksWUFBWSxLQUFLUixNQUFMLENBQVlFLElBQVosQ0FBaEI7QUFDQSxLQUFJTSxTQUFKLEVBQWU7QUFDWCxPQUFJLElBQUlDLElBQUksQ0FBWixFQUFlQSxJQUFJRCxVQUFVRSxNQUE3QixFQUFxQ0QsR0FBckMsRUFBMEM7QUFDdEMsT0FBSUUsSUFBSUgsVUFBVUMsQ0FBVixDQUFSO0FBQ0FFLEtBQUVSLElBQUYsQ0FBT1MsSUFBUCxDQUFZRCxFQUFFUCxHQUFkLEVBQW1CQSxHQUFuQjtBQUNIO0FBQ0o7QUFDSixDQVREOztBQVlBLElBQUlTLGVBQWU7QUFDbEIsVUFBU2hCLFFBQVQsRUFBa0I7QUFDakJpQixRQUFPQyxVQUFQLENBQWtCbEIsUUFBbEIsRUFBNEIsT0FBTyxFQUFuQztBQUNBLENBSEY7O0FBTUFwRSxPQUFPdUYsbUJBQVAsR0FBNkIsVUFBVUMsR0FBVixFQUM3QjtBQUNJeEYsUUFBT3lGLEdBQVAsR0FBYSxZQUFZO0FBQUVMLGVBQWMsWUFBWTtBQUFFSSxPQUFJRSxJQUFKO0FBQWEsR0FBekM7QUFBNkMsRUFBeEU7QUFDSCxDQUhEOztBQVFBMUYsT0FBTzJGLGdCQUFQLEdBQTBCLFVBQVVoQixHQUFWLEVBQWVpQixDQUFmLEVBQWtCL0MsQ0FBbEIsRUFBcUJnRCxDQUFyQixFQUMxQjtBQUNDLE1BQUtsQixHQUFMLEdBQVdBLEdBQVg7QUFDQSxNQUFLbUIsTUFBTCxHQUFjRixJQUFJOUMsS0FBS0MsRUFBVCxHQUFjLEdBQTVCLENBQWdDO0FBQ2hDLE1BQUtnRCxNQUFMLEdBQWNsRCxJQUFJQyxLQUFLQyxFQUFULEdBQWMsR0FBNUIsQ0FBZ0M7QUFDaEMsTUFBS2lELE1BQUwsR0FBY0gsSUFBSS9DLEtBQUtDLEVBQVQsR0FBYyxHQUE1QixDQUFnQztBQUNoQyxDQU5EOztBQVFBL0MsT0FBTzJGLGdCQUFQLENBQXdCdEYsU0FBeEIsQ0FBa0NDLE1BQWxDLEdBQTJDLFVBQVVDLEVBQVYsRUFDM0M7QUFDQyxNQUFLb0UsR0FBTCxDQUFTL0IsUUFBVCxDQUFrQmdELENBQWxCLElBQXVCLEtBQUtFLE1BQUwsR0FBY3ZGLEVBQXJDO0FBQ0EsTUFBS29FLEdBQUwsQ0FBUy9CLFFBQVQsQ0FBa0JDLENBQWxCLElBQXVCLEtBQUtrRCxNQUFMLEdBQWN4RixFQUFyQztBQUNBLE1BQUtvRSxHQUFMLENBQVMvQixRQUFULENBQWtCaUQsQ0FBbEIsSUFBdUIsS0FBS0csTUFBTCxHQUFjekYsRUFBckM7QUFDQSxDQUxEOztBQU9BO0FBQ0FQLE9BQU9pRyxrQkFBUCxHQUE0QixFQUE1Qjs7QUFFQWpHLE9BQU9rRyxjQUFQLEdBQXdCLFVBQVV6QixJQUFWLEVBQWdCQyxJQUFoQixFQUN4QjtBQUNDLEtBQUkxRSxPQUFPaUcsa0JBQVAsQ0FBMEJ4QixJQUExQixDQUFKLEVBQW9DO0FBQ25DMEIsVUFBUUMsR0FBUixDQUFZLDREQUFaLEVBQTBFM0IsSUFBMUU7QUFDQTtBQUNEekUsUUFBT2lHLGtCQUFQLENBQTBCeEIsSUFBMUIsSUFBa0NDLElBQWxDO0FBQ0EsQ0FORDs7QUFRQTFFLE9BQU9xRyxTQUFQLEdBQW1CLFVBQVU1QixJQUFWLEVBQ25CO0FBQ0MsUUFBT3pFLE9BQU9pRyxrQkFBUCxDQUEwQnhCLElBQTFCLENBQVA7QUFDQSxDQUhEOztBQU1BekUsT0FBT3NHLFlBQVAsR0FBc0IsVUFBU0MsTUFBVCxFQUFpQkMsS0FBakIsRUFBd0JDLEtBQXhCLEVBQStCaEMsSUFBL0IsRUFDdEI7QUFDSSxLQUFJOEIsTUFBSixFQUFZO0FBQ1JDLFFBQU1uRyxTQUFOLEdBQWtCcUcsT0FBT0MsTUFBUCxDQUFjSixPQUFPbEcsU0FBckIsQ0FBbEI7QUFDSDtBQUNEdUcsR0FBRUMsV0FBRixDQUFjTCxNQUFNbkcsU0FBcEIsRUFBK0JvRyxLQUEvQjtBQUNBRCxPQUFNbkcsU0FBTixDQUFnQnlHLFVBQWhCLEdBQTZCTixLQUE3QjtBQUNBeEcsUUFBT2tHLGNBQVAsQ0FBc0JNLEtBQXRCLEVBQTZCL0IsSUFBN0I7QUFDSCxDQVJEOztBQVVBekUsT0FBTytHLGVBQVAsR0FBeUIsVUFBVUMsSUFBVixFQUN6QjtBQUNJLEtBQUlDLGNBQWNqSCxPQUFPcUcsU0FBUCxDQUFpQlcsS0FBS0UsSUFBdEIsQ0FBbEI7QUFDQSxLQUFJRCxXQUFKLEVBQWlCO0FBQ2IsTUFBSTlHLFNBQVMsSUFBSThHLFdBQUosRUFBYjtBQUNBOUcsU0FBT2dILEtBQVAsQ0FBYUgsSUFBYjtBQUNBLFNBQU83RyxNQUFQO0FBQ0g7QUFDRCxRQUFPaUgsU0FBUDtBQUNILENBVEQ7O0FBV0FwSCxPQUFPcUgsYUFBUCxHQUF1QixZQUN2QjtBQUNJLE1BQUksSUFBSUMsR0FBUixJQUFlLEtBQUtyQixrQkFBcEIsRUFBd0M7QUFDcENFLFVBQVFDLEdBQVIsQ0FBWSxvQkFBWixFQUFrQ2tCLEdBQWxDLEVBQXVDLEtBQUtyQixrQkFBTCxDQUF3QnFCLEdBQXhCLENBQXZDO0FBQ0g7QUFDSixDQUxEOzs7Ozs7Ozs7Ozs7QUNqT0E7O0FBRUE7QUFDQSxTQUFTQyxpQkFBVCxHQUNBO0FBQ0ksTUFBS0MsRUFBTCxHQUFVWixFQUFFYSxZQUFGLEVBQVY7QUFDSDs7QUFHREYsa0JBQWtCbEgsU0FBbEIsQ0FBNEJxSCxNQUE1QixHQUFxQyxVQUFVbkgsRUFBVixFQUFjb0gsS0FBZCxFQUFxQkMsSUFBckIsRUFBMkJDLEtBQTNCLEVBQ3JDO0FBQ0MsUUFBTyxJQUFQO0FBQ0EsQ0FIRDs7QUFLQU4sa0JBQWtCbEgsU0FBbEIsQ0FBNEJ5SCxNQUE1QixHQUFxQyxVQUFVdEIsS0FBVixFQUNyQztBQUNDLEtBQUlBLEtBQUosRUFBVztBQUNWLFNBQU8sRUFBUDtBQUNBO0FBQ0QsS0FBSVEsT0FBTztBQUNKUSxNQUFJLEtBQUtBLEVBREw7QUFFVixVQUFRLG1CQUZFO0FBR1ZPLFVBQVM7QUFIQyxFQUFYO0FBS0csS0FBSXZCLEtBQUosRUFBVztBQUNQLFNBQU91QixNQUFQO0FBQ0g7QUFDSixRQUFPZixJQUFQO0FBQ0EsQ0FkRDs7QUFnQkFPLGtCQUFrQmxILFNBQWxCLENBQTRCOEcsS0FBNUIsR0FBb0MsVUFBVWEsSUFBVixFQUNwQyxDQUNDLENBRkQ7O0FBSUEsK0RBQUFoSSxDQUFPa0csY0FBUCxDQUFzQixtQkFBdEIsRUFBMkNxQixpQkFBM0M7O0FBRUEsU0FBU1UsY0FBVCxHQUNBO0FBQ0lWLG1CQUFrQnBDLElBQWxCLENBQXVCLElBQXZCO0FBQ0gsTUFBSytDLE1BQUwsR0FBYyxJQUFJQyxLQUFKLEVBQWQ7QUFDQTs7QUFFREYsZUFBZTVILFNBQWYsR0FBMkJxRyxPQUFPQyxNQUFQLENBQWNZLGtCQUFrQmxILFNBQWhDLENBQTNCOztBQUVBdUcsRUFBRUMsV0FBRixDQUFjb0IsZUFBZTVILFNBQTdCLEVBQXdDO0FBQ3ZDNEcsY0FBYWdCLGNBRDBCO0FBRXZDRyxZQUFXLFVBQVVDLEtBQVYsRUFDWDtBQUNDLE9BQUtILE1BQUwsQ0FBWXRELElBQVosQ0FBaUJ5RCxLQUFqQjtBQUNBLEVBTHNDO0FBTXZDQyxlQUFjLFVBQVUvSCxFQUFWLEVBQWNnSSxRQUFkLEVBQXdCWCxJQUF4QixFQUE4QkMsS0FBOUIsRUFDZDtBQUNDLE1BQUlXLGVBQWUsRUFBQzVDLEdBQUUsQ0FBSCxFQUFNL0MsR0FBRSxDQUFSLEVBQVdnRCxHQUFFLENBQWIsRUFBbkI7QUFDQSxPQUFJLElBQUliLElBQUksQ0FBWixFQUFlQSxJQUFJLEtBQUtrRCxNQUFMLENBQVlqRCxNQUEvQixFQUF1Q0QsR0FBdkMsRUFBNEM7QUFDM0MsUUFBS2tELE1BQUwsQ0FBWWxELENBQVosRUFBZXlELElBQWYsQ0FBb0JsSSxFQUFwQixFQUF3QmdJLFFBQXhCLEVBQWtDQyxZQUFsQztBQUNBO0FBQ0Q7QUFDQUQsV0FBU0csUUFBVCxDQUFrQjlDLENBQWxCLElBQXVCNEMsYUFBYTVDLENBQWIsR0FBaUJyRixFQUF4QztBQUNBZ0ksV0FBU0csUUFBVCxDQUFrQjdGLENBQWxCLElBQXVCMkYsYUFBYTNGLENBQWIsR0FBaUJ0QyxFQUF4QztBQUNBZ0ksV0FBU0csUUFBVCxDQUFrQjdDLENBQWxCLElBQXVCMkMsYUFBYTNDLENBQWIsR0FBaUJ0RixFQUF4QztBQUNBLEVBaEJzQztBQWlCdkNtSCxTQUFRLFVBQVVuSCxFQUFWLEVBQWNnSSxRQUFkLEVBQXdCWCxJQUF4QixFQUE4QkMsS0FBOUIsRUFDUjtBQUNDLE9BQUtTLFlBQUwsQ0FBa0IvSCxFQUFsQixFQUFzQmdJLFFBQXRCLEVBQWdDWCxJQUFoQyxFQUFzQ0MsS0FBdEM7QUFDQSxTQUFPLElBQVA7QUFDQSxFQXJCc0M7QUFzQnZDQyxTQUFRLFVBQVV0QixLQUFWLEVBQ1I7QUFDQyxNQUFJUSxPQUFPLEVBQVg7QUFDQUEsT0FBS3ZDLElBQUwsR0FBWSxnQkFBWjtBQUNNdUMsT0FBSzJCLElBQUwsR0FBWSxLQUFLQSxJQUFqQjtBQUNOM0IsT0FBS2UsTUFBTCxHQUFjUixrQkFBa0JsSCxTQUFsQixDQUE0QnlILE1BQTVCLENBQW1DM0MsSUFBbkMsQ0FBd0MsSUFBeEMsRUFBOEMsSUFBOUMsQ0FBZDtBQUNBLE1BQUksS0FBSytDLE1BQUwsQ0FBWWpELE1BQVosR0FBcUIsQ0FBekIsRUFBNEI7QUFDM0IrQixRQUFLZSxNQUFMLENBQVlHLE1BQVosR0FBcUIsSUFBSUMsS0FBSixFQUFyQjtBQUNBLFFBQUksSUFBSW5ELElBQUksQ0FBWixFQUFlQSxJQUFJLEtBQUtrRCxNQUFMLENBQVlqRCxNQUEvQixFQUF1Q0QsR0FBdkMsRUFBNEM7QUFDM0NnQyxTQUFLZSxNQUFMLENBQVlHLE1BQVosQ0FBbUJ0RCxJQUFuQixDQUF5QixLQUFLc0QsTUFBTCxDQUFZbEQsQ0FBWixFQUFlOEMsTUFBZixFQUF6QjtBQUNBO0FBQ0Q7QUFDRCxTQUFPZCxJQUFQO0FBQ0EsRUFuQ3NDO0FBb0N2Q0csUUFBTyxVQUFVYSxJQUFWLEVBQ1A7QUFDQyxNQUFJWSxDQUFKLEVBQU9DLElBQVA7QUFDQSxNQUFJYixLQUFLRSxNQUFULEVBQWlCOztBQUVoQixRQUFJLElBQUlsRCxJQUFHLENBQVgsRUFBY0EsSUFBSWdELEtBQUtFLE1BQUwsQ0FBWWpELE1BQTlCLEVBQXNDRCxHQUF0QyxFQUEyQztBQUMxQzZELFdBQU9iLEtBQUtFLE1BQUwsQ0FBWWxELENBQVosQ0FBUDtBQUNBNEQsUUFBSSwrREFBQTVJLENBQU9xRyxTQUFQLENBQWlCd0MsS0FBS3BFLElBQXRCLENBQUo7QUFDQSxRQUFJbUUsQ0FBSixFQUFPO0FBQ05BLFNBQUksSUFBSUEsQ0FBSixFQUFKO0FBQ0FBLE9BQUV6QixLQUFGLENBQVEwQixJQUFSO0FBQ0EsVUFBS1QsU0FBTCxDQUFlUSxDQUFmO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7QUFuRHNDLENBQXhDOztBQXNEQSwrREFBQTVJLENBQU9rRyxjQUFQLENBQXNCLGdCQUF0QixFQUF3QytCLGNBQXhDOzs7Ozs7Ozs7OztBQ2xHQTs7QUFFQTtBQUNBLFNBQVNhLGdCQUFULENBQTBCQyxlQUExQixFQUNBO0FBQ0ksTUFBS0osSUFBTCxHQUFZL0IsRUFBRWEsWUFBRixFQUFaO0FBQ0EsTUFBS2hELElBQUwsR0FBWSxFQUFaO0FBQ0gsTUFBS3VFLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxNQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsTUFBS0YsZUFBTCxHQUF1QkEsbUJBQW1CLENBQTFDO0FBQ0E7QUFDQSxNQUFLRyxRQUFMLEdBQWdCLEVBQUMsT0FBTyxDQUFSLEVBQVcsT0FBTSxHQUFqQixFQUFoQjtBQUNBOztBQUVESixpQkFBaUJ6SSxTQUFqQixDQUEyQjhJLFNBQTNCLEdBQXVDLFlBQ3ZDO0FBQ0MsUUFBTyxLQUFLRCxRQUFMLENBQWNFLEdBQWQsR0FBb0J0RyxLQUFLdUcsTUFBTCxNQUFpQixLQUFLSCxRQUFMLENBQWNJLEdBQWQsR0FBb0IsS0FBS0osUUFBTCxDQUFjRSxHQUFuRCxDQUEzQjtBQUNBLENBSEQ7O0FBS0FOLGlCQUFpQnpJLFNBQWpCLENBQTJCa0osc0JBQTNCLEdBQW9ELFVBQVVoSixFQUFWLEVBQ3BEO0FBQ0M7QUFDQSxNQUFLeUksVUFBTCxJQUFtQixLQUFLRCxlQUFMLEdBQXFCeEksRUFBeEM7QUFDQSxLQUFJaUosWUFBWTFHLEtBQUsyRyxLQUFMLENBQVcsS0FBS1QsVUFBaEIsQ0FBaEI7QUFDQSxLQUFJUSxZQUFZLENBQWhCLEVBQW1CO0FBQ2xCLE9BQUtSLFVBQUwsSUFBbUJRLFNBQW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0QsUUFBT0EsU0FBUDtBQUNBLENBWEQ7O0FBY0FWLGlCQUFpQnpJLFNBQWpCLENBQTJCeUUsSUFBM0IsR0FBa0MsVUFBVTRFLENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsTUFBaEIsRUFDbEM7QUFDSUYsR0FBRUcsUUFBRixDQUFXQyxHQUFYLENBQWUsQ0FBZixFQUFrQixDQUFsQixFQUFxQixDQUFyQjtBQUNBSixHQUFFaEIsUUFBRixDQUFXb0IsR0FBWCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsRUFBcUIsQ0FBckI7O0FBRUEsS0FBSUYsTUFBSixFQUFZO0FBQ1JGLElBQUVHLFFBQUYsQ0FBV0UsWUFBWCxDQUF3QkgsTUFBeEI7QUFDQUYsSUFBRWhCLFFBQUYsQ0FBV3NCLHFCQUFYLENBQWlDSixNQUFqQztBQUNIO0FBQ0osQ0FURDs7QUFZQWQsaUJBQWlCekksU0FBakIsQ0FBMkJ5SCxNQUEzQixHQUFvQyxVQUFVdEIsS0FBVixFQUNwQztBQUNDLEtBQUl1QixTQUFTO0FBQ04sVUFBUSxLQUFLWSxJQURQO0FBRVoscUJBQW1CLEtBQUtJLGVBRlo7QUFHWixjQUFZO0FBQ1gsVUFBTyxLQUFLRyxRQUFMLENBQWNFLEdBRFY7QUFFWCxVQUFPLEtBQUtGLFFBQUwsQ0FBY0k7QUFGVjtBQUhBLEVBQWI7QUFRRyxLQUFJLEtBQUs3RSxJQUFULEVBQWU7QUFDWHNELFNBQU90RCxJQUFQLEdBQWMsS0FBS0EsSUFBbkI7QUFDSDtBQUNKLEtBQUkrQixLQUFKLEVBQVc7QUFDVixTQUFPdUIsTUFBUDtBQUNBO0FBQ0QsS0FBSWYsT0FBTyxFQUFYO0FBQ0FBLE1BQUt2QyxJQUFMLEdBQVksa0JBQVo7QUFDQXVDLE1BQUtlLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFFBQU9mLElBQVA7QUFDQSxDQXBCRDs7QUFzQkE4QixpQkFBaUJ6SSxTQUFqQixDQUEyQjhHLEtBQTNCLEdBQW1DLFVBQVVILElBQVYsRUFDbkM7QUFDQyxNQUFLK0IsZUFBTCxHQUF1Qi9CLEtBQUsrQixlQUE1QjtBQUNHLE1BQUt0RSxJQUFMLEdBQVl1QyxLQUFLdkMsSUFBakI7QUFDQSxNQUFLa0UsSUFBTCxHQUFZM0IsS0FBSzJCLElBQUwsSUFBYS9CLEVBQUVhLFlBQUYsRUFBekI7QUFDSGIsR0FBRUMsV0FBRixDQUFjLEtBQUtxQyxRQUFuQixFQUE2QmxDLEtBQUtrQyxRQUFsQztBQUNBLENBTkQ7O0FBUUEsK0RBQUFsSixDQUFPa0csY0FBUCxDQUFzQixrQkFBdEIsRUFBMEM0QyxnQkFBMUM7Ozs7Ozs7Ozs7O0FDMUVBLFNBQVNtQixnQkFBVCxDQUEyQkMsUUFBM0IsRUFBcUM1SCxRQUFyQyxFQUNBO0FBQ0lkLFVBQU0ySSxNQUFOLENBQWFoRixJQUFiLENBQWtCLElBQWxCLEVBQXdCK0UsUUFBeEIsRUFBa0M1SCxRQUFsQztBQUNBLFNBQUs0RSxJQUFMLEdBQVksa0JBQVo7O0FBRUEsU0FBS2tELGNBQUwsR0FBc0IsSUFBSTVJLE1BQU02SSxNQUFWLEVBQXRCO0FBQ0EsU0FBS0QsY0FBTCxDQUFvQkUsTUFBcEIsR0FBNkIsSUFBN0I7QUFDSDs7QUFFREwsaUJBQWlCNUosU0FBakIsR0FBNkJxRyxPQUFPQyxNQUFQLENBQWVuRixNQUFNMkksTUFBTixDQUFhOUosU0FBNUIsQ0FBN0I7O0FBRUE0SixpQkFBaUI1SixTQUFqQixDQUEyQjRHLFdBQTNCLEdBQXlDZ0QsZ0JBQXpDOztBQUVBQSxpQkFBaUI1SixTQUFqQixDQUEyQnlILE1BQTNCLEdBQW9DLFVBQVV5QyxJQUFWLEVBQ3BDO0FBQ0ksUUFBSUMsTUFBTSxLQUFLbEksUUFBZjtBQUNBLFFBQUltSSxPQUFPLEtBQUtQLFFBQWhCO0FBQ0EsU0FBSzVILFFBQUwsR0FBZ0I4RSxTQUFoQjtBQUNBLFNBQUs4QyxRQUFMLEdBQWdCOUMsU0FBaEI7QUFDQSxRQUFJakgsU0FBVXFCLE1BQU1rSixRQUFOLENBQWVySyxTQUFmLENBQXlCeUgsTUFBekIsQ0FBZ0MzQyxJQUFoQyxDQUFxQyxJQUFyQyxFQUEyQ29GLElBQTNDLENBQWQ7QUFDQSxTQUFLakksUUFBTCxHQUFnQmtJLEdBQWhCO0FBQ0EsU0FBS04sUUFBTCxHQUFnQk8sSUFBaEI7QUFDQSxXQUFPdEssTUFBUDtBQUNILENBVkQ7O0FBWUE4SixpQkFBaUI1SixTQUFqQixDQUEyQnNLLE9BQTNCLEdBQXFDLFVBQVVDLFNBQVYsRUFBcUJDLFVBQXJCLEVBQ3JDO0FBQ0ksUUFBSUMsU0FBUyxJQUFJdEosTUFBTTZJLE1BQVYsRUFBYjtBQUNBUyxXQUFPQyxJQUFQLENBQWEsS0FBS1gsY0FBbEI7QUFDQVUsV0FBT2YsWUFBUCxDQUFxQixLQUFLaUIsV0FBMUI7QUFDQSxRQUFJQyxJQUFJTCxVQUFVTSxHQUFWLENBQWNDLGdCQUFkLENBQWdDTCxNQUFoQyxDQUFSO0FBQ0EsUUFBS0csTUFBTSxLQUFYLEVBQW1CO0FBQ25COUUsWUFBUUMsR0FBUixDQUFZLGVBQVosRUFBNkIsS0FBSzNCLElBQWxDLEVBQXdDcUcsTUFBeEM7QUFDQTs7QUFFQSxRQUFJTSxPQUFRLElBQUk1SixNQUFNNkosT0FBVixFQUFaO0FBQ0FELFNBQUtMLElBQUwsQ0FBVSxLQUFLbEIsUUFBZjtBQUNBLFFBQUl5QixLQUFLLElBQUk5SixNQUFNK0osR0FBVixDQUFlLElBQUkvSixNQUFNNkosT0FBVixDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixFQUF4QixDQUFmLEVBQTRDRCxJQUE1QyxDQUFUO0FBQ0FqRixZQUFRQyxHQUFSLENBQVksT0FBWixFQUFxQmtGLEdBQUdILGdCQUFILENBQW9CTCxNQUFwQixDQUFyQixFQUFrREEsTUFBbEQ7QUFDQTNFLFlBQVFDLEdBQVIsQ0FBWSxnQkFBaUIsS0FBSzNCLElBQWxDLEVBQXdDcUcsTUFBeEMsRUFBZ0RGLFVBQVVNLEdBQTFEO0FBQ0EsV0FBT04sVUFBVU0sR0FBVixDQUFjQyxnQkFBZCxDQUFnQ0wsTUFBaEMsQ0FBUDs7QUFHQTNFLFlBQVFDLEdBQVIsQ0FBWSxnQkFBZ0IsS0FBS2MsSUFBakMsRUFBdUMsWUFBdkMsRUFBcUQ0RCxNQUFyRCxFQUE2RCxTQUE3RCxFQUF3RUcsQ0FBeEU7QUFDQSxRQUFJQSxDQUFKLEVBQU87QUFDQyxZQUFJTyxNQUFNLElBQUloSyxNQUFNNkosT0FBVixDQUFrQixLQUFLeEIsUUFBdkIsQ0FBVjtBQUNBMkIsWUFBSUMsR0FBSixDQUFRUixDQUFSO0FBQ05KLG1CQUFXakcsSUFBWCxDQUFpQjtBQUNuQjhHLHNCQUFVNUksS0FBSzZJLElBQUwsQ0FBV0gsSUFBSUksR0FBSixDQUFRSixHQUFSLENBQVgsQ0FEUztBQUVuQkssbUJBQU8sS0FBS2hDLFFBRk87QUFHbkIxSixvQkFBUTtBQUhXLFNBQWpCO0FBS0Q7QUFDSixDQTVCRDs7Ozs7Ozs7OztBQzFCQTtBQUFBLFNBQVNtRSxTQUFULEdBQXFCO0FBQ2pCLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0g7O0FBSURELFVBQVVqRSxTQUFWLENBQW9CbUUsa0JBQXBCLEdBQXlDLFVBQVVDLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCQyxHQUF0QixFQUN6QztBQUNJLFFBQUksQ0FBQyxLQUFLSixNQUFMLENBQVlFLElBQVosQ0FBTCxFQUF3QjtBQUNwQixhQUFLRixNQUFMLENBQVlFLElBQVosSUFBb0IsRUFBcEI7QUFDSDtBQUNELFNBQUtGLE1BQUwsQ0FBWUUsSUFBWixFQUFrQkcsSUFBbEIsQ0FBd0IsRUFBQ0gsTUFBTUEsSUFBUCxFQUFhQyxNQUFNQSxJQUFuQixFQUF5QkMsS0FBS0EsR0FBOUIsRUFBeEI7QUFDSCxDQU5EOztBQVFBTCxVQUFVakUsU0FBVixDQUFvQndFLEVBQXBCLEdBQTBCUCxVQUFVakUsU0FBVixDQUFvQm1FLGtCQUE5Qzs7QUFFQUYsVUFBVWpFLFNBQVYsQ0FBb0J5RSxJQUFwQixHQUEyQixVQUFTTCxJQUFULEVBQWVFLEdBQWYsRUFDM0I7QUFDSSxRQUFJSSxZQUFZLEtBQUtSLE1BQUwsQ0FBWUUsSUFBWixDQUFoQjtBQUNBLFFBQUlNLFNBQUosRUFBZTtBQUNYLGFBQUksSUFBSUMsSUFBSSxDQUFaLEVBQWVBLElBQUlELFVBQVVFLE1BQTdCLEVBQXFDRCxHQUFyQyxFQUEwQztBQUN0QyxnQkFBSUUsSUFBSUgsVUFBVUMsQ0FBVixDQUFSO0FBQ0FFLGNBQUVSLElBQUYsQ0FBT1MsSUFBUCxDQUFZRCxFQUFFUCxHQUFkLEVBQW1CQSxHQUFuQjtBQUNIO0FBQ0o7QUFDSixDQVREOztBQVdBLElBQUltSCxpQkFBaUIsSUFBSXhILFNBQUosRUFBckI7Ozs7Ozs7OztBQzNCQTtBQUFBLElBQUl5SCxvQkFBb0IsRUFBeEI7O0FBRUFBLGtCQUFrQkMsc0JBQWxCLEdBQTJDLFVBQVVsTCxNQUFWLEVBQWtCbUwsS0FBbEIsRUFDM0M7QUFDQyxLQUFJQyxTQUFTcEwsT0FBT3FMLHFCQUFQLEVBQWI7QUFDQSxLQUFJMUwsUUFBUUssT0FBT3NMLFdBQW5CO0FBQ0EsS0FBSTFMLFNBQVNJLE9BQU91TCxZQUFwQjtBQUNHO0FBQ0EsS0FBSXpHLElBQUksQ0FBQ3FHLE1BQU1LLE9BQU4sR0FBZ0JKLE9BQU9LLElBQXhCLElBQWdDOUwsS0FBeEM7QUFDQSxLQUFJb0MsSUFBSSxDQUFDb0osTUFBTU8sT0FBTixHQUFnQk4sT0FBT08sR0FBeEIsSUFBK0IvTCxNQUF2QztBQUNILEtBQUlrRixJQUFJQSxJQUFJLENBQUosR0FBUSxDQUFoQjtBQUNBLEtBQUkvQyxJQUFJLEVBQUVBLElBQUksQ0FBSixHQUFRLENBQVYsQ0FBUjtBQUNHO0FBQ0gsS0FBSTZKLFNBQVMsSUFBSWxMLE1BQU02SixPQUFWLENBQW1CekYsQ0FBbkIsRUFBc0IvQyxDQUF0QixFQUF5QixDQUF6QixDQUFiO0FBQ0EsUUFBTzZKLE1BQVA7QUFDQSxDQWJEOztBQWdCQVgsa0JBQWtCWSxTQUFsQixHQUE4QixVQUFTRCxNQUFULEVBQWlCbkosTUFBakIsRUFDOUI7QUFDSSxLQUFJMEgsSUFBSSxJQUFJekosTUFBTTZKLE9BQVYsRUFBUjtBQUNBSixHQUFFRixJQUFGLENBQU8yQixNQUFQO0FBQ0F6QixHQUFFcEYsQ0FBRixHQUFNLENBQU47QUFDSG9GLEdBQUUwQixTQUFGLENBQVlwSixNQUFaO0FBQ0cwSCxHQUFFbEIsWUFBRixDQUFleEcsT0FBT3FKLGtCQUF0QjtBQUNBLFFBQU8zQixDQUFQO0FBQ0gsQ0FSRDs7QUFVQWMsa0JBQWtCYyxtQkFBbEIsR0FBd0MsVUFBVS9MLE1BQVYsRUFBa0JtTCxLQUFsQixFQUF5QjFJLE1BQXpCLEVBQ3hDO0FBQ0MsS0FBSTJJLFNBQVNwTCxPQUFPcUwscUJBQVAsRUFBYjtBQUNBLEtBQUkxTCxRQUFRSyxPQUFPc0wsV0FBbkI7QUFDQSxLQUFJMUwsU0FBU0ksT0FBT3VMLFlBQXBCO0FBQ0EsS0FBSXpHLElBQUssQ0FBQ3FHLE1BQU1LLE9BQU4sR0FBZ0JKLE9BQU9LLElBQXhCLElBQWdDOUwsS0FBakMsR0FBMEMsQ0FBMUMsR0FBOEMsQ0FBdEQ7QUFDQSxLQUFJb0MsSUFBSSxFQUFHLENBQUNvSixNQUFNTyxPQUFOLEdBQWdCTixPQUFPTyxHQUF4QixJQUErQi9MLE1BQWhDLEdBQTBDLENBQTFDLEdBQThDLENBQWhELENBQVI7QUFDQSxLQUFJZ00sU0FBUyxJQUFJbEwsTUFBTTZKLE9BQVYsQ0FBbUJ6RixDQUFuQixFQUFzQi9DLENBQXRCLEVBQXlCLENBQXpCLENBQWI7O0FBRUE2SixRQUFPQyxTQUFQLENBQWlCcEosTUFBakI7QUFDQSxLQUFJMkgsTUFBTSxJQUFJMUosTUFBTXNMLFNBQVYsQ0FBcUJ2SixPQUFPc0csUUFBNUIsRUFBc0M2QyxPQUFPakIsR0FBUCxDQUFZbEksT0FBT3NHLFFBQW5CLEVBQThCa0QsU0FBOUIsRUFBdEMsQ0FBVjtBQUNBLFFBQU83QixHQUFQO0FBQ0EsQ0FaRDs7QUFnQkFhLGtCQUFrQmlCLG1DQUFsQixHQUF3RCxVQUFTTixNQUFULEVBQWlCbkosTUFBakIsRUFBeUJHLEtBQXpCLEVBQ3hEO0FBQ0NnSixRQUFPQyxTQUFQLENBQWlCcEosTUFBakI7QUFDQSxLQUFJMkgsTUFBTSxJQUFJMUosTUFBTXNMLFNBQVYsQ0FBcUJ2SixPQUFPc0csUUFBNUIsRUFBc0M2QyxPQUFPakIsR0FBUCxDQUFZbEksT0FBT3NHLFFBQW5CLEVBQThCa0QsU0FBOUIsRUFBdEMsQ0FBVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUlsQyxhQUFhSyxJQUFJK0IsZ0JBQUosQ0FBc0IsQ0FBQ3ZKLEtBQUQsQ0FBdEIsRUFBK0IsSUFBL0IsQ0FBakI7QUFDQSxRQUFPbUgsVUFBUDtBQUNBLENBVEQ7Ozs7Ozs7OztBQzVDQTtBQUFBLElBQUlxQyxtQkFBbUIsRUFBdkI7O0FBRUEsQ0FBQyxZQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSWhMLGdCQUFnQjtBQUNwQjtBQUNBLHdCQUZvQixFQUdwQix5QkFIb0IsRUFJcEIsc0JBSm9CLEVBS3BCLHlCQUxvQixFQU1wQiwyQkFOb0IsRUFPcEIsMkJBUG9CLEVBUXBCLHdCQVJvQixFQVNoQiw4QkFUZ0IsRUFVcEIsUUFWb0IsRUFXcEIsZ0JBWG9CLEVBWW5CLHNFQVptQixFQWFwQix1QkFib0IsRUFjbkIseUJBZG1CLEVBZXBCLE9BZm9CLEVBZ0JoQixrQ0FoQmdCLEVBaUJwQixRQWpCb0IsRUFrQnBCLHNCQWxCb0IsRUFtQm5CLGlCQW5CbUIsRUFvQnBCLE9BcEJvQjtBQXFCbkI7QUFDQSxpQ0F0Qm1CLEVBdUJuQixzQkF2Qm1CLEVBd0JuQixpQkF4Qm1CLEVBeUJwQixRQXpCb0IsRUEwQm5CLG1FQTFCbUIsRUEyQm5CLHFCQTNCbUIsRUE0Qm5CLHFCQTVCbUIsRUE2QmxCLG1CQTdCa0IsRUE4Qm5CLEdBOUJtQixFQStCbkIsUUEvQm1CO0FBZ0NsQjtBQUNBLHNCQWpDa0IsRUFrQ25CLEdBbENtQixFQW1DcEIsR0FuQ29CLENBQXBCOztBQXNDQSxLQUFJQyxrQkFBa0IsQ0FDckIsc0JBRHFCLEVBRXJCLHlCQUZxQixFQUdwQiwyQkFIb0IsRUFJckIsUUFKcUIsRUFLckIsZUFMcUIsRUFNckIseUJBTnFCLEVBT3BCLGdEQVBvQixFQVFwQixnQ0FSb0IsRUFTcEIsbUNBVG9CLEVBVXBCLHNCQVZvQixFQVdyQixPQVhxQixFQVlwQixtQ0Fab0IsRUFhcEIsb0JBYm9CLEVBY3JCLFFBZHFCLEVBZXJCLGtCQWZxQixFQWdCcEIsOEJBaEJvQixFQWlCckIsUUFqQnFCLEVBa0JyQix1QkFsQnFCLEVBbUJwQiwwQ0FuQm9CLEVBb0JyQixPQXBCcUIsRUFxQnBCLCtCQXJCb0IsRUFzQnJCLFFBdEJxQixFQXVCcEIsMERBdkJvQixFQXdCckIsR0F4QnFCLENBQXRCOztBQTJCQStLLGtCQUFpQkMsTUFBakIsR0FBMEJqTCxjQUFja0wsSUFBZCxDQUFvQixJQUFwQixDQUExQjtBQUNBRixrQkFBaUJHLFFBQWpCLEdBQTRCbEwsZ0JBQWdCaUwsSUFBaEIsQ0FBc0IsSUFBdEIsQ0FBNUI7QUFDQyxDQTFFRDs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQSxTQUFTRSxlQUFULENBQXlCdkYsTUFBekIsRUFDQTtBQUNJLFNBQUtZLElBQUwsR0FBWS9CLEVBQUVhLFlBQUYsRUFBWjs7QUFFQTtBQUNILFFBQUksQ0FBQ00sT0FBT3dGLE9BQVosRUFBcUI7QUFDcEJ4RixlQUFPd0YsT0FBUCxHQUFpQixJQUFJLDhFQUFKLENBQXFCLENBQXJCLENBQWpCO0FBQ0E7QUFDRCxRQUFJLENBQUN4RixPQUFPeUYsUUFBWixFQUFzQjtBQUNyQnpGLGVBQU95RixRQUFQLEdBQWtCLElBQUksZ0ZBQUosRUFBbEI7QUFDQTtBQUNFekYsV0FBTzBGLGFBQVAsR0FBdUIsQ0FBQyxDQUFDMUYsT0FBTzBGLGFBQWhDO0FBQ0ExRixXQUFPMkYsaUJBQVAsR0FBMkIzRixPQUFPMkYsaUJBQVAsSUFBNEIsR0FBdkQ7O0FBRUgsUUFBSSxPQUFPM0YsT0FBTzRGLFNBQWQsS0FBNEIsV0FBaEMsRUFBNkM7QUFDNUM1RixlQUFPNEYsU0FBUCxHQUFtQixJQUFuQjtBQUNBOztBQUVELFFBQUksT0FBTzVGLE9BQU82RixVQUFkLEtBQTZCLFdBQWpDLEVBQThDO0FBQzdDN0YsZUFBTzZGLFVBQVAsR0FBb0IsSUFBcEI7QUFDQTs7QUFFRCxRQUFJN0YsT0FBTyxhQUFQLE1BQTBCWCxTQUE5QixFQUF3QztBQUN2Q1csZUFBTzhGLFdBQVAsR0FBcUIsS0FBckI7QUFDQTs7QUFFRCxRQUFJLENBQUM5RixPQUFPRixLQUFaLEVBQW1CO0FBQ2xCRSxlQUFPRixLQUFQLEdBQWdCLEVBQUMsS0FBSSxDQUFMLEVBQVEsS0FBSSxDQUFaLEVBQWUsS0FBSSxDQUFuQixFQUFoQjtBQUNBOztBQUVFLFFBQUksQ0FBQ0UsT0FBTytGLFFBQVosRUFBc0I7QUFDbEIvRixlQUFPK0YsUUFBUCxHQUFrQixXQUFsQjtBQUNIOztBQUVEL0YsV0FBT2dHLElBQVAsR0FBY2hHLE9BQU9nRyxJQUFQLElBQWUsQ0FBN0I7O0FBRUEsUUFBSSxDQUFDaEcsT0FBT2lHLEtBQVosRUFBbUJqRyxPQUFPaUcsS0FBUCxHQUFlLEdBQWY7O0FBR3RCLFNBQUtULE9BQUwsR0FBZXhGLE9BQU93RixPQUF0QjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0J6RixPQUFPeUYsUUFBdkI7QUFDRyxTQUFLL0ksSUFBTCxHQUFZc0QsT0FBT3RELElBQVAsSUFBZSxFQUEzQjtBQUNBLFNBQUtpSixpQkFBTCxHQUF5QjNGLE9BQU8yRixpQkFBaEM7QUFDSCxTQUFLM0YsTUFBTCxHQUFjQSxNQUFkOztBQUdHLFNBQUt4RyxPQUFMLEdBQWV3RyxPQUFPeEcsT0FBdEI7O0FBRUgsU0FBSzBNLGFBQUwsR0FBc0IsQ0FBQyxDQUFDbEcsT0FBT21HLFNBQVQsSUFBc0IsQ0FBQyxDQUFDbkcsT0FBT29HLFlBQXJEOztBQUdBLFFBQUlILFFBQVFqRyxPQUFPaUcsS0FBbkI7O0FBRUEsU0FBSzFMLFFBQUwsR0FBZ0IsS0FBSzhMLHdCQUFMLEVBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLElBQUksOEVBQUosQ0FBcUIsS0FBS0Msd0JBQUwsQ0FBOEJOLEtBQTlCLENBQXJCLEVBQTJELEtBQUsxTCxRQUFoRSxDQUFaO0FBQ0csU0FBSytMLElBQUwsQ0FBVTVKLElBQVYsR0FBaUIsS0FBS0EsSUFBdEI7O0FBRUEsUUFBSSxPQUFPLEtBQUtzRCxNQUFMLENBQVl3RyxlQUFuQixLQUF1QyxXQUEzQyxFQUF3RDtBQUNwRCxhQUFLRixJQUFMLENBQVVqRSxjQUFWLENBQXlCRSxNQUF6QixHQUFrQ3ZDLE9BQU93RyxlQUF6QztBQUNIO0FBQ0o7O0FBRURqQixnQkFBZ0JqTixTQUFoQixDQUEwQm1PLFFBQTFCLEdBQXFDLFVBQVUvSixJQUFWLEVBQ3JDO0FBQ0ksU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBSzRKLElBQUwsQ0FBVTVKLElBQVYsR0FBaUJBLElBQWpCO0FBQ0gsQ0FKRDs7QUFNQTZJLGdCQUFnQmpOLFNBQWhCLENBQTBCb08sT0FBMUIsR0FBb0MsWUFDcEM7QUFDQyxTQUFLSixJQUFMLENBQVU5SCxNQUFWLENBQWlCbUksTUFBakIsQ0FBd0IsS0FBS0wsSUFBN0I7QUFDR3ZDLG1CQUFlaEgsSUFBZixDQUFvQixTQUFwQixFQUErQixJQUEvQjtBQUNILENBSkQ7O0FBT0F3SSxnQkFBZ0JqTixTQUFoQixDQUEwQnNPLG9CQUExQixHQUFpRCxVQUFVWCxLQUFWLEVBQ2pEO0FBQ0ksUUFBSVksZ0JBQWdCLElBQUl6RyxLQUFKLENBQVU2RixLQUFWLENBQXBCO0FBQ0EsUUFBSXRFLENBQUo7QUFDQSxTQUFJLElBQUkxRSxJQUFHLENBQVgsRUFBYUEsSUFBSWdKLEtBQWpCLEVBQXdCaEosR0FBeEIsRUFBNkI7QUFDL0IwRSxZQUFJLEVBQUo7QUFDQUEsVUFBRUcsUUFBRixHQUFhLElBQUlySSxNQUFNNkosT0FBVixDQUFrQixDQUFsQixFQUFvQixDQUFwQixFQUFzQixDQUF0QixDQUFiO0FBQ0EzQixVQUFFaEIsUUFBRixHQUFhLElBQUlsSCxNQUFNNkosT0FBVixDQUFrQixDQUFsQixFQUFvQixDQUFwQixFQUFzQixDQUF0QixDQUFiO0FBQ0EzQixVQUFFUixRQUFGLEdBQWEsQ0FBYjtBQUNBMEYsc0JBQWM1SixDQUFkLElBQW1CMEUsQ0FBbkI7QUFDRztBQUNELFNBQUtrRixhQUFMLEdBQXFCQSxhQUFyQjtBQUNILENBWkQ7O0FBY0F0QixnQkFBZ0JqTixTQUFoQixDQUEwQmlPLHdCQUExQixHQUFxRCxVQUFTTixLQUFULEVBQ3JEO0FBQ0ksU0FBS1csb0JBQUwsQ0FBMEJYLEtBQTFCOztBQUVILFFBQUlhLFdBQVcsSUFBSUMsWUFBSixDQUFpQmQsUUFBUSxDQUF6QixDQUFmLENBSEQsQ0FHNkM7QUFDNUMsUUFBSWUsU0FBUyxJQUFJRCxZQUFKLENBQWlCZCxRQUFRLENBQXpCLENBQWI7QUFDQSxRQUFJakcsU0FBUyxJQUFJK0csWUFBSixDQUFpQmQsS0FBakIsQ0FBYjs7QUFFRyxTQUFLLElBQUloSixJQUFJLENBQWIsRUFBZ0JBLElBQUlnSixLQUFwQixFQUEyQmhKLEdBQTNCLEVBQWdDO0FBQ2xDO0FBQ0E2SixpQkFBUzdKLElBQUUsQ0FBWCxJQUFnQixDQUFoQjtBQUNBNkosaUJBQVM3SixJQUFFLENBQUYsR0FBSSxDQUFiLElBQWtCLENBQWxCO0FBQ0E2SixpQkFBUzdKLElBQUUsQ0FBRixHQUFJLENBQWIsSUFBa0IsQ0FBbEI7O0FBRUErQyxlQUFPL0MsQ0FBUCxJQUFZLEdBQVo7O0FBRUErSixlQUFPL0osSUFBRSxDQUFULElBQWMsS0FBSytDLE1BQUwsQ0FBWUYsS0FBWixDQUFrQm9ELENBQWhDO0FBQ0E4RCxlQUFPL0osSUFBRSxDQUFGLEdBQUksQ0FBWCxJQUFnQixLQUFLK0MsTUFBTCxDQUFZRixLQUFaLENBQWtCbUgsQ0FBbEM7QUFDQUQsZUFBTy9KLElBQUUsQ0FBRixHQUFJLENBQVgsSUFBZ0IsS0FBSytDLE1BQUwsQ0FBWUYsS0FBWixDQUFrQm9ILENBQWxDO0FBQ0E7O0FBRUQsU0FBSy9FLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQSxRQUFMLENBQWMyRSxRQUFkLEdBQXlCLElBQUlyTixNQUFNME4sZUFBVixDQUEwQkwsUUFBMUIsRUFBb0MsQ0FBcEMsRUFBdUNNLFVBQXZDLENBQWtELElBQWxELENBQXpCO0FBQ0EsU0FBS2pGLFFBQUwsQ0FBYzZFLE1BQWQsR0FBdUIsSUFBSXZOLE1BQU0wTixlQUFWLENBQTBCSCxNQUExQixFQUFrQyxDQUFsQyxDQUF2QjtBQUNBLFFBQUksS0FBS2QsYUFBVCxFQUF3QjtBQUN2QixhQUFLL0QsUUFBTCxDQUFjNkUsTUFBZCxDQUFxQkksVUFBckIsQ0FBZ0MsSUFBaEM7QUFDQTtBQUNELFNBQUtqRixRQUFMLENBQWNuQyxNQUFkLEdBQXVCLElBQUl2RyxNQUFNME4sZUFBVixDQUEwQm5ILE1BQTFCLEVBQWtDLENBQWxDLEVBQXFDb0gsVUFBckMsQ0FBZ0QsSUFBaEQsQ0FBdkI7QUFDQSxRQUFJMUUsT0FBTyxJQUFJakosTUFBTTROLGNBQVYsRUFBWDtBQUNBLFNBQUtsRixRQUFMLENBQWNtRixNQUFkLEdBQXVCNUUsSUFBdkI7QUFDQUEsU0FBSzZFLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEIsS0FBS3BGLFFBQUwsQ0FBYzJFLFFBQTVDO0FBQ0FwRSxTQUFLNkUsWUFBTCxDQUFrQixPQUFsQixFQUEyQixLQUFLcEYsUUFBTCxDQUFjNkUsTUFBekM7QUFDQXRFLFNBQUs2RSxZQUFMLENBQWtCLFFBQWxCLEVBQTRCLEtBQUtwRixRQUFMLENBQWNuQyxNQUExQzs7QUFFRyxXQUFPMEMsSUFBUDtBQUNILENBbkNEOztBQXNDQTZDLGdCQUFnQmpOLFNBQWhCLENBQTBCa1Asc0JBQTFCLEdBQW1ELFlBQ25EO0FBQ0MsUUFBSUMsVUFBVSxzQkFBZDtBQUNBLFFBQUksQ0FBQyxDQUFDLEtBQUtqTyxPQUFYLEVBQW9CO0FBQ25CaU8sbUJBQVksZUFBWjtBQUNBO0FBQ0QsUUFBSSxLQUFLekgsTUFBTCxDQUFZMEYsYUFBaEIsRUFBK0I7QUFDOUIrQixtQkFBVyxnQkFBWDtBQUNBO0FBQ0QsV0FBT0EsT0FBUDtBQUNBLENBVkQ7O0FBWUFsQyxnQkFBZ0JqTixTQUFoQixDQUEwQm9QLGFBQTFCLEdBQ0E7QUFDQyxnQkFBWTtBQUNYLG9CQUFZak8sTUFBTWtPLFNBRFA7QUFFWCxvQkFBWWxPLE1BQU1rTztBQUZQLEtBRGI7QUFLQyxhQUFTO0FBQ1Isb0JBQVlsTyxNQUFNbU8sY0FEVjtBQUVSLG9CQUFZbk8sTUFBTW9PO0FBRlYsS0FMVjtBQVNDLGlCQUFhO0FBQ1osb0JBQVlwTyxNQUFNa08sU0FETjtBQUVaLG9CQUFZbE8sTUFBTW9PO0FBRk4sS0FUZDtBQWFDLGlCQUFhO0FBQ1osb0JBQVlwTyxNQUFNbU8sY0FETjtBQUVaLG9CQUFZbk8sTUFBTWtPO0FBRk47QUFiZCxDQURBOztBQW9CQXBDLGdCQUFnQmpOLFNBQWhCLENBQTBCd1AscUJBQTFCLEdBQWtELFVBQVUvQixRQUFWLEVBQ2xEO0FBQ0ksUUFBSWdDLGNBQUo7QUFDSCxRQUFJQyxVQUFVLEtBQUtOLGFBQUwsQ0FBbUIsV0FBbkIsQ0FBZDtBQUNHLFFBQUkzQixhQUFhLElBQWpCLEVBQXVCO0FBQ25CZ0MseUJBQWlCdE8sTUFBTXdPLFVBQXZCO0FBQ0gsS0FGRCxNQUVPO0FBQ0hGLHlCQUFpQnRPLE1BQU15TyxjQUF2QjtBQUNBLFlBQUksS0FBS1IsYUFBTCxDQUFtQjNCLFFBQW5CLENBQUosRUFBa0M7QUFDOUJpQyxzQkFBVSxLQUFLTixhQUFMLENBQW1CM0IsUUFBbkIsQ0FBVjtBQUNIO0FBQ0o7QUFDRCxXQUFPLEVBQUMsWUFBWWdDLGNBQWIsRUFBNkIsV0FBVUMsT0FBdkMsRUFBUDtBQUNILENBYkQ7O0FBZUF6QyxnQkFBZ0JqTixTQUFoQixDQUEwQjZQLFdBQTFCLEdBQXdDLFVBQVUzTyxPQUFWLEVBQ3hDO0FBQ0MsUUFBSSxPQUFPQSxPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQzFCLFlBQUksS0FBS3dHLE1BQUwsQ0FBWXhHLE9BQVosS0FBd0JBLE9BQTVCLEVBQXFDO0FBQ2pDO0FBQ0g7QUFDRCxhQUFLd0csTUFBTCxDQUFZeEcsT0FBWixHQUFzQkEsT0FBdEI7QUFDTixhQUFLQSxPQUFMLEdBQWUsK0RBQUF2QixDQUFPbVEsZUFBUCxDQUF1QkMsR0FBdkIsQ0FBMkI3TyxPQUEzQixDQUFmO0FBQ0EsS0FORCxNQU1PO0FBQ0E0RSxnQkFBUWtLLEtBQVIsQ0FBYywwRUFBZCxFQUEwRjlPLE9BQTFGO0FBQ0g7O0FBRUQsUUFBSSxLQUFLZSxRQUFMLENBQWNnTyxRQUFkLENBQXVCQyxNQUEzQixFQUFtQztBQUMvQixhQUFLak8sUUFBTCxDQUFjZ08sUUFBZCxDQUF1QkMsTUFBdkIsQ0FBOEJDLEtBQTlCLEdBQXNDLEtBQUtqUCxPQUEzQztBQUNILEtBRkQsTUFFTztBQUNIO0FBQ0EsYUFBS2tQLGlCQUFMO0FBQ0F0SyxnQkFBUWtLLEtBQVIsQ0FBYyx1RUFBZDtBQUNIO0FBQ0osQ0FuQkQ7O0FBc0JBL0MsZ0JBQWdCak4sU0FBaEIsQ0FBMEJxUSxlQUExQixHQUE0QyxZQUM1QztBQUNJLFFBQUlKLFdBQ0o7QUFDSSxvQkFBWTtBQUNSRSxtQkFBTyxLQUFLOUM7QUFESixTQURoQjtBQUlJLHNCQUFjO0FBQ1Y4QyxtQkFBTyxLQUFLekksTUFBTCxDQUFZZ0c7QUFEVCxTQUpsQjtBQU9JLHVCQUFlO0FBQ1h5QyxtQkFBTyxJQUFJaFAsTUFBTW1QLE9BQVYsQ0FBa0IsK0RBQUEzUSxDQUFPQyxRQUFQLENBQWdCUSxLQUFsQyxFQUF5QywrREFBQVQsQ0FBT0MsUUFBUCxDQUFnQlMsTUFBekQ7QUFESTtBQVBuQixLQURBO0FBWUEsUUFBSSxDQUFDLENBQUMsS0FBS2EsT0FBWCxFQUFvQjtBQUNoQitPLGlCQUFTLFFBQVQsSUFBcUI7QUFDakJFLG1CQUFPLEtBQUtqUDtBQURLLFNBQXJCO0FBR0g7QUFDRCxRQUFJLENBQUMsS0FBSzBNLGFBQVYsRUFBeUI7QUFDckJxQyxpQkFBUyxnQkFBVCxJQUE2QixFQUFDRSxPQUFPLEtBQUt6SSxNQUFMLENBQVlGLEtBQXBCLEVBQTdCO0FBQ0g7QUFDRCxXQUFPeUksUUFBUDtBQUNILENBdkJEOztBQXlCQWhELGdCQUFnQmpOLFNBQWhCLENBQTBCdVEsWUFBMUIsR0FBeUMsWUFDekM7QUFDSSxRQUFJQyxVQUFVLEVBQWQ7QUFDQSxRQUFJLEtBQUs5SSxNQUFMLENBQVk0RixTQUFoQixFQUEyQjtBQUN2QmtELGdCQUFRLFdBQVIsSUFBdUIsSUFBdkI7QUFDSDtBQUNKLFFBQUksQ0FBQyxDQUFDLEtBQUt0UCxPQUFYLEVBQW9CO0FBQ2JzUCxnQkFBUSxrQkFBUixJQUE4QixJQUE5QjtBQUNIO0FBQ0QsUUFBSSxLQUFLOUksTUFBTCxDQUFZMEYsYUFBaEIsRUFBK0I7QUFDM0JvRCxnQkFBUSxlQUFSLElBQTJCLElBQTNCO0FBQ0g7QUFDRCxXQUFPQSxPQUFQO0FBQ0gsQ0FiRDs7QUFnQkF2RCxnQkFBZ0JqTixTQUFoQixDQUEwQnlRLGNBQTFCLEdBQTJDLFVBQVV2UCxPQUFWLEVBQzNDO0FBQ0MsUUFBSSxPQUFPLEtBQUtBLE9BQVosS0FBd0IsUUFBNUIsRUFBc0M7QUFDckMsYUFBS0EsT0FBTCxHQUFlLCtEQUFBdkIsQ0FBT21RLGVBQVAsQ0FBdUJDLEdBQXZCLENBQTJCLEtBQUs3TyxPQUFoQyxDQUFmO0FBQ000RSxnQkFBUUMsR0FBUixDQUFZLCtEQUFBcEcsQ0FBT21RLGVBQVAsQ0FBdUJZLFNBQW5DO0FBQ0EsWUFBSSxDQUFDLEtBQUt4UCxPQUFWLEVBQW1CO0FBQ2Y0RSxvQkFBUWtLLEtBQVIsQ0FBYyw0QkFBNEIsS0FBS3RJLE1BQUwsQ0FBWXhHLE9BQXhDLEdBQWtELDZDQUFsRCxHQUFnRyxLQUFLQSxPQUFuSDtBQUNIO0FBQ1A7QUFDRCxDQVREOztBQVdBK0wsZ0JBQWdCak4sU0FBaEIsQ0FBMEIrTix3QkFBMUIsR0FBcUQsWUFDckQ7O0FBRUksU0FBSzBDLGNBQUwsQ0FBb0IsS0FBS3ZQLE9BQXpCOztBQUVBLFFBQUl5UCxZQUFZLEtBQUtuQixxQkFBTCxDQUEyQixLQUFLOUgsTUFBTCxDQUFZK0YsUUFBdkMsQ0FBaEI7O0FBR0EsUUFBSXdDLFdBQVcsS0FBS0ksZUFBTCxFQUFmO0FBQ0EsUUFBSUcsVUFBVSxLQUFLRCxZQUFMLEVBQWQ7O0FBRUgsUUFBSXBHLE1BQU0sSUFBSWhKLE1BQU1lLGNBQVYsQ0FBeUI7QUFDbEMwTyxxQkFBYSxJQURxQjtBQUVsQ0Msb0JBQVksS0FBS25KLE1BQUwsQ0FBWThGLFdBRlU7QUFHbENzRCxtQkFBVyxLQUFLcEosTUFBTCxDQUFZNkYsVUFIVztBQUk1QkUsa0JBQVVrRCxVQUFVbEQsUUFKUTtBQUs1QnNELGtCQUFVSixVQUFVakIsT0FBVixDQUFrQnFCLFFBTEE7QUFNNUJDLGtCQUFVTCxVQUFVakIsT0FBVixDQUFrQnNCLFFBTkE7QUFPbENSLGlCQUFTQSxPQVB5QjtBQVFsQ1Asa0JBQVVBLFFBUndCO0FBU2xDOU4sc0JBQWMsOEVBQUEwSyxDQUFpQkMsTUFURztBQVVsQzFLLHdCQUFnQiw4RUFBQXlLLENBQWlCRztBQVZDLEtBQXpCLENBQVY7QUFZQSxXQUFPN0MsR0FBUDtBQUNBLENBeEJEOztBQTBCQThDLGdCQUFnQmpOLFNBQWhCLENBQTBCb1EsaUJBQTFCLEdBQThDLFlBQzlDO0FBQ0ksU0FBS3BDLElBQUwsQ0FBVS9MLFFBQVYsR0FBcUIsS0FBS0EsUUFBTCxHQUFnQixLQUFLOEwsd0JBQUwsRUFBckM7QUFDSCxDQUhEOztBQU1BZCxnQkFBZ0JqTixTQUFoQixDQUEwQmlSLGFBQTFCLEdBQTBDLFVBQVUzRCxTQUFWLEVBQzFDO0FBQ0ksUUFBSSxLQUFLNUYsTUFBTCxDQUFZNEYsU0FBWixLQUEwQixDQUFDLENBQUNBLFNBQWhDLEVBQTJDO0FBQ3ZDLGFBQUs1RixNQUFMLENBQVk0RixTQUFaLEdBQXdCQSxTQUF4QjtBQUNBLGFBQUs4QyxpQkFBTDtBQUNIO0FBQ0osQ0FORDs7QUFRQW5ELGdCQUFnQmpOLFNBQWhCLENBQTBCa1IsY0FBMUIsR0FBMkMsVUFBVXhELElBQVYsRUFDM0M7QUFDSSxRQUFJLEtBQUtoRyxNQUFMLENBQVlnRyxJQUFaLElBQW9CQSxJQUF4QixFQUE4QjtBQUMxQixhQUFLaEcsTUFBTCxDQUFZZ0csSUFBWixHQUFtQkEsSUFBbkI7QUFDQSxhQUFLTSxJQUFMLENBQVUvTCxRQUFWLENBQW1CZ08sUUFBbkIsQ0FBNEIsWUFBNUIsRUFBMENFLEtBQTFDLEdBQWtEekMsSUFBbEQ7QUFDSDtBQUNKLENBTkQ7O0FBUUFULGdCQUFnQmpOLFNBQWhCLENBQTBCbVIsWUFBMUIsR0FBeUMsVUFBVTFELFFBQVYsRUFDekM7QUFDSSxTQUFLL0YsTUFBTCxDQUFZK0YsUUFBWixHQUF1QkEsUUFBdkI7QUFDQSxRQUFJbUIsSUFBSSxLQUFLWSxxQkFBTCxDQUEyQi9CLFFBQTNCLENBQVI7QUFDQSxTQUFLeEwsUUFBTCxDQUFjd0wsUUFBZCxHQUF5Qm1CLEVBQUVuQixRQUEzQjtBQUNBLFNBQUt4TCxRQUFMLENBQWM4TyxRQUFkLEdBQXlCbkMsRUFBRWMsT0FBRixDQUFVcUIsUUFBbkM7QUFDQSxTQUFLOU8sUUFBTCxDQUFjK08sUUFBZCxHQUF5QnBDLEVBQUVjLE9BQUYsQ0FBVXNCLFFBQW5DO0FBQ0gsQ0FQRDs7QUFXQS9ELGdCQUFnQmpOLFNBQWhCLENBQTBCb1IsY0FBMUIsR0FBMkMsVUFBVWxSLEVBQVYsRUFBY2lKLFNBQWQsRUFDM0M7QUFDQztBQUNBLFFBQUlFLENBQUo7QUFDQSxRQUFJZ0ksUUFBUSxLQUFLeEgsUUFBTCxDQUFjMkUsUUFBZCxDQUF1QjhDLEtBQW5DO0FBQ0EsUUFBSTVKLFNBQVMsS0FBS21DLFFBQUwsQ0FBY25DLE1BQWQsQ0FBcUI0SixLQUFsQztBQUNBO0FBQ0E7O0FBRUcsU0FBS3RELElBQUwsQ0FBVXVELGlCQUFWLENBQTRCLElBQTVCO0FBQ0EsUUFBSWhJLFNBQVMsS0FBS3lFLElBQUwsQ0FBVXJELFdBQXZCO0FBQ0gsU0FBSSxJQUFJaEcsSUFBRyxDQUFYLEVBQWNBLElBQUksS0FBSzRKLGFBQUwsQ0FBbUIzSixNQUF2QixJQUFpQ3VFLFlBQVksQ0FBM0QsRUFBOER4RSxHQUE5RCxFQUFtRTtBQUNsRSxZQUFJLEVBQUUrQyxPQUFPL0MsQ0FBUCxJQUFZLENBQWQsQ0FBSixFQUFzQjtBQUNyQjBFLGdCQUFJLEtBQUtrRixhQUFMLENBQW1CNUosQ0FBbkIsQ0FBSjtBQUNBLGlCQUFLdUksT0FBTCxDQUFhekksSUFBYixDQUFrQjRFLENBQWxCLEVBQXFCLElBQXJCLEVBQTJCRSxNQUEzQjtBQUNBRixjQUFFUixRQUFGLEdBQWEsS0FBS3dFLGlCQUFsQjtBQUNBZ0Usa0JBQU0xTSxJQUFFLENBQVIsSUFBYTBFLEVBQUVHLFFBQUYsQ0FBV2pFLENBQXhCO0FBQ0E4TCxrQkFBTTFNLElBQUUsQ0FBRixHQUFJLENBQVYsSUFBZTBFLEVBQUVHLFFBQUYsQ0FBV2hILENBQTFCO0FBQ0E2TyxrQkFBTTFNLElBQUUsQ0FBRixHQUFJLENBQVYsSUFBZTBFLEVBQUVHLFFBQUYsQ0FBV2hFLENBQTFCO0FBQ0FrQyxtQkFBTy9DLENBQVAsSUFBWTBFLEVBQUVSLFFBQWQ7QUFDQU07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEO0FBQ0QsQ0ExQkQ7O0FBNEJBOEQsZ0JBQWdCak4sU0FBaEIsQ0FBMEJ3Uix3QkFBMUIsR0FBcUQsVUFBVXRSLEVBQVYsRUFDckQ7QUFDQyxRQUFJbVIsUUFBUSxLQUFLeEgsUUFBTCxDQUFjMkUsUUFBZCxDQUF1QjhDLEtBQW5DO0FBQ0EsUUFBSTVKLFNBQVMsS0FBS21DLFFBQUwsQ0FBY25DLE1BQWQsQ0FBcUI0SixLQUFsQztBQUNBLFFBQUlqSSxDQUFKO0FBQ0EsUUFBSTlCLE9BQU8sSUFBSXBHLE1BQU02SixPQUFWLENBQWtCLENBQWxCLEVBQW9CLENBQXBCLEVBQXNCLENBQXRCLENBQVg7QUFDQSxRQUFJeUcsY0FBYyxFQUFDLEtBQUksQ0FBTCxFQUFRLEtBQUksQ0FBWixFQUFlLEtBQUksQ0FBbkIsRUFBbEI7QUFDQSxTQUFJLElBQUk5TSxJQUFJLENBQVosRUFBZUEsSUFBSSxLQUFLNEosYUFBTCxDQUFtQjNKLE1BQXRDLEVBQThDRCxHQUE5QyxFQUFtRDs7QUFFbEQsWUFBSStDLE9BQU8vQyxDQUFQLElBQVksQ0FBaEIsRUFBbUI7QUFDbEIwRSxnQkFBSSxLQUFLa0YsYUFBTCxDQUFtQjVKLENBQW5CLENBQUo7O0FBRUE7QUFDQTBFLGNBQUVHLFFBQUYsQ0FBV2pFLENBQVgsSUFBZ0I4RCxFQUFFaEIsUUFBRixDQUFXOUMsQ0FBWCxHQUFlckYsRUFBL0I7QUFDQW1KLGNBQUVHLFFBQUYsQ0FBV2hILENBQVgsSUFBZ0I2RyxFQUFFaEIsUUFBRixDQUFXN0YsQ0FBWCxHQUFldEMsRUFBL0I7QUFDQW1KLGNBQUVHLFFBQUYsQ0FBV2hFLENBQVgsSUFBZ0I2RCxFQUFFaEIsUUFBRixDQUFXN0MsQ0FBWCxHQUFldEYsRUFBL0I7QUFDQW1KLGNBQUVSLFFBQUYsSUFBYzNJLEVBQWQ7O0FBRUEsZ0JBQUltSixFQUFFUixRQUFGLElBQWMsQ0FBZCxJQUFtQixDQUFDLEtBQUtzRSxRQUFMLENBQWM5RixNQUFkLENBQXFCbkgsRUFBckIsRUFBeUJtSixDQUF6QixFQUE0QjlCLElBQTVCLEVBQWtDa0ssV0FBbEMsQ0FBeEIsRUFBd0U7QUFDdkVwSSxrQkFBRVIsUUFBRixHQUFhLENBQWI7QUFDQTtBQUNEbkIsbUJBQU8vQyxDQUFQLElBQVkwRSxFQUFFUixRQUFkO0FBQ0F3SSxrQkFBTTFNLElBQUUsQ0FBUixJQUFhMEUsRUFBRUcsUUFBRixDQUFXakUsQ0FBeEI7QUFDQThMLGtCQUFNMU0sSUFBRSxDQUFGLEdBQUksQ0FBVixJQUFlMEUsRUFBRUcsUUFBRixDQUFXaEgsQ0FBMUI7QUFDQTZPLGtCQUFNMU0sSUFBRSxDQUFGLEdBQUksQ0FBVixJQUFlMEUsRUFBRUcsUUFBRixDQUFXaEUsQ0FBMUI7QUFDQTtBQUNEOztBQUVELFFBQUkyRCxZQUFZLEtBQUsrRCxPQUFMLENBQWFoRSxzQkFBYixDQUFvQ2hKLEVBQXBDLENBQWhCO0FBQ0EsU0FBS2tSLGNBQUwsQ0FBb0JsUixFQUFwQixFQUF3QmlKLFNBQXhCOztBQUVBLFNBQUtVLFFBQUwsQ0FBYzJFLFFBQWQsQ0FBdUI3TSxXQUF2QixHQUFxQyxJQUFyQztBQUNBLFNBQUtrSSxRQUFMLENBQWNuQyxNQUFkLENBQXFCL0YsV0FBckIsR0FBbUMsSUFBbkM7QUFDQSxTQUFLa0ksUUFBTCxDQUFjNkUsTUFBZCxDQUFxQi9NLFdBQXJCLEdBQW1DLElBQW5DO0FBQ0EsQ0FsQ0Q7O0FBcUNBc0wsZ0JBQWdCak4sU0FBaEIsQ0FBMEJDLE1BQTFCLEdBQW1DLFVBQVVDLEVBQVYsRUFDbkM7QUFDQyxTQUFLc1Isd0JBQUwsQ0FBOEJ0UixFQUE5QjtBQUNBLENBSEQ7O0FBTUErTSxnQkFBZ0JqTixTQUFoQixDQUEwQnlILE1BQTFCLEdBQW1DLFlBQ25DO0FBQ0MsUUFBSWQsT0FBTyxFQUFYO0FBQ0dBLFNBQUsyQixJQUFMLEdBQVksS0FBS0EsSUFBakI7QUFDQTNCLFNBQUtxSCxJQUFMLEdBQVksS0FBS0EsSUFBTCxDQUFVMUYsSUFBdEI7QUFDQSxRQUFJLEtBQUtsRSxJQUFMLElBQWEsS0FBSzRKLElBQUwsQ0FBVTVKLElBQTNCLEVBQWlDO0FBQzdCdUMsYUFBS3ZDLElBQUwsR0FBWSxLQUFLQSxJQUFMLElBQWEsS0FBSzRKLElBQUwsQ0FBVTVKLElBQW5DO0FBQ0g7QUFDSnVDLFNBQUtlLE1BQUwsR0FBYyxFQUFkO0FBQ0EsUUFBSSxLQUFLQSxNQUFULEVBQWlCO0FBQ2hCbkIsVUFBRUMsV0FBRixDQUFjRyxLQUFLZSxNQUFuQixFQUEyQixLQUFLQSxNQUFoQztBQUNBO0FBQ0RmLFNBQUtlLE1BQUwsQ0FBWXdGLE9BQVosR0FBc0IsS0FBS0EsT0FBTCxDQUFhekYsTUFBYixFQUF0QjtBQUNBZCxTQUFLZSxNQUFMLENBQVl5RixRQUFaLEdBQXVCLEtBQUtBLFFBQUwsQ0FBYzFGLE1BQWQsRUFBdkI7QUFDQSxXQUFPZCxJQUFQO0FBQ0EsQ0FmRDs7QUFrQkFzRyxnQkFBZ0JqTixTQUFoQixDQUEwQjBSLFdBQTFCLEdBQXdDLFVBQVV4RSxPQUFWLEVBQ3hDO0FBQ0ksU0FBS0EsT0FBTCxHQUFlLEtBQUt4RixNQUFMLENBQVl3RixPQUFaLEdBQXNCQSxPQUFyQztBQUNILENBSEQ7O0FBS0FELGdCQUFnQmpOLFNBQWhCLENBQTBCMlIsd0JBQTFCLEdBQXFELFVBQVVDLEdBQVYsRUFDckQ7QUFDQyxRQUFJQSxRQUFRLEtBQUtsSyxNQUFMLENBQVkyRixpQkFBeEIsRUFBMkM7QUFDMUMsYUFBSzNGLE1BQUwsQ0FBWTJGLGlCQUFaLEdBQWdDLEtBQUtBLGlCQUFMLEdBQXlCdUUsR0FBekQ7QUFDQSxhQUFLM1AsUUFBTCxDQUFjZ08sUUFBZCxDQUF1QixVQUF2QixFQUFtQ0UsS0FBbkMsR0FBMkN5QixHQUEzQztBQUNBO0FBQ0QsQ0FORDs7QUFRQTNFLGdCQUFnQmpOLFNBQWhCLENBQTBCNlIsdUJBQTFCLEdBQW9ELFVBQVVELEdBQVYsRUFDcEQ7QUFDQyxTQUFLMUUsT0FBTCxDQUFheEUsZUFBYixHQUErQmtKLEdBQS9CO0FBQ0EsQ0FIRDs7QUFLQTNFLGdCQUFnQmpOLFNBQWhCLENBQTBCOFIsa0JBQTFCLEdBQStDLFVBQVVuRSxLQUFWLEVBQy9DO0FBQ0MsUUFBSUEsVUFBVSxLQUFLWSxhQUFMLENBQW1CM0osTUFBakMsRUFBeUM7QUFDeEMsYUFBSzhDLE1BQUwsQ0FBWWlHLEtBQVosR0FBb0JBLEtBQXBCO0FBQ0EsYUFBS0ssSUFBTCxDQUFVbkUsUUFBVixHQUFxQixLQUFLb0Usd0JBQUwsQ0FBOEJOLEtBQTlCLENBQXJCO0FBQ0E7QUFDRCxDQU5EOztBQVFBVixnQkFBZ0JqTixTQUFoQixDQUEwQitSLFNBQTFCLEdBQXNDLFVBQVV2SyxLQUFWLEVBQ3RDO0FBQ0ksU0FBS0UsTUFBTCxDQUFZRixLQUFaLENBQWtCb0QsQ0FBbEIsR0FBc0JwRCxNQUFNb0QsQ0FBNUI7QUFDQSxTQUFLbEQsTUFBTCxDQUFZRixLQUFaLENBQWtCbUgsQ0FBbEIsR0FBc0JuSCxNQUFNbUgsQ0FBNUI7QUFDQSxTQUFLakgsTUFBTCxDQUFZRixLQUFaLENBQWtCb0gsQ0FBbEIsR0FBc0JwSCxNQUFNb0gsQ0FBNUI7QUFDSCxDQUxEOztBQU9BM0IsZ0JBQWdCak4sU0FBaEIsQ0FBMEJnUywwQkFBMUIsR0FBdUQsVUFBVS9ILE1BQVYsRUFDdkQ7QUFDSSxTQUFLK0QsSUFBTCxDQUFVakUsY0FBVixDQUF5QkUsTUFBekIsR0FBa0NBLE1BQWxDO0FBQ0gsQ0FIRDs7Ozs7Ozs7Ozs7Ozs7O0FDcGJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0MsU0FBU2dJLGdCQUFULEdBQ0Q7QUFDQyxTQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0csU0FBS0MsZUFBTCxHQUF1QixFQUF2QjtBQUNIOztBQUVENUwsRUFBRUMsV0FBRixDQUFjeUwsaUJBQWlCalMsU0FBL0IsRUFDSTtBQUNBNEcsaUJBQWFxTCxnQkFEYjtBQUVBRyxTQUFNLFVBQVVDLEVBQVYsRUFBYWpPLElBQWIsRUFDTjtBQUNJLFlBQUksQ0FBQyxLQUFLOE4sU0FBTCxDQUFlOU4sSUFBZixDQUFMLEVBQTJCO0FBQ3ZCLGlCQUFLOE4sU0FBTCxDQUFlOU4sSUFBZixJQUF1QmlPLEVBQXZCO0FBQ0EsaUJBQUtGLGVBQUwsQ0FBcUI1TixJQUFyQixDQUEwQjhOLEVBQTFCO0FBQ0g7QUFDSixLQVJEO0FBU0FDLHNCQUFtQixVQUFVbE8sSUFBVixFQUNuQjtBQUNJLFlBQUlpTyxLQUFLLEtBQUtILFNBQUwsQ0FBZTlOLElBQWYsQ0FBVDtBQUNBLFlBQUlPLElBQUksS0FBS3dOLGVBQUwsQ0FBcUJJLE9BQXJCLENBQTZCRixFQUE3QixDQUFSO0FBQ0EsWUFBSTFOLEtBQUssQ0FBVCxFQUFZO0FBQ1IsaUJBQUt3TixlQUFMLENBQXFCSyxNQUFyQixDQUE0QjdOLENBQTVCLEVBQStCLENBQS9CO0FBQ0g7QUFDRCxZQUFJME4sRUFBSixFQUFRO0FBQ0pBLGVBQUdqRSxPQUFIO0FBQ0EsbUJBQU8sS0FBSzhELFNBQUwsQ0FBZTlOLElBQWYsQ0FBUDtBQUNIO0FBQ0osS0FwQkQ7QUFxQkFxTyx3QkFBcUIsWUFDckI7QUFDSSxZQUFJQyxRQUFRLEVBQVo7QUFDQSxhQUFJLElBQUl6TCxHQUFSLElBQWUsS0FBS2lMLFNBQXBCLEVBQStCO0FBQzNCUSxrQkFBTW5PLElBQU4sQ0FBVzBDLEdBQVg7QUFDSDtBQUNELGVBQU95TCxLQUFQO0FBQ0gsS0E1QkQ7O0FBOEJBelMsWUFBUyxVQUFVQyxFQUFWLEVBQ1Q7QUFDSSxhQUFJLElBQUl5RSxJQUFJLENBQVosRUFBZUEsSUFBSSxLQUFLd04sZUFBTCxDQUFxQnZOLE1BQXhDLEVBQWdERCxHQUFoRCxFQUFxRDtBQUNqRCxpQkFBS3dOLGVBQUwsQ0FBcUJ4TixDQUFyQixFQUF3QjFFLE1BQXhCLENBQStCQyxFQUEvQjtBQUNIO0FBQ0osS0FuQ0Q7O0FBc0NBdUgsWUFBUyxZQUNUO0FBQ0ksWUFBSWtMLE1BQU0sRUFBVjs7QUFFQSxZQUFJaE0sSUFBSjtBQUNBLFlBQUkwQyxDQUFKO0FBQ0EsYUFBSSxJQUFJcEMsR0FBUixJQUFlLEtBQUtpTCxTQUFwQixFQUE4QjtBQUMxQjdJLGdCQUFJLEtBQUs2SSxTQUFMLENBQWVqTCxHQUFmLENBQUo7QUFDQSxnQkFBSW9DLEVBQUVmLElBQU4sRUFBWTtBQUNSM0IsdUJBQU8wQyxFQUFFNUIsTUFBRixFQUFQO0FBQ0FrTCxvQkFBSXBPLElBQUosQ0FBU29DLElBQVQ7QUFDSDtBQUNKOztBQUVELGVBQU9nTSxHQUFQO0FBQ0gsS0FyREQ7O0FBdURBQyxvQkFBaUIsVUFBVWxMLE1BQVYsRUFDakI7QUFDSSxZQUFJQSxPQUFPd0YsT0FBWCxFQUFvQjtBQUNoQixnQkFBSUEsVUFBVSwrREFBQXZOLENBQU9xRyxTQUFQLENBQWlCMEIsT0FBT3dGLE9BQVAsQ0FBZTlJLElBQWhDLENBQWQ7QUFDQSxnQkFBSThJLE9BQUosRUFBYTtBQUNUQSwwQkFBVSxJQUFJQSxPQUFKLEVBQVY7QUFDSCxhQUZELE1BRU87QUFDSEEsMEJBQVUsSUFBSSw4RUFBSixFQUFWO0FBQ0g7QUFDREEsb0JBQVFwRyxLQUFSLENBQWNZLE9BQU93RixPQUFQLENBQWV4RixNQUE3QjtBQUNBLG1CQUFPd0YsT0FBUDtBQUNIO0FBQ0QsZUFBT25HLFNBQVA7QUFDSCxLQXBFRDs7QUFzRUE4TCxxQkFBa0IsVUFBVW5MLE1BQVYsRUFDbEI7QUFDSSxZQUFJQSxPQUFPeUYsUUFBWCxFQUFxQjtBQUNqQixnQkFBSUEsV0FBVywrREFBQXhOLENBQU9xRyxTQUFQLENBQWlCMEIsT0FBT3lGLFFBQVAsQ0FBZ0IvSSxJQUFqQyxDQUFmO0FBQ0EsZ0JBQUkrSSxRQUFKLEVBQWM7QUFDVkEsMkJBQVcsSUFBSUEsUUFBSixFQUFYO0FBQ0gsYUFGRCxNQUVPO0FBQ0hBLDJCQUFXLElBQUksZ0ZBQUosRUFBWDtBQUNIO0FBQ0RBLHFCQUFTckcsS0FBVCxDQUFlWSxPQUFPeUYsUUFBUCxDQUFnQnpGLE1BQS9CO0FBQ0EsbUJBQU95RixRQUFQO0FBQ0g7QUFDRCxlQUFPcEcsU0FBUDtBQUNILEtBbkZEOztBQXFGQStMLGNBQVUsVUFBVW5MLElBQVYsRUFBZ0I1RCxRQUFoQixFQUEwQkgsSUFBMUIsRUFBZ0NRLElBQWhDLEVBQ1Y7QUFDSSxZQUFJLEtBQUs4TixTQUFMLENBQWU5TixJQUFmLENBQUosRUFBMEI7QUFDdEIwQixvQkFBUUMsR0FBUixDQUFZLHlFQUFaLEVBQXVGM0IsSUFBdkY7QUFDSDs7QUFFRCxZQUNBO0FBQ0ksZ0JBQUl1QyxPQUFPb00sS0FBS2pNLEtBQUwsQ0FBV2EsSUFBWCxDQUFYO0FBQ0gsU0FIRCxDQUlBLE9BQU9xTCxDQUFQLEVBQ0E7QUFDSWxOLG9CQUFRQyxHQUFSLENBQVksd0JBQVosRUFBc0MzQixJQUF0QyxFQUE0Q3VELElBQTVDO0FBQ0Esa0JBQU1xTCxDQUFOO0FBQ0g7O0FBRUQsZUFBTyxLQUFLbE0sS0FBTCxDQUFXSCxJQUFYLEVBQWlCL0MsSUFBakIsRUFBdUJRLElBQXZCLENBQVA7QUFDSCxLQXRHRDs7QUF5R0EwQyxXQUFPLFVBQVVILElBQVYsRUFBZ0IvQyxJQUFoQixFQUFzQlEsSUFBdEIsRUFDUDtBQUNJLFlBQUk4SSxVQUFVLEtBQUswRixjQUFMLENBQW9Cak0sS0FBS2UsTUFBekIsQ0FBZDtBQUNBLFlBQUl5RixXQUFXLEtBQUswRixlQUFMLENBQXFCbE0sS0FBS2UsTUFBMUIsQ0FBZjtBQUNBZixhQUFLZSxNQUFMLENBQVl3RixPQUFaLEdBQXNCQSxPQUF0QjtBQUNBdkcsYUFBS2UsTUFBTCxDQUFZeUYsUUFBWixHQUF1QkEsUUFBdkI7O0FBRUEsWUFBSWtGLEtBQUssSUFBSSxzRUFBSixDQUFvQjFMLEtBQUtlLE1BQXpCLENBQVQ7QUFDQTJLLFdBQUdsRSxRQUFILENBQVl4SCxLQUFLdkMsSUFBakI7O0FBRUk7QUFDSixZQUFJdUMsS0FBS2UsTUFBTCxDQUFZeEIsTUFBaEIsRUFBd0I7QUFDcEIsZ0JBQUlBLFNBQVN0QyxLQUFLcVAsZUFBTCxDQUFxQnRNLEtBQUtlLE1BQUwsQ0FBWXhCLE1BQWpDLENBQWI7QUFDQTtBQUNBQSxtQkFBT2tNLEdBQVAsQ0FBV0MsR0FBR3JFLElBQWQ7QUFDSCxTQUpELE1BSU87QUFDSnBLLGlCQUFLd08sR0FBTCxDQUFTQyxHQUFHckUsSUFBWjtBQUNGOztBQUVEO0FBQ0E7QUFDQSxhQUFLb0UsR0FBTCxDQUFTQyxFQUFULEVBQWFqTyxJQUFiO0FBQ0EsZUFBT2lPLEVBQVA7QUFDSCxLQWhJRDs7QUFrSUFhLG9CQUFpQixVQUFVdkwsSUFBVixFQUFnQi9ELElBQWhCLEVBQ2pCO0FBQ0ksWUFBSXNPLFlBQVl2SyxLQUFLdUssU0FBckI7QUFDQSxhQUFJLElBQUl2TixJQUFHLENBQVgsRUFBY0EsSUFBSXVOLFVBQVV0TixNQUE1QixFQUFvQ0QsR0FBcEMsRUFDQTtBQUNJLGdCQUFJMEUsSUFBSTZJLFVBQVV2TixDQUFWLENBQVI7QUFDQSxnQkFBSTBOLEtBQUssS0FBS3ZMLEtBQUwsQ0FBV3VDLENBQVgsRUFBY3pGLElBQWQsRUFBb0J5RixFQUFFakYsSUFBdEIsQ0FBVDtBQUNBaU8sZUFBR3JFLElBQUgsQ0FBUTFGLElBQVIsR0FBZWUsRUFBRTJFLElBQWpCO0FBQ0FxRSxlQUFHckUsSUFBSCxDQUFRNUosSUFBUixHQUFlaUYsRUFBRWpGLElBQWpCO0FBQ0EsZ0JBQUlFLE1BQU1WLEtBQUt1UCxtQkFBTCxDQUF5QixNQUF6QixFQUFpQzlKLEVBQUUyRSxJQUFuQyxDQUFWO0FBQ0EsZ0JBQUkxSixHQUFKLEVBQVM7QUFDTCtOLG1CQUFHckUsSUFBSCxDQUFRb0Ysd0JBQVIsQ0FBaUM5TyxHQUFqQztBQUNIO0FBQ0o7QUFDSixLQWhKRDs7QUFrSkErTyxpQkFBYyxZQUNkO0FBQ0ksWUFBSUMsU0FBUyxLQUFLbkIsZUFBTCxDQUFxQnZOLE1BQXJCLEdBQThCLENBQTNDO0FBQ0EsWUFBSTJPLGFBQWEsa0JBQWpCO0FBQ0EsWUFBSUMsVUFBVSxJQUFkO0FBQ0EsZUFBT0EsT0FBUCxFQUFnQjtBQUNacFAsbUJBQU9tUCxhQUFhRCxNQUFwQjtBQUNBLGdCQUFJLEtBQUtwQixTQUFMLENBQWU5TixJQUFmLE1BQXlCMkMsU0FBN0IsRUFBd0M7QUFDcEN1TTtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPbFAsSUFBUDtBQUNIO0FBQ0o7QUFDSixLQS9KRDs7QUFpS0FxUCxnQkFBYSxZQUNiO0FBQ0ksWUFBSXJQLE9BQU8sS0FBS2lQLFdBQUwsRUFBWDs7QUFFQSxZQUFJM0wsU0FBUyxFQUFiO0FBQ0EsWUFBSTJLLEtBQUssSUFBSSwrREFBQTFTLENBQU9zTixlQUFYLENBQTJCdkYsTUFBM0IsQ0FBVDtBQUNBMkssV0FBR2xFLFFBQUgsQ0FBWS9KLElBQVo7QUFDQSxhQUFLZ08sR0FBTCxDQUFTQyxFQUFULEVBQWFqTyxJQUFiO0FBQ0EsZUFBT2lPLEVBQVA7QUFDSDtBQTFLRCxDQURKOztBQStLQSxJQUFJLCtEQUFBMVMsQ0FBTytULGdCQUFQLEtBQTRCM00sU0FBaEMsRUFDQTtBQUNJcEgsSUFBQSwrREFBQUEsQ0FBTytULGdCQUFQLEdBQTBCLElBQUl6QixnQkFBSixFQUExQjtBQUNIOztBQUVELCtEQUFBdFMsQ0FBT2dVLGdCQUFQLEdBQTBCO0FBQzFCLGdCQUFZO0FBRGMsQ0FBMUI7Ozs7Ozs7OztBQ2pNQTtBQUFBLElBQUlDLG1CQUFtQixFQUF2Qjs7QUFHQUEsaUJBQWlCQyxnQkFBakIsR0FBb0MsWUFDcEMsQ0FDQyxDQUZEOztBQUlBRCxpQkFBaUJDLGdCQUFqQixDQUFrQzdULFNBQWxDLENBQTRDOFQsYUFBNUMsR0FBNEQsVUFBVXpILE1BQVYsRUFDNUQ7QUFDQ0EsUUFBTzlHLENBQVAsR0FBVzlDLEtBQUt1RyxNQUFMLEVBQVg7QUFDQXFELFFBQU83SixDQUFQLEdBQVdDLEtBQUt1RyxNQUFMLEVBQVg7QUFDQXFELFFBQU83RyxDQUFQLEdBQVcvQyxLQUFLdUcsTUFBTCxFQUFYO0FBQ0EsQ0FMRDs7QUFPQTRLLGlCQUFpQjVKLE1BQWpCLEdBQTBCLFVBQVVDLE1BQVYsRUFDMUI7QUFDQyxNQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxDQUhEOztBQUtBMkosaUJBQWlCNUosTUFBakIsQ0FBd0JoSyxTQUF4QixDQUFrQytULGVBQWxDLEdBQW9ELFVBQVUxSCxNQUFWLEVBQ3BEO0FBQ0MsS0FBSTJILFFBQVF2UixLQUFLdUcsTUFBTCxLQUFnQnZHLEtBQUtDLEVBQXJCLEdBQTBCLENBQXRDO0FBQ0EsS0FBSXVSLE9BQU94UixLQUFLdUcsTUFBTCxLQUFnQnZHLEtBQUtDLEVBQWhDO0FBQ0EySixRQUFPOUcsQ0FBUCxHQUFXOUMsS0FBS3lSLEdBQUwsQ0FBU0YsS0FBVCxJQUFrQnZSLEtBQUswUixHQUFMLENBQVNGLElBQVQsQ0FBN0I7QUFDQTVILFFBQU83SixDQUFQLEdBQVdDLEtBQUt5UixHQUFMLENBQVNELElBQVQsQ0FBWDtBQUNBNUgsUUFBTzdHLENBQVAsR0FBVy9DLEtBQUswUixHQUFMLENBQVNILEtBQVQsSUFBa0J2UixLQUFLMFIsR0FBTCxDQUFTRixJQUFULENBQTdCO0FBQ0EsQ0FQRDs7QUFTQUwsaUJBQWlCNUosTUFBakIsQ0FBd0JoSyxTQUF4QixDQUFrQ29VLFVBQWxDLEdBQStDLFVBQVUvSCxNQUFWLEVBQy9DO0FBQ0NBLFFBQU85RyxDQUFQLEdBQVc5QyxLQUFLdUcsTUFBTCxLQUFnQixDQUFoQixHQUFvQixDQUEvQjtBQUNBcUQsUUFBTzdKLENBQVAsR0FBV0MsS0FBS3VHLE1BQUwsS0FBZ0IsQ0FBaEIsR0FBb0IsQ0FBL0I7QUFDQXFELFFBQU83RyxDQUFQLEdBQVcvQyxLQUFLdUcsTUFBTCxLQUFnQixDQUFoQixHQUFvQixDQUEvQjtBQUNBcUQsUUFBT0ssU0FBUDtBQUNBLENBTkQ7O0FBUUFrSCxpQkFBaUI1SixNQUFqQixDQUF3QmhLLFNBQXhCLENBQWtDcVUsU0FBbEMsR0FBOEMsVUFBVWhJLE1BQVYsRUFDOUM7QUFDQyxNQUFLK0gsVUFBTCxDQUFnQi9ILE1BQWhCO0FBQ0FBLFFBQU9pSSxjQUFQLENBQXNCLEtBQUtySyxNQUEzQjtBQUNBLENBSkQ7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBO0FBQ0E7QUFDQTs7QUFHQSxTQUFTc0ssV0FBVCxDQUFzQkMsTUFBdEIsRUFDQTs7QUFFSSxTQUFLQyxnQkFBTCxDQUFzQixnQkFBdEI7O0FBRUEsU0FBS0MsV0FBTDtBQUNBLFNBQUtDLHFCQUFMOztBQUVILFNBQUtDLGlCQUFMLEdBQXlCLEVBQXpCOztBQUVHbkosSUFBQSwwRUFBQUEsQ0FBZXRILGtCQUFmLENBQWtDLFNBQWxDLEVBQTZDLFVBQVVHLEdBQVYsRUFBZTtBQUN4RCxhQUFLdVEsc0JBQUwsQ0FBNEJ2USxHQUE1QjtBQUNILEtBRkQsRUFFRyxJQUZIO0FBR0g7O0FBRURpUSxZQUFZdlUsU0FBWixDQUFzQjhVLEtBQXRCLEdBQThCLFVBQVVOLE1BQVYsRUFDOUI7QUFDSTFPLFlBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQUNELFNBQUtnUCxrQkFBTCxDQUF3QlAsTUFBeEI7QUFDRixDQUpEOztBQU1BRCxZQUFZdlUsU0FBWixDQUFzQnlVLGdCQUF0QixHQUF5QyxVQUFVclEsSUFBVixFQUFnQndILEtBQWhCLEVBQ3pDO0FBQ0ksUUFBSSxLQUFLeEgsSUFBTCxDQUFKLEVBQWdCO0FBQ1osZUFBTyxLQUFLQSxJQUFMLEVBQVd3SCxLQUFYLENBQVA7QUFDSDtBQUNELFdBQU8sS0FBUDtBQUNILENBTkQ7O0FBU0EySSxZQUFZdlUsU0FBWixDQUFzQjBVLFdBQXRCLEdBQW9DLFlBQ3BDO0FBQ0MsU0FBS00sS0FBTCxHQUFhLElBQUk3VCxNQUFNOFQsS0FBVixFQUFiO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLEVBQXhCO0FBQ0EsQ0FMRDs7QUFRQSxJQUFJcFEsZUFBZTtBQUNsQixVQUFTaEIsUUFBVCxFQUFrQjtBQUNqQmlCLFdBQU9DLFVBQVAsQ0FBa0JsQixRQUFsQixFQUE0QixPQUFPLEVBQW5DO0FBQ0EsQ0FIRjs7QUFPQXdRLFlBQVl2VSxTQUFaLENBQXNCMlUscUJBQXRCLEdBQThDLFlBQzlDO0FBQ0ksUUFBSVMsT0FBTyxJQUFYO0FBQ0gsU0FBS2hRLEdBQUwsR0FBVyxZQUNYO0FBQ0NMLHFCQUFhLFlBQ2I7QUFDQ3FRLGlCQUFLL1AsSUFBTDtBQUNTO0FBQ1QsU0FKRDtBQUtBLEtBUEQ7O0FBU0c7O0FBRUE7QUFDSCxDQWZEOztBQWtCQWtQLFlBQVl2VSxTQUFaLENBQXNCcVYseUJBQXRCLEdBQWtELFlBQ2xEO0FBQ0ksV0FBTztBQUNILHVCQUFlLFFBRFo7QUFFSCx5QkFBaUI7QUFDYixrQ0FBc0IsSUFEVDtBQUViLHFCQUFTO0FBRkksU0FGZDtBQU1ILG9CQUFZO0FBQ1IscUJBQVMsR0FERDtBQUVSLHNCQUFVO0FBRkYsU0FOVDtBQVVGLHVCQUFlLFFBVmI7QUFXSCx1QkFBZTtBQUNYLG1CQUFPLEVBREk7QUFFWCxvQkFBUSxHQUZHO0FBR1gsbUJBQU8sSUFISTtBQUlYLDRCQUFnQixrQkFKTDtBQUtYLHdCQUFZO0FBQ1IscUJBQUssQ0FERztBQUVSLHFCQUFLLENBRkc7QUFHUixxQkFBSztBQUhHO0FBTEQ7QUFYWixLQUFQO0FBdUJILENBekJEOztBQTJCQWQsWUFBWXZVLFNBQVosQ0FBc0JzVixjQUF0QixHQUF1QyxVQUFVM04sSUFBVixFQUN2QztBQUNJLFFBQUksS0FBSzROLFVBQUwsSUFBbUIsS0FBS2pTLFFBQTVCLEVBQXNDO0FBQ2xDa1MsY0FBTSxrREFBTjtBQUNIO0FBQ0QsUUFBSSxDQUFDLEtBQUtELFVBQVYsRUFBc0I7QUFDbEIsYUFBS0EsVUFBTCxHQUFrQjdVLFNBQVMrVSxjQUFULENBQXdCOU4sS0FBSytOLFdBQTdCLENBQWxCO0FBQ0g7QUFDRCxRQUFJLENBQUMsS0FBS3BTLFFBQVYsRUFBb0I7QUFDaEIsYUFBS0EsUUFBTCxHQUFnQixJQUFJbkMsTUFBTXdVLGFBQVYsQ0FBd0JoTyxLQUFLaU8sYUFBN0IsQ0FBaEI7QUFDSDtBQUNELFFBQUksQ0FBQyxDQUFDLENBQUMsS0FBS0wsVUFBUixJQUFzQixPQUFPLEtBQUtBLFVBQVosS0FBMkIsV0FBckQsRUFBa0U7QUFDOUR6UCxnQkFBUWtLLEtBQVIsQ0FBYyw2RUFBNkVySSxLQUFLK04sV0FBaEc7QUFDSDtBQUNEO0FBQ0EsU0FBS0gsVUFBTCxDQUFnQk0sV0FBaEIsQ0FBNEIsS0FBS3ZTLFFBQUwsQ0FBY3dTLFVBQTFDO0FBQ0EsU0FBS3JWLE1BQUwsR0FBYyxLQUFLNkMsUUFBTCxDQUFjd1MsVUFBNUI7O0FBR0EsU0FBS3hTLFFBQUwsQ0FBY3lTLE9BQWQsQ0FBc0JwTyxLQUFLcU8sUUFBTCxDQUFjNVYsS0FBcEMsRUFBMkN1SCxLQUFLcU8sUUFBTCxDQUFjM1YsTUFBekQ7QUFDQSxTQUFLNFYsWUFBTCxDQUFrQnRPLEtBQUtxTyxRQUFMLENBQWM1VixLQUFoQyxFQUF1Q3VILEtBQUtxTyxRQUFMLENBQWMzVixNQUFyRDtBQUNBLFNBQUtpRCxRQUFMLENBQWM0UyxhQUFkLENBQTRCdk8sS0FBS3dPLFdBQWpDOztBQUVBLFNBQUsxQixnQkFBTCxDQUFzQixnQkFBdEI7QUFDSCxDQXhCRDs7QUEwQkFGLFlBQVl2VSxTQUFaLENBQXNCb1csa0JBQXRCLEdBQTJDLFVBQVV6TyxJQUFWLEVBQzNDO0FBQ0ksUUFBSWlFLFFBQVEsRUFBQ3lLLFNBQVMsS0FBVixFQUFaO0FBQ0EsU0FBSzVCLGdCQUFMLENBQXNCLDBCQUF0QixFQUFrRDdJLEtBQWxEO0FBQ0E7Ozs7O0FBS0EsUUFBSSxDQUFDLEtBQUswSyxVQUFWLEVBQXNCO0FBQ2xCLGFBQUtBLFVBQUwsR0FBa0IsSUFBSW5WLE1BQU1vVixLQUFWLEVBQWxCO0FBQ0g7O0FBRUQsUUFBSXJULFNBQVN5RSxLQUFLNk8sV0FBbEI7QUFDQSxRQUFJLENBQUMsS0FBS0EsV0FBVixFQUF1QjtBQUNuQixhQUFLQSxXQUFMLEdBQW1CLElBQUlyVixNQUFNZ0MsaUJBQVYsQ0FBNEJELE9BQU91VCxHQUFuQyxFQUF3Q3ZULE9BQU93VCxZQUEvQyxFQUE2RHhULE9BQU95VCxJQUFwRSxFQUEwRXpULE9BQU8wVCxHQUFqRixDQUFuQjtBQUNBLGFBQUtOLFVBQUwsQ0FBZ0JsRSxHQUFoQixDQUFvQixLQUFLb0UsV0FBekI7QUFDQSxhQUFLQSxXQUFMLENBQWlCcFMsSUFBakIsR0FBd0IsYUFBeEI7QUFDSCxLQUpELE1BSU87QUFDSCxhQUFLb1MsV0FBTCxDQUFpQkMsR0FBakIsR0FBdUJ2VCxPQUFPdVQsR0FBOUI7QUFDQSxhQUFLRCxXQUFMLENBQWlCRyxJQUFqQixHQUF3QnpULE9BQU95VCxJQUEvQjtBQUNBLGFBQUtILFdBQUwsQ0FBaUJJLEdBQWpCLEdBQXVCMVQsT0FBTzBULEdBQTlCO0FBQ0EsYUFBS0osV0FBTCxDQUFpQkssTUFBakIsR0FBMEIzVCxPQUFPd1QsWUFBakM7QUFDQSxhQUFLRixXQUFMLENBQWlCTSxzQkFBakI7QUFDSDs7QUFFRCxTQUFLTixXQUFMLENBQWlCaE4sUUFBakIsQ0FBMEJDLEdBQTFCLENBQThCdkcsT0FBT3NHLFFBQVAsQ0FBZ0JqRSxDQUE5QyxFQUFpRHJDLE9BQU9zRyxRQUFQLENBQWdCaEgsQ0FBakUsRUFBb0VVLE9BQU9zRyxRQUFQLENBQWdCaEUsQ0FBcEY7QUFDSCxDQTNCRDs7QUE2QkErTyxZQUFZdlUsU0FBWixDQUFzQitXLG1CQUF0QixHQUE0QyxVQUFVcFAsSUFBVixFQUM1QztBQUNJLFNBQUtxUCxhQUFMLEdBQXFCclAsSUFBckI7QUFDQSxTQUFLMk4sY0FBTCxDQUFvQjNOLElBQXBCO0FBQ0EsU0FBS3lPLGtCQUFMLENBQXdCek8sSUFBeEI7QUFDQSxTQUFLOE0sZ0JBQUwsQ0FBc0IsU0FBdEI7QUFDSCxDQU5EOztBQVFBRixZQUFZdlUsU0FBWixDQUFzQmlYLGtCQUF0QixHQUEyQyxVQUFVQyxHQUFWLEVBQzNDO0FBQ0ksUUFBSUMsTUFBTSxJQUFJaFcsTUFBTWlXLFNBQVYsRUFBVjs7QUFFQSxRQUFJaEMsT0FBTyxJQUFYOztBQUVBLFFBQUlaLFNBQVNZLEtBQUtDLHlCQUFMLEVBQWI7O0FBRUEsUUFBSWdDLDJCQUEyQixLQUEvQjs7QUFFQSxhQUFTQyxNQUFULENBQWlCM1EsSUFBakIsRUFBdUI7QUFDbkJiLGdCQUFRQyxHQUFSLENBQVkscUNBQXFDbVIsR0FBckMsR0FBMkMsSUFBdkQ7QUFDQSxZQUFJNVMsTUFBTXlPLEtBQUtqTSxLQUFMLENBQVdILElBQVgsQ0FBVjtBQUNBO0FBQ0E7QUFDQUosVUFBRUMsV0FBRixDQUFjZ08sTUFBZCxFQUFzQmxRLEdBQXRCO0FBQ0E4USxhQUFLMkIsbUJBQUwsQ0FBeUJ2QyxNQUF6QjtBQUNBMU8sZ0JBQVFDLEdBQVIsQ0FBWXNSLHdCQUFaLEVBQXNDLFFBQXRDO0FBQ0FBLG1DQUEyQixJQUEzQjtBQUNIO0FBQ0QsYUFBU0UsUUFBVCxHQUFvQixDQUFFO0FBQ3RCLGFBQVN2SCxLQUFULENBQWVwRSxLQUFmLEVBQXNCO0FBQ2xCOUYsZ0JBQVFrSyxLQUFSLENBQWMsMEJBQWQsRUFBMENwRSxNQUFNaEosTUFBTixDQUFhNFUsTUFBdkQ7QUFDQTFSLGdCQUFRQyxHQUFSLENBQVksK0JBQVo7QUFDQUQsZ0JBQVFDLEdBQVIsQ0FBWXNSLHdCQUFaLEVBQXNDLE9BQXRDO0FBQ0FBLG1DQUEyQixJQUEzQjtBQUNBakMsYUFBSzJCLG1CQUFMLENBQXlCdkMsTUFBekI7QUFDSDtBQUNEMkMsUUFBSU0sSUFBSixDQUFTUCxHQUFULEVBQWNJLE1BQWQsRUFBc0JDLFFBQXRCLEVBQWdDdkgsS0FBaEM7QUFDSCxDQTdCRDs7QUFnQ0F1RSxZQUFZdlUsU0FBWixDQUFzQitVLGtCQUF0QixHQUEyQyxVQUFVUCxNQUFWLEVBQzNDO0FBQ0ksUUFBSWtELGlCQUFpQixLQUFLckMseUJBQUwsRUFBckI7O0FBRUE7QUFDQSxRQUFJLE9BQU9iLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7QUFDNUIxTyxnQkFBUUMsR0FBUixDQUFZLG1DQUFtQ3lPLE1BQS9DO0FBQ0EsYUFBS3lDLGtCQUFMLENBQXdCekMsTUFBeEI7O0FBRUE7QUFDSCxLQUxELE1BS08sSUFBSSxPQUFPQSxNQUFQLEtBQWtCLFFBQXRCLEVBQWdDO0FBQ25DMU8sZ0JBQVFDLEdBQVIsQ0FBWSxvQ0FBWjtBQUNBUSxVQUFFQyxXQUFGLENBQWNrUixjQUFkLEVBQTZCbEQsTUFBN0I7QUFDQSxhQUFLdUMsbUJBQUwsQ0FBeUJXLGNBQXpCO0FBQ0o7QUFDQyxLQUxNLE1BS0E7QUFDSDVSLGdCQUFRQyxHQUFSLENBQVksOENBQVo7QUFDRCxhQUFLZ1IsbUJBQUwsQ0FBeUJXLGNBQXpCO0FBQ0Y7QUFDSixDQW5CRDs7QUFxQkFuRCxZQUFZb0QsTUFBWixHQUFxQixVQUFVQyxPQUFWLEVBQW1CQyxVQUFuQixFQUNyQjs7QUFFSSxRQUFJQyxLQUFKO0FBQ0EsUUFBSSxPQUFPRCxVQUFQLEtBQXNCLFdBQTFCLEVBQXVDO0FBQ25DQyxnQkFBUSxZQUNSO0FBQ0l2RCx3QkFBWXdELEtBQVosQ0FBa0IsSUFBbEIsRUFBd0JDLFNBQXhCO0FBQ0gsU0FIRDtBQUlILEtBTEQsTUFLTztBQUNIRixnQkFBUUQsVUFBUjtBQUNIOztBQUVEO0FBQ0hDLFVBQU05WCxTQUFOLEdBQWtCcUcsT0FBT0MsTUFBUCxDQUFjaU8sWUFBWXZVLFNBQTFCLENBQWxCO0FBQ0c7QUFDSHVHLE1BQUVDLFdBQUYsQ0FBY3NSLE1BQU05WCxTQUFwQixFQUErQjRYLE9BQS9CO0FBQ0dFLFVBQU05WCxTQUFOLENBQWdCNEcsV0FBaEIsR0FBOEJrUixLQUE5Qjs7QUFFQSxXQUFPQSxLQUFQO0FBQ0gsQ0FwQkQ7O0FBc0JBdkQsWUFBWTBELFlBQVosR0FBMkIsVUFBVUMsS0FBVixFQUFpQk4sT0FBakIsRUFDM0I7QUFDQyxRQUFJdFQsTUFBTStCLE9BQU9DLE1BQVAsQ0FBYzRSLEtBQWQsQ0FBVjtBQUNBM1IsTUFBRUMsV0FBRixDQUFjbEMsR0FBZCxFQUFtQnNULE9BQW5CO0FBQ0FyRCxnQkFBWXpQLElBQVosQ0FBaUJSLEdBQWpCO0FBQ0EsV0FBT0EsR0FBUDtBQUNBLENBTkQ7O0FBU0FpUSxZQUFZdlUsU0FBWixDQUFzQnFGLElBQXRCLEdBQTZCLFlBQzdCO0FBQ0MsUUFBSThTLFFBQVEsS0FBS25ELEtBQUwsQ0FBV29ELFFBQVgsRUFBWjtBQUNBO0FBQ0EsUUFBSUQsUUFBUSxHQUFaLEVBQWlCO0FBQ2hCQSxnQkFBUSxHQUFSO0FBQ0E7QUFDRCxTQUFLakQsVUFBTCxHQUFrQmlELEtBQWxCO0FBQ0EsU0FBS2xZLE1BQUwsQ0FBWWtZLEtBQVo7QUFDQSxTQUFLL1UsTUFBTCxDQUFZK1UsS0FBWjtBQUNBLFNBQUsvUyxHQUFMO0FBQ0c7QUFDSCxDQVpEOztBQWdCQW1QLFlBQVl2VSxTQUFaLENBQXNCcVksbUJBQXRCLEdBQTRDLFVBQVUvVCxHQUFWLEVBQzVDO0FBQ0M7QUFDQSxTQUFLNlEsZ0JBQUwsQ0FBc0I1USxJQUF0QixDQUEyQkQsR0FBM0I7QUFDQSxDQUpEOztBQU1BaVEsWUFBWXZVLFNBQVosQ0FBc0I2VSxzQkFBdEIsR0FBK0MsVUFBVXZRLEdBQVYsRUFDL0M7QUFDQyxTQUFJLElBQUlLLElBQUksQ0FBWixFQUFlQSxJQUFJLEtBQUt3USxnQkFBTCxDQUFzQnZRLE1BQXpDLEVBQWlERCxHQUFqRCxFQUFzRDtBQUNyRCxZQUFJLEtBQUt3USxnQkFBTCxDQUFzQnhRLENBQXRCLE1BQTZCTCxHQUFqQyxFQUFzQztBQUNyQyxpQkFBSzZRLGdCQUFMLENBQXNCM0MsTUFBdEIsQ0FBNkI3TixDQUE3QixFQUFnQyxDQUFoQztBQUNBO0FBQ0E7QUFDRDtBQUNELENBUkQ7O0FBVUE0UCxZQUFZdlUsU0FBWixDQUFzQnNZLFVBQXRCLEdBQW1DLFVBQVVILEtBQVYsRUFDbkM7QUFDQyxRQUFJN1QsR0FBSjtBQUNBLFNBQUksSUFBSUssSUFBSSxDQUFSLEVBQVc0VCxNQUFNLEtBQUtwRCxnQkFBTCxDQUFzQnZRLE1BQTNDLEVBQW1ERCxJQUFJNFQsR0FBdkQsRUFBNEQ1VCxHQUE1RCxFQUFpRTtBQUNoRUwsY0FBTSxLQUFLNlEsZ0JBQUwsQ0FBc0J4USxDQUF0QixDQUFOO0FBQ0EsWUFBSUwsSUFBSSxRQUFKLENBQUosRUFBbUI7QUFDbEJBLGdCQUFJckUsTUFBSixDQUFXa1ksS0FBWDtBQUNBO0FBQ0Q7QUFDRCxDQVREOztBQVdBNUQsWUFBWXZVLFNBQVosQ0FBc0JDLE1BQXRCLEdBQStCLFVBQVVrWSxLQUFWLEVBQy9CO0FBQ0MsU0FBS0csVUFBTCxDQUFnQkgsS0FBaEI7QUFDR3hZLElBQUEsK0RBQUFBLENBQU8rVCxnQkFBUCxDQUF3QnpULE1BQXhCLENBQStCa1ksS0FBL0I7QUFDSCxDQUpEOztBQU9BNUQsWUFBWXZVLFNBQVosQ0FBc0J3WSwwQkFBdEIsR0FBbUQsWUFDbkQ7QUFDQyxRQUFJLEtBQUsscUJBQUwsQ0FBSixFQUFpQztBQUNoQztBQUNBO0FBQ0QsUUFBSXBELE9BQU8sSUFBWDtBQUNBLFNBQUtxRCxtQkFBTCxHQUEyQixJQUEzQjtBQUNBLGFBQVNBLG1CQUFULENBQTZCN00sS0FBN0IsRUFBb0M7QUFDbkMsWUFBSVMsU0FBUyxxRkFBQVgsQ0FBa0JDLHNCQUFsQixDQUF5Q3lKLEtBQUtHLFVBQTlDLEVBQTBEM0osS0FBMUQsQ0FBYjtBQUNBd0osYUFBS3NELDZCQUFMLENBQW1Dck0sTUFBbkM7QUFDQTtBQUNEM0wsYUFBU2lZLGdCQUFULENBQTBCLFdBQTFCLEVBQXVDRixtQkFBdkM7QUFDQSxDQVpEOztBQWNBbEUsWUFBWXZVLFNBQVosQ0FBc0IwWSw2QkFBdEIsR0FBc0QsVUFBU3JNLE1BQVQsRUFDdEQ7QUFDQ0EsV0FBT0MsU0FBUCxDQUFpQixLQUFLa0ssV0FBdEI7QUFDQSxRQUFJM0wsTUFBTSxJQUFJMUosTUFBTXNMLFNBQVYsQ0FBcUIsS0FBSytKLFdBQUwsQ0FBaUJoTixRQUF0QyxFQUFnRDZDLE9BQU9qQixHQUFQLENBQVksS0FBS29MLFdBQUwsQ0FBaUJoTixRQUE3QixFQUF3Q2tELFNBQXhDLEVBQWhELENBQVY7QUFDQSxRQUFJcEksR0FBSjtBQUNBLFNBQUksSUFBSUssSUFBRyxDQUFQLEVBQVU0VCxNQUFNLEtBQUszRCxpQkFBTCxDQUF1QmhRLE1BQTNDLEVBQW1ERCxJQUFJNFQsR0FBdkQsRUFBNEQ1VCxHQUE1RCxFQUFnRTtBQUMvREwsY0FBTSxLQUFLc1EsaUJBQUwsQ0FBdUJqUSxDQUF2QixDQUFOO0FBQ0EsWUFBSUwsSUFBSVQsSUFBUixFQUFjO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsZ0JBQUkyRyxhQUFhSyxJQUFJK0IsZ0JBQUosQ0FBc0IsQ0FBQ3RJLElBQUlWLElBQUwsQ0FBdEIsRUFBa0MsSUFBbEMsQ0FBakI7QUFDQVUsZ0JBQUlQLFFBQUosQ0FBYXlHLFVBQWI7QUFDQTtBQUNEO0FBQ0QsQ0FmRDs7QUFpQkErSixZQUFZdlUsU0FBWixDQUFzQjRZLG9CQUF0QixHQUE2QyxVQUFVaFYsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0JDLEtBQXRCLEVBQTZCQyxRQUE3QixFQUM3QztBQUNDLFFBQUlvSCxNQUFNLElBQUksK0RBQUF4TCxDQUFPZ0UsZ0JBQVgsQ0FBNEJDLElBQTVCLEVBQWtDQyxJQUFsQyxFQUF3Q0MsS0FBeEMsRUFBK0NDLFFBQS9DLENBQVY7QUFDQSxTQUFLNlEsaUJBQUwsQ0FBdUJyUSxJQUF2QixDQUE2QjRHLEdBQTdCO0FBQ0EsUUFBSXRILElBQUosRUFBVTtBQUNULGFBQUsyVSwwQkFBTDtBQUNBO0FBQ0QsV0FBT3JOLEdBQVA7QUFDQSxDQVJEOztBQVlBb0osWUFBWXZVLFNBQVosQ0FBc0JpVyxZQUF0QixHQUFxQyxVQUFVN1YsS0FBVixFQUFpQkMsTUFBakIsRUFDckM7QUFDQ1YsSUFBQSwrREFBQUEsQ0FBT0MsUUFBUCxDQUFnQlEsS0FBaEIsR0FBd0JBLEtBQXhCO0FBQ0FULElBQUEsK0RBQUFBLENBQU9DLFFBQVAsQ0FBZ0JTLE1BQWhCLEdBQXlCQSxNQUF6QjtBQUNBLENBSkQ7O0FBTUFrVSxZQUFZdlUsU0FBWixDQUFzQm9ELE1BQXRCLEdBQStCLFVBQVUrVSxLQUFWLEVBQy9CO0FBQ0MsU0FBSzdVLFFBQUwsQ0FBYzRTLGFBQWQsQ0FBNEIsS0FBS2MsYUFBTCxDQUFtQmIsV0FBL0M7QUFDQSxTQUFLN1MsUUFBTCxDQUFjSSxTQUFkLEdBQTBCLElBQTFCO0FBQ0EsU0FBS0osUUFBTCxDQUFjRixNQUFkLENBQXFCLEtBQUtrVCxVQUExQixFQUFzQyxLQUFLRSxXQUEzQztBQUNBLENBTEQ7Ozs7Ozs7Ozs7OztBQ3hXQTs7QUFFSSxTQUFTcUMsY0FBVCxHQUNBO0FBQ0ksU0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLEdBQWxCO0FBQ0EsU0FBS2xTLElBQUwsR0FBWSxnQkFBWjtBQUNIOztBQUVEZ1MsZUFBZTdZLFNBQWYsQ0FBeUJDLE1BQXpCLEdBQWtDLFVBQVVDLEVBQVYsRUFDbEM7QUFDSSxRQUFJOFksWUFBWTlZLEtBQUssS0FBSzZZLFVBQTFCO0FBQ0EsU0FBS0QsSUFBTCxJQUFhRSxTQUFiO0FBQ0EsU0FBS0MsY0FBTCxDQUFvQi9ZLEVBQXBCO0FBQ0gsQ0FMRDs7QUFPQTJZLGVBQWU3WSxTQUFmLENBQXlCaVosY0FBekIsR0FBMEMsVUFBVS9ZLEVBQVYsRUFDMUMsQ0FFQyxDQUhEOztBQUtBMlksZUFBZTdZLFNBQWYsQ0FBeUIrWCxLQUF6QixHQUFpQyxVQUFTelQsR0FBVCxFQUNqQyxDQUNDLENBRkQ7O0FBSUF1VSxlQUFlN1ksU0FBZixDQUF5QnlILE1BQXpCLEdBQWtDLFVBQVVkLElBQVYsRUFDbEM7QUFDSSxRQUFJQSxPQUFPLEVBQVg7QUFDQUEsU0FBSzJCLElBQUwsR0FBWSxLQUFLQSxJQUFqQjtBQUNBM0IsU0FBS0UsSUFBTCxHQUFZLEtBQUtBLElBQWpCO0FBQ0EsUUFBSSxLQUFLekMsSUFBTCxLQUFjLEVBQWxCLEVBQXNCO0FBQ2xCdUMsYUFBS3ZDLElBQUwsR0FBWSxLQUFLQSxJQUFqQjtBQUNIO0FBQ0R1QyxTQUFLb1MsVUFBTCxHQUFrQixLQUFLQSxVQUF2QjtBQUNBLFdBQU9wUyxJQUFQO0FBQ0gsQ0FWRDs7QUFZQWtTLGVBQWU3WSxTQUFmLENBQXlCOEcsS0FBekIsR0FBaUMsVUFBVW9TLEtBQVYsRUFDakM7QUFDSSxTQUFLclMsSUFBTCxHQUFZcVMsTUFBTXJTLElBQWxCO0FBQ0EsU0FBS3lCLElBQUwsR0FBWTRRLE1BQU01USxJQUFsQjtBQUNBLFNBQUtsRSxJQUFMLEdBQVk4VSxNQUFNOVUsSUFBTixHQUFhOFUsTUFBTTlVLElBQW5CLEdBQTBCLEVBQXRDO0FBQ0EsU0FBSzJVLFVBQUwsR0FBbUJHLE1BQU1ILFVBQU4sS0FBcUJoUyxTQUF0QixHQUFtQyxHQUFuQyxHQUF5Q21TLE1BQU1ILFVBQWpFO0FBQ0gsQ0FORDs7QUFZSixTQUFTSSxlQUFULENBQTBCNVQsQ0FBMUIsRUFBNkIvQyxDQUE3QixFQUFnQ2dELENBQWhDLEVBQ0E7QUFDSXFULG1CQUFlL1QsSUFBZixDQUFvQixJQUFwQjtBQUNBLFNBQUsrQixJQUFMLEdBQVksaUJBQVo7QUFDSCxTQUFLcEIsTUFBTCxHQUFjRixDQUFkO0FBQ0EsU0FBS0csTUFBTCxHQUFjbEQsQ0FBZDtBQUNBLFNBQUttRCxNQUFMLEdBQWNILENBQWQ7QUFDRyxTQUFLRCxDQUFMLEdBQVMsQ0FBVDtBQUNBLFNBQUsvQyxDQUFMLEdBQVMsQ0FBVDtBQUNBLFNBQUtnRCxDQUFMLEdBQVMsQ0FBVDtBQUNBLFNBQUtwQixJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtrRSxJQUFMLEdBQVkvQixFQUFFYSxZQUFGLEVBQVo7QUFDSDs7QUFFRCtSLGdCQUFnQm5aLFNBQWhCLEdBQTRCcUcsT0FBT0MsTUFBUCxDQUFjdVMsZUFBZTdZLFNBQTdCLENBQTVCOztBQUVBLDBEQUFBTCxDQUFPa0csY0FBUCxDQUFzQixnQkFBdEIsRUFBd0NnVCxjQUF4QztBQUNBLDBEQUFBbFosQ0FBT2tHLGNBQVAsQ0FBc0IsaUJBQXRCLEVBQXlDc1QsZUFBekM7O0FBRUFBLGdCQUFnQm5aLFNBQWhCLENBQTBCNEcsV0FBMUIsR0FBd0N1UyxlQUF4Qzs7QUFFQUEsZ0JBQWdCblosU0FBaEIsQ0FBMEJpWixjQUExQixHQUEyQyxVQUFVL1ksRUFBVixFQUMzQztBQUNJQSxVQUFNLEtBQUs2WSxVQUFYO0FBQ0gsU0FBS3hULENBQUwsSUFBVSxLQUFLRSxNQUFMLEdBQWN2RixFQUF4QjtBQUNBLFNBQUtzQyxDQUFMLElBQVUsS0FBS2tELE1BQUwsR0FBY3hGLEVBQXhCO0FBQ0EsU0FBS3NGLENBQUwsSUFBVSxLQUFLRyxNQUFMLEdBQWN6RixFQUF4QjtBQUNBLENBTkQ7O0FBUUFpWixnQkFBZ0JuWixTQUFoQixDQUEwQitYLEtBQTFCLEdBQWtDLFVBQVV6VCxHQUFWLEVBQ2xDO0FBQ0lBLFFBQUkvQixRQUFKLENBQWFnRCxDQUFiLEdBQWlCLEtBQUtBLENBQXRCO0FBQ0FqQixRQUFJL0IsUUFBSixDQUFhQyxDQUFiLEdBQWlCLEtBQUtBLENBQXRCO0FBQ0E4QixRQUFJL0IsUUFBSixDQUFhaUQsQ0FBYixHQUFpQixLQUFLQSxDQUF0QjtBQUNILENBTEQ7O0FBT0EyVCxnQkFBZ0JuWixTQUFoQixDQUEwQnlILE1BQTFCLEdBQW1DLFVBQVVFLElBQVYsRUFDbkM7QUFDRyxRQUFJaEIsT0FBT2tTLGVBQWU3WSxTQUFmLENBQXlCeUgsTUFBekIsQ0FBZ0MzQyxJQUFoQyxDQUFxQyxJQUFyQyxDQUFYO0FBQ0E2QixTQUFLbEIsTUFBTCxHQUFjLEtBQUtBLE1BQW5CO0FBQ0FrQixTQUFLakIsTUFBTCxHQUFjLEtBQUtBLE1BQW5CO0FBQ0FpQixTQUFLaEIsTUFBTCxHQUFjLEtBQUtBLE1BQW5CO0FBQ0EsV0FBT2dCLElBQVA7QUFDRixDQVBEOztBQVNBd1MsZ0JBQWdCblosU0FBaEIsQ0FBMEI4RyxLQUExQixHQUFrQyxVQUFVb1MsS0FBVixFQUNsQztBQUNJTCxtQkFBZTdZLFNBQWYsQ0FBeUI4RyxLQUF6QixDQUErQmhDLElBQS9CLENBQW9DLElBQXBDLEVBQTBDb1UsS0FBMUM7QUFDQSxTQUFLelQsTUFBTCxHQUFjeVQsTUFBTXpULE1BQXBCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjd1QsTUFBTXhULE1BQXBCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjdVQsTUFBTXZULE1BQXBCO0FBQ0EsU0FBS0osQ0FBTCxHQUFTLEtBQUsvQyxDQUFMLEdBQVMsS0FBS2dELENBQUwsR0FBUyxDQUEzQjtBQUNILENBUEQ7Ozs7Ozs7Ozs7O0FDOUZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTNFQsWUFBVCxHQUNBLENBQ0M7O0FBRURBLGFBQWFwWixTQUFiLEdBQXlCO0FBQ3hCNEcsY0FBYXdTLFlBRFc7QUFFeEJ0RSxRQUFPLFVBQVV1RSxJQUFWLEVBQ1A7QUFDQyxPQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxPQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLE9BQUs3QixJQUFMLENBQVUsS0FBSzRCLElBQUwsQ0FBVSxDQUFWLENBQVY7QUFDQSxPQUFLRSxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsRUFSdUI7O0FBVXhCQyxPQUFNLFVBQVNDLFFBQVQsRUFDTjtBQUNDLE1BQUksS0FBS0MsV0FBTCxJQUFvQkQsUUFBeEIsRUFBa0M7QUFDakMsUUFBS0MsV0FBTCxDQUFpQkQsUUFBakIsRUFBMEIsS0FBS0osSUFBTCxDQUFVLEtBQUtDLEtBQWYsQ0FBMUI7QUFDQTtBQUNELE9BQUtBLEtBQUw7QUFDQSxNQUFJLEtBQUtBLEtBQUwsR0FBYSxLQUFLRCxJQUFMLENBQVV6VSxNQUEzQixFQUFtQztBQUNsQyxRQUFLNlMsSUFBTCxDQUFVLEtBQUs0QixJQUFMLENBQVUsS0FBS0MsS0FBZixDQUFWO0FBQ0EsR0FGRCxNQUVPO0FBQ04sT0FBSSxLQUFLSyxRQUFULEVBQW1CO0FBQ2xCLFNBQUtBLFFBQUw7QUFDQTtBQUNEO0FBQ0QsRUF2QnVCOztBQXlCeEJDLFdBQVUsVUFBVTVKLEtBQVYsRUFDVjtBQUNDLE1BQUksS0FBSzZKLE9BQVQsRUFBa0I7QUFDakIsUUFBS0EsT0FBTCxDQUFhN0osS0FBYjtBQUNBLEdBRkQsTUFFTztBQUNObEssV0FBUWtLLEtBQVIsQ0FBYyxRQUFkLEVBQXdCQSxLQUF4QjtBQUNBO0FBQ0QsTUFBSSxDQUFDLEtBQUt1SixhQUFWLEVBQXlCO0FBQ3hCLFFBQUtDLElBQUw7QUFDQTtBQUNELEVBbkN1Qjs7QUFxQ3hCTSxjQUFhLFlBQ2I7QUFDQyxNQUFJLEtBQUtDLFVBQVQsRUFBcUI7QUFDcEIsUUFBS0EsVUFBTCxDQUFnQmhDLEtBQWhCLENBQXNCLElBQXRCLEVBQTRCQyxTQUE1QjtBQUNBO0FBQ0QsRUExQ3VCOztBQTRDeEJQLE9BQU0sVUFBVWpQLElBQVYsRUFDTjtBQUNDLE1BQUk0TSxPQUFPLElBQVg7QUFDQSxNQUFJLEtBQUs0RSxTQUFULEVBQW9CO0FBQ25CLFFBQUtBLFNBQUwsQ0FBZXhSLElBQWYsRUFDQSxVQUFVQSxJQUFWLEVBQWdCO0FBQUU0TSxTQUFLb0UsSUFBTCxDQUFVekIsS0FBVixDQUFnQjNDLElBQWhCLEVBQXNCNEMsU0FBdEI7QUFBbUMsSUFEckQsRUFFQSxVQUFVeFAsSUFBVixFQUFnQjtBQUFFNE0sU0FBS3dFLFFBQUwsQ0FBYzdCLEtBQWQsQ0FBb0IzQyxJQUFwQixFQUEwQjRDLFNBQTFCO0FBQXVDLElBRnpELEVBR0EsVUFBVXhQLElBQVYsRUFBZ0I7QUFBRTRNLFNBQUswRSxXQUFMLENBQWlCL0IsS0FBakIsQ0FBdUIzQyxJQUF2QixFQUE2QjRDLFNBQTdCO0FBQTBDLElBSDVEO0FBSUE7QUFDRDtBQXJEdUIsQ0FBekI7O0FBeURBLFNBQVNpQyxpQkFBVCxHQUNBO0FBQ0MsS0FBSUMsS0FBSyxJQUFJZCxZQUFKLEVBQVQ7QUFDQWMsSUFBR1IsV0FBSCxHQUFpQixVQUFVbFIsSUFBVixFQUFnQjtBQUFDMUMsVUFBUUMsR0FBUixDQUFZLFlBQVosRUFBMEJ5QyxJQUExQjtBQUFpQyxFQUFuRTtBQUNBMFIsSUFBR1AsUUFBSCxHQUFjLFVBQVVuUixJQUFWLEVBQWdCO0FBQUMxQyxVQUFRQyxHQUFSLENBQVksMkJBQVo7QUFBMEMsRUFBekU7QUFDQW1VLElBQUdGLFNBQUgsR0FBZSxVQUFVeFIsSUFBVixFQUFnQmdSLElBQWhCLEVBQXNCeEosS0FBdEIsRUFBNkJ1SCxRQUE3QixFQUF1QztBQUNyRCxNQUFJL08sSUFBSixFQUFVO0FBQ1RnUixRQUFLaFIsSUFBTDtBQUNBLEdBRkQsTUFFTztBQUNOd0gsU0FBTXhILElBQU47QUFDQTtBQUNELEVBTkQ7QUFPQTBSLElBQUdwRixLQUFILENBQVMsQ0FBQyxPQUFELEVBQVUsUUFBVixFQUFvQixJQUFwQixFQUEwQixNQUExQixDQUFUO0FBQ0E7QUFDRDs7O0FBS0EsU0FBU3FGLGVBQVQsR0FDQTtBQUNDLE1BQUt6SixTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsTUFBSzBKLGNBQUwsR0FBc0IsSUFBSWpaLE1BQU1rWixhQUFWLEVBQXRCO0FBQ0E7O0FBRURGLGdCQUFnQm5hLFNBQWhCLEdBQTRCO0FBQzNCNEcsY0FBYXVULGVBRGM7QUFFM0JwSyxNQUFLLFVBQVUzTCxJQUFWLEVBQ0w7QUFDQyxTQUFPLEtBQUtzTSxTQUFMLENBQWV0TSxJQUFmLENBQVA7QUFDQSxFQUwwQjs7QUFPM0JrVyxZQUFXLFVBQVVsVyxJQUFWLEVBQWdCTCxRQUFoQixFQUNYO0FBQ0M7QUFDQSxNQUFJN0MsVUFBVSxLQUFLNk8sR0FBTCxDQUFTM0wsSUFBVCxDQUFkO0FBQ0EsTUFBSWxELE9BQUosRUFBYTtBQUNaLE9BQUk2QyxRQUFKLEVBQWM7QUFDYkEsYUFBUzdDLE9BQVQ7QUFDQTtBQUNELFVBQU9BLE9BQVA7QUFDQTs7QUFFRDtBQUNBLE1BQUlrVSxPQUFPLElBQVg7QUFDQWxVLFlBQVUsS0FBS2taLGNBQUwsQ0FBb0IzQyxJQUFwQixDQUF5QnJULElBQXpCLEVBQStCLFVBQVVsRCxPQUFWLEVBQ3pDO0FBQ0MsT0FBSTZDLFFBQUosRUFBYztBQUNiQSxhQUFTN0MsT0FBVDtBQUNBO0FBQ0QsR0FMUyxDQUFWO0FBTUEsT0FBS3dQLFNBQUwsQ0FBZXRNLElBQWYsSUFBdUJsRCxPQUF2QjtBQUNBLFNBQU9BLE9BQVA7QUFDQSxFQTVCMEI7O0FBK0IzQnFaLFlBQVcsVUFBVUMsYUFBVixFQUF5QkMsT0FBekIsRUFBa0NULFNBQWxDLEVBQTZDVSxXQUE3QyxFQUNYO0FBQ0MsTUFBSXRGLE9BQU8sSUFBWDs7QUFFQSxNQUFJOEUsS0FBSyxJQUFJZCxZQUFKLEVBQVQ7QUFDQSxNQUFJaEUsT0FBTyxJQUFYO0FBQ0E4RSxLQUFHTCxPQUFILEdBQWEsVUFBVTdKLEtBQVYsRUFBaUI7QUFDN0JsSyxXQUFRa0ssS0FBUixDQUFjLHVCQUFkLEVBQXVDQSxLQUF2QyxFQUE4Q2tLLEdBQUdiLElBQUgsQ0FBUWEsR0FBR1osS0FBWCxDQUE5QztBQUNBLEdBRkQ7QUFHQVksS0FBR1IsV0FBSCxHQUFpQixVQUFVRCxRQUFWLEVBQW9CclYsSUFBcEIsRUFBMEI7QUFDMUNnUixRQUFLMUUsU0FBTCxDQUFldE0sSUFBZixJQUF1QnFWLFFBQXZCO0FBQ0EsT0FBSXJFLEtBQUt1RixrQkFBVCxFQUE2QjtBQUM1QnZGLFNBQUt1RixrQkFBTCxDQUF3QmxCLFFBQXhCO0FBQ0E7QUFDRCxHQUxEO0FBTUFTLEtBQUdRLFdBQUgsR0FBaUIsWUFBWTtBQUM1QixPQUFJQSxXQUFKLEVBQWlCO0FBQ2hCQTtBQUNBO0FBQ0QsR0FKRDtBQUtBUixLQUFHRixTQUFILEdBQWUsWUFBWTtBQUMxQkEsYUFBVWpDLEtBQVYsQ0FBZ0IsSUFBaEIsRUFBc0JDLFNBQXRCO0FBQ0EsR0FGRDtBQUdBa0MsS0FBR1AsUUFBSCxHQUFjLFlBQ2Q7QUFDQyxPQUFJYyxPQUFKLEVBQWE7QUFDWkE7QUFDQTtBQUNELEdBTEQ7QUFNQVAsS0FBR3BGLEtBQUgsQ0FBUzBGLGFBQVQ7QUFFQSxFQTlEMEI7O0FBZ0UzQkkscUJBQW9CLFVBQVVKLGFBQVYsRUFBeUJDLE9BQXpCLEVBQ3BCO0FBQ0MsTUFBSXJGLE9BQU8sSUFBWDtBQUNBLE9BQUttRixTQUFMLENBQWVDLGFBQWYsRUFBOEJDLE9BQTlCLEVBQXVDLFVBQVV2RCxHQUFWLEVBQWVzQyxJQUFmLEVBQXFCeEosS0FBckIsRUFBNEJ1SCxRQUE1QixFQUN2QztBQUNDLE9BQUlyVyxVQUFVa1UsS0FBS2dGLGNBQUwsQ0FBb0IzQyxJQUFwQixDQUF5QlAsR0FBekIsRUFBOEJzQyxJQUE5QixFQUFvQ2pDLFFBQXBDLEVBQThDdkgsS0FBOUMsQ0FBZDtBQUNBLEdBSEQ7QUFJQSxFQXZFMEI7O0FBeUUzQjZLLGlCQUFnQixVQUFVTCxhQUFWLEVBQXlCQyxPQUF6QixFQUFrQ2xELFFBQWxDLEVBQ2hCO0FBQ0MsTUFBSW5DLE9BQU8sSUFBWDtBQUNBLE1BQUkwRixTQUFTLElBQUkzWixNQUFNaVcsU0FBVixFQUFiO0FBQ0EsT0FBS21ELFNBQUwsQ0FBZUMsYUFBZixFQUE4QkMsT0FBOUIsRUFBdUMsVUFBVXZELEdBQVYsRUFBZXNDLElBQWYsRUFBcUJ4SixLQUFyQixFQUE0QnVILFFBQTVCLEVBQ3ZDO0FBQ0MsT0FBSXJXLFVBQVU0WixPQUFPckQsSUFBUCxDQUFZUCxHQUFaLEVBQWlCc0MsSUFBakIsRUFBdUJqQyxRQUF2QixFQUFpQ3ZILEtBQWpDLENBQWQ7QUFDQSxHQUhELEVBR0d1SCxRQUhIO0FBSUEsRUFqRjBCOztBQW1GM0J3RCxPQUFNLFlBQ047QUFDQyxPQUFLckssU0FBTCxHQUFpQixFQUFqQjtBQUNBO0FBdEYwQixDQUE1Qjs7QUEwRkEsMERBQUEvUSxDQUFPbVEsZUFBUCxHQUF5QixJQUFJcUssZUFBSixFQUF6Qjs7Ozs7Ozs7OztBQ3ZMQTtBQUFBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsU0FBU2EsZUFBVCxHQUNBO0FBQ0ksU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDSDs7QUFFRDtBQUNBRCxnQkFBZ0JoYixTQUFoQixDQUEwQnlYLElBQTFCLEdBQWlDLFVBQVVQLEdBQVYsRUFBZWdFLFFBQWYsRUFDakM7QUFDSSxTQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFFBQUk5RixPQUFPLElBQVg7QUFDQSxTQUFLNkYsS0FBTCxHQUFhO0FBQ1QsZ0JBQVE7QUFEQyxLQUFiOztBQUlBLFFBQUk3RixPQUFPLElBQVg7QUFDQSxhQUFTa0MsTUFBVCxDQUFpQjNRLElBQWpCLEVBQXVCO0FBQ25CeU8sYUFBSzZGLEtBQUwsQ0FBVyxNQUFYLElBQXFCLE1BQXJCO0FBQ0E3RixhQUFLNkYsS0FBTCxDQUFXLE1BQVgsSUFBcUJ0VSxJQUFyQjs7QUFFQXlPLGFBQUsrRix5QkFBTCxDQUErQnhVLElBQS9CO0FBQ0g7QUFDRCxhQUFTcUosS0FBVCxDQUFlcEUsS0FBZixFQUFzQjtBQUNsQndKLGFBQUs2RixLQUFMLENBQVcsTUFBWCxJQUFxQixPQUFyQjtBQUNBN0YsYUFBSzZGLEtBQUwsQ0FBVyxPQUFYLElBQXNCclAsS0FBdEI7QUFDQTlGLGdCQUFRa0ssS0FBUixDQUFjLDhDQUE0Q2tILEdBQTFELEVBQStEdEwsTUFBTWhKLE1BQXJFO0FBQ0EsWUFBSXdTLEtBQUtwRixLQUFULEVBQWU7QUFDWG9GLGlCQUFLcEYsS0FBTCxDQUFXcEUsTUFBTWhKLE1BQWpCO0FBQ0g7QUFDRHdTLGFBQUtnRyxJQUFMLEdBQVloRyxLQUFLOEYsUUFBakI7QUFDQTlGLGFBQUtpRyxjQUFMLENBQW9CakcsS0FBSzhGLFFBQXpCO0FBRUg7QUFDRCxhQUFTM0QsUUFBVCxHQUNBLENBQ0M7QUFDRCxRQUFJSixNQUFNLElBQUloVyxNQUFNaVcsU0FBVixFQUFWO0FBQ0FELFFBQUlNLElBQUosQ0FBU1AsR0FBVCxFQUFjSSxNQUFkLEVBQXNCQyxRQUF0QixFQUFnQ3ZILEtBQWhDO0FBQ0gsQ0EvQkQ7O0FBaUNBO0FBQ0FnTCxnQkFBZ0JoYixTQUFoQixDQUEwQm1iLHlCQUExQixHQUFzRCxVQUFVeFUsSUFBVixFQUN0RDtBQUNJYixZQUFRQyxHQUFSLENBQVksK0NBQVo7QUFDRixRQUFJO0FBQ0UsWUFBSXFWLE9BQU9ySSxLQUFLak0sS0FBTCxDQUFXSCxJQUFYLENBQVg7QUFDQSxhQUFLeVUsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsWUFBSSxLQUFLRSxNQUFULEVBQWlCO0FBQ2IsaUJBQUtBLE1BQUwsQ0FBWUYsSUFBWjtBQUNIO0FBRUwsS0FQRixDQVFDLE9BQU1wSSxDQUFOLEVBQVM7QUFDSmxOLGdCQUFRa0ssS0FBUixDQUFjLDBCQUFkLEVBQTBDZ0QsQ0FBMUM7QUFDQSxZQUFJLEtBQUtoRCxLQUFULEVBQWU7QUFDWCxpQkFBS0EsS0FBTCxDQUFXcEUsS0FBWDtBQUNIO0FBQ0Q7QUFDSjtBQUNELFNBQUt5UCxjQUFMLENBQW9CRCxJQUFwQjtBQUNGLENBbkJEOztBQXNCQUosZ0JBQWdCaGIsU0FBaEIsQ0FBMEJxYixjQUExQixHQUEyQyxVQUFVRCxJQUFWLEVBQzNDO0FBQ0ksUUFBSWhHLE9BQU8sSUFBWDtBQUNBO0FBQ0R0UCxZQUFRQyxHQUFSLENBQVksNENBQVo7QUFDQ3BHLElBQUEsMERBQUFBLENBQU9tUSxlQUFQLENBQXVCOEssa0JBQXZCLENBQTBDUSxLQUFLRyxRQUEvQyxFQUF5RCxZQUFXO0FBQ2hFO0FBQ1EsWUFBSW5HLEtBQUtvRyxXQUFULEVBQXNCO0FBQ2xCcEcsaUJBQUtvRyxXQUFMLENBQWlCSixJQUFqQjtBQUNIO0FBQ1osS0FMRDtBQU1ILENBWEQ7Ozs7Ozs7Ozs7OztBQ3JFQTtBQUNBOztBQUVBLFNBQVNLLGdCQUFULENBQTBCN1gsSUFBMUIsRUFDQTtBQUNJLFNBQUs4WCxpQkFBTCxHQUF5QixFQUF6QjtBQUNIOztBQUVERCxpQkFBaUJ6YixTQUFqQixDQUEyQnlILE1BQTNCLEdBQW9DLFVBQVU3RCxJQUFWLEVBQ3BDO0FBQ0ksU0FBSytELElBQUwsR0FBWS9ELEtBQUs2RCxNQUFMLEVBQVo7QUFDQTNCLFlBQVFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QywwREFBQXBHLENBQU8rVCxnQkFBOUM7QUFDQSxTQUFLL0wsSUFBTCxDQUFVLFdBQVYsSUFBeUIsMERBQUFoSSxDQUFPK1QsZ0JBQVAsQ0FBd0JqTSxNQUF4QixFQUF6QjtBQUNBLFFBQUlrVSxRQUFRL1gsS0FBS2dZLGtCQUFMLENBQXdCaFksSUFBeEIsQ0FBWjtBQUNBLFFBQUkrWCxNQUFNaE8sS0FBTixHQUFjLENBQWxCLEVBQXFCO0FBQ2pCLGFBQUtoRyxJQUFMLENBQVUsY0FBVixJQUE0QmdVLEtBQTVCO0FBQ0g7O0FBRUQsV0FBTyxLQUFLaFUsSUFBWjtBQUNILENBWEQ7O0FBZUE4VCxpQkFBaUJ6YixTQUFqQixDQUEyQjZiLGlCQUEzQixHQUErQyxVQUFVQyxVQUFWLEVBQXNCO0FBQ2pFLFNBQUksSUFBSTdVLEdBQVIsSUFBZTZVLFVBQWYsRUFBMkI7QUFDdkIsWUFBSyxLQUFLSixpQkFBTCxDQUF1QnpVLEdBQXZCLE1BQWdDRixTQUFoQyxJQUE2Q1YsT0FBT3JHLFNBQVAsQ0FBaUIrYixjQUFqQixDQUFnQ2pYLElBQWhDLENBQXFDZ1gsVUFBckMsRUFBaUQ3VSxHQUFqRCxDQUFsRCxFQUF5RztBQUNyRyxnQkFBSU4sT0FBT21WLFdBQVc3VSxHQUFYLENBQVg7QUFDQTtBQUNBLGdCQUFJK1UsT0FBUSwwREFBQXJjLENBQU8rRyxlQUFQLENBQXVCQyxJQUF2QixDQUFaO0FBQ0EsZ0JBQUlxVixJQUFKLEVBQVU7QUFDTixxQkFBS04saUJBQUwsQ0FBdUJ6VSxHQUF2QixJQUE4QitVLElBQTlCO0FBQ0g7QUFDSjtBQUNKO0FBQ0osQ0FYRDs7QUFlQVAsaUJBQWlCemIsU0FBakIsQ0FBMkJpYyxlQUEzQixHQUE2QyxVQUFVQyxRQUFWLEVBQzdDO0FBQ0ksUUFBSSxDQUFDQSxRQUFMLEVBQWU7O0FBRWYsUUFBSUMsV0FBV0QsU0FBU0MsUUFBeEI7O0FBR0EsUUFBSS9HLE9BQU8sSUFBWDtBQUNBLGFBQVNnSCxlQUFULENBQXlCOVgsR0FBekIsRUFBOEIrWCxJQUE5QixFQUNBO0FBQ0ksYUFBSSxJQUFJMVgsSUFBSSxDQUFaLEVBQWVBLElBQUkwWCxLQUFLUCxVQUFMLENBQWdCbFgsTUFBbkMsRUFBMkNELEdBQTNDLEVBQStDO0FBQzNDLGdCQUFJMlgsWUFBWUQsS0FBS1AsVUFBTCxDQUFnQm5YLENBQWhCLENBQWhCO0FBQ0FMLGdCQUFJaVksYUFBSixDQUFtQm5ILEtBQUtzRyxpQkFBTCxDQUF1QlksU0FBdkIsQ0FBbkI7QUFDSDtBQUNKOztBQUVBLFNBQUksSUFBSTNYLElBQUcsQ0FBWCxFQUFjQSxJQUFJd1gsU0FBU3ZYLE1BQTNCLEVBQW1DRCxHQUFuQyxFQUF3QztBQUNyQyxZQUFJMFgsT0FBT0YsU0FBU3hYLENBQVQsQ0FBWDtBQUNBLFlBQUkyRCxPQUFPK1QsS0FBSy9ULElBQWhCO0FBQ0EsWUFBSWhFLE1BQU0sS0FBS1YsSUFBTCxDQUFVdVAsbUJBQVYsQ0FBOEIsTUFBOUIsRUFBc0M3SyxJQUF0QyxDQUFWO0FBQ0EsWUFBSWhFLEdBQUosRUFBUztBQUNMOFgsNEJBQWdCOVgsR0FBaEIsRUFBcUIrWCxJQUFyQjtBQUNIO0FBQ0o7QUFDSixDQXhCRDs7QUEyQkFaLGlCQUFpQnpiLFNBQWpCLENBQTJCd2MsY0FBM0IsR0FBNEMsVUFBVXRGLEdBQVYsRUFDNUM7QUFDSSxRQUFJOUIsT0FBTyxJQUFYO0FBQ0EsYUFBU2tDLE1BQVQsQ0FBZ0IzUCxJQUFoQixFQUNBO0FBQ0ksWUFBSTtBQUNBLGdCQUFJaEIsT0FBT29NLEtBQUtqTSxLQUFMLENBQVdhLElBQVgsQ0FBWDtBQUNILFNBRkQsQ0FHQSxPQUFNcUwsQ0FBTixFQUFTO0FBQ0xsTixvQkFBUWtLLEtBQVIsQ0FBYyx3QkFBZCxFQUF3Q2dELENBQXhDO0FBQ0Esa0JBQU1BLENBQU47QUFDSDtBQUNELFlBQUlyTSxTQUFTSSxTQUFiLEVBQXdCO0FBQ3BCakIsb0JBQVFrSyxLQUFSLENBQWMsbURBQWQsRUFBbUVrSCxHQUFuRTtBQUNBO0FBQ0g7QUFDRDlCLGFBQUtxQyxJQUFMLENBQVU5USxJQUFWO0FBQ0g7QUFDRCxhQUFTNFEsUUFBVCxHQUNBLENBQ0M7QUFDRCxhQUFTdkgsS0FBVCxDQUFlZ0QsQ0FBZixFQUNBO0FBQ0lsTixnQkFBUWtLLEtBQVIsQ0FBY2dELEVBQUVwUSxNQUFoQjtBQUNBLGNBQU1vUSxDQUFOO0FBQ0g7QUFDRCxRQUFJbUUsTUFBTSxJQUFJaFcsTUFBTWlXLFNBQVYsRUFBVjtBQUNBRCxRQUFJTSxJQUFKLENBQVNQLEdBQVQsRUFBY0ksTUFBZCxFQUFzQkMsUUFBdEIsRUFBZ0N2SCxLQUFoQztBQUNILENBNUJEOztBQThCQXlMLGlCQUFpQnpiLFNBQWpCLENBQTJCeVgsSUFBM0IsR0FBa0MsVUFBVTlQLElBQVYsRUFDbEM7QUFDSSxTQUFLK1QsaUJBQUwsR0FBeUIsRUFBekI7QUFDQSxRQUFJZSxJQUFJLElBQUl0YixNQUFNdWIsWUFBVixFQUFSO0FBQ0EsUUFBSS9VLFNBQVNaLFNBQWIsRUFBd0I7QUFDcEIsYUFBS1ksSUFBTCxHQUFZQSxJQUFaO0FBQ0g7QUFDRCxRQUFJL0QsT0FBTzZZLEVBQUUzVixLQUFGLENBQVEsS0FBS2EsSUFBYixFQUFtQixZQUFZO0FBQUM3QixnQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFBc0IsS0FBdEQsQ0FBWDtBQUNBLFNBQUtuQyxJQUFMLEdBQVlBLElBQVo7O0FBRUFqRSxJQUFBLDBEQUFBQSxDQUFPK1QsZ0JBQVAsQ0FBd0JSLGNBQXhCLENBQXVDLEtBQUt2TCxJQUE1QyxFQUFrRC9ELElBQWxEOztBQUVBLFNBQUtpWSxpQkFBTCxDQUF1QixLQUFLbFUsSUFBTCxDQUFVZ1YsWUFBVixDQUF1QmIsVUFBOUM7QUFDQSxTQUFLRyxlQUFMLENBQXFCLEtBQUt0VSxJQUFMLENBQVVnVixZQUEvQjtBQUNBLFNBQUtuRyxXQUFMLEdBQW1CNVMsS0FBS3FQLGVBQUwsQ0FBcUIsYUFBckIsQ0FBbkI7O0FBRUEsUUFBSSxLQUFLMkosWUFBVCxFQUF1QjtBQUNuQixhQUFLQSxZQUFMLENBQWtCaFosSUFBbEI7QUFDSDtBQUNELFdBQU9BLElBQVA7QUFDSCxDQXBCRDs7Ozs7Ozs7O0FDL0ZBO0FBQUEsU0FBU2laLE1BQVQsR0FDQTs7QUFFQztBQUNBMWIsVUFBTTZKLE9BQU4sQ0FBY2hMLFNBQWQsQ0FBd0IySixxQkFBeEIsR0FBZ0QsVUFBV21ULENBQVgsRUFDaEQ7QUFDQzs7QUFFQSxZQUFJdlgsSUFBSSxLQUFLQSxDQUFiO0FBQUEsWUFBZ0IvQyxJQUFJLEtBQUtBLENBQXpCO0FBQUEsWUFBNEJnRCxJQUFJLEtBQUtBLENBQXJDO0FBQ0EsWUFBSXdOLElBQUk4SixFQUFFQyxRQUFWOztBQUVBLGFBQUt4WCxDQUFMLEdBQVN5TixFQUFHLENBQUgsSUFBU3pOLENBQVQsR0FBYXlOLEVBQUcsQ0FBSCxJQUFTeFEsQ0FBdEIsR0FBMEJ3USxFQUFHLENBQUgsSUFBVXhOLENBQTdDO0FBQ0EsYUFBS2hELENBQUwsR0FBU3dRLEVBQUcsQ0FBSCxJQUFTek4sQ0FBVCxHQUFheU4sRUFBRyxDQUFILElBQVN4USxDQUF0QixHQUEwQndRLEVBQUcsQ0FBSCxJQUFVeE4sQ0FBN0M7QUFDQSxhQUFLQSxDQUFMLEdBQVN3TixFQUFHLENBQUgsSUFBU3pOLENBQVQsR0FBYXlOLEVBQUcsQ0FBSCxJQUFTeFEsQ0FBdEIsR0FBMEJ3USxFQUFHLEVBQUgsSUFBVXhOLENBQTdDOztBQUVBLGVBQU8sSUFBUDtBQUNDLEtBWkY7O0FBY0QsUUFBSXdYLDJCQUEyQjs7QUFFM0JULHVCQUFlLFVBQVVQLElBQVYsRUFDZjtBQUNJLGdCQUFJLENBQUMsS0FBS0YsVUFBVixFQUFzQjtBQUNsQixxQkFBS0EsVUFBTCxHQUFrQixFQUFsQjtBQUNIO0FBQ0QsZ0JBQUksS0FBS0EsVUFBTCxDQUFnQnZKLE9BQWhCLENBQXdCeUosSUFBeEIsSUFBZ0MsQ0FBcEMsRUFBdUM7QUFDbkMscUJBQUtGLFVBQUwsQ0FBZ0J2WCxJQUFoQixDQUFxQnlYLElBQXJCO0FBQ0g7QUFDSixTQVYwQjs7QUFZM0JpQiwwQkFBa0IsVUFBVWpCLElBQVYsRUFDbEI7QUFDSSxnQkFBSSxLQUFLRixVQUFULEVBQXFCO0FBQ2pCLG9CQUFJblgsSUFBSSxLQUFLbVgsVUFBTCxDQUFnQnZKLE9BQWhCLENBQXdCeUosSUFBeEIsQ0FBUjtBQUNBLG9CQUFJclgsSUFBSSxDQUFDLENBQVQsRUFBWTtBQUNSLHlCQUFLbVgsVUFBTCxDQUFnQnRKLE1BQWhCLENBQXVCN04sQ0FBdkIsRUFBMEIsQ0FBMUI7QUFDSDtBQUNKO0FBQ0osU0FwQjBCOztBQXNCM0IxRSxnQkFBUyxVQUFVQyxFQUFWLEVBQ1Q7QUFDSSxnQkFBSSxLQUFLNGIsVUFBTCxLQUFvQi9VLFNBQXhCLEVBQW1DO0FBQy9CLHFCQUFJLElBQUlwQyxJQUFHLENBQVgsRUFBY0EsSUFBSSxLQUFLbVgsVUFBTCxDQUFnQmxYLE1BQWxDLEVBQTBDRCxHQUExQyxFQUErQztBQUMzQyx3QkFBSXFYLE9BQU8sS0FBS0YsVUFBTCxDQUFnQm5YLENBQWhCLENBQVg7QUFDQXFYLHlCQUFLL2IsTUFBTCxDQUFZQyxFQUFaO0FBQ0E4Yix5QkFBS2pFLEtBQUwsQ0FBVyxJQUFYO0FBQ0g7QUFDSjs7QUFFRCxpQkFBSSxJQUFJcFQsSUFBSSxDQUFaLEVBQWVBLElBQUksS0FBS3VZLFFBQUwsQ0FBY3RZLE1BQWpDLEVBQXlDRCxHQUF6QyxFQUE4QztBQUMxQyxvQkFBSUwsTUFBTSxLQUFLNFksUUFBTCxDQUFjdlksQ0FBZCxDQUFWO0FBQ0Esb0JBQUlMLElBQUlyRSxNQUFSLEVBQWdCO0FBQ1pxRSx3QkFBSXJFLE1BQUosQ0FBV0MsRUFBWDtBQUNIO0FBQ0o7QUFDSjs7QUF0QzBCLEtBQS9CO0FBMENBcUcsTUFBRUMsV0FBRixDQUFjckYsTUFBTWtKLFFBQU4sQ0FBZXJLLFNBQTdCLEVBQXdDZ2Qsd0JBQXhDOztBQUdBN2IsVUFBTWtKLFFBQU4sQ0FBZXJLLFNBQWYsQ0FBeUJtZCxVQUF6QixHQUFzQ2hjLE1BQU1rSixRQUFOLENBQWU1QyxNQUFyRDs7QUFFQSxRQUFJMlYsK0JBQ0o7QUFDSUMsZ0NBQXdCLFVBQVVuVCxJQUFWLEVBQ3hCO0FBQ0Y7QUFDQSxnQkFBSXBLLFNBQVMsRUFBYjs7QUFFQUEsbUJBQU93SSxJQUFQLEdBQWMsS0FBS0EsSUFBbkI7QUFDQXhJLG1CQUFPK0csSUFBUCxHQUFjLEtBQUtBLElBQW5CO0FBQ0EsZ0JBQUssS0FBS3pDLElBQUwsS0FBYyxFQUFuQixFQUF3QnRFLE9BQU9zRSxJQUFQLEdBQWMsS0FBS0EsSUFBbkI7QUFDeEIsZ0JBQUsyTyxLQUFLdUssU0FBTCxDQUFnQixLQUFLQyxRQUFyQixNQUFvQyxJQUF6QyxFQUFnRHpkLE9BQU95ZCxRQUFQLEdBQWtCLEtBQUtBLFFBQXZCO0FBQ2hELGdCQUFLLEtBQUtDLFVBQUwsS0FBb0IsSUFBekIsRUFBZ0MxZCxPQUFPMGQsVUFBUCxHQUFvQixJQUFwQjtBQUNoQyxnQkFBSyxLQUFLQyxhQUFMLEtBQXVCLElBQTVCLEVBQW1DM2QsT0FBTzJkLGFBQVAsR0FBdUIsSUFBdkI7QUFDbkMsZ0JBQUssS0FBS0MsT0FBTCxLQUFpQixLQUF0QixFQUE4QjVkLE9BQU80ZCxPQUFQLEdBQWlCLEtBQWpCOztBQUU5QjVkLG1CQUFPeUosTUFBUCxHQUFnQixLQUFLQSxNQUFMLENBQVlvVSxPQUFaLEVBQWhCOztBQUdNLGdCQUFJLEtBQUs5VyxJQUFMLEtBQWMsa0JBQWxCLEVBQ0E7QUFDSSxvQkFBSSxLQUFLZ0QsUUFBTCxLQUFrQjlDLFNBQXRCLEVBQWlDO0FBQzdCakgsMkJBQU8rSixRQUFQLEdBQWtCLEtBQUtBLFFBQUwsQ0FBY3ZCLElBQWhDO0FBQ0g7QUFDRCxvQkFBSyxLQUFLckcsUUFBTCxLQUFrQjhFLFNBQXZCLEVBQW1DO0FBQy9CakgsMkJBQU9tQyxRQUFQLEdBQWtCLEtBQUtBLFFBQUwsQ0FBY3FHLElBQWhDO0FBQ0g7O0FBRUQsb0JBQUssS0FBS3JHLFFBQUwsS0FBa0I4RSxTQUFsQixJQUFpQ21ELEtBQUswVCxTQUFMLENBQWdCLEtBQUszYixRQUFMLENBQWNxRyxJQUE5QixNQUF5Q3ZCLFNBQS9FLEVBQTJGO0FBQ25GbUQseUJBQUswVCxTQUFMLENBQWdCLEtBQUszYixRQUFMLENBQWNxRyxJQUE5QixJQUF1QyxLQUFLckcsUUFBTCxDQUFjd0YsTUFBZCxDQUFzQnlDLElBQXRCLENBQXZDO0FBQ1A7O0FBRUQsb0JBQUssS0FBS0wsUUFBTCxLQUFrQjlDLFNBQWxCLElBQStCbUQsS0FBSzJULFVBQUwsQ0FBaUIsS0FBS2hVLFFBQUwsQ0FBY3ZCLElBQS9CLE1BQTBDdkIsU0FBOUUsRUFBMEY7QUFDbEZtRCx5QkFBSzJULFVBQUwsQ0FBaUIsS0FBS2hVLFFBQUwsQ0FBY3ZCLElBQS9CLElBQXdDLEtBQUt1QixRQUFMLENBQWNwQyxNQUFkLENBQXNCeUMsSUFBdEIsQ0FBeEM7QUFDUDtBQUNKOztBQUVELGdCQUFJLEtBQUs0UixVQUFULEVBQXFCO0FBQ2pCaGMsdUJBQU9nYyxVQUFQLEdBQW9CLEVBQXBCO0FBQ0EscUJBQUksSUFBSW5YLElBQUcsQ0FBWCxFQUFjQSxJQUFJLEtBQUttWCxVQUFMLENBQWdCbFgsTUFBbEMsRUFBMENELEdBQTFDLEVBQStDO0FBQzNDN0UsMkJBQU9nYyxVQUFQLENBQWtCdlgsSUFBbEIsQ0FBeUIsS0FBS3VYLFVBQUwsQ0FBZ0JuWCxDQUFoQixFQUFtQjJELElBQTVDO0FBQ0g7QUFDSjs7QUFFUCxnQkFBSyxLQUFLNFUsUUFBTCxDQUFjdFksTUFBZCxHQUF1QixDQUE1QixFQUFnQztBQUMvQjlFLHVCQUFPb2QsUUFBUCxHQUFrQixFQUFsQjtBQUNBLHFCQUFNLElBQUl2WSxJQUFJLENBQWQsRUFBaUJBLElBQUksS0FBS3VZLFFBQUwsQ0FBY3RZLE1BQW5DLEVBQTJDRCxHQUEzQyxFQUNTO0FBQ0ksd0JBQUl3QixRQUFRLEtBQUsrVyxRQUFMLENBQWV2WSxDQUFmLENBQVo7QUFDWjtBQUNZN0UsMkJBQU9vZCxRQUFQLENBQWdCM1ksSUFBaEIsQ0FBc0I0QixNQUFNc0IsTUFBTixDQUFjeUMsSUFBZCxDQUF0QjtBQUNaO0FBQ0Q7QUFDSyxtQkFBT3BLLE1BQVA7QUFDSCxTQXBETDs7QUFzRElnZSwyQkFBbUIsVUFBVTVULElBQVYsRUFDbkI7QUFDRixnQkFBSyxLQUFLakksUUFBTCxLQUFrQjhFLFNBQWxCLElBQWlDbUQsS0FBSzBULFNBQUwsQ0FBZ0IsS0FBSzNiLFFBQUwsQ0FBY3FHLElBQTlCLE1BQXlDdkIsU0FBL0UsRUFBMkY7QUFDN0VtRCxxQkFBSzBULFNBQUwsQ0FBZ0IsS0FBSzNiLFFBQUwsQ0FBY3FHLElBQTlCLElBQXVDLEtBQUtyRyxRQUFMLENBQWN3RixNQUFkLENBQXNCeUMsSUFBdEIsQ0FBdkM7QUFDYjs7QUFFRCxpQkFBTSxJQUFJdkYsSUFBSSxDQUFkLEVBQWlCQSxJQUFJLEtBQUt1WSxRQUFMLENBQWN0WSxNQUFuQyxFQUEyQ0QsR0FBM0MsRUFBa0Q7QUFDakQscUJBQUt1WSxRQUFMLENBQWV2WSxDQUFmLEVBQW1CbVosaUJBQW5CLENBQXFDNVQsSUFBckM7QUFDQTtBQUNFLFNBL0RMOztBQWlFSTZULDBCQUFrQixVQUFVN1QsSUFBVixFQUNsQjtBQUNGLGdCQUFLLEtBQUtMLFFBQUwsS0FBa0I5QyxTQUFsQixJQUErQm1ELEtBQUsyVCxVQUFMLENBQWlCLEtBQUtoVSxRQUFMLENBQWN2QixJQUEvQixNQUEwQ3ZCLFNBQTlFLEVBQTBGO0FBQ3hGbUQscUJBQUsyVCxVQUFMLENBQWlCLEtBQUtoVSxRQUFMLENBQWN2QixJQUEvQixJQUF3QyxLQUFLdUIsUUFBTCxDQUFjcEMsTUFBZCxDQUFzQnlDLElBQXRCLENBQXhDO0FBQ0Q7O0FBRUQsaUJBQU0sSUFBSXZGLElBQUksQ0FBZCxFQUFpQkEsSUFBSSxLQUFLdVksUUFBTCxDQUFjdFksTUFBbkMsRUFBMkNELEdBQTNDLEVBQWtEO0FBQ2pELHFCQUFLdVksUUFBTCxDQUFldlksQ0FBZixFQUFtQm9aLGdCQUFuQixDQUFvQzdULElBQXBDO0FBQ0E7QUFDRSxTQTFFTDs7QUE0RUM4VCxpQkFBUyxVQUFXOVQsSUFBWCxFQUFrQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0EscUJBQVMrVCxnQkFBVCxDQUEyQkMsS0FBM0IsRUFBa0NyWixDQUFsQyxFQUFzQztBQUNyQyxvQkFBSXNaLFNBQVMsRUFBYjtBQUNBLHFCQUFNLElBQUlsWCxHQUFWLElBQWlCaVgsS0FBakIsRUFBeUI7QUFDeEIsd0JBQUl2WCxPQUFPdVgsTUFBT2pYLEdBQVAsQ0FBWDtBQUNBLDJCQUFPTixLQUFLeVgsUUFBWjtBQUNBRCwyQkFBTzVaLElBQVAsQ0FBYW9DLElBQWI7QUFDQTtBQUNELHVCQUFPd1gsTUFBUDtBQUNBOztBQUdLLGlCQUFLNU0saUJBQUwsQ0FBdUIsSUFBdkI7O0FBRU47QUFDQSxnQkFBSThNLGVBQWlCblUsU0FBU25ELFNBQVQsSUFBc0JtRCxTQUFTLEVBQXBEOztBQUVBLGdCQUFJb1UsU0FBUyxFQUFiOztBQUVBLGdCQUFLRCxZQUFMLEVBQW9COztBQUVWblUsdUJBQU87QUFDZjJULGdDQUFZLEVBREc7QUFFZkQsK0JBQVcsRUFGSTtBQUdmckMsOEJBQVUsRUFISztBQUlmZ0QsNEJBQVE7QUFKTyxpQkFBUDs7QUFRQTtBQUNBO0FBQ0Esb0JBQUl6ZSxTQUFTLEtBQUt1ZCxzQkFBTCxDQUE0Qm5ULElBQTVCLENBQWI7O0FBR1RvVSx1QkFBT0YsUUFBUCxHQUFrQjtBQUNqQkksNkJBQVMsR0FEUTtBQUVqQjNYLDBCQUFNLFFBRlc7QUFHakI0WCwrQkFBVztBQUhNLGlCQUFsQjs7QUFNQSxvQkFBSVosYUFBYUksaUJBQWtCL1QsS0FBSzJULFVBQXZCLEVBQW1DLE9BQW5DLENBQWpCO0FBQ0Esb0JBQUlELFlBQVlLLGlCQUFrQi9ULEtBQUswVCxTQUF2QixFQUFrQyxXQUFsQyxDQUFoQjtBQUNBLG9CQUFJckMsV0FBVzBDLGlCQUFrQi9ULEtBQUtxUixRQUF2QixFQUFpQyxVQUFqQyxDQUFmO0FBQ0Esb0JBQUlnRCxTQUFTTixpQkFBa0IvVCxLQUFLcVUsTUFBdkIsRUFBK0IsUUFBL0IsQ0FBYjs7QUFFQSxvQkFBS1YsV0FBV2paLE1BQVgsR0FBb0IsQ0FBekIsRUFBNkIwWixPQUFPVCxVQUFQLEdBQW9CQSxVQUFwQjtBQUM3QixvQkFBS0QsVUFBVWhaLE1BQVYsR0FBbUIsQ0FBeEIsRUFBNEIwWixPQUFPVixTQUFQLEdBQW1CQSxTQUFuQjtBQUM1QixvQkFBS3JDLFNBQVMzVyxNQUFULEdBQWtCLENBQXZCLEVBQTJCMFosT0FBTy9DLFFBQVAsR0FBa0JBLFFBQWxCO0FBQzNCLG9CQUFLZ0QsT0FBTzNaLE1BQVAsR0FBZ0IsQ0FBckIsRUFBeUIwWixPQUFPQyxNQUFQLEdBQWdCQSxNQUFoQjs7QUFFaEIsb0JBQUk1QyxRQUFRLEtBQUtDLGtCQUFMLENBQXdCLElBQXhCLENBQVo7QUFDQSxvQkFBSUQsTUFBTWhPLEtBQU4sR0FBYyxDQUFsQixFQUFxQjtBQUNqQjJRLDJCQUFPLGNBQVAsSUFBeUIzQyxLQUF6QjtBQUNIOztBQUVEMkMsdUJBQU94ZSxNQUFQLEdBQWdCQSxNQUFoQjtBQUNULGFBckNELE1BcUNPO0FBQ0d3ZSx1QkFBT3hlLE1BQVAsR0FBZ0IsS0FBS3VkLHNCQUFMLENBQTRCblQsSUFBNUIsQ0FBaEI7QUFDQW9VLHVCQUFPelgsSUFBUCxHQUFjLEtBQUtBLElBQW5CO0FBQ0Esb0JBQUl5WCxPQUFPeGUsTUFBUCxLQUFrQmlILFNBQXRCLEVBQWlDO0FBQzdCakIsNEJBQVFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNIO0FBQ0o7O0FBRVAsbUJBQU91WSxNQUFQO0FBR0EsU0FuSkY7O0FBcUpJMUMsNEJBQW9CLFVBQVV2WSxLQUFWLEVBQ3BCO0FBQ0ksZ0JBQUlzRCxPQUFPO0FBQ1BtViw0QkFBYSxFQUROO0FBRVBLLDBCQUFXLEVBRko7QUFHUHhPLHVCQUFPO0FBSEEsYUFBWDs7QUFNQSxxQkFBUytRLDRCQUFULENBQXNDOWEsSUFBdEMsRUFDQTtBQUNJLG9CQUFJQSxLQUFLa1ksVUFBVCxFQUFxQjtBQUNqQix5QkFBSSxJQUFJblgsSUFBRyxDQUFYLEVBQWNBLElBQUlmLEtBQUtrWSxVQUFMLENBQWdCbFgsTUFBbEMsRUFBMENELEdBQTFDLEVBQStDO0FBQzNDLDRCQUFJcVgsT0FBT3BZLEtBQUtrWSxVQUFMLENBQWdCblgsQ0FBaEIsQ0FBWDtBQUNBLDRCQUFJZ0MsS0FBS21WLFVBQUwsQ0FBaUJFLEtBQUsxVCxJQUF0QixNQUFpQ3ZCLFNBQXJDLEVBQWdEO0FBQzVDSixpQ0FBS21WLFVBQUwsQ0FBaUJFLEtBQUsxVCxJQUF0QixJQUE4QjBULEtBQUt2VSxNQUFMLEVBQTlCO0FBQ0FkLGlDQUFLZ0gsS0FBTDtBQUNIO0FBQ0o7O0FBRUQsd0JBQUkwTyxPQUFPLEVBQVg7QUFDQUEseUJBQUsvVCxJQUFMLEdBQVkxRSxLQUFLMEUsSUFBakI7QUFDQStULHlCQUFLUCxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EseUJBQUksSUFBSW5YLElBQUcsQ0FBWCxFQUFjQSxJQUFJZixLQUFLa1ksVUFBTCxDQUFnQmxYLE1BQWxDLEVBQTBDRCxHQUExQyxFQUErQztBQUMzQzBYLDZCQUFLUCxVQUFMLENBQWdCdlgsSUFBaEIsQ0FBc0JYLEtBQUtrWSxVQUFMLENBQWdCblgsQ0FBaEIsRUFBbUIyRCxJQUF6QztBQUNIO0FBQ0QzQix5QkFBS3dWLFFBQUwsQ0FBYzVYLElBQWQsQ0FBbUI4WCxJQUFuQjtBQUNIOztBQUVELG9CQUFJelksS0FBS3NaLFFBQVQsRUFBbUI7QUFDZix5QkFBSSxJQUFJdlksSUFBSSxDQUFaLEVBQWVBLElBQUlmLEtBQUtzWixRQUFMLENBQWN0WSxNQUFqQyxFQUF5Q0QsR0FBekMsRUFBOEM7QUFDMUMrWixxREFBOEI5YSxLQUFLc1osUUFBTCxDQUFjdlksQ0FBZCxDQUE5QjtBQUNIO0FBQ0o7QUFDSjtBQUNEK1oseUNBQTZCcmIsS0FBN0I7QUFDQSxtQkFBT3NELElBQVA7QUFDSDs7QUF6TEwsS0FEQTs7QUFnTUVKLE1BQUVDLFdBQUYsQ0FBY3JGLE1BQU1rSixRQUFOLENBQWVySyxTQUE3QixFQUF3Q29kLDRCQUF4Qzs7QUFJRjtBQUNBamMsVUFBTWtKLFFBQU4sQ0FBZXJLLFNBQWYsQ0FBeUJvVCx3QkFBekIsR0FBb0QsVUFBV3VMLE1BQVgsRUFBb0I7O0FBRXBFLGFBQUtyVyxJQUFMLEdBQVlxVyxPQUFPclcsSUFBbkI7QUFDQSxhQUFLbEUsSUFBTCxHQUFZdWEsT0FBT3ZhLElBQW5COztBQUVBLGFBQUt3YSxFQUFMLENBQVFsVSxJQUFSLENBQWNpVSxPQUFPQyxFQUFyQjtBQUNBLGFBQUtwVixRQUFMLENBQWNrQixJQUFkLENBQW9CaVUsT0FBT25WLFFBQTNCO0FBQ0EsYUFBS3FWLFVBQUwsQ0FBZ0JuVSxJQUFoQixDQUFzQmlVLE9BQU9FLFVBQTdCO0FBQ0EsYUFBS0MsS0FBTCxDQUFXcFUsSUFBWCxDQUFpQmlVLE9BQU9HLEtBQXhCOztBQUVBLGFBQUt2VixNQUFMLENBQVltQixJQUFaLENBQWtCaVUsT0FBT3BWLE1BQXpCO0FBQ0EsYUFBS29CLFdBQUwsQ0FBaUJELElBQWpCLENBQXVCaVUsT0FBT2hVLFdBQTlCOztBQUVBLGFBQUtvVSxnQkFBTCxHQUF3QkosT0FBT0ksZ0JBQS9CO0FBQ0EsYUFBS0Msc0JBQUwsR0FBOEJMLE9BQU9LLHNCQUFyQzs7QUFFQSxhQUFLdEIsT0FBTCxHQUFlaUIsT0FBT2pCLE9BQXRCOztBQUVBLGFBQUtGLFVBQUwsR0FBa0JtQixPQUFPbkIsVUFBekI7QUFDQSxhQUFLQyxhQUFMLEdBQXFCa0IsT0FBT2xCLGFBQTVCOztBQUVBLGFBQUt3QixhQUFMLEdBQXFCTixPQUFPTSxhQUE1QjtBQUNBLGFBQUtDLFdBQUwsR0FBbUJQLE9BQU9PLFdBQTFCOztBQUVBLGFBQUszQixRQUFMLEdBQWdCeEssS0FBS2pNLEtBQUwsQ0FBWWlNLEtBQUt1SyxTQUFMLENBQWdCcUIsT0FBT3BCLFFBQXZCLENBQVosQ0FBaEI7O0FBRUE7QUFDQSxhQUFNLElBQUk1WSxJQUFJLENBQWQsRUFBaUJBLElBQUlnYSxPQUFPekIsUUFBUCxDQUFnQnRZLE1BQXJDLEVBQTZDRCxHQUE3QyxFQUFvRDtBQUNoRCxpQkFBS3lOLEdBQUwsQ0FBVXVNLE9BQU96QixRQUFQLENBQWlCdlksQ0FBakIsQ0FBVjtBQUNIO0FBQ0RnYSxlQUFPelksTUFBUCxDQUFja00sR0FBZCxDQUFrQixJQUFsQjtBQUNBdU0sZUFBT3pZLE1BQVAsQ0FBY21JLE1BQWQsQ0FBcUJzUSxNQUFyQjs7QUFFQSxhQUFLN0MsVUFBTCxHQUFrQjZDLE9BQU83QyxVQUF6QjtBQUNILEtBbENEO0FBcUNDOztBQUVEZTs7Ozs7Ozs7Ozs7O0FDN1NBO0FBQ0E7O0FBRUEsU0FBU3NDLGVBQVQsR0FDQTtBQUNDalksSUFBQSxnRkFBQUEsQ0FBa0I2USxLQUFsQixDQUF3QixJQUF4QixFQUE4QkMsU0FBOUI7QUFDRyxTQUFLb0gsV0FBTCxHQUFtQixTQUFTQyxLQUFULEdBQWtCO0FBQUMsZUFBTyxJQUFQO0FBQWEsS0FBbkQ7QUFDSDs7QUFHREYsZ0JBQWdCbmYsU0FBaEIsR0FBNEJxRyxPQUFPQyxNQUFQLENBQWMsZ0ZBQUFZLENBQWtCbEgsU0FBaEMsQ0FBNUI7O0FBRUF1RyxFQUFFQyxXQUFGLENBQWMyWSxnQkFBZ0JuZixTQUE5QixFQUNJO0FBQ0E0RyxpQkFBYXVZLGVBRGI7QUFFQTlYLFlBQVEsVUFBVW5ILEVBQVYsRUFBY29ILEtBQWQsRUFBcUJDLElBQXJCLEVBQ1g7QUFDTyxlQUFPLEtBQUs2WCxXQUFMLENBQWlCbGYsRUFBakIsRUFBcUJtSixDQUFyQixFQUF3QjlCLElBQXhCLENBQVA7QUFDTixLQUxFO0FBTUErWCxlQUFXLFlBQVk7QUFDbkIsWUFBSWpXLElBQUk7QUFDSkcsc0JBQVUsRUFBQ2pFLEdBQUcsQ0FBSixFQUFPL0MsR0FBRyxDQUFWLEVBQWFnRCxHQUFHLENBQWhCLEVBRE47QUFFSjZDLHNCQUFVLEVBQUM5QyxHQUFHLENBQUosRUFBTy9DLEdBQUcsQ0FBVixFQUFhZ0QsR0FBRyxDQUFoQjtBQUZOLFNBQVI7QUFJQSxZQUFJZ0MsUUFBUSxFQUFDb0QsR0FBRyxDQUFKLEVBQU8rRCxHQUFHLENBQVYsRUFBYUMsR0FBRyxDQUFoQixFQUFaO0FBQ0EsYUFBS3dRLFdBQUwsQ0FBaUIvVixDQUFqQixFQUFvQjdCLEtBQXBCO0FBQ0gsS0FiRDtBQWNBK1gseUJBQXFCLFVBQVVaLE1BQVYsRUFBa0I7QUFDbkMsWUFBSSxPQUFPQSxNQUFQLEtBQWtCLFVBQXRCLEVBQWtDO0FBQzlCLGlCQUFLUyxXQUFMLEdBQW1CVCxNQUFuQjtBQUNILFNBRkQsTUFFTyxJQUFJLE9BQU9BLE1BQVAsS0FBbUIsUUFBdkIsRUFBaUM7QUFDcEMsZ0JBQUk7QUFDQSxxQkFBS1MsV0FBTCxHQUFtQixJQUFJSSxRQUFKLENBQWMsV0FBZCxFQUEyQmIsTUFBM0IsQ0FBbkI7QUFDQSxxQkFBS1csU0FBTDtBQUNILGFBSEQsQ0FJQSxPQUFPdE0sQ0FBUCxFQUFVO0FBQ053QyxzQkFBTXhDLENBQU47QUFDQSxxQkFBS29NLFdBQUwsR0FBbUJyWSxTQUFuQjtBQUNIO0FBQ0QsaUJBQUswWSxXQUFMLEdBQW1CZCxNQUFuQjtBQUNIO0FBQ0osS0E1QkQ7O0FBOEJIbFgsWUFBUSxZQUNSO0FBQ08sWUFBSWQsT0FBTztBQUNQdkMsa0JBQU07QUFEQyxTQUFYO0FBR051QyxhQUFLZSxNQUFMLEdBQWMsK0RBQUEvSCxDQUFPdUgsaUJBQVAsQ0FBeUJsSCxTQUF6QixDQUFtQ3lILE1BQW5DLENBQTBDM0MsSUFBMUMsQ0FBK0MsSUFBL0MsRUFBcUQsSUFBckQsQ0FBZDtBQUNBNEMsZUFBTyxhQUFQLElBQXdCLEtBQUsrWCxXQUE3QjtBQUNBLGVBQU85WSxJQUFQO0FBQ0EsS0F0Q0U7QUF1Q0hHLFdBQU8sVUFBVWEsSUFBVixFQUNQO0FBQ0NoSSxRQUFBLCtEQUFBQSxDQUFPdUgsaUJBQVAsQ0FBeUJsSCxTQUF6QixDQUFtQzhHLEtBQW5DLENBQXlDLElBQXpDLEVBQStDYSxJQUEvQztBQUNBLGFBQUsrWCxlQUFMLENBQXFCL1gsS0FBSzhYLFdBQTFCO0FBQ0E7O0FBM0NFLENBREo7O0FBZ0RBLCtEQUFBOWYsQ0FBT2tHLGNBQVAsQ0FBc0IsaUJBQXRCLEVBQXlDc1osZUFBekM7Ozs7Ozs7Ozs7OztBQzVEQTtBQUNBOztBQUdBLFNBQVNRLGNBQVQsR0FDQTtBQUNDbFgsSUFBQSw4RUFBQUEsQ0FBaUJzUCxLQUFqQixDQUF1QixJQUF2QixFQUE2QkMsU0FBN0I7QUFDQTs7QUFHRDJILGVBQWUzZixTQUFmLEdBQTJCcUcsT0FBT0MsTUFBUCxDQUFjLDhFQUFBbUMsQ0FBaUJ6SSxTQUEvQixDQUEzQjs7QUFFQSxJQUFJNFgsVUFBVTtBQUNWblQsVUFBTSxVQUFVNEUsQ0FBVixFQUFhN0IsS0FBYixFQUFvQjtBQUN0QixZQUFJLEtBQUs0WCxXQUFULEVBQXNCO0FBQ2xCLGlCQUFLQSxXQUFMLENBQWlCL1YsQ0FBakIsRUFBb0I3QixLQUFwQjtBQUNIO0FBQ0osS0FMUztBQU1WOFgsZUFBVyxZQUFZO0FBQ25CLFlBQUlqVyxJQUFJO0FBQ0pHLHNCQUFVLEVBQUNqRSxHQUFHLENBQUosRUFBTy9DLEdBQUcsQ0FBVixFQUFhZ0QsR0FBRyxDQUFoQixFQUROO0FBRUo2QyxzQkFBVSxFQUFDOUMsR0FBRyxDQUFKLEVBQU8vQyxHQUFHLENBQVYsRUFBYWdELEdBQUcsQ0FBaEI7QUFGTixTQUFSO0FBSUEsWUFBSWdDLFFBQVEsRUFBQ29ELEdBQUcsQ0FBSixFQUFPK0QsR0FBRyxDQUFWLEVBQWFDLEdBQUcsQ0FBaEIsRUFBWjtBQUNBLGFBQUt3USxXQUFMLENBQWlCL1YsQ0FBakIsRUFBb0I3QixLQUFwQjtBQUNILEtBYlM7QUFjVm9ZLHVCQUFtQixVQUFVakIsTUFBVixFQUFrQjtBQUNqQyxZQUFJLE9BQU9BLE1BQVAsS0FBa0IsVUFBdEIsRUFBa0M7QUFDOUIsaUJBQUtTLFdBQUwsR0FBbUJULE1BQW5CO0FBQ0gsU0FGRCxNQUVPLElBQUksT0FBT0EsTUFBUCxLQUFtQixRQUF2QixFQUFpQztBQUNwQyxnQkFBSTtBQUNBLHFCQUFLUyxXQUFMLEdBQW1CLElBQUlJLFFBQUosQ0FBYyxHQUFkLEVBQW1CLE9BQW5CLEVBQTRCYixNQUE1QixDQUFuQjtBQUNBLHFCQUFLVyxTQUFMO0FBQ0gsYUFIRCxDQUlBLE9BQU90TSxDQUFQLEVBQVU7QUFDTndDLHNCQUFNeEMsQ0FBTjtBQUNBLHFCQUFLb00sV0FBTCxHQUFtQnJZLFNBQW5CO0FBQ0g7QUFDRCxpQkFBSzBZLFdBQUwsR0FBbUJkLE1BQW5CO0FBQ0g7QUFDSixLQTVCUztBQTZCVmxYLFlBQVEsWUFBWTtBQUNoQixZQUFJZCxPQUFPLEVBQVg7QUFDQUEsYUFBS3ZDLElBQUwsR0FBWSxnQkFBWjtBQUNBdUMsYUFBS2UsTUFBTCxHQUFjLCtEQUFBL0gsQ0FBTzhJLGdCQUFQLENBQXdCekksU0FBeEIsQ0FBa0N5SCxNQUFsQyxDQUF5QzNDLElBQXpDLENBQThDLElBQTlDLEVBQW9ELElBQXBELENBQWQ7QUFDQSxZQUFJLEtBQUsyYSxXQUFULEVBQXNCO0FBQ2xCOVksaUJBQUtlLE1BQUwsQ0FBWStYLFdBQVosR0FBMEIsS0FBS0EsV0FBL0I7QUFDSDtBQUNELGVBQU85WSxJQUFQO0FBQ0gsS0FyQ1M7QUFzQ1ZHLFdBQU8sVUFBVUgsSUFBVixFQUFnQjtBQUNuQmhILFFBQUEsK0RBQUFBLENBQU84SSxnQkFBUCxDQUF3QnpJLFNBQXhCLENBQWtDOEcsS0FBbEMsQ0FBd0NoQyxJQUF4QyxDQUE2QyxJQUE3QyxFQUFtRDZCLElBQW5EO0FBQ0EsYUFBS2laLGlCQUFMLENBQXdCalosS0FBSzhZLFdBQTdCO0FBQ0gsS0F6Q1M7QUEwQ1Y3WSxpQkFBYStZO0FBMUNILENBQWQ7O0FBNkNBcFosRUFBRUMsV0FBRixDQUFjbVosZUFBZTNmLFNBQTdCLEVBQXdDNFgsT0FBeEM7QUFDQSwrREFBQWpZLENBQU9rRyxjQUFQLENBQXNCLGdCQUF0QixFQUF3QzhaLGNBQXhDOztBQUdBLFNBQVNFLElBQVQsR0FDQTtBQUNJLFFBQUloYixJQUFJLElBQUk4YSxjQUFKLEVBQVI7QUFDQSxRQUFJaEIsU0FBUywwQ0FBYjtBQUNBOVosTUFBRSthLGlCQUFGLENBQW9CakIsTUFBcEI7QUFDQSxRQUFJdFYsSUFBSTtBQUNKaEIsa0JBQVUsRUFBQzlDLEdBQUcsQ0FBSixFQUFPL0MsR0FBRyxDQUFWLEVBQWFnRCxHQUFHLENBQWhCLEVBRE47QUFFSmdFLGtCQUFVLEVBQUNqRSxHQUFHLENBQUosRUFBTy9DLEdBQUcsQ0FBVixFQUFhZ0QsR0FBRyxDQUFoQjtBQUZOLEtBQVI7QUFJQVgsTUFBRXVhLFdBQUYsQ0FBYy9WLENBQWQ7QUFDQXZELFlBQVFDLEdBQVIsQ0FBWXNELENBQVo7QUFDQSxRQUFJMUIsT0FBTzlDLEVBQUU0QyxNQUFGLEVBQVg7QUFDQTNCLFlBQVFDLEdBQVIsQ0FBWTRCLElBQVo7O0FBRUE5QyxRQUFJLElBQUk4YSxjQUFKLEVBQUo7QUFDQTlhLE1BQUVpQyxLQUFGLENBQVFhLEtBQUtELE1BQWI7QUFDQTtBQUNIOztBQUVEOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0FBRUEsSUFBSW9ZLGtCQUFrQixFQUF0Qjs7QUFFQTtBQUNBQSxnQkFBZ0JDLEtBQWhCLEdBQXdCLFlBQ3hCLENBQ0MsQ0FGRDs7QUFLQXhaLEVBQUVDLFdBQUYsQ0FBY3NaLGdCQUFnQkMsS0FBaEIsQ0FBc0IvZixTQUFwQyxFQUE4QztBQUM1Q29JLE9BQU0sVUFBVWxJLEVBQVYsRUFBY2dJLFFBQWQsRUFBd0JDLFlBQXhCLEVBQ04sQ0FDQyxDQUgyQztBQUk1Q1YsU0FBUSxVQUFVdEIsS0FBVixFQUNSO0FBQ0MsU0FBTyxFQUFQO0FBQ0EsRUFQMkM7QUFRNUNXLFFBQU8sVUFBVWEsSUFBVixFQUNQLENBQ0M7QUFWMkMsQ0FBOUM7O0FBYUE7QUFDQW1ZLGdCQUFnQkUsY0FBaEIsR0FBaUMsVUFBVWhZLEtBQVYsRUFDakM7QUFDQyxLQUFJLE9BQU9BLEtBQVAsS0FBaUIsV0FBckIsRUFBa0M7QUFDakMsT0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsRUFGRCxNQUVPO0FBQ04sT0FBS0EsS0FBTCxHQUFhLEVBQUN6QyxHQUFFLENBQUgsRUFBTS9DLEdBQUUsQ0FBUixFQUFXZ0QsR0FBRSxDQUFiLEVBQWI7QUFDQTtBQUNELENBUEQ7O0FBU0FzYSxnQkFBZ0JFLGNBQWhCLENBQStCaGdCLFNBQS9CLEdBQTJDcUcsT0FBT0MsTUFBUCxDQUFjd1osZ0JBQWdCQyxLQUFoQixDQUFzQi9mLFNBQXBDLENBQTNDO0FBQ0F1RyxFQUFFQyxXQUFGLENBQWNzWixnQkFBZ0JFLGNBQWhCLENBQStCaGdCLFNBQTdDLEVBQXdEO0FBQ3ZENEcsY0FBYWtaLGdCQUFnQkUsY0FEMEI7QUFFdkQ1WCxPQUFNLFVBQVVsSSxFQUFWLEVBQWNtSixDQUFkLEVBQWlCbEIsWUFBakIsRUFDTjtBQUNDQSxlQUFhNUMsQ0FBYixJQUFrQixLQUFLeUMsS0FBTCxDQUFXekMsQ0FBN0I7QUFDQTRDLGVBQWEzRixDQUFiLElBQWtCLEtBQUt3RixLQUFMLENBQVd4RixDQUE3QjtBQUNBMkYsZUFBYTNDLENBQWIsSUFBa0IsS0FBS3dDLEtBQUwsQ0FBV3hDLENBQTdCO0FBQ0EsRUFQc0Q7QUFRdkRpQyxTQUFRLFVBQVV0QixLQUFWLEVBQ1I7QUFDQyxNQUFJUSxPQUFPLEVBQVg7QUFDQUEsT0FBS3ZDLElBQUwsR0FBWSxnQkFBWjtBQUNBdUMsT0FBS3FCLEtBQUwsR0FBYXpCLEVBQUUwWixtQkFBRixDQUFzQixLQUFLalksS0FBM0IsQ0FBYjtBQUNBLFNBQU9yQixJQUFQO0FBQ0EsRUFkc0Q7QUFldkRHLFFBQU8sVUFBVWEsSUFBVixFQUNQO0FBQ0MsTUFBSUEsS0FBS0ssS0FBVCxFQUFnQjtBQUNmekIsS0FBRUMsV0FBRixDQUFjLEtBQUt3QixLQUFuQixFQUEwQkwsS0FBS0ssS0FBL0I7QUFDQTtBQUNEO0FBcEJzRCxDQUF4RDs7QUF1QkEsK0RBQUFySSxDQUFPa0csY0FBUCxDQUFzQixnQkFBdEIsRUFBd0NpYSxnQkFBZ0JFLGNBQXhEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFVRSxZQUFWLEdBQ0E7QUFDQ3pYLENBQUEsOEVBQUFBLENBQWlCc1AsS0FBakIsQ0FBdUIsSUFBdkIsRUFBNkJDLFNBQTdCO0FBQ0EsTUFBS3lHLFNBQUwsR0FBaUIsSUFBSSw4RUFBQTdLLENBQWlCQyxnQkFBckIsRUFBakI7QUFDQSxNQUFLc00sTUFBTCxHQUFjLElBQUloZixNQUFNNkosT0FBVixDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QixDQUFkO0FBQ0EsTUFBSzNDLFFBQUwsR0FBZ0IsSUFBSWxILE1BQU02SixPQUFWLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLENBQWhCO0FBQ0EsTUFBS29WLFVBQUwsR0FBa0IsRUFBQyxPQUFPLENBQVIsRUFBVyxPQUFPLEVBQWxCLEVBQWxCO0FBQ0EsTUFBS0EsVUFBTCxDQUFnQmpJLEtBQWhCLEdBQXdCLENBQXhCO0FBQ0EsTUFBS2tJLEtBQUwsR0FBYSxFQUFDdFgsS0FBSyxDQUFOLEVBQVNFLEtBQUssRUFBZCxFQUFrQmtQLE9BQU0sQ0FBeEIsRUFBYjtBQUNBLE1BQUszUSxLQUFMLEdBQWEsSUFBSXJHLE1BQU1tZixLQUFWLENBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLENBQWI7QUFDQTs7QUFFREosYUFBYWxnQixTQUFiLEdBQXlCcUcsT0FBT0MsTUFBUCxDQUFjLDhFQUFBbUMsQ0FBaUJ6SSxTQUEvQixDQUF6QjtBQUNBa2dCLGFBQWFsZ0IsU0FBYixDQUF1QjRHLFdBQXZCLEdBQXFDc1osWUFBckM7QUFDQSwrREFBQXZnQixDQUFPa0csY0FBUCxDQUFzQixjQUF0QixFQUFzQ3FhLFlBQXRDOztBQUVBQSxhQUFhbGdCLFNBQWIsQ0FBdUJ5SCxNQUF2QixHQUFnQyxZQUNoQztBQUNDLEtBQUlkLE9BQU8sRUFBWDtBQUNBQSxNQUFLdkMsSUFBTCxHQUFZLGNBQVo7QUFDQXVDLE1BQUtlLE1BQUwsR0FBYyw4RUFBQWUsQ0FBaUJ6SSxTQUFqQixDQUEyQnlILE1BQTNCLENBQWtDM0MsSUFBbEMsQ0FBdUMsSUFBdkMsRUFBNkMsSUFBN0MsQ0FBZDtBQUNBeUIsR0FBRWdhLG9DQUFGLENBQXVDLElBQXZDLEVBQTZDNVosS0FBS2UsTUFBbEQsRUFDQSxDQUFDLFFBQUQsRUFDQSxVQURBLEVBRUEsWUFGQSxFQUdBLE9BSEEsQ0FEQTs7QUFNQSxRQUFPZixJQUFQO0FBQ0EsQ0FaRDs7QUFjQXVaLGFBQWFsZ0IsU0FBYixDQUF1QjhHLEtBQXZCLEdBQStCLFVBQVVILElBQVYsRUFDL0I7QUFDQzhCLENBQUEsOEVBQUFBLENBQWlCekksU0FBakIsQ0FBMkI4RyxLQUEzQixDQUFpQ2hDLElBQWpDLENBQXNDLElBQXRDLEVBQTRDNkIsSUFBNUM7QUFDQSxNQUFLd1osTUFBTCxDQUFZelYsSUFBWixDQUFpQi9ELEtBQUt3WixNQUF0QjtBQUNBLE1BQUs5WCxRQUFMLENBQWNxQyxJQUFkLENBQW1CL0QsS0FBSzBCLFFBQXhCO0FBQ0EsTUFBS21ZLGNBQUwsQ0FBb0I3WixLQUFLeVosVUFBTCxDQUFnQnJYLEdBQXBDLEVBQXlDcEMsS0FBS3laLFVBQUwsQ0FBZ0JuWCxHQUF6RDtBQUNBLE1BQUt3WCxTQUFMLENBQWU5WixLQUFLMFosS0FBTCxDQUFXdFgsR0FBMUIsRUFBK0JwQyxLQUFLMFosS0FBTCxDQUFXcFgsR0FBMUM7QUFDQSxDQVBEOztBQVNBaVgsYUFBYWxnQixTQUFiLENBQXVCeWdCLFNBQXZCLEdBQW1DLFVBQVUxWCxHQUFWLEVBQWVFLEdBQWYsRUFDbkM7QUFDQyxNQUFLb1gsS0FBTCxDQUFXdFgsR0FBWCxHQUFpQkEsR0FBakI7QUFDQSxNQUFLc1gsS0FBTCxDQUFXcFgsR0FBWCxHQUFpQkEsR0FBakI7QUFDQSxNQUFLb1gsS0FBTCxDQUFXbEksS0FBWCxHQUFtQmxQLE1BQU1GLEdBQXpCO0FBQ0EsQ0FMRDs7QUFRQW1YLGFBQWFsZ0IsU0FBYixDQUF1QndnQixjQUF2QixHQUF3QyxVQUFVelgsR0FBVixFQUFlRSxHQUFmLEVBQ3hDO0FBQ0MsTUFBS21YLFVBQUwsQ0FBZ0JyWCxHQUFoQixHQUFzQkEsR0FBdEI7QUFDQSxNQUFLcVgsVUFBTCxDQUFnQm5YLEdBQWhCLEdBQXNCQSxHQUF0QjtBQUNBLE1BQUttWCxVQUFMLENBQWdCakksS0FBaEIsR0FBd0JsUCxNQUFNRixHQUE5QjtBQUNBLENBTEQ7O0FBVUFtWCxhQUFhbGdCLFNBQWIsQ0FBdUJ5RSxJQUF2QixHQUE4QixVQUFVNEUsQ0FBVixFQUFhN0IsS0FBYixFQUFvQitCLE1BQXBCLEVBQzlCO0FBQ0NGLEdBQUVHLFFBQUYsQ0FBV2tCLElBQVgsQ0FBZ0IsS0FBS3lWLE1BQXJCOztBQUVBLE1BQUsxQixTQUFMLENBQWUzSyxhQUFmLENBQTZCekssRUFBRWhCLFFBQS9CO0FBQ0FnQixHQUFFaEIsUUFBRixDQUFXaU0sY0FBWCxDQUEwQjdSLEtBQUt1RyxNQUFMLEtBQWMsS0FBS29YLFVBQUwsQ0FBZ0JqSSxLQUE5QixHQUFzQyxLQUFLaUksVUFBTCxDQUFnQnJYLEdBQWhGO0FBQ0FNLEdBQUVoQixRQUFGLENBQVcrSixHQUFYLENBQWUsS0FBSy9KLFFBQXBCLEVBQThCcUUsU0FBOUI7O0FBRUcsS0FBSW5ELE1BQUosRUFBWTtBQUNSRixJQUFFRyxRQUFGLENBQVdFLFlBQVgsQ0FBd0JILE1BQXhCO0FBQ0FGLElBQUVoQixRQUFGLENBQVdzQixxQkFBWCxDQUFpQ0osTUFBakM7QUFDSDs7QUFFSkYsR0FBRWhCLFFBQUYsQ0FBV2lNLGNBQVgsQ0FBMEI3UixLQUFLdUcsTUFBTCxLQUFjLEtBQUtxWCxLQUFMLENBQVdsSSxLQUF6QixHQUFpQyxLQUFLa0ksS0FBTCxDQUFXdFgsR0FBdEU7O0FBR0EsS0FBSXZCLEtBQUosRUFBVztBQUNWLE9BQUtrWixVQUFMLENBQWdCbFosS0FBaEI7QUFDQTtBQUVELENBcEJEOztBQXNCQTBZLGFBQWFsZ0IsU0FBYixDQUF1QjBnQixVQUF2QixHQUFvQyxVQUFVbFosS0FBVixFQUNwQztBQUNDQSxPQUFNa0QsSUFBTixDQUFXLEtBQUtsRCxLQUFoQjtBQUNBLENBSEQ7O0FBS0EsU0FBU21aLGNBQVQsQ0FBd0IxVyxNQUF4QixFQUNBO0FBQ0N4QixDQUFBLDhFQUFBQSxDQUFpQjNELElBQWpCLENBQXNCLElBQXRCO0FBQ0EsTUFBS21GLE1BQUwsR0FBY0EsTUFBZDtBQUNBLE1BQUt3VSxTQUFMLEdBQWlCLElBQUksOEVBQUE3SyxDQUFpQjVKLE1BQXJCLENBQTRCQyxNQUE1QixDQUFqQjtBQUNBOztBQUVEMFcsZUFBZTNnQixTQUFmLEdBQTJCcUcsT0FBT0MsTUFBUCxDQUFjLDhFQUFBbUMsQ0FBaUJ6SSxTQUEvQixDQUEzQjtBQUNBMmdCLGVBQWUzZ0IsU0FBZixDQUF5QjRHLFdBQXpCLEdBQXVDK1osY0FBdkM7O0FBR0FBLGVBQWUzZ0IsU0FBZixDQUF5QnlFLElBQXpCLEdBQWdDLFVBQVU0RSxDQUFWLEVBQ2hDO0FBQ0MsTUFBS29WLFNBQUwsQ0FBZXBLLFNBQWYsQ0FBeUJoTCxFQUFFRyxRQUEzQjtBQUNBLE1BQUtpVixTQUFMLENBQWVySyxVQUFmLENBQTBCL0ssRUFBRWhCLFFBQTVCO0FBQ0FnQixHQUFFaEIsUUFBRixDQUFXaU0sY0FBWCxDQUEwQixFQUExQjtBQUNBLENBTEQ7O0FBU0EsU0FBU3NNLGlCQUFULEdBQ0E7QUFDQ25ZLENBQUEsOEVBQUFBLENBQWlCc1AsS0FBakIsQ0FBdUIsSUFBdkIsRUFBNkJDLFNBQTdCO0FBQ0EsTUFBSzZJLGNBQUwsR0FBc0IsSUFBSTFmLE1BQU02SixPQUFWLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLENBQXRCO0FBQ0EsTUFBSzhWLFlBQUwsR0FBb0IsSUFBSTNmLE1BQU02SixPQUFWLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLENBQXBCO0FBQ0EsTUFBS21OLEtBQUwsR0FBYSxJQUFJaFgsTUFBTTZKLE9BQVYsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsQ0FBYjtBQUNBLE1BQUszQyxRQUFMLEdBQWdCLElBQUlsSCxNQUFNNkosT0FBVixDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QixDQUFoQjtBQUNBOztBQUVENFYsa0JBQWtCNWdCLFNBQWxCLEdBQThCcUcsT0FBT0MsTUFBUCxDQUFjLDhFQUFBbUMsQ0FBaUJ6SSxTQUEvQixDQUE5QjtBQUNBNGdCLGtCQUFrQjVnQixTQUFsQixDQUE0QjRHLFdBQTVCLEdBQTBDZ2EsaUJBQTFDO0FBQ0FyYSxFQUFFQyxXQUFGLENBQWVvYSxrQkFBa0I1Z0IsU0FBakMsRUFBMkM7QUFDMUMrZ0IsZUFBYyxVQUFVeGIsQ0FBVixFQUFZL0MsQ0FBWixFQUFlZ0QsQ0FBZixFQUNkO0FBQ0MsT0FBSzZDLFFBQUwsQ0FBY29CLEdBQWQsQ0FBa0JsRSxDQUFsQixFQUFxQi9DLENBQXJCLEVBQXdCZ0QsQ0FBeEI7QUFDQSxFQUp5QztBQUsxQ3diLHFCQUFxQixVQUFVbE0sS0FBVixFQUFpQm1NLEdBQWpCLEVBQ3JCO0FBQ0MsT0FBS0osY0FBTCxDQUFvQm5XLElBQXBCLENBQXlCb0ssS0FBekI7QUFDQSxPQUFLZ00sWUFBTCxDQUFrQnBXLElBQWxCLENBQXVCdVcsR0FBdkI7QUFDQSxPQUFLOUksS0FBTCxDQUFXMU8sR0FBWCxDQUFld1gsSUFBSTFiLENBQUosR0FBUXVQLE1BQU12UCxDQUE3QixFQUFnQzBiLElBQUl6ZSxDQUFKLEdBQU1zUyxNQUFNdFMsQ0FBNUMsRUFBK0N5ZSxJQUFJemIsQ0FBSixHQUFNc1AsTUFBTXRQLENBQTNEO0FBRUEsRUFYeUM7QUFZMUMwYixlQUFjLFVBQVU3VSxNQUFWLEVBQ2Q7QUFDQ0EsU0FBTzlHLENBQVAsR0FBVzlDLEtBQUt1RyxNQUFMLEtBQWdCLEtBQUttUCxLQUFMLENBQVc1UyxDQUEzQixHQUErQixLQUFLc2IsY0FBTCxDQUFvQnRiLENBQTlEO0FBQ0E4RyxTQUFPN0osQ0FBUCxHQUFXQyxLQUFLdUcsTUFBTCxLQUFnQixLQUFLbVAsS0FBTCxDQUFXM1YsQ0FBM0IsR0FBK0IsS0FBS3FlLGNBQUwsQ0FBb0JyZSxDQUE5RDtBQUNBNkosU0FBTzdHLENBQVAsR0FBVy9DLEtBQUt1RyxNQUFMLEtBQWdCLEtBQUttUCxLQUFMLENBQVczUyxDQUEzQixHQUErQixLQUFLcWIsY0FBTCxDQUFvQnJiLENBQTlEO0FBQ0EsRUFqQnlDO0FBa0IxQzJiLGVBQWMsVUFBVTlVLE1BQVYsRUFDZDtBQUNDQSxTQUFPOUcsQ0FBUCxHQUFXLEtBQUs4QyxRQUFMLENBQWM5QyxDQUF6QjtBQUNBOEcsU0FBTzdKLENBQVAsR0FBVyxLQUFLNkYsUUFBTCxDQUFjN0YsQ0FBekI7QUFDQTZKLFNBQU83RyxDQUFQLEdBQVcsS0FBSzZDLFFBQUwsQ0FBYzdDLENBQXpCO0FBQ0EsRUF2QnlDO0FBd0IxQ2YsT0FBTSxVQUFVNEUsQ0FBVixFQUNOO0FBQ0MsT0FBSzZYLFlBQUwsQ0FBa0I3WCxFQUFFRyxRQUFwQjtBQUNBLE1BQUksS0FBS3RELE1BQVQsRUFBaUI7QUFDaEIsUUFBS0EsTUFBTCxDQUFZa2IsWUFBWixDQUF5Qi9YLEVBQUVHLFFBQTNCO0FBQ0E7QUFDRCxPQUFLMlgsWUFBTCxDQUFrQjlYLEVBQUVoQixRQUFwQjtBQUNBLEVBL0J5QztBQWdDMUNaLFNBQVEsWUFDUjtBQUNDLE1BQUlDLFNBQVMsOEVBQUFlLENBQWlCekksU0FBakIsQ0FBMkJ5SCxNQUEzQixDQUFrQzNDLElBQWxDLENBQXVDLElBQXZDLEVBQTZDLElBQTdDLENBQWI7QUFDQXlCLElBQUVnYSxvQ0FBRixDQUF1QyxJQUF2QyxFQUE2QzdZLE1BQTdDLEVBQXFELENBQUMsVUFBRCxFQUNyRCxnQkFEcUQsRUFFckQsY0FGcUQsQ0FBckQ7QUFHQSxNQUFJZixPQUFPO0FBQ1YsV0FBUSxtQkFERTtBQUVWLGFBQVVlO0FBRkEsR0FBWDtBQUlBLFNBQU9mLElBQVA7QUFDQSxFQTNDeUM7QUE0QzFDRyxRQUFPLFVBQVVhLElBQVYsRUFDUDtBQUNDYyxFQUFBLDhFQUFBQSxDQUFpQnpJLFNBQWpCLENBQTJCOEcsS0FBM0IsQ0FBaUNoQyxJQUFqQyxDQUFzQyxJQUF0QyxFQUE0QzZDLElBQTVDO0FBQ0EsT0FBS3FaLGtCQUFMLENBQXdCclosS0FBS2taLGNBQTdCLEVBQTZDbFosS0FBS21aLFlBQWxEO0FBQ0EsT0FBS3pZLFFBQUwsQ0FBY3FDLElBQWQsQ0FBbUIvQyxLQUFLVSxRQUF4QjtBQUNBOztBQWpEeUMsQ0FBM0M7O0FBcURBLCtEQUFBMUksQ0FBT2tHLGNBQVAsQ0FBc0IsbUJBQXRCLEVBQTJDK2EsaUJBQTNDOztBQUdBLFNBQVNTLGtCQUFULENBQTZCSixHQUE3QixFQUNBO0FBQ0MsTUFBS0EsR0FBTCxHQUFXQSxPQUFPLENBQWxCO0FBQ0E7O0FBR0RJLG1CQUFtQnJoQixTQUFuQixHQUErQnFHLE9BQU9DLE1BQVAsQ0FBYyxnRkFBQVksQ0FBa0JsSCxTQUFoQyxDQUEvQjtBQUNBcWhCLG1CQUFtQnJoQixTQUFuQixDQUE2QjRHLFdBQTdCLEdBQTJDeWEsa0JBQTNDOztBQUVBOWEsRUFBRUMsV0FBRixDQUFjNmEsbUJBQW1CcmhCLFNBQWpDLEVBQTJDO0FBQzFDcUgsU0FBUSxVQUFVbkgsRUFBVixFQUFjb0gsS0FBZCxFQUFxQkMsSUFBckIsRUFDUjtBQUNDLE1BQUlELE1BQU1rQyxRQUFOLENBQWVoRSxDQUFmLEdBQW1CLEtBQUt5YixHQUE1QixFQUFpQztBQUNoQyxVQUFPLEtBQVA7QUFDQTtBQUNELFNBQU8sSUFBUDtBQUNBLEVBUHlDO0FBUTFDeFosU0FBUSxZQUNSO0FBQ0MsTUFBSUMsU0FBUyxnRkFBQVIsQ0FBa0JsSCxTQUFsQixDQUE0QnlILE1BQTVCLENBQW1DM0MsSUFBbkMsQ0FBd0MsSUFBeEMsRUFBOEMsSUFBOUMsQ0FBYjtBQUNBNEMsU0FBTyxLQUFQLElBQWdCLEtBQUt1WixHQUFyQjtBQUNBLE1BQUl0YSxPQUFPO0FBQ1YsV0FBUSxvQkFERTtBQUVWLGFBQVVlOztBQUZBLEdBQVg7QUFLQSxTQUFPZixJQUFQO0FBQ0EsRUFsQnlDO0FBbUIxQ0csUUFBTyxVQUFVYSxJQUFWLEVBQ1A7QUFDQ1QsRUFBQSxnRkFBQUEsQ0FBa0JsSCxTQUFsQixDQUE0QjhHLEtBQTVCLENBQWtDLElBQWxDLEVBQXdDYSxJQUF4QztBQUNBLE9BQUtzWixHQUFMLEdBQVd0WixLQUFLc1osR0FBaEI7QUFDQTtBQXZCeUMsQ0FBM0M7O0FBMEJBLCtEQUFBdGhCLENBQU9rRyxjQUFQLENBQXNCLG9CQUF0QixFQUE0Q3diLGtCQUE1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbk5BOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUtBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSIsImZpbGUiOiJ3ZWJwYWNrLmJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzA4MzQ4MDJlMDEzZjg1YjY3MzIiLCIvKlxyXG4qL1xyXG5cclxuXHJcbnZhciBNeV9MaWIgPSB7fTtcclxuXHJcbk15X0xpYi5WaWV3cG9ydCA9IHt9O1xyXG5cclxuXHJcbk15X0xpYi5PYmplY3RfQW5pbWF0aW9uID0gZnVuY3Rpb24gKG9iamVjdCwgYW5pbWF0aW9uKVxyXG57XHJcblx0dGhpcy5vYmplY3QgPSBvYmplY3Q7XHJcblx0dGhpcy5hbmltYXRpb24gPSBhbmltYXRpb247XHJcbn1cclxuXHJcbk15X0xpYi5PYmplY3RfQW5pbWF0aW9uLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZHQpXHJcbntcclxuXHR0aGlzLmFuaW1hdGlvbih0aGlzLm9iamVjdCwgZHQpO1xyXG59XHJcblxyXG5NeV9MaWIuY3JlYXRlX3RleHRfaW1hZ2UgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgdGV4dCwgbnBvdCwgYmFja2dyb3VuZCkgXHJcbntcclxuXHQvLyBjcmVhdGUgYSBjYW52YXMgZWxlbWVudFxyXG5cdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuXHRjYW52YXMud2lkdGggPSB3aWR0aDtcclxuXHRjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblx0aWYgKGJhY2tncm91bmQpIFxyXG5cdHtcclxuXHRcdGNvbnRleHQuZmlsbFN0eWxlID0gYmFja2dyb3VuZDtcclxuXHRcdGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHR9XHJcblx0Y29udGV4dC5mb250ID0gXCJCb2xkIDQwcHggQXJpYWxcIjtcclxuXHRjb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgwLDI1NSwwLDAuOTUpXCI7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KCdIZWxsbywgd29ybGQhJywgMCwgNTApO1xyXG4gICAgXHJcblx0Ly8gY2FudmFzIGNvbnRlbnRzIHdpbGwgYmUgdXNlZCBmb3IgYSB0ZXh0dXJlXHJcblx0dmFyIHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShjYW52YXMpIFxyXG5cdGlmIChucG90KSB7XHJcblx0XHR0ZXh0dXJlLndyYXBTID0gdGV4dHVyZS53cmFwVCA9IFRIUkVFLlRleHR1cmVXcmFwcGluZy5DbGFtcFRvRWRnZVdyYXBwaW5nO1xyXG5cdFx0dGV4dHVyZS5taW5GaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XHJcblx0fVxyXG5cdHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlOyBcdFxyXG5cdHJldHVybiB0ZXh0dXJlO1xyXG59XHJcblxyXG5cclxuTXlfTGliLkNyZWF0ZV9RdWFkID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIHZlcnRleF9zaGFkZXIsIGZyYWdtZW50X3NoYWRlcilcclxue1xyXG5cdC8vcGxhbmUgY3JlYXRlZCB0dXJuIGF3YXkgZnJvbSBjYW1lcmFcclxuXHR2YXIgcGxhbmUgPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggd2lkdGgsIGhlaWdodCk7XHJcblx0XHJcblx0dmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCB7XHJcblx0XHR2ZXJ0ZXhTaGFkZXI6IHZlcnRleF9zaGFkZXIsXHJcblx0XHRmcmFnbWVudFNoYWRlcjogZnJhZ21lbnRfc2hhZGVyXHJcblx0fSApOyBcclxuXHJcblx0dmFyIHF1YWQgPSBuZXcgVEhSRUUuTWVzaCggcGxhbmUsIG1hdGVyaWFsICk7XHJcblx0cXVhZC5yb3RhdGlvbi55ID0gTWF0aC5QSTtcclxuXHRyZXR1cm4gcXVhZDtcclxufVxyXG5cclxuXHJcbk15X0xpYi5SZW5kZXJfVGFyZ2V0ID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpXHJcbntcclxuXHR0aGlzLnRhcmdldCA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlclRhcmdldCggXHJcblx0d2lkdGgsIFxyXG5cdGhlaWdodCwgXHJcblx0eyBcclxuXHRcdG1pbkZpbHRlcjogVEhSRUUuTGluZWFyRmlsdGVyLCBcclxuXHRcdG1hZ0ZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlciwgXHJcblx0XHRmb3JtYXQ6IFRIUkVFLlJHQkZvcm1hdCBcclxuXHR9ICk7IFxyXG5cdFxyXG5cdHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDgwLCB3aWR0aC9oZWlnaHQsIDAuMSwgMTAwMCk7XHJcbn1cclxuXHJcbk15X0xpYi5SZW5kZXJfVGFyZ2V0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoc2NlbmUsIHJlbmRlcmVyKVxyXG57XHJcblx0cmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgXHJcblx0XHR0aGlzLmNhbWVyYSwgXHJcblx0XHR0aGlzLnRhcmdldCwgXHJcblx0XHR0cnVlICAvL2ZvcmNlQ2xlYXJcclxuXHRcdCk7XHJcbn1cclxuXHJcblxyXG5NeV9MaWIuY3JlYXRlX292ZXJsYXlfY2FtZXJhID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpXHJcbntcclxuXHR2YXIgY2FtZXJhID0gIG5ldyBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEoIFxyXG5cdFx0d2lkdGggLyAtIDIsIFxyXG5cdFx0d2lkdGggLyAyLCBcclxuXHRcdGhlaWdodCAvIDIsIFxyXG5cdFx0aGVpZ2h0IC8tIDIsIC0xMDAwMCwgMTAwMDAgKTtcclxuXHRyZXR1cm4gY2FtZXJhO1xyXG59XHJcblxyXG5NeV9MaWIuT3ZlcmxheSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KVxyXG57XHJcblx0dGhpcy5jYW1lcmEgPSBNeV9MaWIuY3JlYXRlX292ZXJsYXlfY2FtZXJhKHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcblxyXG5NeV9MaWIuT3ZlcmxheS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlcmVyKVxyXG57XHJcblx0aWYgKCF0aGlzLnNjZW5lKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdFxyXG5cdHJlbmRlcmVyLmF1dG9DbGVhciA9IGZhbHNlO1xyXG5cdHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XHJcblx0cmVuZGVyZXIuYXV0b0NsZWFyID0gdHJ1ZTtcclxufVxyXG5cclxuXHJcbk15X0xpYi5Nb3VzZV9Db250cm9sbGVyID0gZnVuY3Rpb24gKHJvb3QsIG92ZXIsIGNsaWNrLCBjYWxsYmFjaylcclxue1xyXG5cdHRoaXMucm9vdCA9IHJvb3Q7XHJcblx0dGhpcy5vdmVyID0gb3ZlcjtcclxuXHR0aGlzLmNsaWNrID0gISFjbGljaztcclxuXHR0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbn1cclxuXHJcblxyXG5cclxuLypcclxudWdseSBoYWNrXHJcbiovXHJcblxyXG5NeV9MaWIuZXZlbnRfaHViID0gbmV3IEV2ZW50X0h1YigpO1xyXG5cclxuZnVuY3Rpb24gRXZlbnRfSHViKCkge1xyXG4gICAgdGhpcy5ldmVudHMgPSB7fTtcclxufVxyXG5cclxuXHJcblxyXG5FdmVudF9IdWIucHJvdG90eXBlLmFkZF9ldmVudF9saXN0ZW5lciA9IGZ1bmN0aW9uIChuYW1lLCBmdW5jLCBvYmopXHJcbntcclxuICAgIGlmICghdGhpcy5ldmVudHNbbmFtZV0pIHtcclxuICAgICAgICB0aGlzLmV2ZW50c1tuYW1lXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ldmVudHNbbmFtZV0ucHVzaCgge25hbWU6IG5hbWUsIGZ1bmM6IGZ1bmMsIG9iajogb2JqfSApO1xyXG59XHJcblxyXG5FdmVudF9IdWIucHJvdG90eXBlLm9uICA9IEV2ZW50X0h1Yi5wcm90b3R5cGUuYWRkX2V2ZW50X2xpc3RlbmVyO1xyXG5cclxuRXZlbnRfSHViLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24obmFtZSwgb2JqKVxyXG57XHJcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5ldmVudHNbbmFtZV07XHJcbiAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdCA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgdC5mdW5jLmNhbGwodC5vYmosIG9iaik7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxudmFyIHJ1bl9mdW5jdGlvbiA9IC8vd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuXHRmdW5jdGlvbihjYWxsYmFjayl7XHJcblx0XHR3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuXHR9XHJcblxyXG5cclxuTXlfTGliLmNyZWF0ZV9ydW5fZnVuY3Rpb24gPSBmdW5jdGlvbiAoYXBwKSBcclxue1xyXG4gICAgTXlfTGliLnJ1biA9IGZ1bmN0aW9uICgpIHsgcnVuX2Z1bmN0aW9uKCBmdW5jdGlvbiAoKSB7IGFwcC5sb29wKCk7IH0pOyB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbk15X0xpYi5FdWxlcl9Db250cm9sbGVyID0gZnVuY3Rpb24gKG9iaiwgeCwgeSwgeilcclxue1xyXG5cdHRoaXMub2JqID0gb2JqO1xyXG5cdHRoaXMueHNwZWVkID0geCAqIE1hdGguUEkgLyAxODA7O1xyXG5cdHRoaXMueXNwZWVkID0geSAqIE1hdGguUEkgLyAxODA7O1xyXG5cdHRoaXMuenNwZWVkID0geiAqIE1hdGguUEkgLyAxODA7O1xyXG59XHJcblxyXG5NeV9MaWIuRXVsZXJfQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KVxyXG57XHJcblx0dGhpcy5vYmoucm90YXRpb24ueCArPSB0aGlzLnhzcGVlZCAqIGR0O1xyXG5cdHRoaXMub2JqLnJvdGF0aW9uLnkgKz0gdGhpcy55c3BlZWQgKiBkdDtcclxuXHR0aGlzLm9iai5yb3RhdGlvbi56ICs9IHRoaXMuenNwZWVkICogZHQ7XHJcbn1cclxuXHJcbi8vQ2xhc3MgTGlicmFyeVxyXG5NeV9MaWIuUmVnaXN0ZXJlZF9DbGFzc2VzID0ge307XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MgPSBmdW5jdGlvbiAobmFtZSwgZnVuYylcclxue1xyXG5cdGlmIChNeV9MaWIuUmVnaXN0ZXJlZF9DbGFzc2VzW25hbWVdKXtcclxuXHRcdGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgQ2xhc3MgRVJST1IhIENsYXNzIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzIVwiLCBuYW1lKTtcclxuXHR9XHJcblx0TXlfTGliLlJlZ2lzdGVyZWRfQ2xhc3Nlc1tuYW1lXSA9IGZ1bmM7XHJcbn1cclxuXHJcbk15X0xpYi5HZXRfQ2xhc3MgPSBmdW5jdGlvbiAobmFtZSlcclxue1xyXG5cdHJldHVybiBNeV9MaWIuUmVnaXN0ZXJlZF9DbGFzc2VzW25hbWVdO1xyXG59XHJcblxyXG5cclxuTXlfTGliLmNyZWF0ZV9jbGFzcyA9IGZ1bmN0aW9uKHBhcmVudCwgY2hpbGQsIHByb3BzLCBuYW1lKVxyXG57XHJcbiAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgY2hpbGQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQucHJvdG90eXBlKTtcclxuICAgIH0gXHJcbiAgICBfLmNvcHlfb2JqZWN0KGNoaWxkLnByb3RvdHlwZSwgcHJvcHMpO1xyXG4gICAgY2hpbGQucHJvdG90eXBlLmNvbnRydWN0b3IgPSBjaGlsZDsgICAgICAgICAgICAgICAgXHJcbiAgICBNeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoY2hpbGQsIG5hbWUpO1xyXG59XHJcblxyXG5NeV9MaWIuQWJzdHJhY3RfRmFicmljID0gZnVuY3Rpb24gKGRhdGEpXHJcbntcclxuICAgIHZhciBjb25zdHJ1Y3RvciA9IE15X0xpYi5HZXRfQ2xhc3MoZGF0YS50eXBlKTtcclxuICAgIGlmIChjb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgIHZhciBvYmplY3QgPSBuZXcgY29uc3RydWN0b3IoKTtcclxuICAgICAgICBvYmplY3QucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbk15X0xpYi5QcmludF9DbGFzc2VzID0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgZm9yKHZhciBrZXkgaW4gdGhpcy5SZWdpc3RlcmVkX0NsYXNzZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNsYXNzIHJlZ2lzdGVyZWQgOlwiLCBrZXksIHRoaXMuUmVnaXN0ZXJlZF9DbGFzc2VzW2tleV0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgTXlfTGliIH07XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmFzZS9teV9saWIuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5cclxuLy9iYXNlIGNsYXNzIGZvciBwYXJ0aWNsZSBhZmZlY3RvclxyXG5mdW5jdGlvbiBQYXJ0aWNsZV9BZmZlY3RvcigpXHJcbntcclxuICAgIHRoaXMuaWQgPSBfLmdlbmVyYXRlVVVJRCgpO1xyXG59XHJcblxyXG5cclxuUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLmFmZmVjdCA9IGZ1bmN0aW9uIChkdCwgcGRhdGEsIHZlcnQsIGNvbG9yKVxyXG57XHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcblBhcnRpY2xlX0FmZmVjdG9yLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoY2hpbGQpXHJcbntcclxuXHRpZiAoY2hpbGQpIHtcclxuXHRcdHJldHVybiB7fTtcclxuXHR9XHJcblx0dmFyIGRhdGEgPSB7XHJcbiAgICAgICAgaWQ6IHRoaXMuaWQsXHJcblx0XHRcIm5hbWVcIjogXCJQYXJ0aWNsZV9BZmZlY3RvclwiLFxyXG5cdFx0cGFyYW1zIDoge31cclxuXHR9O1xyXG4gICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgIH1cclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG5cclxuUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKGpzb24pXHJcbntcclxufVxyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiUGFydGljbGVfQWZmZWN0b3JcIiwgUGFydGljbGVfQWZmZWN0b3IpO1xyXG5cclxuZnVuY3Rpb24gRm9yY2VfQWZmZWN0b3IoKVxyXG57XHJcbiAgICBQYXJ0aWNsZV9BZmZlY3Rvci5jYWxsKHRoaXMpO1xyXG5cdHRoaXMuZm9yY2VzID0gbmV3IEFycmF5KCk7XHJcbn1cclxuXHJcbkZvcmNlX0FmZmVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlKTtcclxuXHJcbl8uY29weV9vYmplY3QoRm9yY2VfQWZmZWN0b3IucHJvdG90eXBlLCB7XHJcblx0Y29uc3RydWN0b3I6IEZvcmNlX0FmZmVjdG9yLFxyXG5cdGFkZF9mb3JjZTogZnVuY3Rpb24gKGZvcmNlKVxyXG5cdHtcclxuXHRcdHRoaXMuZm9yY2VzLnB1c2goZm9yY2UpO1xyXG5cdH0sXHJcblx0YXBwbHlfZm9yY2VzOiBmdW5jdGlvbiAoZHQsIHBhcnRpY2xlLCB2ZXJ0LCBjb2xvcilcclxuXHR7XHJcblx0XHR2YXIgYWNjZWxlcmF0aW9uID0ge3g6MCwgeTowLCB6OjB9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZm9yY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMuZm9yY2VzW2ldLmNhbGMoZHQsIHBhcnRpY2xlLCBhY2NlbGVyYXRpb24pO1xyXG5cdFx0fVxyXG5cdFx0Ly9pbnRlZ3JhdGVcclxuXHRcdHBhcnRpY2xlLnZlbG9jaXR5LnggKz0gYWNjZWxlcmF0aW9uLnggKiBkdDtcclxuXHRcdHBhcnRpY2xlLnZlbG9jaXR5LnkgKz0gYWNjZWxlcmF0aW9uLnkgKiBkdDtcclxuXHRcdHBhcnRpY2xlLnZlbG9jaXR5LnogKz0gYWNjZWxlcmF0aW9uLnogKiBkdDtcclxuXHR9LFxyXG5cdGFmZmVjdDogZnVuY3Rpb24gKGR0LCBwYXJ0aWNsZSwgdmVydCwgY29sb3IpXHJcblx0e1xyXG5cdFx0dGhpcy5hcHBseV9mb3JjZXMoZHQsIHBhcnRpY2xlLCB2ZXJ0LCBjb2xvcik7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9LFxyXG5cdHRvSlNPTjogZnVuY3Rpb24gKGNoaWxkKVxyXG5cdHtcclxuXHRcdHZhciBkYXRhID0ge307XHJcblx0XHRkYXRhLm5hbWUgPSBcIkZvcmNlX0FmZmVjdG9yXCI7XHRcdFxyXG4gICAgICAgIGRhdGEudXVpZCA9IHRoaXMudXVpZDtcclxuXHRcdGRhdGEucGFyYW1zID0gUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMsIHRoaXMpO1xyXG5cdFx0aWYgKHRoaXMuZm9yY2VzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0ZGF0YS5wYXJhbXMuZm9yY2VzID0gbmV3IEFycmF5KCk7XHJcblx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmZvcmNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGRhdGEucGFyYW1zLmZvcmNlcy5wdXNoKCB0aGlzLmZvcmNlc1tpXS50b0pTT04oKSApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9LFxyXG5cdHBhcnNlOiBmdW5jdGlvbiAoanNvbilcclxuXHR7XHJcblx0XHR2YXIgZiwgaXRlbTtcclxuXHRcdGlmIChqc29uLmZvcmNlcykge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRmb3IodmFyIGkgPTA7IGkgPCBqc29uLmZvcmNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGl0ZW0gPSBqc29uLmZvcmNlc1tpXTtcclxuXHRcdFx0XHRmID0gTXlfTGliLkdldF9DbGFzcyhpdGVtLm5hbWUpO1xyXG5cdFx0XHRcdGlmIChmKSB7XHJcblx0XHRcdFx0XHRmID0gbmV3IGYoKTtcclxuXHRcdFx0XHRcdGYucGFyc2UoaXRlbSk7XHJcblx0XHRcdFx0XHR0aGlzLmFkZF9mb3JjZShmKTtcclxuXHRcdFx0XHR9IFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIkZvcmNlX0FmZmVjdG9yXCIsIEZvcmNlX0FmZmVjdG9yKTtcclxuXHJcbmV4cG9ydCB7IFBhcnRpY2xlX0FmZmVjdG9yLCBGb3JjZV9BZmZlY3RvciB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVfYWZmZWN0b3IuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5cclxuLy9CYXNlIGNsYXNzIGZvciBQYXJ0aWNsZSBFbWl0dGVyc1xyXG5mdW5jdGlvbiBQYXJ0aWNsZV9FbWl0dGVyKGVtaXRfcGVyX3NlY29uZClcclxue1xyXG4gICAgdGhpcy51dWlkID0gXy5nZW5lcmF0ZVVVSUQoKTtcclxuICAgIHRoaXMubmFtZSA9ICcnO1xyXG5cdHRoaXMuZW1pdF9kZWx0YSA9IDA7XHJcblx0dGhpcy5lbWl0X2NvdW50ID0gMDtcclxuXHR0aGlzLmVtaXRfcGVyX3NlY29uZCA9IGVtaXRfcGVyX3NlY29uZCB8fCA1O1xyXG5cdC8vbGluZWFyIGludGVycG9sYXRpb24gPSBtaW4gKyByYW5kb20gKiAobWF4LW1pbilcdFxyXG5cdHRoaXMubGlmZXRpbWUgPSB7XCJtaW5cIjogMCwgXCJtYXhcIjoyLjB9O1xyXG59XHJcblxyXG5QYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS5lbWl0X2xpZmUgPSBmdW5jdGlvbiAoKVxyXG57XHJcblx0cmV0dXJuIHRoaXMubGlmZXRpbWUubWluICsgTWF0aC5yYW5kb20oKSAqICh0aGlzLmxpZmV0aW1lLm1heCAtIHRoaXMubGlmZXRpbWUubWluKTtcclxufVxyXG5cclxuUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUuY2FsY19lbWl0dGVkX3BhcnRpY2xlcyA9IGZ1bmN0aW9uIChkdClcclxue1xyXG5cdC8vY291bnQgcGFydGljbGVzIG5lZWQgZW1pdFxyXG5cdHRoaXMuZW1pdF9kZWx0YSArPSB0aGlzLmVtaXRfcGVyX3NlY29uZCpkdDtcclxuXHR2YXIgbmVlZF9lbWl0ID0gTWF0aC5mbG9vcih0aGlzLmVtaXRfZGVsdGEpO1xyXG5cdGlmIChuZWVkX2VtaXQgPiAwKSB7XHJcblx0XHR0aGlzLmVtaXRfZGVsdGEgLT0gbmVlZF9lbWl0O1xyXG5cdFx0Ly90aGlzLmVtaXRfY291bnQgKz0gbmVlZF9lbWl0O1xyXG5cdFx0Ly9uZWVkX2VtaXQgPSB0aGlzLmVtaXRfY291bnQ7XHJcblx0fVxyXG5cdHJldHVybiBuZWVkX2VtaXQ7XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKHAsIGMsIG1hdHJpeClcclxue1xyXG4gICAgcC5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XHJcbiAgICBwLnZlbG9jaXR5LnNldCgwLCAxLCAwKTtcclxuICAgIFxyXG4gICAgaWYgKG1hdHJpeCkge1xyXG4gICAgICAgIHAucG9zaXRpb24uYXBwbHlNYXRyaXg0KG1hdHJpeCk7XHJcbiAgICAgICAgcC52ZWxvY2l0eS5hcHBseU1hdHJpeDRfcm90YXRpb24obWF0cml4KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIChjaGlsZClcclxue1xyXG5cdHZhciBwYXJhbXMgPSB7XHJcbiAgICAgICAgXCJ1dWlkXCI6IHRoaXMudXVpZCxcclxuXHRcdFwiZW1pdF9wZXJfc2Vjb25kXCI6IHRoaXMuZW1pdF9wZXJfc2Vjb25kLFxyXG5cdFx0XCJsaWZldGltZVwiOiB7XHJcblx0XHRcdFwibWluXCI6IHRoaXMubGlmZXRpbWUubWluLFxyXG5cdFx0XHRcIm1heFwiOiB0aGlzLmxpZmV0aW1lLm1heFxyXG5cdFx0fSxcclxuXHR9O1xyXG4gICAgaWYgKHRoaXMubmFtZSkge1xyXG4gICAgICAgIHBhcmFtcy5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgfVxyXG5cdGlmIChjaGlsZCkge1xyXG5cdFx0cmV0dXJuIHBhcmFtcztcclxuXHR9XHJcblx0dmFyIGRhdGEgPSB7fTtcclxuXHRkYXRhLm5hbWUgPSBcIlBhcnRpY2xlX0VtaXR0ZXJcIjtcclxuXHRkYXRhLnBhcmFtcyA9IHBhcmFtcztcdFxyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChkYXRhKVxyXG57XHJcblx0dGhpcy5lbWl0X3Blcl9zZWNvbmQgPSBkYXRhLmVtaXRfcGVyX3NlY29uZDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMudXVpZCA9IGRhdGEudXVpZCB8fCBfLmdlbmVyYXRlVVVJRCgpO1xyXG5cdF8uY29weV9vYmplY3QodGhpcy5saWZldGltZSwgZGF0YS5saWZldGltZSk7XHJcbn1cclxuXHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIlBhcnRpY2xlX0VtaXR0ZXJcIiwgUGFydGljbGVfRW1pdHRlcik7XHJcblxyXG5leHBvcnQgeyBQYXJ0aWNsZV9FbWl0dGVyIH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVfZW1pdHRlci5qcyIsIiAgICBcclxuZnVuY3Rpb24gUGFydGljbGVzX1BvaW50cyAoZ2VvbWV0cnksIG1hdGVyaWFsKVxyXG57XHJcbiAgICBUSFJFRS5Qb2ludHMuY2FsbCh0aGlzLCBnZW9tZXRyeSwgbWF0ZXJpYWwpO1xyXG4gICAgdGhpcy50eXBlID0gJ3BhcnRpY2xlc19wb2ludHMnO1xyXG4gICAgXHJcbiAgICB0aGlzLmJvdW5kaW5nU3BoZXJlID0gbmV3IFRIUkVFLlNwaGVyZSgpO1xyXG4gICAgdGhpcy5ib3VuZGluZ1NwaGVyZS5yYWRpdXMgPSAxMC4wO1xyXG59XHJcblxyXG5QYXJ0aWNsZXNfUG9pbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRIUkVFLlBvaW50cy5wcm90b3R5cGUgKVxyXG5cclxuUGFydGljbGVzX1BvaW50cy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQYXJ0aWNsZXNfUG9pbnRzO1xyXG5cclxuUGFydGljbGVzX1BvaW50cy5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKG1ldGEpXHJcbntcclxuICAgIHZhciBtYXQgPSB0aGlzLm1hdGVyaWFsO1xyXG4gICAgdmFyIGdlb20gPSB0aGlzLmdlb21ldHJ5O1xyXG4gICAgdGhpcy5tYXRlcmlhbCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZ2VvbWV0cnkgPSB1bmRlZmluZWQ7XHJcbiAgICB2YXIgb2JqZWN0ID0gIFRIUkVFLk9iamVjdDNELnByb3RvdHlwZS50b0pTT04uY2FsbCh0aGlzLCBtZXRhKTtcclxuICAgIHRoaXMubWF0ZXJpYWwgPSBtYXQ7XHJcbiAgICB0aGlzLmdlb21ldHJ5ID0gZ2VvbTtcclxuICAgIHJldHVybiBvYmplY3Q7XHJcbn1cclxuXHJcblBhcnRpY2xlc19Qb2ludHMucHJvdG90eXBlLnJheWNhc3QgPSBmdW5jdGlvbiAocmF5Y2FzdGVyLCBpbnRlcnNlY3RzKVxyXG57XHJcbiAgICB2YXIgc3BoZXJlID0gbmV3IFRIUkVFLlNwaGVyZSgpXHJcbiAgICBzcGhlcmUuY29weSggdGhpcy5ib3VuZGluZ1NwaGVyZSApO1xyXG4gICAgc3BoZXJlLmFwcGx5TWF0cml4NCggdGhpcy5tYXRyaXhXb3JsZCApOyBcclxuICAgIHZhciByID0gcmF5Y2FzdGVyLnJheS5pbnRlcnNlY3RzU3BoZXJlKCBzcGhlcmUgKTtcclxuICAgIGlmICggciA9PT0gZmFsc2UgKSByZXR1cm47XHJcbiAgICBjb25zb2xlLmxvZyhcIklOVEVSU0VDVElPTjFcIiwgdGhpcy5uYW1lLCBzcGhlcmUpO1xyXG4gICAgcmV0dXJuO1xyXG4gICAgXHJcbiAgICB2YXIgc2hpdCAgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgc2hpdC5jb3B5KHRoaXMucG9zaXRpb24pO1xyXG4gICAgdmFyIHRyID0gbmV3IFRIUkVFLlJheSggbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMjApLCBzaGl0KTtcclxuICAgIGNvbnNvbGUubG9nKFwidGVzdCBcIiwgdHIuaW50ZXJzZWN0c1NwaGVyZShzcGhlcmUpLCBzcGhlcmUpO1xyXG4gICAgY29uc29sZS5sb2coXCJoaXQgc3BoZXJlIFwiICArIHRoaXMubmFtZSwgc3BoZXJlLCByYXljYXN0ZXIucmF5KTtcclxuICAgIHJldHVybiByYXljYXN0ZXIucmF5LmludGVyc2VjdHNTcGhlcmUoIHNwaGVyZSApO1xyXG4gICAgXHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKFwiaGl0IHNwaGVyZSBcIiArIHRoaXMudHlwZSwgXCJzaHBlcmUgaXMgXCIsIHNwaGVyZSwgXCJyYXkgaXMgXCIsIHIpO1xyXG4gICAgaWYgKHIpIHtcclxuICAgICAgICAgICAgdmFyIHRtcCA9IG5ldyBUSFJFRS5WZWN0b3IzKHRoaXMucG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0bXAuc3ViKHIpO1xyXG4gICBcdFx0XHRpbnRlcnNlY3RzLnB1c2goIHtcclxuXHRcdFx0XHRkaXN0YW5jZTogTWF0aC5zcXJ0KCB0bXAuZG90KHRtcCkgKSxcclxuXHRcdFx0XHRwb2ludDogdGhpcy5wb3NpdGlvbixcclxuXHRcdFx0XHRvYmplY3Q6IHRoaXNcclxuXHRcdFx0fSApOyBcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7UGFydGljbGVzX1BvaW50c307XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVzX3BvaW50cy5qcyIsImZ1bmN0aW9uIEV2ZW50X0h1YigpIHtcclxuICAgIHRoaXMuZXZlbnRzID0ge307XHJcbn1cclxuXHJcblxyXG5cclxuRXZlbnRfSHViLnByb3RvdHlwZS5hZGRfZXZlbnRfbGlzdGVuZXIgPSBmdW5jdGlvbiAobmFtZSwgZnVuYywgb2JqKVxyXG57XHJcbiAgICBpZiAoIXRoaXMuZXZlbnRzW25hbWVdKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHNbbmFtZV0gPSBbXTtcclxuICAgIH1cclxuICAgIHRoaXMuZXZlbnRzW25hbWVdLnB1c2goIHtuYW1lOiBuYW1lLCBmdW5jOiBmdW5jLCBvYmo6IG9ian0gKTtcclxufVxyXG5cclxuRXZlbnRfSHViLnByb3RvdHlwZS5vbiAgPSBFdmVudF9IdWIucHJvdG90eXBlLmFkZF9ldmVudF9saXN0ZW5lcjtcclxuXHJcbkV2ZW50X0h1Yi5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKG5hbWUsIG9iailcclxue1xyXG4gICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZXZlbnRzW25hbWVdO1xyXG4gICAgaWYgKGxpc3RlbmVycykge1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHQgPSBsaXN0ZW5lcnNbaV07XHJcbiAgICAgICAgICAgIHQuZnVuYy5jYWxsKHQub2JqLCBvYmopOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxudmFyIG1haW5fZXZlbnRfaHViID0gbmV3IEV2ZW50X0h1YigpO1xyXG5cclxuZXhwb3J0IHttYWluX2V2ZW50X2h1YiwgRXZlbnRfSHVifTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmFzZS9ldmVudF9odWIuanMiLCJ2YXIgTW91c2VfSW50ZXJzZWN0b3IgPSB7fTtcclxuXHJcbk1vdXNlX0ludGVyc2VjdG9yLm1vdXNlX2Nvb3Jkc190b192ZWN0b3IgPSBmdW5jdGlvbiAoY2FudmFzLCBldmVudCkgXHJcbntcclxuXHR2YXIgb2Zmc2V0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdHZhciB3aWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcclxuXHR2YXIgaGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcclxuICAgIC8vbm9ybWFsaXplIGNvb3JkaW5hdGVzXHJcbiAgICB2YXIgeCA9IChldmVudC5jbGllbnRYIC0gb2Zmc2V0LmxlZnQpIC8gd2lkdGg7XHJcbiAgICB2YXIgeSA9IChldmVudC5jbGllbnRZIC0gb2Zmc2V0LnRvcCkgLyBoZWlnaHQ7XHJcblx0dmFyIHggPSB4ICogMiAtIDE7XHJcblx0dmFyIHkgPSAtKHkgKiAyIC0gMSk7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwibW91c2UgY29vcmRzXCIsICB4LHksICk7ICAgIFxyXG5cdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMyggeCwgeSwgMSApO1xyXG5cdHJldHVybiB2ZWN0b3I7XHJcbn1cclxuXHJcblxyXG5Nb3VzZV9JbnRlcnNlY3Rvci51bnByb2plY3QgPSBmdW5jdGlvbih2ZWN0b3IsIGNhbWVyYSlcclxue1xyXG4gICAgdmFyIHIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgci5jb3B5KHZlY3Rvcik7XHJcbiAgICByLnogPSAxO1xyXG5cdHIudW5wcm9qZWN0KGNhbWVyYSk7XHJcbiAgICByLmFwcGx5TWF0cml4NChjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlKTsgICAgXHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuTW91c2VfSW50ZXJzZWN0b3IubW91c2VfY29vcmRzX3RvX3JheSA9IGZ1bmN0aW9uIChjYW52YXMsIGV2ZW50LCBjYW1lcmEpIFxyXG57XHJcblx0dmFyIG9mZnNldCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHR2YXIgd2lkdGggPSBjYW52YXMuY2xpZW50V2lkdGg7XHJcblx0dmFyIGhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XHJcblx0dmFyIHggPSAoKGV2ZW50LmNsaWVudFggLSBvZmZzZXQubGVmdCkgLyB3aWR0aCkgKiAyIC0gMTtcclxuXHR2YXIgeSA9IC0oKChldmVudC5jbGllbnRZIC0gb2Zmc2V0LnRvcCkgLyBoZWlnaHQpICogMiAtIDEpO1xyXG5cdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMyggeCwgeSwgMSApO1xyXG5cclxuXHR2ZWN0b3IudW5wcm9qZWN0KGNhbWVyYSk7XHJcblx0dmFyIHJheSA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoIGNhbWVyYS5wb3NpdGlvbiwgdmVjdG9yLnN1YiggY2FtZXJhLnBvc2l0aW9uICkubm9ybWFsaXplKCkgKTtcclxuXHRyZXR1cm4gcmF5O1xyXG59XHJcblxyXG5cclxuXHJcbk1vdXNlX0ludGVyc2VjdG9yLmZpbmRfaW50ZXJzZWN0aW9uX3dpdGhfbW91c2VfdmVjdG9yID0gZnVuY3Rpb24odmVjdG9yLCBjYW1lcmEsIHNjZW5lKVxyXG57XHJcblx0dmVjdG9yLnVucHJvamVjdChjYW1lcmEpO1xyXG5cdHZhciByYXkgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKCBjYW1lcmEucG9zaXRpb24sIHZlY3Rvci5zdWIoIGNhbWVyYS5wb3NpdGlvbiApLm5vcm1hbGl6ZSgpICk7XHJcblx0Ly8gY3JlYXRlIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9iamVjdHMgaW4gdGhlIHNjZW5lIHdpdGggd2hpY2ggdGhlIHJheSBpbnRlcnNlY3RzXHJcblx0Ly92YXIgaW50ZXJzZWN0cyA9IHJheS5pbnRlcnNlY3RPYmplY3RzKCBbZ3JpZF90ZXh0LnJvb3RdLCB0cnVlICk7IFxyXG5cdC8vY29uc29sZS5sb2coZmFrZV9wbGFuZS5yb290LmNoaWxkcmVuWzBdLmdlb21ldHJ5KTtcclxuXHR2YXIgaW50ZXJzZWN0cyA9IHJheS5pbnRlcnNlY3RPYmplY3RzKCBbc2NlbmVdLCB0cnVlICk7IFxyXG5cdHJldHVybiBpbnRlcnNlY3RzO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgTW91c2VfSW50ZXJzZWN0b3IgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmFzZS9tb3VzZV9pbnRlcnNlY3Rvci5qcyIsInZhciBQYXJ0aWNsZV9TaGFkZXJzID0ge307XHJcblxyXG4oZnVuY3Rpb24gKCkgXHJcbntcclxuXHJcbi8vcGFydGljbGUgYXR0cmlidXRlczpcclxuLy9wb3NpdGlvblxyXG4vL2NvbG9yXHJcbi8vbGVmdCwgc2l6ZVxyXG52YXIgdmVydGV4X3NoYWRlciA9IFtcclxuLy8nYXR0cmlidXRlIHZlYzQgcG9zaXRpb247JyxcclxuJ2F0dHJpYnV0ZSB2ZWM0IGNvbG9yOycsXHJcbidhdHRyaWJ1dGUgZmxvYXQgcGFyYW1zOycsXHJcbid2YXJ5aW5nIHZlYzQgdmNvbG9yOycsXHJcbid1bmlmb3JtIGZsb2F0IGxpZmV0aW1lOycsXHJcbid1bmlmb3JtIGZsb2F0IHBvaW50X3NpemU7JyxcclxuJ3VuaWZvcm0gdmVjMiBzY3JlZW5fc2l6ZTsnLFxyXG4nI2lmbmRlZiBEWU5BTUlDX0NPTE9SUycsXHJcbiAgICAndW5pZm9ybSB2ZWMzIHBhcnRpY2xlX2NvbG9yOycsXHJcbicjZW5kaWYnLFxyXG4ndm9pZCBtYWluICgpIHsnLFxyXG5cdCdnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiB2aWV3TWF0cml4ICogdmVjNCggcG9zaXRpb24sIDEuMCApOycsXHJcbicjaWZkZWYgRFlOQU1JQ19DT0xPUlMnLFxyXG5cdCd2Y29sb3IucmdiID0gY29sb3IucmdiOycsXHJcbicjZWxzZScsXHJcbiAgICAndmNvbG9yLnJnYiA9IHBhcnRpY2xlX2NvbG9yLnJnYjsnLFxyXG4nI2VuZGlmJyxcclxuJyNpZmRlZiBOT19GQURFX0NPTE9SJyxcclxuXHQndmNvbG9yLmEgPSAxLjA7JyxcclxuJyNlbHNlJyxcclxuXHQvL3BhcmFtcyBjb250YWlucyBsaWZlIGxlbmd0aCB3aGljaCBkZWNyZWFzZWQgYnkgdGltZVxyXG5cdCdmbG9hdCB0bXAgPSBwYXJhbXMgLyBsaWZldGltZTsnLFxyXG5cdCd0bXAgPSBtaW4odG1wLCAxLjApOycsXHRcclxuXHQndmNvbG9yLmEgPSB0bXA7JyxcclxuJyNlbmRpZicsXHJcblx0J2Zsb2F0IHQgPSAgc2NyZWVuX3NpemUueSogcHJvamVjdGlvbk1hdHJpeFsxXVsxXSAvIGdsX1Bvc2l0aW9uLnc7JyxcclxuXHQndCA9IHQgKiBwb2ludF9zaXplOycsXHJcblx0J2lmIChwYXJhbXMgPiAwLjApIHsnLFxyXG5cdFx0J2dsX1BvaW50U2l6ZSA9IHQ7JyxcclxuXHQnfScsXHJcblx0J2Vsc2UgeycsXHJcblx0XHQvLyd2Y29sb3IuYSA9IDAuMDsnLFxyXG5cdFx0J2dsX1BvaW50U2l6ZSA9IDAuMDsnLFxyXG5cdCd9JyxcclxuJ30nXHJcbl07XHJcblxyXG52YXIgZnJhZ21lbnRfc2hhZGVyID0gW1xyXG5cdCd2YXJ5aW5nIHZlYzQgdmNvbG9yOycsXHJcblx0JyNpZmRlZiBQQVJUSUNMRV9URVhUVVJFJyxcclxuXHRcdCd1bmlmb3JtIHNhbXBsZXIyRCBzcHJpdGU7JyxcclxuXHQnI2VuZGlmJyxcclxuXHQndm9pZCBtYWluKCkgeycsXHJcblx0JyNpZmRlZiBQQVJUSUNMRV9URVhUVVJFJyxcclxuXHRcdCd2ZWM0IHRleCA9IHRleHR1cmUyRCggc3ByaXRlLCBnbF9Qb2ludENvb3JkICk7JyxcclxuXHRcdCd2ZWMzIGZyYWdtZW50X2NvbG9yID0gdGV4LnJnYjsnLFxyXG5cdFx0J2ZyYWdtZW50X2NvbG9yLnJnYiAqPSB2Y29sb3IucmdiOycsXHJcblx0XHQnZmxvYXQgYWxwaGEgPSB0ZXguYTsnLFx0XHJcblx0JyNlbHNlJyxcclxuXHRcdCd2ZWMzIGZyYWdtZW50X2NvbG9yID0gdmNvbG9yLnJnYjsnLFxyXG5cdFx0J2Zsb2F0IGFscGhhID0gMS4wOycsXHJcblx0JyNlbmRpZicsXHJcblx0JyNpZmRlZiBQUkVfQUxQSEEnLFxyXG5cdFx0J2ZyYWdtZW50X2NvbG9yLnJnYiAqPSBhbHBoYTsnLFxyXG5cdCcjZW5kaWYnLFxyXG5cdCcjaWZuZGVmIE5PX0ZBREVfQ09MT1InLFxyXG5cdFx0J2Zsb2F0IGZyYWdtZW50X2FscGhhID0gYWxwaGEgKiB2Y29sb3IuYTsnLFxyXG5cdCcjZWxzZScsXHJcblx0XHQnZmxvYXQgZnJhZ21lbnRfYWxwaGEgPSBhbHBoYTsnLFxyXG5cdCcjZW5kaWYnLFxyXG5cdFx0J2dsX0ZyYWdDb2xvciA9IHZlYzQoZnJhZ21lbnRfY29sb3IucmdiLCBmcmFnbWVudF9hbHBoYSk7JyxcclxuXHQnfScsXHJcbl07XHJcblxyXG5QYXJ0aWNsZV9TaGFkZXJzLnZlcnRleCA9IHZlcnRleF9zaGFkZXIuam9pbiggJ1xcbicgKTtcclxuUGFydGljbGVfU2hhZGVycy5mcmFnbWVudCA9IGZyYWdtZW50X3NoYWRlci5qb2luKCAnXFxuJyApO1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9TaGFkZXJzfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFydGljbGVzL3BhcnRpY2xlX3NoYWRlcnMuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0VtaXR0ZXJ9IGZyb20gJy4vcGFydGljbGVfZW1pdHRlci5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVfQWZmZWN0b3J9IGZyb20gJy4vcGFydGljbGVfYWZmZWN0b3IuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlc19Qb2ludHN9IGZyb20gJy4vcGFydGljbGVzX3BvaW50cy5qcyc7XHJcbmltcG9ydCB7UGFydGljbGVfU2hhZGVyc30gZnJvbSAnLi9wYXJ0aWNsZV9zaGFkZXJzLmpzJztcclxuXHJcblxyXG5mdW5jdGlvbiBQYXJ0aWNsZV9TeXN0ZW0ocGFyYW1zKVxyXG57XHJcbiAgICB0aGlzLnV1aWQgPSBfLmdlbmVyYXRlVVVJRCgpOyAgICBcclxuXHJcbiAgICAvL3Jlc3RyaWN0ZWQgcGFyYW1zXHJcblx0aWYgKCFwYXJhbXMuZW1pdHRlcikge1xyXG5cdFx0cGFyYW1zLmVtaXR0ZXIgPSBuZXcgUGFydGljbGVfRW1pdHRlcigxKTtcclxuXHR9XHJcblx0aWYgKCFwYXJhbXMuYWZmZWN0b3IpIHtcclxuXHRcdHBhcmFtcy5hZmZlY3RvciA9IG5ldyBQYXJ0aWNsZV9BZmZlY3RvcigpO1xyXG5cdH1cclxuICAgIHBhcmFtcy5ub19mYWRlX2NvbG9yID0gISFwYXJhbXMubm9fZmFkZV9jb2xvcjsgICAgXHJcbiAgICBwYXJhbXMucGFydGljbGVfbGlmZXRpbWUgPSBwYXJhbXMucGFydGljbGVfbGlmZXRpbWUgfHwgMy4wO1xyXG4gICAgXHJcblx0aWYgKHR5cGVvZiBwYXJhbXMucHJlX2FscGhhID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0cGFyYW1zLnByZV9hbHBoYSA9IHRydWU7XHJcblx0fVxyXG5cdFxyXG5cdGlmICh0eXBlb2YgcGFyYW1zLmRlcHRoX3Rlc3QgPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRwYXJhbXMuZGVwdGhfdGVzdCA9IHRydWU7XHJcblx0fVxyXG5cdFxyXG5cdGlmIChwYXJhbXNbXCJkZXB0aF93cml0ZVwiXSA9PT0gdW5kZWZpbmVkKXtcclxuXHRcdHBhcmFtcy5kZXB0aF93cml0ZSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aWYgKCFwYXJhbXMuY29sb3IpIHtcclxuXHRcdHBhcmFtcy5jb2xvciAgPSB7XCJyXCI6MSwgXCJnXCI6MSwgXCJiXCI6MX07XHJcblx0fVxyXG4gICAgXHJcbiAgICBpZiAoIXBhcmFtcy5ibGVuZGluZykge1xyXG4gICAgICAgIHBhcmFtcy5ibGVuZGluZyA9IFwib25lX2FscGhhXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcGFyYW1zLnNpemUgPSBwYXJhbXMuc2l6ZSB8fCAxO1xyXG4gICAgXHJcbiAgICBpZiAoIXBhcmFtcy5jb3VudCkgcGFyYW1zLmNvdW50ID0gMTAwO1xyXG5cclxuICAgIFxyXG5cdHRoaXMuZW1pdHRlciA9IHBhcmFtcy5lbWl0dGVyO1xyXG5cdHRoaXMuYWZmZWN0b3IgPSBwYXJhbXMuYWZmZWN0b3I7ICAgIFxyXG4gICAgdGhpcy5uYW1lID0gcGFyYW1zLm5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLnBhcnRpY2xlX2xpZmV0aW1lID0gcGFyYW1zLnBhcnRpY2xlX2xpZmV0aW1lO1xyXG5cdHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG5cclxuICAgIFxyXG4gICAgdGhpcy50ZXh0dXJlID0gcGFyYW1zLnRleHR1cmU7XHJcblx0XHJcblx0dGhpcy5keW5hbWljX2NvbG9yID0gKCEhcGFyYW1zLmVuZF9jb2xvciB8fCAhIXBhcmFtcy5yYW5kb21fY29sb3IpO1xyXG5cclxuXHJcblx0dmFyIGNvdW50ID0gcGFyYW1zLmNvdW50O1xyXG5cdFxyXG5cdHRoaXMubWF0ZXJpYWwgPSB0aGlzLmNyZWF0ZV9wYXJ0aWNsZV9tYXRlcmlhbCgpO1xyXG5cdHRoaXMubm9kZSA9IG5ldyBQYXJ0aWNsZXNfUG9pbnRzKHRoaXMuY3JlYXRlX3BhcnRpY2xlX2dlb21ldHJ5KGNvdW50KSwgdGhpcy5tYXRlcmlhbCk7XHJcbiAgICB0aGlzLm5vZGUubmFtZSA9IHRoaXMubmFtZTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMucGFyYW1zLmJvdW5kaW5nX3NwaGVyZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYm91bmRpbmdTcGhlcmUucmFkaXVzID0gcGFyYW1zLmJvdW5kaW5nX3NwaGVyZTtcclxuICAgIH1cclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfbmFtZSA9IGZ1bmN0aW9uIChuYW1lKVxyXG57XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ub2RlLm5hbWUgPSBuYW1lO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnN1aWNpZGUgPSBmdW5jdGlvbiAoKVxyXG57XHJcblx0dGhpcy5ub2RlLnBhcmVudC5yZW1vdmUodGhpcy5ub2RlKTtcclxuICAgIG1haW5fZXZlbnRfaHViLmVtaXQoXCJraWxsX21lXCIsIHRoaXMpO1xyXG59XHJcblxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5jcmVhdGVfcGFydGljbGVfZGF0YSA9IGZ1bmN0aW9uIChjb3VudClcclxue1xyXG4gICAgdmFyIHBhcnRpY2xlX2RhdGEgPSBuZXcgQXJyYXkoY291bnQpO1xyXG4gICAgdmFyIHA7XHJcbiAgICBmb3IodmFyIGkgPTA7aSA8IGNvdW50OyBpKyspIHtcclxuXHRcdHAgPSB7fTtcclxuXHRcdHAucG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygwLDAsMCk7XHJcblx0XHRwLnZlbG9jaXR5ID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwwLDApO1xyXG5cdFx0cC5saWZldGltZSA9IDA7ICAgICAgICBcclxuXHRcdHBhcnRpY2xlX2RhdGFbaV0gPSBwO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wYXJ0aWNsZV9kYXRhID0gcGFydGljbGVfZGF0YTtcclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5jcmVhdGVfcGFydGljbGVfZ2VvbWV0cnkgPSBmdW5jdGlvbihjb3VudClcclxue1xyXG4gICAgdGhpcy5jcmVhdGVfcGFydGljbGVfZGF0YShjb3VudCk7XHJcbiAgICBcclxuXHR2YXIgdmVydGljZXMgPSBuZXcgRmxvYXQzMkFycmF5KGNvdW50ICogMyk7IC8vIHBvc2l0aW9uXHJcblx0dmFyIGNvbG9ycyA9IG5ldyBGbG9hdDMyQXJyYXkoY291bnQgKiAzKTtcclxuXHR2YXIgcGFyYW1zID0gbmV3IEZsb2F0MzJBcnJheShjb3VudCk7XHJcblx0XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuXHRcdC8vY3JlYXRlIHBhcnRpY2xlXHJcblx0XHR2ZXJ0aWNlc1tpKjNdID0gMDtcclxuXHRcdHZlcnRpY2VzW2kqMysxXSA9IDA7XHJcblx0XHR2ZXJ0aWNlc1tpKjMrMl0gPSAwO1xyXG5cclxuXHRcdHBhcmFtc1tpXSA9IDAuMDtcclxuXHJcblx0XHRjb2xvcnNbaSozXSA9IHRoaXMucGFyYW1zLmNvbG9yLnI7XHJcblx0XHRjb2xvcnNbaSozKzFdID0gdGhpcy5wYXJhbXMuY29sb3IuZztcclxuXHRcdGNvbG9yc1tpKjMrMl0gPSB0aGlzLnBhcmFtcy5jb2xvci5iO1xyXG5cdH1cclxuXHJcblx0dGhpcy5nZW9tZXRyeSA9IHt9O1xyXG5cdHRoaXMuZ2VvbWV0cnkudmVydGljZXMgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHZlcnRpY2VzLCAzKS5zZXREeW5hbWljKHRydWUpO1xyXG5cdHRoaXMuZ2VvbWV0cnkuY29sb3JzID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShjb2xvcnMsIDMpXHJcblx0aWYgKHRoaXMuZHluYW1pY19jb2xvcikge1xyXG5cdFx0dGhpcy5nZW9tZXRyeS5jb2xvcnMuc2V0RHluYW1pYyh0cnVlKTtcclxuXHR9XHJcblx0dGhpcy5nZW9tZXRyeS5wYXJhbXMgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBhcmFtcywgMSkuc2V0RHluYW1pYyh0cnVlKTtcclxuXHR2YXIgZ2VvbSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpOyBcdFxyXG5cdHRoaXMuZ2VvbWV0cnkuYnVmZmVyID0gZ2VvbTtcdFxyXG5cdGdlb20uYWRkQXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuZ2VvbWV0cnkudmVydGljZXMpO1xyXG5cdGdlb20uYWRkQXR0cmlidXRlKCdjb2xvcicsIHRoaXMuZ2VvbWV0cnkuY29sb3JzKTtcclxuXHRnZW9tLmFkZEF0dHJpYnV0ZSgncGFyYW1zJywgdGhpcy5nZW9tZXRyeS5wYXJhbXMpO1x0XHJcblxyXG4gICAgcmV0dXJuIGdlb207XHJcbn1cclxuXHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmdlbmVyYXRlX21hdGVyaWFsX25hbWUgPSBmdW5jdGlvbiAoKVxyXG57XHJcblx0dmFyIG15X25hbWUgPSBcIk1ZX1BBUlRJQ0xFX01BVEVSSUFMXCI7XHJcblx0aWYgKCEhdGhpcy50ZXh0dXJlKSB7XHJcblx0XHRteV9uYW1lICs9ICBcIl9XSVRIX1RFWFRVUkVcIjtcclxuXHR9XHJcblx0aWYgKHRoaXMucGFyYW1zLm5vX2ZhZGVfY29sb3IpIHtcclxuXHRcdG15X25hbWUgKz0gXCJfTk9fRkFERV9DT0xPUlwiO1xyXG5cdH1cclxuXHRyZXR1cm4gbXlfbmFtZTtcclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5ibGVuZGluZ19tb2RlID0gXHJcbntcclxuXHRcImFkZGl0aXZlXCI6IHtcclxuXHRcdFwiYmxlbmRTcmNcIjogVEhSRUUuT25lRmFjdG9yLFxyXG5cdFx0XCJibGVuZERzdFwiOiBUSFJFRS5PbmVGYWN0b3JcclxuXHR9LFxyXG5cdFwiYWxwaGFcIjoge1xyXG5cdFx0XCJibGVuZFNyY1wiOiBUSFJFRS5TcmNBbHBoYUZhY3RvcixcclxuXHRcdFwiYmxlbmREc3RcIjogVEhSRUUuT25lTWludXNTcmNBbHBoYUZhY3RvclxyXG5cdH0sXHJcblx0XCJvbmVfYWxwaGFcIjoge1xyXG5cdFx0XCJibGVuZFNyY1wiOiBUSFJFRS5PbmVGYWN0b3IsXHJcblx0XHRcImJsZW5kRHN0XCI6IFRIUkVFLk9uZU1pbnVzU3JjQWxwaGFGYWN0b3JcclxuXHR9LFxyXG5cdFwiYWxwaGFfb25lXCI6IHtcclxuXHRcdFwiYmxlbmRTcmNcIjogVEhSRUUuU3JjQWxwaGFGYWN0b3IsXHJcblx0XHRcImJsZW5kRHN0XCI6IFRIUkVFLk9uZUZhY3RvclxyXG5cdH1cclxufTtcclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuY29udmVydF9ibGVuZGluZ19tb2RlID0gZnVuY3Rpb24gKGJsZW5kaW5nKVxyXG57XHJcbiAgICB2YXIgdGhyZWVfYmxlbmRpbmc7XHJcblx0dmFyIGZhY3RvcnMgPSB0aGlzLmJsZW5kaW5nX21vZGVbXCJvbmVfYWxwaGFcIl07XHJcbiAgICBpZiAoYmxlbmRpbmcgPT09ICdubycpIHtcclxuICAgICAgICB0aHJlZV9ibGVuZGluZyA9IFRIUkVFLk5vQmxlbmRpbmc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocmVlX2JsZW5kaW5nID0gVEhSRUUuQ3VzdG9tQmxlbmRpbmc7ICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmJsZW5kaW5nX21vZGVbYmxlbmRpbmddKSB7XHJcbiAgICAgICAgICAgIGZhY3RvcnMgPSB0aGlzLmJsZW5kaW5nX21vZGVbYmxlbmRpbmddO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XCJibGVuZGluZ1wiOiB0aHJlZV9ibGVuZGluZywgXCJmYWN0b3JzXCI6ZmFjdG9yc307XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X3RleHR1cmUgPSBmdW5jdGlvbiAodGV4dHVyZSlcclxue1xyXG5cdGlmICh0eXBlb2YgdGV4dHVyZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbXMudGV4dHVyZSA9PT0gdGV4dHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFyYW1zLnRleHR1cmUgPSB0ZXh0dXJlO1xyXG5cdFx0dGhpcy50ZXh0dXJlID0gTXlfTGliLlRleHR1cmVfTWFuYWdlci5nZXQodGV4dHVyZSk7XHJcblx0fSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiT2ggU2hpdCEgdGV4dHVyZSBpbiBzZXRfdGV4dHVyZSBpcyBub3Qgc3RyaW5nISBpdCdzIG9iamVjdCBvciB1bmRlZmluZWQhXCIsIHRleHR1cmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnNwcml0ZSkge1xyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMuc3ByaXRlLnZhbHVlID0gdGhpcy50ZXh0dXJlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvL3RoaXMubWF0ZXJpYWwudW5pZm9ybXMuc3ByaXRlID0ge3ZhbHVlOiB0ZXh0dXJlfTtcclxuICAgICAgICB0aGlzLnJlY3JlYXRlX21hdGVyaWFsKCk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk9oIFNoaXQhIE91ciBzaGFkZXIgaGFzIG5vdCB0ZXh0dXJlISBOZWVkIGNyZWF0ZSBzaGFkZXIgd2l0aCB0ZXh0dXJlIVwiKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuY3JlYXRlX3VuaWZvcm1zID0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgdmFyIHVuaWZvcm1zID0gXHJcbiAgICB7XHJcbiAgICAgICAgXCJsaWZldGltZVwiOiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnBhcnRpY2xlX2xpZmV0aW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBvaW50X3NpemVcIjoge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wYXJhbXMuc2l6ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzY3JlZW5fc2l6ZVwiOiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yMihNeV9MaWIuVmlld3BvcnQud2lkdGgsIE15X0xpYi5WaWV3cG9ydC5oZWlnaHQpXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGlmICghIXRoaXMudGV4dHVyZSkge1xyXG4gICAgICAgIHVuaWZvcm1zW1wic3ByaXRlXCJdID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy50ZXh0dXJlXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGlmICghdGhpcy5keW5hbWljX2NvbG9yKSB7XHJcbiAgICAgICAgdW5pZm9ybXNbXCJwYXJ0aWNsZV9jb2xvclwiXSA9IHt2YWx1ZTogdGhpcy5wYXJhbXMuY29sb3J9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuaWZvcm1zO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmNhbGNfZGVmaW5lcyA9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHZhciBkZWZpbmVzID0ge307XHJcbiAgICBpZiAodGhpcy5wYXJhbXMucHJlX2FscGhhKSB7XHJcbiAgICAgICAgZGVmaW5lc1tcIlBSRV9BTFBIQVwiXSA9IHRydWU7XHJcbiAgICB9XHJcblx0aWYgKCEhdGhpcy50ZXh0dXJlKSB7XHJcbiAgICAgICAgZGVmaW5lc1tcIlBBUlRJQ0xFX1RFWFRVUkVcIl0gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucGFyYW1zLm5vX2ZhZGVfY29sb3IpIHtcclxuICAgICAgICBkZWZpbmVzW1wiTk9fRkFERV9DT0xPUlwiXSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmaW5lcztcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2VsZWN0X3RleHR1cmUgPSBmdW5jdGlvbiAodGV4dHVyZSlcclxue1xyXG5cdGlmICh0eXBlb2YgdGhpcy50ZXh0dXJlID09PSAnc3RyaW5nJykge1xyXG5cdFx0dGhpcy50ZXh0dXJlID0gTXlfTGliLlRleHR1cmVfTWFuYWdlci5nZXQodGhpcy50ZXh0dXJlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeV9MaWIuVGV4dHVyZV9NYW5hZ2VyLnJlc291cmNlcyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRleHR1cmUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk9oLCBub3QgZm91bmQgdGV4dHVyZSA8XCIgKyB0aGlzLnBhcmFtcy50ZXh0dXJlICsgXCI+IGluIGNyZWF0ZSBwYXJ0aWNsZSBtYXRlcmlhbCEgSW5zdGVhZCBnZXQgXCIrdGhpcy50ZXh0dXJlKTtcclxuICAgICAgICB9XHJcblx0fVxyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZV9wYXJ0aWNsZV9tYXRlcmlhbCA9IGZ1bmN0aW9uKClcclxue1xyXG5cdFxyXG4gICAgdGhpcy5zZWxlY3RfdGV4dHVyZSh0aGlzLnRleHR1cmUpO1xyXG4gICAgXHJcbiAgICB2YXIgYmxlbmRfb2JqID0gdGhpcy5jb252ZXJ0X2JsZW5kaW5nX21vZGUodGhpcy5wYXJhbXMuYmxlbmRpbmcpO1xyXG4gICAgXHJcbiAgICBcclxuICAgIHZhciB1bmlmb3JtcyA9IHRoaXMuY3JlYXRlX3VuaWZvcm1zKCk7XHJcbiAgICB2YXIgZGVmaW5lcyA9IHRoaXMuY2FsY19kZWZpbmVzKCk7XHJcbiAgICBcclxuXHR2YXIgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKHtcclxuXHRcdHRyYW5zcGFyZW50OiB0cnVlLFxyXG5cdFx0ZGVwdGhXcml0ZTogdGhpcy5wYXJhbXMuZGVwdGhfd3JpdGUsXHJcblx0XHRkZXB0aFRlc3Q6IHRoaXMucGFyYW1zLmRlcHRoX3Rlc3QsXHJcbiAgICAgICAgYmxlbmRpbmc6IGJsZW5kX29iai5ibGVuZGluZyxcclxuICAgICAgICBibGVuZFNyYzogYmxlbmRfb2JqLmZhY3RvcnMuYmxlbmRTcmMsXHJcbiAgICAgICAgYmxlbmREc3Q6IGJsZW5kX29iai5mYWN0b3JzLmJsZW5kRHN0LFxyXG5cdFx0ZGVmaW5lczogZGVmaW5lcyxcclxuXHRcdHVuaWZvcm1zOiB1bmlmb3JtcyxcclxuXHRcdHZlcnRleFNoYWRlcjogUGFydGljbGVfU2hhZGVycy52ZXJ0ZXgsXHJcblx0XHRmcmFnbWVudFNoYWRlcjogUGFydGljbGVfU2hhZGVycy5mcmFnbWVudFxyXG5cdH0pO1xyXG5cdHJldHVybiBtYXQ7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUucmVjcmVhdGVfbWF0ZXJpYWwgPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICB0aGlzLm5vZGUubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsID0gdGhpcy5jcmVhdGVfcGFydGljbGVfbWF0ZXJpYWwoKTtcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X3ByZV9hbHBoYSA9IGZ1bmN0aW9uIChwcmVfYWxwaGEpXHJcbntcclxuICAgIGlmICh0aGlzLnBhcmFtcy5wcmVfYWxwaGEgIT09ICEhcHJlX2FscGhhKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMucHJlX2FscGhhID0gcHJlX2FscGhhO1xyXG4gICAgICAgIHRoaXMucmVjcmVhdGVfbWF0ZXJpYWwoKTtcclxuICAgIH1cclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfcG9pbnRfc2l6ZSA9IGZ1bmN0aW9uIChzaXplKVxyXG57XHJcbiAgICBpZiAodGhpcy5wYXJhbXMuc2l6ZSAhPSBzaXplKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5ub2RlLm1hdGVyaWFsLnVuaWZvcm1zW1wicG9pbnRfc2l6ZVwiXS52YWx1ZSA9IHNpemU7XHJcbiAgICB9XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X2JsZW5kaW5nID0gZnVuY3Rpb24gKGJsZW5kaW5nKVxyXG57XHJcbiAgICB0aGlzLnBhcmFtcy5ibGVuZGluZyA9IGJsZW5kaW5nO1xyXG4gICAgdmFyIGIgPSB0aGlzLmNvbnZlcnRfYmxlbmRpbmdfbW9kZShibGVuZGluZyk7XHJcbiAgICB0aGlzLm1hdGVyaWFsLmJsZW5kaW5nID0gYi5ibGVuZGluZztcclxuICAgIHRoaXMubWF0ZXJpYWwuYmxlbmRTcmMgPSBiLmZhY3RvcnMuYmxlbmRTcmM7XHJcbiAgICB0aGlzLm1hdGVyaWFsLmJsZW5kRHN0ID0gYi5mYWN0b3JzLmJsZW5kRHN0O1xyXG59XHJcblxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuZW1pdF9wYXJ0aWNsZXMgPSBmdW5jdGlvbiAoZHQsIG5lZWRfZW1pdClcclxue1xyXG5cdC8vZW1pdCBwYXJ0aWNsZXNcclxuXHR2YXIgcDtcclxuXHR2YXIgdmVydHMgPSB0aGlzLmdlb21ldHJ5LnZlcnRpY2VzLmFycmF5O1xyXG5cdHZhciBwYXJhbXMgPSB0aGlzLmdlb21ldHJ5LnBhcmFtcy5hcnJheTtcclxuXHQvL3ZhciBjb2xvcnMgPSB0aGlzLmdlb21ldHJ5LmNvbG9ycy5hcnJheTtcclxuXHQvL3ZhciBkdW1teV9jb2xvciA9IG5ldyBUSFJFRS5Db2xvcigxLDEsMSk7XHJcblx0XHJcbiAgICB0aGlzLm5vZGUudXBkYXRlTWF0cml4V29ybGQodHJ1ZSk7XHJcbiAgICB2YXIgbWF0cml4ID0gdGhpcy5ub2RlLm1hdHJpeFdvcmxkO1xyXG5cdGZvcih2YXIgaSA9MDsgaSA8IHRoaXMucGFydGljbGVfZGF0YS5sZW5ndGggJiYgbmVlZF9lbWl0ID4gMDsgaSsrKSB7XHJcblx0XHRpZiAoIShwYXJhbXNbaV0gPiAwKSkge1xyXG5cdFx0XHRwID0gdGhpcy5wYXJ0aWNsZV9kYXRhW2ldO1xyXG5cdFx0XHR0aGlzLmVtaXR0ZXIuZW1pdChwLCBudWxsLCBtYXRyaXgpO1xyXG5cdFx0XHRwLmxpZmV0aW1lID0gdGhpcy5wYXJ0aWNsZV9saWZldGltZTtcclxuXHRcdFx0dmVydHNbaSozXSA9IHAucG9zaXRpb24ueDtcclxuXHRcdFx0dmVydHNbaSozKzFdID0gcC5wb3NpdGlvbi55O1xyXG5cdFx0XHR2ZXJ0c1tpKjMrMl0gPSBwLnBvc2l0aW9uLno7XHJcblx0XHRcdHBhcmFtc1tpXSA9IHAubGlmZXRpbWU7XHJcblx0XHRcdG5lZWRfZW1pdC0tO1xyXG5cdFx0XHQvL2NvbG9yc1tpKjNdID0gdGhpcy5wYXJhbXMuY29sb3IuclxyXG5cdFx0XHQvL2NvbG9yc1tpKjMrMV0gPSB0aGlzLnBhcmFtcy5jb2xvci5nO1xyXG5cdFx0XHQvL2NvbG9yc1tpKjMrMl0gPSB0aGlzLnBhcmFtcy5jb2xvci5iO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS51cGRhdGVfcGFydGljbGVfZ2VvbWV0cnkgPSBmdW5jdGlvbiAoZHQpXHJcbntcclxuXHR2YXIgdmVydHMgPSB0aGlzLmdlb21ldHJ5LnZlcnRpY2VzLmFycmF5O1xyXG5cdHZhciBwYXJhbXMgPSB0aGlzLmdlb21ldHJ5LnBhcmFtcy5hcnJheTtcclxuXHR2YXIgcDtcclxuXHR2YXIgdmVydCA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsMCwwKTtcclxuXHR2YXIgZHVtbXlfY29sb3IgPSB7XCJyXCI6MSwgXCJiXCI6MSwgXCJnXCI6MX07XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMucGFydGljbGVfZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFxyXG5cdFx0aWYgKHBhcmFtc1tpXSA+IDApIHtcclxuXHRcdFx0cCA9IHRoaXMucGFydGljbGVfZGF0YVtpXTtcclxuXHRcdFx0XHJcblx0XHRcdC8vaW50ZWdyYXRlXHJcblx0XHRcdHAucG9zaXRpb24ueCArPSBwLnZlbG9jaXR5LnggKiBkdDtcclxuXHRcdFx0cC5wb3NpdGlvbi55ICs9IHAudmVsb2NpdHkueSAqIGR0O1xyXG5cdFx0XHRwLnBvc2l0aW9uLnogKz0gcC52ZWxvY2l0eS56ICogZHQ7XHJcblx0XHRcdHAubGlmZXRpbWUgLT0gZHQ7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAocC5saWZldGltZSA8PSAwIHx8ICF0aGlzLmFmZmVjdG9yLmFmZmVjdChkdCwgcCwgdmVydCwgZHVtbXlfY29sb3IpKSB7XHJcblx0XHRcdFx0cC5saWZldGltZSA9IDA7XHJcblx0XHRcdH1cclxuXHRcdFx0cGFyYW1zW2ldID0gcC5saWZldGltZTtcdFx0XHRcclxuXHRcdFx0dmVydHNbaSozXSA9IHAucG9zaXRpb24ueDtcclxuXHRcdFx0dmVydHNbaSozKzFdID0gcC5wb3NpdGlvbi55O1xyXG5cdFx0XHR2ZXJ0c1tpKjMrMl0gPSBwLnBvc2l0aW9uLno7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgbmVlZF9lbWl0ID0gdGhpcy5lbWl0dGVyLmNhbGNfZW1pdHRlZF9wYXJ0aWNsZXMoZHQpO1xyXG5cdHRoaXMuZW1pdF9wYXJ0aWNsZXMoZHQsIG5lZWRfZW1pdCk7XHJcblx0XHJcblx0dGhpcy5nZW9tZXRyeS52ZXJ0aWNlcy5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblx0dGhpcy5nZW9tZXRyeS5wYXJhbXMubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG5cdHRoaXMuZ2VvbWV0cnkuY29sb3JzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KVxyXG57XHJcblx0dGhpcy51cGRhdGVfcGFydGljbGVfZ2VvbWV0cnkoZHQpO1xyXG59XHJcblxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKVxyXG57XHJcblx0dmFyIGRhdGEgPSB7fTtcclxuICAgIGRhdGEudXVpZCA9IHRoaXMudXVpZDtcclxuICAgIGRhdGEubm9kZSA9IHRoaXMubm9kZS51dWlkO1xyXG4gICAgaWYgKHRoaXMubmFtZSB8fCB0aGlzLm5vZGUubmFtZSkge1xyXG4gICAgICAgIGRhdGEubmFtZSA9IHRoaXMubmFtZSB8fCB0aGlzLm5vZGUubmFtZTtcclxuICAgIH1cclxuXHRkYXRhLnBhcmFtcyA9IHt9O1xyXG5cdGlmICh0aGlzLnBhcmFtcykge1xyXG5cdFx0Xy5jb3B5X29iamVjdChkYXRhLnBhcmFtcywgdGhpcy5wYXJhbXMpO1xyXG5cdH1cclxuXHRkYXRhLnBhcmFtcy5lbWl0dGVyID0gdGhpcy5lbWl0dGVyLnRvSlNPTigpO1xyXG5cdGRhdGEucGFyYW1zLmFmZmVjdG9yID0gdGhpcy5hZmZlY3Rvci50b0pTT04oKTtcclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG5cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X2VtaXR0ZXIgPSBmdW5jdGlvbiAoZW1pdHRlcilcclxue1xyXG4gICAgdGhpcy5lbWl0dGVyID0gdGhpcy5wYXJhbXMuZW1pdHRlciA9IGVtaXR0ZXI7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X3BhcnRpY2xlX2xpZmVfbGVuZ3RoID0gZnVuY3Rpb24gKHZhbClcclxue1xyXG5cdGlmICh2YWwgIT09IHRoaXMucGFyYW1zLnBhcnRpY2xlX2xpZmV0aW1lKSB7XHJcblx0XHR0aGlzLnBhcmFtcy5wYXJ0aWNsZV9saWZldGltZSA9IHRoaXMucGFydGljbGVfbGlmZXRpbWUgPSB2YWw7XHJcblx0XHR0aGlzLm1hdGVyaWFsLnVuaWZvcm1zWydsaWZldGltZSddLnZhbHVlID0gdmFsO1xyXG5cdH1cclxufVxyXG5cclxuUGFydGljbGVfU3lzdGVtLnByb3RvdHlwZS5zZXRfZW1pc3Npb25fcGVyX3NlY29uZCA9IGZ1bmN0aW9uICh2YWwpXHJcbntcclxuXHR0aGlzLmVtaXR0ZXIuZW1pdF9wZXJfc2Vjb25kID0gdmFsO1xyXG59XHJcblxyXG5QYXJ0aWNsZV9TeXN0ZW0ucHJvdG90eXBlLnNldF9wYXJ0aWNsZV9jb3VudCA9IGZ1bmN0aW9uIChjb3VudClcclxue1xyXG5cdGlmIChjb3VudCAhPT0gdGhpcy5wYXJ0aWNsZV9kYXRhLmxlbmd0aCkge1xyXG5cdFx0dGhpcy5wYXJhbXMuY291bnQgPSBjb3VudDtcclxuXHRcdHRoaXMubm9kZS5nZW9tZXRyeSA9IHRoaXMuY3JlYXRlX3BhcnRpY2xlX2dlb21ldHJ5KGNvdW50KTtcclxuXHR9XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X2NvbG9yID0gZnVuY3Rpb24gKGNvbG9yKVxyXG57XHJcbiAgICB0aGlzLnBhcmFtcy5jb2xvci5yID0gY29sb3IucjtcclxuICAgIHRoaXMucGFyYW1zLmNvbG9yLmcgPSBjb2xvci5nO1xyXG4gICAgdGhpcy5wYXJhbXMuY29sb3IuYiA9IGNvbG9yLmI7XHJcbn1cclxuXHJcblBhcnRpY2xlX1N5c3RlbS5wcm90b3R5cGUuc2V0X2JvdW5kaW5nX3NwaGVyZV9yYWRpdXMgPSBmdW5jdGlvbiAocmFkaXVzKVxyXG57XHJcbiAgICB0aGlzLm5vZGUuYm91bmRpbmdTcGhlcmUucmFkaXVzID0gcmFkaXVzO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9TeXN0ZW19O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvcGFydGljbGVzLmpzIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9FbWl0dGVyfSBmcm9tICcuL3BhcnRpY2xlX2VtaXR0ZXIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0FmZmVjdG9yfSBmcm9tICcuL3BhcnRpY2xlX2FmZmVjdG9yLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZXNfUG9pbnRzfSBmcm9tICcuL3BhcnRpY2xlc19wb2ludHMuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX1N5c3RlbX0gZnJvbSAnLi9wYXJ0aWNsZXMuanMnO1xyXG5cclxuXHJcbiBmdW5jdGlvbiBQYXJ0aWNsZV9NYW5hZ2VyICgpXHJcbntcclxuXHR0aGlzLnBhcnRpY2xlcyA9IHt9O1xyXG4gICAgdGhpcy5wYXJ0aWNsZXNfYXJyYXkgPSBbXTtcclxufVxyXG5cclxuXy5jb3B5X29iamVjdChQYXJ0aWNsZV9NYW5hZ2VyLnByb3RvdHlwZSwgXHJcbiAgICB7XHJcbiAgICBjb25zdHJ1Y3RvcjogUGFydGljbGVfTWFuYWdlcixcclxuICAgIGFkZDogIGZ1bmN0aW9uIChwcyxuYW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy5wYXJ0aWNsZXNbbmFtZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNbbmFtZV0gPSBwcztcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNfYXJyYXkucHVzaChwcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlbW92ZV9wYXJ0aWNsZXM6ICBmdW5jdGlvbiAobmFtZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgcHMgPSB0aGlzLnBhcnRpY2xlc1tuYW1lXTtcclxuICAgICAgICB2YXIgaSA9IHRoaXMucGFydGljbGVzX2FycmF5LmluZGV4T2YocHMpO1xyXG4gICAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNfYXJyYXkuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHMpIHtcclxuICAgICAgICAgICAgcHMuc3VpY2lkZSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5wYXJ0aWNsZXNbbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldF9wYXJ0aWNsZV9uYW1lczogIGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5hbWVzID0gW107XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5wYXJ0aWNsZXMpIHtcclxuICAgICAgICAgICAgbmFtZXMucHVzaChrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmFtZXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSA6IGZ1bmN0aW9uIChkdClcclxuICAgIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJ0aWNsZXNfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXNfYXJyYXlbaV0udXBkYXRlKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICB0b0pTT04gOiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBhcnIgPSBbXVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgIHZhciBwO1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMucGFydGljbGVzKXtcclxuICAgICAgICAgICAgcCA9IHRoaXMucGFydGljbGVzW2tleV07XHJcbiAgICAgICAgICAgIGlmIChwLnV1aWQpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBwLnRvSlNPTigpO1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9LFxyXG5cclxuICAgIGVtaXR0ZXJfZmFicmljOiAgZnVuY3Rpb24gKHBhcmFtcylcclxuICAgIHtcclxuICAgICAgICBpZiAocGFyYW1zLmVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgdmFyIGVtaXR0ZXIgPSBNeV9MaWIuR2V0X0NsYXNzKHBhcmFtcy5lbWl0dGVyLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoZW1pdHRlcikge1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlciA9IG5ldyBlbWl0dGVyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyID0gbmV3IFBhcnRpY2xlX0VtaXR0ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbWl0dGVyLnBhcnNlKHBhcmFtcy5lbWl0dGVyLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbWl0dGVyOyAgICAgICAgXHJcbiAgICAgICAgfSBcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZmZlY3Rvcl9mYWJyaWM6ICBmdW5jdGlvbiAocGFyYW1zKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChwYXJhbXMuYWZmZWN0b3IpIHtcclxuICAgICAgICAgICAgdmFyIGFmZmVjdG9yID0gTXlfTGliLkdldF9DbGFzcyhwYXJhbXMuYWZmZWN0b3IubmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChhZmZlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgYWZmZWN0b3IgPSBuZXcgYWZmZWN0b3IoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFmZmVjdG9yID0gbmV3IFBhcnRpY2xlX0FmZmVjdG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWZmZWN0b3IucGFyc2UocGFyYW1zLmFmZmVjdG9yLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBhZmZlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH0sXHJcblxyXG4gICAgZnJvbUpTT046IGZ1bmN0aW9uIChqc29uLCBjYWxsYmFjaywgcm9vdCwgbmFtZSlcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJ0aWNsZXNbbmFtZV0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXQVJOSU5HIFBhcnRpY2xlIE1hbmFnZXIhIFBhcnRpY2xlIFN5c3RlbSB3aXRoIHRoaXMgbmFtZSBhbHJlYWR5IGV4aXN0c1wiLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdHJ5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoanNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBwYXJzaW5nIGpzb24gb24gXCIsIG5hbWUsIGpzb24pO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZShkYXRhLCByb290LCBuYW1lKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHBhcnNlOiBmdW5jdGlvbiAoZGF0YSwgcm9vdCwgbmFtZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgZW1pdHRlciA9IHRoaXMuZW1pdHRlcl9mYWJyaWMoZGF0YS5wYXJhbXMpO1xyXG4gICAgICAgIHZhciBhZmZlY3RvciA9IHRoaXMuYWZmZWN0b3JfZmFicmljKGRhdGEucGFyYW1zKTtcclxuICAgICAgICBkYXRhLnBhcmFtcy5lbWl0dGVyID0gZW1pdHRlcjtcclxuICAgICAgICBkYXRhLnBhcmFtcy5hZmZlY3RvciA9IGFmZmVjdG9yO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBwcyA9IG5ldyBQYXJ0aWNsZV9TeXN0ZW0oZGF0YS5wYXJhbXMpO1xyXG4gICAgICAgIHBzLnNldF9uYW1lKGRhdGEubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAvL2FkZCB0byBzY2VuZSBncmFwaFxyXG4gICAgICAgIGlmIChkYXRhLnBhcmFtcy5wYXJlbnQpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHJvb3QuZ2V0T2JqZWN0QnlOYW1lKGRhdGEucGFyYW1zLnBhcmVudCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YS5wYXJhbXMucGFyZW50LCBcInBhcmVudCBwYXJ0aWNsZXNcIiwgbmFtZSwgcm9vdCk7XHJcbiAgICAgICAgICAgIHBhcmVudC5hZGQocHMubm9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICByb290LmFkZChwcy5ub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vdWdseSBmdWNraW5nIGhhY2tcclxuICAgICAgICAvL2NvcHkgbm9kZSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgdGhpcy5hZGQocHMsIG5hbWUpOyAgICBcclxuICAgICAgICByZXR1cm4gcHM7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRfcGFydGljbGVzOiAgZnVuY3Rpb24gKGpzb24sIHJvb3QpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHBhcnRpY2xlcyA9IGpzb24ucGFydGljbGVzO1xyXG4gICAgICAgIGZvcih2YXIgaSA9MDsgaSA8IHBhcnRpY2xlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwID0gcGFydGljbGVzW2ldO1xyXG4gICAgICAgICAgICB2YXIgcHMgPSB0aGlzLnBhcnNlKHAsIHJvb3QsIHAubmFtZSk7XHJcbiAgICAgICAgICAgIHBzLm5vZGUudXVpZCA9IHAubm9kZTtcclxuICAgICAgICAgICAgcHMubm9kZS5uYW1lID0gcC5uYW1lO1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gcm9vdC5nZXRPYmplY3RCeVByb3BlcnR5KFwidXVpZFwiLCBwLm5vZGUpO1xyXG4gICAgICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICBwcy5ub2RlLnJlcGxhY2Vfb2JqZWN0X3dpdGhfdGhpcyhvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVfbmFtZTogIGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG51bWJlciA9IHRoaXMucGFydGljbGVzX2FycmF5Lmxlbmd0aCArIDE7XHJcbiAgICAgICAgdmFyIGJlZ2luX25hbWUgPSAnUGFydGljbGVfU3lzdGVtXyc7XHJcbiAgICAgICAgdmFyIHRlc3RpbmcgPSB0cnVlO1xyXG4gICAgICAgIHdoaWxlICh0ZXN0aW5nKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBiZWdpbl9uYW1lICsgbnVtYmVyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJ0aWNsZXNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbnVtYmVyICsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZV9uZXcgOiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5jcmVhdGVfbmFtZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBwYXJhbXMgPSB7fTtcclxuICAgICAgICB2YXIgcHMgPSBuZXcgTXlfTGliLlBhcnRpY2xlX1N5c3RlbShwYXJhbXMpO1xyXG4gICAgICAgIHBzLnNldF9uYW1lKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuYWRkKHBzLCBuYW1lKTtcclxuICAgICAgICByZXR1cm4gcHM7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbmlmIChNeV9MaWIucGFydGljbGVfbWFuYWdlciA9PT0gdW5kZWZpbmVkKSBcclxue1xyXG4gICAgTXlfTGliLnBhcnRpY2xlX21hbmFnZXIgPSBuZXcgUGFydGljbGVfTWFuYWdlcigpO1xyXG59XHJcblxyXG5NeV9MaWIuUGFydGljbGVzX0NvbmZpZyA9IHtcclxuXCJib3hfc2l6ZVwiOiAxMFxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB7UGFydGljbGVfTWFuYWdlcn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhcnRpY2xlcy9wYXJ0aWNsZXNfbWFuYWdlci5qcyIsInZhciBQb2ludF9HZW5lcmF0b3JzID0ge307XHJcblxyXG5cclxuUG9pbnRfR2VuZXJhdG9ycy5SYW5kb21fRGlyZWN0aW9uID0gZnVuY3Rpb24gKClcclxue1xyXG59XHJcblxyXG5Qb2ludF9HZW5lcmF0b3JzLlJhbmRvbV9EaXJlY3Rpb24ucHJvdG90eXBlLmdldF9kaXJlY3Rpb24gPSBmdW5jdGlvbiAodmVjdG9yKVxyXG57XHJcblx0dmVjdG9yLnggPSBNYXRoLnJhbmRvbSgpOyBcclxuXHR2ZWN0b3IueSA9IE1hdGgucmFuZG9tKCk7IFxyXG5cdHZlY3Rvci56ID0gTWF0aC5yYW5kb20oKTtcclxufVxyXG5cclxuUG9pbnRfR2VuZXJhdG9ycy5TcGhlcmUgPSBmdW5jdGlvbiAocmFkaXVzKVxyXG57XHJcblx0dGhpcy5yYWRpdXMgPSByYWRpdXM7XHJcbn1cclxuXHJcblBvaW50X0dlbmVyYXRvcnMuU3BoZXJlLnByb3RvdHlwZS5nZXRfaW5uZXJfcG9pbnQgPSBmdW5jdGlvbiAodmVjdG9yKVxyXG57XHJcblx0dmFyIGFscGhhID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xyXG5cdHZhciBiZXRhID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEk7XHJcblx0dmVjdG9yLnggPSBNYXRoLmNvcyhhbHBoYSkgKiBNYXRoLnNpbihiZXRhKTtcclxuXHR2ZWN0b3IueSA9IE1hdGguY29zKGJldGEpO1xyXG5cdHZlY3Rvci56ID0gTWF0aC5zaW4oYWxwaGEpICogTWF0aC5zaW4oYmV0YSk7XHJcbn1cclxuXHJcblBvaW50X0dlbmVyYXRvcnMuU3BoZXJlLnByb3RvdHlwZS5nZXRfbm9ybWFsID0gZnVuY3Rpb24gKHZlY3Rvcilcclxue1xyXG5cdHZlY3Rvci54ID0gTWF0aC5yYW5kb20oKSAqIDIgLSAxO1xyXG5cdHZlY3Rvci55ID0gTWF0aC5yYW5kb20oKSAqIDIgLSAxO1xyXG5cdHZlY3Rvci56ID0gTWF0aC5yYW5kb20oKSAqIDIgLSAxO1xyXG5cdHZlY3Rvci5ub3JtYWxpemUoKTtcclxufVxyXG5cclxuUG9pbnRfR2VuZXJhdG9ycy5TcGhlcmUucHJvdG90eXBlLmdldF9wb2ludCA9IGZ1bmN0aW9uICh2ZWN0b3IpIFxyXG57XHJcblx0dGhpcy5nZXRfbm9ybWFsKHZlY3Rvcik7XHJcblx0dmVjdG9yLm11bHRpcGx5U2NhbGFyKHRoaXMucmFkaXVzKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7UG9pbnRfR2VuZXJhdG9yc307XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhcnRpY2xlcy9wb2ludF9nZW5lcmF0b3JzLmpzIiwiLypcclxubWFpbiBjbGFzc1xyXG50aGlzIGhhcyBhYnN0cmFjdCB2aXJ0dWFsIG1ldGhvZHNcclxuc3RhcnQgLSB3aGljaCBjcmVhdGUgcmVuZGVyZXIgYW5kIGNvbmR1Y3Qgc3RhcnQgaW5pdGlhbGl6YXRpb25zXHJcbnVwZGF0ZSAtIHVwZGF0ZWQgc2NlbmUgb2JqZWN0cywgYW5pbWF0aW9ucywgcGhpc2ljc1xyXG5yZW5kZXIgLSBjb250cm9sIHNjZW5lIHJlbmRlcmluZ1xyXG50aGlzIG1ldGhvZHMgbXVzdCByZXdyaXRlIG9uIGRlcml2ZWQgY2xhc3Nlc1xyXG5uZWVkIHNldCBcclxuUFJPUEVSVElFU1xyXG5tYWluX2NhbWVyYSAtIGNhbWVyYSB3aGljaCBwb2ludCBvZiB2aWV3IHJlbmRlciB3aG9sZSBzY2VuZSBhbmQgdXNlciBpbnRlcmFjdHNcclxuZG9tX3NjcmVlbiAtIGRvbSBlbGVtZW50IHdoaWNoIGNvbnRhaW4gY2FudmFzIGFuZCBkaXNwbGF5IHNjZW5lXHJcbnJlbmRlcmVyIC0gdGhyZWUuanMgcmVuZGVyZXJcclxuY2FudmFzIC0gaXMgY3JlYXRlZCBieSB0aHJlZS5qcyByZW5kZXJlciwgaXQgaGF2ZSB0byBhcHBlbmQgdG8gZG9tX3NjcmVlbiBjaGlsZHJlbiwgZnVjayBpdFxyXG5jYW52YXMgd2lkdGggYW5kIGhlaWdodCBkZWZpbmluZyBvbiBjcmVhdGluZyBpdCBieSByZW5kZXJlciwgZnVjayBpdFxyXG5cclxuXHJcblxyXG4qL1xyXG5cclxuaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuaW1wb3J0IHttYWluX2V2ZW50X2h1YiwgRXZlbnRfSHVifSBmcm9tICcuLi9iYXNlL2V2ZW50X2h1Yi5qcyc7XHJcbmltcG9ydCB7TW91c2VfSW50ZXJzZWN0b3J9IGZyb20gJy4uL2Jhc2UvbW91c2VfaW50ZXJzZWN0b3IuanMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIEFwcGxpY2F0aW9uIChjb25maWcpXHJcbntcclxuXHJcbiAgICB0aGlzLl9saWZlY3ljbGVfZXZlbnQoXCJiZWZvcmVfY3JlYXRlZFwiKTtcclxuICAgXHJcbiAgICB0aGlzLl9pbml0X3RpbWVyKCk7XHJcbiAgICB0aGlzLl9jcmVhdGVfbG9vcF9mdW5jdGlvbigpO1xyXG4gICAgXHJcblx0dGhpcy5tb3VzZV9jb250cm9sbGVycyA9IFtdO1xyXG4gICAgXHJcbiAgICBtYWluX2V2ZW50X2h1Yi5hZGRfZXZlbnRfbGlzdGVuZXIoXCJraWxsX21lXCIsIGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICB0aGlzLnJlbW92ZV9hbmltYXRlZF9vYmplY3Qob2JqKTtcclxuICAgIH0sIHRoaXMpO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoY29uZmlnKVxyXG57XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0IGFwcGxpY2F0aW9uLi4uXCIpO1xyXG4gICB0aGlzLl9zZXRfY29uZmlndXJhdGlvbihjb25maWcpO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuX2xpZmVjeWNsZV9ldmVudCA9IGZ1bmN0aW9uIChuYW1lLCBldmVudClcclxue1xyXG4gICAgaWYgKHRoaXNbbmFtZV0pIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tuYW1lXShldmVudCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuX2luaXRfdGltZXIgPSBmdW5jdGlvbiAoKVxyXG57XHJcblx0dGhpcy5jbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1x0XHJcblx0dGhpcy5kZWx0YV90aW1lID0gMDtcclxuXHR0aGlzLmFuaW1hdGVkX29iamVjdHMgPSBbXTtcclxufVxyXG5cclxuXHJcbnZhciBydW5fZnVuY3Rpb24gPSAvL3dpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XHJcblx0ZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdFx0d2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcblx0fVxyXG5cdFxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5fY3JlYXRlX2xvb3BfZnVuY3Rpb24gPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblx0dGhpcy5ydW4gPSBmdW5jdGlvbiAoKVxyXG5cdHtcclxuXHRcdHJ1bl9mdW5jdGlvbihmdW5jdGlvbiAoKSBcclxuXHRcdHsgXHJcblx0XHRcdHNlbGYubG9vcCgpO1xyXG4gICAgICAgICAgICAvL21haW5fZXZlbnRfaHViLmVtaXQoXCJuZXdfZnJhbWVcIik7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcbiAgICAvL015X0xpYi5jcmVhdGVfcnVuX2Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgXHJcbiAgICAvL21haW5fZXZlbl9odWIuYWRkX2V2ZW50X2xpc3RlbmVyKFwibmV3X2ZyYW1lXCIsIHRoaXMubG9vcCwgdGhpcyk7ICAgIFxyXG59XHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLmdldF9kZWZhdWx0X2NvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFwiZG9tX2VsZW1lbnRcIjogXCJzY3JlZW5cIixcclxuICAgICAgICBcInJlbmRlcl9wYXJhbXNcIjoge1xyXG4gICAgICAgICAgICBcInByZW11bHRpcGxpZWRBbHBoYVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImFscGhhXCI6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidmlld3BvcnRcIjoge1xyXG4gICAgICAgICAgICBcIndpZHRoXCI6IDgwMCxcclxuICAgICAgICAgICAgXCJoZWlnaHRcIjogNjAwXHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgIFwiY2xlYXJfY29sb3JcIjogMHgwMDAwRkYsXHJcbiAgICAgICAgXCJtYWluX2NhbWVyYVwiOiB7XHJcbiAgICAgICAgICAgIFwiZm92XCI6IDgwLFxyXG4gICAgICAgICAgICBcIm5lYXJcIjogMC4xLFxyXG4gICAgICAgICAgICBcImZhclwiOiAxMDAwLFxyXG4gICAgICAgICAgICBcImFzcGVjdF9yYXRpb1wiOiAxLjMzMzMzMzMzMzMzMzMzMzMsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ4XCI6IDAsXHJcbiAgICAgICAgICAgICAgICBcInlcIjogMCxcclxuICAgICAgICAgICAgICAgIFwielwiOiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuX2NyZWF0ZV9yZW5kZXIgPSBmdW5jdGlvbiAoanNvbilcclxue1xyXG4gICAgaWYgKHRoaXMuZG9tX3NjcmVlbiB8fCB0aGlzLnJlbmRlcmVyKSB7XHJcbiAgICAgICAgYWxlcnQoXCJDcmVhdGUgcmVuZGVyIGFsZXJ0ISBTb21ldGhpbmcgc3RyYW5nZSBoYXBwZW5lcyFcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuZG9tX3NjcmVlbikge1xyXG4gICAgICAgIHRoaXMuZG9tX3NjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGpzb24uZG9tX2VsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnJlbmRlcmVyKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKGpzb24ucmVuZGVyX3BhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoISEhdGhpcy5kb21fc2NyZWVuIHx8IHR5cGVvZiB0aGlzLmRvbV9zY3JlZW4gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNvbWUgdGVycm9yb3VzIGhhcHBlbnMhIGRvbSBlbGVtZW50IGZvciBzY3JlZW4gbm90IGZvdW5kISBlbGVtZW50IGlkIGlzIFwiICsganNvbi5kb21fZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiZm91bmQgZG9tZSBlbGVtZW50IFwiICsganNvbi5kb21fZWxlbWVudCk7XHJcbiAgICB0aGlzLmRvbV9zY3JlZW4uYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcclxuICAgIHRoaXMuY2FudmFzID0gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50O1xyXG4gICAgXHJcbiAgICBcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZShqc29uLnZpZXdwb3J0LndpZHRoLCBqc29uLnZpZXdwb3J0LmhlaWdodCk7XHJcbiAgICB0aGlzLnNldF92aWV3cG9ydChqc29uLnZpZXdwb3J0LndpZHRoLCBqc29uLnZpZXdwb3J0LmhlaWdodCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoanNvbi5jbGVhcl9jb2xvcik7XHJcbiAgICBcclxuICAgIHRoaXMuX2xpZmVjeWNsZV9ldmVudChcInJlbmRlcl9jcmVhdGVkXCIpO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuX2NyZWF0ZV9tYWluX3NjZW5lID0gZnVuY3Rpb24gKGpzb24pXHJcbntcclxuICAgIHZhciBldmVudCA9IHtwcmV2ZW50OiBmYWxzZX07XHJcbiAgICB0aGlzLl9saWZlY3ljbGVfZXZlbnQoXCJiZWZvcmVfY3JlYXRlX21haW5fc2NlbmVcIiwgZXZlbnQpO1xyXG4gICAgLypcclxuICAgIGlmIChldmVudC5wcmV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIGlmICghdGhpcy5tYWluX3NjZW5lKSB7XHJcbiAgICAgICAgdGhpcy5tYWluX3NjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciBjYW1lcmEgPSBqc29uLm1haW5fY2FtZXJhOyAgICBcclxuICAgIGlmICghdGhpcy5tYWluX2NhbWVyYSkge1xyXG4gICAgICAgIHRoaXMubWFpbl9jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoY2FtZXJhLmZvdiwgY2FtZXJhLmFzcGVjdF9yYXRpbywgY2FtZXJhLm5lYXIsIGNhbWVyYS5mYXIpO1xyXG4gICAgICAgIHRoaXMubWFpbl9zY2VuZS5hZGQodGhpcy5tYWluX2NhbWVyYSk7XHJcbiAgICAgICAgdGhpcy5tYWluX2NhbWVyYS5uYW1lID0gXCJtYWluX2NhbWVyYVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1haW5fY2FtZXJhLmZvdiA9IGNhbWVyYS5mb3Y7XHJcbiAgICAgICAgdGhpcy5tYWluX2NhbWVyYS5uZWFyID0gY2FtZXJhLm5lYXI7XHJcbiAgICAgICAgdGhpcy5tYWluX2NhbWVyYS5mYXIgPSBjYW1lcmEuZmFyO1xyXG4gICAgICAgIHRoaXMubWFpbl9jYW1lcmEuYXNwZWN0ID0gY2FtZXJhLmFzcGVjdF9yYXRpbztcclxuICAgICAgICB0aGlzLm1haW5fY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5tYWluX2NhbWVyYS5wb3NpdGlvbi5zZXQoY2FtZXJhLnBvc2l0aW9uLngsIGNhbWVyYS5wb3NpdGlvbi55LCBjYW1lcmEucG9zaXRpb24ueik7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5hcHBseV9jb25maWd1cmF0aW9uID0gZnVuY3Rpb24gKGpzb24pXHJcbntcclxuICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGpzb247XHJcbiAgICB0aGlzLl9jcmVhdGVfcmVuZGVyKGpzb24pO1xyXG4gICAgdGhpcy5fY3JlYXRlX21haW5fc2NlbmUoanNvbik7XHJcbiAgICB0aGlzLl9saWZlY3ljbGVfZXZlbnQoXCJjcmVhdGVkXCIpO1xyXG59XHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUubG9hZF9jb25maWd1cmF0aW9uID0gZnVuY3Rpb24gKHVybClcclxue1xyXG4gICAgdmFyIHhociA9IG5ldyBUSFJFRS5YSFJMb2FkZXIoKTtcclxuICAgIFxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgXHJcbiAgICB2YXIgY29uZmlnID0gc2VsZi5nZXRfZGVmYXVsdF9jb25maWd1cmF0aW9uKCk7XHJcbiAgICBcclxuICAgIHZhciBjb25maWd1cmF0aW9uX2lzX2FwcGxpZWQgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gb25sb2FkIChkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25maWd1cmF0aW9uIGxvYWRlZCBmcm9tIHVybCA8PFwiICsgdXJsICsgXCI+PlwiKTtcclxuICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAvL3VzZXIgY29uZmlnIGFwcGVuZCB0byBkZWZhdWx0IGNvbmZpZyBhbmQgbWF5IHJld3JpdGUgdGhlbSwgXHJcbiAgICAgICAgLy90aG91Z2ggdXNlciBuYXZlbid0IHRvIHJld3JpdGUgQUxMIGNvbmZpZyB0byBjaGFuZ2Ugc29tZSBwYXJhbXNcclxuICAgICAgICBfLmNvcHlfb2JqZWN0KGNvbmZpZywgb2JqKTtcclxuICAgICAgICBzZWxmLmFwcGx5X2NvbmZpZ3VyYXRpb24oY29uZmlnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb25maWd1cmF0aW9uX2lzX2FwcGxpZWQsIFwib25sb2FkXCIpOyAgICAgICAgXHJcbiAgICAgICAgY29uZmlndXJhdGlvbl9pc19hcHBsaWVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHByb2dyZXNzKCkge31cclxuICAgIGZ1bmN0aW9uIGVycm9yKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIG9uIGxvYWRpbmcgY29uZmlnIVwiLCBldmVudC50YXJnZXQuc3RhdHVzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgZGVmYXVsdCBjb25maWd1cmF0aW9uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvbmZpZ3VyYXRpb25faXNfYXBwbGllZCwgXCJlcnJvclwiKTsgICAgICAgIFxyXG4gICAgICAgIGNvbmZpZ3VyYXRpb25faXNfYXBwbGllZCA9IHRydWU7ICAgICAgICBcclxuICAgICAgICBzZWxmLmFwcGx5X2NvbmZpZ3VyYXRpb24oY29uZmlnKTtcclxuICAgIH1cclxuICAgIHhoci5sb2FkKHVybCwgb25sb2FkLCBwcm9ncmVzcywgZXJyb3IpO1xyXG59XHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLl9zZXRfY29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uIChjb25maWcpXHJcbntcclxuICAgIHZhciBkZWZhdWx0X2NvbmZpZyA9IHRoaXMuZ2V0X2RlZmF1bHRfY29uZmlndXJhdGlvbigpO1xyXG4gICAgXHJcbiAgICAvL3RoaXMgaXMgdXJsIG9mIGNvbmZpZ3VyYXRpb24gZmlsZVxyXG4gICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXQgY29uZmlndXJhdGlvbiBmcm9tIHVybCA+PiBcIiArIGNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5sb2FkX2NvbmZpZ3VyYXRpb24oY29uZmlnKTtcclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMgaXMgb2JqZWN0IGZpbGxlZCB3aXRoIGRhdGFcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldCBjb25maWd1cmF0aW9uIGZyb20gdXNlciBvYmplY3RcIik7XHJcbiAgICAgICAgXy5jb3B5X29iamVjdChkZWZhdWx0X2NvbmZpZyxjb25maWcpO1xyXG4gICAgICAgIHRoaXMuYXBwbHlfY29uZmlndXJhdGlvbihkZWZhdWx0X2NvbmZpZyk7XHJcbiAgICAvL2NvbmZpZ3VyYXRpb24gbm90IGdpdmVuLCB1c2UgZGVmYXVsdFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIl9zZXRfY29uZmlndXJhdGlvbjogc2V0IGRlZmF1bHQgY29uZmlncmF0aW9uXCIpO1xyXG4gICAgICAgdGhpcy5hcHBseV9jb25maWd1cmF0aW9uKGRlZmF1bHRfY29uZmlnKTtcclxuICAgIH1cclxufVxyXG5cclxuQXBwbGljYXRpb24uZXh0ZW5kID0gZnVuY3Rpb24gKG1ldGhvZHMsIGNoaWxkX2Z1bmMpXHJcbntcclxuXHJcbiAgICB2YXIgQ2hpbGQ7XHJcbiAgICBpZiAodHlwZW9mIGNoaWxkX2Z1bmMgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgQ2hpbGQgPSBmdW5jdGlvbiAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQXBwbGljYXRpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIENoaWxkID0gY2hpbGRfZnVuYztcclxuICAgIH1cclxuXHJcbiAgICAvL2NyZWF0ZSBuZXcgb2JqZWN0IGFuZCBzZXQgcHJvdG90eXBlIGNoYWluXHJcblx0Q2hpbGQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShBcHBsaWNhdGlvbi5wcm90b3R5cGUpO1xyXG4gICAgLy9jb3B5IG1ldGhvZHMgdG8gbmV3IG9iamVjdFxyXG5cdF8uY29weV9vYmplY3QoQ2hpbGQucHJvdG90eXBlLCBtZXRob2RzKTtcclxuICAgIENoaWxkLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENoaWxkO1xyXG4gICBcclxuICAgIHJldHVybiBDaGlsZDtcclxufVxyXG5cclxuQXBwbGljYXRpb24uZXh0ZW5kX3Byb3RvID0gZnVuY3Rpb24gKHByb3RvLCBtZXRob2RzKVxyXG57XHJcblx0dmFyIG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xyXG5cdF8uY29weV9vYmplY3Qob2JqLCBtZXRob2RzKTtcclxuXHRBcHBsaWNhdGlvbi5jYWxsKG9iaik7XHJcblx0cmV0dXJuIG9iajtcclxufVxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24gKCkgXHJcbntcclxuXHR2YXIgZGVsdGEgPSB0aGlzLmNsb2NrLmdldERlbHRhKCk7XHJcblx0Ly9maXggdGhpcyAtIGFkZCBvcHRpb25zIHRvIGNvbnRyb2wgbWluIGZyYW1lIHJhdGVcclxuXHRpZiAoZGVsdGEgPiAwLjEpIHtcclxuXHRcdGRlbHRhID0gMC4xO1xyXG5cdH1cclxuXHR0aGlzLmRlbHRhX3RpbWUgPSBkZWx0YTtcclxuXHR0aGlzLnVwZGF0ZShkZWx0YSk7XHJcblx0dGhpcy5yZW5kZXIoZGVsdGEpO1xyXG5cdHRoaXMucnVuKCk7XHJcbiAgICAvL015X0xpYi5ydW4oKTtcclxufVxyXG5cclxuXHJcblxyXG5BcHBsaWNhdGlvbi5wcm90b3R5cGUuYWRkX2FuaW1hdGVkX29iamVjdCA9IGZ1bmN0aW9uIChvYmopXHJcbntcclxuXHQvL2ZpeCBwcm9iYWJseSBkdXBsaWNhdGVzXHJcblx0dGhpcy5hbmltYXRlZF9vYmplY3RzLnB1c2gob2JqKTtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLnJlbW92ZV9hbmltYXRlZF9vYmplY3QgPSBmdW5jdGlvbiAob2JqKVxyXG57XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuYW5pbWF0ZWRfb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0aWYgKHRoaXMuYW5pbWF0ZWRfb2JqZWN0c1tpXSA9PT0gb2JqKSB7XHJcblx0XHRcdHRoaXMuYW5pbWF0ZWRfb2JqZWN0cy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLnVwZGF0ZV9hbGwgPSBmdW5jdGlvbiAoZGVsdGEpXHJcbntcclxuXHR2YXIgb2JqO1xyXG5cdGZvcih2YXIgaSA9IDAsIGxlbiA9IHRoaXMuYW5pbWF0ZWRfb2JqZWN0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0b2JqID0gdGhpcy5hbmltYXRlZF9vYmplY3RzW2ldO1xyXG5cdFx0aWYgKG9ialtcInVwZGF0ZVwiXSkge1xyXG5cdFx0XHRvYmoudXBkYXRlKGRlbHRhKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGVsdGEpXHJcbntcclxuXHR0aGlzLnVwZGF0ZV9hbGwoZGVsdGEpO1xyXG4gICAgTXlfTGliLnBhcnRpY2xlX21hbmFnZXIudXBkYXRlKGRlbHRhKTtcclxufVxyXG5cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5jcmVhdGVfbW91c2VfbW92ZV9saXN0ZW5lciA9IGZ1bmN0aW9uICgpXHJcbntcclxuXHRpZiAodGhpc1tcIm1vdXNlX21vdmVfbGlzdGVuZXJcIl0pIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMubW91c2VfbW92ZV9saXN0ZW5lciA9IHRydWU7XHJcblx0ZnVuY3Rpb24gbW91c2VfbW92ZV9saXN0ZW5lcihldmVudCkge1xyXG5cdFx0dmFyIHZlY3RvciA9IE1vdXNlX0ludGVyc2VjdG9yLm1vdXNlX2Nvb3Jkc190b192ZWN0b3Ioc2VsZi5kb21fc2NyZWVuLCBldmVudCk7XHRcdFxyXG5cdFx0c2VsZi5maW5kX21vdXNlX292ZXJfaW50ZXJzZWN0aW9ucyh2ZWN0b3IpO1xyXG5cdH07XHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3VzZV9tb3ZlX2xpc3RlbmVyKTtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLmZpbmRfbW91c2Vfb3Zlcl9pbnRlcnNlY3Rpb25zID0gZnVuY3Rpb24odmVjdG9yKVxyXG57XHJcblx0dmVjdG9yLnVucHJvamVjdCh0aGlzLm1haW5fY2FtZXJhKTtcclxuXHR2YXIgcmF5ID0gbmV3IFRIUkVFLlJheWNhc3RlciggdGhpcy5tYWluX2NhbWVyYS5wb3NpdGlvbiwgdmVjdG9yLnN1YiggdGhpcy5tYWluX2NhbWVyYS5wb3NpdGlvbiApLm5vcm1hbGl6ZSgpICk7XHJcblx0dmFyIG9iajtcclxuXHRmb3IodmFyIGkgPTAsIGxlbiA9IHRoaXMubW91c2VfY29udHJvbGxlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xyXG5cdFx0b2JqID0gdGhpcy5tb3VzZV9jb250cm9sbGVyc1tpXTtcclxuXHRcdGlmIChvYmoub3Zlcikge1xyXG5cdFx0XHQvLyBjcmVhdGUgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2JqZWN0cyBpbiB0aGUgc2NlbmUgd2l0aCB3aGljaCB0aGUgcmF5IGludGVyc2VjdHNcclxuXHRcdFx0Ly92YXIgaW50ZXJzZWN0cyA9IHJheS5pbnRlcnNlY3RPYmplY3RzKCBbZ3JpZF90ZXh0LnJvb3RdLCB0cnVlICk7IFxyXG5cdFx0XHQvL2NvbnNvbGUubG9nKGZha2VfcGxhbmUucm9vdC5jaGlsZHJlblswXS5nZW9tZXRyeSk7XHJcblx0XHRcdHZhciBpbnRlcnNlY3RzID0gcmF5LmludGVyc2VjdE9iamVjdHMoIFtvYmoucm9vdF0sIHRydWUgKTsgXHJcblx0XHRcdG9iai5jYWxsYmFjayhpbnRlcnNlY3RzKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLnByb3RvdHlwZS5hZGRfbW91c2VfY29udHJvbGxlciA9IGZ1bmN0aW9uIChyb290LCBvdmVyLCBjbGljaywgY2FsbGJhY2spXHJcbntcclxuXHR2YXIgdG1wID0gbmV3IE15X0xpYi5Nb3VzZV9Db250cm9sbGVyKHJvb3QsIG92ZXIsIGNsaWNrLCBjYWxsYmFjaylcclxuXHR0aGlzLm1vdXNlX2NvbnRyb2xsZXJzLnB1c2goIHRtcCApO1xyXG5cdGlmIChvdmVyKSB7XHJcblx0XHR0aGlzLmNyZWF0ZV9tb3VzZV9tb3ZlX2xpc3RlbmVyKCk7XHJcblx0fVxyXG5cdHJldHVybiB0bXA7XHJcbn1cclxuXHJcblxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLnNldF92aWV3cG9ydCA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KVxyXG57XHJcblx0TXlfTGliLlZpZXdwb3J0LndpZHRoID0gd2lkdGg7XHJcblx0TXlfTGliLlZpZXdwb3J0LmhlaWdodCA9IGhlaWdodDtcclxufVxyXG5cclxuQXBwbGljYXRpb24ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChkZWx0YSkgXHJcbntcclxuXHR0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IodGhpcy5jb25maWd1cmF0aW9uLmNsZWFyX2NvbG9yKTtcclxuXHR0aGlzLnJlbmRlcmVyLmF1dG9DbGVhciA9IHRydWU7XHJcblx0dGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5tYWluX3NjZW5lLCB0aGlzLm1haW5fY2FtZXJhKTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQge0FwcGxpY2F0aW9ufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2FwcGxpY2F0aW9uLmpzIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4vbXlfbGliLmpzJztcclxuXHJcbiAgICBmdW5jdGlvbiBCYXNlX0FuaW1hdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lX3NjYWxlID0gMS4wO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IFwiQmFzZV9BbmltYXRpb25cIjsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBCYXNlX0FuaW1hdGlvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGR0KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzY2FsZWRfZHQgPSBkdCAqIHRoaXMudGltZV9zY2FsZTtcclxuICAgICAgICB0aGlzLnRpbWUgKz0gc2NhbGVkX2R0O1xyXG4gICAgICAgIHRoaXMuY2FsY19hbmltYXRpb24oZHQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBCYXNlX0FuaW1hdGlvbi5wcm90b3R5cGUuY2FsY19hbmltYXRpb24gPSBmdW5jdGlvbiAoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKG9iailcclxuICAgIHtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIChkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgZGF0YS51dWlkID0gdGhpcy51dWlkO1xyXG4gICAgICAgIGRhdGEudHlwZSA9IHRoaXMudHlwZTtcclxuICAgICAgICBpZiAodGhpcy5uYW1lICE9PSAnJykge1xyXG4gICAgICAgICAgICBkYXRhLm5hbWUgPSB0aGlzLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEudGltZV9zY2FsZSA9IHRoaXMudGltZV9zY2FsZTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQmFzZV9BbmltYXRpb24ucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKHBhcmFtKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHBhcmFtLnR5cGU7XHJcbiAgICAgICAgdGhpcy51dWlkID0gcGFyYW0udXVpZDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBwYXJhbS5uYW1lID8gcGFyYW0ubmFtZSA6ICcnO1xyXG4gICAgICAgIHRoaXMudGltZV9zY2FsZSA9IChwYXJhbS50aW1lX3NjYWxlID09PSB1bmRlZmluZWQpID8gMS4wIDogcGFyYW0udGltZV9zY2FsZTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgXHJcbmZ1bmN0aW9uIEV1bGVyX0FuaW1hdGlvbiAoeCwgeSwgeilcclxue1xyXG4gICAgQmFzZV9BbmltYXRpb24uY2FsbCh0aGlzKTtcclxuICAgIHRoaXMudHlwZSA9IFwiRXVsZXJfQW5pbWF0aW9uXCI7XHJcblx0dGhpcy54c3BlZWQgPSB4O1xyXG5cdHRoaXMueXNwZWVkID0geTtcclxuXHR0aGlzLnpzcGVlZCA9IHo7XHJcbiAgICB0aGlzLnggPSAwO1xyXG4gICAgdGhpcy55ID0gMDtcclxuICAgIHRoaXMueiA9IDA7XHJcbiAgICB0aGlzLm5hbWUgPSAnJztcclxuICAgIHRoaXMudXVpZCA9IF8uZ2VuZXJhdGVVVUlEKCk7XHJcbn1cclxuXHJcbkV1bGVyX0FuaW1hdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VfQW5pbWF0aW9uLnByb3RvdHlwZSk7XHJcblxyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJCYXNlX0FuaW1hdGlvblwiLCBCYXNlX0FuaW1hdGlvbik7XHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIkV1bGVyX0FuaW1hdGlvblwiLCBFdWxlcl9BbmltYXRpb24pO1xyXG5cclxuRXVsZXJfQW5pbWF0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEV1bGVyX0FuaW1hdGlvbjtcclxuXHJcbkV1bGVyX0FuaW1hdGlvbi5wcm90b3R5cGUuY2FsY19hbmltYXRpb24gPSBmdW5jdGlvbiAoZHQpXHJcbntcclxuICAgIGR0ICo9IHRoaXMudGltZV9zY2FsZTtcclxuXHR0aGlzLnggKz0gdGhpcy54c3BlZWQgKiBkdDtcclxuXHR0aGlzLnkgKz0gdGhpcy55c3BlZWQgKiBkdDtcclxuXHR0aGlzLnogKz0gdGhpcy56c3BlZWQgKiBkdDtcclxufVxyXG4gICAgXHJcbkV1bGVyX0FuaW1hdGlvbi5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbiAob2JqKVxyXG57XHJcbiAgICBvYmoucm90YXRpb24ueCA9IHRoaXMueDtcclxuICAgIG9iai5yb3RhdGlvbi55ID0gdGhpcy55O1xyXG4gICAgb2JqLnJvdGF0aW9uLnogPSB0aGlzLno7XHJcbn1cclxuXHJcbkV1bGVyX0FuaW1hdGlvbi5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKGpzb24pXHJcbntcclxuICAgdmFyIGRhdGEgPSBCYXNlX0FuaW1hdGlvbi5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcyk7XHJcbiAgIGRhdGEueHNwZWVkID0gdGhpcy54c3BlZWQ7XHJcbiAgIGRhdGEueXNwZWVkID0gdGhpcy55c3BlZWQ7XHJcbiAgIGRhdGEuenNwZWVkID0gdGhpcy56c3BlZWQ7XHJcbiAgIHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5FdWxlcl9BbmltYXRpb24ucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKHBhcmFtKVxyXG57XHJcbiAgICBCYXNlX0FuaW1hdGlvbi5wcm90b3R5cGUucGFyc2UuY2FsbCh0aGlzLCBwYXJhbSk7XHJcbiAgICB0aGlzLnhzcGVlZCA9IHBhcmFtLnhzcGVlZDtcclxuICAgIHRoaXMueXNwZWVkID0gcGFyYW0ueXNwZWVkO1xyXG4gICAgdGhpcy56c3BlZWQgPSBwYXJhbS56c3BlZWQ7XHJcbiAgICB0aGlzLnggPSB0aGlzLnkgPSB0aGlzLnogPSAwOyAgICBcclxufVxyXG5cclxuZXhwb3J0IHsgQmFzZV9BbmltYXRpb24sIEV1bGVyX0FuaW1hdGlvbiB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXNlL2FuaW1hdGlvbnMuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi9teV9saWIuanMnO1xyXG5cclxuLy9ldmVudHM6IFxyXG4vL2l0ZW1fbG9hZGVkXHJcbi8vb25lcnJvclxyXG4vL29ucHJvZ3Jlc3NcclxuLy9maW5pc2hlZFxyXG5mdW5jdGlvbiBDaGFpbl9Mb2FkZXIoKVxyXG57XHJcbn1cclxuXHJcbkNoYWluX0xvYWRlci5wcm90b3R5cGUgPSB7XHJcblx0Y29uc3RydWN0b3I6IENoYWluX0xvYWRlcixcclxuXHRzdGFydDogZnVuY3Rpb24gKGxpc3QpIFxyXG5cdHtcclxuXHRcdHRoaXMubGlzdCA9IGxpc3Q7XHJcblx0XHR0aGlzLmluZGV4ID0gMDtcclxuXHRcdHRoaXMubG9hZCh0aGlzLmxpc3RbMF0pO1xyXG5cdFx0dGhpcy5zdG9wX2J5X2Vycm9yID0gZmFsc2U7XHJcblx0fSxcclxuXHRcclxuXHRuZXh0OiBmdW5jdGlvbihyZXNvdXJjZSlcclxuXHR7XHJcblx0XHRpZiAodGhpcy5pdGVtX2xvYWRlZCAmJiByZXNvdXJjZSkge1xyXG5cdFx0XHR0aGlzLml0ZW1fbG9hZGVkKHJlc291cmNlLHRoaXMubGlzdFt0aGlzLmluZGV4XSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmluZGV4Kys7XHJcblx0XHRpZiAodGhpcy5pbmRleCA8IHRoaXMubGlzdC5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5sb2FkKHRoaXMubGlzdFt0aGlzLmluZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodGhpcy5maW5pc2hlZCkge1xyXG5cdFx0XHRcdHRoaXMuZmluaXNoZWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0XHJcblx0ZG9fZXJyb3I6IGZ1bmN0aW9uIChlcnJvcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5vbmVycm9yKSB7XHJcblx0XHRcdHRoaXMub25lcnJvcihlcnJvcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3IhXCIsIGVycm9yKTtcdFx0XHJcblx0XHR9XHJcblx0XHRpZiAoIXRoaXMuc3RvcF9ieV9lcnJvcikge1xyXG5cdFx0XHR0aGlzLm5leHQoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdFxyXG5cdGRvX3Byb2dyZXNzOiBmdW5jdGlvbiAoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLm9ucHJvZ3Jlc3MpIHtcclxuXHRcdFx0dGhpcy5vbnByb2dyZXNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRcdFxyXG5cdGxvYWQ6IGZ1bmN0aW9uIChpdGVtKVxyXG5cdHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdGlmICh0aGlzLmxvYWRfZnVuYykge1xyXG5cdFx0XHR0aGlzLmxvYWRfZnVuYyhpdGVtLCBcclxuXHRcdFx0ZnVuY3Rpb24gKGl0ZW0pIHsgc2VsZi5uZXh0LmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7IH0sXHJcblx0XHRcdGZ1bmN0aW9uIChpdGVtKSB7IHNlbGYuZG9fZXJyb3IuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTsgfSxcclxuXHRcdFx0ZnVuY3Rpb24gKGl0ZW0pIHsgc2VsZi5kb19wcm9ncmVzcy5hcHBseShzZWxmLCBhcmd1bWVudHMpOyB9KTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gdGVzdF9jaGFpbl9sb2FkZXIoKSBcclxue1xyXG5cdHZhciBjbCA9IG5ldyBDaGFpbl9Mb2FkZXIoKTtcclxuXHRjbC5pdGVtX2xvYWRlZCA9IGZ1bmN0aW9uIChpdGVtKSB7Y29uc29sZS5sb2coXCJsb2FkIGl0ZW0gXCIsIGl0ZW0pO31cclxuXHRjbC5maW5pc2hlZCA9IGZ1bmN0aW9uIChpdGVtKSB7Y29uc29sZS5sb2coXCJsb2FkZXIgbWFuYWdlciAtIGpvYiBkb25lXCIpO31cclxuXHRjbC5sb2FkX2Z1bmMgPSBmdW5jdGlvbiAoaXRlbSwgbmV4dCwgZXJyb3IsIHByb2dyZXNzKSB7IFxyXG5cdFx0aWYgKGl0ZW0pIHtcclxuXHRcdFx0bmV4dChpdGVtKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVycm9yKGl0ZW0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjbC5zdGFydChbXCJmaXJzdFwiLCBcInNlY29uZFwiLCBudWxsLCBcInRyZWVcIl0pO1xyXG59XHJcbi8vdGVzdF9jaGFpbl9sb2FkZXIoKTtcclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIExvYWRpbmdfTWFuYWdlciAoKVxyXG57XHJcblx0dGhpcy5yZXNvdXJjZXMgPSB7fTtcclxuXHR0aGlzLnRleHR1cmVfbG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcclxufVxyXG5cclxuTG9hZGluZ19NYW5hZ2VyLnByb3RvdHlwZSA9IHtcclxuXHRjb25zdHJ1Y3RvcjogTG9hZGluZ19NYW5hZ2VyLFxyXG5cdGdldDogZnVuY3Rpb24gKG5hbWUpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMucmVzb3VyY2VzW25hbWVdO1xyXG5cdH0sXHJcblx0XHJcblx0Z2V0X2FzeW5jOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spXHJcblx0e1xyXG5cdFx0Ly9hbHJlYWR5IGxvYWRlZD9cclxuXHRcdHZhciB0ZXh0dXJlID0gdGhpcy5nZXQobmFtZSk7XHJcblx0XHRpZiAodGV4dHVyZSkge1xyXG5cdFx0XHRpZiAoY2FsbGJhY2spIHtcclxuXHRcdFx0XHRjYWxsYmFjayh0ZXh0dXJlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGV4dHVyZTtcclxuXHRcdH1cclxuXHJcblx0XHQvL2lmIG5vdCBsb2FkIHRoaXMgYXN5bmNcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHRleHR1cmUgPSB0aGlzLnRleHR1cmVfbG9hZGVyLmxvYWQobmFtZSwgZnVuY3Rpb24gKHRleHR1cmUpXHJcblx0XHR7XHJcblx0XHRcdGlmIChjYWxsYmFjaykge1xyXG5cdFx0XHRcdGNhbGxiYWNrKHRleHR1cmUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHRoaXMucmVzb3VyY2VzW25hbWVdID0gdGV4dHVyZTtcdFxyXG5cdFx0cmV0dXJuIHRleHR1cmU7XHJcblx0fSxcclxuXHRcclxuXHJcblx0bG9hZF9saXN0OiBmdW5jdGlvbiAocmVzb3VyY2VfbGlzdCwgb25fbG9hZCwgbG9hZF9mdW5jLCBvbl9wcm9ncmVzcylcclxuXHR7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdHZhciBjbCA9IG5ldyBDaGFpbl9Mb2FkZXIoKTtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdGNsLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkVSUk9SIGxvYWRpbmcgdGV4dHVyZVwiLCBlcnJvciwgY2wubGlzdFtjbC5pbmRleF0pO1x0XHJcblx0XHR9XHJcblx0XHRjbC5pdGVtX2xvYWRlZCA9IGZ1bmN0aW9uIChyZXNvdXJjZSwgbmFtZSkge1xyXG5cdFx0XHRzZWxmLnJlc291cmNlc1tuYW1lXSA9IHJlc291cmNlO1xyXG5cdFx0XHRpZiAoc2VsZi5vbl9yZXNvdXJjZV9sb2FkZWQpIHtcclxuXHRcdFx0XHRzZWxmLm9uX3Jlc291cmNlX2xvYWRlZChyZXNvdXJjZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNsLm9uX3Byb2dyZXNzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAob25fcHJvZ3Jlc3MpIHtcclxuXHRcdFx0XHRvbl9wcm9ncmVzcygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjbC5sb2FkX2Z1bmMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGxvYWRfZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0fVxyXG5cdFx0Y2wuZmluaXNoZWQgPSBmdW5jdGlvbiAoKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAob25fbG9hZCkge1xyXG5cdFx0XHRcdG9uX2xvYWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2wuc3RhcnQocmVzb3VyY2VfbGlzdCk7XHJcblx0XHRcclxuXHR9LFxyXG5cclxuXHRsb2FkX2xpc3RfdGV4dHVyZXM6IGZ1bmN0aW9uIChyZXNvdXJjZV9saXN0LCBvbl9sb2FkKVxyXG5cdHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHRoaXMubG9hZF9saXN0KHJlc291cmNlX2xpc3QsIG9uX2xvYWQsIGZ1bmN0aW9uICh1cmwsIG5leHQsIGVycm9yLCBwcm9ncmVzcyApIFxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgdGV4dHVyZSA9IHNlbGYudGV4dHVyZV9sb2FkZXIubG9hZCh1cmwsIG5leHQsIHByb2dyZXNzLCBlcnJvcik7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRsb2FkX2xpc3RfanNvbjogZnVuY3Rpb24gKHJlc291cmNlX2xpc3QsIG9uX2xvYWQsIHByb2dyZXNzKVxyXG5cdHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHZhciBsb2FkZXIgPSBuZXcgVEhSRUUuWEhSTG9hZGVyKCk7XHRcclxuXHRcdHRoaXMubG9hZF9saXN0KHJlc291cmNlX2xpc3QsIG9uX2xvYWQsIGZ1bmN0aW9uICh1cmwsIG5leHQsIGVycm9yLCBwcm9ncmVzcykgXHJcblx0XHR7XHJcblx0XHRcdHZhciB0ZXh0dXJlID0gbG9hZGVyLmxvYWQodXJsLCBuZXh0LCBwcm9ncmVzcywgZXJyb3IpO1xyXG5cdFx0fSwgcHJvZ3Jlc3MpO1xyXG5cdH0sXHJcblx0XHJcblx0ZnJlZTogZnVuY3Rpb24gKClcclxuXHR7XHJcblx0XHR0aGlzLnJlc291cmNlcyA9IHt9O1xyXG5cdH1cclxufTtcclxuXHJcblxyXG5NeV9MaWIuVGV4dHVyZV9NYW5hZ2VyID0gbmV3IExvYWRpbmdfTWFuYWdlcigpO1x0XHJcblxyXG5leHBvcnQgeyBMb2FkaW5nX01hbmFnZXIgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmFzZS9sb2FkaW5nX21hbmFnZXIuanMiLCIvL1RPRE86IHJlbW92ZSB0aGlzIHVnbHkgY3JhcCBhbmQgcmVwbGFjZSBzb21ldGhpbmcgcmVhc29uYWJsZVxyXG5cclxuaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4vbXlfbGliLmpzJztcclxuXHJcbi8vdGhpcyB1Z2x5IGNsYXNzIGxvYWRpbmcgdGV4dHVyZSBsaXN0IGluIGpzb24gZm9ybWF0LCBwYXJzZSBpdCwgYW5kIGxvYWRpbmcgdGV4dHVyZXNcclxuLy90aGVuIGl0IGNhbGwgZXZlbnQgZGF0YV9sb2FkZWQsIHdoZW4gZ2l2ZSB0ZXh0dXJlIGxpc3QgaW4ganNvbiBmb3JtYXRcclxuXHJcbmZ1bmN0aW9uIFBhY2thZ2VfTWFuYWdlcigpXHJcbntcclxuICAgIHRoaXMuc3RhdGUgPSB7fTtcclxufVxyXG5cclxuLy9sb2FkIGpzb24gZmlsZSB3aXRoIGRlc2NyaXB0aW9ucyBvZiBwYWNrYWdlOiB0ZXh0dXJlIGxpc3QsIHBhcnRpY2xlcyBsaXN0LCBzY2VuZSBvYmplY3RzIGxpc3RcclxuUGFja2FnZV9NYW5hZ2VyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKHVybCwgZGVmYXVsdHMpXHJcbntcclxuICAgIHRoaXMuZGVmYXVsdHMgPSBkZWZhdWx0cztcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RhcnRcIlxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgZnVuY3Rpb24gb25sb2FkIChkYXRhKSB7XHJcbiAgICAgICAgc2VsZi5zdGF0ZVtcInR5cGVcIl0gPSBcImRvbmVcIjtcclxuICAgICAgICBzZWxmLnN0YXRlW1wiZGF0YVwiXSA9IGRhdGE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2VsZi5wYXJzZV9wYWNrYWdlX2Rlc2NyaXB0aW9uKGRhdGEpOyAgICAgICAgXHJcbiAgICB9ICAgIFxyXG4gICAgZnVuY3Rpb24gZXJyb3IoZXZlbnQpIHtcclxuICAgICAgICBzZWxmLnN0YXRlW1widHlwZVwiXSA9IFwiZXJyb3JcIjtcclxuICAgICAgICBzZWxmLnN0YXRlW1wiZXJyb3JcIl0gPSBldmVudDtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRVJyb3IhIEZhaWxlZCBsb2FkaW5nIHJlc291cmNlcyB3aXRoIHVybCBcIit1cmwsIGV2ZW50LnRhcmdldCk7ICAgICAgICBcclxuICAgICAgICBpZiAoc2VsZi5lcnJvcil7XHJcbiAgICAgICAgICAgIHNlbGYuZXJyb3IoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5wYWNrID0gc2VsZi5kZWZhdWx0c1xyXG4gICAgICAgIHNlbGYubG9hZF9yZXNvdXJjZXMoc2VsZi5kZWZhdWx0cyk7XHJcblxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgfVxyXG4gICAgdmFyIHhociA9IG5ldyBUSFJFRS5YSFJMb2FkZXIoKTtcclxuICAgIHhoci5sb2FkKHVybCwgb25sb2FkLCBwcm9ncmVzcywgZXJyb3IpO1xyXG59XHJcblxyXG4vL3BhcnNlIGxvYWRlZCBqc29uIGZpbGUgXHJcblBhY2thZ2VfTWFuYWdlci5wcm90b3R5cGUucGFyc2VfcGFja2FnZV9kZXNjcmlwdGlvbiA9IGZ1bmN0aW9uIChkYXRhKVxyXG57XHJcbiAgICBjb25zb2xlLmxvZyhcInBhY2thZ2VkIGRlc2NyaXB0aW9uIGxvYWRlZCwgYmVnaW4gcGFyc2luZy4uLlwiKTtcclxuICB0cnkge1xyXG4gICAgICAgIHZhciBwYWNrID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICB0aGlzLnBhY2sgPSBwYWNrO1xyXG4gICAgICAgIGlmICh0aGlzLmxvYWRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZChwYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgIH0gXHJcbiAgIGNhdGNoKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3IgcGFyc2luZyByZXNvdXJjZXMgXCIsIGUpO1xyXG4gICAgICAgIGlmICh0aGlzLmVycm9yKXtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcihldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjsgICAgICAgIFxyXG4gICB9XHJcbiAgIHRoaXMubG9hZF9yZXNvdXJjZXMocGFjayk7XHJcbn1cclxuXHJcblxyXG5QYWNrYWdlX01hbmFnZXIucHJvdG90eXBlLmxvYWRfcmVzb3VyY2VzID0gZnVuY3Rpb24gKHBhY2spXHJcbntcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIC8vbG9hZCB0ZXh0dXJlc1xyXG4gICBjb25zb2xlLmxvZyhcIlBhY2thZ2UgTWFuYWdlcjogYmVnaW4gbG9hZGluZyB0ZXh0dXJlcy4uLlwiKTsgICAgXHJcbiAgICBNeV9MaWIuVGV4dHVyZV9NYW5hZ2VyLmxvYWRfbGlzdF90ZXh0dXJlcyhwYWNrLnRleHR1cmVzLCBmdW5jdGlvbiAoKXtcclxuICAgICAgICAvL2xvYWQganNvbiBkZXNjcmlwdGlvbnMgZmlsZXNcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmRhdGFfbG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhX2xvYWRlZChwYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBQYWNrYWdlX01hbmFnZXIgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmFzZS9wYWNrYWdlX21hbmFnZXIuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi9teV9saWIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX01hbmFnZXJ9IGZyb20gJy4uL3BhcnRpY2xlcy9wYXJ0aWNsZXNfbWFuYWdlci5qcydcclxuXHJcbmZ1bmN0aW9uIFNjZW5lX1NlcmlhbGl6ZXIocm9vdClcclxue1xyXG4gICAgdGhpcy5hbmltYXRpb25fbGlicmFyeSA9IHt9O1xyXG59XHJcblxyXG5TY2VuZV9TZXJpYWxpemVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAocm9vdClcclxue1xyXG4gICAgdGhpcy5qc29uID0gcm9vdC50b0pTT04oKTtcclxuICAgIGNvbnNvbGUubG9nKFwibXkgbGliIHBhcnRpY2xlIG1hbmFnZXJcIiwgTXlfTGliLnBhcnRpY2xlX21hbmFnZXIpO1xyXG4gICAgdGhpcy5qc29uW1wicGFydGljbGVzXCJdID0gTXlfTGliLnBhcnRpY2xlX21hbmFnZXIudG9KU09OKCk7XHJcbiAgICB2YXIgYW5pbXMgPSByb290LmNvbGxlY3RfYW5pbWF0aW9ucyhyb290KTtcclxuICAgIGlmIChhbmltcy5jb3VudCA+IDApIHtcclxuICAgICAgICB0aGlzLmpzb25bXCJteWFuaW1hdGlvbnNcIl0gPSBhbmltcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHRoaXMuanNvbjtcclxufVxyXG5cclxuXHJcblxyXG5TY2VuZV9TZXJpYWxpemVyLnByb3RvdHlwZS5jcmVhdGVfYW5pbWF0aW9ucyA9IGZ1bmN0aW9uIChhbmltYXRpb25zKSB7XHJcbiAgICBmb3IodmFyIGtleSBpbiBhbmltYXRpb25zKSB7XHJcbiAgICAgICAgaWYgKCB0aGlzLmFuaW1hdGlvbl9saWJyYXJ5W2tleV0gPT09IHVuZGVmaW5lZCAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYW5pbWF0aW9ucywga2V5KSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGFuaW1hdGlvbnNba2V5XTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNyZWF0ZSBhbmltYXRpb25zIFwiLCBkYXRhLnV1aWQpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgYW5pbSA9ICBNeV9MaWIuQWJzdHJhY3RfRmFicmljKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoYW5pbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25fbGlicmFyeVtrZXldID0gYW5pbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5TY2VuZV9TZXJpYWxpemVyLnByb3RvdHlwZS5iaW5kX2FuaW1hdGlvbnMgPSBmdW5jdGlvbiAoYW5pbWRhdGEpXHJcbntcclxuICAgIGlmICghYW5pbWRhdGEpIHJldHVybjtcclxuICAgIFxyXG4gICAgdmFyIGJpbmRpbmdzID0gYW5pbWRhdGEuYmluZGluZ3M7XHJcbiAgICBcclxuICAgIFxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgZnVuY3Rpb24gY29weV9hbmltYXRpb25zKG9iaiwgYmluZClcclxuICAgIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYmluZC5hbmltYXRpb25zLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdmFyIGFuaW1fdXVpZCA9IGJpbmQuYW5pbWF0aW9uc1tpXTtcclxuICAgICAgICAgICAgb2JqLmFkZF9hbmltYXRpb24oIHNlbGYuYW5pbWF0aW9uX2xpYnJhcnlbYW5pbV91dWlkXSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgIGZvcih2YXIgaSA9MDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGJpbmQgPSBiaW5kaW5nc1tpXTtcclxuICAgICAgICB2YXIgdXVpZCA9IGJpbmQudXVpZDtcclxuICAgICAgICB2YXIgb2JqID0gdGhpcy5yb290LmdldE9iamVjdEJ5UHJvcGVydHkoXCJ1dWlkXCIsIHV1aWQpO1xyXG4gICAgICAgIGlmIChvYmopIHtcclxuICAgICAgICAgICAgY29weV9hbmltYXRpb25zKG9iaiwgYmluZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuU2NlbmVfU2VyaWFsaXplci5wcm90b3R5cGUubG9hZF9mcm9tX2pzb24gPSBmdW5jdGlvbiAodXJsKVxyXG57XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBmdW5jdGlvbiBvbmxvYWQoanNvbilcclxuICAgIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoanNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBwYXJzZSBzY2VuZSBcIiwgZSk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNvbWV0aGluZyBmdWNraW5nIGhhcHBlbmVkLCBmYWlsZWQgdG8gbG9hZCBzY2VuZSBcIiwgdXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmxvYWQoZGF0YSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwcm9ncmVzcygpXHJcbiAgICB7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBlcnJvcihlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZS50YXJnZXQpO1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbiAgICB2YXIgeGhyID0gbmV3IFRIUkVFLlhIUkxvYWRlcigpO1xyXG4gICAgeGhyLmxvYWQodXJsLCBvbmxvYWQsIHByb2dyZXNzLCBlcnJvcik7XHJcbn1cclxuXHJcblNjZW5lX1NlcmlhbGl6ZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoanNvbilcclxue1xyXG4gICAgdGhpcy5hbmltYXRpb25fbGlicmFyeSA9IHt9O1xyXG4gICAgdmFyIG8gPSBuZXcgVEhSRUUuT2JqZWN0TG9hZGVyKCk7XHJcbiAgICBpZiAoanNvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5qc29uID0ganNvbjtcclxuICAgIH1cclxuICAgIHZhciByb290ID0gby5wYXJzZSh0aGlzLmpzb24sIGZ1bmN0aW9uICgpIHtjb25zb2xlLmxvZyhcIm9ubG9hZFwiKX0pO1xyXG4gICAgdGhpcy5yb290ID0gcm9vdDsgICAgXHJcblxyXG4gICAgTXlfTGliLnBhcnRpY2xlX21hbmFnZXIubG9hZF9wYXJ0aWNsZXModGhpcy5qc29uLCByb290KTtcclxuICAgIFxyXG4gICAgdGhpcy5jcmVhdGVfYW5pbWF0aW9ucyh0aGlzLmpzb24ubXlhbmltYXRpb25zLmFuaW1hdGlvbnMpO1xyXG4gICAgdGhpcy5iaW5kX2FuaW1hdGlvbnModGhpcy5qc29uLm15YW5pbWF0aW9ucyk7XHJcbiAgICB0aGlzLm1haW5fY2FtZXJhID0gcm9vdC5nZXRPYmplY3RCeU5hbWUoXCJtYWluX2NhbWVyYVwiKTtcclxuICAgIFxyXG4gICAgaWYgKHRoaXMuc2NlbmVfbG9hZGVkKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZV9sb2FkZWQocm9vdCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm9vdDtcclxufVxyXG5cclxuZXhwb3J0IHsgU2NlbmVfU2VyaWFsaXplciB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXNlL3NjZW5lX3NlcmlhbGl6ZXIuanMiLCJmdW5jdGlvbiBNaXhfSXQoKVxyXG57XHJcblxyXG5cdC8vRklYXHJcblx0VEhSRUUuVmVjdG9yMy5wcm90b3R5cGUuYXBwbHlNYXRyaXg0X3JvdGF0aW9uID0gZnVuY3Rpb24gKCBtICkgXHJcblx0e1xyXG5cdFx0Ly8gaW5wdXQ6IFRIUkVFLk1hdHJpeDQgYWZmaW5lIG1hdHJpeFxyXG5cclxuXHRcdHZhciB4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB6ID0gdGhpcy56O1xyXG5cdFx0dmFyIGUgPSBtLmVsZW1lbnRzO1xyXG5cclxuXHRcdHRoaXMueCA9IGVbIDAgXSAqIHggKyBlWyA0IF0gKiB5ICsgZVsgOCBdICAqIHo7XHJcblx0XHR0aGlzLnkgPSBlWyAxIF0gKiB4ICsgZVsgNSBdICogeSArIGVbIDkgXSAgKiB6O1xyXG5cdFx0dGhpcy56ID0gZVsgMiBdICogeCArIGVbIDYgXSAqIHkgKyBlWyAxMCBdICogejtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuIFx0fVxyXG5cclxudmFyIE9iamVjdDNEX0FuaW1hdGlvbl9NaXhpbiA9IHtcclxuICAgIFxyXG4gICAgYWRkX2FuaW1hdGlvbjogZnVuY3Rpb24gKGFuaW0pXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbnMuaW5kZXhPZihhbmltKSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnB1c2goYW5pbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgcmVtb3ZlX2FuaW1hdGlvbjogZnVuY3Rpb24gKGFuaW0pXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMuYW5pbWF0aW9ucy5pbmRleE9mKGFuaW0pO1xyXG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgdXBkYXRlOiAgZnVuY3Rpb24gKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPTA7IGkgPCB0aGlzLmFuaW1hdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbmltID0gdGhpcy5hbmltYXRpb25zW2ldO1xyXG4gICAgICAgICAgICAgICAgYW5pbS51cGRhdGUoZHQpO1xyXG4gICAgICAgICAgICAgICAgYW5pbS5hcHBseSh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAob2JqLnVwZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBcclxufTtcclxuXy5jb3B5X29iamVjdChUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUsIE9iamVjdDNEX0FuaW1hdGlvbl9NaXhpbik7XHJcblxyXG5cclxuVEhSRUUuT2JqZWN0M0QucHJvdG90eXBlLm9sZF90b0pzb24gPSBUSFJFRS5PYmplY3QzRC50b0pTT047XHJcblxyXG52YXIgT2JqZWN0M0RfU2VyaWFsaXphdGlvbl9NaXhpbiA9IFxyXG57XHJcbiAgICBzdGFuZGFyZF9zZXJpYWxpemF0aW9uOiBmdW5jdGlvbiAobWV0YSkgXHJcbiAgICB7XHJcblx0XHQvLyBzdGFuZGFyZCBPYmplY3QzRCBzZXJpYWxpemF0aW9uXHJcblx0XHR2YXIgb2JqZWN0ID0ge307XHJcblxyXG5cdFx0b2JqZWN0LnV1aWQgPSB0aGlzLnV1aWQ7XHJcblx0XHRvYmplY3QudHlwZSA9IHRoaXMudHlwZTtcclxuXHRcdGlmICggdGhpcy5uYW1lICE9PSAnJyApIG9iamVjdC5uYW1lID0gdGhpcy5uYW1lO1xyXG5cdFx0aWYgKCBKU09OLnN0cmluZ2lmeSggdGhpcy51c2VyRGF0YSApICE9PSAne30nICkgb2JqZWN0LnVzZXJEYXRhID0gdGhpcy51c2VyRGF0YTtcclxuXHRcdGlmICggdGhpcy5jYXN0U2hhZG93ID09PSB0cnVlICkgb2JqZWN0LmNhc3RTaGFkb3cgPSB0cnVlO1xyXG5cdFx0aWYgKCB0aGlzLnJlY2VpdmVTaGFkb3cgPT09IHRydWUgKSBvYmplY3QucmVjZWl2ZVNoYWRvdyA9IHRydWU7XHJcblx0XHRpZiAoIHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgKSBvYmplY3QudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuXHRcdG9iamVjdC5tYXRyaXggPSB0aGlzLm1hdHJpeC50b0FycmF5KCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT09IFwicGFydGljbGVzX3BvaW50c1wiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2VvbWV0cnkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lmdlb21ldHJ5ID0gdGhpcy5nZW9tZXRyeS51dWlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5tYXRlcmlhbCAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0Lm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbC51dWlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIHRoaXMubWF0ZXJpYWwgIT09IHVuZGVmaW5lZCAgJiYgIG1ldGEubWF0ZXJpYWxzWyB0aGlzLm1hdGVyaWFsLnV1aWQgXSA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGEubWF0ZXJpYWxzWyB0aGlzLm1hdGVyaWFsLnV1aWQgXSA9IHRoaXMubWF0ZXJpYWwudG9KU09OKCBtZXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLmdlb21ldHJ5ICE9PSB1bmRlZmluZWQgJiYgbWV0YS5nZW9tZXRyaWVzWyB0aGlzLmdlb21ldHJ5LnV1aWQgXSA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGEuZ2VvbWV0cmllc1sgdGhpcy5nZW9tZXRyeS51dWlkIF0gPSB0aGlzLmdlb21ldHJ5LnRvSlNPTiggbWV0YSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbnMpIHtcclxuICAgICAgICAgICAgb2JqZWN0LmFuaW1hdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0wOyBpIDwgdGhpcy5hbmltYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuYW5pbWF0aW9ucy5wdXNoICggdGhpcy5hbmltYXRpb25zW2ldLnV1aWQgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHRcdGlmICggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwICkge1xyXG5cdFx0XHRvYmplY3QuY2hpbGRyZW4gPSBbXTtcclxuXHRcdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgKysgKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdGhpcy5jaGlsZHJlblsgaSBdO1xyXG5cdFx0XHRcdC8vb2JqZWN0LmNoaWxkcmVuLnB1c2goIGNoaWxkLnN0YW5kYXJkX3NlcmlhbGl6YXRpb24oIG1ldGEgKSApO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LmNoaWxkcmVuLnB1c2goIGNoaWxkLnRvSlNPTiggbWV0YSApICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgY29sbGVjdF9tYXRlcmlhbHM6IGZ1bmN0aW9uIChtZXRhKSBcclxuICAgIHtcclxuXHRcdGlmICggdGhpcy5tYXRlcmlhbCAhPT0gdW5kZWZpbmVkICAmJiAgbWV0YS5tYXRlcmlhbHNbIHRoaXMubWF0ZXJpYWwudXVpZCBdID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBtZXRhLm1hdGVyaWFsc1sgdGhpcy5tYXRlcmlhbC51dWlkIF0gPSB0aGlzLm1hdGVyaWFsLnRvSlNPTiggbWV0YSk7XHJcblx0XHR9XHJcbiAgICAgICAgXHJcblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcclxuXHRcdFx0dGhpcy5jaGlsZHJlblsgaSBdLmNvbGxlY3RfbWF0ZXJpYWxzKG1ldGEpO1xyXG5cdFx0fVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgY29sbGVjdF9nZW9tZXRyeTogZnVuY3Rpb24gKG1ldGEpXHJcbiAgICB7XHJcblx0XHRpZiAoIHRoaXMuZ2VvbWV0cnkgIT09IHVuZGVmaW5lZCAmJiBtZXRhLmdlb21ldHJpZXNbIHRoaXMuZ2VvbWV0cnkudXVpZCBdID09PSB1bmRlZmluZWQgKSB7XHJcblx0XHRcdFx0bWV0YS5nZW9tZXRyaWVzWyB0aGlzLmdlb21ldHJ5LnV1aWQgXSA9IHRoaXMuZ2VvbWV0cnkudG9KU09OKCBtZXRhICk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgKysgKSB7XHJcblx0XHRcdHRoaXMuY2hpbGRyZW5bIGkgXS5jb2xsZWN0X2dlb21ldHJ5KG1ldGEpO1xyXG5cdFx0fVxyXG4gICAgfSxcclxuICAgIFxyXG5cdHRvSlNPTjE6IGZ1bmN0aW9uICggbWV0YSApIHtcclxuICAgIFxyXG5cdFx0Ly8gZXh0cmFjdCBkYXRhIGZyb20gdGhlIGNhY2hlIGhhc2hcclxuXHRcdC8vIHJlbW92ZSBtZXRhZGF0YSBvbiBlYWNoIGl0ZW1cclxuXHRcdC8vIGFuZCByZXR1cm4gYXMgYXJyYXlcclxuXHRcdGZ1bmN0aW9uIGV4dHJhY3RGcm9tQ2FjaGUoIGNhY2hlLCB0ICkge1xyXG5cdFx0XHR2YXIgdmFsdWVzID0gW107XHJcblx0XHRcdGZvciAoIHZhciBrZXkgaW4gY2FjaGUgKSB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBjYWNoZVsga2V5IF07XHJcblx0XHRcdFx0ZGVsZXRlIGRhdGEubWV0YWRhdGE7XHJcblx0XHRcdFx0dmFsdWVzLnB1c2goIGRhdGEgKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdmFsdWVzO1xyXG5cdFx0fVxyXG4gICAgXHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4V29ybGQodHJ1ZSk7XHJcbiAgICAgICAgXHJcblx0XHQvLyBtZXRhIGlzICcnIHdoZW4gY2FsbGVkIGZyb20gSlNPTi5zdHJpbmdpZnlcclxuXHRcdHZhciBpc1Jvb3RPYmplY3QgPSAoIG1ldGEgPT09IHVuZGVmaW5lZCB8fCBtZXRhID09PSAnJyApO1xyXG5cclxuXHRcdHZhciBvdXRwdXQgPSB7fTtcclxuXHJcblx0XHRpZiAoIGlzUm9vdE9iamVjdCApIHtcclxuXHJcbiAgICAgICAgICAgIG1ldGEgPSB7XHJcblx0XHRcdFx0Z2VvbWV0cmllczoge30sXHJcblx0XHRcdFx0bWF0ZXJpYWxzOiB7fSxcclxuXHRcdFx0XHR0ZXh0dXJlczoge30sXHJcblx0XHRcdFx0aW1hZ2VzOiB7fVxyXG5cdFx0XHR9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdGhpcy5jb2xsZWN0X21hdGVyaWFscyhtZXRhKTtcclxuICAgICAgICAgICAgLy90aGlzLmNvbGxlY3RfZ2VvbWV0cnkobWV0YSk7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB0aGlzLnN0YW5kYXJkX3NlcmlhbGl6YXRpb24obWV0YSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHRcdFx0b3V0cHV0Lm1ldGFkYXRhID0ge1xyXG5cdFx0XHRcdHZlcnNpb246IDQuNCxcclxuXHRcdFx0XHR0eXBlOiAnT2JqZWN0JyxcclxuXHRcdFx0XHRnZW5lcmF0b3I6ICdPYmplY3QzRC50b0pTT04nXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgZ2VvbWV0cmllcyA9IGV4dHJhY3RGcm9tQ2FjaGUoIG1ldGEuZ2VvbWV0cmllcywgXCJnZW9pbVwiICk7XHJcblx0XHRcdHZhciBtYXRlcmlhbHMgPSBleHRyYWN0RnJvbUNhY2hlKCBtZXRhLm1hdGVyaWFscywgXCJtYXRlcmlhbHNcIiApO1xyXG5cdFx0XHR2YXIgdGV4dHVyZXMgPSBleHRyYWN0RnJvbUNhY2hlKCBtZXRhLnRleHR1cmVzLCBcInRleHR1cmVzXCIgKTtcclxuXHRcdFx0dmFyIGltYWdlcyA9IGV4dHJhY3RGcm9tQ2FjaGUoIG1ldGEuaW1hZ2VzLCBcImltYWdlc1wiICk7XHJcblxyXG5cdFx0XHRpZiAoIGdlb21ldHJpZXMubGVuZ3RoID4gMCApIG91dHB1dC5nZW9tZXRyaWVzID0gZ2VvbWV0cmllcztcclxuXHRcdFx0aWYgKCBtYXRlcmlhbHMubGVuZ3RoID4gMCApIG91dHB1dC5tYXRlcmlhbHMgPSBtYXRlcmlhbHM7XHJcblx0XHRcdGlmICggdGV4dHVyZXMubGVuZ3RoID4gMCApIG91dHB1dC50ZXh0dXJlcyA9IHRleHR1cmVzO1xyXG5cdFx0XHRpZiAoIGltYWdlcy5sZW5ndGggPiAwICkgb3V0cHV0LmltYWdlcyA9IGltYWdlcztcclxuXHJcbiAgICAgICAgICAgIHZhciBhbmltcyA9IHRoaXMuY29sbGVjdF9hbmltYXRpb25zKHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAoYW5pbXMuY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXRbXCJteWFuaW1hdGlvbnNcIl0gPSBhbmltcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBvdXRwdXQub2JqZWN0ID0gb2JqZWN0O1xyXG5cdFx0fSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0cHV0Lm9iamVjdCA9IHRoaXMuc3RhbmRhcmRfc2VyaWFsaXphdGlvbihtZXRhKTtcclxuICAgICAgICAgICAgb3V0cHV0LnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgICAgIGlmIChvdXRwdXQub2JqZWN0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaSBhbSB1bmRlZmluZWRcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cdFx0cmV0dXJuIG91dHB1dDtcclxuXHJcblxyXG5cdH0sXHJcbiAgICBcclxuICAgIGNvbGxlY3RfYW5pbWF0aW9uczogZnVuY3Rpb24gKHNjZW5lKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICBhbmltYXRpb25zIDoge30sXHJcbiAgICAgICAgICAgIGJpbmRpbmdzIDogW10sXHJcbiAgICAgICAgICAgIGNvdW50OiAwXHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBjb2xsZWN0X2FuaW1hdGlvbnNfcmVjdXJzaXZlKHJvb3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAocm9vdC5hbmltYXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPTA7IGkgPCByb290LmFuaW1hdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYW5pbSA9IHJvb3QuYW5pbWF0aW9uc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5hbmltYXRpb25zWyBhbmltLnV1aWQgXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYW5pbWF0aW9uc1sgYW5pbS51dWlkXSA9IGFuaW0udG9KU09OKCkgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgYmluZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmluZC51dWlkID0gcm9vdC51dWlkXHJcbiAgICAgICAgICAgICAgICBiaW5kLmFuaW1hdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9MDsgaSA8IHJvb3QuYW5pbWF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmQuYW5pbWF0aW9ucy5wdXNoKCByb290LmFuaW1hdGlvbnNbaV0udXVpZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYXRhLmJpbmRpbmdzLnB1c2goYmluZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyb290LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcm9vdC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3RfYW5pbWF0aW9uc19yZWN1cnNpdmUoIHJvb3QuY2hpbGRyZW5baV0gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb2xsZWN0X2FuaW1hdGlvbnNfcmVjdXJzaXZlKHNjZW5lKTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH0sXHJcbiAgICBcclxuIFxyXG59O1xyXG5cclxuXHJcbiAgXy5jb3B5X29iamVjdChUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUsIE9iamVjdDNEX1NlcmlhbGl6YXRpb25fTWl4aW4pO1xyXG4gIFxyXG4gICAgXHJcblxyXG4vL3JlcGxhY2Ugc291cmNlIHdpdGggdGhpc1xyXG5USFJFRS5PYmplY3QzRC5wcm90b3R5cGUucmVwbGFjZV9vYmplY3Rfd2l0aF90aGlzID0gZnVuY3Rpb24gKCBzb3VyY2UgKSB7XHJcblxyXG4gICAgdGhpcy51dWlkID0gc291cmNlLnV1aWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBzb3VyY2UubmFtZTtcclxuXHJcbiAgICB0aGlzLnVwLmNvcHkoIHNvdXJjZS51cCApO1xyXG4gICAgdGhpcy5wb3NpdGlvbi5jb3B5KCBzb3VyY2UucG9zaXRpb24gKTtcclxuICAgIHRoaXMucXVhdGVybmlvbi5jb3B5KCBzb3VyY2UucXVhdGVybmlvbiApO1xyXG4gICAgdGhpcy5zY2FsZS5jb3B5KCBzb3VyY2Uuc2NhbGUgKTtcclxuXHJcbiAgICB0aGlzLm1hdHJpeC5jb3B5KCBzb3VyY2UubWF0cml4ICk7XHJcbiAgICB0aGlzLm1hdHJpeFdvcmxkLmNvcHkoIHNvdXJjZS5tYXRyaXhXb3JsZCApO1xyXG5cclxuICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IHNvdXJjZS5tYXRyaXhBdXRvVXBkYXRlO1xyXG4gICAgdGhpcy5tYXRyaXhXb3JsZE5lZWRzVXBkYXRlID0gc291cmNlLm1hdHJpeFdvcmxkTmVlZHNVcGRhdGU7XHJcblxyXG4gICAgdGhpcy52aXNpYmxlID0gc291cmNlLnZpc2libGU7XHJcblxyXG4gICAgdGhpcy5jYXN0U2hhZG93ID0gc291cmNlLmNhc3RTaGFkb3c7XHJcbiAgICB0aGlzLnJlY2VpdmVTaGFkb3cgPSBzb3VyY2UucmVjZWl2ZVNoYWRvdztcclxuXHJcbiAgICB0aGlzLmZydXN0dW1DdWxsZWQgPSBzb3VyY2UuZnJ1c3R1bUN1bGxlZDtcclxuICAgIHRoaXMucmVuZGVyT3JkZXIgPSBzb3VyY2UucmVuZGVyT3JkZXI7XHJcblxyXG4gICAgdGhpcy51c2VyRGF0YSA9IEpTT04ucGFyc2UoIEpTT04uc3RyaW5naWZ5KCBzb3VyY2UudXNlckRhdGEgKSApO1xyXG5cclxuICAgIC8vY29weSBhcnJheSBvZiBjaGlsZHJlbiwgbm90IGNsb25lXHJcbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzb3VyY2UuY2hpbGRyZW4ubGVuZ3RoOyBpICsrICkge1xyXG4gICAgICAgIHRoaXMuYWRkKCBzb3VyY2UuY2hpbGRyZW5bIGkgXSApO1xyXG4gICAgfVxyXG4gICAgc291cmNlLnBhcmVudC5hZGQodGhpcyk7XHJcbiAgICBzb3VyY2UucGFyZW50LnJlbW92ZShzb3VyY2UpO1xyXG4gICAgXHJcbiAgICB0aGlzLmFuaW1hdGlvbnMgPSBzb3VyY2UuYW5pbWF0aW9ucztcclxufVxyXG5cclxuXHJcbn1cclxuXHJcbk1peF9JdCgpO1xyXG5cclxuZXhwb3J0IHtNaXhfSXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXNlL3RocmVlanNfbWl4aW5zLmpzIiwiaW1wb3J0IHtNeV9MaWJ9IGZyb20gJy4uL2Jhc2UvbXlfbGliLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9BZmZlY3Rvcn0gZnJvbSAnLi9wYXJ0aWNsZV9hZmZlY3Rvci5qcyc7XHJcblxyXG5mdW5jdGlvbiBDdXN0b21fQWZmZWN0b3IoKVxyXG57XHJcblx0UGFydGljbGVfQWZmZWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuY3VzdG9tX2Z1bmMgPSBmdW5jdGlvbiBkdW1teSAoKSB7cmV0dXJuIHRydWU7fTtcclxufVxyXG5cclxuXHJcbkN1c3RvbV9BZmZlY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcnRpY2xlX0FmZmVjdG9yLnByb3RvdHlwZSk7XHJcblxyXG5fLmNvcHlfb2JqZWN0KEN1c3RvbV9BZmZlY3Rvci5wcm90b3R5cGUsIFxyXG4gICAge1xyXG4gICAgY29uc3RydWN0b3I6IEN1c3RvbV9BZmZlY3RvcixcclxuICAgXHRhZmZlY3Q6IGZ1bmN0aW9uIChkdCwgcGRhdGEsIHZlcnQpXHJcblx0e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbV9mdW5jKGR0LCBwLCB2ZXJ0KTtcclxuXHR9LFxyXG4gICAgdGVzdF9mdW5jOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHAgPSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH0sXHJcbiAgICAgICAgICAgIHZlbG9jaXR5OiB7eDogMCwgeTogMCwgejogMH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBjb2xvciA9IHtyOiAwLCBnOiAwLCBiOiAwfTtcclxuICAgICAgICB0aGlzLmN1c3RvbV9mdW5jKHAsIGNvbG9yKTtcclxuICAgIH0sXHJcbiAgICBzZXRfYWZmZWN0X2Z1bmN0aW9uOiBmdW5jdGlvbiAoc291cmNlKSB7ICAgIFxyXG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMgPSBzb3VyY2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc291cmNlICA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMgPSBuZXcgRnVuY3Rpb24gKCdkdCxwLHZlcnQnLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0X2Z1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbV9mdW5jID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlX2NvZGUgPSBzb3VyY2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG5cdHRvSlNPTjogZnVuY3Rpb24gKClcclxuXHR7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQ3VzdG9tX0FmZmVjdG9yXCJcclxuICAgICAgICB9O1xyXG5cdFx0ZGF0YS5wYXJhbXMgPSBNeV9MaWIuUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMsIHRoaXMpO1xyXG5cdFx0cGFyYW1zW1wic291cmNlX2NvZGVcIl0gPSB0aGlzLnNvdXJjZV9jb2RlO1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fSxcclxuXHRwYXJzZTogZnVuY3Rpb24gKGpzb24pXHJcblx0e1xyXG5cdFx0TXlfTGliLlBhcnRpY2xlX0FmZmVjdG9yLnByb3RvdHlwZS5wYXJzZSh0aGlzLCBqc29uKTtcclxuXHRcdHRoaXMuc2V0X2FmZmVjdF9mdW5jKGpzb24uc291cmNlX2NvZGUpO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiQ3VzdG9tX0FmZmVjdG9yXCIsIEN1c3RvbV9BZmZlY3Rvcik7XHJcblxyXG5leHBvcnQge0N1c3RvbV9BZmZlY3Rvcn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhcnRpY2xlcy9jdXN0b21fYWZmZWN0b3IuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0VtaXR0ZXJ9IGZyb20gJy4vcGFydGljbGVfZW1pdHRlci5qcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gQ3VzdG9tX0VtaXR0ZXIoKVxyXG57XHJcblx0UGFydGljbGVfRW1pdHRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5cclxuQ3VzdG9tX0VtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZSk7XHJcblxyXG52YXIgbWV0aG9kcyA9IHtcclxuICAgIGVtaXQ6IGZ1bmN0aW9uIChwLCBjb2xvcikge1xyXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbV9mdW5jKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMocCwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0ZXN0X2Z1bmM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcCA9IHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHt4OiAwLCB5OiAwLCB6OiAwfSxcclxuICAgICAgICAgICAgdmVsb2NpdHk6IHt4OiAwLCB5OiAwLCB6OiAwfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNvbG9yID0ge3I6IDAsIGc6IDAsIGI6IDB9O1xyXG4gICAgICAgIHRoaXMuY3VzdG9tX2Z1bmMocCwgY29sb3IpO1xyXG4gICAgfSxcclxuICAgIHNldF9lbWl0X2Z1bmN0aW9uOiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21fZnVuYyA9IHNvdXJjZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzb3VyY2UgID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21fZnVuYyA9IG5ldyBGdW5jdGlvbiAoJ3AnLCAnY29sb3InLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0X2Z1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbV9mdW5jID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlX2NvZGUgPSBzb3VyY2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRvSlNPTjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgZGF0YS5uYW1lID0gXCJDdXN0b21fRW1pdHRlclwiO1xyXG4gICAgICAgIGRhdGEucGFyYW1zID0gTXlfTGliLlBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMsIHRoaXMpO1xyXG4gICAgICAgIGlmICh0aGlzLnNvdXJjZV9jb2RlKSB7XHJcbiAgICAgICAgICAgIGRhdGEucGFyYW1zLnNvdXJjZV9jb2RlID0gdGhpcy5zb3VyY2VfY29kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9LFxyXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgTXlfTGliLlBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnBhcnNlLmNhbGwodGhpcywgZGF0YSk7ICAgICAgICBcclxuICAgICAgICB0aGlzLnNldF9lbWl0X2Z1bmN0aW9uIChkYXRhLnNvdXJjZV9jb2RlKTtcclxuICAgIH0sXHJcbiAgICBjb25zdHJ1Y3RvcjogQ3VzdG9tX0VtaXR0ZXIsXHJcbn07XHJcblxyXG5fLmNvcHlfb2JqZWN0KEN1c3RvbV9FbWl0dGVyLnByb3RvdHlwZSwgbWV0aG9kcyk7XHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIkN1c3RvbV9FbWl0dGVyXCIsIEN1c3RvbV9FbWl0dGVyKTtcclxuXHJcblxyXG5mdW5jdGlvbiB0ZXN0KClcclxue1xyXG4gICAgdmFyIHQgPSBuZXcgQ3VzdG9tX0VtaXR0ZXIoKTtcclxuICAgIHZhciBzb3VyY2UgPSAncC5wb3NpdGlvbi56ID0gLTEwMDsgcC52ZWxvY2l0eS55ID0gMTAwOyc7XHJcbiAgICB0LnNldF9lbWl0X2Z1bmN0aW9uKHNvdXJjZSk7XHJcbiAgICB2YXIgcCA9IHtcclxuICAgICAgICB2ZWxvY2l0eToge3g6IDAsIHk6IDAsIHo6IDB9LFxyXG4gICAgICAgIHBvc2l0aW9uOiB7eDogMCwgeTogMCwgejogMH1cclxuICAgIH07XHJcbiAgICB0LmN1c3RvbV9mdW5jKHApO1xyXG4gICAgY29uc29sZS5sb2cocCk7XHJcbiAgICB2YXIganNvbiA9IHQudG9KU09OKCk7XHJcbiAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuICAgIFxyXG4gICAgdCA9IG5ldyBDdXN0b21fRW1pdHRlcigpO1xyXG4gICAgdC5wYXJzZShqc29uLnBhcmFtcyk7XHJcbiAgICAvL2NvbnNvbGUubG9nKHQuY3VzdG9tX2Z1bmMpOyAgICBcclxufVxyXG5cclxuLy90ZXN0KCk7XHJcblxyXG4vKlxyXG5DdXN0b21fRW1pdHRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE15X0xpYi5QYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZSk7XHJcbkN1c3RvbV9FbWl0dGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbmVfRW1pdHRlcjtcclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiQ3VzdG9tX0VtaXR0ZXJcIiwgQ29uZV9FbWl0dGVyKTtcclxuKi9cclxuXHJcbmV4cG9ydCB7Q3VzdG9tX0VtaXR0ZXJ9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvY3VzdG9tX2VtaXR0ZXIuanMiLCJpbXBvcnQge015X0xpYn0gZnJvbSAnLi4vYmFzZS9teV9saWIuanMnO1xyXG5cclxudmFyIFBhcnRpY2xlX0ZvcmNlcyA9IHt9O1xyXG5cclxuLy9iYXNlIGNsYXNzXHJcblBhcnRpY2xlX0ZvcmNlcy5Gb3JjZSA9IGZ1bmN0aW9uICgpXHJcbntcclxufVxyXG5cclxuXHJcbl8uY29weV9vYmplY3QoUGFydGljbGVfRm9yY2VzLkZvcmNlLnByb3RvdHlwZSx7XHJcblx0XHRjYWxjOiBmdW5jdGlvbiAoZHQsIHBhcnRpY2xlLCBhY2NlbGVyYXRpb24pIFxyXG5cdFx0e1xyXG5cdFx0fSxcclxuXHRcdHRvSlNPTjogZnVuY3Rpb24gKGNoaWxkKSBcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIHt9O1xyXG5cdFx0fSxcclxuXHRcdHBhcnNlOiBmdW5jdGlvbiAoanNvbikgXHJcblx0XHR7XHJcblx0XHR9LFxyXG59KTtcclxuXHJcbi8vY29uc3RhbnQgZm9yY2VcclxuUGFydGljbGVfRm9yY2VzLkNvbnN0YW50X0ZvcmNlID0gZnVuY3Rpb24gKGZvcmNlKVxyXG57XHJcblx0aWYgKHR5cGVvZiBmb3JjZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdHRoaXMuZm9yY2UgPSBmb3JjZTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhpcy5mb3JjZSA9IHt4OjAsIHk6MCwgejowfTtcclxuXHR9XHJcbn1cclxuXHJcblBhcnRpY2xlX0ZvcmNlcy5Db25zdGFudF9Gb3JjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcnRpY2xlX0ZvcmNlcy5Gb3JjZS5wcm90b3R5cGUpO1xyXG5fLmNvcHlfb2JqZWN0KFBhcnRpY2xlX0ZvcmNlcy5Db25zdGFudF9Gb3JjZS5wcm90b3R5cGUsIHtcclxuXHRjb25zdHJ1Y3RvcjogUGFydGljbGVfRm9yY2VzLkNvbnN0YW50X0ZvcmNlLFxyXG5cdGNhbGM6IGZ1bmN0aW9uIChkdCwgcCwgYWNjZWxlcmF0aW9uKSBcclxuXHR7XHJcblx0XHRhY2NlbGVyYXRpb24ueCArPSB0aGlzLmZvcmNlLng7XHJcblx0XHRhY2NlbGVyYXRpb24ueSArPSB0aGlzLmZvcmNlLnk7XHJcblx0XHRhY2NlbGVyYXRpb24ueiArPSB0aGlzLmZvcmNlLno7XHJcblx0fSxcclxuXHR0b0pTT046IGZ1bmN0aW9uIChjaGlsZClcclxuXHR7XHJcblx0XHR2YXIgZGF0YSA9IHt9O1xyXG5cdFx0ZGF0YS5uYW1lID0gXCJDb25zdGFudF9Gb3JjZVwiO1xyXG5cdFx0ZGF0YS5mb3JjZSA9IF8uY3JlYXRlX2Nsb25lX29iamVjdCh0aGlzLmZvcmNlKTtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH0sXHJcblx0cGFyc2U6IGZ1bmN0aW9uIChqc29uKVxyXG5cdHtcdFxyXG5cdFx0aWYgKGpzb24uZm9yY2UpIHtcclxuXHRcdFx0Xy5jb3B5X29iamVjdCh0aGlzLmZvcmNlLCBqc29uLmZvcmNlKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiQ29uc3RhbnRfRm9yY2VcIiwgUGFydGljbGVfRm9yY2VzLkNvbnN0YW50X0ZvcmNlKTtcclxuXHJcbmV4cG9ydCB7UGFydGljbGVfRm9yY2VzfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFydGljbGVzL2ZvcmNlcy5qcyIsImltcG9ydCB7TXlfTGlifSBmcm9tICcuLi9iYXNlL215X2xpYi5qcyc7XHJcbmltcG9ydCB7UG9pbnRfR2VuZXJhdG9yc30gZnJvbSAnLi9wb2ludF9nZW5lcmF0b3JzLmpzJztcclxuaW1wb3J0IHtQYXJ0aWNsZV9FbWl0dGVyfSBmcm9tICcuL3BhcnRpY2xlX2VtaXR0ZXIuanMnO1xyXG5pbXBvcnQge1BhcnRpY2xlX0FmZmVjdG9yfSBmcm9tICcuL3BhcnRpY2xlX2FmZmVjdG9yLmpzJztcclxuXHJcbmZ1bmN0aW9uICBDb25lX0VtaXR0ZXIoKVxyXG57XHJcblx0UGFydGljbGVfRW1pdHRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdHRoaXMuZ2VuZXJhdG9yID0gbmV3IFBvaW50X0dlbmVyYXRvcnMuUmFuZG9tX0RpcmVjdGlvbigpO1xyXG5cdHRoaXMub3JpZ2luID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMCk7XHJcblx0dGhpcy52ZWxvY2l0eSA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApO1xyXG5cdHRoaXMuZGlzcGVyc2lvbiA9IHtcIm1pblwiOiA1LCBcIm1heFwiOiAxMH07XHJcblx0dGhpcy5kaXNwZXJzaW9uLmRlbHRhID0gNTtcclxuXHR0aGlzLnNwZWVkID0ge21pbjogNSwgbWF4OiAxMCwgZGVsdGE6NX07XHJcblx0dGhpcy5jb2xvciA9IG5ldyBUSFJFRS5Db2xvcigxLCAxLCAxKTtcclxufVxyXG5cclxuQ29uZV9FbWl0dGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUpO1xyXG5Db25lX0VtaXR0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29uZV9FbWl0dGVyO1xyXG5NeV9MaWIuUmVnaXN0ZXJfQ2xhc3MoXCJDb25lX0VtaXR0ZXJcIiwgQ29uZV9FbWl0dGVyKTtcclxuXHJcbkNvbmVfRW1pdHRlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKClcclxue1xyXG5cdHZhciBkYXRhID0ge307XHJcblx0ZGF0YS5uYW1lID0gXCJDb25lX0VtaXR0ZXJcIjtcclxuXHRkYXRhLnBhcmFtcyA9IFBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMsIHRoaXMpO1xyXG5cdF8uY2xvbmVfZmllbGRfbGlzdF9vbmVfbGV2ZWxfcmVjdXJzaW9uKHRoaXMsIGRhdGEucGFyYW1zLCBcclxuXHRbXCJvcmlnaW5cIiwgXHJcblx0XCJ2ZWxvY2l0eVwiLCBcclxuXHRcImRpc3BlcnNpb25cIixcclxuXHRcInNwZWVkXCJdKTtcclxuXHRcclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG5cclxuQ29uZV9FbWl0dGVyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChkYXRhKVxyXG57XHJcblx0UGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUucGFyc2UuY2FsbCh0aGlzLCBkYXRhKTtcclxuXHR0aGlzLm9yaWdpbi5jb3B5KGRhdGEub3JpZ2luKTtcclxuXHR0aGlzLnZlbG9jaXR5LmNvcHkoZGF0YS52ZWxvY2l0eSk7XHJcblx0dGhpcy5zZXRfZGlzcGVyc2lvbihkYXRhLmRpc3BlcnNpb24ubWluLCBkYXRhLmRpc3BlcnNpb24ubWF4KTtcclxuXHR0aGlzLnNldF9zcGVlZChkYXRhLnNwZWVkLm1pbiwgZGF0YS5zcGVlZC5tYXgpO1xyXG59XHJcblxyXG5Db25lX0VtaXR0ZXIucHJvdG90eXBlLnNldF9zcGVlZCA9IGZ1bmN0aW9uIChtaW4sIG1heClcclxue1xyXG5cdHRoaXMuc3BlZWQubWluID0gbWluO1xyXG5cdHRoaXMuc3BlZWQubWF4ID0gbWF4O1xyXG5cdHRoaXMuc3BlZWQuZGVsdGEgPSBtYXggLSBtaW47XHJcbn1cclxuXHJcblxyXG5Db25lX0VtaXR0ZXIucHJvdG90eXBlLnNldF9kaXNwZXJzaW9uID0gZnVuY3Rpb24gKG1pbiwgbWF4KVxyXG57XHJcblx0dGhpcy5kaXNwZXJzaW9uLm1pbiA9IG1pbjtcclxuXHR0aGlzLmRpc3BlcnNpb24ubWF4ID0gbWF4O1xyXG5cdHRoaXMuZGlzcGVyc2lvbi5kZWx0YSA9IG1heCAtIG1pbjtcclxufVxyXG5cclxuXHJcblxyXG5cclxuQ29uZV9FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKHAsIGNvbG9yLCBtYXRyaXgpXHJcbntcclxuXHRwLnBvc2l0aW9uLmNvcHkodGhpcy5vcmlnaW4pO1xyXG5cdFxyXG5cdHRoaXMuZ2VuZXJhdG9yLmdldF9kaXJlY3Rpb24ocC52ZWxvY2l0eSk7XHJcblx0cC52ZWxvY2l0eS5tdWx0aXBseVNjYWxhcihNYXRoLnJhbmRvbSgpKnRoaXMuZGlzcGVyc2lvbi5kZWx0YSArIHRoaXMuZGlzcGVyc2lvbi5taW4pO1x0XHJcblx0cC52ZWxvY2l0eS5hZGQodGhpcy52ZWxvY2l0eSkubm9ybWFsaXplKCk7XHJcblx0XHJcbiAgICBpZiAobWF0cml4KSB7XHJcbiAgICAgICAgcC5wb3NpdGlvbi5hcHBseU1hdHJpeDQobWF0cml4KTtcclxuICAgICAgICBwLnZlbG9jaXR5LmFwcGx5TWF0cml4NF9yb3RhdGlvbihtYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG5cdHAudmVsb2NpdHkubXVsdGlwbHlTY2FsYXIoTWF0aC5yYW5kb20oKSp0aGlzLnNwZWVkLmRlbHRhICsgdGhpcy5zcGVlZC5taW4pO1x0XHJcblx0XHJcbiAgICBcclxuXHRpZiAoY29sb3IpIHtcclxuXHRcdHRoaXMuZW1pdF9jb2xvcihjb2xvcik7XHJcblx0fVxyXG4gICAgXHJcbn1cclxuXHJcbkNvbmVfRW1pdHRlci5wcm90b3R5cGUuZW1pdF9jb2xvciA9IGZ1bmN0aW9uIChjb2xvcikgXHJcbntcclxuXHRjb2xvci5jb3B5KHRoaXMuY29sb3IpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBTcGhlcmVfRW1pdHRlcihyYWRpdXMpXHJcbntcclxuXHRQYXJ0aWNsZV9FbWl0dGVyLmNhbGwodGhpcyk7XHJcblx0dGhpcy5yYWRpdXMgPSByYWRpdXM7XHJcblx0dGhpcy5nZW5lcmF0b3IgPSBuZXcgUG9pbnRfR2VuZXJhdG9ycy5TcGhlcmUocmFkaXVzKTtcclxufVxyXG5cclxuU3BoZXJlX0VtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZSk7XHJcblNwaGVyZV9FbWl0dGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNwaGVyZV9FbWl0dGVyO1xyXG5cclxuXHJcblNwaGVyZV9FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKHApXHJcbntcclxuXHR0aGlzLmdlbmVyYXRvci5nZXRfcG9pbnQocC5wb3NpdGlvbik7XHJcblx0dGhpcy5nZW5lcmF0b3IuZ2V0X25vcm1hbChwLnZlbG9jaXR5KTtcclxuXHRwLnZlbG9jaXR5Lm11bHRpcGx5U2NhbGFyKDEwKTtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBTdGFyX0R1c3RfRW1pdHRlciAoKVxyXG57XHJcblx0UGFydGljbGVfRW1pdHRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdHRoaXMuc3RhcnRfcG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKTtcclxuXHR0aGlzLmVuZF9wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpO1xyXG5cdHRoaXMuZGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKTtcdFxyXG5cdHRoaXMudmVsb2NpdHkgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAxKTtcclxufVxyXG5cclxuU3Rhcl9EdXN0X0VtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZV9FbWl0dGVyLnByb3RvdHlwZSk7XHJcblN0YXJfRHVzdF9FbWl0dGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN0YXJfRHVzdF9FbWl0dGVyO1xyXG5fLmNvcHlfb2JqZWN0KCBTdGFyX0R1c3RfRW1pdHRlci5wcm90b3R5cGUse1xyXG5cdHNldF92ZWxvY2l0eTogZnVuY3Rpb24gKHgseSwgeikgXHJcblx0e1xyXG5cdFx0dGhpcy52ZWxvY2l0eS5zZXQoeCwgeSwgeik7XHJcblx0fSxcclxuXHRzZXRfcG9zaXRpb25fcmFuZ2UgOiBmdW5jdGlvbiAoc3RhcnQsIGVuZClcclxuXHR7XHJcblx0XHR0aGlzLnN0YXJ0X3Bvc2l0aW9uLmNvcHkoc3RhcnQpO1xyXG5cdFx0dGhpcy5lbmRfcG9zaXRpb24uY29weShlbmQpO1xyXG5cdFx0dGhpcy5kZWx0YS5zZXQoZW5kLnggLSBzdGFydC54LCBlbmQueS1zdGFydC55LCBlbmQuei1zdGFydC56KTtcclxuXHRcdFxyXG5cdH0sXHJcblx0Z2V0X3Bvc2l0aW9uOiBmdW5jdGlvbiAodmVjdG9yKVxyXG5cdHtcclxuXHRcdHZlY3Rvci54ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuZGVsdGEueCArIHRoaXMuc3RhcnRfcG9zaXRpb24ueDtcclxuXHRcdHZlY3Rvci55ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuZGVsdGEueSArIHRoaXMuc3RhcnRfcG9zaXRpb24ueTtcclxuXHRcdHZlY3Rvci56ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuZGVsdGEueiArIHRoaXMuc3RhcnRfcG9zaXRpb24uejtcclxuXHR9LFxyXG5cdGdldF92ZWxvY2l0eTogZnVuY3Rpb24gKHZlY3RvcilcclxuXHR7XHJcblx0XHR2ZWN0b3IueCA9IHRoaXMudmVsb2NpdHkueDtcclxuXHRcdHZlY3Rvci55ID0gdGhpcy52ZWxvY2l0eS55O1xyXG5cdFx0dmVjdG9yLnogPSB0aGlzLnZlbG9jaXR5Lno7XHJcblx0fSxcclxuXHRlbWl0OiBmdW5jdGlvbiAocClcclxuXHR7XHJcblx0XHR0aGlzLmdldF9wb3NpdGlvbihwLnBvc2l0aW9uKTtcclxuXHRcdGlmICh0aGlzLnBhcmVudCkge1xyXG5cdFx0XHR0aGlzLnBhcmVudC5sb2NhbFRvV29ybGQocC5wb3NpdGlvbik7XHJcblx0XHR9XHJcblx0XHR0aGlzLmdldF92ZWxvY2l0eShwLnZlbG9jaXR5KTtcclxuXHR9LFxyXG5cdHRvSlNPTjogZnVuY3Rpb24gKClcclxuXHR7XHJcblx0XHR2YXIgcGFyYW1zID0gUGFydGljbGVfRW1pdHRlci5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcywgdGhpcyk7XHJcblx0XHRfLmNsb25lX2ZpZWxkX2xpc3Rfb25lX2xldmVsX3JlY3Vyc2lvbih0aGlzLCBwYXJhbXMsIFtcInZlbG9jaXR5XCIsIFxyXG5cdFx0XCJzdGFydF9wb3NpdGlvblwiLFxyXG5cdFx0XCJlbmRfcG9zaXRpb25cIl0pXHJcblx0XHR2YXIgZGF0YSA9IHtcclxuXHRcdFx0XCJuYW1lXCI6IFwiU3Rhcl9EdXN0X0VtaXR0ZXJcIixcclxuXHRcdFx0XCJwYXJhbXNcIjogcGFyYW1zLFxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH0sXHJcblx0cGFyc2U6IGZ1bmN0aW9uIChqc29uKVxyXG5cdHtcclxuXHRcdFBhcnRpY2xlX0VtaXR0ZXIucHJvdG90eXBlLnBhcnNlLmNhbGwodGhpcywganNvbik7XHJcblx0XHR0aGlzLnNldF9wb3NpdGlvbl9yYW5nZShqc29uLnN0YXJ0X3Bvc2l0aW9uLCBqc29uLmVuZF9wb3NpdGlvbik7XHJcblx0XHR0aGlzLnZlbG9jaXR5LmNvcHkoanNvbi52ZWxvY2l0eSk7XHJcblx0fVxyXG5cdFxyXG59KTtcclxuXHJcbk15X0xpYi5SZWdpc3Rlcl9DbGFzcyhcIlN0YXJfRHVzdF9FbWl0dGVyXCIsIFN0YXJfRHVzdF9FbWl0dGVyKTtcclxuXHJcblxyXG5mdW5jdGlvbiBTdGFyX0R1c3RfQWZmZWN0b3IgKGVuZClcclxue1xyXG5cdHRoaXMuZW5kID0gZW5kIHx8IDA7XHJcbn1cclxuXHJcblxyXG5TdGFyX0R1c3RfQWZmZWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZV9BZmZlY3Rvci5wcm90b3R5cGUpO1xyXG5TdGFyX0R1c3RfQWZmZWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3Rhcl9EdXN0X0FmZmVjdG9yO1xyXG5cclxuXy5jb3B5X29iamVjdChTdGFyX0R1c3RfQWZmZWN0b3IucHJvdG90eXBlLHtcclxuXHRhZmZlY3Q6IGZ1bmN0aW9uIChkdCwgcGRhdGEsIHZlcnQpXHJcblx0e1xyXG5cdFx0aWYgKHBkYXRhLnBvc2l0aW9uLnogPiB0aGlzLmVuZCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9LFxyXG5cdHRvSlNPTjogZnVuY3Rpb24gKClcclxuXHR7XHJcblx0XHR2YXIgcGFyYW1zID0gUGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnRvSlNPTi5jYWxsKHRoaXMsIHRoaXMpO1xyXG5cdFx0cGFyYW1zW1wiZW5kXCJdID0gdGhpcy5lbmQ7XHJcblx0XHR2YXIgZGF0YSA9IHtcclxuXHRcdFx0XCJuYW1lXCI6IFwiU3Rhcl9EdXN0X0FmZmVjdG9yXCIsXHJcblx0XHRcdFwicGFyYW1zXCI6IHBhcmFtcyxcclxuXHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fSxcclxuXHRwYXJzZTogZnVuY3Rpb24gKGpzb24pXHJcblx0e1xyXG5cdFx0UGFydGljbGVfQWZmZWN0b3IucHJvdG90eXBlLnBhcnNlKHRoaXMsIGpzb24pO1xyXG5cdFx0dGhpcy5lbmQgPSBqc29uLmVuZDtcclxuXHR9XHJcbn0pO1xyXG5cclxuTXlfTGliLlJlZ2lzdGVyX0NsYXNzKFwiU3Rhcl9EdXN0X0FmZmVjdG9yXCIsIFN0YXJfRHVzdF9BZmZlY3Rvcik7XHJcblxyXG5leHBvcnQge0NvbmVfRW1pdHRlciwgU3Rhcl9EdXN0X0VtaXR0ZXIsIFNwaGVyZV9FbWl0dGVyLCBTdGFyX0R1c3RfQWZmZWN0b3J9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJ0aWNsZXMvdGVzdF9lbWl0dGVycy5qcyIsImV4cG9ydCAqIGZyb20gJy4vYmFzZS9ldmVudF9odWIuanMnO1xyXG5cclxuZXhwb3J0IHtNeV9MaWJ9IGZyb20gJy4vYmFzZS9teV9saWIuanMnO1xyXG5cclxuZXhwb3J0IHtCYXNlX0FuaW1hdGlvbiwgRXVsZXJfQW5pbWF0aW9ufSBmcm9tICcuL2Jhc2UvYW5pbWF0aW9ucy5qcyc7XHJcbmV4cG9ydCB7TW91c2VfSW50ZXJzZWN0b3J9IGZyb20gJy4vYmFzZS9tb3VzZV9pbnRlcnNlY3Rvci5qcyc7XHJcbmV4cG9ydCB7TG9hZGluZ19NYW5hZ2VyfSBmcm9tICcuL2Jhc2UvbG9hZGluZ19tYW5hZ2VyLmpzJztcclxuZXhwb3J0IHtQYWNrYWdlX01hbmFnZXJ9IGZyb20gJy4vYmFzZS9wYWNrYWdlX21hbmFnZXIuanMnO1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZXNfUG9pbnRzfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZXNfcG9pbnRzLmpzJztcclxuZXhwb3J0IHtQYXJ0aWNsZV9FbWl0dGVyfSBmcm9tICcuL3BhcnRpY2xlcy9wYXJ0aWNsZV9lbWl0dGVyLmpzJztcclxuXHJcbmV4cG9ydCB7UGFydGljbGVfRm9yY2VzfSBmcm9tICcuL3BhcnRpY2xlcy9mb3JjZXMuanMnO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZV9BZmZlY3Rvcn0gZnJvbSAnLi9wYXJ0aWNsZXMvcGFydGljbGVfYWZmZWN0b3IuanMnO1xyXG5cclxuZXhwb3J0IHtQb2ludF9HZW5lcmF0b3JzfSBmcm9tICcuL3BhcnRpY2xlcy9wb2ludF9nZW5lcmF0b3JzLmpzJztcclxuXHJcbmV4cG9ydCB7Q3VzdG9tX0VtaXR0ZXJ9IGZyb20gJy4vcGFydGljbGVzL2N1c3RvbV9lbWl0dGVyLmpzJztcclxuXHJcbmV4cG9ydCB7Q3VzdG9tX0FmZmVjdG9yfSBmcm9tICcuL3BhcnRpY2xlcy9jdXN0b21fYWZmZWN0b3IuanMnO1xyXG5cclxuZXhwb3J0IHtDb25lX0VtaXR0ZXIsIFN0YXJfRHVzdF9FbWl0dGVyLCBTcGhlcmVfRW1pdHRlciwgU3Rhcl9EdXN0X0FmZmVjdG9yfSBmcm9tICcuL3BhcnRpY2xlcy90ZXN0X2VtaXR0ZXJzLmpzJztcclxuXHJcbmV4cG9ydCB7UGFydGljbGVfU2hhZGVyc30gZnJvbSAnLi9wYXJ0aWNsZXMvcGFydGljbGVfc2hhZGVycy5qcyc7XHJcblxyXG5leHBvcnQge1BhcnRpY2xlX1N5c3RlbX0gZnJvbSAnLi9wYXJ0aWNsZXMvcGFydGljbGVzLmpzJztcclxuXHJcbmV4cG9ydCB7UGFydGljbGVfTWFuYWdlcn0gZnJvbSAnLi9wYXJ0aWNsZXMvcGFydGljbGVzX21hbmFnZXIuanMnO1xyXG5cclxuZXhwb3J0IHtTY2VuZV9TZXJpYWxpemVyfSBmcm9tICcuL2Jhc2Uvc2NlbmVfc2VyaWFsaXplci5qcyc7XHJcbmltcG9ydCAnLi9iYXNlL3RocmVlanNfbWl4aW5zLmpzJztcclxuXHJcbmV4cG9ydCB7QXBwbGljYXRpb259IGZyb20gJy4vYXBwL2FwcGxpY2F0aW9uLmpzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW5naW5lX21haW5fd2VicGFjay5qcyJdLCJzb3VyY2VSb290IjoiIn0=