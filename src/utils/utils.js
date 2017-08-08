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


    // http://www.broofa.com/Tools/Math.uuid.htm
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
	var uuid = new Array( 36 );
	var rnd = 0, r;

My_Lib.generateUUID = function() {
        for ( var i = 0; i < 36; i ++ ) {
            if ( i === 8 || i === 13 || i === 18 || i === 23 ) {
                uuid[ i ] = '-';
            } else if ( i === 14 ) {
                uuid[ i ] = '4';
            } else {
                if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[ i ] = chars[ ( i === 19 ) ? ( r & 0x3 ) | 0x8 : r ];
            }
        }
        return uuid.join( '' );
	} 
    
My_Lib.clone_array = function(src)
{
    var r = new Array(src.length);
    for(var i = 0; i < src.length; i++) {
        r[i] = src[i];
    }
    return r;
}


My_Lib.get_first_key = function(obj)
{
	for(var key in obj) {
		if (obj.hasOwnProperty(key)) {
			return key;
		}
	}
}


My_Lib.travers_scene = function(root, func)
{
    function recursive(root) 
    {
        func(root);
        for(var i = 0; i < root.children.length; i++) {
            recursive(root.children[i]);
        }
    }
    
    recursive(root);
}


}) (_);

//export default new_lib;