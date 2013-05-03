Jnt.Tilemap = function(sTilemapName)
{
	this._bLoaded = false;

	this.aLayer = [];
	this.aTileset = [];
	this.tileSize = {width: 0, height: 0};
	this.size = {width: 0, height: 0};

	var that = this;
	Jnt.Asset.get('js/game/tilemap/' + sTilemapName + '.json', function(data)
	{
		that.tileSize = {width: data.tilewidth, height: data.tileheight};
		that.size = {width: data.width, height: data.height};
		that.aLayer = data.layers;

		for(var i in data.tilesets)
		{
			var tileset = data.tilesets[i];
			var ts = {
				firstgid: tileset.firstgid,
				name: tileset.name,
				margin: tileset.margin,
				spacing: tileset.spacing,
				tilewidth: tileset.tilewidth,
				tileheight: tileset.tileheight,
				tilecount: {
					x: (tileset.imagewidth / tileset.tilewidth) | 0,
					y: (tileset.imageheight / tileset.tileheight) | 0
				}
			};
			that.aTileset[tileset.firstgid] = ts;

			Jnt.Asset.get('img/tilemap/' + tileset.image, function(img){
				ts.img = img;
				that._bLoaded = true;
			});
		}
	});
};

Jnt.Tilemap.prototype.draw = function(sCanvasId, x, y)
{
	if(!this._bLoaded)
	{
		return false;
	}

	for(var i = 0, l = this.aLayer.length; i<l; i++)
	{
		this._drawLayer(sCanvasId, this.aLayer[i], x, y);
	}
};

Jnt.Tilemap.prototype._drawLayer = function(sCanvasId, oLayerData, x, y)
{
	if(oLayerData.type != 'tilelayer')
	{
		return false;
	}

	for(var i = 0, l=oLayerData.data.length; i<l; i++)
	{
		var tileData = this._getTileData(oLayerData.data[i]);

		if(!tileData)
		{
			continue;
		}

		var tilePos = {
			x: i % this.size.width,
			y: (i / this.size.width) | 0
		};

		Jnt.Render.image(
			sCanvasId,
			tileData.img,
			tileData.x,
			tileData.y,
			tileData.width,
			tileData.height,
			tilePos.x * this.tileSize.width,
			tilePos.y * this.tileSize.height,
			this.tileSize.width,
			this.tileSize.height
		);
	}
};

Jnt.Tilemap.prototype._getTileData = function(iTileId)
{
	if(!iTileId)
	{
		return false;
	}

	var ts;

	for(var i in this.aTileset)
	{
		if(i > iTileId)
		{
			break;
		}

		ts = this.aTileset[i];
	}

	if(!ts)
	{
		return false;
	}

	var iTileIndex = iTileId - ts.firstgid;

	var pos = {
		x: iTileIndex % ts.tilecount.x,
		y: (iTileIndex / ts.tilecount.x) | 0
	};

	return {
		img: ts.img,
		x: pos.x * (ts.tilewidth + ts.spacing) + ts.margin,
		y: pos.y * (ts.tileheight + ts.spacing) + ts.margin,
		width: ts.tilewidth,
		height: ts.tileheight
	};

};