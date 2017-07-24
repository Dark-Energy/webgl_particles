var Particles_Demo = Application.extend( {
    created: function () {
        var box = new THREE.BoxGeometry( 10, 10, 10, 1, 1, 1);
        
      var count = 6;
    var vertices = new Float32Array(count * 3); // position
    var points = [
    [-5, -5, 5],
    [-5, 5, 5],
    [-5, 5, 5],
    [5, 5, 5],
    [5, 5, 5],
    [5, -5, 5]
    ];
    
    for(var i = 0; i < count; i++) {
        vertices[i*3 + 0] = points[i][0];
        vertices[i*3 + 1] = points[i][1];
        vertices[i*3 + 2] = points[i][2];
    };
    
    vertices = new THREE.BufferAttribute(vertices, 3);
   	var geom = new THREE.BufferGeometry(); 	
    geom.addAttribute('position', vertices);
    
    
/*    
var geom = new THREE.Geometry();
geom.vertices.push(
	new THREE.Vector3( -10, 0, 0 ),
	new THREE.Vector3( 0, 10, 0 ),
	new THREE.Vector3( 10, 0, 0 )
);
*/        
        var mat = new THREE.LineBasicMaterial( {
            color: 0xFF0000,
            });
            
        var m = new THREE.Line(geom, mat);
        
        m.position.set(0, 0, -20);
        
        this.main_scene.add(m);
        
    }
});


	
    var app = new Particles_Demo();
    

    app.start();
    
    app.loop();
    
