Template.fichierItem.events({
	'click #deleteFichier': function(e){
		Fichiers.remove(this._id);
	}
});

Template.fichierItem.helpers({
	billLibelle: function(){
		var bill = Bills.findOne(this.metadata.bill);
		return bill.libelle;
	}
});