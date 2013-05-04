Game = Jnt.Game.extend({
	onInit: function()
	{
		sc_Menu.setActive();

		this.tm = new Jnt.Tilemap('desert');
	},

	onUpdate: function()
	{
	},

	onDraw: function(modifier)
	{
		this.tm.draw('canvas', 0, 0);

		Jnt.Render.draw(function()
		{
			var ctx = Jnt.Canvas.getContext('canvas');
			ctx.fillText("FPS: " + (
				(
					modifier * 1000
					) | 0
				), 10, 20);
		}, 999999);
	}
});

new Game();