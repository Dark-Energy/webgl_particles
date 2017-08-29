    var Dragger_Mixin =
    {
       old_pos : new THREE.Vector3(),
       dragging: false,
       drag_object: undefined,
       get_ray : function (event)
        {
            var mc = new Engine.Mouse_Camera_Controller(this.canvas, this.main_camera);
            var ray = mc.get_ray_from_camera_in_mouse_position(event);
            return ray;
        },

       drag_listener: undefined,
       start_drag: function (event, object)
       {
            var self = this;
            function drag(event)
            {
                if (self.drag_object === undefined) {
                    self.drag_object = object;
                    if (object === undefined) {
                        console.error("onmousemove listener. some wrong happened...");
                    }
                }
                self.test_plane(self.drag_object, event);
            }
            this.drag_listener = drag;

            this.old_pos.copy(object.position);
            this.dragging = true;
            this.drag_object = object;
            this.canvas.addEventListener("mousemove", drag);
       },
       test_plane : function (obj, event)
        {
            var plane = this.main_camera.get_forward_plane_by_object(obj);
            var ray = this.main_camera.get_ray_from_screen_coordinates(this.canvas, event.clientX, event.clientY);
            var at = new THREE.Vector3();
            ray.intersectPlane(plane, at);
            obj.position.copy(at);
            return at;
        },
        end_drag: function(event)
        {
           this.dragging = false;
           this.drag_object = undefined;
           this.canvas.removeEventListener("mousemove", this.drag_listener);
           this.drag_listener = undefined;

        },

        pickup_object: function (event)
        {
            var ray = this.get_ray(event);
            var collider = new Engine.Simple_Collider(this.main_scene);
            var intersects = collider.check_ray(ray);
            var obj =  intersects[0];
            return obj;

        },

        add_listeners: function ()
        {
            var self = this;
            function mouseup(event)
            {
                if (self.dragging) {
                    self.end_drag();
                    return;
                }
                self.pickup_object(ray)
            }

            function mousedown(event)
            {
                var ray = self.get_ray(event);
                if (!self.dragging) {
                    console.log("dragging is false, check intersection");
                    var obj = self.pickup_object(event);
                    //start dragging
                    if (obj) {
                        self.start_drag(ray, obj);
                    }
                }
            }


            this.canvas.addEventListener("mouseup", mouseup, false);
            this.canvas.addEventListener("mousedown", mousedown, false);
        }

    };




	var my_app = {};


    my_app.create_default_data = function()
        {
            var data = {
                "textures": [
                    "textures/particle2.png",
                    "textures/particle1.png",
                    "textures/Particle4.jpg",
                    "textures/spark.png",
            ]
           };
           return data;
        }



    my_app.resources_loaded = function (data)
    {
        this.resource_list = data.textures;
        this.load_scene();
        this.loop();
    }

    my_app.load_res = function ()
    {
        var pm = new Engine.Package_Manager();
        var self = this;
        pm.data_loaded =  function (data) {
            self.resources_loaded(data)
        };
        pm.load("json/package_sun.json", this.create_default_data());
    }

    my_app.load_scene = function ()
    {
        var self = this;
        this.ser = new Engine.Scene_Serializer();
        this.ser.scene_loaded = function (scene)
        {
            self.main_scene = scene;
            self.main_camera = scene.getObjectByName("main_camera");
            self.init_ui();
        }
        this.ser.load_from_json("json/scene.json");
    }


    my_app.created = function ()
    {
        var self = this;
        this.load_res();

    }

    my_app.update = function (dt)
    {
        Engine.Application.prototype.update.call(this, dt);
        this.main_scene.update(dt);
    }

	my_app.init_ui = function ()
	{
        this.add_listeners();
		this.control_panel = new Control_Panel();
		this.control_panel.add_particles( Engine.My_Lib.particle_manager.get_particle_names() );
        this.control_panel.set_textures(this.resource_list);

	}


    _.copy_object(my_app, Dragger_Mixin);

var Editor_Class = Engine.Application.extend(my_app);
var Editor = new Editor_Class();
Editor.start();


console.log(THREE.Object3D.prototype.dm_mark);