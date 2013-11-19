Banks = new CollectionFS('banks');

Banks.allow({
	insert: function(userId, doc) {return userId && doc.owner === userId;},
	update: ownsDocument,
	remove: ownsDocument
});