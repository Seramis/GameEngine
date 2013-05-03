Game = Jnt.Game.extend({
	onInit: function()
	{
		sc_Menu.setActive();

		this.tm = new Jnt.Tilemap('desert');
		console.log(this.tm);
	},

	onUpdate: function()
	{
	},

	onDraw: function()
	{
		var ctx = Jnt.Canvas.getContext('canvas');

		var canvas = Jnt.Canvas.getCanvas('canvas');

		ctx.clearRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));

		this.tm.draw('canvas', 0, 0);
	}
});

new Game();