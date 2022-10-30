const tabu = document.getElementById('tabuleiro');
class Movimento {
    constructor(casaPrincipal, casasFlip) {
      this.casaPrincipal = casaPrincipal; this.casasFlip = casasFlip;
    }
  //Getter
    getscore() {
        return this.casasFlip.length
    }

}

class CasaClass {
    constructor(i, j) {
      this.i = i; this.j = j;
    }
  //Getter
    get I() {
        return this.i;
    }

    get J() {
        return this.j;
    }
}
var Jogador=1;
var matriz = new Array(8);

matriz[0] = new Array(8);
matriz[1] = new Array(8);
matriz[2] = new Array(8);
matriz[3] = new Array(8);
matriz[4] = new Array(8);
matriz[5] = new Array(8);
matriz[6] = new Array(8);
matriz[7] = new Array(8);

window.onkeydown = function (event) {
    if (event.key === "Escape") {
        Cria_Bloco_preto();
    }
}
criaTabuleiro();


function criaTabuleiro(){
    for (let i = 1; i < 9; i++) {
        var element = document.createElement("div");
        element.className="row";
        for (let j = 1; j < 9; j++) {
            var casa =  document.createElement("div");
            casa.className="casa"  
            casa.id=`${i}_${j}`
        //  casa.onclick=function (){adicionarPeca(`${i}_${j}`)}
            matriz[i-1][j-1]=0;
            element.appendChild(casa);
        }
        tabu.appendChild(element);
    }
    adicionarPeca('4_4');
    mudarJogador();
    adicionarPeca('4_5');
    mudarJogador();
    adicionarPeca('5_5');
    mudarJogador();
    adicionarPeca('5_4');
    mudarJogador();
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
    matriz[a[0]-1][a[2]-1]=Jogador;
    if(Jogador ==1){
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

function realizar_Movimento(array, id, pecasVirar){
    Retirar_Bloco_preto(array);
    adicionarPeca(id);
    pecasVirar.map((pecas, index)=>{
    let idPeca=`${pecas.I+1}_${pecas.J+1}`;
    mudarPeca(pecas.I, pecas.J)
    flip(idPeca);
    })
    mudarJogador();
    //alert("Mudança de Jogador");
}

function Retirar_Bloco_preto(array){
    array.map((movimento, index) => {
        let id=`${movimento.casaPrincipal.I+1}_${movimento.casaPrincipal.J+1}`;
        let casa = document.getElementById(id)
        casa.removeChild(casa.firstChild);
      });
}

function Cria_Bloco_preto(){
    var array = VerificaMovimentosDispoíveis();
    array.map((movimento, index) => {
        let id=`${movimento.casaPrincipal.I+1}_${movimento.casaPrincipal.J+1}`;
        console.log(id)
        let casa = document.getElementById(id)
        let div = document.createElement("div");
        div.className="Bloco_disponivel"
        div.onclick= function (){ realizar_Movimento(array, id, movimento.casasFlip); }
        casa.appendChild(div);
    });

}

function VerificaCasasVazias(){
    var array = [];  
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(matriz[i][j]==0){
            var ob= new CasaClass(i,j)
                array.push(ob)
            }
        
        }   
        
    }
    return array
}

function VerificaMovimentosDispoíveis(){
    const array =VerificaCasasVazias();
    var MovimentosPossíveis = []
    array.map((casa, index) => {
        let arrayPecasVirar=[]
        let condicao=Top_left_way(casa.I, casa.J)
        if(condicao!=false){
            arrayPecasVirar=arrayPecasVirar.concat(condicao)
        }
        condicao=Top_way(casa.I, casa.J)
        if(condicao!=false){
            arrayPecasVirar=arrayPecasVirar.concat(condicao)
        }
        condicao=Top_right_way(casa.I, casa.J)
        if(condicao!=false){
            arrayPecasVirar=arrayPecasVirar.concat(condicao)
        }
        condicao=Left_way(casa.I, casa.J)
        if(condicao!=false){
            arrayPecasVirar=arrayPecasVirar.concat(condicao)
        }
        condicao=Right_way(casa.I, casa.J)
        if(condicao!=false){
            arrayPecasVirar=arrayPecasVirar.concat(condicao)
        }
        condicao=Bottom_left_way(casa.I, casa.J)
        if(condicao!=false){
            arrayPecasVirar=arrayPecasVirar.concat(condicao)
        }
        condicao=Bottom_way(casa.I, casa.J)
        if(condicao!=false){
            arrayPecasVirar=arrayPecasVirar.concat(condicao)
        }
        condicao=Bottom_right_way(casa.I, casa.J)
        if(condicao!=false){
            arrayPecasVirar=arrayPecasVirar.concat(condicao)
        }
        if(arrayPecasVirar.length>0){
            var movimento =new Movimento(new CasaClass(casa.i, casa.j), arrayPecasVirar)
            MovimentosPossíveis.push(movimento)
        }    
      });
      if(MovimentosPossíveis.length>0){
        return MovimentosPossíveis;
      }
      else{
        return false;
      }
}

function Top_left_way(i_inicial, j_inicial){
    var array =[];

    let i=i_inicial-1
    let j =j_inicial-1 
    while(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && é_peca_adversária(i,j)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        i=i-1
        j=j-1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && !é_peca_adversária(i,j)){
        return array
    }
    else{
        return false
    }
} 

function Top_way(i_inicial, j_inicial){
    var array =[];

    let i=i_inicial-1
    let j =j_inicial 
    while(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && é_peca_adversária(i,j)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        i=i-1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && !é_peca_adversária(i,j)){
        return array
    }
    else{
        return false
    }
} 

function Top_right_way(i_inicial, j_inicial){
    var array =[];

    let i=i_inicial-1
    let j =j_inicial+1 
    while(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && é_peca_adversária(i,j)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        i=i-1
        j=j+1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && !é_peca_adversária(i,j)){
        return array
    }
    else{
        return false
    }
} 

function Left_way(i_inicial, j_inicial){
    var array =[];

    let i=i_inicial
    let j =j_inicial-1 
    while(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && é_peca_adversária(i,j)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        j=j-1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && !é_peca_adversária(i,j)){
        return array
    }
    else{
        return false
    }
}

function Right_way(i_inicial, j_inicial){
    var array =[];

    let i=i_inicial
    let j =j_inicial+1 
    while(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && é_peca_adversária(i,j)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        j=j+1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && !é_peca_adversária(i,j)){
        return array
    }
    else{
        return false
    }
} 

function Bottom_left_way(i_inicial, j_inicial){
    var array =[];

    let i=i_inicial+1
    let j =j_inicial-1 
    while(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && é_peca_adversária(i,j)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        i=i+1
        j=j-1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && !é_peca_adversária(i,j)){
        return array
    }
    else{
        return false
    }
} 

function Bottom_way(i_inicial, j_inicial){
    var array =[];

    let i=i_inicial+1
    let j =j_inicial 
    while(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && é_peca_adversária(i,j)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        i=i+1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && !é_peca_adversária(i,j)){
        return array
    }
    else{
        return false
    }
} 

function Bottom_right_way(i_inicial, j_inicial){
    var array =[];

    let i=i_inicial+1
    let j =j_inicial+1 
    while(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && é_peca_adversária(i,j)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        i=i+1
        j=j+1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia(i,j) && !é_peca_adversária(i,j)){
        return array
    }
    else{
        return false
    }
} 

function DentroDoLimite(i,j){
    return (i<8)&&(i>-1)&&(j>-1)&&(j<8)
}

function é_peca_adversária(i,j){
    return !é_casa_vazia(i,j) && matriz[i][j]!=Jogador;
}

function é_casa_vazia(i,j){
   
    return matriz[i][j]==0
}

function mudarPeca(i,j){
    if(matriz[i][j]==1)
        matriz[i][j]=2;
    else{
        matriz[i][j]=1;
    }    
}

function mudarJogador(){
    if(Jogador==1)
        Jogador=2;
    else{
        Jogador=1;
    }    
}