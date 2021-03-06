ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

    List.Layout = Backbone.Marionette.LayoutView.extend({
        template: "#contact-list-layout",

        regions: {
            panelRegion: "#panel-region",
            contactsRegion: "#contacts-region"
        }
    });

    List.Panel = Backbone.Marionette.ItemView.extend({
        template: "#contact-list-panel",

        triggers: {
            "click button.js-new": "contact:new"
        },

        events: {
            "submit #filter-form": "filterContacts"
        },

        filterContacts: function(e){
            e.preventDefault();
            var criterion = this.$(".js-filter-criteria").val();
            this.trigger("contacts:filter", criterion);
        },

        onSetFilterCriterion: function(criterion){
            this.$(".js-filter-criteria").val(criterion);
        }
    });

	List.Contact = Backbone.Marionette.ItemView.extend({
        tagName: "tr",
    	template: "#contact-list-item",

    	events: {
            "click": "highlightName",
            "click button.js-delete": "deleteClicked",
    		"click a.js-show": "showClicked",
            "click a.js-edit": "editClicked"
    	},

    	highlightName: function() {
    		this.$el.toggleClass("warning");
    	},

        deleteClicked: function(e) {
            e.stopPropagation();
            this.trigger("contact:delete", this.model);
        },

        showClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("contact:show", this.model);
        },

        editClicked: function(e){
            e.preventDefault();
            e.stopPropagation();
            this.trigger("contact:edit", this.model);
        },

        remove: function() {
            var self = this;
            this.$el.fadeOut(function() {
                Backbone.Marionette.ItemView.prototype.remove.call(self);
            });
        },

        flash: function(cssClass){
            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function(){
                setTimeout(function(){
                    $view.toggleClass(cssClass)
                }, 500);
            });
        }
    });

    var NoContactsView = Marionette.ItemView.extend({
        template: "#contact-list-none",
        tagName: "tr",
        className: "alert alert-warning"
    });

    List.Contacts = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table",
        template: "#contact-list",
        emptyView: NoContactsView,
        childView: List.Contact,
        childViewContainer: "tbody",

        onChildviewContactDelete: function() {

        }
    });

});
