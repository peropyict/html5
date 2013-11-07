/****used to resize line-height if name spans two lines in div****/
function resizeHeigthOfRow(classname){
	$("."+classname).each(function(){
		if($(this).height() > 50)
		{
			name = $(this).html();
			$(this).html("");
			$(this).append("<div style='line-height:25px'></div>");
			$(this).children().html(name);
			
		}
	});
}

/*****resize height*****/
function setSizes() {
   //var searchResultContainerHeight = $("#listContainer").height();
   //TODO change fixed values with elements.height()
   
   $("#resultContainers").height($(window).height() - 90 - 50 - 22 - 65);
   $("#popupProfileContainer").height($(window).height() - 40 ); 

   var mainH = $("#popupProfileContainer").height();
   var child1 = $("#popupHeader").height();
   var child2 = $("#profileBottomContainer").height();
   
   $("#customerContainer").height( mainH - child1 - child2);
   
}
$(window).resize(function() { setSizes(); });
/****hash change****/
$(function(){
	$(window).hashchange( function(){
		var hash = location.hash;
		document.title = "Responsive HTML5 / " + hash.substring(1,hash.length);
		//if(hash == "#search"){
		if(hash.indexOf("search") > 0){
			$(".home").css({'display':'none'});
			$(".searchPage").css({'display':'block'});
			
			/*if(hash.indexOf("o=") > 0){
				$("#nameSearch").val(hash.substring(hash.indexOf("o=") + 2, hash.length));
				customerOrganisationSearch();
			}*/
			/*if((jQuery.bbq.getState("o") != undefined) ){
				if((jQuery.bbq.getState("o") != "") ){
					$("#nameSearch").val(jQuery.bbq.getState("o"));
					customerOrganisationSearch();

				}
			}*/
			/*if(jQuery.bbq.getState("stype") != undefined){
				var searchType = jQuery.bbq.getState("stype");
				var searchTerm = jQuery.bbq.getState(searchType);
				
				$('.searchCategoryActive').each(function(){
					$(this).addClass('searchCategoryPasive').removeClass('searchCategoryActive');
					$("."+$(this).attr("id")).addClass('searchFormHiden').removeClass('searchFormVisible');
				});
				$("#nameSearch").val(jQuery.bbq.getState("oname"));
				$("#codeSearch").val(jQuery.bbq.getState("ocode"));
				$("#fnameSearch").val(jQuery.bbq.getState("ifname"));
				$("#postcodeSearch").val(jQuery.bbq.getState("ipost"));
				$("#systemIDSearch").val(jQuery.bbq.getState("sid"));
				
				if(searchType == "o"){
					$("#Organisation").addClass('searchCategoryActive').removeClass('searchCategoryPasive');
					$(".Organisation").addClass('searchFormVisible').removeClass('searchFormHiden');
					//customerOrganisationSearch();
				}
				else if(searchType == "i"){
					$("#Individuals").addClass('searchCategoryActive').removeClass('searchCategoryPasive');
					$(".Individuals").addClass('searchFormVisible').removeClass('searchFormHiden');					
					//customerIndividualSearch();
				}
				else if(searchType == "s"){
					$("#System").addClass('searchCategoryActive').removeClass('searchCategoryPasive');
					$(".System").addClass('searchFormVisible').removeClass('searchFormHiden');					
					//customerSystemSearch();
				}
			}*/
			
		}
		else if (hash == ""){
			$(".home").css({'display':'block'});
			$(".searchPage").css({'display':'none'});
		}

	});
	$(window).hashchange();
});
/*******hash change end********/
/****drag between popups****/
$(function(){
$('#customerContainer').on('mousedown', function(e) {
    $(this).data('p0', { x: e.pageX, y: e.pageY });
}).on('mouseup', function(e) {
    var p0 = $(this).data('p0'),
        p1 = { x: e.pageX, y: e.pageY },
		x = p1.x - p0.x;
		y = p1.y - p0.y;
		if((x > 50) && (x > y))
			$( ".rightPaginationArrow" ).trigger( "click" );
		if((x < -50) && (x > y))
			$( ".leftPaginationArrow" ).trigger( "click" );
});
});
$(document).on('pageinit', function(event){
   $("#customerContainer").swipeleft(function(){
		$( ".leftPaginationArrow" ).trigger( "click" );
	});
	$("#customerContainer").swiperight(function(){
		$( ".rightPaginationArrow" ).trigger( "click" );
	});
});

$(document).on('pageshow', function(event){
	$("#pageloader").hide();
});
/*******loader css*********/
function waitShow(){
	backgroundOpacity('0.5');
	$("#ajaxBusy").css({'top': $(".searchPage").height()/2 - 20 });
	$('#ajaxBusy').css({'display':'block'});
}
function waitHide(){
	$('#ajaxBusy').css({'display':'none'});
	backgroundOpacity('1');
}
function waitExpandShow(){
	backgroundOpacity('0.5');
	$('#ajaxExpandBusy').css({'top': $('.searchPage').height()/2 - 20 });
	$('#ajaxExpandBusy').css({'display':'block'});
	
}
function waitExpandHide(){
	$('#ajaxExpandBusy').css({'display':'none'});
	backgroundOpacity('1');
}
function backgroundOpacity(percent){
	$('body').css({'opacity':percent});	
}
/***loader css end***/

var translationInProgress = false;
$(document).ready(function (e) {

	if(jQuery.browser.mobile)
	{
	   console.log('You are using a mobile device!');
	}
	else
	{
	   console.log('You are not using a mobile device!');
	}
	
	setSizes(); /*important to calculate elements height in order to place footer to the bottom of page*/

	if(jQuery.bbq.getState("stype") != undefined){
				var searchType = jQuery.bbq.getState("stype");
				var searchTerm = jQuery.bbq.getState(searchType);
				
				$('.searchCategoryActive').each(function(){
					$(this).addClass('searchCategoryPasive').removeClass('searchCategoryActive');
					$("."+$(this).attr("id")).addClass('searchFormHiden').removeClass('searchFormVisible');
				});
				$("#nameSearch").val(jQuery.bbq.getState("oname"));
				$("#codeSearch").val(jQuery.bbq.getState("ocode"));
				$("#fnameSearch").val(jQuery.bbq.getState("ifname"));
				$("#postcodeSearch").val(jQuery.bbq.getState("ipost"));
				$("#systemIDSearch").val(jQuery.bbq.getState("sid"));
				
				if(searchType == "o"){
					$("#Organisation").addClass('searchCategoryActive').removeClass('searchCategoryPasive');
					$(".Organisation").addClass('searchFormVisible').removeClass('searchFormHiden');
					customerOrganisationSearch();
				}
				else if(searchType == "i"){
					$("#Individuals").addClass('searchCategoryActive').removeClass('searchCategoryPasive');
					$(".Individuals").addClass('searchFormVisible').removeClass('searchFormHiden');					
					customerIndividualSearch();
				}
				else if(searchType == "s"){
					$("#System").addClass('searchCategoryActive').removeClass('searchCategoryPasive');
					$(".System").addClass('searchFormVisible').removeClass('searchFormHiden');					
					customerSystemSearch();
				}
			}


	
	if(jQuery.bbq.getState("et") != undefined){
				var entityType = jQuery.bbq.getState("et");
				var entityId = jQuery.bbq.getState("eid");
				var searchType = "";
				var searchTerm = "";
				if(jQuery.bbq.getState("o") != ""){
					searchType = "o"; searchTerm = jQuery.bbq.getState("o");
				}
				else if(jQuery.bbq.getState("i") != ""){
					searchType = "i"; searchTerm = jQuery.bbq.getState("i")
				}
				else if(jQuery.bbq.getState("s") != ""){
					searchType = "s"; searchTerm = jQuery.bbq.getState("s")
				}
				fillPopupData(entityType, entityId, searchType, searchTerm);
				//BEFORE TRANSLATION 
				/*$('#popupProfileContainer').fadeIn('slow', function() {$('#popupProfileContainer').css('display','block');});
				$("#searchPageContainer").css({'display':'none'});*/	
				showPopupMain();
	}
	var hash = location.hash;
	if (hash == null || hash=='' || !hash){
		//$("body").css({'overflow':'visible !important'});
		$("body").addClass("visible-overflow");
	}	
	else
	{
	}
	$("#nameSearch, #codeSearch").each(function(){
		$(this).height($("#searchForm").height()-2);
	});
	
	$(".plusResultProfile").on("click", function(e){
		var container = $(this).parents("div#ProfileRowsContainer");

		if($(this).hasClass('plusResult')){
			container.css({'background-image': "url(img/detailsResult40.png)", 'background-repeat':"x" });
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

function showPopup(e){
	if($("#ajaxBusy").css('display') == 'block')//prevent double click
		return;
	//fillPopupData(e);	
	var entityType = e.parent().attr("id");
	var entityId = e.attr("id");
	var searchTerm = $("#nameSearch").val(); 
	var searchType = $("#searchMenuContainer").children("div.searchCategoryActive").attr("id").toLowerCase().substring(0,1);

	
	fillPopupData(entityType, entityId, searchType, searchTerm);
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
	jQuery.bbq.removeState(["et","eid"]);
	emptyPopup();
}
function emptyPopup(){
	$("#popupHeader").remove();
	$("#profileScroolContainer").empty();
	$("#profileRowsContainer").empty();
	$("#customerHierarchyContainer").empty();
	$("#profileBottomContainer").empty();
}
/*function positionOfCompanyTitleInPopup(){
	$("#companyTitle").css({
				position: "absolute",
				top: $("#profile").position().top + $("#profile").height()/10 + "px",
				left: ($("#profile").position().left + 20) + "px"
			}).show();
}*/
function logoClick()
{
	$("#pageloader").show();
	window.location = window.location.pathname;
	$("#pageloader").hide();
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
			container.css({'background-image': "url(img/detailsResult40.png)", 'background-repeat':"x" });
			//container.css({'border-bottom':'3px outset #cfc5a1'});
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
	var googleMapUrl = "https://maps.google.com.au/maps?q=" + elem.next().children("div#addressName").text();
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