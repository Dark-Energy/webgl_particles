
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
		var json_list = [
		"json/cone_particles1.json",
		"json/cone_particles2.json",
		"json/star_dust.json",
		];
		My_Lib.Texture_Manager.load_list_textures(this.resource_list, function (){
			
			My_Lib.Texture_Manager.load_list_json(json_list, function () {
				on_load();
			})
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
		
		var self = this;
		function add_particles(name) 
		{
			var json = My_Lib.Texture_Manager.get(name);
			var ps = My_Lib.particle_manager.fromJSON(json, function(){},self.main_scene, name);
			self.main_scene.add(ps.node);
			self.add_animated_object(ps);
		}
		add_particles("json/cone_particles1.json");
		add_particles("json/cone_particles2.json");
		add_particles("json/star_dust.json");
		
	}

	my_app.init_ui = function ()
	{
		this.control_panel = new Control_Panel();
		this.control_panel.add_particles( My_Lib.particle_manager.get_particle_names() );
	}
	
	var app = My_Lib.extend_application(my_app);
	app.start();
	app.create_main_scene();
	app.load_resources( function () {
		app.create_sun();
		app.init_ui();
		main_loop();
	});

	function main_loop() {
		app.loop();	
	}
}


init();