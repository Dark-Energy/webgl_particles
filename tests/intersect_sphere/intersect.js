
	var my_app = {};

    
    my_app.create_line = function (a, b)
    {
       
        var points = new Float32Array([ a.x, a.y, a.z, b.x, b.y, b.z]); 
        //console.log("points ", points);
        var vertices = new THREE.BufferAttribute(points, 3).setDynamic(true);        
        var geom = new THREE.BufferGeometry(); 	
        geom.addAttribute('position', vertices);
        
        var mat = new THREE.LineBasicMaterial;
        mat.linewidth = 1;
        var line = new THREE.Line(geom, mat);
        this.main_scene.add(line);
     }

     
    my_app.create_lines = function ()
    {
        var delta = Math.PI * 2.0 / 100
        var angle = 0;
        var radius = 10;
        var min_radius = 0.1;
        var center = new THREE.Vector3(0, 0, -10);
        
        this.lines = new Array(100);
        
        var z = -10;
        for(var i =0; i < 100; i++) {
            var x = Math.cos(angle); 
            var y = Math.sin(angle); 
            angle += delta;
            
            
            var orig = new THREE.Vector3(x*radius, y*radius, z);
            var center = new THREE.Vector3(x * min_radius, y * min_radius, z);
            this.create_line(orig, center);
            
            var direction = new THREE.Vector3();
            direction.copy(center).sub(orig).normalize();
            this.lines[i] = new THREE.Ray ( orig,direction);
            if (i == 50)
            {
                console.log("test identity", this.lines[i].origin, this.lines[i].direction, orig, center);
            }
        }
    }    
    
    
    my_app.check_sphere = function (ray, sphere)
    {
        console.log("start checking....");
        var r = ray.intersectSphere(sphere);
        console.log("Result Cheking of Intersection method intersectSphere" , r);
        var r = ray.intersectsSphere(sphere);
        console.log("Result Cheking of Intersection method intersect(s)Sphere", r);
        
        if (!r) {
            console.log("\tIntersection not found. Sphere center was ", sphere.center, "and radius "+sphere.radius + "Line was ", ray.origin, ray.direction);
        }
        
    }
    
    my_app.get_changed_sphere = function (ps)
    {
        var sphere = new THREE.Sphere()
        sphere.copy( ps.boundingSphere );
        sphere.applyMatrix4( ps.matrixWorld ); 
        console.log("new position", ps.matrixWorld.getPosition());
        console.log("sphere after applied transform ", sphere.center);
        console.log("\tWarning! boundingSphere in object not changed!");        
        return sphere;
    }
    
   my_app.create_target = function ()
   {
        var sg = new THREE.SphereGeometry(1, 10, 10);
		var sm = new THREE.MeshBasicMaterial({color: 0xFF9900});
		var sphere = new THREE.Mesh(sg, sm);
		sphere.name = "target";
		sphere.position.set(0, 0, -10);
		this.main_scene.add(sphere);
    }

    
    my_app.test_rays_with_sphere = function ()
    {
        var sphere = new THREE.Sphere();
        sphere.center.set(0, 0, -10);
        sphere.radius = 1;
        this.test_rays(sphere);
    }
    
    
    my_app.test_rays = function (sphere)
    {
        var fail_count = 
        {
            one: 0,
            two: 0
        };
        for(var i =0; i < this.lines.length; i++) {
            var ray = this.lines[i];
            var r = ray.intersectSphere(sphere);
            var r2 = ray.intersectsSphere(sphere);
            if (!r) fail_count.one++;
            if (!r2) fail_count.two++;
        }
        console.log("fail count " + fail_count.one + ":"+fail_count.two + " \n \t sphere has position" + JSON.stringify(sphere.center) + " and radius " + sphere.radius);
    }

    
    my_app.create_scene = function ()
    {
        this.create_lines();
        this.create_target();
        this.test_rays_with_sphere();

        console.log("testing intersection of sphere and rays");
        var ps = new Particles_Points();
        ps.boundingSphere.radius = 1;
        ps.boundingSphere.center.set(0, 0, 0);
        var sphere = ps.boundingSphere;
        this.test_rays(sphere);
        
        /*
        var sphere = new THREE.Sphere();
        sphere.center.set(0, 0, -5);
        sphere.radius = 1;
        this.test_rays(sphere);
        
        var sphere = new THREE.Sphere();
        sphere.center.set(0, 0, 10);
        sphere.radius = 1;
        this.test_rays(sphere);
        
        var sphere = new THREE.Sphere();
        sphere.center.set(0, 0, -9);
        sphere.radius = 1;
        this.test_rays(sphere);
        
        var sphere = new THREE.Sphere();
        sphere.center.set(0, 0, -8);
        sphere.radius = 1;
        this.test_rays(sphere);*/
        
        var sphere = new THREE.Sphere();
        sphere.center.set(0, 0, -0.9);
        sphere.radius = 1;
        this.test_rays(sphere);

        
        //var ray = new THREE.Raycaster( lines[0].origin, lines[0].direction );        
        console.log("sphere has position ", sphere.center, " and radius ", sphere.radius);
                var ray = this.lines[0];
                ps.boundingSphere.radius = 10;
        console.log("\tstart checking", ray, ps.boundingSphere);
        this.check_sphere(ray, ps.boundingSphere);
        
        sphere.center.set(0, 0, -10);
        this.check_sphere(ray, ps.boundingSphere);
        
        console.log("and now add object to scene and apply transform to them");
        ps.boundingSphere.center.set(0, 0, 0);
        this.main_scene.add(ps);
        ps.position.set(3, 0, -25);
        ps.updateMatrixWorld(true);
        console.log("now bounding sphere must be out of reaching the lines");
        
        var sphere = this.get_changed_sphere(ps);
         this.check_sphere(ray, sphere);
        
        console.log("and now shifted sphrere");
        console.log(ps.position);
        ps.position.set(0, 0, -5);
        ps.updateMatrixWorld(true);
        var sphere = this.get_changed_sphere(ps);
        this.check_sphere(ray, sphere);
        
    }
    
    my_app.created = function () 
    {
        var self = this;
        this.create_scene();    
        this.loop();        
    }

    my_app.update = function (dt)
    {
        Application.prototype.update.call(this, dt);
        this.main_scene.update(dt);
    }
    
	
	var Particles_Demo = Application.extend(my_app);
    var app = new Particles_Demo();
    
    app.start();
    
