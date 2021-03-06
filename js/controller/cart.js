
/*$(document).ready(function(){
	getAllCategories();
	getFeturedItems();
	getRecomendedItems();
	getRecomendedItemsDiv();
	getCartItems();
});*/



function getAllCategories(isShopDiv){
	var reqData = { 
				"status":"active"
	};
	jQuery.ajax({
        url: cartUrl+'/cart/getAllCategories',
        data:JSON.stringify(reqData),
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
					if(val.status=='active'){

						var node=document.createElement("A");

					 	var br = document.createElement("br");

						if(isShopDiv)
							node.href='javascript:getFeturedItemsList(0,12,"feturedDiv",'+val.id+')';
						else
							node.href='javascript:getFeturedItems('+val.id+')';

						var textnode=document.createTextNode(val.name);

					 	node.appendChild(textnode);
					 	document.getElementById('catul'+index).appendChild(node); 

						document.getElementById('catul'+index).appendChild(br);

				 	}
				});
				 
			});

        },
        error : function(jqXHR, textStatus, errorThrown) {
        //	alert(errorThrown);
        },

        timeout: 120000,
    });
}


function getFeturedItems(subCategoryId){

	var subcatId=0;

	if(subCategoryId)
		subcatId=subCategoryId;

	var reqData = { 
				"isFeatured":true,
				"subCategoryId":subCategoryId,
				"status":"active"		

	};
	jQuery.ajax({
        url: cartUrl+'/cart/filterItems?page='+0+'&size='+12+'&sort=lupDate,desc'+'&sort=id,desc',
        type: 'POST',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {

        	$("[name=fetureDiv] div").remove();
			
			$.each(resultData.content,function(index,value){
					 $("[name='fetureDiv']").append($.parseHTML('<div class="col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="'+cartUrl+'/cart/getImageByTitleId/'+value.id+'" alt="" /> <h2>Rs '+value.price+'</h2> <p>'+value.name+'</p> <a onclick="addToCart('+value.id+')" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> <div class="product-overlay"> <div class="overlay-content"> <h2>Rs '+value.price+'</h2> <p>'+value.name+'</p> <a onclick="addToCart('+value.id+')" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div> </div> <div class="choose"> <ul class="nav nav-pills nav-justified"> <li><a href="product-details.html?id='+value.id+'"><i class="fa fa-plus-square"></i>Item Details</a></li></ul> </div> </div> </div>')
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
				"isRecomended":true,
				"status":"active"		
	};
	jQuery.ajax({
        url: cartUrl+'/cart/filterItems?page='+0+'&size='+3+'&sort=lupDate,desc'+'&sort=id,desc',
        type: 'POST',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {

			$.each(resultData.content,function(index,value){
					 $("[name='activeRecItemsDiv']").append($.parseHTML('<div class="col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="'+cartUrl+'/cart/getImageByTitleId/'+value.id+'" alt="" /> <h2>Rs '+value.price+'</h2> <p>'+value.name+'</p> <a onclick="addToCart('+value.id+')" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div><div class="choose"> <ul class="nav nav-pills nav-justified"> <li><a href="product-details.html?id='+value.id+'"><i class="fa fa-plus-square"></i>Item Details</a></li></ul> </div> </div> </div>'
					 	));
				 
			});

        },
        error : function(jqXHR, textStatus, errorThrown) {
        //	alert(errorThrown);
        },

        timeout: 120000,
    });
}



function getRecomendedItemsDiv(){
	var reqData = { 
				"isRecomended":true,
				"status":"active"		
	};
	jQuery.ajax({
        url: cartUrl+'/cart/filterItems?page='+1+'&size='+3+'&sort=lupDate,desc'+'&sort=id,desc',
        type: 'POST',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {

			$.each(resultData.content,function(index,value){
					$("[name='recItemsDiv']").append($.parseHTML('<div class="col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="'+cartUrl+'/cart/getImageByTitleId/'+value.id+'" alt="" /> <h2>Rs '+value.price+'</h2> <p>'+value.name+'</p> <a onclick="addToCart('+value.id+')" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div><div class="choose"> <ul class="nav nav-pills nav-justified"> <li><a href="product-details.html?id='+value.id+'"><i class="fa fa-plus-square"></i>Item Details</a></li></ul> </div> </div> </div>'
					 	));
				 
			});

        },
        error : function(jqXHR, textStatus, errorThrown) {
        //	alert(errorThrown);
        },

        timeout: 120000,
    });
}

function getFeturedItemsList(page,size,divName,subCategoryId){
	var reqData = { 
				"isFeatured":true,
				"subCategoryId":subCategoryId,
				"status":"active"			
	};
	jQuery.ajax({
        url: cartUrl+'/cart/filterItems?page='+page+'&size='+size+'&sort=lupDate,desc'+'&sort=id,desc',
        type: 'POST',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {

        	$("[name="+divName+"] div").remove();
        	
			$.each(resultData.content,function(index,value){
					$("[name="+divName+"]").append($.parseHTML('<div class="col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="'+cartUrl+'/cart/getImageByTitleId/'+value.id+'" alt="" /> <h2>Rs '+value.price+'</h2> <p>'+value.name+'</p> <a onclick="addToCart('+value.id+')" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> <div class="product-overlay"> <div class="overlay-content"> <h2>Rs '+value.price+'</h2> <p>'+value.name+'</p> <a onclick="addToCart('+value.id+')" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div> </div>  <div class="choose"> <ul class="nav nav-pills nav-justified"> <li><a href="product-details.html?id='+value.id+'"><i class="fa fa-plus-square"></i>Item Details</a></li></ul> </div> </div> </div>')
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
					if(subCategoryId)
						newA.setAttribute('onclick',"getFeturedItemsList("+count+",12,'feturedDiv',"+subCategoryId+");changeclass('mainFetDv',this);");
					else
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

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



function addToCart(itemId){
	
	var ebuy=getCookie('ebuy');

	if(!ebuy){
		alertify.error("Please login first");
		return;
	}

	var dataArry = ebuy.split(':');

	var reqData = { 
		"itemId":itemId,
		"customerId":dataArry[0]						
	};
	jQuery.ajax({
        url: cartUrl+'/cart/addToCart',
        type: 'POST',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(data, textStatus, jqXHR) {

        	alertify.success("Item added to cart");

        },
        error : function(jqXHR, textStatus, errorThrown) {
	        alertify.error("Error occured during your process please retry");
        },

        timeout: 120000,
    });
}


function getCartItems(){
	
	var ebuy=getCookie('ebuy');

	if(!ebuy){
		alertify.error("Please login first");
		return;
	}

	var dataArry = ebuy.split(':');

	var reqData = { 
		"customerId":dataArry[0],
		"status":"active"						
	};

	jQuery.ajax({
        url: cartUrl+'/cart/getCart',
        type: 'POST',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {

			$.each(resultData.cartItems,function(index,value){

				$('#cartItems tr:last').after('<tr> <td class="cart_product"> <a href=""><img src="'+cartUrl+'/cart/getImgByTitleId/'+value.item.id+'?width='+110+'&height='+110+'" alt=""></a> </td> <td class="cart_description"> <h4><a >'+value.item.name+'</a></h4>  </td> <td class="cart_price"> <p>Rs '+value.item.price+'</p> </td> <td class="cart_quantity"> <div class="cart_quantity_button"> <input class="cart_quantity_input" type="text" disabled name="quantity" value="'+value.quantity+'" autocomplete="off" size="2"> </div> </td> <td class="cart_total"> <p class="cart_total_price">Rs '+value.totalPriceDouble +'</p> </td> <td class="cart_delete"> <a class="cart_quantity_delete" onclick=removeFromCart('+value.id+',true)><i class="fa fa-times"></i></a> </td> </tr>');
				 
			});

			$('#subTotalSpan').text('Rs '+resultData.grandTotal);

        },
        error : function(jqXHR, textStatus, errorThrown) {
	        alertify.error("Error occured during your process please retry");
        },

        timeout: 120000,
    });
}


function getCartItemsForChk(){
	
	var ebuy=getCookie('ebuy');

	if(!ebuy){
		alertify.error("Please login first");
		return;
	}

	var dataArry = ebuy.split(':');

	var reqData = { 
		"customerId":dataArry[0],
		"status":"active"						
	};

	jQuery.ajax({
        url: cartUrl+'/cart/getCart',
        type: 'POST',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {

			$.each(resultData.cartItems,function(index,value){
				/*<div class="cart_quantity_button"> <a class="cart_quantity_up" href=""> + </a><a class="cart_quantity_down" href=""> - </a>*/
				$('#cartItems tr').eq(-3).before('<tr> <td class="cart_product"> <a href=""><img src="'+cartUrl+'/cart/getImgByTitleId/'+value.item.id+'?width='+110+'&height='+110+'" alt=""></a> </td> <td class="cart_description"> <h4><a >'+value.item.name+'</a></h4>  </td> <td class="cart_price"> <p>Rs '+value.item.price+'</p> </td> <td class="cart_quantity"> <div class="cart_quantity_button">  <input class="cart_quantity_input" type="text" disabled name="quantity" value="'+value.quantity+'" autocomplete="off" size="2">  </div> </td> <td class="cart_total"> <p class="cart_total_price">Rs '+value.totalPriceDouble +'</p> </td> <td class="cart_delete"> <a class="cart_quantity_delete" onclick=removeFromCart('+value.id+')><i class="fa fa-times"></i></a> </td> </tr>');
				 
			});

			$('#subTotalSpan').text('Rs '+resultData.grandTotal);
			$('#totalSpan1').text('Rs '+resultData.grandTotal);
			$('#totVal').val(resultData.grandTotal);


        },
        error : function(jqXHR, textStatus, errorThrown) {
	        alertify.error("Error occured during your process please retry");
        },

        timeout: 120000,
    });
}



function removeFromCart(id,cart){

	var ebuy=getCookie('ebuy');

	if(!ebuy){
		alertify.error("Please login first");
		return;
	}

	var dataArry = ebuy.split(':');

	var reqData = { 
		"cartItemId":id,
		"customerId":dataArry[0]
	};

	jQuery.ajax({
        url: cartUrl+'/cart/removeFromcart',
        type: 'POST',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(data, textStatus, jqXHR) {

        	alertify.success("Item removed from cart");
        	if(cart)
	        	setTimeout(function(){window.location.href = 'cart.html'},500);
	        else
	        	setTimeout(function(){window.location.href = 'checkout.html'},500);
        },
        error : function(jqXHR, textStatus, errorThrown) {
	        alertify.error("Error occured during your process please retry");
        },

        timeout: 120000,
    });

}

function logout(){
	 document.cookie =  'ebuy=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	 alertify.success("log out success");
	 setTimeout(function(){ window.location.href = 'index.html'},500);
}


function purchase(){

	if($('#totVal').val()<1){
		alertify.error("No items in cart");
		return;
	}

	var ebuy=getCookie('ebuy');

	if(!ebuy){
		alertify.error("Please login first");
		return;
	}

	if(!confirm('Please confirm purchase'))
		return;

	var dataArry = ebuy.split(':');

	var reqData = { 
		"customerId":dataArry[0]	
	};

	jQuery.ajax({
        url: cartUrl+'/cart/purchaseItems',
        type: 'POST',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(data, textStatus, jqXHR) {

        	alert("Purchase successfull");
			setTimeout(function(){window.location.href = 'checkout.html'},100);
        },
        error : function(jqXHR, textStatus, errorThrown) {
	        alertify.error("Error occured during your process please retry");
        },

        timeout: 120000,
    });

}

function addTocart1(){
    var iid=$('#itId').val();
    addTocart(iid);
}
