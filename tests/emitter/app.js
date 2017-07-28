var Particles_Demo = Application.extend( {
    created: function () {

        //var emitter = new Cone_Emitter();
        var emitter = new My_Lib.Particle_Emitter();
        emitter.emit_per_second = 10;
        emitter.origin = {x: 0, y: 0, z: -20};
        var params = 
        {
            count: 200,
            size: 0.2,
            particle_lifetime: 10,
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
        ps.node.position.set(0, 0, -10);
        //ps.node.rotation.z = Math.PI/2.0;
        //ps.node.rotation.x = -Math.PI/4.0;
        //ps.node.rotation.y = -Math.PI/4.0;
    }
    ,
    update: function (dt)
    {
        Application.prototype.update.call(this, dt);
        this.ps.node.rotation.z += dt*2
        this.ps.node.rotation.x += dt*2
        this.ps.node.rotation.y += dt*2
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
    
