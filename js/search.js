APIURL = "http://gcs.ventiv.com.au/gcs/v1/";
var profile_scrollbar_width = 0;
function customerOrganisationSearch(){
	/**empty previous results**/
	
	$("#resultContainers").empty();
	$("#noOfSearchResult").empty();	
	/**get input values**/
	var orgName = $("#nameSearch").val();
	var orgLocation = $("#codeSearch").val();
	/**validation commented**/
	/*if(orgName == ""){
		$("#nameSearch").parent().addClass("has-error");
		$("#nameSearch").focus();
		return;
	}*/
	/**Ajax request**/
	waitShow();
	//$.mobile.loading( "show", {text: "",textVisible: false,theme: "a",html: ""});
	$.ajax({
        type:"POST",
        url: APIURL + "customersearch.jsonp" + '?callback=?',
		//jsonpCallback: "customersearchCallback",
        data: { "orgName": orgName, "orgLocation": orgLocation},
        //contentType:"application/json",
        beforeSend: function(jqXHR) {
            jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType:"jsonp",
		success: function (json){
			customersearchCallback(json);
			waitHide();
		}
    });	
}
function customerIndividualSearch(){
	/**empty previous results**/
	$("#resultContainers").empty();
	$("#noOfSearchResult").empty();	
	/**get input values**/
	var individualName = $("#fnameSearch").val();
	var individualLocation = $("#postcodeSearch").val();
	/**validation commented**/
	/*if((individualFamilyName == "") && (individualGivenName == "") && (individualLocation == "")){
		$("#individualSearchForm").children().each(function(){
			if($(this).hasClass("form-group"))
				$(this).addClass("has-error");
		});
		$("#fnameSearch").focus();
		return;
	}*/	
	/**Ajax request**/
	waitShow();
	$.mobile.loading( "show", {text: "",textVisible: false,theme: "a",html: ""});
	$.ajax({
        type:"POST",
        url: APIURL + "customersearch.jsonp" + '?callback=?',
		//jsonpCallback: "customersearchCallback",
        data: { "individualName": individualName, "individualLocation": individualLocation},
        contentType:"application/json",
        beforeSend: function(jqXHR) {
            jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType:"jsonp",
		success: function (json){
			customersearchCallback(json);
			waitHide();
		}
    });	
}
function customerSystemSearch(){
	/**empty previous results**/
	$("#resultContainers").empty();
	$("#noOfSearchResult").empty();	
	/**get input values**/
	//var systemType = $("#systemTypeSearch").val();
	var systemId = $("#systemIDSearch").val();
	/**validation commented**/
	/*if((systemType == "") && (systemId == "")){
		$("#SystemSearchForm").children().each(function(){
			if($(this).hasClass("form-group"))
				$(this).addClass("has-error");
		});
		$("#systemTypeSearch").focus();
		return;
	}*/
	/**Ajax request**/
	waitShow();
	$.mobile.loading( "show", {text: "",textVisible: false,theme: "a",html: ""});
	$.ajax({
        type:"POST",
        url: APIURL + "customersearch.jsonp" + '?callback=?',
		//jsonpCallback: "customersearchCallback",
        data: { "systemId": systemId},
        contentType:"application/json",
        beforeSend: function(jqXHR) {
            jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType:"jsonp",
		success: function (json){
			customersearchCallback(json);
			waitHide();
		}
    });	
}
function customersearchCallback(json){

	/**************remove validation warnings commented********************/
	/*$(".has-error").each(function(){
		$(this).removeClass("has-error");
	});
	$(this).removeClass("has-error");*/
	/***show both bottom lines on search page***/
	showHideElements($("#bottom1"), true);
	showHideElements($("#bottom2"), true);

	if(json.success == true){
        for(var i=0; i < json.results.length; i++){
			writeCustomerSearchResults(json.results[i]);
		}
		/*if SCROLLBAR_WIDTH > 0 then adjust elements in main search result row and subrow*/
		adjustSearchResultMainRowElementsWidth(window.SCROLLBAR_WIDTH);
		if(json.results.length > 0)
			totalResultsNumber = "1 - " + json.results.length +" Results Found";
		else
			totalResultsNumber = "No results found";
		$("#noOfSearchResult").append(totalResultsNumber);
    }
	$(".customerResultName").each(function(){
		var resultname = $(this).html();
		var newresultName = resultname;
		var orgSearchedName = $("#nameSearch").val();

		if (resultname.indexOf(orgSearchedName) >= 0){
			newresultname = resultname.substring(0, resultname.indexOf(orgSearchedName))+ "<strong>" + orgSearchedName + "</strong>" + resultname.substring(resultname.indexOf(orgSearchedName) + orgSearchedName.length, resultname.length);
		
			$(this).html(newresultname);
		}
		else if (resultname.indexOf(orgSearchedName.toUpperCase()) >= 0){
			newresultname = resultname.substring(0, resultname.indexOf(orgSearchedName.toUpperCase()))+ "<strong>" + orgSearchedName.toUpperCase() + "</strong>" + resultname.substring(resultname.indexOf(orgSearchedName.toUpperCase()) + orgSearchedName.length, resultname.length);
		
			$(this).html(newresultname);
		}		
	});
	
}
function writeCustomerSearchResults(node){
	var output = $('#CustomerSearchResultsTemplate').parseTemplate(node);
    $("#resultContainers").append(output);	
	window.SCROLLBAR_WIDTH = $("#searchPageContainer").width() - $("#container").width();	
}
/*** TODO detecting scroll event ***/
function adjustSearchResultMainRowElementsWidth(scrollWidth){
	$(".mainSearchRowResultPart1").each(function(){	
		//$(this).css({'width':'calc('+(900*100)/(1024-scrollWidth)+'%)'});	
		var width1 = $("#searchMenuContainer").width() - $(".searchButton").width();		
		//$(this).css({'width':'calc('+((width1)*100)/($("#searchMenuContainer").width() - scrollWidth)+'%)'});		 
		$(this).css({'width':'calc('+(((width1 + scrollWidth)*100)/($("#searchMenuContainer").width())) -(((scrollWidth)*100)/$("#searchMenuContainer").width())+'%)'});
	});
	$(".mainSearchRowResultPart2").each(function(){	
		//$(this).css({'width':'calc('+((124-scrollWidth)*100)/(1024)+'%)'});
		var width2 = $("#searchMenuContainer").width() - $(".mainSearchRowResultPart1").width() - scrollWidth;
		//$(this).css({'width':'calc('+((width2)*100)/($("#searchMenuContainer").width())+'%)'});
		var width2 = 100
		$(this).css({'width':'calc('+ (98-($(".mainSearchRowResultPart1").width() * 100/$("#searchMenuContainer").width())) + '%)'});
		
	});
}

function adjustSearchResultExpandedRowElementsWidth(scrollWidth){
	$(".expandedSearchRowResultPart1").each(function(){
		//$(this).css({'width':'calc('+(900*100)/(1024-scrollWidth)+'%)'});
		var width1 = $("#searchMenuContainer").width() - $(".searchButton").width(); 		
		$(this).css({'width':'calc('+((width1)*100)/($("#searchMenuContainer").width() - scrollWidth)+'%)'});
	});
	$(".expandedSearchRowResultPart2").each(function(){
		//$(this).css({'width':'calc('+((1024-scrollWidth - $(".mainSearchRowResultPart1").width())*100)/1024+'%)'});
		var width2 = $("#searchMenuContainer").width() - $(".mainSearchRowResultPart1").width() - scrollWidth;
		$(this).css({'width':'calc('+((width2)*100)/($("#searchMenuContainer").width())+'%)'});
	});
}
function expandMembersAjax(entityId, entityType){

	waitShow();
	$.mobile.loading( "show", {text: "",textVisible: false,theme: "a",html: ""});
	$.ajax({
        type:"GET",
        url: APIURL + "expandcustomermembers.jsonp" + '?callback=?',
        data: { "entityType": entityType, "entityId": entityId},
        contentType:"application/json",
        beforeSend: function(jqXHR) {
            jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType:"jsonp",
		helperData: {entityId: entityId, entityType: entityType},
		success: function (json, idtype){	

			if(json.success == true){
				for(var i=0; i < json.results.length - 1; i++){
					writexpandMembersResults(json.results[i], this.helperData.entityId, false);					
				}
				writexpandMembersResults(json.results[json.results.length - 1], this.helperData.entityId, true);
				waitHide();
				adjustSearchResultExpandedRowElementsWidth(window.SCROLLBAR_WIDTH);
			}
		}
    });
	
}
function writexpandMembersResults(node, entityId, lastRow){
	var container = $("#"+entityId).parents("div#container");
	var output = ""
	if(!lastRow)
		output = $('#CustomerSearchResultsExpandMembersTemplate').parseTemplate(node);
	else
		output = $('#CustomerSearchResultsExpandMembersTemplateLastRow').parseTemplate(node);
	container.append(output);
	container.children("div#subResultContainer").each(function(e){
				$(this).css({"display": "block" });
				$(this).addClass('test');
	});
	container.children("div#subResultContainer").last().children().css({'border-bottom':'0px'});
}
function fillPopupData(element)
{
	var entityType = element.parent().attr("id");
	var entityId = element.attr("id");
	waitShow();
	$.mobile.loading( "show", {text: "",textVisible: false,theme: "a",html: ""});
	$.ajax({
        type:"GET",
        url: APIURL + "customerdetails.jsonp" + '?callback=?',
        data: { "entityType": entityType, "entityId": entityId},
        contentType:"application/json",
        beforeSend: function(jqXHR) {
            jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType:"jsonp",
		success: function (json, idtype){	
			if(json.success == true){
				writeCustomerOverview(json, entityType, entityId);
				waitHide();
				$('#popupProfileContainer').css('display','block');
				$('#searchPageContainer').css({'height':'auto'});
				$( "#searchPageContainer").animate({ height: "0px" }, 100, function(){
					$("#searchPageContainer").css({'display':'none'});
					$("#searchPageContainer").css({'height':'auto'});
				});	
			}
		}
    });	
}
function writeCustomerOverview(json, entityType, entityId){
	writeCustomerOverviewHeader(json, entityId);
	writeCustomerOverviewSumary(json, entityId);
	writeCustomerOverviewRows(json, entityId, entityType);
	//CustomerOverviewMemberDetails(entityType);
	writeCustomerHierarchy(json, entityType, entityId);
	writeCustomerOverviewBottom(json, entityId);
	
}
function writeCustomerOverviewHeader(node, entityId){
	var output = $('#popupHeaderTemplate').parseTemplate(node);
    $("#popupProfileContainer").prepend(output);
}
function writeCustomerOverviewSumary(node, entityId){	
	var output = $('#popupSumaryTemplate').parseTemplate(node);
	$("#profileScroolContainer").append(output);

	/**Rules for vertical highlight for Entity boxes START**/
	if(node.entity.upstreamEntities.length > 0)
		$(".upstreamEntitiesContent").css({"background-image":"url('img/profileCol3Green.png')"});
	else
		$(".upstreamEntitiesContent").css({"background-image":"url('img/profile_red_small.png')"});
		
	if(node.entity.coreBankingEntities.length > 0)
		$(".coreBankingEntitiesContent").css({"background-image":"url('img/profileCol3Green.png')"});
	else
		$(".coreBankingEntitiesContent").css({"background-image":"url('img/profile_red_small.png')"});
		
	if(node.entity.externalRegistryEntities.length > 0)
		$(".externalRegistryEntitiesContent").css({"background-image":"url('img/profileCol3Green.png')"});
	else
		$(".externalRegistryEntitiesContent").css({"background-image":"url('img/profile_red_small.png')"});
		
	if(node.entity.tradingEntities.length > 0)
		$(".tradingEntitiesContent").css({"background-image":"url('img/profileCol3Green.png')"});
	else
		$(".tradingEntitiesContent").css({"background-image":"url('img/profileCol3Yellow.png')"});
	
	if(node.entity.downstreamEntities){
		if(node.entity.downstreamEntities.length > 0)
			$(".downstreamEntitiesContent").css({"background-image":"url('img/profileCol3Green.png')"});
		else
			$(".downstreamEntitiesContent").css({"background-image":"url('img/profileCol3Yellow.png')"});
	}
	/**Rules for vertical highlight for Entity boxes END**/
	
	/*****adjusting elements widths with scrollbar overflow****/

}

function writeCustomerOverviewRows(json, entityId, entityType){
	for(var i=0; i < json.entity.members.length; i++){
		var output = $('#popupRowsTemplate').parseTemplate(json.entity.members[i]);
		$("#profileRowsContainer").append(output);
		$("#profileRowsContainer").append("<div id='"+entityType+"' class='entityType' style='display:none'></div>");
	}

}
function prepareCustomerViewMembersDetails(elem){
	var parent = $(elem).parents("div.ProfileRowsContainer");
	var systemId =  $(elem).parents("div.ProfileRowsContainer").attr("id");
	var srcCode = $(elem).parents("div.ProfileRowsContainer").children("div.srcCode").attr("id");
	var entityType = $(elem).parents("div.ProfileRowsContainer").next("div.entityType").attr("id");
	
	CustomerOverViewMemberDetailsNew(elem, parent, systemId, srcCode, entityType);
}
function CustomerOverViewMemberDetailsNew(elem, parent, systemId, srcCode, entityType){
	if(parent.hasClass("called")){
		COPlusExpand(elem);
		return;
	}
	waitShow();
	$.ajax({
			type:"GET",
			url: APIURL + "memberdetails.jsonp" + '?callback=?',
			data: { "entityType": entityType, "srcCode": srcCode, "memberId":systemId},
			contentType:"application/json",
			beforeSend: function(jqXHR) {
				jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
			},
			dataType:"jsonp",
			success: function (json, idtype){	
				if(json.success == true){
					writeCustomerOverviewMemberDetails(parent, json.entity);
				}
				parent.addClass("called");
				waitHide();
				/***********scroolbar? -> adjust elements**************/
				profile_scrollbar_width = $("#customerContainer").outerWidth() - $("#customerProfileContainer").outerWidth();
				adjustProfileHeaderElementsWidth(profile_scrollbar_width);
				COPlusExpand(elem);
			}
		});	
}
function CustomerOverviewMemberDetails(entityType){
	
	var srcCode = "";
	var systemId = "";
	$.each($(".ProfileRowsContainer"), function(e){
		var parentId = $(this).attr("id");
		systemId = parentId;
		srcCode = $(this).children().first().attr("id");
		waitShow();
		$.ajax({
			type:"GET",
			url: APIURL + "memberdetails.jsonp" + '?callback=?',
			data: { "entityType": entityType, "srcCode": srcCode, "memberId":systemId},
			contentType:"application/json",
			beforeSend: function(jqXHR) {
				jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
			},
			dataType:"jsonp",
			success: function (json, idtype){	
				if(json.success == true){
					writeCustomerOverviewMemberDetails(parentId, json.entity);
				}
				waitHide();
				/***********scroolbar? -> adjust elements**************/
				profile_scrollbar_width = $("#customerContainer").outerWidth() - $("#customerProfileContainer").outerWidth();
				adjustProfileHeaderElementsWidth(profile_scrollbar_width);

			}
		});		
	});	
}
function adjustProfileHeaderElementsWidth(scrollWidth){
	$(".col-width-entities").css({'width': 'calc('+(610*100)/(1024 - scrollWidth)+'%)'});
	$(".col-width-entities-spacer").css({'width': 'calc('+(60*100)/(1024 - scrollWidth)+'%)'});
	$(".col-width-related-systems").css({'width': 'calc('+(346*100)/(1024 + scrollWidth)+'%)'});
	
	
	$(".col-width-profile-row-part-I").css({'width': 'calc('+(480*100)/(1024 - scrollWidth)+'%)'});
	$(".col-width-profile-row-part-II").css({'width': 'calc('+(544*100)/(1024 + scrollWidth)+'%)'});
	$(".col-width-profile-row-part-II-first").css({'width': 'calc('+(180*100)/(544 - scrollWidth)+'%)'});
}
function writeCustomerOverviewMemberDetails(parent, node){
	var output = $('#popupSubRowsTemplate').parseTemplate(node);
	$(parent).append(output);
	//$("#profileRowsContainer").append(output);

}
function writeCustomerOverviewBottom(node, entityId){
	var output = $('#popupBottomTemplate').parseTemplate(node);
	$("#profileBottomContainer").append(output);
}
function writeCustomerHierarchy(node, entityType, entityId){
	var output = $('#CustomerHierarchyTemplate').parseTemplate(node);
	$("#customerHierarchyContainer").append(output);
	$("#org").jOrgChart({
            chartElement : '#chart',
            dragAndDrop  : true
        });
		
	/*console.log("hierarchy");
	$.ajax({
        type:"GET",
        url: APIURL + "customerchartdata.jsonp" + '?callback=?',
        data: { "entityType": entityType, "entityId": entityId, "type": "CREDIT"},
        contentType:"application/json",
        beforeSend: function(jqXHR) {
            jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType:"jsonp",
		success: function (json, idtype){	
			if(json.success == true){
				console.log(json);//(json, entityType, entityId);
			}
		}
    });	*/
	
}