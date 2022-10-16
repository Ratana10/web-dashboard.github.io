
class Student{
    id ;
    name;
    gender ;
    classes;
    course;
    email;

    constructor(id, name, gender, classes, course, email){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.classes = classes;
        this.course = course;
        this.email = email;
    }

    show(){
        console.log(this.id, this.name, this.gender, this.classes, this.course, this.email);
    
    }
}


var students = [];

function readLocalStorage(){
   
    students = JSON.parse( localStorage.getItem("studentRecord"));


    for (let i =0; i<students.length; i++){
        var stu = new Student(students[i].id, students[i].name, students[i].gender, students[i].classes,students[i].course, students[i].email);
        newRecord(stu, i);
    }
}

function newRecord(stu, i){
    var table = document.getElementById("student-tb").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);


    newRow.insertCell(0).innerHTML = i+1;
    newRow.insertCell(1).innerHTML = stu.id;
    newRow.insertCell(2).innerHTML = stu.name;
    newRow.insertCell(3).innerHTML = stu.gender;
    newRow.insertCell(4).innerHTML = stu.classes;
    newRow.insertCell(5).innerHTML = stu.course;
    newRow.insertCell(6).innerHTML = stu.email;
    newRow.insertCell(7).innerHTML = `<a onclick="onEdit(this)" class="btn btn-primary" type="button">Edit</a>`;
    newRow.insertCell(8).innerHTML = `<a onclick="deleteRecord(this)" class="btn btn-danger" type="button">Delete</a>`;
    

}

function deleteRecord(td){
    
    if(confirm("Are you sure you want to delete this record ?")){
        var selectedRow = td.parentElement.parentElement.rowIndex;
        document.getElementById('students-list').deleteRow(selectedRow);
        

        students.splice(selectedRow-1, 1);
        localStorage.setItem("studentRecord", JSON.stringify(students));

    }
}

function searchName(){
    var input = document.getElementById('search-input');
    var filter = input.value.toUpperCase();

    var table = document.getElementById('student-tb');
    var tr = table.getElementsByTagName('tr');

    for(let i=0; i<tr.length; i++){
        var td = tr[i].getElementsByTagName('td')[2];
        if(td){
            var txtValue = td.textContent || td.innerText ;
            if(txtValue.toLocaleUpperCase().indexOf(filter) > -1){
                tr[i].style.display = "";
            }
            else{
               tr[i].style.display = 'none'
            }
        }
    }

}

let sortDirection = false;
function sortTable(columnName){
    
    const dataType = typeof(students[0][columnName])
    
    sortDirection = !sortDirection;
    switch(dataType){
        case 'number':
            sortColumnNumber(sortDirection, columnName);
            break;
        case 'string':
            sortColumnString(sortDirection, columnName);
            break;
        }
            

    localStorage.removeItem("studentRecord");
    localStorage.setItem("studentRecord", JSON.stringify(students));

    document.getElementById('students-list').innerHTML = '';
    readLocalStorage();

}
function sortColumnNumber(sort, columnName){
    students = students.sort((p1, p2) => {
        return sort ? p1[columnName] -p2[columnName] : p2[columnName] -p1[columnName];
    });
}

function sortColumnString(sort, columnName){
    const newData = students.sort( compare(columnName) )

    function compare(prop) {
        return function (a,b) {
            return -1; // sort stuff
        }
    }

}
