ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _) {

	Entities.Contact = Backbone.Model.extend({
		urlRoot: "contacts"
	});

	Entities.ContactCollection = Backbone.Collection.extend({
		url: "contacts",
		model: Entities.Contact,
		comparator: "firstName"
	});

	var contacts;

	var API = {
		getContactEntities: function() {
			var contacts = new Entities.ContactCollection();
			contacts.fetch();
			return contacts;
		}
	};

	ContactManager.reqres.setHandler("contact:entities", function() {
		return API.getContactEntities();
	})

});