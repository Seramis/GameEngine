Jnt.Canvas = {
	_aCanvas: {}
};

Jnt.Canvas.getContext = function(sCanvasId)
{
	return this._get(sCanvasId).context;
};

Jnt.Canvas.getCanvas = function(sCanvasId)
{
	return this._get(sCanvasId).canvas;
};

Jnt.Canvas._get = function(sCanvasId)
{
	if(!this._aCanvas[sCanvasId])
	{
		var canvas = document.getElementById(sCanvasId);

		if(!canvas)
		{
			var canvas = document.createElement("canvas");
			canvas.id = sCanvasId;
		}

		this._aCanvas[sCanvasId] = {canvas: canvas, context: canvas.getContext("2d")};
	}

	return this._aCanvas[sCanvasId];
};