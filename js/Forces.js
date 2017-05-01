Particle_Forces = {};

//base class
Particle_Forces.Force = function ()
{
}


My_Lib.copy_object(Particle_Forces.Force.prototype,{
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
My_Lib.copy_object(Particle_Forces.Constant_Force.prototype, {
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
		data.force = My_Lib.create_clone_object(this.force);
		return data;
	},
	parse: function (json)
	{	
		if (json.force) {
			My_Lib.copy_object(this.force, json.force);
		}
	}
});

My_Lib.Register_Class("Constant_Force", Particle_Forces.Constant_Force);