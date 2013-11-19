Template.newBank.events({
	'change .fileUploader': function (e) {
    var files = e.target.files;
    // Convert dates
		var date = transformDateFr($('#dateBank').val());

		var bankMetadatas = {
			info: $('#infoBank').val(),
			libelle: $('#libelleBank').val(),
			date: date
		}
    for (var i = 0, f; f = files[i]; i++) {
      Banks.storeFile(f, bankMetadatas);
    }

    clearForm($('#newBankForm'));
   }
})