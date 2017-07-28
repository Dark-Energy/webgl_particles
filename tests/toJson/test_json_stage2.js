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
        console.log(sphere);
    }
    
    ol.load("json/scene_out.json", onload, progress, error);
    
        
    }
});


	
    var app = new Particles_Demo();
    

    app.start();
    
    app.loop();
    
