Jnt.Keyboard = {
	_aKeyDown: [],
	keys: {
		ArrowLeft: 37,
		ArrowUp: 38,
		ArrowRight: 39,
		ArrowDown: 40
	}
};

Jnt.Keyboard.onKeyDown = function(event)
{
	this._aKeyDown[event.keyCode] = true;
};

Jnt.Keyboard.onKeyUp = function(event)
{
	this._aKeyDown[event.keyCode] = false;
};

Jnt.Keyboard.isKeyDown = function(iKeyId)
{
	return this._aKeyDown[iKeyId] === true;
};

Jnt.Event.addListenerObject(Jnt.Keyboard);