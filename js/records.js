document.addEventListener("DOMContentLoaded",()=>{
 const u=HRS.requireUser(["user","admin"]);if(!u)return;const list=document.getElementById("recordsList");
 const rows=HRS.read(HRS.keys.records).filter(x=>u.role==="admin"||x.email===u.email).sort((a,b)=>b.date.localeCompare(a.date));
 if(!rows.length){list.innerHTML='<div class="empty-state">No medical records available yet.</div>';return}
 list.innerHTML=rows.map(x=>`<article class="record-card"><span class="record-date">${HRS.esc(x.date)}</span><h3>${HRS.esc(x.patientName)}</h3><p><b>Diagnosis:</b> ${HRS.esc(x.diagnosis)}</p><p><b>Doctor:</b> ${HRS.esc(x.doctor)}</p><p>${HRS.esc(x.notes||"No additional notes.")}</p></article>`).join("");
});