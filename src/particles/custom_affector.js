Custom_Affector = function ()
{
	My_Lib.Particle_Affector.apply(this, arguments);
    this.custom_func = function dummy () {return true;};
}

My_Lib.create_class(My_Lib.Particle_Affector, Custom_Affector, {
   	affect: function (dt, pdata, vert)
	{
        return this.custom_func(dt, p, vert);
	},
    test_func: function () {
        var p = {
            position: {x: 0, y: 0, z: 0},
            velocity: {x: 0, y: 0, z: 0}
        };
        var color = {r: 0, g: 0, b: 0};
        this.custom_func(p, color);
    },
    set_affect_function: function (source) {    
        if (typeof source === 'function') {
            this.custom_func = source;
        } else if (typeof source  === 'string') {
            try {
                this.custom_func = new Function ('dt,p,vert', source);
                this.test_func();
            }
            catch (e) {
                alert(e);
                this.custom_func = undefined;
            }
            this.source_code = source;
        }
    },
    
	toJSON: function ()
	{
        var data = {
            name: "Custom_Affector"
        };
		data.params = My_Lib.Particle_Affector.prototype.toJSON.call(this, this);
		params["source_code"] = this.source_code;
		return data;
	},
	parse: function (json)
	{
		My_Lib.Particle_Affector.prototype.parse(this, json);
		this.set_affect_func(json.source_code);
	}

}, "Custom_Affector");