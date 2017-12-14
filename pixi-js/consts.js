var WIDTH = 1280;
var HEIGHT = 720;

// pixels/tick
var WALK_SPEED = 3;

const STATES = {
    TITLE_SCREEN: 0,
    CREDITS_SCREEN: 1,
    PRESENT_LAB: 2
}

const RESOURCES = {
    ui_elements_sheet: "../assets/img/staticHUDView/UI_Elements/UI_Elements.png",
    timepack: "../assets/img/staticHUDView/backpack.png",
    lab_building_internal_sheet: "../assets/img/presentLabView/spr_tiles_scifi.png",
    character: "../assets/img/character.png"
}

getKeyByValue = function( object, value ) {
    for( var prop in object ) {
        if( object.hasOwnProperty( prop ) ) {
             if( object[ prop ] === value )
                 return prop;
        }
    }
}

const CREDITS_TEXT = "" +

"PixiJS v4\n" +
"pixi.js\n" +
"http://www.pixijs.com/\n" +
"MIT License, Copyright (c) 2013-2017 Mathew Groves, Chad Engler\n\n\n" +

"tween.js\n" +
"Tween.js\n" +
"https://github.com/tweenjs/tween.js\n" +
"MIT License, Copyright (c) 2010-2012 Tween.js authors.\n" + 
"Easing equations Copyright (c) 2001 Robert Penner http://robertpenner.com/easing/\n\n\n" + 

"Propaganda font\n" + 
"propaganda.ttf\n" +
"http://www.squaregear.net/fonts/\n" +
"Copyright (C) 2012 by Matthew Welch\n\n\n" +

"Technozomians Spacestation\n" +
"timecenter.png\n" +
"https://opengameart.org/content/technozomians-spacestation\n" +
"CC-BY 3.0 2016 Technozomians\n\n\n" +

"UI_Elements\n" + 
"UI_Elements.png\n" +
"http://opengameart.org/users/buch\n" + 
"CC-BY 3.0 & GPL 3.0 2012 Buch\n\n\n" +

"Backpack, packing, travel icon\n" +
"backpack.png\n" +
"https://www.iconfinder.com/icons/2321499/backpack_packing_travel_icon\n" +
"CC-BY 3.0 Jonathan Collie\n\n\n";