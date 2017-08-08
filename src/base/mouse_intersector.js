var Mouse_Intersector = {};

Mouse_Intersector.mouse_coords_to_vector = function (canvas, event) 
{
	var offset = canvas.getBoundingClientRect();
	var width = canvas.clientWidth;
	var height = canvas.clientHeight;
    //normalize coordinates
    var x = (event.clientX - offset.left) / width;
    var y = (event.clientY - offset.top) / height;
	var x = x * 2 - 1;
	var y = -(y * 2 - 1);
    //console.log("mouse coords",  x,y, );    
	var vector = new THREE.Vector3( x, y, 1 );
	return vector;
}


Mouse_Intersector.unproject = function(vector, camera)
{
    var r = new THREE.Vector3();
    r.copy(vector);
    r.z = 1;
	r.unproject(camera);
    r.applyMatrix4(camera.matrixWorldInverse);    
    return r;
}

Mouse_Intersector.mouse_coords_to_ray = function (canvas, event, camera) 
{
	var offset = canvas.getBoundingClientRect();
	var width = canvas.clientWidth;
	var height = canvas.clientHeight;
	var x = ((event.clientX - offset.left) / width) * 2 - 1;
	var y = -(((event.clientY - offset.top) / height) * 2 - 1);
	var vector = new THREE.Vector3( x, y, 1 );

	vector.unproject(camera);
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	return ray;
}



Mouse_Intersector.find_intersection_with_mouse_vector = function(vector, camera, scene)
{
	vector.unproject(camera);
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	// create an array containing all objects in the scene with which the ray intersects
	//var intersects = ray.intersectObjects( [grid_text.root], true ); 
	//console.log(fake_plane.root.children[0].geometry);
	var intersects = ray.intersectObjects( [scene], true ); 
	return intersects;
}


export { Mouse_Intersector };