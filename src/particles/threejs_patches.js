	//FIX
	THREE.Vector3.prototype.applyMatrix4_rotation = function ( m ) 
	{
		// input: THREE.Matrix4 affine matrix

		var x = this.x, y = this.y, z = this.z;
		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		return this;
 	}


    function Base_Animation ()
    {
        this.time = 0;
        this.time_scale = 1.0;
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
        if (this.name !== '') {
            data.name = this.name;
        }
        data.time_scale = this.time_scale;
        return data;
    }
    
    THREE.Object3D.prototype.update = function (dt)
    {
        if (!this.animations) {
            return;
        }
        for(var i =0; i < this.animations.length; i++) {
            var anim = this.animations[i];
            anim.update(dt);
            anim.apply(this);
        }
    }
    
    THREE.Object3D.prototype.add_animation = function (anim)
    {
        if (!this.animations) {
            this.animations = [];
        }
        if (this.animations.indexOf(anim) < 0) {
            this.animations.push(anim);
        }
    }
    
    THREE.Object3D.prototype.remove_animation = function (anim)
    {
        if (this.animations) {
            var i = this.animations.indexOf(anim);
            if (i > -1) {
                this.animations.splice(i, 1);
            }
        }
    }

    /*
    THREE.Scene.prototype.old_toJSON = THREE.Scene.prototype.toJSON;
    THREE.Scene.prototype.toJSON = function (meta) 
    {
        return null;
    }*/

    
    THREE.Object3D.prototype.collect_animations = function (root)
    {
        var animations = [];
        function collect_animations_recursive(root)
        {
            if (root.animations) {
                for(var i =0; i < root.animations.length; i++) {
                    animations.push( root.animations[i].toJSON() );
                }
            }
            
            if (root.children) {
                for(var i = 0; i < root.children.length; i++) {
                    collect_animations_recursive( root.children[i] );
                }
            }
        }
        collect_animations_recursive(root);
        return animations;
    }
    
    THREE.Object3D.prototype.old_toJSON = THREE.Object3D.prototype.toJSON;
    THREE.Object3D.prototype.toJSON = function meta(meta)
    {
        this.updateMatrixWorld(true);
        var isRootObject = ( meta === undefined || meta === '' );
        var output = this.old_toJSON(meta)
        if (isRootObject) {
            var anims = this.collect_animations(this);
            if (anims.length > 0) {
                output["myanimations"] = anims;
            }
        }
        return output;
    }
    
    THREE.Scene.prototype.update = function (dt)
    {
        function update_recursive(root)
        {
            for(var i = 0; i < root.children.length; i++) {
                var obj = root.children[i];
                if (obj.update) {
                    obj.update(dt);
                }
                update_recursive(obj);
            }
        }
        update_recursive(this);
    }
 

THREE.ObjectLoader.prototype.old_parse =  THREE.ObjectLoader.prototype.parse;
THREE.ObjectLoader.prototype.parse = function (json, onload)
{   
    function my_onload(object)
    {
        console.log(t);            
        if (onload) {
            onload(object);
        }
    }
    var t =  this.old_parse(json, my_onload);
    return t;
}


    
Euler_Animation = function (x, y, z)
{
    Base_Animation.call(this);
	this.xspeed = x * Math.PI / 180;
	this.yspeed = y * Math.PI / 180;
	this.zspeed = z * Math.PI / 180;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.name = '';
    this.uuid = _.generateUUID();
}

Euler_Animation.prototype = Object.create(Base_Animation.prototype);

Euler_Animation.prototype.constructor = Euler_Animation;

Euler_Animation.prototype.calc_animation = function (dt)
{
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