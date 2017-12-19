
/*!
 * fix-scroll
 * (c) FL3N
 */

(function () {
  var FixScroll,
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  FixScroll = function () {
    var _bindFixScrollEvents, _fixScrollClassName, _fixScrollDataset, _state;

    _state = true;

    _fixScrollClassName = 'fix-scroll';

    _fixScrollDataset = 'fixScroll';

    _bindFixScrollEvents = function () {
      var _findTarget;
      _findTarget = function (e) {
        var target;
        target = e.target;
        while (target !== null) {
          if (target.classList && target.classList.contains(_fixScrollClassName)) {
            break;
          }
          target = target.parentNode;
        }
        return target;
      };
      document.addEventListener('touchstart', function (_this) {
        return function (e) {
          var currentScroll, height, scrollTop, target, totalScroll;
          target = _findTarget(e);
          if (target) {
            console.log('touchstart');
            scrollTop = target.scrollTop;
            totalScroll = target.scrollHeight;
            currentScroll = scrollTop + target.offsetHeight;
            height = target.clientHeight;
            if (height === totalScroll) {
              target.dataset[_fixScrollDataset] = true;
            }
            if (scrollTop <= 0) {
              return target.scrollTop = 1;
            } else if (currentScroll >= totalScroll) {
              return target.scrollTop = scrollTop - 1;
            }
          }
        };
      }(this));
      document.addEventListener('touchmove', function (_this) {
        return function (e) {
          var target;
          if (!_this.getState()) {
            target = _findTarget(e);
            if (target && indexOf.call(target.dataset, _fixScrollDataset) >= 0) {
              return e.preventDefault();
            }
          }
        };
      }(this));
      return document.addEventListener('touchend', function (_this) {
        return function (e) {
          var target;
          target = _findTarget(e);
          if (target) {
            console.log('touchend');
            return target.dataset[_fixScrollDataset] = false;
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