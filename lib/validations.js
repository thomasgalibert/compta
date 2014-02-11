// Helper for parsing "jj/mm/YYYY" and create Date object

transformDateFr = function(dateFr){
	if (dateFr != ''){
		if (checkDate(dateFr)){
			var dateRaw = dateFr.split("/");
			var newDate = new Date(dateRaw[2], dateRaw[1]-1, dateRaw[0]);
			return newDate;	
		} else {
			throw new Meteor.Error(422, "Entrez la date au format : dd/mm/YYYY");
		}
	} else {
		var newDate = '';
		return newDate;
	}
};

checkDate = function(str){
	var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  return (m) ? true : false;
};

checkDecimal = function(inputtxt){
	var decimal=  /^[-+]?[0-9]+\.[0-9]+$/;   
	if (inputtxt.match(decimal)) {   
		return inputtxt;  
	} else {   
		throw new Meteor.Error(422, "Vous n'avez pas rentré un nombre au format décimal");
	}  
}

checkNumber = function(inputtxt){
	var decimal=  /^[-+]?[0-9]+$/;   
	if (inputtxt == "") {   
		return 0;	  
	} else if (inputtxt.match(decimal)) {   
		return inputtxt;
	} else {
		throw new Meteor.Error(422, "Vous n'avez pas rentré un nombre entier");
	}  
}

checkFloat = function(inputtxt){
	var decimal=  /^\d{2}$/;   
	if (inputtxt == "") {   
		return 0;	  
	} else if (inputtxt.match(decimal)) {   
		return inputtxt;
	} else {
		throw new Meteor.Error(422, "Vous n'avez pas rentré un nombre décimal au bon format");
	}  
}