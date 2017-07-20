
My_Lib.Particle_System = function (params)
{
    
	this.emitter = params.emitter;
	if (!this.emitter) {
		this.emitter = new My_Lib.Particle_Emitter(1);
	}
	this.affector = params.affector;
	if (!this.affector) {
		this.affector = new My_Lib.Particle_Affector();
	}
    

	this.particle_lifetime = params.particle_lifetime || 3.0;
	
	this.params = params;
	this.texture = params.texture;
	this.no_fade_color = params.no_fade_color = !!params.no_fade_color;
    
    
	if (typeof this.params.pre_alpha === 'undefined'){
		this.params.pre_alpha = true;
	}
	
	if (typeof this.params.depth_test === 'undefined'){
		this.params.depth_test = true;
	}
	
	if (typeof this.params.depth_write === 'undefined'){
		this.params.depth_write = false;
	}
    
	
	if (!params.color) {
		params.color  = {"r":1, "g":1, "b":1};
	}
    
    if (!params.blending) {
        params.blending = "one_alpha";
    }
	
	this.dynamic_color = (params.end_color || params.random_color);

    params.size = params.size || 1;
	var count = params.count || 100;
	
	this.material = this.create_particle_material();
	this.node = new THREE.Points(this.create_particle_geometry(count), this.material);
    
}



My_Lib.Particle_System.prototype.suicide = function ()
{
	this.node.parent.remove(this.node);
    My_Lib.event_hub.emit("kill_me", this);
}


My_Lib.Particle_System.prototype.create = function (count, size)
{
}


My_Lib.Particle_System.prototype.create_particle_geometry = function(count)
{
	this.particle_data = new Array(count);
	var vertices = new Float32Array(count * 3); // position
	var colors = new Float32Array(count * 3);
	var params = new Float32Array(count);
	
	
	var p;
	for (var i = 0; i < count; i++) {
		//create particle
		p = {};
		p.position = new THREE.Vector3(0,0,0);
		p.velocity = new THREE.Vector3(0,0,0);
		this.particle_data[i] = p;
		p.lifetime = 0;

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

	//this.emit_particles(0, this.emitter.emit_per_second);
	
	//this.geometry.vertices.needsUpdate = true;
	//this.geometry.params.needsUpdate = true;
	//this.geometry.colors.needsUpdate = true;

	return geom;
}


My_Lib.Particle_System.prototype.generate_material_name = function ()
{
	var my_name = "MY_PARTICLE_MATERIAL";
	if (!!this.texture) {
		my_name +=  "_WITH_TEXTURE";
	}
	if (!!this.no_fade_color) {
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


My_Lib.Particle_System.prototype.create_particle_material = function()
{
	if (typeof this.texture === 'string') {
		this.texture = My_Lib.Texture_Manager.get(this.texture);
	}
	
	var blending = THREE.CustomBlending;
	var factors = this.blending_mode["one_alpha"];
	var str_blending = this.params["blending"];
	if (str_blending) {
		if (str_blending === 'no') {
			blending = THREE.NoBlending;
		} else {
			if (this.blending_mode[str_blending]) {
				factors = this.blending_mode[str_blending];
			}
		}
	}
	
    var uniforms = 
    {
        "sprite": {
            value: this.texture
        },
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
    
    if (!this.dynamic_color) {
        this.color = this.params.color;
        uniforms["particle_color"] = {value: this.color};
    }
    
    var defines = {};
    if (this.params.pre_alpha) {
        defines["PRE_ALPHA"] = true;
    }
	if (!!this.texture) {
        defines["PARTICLE_TEXTURE"] = true;
    }
    if (!!this.no_fade_color) {
        defines["NO_FADE_COLOR"] = true;
    }
    
    
	var mat = new THREE.ShaderMaterial({
		transparent: true,
		depthWrite: this.params.depth_write,
		depthTest: this.params.depth_test,
		blending: blending,
		blendSrc: factors.blendSrc,
		blendDst: factors.blendDst,
		defines: defines,
		uniforms: uniforms,
		vertexShader: Particle_Shaders.vertex,
		fragmentShader: Particle_Shaders.fragment
	});
	return mat;
}


My_Lib.Particle_System.prototype.set_pre_alpha = function (pre_alpha)
{
    if (this.params.pre_alpha !== !!pre_alpha) {
        this.params.pre_alpha = pre_alpha;
            console.log("a");
        this.node.material = this.material = this.create_particle_material();
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
	
	for(var i =0; i < this.particle_data.length && need_emit > 0; i++) {
		if (!(params[i] > 0)) {
			p = this.particle_data[i];
			this.emitter.emit(p);
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
	//this.geometry.colors.needsUpdate = true;
}


My_Lib.Particle_System.prototype.update = function (dt)
{
	this.update_particle_geometry(dt);
}


My_Lib.Particle_System.prototype.toJSON = function ()
{
	var data = {};
	data.name = "test";
	data.params = {};
	if (this.params) {
		My_Lib.copy_object(data.params, this.params);
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
		this.material.uniforms['lifelength'] = val;
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

My_Lib.Particle_Manager_Class = function ()
{
	this.particles = {};
}


My_Lib.Particle_Manager_Class.prototype.fromJSON = function (json, callback, root, name)
{
	if (this.particles[name]) {
		console.log("WARNING Particle Manager! Particle System with this name already exists", name);
	}
	
	try
	{
		var data = JSON.parse(json);
	}
	catch (e)
	{
		console.log("error parsing json on ", name, json);
		throw e;
	}
	if (data.params.emitter) {
		var emitter = My_Lib.Get_Class(data.params.emitter.name);
		if (emitter) {
			emitter = new emitter();
		} else {
			emitter = new My_Lib.Particle_Emitter();
		}
		emitter.parse(data.params.emitter.params);
		if (data.params.emitter.params.parent) {
			emitter.set_parent_object(data.params.emitter.params.parent, root);
		}
		data.params.emitter = emitter;
	} 
	
	
	if (data.params.affector) {
		var affector = My_Lib.Get_Class(data.params.affector.name);
		if (affector) {
			affector = new affector();
		} else {
			affector = new My_Lib.Particle_Affector();
		}
		affector.parse(data.params.affector.params);
		data.params.affector = affector;
	}
	var ps = new My_Lib.Particle_System(data.params);
	My_Lib.Texture_Manager.get_async(data.params.texture, callback);

	if (callback) {
		callback(ps);
	}
	this.particles[name] = ps;	
	return ps;
}

My_Lib.Particle_Manager_Class.prototype.load_scene = function (json, callback, root)
{

	var list = [];
	for(var key in json) {
		if (Object.prototype.hasOwnProperty.call(json, key)) {
			list.push( {key: json[key]} );
		}
	}
	
	var cl = new My_Lib.Chain_Loader();
	var self = this;
	cl.item_loaded = function (item, name)
	{
		self.particles[name] = item;
	}
	cl.finished = function () 
	{
		if (callback) { callback();}
	}
	cl.load_func = function (item, next) {
		self.fromJSON(item, function () {next();}, root, cl.list[cl.index]);
	}
}

My_Lib.Particle_Manager_Class.prototype.get_particle_names = function ()
{
	var names = [];
	for(var key in this.particles) {
		names.push(key);
	}
	return names;
}

My_Lib.Particle_Manager_Class.prototype.remove_particles = function (name)
{
	var ps = this.particles[name];
	if (ps) {
		ps.suicide();
		delete this.particles[name];
	}
}

My_Lib.particle_manager = new My_Lib.Particle_Manager_Class();

My_Lib.Particles_Config = {
"box_size": 10
};
