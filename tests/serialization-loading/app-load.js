
function init()
{

	var my_app = {};

    
    my_app.create_default_data = function()
        {
            var data = {
                "textures": [
                    "textures/particle2.png",
                    "textures/particle1.png",
                    "textures/Particle4.jpg",
                    "textures/spark.png",
            ]
           };
           return data;
        }

	

    my_app.resources_loaded = function (data)
    {
        this.loop();
    }
    
    my_app.load_res = function ()
    {
        var pm = new Package_Manager();
        var self = this;
        //pm.data_loaded =  function (data) { self.resources_loaded(data)};
        self.resources_loaded()
        pm.load("json/sun.json", this.create_default_data());
        
        this.ser = new Scene_Serializer();                
        this.ser.scene_loaded = function (scene)
        {
            self.main_scene = scene;
            self.main_camera = scene.getObjectByName("main_camera");
        }
        this.ser.load_from_json("json/scene.json");        
    }
    
   

    my_app.created = function () 
    {
        var self = this;
        this.load_res();
    }

    my_app.update = function (dt)
    {
        Application.prototype.update.call(this, dt);
        this.main_scene.update(dt);
    }
    
	
	var Particles_Demo = Application.extend(my_app);
    var app = new Particles_Demo();
    
    app.start();
    
   
}


init();