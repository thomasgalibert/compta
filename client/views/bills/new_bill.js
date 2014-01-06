var moyenPaiements = [
	{value: "cb", name: "carte bancaire"},
	{value: "ch", name: "chèque"},
	{value: "vi", name: "virement"},
	{value: "es", name: "espèces"}
];

Template.newBill.helpers({
	suppliers: function(){
		return Suppliers.find({}, {sort: {name: 1}})
	},
	clients: function(){
		return Clients.find({}, {sort: {name: 1}})
	},
	paiements: function(){
		return moyenPaiements;
	},
	editing: function(){
		return Session.get('editingBill');
	},
	editedBill: function(){
		return Bills.findOne(Session.get('selectedBill'));
	},
	fichiers: function(){
		var bill = Bills.findOne(Session.get('selectedBill'));
		return Fichiers.find({metadata: {bill: bill._id}});
	},
	dateHuman: function(){
		return displayDate(this.date);
	},
	selectSupplier: function(){
		if (Session.equals('selectedSupplier', this._id)){
			return 'selected';
		} else {
			return '';
		}
	},
	selectClient: function(){
		if (Session.equals('selectedClient', this._id)){
			return 'selected';
		} else {
			return '';
		}
	},
	billSupplier: function(){
		if (Session.equals('typeBilling', 'supplier')){
			return true;
		} else {
			return false;
		}
	},
	editingType: function(){
		if (this.kind == "supplier"){
			return true;
		} else if (this.kind == "client"){
			return false;
		}
	},
	paidAtHuman: function(){
		return displayDate(this.paidAt);
	},
	selectPaidHow: function(){
		if (Session.equals('selectedPaidHow', this.value)){
			return 'selected';
		} else {
			return '';
		}
	},
	integerPart: function(){
		return Math.floor(this.amount);
	},
	decimalPart: function(){
		var decimal = Math.round((this.amount % 1) * 100);
		if (decimal < 10){
			return "0"+decimal;
		} else {
			return decimal;
		}
	}
});

Template.newBill.events({
	'submit #newBillForm': function(e){
		e.preventDefault();
		
		var bill = {
			libelle: $(e.target).find('[name=libelleBill]').val(),
			date_fr: $(e.target).find('[name=dateBill]').val(),
			supplier: $(e.target).find('[name=supplierBill]').val(),
			client: $(e.target).find('[name=clientBill]').val(),
			paidAt_fr: $(e.target).find('[name=paidAtBill]').val(),
			paidHow: $(e.target).find('[name=paidHowBill]').val(),
			amountInteger: $(e.target).find('[name=amountBillInteger]').val(),
			amountFloat: $(e.target).find('[name=amountBillFloat]').val(),
			kind: Session.get('typeBilling')
		}

		Meteor.call('bill', bill, function(error, id){
			if (error){
				throwError(error.reason);
			} else {
				Session.set('selectedBill', id);
				Session.set('editingBill',true);
    		Session.set('selectedSupplier', bill.supplier);
    		Session.set('selectedClient', bill.client);
    		Session.set('selectedPaidHow', bill.paidHow);
			}
		});
	},
	'submit #editBillForm': function(e){
		e.preventDefault();
		
		var bill = {
			_id: Session.get('selectedBill'),
			libelle: $(e.target).find('[name=libelleBill]').val(),
			date_fr: $(e.target).find('[name=dateBill]').val(),
			supplier: $(e.target).find('[name=supplierBill]').val(),
			client: $(e.target).find('[name=clientBill]').val(),
			paidAt_fr: $(e.target).find('[name=paidAtBill]').val(),
			paidHow: $(e.target).find('[name=paidHowBill]').val(),
			amountInteger: $(e.target).find('[name=amountBillInteger]').val(),
			amountFloat: $(e.target).find('[name=amountBillFloat]').val(),
		}

		Meteor.call('updateBill', bill, function(error, id){
			if (error){
				throwError(error.reason);
			} else {
				Session.set('selectedBill', id);
				Session.set('editingBill',true);
    		Session.set('selectedSupplier', bill.supplier);
    		Session.set('selectedClient', bill.client);
    		Session.set('selectedPaidHow', bill.paidHow);
			}
		});
	},
	'click #clearFormBill': function(e){
		form = $(e.target).parents('form:first');
		clearForm($(form));
	},
	'click #newFormBill': function(e){
		Session.set('selectedBill', null);
		Session.set('editingBill',false);
	},
	'click #myonoffswitch': function(e){
		var checked = $(e.target).is(':checked');
		checked ? Session.set('typeBilling', 'supplier') : Session.set('typeBilling', 'client');
	},
	'change .fileUploader': function (e) {
    var files = e.target.files;
    for (var i = 0, f; f = files[i]; i++) {
      Fichiers.storeFile(f, {
      	bill: Session.get('selectedBill')
      });
    }
   }
});