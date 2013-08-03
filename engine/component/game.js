Jnt.Game = function(){};

Jnt.Game.prototype.pause = function(setPaused)
{
	this._isPaused = setPaused ? true : false;
};

Jnt.Game.prototype._onAnimFrame = function()
{
	var delta = (Date.now() - this._lastTickTime) / 1000;
	this._lastTickTime = Date.now();

	Jnt.Input.update();

	if(!this._isPaused)
	{
		//Update
		this._onUpdate(delta);
		Jnt.Scene._activeScene && Jnt.Scene._activeScene._onUpdate(delta);

		//Draw
		this._onDraw(delta);
		Jnt.Scene._activeScene && Jnt.Scene._activeScene._onDraw(delta);
		Jnt.Render.render();
	}

	var that = this;

	requestAnimFrame(function(){ that._onAnimFrame.call(that); });
};

Jnt.Game.prototype.onInit = function(){};
Jnt.Game.prototype.start = function()
{
	this._isPaused = false;

	this._lastTickTime = Date.now();

	this.onInit();

	this._onAnimFrame();
};

Jnt.Game.prototype.onUpdate = function(modifier){};
Jnt.Game.prototype._onUpdate = function(modifier){
	this.onUpdate(modifier);
};

Jnt.Game.prototype.onDraw = function(modifier){};
Jnt.Game.prototype._onDraw = function(modifier)
{
	this.onDraw(modifier);
};