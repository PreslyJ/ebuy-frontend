
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
        	alertify.success("Registered successully");
        },
        error : function(jqXHR, textStatus, errorThrown) {
	        alertify.error("Error occured during your process please retry");
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

        	alertify.success("Login successully");

        },
        error : function(jqXHR, textStatus, errorThrown) {
	        alertify.error("Error occured during your process please retry");
        },

        timeout: 120000,
    });
}

function Set_Cookie( name, value)
{
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );

	document.cookie = name + "=" + value  ;

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

