Jnt.Entity = Class.extend({
	zIndex: 0,

	init: function()
	{
		Jnt.Scene._activeScene._aEntity.push(this);

		this.onInit();
	},

	onInit: function(){},

	onUpdate: function(){},

	onDraw: function(){}
});