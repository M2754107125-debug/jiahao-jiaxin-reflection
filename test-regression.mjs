// Run with Node.js: node test-regression.mjs. Synthetic answers only; no dependencies.
import assert from 'node:assert/strict';
import {QUESTIONS,DIMENSIONS,VERSION,score,risk,makePlan,THEORY} from './model.mjs';
const directional=v=>Object.fromEntries(QUESTIONS.map(q=>[q.key,q.reverse?4-v:v]));
const uniform=v=>Object.fromEntries(QUESTIONS.map(q=>[q.key,v]));
assert.equal(QUESTIONS.length,50);assert.equal(DIMENSIONS.length,5);
for(const d of DIMENSIONS){const qs=QUESTIONS.filter(q=>q.dim===d.id);assert.equal(qs.length,9);assert.equal(qs.filter(q=>q.reverse).length,4);}
for(const q of QUESTIONS)assert.ok(q.tags.length);
assert.equal(Object.keys(THEORY).length,13);
for(const [v,expected] of [[0,0],[1,25],[2,50],[3,75],[4,100]])assert.equal(score(directional(v)).total,expected);
for(let v=0;v<=4;v++)assert.ok(Math.abs(score(uniform(v)).total-(400+25*v)/9)<1e-10);
const base=directional(0),q=QUESTIONS[0];base[q.key]=1;
assert.ok(Math.abs(score(base).total-100/180)<1e-10);assert.equal(risk(q,1),1);
const rev=QUESTIONS.find(q=>q.reverse);base[rev.key]=3;
assert.ok(Math.abs(score(base).total-200/180)<1e-10);assert.equal(risk(rev,3),1);
for(const invalid of [undefined,null,'',NaN,'2','na',-1,5])assert.equal(risk(q,invalid),null);
const labels=directional(0);QUESTIONS.filter(q=>q.dim==='context').forEach(q=>labels[q.key]=4);
assert.equal(score(labels).total,0);assert.equal(score(labels).context,100);
const partial=directional(3);QUESTIONS.filter(q=>q.dim==='approval').forEach(q=>partial[q.key]='na');
assert.equal(score(partial).total,null);assert.equal(score(partial).dimensions[0].value,null);assert.equal(score(partial).dimensions[1].value,75);
assert.equal(score({}).total,null);assert.equal(score(uniform('na')).total,null);assert.equal(score(uniform('na')).context,null);
const mixed=Object.fromEntries(QUESTIONS.map((q,i)=>[q.key,(i*i+3)%5]));
assert.equal(makePlan(score(mixed)).length,14);
console.log('MODEL: directional 0/1/2/3/4 => 0/25/50/75/100; same option => 44.4/47.2/50/52.8/55.6; one changed item => +0.556; label-only change => core 0, context100; NA => null.');
const local=new Map(),session=new Map(),elements=new Map(),handlers={};let dialog,serial=0,downloaded=[];
const node=()=>({innerHTML:'',textContent:'',disabled:false,hidden:false,style:{},firstElementChild:{style:{}},classList:{add(){},remove(){},toggle(){}},setAttribute(){},focus(){},addEventListener(){},click(){if(this.href)downloaded.push(this.download);}});
const app=node();elements.set('#app',app);
globalThis.document={querySelector:k=>{if(!elements.has(k))elements.set(k,node());return elements.get(k);},addEventListener:(k,f)=>handlers[k]=f,createElement(tag){const n=node();if(tag==='dialog'){dialog=n;const buttons={};n.querySelector=k=>buttons[k]??(buttons[k]={});n.showModal=()=>{};n.close=()=>{};n.remove=()=>{};}return n;},body:{append(){}}};
globalThis.window={scrollTo(){},print(){}};
const storage=m=>({getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)});
globalThis.localStorage=storage(local);globalThis.sessionStorage=storage(session);
globalThis.setTimeout=()=>0;globalThis.clearTimeout=()=>{};
const load=()=>import(`./app.mjs?test=${serial++}`);
const action=a=>handlers.click({target:{closest:s=>s==='[data-action]'?{dataset:{action:a}}:null}});
const mode=m=>handlers.click({target:{closest:s=>s==='[data-mode]'?{dataset:{mode:m}}:null}});
const respond=(q,v)=>handlers.change({target:{value:String(v),dataset:{question:q.key}}});
const answerAll=answers=>{action('start');for(const q of QUESTIONS)respond(q,answers[q.key]);action('result');};
const total=v=>assert.match(app.innerHTML,new RegExp(`${v}<small>/100`));
await load();answerAll(directional(0));total(0);assert.equal((app.innerHTML.match(/data-day=/g)||[]).length,14);
action('toggle-save');assert.equal(local.size,1);
action('edit');respond(QUESTIONS[0],1);action('result');total('0.6');
mode('mixed');assert.match(app.innerHTML,/混合题组/);mode('grouped');action('result');total('0.6');
await load();total('0.6'); // same-tab refresh
session.clear();await load();total('0.6'); // optional persistent recovery
// Explicit restart clears previous answers; same device can produce different scores.
action('restart');dialog.querySelector('[data-confirm]').onclick();assert.equal(local.size,0);assert.equal(session.size,0);
assert.match(app.innerHTML,/已回应 0 \/ 50/);answerAll(directional(4));total(100);
action('edit');for(const q of QUESTIONS)respond(q,2);action('result');total(50);assert.match(app.innerHTML,/相互抵消/);
action('edit');for(const q of QUESTIONS)respond(q,mixed[q.key]);action('result');total(Number(score(mixed).total.toFixed(1)));
action('download');action('backup');assert.equal(downloaded.length,2);
action('edit');for(const q of QUESTIONS)respond(q,partial[q.key]);action('result');assert.match(app.innerHTML,/部分结果/);assert.match(app.innerHTML,/75 \/ 100/);assert.doesNotMatch(app.innerHTML,/score-number/);
action('edit');for(const q of QUESTIONS)respond(q,'na');action('result');assert.match(app.innerHTML,/先用具体事件了解自己/);assert.doesNotMatch(app.innerHTML,/score-number|>0 \/ 100|50<small>/);
await load();assert.match(app.innerHTML,/先用具体事件了解自己/);
action('clear');dialog.querySelector('[data-confirm]').onclick();assert.equal(local.size,0);assert.equal(session.size,0);assert.match(app.innerHTML,/开始自我观察/);
await load();assert.match(app.innerHTML,/开始自我观察/);
// Invalid values cannot become zero through Number(''), and unknown keys cannot enter saved answers.
action('start');respond(QUESTIONS[0],'');respond({key:'unknown'},3);assert.equal(session.size,1);assert.deepEqual(JSON.parse([...session.values()][0]).answers,{});
// A changed questionnaire never silently applies historic answers to new questions.
local.clear();session.clear();local.set('jiahao-jiaxin-jx50-v1',JSON.stringify({version:'JX-50 · 0.1 探索版',answers:directional(2),gender:'male',save:true}));await load();assert.match(app.innerHTML,/旧版记录未用于新题计分/);assert.match(app.innerHTML,/开始自我观察/);assert.doesNotMatch(app.innerHTML,/score-number/);
action('method');assert.match(app.innerHTML,/JI≈/);assert.match(app.innerHTML,/L/);assert.match(app.innerHTML,/完整50题/);
console.log(`FLOW: actual input handlers => 0,0.6,100,50,${Number(score(mixed).total.toFixed(1))}; grouped/mixed preserve; session/local refresh preserve; restart/clear reset; partial/all-NA render; old version ignored with notice; report/backup export pass.`);
console.log('PASS: all deterministic regression checks.');
