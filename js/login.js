  var _$_e7da = ["AIzaSyDDzkNABTruZtEznHKShzc9iXPJonQmgoU", "voting-fcca7.firebaseapp.com", "https://voting-fcca7.firebaseio.com", "voting-fcca7", "voting-fcca7.appspot.com", "369369085108", "initializeApp"];
  var config = {
    apiKey: _$_e7da[0],
    authDomain: _$_e7da[1],
    databaseURL: _$_e7da[2],
    projectId: _$_e7da[3],
    storageBucket: _$_e7da[4],
    messagingSenderId: _$_e7da[5]
  };
  firebase[_$_e7da[6]](config)
  $('.login-cover').hide()
  $("#btn-login").on('click', function() {
    toastr.remove()
    var $this = $(this);
    $this.button('loading');
    setTimeout(function() {
      $this.button('reset');
    }, 2000);
    var x = $('#password').val();
    var refV = firebase.database().ref().child("admin");
    refV.on("value", function(snapshot) {
      childState = snapshot.val();
      if (childState.password === x) {
        toastr.remove()
        var postData = {
          username: childState.username,
          password: childState.password,
          status: {
            onlineState: "online"
          }
        }
        snapshot.ref.update(postData)
        toastr.options = {
          "preventDuplicates": true
        }
        toastr.success("Logged in")
        var delay = 1000;
        setTimeout(function() {
          window.location = "index.html";
        }, delay);
      }
      if (childState.password != x) {
        toastr.remove()
        toastr.error("Wrong password")
      }
    })
  })

  $("#forgot").on('click', function() {
    $('.notforgot-pw').hide();
    $('.forgot-pw').show();
  })

  $("#lg").on('click', function() {
    $('.notforgot-pw').show();
    $('.forgot-pw').hide();
  })

  $("#btn-security").on('click', function() {
    var $this = $(this);
    $this.button('loading');
    setTimeout(function() {
      $this.button('reset');
    }, 2000);
    var a = $('#security').val();
    var d = $('#answer').val();
    if (a == "other") {
      var c = $('#other').val();
      sec(c, d)
    } else {
      sec(a, d)
    }
  })

  function sec(question, answer) {
    var refVZ = firebase.database().ref().child("security");
    refVZ.on("value", function(snapshot) {
      childState = snapshot.val();
      if (childState.question === question && childState.answer === answer) {
        $('.cn').show();
        $('.forgot-pw').hide();
      }
    })
  }

  $('#btn-newpass').on('click', function() {
    var $this = $(this);
    $this.button('loading');
    setTimeout(function() {
      $this.button('reset');
    }, 2000);
    var p1 = $('#p1').val();
    var p2 = $('#p2').val();
    if (p1 == p2) {
      forced(p1)
    } else {
      toastr.error("Password do not matched")
    }
  })

  function forced(newpass) {
    var refVX = firebase.database().ref().child("admin");
    refVX.on("value", function(snapshot) {
      childState = snapshot.val();
      toastr.remove()
      var postData = {
        username: "admin",
        password: newpass,
        status: {
          onlineState: "offline"
        }
      }
      snapshot.ref.update(postData)
      toastr.remove()
      toastr.success("New password updated!")
      $('.login-cover').show()
      var delay = 2000;
      setTimeout(function() {
        window.location = "login.html";
      }, delay);
    })
  }
  // function forced() {
  //   var refV = firebase.database().ref().child("admin/status");
  //   refV.on("value", function(snapshot) {
  //     childState = snapshot.val();
  //     if (childState.onlineState === "offline") {
  //       toastr.remove()
  //       var postData = {
  //           onlineState: "online"
  //       }
  //       snapshot.ref.update(postData)
  //
  //     }
  //
  //   })
  // }
