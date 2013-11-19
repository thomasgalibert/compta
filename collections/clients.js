Clients = new Meteor.Collection('clients');

Clients.allow({
	insert: function(userId, doc) {return userId && doc.owner === userId;},
	update: ownsDocument,
	remove: ownsDocument
});