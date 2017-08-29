
	var my_app = {};

    my_app.add_event_listener = function ()
    {
        var self = this;
        this.dom_screen.addEventListener("mouseup", function (event) {
            var vector = Engine.Mouse_Intersector.mouse_coords_to_vector(self.canvas, event);
            vector = Engine.Mouse_Intersector.unproject(vector, self.main_camera);
            self.create_target(vector);
        });
        
        var btn = document.getElementById("btn-change-view");
        this.top_camera = new THREE.PerspectiveCamera(50, 800/600, 0.1, 1000);
        this.top_camera.position.set(0, 20, 2);
        this.top_camera.lookAt(new THREE.Vector3(0, -1, 0));
        this.main_scene.add(this.top_camera);
        
        var old_camera;
        self.topview = false;
        btn.onclick = function (e) {
            self.topview = !self.topview;
        }
    }
    
    
    my_app.render = function (delta) 
    {
        this.renderer.setClearColor(this.configuration.clear_color);
        this.renderer.autoClear = true;
        if (this.topview) {
            this.renderer.render(this.main_scene, this.top_camera);
        } else {
            this.renderer.render(this.main_scene, this.main_camera);
        }
    }

   
   
   my_app.color_box =  new Engine.Table_Color();
   
   my_app.create_target = function (vector)
   {
        
        var dir = vector.sub(this.main_camera.position).normalize();
        var distance = 20;
        var pos = this.main_camera.position.clone().add( dir.multiplyScalar( distance ) );
        //console.log("pos ", pos);

        vector = pos;   
        
        var sg = new THREE.SphereGeometry(1, 10, 10);
        sg.computeVertexNormals();
		//var sm = new THREE.MeshBasicMaterial({color: 0xFF9900});
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
        
		var pointLight = new THREE.PointLight(0xFFFFFF, 1.5, 200, 2);
		pointLight.position.set(2, 0, 20);
		this.main_scene.add(pointLight);
        
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
    
