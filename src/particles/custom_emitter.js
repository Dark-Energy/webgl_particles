import {My_Lib} from '../base/my_lib.js';
import {Particle_Emitter} from './particle_emitter.js';


function Custom_Emitter()
{
	Particle_Emitter.apply(this, arguments);
}


Custom_Emitter.prototype = Object.create(Particle_Emitter.prototype);

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
        data.params = My_Lib.Particle_Emitter.prototype.toJSON.call(this, this);
        if (this.source_code) {
            data.params.source_code = this.source_code;
        }
        return data;
    },
    parse: function (data) {
        My_Lib.Particle_Emitter.prototype.parse.call(this, data);        
        this.set_emit_function (data.source_code);
    },
    constructor: Custom_Emitter,
};

_.copy_object(Custom_Emitter.prototype, methods);
My_Lib.Register_Class("Custom_Emitter", Custom_Emitter);


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

export {Custom_Emitter};