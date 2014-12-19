ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
	List.Controller = {
		listContacts: function(criterion) {
			var loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.mainRegion.show(loadingView);

			var contacts = ContactManager.request("contact:entities");

			var contactsListLayout = new List.Layout();
			var contactsListPanel = new List.Panel();

			var filteredContacts = ContactManager.Entities.FilteredCollection({
          		collection: contacts,
          		filterFunction: function(filterCriterion){
            		var criterion = filterCriterion.toLowerCase();
            		return function(contact){
              			if(contact.get("firstName").toLowerCase().indexOf(criterion) !== -1
                		|| contact.get("lastName").toLowerCase().indexOf(criterion) !== -1
                		|| contact.get("phoneNumber").toLowerCase().indexOf(criterion) !== -1){
                  			return contact;
              			}
            		};
            	}
          	});
          	if (criterion) {
          		filteredContacts.filter(criterion);
				contactsListPanel.once("show", function(){
					contactsListPanel.triggerMethod("set:filter:criterion", criterion);
				});
          	}

			var contactsListView = new List.Contacts({
	            collection: filteredContacts
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
				ContactManager.trigger("contact:create");
			});

			ContactManager.mainRegion.show(contactsListLayout);
		}
	}
});