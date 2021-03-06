
var Color_Picker = {
    props: {
        value: {
            type: Object,
            default: function () {
                return {r: 0, g: 0, b:0}
            }
        }
    },
    template: '<div>\
    <p>Red Green Blue Color\
    <p>\
    <input type="range" min="0" max="255" @change="changed" :value="value.r" ref="r" id="r" >\
    <input type="range" min="0" max="255" @change="changed" :value="value.g" ref="g" id="g">\
    <input type="range" min="0" max="255" @change="changed" :value="value.b" ref="b" id="b">\
    </div>',
    data: function () {
        return {
            new_value : {
                r: 0,
                g: 0,
                b: 0
            }
        }
    },
    methods: {
        changed: function (event) {
            this.value[event.target.id] = event.target.value;
            this.$emit('input', this.value);
        }
    }
};


//Vue.component("color-picker", Color_Picker);

export {Color_Picker};

