;(function($, undefined) {
  var incrementalElementId = 0;
  var mutex = 0;
  $.fn.tap = function(threshold, callback, touchOnly) {
    if (typeof threshold === 'function') {
      touchOnly = callback;
      callback = threshold;
      threshold = 15;
    }
    if ('ontouchstart' in window) {
      this.each(function() {
        var moveDistance = 0;
        var touch = null;
        var elementId = ++incrementalElementId;
        var startPoint = null
        var touching = false;
        var self = this;
        var $self = $(this);

        $self.bind('touchstart', function(e) {
          if (mutex != 0) return;
          else mutex = elementId;

          touching = true;
          moveDistance = 0;

          if (e.originalEvent.touches && e.originalEvent.touches[0]) {
            touch = e.originalEvent.touches[0];
            startPoint = { x: touch.screenX, y: touch.screenY }
          }
        });

        $self.bind('touchend', function(e) {
          if (mutex == elementId) mutex = 0;
          if (!touching) return;
          touching = false;
          if (moveDistance < threshold) {
            callback.apply(self, [].slice.call(arguments));
          } else {
            $self.trigger('tap-failed');
          }
        });

        $self.bind('touchmove', function(e) {
          if (!touching) return;
          if (e.originalEvent.touches.length == 0 || startPoint === null) {
            return touching = false;
          }

          touch = e.originalEvent.touches[0];
          
          moveDistance = Math.sqrt(Math.pow(touch.screenX - startPoint.x, 2) +
                                   Math.pow(touch.screenY - startPoint.y, 2));

          if (moveDistance > threshold) {
            $self.trigger('exceed-tap-threshold');
            touching = false;
          }
        });

        $self.bind('touchcancel', function() {
          if (mutex == elementId) mutex = 0;
          touching = false;
          $self.trigger('tap-failed');
        })
      })
    } else if (!touchOnly) {
      this.click(callback);
    }
    return this;
  }
})(window.jQuery || window.$);
