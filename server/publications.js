Meteor.publish('bills', function() {
    if (this.userId) {
        return Bills.find({ owner: this.userId });
    }
});

Meteor.publish('suppliers', function() {
    if (this.userId) {
        return Suppliers.find({ owner: this.userId });
    }
});

Meteor.publish('clients', function() {
    if (this.userId) {
        return Clients.find({ owner: this.userId });
    }
});

Meteor.publish('fichiers', function() {
    if (this.userId) {
        return Fichiers.find({ owner: this.userId });
    }
});

Meteor.publish('banks', function() {
    if (this.userId) {
        return Banks.find({ owner: this.userId });
    }
});
