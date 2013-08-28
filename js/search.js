function customerSearch(){
	console.log("customerSearch");
	$.getJSON("json/customersearch.json", function(json) {
		console.log(json); // 
		if(json.success == true)
			for(var i=0; i < json.results.length; i++){
				writeSearchResults(json.results[i]);
			}
	});
	
}
function expandMembers(entityId){
	/*there should be code for ajax expandcustomermembers call with provided entityId?*/
	console.log("expandMembers");
	$.getJSON("json/expandcustomermembers.json", function(json) {
		//console.log(json); // 
		//if(json.success == "true")
			for(var i=0; i < json.results.length; i++){
				writexpandMembersResults(json.results[i]);
			}
	});
}
function writeSearchResults(node){
	//console.log(node.name);

	var expandButton = "";
	$("#resultContainers").append('<div id="container">'+
				'<div id="'+node.entityId+'"  class="row" style="border-top:1px solid #cbcbcb"><div class="col-xs-5 col-sm-5 col-md-5" >'+
						'<div class="row">'+
							'<div class="col-xs-1 col-sm-1 col-md-1 plusSearchResult plusResult" style="display:inline-block;min-height:1px;max-width:50px;line-height: 50px;background-image:url(\'img/plusResult.png\');background-repeat:no-repeat;background-position:left;"  id="plusResult">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div>'+
							'<div class="col-xs-6 col-sm-6 col-md-6 padding_left_28">'+
								'<div style="line-height: 25px; ">'+
									//'<strong>Yakka </strong>(NZ)LTD (4)'+
									'<strong>'+ node.name +'</strong>('+node.memberCount+')'+
								'</div>'+
								'<div style="line-height: 25px; ">'+
									'<small>26 King William St,...</small>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="row col-xs-5 col-sm-5 col-md-5">'+
						'<div class="row">'+
							'<div class="col-xs-4 col-sm-4 col-md-4 glob_no_line">'+
									//'Global ID'+
									node.systemType +
							'</div>'+
							'<div class="col-xs-6 col-xs-offset-6 col-sm-6 col-sm-offset-1 col-md-6 col-md-offset-1 glob_no_line" > '+
									//'100000012311111133333'+
									node.systemId +
							'</div>'+
						'</div>'+
					'</div>'+
						'<div class="col-xs-1 col-sm-1 col-md-1 text-center search_number" style="height:50px;">'+
							'<div class="" style="line-height: 50px; background-image:url(\'img/search_number.png\');background-repeat:no-repeat; background-position:center; color:blue">'+
								//'8'+
								node.score +
							'</div>'+
						'</div>'+
						'<div class="col-xs-1 col-sm-1 col-md-1" style="text-align:center">'+
							
							'<div id="12" class="col-xs-1 col-md-1 plusResult playButton pointer" style="float:center;display:inline-block;min-height:1px;width:100%;line-height: 50px;background-image:url(\'img/arrow.png\');background-repeat:no-repeat;background-position:right;"  >'+
							  '&nbsp&nbsp&nbsp		'	+	
							'</div>'+
						
						'</div>'+
						
				'</div></div>');
				
				
	/*there should be code for expandcustomermembers.json call*/
	expandMembers(node.entityId);
}

function writexpandMembersResults(node){
	console.log(node.name);
	//66761 first dynamic column from json example
	$("#66761").append('<div class="row" id="subResultContainer">'+
					'<div class="col-xs-5 col-sm-5 col-md-5">'+

						'<div class="col-xs-1 col-sm-1 col-md-1" id="subFirstColResult" style="width:50px"><span style="font-size:0px">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></div>'	+
						'<div class="col-xs-6 col-sm-6 col-md-6 padding_left_28" id="subResultName">'+
						//1. resultsub1.
						node.name +
						'</div>'+
					'</div>'+
					'<div class="col-xs-5 col-sm-5 col-md-5">'+
						'<div class="row">'+
							'<div class="col-xs-4 col-sm-4 col-md-4" id="subsubUrb">'/*.col 1*/+node.systemType+'</div>'+
							'<div class="col-xs-6 col-sm-6 col-md-6 col-sm-offset-1 col-md-offset-1" id="subpostCode">'+node.systemId+/*.col 2*/'</div>'+
						'</div>'+
					'</div>'+
				'</div>');
	
}