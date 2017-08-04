
My_Lib.Particle_System = function (params)
{
    this.uuid = _.generateUUID();    

    //restricted params
	if (!params.emitter) {
		params.emitter = new My_Lib.Particle_Emitter(1);
	}
	if (!params.affector) {
		params.affector = new My_Lib.Particle_Affector();
	}
    params.no_fade_color = !!params.no_fade_color;    
    params.particle_lifetime = params.particle_lifetime || 3.0;
    
	if (typeof params.pre_alpha === 'undefined') {
		params.pre_alpha = true;
	}
	
	if (typeof params.depth_test === 'undefined') {
		params.depth_test = true;
	}
	
	if (params["depth_write"] === undefined){
		params.depth_write = false;
	}

	if (!params.color) {
		params.color  = {"r":1, "g":1, "b":1};
	}
    
    if (!params.blending) {
        params.blending = "one_alpha";
    }

    params.size = params.size || 1;
    
    if (!params.count) params.count = 100;

    
	this.emitter = params.emitter;
	this.affector = params.affector;    
    this.name = params.name || '';
    this.particle_lifetime = params.particle_lifetime;
	this.params = params;

    
    this.texture = params.texture;
	
	this.dynamic_color = (!!params.end_color || !!params.random_color);


	var count = params.count;
	
	this.material = this.create_particle_material();
	this.node = new Particles_Points(this.create_particle_geometry(count), this.material);
    this.node.name = this.name;

    if (typeof this.params.bounding_sphere !== 'undefined') {
        this.node.boundingSphere.radius = params.bounding_sphere;
    }
}

My_Lib.Particle_System.prototype.set_name = function (name)
{
    this.name = name;
    this.node.name = name;
}

My_Lib.Particle_System.prototype.suicide = function ()
{
	this.node.parent.remove(this.node);
    My_Lib.event_hub.emit("kill_me", this);
}


My_Lib.Particle_System.prototype.create_particle_data = function (count)
{
    var particle_data = new Array(count);
    var p;
    for(var i =0;i < count; i++) {
		p = {};
		p.position = new THREE.Vector3(0,0,0);
		p.velocity = new THREE.Vector3(0,0,0);
		p.lifetime = 0;        
		particle_data[i] = p;
    }
    this.particle_data = particle_data;
}

My_Lib.Particle_System.prototype.create_particle_geometry = function(count)
{
    this.create_particle_data(count);
    
	var vertices = new Float32Array(count * 3); // position
	var colors = new Float32Array(count * 3);
	var params = new Float32Array(count);
	
    for (var i = 0; i < count; i++) {
		//create particle
		vertices[i*3] = 0;
		vertices[i*3+1] = 0;
		vertices[i*3+2] = 0;

		params[i] = 0.0;

		colors[i*3] = this.params.color.r;
		colors[i*3+1] = this.params.color.g;
		colors[i*3+2] = this.params.color.b;
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


My_Lib.Particle_System.prototype.generate_material_name = function ()
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

My_Lib.Particle_System.prototype.blending_mode = 
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

My_Lib.Particle_System.prototype.convert_blending_mode = function (blending)
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

My_Lib.Particle_System.prototype.set_texture = function (texture)
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


My_Lib.Particle_System.prototype.create_uniforms = function ()
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

My_Lib.Particle_System.prototype.calc_defines = function ()
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
    return defines;
}


My_Lib.Particle_System.prototype.select_texture = function (texture)
{
	if (typeof this.texture === 'string') {
		this.texture = My_Lib.Texture_Manager.get(this.texture);
        if (!this.texture) {
            console.error("Oh, not found texture " + this.params.texture + " in create particle material!");
        }
	}
}

My_Lib.Particle_System.prototype.create_particle_material = function()
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

My_Lib.Particle_System.prototype.recreate_material = function ()
{
    this.node.material = this.material = this.create_particle_material();
}


My_Lib.Particle_System.prototype.set_pre_alpha = function (pre_alpha)
{
    if (this.params.pre_alpha !== !!pre_alpha) {
        this.params.pre_alpha = pre_alpha;
        this.recreate_material();
    }
}

My_Lib.Particle_System.prototype.set_point_size = function (size)
{
    if (this.params.size != size) {
        this.params.size = size;
        this.node.material.uniforms["point_size"].value = size;
    }
}

My_Lib.Particle_System.prototype.set_blending = function (blending)
{
    this.params.blending = blending;
    var b = this.convert_blending_mode(blending);
    this.material.blending = b.blending;
    this.material.blendSrc = b.factors.blendSrc;
    this.material.blendDst = b.factors.blendDst;
}



My_Lib.Particle_System.prototype.emit_particles = function (dt, need_emit)
{
	//emit particles
	var p;
	var verts = this.geometry.vertices.array;
	var params = this.geometry.params.array;
	//var colors = this.geometry.colors.array;
	//var dummy_color = new THREE.Color(1,1,1);
	
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
}

My_Lib.Particle_System.prototype.update_particle_geometry = function (dt)
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

	var need_emit = this.emitter.calc_emitted_particles(dt);
	this.emit_particles(dt, need_emit);
	
	this.geometry.vertices.needsUpdate = true;
	this.geometry.params.needsUpdate = true;
	this.geometry.colors.needsUpdate = true;
}


My_Lib.Particle_System.prototype.update = function (dt)
{
	this.update_particle_geometry(dt);
}


My_Lib.Particle_System.prototype.toJSON = function ()
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


My_Lib.Particle_System.prototype.set_emitter = function (emitter)
{
    this.emitter = this.params.emitter = emitter;
}

My_Lib.Particle_System.prototype.set_particle_life_length = function (val)
{
	if (val !== this.params.particle_lifetime) {
		this.params.particle_lifetime = this.particle_lifetime = val;
		this.material.uniforms['lifetime'].value = val;
	}
}

My_Lib.Particle_System.prototype.set_emission_per_second = function (val)
{
	this.emitter.emit_per_second = val;
}

My_Lib.Particle_System.prototype.set_particle_count = function (count)
{
	if (count !== this.particle_data.length) {
		this.params.count = count;
		this.node.geometry = this.create_particle_geometry(count);
	}
}

My_Lib.Particle_System.prototype.set_color = function (color)
{
    this.params.color.r = color.r;
    this.params.color.g = color.g;
    this.params.color.b = color.b;
}

My_Lib.Particle_System.prototype.set_bounding_sphere_radius = function (radius)
{
    this.node.boundingSphere.radius = radius;
}

