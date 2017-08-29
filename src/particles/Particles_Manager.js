import {My_Lib} from '../base/my_lib.js';
import {Particle_Emitter} from './particle_emitter.js';
import {Particle_Affector} from './particle_affector.js';
import {Particles_Points} from './particles_points.js';
import {Particle_System} from './particles.js';


 function Particle_Manager ()
{
	this.particles = {};
    this.particles_array = [];
}

_.copy_object(Particle_Manager.prototype, 
    {
    constructor: Particle_Manager,
    add:  function (ps,name)
    {
        if (!this.particles[name]) {
            this.particles[name] = ps;
            this.particles_array.push(ps);
        }
    },
    remove_particles:  function (name)
    {
        var ps = this.particles[name];
        var i = this.particles_array.indexOf(ps);
        if (i >= 0) {
            this.particles_array.splice(i, 1);
        }
        if (ps) {
            ps.suicide();
            delete this.particles[name];
        }
    },
    get_particle_names:  function ()
    {
        var names = [];
        for(var key in this.particles) {
            names.push(key);
        }
        return names;
    },

    update : function (dt)
    {
        for(var i = 0; i < this.particles_array.length; i++) {
            this.particles_array[i].update(dt);
        }
    },
    
    create_by_params: function (params)
    {
        var ps = new Particle_System(params);
        this.add(ps);
        return ps;
    },


    toJSON : function ()
    {
        var arr = []
        
        var data;
        var p;
        for(var key in this.particles){
            p = this.particles[key];
            if (p.uuid) {
                data = p.toJSON();
                arr.push(data);
            }
        }

        return arr;
    },

    emitter_fabric:  function (params)
    {
        if (params.emitter) {
            var emitter = My_Lib.Get_Class(params.emitter.name);
            if (emitter) {
                emitter = new emitter();
            } else {
                emitter = new Particle_Emitter();
            }
            emitter.parse(params.emitter.params);
            return emitter;        
        } 
        return undefined;
    },

    affector_fabric:  function (params)
    {
        if (params.affector) {
            var affector = My_Lib.Get_Class(params.affector.name);
            if (affector) {
                affector = new affector();
            } else {
                affector = new Particle_Affector();
            }
            affector.parse(params.affector.params);
            return affector;
        }
        return undefined;
    },

    fromJSON: function (json, callback, root, name)
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
        
        return this.parse(data, root, name);
    },


    parse: function (data, root, name)
    {
        var emitter = this.emitter_fabric(data.params);
        var affector = this.affector_fabric(data.params);
        data.params.emitter = emitter;
        data.params.affector = affector;
        
        var ps = new Particle_System(data.params);
        ps.set_name(data.name);

            //add to scene graph
        if (data.params.parent) {
            var parent = root.getObjectByName(data.params.parent);
            //console.log(data.params.parent, "parent particles", name, root);
            parent.add(ps.node);
        } else {
           root.add(ps.node);
        }

        //ugly fucking hack
        //copy node properties
        this.add(ps, name);    
        return ps;
    },

    load_particles:  function (json, root)
    {
        var particles = json.particles;
        for(var i =0; i < particles.length; i++)
        {
            var p = particles[i];
            var ps = this.parse(p, root, p.name);
            ps.node.uuid = p.node;
            ps.node.name = p.name;
            var obj = root.getObjectByProperty("uuid", p.node);
            if (obj) {
                ps.node.replace_object_with_this(obj);
            }
        }
    },

    create_name:  function ()
    {
        var number = this.particles_array.length + 1;
        var begin_name = 'Particle_System_';
        var testing = true;
        while (testing) {
            name = begin_name + number;
            if (this.particles[name] !== undefined) {
                number ++;
            } else {
                return name;
            }
        }
    },

    create_new : function ()
    {
        var name = this.create_name();
        
        var params = {};
        var ps = new Particle_System(params);
        ps.set_name(name);
        this.add(ps, name);
        return ps;
    }
});


if (My_Lib.particle_manager === undefined) 
{
    My_Lib.particle_manager = new Particle_Manager();
}

My_Lib.Particles_Config = {
"box_size": 10
};


export {Particle_Manager};