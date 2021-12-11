//Global variables 
var player = "player1";
let J1score = 0;
let J1nombreVictoire = 0;
let J2score = 0;
let J2nombreVictoire = 0;
let array;
let J1numberCardsPlayed = 0;
let J2numberCardsPlayed = 0;

function getImgName(elementImg){
	let img_path = elementImg.getAttribute("src");
	img_name = img_path.substring(img_path.lastIndexOf('/')+1);    
	img_name = img_name.split('.').slice(0, -1).join('.');
	return img_name;
}

function ajouterOnClick() {
	var imagesSRC = document.getElementsByTagName("img");
	for (var j=0; j<imagesSRC.length; j++)
		imagesSRC[j].setAttribute("onclick", "deplacer(this)");
}



function deplacer(elementImg) {
	const img_name = getImgName(elementImg);

	const J1plateau_siege = document.getElementById("j1siege");
	const J1plateau_dist = document.getElementById("j1dist");
	const J1plateau_corps = document.getElementById("j1corps");

	const J2plateau_siege = document.getElementById("j2siege");
	const J2plateau_dist = document.getElementById("j2dist");
	const J2plateau_corps = document.getElementById("j2corps");

	if (player == "player1"){
		if(elementImg.parentNode.id == "j1deck"){
			if (img_name == "j1corps01" ||  img_name == "j1corps02" || img_name == "j1corps03"){
				J1plateau_corps.appendChild(elementImg);
				array = document.getElementsByClassName("corps1");
				for (let i=0; i<array.length; i++){
					if (img_name == getImgName(array[i]))
						J1score += parseInt(array[i].alt);1
				}
				player = "player2";
			}
			else if (img_name == "j1siege01" ||  img_name == "j1siege02" || img_name == "j1siege03"){
				J1plateau_siege.appendChild(elementImg);
				array = document.getElementsByClassName("siege1");
				for (let i=0; i<array.length; i++){
					if (img_name == getImgName(array[i]))
						J1score += parseInt(array[i].alt);
				}
				player = "player2";
			}
			else if(img_name == "j1dist01" ||  img_name == "j1dist02" || img_name == "j1dist03" || img_name == "j1dist04"){
				J1plateau_dist.appendChild(elementImg);
				array = document.getElementsByClassName("dist1");
				for (let i=0; i<array.length; i++){
					if (img_name == getImgName(array[i]))
						J1score += parseInt(array[i].alt);
				}
				player = "player2";
			}
			J1numberCardsPlayed +=1;
		}
		else if (elementImg.parentNode.id == "j2deck")
			alert(player + " ce n'est pas votre board");
		else 
			alert(player+ " vous ne pouvez pas prendre cette carte");
	}
	else{
		if(elementImg.parentNode.id == "j2deck"){
			if (img_name == "j2corps01" ||  img_name == "j2corps02"){
				J2plateau_corps.appendChild(elementImg);
				array = document.getElementsByClassName("corps2");
				for (let i=0; i<array.length; i++){
					if (img_name == getImgName(array[i]))
						J2score += parseInt(array[i].alt);
				}
				player = "player1";
			}
			else if (img_name == "j2siege01" ||  img_name == "j2siege02"){
				J2plateau_siege.appendChild(elementImg);
				array = document.getElementsByClassName("siege2");
				for (let i=0; i<array.length; i++){
					if (img_name == getImgName(array[i]))
						J2score += parseInt(array[i].alt);
				}
				player = "player1";
			}
			else if(img_name == "j2dist01" ||  img_name == "j2dist02" || img_name == "j2dist03" || img_name == "j2dist04" || img_name == "j2dist05" || img_name == "j2dist06"){
				J2plateau_dist.appendChild(elementImg);
				array = document.getElementsByClassName("dist2");
				for (let i=0; i<array.length; i++){
					if (img_name == getImgName(array[i]))
						J2score += parseInt(array[i].alt);
				}
				player = "player1";
			}
			J2numberCardsPlayed += 1;
		}
		else if (elementImg.parentNode.id == "j1deck")
			alert(player + " ce n'est pas votre board");
		else 
			alert(player+ " vous ne pouvez pas prendre cette carte");
	}

	//Si deck vide
	if (J2numberCardsPlayed == 10 || J1numberCardsPlayed == 10){
		checkPoints();
		checkVictory();
		displayScoreVictory();
		resetDeck();
		J2numberCardsPlayed = 0;
		J1numberCardsPlayed = 0;

	}
	passer();
}

function resetDeck(){// des images ne s'affichent pas :)
	const J1deck = document.getElementById("j1deck");
	const J2deck = document.getElementById("j2deck");

	for (let i=0; i<3; i++)
		J1deck.appendChild(document.getElementsByClassName('corps1')[i]);
	for (let i=0; i<4; i++)	
		J1deck.appendChild(document.getElementsByClassName('dist1')[i]);
	for (let i=0; i<3; i++)
		J1deck.appendChild(document.getElementsByClassName('siege1')[i]);
	for (let i=0; i<2; i++)
		J2deck.appendChild(document.getElementsByClassName('corps2')[i]);
	for (let i=0; i<2; i++)
		J2deck.appendChild(document.getElementsByClassName('siege2')[i]);
	for (let i=0; i<6; i++)
		J2deck.appendChild(document.getElementsByClassName('dist2')[i]);
}
function passer() {
	document.onkeypress = function (e) {
		e = e || window.event;
		e.keyCode;	
		partie();
	};
}

function partie() {
	// function partie() s'active si l'utilisateur appuie sur random touche 
	checkPoints(); 
	checkVictory();
	displayScoreVictory();
	resetBoard();
}


function resetBoard(){
	removeImage("j1siege");
	removeImage("j1dist");
	removeImage("j1corps");
	//remet les background 
	appendImage("./img/backsiege1.jpg","j1siege");
	appendImage("./img/backdist1.jpg","j1dist");
	appendImage("./img/backcorps1.jpg","j1corps");

	removeImage("j2siege");
	removeImage("j2dist");
	removeImage("j2corps");
	appendImage("./img/backsiege2.jpg","j2siege");
	appendImage("./img/backdist2.jpg","j2dist");
	appendImage("./img/backcorps2.jpg","j2corps");
}
function checkPoints(){
	if (J1score > J2score)
		J1nombreVictoire += 1;
	else if (J1score < J2score)
		J2nombreVictoire += 1;
	else{
		J1nombreVictoire += 1;
		J2nombreVictoire += 1;
	}
}
function checkVictory(){
	if (J1nombreVictoire == J2nombreVictoire && J1nombreVictoire == 2)
		alert("DRAW");
	if(J1nombreVictoire == 2 && J2nombreVictoire != J1nombreVictoire)
		alert("VICTOIRE joueur1");
	if(J2nombreVictoire == 2 && J2nombreVictoire != J1nombreVictoire)
		alert("VICTOIRE joueur2");
}

function displayScoreVictory(){
	document.getElementById("j1score").innerHTML = J1score;
	document.getElementById("j2score").innerHTML = J2score;
	document.getElementById("j1compt").innerHTML = J1nombreVictoire;
	document.getElementById("j2compt").innerHTML = J2nombreVictoire;
}
function removeImage(id) {
	// Get the <div> element with id="j1siege"
	var elementToBeRemoved = document.getElementById(id); 
	while( elementToBeRemoved.hasChildNodes()) {
		// As long as <div> has a child node, remove it
		elementToBeRemoved.removeChild(elementToBeRemoved.firstChild);
	}
}

function appendImage(imageSource, containerId) {
    var img = document.createElement("IMG");
	img.src = imageSource;
	img.setAttribute("width", "1");
	img.setAttribute("height", "150");
    const container = document.getElementById(containerId);
    container.appendChild(img);
}
