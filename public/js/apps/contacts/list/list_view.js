ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

	List.Contact = Backbone.Marionette.ItemView.extend({
        tagName: "tr",
    	template: "#contact-list-item",

    	events: {
    		"click": "highlightName"
    	},

    	highlightName: function() {
    		this.$el.toggleClass("warning");
    	}
    });

    List.Contacts = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table",
        template: "#contact-list",
        childView: List.Contact,
        childViewContainer: "tbody"
    });

});
