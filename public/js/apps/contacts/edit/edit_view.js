ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _) {

	Edit.Contact = Backbone.Marionette.ItemView.extend({
    	template: "#contact-form",

    	events: {
    		"click button.js-submit": "submitClicked"
    	},

    	submitClicked: function(e) {
    		e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
    	},

        onFormDataInvalid: function(errors) {
            var $view = this.$el;

            var $form = $view.find("form");
            $form.find(".alert.alert-danger").each(function(){
                $(this).remove();
            });
            $form.find(".has-error").each(function(){
                $(this).removeClass("has-error");
            });

            _.each(errors, function(value, key){
                var $controlGroup = $view.find("#contact-" + key).parent();
                var $errorEl = $("<div>", {class: "alert alert-danger", text: value});
                $controlGroup.append($errorEl).addClass("has-error");
            });
        },

        onShow: function(){
            if(this.options.asModal){
                this.$el.modal();
            }
        },
    });

});
