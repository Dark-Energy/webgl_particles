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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjA0MTk3MjhiMTRmMmUyNTJiMWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aS9jb2xvcl9waWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aS9wYXJ0aWNsZXNfcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aS9wYXJ0aWNsZXNfcHJvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2d1aS90ZXh0dXJlX3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9ndWkvdnVlYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9ndWlfbWFpbl93ZWJwYWNrLmpzIl0sIm5hbWVzIjpbIkNvbG9yX1BpY2tlciIsInByb3BzIiwidmFsdWUiLCJ0eXBlIiwiT2JqZWN0IiwiZGVmYXVsdCIsInIiLCJnIiwiYiIsInRlbXBsYXRlIiwiZGF0YSIsIm5ld192YWx1ZSIsIm1ldGhvZHMiLCJjaGFuZ2VkIiwiZXZlbnQiLCJ0YXJnZXQiLCJpZCIsIiRlbWl0IiwiUGFydGljbGVzX1BhbmVsIiwicGFydGljbGVzIiwidGV4dHVyZXMiLCJzZWxlY3RlZCIsIlN0cmluZyIsImZpcnN0X3RpbWUiLCJwYXJ0aWNsZV9wYXJhbXMiLCJteV9zZWxlY3RlZCIsInRleHR1cmVfcGFuZWxfaXNfdmlzaWJsZSIsImFkZF90b19zZWxlY3QiLCJwdXNoIiwiY3JlYXRlX3BhcnRpY2xlcyIsImV2ZW50X2h1YiIsInJlbW92ZV9wYXJ0aWNsZXMiLCJpIiwibGVuZ3RoIiwic3BsaWNlIiwiY2hhbmdlX2NvbG9ycyIsInNob3dfdGV4dHVyZV9wYW5lbCIsInNlbGVjdF9wYXJ0aWNsZXMiLCJnZXRfcGFydGljbGVfcGFyYW1zIiwicGxheSIsImNyZWF0ZWQiLCJzZWxmIiwiJG9uIiwid2F0Y2giLCJhcnIiLCJuZXdfc2VsZWN0ZWQiLCJjb21wb25lbnRzIiwiVGV4dHVyZV9QYW5lbCIsIkJsZW5kaW5nX1NlbGVjdG9yIiwicmVxdWlyZWQiLCJzZWxlY3QiLCJibGVuZGluZyIsIkJlaGF2aW9yIiwiYmVoYXZpb3IiLCJzaG93X2JlaGF2aW9yIiwiZiIsIlBhcnRpY2xlX1BhcmFtcyIsImZpcmUiLCIkcGFyZW50IiwiUGFydGljbGVzX1Byb3BzIiwicGFyYW1zIiwiYmxlbmRpbmdfY2hhbmdlIiwiZW1pdF9wYXJhbV9jaGFuZ2UiLCJrZXkiLCJjaGVja2VkIiwidXBkYXRlX2NvbG9yIiwic2VsZWN0ZWRfdGV4dHVyZSIsInRleHR1cmVfd2lkdGgiLCJ0ZXh0dXJlX2hlaWdodCIsImZvcm1hdCIsInBhbmVsX3Zpc2libGUiLCJzaG93X3BhbmVsIiwiY2hvb3NlX3RleHR1cmUiLCJkcmF3X3RleHR1cmUiLCJhcHBseSIsIm9iamVjdF9pZCIsIm5hbWUiLCJ0ZXh0dXJlIiwiZ2V0X3RleHR1cmUiLCJjb25zb2xlIiwiZXJyb3IiLCJ0ZXh0dXJlX2Zvcm1hdF90b19zdHJpbmciLCJpbWFnZSIsIm5hdHVyYWxXaWR0aCIsIndpZHRoIiwibmF0dXJhbEhlaWdodCIsImhlaWdodCIsImNhbnZhcyIsIiRyZWZzIiwibXlfZHJhd19pbWFnZSIsImdldF90ZXh0dXJlX2Zyb21fcGFydGljbGVzIiwibW91bnRlZCIsImNyZWF0ZV92dWVfYXBwIiwiYXBwMiIsIlZ1ZSIsImVsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFF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MEYsY0FBVCxDQUF3QjVFLEVBQXhCLEVBQTRCOztBQUUzQixNQUFJNkUsT0FBTyxJQUFJQyxHQUFKLENBQVE7QUFDbEJDLFFBQUkvRSxFQURjOztBQUdaOEIsZ0JBQVk7QUFDUix5QkFBbUIsNEVBQUE1QjtBQURYLEtBSEE7QUFNbEJSLFVBQU07QUFDSVMsaUJBQVcsRUFEZjtBQUVJQyxnQkFBVTtBQUZkLEtBTlk7QUFVWlgsY0FBVTs7O0FBVkUsR0FBUixDQUFYOztBQWVBLFNBQU9vRixJQUFQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJEO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImVkaXRvci5ndWkuZGV2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmMDQxOTcyOGIxNGYyZTI1MmIxZCIsIlxyXG52YXIgQ29sb3JfUGlja2VyID0ge1xyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7cjogMCwgZzogMCwgYjowfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRlbXBsYXRlOiAnPGRpdj5cXFxyXG4gICAgPHA+UmVkIEdyZWVuIEJsdWUgQ29sb3JcXFxyXG4gICAgPHA+XFxcclxuICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIwXCIgbWF4PVwiMjU1XCIgQGNoYW5nZT1cImNoYW5nZWRcIiA6dmFsdWU9XCJ2YWx1ZS5yXCIgcmVmPVwiclwiIGlkPVwiclwiID5cXFxyXG4gICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIyNTVcIiBAY2hhbmdlPVwiY2hhbmdlZFwiIDp2YWx1ZT1cInZhbHVlLmdcIiByZWY9XCJnXCIgaWQ9XCJnXCI+XFxcclxuICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIwXCIgbWF4PVwiMjU1XCIgQGNoYW5nZT1cImNoYW5nZWRcIiA6dmFsdWU9XCJ2YWx1ZS5iXCIgcmVmPVwiYlwiIGlkPVwiYlwiPlxcXHJcbiAgICA8L2Rpdj4nLFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5ld192YWx1ZSA6IHtcclxuICAgICAgICAgICAgICAgIHI6IDAsXHJcbiAgICAgICAgICAgICAgICBnOiAwLFxyXG4gICAgICAgICAgICAgICAgYjogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBjaGFuZ2VkOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVtldmVudC50YXJnZXQuaWRdID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vL1Z1ZS5jb21wb25lbnQoXCJjb2xvci1waWNrZXJcIiwgQ29sb3JfUGlja2VyKTtcclxuXHJcbmV4cG9ydCB7Q29sb3JfUGlja2VyfTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ndWkvY29sb3JfcGlja2VyLmpzIiwiaW1wb3J0IHtQYXJ0aWNsZXNfUHJvcHN9IGZyb20gJy4vcGFydGljbGVzX3Byb3BzLmpzJztcclxuaW1wb3J0IHtUZXh0dXJlX1BhbmVsfSBmcm9tICcuL3RleHR1cmVfcGFuZWwuanMnO1xyXG5cclxudmFyIFBhcnRpY2xlc19QYW5lbCA9IFxyXG57XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHBhcnRpY2xlcyA6IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRleHR1cmVzIDoge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VsZWN0ZWQ6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblx0ZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgXHJcbiAgICAgICBcclxuICAgICAgIHJldHVybiAge1xyXG4gICAgICAgICAgICAgICAgZmlyc3RfdGltZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHBhcnRpY2xlX3BhcmFtczoge30sXHJcbiAgICAgICAgICAgICAgICBteV9zZWxlY3RlZCA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdGV4dHVyZV9wYW5lbF9pc192aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOlxyXG4gICAge1xyXG4gICAgICAgIGFkZF90b19zZWxlY3Q6IGZ1bmN0aW9uIChpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzZWxlY3QgbmV3IFwiLCBpZCwgdGhpcy5wYXJ0aWNsZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgdGhpcy5teV9zZWxlY3RlZCA9IGlkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlX3BhcnRpY2xlczogZnVuY3Rpb24gKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGV2ZW50X2h1Yi4kZW1pdChcImNyZWF0ZV9wYXJ0aWNsZXNcIik7XHJcbiAgICAgICAgfSxcclxuXHRcdHJlbW92ZV9wYXJ0aWNsZXM6IGZ1bmN0aW9uIChldmVudCkgXHJcblx0XHR7XHJcbiAgICAgICAgICAgZXZlbnRfaHViLiRlbWl0KFwicmVtb3ZlX3BhcnRpY2xlc1wiLCB0aGlzLm15X3NlbGVjdGVkKTsgICAgICAgIFxyXG5cdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJ0aWNsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAodGhpcy5wYXJ0aWNsZXNbaV0gPT0gdGhpcy5teV9zZWxlY3RlZCkge1xyXG5cdFx0XHRcdFx0dGhpcy5wYXJ0aWNsZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZSBuZXh0IGF2YWlsYWJsZSBwYXJ0aWNsZXMgb3IgZW1wdHlcclxuXHRcdFx0XHRcdGlmICh0aGlzLnBhcnRpY2xlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpKyAxIDwgdGhpcy5wYXJ0aWNsZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15X3NlbGVjdGVkID0gdGhpcy5wYXJ0aWNsZXNbaSsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm15X3NlbGVjdGVkID0gdGhpcy5wYXJ0aWNsZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMubXlfc2VsZWN0ZWQgPSAnJztcclxuXHRcdFx0XHRcdH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgfVxyXG5cdFx0fSxcclxuICAgICAgICBcclxuICAgICAgICBjaGFuZ2VfY29sb3JzOiBmdW5jdGlvbiAoZXZlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBldmVudF9odWIuJGVtaXQoXCJjaGFuZ2VfcGFydGljbGVzX2NvbG9yXCIsIHRoaXMubXlfc2VsZWN0ZWQsIGV2ZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIHNob3dfdGV4dHVyZV9wYW5lbDogZnVuY3Rpb24gKGV2ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlX3BhbmVsX2lzX3Zpc2libGUgPSAhdGhpcy50ZXh0dXJlX3BhbmVsX2lzX3Zpc2libGU7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzIFwiLCB0aGlzLnRleHR1cmVfcGFuZWxfaXNfdmlzaWJsZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuXHRcdHNlbGVjdF9wYXJ0aWNsZXM6IGZ1bmN0aW9uIChldmVudClcclxuXHRcdHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZV9wYXJhbXMgPSBldmVudF9odWIuZ2V0X3BhcnRpY2xlX3BhcmFtcyh0aGlzLm15X3NlbGVjdGVkKTsgICAgICAgICAgICAgICAgICBcclxuXHRcdH0sXHJcblx0XHRwbGF5OiBmdW5jdGlvbiAoZXZlbnQpXHJcblx0XHR7XHJcbiAgICAgICAgICAgIGV2ZW50X2h1Yi4kZW1pdChcInJlcGxheVwiLCB0aGlzLm15X3NlbGVjdGVkLCB0aGlzLnBhcnRpY2xlX3BhcmFtcyk7XHJcblx0XHR9LFxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICBcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgZXZlbnRfaHViLiRvbihcImFkZGluZ19wYXJ0aWNsZXNcIiwgZnVuY3Rpb24gKGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2VsZi5hZGRfdG9fc2VsZWN0KGlkKTtcclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIGlmICghIXRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5teV9zZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFydGljbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXlfc2VsZWN0ZWQgPSB0aGlzLnBhcnRpY2xlc1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5teV9zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlX3BhcmFtcyA9IGV2ZW50X2h1Yi5nZXRfcGFydGljbGVfcGFyYW1zKHRoaXMubXlfc2VsZWN0ZWQpOyAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICAgIHBhcnRpY2xlczogZnVuY3Rpb24gKGFycikge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwid2F0Y2ggcGFydGljbGVzXCIsIGFycik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcnRpY2xlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maXJzdF90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teV9zZWxlY3RlZCA9IHRoaXMucGFydGljbGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RfdGltZSA9IGZhbHNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbXlfc2VsZWN0ZWQ6IGZ1bmN0aW9uIChuZXdfc2VsZWN0ZWQpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIndhdGNoIG5ldyBzZWxlY3RlZFwiLCBuZXdfc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlX3BhcmFtcyA9IGV2ZW50X2h1Yi5nZXRfcGFydGljbGVfcGFyYW1zKHRoaXMubXlfc2VsZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICB0ZW1wbGF0ZTogXHJcbiAgICAnPGRpdj5cXFxyXG5cdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwiYnRuLWFkZFwiIHYtb246Y2xpY2s9XCJjcmVhdGVfcGFydGljbGVzXCI+TmV3PC9idXR0b24+XFxcclxuXHQ8YnI+XFxcclxuXHQ8c2VsZWN0IHYtbW9kZWw9XCJteV9zZWxlY3RlZFwiIGlkPVwib2JqZWN0LWxpc3RcIiByZWY9XCJwYXJ0aWNsZXNfbGlzdFwiPlxcXHJcblx0XHQ8b3B0aW9uIGRpc2FibGVkIHZhbHVlPVwiXCI+UGxlYXNlIHNlbGVjdCBvbmU8L29wdGlvbj5cXFxyXG5cdCAgPG9wdGlvbiB2LWZvcj1cIm9wdGlvbiBpbiBwYXJ0aWNsZXNcIiB2LWJpbmQ6dmFsdWU9XCJvcHRpb25cIj5cXFxyXG5cdFx0e3sgb3B0aW9uIH19XFxcclxuXHQgIDwvb3B0aW9uPlxcXHJcblx0PC9zZWxlY3Q+XFxcclxuXHQ8YnI+XFxcclxuICAgIDxzcGFuPlNlbGVjdGVkOiB7eyBteV9zZWxlY3RlZCB9fTwvc3Bhbj48YnI+XFxcclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cImJ0bi1wbGF5XCIgdi1vbjpjbGljaz1cInBsYXlcIj5SZWZyZXNoPC9idXR0b24+XFxcclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cImJ0bi1yZW1vdmVcIiB2LW9uOmNsaWNrPVwicmVtb3ZlX3BhcnRpY2xlc1wiPlJlbW92ZTwvYnV0dG9uPlxcXHJcbiAgICA8cD4gIDxzcGFuIGNsYXNzPVwiaW5mby1wYW5lbFwiPlBhcnRpY2xlcyBwcm9wZXJ0aWVzPC9zcGFuPjwvcD5cXFxyXG4gICAgPGRpdiBjbGFzcz1cInBhcnRpY2xlcy1wcm9wZXJ0aWVzXCI+XFxcclxuICAgICAgICA8ZGl2IHYtaWY9XCJteV9zZWxlY3RlZFwiID5cXFxyXG4gICAgICAgICAgICA8UGFydGljbGVzUHJvcHMgIDpwYXJhbXM9XCJwYXJ0aWNsZV9wYXJhbXNcIiAvPlxcXHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBAY2xpY2s9XCJzaG93X3RleHR1cmVfcGFuZWxcIj5TaG93IHRleHR1cmUgcGFuZWw8L2E+XFxcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImR1bW15XCIgdi1pZj1cInRleHR1cmVfcGFuZWxfaXNfdmlzaWJsZVwiPlxcXHJcbiAgICAgICAgICAgIDx0ZXh0dXJlLXBhbmVsIDp0ZXh0dXJlcz1cInRleHR1cmVzXCIgOm9iamVjdF9pZD1cIm15X3NlbGVjdGVkXCIgOnNlbGVjdGVkPVwicGFydGljbGVfcGFyYW1zLnRleHR1cmVcIi8+XFxcclxuICAgICAgICAgICAgPC9kaXY+XFxcclxuICAgICAgICA8L2Rpdj5cXFxyXG4gICAgPC9kaXY+XFxcclxuICAgIDwvZGl2PicsXHJcbiAgIFxyXG4gICBcclxuICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgICAnUGFydGljbGVzUHJvcHMnOiBQYXJ0aWNsZXNfUHJvcHMsXHJcbiAgICAgICAgJ3RleHR1cmUtcGFuZWwnOiBUZXh0dXJlX1BhbmVsLFxyXG4gICAgfSxcclxufTtcclxuXHJcblxyXG4vL1Z1ZS5jb21wb25lbnQoXCJwYXJ0aWNsZXMtcGFuZWxcIiwgUGFydGljbGVzX1BhbmVsKTtcclxuXHJcbmV4cG9ydCB7UGFydGljbGVzX1BhbmVsfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ3VpL3BhcnRpY2xlc19wYW5lbC5qcyIsImltcG9ydCB7Q29sb3JfUGlja2VyfSBmcm9tICcuL2NvbG9yX3BpY2tlci5qcyc7XHJcblxyXG52YXIgQmxlbmRpbmdfU2VsZWN0b3IgPSB7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIFwiYmxlbmRpbmdcIjoge1xyXG4gICAgICAgICAgICB0eXBlIDogU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJub1wiXHJcbiAgICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6XHJcbiAgICAgICAgJzxzZWxlY3Qgdi1tb2RlbD1cImJsZW5kaW5nXCIgaWQ9XCJibGVuZGluZ1wiIHYtb246Y2hhbmdlPVwic2VsZWN0XCI+XFxcclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm5vXCI+bm88L29wdGlvbj5cXFxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYWRkaXRpdmVcIj5hZGRpdGl2ZTwvb3B0aW9uPlxcXHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJvbmVfYWxwaGFcIj5vbmUsIG1pbnVzIHNyYyBhbHBoYTwvb3B0aW9uPlxcXHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbHBoYV9vbmVcIj5taW51cyBzcmMgYWxwaGEsIG9uZTwvb3B0aW9uPlxcXHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbHBoYVwiPmFscGhhPC9vcHRpb24+XFxcclxuICAgICAgICA8L3NlbGVjdD4nLFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIHNlbGVjdDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgdGhpcy5ibGVuZGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufTtcclxuXHJcbnZhciBCZWhhdmlvciA9IHtcclxuICAgIHByb3BzOiBbXCJhZmZlY3RfbWV0aG9kXCIsIFwiZW1pdF9tZXRob2RcIl0sXHJcbiAgICBcclxuICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiZWhhdmlvcjogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHRlbXBsYXRlOiAnPGRpdj5cXFxyXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgQGNsaWNrPVwic2hvd19iZWhhdmlvclwiPlNob3cgQmVoYXZpb3VyPC9idXR0b24+XFxcclxuICAgIDxkaXYgY2xhc3M9XCJiZWhhdmlvclwiIHYtaWY9XCJiZWhhdmlvclwiPlxcXHJcbiAgICA8cD5hZmZlY3QgbWV0aG9kPGJyPlxcXHJcbiAgICA8dGV4dGFyZWEgdi1tb2RlbD1cImFmZmVjdF9tZXRob2RcIj48L3RleHRhcmVhPlxcXHJcbiAgICA8cD5lbWl0IG1ldGhvZDxicj5cXFxyXG4gICAgPHRleHRhcmVhIHYtbW9kZWw9XCJlbWl0X21ldGhvZFwiPjwvdGV4dGFyZWE+XFxcclxuICAgIDwvZGl2PicsXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgc2hvd19iZWhhdmlvcjogZnVuY3Rpb24oZikge1xyXG4gICAgICAgICAgICB2YXIgYmVoYXZpb3IgPSAhdGhpcy5iZWhhdmlvcjtcclxuICAgICAgICAgICAgdGhpcy5iZWhhdmlvciA9IGJlaGF2aW9yO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG59O1xyXG5cclxudmFyIFBhcnRpY2xlX1BhcmFtcyA9IFxyXG57XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIFwicGFyYW1zXCI6IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHRlbXBsYXRlOiAnPGRpdiBAa2V5dXAuMTM9XCJmaXJlXCI+XFxcclxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvcC1jb2x1bW5cIj5cXFxyXG4gICAgICAgICAgICBMaWZlIExlbmd0aDogPGJyLz5cXFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxpZmVfbGVuZ3RoXCIgdi1tb2RlbC5udW1iZXI9XCJwYXJhbXMubGlmZV9sZW5ndGhcIiB0eXBlPVwibnVtYmVyXCIgc3RlcD1cIjAuMVwiIC8+XFxcclxuICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9wLWNvbHVtblwiPlxcXHJcbiAgICAgICAgICAgIEVtaXQgcGVyIHNlY29uZCA8YnIvPlxcXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZW1pdF9wZXJfc2Vjb25kXCIgdi1tb2RlbC5udW1iZXI9XCJwYXJhbXMuZW1pdF9wZXJfc2Vjb25kXCIgdHlwZT1cIm51bWJlclwiIC8+XFxcclxuICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9wLWNvbHVtblwiPlxcXHJcbiAgICAgICAgICAgIE51bWJlciBvZiBwYXJ0aWNsZXM8YnIvPlxcXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiY291bnRcIiB2LW1vZGVsLm51bWJlcj1cInBhcmFtcy5jb3VudFwiIHR5cGU9XCJudW1iZXJcIiAvPlxcXHJcbiAgICAgICAgPC9kaXY+XFxcclxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvcC1jb2x1bW5cIj5cXFxyXG4gICAgICAgICAgICBQb2ludCBTaXplPGJyLz5cXFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInNpemVcIiB2LW1vZGVsLm51bWJlcj1cInBhcmFtcy5zaXplXCIgdHlwZT1cIm51bWJlclwiIHN0ZXA9XCIwLjFcIiAvPlxcXHJcbiAgICAgICAgPC9kaXY+XFxcclxuPC9kaXY+JyxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBmaXJlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LmZpcmUoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuICAgXHJcbnZhciBQYXJ0aWNsZXNfUHJvcHMgPSBcclxue1xyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICBcInBhcmFtc1wiOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgZGVmYXVsdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRlbXBsYXRlOiAnPGRpdj4gIDxwYXJ0aWNsZS1wYXJhbXMgOnBhcmFtcz1wYXJhbXMgLz5cXFxyXG4gICAgICAgIDxjb2xvci1waWNrZXIgOnZhbHVlPVwicGFyYW1zLmNvbG9yXCIgQGlucHV0PVwidXBkYXRlX2NvbG9yXCI+PC9jb2xvci1waWNrZXI+XFxcclxuICAgICAgICA8cD5CbGVuZGluZyBtb2RlPC9wPlxcXHJcbiAgICAgICAgICAgIDxibGVuZGluZy1tb2RlIDpibGVuZGluZz1wYXJhbXMuYmxlbmRpbmcgQGNoYW5nZT1cImJsZW5kaW5nX2NoYW5nZVwiPiA8L2JsZW5kaW5nLW1vZGU+XFxcclxuICAgICAgICA8cD5QcmVjb21wdXRlZCBhbHBoYSA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdi1tb2RlbD1cInBhcmFtcy5wcmVjb21wdXRlZF9hbHBoYVwiIEBjaGFuZ2U9XCJmaXJlXCIgaWQ9XCJwcmVfYWxwaGFcIj48L3A+XFxcclxuICAgICAgICA8YmVoYXZpb3IgOmFmZmVjdF9tZXRob2Q9cGFyYW1zLmFmZmVjdF9tZXRob2QgOmVtaXRfbWV0aG9kPXBhcmFtcy5lbWl0X21ldGhvZCAvPlxcXHJcbiAgICA8ZGl2PicsXHJcbiAgICBcclxuICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiZWhhdmlvcjogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgd2F0Y2g6IHtcclxuICAgICAgICBwYXJhbXM6IGZ1bmN0aW9uICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2hhbmdlIFwiLCB0aGlzLnBhcmFtcy5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBibGVuZGluZ19jaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5ibGVuZGluZyA9IGV2ZW50O1xyXG4gICAgICAgICAgICB0aGlzLmVtaXRfcGFyYW1fY2hhbmdlKFwiYmxlbmRpbmdcIiwgZXZlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW1pdF9wYXJhbV9jaGFuZ2U6IGZ1bmN0aW9uIChrZXksIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9e307XHJcbiAgICAgICAgICAgIHBhcmFtc1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGV2ZW50X2h1Yi4kZW1pdChcImNoYW5nZV9wYXJhbXNcIiwgdGhpcy5wYXJhbXMuaWQsIHBhcmFtcyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaXJlOiBmdW5jdGlvbiAoZXZlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAoZXZlbnQudGFyZ2V0LnR5cGUgPT09ICdjaGVja2JveCcpID8gZXZlbnQudGFyZ2V0LmNoZWNrZWQgOiBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdF9wYXJhbV9jaGFuZ2UoZXZlbnQudGFyZ2V0LmlkLCB2YWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICB1cGRhdGVfY29sb3I6IGZ1bmN0aW9uIChldmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGV2ZW50X2h1Yi4kZW1pdCgnY2hhbmdlX2NvbG9yJywgdGhpcy5wYXJhbXMuaWQsIGV2ZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgXHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50czoge1xyXG4gICAgICAgICdjb2xvci1waWNrZXInOiBDb2xvcl9QaWNrZXIsXHJcbiAgICAgICAgJ2JsZW5kaW5nLW1vZGUnOiBCbGVuZGluZ19TZWxlY3RvcixcclxuICAgICAgICAnYmVoYXZpb3InOiBCZWhhdmlvcixcclxuICAgICAgICAncGFydGljbGUtcGFyYW1zJzogUGFydGljbGVfUGFyYW1zLFxyXG4gICAgfSxcclxufTtcclxuXHJcbi8vVnVlLmNvbXBvbmVudChcIlBhcnRpY2xlc1Byb3BzXCIsIFBhcnRpY2xlc19Qcm9wcyk7XHJcblxyXG5cclxuZXhwb3J0IHtQYXJ0aWNsZXNfUHJvcHN9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ndWkvcGFydGljbGVzX3Byb3BzLmpzIiwiXHJcbnZhciBUZXh0dXJlX1BhbmVsID0gXHJcbntcclxuICAgIHRlbXBsYXRlOiBcclxuICAgICAgICAnPGRpdiBjbGFzcz1cInRleHR1cmUtcGFuZWxcIj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGlnaC10b29scy1wYW5lbFwiPlxcXHJcbiAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJ0ZXh0dXJlX3NlbGVjdFwiIHYtbW9kZWw9XCJzZWxlY3RlZFwiIHYtb246Y2hhbmdlPVwiY2hvb3NlX3RleHR1cmVcIj5cXFxyXG4gICAgICAgICAgICA8b3B0aW9uIHYtZm9yPVwib3B0aW9uIGluIHRleHR1cmVzXCIgdi1iaW5kOnZhbHVlPVwib3B0aW9uXCI+XFxcclxuICAgICAgICAgICAgICAgIHt7IG9wdGlvbiB9fVxcXHJcbiAgICAgICAgICAgIDwvb3B0aW9uPlxcXHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxcXHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHYtb246Y2xpY2s9XCJhcHBseVwiPmFwcGx5PC9idXR0b24+XFxcclxuICAgICAgICAgICAgPC9kaXY+XFxcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHR1cmUtY2FudmFzXCI+XFxcclxuICAgICAgICAgICAgPGNhbnZhcyBpZD1cInRleHR1cmUtY2FudmFzLW9ialwiIGNsYXNzPVwidGV4dHVyZS1jYW52YXNcIiByZWY9XCJjYW52YXNcIj5cXFxyXG4gICAgICAgICAgICA8L2NhbnZhcz5cXFxyXG4gICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dHVyZS1pbmZvXCI+XFxcclxuICAgICAgICAgICAgICAgIFRleHR1cmUgRm9ybWF0ICB7e2Zvcm1hdH19IDxiciAvPlxcXHJcbiAgICAgICAgICAgICAgICBUZXh0dXJlIFdpZHRoIHt7dGV4dHVyZV93aWR0aH19IEhlaWdodCB7e3RleHR1cmVfaGVpZ2h0fX1cXFxyXG4gICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJcIiAvPlxcXHJcbiAgICAgICAgPC9kaXY+JyxcclxuXHJcbiAgICAgICAgLy90ZXh0dXJlIGRpY3Rpb25hcmllcywgc2VsZWN0ZWQgdGV4dHVyZSwgb2JqZWN0IGlkLCB3aGljaCBzZWxlY3RlZCB0ZXh0dXJlXHJcbiAgICBwcm9wczogW1widGV4dHVyZXNcIiwgXCJzZWxlY3RlZFwiLCBcIm9iamVjdF9pZFwiXSxcclxuICAgIFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkX3RleHR1cmU6ICcnLFxyXG4gICAgICAgICAgICB0ZXh0dXJlX3dpZHRoIDogMCxcclxuICAgICAgICAgICAgdGV4dHVyZV9oZWlnaHQgOiAwLFxyXG4gICAgICAgICAgICBmb3JtYXQgOiAnJyxcclxuICAgICAgICAgICAgcGFuZWxfdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAnJyxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgc2hvd19wYW5lbDogZnVuY3Rpb24gKGV2ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbF92aXNpYmxlID0gIXRoaXMucGFuZWxfdmlzaWJsZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNob29zZV90ZXh0dXJlOiBmdW5jdGlvbihldmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRfdGV4dHVyZSA9IHRoaXMuc2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd190ZXh0dXJlKHRoaXMuc2VsZWN0ZWRfdGV4dHVyZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcHBseTogZnVuY3Rpb24gKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhcHBseSBvZiBcIiwgdGhpcy5vYmplY3RfaWQsIHRoaXMuc2VsZWN0ZWRfdGV4dHVyZSk7XHJcbiAgICAgICAgICAgIGV2ZW50X2h1Yi4kZW1pdChcInNlbGVjdF90ZXh0dXJlXCIsIHRoaXMub2JqZWN0X2lkLCB0aGlzLnNlbGVjdGVkX3RleHR1cmUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZHJhd190ZXh0dXJlOiBmdW5jdGlvbiAobmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgdGV4dHVyZSA9IGV2ZW50X2h1Yi5nZXRfdGV4dHVyZShuYW1lKTtcclxuICAgICAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiT2gsIEZ1Y2shIFRleHR1cmUgXCIgKyBuYW1lICsgXCIgbm90IGZvdW5kIVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZvcm1hdCA9IHRleHR1cmVfZm9ybWF0X3RvX3N0cmluZyh0ZXh0dXJlLmZvcm1hdCk7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IHRleHR1cmUuaW1hZ2U7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZV93aWR0aCA9IGltYWdlLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlX2hlaWdodCA9IGltYWdlLm5hdHVyYWxIZWlnaHQgfHwgaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IHRoaXMuJHJlZnNbXCJjYW52YXNcIl07XHJcbiAgICAgICAgICAgIG15X2RyYXdfaW1hZ2UoY2FudmFzLCBpbWFnZSwgMCwgMCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICBnZXRfdGV4dHVyZV9mcm9tX3BhcnRpY2xlczogZnVuY3Rpb24gKGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFpZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRfdGV4dHVyZSA9IGV2ZW50X2h1Yi5nZXRfdGV4dHVyZV9mcm9tX3BhcnRpY2xlcyhpZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd190ZXh0dXJlKHRoaXMuc2VsZWN0ZWRfdGV4dHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuZ2V0X3RleHR1cmVfZnJvbV9wYXJ0aWNsZXModGhpcy5vYmplY3RfaWQpO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKFwibW91bnQgb2YgdGV4dHVyZSBwYW5lbFwiLCB0aGlzLm9iamVjdF9pZCwgdGhpcy5zZWxlY3RlZF90ZXh0dXJlLCB0aGlzLnNlbGVjdGVkKTtcclxuICAgICAgLy9wcmludChcIjxoMz5IaSEgSSBtb3VudGVkIGFuZCBteSB0ZXh0dXJlIGlzIFwiICsgdGhpcy5zZWxlY3RlZF90ZXh0dXJlICsgXCIsXCIgKyB0aGlzLnNlbGVjdGVkICsgXCI8L2gzPlwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICAgIG9iamVjdF9pZDogZnVuY3Rpb24gKHZhbHVlKSB7IFxyXG4gICAgICAgICAgIHRoaXMuZ2V0X3RleHR1cmVfZnJvbV9wYXJ0aWNsZXModmFsdWUpO1xyXG4gICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgXHJcbiAgICBcclxufTtcclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCB7VGV4dHVyZV9QYW5lbH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2d1aS90ZXh0dXJlX3BhbmVsLmpzIiwiaW1wb3J0IHtQYXJ0aWNsZXNfUGFuZWx9IGZyb20gJy4vcGFydGljbGVzX3BhbmVsLmpzJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZV92dWVfYXBwKGlkKSB7XHJcblxyXG5cdHZhciBhcHAyID0gbmV3IFZ1ZSh7XHJcblx0XHRlbDogaWQsXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29tcG9uZW50czoge1xyXG4gICAgICAgICAgICAncGFydGljbGVzLXBhbmVsJzogUGFydGljbGVzX1BhbmVsLFxyXG4gICAgICAgIH0sXHJcblx0XHRkYXRhOiB7XHJcbiAgICAgICAgICAgIHBhcnRpY2xlczogW10sXHJcbiAgICAgICAgICAgIHRleHR1cmVzOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRlbXBsYXRlOiAnPGRpdiBpZD1cImFwcFwiPlxcXHJcbiAgICAgICAgICAgIDxwYXJ0aWNsZXMtcGFuZWwgOnBhcnRpY2xlcz1cInBhcnRpY2xlc1wiIDp0ZXh0dXJlcz1cInRleHR1cmVzXCI+PC9wYXJ0aWNsZXMtcGFuZWw+XFxcclxuICAgICAgICAgICAgPC9kaXY+JyxcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIGFwcDI7XHJcbn1cclxuXHJcbmV4cG9ydCB7Y3JlYXRlX3Z1ZV9hcHB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ndWkvdnVlYXBwLmpzIiwiZXhwb3J0IHtjcmVhdGVfdnVlX2FwcH0gZnJvbSAnLi9ndWkvdnVlYXBwLmpzJztcclxuZXhwb3J0IHtDb2xvcl9QaWNrZXJ9IGZyb20gJy4vZ3VpL2NvbG9yX3BpY2tlci5qcyc7XHJcbmV4cG9ydCB7VGV4dHVyZV9QYW5lbH0gZnJvbSAnLi9ndWkvdGV4dHVyZV9wYW5lbC5qcyc7XHJcbmV4cG9ydCB7UGFydGljbGVzX1Byb3BzfSBmcm9tICcuL2d1aS9wYXJ0aWNsZXNfcHJvcHMuanMnO1xyXG5leHBvcnQge1BhcnRpY2xlc19QYW5lbH0gZnJvbSAnLi9ndWkvcGFydGljbGVzX3BhbmVsLmpzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ3VpX21haW5fd2VicGFjay5qcyJdLCJzb3VyY2VSb290IjoiIn0=