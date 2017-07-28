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

var old_set_configuration = Application.prototype._set_configuration;
console.log("old", app._set_configuration);
app._set_configuration = function (config)
{
    console.log("set configuration get params", config);
    old_set_configuration.call(this, config);
}

var old_apply_configuration = Application.prototype.apply_configuration;
app.apply_configuration = function (config)
{
    console.log("apply configuration ", config);
    old_apply_configuration.call(this, config);
}
	
    

    app.start({clear_color: "#000000"});
    
    app.loop();
    
