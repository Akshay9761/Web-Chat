$(document).ready(function () {

  //adminRoutes.js ajax call
  $("#adminForm").on('submit', function (event) {
    let title = $("#title").val(),
      genre = $("#genre").val(),
      author = $("#author").val();
      let dataObj = { "Title": title, "Genre": genre, "Author": author };
    //alert(title+" "+genre+" "+author);

    $.ajax({
      url: 'admin',
      type: 'post',
      data: dataObj,
      success: function (data, textStatus, jQxhr) {
        $('#successDiv').css("display","block");
         clearFunc = setInterval(remSuccessMesg,2000);
         $("#adminForm")[0].reset();
      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
    function remSuccessMesg(){
      //alert("in remSuccessMesg");
      $('#successDiv').css("display","none");
      clearInterval(clearFunc);
    }
    event.preventDefault();
  });
  
  //ajax call for authRouter.js
  $("#signUpForm").on('submit', function (event) {
    let userName = $("#userName").val(),
        password = $("#pswd").val();
      let dataObj = { "UserName": userName, "Password": password};
    alert(password+" of "+userName);

    $.ajax({
      url: 'auth/signUP',
      type: 'post',
      data: dataObj,
      success: function (data, textStatus, jQxhr) {
        $('#successDiv').empty();
        $('#successDiv').append("<b>"+data.UserName+" succesfully logged in</b>").css("display","block");
        alert("after submit : "+data.UserName+" "+data.Password);
        clearFunc = setInterval(remSuccessMesg,2000);
          $("#signUpForm")[0].reset();
      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
    function remSuccessMesg(){
      alert("in remSuccessMesg");
      $('#successDiv').css("display","none");
      clearInterval(clearFunc);
    }
    event.preventDefault();
  });

});