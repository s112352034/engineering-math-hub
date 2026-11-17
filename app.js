"use strict";
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
const $=id=>document.getElementById(id);
const topicLink=id=>`topic.html?id=${encodeURIComponent(id)}`;
function tags(t){const r=el('div',undefined,'tagrow');r.append(el('span',t.category,'tag'),el('span',t.difficulty,'difficulty'));return r;}
function home(){
  const cats=[...new Set(TOPICS.map(t=>t.category))];let active='全部';const filters=$('filters');
  $('total').textContent=String(TOPICS.length).padStart(2,'0');$('categories').textContent=String(cats.length).padStart(2,'0');
  function render(){const q=$('search').value.trim().toLowerCase();const found=TOPICS.filter(t=>(active==='全部'||t.category===active)&&[t.title,t.category,t.summary,t.concept,t.formula].join(' ').toLowerCase().includes(q));
    $('result-count').textContent=`顯示 ${found.length} / ${TOPICS.length} 個學習主題`;$('cards').replaceChildren();
    if(!found.length){$('cards').append(el('p','沒有符合的單元，請更換關鍵字或分類。','empty'));return;}
    for(const t of found){const a=el('a',undefined,'card');a.href=topicLink(t.id);a.append(tags(t),el('h3',t.title),el('p',t.summary),el('span','閱讀教材 →','read'));$('cards').append(a);}
  }
  for(const c of ['全部',...cats]){const b=el('button',c);b.type='button';b.setAttribute('aria-pressed',String(c===active));b.addEventListener('click',()=>{active=c;for(const other of filters.children)other.setAttribute('aria-pressed',String(other===b));render();});filters.append(b);}
  $('search').addEventListener('input',render);render();
}
function section(title,cls){const s=el('section',undefined,`lesson${cls?' '+cls:''}`);s.append(el('h2',title));return s;}
function detail(){const t=TOPICS.find(x=>x.id===new URLSearchParams(location.search).get('id'));const root=$('topic');if(!t){root.append(el('h1','找不到此單元'),el('p','請返回首頁選擇有效的教材。'));return;}
  document.title=`${t.title}｜Engineering Math Hub`;root.append(tags(t),el('h1',t.title),el('p',t.summary,'intro'));
  let s=section('01｜核心觀念');s.append(el('p',t.concept),el('div',t.formula,'formula'));root.append(s);
  s=section('02｜解題步驟');const ol=el('ol');for(const step of t.steps)ol.append(el('li',step));s.append(ol);root.append(s);
  s=section('03｜原創例題');s.append(el('p',t.example.question,'question'),el('p',t.example.solution,'solution'));root.append(s);
  s=section('04｜常見錯誤','warning');s.append(el('p',t.mistake));root.append(s);
  s=section('05｜自我練習');s.append(el('p',t.practice.question,'question'));const d=el('details');d.append(el('summary','展開參考答案'),el('p',t.practice.answer));s.append(d);root.append(s);
  const next=TOPICS[(TOPICS.indexOf(t)+1)%TOPICS.length];const a=el('a',`下一個單元：${next.title} →`,'detail-next');a.href=topicLink(next.id);root.append(a);
}
if(document.body.dataset.page==='home')home();else detail();
