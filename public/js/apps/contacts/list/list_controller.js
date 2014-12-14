ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
	List.Controller = {
		listContacts: function() {
			var loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.mainRegion.show(loadingView);

			var contacts = ContactManager.request("contact:entities");

			var contactsListLayout = new List.Layout();
			var contactsListPanel = new List.Panel();

	        var contactsListView = new List.Contacts({
	            collection: contacts
	        });

			contactsListPanel.on("contacts:filter", function(filterCriterion){
				filteredContacts.filter(filterCriterion);
				ContactManager.trigger("contacts:filter", filterCriterion);
			});

	        contactsListView.on("childview:contact:delete", function(childView, model) {
	        	model.destroy();
	        });

	        contactsListView.on("childview:contact:show", function(childView, model) {
	        	ContactManager.trigger("contact:show", model.get("id"));
	        });

	        contactsListView.on("childview:contact:edit", function(childView, model){
				ContactManager.trigger("contact:edit", model.get("id"));
			});

			contactsListLayout.on("show", function() {
				contactsListLayout.panelRegion.show(contactsListPanel);
				contactsListLayout.contactsRegion.show(contactsListView);
			});

			contactsListPanel.on("contact:new", function(){
				var newContact = new ContactManager.Entities.Contact();
				var view = new ContactManager.ContactsApp.New.Contact({
					model: newContact
				});
				view.on("form:submit", function(data){
					if(newContact.save(data)){
						contacts.add(newContact);
						//contactsListView.children.findByModel(newContact).flash("success");
						//ContactManager.dialogRegion.close();
						ContactManager.trigger("contacts:list");
					} else {
						view.triggerMethod("form:data:invalid", newContact.validationError);
					}
				});
				ContactManager.mainRegion.show(view);
			});

			ContactManager.mainRegion.show(contactsListLayout);
		}
	}
});