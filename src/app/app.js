
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
            ],
            "particles": [
                "json/cone_particles1.json",
                "json/cone_particles2.json",
                "json/star_dust.json",
            ]
           };
           return data;
        }

	

    my_app.resources_loaded = function (data)
    {
          	this.resource_list = data.textures;
            var json_list = data.particles;

            var self = this;            
               self.create_sun();
               self.init_ui();
               self.loop();
    }
    
    my_app.load_res = function ()
    {
        var pm = new Package_Manager();
        var self = this;
        pm.data_loaded =  function (data) { self.resources_loaded(data)};
        pm.load("json/sun.json", this.create_default_data());
    }
    

	my_app.create_sun = function ()
	{
		var pointLight = new THREE.PointLight(0xFFFF00);
		pointLight.position.set(10, 300, 200);
		this.main_scene.add(pointLight);
		
		var sg = new THREE.SphereGeometry(7, 20, 20);
		var sm = new THREE.MeshBasicMaterial({color: 0xFF9900});
		var sphere = new THREE.Mesh(sg, sm);
		sphere.name = "sun";
		sphere.position.z = -100;
		this.main_scene.add(sphere);
		this.main_camera.lookAt(sphere.position);	
		this.main_camera.position.z = 10;
		
		//var contr = new My_Lib.Euler_Controller(sphere, 0, 60,0);
		//this.add_animated_object(contr);
        
        var contr = new Euler_Animation(0, 60,0);
        sphere.add_animation(contr);

		
		var self = this;

        /*var t = this.main_scene.getObjectByName("sun");
        sphere.updateMatrixWorld();
        console.log(sphere.matrixWorld);
        console.log(JSON.stringify(this.main_scene.toJSON(), null, '   '));
            */
        
		var shit = new THREE.Object3D();
		shit.position.set(0, 0, 0);
		this.main_scene.add(shit);
		
		var self = this;
		function add_particles(name) 
		{
			var json = My_Lib.Texture_Manager.get(name);
			var ps = My_Lib.particle_manager.fromJSON(json, function(){},self.main_scene, name);
			self.add_animated_object(ps);
		}
		add_particles("json/cone_particles1.json");
		add_particles("json/cone_particles2.json");
		add_particles("json/star_dust.json");
		
	}

	my_app.init_ui = function ()
	{
		this.control_panel = new Control_Panel();
		this.control_panel.add_particles( My_Lib.particle_manager.get_particle_names() );
        
        this.control_panel.set_textures(this.resource_list);

	}

    my_app.created = function () 
    {
        var self = this;
        this.load_res();
        
        this.dom_screen.addEventListener("click", function (event) {
            var ray = Mouse_Intersector.mouse_coords_to_ray(self.dom_screen, event, self.main_camera);
            var intersects = ray.intersectObjects( [self.main_scene], true ); 
            console.log(intersects);
        });
    }

    my_app.update = function (dt)
    {
        Application.prototype.update.call(this, dt);
        //console.log(this.main_scene.update);
        this.main_scene.update(dt);
    }
    
	
	var Particles_Demo = Application.extend(my_app);
    var app = new Particles_Demo();
    
    //app.start("json/configuraton.json");
    app.start();
    
   
}


init();