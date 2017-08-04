
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

    my_app.create_scene = function ()
    {
        var delta = Math.PI * 2.0 / 100
        var angle = 0;
        var radius = 10;
        var min_radius = 0;
        var center = new THREE.Vector3(0, 0, -10);
        for(var i =0; i < 100; i++) {
            var x = Math.cos(angle); 
            var y = Math.sin(angle); 
            var z = -10;
            angle += delta;
            
            
            var orig = new THREE.Vector3(x*radius, y*radius, z);
            center.x = x * min_radius;
            center.y = y * min_radius;
            this.create_line(orig, center);
        }
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
    
