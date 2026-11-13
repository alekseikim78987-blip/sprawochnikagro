(function () {
  'use strict';

  const root = document.getElementById('agro-reference-home');
  if (!root || root.dataset.referenceReady) return;

  const find = id => root.querySelector(`#${id}`);
  const search = find('arhSearch');
  const clear = find('arhClear');
  const rail = find('arhCatRail');
  const results = find('arhResults');
  const globalResults = find('arhGlobalResults');
  const filterWrap = find('arhFilterWrap');
  const categoryView = find('arhCategoryView');
  const globalView = find('arhGlobalSearch');

  if (!search || !clear || !rail || !results || !globalResults ||
      !filterWrap || !categoryView || !globalView) {
    console.error('[АГРОКОН] В HTML-блоке отсутствуют элементы справочника.');
    return;
  }

  root.dataset.referenceReady = 'true';

  const categories = {
    pesticides: ['Пестициды', 'Средства защиты растений'],
    mechanisms: ['Механизмы действия', 'Как работают пестициды'],
    diseases: ['Болезни', 'Болезни сельскохозяйственных культур'],
    pests: ['Вредители', 'Вредители сельскохозяйственных культур'],
    weeds: ['Сорная растительность', 'Сорные растения'],
    crops: ['Культуры', 'Сельскохозяйственные культуры'],
    nutrition: ['Питание растений', 'Элементы питания и дефициты']
  };

  const types = {
    herbicide: ['Гербицид', 'Гербициды'],
    fungicide: ['Фунгицид', 'Фунгициды'],
    insecticide: ['Инсектицид', 'Инсектициды'],
    acaricide: ['Акарицид', 'Акарициды'],
    rodenticide: ['Родентицид', 'Родентициды'],
    nematicide: ['Нематицид', 'Нематициды'],
    bactericide: ['Бактерицид', 'Бактерициды'],
    fumigant: ['Фумигант', 'Фумиганты'],
    seed_treatment: ['Протравитель', 'Протравители'],
    other: ['Другое', 'Другие']
  };

  const riskLabels = {
    low: 'Низкий',
    'low-medium': 'Низкий–средний',
    medium: 'Средний',
    'medium-high': 'Средний–высокий',
    high: 'Высокий'
  };

  const diseaseFields = [
    ['Возбудитель', ['latin', 'pathogen', 'pathogenName', 'causalAgent']],
    ['Культуры', ['crops', 'hosts', 'hostPlants', 'affectedCrops', 'primaryCrop']],
    ['Поражаемые органы', ['organs', 'affectedOrgans']],
    ['Первые признаки', ['firstSymptoms', 'symptoms']],
    ['Диагностические признаки', ['diagnosticSigns', 'fieldDiagnosis', 'diagnostics']],
    ['Условия развития', ['favorableConditions', 'conditions']],
    ['Источники инфекции', ['infectionSources']],
    ['Распространение', ['spread']],
    ['Развитие болезни', ['development']],
    ['Период риска', ['riskPeriod']],
    ['Вредоносность', ['damage', 'harmfulness']],
    ['Как отличить от других болезней', ['differentialDiagnosis']],
    ['Принципы защиты', ['managementPrinciples', 'control', 'management']],
    ['Химическая защита', ['chemicalProtection']]
  ];

  const pesticideFields = [
    ['Механизм действия', ['moa']],
    ['Главная мишень', ['target']],
    ['Химическая группа', ['family']],
    ['Характер действия', ['action']],
    ['Поглощение и перемещение', ['uptake', 'absorb']],
    ['Спектр действия', ['spectrum']],
    ['Культуры', ['crops']],
    ['Признаки действия', ['symptoms']],
    ['Сильные стороны', ['strength', 'feature']],
    ['Ограничения', ['limits']],
    ['Резистентность', ['resistance']]
  ];

  const mechanismFields = [
    ['Главная мишень', ['target']],
    ['Нарушаемый процесс', ['process']],
    ['Последовательность действия', ['chain', 'moa']],
    ['Признаки действия', ['symptoms']],
    ['Где применяется', ['where']],
    ['Резистентность', ['resistance']]
  ];

  const otherFields = [
    ['Группа или семейство', ['family', 'group']],
    ['Культуры', ['crops', 'hosts', 'hostPlants']],
    ['Признаки', ['symptoms', 'diagnostics', 'damage']],
    ['Развитие', ['biology', 'lifeCycle', 'development']],
    ['Условия', ['conditions', 'favorableConditions']],
    ['Содержание элементов', ['nutrientContent']],
    ['Формы элементов', ['nutrientForms', 'nitrogenForms']],
    ['Реакция почвы', ['soilReactionShort', 'soilReaction']],
    ['Поведение в почве', ['soilBehavior']],
    ['Срок внесения', ['bestTimingShort']],
    ['Условия внесения', ['bestConditionsShort']],
    ['Применение', ['application', 'management', 'control']],
    ['Потери', ['losses']],
    ['Совместимость', ['compatibility']],
    ['Хранение', ['storage']]
  ];

  const sort = new Intl.Collator('ru', { sensitivity: 'base', numeric: true });
  const selected = new Map();
  const historyKey = 'agro-reference-detail-mode';

  let items = [];
  let itemById = new Map();
  let config = {};
  let indexed = [];
  let category = rail.querySelector('.arh-cat.active')?.dataset.category || 'pesticides';
  let culture = '';
  let lastTrigger = null;
  let previousOverflow = '';

  function escape(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function list(value) {
    if (Array.isArray(value)) return value;
    return value == null || value === '' ? [] : [value];
  }

  function asText(value) {
    if (Array.isArray(value)) return value.map(asText).filter(Boolean).join(', ');
    if (value && typeof value === 'object') {
      const label = value.label || value.title || value.name || value.text;
      return label ? asText(label) : Object.values(value).map(asText).filter(Boolean).join(' · ');
    }
    return String(value ?? '').trim();
  }

  function first(item, fields) {
    for (const field of fields) {
      const text = asText(item[field]);
      if (text) return text;
    }
    return '';
  }

  function normalize(value) {
    return String(value ?? '').toLocaleLowerCase('ru').replace(/ё/g, 'е')
      .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  }

  function title(item) {
    return item.title || item.name || String(item.id);
  }

  function setText(id, value) {
    const element = find(id);
    if (element) element.textContent = value;
  }

  function categoryMeta(key) {
    const custom = config.categories || window.AGRO_REFERENCE_CATEGORIES || {};
    const entry = Array.isArray(custom) ? custom.find(x => x.id === key) : custom[key];
    const fallback = categories[key] || [key, key];
    if (typeof entry === 'string') return [entry, entry];
    return [entry?.label || fallback[0], entry?.title || fallback[1]];
  }

  function typeLabel(item) {
    return item.typeLabel || types[item.type]?.[0] ||
      (item.category === 'diseases' ? item.diseaseGroup || 'Болезнь' : categoryMeta(item.category)[0]);
  }

  function classifications(item) {
    const pairs = list(item.classification).map(entry => [entry?.system, entry?.code]);
    for (const system of ['HRAC', 'FRAC', 'IRAC', 'RAC']) {
      pairs.push([system, item[system.toLowerCase()]]);
    }
    pairs.push([item.classificationSystem, item.classificationCode]);
    return [...new Set(pairs
      .filter(([system, code]) => system && code != null && String(code).trim())
      .map(([system, code]) => `${String(system).toUpperCase()} ${code}`))];
  }

  function riskBadge(item) {
    const level = item.resistanceRisk || item.riskLevel;
    const label = item.resistanceRiskLabel || riskLabels[level];
    if (!label) return '';
    return `<span class="arh-badge arh-riskBadge" data-risk="${escape(level)}"
      title="${escape(item.resistanceRiskBasis || 'Риск отбора резистентности')}">
      Риск: ${escape(label)}
    </span>`;
  }

  function card(item) {
    const tags = list(item.tags).slice(0, 3);
    const orange = ['pesticides', 'mechanisms'].includes(item.category) ? ' orange' : '';

    return `<div class="arh-card" role="button" tabindex="0" data-item-id="${escape(item.id)}">
      <div class="arh-cardTop">
        <span class="arh-badge${orange}">${escape(typeLabel(item))}</span>
        ${riskBadge(item)}
        <span class="arh-cardArrow" aria-hidden="true">↗</span>
      </div>
      <div class="arh-cardTitle">${escape(title(item))}</div>
      <div class="arh-cardDesc">${escape(first(item, ['description', 'simple', 'lead']))}</div>
      ${tags.length ? `<div class="arh-cardMeta">${tags.map(tag =>
        `<span>${escape(asText(tag))}</span>`).join('')}</div>` : ''}
    </div>`;
  }

  function groupsHtml(groups) {
    return [...groups].map(([label, group]) => `
      <section class="arh-alphaGroup">
        <div class="arh-alphaHead">
          <span class="arh-alphaLetter">${escape(label)}</span>
          <span class="arh-alphaLine"></span>
          <span class="arh-alphaCount">${group.length}</span>
        </div>
        <div class="arh-alphaCards">${group.map(card).join('')}</div>
      </section>`).join('');
  }

  function groupBy(records, getKey) {
    const groups = new Map();
    for (const item of records) {
      const key = getKey(item);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    }
    return groups;
  }

  function empty(message) {
    return `<div class="arh-empty"><b>${escape(message)}</b></div>`;
  }

  function crops(item) {
    return [...new Set(
      ['primaryCrop', 'crops', 'hosts', 'hostPlants', 'affectedCrops']
        .flatMap(field => list(item[field]))
        .map(asText).filter(Boolean)
    )];
  }

  function fieldValues(item, filter) {
    return list(filter.fields || filter.field || filter.id)
      .flatMap(field => list(String(field).split('.').reduce((value, key) => value?.[key], item)))
      .map(asText).filter(Boolean);
  }

  function filterConfigs() {
    const raw = config.filters || {};
    const builtIn = ['pesticides', 'mechanisms'].includes(category)
      ? [{
          id: 'type', label: 'Тип пестицида', field: 'type', dynamic: true,
          order: Object.keys(types),
          excludeValues: ['molluscicide'],
          optionLabels: Object.fromEntries(Object.entries(types).map(([key, labels]) => [key, labels[1]]))
        }]
      : [];
    const definitions = new Map();
    for (const filter of [
      ...builtIn, ...list(raw['*']), ...list(raw[category]),
      ...list(window.AGRO_REFERENCE_FILTERS?.[category])
    ]) {
      if (filter?.id) definitions.set(filter.id, filter);
    }
    return [...definitions.values()].sort((a, b) => (a.position ?? 10) - (b.position ?? 10));
  }

  function selectionKey(filterId) {
    return `${category}:${filterId}`;
  }

  function filterOptions(filter, records) {
    const options = new Map();
    if (Array.isArray(filter.options)) {
      for (const option of filter.options) {
        const value = String(option?.value ?? option);
        options.set(value, option?.label || value);
      }
    } else {
      for (const [value, label] of Object.entries(filter.options || {})) {
        options.set(value, asText(label));
      }
    }
    if (filter.dynamic) {
      for (const item of records) {
        for (const value of fieldValues(item, filter)) {
          if (!options.has(value)) options.set(value, filter.optionLabels?.[value] || value);
        }
      }
    }

    const order = list(filter.order);
    const rank = value => order.includes(value) ? order.indexOf(value) : order.length;
    return [...options].filter(([value]) => !list(filter.excludeValues).includes(value))
      .sort(([a, labelA], [b, labelB]) => rank(a) - rank(b) || sort.compare(labelA, labelB));
  }

  function filterButton(filter, value, label, active, toggle = false) {
    return `<button type="button" class="arh-filter${toggle ? ' arh-filter--toggle' : ''}${active ? ' active' : ''}"
      data-arh-filter-id="${escape(filter.id)}" data-arh-filter-value="${escape(value)}"
      aria-pressed="${active}">${escape(label)}</button>`;
  }

  function renderFilters(records) {
    const active = [];
    const html = [];

    for (const filter of filterConfigs()) {
      const key = selectionKey(filter.id);
      const visible = Object.entries(filter.showWhen || {}).every(([id, expected]) =>
        list(expected).map(String).includes(selected.get(selectionKey(id)) || 'all')
      );

      if (!visible) {
        selected.delete(key);
        continue;
      }

      const current = selected.get(key) || 'all';
      if (filter.type === 'toggle') {
        const value = String(filter.value ?? 'true');
        if (records.some(item => fieldValues(item, filter).includes(value))) {
          html.push(filterButton(filter, value, filter.buttonLabel || filter.label || value, current === value, true));
          if (current === value) active.push([filter, value]);
        }
        continue;
      }

      const options = filterOptions(filter, records);
      if (!options.length) {
        selected.delete(key);
        continue;
      }

      const valid = options.some(([value]) => value === current) ? current : 'all';
      if (valid === 'all') selected.delete(key);
      else active.push([filter, valid]);

      html.push(`<div class="arh-filterGroup">
        ${filter.hideLabel ? '' : `<div class="arh-filterLabel">${escape(filter.label || 'Фильтр')}</div>`}
        <div class="arh-filterRail">
          ${filterButton(filter, 'all', filter.allLabel || 'Все', valid === 'all')}
          ${options.map(([value, label]) => filterButton(filter, value, label, valid === value)).join('')}
        </div>
      </div>`);
    }

    if (category === 'diseases') {
      const cropList = [...new Set(records.flatMap(crops))].sort(sort.compare);
      html.unshift(`<div class="arh-cultureFilter">
        <label class="arh-filterLabel arh-cultureFilterLabel" for="arhCulture">Поиск по культуре</label>
        <input id="arhCulture" class="arh-cultureInput" type="search"
          placeholder="Например, пшеница" list="arhCultureList"
          autocomplete="off" value="${escape(culture)}">
        <datalist id="arhCultureList">${cropList.map(crop =>
          `<option value="${escape(crop)}"></option>`).join('')}</datalist>
      </div>`);
    }

    filterWrap.innerHTML = html.join('');
    filterWrap.style.display = html.length ? 'block' : 'none';

    return records.filter(item => active.every(([filter, value]) =>
      fieldValues(item, filter).includes(value)
    ));
  }

  function renderCategoryCards(records) {
    const cropQuery = normalize(culture);
    const filtered = category === 'diseases' && cropQuery
      ? records.filter(item => crops(item).some(crop => normalize(crop).includes(cropQuery)))
      : records;

    setText('arhTotal', `Записей: ${filtered.length}`);
    results.innerHTML = filtered.length
      ? groupsHtml(groupBy(filtered, item => title(item).trim().charAt(0).toLocaleUpperCase('ru') || '•'))
      : empty('По этим условиям ничего не найдено');
  }

  let currentCategoryRecords = [];

  function renderCategory() {
    const [label, heading] = categoryMeta(category);
    setText('arhSectionEyebrow', label);
    setText('arhSectionTitle', heading);

    rail.querySelectorAll('[data-category]').forEach(button => {
      const active = button.dataset.category === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    currentCategoryRecords = renderFilters(items.filter(item => item.category === category));
    renderCategoryCards(currentCategoryRecords);
  }

  function render() {
    const query = normalize(search.value);
    search.closest('.arh-searchWrap')?.classList.toggle('has-value', Boolean(search.value));
    categoryView.hidden = Boolean(query);
    globalView.hidden = !query;

    if (!query) {
      setText('arhSearchCount', '');
      renderCategory();
      return;
    }

    const terms = query.split(' ');
    const matches = indexed.filter(entry => terms.every(term => entry.text.includes(term)));
    matches.sort((a, b) => {
      const priority = entry => entry.name === query ? 0 : entry.name.startsWith(query) ? 1 : 2;
      return priority(a) - priority(b) || sort.compare(a.name, b.name);
    });

    const count = `Найдено: ${matches.length}`;
    setText('arhSearchCount', count);
    setText('arhGlobalTotal', count);
    globalResults.innerHTML = matches.length
      ? groupsHtml(groupBy(matches.map(entry => entry.item), item => categoryMeta(item.category)[0]))
      : empty('По этому запросу ничего не найдено');
  }

  function loadRecords() {
    const data = window.AGRO_REFERENCE_DATA;
    const records = Array.isArray(data) ? data : data?.items || data?.data || [];
    const configRecord = records.find(item => item?._kind === 'config' || item?.id === 'agro-reference-config');
    config = { ...(window.AGRO_REFERENCE_CONFIG || {}), ...(data?.config || configRecord || {}) };

    items = records.filter(item => item?.id != null && item.category && item !== configRecord)
      .sort((a, b) => sort.compare(title(a), title(b)));
    itemById = new Map(items.map(item => [String(item.id), item]));

    indexed = items.map(item => ({
      item,
      name: normalize(title(item)),
      text: normalize([
        title(item), item.name, item.aliases, item.tags, item.description,
        item.simple, item.lead, item.latin, item.family, item.moa, item.target,
        item.spectrum, item.symptoms, item.firstSymptoms, item.diagnosticSigns,
        item.nutrientContent, item.formula, crops(item), classifications(item),
        categoryMeta(item.category)[0], typeLabel(item)
      ].map(asText).join(' '))
    }));

    for (const key of new Set(items.map(item => item.category))) {
      if ([...rail.querySelectorAll('[data-category]')].some(button => button.dataset.category === key)) continue;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'arh-cat';
      button.dataset.category = key;
      button.textContent = categoryMeta(key)[0];
      rail.appendChild(button);
    }

    render();
    openFromHash();
  }

  function getPortal() {
    let portal = document.getElementById('arhDetailPortal');
    if (portal) return portal;

    portal = document.createElement('div');
    portal.id = 'arhDetailPortal';
    portal.setAttribute('aria-hidden', 'true');
    portal.innerHTML = `<div class="arh-modal" id="arhDetailPortalBox" role="dialog"
      aria-modal="true" aria-labelledby="arhCurrentTitle"></div>`;
    portal.addEventListener('click', event => {
      if (event.target === portal) closeDetail();
    });
    document.body.appendChild(portal);
    return portal;
  }

  function detailFields(item) {
    const schema = item.category === 'diseases' ? diseaseFields
      : item.category === 'pesticides' ? pesticideFields
      : item.category === 'mechanisms' ? mechanismFields : otherFields;

    return schema.map(([label, keys]) => [label, first(item, keys)]).filter(([, text]) => text);
  }

  function detailParagraphs(item) {
    return [...new Set([...list(item.article), ...list(item.paragraphs)]
      .map(value => {
        if (!value || typeof value !== 'object') return asText(value);
        return [asText(value.heading || value.title), asText(value.text || value.content)]
          .filter(Boolean).join('. ') || asText(value);
      }).filter(Boolean))];
  }

  function relatedMaterial(item) {
    if (!['pesticides', 'mechanisms'].includes(item.category)) return '';
    const codes = classifications(item);
    if (!codes.length) return '';

    const target = item.category === 'pesticides' ? 'mechanisms' : 'pesticides';
    const related = items.filter(record =>
      record.category === target && record.type === item.type &&
      classifications(record).some(code => codes.includes(code))
    );
    if (!related.length) return '';

    return `<div class="arh-relatedArticle">
      <b>${target === 'mechanisms' ? 'Механизм действия' : 'Действующие вещества группы'}</b>
      <div class="arh-relatedList">${related.map(record =>
        `<button type="button" class="arh-filter" data-arh-open="${escape(record.id)}">${escape(title(record))}</button>`
      ).join('')}</div>
    </div>`;
  }

  function setMode(box, mode) {
    box.querySelectorAll('[data-detail-mode]').forEach(button => {
      const active = button.dataset.detailMode === mode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    box.querySelectorAll('[data-detail-panel]').forEach(panel => {
      panel.hidden = panel.dataset.detailPanel !== mode;
    });
    box.scrollTop = 0;

    try {
      localStorage.setItem(historyKey, mode);
    } catch (_) {}
  }

  function openDetail(item) {
    const portal = getPortal();
    const box = portal.querySelector('.arh-modal');
    const fields = detailFields(item);
    const paragraphs = detailParagraphs(item);
    const lead = first(item, ['simple', 'lead', 'description']);
    const takeaway = first(item, ['remember', 'takeaway']);
    const basis = first(item, ['resistanceRiskBasis']);
    const shortFields = item.category === 'diseases'
      ? fields.filter(([label]) => ['Возбудитель', 'Культуры', 'Первые признаки', 'Диагностические признаки'].includes(label))
      : fields.slice(0, 4);

    box.innerHTML = `
      <div class="arh-modalTop">
        <div>
          <div class="arh-modalBadges">
            <span class="arh-badge orange">${escape(typeLabel(item))}</span>
            ${classifications(item).map(code => `<span class="arh-badge">${escape(code)}</span>`).join('')}
            ${riskBadge(item)}
          </div>
          <div class="arh-modalName" id="arhCurrentTitle">${escape(title(item))}</div>
          ${lead ? `<div class="arh-modalLead">${escape(lead)}</div>` : ''}
        </div>
        <button class="arh-modalClose" type="button" aria-label="Закрыть">×</button>
      </div>
      <div class="arh-viewSwitch" role="tablist" aria-label="Режим чтения">
        <button type="button" role="tab" data-detail-mode="brief" aria-controls="arhBrief">Кратко</button>
        <button type="button" role="tab" data-detail-mode="full" aria-controls="arhFull">Подробно</button>
      </div>
      <div id="arhBrief" class="arh-detailMode" data-detail-panel="brief" role="tabpanel">
        ${shortFields.length ? `<dl class="arh-brief">${shortFields.map(([label, value]) =>
          `<div class="arh-briefRow"><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`
        ).join('')}</dl>` : ''}
        ${takeaway ? `<div class="arh-takeaway"><b>Главное запомнить</b>${escape(takeaway)}</div>` : ''}
        ${!lead && !shortFields.length && !takeaway ? '<p>Краткое описание пока не добавлено.</p>' : ''}
      </div>
      <div id="arhFull" class="arh-detailMode" data-detail-panel="full" role="tabpanel" hidden>
        ${fields.map(([label, value]) => `<section class="arh-textSection">
          <h3 class="arh-textTitle">${escape(label)}</h3><p>${escape(value)}</p>
        </section>`).join('')}
        ${basis ? `<section class="arh-textSection"><h3 class="arh-textTitle">Основание оценки риска</h3>
          <p>${escape(basis)}</p></section>` : ''}
        ${paragraphs.length ? `<article class="arh-longread">${paragraphs.map(paragraph =>
          `<p>${escape(paragraph)}</p>`).join('')}</article>` : ''}
        ${relatedMaterial(item)}
        ${!lead && !fields.length && !paragraphs.length ? '<p>Описание пока не добавлено.</p>' : ''}
      </div>`;

    if (!portal.classList.contains('show')) previousOverflow = document.body.style.overflow;
    portal.classList.add('show');
    portal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    let mode = 'brief';
    try {
      if (localStorage.getItem(historyKey) === 'full') mode = 'full';
    } catch (_) {}
    setMode(box, mode);

    box.onclick = event => {
      if (event.target.closest('.arh-modalClose')) {
        closeDetail();
        return;
      }

      const button = event.target.closest('[data-detail-mode]');
      if (button && ['brief', 'full'].includes(button.dataset.detailMode)) {
        setMode(box, button.dataset.detailMode);
        return;
      }

      const related = event.target.closest('[data-arh-open]');
      if (related) setItemHash(related.dataset.arhOpen);
    };
    box.querySelector('.arh-modalClose')?.focus({ preventScroll: true });
  }

  function setItemHash(id) {
    const hash = `#item=${encodeURIComponent(id)}`;
    if (location.hash === hash) openFromHash();
    else location.hash = hash;
  }

  function openFromHash() {
    if (!location.hash.startsWith('#item=')) return false;
    let id;
    try {
      id = decodeURIComponent(location.hash.slice(6));
    } catch (_) {
      return false;
    }
    const item = itemById.get(id);
    if (!item) return false;
    openDetail(item);
    return true;
  }

  function closeDetail(clearHash = true) {
    const portal = document.getElementById('arhDetailPortal');
    if (!portal?.classList.contains('show')) return;
    portal.classList.remove('show');
    portal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousOverflow;

    if (clearHash && location.hash.startsWith('#item=')) {
      history.replaceState(history.state, '', location.pathname + location.search);
    }
    if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
    lastTrigger = null;
  }

  const styles = document.createElement('style');
  styles.textContent = `
    #agro-reference-home [hidden], #arhDetailPortal [hidden] { display: none !important; }
    #agro-reference-home .arh-cultureFilter { max-width: 370px; margin-bottom: 16px; }
    #agro-reference-home .arh-cultureFilterLabel { display: block; }
    #agro-reference-home .arh-cultureInput {
      width: 100%; padding: 10px 14px; border: 1px solid #e5e8e3;
      border-radius: 14px; background: #fff; color: #171917;
    }
    #agro-reference-home .arh-cardTop { flex-wrap: wrap; }
    #agro-reference-home .arh-cardArrow { margin-left: auto; }
    #agro-reference-home .arh-riskBadge, #arhDetailPortal .arh-riskBadge {
      background: #fff4e8; color: #935000;
    }
    #agro-reference-home .arh-riskBadge[data-risk="high"],
    #arhDetailPortal .arh-riskBadge[data-risk="high"] {
      background: #fcebea; color: #a5342a;
    }
    #agro-reference-home .arh-riskBadge[data-risk="low"],
    #arhDetailPortal .arh-riskBadge[data-risk="low"] {
      background: #eaf4e8; color: #32613b;
    }
    #arhDetailPortal .arh-viewSwitch {
      display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-top: 20px;
    }
    #arhDetailPortal .arh-viewSwitch button {
      padding: 8px 0; border: 0; border-bottom: 2px solid transparent;
      background: transparent; color: #626962; font: inherit; font-size: 13px;
      font-weight: 750; cursor: pointer;
    }
    #arhDetailPortal .arh-viewSwitch button.active { color: #9a4b00; border-color: #ff8000; }
    #arhDetailPortal .arh-brief { margin: 18px 0 0; }
    #arhDetailPortal .arh-briefRow {
      display: grid; grid-template-columns: minmax(100px, 1fr) 3fr;
      gap: 12px; padding: 10px 0; border-bottom: 1px solid #e5e8e3;
    }
    #arhDetailPortal .arh-briefRow dt { font-weight: 750; }
    #arhDetailPortal .arh-briefRow dd { margin: 0; }
    #arhDetailPortal .arh-textSection { margin: 20px 0; }
    #arhDetailPortal .arh-textTitle { margin: 0 0 5px; font-size: 16px; }
    #arhDetailPortal .arh-textSection p { margin: 0; line-height: 1.65; white-space: pre-line; }
    #arhDetailPortal .arh-relatedList button {
      padding: 6px 10px; border: 1px solid #e5e8e3; border-radius: 12px;
      background: #fff; color: #814708; cursor: pointer;
    }
  `;
  document.head.appendChild(styles);

  search.addEventListener('input', render);
  clear.addEventListener('click', () => {
    search.value = '';
    render();
    search.focus();
  });

  rail.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button || !rail.contains(button)) return;
    category = button.dataset.category;
    search.value = '';
    render();
  });

  root.querySelectorAll('[data-arh-slide]').forEach(button => {
    button.addEventListener('click', () => {
      rail.scrollBy({ left: Number(button.dataset.arhSlide) * 285, behavior: 'smooth' });
    });
  });

  filterWrap.addEventListener('click', event => {
    const button = event.target.closest('[data-arh-filter-id]');
    if (!button) return;
    const id = button.dataset.arhFilterId;
    const value = button.dataset.arhFilterValue;
    const key = selectionKey(id);
    if (value === 'all' || selected.get(key) === value) selected.delete(key);
    else selected.set(key, value);
    renderCategory();
  });

  filterWrap.addEventListener('input', event => {
    if (event.target.id !== 'arhCulture') return;
    culture = event.target.value;
    renderCategoryCards(currentCategoryRecords);
  });

  function activateCard(event) {
    const cardElement = event.target.closest('.arh-card[data-item-id]');
    if (!cardElement || !root.contains(cardElement)) return;
    if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    lastTrigger = cardElement;
    setItemHash(cardElement.dataset.itemId);
  }

  root.addEventListener('click', activateCard);
  root.addEventListener('keydown', activateCard);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeDetail();
  });
  window.addEventListener('hashchange', () => {
    if (!openFromHash()) closeDetail(false);
  });
  document.addEventListener('agro-reference:data-updated', loadRecords);

  loadRecords();
})();
