function Create_Text_Image(width, height, text, background) 
{
	// create a canvas element
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext('2d');
	if (background) 
	{
		context.fillStyle = background;
		context.fillRect(0, 0, height, width);
	}
	context.font = "Bold 20px Serif";
	context.fillStyle = "rgba(255,255,255,1)";
    context.fillText(text, 4, height/2);
    
    return canvas;
}



function my_draw_image(canvas, image, x, y, background)
{
    var ctx = canvas.getContext("2d");    
    ctx.fillStyle = background || "#000000";
    ctx.fillRect(0,0, canvas.width, canvas.height);    
    ctx.drawImage(image, 0, 0);
}


var texture_format_to_string;

(function () 
{
var array_format_to_string = [];

texture_format_to_string = function(format)
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

}())


