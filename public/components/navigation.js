var Component = require("can/component/component");

require("bootstrap/dist/css/bootstrap.css!");
require("bootstrap/js/dropdown");
require("can/route/");
require("can/view/href/");

var stache = require("can/view/stache/");
var route = require("can/route/");
var Session = require("../models/session");
var User = require("../models/user");


stache.registerHelper("isActive", function(options){
	var attrs = {};
	for(var prop in options.hash) {
		var value = options.hash[prop];
		if(typeof value === "function" && value.isComputed) {
			value = value();
		}
		attrs[prop] = value;
	}
	return route.current(attrs) ? options.fn() : options.inverse();
});

can.Component.extend({
	tag: "bitballs-navigation",
	template: require("./navigation.stache!"),
	viewModel: {
		define: {
			loginSession: {
				value: function(){
					return new Session({user: new User()});
				}
			}
		},
		createSession: function(ev){
			
			ev.preventDefault();
			var self = this;
			this.attr("loginSession").save().then(function(session){
				
				self.attr("loginSession", new Session({user: new User()}));
				self.attr("appState").attr("session", session);
				
			});
		},
		logout: function(){
			this.attr("appState").attr("session").destroy();
			this.attr("appState").attr("session", null);
		}
	}
});
