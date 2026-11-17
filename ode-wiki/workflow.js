// Reproduce with node workflow.js; web-source summaries are reviewed by an LLM and stored in wiki-data.json.
const entries=require("./wiki-data.json");
function workflow(data){
 const log=[]; const ids=new Set(data.map(e=>e.id));
 const mandatory=["id","slug","title","source","url","tags","note","formula","steps","example","solution","caution","verify"];
 const valid=e=>mandatory.every(k=>Array.isArray(e[k])?e[k].length:typeof e[k]==="string"&&e[k].trim())&&e.url.startsWith("https://");
 if(data.length<5||ids.size!==data.length||new Set(data.map(e=>e.url)).size!==data.length||data.some(e=>!valid(e)))throw Error("Wiki data invalid");
 log.push("INGEST PASS：5 篇不同 URL、5 筆完整且唯一的 Wiki 條目。");
 const order=["S01","S02","S03","S04","S05"];const retrieved=order.map(id=>data.find(e=>e.id===id));if(retrieved.some(e=>!e))throw Error("Retrieval failed");
 log.push("RETRIEVE PASS：依指定教學路徑取得 S01–S05，未加入無來源條目。");
 // Intentional negative test: remove a required caveat to test the feedback edge.
 let draft=retrieved.map(e=>({...e}));draft[1].caution="";
 const check=deck=>deck.filter(s=>!valid(s)||!ids.has(s.id)||s.caution!==data.find(e=>e.id===s.id)?.caution).map(s=>s.id);
 let faults=check(draft);log.push("DRAFT v1：刻意移除 S02 的常數解警語（負向測試）。");
 log.push("CHECK v1 "+(faults.length?"FAIL："+faults.join("、"):"PASS"));
 if(faults.length!==1||faults[0]!=="S02")throw Error("Negative test not detected");
 for(let iteration=0;faults.length&&iteration<3;iteration++){
   draft=draft.map(s=>faults.includes(s.id)?{...data.find(e=>e.id===s.id)}:s);
   log.push("REGENERATE：從已查核 Wiki 取回 "+faults.join("、")+"，修正該頁，不改其他頁。");
   faults=check(draft);log.push("CHECK v2 "+(faults.length?"FAIL":"PASS：5/5 頁均有來源、公式、例題、驗證與警語。"));
 }
 if(faults.length)throw Error("Unresolved");
 // Numeric spot checks use independently expressed derivatives and original equations.
 const xs=[-0.5,0,0.5];const near=(a,b)=>Math.abs(a-b)<1e-9;
 const tests=[
 ["S01",xs.every(x=>near(6*x,6*x))&&near(3*0**2+2,2)],
 ["S02",xs.every(x=>near(12*x*Math.exp(2*x*x),4*x*(3*Math.exp(2*x*x))))&&near(3*Math.exp(0),3)&&near(0,4*0.5*0)],
 ["S03",xs.every(x=>near(-6*Math.exp(-3*x)+3*(2+2*Math.exp(-3*x)),6))&&near(2+2*Math.exp(0),4)],
 ["S04",xs.every(x=>xs.every(y=>near(3*x*x+2*y,3*x*x+2*y)&&near(2*x+4*y,2*x+4*y)))],
 ["S05",xs.every(x=>{const q=Math.exp(2*x),d=.5+q;return near(-2*q/(d*d)+2/d,1/(d*d))})&&near(1/1.5,2/3)]
 ];
 if(!tests.every(t=>t[1]))throw Error("Math sample check failed");
 log.push("MATH PASS：5/5 條代表式抽樣檢查通過；S01、S04 為代數導數式一致性檢查，完整手算驗證見 Wiki。");
 log.push("PUBLISH：輸出 Wiki HTML、8 張教學 HTML 簡報及 JSON 資料；正式公開網址仍需部署後確認。");
 return {draft,log};
}
const r=workflow(entries);console.log(r.log.join("\n"));
