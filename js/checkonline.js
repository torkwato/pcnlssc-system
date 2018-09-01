



var refV = firebase.database().ref().child("admin/status");
			  refV.on("value", function(snapshot) {
          childState = snapshot.val();
			    if (childState.onlineState === "online") {
			    	$('.login-cover').hide()
			    }
          if (childState.onlineState === "offline") {
            var delay = 3000;
            setTimeout(function() {
				        window.location = "login.html";
				      }, delay);
			    }
			  })



				$('#contact').on('click',function () {
					$.alert({
						theme: 'supervan',
				    title: 'Contact Developer:',
				    content: 'Email - domingo22knoralyn@gmail.com',
				});
				})
