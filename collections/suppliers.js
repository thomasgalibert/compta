Suppliers = new Meteor.Collection('suppliers');

Suppliers.allow({
	insert: function(userId, doc) {return userId && doc.owner === userId;},
	update: ownsDocument,
	remove: ownsDocument
});