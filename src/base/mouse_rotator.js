function Mouse_Rotator(camera)
{
    this.camera;
}


Mouse_Rotator.prototype.enable = function (dom)
{
    var self = this;
    
    function down(event) 
    {
        self.is_down = true;
        self.down_position.x = event.clientX;
        self.down_position.y = event.clientY;
    }
    
    this.dom.addEventListener("mousedown", down);
    
    function up(event)
    {
        self.is_down = false;
        self.up_position.x = event.clientX;
        self.up_position.y = event.clientY;
        
    }
    
   this.dom.addEventListener("mouseup", up);

   function move(event)
   {
        if (self.is_down) {
            var x = (event.clientX / window.innerWidth) * 2 - 1;
            var y = -(event.clientY / window.innerHeight) * 2 + 1;

        }
         if ( self.mouseDown ) {
            theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 )
                    + onMouseDownTheta;
            phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 )
                  + onMouseDownPhi;

            phi = Math.min( 180, Math.max( 0, phi ) );

            var camera = self.main_camera;
            camera.position.x = radious * Math.sin( theta * Math.PI / 360 )
                                * Math.cos( phi * Math.PI / 360 );
            camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
            camera.position.z = radious * Math.cos( theta * Math.PI / 360 )
                                * Math.cos( phi * Math.PI / 360 );
            camera.updateMatrix();
        }
   
   }
   
    this.dom.addEventListener("mousemove", move);

        
}