// Write a function createEmployeeRecord() that
//      takes an Array as an argument (example: let empArr = [firstName, familyName, title, payPerHour])
//      returns an Object whose properties are populated by the elements from the array 
function createEmployeeRecord(empArr){
    return {
        firstName: empArr[0],
        familyName: empArr[1],
        title: empArr[2],
        payPerHour: empArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// Write a function createEmployeesRecord() that 
//      takes an Array that contains arrays as an argument (example: employeesArr = [['Jack', 'Daniel', 'Manager', 30], ['John', 'Kelly', 'Associate', 20]])
//      iterates over the Array and pass in each element (Array) to createEmployeeRecord as an argument
function createEmployeeRecords(employeesArr){
    return employeesArr.map(empRecord => createEmployeeRecord(empRecord))
}

// Write a function createTimeInEvent() that 
//      takes an employee record Object (empObj) and date stamp (dateStamp) as arguments
//          empObj here refers to each record (Object) of employee in the Array returned by createEmployeeRecords
//          date stamp always uses the following format: "YYYY-MM-DD HHMM"
//      creates an Object (newTimeInEvent) that has the following 3 properties 
//          type: "TimeIn"
//          date: "YYYY-MM-DD" (derived from the second argument: dateStamp)
//          time: HHMM (derived from the second argument: dateStamp) * make it an integer
//      append newTimeInEven to the Array that the property name timeInEvents points to in empObj
function createTimeInEvent(empObj, dateStamp){
    let newTimeInEvent = {
        type: "TimeIn",
        date: dateStamp.slice(0, 10),
        hour: parseInt(dateStamp.slice(-4))
    }
    empObj['timeInEvents'].push(newTimeInEvent);
    return empObj;
}

/*
let empObj = {
    firstName: "Jack",
    familyName: "Daniel",
    title: "Manager",
    payPerHour: 20,
    timeInEvents: [],
    timeOutEvents: []
}
*/
//let dateStampIn = "2021-09-15 0900"

//createTimeInEvent(empObj, dateStampIn)

// Write a function createTimeInEvent() that 
//      takes an employee record Object (empObj) and date stamp (dateStamp) as arguments
//          empObj here refers to each record (Object) of employee in the Array returned by createEmployeeRecords
//          date stamp always uses the following format: "YYYY-MM-DD HHMM"
//      creates an Object (newTimeInEvent) that has the following 3 properties 
//          type: "TimeOutn"
//          date: "YYYY-MM-DD" (derived from the second argument: dateStamp)
//          time: HHMM (derived from the second argument: dateStamp) * make it an integer
//      append newTimeOutEvent to the Array that the property name timeOutEvents points to in empObj
function createTimeOutEvent(empObj, dateStamp){
    let newTimeOutEvent = {
        type: "TimeOut",
        date: dateStamp.slice(0, 10),
        hour: parseInt(dateStamp.slice(-4))
    }
    empObj['timeOutEvents'].push(newTimeOutEvent);
    return empObj;
}

//let dateStampOut = "2021-09-15 1800"

//createTimeOutEvent(empObj, dateStampOut)


// Write a function hoursWorkedOnDate() that
//      takes an employee record Object (empObj) and date (workDate) 
//          workDate always uses the following format: "YYYY-MM-DD"
//      calculates the hours that the employee worked on that date 
function hoursWorkedOnDate(empObj, workDate){
    let inTimeArr = empObj['timeInEvents'];
    let inTime = inTimeArr.find(element => (element['date'] === workDate))
    let outTimeArr = empObj['timeOutEvents'];
    let outTime = outTimeArr.find(element => (element['date'] === workDate))
    return (outTime['hour'] - inTime['hour'])/100;
}

/*
objJuliusCaesar = {
    firstName: "Julius",
    familyName: "Caesar",
    title: "General",
    payPerHour: 1000,
    timeInEvents: [{type: "TimeIn", date: '0044-03-15', hour: 0900}],
    timeOutEvents: [{type: "TimeOut", date: '0044-03-15', hour: 1100}]
}
workDate = '0044-03-15'

console.log(hoursWorkedOnDate(objJuliusCaesar, workDate))
*/

// Write a function wagesEarnedOnDate() that
//      takes an employee record Object (empObj) and date (workDate) 
//          workDate always uses the following format: "YYYY-MM-DD"
//      calculates the wage the employee earned on the day
function wagesEarnedOnDate(empObj, workDate){
    let inTime = empObj['timeInEvents'].find(element => (element['date'] === workDate))
    let outTime = empObj['timeOutEvents'].find(element => (element['date'] === workDate))
    let timeWorked = (outTime['hour'] - inTime['hour'])/100
    let payPerHour = empObj['payPerHour']
    return timeWorked * payPerHour;
}


// Write a function allWagesFor() that
//      takes an employee record Object (empObj)
//      aggregates all the dates' wages of the employee and adds them together
function allWagesFor(empObj){
    let allDates = empObj['timeInEvents'].map(element => {return element['date']})
    // console.log(allDates) => ['0044-03-14', '0044-03-15']
    
    let allWagesArr = []
    for (let element of allDates){
        allWagesArr.push(wagesEarnedOnDate(empObj, element))
    }
    // console.log(allWagesArr) => [324, 54]
    
    let sum = allWagesArr.reduce(function(accumulator, currentValue){return accumulator + currentValue}, 0)
    //console.log(sum) => 378
    return sum;
}

/*
objJuliusCaesar = {
    firstName: "Julius",
    familyName: "Caesar",
    title: "General",
    payPerHour: 27,
    timeInEvents: [{type: "TimeIn", date: '0044-03-14', hour: 0900}, {type: "TimeIn", date: '0044-03-15', hour: 0900} ],
    timeOutEvents: [{type: "TimeOut", date: '0044-03-14', hour: 2100}, {type: "TimeIn", date: '0044-03-15', hour: 1100}]
}

allWagesFor(objJuliusCaesar);
*/


// Write a function calculatePayroll that
//      takes an employee record Object (empObj)
//      aggregates all the dates' wages of the all employees and adds them together
function calculatePayroll(employees){
    let sumsOfWagesOfAllEmpArr = [];
    for (let employee of employees){
        sumsOfWagesOfAllEmpArr.push(allWagesFor(employee))
    }
    // console.log(sumsOfWagesOfAllEmpArr) => [70, 700]
    let sum = sumsOfWagesOfAllEmpArr.reduce(function(accumulator, currentValue){return accumulator + currentValue}, 0 );
    // console.log(sum) => 770
    return sum;
}

/*
let employees = [
        {
            firstName: 'Rafiki', 
            familyName: '',
            title: 'Aide',
            payPerHour: 10, 
            timeInEvents: [{type: "TimeIn", date: '2019-01-01', hour: 0900}, {type: "TimeIn", date: '2019-01-02', hour: 1000}],
            timeOutEvents: [{type: "TimeOut", date: '2019-01-01', hour: 1300}, {type: "TimeOut", date: '2019-01-02', hour: 1300}]
        },
        {
            firstName: 'Simba', 
            familyName: '',
            title: 'King',
            payPerHour: 100, 
            timeInEvents: [{type: "TimeIn", date: '2019-01-11', hour: 0900}, {type: "TimeIn", date: '2019-01-12', hour: 1000}],
            timeOutEvents: [{type: "TimeOut", date: '2019-01-11', hour: 1300}, {type: "TimeOut", date: '2019-01-12', hour: 1300}]
        }
    ]

calculatePayroll(employees);
*/