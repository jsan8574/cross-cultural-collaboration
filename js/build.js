/* Builds the course from the learner's own culture and the cultures they work
   with. Nothing here is hard-coded to any nationality: `you` is whichever
   culture the learner selected, and every comparison is rendered against it.

   Structure = shared CORE modules (adaptive) + one CULTURE PACK per collaborator
   (identical shape for all four). Concepts appear or disappear by pair kind:
     cross      — one low-context, one high-context: translation is the work
     high-high  — both indirect: the work is telling two indirect styles apart
     low-low    — both direct (only US↔US, which we never build) */

const Build = (() => {
  const C = CULTURES, U = CultureUtil;
  /* "India", "India and the Philippines", "India, the Philippines and the US" */
  function listNames(arr, useArticle){
    const n = arr.map(c => useArticle === false ? c.name : (c.the || c.name));
    if(n.length <= 1) return n[0] || '';
    if(n.length === 2) return n[0] + ' and ' + n[1];
    return n.slice(0, -1).join(', ') + ' and ' + n[n.length - 1];
  }
  const verb = arr => arr.length > 1 ? 'have' : 'has';
  /* "the United States" -> "The United States" when it opens a sentence. */
  const cap = t => t.charAt(0).toUpperCase() + t.slice(1);

  /* ------------------------------------------------------------ helpers */
  const eyebrowFlags = arr => arr.map(c => c.flag).join(' ');

  function compareBlock(you, them){
    return { type:'compare',
      left:  { title:`${you.flag} ${you.name} — your defaults`, tone:'cool', items: you.defaults },
      right: { title:`${them.flag} ${them.name}`, tone:'warm', items: them.defaults } };
  }

  function dimRow(you, them){
    return { type:'dims', you: you.id, them: them.map(t => t.id) };
  }

  /* ═══════════════════════════════════════════════ CORE 1 — two defaults */
  function coreDefaults(you, them){
    const kinds = them.map(t => U.pairKind(you.id, t.id));
    const allHigh = kinds.every(k => k === 'high-high');
    const anyCross = kinds.some(k => k === 'cross');

    const blocks = [
      { type:'lead', text:`No culture here is the standard the others depart from. ${cap(you.the)} has defaults, ${listNames(them)} ${verb(them)} defaults, and every one is coherent inside its own setting. The work happens at the interface — and it runs in both directions.` },
      { type:'p', text:`You told us you are based in ${you.the} and work with ${listNames(them)}. Everything that follows is built around that, including which concepts you are shown and which are left out because they do not apply to you.` },
      { type:'callout', variant:'insight', title:`How ${cap(you.the)} is often misread`,
        text: you.misread.join(' · ') + '. Knowing how you are read is half of this; the other half is reading them accurately in return.' },
      { type:'callout', variant:'rcm', title:`What ${cap(you.the)} brings`,
        text: you.strengths.join(' · ') + '.' }
    ];

    if(them.length === 1){
      blocks.push(compareBlock(you, them[0]));
    } else {
      /* With several collaborators, repeating the learner's column beside each
         one is redundant and starts to read as a baseline. Show all as peers. */
      blocks.push({ type:'columns', cols:
        [{ flag:you.flag, title:`${you.name} — your defaults`, items:you.defaults }]
        .concat(them.map(t => ({ flag:t.flag, title:t.name, items:t.defaults }))) });
    }

    if(anyCross){
      blocks.push({ type:'callout', variant:'warn', title:'Where the cost lands',
        text:'When two cultures sit far apart on how directly things are said, almost every complaint each makes about the other is a literal reading of a signal the other did not send. "They won’t flag problems" and "they are abrupt and impatient" are the same misunderstanding, viewed from opposite ends.' });
    }
    if(allHigh){
      blocks.push({ type:'callout', variant:'warn', title:'The risk in this particular pairing',
        text:`You and ${listNames(them)} all communicate indirectly, which feels like an advantage and quietly is not. Two indirect styles can miss each other completely, because each assumes the other's softening means what their own softening would mean. The differences are small, and small differences read at full volume.` });
    }

    /* Activity: whose default is this? Buckets are the learner's own culture
       and each collaborator — never "the standard" and "the other one". */
    const buckets = [{ id: you.id, label:`${you.flag} ${you.name}`, hint:'Your own defaults' }]
      .concat(them.map(t => ({ id:t.id, label:`${t.flag} ${t.name}`, hint:t.headline })));
    const items = [];
    [you].concat(them).forEach(c => c.defaults.forEach(d => items.push({ text:d, bucket:c.id })));

    blocks.push({ type:'activity', activity:{
      kind:'bucket', id:'a-defaults',
      title:'Whose default is this?',
      instructions: allHigh
        ? `Sort each assumption to the culture it describes. These are close together — that is the point of this pairing, and telling them apart is the skill.`
        : `Sort each assumption to the culture it describes. Your own is one column among ${them.length+1}, not the reference the others are measured against.`,
      buckets, items,
      key:{ title:'Coaching Key Points', points:[
        'Every column is internally coherent. None is a deviation from another.',
        `The friction is not that ${listNames(them)} ${them.length>1?'do':'does'} things differently from ${you.name}. It is that each side reads the other's signals with its own decoder.`,
        allHigh
          ? 'Because you share an indirect register, you will both assume you understand each other. Check that assumption more, not less.'
          : 'The gap is widest on how openly disagreement is surfaced — which is exactly where the expensive mistakes live.',
        'You are not being asked to abandon your defaults. You are being asked to make them legible, and to read theirs accurately.' ] } } });

    blocks.push({ type:'cfu', questions:[
      { q:`A colleague from ${them[0].name} does something that puzzles you. What is the most useful first move?`,
        options:[ 'Assume it is a performance issue and address it directly',
                  'Ask what might be driving it below the surface before interpreting',
                  'Wait to see whether it happens again',
                  'Adjust your own approach to match theirs' ],
        answer:1,
        why:'The first interpretation is generated by your own decoder. Examining it takes thirty seconds and prevents most of the damage in this course.' } ] });

    return { id:'core-1', stage:'pre', minutes:10,
      title:'Your Defaults and Theirs',
      tagline:'Your defaults and theirs, side by side',
      blocks };
  }

  /* ══════════════════════════════════════════════════ CORE 2 — iceberg */
  function coreIceberg(you, them){
    const blocks = [
      { type:'lead', text:'Culture is the invisible rulebook everyone follows but nobody wrote down. Ninety percent of it sits below the waterline — and when you manage only the visible tenth, you are reacting to symptoms rather than causes.' },
      { type:'iceberg' },
      { type:'p', text:'In a workplace this means the shared, mostly unspoken rules about how to behave, what to say, how to relate to authority, how to handle conflict, what counts as good work, and what happens when you fail. None of it appears in a process document.' },
      { type:'activity', activity:{
        kind:'bucket', id:'a-berg',
        title:'Above or below the waterline?',
        instructions:'Sort each element. The hidden ones are the ones that actually drive behaviour.',
        buckets:[ { id:'vis', label:'Visible (10%)', hint:'What you can observe directly' },
                  { id:'hid', label:'Hidden (90%)',  hint:'What actually drives the behaviour' } ],
        items:[
          { text:'Language and dress', bucket:'vis' },
          { text:'Food and holidays', bucket:'vis' },
          { text:'Working hours', bucket:'vis' },
          { text:'Degree of formality in email', bucket:'vis' },
          { text:'Beliefs about hierarchy and authority', bucket:'hid' },
          { text:'What counts as rude or respectful', bucket:'hid' },
          { text:'Attitudes to disagreement and conflict', bucket:'hid' },
          { text:'How shame, pride and dignity work', bucket:'hid' },
          { text:'What silence means', bucket:'hid' },
          { text:'Assumptions we take for granted', bucket:'hid' },
          { text:'Attitudes to time, age and status', bucket:'hid' } ],
        key:{ title:'Coaching Key Points', points:[
          'Everything visible can be learned from a country guide in an afternoon, and none of it will change how you work.',
          'Everything hidden is learned only through relationship, and all of it will.',
          'The habit: when a behaviour puzzles you, resist the first interpretation and ask what sits below it.',
          'The assumption feels like a fact until you examine it.' ] } } },
      { type:'h', text:'Where the four sit' },
      { type:'p', text:'Tendency scores, not individuals — and no reference point. Every culture sits somewhere on every scale, including your own. What matters is the distance between any two positions, because that distance is where translation is needed.' },
      dimRow(you, them),
      { type:'callout', variant:'insight', title:'Read it in both directions',
        text:`Your own row is on this chart too. A colleague low on hierarchy looks disrespectful of seniority from a high vantage point, exactly as a colleague high on it looks passive from a low one. Neither reading is generous, and neither is correct.` }
    ];

    /* Find this learner's widest genuine gap and make it the hunt target. */
    let best = { dim:null, other:null, v:-1 };
    Object.keys(you.dims).forEach(d => them.forEach(t => {
      const v = Math.abs(you.dims[d] - t.dims[d]);
      if(v > best.v) best = { dim:d, other:t, v };
    }));
    const DIMNAME = { context:'High-context communication', collectivism:'Collectivism',
      hierarchy:'Respect for hierarchy', indirect:'Indirect disagreement', relationship:'Relationship before task' };

    blocks.push({ type:'callout', variant:'rcm', title:'Your widest gap',
      text:`Between ${you.the} and ${best.other.the}, the largest distance is on ${DIMNAME[best.dim].toLowerCase()} — ${you.dims[best.dim]} against ${best.other.dims[best.dim]}, a ${best.v}-point gap. That is the single dimension most likely to generate misreads in your particular working relationship, and it is worth remembering when something puzzles you.` });

    blocks.push({ type:'cfu', questions:[
      { q:'Your counterparts never disagree with you in a group call. Using the iceberg, what is the useful first question?',
        options:[ 'How do I get them to speak up more?',
                  'What is below the waterline that makes public disagreement costly here?',
                  'Which of them are disengaged?',
                  'Should I replace group calls with written updates?' ],
        answer:1,
        why:'All four may eventually be worth asking, but only the second one diagnoses. The others act on the visible tenth before you know what is driving it.' } ] });

    return { id:'core-2', stage:'pre', minutes:10,
      title:'The Culture Iceberg', tagline:'What is visible, and what actually drives behaviour', blocks };
  }

  /* ═══════════════════════════════════════ CULTURE PACK (one per partner) */
  function culturePack(you, t){
    const kind = U.pairKind(you.id, t.id);
    const blocks = [
      { type:'lead', text:`${t.headline} This pack covers how ${t.name} works — the people, the signals, the calendar and the patterns you will meet in the revenue cycle.` },
      { type:'disclaimer', text:'These profiles are shared so you can work with these individuals as full people — not so you can feel sympathy for their circumstances.' },
      { type:'note', text:'The people below are composites built for training. They are not real employees.' },

      { type:'activity', activity:{
        kind:'flip', id:`p-${t.id}-people`,
        title:`Two colleagues in ${t.name}`,
        instructions:'Turn each card. The back holds the part that changes how you work with them.',
        cards: t.people,
        key:{ title:'Coaching Key Points', points:[
          `Both are managing something that does not appear in a status report, and all of it shapes how your messages land.`,
          'Read these as capability profiles, not hardship profiles — each names a strength you are probably under-using.',
          `${t.work === 'hybrid' ? `${t.name} is the hybrid centre: colleagues may be together in a room, so consensus often forms before your call rather than during it.` : `${t.name} works fully remote, so the informal corridor conversation that would surface a concern simply does not exist.`}` ] } } },

      { type:'h', text:`How ${t.name} communicates` },
      { type:'columns', cols:[
        { flag:t.flag, title:'Norms', items:t.norms },
        { flag:'⚖', title:'Hierarchy & decisions', items:t.hierarchy },
        { flag:'✎', title:`Feedback — ${t.feedback.rule}`, items:t.feedback.give.concat(t.feedback.receive) } ] },

      { type:'activity', activity:{
        kind:'match', id:`p-${t.id}-signals`,
        title:`What they say, what it means`,
        instructions:`Seven signals you will hear from ${t.name} colleagues. Connect each to what it usually means.`,
        left:  t.signals.map((s,i) => ({ id:'s'+i, text:s.say })),
        right: t.signals.map((s,i) => ({ id:'s'+i, text:s.mean })),
        key:{ title:'Coaching Key Points', points:[
          'None of these are evasions. Each transmits information while protecting a relationship — if you are listening for it.',
          kind === 'cross'
            ? 'Treat any hedge as a potential flag and follow it with "tell me more about that." That single habit prevents most of the expensive misreads.'
            : `You use softening too, which makes this harder rather than easier: you will read their softening as meaning what yours would mean. It often does not.`,
          `The universal question worth normalising in every call: "what do you need from me to move this forward?"` ] } } },

      { type:'h', text:'Teamwork' },
      { type:'callout', variant:'rcm', title:t.teamwork.concept, text:t.teamwork.desc },
      { type:'columns', cols:[ { flag:'👥', title:'What this looks like', items:t.teamwork.items } ] },

      { type:'h', text:'The working calendar' },
      { type:'columns', cols:[ { flag:'📅', title:`${t.name} — plan around these`, items:t.calendar } ] },
      { type:'callout', variant:'insight', title:'One action',
        text:`Map these dates against your billing deadlines and claims submission windows now, before one of them creates a surprise. Sharing a combined calendar in your team channel takes ten minutes.` },

      { type:'h', text:`${t.name} is not one thing` },
      { type:'callout', variant:'warn', title:t.diversity.headline, text:t.diversity.text },
      { type:'p', text:t.diversity.coach },

      { type:'h', text:'In the revenue cycle' },
      { type:'activity', activity:{
        kind:'flip', id:`p-${t.id}-rcm`,
        title:`Three patterns you will meet`,
        instructions:'Front: the pattern and its root. Back: what to do about it.',
        cards: t.rcm.map((r,i) => ({
          mono: t.flag, name: r.pattern, role: `${t.name} · pattern ${i+1}`,
          front: 'Why: ' + r.why, back: r.fix,
          coach: 'The shape of every fix is the same — change what the behaviour costs the person, rather than instructing them to behave differently.' })),
        key:{ title:'Coaching Key Points', points:[
          'None of these are performance problems at root. They are rational responses to the environment.',
          'Change the environment and the behaviour changes with it.',
          'Pick the one you have actually seen. Addressing that one this week beats understanding all three.' ] } } },

      { type:'cfu', questions:[
        { q:`Which of these is a genuine strength ${t.name} brings, rather than a problem to manage?`,
          options: (() => {
            const opts = [t.strengths[0], t.misread[0], t.misread[1], t.misread[2]];
            return opts;
          })(),
          answer:0,
          why:`${t.strengths.join('. ')}. The other three options are how ${t.name} is commonly misread — each is a strength being scored as a defect.` } ] }
    ];

    return { id:`pack-${t.id}`, stage:'core', minutes:14,
      title:`Working with ${t.name}`, tagline:t.headline, blocks, pack:t.id };
  }

  /* ═════════════════════════════════════════ CORE 3 — reading the unsaid */
  function coreUnsaid(you, them){
    const kinds = them.map(t => U.pairKind(you.id, t.id));
    const cross = them.filter(t => U.pairKind(you.id, t.id) === 'cross');
    const same  = them.filter(t => U.pairKind(you.id, t.id) === 'high-high');
    const blocks = [];

    if(cross.length){
      const t = cross[0];
      const lowSide  = you.ctxBand === 'low' ? you : t;
      const highSide = you.ctxBand === 'low' ? t : you;
      blocks.push({ type:'lead', text:`${cap(you.the)} and ${listNames(cross)} sit at opposite ends of how directly things get said. That is the single largest source of misreading between you, and it is fixable with a small number of habits.` });
      blocks.push({ type:'compare',
        left:{ title:`${lowSide.flag} Low-context — ${lowSide.name}`, tone:'cool', items:[
          'Meaning is in the words. Say what you mean.',
          'Instructions should be explicit and written down',
          'Silence means nothing further to add',
          'Disagreement is expressed clearly and directly',
          'Context and relationship matter less than content' ] },
        right:{ title:`${highSide.flag} High-context — ${highSide.name}`, tone:'warm', items:[
          'Meaning lives in tone, relationship and context',
          'Much is implied — reading between the lines is expected',
          'Silence means discomfort, deference or disapproval',
          'Disagreement is softened, implied, or avoided publicly',
          'The relationship IS the context for every message' ] } });
      blocks.push({ type:'callout', variant:'insight', title:'Softening is not deception',
        text:'It is a system that protects everyone’s dignity and lets work continue without rupture. Even in the most direct cultures you do not tell your manager "that is a terrible idea" in a meeting — you say "I want to make sure I understand the approach" and raise it privately. High-context cultures have simply formalised that much further.' });

      if(you.ctxBand === 'low'){
        blocks.push({ type:'callout', variant:'rcm', title:'Your specific risk',
          text:'You will take agreement literally. "Yes", "we will try our best" and silence will all be recorded as commitment. Treat every hedge as a flag and follow it with "tell me more about that."' });
      } else {
        blocks.push({ type:'callout', variant:'rcm', title:'Your specific risk',
          text:'Your careful phrasing will be read literally and downgraded. "There may be some inconsistency" lands as a minor note, not a warning. Give the number, name the risk, and use the words "I want to flag" — they are completely safe in that register.' });
      }
    }

    if(same.length){
      const t = same[0];
      blocks.push({ type:'h', text:`Two indirect styles — ${cap(you.the)} and ${listNames(same)}` });
      blocks.push({ type:'lead', text:`You both soften, you both protect dignity, and you both avoid public disagreement. That shared instinct makes this pairing feel easy and quietly makes it harder: each of you assumes the other's softening carries the same meaning yours would.` });
      blocks.push({ type:'matrix', headers:['The mechanism', you.flag+' '+you.name, t.flag+' '+t.name], rows:[
        ['What softening protects',
          you.id==='ph' ? 'Group harmony — pakikisama' : you.id==='in' ? 'Standing in a hierarchy' : 'Consensus and dignity',
          t.id==='ph' ? 'Group harmony — pakikisama' : t.id==='in' ? 'Standing in a hierarchy' : 'Consensus and dignity'],
        ['Where a concern goes first',
          you.id==='ph' ? 'Sideways, to a trusted peer' : you.id==='in' ? 'Upward, to a senior' : 'Around the group, then upward',
          t.id==='ph' ? 'Sideways, to a trusted peer' : t.id==='in' ? 'Upward, to a senior' : 'Around the group, then upward'],
        ['What a fast yes means',
          you.id==='ph' ? 'Warmth and willingness, not a plan' : you.id==='in' ? 'Respect for the request' : 'Rare — a considered answer takes time',
          t.id==='ph' ? 'Warmth and willingness, not a plan' : t.id==='in' ? 'Respect for the request' : 'Rare — a considered answer takes time'],
        ['Pace of trust',
          you.id==='lk' ? 'Slow to build, then very durable' : 'Builds quickly through warmth',
          t.id==='lk' ? 'Slow to build, then very durable' : 'Builds quickly through warmth'] ] });
      blocks.push({ type:'callout', variant:'warn', title:'The trap in this pairing',
        text:'Neither of you will state the problem plainly, so a small misalignment can travel a long way before anyone names it. Whoever is more senior has to break the symmetry deliberately — by asking direct, factual questions that do not require the other to volunteer bad news.' });
    }

    /* Signals matching for the primary collaborator */
    const primary = them[0];
    blocks.push({ type:'h', text:'Practise the decoder' });
    blocks.push({ type:'activity', activity:{
      kind:'match', id:'a-unsaid',
      title:`${primary.name} — what they said, what they meant`,
      instructions:'Connect each signal to its usual meaning. Click one on the left, then its match on the right.',
      left:  primary.signals.map((s,i)=>({ id:'u'+i, text:s.say })),
      right: primary.signals.map((s,i)=>({ id:'u'+i, text:s.mean })),
      key:{ title:'Coaching Key Points', points:[
        'What is not said is often more important than what is. Your job is building the channel where the unsaid can surface safely.',
        'The single highest-return habit in this whole course: follow up one-to-one with anyone who was quiet in a group call.',
        you.ctxBand === 'low'
          ? 'Ask "what would make this harder?" rather than "do you agree?" The second question has only one socially safe answer.'
          : 'When you are the one softening, add one explicit sentence. You keep your register and remove the ambiguity.' ] } } });

    blocks.push({ type:'cfu', questions:[
      { q: you.ctxBand === 'low'
          ? 'Which phrase should most reliably trigger a follow-up question from you?'
          : 'You need to raise a serious risk with a low-context colleague. Which phrasing lands?',
        options: you.ctxBand === 'low'
          ? ['"That is done and submitted."','"There may be some inconsistency in the payer responses."','"I will send it by Thursday."','"I have escalated this already."']
          : ['"There may be some inconsistency."','"We will try our best."','"I want to flag a risk: the payer file affects about 400 claims."','"It might be slightly challenging."'],
        answer: you.ctxBand === 'low' ? 1 : 2,
        why: you.ctxBand === 'low'
          ? 'Hedge language is the flag. Follow every "may be" and "seems like" with "tell me more about this."'
          : 'A named risk with a number is actionable. The other three are all heard as mild hesitation rather than as a warning.' } ] });

    return { id:'core-3', stage:'core', minutes:14,
      title:'Reading What Is Not Said', tagline:'Decoding the signals in both directions', blocks };
  }


  /* ═══════════════════════════════════════════ CORE 4 — hierarchy */
  function coreHierarchy(you, them){
    const gaps = them.map(t => ({ t, g: you.dims.hierarchy - t.dims.hierarchy }));
    const lower = gaps.filter(x => x.g > 20);   // you sit lower on hierarchy than them
    const higher = gaps.filter(x => x.g < -20); // you sit higher than them
    const blocks = [
      { type:'lead', text:'What looks like slowness or indecision is usually deference, not a capability gap. What looks like an initiative deficit is usually a very clear understanding of where one’s role ends.' },
      { type:'p', text:`On respect for hierarchy, ${you.the} sits at ${you.dims.hierarchy}. ` + them.map(t=>`${t.name} sits at ${t.dims.hierarchy}`).join(', ') + '. That distance decides how much of this module applies to you.' }
    ];
    them.forEach(t => blocks.push({ type:'columns', cols:[
      { flag:t.flag, title:`${t.name} — how authority works`, items:t.hierarchy } ] }));

    if(higher.length){
      blocks.push({ type:'callout', variant:'warn', title:'Your direction of risk',
        text:`You sit higher on hierarchy than ${listNames(higher.map(x=>x.t))}. Your instinct to check upward before acting may read to them as a lack of ownership, and their comfort acting without asking may read to you as overstepping. Neither is true. Say out loud what you have authority to decide, and ask them the same.` });
    }
    if(lower.length){
      blocks.push({ type:'callout', variant:'warn', title:'Your direction of risk',
        text:`You sit lower on hierarchy than ${listNames(lower.map(x=>x.t))}. What feels to you like a normal, empowering "just go ahead" will land as an unbacked instruction they cannot safely act on. Delegating in writing is not bureaucracy here — it is the thing that unblocks them.` });
    }

    blocks.push({ type:'activity', activity:{
      kind:'sequence', id:'a-hier',
      title:'Unblocking a stuck decision',
      instructions:`A team in ${them[0].name} has not acted on a process change you announced four days ago. Put the five steps in the order that actually resolves it.`,
      steps:[
        'Ask "what would make it easier to move this forward?" — surfacing the missing sign-off rather than pressing for compliance',
        'Explain the WHY explicitly: the clinical and financial urgency driving the change',
        'Delegate the specific authority in writing: "you have full authority to approve X up to Y"',
        'Give the team runway to consult and reach internal consensus — two weeks minimum on a major change',
        'Add a standing agenda item: "what is stuck, and what needs a decision from me?"' ],
      key:{ title:'Coaching Key Points', points:[
        'Notice what is not in the sequence: chasing, escalating, restating the deadline. None address the actual blocker.',
        'Diagnose first, then supply context, then remove the authority gap, then allow consultation time.',
        'Four days is insufficient runway for a consensus culture. Two weeks minimum on anything structural.',
        'The standing agenda item is the structural fix — it makes surfacing blockers routine rather than an admission of failure.',
        'After any decision affecting a team lead, brief them privately before the group hears it.' ] } } });

    blocks.push({ type:'cfu', questions:[
      { q:`You override a team lead’s decision in a group call, without briefing them first. What is the most likely consequence in ${them[0].name}?`,
        options:[ 'They will raise their disagreement with you afterwards',
                  'Nothing — it was a routine business decision',
                  'Their authority erodes, they will not tell you, and they become less proactive',
                  'Their team will respect your decisiveness' ],
        answer:2,
        why:'Their ability to lead is tied to your visible respect for their authority. The cost is silent and delayed, which is exactly why it is so often missed.' } ] });

    return { id:'core-4', stage:'core', minutes:10,
      title:'Hierarchy & Decisions', tagline:'Why waiting is not the same as not caring', blocks };
  }

  /* ═════════════════════════════════════ CORE 5 — pressure (boss ask) */
  function corePressure(you, them){
    const hybrid = [you].concat(them).filter(c => c.work === 'hybrid');
    const blocks = [
      { type:'lead', text:'Cultural dynamics are not constant. They intensify under pressure — indirect communicators become more indirect, face-saving strengthens, deference becomes more pronounced. Your signal quality degrades exactly when the stakes are highest.' },
      { type:'callout', variant:'warn', title:'The compounding problem',
        text:'In a calm week a hedge is a soft signal you can afford to miss. During month-end close the same hedge is the only warning you will get — and the person sending it is under more pressure not to say it plainly than they were last week. Read signal strength against the cost of sending it.' },
      { type:'h', text:'The five pressure windows' },
      { type:'pressure', windows:[
        { name:'Month-end billing close', when:'Last 3–5 business days', effect:'Throughput targets peak and so does the cost of stopping to flag something. Unresolved edge cases get carried forward rather than raised, because raising one visibly slows a queue everyone can see.',
          fix:'Create an explicit "park it" channel: somewhere to log an unresolved account without stopping the line and without it reading as failure. Review it the first day after close, never during.' },
        { name:'Payer audit season', when:'Varies by payer and contract', effect:'Documentation scrutiny raises the perceived personal risk of any past error surfacing. Face-saving intensifies sharply and historic issues stop being volunteered.',
          fix:'Announce an amnesty window before audit prep begins — "anything we find and fix now is a win" — then honour it visibly the first time someone tests it.' },
        { name:'Client escalation windows', when:'Live, unpredictable', effect:'Urgency arrives already framed as displeasure. A leader visibly under pressure becomes someone to protect from further bad news, not someone to bring more of it to.',
          fix:'Separate the escalation from your own affect. Say plainly: "the client is unhappy about X. I am not unhappy with you. I need the real picture in the next hour, including anything that looks bad."' },
        { name:'EOB posting deadlines', when:'Daily and cycle-end cutoffs', effect:'Short hard cutoffs plus a high accuracy standard produce silent overtime and unreported backlogs, especially where asking for help reads as incapacity.',
          fix:'Ask for the backlog number as a routine metric with no consequence attached, before the cutoff rather than after. A number you request is far easier to give than one someone must volunteer.' },
        { name:'Go-lives and process cutovers', when:'Planned, often compressed', effect:'A consensus-building team given four days will consult rather than act, and will look non-compliant while doing exactly what its own standard requires.',
          fix:'Two weeks minimum on any change affecting more than a quarter of the workflow, plus a named decision-owner with authority delegated in writing.' } ] }
    ];

    if(hybrid.length){
      blocks.push({ type:'callout', variant:'insight', title:'Remote and hybrid do not feel the same pressure',
        text:`${hybrid.map(c=>c.name).join(' and ')} ${hybrid.length>1?'are':'is'} hybrid; the others are fully remote. In an office, pressure is visible and shared — people see each other stay late and calibrate. Fully remote, each person experiences the crunch alone and assumes everyone else is coping. During pressure windows, over-communicate load deliberately: a shared queue number does more for a remote team than any amount of encouragement.` });
    }

    blocks.push({ type:'activity', activity:{
      kind:'branch', id:'a-pressure',
      title:`Simulation — Month-End, Day 3`,
      instructions:'A high-pressure sequence. Wrong turns explain the mechanism and let you retry.',
      intro:`It is day three of month-end close. Your ${them[0].name} team is running escalations and the queue is visibly behind. On the stand-up, an analyst mentions that a batch of secondary claims "has some differences from what we normally see." A colleague adds that they are "reviewing carefully." The client has already asked twice about the close date.`,
      nodes:[
        { id:'n1', prompt:'You are under real time pressure. What do you do with "some differences"?',
          options:[
            { text:'Note it and push on — the priority is clearing the queue by the cutoff.', ok:false,
              fb:'Under pressure hedges get shorter and rarer, not clearer. "Some differences" during month-end is a stronger signal than the same phrase in a quiet week, because the cost of saying it just went up. You have filed away your only warning.' },
            { text:'Ask for specifics now: "which field is different, and on roughly how many of the batch?"', ok:true,
              fb:'Correct — and note the shape. It asks for a fact they have already verified, not a judgement they would have to defend. A cautious analyst will not speculate in a group, but will always answer a precise factual question.' },
            { text:'Tell the team to escalate anything unusual and move to the next item.', ok:false,
              fb:'A general instruction to escalate does not lower the specific cost of escalating during a visible queue crunch. The instruction is free; acting on it is not.' } ] },
        { id:'n2', prompt:'It is a payer-side remittance format change affecting roughly 400 claims. The team has been reviewing each one manually to be certain. What now?',
          options:[
            { text:'Tell them to stop manual review and process at normal speed to protect the cutoff.', ok:false,
              fb:'You have asked a team whose professional standard is accuracy to abandon it under pressure without replacing it with anything. You will get compliance, a drop in confidence, and errors next cycle.' },
            { text:'Acknowledge the accuracy call, then give explicit authority: "your judgement is right. Spot-check 40, and if the pattern holds, batch the rest — I am authorising that in writing now."', ok:true,
              fb:'Correct. You validated the standard, then removed the authority gap that was forcing exhaustiveness. Under pressure, delegated authority in writing is what converts caution into speed.' },
            { text:'Escalate to the client for a deadline extension before deciding anything internally.', ok:false,
              fb:'Possibly needed later, but you do not yet know the size of the problem — and you have skipped the step that would have told you.' } ] },
        { id:'n3', prompt:'The close lands on time. In the retro, you want this surfaced earlier next cycle. What is most effective?',
          options:[
            { text:'Ask the team to commit to raising issues earlier in future.', ok:false,
              fb:'A commitment to be braver does not change the conditions that made silence rational. Next month-end produces the same hedge.' },
            { text:'Name what the analyst did as the thing that saved the close, and add a standing day-1 item: "anything that looks different from normal this cycle?"', ok:true,
              fb:'Correct. You made the behaviour publicly valuable and gave it a scheduled slot that does not require interrupting a visible queue. Structure beats exhortation.' },
            { text:'Add a control requiring sign-off on any batch with format variances.', ok:false,
              fb:'A useful control, but it catches the problem after someone has already decided to raise it. It does not address the point of failure.' } ] } ],
      outro:'You protected the cutoff without asking anyone to abandon the standard that makes them good at this work.',
      key:{ title:'Coaching Key Points', points:[
        'Under pressure the cost of speaking up rises for them while the value of hearing it rises for you. Those curves move in opposite directions — that is the whole problem.',
        'Ask for facts, not judgements, when time is short. "Which field, and how many?" gets an answer; "is this a problem?" gets reassurance.',
        'Delegated authority in writing converts caution into speed faster than any amount of encouragement.',
        'Never let your own visible stress become another thing your team has to manage. Say who you are frustrated with, because otherwise they will assume it is them.',
        'Install the structural fix in the retro, when nobody is under pressure. Nothing you set up during a crunch survives it.' ] } } });

    blocks.push({ type:'cfu', questions:[
      { q:'During a client escalation you are visibly stressed on the call. What is the most likely effect on a high-deference team?',
        options:[ 'They will match your urgency and move faster',
                  'They will bring you more information so you can act',
                  'They will shield you from further bad news, reducing what you learn',
                  'No effect, provided the instructions are clear' ],
        answer:2,
        why:'A leader under visible pressure becomes someone to protect. Separate the client’s displeasure from your own explicitly.' },
      { q:'Why is a hedge a stronger signal during month-end than in a quiet week?',
        options:[ 'It is not — the phrase means the same regardless of timing',
                  'Because the personal cost of saying it has risen, so it takes more concern to produce the same words',
                  'Because month-end problems are always larger',
                  'Because people are more tired and less precise' ],
        answer:1,
        why:'Read signal strength against the cost of sending it. The same words under higher cost indicate greater underlying concern.' } ] });

    return { id:'core-5', stage:'core', minutes:14,
      title:'Under Pressure', tagline:'Why the dynamics intensify exactly when they cost most', blocks };
  }


  /* ═══════════════════════════════ CORE 6 — protocols (boss ask) */
  function coreProtocols(you, them){
    const all = [you].concat(them);
    const hybrid = all.filter(c => c.work === 'hybrid');
    const remote = all.filter(c => c.work === 'remote');
    const blocks = [
      { type:'lead', text:'Everything so far has been diagnosis. This is the protocol layer — the written standards that make collaboration work without anyone having to read minds on the day. Awareness varies with how tired you are; protocols do not.' },
      { type:'callout', variant:'insight', title:'Why protocols beat good intentions',
        text:'A well-intentioned person under deadline pressure reverts to their cultural default. A protocol survives the pressure because it was agreed when nobody was under any. Adopt these as team standards, publish them, and hold yourself to them first.' },

      { type:'h', text:'Protocol 1 — The pre-call report' },
      { type:'p', text:'A shared written artefact removes the need to raise a concern spontaneously in front of a group. This is the highest-return protocol here, and it helps every pairing regardless of direction.' },
      { type:'protocol', title:'Standard: circulated 24 hours before any client-facing or decision-making call', items:[
        { l:'Status against commitment', d:'Each workstream green / amber / red against what was promised, with the number rather than an adjective.' },
        { l:'What changed since last report', d:'Explicitly including anything that got worse. A named field for bad news means nobody has to decide whether to volunteer it.' },
        { l:'Open risks with an owner and a date', d:'Written risks require nobody to speak up on a call. This is where hedges become facts.' },
        { l:'Decisions needed from the other side', d:'Names the authority gap directly, so waiting-for-permission stops being invisible.' },
        { l:'What we need from the client', d:'Gives the delivery team a legitimate channel to ask upward without it reading as a complaint.' } ] },
      { type:'callout', variant:'rcm', title:'Why the "what got worse" field matters',
        text:'A $40K write-off can begin as "there may be some inconsistency" buried in two emails. A standing field labelled "what got worse this week" turns that from a brave disclosure into a routine form entry. You are not asking for more courage — you are lowering the courage required.' },

      { type:'h', text:'Protocol 2 — Written versus verbal' },
      { type:'p', text:'The channel matters more than the wording. Use this as a standing decision rule in every direction.' },
      { type:'matrix', headers:['Situation','Channel','Why'], rows:[
        ['Praise for an individual','Written, visible to the team','Written recognition carries further and can be re-read. Frame the team contribution first.'],
        ['Praise for the team','Verbal on a call, then written','Team-first recognition avoids creating internal ranking friction.'],
        ['Minor correction','Verbal, 1:1, same day','Small and private keeps it a process note rather than a dignity event.'],
        ['Significant performance feedback','Verbal 1:1 first, written summary after','Never the reverse. Written-first with no conversation reads as a record being built against them.'],
        ['Anything that could imply blame','Verbal, 1:1, never in a group','The one rule with no exceptions in any of the four cultures.'],
        ['Process or policy change','Written pre-read, then verbal','Gives processing time and lets objections form before anyone has to voice one live.'],
        ['Urgent correction mid-cycle','Verbal 1:1 immediately, written same day','Speed does not justify a public channel. It never does.'] ] },

      { type:'h', text:'Protocol 3 — Escalation that accounts for deference' },
      { type:'p', text:'A standard SLA assumes people escalate when the threshold is met. Where deference is high they escalate when the threshold is met AND the personal cost has been paid down. Design for the second condition or your SLA silently runs long.' },
      { type:'protocol', title:'Standard: time-triggered, not judgement-triggered', items:[
        { l:'Escalate on elapsed time, not on severity assessment', d:'"Anything unresolved after 48 hours comes to me" removes the need for a junior person to judge whether something is important enough to bother a senior. That judgement is exactly where deference intervenes.' },
        { l:'Pre-authorise the escalation in writing', d:'Standing permission granted once removes the need to seek it each time.' },
        { l:'Make the first escalation of each cycle visible and welcomed', d:'The first person to test the rule determines whether anyone else uses it. Respond warmly, whatever it contains.' },
        { l:'Track escalation volume as a health metric, not a defect metric', d:'A drop during a high-pressure window is a warning sign, not an improvement.' },
        { l:'Never route an escalation back through the person it concerns', d:'Doing this once closes the channel permanently, and nobody will tell you it happened.' } ] }
    ];

    if(hybrid.length && remote.length){
      blocks.push({ type:'h', text:'Protocol 4 — Hybrid and remote in the same room' });
      blocks.push({ type:'callout', variant:'warn', title:`${hybrid.map(c=>c.name).join(' and ')} hybrid · ${remote.map(c=>c.name).join(', ')} fully remote`,
        text:'This is a structural asymmetry, not a cultural one, and it quietly shapes every decision. Colleagues sharing an office reach alignment in the corridor before the call; fully remote colleagues arrive with no such preparation and no idea it happened. The in-office group is not excluding anyone — they simply cannot see the gap.' });
      blocks.push({ type:'protocol', title:'Standard: level the floor deliberately', items:[
        { l:'Any alignment reached in the office gets written down before the call', d:'One line in the channel. Otherwise the remote participants experience a decision that appears already made.' },
        { l:'Decisions live in the shared channel, never only in the room', d:'If it was not written, it did not happen. This protects the remote side without slowing the in-office side.' },
        { l:'Rotate who chairs between locations', d:'Chairing from the office by default entrenches the asymmetry within a few weeks.' },
        { l:'Watch for the two-conversation call', d:'When people in a room talk over each other naturally, remote participants stop attempting to enter. Name it and hand the floor deliberately.' },
        { l:'Fully remote colleagues need explicit social contact', d:'They have no corridor. The five minutes of personal check-in that feels optional to an office-based colleague is the entire relationship for a remote one.' } ] });
    }

    blocks.push({ type:'activity', activity:{
      kind:'bucket', id:'a-channel',
      title:'Choose the channel',
      instructions:'Ten real situations. Sort each into the channel the protocol calls for.',
      buckets:[ { id:'w', label:'Written first', hint:'Pre-read, summary or written recognition' },
                { id:'v', label:'Verbal 1:1 first', hint:'Private conversation before anything is written' },
                { id:'g', label:'Group call', hint:'Appropriate for everyone to hear' } ],
      items:[
        { text:'A colleague’s error rate has risen for three consecutive weeks', bucket:'v' },
        { text:'A CPT code change affecting a third of submissions', bucket:'w' },
        { text:'Recognising the team for clearing month-end on time', bucket:'g' },
        { text:'Telling a team lead you are reversing their staffing decision', bucket:'v' },
        { text:'The agenda and open risks for tomorrow’s client call', bucket:'w' },
        { text:'Someone flagged a payer discrepancy early and correctly', bucket:'g' },
        { text:'An analyst has been quietly working unpaid overtime', bucket:'v' },
        { text:'Confirming a decision reached verbally last week', bucket:'w' },
        { text:'Asking why a specific account was closed without resolution', bucket:'v' },
        { text:'Announcing the combined multi-country holiday calendar', bucket:'g' } ],
      key:{ title:'Coaching Key Points', points:[
        'Every item that could imply individual fault went to verbal 1:1. That is the whole rule, and it has no exceptions in any of the four cultures.',
        'Everything benefiting from processing time went written-first. People do their best thinking before the call, not during it.',
        'Only two things belong in a group call: recognition, and information that genuinely concerns everyone equally.',
        'The one that catches people out: unpaid overtime is a dignity conversation, not an operational one. Raise it in a group and it never surfaces again.' ] } } });

    blocks.push({ type:'cfu', questions:[
      { q:'Why should escalation triggers be based on elapsed time rather than a severity judgement?',
        options:[ 'Time-based rules are easier to audit',
                  'It removes the judgement about whether to bother a senior — exactly where deference intervenes',
                  'Severity is hard to define in RCM work',
                  'It reduces total escalation volume' ],
        answer:1,
        why:'"Anything unresolved after 48 hours comes to me" requires no courage to act on. A severity assessment does.' },
      { q:'Escalation volume drops sharply during audit season. Most likely reading?',
        options:[ 'Process improvements are working', 'The team is more experienced this cycle',
                  'Perceived personal risk of surfacing an issue has risen — a warning sign', 'Fewer issues occur during audits' ],
        answer:2,
        why:'Under pressure, face-saving intensifies. A drop during a high-pressure window usually means suppression, not absence.' } ] });

    return { id:'core-6', stage:'core', minutes:14,
      title:'Collaboration Protocols', tagline:'Awareness is not enough — these are the standing rules', blocks };
  }

  /* ═════════════════════════════ CORE 7 — virtual meetings (boss ask) */
  function coreMeetings(you, them){
    const all = [you].concat(them);
    const mixed = all.some(c => c.work === 'hybrid') && all.some(c => c.work === 'remote');
    const blocks = [
      { type:'lead', text:'Most of this relationship happens on video calls. That format amplifies every dynamic in this course: silence is more ambiguous, hierarchy is more visible, and the cost of interrupting is higher. A well-run cross-cultural call is a designed thing, not a natural one.' },
      { type:'h', text:'Before the call' },
      { type:'protocol', title:'Design for processing time', items:[
        { l:'Send a pre-read 24 hours ahead', d:'It lets someone arrive having already decided to raise a concern, rather than having to generate the courage live.' },
        { l:'Name who will be asked to speak, in the agenda', d:'A prepared contribution instead of a cold call-out. Never spring a request for analysis on someone in front of an audience.' },
        { l:'Ask for questions in advance, in writing', d:'The concerns that never surface on the call often arrive by email the night before, if you open that door explicitly.' },
        { l:'Keep the invite list as small as the decision requires', d:'Every additional senior attendee raises the cost of disagreement for everyone junior to them.' } ] },
      { type:'h', text:'During the call' },
      { type:'protocol', title:'Handling silence, and creating room', items:[
        { l:'Wait longer than is comfortable', d:'Count to seven after asking a question. Direct-culture meeting norms fill a three-second gap; the answer you want often arrives at second six.' },
        { l:'Never ask "does anyone have concerns?"', d:'It has one socially safe answer where deference is high. Ask "what would make this harder to deliver?" or "what would you push back on if I were not here?"' },
        { l:'Use chat deliberately, not incidentally', d:'Chat lowers the cost of contributing enormously — asynchronous, less public, no interrupting a senior. Say "put it in chat, I will read them all out", then actually do it, without attributing names unless the person used theirs.' },
        { l:'Go round by name in a fixed order for status', d:'A predictable round removes the decision about whether to speak. Announce the order at the start so nobody is caught unprepared.' },
        { l:'Use breakouts for anything requiring genuine debate', d:'Three people without the most senior person present will surface what twelve people with them will not. Give breakouts a written question and require a written answer, so one person reports the group’s view rather than their own.' },
        { l:'Have the most senior person speak last', d:'If the senior view goes first, the discussion is over and the remaining time is confirmation. Speaking last costs nothing and changes what you hear.' },
        { l:'Do not correct anyone on the call', d:'Ever, on any subject, however gently. Note it and take it to a 1:1.' } ] },
      { type:'h', text:'After the call' },
      { type:'protocol', title:'The part most people skip', items:[
        { l:'Follow up 1:1 with everyone who was quiet', d:'The single highest-return habit in this course. "I value your perspective — anything come to mind since we spoke?"' },
        { l:'Circulate written decisions and owners within the day', d:'Removes ambiguity and gives anyone who disagreed a low-cost moment to say so in writing.' },
        { l:'Brief any team lead privately before their team hears a decision', d:'Non-negotiable. Their standing depends on not being surprised in front of their own team.' } ] }
    ];

    if(mixed){
      blocks.push({ type:'callout', variant:'warn', title:'Half the call is in a room, half is not',
        text:`With ${all.filter(c=>c.work==='hybrid').map(c=>c.name).join(' and ')} hybrid and the rest fully remote, some participants share audio, body language and side-glances that others cannot see at all. Two rules fix most of it: everyone dials in individually from their own device even when sitting together, and anything decided in the room is written into the channel before the call. Camera-on norms should also be agreed rather than assumed — for someone working from a shared home, video is not a neutral request.` });
    }

    blocks.push({ type:'activity', activity:{
      kind:'sequence', id:'a-meet',
      title:'Design the call',
      instructions:'You need a genuine decision from a mixed group. Put the seven steps in the order that will actually surface dissent.',
      steps:[
        'Send a written pre-read 24 hours ahead, with the proposal and the open questions named',
        'Invite written questions in advance, and read the anonymous ones out yourself',
        'Open the call with the agenda and the speaking order, so nobody is caught cold',
        'Ask "what would make this harder to deliver?" — never "does anyone have concerns?"',
        'Break into small groups without the most senior person, requiring a written group answer',
        'Give your own view last, after every group has reported',
        'Follow up 1:1 with anyone who stayed quiet, then circulate decisions in writing the same day' ],
      key:{ title:'Coaching Key Points', points:[
        'Every step before the discussion lowers the cost of dissent; every step after captures what the call could not.',
        'The two steps people cut when short of time — the pre-read and the 1:1 follow-up — are the two doing most of the work.',
        'Speaking last is free and changes everything.',
        'Breakouts without the senior person are the most reliable way to surface genuine disagreement. A written group answer means no individual owns the dissent.' ] } } });

    blocks.push({ type:'cfu', questions:[
      { q:'You ask a question on a call and get silence. Most effective immediate response?',
        options:[ 'Move on — nobody has anything to add', 'Call on someone by name to break the silence',
                  'Wait several more seconds, then invite chat responses you read out yourself', 'Repeat the question more simply' ],
        answer:2,
        why:'Silence is discomfort, not absence of view. Waiting past the three-second norm and then offering a lower-cost channel gets the content without putting anyone on the spot.' },
      { q:'Why should the most senior person speak last?',
        options:[ 'More efficient use of their time',
                  'Stating a senior view first effectively ends the discussion where deference is high',
                  'It gives them time to assess the team', 'It is standard facilitation for all meetings' ],
        answer:1,
        why:'Once the senior view is on record, disagreeing publicly carries a cost few will pay.' } ] });

    return { id:'core-7', stage:'core', minutes:12,
      title:'Cross-Cultural Virtual Meetings', tagline:'The call is where most of this is won or lost', blocks };
  }


  /* ══════════════════════════════════ CORE 8 — blind spots (yours) */
  /* The biases named are the ones YOUR OWN defaults generate. A direct culture
     and an indirect one have different blind spots; naming the wrong set is
     exactly the bias this course is trying to remove. */
  const BIAS = {
    low: [
      { mono:'01', name:'The "always agreeable" trap',
        front:'Reading politeness as agreement. Problems compound silently until they become crises.',
        back:'Build private channels. Ask "what would make this harder?" rather than "do you agree?"',
        coach:'The second question has only one socially safe answer. The first has many.' },
      { mono:'02', name:'Speed as a virtue',
        front:'Equating fast responses with competence, so deliberate consensus-seeking looks like slowness.',
        back:'Distinguish "slow because unclear", which you fix with context, from "slow because thorough", which is a feature.',
        coach:'Two very different diagnoses producing identical-looking symptoms on a dashboard.' },
      { mono:'03', name:'The visibility illusion',
        front:'Assuming the performance you see most is the performance that exists most.',
        back:'Ask whose work is most visible to you, and why. Then look at who contributes through channels you do not observe — mentoring, quality checks, institutional knowledge.',
        coach:'Neither of those people will make their own case to you.' },
      { mono:'04', name:'Treating a country as one block',
        front:'Communicating to "the India team" as if it were uniform, missing regional, linguistic and class differences.',
        back:'Replace the collective noun with individual names. Then notice who you have not spoken to in two weeks.',
        coach:'Run the two-week audit honestly and the pattern is usually obvious.' },
      { mono:'05', name:'Urgency without origin',
        front:'Passing on a deadline without the reason for it. To you the urgency is self-evident; several steps removed, it arrives as an arbitrary demand.',
        back:'Never transmit a deadline without its driver. "Friday, because the timely-filing window closes and after that the claim is unbillable" produces engagement. "Friday" produces compliance at best.',
        coach:'The single most common complaint made about direct-culture leaders, and entirely fixable with one extra sentence.' },
      { mono:'06', name:'Feedback without translation',
        front:'Blunt feedback — "this isn’t good enough" — lands as public humiliation rather than as information.',
        back:'Critical feedback: always private, always framed as coaching, always followed up in writing.',
        coach:'You keep the accountability. You change the channel and the frame.' } ],
    high: [
      { mono:'01', name:'Assuming the signal was received',
        front:'You raised the concern in the register available to you and consider it raised. A literal reader recorded a mild note and moved on.',
        back:'After any soft signal, ask directly: "did that land as a risk?" One sentence converts a hint into a flag without changing who you are.',
        coach:'You are not being asked to be blunt. You are being asked to confirm receipt.' },
      { mono:'02', name:'Protecting them from bad news',
        front:'Withholding a problem because the other person is under pressure, or because you hope to fix it first.',
        back:'A direct-culture counterpart would far rather hear it early and half-formed. Delay is read as a judgement failure, not as consideration.',
        coach:'The kindness you intend is the thing that damages trust when it surfaces later.' },
      { mono:'03', name:'"We" when they need "I"',
        front:'Attributing your own work to the team. It is generous, and it is taken literally — no individual contribution enters the record.',
        back:'Use both: "the team cleared the backlog — I rebuilt the follow-up sequence." You keep the collective credit and add the fact they need.',
        coach:'This single habit changes what your manager can say about you in a conversation you are not in.' },
      { mono:'04', name:'Waiting to be asked',
        front:'Holding an opinion until invited, and treating an unasked question as a boundary rather than an oversight.',
        back:'"I want to flag one thing" is a completely safe opening in a direct register. Use it before you are asked.',
        coach:'The absence of a request is read as the absence of interest. That is an expensive silence.' },
      { mono:'05', name:'Reading bluntness as displeasure',
        front:'Hearing a short reply or a direct correction as anger, then managing an emotion that was never there.',
        back:'Check rather than assume: "just so I read that right — is that a concern about the work, or about how we are working together?" It is a safe question and almost always answered plainly.',
        coach:'The energy you spend decoding a neutral message is energy not spent on the work.' },
      { mono:'06', name:'Treating a country as one block',
        front:'Assuming everyone in a large, remote, four-time-zone country shares one set of norms and pressures.',
        back:'Replace the collective noun with individual names. A colleague in New York and one in rural Alabama do not share a context.',
        coach:'Exactly the courtesy you would want extended to your own country.' } ]
  };

  function coreBias(you, them){
    const set = BIAS[you.ctxBand === 'low' ? 'low' : 'high'];
    const blocks = [
      { type:'lead', text:'None of us consciously think these things. They show up in how carefully we craft a message, how often we check in, and how much benefit of the doubt we extend. Name them to change them.' },
      { type:'callout', variant:'insight', title:'These are your own blind spots, not universal ones',
        text:`Every culture generates its own. These six are the ones ${you.the} produces — a colleague in ${them[0].the} is working through a different six in their own version of this module. Each set is adaptive at home and costly at the interface.` },
      { type:'activity', activity:{
        kind:'flip', id:'a-bias',
        title:'Six patterns worth catching in yourself',
        instructions:'Turn each card to see the counter-move.',
        cards: set.map(b => ({ ...b, role:'Bias pattern' })),
        key:{ title:'Coaching Key Points', points:[
          'These are cultural defaults, not character defects. Every one is adaptive inside its own setting.',
          'Notice which ones cost the most in your specific pairing rather than trying to fix all six.',
          'The question worth sitting with: which of these, addressed consistently for ninety days, would most improve your working relationships?' ] } } },
      { type:'reflect', id:'r-bias',
        prompt:'Which of these do you recognise in yourself — and what will you say to yourself when you notice it next time?',
        hint:'Honest beats impressive. This goes into your PDF export.' }
    ];
    return { id:'core-8', stage:'core', minutes:10,
      title:'Your Blind Spots', tagline:`The defaults ${you.the} generates, and their cost at the interface`, blocks };
  }

  /* ═════════════════════════════════════════════ CORE 9 — practice */
  function corePractice(you, them){
    const t = them[0];
    const youLow = you.ctxBand === 'low';
    const blocks = [
      { type:'lead', text:'Two simulations and a rewrite. Every scenario here is a misread that one follow-up conversation would have prevented — and each one carries a real revenue consequence.' },

      { type:'activity', activity:{
        kind:'branch', id:'a-sim1',
        title: youLow ? 'Simulation — "We are managing"' : 'Simulation — The Deadline You Cannot Meet',
        instructions:'Choose your response at each step. Wrong turns explain the mechanism and let you retry.',
        intro: youLow
          ? `A colleague in ${t.name} has had a 12% denial rate on orthopedic claims for three weeks. In your Monday call you ask, "are things okay with the ortho accounts?" They say: "Yes, we are managing."`
          : `Your ${t.name} counterpart has asked for a full AR sweep on 600 accounts by Friday. You have assessed it honestly: it cannot be done properly by Friday. Doing it badly by Friday is possible. It is Tuesday.`,
        nodes: youLow ? [
          { id:'n1', prompt:'How do you read "we are managing"?',
            options:[
              { text:'They have it under control — move to the next agenda item.', ok:false,
                fb:`They are managing in the local sense: handling it internally and hoping not to surface bad news. A 12% rate feels like a personal failure rather than a process signal.` },
              { text:'Ask something specific and non-accusatory: "walk me through your last five ortho denials — what reasons are you seeing?"', ok:true,
                fb:'Correct. A specific, procedural question lets them share data rather than confess a problem. Nobody has to say "I am struggling."' },
              { text:'Tell them the 12% figure is too high and needs to come down.', ok:false,
                fb:'Stating the number in a group call converts a process issue into a dignity issue. They will agree, and you will learn nothing.' } ] },
          { id:'n2', prompt:'The denial reasons show a documentation gap that originates upstream, on the provider side. They have known for two weeks. What do you say?',
            options:[
              { text:'"Why didn’t you tell me this two weeks ago?"', ok:false,
                fb:'This punishes the disclosure you just obtained, and guarantees the next gap stays hidden even longer.' },
              { text:'"This is really useful. I want to hear about denial trends early — flagging them is a quality contribution, not a failure."', ok:true,
                fb:'Correct. You explicitly re-priced the act of flagging. That sentence is the intervention.' },
              { text:'Say nothing about the delay and quietly fix the upstream gap yourself.', ok:false,
                fb:'The gap gets fixed once and the pattern that hid it for two weeks stays completely intact.' } ] } ] : [
          { id:'n1', prompt:'What do you do on Tuesday?',
            options:[
              { text:'Commit to Friday and put the team on overtime to get as close as possible.', ok:false,
                fb:'The most common choice and the most expensive. On Friday you deliver incomplete work having spent goodwill and hours, and your counterpart finds out with no options left.' },
              { text:'Say on Tuesday: "Friday is not achievable at our quality standard. I can do 350 accounts properly by Friday, or all 600 by Wednesday next week. Which serves the client better?"', ok:true,
                fb:'Correct, and the timing is the important part. Tuesday gives three days to manage the client. Two concrete options make you a partner in the decision rather than the bearer of a problem.' },
              { text:'Reply "we will try our best" and reassess on Thursday.', ok:false,
                fb:'"We will try our best" is heard as yes. On Thursday you deliver bad news with no time to act on it, and the earlier signal is not remembered as a warning.' } ] },
          { id:'n2', prompt:'They reply: "It has to be Friday, the client committed." What now?',
            options:[
              { text:'Accept it and do what you can, without further discussion.', ok:false,
                fb:'You hold information they need to decide well. Which 600 accounts matters enormously.' },
              { text:'Ask: "understood. Then help me prioritise — if any are approaching timely-filing limits, I will do those first."', ok:true,
                fb:'Correct. You accepted the constraint and made your expertise useful inside it. Naming timely filing shows you understand what is actually at stake.' },
              { text:'Ask them to reduce the scope, since the deadline is fixed.', ok:false,
                fb:'Right instinct, stated as a demand rather than a contribution. Offer your expertise on how to reduce it.' } ] } ],
        outro: youLow
          ? 'You have the denial reason, the upstream cause, and a colleague who has been told plainly that early flagging is valued.'
          : 'You flagged early, made your expertise useful inside the constraint, and kept the revenue-critical work protected.',
        key:{ title:'Coaching Key Points', points: youLow ? [
          '"We are managing" is one of the most expensive sentences in cross-cultural delivery. Treat it as the beginning of a conversation, never the end.',
          'Specific procedural questions outperform general wellbeing questions, because they do not require a confession.',
          'The durable fix is one explicit sentence, said out loud more than once: flagging a gap is a quality contribution, not a failure.' ] : [
          'Raise an unachievable deadline as early as you know. Tuesday is a partner; Thursday is a problem.',
          'Never say "we will try our best" about something you do not believe is achievable. It is heard as yes.',
          'Always offer options rather than only the obstacle.',
          'Report outcomes in terms of what was at risk, with numbers.' ] } } },

      { type:'activity', activity:{
        kind:'branch', id:'a-sim2',
        title:'Simulation — Feedback That Did Not Land',
        instructions:'A short, high-consequence sequence.',
        intro:`Direct performance feedback was given to a colleague in ${t.name} during a weekly team call. They nodded and said "understood." Three weeks later, nothing has changed.`,
        nodes:[
          { id:'n1', prompt:'What most likely happened?',
            options:[
              { text:'They disagreed with the feedback and quietly dismissed it.', ok:false,
                fb:'Possible, but not the primary mechanism. The public setting is the variable that did the damage.' },
              { text:'The public correction cost them standing. They were too uncomfortable to ask questions and said "understood" to end it.', ok:true,
                fb:'Correct. The nodding was self-protection, not comprehension. Losing face in public shuts down learning entirely — the person is managing the moment, not processing the content.' },
              { text:'The feedback was not specific enough.', ok:false,
                fb:'Specificity would not have helped. However precise the content, a public channel made it unreceivable.' } ] },
          { id:'n2', prompt:'What do you do now?',
            options:[
              { text:'Repeat it in the next team call, more clearly.', ok:false,
                fb:'The same channel produces the same result, plus a second public correction. This is how a fixable issue becomes disengagement.' },
              { text:'Follow up privately as soon as possible, reframed as coaching around their potential.', ok:true,
                fb:'Correct. Private, framed around potential, confirmed in writing. You keep the accountability and change the channel and the frame.' },
              { text:'Escalate to their manager, since direct feedback has not worked.', ok:false,
                fb:'Escalation adds a second, larger audience to a problem caused by having an audience.' } ] } ],
        outro:'Private, framed around potential, confirmed in writing afterwards. That sequence works in all three high-context centres.',
        key:{ title:'Coaching Key Points', points:[
          '"Understood" plus a nod signals the interaction has become about dignity rather than the work.',
          'The rule with no exceptions in any of the four cultures: critical feedback is delivered privately.',
          'Written follow-up gives processing time and removes the pressure to respond correctly in the moment.' ] } } },

      { type:'h', text:'Rewrite the message' },
      { type:'p', text:'A real message written in a direct register. Read it, then rewrite it for the relationship you actually need.' },
      { type:'quote', text:'Team — I’ve reviewed this week’s denial report. The error rate on orthopedic coding is unacceptable at 14%. This needs to be fixed immediately. I need an explanation of what went wrong and a corrective action plan by EOD tomorrow. If this happens again there will be consequences. — Manager' },
      { type:'checklist', id:'c-rewrite', title:'Your rewrite should:', items:[
        'Protect dignity — remove public blame',
        'Acknowledge the relationship first',
        'Frame as problem-solving, not punishment',
        'Give a private channel for an honest response',
        'Keep the accountability — but change the tone',
        'Consider whether this should be a message at all, or a call' ] },
      { type:'reflect', id:'r-rewrite', lines:8,
        prompt:'Write your version of the message.',
        hint:'Take three minutes, then reveal the model answer and compare.',
        reveal:{ title:'A culturally aware version',
          text:'Hi — I’d like to connect with you today or tomorrow for a quick call about the ortho denial numbers from this week. I know the team works hard and I want to understand what’s happening in the process so we can support you.\n\nPlease don’t feel like this is about blame — I see this as a team problem we need to solve together. Can we find 20 minutes?\n\n— [Manager]',
          note:'You kept the accountability. You changed the channel from group to private and the frame from blame to problem-solving. The outcome you need is identical; the path is different. Leaders often fear cultural awareness means losing authority — this version shows you keep the authority and the relationship. Sent in its original form, the first message causes the team lead to absorb blame privately, an agent to carry shame, and everyone to become less likely to report the next error early. The cost is measured in future write-offs.' } }
    ];
    return { id:'core-9', stage:'core', minutes:16, title:'Practice', tagline:'Two simulations and a rewrite', blocks };
  }

  /* ════════════════════════════════════════════════ CORE 10 — close */
  function coreClose(you, them){
    const blocks = [
      { type:'lead', text:'Empathy is not a soft extra. It is how you unlock the full capability of the people you work with, in either direction. It is the work.' },
      { type:'activity', activity:{
        kind:'flip', id:'a-habits',
        title:'Five habits',
        instructions:'Front: the habit. Back: what it looks like on a Tuesday.',
        cards:[
          { mono:'01', name:'Build the relationship before you need it', role:'Habit',
            front:'The relationship is the channel. Without it, even clear instructions land poorly — and bad news never reaches you at all.',
            back:'Start every 1:1 with five minutes of genuine personal check-in. Remember the things people tell you. Learn three facts about where each colleague is from.',
            coach:'Curiosity is the first act of respect. On a fully remote team it is also the only corridor you have.' },
          { mono:'02', name:'Create safety for honest communication', role:'Habit',
            front:'What is not said is the most important signal, in every direction.',
            back:'After every group meeting, follow up 1:1 with anyone who was quiet. For sensitive topics, ask in writing first to give processing time. When a concern arrives indirectly, draw it out gently.',
            coach:'The 1:1 follow-up after group calls is the single highest-return habit in this entire course.' },
          { mono:'03', name:'Protect dignity in every interaction', role:'Habit',
            front:'How you treat people in low moments defines your working relationships more than how you treat them in good ones.',
            back:'Never correct or give developmental feedback in front of peers. Address the process before the person. If you override a lead’s decision, brief them privately first.',
            coach:'Public correction damages not only the individual but your standing with everyone who watched.' },
          { mono:'04', name:'Make recognition land', role:'Habit',
            front:'Recognition aimed the wrong way can create the friction it was meant to prevent — or vanish entirely.',
            back:`In group-oriented settings, team wins first and then individuals. With individually-oriented colleagues, name the person and the specific contribution. Write it down either way.`,
            coach:'The same praise, delivered in the wrong register, either embarrasses someone or fails to register at all.' },
          { mono:'05', name:'Know the calendar and the context', role:'Habit',
            front:'Observances and national holidays across all four centres are structural features of throughput, not edge cases.',
            back:'Map them against your billing cycle and claims deadlines now, before a surprise. Then share the combined calendar with your team and ask how they want to plan around it.',
            coach:'Ten minutes of work that signals awareness more clearly than any statement of values.' } ],
        key:{ title:'Coaching Key Points', points:[
          'These are five actions, not five values. Each can be done this week.',
          'If you adopt only one: follow up 1:1 with the quiet people after every group call.',
          'From a composite voice: "The best manager I had never pretended to understand everything about my life. But she always tried to. That trying was everything."' ] } } },
      { type:'h', text:'Your commitment' },
      { type:'p', text:'Ninety seconds each. Write honestly — these are yours, and they go into your PDF export.' },
      { type:'reflect', id:'r-c1', prompt:'One person I work with least well — and one question I will ask them in our next conversation.' },
      { type:'reflect', id:'r-c2', prompt:'One habit from this course I will change in the next 30 days — and how I will know it is working.' },
      { type:'reflect', id:'r-c3', prompt:'One thing about my own culture I now think my counterparts probably misread — and how I will make it clearer.' },
      { type:'h', text:'Five things that matter most' },
      { type:'summary', items:[
        { t:'The people you work with are whole people', d:'Shaped by region, class, language, faith and family. Not cultural types. The work starts with seeing them.' },
        { t:'Silence, politeness and agreement are different things', d:'In every direction. Build structures for honest communication rather than relying on courage.' },
        { t:'Dignity is non-negotiable', d:'The one rule shared by all four cultures: criticism is delivered privately.' },
        { t:'Your defaults are one operating system, not the universal one', d:`${you.name} has a coherent set of norms. So does everyone you work with. Neither is the standard.` },
        { t:'Translation runs both ways', d:'You are learning to read them. They are learning to read you. Neither side carries this alone.' } ] },
      { type:'callout', variant:'insight', title:'The close',
        text:'This course did not give you a set of rules. It gave you a set of people to think about, a set of protocols to run, and a set of questions to ask yourself. That is the practice. Come back to it.' }
    ];
    return { id:'core-10', stage:'follow', minutes:12, title:'Empathy in Practice', tagline:'Actions you can start this week', blocks };
  }

  /* ═══════════════════════════════════════════════ knowledge check */
  function buildKC(you, them){
    const q = [
      { q:'A colleague says "yes, of course" to a tight deadline and does not deliver. In a high-context setting, most likely cause?',
        options:['They forgot','Saying yes to preserve harmony while privately knowing it was unlikely','No clear deadline was given','Poor time management'],
        answer:1, why:'Ask "what might make this difficult?" to surface the real constraint safely.' },
      { q:'Silence in a group call after you ask for concerns most likely means:',
        options:['Everyone agrees','There are no concerns','People do not feel safe disagreeing publicly','The question was unclear'],
        answer:2, why:'Follow up 1:1. The real feedback rarely surfaces in the group call.' },
      { q:'Why should escalation triggers be time-based rather than severity-based?',
        options:['Easier to audit','It removes the judgement about whether to bother a senior — where deference intervenes','Severity is hard to define','It reduces escalation volume'],
        answer:1, why:'"Anything unresolved after 48 hours comes to me" requires no courage to act on.' },
      { q:'Escalation volume drops sharply during audit season. Most likely reading?',
        options:['Process improvements are working','More experience this cycle','Perceived personal risk has risen — a warning sign','Fewer issues occur'],
        answer:2, why:'Under pressure, face-saving intensifies. Track escalation volume as a health metric.' },
      { q:'You need genuine dissent from a mixed group. Which single change helps most?',
        options:['Ask "any concerns?" twice','Give your recommendation first so they have something to react to','Small breakouts without the senior person, requiring a written group answer','Extend the meeting'],
        answer:2, why:'Breakouts remove the senior audience; a written group answer means no individual owns the dissent.' },
      { q:'A deadline is passed on with no reason attached. What is the cost?',
        options:['None if the deadline is clear','The team will miss it','It arrives as arbitrary, producing compliance rather than engagement','Unnecessary escalation'],
        answer:2, why:'Never transmit a deadline without its driver. One extra sentence changes engagement entirely.' },
      { q:'Which statement best captures the purpose of this course?',
        options:['Rules for behaviour in specific countries','To help everyone communicate more directly','To build a translation layer between operating systems that are all valid','Compliance documentation'],
        answer:2, why:'No culture here is the standard. The damage happens at the interface, and the work is translation.' },
      { q:`${you.the} is commonly misread by others in which way?`,
        options:[ you.misread[0], them[0].misread[0], them[0].misread[1], 'None of these — it is rarely misread' ],
        answer:0, why:`Knowing how you are read is half of this. The other three describe how ${them[0].the} gets misread.` },
      { q:`Which is a genuine strength ${them[0].the} brings?`,
        options:[ them[0].strengths[0], them[0].misread[0], them[0].misread[1], them[0].misread[2] ],
        answer:0, why:`The other three are how ${them[0].the} is misread — each is a strength being scored as a defect.` },
      { q:'Critical feedback should be delivered:',
        options:['In the team call so everyone learns','Privately, framed as coaching, confirmed in writing','In writing first, then discussed','Through their team lead'],
        answer:1, why:'The one rule with no exceptions across all four cultures.' },
      { q:'A hybrid centre and a fully remote one work together. What quietly goes wrong?',
        options:['Time zones drift','Alignment reached in the office never reaches the remote participants in writing','The office team works longer hours','Remote colleagues are less engaged'],
        answer:1, why:'The in-office group is not excluding anyone — they simply cannot see the gap. Write decisions into the channel before the call.' },
      { q:'What makes a timely-filing deadline different from an internal one?',
        options:['It is set by the client','Once it passes the claim can never be billed and the revenue is permanently lost','It carries a proportional penalty','It can be appealed'],
        answer:1, why:'A hard cliff, which is why flagging a filing risk early is among the most valuable things anyone can do.' }
    ];
    return q;
  }

  /* ═══════════════════════════════════════════════════ assemble */
  function buildCourse(youId, themIds){
    const you = C[youId];
    const them = themIds.filter(id => id !== youId && C[id]).map(id => C[id]);
    if(!you || !them.length) return null;
    const modules = [
      coreDefaults(you, them),
      coreIceberg(you, them)
    ];
    them.forEach(t => modules.push(culturePack(you, t)));
    modules.push(coreUnsaid(you, them));
    modules.push(coreHierarchy(you, them));
    modules.push(corePressure(you, them));
    modules.push(coreProtocols(you, them));
    modules.push(coreMeetings(you, them));
    modules.push(coreBias(you, them));
    modules.push(corePractice(you, them));
    modules.push(coreClose(you, them));
    return {
      id: youId,                 /* storage namespace: your own culture */
      you, them,
      name: 'Cross-Cultural Collaboration',
      audience: `${you.flag} ${you.name} · working with ${them.map(t=>t.flag+' '+t.name).join(' · ')}`,
      subtitle: `Built for someone based in ${you.the}, working with ${listNames(them)}`,
      passMark: 75,
      modules,
      knowledgeCheck: buildKC(you, them)
    };
  }

  return { buildCourse, listNames };
})();
