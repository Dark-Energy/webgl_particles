var e = new Euler_Animation(0, 5, 7);


function print(text)
{
    var p = document.createElement('pre')
    document.body.appendChild(p);
    p.innerHTML = text;
}    

print(JSON.stringify(e.toJSON(), null, ' '))


function print_data(data)
{
    print(JSON.stringify(data, null, ' '));
}

var main_scene;

var sphere;
function create_scene()
	{
        main_scene = new THREE.Scene();
        
		var pointLight = new THREE.PointLight(0xFFFF00);
		pointLight.position.set(10, 300, 200);
        
		main_scene.add(pointLight);
		
		var sg = new THREE.SphereGeometry(7, 20, 20);
		var sm = new THREE.MeshBasicMaterial({color: 0xFF9900});
		sphere = new THREE.Mesh(sg, sm);
		sphere.name = "sun";
		sphere.position.z = -100;
        var main_camera = new THREE.PerspectiveCamera(80, 800/600, 0.1, 1000);
		main_scene.add(sphere);
		main_camera.lookAt(sphere.position);	
		main_camera.position.z = 10;
        
		var shit = new THREE.Object3D();
		shit.position.set(0, 0, 0);
		main_scene.add(shit);
        
        
        var contr = new Euler_Animation(0, 60,0);
        sphere.add_animation(contr);
	}
    

    create_scene();
    
    print("<h1> all scene in json </h1>");
    print_data(main_scene.toJSON());
    
    print("<h1> test scene serializer</h1>");
    var ss = new Scene_Serializer();
    ss.toJSON(main_scene);
    print_data(ss.json);
    
    print("<h3>TEST myanimations</h3>");
    print_data(ss.json.myanimations);
    print("<h4>TEST animations</h4>");
    print_data(ss.json.myanimations.animations);
    
    
    print("<h1>trying create object animation</h1>");
    var key = _.get_first_key(ss.json.myanimations.animations)
    print("first key in myanimations.animations dictionary" + key);
    print('this params contains data <br>');
    var animdata = ss.json.myanimations.animations[key]
    print(JSON.stringify(animdata));
    
    print("create object with Abstract_Fabric");
    var tmp_anim = Abstract_Fabric(animdata);
    
    print('<pre>' +  typeof tmp_anim +'\n' + tmp_anim.type + '\n' + ' zpeed '+tmp_anim.zspeed + ' yspeed '+tmp_anim.yspeed + ' xspeed '+tmp_anim.xspeed+ '</pre>');
    
    print_data(tmp_anim);
    print("<h3> trying create all animations from json </h3>");
    
    ss.create_animations(ss.json.myanimations.animations);
    var r = ss.animation_library;
    print_data(r);
    print(r[key]);
    print(r[key].type);
    
    test("<h3> test binding </h3>");
    print_data(ss.json.myanimations.bindings);
    var bind = ss.json.myanimations.bindings[0];
    test("<h4> test finding object in scene graph by uuid</h4>");
    var obj = main_scene.getObjectByProperty("uuid", bind.uuid);
    print(obj);
    print_data(obj);
    print("<h3> number of animation in obj before append new one "  + obj.animations.length + " </h3>");
    obj.add_animation(tmp_anim);
    
    print("testing apply animation");
    print(JSON.stringify(obj.matrix));
    print(JSON.stringify(obj.rotation));
    try{
        obj.update(0.1);
    }
    catch (e) {
        print("error?");
        print_data(e);
    }
    print(JSON.stringify(obj.matrix));
    print(JSON.stringify(obj.rotation));
    
    
    obj.update(0.1);
    print(JSON.stringify(obj.rotation));
    
    obj.remove_animation(tmp_anim);
    
    print("<h3>try binding animations</h3>");
    ss.root = main_scene;
    ss.bind_animations(ss.json.myanimations);
    
    function travers_scene(root, func)
    {
        func(root);
        for(var i = 0; i < root.children.length; i++) {
            travers_scene(root.children[i], func);
        }
    }
    
    print("<p>testing results</br>");
    travers_scene(main_scene, function (c) {
        if (c.animations) {
            print("<pre> " + c.name + "\n" + c.type + "\n" + c.uuid + '</pre>');
            print("number of animations " + c.animations.length);
            print_data(c.animations);
        }
    });
    
    
    print("<hr>");
    
    print("<h3> trying load full scene from json </h3>");
    ss.load();
    print("traversing in search of animations<BR>");
    travers_scene(ss.root, function (c) {
        print("<br>" + (c.name || c.type));
        if (c.animations) {
            print_data(c.animations);
            print(c.animations[0]);
            print(c.animations[0].type);
            print(c.animations[0].xspeed);
        }
    });
    
    
   var test = {
  "uuid": "098D4BA5-7C60-4398-B0E3-5FE1C0CDC362",
  "type": "Euler_Animation",
  "time_scale": "1",
  "xspeed": "0",
  "yspeed": "1.0471975511965976",
  "zspeed": "0"
 };
 
   var test2 = {
  "uuid": "098D4BA5-7C60-4398-B0E3-5FE1C0CDC362",
  "type": "Euler_Animation",
  "time_scale": 1,
  "xspeed": 0,
  "yspeed": 1.0471975511965976,
  "zspeed": 0
 };

 print("witout quotes");
 print(JSON.stringify(test2, null, ' '));
  print("with quotes");
 print(JSON.stringify(test, null, ' '));
 
 var t = Abstract_Fabric(test);
 print(t.xspeed);
 print_data(t);