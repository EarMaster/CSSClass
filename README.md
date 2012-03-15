CSSClass is a JavaScript microframework which adds the functions .hasClass, .addClass, .removeClass and .toggleClass to the Element prototype.

The usage is easy. Include the script file and just use the functions (they can be chained).

```javascript
var test = document.getElementById('test');
if (test.hasClass('active'))
	test.addClass('glow');
test.removeClass('active glow').toggleClass('golden');
```

To keep the className-attribute easily readable (no additional spaces between and around the classes) I use .trim() which is not supported by some older browser (IE8, Safari 4, see http://kangax.github.com/es5-compat-table/). If you target one of these browsers you can use the notrim versions of CSSClass.