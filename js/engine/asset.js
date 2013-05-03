/**
 * Asset manager
 */

Jnt.Asset = {
	_cache: {}
};

Jnt.Asset.get = function(sAssetUrl, fCallback)
{
	if(!this._cache[sAssetUrl])
	{
		return this._load(sAssetUrl, fCallback);
	}
	else if(!this._cache[sAssetUrl].bLoaded)
	{
		return this._addCallback(sAssetUrl, fCallback);
	}

	fCallback(this._cache[sAssetUrl].asset);

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

Jnt.Asset._addCallback = function(sAssetUrl, fCallback)
{
	if(!this._cache[sAssetUrl])
	{
		return false;
	}

	if(!fCallback)
	{
		return false;
	}

	this._cache[sAssetUrl].aCallbackList.push(fCallback);

	return true;
};

Jnt.Asset._load = function(sAssetUrl, fCallback)
{
	var assetData = {
		asset: undefined,
		aCallbackList: [],
		bLoaded: false
	};

	switch(this._getType(sAssetUrl))
	{
		case 'image':
			assetData.asset = new Image();
			assetData.asset.onload = function()
			{
				Jnt.Asset._runCallback(sAssetUrl);
			};
			assetData.asset.src = sAssetUrl;
			break;
		case 'javascript':
			assetData.asset = document.createElement('script');
			assetData.asset.setAttribute('type', 'text/javascript');
			assetDataasset.onload = function()
			{
				Jnt.Asset._runCallback(sAssetUrl);
			};
			assetData.asset.setAttribute('src', sAssetUrl);
			document.getElementsByTagName('head')[0].appendChild(assetData.asset);
			break;
		case 'json':
			assetData.asset = {};
			var xhr = new XMLHttpRequest();
			xhr.open('GET', sAssetUrl, true);
			xhr.overrideMimeType("application/json");
			xhr.onload = function()
			{
				assetData.asset = eval('(' + this.responseText + ')');
				Jnt.Asset._runCallback(sAssetUrl);
			};
			xhr.send();
			break;
		default:
			return undefined;
	}

	//We have not returned, so type at least is okay
	this._cache[sAssetUrl] = assetData;

	Jnt.Asset._addCallback(sAssetUrl, fCallback);

	return true;
};

Jnt.Asset._runCallback = function(sAssetUrl)
{
	var assetData = this._cache[sAssetUrl];

	assetData.bLoaded = true;

	for(var i = 0, l = assetData.aCallbackList.length; i<l; i++)
	{
		assetData.aCallbackList[i](assetData.asset);
	}
};