(function (e) {
    e.widget("ui.mppCombo", {
        options: {
            dataSource: null,                       //数据源
            textKey: null,                          //显示字段，必须
            primaryKey: "",                         //主键，必须
            disable: false,                         //是否禁用
            filterKeys: null,                       //过滤Keys,英文逗号分隔
            selectedItems: null,                    //当前选中项
            showUnderLine: false,                   //下划线显示
            mutiSelect: false,                      //是否多选
            cols: [{ header: "", key: "" }],        //列定义
            showHeader: false,
            selectionChanged: null,
            width: null
        },
        css: {
            combo: "mpp-combo",
            text: "mpp-combo-text",
            btn: "mpp-combo-btn",
            selecting: "mpp-combo-selecting",
            item: "mpp-combo-item",
            clear: "mpp-combo-clear-select",
            list: "mpp-combo-list",
            header: "mpp-combo-header",
            col: "mpp-combo-item-col",
            cbxCol: "mpp-combo-select-col",
            cbxAll: "mpp-combo-select-all"
        },
        _create: function () {
            var a = this, $combo, $thisParent, o = this.options, comboHeight,
                $ul, $e = a.element, css = a.css, display = "table",
                $clear = $('<span class="{0}">×</span>'.format(css.clear));
            $thisParent = $e.parent();
            $combo = $('<div class="{0}"><div class="{1}"></div><div class="{2}"><input type="button" value="▼"/></div><div class="{3}"><ul></ul></div></div>'
                .format(css.combo, css.text, css.btn, css.list));
            $combo.find("." + css.text).append($e).append($clear);
            if (o.width) $combo.width(o.width);
            if (o.showUnderLine) $combo.css({ borderTop: "none", borderLeft: "none", borderRight: "none" });
            $thisParent.append($combo);
            comboHeight = $combo.height();
            $clear.css("top", ((comboHeight - 16) / 2)).click(function () {
                $(this).hide();
                $e.val("");
                o.selectedItems = null;
                $ul.hide().parent().hide();
                $combo.find(("." + css.selecting)).removeClass(css.selecting).find(":checked").removeAttr("checked");
                if (o.selectionChanged) o.selectionChanged(null);
            });
            $ul = $combo.find(".{0} > ul".format(css.list));
            $combo.find("." + css.list).css({ top: (comboHeight + 1), left: (!o.showUnderLine ? "-1px" : "0px"), width: ($combo.width() + (o.showUnderLine ? -2 : 0)) });
            a.mppCombo = $combo;
            $e.keyup(function (evt) {
                if ($ul.css("display") == "none")
                    $ul.css("display", display).parent().show();
                //keyCode === 38:up//40:down//13:enter
                var $selecting = $combo.find(("." + css.comboSselectingelecting)), $next;
                if (evt.keyCode == 40 || evt.keyCode == 38 || evt.keyCode == 13) {
                    if (evt.keyCode == 13) {
                        if ($selecting.length > 0) {
                            $ul.hide().parent().hide();
                            a.setSelectedItems(o.selectedItems = [{ id: $selecting[0].id.replace(($e[0].id + "_"), "") }]);
                        }
                    }
                    else {
                        if (evt.keyCode == 40) $next = $selecting.next(":visible");
                        else if (evt.keyCode == 38) $next = $selecting.prev(":visible");
                        if ($next.length === 0) $next = $combo.find(("." + css.comboItem + ":visible:" + (evt.keyCode == 40 ? "first" : "last")));
                        if ($next.length > 0 && ($selecting.length === 0 || $next[0].id != $selecting[0].id)) {
                            $next.addClass(css.selecting);
                            $selecting.removeClass(css.selecting);
                        }
                    }
                } else {
                    var val = this.value, filterKeys, hasItem = false, $item, eId = $e[0].id;
                    if (val) {
                        $clear.show();
                        o.selectedItems = null;
                        $selecting.removeClass(css.selecting);
                    }
                    else $clear.hide();
                    if (o.dataSource && Array.isArray(o.dataSource) && o.dataSource.length > 0) {
                        if (o.filterKeys) filterKeys = o.filterKeys.split(",");
                        else filterKeys = [o.textKey];
                        o.dataSource.forEach(function (item, index) {
                            hasItem = false;
                            for (var i = 0; i < filterKeys.length; i++) {
                                if (item[filterKeys[i]].toLowerCase().indexOf(val.toLowerCase()) >= 0) {
                                    hasItem = true;
                                    break;
                                }
                            }
                            $item = $(("#" + eId + "_" + item[o.primaryKey]));
                            if (hasItem) $item.show();
                            else $item.hide();
                        });
                    }
                }
            }).blur(function () { if (!o.selectedItems || o.selectedItems.length === 0) $e.val(""); });
            $combo.find(":button").click(function () {
                var isShow = $ul.css("display") == "none";
                $ul.css("display", (isShow ? display : "none"));
                if (isShow) $ul.parent().show();
                else $ul.parent().hide();
            });
            this.dataBind();
            $(document).mouseup(function (evt) {
                var $t = $(evt.target), hide = true, tc = $t.attr("class"),
                    eId = ("#" + a.element[0].id), $p = $t.closest(("." + css.combo));
                if ((tc && tc.indexOf(css.combo) >= 0) && $t.find(eId).length > 0 || ($p.length > 0 && $p.find(eId).length > 0)) {
                    hide = false;
                }
                if (hide) $ul.hide().parent().hide();
            });
            this.setDisabled(o.disable);
        },
        //数据绑定
        dataBind: function () {
            var e = this, o = e.options, css = e.css, itemsHtml, $combo = e.mppCombo, eId = e.element[0].id,
                $ul = $combo.find(".{0} > ul".format(css.list)), reg = /\{\{(\w+)\}\}/, match, colsHtml,
                headerTmpl = '<li class="{0}">{1}</li>';
            if (o.dataSource && Array.isArray(o.dataSource) && o.dataSource.length > 0) {
                itemsHtml = [];
                if (o.showHeader) {
                    itemsHtml.push((headerTmpl.format(css.header, (function () {
                        colsHtml = [];
                        if (o.mutiSelect)
                            colsHtml.push('<span class="{0} {1}"><input class="{2}" type="checkbox"/></span>'
                                .format(css.col, css.cbxCol, css.cbxAll));
                        o.cols.forEach(function (col) {
                            colsHtml.push('<span class="{0}">{1}</span>'
                                .format(css.col, col.header));
                        });
                        return colsHtml.join("");
                    })())));
                }
                o.dataSource.forEach(function (item, index) {
                    itemsHtml.push(('<li class="{0}" id="{1}_{2}">{3}</li>'
                        .format(css.item, eId, item[o.primaryKey], (function () {
                            colsHtml = [];
                            if (o.mutiSelect)
                                colsHtml.push(('<span class="{0} {1}"><input value="{2}" type="checkbox"/></span>'
                                    .format(css.col, css.cbxCol, item[o.primaryKey])));
                            o.cols.forEach(function (col) {
                                colsHtml.push(('<span class="{0}">{1}</span>'.format(css.col, (function (keyTmpl) {
                                    if (keyTmpl.match(reg)) {
                                        match = reg.exec(keyTmpl);
                                        keyTmpl = keyTmpl.replace(match[0], item[match[1]]);
                                    } else return item[keyTmpl];
                                    if (keyTmpl.match(reg)) return arguments.callee(keyTmpl);
                                    return keyTmpl;
                                })(col.key))));
                            });
                            return colsHtml.join("");
                        })())));
                });
                $ul.empty().append(itemsHtml.join(""));
                //全选
                $combo.find("." + css.cbxAll).click(function () {
                    if (this.checked) {
                        if (!o.selectedItems) o.selectedItems = [];
                        $combo.find(("." + css.comboItem))
                            .find(":checkbox:not(:checked)")
                            .each(function (index, item) {
                                o.selectedItems.push({ id: this.value });
                            });
                    }
                    else o.selectedItems = null;
                    e.setSelectedItems(o.selectedItems);
                });
                //单选
                $ul.find(".{0} :checkbox:not(.{1})".format(css.cbxCol, css.cbxAll))
                    .click(function (evt) {
                        var dataId = this.value,
                            itemIndex = o.selectedItems.getItemIndex(function (item) { return item == dataId; });
                        if (!o.selectedItems) o.selectedItems = [];
                        if (this.checked) {
                            if (itemIndex === -1) o.selectedItems.push({ id: dataId });
                        } else {
                            if (itemIndex >= 0) o.selectedItems.splice(itemIndex, 1)
                        }
                        $ul.hide().parent().hide();
                        e.setSelectedItems(o.selectedItems);
                    });
                $ul.find(".mpp-combo-item").click(function (evt) {
                    if (evt.target.localName != "input") {
                        e.setSelectedItems([{ id: this.id.replace((eId + "_"), "") }]);
                        $ul.hide().parent().hide();
                    }
                });
            }
            if (o.selectedItems && o.selectedItems.length > 0) this.setSelectedItems(o.selectedItems);
        },
        //重置数据源
        resetDataSource: function (dataSource) {
            if (this.mppCombo && this.mppCombo.length > 0) {
                var css = this.css;
                this.mppCombo.find(("." + css.selecting)).removeClass(css.selecting).find(":checked").removeAttr("checked");
                this.options.selectedItems = null;
                this.options.dataSource = dataSource;
                this.dataBind();
            }
        },
        //设置选中项
        setSelectedItems: function (items) {
            var $e = this.element, $combo = this.mppCombo, css = this.css,
                eId = $e[0].id, $item, itemData, o = this.options, ds = o.dataSource,
                comboText = "", $cbx;
            if (!o.selectedItems || (o.selectedItems && items && JSON.stringify(items.sort()) != JSON.stringify(o.selectedItems.sort()))) {
                $combo.find(("." + css.selecting)).removeClass(css.selecting).find(":checked").removeAttr("checked");
                o.selectedItems = [];
                if ($combo && $combo.length > 0 && ds.length > 0 && items && Array.isArray(items) && items.length > 0) {
                    items.forEach(function (item, index) {
                        $item = itemData = null;
                        if (item.id && item.id > 0) {
                            $item = $(("#" + eId + "_" + item.id));
                            itemData = ds.filter(function (d, i) { return d[o.primaryKey] == item.id; });
                            if (itemData && itemData.length > 0) itemData = itemData[0];
                            else itemData = null;
                        }
                        else if (item.index >= 0 && item.index < ds.length) {
                            $item = $combo.find(("." + css.comboItem)).eq(item.index);
                            itemData = ds[item.index];
                        }
                        if ($item && $item.length > 0 && itemData) {
                            if (o.mutiSelect) $cbx = $item.addClass(css.selecting).find(":checkbox")[0].checked = true;
                            comboText += itemData[o.textKey];
                            if (index < (items.length - 1)) comboText += ",";
                            o.selectedItems.push({ id: itemData[o.primaryKey] });
                        }
                    });
                    if (!o.disable) $combo.find("." + css.clear).show();
                    $e.val(comboText);
                }
                if (o.selectionChanged) o.selectionChanged(o.selectedItems);
            }
        },
        getSelectedItems: function () {
            var items = [], o = this.options, ds = o.dataSource, itemData;
            if (o.selectedItems && o.selectedItems.length > 0 && ds && ds.length > 0) {
                o.selectedItems.forEach(function (item) {
                    itemData = ds.filter(function (d, i) { return d[o.primaryKey] == item.id; });
                    if (itemData && itemData.length > 0) items.push(itemData[0]);
                });
            }
            return items;
        },
        removeSelectionChanged: function () { this.options.selectionChanged = null; },
        selectionChanged: function (changedHandler) { if (changedHandler) this.options.selectionChanged = changedHandler; },
        setDisabled: function (isDisable) {
            if (isDisable) {
                this.mppCombo.find(":button")[0].disabled = this.element[0].disabled = "disabled";
                this.mppCombo.find("." + this.css.clear).hide();
            } else {
                this.mppCombo.find("input").removeAttr("disabled");
                if ($.trim(this.mppCombo.find(":text").val())) this.mppCombo.find("." + this.css.clear).hide();
            }
            this.options.disable = isDisable;
        },
        destroy: function () {
            this.options.dataSource = null;
            this.options = null;
            this.mppCombo.remove();
            this.mppCombo = null;
        }
    });
    //e.extend(e.ui.combo, {
    //    escapeRegex: function (a) { return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") },
    //    filter: function (a, b) {
    //        var c = new RegExp(e.ui.combo.escapeRegex(b), "i"); return e.grep(a, function (d) {
    //            return c.test(d.label || d.value || d)
    //        })
    //    }
    //})
})(jQuery);