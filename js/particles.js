/*
Particle System Parameters:
emitter -
affector - 
no_fade_color - if true - particles don't faded
texture - texture name or THREE.texture object
size - point size
count - max particles count
random_color - if false, each particles have identity color, else each particle get randomness color. false by default
color - color of particles, if random color is not set. Must be in {r,g,b} or string hex '0xffffff'.
material features, which shader generation depends on
blending - THREE.normalBlending (one, one_minus_src_alpha) by default
no_premultiplied_alpha - false by default
no_depth_test - false by default 
depth_write - false by default


*/

var MLIB = My_Lib;

My_Lib.Particles = {};

My_Lib.Particles.Classes = {};


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
	this.no_fade_color = !!params.no_fade_color;
	//FIX this - need THREE.Color or not need?
	if (!params.color) {
		params.color  = {"r":1, "g":1, "b":1};
	} else {
		//params.color = new THREE.Color();
	}
	

	this.point_size = params.size || 1;
	var count = params.count || 100;
	
	this.node = new THREE.Points(this.create_particle_geometry(count), 
		this.create_particle_material());
	
}

var PSystem = My_Lib.Particle_System;

My_Lib.Particle_System.prototype.create = function (count, size)
{
}

My_Lib.Particle_System.prototype.create_particle_geometry = function(count)
{
	this.particle_data = new Array(count);
	var vertices = new Float32Array(count * 3); // position
	var colors = new Float32Array(count * 3);
	var params = new Float32Array(count);
	
	this.particle_data = new Array(count);	
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
	this.geometry.colors = new THREE.BufferAttribute(colors, 3).setDynamic(true);
	/*if (this.params.random_color) {
		this.geometry.colors.setDynamic(true);
	}*/
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

//particle attributes:
//position
//color
//left, size

 
var vertex_shader = [
'//attribute vec4 position;',
//projectionMatrix[1][1] *
'attribute vec4 color;',
'attribute float params;',
'varying vec4 vcolor;',
'uniform float lifetime;',
'uniform float point_size;',
'uniform vec2 screen_size;',
'void main () {',
	'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
	'vcolor.rgb = color.rgb;',
'#ifdef NO_FADE_COLOR',
	'vcolor.a = 1.0;',
'#else',
	'vcolor.a = params / (lifetime);',
'#endif',
	'float t =  screen_size.y* projectionMatrix[1][1] / gl_Position.w;',
	't = t * point_size;',
	'if (params > 0.0) {',
		'gl_PointSize = t;',
	'}',
	'else {',
		'vcolor.a = 0.0;',
		//'vcolor.rgb = vec3(0.0,0.0,0.0);',
		'gl_PointSize = 0.0;',
	'}',
'}'
];

var fragment_shader = [
	'varying vec4 vcolor;',
	'#ifdef PARTICLE_TEXTURE',
		'uniform sampler2D sprite;',
	'#endif',
	'void main() {',
	'#ifdef PARTICLE_TEXTURE',
		'vec4 tex = texture2D( sprite, gl_PointCoord );',
	'#else',
		'vec4 tex = vec4(1,1,1,1);',
	'#endif',
		'float alpha = tex.a;',
	'#ifndef NO_FADE_COLOR',
		'alpha *= vcolor.a;',
	'#endif',
	'#ifdef TEXTURE_ONLY_ALPHA',
		'gl_FragColor = vec4( vcolor.rgb * tex.a, tex.a *alpha);',	
	'#else',
		'gl_FragColor = vec4( vcolor.rgb * tex.rgb * tex.a, alpha);',	
	'#endif',
	'}',
];


My_Lib.Particle_System.prototype.set_texture = function(texture)
{
	
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

My_Lib.Particle_System.prototype.create_particle_material = function()
{
	if (typeof this.texture === 'string') {
		this.texture = My_Lib.Texture_Manager.get(this.texture);
	}
	
	var mat = new THREE.ShaderMaterial({
		//name: this.generate_material_name(),
		transparent: true,
		depthWrite: false,
		depthTest: true,
		blending: THREE.NormalBlending,
		premultipliedAlpha: true,
		defines: {
			"PARTICLE_TEXTURE": !!this.texture,
			"NO_FADE_COLOR": !!this.no_fade_color,
		},
		uniforms: {
			"sprite": {
				value: this.texture
			},
			"lifetime": {
				value: this.particle_lifetime
			},
			"point_size": {
				value: this.point_size
			},
			"screen_size": {
				value: new THREE.Vector2(My_Lib.Viewport.width, My_Lib.Viewport.height)
			}
		},
		vertexShader: vertex_shader.join( '\n' ),
		fragmentShader: fragment_shader.join( '\n' )
	});
	return mat;
}

var once = true;


My_Lib.Particle_System.prototype.emit_particles = function (dt, need_emit)
{
	//emit particles
	var p;
	var verts = this.geometry.vertices.array;
	var params = this.geometry.params.array;
	var colors = this.geometry.colors.array;
	var dummy_color = new THREE.Color(1,1,1);
	
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
			colors[i*3] = this.params.color.r
			colors[i*3+1] = this.params.color.g;
			colors[i*3+2] = this.params.color.b;
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
	data.name = "test";
	data.params = {};
	if (this.params) {
		My_Lib.copy_object(data.params, this.params);
	}
	data.params.emitter = this.emitter.toJSON();
	data.params.affector = this.affector.toJSON();
	return data;
}

My_Lib.Particle_System.prototype.fromJSON = function (json, callback, root)
{
	var data = JSON.parse(json);
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
	return ps;
}