var staticHUDView = (function() {

    var stage = new PIXI.Container();
    stage.visible = false;

    var objs = {
        
    }

    return {
        stage: stage,

        isLocationValid: function() {
            return true;
        },

        initialize: function() {

            var inventoryBG_texture = new PIXI.Texture(PIXI.utils.TextureCache[RESOURCES.ui_elements_sheet], new PIXI.Rectangle(0,0,96,96));
            var escapeButton_texture = new PIXI.Texture(PIXI.utils.TextureCache[RESOURCES.ui_elements_sheet], new PIXI.Rectangle(160,96,32,32));
            var timePackTexture = new PIXI.Texture(PIXI.utils.TextureCache[RESOURCES.timepack]);

            objs["timePackInventoryBG"] = createStaticImage(pt(0.5,0.5), [WIDTH, HEIGHT], inventoryBG_texture);
            
            objs.timePackInventoryBG.x = WIDTH-objs.timePackInventoryBG.width/2;
            objs.timePackInventoryBG.y = HEIGHT-objs.timePackInventoryBG.height/2;

            objs["inventoryBG1"] = createStaticImage(pt(1,1), [WIDTH, HEIGHT], inventoryBG_texture);
            
            objs.inventoryBG1.x = WIDTH;
            objs.inventoryBG1.y = HEIGHT-(objs.inventoryBG1.height);

            objs["inventoryBG2"] = createStaticImage(pt(1,1), [WIDTH, HEIGHT], inventoryBG_texture);
            
            objs.inventoryBG2.x = WIDTH;
            objs.inventoryBG2.y = HEIGHT-(objs.inventoryBG2.height*2);

            objs["inventoryBG3"] = createStaticImage(pt(1,1), [WIDTH, HEIGHT], inventoryBG_texture);
            
            objs.inventoryBG3.x = WIDTH;
            objs.inventoryBG3.y = HEIGHT-(objs.inventoryBG3.height*3);

            objs["escapeButton"] = createButton(pt(1,0), [WIDTH, HEIGHT], escapeButton_texture, () => {animateSetState(STATES.TITLE_SCREEN)});
            
            objs.escapeButton.x = WIDTH;
            objs.escapeButton.y = 0;

            objs["timePackButton"] = createButton(pt(0.5,0.5), [WIDTH, HEIGHT], timePackTexture);

            objs.timePackButton.x = WIDTH-objs.timePackButton.width/2-8;
            objs.timePackButton.y = HEIGHT-objs.timePackButton.height/2-8;

            for(var key in objs) {
                this.stage.addChild(objs[key]);
            };
        }
    };
})();