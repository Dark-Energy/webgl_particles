var Particle_Shaders = {};

(function () 
{

//particle attributes:
//position
//color
//left, size
var vertex_shader = [
//'attribute vec4 position;',
'attribute vec4 color;',
'attribute float params;',
'varying vec4 vcolor;',
'uniform float lifetime;',
'uniform float point_size;',
'uniform vec2 screen_size;',
'#ifndef DYNAMIC_COLORS',
    'uniform vec3 particle_color;',
'#endif',
'void main () {',
	'gl_Position = projectionMatrix * viewMatrix * vec4( position, 1.0 );',
'#ifdef DYNAMIC_COLORS',
	'vcolor.rgb = color.rgb;',
'#else',
    'vcolor.rgb = particle_color.rgb;',
'#endif',
'#ifdef NO_FADE_COLOR',
	'vcolor.a = 1.0;',
'#else',
	//params contains life length which decreased by time
	'float tmp = params / lifetime;',
	'tmp = min(tmp, 1.0);',	
	'vcolor.a = tmp;',
'#endif',
	'float t =  screen_size.y* projectionMatrix[1][1] / gl_Position.w;',
	't = t * point_size;',
	'if (params > 0.0) {',
		'gl_PointSize = t;',
	'}',
	'else {',
		//'vcolor.a = 0.0;',
		'gl_PointSize = 0.0;',
	'}',
'}'
];

var fragment_shader = [
	'varying vec4 vcolor;',
	'#ifdef PARTICLE_TEXTURE',
		'uniform sampler2D sprite;',
	'#endif',
	'void main() {',
	'#ifdef PARTICLE_TEXTURE',
		'vec4 tex = texture2D( sprite, gl_PointCoord );',
		'vec3 fragment_color = tex.rgb;',
		'fragment_color.rgb *= vcolor.rgb;',
		'float alpha = tex.a;',	
	'#else',
		'vec3 fragment_color = vcolor.rgb;',
		'float alpha = 1.0;',
	'#endif',
	'#ifdef PRE_ALPHA',
		'fragment_color.rgb *= alpha;',
	'#endif',
	'#ifndef NO_FADE_COLOR',
		'float fragment_alpha = alpha * vcolor.a;',
	'#else',
		'float fragment_alpha = alpha;',
	'#endif',
		'gl_FragColor = vec4(fragment_color.rgb, fragment_alpha);',
	'}',
];

Particle_Shaders.vertex = vertex_shader.join( '\n' );
Particle_Shaders.fragment = fragment_shader.join( '\n' );
})();

export {Particle_Shaders};