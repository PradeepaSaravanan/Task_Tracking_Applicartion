window.onload = getTasks;
/**getTasks() function  retrieves all tasks from the database */
function getTasks() {
  document.getElementById("tableTask").style.display = 'block';
  let req1 = new XMLHttpRequest();
  const url = "http://localhost:8080/tasks";
  req1.open("GET", url, true);
  req1.send();
  req1.onreadystatechange = function () {
    if (req1.readyState === 4) {
      if (req1.status === 200) {
        tasks = JSON.parse(req1.responseText);
        console.log("Tasks", tasks);
        display(tasks);
        search_sort();
      }
    }
  }
  event.preventDefault();
}
/**display() function display all tasks in the form of table
 * @ tasks represents a object containing all the tasks details 
 */
function display(tasks) {
  let table = `<table class="table table-hover " id="table1" >
    <thead>
      <tr  class="table-active" style="margin:10px; border-radius:30px; background-color:white;text-align:center" >
        <th scope="col" onclick="sortTable(0)" >Task ID<span id="icon-id" class="icon"> <i class="fa fa-sort" aria-hidden="true"></i></span></th>
        <th scope="col" onclick="sortTable(1)">Task Name <span id="icon-name" class="icon"> <i class="fa fa-sort" aria-hidden="true"></i> </span></th>
        <th scope="col" onclick="sortTable(2)"> Created Date<span id="icon-date" class="icon"> <i class="fa fa-sort" aria-hidden="true"></i> </span></th>
        <th scope="col" onclick="sortTable(3)">Assigned To <span id="icon-assigned" class="icon"><i class="fa fa-sort" aria-hidden="true"></i> </span></th>
        <th scope="col" onclick="sortTable(4)">Duration <span id="icon-duration" class="icon"><i class="fa fa-sort" aria-hidden="true"></i> </span></th>
        <th scope="col" onclick="sortTable(5)">Priority<span id="icon-priority" class="icon"> <i class="fa fa-sort" aria-hidden="true"></i></span></th>
        <th scope="col" onclick="sortTable(6)">Status <span id="icon-status" class="icon"> <i class="fa fa-sort" aria-hidden="true"></i> </span></th>
        <th scope="col" onclick="sortTable(7)">Comments<span id="icon-comments" class="icon"> <i class="fa fa-sort" aria-hidden="true"></i> </span></th>
        <th scope="col" >Actions</th>
      </tr>
    </thead>
    <tbody id="table-body1">`;
  let dt = '';
  for (let i in tasks) {
    let cdate = tasks[i].created_at;
    console.log(cdate);
    let d = new Date(cdate);
    if (tasks[i].status == 'completed') {
      table += `<tr  style="margin:10px; border-radius:30px; background-color:white;text-align:center"> 
           <td  > ${tasks[i].taskId}</td>
           <td  > <b>${tasks[i].taskname}</b>
           <br><i><lable>${tasks[i].description}</label></i>
           </td>
           <td  >${d.toLocaleString()}</td>
           <td  >${tasks[i].assignto}</td>
           <td  >${tasks[i].duration}</td>
           <td >${tasks[i].priority}</td>
           <td  > <b><label style="color:green;">${tasks[i].status}</label></b></td>
           <td>
           ${tasks[i].comments}
           </td>
           <td>
           <button type="button" class="text-primary" style="border:none;font-size:25px;background-color:transparent;" onclick="editTask('${tasks[i]._id}')"  data-bs-toggle="modal" data-bs-target="#updateModel" style="border:none;font-size:25px"  data-bs-whatever="@mdo"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>

               <button type="button" class="text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" style="font-size:20px; background-color:transparent;border:none;" onclick="deleteTask('${tasks[i]._id}')">
               <i class="fa fa-trash" aria-hidden="true"></i>
             </button>
           </td>
         </tr>`
    }
    else if (tasks[i].status == 'in progress') {
      table += `<tr  style="margin:10px; border-radius:30px; background-color:white;text-align:center"> 
          <td  > ${tasks[i].taskId}</td>
          <td  > <b>${tasks[i].taskname}</b>
          <br><i><lable>${tasks[i].description}</label></i>
          </td>
          <td  >${d.toLocaleString()}</td>
          <td  >${tasks[i].assignto}</td>
          <td  >${tasks[i].duration}</td>
          <td >${tasks[i].priority}</td>
          <td  > <b><label style="color:orange;border-radius:15px;">${tasks[i].status}</label></b></td>
          <td>
          ${tasks[i].comments}
          </td>
          <td>
          <button type="button" class="text-primary" onclick="editTask('${tasks[i]._id}')" style="border:none;font-size:25px;background-color:transparent;"  data-bs-toggle="modal" style="border:none;font-size:25px"  data-bs-target="#updateModel" data-bs-whatever="@mdo"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>

              <button type="button" class="text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" style="border:none;font-size:25px;background-color:transparent;"  onclick="deleteTask('${tasks[i]._id}')">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>`
    }
    else {
      table += `<tr  style="margin:10px; border-radius:30px; background-color:white;text-align:center; margin-bottom:30px;"> 
    <td  > ${tasks[i].taskId}</td>
    <td  > <b>${tasks[i].taskname}</b>
    <br><i><lable>${tasks[i].description}</label></i>
    </td>
    <td  >${d.toLocaleString()}</td>
    <td  >${tasks[i].assignto}</td>
    <td  >${tasks[i].duration}</td>
    <td >${tasks[i].priority}</td>
    <td  > <b><label style="color:red;border-radius:15px;">${tasks[i].status}</label></b></td>
    <td>
    ${tasks[i].comments}
    </td>
    <td>
    <button type="button" class=" text-primary" style="border:none;font-size:25px;background-color:transparent;" onclick="editTask('${tasks[i]._id}')"  data-bs-toggle="modal" data-bs-target="#updateModel" data-bs-whatever="@mdo"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>

        <button type="button" class="text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" style="border:none;font-size:25px;background-color:transparent;"  onclick="deleteTask('${tasks[i]._id}')">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </td>
  </tr>`
    }
  }
  table += `</tbody> </table>`
  document.getElementById("tableTask").innerHTML = table;

}
let id = '';
let task = '';
/** this edittask() displays a form for update task details with pre-populated data form table 
 * @ taskId represents the task id of the task which needs to be updated
*/
function editTask(taskId) {
  id = taskId;
  let req1 = new XMLHttpRequest();
  const url = "http://localhost:8080/tasks/" + taskId;
  req1.open("GET", url, true);
  req1.send();
  req1.onreadystatechange = function () {
    if (req1.readyState === 4) {
      if (req1.status === 200) {
        task = JSON.parse(req1.responseText);
        document.getElementById("textName").value = task.taskname;
        document.getElementById("textdescription").value = task.description;
        document.getElementById("textstatus").value = task.status;
        document.getElementById("textduration").value = task.duration;
        document.getElementById("textpriority").value = task.priority;

      }
    }
  }
}
/**
 * updateTask() function update the task details for the particular task
 */
function updateTask() {
  document.getElementById("updateModel").style.display = 'none';
  let task = document.getElementById("textName").value;
  let des = document.getElementById("textdescription").value;
  let sts = document.getElementById("textstatus").value;
  let dura = document.getElementById("textduration").value;
  let pr = document.getElementById("textpriority").value;

  let req = new XMLHttpRequest();
  req.open("PUT", "http://localhost:8080/tasks/" + id, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify({
    "taskname": task,
    "description": des,
    "priority": pr,
    "duration": dura,
    "status": sts
  }));
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status == 200) {
        window.location.reload();
      }
    }
  }
}

/**
 * deleteTask() function delete the task after getting confirmation from users
 * @ id represents the task id to which to be deleted
 */
function deleteTask(id) {
  let modal = document.getElementById("exampleModal");
  modal.classList.add("show");
  modal.style.display = "block";
  let cancelDelete = document.querySelectorAll(".deleteCancel");
  cancelDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  });

  let confirmDelete = document.querySelector(".confirmDelete");
  confirmDelete.addEventListener("click", () => {
    modal.style.display = "none";

    let req = new XMLHttpRequest();
    let url = "http://localhost:8080/tasks/" + id;
    req.open('DELETE', url, true);
    req.setRequestHeader('content-type', 'application/json');
    req.send();
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          window.location.href = "http://localhost:8080/adminViewTasks.html"
          // alert("Deleted Successfully!!!!")
        }
        else {
          console.log("Faliedddddddddddddd");
        }
      }
    }
  });
}

/** search_sort() function seach data in the table */
function search_sort() {
  document.getElementById("searchData").addEventListener("input", function () {
    let input, filter, table, tbody, tr, td, i, txtValue;
    input = document.getElementById("searchData");
    filter = input.value.toUpperCase();
    table = document.getElementById("table1");
    tbody = document.getElementById("table-body1");
    tr = tbody.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (let j = 0; j < td.length; j++) {
        txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break; // Break the inner loop to avoid displaying the row multiple times
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  });
}

/** sortTable() function sort all the rows and columns ascending and descending order */
function sortTable(columnIndex) {
  let table, rows, switching,i,x,y,shouldSwitch,dir,switchcount = 0;
  table = document.getElementById("table1");
  switching = true;
  dir = "asc";
  if (
    document
      .getElementById("icon-" + getColumnId(columnIndex))
      .innerHTML.includes("up")
  ) {
    dir = "desc";
  }

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[columnIndex];
      y = rows[i + 1].getElementsByTagName("td")[columnIndex];

      let xValue = isNaN(parseFloat(x.innerHTML))
        ? x.innerHTML.toLowerCase()
        : parseFloat(x.innerHTML);
      let yValue = isNaN(parseFloat(y.innerHTML))
        ? y.innerHTML.toLowerCase()
        : parseFloat(y.innerHTML);

      if (dir === "asc") {
        if (xValue > yValue) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === "desc") {
        if (xValue < yValue) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount === 0 && dir === "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  resetIcons();
  if (dir === "asc") {
    document.getElementById("icon-" + getColumnId(columnIndex)).innerHTML =
      '<i class="fas fa-sort-up"></i>';
  } else {
    document.getElementById("icon-" + getColumnId(columnIndex)).innerHTML =
      '<i class="fas fa-sort-down"></i>';
  }
}
/**resetIcons() for reset icons into original form after clicking once */
function resetIcons() {
  document.getElementById("icon-id").innerHTML = '<i class="fas fa-sort"></i>';
  document.getElementById("icon-name").innerHTML = '<i class="fas fa-sort"></i>';
  document.getElementById("icon-date").innerHTML ='<i class="fas fa-sort"></i>';
  document.getElementById("icon-assigned").innerHTML = '<i class="fas fa-sort"></i>';
  document.getElementById("icon-priority").innerHTML ='<i class="fas fa-sort"></i>';
  document.getElementById("icon-status").innerHTML ='<i class="fas fa-sort"></i>';
  document.getElementById("icon-duration").innerHTML ='<i class="fas fa-sort"></i>';
  document.getElementById("icon-comments").innerHTML ='<i class="fas fa-sort"></i>';
}
function getColumnId(columnIndex) {
  switch (columnIndex) {
    case 0:
      return "id";
    case 1:
      return "name";
    case 2:
      return "date";
    case 3:
      return "assigned";
    case 4:
      return "duration";
    case 5:
      return "priority";
    case 6:
      return "status";
    case 7:
      return "comments";
    default:
      return "";
  }
}

