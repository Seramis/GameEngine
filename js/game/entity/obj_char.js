var obj_Char = Jnt.Entity.extend({
	x: 0,
	y: 0,
	speed: 60,

	onInit: function()
	{
		console.log('obj_Char onInit');

		this.Sprite = new Jnt.Sprite('char');
	},

	onUpdate: function(modifier)
	{
		var stepSpeed = this.speed * modifier;

		if(Jnt.Keyboard.isKeyDown(Jnt.Keyboard.keys.ArrowDown))
		{
			this.y += stepSpeed;
		}

		if(Jnt.Keyboard.isKeyDown(Jnt.Keyboard.keys.ArrowUp))
		{
			this.y -= stepSpeed;
		}

		if(Jnt.Keyboard.isKeyDown(Jnt.Keyboard.keys.ArrowRight))
		{
			this.x += stepSpeed;
		}

		if(Jnt.Keyboard.isKeyDown(Jnt.Keyboard.keys.ArrowLeft))
		{
			this.x -= stepSpeed;
		}
	},

	onDraw: function(modifier)
	{
		this.Sprite.animate(modifier);

		this.Sprite.draw('canvas', this.x, this.y);
	}
});