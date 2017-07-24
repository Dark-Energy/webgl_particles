
var event_hub;

/*
var texture_type_to_string = [];
var ttt = texture_type_to_string;
    ttt[THREE.ByteType] = "ByteType";
    ttt[THREE.UnsignedByteType] = "UnsignedByteType";
    ttt[THREE.ShortType] = "ShortType";
    ttt[THREE.UnsignedShortType] = "UnsignedShortType";
    ttt[THREE.IntType] = "IntType";
    THREE.UnsignedIntType: "UnsignedIntType",
    THREE.FloatType: "FloatType",
    THREE.HalfFloatType: "HalfFloatType",
    THREE.UnsignedShort4444Type: "UnsignedShort4444Type",
    THREE.UnsignedShort5551Type: "UnsignedShort5551Type",
    THREE.UnsignedShort565Type: "UnsignedShort565Type",
    THREE.UnsignedInt248Type: "UnsignedInt248Type",
}
*/


var Control_Panel = (function ()
{


Control_Panel = function ()
{
    this.create_event_hub();
    
	this.app = this.create_vue_app();
    
    event_hub.$on("remove_particles", this.remove_particles.bind(this));
    event_hub.$on("replay", this.replay_params.bind(this));
    event_hub.$on("change_color", this.change_particles_color.bind(this));
    event_hub.$on("change_params", this.change_some_params.bind(this));
    event_hub.$on("select_texture", this.set_texture.bind(this));
}


Control_Panel.prototype.create_event_hub = function ()
{

var methods = {
    get_texture: function (id) {
        var t = My_Lib.Texture_Manager.get(id); 
        if (!t) {
            console.error("Unfound texture with id " + id);
        }
        return t; 
    },
    get_texture_from_particles: function (id) {
        var ps = My_Lib.particle_manager.particles[id];
        selected_texture = '';
        if (!ps) {
            console.error("oh shit! particles " + value + " not existed! function get_texture_from_particles");
            return;
        }
        selected_texture = ps.params.texture;
        return selected_texture;
    },
    get_particle_params : function (id) {
        var ps = My_Lib.particle_manager.particles[id];
        if (!ps) {
            console.error("ERROR! particles " + this.selected + "not found!");    
            return {};
        }
        var color = ps.params.color;
        var particle_params = 
        {
            id: id,
            texture: ps.params.texture,
            count: ps.params.count,
            size: ps.params.size,
            emit_per_second: ps.emitter.emit_per_second,
            life_length: ps.particle_lifetime,
            color: {r:color.r * 255, g:color.g * 255, b: color.b * 255},
            blending : ps.params.blending,
            precomputed_alpha: ps.params.pre_alpha,
            emit_method: 
                ps.params.emitter.source_code ? ps.params.emitter.source_code.slice(0) : '',
            affect_method: 
                ps.params.affector.source_code ? ps.params.emitter.source_code.slice(0) : '',
        };
        return particle_params;
    }
};

 event_hub = new Vue( {
    methods: methods
});
}


Control_Panel.prototype.set_texture = function (id, texture)
{
    var ps = My_Lib.particle_manager.particles[id];
    ps.set_texture(texture);
}

Control_Panel.prototype.remove_particles = function (id)
{
    My_Lib.particle_manager.remove_particles(id);
}

Control_Panel.prototype.change_particles_color = function (id, new_color)
{
    var ps = My_Lib.particle_manager.particles[id];
    ps.set_color({
        r: new_color.r / 255.0,
        g: new_color.g / 255.0,
        b: new_color.b / 255.0
    });
}

Control_Panel.prototype.change_some_params = function (id, params)
{
    var ps = My_Lib.particle_manager.particles[id];
    var v;
    if (params.life_length !== undefined) {
        v = parseFloat(params.life_length);
        ps.set_particle_life_length(v);
    }
    
    if (params.emit_per_second !== undefined) {
        ps.set_emission_per_second(params.emit_per_second);
    }
    
    if (params.count !== undefined) {
        ps.set_particle_count(params.count);
    }

    if (params.size !== undefined) {
        ps.set_point_size(params.size);
    }
    
    if (params.blending !== undefined) {
        ps.set_blending(params.blending);
    }
    
    if (params.pre_alpha !== undefined) {
        ps.set_pre_alpha(!!params.pre_alpha);
    }
}

Control_Panel.prototype.replay_params = function (id, params)
{
    var ps = My_Lib.particle_manager.particles[id];
    if (!ps) {
        throw "ERROR! not found particles with id " + id;
    }
    
    //set custom emit method
    if (params.emit_method) {
        var emitter = ps.params.emitter;
        if (!emitter.source_code) {
            emitter = new Custom_Emitter();
            ps.set_emitter(emitter);
        }
        emitter.set_emit_function(this.particle_params.emit_method);
    }
    
    ps.set_particle_life_length(params.life_length);
    ps.set_emission_per_second(params.emit_per_second);
    ps.set_particle_count(params.count);
    this.change_particles_color(id, params.color);
    ps.set_blending(params.blending);
    ps.set_pre_alpha(params.precomputed_alpha);
    var size = params.size;
    if (typeof  size === 'string') {
        var r = size.replace(',', '.');
        size = parseFloat(r);
    }
    ps.set_point_size(size);
}


Control_Panel.prototype.add_particles = function (particles)
{
	for(var key in My_Lib.particle_manager.particles) {
		this.app.particles.push( key );
	}
}

Control_Panel.prototype.set_textures = function (textures)
{
    for(var i =0; i < textures.length; i++) {
        this.app.textures.push(textures[i]);
    }
}


Control_Panel.prototype.create_vue_app = function () {
    return editor.create_vue_app('#app');
}

return Control_Panel;
})();



