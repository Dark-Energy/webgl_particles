
var current_component;

function create_component(component, data)
{
  var Ctor = Vue.extend(component)
  var vm = new Ctor({ propsData: data }).$mount()
  current_component = vm;
  return vm;
}

function getRenderedText (component, data) {

  var vm = create_component(component, data);
  return vm.$el.textContent
}


var logscreen = document.getElementById("logscreen");

function logtext(text)
{
   if (!logscreen) {
    logscreen = document.getElementById("logscreen");
    if (!logscreen) {
        alert("FUCK!");
    }
   }
   
   var p = document.createElement('p');
   p.innerHTML = text;
   logscreen.appendChild(p);
}

function logstart(text)
{
  var p = document.createElement('h3');
  p.innerHTML = text;
  logscreen.appendChild(p);
}

function logend(text)
{
  var p = document.createElement('h3');
  p.innerHTML = text;
  logscreen.appendChild(p);
  p = document.createElement('hr');
  logscreen.appendChild(p);
}

var test_params = {
            id: "dummy",
            texture: "dummy_texture.jpg",
            count: 666,
            size: 7,
            emit_per_second: 999,
            life_length: 10,
            color: {r:255, g:255, b:255},
            blending : "additive",
            precomputed_alpha: false,
            emit_method: '',
            affect_method: '',
};

var test_particles = 
{"dummy": test_params,
"spark": My_Lib.create_clone_object(test_params)};

test_particles.spark.id = "spark";
test_particles.spark.texture = "spark_texture";

function create_fake_event_hub()
{
    event_hub = new Vue( { methods:  {
        "get_particle_params": 
            function (id) {
                logtext("Here is event hub! I get fake particle params for " + id);
                return test_particles[id];
            }
        }
      }
    );
}

create_fake_event_hub();

  


var fake_texture_panel = {
    props: ["textures", "selected", "particle_id"],
    mounted: function ()
    {
        //logtext("Hi! Iam fake texture panel. My props")
        //logtext("textures == " + this.textures + "<br> selected = "+this.selected + "<br> particle id = " + this.particle_id);
        //logtext("Bye!");
    },
    watchers: {
        particle_id: function (id)
        {
            //logtext("I am waters from fake texture panel and i am watching for particle_id, which changes to "+this.particle_id);
        }
    }
}

var fake_particle_props = {
    props: ["params"],
    template: "<div> This is template of fake particle props. Belows content of its props: <BR> {{params}}</div>",
    mounted: function () {
        logstart("<h3>I am faked particle props is mounted and this my props</h3>");
        logtext('there is block content <blockquote>'+this.$el.textContent+'</blockquote>');
        logtext("Bye!<hr>");
    },
    updated: function ()
    {
        logtext("<h3>I am fake particle props! My data have updated! </h3>" + this.$el.textContent);
        logend("that is end <hr>");
    },
    watch: {
        params: function (value)
        {
            logstart("Watch. fake particle props catch his prop 'params' changed!");
            logtext("this is new props " + value + " <BR>" + JSON.stringify(this.params, false, "<br>" ));
            logtext('<hr>');
        }
    }
    
}

//logstart("start testing fake particle props");
//logtext(getRenderedText(fake_particle_props, {params: test_particles["spark"]}));
//logend();

Particles_Panel.components['texture-panel'] = fake_texture_panel;
Particles_Panel.components['particles-props'] = fake_particle_props;

Particles_Panel.watch = {
    selected: function (value) {
        logtext("WATCH! Particles Panel Watcher for 'selected' prop is reported " + value);
    },
    particle_params: function (value) {
        logtext("WATCH! there is particles panel reporeted. Her 'particles params' is changed to " + this.particle_params);
    }
}


Particles_Panel.methods.select_particles = function (event)
{
    logtext("Here event handler for select list. My this.selected is now '" + this.selected + "' But then it became '"+ event.target.value+"'");
    this.selected = event.target.value;
    this.particle_params = event_hub.get_particle_params(this.selected);
    
}

Particles_Panel.methods.fake_signal = function (name) {
    logstart("we give signal when '" +this.selected + "' became " + name);
    this.select_particles( {target: {value: name}});
    /*
    this.selected = name;
    var self = this;
    setTimeout(function () {
    logtext("what is magic? now selected is "+ self.selected);
    logtext("there is " + self.particles);
    }, 1000); 
    */
}

Particles_Panel.mounted = function ()
{
    logtext("<h3>Ho-ho, i am Particles Panel, and i am mounted.</h3> My props.selected is '" + this.selected + "' Fuck yeah");
}

Particles_Panel.updated = function ()
{
    logtext('<h3> Particles Panel is updated</h3>');
    render_this();
}

shit = getRenderedText(Particles_Panel, {
    textures: ["spark", "dummy"], particles: ["dummy","spark"], selected: "dummy"
});

shit = current_component.$el.innerHTML;
logtext("<h3>This is particles panel content after rendering</h3> <br>" + shit + '<hr>');


logtext("we send false signal");
current_component.fake_signal("spark");

function render_this()
{
    var shit = current_component.$el.innerHTML;
    logtext("<h3>Particles Panel After fake signal is watched</h3> <br>" + shit + '<hr> ');
}


var test = new Vue({ 
    el: "testapp",
    components: {"particles-panel": Particles_Panel},
    data: {
        dummy: "dummy",
        textures: ["spark", "dummy"],
        particles:  ["dummy","spark"],
    },
    mounted: function ()
    {
        logtext("fuck");
    },
    updated: function ()
    {
        logtext("fuck 2");
    },
    template: '<div id="test-app"><h1>BUGAGA {{dummy}}</h1></div>'
    });

//alert(test.$el.innerHTML);
//alert(document.getElementById("testapp").innerHTML);

test.$forceUpdate();  
//<particles-panel :textures=textures, :particles=particles, :selected="dummy"></particles-panel>    
/*console.log("DONE!");
console.log("this.selected must by dummy, isnt? ", current_component.selected);
console.log("change it must call get_particle_params with valid id or undefined if this not found in select list");
current_component.fake_signal("spark");
*/