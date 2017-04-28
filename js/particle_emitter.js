
//Base class for Particle Emitters
My_Lib.Particle_Emitter = function (emit_per_second)
{
	this.emit_delta = 0;
	this.emit_count = 0;
	this.emit_per_second = emit_per_second || 10;
	//linear interpolation = min + random * (max-min)	
	this.lifetime = {"min": 0, "max":1.0};
}

My_Lib.Particle_Emitter.prototype.emit_life = function ()
{
	return this.lifetime.min + Math.random() * (this.lifetime.max - this.lifetime.min);
}

My_Lib.Particle_Emitter.prototype.calc_emitted_particles = function (dt)
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

/*
need for bindings to scene objects
scene is optional, need when 'parent' is string
'root' must be scene graph contains the parent object
*/
My_Lib.Particle_Emitter.prototype.set_parent_object = function (parent, root)
{
	if (typeof parent === 'string') {
		if (root) {
			this.parent = root.getObjectByName(parent);
		}
	} else {
		this.parent = parent;
	}
}

My_Lib.Particle_Emitter.prototype.emit = function (p)
{
}


My_Lib.Particle_Emitter.prototype.toJSON = function (child)
{
	var params = {
		"emit_per_second": this.emit_per_second,
		"lifetime": {
			"min": this.lifetime.min,
			"max": this.lifetime.max
		},
	};
	if (this.parent) {
		if (typeof this.parent === 'string') {
			params.parent = this.parent;
		} else {
			params.parent = this.parent.name;
		}
	}
	if (child) {
		return params;
	}
	var data = {};
	data.name = "Particle_Emitter";
	data.params = params;	
	return data;
}

My_Lib.Particle_Emitter.prototype.parse = function (data)
{
	this.emit_per_second = data.emit_per_second;
	My_Lib.copy_object(this.lifetime, data.lifetime);
}

My_Lib.Register_Class("Particle_Emitter", My_Lib.Particle_Emitter);
