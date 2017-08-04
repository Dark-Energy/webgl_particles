
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
                "json/particles_scene.json"
            ]
           };
           return data;
        }

	

    my_app.resources_loaded = function (data)
    {
          	this.resource_list = data.textures;
            var json_list = data.particles;

            var self = this;            
               self.create_scene_hand();
               self.loop();
               this.serialize_scene();
               this.restore_scene();
    }
    
    my_app.load_res = function ()
    {
        var pm = new Package_Manager();
        var self = this;
        pm.data_loaded =  function (data) { self.resources_loaded(data)};
        pm.load("json/sun.json", this.create_default_data());
    }
    
    my_app.load_scene = function(url)
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
            var ol = new THREE.ObjectLoader();
            var scene = ol.parse(data);
            My_Lib.particle_manager.load_particles(data, scene);
            self.main_scene = scene;
            
            self.main_scene.parse_myanimations(data.myanimations, self.main_scene);
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

    
    my_app.create_particles = function (obj)
    {
		var self = this;
		function add_particles(name) 
		{
			var json = My_Lib.Texture_Manager.get(name);
			var ps = My_Lib.particle_manager.fromJSON(json, function () {}, self.main_scene, name);
			self.add_animated_object(ps);
		}
		add_particles("json/cone_particles1.json");
		add_particles("json/cone_particles2.json");
		add_particles("json/star_dust.json");
    }
    
    my_app.create_scene_hand = function ()
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
        
		var shit = new THREE.Object3D();
		shit.position.set(0, 0, 0);
		this.main_scene.add(shit);
        
        
        var contr = new Euler_Animation(0, 0,10);
        sphere.add_animation(contr);
	
        this.create_particles(shit);
        
	},

    my_app.serialize_scene = function ()
    {
        this.ser = new Scene_Serializer();
        this.ser.toJSON(this.main_scene);
        var str = JSON.stringify(this.ser.json, null, ' ');
        //console.log(str);
    },
    
    my_app.restore_scene = function ()
    {    
        var scene = this.ser.load();
        this.main_scene = scene;
        this.main_camera = scene.getObjectByName("main_camera");
        _.travers_scene(this.main_scene, function (c) {
            if (c.animations) {
                console.log("We found treasures!" + JSON.stringify(c.animations));
            }
        });
        //console.log(this.main_camera);
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