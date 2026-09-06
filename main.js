document.addEventListener('DOMContentLoaded', async () => {
  const menu=document.querySelector('.menu'), nav=document.querySelector('.nav-links');
  if(menu&&nav) menu.addEventListener('click',()=>nav.classList.toggle('open'));
  const year=document.getElementById('year'); if(year) year.textContent=new Date().getFullYear();

  const pageName=document.body.dataset.page || 'home';
  const get=(obj,path)=>path.split('.').reduce((o,k)=>o && o[k]!==undefined ? o[k] : undefined,obj);
  const load=async path=>{try{const r=await fetch(path,{cache:'no-store'});return r.ok?await r.json():{};}catch(e){console.warn('CMS content load failed',path,e);return {};}};
  const [site,page]=await Promise.all([load('/content/site.json'),load(`/content/${pageName}.json`)]);

  // SEO
  if(page.seo_title) document.title=page.seo_title;
  const md=document.querySelector('meta[name="description"]'); if(md&&page.seo_description) md.setAttribute('content',page.seo_description);

  // site-wide text/images/emails/links
  document.querySelectorAll('[data-site-text]').forEach(el=>{const v=get(site,el.dataset.siteText);if(v!==undefined&&v!==null)el.textContent=v;});
  document.querySelectorAll('[data-site-image]').forEach(el=>{const v=get(site,el.dataset.siteImage);if(v)el.src=v;});
  document.querySelectorAll('[data-site-email]').forEach(el=>{const v=get(site,el.dataset.siteEmail);if(v){el.textContent=v;el.href='mailto:'+v;}});
  document.querySelectorAll('[data-site-link]').forEach(el=>{const v=get(site,el.dataset.siteLink);if(v)el.href=v;});

  // page text/links/images
  document.querySelectorAll('[data-page-text]').forEach(el=>{const v=get(page,el.dataset.pageText);if(v!==undefined&&v!==null)el.textContent=v;});
  document.querySelectorAll('[data-page-link]').forEach(el=>{const v=get(page,el.dataset.pageLink);if(v)el.href=v;});
  document.querySelectorAll('[data-page-image]').forEach(el=>{const v=get(page,el.dataset.pageImage);if(v)el.src=v;const alt=get(page,el.dataset.pageAlt||'');if(alt)el.alt=alt;});
  document.querySelectorAll('[data-page-optional-image]').forEach(el=>{const v=get(page,el.dataset.pageOptionalImage);if(v){el.src=v;el.hidden=false;const alt=get(page,el.dataset.pageAlt||'');if(alt)el.alt=alt;const card=el.closest('.cms-image-card');if(card){const d=card.querySelector('.cms-default-visual');if(d)d.hidden=true;}}});
  document.querySelectorAll('[data-page-bg]').forEach(el=>{const v=get(page,el.dataset.pageBg);if(v){el.style.backgroundImage=`linear-gradient(rgba(7,29,66,.76),rgba(13,61,126,.76)),url(${v})`;el.style.backgroundSize='cover';el.style.backgroundPosition='center';}});

  const imgHtml=(src,alt='')=>src?`<img class="card-image" src="${src}" alt="${String(alt).replace(/"/g,'&quot;')}">`:'';
  const gallery=(items)=>{const el=document.getElementById('pageGallery');if(!el||!Array.isArray(items)||!items.length)return;el.hidden=false;el.innerHTML=items.map((src,i)=>`<img src="${src}" alt="Gallery image ${i+1}">`).join('');};

  if(pageName==='home'){
    const ag=document.getElementById('audienceGrid');if(ag&&Array.isArray(page.audiences?.items))ag.innerHTML=page.audiences.items.map((it,i)=>`<article class="audience-card">${it.image?`<img class="audience-image" src="${it.image}" alt="${it.title||''}">`:''}<span class="audience-no">${String(i+1).padStart(2,'0')}</span><h3>${it.title||''}</h3><p>${it.description||''}</p></article>`).join('');
    const steps=document.getElementById('approachSteps');if(steps&&Array.isArray(page.approach?.steps))steps.innerHTML=page.approach.steps.map((s,i)=>`<div class="approach-step"><span>${String(i+1).padStart(2,'0')}</span><div><strong>${s.title||''}</strong><p>${s.description||''}</p></div></div>`).join('');
    const tags=document.getElementById('sustainTags');if(tags&&Array.isArray(page.sustain?.tags))tags.innerHTML=page.sustain.tags.map(t=>`<span>${t}</span>`).join('');
  }
  if(pageName==='manufacturing-ai'){
    const el=document.getElementById('featureCards');if(el&&Array.isArray(page.features))el.innerHTML=page.features.map((it,i)=>`<article class="card cms-content-card">${imgHtml(it.image,it.title)}<span class="tag">${String(i+1).padStart(2,'0')}</span><h3>${it.title||''}</h3><p>${it.description||''}</p></article>`).join('');gallery(page.gallery);
  }
  if(pageName==='services'){
    const eb=document.getElementById('energyBullets');if(eb&&Array.isArray(page.energy?.bullets))eb.innerHTML=page.energy.bullets.map(x=>`<li>${x}</li>`).join('');
    const sb=document.getElementById('simulationBullets');if(sb&&Array.isArray(page.simulation?.bullets))sb.innerHTML=page.simulation.bullets.map(x=>`<li>${x}</li>`).join('');gallery(page.gallery);
  }
  if(pageName==='flood-ai'){
    const el=document.getElementById('floodSteps');if(el&&Array.isArray(page.steps))el.innerHTML=page.steps.map((s,i)=>`<div class="step">${s.image?`<img class="step-image" src="${s.image}" alt="${s.title||''}">`:''}<b>${String(i+1).padStart(2,'0')}</b><div><strong>${s.title||''}</strong><br><span>${s.description||''}</span></div></div>`).join('');gallery(page.gallery);
  }
  if(pageName==='about'){
    const el=document.getElementById('principleCards');if(el&&Array.isArray(page.principles))el.innerHTML=page.principles.map(it=>`<article class="card cms-content-card">${imgHtml(it.image,it.title)}<h3>${it.title||''}</h3><p>${it.description||''}</p></article>`).join('');gallery(page.gallery);
  }

  const form=document.getElementById('contactForm');
  if(form) form.addEventListener('submit',e=>{e.preventDefault();const val=id=>document.getElementById(id).value.trim();const subject=encodeURIComponent('Xeffic enquiry: '+val('topic'));const body=encodeURIComponent(`Name: ${val('name')}\nOrganisation: ${val('org')}\nEmail: ${val('email')}\nTopic: ${val('topic')}\n\n${val('message')}`);location.href=`mailto:${site.info_email||'info@xeffic.com'}?subject=${subject}&body=${body}`;});
});