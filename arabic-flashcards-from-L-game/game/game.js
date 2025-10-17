
let DATA = [];
let score=0, total=0;

async function load() {
  const resp = await fetch('letters.json');
  DATA = await resp.json();
  renderRef();
  newRound();
}

function $(id){return document.getElementById(id)}
function choice(arr){return arr[Math.floor(Math.random()*arr.length)]}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

function cardFor(letter){
  const stage = $('stage');
  stage.innerHTML = '';
  const title = document.createElement('div');
  title.className = 'lettitle';
  title.textContent = letter.transliteration;
  stage.appendChild(title);

  const grid = document.createElement('div'); grid.className='grid';
  const forms = letter.forms || {};
  const imgB = forms.beginning ? `<img src="../assets/${forms.beginning}">` : '<span>—</span>';
  const imgM = forms.middle ? `<img src="../assets/${forms.middle}">` : '<span>—</span>';
  const imgE = forms.end ? `<img src="../assets/${forms.end}">` : '<span>—</span>';
  grid.innerHTML = `<div class="box">${imgB}</div><div class="box">${imgM}</div><div class="box">${imgE}</div>`;
  stage.appendChild(grid);
  const labels = document.createElement('div');
  labels.className = 'forms-labels';
  labels.innerHTML = '<div>Beginning</div><div>Middle</div><div>End</div>';
  stage.appendChild(labels);

  if (letter.connected){
    const conn = document.createElement('div');
    conn.className = 'connected';
    conn.innerHTML = `<img src="../assets/${letter.connected}">`;
    stage.appendChild(conn);
  }
}

function quizName(){
  total++;
  $('score').textContent = `${score} / ${total-1}`;
  const stage = $('stage'); stage.innerHTML='';
  const L = choice(DATA);
  // prefer middle form for ambiguity, else any available form
  const formPath = L.forms.middle || L.forms.beginning || L.forms.end;
  const prompt = document.createElement('div');
  prompt.className = 'box'; prompt.style.minHeight='200px';
  prompt.innerHTML = formPath ? `<img src="../assets/${formPath}">` : '<span>No form image</span>';
  stage.appendChild(prompt);

  const opts = shuffle([L, ...shuffle(DATA.filter(x=>x!==L)).slice(0,3)]);
  const answers = document.createElement('div'); answers.className='answers';
  opts.forEach(o=>{
    const b = document.createElement('button'); b.className='answerbtn'; b.textContent = o.transliteration;
    b.onclick = ()=>grade(b, o===L);
    answers.appendChild(b);
  });
  stage.appendChild(answers);
}

function quizForm(){
  total++;
  $('score').textContent = `${score} / ${total-1}`;
  const stage = $('stage'); stage.innerHTML='';
  const L = choice(DATA);
  const title = document.createElement('div'); title.className='lettitle'; title.textContent = L.transliteration;
  stage.appendChild(title);

  const kinds = ['beginning','middle','end'];
  const ask = choice(kinds);
  const askLabel = document.createElement('div'); askLabel.style.color='#6b7280'; askLabel.textContent = `Pick the ${ask} form`;
  stage.appendChild(askLabel);

  const shown = shuffle(['beginning','middle','end']);
  const grid = document.createElement('div'); grid.className='grid';

  shown.forEach(kind=>{
    const b = document.createElement('button');
    b.className='box';
    const src = L.forms[kind];
    b.innerHTML = src ? `<img src="../assets/${src}">` : '<span>—</span>';
    b.onclick = ()=>grade(b, kind===ask);
    grid.appendChild(b);
  });
  stage.appendChild(grid);
}

function grade(button, ok){
  if (button.classList.contains('correct') || button.classList.contains('wrong')) return;
  Array.from(button.parentElement.querySelectorAll('button')).forEach(b=>b.disabled=true);
  if (ok){ button.classList.add('correct'); score++; } else { button.classList.add('wrong'); }
  $('score').textContent = `${score} / ${total}`;
}

function renderRef(){
  const ref = $('ref'); ref.innerHTML='';
  DATA.forEach(L=>{
    const item = document.createElement('div'); item.className='refitem';
    item.innerHTML = `<h3>${L.transliteration}</h3>`;
    const grid = document.createElement('div'); grid.className='grid';
    const b = L.forms.beginning ? `<img src="../assets/${L.forms.beginning}">` : '<span>—</span>';
    const m = L.forms.middle ? `<img src="../assets/${L.forms.middle}">` : '<span>—</span>';
    const e = L.forms.end ? `<img src="../assets/${L.forms.end}">` : '<span>—</span>';
    grid.innerHTML = `<div class="box">${b}</div><div class="box">${m}</div><div class="box">${e}</div>`;
    item.appendChild(grid);
    ref.appendChild(item);
  });
}

function newRound(){
  const mode = $('mode').value;
  if (mode==='study') { score=0; total=0; $('score').textContent='0 / 0'; cardFor(choice(DATA)); }
  if (mode==='quiz-name') quizName();
  if (mode==='quiz-form') quizForm();
}

$('next').onclick = newRound;
$('mode').onchange = newRound;
load();
