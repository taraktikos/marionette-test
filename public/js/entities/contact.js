ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _) {

	Entities.Contact = Backbone.Model.extend({
		urlRoot: "contacts",

		defaults: {
			firstName: "",
			lastName: "",
			phoneNumber: ""
		},

		validate: function(attrs, options) {
			var errors = {};
			if (!attrs.firstName) {
				errors.firstName = "First name can't be blank";
			}
			if (!attrs.lastName) {
				errors.lastName = "Last name can't be blank";
			}
			if (!attrs.phoneNumber) {
				errors.phoneNumber = "Phone number can't be blank";
			}
			if (!_.isEmpty(errors)) {
				return errors;
			}
		}
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
			contacts.fetch({async:false});
			return contacts;
		},

		getContactEntity: function(id) {
			var contact = new Entities.Contact({id: id});
			contact.fetch({async:false});
			return contact;
		}
	};

	ContactManager.reqres.setHandler("contact:entities", function() {
		return API.getContactEntities();
	});

	ContactManager.reqres.setHandler("contact:entity", function(id){
		return API.getContactEntity(id);
	});

});