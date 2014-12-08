ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {
	Show.Controller = {
		showContact: function(id) {
			var loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.mainRegion.show(loadingView);

			var contact = ContactManager.request("contact:entity", id);
			
			var contactView;
			if (contact != undefined) {
				contactView = new Show.Contact({
					model: contact
				});
			} else {
				contactView = new Show.MissingContact();
			}

			setTimeout(function() {
				ContactManager.mainRegion.show(contactView);
			}, 500);
		}
	}
});