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
	'					<select>                                                                            ' +
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
					sys.addNode(
						String(foo++),
						{
							'color':'green',
							'shape':'dot',
							'label': String($('#eventname').val())
						});
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
					sys.addNode(
						String(foo++),
						{
							'color':'orange',
							'shape':'square',
							'label': String($('#contactname').val())
						});
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
 * Pane Controls
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
			$(this).append('<img src="img/glyphicons/glyphicons_224_chevron-left.png" />');
		}
		else {
			// hide
			pane.animate({'left': '-402px'}, 1000);
			pane.addClass('hidden');
			$(this).empty();
			$(this).append('<img src="img/glyphicons/glyphicons_223_chevron-right.png" />');
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
			$(this).append('<img src="img/glyphicons/glyphicons_223_chevron-right.png" />');
		}
		else {
			// hide
			pane.animate({'right': '-402px'}, 1000);
			pane.addClass('hidden');
			$(this).empty();
			$(this).append('<img src="img/glyphicons/glyphicons_224_chevron-left.png" />');
		}
	});
