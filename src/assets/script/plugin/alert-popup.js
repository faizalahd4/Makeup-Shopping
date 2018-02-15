/**
* ALTER-POPUP JS FILE - USE TO DISPLAY / HIDE SUCCESS, FAILURE AND INFO ALERT MSG AT THE TOP OF THE WINDOW
* @AUTHOR - FAIZAL
* @DATE - 25/04/2017
**/
$(function(){
	/* NAMING THE PLUGIN */
	$.fn.alertpopup = function (params) {

		/* ASSIGNING THE USER DEFINED PARAMS TO DEFAULT PARAMS */
		var settings = $.extend({msg: "", type: "INFO"}, params);

		/* FADING OUT (REMOVING) ALREADY VISIBLE ALL ALERT MSG POPUP */
		$(".alert").html("").fadeOut();

		/* CHECKING WHETHER ITS SUCCESS OR FAILURE MSG TO APPLY STYLE CASES */
		if (settings.type === "ERROR") {
			/* ADDING ERROR MSG AS HTML TYPE, SHOWING THE ERROR POPUP THEN CLOSING IT AFTER 6 SECOND SLOWLY */
			$(this).html("<b>ERROR!</b>&nbsp;&nbsp;" + settings.msg).fadeIn("slow").delay(6000).fadeOut("slow");	
		} else if (settings.type === "SUCCESS") {
			/* ADDING SUCCESS MSG AS HTML TYPE, SHOWING THE SUCCESS POPUP THEN CLOSING IT AFTER 6 SECOND SLOWLY */
			$(this).html("<b>SUCCESS!</b>&nbsp;&nbsp;" + settings.msg).fadeIn("slow").delay(6000).fadeOut("slow");	
		}
		
		/* RETURNING THE MODIFIED ALERTPOPUP OBJECT */
		return this;
	};
});