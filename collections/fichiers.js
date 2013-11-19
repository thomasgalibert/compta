Fichiers = new CollectionFS('fichiers');

Fichiers.allow({
	insert: function(userId, doc) {return userId && doc.owner === userId;},
	update: ownsDocument,
	remove: ownsDocument
});

Meteor.methods({
	removeFichiers: function(billId){
		Fichiers.remove({metadata: {bill: billId}});
	}
});