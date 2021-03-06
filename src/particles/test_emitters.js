import {My_Lib} from '../base/my_lib.js';
import {Point_Generators} from './point_generators.js';
import {Particle_Emitter} from './particle_emitter.js';
import {Particle_Affector} from './particle_affector.js';

function  Cone_Emitter()
{
	Particle_Emitter.apply(this, arguments);
	this.generator = new Point_Generators.Random_Direction();
	this.origin = new THREE.Vector3(1, 1, 0);
	this.velocity = new THREE.Vector3(0, 1, 0);
	this.dispersion = {"min": 5, "max": 10};
	this.dispersion.delta = 5;
	this.speed = {min: 5, max: 10, delta:5};
	this.color = new THREE.Color(1, 1, 1);
}

Cone_Emitter.prototype = Object.create(Particle_Emitter.prototype);
Cone_Emitter.prototype.constructor = Cone_Emitter;
My_Lib.Register_Class("Cone_Emitter", Cone_Emitter);

Cone_Emitter.prototype.toJSON = function ()
{
	var data = {};
	data.name = "Cone_Emitter";
	data.params = Particle_Emitter.prototype.toJSON.call(this, this);
	_.clone_field_list_one_level_recursion(this, data.params, 
	["origin", 
	"velocity", 
	"dispersion",
	"speed"]);
	
	return data;
}

Cone_Emitter.prototype.parse = function (data)
{
	Particle_Emitter.prototype.parse.call(this, data);
	this.origin.copy(data.origin);
	this.velocity.copy(data.velocity);
	this.set_dispersion(data.dispersion.min, data.dispersion.max);
	this.set_speed(data.speed.min, data.speed.max);
}

Cone_Emitter.prototype.set_speed = function (min, max)
{
	this.speed.min = min;
	this.speed.max = max;
	this.speed.delta = max - min;
}


Cone_Emitter.prototype.set_dispersion = function (min, max)
{
	this.dispersion.min = min;
	this.dispersion.max = max;
	this.dispersion.delta = max - min;
}




Cone_Emitter.prototype.emit = function (p, color, matrix)
{
	p.position.copy(this.origin);
	
	this.generator.get_direction(p.velocity);
	p.velocity.multiplyScalar(Math.random()*this.dispersion.delta + this.dispersion.min);	
	p.velocity.add(this.velocity).normalize();
	
    if (matrix) {
        p.position.applyMatrix4(matrix);
        p.velocity.applyMatrix4_rotation(matrix);
    }
        
	p.velocity.multiplyScalar(Math.random()*this.speed.delta + this.speed.min);	
	
    
	if (color) {
		this.emit_color(color);
	}
    
}

Cone_Emitter.prototype.emit_color = function (color) 
{
	color.copy(this.color);
}

function Sphere_Emitter(radius, speed)
{
	Particle_Emitter.call(this);
	this.radius = radius || 1;
    this.speed = speed || 1;
	this.generator = new Point_Generators.Sphere(radius);
    this.from_center = true;
    Object.defineProperty(this, 'radius', {
        configurable: true,
        enumerable: true,
        set: function (value) { radius = value; generator.radius = value;}
    });
}

Sphere_Emitter.prototype = Object.create(Particle_Emitter.prototype);

_.copy_object(Sphere_Emitter.prototype, {
    constructor: Sphere_Emitter,
    emit: function (p, color, matrix)
    {
        if (this.from_center) {
            p.position.set(0,0,0);
        } else {
            this.generator.get_point(p.position);
        }
        this.generator.get_normal(p.velocity);
        if (matrix) {
            p.position.applyMatrix4(matrix);
            p.velocity.applyMatrix4_rotation(matrix);
        }
        p.velocity.multiplyScalar(this.speed);
    },
    toJSON: function (json) {
		var params = Particle_Emitter.prototype.toJSON.call(this, this);
        params.radius = this.radius;
        params.speed = this.speed;
        //params.generator.radius = this.radius;
    },
    parse: function (json) {
		Particle_Emitter.prototype.parse.call(this, json);
        this.radius = json.radius;
        this.speed = json.speed;
    }
});

My_Lib.Register_Class("Sphere_Emitter", Sphere_Emitter);


function Star_Dust_Emitter ()
{
	Particle_Emitter.apply(this, arguments);
	this.start_position = new THREE.Vector3(0, 0, 0);
	this.end_position = new THREE.Vector3(1, 1, 1);
	this.delta = new THREE.Vector3(1, 1, 1);	
	this.velocity = new THREE.Vector3(0, 0, 1);
}

Star_Dust_Emitter.prototype = Object.create(Particle_Emitter.prototype);
Star_Dust_Emitter.prototype.constructor = Star_Dust_Emitter;
_.copy_object( Star_Dust_Emitter.prototype,{
	set_velocity: function (x,y, z) 
	{
		this.velocity.set(x, y, z);
	},
	set_position_range : function (start, end)
	{
		this.start_position.copy(start);
		this.end_position.copy(end);
		this.delta.set(end.x - start.x, end.y-start.y, end.z-start.z);
		
	},
	get_position: function (vector)
	{
		vector.x = Math.random() * this.delta.x + this.start_position.x;
		vector.y = Math.random() * this.delta.y + this.start_position.y;
		vector.z = Math.random() * this.delta.z + this.start_position.z;
	},
	get_velocity: function (vector)
	{
		vector.x = this.velocity.x;
		vector.y = this.velocity.y;
		vector.z = this.velocity.z;
	},
	emit: function (p)
	{
		this.get_position(p.position);
		if (this.parent) {
			this.parent.localToWorld(p.position);
		}
		this.get_velocity(p.velocity);
	},
	toJSON: function ()
	{
		var params = Particle_Emitter.prototype.toJSON.call(this, this);
		_.clone_field_list_one_level_recursion(this, params, ["velocity", 
		"start_position",
		"end_position"])
		var data = {
			"name": "Star_Dust_Emitter",
			"params": params,
		};
		return data;
	},
	parse: function (json)
	{
		Particle_Emitter.prototype.parse.call(this, json);
		this.set_position_range(json.start_position, json.end_position);
		this.velocity.copy(json.velocity);
	}
	
});

My_Lib.Register_Class("Star_Dust_Emitter", Star_Dust_Emitter);


function Star_Dust_Affector (end)
{
	this.end = end || 0;
}


Star_Dust_Affector.prototype = Object.create(Particle_Affector.prototype);
Star_Dust_Affector.prototype.constructor = Star_Dust_Affector;

_.copy_object(Star_Dust_Affector.prototype,{
	affect: function (dt, pdata, vert)
	{
		if (pdata.position.z > this.end) {
			return false;
		}
		return true;
	},
	toJSON: function ()
	{
		var params = Particle_Affector.prototype.toJSON.call(this, this);
		params["end"] = this.end;
		var data = {
			"name": "Star_Dust_Affector",
			"params": params,

		};
		return data;
	},
	parse: function (json)
	{
		Particle_Affector.prototype.parse(this, json);
		this.end = json.end;
	}
});

My_Lib.Register_Class("Star_Dust_Affector", Star_Dust_Affector);

export {Cone_Emitter, Star_Dust_Emitter, Sphere_Emitter, Star_Dust_Affector};