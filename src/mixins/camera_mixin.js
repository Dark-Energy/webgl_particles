import {Mouse_Camera_Controller} from '../base/mouse_camera_controller.js';

function Mixin()
{

    //need for unproject object and dragging
    THREE.PerspectiveCamera.prototype.get_forward_plane_by_object = function (obj)
    {
        var z = new THREE.Vector3();
        z.setFromMatrixColumn( this.matrixWorld, 2 );
        var dist = obj.position.dot(z);             
        var plane= new THREE.Plane(z.negate(), dist);
        return plane;
    }

    
    THREE.PerspectiveCamera.prototype.get_ray_from_screen_coordinates = function (canvas, x,y)
    {
        var mc = new Mouse_Camera_Controller(canvas, this);
        var ray = mc.get_ray_from_camera_in_screen_coordinates(x,y);
        return ray;
    }

    
}

Mixin();
export {Mixin};