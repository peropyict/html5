function customerSearch(){

	$("#resultContainers").empty();
	$.getJSON("json/customersearch.json", function(json) {
		if(json.success == true)
			for(var i=0; i < json.results.length; i++){
				writeCustomerSearchResults(json.results[i]);
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
	//console.log("expandMembers");
	$.getJSON("json/expandcustomermembers.json", function(json) {
		if(json.success == true)
			for(var i=0; i < json.results.length; i++){
				writexpandMembersResults(json.results[i], entityId);
			}
	});
}
function writexpandMembersResults(node, entityId){
	//console.log(node);
	var container = $("#"+entityId).parents("div#container");
	var output = $('#CustomerSearchResultsExpandMembersTemplate').parseTemplate(node);
	container.append(output);
}


function fillPopupData(element)
{
	//console.log(element.attr("id"));
	/*ajax request for customerdetails.json*/
	$.getJSON("json/customerdetails.json", function(json) {
		//console.log("fillPopupData json consuming: " + json.entity);
		//console.log(json);
		if(json.success == true)
			writeCustomerOverview(json, element.attr("id"));
	});
}

function writeCustomerOverview(json, entityId){
	writeCustomerOverviewHeader(json, entityId);
	writeCustomerOverviewSumary(json, entityId);
	writeCustomerOverviewRows(json, entityId);
	writeCustomerOverviewSubRows(json, entityId);
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
	var output = $('#popupRowsTemplate').parseTemplate(node);
	$("#popupProfileContainer").append(output);
}
function writeCustomerOverviewSubRows(node, entityId){
	var output = $('#popupSubRowsTemplate').parseTemplate(node);
	$("#ProfileRowsContainer").append(output);
}
function writeCustomerOverviewBottom(node, entityId){
	var output = $('#popupBottomTemplate').parseTemplate(node);
	$("#popupProfileContainer").append(output);
}