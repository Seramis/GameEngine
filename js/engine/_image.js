Jnt.Image = function(sFile)
{
	var c_img = Jnt.Image.getFromCache(sFile);

	if(c_img)
	{
		return c_img;
	}

	this._sFile = sFile;
	this._bLoaded = false;

	//Image
	this._imgImage = new Image();
	var img = this;
	this._imgImage.onload = function(){ img._loadFinished(); };
	this._imgImage.src = this._sFile;

	this.width = undefined;
	this.height = undefined;

	this.orignX = 0;
	this.orignY = 0;

	Jnt.Image.putIntoCache(this);
};

Jnt.Image.prototype._loadFinished = function()
{
	this.width = this._imgImage.width;
	this.height = this._imgImage.height;

	this._bLoaded = true;
};

Jnt.Image.prototype.draw = function(canvas_id, x, y, width, height, sourceX, sourceY, sourceWidth, sourceHeight)
{
	if(!this._bLoaded) //Image must be loaded
	{
		return false;
	}

	var ctx = Jnt.Canvas.getContext(canvas_id);

	if(!ctx) //Context must be available
	{
		return false;
	}

	//Default values
	if(!width)
	{
		width = this.width;
	}
	if(!height)
	{
		height = this.height;
	}
	if(!sourceX)
	{
		sourceX = 0;
	}
	if(!sourceY)
	{
		sourceY = 0;
	}
	if(!sourceWidth)
	{
		sourceWidth = this.width;
	}
	if(!sourceHeight)
	{
		sourceHeight = this.height;
	}

	//Draw the image
	ctx.drawImage(this._imgImage, sourceX, sourceY, sourceWidth, sourceHeight, x - this.orignX, y - this.orignY, width, height);

	return true;
};

// ==========

Jnt.Image._cache = {};

Jnt.Image.getFromCache = function(sFile)
{
	return this._cache[sFile];
};

Jnt.Image.putIntoCache = function(Img)
{
	this._cache[Img.sFile] = Img;
};