/**
 * Asset manager
 */
Jnt.Asset = new function(){
	var cache = {};

	/**
	 * Get one asset
	 *
	 * @param {String} sAssetUrl
	 * @param {Function} fCallback
	 * @return {Boolean}
	 */
	this.get = function(sAssetUrl, fCallback)
	{
		if(!cache[sAssetUrl])
		{
			return load(sAssetUrl, fCallback);
		}
		else if(!cache[sAssetUrl].bLoaded)
		{
			return addCallback(sAssetUrl, fCallback);
		}

		fCallback(cache[sAssetUrl].asset);

		return true;
	};

	/**
	 * Get multiple assets with one callback in the end
	 *
	 * @param {Array} aAssetUrl
	 * @param {Function} fCallback
	 * @return {Boolean}
	 */
	this.getBatch = function(aAssetUrl, fCallback)
	{
		var count = aAssetUrl.length,
			aAssetList = [];

		for(var i = 0, l = aAssetUrl.length; i < l; i++)
		{
			this.get(aAssetUrl[i], function(newAsset)
			{
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

	/**
	 * Private function to get type based on file extension
	 *
	 * @param {String} sAssetUrl
	 * @return {String}
	 */
	var getType = function(sAssetUrl)
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

	/**
	 * Register a callback for asset onload
	 *
	 * @param {String} sAssetUrl
	 * @param {Function} fCallback
	 * @return {Boolean}
	 */
	var addCallback = function(sAssetUrl, fCallback)
	{
		if(!cache[sAssetUrl])
		{
			return false;
		}

		if(!fCallback)
		{
			return false;
		}

		cache[sAssetUrl].aCallbackList.push(fCallback);

		return true;
	};

	/**
	 * Load asset into cache
	 *
	 * @param {String} sAssetUrl
	 * @param {Function} fCallback
	 * @return {Boolean}
	 */
	var load = function(sAssetUrl, fCallback)
	{
		var assetData = {
			asset: undefined,
			aCallbackList: [],
			bLoaded: false
		};

		switch(getType(sAssetUrl))
		{
			case 'image':
				assetData.asset = new Image();
				assetData.asset.onload = function()
				{
					runCallback(sAssetUrl);
				};
				assetData.asset.src = sAssetUrl;
				break;
			case 'javascript':
				assetData.asset = document.createElement('script');
				assetData.asset.setAttribute('type', 'text/javascript');
				assetData.asset.onload = function()
				{
					runCallback(sAssetUrl);
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
					runCallback(sAssetUrl);
				};
				xhr.send();
				break;
			default:
				return false;
		}

		//We have not returned, so type at least is okay
		cache[sAssetUrl] = assetData;

		addCallback(sAssetUrl, fCallback);

		return true;
	};

	/**
	 * Run all callbacks registered to asset
	 *
	 * @param {String} sAssetUrl
	 */
	var runCallback = function(sAssetUrl)
	{
		var assetData = cache[sAssetUrl];

		assetData.bLoaded = true;

		for(var i = 0, l = assetData.aCallbackList.length; i < l; i++)
		{
			assetData.aCallbackList[i](assetData.asset);
		}
	};
}();