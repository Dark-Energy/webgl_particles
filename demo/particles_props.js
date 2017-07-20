var Particles_Props = 
{
    props: ["params"],
    template: '<div>\
    <div class="prop-column">\
		Life Length: <br>\
		<input type="text" id="life-length" v-model.number="params.life_length" type="number" step="0.1">\
	</div>\
	<div class="prop-column">\
		Emit per second <br>\
		<input type="text" id="emit-per-second" v-model.number="params.emit_per_second" type="number">\
	</div>\
	<div class="prop-column">\
		Number of particles<br>\
		<input type="text" id="particle-number" v-model.number="params.count" type="number">\
	</div>\
    <div class="prop-column">\
        Point Size<br>\
        <input type="text" id="point-size" v-model="params.size">\
    </div>\
    <color-picker :value="params.color" @input="update_color"></color-picker>\
    <p>Blending mode\
    <select v-model="params.blending">\
    <option value="no">no</option>\
    <option value="additive">additive</option>\
    <option value="one_alpha">one, minus src alpha</option>\
    <option value="alpha_one">minus src alpha, one</option>\
    <option value="alpha">alpha</option>\
    </select>\
    <p>Precomputed alpha <input type="checkbox" v-model="params.precomputed_alpha">\
    <br>\
    <button type="button" @click="show_behavior">Show Behaviour</button>\
    <div class="behavior" v-if="behavior">\
    <p>affect method<br>\
    <textarea v-model="params.affect_method"></textarea>\
    <p>emit method<br>\
    <textarea v-model="params.emit_method"></textarea>\
    </div>\
    </div>',
    data: function () {
        return {
            behavior: false
        }
    },
    methods: {

        update_color: function (event)
        {
            //console.log(event);
            event_hub.$emit('change_color', this.params.id, event);
        },
  
    
        show_behavior: function (event) {
            var behavior = !this.behavior;
            /*
            if (behavior) {
                if(!this.params.affect_method) {
                    this.params.affect_method = '';
                }
                if(!this.params.emit_method) {
                    this.params.emit_method = '';
                }
            }*/
            this.behavior = behavior;
        }
    },
    components: {
        'color-picker': Color_Picker,
    },
};

