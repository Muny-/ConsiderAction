var CURR_STATE = STATES.TITLE_SCREEN;

var state, renderer,
    rootStage, overlayGraphics;

var keybinds, character;

const views = {
    title: titleView,
    credits: creditsView,
    presentLab: presentLabView,
    staticHUD: staticHUDView,
};

const items = [
    createItem("Copper Bus Bars", "description", )
]

var inventory = [

];

function initializeGame() {

    PIXI.settings.RENDER_OPTIONS.roundPixels = true;

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    renderer = PIXI.autoDetectRenderer(
        WIDTH, HEIGHT,
        {
            
        }
    );

    renderer.backgroundColor = 0x2e5344;

    document.body.appendChild(renderer.view);

    initializeRootStage();

    gameLoop();
    
    /*   
    // Listen for animate update
    app.ticker.add(function(delta) {
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent tranformation
        bunny.rotation += 0.1 * delta;
    });*/
}

function gameLoop(time) {
    
    //smart delay for 60fps
    requestAnimationFrame(gameLoop);

    TWEEN.update(time);

    // update state
    state();

    debugTextobj.text = debugText();

    // render...
    renderer.render(rootStage);
}

// handle things which change state
function state() {

    for(var key in views) {
        views[key].stage.visible = false;
    }

    character.visible = false;

    switch(CURR_STATE) {
        case STATES.TITLE_SCREEN:
            showView(views.title);
        break;

        case STATES.CREDITS_SCREEN:   
            showView(views.credits);
        break;

        case STATES.PRESENT_LAB:
            showView(views.staticHUD);
            showView(views.presentLab);
            character.visible = true;
        break;
    }

    for(var key in views) {
        views[key].visible = views[key].stage.visible;
    }

    for(var key in keybinds) {
        if (keybinds[key].isDown) {
            keybinds[key].press();
        }
    }
}

function showView(view) {
    if (view.visible == false) {
        view.visible = true;
        view.stage.visible = true;
        view.shown();
    }
    else
    {
        view.stage.visible = true;
    }
}

function setState(new_state) {
    TWEEN.removeAll();

    CURR_STATE = new_state;
}

function animateSetState(new_state) {
    fadeInOverlayGraphics(() => {
        setState(new_state);

        fadeOutOverlayGraphics();
    })
}

var debugTextobj;

function initializeRootStage() {
    rootStage = new PIXI.Container();

    debugTextobj = new PIXI.Text(debugText(), 
    {
        fontFamily: 'monospace', 
        fontSize:14, 
        fill: 'white',
        dropShadow: true,
        dropShadowDistance: 2,
        dropShadowAngle: 0
    });

    debugTextobj.x = 10;
    debugTextobj.y = 10;

    // background tile

    var background_sprite = new PIXI.extras.TilingSprite(new PIXI.Texture(PIXI.utils.TextureCache[RESOURCES.lab_building_internal_sheet], new PIXI.Rectangle(15*96,0*96,96,96)), renderer.width, renderer.height);

    rootStage.addChild(background_sprite);
    
    for(var key in views) {
        views[key].initialize();
        rootStage.addChild(views[key].stage);
    }

    character = new PIXI.Sprite(PIXI.utils.TextureCache[RESOURCES.character]);
    
    character.x = 100;
    character.y = 100;

    rootStage.addChild(character);

    overlayGraphics = new PIXI.Graphics();

    overlayGraphics.beginFill(0);
    overlayGraphics.drawRect(0,0,WIDTH,HEIGHT);
    overlayGraphics.alpha = 0;

    rootStage.addChild(overlayGraphics);

    rootStage.addChild(debugTextobj);

    bindKeys();
}

function bindKeys() {
    keybinds = {
        // up movement
        w: keyboard(87, handleUp, () => {

        }),
        // left movement
        a: keyboard(65, handleLeft, () => {

        }),
        // down movement
        s: keyboard(83, handleDown, () => {

        }),
        // right movement
        d: keyboard(68, handleRight, () => {

        }),
        // escape key
        esc: keyboard(27, handleEscape, () => {
            
        }),
        // tilde (debug hide/show key)
        tilde: keyboard(192, () => {}, handleTilde),
    };
}

function moveIfLocationValid(x,y) {

    if (!character.visible)
        return;

    var canMove = true;

    var circleBounds = new PIXI.Circle(x+16,y+16,16);

    for(var key in views) {
        if (views[key].stage.visible) {
            if (!views[key].isLocationValid(circleBounds)) {
                canMove = false;
                break;
            }
        }
    }
    
    if (canMove) {
        character.x = x;
        character.y = y;
    }
}

function handleUp() {
    var newY = character.y-WALK_SPEED/1.25;
    moveIfLocationValid(character.x, newY);
}

function handleLeft() {
    var newX = character.x-WALK_SPEED;
    moveIfLocationValid(newX, character.y);
}

function handleDown() {
    var newY = character.y+WALK_SPEED/1.25;
    moveIfLocationValid(character.x, newY);
}

function handleRight() {
    var newX = character.x+WALK_SPEED;
    moveIfLocationValid(newX, character.y);
}

function handleEscape() {
    switch(CURR_STATE) {
        case STATES.CREDITS_SCREEN:
            animateSetState(STATES.TITLE_SCREEN);
        break;

        case STATES.PRESENT_LAB:
            // show escape menu (save, quit, etc)
            animateSetState(STATES.TITLE_SCREEN);
        break;
    }
}

function handleTilde() {
    debugTextobj.visible = !debugTextobj.visible;
}

function fadeInOverlayGraphics(onComplete=() => {}) {
    new TWEEN.Tween( overlayGraphics )
        .to( { alpha: 1 }, 1000 )
        .easing(TWEEN.Easing.Cubic.InOut)
        .onComplete(onComplete).start();
}

function fadeOutOverlayGraphics(onComplete=() => {}) {
    new TWEEN.Tween( overlayGraphics )
        .to( { alpha: 0 }, 1000 )
        .easing(TWEEN.Easing.Cubic.InOut)
        .onComplete(onComplete).start();
}

function createItem(name, description, texture) {
    return {
        name: name,
        description: description,
        texture: texture
    }
}

function debugText() {
    var dbgstr = 
    "CURR_STATE: " + getKeyByValue(STATES, CURR_STATE) + " [ " + CURR_STATE + " ]\n" + 
    "View visibility:\n";

    for(var key in views) {
        dbgstr += "    " + key + ": " + views[key].stage.visible + "\n"; 
    }

    if (character !== undefined)
        dbgstr += "Character position:\n    x: " + character.x + "\n    y: " + character.y;

    return dbgstr;
}
