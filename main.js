
document.addEventListener('DOMContentLoaded',()=>{
 const m=document.querySelector('.menu'),n=document.querySelector('.nav-links');
 if(m&&n)m.addEventListener('click',()=>n.classList.toggle('open'));
 const y=document.querySelector('#year');if(y)y.textContent=new Date().getFullYear();
 const f=document.querySelector('#contactForm');
 if(f)f.addEventListener('submit',e=>{e.preventDefault();
  const g=id=>document.querySelector(id).value.trim();
  const sub=encodeURIComponent('Xeffic enquiry: '+g('#topic'));
  const body=encodeURIComponent(`Name: ${g('#name')}\nOrganisation: ${g('#org')}\nEmail: ${g('#email')}\nTopic: ${g('#topic')}\n\n${g('#message')}`);
  location.href=`mailto:info@xeffic.com?subject=${sub}&body=${body}`;
 });
});
