Jnt.Asset = {
	_cache: {}
};

Jnt.Asset.get = function(sAssetUrl, fCallback)
{
	if(!this._cache[sAssetUrl])
	{
		return this._load(sAssetUrl, fCallback);
	}

	fCallback(this._cache[sAssetUrl]);

	return true;
};

Jnt.Asset.getBatch = function(aAssetUrl, fCallback)
{
	var count = aAssetUrl.length,
		aAssetList = [];

	for(var i = 0, l = aAssetUrl.length; i < l; i++)
	{
		this.get(aAssetUrl[i], function(newAsset){
			count--;
			aAssetList.push(newAsset);

			if(count == 0 && fCallback)
			{
				fCallback(aAssetList);
			}
		});
	}

	return true;
};

Jnt.Asset._getType = function(sAssetUrl)
{
	if(sAssetUrl.indexOf('.jpg') != -1 || sAssetUrl.indexOf('.jpeg') != -1 || sAssetUrl.indexOf('.png') != -1 || sAssetUrl.indexOf('.gif') != -1)
	{
		return 'image';
	}

	if(sAssetUrl.indexOf('.json') != -1)
	{
		return 'json';
	}

	if(sAssetUrl.indexOf('.js') != -1)
	{
		return 'javascript';
	}

	if(sAssetUrl.indexOf('.ogg') != -1)
	{
		return 'sound';
	}

	return undefined;
};

Jnt.Asset._load = function(sAssetUrl, fCallback)
{
	var asset;
	switch(this._getType(sAssetUrl))
	{
		case 'image':
			asset = new Image();
			asset.onload = function()
			{
				if(fCallback)
				{
					fCallback(asset);
				}
			};
			asset.src = sAssetUrl;
			break;
		case 'javascript':
			asset = document.createElement('script');
			asset.setAttribute('type', 'text/javascript');
			asset.onload = function()
			{
				if(fCallback)
				{
					fCallback(asset);
				}
			};
			asset.setAttribute('src', sAssetUrl);
			document.getElementsByTagName('head')[0].appendChild(asset);
			break;
		case 'json':
			asset = {};
			var xhr = new XMLHttpRequest();
			xhr.open('GET', sAssetUrl, true);
			xhr.overrideMimeType("application/json");
			xhr.onload = function()
			{
				asset = eval('(' + this.responseText + ')');
				if(fCallback)
				{
					fCallback(asset);
				}
			};
			xhr.send();
			break;
		default:
			return false;
	}

	this._cache[sAssetUrl] = asset;

	return true;
};