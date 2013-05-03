Game = Jnt.Game.extend({
	onInit: function()
	{
		sc_Menu.setActive();
	},

	onUpdate: function()
	{
	},

	onDraw: function()
	{
		var ctx = Jnt.Canvas.getContext('canvas');

		var canvas = Jnt.Canvas.getCanvas('canvas');

		ctx.clearRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));
	}
});

new Game();