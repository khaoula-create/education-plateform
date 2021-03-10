//function sign Up
function signUp() {
    var fName = document.getElementById('fName').value;
    var lName = document.getElementById('lName').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var cPassword = document.getElementById('cPassword').value;
    test(verifLength(fName, 4, 20), 'fNameError', 'Your First Name length should be between 4 and 20');
    test(verifLength(lName, 4, 20), 'lNameError', 'Your Last Name length should be between 4 and 20');
    test(validateEmail(email), 'emailError', 'Your email format is not Valid');
    test(verifLength(password, 8, 30), 'passwordError', 'Your password length should be between 8 and 30');
    test(password === cPassword, 'cPasswordError', 'Your Re-Type password should match your password');
    // Data Storage &&  email existance verification
    var allUsers = getAllUsers();
    var i = 0;
    var userExist = false;
    while (i < allUsers.length && !userExist) {
        userExist = allUsers[i].email === email;
        i++;
    }
    if (userExist) {
        document.getElementById('resultError').innerHTML = 'Email Exists'
    }
    else {
        document.getElementById('resultError').innerHTML = '';
        if (verifLength(fName, 4, 20) && verifLength(lName, 4, 20) && verifLength(password, 8, 30)
            && password === cPassword && validateEmail(email)) {
            var id = JSON.parse(localStorage.getItem('userSignUpId') || '1');
            //role ,class and section verification
            var ident = (email.split('@'))[1];
            switch (ident.toUpperCase()) {
                case 'START-SMART-PROF.ORG':
                    document.getElementById('identError').innerHTML = '';
                    var sections = [];
                    var checkboxes = document.querySelectorAll('input[name="profModule"]:checked');
                    for (var i = 0; i < checkboxes.length; i++) {
                        sections.push(checkboxes[i].value)
                    }
                    var classes = [];
                    checkboxes = document.querySelectorAll('input[name="profClass"]:checked');
                    for (var i = 0; i < checkboxes.length; i++) {
                        classes.push(checkboxes[i].value)
                    }
                    var user = {
                        id: id,
                        firstName: fName,
                        lastName: lName,
                        email: email,
                        password: password,
                        section: sections,
                        classe: classes,
                        role: 'prof'
                    };
                    break;
                case 'START-SMART-STUDENT.ORG':
                    document.getElementById('identError').innerHTML = '';

                    var section = document.querySelector("input[name=studentModule]:checked").value;
                    var classe = document.querySelector("input[name=studentClass]:checked").value;
                    var user = {
                        id: id,
                        firstName: fName,
                        lastName: lName,
                        email: email,
                        password: password,
                        section: section,
                        classe: classe,
                        role: 'student'
                    };
                    break;
                case 'START-SMART-ADMIN.ORG':
                    document.getElementById('identError').innerHTML = '';

                    var user = {
                        id: id,
                        firstName: fName,
                        lastName: lName,
                        email: email,
                        password: password,
                        role: 'admin'
                    };
                    break;
                default:
                    document.getElementById('identError').innerHTML = 'You are not abale to sign up with this email';
                    break;
            }
            allUsers.push(user);
            localStorage.setItem('userSignUpId', id + 1);
            localStorage.setItem('allUsers', JSON.stringify(allUsers));
            var fullStackJS = {
                name: 'fullStackJS',
                subjects: ['HTML', 'CSS', 'JavaScript', 'Angular'],
                coeff: [2, 2, 3, 3],
            };
            var dataScience = {
                name: 'dataScience',
                subjects: ['Python', 'Machine Learning', 'DeepLearning'],
                coeff: [2, 3, 3]
            };
            var digitalMarketing = {
                name: 'digitalMarketing',
                subjects: ['Communication', 'Social Media'],
                coeff: [3, 2]
            }
            var modules = [fullStackJS, dataScience, digitalMarketing];
            localStorage.setItem('modules', JSON.stringify(modules));
            location.replace('login.html');
        }
    }
}
function test(verif, ch1, ch2) {
    if (verif) {
        document.getElementById(ch1).innerHTML = ''
    }
    else {
        document.getElementById(ch1).innerHTML = ch2
    }
}
//function length verification
function verifLength(ch, min, max) {
    if (ch.length < min || ch.length > max) {
        return false;
    }
    else {
        return true;
    }
}
//function email format verification
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//function get all Users from local storage
function getAllUsers() {
    return (JSON.parse(localStorage.getItem('allUsers') || '[]'))
}
//Case OF User : Prof / Student / Admin 
function userIdentity() {
    var email = document.getElementById('email').value;
    var ident = (email.split('@'))[1];
    var moduleSection = ``;
    var classeSection = ``;
    //Prof Section
    if (validateEmail(email)) {
        if (ident.toUpperCase() === 'START-SMART-PROF.ORG') {
            moduleSection = `
        <label class="text-black" for="fname">Module</label>
        <div id='checkBoxModule'>
            ${checkBox("profModule", "fullStackJS", "FullStack JS")}
            ${checkBox("profModule", "dataScience", "dataScience")}
            ${checkBox("profModule", "digitalMarketing", "Digital Marketing")}
        </div>`;
            classeSection = `
        <label class="text-black" for="fname">Class</label> 
        <div>
            ${checkBox("profClass", "1", 1)}
            ${checkBox("profClass", "2", 2)}
        </div>`;
        }
        //Student Section
        else if (ident.toUpperCase() === 'START-SMART-STUDENT.ORG') {
            moduleSection = `
        <label class="text-black" for="fname">Module</label>
        <div>
            ${radioButton("studentModule", "fullStackJS", "FullStack JS")}
            ${radioButton("studentModule", "fullStackJS", "Data Science")}
            ${radioButton("studentModule", "digitalMarketing", "Digital Marketing")}
        </div>`;
            classeSection = `
            <label class="text-black" for="fname">Class</label>
            <div>
                ${radioButton("studentClass", "1", 1)}
                ${radioButton("studentClass", "2", 2)}
            </div>`;
        }
        document.getElementById('moduleSection').innerHTML = moduleSection;
        document.getElementById('classeSection').innerHTML = classeSection;
    }
}
function radioButton(name, value, name2) {
    if (name.indexOf("answers") !== -1) {
        namelo = JSON.parse(localStorage.getItem('Answer'))
        var ch = `
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name=${name}  value=${value}>
            <label class="form-check-label">${namelo}</label>
        </div>`;  
    }
    else {
        var ch = `
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name=${name}  value=${value}>
            <label class="form-check-label">${name2}</label>
        </div>`;  
    }
   
    return (ch)
}
function checkBox(name, value, name2) {
    var ch = `
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" name=${name}  value=${value}>
        <label class="form-check-label" >${name2}</label>
    </div>`;
    return (ch)
}
//function log in
function logIn() {
    var email = document.getElementById('logInEmail').value;
    var password = document.getElementById('logInPassword').value;
    if (email === '' || password === '') {
        document.getElementById('logInError').innerHTML = 'Please enter your email and your password'
    }
    else {
        document.getElementById('logInError').innerHTML = '';
        if (!validateEmail(email)) {
            document.getElementById('logInError').innerHTML = 'Please verify your email format'
        }
        else {
            document.getElementById('logInError').innerHTML = '';
            var allUsers = getAllUsers();
            var i = 0;
            while (i < allUsers.length) {
                if (allUsers[i].email === email && allUsers[i].password === password) {
                    var user = allUsers[i];
                    break;
                };
                i++;
            }
            if (user) {
                document.getElementById('logInError').innerHTML = '';
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                switch (user.role) {
                    case 'student':
                        location.replace("studentSpace.html");
                        break;
                    case 'prof':
                        location.replace('profSpace.html');
                        break;
                    case 'admin':
                        location.replace('adminSpace.html');
                        break;
                }
            }
            else {
                document.getElementById('logInError').innerHTML = 'Please verify your email or your password'
            }
        }
    }
}
//function display logged in user name
function wlc() {
    var user = JSON.parse(localStorage.getItem('loggedInUser'));
    var welcome = `Welcome  ${user.firstName} ${user.lastName}`;
    switch (user.role) {
        case 'student':
            document.getElementById('wlc1').innerHTML = welcome;
            break;
        case 'prof':
            document.getElementById('wlc2').innerHTML = welcome;
            break;
        case 'admin':
            document.getElementById('wlc3').innerHTML = welcome;
            break;
    }
}
//function search user by id
function searchById(id) {
    allUsers = getAllUsers();
    var i = 0;
    while (i < allUsers.length && allUsers[i].id !== id) {
        i++;
    }
    return (allUsers[i])
}
//Student Space Functions
//Functions Simulator
function displaySimulator() {
    var user = JSON.parse(localStorage.getItem('loggedInUser'));
    var modules = JSON.parse(localStorage.getItem('modules'));
    for (var i = 0; i < modules.length; i++) {
        if (user.section === modules[i].name) {
            subjects = modules[i].subjects;
            coefs = modules[i].coeff;
        }
    };
    localStorage.setItem('loggedInCoefs', JSON.stringify(coefs));
    var displaySimulator = `
    <div class="">
            <h2 class="mb-4 text-center">Calculate Your Approximate Average </h2>
            <form action="#" class="p-4 border rounded">`
    for (var i = 0; i < subjects.length; i++) {
        displaySimulator += `
              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label class="text-black" for="fname">${subjects[i]}</label>
                  <input type="number" id="note${i}" class="form-control" required >
                  <span class=" alert text-danger small" id="noteError${i}"></span>
                </div>
              </div>`
    }
    displaySimulator += `
                <div class="row form-group">
                    <div class="col-md-12 text-center">
                        <input type="button" value="Calculate" data-toggle="modal" data-target="#exampleModalCenter" onclick="moy(${(subjects.length)})" class="btn px-4 btn-primary text-white">
                    </div>
                </div>
            </form>
        <div>
        <span id='modal'></span>
    </div>
</div > `
    document.getElementById('simulator').innerHTML = displaySimulator;
}
function somCoefs(coefs) {
    var som = 0;
    for (var i = 0; i < coefs.length; i++) {
        som += coefs[i];
    }
    return som;
}
function moy(nbr) {
    var coefs = JSON.parse(localStorage.getItem('loggedInCoefs'));
    var modules = [];
    var moyenne = 0;
    var valid = true;
    for (var i = 0; i < nbr; i++) {
        modules.push(document.getElementById(`note${i}`).value);
        if (modules[i] < 0 || modules[i] > 20) {
            document.getElementById(`noteError${i}`).innerHTML = 'Please enter a value between 0 and 20';
        }
        else {
            document.getElementById(`noteError${i}`).innerHTML = '';
            moyenne += modules[i] * coefs[i];
        }
    }
    moyenne = moyenne / somCoefs(coefs);
    for (var i = 0; i < nbr; i++) {
        if (modules[i] >= 0 && modules[i] <= 20) {
            valid += true;
        }
    }
    if (valid) {
        var modal = `
            <!-- Modal -->
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Calculate</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Your Average is : 
                    <span id='moyenne'></span>
                    <br>
                    Your Mention is :
                    <span id='mention'></span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>`;
        document.getElementById('modal').innerHTML = modal;
        document.getElementById('moyenne').innerHTML = moyenne;
        if (moyenne >= 0 && moyenne < 8) {
            document.getElementById('mention').innerHTML = 'Echec'
            document.getElementById('mention').style.color = 'red'

        }
        else if (moyenne >= 8 && moyenne < 10) {
            document.getElementById('mention').innerHTML = ' Low'
            document.getElementById('mention').style.color = 'orange'
        }
        else if (moyenne > 10 && moyenne < 13) {
            document.getElementById('mention').innerHTML = 'Pretty Good'
            document.getElementById('mention').style.color = 'yellow'
        }
        else if (moyenne > 13 && moyenne < 16) {
            document.getElementById('mention').innerHTML = 'Good'
            document.getElementById('mention').style.color = 'green'
        }
        else if (moyenne > 16 && moyenne < 18) {
            document.getElementById('mention').innerHTML = 'Very Good'
            document.getElementById('mention').style.color = '#CCFFE5'
        }
        else if (moyenne >= 18 && moyenne <= 20) {
            document.getElementById('mention').innerHTML = ' Excellent'
            document.getElementById('mention').style.color = '#006600'
        }
    }
}
// function tab student 2  ; display Notes 
function displayNotes() {
    var student = JSON.parse(localStorage.getItem('loggedInUser'));
    var allNotes = JSON.parse(localStorage.getItem('allNotes'));
    var i = 0;
    while (i < allNotes.length && allNotes[i].studentId !== student.id) {
        i++;
    }
    if (allNotes[i].studentId === student.id) {
        notes = allNotes[i].notes;
        var modules = JSON.parse(localStorage.getItem('modules'));
        for (var i = 0; i < modules.length; i++) {
            if (student.section === modules[i].name) {
                subjects = modules[i].subjects;
            }
        };
        var displayNote = `
        <div class="container border border-success rounded  ">
        <h3 class=" bg-light text-center">${(student.section)} Marks</h3> `;
        for (i = 0; i < subjects.length; i++) {
            displayNote += `
          <div class="text-center">${subjects[i]} : ${notes[i]}</div> 
        `
        }
        displayNote += `</div>`;
    }
    document.getElementById('notesConsulting').innerHTML = displayNote;
}
//function display Absences List for student 
function displayAbsencesList() {
    var ab_Att_St_List = JSON.parse(localStorage.getItem('ab_Att_St_List') || '[]');
    var student = JSON.parse(localStorage.getItem('loggedInUser'));
    if (verifStudentExistance(ab_Att_St_List, student.id)) {
        var absentList = `
        <div class='row  justify-content-center'>
        <div class="card" style="width: 18rem;">
            <div class="card-header text-center h4">
                Days List
            </div>
            <ul class="list-group list-group-flush">`
        var i = 0;
        while (i < ab_Att_St_List.length) {
            if (ab_Att_St_List[i].studentId === student.id) {
                for (j = 0; j < (ab_Att_St_List[i].absent).length; j++) {
                    absentList += `
                    <li class="text-center">${j + 1} :  ${(ab_Att_St_List[i].absent)[j]} </li>`
                }
                absentList += `
                    <li class=' list-group-item bg-light '>
                        Your Total Absences is : ${(ab_Att_St_List[i].absent).length} 
                        <br><span id='eliminated' class='text-danger'></span>
                    </li>`
                if ((ab_Att_St_List[i].absent).length > 5) {
                    document.getElementById('eliminated').innerHTML = 'We are sorry , Your are Eliminated '
                }
                break;
            }
            i++;
        }
        absentList += `
                </ul>
            </div>
        </div>`
        document.getElementById('absencesList').innerHTML = absentList;
    }
}
//student tab 4 : quizz
function displayQuizz() {
    var student = JSON.parse(localStorage.getItem('loggedInUser'));
    var allQuizzes = getAllQuizzes();
    if (allQuizzes.length !== 0) {
        var quizzdisplay = `
        <div class="container border border-success">
            <h1 class="text-center  bg-light ">Quizz</h1>
            
        `;
        for (var i = 0; i < allQuizzes.length; i++) {
            if (allQuizzes[i].section === student.section && allQuizzes[i].class === student.classe) {
                for (var j = 0; j < (allQuizzes[i].questions).length; j++) {
                    localStorage.setItem('Answer',JSON.stringify(allQuizzes[i].questions[j].rightAnswer))
                    quizzdisplay += `
                    <div class=" m-2">
                    <div class="accordion-item ">
                    <h3 class="mb-0 heading">
                      <a class="btn-block h2" data-toggle="collapse" href="#collapseFive" role="button" 
                      aria-expanded="true" aria-controls="collapseFive">${allQuizzes[i].questions[j].question} ?<span class="icon"></span></a>
                    </h3>
                    <div id="collapseFive" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="body-text row">
                      <div class='col-2'>
                        ${radioButton(`answers${i}${j}`, `${allQuizzes[i].questions[j].rightAnswer}`, `${allQuizzes[i].questions[j].rightAnswer}`)}
                        </div>`
                    for (var k = 0; k < allQuizzes[i].questions[j].wrongAnswers.length; k++) {
                        localStorage.setItem('Answer',JSON.stringify(allQuizzes[i].questions[j].wrongAnswers[k]))
                        quizzdisplay += `
                        <div class='col-2'>
                        ${radioButton(`answers${i}${j}`, `${allQuizzes[i].questions[j].wrongAnswers[k]}`, `${allQuizzes[i].questions[j].rightAnswer[k]}`)}
                        </div>
                        
                        `
                    }
                    quizzdisplay += ` 
                        <span id="rightCorr${i}${j}"  style="color:greenyellow;"></span>
                        <span id="autoCorr${i}${j}"  style="color:red;"></span>
                     </div>
                    </div>
                  </div>
                  </div> `
                }
                quizzdisplay += `
                <div class="col-md-12 text-center">
                <input type="button" value="Send" onclick="submitQuizz(${(allQuizzes[i].quizzId)})" class="btn px-4 btn-primary text-white">
            </div>`        
            }
        }
        quizzdisplay += `</div>`
        document.getElementById('quizzTest').innerHTML = quizzdisplay;
    }
}
function getAllQuizzes(){
    return JSON.parse(localStorage.getItem('allQuizzes') || '[]');
}
function submitQuizz(quizzId) {
    var allQuizzes = getAllQuizzes();
    var answer ;
    var i = 0;
    while (i < allQuizzes.length) {
        if (allQuizzes[i].quizzId === quizzId) {
            for (var j = 0; j < allQuizzes[i].questions.length; j++) {
                answer = (document.querySelector(`input[name=answers${i}${j}]:checked`).value)
                if (answer === allQuizzes[i].questions[j].rightAnswer){
                    document.getElementById(`autoCorr${i}${j}`).innerHTML =``
                    document.getElementById(`rightCorr${i}${j}`).innerHTML ='Your Answer is right'
                }
                else{
                    document.getElementById(`autoCorr${i}${j}`).innerHTML =`Wrong Answer , The right one is ${allQuizzes[i].questions[j].rightAnswer}`
                }
            }
        }
        i++;
    }
    
}

// prof space functions
//display students List for professor
function displayStudents() {
    var allUsers = getAllUsers();
    var user = JSON.parse(localStorage.getItem('loggedInUser'));
    var studentList = ``;
    var studentTab = ``;
    for (i = 0; i < user.classe.length; i++) {
        for (j = 0; j < user.section.length; j++) {
            studentList += `
            <div class="text-left"> Class : ${user.classe[i]}  /  Module : ${user.section[j]} </div> `;
            studentTab = `
            <div class="table-responsive m-5">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">N°</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>`;
            var id = 0;
            for (k = 0; k < allUsers.length; k++) {
                if (allUsers[k].role === 'student' && allUsers[k].classe === user.classe[i]
                    && allUsers[k].section === user.section[j]) {
                    id++;
                    studentTab += `
                    <tr>
                        <th scope="row">${id}</th>
                        <td>${allUsers[k].firstName}</td>
                        <td>${allUsers[k].lastName}</td>
                        <td>${allUsers[k].email}</td>
                    </tr>`
                }

            }
            studentTab += `
                    </tbody>
                </table>
            </div>`;
            studentList += studentTab;

        }

    }
    document.getElementById('studentList').innerHTML = studentList;
}

//giving marks to students functions

function givingMarksStudentList() {
    var allUsers = getAllUsers();
    var user = JSON.parse(localStorage.getItem('loggedInUser'));
    var studentList = ``;
    var studentTab = ``;
    for (i = 0; i < user.classe.length; i++) {
        for (j = 0; j < user.section.length; j++) {
            studentList += `
            <div class="text-left"> Class : ${user.classe[i]}  /  Module : ${user.section[j]} </div> `;
            studentTab = `
            <div class="table-responsive m-5">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">N°</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Marks</th>
                        </tr>
                    </thead>
                    <tbody>`;
            var id = 0;
            for (k = 0; k < allUsers.length; k++) {
                if (allUsers[k].role === 'student' && allUsers[k].classe === user.classe[i]
                    && allUsers[k].section === user.section[j]) {
                    id++;
                    studentTab += `
                    <tr>
                        <th scope="row">${id}</th>
                        <td>${allUsers[k].firstName}</td>
                        <td>${allUsers[k].lastName}</td>
                        <td>${allUsers[k].email}</td>
                        <td>
                            <input type="button" value="Give Marks" onclick="goToMarks(${allUsers[k].id})" class="btn px-4 btn-primary text-white">
                            <div class="small text-danger" id="noteExistError${allUsers[k].id}"></div>
                        </td>
                    </tr>`
                }
            }
            studentTab += `
                    </tbody>
                </table>
            </div>`;
            studentList += studentTab;
        }
    }
    document.getElementById('givingMarks').innerHTML = studentList;
}
function goToMarks(id) {
    var allNotes = JSON.parse(localStorage.getItem('allNotes') || '[]');
    var studentExist = false;
    var i = 0;
    while (i < allNotes.length && !studentExist) {
        studentExist = allNotes[i].studentId === id;
        i++;
    }
    if (studentExist) {
        document.getElementById(`noteExistError${id}`).innerHTML = 'Notes Already Given'
    } else {
        document.getElementById(`noteExistError${id}`).innerHTML = '';
        location.replace('marks.html');
        student = searchById(id);
        localStorage.setItem('studentMarks', JSON.stringify(student));
    }
}
function givingMarks() {
    var student = JSON.parse(localStorage.getItem('studentMarks'));
    var modules = JSON.parse(localStorage.getItem('modules'));
    for (var i = 0; i < modules.length; i++) {
        if (student.section === modules[i].name) {
            subjects = modules[i].subjects;
        }
    };
    var displaySubjects = `
    <div class="">
            <h2 class="mb-4 text-center">Give Marks </h2>
            <form action="#" class="p-4 border rounded">`
    for (var i = 0; i < subjects.length; i++) {
        displaySubjects += `
             <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label class="text-black" for="fname">${subjects[i]}</label>
                  <input type="number" id="note1${i}" class="form-control" required >
                  <span class=" alert text-danger small" id="noteError1${i}"></span>
                </div>
              </div>
              `
    }
    displaySubjects += `
        <div class="row form-group">
            <div class="col-md-12 text-center">
                <input type="button" value="Give Marks" onclick="getMarks(${subjects.length},${student.id})" class="btn px-4 btn-primary text-white">
    </div>
            </div>
</form>
</div > 
`   ;
    document.getElementById('displaySubjects').innerHTML = displaySubjects;
}
//getting and storing student Marks
function getMarks(nbr, id) {
    var modules = [];
    for (var i = 0; i < nbr; i++) {
        modules.push(document.getElementById(`note1${i}`).value);

        if (modules[i] < 0 || modules[i] > 20) {
            document.getElementById(`noteError1${i}`).innerHTML = 'Please enter a value between 0 and 20'
        }
        else {
            document.getElementById(`noteError1${i}`).innerHTML = '';
        }
    }
    var allNotes = JSON.parse(localStorage.getItem('allNotes') || '[]');
    var studentMarks = {
        studentId: id,
        notes: modules
    };
    allNotes.push(studentMarks);
    localStorage.setItem('allNotes', JSON.stringify(allNotes));
    location.replace('profSpace.html');
}
//Professor tab 3 : maintain absences/attendances 
function Absence_AttendanceTab() {
    var allUsers = getAllUsers();
    var user = JSON.parse(localStorage.getItem('loggedInUser'));
    var date = getCurrentDay();

    var studentList = `<div class=" row col-3 ml-5  ">
    <h5 class="text-right  border bg-light font-italic" >Day : ${date}</h4>
    </div>`;
    var studentTab = ``;
    for (i = 0; i < user.classe.length; i++) {
        for (j = 0; j < user.section.length; j++) {
            studentList += `
            <div class="text-right"> Class : ${user.classe[i]}  /  Module : ${user.section[j]} </div> `;
            studentTab = `
            <div class="table-responsive m-5">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">N°</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Present</th>
                        <th scope="col">Absent</th>
                        </tr>
                    </thead>
                    <tbody>`;
            var id = 0;
            for (k = 0; k < allUsers.length; k++) {
                if (allUsers[k].role === 'student' && allUsers[k].classe === user.classe[i]
                    && allUsers[k].section === user.section[j]) {
                    id++;
                    studentTab += `
                    <tr>
                        <th scope="row">${id}</th>
                        <td>${allUsers[k].firstName}</td>
                        <td>${allUsers[k].lastName}</td>
                        <td>${allUsers[k].email}</td>
                        <td>
                            <input type="button" value="P" onclick="verifAttendance(${allUsers[k].id},'present')"
                             class="btn px-4 btn-primary text-white" id="presentBtn${allUsers[k].id}">
                        </td>
                        <td>
                            <input type="button" value="A" onclick="verifAttendance(${allUsers[k].id},'absent')"
                             class="btn px-4 btn-primary text-white" id="absentBtn${allUsers[k].id}">
                        </td>
                    </tr>`
                }
            }
            studentTab += `
                    </tbody>
                </table>
            </div>`;
            studentList += studentTab;
        }
    }
    document.getElementById('Absences-Attendances').innerHTML = studentList;
}
//Professor tab 4 : display Absences 
function displayAbsences() {
    var week = getCurrWeek();
    var prof = JSON.parse(localStorage.getItem('loggedInUser'));
    var ab_Att_St_List = JSON.parse(localStorage.getItem('ab_Att_St_List') || '[]');
    var displayAbsencesList = `
    <div class="table-responsive m-5">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">N°</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Class & Section</th>
                        <th scope="col">Absences</th>
                        <th scope="col">Attendances</th>
                        <th scope="col">Absences For This Week</th>
                        <th scope="col">Dates For This Week</th>
                        </tr>
                    </thead>
                    <tbody>`
    var id = 1;
    for (var k = 0; k < ab_Att_St_List.length; k++) {
        var student = searchById(ab_Att_St_List[k].studentId);
        for (i = 0; i < prof.classe.length; i++) {
            for (j = 0; j < prof.section.length; j++) {

                if (student.classe === prof.classe[i]
                    && student.section === prof.section[j]) {
                    var days = [];
                    for (var f = 0; f < ab_Att_St_List[k].absent.length; f++) {
                        if (verifDayWeek((ab_Att_St_List[k].absent)[f], week)) {
                            days.push(ab_Att_St_List[k].absent[f]);
                        }
                    }
                    displayAbsencesList += `
          <tr>
                <th scope="row">${id}</th>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.classe} / ${student.section} </td>
                <td>${ab_Att_St_List[k].absent.length}</td>
                <td>${ab_Att_St_List[k].present.length}</td>
                <td>${days.length}</td>
                <td>${days}</td>
         </tr>`;
                    id++;
                }
            }
        }
    }
    displayAbsencesList += `
                    </tbody>
                </table>
            </div>
            <div class="row col-6 justify-content-center bg-light ">
                <h3 class="text-success"> Search Absences </h3>
                <div>
                <input type='date' id='firstDay'>
                <input type='date' id='lastDay'>
                <div>
                <div class="pt-3 text-center">
                    <input type="button" value="Search" onclick="searchAbsences()"
                    class="btn px-4 btn-primary text-white" data-toggle="modal" data-target="#searchModal">
                    <span id="modalAbsences"></span>
                </div>
            </div>`;
    document.getElementById('displayAbsences').innerHTML = displayAbsencesList;

}
//function get the current week
function getCurrWeek() {
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    var week = [convertToDayFormat(firstday), convertToDayFormat(lastday)]
    return week
}
// function get current day 
function getCurrentDay() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}
// convert to day format : mm/dd/yyyy ;
function convertToDayFormat(day) {
    var dd = String(day.getDate()).padStart(2, '0');
    var mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = day.getFullYear();

    day = mm + '/' + dd + '/' + yyyy;
    return day;
}
//function verif  if the day is in the current week
function verifDayWeek(date, week) {
    var d1 = Date.parse(date);
    var d2 = Date.parse(week[0]);
    var d3 = Date.parse(week[1]);
    return (d1 >= d2 && d1 <= d3);

}
function returnIndice(table, id) {
    var i = 0;
    var nbr = -1;
    while (i < table.length) {
        if (table[i].studentId === id) {
            nbr = i;
        }
        i++;
    }
    return (nbr)
}
function verifAttendance(id, att) {
    var date = getCurrentDay();
    var ab_Att_St_List = JSON.parse(localStorage.getItem('ab_Att_St_List') || '[]');
    var nbr;
    if (verifStudentExistance(ab_Att_St_List, id)) {
        nbr = returnIndice(ab_Att_St_List, id);
        if (verifDayExistance(ab_Att_St_List[nbr].absent, date) || verifDayExistance(ab_Att_St_List[nbr].present, date)) {
            document.getElementById(`absentBtn${id}`).disabled = true;
            document.getElementById(`presentBtn${id}`).disabled = true;
        }
        else if (att === "present") {
            (ab_Att_St_List[nbr].present).push(date);
        }
        else if (att === "absent") {
            (ab_Att_St_List[nbr].absent).push(date);
        }
    }
    else {
        var presentDays = [];
        var absentDays = [];
        if (att === "present") {
            presentDays.push(date);
        }
        else if (att === "absent") {
            absentDays.push(date);
        }
        var abAttStudent = {
            studentId: id,
            present: presentDays,
            absent: absentDays,
        }
        ab_Att_St_List.push(abAttStudent);
    }
    localStorage.setItem('ab_Att_St_List', JSON.stringify(ab_Att_St_List));
}
//date existance verification
function verifDayExistance(table, date) {
    var i = 0;
    var test = false;
    while (i < table.length && test === false) {
        if (table[i] === date) {
            test = true;
        }
        i++;
    }
    return test;
}
function verifStudentExistance(table, id) {
    var i = 0;
    var exist = false;
    while (i < table.length && exist === false) {
        if (table[i].studentId === id) {
            exist = true;
            break;
        }
        i++;
    }
    return exist;
}
function searchAbsences() {
    var firstDay = document.getElementById('firstDay').value;
    var lastDay = document.getElementById('lastDay').value;
    var period = [firstDay, lastDay];

    var daysList = [];
    var ab_Att_St_List = JSON.parse(localStorage.getItem('ab_Att_St_List') || '[]');
    for (var i = 0; i < ab_Att_St_List.length; i++) {
        for (var j = 0; j < ab_Att_St_List[i].absent.length; j++) {
            if (verifDayWeek(ab_Att_St_List[i].absent[j], period)) {
                daysList.push([ab_Att_St_List[i].studentId, ab_Att_St_List[i].absent[j]]);
            }
        }
    }
    var searchModal = `<!-- Modal -->
    <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="exampleModalLabel">Absences List <br> <small> For ${firstDay} --->  ${lastDay} </small></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="">
    `
    if (daysList.length === 0) {
        searchModal += `
            There is no Absences in This Period
     `
    } else {
        searchModal += `<ul>`
        for (var i = 0; i < daysList.length; i++) {
            var student = searchById(daysList[i][0]);
            searchModal += `
            <li> ${student.firstName} ${student.lastName} : ${daysList[i][1]} 
              (${student.section}/${student.classe})</li>`
        }
        searchModal += `</ul>`
    }
    searchModal += `
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>`;
    document.getElementById('modalAbsences').innerHTML = searchModal;

}
//quiz functions
// first create TABLE structure with the headers. 
function createTable() {
    var empTable = document.createElement('table');
    empTable.setAttribute('id', 'empTable'); // table id.

    var tr = empTable.insertRow(-1);
    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th'); // create table headers
        th.innerHTML = arrHead[h];
        th.setAttribute('class', 'thead-light');
        tr.appendChild(th);
    }

    var div = document.getElementById('cont');
    div.appendChild(empTable);  // add the TABLE to the container.
}
// now, add a new to the TABLE.
function addRow() {
    var empTab = document.getElementById('empTable');

    var rowCnt = empTab.rows.length;   // table row count.
    var tr = empTab.insertRow(rowCnt); // the table row.

    for (var c = 0; c < arrHead.length; c++) {
        var td = document.createElement('td'); // table definition.
        td = tr.insertCell(c);


        if (c == 0) {      // the first column.
            // add a button in every new row in the first column.
            var button = document.createElement('input');

            // set input attributes.
            button.setAttribute('type', 'button');
            button.setAttribute('value', 'Remove');
            button.setAttribute('class', 'btn btn-light');
            // add button's 'onclick' event.
            button.setAttribute('onclick', 'removeRow(this)');
            td.appendChild(button);
        }
        else {
            // 2nd, 3rd and 4th column, will have textbox.
            var ele = document.createElement('input');
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', '');
            ele.setAttribute('class', 'form-control');
            td.appendChild(ele);
        }
    }
}
// delete TABLE row function.
function removeRow(oButton) {
    var empTab = document.getElementById('empTable');
    empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // button -> td -> tr.
}
// function to extract and submit table data.
function submit() {
    var myTab = document.getElementById('empTable');
    var section = document.getElementById('sectionInput').value;
    var classe = document.getElementById('classeInput').value;
    var allQuizzes = getAllQuizzes();
    var prof = JSON.parse(localStorage.getItem('loggedInUser'));
    var i = 0;
    var quizExist = false;
    while (i < allQuizzes.length && !quizExist) {
        if (prof.id === allQuizzes[i].profId && classe === allQuizzes[i].class
            && section === allQuizzes[i].section) {
            quizExist = true;
        }
        i++;
    }
    if (quizExist) {
        document.getElementById('quizExist').innerHTML = 'Quizz already given'
    } else {
        document.getElementById('quizExist').innerHTML = '';
        // loop through each row of the table.
        var allQuestions = [];
        for (row = 1; row < myTab.rows.length; row++) {
            console.log('row', row);
            console.log('myTab.rows', myTab.rows[row]);
            // loop through each cell in a row.
            var wrongAnswers = [];
            var question = '';
            var rightAnswer = '';

            for (var i = 1; i < 4; i++) {
                console.log(('i', i));
                switch (i) {
                    case 1:
                        var element = myTab.rows.item(row).cells[1];
                        question = element.childNodes[0].value;
                        break;
                    case 2:
                        var element = myTab.rows.item(row).cells[2];
                        rightAnswer = element.childNodes[0].value;
                        break;
                    case 3:
                        var element = myTab.rows.item(row).cells[3];
                        var ch = element.childNodes[0].value;
                        wrongAnswers = ch.split(',');
                        break;
                    default:
                        break;
                }
            }
            var quizQuestion = {
                question: question,
                rightAnswer: rightAnswer,
                wrongAnswers: wrongAnswers
            }
            allQuestions.push(quizQuestion);
        }
        var id = JSON.parse(localStorage.getItem('quizzId') || '1');
        var quiz = {
            questions: allQuestions,
            profId: prof.id,
            section: section,
            class: classe,
            quizzId: id
        }
        allQuizzes.push(quiz)
        localStorage.setItem('quizzId', id + 1);
        localStorage.setItem('allQuizzes', JSON.stringify(allQuizzes));
        location.reload();
    }
}
//admin space functions 
//display professors for admin
function diplayProfsList() {
    var allUsers = getAllUsers();
    var displayProf = `
    <div class="table-responsive m-5">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">N°</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Classes</th>
                        <th scope="col">Section</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>`;
    var id = 1;
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].role === 'prof') {
            displayProf += `
          <tr>
                <th scope="row">${id}</th>
                <td>${allUsers[i].firstName}</td>
                <td>${allUsers[i].lastName}</td>
                <td>${allUsers[i].email}</td>
                <td>${allUsers[i].classe}</td>
                <td>${allUsers[i].section}</td>
                <td>
                    <input type="button" value="Edit" onclick="editProfModal(${allUsers[i].id})" 
                    class="btn px-4 btn-primary text-white" data-toggle="modal" data-target="#editModal">
                    <span id="modalSpan"></span>
                </td>
                <td><input type="button" value="Delete" onclick="deleteProf(${i})" 
                class="btn px-4 btn-primary text-white" ></td>
         </tr>`;
            id++;
        }
    }
    displayProf += `
                    </tbody>
                </table>
            </div>`;
    document.getElementById('professorsList').innerHTML = displayProf;
}
//edit prof functions
function editProfModal(id) {
    var editModal = `
    <!-- Modal -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Professor Informations</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="">
            <form action="#" class="p-4 border rounded">
            <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                <label class="text-black bg-light" for="fname">Modules : </label>
                <div id=''>
                    ${checkBox("editProfModule", "fullStackJS", "FullStack JS")}
                    ${checkBox("editProfModule", "dataScience", "dataScience")}
                    ${checkBox("editProfModule", "digitalMarketing", "Digital Marketing")}
                </div>
                <label class="text-black bg-light" for="fname">Classes : </label> 
                    <div>
                        ${checkBox("editProfClass", "1", 1)}
                        ${checkBox("editProfClass", "2", 2)}
                    </div>
                </div>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="editProf(${id})">Save changes</button>
      </div>
    </div>
  </div>
</div>`
    document.getElementById('modalSpan').innerHTML = editModal;
}
function editProf(id) {
    allUsers = getAllUsers();
    var sections = [];
    var checkboxes = document.querySelectorAll('input[name="editProfModule"]:checked');
    for (var i = 0; i < checkboxes.length; i++) {
        sections.push(checkboxes[i].value)
    }
    var classes = [];
    var checkboxes1 = document.querySelectorAll('input[name="editProfClass"]:checked');
    for (var i = 0; i < checkboxes1.length; i++) {
        classes.push(checkboxes1[i].value)
    }
    var i = 0;
    while (i < allUsers.length) {
        if (allUsers[i].id === id) {
            allUsers[i].section = sections;
            allUsers[i].classe = classes;
            break;
        }
        i++;
    }
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    location.replace('adminSpace.html');
}
//delete professors functions
function deleteProf(indice) {
    var allUsers = getAllUsers();
    allUsers.splice(indice, 1);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    location.reload();
}
//display students for admin
function diplayStudentsList() {
    var allUsers = getAllUsers();
    var displayStudent = `
    <div class="table-responsive m-5">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">N°</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Class</th>
                        <th scope="col">Section</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>`;
    var id = 1;
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].role === 'student') {
            displayStudent += `
          <tr>
                <th scope="row">${id}</th>
                <td>${allUsers[i].firstName}</td>
                <td>${allUsers[i].lastName}</td>
                <td>${allUsers[i].email}</td>
                <td>${allUsers[i].classe}</td>
                <td>${allUsers[i].section}</td>
                <td>
                    <input type="button" value="Edit" onclick="editStudentModal(${allUsers[i].id})" 
                    class="btn px-4 btn-primary text-white" data-toggle="modal" data-target="#editStudentModal">
                    <span id="modalStudentSpan"></span>
                </td>
                <td><input type="button" value="Delete" onclick="deleteStudent(${i})" class="btn px-4 btn-primary text-white"></td>
         </tr>`;
            id++;
        }
    }
    displayStudent += `
                    </tbody>
                </table>
            </div>`;
    document.getElementById('studentsList').innerHTML = displayStudent;
}
//edit student functions
function editStudentModal(id) {
    var editModal = `
    <!-- Modal -->
<div class="modal fade" id="editStudentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Student Informations</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="">
            <form action="#" class="p-4 border rounded">
            <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                <label class="text-black" for="fname">Module</label>
                    <div>
                        ${radioButton("editStudentModule", "fullStackJS", "FullStack JS")}
                        ${radioButton("editStudentModule", "fullStackJS", "Data Science")}
                        ${radioButton("editStudentModule", "digitalMarketing", "Digital Marketing")}
                    </div>
                    <label class="text-black" for="fname">Class</label>
                    <div>
                        ${radioButton("editStudentClass", "1", 1)}
                        ${radioButton("editStudentClass", "2", 2)}
                    </div>
                </div>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="editStudent(${id})">Save changes</button>
      </div>
    </div>
  </div>
</div>`
    document.getElementById('modalStudentSpan').innerHTML = editModal;
}
function editStudent(id) {
    allUsers = getAllUsers();
    var section = document.querySelector("input[name=editStudentModule]:checked").value;
    var classe = document.querySelector("input[name=editStudentClass]:checked").value;
    var i = 0;
    while (i < allUsers.length) {
        if (allUsers[i].id === id) {
            allUsers[i].section = section;
            allUsers[i].classe = classe;
            break;
        }
        i++;
    }
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    location.reload();
}
//delete students function
function deleteStudent(indice) {
    var allUsers = getAllUsers();
    allUsers.splice(indice, 1);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    location.reload();
}
//display all admins
function diplayAdminsList() {
    var allUsers = getAllUsers();
    var displayAdmin = `
    <div class="table-responsive m-5">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">N°</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>`;
    var id = 1;
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].role === 'admin') {
            displayAdmin += `
          <tr>
                <th scope="row">${id}</th>
                <td>${allUsers[i].firstName}</td>
                <td>${allUsers[i].lastName}</td>
                <td>${allUsers[i].email}</td>
         </tr>`;
            id++;
        }
    }
    displayAdmin += `
                    </tbody>
                </table>
            </div>`;
    document.getElementById('adminList').innerHTML = displayAdmin;
}

//contact stocking
function contactStock() {
    fName = document.getElementById('fName').value;
    lName = document.getElementById('lName').value;
    email = document.getElementById('email').value;
    subject = document.getElementById('subject').value;
    message = document.getElementById('message').value;
    test(verifLength(fName, 4, 20), 'fNameError', 'Your First Name length should be between 4 and 20');
    test(verifLength(lName, 4, 20), 'lNameError', 'Your Last Name length should be between 4 and 20');
    test(validateEmail(email), 'emailError', 'Your email format is not Valid');
    // if(! verifLength(fName, 4, 20) && ! verifLength(lName, 4, 20) && ! validateEmail(email) ){
        var contact={
            firstName :fName,
            lastName : lName,
            email : email,
            subject : subject,
            message : message
        }
        localStorage.setItem('contact',JSON.stringify(contact));
    // }
}

