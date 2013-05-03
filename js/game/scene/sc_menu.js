sc_Menu = new Jnt.Scene();

sc_Menu.onInit = function()
{
	console.log('sc_Menu Init');

	this.obj_char = new obj_Char();

	this.obj_char2 = new obj_Char();

	this.obj_char2.x += 100;
	this.obj_char2.speed += 10;
};

sc_Menu.onUpdate = function()
{};

sc_Menu.onDraw = function()
{};