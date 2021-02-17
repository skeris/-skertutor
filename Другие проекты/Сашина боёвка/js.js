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
    var files = evt.dataTransfer.files;

    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match("text.*")) {
        continue;
      }
    var reader = new FileReader();
    reader.onload = (function(theFile) {
    return function(e) {
      if (e.target.readyState = 2){
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

function drawDisplay(red, blue){

  if(!red instanceof Team){
    throw new TypeError("В fight вложены не Team объекты")
  };
  if(!blue instanceof Team){
    throw new TypeError("В fight вложены не Team объекты")
   };

  //Очищение дисплея
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  red.tribes.forEach (function(item){
    var stringItem = JSON.stringify(item);

    var code = document.createElement("code");
    code.innerHTML = stringItem;
    code.style.color = "red"
    resultDiv.append(code);

    var linkDowload = document.createElement("a");

    linkDowload.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(stringItem);
    linkDowload.target = '_blank';
    linkDowload.download = item.name + '.txt';

    linkDowload.innerHTML = "Скачать";
    resultDiv.append(linkDowload);
  });

  blue.tribes.forEach (function(item){
    var stringItem = JSON.stringify(item);

    var code = document.createElement("code");
    code.innerHTML = stringItem;
    code.style.color = "blue"
    resultDiv.append(code);

    var linkDowload = document.createElement("a");

    linkDowload.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(stringItem);
    linkDowload.target = '_blank';
    linkDowload.download = item.name + '.txt';

    linkDowload.innerHTML = "Скачать";
    resultDiv.append(linkDowload);
  });
};

function fight(red, blue){

  if(!red instanceof Team){
    throw new TypeError("В fight вложены не Team объекты")
  };
  if(!blue instanceof Team){
    throw new TypeError("В fight вложены не Team объекты")
  };
  //Проверка заполненности tribes
  if(red.tribes.length == 0){
    alert("Ты не вложил файлы красной команды")
  }if(blue.tribes.length == 0){
    alert("Ты не вложил файлы синей команды")
  }

   //Определение и очищение дисплея
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  //Создание кнопки "скачать" для скачивания файлика племени
  function link(item, itemName){
    var stringItem = JSON.stringify(item);
    var linkDowload = document.createElement("a");
    linkDowload.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(stringItem);
    linkDowload.target = '_blank';
    linkDowload.download = itemName + '.txt';
    linkDowload.innerHTML = "Скачать";
    resultDiv.append(linkDowload);
  };

  //Сумматор всего массива
  function sumElements(arr){
    return arr.reduce(function(previousValue, currentItem){
      return previousValue + currentItem;
    });
  };

  //Массив сил игроков красной команды
  var redPowerArrPlayers = [];
  //Перебор игроков одного племени (красного)
  red.tribes.forEach(function(item){

    //Создание массива сил каждого персонажа
    var powerPers = item.personages.map(function(item){

      let power = item.power;
      
      if(item.sex == "female"){
        power = item.power * 0.75
      };
      if(item.age <= 12){
        power = power * 0
      } else if(item.age <= 16){
        power = power * 0.5
      } else if(item.age <= 50){
        power = power * 1
      } else if(item.age <= 70){
        power = power * 0.5
      } else{
        power = power * 0
      };
      if(item.invalidity == true){
        power = power * 0.5
      };
      return power;
    });
    
    //Сила одного игрока (cуммирование сил персонажей)
    var powerSum = sumElements(powerPers);
    //Вывод силы одного игрока
    redPowerArrPlayers.push(powerSum);
});
  //Итоговая сумма сил красной команды
  var redPower = sumElements(redPowerArrPlayers);

  //Массив сил игроков синей команды
  var bluePowerArrPlayers = [];
  //Перебор игроков одного племени (синего)
  blue.tribes.forEach(function(item){

    //Создание массива сил каждого персонажа
    var powerPers = item.personages.map(function(item){

      let power = item.power;
      
      if(item.sex == "female"){
        power = item.power * 0.75
      };
      if(item.age <= 12){
        power = power * 0
      } else if(item.age <= 16){
        power = power * 0.5
      } else if(item.age <= 50){
        power = power * 1
      } else if(item.age <= 70){
        power = power * 0.5
      } else{
        power = power * 0
      };
      if(item.invalidity == true){
        power = power * 0.5
      };
      return power;
    });
    
    //Сила одного игрока (cуммирование сил персонажей)
    var powerSum = sumElements(powerPers);
    //Вывод силы одного игрока
    bluePowerArrPlayers.push(powerSum);
});
  //Итоговая сумма сил синей команды
  var bluePower = sumElements(bluePowerArrPlayers);

  //Определение победившей команды
  if(redPower > bluePower){
    alert("Победила красная команда")
  } else {
    alert("Победила синяя команда")
  };

  //Работа со сметрями и инвалидностью в красной команде
  red.tribes.forEach(function(item, i, arr){
    var playerName = item.name;
    var alive = [];

    //Создание в display нового тега code с описанием
    function codeRed(message){
      var code = document.createElement("code");
      code.innerHTML = playerName + ": ";
      code.innerHTML += message;
      code.style.color = "red"
      resultDiv.append(code);
    };

    item.personages.forEach(function(item, i, arr){

      console.log(item.name)
      //Подготовка показателя брони
      var armor = item.armor/20;

      item.life = true

      var x = Math.random()
      var xx = Math.random()
      if(armor > x){
        //Персонаж-не-инвалид с 50% вероятностью становится инвалидом или умирает

        if(item.invalidity == false){
          if(xx < 0.5){
            item.invalidity = true
            //console.log("Теперь персонаж инвалид")
            codeRed(invDead = item.name + ". Теперь персонаж инвалид")
          } else {
            item.life = false
            codeRed(invDead = item.name + ". Теперь персонаж мёртв")
            //console.log("Теперь персонаж мёртв")
          }
        } else { //А инвалид умрёт
          item.life = false
          codeRed(invDead = item.name + ". Теперь персонаж мёртв")
          console.log("Теперь персонаж мёртв")          
        }
      };
        //Запушивание живых в массив
        console.log(item.life)
        if(item.life == true){
          alive.push(item)
          console.log(alive.length)
        }
    });
    arr[i].personages = alive
    console.log(alive)
    link(item, item.name)
  });

  //Работа со смертями и инвалидностью в синей команде
  blue.tribes.forEach(function(item, i, arr){
    var playerName = item.name
    var alive = []

    item.personages.forEach(function(item, i, arr){
      console.log(item.name)

      //Создание в display нового тега code с описанием
    function codeBlue(message){
      var code = document.createElement("code");
      code.innerHTML = playerName + ": ";
      code.innerHTML += message;
      code.style.color = "blue"
      resultDiv.append(code);
    };

      //Подготовка показателя брони
      var armor = item.armor/20;

      item.life = true;

      var x = Math.random()
      var xx = Math.random()
      if(armor > x){
        //Персонаж-не-инвалид с 50% вероятностью становится инвалидом или умирает

        if(item.invalidity == false){
          if(xx < 0.5){
            item.invalidity = true
            codeBlue(invDead = item.name + ". Теперь персонаж инвалид")
          } else {
            item.life = false
            codeBlue(invDead = item.name + ". Теперь персонаж мёртв")
          }
        } else { //А инвалид умрёт
          item.life = false
          codeBlue(invDead = item.name + ". Теперь персонаж мёртв")
        }
      };
      //Запушивание живых в массив
      console.log(item.life)
      if(item.life == true){
        alive.push(item)
        console.log(alive.length)
      }
    });
    arr[i].personages = alive
    console.log(blue)
    link(item, item.name)
  });
};

window.onload = function() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    try{
    let teamRed = new Team(document.getElementById("dropZoneRed"));
    let teamBlue = new Team(document.getElementById("dropZoneBlue"));
    document.getElementById("buttonFight").onclick = () =>{fight(teamRed,teamBlue);}   
    } catch(err){
      alert("Type Error " + err.message)   
    }
  } else {
      alert("The File APIs are not fully supported in this browser.");
  };
};
