$('#submit').click(function() {
	if (validateDate(StartYear.value, StartMonth.value, StartDay.value) == -1) {
		alert("Invalid Start Date");
	}
	
	if (validateDate(EndYear.value, EndMonth.value, EndDay.value) == -1) {
		alert("Invalid End Date");
	}
	
	$('#room_form').hide();
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
	var fileName;
	if (building == "Carver") {
		fileName = "img/buildings/Carver.PNG"
	} else if (building == "Gilman") {
		fileName = "img/buildings/Gilman.PNG"
	} else if (building == "Hoover") {
		fileName = "img/buildings/Hoover.PNG"
	} else if (building == "Howe") {
		fileName = "img/buildings/Howe.PNG"
	} else if (building == "Memorial Union") {
		fileName = "img/buildings/MemorialUnion.PNG"
	} else {
		fileName = "img/buildings/none.png"
	}
	var str = '<img src="' + fileName + '">';
	$('#map').append(building + " is located here: <br>");
	$('#map').append(str);
}