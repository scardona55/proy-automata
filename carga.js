//Importamos los elementos que vamos a necesotar para la carga de archivos
let form = document.querySelector('#cargarAutomata');
let file = document.querySelector('#file');
let form2 = document.querySelector('#cargarAutomata2');
let file2 = document.querySelector('#file2');
let carga = document.querySelector('#cargarUnion');
let cargaRever = document.querySelector('#cargarReverso');
let cargaCompl = document.querySelector('#cargarComplemento');
let autom = {};

//Empezamos con las funciones que nos pide el proyecto
//Para la opcion de subida, evita que se recargue la pagina 
form.addEventListener('submit', cargar1);
form2.addEventListener('submit', cargar2);
carga.addEventListener('submit', cargar3);
cargaRever.addEventListener('submit', cargar4);
cargaCompl.addEventListener('submit', cargar5);
//Creacion del grafico para nuestro automata 
let estado = document.createElement('div');
estado.setAttribute('class','mermaid');
estado.setAttribute('id','grafico1');
//let _codeSyntax= "graph TD;";




document.body.append(estado)
//Se crea el estado que sera el encargado de guardar la informaicon que necesitamos para la graficacion del automata
//con la libreria de mermaid 

//Funcion que nos permite leer el archivo del automata que subimos
function LeerAutomata(event){
	autom = JSON.parse(event.target.result);
	document.getElementById("text_Autom").innerHTML = JSON.stringify(autom);
	if (autom) {
		//Creamos el automata
		//crearAutom(autom)
		
		//Hallamos el reverso del automata
		//console.log("reverso")
		//reverso(autom)

		//union(text_Autom.value,text_Autom2.value);
		//	
	automatacompleto(autom)
	}
}
function LeerAutomata2(event){
	autom = JSON.parse(event.target.result);
	document.getElementById("text_Autom2").innerHTML = JSON.stringify(autom);
	if (autom) {
		//Creamos el automata
		crearAutom(autom)
		
		//Hallamos el reverso del automata
		//console.log("reverso")
		//reverso(autom)
		complemento(autom)
		//reversar(autom)
		//	
		//union(autom)
	}
}
function crearUnir(event){
	autom = JSON.parse(event.target.result);
	document.getElementById("text_Autom").innerHTML = JSON.stringify(autom);
	if (autom) {
		//Creamos el automata
		//crearAutom(autom)
			
		union(autom,autom)
	}
}

function crearReverso(event){
	autom = JSON.parse(event.target.result);
	document.getElementById("text_Autom2").innerHTML = JSON.stringify(autom);
	if (autom) {
		//Creamos el automata
		//crearAutom(autom)
		reverso(autom)
	}
}

function crearCompl(event){
	autom = JSON.parse(event.target.result);
	document.getElementById("text_Autom").innerHTML = JSON.stringify(autom);
	if (autom) {
		//Creamos el automata
		//crearAutom(autom)
		complemento(autom)
	}
}
function botoncomplemento(){
	console.log("botonsito");
	let botonsito=document.getElementById("complemento");
	botonsito.addEventListener('click',complemento(autom))
}



function reverso(automata){
	// evita que se nos recargue la pagina cada vez que cargemos un archivo 
	event.preventDefault();
	let reversoAutomata= autom;
    if(automata.final.length>1){
        let lenguaje= automata.lenguage;
        lenguaje.push("landa");
        reversoAutomata.lenguage=lenguaje;
        let nuevosestado=automata.states;
        nuevosestado.push("estadonuevo");
        reversoAutomata.states=nuevosestado;
        reversoAutomata.initial="estadonuevo";
        let transtemp=automata.transition;
        for(let i=0; i<automata.final.length;i++){
            let objecttemp={};
            objecttemp.event= "landa";
            objecttemp.from=automata.final[i];
            objecttemp.to="estadonuevo";
            transtemp.push(objecttemp)
            console.log(automata.final[i]);
        }
        reversoAutomata.transition=transtemp;
	}
        reversoAutomata.final= autom.initial;

    
    console.log(reversoAutomata);
	reversoAutomata.initial=reversoAutomata.final
	console.log(reversoAutomata.final.length)
	if(reversoAutomata.final.length == 1){
		for (let i = 0; i < reversoAutomata.transition.length; i++) {
			let transition = reversoAutomata.transition[i]
			let nuevoFrom = transition.from
			transition.from = transition.to
			transition.to = nuevoFrom
			nuevoFrom = ""
		}
	}
	console.log(reversoAutomata)
}


/* function reversar(automata){
	let reversoAutomata= automata
	reversoAutomata
} */


function cargar1(event){

	// evita que se nos recargue la pagina cada vez que cargemos un archivo 
	event.preventDefault();

	// Nos evalua el archivo; si no es valido lo ignora 
	if (!file.value.length) return;

	//si es un archivo valido entramos a nuestras funciones
	let reader = new FileReader();

	reader.onload = LeerAutomata;
	//convertir el json a archivo de texto
	reader.readAsText(file.files[0]);
}

function cargar2(event){

	// evita que se nos recargue la pagina cada vez que cargemos un archivo 
	event.preventDefault();

	// Nos evalua el archivo; si no es valido lo ignora 
	if (!file2.value.length) return;

	//si es un archivo valido entramos a nuestras funciones
	let reader = new FileReader();

	reader.onload = LeerAutomata2;
	//convertir el json a archivo de texto
	reader.readAsText(file2.files[0]);
}

function cargar3(event){

	// evita que se nos recargue la pagina cada vez que cargemos un archivo 
	event.preventDefault();

	// Nos evalua el archivo; si no es valido lo ignora 
	if (!file.value.length) return;

	//si es un archivo valido entramos a nuestras funciones
	let reader = new FileReader();

	reader.onload = crearUnir;
	//convertir el json a archivo de texto
	reader.readAsText(file.files[0]);
}

function cargar4(event){

	// evita que se nos recargue la pagina cada vez que cargemos un archivo 
	event.preventDefault();

	// Nos evalua el archivo; si no es valido lo ignora 
	if (!file.value.length) return;

	//si es un archivo valido entramos a nuestras funciones
	let reader = new FileReader();

	reader.onload = crearReverso;
	//convertir el json a archivo de texto
	reader.readAsText(file.files[0]);
}

function cargar5(event){

	// evita que se nos recargue la pagina cada vez que cargemos un archivo 
	event.preventDefault();

	// Nos evalua el archivo; si no es valido lo ignora 
	if (!file.value.length) return;

	//si es un archivo valido entramos a nuestras funciones
	let reader = new FileReader();

	reader.onload = crearCompl;
	//convertir el json a archivo de texto
	reader.readAsText(file.files[0]);
}

function union(automata1, automata2){
	const objetoautomata= {name:`${automata1.name}${automata2.name}`}
	const states =[];
	const finals =[];
	console.log((automata2.states.length));
	console.log(automata2);
	for(let i=0; i<(automata1.states.length);i++){
		for(let j=0; j<(automata2.states.length);j++){
			let x =`${automata1.states[i]}${automata2.states[j]}`;
			if(automata1.final.includes(automata1.states[i]) || automata2.final.includes(automata2.states[i])){
				finals.push(x)
			}
			states.push(x)
		}
	}
	objetoautomata.states= states;
	objetoautomata.lenguage= automata1.lenguage;
	console.log(objetoautomata)
	
	const initial = `${automata1.states[0]}${automata2.states[0]}`;
	objetoautomata.initial=initial;
	objetoautomata.final=finals;

	const transiciones=[];
	for(let k= 0; k< automata1.lenguage.length;k++){
		const transicion={};
		transicion.event=`[${automata1.lenguage[k]}]`
		for(let i=0; i<(automata1.states.length);i++){
			for(let j=0; j<(automata2.states.length);j++){
				console.log(automata2.transition[i].from)
					const fromauto = `${automata1.transition[i].from}${automata2.transition[j].from}`
					const toauto = `${automata1.transition[i].to}${automata2.transition[j].to}`
					transicion.from=fromauto;
					transicion.to=toauto;
					transiciones[j]= transicion;
					console.log(transicion);
					objetoautomata.transition=transiciones;
					console.log("union")
					console.log(objetoautomata)
			}
		}

	}
	
	console.log(objetoautomata);


}

function reverso2(automata){
    let reversoAutomata= automata;
    if(automata.final.length>1){
        let lenguaje= automata.lenguage;
        lenguaje.push("landa");
        reversoAutomata.lenguage=lenguaje;
        let nuevosestado=automata.states;
        nuevosestado.push("estadonuevo");
        reversoAutomata.states=nuevosestado;
        reversoAutomata.initial="estadonuevo";
        let transtemp=automata.transition;
        for(let i=0; i<automata.final.length;i++){
            let objecttemp={};
            objecttemp.event= "landa";
            objecttemp.from=automata.final[i];
            objecttemp.to="estadonuevo";
            transtemp.push(objecttemp)
            console.log(automata.final[i]);
        }
        reversoAutomata.transition=transtemp;
	}
        reversoAutomata.final= autom.initial;

    
    console.log(reversoAutomata);
} 

function automatacompleto(automata){
	let arraytemp=[];
	for(let i = 0; i<automata.states.length;i++){
		let reviso = automata.transition.filter(property=>property.from == automata.states[i])
		for(let j = 0; j<automata.lenguage.length;j++){
			console.log(reviso[i].event[i])
			console.log(automata.lenguage[j])
			if(!reviso[i].event[i] == (automata.lenguage[j])){
				console.log(automata.states[j])
				let objecttemp={};
				objecttemp.event=automata.lenguage[i];
				objecttemp.from=reviso[i].from;
				objecttemp.to="sumidero";
				arraytemp.push(objecttemp)
				console.log(arraytemp)
				automata.push(arraytemp)
			}
		}
	}
}


function complemento(automata){
	let complementoAutomata = automata
	let estados = complementoAutomata.states
	let finales=complementoAutomata.final
	let estadostemporales=complementoAutomata.final
	let finalestemporales=[];
	for(let i =0; i<(automata.states.length);i++){
		if(!finales.includes(automata.states[i])){
			finalestemporales.push(estados[i])
		}else{
			continue;
		}
	}
	complementoAutomata.final=finalestemporales;
	complementoAutomata.normalstates=estadostemporales;
	console.log(complementoAutomata, "complemento")
	}

	function crearGrafico($code){
		let graph = document.getElementById("grafico");
	
		let insert = function ($code)
		{
			graph.innerHTML = $code;
		}
	
		mermaid.render("preparedScheme", $code, insert);
	}
	
	/* function crearAutom(autom){
		_codeSyntax = _codeSyntax
		crearGrafico(_codeSyntax);
	
	} */