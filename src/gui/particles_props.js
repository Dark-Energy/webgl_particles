(function () {

editor.Blending_Selector = {
    props: {
        "blending": {
            type : String,
            required: true,
            default: "no"
         },
    },
    template:
        '<select v-model="blending" id="blending" v-on:change="select">\
            <option value="no">no</option>\
            <option value="additive">additive</option>\
            <option value="one_alpha">one, minus src alpha</option>\
            <option value="alpha_one">minus src alpha, one</option>\
            <option value="alpha">alpha</option>\
        </select>',
    methods: {
        select: function (event) {
            this.$emit("change", this.blending);
        }
    },
};

editor.Behavior = {
    props: ["affect_method", "emit_method"],
    
    data: function () {
        return {
            behavior: false
        }
    },

    template: '<div>\
    <button type="button" @click="show_behavior">Show Behaviour</button>\
    <div class="behavior" v-if="behavior">\
    <p>affect method<br>\
    <textarea v-model="affect_method"></textarea>\
    <p>emit method<br>\
    <textarea v-model="emit_method"></textarea>\
    </div>',
    methods: {
        show_behavior: function(f) {
            var behavior = !this.behavior;
            this.behavior = behavior;
        }
    },

};

editor.Particle_Params = 
{
    props: {
        "params": {
            type: Object,
            default: function () {
                return {};
            }
        }
    },

    template: '<div @keyup.13="fire">\
        <div class="prop-column">\
            Life Length: <br/>\
            <input type="text" id="life_length" v-model.number="params.life_length" type="number" step="0.1" />\
        </div>\
        <div class="prop-column">\
            Emit per second <br/>\
            <input type="text" id="emit_per_second" v-model.number="params.emit_per_second" type="number" />\
        </div>\
        <div class="prop-column">\
            Number of particles<br/>\
            <input type="text" id="count" v-model.number="params.count" type="number" />\
        </div>\
        <div class="prop-column">\
            Point Size<br/>\
            <input type="text" id="size" v-model.number="params.size" type="number" step="0.1" />\
        </div>\
</div>',
    methods: {
        fire: function (event) {
            this.$parent.fire(event);
        }
    }
};
   
editor.Particles_Props = 
{
    props: {
        "params": {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    template: '<div>  <particle-params :params=params />\
        <color-picker :value="params.color" @input="update_color"></color-picker>\
        <p>Blending mode</p>\
            <blending-mode :blending=params.blending @change="blending_change"> </blending-mode>\
        <p>Precomputed alpha <input type="checkbox" v-model="params.precomputed_alpha" @change="fire" id="pre_alpha"></p>\
        <behavior :affect_method=params.affect_method :emit_method=params.emit_method />\
    <div>',
    
    data: function () {
        return {
            behavior: false
        }
    },
    watch: {
        params: function ()
        {
            console.log("change ", this.params.id);
        }
    },
    methods: {
        blending_change: function (event) {
            this.params.blending = event;
            this.emit_param_change("blending", event);
        },
        emit_param_change: function (key, value)
        {
            var params ={};
            params[key] = value;
            event_hub.$emit("change_params", this.params.id, params);
        },
        fire: function (event)
        {
            var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;
            this.emit_param_change(event.target.id, value);
        },
        
        update_color: function (event)
        {
            event_hub.$emit('change_color', this.params.id, event);
        },
    
    },
    components: {
        //'color-picker': editor.Color_Picker,
        'blending-mode': editor.Blending_Selector,
        'behavior': editor.Behavior,
        'particle-params': editor.Particle_Params,
    },
};

Vue.component("ParticlesProps", editor.Particles_Props);

})();

