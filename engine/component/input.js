Jnt.Input = new function()
{
	this.keys = {
		Backspace: 8,
		Tab: 9,
		Enter: 13,
		Shift: 16,
		Ctrl: 17,
		Alt: 18,
		Pause: 19,
		CapsLock: 20,
		Escape: 27,
		Space: 32,
		PageUp: 33,
		PageDown: 34,
		End: 35,
		Home: 36,
		ArrowLeft: 37,
		ArrowUp: 38,
		ArrowRight: 39,
		ArrowDown: 40,
		Insert: 45,
		Delete: 46,
		0: 48,
		1: 49,
		2: 50,
		3: 51,
		4: 52,
		5: 53,
		6: 54,
		7: 55,
		8: 56,
		9: 57,
		a: 65,
		b: 66,
		c: 67,
		d: 68,
		e: 69,
		f: 70,
		g: 71,
		h: 72,
		i: 73,
		j: 74,
		k: 75,
		l: 76,
		m: 77,
		n: 78,
		o: 79,
		p: 80,
		q: 81,
		r: 82,
		s: 83,
		t: 84,
		u: 85,
		v: 86,
		w: 87,
		x: 88,
		y: 89,
		z: 90,
		WinKeyLeft: 91,
		WinKeyRight: 92,
		Select: 93,
		Num0: 96,
		Num1: 97,
		Num2: 98,
		Num3: 99,
		Num4: 100,
		Num5: 101,
		Num6: 102,
		Num7: 103,
		Num8: 104,
		Num9: 105,
		Multiply: 106,
		Add: 107,
		Subtract: 108,
		Decimal: 110,
		Divide: 111,
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		NumLock: 144,
		ScrollLock: 145,
		SemiColon: 186,
		EqualSign: 187,
		Comma: 188,
		Dash: 189,
		Period: 190,
		SlashForward: 191,
		GraveAccent: 192,
		BracketOpen: 219,
		SlashBackward: 220,
		BracketClose: 221,
		QuoteSingle: 222
	};

	this.mouse = {
		LeftButton: 0,
		MiddleButton: 1,
		RightButton: 2
	};

	var _aKeyBuffer = [];
	var _aKeyDownNow = [];
	var _aKeyDownLast = [];

	var _aMouseBuffer = [];
	var _aMouseDownNow = [];
	var _aMouseDownLast = [];

	var _oMousePos = {x: 0, y:0};

	this.isKeyDown = function(iKeyCode)
	{
		return _aKeyBuffer[iKeyCode] === true;
	};

	this.isKeyPressed = function(iKeyCode)
	{
		return (
			_aKeyDownLast[iKeyCode] !== true
			&& _aKeyDownNow[iKeyCode] === true
		);
	};

	this.isKeyReleased = function(iKeyCode)
	{
		return (
			_aKeyDownLast[iKeyCode] === true
			&& _aKeyDownNow[iKeyCode] !== true
		);
	};

	this.isMouseDown = function(iButtonId)
	{
		return _aMouseBuffer[iButtonId] === true;
	};

	this.isMousePressed = function(iButtonId)
	{
		return (
			_aMouseDownLast[iButtonId] !== true
			&& _aMouseDownNow[iButtonId] === true
			);
	};

	this.isMouseReleased = function(iButtonId)
	{
		return (
			_aMouseDownLast[iButtonId] === true
			&& _aMouseDownNow[iButtonId] !== true
			);
	};

	this.getMouseXY = function()
	{
		return _oMousePos;
	};

	this.update = function()
	{
		_aKeyDownLast = _aKeyDownNow.slice(0);
		_aKeyDownNow = _aKeyBuffer.slice(0);

		_aMouseDownLast = _aMouseDownNow.slice(0);
		_aMouseDownNow = _aMouseBuffer.slice(0);
	};

	//Events

	var _onKeyDown = function(event)
	{
		_aKeyBuffer[event.keyCode] = true;
	};

	var _onKeyUp = function(event)
	{
		_aKeyBuffer[event.keyCode] = false;
	};

	window.addEventListener('keydown', _onKeyDown);
	window.addEventListener('keyup', _onKeyUp);

	var _onMouseDown = function(event)
	{
		_aMouseBuffer[event.button] = true;
	};

	var _onMouseUp = function(event)
	{
		_aMouseBuffer[event.button] = false;
	};

	var _onMouseMove = function(event)
	{
		_oMousePos = {x: event.clientX, y: event.clientY};
	};

	window.addEventListener('mousedown', _onMouseDown);
	window.addEventListener('mouseup', _onMouseUp);
	window.addEventListener('mousemove', _onMouseMove);
}();