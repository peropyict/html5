
$(document).ready(function (e) {

	$("#mapPointerImg").on("click", function(){
		//console.log("go to specified location on google maps");
		
	});
	$("#conatainerr").css({'width':$(window).width()});
	$("#nameSearch, #codeSearch").each(function(){
		$(this).height($("#searchForm").height()-2);
	});
	/*$(".plusResult").on("click", function(e){ 
	//change this into .plusResult, then remove/change class named plusResult in popupProfileContainer. review code bellow 
		console.log("1");
		var container = $(this).parents("div#container");

		if($(this).hasClass('plusResult')){
			container.css({'background-image': "url(img/selectedResults.png)", 'background-repeat':"x" });
			container.css({'border-top':'1px solid #d0ab36'});
			container.css({'border-bottom':'3px outset #cfc5a1'});
			$(this).css({'background-image':'url(img/minusResult.png)'});
			container.children("div#subResultContainer").each(function(){
				$(this).css({"display": "block" });
			});
			container.children("div#subResultContainer").last().children().css({'border-bottom':'0px'});
			$(this).addClass('minusResult').removeClass('plusResult');
		}
		else{
			container.css({'background-image': "none" });
			container.css({'border-top':'0 '});
			container.css({'border-bottom':'0px'});

			$(this).css({'background-image':'url(img/plusResult.png)'});
			container.children("div#subResultContainer").each(function(){
				$(this).css({"display": "none" });
			});
			$(this).addClass('plusResult').removeClass('minusResult');
		}

	});*/
	
	$(".plusResultProfile").on("click", function(e){
		var container = $(this).parents("div#ProfileRowsContainer");

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
				$("."+$(this).attr("id")).addClass('searchFormHiden').removeClass('searchFormVisible');
			});
			$(this).addClass('searchCategoryActive').removeClass('searchCategoryPasive');
			$("."+$(this).attr("id")).addClass('searchFormVisible').removeClass('searchFormHiden');
		}
		
		
	});


	$("#closeImg").on("click", function(){
		alert("close button clicked");
	});
	
	$(".openPopupBtn").on("click", function(e){
		console.log(e);
		//showPopup(e);
	});
	$(".openPopupBtn").hover(function () {
		$(this).css({'width':'98%'});
	},function(){
		$(this).css({'width':'100%'});
	});
	$("#closePopup").on("click", function(){
		closePopup();

	});
	
	$("#searchBtn").on("click", function(){
		customerSearch();
	});
	

});
function showPopup(e){
	//console.log(e);
	fillPopupData(e);
	 $('#popupProfileContainer').fadeIn('slow', function() {
		$('#popupProfileContainer').css('display','block');
    });
	$("#searchPageContainer").css({'display':'none'});
}
function closePopup(){

	$('#searchPageContainer').fadeIn('slow', function() {
		$('#searchPageContainer').css('display','block');		
    });
	$("#popupProfileContainer").css({'display':'none'});
	
	$("#popupProfileContainer").empty();
}


function positionOfCompanyTitleInPopup(){
	$("#companyTitle").css({
				position: "absolute",
				top: $("#profile").position().top + $("#profile").height()/10 + "px",
				left: ($("#profile").position().left + 20) + "px"
			}).show();
}

function searchPlusExpand(elem){

		/*change this into .plusResult, then remove/change class named plusResult in popupProfileContainer. review code bellow */
	
		var container = elem.parents("div#container");
		
		
		if(elem.hasClass('plusResult')){
			console.log("hasClass +");
			container.css({'background-image': "url(img/selectedResults.png)", 'background-repeat':"x" });
			container.css({'border-top':'1px solid #d0ab36'});
			container.css({'border-bottom':'3px outset #cfc5a1'});
			elem.css({'background-image':'url(img/minusResult.png)'});
			console.log(container.children("div#subResultContainer"));
			container.children("div#subResultContainer").each(function(e){
				//console.log("tttttttt" + e);
				$(this).css({"display": "block" });
				$(this).addClass('test');
			});
			container.children("div#subResultContainer").last().children().css({'border-bottom':'0px'});
			elem.addClass('minusResult').removeClass('plusResult');
		}
		else{
			container.css({'background-image': "none" });
			container.css({'border-top':'0 '});
			container.css({'border-bottom':'0px'});

			elem.css({'background-image':'url(img/plusResult.png)'});
			container.children("div#subResultContainer").each(function(){
				$(this).css({"display": "none" });
			});
			elem.addClass('plusResult').removeClass('minusResult');
		}

}

function COPlusExpand(elem){
	
		var container = elem.parents("div.ProfileRowsContainer");

		if(elem.hasClass('plusResult')){

			container.css({'background-image': "url(img/detailsResult.png)", 'background-repeat':"x" });
			container.css({'border-bottom':'3px outset #cfc5a1'});
			elem.css({'background-image':'url(img/profileMinusPic.png)'});

			container.children("div#subResultContainer").each(function(){
				$(this).css({"display": "block" });
			});
			container.children("div#subResultContainer").last().children().css({'border-bottom':'0px'});
			elem.addClass('minusResult').removeClass('plusResult');
			
		}
		else{
			container.css({'background-image': "none" });
			container.css({'border-bottom':'0px'});

			elem.css({'background-image':'url(img/plusResult.png)'});
			container.children("div#subResultContainer").each(function(){
				$(this).css({"display": "none" });
			});
			elem.addClass('plusResult').removeClass('minusResult');
		}

	
}
function gotoAddress(elem){
	var googleMapUrl = "https://maps.google.com.au/maps?q=" + elem.next().text();
	console.log(elem.next().text());
	window.open(googleMapUrl);
}
	