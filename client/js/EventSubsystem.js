function EventSubsystem() {
    
/*  private members and functions   */
//---------------------------------------------------
var listeners = {};

var limit = function(name, num, callback) {
    if(false == this.listeners.hasOwnProperty(name)) {
        this.listeners[name] = [];
    }
    
    this.listeners[name].push({'num': num, 'callback': callback });
}

/*  public functions    */
//---------------------------------------------------
this.on = function(name, callback) {
    this.limit(name, -1, callback);
}


this.once = function(name, callback) {
    this.limit(name, 1, callback);
}

this.fire = function(name, data) {
    if( false == listeners.hasOwnProperty(name)) return;
    
    for(var i=0; i<listeners[name].length; ++i) {
        var listener = listeners[name][i];
        listener.callback(data);
        
        if(--listener.num == 0) {
            //remove the listener if the counter reach zero
            listeners.splice(i, 1);    
        }
    }
}
    
}       //end function EventSubsystem

