(function () {
	// add indexOf to Array prototype for IE<8
	// this isn't failsafe, but it works on our behalf
	Array.prototype.CSSClassIndexOf = Array.prototype.indexOf || function (item) {
		var length = this.length;
		for (var i = 0; i<length; i++)
			if (this[i]===item) return i;
		return -1;
	};
	// check if classList interface is available (@see https://developer.mozilla.org/en-US/docs/Web/API/element.classList)
	var cl = ("classList" in document.createElement("a"));
	// actual Element prototype manipulation
	var p = Element.prototype;
	if(!p.hasClass)
		p.hasClass = function(c) {
			var r = true, e = cl?Array.prototype.slice.call(this.classList):this.className.split(' ');
			c = c.split(' ');
			for(var i=0; i<c.length; i++) {
				if(cl) {
					if(!this.classList.contains(c[i]))
						r = false;
				} else if(e.CSSClassIndexOf(c[i])===-1)
					r = false;
			}
			return r;
		};
	if(!p.addClass)
		p.addClass = function(c) {
			c = c.split(' ');
			for(var i=0; i<c.length; i++)
				if(!this.hasClass(c[i])) {
					if(cl)
						this.classList.add(c[i]);
					else
						this.className = this.className!==''?(this.className+' '+c[i]):c[i];
				}
			return this;
		};
	if(!p.removeClass)
		p.removeClass = function(c) {
			var e = this.className.split(' ');
			c = c.split(' ');
			for(var i=0; i<c.length; i++)
				if(this.hasClass(c[i])) {
					if (cl)
						this.classList.remove(c[i]);
					else
						e.splice(e.CSSClassIndexOf(c[i]), 1);
				}
			if (!cl)
				this.className = e.join(' ');
			return this;
		};
	if(!p.toggleClass)
		p.toggleClass = function(c) {
			c = c.split(' ');
			for(var i=0; i<c.length; i++)
				if (cl)
					this.classList.toggle(c[i]);
				else if (this.hasClass(c[i]))
					this.removeClass(c[i]);
				else
					this.addClass(c[i]);
			return this;
		};
	var pl = NodeList.prototype;
	if (!pl.hasClass)
		pl.hasClass = function (c, all) {
			if (all===undefined) all = true;
			for (var i=0, r=all?true:false; ((all && r===true) || (!all && r===false)) && i<this.length; ++i)
				r = this[i].hasClass(c);
			return r;
		};
	if (!pl.addClass)
		pl.addClass = function (c) {
			for (var i=0; i<this.length; ++i)
				this[i].addClass(c);
		};
	if (!pl.removeClass)
		pl.removeClass = function (c) {
			for (var i=0; i<this.length; ++i)
				this[i].removeClass(c);
		};
	if (!pl.toggleClass)
		pl.toggleClass = function (c) {
			for (var i=0; i<this.length; ++i)
				this[i].toggleClass(c);
		};
})();