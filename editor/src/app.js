

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
        this.resource_list = data.textures;
        this.load_scene();        
        this.loop();
    }
    
    my_app.load_res = function ()
    {
        var pm = new Engine.Package_Manager();
        var self = this;
        pm.data_loaded =  function (data) { 
            self.resources_loaded(data)
        };
        pm.load("json/package_sun.json", this.create_default_data());
    }
    
    my_app.load_scene = function ()
    {
        var self = this;
        this.ser = new Engine.Scene_Serializer();                
        this.ser.scene_loaded = function (scene)
        {
            self.main_scene = scene;
            self.main_camera = scene.getObjectByName("main_camera");
            self.init_ui();                        
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
        Engine.Application.prototype.update.call(this, dt);
        this.main_scene.update(dt);
    }
    
	my_app.init_ui = function ()
	{
		this.control_panel = new Control_Panel();
		this.control_panel.add_particles( Engine.My_Lib.particle_manager.get_particle_names() );
        this.control_panel.set_textures(this.resource_list);
       
	}
    

	
var Editor_Class = Engine.Application.extend(my_app);
var Editor = new Editor_Class();
Editor.start();
