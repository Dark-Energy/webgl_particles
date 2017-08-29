
	var my_app = {};
    


   my_app.get_dir = function (event)
   {
        var vector = Engine.Mouse_Intersector.mouse_coords_to_vector(this.canvas, event);
        vector = Engine.Mouse_Intersector.unproject(vector, this.main_camera);
        var dir = vector.sub(this.main_camera.position).normalize();
        return dir;
   }
    
    my_app.find_intersected_object = function (dir)
    {
        var ray = new THREE.Ray(this.main_camera.position, dir);        
        var obj =  Engine.Mouse_Intersector.find_intersected_object(this.main_scene, ray);
        return obj;
    }

    
    my_app.remove_target = function (object)
    {
        if (object.name === "target") {
            this.off(object);
        }
    }
    
    
    
    my_app.add_event_listener = function ()
    {
        var self = this;
        this.dom_screen.addEventListener("mouseup", function (event) {
            event.preventDefault();
            var dir = self.get_dir(event);        
            var intersects = self.find_intersected_object(dir);
            if (intersects.length > 0) {
                self.remove_target(intersects[0]);
            } else {
                if (this.canvas === undefined) {
                    console.log("WTF???");
                var rect = this.canvas.getBoundingClientRect();
                var x = event.clientX, y = event.clientY;
                console.log(x < rect.left||  x > rect.rect || y < rect.top || y > rect.bottom);
                console.log(x, y);
                    
                }
            }
        }, false);
    }
    

   my_app.max_spheres = 30;
   my_app.active_count = 10;
   //my_app.emission_per_second = 0.1;
   
   my_app.emitter = new Engine.Particle_Emitter(0.3);
   my_app.create_spheres = function ()
   {
        this.particles = new Array(this.max_spheres);
        this.active_particles = [];
        
        this.sphere_geometry = new THREE.SphereGeometry(1, 10, 10);
        this.sphere_geometry.computeVertexNormals();        
        for(var i =0; i < this.max_spheres; i++) {
            var sm = new THREE.MeshPhongMaterial();
            sm.color.copy( this.color_box.get() );
            sm.shininess = 50;
            var sphere = new THREE.Mesh(this.sphere_geometry, sm);
            sphere.name = "target";
            sphere.my = {};
            this.particles[i] = sphere;
            
            var anim = new Engine.Scale_Animation(0.3, 0.3, 0.3);
            anim.length = 3.0;
            sphere.add_animation(anim);
        }
   }
   
   
   my_app.go = function (sphere)
   {
        function calc_random_position()
        {
            var left = -10; 
            var right = 10;
            var delta = (right - left);
            var x = Math.random() * delta + left;
            var top = 10;
            var bottom = -10;
            delta = (top - bottom);
            var y = Math.random() * delta + bottom;
            var z = Math.random() * 7 + 15;
            return new THREE.Vector3(x, y, -z);
        }
   
        sphere.my.is_life = true;
        sphere.my.velocity = new THREE.Vector3(0, -1, 0);
        sphere.position.copy(calc_random_position());
        sphere.animations[0].reset();
        //sphere.visible = true;
        this.main_scene.add(sphere);
        this.active_particles.push(sphere);
   }
   
   
   my_app.off = function (sphere)
   {
        sphere.my.is_life = false;
        sphere.parent.remove(sphere);
        //sphere.visible = false;        
        var index = this.active_particles.indexOf(sphere);
        if (index > -1) {
            this.active_particles.splice(index, 1);
        }
        this.explosion.node.position.copy(sphere.position);
        this.explosion.discrete_emit(30);
        
   }
   
   my_app.emit_spheres = function (dt)
   {
        var need_emit = this.emitter.calc_emitted_particles(dt);
        
        var old_emit = need_emit;
        //console.log("need emit spheres is ", need_emit);
        
        for(var i = 0; i < this.particles.length && need_emit > 0; i++) {
            var sphere = this.particles[i];
            if (!sphere.my.is_life) {
                this.go(sphere);
                need_emit--;
            }
        }
        /*
        if (old_emit === need_emit) {
            console.log("limit is ", this.active_particles.length);
        }
        */
   }
   
   my_app.update_particles = function (dt)
   {
        for(var i = 0; i < this.active_particles.length; i++) {
            var sphere = this.active_particles[i];
            /*if (sphere.position.y < -5) {
                this.off(sphere);
            }*/
        }
        this.emit_spheres(dt);
   }
   
   my_app.color_box =  new Engine.Table_Color();
   

   my_app.create_explosion = function()
   {
        var params = {
            size: 0.3,
            count: 100, 
            discrete_emission: true,
            blending: "no",
            particle_lifetime: 0.5,
            depth_test: false,
            color_domain: new Engine.Table_Color()
        };
        params.emitter = new Engine.Sphere_Emitter(10,5);
        params.emitter.from_center = true;
        this.explosion = Engine.My_Lib.particle_manager.create_by_params(params);
        this.main_scene.add(this.explosion.node);
         
   }
    
    my_app.create_scene = function ()
    {
        this.add_event_listener();
        this.main_camera = new THREE.PerspectiveCamera(50, 800/600, 0.1, 1000);
        this.main_camera.position.set(0, 0, 10);  
        this.main_camera.lookAt(new THREE.Vector3(0, 0, -10));
        
		var pointLight = new THREE.PointLight(0xFFFFFF, 1.5, 200, 2);
		pointLight.position.set(2, 0, 20);
		this.main_scene.add(pointLight);
        
        this.create_spheres();
        
        this.create_explosion();
        
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
        this.update_particles(dt);        
    }
    
	
	var Particles_Demo = Engine.Application.extend(my_app);
    var app = new Particles_Demo();
    
    var params =
    {
        render_params: {
            "canvas": document.getElementById("canvas")
        }
    };
    app.start();
    
