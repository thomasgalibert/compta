Template.banksList.helpers({
	banks: function(){
		var libelleReg = new RegExp(Session.get('searchBankLibelle'));
		var infoReg = new RegExp(Session.get('searchBankInfo'));

		var from = transformDateFr(Session.get('fromBankDate'));
		var to = transformDateFr(Session.get('toBankDate'));
		
		if (Session.get('fromBankDate') == '' && Session.get('toBankDate') == ''){
			return Banks.find({
				'metadata.libelle': libelleReg,
				'metadata.info': infoReg
			}, {sort: {uploadDate: -1}});	
		} else {
			return Banks.find({
				'metadata.libelle': libelleReg,
				'metadata.info': infoReg,
				'metadata.date': {$gte: from, $lte: to}
			}, {sort: {uploadDate: -1}});
		}
		
	}
});