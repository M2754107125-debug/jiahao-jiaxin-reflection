export const VERSION='JX-50 · 0.2 生活情境版';
export const LABELS=['从不','很少','有时','经常','几乎总是'];
export const BOUNDARIES={
 approval:'只想普通、低风险、信息够用且能自己决定的小事。不包括共同决定、审批、安全规则、专业建议或核查照片像不像本人。询问信息和自愿请人帮忙，本身不计作确认依赖。',
 expression:'只想对当前事实的陈述和明确、合理的交流边界。不把自拍、爱好、强烈表达、知情玩笑或学习计划算作问题；紧急提醒和制止伤害也不算场景错配。',
 narrative:'只想能观察到结果、且有机会调整方法的事。按新事实改主意是正常调整；喜欢自己的努力本身不计分。',
 perspective:'只想对方能够自由表达意愿、安全沟通的场景。尊重他人的拒绝，也保留自己的边界；不要求你服从不合理要求。',
 defense:'只想具体、可信、可以安全核查的反馈。辱骂和骚扰不是建议。关于标签的那一题仅在你把它当成全部自我时计入，不因被人嘲笑就加分。',
 context:'这里只记录外部发生了什么，不判断你有没有问题，也不计入五维或总倾向分。没有发生可选从不；记不清或无法判断可选不适用。'
};
export const DIMENSIONS=[
 {id:'approval',name:'确认依赖',short:'确认',color:'#c18c43',pole:['自主 A','确认 Q'],desc:'有自己的判断后，是否仍把决定权交给别人的认可。',low:'能听取意见，同时保留自己的理由与选择权。',high:'回答提示：他人的认可可能较多地影响你的安心感与决定。',question:'我需要的是新信息，还是别人替我盖章？',steps:['先写下自己的选择和一个理由，再向别人询问信息。','把“你觉得可以吗”改成“哪一点不合适，依据是什么”。','每天完成一个低风险的小决定，允许意见不同。'],metric:'记录自主完成的低风险决定次数；不以别人是否同意作为成败标准。',keep:'继续保留咨询习惯，同时能解释自己的最终选择。'},
 {id:'expression',name:'表达与场景失配',short:'表达',color:'#db7e63',desc:'想传达的形象，是否与事实、场合及实际承诺协调。',low:'表达通常能够结合场景，也较少超出实际支撑。',high:'回答提示：某些表达可能比事实支撑或场景需要走得更远。',question:'这次表达要完成什么，它是否需要这样强的姿态？',steps:['发出内容前，写一句真正想传达的意思。','把表达里的声称与能证实的事实逐一对照。','向可信的人问“你实际理解到什么”，只调整有依据的误差。'],metric:'记录核对过的表达，以及意图与实际理解的差别；不统计点赞。',keep:'继续表达喜欢的东西，只对具体声称和场景负责。'},
 {id:'narrative',name:'叙事与现实脱节',short:'叙事',color:'#9383b7',pole:['现实 R','叙事 N'],desc:'是否因为花了心思，就忽略事情的实际结果。',low:'能珍惜自己的感受，也能用结果检验方法。',high:'回答提示：投入和自我叙事有时可能盖过实际效果。',question:'如果不讲自己的付出故事，结果本身说明什么？',steps:['把“我付出了什么”和“实际发生了什么”分成两列。','为一件投入中的事选择一个可观察结果，而非只看辛苦程度。','发现方法无效时做一次小调整，给自己保留改变的空间。'],metric:'记录根据结果调整方法的次数，以及一次“情绪真实但推断需修正”的例子。',keep:'保留被努力打动的能力，同时让事实参与决定。'},
 {id:'perspective',name:'他者视角缺口',short:'他者',color:'#55978d',pole:['共视 T','单视 P'],desc:'在付出、表达或冲突时，是否承认对方有独立需要与拒绝权。',low:'较能同时看见自己的需要与对方的选择。',high:'回答提示：自己的意图可能有时替代了对方真实的意愿。',question:'这是对方表达的需要，还是我替对方想好的需要？',steps:['行动前问一句“你希望我怎么做”，不替对方回答。','用自己的话复述对方的意思，再请对方确认。','练习接受一个不同意，同时用清楚的语言说明自己的边界。'],metric:'记录核实需求的次数；检查是否允许对方拒绝，也允许自己拒绝。',keep:'继续核实需要；尊重对方不等于取消自己的边界。'},
 {id:'defense',name:'反馈与防御',short:'反馈',color:'#6088ab',pole:['开放 O','防御 R'],desc:'是否把一次挫折当成自己全盘失败，或跳过反馈里的事实。',low:'能够筛选反馈，较少被一次否定全面带走。',high:'回答提示：分歧可能容易触发退缩、强硬反驳或对自我的否定。',question:'这句话里有可核查的信息吗？它并不等于对整个人的判决。',steps:['先暂停回复，等情绪缓和后把“事实、猜测、攻击”分开。','只选一条具体、可信的反馈核查，不接受笼统羞辱。','写一个反例：一次被否定，并没有抹掉我的其他能力。'],metric:'记录核查过的反馈和避免全盘自我否定的例子；不要求自己接受每条批评。',keep:'保持开放，也继续拒绝无依据的羞辱和控制。'}
];
// reverse=true：保护性表述；其频率越高，倾向分越低。
const BANK=[
 [
  [
   "买东西时，我已想清楚买它的理由，还是只有别人肯定后才敢买。",
   false
  ],
  [
   "问别人意见前，我会先想清楚自己想选什么。",
   true
  ],
  [
   "朋友意见相反时，我会按自己的需要比较两个选择。",
   true
  ],
  [
   "别人只说“不好”，我就放弃自己原来想选的东西。",
   false
  ],
  [
   "别人没回答“这样行吗”，我会反复问到有人肯定为止。",
   false
  ],
  [
   "听了建议后，我能说出自己采纳它的具体理由。",
   true
  ],
  [
   "为了让不同的人都认可我，我会来回改变自己说喜欢什么。",
   false
  ],
  [
   "做完一个普通的小决定后，只有别人夸我，我才觉得选对了。",
   false
  ],
  [
   "听完不同意见，我会按自己的理由作出最后决定。",
   true
  ]
 ],
 [
  [
   "说起自己的成绩时，我会为了显得厉害，把成绩说大一些。",
   false
  ],
  [
   "在工作群发内容前，我会想一下它是否和这个群的事情有关。",
   true
  ],
  [
   "介绍自己会做什么时，我会说明哪些已经会了、哪些还在学。",
   true
  ],
  [
   "为了让人觉得我很能干，我会答应自己做不到的事。",
   false
  ],
  [
   "聊天时，对方已明确说不想听这个话题，我仍继续讲。",
   false
  ],
  [
   "发现别人误会了我的意思，我会问清楚他实际听懂了什么。",
   true
  ],
  [
   "我会照搬网上受欢迎的说法，发到明显不相关的聊天里。",
   false
  ],
  [
   "为了保住“我很擅长”的形象，我会隐瞒自己做错的重要部分。",
   false
  ],
  [
   "别人理解错了我的意思后，我会换个说法讲清楚。",
   true
  ]
 ],
 [
  [
   "一件事反复没有进展时，我会因为已经花了很多时间而继续照原办法做。",
   false
  ],
  [
   "事情做完后，我会看实际结果是否达到原来的目标。",
   true
  ],
  [
   "发现事实和自己说的不一样时，我会改正原来的说法。",
   true
  ],
  [
   "我会因为自己很努力，就认定做事的方法一定有效。",
   false
  ],
  [
   "谈到没做好的事，我会只讲自己多辛苦，跳过结果的问题。",
   false
  ],
  [
   "很喜欢一个想法时，我也会看看有没有事实支持它。",
   true
  ],
  [
   "别人指出结果有问题时，我会用“我已经很用心了”结束讨论。",
   false
  ],
  [
   "有人拿出方法无效的具体结果时，我会因为怕丢面子而避开这些结果。",
   false
  ],
  [
   "一个办法反复不管用时，我会试着换一个办法。",
   true
  ]
 ],
 [
  [
   "想帮别人时，我会直接替他安排，没有先问他想不想要。",
   false
  ],
  [
   "替别人报名活动前，我会先问他愿不愿意参加。",
   true
  ],
  [
   "朋友拒绝我的邀请时，我会接受他的决定。",
   true
  ],
  [
   "我会因为自己付出了很多，就要求对方照我的安排做。",
   false
  ],
  [
   "意见不同时，我会认定对方按我的选择做才是对他好。",
   false
  ],
  [
   "争论时，我会先确认自己有没有听懂对方的理由。",
   true
  ],
  [
   "对方已经说“不需要”，我还会继续替他做决定。",
   false
  ],
  [
   "对方没有按我期待的方式感谢我时，我会要求他重新回应。",
   false
  ],
  [
   "讨论共同安排时，我会给对方留下选择其他方案的机会。",
   true
  ]
 ],
 [
  [
   "别人提出不同意见时，我会先反驳，之后才看他说的依据。",
   false
  ],
  [
   "有人批评我时，我会先看他有没有指出具体的问题。",
   true
  ],
  [
   "一个想法被否定后，我仍能看到自己其他做得好的地方。",
   true
  ],
  [
   "一件小事做得不顺时，我会觉得自己什么都不行。",
   false
  ],
  [
   "别人指出我做错的地方时，我会直接认定他嫉妒我。",
   false
  ],
  [
   "建议只有一部分有道理时，我会只采纳有依据的那部分。",
   true
  ],
  [
   "听到“你就是这种人”后，我会把这个说法当成对自己的全部定义。",
   false
  ],
  [
   "为了避开不同意见，我会只找肯定我的人讨论。",
   false
  ],
  [
   "气消以后，我会再看刚才的意见有没有事实依据。",
   true
  ]
 ]
];
const CONTEXT=[
 "我发兴趣或成果时，有人用“装”“嘉豪／嘉欣”等称呼嘲笑我。",
 "别人评论我的内容时，只骂人或起哄，没有说哪里有问题。",
 "我把同一内容发到不同群里，得到的评价明显不同。",
 "我身边有人会嘲笑别人的小众爱好。",
 "有人把我的内容截图传出去，省掉了原来的说明。"
];

// 概念检查清单，不是概率公式；tags 不增加权重，也不作为独立量表。
export const THEORY={
 "A": "主体性：听取意见后仍按理由决定",
 "U": "自我不确定：反复怀疑自己的判断",
 "B": "身份不稳定：为认可来回改变自我说法",
 "V": "稳定自我价值：一次失败不等于整个人没价值",
 "X": "自我与他者失配：意图与对方实际需要有差别",
 "C": "校准误差：解释与事实有差别",
 "M": "理解他人：核实需要、意愿与拒绝权",
 "F": "反馈整合：核查依据后决定是否调整",
 "D": "确认依赖：反复需要肯定才能安心或决定",
 "L": "标签内化：把他人的标签当成自己的全部",
 "E": "表达强度：仅在夸大或场景错配情境下讨论",
 "G": "声称与证据缺口：说自己能做到与实际做到的差别",
 "S": "场景错配：忽略明确的场景需要或意愿"
};
const MAPPING={
 "approval": [
  [
   "D",
   "U"
  ],
  [
   "A"
  ],
  [
   "A"
  ],
  [
   "A",
   "D"
  ],
  [
   "D",
   "U"
  ],
  [
   "A",
   "F"
  ],
  [
   "B",
   "U"
  ],
  [
   "D",
   "V"
  ],
  [
   "A"
  ]
 ],
 "expression": [
  [
   "G",
   "E"
  ],
  [
   "S"
  ],
  [
   "G"
  ],
  [
   "G"
  ],
  [
   "S",
   "X"
  ],
  [
   "C",
   "X"
  ],
  [
   "S",
   "E"
  ],
  [
   "G",
   "B"
  ],
  [
   "C",
   "X"
  ]
 ],
 "narrative": [
  [
   "C",
   "F"
  ],
  [
   "C"
  ],
  [
   "C",
   "F"
  ],
  [
   "C"
  ],
  [
   "C"
  ],
  [
   "C"
  ],
  [
   "C",
   "F"
  ],
  [
   "B",
   "C"
  ],
  [
   "F",
   "C"
  ]
 ],
 "perspective": [
  [
   "M",
   "X"
  ],
  [
   "M"
  ],
  [
   "M"
  ],
  [
   "M",
   "X"
  ],
  [
   "M",
   "X"
  ],
  [
   "M",
   "C"
  ],
  [
   "M"
  ],
  [
   "X",
   "M"
  ],
  [
   "M",
   "A"
  ]
 ],
 "defense": [
  [
   "F"
  ],
  [
   "F"
  ],
  [
   "V"
  ],
  [
   "U",
   "V"
  ],
  [
   "F",
   "C"
  ],
  [
   "F",
   "A"
  ],
  [
   "L",
   "V"
  ],
  [
   "F"
  ],
  [
   "F",
   "C"
  ]
 ]
};
export const QUESTIONS=[];
let ci=0;
for(let r=0;r<9;r++){
 for(let d=0;d<5;d++)QUESTIONS.push({key:`${DIMENSIONS[d].id}-${r+1}`,dim:DIMENSIONS[d].id,text:BANK[d][r][0],reverse:BANK[d][r][1],tags:MAPPING[DIMENSIONS[d].id][r]});
 if([1,3,5,7,8].includes(r))QUESTIONS.push({key:`context-${++ci}`,dim:'context',text:CONTEXT[ci-1],reverse:false,tags:['环境记录：不计核心分']});
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
 const numeric=QUESTIONS.filter(q=>q.dim!=='context').map(q=>answers[q.key]).filter(valid);
 const responseCounts=LABELS.map((label,i)=>({label,n:numeric.filter(v=>v===i).length}));
 const uniform=numeric.length>=40&&new Set(numeric).size===1;
 const priority=eligible?[...dimensions].sort((a,b)=>b.value-a.value).filter(d=>d.value>=40).slice(0,2):[];
 const coded=dimensions.filter(d=>d.pole).map(d=>({...d,code:d.value===null?'?':d.value>=45&&d.value<=55?d.pole.map(p=>p.split(' ')[1]).join('/'):d.pole[d.value>55?1:0].split(' ')[1]}));
 let path='相对协调型';
 if(!eligible)path='暂不生成类型';
 else if(priority.length){
  const top=priority[0];const names={approval:'确认寻求型',expression:'表达错位型',narrative:'叙事沉浸型',perspective:'视角单向型',defense:'防御收缩型'};
  path=priority.length===2&&Math.abs(priority[0].value-priority[1].value)<=5?'混合倾向型':names[top.id];
 }
 return {dimensions,n,total,responseCounts,context,contextN:ctx.length,answered,uniform,eligible,priority,coded,path};
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
