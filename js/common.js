const HRS = {
  keys:{users:"hrs_users",current:"hrs_currentUser",patients:"hrs_patients",appointments:"hrs_appointments",records:"hrs_records"},
  read(key){try{return JSON.parse(localStorage.getItem(key)||"[]")}catch{return []}},
  write(key,value){localStorage.setItem(key,JSON.stringify(value))},
  current(){try{return JSON.parse(localStorage.getItem(this.keys.current)||"null")}catch{return null}},
  requireUser(roles){const u=this.current();if(!u){location.href="login.html";return null}if(roles&& !roles.includes(u.role)){location.href=u.role==="admin"?"admin.html":"user.html";return null}return u},
  logout(){localStorage.removeItem(this.keys.current);location.href="login.html"},
  esc(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))},
  id(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)},
  message(id,text,isError=false){const el=document.getElementById(id);if(el){el.textContent=text;el.classList.toggle("error-message",isError)}},
  initShell(){const u=this.current();if(!u)return;const name=document.getElementById("headerName"),role=document.getElementById("headerRole"),avatar=document.getElementById("userAvatar");if(name)name.textContent=u.name||"User";if(role)role.textContent=u.role==="admin"?"Administrator":"User account";if(avatar)avatar.textContent=(u.name||"U").trim().charAt(0).toUpperCase();const page=location.pathname.split("/").pop().replace(".html","");document.querySelectorAll(".side-nav a").forEach(a=>{if(a.dataset.page===page || (page==="admin"&&a.dataset.page==="admin"))a.classList.add("active")});const out=document.getElementById("logoutBtn");if(out)out.addEventListener("click",()=>this.logout())}
};
document.addEventListener("DOMContentLoaded",()=>HRS.initShell());