Point_Generators = {};


Point_Generators.Random_Direction = function ()
{
}

Point_Generators.Random_Direction.prototype.get_direction = function (vector)
{
	vector.x = Math.random(); 
	vector.y = Math.random(); 
	vector.z = Math.random();
}

Point_Generators.Sphere = function (radius)
{
	this.radius = radius;
}

Point_Generators.Sphere.prototype.get_inner_point = function (vector)
{
	var alpha = Math.random() * Math.PI * 2;
	var beta = Math.random() * Math.PI;
	vector.x = Math.cos(alpha) * Math.sin(beta);
	vector.y = Math.cos(beta);
	vector.z = Math.sin(alpha) * Math.sin(beta);
}

Point_Generators.Sphere.prototype.get_normal = function (vector)
{
	vector.x = Math.random() * 2 - 1;
	vector.y = Math.random() * 2 - 1;
	vector.z = Math.random() * 2 - 1;
	vector.normalize();
}

Point_Generators.Sphere.prototype.get_point = function (vector) 
{
	this.get_normal(vector);
	vector.multiplyScalar(this.radius);
}
