(function (e) {
    e.widget("ui.autocomplete", {
        options: { appendTo: "body", delay: 300, minLength: 1, position: { my: "left top", at: "left bottom", collision: "none" }, source: null }, _create: function () {
            var a = this, b = this.element[0].ownerDocument; this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({ role: "textbox", "aria-autocomplete": "list", "aria-haspopup": "true" }).bind("keydown.autocomplete", function (c) {
                if (!a.options.disabled) {
                    var d = e.ui.keyCode; switch (c.keyCode) {
                        case d.PAGE_UP: a._move("previousPage",
                        c); break; case d.PAGE_DOWN: a._move("nextPage", c); break; case d.UP: a._move("previous", c); c.preventDefault(); break; case d.DOWN: a._move("next", c); c.preventDefault(); break; case d.ENTER: case d.NUMPAD_ENTER: a.menu.element.is(":visible") && c.preventDefault(); case d.TAB: if (!a.menu.active) return; a.menu.select(c); break; case d.ESCAPE: a.element.val(a.term); a.close(c); break; default: clearTimeout(a.searching); a.searching = setTimeout(function () { if (a.term != a.element.val()) { a.selectedItem = null; a.search(null, c) } }, a.options.delay);
                            break
                    }
                }
            }).bind("focus.autocomplete", function () { if (!a.options.disabled) { a.selectedItem = null; a.previous = a.element.val() } }).bind("blur.autocomplete", function (c) { if (!a.options.disabled) { clearTimeout(a.searching); a.closing = setTimeout(function () { a.close(c); a._change(c) }, 150) } }); this._initSource(); this.response = function () { return a._response.apply(a, arguments) }; this.menu = e("<ul></ul>").addClass("ui-autocomplete").appendTo(e(this.options.appendTo || "body", b)[0]).mousedown(function (c) {
                var d = a.menu.element[0];
                c.target === d && setTimeout(function () { e(document).one("mousedown", function (f) { f.target !== a.element[0] && f.target !== d && !e.ui.contains(d, f.target) && a.close() }) }, 1); setTimeout(function () { clearTimeout(a.closing) }, 13)
            }).menu({
                focus: function (c, d) { d = d.item.data("item.autocomplete"); false !== a._trigger("focus", null, { item: d }) && /^key/.test(c.originalEvent.type) && a.element.val(d.value) }, selected: function (c, d) {
                    d = d.item.data("item.autocomplete"); var f = a.previous; if (a.element[0] !== b.activeElement) {
                        a.element.focus();
                        a.previous = f
                    } false !== a._trigger("select", c, { item: d }) && a.element.val(d.value); a.close(c); a.selectedItem = d
                }, blur: function () { a.menu.element.is(":visible") && a.element.val() !== a.term && a.element.val(a.term) }
            }).zIndex(this.element.zIndex() + 1).css({ top: 0, left: 0 }).hide().data("menu"); e.fn.bgiframe && this.menu.element.bgiframe()
        }, destroy: function () {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"); this.menu.element.remove();
            e.Widget.prototype.destroy.call(this)
        }, _setOption: function (a, b) { e.Widget.prototype._setOption.apply(this, arguments); a === "source" && this._initSource(); if (a === "appendTo") this.menu.element.appendTo(e(b || "body", this.element[0].ownerDocument)[0]) }, _initSource: function () {
            var a, b; if (e.isArray(this.options.source)) { a = this.options.source; this.source = function (c, d) { d(e.ui.autocomplete.filter(a, c.term)) } } else if (typeof this.options.source === "string") {
                b = this.options.source; this.source = function (c, d) {
                    e.getJSON(b,
                    c, d)
                }
            } else this.source = this.options.source
        }, search: function (a, b) { a = a != null ? a : this.element.val(); if (a.length < this.options.minLength) return this.close(b); clearTimeout(this.closing); if (this._trigger("search") !== false) return this._search(a) }, _search: function (a) { this.term = this.element.addClass("ui-autocomplete-loading").val(); this.source({ term: a }, this.response) }, _response: function (a) { if (a.length) { a = this._normalize(a); this._suggest(a); this._trigger("open") } else this.close(); this.element.removeClass("ui-autocomplete-loading") },
        close: function (a) { clearTimeout(this.closing); if (this.menu.element.is(":visible")) { this._trigger("close", a); this.menu.element.hide(); this.menu.deactivate() } }, _change: function (a) { this.previous !== this.element.val() && this._trigger("change", a, { item: this.selectedItem }) }, _normalize: function (a) { if (a.length && a[0].label && a[0].value) return a; return e.map(a, function (b) { if (typeof b === "string") return { label: b, value: b }; return e.extend({ label: b.label || b.value, value: b.value || b.label }, b) }) }, _suggest: function (a) {
            var b =
            this.menu.element.empty().zIndex(this.element.zIndex() + 1), c; this._renderMenu(b, a); this.menu.deactivate(); this.menu.refresh(); this.menu.element.show().position(e.extend({ of: this.element }, this.options.position)); a = b.width("").outerWidth(); c = this.element.outerWidth(); b.outerWidth(Math.max(a, c))
        }, _renderMenu: function (a, b) { var c = this; e.each(b, function (d, f) { c._renderItem(a, f) }) }, _renderItem: function (a, b) { return e("<li></li>").data("item.autocomplete", b).append(e("<a></a>").text(b.label)).appendTo(a) }, _move: function (a,
        b) { if (this.menu.element.is(":visible")) if (this.menu.first() && /^previous/.test(a) || this.menu.last() && /^next/.test(a)) { this.element.val(this.term); this.menu.deactivate() } else this.menu[a](b); else this.search(null, b) }, widget: function () { return this.menu.element }
    }); e.extend(e.ui.autocomplete, {
        escapeRegex: function (a) { return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") }, filter: function (a, b) {
            var c = new RegExp(e.ui.autocomplete.escapeRegex(b), "i"); return e.grep(a, function (d) {
                return c.test(d.label || d.value ||
                d)
            })
        }
    })
})(jQuery);