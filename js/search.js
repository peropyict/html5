function customerSearch(){

	$("#resultContainers").empty();
	var totalResultsNumber = "";
	$("#noOfSearchResult").empty();
	$.getJSON("json/customersearch.json", function(json) {
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
	});
	
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
	writeCustomerOverviewBottom(json, entityId);
}
function writeCustomerOverviewHeader(node, entityId){
	var output = $('#popupHeaderTemplate').parseTemplate(node);
    $("#popupProfileContainer").prepend(output);
}
function writeCustomerOverviewSumary(node, entityId){	
	var output = $('#popupSumaryTemplate').parseTemplate(node);
	$("#popupProfileContainer").append(output);
}
function writeCustomerOverviewRows(node, entityId){
	for(var i=0; i < node.entity.members.length; i++){
		var output = $('#popupRowsTemplate').parseTemplate(node.entity.members[i]);
		$("#popupProfileContainer").append(output);
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
		//console.log(($(this).find("div.COMembersPlus")).attr("id"));
		var parentId = $(this).attr("id");
		//console.log(parentId);
		$.getJSON("json/memberdetails.json", function(json) {
			if(json.success == true){
				writeCustomerOverviewMemberDetails(parentId, json.entity, entityId);
			}
		});		
	})	
	//($(this).find("div.COMembersPlus")).attr("id") ------ this param should be used during memberdetails.json quering? check it!	
}
function writeCustomerOverviewMemberDetails(parentId, node, entityId){
	var output = $('#popupSubRowsTemplate').parseTemplate(node);
	$("#"+parentId).append(output);
}

function writeCustomerOverviewBottom(node, entityId){
	var output = $('#popupBottomTemplate').parseTemplate(node);
	$("#popupProfileContainer").append(output);
}