import {My_Lib} from '../base/my_lib.js';
import {Particle_Emitter} from './particle_emitter.js';
import {Particle_Affector} from './particle_affector.js';
import {Particles_Points} from './particles_points.js';
import {Particle_Shaders} from './particle_shaders.js';
import {Color_Domain} from './color_domain.js';


function Particle_System(data)
{
    this.uuid = _.generateUUID();    
    
    this.params = this.config_params(data);

  
	this.emitter = this.params.emitter;
	this.affector = this.params.affector;    
    this.particle_lifetime = this.params.particle_lifetime;
    this.texture = this.params.texture;
	
	this.dynamic_color = false;

	var count = this.params.count;
	
	this.material = this.create_particle_material();
	this.node = new Particles_Points(this.create_particle_geometry(count), this.material);
    this.node.name = this.name;
    this.node.boundingSphere.radius = this.params.bounding_radius;
    this.node.non_collideble = this.params.non_collideble;
    
}


Particle_System.prototype.config_params = function (data)
{
    var params = 
    {
    };
    //default
    params.particle_lifetime = 3.0;
    params.no_fade_color = false;
    params.pre_alpha = true;
    params.depth_test = true;
    params.depth_write = false;
    params.color  = {"r":1, "g":1, "b":1};
	params.blending = "one_alpha";
    params.size = 1;
    params.count = 100;
    params.name = '';
    params.bounding_radius = 2.0;
    params.discrete_emission = false;
    params.apply_world_matrix_on_emit = true;
    params.non_collideble = false;
    
    for(var key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)){
            if (data[key] !== undefined) {
                params[key] = data[key];
            }
        }
    }
    
	params.emitter = data.emitter || new Particle_Emitter(1);
	params.affector = data.affector || new Particle_Affector();
    
    return params;
}

Particle_System.prototype.set_name = function (name)
{
    this.name = name;
    this.node.name = name;
}

Particle_System.prototype.suicide = function ()
{
	this.node.parent.remove(this.node);
    main_event_hub.emit("kill_me", this);
}


Particle_System.prototype.create_particle_data = function (count)
{
    var particle_data = new Array(count);
    var p;
    //var matrix = this.node.worldMatrix();
    for(var i =0;i < count; i++) {
		p = {};
		p.position = new THREE.Vector3(0,0,0);
		p.velocity = new THREE.Vector3(0,0,0);
        
        //p.position.copy(this.node.position);
        //p.position.applyMatrix4(matrix);
        //p.velocity.applyMatrix4_rotation(matrix);
        
		p.lifetime = 0;        
		particle_data[i] = p;
    }
    this.particle_data = particle_data;
}

Particle_System.prototype.create_particle_geometry = function(count)
{
    this.create_particle_data(count);
    
	var vertices = new Float32Array(count * 3); // position
	var colors = new Float32Array(count * 3);
	var params = new Float32Array(count);
	
    var particle;
    for (var i = 0; i < count; i++) {
        particle = this.particle_data[i];
		//create particle
		vertices[i*3] = particle.position.x;
		vertices[i*3+1] = particle.position.y;
		vertices[i*3+2] = particle.position.z;

		params[i] = 0.0;
        
        if (this.params.color_domain) {
            this.params.color_domain.fill(colors, i*3);
        } else {
            colors[i*3] = this.params.color.r;
            colors[i*3+1] = this.params.color.g;
            colors[i*3+2] = this.params.color.b;
       }
	}

	this.geometry = {};
	this.geometry.vertices = new THREE.BufferAttribute(vertices, 3).setDynamic(true);
	this.geometry.colors = new THREE.BufferAttribute(colors, 3)
	if (this.dynamic_color) {
		this.geometry.colors.setDynamic(true);
	}
	this.geometry.params = new THREE.BufferAttribute(params, 1).setDynamic(true);
	var geom = new THREE.BufferGeometry(); 	
	this.geometry.buffer = geom;	
	geom.addAttribute('position', this.geometry.vertices);
	geom.addAttribute('color', this.geometry.colors);
	geom.addAttribute('params', this.geometry.params);	

    return geom;
}


Particle_System.prototype.discrete_emit = function (count)
{
    this.emit_particles(0, count);
	this.geometry.vertices.needsUpdate = true;
	this.geometry.params.needsUpdate = true;
	this.geometry.colors.needsUpdate = true;
}


Particle_System.prototype.emit_particles = function (dt, need_emit)
{
	//emit particles
	var p;
	var verts = this.geometry.vertices.array;
	var params = this.geometry.params.array;
	
    var old_need_emit = need_emit;
    this.node.updateMatrixWorld(true);
    var matrix = this.node.matrixWorld;
	for(var i =0; i < this.particle_data.length && need_emit > 0; i++) {
		if (!(params[i] > 0)) {
        
			p = this.particle_data[i];
			this.emitter.emit(p, null, matrix);
			p.lifetime = this.particle_lifetime;
            
			verts[i*3] = p.position.x;
			verts[i*3+1] = p.position.y;
			verts[i*3+2] = p.position.z;
			params[i] = p.lifetime;
			need_emit--;
			//colors[i*3] = this.params.color.r
			//colors[i*3+1] = this.params.color.g;
			//colors[i*3+2] = this.params.color.b;
		}
	}
    //console.log("created new particles ", old_need_emit - need_emit);
}

Particle_System.prototype.update_particle_geometry = function (dt)
{
	var verts = this.geometry.vertices.array;
	var params = this.geometry.params.array;
	var p;
	var vert = new THREE.Vector3(0,0,0);
	var dummy_color = {"r":1, "b":1, "g":1};
	for(var i = 0; i < this.particle_data.length; i++) {
	
		if (params[i] > 0) {
			p = this.particle_data[i];
			
			//integrate
			p.position.x += p.velocity.x * dt;
			p.position.y += p.velocity.y * dt;
			p.position.z += p.velocity.z * dt;
			p.lifetime -= dt;
			
			if (p.lifetime <= 0 || !this.affector.affect(dt, p, vert, dummy_color)) {
				p.lifetime = 0;
			}
			params[i] = p.lifetime;			
			verts[i*3] = p.position.x;
			verts[i*3+1] = p.position.y;
			verts[i*3+2] = p.position.z;
		}
	}

    if (!this.params.discrete_emission) {
        var need_emit = this.emitter.calc_emitted_particles(dt);
        this.emit_particles(dt, need_emit);
    }
	
	this.geometry.vertices.needsUpdate = true;
	this.geometry.params.needsUpdate = true;
	this.geometry.colors.needsUpdate = true;
}




Particle_System.prototype.update = function (dt)
{
	this.update_particle_geometry(dt);
}


Particle_System.prototype.generate_material_name = function ()
{
	var my_name = "MY_PARTICLE_MATERIAL";
	if (!!this.texture) {
		my_name +=  "_WITH_TEXTURE";
	}
	if (this.params.no_fade_color) {
		my_name += "_NO_FADE_COLOR";
	}
	return my_name;
}

Particle_System.prototype.blending_mode = 
{
	"additive": {
		"blendSrc": THREE.OneFactor,
		"blendDst": THREE.OneFactor
	},
	"alpha": {
		"blendSrc": THREE.SrcAlphaFactor,
		"blendDst": THREE.OneMinusSrcAlphaFactor
	},
	"one_alpha": {
		"blendSrc": THREE.OneFactor,
		"blendDst": THREE.OneMinusSrcAlphaFactor
	},
	"alpha_one": {
		"blendSrc": THREE.SrcAlphaFactor,
		"blendDst": THREE.OneFactor
	}
};

Particle_System.prototype.convert_blending_mode = function (blending)
{
    var three_blending;
	var factors = this.blending_mode["one_alpha"];
    if (blending === 'no') {
        three_blending = THREE.NoBlending;
    } else {
        three_blending = THREE.CustomBlending;    
        if (this.blending_mode[blending]) {
            factors = this.blending_mode[blending];
        }
    }
    return {"blending": three_blending, "factors":factors};
}

Particle_System.prototype.set_texture = function (texture)
{
	if (typeof texture === 'string') {
        if (this.params.texture === texture) {
            return;
        }
        this.params.texture = texture;
		this.texture = My_Lib.Texture_Manager.get(texture);
	} else {
        console.error("Oh Shit! texture in set_texture is not string! it's object or undefined!", texture);
    }

    if (this.material.uniforms.sprite) {
        this.material.uniforms.sprite.value = this.texture;
    } else {
        //this.material.uniforms.sprite = {value: texture};
        this.recreate_material();
        console.error("Oh Shit! Our shader has not texture! Need create shader with texture!");
    }
}


Particle_System.prototype.create_uniforms = function ()
{
    var uniforms = 
    {
        "lifetime": {
            value: this.particle_lifetime
        },
        "point_size": {
            value: this.params.size
        },
        "screen_size": {
            value: new THREE.Vector2(My_Lib.Viewport.width, My_Lib.Viewport.height)
        }
    };
    if (!!this.texture) {
        uniforms["sprite"] = {
            value: this.texture
        }
    };
    if (!this.dynamic_color) {
        uniforms["particle_color"] = {value: this.params.color};
    }
    return uniforms;
}

Particle_System.prototype.calc_defines = function ()
{
    var defines = {};
    if (this.params.pre_alpha) {
        defines["PRE_ALPHA"] = true;
    }
	if (!!this.texture) {
        defines["PARTICLE_TEXTURE"] = true;
    }
    if (this.params.no_fade_color) {
        defines["NO_FADE_COLOR"] = true;
    }
    if (this.params.color_domain) {
        defines["DYNAMIC_COLORS"] = true;
    }
    return defines;
}


Particle_System.prototype.select_texture = function (texture)
{
	if (typeof this.texture === 'string') {
		this.texture = My_Lib.Texture_Manager.get(this.texture);
        if (!this.texture) {
            console.error("Oh, not found texture <" + this.params.texture + "> in create particle material! Instead get "+this.texture);
        }
	}
}

Particle_System.prototype.create_particle_material = function()
{
	
    this.select_texture(this.texture);
    
    var blend_obj = this.convert_blending_mode(this.params.blending);
    
    
    var uniforms = this.create_uniforms();
    var defines = this.calc_defines();
    
	var mat = new THREE.ShaderMaterial({
		transparent: true,
		depthWrite: this.params.depth_write,
		depthTest: this.params.depth_test,
        blending: blend_obj.blending,
        blendSrc: blend_obj.factors.blendSrc,
        blendDst: blend_obj.factors.blendDst,
		defines: defines,
		uniforms: uniforms,
		vertexShader: Particle_Shaders.vertex,
		fragmentShader: Particle_Shaders.fragment
	});
	return mat;
}

Particle_System.prototype.recreate_material = function ()
{
    this.node.material = this.material = this.create_particle_material();
}


Particle_System.prototype.set_pre_alpha = function (pre_alpha)
{
    if (this.params.pre_alpha !== !!pre_alpha) {
        this.params.pre_alpha = pre_alpha;
        this.recreate_material();
    }
}

Particle_System.prototype.set_point_size = function (size)
{
    if (this.params.size != size) {
        this.params.size = size;
        this.node.material.uniforms["point_size"].value = size;
    }
}

Particle_System.prototype.set_blending = function (blending)
{
    this.params.blending = blending;
    var b = this.convert_blending_mode(blending);
    this.material.blending = b.blending;
    this.material.blendSrc = b.factors.blendSrc;
    this.material.blendDst = b.factors.blendDst;
}




Particle_System.prototype.toJSON = function ()
{
	var data = {};
    data.uuid = this.uuid;
    data.node = this.node.uuid;
    if (this.name || this.node.name) {
        data.name = this.name || this.node.name;
    }
	data.params = {};
	if (this.params) {
		_.copy_object(data.params, this.params);
	}
	data.params.emitter = this.emitter.toJSON();
	data.params.affector = this.affector.toJSON();
	return data;
}


Particle_System.prototype.set_emitter = function (emitter)
{
    this.emitter = this.params.emitter = emitter;
}

Particle_System.prototype.set_particle_life_length = function (val)
{
	if (val !== this.params.particle_lifetime) {
		this.params.particle_lifetime = this.particle_lifetime = val;
		this.material.uniforms['lifetime'].value = val;
	}
}

Particle_System.prototype.set_emission_per_second = function (val)
{
	this.emitter.emit_per_second = val;
}

Particle_System.prototype.set_particle_count = function (count)
{
	if (count !== this.particle_data.length) {
		this.params.count = count;
		this.node.geometry = this.create_particle_geometry(count);
	}
}

Particle_System.prototype.set_color = function (color)
{
    this.params.color.r = color.r;
    this.params.color.g = color.g;
    this.params.color.b = color.b;
}

Particle_System.prototype.set_bounding_sphere_radius = function (radius)
{
    this.node.boundingSphere.radius = radius;
}

export {Particle_System};