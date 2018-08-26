$('#logout').on('click',function(){
  $.confirm({
    theme: 'supervan',
    title: 'Confirmation:',
    content: 'Are you sure you want to logout?',
    buttons: {
        Logout: function () {
          var refV = firebase.database().ref().child("admin/status");
          refV.on("value", function(snapshot) {
            childState = snapshot.val();
            console.log(childState);
            if (childState.onlineState === "online") {
              var postData = {
                  onlineState: "offline"
              }
              snapshot.ref.update(postData)
            }
          })
            toastr.error("Logged out!")

        },
        Nope: function () {
            toastr.success("Online!")
        }
    }
});
})
