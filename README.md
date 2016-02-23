# meLockView #

meLockView is a small utility script to "lock" the main content of the page to prevent scrolling of the content in the background if you, for instance, open a dialog on top of the page.

## Usage ##

### 1. Include the JavaScript and CSS ###
#### Precompiled & minified versions ####
Include `me-lock-view.min.js` and `me-lock-view.min.css` included in the `dist` folder in your HTML page.

#### Source versions ####
You can find the original JavaScript file and SCSS/LESS files in the `src` folder of this package.

#### AMD ####
meLockView has AMD support. This allows it to be lazy-loaded with an AMD loader, such as RequireJS.

### 2. Define your view ###
Wrap your main page content in a container and set the attribute `data-me-view=""` on this element.

```html
<div data-me-view="">
  YOUR CONTENT GOES HERE
</div>
```

### 3. Use meLockView ###
To lock the view, call

```javascript
meLockView.lock();
```

To unlock the view, call

```javascript
meLockView.unlock();
```

To check if the view is locked, call (will return `true` or `false`)

```javascript
meLockView.isLocked();
```

**Note:** meLockView keeps track of the times, a lock-request was issued. So you have to call `meLockView.unlock()` the number of times you called `meLockView.lock()` to really unlock the view.

## Package managers ##
You can install meLockView using npm or Bower.

```
$ npm install me-lock-view
```

or

```
$ bower install me-lock-view
```

## License ##
meLockView is licenses under the [MIT licence](https://opensource.org/licenses/MIT).