/*
 *
 * Window resizing
 *
 */

window.onresize = function(event) {
	$("#workspace").width($("#graph").width())
	$("#workspace").height($("#graph").height())
}

window.onresize()




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
		'shape':'dot',
		'label':'Test2'
	});
sys.addEdge(testNode, testNode2);

var data = {
	nodes:{
		animals:{'color':'red','shape':'dot','label':'Animals'},
		dog:{'color':'green','shape':'dot','label':'dog'},
		cat:{'color':'blue','shape':'dot','label':'cat'}
	},
	edges:{
		animals:{ dog:{}, cat:{} }
	}
};
sys.graft(data);




/*
 *
 * Buttons
 *
 */

 var foo = 1;

$("#add_event").click(
	function() {
		sys.addNode(
			String(foo++),
			{
				'color':'green',
				'shape':'dot',
				'label':'Boop'
			});
	});

$("#add_contact").click(
	function() {
		sys.addNode(
			String(foo++),
			{
				'color':'orange',
				'shape':'dot',
				'label':'Beep'
			});
	});

// $("#click_me").click(
// 	function() {
// 		new_window = window.open('roomselect.html', 'Select Room', 'height=650,width=650');
// 		if (window.focus) {
// 			new_window.focus();
// 		}
// 	});




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
		var left_pos = pane.offset().left;
		if(left_pos > -400) {
			// hide
			pane.animate({'left': '-402px'}, 1000);
		}
		else {
			// show
			pane.animate({'left': '-2px'}, 1000);
		}
	});

$("#attending_events_button").click(
	function() {
		var pane = $("#attending_events_feed");
		var right_pos = ($(window).width() - (pane.offset().left + pane.outerWidth()));
		if(right_pos > -400) {
			// hide
			pane.animate({'right': '-402px'}, 1000);
		}
		else {
			// show
			pane.animate({'right': '-2px'}, 1000);
		}
	});
