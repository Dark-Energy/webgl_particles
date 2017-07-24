(function ()
{

editor.Particles_Panel = 
{
    props: {
        particles : {
            type: Object,
            default: function () { return []; },
        },
        textures : {
            type: Object,
            default: function () { return []; },
        },
        selected: {
            type: String,
            default: ''
        }
    },
	data: function () {
       return  {
                particle_params: {},
                my_selected : false
            };
    },
    methods:
    {
        add_particles: function ()
        {
        },
		remove_particles: function (event) 
		{
           event_hub.$emit("remove_particles", this.my_selected);        
			for(var i = 0; i < this.particles.length; i++) {
				if (this.particles[i] == this.my_selected) {
					this.particles.splice(i, 1);
                    //selecte next available particles or empty
					if (this.particles.length > 0) {
                        if (i+ 1 < this.particles.length) {
                            this.my_selected = this.particles[i+1];
                        } else  {
                            this.my_selected = this.particles[0];
                        }
					} else {
						this.my_selected = '';
					}
                    
                    break;
				}
           }
		},
        
        change_colors: function (event)
        {
            event_hub.$emit("change_particles_color", this.my_selected, event);
        },
        
		select_particles: function (event)
		{
                this.particle_params = event_hub.get_particle_params(this.my_selected);                  
		},
		play: function (event)
		{
            event_hub.$emit("replay", this.my_selected, this.particle_params);
		}
        
    },
    created: function ()
    {
        if (!!this.selected) {
            this.my_selected = this.selected;
        } else {
            if (this.particles.length > 0) {
                this.my_selected = this.particles[0];
            }
        }
        if (this.my_selected) {
            this.particle_params = event_hub.get_particle_params(this.my_selected);        
        }
    },

    watch: {
        particles: function (arr) {
            if (this.particles.length > 0) {
                this.my_selected = this.particles[0];
            }
        },
        my_selected: function (new_selected) 
        {
            this.particle_params = event_hub.get_particle_params(this.my_selected);
        }
    },
        
    template: 
    '<div>\
	<button type="button" id="btn-add" v-on:click="add_particles">Add</button>\
	<br>\
	<select v-model="my_selected" id="object-list">\
		<option disabled value="">Please select one</option>\
	  <option v-for="option in particles" v-bind:value="option">\
		{{ option }}\
	  </option>\
	</select>\
	<br>\
	<span>Selected: {{ my_selected }}</span>\
    <p>Particles properties</p>\
    <div v-if="my_selected">\
        <ParticlesProps  :params="particle_params" />\
        <button type="button" id="btn-play" v-on:click="play">Refresh</button>\
        <button type="button" id="btn-remove" v-on:click="remove_particles">Remove</button>\
<texture-panel :textures=textures :particle_id=my_selected :selected=particle_params.texture></texture-panel>\
    </div>\
    </div>',
   
   /*
    components: {
        'ParticlesProps': editor.Particles_Props,
        'texture-panel': editor.Texture_Panel,
    },*/
};


Vue.component("particles-panel", editor.Particles_Panel);

})();