Session.set('displayFormSupplier', false);
Session.set('editing_supplier', null);
Session.set('textButtonAddSupplier', "ajouter");

Template.suppliersList.helpers({
	suppliers: function(){
		return Suppliers.find({}, {sort: {name: 1}});
	},
	addable: function() {
		return Session.get('displayFormSupplier');
	},
	textButtonAddSupplier: function(){
		return Session.get('textButtonAddSupplier');
	}
});

Template.suppliersList.events({
	'click #newSupplier': function(e){
		var statusDisplay = Session.get('displayFormSupplier');
		if (statusDisplay){
			Session.set('displayFormSupplier', false);	
			Session.set('textButtonAddSupplier', "ajouter");
		} else {
			Session.set('displayFormSupplier', true);	
			Session.set('textButtonAddSupplier', "cacher");
		}
	},
	'click #buttonHideFormSupplier': function(e){
		Session.set('displayFormSupplier', false);
	},
	'submit #newSupplierForm': function(e){
		e.preventDefault();
		var user = Meteor.user();
		var supplier = {
			name: $(e.target).find('[name=nameSupplier]').val(),
			owner: user._id
		}
		if (supplier.name != "") {
			supplier._id = Suppliers.insert(supplier);
			Session.set('displayFormSupplier', false);
			Session.set('textButtonAddSupplier', "ajouter");
		}
	},
	'dblclick .supplier-item': function(e){
		Session.set('editing_supplier', this._id);
	}
});