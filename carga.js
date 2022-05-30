//Importamos los elementos que vamos a necesotar para la carga de archivos
let form = document.querySelector('#cargarAutomata');
let file = document.querySelector('#file');
let autom = {};

// nuestro listener para los objetos que traemos con eol cargar archivo
form.addEventListener('submit', handleSubmit);


//Ahora deberemos crear la funcion que nos lea el automata
function LeerAutoma(event){
	autom = JSON.parse(event.target.result);
	document.getElementById("text_Autom").innerHTML = JSON.stringify(autom);
	if (autom) {
		crearAutoma(autom)
	}
}







function lecturaAutomata(event){
	automata = JSON.parse(event.target.result);
	document.getElementById("txt_inp").innerHTML = JSON.stringify(automata);
	if (automata) {
		creacionAutomata(automata)
		reversoAutomata(automata)
	}
}

//Graph creation
let state = document.createElement('div');
state.setAttribute('class','mermaid');
state.setAttribute('id','graph1');
state.textContent='graph TD;'

//AObject
var myCar = {
    make: 'Ford',
    model: 'Mustang',
    year: 1969
};

function hola(){
	state.append(myCar.make,';')
	state.append(myCar.model)
	for (let i = 0; i < 7; i++) {
		
	}
}
hola()



document.body.append(state)





console.log(document.body.childNodes);
$(document).ready(function(){
	mermaid.initialize({ startOnLoad: true });
});

function handleSubmit(event){

	// Stop the form from reloading the page
	event.preventDefault();

	// If there's no file, do nothing
	if (!file.value.length) return;

	let reader = new FileReader();

	reader.onload = lecturaAutomata;
	reader.readAsText(file.files[0]);
}




function creacionAutomata(automata){
	
	console.log("hello world", automata)

	let state1 = document.getElementById("graph1")
	state.append("a --> b;")
	
	console.log(state1,"perris")
	document.body.append(state1)

}

function reversoAutomata(automata){
	let revAut = automata
	let nuevoInicial = revAut.initial
	revAut.initial=revAut.final
	revAut.final=nuevoInicial
	if(revAut.final.length == 1){
		 for (let i = 0; i < revAut.transition.length; i++) {
			 let transicion = revAut.transition[i]
			 let nuevoFrom = transicion.from
			 transicion.from = transicion.to
			 transicion.to = nuevoFrom
			 nuevoFrom = ""
			 console.log(typeof(transicion), transicion, "DESPUES")
			 
		 }
	}
	
	
	

}