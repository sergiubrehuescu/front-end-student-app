let tableDashboard = document.querySelector('#tableDashboard');
console.log("inside dash...");
const monthNamess = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
console.log(monthNamess[new Date().getMonth()]);



let URLstatisticsPaidSessionsDashboard = 'http://localhost:8090/statistics/monthDashboardPaid/';
//http://localhost:8090/statistics/monthDashboardPaid/MAY/2021
let URLstatisticsNotPaidSessionsDashboard = 'http://localhost:8090/statistics/monthDashboardUnpaid/';
//http://localhost:8090/statistics/monthDashboardUnpaid/MAY/2021

let URLstatisticsMonth = "http://localhost:8090/statistics/month/";
test();
let MonthIncome = document.querySelector('#MonthIncome');
let Debt = document.querySelector('#Debt');
let Payed = document.querySelector('#Payed');
let Hours = document.querySelector('#Hours');
let Aborded = document.querySelector('#Aborded');
let PotentialIncome = document.querySelector('#PotentialIncome');
let Worked = document.querySelector('#Worked');
let Sessions = document.querySelector('#Sessions');
let Payed2 = document.querySelector('#Payed2');
let Pending = document.querySelector('#Pending');
let WorkLeft = document.querySelector('#WorkLeft');

function extractSessionsDashBoard(sessions,table){

    for ( let i=0 ; i<sessions.length ; i++){
    idSession=sessions[i].idSession;

    let tr = createElem("tr");

    let id = createElem("th");
    let name = createElem("td");
    let language = createElem("td");
    let date = createElem("td");
    let payment = createElem("td");
    let amount = createElem("td");

    let idDiv = createElem("div");
    let nameDiv = createElem("div");
    let languageDiv = createElem("div");
    let dateDiv = createElem("div");
    let paymentDiv = createElem("div");
    let amountDiv = createElem("div");

    let idSpan = createElem("span");
    let nameSpan = createElem("span");
    let languageSpan = createElem("i");
    let dateSpan = createElem("i");
    let paymentSpan = createElem("i");
    let amountSpan = createElem("span");

    id.classList.add("custom-elem-th");
    name.classList.add("custom-elem-th");
    language.classList.add("custom-elem-td");
    date.classList.add("custom-elem-td");
    payment.classList.add("custom-elem-td");
    amount.classList.add("custom-elem-td");

    idSpan.classList.add("material-icons");
    nameSpan.classList.add("material-icons");

    dateSpan.classList.add("material-icons");
    paymentSpan.classList.add("material-icons");
    amountSpan.classList.add("material-icons");

    idSpan.textContent = "note_add";
    idSpan.setAttribute("style", "font-size: 55px; color:#264653;");

    nameSpan.textContent = "account_circle";
    nameSpan.setAttribute("style", "font-size: 55px; color:#f4a261;");

    setDate(dateSpan);
  
    amountSpan.textContent = "euro_symbol";
    amountSpan.setAttribute("style", "font-size: 55px; color:#524912;");

    //payment.setAttribute('id','payment'+idSession);
    let idText = text(idSession);
    let nameText = text("NAME");
    let languageText = text(sessions[i].languageProgramming);
    let dateText = text(sessions[i].localDate);
    let paymentText = text(sessions[i].paid);
    let amountText = text(sessions[i].duration*sessions[i].pricePerHour/60);

    selectSpanLanguage(languageText,languageSpan);
    languageSpan.setAttribute("style", "font-size: 55px; color:#e91912;");
    selectSpanPayment(sessions[i].paid,paymentSpan);
    //paymentSpan.setAttribute("style", "font-size: 55px; color:#e91912;");

    ap(idDiv,idText);
    ap(nameDiv,nameText);
    ap(languageDiv,languageText);
    ap(dateDiv,dateText);
    ap(paymentDiv,paymentText);
    ap(amountDiv,amountText);

    ap(id,idDiv);
    ap(id,idSpan);
    ap(name,nameDiv);
    ap(name,nameSpan);
    ap(language,languageDiv);
    ap(language,languageSpan);
    ap(date,dateDiv);
    ap(date,dateSpan);
    ap(payment,paymentDiv);
    ap(payment,paymentSpan);
    ap(amount,amountDiv);
    ap(amount,amountSpan);

    ap(tr,id);
    ap(tr,name);
    ap(tr,language);
    ap(tr,date);
    ap(tr,payment);
    ap(tr,amount);

    ap(table,tr);

    }
}

  async function updateTableDashboard(month,year){

    tableDashboard.innerHTML ="";

    const response_paidSessionsSelectedMonthDashboard = await fetch(URLstatisticsPaidSessionsDashboard + month + "/" + year);
    const response_unpaidSessionsSelectedMonthDashboard = await fetch(URLstatisticsNotPaidSessionsDashboard + month + "/" + year);
    const response_student = await fetch(URLstatisticsMonth+ month + "/" + year);
    
    const data_paidSessionsSelectedMonthDashboard = await response_paidSessionsSelectedMonthDashboard.json();
    const data__unpaidSessionsSelectedMonthDashboard = await response_unpaidSessionsSelectedMonthDashboard.json();
    const monthlyStatistics = await response_student.json();

    extractSessionsDashBoard(data_paidSessionsSelectedMonthDashboard,tableDashboard);
    extractSessionsDashBoard(data__unpaidSessionsSelectedMonthDashboard,tableDashboard);
    infoStatisticsStudent(monthlyStatistics,data__unpaidSessionsSelectedMonthDashboard,data_paidSessionsSelectedMonthDashboard);
  }

  function infoStatisticsStudent(monthlyStatistics,data__unpaidSessionsSelectedMonthDashboard,data_paidSessionsSelectedMonthDashboard){

    let hoursUnpaid=0;
    let hoursPaid=0;

    MonthIncome.innerHTML =monthlyStatistics.totalMonthIncome;
    Debt.innerHTML =monthlyStatistics.debts;
    Payed.innerHTML =monthlyStatistics.payed;
    Sessions.innerHTML =(data__unpaidSessionsSelectedMonthDashboard.length+data_paidSessionsSelectedMonthDashboard.length);
    Payed2.innerHTML=data_paidSessionsSelectedMonthDashboard.length;
    Pending.innerHTML= data__unpaidSessionsSelectedMonthDashboard.length;
    data__unpaidSessionsSelectedMonthDashboard.forEach(element => {
        hoursUnpaid +=(element.duration);
    });
    data_paidSessionsSelectedMonthDashboard.forEach(element => {
        hoursPaid +=(element.duration);
    });
    Hours.innerHTML =((hoursUnpaid+hoursPaid)/60);
    Worked.innerHTML =  hoursPaid/60;
    WorkLeft.innerHTML =  hoursUnpaid/60;
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

function setDate(dateSpan)
{
  dateSpan.classList.add("far","fa-calendar-alt"); 
  dateSpan.setAttribute("style", "font-size: 55px; color:#457b9d;");
}


function test(){
  console.log("test");
  updateTableDashboard("June",2021);
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