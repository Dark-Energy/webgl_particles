//there is load json scene
//scenen must be identical

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
    
    
    function onload(data)
    {
        self.main_scene = data;
        self.main_camera = data.getObjectByName("main_camera");
        var sphere = data.getObjectByName("sun");
        
        
        //change scene
        
        var obj = new THREE.Object3D();
        self.main_scene.add(obj);                
        obj.position.set(0, 0, -120)
        obj.add(sphere);
        sphere.position.set(0, 40, 0);
        
        
        var contr = new Euler_Animation(0, 60,0);
        obj.add_animation(contr);
        
         


        //convert to json
        this.output = data.toJSON();


    function onload2(data)
    {
        self.main_scene = data;
        self.main_camera = data.getObjectByName("main_camera"); 
    }
    
    console.log("output ", this.output);
    var ol2 = new THREE.ObjectLoader();
    ol2.parse(this.output, onload2)         
        
       
    }
    
    ol.load("json/scene_out.json", onload, progress, error);

    
    }
});


	
    var app = new Particles_Demo();
    

    app.start();
    
    app.loop();
    
