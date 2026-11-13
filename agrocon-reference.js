(function(){
  'use strict';

  if(window.AGRO_REFERENCE_LOADER_V309)return;
  window.AGRO_REFERENCE_LOADER_V309=true;

  function installDiseasePatch(){
    if(window.AGRO_DISEASE_PATCH_V309)return;
    window.AGRO_DISEASE_PATCH_V309=true;

    function esc(value){
      return String(value ?? '')
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#39;');
    }

    function data(){
      return Array.isArray(window.AGRO_REFERENCE_DATA)
        ? window.AGRO_REFERENCE_DATA
        : [];
    }

    const diseaseHistory=[];

    function currentDisease(box){
      const title=box.querySelector('.arh-modalName')?.textContent?.trim();
      if(!title)return null;

      return data().find(item =>
        item &&
        item.category==='diseases' &&
        String(item.title || item.name || '').trim()===title
      ) || null;
    }

    function relatedDiseases(item){
      if(!item || !Array.isArray(item.similarDiseases))return [];

      return item.similarDiseases.map(rel=>{
        const id=typeof rel==='string' ? rel : rel?.id;
        if(!id)return null;

        const target=data().find(x =>
          x &&
          x.category==='diseases' &&
          String(x.id)===String(id)
        );

        if(!target)return null;

        return {
          id:String(target.id),
          title:String(target.title || target.name || target.id),
          difference:typeof rel==='object'
            ? String(rel.difference || rel.note || '').trim()
            : ''
        };
      }).filter(Boolean);
    }

    function resetScroll(){
      const portal=document.getElementById('arhDetailPortal');
      if(!portal)return;

      const box=portal.querySelector('.arh-modal');
      portal.scrollTop=0;
      if(box)box.scrollTop=0;

      requestAnimationFrame(()=>{
        portal.scrollTop=0;
        if(box)box.scrollTop=0;
      });
    }

    function activateMode(box,mode){
      box.querySelectorAll('[data-detail-mode]').forEach(button=>{
        const active=button.dataset.detailMode===mode;
        button.classList.toggle('active',active);
        button.setAttribute('aria-selected',String(active));
      });

      box.querySelectorAll('[data-detail-panel]').forEach(panel=>{
        panel.hidden=panel.dataset.detailPanel!==mode;
      });

      resetScroll();
    }

    function openDisease(id){
      try{
        localStorage.setItem('agro-reference-detail-mode','full');
      }catch(_){}

      const nextHash='item='+encodeURIComponent(id);

      if(window.location.hash.replace(/^#/,'')===nextHash){
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }else{
        window.location.hash=nextHash;
      }
    }

    function rememberCurrentDisease(){
      const portal=document.getElementById('arhDetailPortal');
      const box=portal ? portal.querySelector('.arh-modal') : null;
      const current=box ? currentDisease(box) : null;
      if(!current)return;

      const last=diseaseHistory[diseaseHistory.length-1];

      if(!last || String(last.id)!==String(current.id)){
        diseaseHistory.push({
          id:String(current.id),
          title:String(current.title || current.name || current.id)
        });
      }
    }

    function renderBack(box){
      const existing=box.querySelector('.arh-diseaseBackWrap');

      if(!diseaseHistory.length){
        if(existing)existing.remove();
        return;
      }

      const previous=diseaseHistory[diseaseHistory.length-1];

      if(existing && existing.dataset.backId===String(previous.id))return;
      if(existing)existing.remove();

      const wrap=document.createElement('div');
      wrap.className='arh-diseaseBackWrap';
      wrap.dataset.backId=String(previous.id);
      wrap.innerHTML=`
        <button class="arh-diseaseBack" type="button" data-agro-disease-back>
          <span class="arh-diseaseBackArrow" aria-hidden="true">←</span>
          <span>Назад: ${esc(previous.title)}</span>
        </button>
      `;

      const switcher=box.querySelector('.arh-viewSwitch');
      const title=box.querySelector('.arh-modalName');

      if(switcher){
        switcher.insertAdjacentElement('beforebegin',wrap);
      }else if(title){
        title.insertAdjacentElement('afterend',wrap);
      }else{
        box.prepend(wrap);
      }
    }

    function enhanceModal(){
      const portal=document.getElementById('arhDetailPortal');
      if(!portal)return false;

      const box=portal.querySelector('.arh-modal');
      if(!box)return false;

      const item=currentDisease(box);
      if(!item)return false;

      renderBack(box);

      const links=relatedDiseases(item);
      if(!links.length)return false;

      const selector=
        '[data-agro-similar-for="' +
        CSS.escape(String(item.id)) +
        '"]';

      if(box.querySelector(selector))return true;

      const switcher=box.querySelector('.arh-viewSwitch');
      if(!switcher)return false;

      if(box.querySelector('[data-detail-mode="similar"]'))return true;

      const panel=document.createElement('div');
      panel.className='arh-detailMode arh-similarTabPanel';
      panel.dataset.detailPanel='similar';
      panel.dataset.agroSimilarFor=String(item.id);
      panel.hidden=true;

      panel.innerHTML=`
        <section class="arh-similarInline">
          <div class="arh-similarEyebrow">Дифференциальная диагностика</div>
          <h3 class="arh-similarInlineTitle">С чем можно спутать эту болезнь</h3>
          <p class="arh-similarInlineIntro">
            Сравните характерные признаки. Нажмите на заболевание,
            чтобы открыть его описание.
          </p>
          ${links.map(rel=>`
            <button class="arh-similarInlineItem"
                    type="button"
                    data-agro-open-disease="${esc(rel.id)}">
              <span>
                <span class="arh-similarInlineName">${esc(rel.title)}</span>
                ${rel.difference ? `
                  <span class="arh-similarInlineDifference">
                    ${esc(rel.difference)}
                  </span>` : ''}
              </span>
              <span class="arh-similarInlineArrow" aria-hidden="true">→</span>
            </button>
          `).join('')}
        </section>
      `;

      const fullPanel=box.querySelector('[data-detail-panel="full"]');
      const briefPanel=box.querySelector('[data-detail-panel="brief"]');

      if(fullPanel){
        fullPanel.insertAdjacentElement('afterend',panel);
      }else if(briefPanel){
        briefPanel.insertAdjacentElement('afterend',panel);
      }else{
        box.appendChild(panel);
      }

      const tab=document.createElement('button');
      tab.type='button';
      tab.dataset.detailMode='similar';
      tab.setAttribute('role','tab');
      tab.setAttribute('aria-selected','false');
      tab.innerHTML=
        '<span class="arh-similarTabIcon">↔</span>' +
        '<span>С чем можно спутать</span>' +
        '<span class="arh-similarTabCount">' + links.length + '</span>';

      switcher.appendChild(tab);

      tab.addEventListener('click',()=>{
        activateMode(box,'similar');
      });

      panel.querySelectorAll('[data-agro-open-disease]').forEach(button=>{
        button.addEventListener('click',()=>{
          const id=String(button.dataset.agroOpenDisease || '');
          if(!id)return;

          rememberCurrentDisease();
          openDisease(id);
        });
      });

      return true;
    }

    function runSoon(){
      requestAnimationFrame(enhanceModal);
      setTimeout(enhanceModal,60);
      setTimeout(enhanceModal,250);
    }

    document.addEventListener('click',event=>{
      const back=event.target.closest(
        '#arhDetailPortal [data-agro-disease-back]'
      );

      if(back){
        event.preventDefault();
        event.stopPropagation();

        const previous=diseaseHistory.pop();
        if(previous)openDisease(previous.id);
        return;
      }

      const card=event.target.closest(
        '#agro-reference-home .arh-card'
      );

      if(card && !event.target.closest('[data-agro-open-disease]')){
        diseaseHistory.length=0;
      }
    },true);

    let observer=null;

    function observe(){
      if(observer)return;

      observer=new MutationObserver(runSoon);
      observer.observe(document.documentElement,{
        childList:true,
        subtree:true
      });

      runSoon();
    }

    observe();
    document.addEventListener('agro-reference:data-updated',runSoon);
    window.addEventListener('hashchange',runSoon);
  }

  installDiseasePatch();
})();
