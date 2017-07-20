var event_hub = new Vue();

var Control_Panel = (function ()
{

var the_state;

Control_Panel = function (state)
{
    the_state = state;
	this.app = this.create_vue_app();
    
    event_hub.$on("remove_particles", this.remove_particles.bind(this));
    event_hub.$on("replay", this.replay_params.bind(this));
    event_hub.$on("change_color", this.change_particles_color.bind(this));
}

Control_Panel.prototype.remove_particles = function (id)
{
    My_Lib.particle_manager.remove_particles(id);
}

Control_Panel.prototype.change_particles_color = function (id, new_color)
{
   //console.log("change ", id, new_color);
    var ps = My_Lib.particle_manager.particles[id];
    ps.set_color({
        r: new_color.r / 255.0,
        g: new_color.g / 255.0,
        b: new_color.b / 255.0
    });
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
    //console.log( " parse " + size +" source " + params.size);    
}

Control_Panel.prototype.get_particle_params = function (id)
{
    var ps = My_Lib.particle_manager.particles[id];
    if (!ps) {
        console.log("ERROR! particles " + this.selected + "not found!");    
        return;
    }

    var color = ps.params.color;
    var particle_params = 
    {
        count: ps.params.count,
        size: ps.params.size,
        emit_per_second: ps.emitter.emit_per_second,
        life_length: ps.particle_lifetime,
        color: {r:color.r * 255, g:color.g * 255, b: color.b * 255},
        blending : ps.params.blending,
        precomputed_alpha: ps.params.pre_alpha,
        emit_method: ps.params.emitter.source_code ? ps.params.emitter.source_code.slice(0) : '',
        affect_method: ps.params.affector.source_code ? ps.params.emitter.source_code.slice(0) : '',
    };
    return particle_params;
}


Control_Panel.prototype.add_particles = function (particles)
{
	for(var key in My_Lib.particle_manager.particles) {
		this.app.particles.push( {"value": key} );
	}
}





var Particles_Panel = 
{
    props: {
        particles : {
            type: Object,
            default: [],
        }
    },
	data: function () {
       return  {
                selected: '',
                particle_params: {},
            };
    },
    methods:
    {
get_particle_params: function (id)
{
    var ps = My_Lib.particle_manager.particles[id];
    if (!ps) {
        console.log("ERROR! particles " + this.selected + "not found!");    
        return;
    }

    var color = ps.params.color;
    var particle_params = 
    {
        id: id,
        count: ps.params.count,
        size: ps.params.size,
        emit_per_second: ps.emitter.emit_per_second,
        life_length: ps.particle_lifetime,
        color: {r:color.r * 255, g:color.g * 255, b: color.b * 255},
        blending : ps.params.blending,
        precomputed_alpha: ps.params.pre_alpha,
        emit_method: ps.params.emitter.source_code ? ps.params.emitter.source_code.slice(0) : '',
        affect_method: ps.params.affector.source_code ? ps.params.emitter.source_code.slice(0) : '',
    };
    return particle_params;
},
    
        add_particles: function ()
        {
        },
		remove_particles: function (event) 
		{
			for(var i = 0; i < this.particles.length; i++) {
				if (this.particles[i].value == this.selected) {
					this.particles.splice(i, 1);
                    //selecte next available particles or empty
					if (this.particles.length > 0) {
						this.selected = this.particles[0].value;
					} else {
						this.selected = '';
					}
                    
                    break;
				}
           }
           event_hub.$emit("remove_particles", this.selected);
		},
        
        change_colors: function (event)
        {
            event_hub.$emit("change_particles_color", this.selected, event);
        },
        
		select_particles: function (event)
		{
            this.particle_params = this.get_particle_params(this.selected);
		},
		play: function (event)
		{
            event_hub.$emit("replay", this.selected, this.particle_params);
		}
        
    },
    template: 
    '<div>\
	<button type="button" id="btn-add" v-on:click="add_particles">Add</button>\
	<br>\
	<select v-model="selected" id="object-list" v-on:change="select_particles">\
		<option disabled value="">Please select one</option>\
	  <option v-for="option in particles" v-bind:value="option.value">\
		{{ option.value }}\
	  </option>\
	</select>\
	<br>\
	<span>Selected: {{ selected }}</span>\
    <div v-if="selected">\
        <particles-props  :params="particle_params"></particles-props>\
        <button type="button" id="btn-play" v-on:click="play">Refresh</button>\
        <button type="button" id="btn-remove" v-on:click="remove_particles">Remove</button>\
    </div>\
    </div>',
    components: {
        'particles-props': Particles_Props,
    },
};

Control_Panel.prototype.create_vue_app = function () {

	var app2 = new Vue({
		el: '#app-2',
        components: {
            'particles-panel': Particles_Panel,
        },
		data: {
            particles: [],
        },
	});

	return app2;
}

return Control_Panel;
})();