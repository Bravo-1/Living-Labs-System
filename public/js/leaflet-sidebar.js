L.Control.Sidebar = L.Control.extend({
    includes: L.Mixin.Events,

    options: {
        position: 'left'
    },

    initialize: function (id, options) {
        var i, child;

        L.setOptions(this, options);

        // Find sidebar HTMLElement and create sidebar
        this.sidebar = L.DomUtil.get(id);

        // Attach .sidebar-left/right class
        L.DomUtil.addClass(this.sidebar, 'sidebar-' + this.options.position);

        // Attach touch styling if necessary
        if (L.Browser.touch)
            L.DomUtil.addClass(this.sidebar, 'leaflet-touch');

        // Find sidebar > div.sidebar-content
        for (i = this.sidebar.children.length - 1; i >= 0; i--) {
            child = this.sidebar.children[i];
            if (child.tagName == 'DIV' &&
                    L.DomUtil.hasClass(child, 'sidebar-content'))
                this.container = child;
        }

        // Find sidebar ul.sidebar-tabs > li, sidebar .sidebar-tabs > ul > li
        this.tabitems = this.sidebar.querySelectorAll('ul.sidebar-tabs > li, .sidebar-tabs > ul > li');
        for (i = this.tabitems.length - 1; i >= 0; i--) {
            this.tabitems[i].sidebar = this;
        }

        // Find sidebar > div.sidebar-content > div.sidebar-pane
        this.panes = [];
        this.closeButtons = [];
        for (i = this.container.children.length - 1; i >= 0; i--) {
            child = this.container.children[i];
            if (child.tagName == 'DIV' &&
                L.DomUtil.hasClass(child, 'sidebar-pane')) {
                this.panes.push(child);

                var closeButtons = child.querySelectorAll('.sidebar-close');
                for (var j = 0, len = closeButtons.length; j < len; j++)
                    this.closeButtons.push(closeButtons[j]);
            }
        }
    },

    addTo: function (map) {
        var i, child;

        this.map = map;

        for (i = this.tabitems.length - 1; i >= 0; i--) {
            child = this.tabitems[i];
            L.DomEvent
                .on(child.querySelector('a'), 'click', L.DomEvent.preventDefault )
                .on(child.querySelector('a'), 'click', this._onClick, child);
        }

        for (i = this.closeButtons.length - 1; i >= 0; i--) {
            child = this.closeButtons[i];
            L.DomEvent.on(child, 'click', this._onCloseClick, this);
        }

        return this;
    },

    removeFrom: function (map) {
        var i, child;

        this.map = null;

        for (i = this.tabitems.length - 1; i >= 0; i--) {
            child = this.tabitems[i];
            L.DomEvent.off(child.querySelector('a'), 'click', this._onClick);
        }

        for (i = this.closeButtons.length - 1; i >= 0; i--) {
            child = this.closeButtons[i];
            L.DomEvent.off(child, 'click', this._onCloseClick, this);
        }

        return this;
    },

    open: function(id) {
        var i, child;

        // hide old active contents and show new content
        for (i = this.panes.length - 1; i >= 0; i--) {
            child = this.panes[i];
            if (child.id == id)
                L.DomUtil.addClass(child, 'active');
            else if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        // remove old active highlights and set new highlight
        for (i = this.tabitems.length - 1; i >= 0; i--) {
            child = this.tabitems[i];
            if (child.querySelector('a').hash == '#' + id)
                L.DomUtil.addClass(child, 'active');
            else if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        this.fire('content', { id: id });

        // open sidebar (if necessary)
        if (L.DomUtil.hasClass(this.sidebar, 'collapsed')) {
            this.fire('opening');
            L.DomUtil.removeClass(this.sidebar, 'collapsed');
        }

        return this;
    },

    close: function() {
        // remove old active highlights
        for (var i = this.tabitems.length - 1; i >= 0; i--) {
            var child = this.tabitems[i];
            if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        // close sidebar
        if (!L.DomUtil.hasClass(this.sidebar, 'collapsed')) {
            this.fire('closing');
            L.DomUtil.addClass(this.sidebar, 'collapsed');
        }

        return this;
    },

    _onClick: function(e) {
        if (L.DomUtil.hasClass(this, 'active'))
            this.sidebar.close();
        else if (!L.DomUtil.hasClass(this, 'disabled'))
            this.sidebar.open(this.querySelector('a').hash.slice(1));
    },

    _onCloseClick: function () {
        this.close();
    }
});

L.control.sidebar = function (sidebar, options) {
    return new L.Control.Sidebar(sidebar, options);
};
