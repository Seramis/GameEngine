GameEngine
==========

For building advanced HTML5 games easily.
Idea is to make framework so good, that making game would be a bliss!

Structure
=========

Game<Scene<Entity

There's 1 Game, that drives many Scenes (1 active at one time) that drives containing Entities.

Each entity can do whatever they want. For example load a Sprite into it and drive it.

Sprite is json, Entity is extended from Jnt.Entity, Scene is object and Game is also extended from Jnt.Game. (Maybe game should be like Scene...)

Game, Scene, Entity all have onUpdate() and onDraw() methods, which both are provided with delta. (a multiplier that can be used for movements for ex.)

Running
=======

Currently, getJs.php is used to "compile" multiple js files into one file in right order. In future, some kind of async loading feature should be implemented.