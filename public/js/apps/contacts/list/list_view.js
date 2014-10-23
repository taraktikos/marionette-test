ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

	List.Contact = Backbone.Marionette.ItemView.extend({
        tagName: "tr",
    	template: "#contact-list-item",

    	events: {
            "click": "highlightName",
            "click button.js-delete": "deleteClicked",
    		"click a.js-show": "showClicked"
    	},

    	highlightName: function() {
    		this.$el.toggleClass("warning");
    	},

        deleteClicked: function(e) {
            e.stopPropagation();
            this.trigger("contact:delete", this.model);
        },

        showClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("contact:show", this.model);
        },

        remove: function() {
            var self = this;
            this.$el.fadeOut(function() {
                Backbone.Marionette.ItemView.prototype.remove.call(self);
            });
        }
    });

    List.Contacts = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table",
        template: "#contact-list",
        childView: List.Contact,
        childViewContainer: "tbody",

        onChildviewContactDelete: function() {
            this.$el.fadeOut(1000, function() {
                $(this).fadeIn(1000);
            });
        }
    });

});
