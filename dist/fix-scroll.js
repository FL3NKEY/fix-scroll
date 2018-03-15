
/*!
 * fix-scroll
 * (c) FL3N
 */

(function () {
  var FixScroll;

  FixScroll = function () {
    var _bindFixScrollEvents, _scrollableClassName, _scrollableDataset, _state;

    _state = true;

    _scrollableClassName = 'fs--scrollable';

    _scrollableDataset = 'fsScrollable';

    _bindFixScrollEvents = function () {
      var _findTarget;
      _findTarget = function (e) {
        var target;
        target = e.target;
        while (target !== null) {
          if (target.classList && target.classList.contains(_scrollableClassName)) {
            break;
          }
          target = target.parentNode;
        }
        return target;
      };
      document.addEventListener('touchstart', function (_this) {
        return function (e) {
          var height, scrollTop, target, totalScroll;
          target = _findTarget(e);
          if (target) {
            scrollTop = target.scrollTop;
            totalScroll = target.scrollHeight;
            height = target.clientHeight;
            target.dataset._deltaDataset = e.touches[0].clientY;
            if (height === totalScroll) {
              return target.dataset._preventScrollableDataset = 'true';
            }
          }
        };
      }(this));
      document.addEventListener('touchmove', function (_this) {
        return function (e) {
          var currentDelta, currentScroll, delta, scrollTop, target, totalScroll;
          if (!_this.getState()) {
            target = _findTarget(e);
            if (target) {
              if (target.dataset._preventScrollableDataset === 'true') {
                return e.preventDefault();
              } else {
                scrollTop = target.scrollTop;
                totalScroll = target.scrollHeight;
                currentScroll = scrollTop + target.offsetHeight;
                delta = parseFloat(target.dataset._deltaDataset);
                currentDelta = e.touches[0].clientY;
                if (scrollTop <= 0) {
                  if (delta < currentDelta) {
                    return e.preventDefault();
                  }
                } else if (currentScroll >= totalScroll) {
                  if (delta > currentDelta) {
                    return e.preventDefault();
                  }
                }
              }
            }
          }
        };
      }(this));
      return document.addEventListener('touchend', function (_this) {
        return function (e) {
          var target;
          target = _findTarget(e);
          if (target) {
            return target.dataset._preventScrollableDataset = 'false';
          }
        };
      }(this));
    };

    function FixScroll() {
      _bindFixScrollEvents.call(this);
    }

    FixScroll.prototype.getWidth = function () {
      var width;
      document.body.style.overflow = 'scroll';
      width = this.getCurrentWidth();
      document.body.style.overflow = '';
      return width;
    };

    FixScroll.prototype.getCurrentWidth = function () {
      var currentWidth, documentWidth, windowWidth;
      documentWidth = document.documentElement.clientWidth;
      windowWidth = window.innerWidth;
      currentWidth = windowWidth - documentWidth;
      return currentWidth;
    };

    FixScroll.prototype.getState = function () {
      return _state;
    };

    FixScroll.prototype.hide = function () {
      var currentWidth;
      currentWidth = this.getCurrentWidth();
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = currentWidth + 'px';
      return _state = false;
    };

    FixScroll.prototype.show = function () {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      return _state = true;
    };

    FixScroll.prototype.toggle = function () {
      if (this.getState()) {
        return this.hide();
      } else {
        return this.show();
      }
    };

    return FixScroll;
  }();

  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return new FixScroll();
    });
  } else if (typeof exports === 'object') {
    module.exports = new FixScroll();
  } else {
    window.fixScroll = new FixScroll();
  }
}).call(this);