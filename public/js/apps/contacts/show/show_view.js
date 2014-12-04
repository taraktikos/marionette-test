ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {

	Show.MissingContact = Marionette.ItemView.extend({
		template: "#missing-contact-view"
	});

	Show.Contact = Backbone.Marionette.ItemView.extend({
    	template: "#contact-view"
    });

});
