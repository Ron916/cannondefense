
var EntityPrototype = {
    _sprite: null,
    _image_path: null,
    update: function(delta_time){},
    get_sprite: function(){ return this._sprite; },
    set_sprite: function(sprite){ this._sprite = sprite; },
    get_image_path: function(){ return this._image_path; }
};

var Cannon = function(x, y){
    var that = this;
    that._sprite = null;
    that._delta_time = 0;
    that._firing = false;
    that._firing_rate_per_second = 1;
    that._last_firing_time = Date.now();
    that.x = x;
    that.y = y;
    that._target = {
        x: 0,
        y: 0
    };

    that._image_path = 'assets/turret1-big.png';

    // we can only fire a certain amount of times per second
    that.canFire = function(){
        var currentTime = Date.now();
        var msSinceLastFire = currentTime - that._last_firing_time;
        return (msSinceLastFire > Math.floor(1000 / that._firing_rate_per_second)) && that._firing;
    };

    that.update = function(delta_time){
        that._sprite.x = that.x;
        that._sprite.y = that.y;
        that._delta_time = delta_time;
        if(that.canFire()){
            CannonDefenseGame.createCannonBall(that, that._target);
            that._firing = false;
            that._last_firing_time = Date.now();
        }
    };

    that.fire = function(vector){
        if(that._firing === false) {
            that._firing = true;
            that._target = vector;
        }
    };

    return that;
};
Cannon.prototype = EntityPrototype;

var CannonBall = function(CannonEntity, vector){
    var that = this;
    that._image_path = 'assets/cannonball.png';
    that.x = CannonEntity.x;
    that.y = CannonEntity.y;
    that._vector = [0, 0];

    that.update = function(delta_time){
        that._delta_time = delta_time;
    };

    return that;
};
CannonBall.prototype = EntityPrototype;