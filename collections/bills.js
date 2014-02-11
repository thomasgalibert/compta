Bills = new Meteor.Collection('bills');

Bills.allow({
	insert: function(userId, doc) {return userId && doc.owner === userId;},
	update: ownsDocument,
	remove: ownsDocument
});

Meteor.methods({
	bill: function(billAttributes) {
		var user = Meteor.user();
		// ensure the bill has a libelle
		if (!billAttributes.libelle)
			throw new Meteor.Error(422, "Renseignez le libellé");

		if (!billAttributes.date_fr)
			throw new Meteor.Error(422, "Renseignez la date de l'achat");

		if (billAttributes.kind == "supplier"){
			if (!billAttributes.supplier)
				throw new Meteor.Error(422, "Renseignez le nom du fournisseur");
		}	else if (billAttributes.kind == "client"){
			if (!billAttributes.client)
				throw new Meteor.Error(422, "Renseignez le nom du client");
		}

		if (!billAttributes.amountInteger)
			throw new Meteor.Error(422, "Renseignez le montant");

		// Convert dates
		var date = transformDateFr(billAttributes.date_fr);
		var paidAt = transformDateFr(billAttributes.paidAt_fr);

		// Convert amount
		var amountInteger = checkNumber(billAttributes.amountInteger);
		var amountFloat = checkFloat(billAttributes.amountFloat);

		if (amountInteger < 0){
			var amount = parseFloat(amountInteger) - (parseFloat(amountFloat)/100);
		} else {
			var amount = parseFloat(amountInteger) + (parseFloat(amountFloat)/100);	
		}
		
		var bill = _.extend(_.pick(billAttributes, 'libelle','supplier','paidHow','kind','client'), {
			date: date,
			paidAt: paidAt,
			amount: amount,
			owner: user._id
		});

		var billId = Bills.insert(bill);
		
		return billId;
	},
	updateBill: function(billAttributes) {
		// ensure the bill has a libelle
		if (!billAttributes.libelle)
			throw new Meteor.Error(422, "Renseignez le libellé");

		if (!billAttributes.date_fr)
			throw new Meteor.Error(422, "Renseignez la date de l'achat");

		if (billAttributes.kind == "supplier"){
			if (!billAttributes.supplier)
				throw new Meteor.Error(422, "Renseignez le nom du fournisseur");
		}	else if (billAttributes.kind == "client"){
			if (!billAttributes.client)
				throw new Meteor.Error(422, "Renseignez le nom du client");
		}

		if (!billAttributes.amountInteger)
			throw new Meteor.Error(422, "Renseignez le montant");

		// Convert dates
		var date = transformDateFr(billAttributes.date_fr);
		var paidAt = transformDateFr(billAttributes.paidAt_fr);

		// Convert amount
		var amountInteger = checkNumber(billAttributes.amountInteger);
		var amountFloat = checkFloat(billAttributes.amountFloat);
		var amount = parseFloat(amountInteger) + (parseFloat(amountFloat)/100);

		var bill = _.extend(_.pick(billAttributes, 'libelle','supplier','paidHow','kind',"client"), {
			date: date,
			paidAt: paidAt,
			amount: amount
		});

		var billId = Bills.update(billAttributes._id, {$set: bill});

		return billId;
	}
});