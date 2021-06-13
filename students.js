
let tableStudents = document.querySelector('#table-students');

let firstName=document.querySelector("#firstName");
let lastName=document.querySelector("#lastName");
let phoneNumber=document.querySelector("#phoneNumber");
let email=document.querySelector("#email");
let age=document.querySelector("#age");
let gender=document.getElementsByName("gender");
let dateOfBirth=document.querySelector("#dateOfBirth");

let firstNameUpdate=document.querySelector("#firstNameUpdate");
let lastNameUpdate=document.querySelector("#lastNameUpdate");
let phoneNumberUpdate=document.querySelector("#phoneNumberUpdate");
let emailUpdate=document.querySelector("#emailUpdate");
let ageUpdate=document.querySelector("#ageUpdate");
let genderUpdate=document.getElementsByName("genderUpdate");
let dateOfBirthUpdate=document.querySelector("#dateOfBirthUpdate");
let cnpUpdate=document.querySelector("#cnp");

let URLaddStudent = "http://localhost:8090/student/add";
let URLlistStudentsAll = "http://localhost:8090/student/listStudentsAll";
let URLdeleteStudent = "http://localhost:8090/student/remove/";
let URLupdateStudent = "http://localhost:8090/student/update";
let data_listStudents = [];
let idStudent;

let listContainer = document.querySelector('.list-container');
let listList = document.querySelector('.list-list');

schedulerStudents();

  async function schedulerStudents(){
    const response_listStudents = await fetch(URLlistStudentsAll);
    data_listStudents = await response_listStudents.json();
    data_listStudents.forEach((student) => {
      loadStudent(student);
    });
    console.log(data_listStudents);
  }

  async function addStudent(myDataObject){
    const student = await fetch(URLaddStudent,{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myDataObject)
  });
    const data_add_Student = await student.json();
    console.log(data_add_Student);
  }

  async function deleteStudent(idStudent){
    const response_delete_session = await fetch(URLdeleteStudent+idStudent,{
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      }
  });
    const data_delete_student = await response_delete_session.json();
    console.log(data_delete_student);
  }

  async function updateStudent(mystudentdata){
    const response_update_student = await fetch(URLupdateStudent,{
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mystudentdata)
  });
      const data_update_student = await response_update_student.json();
      console.log(data_update_student);
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

formUpdateStudent.addEventListener("submit",function(event){
  event.preventDefault();
  console.log("In form update");
  mystudentdata={
    "id": idStudent,
    "studentContactDetails":{
        "firstName": firstNameUpdate.value,
        "lastName": lastNameUpdate.value,
        "phoneNumber": phoneNumberUpdate.value,
        "email": emailUpdate.value
    },
    "age": ageUpdate.value,
    "dateOfBirth": dateOfBirthUpdate.value,
    "gender": checkGender(genderUpdate),
    "cnp": cnpUpdate.value,
  }
   updateStudent(mystudentdata);
})

function checkGender(gen){
    console.log("Aici" , gen);
    for(i=0;i<gen.length;i++){
        if(gen[i].checked){
            console.log(gen[i].value);
            return gen[i].value.toUpperCase();
        }
    }
}

// function todo(){
//     //event.preventDefault();
//     const todoDiv=createElem('div');
//     todoDiv.classList.add('todo');
//     const newTodo=createElem('li');
//     newTodo.innerText='aaaaaa  ';
//     newTodo.classList.add('todo-item');
//     todoDiv.appendChild(newTodo);

//     const newTodo2=createElem('li');
//     newTodo2.innerText='aaaaaa ';
//     newTodo2.classList.add('todo-item');
//     todoDiv.appendChild(newTodo2);

//     const completedbutton=createElem('button');
//     completedbutton.innerText = 'bt';
//     completedbutton.classList.add('complete-btn');
//     todoDiv.appendChild(completedbutton);

//     const delbutton=createElem('button');
//     delbutton.innerText = 'bt';
//     delbutton.classList.add('del-btn');
//     todoDiv.appendChild(delbutton);
//     listList.appendChild(todoDiv);
// }

function loadStudent(student){
    let tr = createElem("tr");
    let id = createElem("th");
    let name = createElem("td");
    let lastName = createElem("td");
    let email = createElem("td");
    let actions = createElem("td");
    let view = createElem("a");
    let del = createElem("a");
    let edit = createElem("button");

    let firstNameOut=student.studentContactDetailsDto.firstName;
    let lastNameOut=student.studentContactDetailsDto.lastName;
    let emailOut=student.studentContactDetailsDto.email;

    let idText = text(student.id);
    let nameText = text(firstNameOut);
    let lastNameText = text(lastNameOut);
    let emailText = text(emailOut);

    view.classList.add("btn", "btn-secondary");
    del.classList.add("btn", "btn-danger");
    edit.classList.add("btn", "btn-success");
    edit.addEventListener("click", function(){
      let element = event.target.parentNode.parentNode;
      console.log(element);
      //firstNameUpdate.value = firstName.textContent;
      idStudent = Number(element.firstChild.textContent);
      console.log(idStudent);
      let student = data_listStudents.filter(student => student.id == idStudent)[0];
      console.log(student);
        firstNameUpdate.value=student.studentContactDetailsDto.firstName;
        lastNameUpdate.value=student.studentContactDetailsDto.lastName
        phoneNumberUpdate.value=student.studentContactDetailsDto.phoneNumber;
        emailUpdate.value=student.studentContactDetailsDto.email;
        ageUpdate.value=student.age;
        genderUpdate.value=student.gender;
        dateOfBirthUpdate.value=student.dateOfBirth;
    })
    edit.setAttribute("data-toggle", "modal");
    edit.setAttribute("data-target", "#modalUpdate");
    view.setAttribute("style", `background-color:darkorange`);
    del.setAttribute("style",  `background-color:#e80b20`);
    edit.setAttribute("style",  `background-color:#17a2b8`);

    view.setAttribute("href", `student.html?id=${student.id}`);
    del.setAttribute("onclick" , `deleteStudent(${student.id})`);
    del.setAttribute('id' , student.id);
    edit.setAttribute('id', student.id);

    ap(id,idText);
    ap(name,nameText);
    ap(lastName,lastNameText);
    ap(email,emailText);
    ap(view, text("View"));
    ap(del, text("Delete"));
    ap(edit, text("Edit"));

    ap(tr,id);
    ap(tr,name);
    ap(tr,lastName);
    ap(tr,email);
    ap(actions,view);
    ap(actions,del);
    ap(actions,edit);
    ap(tr,actions);

    ap(tableStudents,tr);
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