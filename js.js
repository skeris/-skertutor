//document.addEventListener('DOMContentLoaded', function() {
//document.getElementsByClassName('rarr')[0].onclick = function () {console.log(1)}
//console.log(document.getElementsByClassName('rarr')[0].outerHTML)
//}, false);
let rarr = document.getElementsByClassName('rarr')[0];
let currentbg = 0;
let bg0 = ["1.png", "2.png", "3.png",];
rarr.onclick = () => {
currentbg++
block1.style.backgroundImage = 'url('+bg0[currentbg]+')'
}//console.log (Math.floor(Math.random( ) * (10+1)));