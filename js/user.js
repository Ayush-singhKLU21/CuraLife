document.addEventListener("DOMContentLoaded",()=>{
 const u=HRS.requireUser(["user"]);if(!u)return;
 const welcome=document.getElementById("welcomeTitle");if(welcome)welcome.textContent="Welcome back, "+u.name.split(" ")[0];
 const a=HRS.read(HRS.keys.appointments).filter(x=>x.email===u.email),r=HRS.read(HRS.keys.records).filter(x=>x.email===u.email);
 const ac=document.getElementById("appointmentCount"),rc=document.getElementById("recordCount");if(ac)ac.textContent=a.length;if(rc)rc.textContent=r.length;
 const form=document.getElementById("profileForm");
 if(form){["name","email","phone","age","gender","address"].forEach(k=>{const el=document.getElementById(k);if(el)el.value=u[k]||""});form.addEventListener("submit",e=>{e.preventDefault();const updated={...u};["name","phone","age","gender","address"].forEach(k=>updated[k]=document.getElementById(k).value.trim());HRS.write(HRS.keys.users,HRS.read(HRS.keys.users).map(x=>x.email===u.email?updated:x));localStorage.setItem(HRS.keys.current,JSON.stringify(updated));HRS.message("message","Your profile has been updated.")})}
});