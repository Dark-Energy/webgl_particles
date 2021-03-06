var Mouse_Intersector = {};

import {Simple_Collider} from "./simple_collider.js";
import {Mouse_Camera_Controller} from './mouse_camera_controller.js';


Mouse_Intersector.get_normalized_screen_coords = function (canvas, x, y)
{
	var offset = canvas.getBoundingClientRect();
	var width = canvas.clientWidth;
	var height = canvas.clientHeight;
    //normalize coordinates
    var x = (x - offset.left) / width;
    var y = (y - offset.top) / height;
	var x = x * 2 - 1;
	var y = -(y * 2 - 1);
	var vector = new THREE.Vector3( x, y, 1 );
	return vector;
}

Mouse_Intersector.mouse_coords_to_vector = function (canvas, event) 
{
    return this.get_normalized_screen_coords(canvas, event.clientX, event.clientY);
}


Mouse_Intersector.unproject = function(vector, camera)
{
    var r = new THREE.Vector3();
    r.copy(vector);
	r.unproject(camera);
    //this done yet
    //r.applyMatrix4(camera.matrixWorldInverse);    
    return r;
}

Mouse_Intersector.mouse_coords_to_ray = function (canvas, event, camera) 
{
    var vector = this.mouse_coords_to_vector(canvas, event);
    vector = this.unproject(vector, camera);
	var ray = new THREE.Ray( camera.position, vector.sub( camera.position ).normalize() );
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


Mouse_Intersector.find_intersected_object = function (scene, ray)
{

    var collider = new Simple_Collider(scene);
    var intersects = collider.check_ray(ray);
    return intersects;
}


export { Mouse_Intersector };