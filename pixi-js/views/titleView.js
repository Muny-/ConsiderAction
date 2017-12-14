var titleView = (function() {
    
    var stage = new PIXI.Container();
    stage.visible = false;

    var objs = {
        logoImg: createStaticImage(pt(0.5,0.5), [WIDTH/2, (HEIGHT/2)-120], Img2Texture('../assets/img/titleView/logo.png')),
        startGameButton: createButton(pt(0.5,0.5), [WIDTH/2, HEIGHT/2], Img2Texture('../assets/img/titleView/startGame.png'), () => {animateSetState(STATES.PRESENT_LAB)}),
        creditsButton: createButton(pt(0.5,0.5), [WIDTH/2, (HEIGHT/2)+60], Img2Texture('../assets/img/titleView/credits.png'), () => {setState(STATES.CREDITS_SCREEN)})
    }

    return {
        stage: stage,

        isLocationValid: function() {
            return true;
        },

        shown: function() {
            
        },

        initialize: function() {        

            for(var key in objs) {
                this.stage.addChild(objs[key]);
            };
        }
    };
})();