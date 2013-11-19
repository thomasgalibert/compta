Meteor.Router.add({
  '/': {
  	to: 'billsList',
  	as: 'home',
  	and: function() {Session.set('displayBank',false);}
  },
  '/banks': {
  	to: 'banksList',
  	and: function() {Session.set('displayBank', true);}
  }
});

Meteor.Router.filters({
	'clearErrors': function(page) {
		clearErrors();
		return page;
	},
	'requireLogin': function(page){
		if (Meteor.user())
			return page;
		else if (Meteor.loggingIn())
			return 'loading';
		else
			return 'accessDenied';
	}
});

Meteor.Router.filter('clearErrors');
Meteor.Router.filter('requireLogin');