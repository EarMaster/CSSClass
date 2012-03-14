var p = Element.prototype;
if(!p.hasClass)
	p.hasClass = function(c) {
		return new RegExp('\\b' + c + '\\b', 'g').test(this.className);
	};
if(!p.addClass)
	p.addClass = function(c) {
		if(!this.hasClass(c))
			this.className = (this.className + ' ' + c).trim();
		return this;
	};
if(!p.removeClass)
	p.removeClass = function(c) {
		c = c.split(' ');
		for(var i = 0; i < c.length; i++)
		this.className = this.className.replace(new RegExp('\\b' + c + '\\b', 'g'), '').trim();
		return this;
	};
if(!p.toggleClass)
	p.toggleClass = function(c) {
		return !this.hasClass(c) ? this.addClass(c) : this.removeClass(c);
	};
