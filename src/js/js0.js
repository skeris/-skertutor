// //document.addEventListener("DOMContentLoaded", function() {
// //document.getElementsByClassName("rarr")[0].onclick = function () {//console.log(1)}
// //console.log

// (document.getElementsByClassName("rarr")[0].outerHTML)
// //}, false);
// let rarr0 = document.getElementsByClassName("rarr")[0];
// let rarr1 = document.getElementsByClassName("rarr")[1];
// let currentbg = 0;
// let bg0 = ["0.png", "1.png", "2.png", "3.png",];

// rarr0.onclick = () => {
//     currentbg++
//     if (currentbg > bg0.length -1) {
//         currentbg = 0
//     };    
//     block1.style.backgroundImage = "url(/src/image/"+bg0[currentbg]+")"
//     //console.log

// (currentbg)
// };//console.log

//  (Math.floor(Math.random( ) * (10+1)));

// rarr1.onclick = () => {
//     currentbg--
//     if (currentbg < 0) {
//         currentbg = bg0.length -1
//     };    
//     block1.style.backgroundImage = "url(/src/image/"+bg0[currentbg]+")"
//     //console.log

// (currentbg)
// };

function Slider(arr, leftControl, rightControl, indicator){

    //Проверка. Является ли arr массивом.
    if(arr.constructor !== Array){
    console.log("В Slider был вложен не массив")
    };
    //Проверка. Являются ли кнопки носителем класса rarr.
    if(!leftControl.classList.contains("rarr")){
        console.log("Вложенные кнопки не имеют класса rarr")
    };
    if(!rightControl.classList.contains("rarr")){
        console.log("Вложенные кнопки не имеют класса rarr")
    };

    //Вкложение аргументов в переменные
    this.arr = arr;
    this.leftControl = leftControl;
    this.rightControl = rightControl;
    this.streamScreen = streamScreen;
    this.maxElement = arr.length;
    this.indicator = indicator;
    this.currentElement = 0;
    var that = this

    //Функция листания, применяемая к обеим стрелкам
    function scroll(){
        if(that.currentElement == 0){
            that.currentElement = that.maxElement;
        } else {
            that.currentElement - 1;
        };
        console.log (that.currentElement);
    };

    var clickMouse = 0
    //При клике на leftControl
    leftControl.onclick = () => {

        scroll;
    };

    //При клике на rightControl
    leftControl.onclick = () => {
        scroll;
    };
};
