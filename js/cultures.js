/* The four delivery centres, as PEERS.
   Every culture carries the same fields at the same depth — dimension scores,
   communication signals, feedback norms, hierarchy, teamwork concept, calendar,
   internal diversity, two composite people, RCM patterns, how it gets misread,
   and what it brings. No culture is the baseline; the learner's own culture is
   simply whichever one they selected.

   `work` reflects the real operating model: US, PH and India are fully remote;
   Sri Lanka is hybrid. That difference is a live variable in the meetings and
   protocol modules, independently of culture. */

const CULTURES = {

/* ═════════════════════════════════════════════════════════ UNITED STATES */
us: {
  id:'us', name:'United States', short:'US', the:'the United States', flag:'🇺🇸', adj:'US',
  work:'remote', ctxBand:'low',
  dims:{ context:28, collectivism:32, hierarchy:38, indirect:30, relationship:40 },
  headline:'Says the thing, names the individual, moves fast.',

  defaults:[
    'Meaning is in the words — say what you mean',
    'Individual contribution is named and credited',
    'Speed of response signals competence',
    'Flat hierarchy — disagreeing upward is expected',
    'Concerns are raised in the meeting, by whoever has them',
    'Correction is treated as information, not judgement' ],

  signals:[
    { say:'"This needs some work."',        mean:'There is a real problem; please revise substantially' },
    { say:'"Can you send me an update?"',   mean:'A neutral request for information — not a complaint' },
    { say:'"I have a few thoughts."',       mean:'I disagree, and I am about to say so directly' },
    { say:'"Let’s take this offline."',mean:'Not for the group; we will discuss separately' },
    { say:'"No worries — it happens."',     mean:'Genuinely resolved, not politeness covering displeasure' },
    { say:'"What do you think?"',           mean:'A real request for your opinion; silence reads as having none' },
    { say:'"Circling back on this."',       mean:'This is now overdue and I am chasing it politely' } ],

  norms:[
    'Directness is the courtesy — it saves the other person guessing',
    'Small talk is brief; the agenda starts early',
    'Interrupting to add something is participation, not rudeness',
    'Written follow-up is expected after any verbal decision',
    'First names and informality regardless of seniority',
    '"I don’t know, let me find out" is a respected answer' ],

  feedback:{
    rule:'Feedback separates the work from the person — and most Americans assume that separation is obvious to everyone.',
    give:[ 'Be specific about the work, not the person',
           'Say it early rather than saving it for a review',
           'Follow verbal feedback with a short written summary' ],
    receive:[ 'Ask clarifying questions immediately — it reads as engagement',
              'Disagreeing with feedback is acceptable if you give reasons',
              'A single mention is usually the whole message; it will not be repeated' ] },

  hierarchy:[
    'Junior staff are expected to act inside a broad mandate without checking',
    'Challenging a manager’s plan in a meeting is a sign of ownership',
    'Titles matter less than the ability to make a decision quickly',
    'Skip-level contact is normal and rarely political',
    'Silence after a proposal is read as consent to proceed' ],

  teamwork:{
    concept:'Individual ownership',
    desc:'Work is assigned to a named person who owns the outcome. Collaboration is real, but accountability stays individual.',
    items:[ 'Credit is attributed to individuals, publicly and by name',
            'Volunteering for visible work is expected, not immodest',
            'Asking for help early is read as good judgement, not weakness',
            'Team wins are celebrated, then broken down by contributor' ] },

  calendar:[
    'Thanksgiving (late Nov) — the single most protected family period of the year',
    'Independence Day (Jul 4) and the week around it — heavy leave',
    'Christmas / New Year — reduced capacity, but year-end close still lands',
    'Memorial Day and Labor Day mark the summer bookends; Fridays thin out in summer',
    'Religion is largely private and not assumed; do not infer from name or region',
    'School calendars drive parental availability far more than public holidays' ],

  diversity:{
    headline:'"The US team" spans four time zones and very different economics',
    text:'A colleague in New York and one in rural Alabama have different costs of living, politics, accents and assumptions. Healthcare access, student debt and childcare costs shape decisions in ways rarely mentioned at work. Fully remote working means many have never met a colleague in person, and isolation is a real and under-reported factor.',
    coach:'Americans are often treated as a single culture by teams abroad, in exactly the way Americans are asked not to treat "the India team" as one thing.' },

  people:[
    { mono:'BC', name:'Brandon, 38', role:'Client Services Manager', place:'Chicago, Illinois · United States',
      meta:'7 years tenure · Fully remote · Two children · First in family to finish college',
      front:'Sits between the client’s revenue-cycle leadership and the delivery teams, and absorbs pressure from both directions. He has worked from a spare bedroom since 2020 and has met two of his eleven direct reports in person. He measures himself on client retention, which is judged on numbers he does not personally produce. When he chases a deadline, he is usually relaying one a client already committed to their own board.',
      back:'His abruptness under pressure is almost never aimed at the person receiving it. He rarely explains the origin of a deadline because to him the chain is obvious. Ask him "what is driving this date?" and he will answer readily — and be slightly embarrassed he did not say so.',
      coach:'Brandon is the person on the other end of the "arbitrary Friday deadline". Seeing his position makes that deadline legible rather than capricious.' },
    { mono:'AM', name:'Alyssa, 29', role:'AR Supervisor', place:'Tampa, Florida · United States',
      meta:'4 years tenure · Fully remote · Single parent · Studying part-time',
      front:'Runs a queue and a household on the same calendar. Fully remote work is what makes her job possible at all, and she guards her hours carefully. She is direct to the point of bluntness in writing because she has very little slack in her day, and she reads long courteous emails as a delay rather than as respect.',
      back:'Her brevity is a time constraint, not coldness or displeasure. A three-word reply from Alyssa means agreement, nothing more. If you need warmth from her, ask for a call — she gives it readily and remembers what you told her.',
      coach:'The mirror of the formal-email misread: where a Sri Lankan colleague’s long email signals respect, Alyssa’s short one signals nothing at all. Neither is a message about the relationship.' } ],

  rcm:[
    { pattern:'A US colleague reopens a decision that felt settled',
      why:'New information from the client arrived and re-litigating is normal, not a reversal of trust.',
      fix:'Ask what changed. They will tell you plainly, and it is usually a payer or compliance fact rather than a change of mind.' },
    { pattern:'Deadlines arrive with no explanation attached',
      why:'The reasoning compressed as it travelled down the chain. To the sender it is self-evident.',
      fix:'"What is driving this date — a filing window or a client commitment?" is a completely safe question and almost always answered.' },
    { pattern:'Direct criticism of a deliverable in a group call',
      why:'The work is being separated from the person, and the sender assumes that is understood.',
      fix:'It is safe to say "could we take detail like that one-to-one?" Most will simply agree and adjust.' } ],

  misread:[
    'Bluntness is read as anger or dissatisfaction, when it is usually neutral',
    'Speed of reply is read as impatience, when it is a competence norm',
    'Informality with seniors is read as disrespect, when it is the default register',
    'Reopening decisions is read as instability, when it is responsiveness to new facts' ],

  strengths:[
    'Problems surface early because raising them is low-cost',
    'Decisions move quickly and are rarely stuck waiting for permission',
    'Feedback is explicit, so expectations are seldom ambiguous',
    'Individuals will self-nominate for difficult work' ]
},

/* ═══════════════════════════════════════════════════════════ PHILIPPINES */
ph: {
  id:'ph', name:'Philippines', short:'PH', the:'the Philippines', flag:'🇵🇭', adj:'Filipino',
  work:'remote', ctxBand:'high',
  dims:{ context:78, collectivism:82, hierarchy:88, indirect:80, relationship:84 },
  headline:'Protects the relationship first, and reads warmth as the channel.',

  defaults:[
    'Meaning lives in tone, warmth and relationship',
    'Group harmony outranks individual recognition',
    'Thoroughness signals competence and respect',
    'Hierarchy is how respect is expressed',
    'Concerns travel through trusted relationships, then upward',
    'Correction in public costs a person their standing' ],

  signals:[
    { say:'"Yes, of course!"',              mean:'Often "I heard you" or "I will not disappoint you here"' },
    { say:'"We are managing."',             mean:'We are absorbing a problem internally and hoping to fix it' },
    { say:'A long pause before answering',  mean:'The honest answer is not one you will want to hear' },
    { say:'"I will try my best."',          mean:'This is unlikely, and I cannot say so directly' },
    { say:'"Maybe we can check first."',    mean:'I disagree, and I am giving us both a way out' },
    { say:'Laughter after bad news',        mean:'Discomfort management, not lack of seriousness' },
    { say:'Bringing a colleague to a call', mean:'Seeking backup before raising something difficult' } ],

  norms:[
    '"Pakikisama" — going along to keep group harmony intact',
    '"Hiya" (shame) gives errors deeper emotional weight than you expect',
    'Warmth and humour are trust signals, not time-wasters',
    'Relationship talk before business talk is the normal order',
    '"Po" and "opo" mark respect for seniority inside the language itself',
    'Disagreement is softened — watch for hesitation rather than objection' ],

  feedback:{
    rule:'Never in front of peers. The audience, not the wording, is what does the damage.',
    give:[ 'Always private, always framed as coaching',
           'Open with the relationship before the issue',
           'Address the process before the person: "what happened here?"' ],
    receive:[ 'Agreement in the moment may be politeness, not comprehension',
              'Follow up in writing afterwards so it can be re-read calmly',
              'Check understanding a day later, privately' ] },

  hierarchy:[
    '"Yes" to a manager is rarely challenged, even when the deadline is impossible',
    'A team lead’s authority with their own team must be actively protected',
    'Decisions need group buy-in; rushing produces surface agreement only',
    'Bad news is fixed locally before it is escalated upward',
    'Being asked a question you cannot answer in public is a real cost' ],

  teamwork:{
    concept:'Bayanihan',
    desc:'Communal effort — helping colleagues without being asked is a cultural expectation, not a personality trait.',
    items:[ 'Team members naturally cover for each other; honour it publicly',
            '"Kapwa" ties a person’s sense of self to the group’s standing',
            'Celebrate team wins first, then individual contributions',
            'Singling one person out can create friction with their peers' ] },

  calendar:[
    'Holy Week (April) — reduced energy and non-negotiable leave',
    'All Saints’ Day (Nov 1–2) — families travel to visit graves; a major observance',
    'Christmas season runs from September; December capacity plans should assume it',
    '~85% Catholic — faith shapes obligation, guilt and how errors are carried',
    '"Bahala na" — trust in providence; explains resilience under pressure',
    'Church community is often the primary social and support network' ],

  diversity:{
    headline:'Luzon, Visayas and Mindanao are not interchangeable',
    text:'Tagalog-speaking Manila is the economic centre, but many staff come from Visayas or Mindanao and navigate stereotypes about their region. A Manila private university and a provincial state college produce very different social capital and perceived career ceilings. Internal migrants carry family separation and remittance obligations alongside the day job.',
    coach:'Would you treat someone from rural Mississippi and someone from Manhattan as culturally identical because both are American? The same applies here.' },

  people:[
    { mono:'RM', name:'Rose Marie, 28', role:'Customer Support Agent', place:'Cebu City, Visayas · Philippines',
      meta:'3 years tenure · Fully remote · Roman Catholic · First-generation professional',
      front:'Eldest of four from a working family in Cebu, and the first to hold a corporate job. Her income supports household bills, a sibling’s tuition and contributions to grandparents in the province. Her parish community is her main social anchor. Stability and family security, rather than rapid advancement, are her stated motivators.',
      back:'Your approval signals safety, not just performance. Warm and consistent, she thrives; cold or unpredictable, she quietly withdraws. Praise her — but never in a way that singles her out from her peers.',
      coach:'Her role carries weight beyond her own pay. The takeaway is not that she is fragile; it is that casual indifference has consequences you will never see reported back.' },
    { mono:'JB', name:'Jerome, 34', role:'Team Lead', place:'Metro Manila, originally Mindanao · Philippines',
      meta:'6 years tenure · Fully remote · Born-again Christian · Married, two children',
      front:'Moved from Mindanao to Manila at 22 for work, navigating a regional identity divide. Deeply proud, quietly ambitious, protective of his team’s reputation with leadership abroad. He was passed over for promotion once and is watching whether the system is fair.',
      back:'He needs to be respected as a leader in front of his team. Override his decisions without explanation and you erode his authority — he will not tell you, he will simply become less proactive. Brief him privately before any team-wide announcement.',
      coach:'Jerome carries double weight: regional outsider and frontline leader visible in both directions. Five minutes of private briefing before an all-hands costs almost nothing.' } ],

  rcm:[
    { pattern:'A coder finds a documentation gap and does not flag it',
      why:'Fear of carrying bad news upward, plus hiya. They may fix it quietly, or hope it does not become a denial.',
      fix:'Create a no-fault finding norm out loud: "flagging a gap is a quality contribution, not a failure."' },
    { pattern:'AR agents stay polite with payer reps who give vague non-answers',
      why:'Indirect communication and deference applied to a counterpart who requires persistence.',
      fix:'Script assertiveness explicitly and frame it as the professional standard for payer calls — not as "be less polite."' },
    { pattern:'"We are managing" in response to a metric question',
      why:'Handling it internally rather than surfacing it, because surfacing it feels like failure.',
      fix:'Ask something specific and procedural: "walk me through your last five denials — what reasons are you seeing?"' } ],

  misread:[
    'Warmth is read as informality rather than as trust-building',
    'Agreement is read as commitment when it is often courtesy',
    'Thoroughness is read as slowness',
    'Quietness after a decision is read as acceptance' ],

  strengths:[
    'Exceptional service warmth that clients notice and remember',
    'Genuine mutual cover — capacity gaps get absorbed without escalation',
    'High accuracy under repetitive, high-volume work',
    'Strong loyalty to managers who invest in the relationship' ]
},

/* ═════════════════════════════════════════════════════════════════ INDIA */
in: {
  id:'in', name:'India', short:'India', the:'India', flag:'🇮🇳', adj:'Indian',
  work:'remote', ctxBand:'high',
  dims:{ context:72, collectivism:65, hierarchy:77, indirect:74, relationship:70 },
  headline:'Formal upward, resourceful sideways, and far more varied inside than it looks.',

  defaults:[
    'Answers may be framed to please — read between the lines',
    'Individual ambition is real, but expressed inside a team frame',
    'Thoroughness and correctness signal competence',
    'Age plus demonstrated experience confers standing',
    'Concerns route upward through a senior rather than across',
    'Criticism must be delivered privately to preserve standing' ],

  signals:[
    { say:'"There may be some inconsistency."', mean:'There is a serious problem and I am flagging it carefully' },
    { say:'The head wobble',                    mean:'Yes, maybe, or "I am listening" — context decides' },
    { say:'"I will check and revert."',         mean:'Either genuine, or a courteous way to avoid saying no' },
    { say:'"As per your convenience."',         mean:'Deference; the real preference has not been stated' },
    { say:'"Slight delay is there."',           mean:'The delay may be substantial' },
    { say:'"Understood, sir/ma’am."',      mean:'The conversation is now about respect, not the content' },
    { say:'Copying a senior into a thread',     mean:'Escalating, or seeking cover, without saying so' } ],

  norms:[
    'Email tone stays formal even with well-known contacts',
    'Directness increases with trust and with seniority — it is earned',
    'Regional variation is large: North, South and West differ sharply',
    'A colleague may be working in their third language on your call',
    'Hierarchy is respected in form even where it is questioned in private',
    'Relationship with the manager often outranks relationship with the org' ],

  feedback:{
    rule:'Private, framed around potential rather than the gap, confirmed in writing.',
    give:[ 'Never in a group setting, however gently phrased',
           'Frame around what they could become, not only what went wrong',
           'Put the summary in writing so it can be processed calmly' ],
    receive:[ '"Understood" in a group is self-protection, not comprehension',
              'Follow up one-to-one within a day',
              'Invite questions explicitly; they will rarely be volunteered' ] },

  hierarchy:[
    'Even clear decisions may wait for senior confirmation',
    'Junior staff will not act outside an explicitly delegated mandate',
    'Ambiguity is tolerated; waiting for clarity from above is preferred',
    'Seniority is a genuine leadership asset, not an obstacle',
    'Skip-level contact can be read as political unless normalised' ],

  teamwork:{
    concept:'Jugaad',
    desc:'Flexible ingenuity — creative workarounds under resource pressure, treated as a skill rather than a lapse in process.',
    items:[ 'Workarounds are a capability to celebrate, not evidence of weak process',
            'Team loyalty often attaches to the manager as much as the organisation',
            'Cross-functional collaboration usually needs explicit structure',
            'Individual ambition coexists comfortably with team framing' ] },

  calendar:[
    'Diwali (Oct/Nov) — the largest single capacity event of the year',
    'Holi (March), Pongal (January, especially Tamil Nadu), Onam (Kerala)',
    'Ramadan and Eid — fasting materially affects energy and scheduling',
    'Religion is plural: Hindu, Muslim, Christian, Sikh, Jain — always ask individually',
    'Regional festivals differ by state; a single national calendar will be wrong',
    'Wedding season (Nov–Feb) drives significant planned leave' ],

  diversity:{
    headline:'Caste, class, language and region are layered and live',
    text:'North and South carry deep cultural, linguistic and sometimes political differences. Hindi speakers can unconsciously dominate a shared workplace. Caste persists in housing and professional life, and colleagues who entered via reservation policies carry awareness of how that is perceived. First-generation professionals describe a "code-switching tax" — the energy cost of performing workplace norms never modelled at home.',
    coach:'This is uncomfortable, and naming that is part of handling it well. Do not raise it as curiosity; simply do not build rituals that assume a single shared background.' },

  people:[
    { mono:'PK', name:'Priya, 26', role:'Operations Analyst', place:'Chennai · India',
      meta:'2 years tenure · Fully remote · Hindu · Engineering graduate',
      front:'Navigating family expectations around marriage while establishing herself as a technical contributor. She holds strong opinions she rarely voices upward, and code-switches between a deferential professional register and a more assertive personal one.',
      back:'She is waiting for permission to be more than she currently shows. Ask for her analysis, not just her output — she may be the most underused capability on the team.',
      coach:'"What is your read on this?" grants the permission she is waiting for. "Did you complete the task?" confirms the ceiling she already assumes.' },
    { mono:'RS', name:'Rajan, 41', role:'Senior Operations Manager', place:'Mumbai · India',
      meta:'9 years tenure · Fully remote · Married, teenage son',
      front:'Built his expertise through operational depth rather than elite credentials, and holds more institutional knowledge of the accounts than anyone. Highly competent, deeply loyal, manages through relationships. His professional identity is tied to demonstrated experience.',
      back:'He reads fairness signals closely. How recognition and advancement are distributed tells him whether the system rewards capability. Fast-track juniors without acknowledging his knowledge and he disengages quietly.',
      coach:'Name his institutional knowledge explicitly in team settings, monthly. That is not consolation — it is accurate credit for the most valuable asset on the account.' } ],

  rcm:[
    { pattern:'"The payer was not cooperative" and the account is closed',
      why:'May mean "I do not know how to escalate" or "I am stuck" — saying so directly feels like admitting incompetence.',
      fix:'"Walk me through what you tried", then "what would it take to move this?" Neither question requires naming your own gap.' },
    { pattern:'An internal error is not reported upward for days',
      why:'Shame plus hierarchy — the team tried to fix it first, and reporting felt like admitting failure to a senior.',
      fix:'Celebrate early escalation publicly and by name. Publicly re-price the act of escalating.' },
    { pattern:'A risk is signalled in hedged language across several emails',
      why:'Culturally appropriate phrasing for a serious concern raised respectfully.',
      fix:'Treat every "may be" and "seems like" as a flag and follow it with "tell me more about this."' } ],

  misread:[
    'Formality is read as distance or stiffness rather than respect',
    'Hedged risk language is read as low confidence rather than as a warning',
    'Routing through a senior is read as avoiding ownership',
    'Silence in a group is read as agreement' ],

  strengths:[
    'Deep analytical capability that is often under-asked',
    'Resourceful problem-solving under constraint',
    'Very high institutional retention of account knowledge',
    'Strong written discipline and documentation' ]
},

/* ═════════════════════════════════════════════════════════════ SRI LANKA */
lk: {
  id:'lk', name:'Sri Lanka', short:'Sri Lanka', the:'Sri Lanka', flag:'🇱🇰', adj:'Sri Lankan',
  work:'hybrid', ctxBand:'high',
  dims:{ context:80, collectivism:78, hierarchy:85, indirect:82, relationship:76 },
  headline:'Builds consensus before it moves, then holds the commitment firmly.',

  defaults:[
    'Politeness and preserving dignity are high priorities',
    'Consensus is sought before action is taken',
    'Accuracy and conscientiousness signal competence',
    'Unilateral action by junior staff causes genuine discomfort',
    'Concerns are raised privately, after consultation',
    'Diplomatic framing is expected even for minor corrections' ],

  signals:[
    { say:'"We wanted to be sure we understood."', mean:'The runway you gave was too short to consult properly' },
    { say:'Silence after a decision',              mean:'Not approval — check privately' },
    { say:'"We will look into it."',               mean:'A genuine commitment to investigate, usually thoroughly' },
    { say:'A long, carefully worded email',        mean:'Respect and conscientiousness, not inefficiency' },
    { say:'"That may be difficult."',              mean:'That is not possible' },
    { say:'Consulting colleagues before replying',  mean:'Building the consensus that will make the commitment durable' },
    { say:'"If it is convenient."',                mean:'A real constraint is being raised very softly' } ],

  norms:[
    'Very high regard for politeness and for preserving dignity',
    'Trust builds slowly — and once established, honesty flows freely',
    'Buddhist and Hindu values of patience and non-confrontation run genuinely deep',
    'Teams work across Sinhala, Tamil and English in a single day',
    'Small talk is investment rather than waste',
    'Criticism must always be delivered privately' ],

  feedback:{
    rule:'Private, unhurried, and with the accuracy acknowledged before the gap.',
    give:[ 'Acknowledge the care taken before raising the issue',
           'Allow processing time; do not require an immediate response',
           'Diplomatic framing is not softening — it is the register that lands' ],
    receive:[ 'A considered reply the next day is a better signal than a fast one',
              'Silence in the moment is discomfort, not disagreement',
              'Written follow-up will be read carefully and acted on' ] },

  hierarchy:[
    'Wide consultation is preferred before committing to action',
    'Unilateral decisions by junior staff cause real discomfort',
    'Silence after a decision is never approval — always check privately',
    'Once consensus is given, commitment is strong and sustained',
    'Seniority carries obligation as much as authority' ],

  teamwork:{
    concept:'Harmony-first collaboration',
    desc:'Avoiding interpersonal conflict is a high priority, and consensus before action is what makes commitment durable.',
    items:[ 'The patience before action is building commitment, not resisting it',
            'Individual credit-taking can create friction with peers',
            'Strong loyalty follows once trust and stability are established',
            'Flexible problem-solving under constraint is well practised' ] },

  calendar:[
    'Vesak (May) — a major national observance; avoid critical cutovers',
    'Thai Pongal (January) and Deepavali — Tamil Hindu observances',
    'Ramadan and Eid for the Muslim community',
    'Sinhala and Tamil New Year (April) — the largest travel period of the year',
    'Poya (full moon) days are public holidays every month — plan around them',
    'Supporting parents is a cultural given that affects availability' ],

  diversity:{
    headline:'Sinhalese, Tamil and Muslim communities, and a recent war',
    text:'The 26-year civil war ended in 2009, within living memory for every colleague. The three communities have distinct languages, observances and family histories, and the Northern and Eastern Provinces have different post-war trajectories from Colombo. The 2022 economic crisis affected households very unevenly. It is also a large and internally varied centre.',
    coach:'Do not raise the war as a topic of curiosity, and do not assume shared views. Use the multi-faith calendar rather than only the Buddhist one, and let people volunteer their own background.' },

  people:[
    { mono:'NF', name:'Nimal, 32', role:'Finance & Operations', place:'Colombo · Sri Lanka',
      meta:'4 years tenure · Hybrid · Buddhist, Sinhalese · Lives with parents',
      front:'Grew up in the shadow of the civil war, and his generation carries a collective memory of instability. The 2022 crisis — fuel shortages, inflation, extended power cuts — made continuity feel consequential in a way colleagues elsewhere rarely register. Patience, non-confrontation and communal harmony genuinely shape his working style.',
      back:'Stability and predictability are profoundly motivating. Sudden process changes or erratic feedback register more strongly than you may anticipate. His patience is a value, not passivity. Consistency is what keeps him fully present.',
      coach:'When Nimal consults before deciding he is being conscientious. Meeting that with impatience damages trust and does not speed anything up.' },
    { mono:'DT', name:'Dilani, 29', role:'Senior AR Analyst', place:'Colombo, family from the Eastern Province · Sri Lanka',
      meta:'5 years tenure · Hybrid · Tamil · Hindu · Supports a younger brother through university',
      front:'Raised in the Eastern Province, now based in Colombo, working across English, Tamil and Sinhala. One of the strongest technical performers on L1-2 escalations, and mentors two junior analysts informally. Precise, evidence-driven, and notably reluctant to speculate in front of a group — when she speaks, she has already checked.',
      back:'Her caution in group settings is a professional standard, not diffidence. Ask for a considered read with a little lead time rather than an instant opinion on a call, and you get the best analysis available. Recognise her mentoring, not only her numbers.',
      coach:'She will always answer a precise factual question, and rarely a speculative one. Shape your questions accordingly and she becomes your best early-warning system.' } ],

  rcm:[
    { pattern:'Every claim is triple-checked, slowing throughput',
      why:'Conscientiousness plus a low tolerance for error in a high-stakes environment.',
      fix:'Acknowledge the accuracy first. If speed is genuinely needed, give the clinical or financial reason explicitly.' },
    { pattern:'A process change announced Friday is not live by Monday',
      why:'The team needed time to consult, understand and agree before acting.',
      fix:'Two weeks minimum on any change affecting a quarter of the workflow, with a named decision-owner authorised in writing.' },
    { pattern:'Individual performance feedback causes visible withdrawal',
      why:'Individual assessment reads as being singled out in a group-oriented setting.',
      fix:'Frame reviews as team growth conversations, then locate the individual contribution inside that.' } ],

  misread:[
    'Consultation is read as indecision',
    'Careful writing is read as inefficiency',
    'Politeness is read as agreement',
    'Slower initial trust is read as disengagement' ],

  strengths:[
    'Exceptional accuracy and low rework rates',
    'Durable commitment once consensus is reached',
    'Genuine multilingual capability in daily operation',
    'Strong resilience developed through real instability' ]
}

};

/* ---------------------------------------------------------------- helpers */
const CultureUtil = {
  list: () => ['us','ph','in','lk'].map(id => CULTURES[id]),
  get:  id => CULTURES[id] || null,

  /* Distance between two cultures on one dimension, and overall. */
  gap: (a, b, dim) => Math.abs(CULTURES[a].dims[dim] - CULTURES[b].dims[dim]),
  spread(a, b){
    const d = CULTURES[a].dims, e = CULTURES[b].dims;
    return Object.keys(d).reduce((m,k) => Math.max(m, Math.abs(d[k]-e[k])), 0);
  },

  /* The pairing shape decides which concepts a learner actually needs. */
  pairKind(a, b){
    const A = CULTURES[a], B = CULTURES[b];
    if(A.ctxBand !== B.ctxBand) return 'cross';   // low <-> high: translation
    return A.ctxBand === 'high' ? 'high-high' : 'low-low';  // same band: nuance
  },
  worksDiffer: (a, b) => CULTURES[a].work !== CULTURES[b].work
};
