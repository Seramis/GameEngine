Jnt.Render = new function(){
	var aImageBatch = [];

	/**
	 * Render with zIndex
	 *
	 * @param {Function} fDraw
	 * @param {Integer} zIndex
	 */
	this.draw = function(fDraw, zIndex)
	{
		if(!zIndex) zIndex = 0;

		zIndex = zIndex | 0;

		aImageBatch.push({
			fDraw: fDraw,
			zIndex: zIndex
		});
	};

	/**
	 * Render batch and empty batch
	 *
	 * @param {Integer} modifier
	 * @return {Boolean}
	 */
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