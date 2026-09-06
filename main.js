
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('.menu'),nav=document.querySelector('.nav-links');
  if(btn&&nav)btn.addEventListener('click',()=>nav.classList.toggle('open'));
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
  const form=document.getElementById('contactForm');
  if(form)form.addEventListener('submit',e=>{
    e.preventDefault();
    const get=id=>document.getElementById(id).value.trim();
    const subject=encodeURIComponent('Xeffic enquiry: '+get('topic'));
    const body=encodeURIComponent(`Name: ${get('name')}\nOrganisation: ${get('org')}\nEmail: ${get('email')}\nTopic: ${get('topic')}\n\n${get('message')}`);
    location.href=`mailto:info@xeffic.com?subject=${subject}&body=${body}`;
  });
});
