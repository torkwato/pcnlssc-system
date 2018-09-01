var x = 0;
var z = 0;
var y = 0;
var c1 = 0;
var c2 = 0;
var c3 = 0;
$(document).ready(function() {

  var refPos = firebase.database().ref().child("position/");
  refPos.on("child_added", function(snapshot) {
    var data = snapshot.val()
    $('#group').append(list(data))
    totalvote(data.position);
    creator(data.position)
  })

  var refPos = firebase.database().ref().child("students/");
  refPos.on("child_added", function(snapshot) {
    var data = snapshot.val()
    x = x + 1;
    $('#stu').html(x)

  })
  var refPos = firebase.database().ref().child("course/");
  refPos.on("child_added", function(snapshot) {

    var data = snapshot.val()
    z = z + 1;
    $('#cc').html(z)

  })
  var refPos = firebase.database().ref().child("voters/");
  refPos.on("child_added", function(snapshot) {

    var data = snapshot.val()
    c1 = c1 + 1;
    $('#tv').html(c1)
    if(data.statvote ==="notvoted"){
      c2 = c2 + 1;
      $('#nv').html(c2)
    }
    if(data.statvote ==="voted"){
      c3 = c3 + 1;
      $('#v').html(c3)
    }
  })
  var refPos = firebase.database().ref().child("candidates/");
  refPos.on("child_added", function(snapshot) {

    var data = snapshot.val()
    y = y + 1;
    $('#cand').html(y)

  })


  var refV = firebase.database().ref().child("limit");
  refV.on("value", function(snapshot) {
    childData = snapshot.val();
    if (childData.time != "") {
      getTime(childData.time);
    }


  })
  var refX = firebase.database().ref().child("penalty");
  refX.on("value", function(snapshot) {
    childData = snapshot.val();
    if (childData.pen != "") {
      getPen(childData.pen);
    }

  })
})

function getPen(x) {
  console.log(x);
  $('#pena').append('<i>' + x + '</i>');
}

function getTime(x) {
  $('#time').countdown(x, function(event) {
    var lapse = event.strftime('%w weeks %d days %H:%M:%S');
    $(this).html(lapse);
    if (lapse == "00 weeks 00 days 00:00:00") {
      toastr.remove()
      toastr.warning('Voting already ended!')
    }
  });
}

function list(contact) {
  var html = '';
  html += '<div class="col-md-6">'
  html += '<div class="panel">'
  html += '<div class="panel-heading main-color-bg">'
  html += '<h3 class="panel-title">' + contact.position + '</h3>'
  html += '</div>'
  // html += '<div class="panel-body">'
  html += '<h4 class="panel-title" style="margin-left:10px">Total vote: </h4><h4 style="margin-left:40px" class="panel-title ' + contact.position + '">0</h4>'
  html += '<ul class="list-group-item" id=' + contact.position + '>';
  html += '</ul>';
  // html += '</div>';
  html += '</div>';
  html += '</div>';
  return html;
}

function creator(d) {
  var refZ = firebase.database().ref().child("candidates/");
  refZ.on("child_added", function(snapshot) {
    var key = snapshot.key;
    var data = snapshot.val()
    if (d === data.position) {
      $('#' + d).append(appender(data,key))
    }

  })
}

function appender(contact,key) {
  var x = parseInt($('.' + contact.position).text());
  var y = contact.vote / x;
  var z = y * 100;
  z = parseFloat(z).toFixed(2);
  var html = '';
  html += '<li class="list-group-item" value='+contact.vote+' id='+key+'>' + contact.fname + " " + contact.lname + " --- " + contact.partylist;
  html += '<span class="badge">' + contact.vote + '</span>';
  html += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow=' + z + ' aria-valuemin="0" aria-valuemax="100" style="color:orange; width:' + z + '%;">' + z + '%</div></div>';
  html += '</li>';
  return html;
}

function totalvote(d) {
  var refZ = firebase.database().ref().child("candidates/");
  refZ.on("child_added", function(snapshot) {
    var data = snapshot.val()

    if (d === data.position) {
      var x = parseInt($('.' + data.position).text());
      x = data.vote + x;

      $('.' + d).html(x)
    }

  })
}



$('#btn-print').on('click', function() {
  console.log('aw');
  $("#print-me").print({
    globalStyles: true,
    mediaPrint: false,
    stylesheet: null,
    noPrintSelector: ".no-print",
    iframe: true,
    append: null,
    prepend: null,
    manuallyCopyFormValues: true,
    deferred: $.Deferred(),
    timeout: 750,
    title: null,
    doctype: '<!doctype html>'
  });
})
