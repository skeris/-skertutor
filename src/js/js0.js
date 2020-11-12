//document.addEventListener('DOMContentLoaded', function() {
//document.getElementsByClassName('rarr')[0].onclick = function () {console.log(1)}
//console.log(document.getElementsByClassName('rarr')[0].outerHTML)
//}, false);
let rarr0 = document.getElementsByClassName('rarr')[0];
let rarr1 = document.getElementsByClassName('rarr')[1];
let currentbg = 0;
let bg0 = ["0.png", "1.png", "2.png", "3.png",];

rarr0.onclick = () => {
    currentbg++
    if (currentbg > bg0.length -1) {
        currentbg = 0
    };    
    block1.style.backgroundImage = 'url(/src/image/'+bg0[currentbg]+')'
    console.log(currentbg)
};//console.log (Math.floor(Math.random( ) * (10+1)));

rarr1.onclick = () => {
    currentbg--
    if (currentbg < 0) {
        currentbg = bg0.length -1
    };    
    block1.style.backgroundImage = 'url(/src/image/'+bg0[currentbg]+')'
    console.log(currentbg)
};
