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


        

    my_app.ugly_callbacks_ends = function (data)
    {
        this.loop();
    }
    
    my_app.load_scene = function ()
    {
        var self = this;
        this.ser = new Engine.Scene_Serializer();                
        this.ser.scene_loaded = function (scene)
        {
            self.main_scene = scene;
            self.main_camera = scene.getObjectByName("main_camera");
            self.ugly_callbacks_ends();
        }
        this.ser.load_from_json("json/scene.json");        
    }
    
    my_app.load_res = function ()
    {
        var self = this;
        function texture_loaded(texture_list) 
        {
            self.load_scene();
        }
        var pm = new Engine.Package_Manager();
        pm.data_loaded = texture_loaded;
        pm.load("json/sun.json", this.create_default_data());
    }
    
   

    my_app.created = function () 
    {
        var self = this;
        this.load_res();
    }

    my_app.update = function (dt)
    {
        Engine.Application.prototype.update.call(this, dt);
        this.main_scene.update(dt);
    }
    
	
	var Particles_Demo = Engine.Application.extend(my_app);
    var app = new Particles_Demo();
    
    app.start();
