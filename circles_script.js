//window.onload = main();


//let meta=document.createElement("meta");
//meta.charset="UTF-8";

//document.getElementsByTagName("head")[0].appendChild(meta);




var count_blue = 0;
var count_red = 0;
var count_yellow = 0;

function desaparecer(id){
	//alert("chamou desaparecer");
	document.getElementById(id).style.display = "none";
}


function create_circle(){
	let value = Math.floor(Math.random()*101); 
	let resto = value%3;
	let tipo  = "none";
	let estilo = "width:130px; height: 130px; border-radius: 50%; float: left; margin-right: 50px; margin-bottom: 10px;";
	
	if(resto== 0){
		count_blue += 1;
  		tipo = "blue-circle"+String(count_blue);
  		estilo = estilo+"background-color: blue;"
  		//alert("azul");
	}

	if(resto== 1){
  		count_red += 1;
  		tipo = "red-circle"+String(count_red);
  		estilo = estilo+"background-color: red;"
  		//alert("vermelho");

	}

	if(resto== 2){
  		count_yellow += 1;
  		tipo = "yellow-circle"+String(count_yellow);
  		estilo = estilo+"background-color: yellow;"
  		//alert("amarelo");
	}

	let circulo  = document.createElement("div");
	circulo.class = "circle";
	circulo.id = tipo;
    circulo.style = estilo;
    //circulo.setAttribute('onclick', `desaparecer(${tipo})`);
    let texto_onclick = "desaparecer('";
    texto_onclick = texto_onclick+tipo+"')";
    
    circulo.setAttribute('onclick', texto_onclick);
    //circulo.style.display = "block"; 
    


	let corpo = document.body;
	corpo.appendChild(circulo);


}

function reaparecer(){
  
  let id = "blue-circle";
  let i=0;

  for(i=1;i<=count_blue;i++){
    id = "blue-circle" + String(i);
    document.getElementById(id).style.display = "block";
    
  }

  id = "red-circle";
  for(i=1;i<=count_red;i++){
    id = "red-circle" + String(i);
    document.getElementById(id).style.display = "block";
  }

  id = "yellow-circle";
  for(i=1;i<=count_yellow;i++){
    id = "yellow-circle" + String(i);
    document.getElementById(id).style.display = "block";
  }


}




window.onload = function(){
	//alert("atualizou1")

	//alert(Document.body.id);

	//let texto = document.getElementsByTagName("meta").charset;
	//alert(texto);



    let texto_h1 = "Disappearing circles"
    let h1 = document.createElement("h1");
    h1.innerHTML = texto_h1;
    h1.style = "text-align:center";

    let subtitulo = "Clique nos círculos para que eles desapareçam. Você também pode adicionar círculos e tornar todos os círculos visíveis novamente";
    let p = document.createElement("p");
    p.innerHTML = subtitulo;
    p.style = "text-align:center";
    

    let botao = document.createElement("input");
	botao.id="botao";
	botao.type = "button";
	//botao.onclick = "create_circle()"
	botao.style = "text-align:center;margin-right: 10px;";
	botao.value="Adicionar círculo";
	botao.setAttribute('onclick', "create_circle()");

	let botao2 = document.createElement("input");
	botao2.id="botao2";
	botao2.type = "button";
	//botao2.onclick = "reaparecer()"
	botao2.style = "text-align:center";
	botao2.value="Mostrar círculos novamente";
	botao2.setAttribute('onclick', "reaparecer()");

	let div = document.createElement("div");
	div.id="div_botao";
	div.style = "text-align:center";
    div.appendChild(botao);
    div.appendChild(botao2);

    let corpo = document.body;
    corpo.appendChild(h1);
    corpo.appendChild(p);
    corpo.appendChild(div);

    //let botao_funcional = document.getElementById("botao");
    //botao.funcional.onclick = create_circle();
    //alert("passou");

    //let div_botao = document.getElementById("div_botao");
    //div_botao.appendChild(botao);
    //corpo.appendChild(botao);
    //document.getElementById("botao").onclick = create_circle();

    
    let br = document.createElement("br");
    let br1 = document.createElement("br");
    let br2 = document.createElement("br");
    let br3 = document.createElement("br");
    corpo.appendChild(br);
    corpo.appendChild(br1);
    corpo.appendChild(br2);
    corpo.appendChild(br3);
    //document.write("<br>")

    let num_circulos = 3;

    for(let i=0;i<num_circulos;i++){
     	create_circle();
     }

	/*let css = document.createElement("style");
	css.type = "text/css";
    css.innerHTML = `.circle {
                width: 130px;
                height: 130px;
                border-radius: 50%;
                float: left;
                margin-right: 50px;
            }
            #red-circle {
                background-color: red;
            }
            #blue-circle {
                background-color: blue;
            }
            #yellow-circle {
                background-color: yellow;
            }`;
    let cabeca = document.head;
    cabeca.appendChild(css);
    */
    
    

	//document.body.innerHTML = "<p> TESTE </p>";



}

