<?php

$aScriptPaths = array(
	'js/engine/util.js',
	'js/engine/core.js',
	'js/engine/asset.js',
	'js/engine/canvas.js',
	'js/engine/sprite.js',
	'js/engine/entity.js',
	'js/engine/scene.js',
	'js/engine/game.js',
	'js/engine/component/event.js',
	'js/engine/component/keyboard.js',

	'js/game/sprite/*.js',
	'js/game/entity/*.js',
	'js/game/scene/*.js',
	'js/game/game.js',
);
header('Content-type: text/javascript');

echo makeBigFile($aScriptPaths, 'Jnt Game Engine');

function makeBigFile($aScriptPaths, $sDescription = null)
{
	$sContent = '';

	if($sDescription)
	{
		$sContent.= '/**' . PHP_EOL . '* ' . $sDescription . PHP_EOL . '*/' . PHP_EOL . PHP_EOL;
	}

	foreach($aScriptPaths as $sScript){
		foreach(glob($sScript) as $sFile){
			$sContent .= '/* === Start File: ' . $sFile . ' === */' . PHP_EOL . PHP_EOL;
			$sContent .= file_get_contents($sFile) . PHP_EOL . PHP_EOL;
			$sContent .= '/* === End File: ' . $sFile . ' === */' . PHP_EOL . PHP_EOL;
		}
	}

	return $sContent;
}