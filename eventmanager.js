
var EventManager = {
    // javascript codes
    MOUSE_LEFT: 1,
    MOUSE_MIDDLE: 2,
    MOUSE_RIGHT: 3,
    KEY_X: 88,
    KEY_W: 87,
    KEY_A: 65,
    KEY_S: 83,
    KEY_D: 68,

    _defaultState:  {
        keys: [],
        clicks: {},
        mouse: {}
    },
    _state: {
        keys: [],
        clicks: {},
        mouse: {}
    },

    getState: function(){
        // clear state on each
        var state = EventManager._state;
        EventManager._state = EventManager._defaultState;
        return state;
    },
    setEventListeners: function(){
        window.addEventListener('keydown', function(event) {
            EventManager._state.keys[event.which] = true;
        });

        window.addEventListener('keyup', function(event) {
            EventManager._state.keys[event.which] = false;
        });

        window.addEventListener('mousedown', function(event) {
            EventManager._state.clicks[event.which] = {
                'clientX': event.clientX,
                'clientY': event.clientY
            };
        });

        window.addEventListener('mouseup', function(event) {
            EventManager._state.clicks[event.which] = false;
        });

        window.addEventListener('mousemove', function(event) {
            EventManager._state.mouse.clientX = event.clientX;
            EventManager._state.mouse.clientY = event.clientY;
        });
    }
};
EventManager.setEventListeners();