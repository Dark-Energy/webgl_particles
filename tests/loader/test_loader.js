var Particles_Demo = Application.extend( {
    created: function () {
    
    var ol = new THREE.ObjectLoader()
    
    function error(event)
    {
        console.error(event.target);
    }
    
    function progress()
    {
    }
    
    var self = this;
    function onload(data)
    {
        console.log(data);
        self.main_scene = data;
        self.main_camera = data.getObjectByName("main_camera");
    }
    
    ol.load("json/scene.json", onload, progress, error);
        
    }
});


	
    var app = new Particles_Demo();
    

    app.start();
    
    app.loop();
    
