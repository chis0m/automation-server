module.exports = {
   timer : null,
   startTimer: function (callback) {
        this.timer = setTimeout(function() {
            callback()
        }, 1000);
    },
   clearTimer: function() {
        if (this.timer) clearTimeout(this.timer);
    }
}