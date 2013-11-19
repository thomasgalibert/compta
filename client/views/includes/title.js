Template.title.helpers({
	ca: function(){
		total = 0;
		firstDay = new Date(new Date().getFullYear(), 0, 1);
		lastDay = new Date(new Date().getFullYear(), 12, 31);
		var bills = Bills.find({date: {$gte: firstDay}, date: {$lte: lastDay}});
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

Template.title.rendered = function() {
  $('#login-sign-in-link').text('Connexion ▾');
  $('.login-close-text').text('fermer');
  $('#login-username-label').text("nom d'utilisateur");
  $('#login-password-label').text("mot de passe");
  $('#login-password-again-label').text("confirmation");
  $('.login-button-form-submit').text("connexion");
  $('#back-to-login-link').text("connexion");
  $('#signup-link').text("créer un compte");
  $('#login-buttons-logout').text("déconnexion");
  $('#login-buttons-open-change-password').text("changer le mot de passe");
};