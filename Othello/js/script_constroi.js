const tabu = document.getElementById('tabuleiro');

for (let i = 1; i < 9; i++) {
    var element = document.createElement("div");
    element.className="row";
    for (let j = 1; j < 9; j++) {
        var casa =  document.createElement("div");
        casa.className="casa"
        
        casa.id=`${i}_${j}`
        casa.onclick=function (){adicionarPeca(`${i}_${j}`)}
        
        element.appendChild(casa);
    }
    tabu.appendChild(element)
}

function adicionarPeca(a){
    var x = document.getElementById(`${a}`);
    if(x.childNodes.length<1){
    var flip =  document.createElement("div");
    flip.className="fliper";
    var front =  document.createElement("div");
    front.className="front";
    var back =  document.createElement("div");
    back.className="back";
    var branco =  document.createElement("div");
    branco.className="whiteP";
    var preto =  document.createElement("div");
    preto.className="blackP";
    if(1){
        front.appendChild(branco);
        back.appendChild(preto);
    }
    else{
        front.appendChild(preto);
        back.appendChild(branco);
    }
    flip.appendChild(front);
    flip.appendChild(back);

    x.appendChild(flip)}
}

function flip(a){
    var x = document.getElementById(`${a}`);
    var t= x.childNodes[0];
    if(t.style.transform != "rotateY(180deg)")
    t.style.transform = "rotateY(180deg)";
    else{
        t.style.transform = "rotateY(0)";
    }
}

