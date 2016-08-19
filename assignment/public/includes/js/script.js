$(function() {
            $('#prev').hide();
            $('#next').hide();
            var $id = $('#search');
            var $Name = $('#Name');

            var $dob = $('#dob');
            var $age = $('#age');
            var $gender = $('#gender');
            var $testsPlayed = $('#testsPlayed');
            var $odiPlayed = $('#odiPlayed');
            var $Runs_in_test = $('#Runs_in_test');
            var $Runs_in_odi = $('#Runs_in_odi');
            var $Debut_Test = $('#Debut_Test');

            var $Debut_Odi = $('#Debut_Odi');
            var $rating = $('#rating');
            var $code = $('#code');
            var $MOM = $('#MOM');
            var temple = $('#player-template').html();

            var page=0;
            var end=10;

            function load(result) {

                $('#disp').append(Mustache.render(temple, result));
            }
//searching the player information
            $('#btn2').click(function() {

               
                var id = $('#search').val();
                if(id=="")
                {
                	alert("enter a number");
                }
              
                else
                {
                    $('#disp').html('<tr><th>id</th><th>Name</th><th>dob</th><th>age</th><th>gender</th><th>testsPlayed</th><th>odiPlayed</th><th>Runs_in_test</th><th>Runs_in_odi</th><th>Debut_Test</th><th>Debut_Odi</th><th>rating</th><th>code</th><th>MOM</th><th>Operations</th></tr>');

                
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    header: 'application/json',
                    url: "http://localhost:8080/player?id=" + id,
                    success: function(data) {

                        $.each(data, function(i, obj) {

                            load(obj);

                        });

                    },
                    error: function() {
                        console.log("No Record");
                    }
                });
                }




            });
//Posting into backend 
            $('#f1').submit(function() {
            
                var details = {
                    Name: $Name.val(),
                    dob: $dob.val(),
                    age: $age.val(),
                    gender: $gender.val(),
                    testsPlayed: $testsPlayed.val(),
                    odiPlayed: $odiPlayed.val(),
                    Runs_in_test: $Runs_in_test.val(),
                    Runs_in_odi: $Runs_in_odi.val(),
                    Debut_Test: $Debut_Test.val(),

                    Debut_Odi: $Debut_Odi.val(),
                    rating: $rating.val(),
                    code: $code.val(),
                    MOM: $MOM.val()
                };


                //$('#disp').html('<tr><th>id</th><th>Name</th><th>dob</th><th>age</th><th>gender</th><th>testsPlayed</th><th>odiPlayed</th><th>Runs_in_test</th><th>Runs_in_odi</th><th>Debut_Test</th><th>Debut_Odi</th><th>rating</th><th>code</th><th>MOM</th><th>Operations</th></tr>');
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    header: 'application/json',
                    url: "http://localhost:8080/player",
                    data: details,
                    success: function(details) {
                        alert("successfully posted ");
                        
                        //load(details);

                       $.ajax({
                            type: 'GET',
                            dataType: 'json',
                            header: 'application/json',
                            url: "http://localhost:8080/player?id=" + data.id,
                            success: function(data) {

                              load(details);

                            },
                            error: function() {
                                console.log("No Record");
                            }
                        });

                    },
                    error: function() {
                        console.log("error message");
                    }

                });




            });



//deleting from backend

 $('#disp').delegate('#deleteButton','click',function(){
        var id=$(this).attr('data-id');
        var tr=$(this).closest('tr');
        var check=confirm("Do you want to delete the data  ? ");
        if(check==true){
        $.ajax({
            type:"DELETE",
            url : 'http://localhost:8080/player/'+id,
            success: function(result){
            
                alert("Data deleted successfully");
                tr.fadeOut(200,function(){
                    $(this).remove();
                });
          
            
        },
       
            error: function(){
                alert("Error on deleting the record.");
            }
        }); 
        }
    });

//updating into backend
$('#disp').delegate('.editButton','click',function() {
	var tr=$(this).closest('tr');
	tr.find('input.Name').val(tr.find('span.Name').html());
	tr.find('input.dob').val(tr.find('span.dob').html());
	tr.find('input.age').val(tr.find('span.age').html());
	tr.find('input.gender').val(tr.find('span.gender').html());
	tr.find('input.testsPlayed').val(tr.find('span.testsPlayed').html());
	tr.find('input.odiPlayed').val(tr.find('span.odiPlayed').html());
	tr.find('input.Runs_in_test').val(tr.find('span.Runs_in_test').html());
	tr.find('input.Runs_in_odi').val(tr.find('span.Runs_in_odi').html());
	tr.find('input.Debut_Test').val(tr.find('span.Debut_Test').html());
	tr.find('input.Debut_Odi').val(tr.find('span.Debut_Odi').html());
	tr.find('input.rating').val(tr.find('span.rating').html());
	tr.find('input.code').val(tr.find('span.code').html());
	tr.find('input.MOM').val(tr.find('span.MOM').html());
	tr.find('td').addClass('edit');


});


$('#disp').delegate('.cancelButton','click',function() {
	$(this).closest('tr').find('td').removeClass('edit');
	

});
//saving the changes
$('#disp').delegate('.saveButton','click',function() {
	var tr=$(this).closest('tr').remove('edit');
	   var id=$(this).attr('data-id');
	   var details = {
                    Name: tr.find('input.Name').val(),
                    dob: tr.find('input.dob').val(),
                    age: tr.find('input.age').val(),
                    gender: tr.find('input.gender').val(),
                    testsPlayed: tr.find('input.testsPlayed').val(),
                    odiPlayed: tr.find('input.odiPlayed').val(),
                    Runs_in_test: tr.find('input.Runs_in_test').val(),
                    Runs_in_odi: tr.find('input.Runs_in_odi').val(),
                    Debut_Test: tr.find('input.Debut_Test').val(),

                    Debut_Odi: tr.find('input.Debut_Odi').val(),
                    rating: tr.find('input.rating').val(),
                    code: tr.find('input.code').val(),
                    MOM: tr.find('input.MOM').val()
                };
        $.ajax({
                    type: 'PUT',
                    dataType: 'json',
                    header: 'application/json',
                    data:details,
                    url: "http://localhost:8080/player/" + id,
                    success: function(data) {

                   
                    tr.find('span.Name').html(details.Name);
                     tr.find('span.dob').html(details.dob);
                      tr.find('span.age').html(details.age);
                       tr.find('span.gender').html(details.gender);
                        tr.find('span.testsPlayed').html(details.testsPlayed);
                         tr.find('span.odiPlayed').html(details.odiPlayed);
                          tr.find('span.Runs_in_test').html(details.Runs_in_test);
                           tr.find('span.Runs_in_odi').html(details.Runs_in_odi);
                            tr.find('span.Debut_Test').html(details.Debut_Test);
                             tr.find('span.Debut_Odi').html(details.Debut_Odi);
                              tr.find('span.rating').html(details.rating);
                               tr.find('span.code').html(details.code);
                                tr.find('span.MOM').html(details.MOM);
                                tr.find('td').removeClass('edit');


                       alert("successfully updated");

                    },
                    error: function() {
                        console.log("Update failed");
                    }
                });        
	

});

//displaying all the players info
$('#btn3').click(function(){
    
    if(page==0) {
        $('#prev').prop('disabled',true);
    }
    $.ajax({
        type:'GET',
        dataType:'json',
        url:'http://localhost:8080/player?_page=' +page +'&_limit='+end ,
        success:function(data) {
            $('#disp').html('<tr><th>id</th><th>Name</th><th>dob</th><th>age</th><th>gender</th><th>testsPlayed</th><th>odiPlayed</th><th>Runs_in_test</th><th>Runs_in_odi</th><th>Debut_Test</th><th>Debut_Odi</th><th>rating</th><th>code</th><th>MOM</th><th>Operations</th></tr>');
             $('#prev').show();
            $('#next').show();

            $.each(data,function(i,obj) {
                load(obj);
            });

        },
        error:function(){
            alert("error while displaying");
        }

    });

});
//pagination comes on
$('#next').click(function(){
    page=page+10;
    
    if(page>0) {
        $('#prev').prop('disabled',false);
    }
    $.ajax({
        type:'GET',
        dataType:'json',
        url:'http://localhost:8080/player?_page=' +page +'&_limit='+end,
        success:function(data) {
            $('#disp').html('<tr><th>id</th><th>Name</th><th>dob</th><th>age</th><th>gender</th><th>testsPlayed</th><th>odiPlayed</th><th>Runs_in_test</th><th>Runs_in_odi</th><th>Debut_Test</th><th>Debut_Odi</th><th>rating</th><th>code</th><th>MOM</th><th>Operations</th></tr>');
        

            $.each(data,function(i,obj) {
                load(obj);
            });

        },
        error:function(){
            alert("error while displaying");
        }

    });

});



$('#prev').click(function(){
    page=page-10;
    
    if(page<=0) {
        $('#prev').prop('disabled',true);
    }
    $.ajax({
        type:'GET',
        dataType:'json',
        url:'http://localhost:8080/player?_page=' +page +'&_end='+end,
        success:function(data) {
            $('#disp').html('<tr><th>id</th><th>Name</th><th>dob</th><th>age</th><th>gender</th><th>testsPlayed</th><th>odiPlayed</th><th>Runs_in_test</th><th>Runs_in_odi</th><th>Debut_Test</th><th>Debut_Odi</th><th>rating</th><th>code</th><th>MOM</th><th>Operations</th></tr>');
            

            $.each(data,function(i,obj) {
                load(obj);
            });

        },
        error:function(){
            alert("error while displaying");
        }                   

    });

});

});

