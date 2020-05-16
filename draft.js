function sizeUp(){
    let x = document.getElementById("song");
    let st = parseFloat(window.getComputedStyle(x,null).getPropertyValue('font-size'));
    document.getElementById('song').style.fontSize = (st+0.5) + 'px';
    calcWidth();
}

function calcWidth(){
    let x = document.getElementsByClassName('lyrics');
    console.log(x[0].offsetWidth);
}

let x = document.getElementById('refrain');
console.log(x);
if(x != null){
    x.innerText = 'ΕΠΩΔΟΣ';
}