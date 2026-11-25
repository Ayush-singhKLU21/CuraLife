document.addEventListener("DOMContentLoaded",()=>{
 const u=HRS.requireUser(["admin"]);if(!u)return;
 const users=HRS.read(HRS.keys.users),patients=HRS.read(HRS.keys.patients),appointments=HRS.read(HRS.keys.appointments),records=HRS.read(HRS.keys.records);
 [["userCount",users.length],["patientCount",patients.length],["appointmentCount",appointments.length],["recordCount",records.length]].forEach(([id,n])=>{const el=document.getElementById(id);if(el)el.textContent=n});
 const list=document.getElementById("usersList");if(list){if(!users.length){list.innerHTML='<div class="empty-state">No user accounts registered yet.</div>';return}list.innerHTML=`<table><thead><tr><th>NAME</th><th>EMAIL</th><th>PHONE</th><th>ROLE</th></tr></thead><tbody>${users.map(x=>`<tr><td><b>${HRS.esc(x.name)}</b></td><td>${HRS.esc(x.email)}</td><td>${HRS.esc(x.phone)}</td><td><span class="status-tag">User</span></td></tr>`).join("")}</tbody></table>`}
});