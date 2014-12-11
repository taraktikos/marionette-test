ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _) {
	Edit.Controller = {
		editContact: function(id) {
			var loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.mainRegion.show(loadingView);

			var contact = ContactManager.request("contact:entity", id);
			
			var view;
			if (contact != undefined) {
				view = new Edit.Contact({
					model: contact
				});

				view.on("form:submit", function(data) {
					if (contact.save(data)) {
						ContactManager.trigger("contact:show", contact.get("id"));
					} else {
						view.triggerMethod("form:data:invalid", contact.validationError);
					}
				});
			} else {
				view = new Show.MissingContact();
			}

			ContactManager.mainRegion.show(view);
		}
	}
});