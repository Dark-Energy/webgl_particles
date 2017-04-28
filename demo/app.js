
function init()
{

var vertex_shader = 
'varying vec2 vUv;\
void main() {\
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\
	vUv = uv.xy;\
}';

var fragment_shader = 
'uniform vec4 my_frag_color;\
uniform sampler2D my_texture;\
varying vec2 vUv;\
	void main(void) {\
		gl_FragColor = texture2D(my_texture, vUv);\
		/*gl_FragColor = vec4(1, vUv.xy, 0.5);*/\
	}';

var rt_vertex_shader = 'varying vec2 vUv;\
void main() {\
				vUv = uv.xy;\
				gl_Position = projectionMatrix *  modelViewMatrix * vec4( position, 1.0 );\
			}';
var rt_fragment_shader = 'uniform float time;\
varying vec2 vUv;\
void main() {\
	gl_FragColor = vec4( abs(cos(vUv.x+time)), abs(sin(cos(vUv.x)*vUv.y)), abs(sin(vUv.y+time)), 1.0 );\
			}';


	var dom_screen;
	
	var my_app = {};
	
	var grid_text;
	
	my_app.start = function () {
		this.renderer = new THREE.WebGLRenderer({premultipliedAlpha:true, alpha: true});

		this.renderer.setSize(800, 600);
		this.renderer.setClearColor(0xFFFFFF);
		this.set_viewport(800.0, 600.0);

		dom_screen = document.getElementById("screen");
		dom_screen.appendChild(this.renderer.domElement);
		this.dom_screen = dom_screen;
	}
	
	var scene, camera;
	my_app.create_main_scene = function ()
	{
		this.main_scene = new THREE.Scene();
		this.main_camera = new THREE.PerspectiveCamera(80, 800/600, 0.1, 1000);
		this.main_scene.add(this.main_camera);
		this.main_camera.position.z = 0;
		this.main_camera.position.y = 0;
		this.main_camera.position.x = 0;
		
		camera = this.main_camera;
		scene = this.main_scene;
		
	}
	
	
	my_app.render = function (delta) 
	{
		
		this.renderer.setClearColor(0x0000FF, 1.0);
		this.renderer.autoClear = true;
		this.renderer.render(scene, camera);
		
	}
	
	my_app.update = function (delta)
	{
		this.update_all(delta);
	}

	my_app.load_resources = function (on_load)
	{
		var self = this;
		
		this.resource_list = [
			"textures/particle2.png",
			"textures/particle1.png",
			"textures/particle0.jpg",
		];
		My_Lib.Texture_Manager.load_list(this.resource_list, function (){
			on_load();
		});
	}
	
	my_app.create_sun = function ()
	{
		var pointLight = new THREE.PointLight(0xFFFF00);
		pointLight.position.set(10, 300, 200);
		this.main_scene.add(pointLight);
		
		var sg = new THREE.SphereGeometry(7, 20, 20);
		var sm = new THREE.MeshBasicMaterial({color: 0xFF9900});
		var sphere = new THREE.Mesh(sg, sm);
		sphere.name = "sun";
		sphere.position.z = -100;
		this.main_scene.add(sphere);
		this.main_camera.lookAt(sphere.position);	
		this.main_camera.position.z = 10;
		
		var contr = new My_Lib.Euler_Controller(sphere, 0, 60,0);
		this.add_animated_object(contr);
		
		var self = this;


		var shit = new THREE.Object3D();
		shit.position.set(0, 0, 0);
		this.main_scene.add(shit);
		
		function create_particles(emitter, affector)
		{
			emitter.set_parent_object("sun", self.main_scene);
			emitter.set_dispersion(5, 10);
			emitter.set_speed(10, 20);
			ps = new My_Lib.Particle_System({
				"count": 300,
				"size": 2,
				"particle_lifetime": 2,
				"emitter": emitter,
				"affector": affector,
				"texture": "textures/particle2.png",
				"no_fade_color": false,
			});
			self.main_scene.add(ps.node);
			self.add_animated_object(ps);
			ps.node.frustumCulled = false;
			
			return ps;
		}

		var loader = new THREE.XHRLoader();
		
		var self = this;
		function add_particles(json) 
		{
			var ps = My_Lib.Particle_System.prototype.fromJSON(json, function(){},self.main_scene);
			self.main_scene.add(ps.node);
			self.add_animated_object(ps);
			ps.node.material.depthTest = true;
			ps.node.material.blending = THREE.NormalBlending;
		}
		loader.load("json/cone_particles1.json", function (responce) {
			add_particles(responce);
		});

		loader.load("json/cone_particles2.json", function (responce) {
			add_particles(responce);
		});
		
		/*
		var te = new Cone_Emitter(100);
		te.color = new THREE.Color(1,1, 0);
		te.origin = new THREE.Vector3(1, 1, 0);
		te.origin.set(5, 5, 0);
		te.velocity.set(10, 10, 0);
		var ps = create_particles(te);
	
		var te = new Cone_Emitter(100);
		te.origin = new THREE.Vector3(-1, 1, 0);
		te.color = new THREE.Color(1, 1, 0);
 	    ps = create_particles(te);		
		te.origin.set(-5, 5, 0);
		te.velocity.set(-10, 10, 0);
		*/
		//var tmp = JSON.stringify(ps.toJSON(), undefined, "    ");
		//console.log(tmp);
	},

	my_app.create_star_dust = function(callback)
	{
		var loader = new THREE.XHRLoader();
		
		var self = this;
		loader.load("json/star_dust.json", function (responce) {
			callback();
			var ps = My_Lib.Particle_System.prototype.fromJSON(responce);
			self.main_scene.add(ps.node);
			self.add_animated_object(ps);
			ps.node.material.depthTest = true;
			ps.node.material.blending = THREE.NormalBlending;
		});
	}

	
	my_app.create_background = function ()
	{
		//create overlay to render background with particles
		var over = new My_Lib.Overlay(800, 600);
		over.scene = new THREE.Scene();
		var grid = new My_Lib.Grid(800, 600, 5, 5, this.my_render_target.target.texture);
		over.scene.add(grid.root);
		grid.material.opacity = 1;
		grid.material.blending = THREE.AdditiveBlending;
		grid.material.depthTest = true;
		
		this.background = over;
		this.background_grid = grid;
		
		this.add_animated_object(grid);
	}
	
	my_app.enable_background_animation = function ()
	{
		var grid = this.background_grid;
		function fire_event()
		{
			if (!grid.animation) {
				grid.animation = new My_Lib.Rotate_Animation(0, Math.PI/2);
			}
			grid.animation.row_waiting = 0;
			//grid.animation.swap_dir = true;
			grid.animation.rotation_axis = [0, 0, 1];
			grid.animation.end_rotation_value = Math.PI*2.0;
			
			//mouse events
			document.removeEventListener('wheel', fire_event);
			grid.animation.onAnimationEnding = function () {
				document.addEventListener('wheel', fire_event);
			}
			grid.start_animation();		
		}
		document.addEventListener('wheel', fire_event);
		window.addEventListener("scroll", fire_event, false);
	}

	//create grid text and fake plane	
	my_app.create_grid_text = function ()
	{
		var texture = My_Lib.create_text_image(250, 60, "Hello, World!", true); 	
		var mat = new THREE.MeshBasicMaterial(
		{
			transparent: false,
			opacity: 1,
			map: texture,
			side: THREE.DoubleSide,
			depthTest: true,
			depthWrite: false,
		});

		var grid_text = new My_Lib.Grid(250, 60, 10, 5, texture, mat);	
		grid_text.root.position.z = 220;
		grid_text.root.rotation.z = Math.PI;
		this.main_scene.add(grid_text.root);
		this.add_animated_object(grid_text);		
		
		//this need to speed up mouse intersection
		var fake_plane = new My_Lib.Grid(250, 60, 1, 1, null);
		fake_plane.material.depthTest = true;
		fake_plane.material.depthWrite = true;
		fake_plane.material.side = THREE.DoubleSide;
		fake_plane.material.visible = false;
		fake_plane.root.position.z = 220;
		fake_plane.root.rotation.z = Math.PI;
		this.main_scene.add(fake_plane.root);	
		
		this.set_grid_text_animation(grid_text, fake_plane);
	}
	
	my_app.set_grid_text_animation = function (grid_text, fake_plane) 
	{
		var self = this;
		
		var mouse_object = null;
		
		grid_text.animation = new My_Lib.Rotate_Animation(0.23, Math.PI*4);
		grid_text.animation.row_waiting = 0;
		grid_text.animation.col_waiting = 0;
		grid_text.animation.swap_dir = false;
		function object_mouse_enter()
		{
		
			grid_text.animation.rotation_axis = [0, 1, 0];
			grid_text.animation.end_rotation_value = Math.PI*6.0;
		
			grid_text.start_animation();
		}
		
		this.add_mouse_controller(fake_plane.root, true, false, function (intersects) {
			if (intersects.length > 0) {
				if (!mouse_object) {
					mouse_object = intersects[0];
					object_mouse_enter();
				}
			}
			else {
				if (mouse_object) {
					mouse_object = null;
				}
			}
		
		});
	}
	
	
	var app = My_Lib.extend_application(my_app);
	app.start();
	//app.create_render_target_scene();
	app.create_main_scene();
	app.load_resources( function () {
		app.create_star_dust(function () {});
		app.create_sun();
		main_loop();
	});

	function main_loop() {
		app.loop();	
	}
}


init();