/* Application shell: routing, block rendering, quizzes, progress roll-up. */

const App = (() => {
  const el = Activities.el, esc = Activities.esc;
  const $ = s => document.querySelector(s);
  let track = null;

  const trackById = id => COURSE.tracks.find(t => t.id === id) || COURSE.tracks[0];

  /* ------------------------------------------------------------- toast */
  let toastT;
  function toast(msg){
    const t = $('#toast');
    t.textContent = msg; t.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('on'), 2400);
  }

  /* ---------------------------------------------------------- progress */
  function moduleComplete(t, mod){
    const acts = Activities.countFor(mod);
    if(acts.total > 0 && acts.done < acts.total) return false;
    const cfu = (mod.blocks || []).filter(b => b.type === 'cfu');
    for(const c of cfu){
      const s = Store.get(t.id, `cfu.${mod.id}`, null);
      if(!s || !s.done) return false;
    }
    return true;
  }
  function trackProgress(t){
    const mods = t.modules;
    const done = mods.filter(m => moduleComplete(t, m)).length;
    const q = Store.quiz(t.id);
    const totalUnits = mods.length + 1;                      // + knowledge check
    const doneUnits = done + (q && q.submitted ? 1 : 0);
    return { done, total: mods.length, pct: Math.round(doneUnits / totalUnits * 100), quiz: q };
  }
  function refreshChrome(){
    if(!track) return;
    const p = trackProgress(track);
    $('#pbar').style.width = p.pct + '%';
  }
  Activities.onChange.push(() => { refreshChrome(); });

  /* ----------------------------------------------------------- iceberg */
  function iceberg(){
    const w = el('div','bergwrap');
    w.innerHTML = `
<svg viewBox="0 0 800 460" role="img" aria-label="The culture iceberg: a small visible tip above the waterline, and a much larger hidden mass below.">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--surface)"/><stop offset="100%" stop-color="var(--accent-soft)"/>
    </linearGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--accent)" stop-opacity=".16"/>
      <stop offset="100%" stop-color="var(--accent)" stop-opacity=".34"/>
    </linearGradient>
    <linearGradient id="tip" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#D6E4F2"/>
    </linearGradient>
    <linearGradient id="mass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#AFC7DE"/><stop offset="100%" stop-color="#6E90B4"/>
    </linearGradient>
  </defs>
  <rect width="800" height="132" fill="url(#sky)"/>
  <rect y="132" width="800" height="328" fill="url(#sea)"/>
  <polygon points="400,26 330,130 470,130" fill="url(#tip)" stroke="#B9CCE0" stroke-width="1.5"/>
  <polygon points="330,130 470,130 560,232 512,330 430,420 336,392 246,300 268,196"
           fill="url(#mass)" opacity=".92" stroke="#5F82A8" stroke-width="1.5"/>
  <polygon points="400,26 400,130 330,130" fill="#FFFFFF" opacity=".55"/>
  <polygon points="400,130 470,130 560,232 400,232" fill="#FFFFFF" opacity=".1"/>
  <line x1="0" y1="132" x2="800" y2="132" stroke="var(--accent)" stroke-width="2.5" opacity=".85"/>
  <text x="30" y="58"  font-size="19" font-weight="700" fill="var(--ink)" font-family="inherit">VISIBLE · 10%</text>
  <text x="30" y="82"  font-size="13.5" fill="var(--ink-3)" font-family="inherit">Language · Dress · Food · Holidays</text>
  <text x="30" y="101" font-size="13.5" fill="var(--ink-3)" font-family="inherit">Working hours · Formality</text>
  <text x="30" y="186" font-size="19" font-weight="700" fill="var(--ink)" font-family="inherit">HIDDEN · 90%</text>
  <text x="30" y="212" font-size="13.5" fill="var(--ink-2)" font-family="inherit">Values — what matters most</text>
  <text x="30" y="234" font-size="13.5" fill="var(--ink-2)" font-family="inherit">Assumptions we take for granted</text>
  <text x="30" y="256" font-size="13.5" fill="var(--ink-2)" font-family="inherit">Beliefs about hierarchy &amp; authority</text>
  <text x="30" y="278" font-size="13.5" fill="var(--ink-2)" font-family="inherit">Attitudes to time, age and status</text>
  <text x="30" y="300" font-size="13.5" fill="var(--ink-2)" font-family="inherit">What counts as rude or respectful</text>
  <text x="30" y="322" font-size="13.5" fill="var(--ink-2)" font-family="inherit">Attitudes to disagreement</text>
  <text x="30" y="344" font-size="13.5" fill="var(--ink-2)" font-family="inherit">How shame, pride and dignity work</text>
  <text x="30" y="366" font-size="13.5" fill="var(--ink-2)" font-family="inherit">What silence means</text>
  <text x="596" y="126" font-size="12" font-weight="700" fill="var(--accent)" font-family="inherit">WATERLINE</text>
</svg>`;
    return w;
  }

  /* ------------------------------------------------------------ blocks */
  function renderBlock(b, mod){
    switch(b.type){
      case 'lead':    return el('p','lead', esc(b.text));
      case 'p':       return el('p', null, esc(b.text));
      case 'h':       return el('h3','h-sub', esc(b.text));
      case 'note':    return el('p','note', esc(b.text));
      case 'disclaimer': return el('div','disclaimer', esc(b.text));
      case 'smenote': return el('div','smenote', esc(b.text));
      case 'quote':   return el('div','bq', esc(b.text));
      case 'iceberg': return iceberg();
      case 'callout': {
        const d = el('div', 'callout ' + (b.variant || 'insight'));
        d.appendChild(el('h4', null, esc(b.title)));
        d.appendChild(el('p', null, esc(b.text)));
        return d;
      }
      case 'compare': {
        const d = el('div','compare');
        [['left', b.left], ['right', b.right]].forEach(([, side]) => {
          const p = el('div', 'cpanel ' + (side.tone || ''));
          p.appendChild(el('h4', null, esc(side.title)));
          const ul = el('ul');
          side.items.forEach(i => ul.appendChild(el('li', null, esc(i))));
          p.appendChild(ul); d.appendChild(p);
        });
        return d;
      }
      case 'columns': {
        const d = el('div','cols');
        b.cols.forEach(c => {
          const p = el('div','col');
          p.appendChild(el('h4', null, `${c.flag ? c.flag + ' ' : ''}${esc(c.title)}`));
          const ul = el('ul');
          c.items.forEach(i => ul.appendChild(el('li', null, esc(i))));
          p.appendChild(ul); d.appendChild(p);
        });
        return d;
      }
      case 'summary': {
        const d = el('div','summary');
        b.items.forEach(i => {
          const r = el('div','srow');
          const t = el('div');
          t.appendChild(el('b', null, esc(i.t)));
          t.appendChild(el('p', null, esc(i.d)));
          r.appendChild(t); d.appendChild(r);
        });
        return d;
      }
      case 'countrycards': {
        const d = el('div','ccards');
        b.cards.forEach(c => {
          const p = el('div','ccard');
          p.appendChild(el('div','f', c.flag));
          p.appendChild(el('b', null, esc(c.name)));
          p.appendChild(el('p', null, esc(c.text)));
          d.appendChild(p);
        });
        return d;
      }
      case 'protocol': {
        const d = el('div','protocol');
        d.appendChild(el('h4', null, esc(b.title)));
        const ol = el('ol');
        b.items.forEach(i => {
          const li = el('li');
          li.appendChild(el('b', null, esc(i.l)));
          li.appendChild(el('span', null, esc(i.d)));
          ol.appendChild(li);
        });
        d.appendChild(ol); return d;
      }
      case 'matrix': {
        const w = el('div','tablewrap');
        const t = el('table','mx');
        const thead = el('thead'), tr = el('tr');
        b.headers.forEach(h => tr.appendChild(el('th', null, esc(h))));
        thead.appendChild(tr); t.appendChild(thead);
        const tb = el('tbody');
        b.rows.forEach(r => {
          const row = el('tr');
          r.forEach(c => row.appendChild(el('td', null, esc(c))));
          tb.appendChild(row);
        });
        t.appendChild(tb); w.appendChild(t); return w;
      }
      case 'pressure': {
        const d = el('div');
        b.windows.forEach(win => {
          const p = el('div','pwin');
          const h = el('div','ph');
          h.appendChild(el('b', null, esc(win.name)));
          h.appendChild(el('em', null, esc(win.when)));
          p.appendChild(h);
          p.appendChild(el('p','eff', esc(win.effect)));
          p.appendChild(el('div','fix', esc(win.fix)));
          d.appendChild(p);
        });
        return d;
      }
      case 'checklist': {
        const d = el('div','checklist');
        d.appendChild(el('h4', null, esc(b.title)));
        const saved = Store.get(track.id, `chk.${b.id}`, []) || [];
        const ul = el('ul');
        b.items.forEach((i, ix) => {
          const li = el('li');
          const cb = el('input'); cb.type = 'checkbox'; cb.checked = saved.includes(ix);
          cb.addEventListener('change', () => {
            const cur = Store.get(track.id, `chk.${b.id}`, []) || [];
            const next = cb.checked ? [...new Set([...cur, ix])] : cur.filter(x => x !== ix);
            Store.set(track.id, `chk.${b.id}`, next);
          });
          const lb = el('label'); lb.style.cursor = 'pointer'; lb.textContent = i;
          li.appendChild(cb); li.appendChild(lb);
          li.addEventListener('click', e => { if(e.target !== cb){ cb.checked = !cb.checked; cb.dispatchEvent(new Event('change')); } });
          ul.appendChild(li);
        });
        d.appendChild(ul); return d;
      }
      case 'reflect':  return reflect(b);
      case 'activity': return Activities.render(b.activity);
      case 'cfu':      return cfu(b, mod);
      default: {
        const d = el('div'); d.textContent = ''; return d;
      }
    }
  }

  /* --------------------------------------------------------- reflection */
  function reflect(b){
    const d = el('div','reflect');
    const id = 'ta-' + b.id;
    const lb = el('label', null, esc(b.prompt)); lb.setAttribute('for', id);
    d.appendChild(lb);
    if(b.hint) d.appendChild(el('div','rhint', esc(b.hint)));
    const ta = el('textarea');
    ta.id = id; ta.rows = b.lines || 4;
    ta.placeholder = 'Your answer is saved automatically…';
    ta.value = Store.txt(track.id, b.id) || '';
    const saved = el('div','rsaved','Saved');
    let t;
    ta.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        Store.setTxt(track.id, b.id, ta.value);
        saved.classList.add('on');
        setTimeout(() => saved.classList.remove('on'), 1200);
      }, 400);
    });
    ta.addEventListener('blur', () => Store.setTxt(track.id, b.id, ta.value));
    d.appendChild(ta); d.appendChild(saved);

    if(b.reveal){
      const wrap = el('div','reveal');
      const btn = el('button','btn ghost sm'); btn.textContent = 'Show a model answer';
      btn.addEventListener('click', () => {
        btn.remove();
        const rb = el('div','revealbox');
        rb.appendChild(el('h5', null, esc(b.reveal.title)));
        rb.appendChild(el('div','rtext', esc(b.reveal.text)));
        if(b.reveal.note) rb.appendChild(el('p','rnote', esc(b.reveal.note)));
        wrap.appendChild(rb);
      });
      wrap.appendChild(btn); d.appendChild(wrap);
    }
    return d;
  }

  /* ---------------------------------------------- check for understanding */
  function cfu(b, mod){
    const d = el('div','quiz');
    d.appendChild(el('div','atype','◆ Check for understanding'));
    const skey = `cfu.${mod.id}`;
    const st = Store.get(track.id, skey, null) || { answers:{}, done:false };
    const nodes = [];

    b.questions.forEach((q, qi) => {
      const item = el('div','qitem');
      const qq = el('div','qq');
      qq.appendChild(el('span','qn', String(qi+1)));
      qq.appendChild(el('span', null, esc(q.q)));
      item.appendChild(qq);
      const opts = el('div','qopts');
      const optNodes = [];
      q.options.forEach((o, oi) => {
        const lab = el('label','qopt');
        const inp = el('input'); inp.type = 'radio'; inp.name = `${mod.id}-${qi}`; inp.value = oi;
        if(st.answers[qi] === oi){ inp.checked = true; lab.classList.add('sel'); }
        inp.addEventListener('change', () => {
          st.answers[qi] = oi;
          Store.set(track.id, skey, st);                    // incremental save
          optNodes.forEach(n => n.classList.remove('sel'));
          lab.classList.add('sel');
        });
        lab.appendChild(inp);
        lab.appendChild(el('span', null, esc(o)));
        optNodes.push(lab); opts.appendChild(lab);
      });
      item.appendChild(opts);
      d.appendChild(item);
      nodes.push({ item, optNodes, q, qi });
    });

    const f = el('div','act-foot');
    const status = el('div','act-status');
    const btn = el('button','btn'); btn.textContent = 'Check my answers';
    f.appendChild(status); f.appendChild(btn); d.appendChild(f);

    function mark(){
      let right = 0;
      nodes.forEach(({ item, optNodes, q, qi }) => {
        const a = st.answers[qi];
        optNodes.forEach((n, oi) => {
          n.classList.remove('sel','ok','no');
          if(oi === q.answer) n.classList.add('ok');
          else if(oi === a) n.classList.add('no');
          n.querySelector('input').disabled = true;
        });
        if(a === q.answer) right++;
        if(!item.querySelector('.qwhy')){
          const w = el('div', 'qwhy' + (a === q.answer ? '' : ' no'));
          w.appendChild(el('b', null, a === q.answer ? '✓ Correct' : '✕ Not quite'));
          w.appendChild(el('span', null, esc(q.why)));
          item.appendChild(w);
        }
      });
      status.textContent = `${right} of ${b.questions.length} correct`;
      status.className = 'act-status ' + (right === b.questions.length ? 'ok' : '');
      btn.remove();
    }

    btn.addEventListener('click', () => {
      if(Object.keys(st.answers).length < b.questions.length){
        status.textContent = 'Answer every question first';
        status.className = 'act-status bad';
        return;
      }
      st.done = true;
      Store.set(track.id, skey, st);
      mark(); refreshChrome();
    });
    if(st.done) mark();
    return d;
  }

  /* ---------------------------------------------------------- screens */
  function screen(id){
    document.querySelectorAll('.screen').forEach(s => s.classList.toggle('on', s.id === id));
    window.scrollTo({ top:0, behavior:'instant' in window ? 'instant' : 'auto' });
  }

  function renderHome(){
    const c = $('#home'); c.textContent = '';
    const hero = el('div','hero');
    hero.appendChild(el('div','eyebrow','Self-paced programme'));
    hero.appendChild(el('h1', null, esc(COURSE.title)));
    hero.appendChild(el('p','sub', esc(COURSE.subtitle)));
    hero.appendChild(el('div','regions','Philippines · India · Sri Lanka · United States'));
    c.appendChild(hero);

    const nb = el('div','namebox');
    nb.appendChild(el('label', null, 'Your name (for your certificate)'));
    const inp = el('input'); inp.type = 'text'; inp.placeholder = 'e.g. Alex Morgan';
    inp.value = Store.name(); inp.id = 'learnername';
    inp.addEventListener('input', () => Store.setName(inp.value));
    nb.appendChild(inp);
    nb.appendChild(el('p','hint','Stored only in this browser. Nothing is sent anywhere.'));
    c.appendChild(nb);

    c.appendChild(el('div','seclabel','Choose your track'));
    const g = el('div','trackgrid');
    COURSE.tracks.forEach(t => {
      const p = trackProgress(t);
      const card = el('button', 'trackcard ' + t.id);
      card.appendChild(el('div','tk', esc(t.audience)));
      card.appendChild(el('h3', null, esc(t.name)));
      card.appendChild(el('p', null, esc(t.subtitle)));
      const meta = el('div','meta');
      const mins = t.modules.reduce((s,m) => s + (m.minutes||0), 0);
      meta.appendChild(el('span', null, `${t.modules.length} modules`));
      meta.appendChild(el('span', null, `~${mins} min`));
      meta.appendChild(el('span', null, `${t.knowledgeCheck.length}-question check`));
      card.appendChild(meta);
      const pr = el('div','tprog'); pr.appendChild(el('i'));
      pr.firstChild.style.width = p.pct + '%';
      card.appendChild(pr);
      card.appendChild(el('div','go', p.pct > 0 ? `Continue — ${p.pct}% complete →` : 'Start →'));
      card.addEventListener('click', () => { location.hash = `#/${t.id}`; });
      g.appendChild(card);
    });
    c.appendChild(g);
    screen('home');
  }

  function renderTrack(){
    const c = $('#track'); c.textContent = '';
    const p = trackProgress(track);

    const head = el('div','mhead');
    head.appendChild(el('div','kicker', esc(track.audience)));
    head.appendChild(el('h2', null, esc(track.name)));
    head.appendChild(el('p','tag', esc(track.subtitle)));
    c.appendChild(head);

    const stats = el('div','stats');
    [[`${p.done}/${p.total}`,'Modules done'], [`${p.pct}%`,'Progress'],
     [Store.fmt(Store.elapsed(track.id)),'Time invested'],
     [p.quiz && p.quiz.submitted ? p.quiz.pct + '%' : '—','Knowledge check']]
      .forEach(([v,l]) => {
        const s = el('div','stat');
        s.appendChild(el('b', null, esc(v)));
        s.appendChild(el('span', null, esc(l)));
        stats.appendChild(s);
      });
    c.appendChild(stats);

    const groups = [['pre','Before the session — foundations'],
                    ['core','Core modules'],
                    ['follow','After the session — putting it to work']];
    groups.forEach(([stage, label]) => {
      const mods = track.modules.filter(m => (m.stage || 'core') === stage);
      if(!mods.length) return;
      c.appendChild(el('div','seclabel', label));
      const list = el('div','mlist');
      mods.forEach(m => {
        const i = track.modules.indexOf(m);
        const done = moduleComplete(track, m);
        const card = el('button', 'mcard' + (done ? ' done' : ''));
        card.appendChild(el('div','mnum', done ? '✓' : String(i+1)));
        const t = el('div','mt');
        t.appendChild(el('b', null, esc(m.title)));
        t.appendChild(el('span', null, esc(m.tagline)));
        card.appendChild(t);
        card.appendChild(el('div','mm', `${m.minutes} min`));
        card.addEventListener('click', () => { location.hash = `#/${track.id}/${m.id}`; });
        list.appendChild(card);
      });
      c.appendChild(list);
    });

    c.appendChild(el('div','seclabel','Assessment'));
    const list = el('div','mlist');
    const q = Store.quiz(track.id);
    const kc = el('button','mcard' + (q && q.submitted ? ' done' : ''));
    kc.appendChild(el('div','mnum', q && q.submitted ? '✓' : '★'));
    const kt = el('div','mt');
    kt.appendChild(el('b', null, 'Knowledge check'));
    kt.appendChild(el('span', null, `${track.knowledgeCheck.length} graded questions · ${track.passMark}% to pass`));
    kc.appendChild(kt);
    kc.appendChild(el('div','mm', q && q.submitted ? q.pct + '%' : '—'));
    kc.addEventListener('click', () => { location.hash = `#/${track.id}/check`; });
    list.appendChild(kc);

    const cc = el('button','mcard');
    cc.appendChild(el('div','mnum','🏅'));
    const ct = el('div','mt');
    ct.appendChild(el('b', null, 'Certificate & export'));
    ct.appendChild(el('span', null, 'Download your certificate and a PDF of your answers'));
    cc.appendChild(ct);
    cc.addEventListener('click', () => { location.hash = `#/${track.id}/cert`; });
    list.appendChild(cc);
    c.appendChild(list);

    const reset = el('div'); reset.style.marginTop = '2.5rem'; reset.style.textAlign = 'center';
    const rb = el('button','btn ghost sm'); rb.textContent = 'Reset my progress on this track';
    rb.addEventListener('click', () => {
      if(confirm(`Reset all progress, answers and reflections for "${track.name}"? This cannot be undone.`)){
        Store.resetTrack(track.id); toast('Progress reset'); renderTrack(); refreshChrome();
      }
    });
    reset.appendChild(rb); c.appendChild(reset);
    screen('track');
  }

  function renderModule(mid){
    const i = track.modules.findIndex(m => m.id === mid);
    if(i < 0){ location.hash = `#/${track.id}`; return; }
    const m = track.modules[i];
    const c = $('#module'); c.textContent = '';

    const head = el('div','mhead');
    head.appendChild(el('div','kicker', `Module ${i+1} of ${track.modules.length} · ${m.minutes} min`));
    head.appendChild(el('h2', null, esc(m.title)));
    head.appendChild(el('p','tag', esc(m.tagline)));
    c.appendChild(head);

    m.blocks.forEach(b => c.appendChild(renderBlock(b, m)));

    const nav = el('div','mnav');
    const back = el('button','btn ghost'); back.textContent = '← All modules';
    back.addEventListener('click', () => { location.hash = `#/${track.id}`; });
    nav.appendChild(back);
    nav.appendChild(el('div','sp'));
    if(i > 0){
      const pv = el('button','btn ghost'); pv.textContent = 'Previous';
      pv.addEventListener('click', () => { location.hash = `#/${track.id}/${track.modules[i-1].id}`; });
      nav.appendChild(pv);
    }
    const nx = el('button','btn');
    nx.textContent = i < track.modules.length - 1 ? 'Next module →' : 'Knowledge check →';
    nx.addEventListener('click', () => {
      location.hash = i < track.modules.length - 1
        ? `#/${track.id}/${track.modules[i+1].id}` : `#/${track.id}/check`;
    });
    nav.appendChild(nx);
    c.appendChild(nav);
    screen('module');
  }

  /* ------------------------------------------------- knowledge check */
  function renderCheck(){
    const c = $('#check'); c.textContent = '';
    const qs = track.knowledgeCheck;
    const st = Store.quiz(track.id) || { answers:{}, submitted:false, pct:0 };

    const head = el('div','mhead');
    head.appendChild(el('div','kicker','Graded assessment'));
    head.appendChild(el('h2', null, 'Knowledge check'));
    head.appendChild(el('p','tag', `${qs.length} questions · ${track.passMark}% to pass · answers are revealed after you submit`));
    c.appendChild(head);

    if(st.submitted){ c.appendChild(results(st, qs)); screen('check'); return; }

    c.appendChild(el('div','callout insight',
      `<h4>Before you start</h4><p>Your selections save as you go, so you can leave and come back. Answers and explanations stay hidden until you submit — take it as a real check of what you have learned.</p>`));

    const box = el('div','quiz');
    const nodes = [];
    qs.forEach((q, qi) => {
      const item = el('div','qitem');
      const qq = el('div','qq');
      qq.appendChild(el('span','qn', String(qi+1)));
      qq.appendChild(el('span', null, esc(q.q)));
      item.appendChild(qq);
      const opts = el('div','qopts');
      const optNodes = [];
      q.options.forEach((o, oi) => {
        const lab = el('label','qopt');
        const inp = el('input'); inp.type = 'radio'; inp.name = `kc-${qi}`; inp.value = oi;
        if(st.answers[qi] === oi){ inp.checked = true; lab.classList.add('sel'); }
        inp.addEventListener('change', () => {
          st.answers[qi] = oi;
          Store.setQuiz(track.id, st);                      // incremental save
          optNodes.forEach(n => n.classList.remove('sel'));
          lab.classList.add('sel');
          count();
        });
        lab.appendChild(inp); lab.appendChild(el('span', null, esc(o)));
        optNodes.push(lab); opts.appendChild(lab);
      });
      item.appendChild(opts); box.appendChild(item);
      nodes.push({ item, optNodes, q, qi });
    });

    const f = el('div','act-foot');
    const status = el('div','act-status');
    const btn = el('button','btn'); btn.textContent = 'Submit for grading';
    f.appendChild(status); f.appendChild(btn); box.appendChild(f);
    c.appendChild(box);

    function count(){
      const n = Object.keys(st.answers).length;
      status.textContent = n < qs.length ? `${n} of ${qs.length} answered` : 'All answered — ready to submit';
      status.className = 'act-status' + (n === qs.length ? ' ok' : '');
    }
    count();

    btn.addEventListener('click', () => {
      const n = Object.keys(st.answers).length;
      if(n < qs.length){
        status.textContent = `${qs.length - n} question${qs.length-n===1?'':'s'} left unanswered`;
        status.className = 'act-status bad';
        return;
      }
      let right = 0;
      qs.forEach((q, qi) => { if(st.answers[qi] === q.answer) right++; });
      st.submitted = true;
      st.correct = right;
      st.pct = Math.round(right / qs.length * 100);
      st.at = Date.now();
      Store.setQuiz(track.id, st);
      refreshChrome();
      renderCheck();
    });

    const nav = el('div','mnav');
    const back = el('button','btn ghost'); back.textContent = '← All modules';
    back.addEventListener('click', () => { location.hash = `#/${track.id}`; });
    nav.appendChild(back);
    c.appendChild(nav);
    screen('check');
  }

  function results(st, qs){
    const wrap = el('div');
    const pass = st.pct >= track.passMark;
    const sc = el('div','scorecard');
    sc.appendChild(el('div','scorelbl', pass ? 'Passed' : 'Not yet passed'));
    sc.appendChild(el('div', 'scoreval ' + (pass ? 'pass' : 'fail'), st.pct + '%'));
    sc.appendChild(el('div','scorelbl', `${st.correct} of ${qs.length} correct`));
    sc.appendChild(el('p','scoremsg', pass
      ? 'Your certificate is now unlocked. Review the explanations below — the reasoning matters more than the score.'
      : `You need ${track.passMark}% to unlock the certificate. Review the explanations below, then retake it.`));
    wrap.appendChild(sc);

    const box = el('div','quiz');
    box.appendChild(el('div','atype','◆ Your answers, with explanations'));
    qs.forEach((q, qi) => {
      const item = el('div','qitem');
      const qq = el('div','qq');
      qq.appendChild(el('span','qn', String(qi+1)));
      qq.appendChild(el('span', null, esc(q.q)));
      item.appendChild(qq);
      const opts = el('div','qopts');
      q.options.forEach((o, oi) => {
        const lab = el('label','qopt');
        if(oi === q.answer) lab.classList.add('ok');
        else if(oi === st.answers[qi]) lab.classList.add('no');
        lab.appendChild(el('span', null, esc(o)));
        opts.appendChild(lab);
      });
      item.appendChild(opts);
      const ok = st.answers[qi] === q.answer;
      const w = el('div', 'qwhy' + (ok ? '' : ' no'));
      w.appendChild(el('b', null, ok ? '✓ Correct' : '✕ Not quite'));
      w.appendChild(el('span', null, esc(q.why)));
      item.appendChild(w);
      box.appendChild(item);
    });
    wrap.appendChild(box);

    const row = el('div','actionrow');
    const again = el('button','btn ghost'); again.textContent = 'Retake the check';
    again.addEventListener('click', () => {
      Store.setQuiz(track.id, { answers:{}, submitted:false, pct:0 });
      refreshChrome(); renderCheck();
    });
    row.appendChild(again);
    if(pass){
      const cert = el('button','btn'); cert.textContent = 'Go to my certificate →';
      cert.addEventListener('click', () => { location.hash = `#/${track.id}/cert`; });
      row.appendChild(cert);
    }
    const back = el('button','btn ghost'); back.textContent = 'All modules';
    back.addEventListener('click', () => { location.hash = `#/${track.id}`; });
    row.appendChild(back);
    wrap.appendChild(row);
    return wrap;
  }

  /* ------------------------------------------------------- certificate */
  function renderCert(){
    const c = $('#cert'); c.textContent = '';
    const head = el('div','mhead');
    head.appendChild(el('div','kicker','Completion'));
    head.appendChild(el('h2', null, 'Certificate & export'));
    head.appendChild(el('p','tag','Your certificate, and a PDF of everything you wrote'));
    c.appendChild(head);

    const q = Store.quiz(track.id);
    const p = trackProgress(track);
    const stats = el('div','stats');
    [[`${p.done}/${p.total}`,'Modules done'],
     [Store.fmt(Store.elapsed(track.id)),'Time invested'],
     [q && q.submitted ? q.pct + '%' : '—','Score'],
     [q && q.submitted && q.pct >= track.passMark ? 'Passed' : 'Pending','Status']]
      .forEach(([v,l]) => {
        const s = el('div','stat');
        s.appendChild(el('b', null, esc(v)));
        s.appendChild(el('span', null, esc(l)));
        stats.appendChild(s);
      });
    c.appendChild(stats);

    const name = Store.name().trim();
    const passed = q && q.submitted && q.pct >= track.passMark;

    if(!name){
      c.appendChild(el('div','locked','Add your name on the home screen to generate your certificate.'));
    }
    if(!passed){
      c.appendChild(el('div','locked',
        `Complete the knowledge check with at least ${track.passMark}% to unlock your certificate. You can still export a PDF of your answers below.`));
    }
    if(name && passed){
      const cw = el('div','certwrap');
      const cv = el('canvas'); cv.id = 'certcanvas';
      cw.appendChild(cv); c.appendChild(cw);
      Certificate.draw(cv, {
        name, track,
        time: Store.fmt(Store.elapsed(track.id)),
        score: q.pct,
        date: new Date(q.at || Date.now())
      });
      const row = el('div','actionrow');
      const dl = el('button','btn'); dl.textContent = '⬇ Download certificate (PNG)';
      dl.addEventListener('click', () => Certificate.download(cv, name, track));
      row.appendChild(dl);
      c.appendChild(row);
    }

    const row2 = el('div','actionrow');
    row2.style.marginTop = '1.4rem';
    const pdf = el('button','btn ghost'); pdf.textContent = '⬇ Download PDF of my answers';
    pdf.addEventListener('click', () => Certificate.answersPDF(track, toast));
    row2.appendChild(pdf);
    const back = el('button','btn ghost'); back.textContent = 'All modules';
    back.addEventListener('click', () => { location.hash = `#/${track.id}`; });
    row2.appendChild(back);
    c.appendChild(row2);
    screen('cert');
  }

  /* ------------------------------------------------------------ router */
  function route(){
    const h = (location.hash || '#/').replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);
    const bc = $('#backhome');

    if(!parts.length){
      track = null;
      document.body.removeAttribute('data-track');
      bc.style.display = 'none';
      $('#pbar').style.width = '0%';
      renderHome(); return;
    }
    track = trackById(parts[0]);
    document.body.dataset.track = track.id;
    Activities.setTrack(track.id);
    Store.bind(track.id);
    bc.style.display = '';
    refreshChrome();

    if(parts.length === 1){ renderTrack(); return; }
    if(parts[1] === 'check'){ renderCheck(); return; }
    if(parts[1] === 'cert'){ renderCert(); return; }
    renderModule(parts[1]);
  }

  /* -------------------------------------------------------------- init */
  function init(){
    // theme toggle
    const tk = 'ccl.theme';
    let theme = null;
    try{ theme = localStorage.getItem(tk); }catch(e){}
    if(theme) document.documentElement.setAttribute('data-theme', theme);
    $('#themebtn').addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const isDark = cur ? cur === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      const next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try{ localStorage.setItem(tk, next); }catch(e){}
    });
    $('#backhome').addEventListener('click', () => { location.hash = '#/'; });

    window.addEventListener('hashchange', route);
    route();

    if(Store.degraded){
      setTimeout(() => toast('Browser storage is unavailable — progress will not persist'), 900);
    }
    setInterval(() => {
      if(track && $('#track').classList.contains('on')) refreshChrome();
    }, 30000);
  }

  return { init, toast };
})();

document.addEventListener('DOMContentLoaded', App.init);
