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