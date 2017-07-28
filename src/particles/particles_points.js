    
function Particles_Points (geometry, material)
{
    THREE.Points.call(this, geometry, material);
    
    this.boundingSphere = new THREE.Sphere();
    this.boundingSphere.radius = 10.0;
}

Particles_Points.prototype = Object.create( THREE.Points.prototype )

Particles_Points.prototype.constructor = Particles_Points;

Particles_Points.prototype.raycast = function (raycaster, intersects)
{
    var sphere = new THREE.Sphere()
    sphere.copy( this.boundingSphere );
    sphere.applyMatrix4( this.matrixWorld ); 
    var r = raycaster.ray.intersectsSphere( sphere );
    //console.log(sphere, r, raycaster.ray);
    return r === false;
}
