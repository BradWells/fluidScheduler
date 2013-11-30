var add_event_content = '<form>                                                                             ' +
	'	<div id="accordion">                                                                                ' +
	'		<h3>Event Info</h3>                                                                             ' +
	'		<table>                                                                                         ' +
	'			<tr>                                                                                        ' +
	'				<td>Event Name:</td>                                                                    ' +
	'				<td><input type="text" name="eventname" id="eventname"/></td>                           ' +
	'			</tr>                                                                                       ' +
	'			<tr>                                                                                        ' +
	'				<td>Start Date:</td>                                                                    ' +
	'				<td><input type="text" name="start" id="start" readonly/></td>                          ' +
	'			</tr>                                                                                       ' +
	'			<tr>                                                                                        ' +
	'				<td>End Date:</td>                                                                      ' +
	'				<td><input type="text" name="end" id="end" readonly/></td>                              ' +
	'			</tr>                                                                                       ' +
	'		</table>                                                                                        ' +
	'		<h3>Room Search Criteria</h3>                                                                   ' +
	'		<table>                                                                                         ' +
	'			<tr>                                                                                        ' +
	'				<td>Number attending:</td>                                                              ' +
	'				<td>	                                                                                ' +
	'					<select id="numAttending">                                                          ' +
	'						<option>0-24</option>                                                           ' +
	'						<option>25-49</option>                                                          ' +
	'						<option>50-74</option>                                                          ' +
	'						<option>75-99</option>                                                          ' +
	'						<option>100+</option>                                                           ' +
	'					</select>                                                                           ' +
	'				</td>                                                                                   ' +
	'			</tr>                                                                                       ' +
	'			<tr>                                                                                        ' +
	'				<td>Buildings:</td>                                                                     ' +
	'				<td>                                                                                    ' +
	'					<div id="format">                                                                   ' +
	'						<input type="checkbox" id="check1"/><label for="check1">Carver</label>          ' +
	'						<input type="checkbox" id="check2"/><label for="check2">Gilman</label>          ' +
	'						<input type="checkbox" id="check3"/><label for="check3">Hoover</label>          ' +
	'						<input type="checkbox" id="check4"/><label for="check4">Howe</label>            ' +
	'						<input type="checkbox" id="check5"/><label for="check5">Memorial Union</label>  ' +
	'					</div>                                                                              ' +
	'				</td>                                                                                   ' +
	'			</tr>                                                                                       ' +
	'		</table>                                                                                        ' +
	'		<h3>Additional Information</h3>                                                                 ' +
	'		<table>                                                                                         ' +
	'			<tr>                                                                                        ' +
	'				<td>Enter additional event information below:</td>                                      ' +
	'			<tr>                                                                                        ' +
	'			<tr>                                                                                        ' +
	'				<td><textarea rows="4" cols="40" border="1"></textarea></td>                            ' +
	'			</tr>                                                                                       ' +
	'		</table>                                                                                        ' +
	'	</div>                                                                                              ' +
	'   <div id="form_button_spacer"></div>                                                                 ' +
	'	<a href="javascript:;" id="createevent" class="add_form_button">Create Event</a>                    ' +
	'</form>'

var add_contact_content = '<form>                                                                           ' +
	'	<div id="accordion">                                                                                ' +
	'		<h3>Contact Info</h3>                                                                           ' +
	'		<table>                                                                                         ' +
	'			<tr>                                                                                        ' +
	'				<td>Contact Name:</td>                                                                  ' +
	'				<td><input type="text" name="contactname" id="contactname"/></td>                       ' +
	'			</tr>                                                                                       ' +
	'			<tr>                                                                                        ' +
	'				<td>Contact E-mail:</td>                                                                ' +
	'				<td><input type="text" name="contactemail" id="contactemail"/></td>                     ' +
	'			</tr>                                                                                       ' +
	'		</table>                                                                                        ' +
	'	</div>                                                                                              ' +
	'   <div id="form_button_spacer"></div>                                                                 ' +
	'	<a href="javascript:;" id="createcontact" class="add_form_button">Create Contact</a>                ' +
	'</form>'

/*
 *
 * Handle window resizing
 *
 */

window.onresize = function(event) {
	$("#workspace").width($("#graph").width())
	$("#workspace").height($("#graph").height())
}

window.onresize()




/*
 *
 * Lock window scrolling
 *
 */
var scrollPosition = [
    self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
];
var html = jQuery('html');
html.data('scroll-position', scrollPosition);
html.data('previous-overflow', html.css('overflow'));
html.css('overflow', 'hidden');
window.scrollTo(scrollPosition[0], scrollPosition[1]);




/*
 *
 * Initiate arborjs
 *
 */

var repulsion = 7;
var stiffness = 300;
var friction = 0.5;

var sys = arbor.ParticleSystem(repulsion, stiffness, friction);
sys.renderer = Renderer("#workspace");

var testNode = sys.addNode(
	'Test',
	{
		'color':'red',
		'shape':'dot',
		'label':'Test'
 	});
var testNode2 = sys.addNode(
	'Test2',
	{
		'color':'blue',
		'shape':'square',
		'label':'Test2'
	});
sys.addEdge(testNode, testNode2);

var strings = new Array();
strings.push("Short Text");
strings.push("THIS IS A REALLY LONG MESSAGE");
strings.push("ok done");

var testNodeImage = sys.addNode(
	'TestImage',
	{
		'color':'blue',
		'shape':'event_blob_image',
		'label':'TestImage',
		'image':'http://162.243.43.130/img/glyphicons/glyphicons_012_heart.png',
		'text': strings
	});
sys.addEdge(testNode, testNodeImage);

var data = {
	nodes:{
		animals:{'color':'red','shape':'dot','label':'Animals'},
		dog:{'color':'green','shape':'square','label':'dog'},
		cat:{'color':'blue','shape':'square','label':'cat'}
	},
	edges:{
		animals:{ dog:{}, cat:{} }
	}
};
sys.graft(data);




/*
 *
 * Add Event and Add Contact Buttons
 *
 */

var foo = 1;

var add_event = function(name, image, start, end, attending) {
	var label = '';
	if(name) {
		label = name;
	}
	image_source = '';
	if(image) {
		image_source = image;
	}
	var details = new Array();
	if(start) {
		details.push("Start: " + start);
	}
	if(end) {
		details.push("End: " + end);
	}
	if(attending) {
		details.push("Attending: " + attending);
	}
	sys.addNode(
		String(foo++),
		{
			'color': 'green',
			'shape': 'contact_blob_image',
			'label': label,
			'image': image_source,
			'text' : details,
			'type' : 'event'
		});
}

var add_contact = function(name, image, email) {
	var label = '';
	if(name) {
		label = name;
	}
	image_source = '';
	if(image) {
		image_source = image;
	}
	var details = new Array();
	if(email) {
		details.push("Email: " + email);
	}
	sys.addNode(
		String(foo++),
		{
			'color': 'orange',
			'shape': 'contact_blob_image',
			'label': label,
			'image': image_source,
			'text' : details,
			'type' : 'contact'
		});
}

var open_box = function(button, buttonText, box, content) {
	button.text(buttonText);
	box.animate({'bottom': '19px'}, 1000);
	box.removeClass('hidden');
	box.empty();
	box.html(content);

}

var close_box = function(button, buttonText, box) {
	button.text(buttonText);
	box.animate({'bottom': '-351px'}, 1000);
	box.addClass('hidden');
	box.empty();
}

$("#add_event").click(
	function() {
		var that = $(this);
		var box = $("#add_event_form");
		var other_box = $("#add_contact_form");
		if(!other_box.hasClass('hidden')) {
			close_box($("#add_contact"), "Add Contact", other_box);
		}
		if(box.hasClass('hidden')) {
			open_box(that, "Cancel", box, add_event_content);

			$('#start').datetimepicker();
			$('#end').datetimepicker();
			$('#accordion').accordion({ collapsible: "true", animate: 0 });
			$('#check').button();
			$('#format').buttonset();
			$('#createevent').click(
				function() {
					add_event(
						String($('#eventname').val()), 
						'http://162.243.43.130/img/glyphicons/glyphicons_012_heart.png', 
						String($('#start').val()),
						String($('#end').val()),
						String($('#numAttending option:selected').text()));
					close_box(that, "Add Event", box);
				});
		}
		else {
			close_box(that, "Add Event", box);
		}
	});

$("#add_contact").click(
	function() {
		var that = $(this);
		var box = $("#add_contact_form");
		var other_box = $("#add_event_form");
		if(!other_box.hasClass('hidden')) {
			close_box($("#add_event"), "Add Event", other_box);
		}
		if(box.hasClass('hidden')) {
			open_box(that, "Cancel", box, add_contact_content);

			$('#accordion').accordion({ collapsible: "true", animate: 0 });
			$('#createcontact').click(
				function() {
					add_contact(
						String($('#contactname').val()),
						'http://162.243.43.130/img/glyphicons/glyphicons_003_user.png',
						String($('#contactemail').val()));
					close_box(that, "Add Contact", box);
				});
		}
		else {
			close_box(that, "Add Contact", box);
		}
	});




/*
 *
 * Zoom Controls
 *
 */

$("#zoomout").click(
	function() {
		sys.renderer.zoomout();
		var zoom = 100 - ((sys.renderer.zoom() - 0.1) / 0.1) * 5;
		if(zoom < 0) {
			$("#slider").slider("value", 0);
		}
		else {
			$("#slider").slider("value", zoom);
		}
	}); 

$("#zoomin").click(
	function() {
		sys.renderer.zoomin();
		var zoom = 100 - ((sys.renderer.zoom() - 0.1) / 0.1) * 5;
		if(zoom > 100) {
			$("#slider").slider("value", 100);
		}
		else {
			$("#slider").slider("value", zoom);
		}
	});

var changezoom = function(event, ui) {
	var val = 0.1 * ((100 - $(this).slider("value")) / 5) + 0.1;
	sys.renderer.setzoom(val);
};

$("#slider").slider({
 	value: 55,
 	orientation: "horizontal",
 	range: "min",
 	animate: true,
 	slide: changezoom,
 	change: changezoom
});




/*
 *
 * Event Feed Panes
 *
 */
 
$("#public_events_button").click(
	function() {
		var pane = $("#public_events_feed");
		if(pane.hasClass('hidden')) {
			// show
			pane.animate({'left': '-2px'}, 1000);
			pane.removeClass('hidden');
			$(this).empty();
			$(this).append('<img src="../static/img/glyphicons/glyphicons_224_chevron-left.png" />');
		}
		else {
			// hide
			pane.animate({'left': '-402px'}, 1000);
			pane.addClass('hidden');
			$(this).empty();
			$(this).append('<img src="../static/img/glyphicons/glyphicons_223_chevron-right.png" />');
		}
	});

$("#attending_events_button").click(
	function() {
		var pane = $("#attending_events_feed");
		if(pane.hasClass('hidden')) {
			// show
			pane.animate({'right': '-2px'}, 1000);
			pane.removeClass('hidden');
			$(this).empty();
			$(this).append('<img src="../static/img/glyphicons/glyphicons_223_chevron-right.png" />');
		}
		else {
			// hide
			pane.animate({'right': '-402px'}, 1000);
			pane.addClass('hidden');
			$(this).empty();
			$(this).append('<img src="../static/img/glyphicons/glyphicons_224_chevron-left.png" />');
		}
	});

function Event(name, start, end, date, place, image_src, repeat, key) {
	this.name = name;
	this.start = start;
	this.end = end;
	this.date = date;
	this.place = place;
	this.image_src = image_src;
	this.key = key;
}

function EventsFeed(locator) {
	var that = this;

	this.locator = locator;
	this.events = new Array();

	// Converts datetime strings from "MM/DD/YYYY HH:MM"
	this.datetime = function(datetime_string) {
		var datetime = function() {}

		// parse date
		if(datetime_string && datetime_string.indexOf('/') !== -1) {
			// split date into parts
			var date = datetime_string.split('/');
			datetime.day = parseInt(date[1]);
			datetime.month = parseInt(date[0]);
			if(date[2].indexOf(':') !== -1) {
				// has time at end
				year_time = date[2].split(' ');
				datetime.year = parseInt(year_time[0]);
			}
			else {
				datetime.year = parseInt(date[2]);
			}
		}
		else {
			// no date
			datetime.day = 0;
			datetime.month = 0;
			datetime.year = 0;
		}

		// parse time
		if(datetime_string && datetime_string.indexOf(':') !== -1) {
			// split time into parts
			var time = datetime_string.split(':');
			if(time[0].indexOf('/') !== -1) {
				// has date at beginning
				year_time = time[0].split(' ');
				datetime.hour = parseInt(year_time[1]);
			}
			else {
				datetime.hour = parseInt(time[0]);
			}
			if(time[1].indexOf(' ') !== -1) {
				// has am/pm at end
				time_12hr = time[1].split(' ');
				datetime.minute = parseInt(time_12hr[0]);
				if(time_12hr[1].trim() == 'pm') {
					datetime.minute += 12;
				}
			}
			else {
				datetime.minute = parseInt(time[1]);
			}
		}
		else {
			// no time
			datetime.hour = 0;
			datetime.minute = 0;
		}

		return datetime;
	}

	this.compare_datetime = function(datetime1, datetime2) {
		if(datetime1.year > datetime2.year) {
			return 1;
		}
		else if(datetime1.year == datetime2.year) {
			if(datetime1.month > datetime2.month) {
				return 1;
			}
			else if(datetime1.month == datetime2.month) {
				if(datetime1.day > datetime2.day) {
					return 1;
				}
				else if(datetime1.day == datetime2.day) {
					if(datetime1.hour > datetime2.hour) {
						return 1;
					}
					else if(datetime1.hour == datetime2.hour) {
						if(datetime1.minute > datetime2.minute) {
							return 1;
						}
						else if(datetime1.minute == datetime2.minute) {
							return 0;
						}
						else {
							return -1;
						}
					}
					else {
						return -1;
					}
				}
				else {
					return -1;
				}
			}
			else {
				return -1;
			}
		}
		else {
			return -1;
		}
	}

	this.add_event = function(name, start, end, date, place, image_src, repeat, key) {
		that.events[that.events.length] = new Event(name, start, end, date, place, image_src, repeat, key);
	}

	this.update = function(name, from, to, repeats, public) {
		$(that.locator).empty();
		var event_keys = [];
		for(var i = 0; i < that.events.length; i++) {
			var event_date = that.datetime(that.events[i].date);

			var event_from = that.datetime(that.events[i].start);
			event_from.day = event_date.day;
			event_from.month = event_date.month;
			event_from.year = event_date.year;
			var event_to = that.datetime(that.events[i].end);
			event_to.day = event_date.day;
			event_to.month = event_date.month;
			event_to.year = event_date.year;

			var filter_from = that.datetime(from);
			var filter_to = that.datetime(to);

			if((!name || that.events[i].name.indexOf(name) !== -1) &&
					(!from || that.compare_datetime(event_from, filter_from) >= 0) &&
					(!to || that.compare_datetime(event_to, filter_to) <= 0) &&
					(repeats || event_keys.indexOf(that.events[i].key) == -1)) {
				event_keys[event_keys.length] = that.events[i].key;
				if(public) {
					$(that.locator).append(
						'<div class="event_card">' +
						    '<img src="' + that.events[i].image_src + '" class="event_card_image" />' +
						    '<div class="event_card_info">' +
								'<span class="event_name">' + that.events[i].name + '</span></br />' +
								'<span class="event_details">' + that.events[i].start + ' - ' + that.events[i].end + '</br />' +
								that.events[i].date + '<br />' +
								that.events[i].place + '</span><br />' +
								'<div class="event_links"><a href="/event" class="link">View</a><span class="right"><a href="javascript:;" class="link">Ignore</a> <a href="javascript:;" class="link">Attend</a></span></div>' +
							'</div>' +
						'</div>');
				}
				else {
					$(that.locator).append(
						'<div class="event_card">' +
						    '<img src="' + that.events[i].image_src + '" class="event_card_image" />' +
						    '<div class="event_card_info">' +
								'<span class="event_name">' + that.events[i].name + '</span></br />' +
								'<span class="event_details">' + that.events[i].start + ' - ' + that.events[i].end + '</br />' +
								that.events[i].date + '<br />' +
								that.events[i].place + '</span><br />' +
								'<div class="event_links"><a href="/event" class="link">View</a><span class="right"><a href="javascript:;" class="link">Remove</a></span></div>' +
							'</div>' +
						'</div>');
				}
			}
		}
	}
}

var today = new Date().toLocaleDateString("en-US");

var public_events = new EventsFeed('#public_events_scrollarea');
var attending_events = new EventsFeed('#attending_events_scrollarea');

$(".date_filter").datetimepicker();

$("#public_search").click(
	function() {
		var name = String($("#public_text_filter").val()).trim();
		var from = String($("#public_from").val()).trim();
		var to = String($("#public_to").val()).trim();
		var repeats = $("#public_repeats").is(':checked');
		public_events.update(name, from, to, repeats, true);
	})

$("#attending_search").click(
	function() {
		var name = String($("#attending_text_filter").val()).trim();
		var from = String($("#attending_from").val()).trim();
		var to = String($("#attending_to").val()).trim();
		var repeats = $("#attending_repeats").is(':checked');
		attending_events.update(name, from, to, repeats, false);
	})

public_events.add_event('Fantastic Event Thing', '10:00 am', '1:00 pm', '10/10/2013', 'Secret Base', 'http://i250.photobucket.com/albums/gg271/CivBase/BZ2BG-800x600.gif', 'Once', 'key1');
public_events.add_event('Another Event', '3:00 pm', '4:00 pm', '10/11/2013', 'Aperture Labs', 'http://i250.photobucket.com/albums/gg271/CivBase/Lies.gif', 'Once', 'key2');
public_events.add_event('Best Event', '5:00 pm', '7:00 pm', '10/14/2013', 'Hoover', 'http://i250.photobucket.com/albums/gg271/CivBase/polo.png', 'Once', 'key3');

public_events.add_event('Best Event', '5:00 pm', '7:00 pm', '10/14/2013', 'Hoover', 'http://i250.photobucket.com/albums/gg271/CivBase/polo.png', 'Once', 'key3');
public_events.add_event('Best Event', '5:00 pm', '7:00 pm', '10/14/2013', 'Hoover', 'http://i250.photobucket.com/albums/gg271/CivBase/polo.png', 'Once', 'key3');
public_events.add_event('Best Event', '5:00 pm', '7:00 pm', '10/14/2013', 'Hoover', 'http://i250.photobucket.com/albums/gg271/CivBase/polo.png', 'Once', 'key3');
public_events.add_event('Best Event', '5:00 pm', '7:00 pm', '10/14/2013', 'Hoover', 'http://i250.photobucket.com/albums/gg271/CivBase/polo.png', 'Once', 'key3');
public_events.add_event('Best Event', '5:00 pm', '7:00 pm', '10/14/2013', 'Hoover', 'http://i250.photobucket.com/albums/gg271/CivBase/polo.png', 'Once', 'key3');

attending_events.add_event('Fantastic Event Thing', '1:00 pm', '4:00 pm', '10/10/2013', 'Memorial Union Sun Room', 'http://static.fjcdn.com/pictures/the+dark+loaf_68f0e1_4004032.jpg', 'Once', 'key4');

public_events.update(null, null, null, false, true);
attending_events.update(null, null, null, false, false);
