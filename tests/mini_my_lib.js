/*
*/


var My_Lib = {};


My_Lib.copy_object = function (dest, source)
{
	for(var key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			dest[key] = source[key];
		}
	}
}

My_Lib.create_clone_object = function (source)
{
	var obj = {};
	My_Lib.copy_object(obj, source);
	return obj;
}

My_Lib.copy_field_list = function (source, dest, list)
{
	var field;
	for(var i = 0; i < list.length; i++) {
		field = list[i];
		dest[field] = source[field];
	}
}

My_Lib.create_clone_field_list = function (source, list)
{
	var obj = {};

	var field;
	for(var i = 0; i < list.length; i++) {
		field = list[i];
		obj[field] = source[field];
	}
	
	return obj;
}


My_Lib.clone_field_list_one_level_recursion = function (source, dest, list)
{
	var field;
	for(var i = 0; i < list.length; i++) {
		field = list[i];
		if (typeof field === 'object') {
			dest[field] = My_Lib.create_clone_object(source[field]);
		} else {
			dest[field] = source[field];
		}
	}

}


My_Lib.extend_application = function (methods)
{
	var app = Object.create(My_Lib.Application.prototype);
	My_Lib.copy_object(app, methods);
	My_Lib.Application.call(app);
	return app;
}

My_Lib.extend_proto = function (proto, methods)
{
	var obj = Object.create(proto);
	My_Lib.copy_object(obj, methods);
	My_Lib.Application.call(obj);
	return obj;
}

/*
ugly hack
*/

My_Lib.event_hub = new Event_Hub();

function Event_Hub() {
    this.events = {};
}

Event_Hub.prototype.add_event_listener = function (name, func, obj)
{
    if (!this.events[name]) {
        this.events[name] = [];
    }
    this.events[name].push( {name: name, func: func, obj: obj} );
}

Event_Hub.prototype.emit = function(name, obj)
{
    var listeners = this.events[name];
    if (listeners) {
        for(var i = 0; i < listeners.length; i++) {
            var t = listeners[i];
            t.func.call(t.obj, obj);            
        }
    }
}


var run_function = //window.requestAnimationFrame;
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	}
	
    


My_Lib.create_run_function = function (app) 
{
    My_Lib.run = function () { run_function( function () { app.loop(); }); }
}

My_Lib.create_class = function(parent, child, props, name)
{
    if (parent) {
        child.prototype = Object.create(parent.prototype);
    } 
    My_Lib.copy_object(child.prototype, props);
    child.prototype.contructor = child;                
    My_Lib.Register_Class(child, name);
}



My_Lib.every_property = function(obj, callback) 
{
    if (!callback) {
        console.log("callback given every_property is undefined or null!")
        return;
    }
    for(var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            callback(key);
        }
    }
}
