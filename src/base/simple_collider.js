function Simple_Collider(root, params)
{
    this.root = root;
    if (params === undefined) {
        params = {};
    }
    this.params = 
    {
        recursive: params.recursive === undefined ? true : params.recursive,
        check_invisible: params.check_invisible === undefined ? true : params.check_invisible 
    };
    this.intersected_objects = [];
    this._tested_sphere = new THREE.Sphere();    
}

Simple_Collider.prototype.prepare_check = function (ray)
{
    this.intersected_objects = [];
    this.intersected_map = {};
    this._fakecaster = {ray: ray};    
}

Simple_Collider.prototype.check_ray = function (ray)
{
    this.prepare_check(ray);
    
    this.find_intersection_with_bounding_sphere( this.root); 
    
    return this.intersected_objects;
}

Simple_Collider.prototype.add_intersected = function (obj)
{
    if (!this.intersected_map[obj.uuid]) {
        this.intersected_map[obj.uuid] = obj;
        this.intersected_objects.push(obj);
    }
}

Simple_Collider.prototype.check_object_bounding_sphere = function(obj)
{
    //get bounding sphere
    if (obj.getBoundingSphere) {
        this._tested_sphere.copy( obj.getBoundingSphere() );
    } else if (obj.geometry)  {
        //fuck this shit, why don't exists method getBoundingSphere, which encapsulates this?
        if ( obj.geometry.boundingSphere === null ) obj.geometry.computeBoundingSphere();
         //copy sphere from object geometry and transform it with object. matrixWorld
        this._tested_sphere.copy( obj.geometry.boundingSphere );
        //console.log("get bounding sphere", this._tested_sphere);
    } else {
        return false;
    }

    //test bounding spere
    obj.updateMatrixWorld(true);        
    this._tested_sphere.applyMatrix4( obj.matrixWorld );
    //find intersection
    var inter = this._fakecaster.ray.intersectsSphere( this._tested_sphere );
    //console.log("inter with sphere, level", level, inter, sphere.center, raycaster.ray);
    //add to intersected list, if success
    if (inter) {
        this.intersected_objects.push(obj);
        return true;
    } else {
        return false;
    }
}


Simple_Collider.prototype.find_intersection_with_bounding_sphere = function(object, top ) {

    if ( !object.non_collideble && (object.visible || this.params.check_invisible)) {
        this.check_object_bounding_sphere(object);
    }
    if ( !this.params.recursive) return;
    
    
    //test children
    var children = object.children;
    for ( var i = 0; i < children.length; i ++ ) {
        var child = children[i];
        this.find_intersection_with_bounding_sphere( child );
    }
}



export {Simple_Collider};