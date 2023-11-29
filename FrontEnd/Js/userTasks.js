window.onload = getUsertasks;
let username = ''
let users = '';
/**
 * getUserTasks() function retrieves all the tasks assigned to particular users
  */
function getUsertasks() {
  let username = localStorage.getItem("Email");
  document.getElementById("welMsg").innerHTML = "Welcome " + username + " !";
  let req1 = new XMLHttpRequest();
  const url = "http://localhost:8080/usertask?assignto=" + username;
  req1.open("GET", url, true);
  req1.send();
  req1.onreadystatechange = function () {
    if (req1.readyState === 4) {
      if (req1.status === 200) {
        users = JSON.parse(req1.responseText);
        display(users);
        setTimeout(alertTask, 2000);
      }
    }
  }
  event.preventDefault();
}
/**
 * display() function display all the tasks for the particular user
 * @param  {Object} users  represents the  all the assigned tasks of the user
 */
function display(users) {
  let item1 = '';
  let item2 = '';
  let item3 = '';
  if (users.length > 0) {
    for (let i in users) {
      if (users[i].status == "completed") {
        item1 += `  <div class="card" style="margin:10px;">
      <div class="card-header" style="font-weight: bolder; text-align:center;">
        ${users[i].taskname}
      </div>
      <div class="card-body">
      <p><b>Description:</b> ${users[i].description}</p>
      <p><b>Duration</b>: ${users[i].duration}</p>
      <p><b>Priority</b> ${users[i].priority}</p>
      <div style="text-align:left;" >
      <button type="button" class="btn btn-primary" data-toggle="modal"  data-target="#uptStatus" data-whatever="@mdo" onclick="updateStatus('${users[i]._id}')">Update Status</button>
       </div> <br>
       <div class="form-outline w-30" >
        <label class="form-label" for="textAreaExample" style="color:black"><b>Comments</b></label>
        <textarea class="form-control" id="comment" rows="4"
          style="background: #fff;"></textarea>
          <br>
          <button type="button" class="btn btn-primary btn-sm" onclick="postComment('${users[i]._id}')">Post comment</button>
          <button type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
      </div>
    </div>
    
      </div>
`
      }
      if (users[i].status == "in progress") {
        item2 += ` <div class="card" style="margin:10px;">
      <div class="card-header" style="font-weight: bolder; text-align:center;">
        ${users[i].taskname}
      </div>
      <div class="card-body">
      <p><b>Description:</b> ${users[i].description}</p>
      <p><b>Duration</b>: ${users[i].duration}</p>
      <p><b>Priority</b> ${users[i].priority}</p>
      <div style="text-align:left;" >
      <button type="button" class="btn btn-primary" data-toggle="modal"  data-target="#uptStatus" data-whatever="@mdo" onclick="updateStatus('${users[i]._id}')">Update Status</button>
       </div> <br>
       <div class="form-outline w-30" >
        <label class="form-label" for="textAreaExample" style="color:black"><b>Comments</b></label>
        <textarea class="form-control" id="comment" rows="4"
          style="background: #fff;"></textarea>
          <br>
          <button type="button" class="btn btn-primary btn-sm" onclick="postComment('${users[i]._id}')">Post comment</button>
          <button type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
      </div>
    </div>
    
      </div>`
      }
      if (users[i].status == "not started") {
        item3 += ` <div class="card" style="margin:10px;">
      <div class="card-header" style="font-weight: bolder; text-align:center;">
        ${users[i].taskname}
      </div>
      <div class="card-body">
      <p><b>Description:</b> ${users[i].description}</p>
      <p><b>Duration</b>: ${users[i].duration}</p>
      <p><b>Priority</b> ${users[i].priority}</p>
      <div style="text-align:left;" >
      <button type="button" class="btn btn-primary" data-toggle="modal"  data-target="#uptStatus" data-whatever="@mdo" onclick="updateStatus('${users[i]._id}')">Update Status</button>
       </div> <br>
       <div class="form-outline w-30" >
        <label class="form-label" for="textAreaExample" style="color:black"><b>Comments</b></label>
        <textarea class="form-control" id="comment" rows="4"
          style="background: #fff;"></textarea>
          <br>
          <button type="button" class="btn btn-primary btn-sm" onclick="postComment('${users[i]._id}')">Post comment</button>
          <button type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
      </div>
    </div>
    
      </div>`
      }

    }
    document.getElementById("xyz").innerHTML = item1;
    document.getElementById("xyz1").innerHTML = item2;
    document.getElementById("not_started").innerHTML = item3;
  }
  else {
    document.getElementById("mytask").innerHTML = "No tasks Assigned yet!!"
    document.getElementById("mytask").style.cssText = `
    font-size:40px;
    font-weight:bolder;
    margin-bottom:10px;
    text-align:center;
    padding-left:350px;
    padding-bottom:100px;
    `
    document.getElementById("body").style.cssText = `
  background-image:url('../assests/oops.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center; 
  background-size: 250px 250px;
`;


  }

}
let upTaskId = '';
/**
 * updateStatus() function gets id of the task to which need to be update
 * @param { String} id  represents the id of the task
 */
function updateStatus(id) {
  let sts = document.getElementById("txtStatus").value;
  upTaskId = id;
}
// statusUpdate() update status of the task completion  */
function statusUpdate() {
  let sts = document.getElementById("txtStatus").value;
  let req = new XMLHttpRequest();
  req.open("PUT", "http://localhost:8080/tasks/" + upTaskId, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify({
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

// alertTask() function gives alert to user when a new task is assigned

function alertTask() {
  let flag = 0;
  for (keys in users) {
    if (users[keys].notifications == 1) {
      alert(`Hello ${username}, you have assigned a new task`);
      let updateId = users[keys]._id;
      let req = new XMLHttpRequest();
      req.open("PUT", "http://localhost:8080/tasks/" + updateId, true);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify({
        "notifications": 0
      }));
      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          if (req.status == 200) {
            window.location.reload();
          }
        }
      }
    }
    event.preventDefault();
  }

}

// getTasks() provides all the users who have task


function getTasks() {
  document.getElementById("mytask").style.display = 'none';
  document.getElementById("allUserTask").style.display = 'block'
  let req1 = new XMLHttpRequest();
  const url = "http://localhost:8080/tasks";
  req1.open("GET", url, true);
  req1.send();
  req1.onreadystatechange = function () {
    if (req1.readyState === 4) {
      if (req1.status === 200) {
        tasks = JSON.parse(req1.responseText);
        display2(tasks);
        searchSort();
      }
    }
  }
  event.preventDefault();
}

/**
 *  display2()
 * @param {Object} tasks  represents all the tasks who has task assigned
 */
function display2(tasks) {
  let table = `
  <button type="submit"  class="bg-danger" onclick="showMyTask()"  style="border-radius:5px; padding:10px;margin:10px" > Back</button>
  <input type="text" name="" id="search" class="bg-light" placeholder="Search here..." >
  <table class="table table-hover " id="table11" >
    <thead>
      <tr  class="table-active" style="margin:10px; border-radius:30px; background-color:white;text-align:center" >
        <th scope="col" onclick="sortTable(0)" >Task ID<span id="icon-id" class="icon"> <i class="fa fa-sort" aria-hidden="true"></i></span></th>
        <th scope="col" onclick="sortTable(1)">Task Name <span id="icon-name" class="icon"> <i class="fa fa-sort" aria-hidden="true"></i> </span></th>
        <th scope="col" onclick="sortTable(2)"> Assigned Date<span id="icon-date" class="icon"> <i class="fa fa-sort" aria-hidden="true"></i> </span></th>
        <th scope="col" onclick="sortTable(3)">Assigned To <span id="icon-assigned" class="icon"><i class="fa fa-sort" aria-hidden="true"></i> </span></th>
        <th scope="col" onclick="sortTable(4)">Duration <span id="icon-duration" class="icon"><i class="fa fa-sort" aria-hidden="true"></i> </span></th>
        <th scope="col" onclick="sortTable(5)">Priority<span id="icon-priority" class="icon"> <i class="fa fa-sort" aria-hidden="true"></i></span></th>
        <th scope="col" onclick="sortTable(6)">Status <span id="icon-status" class="icon"> <i class="fa fa-sort" aria-hidden="true"></i> </span></th>
        <th scope="col" onclick="sortTable(7)">Comments<span id="icon-comments" class="icon"> <i class="fa fa-sort" aria-hidden="true"></i> </span></th>
        
      </tr>
    </thead>
    <tbody id="table-body11">`;
  let dt = '';
  for (let i in tasks) {
    let cdate = tasks[i].created_at;
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
   
  </tr>`
    }
  }
  table += `</tbody> </table>`
  document.getElementById("allUserTask").innerHTML = table;

}
 /**
  * search_
  */
function searchSort() {
  document.getElementById("search").addEventListener("input", function () {
    let input, filter, table, tbody, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table11");
    tbody = document.getElementById("table-body11");
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

 /**
  * sortTable() represents function which helps for sorting all  the  fields of the table
  * @param {Integer} columnIndex  represents the index of the table header
  */
function sortTable(columnIndex) {
  let table, rows, switching,i, x,y,shouldSwitch,dir,switchcount = 0;
  table = document.getElementById("table11");
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
      '<i class="fa fa-sort-asc" aria-hidden="true"></i>';
  } else {
    document.getElementById("icon-" + getColumnId(columnIndex)).innerHTML =
      '<i class="fa fa-sort-desc" aria-hidden="true"></i>';
  }
}
/**
 * resetIcons() function reset icons into original one
 */
function resetIcons() {
  document.getElementById("icon-id").innerHTML = '<i class="fas fa-sort"></i>';
  document.getElementById("icon-name").innerHTML = '<i class="fas fa-sort"></i>';
  document.getElementById("icon-date").innerHTML =
    '<i class="fas fa-sort"></i>';
  document.getElementById("icon-assigned").innerHTML =
    '<i class="fas fa-sort"></i>';
  document.getElementById("icon-priority").innerHTML =
    '<i class="fas fa-sort"></i>';
  document.getElementById("icon-status").innerHTML =
    '<i class="fas fa-sort"></i>';
  document.getElementById("icon-duration").innerHTML =
    '<i class="fas fa-sort"></i>';
  document.getElementById("icon-comments").innerHTML =
    '<i class="fas fa-sort"></i>';
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

function showMyTask() {
  document.getElementById("allUserTask").style.display = 'none'
  window.location.reload();
}
/**
 * postComment() function inserts a comments to database for the particular task
 * @param {String} id 
 */
function postComment(id) {
  let comment = document.getElementById('comment').value;
  let req = new XMLHttpRequest();
  req.open("PUT", "http://localhost:8080/tasks/" + id, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify({
    "comments": comment
  }));
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status == 200) {
        Swal.fire({
          title: "Good job!",
          text: "Comment added Suceessfully!!",
          icon: "success",
          timers: 2000000
        })
        document.getElementById('comment').value = ' ';
        event.preventDefault();
      }
    }
  }
}










