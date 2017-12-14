function createButton(anchor, position, texture, clickEvent) {
    
    var button = new PIXI.Sprite(texture);
    button.interactive = true;

    button.animateProperties = function(obj, final_props) {
        if(button.tween !== undefined)
            button.tween.stop();

        button.tween = new TWEEN.Tween( obj )
        .to( final_props, 60 )
        .easing(TWEEN.Easing.Cubic.InOut)
        .start();
    }
    
    // positioning coordinates are based on center of button
    button.anchor = anchor;
    
    // center
    button.x = position[0];
    button.y = position[1];

    button.on('mouseover', (evt) => {
        button.animateProperties(button.scale, {x: 1.1, y: 1.1});
    })

    button.on('mouseout', (evt) => {
        button.animateProperties(button.scale, {x: 1, y: 1});
    })

    button.on('mousedown', (evt) => {
        button.animateProperties(button.scale, {x: 0.9, y: 0.9});
    });

    button.on('mouseup', (evt) => {
        button.animateProperties(button.scale, {x: 1.1, y: 1.1});
    });

    button.on('click', (evt) => {
        clickEvent();
    });

    return button;
}

function createStaticImage(anchor, position, texture) {
    var img = new PIXI.Sprite(texture);

    img.anchor = anchor;

    img.x = position[0];
    img.y = position[1];

    return img;
}

function Img2Texture(path) {
    return PIXI.Texture.fromImage(path);
}

function pt(x,y) {
    return new PIXI.Point(x,y);
}

function rect(x,y,w,h) {
    return new PIXI.Rectangle(x,y,w,h);
}

function keyboard(keyCode, onPress, onRelease) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = onPress;
    key.release = onRelease;
    //The `downHandler`
    key.downHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}

// return true if the rectangle and circle are colliding
function CircleRectColliding(circle,rect){
    
    var distX = Math.abs(circle.x - rect.x-rect.width/2);
    var distY = Math.abs(circle.y - rect.y-rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius));
}