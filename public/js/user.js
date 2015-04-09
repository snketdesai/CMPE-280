$(document).ready(function(){
	$('.whitePaper').click(function(){
		//var a = $(this).children();
		var href = $(this).attr('value');
		
		$("#myModal").modal('show');
	
		$('#download').click(function(){
			var fname = document.getElementById("fname").value;
			var lname = document.getElementById("lname").value;
			var email = document.getElementById("email").value;
			
			var mongo = {
					"fname" : fname,
					"lname" : lname,
					"email" : email
			};
			var mongoJson = JSON.stringify(mongo);
			//alert(mongoJson);
			 $.ajax({
				type: "POST",
				contentType: "application/json",
				url: "https://snketdesai-github-io-rohanbhanderi.c9.io/",
				data: mongoJson,
				dataType: "json",
				success:function(data,status,jqXHR){
				//	alert("S " +  status);		
				},
				error:function(jqXHR,status,errorThrown){
				   // console.log(status + " " + errorThrown);
					//alert(status + errorThrown+" error");
				}
			});	
			
			location.href = href;
			
			$("#myModal").modal('hide');
			
			
		})

  });
});
