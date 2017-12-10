
function registerCustomer(){
    
    var  isSuccess=true;


    $("#fDiv text").remove();
    $("#lDiv text").remove();
    $("#phoneDiv text").remove();
    $("#emailDiv text").remove();
    $("#a1Div text").remove();
    $("#a2Div text").remove();
    $("#pwdDiv text").remove();


    if(!($('#fname').val())){
        $('#fDiv').append($.parseHTML('<text style="color:#D8000C;" >First name is mandotory</text>'));
        isSuccess=false;
    }

    if(!($('#lname').val())){
        $('#lDiv').append($.parseHTML('<text style="color:#D8000C;" >Last name is mandotory</text>'));
        isSuccess=false;
    }

    if(!($('#phonenum').val())){
        $('#phoneDiv').append($.parseHTML('<text style="color:#D8000C;" >Phone number is mandotory</text>'));
        isSuccess=false;
    }else{
        if(!(isPhone($('#phonenum').val()))){
            $('#phoneDiv').append($.parseHTML('<text style="color:#D8000C;" >Please enter a valid phone number</text>'));
            isSuccess=false;
        }    
    }

    if(!($('#email').val())){
        $('#emailDiv').append($.parseHTML('<text style="color:#D8000C;" >email is mandotory</text>'));
        isSuccess=false;
    }else{
        if(!(isEmail($('#email').val()))){
            $('#emailDiv').append($.parseHTML('<text style="color:#D8000C;" >Please enter a valid email</text>'));
            isSuccess=false;
        }

    }

    if(!($('#address1').val())){
        $('#a1Div').append($.parseHTML('<text style="color:#D8000C;" >address 1 is mandotory</text>'));
        isSuccess=false;
    }

    if(!($('#address2').val())){
        $('#a2Div').append($.parseHTML('<text style="color:#D8000C;" >address 2 is mandotory</text>'));
        isSuccess=false;
    }

    if(!($('#pwd').val())){
        $('#pwdDiv').append($.parseHTML('<text style="color:#D8000C;" >passowrd is mandotory</text>'));
        isSuccess=false;
    }


    if(!isSuccess)
        return;

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
        error : function(jqXHR, textStatus, errorThrown,responseJSON) {
    
            if(jqXHR.responseJSON.message=='email.inuse')
                $('#emailDiv').append($.parseHTML('<text style="color:#D8000C;" >email already in use</text>'));
            else
    	        alertify.error("Error occured during your process please retry");
    
        },

        timeout: 120000,
    });
}

function loginCustomer(){
	
    var  isSuccess=true;

    $("#mailDiv text").remove();
    $("#pwDiv text").remove();

    if(!($('#logemail').val())){
        $('#mailDiv').append($.parseHTML('<text style="color:#D8000C;" >Email is mandotory</text>'));
        isSuccess=false;
    }else{
        if(!(isEmail($('#logemail').val()))){
            $('#mailDiv').append($.parseHTML('<text style="color:#D8000C;" >Please enter a valid email</text>'));
            isSuccess=false;
        }

    }

    if(!($('#logpassword').val())){
        $('#pwDiv').append($.parseHTML('<text style="color:#D8000C;" >Password is mandotory</text>'));
        isSuccess=false;
    }

    if(!isSuccess)
        return;

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
        

		if(data){
	        Set_Cookie('ebuy',data);//change as per ur needs

        	alertify.success("Login successully");
         }else{   
          
            $('#pwDiv').append($.parseHTML('<text style="color:#D8000C;" >Username or password doesn\'t match </text>'));
           // alertify.error("Login failed");

         }   
        
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

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function isPhone(inputtxt) {
  var phoneno = /^\d{10}$/;
  return phoneno.test(inputtxt)
}

function replaceChar(inputCon){

    var val=inputCon.val();

    val.replace(/[0-9]/g, "X");

}

function replaceNumber(element){
      
    var val= element.value;

    val=val.replace(/[0-9]/g, "");
    val=val.replace(/[!@#$%^&*]/g, "");        
    element.value=val;

}

function reChar(ele){

    var val= ele.value;

    val=val.replace(/[!@#$%^&*]/g, "");
    val=val.replace(/[A-Z]/g, "");
    val=val.replace(/[a-z]/g, "");
        
    ele.value=val;

}