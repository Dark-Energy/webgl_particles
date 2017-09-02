
	var my_app = {};
    


   my_app.get_dir = function (event)
   {
    
        //this.mouse_controller.camera = this.main_camera;    
        //this.mouse_controller.refresh_canvas(this.canvas);
        //console.log("check camera identities", this.main_camera === this.mouse_controller.camera);
        //console.log(this.main_camera);
        //console.log(this.mouse_controller.camera);
        
        //var vector = Engine.Mouse_Intersector.get_normalized_screen_coords(this.canvas, event.clientX, event.clientY);
        //var new_vector = this.mouse_controller.get_normalize_mouse_position(event);
        //console.log("test normalizing");
        //console.log("old vector", vector)
        //console.log("vector and new vector", new_vector);
        
        //new_projected_vector = this.mouse_controller.unproject(new_vector);
        //vector = Engine.Mouse_Intersector.unproject(vector, this.main_camera);
        //console.log("test unproject");        
        //console.log("old vector", vector);        
        //console.log("new vector", new_projected_vector);
        //console.log("new vector trick", Engine.Mouse_Intersector.unproject(new_vector, this.main_camera));
        //console.log("camera check");
        //console.log("main camera", this.main_camera.position);
        //console.log("controller camera", this.mouse_controller.camera.position);
        //var dir = vector.sub(this.main_camera.position).normalize();
        //console.log("test controller", this.mouse_controller.offset, this.mouse_controller.width, this.mouse_controller.height);
        //console.log("canvas", this.canvas.getBoundingClientRect(), this.canvas.clientWidth, this.canvas.clientHeight);
        //return dir;*/
        //console.log("old dir",dir);        
        //console.log(ray.origin, ray.direction);
        
        var mc = new Engine.Mouse_Camera_Controller(this.canvas, this.main_camera);        
        var ray = mc.get_ray_from_camera_in_mouse_position(event);
        return ray.direction;
   }
    
    my_app.find_intersected_object = function (dir)
    {
        var ray = new THREE.Ray(this.main_camera.position, dir);        
        return Engine.Mouse_Intersector.find_intersected_object(this.main_scene, ray);
    }

    
    my_app.remove_target = function (object)
    {
        if (object.name === "target") {
            object.parent.remove(object);
        }
    }
    
    my_app.add_event_listener = function ()
    {
        var self = this;
        this.dom_screen.addEventListener("mouseup", function (event) {
            event.preventDefault();
            var dir = self.get_dir(event);        
            if (event.button === 0) {
                self.create_target(dir);
            } else if (event.button === 1) {
                var intersects = self.find_intersected_object(dir);
                if (intersects.length > 0) {
                    self.remove_target(intersects[0]);
                }            
            }
        }, false);
    }
    

   
   
   
   my_app.create_target = function (dir)
   {
        var distance = 20;
        var pos = this.main_camera.position.clone().add( dir.multiplyScalar( distance ) );

        var vector = pos;   

        if (this.sphere_geometry === undefined) {
            this.sphere_geometry = new THREE.SphereGeometry(1, 10, 10);
        }
        var sg = this.sphere_geometry;
        sg.computeVertexNormals();
        var sm = new THREE.MeshPhongMaterial();
        sm.color.copy( this.color_box.get() );
        sm.shininess = 50;
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
        
		var pointLight = new THREE.PointLight(0xFFFFFF, 1.5, 200, 2);
		pointLight.position.set(2, 0, 20);
		this.main_scene.add(pointLight);
        
    }
    
    my_app.created = function () 
    {
        var self = this;
        this.color_box =  new Engine.Table_Color();        
        this.mouse_controller = new Engine.Mouse_Camera_Controller(this.canvas, this.main_camera);        this.create_scene();    
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
    
