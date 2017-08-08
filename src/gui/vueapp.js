import {Particles_Panel} from './particles_panel.js';

function create_vue_app(id) {

	var app2 = new Vue({
		el: id,
        
        components: {
            'particles-panel': Particles_Panel,
        },
		data: {
            particles: [],
            textures: [],
        },
        template: '<div id="app">\
            <particles-panel :particles="particles" :textures="textures"></particles-panel>\
            </div>',
	});

	return app2;
}

export {create_vue_app};