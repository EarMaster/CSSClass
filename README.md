CSSClass is a JavaScript microframework which adds the functions .hasClass, .addClass, .removeClass and .toggleClass to the Element prototype.

The usage is easy. Include the script file and just use the functions (they can be chained).

```javascript
var test = document.getElementById('test');
if (test.hasClass('active'))
	test.addClass('glow');
test.removeClass('active glow').toggleClass('golden');
```

If you encounter an error or have a feature suggestion please open a new issue on GitHub (https://github.com/EarMaster/CSSClass/).