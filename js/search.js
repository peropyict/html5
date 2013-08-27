function customerSearch(){
	console.log("getsearch");
	$.getJSON("json/customersearch.json", function(json) {
		console.log(json); // 
		//if(json.success == "true")
			for(var i=0; i < json.results.length; i++){
				writeSearchResults(json.results[i]);
			}
	});
	
}
function writeSearchResults(node){
	console.log(node.name);
	$("#resultContainers").append('<div id="container"><div  class="row" style="border-top:1px solid #cbcbcb"><div class="col-xs-5 col-sm-5 col-md-5" >'+
						'<div class="row">'+
							'<div class="col-xs-1 col-sm-1 col-md-1 plusResult" style="display:inline-block;min-height:1px;max-width:50px;line-height: 50px;background-image:url(\'img/plusResult.png\');background-repeat:no-repeat;background-position:left;"  id="plusResult">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div>'+
							'<div class="col-xs-6 col-sm-6 col-md-6 padding_left_28">'+
								'<div style="line-height: 25px; ">'+
									//'<strong>Yakka </strong>(NZ)LTD (4)'+
									'<strong>'+node.name+'</strong>('+node.memberCount+')'+
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
									node.systemType+
							'</div>'+
							'<div class="col-xs-6 col-xs-offset-6 col-sm-6 col-sm-offset-1 col-md-6 col-md-offset-1 glob_no_line" > '+
									//'100000012311111133333'+
									node.systemId+
							'</div>'+
						'</div>'+
					'</div>'+
						'<div class="col-xs-1 col-sm-1 col-md-1 text-center search_number" style="height:50px;">'+
							'<div class="" style="line-height: 50px; background-image:url(\'img/search_number.png\');background-repeat:no-repeat; background-position:center; color:blue">'+
								'8'+
							'</div>'+
						'</div>'+
						'<div class="col-xs-1 col-sm-1 col-md-1" style="text-align:center">'+
							
							'<div id="12" class="col-xs-1 col-md-1 plusResult playButton pointer" style="float:center;display:inline-block;min-height:1px;width:100%;line-height: 50px;background-image:url(\'img/arrow.png\');background-repeat:no-repeat;background-position:right;"  >'+
							  '&nbsp&nbsp&nbsp		'	+	
							'</div>'+
						
						'</div>'+
						
					'</div></div>');
}