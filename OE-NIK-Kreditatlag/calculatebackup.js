html = "";
selectedSubject = [];
selectedCredits = [];
for(var key in subjects) {
	html += "<option value=" + key + ">" +subjects[key] + "</option>"
}
SubjectTable = document.getElementById("SubjectTable");
document.getElementById("selector").innerHTML = html;
let isItInTable = function (arr, x) { 
	let start=0, end=arr.length-1; 
	while (start<=end){ 
		let mid=Math.floor((start + end)/2);
		if (arr[mid]===x) return true; 
		else if (arr[mid] < x) start = mid + 1;
		else end = mid - 1; 
	}
	return false; 
}
function addSubject() {
	var selectedSubjectSorted = selectedSubject.slice();
	selectedSubjectSorted.sort();
	var selector = document.getElementById("selector");
	if(isItInTable(selectedSubjectSorted, selector.value) == 0 && selector.value != "subjchoose" && selector.value != "1st" && selector.value != "2nd" && selector.value != "3rd" && selector.value != "4th" && selector.value != "5th" && selector.value != "6th" && selector.value != "7th" && selector.value != "IOT" && selector.value != "BigData" && selector.value != "Cloud" && selector.value != "Software") {
		document.getElementById("alert").classList.add("alert-success");
		document.getElementById("alert").classList.remove("alert-danger");
		document.getElementById("alert").innerHTML = "Subject added to the table!";
		var row = SubjectTable.insertRow();
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		cell1.innerHTML = subjects[selector.value];
		cell2.innerHTML = credits[selector.value];
		selectedCredits.push(credits[selector.value]);
		selectedSubject.push(selector.value);
		if(isDark == 1) cell3.innerHTML = "<div class='input-group mb-3'><input type='number' class='form-control bg-dark text-white' min='1' max='5' name='numbers' oninput='calculate(selectedCredits);calculateCreditIndex();' id='" + "subj" + selector.value + "'></div>";
		else cell3.innerHTML = "<div class='input-group mb-3'><input type='number' class='form-control' min='1' max='5' name='numbers' oninput='calculate(selectedCredits);calculateCreditIndex();' id='" + "subj" + selector.value + "'></div>";
		cell4.innerHTML = "<button class='btn btn-danger' onclick='deleteRow(this);calculate(selectedCredits);calculateCreditIndex();'>Delete</button>";
	  }
	else if (selector.value == "subjchoose" || selector.value == "1st" || selector.value == "2nd" || selector.value == "3rd" || selector.value == "4th" || selector.value == "5th" || selector.value == "6th" || selector.value == "7th" || selector.value == "IOT" || selector.value == "BigData" || selector.value == "Cloud" || selector.value == "Software"){
		document.getElementById("alert").classList.remove("alert-success");
		document.getElementById("alert").classList.add("alert-danger");
		document.getElementById("alert").innerHTML = "This only helps you navigate.";
	}
	else{
		document.getElementById("alert").classList.remove("alert-success");
		document.getElementById("alert").classList.add("alert-danger");
		document.getElementById("alert").innerHTML = "The subject is already in the table!";
	  }
}	
let nextSubjectIdx = subjects.length;
function addCustomSubject(){
	nextSubjectIdx += 1;
	let uniquesubject = document.getElementById("uniquesubject");
	let uniquecredit =document.getElementById("uniquecredit");
	if(isItInTable(selectedSubject,uniquesubject.value) == 0 && uniquecredit.value > 0){
		document.getElementById("alert").classList.add("alert-success");
		document.getElementById("alert").classList.remove("alert-danger");
		document.getElementById("alert").innerHTML = "Subject added to the table!";
		var row = SubjectTable.insertRow();
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		cell1.innerHTML = uniquesubject.value;
		cell2.innerHTML = uniquecredit.value;
		selectedCredits.push(Number(uniquecredit.value));
		selectedSubject.push(uniquesubject.value);
		if(isDark == 1) cell3.innerHTML = "<div class='input-group mb-3'><input type='number' class='form-control bg-dark text-white' min='1' max='5' name='numbers' oninput='calculate(selectedCredits);calculateCreditIndex();' id='" + "subj" + nextSubjectIdx + "'></div>";
		else cell3.innerHTML = "<div class='input-group mb-3'><input type='number' class='form-control' min='1' max='5' name='numbers' oninput='calculate(selectedCredits);calculateCreditIndex();' id='" + "subj" + nextSubjectIdx + "'></div>";
		cell4.innerHTML = "<button class='btn btn-danger' onclick='deleteRow(this);calculate(selectedCredits);calculateCreditIndex();'>Delete</button>";
	}
	else if (isItInTable(selectedSubject,uniquesubject.value) == 1){
		document.getElementById("alert").classList.remove("alert-success");
		document.getElementById("alert").classList.add("alert-danger");
		document.getElementById("alert").innerHTML = "The subject is already in the table!";
	}
	else{
		document.getElementById("alert").classList.remove("alert-success");
		document.getElementById("alert").classList.add("alert-danger");
		document.getElementById("alert").innerHTML = "Credit cannot be zero or less!";
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
		if(inputs[i].value < 6 && inputs[i].value > 0 && inputs[i].value != 1 && semester.value > 0 && semester.value < 8 && prevCredits.value >= 0) {
				sumOfTheCreditTimesGrade += inputs[i].value * selectedCredits[i];
				sumOfSucceededCredits += selectedCredits[i];
		}
		else if(inputs[i].value == 1 && semester.value > 0 && semester.value < 8 && prevCredits.value >= 0) wronginput = 0;
		else{wronginput = 1;}
	}
	var weightedAvg = sumOfTheCreditTimesGrade/sumOfSucceededCredits;
	calchtml += "<p>All taken credits: " + numOfAllCredits + "</p><p>Achieved credits: "+ sumOfSucceededCredits + "</p><p>Numbers of subjects taken in the current semester: " + selectedSubject.length + "</p><p>Weighted academic average: " + roundTo(weightedAvg,2) + "</p>";
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
		document.getElementById("alert").innerHTML = "Calculating...";
		calc.classList.add("alert");
		calc.classList.add("alert-info");
		calc.innerHTML = calchtml;
		calculateCreditIdx.classList.add("alert");
		calculateCreditIdx.classList.add("alert-info");
		calculateCreditIdx.innerHTML = "<p>Credit index: " + roundTo(creditIndex,2) + "</p><p>Adjusted credit index: " + roundTo(correctedCreditIndex,2) + "</p><p>Stipend index: " + roundTo(scholarshipIndex,2) + "</p>";
	}
	else { 
		document.getElementById("alert").classList.add("alert-danger");
		document.getElementById("alert").classList.remove("alert-success");
		document.getElementById("alert").innerHTML = "Bad input or all your subjects are failed, that's why the app can't calculate for you!";
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
	if(isDark == 0) {theme.innerHTML = "Change to light theme"; isDark = 1;}
	else {theme.innerHTML = "Change to dark theme"; isDark = 0;}
	body.classList.toggle("bg-dark");
	body.classList.toggle("text-white");
	selector.classList.toggle("bg-dark");
	selector.classList.toggle("text-white");
	SubjectTable.classList.toggle("table-striped");
	SubjectTable.classList.toggle("table-dark");

	var inputfields = document.getElementsByTagName("input");
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