/*
 *
 * Window resizing
 *
 */

window.onresize = function(event) {
	$("#workspace").width($("#content").width())
	$("#workspace").height($("#content").height())
}

window.onresize()




/*
 *
 * Initiate arborjs
 *
 */

// var sys = arbor.ParticleSystem(
// 	{
// 		friction:.5, //default .5
// 		stiffness:600, //default 600
// 		repulsion:1000, //default 1000
// 		gravity:false, //default false
// 		precision:0.6, //default 0.6
// 		fps:55, //default 55
// 		dt:0.02 //timestep, default 0.02
// 	});

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

$("#click_me").click(
	function() {
		new_window = window.open('roomselect.html', 'Select Room', 'height=650,width=650');
		if (window.focus) {
			new_window.focus();
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
