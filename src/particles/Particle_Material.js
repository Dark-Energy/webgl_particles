Particle_Material.prototype.blending_mode = 
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

//there is only two blending mode - No and Custom
Particle_Material.prototype.convert_blending_mode = function (blending)
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


Particle_Material.prototype.select_texture = function (texture)
{
	if (typeof texture === 'string') {
        if (this.texture.name === texture)  {
            return;
        }
		this.texture = My_Lib.Texture_Manager.get(this.texture);
        if (!this.texture) {
            console.error("Oh, not found texture " + this.params.texture + " in create particle material!");
            return;
        }
        this.texture.name = texture;
	}
}

Particle_Material.prototype.check_texture = function ()
{
    if (!this.texture) {
        this.select_texture(this.texture_name);
    }
    return this.texture;
}


Particle_Material.prototype.create_uniforms = function (params)
{
    var uniforms = 
    {
        "sprite": {
            value: this.texture
        },
        "lifetime": {
            value: params.particle_lifetime
        },
        "point_size": {
            value: params.size
        },
        "screen_size": {
            value: new THREE.Vector2(My_Lib.Viewport.width, My_Lib.Viewport.height)
        }
    };
    
    uniforms["particle_color"] = {value: params.color};
     
    /*if (!params.dynamic_color) {
        uniforms["particle_color"] = {value: this.params.color};
    }*/
    return uniforms;
}


Particle_Material.prototype.calc_defines = function (params)
{
    var defines = {};
    if (params.pre_alpha) {
        defines["PRE_ALPHA"] = true;
    }
	if (this.texture) {
        defines["PARTICLE_TEXTURE"] = true;
    }
    if (params.no_fade_color) {
        defines["NO_FADE_COLOR"] = true;
    }
    return defines;
}


Particle_Material.prototype.create = function(params)
{
    this.texture_name = params.texture;
    this.select_texture(params.texture);
    
    var blend_obj = this.convert_blending_mode(this.params.blending);
    
    
    var uniforms = this.create_uniforms();
    var defines = this.calc_defines();
    
	var mat = new THREE.ShaderMaterial({
		transparent: true,
		depthWrite: params.depth_write,
		depthTest: params.depth_test,
        blending: blend_obj.blending,
        blendSrc: blend_obj.factors.blendSrc,
        blendDst: blend_obj.factors.blendDst,
		defines: defines,
		uniforms: uniforms,
		vertexShader: Particle_Shaders.vertex,
		fragmentShader: Particle_Shaders.fragment
	});

   this.mat = mat;
}