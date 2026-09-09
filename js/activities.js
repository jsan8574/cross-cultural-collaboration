/* Activity renderers.
   Every renderer persists partial state on each interaction, so a refresh
   mid-activity restores exactly where the learner was. */

const Activities = (() => {

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if(cls) n.className = cls;
    if(html !== undefined) n.innerHTML = html;
    return n;
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const shuffle = (a, seed) => {
    const r = [...a];
    let s = seed || 1;
    const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for(let i = r.length - 1; i > 0; i--){ const j = Math.floor(rnd() * (i+1)); [r[i],r[j]] = [r[j],r[i]]; }
    return r;
  };
  const TYPE = { bucket:'Drag & drop', match:'Matching', sequence:'Sequencing',
                 flip:'Flip cards', hunt:'Find the signal', branch:'Decision simulation' };

  let TRACK = 'us';
  const setTrack = t => { TRACK = t; };
  const onChange = [];
  const notify = () => onChange.forEach(f => f());

  function shell(a){
    const box = el('section','act');
    box.dataset.act = a.id;
    const h = el('header');
    h.appendChild(el('div','atype', `<span>◆</span> ${TYPE[a.kind] || 'Activity'}`));
    h.appendChild(el('h3', null, esc(a.title)));
    if(a.instructions) h.appendChild(el('p','instr', esc(a.instructions)));
    box.appendChild(h);
    return box;
  }
  function keypoints(k){
    const b = el('div','keypoints');
    b.appendChild(el('h4', null, `<span>✦</span> ${esc(k.title || 'Coaching Key Points')}`));
    const ul = el('ul');
    k.points.forEach(p => ul.appendChild(el('li', null, esc(p))));
    b.appendChild(ul);
    return b;
  }
  function foot(box, onCheck, label){
    const f = el('div','act-foot');
    const st = el('div','act-status');
    const btn = el('button','btn'); btn.textContent = label || 'Check answers';
    f.appendChild(st); f.appendChild(btn);
    box.appendChild(f);
    btn.addEventListener('click', () => onCheck(st, btn));
    return { status: st, btn: btn, foot: f };
  }
  function complete(box, a, statusEl, btn, msg){
    if(statusEl){ statusEl.textContent = msg || 'Complete'; statusEl.className = 'act-status ok'; }
    if(btn) btn.remove();
    if(a.key && !box.querySelector('.keypoints')) box.appendChild(keypoints(a.key));
  }
  const save = (id, v) => { Store.setAct(TRACK, id, v); notify(); };
  const load = id => Store.act(TRACK, id);
  const isDone = id => { const s = load(id); return !!(s && s.done); };

  /* ============================================================ BUCKET */
  function bucket(a){
    const box = shell(a);
    const st = load(a.id) || { placed:{}, done:false };
    const pool = el('div','bk-pool');
    const zones = el('div','bk-zones'); zones.dataset.n = a.buckets.length;
    const zoneItems = {};

    a.buckets.forEach(b => {
      const z = el('div','bkzone'); z.dataset.bucket = b.id;
      z.appendChild(el('h5', null, esc(b.label)));
      if(b.hint) z.appendChild(el('div','zh', esc(b.hint)));
      const items = el('div','items'); z.appendChild(items);
      zoneItems[b.id] = items;
      zones.appendChild(z);

      z.addEventListener('dragover', e => { e.preventDefault(); z.classList.add('over'); });
      z.addEventListener('dragleave', () => z.classList.remove('over'));
      z.addEventListener('drop', e => {
        e.preventDefault(); z.classList.remove('over');
        const i = e.dataTransfer.getData('text/plain');
        if(i !== '') place(parseInt(i,10), b.id);
      });
      z.addEventListener('click', () => { if(sel !== null) place(sel, b.id); });
    });

    let sel = null;
    const chips = a.items.map((it, i) => {
      const c = el('div','chip', esc(it.text));
      c.draggable = true; c.dataset.i = i;
      c.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', String(i)); c.classList.add('drag'); });
      c.addEventListener('dragend', () => c.classList.remove('drag'));
      c.addEventListener('click', e => {
        e.stopPropagation();
        if(st.done) return;
        if(sel === i){ sel = null; c.classList.remove('sel'); }
        else { chips.forEach(x => x.classList.remove('sel')); sel = i; c.classList.add('sel'); }
      });
      return c;
    });

    function place(i, bucketId){
      if(st.done) return;
      st.placed[i] = bucketId;
      sel = null;
      save(a.id, st);
      paint();
    }
    function paint(){
      pool.textContent = '';
      Object.values(zoneItems).forEach(z => z.textContent = '');
      chips.forEach((c,i) => {
        c.classList.remove('sel');
        const b = st.placed[i];
        (b && zoneItems[b] ? zoneItems[b] : pool).appendChild(c);
      });
    }
    // returning a chip to the pool
    pool.addEventListener('dragover', e => { e.preventDefault(); pool.classList.add('over'); });
    pool.addEventListener('dragleave', () => pool.classList.remove('over'));
    pool.addEventListener('drop', e => {
      e.preventDefault(); pool.classList.remove('over');
      const i = e.dataTransfer.getData('text/plain');
      if(i !== '' && !st.done){ delete st.placed[parseInt(i,10)]; save(a.id, st); paint(); }
    });

    box.appendChild(pool); box.appendChild(zones);
    paint();

    const f = foot(box, (statusEl, btn) => {
      const n = Object.keys(st.placed).length;
      if(n < a.items.length){
        statusEl.textContent = `${a.items.length - n} item${a.items.length-n===1?'':'s'} still to place`;
        statusEl.className = 'act-status bad';
        return;
      }
      let right = 0;
      chips.forEach((c,i) => {
        c.classList.remove('right','wrong');
        if(st.placed[i] === a.items[i].bucket){ c.classList.add('right'); right++; }
        else c.classList.add('wrong');
      });
      if(right === a.items.length){
        st.done = true; save(a.id, st);
        complete(box, a, statusEl, btn, `All ${right} correct`);
      } else {
        statusEl.textContent = `${right} of ${a.items.length} correct — move the red ones and check again`;
        statusEl.className = 'act-status bad';
        chips.forEach((c,i) => { if(st.placed[i] !== a.items[i].bucket){ delete st.placed[i]; } });
        save(a.id, st);
        setTimeout(() => { chips.forEach(c => c.classList.remove('right','wrong')); paint(); }, 1400);
      }
    });
    if(st.done){ chips.forEach((c,i) => c.classList.add('right')); complete(box, a, f.status, f.btn, 'Complete'); }
    return box;
  }

  /* ============================================================= MATCH */
  function match(a){
    const box = shell(a);
    const st = load(a.id) || { pairs:{}, done:false };
    const wrap = el('div','mt-wrap');
    const grid = el('div','mt-grid');
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('class','mt-svg');
    const lc = el('div','mt-col'), rc = el('div','mt-col');
    lc.appendChild(el('h5', null, 'What they said'));
    rc.appendChild(el('h5', null, 'What it means'));

    const rightOrder = shuffle(a.right, a.right.length * 7 + 13);
    const lNodes = {}, rNodes = {};

    a.left.forEach(item => {
      const n = el('div','mt-item', esc(item.text)); n.dataset.id = item.id;
      lNodes[item.id] = n; lc.appendChild(n);
      n.addEventListener('click', () => pick('l', item.id));
    });
    rightOrder.forEach(item => {
      const n = el('div','mt-item', esc(item.text)); n.dataset.id = item.id;
      rNodes[item.id] = n; rc.appendChild(n);
      n.addEventListener('click', () => pick('r', item.id));
    });

    let selL = null, selR = null;
    function pick(side, id){
      if(st.done) return;
      if(side === 'l'){
        // clicking an already-paired left item unpairs it
        if(st.pairs[id]){ delete st.pairs[id]; save(a.id, st); paint(); return; }
        selL = (selL === id) ? null : id;
      } else {
        const owner = Object.keys(st.pairs).find(k => st.pairs[k] === id);
        if(owner){ delete st.pairs[owner]; save(a.id, st); paint(); return; }
        selR = (selR === id) ? null : id;
      }
      if(selL && selR){ st.pairs[selL] = selR; selL = selR = null; save(a.id, st); }
      paint();
    }
    function paint(){
      Object.values(lNodes).concat(Object.values(rNodes)).forEach(n => {
        n.classList.remove('sel','paired','wrong');
        const b = n.querySelector('.pnum'); if(b) b.remove();
      });
      if(selL && lNodes[selL]) lNodes[selL].classList.add('sel');
      if(selR && rNodes[selR]) rNodes[selR].classList.add('sel');
      let i = 0;
      Object.keys(st.pairs).forEach(l => {
        i++;
        const r = st.pairs[l];
        [lNodes[l], rNodes[r]].forEach(n => {
          if(!n) return;
          n.classList.add('paired');
          n.appendChild(el('span','pnum', String(i)));
        });
      });
      lines();
    }
    function lines(){
      svg.innerHTML = '';
      if(window.innerWidth < 760) return;          // geometry is meaningless when stacked
      const wr = wrap.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${wr.width} ${wr.height}`);
      Object.keys(st.pairs).forEach(l => {
        const ln = lNodes[l], rn = rNodes[st.pairs[l]];
        if(!ln || !rn) return;
        const A = ln.getBoundingClientRect(), B = rn.getBoundingClientRect();
        const x1 = A.right - wr.left, y1 = A.top + A.height/2 - wr.top;
        const x2 = B.left  - wr.left, y2 = B.top + B.height/2 - wr.top;
        const mx = (x1 + x2) / 2;
        const p = document.createElementNS('http://www.w3.org/2000/svg','path');
        p.setAttribute('d', `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`);
        p.setAttribute('fill','none');
        p.setAttribute('stroke', ln.classList.contains('wrong')
          ? getComputedStyle(document.body).getPropertyValue('--bad')
          : getComputedStyle(document.body).getPropertyValue('--ok'));
        p.setAttribute('stroke-width','2'); p.setAttribute('opacity','.55');
        svg.appendChild(p);
      });
    }

    grid.appendChild(lc); grid.appendChild(rc);
    wrap.appendChild(svg); wrap.appendChild(grid);
    box.appendChild(wrap);
    paint();
    const ro = new ResizeObserver(() => lines());
    ro.observe(wrap);
    window.addEventListener('resize', lines);

    const f = foot(box, (statusEl, btn) => {
      const n = Object.keys(st.pairs).length;
      if(n < a.left.length){
        statusEl.textContent = `${a.left.length - n} still to connect`;
        statusEl.className = 'act-status bad';
        return;
      }
      let right = 0;
      Object.keys(st.pairs).forEach(l => {
        const ok = st.pairs[l] === l;                  // ids are shared across sides
        if(ok) right++;
        else { lNodes[l].classList.add('wrong'); rNodes[st.pairs[l]].classList.add('wrong'); }
      });
      if(right === a.left.length){
        st.done = true; save(a.id, st);
        complete(box, a, statusEl, btn, `All ${right} matched`);
        lines();
      } else {
        statusEl.textContent = `${right} of ${a.left.length} correct — the red pairs have been released`;
        statusEl.className = 'act-status bad';
        lines();
        setTimeout(() => {
          Object.keys(st.pairs).forEach(l => { if(st.pairs[l] !== l) delete st.pairs[l]; });
          save(a.id, st); paint();
        }, 1500);
      }
    }, 'Check matches');
    if(st.done) complete(box, a, f.status, f.btn, 'Complete');
    return box;
  }

  /* ========================================================== SEQUENCE */
  function sequence(a){
    const box = shell(a);
    const n = a.steps.length;
    const st = load(a.id) || { order: shuffle([...Array(n).keys()], n*13+5), done:false };
    if(!Array.isArray(st.order) || st.order.length !== n) st.order = shuffle([...Array(n).keys()], n*13+5);
    if(!load(a.id)) save(a.id, st);          // persist the starting order immediately
    const list = el('div','seq');

    function paint(){
      list.textContent = '';
      st.order.forEach((idx, pos) => {
        const it = el('div','seqitem');
        it.draggable = !st.done;
        it.dataset.pos = pos;
        it.appendChild(el('div','sn', String(pos+1)));
        it.appendChild(el('div','st', esc(a.steps[idx])));
        if(!st.done){
          const b = el('div','seqbtns');
          const up = el('button', null, '▲'), dn = el('button', null, '▼');
          up.type='button'; dn.type='button';
          up.disabled = pos === 0; dn.disabled = pos === n-1;
          up.setAttribute('aria-label','Move up'); dn.setAttribute('aria-label','Move down');
          up.addEventListener('click', () => move(pos, pos-1));
          dn.addEventListener('click', () => move(pos, pos+1));
          b.appendChild(up); b.appendChild(dn); it.appendChild(b);
        }
        it.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', String(pos)); it.classList.add('drag'); });
        it.addEventListener('dragend', () => it.classList.remove('drag'));
        it.addEventListener('dragover', e => { e.preventDefault(); it.classList.add('over'); });
        it.addEventListener('dragleave', () => it.classList.remove('over'));
        it.addEventListener('drop', e => {
          e.preventDefault(); it.classList.remove('over');
          const from = parseInt(e.dataTransfer.getData('text/plain'), 10);
          if(!isNaN(from)) move(from, pos);
        });
        list.appendChild(it);
      });
    }
    function move(from, to){
      if(st.done || to < 0 || to >= n) return;
      const o = st.order.splice(from,1)[0];
      st.order.splice(to,0,o);
      save(a.id, st); paint();
    }
    box.appendChild(list);
    paint();

    const f = foot(box, (statusEl, btn) => {
      let right = 0;
      [...list.children].forEach((node, pos) => {
        node.classList.remove('right','wrong');
        if(st.order[pos] === pos){ node.classList.add('right'); right++; }
        else node.classList.add('wrong');
      });
      if(right === n){
        st.done = true; save(a.id, st);
        paint(); [...list.children].forEach(c => c.classList.add('right'));
        complete(box, a, statusEl, btn, 'Correct order');
      } else {
        statusEl.textContent = `${right} of ${n} in the right place — keep going`;
        statusEl.className = 'act-status bad';
        setTimeout(() => [...list.children].forEach(c => c.classList.remove('right','wrong')), 1500);
      }
    }, 'Check order');
    if(st.done){ [...list.children].forEach(c => c.classList.add('right')); complete(box, a, f.status, f.btn, 'Complete'); }
    return box;
  }

  /* ============================================================== FLIP */
  function flip(a){
    const box = shell(a);
    const st = load(a.id) || { seen:[], done:false };
    const grid = el('div','flipgrid');
    const counter = el('div','act-status');

    a.cards.forEach((c, i) => {
      const card = el('div','flip');
      card.tabIndex = 0; card.setAttribute('role','button');
      card.setAttribute('aria-label', `${c.name} — turn card`);
      const inner = el('div','flip-in');
      const front = el('div','flip-f'), back = el('div','flip-b');

      front.appendChild(el('div','fmono', esc(c.mono || String(i+1))));
      front.appendChild(el('b', null, esc(c.name)));
      if(c.role)  front.appendChild(el('div','frole', esc(c.role)));
      if(c.place) front.appendChild(el('div','fplace', esc(c.place)));
      if(c.meta)  front.appendChild(el('div','fmeta', esc(c.meta)));
      front.appendChild(el('div','ftext', esc(c.front)));
      front.appendChild(el('div','fturn','Turn ↻'));

      back.appendChild(el('b', null, c.role ? 'What this means for you' : 'What to do'));
      back.appendChild(el('div','ftext', esc(c.back)));
      if(c.coach) back.appendChild(el('div','fcoach', esc(c.coach)));
      back.appendChild(el('div','fturn','Turn back ↻'));

      inner.appendChild(front); inner.appendChild(back);
      card.appendChild(inner); grid.appendChild(card);

      if(st.seen.includes(i)) card.classList.add('seen');
      const toggle = () => {
        card.classList.toggle('on');
        if(!st.seen.includes(i)){
          st.seen.push(i); card.classList.add('seen');
          save(a.id, st); update();
        }
      };
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); } });
    });

    function update(){
      const n = st.seen.length, t = a.cards.length;
      if(n >= t){
        if(!st.done){ st.done = true; save(a.id, st); }
        counter.textContent = `All ${t} explored`; counter.className = 'act-status ok';
        if(a.key && !box.querySelector('.keypoints')) box.appendChild(keypoints(a.key));
      } else {
        counter.textContent = `${n} of ${t} explored`; counter.className = 'act-status';
      }
    }
    box.appendChild(grid);
    const f = el('div','act-foot'); f.appendChild(counter); box.appendChild(f);
    update();
    return box;
  }

  /* ============================================================== HUNT */
  function hunt(a){
    const box = shell(a);
    const st = load(a.id) || { pick:null, done:false };
    const wrap = el('div','hunt');
    const tbl = el('table');
    const cols = [['ph','🇵🇭 Philippines'],['in','🇮🇳 India'],['sl','🇱🇰 Sri Lanka'],['us','🇺🇸 United States']];
    const head = el('tr');
    head.appendChild(el('th', null, 'Dimension'));
    cols.forEach(c => head.appendChild(el('th', null, c[1])));
    const thead = el('thead'); thead.appendChild(head); tbl.appendChild(thead);
    const tb = el('tbody');
    const btns = [];

    a.dimensions.forEach((d, di) => {
      const tr = el('tr');
      const td0 = el('td');
      td0.appendChild(el('b', null, esc(d.name)));
      td0.appendChild(el('span', null, esc(d.sub)));
      tr.appendChild(td0);
      cols.forEach(c => {
        const td = el('td','hcell');
        const b = el('button','hbtn');
        b.type = 'button';
        b.appendChild(el('span','hv', String(d[c[0]])));
        const bar = el('div','hbar'); bar.appendChild(el('i'));
        bar.firstChild.style.width = d[c[0]] + '%';
        b.appendChild(bar);
        b.dataset.dim = di; b.dataset.country = c[0];
        b.addEventListener('click', () => {
          if(st.done) return;
          st.pick = { dim:di, country:c[0] };
          save(a.id, st); paint();
        });
        btns.push(b); td.appendChild(b); tr.appendChild(td);
      });
      tb.appendChild(tr);
    });
    tbl.appendChild(tb); wrap.appendChild(tbl); box.appendChild(wrap);

    function paint(){
      btns.forEach(b => {
        b.classList.remove('right','wrong');
        if(!st.pick) return;
        const isPick = +b.dataset.dim === st.pick.dim && b.dataset.country === st.pick.country;
        if(!isPick) return;
        const ok = st.pick.dim === a.answer.dim && st.pick.country === a.answer.country;
        b.classList.add(ok ? 'right' : 'wrong');
      });
    }
    paint();

    const f = foot(box, (statusEl, btn) => {
      if(!st.pick){ statusEl.textContent = 'Click a cell first'; statusEl.className = 'act-status bad'; return; }
      const ok = st.pick.dim === a.answer.dim && st.pick.country === a.answer.country;
      paint();
      if(ok){
        st.done = true; save(a.id, st);
        complete(box, a, statusEl, btn, 'Correct');
      } else {
        statusEl.textContent = a.hint || 'Not the right cell — look across the whole board again';
        statusEl.className = 'act-status bad';
      }
    }, 'Check');
    if(st.done) complete(box, a, f.status, f.btn, 'Complete');
    return box;
  }

  /* ============================================================ BRANCH */
  function branch(a){
    const box = shell(a);
    const st = load(a.id) || { step:0, done:false };
    box.appendChild(el('div','sim-intro', esc(a.intro)));
    const prog = el('div','simprog');
    a.nodes.forEach(() => prog.appendChild(el('i')));
    box.appendChild(prog);
    const stage = el('div');
    box.appendChild(stage);

    function paintProg(){
      [...prog.children].forEach((p, i) => {
        p.className = i < st.step ? 'dn' : (i === st.step ? 'on' : '');
      });
    }
    function render(){
      paintProg();
      stage.textContent = '';
      if(st.step >= a.nodes.length){
        st.done = true; save(a.id, st);
        if(a.outro) stage.appendChild(el('div','sim-done', esc(a.outro)));
        if(a.key && !box.querySelector('.keypoints')) box.appendChild(keypoints(a.key));
        return;
      }
      const node = a.nodes[st.step];
      const wrap = el('div','sim-step');
      wrap.appendChild(el('div','sim-q', esc(node.prompt)));
      const opts = el('div','sim-opts');
      const order = shuffle(node.options.map((o,i)=>i), (st.step+1)*17 + a.nodes.length);
      order.forEach(oi => {
        const o = node.options[oi];
        const b = el('button','sim-opt', esc(o.text));
        b.type = 'button';
        b.addEventListener('click', () => {
          [...opts.children].forEach(x => x.disabled = true);
          b.classList.add(o.ok ? 'ok' : 'no');
          const fb = el('div', 'sim-fb ' + (o.ok ? 'ok' : 'no'));
          fb.appendChild(el('b', null, o.ok ? '✓ Good call' : '✕ Consider what this signals'));
          fb.appendChild(el('div', null, esc(o.fb)));
          wrap.appendChild(fb);
          const next = el('button','btn sm');
          next.style.marginTop = '.8rem';
          next.textContent = o.ok ? 'Continue →' : 'Try again';
          next.addEventListener('click', () => {
            if(o.ok){ st.step++; save(a.id, st); }
            render();
          });
          wrap.appendChild(next);
        });
        opts.appendChild(b);
      });
      wrap.appendChild(opts);
      stage.appendChild(wrap);
    }
    render();
    return box;
  }

  /* =========================================================== dispatch */
  const RENDER = { bucket, match, sequence, flip, hunt, branch };
  function render(a){
    const fn = RENDER[a.kind];
    if(!fn){ const d = el('div'); d.textContent = `Unknown activity: ${a.kind}`; return d; }
    return fn(a);
  }
  function countFor(mod){
    let total = 0, done = 0;
    (mod.blocks || []).forEach(b => {
      if(b.type === 'activity'){ total++; if(isDone(b.activity.id)) done++; }
    });
    return { total, done };
  }
  function summaryFor(track, mod){
    const out = [];
    (mod.blocks || []).forEach(b => {
      if(b.type !== 'activity') return;
      const a = b.activity;
      const s = Store.act(track, a.id);
      out.push({ title:a.title, kind:TYPE[a.kind] || a.kind, done: !!(s && s.done) });
    });
    return out;
  }

  return { render, isDone, countFor, summaryFor, setTrack, onChange, esc, el, TYPE };
})();
