//chamar maquina_joga_minimax em TODAS as situações em que a máquina for jogar




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
var Jogador=1;  //1 é branco, 2 é preto
var matriz = new Array(8);
var ja_apertou_esc = 0;
var jogador_usuario = 1;
var profundidade =4; //depth do minimax;mudar para testar

matriz[0] = new Array(8);
matriz[1] = new Array(8);
matriz[2] = new Array(8);
matriz[3] = new Array(8);
matriz[4] = new Array(8);
matriz[5] = new Array(8);
matriz[6] = new Array(8);
matriz[7] = new Array(8);

// window.onkeydown = function (event) {

//     if (event.key === "Escape") {
//         if((Jogador == jogador_usuario)&&(ja_apertou_esc == 0)){
//             ja_apertou_esc =1;
//             Cria_Bloco_preto();
//         }
//     }
// }



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
    //mudarJogador();//não muda mais pq na verdade no othello se começa com preto
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

        x.appendChild(flip);
    }
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

function realizar_Movimento(array, id, pecasVirar){//refere-se ao movimento do usuário
    Retirar_Bloco_preto(array);
    adicionarPeca(id);
    pecasVirar.map((pecas, index)=>{
        let idPeca=`${pecas.I+1}_${pecas.J+1}`;
        mudarPeca(pecas.I, pecas.J)
        flip(idPeca);
    })

    mudarJogador();
    maquina_joga_minimax(profundidade);
    

    //alert("Mudança de Jogador");
}

  function realizar_Movimento_comp(id, pecasVirar){
    //id é, por exemplo, "5_6", na notação humana

        adicionarPeca(id);
                    pecasVirar.map((pecas, index)=>{
                        let idPeca=`${pecas.I+1}_${pecas.J+1}`;
                        mudarPeca(pecas.I, pecas.J)
                        flip(idPeca);
                    })
                    console.log(` no settimeout ${Jogador} ---1`)
                    mudarJogador();
                    console.log(` no settimeout ${Jogador} ---2`)


    

            
     
    
    //ja_apertou_esc = 0;//agora que é a vez do usuário ele pode apertar esc de novo
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
    
    var array = VerificaMovimentosDisponíveis();
    array.map((movimento, index) => {
        let id=`${movimento.casaPrincipal.I+1}_${movimento.casaPrincipal.J+1}`;
        //console.log(id)
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

function VerificaMovimentosDisponíveis(){
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
        return false;
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



function fim_de_jogo(){

    setTimeout(function(){

    //verificar quem ganhou
    //fazer o alert correspondente

    
    let score_brancas = 0
    let score_pretas = 0;

    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            
            if(matriz[i][j] == 1){
                score_brancas++;
            }
            else if(matriz[i][j] == 2){
                score_pretas++;
            }

        }    
    }
    
    document.getElementById("resultado").style.display="flex"
    var x = document.getElementById("valor-resultado");

    var array = document.getElementsByClassName("fliper")
    for (let index = 0; index < array.length; index++) {
        array[index].style.display="none";
        
    }

    
                       
                        
                    
    if(score_brancas>score_pretas){
        if(jogador_usuario==1){
            x.innerHTML= "Você Ganhou!!!"
            
        }
        if(jogador_usuario==2){
            x.innerHTML="Você Perdeu!!!"
        }
    }

    else if(score_pretas>score_brancas){
        if(jogador_usuario==2){
            x.innerHTML="Você Ganhou!!!"
        }
        if(jogador_usuario==1){
            x.innerHTML="Você Perdeu!!!"
        }

    }

    else{
        x.innerHTML = "Empate!!";
    }

    },1500);

    
}


function escolherDificuldade(dificuldade){
    document.getElementById("back-dificuldade").style.display="none";
    profundidade=dificuldade;
    if(Jogador == 1){ //se o jogador escolheu brancas, a máquina começa
      mudarJogador();
      maquina_joga_minimax(profundidade);
    }
    else{
    if(Jogador == 2){ //se o jogador escolheu pretas, ele começa
        setTimeout(function() {
            Cria_Bloco_preto();   
                
            }, 500);
        
    }}


}

 function iniciar(valor){
 

    document.getElementById("back-escolher").style.display="none";
    Jogador = valor;
    jogador_usuario = Jogador;
    document.getElementById("back-dificuldade").style.display="flex";


    //alert(`${jogador_usuario}`);

    
    

    
}

//MINIMAX A PARTIR DAQUI





function minimax_simples(matrix, depth, jogador){


    //a função recebe o tabuleiro "matrix" num estado que é depois de um certo movimento realizado
    //pelo adversário do jogador "jogador"

    //ToDo:
    //1. realizar_Movimento_minimax(jogador, matrix, movimento); lembrar de usar copia_matriz logo no começo
    
    //alert("vai pro if do caso base");
    if((depth == 0) || (VerificaMovimentosDisponíveisMinimax(jogador, matrix) == false)){

        return calcScoreGeral(matrix); 

    }
    //alert("passou do if do caso base");

    if(jogador == 2){//maximizing player (preto)

        let maxEval = -65;
        let mov = VerificaMovimentosDisponíveisMinimax(jogador, matrix);
        let score =0;

        for(let i=0;i<mov.length;i++){

            let matrix2 = realizar_Movimento_minimax(jogador, matrix, mov[i]);
            //let pontuacao = calcScoreGeral(matrix2);
            let score = minimax_simples(matrix2, depth-1, 1);
            //let score_geral = calcScoreGeral(matrix2); //essa é a matriz após o movimento (mov[i])

            if(score>maxEval){
                maxEval = score;
            }

        } 

        return maxEval;

    }

    else{//jogador == 1

        let minEval = 65;
        let mov = VerificaMovimentosDisponíveisMinimax(jogador, matrix);
        let score = 0;

        for(let i=0;i<mov.length;i++){

            let matrix2 = realizar_Movimento_minimax(jogador, matrix, mov[i]);
            //let pontuacao = calcScoreGeral(matrix2);
            let score = minimax_simples(matrix2, depth-1, 2);
            //let score_geral = calcScoreGeral(matrix2);//essa é a matriz após o movimento (mov[i])

            if(score<minEval){
                minEval = score;   
            }

        } 

        return minEval;


    }


}



function maquina_joga_minimax(depth){
    
    //alert("vai verificar movimentos");
    //alert("entou em maquina joga minimax");

    let mov = VerificaMovimentosDisponíveis();
    let minEval = 65;
    let maxEval = -65;  
    let score = 0;
    //alert("verificou movimentos");
    if(mov==false){//maquina nao tem movimentos
        mudarJogador();//agora é a vez do humano
        if(VerificaMovimentosDisponíveis() == false){
            setTimeout(fim_de_jogo(),3000);
        }
        else{
            Cria_Bloco_preto()
        }
        //else o humano joga
    }

    else{
        
        
        let tam = mov.length;
        console.log(Jogador);
        let id_principal;
        let aux = copia_matriz(matriz);
        let indice_movimento = 0;

        for(let k=0;k<tam;k++){
            
            
            let matrix2 = realizar_Movimento_minimax(Jogador, aux, mov[k]);

            //let pontuacao = calcScoreGeral(matrix2);
            
            if(Jogador==2){
                
                //alert("vai chamar o minimax_simples");
                score = minimax_simples(matrix2,depth,1);
                //alert("chamou");
            
                if(score>maxEval){
                    maxEval = score;
                    indice_movimento = k;
                }
            }

            else{
                 
                score = minimax_simples(matrix2,depth,2);

                if(score<minEval){
                    minEval = score;
                    indice_movimento = k;
                }

            }
    
        }
        
        //alert("saiu do for do minimax");

        let lance = mov[indice_movimento];
        let casa = lance.casaPrincipal;
        id_principal=`${casa.I+1}_${casa.J+1}`;
        //let casa_a_flipar = lance.casasFlip[0];
        //let i = casa_a_flipar.I;
        //let j = casa_a_flipar.J;

        let time = 1200;
        if(profundidade==5)
            time=600;

        setTimeout(function() {
            realizar_Movimento_comp(id_principal, lance.casasFlip); 
            //mudarJogador();//agora é a vez do humano
            //agora que jogou é a vez do humano, a função de movimento já mudou o jogador
            console.log(Jogador)
            let mov1 = VerificaMovimentosDisponíveis(); 
                //alert("verificou movimentos");
            console.log(mov1)
            if(mov1==false){//vai ser vez do computador de novo

                mudarJogador();
                maquina_joga_minimax(depth);
            }
            else{
                setTimeout(function() {
                    Cria_Bloco_preto();   
                        
                    }, 500);
            }   

        }, time)


        
        

        
    }
   

}


function copia_matriz(matrix){
   //serve exclusivamente para copiar a matriz referente ao tabuleiro do jogo;

   let aux = new Array(8);
   for(let i=0;i<8;i++){
        aux[i] = new Array(8);
   } 

   for(let i=0; i<8;i++){
   
       for(let j=0; j<8;j++){

            aux[i][j] = matrix[i][j];
       } 

   }

   return aux;


}


function calcScoreGeral(matrix){
    
    //A convenção é que score = número de PRETAS - número de BRANCAS, nesta ordem
    //então se tem 8 pretas e 10 brancas, o score é -2
    //Assim, para efeitos de minimax, a estratégia do PRETO é MAXIMIZAR o score, 
    //e a estratégia do BRANCO é MINIMIZÁ-LO.

    let score_brancas = 0;
    let score_pretas = 0;

    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){

            if(matriz[i][j] == 1){
                score_brancas++;
            }
            else if(matriz[i][j] == 2){
                score_pretas++;
            }

        }
    }

    return score_pretas - score_brancas;

}


function VerificaMovimentosDisponíveisMinimax(jogador, matrix){
        //retorna um array de movimentos correspondentes aos
        //moimentos disponíveis de "jogador" para o tabuleiro "matrix"
        //dado. Se não houver nenhum movimento retorna false
        
         

        const array =VerificaCasasVaziasMinimax(matrix);
        //alert("verificou casas vazias");
        var MovimentosPossíveisMinimax = []

        array.map((casa, index) => {
            let arrayPecasVirar=[];
            let condicao=Top_left_way_minimax(casa.I, casa.J,jogador,matrix)
            if(condicao!=false){
                arrayPecasVirar=arrayPecasVirar.concat(condicao)
            }
            condicao=Top_way_minimax(casa.I, casa.J,jogador,matrix)
            if(condicao!=false){
                arrayPecasVirar=arrayPecasVirar.concat(condicao)
            }
            condicao=Top_right_way_minimax(casa.I, casa.J,jogador,matrix)
            if(condicao!=false){
                arrayPecasVirar=arrayPecasVirar.concat(condicao)
            }

            condicao=Left_way_minimax(casa.I, casa.J,jogador,matrix)
            if(condicao!=false){
                arrayPecasVirar=arrayPecasVirar.concat(condicao)
            }
            condicao=Right_way_minimax(casa.I, casa.J,jogador,matrix)
            if(condicao!=false){
                arrayPecasVirar=arrayPecasVirar.concat(condicao)
            }
            condicao=Bottom_left_way_minimax(casa.I, casa.J,jogador,matrix)
            if(condicao!=false){
                arrayPecasVirar=arrayPecasVirar.concat(condicao)
            }
            condicao=Bottom_way_minimax(casa.I, casa.J,jogador,matrix)
            if(condicao!=false){
                arrayPecasVirar=arrayPecasVirar.concat(condicao)
            }
            condicao=Bottom_right_way_minimax(casa.I, casa.J,jogador,matrix)
            if(condicao!=false){
                arrayPecasVirar=arrayPecasVirar.concat(condicao)
            }
            if(arrayPecasVirar.length>0){
                var movimentoMinimax =new Movimento(new CasaClass(casa.i, casa.j), arrayPecasVirar)
                MovimentosPossíveisMinimax.push(movimentoMinimax)
            }    
        });

        if(MovimentosPossíveisMinimax.length>0){
            //alert("tem movimentos");
            return MovimentosPossíveisMinimax;
        }
        else{
            return false;
        }

}


function VerificaCasasVaziasMinimax(matrix){
   //usa a matriz passada como parâmetro, em vez da matriz global

    var array = [];  
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(matrix[i][j]==0){
            var ob= new CasaClass(i,j)
                array.push(ob)
            }
        
        }   
        
    }
    return array
}



function é_peca_adversária_minimax(i,j,jogador,matrix){
    return !é_casa_vazia_minimax(i,j,matrix) && matrix[i][j]!=jogador;
}

function é_casa_vazia_minimax(i,j,matrix){
   
    return matrix[i][j]==0
}


function Top_left_way_minimax(i_inicial, j_inicial,jogador,matrix){

    //vê se tem movimento disponível nessa direção, mas usando jogador e matriz passados como parâmetro
    //em vez dos globais
    
    //alert(`entrou em top_left_way para i:${i_inicial}, j:${j_inicial}`);
    var array =[];

    let i=i_inicial-1
    let j =j_inicial-1 
    while(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && é_peca_adversária_minimax(i,j,jogador,matrix)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        i=i-1
        j=j-1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && !é_peca_adversária_minimax(i,j,jogador,matrix)){
        return array
    }
    else{

        //if(i==0 && i_inicial==1 && j_inicial==2 && j==1){
          //  alert("vai retornar false");
        //}

        return false;
    }
} 




function Top_way_minimax(i_inicial, j_inicial,jogador,matrix){

   
    //alert("entrou em top_way");

    var array =[];

    let i=i_inicial-1
    let j =j_inicial 
    while(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && é_peca_adversária_minimax(i,j,jogador,matrix)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        i=i-1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && !é_peca_adversária_minimax(i,j,jogador,matrix)){
        return array
    }
    else{
        return false
    }
} 

function Top_right_way_minimax(i_inicial, j_inicial,jogador,matrix){

   

    //alert("entrou em top_right_way");

    var array =[];

    let i=i_inicial-1
    let j =j_inicial+1 
    while(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && é_peca_adversária_minimax(i,j,jogador,matrix)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        i=i-1
        j=j+1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && !é_peca_adversária_minimax(i,j,jogador,matrix)){
        return array
    }
    else{
        return false
    }
} 

function Left_way_minimax(i_inicial, j_inicial,jogador,matrix){
    
   
    //alert("entrou em left_way");
    var array =[];

    let i=i_inicial
    let j =j_inicial-1 
    while(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && é_peca_adversária_minimax(i,j,jogador,matrix)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        j=j-1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && !é_peca_adversária_minimax(i,j,jogador,matrix)){
        return array
    }
    else{
        return false
    }
}

function Right_way_minimax(i_inicial, j_inicial,jogador,matrix){
    
   
    //alert("entrou em right_way");
    var array =[];

    let i=i_inicial
    let j =j_inicial+1 
    while(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && é_peca_adversária_minimax(i,j,jogador,matrix)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        j=j+1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && !é_peca_adversária_minimax(i,j,jogador,matrix)){
        return array
    }
    else{
        return false
    }
} 

function Bottom_left_way_minimax(i_inicial, j_inicial,jogador,matrix){

    //alert("entrou em bottom_left_way");

    var array =[];

    let i=i_inicial+1
    let j =j_inicial-1 
    while(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && é_peca_adversária_minimax(i,j,jogador,matrix)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        i=i+1
        j=j-1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && !é_peca_adversária_minimax(i,j,jogador,matrix)){
        return array
    }
    else{
        return false
    }
} 

function Bottom_way_minimax(i_inicial, j_inicial,jogador,matrix){
    //alert("entrou em bottom way")
    var array =[];

   

    let i=i_inicial+1
    let j =j_inicial 
    while(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && é_peca_adversária_minimax(i,j,jogador,matrix)){
        var ob= new CasaClass(i,j)
        array.push(ob)
        i=i+1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && !é_peca_adversária_minimax(i,j,jogador,matrix)){
        return array
    }
    else{
        return false
    }
} 

function Bottom_right_way_minimax(i_inicial, j_inicial,jogador,matrix){

    //alert("entrou em bottom right way")
    
    //if(i_inicial==1 && j_inicial==2){
      //      alert("entrou bottom right 1,2");
        //}

    var array =[];

    let i=i_inicial+1
    let j =j_inicial+1 
    while(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && é_peca_adversária_minimax(i,j,jogador,matrix)){

       //if(i_inicial==1 && j_inicial==2){
         //   alert("entrou no while");
        //}

        var ob= new CasaClass(i,j)
        array.push(ob)
        i=i+1
        j=j+1
    }
    if(DentroDoLimite(i,j) && !é_casa_vazia_minimax(i,j,matrix) && !é_peca_adversária_minimax(i,j,jogador,matrix)){
        //if(i==2 && i_inicial==1 && j_inicial==2 && j==3){
          //  alert("vai retornar movimento bottom right");
        //}
        return array
    }
    else{

       // if(i==2 && i_inicial==1 && j_inicial==2 && j==3){
         //   alert("vai retornar false bottom right");
        //}
        return false
    }
}



function realizar_Movimento_minimax(jogador, matrix, movimento){
    
    //simula o "movimento" de "jogador" em uma cópia de "matrix" e retorna tal cópia 
    

    let aux = copia_matriz(matrix);
    let principal = movimento.casaPrincipal;
    let i = principal.I;
    let j = principal.J;
    aux[i][j] = jogador //coloca a peça nova no tabuleiro

    let casasFlip = movimento.casasFlip;
    let tam = casasFlip.length;
    
    for(let k=0;k<tam;k++){
        let casa = casasFlip[k];
        aux[casa.I][casa.J] = jogador; 
    }
    

    return aux;
}


/*FIM DO MINIMAX
    function maquina_joga(){//sem IA
    
    //alert("vai verificar movimentos");
    let mov = VerificaMovimentosDisponíveis();
    //alert("verificou movimentos");
    if(mov==false){//maquina nao tem movimentos
        mudarJogador();//agora é a vez do humano
        if(VerificaMovimentosDisponíveis() == false){
            fim_de_jogo();
        }
        else{
            Cria_Bloco_preto()
        }
        //else o humano joga
    }
    else{
        
        let tam = mov.length;
        console.log(Jogador)
        let id_principal;
        let aux;
        for(let k =0; k<tam;k++){
            let lance = mov[k];
            let casa = lance.casaPrincipal;
            let casa_a_flipar = lance.casasFlip[0];
            let i = casa_a_flipar.I;
            let j = casa_a_flipar.J;
            if(é_peca_adversária(i,j)){
                //
                aux=lance.casasFlip;
                id_principal=`${casa.I+1}_${casa.J+1}`; 
                break;
            }
            //else vai pra procima iteração
        }

        setTimeout(function() {
            realizar_Movimento_comp(id_principal, aux); 
            //mudarJogador();//agora é a vez do humano
            //agora que jogou é a vez do humano, a função de movimento já mudou o jogador
            console.log(Jogador)
            let mov1 = VerificaMovimentosDisponíveis(); 
                //alert("verificou movimentos");
            console.log(mov1)
            if(mov1==false){//vai ser vez do computador de novo

                mudarJogador();
                maquina_joga();
            }
            else{
                setTimeout(function() {
                    Cria_Bloco_preto();   
                        
                    }, 500);
            }   

        }, 1200)


        
        

        
    }
   

} */
