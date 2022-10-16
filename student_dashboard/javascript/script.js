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

var students = [] ;
function readLocalStorage(){
    
    if(localStorage.students){
        students = JSON.parse( localStorage.getItem("studentRecord"));
    }   
    else{
        console.log("fail");

    }    
    
    console.log("test success");
}

function onFormSubmit(){
    var data =readFormData();

  
   console.log(data)
}

function readFormData(){
    
    var select;

    var stu = new Student();
    stu.id = document.getElementById('id').value;

    stu.name = document.getElementById('name').value;
    
    select = document.getElementById('genders');
    stu.gender = select.options[select.selectedIndex].value;
 
    select = document.getElementById('classes');
    stu.classes = select.options[select.selectedIndex].value;
    
    select = document.getElementById('courses');
    stu.course = select.options[select.selectedIndex].value;
    
    stu.email = document.getElementById('email').value;
    stu.show();

    students.push(stu);
    
    console.log("testing 4" ,students);
    localStorage.setItem("studentRecord",JSON.stringify(students));
    
    return stu;


}


