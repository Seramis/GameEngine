Jnt.Event = {};

Jnt.Event._listeners = {};

Jnt.Event.addListener = function(type, listener){
	var typeKey = type.toLowerCase().substring(2);

	var aListeners = Jnt.Event._listeners;
	if(typeof aListeners[typeKey] == "undefined"){
		aListeners[typeKey] = [];
	}

	aListeners[typeKey].push([listener, type]);
};

Jnt.Event.addListenerObject = function(listener){
	for(var i in listener){
		if(typeof(listener[i]) == 'function'){
			if(i.substring(0, 2) == 'on'){
				Jnt.Event.addListener(i, listener);
			}
		}
	}
};

Jnt.Event.removeListener = function(type, listener){
	var aListeners = Jnt.Event._listeners;

	if(aListeners[type] instanceof Array){
		var listeners = aListeners[type];
		for(var i = 0, len = listeners.length; i < len; i++){
			if(listeners[i] === listener){
				listeners.splice(i, 1);
				break;
			}
		}
	}
};

Jnt.Event.fire = function(event){
	if(!event){
		event = window.event;
	}
	if(typeof event == "string"){
		event = { type: event };
	}
	if(!event.target){
		event.target = this;
	}

	if(!event.type){
		throw new Error("Event object missing 'type' property.");
	}

	event.type = event.type.toLowerCase();

	if(Jnt.Event._listeners[event.type] instanceof Array){
		var listeners = Jnt.Event._listeners[event.type];

		for(var i = 0, len = listeners.length; i < len; i++){
			var listener = listeners[i];
			listener[0][listener[1]].call(listener[0], event);
		}
	}
};

//==========

document.onkeydown = Jnt.Event.fire;
document.onkeyup = Jnt.Event.fire;

document.onmousemove = Jnt.Event.fire;
document.onmousedown = Jnt.Event.fire;
document.onmouseup = Jnt.Event.fire;