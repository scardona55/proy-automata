//Importamos los elementos que vamos a necesotar para la carga de archivos
let form = document.querySelector('#cargarAutomata');
let file = document.querySelector('#file');
let autom = {};

//Empezamos con las funciones que nos pide el proyecto
//Para la opcion de subida, evita que se recargue la pagina 
form.addEventListener('submit', handleSubmit);

//Creacion del grafico para nuestro automata 
let estado = document.createElement('div');
estado.setAttribute('class','mermaid');
estado.setAttribute('id','grafico1');
estado.textContent='grafico TD;'
//Aca
document.body.append(estado)
//Se crea el estado que sera el encargado de guardar la informaicon que necesitamos para la graficacion del automata
//con la libreria de mermaid 

//Funcion que nos permite leer el archivo del automaa que subimos
function LeerAutomata(event){
	autom = JSON.parse(event.target.result);
	document.getElementById("text_Autom").innerHTML = JSON.stringify(autom);
	if (autom) {
		//Creamos el automata
		crearAutom(autom)
		//Hallamos el reverso del automata
		console.log("reverso")
		reverso(autom)
	}
}

function crearAutom(autom){
	
	console.log(autom, "Nuestro Automata")

	let estado1 = document.getElementById("grafico1")
	//estado.append("o --> p;")
	console.log(estado1," ensayo graficacion automata")
	document.body.append(estado1)

}

function reverso(autom){
	let reversoAutom = autom
	let newInitial = reversoAutom.initial
	reversoAutom.initial=reversoAutom.final
	reversoAutom.final=newInitial
	if(reversoAutom.final.length == 1){
		 for (let i = 0; i < reversoAutom.transition.length; i++) {
			 let transition = reversoAutom.transition[i]
			 let nuevoFrom = transition.from
			 transition.from = transition.to
			 transition.to = nuevoFrom
			 nuevoFrom = ""
		 }
	}
	console.log(reversoAutom)
	
	
	

}


function handleSubmit(event){

	// colabora evitando que se nos recargue la pagina cada vez que cargemos un archivo 
	event.preventDefault();

	// Nos evalua el archivo; si no es valido lo ignora 
	if (!file.value.length) return;

	//si es un archivo valido entramos a nuestras funciones
	let reader = new FileReader();

	reader.onload = LeerAutomata;
	//convertir el json a archivo de texto
	reader.readAsText(file.files[0]);
}