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
})();