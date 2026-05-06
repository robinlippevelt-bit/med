import { INCIDENTS, INCIDENT_LIST, generateProcedure } from './data.js';

const state = { incidentId: '', data: {} };
const commonKeys = ['suspect','adam','unites','lieu','poste','miranda','demande_boire_manger','demande_avocat','demande_soins','fouille','nom_avocat','procureur_present','nom_procureur','decision_type','montant_final','libere','heure_sortie'];

const $ = (id) => document.getElementById(id);
const incidentSelect = $('incidentSelect');
const formArea = $('formArea');
const emptyHint = $('emptyHint');
const reportEl = $('report');
const reportBlock = $('reportBlock');

INCIDENT_LIST.forEach(i => incidentSelect.add(new Option(i.label, i.id)));
incidentSelect.addEventListener('change', () => setIncident(incidentSelect.value));
$('copyBtn').addEventListener('click', copyReport);
$('sendBtn').addEventListener('click', () => toast('Rapport marqué comme envoyé.'));

function setIncident(id) {
  state.incidentId = id;
  if (!id) return render();
  const incident = INCIDENTS[id];
  const old = state.data;
  const data = {};
  commonKeys.forEach(k => { if (old[k]) data[k] = old[k]; });
  Object.assign(data, {
    poste: data.poste || 'Roxwood', miranda: data.miranda || 'compris_acceptes',
    demande_boire_manger: data.demande_boire_manger || 'Oui', demande_avocat: data.demande_avocat || 'Non',
    demande_soins: data.demande_soins || 'Non', procureur_present: data.procureur_present || 'Oui',
    decision_type: data.decision_type || 'amende_directe', libere: data.libere || 'Oui'
  });
  incident.contextFields.forEach(f => { data[f.key] = old[f.key] || f.defaultValue || ''; });
  state.data = data;
  render();
}

function setField(key, value) {
  state.data[key] = value;
  updateReportOnly();
}

function setFieldAndRender(key, value) {
  state.data[key] = value;
  render();
}

function updateReportOnly() {
  reportEl.textContent = fullReport();
}

function render() {
  const incident = state.incidentId ? INCIDENTS[state.incidentId] : null;
  emptyHint.classList.toggle('hidden', !!incident);
  formArea.classList.toggle('hidden', !incident);
  reportBlock.classList.toggle('hidden', !incident);
  if (!incident) { formArea.innerHTML = ''; reportEl.textContent = ''; return; }
  formArea.innerHTML = sectionsHTML(incident);
  bindInputs();
  reportEl.textContent = fullReport();
}

function sectionsHTML(incident) {
  return `
  <details open><summary class="section-title">▸ IDENTIFICATION</summary><div class="pad line"><div class="fields">
    ${input('suspect','Nom du suspect','Ex: John DOE')}
    ${input('adam','Code unité (Adam/Tango/Mary)','Ex: Adam 24')}
    ${input('unites','Numéros des agents','Ex: 24 et 12')}
    ${input('lieu',"Lieu de l'intervention",'Ex: Sandy Shores')}
  </div></div></details>
  <details open><summary class="section-title">▸ CONTEXTE DE L'INTERVENTION</summary><div class="pad line"><div class="fields">
    ${incident.contextFields.map(fieldHTML).join('')}
  </div></div></details>
  <details open><summary class="section-title">▸ PROCÉDURE AU POSTE</summary><div class="pad line"><div class="fields">
    ${select('poste','Poste de police',['Roxwood','Sandy Shores','Paleto Bay','Davis','Mission Row'])}
    ${selectObj('miranda','Droits Miranda',{compris_acceptes:'Compris et acceptés',compris_pas_utiliser:"Compris, n'a pas utilisé ses droits",compris_silence:'Compris, garde le silence',non_lus:'Non lus (urgence vitale)'})}
    ${select('demande_boire_manger','Demande boire/manger',['Oui','Non'])}
    ${select('demande_avocat','Demande avocat',['Oui','Non'])}
    ${select('demande_soins','Demande soins médicaux',['Oui','Non'])}
    ${textarea('fouille','Objets saisis lors de la fouille (un par ligne)',"Ex:\nX24 Pochon de cocaine\nX25 Pochon de Weed\nX9210 Argent Non tracé",4,'span2')}
  </div></div></details>
  <details open><summary class="section-title">▸ DÉCISION JUDICIAIRE</summary><div class="pad"><div class="fields">
    ${state.data.demande_avocat === 'Oui' ? input('nom_avocat',"Nom de l'avocat",'Ex: Rodriguez') : ''}
    ${select('procureur_present','Procureur présent',['Oui','Non'])}
    ${state.data.procureur_present === 'Oui' ? input('nom_procureur','Nom du procureur','Ex: Williams') : ''}
    ${decisionSelect()}
    ${!['prison','bracelet'].includes(state.data.decision_type) ? input('montant_final','Montant amende / caution ($)','Ex: 45000') : ''}
    ${select('libere','Libéré',['Oui','Non','Bracelet'])}
    ${input('heure_sortie','Heure de sortie','Ex: 22h45')}
  </div></div></details>`;
}

function esc(v='') { return String(v).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function input(key,label,placeholder='',cls='') { return `<div class="${cls}"><label class="form-label">${label}</label><input class="form-input" data-key="${key}" placeholder="${esc(placeholder)}" value="${esc(state.data[key]||'')}"></div>`; }
function textarea(key,label,placeholder='',rows=3,cls='') { return `<div class="${cls}"><label class="form-label">${label}</label><textarea class="form-input" data-key="${key}" rows="${rows}" placeholder="${esc(placeholder)}">${esc(state.data[key]||'')}</textarea></div>`; }
function select(key,label,options,cls='') { return `<div class="${cls}"><label class="form-label">${label}</label><select class="form-input" data-key="${key}">${options.map(o=>`<option value="${esc(o)}" ${state.data[key]===o?'selected':''}>${esc(o)}</option>`).join('')}</select></div>`; }
function selectObj(key,label,options,cls='') { return `<div class="${cls}"><label class="form-label">${label}</label><select class="form-input" data-key="${key}">${Object.entries(options).map(([v,t])=>`<option value="${esc(v)}" ${state.data[key]===v?'selected':''}>${esc(t)}</option>`).join('')}</select></div>`; }
function fieldHTML(f) { return f.type === 'textarea' ? textarea(f.key,f.label,f.placeholder,3,'span2') : f.type === 'select' ? select(f.key,f.label,f.options||[], f.half ? '' : '') : input(f.key,f.label,f.placeholder||'', f.type === 'textarea' ? 'span2' : ''); }
function decisionSelect() {
  const opts = [['amende_directe','Amende directe'], ['caution','Caution'], ['bracelet','Bracelet électronique'], ['prison','Maintien en détention']];
  if (state.data.demande_avocat === 'Oui' && state.data.procureur_present === 'Oui') opts.splice(1,0,['accord','Accord procureur + avocat']);
  if (state.data.procureur_present === 'Oui') opts.splice(1,0,['procureur_seul','Décision procureur seul']);
  return selectObj('decision_type','Type de décision',Object.fromEntries(opts));
}
function bindInputs() {
  formArea.querySelectorAll('input[data-key], textarea[data-key]').forEach(el => {
    el.addEventListener('input', e => setField(e.target.dataset.key, e.target.value));
  });

  formArea.querySelectorAll('select[data-key]').forEach(el => {
    el.addEventListener('change', e => setFieldAndRender(e.target.dataset.key, e.target.value));
  });
}

function generatedDetails() { const incident = INCIDENTS[state.incidentId]; return (incident.generateContext(state.data) + '\n\n' + generateProcedure(state.data)).replace(/\n{3,}/g,'\n\n').trim(); }
function fullReport() { const incident = INCIDENTS[state.incidentId]; if (!incident) return ''; return `NOM\n${state.data.suspect || '[Non renseigné]'}\n\nINCIDENT\n${incident.label}\n\nDÉTAILS\n${generatedDetails()}`; }
async function copyReport() { await navigator.clipboard.writeText(fullReport()); toast('Rapport copié.'); }
function toast(msg) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2000); }
render();
