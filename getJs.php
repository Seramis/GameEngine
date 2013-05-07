<?php

$aScriptPaths = array(
	'engine/util.js',
	'engine/core.js',
	'engine/asset.js',
	'engine/event.js',
	'engine/component/*.js',

	'game/entity/*.js',
	'game/scene/*.js',
	'game/game.js',
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