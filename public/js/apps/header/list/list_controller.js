ContactManager.module("HeaderApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listHeader: function(){
      var links = ContactManager.request("header:entities");
      var headers = new List.Headers({collection: links});

      headers.on("brand:clicked", function(){
        ContactManager.trigger("contacts:list");
      });

      headers.on("childview:navigate", function(childView, model){
        var trigger = model.get("navigationTrigger");
        ContactManager.trigger(trigger);
      });

      ContactManager.headerRegion.show(headers);
    },

    setActiveHeader: function(headerUrl){
      	var links = ContactManager.request("header:entities");
		links.each(function(link) {
			if (link.get("url") === headerUrl) {
				link.selected = true;
			} else {
				link.selected = false;
			}
		})
      	links.trigger("reset");
    }
  };
});