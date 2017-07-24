var logscreen = document.getElementById("logscreen");

function logtext(text)
{
    console.log(text);
    return;

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
    console.log(text);
    return;

  var p = document.createElement('h3');
  p.innerHTML = text;
  logscreen.appendChild(p);
}

function logend(text)
{
    console.log(text);
    return;
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
"spark": _.create_clone_object(test_params)};
test_particles.spark.id = "spark";
test_particles.spark.texture = "spark_texture";
test_particles.spark.blending = 'no';
test_particles.spark.count = 999;
test_particles.spark.size = 77;



function create_fake_event_hub()
{
    event_hub = new Vue( { methods:  {
        "get_texture_from_particles" :function (id) {
            return undefined;
        },
        "get_texture": function (id) {
            return undefined;
        },
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
