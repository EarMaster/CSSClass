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
	if(cl) {
		if(!p.hasClass)
			p.hasClass = function(c) {
				var e = Array.prototype.slice.call(this.classList);
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if(!this.classList.contains(c[i]))
						return false;
				return true;
			};
		if(!p.addClass)
			p.addClass = function(c) {
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if(!this.hasClass(c[i]))
						this.classList.add(c[i]);
				return this;
			};
		if(!p.removeClass)
			p.removeClass = function(c) {
				var e = this.className.split(' ');
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if(this.hasClass(c[i]))
						this.classList.remove(c[i]);
				return this;
			};
		if(!p.toggleClass)
			p.toggleClass = function(c) {
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					this.classList.toggle(c[i]);
				return this;
			};
	} else {
		if(!p.hasClass)
			p.hasClass = function(c) {
				var e = this.className.split(' ');
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if(e.CSSClassIndexOf(c[i])===-1)
						return false;
				return true;
			};
		if(!p.addClass)
			p.addClass = function(c) {
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if(!this.hasClass(c[i]))
						this.className = this.className!==''?(this.className+' '+c[i]):c[i];
				return this;
			};
		if(!p.removeClass)
			p.removeClass = function(c) {
				var e = this.className.split(' ');
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if(this.hasClass(c[i]))
						e.splice(e.CSSClassIndexOf(c[i]), 1);
				this.className = e.join(' ');
				return this;
			};
		if(!p.toggleClass)
			p.toggleClass = function(c) {
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if (this.hasClass(c[i]))
						this.removeClass(c[i]);
					else
						this.addClass(c[i]);
				return this;
			};
	}
	var pl = NodeList.prototype;
	if (!pl.hasClass)
		pl.hasClass = function (c, all) {
			if (all===undefined) all = true;
			for (var i=this.length-1; i>=0; --i) {
				var hc = this[i].hasClass(c);
				if (all && !hc) return false;
				if (!all && hc) return true;
			}
			return true;
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
