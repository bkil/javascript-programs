html = "";
subjects = {};
credits = {};
var jsonObj = {};
let nextSubjectIdx = 0;
let noticedisplayed = 0;
function getNIKsubjects(){
	// AJAX Request
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			jsonObj = JSON.parse(xhttp.responseText);
			var jsonObjl = jsonObj.length;
			for (const currentObj of jsonObj) {
				html += "<option value=" + currentObj.value + ">" +currentObj.name + "</option>";
			}
			document.getElementById("selector").innerHTML = html;
			noticedisplayed = 0; // this is for future purposes if the code needs to be expanded to handle multiple curriculums of ÓE-NIK.
		}
	}
	xhttp.open('GET', '/Kreditatlag/NIKsubjectsHUN.json', true);
	xhttp.send();
}
selectedSubject = [];
selectedCredits = [];

SubjectTable = document.getElementById("SubjectTable");

function addSubject() {
	var selectedSubjectSorted = selectedSubject.slice();
	selectedSubjectSorted.sort();
	var selector = document.getElementById("selector");
	var selectedObject = jsonObj.find(currentObj => currentObj.value == selector.value);
	if(selectedSubject.includes(selector.value) == false) {
		document.getElementById("alert").classList.add("alert-success");
		document.getElementById("alert").classList.remove("alert-danger");
		document.getElementById("alert").innerHTML = "A tantárgy felvéve a táblába!";
		var row = SubjectTable.insertRow();
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		cell1.innerHTML = selectedObject.semester;
		cell2.innerHTML = selectedObject.name;
		cell3.innerHTML = selectedObject.specialization;
		cell4.innerHTML = selectedObject.credit;
		selectedCredits.push(selectedObject.credit);
		selectedSubject.push(selector.value);
		if(isDark == 1) cell5.innerHTML = "<div class='input-group mb-3'><input type='number' class='form-control bg-dark text-white' min='1' max='5' name='numbers' oninput='calculate(selectedCredits);calculateCreditIndex();' id='" + "subj" + selector.value + "'></div>";
		else cell5.innerHTML = "<div class='input-group mb-3'><input type='number' class='form-control' min='1' max='5' name='numbers' oninput='calculate(selectedCredits);calculateCreditIndex();' id='" + "subj" + selector.value + "'></div>";
		cell6.innerHTML = "<button class='btn btn-danger' onclick='deleteRow(this);calculate(selectedCredits);calculateCreditIndex();'>Törlés</button>";
	  }
	else{
		document.getElementById("alert").classList.remove("alert-success");
		document.getElementById("alert").classList.add("alert-danger");
		document.getElementById("alert").innerHTML = "A tantárgy már szerepel a táblában!";
	  }
}	
function addCustomSubject(){
	nextSubjectIdx += 1;
	let uniquespec = document.getElementById("uniquespec");
	let uniquesemester = document.getElementById("uniquesemester");
	let uniquesubject = document.getElementById("uniquesubject");
	let uniquecredit = document.getElementById("uniquecredit");
	if(selectedSubject.includes(uniquesubject.value) == false && uniquecredit.value > 0 && uniquecredit.value < 51 && uniquesemester.value != "" && uniquesubject.value != ""){
		document.getElementById("alert").classList.add("alert-success");
		document.getElementById("alert").classList.remove("alert-danger");
		document.getElementById("alert").innerHTML = "A tantárgy felvéve a táblába!";
		var row = SubjectTable.insertRow();
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		cell1.innerHTML = uniquesemester.value;
		cell2.innerHTML = uniquesubject.value;
		if(uniquespec.value == "") cell3.innerHTML = "nincs";
		else cell3.innerHTML = uniquespec.value;
		cell4.innerHTML = uniquecredit.value;
		selectedCredits.push(Number(uniquecredit.value));
		selectedSubject.push(uniquesubject.value);
		if(isDark == 1) cell5.innerHTML = "<div class='input-group mb-3'><input type='number' class='form-control bg-dark text-white' min='1' max='5' name='numbers' oninput='calculate(selectedCredits);calculateCreditIndex();' id='" + "subj" + nextSubjectIdx + "'></div>";
		else cell5.innerHTML = "<div class='input-group mb-3'><input type='number' class='form-control' min='1' max='5' name='numbers' oninput='calculate(selectedCredits);calculateCreditIndex();' id='" + "subj" + nextSubjectIdx + "'></div>";
		cell6.innerHTML = "<button class='btn btn-danger' onclick='deleteRow(this);calculate(selectedCredits);calculateCreditIndex();'>Törlés</button>";
	}
	else{
		document.getElementById("alert").classList.remove("alert-success");
		document.getElementById("alert").classList.add("alert-danger");
		if (selectedSubject.includes(uniquesubject.value)){
			document.getElementById("alert").innerHTML = "A tantárgy már szerepel a táblában!";
		}
		else if(uniquesemester.value == "" && uniquesubject.value == ""){
			document.getElementById("alert").innerHTML = "Kérlek írj valamit a félévhez és a tantárgyhoz!";
		}
		else if(uniquesemester.value == ""){
			document.getElementById("alert").innerHTML = "Kérlek írj valamit félévnek!";
		}
		else if(uniquesubject.value == ""){
			document.getElementById("alert").innerHTML = "Kérlek írj valamit tantárgynak!";
		}
		else{
			document.getElementById("alert").innerHTML = "Tantárgy kreditje 1 és 50 közöttinek kell lennie!";
		}
	}
}
function deleteRow(r) {
	var i = r.parentNode.parentNode.rowIndex - 1; 
	document.getElementById("SubjectTable").deleteRow(i);
	selectedCredits.splice(i,1);
	selectedSubject.splice(i,1);
}
var numOfAllCredits = 0;
function clearSubjects(){
	document.getElementById("SubjectTable").innerHTML = "";
	selectedSubject = [];
	selectedCredits = [];
}
var sumOfTheCreditTimesGrade = 0;
var sumOfSucceededCredits = 0;
var numOfAllCredits = 0;
var wronginput = 0;
var calchtml = "";
function calculate(data) {
	calchtml = "";
	numOfAllCredits = 0;
//this is the first part to calculate the all credits taken
	
	for(var i = 0; i < data.length; i++){
		numOfAllCredits += data[i];
	}
	sumOfTheCreditTimesGrade = 0;
	sumOfSucceededCredits = 0;
//this is the second part to calculate the credits done and the average.
	var inputs = document.getElementsByName("numbers");
	var semester = document.getElementById("semester");
	var prevCredits = document.getElementById("prevCredits");
	wronginput = 0;
	for (var i = 0; i < inputs.length; i++) {
		if(inputs[i].value < 6 && inputs[i].value > 0 && inputs[i].value != 1 && semester.value > 0 && semester.value < 13 && prevCredits.value >= 0 && prevCredits.value <= 1000 && prevCredits.value != "") {
				sumOfTheCreditTimesGrade += inputs[i].value * selectedCredits[i];
				sumOfSucceededCredits += selectedCredits[i];
		}
		else if(inputs[i].value == 1 && semester.value > 0 && semester.value < 13 && prevCredits.value >= 0 && prevCredits.value <= 1000 && prevCredits.value != "") wronginput = 0;
		else{wronginput = 1;}
	}
	var weightedAvg = sumOfTheCreditTimesGrade/sumOfSucceededCredits;
	calchtml += "<p>Összes felvett kredit: " + numOfAllCredits + "</p><p>Megszerzett kredit: "+ sumOfSucceededCredits + "</p><p>Felvett tantárgyak száma az aktuális félévben: " + selectedSubject.length + "</p><p>Súlyozott tanulmányi átlag: " + roundTo(weightedAvg,2) + "</p>";
}
function roundTo(num,places) {    
    return +(Math.round(num + "e+" + places)  + "e-" + places);
}
function calculateCreditIndex(){
	var semester = document.getElementById("semester");
	var prevCredits = document.getElementById("prevCredits");
	var calc = document.getElementById('calculate');
	var calculateCreditIdx = document.getElementById("calculateCreditIdx");
	if(sumOfTheCreditTimesGrade > 0 && wronginput == 0){
		var creditIndex = (sumOfTheCreditTimesGrade / 30);
		var correctedCreditIndex = (sumOfSucceededCredits / numOfAllCredits) * creditIndex;
		var succeededCredits = sumOfSucceededCredits + Number(prevCredits.value);
		var expectedCredits = 30*semester.value;
		var expectedCreditsRatio = succeededCredits / expectedCredits;
		var scholarshipIndex = creditIndex * expectedCreditsRatio;
		document.getElementById("alert").classList.add("alert-success");
		document.getElementById("alert").classList.remove("alert-danger");
		document.getElementById("alert").innerHTML = "Számolás...";
		calc.classList.add("alert");
		calc.classList.add("alert-info");
		calc.innerHTML = calchtml;
		calculateCreditIdx.classList.add("alert");
		calculateCreditIdx.classList.add("alert-info");
		calculateCreditIdx.innerHTML = "<p>Kreditindex: " + roundTo(creditIndex,2) + "</p><p>Korrigált kreditindex: " + roundTo(correctedCreditIndex,2) + "</p><p>Ösztöndíj-mutató: " + roundTo(scholarshipIndex,2) + "</p>";
	}
	else { 
		document.getElementById("alert").classList.add("alert-danger");
		document.getElementById("alert").classList.remove("alert-success");
		document.getElementById("alert").innerHTML = "Rossz bemenet vagy az összes tárgyad bukó, emiatt nem tud az app számolni neked!";
		calc.classList.remove("alert");
		calc.classList.remove("alert-info");
		calc.innerHTML = "";
		calculateCreditIdx.classList.remove("alert");
		calculateCreditIdx.classList.remove("alert-info");
		calculateCreditIdx.innerHTML = "";
	}
}
var isDark = 0;
function changeTheme(){
	var body= document.body;
	var theme = document.getElementById("theme");
	var selector = document.getElementById("selector");
	if(isDark == 0) {theme.innerHTML = "Világos témára váltás"; isDark = 1;}
	else {theme.innerHTML = "Sötét témára váltás"; isDark = 0;}
	body.classList.toggle("bg-dark");
	body.classList.toggle("text-white");
	selector.classList.toggle("bg-dark");
	selector.classList.toggle("text-white");
	SubjectTable.classList.toggle("table-striped");
	SubjectTable.classList.toggle("table-dark");

	var inputfields = document.getElementsByTagName("input");
	//toggling dark mode for input fields which exist already
	if(isDark == 1){
		for (let i = 0; i < inputfields.length; i++) {
			inputfields[i].classList.add("bg-dark");
			inputfields[i].classList.add("text-white");
		}
	}
	else{
		for (let i = 0; i < inputfields.length; i++) {
			inputfields[i].classList.remove("bg-dark");
			inputfields[i].classList.remove("text-white");
		}
	}
	
}