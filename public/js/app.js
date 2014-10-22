var ContactManager = new Backbone.Marionette.Application();

ContactManager.addRegions({
    mainRegion: "#content"
});

 ContactManager.on("start", function () {
    ContactManager.ContactsApp.List.Controller.listContacts();    	
 });