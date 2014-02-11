Template.title.helpers({
	ca: function(){
		total = 0;
		firstDay = new Date(new Date().getFullYear(), 0, 1);
		lastDay = new Date(new Date().getFullYear(), 11, 31);
		var bills = Bills.find({date: {$gte: firstDay, $lt: lastDay}});
		bills.forEach(function (bill){
			if (bill.kind == "client"){
				total += bill.amount;
			} else if (bill.kind == "supplier"){
				total -= bill.amount;
			}
		});
		return Number(total).toMoney();
	},
	totalFichiers: function(){
		return Fichiers.find().count();
	},
	totalBanks: function(){
		return Banks.find().count();
	}
});

Template.title.events({
	'click .new-bill': function(e){
		Session.set('editingBill', false);
		Session.set('displayBank', false);
	},
	'click .new-bank': function(e){
		Session.set('displayBank', true);
	}
});