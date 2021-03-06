var ContactManager = new Backbone.Marionette.Application();

ContactManager.addRegions({
	headerRegion: "#header-region",
    mainRegion: "#content",
    dialogRegion: "#dialog-region"
});

ContactManager.navigate = function(route, options) {
	options || (options = {});
	Backbone.history.navigate(route, options);
}

ContactManager.getCurrentRoute = function() {
	return Backbone.history.fragment;
}

ContactManager.on("start", function(options){
	if (Backbone.history){
		Backbone.history.start();

		if(this.getCurrentRoute() === ""){
			ContactManager.trigger("contacts:list")
		}
	}
});