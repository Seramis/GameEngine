Jnt.Game = Class.extend({
	init: function()
	{
		this._isPaused = false;

		this._lastTickTime = Date.now();

		this.onInit();

		this.onAnimFrame();
	},

	pause: function(setPaused)
	{
		this._isPaused = setPaused ? true : false;
	},

	onAnimFrame: function()
	{
		var delta = (Date.now() - this._lastTickTime) / 1000;
		this._lastTickTime = Date.now();

		if(!this._isPaused)
		{
			//Update
			this.onUpdate(delta);

			Jnt.Scene._activeScene ? Jnt.Scene._activeScene._onUpdate(delta) : null;

			//Draw
			this.onDraw(delta);
			Jnt.Scene._activeScene ? Jnt.Scene._activeScene._onDraw(delta) : null;
		}

		var that = this;

		requestAnimFrame(function(){ that.onAnimFrame.call(that); });
	},

	onUpdate: function(){},

	onDraw: function(){}
});