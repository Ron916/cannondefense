var CannonDefenseGame = {
    // active entities in the game to be rendered/manipulated
    _entities: {},
    _entities_unique_key: 1,

    processInputs: function(){
        var state = EventManager.getState();
        if(state.clicks[ EventManager.MOUSE_LEFT ]){
            CannonDefenseGame.getEntities('cannon1').fire(state.clicks[ EventManager.MOUSE_LEFT ])
        }
    },
    addEntity: function(entity, optionalKey) {
        var key = optionalKey || CannonDefenseGame._entities_unique_key++;
        CannonDefenseGame._entities[ key ] = (entity);
    },
    getEntities: function(optionalKey){
        if(optionalKey) {
            return CannonDefenseGame._entities[ optionalKey ];
        }
        return CannonDefenseGame._entities;
    },
    removeEntity: function(key){
        delete CannonDefenseGame._entities[ key ];
    },
    createCannonBall: function(CannonEntity, vector){
        var newCannonBall = new CannonBall(CannonEntity, vector);
        newCannonBall.set_sprite(
            new PIXI.Sprite.fromImage(
                newCannonBall.get_image_path()
            )
        );
        CannonDefenseGame.addEntity(newCannonBall);
    }
};

var CannonDefense = function(targetHtmlId, settings) {
    var that = this;
    var defaultSettings = {
        resolution: [640, 480]
    };

    settings = $.extend(defaultSettings, settings);

    // Create the renderer
    var renderer = PIXI.autoDetectRenderer(settings.resolution[0], settings.resolution[1],
        {
            "antialias": true,
            "autoResize": true,
            "transparent": true,
            "resolution": 2
        }
    );

    document.body.appendChild(renderer.view);

    var stage = new PIXI.Container();

    // Initialize Entities/Sprites
    var cannon = new Cannon(
        // cannon should be placed near left side of screen, lower middle-ish
        // will move eventuallyyyy
        Math.floor(settings.resolution[0] / 7),
        Math.floor(settings.resolution[1] / 2)
    );
    cannon.set_sprite(
        new PIXI.Sprite.fromImage(
            cannon.get_image_path()
        )
    );

    // Add all active Entities to this array
    CannonDefenseGame.addEntity(cannon, 'cannon1');

    var last_time = Date.now();
    var delta_time = 0;
    var now = Date.now();

    var game_loop = function(){

        // milliseconds since last frame, for speed calculations
        now = Date.now();
        delta_time = now - last_time;
        last_time = now;

        requestAnimationFrame(game_loop);

        CannonDefenseGame.processInputs();

        // blit background before anything else

        // iterate each entity and update for this frame
        $.each(CannonDefenseGame.getEntities(), function(key, entity){
            entity.update(delta_time);
            stage.addChild(
                entity.get_sprite()
            );
        });

        renderer.render(stage);
    };

    game_loop();


    return that;
};
