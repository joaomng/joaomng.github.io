const tabu = document.getElementById('tabuleiro');

var Jogador=0;
var matriz = new Array(8);

matriz[0] = new Array(8);
matriz[1] = new Array(8);
matriz[2] = new Array(8);
matriz[3] = new Array(8);
matriz[4] = new Array(8);
matriz[5] = new Array(8);
matriz[6] = new Array(8);
matriz[7] = new Array(8);

function criaTabuleiro(){
for (let i = 1; i < 9; i++) {
    var element = document.createElement("div");
    element.className="row";
    for (let j = 1; j < 9; j++) {
        var casa =  document.createElement("div");
        casa.className="casa"  
        casa.id=`${i}_${j}`
        casa.onclick=function (){adicionarPeca(`${i}_${j}`)}
        matriz[i-1][j-1]=0;
        element.appendChild(casa);
    }
    tabu.appendChild(element)
}
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
    if(Jogador ==0){
        front.appendChild(branco);
        back.appendChild(preto);
        Jogador=1;
    }
    else{
        front.appendChild(preto);
        back.appendChild(branco);
        Jogador=0;
    }
    flip.appendChild(front);
    flip.appendChild(back);

    x.appendChild(flip)}
}
criaTabuleiro();
adicionarPeca('4_4');
adicionarPeca('4_5');
adicionarPeca('5_5');
adicionarPeca('5_4');



function flip(a){
    var x = document.getElementById(`${a}`);
    var t= x.childNodes[0];
    if(t.style.transform != "rotateY(180deg)")
        t.style.transform = "rotateY(180deg)";
    else{
        t.style.transform = "rotateY(0)";
    }
}

