function Mix_It()
{

	//FIX
	THREE.Vector3.prototype.applyMatrix4_rotation = function ( m ) 
	{
		// input: THREE.Matrix4 affine matrix

		var x = this.x, y = this.y, z = this.z;
		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		return this;
 	}

var Object3D_Animation_Mixin = {
    
    add_animation: function (anim)
    {
        if (!this.animations) {
            this.animations = [];
        }
        if (this.animations.indexOf(anim) < 0) {
            this.animations.push(anim);
        }
    },
    
    remove_animation: function (anim)
    {
        if (this.animations) {
            var i = this.animations.indexOf(anim);
            if (i > -1) {
                this.animations.splice(i, 1);
            }
        }
    },
    
    update:  function (dt)
    {
        if (this.animations !== undefined) {
            for(var i =0; i < this.animations.length; i++) {
                var anim = this.animations[i];
                anim.update(dt);
                anim.apply(this);
            }
        }
    
        for(var i = 0; i < this.children.length; i++) {
            var obj = this.children[i];
            if (obj.update) {
                obj.update(dt);
            }
        }
    },
    
    
};
_.copy_object(THREE.Object3D.prototype, Object3D_Animation_Mixin);


THREE.Object3D.prototype.old_toJson = THREE.Object3D.toJSON;

var Object3D_Serialization_Mixin = 
{
    standard_serialization: function (meta) 
    {
		// standard Object3D serialization
		var object = {};

		object.uuid = this.uuid;
		object.type = this.type;
		if ( this.name !== '' ) object.name = this.name;
		if ( JSON.stringify( this.userData ) !== '{}' ) object.userData = this.userData;
		if ( this.castShadow === true ) object.castShadow = true;
		if ( this.receiveShadow === true ) object.receiveShadow = true;
		if ( this.visible === false ) object.visible = false;

		object.matrix = this.matrix.toArray();
        

        if (this.type !== "particles_points")
        {
            if (this.geometry !== undefined) {
                object.geometry = this.geometry.uuid;
            }
            if ( this.material !== undefined ) {
                object.material = this.material.uuid;
            }
            
            if ( this.material !== undefined  &&  meta.materials[ this.material.uuid ] === undefined ) {
                    meta.materials[ this.material.uuid ] = this.material.toJSON( meta);
            }

            if ( this.geometry !== undefined && meta.geometries[ this.geometry.uuid ] === undefined ) {
                    meta.geometries[ this.geometry.uuid ] = this.geometry.toJSON( meta );
            }
        }
        
        if (this.animations) {
            object.animations = [];
            for(var i =0; i < this.animations.length; i++) {
                object.animations.push ( this.animations[i].uuid );
            }
        }
        
		if ( this.children.length > 0 ) {
			object.children = [];
			for ( var i = 0; i < this.children.length; i ++ ) 
            {
                var child = this.children[ i ];
				//object.children.push( child.standard_serialization( meta ) );
                object.children.push( child.toJSON( meta ) );
			}
		}
        return object;
    },
    
    collect_materials: function (meta) 
    {
		if ( this.material !== undefined  &&  meta.materials[ this.material.uuid ] === undefined ) {
                meta.materials[ this.material.uuid ] = this.material.toJSON( meta);
		}
        
		for ( var i = 0; i < this.children.length; i ++ ) {
			this.children[ i ].collect_materials(meta);
		}
    },
    
    collect_geometry: function (meta)
    {
		if ( this.geometry !== undefined && meta.geometries[ this.geometry.uuid ] === undefined ) {
				meta.geometries[ this.geometry.uuid ] = this.geometry.toJSON( meta );
		}

		for ( var i = 0; i < this.children.length; i ++ ) {
			this.children[ i ].collect_geometry(meta);
		}
    },
    
	toJSON1: function ( meta ) {
    
		// extract data from the cache hash
		// remove metadata on each item
		// and return as array
		function extractFromCache( cache, t ) {
			var values = [];
			for ( var key in cache ) {
				var data = cache[ key ];
				delete data.metadata;
				values.push( data );
			}
			return values;
		}
    

        this.updateMatrixWorld(true);
        
		// meta is '' when called from JSON.stringify
		var isRootObject = ( meta === undefined || meta === '' );

		var output = {};

		if ( isRootObject ) {

            meta = {
				geometries: {},
				materials: {},
				textures: {},
				images: {}
			};
            
            
            //this.collect_materials(meta);
            //this.collect_geometry(meta);
            var object = this.standard_serialization(meta);
            
            
			output.metadata = {
				version: 4.4,
				type: 'Object',
				generator: 'Object3D.toJSON'
			};

			var geometries = extractFromCache( meta.geometries, "geoim" );
			var materials = extractFromCache( meta.materials, "materials" );
			var textures = extractFromCache( meta.textures, "textures" );
			var images = extractFromCache( meta.images, "images" );

			if ( geometries.length > 0 ) output.geometries = geometries;
			if ( materials.length > 0 ) output.materials = materials;
			if ( textures.length > 0 ) output.textures = textures;
			if ( images.length > 0 ) output.images = images;

            var anims = this.collect_animations(this);
            if (anims.count > 0) {
                output["myanimations"] = anims;
            }
           
            output.object = object;
		} else {
            output.object = this.standard_serialization(meta);
            output.type = this.type;
            if (output.object === undefined) {
                console.log("i am undefined", this);
            }
        }

		return output;


	},
    
    collect_animations: function (scene)
    {
        var data = {
            animations : {},
            bindings : [],
            count: 0
        };
        
        function collect_animations_recursive(root)
        {
            if (root.animations) {
                for(var i =0; i < root.animations.length; i++) {
                    var anim = root.animations[i];
                    if (data.animations[ anim.uuid ] === undefined) {
                        data.animations[ anim.uuid] = anim.toJSON() ;
                        data.count++;
                    }
                }
                
                var bind = {};
                bind.uuid = root.uuid
                bind.animations = [];
                for(var i =0; i < root.animations.length; i++) {
                    bind.animations.push( root.animations[i].uuid);
                }
                data.bindings.push(bind);
            }
            
            if (root.children) {
                for(var i = 0; i < root.children.length; i++) {
                    collect_animations_recursive( root.children[i] );
                }
            }
        }
        collect_animations_recursive(scene);
        return data;
    },
    
 
};


  _.copy_object(THREE.Object3D.prototype, Object3D_Serialization_Mixin);
  
    

//replace source with this
THREE.Object3D.prototype.replace_object_with_this = function ( source ) {

    this.uuid = source.uuid;
    this.name = source.name;

    this.up.copy( source.up );
    this.position.copy( source.position );
    this.quaternion.copy( source.quaternion );
    this.scale.copy( source.scale );

    this.matrix.copy( source.matrix );
    this.matrixWorld.copy( source.matrixWorld );

    this.matrixAutoUpdate = source.matrixAutoUpdate;
    this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

    this.visible = source.visible;

    this.castShadow = source.castShadow;
    this.receiveShadow = source.receiveShadow;

    this.frustumCulled = source.frustumCulled;
    this.renderOrder = source.renderOrder;

    this.userData = JSON.parse( JSON.stringify( source.userData ) );

    //copy array of children, not clone
    for ( var i = 0; i < source.children.length; i ++ ) {
        this.add( source.children[ i ] );
    }
    source.parent.add(this);
    source.parent.remove(source);
    
    this.animations = source.animations;
}


}

Mix_It();

export {Mix_It};