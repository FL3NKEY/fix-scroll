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
If you want make scrollable element when scroll is prevented, use `fs--scrollable` class.
```html
<div class="fs--scrollable"></div>
```
Live example: https://jsfiddle.net/FL3N/1gaxegxp/

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
