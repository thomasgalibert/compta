Session.set('displayFormBill', true);
Session.set('editingBill', false);
Session.set('displayBank', false);
Session.set('selectedBill', null);
Session.set('selectedSupplier', null);
Session.set('selectedClient', null);
Session.set('selectedPaidHow', null);
Session.set('typeBilling', 'supplier');
Session.set('editingType', null);

Template.billsList.helpers({
	bills: function(){
		var supplierReg = new RegExp(Session.get('searchSupplier'));
		var clientReg = new RegExp(Session.get('searchClient'));
		var libelleReg = new RegExp(Session.get('searchLibelle'));

		var from = transformDateFr(Session.get('searchFrom'));
		var to = transformDateFr(Session.get('searchTo'));

		var fromAmount = Number(Session.get('searchAmountFrom'));
		var toAmount = Number(Session.get('searchAmountTo'));

		if (Session.get('searchAmountFrom') == '' && Session.get('searchAmountTo') == ''){
			if (Session.get('searchFrom') ==  '' && Session.get('searchTo') == ''){
				if (Session.get('searchSupplier') == '' && Session.get('searchClient') == ''){
					return Bills.find(
					{
						libelle: {$regex: libelleReg},
					},
					{sort: {date: -1}}
					);	
				} else if (Session.get('searchSupplier') != ''){
					return Bills.find(
					{
						libelle: {$regex: libelleReg},
						supplier: {$regex: supplierReg}
					},
					{sort: {date: -1}}
					);
				} else if (Session.get('searchClient') != ''){
					return Bills.find(
					{
						libelle: {$regex: libelleReg},
						client: {$regex: clientReg}
					},
					{sort: {date: -1}}
					);
				}	
			} else {
				if (Session.get('searchSupplier') == '' && Session.get('searchClient') == ''){
					return Bills.find(
					{
						libelle: {$regex: libelleReg},
						date: {$gte: from, $lte: to }
					},
					{sort: {date: -1}}
					);	
				} else if (Session.get('searchSupplier') != ''){
					return Bills.find(
					{
						libelle: {$regex: libelleReg},
						date: {$gte: from, $lte: to },
						supplier: {$regex: supplierReg}
					},
					{sort: {date: -1}}
					);
				} else if (Session.get('searchClient') != ''){
					return Bills.find(
					{
						libelle: {$regex: libelleReg},
						date: {$gte: from, $lte: to },
						client: {$regex: clientReg}
					},
					{sort: {date: -1}}
					);
				}
			}	
		} else {
			if (Session.get('searchFrom') ==  '' && Session.get('searchTo') == ''){
				if (Session.get('searchSupplier') == '' && Session.get('searchClient') == ''){
					return Bills.find(
					{
						libelle: {$regex: libelleReg},
						amount: {$gte: fromAmount, $lte: toAmount}
					},
					{sort: {date: -1}}
					);	
				} else if (Session.get('searchSupplier') != ''){
					return Bills.find(
					{
						libelle: {$regex: libelleReg},
						supplier: {$regex: supplierReg},
						amount: {$gte: fromAmount, $lte: toAmount}
					},
					{sort: {date: -1}}
					);
				} else if (Session.get('searchClient') != ''){
					return Bills.find(
					{
						libelle: {$regex: libelleReg},
						client: {$regex: clientReg},
						amount: {$gte: fromAmount, $lte: toAmount}
					},
					{sort: {date: -1}}
					);
				}	
			} else {
				if (Session.get('searchSupplier') == '' && Session.get('searchClient') == ''){
					return Bills.find(
					{
						libelle: {$regex: libelleReg},
						amount: {$gte: fromAmount, $lte: toAmount},
						date: {$gte: from, $lte: to }
					},
					{sort: {date: -1}}
					);	
				} else if (Session.get('searchSupplier') != ''){
					return Bills.find(
					{
						libelle: {$regex: libelleReg},
						date: {$gte: from, $lte: to },
						supplier: {$regex: supplierReg},
						amount: {$gte: fromAmount, $lte: toAmount}
					},
					{sort: {date: -1}}
					);
				} else if (Session.get('searchClient') != ''){
					return Bills.find(
					{
						libelle: {$regex: libelleReg},
						date: {$gte: from, $lte: to },
						client: {$regex: clientReg},
						amount: {$gte: fromAmount, $lte: toAmount}
					},
					{sort: {date: -1}}
					);
				}
			}
		}

		

		
		

	}
});