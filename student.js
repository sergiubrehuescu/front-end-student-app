const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);
const studentId = urlParams.get("id");
console.log(studentId);

deptToday = document.querySelector("#deptToday");
deptMonth = document.querySelector("#deptMonth");
MonthPay = document.querySelector("#MonthPay");
remainingPay = document.querySelector("#remainingPay");
payed = document.querySelector("#payed");
tabstudent1 = document.querySelector("#tab-student-1");

avatar=document.querySelector("#avatar");
tabStudentName=document.querySelector("#tab-student-name");
tabStudentLanguage=document.querySelector("#tab-student-language");
tablestudent = document.querySelector('#tablestudent');

let URLcancelSession = "http://localhost:8090/session/remove/";
let URLpaySession = "http://localhost:8090/session/pay/";
let URLunpaySession = "http://localhost:8090/session/unpay/";
let URLfindStudent = "http://localhost:8090/student/";
let URLstatisticsStudent = "http://localhost:8090/statistics/student/";
let URLstatisticsPaidSessions = 'http://localhost:8090/statistics/getPaidSessions/';
let URLstatisticsNotPaidSession = 'http://localhost:8090/statistics/getNotPaidSession/';
let URLstatisticsNotPaidSessions = 'http://localhost:8090/statistics/getNotPaidSessions/';

schedulerStudent();

async function paySession(idSession){
  const response_pay_session = await fetch(URLpaySession+idSession,{
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    }
});
//todo.......
 // console.log(idSession.parentNode.nodeName);
  //setColorPayment(true,payment);
  const data_pay_student = await response_pay_session.json();
  console.log(data_pay_student);
}

async function unpaySession(idSession){
  console.log(idSession);
  const response_unpay_session = await fetch(URLunpaySession+idSession,{
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    }
});
  const data_unpay_student = await response_unpay_session.json();
  console.log(data_unpay_student);
}

async function cancelSession(idSession){
  const response_delete_session = await fetch(URLcancelSession+idSession,{
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json'
    }
});
  const data_delete_student = await response_delete_session.json();
  console.log(data_delete_student);
}

  async function updateTable(month,year){

    tableSelectedMonth.innerHTML ="";

    const response_paidSessionsSelectedMonth = await fetch(URLstatisticsPaidSessions + studentId + "/" + month + "/" + year);
    const response_unpaidSessionsSelectedMonth = await fetch(URLstatisticsNotPaidSessions + studentId + "/" + month + "/" + year);
    
    const data_paidSessionsSelectedMonth = await response_paidSessionsSelectedMonth.json();
    const data__unpaidSessionsSelectedMonth = await response_unpaidSessionsSelectedMonth.json();
    console.log(data__unpaidSessionsSelectedMonth);

    extractSessions(data_paidSessionsSelectedMonth,tableSelectedMonth);
    extractSessions(data__unpaidSessionsSelectedMonth,tableSelectedMonth);
  }


async function schedulerStudent(){
  const response_student = await fetch(URLfindStudent+studentId);
  const response_status = await fetch(URLstatisticsStudent+studentId);
  const response_paidSessions = await fetch(URLstatisticsPaidSessions+studentId);
  const response_unpaidSession = await fetch(URLstatisticsNotPaidSession+studentId);

  const data_student = await response_student.json();
  const data_status = await response_status.json();
  const data_paidSessions = await response_paidSessions.json();
  const data__unpaidSession = await response_unpaidSession.json(); 

  infoStudent(data_student);
  infoStatusCurentMonth(data_status);
  extractSessions(data_paidSessions,tablestudent);
  extractSessions(data__unpaidSession,tablestudent);
}

  function infoStatusCurentMonth(info){
    deptToday.innerText=info.deptToday;
    deptMonth.innerText=info.deptMonth;
    MonthPay.innerText=info.monthPay;
    remainingPay.innerText=info.remainingPay;
    payed.innerText=info.payed;
  }

  function infoStudent(data_student){
    if(data_student.gender === 'MALE')
        avatar.setAttribute("src" , male[setAvatar(data_student.gender)].url);
    else if (data_student.gender == 'FEMALE')
        avatar.setAttribute("src" , female[setAvatar(data_student.gender)].url);
    tabStudentName.innerHTML =data_student.studentContactDetailsDto.firstName + " " + data_student.studentContactDetailsDto.lastName;
    tabStudentLanguage.innerHTML =data_student.sessions[0].languageProgramming + " programming";
    console.log(data_student.sessions[0].languageProgramming);
  }

  function extractSessions(sessions,table){

    for ( let i=0 ; i<sessions.length ; i++){
      console.log(sessions[i]);
    idSession=sessions[i].idSession;

    let tr = createElem("tr");

    let id = createElem("th");
    let date = createElem("td");
    let duration = createElem("td");
    let language = createElem("td");
    let hourPrice = createElem("td");
    let payment = createElem("td");
    let amount = createElem("td");
    let actions = createElem("td");

    let cancel = createElem("a");
    let pay = createElem("a");
    let unpay = createElem("a");
    let edit = createElem("a");

    let idDiv = createElem("div");
    let dateDiv = createElem("div");
    let durationDiv = createElem("div");
    let languageDiv = createElem("div");
    let hourPriceDiv = createElem("div");
    let paymentDiv = createElem("div");
    let amountDiv = createElem("div");

    let idSpan = createElem("span");
    let dateSpan = createElem("span");
    let durationSpan = createElem("span");
    let languageSpan = createElem("i");
    let hourPrinceSpan = createElem("span");
    let paymentSpan = createElem("i");
    let amountSpan = createElem("span");

    idSpan.classList.add("material-icons");
    dateSpan.classList.add("material-icons");
    durationSpan.classList.add("material-icons");
    languageSpan.classList.add("material-icons");
    hourPrinceSpan.classList.add("material-icons");
    paymentSpan.classList.add("material-icons");
    amountSpan.classList.add("material-icons");

    idSpan.textContent = "note_add";
    idSpan.setAttribute("style", "font-size: 55px; color:#264653;");

    setDate(dateSpan);

    amountSpan.textContent = "euro_symbol";
    amountSpan.setAttribute("style", "font-size: 55px; color:#524912;");


    cancel.classList.add("btn", "btn-danger", "custom-elem");
    pay.classList.add("btn", "btn-warning","custom-elem");
    unpay.classList.add("btn", "btn-info","custom-elem");
    edit.classList.add("btn", "btn-success","custom-elem");
    
    ap(cancel, text("Cancel"));
    ap(pay, text("Pay"));
    ap(unpay, text("Unpay"));
    ap(edit, text("Edit"));

    cancel.setAttribute("onclick" ,`cancelSession(${idSession})`)
    pay.setAttribute("onclick" ,`paySession(${idSession})`)
    unpay.setAttribute("onclick" ,`unpaySession(${idSession})`)
    edit.setAttribute("onclick" ,`cancelSession(${idSession})`)

    let idText = text(idSession);
    let dateText = text(sessions[i].localDate);
    let durationText = text(sessions[i].duration);
    let languageText = text(sessions[i].languageProgramming);
    let hourPriceText = text(sessions[i].pricePerHour);
    let paymentText = text(sessions[i].paid);
    let amountText = text(sessions[i].duration*sessions[i].pricePerHour/60);

    selectSpanLanguage(languageText,languageSpan);
    languageSpan.setAttribute("style", "font-size: 55px; color:#e91912;");
    selectSpanPayment(sessions[i].paid,paymentSpan);



    setColorPayment(sessions[i].paid,payment);

    ap(idDiv,idText);
    ap(dateDiv,dateText);
    ap(durationDiv,durationText);
    ap(languageDiv,languageText);
    ap(hourPriceDiv,hourPriceText);
    ap(paymentDiv,paymentText);
    ap(amountDiv,amountText);

    ap(id,idDiv);
    ap(id,idSpan);
    ap(id,dateSpan);
    ap(date,dateDiv);
    ap(date,dateSpan);
    ap(duration,durationDiv);
    ap(duration,durationSpan);
    ap(language,languageDiv);
    ap(language,languageSpan);
    ap(hourPrice,hourPriceDiv);
    ap(hourPrice,hourPrinceSpan);
    ap(payment,paymentDiv);
    ap(payment,paymentSpan);
    ap(amount,amountDiv);
    ap(amount,amountSpan);
    ap(actions,cancel);
    ap(actions,pay);
    ap(actions,unpay);
    ap(actions,edit);

    ap(tr,id);
    ap(tr,date);
    ap(tr,duration);
    ap(tr,language);
    ap(tr,hourPrice);
    ap(tr,payment);
    ap(tr,amount);
    ap(tr,actions);
    ap(table,tr);

    }
}

function setColorPayment(statusPayment,payment)
{
  if(statusPayment === false)
  payment.setAttribute("style", "background-color:#ff0018;")
  else payment.setAttribute("style", "background-color:#41a712;")
}

function createElem(type){
  return document.createElement(type);
}

function text(text){
  return document.createTextNode(text);
}

function ap(father, child){
  father.appendChild(child);
}


function setDate(dateSpan)
{
  dateSpan.classList.add("far","fa-calendar-alt"); 
  dateSpan.setAttribute("style", "font-size: 55px; color:#457b9d;");
}

function selectSpanLanguage(language,languageSpan){
  let languageText = language.textContent.toString().toUpperCase();
  switch(languageText){
    case 'JAVA':
      languageSpan.classList.add("fab","fa-java");
      break;
    case 'SPRINGBOOT':
      languageSpan.classList.add("fas","fa-leaf");
      break;
    case 'JAVASCRIPT':
      languageSpan.classList.add("fab","fa-js-square");
      break;
    case 'C':
      languageSpan.classList.add("fab","fa-cuttlefish");
        break;
    case 'PYTHON':
      languageSpan.classList.add("fab","fa-python");
        break;
    default:
      languageSpan.classList.add("fas","fa-code");
  }
}


function selectSpanPayment(statusPayment,paymentSpan)
{
  if(statusPayment === false){
    paymentSpan.classList.add("fas","fa-times-circle");
    paymentSpan.setAttribute("style", "color:#e91913; font-size:55px;");

  }
  else{
    paymentSpan.classList.add("fas","fa-check-circle");
    paymentSpan.setAttribute("style","color:#1fcc1f; font-size:55px");
  }
} 



formAddStudent.addEventListener("submit",function(event){
  event.preventDefault();
  console.log("In form");
   mystudentdata={
     "studentContactDetails":  {
         "firstName": firstName.value,
         "lastName": lastName.value,
         "phoneNumber": phoneNumber.value,
         "email": email.value
     },
     "age": age.value,
     "dateOfBirth": dateOfBirth.value,
     "gender": checkGender(gender),
     "cnp": cnp.value,}
    console.log(mystudentdata);
    addStudent(mystudentdata);
})