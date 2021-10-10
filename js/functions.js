/*
	Project Name : Mice

	## Document Ready
		- Scrolling Navigation
		- Responsive Caret
		- Remove p empty tag for Shortcode
		- Choose Us
		- Members
		- Counter
		- Vehicle Fleet
		- Faq Section

	## Window Load
		- Site Loader
*/

(function($) {

	"use strict"
	
	/* - Contact Map */
	function initialize(obj) {

		var lat = $('#'+obj).attr("data-lat");
        var lng = $('#'+obj).attr("data-lng");
		var contentString = $('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = 'images/marker.png';
		var zoomLevel = parseInt($('#'+obj).attr("data-zoom"),10);
		var styles = [{"featureType":"landscape","stylers":[{"saturation":" "},{"lightness":" "},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":" "},{"lightness":" "},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":" "},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":" "},{"lightness":" "},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":" "},{"lightness":" "},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":" "},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":" "},{"saturation":" "}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":" "},{"saturation":" "}]}]
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});	
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		}
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);
	
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
	
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});      
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});	
	}
	
	/* - Vehicle Fleet */
	function itemflex(verhical_flex) {
		$( "#carousel-"+ verhical_flex ).flexslider({
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			slideshow: false,
			itemWidth: 210,
			itemMargin: 5,
			direction: "vertical", 
			asNavFor: "#slider-"+ verhical_flex
		});
 
		$( "#slider-"+ verhical_flex ).flexslider({
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			slideshow: false,
			sync: "#carousel-1"
		});
	}
	
	/* ## Document Scroll - Window Scroll */
	$( document ).scroll(function()
	{
		var scroll	=	$(window).scrollTop();
		var height	=	$(window).height();

		/*** set sticky menu ***/
		if( scroll >= height )
		{
			$('.ow-navigation').addClass("navbar-fixed-top animated fadeInDown").delay( 2000 ).fadeIn();
		}
		else if ( scroll <= height )
		{
			$('.ow-navigation').removeClass("navbar-fixed-top animated fadeInDown");
		}
		else
		{
			$('.ow-navigation').removeClass("navbar-fixed-top animated fadeInDown");
		} // set sticky menu - end		

		if ($(this).scrollTop() >= 50)
		{
			// If page is scrolled more than 50px
			$('#back-to-top').fadeIn(200);    // Fade in the arrow
		}
		else
		{
			$('#back-to-top').fadeOut(200);   // Else fade out the arrow
		}
	});
	
	/* ## Document Ready - Handler for .ready() called */
	$(document).ready(function($) {

		/* - Scrolling Navigation */
		var scroll	=	$(window).scrollTop();
		var height	=	$(window).height();		
		
		/*** set sticky menu ***/
		if( scroll >= height -500 )
		{
			$('.ow-navigation').addClass("navbar-fixed-top").delay( 2000 ).fadeIn();
		}
		else if ( scroll <= height )
		{
			$('.ow-navigation').removeClass("navbar-fixed-top");
		}
		else
		{
			$('.ow-navigation').removeClass("navbar-fixed-top");
		} // set sticky menu - end
		
		/* local url of page (minus any hash, but including any potential query string) */
		var url = location.href.replace(/#.*/,'');

		/* Find all anchors */
		$('#navbar').find('a[href]').each(function(i,a) {

			var $a = $(a);
			var href = $a.attr('href');

			/* check is anchor href starts with page's URI */
			if ( href.indexOf(url+'#') == 0 ) {

				/* remove URI from href */
				href = href.replace(url,'');

				/* update anchors HREF with new one */
				$a.attr('href',href);
			}
		});

		/* Add Easing Effect on Section Scroll */
		$('.navbar-nav li a[href*=#]:not([href=#]), .site-logo a[href*=#]:not([href=#])').on('click', function() {

			if ( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname ) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

				if (target.length) {

					$('html, body').animate( { scrollTop: target.offset().top - 83 }, 1000, 'easeInOutExpo' );
					return false;
				}
			}
		});

		/* - Responsive Caret */
		$('.ddl-switch').on('click', function() {

			var li = $(this).parent();

			if ( li.hasClass('ddl-active') || li.find('.ddl-active').length !== 0 || li.find('.dropdown-menu').is(':visible') ) {
				li.removeClass('ddl-active');
				li.children().find('.ddl-active').removeClass('ddl-active');
				li.children('.dropdown-menu').slideUp();	
			}
			else {
				li.addClass('ddl-active');
				li.children('.dropdown-menu').slideDown();
			}
		});
		
		/* - Remove p empty tag for Shortcode */
		$( 'p' ).each(function() {
			var $this = $( this );
				if( $this.html().replace(/\s|&nbsp;/g, '').length == 0) {
				$this.remove();
			}
		});
		
		/* - Vehicle Fleet */
		itemflex("2");
		itemflex("1");
		itemflex("3");
		
		$('a[data-toggle="tab"]').on( "click", function() {
			setTimeout(function() {
				$(window).trigger('resize');
			}, 200);
			setTimeout(function() {
				$(window).trigger('resize');
			}, 200)
		});
		
		/* - what-we-do */
		if($(".what-we-do").length){
			$(".what-we-do").each(function ()
			{
				var $this = $(this);
				var myVal = $(this).data("value");

				$this.appear(function()
				{		
					$(".what-we-do .col-md-8").addClass("animated fadeInRight");
				});
			});
		}
		/* - Choose Us */	 	
		if( $(".choose-carousel").length ) {	
			$(".choose-carousel").owlCarousel({
				loop: true,				
				margin: 0,
				dots: false,
				nav:false,				
				autoplay:true,				
				autoplayHoverPause:true,
				responsive:{
					0:{
						items:1
					},
					640:{
						items:2
					},
					992:{
						items:3
					},
					1200:{
						items:3
					}
				}
			});
		}
		
		/* - Members */
		if( $("#member").length ) {	
			$("#member").owlCarousel({
				loop: true,				
				margin:0,
				dots: false,
				nav:false,				
				autoplay:false,
				autoplayHoverPause:true,
				responsive:{
					0:{
						items:1
					},
					768:{
						items:2
					},
					992:{
						items:3
					},
					1201:{
						items:4
					}
				}
			});
		}
		
		/* - Counter */
		$('#counter').each(function () {
			var $this = $(this);
			var myVal = $(this).data("value");
			$this.appear(function() {
				var statistics_item_count = 0;
				var statistics_count = 0;					
				statistics_item_count = $( "[id*='statistics_count-']" ).length;
				for(var i=1; i<=statistics_item_count; i++) {
					statistics_count = $( "[id*='statistics_count-"+i+"']" ).attr( "data-statistics_percent" );
					$("[id*='statistics_count-"+i+"']").animateNumber({ number: statistics_count }, 2000);
				}				
			});
		});
		
		if($(".counter-app").length){
			$(".counter-app").each(function ()
			{
				var $this = $(this);
				var myVal = $(this).data("value");

				$this.appear(function()
				{		
					$(".counter-app .get-mobile").addClass("animated fadeInRight");
				});
			});
		}
			
		/* - Partner carousel */
		if( $(".partner-carousel").length ) {	
			$(".partner-carousel").owlCarousel({
				loop: true,				
				margin: 0,
				dots: false,
				nav:false,				
				autoplay:true,				
				autoplayHoverPause:true,
				responsive:{
					0:{
						items:2
					},
					640:{
						items:3
					},
					992:{
						items:5
					},
					1200:{
						items:6
					}
				}
			});
		}
		
		/* - Faq Section */
		$(".faq-list li a").on("click",function() {
			var href = $(this).attr('href').split('-');
			$( "[id*='faq-']" ).removeClass("active");
			$( "[id='faq-"+href[1]+"']" ).addClass("active");
			$(".faq-list li a").removeClass('active');
			$(this).addClass("active");
		});
		
		$(".faq-list li a,.faq-content > a").on("click",function() {
			if ( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname ) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html, body').animate( { scrollTop: target.offset().top - 160 }, 1000, 'easeInOutExpo' );
					return false;
				}
			}
		});
		
		$('#datepicker').datetimepicker({
			pickTime: false
		});
		
		$("#timepicker").datetimepicker({
			pickDate: false,
			pickTime: true,
			inline: true
		});
		
		/* - Blog */
		if($(".blog").length){
			$(".blog").each(function ()
			{
				var $this = $(this);
				var myVal = $(this).data("value");

				$this.appear(function()
				{		
					$(".blog .col-md-4").addClass("animated fadeInUp");
				});
			});
		}
		
		/* - Contact Map */
		if($("#map-canvas-contact").length==1){
			initialize("map-canvas-contact");
		}
		
		/* - Contact Form */
		$( "#btn_submit" ).on( "click", function(event) {
			event.preventDefault();
			var mydata = $("form").serialize();

			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact.php",
				data: mydata,
				success: function(data) {

				if( data["type"] == "error" ){
					$("#alert-msg").html(data["msg"]);
					$("#alert-msg").removeClass("alert-msg-success");
					$("#alert-msg").addClass("alert-msg-failure");
					$("#alert-msg").show();
				} else {
					$("#alert-msg").html(data["msg"]);
					$("#alert-msg").addClass("alert-msg-success");
					$("#alert-msg").removeClass("alert-msg-failure");     
					$("#input_name").val("");
					$("#input_email").val("");
					$("#input_phone").val("");
					$("#input_subject").val("");
					$("#textarea_message").val("");
					$("#alert-msg").show();    
				}    
				},
				error: function(xhr, textStatus, errorThrown) {
				//alert(textStatus);
				}
			});
			return false;
			$('#contact-form').attr("action", "saveQuery").submit();
		});

		/* Quick Contact Form /- */
		document.addEventListener('DOMContentLoaded', function () {
			document.querySelector('main').className += 'loaded';
		});

	});	/* Document Ready/- */

	/* ## Window Load - Handler for .load() called */
	$(window).load(function() {
		/* - Site Loader */
		if ( !$('html').is('.ie6, .ie7, .ie8') ) {
			$("#site-loader").delay(1000).fadeOut("slow");
		}
		else {
			$("#site-loader").css('display','none');
		}
	});
})(jQuery);