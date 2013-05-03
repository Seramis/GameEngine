Jnt.Render = new function(){
	var aImageBatch = [];
	var bClearScreen = true;

	this.image = function(sCanvasId, image, sx, sy, sw, sh, dx, dy, dw, dh, zIndex)
	{
		if(!zIndex) zIndex = 0;

		aImageBatch.push({
			sCanvasId: sCanvasId,
			image: image,
			sx: sx,
			sy: sy,
			sw: sw,
			sh: sh,
			dx: dx,
			dy: dy,
			dw: dw,
			dh: dh,
			zIndex: zIndex
		});
	};

	this.render = function()
	{
		aImageBatch.sort(function(a, b){
			return a.zIndex - b.zIndex
		});

		for(var i = 0, l = aImageBatch.length; i<l; i++)
		{
			var data = aImageBatch[i];
			var ctx = Jnt.Canvas.getContext(data.sCanvasId);

			if(!ctx)
			{
				continue;
			}

			ctx.drawImage(
				data.image,
				data.sx, data.sy, data.sw, data.sh,
				data.dx, data.dy, data.dw, data.dh
			);
		}

		aImageBatch = [];

		return true;
	};

	this.getBatch = function()
	{
		return aImageBatch;
	};
}();