// Install playwright locally or set PLAYWRIGHT_MODULE to its package directory.
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {QUESTIONS,score} from '../model.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:8765/';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try {
 for(const width of [390,1440]) for(const mode of ['grouped','mixed']) {
  const ctx=await browser.newContext({viewport:{width,height:844},acceptDownloads:true});
  const page=await ctx.newPage(), errors=[], requests=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('requestfailed',r=>errors.push(r.url()+': '+r.failure().errorText));
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  page.on('request',r=>requests.push(r.url()));
  await page.goto(base); await page.locator('[data-action="start"]').click();
  if(mode==='mixed') await page.locator('[data-mode="mixed"]').click();
  const answers=Object.fromEntries(QUESTIONS.map((q,i)=>[q.key,(i*i+3)%5]));
  for(let i=0;i<(mode==='grouped'?6:10);i++) {
   const inputs=await page.locator('input[data-question]').evaluateAll(es=>[...new Set(es.map(e=>e.dataset.question))]);
   for(const key of inputs) await page.locator(`input[data-question="${key}"][value="${answers[key]}"]`).check();
   await page.locator('[data-action="next"]').click();
  }
  assert.equal((await page.locator('.score-number').innerText()).replace(/\s/g,''),`${Number(score(answers).total.toFixed(1))}/100`);
  assert.equal(await page.locator('.dimension-card').count(),5);
  assert.equal(await page.locator('[data-day]').count(),14);
  assert.equal(await page.evaluate(()=>localStorage.length),0);
  await page.reload(); await page.locator('.score-number').waitFor();
  const dl=page.waitForEvent('download'); await page.locator('[data-action="download"]').click(); assert.ok((await dl).suggestedFilename());
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'horizontal overflow');
  assert.ok(requests.every(u=>new URL(u).origin===new URL(base).origin),'external network request');
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({base,width,mode,questions:50,score:Number(score(answers).total.toFixed(1)),dimensions:5,planDays:14,refresh:true,export:true,defaultLocalStorageEmpty:true,externalRequests:0,errors}));
  await ctx.close();
 }
} finally {await browser.close()}
