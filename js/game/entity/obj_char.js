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
		this.Sprite.bRun = false;

		var stepSpeed = this.speed * modifier;

		if(Jnt.Input.isKeyDown(Jnt.Input.keys.ArrowDown))
		{
			this.Sprite.setAnimation('walk_down');
			this.Sprite.bRun = true;
			this.y += stepSpeed;
		}

		if(Jnt.Input.isKeyDown(Jnt.Input.keys.ArrowUp))
		{
			this.Sprite.setAnimation('walk_up');
			this.Sprite.bRun = true;
			this.y -= stepSpeed;
		}

		if(Jnt.Input.isKeyDown(Jnt.Input.keys.ArrowRight))
		{
			this.Sprite.setAnimation('walk_right');
			this.Sprite.bRun = true;
			this.x += stepSpeed;
		}

		if(Jnt.Input.isKeyDown(Jnt.Input.keys.ArrowLeft))
		{
			this.Sprite.setAnimation('walk_left');
			this.Sprite.bRun = true;
			this.x -= stepSpeed;
		}
	},

	onDraw: function(modifier)
	{
		this.Sprite.animate(modifier);

		this.Sprite.zIndex = this.y;
		this.Sprite.draw('canvas', this.x, this.y);
	}
});