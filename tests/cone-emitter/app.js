var Particles_Demo = Application.extend( {
    created: function () {

        var emitter = new Cone_Emitter();
        emitter.emit_per_second = 100;
        emitter.origin = {x: 0, y: 0, z: 0};
        emitter.velocity = {x:0, y: 5, z: 0};
        emitter.dispersion = {min: 2, max: 7, delta: 5}
        emitter.speed = {min: 10, max: 20, delta: 10}
        var params = 
        {
            count: 200,
            size: 0.5,
            particle_lifetime: 1,
            emitter,
            color: {r:1, g: 1, b: 0},
            blending: "no",
            
        };
        var ps = new My_Lib.Particle_System(params);
        this.ps = ps;
        
        ps.update = function (dt)
        {
            this.update_particle_geometry(dt);
        }
        
        this.main_scene.add(ps.node);
        this.add_animated_object(ps); 
        ps.node.position.set(0, 0, -50);
    }
    ,
    update: function (dt)
    {
        Application.prototype.update.call(this, dt);
        this.ps.node.rotation.x += dt*2
        this.ps.node.rotation.z += dt*2        
        //this.ps.node.rotation.y += dt*2
    }
});

var old_emit = My_Lib.Particle_Emitter.prototype.emit;

var first = true;
My_Lib.Particle_Emitter.prototype.emit = function (p, c, matrix)
{
    if (first) {
        console.log("emit ", matrix);
        first = false;
    }
    old_emit.apply(this, arguments);
}

var app = new Particles_Demo();


    app.start();
    app.loop();
    
