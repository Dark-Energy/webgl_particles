

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
        var pm = new Package_Manager();
        var self = this;
        pm.data_loaded =  function (data) { 
            self.resources_loaded(data)
        };
        pm.load("json/package_sun.json", this.create_default_data());
    }
    
    my_app.load_scene = function ()
    {
        var self = this;
        this.ser = new Scene_Serializer();                
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
        Application.prototype.update.call(this, dt);
        this.main_scene.update(dt);
    }
    
	my_app.init_ui = function ()
	{
		this.control_panel = new Control_Panel();
		this.control_panel.add_particles( My_Lib.particle_manager.get_particle_names() );
        this.control_panel.set_textures(this.resource_list);
        
        this.create_mouse_listener();
        
	}
    
    my_app.create_line = function (a, b)
    {
       
        var points = new Float32Array([ a.x, a.y, a.z, a.x+b.x, a.y+b.y, a.z+b.z]); 
        //console.log("points ", points);
        var vertices = new THREE.BufferAttribute(points, 3).setDynamic(true);        
        var geom = new THREE.BufferGeometry(); 	
        geom.addAttribute('position', vertices);
        
        var line = new THREE.Line(geom, new THREE.LineBasicMaterial);
        this.main_scene.add(line);
     }

     
     
    my_app.find_vector_scene_intersections = function(vector)
    {
        vector.unproject(this.main_camera);
        var ray = new THREE.Raycaster( this.main_camera.position, vector.sub( this.main_camera.position ).normalize() );
            // create an array containing all objects in the scene with which the ray intersects
			//var intersects = ray.intersectObjects( [grid_text.root], true ); 
			//console.log(fake_plane.root.children[0].geometry);
			var intersects = ray.intersectObjects( [this.main_scene], true ); 
			console.log(intersects);
	}
  
     
    my_app.create_mouse_listener = function ()
    {
    
        var self = this;
        document.addEventListener("click", function (event) {
            var vector = Mouse_Intersector.mouse_coords_to_vector(self.dom_screen, event);
            //var intersects = ray.intersectObjects( [self.main_scene], true ); 
            self.find_vector_scene_intersections(vector);
        });
        /*
        var onMouseDownPosition = {};
        this.dom_screen.addEventListener("mousedown", function (event) {
            self.mouseDown = true;
            onMouseDownPosition.x = event.clientX;
            onMouseDownPosition.y = event.clientY;
            
        });
        
       this.dom_screen.addEventListener("mouseup", function (event) {
            self.mouseDown = false;
        });

          this.dom_screen.addEventListener("mousemove", function (event) {
             if ( self.mouseDown ) {
                theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 )
                        + onMouseDownTheta;
                phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 )
                      + onMouseDownPhi;

                phi = Math.min( 180, Math.max( 0, phi ) );

                var camera = self.main_camera;
                camera.position.x = radious * Math.sin( theta * Math.PI / 360 )
                                    * Math.cos( phi * Math.PI / 360 );
                camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
                camera.position.z = radious * Math.cos( theta * Math.PI / 360 )
                                    * Math.cos( phi * Math.PI / 360 );
                camera.updateMatrix();
            }
        });
        */
    }

	
var Editor_Class = Application.extend(my_app);
var Editor = new Editor_Class();
Editor.start();
