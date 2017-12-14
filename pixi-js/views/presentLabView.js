var presentLabView = (function() {

    var stage = new PIXI.Container();
    stage.visible = false;

    stage.scale = pt(1,1);

    var blockSideLength = 96;

    var x_offset = blockSideLength*3;
    var y_offset = blockSideLength*2;

    var textureMap;
    var spriteMap;

    function buildingTexture(x,y) {
        return {
            texture: new PIXI.Texture(PIXI.utils.TextureCache[RESOURCES.lab_building_internal_sheet], new PIXI.Rectangle(x*blockSideLength,y*blockSideLength,blockSideLength,blockSideLength)),
            hitboxes: [],
            eventboxes: []
        }
    }

    function globalizeSpriteMapLocalRectangle(rectangle, sprite) {
        return new PIXI.Rectangle(
            rectangle.x + sprite.x, 
            rectangle.y + sprite.y,
            rectangle.width, 
            rectangle.height
        );
    }

    return {
        stage: stage,

        shown: function() {
            character.x = 416;
            character.y = 300;
        },

        isLocationValid: function(circle) {
            for(var x = 0; x < spriteMap.length; x++) {
                for(var y = 0; y < spriteMap[x].length; y++) {
                    if (CircleRectColliding(circle, spriteMap[x][y].sprite)) {
                        for(var i in spriteMap[x][y].hitboxes) {
                            var globalHitbox = globalizeSpriteMapLocalRectangle(spriteMap[x][y].hitboxes[i], spriteMap[x][y].sprite);

                            var colliding = CircleRectColliding(circle, globalHitbox);
                            if (colliding)
                                return false;
                        }

                        for(var i in spriteMap[x][y].eventboxes) {
                            var globalEventbox = globalizeSpriteMapLocalRectangle(spriteMap[x][y].eventboxes[i].rect, spriteMap[x][y].sprite);

                            var triggering = CircleRectColliding(circle, globalEventbox);

                            if (triggering)
                                spriteMap[x][y].eventboxes[i].trigger();
                        }
                    }
                }
            }
            
            return true;
        },

        initialize: function() {
            
            var background_sprite = new PIXI.extras.TilingSprite(buildingTexture(1,0).texture, renderer.width, renderer.height);
            stage.addChild(background_sprite);

            var top_left_corner = buildingTexture(2,6);
            top_left_corner.hitboxes = [
                rect(0, 0, 18, 96),   //(x, y, width, height)
                rect(18, 0, 78, 18)
            ];

            var left_wall =  buildingTexture(0,4);
            left_wall.hitboxes = [
                rect(0, 0, 18, 96)
            ];

            var bottom_left_corner =  buildingTexture(0,7);
            bottom_left_corner.hitboxes = [
                rect(0, 0, 18, 96),
                rect(0, 75, 96, 21)
            ];

            var top_wall =  buildingTexture(4,4);
            top_wall.hitboxes = [
                rect(0, 0, 96, 18)
            ];

            var interior_tile =  buildingTexture(0,2);
            interior_tile.hitboxes = [];

            var bottom_door =  buildingTexture(4,3);
            bottom_door.hitboxes = [
                rect(0, 75, 18, 21),
                rect(78, 75, 18, 21)
            ];

            bottom_door.eventboxes = [
                {
                    rect: rect(18, 95, 60, 1),
                    trigger: () => { 
                        animateSetState(STATES.CREDITS_SCREEN);
                    }
                }
            ]

            var bottom_wall =  buildingTexture(4,5);
            bottom_wall.hitboxes = [
                rect(0, 75, 96, 21)
            ];

            var top_right_corner = buildingTexture(4,6);
            top_right_corner.hitboxes = [
                rect(0, 0, 96, 18),
                rect(78, 18, 18, 78)
            ];

            var right_wall = buildingTexture(0,5);
            right_wall.hitboxes = [
                rect(78, 0, 18, 96)
            ];

            var bottom_right_corner = buildingTexture(6,6);
            bottom_right_corner.hitboxes = [
                rect(78, 0, 18, 96),
                rect(0, 75, 78, 21)
            ];

            var bottom_right_inside_corner = buildingTexture(4,2);
            bottom_right_inside_corner.hitboxes = [
                rect(78, 75, 18, 21)
            ];

            var bottom_left_inside_corner = buildingTexture(0,3);
            bottom_left_inside_corner.hitboxes = [
                rect(0, 75, 18, 21)
            ];

            var textured_interior_tile = buildingTexture(1,1);
            textured_interior_tile.hitboxes = [];
            
            var top_wall_danger = buildingTexture(12,4);
            top_wall_danger.hitboxes = [
                rect(0, 0, 96, 18)
            ];

            var top_right_corner_danger = buildingTexture(12,6);
            top_right_corner_danger.hitboxes = [
                rect(0, 0, 96, 18),
                rect(78, 18, 18, 78)
            ];

            var right_wall_danger = buildingTexture(8,5);
            right_wall_danger.hitboxes = [
                rect(78, 0, 18, 96)
            ];

            var bottom_right_corner_danger = buildingTexture(14,6);
            bottom_right_corner_danger.hitboxes = [
                rect(78, 0, 18, 96),
                rect(0, 75, 78, 21)
            ];

            var bottom_wall_danger = buildingTexture(12,5);
            bottom_wall_danger.hitboxes = [
                rect(0, 75, 96, 21)
            ];
        
            // textureMap[x][y]
            textureMap = [
                // left wall
                [
                    top_left_corner,
                    left_wall,
                    left_wall,
                    bottom_left_corner
                ],
                [
                    top_wall,
                    textured_interior_tile,
                    textured_interior_tile,
                    bottom_door,
                ],
                [
                    top_wall,
                    textured_interior_tile,
                    textured_interior_tile,
                    bottom_wall
                ],
                [
                    top_wall,
                    textured_interior_tile,
                    textured_interior_tile,
                    bottom_wall
                ],
                [
                    top_wall,
                    textured_interior_tile,
                    bottom_right_inside_corner,
                    bottom_right_corner
                ],
                [
                    top_wall_danger,
                    textured_interior_tile,
                    bottom_wall_danger,
                ],
                [
                    top_wall_danger,
                    textured_interior_tile,
                    bottom_wall_danger
                ],
                [
                    top_right_corner_danger,
                    right_wall_danger,
                    bottom_right_corner_danger
                ]
            ];

            spriteMap = [];

            for(var x = 0; x < textureMap.length; x++) {
                spriteMap[x] = [];

                for(var y = 0; y < textureMap[x].length; y++) {
                    var sprite = createStaticImage(pt(0,0), [(x*blockSideLength)+x_offset, (y*blockSideLength)+y_offset], textureMap[x][y].texture);

                    stage.addChild(sprite);

                    spriteMap[x][y] = {sprite: sprite, hitboxes: textureMap[x][y].hitboxes, eventboxes: textureMap[x][y].eventboxes};
                }
            }

            var top_left_corner_shelf = buildingTexture(0,8);
            top_left_corner_shelf.hitboxes = [
                rect(18,18,78,60)
            ];

            var top_middle_shelf = buildingTexture(1,8);
            top_middle_shelf.hitboxes = [
                rect(0,18,96,60)
            ];

            var top_rightmost_shelf = buildingTexture(2,8);
            top_rightmost_shelf.hitboxes = [
                rect(0,18,96,60)
            ];

            var top_leftmost_worktable = buildingTexture(3,8);
            top_leftmost_worktable.hitboxes = [
                rect(15,18,81,60)
            ];

            var top_rightmost_worktable = buildingTexture(4,8);
            top_rightmost_worktable.hitboxes = [
                rect(0,18,96,60)
            ];

            var top_leftmost_timecenter = buildingTexture(5,8);
            top_leftmost_timecenter.hitboxes = [
                rect(9,13,68,80),
                rect(77,29,19,44)
            ];

            var top_right_corner_timecenter = buildingTexture(6,8);
            top_right_corner_timecenter.hitboxes = [
                rect(0,29,4,44),
                rect(4,13,68,80)
            ];

            var entityTextureMap = [
                [
                    top_left_corner_shelf
                ],
                [
                    top_middle_shelf
                ],
                [
                    top_rightmost_shelf
                ],
                [
                    top_leftmost_worktable
                ],
                [
                    top_rightmost_worktable
                ],
                [

                ],
                [
                    top_leftmost_timecenter
                ],
                [
                    top_right_corner_timecenter
                ]
            ];

            for(var x = 0; x < entityTextureMap.length; x++) {
                spriteMap.push([]);

                for(var y = 0; y < entityTextureMap[x].length; y++) {
                    var sprite = createStaticImage(pt(0,0), [(x*blockSideLength)+x_offset, (y*blockSideLength)+y_offset], entityTextureMap[x][y].texture);

                    stage.addChild(sprite);

                    spriteMap[spriteMap.length-1][y] = {sprite: sprite, hitboxes: entityTextureMap[x][y].hitboxes};
                }
            }
        }
    };
})();
