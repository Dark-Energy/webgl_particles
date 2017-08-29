import {My_Lib} from '../base/my_lib.js';

function Color_Domain(r,g,b)
{
    this.color = new THREE.Color(r,g,b);
    this.uuid = _.generateUUID();
    this.name = '';
    this.type = "Color_Domain";
}

_.copy_object(Color_Domain.prototype, {
    toJSON: function (child)
    {
        var data = {};
        data.uuid = this.uuid;
        if (this.name !== '') {
            data.name = this.name;
        }
        data.type = this.type;
        data.color = {r: this.color.r, g: this.color.g, b: this.color.b};
        return ;
    },
    parse: function (json)
    {
        this.uuid = json.uuid;
        if (json.name !== undefined) {
            this.name = json.name;
        }
        if (json.color !== undefined) {
            this.color.set(json.color.r, json.color.g, json.color.b);
        }
    },
    emit: function (color)
    {
        color.r = this.color.r;
        color.g = this.color.g;
        color.b = this.color.b;
    },
    fill: function (color, offset) 
    {
        color[offset+0] = this.color.r;
        color[offset+1] = this.color.g;
        color[offset+2] = this.color.b;
    }
});

My_Lib.Register_Class('Color_Domain', Color_Domain);

function Table_Color(table)
{
    if (table !== undefined) {
        this.copy_table(table);        
    } else {
        this.default_table();
    }
}

Table_Color.prototype = Object.create(Color_Domain);

_.copy_object(Table_Color.prototype, {
    constructor: Table_Color,
    copy_table: function (table)
    {
        this.table = new Array(table.length);
        for(var i = 0; i < table.length; i++) {
            this.table = new THREE.Color(table[i]);
        }
    },
    emit: function (color)
    {
        var index = Math.ceil(Math.random() * this.table.length) % this.table.length;
        var src = this.table[index];
        color.r = src.r;
        color.g = src.g;
        color.b = src.b;
    },
    fill: function (color, offset) 
    {
        var index = Math.ceil(Math.random() * this.table.length) % this.table.length;
        var src = this.table[index];
        color[offset] = src.r;
        color[offset+1] = src.g;
        color[offset+2] = src.b;
    },
    default_table: function ()
    {
        this.table = new Array(8);
        this.table[0] = new THREE.Color(1, 0, 0);
        this.table[1] = new THREE.Color(0, 1, 0);
        this.table[2] = new THREE.Color(0, 0, 1);
        this.table[3] = new THREE.Color(1, 0, 1);
        this.table[4] = new THREE.Color(1, 1, 0);
        this.table[5] = new THREE.Color(1, 0.4, 0.4);
        this.table[6] = new THREE.Color(0.5, 0.7, 0.98);
        this.table[7] = new THREE.Color(0.9, 0.4, 0.4);
    },
    get: function ()
    {
        var r = {r: 0, g: 0, b: 0};
        this.emit(r);
        return r;
    }
});

My_Lib.Register_Class("Table_Color", Table_Color);

export {Color_Domain, Table_Color};