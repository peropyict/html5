$(document).ready(function (e) {

	$("#home1").on("click", function(){
		if($(this).hasClass('pasive')){
			$(this).children().attr('src','img/homeDown1.png');
			$(this).addClass('active').removeClass('pasive');
		}		
		setTimeout("window.location.href='search.html';",700);		
	});
	
	$("#home1").hover(function () {		
		$(this).children().attr('src','img/homeDown1.png');
	},function(){		
		$(this).children().attr('src','img/home1.png');
	});
	
});