ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {

	Show.Contact = Backbone.Marionette.ItemView.extend({
    	template: "#contact-view"
    });

});
