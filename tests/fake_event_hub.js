

var array_format_to_string = [];

function texture_format_to_string(format)
{
    var r =  array_format_to_string[format];
    if (typeof r === 'undefined') {
        console.error("Fuck! texture format is undefined " + format);
    }
    return r;
}

function init_texture_format_converter()
{

var AlphaFormat = 1021;
var RGBFormat = 1022;
var RGBAFormat = 1023;
var LuminanceFormat = 1024;
var LuminanceAlphaFormat = 1025;
var RGBEFormat = RGBAFormat;
var DepthFormat = 1026;
var DepthStencilFormat = 1027; 

    ttt = array_format_to_string;
    ttt[AlphaFormat] = "alpha";
    ttt[RGBFormat] = "rgb",
    ttt[RGBEFormat] =  "RGBE",
    ttt[RGBAFormat] = "rgba",
    ttt[LuminanceFormat] = "luminance",
    ttt[LuminanceAlphaFormat] =  "luminance alpha",
    ttt[DepthFormat] = "Depth",
    ttt[DepthStencilFormat] = "Depth Stencil";
    //console.log(ttt[1023], "test");
}

init_texture_format_converter();


var test_params = {
            id: "dummy",
            texture: "dummy_texture.png",
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
test_particles.spark.texture = "spark_texture.jpg";
test_particles.spark.blending = 'no';
test_particles.spark.count = 999;
test_particles.spark.size = 77;


var textures = 
{
    "dummy_texture.png": {
        image: {
            naturalWidth: 64,
            naturalHeight: 64,
        },
        name: "dummy_texture",
        format: 1023 //THREE.RGBAFormat 
    },
    "spark_texture.jpg": {
        image: {
            naturalWidth: 128,
            naturalHeight: 96,
        },
        name: "spark_texture",
        format: 1022 //THREE.RGBFormat 
    }
};


var texture_names = 
[ 
    "spark_texture.jpg",
    "dummy_texture.png",
];

var particle_names = 
[
    "spark",
    "dummy",
];



console.log("create_textures");
try {
    textures["spark_texture.jpg"].image = Create_Text_Image(128, 96, 'spark', '#0000FF');
    textures["dummy_texture.png"].image = Create_Text_Image(64, 64, 'dummy', '#FF0000');
}
catch( e) 
{
    console.log("fuck is this" + e);
    throw e;
}
console.log("done create_textures");





function create_fake_event_hub()
{
    var v = new Vue( { methods:  {
        "get_texture_from_particles" :function (id) {
            var ps = test_particles[id];
            if (!ps) {
                console.error("Not found particles " + id + " !");
            }
            console.log("found particles with " +ps.texture + " texture");
            return ps.texture;
        },
        
        "get_texture": function (id) {
            var t = textures[id];
            console.log("get texture " + id + " and result " + t);
            return t;
            
        },
        
        "get_particle_params": 
            function (id) {
                console.log("Here is event hub! I get fake particle params for " + id);
                return test_particles[id];
            }
        }
      }
    );
    return v;
}

var event_hub = create_fake_event_hub();
