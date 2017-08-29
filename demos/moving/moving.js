
	var my_app = {};
    
    
    my_app.find_intersected_object = function (ray)
    {
        var collider = new Engine.Simple_Collider(this.main_scene);
        var ints = collider.check_ray(ray);
        //console.log("collider ", ints);
        return ints;
    }

   
    my_app.dragging = false;

    my_app.find_picked_object = function (ray)
    {
        var ints = Engine.Mouse_Intersector.find_intersected_object(this.main_scene, ray);
        //console.log("picked obbjects ", ints);
        return ints;
    }

    my_app.get_ray = function (event)
    {
        var mc = new Engine.Mouse_Camera_Controller(this.canvas, this.main_camera);
        var ray = mc.get_ray_from_camera_in_mouse_position(event);
        return ray;
    }

   
        
    my_app.test_plane = function (obj, event)
    {
        var plane = this.main_camera.get_forward_plane_by_object(obj);
        var ray = this.main_camera.get_ray_from_screen_coordinates(this.canvas, event.clientX, event.clientY);
        //test_point_at_plane
        var at = new THREE.Vector3();
        ray.intersectPlane(plane, at);
        obj.position.copy(at);
        return at;
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
        this.old_pos = new THREE.Vector3();
        
        function mouseup(event)
        {
            if (self.dragging) {
                end_drag();
                return;
            }
            var ray = self.get_ray(event);        
            if (event.button === 0) {
                self.create_target(ray.direction);
            } else if (event.button === 1) {
                var intersects = self.find_intersected_object(ray);
                if (intersects) {
                    self.remove_target(intersects[0]);
                }            
            }
        }
        
        function mousedown(event) 
        {
            var ray = self.get_ray(event);                
            if (!self.dragging) {
                console.log("dragging is false, check intersection");
                var intersects = self.find_intersected_object(ray);
                //start dragging
                if (intersects[0]) {
                    start_drag(ray, intersects[0]);
                }
            }
        }
        
        this.canvas.addEventListener("mouseup", mouseup, false);
        this.canvas.addEventListener("mousedown", mousedown, false);
        

       function start_drag(event, object)
       {
            self.old_pos.copy(object.position);
            self.dragging = true; 
            self.drag_object = object;
            self.canvas.addEventListener("mousemove", drag);
       }
        
        
       
        function drag(event)
        {
            self.test_plane(self.drag_object, event);
        }
        
        function end_drag()
        {
           self.dragging = false;
           self.canvas.removeEventListener("mousemove", drag);
        }
        
        function mousedown(event) 
        {
            var ray = self.get_ray(event);                
            if (!self.dragging) {
                console.log("dragging is false, check intersection");
                var intersects = self.find_intersected_object(ray);
                //start dragging
                if (intersects[0]) {
                    start_drag(ray, intersects[0]);
                }
            }
        }
        
        this.canvas.addEventListener("mouseup", mouseup, false);
        this.canvas.addEventListener("mousedown", mousedown, false);
    }


   
   my_app.color_box =  new Engine.Table_Color();
   
   my_app.create_target_position = function (pos)
   {
        var sg = new THREE.SphereGeometry(1, 10, 10);
        sg.computeVertexNormals();
        var sm = new THREE.MeshPhongMaterial();
        sm.color.copy( this.color_box.get() );
        sm.shininess = 50;
		var sphere = new THREE.Mesh(sg, sm);
		sphere.name = "target";
		sphere.position.copy(pos);
		this.main_scene.add(sphere);
   }
   
   my_app.create_target = function (dir)
   {
        var distance = 20;
        var pos = this.main_camera.position.clone().add( dir.multiplyScalar( distance ) );
        var vector = pos;   
        this.create_target_position(pos);
    }


    
    my_app.create_scene = function ()
    {
        this.add_event_listener();
        this.main_camera = new THREE.PerspectiveCamera(50, 800/600, 0.1, 1000);
        this.main_camera.position.set(0, 0, 10);  
        //this.main_camera.lookAt(new THREE.Vector3(0, 1, 0));
        
		var pointLight = new THREE.PointLight(0xFFFFFF, 1.5, 200, 2);
		pointLight.position.set(2, 0, 20);
		this.main_scene.add(pointLight);
        //this.main_camera.updateProjectionMatrix();
        this.main_camera.updateMatrixWorld(true);
        
       

    }
    
    my_app.created = function () 
    {
        var self = this;
        this.create_scene();    
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
    

    var index = 0;
   document.getElementById("move").onclick = function ()
   {
      var arr = [
        [0, 20, 0],
        [0, 0, 10],
        [0, 0, -10],
        [10, 10, 0],
        [-10, -10, -10]
      ];
      index  = (index + 1) % arr.length;
      var i = arr[index];
      app.main_camera.position.set(i[0],i[1],i[2]);
      //app.main_camera.updateMatrixWorld(true);
   }
    
    var turn_index = 0;
   document.getElementById("turn").onclick = function ()
   {
    console.log("fuck");
    var arr = [
    [0, 0, 90],
    [0, 0, 180],
    [0, 90, 0],
    [0, -90, 0],
    [90, 0, 0],
    [-90, 0, 0]
    ];
    
        function degtorad(g) {
            return Math.PI * g / 180.0;
        }
        turn = arr[turn_index];
        app.main_camera.rotation.set(degtorad(turn[0]), degtorad(turn[1]), degtorad(turn[1]));
        turn_index = (turn_index + 1) % arr.length;
   }
    