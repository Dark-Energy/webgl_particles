var Custom_Func_Mixin = {
    test_func: function () {
        var p = {
            position: {x: 0, y: 0, z: 0},
            velocity: {x: 0, y: 0, z: 0}
        };
        var color = {r: 0, g: 0, b: 0};
        this.custom_func(p, color);
    },
    set_emit_function: function (source, args) {
        if (typeof source === 'function') {
            this.custom_func = source;
        } else if (typeof source  === 'string') {
            try {
                this.custom_func = new Function (args, source);
                this.test_func();
            }
            catch (e) {
                alert(e);
                this.custom_func = undefined;
            }
            this.source_code = source;
        }
    },
};