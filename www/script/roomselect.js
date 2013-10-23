$('#Submit').click(function() {
	if (validateDate(StartYear.value, StartMonth.value, StartDay.value) == -1) {
		alert("Invalid Start Date");
	}
	
	if (validateDate(EndYear.value, EndMonth.value, EndDay.value) == -1) {
		alert("Invalid End Date");
	}
	
	$('#Submit').hide();
	
	showMap(Building.value);
	
});

function validateDate(year, month, day) {
	if (month == "April" || month == "June" || month == "September" || month == "November") {
		if (day == 31) {
			return -1;
		}
	} else if (month == "February") {
		if (day < 29) {
			return 0;
		} else if (day > 29) {
			return -1;
		} else {
			if (year % 4 == 0) {
				if (year % 100 == 0 && year % 400 != 0) {
					return -1;
				}
				return 0;
			}
			return -1;
		}
	} 
	return 0;
}

function showMap(building) {
	if (building == "Carver") {
	
	} else if (building == "Gilman") {
	
	} else if (building == "Hoover") {
	
	} else if (building == "Howe") {
	
	} else if (building == "Memorial Union") {
	
	}
}