$(document).ready(function() {
    //$('select').material_select();

    $('.datepicker').pickadate({selectMonths: true,selectYears: 15});

   	getAllTableTh('.resultadosTabla');    

});

function cleanTableIcons(tabla){
	$(tabla).find('th').each(function(){
    	$(this).removeClass();
    });
}

function getAllTableTh(tabla){
	$(tabla).find('th').each(function(){
    	bindClick(this,tabla);
    });
}

function bindClick(each,tabla){
	$(each).bind("click",function(){
    		if($(each).hasClass("ascend")){
    			cleanTableIcons(tabla);
    			$(each).removeClass("ascend").addClass("descend");
	    	}else if($(this).hasClass("descend")){
				cleanTableIcons(tabla);
	    		$(each).removeClass("descend").addClass("ascend");
	    	}else{
	    		cleanTableIcons(tabla);
	    		$(each).addClass("descend");
	    	}
    		
    });
}