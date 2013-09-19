var translationInProgress = false;
$(document).ready(function (e) {

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
});
function waitShow(){
	$('#ajaxBusy').css({'display':'block'});
}
function waitHide(){
	$('#ajaxBusy').css({'display':'none'});
}
function showPopup(e){
	if($("#ajaxBusy").css('display') == 'block')//prevent double click
		return;
	fillPopupData(e);	
	//BEFORE TRANSLATION 
	/*$('#popupProfileContainer').fadeIn('slow', function() {$('#popupProfileContainer').css('display','block');});
	$("#searchPageContainer").css({'display':'none'});*/	
	showPopupMain();
}
function showPopupOnRowClick(e){
	var container = e.parents("div#container");
	var playElement = container.find("div.playButton");
	showPopup(playElement);
}
function closePopup(){

	$('#searchPageContainer').fadeIn('slow', function() {
		$('#searchPageContainer').css('display','block');		
    });
	$("#popupProfileContainer").css({'display':'none'});	

	emptyPopup();
}
function emptyPopup(){
	$("#popupHeader").remove();
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
function searchPlusExpand(elem,e){
		
		entityId = elem.attr("id");
		entityType = elem.children().attr("id");
		var container = elem.parents("div#container");
				
		if(elem.hasClass('plusResult')){
			//container.css({'background-image': "url(img/selectedResults.png)", 'background-repeat':"x" });
			//container.children("div.main_row").css({'background-image': "url(img/selectedResults.png)", 'background-repeat':"x" }); 
			container.children("div.main_row").css({'background': "#FFCC25" }); 
			container.css({'border-top':'1px solid #d0ab36'});
			container.css({'border-bottom':'3px outset #cfc5a1'});
			elem.css({'background-image':'url(img/minusResult.png)'});
			elem.addClass('minusResult').removeClass('plusResult');
			
			if(container.children("div#subResultContainer").length == 0){
				expandMembersAjax(entityId, entityType)
			}
			else{
				container.children("div#subResultContainer").each(function(e){
					$(this).css({"display": "block" });
				});
				container.children("div#subResultContainer").last().children().css({'border-bottom':'0px'});
			}			
			/****hide bottom1 line****/
			showHideElements($("#bottom1"), false);
			
		}
		else{
			//container.css({'background-image': "none" });
			//container.children("div.main_row").css({'background-image': "none" });
			container.children("div.main_row").css({'background': "none" });
			container.css({'border-top':'0 '});
			container.css({'border-bottom':'0px'});

			elem.css({'background-image':'url(img/plusResult.png)'});
			container.children("div#subResultContainer").each(function(){
				$(this).css({"display": "none" });
			});
			elem.addClass('plusResult').removeClass('minusResult');
			
			/****show bottom1 line****/
			showHideElements($("#bottom1"), true);
			$(".memberCountPlus").each(function(){
				if($(this).hasClass("minusResult"))	showHideElements($("#bottom1"), false); 
				//some of memberCountPlus elements are still opened
			});
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
	window.open(googleMapUrl);
}
/*function showCustomerHierarchy(){
	$('#customerHierarchyContainer').fadeIn('slow', function() {
		$('#customerHierarchyContainer').css('display','block');		
    });
	$("#profileScroolContainer").css({'display':'none'});
	$("#profileRowsContainer").css({'display':'none'});

	prettyPrint(); // call prettyPrint function from prettify.js
}*/	
function showHideCustomerHierarchy(elem){
	//prevent double click
	if(translationInProgress)
		return;
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
	/****OLD CODE****/
	/*$('#profileScroolContainer').fadeIn('slow', function() {
		$('#profileScroolContainer').css('display','block');		
    });
	$('#profileRowsContainer').fadeIn('slow', function() {
		$('#profileRowsContainer').css('display','block');		
    });
	$("#customerHierarchyContainer").css({'display':'none'});
	*/
	/****WIDTH ANIMATION****/
	translationInProgress = true;
	$('#customerProfileContainer').addClass("width-zero-percent");
	$("#customerProfileContainer").css({'display':'block'});
	$('#customerProfileContainer').animate({width:'100%'}, 100, function(){
		$('#customerProfileContainer').removeClass("width-zero-percent");
	});
	$('#customerHierarchyContainer').css({'width':'100%'});
	$("#customerHierarchyContainer").animate({ width: "0%" }, 100, function(){
		$("#customerHierarchyContainer").css({'display':'none'});
		translationInProgress = false;
	});	
	
}
function showCustomerHierarchy(){
	/****OLD CODE****/
	/*$('#customerHierarchyContainer').fadeIn('slow', function() {
		$('#customerHierarchyContainer').css('display','block');		
    });
	$("#profileScroolContainer").css({'display':'none'});
	$("#profileRowsContainer").css({'display':'none'});*/
	/****WIDTH ANIMATION****/
	translationInProgress = true;
	//$(".ui-loader").css({'display':'block'});
	var heightTranslation =$("#customerHierarchyContainer").css('height');

	$('#customerProfileContainer').css({'height':heightTranslation});
	$('#customerProfileContainer').css({'width':'100%'});
	$("#customerProfileContainer").css({'display':'block'});
	$('#customerProfileContainer').animate({width:'0%'}, 200, function(){
		$("#customerProfileContainer").css({'display':'none'});
		$('#customerProfileContainer').css({'height':'auto'});
		translationInProgress = false;
	});
	$("#customerHierarchyContainer").css({ "width": "0%" });
	$("#customerHierarchyContainer").css({'display':'block'});
	$("#customerHierarchyContainer").animate({ width: "100%" }, 200);
	//$(".ui-loader").css({'display':'none'});

}
function showHideElements(elem,show){
	if(show)
		elem.css({'display':'block'});
	else
		elem.css({'display':'none'});	
}