ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _) {

	Entities.Contact = Backbone.Model.extend({});

	Entities.ContactCollection = Backbone.Collection.extend({
		model: Entities.Contact,

		comparator: "firstName"
	});

	var contacts;

	var initializeContacts = function() {
		contacts = new Entities.ContactCollection([
	        {
	        	id: 1,
	            firstName: "Bob",
	            lastName: "test",
	            phoneNumber: "44 44 44"
	        },
	        {
	        	id: 2,
	            firstName: "Aob2",
	            lastName: "test2",
	            phoneNumber: "442 44 44"
	        }
        ]);
	};

	var API = {
		getContactEntities: function() {
			if (contacts === undefined) {
				initializeContacts();
			}
			return contacts;
		}
	};

	ContactManager.reqres.setHandler("contact:entities", function() {
		return API.getContactEntities();
	})

});