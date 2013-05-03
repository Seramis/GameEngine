Jnt.Input = {

	_aKeyDown: [],
	keys: {
		ArrowLeft: 37,
		ArrowUp: 38,
		ArrowRight: 39,
		ArrowDown: 40
	},

	_aMouseDown: [],
	mouse: {
		LeftButton: 0,
		MiddleButton: 1,
		RightButton: 2
	},
	_oMousePos: {x: 0, y:0}
};

Jnt.Input.isKeyDown = function(iKeyId)
{
	return this._aKeyDown[iKeyId] === true;
};

Jnt.Input.isMouseDown = function(iButtonId)
{
	return this._aMouseDown[iButtonId] === true;
};

Jnt.Input.getMouseXY = function()
{
	return this._oMousePos;
};


//Events

Jnt.Input.onKeyDown = function(event)
{
	this._aKeyDown[event.keyCode] = true;
};

Jnt.Input.onKeyUp = function(event)
{
	this._aKeyDown[event.keyCode] = false;
};

Jnt.Input.onMouseDown = function(event)
{
	this._aMouseDown[event.button] = true;
};

Jnt.Input.onMouseUp = function(event)
{
	this._aMouseDown[event.button] = false;
};

Jnt.Input.onMouseMove = function(event)
{
	this._oMousePos = {x: event.clientX, y: event.clientY};
};

Jnt.Event.addListenerObject(Jnt.Input);