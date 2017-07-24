var Particles_Demo = Application.extend( {
    created: function () {
        var box = new THREE.BoxGeometry( 10, 10, 10, 1, 1, 1);
        
        var mat = new THREE.MeshBasicMaterial( {
            color: 0xFF0000,
            wireframe: true
            });
            
        var m = new THREE.Mesh(box, mat);
        
        m.position.set(0, 0, -20);
        
        this.main_scene.add(m);
        
    }
});


	
    var app = new Particles_Demo();
    

    app.start();
    
    app.loop();
    
