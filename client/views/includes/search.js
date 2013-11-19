// Sessions searchs for Bills
Session.set('searchSupplier', '');
Session.set('searchClient', '');
Session.set('searchLibelle', '');
Session.set('searchFrom', '');
Session.set('searchTo', '');
Session.set('searchAmountFrom', '');
Session.set('searchAmountTo', '');

// Sessions searchs for Banks
Session.set('searchBankLibelle','');
Session.set('searchBankInfo','');
Session.set('fromBankDate','');
Session.set('toBankDate','');

Template.search.helpers({
	suppliers: function(){
		return Suppliers.find();
	},
	clients: function(){
		return Clients.find();
	},
	displayBank: function(){
		return Session.get('displayBank');
	}
});

Template.search.events({
	'change #searchSupplier': function(e){
		var supplierSelected = $(e.target).val();
		Session.set('searchSupplier', supplierSelected);	
	},
	'change #searchClient': function(e){
		var clientSelected = $(e.target).val();
		Session.set('searchClient', clientSelected);	
	},
	'keyup #searchLibelle': function(e){
		var libelle = $(e.target).val();
		Session.set('searchLibelle', libelle);	
	},
	'keyup #fromDate': function(e){
		var from = $(e.target).val();
		Session.set('searchFrom', from);	
	},
	'keyup #toDate': function(e){
		var to = $(e.target).val();
		Session.set('searchTo', to);	
	},
	'keyup #fromAmount': function(e){
		var from = $(e.target).val();
		Session.set('searchAmountFrom', from);	
	},
	'keyup #toAmount': function(e){
		var to = $(e.target).val();
		Session.set('searchAmountTo', to);	
	},
	'keyup #searchBankLibelle': function(e){
		var libelle = $(e.target).val();
		Session.set('searchBankLibelle', libelle);	
	},
	'keyup #searchBankInfo': function(e){
		var info = $(e.target).val();
		Session.set('searchBankInfo', info);	
	},
	'keyup #fromBankDate': function(e){
		var from = $(e.target).val();
		Session.set('fromBankDate', from);	
	},
	'keyup #toBankDate': function(e){
		var to = $(e.target).val();
		Session.set('toBankDate', to);	
	},
	'click #resetSearch': function(e){
		$('#searchSupplier').val('');
		$('#searchClient').val('');
		$('#searchLibelle').val('');
		$('#fromDate').val('');
		$('#toDate').val('');
		$('#fromAmount').val('');
		$('#toAmount').val('');
		Session.set('searchSupplier', '');
		Session.set('searchClient', '');
		Session.set('searchLibelle', '');
		Session.set('searchFrom', '');
		Session.set('searchTo', '');
		Session.set('searchAmountFrom', '');
		Session.set('searchAmountTo', '');
	},
	'click #resetSearchBank': function(e){
		$('#searchBankLibelle').val('');
		$('#searchBankInfo').val('');
		$('#fromBankDate').val('');
		$('#toBankDate').val('');
		Session.set('searchBankLibelle', '');
		Session.set('searchBankInfo', '');
		Session.set('fromBankDate', '');
		Session.set('toBankDate', '');
	}
});