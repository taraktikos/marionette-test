ContactManager.module("HeaderApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
	List.Header = Marionette.ItemView.extend({
		template: "#header-link",
		tagName: "li",

		events: {
	      "click a": "navigate"
	    },

	    navigate: function(e){
	      e.preventDefault();
	      this.trigger("navigate", this.model);
	    },

	    onRender: function(){
	    	console.log(this.model.selected);
	      if(this.model.selected){
	        this.$el.addClass("active");
	      };
	    }
	});

	List.Headers = Marionette.CompositeView.extend({
		template: "#header-template",
		className: "navbar navbar-default",
		childView: List.Header,
		childViewContainer: ".nav.navbar-nav",

		events: {
			"click a.brand": "brandClicked"
		},

		brandClicked: function(e){
			e.preventDefault();
			this.trigger("brand:clicked");
		}
	});
});