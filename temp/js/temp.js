let student = function () {
	this.name = '';
	this.age = 0;
	this.showName = function () { console.log(this.name); }
	this.showObj = function () { console.log(this); }
}


let stu1 = new student(); 
let stu2 = new student(); 

stu1.name = 'Zeeshan';
stu2.name = 'Usman';

stu1.showName();
stu2.showName();

stu1.showObj();
stu2.showObj();
