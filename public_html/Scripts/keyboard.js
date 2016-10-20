window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

var Key = {
  _pressed: {},

  A: 65,
  W: 87,
  D: 68,
  S: 83,
  SPACE: 32,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
    if(event.keyCode===this.S){
        camera.position.z+=10;
        rotacja=-rotacja;
    }
    if(event.keyCode===this.W){
        camera.position.z-=10;
    }
    if(event.keyCode===this.A){
        camera.position.x-=10;
    }
    if(event.keyCode===this.D){
        camera.position.x+=10;
    }
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

