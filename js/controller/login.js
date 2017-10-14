
function registerCustomer(){
	var reqData = { 
				"firstName":$('#fname').val(),		
				"lastName":$('#lname').val(),
				"email":$('#email').val(),
				"phoneNumber":$('#phonenum').val(),
				"address1":$('#address1').val(),
				"address2":$('#address2').val(),
				"address3":$('#address3').val(),		
				"account":{
					"username":$('#email').val(),
					"password":$('#pwd').val()
				   }
				};
	jQuery.ajax({
        url: cartUrl+'/customer/saveCustomer',
        type: 'PUT',
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {
        	//alert("successully registered");
        },
        error : function(jqXHR, textStatus, errorThrown) {
        //	alert(errorThrown);
        },

        timeout: 120000,
    });
}

function loginCustomer(){
	var reqData = { 
					"username":$('#logemail').val(),
					"password":$('#logpassword').val()
				   
				};
	jQuery.ajax({
        url: cartUrl+'/customer/login',
        type: 'POST',
         crossDomain: true,
             xhrFields: {
                 withCredentials: true
             },
		data:JSON.stringify(reqData),
        contentType: 'application/json; charset=utf-8',
        success: function(data, textStatus, jqXHR){ 
        

		if(data)
	        Set_Cookie('ebuy',data);//change as per ur needs

        	//alert("successully registered");
        },
        error : function(jqXHR, textStatus, errorThrown) {
        	alert(textStatus);
        	alert(jqXHR);
        },

        timeout: 120000,
    });
}
