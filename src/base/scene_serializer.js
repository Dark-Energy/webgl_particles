import {My_Lib} from './my_lib.js';
import {Particle_Manager} from '../particles/particles_manager.js'

function Scene_Serializer(root)
{
    this.animation_library = {};
}

Scene_Serializer.prototype.toJSON = function (root)
{
    this.json = root.toJSON();
    console.log("my lib particle manager", My_Lib.particle_manager);
    this.json["particles"] = My_Lib.particle_manager.toJSON();
    var anims = root.collect_animations(root);
    if (anims.count > 0) {
        this.json["myanimations"] = anims;
    }
    
    return this.json;
}



Scene_Serializer.prototype.create_animations = function (animations) {
    for(var key in animations) {
        if ( this.animation_library[key] === undefined && Object.prototype.hasOwnProperty.call(animations, key)) {
            var data = animations[key];
            //console.log("create animations ", data.uuid);            
            var anim =  My_Lib.Abstract_Fabric(data);
            if (anim) {
                this.animation_library[key] = anim;
            }
        }
    }
}



Scene_Serializer.prototype.bind_animations = function (animdata)
{
    if (!animdata) return;
    
    var bindings = animdata.bindings;
    
    
    var self = this;
    function copy_animations(obj, bind)
    {
        for(var i = 0; i < bind.animations.length; i++){
            var anim_uuid = bind.animations[i];
            obj.add_animation( self.animation_library[anim_uuid] );
        }
    }
    
     for(var i =0; i < bindings.length; i++) {
        var bind = bindings[i];
        var uuid = bind.uuid;
        var obj = this.root.getObjectByProperty("uuid", uuid);
        if (obj) {
            copy_animations(obj, bind);
        }
    }
}


Scene_Serializer.prototype.load_from_json = function (url)
{
    var self = this;
    function onload(json)
    {
        try {
            var data = JSON.parse(json);
        }
        catch(e) {
            console.error("Failed to parse scene ", e);
            throw e;
        }
        if (data === undefined) {
            console.error("Something fucking happened, failed to load scene ", url);
            return;
        }
        self.load(data);
    }
    function progress()
    {
    }
    function error(e)
    {
        console.error(e.target);
        throw e;
    }
    var xhr = new THREE.XHRLoader();
    xhr.load(url, onload, progress, error);
}

Scene_Serializer.prototype.load = function (json)
{
    this.animation_library = {};
    var o = new THREE.ObjectLoader();
    if (json !== undefined) {
        this.json = json;
    }
    var root = o.parse(this.json, function () {console.log("onload")});
    this.root = root;    

    My_Lib.particle_manager.load_particles(this.json, root);
    
    this.create_animations(this.json.myanimations.animations);
    this.bind_animations(this.json.myanimations);
    this.main_camera = root.getObjectByName("main_camera");
    
    if (this.scene_loaded) {
        this.scene_loaded(root);
    }
    return root;
}

export { Scene_Serializer };