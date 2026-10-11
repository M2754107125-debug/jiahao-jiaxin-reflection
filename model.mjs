export const VERSION='JX-50 · 0.1 探索版';
export const LABELS=['从不','很少','有时','经常','几乎总是'];
export const DIMENSIONS=[
 {id:'approval',name:'确认依赖',short:'确认',color:'#c18c43',pole:['自主 A','确认 V'],desc:'有自己的判断后，是否仍把决定权交给别人的认可。',low:'能听取意见，同时保留自己的理由与选择权。',high:'回答提示：他人的认可可能较多地影响你的安心感与决定。',question:'我需要的是新信息，还是别人替我盖章？',steps:['先写下自己的选择和一个理由，再向别人询问信息。','把“你觉得可以吗”改成“哪一点不合适，依据是什么”。','每天完成一个低风险的小决定，允许意见不同。'],metric:'记录自主完成的低风险决定次数；不以别人是否同意作为成败标准。',keep:'继续保留咨询习惯，同时能解释自己的最终选择。'},
 {id:'expression',name:'表达与场景失配',short:'表达',color:'#db7e63',desc:'想传达的形象，是否与事实、场合及实际承诺协调。',low:'表达通常能够结合场景，也较少超出实际支撑。',high:'回答提示：某些表达可能比事实支撑或场景需要走得更远。',question:'这次表达要完成什么，它是否需要这样强的姿态？',steps:['发出内容前，写一句真正想传达的意思。','把表达里的声称与能证实的事实逐一对照。','向可信的人问“你实际理解到什么”，只调整有依据的误差。'],metric:'记录核对过的表达，以及意图与实际理解的差别；不统计点赞。',keep:'继续表达喜欢的东西，只对具体声称和场景负责。'},
 {id:'narrative',name:'叙事与现实脱节',short:'叙事',color:'#9383b7',pole:['现实 R','叙事 N'],desc:'是否把“我很用心、很感动”当成方法有效或判断正确的证据。',low:'能珍惜自己的感受，也能用结果检验方法。',high:'回答提示：投入和自我叙事有时可能盖过实际效果。',question:'如果不讲自己的付出故事，结果本身说明什么？',steps:['把“我付出了什么”和“实际发生了什么”分成两列。','为一件投入中的事选择一个可观察结果，而非只看辛苦程度。','发现方法无效时做一次小调整，给自己保留改变的空间。'],metric:'记录根据结果调整方法的次数，以及一次“情绪真实但推断需修正”的例子。',keep:'保留被努力打动的能力，同时让事实参与决定。'},
 {id:'perspective',name:'他者视角缺口',short:'他者',color:'#55978d',pole:['共视 T','单视 S'],desc:'在付出、表达或冲突时，是否承认对方有独立需要与拒绝权。',low:'较能同时看见自己的需要与对方的选择。',high:'回答提示：自己的意图可能有时替代了对方真实的意愿。',question:'这是对方表达的需要，还是我替对方想好的需要？',steps:['行动前问一句“你希望我怎么做”，不替对方回答。','用自己的话复述对方的意思，再请对方确认。','练习接受一个不同意，同时用清楚的语言说明自己的边界。'],metric:'记录核实需求的次数；检查是否允许对方拒绝，也允许自己拒绝。',keep:'继续核实需要；尊重对方不等于取消自己的边界。'},
 {id:'defense',name:'反馈与防御',short:'反馈',color:'#6088ab',pole:['开放 O','防御 D'],desc:'面对分歧时，是否容易回避、全盘否定自己或拒绝核查意见。',low:'能够筛选反馈，较少被一次否定全面带走。',high:'回答提示：分歧可能容易触发退缩、强硬反驳或对自我的否定。',question:'这句话里有可核查的信息吗？它并不等于对整个人的判决。',steps:['先暂停回复，等情绪缓和后把“事实、猜测、攻击”分开。','只选一条具体、可信的反馈核查，不接受笼统羞辱。','写一个反例：一次被否定，并没有抹掉我的其他能力。'],metric:'记录核查过的反馈和避免全盘自我否定的例子；不要求自己接受每条批评。',keep:'保持开放，也继续拒绝无依据的羞辱和控制。'}
];
// reverse=true：保护性表述；其频率越高，倾向分越低。
const BANK=[
 [
  ['即使已经有了偏好的选择，我仍要得到亲近的人的肯定才敢决定。',false],
  ['向别人征求意见前，我能先说清自己的初步判断。',true],
  ['两个人给出相反意见时，我会按自己的目标重新比较。',true],
  ['别人只说“不好”却没有理由，我也会立刻放弃原来的选择。',false],
  ['一个决定没有得到回应时，我会反复向人询问能不能做。',false],
  ['听完有道理的建议后，我能说明自己为什么采纳它。',true],
  ['为了避免不被认可，我会放弃本来喜欢、也不会伤害别人的表达。',false],
  ['做完一个普通的小决定后，我仍需要别人肯定才能安心。',false],
  ['即使亲近的人意见不同，我也能作出有理由的最终选择。',true]
 ],
 [
  ['为了显得更厉害，我会把实际完成的事讲得更夸张。',false],
  ['在不同场合表达同一件事时，我会考虑场合的需要。',true],
  ['展示自己的成果时，我会把已做到的和仍在尝试的分开说明。',true],
  ['为了维持某种形象，我会作出自己没有把握兑现的承诺。',false],
  ['别人已明确提醒场合不合适，我仍继续原来的表现方式。',false],
  ['发现别人误解了我的表达时，我会先核对误解发生在哪里。',true],
  ['模仿一种受欢迎的表达方式时，我会忽略它是否适合当前场景。',false],
  ['为了维持人设，我会省略与这个形象不一致的重要事实。',false],
  ['表达被误解后，我能调整方式，同时保留真正想说的内容。',true]
 ],
 [
  ['投入了很多时间后，即使效果不好，我仍觉得方法不应改变。',false],
  ['复盘一件事时，我会分别记录自己的付出和实际效果。',true],
  ['发现事实与原来的解释不一致时，我能修改自己的说法。',true],
  ['当我被自己的努力打动时，我会把这当成方法有效的证明。',false],
  ['评价一次行动时，我更强调自己多辛苦，而不去查看实际结果。',false],
  ['一件事让我很感动时，我仍会核查自己对它的判断。',true],
  ['别人指出结果有问题时，我会用“我已经这么用心了”结束讨论。',false],
  ['为了维持“我是一个很努力的人”的形象，我会回避无效付出的证据。',false],
  ['发现方法不奏效时，我能更换方法，而不把它当作否定自己。',true]
 ],
 [
  ['帮助别人时，我会先按自己的想法做，而没有核实对方是否需要。',false],
  ['为别人安排一件事之前，我会询问对方的实际意愿。',true],
  ['别人拒绝我的好意时，我能尊重这个选择。',true],
  ['因为自己付出了很多，我会认为对方应该接受我的安排。',false],
  ['发生分歧时，我会直接用自己的标准替对方判断什么对其最好。',false],
  ['意见不同时，我会先确认自己是否理解了对方的理由。',true],
  ['对方明确说不需要后，我仍会以“为你好”为由继续。',false],
  ['对方没有表现出我期待的感激时，我会要求其按我的方式回应。',false],
  ['我能同时说清自己的需要，并允许对方有不同的需要。',true]
 ],
 [
  ['收到不同意见时，我会先反驳，再去看具体依据。',false],
  ['面对批评时，我会区分具体建议和单纯嘲讽。',true],
  ['一个想法被否定后，我仍能承认自己其他方面的价值。',true],
  ['一次表达被人笑话后，我会长时间避免类似表达。',false],
  ['别人指出问题时，我会不核实就认定对方是在嫉妒我。',false],
  ['面对有依据的意见，我能接受其中一部分，而不必全盘照做。',true],
  ['对方的一次否定，会让我觉得自己整个人都不值得被喜欢。',false],
  ['为了不听到不同意见，我会避开可能提供不同看法的人。',false],
  ['情绪平复后，我会重新检查刚才不愿意听的意见有没有道理。',true]
 ]
];
const CONTEXT=[
 '我在表达兴趣或展示成果时，被别人用“装”“嘉豪／嘉欣”等称呼嘲笑。',
 '别人评价我的表达时，只留下贬低或起哄，没有提供具体依据。',
 '同一份表达换到不同圈子后，收到明显不同的评价。',
 '我身边的人会用嘲讽阻止别人表达与群体不同的兴趣。',
 '我的内容被脱离原来的场景转述、截图或评价。'
];
export const QUESTIONS=[];
let ci=0;
for(let r=0;r<9;r++){
 for(let d=0;d<5;d++)QUESTIONS.push({key:`${DIMENSIONS[d].id}-${r+1}`,dim:DIMENSIONS[d].id,text:BANK[d][r][0],reverse:BANK[d][r][1]});
 if([1,3,5,7,8].includes(r))QUESTIONS.push({key:`context-${++ci}`,dim:'context',text:CONTEXT[ci-1],reverse:false});
}
QUESTIONS.forEach((q,i)=>q.number=i+1);
export function valid(v){return Number.isInteger(v)&&v>=0&&v<=4;}
export function risk(q,v){return valid(v)?q.reverse?4-v:v:null;}
export function score(answers={}){
 const dimensions=DIMENSIONS.map(d=>{
  const items=QUESTIONS.filter(q=>q.dim===d.id);
  const responded=items.filter(q=>valid(answers[q.key]));
  const raw=responded.reduce((s,q)=>s+risk(q,answers[q.key]),0);
  const value=responded.length>=7?raw/(4*responded.length)*100:null;
  return {...d,n:responded.length,total:9,value,evidence:responded.filter(q=>risk(q,answers[q.key])>=3).sort((a,b)=>risk(b,answers[b.key])-risk(a,answers[a.key])).slice(0,2)};
 });
 const n=dimensions.reduce((s,d)=>s+d.n,0);
 const eligible=n>=40&&dimensions.every(d=>d.value!==null);
 const total=eligible?dimensions.reduce((s,d)=>s+d.value,0)/5:null;
 const ctx=QUESTIONS.filter(q=>q.dim==='context'&&valid(answers[q.key]));
 const context=ctx.length>=3?ctx.reduce((s,q)=>s+answers[q.key],0)/(4*ctx.length)*100:null;
 const answered=QUESTIONS.filter(q=>valid(answers[q.key])||answers[q.key]==='na').length;
 const numeric=QUESTIONS.map(q=>answers[q.key]).filter(valid);
 const uniform=numeric.length>=40&&new Set(numeric).size===1;
 const priority=eligible?[...dimensions].sort((a,b)=>b.value-a.value).filter(d=>d.value>=40).slice(0,2):[];
 const coded=dimensions.filter(d=>d.pole).map(d=>({...d,code:d.value===null?'?':d.value>=45&&d.value<=55?d.pole.map(p=>p.split(' ')[1]).join('/'):d.pole[d.value>55?1:0].split(' ')[1]}));
 let path='相对协调型';
 if(!eligible)path='暂不生成类型';
 else if(priority.length){
  const top=priority[0];const names={approval:'确认寻求型',expression:'表达错位型',narrative:'叙事沉浸型',perspective:'视角单向型',defense:'防御收缩型'};
  path=priority.length===2&&Math.abs(priority[0].value-priority[1].value)<=5?'混合倾向型':names[top.id];
 }
 return {dimensions,n,total,context,contextN:ctx.length,answered,uniform,eligible,priority,coded,path};
}
export function labelFor(gender){return gender==='male'?'嘉豪':gender==='female'?'嘉欣':'表达失衡';}
export function band(value){return value<25?'较少出现':value<50?'偶尔出现':value<75?'较常出现':'频繁出现';}
export function makePlan(result){
 if(!result.eligible)return [];
 const targets=result.priority.length?result.priority:[result.dimensions.slice().sort((a,b)=>a.value-b.value)[0]];
 const first=targets[0],second=targets[1]||first;
 return Array.from({length:14},(_,i)=>{
  const d=i<7?first:second,k=i%7;
  const tasks=[`选一个与“${d.name}”相关的真实事件。记录事实、自己的目标、当时的感受。`,d.steps[0],d.steps[1],`用一个小事件练习：${d.steps[2]}`,`回到这句话：${d.question} 写下至少一个替代解释。`,`再选一个不同场景，重复一次本周练习。允许做得不完美。`,`复盘：${d.metric} 写下有效的一步和下一次要改变的一步。`];
  return {day:i+1,dimension:d.name,title:['记录起点','保留自己的理由','核查一个依据','做一次小实验','寻找另一种解释','换场景练习','复盘与调整'][k],task:tasks[k]};
 });
}
