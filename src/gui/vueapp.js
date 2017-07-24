var editor = {};
editor.create_vue_app = function (id) {

	var app2 = new Vue({
		el: id,
        /*
        components: {
            'particles-panel': editor.Particles_Panel,
        },*/
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

