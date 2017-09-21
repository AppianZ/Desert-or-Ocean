/**
 * Created by appian on 2017/9/20.
 */
function greeter1(person: string) {
    return "Hello, " + person;
}
var user1 = "Jane User";
document.body.innerHTML = greeter1(user1);


function greeter2(person: string) {
    return "Hello, " + person;
}
var user2 = [0, 1, 2];
// document.body.innerHTML = greeter2(user2);


class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
interface Person {
    firstName: string;
    lastName: string;
}
function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
document.body.innerHTML = greeter(user);