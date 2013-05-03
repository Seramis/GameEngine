Jnt.Scene = function()
{
	this._aEntity = [];

	this._bInit = false;
};

Jnt.Scene.prototype.onInit = function(){};
Jnt.Scene.prototype._onInit = function(){
	this.onInit();
};

Jnt.Scene.prototype.onUpdate = function(){};
Jnt.Scene.prototype._onUpdate = function(modifier){
	this.onUpdate(modifier);

	for(var i in this._aEntity)
	{
		this._aEntity[i].onUpdate(modifier);
	}
};

Jnt.Scene.prototype.onDraw = function(){};
Jnt.Scene.prototype._onDraw = function(modifier){
	this.onDraw(modifier);

	var aZiEntity = this._aEntity.slice();

	aZiEntity.sort(function(e1, e2){
		return e1.zIndex - e2.zIndex;
	});

	for(var i in aZiEntity)
	{
		aZiEntity[i].onDraw(modifier);
	}
};

Jnt.Scene.prototype.setActive = function()
{
	Jnt.Scene._activeScene = this;

	if(!this._bInit)
	{
		this._onInit();

		this._bInit = true;
	}
};

Jnt.Scene._activeScene = undefined;