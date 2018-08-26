

var refc = firebase.database().ref().child("candidates/");
refc.on("child_added", function(snapshot) {
  var data = snapshot.val()
      $('#'+snapshot.key).append(percentage(data))
})

function percentage(contact) {
  var x = parseInt($('.'+contact.position).text());
  var y = contact.vote / x;
  var z = y*100;
  var html = '';
  html += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow='+ z +' aria-valuemin="0" aria-valuemax="100" style="color:orange; width:'+ z +'%;">'+ z +'%</div></div>';
  html += '</li>';
  return html;
}
