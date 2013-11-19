// Helper for displaying date in fr format

displayDate = function(date){
	if (date != ''){
		if (date.getDate() < 10){
			var day = "0"+date.getDate();
		} else {
			var day = date.getDate();
		};

		if (date.getMonth() < 9){
	    var month = "0"+(date.getMonth()+1);
		} else {
	    var month = (date.getMonth()+1);
		};
	  
	  return day+"/"+month+"/"+date.getFullYear();
	} else {
		return "";
	}
		
};