// setInterval vs setTimeout: http://www.elated.com/articles/javascript-timers-with-settimeout-and-setinterval/

// http://www.dailycoding.com/posts/object_oriented_programming_with_javascript__timer_class.aspx
var Timer = new Class({
    initialize: function (options) {
        this.scope = this;
        this.timerId = undefined;
        this.enabled = false;
        this.interval = options.interval || 1000;
        this.onUpdate = options.onUpdate || undefined;
    },
    start: function () {
        var scope = this.scope;
        this.enabled = true;
        if (this.enabled) {
            if (scope.onUpdate) {
                this.timerId = setInterval(function () {
                    scope.onUpdate();
                }, this.interval);
            } else {
                this.stop();
            }
        }
    },
    stop: function () {
        this.enabled = false;
        clearInterval(this.timerId);
    },
    isEnabled: function () {
        return this.isEnabled;
    }
});

// http://blog.sebastian-martens.de/2010/02/javascript-timer-class/
var Timer2 = new Class({
    initialize: function (options, mixin) {
        if (mixin) {
            this.mixin(mixin, this);
        }
        options = options || {};
        this.isRunning = false;
        this.interval = options.interval || 1000;
        this.funcRef = null;
        this.scope = this;
        this._timerId = 0;
    },
    /**
     * mix a given object into this object
     * @param {Object} obj - given object with parameters
     */
    mixIn: function (obj, scope) {
        if (!scope) scope = this;
        var item = null;
        for (item in obj) {
            scope[item] = obj[item];
        }
    },
    /**
     * starts timer
     * @param {Int} interval - time in milliseconds for time interval
     * @param {Node} scope - the execution scope of the reference function
     * @param {Function} funcRef - function reference of function to be called on time event
     */
    start: function (funcRef, scope, interval) {
        if (interval) {
            this.interval = interval;
        }
        this.scope = scope;
        this.funcRef = funcRef;
        this.isRunning = true;
        this.startTimer();
    },
    /**
     * starts a new time event call with given time interval
     */
    startTimer: function () {
        if (!this.isRunning) return;
        window.setTimeout(this.timedHandler, this.interval);
    },
    /**
     * stops the timer
     */
    stop: function () {
        this.isRunning = false;
    },
    /**
     * timed event handler. will be called on each time event
     */
    timedHandler: function () {
        if (this.isRunning) {
            if (this.funcRef) {
                this.funcRef.apply(this.scope);
            } else this.stop();
            // do next timer call
            this.startTimer();
        }
    }
});

// https://gist.github.com/NV/363465
function Timer3(delay, callbacks) {
    if (Object.prototype.toString.call(callbacks) === "[object Function]") {
        callbacks = [callbacks];
    }
    this.callbacks = callbacks;
    var that = this;
    var id = setInterval(function tick() {
        if (!that.running) return;
        for (var i = 0; i < that.callbacks.length; i++) {
            that.callbacks[i].call(that);
        }
        that.count++;
    }, delay);
    this.__defineGetter__('id', function () {
        return id
    });
    this.__defineGetter__('delay', function () {
        return delay
    });
    Timer.all.push(this);
}
Timer3.prototype.running = true;
Timer3.prototype.count = 0;
Timer3.prototype.pause = function pause() {
    this.running = false;
    return this;
};
Timer3.prototype.run = function run() {
    this.running = true;
    return this;
};
Timer3.prototype.stop = function stop() {
    // Unlike pause, once you stop timer, you can't run it again
    clearInterval(this.id);
    this.stopped = true;
    return this;
};

Timer3.all = [];
Timer3.all.pause = function pause() {
    var all = Timer.all;
    for (var i = 0; i < all.length; i++) {
        all[i].pause();
    }
    return all;
};
Timer3.all.run = function run() {
    var all = Timer.all;
    for (var i = 0; i < all.length; i++) {
        all[i].run();
    }
    return all;
};
Timer3.all.stop = function stop() {
    var all = Timer.all;
    for (var i = 0; i < all.length; i++) {
        all[i].stop();
    }
    return all;
};

var i = 0;
var t1 = new Timer({
    onUpdate: function () {
        document.getElementById('timer1').innerHTML = parseInt(i++, 10);
    },
    interval: 500
});
//t1.start();

//var j = 0;
//var t2 = new Timer2();
//t2.start(function () {
//    document.getElementById('timer2').innerHTML = parseInt(j++, 10);
//    console.log(j);
//}, this, 500);