(function () 
{


editor.Texture_Panel = 
{
    template: 
        '<div class="texture-panel">\
            <select id="texture_select" :value="selected" v-on:change="choose_texture">\
            <option v-for="option in textures" v-bind:value="option">\
                {{ option }}\
            </option>\
            </select>\
            <button type="button" v-on:click="apply">apply</button>\
            <br>\
            <div class="texture-canvas">\
            <canvas id="texture-canvas-obj" class="texture-canvas" ref="canvas">\
            </canvas>\
            </div>\
            <div class="texture-info">\
                Texture Format  {{format}} <br />\
                Texture Width {{texture_width}} Height {{texture_height}}\
            </div>\
        </div>',

    props: ["textures", "selected", "particle_id"],
    
    data: function () {
        return {
            selected_texture: '',
            texture_width : 0,
            texture_height : 0,
            format : ''
        }
    },
    
    methods: {
        choose_texture: function(event)
        {
            this.selected = event.target.value;
            this.selected_texture = this.selected;
            this.draw_texture(this.selected);
        },
        apply: function ()
        {
            event_hub.$emit("select_texture", this.particle_id, this.selected_texture);
        },
        draw_texture: function (name)
        {
            if (!name) return;
            var texture = event_hub.get_texture(name);
            if (!texture) {
                console.error("Oh, Fuck! Texture " + name + " not found!");
                return;
            }
            this.format = texture_format_to_string(texture.format);
            var image = texture.image;
            this.texture_width = image.naturalWidth || image.width;
            this.texture_height = image.naturalHeight || image.height;
            
            var canvas = this.$refs["canvas"];
            my_draw_image(canvas, image, 0, 0);
        },
        
        get_texture_from_particles: function (id)
        {
            if (!id) {
                return;
            }
            this.selected_texture = event_hub.get_texture_from_particles(id);
            this.draw_texture(this.selected_texture);
        }
    },
    
    watch: {
        particle_id: function (value) { 
            this.get_texture_from_particles(value);
        }
    },
    
    mounted: function () {
        this.get_texture_from_particles(this.particle_id);
    },
    
};

Vue.component("texture-panel", editor.Texture_Panel);

})();