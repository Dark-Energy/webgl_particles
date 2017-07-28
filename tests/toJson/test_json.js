//there save scene

var Particles_Demo = Application.extend( {
    created: function () {
    
    var ol = new THREE.ObjectLoader()
    
    function error(event)
    {
        console.error(event.target);
    }
    
    function progress(e)
    {
        console.log("progress ", e);
    }
    
    var self = this;
    
    function test(a)
    {
        function is_empty(a, name)
        {
           var r = !!a[name];
           if (!r) {
                console.log(name + " is empty!");
           }
           return r;
        }
        
        function is_zero(a, name)
        {
            var r = is_empty(a, name);
            if (r) {
                r = a[name].length > 0;
                if (!r) {
                    console.log("array " + name + " is zero!");
                }
            }
            return r;            
        }
        
        var r = is_empty(a, "metadata") 
        && is_zero(a, "materials")
        && is_zero(a, "geometries")
        && is_empty(a, "object");
        
        if (r) {
           r = is_zero(a.object, "children");
           if (r) {
                r = a.object.children.length === 3;
                if (!r) {
                    console.log("a.object.children.length is not 3", a.object.children.length);                }
           }
        }
        return r;
    }
    
    function onload(data)
    {
        self.main_scene = data;
        self.main_camera = data.getObjectByName("main_camera");
        //console.log(data.getObjectByName("sun"));
        
        //change scene
        /*
        var obj = new THREE.Object3D();
        self.main_scene.add(obj);
        obj.position.set(0, 0, -100)
        var contr = new Euler_Animation(0, 60,0);
        obj.add_animation(contr);
        var sphere = data.getObjectByName("sun");
        sphere.position.set(0, 40, 0);*/

        //convert to json
        var output = data.toJSON();
        console.log(output.object.children);
        //test(output);                
        var text = JSON.stringify(output, null, " ");
      
        //save scene
        var blob = new Blob([text], {type: "application/json"});	
        saveAs(blob, "scene_out.json");
    }
    
    ol.load("json/scene_orig.json", onload, progress, error);
    
    function onload2(data)
    {
        self.main_scene = data;
        self.main_camera = data.getObjectByName("main_camera");
        var sphere = data.getObjectByName("sun");
        sphere.material.color.set('#00FF00');
      
        
    }
    //ol.load("json/scene_orig.json", onload2, progress, error);
        
    }
});


	
    var app = new Particles_Demo();
    

    app.start();
    
    app.loop();
    
