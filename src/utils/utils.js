/*
*/

var new_lib = {};

function get_old_lib(new_lib) {
    if (typeof _ !== undefined) 
    {
        new_lib.old = _
    }
}

var _ = new_lib;


(function (My_Lib)
{

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

}) (_);