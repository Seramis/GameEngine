Jnt.Canvas = new function()
{
	//Canvas cache
	var _aCanvas = {};

	//Canvas data loader/getter
	var _get = function(sCanvasId)
	{
		if(!_aCanvas[sCanvasId])
		{
			var canvas = document.getElementById(sCanvasId);

			if(!canvas)
			{
				var canvas = document.createElement("canvas");
				canvas.id = sCanvasId;
			}

			_aCanvas[sCanvasId] = {canvas: canvas, context: canvas.getContext("2d")};
		}

		return _aCanvas[sCanvasId];
	};

	/**
	 * @param {string} sCanvasId
	 * @return context
	 */
	this.getContext = function(sCanvasId)
	{
		return _get(sCanvasId).context;
	};

	/**
	 * @param {string} sCanvasId
	 * @return {HTMLCanvasElement}
	 */
	this.getCanvas = function(sCanvasId)
	{
		return _get(sCanvasId).canvas;
	};
}();