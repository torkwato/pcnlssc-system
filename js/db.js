$(document).ready( function () {

})
$("select#security").change(function(){
  var me = $('#security').find(":selected").text();
  console.log(me);
  if (me=="other") {
    $('#other').prop('disabled', false);
  }
  else{
    $('#other').prop('disabled', true);
  }
});



$('#btn-dbname').on('click', function() {
  var $this = $(this);
  $this.button('loading');
  setTimeout(function() {
    $this.button('reset');
  }, 2000);

  var x = $('#dbname').val().replace(/ /g, '');

  $.confirm({
    theme: 'supervan',
    title: 'Confirmation:',
    content: 'Do you want to continue?',
    buttons: {
      Continue: function() {
        account(x)
        candidates(x)
        canlist(x)
        course(x)
        limit(x)
        partylist(x)
        penalty(x)
        position(x)
        result(x)
        students(x)
        voters(x)
      },
      Nope: function() {
        toastr.success("Denied!")
      }
    }
  });

})


function account(key) {
  var account = firebase.database().ref().child("account");
  account.on("value", function(snapshot) {
    data = snapshot.val()
    saveaccount(key, data)
  })
}

function saveaccount(key, data) {
  var updates = {};
  updates['backup/' + key + '/' + "account"] = data;
  return firebase.database().ref().update(updates);
}


function candidates(key) {
  var candidates = firebase.database().ref().child("candidates");
  candidates.on("value", function(snapshot) {
    data = snapshot.val()
    savecandidates(key, data)
  })
}

function savecandidates(key, data) {
  var updates = {};
  updates['backup/' + key + '/' + "candidates"] = data;
  return firebase.database().ref().update(updates);
}


function canlist(key) {
  var canlist = firebase.database().ref().child("canlist");
  canlist.on("value", function(snapshot) {
    data = snapshot.val()
    savecanlist(key, data)
  })
}

function savecanlist(key, data) {
  var updates = {};
  updates['backup/' + key + '/' + "canlist"] = data;
  return firebase.database().ref().update(updates);
}


function course(key) {
  var course = firebase.database().ref().child("course");
  course.on("value", function(snapshot) {
    data = snapshot.val()
    savecourse(key, data)
  })
}

function savecourse(key, data) {
  var updates = {};
  updates['backup/' + key + '/' + "course"] = data;
  return firebase.database().ref().update(updates);
}


function limit(key) {
  var limit = firebase.database().ref().child("limit");
  limit.on("value", function(snapshot) {
    data = snapshot.val()
    savelimit(key, data)
  })
}

function savelimit(key, data) {
  var updates = {};
  updates['backup/' + key + '/' + "limit"] = data;
  return firebase.database().ref().update(updates);
}


function partylist(key) {
  var partylist = firebase.database().ref().child("partylist");
  partylist.on("value", function(snapshot) {
    data = snapshot.val()
    savepartylist(key, data)
  })
}

function savepartylist(key, data) {
  var updates = {};
  updates['backup/' + key + '/' + "partylist"] = data;
  return firebase.database().ref().update(updates);
}


function penalty(key) {
  var penalty = firebase.database().ref().child("penalty");
  penalty.on("value", function(snapshot) {
    data = snapshot.val()
    savepenalty(key, data)
  })
}

function savepenalty(key, data) {
  var updates = {};
  updates['backup/' + key + '/' + "penalty"] = data;
  return firebase.database().ref().update(updates);
}



function position(key) {
  var position = firebase.database().ref().child("position");
  position.on("value", function(snapshot) {
    data = snapshot.val()
    saveposition(key, data)
  })
}

function saveposition(key, data) {
  var updates = {};
  updates['backup/' + key + '/' + "position"] = data;
  return firebase.database().ref().update(updates);
}



function result(key) {
  var result = firebase.database().ref().child("candidates");
  result.on("value", function(snapshot) {
    data = snapshot.val()
    saveresult(key, data)
  })
}

function saveresult(key, data) {
  var updates = {};
  updates['backup/' + key + '/' + "result"] = data;
  return firebase.database().ref().update(updates);
}


function students(key) {
  var students = firebase.database().ref().child("students");
  students.on("value", function(snapshot) {
    data = snapshot.val()
    savestudents(key, data)
  })
}

function savestudents(key, data) {
  var updates = {};
  updates['backup/' + key + '/' + "students"] = data;
  return firebase.database().ref().update(updates);
}


function voters(key) {
  var voters = firebase.database().ref().child("voters");
  voters.on("value", function(snapshot) {
    data = snapshot.val()
    savevoters(key, data)
  })
}

function savevoters(key, data) {
  var updates = {};
  updates['backup/' + key + '/' + "voters"] = data;
  return firebase.database().ref().update(updates);
}



var backup = firebase.database().ref().child("backup");
backup.on("child_added", function(snapshot) {
  var childKey = snapshot.key;
  var childData = snapshot.val();
  $("#dblist").append($('<option/>').attr("value", childKey).text(childKey));
  $("#dblist_load").append($('<option/>').attr("value", childKey).text(childKey));

});

$('#btn-deletedb').on('click', function() {
  var $this = $(this);
  $this.button('loading');
  setTimeout(function() {
    $this.button('reset');
  }, 2000);

  var y = $('#dblist').val();
  var z = $('#dblist_load').val();
  $.confirm({
    theme: 'supervan',
    title: 'Confirmation:',
    content: 'Are you sure you want to delete this database?',
    buttons: {
      Yes: function() {
        var account = firebase.database().ref().child("backup/" + y);
        account.on("value", function(snapshot) {
          data = snapshot.val()
          snapshot.ref.remove()
          $('#dblist option[value=' + y + ']').remove();
          $('#dblist_load option[value=' + z + ']').remove();
        })
      },
      Nope: function() {
        toastr.success("Denied!")
      }
    }
  });

})


$('#btn-loaddb').on('click', function() {
  var $this = $(this);
  $this.button('loading');
  setTimeout(function() {
    $this.button('reset');
  }, 2000);
  var z = $('#dblist_load').val();

  $.confirm({
    theme: 'supervan',
    title: 'Confirmation:',
    content: 'Importing database may overwrite your current poll elections. Continue?',
    buttons: {
      Continue: function() {
        var ref = firebase.database().ref().child("backup/" + z);
        ref.on("value", function(snapshot) {
          data = snapshot.val()
          account1(data.account)
          candidates1(data.candidates)
          canlist1(data.canlist)
          course1(data.course)
          limit1(data.limit)
          partylist1(data.partylist)
          penalty1(data.penalty)
          position1(data.position)
          result1(data.result)
          students1(data.students)
          voters1(data.voters)
        })
      },
      Nope: function() {
        toastr.success("Denied!")
      }
    }
  });

})


function account1(data) {
  var updates = {};
  updates['account'] = data;
  return firebase.database().ref().update(updates);
}

function candidates1(data) {
  var updates = {};
  updates['candidates'] = data;
  return firebase.database().ref().update(updates);
}

function canlist1(data) {
  var updates = {};
  updates['canlist'] = data;
  return firebase.database().ref().update(updates);
}

function course1(data) {
  var updates = {};
  updates['course'] = data;
  return firebase.database().ref().update(updates);
}

function limit1(data) {
  var updates = {};
  updates['limit'] = data;
  return firebase.database().ref().update(updates);
}

function partylist1(data) {
  var updates = {};
  updates['partylist'] = data;
  return firebase.database().ref().update(updates);
}

function penalty1(data) {
  var updates = {};
  updates['penalty'] = data;
  return firebase.database().ref().update(updates);
}

function position1(data) {
  var updates = {};
  updates['position'] = data;
  return firebase.database().ref().update(updates);
}

function result1(data) {
  var updates = {};
  updates['result'] = data;
  return firebase.database().ref().update(updates);
}

function students1(data) {
  var updates = {};
  updates['students'] = data;
  return firebase.database().ref().update(updates);
}

function voters1(data) {
  var updates = {};
  updates['voters'] = data;
  return firebase.database().ref().update(updates);
}

$("#btn-newpass").on('click', function(event) {
  var $this = $(this);
  $this.button('loading');
  setTimeout(function() {
    $this.button('reset');
  }, 2000);
  var diego = $("#oldpass").val()
  var bruno = $("#newpass").val()
  var satur = $("#conpass").val()
  var dodong = "";
  if (diego != dodong && dodong != "") {
    toastr.remove();
    toastr.error("Wrong passwod!");
  }

  $.confirm({
    theme: 'supervan',
    title: 'Confirmation:',
    content: 'Update password. Continue?',
    buttons: {
      Continue: function() {
        var refo = firebase.database().ref().child("admin");
        refo.on("value", function(snapshot) {
          info = snapshot.val()
          dodong = info.password;
          var dugyot = {
            username: info.username,
            password: bruno,
            status: {
              onlineState: "online"
            }
          }
          if (diego === info.password && bruno === satur) {
            snapshot.ref.update(dugyot)
            toastr.remove();
            toastr.success("Updated successfully!");
            var delay = 2000;
            setTimeout(function() {
              window.location = "login.html";
            }, delay);
          }
          if (bruno != satur) {
            toastr.remove();
            toastr.error("Password donot match!");
          }

        })
      },
      Nope: function() {
        toastr.success("Denied!");
      }
    }
  });
});


$("#btn-security").on('click', function(event) {
  var $this = $(this);
  $this.button('loading');
  setTimeout(function() {
    $this.button('reset');
  }, 2000);
  var diego = $("#oldpass").val()
  var bruno = $("#newpass").val()
  var satur = $("#conpass").val()
  var dodong = "";
  if (diego != dodong && dodong != "") {
    toastr.remove();
    toastr.error("Wrong passwod!");
  }

  $.confirm({
    theme: 'supervan',
    title: 'Confirmation:',
    content: 'Update recovery question & answer. Continue?',
    buttons: {
      Continue: function() {
        var a = $('#security').val();
        var d = $('#answer').val();
        if (a == "other") {
          var c = $('#other').val();
          sec(c, d)
        } else {
          sec(a, d)
        }
      },
      Nope: function() {
        toastr.remove()
        toastr.info("Denied!");
      }
    }
  });
});


function sec(question, answer) {
  var refVZ = firebase.database().ref().child("security");
  refVZ.on("value", function(snapshot) {
    childState = snapshot.val();
    var post = {
      question: question,
      answer: answer
    }
    snapshot.ref.update(post)
    toastr.remove()
    toastr.success("Successfully updated!");
  })
}
