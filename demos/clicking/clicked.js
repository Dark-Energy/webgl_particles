
	var my_app = {};

    my_app.add_event_listener = function ()
    {
        var self = this;
        this.dom_screen.addEventListener("mouseup", function (event) {
            var vector = Engine.Mouse_Intersector.mouse_coords_to_vector(self.canvas, event);
            //var intersects = ray.intersectObjects( [self.main_scene], true ); 
            //self.find_vector_scene_intersections(vector);
            vector = Engine.Mouse_Intersector.unproject(vector, self.main_camera);
            //console.log(vector);
            self.create_target(vector);
        });
    }
    
    
    
   my_app.create_target = function (vector)
   {
        //dir = normalize(vector - camera.position)        
        var dir = vector.sub(this.main_camera.position).normalize();
        var distance = 20;
        //var distance = - this.main_camera.position.z / dir.z;
        //pos = this.main_camera.position + dir * distance;
        
        var pos = this.main_camera.position.clone().add( dir.multiplyScalar( distance ) );

        vector = pos;   
        var sg = new THREE.SphereGeometry(1, 10, 10);
		var sm = new THREE.MeshBasicMaterial({color: 0xFF9900});
		var sphere = new THREE.Mesh(sg, sm);
		sphere.name = "target";
		sphere.position.copy(vector);
		this.main_scene.add(sphere);
    }

    
    my_app.create_scene = function ()
    {
        this.add_event_listener();
        this.main_camera = new THREE.PerspectiveCamera(50, 800/600, 0.1, 1000);
        this.main_camera.position.set(0, 0, 10);  
        this.main_camera.lookAt(new THREE.Vector3(0, 0, 10), new THREE.Vector3(10, 15, -10), new THREE.Vector3(0, 1, 0));
    }
    
    my_app.created = function () 
    {
        var self = this;
        this.create_scene();    
        console.log(JSON.stringify(this, null, ' '));
        this.loop();        
    }

    my_app.update = function (dt)
    {
        Engine.Application.prototype.update.call(this, dt);
        this.main_scene.update(dt);
    }
    
	
	var Particles_Demo = Engine.Application.extend(my_app);
    var app = new Particles_Demo();
    
    app.start();
    
