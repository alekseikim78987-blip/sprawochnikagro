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
  /* Статьи, поиск с опечатками и компактные карточки */
  const editedArticles = {
    'hb-ai-florasulam': [
      'Флорасулам — системный гербицид против двудольных сорняков. Вещество поглощается главным образом листьями, частично корнями и перемещается к точкам роста. Там оно подавляет ацетолактатсинтазу (ALS) — фермент, который участвует в синтезе валина, лейцина и изолейцина. Эти аминокислоты нужны растению для образования белков, поэтому деление клеток в растущих тканях замедляется и рост сорняка прекращается.',
      'По внешнему виду сорняк может ещё несколько дней казаться живым и почти здоровым. При осмотре сначала обращают внимание на молодые ткани и прирост. Позднее возможны пожелтение, покраснение и отмирание точек роста. Выраженность признаков зависит от вида сорняка, его фазы и условий роста в момент обработки.',
      'В справочнике флорасулам представлен в контексте защиты зерновых. Перечень культур и сорняков, сроки и ограничения определяют по регламенту конкретного препарата. Флорасулам относится к HRAC 2. При повторном использовании ингибиторов ALS возрастает риск отбора устойчивых сорняков. При планировании ротации учитывают код механизма действия и эффективность альтернатив против видов, которые есть в поле.'
    ],
    'hb-moa-2': [
      'Ацетолактатсинтаза, или ALS (AHAS), катализирует первый общий этап синтеза трёх аминокислот: валина, лейцина и изолейцина. Когда гербицид подавляет этот фермент, запас аминокислот перестаёт нормально пополняться. Особенно чувствительны молодые ткани: в точках роста клетки активно делятся, и им постоянно нужны аминокислоты для синтеза белка.',
      'Первое заметное следствие — остановка прироста. Уже сформированные листья некоторое время могут оставаться зелёными. По мере развития симптомов молодые ткани желтеют или краснеют, корни перестают нормально расти, точки роста отмирают. Поэтому оценка по одному признаку, например по пожелтению листьев, мало что говорит о механизме.',
      'В HRAC 2 входят несколько химических классов. У входящих в группу веществ могут различаться чувствительные виды сорняков и культуры, на которых разрешено применение. При составлении программы защиты общий код HRAC 2 означает повторение одной и той же мишени. История применения группы важна для оценки риска устойчивости.'
    ],
    'disease-wheat-septoria-tritici': [
      'Септориоз листьев пшеницы вызывает гриб Zymoseptoria tritici. Для заражения ему необходимо увлажнение листьев. После заражения болезнь обычно развивается скрыто 14–28 дней. При первых осмотрах на нижних листьях можно увидеть бледные или светло-бурые пятна. Со временем поражённая ткань отмирает, пятна вытягиваются вдоль листа и могут сливаться.',
      'В зрелых пятнах ищут мелкие чёрные пикниды — структуры, в которых образуются споры. Для септориоза характерны многочисленные пикниды внутри отмершей ткани. При пиренофорозе чаще заметны жёлтый ореол и тёмная точка в центре пятна. Осмотр нескольких зрелых пятен даёт больше информации, чем оценка одного молодого пятна по цвету.',
      'Заражённые остатки и падалица поддерживают инфекцию между сезонами. В посеве дождевые брызги разносят споры с нижних листьев на верхние. Продолжительная влажная погода во время формирования верхних листьев особенно опасна: их раннее отмирание уменьшает площадь фотосинтеза в период налива зерна. При оценке риска учитывают устойчивость сорта, инфекционный фон и погоду.'
    ]
  };

  const factFields = {
    pesticides: [
      ['Характер действия', ['action', 'uptake', 'absorb']],
      ['Механизм действия', ['moa', 'target']],
      ['Культуры', ['crops']],
      ['Химический класс', ['family']]
    ],
    mechanisms: [
      ['Мишень', ['target']],
      ['Нарушаемый процесс', ['process', 'moa']],
      ['Химический класс', ['family']],
      ['Культуры', ['crops']]
    ],
    diseases: [
      ['Возбудитель', ['latin', 'pathogen', 'pathogenName']],
      ['Культуры', ['crops', 'primaryCrop', 'hosts']],
      ['Поражаемые органы', ['organs', 'affectedOrgans']],
      ['Группа болезни', ['diseaseGroup']]
    ]
  };

  function articleParagraphs(item) {
    if (editedArticles[item.id]) return editedArticles[item.id];

    const prose = first(item, ['description', 'simple', 'lead'])
      .replace(/Для полевой диагностики особенно важны следующие признаки:\s*/gi, '')
      .replace(/\s*;\.\s*/g, '. ')
      .replace(/([.!?])\s+([а-яё])/g, (_, end, letter) =>
        end + ' ' + letter.toLocaleUpperCase('ru'));

    const segmenter = typeof Intl.Segmenter === 'function'
      ? new Intl.Segmenter('ru', { granularity: 'sentence' })
      : null;
    const sentences = segmenter
      ? Array.from(segmenter.segment(prose), entry => entry.segment.trim()).filter(Boolean)
      : prose.split(/(?<=[.!?])\s+(?=[А-ЯЁA-Z])/).filter(Boolean);

    const paragraphs = [];
    let buffer = '';
    for (const sentence of sentences) {
      if (buffer.length >= 230 && buffer.length + sentence.length > 475) {
        paragraphs.push(buffer);
        buffer = '';
      }
      buffer = [buffer, sentence].filter(Boolean).join(' ');
    }
    if (buffer) paragraphs.push(buffer);

    const supplements = detailParagraphs(item).filter(text =>
      !/^(рабочий спектр в базе|культурный контекст)\s*:/i.test(text)
    );

    if (item.category === 'pesticides' || item.category === 'mechanisms') {
      supplements.push(...['strength', 'limits', 'resistance'].map(key => first(item, [key])));
    } else if (item.category === 'diseases') {
      supplements.push(first(item, ['differentialDiagnosis']));
      const management = list(item.managementPrinciples).map(asText).filter(Boolean);
      if (management.length) {
        supplements.push('При планировании защиты учитывают следующие меры: ' + management.join(', ') + '.');
      }
      supplements.push(first(item, ['chemicalProtection']));
    }

    const normalizeWords = value => new Set(normalize(value).split(' ').filter(word => word.length > 3));
    let extra = '';

    for (const text of supplements.filter(Boolean)) {
      const prior = [...paragraphs, extra].join(' ');
      const value = normalize(text);
      if (!value || normalize(prior).includes(value)) continue;

      const words = normalizeWords(text);
      const seen = normalizeWords(prior);
      const overlap = [...words].filter(word => seen.has(word)).length;
      if (words.size >= 7 && overlap / words.size >= 0.85 &&
          (text.match(/\d+/g) || []).every(number => prior.includes(number))) continue;

      if (extra && extra.length + text.length > 540) {
        paragraphs.push(extra);
        extra = '';
      }
      extra = [extra, /[.!?…]$/.test(text) ? text : text + '.'].filter(Boolean).join(' ');
    }
    if (extra) paragraphs.push(extra);
    return paragraphs;
  }

  const baseCard = card;
  card = function compactCard(item) {
    return baseCard({
      ...item,
      description: first(item, ['simple', 'lead', 'description']).slice(0, 220),
      tags: []
    });
  };

  function typoDistance(a, b) {
    const rows = [Array.from({ length: b.length + 1 }, (_, i) => i)];
    for (let i = 1; i <= a.length; i++) {
      const row = [i];
      rows.push(row);
      for (let j = 1; j <= b.length; j++) {
        row[j] = Math.min(
          row[j - 1] + 1,
          rows[i - 1][j] + 1,
          rows[i - 1][j - 1] + Number(a[i - 1] !== b[j - 1])
        );
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          row[j] = Math.min(row[j], rows[i - 2][j - 2] + 1);
        }
      }
    }
    return rows[a.length][b.length];
  }

  const fuzzyWords = new WeakMap();
  function searchableWords(item) {
    if (fuzzyWords.has(item)) return fuzzyWords.get(item);
    const words = [...new Set(normalize([
      title(item), item.name, item.aliases, item.latin, item.tags,
      crops(item), item.family, item.moa, classifications(item)
    ].map(asText).join(' ')).split(' ').filter(Boolean))];
    fuzzyWords.set(item, words);
    return words;
  }

  function typoLimit(word) {
    if (!/^\p{L}{4,}$/u.test(word)) return 0;
    return word.length < 7 ? 1 : word.length < 13 ? 2 : 3;
  }

  const baseRender = render;
  render = function renderSearchWithTypos() {
    const query = normalize(search.value);
    if (!query) {
      baseRender();
      return;
    }

    search.closest('.arh-searchWrap')?.classList.toggle('has-value', Boolean(search.value));
    categoryView.hidden = true;
    globalView.hidden = false;

    const terms = query.split(' ');
    const cache = new Map();
    const scored = [];

    for (const entry of indexed) {
      const { item, name, text } = entry;
      const words = searchableWords(item);
      const isExact = terms.every(term => text.includes(term));
      const strong = terms.every(term => words.some(word =>
        word === term || (term.length >= 3 && word.startsWith(term))
      ));

      if (isExact) {
        scored.push({
          item,
          score: name === query ? 0 : name.startsWith(query) ? 1 : strong ? 2 : 7,
          fuzzy: false
        });
        continue;
      }

      let cost = 0;
      let edits = 0;
      let matched = true;

      for (const term of terms) {
        if (words.includes(term) || (term.length >= 3 && words.some(word => word.startsWith(term)))) continue;

        const limit = typoLimit(term);
        let best = Infinity;
        for (const word of words) {
          if (!limit || Math.abs(word.length - term.length) > limit) continue;
          const key = term + ':' + word;
          if (!cache.has(key)) cache.set(key, typoDistance(term, word));
          best = Math.min(best, cache.get(key));
        }

        if (best <= limit) {
          edits += best;
          cost += best / term.length;
        } else if (text.includes(term)) {
          cost += 0.15;
        } else {
          matched = false;
          break;
        }
      }

      if (matched && edits) scored.push({ item, score: 3 + cost, fuzzy: true });
    }

    scored.sort((a, b) => a.score - b.score || sort.compare(title(a.item), title(b.item)));
    const direct = scored.filter(hit => !hit.fuzzy);
    const approx = scored.filter(hit => hit.fuzzy);
    const hasStrongMatch = direct.some(hit => hit.score < 7);
    const similar = hasStrongMatch ? [] : approx
      .filter(hit => hit.score <= (approx[0]?.score ?? 0) + 0.18)
      .slice(0, 12);
    const count = `Найдено: ${similar.length + direct.length}`;
    setText('arhSearchCount', count);
    setText('arhGlobalTotal', count);

    const suggestions = similar.length ? `<div class="arh-querySuggestions">
      <b>Возможно, ты имел в виду</b>
      <div>${similar.slice(0, 4).map(({ item }) => `<button type="button"
        data-arh-suggestion="${escape(item.id)}">${escape(title(item))}</button>`).join('')}</div>
    </div>` : '';

    const groups = [
      ...(similar.length ? [['Похожие результаты', similar.map(hit => hit.item)]] : []),
      ...groupBy(direct.map(hit => hit.item), item => categoryMeta(item.category)[0])
    ];
    globalResults.innerHTML = groups.length
      ? suggestions + groupsHtml(groups)
      : empty('По этому запросу ничего не найдено');
  };

  globalResults.addEventListener('click', event => {
    const button = event.target.closest('[data-arh-suggestion]');
    if (!button) return;
    const item = itemById.get(button.dataset.arhSuggestion);
    if (!item) return;
    search.value = title(item);
    render();
    setItemHash(String(item.id));
  });

  const baseOpenDetail = openDetail;
  openDetail = function openArticle(item) {
    let savedMode;
    try { savedMode = localStorage.getItem(historyKey); } catch (_) {}

    baseOpenDetail(item);

    const box = document.querySelector('#arhDetailPortal .arh-modal');
    if (!box) return;
    const top = box.querySelector('.arh-modalTop');
    const heading = top?.firstElementChild;
    const brief = box.querySelector('#arhBrief');
    const full = box.querySelector('#arhFull');
    if (!heading || !brief || !full) return;

    const identity = {
      pesticides: 'Действующее вещество',
      mechanisms: 'Механизм действия',
      diseases: 'Болезнь',
      pests: 'Вредитель',
      weeds: 'Сорное растение',
      crops: 'Культура',
      nutrition: 'Питание растений'
    }[item.category] || categoryMeta(item.category)[0];

    const label = document.createElement('div');
    label.className = 'arh-articleKind';
    label.textContent = identity;
    heading.prepend(label);
    heading.querySelector('.arh-modalLead')?.remove();

    const titleElement = heading.querySelector('.arh-modalName');
    if (titleElement) heading.insertBefore(titleElement, heading.querySelector('.arh-modalBadges'));

    const facts = factFields[item.category]
      ? factFields[item.category].map(([name, keys]) => [name, first(item, keys)]).filter(([, text]) => text)
      : detailFields(item).slice(0, 4);

    if (facts.length) {
      const summary = document.createElement('dl');
      summary.className = 'arh-articleFacts';
      summary.innerHTML = facts.map(([name, value]) =>
        `<div><dt>${escape(name)}</dt><dd>${escape(value)}</dd></div>`).join('');
      top.insertBefore(summary, top.querySelector('.arh-modalClose'));
    }

    const paragraphs = articleParagraphs(item);
    const intro = first(item, ['simple', 'lead']) || paragraphs[0] || 'Краткое описание пока не добавлено.';
    const takeaway = first(item, ['remember', 'takeaway']);
    brief.innerHTML = `<article class="arh-reading">
      <p>${escape(intro)}</p>
      ${takeaway && normalize(takeaway) !== normalize(intro) ? `<p>${escape(takeaway)}</p>` : ''}
    </article>`;

    const related = full.querySelector('.arh-relatedArticle');
    const content = paragraphs.length ? paragraphs : [intro];
    const details = !factFields[item.category]
      ? detailFields(item).slice(4).map(([name, value]) =>
        `<p><strong>${escape(name)}.</strong> ${escape(value)}</p>`).join('')
      : '';

    full.innerHTML = `<article class="arh-reading">
      ${content.map(text => `<p>${escape(text)}</p>`).join('')}${details}
    </article>`;

    if (related) full.appendChild(related);

    const basis = first(item, ['resistanceRiskBasis']);
    if (basis) {
      full.insertAdjacentHTML('beforeend',
        `<p class="arh-riskBasis"><strong>Основание оценки риска.</strong> ${escape(basis)}</p>`);
    }

    setMode(box, savedMode === 'brief' ? 'brief' : 'full');
  };

  const editorialStyles = document.createElement('style');
  editorialStyles.textContent = `
    #agro-reference-home .arh-card {
      min-height:0; padding:12px 14px; border-radius:15px;
    }
    #agro-reference-home .arh-cardTitle { margin-top:8px; font-size:17px; }
    #agro-reference-home .arh-cardDesc {
      display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2;
      overflow:hidden; margin-top:5px; font-size:12px; line-height:1.4;
    }
    #agro-reference-home .arh-alphaGroup + .arh-alphaGroup { margin-top:22px; }
    #agro-reference-home .arh-alphaLetter {
      white-space:normal; overflow-wrap:anywhere; max-width:72%;
    }
    #agro-reference-home .arh-querySuggestions {
      padding:12px 14px; margin-bottom:18px; border-radius:14px; background:#fff4e8;
    }
    #agro-reference-home .arh-querySuggestions div {
      display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;
    }
    #agro-reference-home .arh-querySuggestions button {
      border:1px solid #f0d1af; border-radius:10px;
      background:#fff; color:#804600; padding:5px 9px;
    }
    #arhDetailPortal .arh-modal {
      width:min(1120px,100%); max-height:min(92vh,960px);
      overflow-y:auto; overflow-x:hidden; padding:28px 32px;
      scrollbar-width:thin; scrollbar-color:#d3c4b6 #fff; scrollbar-gutter:stable;
    }
    #arhDetailPortal .arh-modalTop {
      display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.18fr) auto;
      gap:20px; align-items:start; padding-bottom:22px; border-bottom:1px solid #e5e8e3;
    }
    #arhDetailPortal .arh-articleKind {
      font-size:11px; font-weight:850; text-transform:uppercase;
      letter-spacing:.09em; color:#a6530b;
    }
    #arhDetailPortal .arh-modalName { margin:8px 0 14px; line-height:1.1; }
    #arhDetailPortal .arh-articleFacts {
      grid-column:2; display:grid; grid-template-columns:repeat(2,minmax(0,1fr));
      gap:10px 18px; margin:0; padding:14px 16px;
      border-radius:15px; background:#f5f6f2;
    }
    #arhDetailPortal .arh-articleFacts dt {
      font-size:10px; font-weight:800; color:#606760;
    }
    #arhDetailPortal .arh-articleFacts dd {
      margin:3px 0 0; font-size:13px; line-height:1.45; overflow-wrap:anywhere;
    }
    #arhDetailPortal .arh-modalClose { grid-column:3; width:42px; }
    #arhDetailPortal .arh-viewSwitch {
      border-bottom:1px solid #e5e8e3; gap:16px; margin:14px 0 0;
    }
    #arhDetailPortal .arh-viewSwitch button { min-height:40px; }
    #arhDetailPortal .arh-reading {
      max-width:78ch; margin:20px 0 0; font-size:16px; line-height:1.7;
    }
    #arhDetailPortal .arh-reading p {
      margin:0 0 14px; white-space:pre-line; overflow-wrap:anywhere;
    }
    #arhDetailPortal .arh-riskBasis {
      max-width:78ch; color:#626962; font-size:13px; line-height:1.55;
    }
    @media(max-width:720px) {
      #arhDetailPortal .arh-modal {
        max-height:94vh; max-height:94dvh;
        padding:16px 15px calc(18px + env(safe-area-inset-bottom));
      }
      #arhDetailPortal .arh-modalTop {
        grid-template-columns:minmax(0,1fr) auto; gap:10px; padding-bottom:14px;
      }
      #arhDetailPortal .arh-articleFacts {
        grid-column:1/-1; grid-row:2; gap:8px 12px; padding:10px;
      }
      #arhDetailPortal .arh-modalClose { grid-column:2; grid-row:1; }
      #arhDetailPortal .arh-reading { font-size:15px; }
    }
  `;
  document.head.appendChild(editorialStyles);
  
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
