import {My_Lib} from './my_lib.js';

    function Base_Animation ()
    {
        this.time = 0;
        this.time_scale = 1.0;
        this.type = "Base_Animation";        
    }
    
    Base_Animation.prototype.update = function (dt)
    {
        var scaled_dt = dt * this.time_scale;
        this.time += scaled_dt;
        this.calc_animation(dt);
    }
    
    Base_Animation.prototype.calc_animation = function (dt)
    {
        
    }
    
    Base_Animation.prototype.apply = function(obj)
    {
    }
    
    Base_Animation.prototype.toJSON = function (data)
    {
        var data = {};
        data.uuid = this.uuid;
        data.type = this.type;
        if (this.name !== '') {
            data.name = this.name;
        }
        data.time_scale = this.time_scale;
        return data;
    }
    
    Base_Animation.prototype.parse = function (param)
    {
        this.type = param.type;
        this.uuid = param.uuid;
        this.name = param.name ? param.name : '';
        this.time_scale = (param.time_scale === undefined) ? 1.0 : param.time_scale;
    }
    

    
    
        
function Euler_Animation (x, y, z)
{
    Base_Animation.call(this);
    this.type = "Euler_Animation";
	this.xspeed = x;
	this.yspeed = y;
	this.zspeed = z;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.name = '';
    this.uuid = _.generateUUID();
}

Euler_Animation.prototype = Object.create(Base_Animation.prototype);

My_Lib.Register_Class("Base_Animation", Base_Animation);
My_Lib.Register_Class("Euler_Animation", Euler_Animation);

Euler_Animation.prototype.constructor = Euler_Animation;

Euler_Animation.prototype.calc_animation = function (dt)
{
    dt *= this.time_scale;
	this.x += this.xspeed * dt;
	this.y += this.yspeed * dt;
	this.z += this.zspeed * dt;
}
    
Euler_Animation.prototype.apply = function (obj)
{
    obj.rotation.x = this.x;
    obj.rotation.y = this.y;
    obj.rotation.z = this.z;
}

Euler_Animation.prototype.toJSON = function (json)
{
   var data = Base_Animation.prototype.toJSON.call(this);
   data.xspeed = this.xspeed;
   data.yspeed = this.yspeed;
   data.zspeed = this.zspeed;
   return data;
}

Euler_Animation.prototype.parse = function (param)
{
    Base_Animation.prototype.parse.call(this, param);
    this.xspeed = param.xspeed;
    this.yspeed = param.yspeed;
    this.zspeed = param.zspeed;
    this.x = this.y = this.z = 0;    
}

export { Base_Animation, Euler_Animation };