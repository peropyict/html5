function customerSearch(){

	$("#resultContainers").empty();
	var totalResultsNumber = "";
	$("#noOfSearchResult").empty();
	
	$.ajax({
        type:"POST",
        url: "http://gcs.ventiv.com.au/gcs/v1/" + "customersearch.jsonp" + '?callback=?',
		//jsonpCallback: "customersearchCallback",
        data: { "orgName": "MORGAN", "systemType": "MUREXID"},
        contentType:"application/json",
        beforeSend: function(jqXHR) {
            jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType:"jsonp",
		success: function (json){
			customersearchCallback(json);
		}
    });	
}
function customersearchCallback(json){

	if(json.success == true){
        for(var i=0; i < json.results.length; i++){
			writeCustomerSearchResults(json.results[i]);
		}
		if(json.results.length > 0)
			totalResultsNumber = "1 - " + json.results.length +" Results Found";
		else
			totalResultsNumber = "No results found";
		$("#noOfSearchResult").append(totalResultsNumber);
    }
}
/*TODO null instead plus button, if doesn't contain members*/
function writeCustomerSearchResults(node){
	var output = $('#CustomerSearchResultsTemplate').parseTemplate(node);
    $("#resultContainers").append(output);
	
	expandMembersAjax(node.entityId, node.entityType);
}
function expandMembersAjax(entityId, entityType){

	$.ajax({
        type:"GET",
        url: "http://gcs.ventiv.com.au/gcs/v1/" + "expandcustomermembers.jsonp" + '?callback=?',
        data: { "entityType": entityType, "entityId": entityId},
        contentType:"application/json",
        beforeSend: function(jqXHR) {
            jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType:"jsonp",
		helperData: {entityId: entityId, entityType: entityType},
		success: function (json, idtype){	
			console.log(this.helperData.entityId);
			if(json.success == true){
				for(var i=0; i < json.results.length; i++){
					writexpandMembersResults(json.results[i], this.helperData.entityId);
				}
			}
		}
    });
	
}
function writexpandMembersResults(node, entityId){
	var container = $("#"+entityId).parents("div#container");
	var output = $('#CustomerSearchResultsExpandMembersTemplate').parseTemplate(node);
	container.append(output);
}
function fillPopupData(element)
{
	var entityType = element.parent().attr("id");
	var entityId = element.attr("id");
	$.ajax({
        type:"GET",
        url: "http://gcs.ventiv.com.au/gcs/v1/" + "customerdetails.jsonp" + '?callback=?',
        data: { "entityType": entityType, "entityId": entityId},
        contentType:"application/json",
        beforeSend: function(jqXHR) {
            jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType:"jsonp",
		success: function (json, idtype){	
			if(json.success == true){
				writeCustomerOverview(json, entityType, entityId);
			}
		}
    });	
}
function writeCustomerOverview(json, entityType, entityId){
	writeCustomerOverviewHeader(json, entityId);
	writeCustomerOverviewSumary(json, entityId);
	writeCustomerOverviewRows(json, entityId);
	CustomerOverviewMemberDetails(entityType);
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
}
function writeCustomerOverviewRows(json, entityId){
	for(var i=0; i < json.entity.members.length; i++){
		var output = $('#popupRowsTemplate').parseTemplate(json.entity.members[i]);
		$("#profileRowsContainer").append(output);
	}
}
function CustomerOverviewMemberDetails(entityType){
	
	var parentId = "";
	var srcCode = "";
	var systemId = "";
	
	$.each($(".ProfileRowsContainer"), function(e){
		parentId = $(this).attr("id");
		systemId = parentId;
		srcCode = $(this).children().first().attr("id");

		$.ajax({
			type:"GET",
			url: "http://gcs.ventiv.com.au/gcs/v1/" + "memberdetails.jsonp" + '?callback=?',
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
			}
		});		
	});	
}
function writeCustomerOverviewMemberDetails(parentId, node){
	var output = $('#popupSubRowsTemplate').parseTemplate(node);
	$("#"+parentId).append(output);
}
function writeCustomerOverviewBottom(node, entityId){
	var output = $('#popupBottomTemplate').parseTemplate(node);
	$("#profileBottomContainer").append(output);
}
function writeCustomerHierarchy(node, entityType, identityId){
	var output = $('#CustomerHierarchyTemplate').parseTemplate(node);
	$("#customerHierarchyContainer").append(output);
	$("#org").jOrgChart({
            chartElement : '#chart',
            dragAndDrop  : true
        });
		
	/*
	$.ajax({
        type:"GET",
        url: "http://gcs.ventiv.com.au/gcs/v1/" + "customerchartdata.jsonp" + '?callback=?',
        data: { "entityType": entityType, "entityId": entityId, "type": CREDIT},
        contentType:"application/json",
        beforeSend: function(jqXHR) {
            jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType:"jsonp",
		success: function (json, idtype){	
			if(json.success == true){
				writeCustomerHierarchy(json, entityType, entityId);
			}
		}
    });	
	*/
}