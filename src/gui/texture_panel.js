
var Texture_Panel = 
{
    template: 
        '<div class="texture-panel">\
            <div class="high-tools-panel">\
            <select id="texture_select" v-model="selected" v-on:change="choose_texture">\
            <option v-for="option in textures" v-bind:value="option">\
                {{ option }}\
            </option>\
            </select>\
            <button type="button" v-on:click="apply">apply</button>\
            </div>\
            <div class="texture-canvas">\
            <canvas id="texture-canvas-obj" class="texture-canvas" ref="canvas">\
            </canvas>\
            </div>\
            <div class="texture-info">\
                Texture Format  {{format}} <br />\
                Texture Width {{texture_width}} Height {{texture_height}}\
            </div>\
            <div class="clear" />\
        </div>',

        //texture dictionaries, selected texture, object id, which selected texture
    props: ["textures", "selected", "object_id"],
    
    data: function () {
        return {
            selected_texture: '',
            texture_width : 0,
            texture_height : 0,
            format : '',
            panel_visible: false,
            selected: '',
        }
    },
    
    methods: {
        show_panel: function (event)
        {
            this.panel_visible = !this.panel_visible;
        },
        choose_texture: function(event)
        {
            this.selected = event.target.value;
            this.selected_texture = this.selected;
            this.draw_texture(this.selected_texture);
        },
        apply: function ()
        {
            //console.log("apply of ", this.object_id, this.selected_texture);
            event_hub.$emit("select_texture", this.object_id, this.selected_texture);
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

    mounted: function () {
      this.get_texture_from_particles(this.object_id);
      //console.log("mount of texture panel", this.object_id, this.selected_texture, this.selected);
      //print("<h3>Hi! I mounted and my texture is " + this.selected_texture + "," + this.selected + "</h3>");
    },

    
    watch: {
        object_id: function (value) { 
           this.get_texture_from_particles(value);
         },
    },
   
    
};




export {Texture_Panel};