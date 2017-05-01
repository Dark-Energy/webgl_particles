//base class for particle affector
My_Lib.Particle_Affector = function ()
{

}


My_Lib.Particle_Affector.prototype.affect = function (dt, pdata, vert, color)
{
	return true;
}

My_Lib.Particle_Affector.prototype.toJSON = function (child)
{
	if (child) {
		return {};
	}
	var data = {
		"name": "Particle_Affector",
		params : {}
	};
	return data;
}

My_Lib.Particle_Affector.prototype.parse = function (json)
{
}

My_Lib.Force_Affector = function ()
{
	this.forces = new Array();
}

My_Lib.Force_Affector.prototype = Object.create(My_Lib.Particle_Affector.prototype);

My_Lib.copy_object(My_Lib.Force_Affector.prototype, {
	constructor: My_Lib.Force_Affector,
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
		data.params = My_Lib.Particle_Affector.prototype.toJSON.call(this, this);
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

My_Lib.Register_Class("Force_Affector", My_Lib.Force_Affector);