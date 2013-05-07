Jnt.Sprite = function(sSpriteName)
{
	this._iAnimationIndex = 0;
	this._bLoaded = false;
	this._curAnimation = undefined;
	this._imgSpriteImage = undefined;
	this.bRun = false;
	this.zIndex = 0;

	var that = this;
	Jnt.Asset.get('game/sprite/' + sSpriteName + '.json', function(data){
		that.oData = data;

		if(!that._curAnimation)
		{
			that._curAnimation = Object.keys(that.oData.animation)[0];
		}

		Jnt.Asset.get('game/image/' + that.oData.image, function(image)
		{
			that._imgSpriteImage = image;

			that._bLoaded = true;
		});
	});
};

Jnt.Sprite.prototype.setAnimation = function(name)
{
	this._curAnimation = name;

	return this._curAnimation;
};

Jnt.Sprite.prototype.getCurAnimation = function()
{
	if(!this._bLoaded)
	{
		return undefined;
	}

	return this.oData.animation[this._curAnimation];
};

Jnt.Sprite.prototype.getIndexCount = function()
{
	if(!this._bLoaded)
	{
		return undefined;
	}

	return this.getCurAnimation().length;
};

Jnt.Sprite.prototype.getCurrentImageIndex = function()
{
	if(!this._bLoaded)
	{
		return undefined;
	}

	var animation = this.getCurAnimation();
	return animation[(this._iAnimationIndex | 0)];
};

Jnt.Sprite.prototype.getImageOffsetByIndex = function(index)
{
	if(!this._bLoaded)
	{
		return undefined;
	}

	var width = this._imgSpriteImage.width / this.oData.size[0],
		height = this._imgSpriteImage.height / this.oData.size[1];

	var y = (index / width) | 0;
	var x = index % width;

	return [
		x * this.oData.size[0],
		y * this.oData.size[1]
	];
};

Jnt.Sprite.prototype.animate = function(modifier)
{
	if(!this._bLoaded || !this.bRun)
	{
		return false;
	}

	this._iAnimationIndex += this.oData.animationSpeed * modifier;

	var c = this.getIndexCount();
	if((this._iAnimationIndex | 0) >= c)
	{
		this._iAnimationIndex -= c;
	}

	if(isNaN(this._iAnimationIndex))
	{
		this._iAnimationIndex = 0;
	}

	return true;
};

Jnt.Sprite.prototype.draw = function(canvas_id, x, y, width, height)
{
	if(!this._bLoaded)
	{
		return false;
	}

	var sourceOffset = this.getImageOffsetByIndex(this.getCurrentImageIndex());

	if(!width)
	{
		width = this.oData.size[0];
	}
	if(!height)
	{
		height = this.oData.size[1];
	}

	var ctx = Jnt.Canvas.getContext(canvas_id);

	var that = this;

	Jnt.Render.draw(function(){
		ctx.drawImage(
			that._imgSpriteImage,
			sourceOffset[0],
			sourceOffset[1],
			that.oData.size[0],
			that.oData.size[1],
			x,
			y,
			width,
			height
		);
	}, this.zIndex);

	return true;
};