Game = Jnt.Game.extend({
	onInit: function()
	{
		console.log('Game Init');

		sc_Menu.setActive();
	},

	onDraw: function()
	{
		var ctx = Jnt.Canvas.getContext('canvas');

		var canvas = Jnt.Canvas.get('canvas');

		ctx.clearRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));
	}
});

new Game();