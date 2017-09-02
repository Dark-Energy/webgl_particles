var Editor_Gui =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particles_Panel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__particles_props_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__texture_panel_js__ = __webpack_require__(3);



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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particles_Props; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__color_picker_js__ = __webpack_require__(0);


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
/* 3 */
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return create_vue_app; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__particles_panel_js__ = __webpack_require__(1);


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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gui_vueapp_js__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "create_vue_app", function() { return __WEBPACK_IMPORTED_MODULE_0__gui_vueapp_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gui_color_picker_js__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Color_Picker", function() { return __WEBPACK_IMPORTED_MODULE_1__gui_color_picker_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gui_texture_panel_js__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Texture_Panel", function() { return __WEBPACK_IMPORTED_MODULE_2__gui_texture_panel_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gui_particles_props_js__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particles_Props", function() { return __WEBPACK_IMPORTED_MODULE_3__gui_particles_props_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gui_particles_panel_js__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Particles_Panel", function() { return __WEBPACK_IMPORTED_MODULE_4__gui_particles_panel_js__["a"]; });






/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2ZkOWYyZDlhZWJlM2Y4ODQxODUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aS9jb2xvcl9waWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aS9wYXJ0aWNsZXNfcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aS9wYXJ0aWNsZXNfcHJvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aS90ZXh0dXJlX3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9ndWkvdnVlYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9ndWlfbWFpbl93ZWJwYWNrLmpzIl0sIm5hbWVzIjpbIkNvbG9yX1BpY2tlciIsInByb3BzIiwidmFsdWUiLCJ0eXBlIiwiT2JqZWN0IiwiZGVmYXVsdCIsInIiLCJnIiwiYiIsInRlbXBsYXRlIiwiZGF0YSIsIm5ld192YWx1ZSIsIm1ldGhvZHMiLCJjaGFuZ2VkIiwiZXZlbnQiLCJ0YXJnZXQiLCJpZCIsIiRlbWl0IiwiUGFydGljbGVzX1BhbmVsIiwicGFydGljbGVzIiwidGV4dHVyZXMiLCJzZWxlY3RlZCIsIlN0cmluZyIsImZpcnN0X3RpbWUiLCJwYXJ0aWNsZV9wYXJhbXMiLCJteV9zZWxlY3RlZCIsInRleHR1cmVfcGFuZWxfaXNfdmlzaWJsZSIsImFkZF90b19zZWxlY3QiLCJwdXNoIiwiY3JlYXRlX3BhcnRpY2xlcyIsImV2ZW50X2h1YiIsInJlbW92ZV9wYXJ0aWNsZXMiLCJpIiwibGVuZ3RoIiwic3BsaWNlIiwiY2hhbmdlX2NvbG9ycyIsInNob3dfdGV4dHVyZV9wYW5lbCIsInNlbGVjdF9wYXJ0aWNsZXMiLCJnZXRfcGFydGljbGVfcGFyYW1zIiwicGxheSIsImNyZWF0ZWQiLCJzZWxmIiwiJG9uIiwid2F0Y2giLCJhcnIiLCJuZXdfc2VsZWN0ZWQiLCJjb21wb25lbnRzIiwiVGV4dHVyZV9QYW5lbCIsIkJsZW5kaW5nX1NlbGVjdG9yIiwicmVxdWlyZWQiLCJzZWxlY3QiLCJibGVuZGluZyIsIkJlaGF2aW9yIiwiYmVoYXZpb3IiLCJzaG93X2JlaGF2aW9yIiwiZiIsIlBhcnRpY2xlX1BhcmFtcyIsImZpcmUiLCIkcGFyZW50IiwiUGFydGljbGVzX1Byb3BzIiwicGFyYW1zIiwiYmxlbmRpbmdfY2hhbmdlIiwiZW1pdF9wYXJhbV9jaGFuZ2UiLCJrZXkiLCJjaGVja2VkIiwidXBkYXRlX2NvbG9yIiwic2VsZWN0ZWRfdGV4dHVyZSIsInRleHR1cmVfd2lkdGgiLCJ0ZXh0dXJlX2hlaWdodCIsImZvcm1hdCIsInBhbmVsX3Zpc2libGUiLCJzaG93X3BhbmVsIiwiY2hvb3NlX3RleHR1cmUiLCJkcmF3X3RleHR1cmUiLCJhcHBseSIsIm9iamVjdF9pZCIsIm5hbWUiLCJ0ZXh0dXJlIiwiZ2V0X3RleHR1cmUiLCJjb25zb2xlIiwiZXJyb3IiLCJ0ZXh0dXJlX2Zvcm1hdF90b19zdHJpbmciLCJpbWFnZSIsIm5hdHVyYWxXaWR0aCIsIndpZHRoIiwibmF0dXJhbEhlaWdodCIsImhlaWdodCIsImNhbnZhcyIsIiRyZWZzIiwibXlfZHJhd19pbWFnZSIsImdldF90ZXh0dXJlX2Zyb21fcGFydGljbGVzIiwibW91bnRlZCIsImNyZWF0ZV92dWVfYXBwIiwiYXBwMiIsIlZ1ZSIsImVsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFF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MEYsY0FBVCxDQUF3QjVFLEVBQXhCLEVBQTRCOztBQUUzQixNQUFJNkUsT0FBTyxJQUFJQyxHQUFKLENBQVE7QUFDbEJDLFFBQUkvRSxFQURjOztBQUdaOEIsZ0JBQVk7QUFDUix5QkFBbUIsNEVBQUE1QjtBQURYLEtBSEE7QUFNbEJSLFVBQU07QUFDSVMsaUJBQVcsRUFEZjtBQUVJQyxnQkFBVTtBQUZkLEtBTlk7QUFVWlgsY0FBVTs7O0FBVkUsR0FBUixDQUFYOztBQWVBLFNBQU9vRixJQUFQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJEO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImRldi5ndWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDNmZDlmMmQ5YWViZTNmODg0MTg1IiwiXHJcbnZhciBDb2xvcl9QaWNrZXIgPSB7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgZGVmYXVsdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtyOiAwLCBnOiAwLCBiOjB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6ICc8ZGl2PlxcXHJcbiAgICA8cD5SZWQgR3JlZW4gQmx1ZSBDb2xvclxcXHJcbiAgICA8cD5cXFxyXG4gICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIyNTVcIiBAY2hhbmdlPVwiY2hhbmdlZFwiIDp2YWx1ZT1cInZhbHVlLnJcIiByZWY9XCJyXCIgaWQ9XCJyXCIgPlxcXHJcbiAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjI1NVwiIEBjaGFuZ2U9XCJjaGFuZ2VkXCIgOnZhbHVlPVwidmFsdWUuZ1wiIHJlZj1cImdcIiBpZD1cImdcIj5cXFxyXG4gICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIyNTVcIiBAY2hhbmdlPVwiY2hhbmdlZFwiIDp2YWx1ZT1cInZhbHVlLmJcIiByZWY9XCJiXCIgaWQ9XCJiXCI+XFxcclxuICAgIDwvZGl2PicsXHJcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmV3X3ZhbHVlIDoge1xyXG4gICAgICAgICAgICAgICAgcjogMCxcclxuICAgICAgICAgICAgICAgIGc6IDAsXHJcbiAgICAgICAgICAgICAgICBiOiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGNoYW5nZWQ6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlW2V2ZW50LnRhcmdldC5pZF0gPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgdGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8vVnVlLmNvbXBvbmVudChcImNvbG9yLXBpY2tlclwiLCBDb2xvcl9QaWNrZXIpO1xyXG5cclxuZXhwb3J0IHtDb2xvcl9QaWNrZXJ9O1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2d1aS9jb2xvcl9waWNrZXIuanMiLCJpbXBvcnQge1BhcnRpY2xlc19Qcm9wc30gZnJvbSAnLi9wYXJ0aWNsZXNfcHJvcHMuanMnO1xyXG5pbXBvcnQge1RleHR1cmVfUGFuZWx9IGZyb20gJy4vdGV4dHVyZV9wYW5lbC5qcyc7XHJcblxyXG52YXIgUGFydGljbGVzX1BhbmVsID0gXHJcbntcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgcGFydGljbGVzIDoge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGV4dHVyZXMgOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgZGVmYXVsdDogZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RlZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHRkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBcclxuICAgICAgIFxyXG4gICAgICAgcmV0dXJuICB7XHJcbiAgICAgICAgICAgICAgICBmaXJzdF90aW1lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcGFydGljbGVfcGFyYW1zOiB7fSxcclxuICAgICAgICAgICAgICAgIG15X3NlbGVjdGVkIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlX3BhbmVsX2lzX3Zpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6XHJcbiAgICB7XHJcbiAgICAgICAgYWRkX3RvX3NlbGVjdDogZnVuY3Rpb24gKGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInNlbGVjdCBuZXcgXCIsIGlkLCB0aGlzLnBhcnRpY2xlcyk7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzLnB1c2goaWQpO1xyXG4gICAgICAgICAgICB0aGlzLm15X3NlbGVjdGVkID0gaWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGVfcGFydGljbGVzOiBmdW5jdGlvbiAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZXZlbnRfaHViLiRlbWl0KFwiY3JlYXRlX3BhcnRpY2xlc1wiKTtcclxuICAgICAgICB9LFxyXG5cdFx0cmVtb3ZlX3BhcnRpY2xlczogZnVuY3Rpb24gKGV2ZW50KSBcclxuXHRcdHtcclxuICAgICAgICAgICBldmVudF9odWIuJGVtaXQoXCJyZW1vdmVfcGFydGljbGVzXCIsIHRoaXMubXlfc2VsZWN0ZWQpOyAgICAgICAgXHJcblx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmICh0aGlzLnBhcnRpY2xlc1tpXSA9PSB0aGlzLm15X3NlbGVjdGVkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RlIG5leHQgYXZhaWxhYmxlIHBhcnRpY2xlcyBvciBlbXB0eVxyXG5cdFx0XHRcdFx0aWYgKHRoaXMucGFydGljbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkrIDEgPCB0aGlzLnBhcnRpY2xlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXlfc2VsZWN0ZWQgPSB0aGlzLnBhcnRpY2xlc1tpKzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXlfc2VsZWN0ZWQgPSB0aGlzLnBhcnRpY2xlc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5teV9zZWxlY3RlZCA9ICcnO1xyXG5cdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuICAgICAgICAgICB9XHJcblx0XHR9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIGNoYW5nZV9jb2xvcnM6IGZ1bmN0aW9uIChldmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGV2ZW50X2h1Yi4kZW1pdChcImNoYW5nZV9wYXJ0aWNsZXNfY29sb3JcIiwgdGhpcy5teV9zZWxlY3RlZCwgZXZlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgc2hvd190ZXh0dXJlX3BhbmVsOiBmdW5jdGlvbiAoZXZlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRleHR1cmVfcGFuZWxfaXNfdmlzaWJsZSA9ICF0aGlzLnRleHR1cmVfcGFuZWxfaXNfdmlzaWJsZTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMgXCIsIHRoaXMudGV4dHVyZV9wYW5lbF9pc192aXNpYmxlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG5cdFx0c2VsZWN0X3BhcnRpY2xlczogZnVuY3Rpb24gKGV2ZW50KVxyXG5cdFx0e1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlX3BhcmFtcyA9IGV2ZW50X2h1Yi5nZXRfcGFydGljbGVfcGFyYW1zKHRoaXMubXlfc2VsZWN0ZWQpOyAgICAgICAgICAgICAgICAgIFxyXG5cdFx0fSxcclxuXHRcdHBsYXk6IGZ1bmN0aW9uIChldmVudClcclxuXHRcdHtcclxuICAgICAgICAgICAgZXZlbnRfaHViLiRlbWl0KFwicmVwbGF5XCIsIHRoaXMubXlfc2VsZWN0ZWQsIHRoaXMucGFydGljbGVfcGFyYW1zKTtcclxuXHRcdH0sXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlZDogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgIFxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBldmVudF9odWIuJG9uKFwiYWRkaW5nX3BhcnRpY2xlc1wiLCBmdW5jdGlvbiAoaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZWxmLmFkZF90b19zZWxlY3QoaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKCEhdGhpcy5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm15X3NlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJ0aWNsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5teV9zZWxlY3RlZCA9IHRoaXMucGFydGljbGVzWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm15X3NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVfcGFyYW1zID0gZXZlbnRfaHViLmdldF9wYXJ0aWNsZV9wYXJhbXModGhpcy5teV9zZWxlY3RlZCk7ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHdhdGNoOiB7XHJcbiAgICAgICAgcGFydGljbGVzOiBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ3YXRjaCBwYXJ0aWNsZXNcIiwgYXJyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFydGljbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpcnN0X3RpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15X3NlbGVjdGVkID0gdGhpcy5wYXJ0aWNsZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdF90aW1lID0gZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBteV9zZWxlY3RlZDogZnVuY3Rpb24gKG5ld19zZWxlY3RlZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwid2F0Y2ggbmV3IHNlbGVjdGVkXCIsIG5ld19zZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVfcGFyYW1zID0gZXZlbnRfaHViLmdldF9wYXJ0aWNsZV9wYXJhbXModGhpcy5teV9zZWxlY3RlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgICAgICBcclxuICAgIHRlbXBsYXRlOiBcclxuICAgICc8ZGl2PlxcXHJcblx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJidG4tYWRkXCIgdi1vbjpjbGljaz1cImNyZWF0ZV9wYXJ0aWNsZXNcIj5OZXc8L2J1dHRvbj5cXFxyXG5cdDxicj5cXFxyXG5cdDxzZWxlY3Qgdi1tb2RlbD1cIm15X3NlbGVjdGVkXCIgaWQ9XCJvYmplY3QtbGlzdFwiIHJlZj1cInBhcnRpY2xlc19saXN0XCI+XFxcclxuXHRcdDxvcHRpb24gZGlzYWJsZWQgdmFsdWU9XCJcIj5QbGVhc2Ugc2VsZWN0IG9uZTwvb3B0aW9uPlxcXHJcblx0ICA8b3B0aW9uIHYtZm9yPVwib3B0aW9uIGluIHBhcnRpY2xlc1wiIHYtYmluZDp2YWx1ZT1cIm9wdGlvblwiPlxcXHJcblx0XHR7eyBvcHRpb24gfX1cXFxyXG5cdCAgPC9vcHRpb24+XFxcclxuXHQ8L3NlbGVjdD5cXFxyXG5cdDxicj5cXFxyXG4gICAgPHNwYW4+U2VsZWN0ZWQ6IHt7IG15X3NlbGVjdGVkIH19PC9zcGFuPjxicj5cXFxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwiYnRuLXBsYXlcIiB2LW9uOmNsaWNrPVwicGxheVwiPlJlZnJlc2g8L2J1dHRvbj5cXFxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwiYnRuLXJlbW92ZVwiIHYtb246Y2xpY2s9XCJyZW1vdmVfcGFydGljbGVzXCI+UmVtb3ZlPC9idXR0b24+XFxcclxuICAgIDxwPiAgPHNwYW4gY2xhc3M9XCJpbmZvLXBhbmVsXCI+UGFydGljbGVzIHByb3BlcnRpZXM8L3NwYW4+PC9wPlxcXHJcbiAgICA8ZGl2IGNsYXNzPVwicGFydGljbGVzLXByb3BlcnRpZXNcIj5cXFxyXG4gICAgICAgIDxkaXYgdi1pZj1cIm15X3NlbGVjdGVkXCIgPlxcXHJcbiAgICAgICAgICAgIDxQYXJ0aWNsZXNQcm9wcyAgOnBhcmFtcz1cInBhcnRpY2xlX3BhcmFtc1wiIC8+XFxcclxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIEBjbGljaz1cInNob3dfdGV4dHVyZV9wYW5lbFwiPlNob3cgdGV4dHVyZSBwYW5lbDwvYT5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHVtbXlcIiB2LWlmPVwidGV4dHVyZV9wYW5lbF9pc192aXNpYmxlXCI+XFxcclxuICAgICAgICAgICAgPHRleHR1cmUtcGFuZWwgOnRleHR1cmVzPVwidGV4dHVyZXNcIiA6b2JqZWN0X2lkPVwibXlfc2VsZWN0ZWRcIiA6c2VsZWN0ZWQ9XCJwYXJ0aWNsZV9wYXJhbXMudGV4dHVyZVwiLz5cXFxyXG4gICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgIDwvZGl2PlxcXHJcbiAgICA8L2Rpdj5cXFxyXG4gICAgPC9kaXY+JyxcclxuICAgXHJcbiAgIFxyXG4gICAgY29tcG9uZW50czoge1xyXG4gICAgICAgICdQYXJ0aWNsZXNQcm9wcyc6IFBhcnRpY2xlc19Qcm9wcyxcclxuICAgICAgICAndGV4dHVyZS1wYW5lbCc6IFRleHR1cmVfUGFuZWwsXHJcbiAgICB9LFxyXG59O1xyXG5cclxuXHJcbi8vVnVlLmNvbXBvbmVudChcInBhcnRpY2xlcy1wYW5lbFwiLCBQYXJ0aWNsZXNfUGFuZWwpO1xyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZXNfUGFuZWx9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ndWkvcGFydGljbGVzX3BhbmVsLmpzIiwiaW1wb3J0IHtDb2xvcl9QaWNrZXJ9IGZyb20gJy4vY29sb3JfcGlja2VyLmpzJztcclxuXHJcbnZhciBCbGVuZGluZ19TZWxlY3RvciA9IHtcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgXCJibGVuZGluZ1wiOiB7XHJcbiAgICAgICAgICAgIHR5cGUgOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIm5vXCJcclxuICAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZTpcclxuICAgICAgICAnPHNlbGVjdCB2LW1vZGVsPVwiYmxlbmRpbmdcIiBpZD1cImJsZW5kaW5nXCIgdi1vbjpjaGFuZ2U9XCJzZWxlY3RcIj5cXFxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibm9cIj5ubzwvb3B0aW9uPlxcXHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhZGRpdGl2ZVwiPmFkZGl0aXZlPC9vcHRpb24+XFxcclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm9uZV9hbHBoYVwiPm9uZSwgbWludXMgc3JjIGFscGhhPC9vcHRpb24+XFxcclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFscGhhX29uZVwiPm1pbnVzIHNyYyBhbHBoYSwgb25lPC9vcHRpb24+XFxcclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFscGhhXCI+YWxwaGE8L29wdGlvbj5cXFxyXG4gICAgICAgIDwvc2VsZWN0PicsXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgc2VsZWN0OiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB0aGlzLmJsZW5kaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG5cclxudmFyIEJlaGF2aW9yID0ge1xyXG4gICAgcHJvcHM6IFtcImFmZmVjdF9tZXRob2RcIiwgXCJlbWl0X21ldGhvZFwiXSxcclxuICAgIFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGVtcGxhdGU6ICc8ZGl2PlxcXHJcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBAY2xpY2s9XCJzaG93X2JlaGF2aW9yXCI+U2hvdyBCZWhhdmlvdXI8L2J1dHRvbj5cXFxyXG4gICAgPGRpdiBjbGFzcz1cImJlaGF2aW9yXCIgdi1pZj1cImJlaGF2aW9yXCI+XFxcclxuICAgIDxwPmFmZmVjdCBtZXRob2Q8YnI+XFxcclxuICAgIDx0ZXh0YXJlYSB2LW1vZGVsPVwiYWZmZWN0X21ldGhvZFwiPjwvdGV4dGFyZWE+XFxcclxuICAgIDxwPmVtaXQgbWV0aG9kPGJyPlxcXHJcbiAgICA8dGV4dGFyZWEgdi1tb2RlbD1cImVtaXRfbWV0aG9kXCI+PC90ZXh0YXJlYT5cXFxyXG4gICAgPC9kaXY+JyxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBzaG93X2JlaGF2aW9yOiBmdW5jdGlvbihmKSB7XHJcbiAgICAgICAgICAgIHZhciBiZWhhdmlvciA9ICF0aGlzLmJlaGF2aW9yO1xyXG4gICAgICAgICAgICB0aGlzLmJlaGF2aW9yID0gYmVoYXZpb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn07XHJcblxyXG52YXIgUGFydGljbGVfUGFyYW1zID0gXHJcbntcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgXCJwYXJhbXNcIjoge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGVtcGxhdGU6ICc8ZGl2IEBrZXl1cC4xMz1cImZpcmVcIj5cXFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9wLWNvbHVtblwiPlxcXHJcbiAgICAgICAgICAgIExpZmUgTGVuZ3RoOiA8YnIvPlxcXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibGlmZV9sZW5ndGhcIiB2LW1vZGVsLm51bWJlcj1cInBhcmFtcy5saWZlX2xlbmd0aFwiIHR5cGU9XCJudW1iZXJcIiBzdGVwPVwiMC4xXCIgLz5cXFxyXG4gICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb3AtY29sdW1uXCI+XFxcclxuICAgICAgICAgICAgRW1pdCBwZXIgc2Vjb25kIDxici8+XFxcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJlbWl0X3Blcl9zZWNvbmRcIiB2LW1vZGVsLm51bWJlcj1cInBhcmFtcy5lbWl0X3Blcl9zZWNvbmRcIiB0eXBlPVwibnVtYmVyXCIgLz5cXFxyXG4gICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb3AtY29sdW1uXCI+XFxcclxuICAgICAgICAgICAgTnVtYmVyIG9mIHBhcnRpY2xlczxici8+XFxcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJjb3VudFwiIHYtbW9kZWwubnVtYmVyPVwicGFyYW1zLmNvdW50XCIgdHlwZT1cIm51bWJlclwiIC8+XFxcclxuICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9wLWNvbHVtblwiPlxcXHJcbiAgICAgICAgICAgIFBvaW50IFNpemU8YnIvPlxcXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwic2l6ZVwiIHYtbW9kZWwubnVtYmVyPVwicGFyYW1zLnNpemVcIiB0eXBlPVwibnVtYmVyXCIgc3RlcD1cIjAuMVwiIC8+XFxcclxuICAgICAgICA8L2Rpdj5cXFxyXG48L2Rpdj4nLFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGZpcmU6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZmlyZShldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4gICBcclxudmFyIFBhcnRpY2xlc19Qcm9wcyA9IFxyXG57XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIFwicGFyYW1zXCI6IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6ICc8ZGl2PiAgPHBhcnRpY2xlLXBhcmFtcyA6cGFyYW1zPXBhcmFtcyAvPlxcXHJcbiAgICAgICAgPGNvbG9yLXBpY2tlciA6dmFsdWU9XCJwYXJhbXMuY29sb3JcIiBAaW5wdXQ9XCJ1cGRhdGVfY29sb3JcIj48L2NvbG9yLXBpY2tlcj5cXFxyXG4gICAgICAgIDxwPkJsZW5kaW5nIG1vZGU8L3A+XFxcclxuICAgICAgICAgICAgPGJsZW5kaW5nLW1vZGUgOmJsZW5kaW5nPXBhcmFtcy5ibGVuZGluZyBAY2hhbmdlPVwiYmxlbmRpbmdfY2hhbmdlXCI+IDwvYmxlbmRpbmctbW9kZT5cXFxyXG4gICAgICAgIDxwPlByZWNvbXB1dGVkIGFscGhhIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2LW1vZGVsPVwicGFyYW1zLnByZWNvbXB1dGVkX2FscGhhXCIgQGNoYW5nZT1cImZpcmVcIiBpZD1cInByZV9hbHBoYVwiPjwvcD5cXFxyXG4gICAgICAgIDxiZWhhdmlvciA6YWZmZWN0X21ldGhvZD1wYXJhbXMuYWZmZWN0X21ldGhvZCA6ZW1pdF9tZXRob2Q9cGFyYW1zLmVtaXRfbWV0aG9kIC8+XFxcclxuICAgIDxkaXY+JyxcclxuICAgIFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICAgIHBhcmFtczogZnVuY3Rpb24gKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjaGFuZ2UgXCIsIHRoaXMucGFyYW1zLmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGJsZW5kaW5nX2NoYW5nZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmJsZW5kaW5nID0gZXZlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdF9wYXJhbV9jaGFuZ2UoXCJibGVuZGluZ1wiLCBldmVudCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbWl0X3BhcmFtX2NoYW5nZTogZnVuY3Rpb24gKGtleSwgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID17fTtcclxuICAgICAgICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgZXZlbnRfaHViLiRlbWl0KFwiY2hhbmdlX3BhcmFtc1wiLCB0aGlzLnBhcmFtcy5pZCwgcGFyYW1zKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpcmU6IGZ1bmN0aW9uIChldmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IChldmVudC50YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94JykgPyBldmVudC50YXJnZXQuY2hlY2tlZCA6IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5lbWl0X3BhcmFtX2NoYW5nZShldmVudC50YXJnZXQuaWQsIHZhbHVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIHVwZGF0ZV9jb2xvcjogZnVuY3Rpb24gKGV2ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZXZlbnRfaHViLiRlbWl0KCdjaGFuZ2VfY29sb3InLCB0aGlzLnBhcmFtcy5pZCwgZXZlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICBcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgICAgJ2NvbG9yLXBpY2tlcic6IENvbG9yX1BpY2tlcixcclxuICAgICAgICAnYmxlbmRpbmctbW9kZSc6IEJsZW5kaW5nX1NlbGVjdG9yLFxyXG4gICAgICAgICdiZWhhdmlvcic6IEJlaGF2aW9yLFxyXG4gICAgICAgICdwYXJ0aWNsZS1wYXJhbXMnOiBQYXJ0aWNsZV9QYXJhbXMsXHJcbiAgICB9LFxyXG59O1xyXG5cclxuLy9WdWUuY29tcG9uZW50KFwiUGFydGljbGVzUHJvcHNcIiwgUGFydGljbGVzX1Byb3BzKTtcclxuXHJcblxyXG5leHBvcnQge1BhcnRpY2xlc19Qcm9wc307XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2d1aS9wYXJ0aWNsZXNfcHJvcHMuanMiLCJcclxudmFyIFRleHR1cmVfUGFuZWwgPSBcclxue1xyXG4gICAgdGVtcGxhdGU6IFxyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidGV4dHVyZS1wYW5lbFwiPlxcXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWdoLXRvb2xzLXBhbmVsXCI+XFxcclxuICAgICAgICAgICAgPHNlbGVjdCBpZD1cInRleHR1cmVfc2VsZWN0XCIgdi1tb2RlbD1cInNlbGVjdGVkXCIgdi1vbjpjaGFuZ2U9XCJjaG9vc2VfdGV4dHVyZVwiPlxcXHJcbiAgICAgICAgICAgIDxvcHRpb24gdi1mb3I9XCJvcHRpb24gaW4gdGV4dHVyZXNcIiB2LWJpbmQ6dmFsdWU9XCJvcHRpb25cIj5cXFxyXG4gICAgICAgICAgICAgICAge3sgb3B0aW9uIH19XFxcclxuICAgICAgICAgICAgPC9vcHRpb24+XFxcclxuICAgICAgICAgICAgPC9zZWxlY3Q+XFxcclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdi1vbjpjbGljaz1cImFwcGx5XCI+YXBwbHk8L2J1dHRvbj5cXFxyXG4gICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dHVyZS1jYW52YXNcIj5cXFxyXG4gICAgICAgICAgICA8Y2FudmFzIGlkPVwidGV4dHVyZS1jYW52YXMtb2JqXCIgY2xhc3M9XCJ0ZXh0dXJlLWNhbnZhc1wiIHJlZj1cImNhbnZhc1wiPlxcXHJcbiAgICAgICAgICAgIDwvY2FudmFzPlxcXHJcbiAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0dXJlLWluZm9cIj5cXFxyXG4gICAgICAgICAgICAgICAgVGV4dHVyZSBGb3JtYXQgIHt7Zm9ybWF0fX0gPGJyIC8+XFxcclxuICAgICAgICAgICAgICAgIFRleHR1cmUgV2lkdGgge3t0ZXh0dXJlX3dpZHRofX0gSGVpZ2h0IHt7dGV4dHVyZV9oZWlnaHR9fVxcXHJcbiAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbGVhclwiIC8+XFxcclxuICAgICAgICA8L2Rpdj4nLFxyXG5cclxuICAgICAgICAvL3RleHR1cmUgZGljdGlvbmFyaWVzLCBzZWxlY3RlZCB0ZXh0dXJlLCBvYmplY3QgaWQsIHdoaWNoIHNlbGVjdGVkIHRleHR1cmVcclxuICAgIHByb3BzOiBbXCJ0ZXh0dXJlc1wiLCBcInNlbGVjdGVkXCIsIFwib2JqZWN0X2lkXCJdLFxyXG4gICAgXHJcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRfdGV4dHVyZTogJycsXHJcbiAgICAgICAgICAgIHRleHR1cmVfd2lkdGggOiAwLFxyXG4gICAgICAgICAgICB0ZXh0dXJlX2hlaWdodCA6IDAsXHJcbiAgICAgICAgICAgIGZvcm1hdCA6ICcnLFxyXG4gICAgICAgICAgICBwYW5lbF92aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6ICcnLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBzaG93X3BhbmVsOiBmdW5jdGlvbiAoZXZlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsX3Zpc2libGUgPSAhdGhpcy5wYW5lbF92aXNpYmxlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hvb3NlX3RleHR1cmU6IGZ1bmN0aW9uKGV2ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZF90ZXh0dXJlID0gdGhpcy5zZWxlY3RlZDtcclxuICAgICAgICAgICAgdGhpcy5kcmF3X3RleHR1cmUodGhpcy5zZWxlY3RlZF90ZXh0dXJlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImFwcGx5IG9mIFwiLCB0aGlzLm9iamVjdF9pZCwgdGhpcy5zZWxlY3RlZF90ZXh0dXJlKTtcclxuICAgICAgICAgICAgZXZlbnRfaHViLiRlbWl0KFwic2VsZWN0X3RleHR1cmVcIiwgdGhpcy5vYmplY3RfaWQsIHRoaXMuc2VsZWN0ZWRfdGV4dHVyZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkcmF3X3RleHR1cmU6IGZ1bmN0aW9uIChuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFuYW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gZXZlbnRfaHViLmdldF90ZXh0dXJlKG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoIXRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJPaCwgRnVjayEgVGV4dHVyZSBcIiArIG5hbWUgKyBcIiBub3QgZm91bmQhXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0ID0gdGV4dHVyZV9mb3JtYXRfdG9fc3RyaW5nKHRleHR1cmUuZm9ybWF0KTtcclxuICAgICAgICAgICAgdmFyIGltYWdlID0gdGV4dHVyZS5pbWFnZTtcclxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlX3dpZHRoID0gaW1hZ2UubmF0dXJhbFdpZHRoIHx8IGltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLnRleHR1cmVfaGVpZ2h0ID0gaW1hZ2UubmF0dXJhbEhlaWdodCB8fCBpbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgY2FudmFzID0gdGhpcy4kcmVmc1tcImNhbnZhc1wiXTtcclxuICAgICAgICAgICAgbXlfZHJhd19pbWFnZShjYW52YXMsIGltYWdlLCAwLCAwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIGdldF90ZXh0dXJlX2Zyb21fcGFydGljbGVzOiBmdW5jdGlvbiAoaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZF90ZXh0dXJlID0gZXZlbnRfaHViLmdldF90ZXh0dXJlX2Zyb21fcGFydGljbGVzKGlkKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3X3RleHR1cmUodGhpcy5zZWxlY3RlZF90ZXh0dXJlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5nZXRfdGV4dHVyZV9mcm9tX3BhcnRpY2xlcyh0aGlzLm9iamVjdF9pZCk7XHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJtb3VudCBvZiB0ZXh0dXJlIHBhbmVsXCIsIHRoaXMub2JqZWN0X2lkLCB0aGlzLnNlbGVjdGVkX3RleHR1cmUsIHRoaXMuc2VsZWN0ZWQpO1xyXG4gICAgICAvL3ByaW50KFwiPGgzPkhpISBJIG1vdW50ZWQgYW5kIG15IHRleHR1cmUgaXMgXCIgKyB0aGlzLnNlbGVjdGVkX3RleHR1cmUgKyBcIixcIiArIHRoaXMuc2VsZWN0ZWQgKyBcIjwvaDM+XCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgICAgb2JqZWN0X2lkOiBmdW5jdGlvbiAodmFsdWUpIHsgXHJcbiAgICAgICAgICAgdGhpcy5nZXRfdGV4dHVyZV9mcm9tX3BhcnRpY2xlcyh2YWx1ZSk7XHJcbiAgICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICBcclxuICAgIFxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IHtUZXh0dXJlX1BhbmVsfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ3VpL3RleHR1cmVfcGFuZWwuanMiLCJpbXBvcnQge1BhcnRpY2xlc19QYW5lbH0gZnJvbSAnLi9wYXJ0aWNsZXNfcGFuZWwuanMnO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlX3Z1ZV9hcHAoaWQpIHtcclxuXHJcblx0dmFyIGFwcDIgPSBuZXcgVnVlKHtcclxuXHRcdGVsOiBpZCxcclxuICAgICAgICBcclxuICAgICAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgICAgICAgICdwYXJ0aWNsZXMtcGFuZWwnOiBQYXJ0aWNsZXNfUGFuZWwsXHJcbiAgICAgICAgfSxcclxuXHRcdGRhdGE6IHtcclxuICAgICAgICAgICAgcGFydGljbGVzOiBbXSxcclxuICAgICAgICAgICAgdGV4dHVyZXM6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGlkPVwiYXBwXCI+XFxcclxuICAgICAgICAgICAgPHBhcnRpY2xlcy1wYW5lbCA6cGFydGljbGVzPVwicGFydGljbGVzXCIgOnRleHR1cmVzPVwidGV4dHVyZXNcIj48L3BhcnRpY2xlcy1wYW5lbD5cXFxyXG4gICAgICAgICAgICA8L2Rpdj4nLFxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gYXBwMjtcclxufVxyXG5cclxuZXhwb3J0IHtjcmVhdGVfdnVlX2FwcH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2d1aS92dWVhcHAuanMiLCJleHBvcnQge2NyZWF0ZV92dWVfYXBwfSBmcm9tICcuL2d1aS92dWVhcHAuanMnO1xyXG5leHBvcnQge0NvbG9yX1BpY2tlcn0gZnJvbSAnLi9ndWkvY29sb3JfcGlja2VyLmpzJztcclxuZXhwb3J0IHtUZXh0dXJlX1BhbmVsfSBmcm9tICcuL2d1aS90ZXh0dXJlX3BhbmVsLmpzJztcclxuZXhwb3J0IHtQYXJ0aWNsZXNfUHJvcHN9IGZyb20gJy4vZ3VpL3BhcnRpY2xlc19wcm9wcy5qcyc7XHJcbmV4cG9ydCB7UGFydGljbGVzX1BhbmVsfSBmcm9tICcuL2d1aS9wYXJ0aWNsZXNfcGFuZWwuanMnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ndWlfbWFpbl93ZWJwYWNrLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==