import {My_Lib} from '../base/my_lib.js';

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

My_Lib.Register_Class("Particle_Emitter", Particle_Emitter);

export { Particle_Emitter };
