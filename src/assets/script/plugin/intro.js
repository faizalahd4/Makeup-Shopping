/**
* PAGE INTRO JS FILE - USE TO SHOW PAGE INTRO POPUP FOR SELECTIVE TAGS
* @AUTHOR - FAIZAL
* @DATE - 25/04/2017
**/
$(function(){
	/* NAMING THE PLUGIN */
	$.fn.intro = function (params) {
		/* ASSIGNING THE USER DEFINED PARAMS TO DEFAULT PARAMS */
		var settings = $.extend({start: 0, currentIndex: 0}, params),
			/* DECLARING LOCAL VARIABLE */
			introList = [],
			introTag = "",
			isPreviousIntroAvailable = false,
			isNextIntroAvailable = false;

			String.prototype.supplant = function (o) {
			      return this.replace(/{([^{}]*)}/g,
			          function (a, b) {
			              var r = o[b];
			              return typeof r === 'string' || typeof r === 'number' ? r : a;
			          }
			      );
			  };
			/**
			* INTRO PLUGIN INIT METHOD
			* @INPUT - NA
			* @RETURN - NA
			**/
			init = function () {
				/* SORTING THE STORED INTRO LIST*/
				sortIntroList();
				/* SHOW FIRST INTRO POPUP */
				showIntroPopup(settings.start);
			},
			/**
			* SHOW INTRO POPUP METHOD
			* @INPUT - CURRENT INDEX
			* @RETURN - NA
			**/
			showIntroPopup = function (index) {
				/* SAVING CURRENT INDEX INTO THE GLOBAL VARIABLE */
				settings.currentIndex = index;
				/* CLOSING ALL INTRO POPUP */
				$(".intro-popup").fadeOut("fast");
				/* FINDING WHETHER PREVIOUS INTRO POPUP AVAILABLE OR NOT BY CHECKING WHETHER CURRENT INDEX IS 0 */
				isPreviousIntroAvailable = (index == 0) ? false : true;
				/* FINDING WHETHER NEXT INTRO POPUP AVAILABLE OR NOT BY CHECKING WHETHER CURRENT INDEX IS EQUAL TO TOTAL INTRO ITEM IN THE INTRO LIST */
				isNextIntroAvailable = (index == (introList.length - 1)) ? false : true;
				/* GENERATING INTRO POPUP USING CURRENT INDEX */
				introTag = generateTag(index);
				/* APPENDING CURRENT INDEX INTRO POP TAG INTO DOM AND SHOWING IT */
				$(introList[index].introObj).append(introTag).hide().fadeIn();
				/* MAKING CURRENT INTO TAGS ACTIVE BY OVERLAYING THE LOADER SCREEN */
				showCurrentTag();
			},
			/**
			* MAKING CURRENT INTO TAGS ACTIVE BY OVERLAYING THE LOADER SCREEN
			* @INPUT - NA
			* @RETURN - NA
			**/
			showCurrentTag = function () {
				/* CHECKING WHETHER PREVIOUS INTRO POPUP AVAILABLE OR NOT */
				if (isPreviousIntroAvailable) {
					/* APPLYING ACTIVE CLASS ON CURRENT TAG */
					$(introList[settings.currentIndex - 1].introObj).removeClass("intro-tag-visible");
				}
				/* CHECKING WHETHER NEXT INTRO POPUP AVAILABLE OR NOT */
				if (isNextIntroAvailable) {
					/* APPLYING ACTIVE CLASS ON CURRENT TAG */
					$(introList[settings.currentIndex + 1].introObj).removeClass("intro-tag-visible");
				}
				/* ADDING ACTIVE CLASS TO SHOW ABOVE LOADER SCREEN */
				$(introList[settings.currentIndex].introObj).addClass("intro-tag-visible");
			},
			/**
			* CLOSING THE INTRO SCREEN AND FADING LOADER SCREEN WHEN USER CLOSE THE POPUP
			* @INPUT - NA
			* @RETURN - NA
			**/
			closeIntro = function () {
				/* CLOSING ALL INTRO POPUP */
				$(".intro-popup").fadeOut("fast");
				/* REMOVING ALL ACTIVE CLASS FROM INTRO POP AND INPUT TAGS */
				$(".intro-tag-visible").each(function (){
					$(this).removeClass("intro-tag-visible");
				});
				/* REMOVING LOADER FROM SCREEN */
				$("#loader").fadeOut();
				//$("#loader").removeClass("loader");
			},
			/**
			* FINDING THE POSITION TO PLACE THE INTRO POPUP
			* @INPUT - NA
			* @RETURN - NA
			**/
			positionTag = function () {
				var offsetLeft = $(introList[settings.currentIndex].introObj).offset().left,
					offsetRight = ($(window).width()) - ($(introList[settings.currentIndex].introObj).offset().left + $(introList[settings.currentIndex].introObj).width()),
					offsetTop = $(introList[settings.currentIndex].introObj).offset().top,
					offsetBottom = ($(window).height()) - ($(introList[settings.currentIndex].introObj).offset().top + $(introList[settings.currentIndex].introObj).height());
			},
			/**
			* GENERATING INTRO POPUP USING CURRENT INDEX
			* @INPUT - INDEX
			* @RETURN - NA
			**/
			generateTag = function (index) {
				/* GETTING SLIDER BAR HTML TEMPLATE FROM SCRIPT TAG */
				var introTag = $("#intro-html-template").text();
				/* CALLING SUPPLANT WITH OBJECTS TO GENERATE HTML TAGS WITH KEY & VALUE PAIR */
				introTag = introTag.supplant(generateSupplantObject(index));

				/* CHECKING WHETHER PREVIOUS INTRO POPUP AVAILABLE OR NOT, TO ADD PREVIOUS BUTTON */
				if (!isPreviousIntroAvailable) {
					/* CONVERTING STRING INTO HTML */
					introTag = $(introTag);
					/* PREVIOUS BUTTON REMOVED FROM THE PREVIOUS INTRO POPUP */
					introTag.find("#previous-intro-popup-btn").remove();
				}
				/* CHECKING WHETHER NEXT INTRO POPUP AVAILABLE OR NOT, TO ADD NEXT BUTTON */
				if (!isNextIntroAvailable) {
					/* CONVERTING STRING INTO HTML */
					introTag = $(introTag);
					/* NEXT BUTTON REMOVED FROM THE NEXT INTRO POPUP */
					introTag.find("#next-intro-popup-btn").remove();
				}
				/* RETURNING THE GENERATED INTRO POP TAGS */
				return introTag;
			},
			/**
			* GENERATE OBJECT
			* @INPUT - OBJ
			* @RETURN - INTRO OBJECT
			**/
			generateSupplantObject = function (index) {
				var introObj = {content: introList[index].content,
				        	previousIndex: (settings.currentIndex - 1),
				        	nextIndex: (settings.currentIndex + 1)};
				return introObj;
			},
			/**
			* NEXT AND PREVIOUS BUTTON OPERATION
			* @INPUT - NA
			* @RETURN - NA
			**/
			nextPreviousHandler = function () {
				/* CALLLING SHOW INTRO POPUP METHOD BY PASSING INDEX TO SHOW */
				showIntroPopup($(this).data("step"));
			},
			/**
			* SORTING INTRO DETAILS LIST
			* @INPUT - NA
			* @RETURN - NA
			**/
			sortIntroList = function () {
				/* LOOPING AND SORTING THE INTRO DETAILS LIST ACCORDING TO THE STPES PROPERTY */
				introList.sort(function(a, b) {
    				return parseFloat(a.step) - parseFloat(b.step);
				});
			};
			/* FINDING ALL INTRO TAGS BY FINDING CLASSNAME WITH 'INTRO' */
			this.each( function() {
				/* LOOPING EACH OBJECT AND PUSHING INTO NEW LIST (ITS UNORDERED LIST) */
				introList.push({introObj: this, step: $(this).data("step"), content: $(this).data("intro")});
		    });
		    /* CALLING INIT METHOD, WHEN PAGE GET LOADED FIRST */
		    init();

		/* RETURNING THE INTRO THIS OBJECT AFTER MODIFICATION */
		return this.each(function () {

			/* CALLING NEXT PREVIOUS HANDLER METHOD WHEN USER CLICK NEXT OR PREVIOUS BUTTON */
			$(document).on("click", ".intro-btn" , nextPreviousHandler);

			/* CALLING CLOSE INTRO METHOD WHEN USER CLICK CLOSE ICON ON INTRO POPUP */
			$(document).on("click", ".intro-popup-close" , closeIntro);
		});
	};
});