Session.set('displayFormClient', false);
Session.set('editing_client', null);
Session.set('textButtonAddClient', "ajouter");

Template.clientsList.helpers({
	clients: function(){
		return Clients.find({}, {sort: {name: 1}});
	},
	addable: function() {
		return Session.get('displayFormClient');
	},
	textButtonAddClient: function(){
		return Session.get('textButtonAddClient');
	}
});

Template.clientsList.events({
	'click #newClient': function(e){
		var statusDisplay = Session.get('displayFormClient');
		if (statusDisplay){
			Session.set('displayFormClient', false);	
			Session.set('textButtonAddClient', "ajouter");
		} else {
			Session.set('displayFormClient', true);	
			Session.set('textButtonAddClient', "cacher");
		}
	},
	'click #buttonHideFormClient': function(e){
		Session.set('displayFormClient', false);
	},
	'submit #newClientForm': function(e){
		e.preventDefault();
		var user = Meteor.user();
		var client = {
			name: $(e.target).find('[name=nameClient]').val(),
			owner: user._id
		}
		if (client.name != "") {
			client._id = Clients.insert(client);	
			Session.set('displayFormClient', false);
			Session.set('textButtonAddClient', "ajouter");
		}
	},
	'dblclick .client-item': function(e){
		Session.set('editing_client', this._id);
	}
});