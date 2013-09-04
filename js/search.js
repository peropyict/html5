function customerSearch(){

	$("#resultContainers").empty();
	var totalResultsNumber = "";
	$("#noOfSearchResult").empty();
	
	
	/*****some local tests*****/
	/*$.getJSON("json/test/json.json", function(json) {		
			console.log(json);
	});
	$.getJSON("json/test/jsonp.json", function(jsonp) {		
			console.log(jsonp);
	});*/
	/*********end***********/
	
	 $.ajax({
        type:"POST",
        url: "http://gcs.ventiv.com.au/gcs/v1/" + "customersearch.jsonp",
		jsonpCallback: "customersearchCallback",
        data: { "orgName": "MORGAN", "systemType": "MUREXID"},
        contentType:"application/json",
        beforeSend: function(jqXHR) {
            jqXHR.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType:"jsonp" 
    });
	
	
	/*$.getJSON("json/customersearch.json", function(json) {
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
	});*/
	
}
function customersearchCallback(json){
	//console.log(json);
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
	
	expandMembers(node.entityId);
}

function expandMembers(entityId){
	/*there should be code for ajax expandcustomermembers call with provided entityId?*/
	$.getJSON("json/expandcustomermembers.json", function(json) {
		if(json.success == true)
			for(var i=0; i < json.results.length; i++){
				writexpandMembersResults(json.results[i], entityId);
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
	/*ajax request for customerdetails.json*/
	$.getJSON("json/customerdetails.json", function(json) {
		if(json.success == true)
			writeCustomerOverview(json, element.attr("id"));
	});
}

function writeCustomerOverview(json, entityId){
	writeCustomerOverviewHeader(json, entityId);
	writeCustomerOverviewSumary(json, entityId);
	writeCustomerOverviewRows(json, entityId);
	CustomerOverviewMemberDetails(entityId);
	//writeCustomerOverviewSubRows(json, entityId);
	writeCustomerHierarchy(json, entityId);
	writeCustomerOverviewBottom(json, entityId);
}
function writeCustomerOverviewHeader(node, entityId){
	var output = $('#popupHeaderTemplate').parseTemplate(node);
    $("#popupProfileContainer").prepend(output);
}
function writeCustomerOverviewSumary(node, entityId){	
	console.log("5");
	var output = $('#popupSumaryTemplate').parseTemplate(node);
	$("#profileScroolContainer").append(output);
}
function writeCustomerOverviewRows(node, entityId){
	for(var i=0; i < node.entity.members.length; i++){
		var output = $('#popupRowsTemplate').parseTemplate(node.entity.members[i]);
		$("#profileRowsContainer").append(output);
	}
}
/*function writeCustomerOverviewSubRows(node, entityId){
	console.log(node);
	for(var i=0; i < node.entity.members.length; i++){
		console.log(node.entity.members[i].name);
	}
	var output = $('#popupSubRowsTemplate').parseTemplate(node);
	$("#ProfileRowsContainer").append(output);
}*/
function CustomerOverviewMemberDetails(entityId){
	/*there should be code for ajax memberdetails call with provided systemId or srcCode?*/	
	$.each($(".ProfileRowsContainer"), function(e){
		var parentId = $(this).attr("id");
		$.getJSON("json/memberdetails.json", function(json) {
			if(json.success == true){
				writeCustomerOverviewMemberDetails(parentId, json.entity, entityId);
			}
		});		
	})	
}
function writeCustomerOverviewMemberDetails(parentId, node, entityId){
	var output = $('#popupSubRowsTemplate').parseTemplate(node);
	$("#"+parentId).append(output);
}

function writeCustomerOverviewBottom(node, entityId){
	var output = $('#popupBottomTemplate').parseTemplate(node);
	$("#profileBottomContainer").append(output);
}
function writeCustomerHierarchy(node, identityId){
	var output = $('#CustomerHierarchyTemplate').parseTemplate(node);
	$("#customerHierarchyContainer").append(output);
	$("#org").jOrgChart({
            chartElement : '#chart',
            dragAndDrop  : true
        });
}