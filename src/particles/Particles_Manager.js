My_Lib.Particle_Manager_Class = function ()
{
	this.particles = {};
}


My_Lib.Particle_Manager_Class.prototype.fromJSON = function (json, callback, root, name)
{
	if (this.particles[name]) {
		console.log("WARNING Particle Manager! Particle System with this name already exists", name);
	}
	
	try
	{
		var data = JSON.parse(json);
	}
	catch (e)
	{
		console.log("error parsing json on ", name, json);
		throw e;
	}
	if (data.params.emitter) {
		var emitter = My_Lib.Get_Class(data.params.emitter.name);
		if (emitter) {
			emitter = new emitter();
		} else {
			emitter = new My_Lib.Particle_Emitter();
		}
		emitter.parse(data.params.emitter.params);
		data.params.emitter = emitter;
	} 
	
	
	if (data.params.affector) {
		var affector = My_Lib.Get_Class(data.params.affector.name);
		if (affector) {
			affector = new affector();
		} else {
			affector = new My_Lib.Particle_Affector();
		}
		affector.parse(data.params.affector.params);
		data.params.affector = affector;
	}
	var ps = new My_Lib.Particle_System(data.params);
	My_Lib.Texture_Manager.get_async(data.params.texture, callback);
    
    if (data.params.parent) {
        var parent = root.getObjectByName(data.params.parent);
        parent.add(ps.node);
    } else {
       root.add(ps.node);
    }
    
	if (callback) {
		callback(ps);
	}
	this.particles[name] = ps;	
	return ps;
}

My_Lib.Particle_Manager_Class.prototype.load_scene = function (json, callback, root)
{

	var list = [];
	for(var key in json) {
		if (Object.prototype.hasOwnProperty.call(json, key)) {
			list.push( {key: json[key]} );
		}
	}
	
	var cl = new My_Lib.Chain_Loader();
	var self = this;
	cl.item_loaded = function (item, name)
	{
		self.particles[name] = item;
	}
	cl.finished = function () 
	{
		if (callback) { callback();}
	}
	cl.load_func = function (item, next) {
		self.fromJSON(item, function () {next();}, root, cl.list[cl.index]);
	}
}

My_Lib.Particle_Manager_Class.prototype.get_particle_names = function ()
{
	var names = [];
	for(var key in this.particles) {
		names.push(key);
	}
	return names;
}

My_Lib.Particle_Manager_Class.prototype.remove_particles = function (name)
{
	var ps = this.particles[name];
	if (ps) {
		ps.suicide();
		delete this.particles[name];
	}
}

My_Lib.particle_manager = new My_Lib.Particle_Manager_Class();

My_Lib.Particles_Config = {
"box_size": 10
};
