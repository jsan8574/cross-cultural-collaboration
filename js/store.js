/* Persistence + elapsed-time tracking.
   Storage is namespaced per track so adding a track never collides with an existing one. */

const Store = (() => {
  const NS = 'ccl.v2';
  const mem = {};                       // fallback when localStorage is unavailable
  let usingMem = false;

  function raw(k, fallback){
    try{ const v = localStorage.getItem(k); return v === null ? fallback : v; }
    catch(e){ usingMem = true; return (k in mem) ? mem[k] : fallback; }
  }
  function setRaw(k, v){
    try{ localStorage.setItem(k, v); }
    catch(e){ usingMem = true; mem[k] = v; }
  }
  function key(track, k){ return `${NS}.${track}.${k}`; }

  function get(track, k, fallback){
    const v = raw(key(track,k), null);
    if(v === null) return fallback;
    try{ return JSON.parse(v); }catch(e){ return fallback; }
  }
  function set(track, k, val){ setRaw(key(track,k), JSON.stringify(val)); }

  /* ---- learner name is shared across tracks ---- */
  function name(){ return raw(`${NS}.name`, '') || ''; }
  function setName(v){ setRaw(`${NS}.name`, v); }

  /* Learner context: where they sit, and which teams they work with. Shared
     across tracks — it decides what we recommend, never what they may take. */
  function profile(){
    const v = raw(`${NS}.profile`, null);
    if(!v) return { base:'', works:[] };
    try{ const o = JSON.parse(v); return { base:o.base||'', works:o.works||[] }; }
    catch(e){ return { base:'', works:[] }; }
  }
  function setProfile(o){ setRaw(`${NS}.profile`, JSON.stringify(o)); }

  /* ---- elapsed time ------------------------------------------------------
     Accumulates deltas rather than trusting (now - start). A delta larger than
     MAX_GAP is discarded, which absorbs a backgrounded tab, a sleeping laptop,
     or a tab left open overnight. Timer also stops while the page is hidden. */
  const MAX_GAP = 60 * 1000;
  let track = null, last = null, visible = true;

  function bind(t){
    flush();
    track = t;
    last = Date.now();
    if(get(t, 'savedAt', null) === null) set(t, 'savedAt', Date.now());
  }
  function flush(){
    if(!track || last === null) return;
    const now = Date.now();
    const d = now - last;
    last = now;
    if(!visible || d < 0 || d > MAX_GAP) return;   // discard implausible gaps
    set(track, 'elapsed', (get(track,'elapsed',0) || 0) + d);
  }
  function elapsed(t){ return get(t || track, 'elapsed', 0) || 0; }

  if(typeof document !== 'undefined'){
    document.addEventListener('visibilitychange', () => {
      if(document.hidden){ flush(); visible = false; }
      else { visible = true; last = Date.now(); }
    });
    window.addEventListener('pagehide', flush);
    window.addEventListener('beforeunload', flush);
    setInterval(flush, 5000);
  }

  /* "0m 28s" / "1h 04m" — the header clock format */
  function fmtClock(ms){
    const t = Math.floor(ms/1000), h = Math.floor(t/3600), m = Math.floor(t%3600/60), sec = t%60;
    if(h) return `${h}h ${String(m).padStart(2,'0')}m`;
    return `${m}m ${sec}s`;
  }
  function stamp(t){
    const v = get(t, 'savedAt', null);
    if(!v) return '—';
    return new Date(v).toLocaleTimeString([], { hour:'numeric', minute:'2-digit' });
  }
  function touch(t){ set(t, 'savedAt', Date.now()); }

  function fmt(ms){
    const m = Math.floor(ms/60000);
    if(m < 1) return 'under a minute';
    if(m < 60) return `${m} min`;
    const h = Math.floor(m/60), r = m % 60;
    return r ? `${h}h ${r}m` : `${h}h`;
  }

  /* ---- convenience accessors used by the activity layer ---- */
  const act    = (t,id)      => get(t, `act.${id}`, null);
  const setAct = (t,id,v)    => set(t, `act.${id}`, v);
  const txt    = (t,id)      => get(t, `txt.${id}`, '');
  const setTxt = (t,id,v)    => set(t, `txt.${id}`, v);
  const done   = (t)         => get(t, 'done', []);
  const markDone = (t,mid) => {
    const d = done(t);
    if(!d.includes(mid)){ d.push(mid); set(t,'done',d); }
  };
  const quiz    = (t)   => get(t, 'quiz', null);
  const setQuiz = (t,v) => set(t, 'quiz', v);

  function resetTrack(t){
    const prefix = `${NS}.${t}.`;
    try{
      Object.keys(localStorage).filter(k => k.startsWith(prefix)).forEach(k => localStorage.removeItem(k));
    }catch(e){
      Object.keys(mem).filter(k => k.startsWith(prefix)).forEach(k => delete mem[k]);
    }
    if(track === t) last = Date.now();
  }

  return { get, set, name, setName, profile, setProfile, bind, flush, elapsed, fmt, fmtClock, stamp, touch,
           act, setAct, txt, setTxt, done, markDone, quiz, setQuiz, resetTrack,
           get degraded(){ return usingMem; } };
})();
