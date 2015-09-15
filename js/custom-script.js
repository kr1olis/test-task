var ls = window.localStorage;
var currentAudio = '';
var audio = new Audio();
if(ls.length>0) {insertFromLS();};
addActiveClass ();
musicPause ()

var n = 1;
var button1 = '';

playSound.onclick = function() { musicPause(); musicPlay() };
pauseSound.onclick = function() { musicPause() };

buttonAdd.onclick = function() {
  var soundName = document.getElementById('name').value;
  var authorName = document.getElementById('author').value;
  var fileName = $('#fileover').val().substring(12);
  addToLocalStorage (soundName,authorName,fileName);
  var tr1 = document.createElement('tr');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  td2.innerHTML = soundName;
  td3.innerHTML = authorName;
  td4.innerHTML = fileName;
  tableRow.appendChild(tr1);
  tr1.appendChild(td2);
  tr1.appendChild(td3);
  tr1.appendChild(td4);
  td2.className = "tdName";
  td3.className = "tdAuthor";
  td4.className = "tdFile";
  n++;
  addActiveClass ();
  uploadForm.submit();
};

buttonDel.onclick = function() {
  delFromLS ();
  var xmlhttp = getXmlHttp();
  var item = $('.active .tdFile').html()
  item = item.substring(12);
  var params = 'file=' + encodeURIComponent(item);
  xmlhttp.open("POST", './php/delete.php', true);
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xmlhttp.send(params);
  tableRow.removeChild($('.active')[0]);
  setTimeout('function(){if xmlhttp.status != 200) {alert( "error" );} else {alert( xmlhttp.responseText );}}', 1000);
};

function addToLocalStorage (songName,authorName,fileName) {
  var obj = {
    "songName": songName,
    "authorName": authorName,
    "fileName": fileName
  };
  ls.setItem(songName,JSON.stringify(obj));
};

function insertFromLS () {
  for (var n=0;n<ls.length; n++) {
    if (ls.key(n) === "elapsedTime") {
      continue;
    } else {
      var j = JSON.parse(ls.getItem(ls.key(n)))
      var tr2 = document.createElement('tr');
      var td5 = document.createElement('td');
      var td6 = document.createElement('td');
      var td7 = document.createElement('td');
      td5.innerHTML = j.songName;
      td6.innerHTML = j.authorName;
      td7.innerHTML = j.fileName;
      td5.className = "tdName";
      td6.className = "tdAuthor";
      td7.className = "tdFile";
      tableRow.appendChild(tr2);
      tr2.appendChild(td5);
      tr2.appendChild(td6);
      tr2.appendChild(td7); 
      document.getElementById('elaps').innerHTML = 'Elapsed music time over all time:'+'m:'+(Math.floor(ls.getItem("elapsedTime")/60))+'s'+(+ls.getItem("elapsedTime")).toFixed(0);
    }
  }
};

function delFromLS () {
  var delItem = $('.active .tdName').html();
  ls.removeItem(delItem);
};

function musicPlay () {
  var item = $('.active .tdFile').html();
  if ($('.active .tdName').html()) {
  $('.text-block').html($('.active .tdName').html());
  }
  if ('song by: '+$('.active .tdAuthor').html()) {
  $('.dscription').html('song by: '+$('.active .tdAuthor').html());
  }
  var path = './files/'+item;
  if (currentAudio == path) {
    audio.play();
  } else {
    audio = new Audio(path);
    currentAudio = audio.src;
    audio.volume = 0.1;
    audio.play()
  }
};

function musicPause () {
  audio.pause()
  var elapse = +ls.getItem("elapsedTime")+(+audio.currentTime);
  var k = elapse%60;
  audio.currentTime = 0;
  document.getElementById('elaps').innerHTML = 'Elapsed music time: '+Math.floor(elapse/60)+'m'+k.toFixed(0)+'s';
  ls.setItem('elapsedTime', elapse);
};

function changeVolumeLvl() {
audio.volume = (document.getElementById('volume').value/100);
};

function addActiveClass () {
$("#tableRow").find("tr").click(function(){
  // удаляем у старого элемента, класс   activeClass    
  $(".active").removeClass("active");
  // добавляем к ссылки по которой щёлкнули класс activeClass
  $(this).addClass("active");
  });
};

function clearing() {
  ls.clear();
};

document.getElementById('clear').onclick = function() {
  clearing();
};

function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
};
