Jnt.Render = new function(){
	var aImageBatch = [];

	this.draw = function(fDraw, zIndex)
	{
		if(!zIndex) zIndex = 0;

		aImageBatch.push({
			fDraw: fDraw,
			zIndex: zIndex
		});
	};

	this.render = function(modifier)
	{
		aImageBatch.sort(function(a, b){
			return a.zIndex - b.zIndex
		});

		for(var i = 0, l = aImageBatch.length; i < l; i++)
		{
			aImageBatch[i].fDraw(modifier);
		}

		aImageBatch = [];

		return true;
	};
}();