//Unfortunately, canvas properties can change permanenty. 
//Because, you need do refresh_canvas on each call!
//each time you need recacl BoundingRect and clientRect of the fucking canvas
//also, camera may be not that camera, who render scene. it may be other camera
//because you need refresh camera on eash call
//i could done this normal function, but this object may do different job
//this is single-time object
//it easy economyfy number of arguments on calling functions

//not, this class doesn't store reference to canvas, 
//this store only information about canvas size and position 
//i.e. BoundingClientRect and clientWidth,clientHeight
//yes, this class store reference to camera

//probably, it may be mixin to camera
function Mouse_Camera_Controller(canvas, camera)
{
    if (canvas === undefined) {
        console.error("Mouse_Camera_Controller. Propable premordial creating object. canvas is undefined. Do nothing");
    } else {
        this.set_canvas_info(canvas);
    }
    this.camera = camera;
}

_.copy_object(Mouse_Camera_Controller.prototype,{
    constructor : Mouse_Camera_Controller,
    set_canvas_info: function (canvas)
    {
        var offset = canvas.getBoundingClientRect();
        this.offset = 
        {
            left: offset.left,
            top : offset.top
        };
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
    },
    refresh_canvas: function (new_canvas)
    {
        this.set_canvas_info(new_canvas);
    }
    ,
    get_normalized_screen_coordinates: function (x,y)
    {
        //step 1 : normalized
        x = (x - this.offset.left) / this.width;
        y = (y - this.offset.top) / this.height;
        //step 2 : from unsigned to signed, translate origin from top left corner to center 
        var x = x * 2.0 - 1.0;
        var y = -(y * 2.0 - 1.0);
        var vector = new THREE.Vector3( x, y, 1 );
        return vector;        
    },
    
    //do some what prevent method, only give mouse event instead x,y coordiantes
    get_normalize_mouse_position: function (event) 
    {
        return this.get_normalized_screen_coordinates(event.clientX, event.clientY);
    },
    
    //return new unproject vector, not change given
    //used THREE.Vector3.unproject method
    //including apply inver camera matrix
    //on my view, that wrong, because method do it big then promise
    //unproject must do only unproject, not else thing
    //because my need new method, who will do only unproject 
    unproject: function(vector)
    {
        var r = new THREE.Vector3();
        r.copy(vector);
        r.unproject(this.camera);
        //this aready done 
        //r.applyMatrix4(camera.matrixWorldInverse);    
        return r;
    },
    
    
    //get ray with origin in camera position and direction, 
    //pointed to far away where unproject screen point are
    get_ray_from_camera_in_screen_coordinates: function (x,y) 
    {
        var vector = this.get_normalized_screen_coordinates(x,y);
        vector = this.unproject(vector);
        var ray = new THREE.Ray( this.camera.position, vector.sub( this.camera.position ).normalize() );
        return ray;
    },
    
    //do same what prevent method, only give mouse event for convience
    //see it as overriding function in C++
    get_ray_from_camera_in_mouse_position: function (event)
    {
        return this.get_ray_from_camera_in_screen_coordinates(event.x, event.y);
    },


});


export {Mouse_Camera_Controller};