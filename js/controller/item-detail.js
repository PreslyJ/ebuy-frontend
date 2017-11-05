$(document).ready(function () {


    $("#demo1 .stars").click(function () {
   
        $.post('/ebuy-cart-service/itemRating',{rate:$(this).val()},function(d){
            if(d>0)
            {
                alert('You already rated');
            }else{
                alert('Thanks For Rating');
            }
        });
        $(this).attr("checked");
    });
});

function getUrlVars() {
    var url = window.location.href;
    var vars = {};
    var hashes = url.split("?")[1];
    var hash = hashes.split('&');

    for (var i = 0; i < hash.length; i++) {
        params=hash[i].split("=");
        vars[params[0]] = params[1];
    }
    return vars;
}

function getItemById(){

    var itemId=getUrlVars()['id'];

    jQuery.ajax({
        url: cartUrl+'/cart/getItemById/'+itemId,
        type: 'GET',
        success: function(data, textStatus, jqXHR) {

            $('#descr').html(data.description);            
            $('#name').html(data.name);            
            $('#itemId').html(data.id);            
            $('#price').html(data.price);         
            $('#quantity').value=data.quantity;         
            $('#lowLimit').html(data.minAge);         
            $('#maxLimit').html(data.maxAge);         

            $('#viewItem').append('<img src="'+cartUrl+'/cart/getImageByTitleId/'+data.id+'" alt="" />');

        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        },

        timeout: 120000,
    });


}
