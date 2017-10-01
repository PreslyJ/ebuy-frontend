
$(document).ready(function(){
	getAllCategories();
	getFeturedItems();
	getRecomendedItems();
});



function getAllCategories(){
	jQuery.ajax({


        url: cartUrl+'/cart/getAllCategories',
        type: 'POST',

        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {
			$.each(resultData.content,function(index,value){
				 if(value.subCategories.length>0){
					 $("[name='categoryEl']").append($.parseHTML(
							'<div class="panel panel-default"> <div class="panel-heading"> <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordian" href="#collapse'+index+'"> <span class="badge pull-right"><i class="fa fa-plus"></i></span> '+value.name+' </a> </h4> </div> <div id="collapse'+index+'" class="panel-collapse collapse"> <div class="panel-body" name="catU'+index+'" > <ul id="catul'+index+'"></ul> </div> </div> </div>')
					 	);
				 }else{
					 $("[name='categoryEl']").append($.parseHTML(
							'<div class="panel panel-default"> <div class="panel-heading"> <h4 class="panel-title"><a href="#">'+value.name+'</a></h4> </div> </div>')
					 	);

				 }	
				 $.each(value.subCategories,function(indx,val){
					var node=document.createElement("LI");
					var textnode=document.createTextNode(val.name);
				 	node.appendChild(textnode);
				 	document.getElementById('catul'+index).appendChild(node); 
				});
				 
			});

        },
        error : function(jqXHR, textStatus, errorThrown) {
        //	alert(errorThrown);
        },

        timeout: 120000,
    });
}


function getFeturedItems(){
	var reqData = { 
				"isFeatured":true		
	};
	jQuery.ajax({
        url: cartUrl+'/cart/filterItems',
        type: 'POST',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {
			$.each(resultData.content,function(index,value){
					 $("[name='fetureDiv']").append($.parseHTML('<div class="col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="'+cartUrl+'/cart/getImageByTitleId/'+value.id+'" alt="" /> <h2>Rs '+value.price+'</h2> <p>'+value.name+'</p> <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> <div class="product-overlay"> <div class="overlay-content"> <h2>Rs '+value.price+'</h2> <p>'+value.name+'</p> <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div> </div> <div class="choose">  </div> </div> </div>')
					 	);
				 
			});

        },
        error : function(jqXHR, textStatus, errorThrown) {
        //	alert(errorThrown);
        },

        timeout: 120000,
    });
}

function getRecomendedItems(){
	var reqData = { 
				"isRecomended":true		
	};
	jQuery.ajax({
        url: cartUrl+'/cart/filterItems',
        type: 'POST',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {
			$.each(resultData.content,function(index,value){
					 $("[name='activeRecItemsDiv']").append($.parseHTML('<div class="col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="'+cartUrl+'/cart/getImageByTitleId/'+value.id+'" alt="" /> <h2>Rs '+value.price+'</h2> <p>'+value.name+'</p> <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div> </div> </div>'
					 	));
				 
			});

			$.each(resultData.content,function(index,value){
					$("[name='recItemsDiv']").append($.parseHTML('<div class="col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="'+cartUrl+'/cart/getImageByTitleId/'+value.id+'" alt="" /> <h2>Rs '+value.price+'</h2> <p>'+value.name+'</p> <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div> </div> </div>'
					 	));
				 
			});

        },
        error : function(jqXHR, textStatus, errorThrown) {
        //	alert(errorThrown);
        },

        timeout: 120000,
    });
}

function getFeturedItemsList(page,size,divName){
	var reqData = { 
				"isFeatured":true		
	};
	jQuery.ajax({
        url: cartUrl+'/cart/filterItems?page='+page+'&size='+size+'&sort=lupDate,desc'+'&sort=id,desc',
        type: 'POST',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {

        	$("[name="+divName+"] div").remove();

			$.each(resultData.content,function(index,value){
					$("[name="+divName+"]").append($.parseHTML('<div class="col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="'+cartUrl+'/cart/getImageByTitleId/'+value.id+'" alt="" /> <h2>Rs '+value.price+'</h2> <p>'+value.name+'</p> <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> <div class="product-overlay"> <div class="overlay-content"> <h2>Rs '+value.price+'</h2> <p>'+value.name+'</p> <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div> </div> <div class="choose">  </div> </div> </div>')
					 	);
				 
			});
			
			if(page==0){
				var ulEl=document.getElementById("pagiUl");
				ulEl.innerHTML="";
				for(count = 0; count < resultData.totalPages; count++){
					var node=document.createElement("LI");
					if(count==0)
						node.setAttribute('class','active');
					var newA = document.createElement('a');
					newA.setAttribute('onclick',"getFeturedItemsList("+count+",12,'feturedDiv');changeclass('mainFetDv',this);");
					newA.setAttribute('href',"#");
					newA.innerHTML = count+1;
					node.appendChild(newA);
				 	ulEl.appendChild(node); 
			 	}
			 }	
        },
        error : function(jqXHR, textStatus, errorThrown) {
        //	alert(errorThrown);
        },

        timeout: 120000,
    });
}

function changeclass(divName,eliment) {

	$("[name="+divName+"] li").parent().find('li').removeClass("active");
	$(eliment).parent().addClass('active');
/*	var ulEl=document.getElementById("pagiUl");
	var children = ulEl.childNodes;

	for(child in children){
		children[child].classList.remove('active');
	}*/

}

