
function raise_message(message) {
	$(".message").removeClass("error_text");
	$(".cancel_message_button").removeClass("error_text");
	$(".message_box").removeClass("error_box");

	$(".message").html(message);
	$(".message_box").show();
}

function raise_error_message(message) {
	$(".message").addClass("error_text");
	$(".cancel_message_button").addClass("error_text");
	$(".message_box").addClass("error_box");
	
	$(".message").html(message);
	$(".message_box").show();
}

$(".cancel_message_button").click(
	function() {
		$(".message_box").each(
			function() {
				$(this).hide();
			});
	});

$("#signin").click(
	function() {
		$("signin_form").submit();
	});

$("#register").click(
	function() {
		$("register_form").submit();
	});

$("#send_new_password").click(
	function() {
		var email = String($("#email").val());

		document.location.href = "index.html";
	});

$("#submit_settings").click(
	function() {
		var new_email = String($("#email").val());
		var new_username = String($("#username").val());
		var new_password = String($("#password").val());
		var old_password = String($("#old_password").val());

		document.location.href = "workspace.html";
	});
