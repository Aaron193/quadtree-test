export default function o(t, e, s, i) {
	(this.max_objects = e || 10), (this.max_levels = s || 4), (this.level = i || 0), (this.bounds = t), (this.objects = []), (this.nodes = []);
}
(o.prototype.split = function () {
	var t = this.level + 1,
		e = this.bounds.width / 2,
		s = this.bounds.height / 2,
		i = this.bounds.x,
		h = this.bounds.y;
	(this.nodes[0] = new o({ x: i + e, y: h, width: e, height: s }, this.max_objects, this.max_levels, t)), (this.nodes[1] = new o({ x: i, y: h, width: e, height: s }, this.max_objects, this.max_levels, t)), (this.nodes[2] = new o({ x: i, y: h + s, width: e, height: s }, this.max_objects, this.max_levels, t)), (this.nodes[3] = new o({ x: i + e, y: h + s, width: e, height: s }, this.max_objects, this.max_levels, t));
}),
	(o.prototype.getIndex = function (t) {
		var e = [],
			s = this.bounds.x + this.bounds.width / 2,
			i = this.bounds.y + this.bounds.height / 2,
			h = t.y < i,
			o = t.x < s,
			n = t.x + t.width > s,
			d = t.y + t.height > i;
		return h && n && e.push(0), o && h && e.push(1), o && d && e.push(2), n && d && e.push(3), e;
	}),
	(o.prototype.insert = function (t) {
		var e,
			s = 0;
		if (this.nodes.length) for (e = this.getIndex(t), s = 0; s < e.length; s++) this.nodes[e[s]].insert(t);
		else if ((this.objects.push(t), this.objects.length > this.max_objects && this.level < this.max_levels)) {
			for (this.nodes.length || this.split(), s = 0; s < this.objects.length; s++) {
				e = this.getIndex(this.objects[s]);
				for (var i = 0; i < e.length; i++) this.nodes[e[i]].insert(this.objects[s]);
			}
			this.objects = [];
		}
	}),
	(o.prototype.retrieve = function (t) {
		var e = this.getIndex(t),
			s = this.objects;
		if (this.nodes.length) for (var i = 0; i < e.length; i++) s = s.concat(this.nodes[e[i]].retrieve(t));
		return (s = s.filter(function (t, e) {
			return s.indexOf(t) >= e;
		}));
	}),
	(o.prototype.clear = function () {
		this.objects = [];
		for (var t = 0; t < this.nodes.length; t++) this.nodes.length && this.nodes[t].clear();
		this.nodes = [];
	});
