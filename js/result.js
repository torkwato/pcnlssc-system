
winner()

$(document).ready(function() {
  var refV = firebase.database().ref().child("limit");
  refV.on("value", function(snapshot) {
    childData = snapshot.val();
    if (childData.time != "") {
      getTime(childData.time);
    }
  })
})



function getTime(x) {

$('#time').countdown(x, function(event) {
  var lapse = event.strftime('%w weeks %d days %H:%M:%S');
  console.log(lapse);
  $(this).html(lapse);

  if (lapse == "00 weeks 00 days 00:00:00") {
    $('#noresult').hide()
    $('#win').show()
  }
});
}
function winner(){
  var refz=firebase.database().ref().child("position");
  refz.on("child_added", function(snapshot) {
    x = snapshot.val();
    $('#group').append('<li>'+x.position+': <i id='+x.position+'></i></li>');
    appendme(x.position)
  })
}

function appendme(params){
  var a = 0;
  var b = "";
  var f = "";
  var l = "";
  var p = "";
  var refs=firebase.database().ref().child("candidates/");
  refs.on("child_added", function(snapshot) {
    var y = snapshot.val();
    var key = snapshot.key;
    if (params === y.position) {
      if (y.vote>a) {
        a=y.vote;
        b=key;
        f=y.fname;
        l=y.lname;
        p=y.partylist;
      }
    }
    $("#"+params).html(f+" "+l+", "+p+" - "+a);
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
