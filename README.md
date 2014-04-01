# CSSClass
CSSClass is a JavaScript microframework which adds the functions .hasClass, .addClass, .removeClass and .toggleClass to the Element prototype.

The usage is easy. Include the script file and just use the functions (they can be chained). You can also add, remove, toggle or check for multiple classes by just adding a space between them.

```javascript
var test = document.getElementById('test');
if (test.hasClass('active'))
	test.addClass('glow');
test.removeClass('active glow').toggleClass('golden');
```

document.querySelector and document.querySelectorAll are supported. If you use querySelectorAll and .hasClass you can state in the second argument if you want all elements to pass the test (defaults to true).
CSSClass also uses the classList interface if available.

If you encounter an error or have a feature suggestion please open a new issue on GitHub (https://github.com/EarMaster/CSSClass/).

<a href="http://flattr.com/thing/1097666/CSSClass">
<img src="http://api.flattr.com/button/flattr-badge-large.png" alt="Flattr this" title="Flattr this" border="0" /></a>

As IE7 and below don't allow access to the Element prototype it will not work on these browsers.