(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{48:function(e,t,a){e.exports=a(86)},53:function(e,t,a){},77:function(e,t,a){},86:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(25),i=a.n(r),l=(a(53),a(6)),o=a(7),c=a(10),u=a(8),d=a(11),h=a(5),m=a(22),p=a(3),g=a.n(p),f=a(9),k=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={users:[],errors:[]},a.getUsers=function(){g.a.get("/api/users").then(function(e){a.setState({users:e.data})}).catch(function(e){a.setState({errors:e.data})})},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.getUsers()}},{key:"render",value:function(){var e=this.state.users.sort(function(e,t){return e.name>t.name?1:e.name<t.name?-1:0}).map(function(e){return s.a.createElement("div",{name:e.name,key:e._id},s.a.createElement("h2",null,s.a.createElement(h.b,{to:"/".concat(e._id)},e.name)))});return s.a.createElement("div",null,s.a.createElement("h1",{className:"users-header"},"All Users"),s.a.createElement("div",{className:"users-list"},e))}}]),t}(n.Component),E=Object(f.b)(function(e){return{auth:e.auth}})(k),v=(a(77),a(13)),b=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).priorityFilterAndMap=function(e){return a.props.tasks.filter(function(t){return t.priority===e}).map(function(e){var t="";switch(e.priority){case"Low":t="rgba(0, 255, 0, 0.8)";break;case"Medium":t="rgba(255, 255, 0, 0.8)";break;case"High":t="rgba(255, 0, 0, 0.8)";break;default:t="white"}return s.a.createElement(h.b,{to:"/".concat(e.userId,"/tasks/").concat(e._id),style:{color:"black",textDecoration:"none"},key:e._id},s.a.createElement("div",{className:"task",style:{backgroundColor:t}},s.a.createElement("h3",null,e.title),s.a.createElement("h4",null,"Priority: ",e.priority),s.a.createElement("h4",null,"Est. Hours To Complete: ",e.estimatedHours)))})},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("h1",null,this.props.openOrFinished," Tasks"),!0!==this.props.assignedBy?s.a.createElement(h.b,{to:"/".concat(this.props.userId,"/newtask")},s.a.createElement("button",null,"Create New Task")):null,s.a.createElement("div",{className:"task-list"},this.priorityFilterAndMap("High"),this.priorityFilterAndMap("Medium"),this.priorityFilterAndMap("Low")))}}]),t}(n.Component),y=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={user:{},tasks:[],errors:[],editUser:!1,redirectToHome:!1,showFinishedTasks:!1},a.getUser=function(){g.a.get("/api/users/".concat(a.props.match.params.userId)).then(function(e){g.a.get("/api/users/".concat(a.props.match.params.userId,"/tasks")).then(function(t){a.setState({user:e.data,tasks:t.data})})}).catch(function(e){a.setState({err:e.data})})},a.handleToggleEdit=function(){a.setState(function(e){return{editUser:!e.editUser}})},a.handleToggleShowFinishedTasks=function(){a.setState(function(e){return{showFinishedTasks:!e.showFinishedTasks}})},a.handleChange=function(e){var t=Object(v.a)({},a.state.user);t[e.target.name]=e.target.value,a.setState({user:t})},a.handleSubmit=function(e){e.preventDefault(),g.a.put("/api/users/".concat(a.state.user._id),a.state.user),a.setState({editUser:!1})},a.handleDeleteUser=function(){window.confirm("Are you sure you want to delete this user?")&&g.a.delete("/api/users/".concat(a.props.match.params.userId)).then(function(){a.setState({redirectToHome:!0})})},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.getUser()}},{key:"render",value:function(){if(this.state.redirectToHome)return s.a.createElement(m.a,{to:"/"});var e=this.state.tasks.filter(function(e){return"Finished"!==e.status}),t=this.state.tasks.filter(function(e){return"Finished"===e.status});return s.a.createElement("div",null,s.a.createElement(h.b,{to:"/"},s.a.createElement("button",null,"Back to Users")),s.a.createElement("h1",null,this.state.user.name),this.state.user._id===this.props.auth.user.id?s.a.createElement("button",{onClick:this.handleToggleEdit},this.state.editUser?"Back to User":"Edit User"):null,s.a.createElement("br",null),s.a.createElement("h3",null,this.state.showFinishedTasks?"Total Finished Tasks: ".concat(t.length):"Total Open Tasks: ".concat(e.length)),s.a.createElement("button",{onClick:this.handleToggleShowFinishedTasks},this.state.showFinishedTasks?"Show Open Tasks":"Show Finished Tasks"),this.state.editUser?s.a.createElement("div",null,s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"name"},"Name: "),s.a.createElement("input",{type:"text",name:"name",required:!0,value:this.state.user.name,onChange:this.handleChange})),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"email"},"Email: "),s.a.createElement("input",{type:"email",name:"email",required:!0,value:this.state.user.email,onChange:this.handleChange})),s.a.createElement("input",{type:"submit",value:"Submit"}))):s.a.createElement(b,{tasks:this.state.showFinishedTasks?t:e,userId:this.state.user._id,openOrFinished:this.state.showFinishedTasks?"Finished":"Open"}),this.state.user._id===this.props.auth.user.id?s.a.createElement("button",{onClick:this.handleDeleteUser,style:{marginTop:"5vh"}},"Delete User"):null)}}]),t}(n.Component),w=Object(f.b)(function(e){return{auth:e.auth}})(y),T=function(e){e?g.a.defaults.headers.common.Authorization=e:delete g.a.defaults.headers.common.Authorization},D=a(26),O=a.n(D),S=function(e){return{type:"SET_CURRENT_USER",payload:e}},j=function(){return function(e){localStorage.removeItem("jwtToken"),T(!1),e(S({}))}},F=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).handleLogoutUser=function(){a.props.logoutUser(),window.href="/"},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e={color:"white",textDecoration:"none"};return s.a.createElement("header",{className:"header"},s.a.createElement(h.b,{to:"/",style:{textDecoration:"none"}},s.a.createElement("h1",null,"Bennett Task Tracker")),s.a.createElement("nav",null,s.a.createElement("a",{href:"/".concat(this.props.auth.user.id),style:e},"My Tasks"),s.a.createElement(h.b,{to:"/",style:e},"All Users"),s.a.createElement(h.b,{to:"/tasksAssigned",style:e},"Tasks I Have Assigned"),s.a.createElement(h.b,{to:"/calendar",style:e},"My Calendar")),this.props.auth.user.name?s.a.createElement("div",{className:"logout"},s.a.createElement("h5",null,"User Logged In: ",this.props.auth.user.name),s.a.createElement("button",{onClick:this.handleLogoutUser},"Log Out")):null)}}]),t}(n.Component),C=Object(f.b)(function(e){return{auth:e.auth}},{logoutUser:j})(F),I=a(27),U=a.n(I),A=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={task:{},files:[],userAssignedBy:{},errors:{},editTask:!1,user:{},redirectToUser:!1,dueDateChanged:!1,initialStatus:"",redirectToTaskAssigned:!1},a.getTask=function(){g.a.get("/api/users/".concat(a.props.match.params.userId,"/tasks/").concat(a.props.match.params.taskId)).then(function(e){a.setState({task:e.data,initialStatus:e.data.status}),g.a.get("/api/users/".concat(e.data.assignedById)).then(function(e){a.setState({userAssignedBy:e.data})}).catch(function(e){a.setState({errors:e.data})}),g.a.get("/api/users/".concat(a.state.task.userId)).then(function(e){a.setState({user:e.data})})}).catch(function(e){a.setState({errors:e.data})})},a.getFiles=function(){g.a.get("/api/files/byTask/".concat(a.props.match.params.taskId)).then(function(e){a.setState({files:e.data})}).catch(function(e){a.setState({errors:e.data})})},a.handleToggleEdit=function(){a.setState(function(e){return{editTask:!e.editTask}})},a.handleChange=function(e){var t=Object(v.a)({},a.state.task);"dueDate"===e.target.name?(t.dueDate=new Date("".concat(e.target.value,"T17:00:00")),a.setState({task:t,dueDateChanged:!0})):(t[e.target.name]=e.target.value,a.setState({task:t}))},a.handleSubmit=function(e){if(e.preventDefault(),"Finished"===a.state.task.status){if(window.confirm("Are you sure you want to mark this task as finished? This will remove it from your active tasks.")){var t=new Date("".concat(a.getDueDate(!0),"T17:00:00")),n={_id:a.state.task._id,title:a.state.task.title,priority:a.state.task.priority,estimatedHours:a.state.task.estimatedHours,description:a.state.task.description,userId:a.props.match.params.userId,userEmail:a.state.task.userEmail,status:a.state.task.status,dueDate:t,assignedBy:a.state.task.assignedBy,assignedById:a.state.task.assignedById},s=a.state.userAssignedBy.email,r="".concat(a.state.user.name," has completed the task ").concat(a.state.task.title,".");g.a.post("/send",{subject:"A Task You Assigned Has Been Completed",email:s,message:r}).then(function(e){"success"!==e.data.msg&&alert("Email failed to send")}).then(function(){g.a.put("/api/users/".concat(a.state.task.userId,"/tasks/").concat(a.state.task._id),n)}),a.setState({editTask:!1,dueDateChanged:!1})}}else{var i=a.state.user.email,l="Your task ".concat(a.state.task.title," has been updated\n\nDescription: ").concat(a.state.task.description,"\n\nThis is a ").concat(a.state.task.priority," priority task");g.a.post("/send",{subject:"One Of Your Tasks Has Been Updated",email:i,message:l}).then(function(e){"success"!==e.data.msg&&alert("Email failed to send")}).then(function(){var e=new Date("".concat(a.getDueDate(!0),"T17:00:00")),t={_id:a.state.task._id,title:a.state.task.title,priority:a.state.task.priority,estimatedHours:a.state.task.estimatedHours,description:a.state.task.description,userId:a.props.match.params.userId,userEmail:a.state.task.userEmail,status:a.state.task.status,dueDate:e,assignedBy:a.state.task.assignedBy,assignedById:a.state.task.assignedById};g.a.put("/api/users/".concat(a.state.task.userId,"/tasks/").concat(a.state.task._id),t),a.setState({editTask:!1,dueDateChanged:!1})})}},a.handleReopenTask=function(){if(window.confirm("Are you sure you want to reopen this task?")){var e=Object(v.a)({},a.state.task);e.status="Started",a.setState({task:e});var t=a.state.user.email,n="Your task ".concat(a.state.task.title," has been reopened.");g.a.post("/send",{subject:"A Task Has Been Reopened",email:t,message:n}).then(function(e){"success"!==e.data.msg&&alert("Email failed to send")}).then(function(){g.a.put("/api/users/".concat(a.state.task.userId,"/tasks/").concat(a.state.task._id),a.state.task)}).then(function(){a.setState({redirectToTaskAssigned:!0})})}},a.handleDelete=function(){window.confirm("Are you sure you want to remove this task?")&&g.a.delete("/api/users/".concat(a.state.task.userId,"/tasks/").concat(a.state.task._id)).then(function(){a.setState({redirectToUser:!0})})},a.handleFilestack=function(e){if(e.filesUploaded.length){var t=e.filesUploaded[0],n={title:t.filename,file:t.url,fileId:t.uploadId,taskId:a.state.task._id};g.a.post("/api/files/",n).then(function(){a.getFiles()}).then(function(){var e=a.state.task.userEmail,t="".concat(a.props.auth.user.name,' has added a file called "').concat(n.title,'" to your task ').concat(a.state.task.title);g.a.post("/send",{subject:"A File Has Been Uploaded For One Of Your Tasks",email:e,message:t}).then(function(e){"success"!==e.data.msg&&alert("Email failed to send")})}).catch(function(){alert("File upload failed!")})}},a.handleDeleteFile=function(e){window.confirm("Are you sure you want to delete this file?")&&g.a.delete("/api/files/".concat(e.target.id)).then(function(){a.getFiles()}).catch(function(e){a.setState({errors:e.data})})},a.getTaskDateTimeStarted=function(){var e=new Date(a.state.task.dateTimeStarted);return e.getHours()>12?"".concat(e.getMonth()+1,"/").concat(e.getDate(),"/").concat(e.getFullYear()," at ").concat(e.getHours()-12,":").concat(e.getMinutes()," PM"):"".concat(e.getMonth()+1,"/").concat(e.getDate(),"/").concat(e.getFullYear()," at ").concat(e.getHours(),":").concat(e.getMinutes()," AM")},a.getDueDate=function(e){var t=new Date(a.state.task.dueDate),n=t.getMonth()+1<10?"0".concat(t.getMonth()+1):t.getMonth()+1,s=t.getDate()<10?"0".concat(t.getDate()):t.getDate();return e?"".concat(t.getFullYear(),"-").concat(n,"-").concat(s):"".concat(t.getMonth()+1,"/").concat(t.getDate(),"/").concat(t.getFullYear())},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.getTask(),this.getFiles()}},{key:"componentWillReceiveProps",value:function(e){}},{key:"render",value:function(){var e=this;if(this.state.redirectToUser)return s.a.createElement(m.a,{to:"/".concat(this.state.task.userId)});if(this.state.redirectToTaskAssigned)return s.a.createElement(m.a,{to:"/tasksAssigned"});var t=this.state.files.map(function(t){return s.a.createElement("li",{key:t._id},s.a.createElement("a",{href:t.file,target:"_blank",rel:"noopener noreferrer"},t.title),e.props.auth.user.id===e.state.task.assignedById||e.props.auth.user.id===e.state.task.userId?s.a.createElement("button",{id:t._id,onClick:e.handleDeleteFile},"X"):null)});return s.a.createElement("div",null,"Finished"===this.state.initialStatus||this.props.auth.user.id!==this.state.task.userId&&this.props.auth.user.id!==this.state.task.assignedById?null:s.a.createElement("button",{onClick:this.handleToggleEdit},this.state.editTask?"Back to Task":"Edit Task"),this.state.editTask?s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"title"},"Title: "),s.a.createElement("input",{type:"text",name:"title",required:!0,value:this.state.task.title,onChange:this.handleChange})),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"priority"},"Priority: "),s.a.createElement("select",{name:"priority",id:"priority",value:this.state.task.priority,onChange:this.handleChange},s.a.createElement("option",{value:"Low"},"Low"),s.a.createElement("option",{value:"Medium"},"Medium"),s.a.createElement("option",{value:"High"},"High"))),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"estimatedHours"},"Estimated Hours To Complete:"," "),s.a.createElement("input",{type:"number",name:"estimatedHours",id:"estimatedHours",value:this.state.task.estimatedHours,onChange:this.handleChange})),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"dueDate"},"Due Date: "),s.a.createElement("input",{type:"date",name:"dueDate",id:"dueDate",value:this.getDueDate(!0),onChange:this.handleChange}),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"status"},"Status: "),s.a.createElement("select",{name:"status",id:"status",value:this.state.task.status,onChange:this.handleChange},s.a.createElement("option",{value:"Not Started"},"Not Started"),s.a.createElement("option",{value:"Started"},"Started"),s.a.createElement("option",{value:"Finished"},"Finished")))),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"description"},"Description: "),s.a.createElement("textarea",{name:"description",id:"description",cols:"30",rows:"10",value:this.state.task.description,onChange:this.handleChange})),s.a.createElement("input",{type:"submit",value:"Submit"})):s.a.createElement("div",null,s.a.createElement("h1",null,this.state.task.title),s.a.createElement("h3",null,"User:"," ",s.a.createElement(h.b,{to:"/".concat(this.state.task.userId)},this.state.user.name)),s.a.createElement("h3",null,"Priority: ",this.state.task.priority),s.a.createElement("h3",null,"Estimated Hours To Complete: ",this.state.task.estimatedHours),s.a.createElement("h4",null,"Date and Time Started: ",this.getTaskDateTimeStarted()),s.a.createElement("h4",null,"Due Date: ",this.getDueDate(!1)),s.a.createElement("h4",null,"Status: ",this.state.task.status),s.a.createElement("p",null,this.state.task.description),this.state.files.length?s.a.createElement("div",{className:"file-list"},s.a.createElement("strong",null,"Files Associated With This Task:"),s.a.createElement("br",null),t):null,this.props.auth.user.id===this.state.task.userId||this.props.auth.user.id===this.state.task.assignedById?s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"file"},"Add a File For This Task: "),s.a.createElement(U.a,{apikey:"A3dN1QIkHQuegMk3YnwA4z",onSuccess:function(t){return e.handleFilestack(t)}})):null,s.a.createElement("br",null),this.props.auth.user.id!==this.state.task.userId&&this.props.auth.user.id!==this.state.task.assignedById||"Finished"!==this.state.task.status?null:s.a.createElement("div",null,s.a.createElement("button",{onClick:this.handleReopenTask},"Reopen Task")),this.props.auth.user.id===this.state.task.userId||this.props.auth.user.id===this.state.task.assignedById?s.a.createElement("button",{onClick:this.handleDelete},"Delete Task"):null))}}]),t}(n.Component),M=Object(f.b)(function(e){return{auth:e.auth}})(A),H=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={newTask:{title:"",priority:"Low",estimatedHours:0,description:"",dueDate:""},file:{},user:{},redirectToUser:!1},a.getUser=function(){g.a.get("/api/users/".concat(a.props.match.params.userId)).then(function(e){a.setState({user:e.data})})},a.handleChange=function(e){var t=Object(v.a)({},a.state.newTask);t[e.target.name]=e.target.value,a.setState({newTask:t})},a.handleFilestack=function(e){if(e.filesUploaded.length){var t=e.filesUploaded[0],n={title:t.filename,file:t.url,fileId:t.uploadId};a.setState({file:n})}else alert("File failed to upload")},a.handleSubmit=function(e){e.preventDefault();var t=""===document.querySelector("#dueDate").value?new Date(Date.now()):new Date("".concat(a.state.newTask.dueDate,"T17:00:00")),n={title:a.state.newTask.title,priority:a.state.newTask.priority,estimatedHours:a.state.newTask.estimatedHours,description:a.state.newTask.description,userId:a.props.match.params.userId,userEmail:a.state.user.email,dueDate:t,assignedBy:a.props.auth.user.name,assignedById:a.props.auth.user.id};g.a.post("/api/users/".concat(a.props.match.params.userId,"/tasks"),n).then(function(e){var t=a.state.user.email,s="".concat(n.assignedBy," assigned you the task ").concat(n.title,"\n\nDescription: ").concat(n.description,"\n\nThis is a ").concat(n.priority," priority task!");if(g.a.post("/send",{subject:"You Have Been Assigned a New Task",email:t,message:s}).then(function(e){"success"!==e.data.msg&&alert("Email failed to send")}),a.state.file.title){var r={title:a.state.file.title,file:a.state.file.file,fileId:a.state.file.fileId,taskId:e.data._id};g.a.post("/api/files",r).then(function(){console.log("file upload successful !")})}}).then(function(){a.setState({redirectToUser:!0})})},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.getUser()}},{key:"render",value:function(){var e=this;return this.state.redirectToUser?s.a.createElement(m.a,{to:"/".concat(this.props.match.params.userId)}):s.a.createElement("div",null,s.a.createElement(h.b,{to:"/".concat(this.props.match.params.userId)},s.a.createElement("button",null,"Back to User")),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"title"},"Title: "),s.a.createElement("input",{type:"text",name:"title",required:!0,value:this.state.newTask.title,onChange:this.handleChange})),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"priority"},"Priority: "),s.a.createElement("select",{name:"priority",value:this.state.newTask.priority,onChange:this.handleChange},s.a.createElement("option",{value:"Low"},"Low"),s.a.createElement("option",{value:"Medium"},"Medium"),s.a.createElement("option",{value:"High"},"High"))),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"estimatedHours"},"Estimated Hours to Complete:"," "),s.a.createElement("input",{type:"number",name:"estimatedHours",value:this.state.newTask.estimatedHours,onChange:this.handleChange})),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"dueDate"},"Due Date: "),s.a.createElement("input",{type:"date",name:"dueDate",id:"dueDate",onChange:this.handleChange})),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"description"},"Description: "),s.a.createElement("textarea",{name:"description",cols:"30",rows:"10",value:this.state.newTask.description,onChange:this.handleChange})),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"file"},"Add a File For This Task: "),s.a.createElement(U.a,{apikey:"A3dN1QIkHQuegMk3YnwA4z",onSuccess:function(t){return e.handleFilestack(t)}}),this.state.file.title?"file uploaded: ".concat(this.state.file.title):null),s.a.createElement("input",{type:"submit",value:"Submit"})))}}]),t}(n.Component),N=Object(f.b)(function(e){return{auth:e.auth}})(H),B=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={userLoggingIn:{email:"",password:""},errors:{}},a.handleChange=function(e){var t=Object(v.a)({},a.state.userLoggingIn);t[e.target.name]=e.target.value,a.setState({userLoggingIn:t})},a.handleSubmit=function(e){e.preventDefault();var t={email:a.state.userLoggingIn.email,password:a.state.userLoggingIn.password};a.props.loginUser(t)},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.auth.isAuthenticated&&this.props.history.push("/"),e.errors&&this.setState({errors:e.errors})}},{key:"render",value:function(){var e=this.state.errors;return s.a.createElement("div",null,s.a.createElement("h1",null,"Please Log In"),s.a.createElement("p",null,"Don't have an account? ",s.a.createElement(h.b,{to:"/register"},"Register")),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"email"},"Email: "),s.a.createElement("input",{type:"email",name:"email",id:"email",value:this.state.userLoggingIn.email,onChange:this.handleChange}),s.a.createElement("span",{className:"red-text"},e.emailnotfound)),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"password"},"Password: "),s.a.createElement("input",{type:"password",name:"password",id:"password",value:this.state.userLoggingIn.password,onChange:this.handleChange}),s.a.createElement("span",{className:"red-text"},e.passwordincorrect)),s.a.createElement("input",{type:"submit",value:"Log In"})))}}]),t}(n.Component),_=Object(f.b)(function(e){return{auth:e.auth,errors:e.errors}},{loginUser:function(e){return function(t){g.a.post("/api/users/login",e).then(function(e){var a=e.data.token;localStorage.setItem("jwtToken",a),T(a);var n=O()(a);t(S(n))}).catch(function(e){return t({type:"GET_ERRORS",payload:e.response.data})})}}})(B),R=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={newUser:{name:"",email:"",password:"",password2:""},errors:{}},a.handleChange=function(e){var t=Object(v.a)({},a.state.newUser);t[e.target.name]=e.target.value,a.setState({newUser:t})},a.handleSubmit=function(e){e.preventDefault();var t={name:a.state.newUser.name,email:a.state.newUser.email,password:a.state.newUser.password,password2:a.state.newUser.password2};if(a.props.registerUser(t,a.props.history),0===Object.keys(a.props.errors).length){var n=a.state.newUser.email,s="Welcome ".concat(t.name,",\nYou have been registered with the Bennett Task Tracker App! Check it out at http://bennett-task-tracker.herokuapp.com/");g.a.post("/send",{subject:"Welcome To The Bennett Task Tracker App",email:n,message:s}).then(function(e){"success"!==e.data.msg&&alert("Email failed to send")})}},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.errors&&this.setState({errors:e.errors})}},{key:"render",value:function(){var e=this.state.errors;return s.a.createElement("div",null,s.a.createElement("h1",null,"Register"),s.a.createElement("p",null,"Already have an account? ",s.a.createElement(h.b,{to:"/"},"Log In")),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"name"},"Name: "),s.a.createElement("input",{type:"text",name:"name",id:"name",value:this.state.newUser.name,onChange:this.handleChange}),s.a.createElement("span",{className:"red-text"},e.name)),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"email"},"Email: "),s.a.createElement("input",{type:"email",name:"email",id:"email",value:this.state.newUser.email,onChange:this.handleChange}),s.a.createElement("span",{className:"red-text"},e.email)),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"password"},"Password: "),s.a.createElement("input",{type:"password",name:"password",id:"password",value:this.state.newUser.password,onChange:this.handleChange}),s.a.createElement("span",{className:"red-text"},e.password)),s.a.createElement("div",null,s.a.createElement("label",{htmlFor:"password2"},"Confirm Password: "),s.a.createElement("input",{type:"password",name:"password2",id:"password2",value:this.state.newUser.password2,onChange:this.handleChange}),s.a.createElement("span",{className:"red-text"},e.password2)),s.a.createElement("input",{type:"submit",value:"Register"})))}}]),t}(n.Component),x=Object(f.b)(function(e){return{auth:e.auth,errors:e.errors}},{registerUser:function(e,t){return function(a){g.a.post("/api/users/register",e).then(function(e){return t.push("/login")}).catch(function(e){return a({type:"GET_ERRORS",payload:e.response.data})})}}})(Object(m.g)(R)),L=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={tasks:[],errors:{},showFinishedTasks:!1},a.getTasks=function(){g.a.get("/api/tasks/assignedBy/".concat(a.props.auth.user.id)).then(function(e){a.setState({tasks:e.data})}).catch(function(e){a.setState({errors:e.data})})},a.handleToggleOpenOrClosed=function(){a.setState(function(e){return{showFinishedTasks:!e.showFinishedTasks}})},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.getTasks()}},{key:"render",value:function(){var e=this.state.tasks.filter(function(e){return"Finished"===e.status}),t=this.state.tasks.filter(function(e){return"Finished"!==e.status});return s.a.createElement("div",null,s.a.createElement("h1",null,"Tasks I Have Assigned"),s.a.createElement("button",{onClick:this.handleToggleOpenOrClosed},this.state.showFinishedTasks?"Show Open Tasks":"Show Finished Tasks"),s.a.createElement(b,{tasks:this.state.showFinishedTasks?e:t,assignedBy:!0,openOrFinished:this.state.showFinishedTasks?"Finished":"Open"}))}}]),t}(n.Component),Y=Object(f.b)(function(e){return{auth:e.auth}})(L),P=a(47),W=a(88),q=a(95),z=a(89),G=a(90),Q=a(91),J=a(92),X=a(93),K=a(94),V=a(96),Z=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={currentMonth:new Date,selectedDate:new Date,tasks:[],errors:{}},a.getTasks=function(){g.a.get("/api/users/".concat(a.props.auth.user.id,"/tasks")).then(function(e){a.setState({tasks:e.data.filter(function(e){return"Finished"!==e.status})})}).catch(function(e){a.setState({errors:e.data})})},a.onDateClick=function(e){a.setState({selectedDate:e})},a.nextMonth=function(){a.setState({currentMonth:P.a(a.state.currentMonth,1)})},a.prevMonth=function(){a.setState({currentMonth:W.a(a.state.currentMonth,1)})},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.getTasks()}},{key:"renderHeader",value:function(){return s.a.createElement("div",{className:"header row flex-middle"},s.a.createElement("div",{className:"col col-start"},s.a.createElement("div",{className:"icon",onClick:this.prevMonth},"chevron_left")),s.a.createElement("div",{className:"col col-center"},s.a.createElement("span",null,q.a(this.state.currentMonth,"MMMM yyyy"))),s.a.createElement("div",{className:"col col-end"},s.a.createElement("div",{className:"icon",onClick:this.nextMonth},"chevron_right")))}},{key:"renderDays",value:function(){for(var e=[],t=z.a(this.state.currentMonth),a=0;a<7;a++)e.push(s.a.createElement("div",{className:"col col-center",key:a},q.a(G.a(t,a),"iiii")));return s.a.createElement("div",{className:"days row"},e)}},{key:"renderCells",value:function(){for(var e=this,t=this.state,a=t.currentMonth,n=t.selectedDate,r=Q.a(a),i=J.a(a),l=z.a(r),o=X.a(i),c=[],u=[],d=l,m="";d<=o;){for(var p=function(t){m=q.a(d,"d");var a=d,i=e.state.tasks.filter(function(e){return new Date(e.dueDate).getMonth()===new Date(d).getMonth()&&new Date(e.dueDate).getDate()===new Date(d).getDate()&&new Date(e.dueDate).getFullYear()===new Date(d).getFullYear()}).map(function(t){return s.a.createElement("li",{className:"calendar-task"},s.a.createElement(h.b,{to:"/".concat(e.props.auth.user.id,"/tasks/").concat(t._id)},t.title))});u.push(s.a.createElement("div",{className:"col cell ".concat(K.a(d,r)?V.a(d,n)?"selected":"":"disabled"),key:d,onClick:function(){e.onDateClick(a)}},s.a.createElement("span",{className:"number"},m),s.a.createElement("span",{className:"bg"},m),i)),d=G.a(d,1)},g=0;g<7;g++)p();c.push(s.a.createElement("div",{className:"row",key:d},u)),u=[]}return s.a.createElement("div",{className:"body"},c)}},{key:"render",value:function(){var e=this,t=this.state.tasks.filter(function(t){var a=e.state.selectedDate;return new Date(t.dueDate).getMonth()===new Date(a).getMonth()&&new Date(t.dueDate).getDate()===new Date(a).getDate()&&new Date(t.dueDate).getFullYear()===new Date(a).getFullYear()}).map(function(t){return s.a.createElement("li",null,s.a.createElement(h.b,{to:"/".concat(e.props.auth.user.id,"/tasks/").concat(t._id)},t.title))});return s.a.createElement("div",{className:"calendar"},this.renderHeader(),this.renderDays(),this.renderCells(),t.length?s.a.createElement("div",null,s.a.createElement("h2",null,"Tasks Due For"," ","".concat(this.state.selectedDate.getMonth()+1,"/").concat(this.state.selectedDate.getDate(),"/").concat(this.state.selectedDate.getFullYear())),t):s.a.createElement("div",null,s.a.createElement("h2",null,"No Tasks Due For"," ","".concat(this.state.selectedDate.getMonth()+1,"/").concat(this.state.selectedDate.getDate(),"/").concat(this.state.selectedDate.getFullYear()))))}}]),t}(n.Component),$=Object(f.b)(function(e){return{auth:e.auth}})(Z),ee=a(20),te=a(45),ae=a(85),ne={isAuthenticated:!1,user:{},loading:!1},se={},re=Object(ee.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CURRENT_USER":return Object(v.a)({},e,{isAuthenticated:!ae(t.payload),user:t.payload});case"USER_LOADING":return Object(v.a)({},e,{loading:!0});default:return e}},errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:se,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return t.payload;default:return e}}}),ie=[te.a],le=Object(ee.e)(re,{},Object(ee.d)(ee.a.apply(void 0,ie))),oe=a(46),ce=Object(f.b)(function(e){return{auth:e.auth}})(function(e){var t=e.component,a=e.auth,n=Object(oe.a)(e,["component","auth"]);return s.a.createElement(m.b,Object.assign({},n,{render:function(e){return!0===a.isAuthenticated?s.a.createElement(t,e):s.a.createElement(m.a,{to:"/login"})}}))});if(localStorage.jwtToken){var ue=localStorage.jwtToken;T(ue);var de=O()(ue);le.dispatch(S(de));var he=Date.now()/1e3;de.exp<he&&(le.dispatch(j()),window.location.href="/login")}var me=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement(f.a,{store:le},s.a.createElement(h.a,null,s.a.createElement("div",{className:"App"},s.a.createElement(C,null),s.a.createElement(m.d,null,s.a.createElement(m.b,{exact:!0,path:"/register",component:x}),s.a.createElement(m.b,{exact:!0,path:"/login",component:_}),s.a.createElement(ce,{exact:!0,path:"/",component:E}),s.a.createElement(ce,{exact:!0,path:"/tasksAssigned",component:Y}),s.a.createElement(ce,{exact:!0,path:"/calendar",component:$}),s.a.createElement(ce,{path:"/:userId/newTask",component:N}),s.a.createElement(ce,{path:"/:userId/tasks/:taskId",component:M}),s.a.createElement(ce,{path:"/:userId",component:w})))))}}]),t}(n.Component);i.a.render(s.a.createElement(me,null),document.getElementById("root"))}},[[48,1,2]]]);
//# sourceMappingURL=main.8a476610.chunk.js.map