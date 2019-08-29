$(".registerbtn").click(function(event){
	event.preventDefault();
	alert("test");
/*$.ajax({
		
		type: "POST",
		data: {

			  'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
			   
			   username: $("#username").val(),
		       
		       password: $("#psw").val()

		   	  },

		/*https:www.youtube.com/watch?v=H1sHOvc8au0
		success: console.log("test"),
		error: console.log("test")



		function (response) {
        	if (response.success == true) {
        		alert("hey")
        	}

        	else {
        		alert("no")
        	}
        	console.log("test")

        }
	 });*/
});