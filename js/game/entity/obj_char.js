var obj_Char = Jnt.Entity.extend({
	x: 0,
	y: 0,
	speed: 60,

	onInit: function()
	{
		this.Sprite = new Jnt.Sprite('char');
	},

	onUpdate: function(modifier)
	{
		var stepSpeed = this.speed * modifier;

		if(Jnt.Input.isKeyDown(Jnt.Input.keys.ArrowDown))
		{
			this.y += stepSpeed;
		}

		if(Jnt.Input.isKeyDown(Jnt.Input.keys.ArrowUp))
		{
			this.y -= stepSpeed;
		}

		if(Jnt.Input.isKeyDown(Jnt.Input.keys.ArrowRight))
		{
			this.x += stepSpeed;
		}

		if(Jnt.Input.isKeyDown(Jnt.Input.keys.ArrowLeft))
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