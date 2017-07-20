function State()
{
}

State.prototype.remove_particles = function (id)
{
    My_Lib.particle_manager.remove_particles(id);
}

State.prototype.get_particles = function (id)
{
    return My_Lib.particle_manager.particles[id];
}


State.prototype.set_new_params = function (id, params)
{
    var ps = My_Lib.particle_manager.particles[id];
    
    ps.set_particle_life_length(params.life_length);
    ps.set_emission_per_second(params.emit_per_second);
    ps.set_particle_count(params.count);
}

State.prototype.get_particles_list = function (particles)
{
    if (typeof particles === 'undefined') {
        particles = new Array();
    }
	for(var key in My_Lib.particle_manager.particles) {
		particles.push( {"value": key} );
    }
    return particles;
}