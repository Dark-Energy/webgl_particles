My_Lib.Loading_Manager = function ()
{
	this.resources = {};
	this.texture_loader = new THREE.TextureLoader();
}

My_Lib.Loading_Manager.prototype = {
	constructor: My_Lib.Loading_Manager,
	get: function (name)
	{
		return this.resources[name];
	},
	
	get_async: function (name, callback)
	{
		//already loaded?
		var texture = this.get(name);
		if (texture) {
			if (callback) {
				callback(texture);
			}
			return texture;
		}

		//if not load this async
		var self = this;
		texture = this.texture_loader.load(url, function (texture)
		{
			if (callback) {
				callback(texture);
			}
		});
		this.resources[name] = texture;	
		return texture;
	},

	load_list: function (resource_list, on_load, load_func, on_progress)
	{
		var self = this;
		
		var resource_index = 0;
		
		function step(resource)
		{
			resource_index++;
			if (resource_index < resource_list.length) {
				if (self.on_resource_loaded) {
					self.on_resource_loaded(resource);
				}
				load_func(resource_list[resource_index], next, progress, error);
			} else {
				if (on_load) {
					on_load();
				}
			}
		}
		
		function next(loaded_resource)
		{
			self.resources[resource_list[resource_index]] = loaded_resource;
			step(loaded_resource);
		}

		function error(error) 
		{
			console.log("ERROR loading texture", error, resource_list[resource_index]);
			step();
		}
		function progress()
		{
			if (on_progress) {
				on_progress();
			}
		}
		
		load_func(resource_list[0], next, progress, error);
	},

	load_list_textures: function (resource_list, on_load)
	{
		var self = this;
		this.load_list(resource_list, on_load, function (url, next, progress, error) 
		{
			var texture = self.texture_loader.load(url, next, progress, error);
		});
	},

	load_list_json: function (resource_list, on_load, progress)
	{
		var self = this;
		var loader = new THREE.XHRLoader();	
		this.load_list(resource_list, on_load, function (url, next, progress, error) 
		{
			var texture = loader.load(url, next, progress, error);
		}, progress);
	},
	
	free: function ()
	{
		this.resources = {};
	}
};


My_Lib.Texture_Manager = new My_Lib.Loading_Manager();	