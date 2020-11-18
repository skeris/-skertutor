function checkDiv(data){
  return (data.nodeName = "DIV")
};
function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = "copy";
};
function Team (landingPlace){
  if(!checkDiv(landingPlace)){
    throw new TypeError("В Team вложен не div")
  };
  this.landingPlace = landingPlace;
  this.landingPlace.addEventListener("dragover", handleDragOver, false);
  this.landingPlace.addEventListener("drop", handleFileSelect, false);
  this.tribes = [];
  var div = document.createElement("div");
  this.display = div;
  this.landingPlace.after(div);
  function draw(display){
    if(!checkDiv(display)){
      throw new TypeError("В Team вложен не div")
    };
    display.innerHTML = "";
    this.tribes.forEach (function(item){
      var newDiv = document.createElement("div");
      newDiv.classList.add("personInfo");
      display.classList.add("display");
      var h4 = document.createElement("h4");
      h4.innerHTML = item.name;
      var span = document.createElement("span");
      span.innerHTML = item.personages.length;
      span.insertAdjacentHTML("afterBegin", "Бойцы: ");
      newDiv.append(h4, span);
      display.append(newDiv);
    });
  };
  this.draw = draw;

  let that = this

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
      //console.log(that);
      that.tribes.push(JSON.parse(e.explicitOriginalTarget.result));
      that.draw(that.display);
      }
    };
  })(f);
    reader.readAsText(f);
    }
    //document.getElementById("list").innerHTML = "<ul>" + output.join("") + "</ul>";
  }
};
function figth(red, blue){
  if(!red instanceof Team){
    throw new TypeError("В figth вложены не Team объекты")
  };
  if(!blue instanceof Team){
    throw new TypeError("В figth вложены не Team объекты")
  };
};
window.onload = function() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    try{
    let teamRed = new Team(document.getElementById("dropZoneRed"));
    let teamBlue = new Team(document.getElementById("dropZoneBlue"));
    document.getElementById("buttonFight").onclick = figth(teamRed,teamBlue);
    //console.log(teamBlue)
    } catch(err){
      alert("Type Error " + err.message)   
    }
  } else {
      alert("The File APIs are not fully supported in this browser.");
    };
};