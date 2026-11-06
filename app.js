'use strict';
const KEY='business-ai-v9-demo-1';
const $=id=>document.getElementById(id);
let state;
try {state=JSON.parse(localStorage.getItem(KEY))}catch{}
if(!state||!Array.isArray(state.entries)||!Array.isArray(state.trades))state={entries:[],trades:[]};
const cents=n=>Math.round(Number(n)*100);
const euro=n=>(n/100).toLocaleString('de-DE',{style:'currency',currency:'EUR'});
function save(){localStorage.setItem(KEY,JSON.stringify(state));render()}
function totals(){let revenue=0,cost=0,reserve=0,refund=0;for(const e of state.entries){if(e.type==='sale')revenue+=e.amount;if(e.type==='cost')cost+=e.amount;if(e.type==='reserve')reserve+=e.amount;if(e.type==='refund')refund+=e.amount}const profit=Math.max(0,revenue-cost-reserve-refund);const budget=Math.floor(profit*0.30);const spent=state.trades.reduce((n,t)=>n+t.buy,0);return {revenue,profit,budget,remaining:Math.max(0,budget-spent)}}
function text(tag,value,cls){const el=document.createElement(tag);el.textContent=value;if(cls)el.className=cls;return el}
function records(id,items,make){const target=$(id);target.replaceChildren();if(!items.length){target.append(text('p','Noch keine Demo-Einträge.','empty'));return}for(const item of [...items].reverse()){const row=text('div','','record');const left=text('div','');left.append(text('strong',item.label));left.append(text('small',make(item).subtitle));row.append(left,text('strong',make(item).value));target.append(row)}}
function render(){const t=totals();for(const k of ['revenue','profit','budget','remaining'])$(k).textContent=euro(t[k]);const labels={sale:'Demo-Verkauf',cost:'Demo-Kosten',reserve:'Demo-Rückstellung',refund:'Demo-Rückerstattung'};records('entries',state.entries,e=>({subtitle:labels[e.type],value:(e.type==='sale'?'+':'−')+euro(e.amount)}));records('trades',state.trades,t=>({subtitle:'Demo-Kauf · Zielverkauf '+euro(t.sell),value:euro(t.buy)}))}
document.querySelectorAll('[data-tab]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b===button));document.querySelectorAll('.page').forEach(p=>p.classList.toggle('hidden',p.id!==button.dataset.tab))}));
$('entryForm').addEventListener('submit',e=>{e.preventDefault();const amount=cents($('entryAmount').value);if(!Number.isSafeInteger(amount)||amount<=0||amount>1000000000)return alert('Bitte gültigen Betrag eingeben.');state.entries.push({type:$('entryType').value,label:$('entryLabel').value.trim(),amount});save();e.target.reset()});
$('tradeForm').addEventListener('submit',e=>{e.preventDefault();const buy=cents($('buyPrice').value),sell=cents($('sellPrice').value),t=totals();let message='';if(!Number.isSafeInteger(buy)||!Number.isSafeInteger(sell)||buy<=0||sell<=0)message='Ungültige Beträge.';else if(buy>2500)message='Gesperrt: Maximal 25 € je Einkauf.';else if(sell<=buy)message='Gesperrt: Keine positive Bruttomarge.';else if(buy>t.remaining)message='Gesperrt: Nicht genügend verfügbares Demo-Handelsbudget.';else if(!$('rights').checked||!$('approve').checked)message='Gesperrt: Prüfung und Freigabe fehlen.';else{state.trades.push({label:$('itemName').value.trim(),buy,sell});save();message='Simulierter Einkauf gespeichert. Es wurde nichts gekauft.';e.target.reset()}$('tradeMessage').textContent=message});
$('reset').addEventListener('click',()=>{if(confirm('Alle lokalen Demo-Buchungen und Demo-Einkäufe löschen?')){state={entries:[],trades:[]};save();$('tradeMessage').textContent=''}});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
