Jnt.Canvas = {
	_aCanvas: {}
};

Jnt.Canvas.getContext = function(canvas_id)
{
	return this.get(canvas_id).getContext("2d");
};

Jnt.Canvas.get = function(canvas_id)
{
	if(!this._aCanvas[canvas_id])
	{
		var el = document.getElementById(canvas_id);

		if(el)
		{
			this._aCanvas[canvas_id] = el;
		}
		else
		{
			var canvas = document.createElement("canvas");
			canvas.id = canvas_id;

			this._aCanvas[canvas_id] = canvas;
		}
	}

	return this._aCanvas[canvas_id];
};