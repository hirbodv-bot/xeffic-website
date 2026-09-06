(function(){
  const pageKey = document.body && document.body.dataset.cmsPage;
  if(!pageKey) return;
  const norm = s => (s || '').replace(/\s+/g,' ').trim();
  const setText = (el, value) => {
    if(!el || value === undefined || value === null || value === '') return;
    if(norm(el.textContent) !== norm(value)) el.textContent = value;
  };
  const safePath = p => p || '';
  const createImage = (src, alt, cls) => {
    const img=document.createElement('img'); img.src=safePath(src); img.alt=alt||''; img.className=cls||''; img.loading='lazy'; return img;
  };
  async function getJSON(url){
    const r=await fetch(url,{cache:'no-store'}); if(!r.ok) throw new Error(url+' '+r.status); return r.json();
  }
  function applySite(site){
    if(site.email){
      document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{
        const old=a.getAttribute('href')||'';
        if(old.includes('xeffic.com')){a.href='mailto:'+site.email; if(norm(a.textContent).includes('@xeffic.com')) a.textContent=site.email;}
      });
    }
    if(site.linkedin_url){document.querySelectorAll('a').forEach(a=>{if(norm(a.textContent)==='LinkedIn') a.href=site.linkedin_url;});}
    if(site.footer_text){const p=document.querySelector('.site-footer .footer-grid > div:first-child p');setText(p,site.footer_text);}
    if(site.logo_light){document.querySelectorAll('.site-header .brand-logo img').forEach(img=>img.src=site.logo_light);}
    if(site.logo_dark){document.querySelectorAll('.site-footer .brand-logo img').forEach(img=>img.src=site.logo_dark);}
    if(site.favicon){const f=document.querySelector('link[rel="icon"]'); if(f) f.href=site.favicon;}
  }
  function applyCard(article, card){
    if(!article||!card)return;
    const kicker=article.querySelector('.kicker,.tag,.eyebrow'); setText(kicker,card.kicker);
    const heading=article.querySelector('h2,h3,h4'); setText(heading,card.title);
    const p=article.querySelector('p'); setText(p,card.text);
    const a=article.querySelector('a[href]');
    if(a){setText(a,card.link_label); if(card.link_url) a.href=card.link_url;}
    if(Array.isArray(card.bullets) && card.bullets.length){
      const ul=article.querySelector('ul');
      if(ul){
        const lis=[...ul.querySelectorAll(':scope > li')];
        card.bullets.forEach((t,i)=>{if(lis[i]) setText(lis[i],t); else {const li=document.createElement('li');li.textContent=t;ul.appendChild(li);}});
        lis.slice(card.bullets.length).forEach(li=>li.remove());
      }
    }
    if(card.image){
      let img=article.querySelector(':scope > img.cms-card-image');
      if(!img){img=createImage(card.image,card.image_alt,'cms-card-image');article.insertBefore(img,article.firstChild);}
      else {img.src=card.image;img.alt=card.image_alt||'';}
    }
  }
  function applyItem(el,item){
    if(!el||!item)return;
    const strong=el.querySelector('strong,b'); setText(strong,item.title);
    const span=el.querySelector('span');
    if(span) setText(span,item.text);
    else if(item.text && norm(el.textContent)!==norm((item.title||'')+' '+item.text)){
      if(strong){let txt=document.createTextNode(' '+item.text); el.appendChild(txt);} else el.textContent=item.text;
    }
    if(item.image){
      let img=el.querySelector(':scope > img.cms-item-image');
      if(!img){img=createImage(item.image,item.image_alt,'cms-item-image');el.appendChild(img);} else {img.src=item.image;img.alt=item.image_alt||'';}
    }
  }
  function applySection(sec,data){
    if(!sec||!data)return;
    const sh=sec.querySelector('.section-head');
    let eyebrow,heading,intro;
    if(sh){eyebrow=sh.querySelector('.eyebrow,.kicker');heading=sh.querySelector('h1,h2');intro=sh.querySelector('p');}
    else {
      const box=sec.querySelector(':scope > .container')||sec;
      eyebrow=box.querySelector(':scope > .eyebrow,:scope > .kicker');
      heading=box.querySelector(':scope > h1,:scope > h2');
      if(!heading){const h=box.querySelector('h1,h2');if(h && !h.closest('article'))heading=h;}
      intro=[...box.querySelectorAll('p')].find(p=>!p.closest('article')&&!p.closest('form'))||null;
    }
    setText(eyebrow,data.eyebrow); setText(heading,data.title); setText(intro,data.text);

    if(data.image){
      const existing=sec.querySelector('[data-cms-primary-image="true"]');
      if(existing){existing.src=data.image; existing.alt=data.image_alt||existing.alt||'';}
      else {
        let wrap=sec.querySelector(':scope .cms-section-image-wrap');
        if(!wrap){
          wrap=document.createElement('div'); wrap.className='container cms-section-image-wrap';
          wrap.appendChild(createImage(data.image,data.image_alt,'cms-section-image'));
          if(sec.classList.contains('page-hero')||sec.classList.contains('hero')) sec.appendChild(wrap); else sec.insertBefore(wrap,sec.firstChild.nextSibling);
        } else {const img=wrap.querySelector('img');img.src=data.image;img.alt=data.image_alt||'';}
      }
    }
    if(Array.isArray(data.gallery) && data.gallery.length){
      let gallery=sec.querySelector('.cms-section-gallery');
      if(!gallery){gallery=document.createElement('div');gallery.className='container cms-section-gallery';sec.appendChild(gallery);}
      gallery.innerHTML=''; data.gallery.forEach(src=>gallery.appendChild(createImage(src,'','cms-gallery-image')));
    }
    if(Array.isArray(data.cards)) data.cards.forEach(card=>applyCard(sec.querySelector('[data-cms-card="'+CSS.escape(card.id)+'"]'),card));
    if(Array.isArray(data.items)) data.items.forEach(item=>applyItem(sec.querySelector('[data-cms-item="'+CSS.escape(item.id)+'"]'),item));
  }
  Promise.allSettled([getJSON('/content/site.json'),getJSON('/content/'+pageKey+'.json')]).then(results=>{
    const site=results[0].status==='fulfilled'?results[0].value:null;
    const page=results[1].status==='fulfilled'?results[1].value:null;
    if(site) applySite(site);
    if(page){
      if(page.seo){if(page.seo.title)document.title=page.seo.title;const d=document.querySelector('meta[name="description"]');if(d&&page.seo.description)d.content=page.seo.description;}
      (page.sections||[]).forEach(data=>applySection(document.querySelector('[data-cms-section="'+CSS.escape(data.id)+'"]'),data));
    }
  });
})();
