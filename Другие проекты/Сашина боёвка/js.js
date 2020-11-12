function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = "copy";
};
function Team (landingPlace){
  try{
    if(landingPlace.nodeName != 'DIV'){
      throw new TypeError('В Team вложен не div')
    };
    this.landingPlace = landingPlace;

  } catch(err){
    alert("Type Error " + err.message)
  };
  this.landingPlace.addEventListener("dragover", handleDragOver, false);
  this.landingPlace.addEventListener("drop", handleFileSelect, false);
  this.tribes = [];
  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  
    var files = evt.dataTransfer.files; // FileList object.
  
    // files is a FileList of File objects. List some properties.
    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match("text.*")) {
        continue;
      }
    var reader = new FileReader();
    reader.onload = (function(theFile) {
    return function(e) {
      if (e.explicitOriginalTarget.readyState = 2){
      console.log(e.explicitOriginalTarget.result);
      this.tribes.push(JSON.parse(e.explicitOriginalTarget.result));
      console.log(red[red.length-1]);
      this.tribes.forEach(function(item, i, red) {
        //console.log( i + ": " + item)
        redCommandInfo.push(red[0].name)
      });
      }
    };
  })(f);
    reader.readAsText(f);
    }
    //document.getElementById("list").innerHTML = "<ul>" + output.join("") + "</ul>";
  }
  var div = document.createElement('div');
  this.display = div;
};
window.onload = function() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    let teamRed = new Team(document.getElementById('dropZoneRed'));
    let teamBlue = new Team(document.getElementById('dropZoneBlue'));
    console.log(teamBlue)
  } else {
      alert("The File APIs are not fully supported in this browser.");
    };
};