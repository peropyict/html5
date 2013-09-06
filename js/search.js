function customerOrganisationSearch(){
	/**empty previous results**/
	$("#resultContainers").empty();
	$("#noOfSearchResult").empty();	
	/**get input values**/
	var orgName = $("#nameSearch").val();
	var orgLocation = $("#codeSearch").val();
	/**validation**/
	if(orgName == ""){
		$("#nameSearch").parent().addClass("has-error");
		$("#nameSearch").focus();
		return;
	}
	/**Ajax request**/
	$.ajax({
        type:"POST",
        url: "http://gcs.ventiv.com.au/gcs/v1/" + "customersearch.jsonp" + '?callback=?',
		//jsonpCallback: "customersearchCallback",
        data: { "orgName": orgName, "orgLocation": orgLocation},
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
function customerIndividualSearch(){
	/**empty previous results**/
	$("#resultContainers").empty();
	$("#noOfSearchResult").empty();	
	/**get input values**/
	var individualFamilyName = $("#fnameSearch").val();
	var individualGivenName = $("#gnameSearch").val();
	var individualLocation = $("#postcodeSearch").val();
	/**validation**/
	if((individualFamilyName == "") && (individualGivenName == "") && (individualLocation == "")){
		$("#individualSearchForm").children().each(function(){
			if($(this).hasClass("form-group"))
				$(this).addClass("has-error");
		});
		$("#fnameSearch").focus();
		return;
	}	
	/**Ajax request**/
	$.ajax({
        type:"POST",
        url: "http://gcs.ventiv.com.au/gcs/v1/" + "customersearch.jsonp" + '?callback=?',
		//jsonpCallback: "customersearchCallback",
        data: { "individualFamilyName": individualFamilyName, "individualGivenName": individualGivenName, "individualLocation": individualLocation},
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
function customerSystemSearch(){
	/**empty previous results**/
	$("#resultContainers").empty();
	$("#noOfSearchResult").empty();	
	/**get input values**/
	var systemType = $("#systemTypeSearch").val();
	var systemId = $("#systemIdSearch").val();
	/**validation**/
	if((systemType == "") && (systemId == "")){
		$("#SystemSearchForm").children().each(function(){
			if($(this).hasClass("form-group"))
				$(this).addClass("has-error");
		});
		$("#systemTypeSearch").focus();
		return;
	}
	/**Ajax request**/
	$.ajax({
        type:"POST",
        url: "http://gcs.ventiv.com.au/gcs/v1/" + "customersearch.jsonp" + '?callback=?',
		//jsonpCallback: "customersearchCallback",
        data: { "systemType": systemType, "systemId": systemId},
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
			//console.log(this.helperData.entityId);
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

	/**Rules for vertical highlight colour for Entity boxes START**/
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
	/**Rules for vertical highlight colour for Entity boxes END**/
	
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