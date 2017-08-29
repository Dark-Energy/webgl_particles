import {My_Lib} from './my_lib.js';

//events: 
//item_loaded
//onerror
//onprogress
//finished
function Chain_Loader()
{
}

Chain_Loader.prototype = {
	constructor: Chain_Loader,
	start: function (list) 
	{
		this.list = list;
		this.index = 0;
		this.load(this.list[0]);
		this.stop_by_error = false;
	},
	
	next: function(resource)
	{
		if (this.item_loaded && resource) {
			this.item_loaded(resource,this.list[this.index]);
		}
		this.index++;
		if (this.index < this.list.length) {
			this.load(this.list[this.index]);
		} else {
			if (this.finished) {
				this.finished();
			}
		}
	},
	
	do_error: function (error)
	{
		if (this.onerror) {
			this.onerror(error);
		} else {
			console.error("Chain Loader Error!", error);
		}
		if (!this.stop_by_error) {
			this.next();
		}
	},
	
	do_progress: function ()
	{
		if (this.onprogress) {
			this.onprogress.apply(this, arguments);
		}
	},
		
	load: function (item)
	{
		var self = this;
		if (this.load_func) {
			this.load_func(item, 
			function (item) { self.next.apply(self, arguments); },
			function (item) { self.do_error.apply(self, arguments); },
			function (item) { self.do_progress.apply(self, arguments); });
		}
	}
};


function test_chain_loader() 
{
	var cl = new Chain_Loader();
	cl.item_loaded = function (item) {console.log("load item ", item);}
	cl.finished = function (item) {console.log("loader manager - job done");}
	cl.load_func = function (item, next, error, progress) { 
		if (item) {
			next(item);
		} else {
			error(item);
		}
	}
	cl.start(["first", "second", null, "tree"]);
}
//test_chain_loader();




function Loading_Manager ()
{
	this.resources = {};
	this.texture_loader = new THREE.TextureLoader();
}

Loading_Manager.prototype = {
	constructor: Loading_Manager,
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
		texture = this.texture_loader.load(name, function (texture)
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
		
		var cl = new Chain_Loader();
		var self = this;
		cl.onerror = function (error) {
			console.error("ERROR loading texture", error, cl.list[cl.index]);	
		}
		cl.item_loaded = function (resource, name) {
			self.resources[name] = resource;
			if (self.on_resource_loaded) {
				self.on_resource_loaded(resource);
			}
		}
		cl.on_progress = function () {
			if (on_progress) {
				on_progress();
			}
		}
		cl.load_func = function () {
			load_func.apply(this, arguments);
		}
		cl.finished = function ()
		{
			if (on_load) {
				on_load();
			}
		}
		cl.start(resource_list);
		
	},

	load_list_textures: function (resource_list, on_load)
	{
		var self = this;
		this.load_list(resource_list, on_load, function (url, next, error, progress ) 
		{
			var texture = self.texture_loader.load(url, next, progress, error);
		});
	},

	load_list_json: function (resource_list, on_load, progress)
	{
		var self = this;
		var loader = new THREE.XHRLoader();	
		this.load_list(resource_list, on_load, function (url, next, error, progress) 
		{
			var texture = loader.load(url, next, progress, error);
		}, progress);
	},
	
	free: function ()
	{
		this.resources = {};
	}
};


My_Lib.Texture_Manager = new Loading_Manager();	

export { Loading_Manager };