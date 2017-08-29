import {My_Lib} from './my_lib.js';

//length - simple length of animations
//-1 - infinite
//0 - stop
//> 0 - length of animation, 
//if time > length, animation stop
//need rewrite this crap to safe floating point mannere
//and append more controle on animation 
    function Base_Animation ()
    {
        this.time = 0;
        this.time_scale = 1.0;
        this.type = "Base_Animation";
        this.uuid = _.generateUUID();
        this.length = -1;
        this.stopped = false;
    }
    
    Base_Animation.prototype.update = function (dt)
    {
        var scaled_dt = dt * this.time_scale;
        this.time += scaled_dt;
        if (this.length < 0 || this.time < this.length) {
            this.calc_animation(dt);
        }
    }
    
    Base_Animation.prototype.stop = function ()
    {
        this.stopped = true;
    }
    
    Base_Animation.prototype.start = function ()
    {
        this.stopped = false;
    }
    
    Base_Animation.prototype.reset = function ()
    {
        this.time = 0;
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
        data.time_scale = this.time_scale === undefined ? 1.0 : this.time_scale;
        data.length = this.length;
        return data;
    }
    
    Base_Animation.prototype.parse = function (param)
    {
        this.type = param.type;
        this.uuid = param.uuid;
        this.name = param.name ? param.name : '';
        this.time_scale = (param.time_scale === undefined) ? 1.0 : param.time_scale;
        this.length = param.length === undefined ? -1 : param.length;
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
}

Euler_Animation.prototype = Object.create(Base_Animation.prototype);


Euler_Animation.prototype.constructor = Euler_Animation;

Euler_Animation.prototype.calc_animation = function (dt)
{
    //console.log(this.xspeed,this.yspeed, this.zpeed, dt, this.time_scale);
    dt *= this.time_scale;
	this.x += this.xspeed * dt;
	this.y += this.yspeed * dt;
	this.z += this.zspeed * dt;
}
    
Euler_Animation.prototype.apply = function (obj)
{
    obj.rotation.set(this.x,this.y, this.z);
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


function Scale_Animation(x, y, z)
{
    Base_Animation.call(this);
    //speed of scale
    this.xscale = x;
    this.yscale = y;
    this.zscale = z;
    this.x = 1.0;
    this.y = 1.0;
    this.z = 1.0;
}

Scale_Animation.prototype = Object.create(Base_Animation.prototype);

_.copy_object(Scale_Animation.prototype, {
    constructor: Scale_Animation,
    calc_animation: function (dt) 
    {
        dt = dt * this.time_scale;
        this.x += this.xscale * dt;
        this.y += this.yscale * dt;
        this.z += this.zscale * dt;
    },
    apply:function (obj) {
        obj.scale.set(this.x, this.y, this.z);
    },
    reset: function () {
        if (this.first) {
        }
        this.x = 1.0;
        this.y = 1.0;
        this.z = 1.0;
        this.time = 0;
    }
});


My_Lib.Register_Class("Base_Animation", Base_Animation);
My_Lib.Register_Class("Euler_Animation", Euler_Animation);
My_Lib.Register_Class("Scale_Animation", Scale_Animation);


export { Base_Animation, Euler_Animation, Scale_Animation };
