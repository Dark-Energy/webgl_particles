    
function Particles_Points (geometry, material)
{
    THREE.Points.call(this, geometry, material);
    this.type = 'particles_points';
    
    this.boundingSphere = new THREE.Sphere();
    this.boundingSphere.radius = 10.0;
}

Particles_Points.prototype = Object.create( THREE.Points.prototype )

Particles_Points.prototype.constructor = Particles_Points;

Particles_Points.prototype.toJSON = function (meta)
{
    var mat = this.material;
    var geom = this.geometry;
    this.material = undefined;
    this.geometry = undefined;
    var object =  THREE.Object3D.prototype.toJSON.call(this, meta);
    this.material = mat;
    this.geometry = geom;
    return object;
}

Particles_Points.prototype.raycast = function (raycaster, intersects)
{
    var sphere = new THREE.Sphere()
    sphere.copy( this.boundingSphere );
    sphere.applyMatrix4( this.matrixWorld ); 
    var r = raycaster.ray.intersectsSphere( sphere );
    if ( r === false ) return;
    console.log("INTERSECTION1", this.name, sphere);
    return;
    
    var shit  = new THREE.Vector3();
    shit.copy(this.position);
    var tr = new THREE.Ray( new THREE.Vector3(0, 0, 20), shit);
    console.log("test ", tr.intersectsSphere(sphere), sphere);
    console.log("hit sphere "  + this.name, sphere, raycaster.ray);
    return raycaster.ray.intersectsSphere( sphere );
    
    
    console.log("hit sphere " + this.type, "shpere is ", sphere, "ray is ", r);
    if (r) {
            var tmp = new THREE.Vector3(this.position);
            tmp.sub(r);
   			intersects.push( {
				distance: Math.sqrt( tmp.dot(tmp) ),
				point: this.position,
				object: this
			} ); 
    }
}



