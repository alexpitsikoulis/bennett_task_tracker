(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{34:function(e,t,a){e.exports=a(62)},39:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(31),i=a.n(s),l=(a(39),a(3)),c=a(14),o=a(4),u=a(5),m=a(7),h=a(6),d=a(8),p=a(1),E=a.n(p),k=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={users:[],errors:[]},a.getUsers=function(){E.a.get("/api/users").then(function(e){a.setState({users:e.data})}).catch(function(e){a.setState({errors:e.data})})},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.getUsers()}},{key:"render",value:function(){var e=this.state.users.sort(function(e,t){return e.name>t.name?1:e.name<t.name?-1:0}).map(function(e){return r.a.createElement("div",{name:e.name},r.a.createElement("h2",null,r.a.createElement(l.b,{to:"/".concat(e._id)},e.name)))});return r.a.createElement("div",null,r.a.createElement("h1",null,"All Users"),r.a.createElement(l.b,{to:"/newuser"},r.a.createElement("button",null,"Create New User")),e)}}]),t}(n.Component),b=(a(61),a(13)),g=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(a=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).priorityFilterAndMap=function(e){return a.props.tasks.filter(function(t){return t.priority===e}).map(function(e){var t="";switch(e.priority){case"Low":t="rgba(0, 255, 0, 0.8)";break;case"Medium":t="rgba(255, 255, 0, 0.8)";break;case"High":t="rgba(255, 0, 0, 0.8)";break;default:t="white"}return r.a.createElement(l.b,{to:"/".concat(e.userId,"/tasks/").concat(e._id),style:{color:"black",textDecoration:"none"}},r.a.createElement("div",{className:"task",style:{backgroundColor:t}},r.a.createElement("h3",null,e.title),r.a.createElement("h4",null,"Priority: ",e.priority),r.a.createElement("h4",null,"Est. Hours To Complete: ",e.estimatedHours)))})},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Tasks"),r.a.createElement(l.b,{to:"/".concat(this.props.userId,"/newtask")},r.a.createElement("button",null,"Create New Task")),r.a.createElement("div",{className:"task-list"},this.priorityFilterAndMap("High"),this.priorityFilterAndMap("Medium"),this.priorityFilterAndMap("Low")))}}]),t}(n.Component),f=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={user:{},tasks:[],errors:[],editUser:!1,redirectToHome:!1},a.getUser=function(){E.a.get("/api/users/".concat(a.props.match.params.userId)).then(function(e){E.a.get("/api/users/".concat(a.props.match.params.userId,"/tasks")).then(function(t){a.setState({user:e.data,tasks:t.data})})}).catch(function(e){a.setState({err:e.data})})},a.handleToggleEdit=function(){a.setState(function(e){return{editUser:!e.editUser}})},a.handleChange=function(e){var t=Object(b.a)({},a.state.user);t[e.target.name]=e.target.value,a.setState({user:t})},a.handleSubmit=function(e){e.preventDefault(),E.a.put("/api/users/".concat(a.state.user._id),a.state.user),a.setState({editUser:!1})},a.handleDeleteUser=function(){window.confirm("Are you sure you want to delete this user?")&&E.a.delete("/api/users/".concat(a.props.match.params.userId)).then(function(){a.setState({redirectToHome:!0})})},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.getUser()}},{key:"render",value:function(){return this.state.redirectToHome?r.a.createElement(c.a,{to:"/"}):r.a.createElement("div",null,r.a.createElement(l.b,{to:"/"},r.a.createElement("button",null,"Back to Users")),r.a.createElement("h1",null,this.state.user.name),r.a.createElement("h3",null,"Total Tasks: ",this.state.tasks.length),r.a.createElement("button",{onClick:this.handleToggleEdit},this.state.editUser?"Back to User":"Edit User"),this.state.editUser?r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"name"},"Name: "),r.a.createElement("input",{type:"text",name:"name",required:!0,value:this.state.user.name,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"email"},"Email: "),r.a.createElement("input",{type:"email",name:"email",required:!0,value:this.state.user.email,onChange:this.handleChange})),r.a.createElement("input",{type:"submit",value:"Submit"}))):r.a.createElement(g,{tasks:this.state.tasks,userId:this.state.user._id}),r.a.createElement("button",{onClick:this.handleDeleteUser,style:{marginTop:"5vh"}},"Delete User"))}}]),t}(n.Component),v=function(e){function t(){return Object(o.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("header",null,r.a.createElement(l.b,{to:"/",style:{textDecoration:"none"}},r.a.createElement("h1",null,"Bennett Task Tracker")))}}]),t}(n.Component),y=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={task:{},errors:[],editTask:!1,user:{},redirectToUser:!1},a.getTask=function(){E.a.get("/api/users/".concat(a.props.match.params.userId,"/tasks/").concat(a.props.match.params.taskId)).then(function(e){a.setState({task:e.data}),E.a.get("/api/users/".concat(a.state.task.userId)).then(function(e){a.setState({user:e.data})})}).catch(function(e){a.setState({errors:e.data})})},a.handleToggleEdit=function(){a.setState(function(e){return{editTask:!e.editTask}})},a.handleChange=function(e){var t=Object(b.a)({},a.state.task);t[e.target.name]=e.target.value,a.setState({task:t})},a.handleSubmit=function(e){e.preventDefault();var t=a.state.user.name,n=a.state.user.email,r="Your task ".concat(a.state.task.title," has been updated\n\nDescription: ").concat(a.state.task.description,"\n\nThis is a ").concat(a.state.task.priority," priority task");E.a.post("/send/updatedTask",{name:t,email:n,message:r}).then(function(e){"success"!==e.data.msg&&alert("Email failed to send")}).then(function(){E.a.put("/api/users/".concat(a.state.task.userId,"/tasks/").concat(a.state.task._id),a.state.task),a.setState({editTask:!1})})},a.handleDelete=function(){window.confirm("Are you sure you want to remove this task?")&&E.a.delete("/api/users/".concat(a.state.task.userId,"/tasks/").concat(a.state.task._id)).then(function(){a.setState({redirectToUser:!0})})},a.getTaskDateTime=function(){var e=new Date(a.state.task.dateTimeStarted);return e.getHours()>12?"".concat(e.getMonth()+1,"/").concat(e.getDate(),"/").concat(e.getFullYear()," at ").concat(e.getHours()-12,":").concat(e.getMinutes()," PM"):"".concat(e.getMonth()+1,"/").concat(e.getDate(),"/").concat(e.getFullYear()," at ").concat(e.getHours(),":").concat(e.getMinutes()," AM")},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.getTask()}},{key:"render",value:function(){return this.state.redirectToUser?r.a.createElement(c.a,{to:"/".concat(this.state.task.userId)}):r.a.createElement("div",null,r.a.createElement("button",{onClick:this.handleToggleEdit},this.state.editTask?"Back to Task":"Edit Task"),this.state.editTask?r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"title"},"Title: "),r.a.createElement("input",{type:"text",name:"title",required:!0,value:this.state.task.title,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"priority"},"Priority: "),r.a.createElement("select",{name:"priority",id:"priority",value:this.state.task.priority,onChange:this.handleChange},r.a.createElement("option",{value:"Low"},"Low"),r.a.createElement("option",{value:"Medium"},"Medium"),r.a.createElement("option",{value:"High"},"High"))),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"estimatedHours"},"Estimated Hours To Complete:"," "),r.a.createElement("input",{type:"number",name:"estimatedHours",id:"estimatedHours",value:this.state.task.estimatedHours,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"description"},"Description: "),r.a.createElement("textarea",{name:"description",id:"description",cols:"30",rows:"10",value:this.state.task.description,onChange:this.handleChange})),r.a.createElement("input",{type:"submit",value:"Submit"})):r.a.createElement("div",null,r.a.createElement("h1",null,this.state.task.title),r.a.createElement("h3",null,"User:"," ",r.a.createElement(l.b,{to:"/".concat(this.state.task.userId)},this.state.user.name)),r.a.createElement("h3",null,"Priority: ",this.state.task.priority),r.a.createElement("h3",null,"Estimated Hours To Complete: ",this.state.task.estimatedHours),r.a.createElement("h4",null,"Date and Time Started: ",this.getTaskDateTime()),r.a.createElement("p",null,this.state.task.description),r.a.createElement("button",{onClick:this.handleDelete},"Completed")))}}]),t}(n.Component),T=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={newUser:{name:"",email:""},redirectToUsers:!1},a.handleChange=function(e){var t=Object(b.a)({},a.state.newUser);t[e.target.name]=e.target.value,a.setState({newUser:t})},a.handleSubmit=function(e){e.preventDefault();var t=a.state.newUser.name,n=a.state.newUser.email,r="Hi ".concat(t,"! You have been added to the Bennett Task Tracker app. Click the link below to check it out!\nhttp://bennett-task-tracker.herokuapp.com/");E.a.post("/send/welcome",{name:t,email:n,message:r}).then(function(e){"success"!==e.data.msg&&alert("Email failed to send")}).then(function(){E.a.post("/api/users",a.state.newUser).then(function(){a.setState({redirectToUsers:!0})})})},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return this.state.redirectToUsers?r.a.createElement(c.a,{to:"/"}):r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"name"},"Name: "),r.a.createElement("input",{type:"text",name:"name",required:!0,value:this.state.newUser.name,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"email"},"Email: "),r.a.createElement("input",{type:"email",name:"email",required:!0,value:this.state.newUser.email,onChange:this.handleChange})),r.a.createElement("input",{type:"submit",value:"Submit"})))}}]),t}(n.Component),w=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={newTask:{title:"",priority:"Low",estimatedHours:0,description:""},user:{},redirectToUser:!1},a.getUser=function(){E.a.get("/api/users/".concat(a.props.match.params.userId)).then(function(e){a.setState({user:e.data})})},a.handleChange=function(e){var t=Object(b.a)({},a.state.newTask);t[e.target.name]=e.target.value,a.setState({newTask:t})},a.handleSubmit=function(e){e.preventDefault();var t={title:a.state.newTask.title,priority:a.state.newTask.priority,estimatedHours:a.state.newTask.estimatedHours,description:a.state.newTask.description,userId:a.props.match.params.userId},n=a.state.user.name,r=a.state.user.email,s="You have been assigned the task ".concat(t.title,"\n\nDescription: ").concat(t.description,"\n\nThis is a ").concat(t.priority," priority task!");E.a.post("/send/newTask",{name:n,email:r,message:s}).then(function(e){"success"!==e.data.msg&&alert("Email failed to send")}).then(function(){E.a.post("/api/users/".concat(a.props.match.params.userId,"/tasks"),t).then(function(){a.setState({redirectToUser:!0})})})},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.getUser()}},{key:"render",value:function(){return this.state.redirectToUser?r.a.createElement(c.a,{to:"/".concat(this.props.match.params.userId)}):r.a.createElement("div",null,r.a.createElement(l.b,{to:"/".concat(this.props.match.params.userId)},r.a.createElement("button",null,"Back to User")),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"title"},"Title: "),r.a.createElement("input",{type:"text",name:"title",required:!0,value:this.state.newTask.title,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"priority"},"Priority: "),r.a.createElement("select",{name:"priority",value:this.state.newTask.priority,onChange:this.handleChange},r.a.createElement("option",{value:"Low"},"Low"),r.a.createElement("option",{value:"Medium"},"Medium"),r.a.createElement("option",{value:"High"},"High"))),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"estimatedHours"},"Estimated Hours to Complete:"," "),r.a.createElement("input",{type:"number",name:"estimatedHours",value:this.state.newTask.estimatedHours,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"description"},"Description: "),r.a.createElement("textarea",{name:"description",cols:"30",rows:"10",value:this.state.newTask.description,onChange:this.handleChange})),r.a.createElement("input",{type:"submit",value:"Submit"})))}}]),t}(n.Component);var C=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(l.a,null,r.a.createElement(v,null),r.a.createElement(c.d,null,r.a.createElement(c.b,{exact:!0,path:"/",component:k}),r.a.createElement(c.b,{path:"/newUser",component:T}),r.a.createElement(c.b,{path:"/:userId/newTask",component:w}),r.a.createElement(c.b,{path:"/:userId/tasks/:taskId",component:y}),r.a.createElement(c.b,{path:"/:userId",component:f}))))};i.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.ed699cd9.chunk.js.map