Template.bankItem.events({
	'click #deleteBank': function(e){
		Banks.remove(this._id);
	}
});

Template.bankItem.helpers({
	dateFr: function(){
		return displayDate(this.metadata.date);
	}
});