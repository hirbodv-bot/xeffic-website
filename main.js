
document.addEventListener('DOMContentLoaded',()=>{
  const b=document.querySelector('.menu'), n=document.querySelector('.nav-links');
  if(b&&n)b.addEventListener('click',()=>n.classList.toggle('open'));
  const y=document.getElementById('year'); if(y)y.textContent=new Date().getFullYear();
  const f=document.getElementById('contactForm');
  if(f)f.addEventListener('submit',e=>{
    e.preventDefault();
    const v=id=>document.getElementById(id).value.trim();
    const subject=encodeURIComponent('Xeffic enquiry: '+v('topic'));
    const body=encodeURIComponent(`Name: ${v('name')}\nOrganisation: ${v('org')}\nEmail: ${v('email')}\nTopic: ${v('topic')}\n\n${v('message')}`);
    location.href=`mailto:info@xeffic.com?subject=${subject}&body=${body}`;
  });
});
