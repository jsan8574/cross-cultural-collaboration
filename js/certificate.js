/* Canvas certificate (PNG) + jsPDF export of every reflection and activity result. */

const Certificate = (() => {

  /* Matches the course-player chrome: deep navy + teal, mint as the second
     accent. No warm tones anywhere. */
  const PAL = { navy:'#0E2436', ink:'#33485C', slate:'#5C7185', line:'#E1E9F0',
                pale:'#F2F6F9', teal:'#2E9CAB', tealD:'#17656F', mint:'#2E7D5B' };

  function accent(){ return PAL.teal; }   /* one accent — no culture is tinted differently */

  /* Proxima Nova is loaded via @font-face; canvas needs it resolved before drawing. */
  async function ready(){
    if(document.fonts && document.fonts.load){
      try{
        await Promise.all([
          document.fonts.load('700 60px "Proxima Nova"'),
          document.fonts.load('600 24px "Proxima Nova"'),
          document.fonts.load('400 20px "Proxima Nova"')
        ]);
      }catch(e){ /* fall back to the stack in the font string */ }
    }
  }
  const F = (w,s) => `${w} ${s}px "Proxima Nova", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`;

  function draw(canvas, o){
    const W = 1600, H = 1130, dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.aspectRatio = `${W} / ${H}`;
    const x = canvas.getContext('2d');
    x.scale(dpr, dpr);
    const A = accent();

    const paint = () => {
      // ground
      x.fillStyle = '#FFFFFF'; x.fillRect(0,0,W,H);

      // corner wash
      const g = x.createLinearGradient(0,0,W,H);
      g.addColorStop(0, A + '14'); g.addColorStop(.5,'#FFFFFF00'); g.addColorStop(1, PAL.mint + '12');
      x.fillStyle = g; x.fillRect(0,0,W,H);

      // frame
      x.strokeStyle = PAL.line; x.lineWidth = 2;
      x.strokeRect(38,38,W-76,H-76);
      x.strokeStyle = A; x.lineWidth = 5;
      x.beginPath();
      x.moveTo(38,150); x.lineTo(38,38); x.lineTo(190,38); x.stroke();
      x.beginPath();
      x.moveTo(W-38,H-150); x.lineTo(W-38,H-38); x.lineTo(W-190,H-38); x.stroke();

      // drawn mark (no external logo)
      const cx = W/2, my = 138;
      x.strokeStyle = A; x.lineWidth = 3.5;
      x.beginPath(); x.arc(cx, my, 30, 0, Math.PI*2); x.stroke();
      x.strokeStyle = PAL.mint; x.lineWidth = 3.5;
      x.beginPath(); x.arc(cx + 22, my, 30, 0, Math.PI*2); x.stroke();
      x.strokeStyle = PAL.slate; x.lineWidth = 1.5;
      x.beginPath(); x.moveTo(cx - 96, my); x.lineTo(cx - 46, my); x.stroke();
      x.beginPath(); x.moveTo(cx + 74, my); x.lineTo(cx + 124, my); x.stroke();

      x.textAlign = 'center';

      x.fillStyle = PAL.slate; x.font = F(600,18);
      x.letterSpacing = '5px';
      x.fillText('CERTIFICATE OF COMPLETION', cx, 232);
      x.letterSpacing = '0px';

      x.fillStyle = PAL.slate; x.font = F(400,22);
      x.fillText('This certifies that', cx, 306);

      // name, shrunk to fit
      let size = 76;
      x.font = F(700,size);
      while(x.measureText(o.name).width > W - 320 && size > 32){ size -= 2; x.font = F(700,size); }
      x.fillStyle = PAL.navy;
      x.fillText(o.name, cx, 392);

      x.strokeStyle = A; x.lineWidth = 2.5;
      x.beginPath(); x.moveTo(cx - 180, 424); x.lineTo(cx + 180, 424); x.stroke();

      x.fillStyle = PAL.slate; x.font = F(400,22);
      x.fillText('has completed the self-paced programme', cx, 474);

      x.fillStyle = PAL.navy; x.font = F(700,42);
      x.fillText(o.track.name, cx, 536);

      x.fillStyle = A; x.font = F(600,20);
      x.fillText(o.track.subtitle, cx, 576);

      x.fillStyle = PAL.slate; x.font = F(400,18);
      x.fillText(o.track.audience || '', cx, 612);

      // stat panel
      const bw = 1080, bx = (W - bw)/2, by = 660, bh = 168;
      x.fillStyle = PAL.pale;
      if(x.roundRect){ x.beginPath(); x.roundRect(bx,by,bw,bh,16); x.fill(); }
      else x.fillRect(bx,by,bw,bh);

      const cells = [
        ['TIME INVESTED', o.time],
        ['KNOWLEDGE CHECK', o.score + '%'],
        ['MODULES', String(o.track.modules.length)]
      ];
      cells.forEach((c, i) => {
        const w3 = bw/3, ccx = bx + w3*i + w3/2;
        x.fillStyle = PAL.slate; x.font = F(600,15);
        x.letterSpacing = '2.5px';
        x.fillText(c[0], ccx, by + 58);
        x.letterSpacing = '0px';
        x.fillStyle = PAL.navy; x.font = F(700,46);
        x.fillText(c[1], ccx, by + 118);
        if(i < 2){
          x.strokeStyle = PAL.line; x.lineWidth = 1.5;
          x.beginPath(); x.moveTo(bx + w3*(i+1), by + 34); x.lineTo(bx + w3*(i+1), by + bh - 34); x.stroke();
        }
      });

      // footer
      const d = o.date.toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' });
      x.strokeStyle = PAL.line; x.lineWidth = 1.5;
      x.beginPath(); x.moveTo(bx, 906); x.lineTo(bx + bw, 906); x.stroke();

      x.textAlign = 'left';
      x.fillStyle = PAL.slate; x.font = F(600,15);
      x.letterSpacing = '2px'; x.fillText('COMPLETED', bx, 946); x.letterSpacing = '0px';
      x.fillStyle = PAL.navy; x.font = F(600,22); x.fillText(d, bx, 978);

      x.textAlign = 'right';
      x.fillStyle = PAL.slate; x.font = F(600,15);
      x.letterSpacing = '2px'; x.fillText('PROGRAMME', bx + bw, 946); x.letterSpacing = '0px';
      x.fillStyle = PAL.navy; x.font = F(600,22); x.fillText('Cross-Cultural Collaboration', bx + bw, 978);

      x.textAlign = 'center';
      x.fillStyle = PAL.slate; x.font = F(400,15);
      x.fillText('Self-paced learning · completion recorded in this browser', cx, 1048);
    };

    paint();
    ready().then(paint);          // repaint once the real weights are resolved
  }

  function download(canvas, name, track){
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${slug(name)}-cross-cultural-collaboration-certificate.png`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    }, 'image/png');
  }
  const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'learner';

  /* ------------------------------------------------------- answers PDF */
  function collect(track){
    const out = [];
    track.modules.forEach((m, mi) => {
      const sec = { title: `Module ${mi+1} — ${m.title}`, items: [] };

      (m.blocks || []).forEach(b => {
        if(b.type === 'reflect'){
          const v = (Store.txt(track.id, b.id) || '').trim();
          sec.items.push({ kind:'reflection', q:b.prompt, a: v || '(not yet answered)' });
        }
        if(b.type === 'checklist'){
          const saved = Store.get(track.id, `chk.${b.id}`, []) || [];
          if(saved.length){
            sec.items.push({ kind:'checklist', q:b.title,
              a: saved.map(i => '• ' + b.items[i]).join('\n') });
          }
        }
        if(b.type === 'activity'){
          const a = b.activity;
          const s = Store.act(track.id, a.id);
          sec.items.push({ kind:'activity',
            q: `${a.title} (${Activities.TYPE[a.kind] || a.kind})`,
            a: s && s.done ? 'Completed' : 'Not completed' });
        }
        if(b.type === 'cfu'){
          const s = Store.get(track.id, `cfu.${m.id}`, null);
          if(s && s.done){
            let right = 0;
            b.questions.forEach((q, qi) => { if(s.answers[qi] === q.answer) right++; });
            sec.items.push({ kind:'quiz', q:'Check for understanding',
              a: `${right} of ${b.questions.length} correct` });
          }
        }
      });
      if(sec.items.length) out.push(sec);
    });
    return out;
  }

  function loadJsPDF(){
    return new Promise((res, rej) => {
      if(window.jspdf && window.jspdf.jsPDF) return res(window.jspdf.jsPDF);
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      s.onload = () => (window.jspdf && window.jspdf.jsPDF) ? res(window.jspdf.jsPDF) : rej(new Error('jsPDF missing'));
      s.onerror = () => rej(new Error('offline'));
      document.head.appendChild(s);
    });
  }

  async function answersPDF(track, toast){
    let jsPDF;
    try{ jsPDF = await loadJsPDF(); }
    catch(e){ toast && toast('Could not load the PDF library — check your connection'); return; }

    const name = (Store.name() || 'Learner').trim();
    const q = Store.quiz(track.id);
    const doc = new jsPDF({ unit:'pt', format:'a4' });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const M = 56;
    let y = 0;

    const rgb = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
    const A = rgb(PAL.teal);
    const NAVY = rgb(PAL.navy), SLATE = rgb(PAL.slate), INK = rgb(PAL.ink);

    function page(first){
      if(!first) doc.addPage();
      doc.setFillColor(...A);
      doc.rect(0, 0, W, 6, 'F');
      y = M + 10;
    }
    function need(h){ if(y + h > H - M){ page(false); } }

    page(true);

    doc.setTextColor(...NAVY);
    doc.setFont('helvetica','bold'); doc.setFontSize(22);
    doc.text('My Answers & Reflections', M, y); y += 26;

    doc.setFont('helvetica','normal'); doc.setFontSize(12); doc.setTextColor(...SLATE);
    doc.text(track.audience || track.name, M, y); y += 16;
    doc.text(`${name}  ·  ${new Date().toLocaleDateString()}`, M, y); y += 16;
    doc.text(`Time invested: ${Store.fmt(Store.elapsed(track.id))}` +
             (q && q.submitted ? `  ·  Knowledge check: ${q.pct}%` : ''), M, y); y += 22;

    doc.setDrawColor(...rgb(PAL.line)); doc.setLineWidth(1);
    doc.line(M, y, W - M, y); y += 24;

    collect(track).forEach(sec => {
      need(56);
      doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.setTextColor(...A);
      doc.text(sec.title, M, y); y += 18;

      sec.items.forEach(it => {
        const qLines = doc.splitTextToSize(it.q, W - M*2);
        const aLines = doc.splitTextToSize(it.a, W - M*2 - 14);
        need(qLines.length*13 + aLines.length*13 + 20);

        doc.setFont('helvetica','bold'); doc.setFontSize(10.5); doc.setTextColor(...NAVY);
        qLines.forEach(l => { doc.text(l, M, y); y += 13; });

        doc.setFont('helvetica','normal'); doc.setFontSize(10.5);
        doc.setTextColor(it.kind === 'reflection' ? INK[0] : SLATE[0],
                         it.kind === 'reflection' ? INK[1] : SLATE[1],
                         it.kind === 'reflection' ? INK[2] : SLATE[2]);
        if(it.kind === 'reflection'){
          doc.setDrawColor(...A); doc.setLineWidth(2);
          doc.line(M + 3, y - 9, M + 3, y - 9 + aLines.length*13);
        }
        aLines.forEach(l => { doc.text(l, M + 14, y); y += 13; });
        y += 9;
      });
      y += 10;
    });

    if(q && q.submitted){
      need(80);
      doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.setTextColor(...A);
      doc.text('Knowledge check', M, y); y += 18;
      doc.setFont('helvetica','normal'); doc.setFontSize(10.5); doc.setTextColor(...INK);
      doc.text(`Score: ${q.pct}%  (${q.correct} of ${track.knowledgeCheck.length} correct)  —  ` +
               `${q.pct >= track.passMark ? 'Passed' : 'Not yet passed'}`, M, y); y += 18;
      track.knowledgeCheck.forEach((kq, i) => {
        const ok = q.answers[i] === kq.answer;
        const lines = doc.splitTextToSize(`${i+1}. ${kq.q}`, W - M*2);
        const ans = doc.splitTextToSize(
          `Your answer: ${kq.options[q.answers[i]] || '—'}${ok ? '' : `\nCorrect: ${kq.options[kq.answer]}`}`,
          W - M*2 - 14);
        need(lines.length*13 + ans.length*13 + 18);
        doc.setFont('helvetica','bold'); doc.setTextColor(...NAVY);
        lines.forEach(l => { doc.text(l, M, y); y += 13; });
        doc.setFont('helvetica','normal');
        doc.setTextColor(ok ? 46 : 180, ok ? 125 : 69, ok ? 91 : 60);
        ans.forEach(l => { doc.text(l, M + 14, y); y += 13; });
        y += 8;
      });
    }

    // footer on every page
    const n = doc.internal.getNumberOfPages();
    for(let i = 1; i <= n; i++){
      doc.setPage(i);
      doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(...SLATE);
      doc.text('Cross-Cultural Collaboration — ' + (track.audience || ''), M, H - 28);
      doc.text(`${i} / ${n}`, W - M, H - 28, { align:'right' });
    }

    doc.save(`${slug(name)}-cross-cultural-collaboration-answers.pdf`);
  }

  return { draw, download, answersPDF };
})();
