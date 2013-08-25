

$(document).ready(function (e) {

	$("#nameSearch, #codeSearch").each(function(){
		$(this).height($("#searchForm").height()-2);
	});
	/*****************icon based solution*******************/
	/*
	$("#plusButton").on("click", function(e){
		var container = $(this).parents("div#container");

		if($(this).children().hasClass('icon-plus-circled')){
			container.css({'background-image': "url(img/selectedResults.png)", 'background-repeat':"x" });
			container.css({'border-bottom':'3px outset #cfc5a1'});
			$(this).children().addClass('icon-minus-circled').removeClass('icon-plus-circled');
			container.children("div#subResultContainer").each(function(){
				$(this).css({"display": "block" });
			});
			container.children("div#subResultContainer").last().children().css({'border-bottom':'0px'});

			
		}
		else{
			container.css({'background-image': "none" });
			container.css({'border-bottom':'0px'});
			$(this).children().addClass('icon-plus-circled').removeClass('icon-minus-circled');
			container.children("div#subResultContainer").each(function(){
				$(this).css({"display": "none" });
			});
		}

	});
	*/
	$("#plusResult").on("click", function(e){

		var container = $(this).parents("div#container");

		if($(this).hasClass('plusResult')){
			container.css({'background-image': "url(img/selectedResults.png)", 'background-repeat':"x" });
			container.css({'border-bottom':'3px outset #cfc5a1'});
			$(this).css({'background-image':'url(img/minusResult.png)'});
			container.children("div#subResultContainer").each(function(){
				$(this).css({"display": "block" });
			});
			container.children("div#subResultContainer").last().children().css({'border-bottom':'0px'});
			$(this).addClass('minusResult').removeClass('plusResult');
			console.log("2");
		}
		else{
			container.css({'background-image': "none" });
			container.css({'border-bottom':'0px'});

			$(this).css({'background-image':'url(img/plusResult.png)'});
			container.children("div#subResultContainer").each(function(){
				$(this).css({"display": "none" });
			});
			$(this).addClass('plusResult').removeClass('minusResult');
			console.log("3");
		}

	});
	
		$("#plusResultProfile").on("click", function(e){
		
		var container = $(this).parents("div#container");

		if($(this).hasClass('plusResult')){
			container.css({'background-image': "url(img/detailsResult.png)", 'background-repeat':"x" });
			container.css({'border-bottom':'3px outset #cfc5a1'});
			$(this).css({'background-image':'url(img/profileMinusPic.png)'});

			container.children("div#subResultContainer").each(function(){
				$(this).css({"display": "block" });
			});
			container.children("div#subResultContainer").last().children().css({'border-bottom':'0px'});
			$(this).addClass('minusResult').removeClass('plusResult');
			
		}
		else{
			container.css({'background-image': "none" });
			container.css({'border-bottom':'0px'});

			$(this).css({'background-image':'url(img/plusResult.png)'});
			container.children("div#subResultContainer").each(function(){
				$(this).css({"display": "none" });
			});
			$(this).addClass('plusResult').removeClass('minusResult');
		}

	});
	
	
	
	
	$("#resultContainer").children().each(function(){
		$(this).height($("#resultContainer").height());
	});
	
	$("#searchMenuContainer").children().each(function(){
		$(this).height($("#searchMenuContainer").height());
	});
	
	
	$("#searchMenuContainer div").on("click", function(e){


		if($(this).hasClass('searchCategoryPasive'))
		{
			$('.searchCategoryActive').each(function(){
				$(this).addClass('searchCategoryPasive').removeClass('searchCategoryActive');
			});
			$(this).addClass('searchCategoryActive').removeClass('searchCategoryPasive');
		}
		
		
	});
	/* On resize window, for testing only: align title with background img. Various device and screen resolution */
	$(window).resize(function() {

		$("#prati").css({
			position: "absolute",
			top: $("#profile").position().top + $("#profile").height()/10 + "px",
			left: ($("#profile").position().left + 20) + "px"
		}).show();
		
		$("#closeImg").css({
			position: "absolute",
				top: $("#profile").position().top,
				right: "0px"
			}).show();

	});


	$("#profile").load(function(){ //align head title with background img onload     
		$("#prati").css({
				position: "absolute",
				top: $("#profile").position().top + $("#profile").height()/10 + "px",
				left: ($("#profile").position().left + 20) + "px"
			}).show();
    }) ;
	/*Profile close image implementation?
	$("#closeImg").css({
		position: "absolute",
			top: $("#profile").position().top,
			right: "0px"
		}).show();
	*/
	$("#closeImg").on("click", function(){
		alert("close button clicked");
	});
	
	$(".playButton").on("click", function(){
		setTimeout("window.location.href='profile.html';",500);
		window.location.href='profile.html';
	});
	$(".playButton").hover(function () {
		$(this).css({'width':'90%'});
	},function(){
		$(this).css({'width':'100%'});
	});


});
	