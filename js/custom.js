
$(document).ready(function (e) {
 
  
	$("#conatainerr").css({'width':$(window).width()});
	$("#nameSearch, #codeSearch").each(function(){
		$(this).height($("#searchForm").height()-2);
	});
	
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


	$(".openPopupBtn").hover(function () {
		$(this).css({'width':'98%'});
	},function(){
		$(this).css({'width':'100%'});
	});
	$("#closePopup").on("click", function(){
		closePopup();

	});
	
	/******** "GO" keypress event start********/
	$("#organisationSearchForm").on("keypress", function(e){	
		if(e.which === 13) {
			customerOrganisationSearch();
		}
	});
	$("#individualSearchForm").on("keypress", function(e){	
		if(e.which === 13) {
			customerIndividualSearch();
		}
	});
	$("#SystemSearchForm").on("keypress", function(e){	
		if(e.which === 13) {
			customerSystemSearch();
		}
	});
	/******** "GO" keypress event end********/
	
	/***validation stuff - remove warnings - start***/
	$("#nameSearch").on("keydown", function(){
		$("#nameSearch").parent().removeClass("has-error");
	});
	$("#fnameSearch, #gnameSearch, #postcodeSearch").on("keydown", function(){
		$("#individualSearchForm").children().each(function(){
			$(this).removeClass("has-error");
		});
	});	
	$("#systemTypeSearch, #systemIdSearch").on("keydown", function(){
		$("#SystemSearchForm").children().each(function(){
			$(this).removeClass("has-error");
		});
	});
	/***validation stuff - remove warnings - end***/
	
	
});
function showPopup(e){

	fillPopupData(e);
	
	 $('#popupProfileContainer').fadeIn('slow', function() {
		$('#popupProfileContainer').css('display','block');
    });
	$("#searchPageContainer").css({'display':'none'});
	
	showPopupMain();
}
function closePopup(){

	$('#searchPageContainer').fadeIn('slow', function() {
		$('#searchPageContainer').css('display','block');		
    });
	$("#popupProfileContainer").css({'display':'none'});	

	emptyPopup();
}
function emptyPopup(){
	$("#popupHeader").empty();
	$("#profileScroolContainer").empty();
	$("#profileRowsContainer").empty();
	$("#customerHierarchyContainer").empty();
	$("#profileBottomContainer").empty();
}
function positionOfCompanyTitleInPopup(){
	$("#companyTitle").css({
				position: "absolute",
				top: $("#profile").position().top + $("#profile").height()/10 + "px",
				left: ($("#profile").position().left + 20) + "px"
			}).show();
}
function searchPlusExpand(elem){
	
		var container = elem.parents("div#container");
				
		if(elem.hasClass('plusResult')){
			container.css({'background-image': "url(img/selectedResults.png)", 'background-repeat':"x" });
			container.css({'border-top':'1px solid #d0ab36'});
			container.css({'border-bottom':'3px outset #cfc5a1'});
			elem.css({'background-image':'url(img/minusResult.png)'});

			container.children("div#subResultContainer").each(function(e){
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
function showCustomerHierarchy(){
	$('#customerHierarchyContainer').fadeIn('slow', function() {
		$('#customerHierarchyContainer').css('display','block');		
    });
	$("#profileScroolContainer").css({'display':'none'});
	$("#profileRowsContainer").css({'display':'none'});

	prettyPrint(); // call prettyPrint function from prettify.js
}	
function showHideCustomerHierarchy(elem){

	if(elem.hasClass("rightPaginationArrow"))
		if($("#popupNav2").hasClass("bluePagination"))
			return;
		else{
			showCustomerHierarchy();
			changePopupNavigationClass($("#popupNav2"));
		}
	else if(elem.hasClass("leftPaginationArrow"))
		if($("#popupNav1").hasClass("bluePagination"))
			return;
		else{
			showPopupMain();
			changePopupNavigationClass($("#popupNav1"));
		}
			
	else{
		if(elem.hasClass("bluePagination"))
			return;
		else{ 
			if(elem.attr("id") == "popupNav1")
				showPopupMain();
			else if(elem.attr("id") == "popupNav2")
				showCustomerHierarchy();
		}
		changePopupNavigationClass(elem);
	}

}
function changePopupNavigationClass(elem){
	$(".popupPagination").each(function(){
		$(this).addClass('grayPagination').removeClass('bluePagination');
	});
	elem.addClass('bluePagination').removeClass('grayPagination');
}
function showPopupMain(){
	$('#profileScroolContainer').fadeIn('slow', function() {
		$('#profileScroolContainer').css('display','block');		
    });
	$('#profileRowsContainer').fadeIn('slow', function() {
		$('#profileRowsContainer').css('display','block');		
    });
	$("#customerHierarchyContainer").css({'display':'none'});
}
function showCustomerHierarchy(){
	$('#customerHierarchyContainer').fadeIn('slow', function() {
		$('#customerHierarchyContainer').css('display','block');		
    });
	$("#profileScroolContainer").css({'display':'none'});
	$("#profileRowsContainer").css({'display':'none'});
}	