var creditsView = (function() {
    
    var stage = new PIXI.Container();
    stage.visible = false;

    var objs = {
        creditsText: new PIXI.Text(CREDITS_TEXT, 
            {
                align: 'center',
                fontFamily: 'Arial', 
                fontSize:18, 
                fill: 'white',
                dropShadow: true,
                dropShadowDistance: 2,
                dropShadowAngle: 0
            }),

        logoImg: createStaticImage(pt(0.5,0.5), [WIDTH/2, (HEIGHT/2)-120], Img2Texture('../assets/img/titleView/logo.png'))
        
    }

    objs.creditsText.anchor = pt(0.5,0);
    objs.creditsText.x = WIDTH/2;
    objs.creditsText.y = HEIGHT;


    return {
        stage: stage,

        isLocationValid: function() {
            return true;
        },

        shown: function() {

            objs.logoImg.y = (HEIGHT/2)-120;

            objs.creditsText.y = HEIGHT;

            new TWEEN.Tween( objs.logoImg )
                .to( { y: 100 }, 1000 )
                .easing( TWEEN.Easing.Cubic.InOut )
            .chain(

                new TWEEN.Tween(objs.creditsText)
                .to( {y: -objs.creditsText.height }, 50000 )
                .onComplete(() => {animateSetState(STATES.TITLE_SCREEN)})
            ).start();
        },

        initialize: function() {        

            for(var key in objs) {
                this.stage.addChild(objs[key]);
            };
        }
    };
})();