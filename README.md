# fix-scroll
A Javascript utility library for working with native scrollbar. Also preventing scroll in iOS and another touch devices.

## Install
**Via npm** `npm instal fix-scroll --save`

``` js
import fixScroll from 'fix-scroll';
//OR
var fixScroll = require('fix-scroll');
```

**Via script tag**
``` html
<script src="/node_modules/fix-scroll/dist/fix-scroll.min.js"></script>
```
``` js
window.fixScroll;
```

## Preventing
When you do `fixScroll.hide()` you also preventing scroll for iOS ([issue](https://stackoverflow.com/questions/28790889/css-how-to-prevent-scrolling-on-ios-safari)).
<br>
If you want make scrollable element on touch devices when scroll is prevented, use `fs--scrollable` class (also element must have `overflow` property).
```html
<div class="modal-scroll fs--scrollable"></div>
```
```css
.modal-scroll {
	overflow: auto;
	-webkit-overflow-scrolling: touch; /* smooth scroll on iOS */
}
```
Live example: https://s.codepen.io/FL3NKEY/debug/YaQPrg/bYrdyGLGdoJA
<br>
Source code: https://codepen.io/FL3NKEY/pen/YaQPrg

## Methods
### hide()
Hide body scrollbar and prevent scroll.
``` js
fixScroll.hide();
```

### show()
Show body scrollbar.
``` js
fixScroll.show();
```

### toggle()
Toggle body scrollbar.
``` js
fixScroll.toggle();
```

### getState()
Get state of body scrollbar.
``` js
fixScroll.getState(); //true
fixScroll.hide();
fixScroll.getState(); //false
```

### getWidth()
Get width of body scrollbar.
``` js
fixScroll.getWidth();
```

### getCurrentWidth()
Get current width of body scrollbar.
``` js
fixScroll.getCurrentWidth();
```
