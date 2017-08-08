import {My_Lib} from '../base/my_lib.js';

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

My_Lib.Register_Class("Particle_Affector", Particle_Affector);

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
				f = My_Lib.Get_Class(item.name);
				if (f) {
					f = new f();
					f.parse(item);
					this.add_force(f);
				} 
			}
		}
	}
});

My_Lib.Register_Class("Force_Affector", Force_Affector);

export { Particle_Affector, Force_Affector };