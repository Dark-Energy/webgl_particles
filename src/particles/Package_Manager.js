function Package_Manager()
{
    this.state = {};
}

//load json file with descriptions of package: texture list, particles list, scene objects list
Package_Manager.prototype.load = function (url, defaults)
{
    this.defaults = defaults;
    var self = this;
    this.state = {
        "type": "start"
    };
    
    var self = this;
    function onload (data) {
        self.state["type"] = "done";
        self.state["data"] = data;
        console.log("onload packaged");
        self.parse_package_description(data);        
    }    
    function error(event) {
        self.state["type"] = "error";
        self.state["error"] = event;
        console.error("ERror! Failed loading resources with url "+url, event.target);        
        if (self.error){
            self.error(event.target);
        }
        self.pack = self.defaults
        self.load_resources(self.defaults);

    }
    function progress()
    {
    }
    var xhr = new THREE.XHRLoader();
    xhr.load(url, onload, progress, error);
}

//parse loaded json file 
Package_Manager.prototype.parse_package_description = function (data)
{
  try {
        var pack = JSON.parse(data);
        this.pack = pack;
        if (this.loaded) {
            this.loaded(pack);
        }
        
   } 
   catch(e) {
        console.error("error parsing resources ", e);
        if (this.error){
            this.error(event);
        }
        return;        
   }
   this.load_resources(pack);
}


Package_Manager.prototype.load_resources = function (pack)
{
    var self = this;
    //load textures
    My_Lib.Texture_Manager.load_list_textures(pack.textures, function (){
        //load json descriptions files
                if (self.data_loaded) {
                    self.data_loaded(pack);
                }
    })
}