Template.billItem.events({
	'click #deleteBill': function(e){
		Bills.remove(this._id);
		Meteor.call('removeFichiers', this._id, function(error, id){
			if (error){
				throwError(error.reason);
			}
		});
		Session.set('selectedBill', null);
		Session.set('editingBill',false);
	},
	'click .billitem': function(e){
		Session.set('displayFormBill', true);
		Session.set('editingBill', true);
		Session.set('selectedBill', this._id);
		Session.set('selectedSupplier', this.supplier);
		Session.set('selectedClient', this.client);
		Session.set('selectedPaidHow', this.paidHow);
		Session.set('displayBank', false);
	},
	'click .editedBill': function(e){
		bill = Bills.findOne(this._id);
		if (bill.edited == true){
			Bills.update(this._id, {$set: {edited: false}});
		} else {
			Bills.update(this._id, {$set: {edited: true}});
		}
	}
});

Template.billItem.helpers({
	isActive: function(){
		if (Session.equals('selectedBill', this._id)){
			return "selected";
		} else {
			return "";
		}
	},
	isEdited: function(){
		if (this.edited == true){
			return "checked"
		}
	},
	kindBill: function(){
		if (this.kind == "supplier"){
			return "HA";
		} else if (this.kind == "client"){
			return "VT";
		}
	},
	dateHuman: function(){
		return displayDate(this.date);
	},
	supplier_name: function(){
		if (this.kind == "supplier"){
			supplier = Suppliers.findOne(this.supplier);
			if (supplier){
				return supplier.name;	
			} else{
				return "--";
			}	
		} else if (this.kind == "client"){
			client = Clients.findOne(this.client);
			if (client){
				return client.name;	
			} else{
				return "--";
			}	
		}
		
	},
	paidAtHuman: function(){
		return displayDate(this.paidAt);
	},
	paidHowHuman: function(){
		switch (this.paidHow){
			case "cb":
				return "Carte bancaire";
				break;
			case "ch":
				return "Chèque";
				break;
			case "vi":
				return "Virement";
				break;
			case "es":
				return "Espèces";
				break;
			default:
				return "--";
				break;
		}
	},
	amountHuman: function(){
		return Number(this.amount).toMoney();
	}
})