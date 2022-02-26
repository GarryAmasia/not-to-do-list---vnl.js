//create global array!!!
const taskList = [];
const badList = [];

const weekHrs = 7 * 24;

let displayElm = document.getElementById("task-list");
let badListElm = document.getElementById("bad-list");

//capturing form data
const handleOnSubmit = (event) => {
  // FormData class from CDN FromData in order to use all FromData's method. get delete append etc...
  //construct FormData and then involves event in it.
  const frmDt = new FormData(event);

  const task = frmDt.get("task");

  //   + sign is to make string into number in hour input field
  const hr = +frmDt.get("hr");
  //   console.log(task, hr);

  if (hr < 1) {
    return alert("please enter valid hours");
  }

  const obj = {
    task: task,
    hr: hr,
  };

  const ttlHr = taskTotalHrs();
  //   const ttlBadHr = badTotalHrs();

  if (ttlHr + hr > weekHrs) {
    return alert("you have exceeded the weekly hours");
  }

  taskList.push(obj);
  console.log(taskList);
  display();
  taskTotalHrs();
  //   console.log(obj);
};

//display task list int he dom
const display = () => {
  let str = "";

  //loop through the task list and convert into tr string

  taskList.map((item, i) => {
    str += `
      <tr>
                                    <td>
                                        <input type="checkbox">
                                    </td>
                                    <td>${item.task}</td>
                                    <td>${item.hr}</td>
                                    <td>
                                        <button class="btn btn-danger" onclick="deleteTaskList(${i})"><i class="fa-solid fa-trash-can"></i></button>
                                        <button class="btn btn-success" onclick="markAsNotToDo(${i})">
                                            <i class="fa-solid fa-arrow-right-arrow-left"></i> </button>
                                    </td>
                                </tr>
      `;
  });
  displayElm.innerHTML = str;
  taskTotalHrs();
};

//display bad list in the dom
const displayBadList = () => {
  let str = "";

  badList.map((item, i) => {
    str += `<tr>
    <td>
        <input type="checkbox">
    </td>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td>
        <button class="btn btn-warning" onclick="markAsTask(${i})">
            <i class="fa-solid fa-arrow-right-arrow-left"></i>
        </button>
        <button class="btn btn-danger" onclick ="deleteBadList(${i})">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    </td>
</tr>`;
  });
  badListElm.innerHTML = str;
  taskTotalHrs();
};

//delete item from task list
const deleteTaskList = (i) => {
  console.log(i);
  //splice will take index and will take 1 item out thats way its splice(i,1)
  const itm = taskList.splice(i, 1);
  //   console.log(itm);
  display();

  return itm[0];
};

//delete item from BAD task list
const deleteBadList = (i) => {
  console.log(i);
  //splice will take index and will take 1 item out thats way its splice(i,1)
  const itm = badList.splice(i, 1);
  //   console.log(itm);
  displayBadList();

  return itm[0];
};

//mark task as bad list
const markAsNotToDo = (i) => {
  const badItm = deleteTaskList(i);
  badList.push(badItm);

  displayBadList();
  //   console.log(badItm);
};

//mark task as TASK list
const markAsTask = (i) => {
  const badItm = deleteBadList(i);
  taskList.push(badItm);
  display();
  // displayBadList();
  //   console.log(badItm);
};

// display total task hours
const taskTotalHrs = () => {
  const total = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  const ttlBadHrs = badTotalHrs();
  const grandTotal = total + ttlBadHrs;
  document.getElementById("total-hr").innerHTML = grandTotal;

  return grandTotal;
};

// display total bad hours
const badTotalHrs = () => {
  const total = badList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  document.getElementById("bad-hr").innerHTML = total;
  return total;
};
