/**
 * @ignore
 * menu item ,child component for menu
 * @author yiminghe@gmail.com
 */
KISSY.add("menu/menuitem", function (S, Controller, MenuItemRender) {

    var $ = S.all;

    /**
     * @class KISSY.Menu.Item
     * A menu item component which menu is consisted of.
     * xclass: 'menuitem'.
     * @extends KISSY.Component.Controller
     */
    var MenuItem = Controller.extend({

        isMenuItem: 1,

        // for ios, ios only has touchdown
        handleMouseDownInternal: function (e) {
            MenuItem.superclass.handleMouseDownInternal.call(this, e);
            this.set("highlighted", true);
        },

        /**
         * Perform default action when click on enter on this menuitem.
         * If selectable, then make it selected.
         * If checkable, then toggle it.
         * Finally fire click on its parent menu.
         * @protected
         */
        handleClickInternal: function () {
            var self = this;
            // 可选
            if (self.get("selectable")) {
                self.set("selected", true);
            }
            self.fire("click");
            return true;
        },

        // 只允许调用 menuItem 的 set('highlighted')
        // 不允许调用 menu 的 set('highlightedItem')
        _onSetHighlighted: function (v, e) {
            if (e && e.byPassSetHighlightedItem) {

            } else {
                if (this.get('rendered')) {
                    this.get('parent').set('highlightedItem', v ? this : null);
                } else {
                    if (v) {
                        // do not set null on initializer
                        this.get('parent').set('highlightedItem', this);
                    }
                }
            }
            // 是否要滚动到当前菜单项(横向，纵向)
            if (v) {
                var el = this.el,
                // 找到向上路径上第一个可以滚动的容器，直到父组件节点（包括）
                // 找不到就放弃，为效率考虑不考虑 parent 的嵌套可滚动 div
                    p = el.parent(function (e) {
                        return $(e).css("overflow") != "visible";
                    }, this.get('parent').el.parent());
                if (!p) {
                    return;
                }
                el.scrollIntoView(p, {
                    alignWithTop: true,
                    allowHorizontalScroll: true,
                    onlyScrollIfNeeded: true
                });
            }
        },

        /**
         * Check whether this menu item contains specified element.
         * @param {KISSY.NodeList} element Element to be tested.
         * @protected
         */
        containsElement: function (element) {
            return this.view.containsElement(element);
        }

    }, {
        ATTRS: {

            focusable: {
                value: false
            },

            handleMouseEvents: {
                value: false
            },

            /**
             * Whether the menu item is selectable or not.
             * Set to true for option.
             * @cfg {Boolean} selectable
             */
            /**
             * @ignore
             */
            selectable: {
                view: 1
            },

            /**
             * The value associated with the menu item.
             * @cfg {*} value
             */
            /**
             * The value associated with the menu item.
             * @property value
             * @type {*}
             */
            /**
             * @ignore
             */
            value: {},

            /**
             * Whether the menu item is checked.
             * @type {Boolean}
             * @property checked
             */


            /**
             * Whether the menu item is selected.
             * @type {Boolean}
             * @property selected
             */
            /**
             * Whether the menu item is selected.
             * @cfg {Boolean} selected
             */
            /**
             * @ignore
             */
            selected: {
                view: 1
            },

            xrender: {
                value: MenuItemRender
            }
        },
        xclass: "menuitem"
    });

    return MenuItem;
}, {
    requires: ['component/controller', './menuitem-render']
});