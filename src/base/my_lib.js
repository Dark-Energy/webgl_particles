/*
*/


var My_Lib = {};

My_Lib.Viewport = {};


My_Lib.Object_Animation = function (object, animation)
{
	this.object = object;
	this.animation = animation;
}

My_Lib.Object_Animation.prototype.update = function (dt)
{
	this.animation(this.object, dt);
}

My_Lib.create_text_image = function (width, height, text, npot, background) 
{
	// create a canvas element
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext('2d');
	if (background) 
	{
		context.fillStyle = background;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}
	context.font = "Bold 40px Arial";
	context.fillStyle = "rgba(0,255,0,0.95)";
    context.fillText('Hello, world!', 0, 50);
    
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	if (npot) {
		texture.wrapS = texture.wrapT = THREE.TextureWrapping.ClampToEdgeWrapping;
		texture.minFilter = THREE.LinearFilter;
	}
	texture.needsUpdate = true; 	
	return texture;
}


My_Lib.Create_Quad = function (width, height, vertex_shader, fragment_shader)
{
	//plane created turn away from camera
	var plane = new THREE.PlaneBufferGeometry( width, height);
	
	var material = new THREE.ShaderMaterial( {
		vertexShader: vertex_shader,
		fragmentShader: fragment_shader
	} ); 

	var quad = new THREE.Mesh( plane, material );
	quad.rotation.y = Math.PI;
	return quad;
}


My_Lib.Render_Target = function (width, height)
{
	this.target = new THREE.WebGLRenderTarget( 
	width, 
	height, 
	{ 
		minFilter: THREE.LinearFilter, 
		magFilter: THREE.NearestFilter, 
		format: THREE.RGBFormat 
	} ); 
	
	this.camera = new THREE.PerspectiveCamera(80, width/height, 0.1, 1000);
}

My_Lib.Render_Target.prototype.render = function (scene, renderer)
{
	renderer.render( scene, 
		this.camera, 
		this.target, 
		true  //forceClear
		);
}


My_Lib.create_overlay_camera = function (width, height)
{
	var camera =  new THREE.OrthographicCamera( 
		width / - 2, 
		width / 2, 
		height / 2, 
		height /- 2, -10000, 10000 );
	return camera;
}

My_Lib.Overlay = function (width, height)
{
	this.camera = My_Lib.create_overlay_camera(width, height);
}

My_Lib.Overlay.prototype.render = function (renderer)
{
	if (!this.scene) {
		return;
	}
	
	renderer.autoClear = false;
	renderer.render(this.scene, this.camera);
	renderer.autoClear = true;
}


My_Lib.Mouse_Controller = function (root, over, click, callback)
{
	this.root = root;
	this.over = over;
	this.click = !!click;
	this.callback = callback;
}



/*
ugly hack
*/

My_Lib.event_hub = new Event_Hub();

function Event_Hub() {
    this.events = {};
}



Event_Hub.prototype.add_event_listener = function (name, func, obj)
{
    if (!this.events[name]) {
        this.events[name] = [];
    }
    this.events[name].push( {name: name, func: func, obj: obj} );
}

Event_Hub.prototype.on  = Event_Hub.prototype.add_event_listener;

Event_Hub.prototype.emit = function(name, obj)
{
    var listeners = this.events[name];
    if (listeners) {
        for(var i = 0; i < listeners.length; i++) {
            var t = listeners[i];
            t.func.call(t.obj, obj);            
        }
    }
}


var run_function = //window.requestAnimationFrame;
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	}


My_Lib.create_run_function = function (app) 
{
    My_Lib.run = function () { run_function( function () { app.loop(); }); }
}




My_Lib.Euler_Controller = function (obj, x, y, z)
{
	this.obj = obj;
	this.xspeed = x * Math.PI / 180;;
	this.yspeed = y * Math.PI / 180;;
	this.zspeed = z * Math.PI / 180;;
}

My_Lib.Euler_Controller.prototype.update = function (dt)
{
	this.obj.rotation.x += this.xspeed * dt;
	this.obj.rotation.y += this.yspeed * dt;
	this.obj.rotation.z += this.zspeed * dt;
}

//Class Library
My_Lib.Registered_Classes = {};

My_Lib.Register_Class = function (name, func)
{
	if (My_Lib.Registered_Classes[name]){
		console.log("Register Class ERROR! Class with this name already exists!", name);
	}
	My_Lib.Registered_Classes[name] = func;
}

My_Lib.Get_Class = function (name)
{
	return My_Lib.Registered_Classes[name];
}


My_Lib.create_class = function(parent, child, props, name)
{
    if (parent) {
        child.prototype = Object.create(parent.prototype);
    } 
    _.copy_object(child.prototype, props);
    child.prototype.contructor = child;                
    My_Lib.Register_Class(child, name);
}

My_Lib.Abstract_Fabric = function (data)
{
    var constructor = My_Lib.Get_Class(data.type);
    if (constructor) {
        var object = new constructor();
        object.parse(data);
        return object;
    }
    return undefined;
}

My_Lib.Print_Classes = function ()
{
    for(var key in this.Registered_Classes) {
        console.log("class registered :", key, this.Registered_Classes[key]);
    }
}


export { My_Lib };

