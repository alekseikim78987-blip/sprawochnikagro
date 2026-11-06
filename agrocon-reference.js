/* АГРОКОН · Справочник · external bundle v30.1
   Вынесено из Tilda T123, чтобы не упираться в лимит размера блока.
   Данные по-прежнему загружаются из reference-data.json.
*/
(function(){
  'use strict';

  const BUNDLE_VERSION='30.1';

  /* -------------------------
     СТИЛИ
     ------------------------- */
  if(!document.getElementById('agro-reference-external-v30-style')){
    const style=document.createElement('style');
    style.id='agro-reference-external-v30-style';
    style.textContent='/* AGROCON REFERENCE · PART 2 v30 · detailed diseases + clickable similar diseases */\n\n\n/* Компактные карточки в общем списке.\n   Полный description остаётся только внутри popup. */\n#agro-reference-home .arh-card{\n  min-height:158px;\n  padding:18px;\n}\n#agro-reference-home .arh-cardTitle{\n  margin-top:18px;\n}\n#agro-reference-home .arh-cardDesc{\n  margin-top:7px;\n  line-height:1.45;\n  display:-webkit-box;\n  -webkit-box-orient:vertical;\n  -webkit-line-clamp:3;\n  overflow:hidden;\n}\n#agro-reference-home .arh-cardMeta{\n  padding-top:12px;\n}\n\n\n\n/* Похожие болезни в popup: компактные строки, а не тяжёлая сетка карточек. */\n#arhDetailPortal .arh-similarDiseases{\n  margin-top:28px;\n  padding-top:20px;\n  border-top:1px solid #e7eae5;\n}\n#arhDetailPortal .arh-similarDiseasesTitle{\n  margin:0 0 5px;\n  color:#1d211d;\n  font-size:15px;\n  line-height:1.3;\n  font-weight:850;\n}\n#arhDetailPortal .arh-similarDiseasesIntro{\n  margin:0 0 10px;\n  color:#8a908a;\n  font-size:11px;\n  line-height:1.5;\n}\n#arhDetailPortal .arh-similarDisease{\n  width:100%;\n  padding:12px 2px;\n  border:0;\n  border-top:1px solid #edf0eb;\n  background:transparent;\n  color:inherit;\n  display:grid;\n  grid-template-columns:minmax(0,1fr) auto;\n  gap:14px;\n  align-items:center;\n  text-align:left;\n  cursor:pointer;\n}\n#arhDetailPortal .arh-similarDisease:first-of-type{\n  border-top:0;\n}\n#arhDetailPortal .arh-similarDiseaseName{\n  display:block;\n  color:#272c27;\n  font-size:12.5px;\n  line-height:1.35;\n  font-weight:800;\n}\n#arhDetailPortal .arh-similarDiseaseDifference{\n  display:block;\n  margin-top:4px;\n  color:#777e77;\n  font-size:10.5px;\n  line-height:1.48;\n  font-weight:500;\n}\n#arhDetailPortal .arh-similarDiseaseArrow{\n  color:#c46a16;\n  font-size:18px;\n  line-height:1;\n  transition:transform .16s ease;\n}\n#arhDetailPortal .arh-similarDisease:hover .arh-similarDiseaseName{\n  color:#b95d08;\n}\n#arhDetailPortal .arh-similarDisease:hover .arh-similarDiseaseArrow{\n  transform:translateX(3px);\n}\n#arhDetailPortal .arh-similarDisease:focus-visible{\n  outline:2px solid rgba(239,125,0,.28);\n  outline-offset:4px;\n  border-radius:8px;\n}\n@media(max-width:640px){\n  #arhDetailPortal .arh-similarDisease{\n    padding:13px 0;\n    gap:10px;\n  }\n}\n\n/* =========================================================\n   БОЛЕЗНИ · ФИЛЬТР ПО КУЛЬТУРЕ\n   Не список кнопок, а строка поиска с автоподсказками.\n   ========================================================= */\n#agro-reference-home .arh-cultureFilter{\n  position:relative;\n  max-width:520px;\n  margin:0 0 16px;\n}\n#agro-reference-home .arh-cultureFilterLabel{\n  margin:0 0 8px;\n  color:#707770;\n  font-size:10px;\n  line-height:1.2;\n  font-weight:850;\n  letter-spacing:.08em;\n  text-transform:uppercase;\n}\n#agro-reference-home .arh-cultureInputWrap{\n  position:relative;\n}\n#agro-reference-home .arh-cultureSearchIcon{\n  position:absolute;\n  left:14px;\n  top:50%;\n  width:17px;\n  height:17px;\n  transform:translateY(-50%);\n  color:#979d97;\n  pointer-events:none;\n}\n#agro-reference-home .arh-cultureSearchIcon svg{\n  width:100%;\n  height:100%;\n  fill:none;\n  stroke:currentColor;\n  stroke-width:1.8;\n  stroke-linecap:round;\n}\n#agro-reference-home .arh-cultureInput{\n  width:100%;\n  height:46px;\n  padding:0 44px 0 42px;\n  border:1px solid #dfe3dd;\n  border-radius:14px;\n  outline:none;\n  background:#fff;\n  color:#202420;\n  font:600 13px/1 Inter,Arial,Helvetica,sans-serif;\n  transition:border-color .16s ease,box-shadow .16s ease;\n}\n#agro-reference-home .arh-cultureInput::placeholder{\n  color:#a0a6a0;\n  font-weight:500;\n}\n#agro-reference-home .arh-cultureInput:focus{\n  border-color:#ff9a38;\n  box-shadow:0 0 0 3px rgba(255,128,0,.10);\n}\n#agro-reference-home .arh-cultureClear{\n  position:absolute;\n  right:8px;\n  top:50%;\n  width:30px;\n  height:30px;\n  transform:translateY(-50%);\n  border:0;\n  border-radius:9px;\n  background:transparent;\n  color:#929892;\n  font:700 18px/1 Arial,sans-serif;\n  cursor:pointer;\n}\n#agro-reference-home .arh-cultureClear:hover{\n  background:#f4f6f2;\n  color:#555c55;\n}\n#agro-reference-home .arh-cultureSuggestions{\n  position:absolute;\n  z-index:80;\n  left:0;\n  right:0;\n  top:calc(100% + 7px);\n  padding:6px;\n  border:1px solid #e2e6df;\n  border-radius:14px;\n  background:#fff;\n  box-shadow:0 16px 38px rgba(24,28,24,.12);\n}\n#agro-reference-home .arh-cultureSuggestion{\n  width:100%;\n  min-height:38px;\n  padding:8px 10px;\n  border:0;\n  border-radius:9px;\n  background:transparent;\n  color:#343a34;\n  font:650 12px/1.3 Inter,Arial,Helvetica,sans-serif;\n  text-align:left;\n  cursor:pointer;\n}\n#agro-reference-home .arh-cultureSuggestion:hover,\n#agro-reference-home .arh-cultureSuggestion:focus-visible{\n  outline:none;\n  background:#f6f8f4;\n}\n#agro-reference-home .arh-cultureHint{\n  margin-top:7px;\n  color:#9aa09a;\n  font-size:10.5px;\n  line-height:1.4;\n}\n#agro-reference-home .arh-cultureNoSuggestions{\n  padding:9px 10px;\n  color:#979d97;\n  font-size:11px;\n  line-height:1.4;\n}\n@media(max-width:640px){\n  #agro-reference-home .arh-cultureFilter{\n    max-width:none;\n  }\n  #agro-reference-home .arh-cultureInput{\n    height:44px;\n    font-size:12px;\n  }\n}\n\n/* Риск отбора резистентности: пять уровней от зелёного к красному. */\n#agro-reference-home .arh-cardBadges{\n  display:flex;\n  flex-wrap:wrap;\n  align-items:center;\n  gap:6px;\n  min-width:0;\n}\n#agro-reference-home .arh-riskBadge,\n#arhDetailPortal .arh-riskBadge{\n  position:relative;\n  display:inline-flex;\n  align-items:center;\n  gap:5px;\n  min-height:24px;\n  padding:0 8px;\n  border:1px solid transparent;\n  border-radius:999px;\n  font-size:8.5px;\n  line-height:1;\n  font-weight:900;\n  letter-spacing:.045em;\n  text-transform:uppercase;\n  white-space:nowrap;\n  cursor:help;\n  outline:none;\n}\n#agro-reference-home .arh-riskBadge[data-risk="low"],\n#arhDetailPortal .arh-riskBadge[data-risk="low"]{\n  background:#eaf7ef;\n  border-color:#ccebd8;\n  color:#1f7a45;\n}\n#agro-reference-home .arh-riskBadge[data-risk="low-medium"],\n#arhDetailPortal .arh-riskBadge[data-risk="low-medium"]{\n  background:#f2f8e7;\n  border-color:#dcebbf;\n  color:#66851e;\n}\n#agro-reference-home .arh-riskBadge[data-risk="medium"],\n#arhDetailPortal .arh-riskBadge[data-risk="medium"]{\n  background:#fff7dc;\n  border-color:#f2df9d;\n  color:#9b6a00;\n}\n#agro-reference-home .arh-riskBadge[data-risk="medium-high"],\n#arhDetailPortal .arh-riskBadge[data-risk="medium-high"]{\n  background:#fff0e2;\n  border-color:#f5cfaa;\n  color:#c45c00;\n}\n#agro-reference-home .arh-riskBadge[data-risk="high"],\n#arhDetailPortal .arh-riskBadge[data-risk="high"]{\n  background:#fdecec;\n  border-color:#f4c8c8;\n  color:#b42323;\n}\n#arhDetailPortal .arh-riskBadge{\n  min-height:25px;\n  font-size:9px;\n}\n#agro-reference-home .arh-riskInfoIcon,\n#arhDetailPortal .arh-riskInfoIcon{\n  width:14px;\n  height:14px;\n  border:1px solid currentColor;\n  border-radius:50%;\n  display:inline-grid;\n  place-items:center;\n  flex:0 0 auto;\n  font-size:8px;\n  line-height:1;\n  font-weight:900;\n  opacity:.68;\n  text-transform:none;\n}\n#agro-reference-home .arh-riskTooltip,\n#arhDetailPortal .arh-riskTooltip{\n  position:absolute;\n  z-index:2147483640;\n  left:0;\n  top:calc(100% + 9px);\n  width:280px;\n  max-width:min(280px,calc(100vw - 36px));\n  padding:12px 13px;\n  border:1px solid #e3e6e1;\n  border-radius:13px;\n  background:#fff;\n  color:#343934;\n  box-shadow:0 14px 36px rgba(24,28,24,.14);\n  font:500 11.5px/1.52 Inter,Arial,Helvetica,sans-serif;\n  letter-spacing:0;\n  text-align:left;\n  text-transform:none;\n  white-space:normal;\n  opacity:0;\n  visibility:hidden;\n  transform:translateY(-3px);\n  transition:opacity .14s ease,transform .14s ease,visibility .14s ease;\n  pointer-events:none;\n}\n#agro-reference-home .arh-riskTooltip::before,\n#arhDetailPortal .arh-riskTooltip::before{\n  content:\'\';\n  position:absolute;\n  left:15px;\n  top:-5px;\n  width:9px;\n  height:9px;\n  border-left:1px solid #e3e6e1;\n  border-top:1px solid #e3e6e1;\n  background:#fff;\n  transform:rotate(45deg);\n}\n#agro-reference-home .arh-riskTooltip b,\n#arhDetailPortal .arh-riskTooltip b{\n  display:block;\n  margin:0 0 5px;\n  color:#181b18;\n  font-size:11.5px;\n  line-height:1.35;\n  font-weight:850;\n}\n#agro-reference-home .arh-riskTooltip span,\n#arhDetailPortal .arh-riskTooltip span{\n  display:block;\n}\n#agro-reference-home .arh-riskBadge:hover .arh-riskTooltip,\n#agro-reference-home .arh-riskBadge:focus-visible .arh-riskTooltip,\n#agro-reference-home .arh-riskBadge.is-tooltip-open .arh-riskTooltip,\n#arhDetailPortal .arh-riskBadge:hover .arh-riskTooltip,\n#arhDetailPortal .arh-riskBadge:focus-visible .arh-riskTooltip,\n#arhDetailPortal .arh-riskBadge.is-tooltip-open .arh-riskTooltip{\n  opacity:1;\n  visibility:visible;\n  transform:translateY(0);\n}\n#agro-reference-home .arh-riskBadge:focus-visible,\n#arhDetailPortal .arh-riskBadge:focus-visible{\n  box-shadow:0 0 0 3px rgba(255,128,0,.14);\n}\n\n@media(max-width:640px){\n  #agro-reference-home .arh-riskBadge{\n    min-height:22px;\n    padding:0 7px;\n    font-size:8px;\n  }\n  #agro-reference-home .arh-riskTooltip,\n  #arhDetailPortal .arh-riskTooltip{\n    width:250px;\n    max-width:calc(100vw - 44px);\n    font-size:11px;\n  }\n}\n\n#arhDetailPortal .arh-viewSwitch{\n  display:flex;\n  align-items:center;\n  gap:22px;\n  margin-top:19px;\n  padding:0;\n  border:0;\n  background:transparent;\n}\n#arhDetailPortal .arh-viewSwitch button{\n  appearance:none;\n  position:relative;\n  border:0;\n  margin:0;\n  padding:4px 0 8px;\n  background:transparent;\n  color:#8a908a;\n  font:800 11px/1.2 Inter,Arial,Helvetica,sans-serif;\n  cursor:pointer;\n  transition:color .16s ease;\n}\n#arhDetailPortal .arh-viewSwitch button::after{\n  content:\'\';\n  position:absolute;\n  left:0;\n  right:0;\n  bottom:0;\n  height:2px;\n  border-radius:10px;\n  background:transparent;\n}\n#arhDetailPortal .arh-viewSwitch button.active{\n  color:#181b18;\n}\n#arhDetailPortal .arh-viewSwitch button.active::after{\n  background:#ff8000;\n}\n#arhDetailPortal .arh-detailMode[hidden]{display:none!important}\n\n/* Краткий режим — не набор карточек, а компактный конспект. */\n#arhDetailPortal .arh-brief{\n  max-width:760px;\n  margin-top:22px;\n  border-top:1px solid #eceeea;\n}\n#arhDetailPortal .arh-briefList{\n  margin:0;\n  padding:0;\n}\n#arhDetailPortal .arh-briefRow{\n  display:grid;\n  grid-template-columns:minmax(118px,150px) minmax(0,1fr);\n  gap:20px;\n  align-items:start;\n  padding:12px 0;\n  border-bottom:1px solid #eceeea;\n}\n#arhDetailPortal .arh-briefRow dt,\n#arhDetailPortal .arh-briefRow dd{\n  margin:0;\n}\n#arhDetailPortal .arh-briefRow dt{\n  color:#929892;\n  font-size:9px;\n  line-height:1.45;\n  font-weight:900;\n  letter-spacing:.065em;\n  text-transform:uppercase;\n}\n#arhDetailPortal .arh-briefRow dd{\n  color:#2b302b;\n  font-size:13.5px;\n  line-height:1.58;\n  font-weight:600;\n}\n@media(max-width:640px){\n  #arhDetailPortal .arh-viewSwitch{\n    margin-top:16px;\n    gap:20px;\n  }\n  #arhDetailPortal .arh-brief{margin-top:19px}\n  #arhDetailPortal .arh-briefRow{\n    grid-template-columns:1fr;\n    gap:4px;\n    padding:11px 0;\n  }\n  #arhDetailPortal .arh-briefRow dd{\n    font-size:13px;\n    line-height:1.55;\n  }\n}\n@media (hover:hover) and (pointer:fine){\n  #arhDetailPortal .arh-viewSwitch button:hover:not(.active){\n    color:#4d544d;\n  }\n}';
    document.head.appendChild(style);
  }

  /* -------------------------
     ЗАГРУЗКА JSON
     ------------------------- */
/* AGROCON REFERENCE · DATA LOADER v26
   Всегда запрашивает свежий reference-data.json и не доверяет старому loader. */
(function(){
  const DATA_URL='https://raw.githubusercontent.com/alekseikim78987-blip/sprawochnikagro/refs/heads/main/reference-data.json';

  if(window.AGRO_REFERENCE_V26_FETCH_STARTED)return;
  window.AGRO_REFERENCE_V26_FETCH_STARTED=true;
  /* Блокируем старые встроенные loader'ы, которые используют прежний флаг. */
  window.AGRO_REFERENCE_FETCH_STARTED=true;

  const separator=DATA_URL.includes('?')?'&':'?';
  const freshUrl=DATA_URL+separator+'v='+Date.now();

  fetch(freshUrl,{cache:'no-store'})
    .then(function(response){
      if(!response.ok)throw new Error('HTTP '+response.status);
      return response.json();
    })
    .then(function(payload){
      const data=Array.isArray(payload)
        ?payload
        :(payload&&Array.isArray(payload.items)?payload.items:null);

      if(!data)throw new Error('JSON должен быть массивом записей или объектом с массивом items.');

      window.AGRO_REFERENCE_DATA=data;
      window.AGRO_REFERENCE_DATA_READY=true;
      document.dispatchEvent(new CustomEvent('agro-reference:data-updated',{
        detail:{count:data.length,source:DATA_URL}
      }));
    })
    .catch(function(error){
      console.error('[Agrocon Reference] Не удалось загрузить reference-data.json:',error);
      window.AGRO_REFERENCE_DATA_READY=false;
      window.AGRO_REFERENCE_V26_FETCH_STARTED=false;
    });
})();

  /* -------------------------
     ИНТЕРФЕЙС
     ------------------------- */
  function initAgroReferenceUI(){
const roots=document.querySelectorAll('#agro-reference-home');
  const root=roots.length?roots[roots.length-1]:null;
  if(!root)return;

  if(roots.length>1){
    console.warn('Agrocon Reference: на странице найдено несколько интерфейсных блоков. Используется последний. Старые копии лучше удалить.');
  }

  window.AGRO_REFERENCE_DATA=window.AGRO_REFERENCE_DATA||[];

  

  const CATEGORIES={
    pesticides:{label:'Пестициды',title:'Средства защиты растений'},
    mechanisms:{label:'Механизмы действия',title:'Как работают пестициды'},
    diseases:{label:'Болезни',title:'Болезни сельскохозяйственных культур'},
    pests:{label:'Вредители',title:'Вредители сельскохозяйственных культур'},
    weeds:{label:'Сорная растительность',title:'Сорные растения'},
    crops:{label:'Культуры',title:'Сельскохозяйственные культуры'},
    nutrition:{label:'Питание растений',title:'Элементы питания и дефициты'}
  };

  function normalizeCategoryMeta(raw){
    if(!raw)return {};

    if(Array.isArray(raw)){
      return raw.reduce((acc,item)=>{
        if(!item || typeof item!=='object')return acc;

        const id=String(item.id||item.value||item.category||'').trim();
        if(!id)return acc;

        acc[id]={
          label:item.label||item.title||humanize(id),
          title:item.title||item.label||humanize(id)
        };
        return acc;
      },{});
    }

    if(typeof raw==='object'){
      return Object.entries(raw).reduce((acc,[id,value])=>{
        if(value && typeof value==='object'){
          acc[id]={
            label:value.label||value.title||humanize(id),
            title:value.title||value.label||humanize(id)
          };
        }else{
          acc[id]={
            label:String(value||humanize(id)),
            title:String(value||humanize(id))
          };
        }
        return acc;
      },{});
    }

    return {};
  }

  function syncConfiguredCategories(){
    if(window.AGRO_REFERENCE_CATEGORIES){
      Object.assign(
        CATEGORIES,
        normalizeCategoryMeta(window.AGRO_REFERENCE_CATEGORIES)
      );
    }

    Object.assign(
      CATEGORIES,
      normalizeCategoryMeta(configCategories())
    );
  }

  const TYPE_LABELS={
    herbicide:'Гербицид',
    fungicide:'Фунгицид',
    insecticide:'Инсектицид',
    acaricide:'Акарицид',
    rodenticide:'Родентицид',
    nematicide:'Нематицид',
    bactericide:'Бактерицид',
    algicide:'Альгицид',
    avicide:'Авицид',
    fumigant:'Фумигант',
    seed_treatment:'Протравитель',
    other:'Другое'
  };

  const TYPE_PLURAL={
    herbicide:'Гербициды',
    fungicide:'Фунгициды',
    insecticide:'Инсектициды',
    acaricide:'Акарициды',
    rodenticide:'Родентициды',
    nematicide:'Нематициды',
    bactericide:'Бактерициды',
    algicide:'Альгициды',
    avicide:'Авициды',
    fumigant:'Фумиганты',
    seed_treatment:'Протравители',
    other:'Другие'
  };

  const CORE_PESTICIDE_TYPES=[
    'herbicide','fungicide','insecticide','acaricide',
    'rodenticide','nematicide','other'
  ];

  window.AGRO_REFERENCE_FILTERS=window.AGRO_REFERENCE_FILTERS||{};

  const BUILTIN_FILTERS={
    pesticides:[{
      id:'type',
      label:'Тип пестицида',
      field:'type',
      dynamic:true,
      order:CORE_PESTICIDE_TYPES,
      excludeValues:['molluscicide'],
      optionLabels:TYPE_PLURAL
    }],
    mechanisms:[{
      id:'type',
      label:'Механизмы по типу пестицида',
      field:'type',
      dynamic:true,
      order:CORE_PESTICIDE_TYPES,
      excludeValues:['molluscicide'],
      optionLabels:TYPE_PLURAL
    }],

    nutrition:[{
      id:'nutritionGroup',
      label:'Раздел',
      fields:['nutritionGroups','nutritionGroup'],
      dynamic:true,
      order:[
        'nitrogen','phosphorus','potassium',
        'complex','secondary','micro','deficiency'
      ],
      optionLabels:{
        nitrogen:'Азотные',
        phosphorus:'Фосфорные',
        potassium:'Калийные',
        complex:'Комплексные',
        secondary:'Мезоэлементы',
        meso:'Мезоэлементы',
        micro:'Микроудобрения',
        deficiency:'Дефицит'
      }
    }]
  };

  const state={
    category:'pesticides',

    pesticideFilter:'all',
    filters:{},
    query:'',
    diseaseCultureQuery:''
  };

  const search=root.querySelector('#arhSearch');
  const clear=root.querySelector('#arhClear');
  const searchWrap=root.querySelector('.arh-searchWrap');
  const catRail=root.querySelector('#arhCatRail');
  const categoryView=root.querySelector('#arhCategoryView');
  const globalView=root.querySelector('#arhGlobalSearch');
  const results=root.querySelector('#arhResults');
  const globalResults=root.querySelector('#arhGlobalResults');
  const total=root.querySelector('#arhTotal');
  const globalTotal=root.querySelector('#arhGlobalTotal');
  const filterWrap=root.querySelector('#arhFilterWrap');
  const sectionEyebrow=root.querySelector('#arhSectionEyebrow');
  const sectionTitle=root.querySelector('#arhSectionTitle');
  const searchCount=root.querySelector('#arhSearchCount');

  const esc=s=>String(s??'').replace(/[&<>"]/g,m=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'
  }[m]));

  function rawReferenceData(){
    return window.AGRO_REFERENCE_DATA;
  }

  function isConfigRecord(item){
    if(!item || typeof item!=='object' || Array.isArray(item))return false;

    return (
      item._kind==='config' ||
      item.kind==='config' ||
      item.type==='reference-config' ||
      item.id==='agro-reference-config' ||
      item.id==='reference-config'
    );
  }

  function embeddedConfig(){
    const raw=rawReferenceData();

    if(Array.isArray(raw)){
      return raw.find(isConfigRecord)||{};
    }

    if(raw && typeof raw==='object'){
      return raw.config && typeof raw.config==='object'
        ?raw.config
        :raw;
    }

    return {};
  }

  const items=()=>{
    const raw=rawReferenceData();

    if(Array.isArray(raw)){
      return raw.filter(item=>!isConfigRecord(item));
    }

    if(raw && typeof raw==='object'){
      if(Array.isArray(raw.items)){
        return raw.items.filter(item=>!isConfigRecord(item));
      }

      if(Array.isArray(raw.data)){
        return raw.data.filter(item=>!isConfigRecord(item));
      }
    }

    return [];
  };

  function configFilters(){
    const config=embeddedConfig();

    return (
      config.filters ||
      config.filterConfig ||
      window.AGRO_REFERENCE_CONFIG?.filters ||
      {}
    );
  }

  function configCategories(){
    const config=embeddedConfig();

    return (
      config.categories ||
      config.categoryConfig ||
      window.AGRO_REFERENCE_CONFIG?.categories ||
      {}
    );
  }

  function humanize(value){
    return String(value||'')
      .replace(/[_-]+/g,' ')
      .replace(/\b\w/g,m=>m.toUpperCase());
  }

  function getTypeLabel(item){
    return item.typeLabel || TYPE_LABELS[item.type] || humanize(item.type) || 'Материал';
  }

  function getCategoryMeta(category){
    syncConfiguredCategories();
    if(CATEGORIES[category])return CATEGORIES[category];

    const sample=items().find(x=>x.category===category)||{};
    const meta={
      label:sample.categoryLabel || humanize(category),
      title:sample.categoryTitle || sample.categoryLabel || humanize(category)
    };
    CATEGORIES[category]=meta;
    return meta;
  }

  function flattenForSearch(value,depth=0){
    if(value===null||value===undefined||depth>5)return '';
    if(typeof value==='string'||typeof value==='number'||typeof value==='boolean'){
      return String(value);
    }
    if(Array.isArray(value)){
      return value.map(v=>flattenForSearch(v,depth+1)).join(' ');
    }
    if(typeof value==='object'){
      return Object.entries(value)
        .map(([k,v])=>`${k} ${flattenForSearch(v,depth+1)}`)
        .join(' ');
    }
    return '';
  }

  /* =========================================================
     УМНЫЙ ПОИСК
     Работает без внешних библиотек:
     - точные совпадения;
     - совпадения по началу/части слова;
     - опечатки и близкое написание;
     - ё/е, дефисы, пробелы и регистр;
     - поиск по названию, aliases, HRAC/FRAC/IRAC,
       механизмам, культурам, спектру и остальным полям.
     ========================================================= */

  const SEARCH_STOP_WORDS=new Set([
    'и','или','в','во','на','по','с','со','к','ко','у','о','об','от','до',
    'за','из','для','при','про','над','под','а','но','же','это','этот','эта',
    'эти','какой','какая','какие','чем','чего','против'
  ]);

  const SEARCH_CACHE=new WeakMap();

  function normalizeSearchText(value){
    return String(value??'')
      .toLowerCase()
      .replace(/ё/g,'е')
      .replace(/[‐‑‒–—−]/g,'-')
      .replace(/[^a-zа-я0-9]+/gi,' ')
      .replace(/\s+/g,' ')
      .trim();
  }

  function compactSearchText(value){
    return normalizeSearchText(value).replace(/\s+/g,'');
  }

  function searchTokens(value){
    const tokens=normalizeSearchText(value).split(' ').filter(Boolean);
    const meaningful=tokens.filter(t=>!SEARCH_STOP_WORDS.has(t));
    return meaningful.length?meaningful:tokens;
  }

  function searchStem(token){
    let t=normalizeSearchText(token);
    if(t.length<5)return t;

    /* Лёгкая нормализация окончаний нужна не как полноценный морфологический
       анализ, а чтобы "соя/сое", "злаковые/злаковых", "тля/тли" не мешали поиску. */
    const endings=[
      'иями','ями','ами','ого','ему','ому','ыми','ими','ее','ие','ые','ое',
      'ей','ий','ый','ой','ем','им','ым','ом','их','ых','ую','юю','ая','яя',
      'ов','ев','ам','ям','ах','ях','ы','и','а','я','у','ю','е'
    ];
    for(const ending of endings){
      if(t.length-ending.length>=4 && t.endsWith(ending)){
        return t.slice(0,-ending.length);
      }
    }
    return t;
  }

  function levenshtein(a,b,maxDistance=Infinity){
    if(a===b)return 0;
    if(!a)return b.length;
    if(!b)return a.length;
    if(Math.abs(a.length-b.length)>maxDistance)return maxDistance+1;

    if(a.length>b.length)[a,b]=[b,a];

    let prev=new Array(a.length+1);
    let curr=new Array(a.length+1);
    for(let i=0;i<=a.length;i++)prev[i]=i;

    for(let j=1;j<=b.length;j++){
      curr[0]=j;
      let rowMin=curr[0];
      const bj=b.charCodeAt(j-1);

      for(let i=1;i<=a.length;i++){
        const cost=a.charCodeAt(i-1)===bj?0:1;
        curr[i]=Math.min(
          curr[i-1]+1,
          prev[i]+1,
          prev[i-1]+cost
        );
        if(curr[i]<rowMin)rowMin=curr[i];
      }

      if(rowMin>maxDistance)return maxDistance+1;
      [prev,curr]=[curr,prev];
    }

    return prev[a.length];
  }

  function allowedTypos(length){
    if(length<=3)return 0;
    if(length<=5)return 1;
    if(length<=9)return 2;
    if(length<=15)return 3;
    return 4;
  }

  function fuzzyWordScore(queryWord,documentWord){
    if(!queryWord||!documentWord)return 0;
    if(queryWord===documentWord)return 100;

    const qStem=searchStem(queryWord);
    const dStem=searchStem(documentWord);

    if(qStem.length>=3 && qStem===dStem)return 94;

    if(queryWord.length>=3 && documentWord.startsWith(queryWord))return 91;
    if(documentWord.length>=3 && queryWord.startsWith(documentWord))return 88;

    if(queryWord.length>=4 && documentWord.includes(queryWord))return 84;
    if(documentWord.length>=4 && queryWord.includes(documentWord))return 80;

    const limit=allowedTypos(Math.max(queryWord.length,documentWord.length));
    if(!limit)return 0;

    const distance=levenshtein(queryWord,documentWord,limit);
    if(distance>limit)return 0;

    const similarity=1-distance/Math.max(queryWord.length,documentWord.length);
    if(similarity<0.70)return 0;

    return Math.round(76*similarity);
  }

  function buildSearchDocument(item){
    if(SEARCH_CACHE.has(item))return SEARCH_CACHE.get(item);

    const category=getCategoryMeta(item.category);
    const title=normalizeSearchText(item.title||item.name||'');
    const aliases=arr(item.aliases).map(normalizeSearchText).filter(Boolean);

    const codes=[
      item.hrac?`hrac ${item.hrac}`:'',
      item.frac?`frac ${item.frac}`:'',
      item.irac?`irac ${item.irac}`:'',
      item.rac?`rac ${item.rac}`:'',
      item.classificationSystem&&item.classificationCode
        ?`${item.classificationSystem} ${item.classificationCode}`:''
    ].filter(Boolean).map(normalizeSearchText);

    const important=normalizeSearchText([
      item.title,
      item.name,
      ...arr(item.aliases),
      ...codes,
      item.family,
      item.moa,
      item.target,
      item.typeLabel,
      getTypeLabel(item),
      category.label,
      category.title,
      ...arr(item.tags),
      ...arr(item.spectrum),
      ...arr(item.crops)
    ].filter(Boolean).join(' '));

    const full=normalizeSearchText([
      flattenForSearch(item),
      category.label,
      category.title,
      getTypeLabel(item)
    ].join(' '));

    /* Набор уникальных слов ускоряет fuzzy-поиск на длинных статьях. */
    const words=[...new Set(full.split(' ').filter(Boolean))];

    const doc={
      item,
      title,
      titleCompact:compactSearchText(item.title||item.name||''),
      aliases,
      aliasCompact:aliases.map(compactSearchText),
      codes,
      important,
      full,
      words
    };

    SEARCH_CACHE.set(item,doc);
    return doc;
  }

  function itemBlob(item){
    return buildSearchDocument(item).full;
  }

  function queryWordMatchScore(queryWord,doc){
    let best=0;

    /* Сначала важные поля — название, aliases, коды, механизм, спектр, культуры. */
    for(const word of doc.important.split(' ')){
      const score=fuzzyWordScore(queryWord,word);
      if(score>best)best=score;
      if(best===100)break;
    }

    /* Полный текст используем только если в важных полях ничего хорошего нет. */
    if(best<76){
      for(const word of doc.words){
        const score=fuzzyWordScore(queryWord,word);
        if(score>best)best=score;
        if(best===100)break;
      }
    }

    return best;
  }

  function scoreSearchItem(item,rawQuery){
    const doc=buildSearchDocument(item);
    const q=normalizeSearchText(rawQuery);
    const qCompact=compactSearchText(rawQuery);
    const tokens=searchTokens(rawQuery);

    if(!q)return null;

    let score=0;
    let exact=false;
    let fuzzy=false;

    /* Название всегда имеет максимальный вес. */
    if(doc.title===q){
      score+=1400;
      exact=true;
    }else if(doc.titleCompact===qCompact && qCompact.length>=3){
      score+=1320;
      exact=true;
    }else if(doc.title.startsWith(q)){
      score+=1120;
      exact=true;
    }else if(q.length>=3 && doc.title.includes(q)){
      score+=940;
      exact=true;
    }

    /* Английские названия, ISO/common names и другие aliases. */
    if(doc.aliases.some(a=>a===q)){
      score=Math.max(score,1280);
      exact=true;
    }else if(doc.aliases.some(a=>a.startsWith(q))){
      score=Math.max(score,1040);
      exact=true;
    }else if(q.length>=3 && doc.aliases.some(a=>a.includes(q))){
      score=Math.max(score,900);
      exact=true;
    }

    /* Коды HRAC / FRAC / IRAC. */
    if(doc.codes.some(c=>c===q)){
      score=Math.max(score,1200);
      exact=true;
    }else if(doc.codes.some(c=>c.includes(q))){
      score=Math.max(score,980);
      exact=true;
    }

    /* Точная фраза в смысловых полях ценнее совпадения в длинной статье. */
    if(doc.important.includes(q)){
      score+=520;
      exact=true;
    }else if(doc.full.includes(q)){
      score+=300;
      exact=true;
    }

    /* Поиск по отдельным словам позволяет понимать запросы вроде:
       "гербицид от злаковых на сое". */
    let matched=0;
    let tokenScore=0;
    for(const token of tokens){
      const best=queryWordMatchScore(token,doc);

      if(best>=58){
        matched++;
        tokenScore+=best;
        if(best<100)fuzzy=true;
      }
    }

    const coverage=tokens.length?matched/tokens.length:0;

    /* Не показываем случайное математически похожее слово.
       Чем больше слов в запросе, тем большую часть запроса должен покрыть материал. */
    const requiredCoverage=
      tokens.length<=1 ? 1 :
      tokens.length===2 ? .5 :
      .6;

    if(coverage<requiredCoverage && !exact)return null;

    score+=tokenScore;
    score+=Math.round(coverage*240);

    /* Для одиночного слова fuzzy-совпадение по самому названию усиливаем. */
    if(tokens.length===1 && !exact){
      const titleWords=doc.title.split(' ');
      let bestTitle=0;
      for(const word of titleWords){
        bestTitle=Math.max(bestTitle,fuzzyWordScore(tokens[0],word));
      }

      if(doc.titleCompact && qCompact.length>=4){
        const limit=allowedTypos(Math.max(qCompact.length,doc.titleCompact.length));
        const dist=levenshtein(qCompact,doc.titleCompact,limit);
        if(dist<=limit){
          const similarity=1-dist/Math.max(qCompact.length,doc.titleCompact.length);
          if(similarity>=.72){
            bestTitle=Math.max(bestTitle,Math.round(similarity*100));
          }
        }
      }

      if(bestTitle>=62){
        score+=bestTitle*7;
        fuzzy=true;
      }
    }

    if(score<180)return null;

    return {
      item,
      score,
      exact,
      fuzzy,
      coverage
    };
  }

  function searchReference(rawQuery){
    return items()
      .map(item=>scoreSearchItem(item,rawQuery))
      .filter(Boolean)
      .sort((a,b)=>
        b.score-a.score ||
        String(a.item.title||'').localeCompare(
          String(b.item.title||''),
          'ru',
          {sensitivity:'base',numeric:true}
        )
      );
  }

  /* Сохраняем привычные буквенные блоки, но при поиске ставим первым
     раздел с наиболее релевантным результатом. */
  function groupedSearchCards(scored){
    if(!scored.length)return '';

    const groups=new Map();

    scored.forEach(result=>{
      const key=sectionKey(result.item.title);
      if(!groups.has(key))groups.set(key,[]);
      groups.get(key).push(result);
    });

    return [...groups.entries()]
      .sort((a,b)=>b[1][0].score-a[1][0].score)
      .map(([key,group])=>`
        <section class="arh-alphaGroup" data-alpha="${esc(key)}">
          <div class="arh-alphaHead">
            <span class="arh-alphaLetter">${esc(key)}</span>
            <span class="arh-alphaLine"></span>
            <span class="arh-alphaCount">${group.length}</span>
          </div>
          <div class="arh-alphaCards">
            ${group.map(result=>card(result.item)).join('')}
          </div>
        </section>`
      ).join('');
  }

  function fuzzySuggestion(scored,rawQuery){
    if(!scored.length)return '';
    const q=normalizeSearchText(rawQuery);
    const tokens=searchTokens(rawQuery);
    if(tokens.length!==1)return '';

    const first=scored[0];
    const title=normalizeSearchText(first.item.title||'');

    /* Подсказку показываем только если пользователь не ввёл
       точное/частичное название, но лучший результат действительно близок. */
    if(first.exact || title.includes(q) || q.includes(title))return '';
    if(!first.fuzzy || first.score<500)return '';

    return first.item.title||'';
  }

  function nonCoreTypeLabel(item){
    if(item.typeLabel)return item.typeLabel;

    const text=value=>{
      const v=valueText(value).trim();
      return v||'';
    };

    if(item.category==='diseases'){
      return text(item.pathogenTypeLabel) ||
        text(item.pathogenType) ||
        (item.type && item.type!=='disease' ? humanize(item.type) : '') ||
        'Болезнь';
    }

    if(item.category==='pests'){
      return text(item.pestGroup) ||
        text(item.order) ||
        (item.type && item.type!=='pest' ? humanize(item.type) : '') ||
        'Вредитель';
    }

    if(item.category==='weeds'){
      return text(item.lifeCycle) ||
        text(item.lifecycleType) ||
        (item.type && item.type!=='weed' ? humanize(item.type) : '') ||
        'Сорное растение';
    }

    if(item.category==='crops'){
      return text(item.cropGroup) ||
        text(item.group) ||
        (item.type && item.type!=='crop' ? humanize(item.type) : '') ||
        'Культура';
    }

    if(item.category==='nutrition'){
      const groups={
        nitrogen:'Азотные',
        phosphorus:'Фосфорные',
        potassium:'Калийные',
        complex:'Комплексные',
        secondary:'Мезоэлементы',
        micro:'Микроудобрения'
      };
      return groups[item.nutritionGroup] ||
        text(item.fertilizerGroupLabel) ||
        (item.type && item.type!=='fertilizer' ? humanize(item.type) : '') ||
        'Питание растений';
    }

    return getCategoryMeta(item.category).label;
  }


  const RISK_LABELS={
    low:'Низкий',
    'low-medium':'Низкий–средний',
    medium:'Средний',
    'medium-high':'Средний–высокий',
    high:'Высокий'
  };

  const RISK_HINTS={
    low:'Вероятность быстрого отбора устойчивой популяции обычно невысока, но повторное применение одного механизма всё равно создаёт селекционное давление.',
    'low-medium':'Риск относительно невысок, однако возрастает при частом повторении одного и того же механизма действия.',
    medium:'Устойчивость может формироваться при регулярном селекционном давлении; механизм желательно чередовать с другими группами.',
    'medium-high':'Риск заметный: повторные обработки одним механизмом могут сравнительно быстро усиливать долю устойчивых особей.',
    high:'Высокий риск быстрого отбора устойчивых популяций. Повторные применения одного механизма особенно нежелательны.'
  };

  function resistanceRiskLabel(item){
    if(!item || item.category!=='pesticides')return '';
    return item.resistanceRiskLabel || RISK_LABELS[item.resistanceRisk] || '';
  }

  function resistanceRiskBadge(item,compact=false){
    if(!item || item.category!=='pesticides' || !item.resistanceRisk)return '';
    const level=String(item.resistanceRisk);
    const label=resistanceRiskLabel(item);
    if(!label)return '';

    const basis=String(item.resistanceRiskBasis||item.resistance||'').trim();
    const hint=RISK_HINTS[level]||'Реальный риск зависит от частоты применения одного механизма, чувствительности популяции и всей системы защиты.';
    const tooltipBody=basis || hint;
    const aria=`Риск отбора резистентности: ${label}. ${tooltipBody}`;

    return `<span class="arh-riskBadge" data-risk="${esc(level)}" tabindex="0" `+
      `role="button" aria-label="${esc(aria)}" aria-expanded="false">`+
        `<span class="arh-riskBadgeText">${compact?'Риск: ':'Риск резистентности: '}${esc(label)}</span>`+
        `<span class="arh-riskInfoIcon" aria-hidden="true">i</span>`+
        `<span class="arh-riskTooltip" role="tooltip">`+
          `<b>Риск отбора резистентности — ${esc(label.toLowerCase())}</b>`+
          `<span>${esc(tooltipBody)}</span>`+
        `</span>`+
    `</span>`;
  }

  function cardPreview(item){
    const raw=String(
      item.simple ||
      item.lead ||
      item.description ||
      ''
    )
      .replace(/\s+/g,' ')
      .trim();

    if(!raw)return '';

    const MAX=155;
    if(raw.length<=MAX)return raw;

    const cut=raw.slice(0,MAX+1);
    const lastSpace=cut.lastIndexOf(' ');
    const safe=(lastSpace>110?cut.slice(0,lastSpace):raw.slice(0,MAX)).trim();

    return safe.replace(/[,:;—–-]+$/,'')+'…';
  }

  function card(item){
    const badge=(item.category==='pesticides'||item.category==='mechanisms')
      ? getTypeLabel(item)
      : nonCoreTypeLabel(item);

    const tagHtml=(item.tags||[]).slice(0,3)
      .map(t=>`<span>${esc(t)}</span>`).join('');

    const riskBadge=resistanceRiskBadge(item,true);

    return `<div class="arh-card" role="button" tabindex="0" data-item-id="${esc(item.id)}">
      <div class="arh-cardTop">
        <div class="arh-cardBadges">
          <span class="arh-badge ${(item.category==='pesticides'||item.category==='mechanisms')?'orange':''}">${esc(badge)}</span>
          ${riskBadge}
        </div>
        <span class="arh-cardArrow">↗</span>
      </div>
      <div class="arh-cardTitle">${esc(item.title)}</div>
      ${cardPreview(item)?`<div class="arh-cardDesc">${esc(cardPreview(item))}</div>`:''}
      ${tagHtml?`<div class="arh-cardMeta">${tagHtml}</div>`:''}
    </div>`;
  }

  function sectionKey(title){
    const value=String(title||'').trim();
    if(!value)return '#';

    const first=value.charAt(0).toUpperCase();

    /* Названия, начинающиеся с цифры, получают цифровой раздел.
       Например 2,4-Д попадёт в раздел "2". */
    if(/[0-9]/.test(first))return first;

    /* Ё показываем отдельной буквой, как в русском алфавите. */
    if(/[А-ЯЁ]/.test(first))return first;

    /* Латиница тоже поддерживается на будущее. */
    if(/[A-Z]/.test(first))return first;

    return '#';
  }

  function groupRank(key){
    if(/^[0-9]$/.test(key))return [0,Number(key)];

    const ru='АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    const ruIndex=ru.indexOf(key);
    if(ruIndex>=0)return [1,ruIndex];

    const en='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const enIndex=en.indexOf(key);
    if(enIndex>=0)return [2,enIndex];

    return [3,999];
  }

  function groupedCards(list){
    if(!list.length)return '';

    const groups=new Map();

    list.forEach(item=>{
      const key=sectionKey(item.title);
      if(!groups.has(key))groups.set(key,[]);
      groups.get(key).push(item);
    });

    const keys=[...groups.keys()].sort((a,b)=>{
      const ra=groupRank(a);
      const rb=groupRank(b);
      return ra[0]-rb[0] || ra[1]-rb[1];
    });

    return keys.map(key=>{
      const group=groups.get(key);
      return `
        <section class="arh-alphaGroup" data-alpha="${esc(key)}">
          <div class="arh-alphaHead">
            <span class="arh-alphaLetter">${esc(key)}</span>
            <span class="arh-alphaLine"></span>
            <span class="arh-alphaCount">${group.length}</span>
          </div>
          <div class="arh-alphaCards">
            ${group.map(card).join('')}
          </div>
        </section>`;
    }).join('');
  }

  function emptyCategory(category){
    const label=getCategoryMeta(category).label;
    return `
      <div class="arh-empty">
        <div class="arh-emptyIcon">✦</div>
        <b>${esc(label)} — скоро будет</b>
        <p>Мы уже готовим материалы для этого раздела. Скоро здесь появится новая база знаний.</p>
      </div>`;
  }

  function emptySearch(){
    return `
      <div class="arh-empty">
        <div class="arh-emptyIcon">⌕</div>
        <b>Ничего не найдено</b>
        <p>Попробуй другое название, механизм действия, культуру или более короткий запрос.</p>
      </div>`;
  }

  function genericCategoryIcon(){
    return `<svg viewBox="0 0 24 24">
      <rect x="4" y="4" width="6" height="6" rx="2"></rect>
      <rect x="14" y="4" width="6" height="6" rx="2"></rect>
      <rect x="4" y="14" width="6" height="6" rx="2"></rect>
      <rect x="14" y="14" width="6" height="6" rx="2"></rect>
    </svg>`;
  }

  function safeSelectorValue(value){
    if(window.CSS&&typeof CSS.escape==='function')return CSS.escape(value);
    return String(value).replace(/["\\]/g,'\\$&');
  }

  function syncDynamicCategories(){
    syncConfiguredCategories();

    const present=[...new Set(items().map(x=>x.category).filter(Boolean))];
    const presentSet=new Set(present);

    /* Скрываем статические разделы Part 1, если в JSON для них нет ни одной записи. */
    catRail.querySelectorAll('[data-category]').forEach(btn=>{
      const visible=presentSet.has(btn.dataset.category);
      btn.hidden=!visible;
      btn.style.display=visible?'':'';
    });

    /* Если JSON добавил новую непредусмотренную категорию — создаём кнопку динамически. */
    present.forEach(category=>{
      if(!CATEGORIES[category])getCategoryMeta(category);

      const existing=catRail.querySelector(`[data-category="${safeSelectorValue(category)}"]`);
      if(existing){
        existing.hidden=false;
        existing.style.display='';
        return;
      }

      const meta=getCategoryMeta(category);
      const btn=document.createElement('button');
      btn.className='arh-cat';
      btn.type='button';
      btn.dataset.category=category;
      btn.innerHTML=`
        <span class="arh-catIcon">${genericCategoryIcon()}</span>
        <span class="arh-catText">
          <b>${esc(meta.label)}</b>
          <small>${esc(meta.title)}</small>
        </span>`;
      catRail.appendChild(btn);
    });

    /* Если выбранный раздел исчез или пока пуст — переходим в первый реально наполненный. */
    if(!presentSet.has(state.category) && present.length){
      const preferred=['pesticides','mechanisms','nutrition'];
      state.category=preferred.find(category=>presentSet.has(category))||present[0];
    }
  }

  function getPathValue(obj,path){
    if(!path)return undefined;
    return String(path).split('.').reduce((value,key)=>{
      if(value===null||value===undefined)return undefined;
      return value[key];
    },obj);
  }

  function normalizeFilterOptions(options){
    if(!options)return [];

    if(Array.isArray(options)){
      return options.map(option=>{
        if(option&&typeof option==='object'){
          const value=option.value!==undefined
            ?String(option.value)
            :'';
          return {
            value,
            label:String(option.label??option.value??''),
            order:option.order
          };
        }
        return {
          value:String(option),
          label:humanize(option)
        };
      }).filter(x=>x.value);
    }

    if(typeof options==='object'){
      return Object.entries(options).map(([value,label])=>({
        value:String(value),
        label:String(label)
      }));
    }

    return [];
  }

  function configsForCategory(raw,category){
    if(!raw)return [];

    if(Array.isArray(raw)){
      return raw
        .filter(config=>{
          if(!config || typeof config!=='object')return false;
          const target=config.category;
          return !target || target==='*' || String(target)===String(category);
        })
        .map(config=>({...config}));
    }

    if(typeof raw==='object'){
      const normalizeSection=section=>{
        if(!section)return [];
        return Array.isArray(section)
          ?section.map(config=>({...config}))
          :[{...section}];
      };

      return [
        ...normalizeSection(raw['*']),
        ...normalizeSection(raw[category])
      ];
    }

    return [];
  }

  function normalizeFilterConfigs(category){
    const builtins=BUILTIN_FILTERS[category]||[];
    const fromJson=configsForCategory(configFilters(),category);

    const externalRaw=window.AGRO_REFERENCE_FILTERS?.[category];
    const external=!externalRaw
      ?[]
      :Array.isArray(externalRaw)
        ?externalRaw
        :[externalRaw];

    /*
      Приоритет:
      1. fallback UI;
      2. конфигурация из reference-data.json;
      3. window.AGRO_REFERENCE_FILTERS как ручной override.

      Одинаковый id не создаёт второй фильтр, а переопределяет
      предыдущую конфигурацию.
    */
    const merged=new Map();

    [...builtins,...fromJson,...external].forEach((config,index)=>{
      if(!config || config.enabled===false)return;

      const id=String(
        config.id ||
        config.field ||
        (Array.isArray(config.fields)&&config.fields[0]) ||
        `filter-${index+1}`
      );

      const previous=merged.get(id)||{};

      merged.set(id,{
        ...previous,
        ...config,
        id
      });
    });

    return [...merged.values()]
      .sort((a,b)=>(Number(a.position??a.sort??999)-Number(b.position??b.sort??999)));
  }

  function itemFilterValues(item,config){
    let rawValues=[];

    if(typeof config.getValue==='function'){
      rawValues=[config.getValue(item)];
    }else{
      const paths=Array.isArray(config.fields)&&config.fields.length
        ?config.fields
        :[config.field||config.id];

      rawValues=paths.map(path=>getPathValue(item,path));
    }

    return [...new Set(
      rawValues
        .flatMap(value=>{
          if(value===null||value===undefined||value==='')return [];

          const values=Array.isArray(value)?value:[value];

          return values.flatMap(v=>{
            if(v&&typeof v==='object'&&v.value!==undefined){
              return [String(v.value)];
            }
            return [String(v)];
          });
        })
        .filter(Boolean)
    )];
  }

  function findFilterConfig(configs,key){
    return configs.find(config=>
      config.id===key ||
      config.field===key ||
      (Array.isArray(config.fields)&&config.fields.includes(key))
    );
  }

  function conditionExpectedMatches(actual,expected){
    const current=Array.isArray(actual)
      ?actual.map(String)
      :(actual===undefined || actual===null || actual==='all'
        ?[]
        :[String(actual)]);

    if(Array.isArray(expected)){
      const wanted=new Set(expected.map(String));
      return current.some(value=>wanted.has(value));
    }

    if(expected && typeof expected==='object'){
      if(expected.equals!==undefined){
        return current.includes(String(expected.equals));
      }
      if(expected.not!==undefined){
        return !current.includes(String(expected.not));
      }
      if(Array.isArray(expected.in)){
        const wanted=new Set(expected.in.map(String));
        return current.some(value=>wanted.has(value));
      }
      if(Array.isArray(expected.notIn)){
        const denied=new Set(expected.notIn.map(String));
        return current.every(value=>!denied.has(value));
      }
    }

    return current.includes(String(expected));
  }

  function filterConditionMatches(category,condition,configs){
    if(!condition)return true;

    if(Array.isArray(condition)){
      return condition.every(part=>
        filterConditionMatches(category,part,configs)
      );
    }

    if(typeof condition==='function'){
      try{
        return !!condition({
          category,
          filters:state.filters?.[category]||{}
        });
      }catch(error){
        console.warn(
          '[Agrocon Reference] Ошибка showWhen-функции:',
          error
        );
        return false;
      }
    }

    if(typeof condition!=='object')return true;

    /*
      Структурный формат:
        showWhen:{filter:'nutritionGroup',equals:'deficiency'}
        showWhen:{filter:'type',in:['herbicide','fungicide']}
    */
    if(condition.filter || condition.id){
      const key=String(condition.filter||condition.id);
      const target=findFilterConfig(configs,key);
      const filterId=target?.id||key;
      const active=activeFilterValues(category,filterId);

      if(condition.equals!==undefined){
        return active.includes(String(condition.equals));
      }
      if(condition.not!==undefined){
        return !active.includes(String(condition.not));
      }
      if(Array.isArray(condition.in)){
        const wanted=new Set(condition.in.map(String));
        return active.some(value=>wanted.has(value));
      }
      if(Array.isArray(condition.notIn)){
        const denied=new Set(condition.notIn.map(String));
        return active.every(value=>!denied.has(value));
      }

      return active.length>0;
    }

    /*
      Короткий формат:
        showWhen:{nutritionGroup:'deficiency'}
        showWhen:{nutritionGroup:['deficiency','toxicity']}
    */
    return Object.entries(condition).every(([key,expected])=>{
      const target=findFilterConfig(configs,key);
      const filterId=target?.id||key;
      const active=activeFilterValues(category,filterId);
      return conditionExpectedMatches(active,expected);
    });
  }

  function itemMatchesShowWhen(item,condition,configs){
    if(!condition)return true;

    if(Array.isArray(condition)){
      return condition.every(part=>
        itemMatchesShowWhen(item,part,configs)
      );
    }

    if(typeof condition!=='object' || typeof condition==='function'){
      return true;
    }

    if(condition.filter || condition.id){
      const key=String(condition.filter||condition.id);
      const target=findFilterConfig(configs,key);
      if(!target)return true;

      const values=itemFilterValues(item,target);

      if(condition.equals!==undefined){
        return values.includes(String(condition.equals));
      }
      if(condition.not!==undefined){
        return !values.includes(String(condition.not));
      }
      if(Array.isArray(condition.in)){
        const allowed=new Set(condition.in.map(String));
        return values.some(value=>allowed.has(value));
      }
      if(Array.isArray(condition.notIn)){
        const denied=new Set(condition.notIn.map(String));
        return !values.some(value=>denied.has(value));
      }

      return true;
    }

    return Object.entries(condition).every(([key,expected])=>{
      const target=findFilterConfig(configs,key);
      if(!target)return true;

      const values=itemFilterValues(item,target);

      if(Array.isArray(expected)){
        const allowed=new Set(expected.map(String));
        return values.some(value=>allowed.has(value));
      }

      if(expected && typeof expected==='object'){
        if(expected.equals!==undefined){
          return values.includes(String(expected.equals));
        }
        if(expected.not!==undefined){
          return !values.includes(String(expected.not));
        }
        if(Array.isArray(expected.in)){
          const allowed=new Set(expected.in.map(String));
          return values.some(value=>allowed.has(value));
        }
        if(Array.isArray(expected.notIn)){
          const denied=new Set(expected.notIn.map(String));
          return !values.some(value=>denied.has(value));
        }
      }

      return values.includes(String(expected));
    });
  }

  function resolveFilterOptions(category,config,allConfigs=[]){
    const excluded=new Set(
      (config.excludeValues||[]).map(String)
    );

    let configured=normalizeFilterOptions(config.options)
      .filter(option=>!excluded.has(option.value));

    if(isToggleFilter(config) && !configured.length){
      const value=toggleFilterValue(config);
      const exists=items()
        .filter(item=>item.category===category)
        .filter(item=>itemMatchesShowWhen(item,config.showWhen,allConfigs))
        .some(item=>itemFilterValues(item,config).includes(value));

      if(exists || config.force===true){
        configured=[{
          value,
          label:String(
            config.buttonLabel ||
            config.trueLabel ||
            config.label ||
            'Включить'
          )
        }];
      }
    }

    const map=new Map(
      configured.map(option=>[option.value,option])
    );

    /* dynamic:true позволяет вообще не перечислять options:
       кнопки строятся из значений, которые реально пришли в данных. */
    if(config.dynamic){
      items()
        .filter(item=>item.category===category)
        .filter(item=>itemMatchesShowWhen(
          item,
          config.showWhen,
          allConfigs
        ))
        .forEach(item=>{
          itemFilterValues(item,config).forEach(value=>{
            if(excluded.has(value)||map.has(value))return;

            const label=
              config.optionLabels?.[value] ||
              TYPE_PLURAL[value] ||
              TYPE_LABELS[value] ||
              humanize(value);

            map.set(value,{value,label});
          });
        });
    }

    let options=[...map.values()];

    const order=(config.order||[]).map(String);
    if(order.length){
      options.sort((a,b)=>{
        const ai=order.indexOf(a.value);
        const bi=order.indexOf(b.value);
        const ar=ai===-1?9999:ai;
        const br=bi===-1?9999:bi;

        return ar-br ||
          String(a.label).localeCompare(
            String(b.label),
            'ru',
            {sensitivity:'base',numeric:true}
          );
      });
    }

    return options;
  }

  function activeFilterValues(category,filterId){
    const raw=state.filters?.[category]?.[filterId];

    if(raw===undefined || raw===null || raw==='' || raw==='all'){
      return [];
    }

    const values=Array.isArray(raw)?raw:[raw];

    return [...new Set(
      values
        .map(value=>String(value))
        .filter(value=>value && value!=='all')
    )];
  }

  function activeFilterValue(category,filterId){
    const values=activeFilterValues(category,filterId);
    return values[0]||'all';
  }

  function setActiveFilterValues(category,filterId,values){
    if(!state.filters[category]){
      state.filters[category]={};
    }

    const clean=[...new Set(
      (Array.isArray(values)?values:[values])
        .map(value=>String(value??''))
        .filter(value=>value && value!=='all')
    )];

    state.filters[category][filterId]=clean;

    if(
      (category==='pesticides'||category==='mechanisms') &&
      filterId==='type'
    ){
      state.pesticideFilter=clean[0]||'all';
    }
  }

  function setActiveFilterValue(category,filterId,value){
    setActiveFilterValues(
      category,
      filterId,
      !value || value==='all' ? [] : [value]
    );
  }

  function isMultiFilter(config){
    if(config?.type==='toggle' || config?.filterType==='toggle'){
      return false;
    }
    if(config?.multiple===false || config?.single===true){
      return false;
    }
    return true;
  }

  function isToggleFilter(config){
    return config?.type==='toggle' || config?.filterType==='toggle';
  }

  function toggleFilterValue(config){
    if(config?.value!==undefined)return String(config.value);
    if(config?.trueValue!==undefined)return String(config.trueValue);
    return 'true';
  }

  function diseaseCultureRawValues(item){
    const sourceFields=[
      item?.crops,
      item?.crop,
      item?.cultures,
      item?.culture,
      item?.hostCrops,
      item?.hosts
    ];

    const values=[];

    sourceFields.forEach(source=>{
      if(Array.isArray(source)){
        source.forEach(value=>{
          if(value!==undefined && value!==null){
            const s=String(value).trim();
            if(s)values.push(s);
          }
        });
        return;
      }

      if(source!==undefined && source!==null){
        String(source)
          .split(/[;,|]/)
          .map(value=>value.trim())
          .filter(Boolean)
          .forEach(value=>values.push(value));
      }
    });

    return values;
  }

  function diseaseCultureOptions(){
    const seen=new Map();

    items()
      .filter(item=>item.category==='diseases')
      .forEach(item=>{
        diseaseCultureRawValues(item).forEach(value=>{
          const key=normalizeSearchText(value);
          if(key && !seen.has(key))seen.set(key,value);
        });
      });

    return [...seen.values()].sort((a,b)=>
      String(a).localeCompare(String(b),'ru',{sensitivity:'base'})
    );
  }

  function diseaseCultureSuggestions(query){
    const q=normalizeSearchText(query);
    if(!q)return [];

    return diseaseCultureOptions()
      .map(value=>{
        const normalized=normalizeSearchText(value);
        let score=3;
        if(normalized===q)score=0;
        else if(normalized.startsWith(q))score=1;
        else if(normalized.includes(q))score=2;
        return {value,normalized,score};
      })
      .filter(item=>item.normalized.includes(q))
      .sort((a,b)=>
        a.score-b.score ||
        a.value.localeCompare(b.value,'ru',{sensitivity:'base'})
      )
      .slice(0,7)
      .map(item=>item.value);
  }

  function diseaseMatchesCulture(item,query){
    const q=normalizeSearchText(query);
    if(!q)return true;

    return diseaseCultureRawValues(item).some(value=>{
      const normalized=normalizeSearchText(value);
      return normalized.includes(q) || q.includes(normalized);
    });
  }

  function diseaseCultureFilterMarkup(){
    if(state.category!=='diseases')return '';

    const query=String(state.diseaseCultureQuery||'');
    const suggestions=diseaseCultureSuggestions(query);
    const allCultures=diseaseCultureOptions();

    let suggestionMarkup='';
    if(query.trim()){
      if(suggestions.length){
        suggestionMarkup=`
          <div class="arh-cultureSuggestions" role="listbox" aria-label="Подходящие культуры">
            ${suggestions.map(value=>`
              <button class="arh-cultureSuggestion"
                      type="button"
                      role="option"
                      data-arh-culture-value="${esc(value)}">
                ${esc(value)}
              </button>
            `).join('')}
          </div>
        `;
      }else if(allCultures.length){
        suggestionMarkup=`
          <div class="arh-cultureSuggestions">
            <div class="arh-cultureNoSuggestions">
              В базе пока нет культуры с таким названием.
            </div>
          </div>
        `;
      }
    }

    return `
      <div class="arh-cultureFilter" data-arh-culture-filter>
        <div class="arh-cultureFilterLabel">Культура</div>
        <div class="arh-cultureInputWrap">
          <span class="arh-cultureSearchIcon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="6.5"></circle>
              <path d="m16 16 4 4"></path>
            </svg>
          </span>

          <input class="arh-cultureInput"
                 id="arhDiseaseCultureInput"
                 type="search"
                 autocomplete="off"
                 spellcheck="false"
                 value="${esc(query)}"
                 placeholder="Введите культуру, например: пшеница"
                 aria-label="Фильтр болезней по культуре"
                 aria-autocomplete="list">

          ${query?`
            <button class="arh-cultureClear"
                    type="button"
                    data-arh-culture-clear
                    aria-label="Очистить фильтр по культуре">×</button>
          `:''}
        </div>

        ${suggestionMarkup}

        <div class="arh-cultureHint">
          Начните вводить название — список болезней отфильтруется автоматически.
        </div>
      </div>
    `;
  }

  function syncCategoryFilters(){
    if(!filterWrap)return [];

    const hasCultureSearch=state.category==='diseases';
    const rawConfigs=normalizeFilterConfigs(state.category);

    const resolved=rawConfigs.map(config=>({
      ...config,
      options:resolveFilterOptions(
        state.category,
        config,
        rawConfigs
      )
    }));

    resolved.forEach(config=>{
      const allowed=new Set(config.options.map(option=>String(option.value)));
      const clean=activeFilterValues(state.category,config.id)
        .filter(value=>allowed.has(value));

      setActiveFilterValues(state.category,config.id,clean);
    });

    const visible=resolved.filter(config=>
      config.options.length &&
      filterConditionMatches(
        state.category,
        config.showWhen,
        resolved
      )
    );

    resolved.forEach(config=>{
      if(!visible.includes(config)){
        setActiveFilterValues(state.category,config.id,[]);
      }
    });

    if(!visible.length && !hasCultureSearch){
      filterWrap.style.display='none';
      filterWrap.innerHTML='';
      return [];
    }

    filterWrap.style.display='block';

    const cultureMarkup=hasCultureSearch
      ?diseaseCultureFilterMarkup()
      :'';

    const genericMarkup=visible.map(config=>{
      const active=activeFilterValues(state.category,config.id);
      const selected=new Set(active);

      if(isToggleFilter(config)){
        const option=config.options[0];
        const pressed=selected.has(String(option.value));

        return `<div class="arh-filterGroup arh-filterGroup--toggle"
                     data-arh-filter-group="${esc(config.id)}">
          ${config.hideLabel===true?'':`
            <div class="arh-filterLabel">${esc(config.groupLabel||'')}</div>
          `}
          <div class="arh-filterRail">
            <button class="arh-filter arh-filter--toggle ${pressed?'active':''}"
                    type="button"
                    aria-pressed="${pressed?'true':'false'}"
                    data-arh-filter-id="${esc(config.id)}"
                    data-arh-filter-value="${esc(option.value)}"
                    data-arh-filter-kind="toggle">
              ${esc(option.label)}
            </button>
          </div>
        </div>`;
      }

      return `<div class="arh-filterGroup"
                   data-arh-filter-group="${esc(config.id)}">
        <div class="arh-filterLabel">${esc(config.label||'Фильтр')}</div>
        <div class="arh-filterRail">
          <button class="arh-filter ${active.length===0?'active':''}"
                  type="button"
                  aria-pressed="${active.length===0?'true':'false'}"
                  data-arh-filter-id="${esc(config.id)}"
                  data-arh-filter-value="all">
            ${esc(config.allLabel||'Все')}
          </button>

          ${config.options.map(option=>{
            const pressed=selected.has(String(option.value));
            return `
              <button class="arh-filter ${pressed?'active':''}"
                      type="button"
                      aria-pressed="${pressed?'true':'false'}"
                      data-arh-filter-id="${esc(config.id)}"
                      data-arh-filter-value="${esc(option.value)}">
                ${esc(option.label)}
              </button>
            `;
          }).join('')}
        </div>
      </div>`;
    }).join('');

    filterWrap.innerHTML=cultureMarkup+genericMarkup;

    return visible;
  }

  function applyCategoryFilters(list,configs){
    return list.filter(item=>configs.every(config=>{
      const selected=activeFilterValues(state.category,config.id);
      if(!selected.length)return true;

      /*
        Условный дочерний фильтр (например Macro/Micro внутри
        "Дефицита") ограничивает только записи родительской ветки.
        Поэтому при мультивыборе "Азотные + Дефицит" выбор
        "Микроэлементы" не скрывает азотные удобрения.
      */
      if(
        config.showWhen &&
        !itemMatchesShowWhen(item,config.showWhen,configs)
      ){
        return true;
      }

      const values=itemFilterValues(item,config);

      if(config.match==='all'){
        return selected.every(value=>values.includes(String(value)));
      }

      return selected.some(value=>values.includes(String(value)));
    }));
  }

  function renderCategory(){
    syncDynamicCategories();
    const filterConfigs=syncCategoryFilters();

    const meta=getCategoryMeta(state.category);
    sectionEyebrow.textContent=meta.label;
    sectionTitle.textContent=meta.title;

    root.querySelectorAll('.arh-cat').forEach(btn=>{
      btn.classList.toggle('active',btn.dataset.category===state.category);
    });

    let list=items().filter(x=>x.category===state.category);

    if(filterConfigs.length){
      list=applyCategoryFilters(list,filterConfigs);
    }

    if(
      state.category==='diseases' &&
      String(state.diseaseCultureQuery||'').trim()
    ){
      list=list.filter(item=>
        diseaseMatchesCulture(item,state.diseaseCultureQuery)
      );
    }

    /* Всегда показываем перечень по алфавиту.
       localeCompare с локалью ru корректно сортирует кириллицу. */
    list.sort((a,b)=>String(a.title||'').localeCompare(
      String(b.title||''),
      'ru',
      {sensitivity:'base',numeric:true}
    ));

    total.textContent=list.length?`${list.length} материал${plural(list.length)}`:'';

    if(!list.length){
      if(
        state.category==='diseases' &&
        String(state.diseaseCultureQuery||'').trim()
      ){
        results.innerHTML=`
          <div class="arh-empty">
            <div class="arh-emptyIcon">⌕</div>
            <b>Для этой культуры пока ничего не найдено</b>
            <p>
              Проверьте написание или попробуйте другое название культуры.
            </p>
          </div>
        `;
      }else{
        results.innerHTML=emptyCategory(state.category);
      }
    }else{
      results.innerHTML=groupedCards(list);
    }

    bindCardLinks();
  }

  function plural(n){
    const n10=n%10,n100=n%100;
    if(n10===1 && n100!==11)return '';
    if(n10>=2 && n10<=4 && !(n100>=12&&n100<=14))return 'а';
    return 'ов';
  }

  function renderSearch(){
    const q=state.query.trim();

    if(!q){
      globalView.hidden=true;
      categoryView.hidden=false;
      searchCount.textContent='';
      searchCount.classList.remove('is-suggestion');
      renderCategory();
      return;
    }

    categoryView.hidden=true;
    globalView.hidden=false;

    const scored=searchReference(q);
    const suggestion=fuzzySuggestion(scored,q);
    const count=scored.length;

    globalTotal.textContent=count
      ?`${count} найдено`
      :'0 найдено';

    searchCount.textContent=suggestion
      ?`Возможно, вы искали: ${suggestion}`
      :`${count} результат${count===1?'':'ов'}`;

    searchCount.classList.toggle('is-suggestion',Boolean(suggestion));

    globalResults.innerHTML=count
      ?groupedSearchCards(scored)
      :emptySearch();

    bindCardLinks();
  }

  function arr(v){
    if(Array.isArray(v))return v.filter(Boolean);
    return v?[v]:[];
  }

  function linkedActives(hrac){
    return items()
      .filter(x=>x.category==='pesticides'&&x.type==='herbicide'&&String(x.hrac)===String(hrac))
      .map(x=>x.title);
  }

  function ensureModal(){
    let wrap=document.getElementById('arhDetailPortal');
    if(!wrap){
      wrap=document.createElement('div');
      wrap.id='arhDetailPortal';
      wrap.setAttribute('aria-hidden','true');
      wrap.innerHTML='<div class="arh-modal" id="arhDetailPortalBox" role="dialog" aria-modal="true" aria-label="Подробная информация"></div>';
      document.body.appendChild(wrap);
    }
    return {
      wrap,
      box:wrap.querySelector('#arhDetailPortalBox')
    };
  }

  function classificationPairs(item){
    const pairs=[];

    if(item.classification){
      if(Array.isArray(item.classification)){
        item.classification.forEach(c=>{
          if(c&&c.system&&c.code)pairs.push({system:c.system,code:c.code});
        });
      }else if(typeof item.classification==='object' &&
               item.classification.system && item.classification.code){
        pairs.push({system:item.classification.system,code:item.classification.code});
      }
    }

    [['HRAC','hrac'],['FRAC','frac'],['IRAC','irac'],['RAC','rac']]
      .forEach(([system,key])=>{
        if(item[key]!==undefined&&item[key]!==null&&String(item[key]).trim()){
          if(!pairs.some(x=>
            String(x.system).toUpperCase()===system &&
            String(x.code)===String(item[key])
          )){
            pairs.push({system,code:item[key]});
          }
        }
      });

    if(item.classificationSystem&&item.classificationCode){
      pairs.push({system:item.classificationSystem,code:item.classificationCode});
    }

    return pairs;
  }

  function sameClassification(a,b){
    const aa=classificationPairs(a);
    const bb=classificationPairs(b);
    return aa.some(x=>bb.some(y=>
      String(x.system).toUpperCase()===String(y.system).toUpperCase() &&
      String(x.code)===String(y.code)
    ));
  }

  function findRelatedMechanism(item){
    return items().find(x=>
      x.category==='mechanisms' &&
      (!item.type||!x.type||x.type===item.type) &&
      sameClassification(item,x)
    );
  }

  function relatedPesticides(item){
    return items()
      .filter(x=>
        x.category==='pesticides' &&
        (!item.type||!x.type||x.type===item.type) &&
        sameClassification(item,x)
      )
      .map(x=>x.title)
      .filter(Boolean);
  }

  function valueText(value){
    if(value===null||value===undefined||value==='')return '';
    if(Array.isArray(value))return value.map(valueText).filter(Boolean).join(', ');
    if(typeof value==='object'){
      return Object.entries(value)
        .map(([k,v])=>`${humanize(k)}: ${valueText(v)}`)
        .filter(Boolean)
        .join('; ');
    }
    return String(value);
  }

  function sentence(value){
    const text=valueText(value).trim();
    if(!text)return '';
    return /[.!?…]$/.test(text) ? text : text+'.';
  }

  function uniqueTexts(values){
    const out=[];
    values.flat().forEach(value=>{
      const text=valueText(value).trim();
      if(text && !out.some(x=>x.toLowerCase()===text.toLowerCase())){
        out.push(text);
      }
    });
    return out;
  }

  function passportItem(label,value){
    const text=valueText(value).trim();
    if(!text)return '';
    return `<div class="arh-passportItem">
      <b>${esc(label)}</b>
      <span>${esc(text)}</span>
    </div>`;
  }

  function pesticideActionText(item){
    if(!item || item.category!=='pesticides')return '';

    const type=String(item.type||'').toLowerCase();
    let candidates=[];

    /*
      В нашей базе разные группы исторически используют разные поля:
      - гербициды: uptake = "системное", "контактное", "почвенное" и т.д.;
      - фунгициды: action = "системное", "локально-системное", "контактное";
      - инсектициды/акарициды: uptake лучше описывает контактное,
        кишечное, системное, трансламинарное действие;
      - родентициды: action лучше отражает кишечное/антикоагулянтное
        или иное токсическое действие.

      Поэтому UI сам выбирает наиболее полезное поле, а JSON менять не нужно.
    */
    if(type==='herbicide'){
      candidates=[item.actionType,item.uptake,item.action,item.absorb];
    }else if(type==='fungicide'){
      const action=valueText(item.action).trim();
      const genericAction=/^(зависит|варьирует|определяется)/i.test(action);
      candidates=genericAction
        ?[item.actionType,item.uptake,item.action,item.absorb]
        :[item.actionType,item.action,item.uptake,item.absorb];
    }else if(type==='insecticide' || type==='acaricide'){
      candidates=[item.actionType,item.uptake,item.action,item.absorb];
    }else if(type==='rodenticide'){
      candidates=[item.actionType,item.action,item.uptake];
    }else{
      candidates=[item.actionType,item.action,item.uptake,item.absorb];
    }

    for(const value of candidates){
      const text=valueText(value).trim();
      if(text)return text;
    }

    return '';
  }

  function workSpectrumFact(item){
    const crops=valueText(item.crops).trim();
    const spectrum=valueText(item.spectrum).trim();

    if(!crops && !spectrum)return '';

    let leftLabel='Контекст применения';
    let rightLabel='Целевые объекты';

    if(item.type==='herbicide'){
      leftLabel='Культуры применения';
      rightLabel='Целевые сорняки';
    }else if(item.type==='fungicide'){
      leftLabel='Культуры применения';
      rightLabel='Болезни / патогены';
    }else if(item.type==='insecticide'){
      leftLabel='Культуры применения';
      rightLabel='Целевые вредители';
    }else if(item.type==='acaricide'){
      leftLabel='Культуры применения';
      rightLabel='Целевые клещи';
    }

    return `<div class="arh-passportItem arh-spectrumFact">
      <b>Спектр работы</b>
      <div class="arh-spectrumGrid">
        ${crops?`<div class="arh-spectrumCol">
          <small>${esc(leftLabel)}</small>
          <span>${esc(crops)}</span>
        </div>`:''}
        ${spectrum?`<div class="arh-spectrumCol">
          <small>${esc(rightLabel)}</small>
          <span>${esc(spectrum)}</span>
        </div>`:''}
      </div>
    </div>`;
  }

  function classText(item){
    return classificationPairs(item)
      .map(c=>`${c.system} ${c.code}`)
      .join(' · ');
  }

  function classificationExplanation(item){
    const pairs=classificationPairs(item);
    if(!pairs.length)return '';

    const pair=pairs[0];
    const system=String(pair.system||'').toUpperCase();
    const code=pair.code;

    if(system==='HRAC'){
      return `Код HRAC ${code} показывает, к какому механизму действия относится гербицид. Он особенно важен при построении ротации действующих веществ и управлении устойчивостью сорняков.`;
    }
    if(system==='FRAC'){
      return `Код FRAC ${code} объединяет фунгициды по механизму действия и используется прежде всего для управления риском резистентности возбудителей болезней.`;
    }
    if(system==='IRAC'){
      return `Код IRAC ${code} показывает механизм действия инсектицида и помогает чередовать препараты так, чтобы не создавать постоянное давление на одну и ту же мишень у вредителя.`;
    }
    return `${system} ${code} — классификационный код механизма действия, полезный для сопоставления веществ и построения антирезистентной ротации.`;
  }

  function pesticideTypeIntro(item){
    const type=item.type;

    if(type==='herbicide'){
      return `${item.title} относится к гербицидам. Для такого действующего вещества важно понимать не только перечень чувствительных сорняков, но и механизм действия, перемещение в растении и место в ротации гербицидов.`;
    }
    if(type==='fungicide'){
      return `${item.title} относится к фунгицидам. Его практическую ценность определяют чувствительность возбудителя, момент применения, способность вещества проникать в ткани и риск формирования устойчивости.`;
    }
    if(type==='insecticide'){
      return `${item.title} относится к инсектицидам. При оценке такого вещества важно учитывать стадию вредителя, путь поступления действующего вещества, скорость прекращения питания и принадлежность к конкретной IRAC-группе.`;
    }
    return `${item.title} относится к средствам защиты растений. Для практического применения важны механизм действия, спектр активности и условия, при которых действующее вещество реализует свой потенциал.`;
  }

  function pesticideArticle(item,relatedMechanism){
    const paragraphs=[];

    if(item.description){
      paragraphs.push(sentence(item.description));
    }else if(item.simple){
      paragraphs.push(sentence(item.simple));
    }else if(item.lead){
      paragraphs.push(sentence(item.lead));
    }

    const spectrum=valueText(item.spectrum);
    const crops=valueText(item.crops);
    const objectParts=[];
    if(spectrum)objectParts.push(`Основные чувствительные объекты: ${sentence(spectrum)}`);
    if(crops)objectParts.push(`Культуры и направления применения, указанные в справочнике: ${sentence(crops)}`);
    if(objectParts.length){
      objectParts.push('Точный регламент — культуры, нормы, фазы применения, кратность, сроки ожидания и ограничения — проверяют для конкретного зарегистрированного препарата.');
      paragraphs.push(objectParts.join(' '));
    }

    const practice=uniqueTexts([item.strength,item.feature,item.limits]);
    if(practice.length){
      paragraphs.push(practice.map(sentence).join(' '));
    }

    if(item.resistance){
      paragraphs.push(`Резистентность. ${sentence(item.resistance)}`);
    }

    const extra=[];
    if(item.article)extra.push(...(Array.isArray(item.article)?item.article:[item.article]));
    if(Array.isArray(item.paragraphs))extra.push(...item.paragraphs);
    extra.filter(Boolean).forEach(p=>paragraphs.push(p));

    return uniqueTexts(paragraphs.filter(Boolean));
  }
  function mechanismArticle(item){
    const paragraphs=[];

    const cls=classText(item);
    if(cls){
      paragraphs.push(`${item.title}. ${cls}.`);
    }else{
      paragraphs.push(`${item.title}.`);
    }

    if(item.description){
      paragraphs.push(sentence(item.description));
    }else if(item.simple){
      paragraphs.push(sentence(item.simple));
    }

    if(item.chain){
      paragraphs.push(sentence(item.chain));
    }

    const practical=[];
    if(item.symptoms)practical.push(`Характерный эффект: ${sentence(item.symptoms)}`);
    if(item.where)practical.push(sentence(item.where));
    if(practical.length){
      paragraphs.push(practical.join(' '));
    }

    if(item.resistance){
      paragraphs.push(`Резистентность. ${sentence(item.resistance)}`);
    }

    const extra=[];
    if(item.article)extra.push(...(Array.isArray(item.article)?item.article:[item.article]));
    if(Array.isArray(item.paragraphs))extra.push(...item.paragraphs);
    extra.filter(Boolean).forEach(p=>paragraphs.push(p));

    return uniqueTexts(paragraphs.filter(Boolean));
  }
  function firstField(item,keys){
    for(const key of keys){
      if(item[key]===undefined||item[key]===null||item[key]==='')continue;
      const text=valueText(item[key]).trim();
      if(text)return text;
    }
    return '';
  }

  function pushArticleParagraph(paragraphs,text){
    const clean=String(text||'').trim();
    if(!clean)return;

    const normalized=normalizeSearchText(clean);
    const exists=paragraphs.some(p=>normalizeSearchText(p)===normalized);
    if(!exists)paragraphs.push(clean);
  }

  function appendArticleExtras(paragraphs,item){
    if(item.article){
      const extra=Array.isArray(item.article)?item.article:[item.article];
      extra.forEach(p=>pushArticleParagraph(paragraphs,p));
    }

    if(Array.isArray(item.paragraphs)){
      item.paragraphs.forEach(p=>pushArticleParagraph(paragraphs,p));
    }
  }

  /* -------------------------
     БОЛЕЗНИ
     ------------------------- */
  function diseaseArticle(item){
    const paragraphs=[];

    pushArticleParagraph(
      paragraphs,
      item.description||item.simple||item.lead
    );

    const firstSymptoms=firstField(item,[
      'firstSymptoms','earlySymptoms'
    ]);
    const diagnosticSigns=firstField(item,[
      'diagnosticSigns','symptoms','signs','diagnostics','diagnosis'
    ]);
    const infectionSources=firstField(item,[
      'infectionSources','primaryInoculum','sourcesOfInfection'
    ]);
    const development=firstField(item,[
      'development','biology','pathogenBiology','lifecycle','lifeCycle'
    ]);
    const spread=firstField(item,[
      'spread','infection','infectionCycle','epidemiology'
    ]);
    const conditions=firstField(item,[
      'favorableConditions','conditions','riskConditions','weather'
    ]);
    const riskPeriod=firstField(item,[
      'riskPeriod','criticalPeriod','period'
    ]);
    const damage=firstField(item,[
      'damage','harmfulness','yieldLoss'
    ]);
    const differential=firstField(item,[
      'differentialDiagnosis','differential','confusedWith'
    ]);

    if(firstSymptoms || diagnosticSigns){
      const diagnosisParts=[];
      if(firstSymptoms)diagnosisParts.push(`Первые признаки: ${sentence(firstSymptoms)}`);
      if(diagnosticSigns)diagnosisParts.push(`Характерные признаки: ${sentence(diagnosticSigns)}`);
      pushArticleParagraph(
        paragraphs,
        `Как распознать. ${diagnosisParts.join(' ')}`
      );
    }

    if(infectionSources || development || spread){
      const cycleParts=[];
      if(infectionSources)cycleParts.push(`Источники инфекции — ${sentence(infectionSources)}`);
      if(development)cycleParts.push(sentence(development));
      if(spread)cycleParts.push(`Распространение: ${sentence(spread)}`);
      pushArticleParagraph(
        paragraphs,
        `Как развивается. ${cycleParts.join(' ')}`
      );
    }

    if(conditions || riskPeriod){
      const riskParts=[];
      if(conditions)riskParts.push(`Благоприятные условия — ${sentence(conditions)}`);
      if(riskPeriod)riskParts.push(`Период наибольшего риска — ${sentence(riskPeriod)}`);
      pushArticleParagraph(
        paragraphs,
        `Когда ждать развития. ${riskParts.join(' ')}`
      );
    }

    if(damage){
      pushArticleParagraph(
        paragraphs,
        `Чем опасна. ${sentence(damage)}`
      );
    }

    if(differential){
      pushArticleParagraph(
        paragraphs,
        `Как отличить от похожих болезней. ${sentence(differential)}`
      );
    }

    const management=arr(item.managementPrinciples);
    const chemical=firstField(item,[
      'chemicalProtection','control','management','prevention','protection'
    ]);

    if(management.length || chemical){
      const controlParts=[];
      if(management.length){
        controlParts.push(`Основные меры: ${management.map(valueText).filter(Boolean).join('; ')}.`);
      }
      if(chemical)controlParts.push(sentence(chemical));
      pushArticleParagraph(
        paragraphs,
        `Контроль. ${controlParts.join(' ')}`
      );
    }

    appendArticleExtras(paragraphs,item);
    return paragraphs;
  }

  /* -------------------------
     ВРЕДИТЕЛИ
     ------------------------- */
  function pestArticle(item){
    const paragraphs=[];

    pushArticleParagraph(
      paragraphs,
      item.description||item.simple||item.lead
    );

    const biology=firstField(item,[
      'biology','lifecycle','lifeCycle','development'
    ]);
    const overwintering=firstField(item,[
      'overwintering','wintering'
    ]);
    const generations=firstField(item,[
      'generations','generationCount'
    ]);
    const damage=firstField(item,[
      'damage','harmfulness','feedingDamage'
    ]);
    const conditions=firstField(item,[
      'conditions','favorableConditions','riskConditions','weather'
    ]);
    const monitoring=firstField(item,[
      'monitoring','diagnostics','scouting'
    ]);
    const threshold=firstField(item,[
      'threshold','economicThreshold','et'
    ]);
    const control=firstField(item,[
      'control','management','protection'
    ]);

    if(biology){
      pushArticleParagraph(
        paragraphs,
        `Биология и жизненный цикл. ${sentence(biology)}`
      );
    }

    if(overwintering){
      pushArticleParagraph(
        paragraphs,
        `Перезимовка. ${sentence(overwintering)}`
      );
    }

    if(generations){
      pushArticleParagraph(
        paragraphs,
        `Число поколений. ${sentence(generations)}`
      );
    }

    if(damage){
      pushArticleParagraph(
        paragraphs,
        `Характер повреждения и вредоносность. ${sentence(damage)}`
      );
    }

    if(conditions){
      pushArticleParagraph(
        paragraphs,
        `Условия массового развития. ${sentence(conditions)}`
      );
    }

    if(monitoring){
      pushArticleParagraph(
        paragraphs,
        `Мониторинг. ${sentence(monitoring)}`
      );
    }

    if(threshold){
      pushArticleParagraph(
        paragraphs,
        `Порог принятия решения. ${sentence(threshold)}`
      );
    }

    if(control){
      pushArticleParagraph(
        paragraphs,
        `Меры контроля. ${sentence(control)}`
      );
    }

    appendArticleExtras(paragraphs,item);
    return paragraphs;
  }

  /* -------------------------
     СОРНЫЕ РАСТЕНИЯ
     ------------------------- */
  function weedArticle(item){
    const paragraphs=[];

    pushArticleParagraph(
      paragraphs,
      item.description||item.simple||item.lead
    );

    const biology=firstField(item,[
      'biology','development','growth'
    ]);
    const lifecycle=firstField(item,[
      'lifeCycle','lifecycle','lifecycleType'
    ]);
    const reproduction=firstField(item,[
      'reproduction','propagation'
    ]);
    const emergence=firstField(item,[
      'emergence','emergencePeriod','germination'
    ]);
    const seedBank=firstField(item,[
      'seedLongevity','seedBank','seedPersistence'
    ]);
    const depth=firstField(item,[
      'emergenceDepth','germinationDepth'
    ]);
    const harmfulness=firstField(item,[
      'harmfulness','damage','competition'
    ]);
    const control=firstField(item,[
      'control','management'
    ]);

    if(biology){
      pushArticleParagraph(
        paragraphs,
        `Биология. ${sentence(biology)}`
      );
    }

    if(lifecycle){
      pushArticleParagraph(
        paragraphs,
        `Жизненный цикл. ${sentence(lifecycle)}`
      );
    }

    if(reproduction){
      pushArticleParagraph(
        paragraphs,
        `Размножение. ${sentence(reproduction)}`
      );
    }

    if(emergence){
      pushArticleParagraph(
        paragraphs,
        `Появление всходов. ${sentence(emergence)}`
      );
    }

    if(seedBank){
      pushArticleParagraph(
        paragraphs,
        `Семенной банк. ${sentence(seedBank)}`
      );
    }

    if(depth){
      pushArticleParagraph(
        paragraphs,
        `Глубина прорастания. ${sentence(depth)}`
      );
    }

    if(harmfulness){
      pushArticleParagraph(
        paragraphs,
        `Вредоносность. ${sentence(harmfulness)}`
      );
    }

    if(control){
      pushArticleParagraph(
        paragraphs,
        `Контроль. ${sentence(control)}`
      );
    }

    appendArticleExtras(paragraphs,item);
    return paragraphs;
  }

  /* -------------------------
     КУЛЬТУРЫ
     ------------------------- */
  function cropArticle(item){
    const paragraphs=[];

    pushArticleParagraph(
      paragraphs,
      item.description||item.simple||item.lead
    );

    const biology=firstField(item,[
      'biology','botany','morphology'
    ]);
    const vegetation=firstField(item,[
      'vegetation','vegetationPeriod','duration'
    ]);
    const temperature=firstField(item,[
      'temperature','temperatureRequirements','thermal'
    ]);
    const moisture=firstField(item,[
      'moisture','water','waterRequirements'
    ]);
    const soil=firstField(item,[
      'soil','soilRequirements','ph'
    ]);
    const sowing=firstField(item,[
      'sowing','planting','seeding'
    ]);
    const nutrition=firstField(item,[
      'nutrition','fertilization','nutrientRequirements'
    ]);
    const predecessors=firstField(item,[
      'predecessors','rotation','cropRotation'
    ]);
    const harvest=firstField(item,[
      'harvest','harvesting'
    ]);

    if(biology){
      pushArticleParagraph(
        paragraphs,
        `Биологические особенности. ${sentence(biology)}`
      );
    }

    if(vegetation){
      pushArticleParagraph(
        paragraphs,
        `Продолжительность вегетации. ${sentence(vegetation)}`
      );
    }

    if(temperature){
      pushArticleParagraph(
        paragraphs,
        `Температурные требования. ${sentence(temperature)}`
      );
    }

    if(moisture){
      pushArticleParagraph(
        paragraphs,
        `Требования к влаге. ${sentence(moisture)}`
      );
    }

    if(soil){
      pushArticleParagraph(
        paragraphs,
        `Требования к почве. ${sentence(soil)}`
      );
    }

    if(sowing){
      pushArticleParagraph(
        paragraphs,
        `Посев и размещение. ${sentence(sowing)}`
      );
    }

    if(nutrition){
      pushArticleParagraph(
        paragraphs,
        `Питание. ${sentence(nutrition)}`
      );
    }

    if(predecessors){
      pushArticleParagraph(
        paragraphs,
        `Место в севообороте. ${sentence(predecessors)}`
      );
    }

    if(harvest){
      pushArticleParagraph(
        paragraphs,
        `Уборка. ${sentence(harvest)}`
      );
    }

    appendArticleExtras(paragraphs,item);
    return paragraphs;
  }

  /* -------------------------
     ПИТАНИЕ РАСТЕНИЙ
     ------------------------- */
  function nutritionArticle(item){
    const paragraphs=[];

    pushArticleParagraph(
      paragraphs,
      item.description||item.simple||item.lead
    );

    const behavior=firstField(item,[
      'soilBehavior','behaviorInSoil','behavior'
    ]);
    const application=firstField(item,[
      'application','use'
    ]);
    const conditions=firstField(item,[
      'conditions','bestConditions'
    ]);
    const losses=firstField(item,[
      'losses','lossRisk'
    ]);
    const physical=uniqueTexts([
      item.physicalForm ? `Форма продукта: ${sentence(item.physicalForm)}` : '',
      item.solubility ? `Растворимость: ${sentence(item.solubility)}` : '',
      item.wettability ? `Смачиваемость: ${sentence(item.wettability)}` : '',
      item.hygroscopicity ? `Гигроскопичность: ${sentence(item.hygroscopicity)}` : '',
      item.caking ? `Слеживаемость: ${sentence(item.caking)}` : '',
      item.flowability ? `Сыпучесть: ${sentence(item.flowability)}` : '',
      item.spreadability ? `Рассеиваемость: ${sentence(item.spreadability)}` : '',
      item.runoff ? `Стекание / поведение капли: ${sentence(item.runoff)}` : '',
      item.density ? `Плотность: ${sentence(item.density)}` : ''
    ]);

    if(behavior){
      pushArticleParagraph(
        paragraphs,
        `Поведение в почве. ${sentence(behavior)}`
      );
    }

    if(application){
      pushArticleParagraph(
        paragraphs,
        `Применение. ${sentence(application)}`
      );
    }

    if(conditions){
      pushArticleParagraph(
        paragraphs,
        `Условия эффективной работы. ${sentence(conditions)}`
      );
    }

    if(losses){
      pushArticleParagraph(
        paragraphs,
        `Основные пути потерь. ${sentence(losses)}`
      );
    }

    if(physical.length){
      pushArticleParagraph(
        paragraphs,
        `Физические свойства. ${physical.join(' ')}`
      );
    }

    if(item.compatibility){
      pushArticleParagraph(
        paragraphs,
        `Совместимость. ${sentence(item.compatibility)}`
      );
    }

    if(item.storage){
      pushArticleParagraph(
        paragraphs,
        `Хранение. ${sentence(item.storage)}`
      );
    }

    appendArticleExtras(paragraphs,item);
    return paragraphs;
  }

  function categoryArticle(item){
    if(item.category==='diseases')return diseaseArticle(item);
    if(item.category==='pests')return pestArticle(item);
    if(item.category==='weeds')return weedArticle(item);
    if(item.category==='crops')return cropArticle(item);
    if(item.category==='nutrition')return nutritionArticle(item);
    return genericArticle(item);
  }

  function categoryFacts(item){
    const facts=[];

    if(item.category==='diseases'){
      const pathogen=firstField(item,['latin','pathogen','pathogenName','causalAgent']);
      const crops=firstField(item,['crops','hosts','hostPlants']);
      const organs=firstField(item,['organs','affectedOrgans','plantParts']);

      if(pathogen)facts.push(passportItem('Возбудитель',pathogen));
      if(crops)facts.push(passportItem('Поражаемые культуры',crops));
      if(organs)facts.push(passportItem('Поражаемые органы',organs));
    }

    if(item.category==='pests'){
      const taxonomy=uniqueTexts([
        firstField(item,['order']),
        firstField(item,['family'])
      ]).join(' · ');
      const stage=firstField(item,['harmfulStage','damagingStage','stage']);
      const crops=firstField(item,['crops','hosts','hostPlants']);

      if(taxonomy)facts.push(passportItem('Систематика',taxonomy));
      if(stage)facts.push(passportItem('Вредящая стадия',stage));
      if(crops)facts.push(passportItem('Культуры / хозяева',crops));
    }

    if(item.category==='weeds'){
      const family=firstField(item,['family']);
      const lifecycle=firstField(item,['lifeCycle','lifecycle','lifecycleType']);
      const reproduction=firstField(item,['reproduction','propagation']);

      if(family)facts.push(passportItem('Семейство',family));
      if(lifecycle)facts.push(passportItem('Жизненный цикл',lifecycle));
      if(reproduction)facts.push(passportItem('Размножение',reproduction));
    }

    if(item.category==='crops'){
      const family=firstField(item,['family']);
      const group=firstField(item,['cropGroup','group','useGroup']);
      const vegetation=firstField(item,['vegetation','vegetationPeriod','duration']);

      if(family)facts.push(passportItem('Семейство',family));
      if(group)facts.push(passportItem('Группа культуры',group));
      if(vegetation)facts.push(passportItem('Период вегетации',vegetation));
    }

    if(item.category==='nutrition'){
      const content=firstField(item,['nutrientContent','content']);
      const forms=firstField(item,['nitrogenForms','nutrientForms','forms']);
      const reaction=firstField(item,['soilReactionShort','soilReaction','reaction']);

      if(content)facts.push(passportItem('Содержание элементов',content));
      if(forms)facts.push(passportItem('Формы питания',forms));
      if(reaction)facts.push(passportItem('Реакция почвенного раствора',reaction));
    }

    return facts.filter(Boolean).slice(0,3);
  }

  function wideFact(title,leftLabel,leftValue,rightLabel,rightValue){
    const left=valueText(leftValue).trim();
    const right=valueText(rightValue).trim();

    if(!left&&!right)return '';

    return `<div class="arh-passportItem arh-spectrumFact">
      <b>${esc(title)}</b>
      <div class="arh-spectrumGrid">
        ${left?`<div class="arh-spectrumCol">
          <small>${esc(leftLabel)}</small>
          <span>${esc(left)}</span>
        </div>`:''}
        ${right?`<div class="arh-spectrumCol">
          <small>${esc(rightLabel)}</small>
          <span>${esc(right)}</span>
        </div>`:''}
      </div>
    </div>`;
  }

  function categoryWideFact(item){
    if(item.category==='diseases'){
      return wideFact(
        'Диагностика и риск',
        'Характерный признак',
        firstField(item,['diagnosticSigns','firstSymptoms','symptoms','diagnostics','diagnosis','signs']),
        'Условия развития',
        firstField(item,['favorableConditions','conditions','riskConditions','weather'])
      );
    }

    if(item.category==='pests'){
      return wideFact(
        'Полевая оценка',
        'Характер повреждения',
        firstField(item,['damage','harmfulness','feedingDamage']),
        'Условия / период риска',
        firstField(item,['conditions','favorableConditions','riskConditions','period'])
      );
    }

    if(item.category==='weeds'){
      return wideFact(
        'Полевая биология',
        'Период появления всходов',
        firstField(item,['emergence','emergencePeriod','germination']),
        'Где особенно проблемен',
        firstField(item,['crops','problemCrops','hosts','fields'])
      );
    }

    if(item.category==='crops'){
      return wideFact(
        'Ключевые требования',
        'Температура',
        firstField(item,['temperature','temperatureRequirements','thermal']),
        'Влага',
        firstField(item,['moisture','water','waterRequirements'])
      );
    }

    if(item.category==='nutrition'){
      return wideFact(
        'Применение',
        'Когда лучше вносить',
        firstField(item,['bestTimingShort','bestTiming','timing']),
        'Оптимальные условия',
        firstField(item,['bestConditionsShort','bestConditions','conditions'])
      );
    }

    return '';
  }

  function categoryTakeaway(item){
    if(item.remember)return item.remember;

    if(item.category==='diseases'){
      const symptoms=firstField(item,['symptoms','diagnostics','signs']);
      const conditions=firstField(item,['conditions','favorableConditions']);
      const parts=uniqueTexts([symptoms,conditions]);
      return parts.length?`${item.title}: ${parts.join(' · ')}`:'';
    }

    if(item.category==='pests'){
      const stage=firstField(item,['harmfulStage','damagingStage','stage']);
      const damage=firstField(item,['damage','harmfulness']);
      const parts=uniqueTexts([stage,damage]);
      return parts.length?`${item.title}: ${parts.join(' · ')}`:'';
    }

    if(item.category==='weeds'){
      const lifecycle=firstField(item,['lifeCycle','lifecycle','lifecycleType']);
      const emergence=firstField(item,['emergence','emergencePeriod']);
      const parts=uniqueTexts([lifecycle,emergence]);
      return parts.length?`${item.title}: ${parts.join(' · ')}`:'';
    }

    if(item.category==='crops'){
      const temperature=firstField(item,['temperature','temperatureRequirements']);
      const moisture=firstField(item,['moisture','waterRequirements']);
      const parts=uniqueTexts([temperature,moisture]);
      return parts.length?`${item.title}: ${parts.join(' · ')}`:'';
    }

    if(item.category==='nutrition'){
      const content=firstField(item,['nutrientContent','content']);
      const reaction=firstField(item,['soilReactionShort','soilReaction','reaction']);
      const parts=uniqueTexts([content,reaction]);
      return parts.length?`${item.title}: ${parts.join(' · ')}`:'';
    }

    return '';
  }

  function genericArticle(item){
    const paragraphs=[];

    if(item.description||item.simple||item.lead){
      paragraphs.push(item.description||item.simple||item.lead);
    }

    const ordered=[
      ['biology','Биология объекта'],
      ['lifecycle','Жизненный цикл'],
      ['development','Развитие'],
      ['conditions','Условия развития'],
      ['diagnostics','Диагностика'],
      ['diagnosis','Диагностика'],
      ['damage','Вредоносность'],
      ['harmfulness','Вредоносность'],
      ['control','Меры контроля'],
      ['distribution','Распространение'],
      ['taxonomy','Систематика']
    ];

    ordered.forEach(([key,label])=>{
      if(item[key]){
        paragraphs.push(`${label}. ${sentence(item[key])}`);
      }
    });

    if(item.article){
      paragraphs.push(...(Array.isArray(item.article)?item.article:[item.article]));
    }
    if(Array.isArray(item.paragraphs))paragraphs.push(...item.paragraphs);

    return paragraphs.filter(Boolean);
  }

  function relatedArticle(item){
    if(item.category==='diseases'){
      const links=arr(item.similarDiseases)
        .map(rel=>{
          const id=typeof rel==='string'?rel:rel?.id;
          if(!id)return null;
          const target=items().find(x=>
            x.category==='diseases' &&
            String(x.id)===String(id)
          );
          if(!target)return null;

          return {
            id:target.id,
            title:target.title||target.name||id,
            difference:typeof rel==='object'
              ?String(rel.difference||rel.note||'').trim()
              :''
          };
        })
        .filter(Boolean);

      if(!links.length)return '';

      return `<section class="arh-similarDiseases">
        <h3 class="arh-similarDiseasesTitle">Похожие болезни</h3>
        <p class="arh-similarDiseasesIntro">
          Нажмите на болезнь, чтобы сразу открыть её описание и сравнить признаки.
        </p>
        ${links.map(rel=>`
          <button class="arh-similarDisease"
                  type="button"
                  data-related-disease-id="${esc(rel.id)}">
            <span>
              <span class="arh-similarDiseaseName">${esc(rel.title)}</span>
              ${rel.difference
                ?`<span class="arh-similarDiseaseDifference">${esc(rel.difference)}</span>`
                :''}
            </span>
            <span class="arh-similarDiseaseArrow" aria-hidden="true">→</span>
          </button>
        `).join('')}
      </section>`;
    }

    if(item.category!=='mechanisms')return '';
    const linked=relatedPesticides(item);
    if(!linked.length)return '';

    return `<div class="arh-relatedArticle">
      <b>Действующие вещества этой группы</b>
      <div class="arh-relatedList">
        ${linked.map(name=>`<span>${esc(name)}</span>`).join('')}
      </div>
    </div>`;
  }

  function takeawayText(item){
    if(item.remember)return item.remember;

    if(item.category==='pesticides'){
      const cls=classText(item);
      const key=[];
      if(cls)key.push(cls);
      if(item.target)key.push(valueText(item.target));
      else if(item.moa)key.push(valueText(item.moa));
      if(item.action)key.push(valueText(item.action));

      if(key.length){
        return `${item.title}: ${key.join(' → ')}.`;
      }
    }

    if(item.category==='mechanisms'){
      const key=[];
      if(classText(item))key.push(classText(item));
      if(item.target)key.push(valueText(item.target));
      if(item.process)key.push(valueText(item.process));
      if(key.length)return key.join(' → ')+'.';
    }

    return categoryTakeaway(item);
  }

  function detailModePreference(){
    try{
      const saved=localStorage.getItem('agro-reference-detail-mode');
      return saved==='brief'?'brief':'full';
    }catch(_){
      return 'full';
    }
  }

  function saveDetailMode(mode){
    try{localStorage.setItem('agro-reference-detail-mode',mode)}catch(_){}
  }

  function cleanBriefValue(value){
    const text=valueText(value).replace(/\s+/g,' ').trim();
    return text;
  }

  function briefSummary(item,relatedMechanism){
    if(item.simple)return cleanBriefValue(item.simple);
    if(item.lead)return cleanBriefValue(item.lead);
    if(item.description)return sentence(cleanBriefValue(item.description));
    if(relatedMechanism?.simple)return cleanBriefValue(relatedMechanism.simple);
    return '';
  }

  function pushBriefRow(rows,label,value,wide=false){
    const clean=cleanBriefValue(value);
    if(!clean)return;
    const normalized=normalizeSearchText(clean);
    if(rows.some(row=>normalizeSearchText(row.value)===normalized))return;
    rows.push({label,value:clean,wide});
  }

  function briefRows(item,relatedMechanism){
    const rows=[];

    if(item.category==='pesticides'){
      /* В кратком режиме оставляем только то, что помогает быстро вспомнить ДВ.
         Риск резистентности уже показан отдельной цветной плашкой сверху. */
      pushBriefRow(rows,'Механизм',item.moa || relatedMechanism?.simple || relatedMechanism?.process);
      pushBriefRow(rows,'Мишень',item.target || relatedMechanism?.target);
      pushBriefRow(rows,'Характер действия',pesticideActionText(item));
      pushBriefRow(rows,'Объекты',item.spectrum);
      pushBriefRow(rows,'Ключевой эффект',item.symptoms || item.strength);
      return rows.slice(0,5);
    }

    if(item.category==='mechanisms'){
      pushBriefRow(rows,'Мишень',item.target);
      pushBriefRow(rows,'Процесс',item.process);
      pushBriefRow(rows,'Цепочка',item.chain);
      pushBriefRow(rows,'Эффект',item.symptoms);
      pushBriefRow(rows,'Резистентность',item.resistance);
      return rows.slice(0,5);
    }

    if(item.category==='diseases'){
      pushBriefRow(rows,'Возбудитель',firstField(item,['latin','pathogen','pathogenName','causalAgent']));
      pushBriefRow(rows,'Первые признаки',firstField(item,['firstSymptoms','earlySymptoms']));
      pushBriefRow(rows,'Характерный признак',firstField(item,['diagnosticSigns','symptoms','signs']));
      pushBriefRow(rows,'Условия',firstField(item,['favorableConditions','conditions','riskConditions']));
      pushBriefRow(rows,'Период риска',firstField(item,['riskPeriod','criticalPeriod','period']));
      return rows.slice(0,5);
    }

    /* Для остальных разделов — максимум пять действительно полезных строк. */
    [
      ['Возбудитель',firstField(item,['pathogen','pathogenName','causalAgent','agent'])],
      ['Симптомы',firstField(item,['symptoms','signs','diagnostics','diagnosis'])],
      ['Вредоносность',firstField(item,['damage','harmfulness'])],
      ['Условия',firstField(item,['conditions','developmentConditions'])],
      ['Контроль',firstField(item,['control','management'])],
      ['Содержание',firstField(item,['nutrientContent','content'])],
      ['Применение',firstField(item,['application','use','where','crops'])]
    ].forEach(([label,value])=>pushBriefRow(rows,label,value));

    return rows.slice(0,5);
  }

  function briefHtml(item,relatedMechanism){
    const rows=briefRows(item,relatedMechanism);
    if(!rows.length)return '';

    return `<section class="arh-brief">
      <dl class="arh-briefList">
        ${rows.map(row=>`<div class="arh-briefRow">
          <dt>${esc(row.label)}</dt>
          <dd>${esc(row.value)}</dd>
        </div>`).join('')}
      </dl>
    </section>`;
  }

  function resetModalScroll(wrap,box){
    if(!wrap||!box)return;
    box.scrollTop=0;
    box.scrollLeft=0;
    wrap.scrollTop=0;
    wrap.scrollLeft=0;
    requestAnimationFrame(()=>{
      box.scrollTop=0;
      box.scrollLeft=0;
      wrap.scrollTop=0;
      wrap.scrollLeft=0;
    });
  }

  function openItem(item){
    const modal=ensureModal();
    const wrap=modal.wrap;
    const box=modal.box;
    if(!wrap||!box)return;

    /* Один popup переиспользуется для всех карточек, поэтому предыдущую
       позицию прокрутки нужно сбросить ДО и ПОСЛЕ перерисовки содержимого. */
    resetModalScroll(wrap,box);

    const category=getCategoryMeta(item.category);
    const classifications=classificationPairs(item);
    const relatedMechanism=item.category==='pesticides'
      ?findRelatedMechanism(item)
      :null;

    const typeLabel=(item.category==='pesticides'||item.category==='mechanisms')
      ?getTypeLabel(item)
      :nonCoreTypeLabel(item);

    const classBadges=classifications.map(c=>
      `<span class="arh-badge">${esc(c.system)} ${esc(c.code)}</span>`
    ).join('');
    const riskBadge=resistanceRiskBadge(item,false);

    let paragraphs=[];
    if(item.category==='pesticides'){
      paragraphs=pesticideArticle(item,relatedMechanism);
    }else if(item.category==='mechanisms'){
      paragraphs=mechanismArticle(item);
    }else{
      paragraphs=categoryArticle(item);
    }

    const lead=item.simple || item.lead || item.description || '';

    let facts=[];

    if(item.category==='pesticides'){
      const actionText=pesticideActionText(item);
      if(actionText)facts.push(passportItem('Характер действия',actionText));
      if(item.family)facts.push(passportItem('Химическая группа',item.family));
      if(item.target)facts.push(passportItem('Главная мишень',item.target));
      if(facts.length<3 && item.moa)facts.push(passportItem('Механизм действия',item.moa));
    }else if(item.category==='mechanisms'){
      const classification=classText(item);
      if(classification)facts.push(passportItem('Классификация',classification));
      if(item.family)facts.push(passportItem('Химическая группа',item.family));
      if(item.target)facts.push(passportItem('Главная мишень',item.target));
      else if(item.process)facts.push(passportItem('Нарушаемый процесс',item.process));
    }else{
      facts=categoryFacts(item);
    }

    facts=facts.filter(Boolean);
    const spectrumBlock=item.category==='pesticides'
      ?workSpectrumFact(item)
      :(item.category==='mechanisms'?'':categoryWideFact(item));

    const fullHasContent=Boolean(
      facts.length || spectrumBlock || paragraphs.length || relatedArticle(item)
    );
    const brief=briefHtml(item,relatedMechanism);
    const hasBrief=Boolean(brief);

    /* Если один из режимов фактически пуст, переключатель не показываем. */
    let initialMode=detailModePreference();
    if(initialMode==='brief'&&!hasBrief)initialMode='full';
    if(initialMode==='full'&&!fullHasContent&&hasBrief)initialMode='brief';

    const modeSwitch=(hasBrief&&fullHasContent)
      ?`<div class="arh-viewSwitch" role="tablist" aria-label="Режим описания">
          <button type="button" data-detail-mode="brief" role="tab" aria-selected="${initialMode==='brief'}" class="${initialMode==='brief'?'active':''}">Кратко</button>
          <button type="button" data-detail-mode="full" role="tab" aria-selected="${initialMode==='full'}" class="${initialMode==='full'?'active':''}">Подробно</button>
        </div>`
      :'';

    box.innerHTML=`
      <div class="arh-modalTop">
        <div>
          <div class="arh-modalBadges">
            ${typeLabel?`<span class="arh-badge orange">${esc(typeLabel)}</span>`:''}
            ${classBadges}
            ${riskBadge}
          </div>
          <div class="arh-modalName">${esc(item.title||item.name||'Материал')}</div>
          ${lead?`<div class="arh-modalLead">${esc(lead)}</div>`:''}
          ${modeSwitch}
        </div>
        <button class="arh-modalClose" type="button" aria-label="Закрыть">×</button>
      </div>

      ${hasBrief?`<div class="arh-detailMode" data-detail-panel="brief" ${initialMode==='brief'?'':'hidden'}>
        ${brief}
      </div>`:''}

      ${fullHasContent?`<div class="arh-detailMode" data-detail-panel="full" ${initialMode==='full'?'':'hidden'}>
        ${(facts.length || spectrumBlock)
          ?`<div class="arh-passport">
              ${facts.slice(0,3).join('')}
              ${spectrumBlock||''}
            </div>`
          :''}

        ${paragraphs.length
          ?`<article class="arh-longread">
              ${paragraphs.map(p=>`<p>${esc(sentence(p))}</p>`).join('')}
            </article>`
          :''}

        ${relatedArticle(item)}
      </div>`:''}
    `;

    wrap.classList.add('show');
    wrap.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    resetModalScroll(wrap,box);

    const close=()=>closeModal();
    const closeButton=box.querySelector('.arh-modalClose');
    if(closeButton)closeButton.onclick=close;
    wrap.onclick=e=>{if(e.target===wrap)close()};

    box.querySelectorAll('[data-detail-mode]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const mode=btn.dataset.detailMode;
        if(mode!=='brief'&&mode!=='full')return;

        box.querySelectorAll('[data-detail-mode]').forEach(control=>{
          const active=control.dataset.detailMode===mode;
          control.classList.toggle('active',active);
          control.setAttribute('aria-selected',String(active));
        });

        box.querySelectorAll('[data-detail-panel]').forEach(panel=>{
          panel.hidden=panel.dataset.detailPanel!==mode;
        });

        saveDetailMode(mode);
        resetModalScroll(wrap,box);
      });
    });

    box.querySelectorAll('[data-related-disease-id]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const id=String(btn.dataset.relatedDiseaseId||'');
        const target=items().find(x=>
          x.category==='diseases' &&
          String(x.id)===id
        );
        if(target)openItem(target);
      });
    });
  }

  function itemIdFromHash(){
    const raw=String(window.location.hash||'').replace(/^#/,'');
    if(!raw)return '';

    try{
      const params=new URLSearchParams(raw);
      return params.get('item')||'';
    }catch(_){
      const match=raw.match(/(?:^|&)item=([^&]+)/);
      return match?decodeURIComponent(match[1]):'';
    }
  }

  function clearItemHash(){
    if(!itemIdFromHash())return;
    history.replaceState(
      history.state,
      '',
      window.location.pathname+window.location.search
    );
  }

  function openItemFromHash(){
    const id=itemIdFromHash();
    if(!id)return false;

    const item=items().find(x=>String(x?.id||'')===String(id));
    if(!item)return false;

    openItem(item);
    return true;
  }

  function closeModal(options={}){
    const wrap=document.getElementById('arhDetailPortal');
    if(!wrap)return;
    wrap.classList.remove('show');
    wrap.setAttribute('aria-hidden','true');
    document.body.style.overflow='';

    if(options.clearHash!==false){
      clearItemHash();
    }
  }

  /* Карточки перерисовываются динамически, поэтому обработчик клика
     назначается один раз на весь root через делегирование. */
  function bindCardLinks(){}

  function findItemFromCard(card){
    const id=card.getAttribute('data-item-id');
    if(id){
      const byId=items().find(x=>String(x.id)===String(id));
      if(byId)return byId;
    }

    /* Fallback для старой версии интерфейса: ищем запись по заголовку. */
    const title=card.querySelector('.arh-cardTitle')?.textContent?.trim();
    if(title){
      return items().find(x=>String(x.title).trim()===title);
    }
    return null;
  }

  function activateCard(card){
    const item=findItemFromCard(card);
    if(!item)return;

    if(item.url && item.url!=='#' && !item.simple && !item.chain){
      window.location.href=item.url;
      return;
    }
    openItem(item);
  }

  function closeRiskTooltips(except=null){
    document.querySelectorAll('.arh-riskBadge.is-tooltip-open').forEach(badge=>{
      if(badge===except)return;
      badge.classList.remove('is-tooltip-open');
      badge.setAttribute('aria-expanded','false');
    });
  }

  /* На устройствах без hover плашку можно нажать.
     Клик по ней не должен одновременно открывать карточку ДВ. */
  document.addEventListener('click',e=>{
    const badge=e.target.closest('.arh-riskBadge');

    if(!badge){
      closeRiskTooltips();
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const willOpen=!badge.classList.contains('is-tooltip-open');
    closeRiskTooltips(badge);
    badge.classList.toggle('is-tooltip-open',willOpen);
    badge.setAttribute('aria-expanded',String(willOpen));
  },true);

  /* Capture=true: обработчик получает клик раньше возможных Tilda-обработчиков. */
  root.addEventListener('click',e=>{
    const card=e.target.closest('.arh-card');
    if(!card || !root.contains(card))return;
    e.preventDefault();
    activateCard(card);
  },true);

  root.addEventListener('keydown',e=>{
    const card=e.target.closest('.arh-card');
    if(!card || !root.contains(card))return;
    if(e.key==='Enter' || e.key===' '){
      e.preventDefault();
      activateCard(card);
    }
  });

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      closeRiskTooltips();
      closeModal();
    }
  });

  search.addEventListener('input',()=>{
    state.query=search.value;
    searchWrap.classList.toggle('has-value',!!state.query);
    renderSearch();
  });

  clear.addEventListener('click',()=>{
    search.value='';
    state.query='';
    searchWrap.classList.remove('has-value');
    renderSearch();
    search.focus();
  });

  /* Делегирование: работает и для динамически добавленных пунктов. */
  catRail.addEventListener('click',e=>{
    const btn=e.target.closest('[data-category]');
    if(!btn||!catRail.contains(btn))return;
    state.category=btn.dataset.category;
    renderCategory();
  });

  if(filterWrap){
    filterWrap.addEventListener('input',e=>{
      const input=e.target.closest('#arhDiseaseCultureInput');
      if(!input || !filterWrap.contains(input))return;

      state.diseaseCultureQuery=input.value;

      /* renderCategory пересоздаёт динамический фильтр.
         После рендера возвращаем фокус и позицию курсора,
         чтобы пользователь мог печатать непрерывно. */
      const caret=input.selectionStart ?? input.value.length;
      renderCategory();

      const nextInput=filterWrap.querySelector('#arhDiseaseCultureInput');
      if(nextInput){
        nextInput.focus({preventScroll:true});
        const nextCaret=Math.min(caret,nextInput.value.length);
        try{nextInput.setSelectionRange(nextCaret,nextCaret)}catch(_){}
      }
    });

    filterWrap.addEventListener('click',e=>{
      const cultureOption=e.target.closest('[data-arh-culture-value]');
      if(cultureOption && filterWrap.contains(cultureOption)){
        e.preventDefault();
        state.diseaseCultureQuery=String(
          cultureOption.dataset.arhCultureValue||''
        );
        renderCategory();

        const input=filterWrap.querySelector('#arhDiseaseCultureInput');
        if(input){
          input.focus({preventScroll:true});
          try{input.setSelectionRange(input.value.length,input.value.length)}catch(_){}
        }
        return;
      }

      const cultureClear=e.target.closest('[data-arh-culture-clear]');
      if(cultureClear && filterWrap.contains(cultureClear)){
        e.preventDefault();
        state.diseaseCultureQuery='';
        renderCategory();

        const input=filterWrap.querySelector('#arhDiseaseCultureInput');
        if(input)input.focus({preventScroll:true});
        return;
      }


      const btn=e.target.closest('[data-arh-filter-id][data-arh-filter-value]');
      if(!btn||!filterWrap.contains(btn))return;

      const id=btn.dataset.arhFilterId;
      const value=String(btn.dataset.arhFilterValue||'');
      const configs=normalizeFilterConfigs(state.category);
      const config=configs.find(item=>item.id===id)||{};
      const current=activeFilterValues(state.category,id);

      if(value==='all'){
        setActiveFilterValues(state.category,id,[]);
      }else if(isToggleFilter(config)){
        setActiveFilterValues(
          state.category,
          id,
          current.includes(value)?[]:[value]
        );
      }else if(isMultiFilter(config)){
        const next=current.includes(value)
          ?current.filter(item=>item!==value)
          :[...current,value];

        setActiveFilterValues(state.category,id,next);
      }else{
        setActiveFilterValues(state.category,id,[value]);
      }

      renderCategory();
    });
  }

  root.querySelectorAll('[data-arh-slide]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const dir=Number(btn.dataset.arhSlide)||1;
      catRail.scrollBy({left:dir*285,behavior:'smooth'});
    });
  });

  document.addEventListener('agro-reference:data-updated',()=>{
    syncDynamicCategories();
    if(state.query.trim())renderSearch();
    else renderCategory();

    /* Если пользователь пришёл из блока обучения по ссылке #item=ID,
       открываем точную карточку только после загрузки JSON. */
    openItemFromHash();
  });

  window.addEventListener('hashchange',()=>{
    if(!openItemFromHash()){
      closeModal({clearHash:false});
    }
  });

  syncDynamicCategories();
  renderCategory();

  /* Работает и когда данные уже были загружены до Reference UI. */
  openItemFromHash();
  }

  function bootAgroReference(){
    if(window.AGRO_REFERENCE_EXTERNAL_UI_V301_STARTED)return;

    const roots=document.querySelectorAll('#agro-reference-home');
    if(!roots.length){
      return false;
    }

    window.AGRO_REFERENCE_EXTERNAL_UI_V301_STARTED=true;

    try{
      initAgroReferenceUI();
      return true;
    }catch(error){
      window.AGRO_REFERENCE_EXTERNAL_UI_V301_STARTED=false;
      console.error('[Agrocon Reference] Ошибка запуска внешнего интерфейса:',error);
      return false;
    }
  }

  if(!bootAgroReference()){
    let attempts=0;
    const timer=setInterval(function(){
      attempts+=1;
      if(bootAgroReference() || attempts>=100){
        clearInterval(timer);
      }
    },100);

    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded',function(){
        bootAgroReference();
      },{once:true});
    }
  }
})();
