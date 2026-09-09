/* TRACK A — "Leading Offshore Teams" (US-side participants)
   Source: "Cross culture training Induction.pptx" + reviewer feedback (structural fixes,
   content gaps, profile reframing). Facilitator notes supply all Coaching Key Points. */

const TRACK_US = {
  id: 'us',
  name: 'Leading Offshore Teams',
  audience: 'For US-side leaders',
  subtitle: 'Understanding communication, culture and the people you lead',
  regions: 'Philippines · India · Sri Lanka',
  accent: 'blue',
  passMark: 75,

  modules: [

  /* ------------------------------------------------------------------ 1 */
  {
    id:'us-m1', title:'Two Operating Systems', minutes:8, stage:'pre',
    tagline:'Why this course exists, and the gap it closes',
    blocks:[
      { type:'lead', text:'Neither style is wrong. They are different operating systems. When US leaders apply their own defaults to teams in the Philippines, India and Sri Lanka, the result is miscommunication and wasted talent — not because anyone failed, but because no one translated.' },
      { type:'p', text:'This is not a country guide. It moves from frameworks, to people, to self-examination, to application in your actual work — billing, coding, claims and AR — and then to the protocols that hold up under deadline pressure.' },
      { type:'callout', variant:'insight', title:'There is a companion to this track',
        text:'A parallel course, Working with US Teams, teaches colleagues in the Philippines, India and Sri Lanka to read US working norms — directness, individual recognition, speed-as-competence, and where the urgency in your deadlines actually originates. Translation only works if it runs in both directions. You can switch tracks at any time from the course menu.' },
      { type:'compare',
        left:  { title:'US default style', tone:'cool', items:[
          'Direct — say what you mean',
          'Individual accountability and recognition',
          'Speed signals competence',
          'Flat hierarchy — challenge the boss',
          'Silence means agreement, or no ideas',
          'Feedback is information, not judgment' ] },
        right: { title:'Philippines · India · Sri Lanka', tone:'warm', items:[
          'Indirect — meaning lives in context and tone',
          'Group harmony and collective success',
          'Thoroughness signals competence and respect',
          'Hierarchy is how trust is expressed',
          'Silence means discomfort or deference',
          'Feedback in public means loss of dignity' ] } },
      { type:'activity', activity:{
          kind:'bucket', id:'a1-os',
          title:'Sort the operating systems',
          instructions:'Twelve workplace assumptions. Drag each into the culture whose default it describes. On a phone, tap an item then tap a bucket.',
          buckets:[
            { id:'us',   label:'US default',             hint:'Low-context, individualist' },
            { id:'asia', label:'PH · India · Sri Lanka', hint:'High-context, collectivist' } ],
          items:[
            { text:'Say what you mean — meaning is in the words', bucket:'us' },
            { text:'Meaning lives in tone, relationship and context', bucket:'asia' },
            { text:'Individual accountability and personal recognition', bucket:'us' },
            { text:'Group harmony and collective success', bucket:'asia' },
            { text:'Speed signals competence', bucket:'us' },
            { text:'Thoroughness signals competence and respect', bucket:'asia' },
            { text:'Flat hierarchy — challenging the boss is healthy', bucket:'us' },
            { text:'Hierarchy is how trust and respect are expressed', bucket:'asia' },
            { text:'Silence means agreement or nothing to add', bucket:'us' },
            { text:'Silence means discomfort or deference', bucket:'asia' },
            { text:'Feedback is neutral information', bucket:'us' },
            { text:'Feedback in public costs the person their dignity', bucket:'asia' } ],
          key:{ title:'Coaching Key Points', points:[
            'Neither column is the correct one. Both are internally coherent systems that work perfectly inside their own context.',
            'The damage happens at the interface — when a manager running the left column reads signals produced by the right column and scores them as performance problems.',
            'Almost every frustration US managers report about offshore teams ("won’t flag problems", "won’t take initiative", "too slow") is a left-column reading of a right-column behaviour.',
            'Your job is not to abandon your defaults. It is to build the translation layer between them — and to make your own defaults legible in return.' ] } } },
      { type:'cfu', questions:[
        { q:'A US leader describes their Manila team as "lacking urgency" because they double-check work before submitting. What is the most likely explanation?',
          options:[
            'The team is under-trained and needs a speed target',
            'Thoroughness signals competence and respect in their culture, so care is being read as slowness',
            'The team is deliberately slowing down to avoid extra work',
            'There is no cultural factor — this is an individual performance issue' ],
          answer:1,
          why:'Speed-as-virtue is a US default. Where thoroughness is the marker of competence and respect, careful checking is the team performing well by their own standard. Diagnose before you correct.' } ] }
    ]
  },

  /* ------------------------------------------------------------------ 2 */
  {
    id:'us-m2', title:'The Culture Iceberg', minutes:10, stage:'pre',
    tagline:'What is visible, what drives behaviour, and where the four cultures actually sit',
    blocks:[
      { type:'lead', text:'Culture is the invisible rulebook everyone follows — but nobody wrote down. The iceberg is the single most useful frame in this course. Return to it every time a behaviour seems puzzling.' },
      { type:'callout', variant:'insight', title:'The teaching point',
        text:'Ninety percent of culture is invisible. When you manage only the visible ten percent, you are reacting to symptoms, not causes.' },
      { type:'iceberg' },
      { type:'p', text:'Culture in the workplace specifically means the shared, mostly unspoken rules about how to behave, what to say, how to relate to authority, how to handle conflict, what counts as good work, and what happens when you fail.' },
      { type:'callout', variant:'rcm', title:'In your actual work',
        text:'Your team in the Philippines is not "slow to escalate denials" because they lack urgency. The cause is below the waterline: fear of carrying bad news upward, shame about errors, and a hierarchy that prevents them surfacing problems without an explicit invitation.' },
      { type:'activity', activity:{
          kind:'bucket', id:'a2-berg',
          title:'Above or below the waterline?',
          instructions:'Sort each element into the visible tip or the hidden mass. The hidden ones are the ones that actually drive behaviour.',
          buckets:[
            { id:'vis', label:'Visible (10%)', hint:'What you can observe directly' },
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
            'Everything in the visible column can be learned from a country guide in an afternoon. None of it will change how you manage.',
            'Everything in the hidden column is learned only through relationship, and all of it changes how you manage.',
            'The practical habit: when a behaviour puzzles you, resist the first interpretation. Ask "what might be below the waterline here?" The examination takes thirty seconds.',
            'The assumption feels like a fact until you examine it.' ] } } },
      { type:'h', text:'Four cultures, five dimensions' },
      { type:'p', text:'These are tendency scores, not individuals — and no culture here is the reference point. Every one of the four sits somewhere on every scale, including the US. There is no zero, and no norm to deviate from. What matters for your work is the distance between any two positions, because that distance is where translation is required.' },
      { type:'activity', activity:{
          kind:'hunt', id:'a2-hunt',
          title:'Find the strongest signal',
          instructions:'Twenty scores across four cultures. Click the single highest score on the whole board — the strongest tendency anywhere here, and the one that explains the most about your team.',
          hint:'Not the highest score on the board — compare all twenty values, not just the ones in a single row.',
          dimensions:[
            { name:'High-context communication', sub:'Meaning implied rather than stated',  ph:78, in:72, sl:80, us:28 },
            { name:'Collectivism',               sub:'Group harmony over individual goals',  ph:82, in:65, sl:78, us:32 },
            { name:'Respect for hierarchy',      sub:'Authority distance at work',           ph:88, in:77, sl:85, us:38 },
            { name:'Indirect disagreement',      sub:'How openly conflict is surfaced',      ph:80, in:74, sl:82, us:30 },
            { name:'Relationship before task',   sub:'Warmth before business',               ph:84, in:70, sl:76, us:40 } ],
          answer:{ dim:2, country:'ph' },
          key:{ title:'Coaching Key Points', points:[
            'Respect for hierarchy in the Philippines, at 88, is the strongest single tendency on this board — and it sits against 38 in the US, a fifty-point distance.',
            'That distance explains the largest cluster of RCM problems: denials not escalated, blockers not raised, deadlines agreed to that were never achievable.',
            'Look across the whole grid rather than down one column. Every one of these four cultures is high on something — the US is not the low-scoring outlier it appears to be if you only read the first three columns.',
            'Read the chart in both directions. A US colleague at 38 on hierarchy looks disrespectful of seniority from an 88 vantage point, exactly as an 88 looks passive from a 38 one. Neither reading is generous, and neither is correct.',
            'Common misreads in this direction: "she agreed" (she was being polite) · "he lacks initiative" (he is waiting for explicit permission) · "they are slow to decide" (they are building consensus) · "nobody pushed back" (nobody could, publicly).' ] } } },
      { type:'cfu', questions:[
        { q:'You notice your Sri Lanka team never disagrees with you in a group call. Using the iceberg, what is the useful first question?',
          options:[
            'How do I get them to speak up more in group calls?',
            'What is below the waterline that makes public disagreement costly here?',
            'Which team members are disengaged?',
            'Should I replace group calls with written updates?' ],
          answer:1,
          why:'All four may eventually be worth asking, but only the second one diagnoses. The others act on the visible ten percent before you know what is driving it.' } ] }
    ]
  },

  /* ------------------------------------------------------------------ 3 */
  {
    id:'us-m3', title:'Meet Your Team', minutes:14, stage:'pre',
    tagline:'Who they are, beyond job titles',
    blocks:[
      { type:'lead', text:'Six composite colleagues. They are not cultural types — they are the kind of whole person sitting behind each name on your org chart. Turn each card to see what your leadership actually means to them.' },
      { type:'disclaimer', text:'These profiles are shared so you can lead these individuals as full people — not so you can feel sympathy for their circumstances.' },
      { type:'note', text:'The six are composites built for training. They are not real employees, and the profiles are illustrative rather than biographical.' },
      { type:'activity', activity:{
          kind:'flip', id:'a3-people',
          title:'The six profiles',
          instructions:'Turn all six cards. Each back holds the part that changes how you manage them.',
          cards:[
            { mono:'RM', name:'Rose Marie, 28', role:'Customer Support Agent', place:'Cebu City, Visayas · Philippines',
              meta:'3 years tenure · Roman Catholic · First-generation professional',
              front:'Eldest of four from a working family in Cebu. She is the first in her family to hold a corporate job, and her income supports household bills, a sibling’s college tuition and regular contributions to grandparents in the province. Her parish community is her primary social anchor. Stability and family security — rather than rapid career advancement — are her stated motivators.',
              back:'Your approval signals safety, not just performance. When you are warm and consistent she thrives; when you are cold or unpredictable she quietly withdraws. Praise her — but never in a way that singles her out from her peers.',
              coach:'Her role carries real weight beyond her own paycheque, and that raises the stakes of ordinary management moments. The takeaway is not that she is fragile — it is that casual indifference has consequences you will not see reported back to you.' },
            { mono:'JB', name:'Jerome, 34', role:'Team Lead', place:'Metro Manila, originally Mindanao · Philippines',
              meta:'6 years tenure · Born-again Christian · Married, two children',
              front:'Migrated from Mindanao to Manila at 22 for work, navigating a regional identity divide — Mindanaoan Filipinos face subtle bias from Manila-raised colleagues. Deeply proud, quietly ambitious, protective of his team’s reputation with US leadership. He was passed over for promotion once and is watching whether US leadership is fair.',
              back:'He needs to feel respected as a leader in front of his team. If you override his decisions without explanation you erode his authority — and he will not tell you. He will simply become less proactive. Brief him privately before any team-wide announcement.',
              coach:'Jerome carries double weight: regional outsider and frontline leader visible to both his US manager and his local team. The promotion history matters — every later decision about recognition is filtered through that memory. Briefing him privately before an all-hands costs five minutes and almost nothing else.' },
            { mono:'PK', name:'Priya, 26', role:'Operations Analyst', place:'Chennai · India',
              meta:'2 years tenure · Hindu, Brahmin background · Urban, educated',
              front:'Engineering graduate navigating family pressure around marriage while establishing herself as a technical contributor. Holds strong opinions she rarely voices upward. Code-switches between a deferential professional mode and a more assertive personal one.',
              back:'She is waiting for permission to be more than she currently shows. Ask for her analysis, not just her output — she may be your most underleveraged asset.',
              coach:'Ask "what is your read on this?" rather than "did you complete the task?" The first question grants the permission she is waiting for; the second confirms the ceiling she already assumes.' },
            { mono:'RS', name:'Rajan, 41', role:'Senior Operations Manager', place:'Mumbai · India',
              meta:'9 years tenure · Married, teenage son',
              front:'Built his expertise through operational depth rather than elite credentials, and holds more institutional knowledge of your accounts than anyone on the team. Highly competent, deeply loyal, manages through relationships. His professional identity is tied to seniority — in his context, age and demonstrated experience confer real standing.',
              back:'He reads fairness signals closely. How recognition and advancement get distributed tells him whether the system rewards demonstrated capability. Fast-tracking juniors without acknowledging his institutional knowledge will disengage him quietly — and he will not tell you why.',
              coach:'The contrast with Priya is the lesson: she is early-career and constrained by deference, he is senior and evaluating whether merit is actually what gets rewarded here. Name his institutional knowledge explicitly in team settings, monthly. That is not consolation — it is accurate credit for the most valuable asset on your account.' },
            { mono:'NF', name:'Nimal, 32', role:'Finance & Operations', place:'Colombo · Sri Lanka',
              meta:'4 years tenure · Buddhist, Sinhalese · Lives with parents',
              front:'Grew up in the shadow of Sri Lanka’s 26-year civil war, which ended in 2009. His generation carries a collective memory of instability, and the 2022 economic crisis — fuel shortages, food inflation, extended power cuts — made continuity feel consequential in a way US colleagues rarely register. Buddhist values of patience, non-confrontation and communal harmony genuinely shape his working style.',
              back:'Stability and predictability are profoundly motivating. Sudden process changes, unclear expectations or erratic feedback register more strongly than you may anticipate. His patience and harmony-seeking are not passivity — they are values. Consistency is what keeps him fully present.',
              coach:'When Nimal takes time to consult before deciding, he is being conscientious — meeting that with impatience damages trust. During 2022, team members were managing household logistics completely invisible to their US managers, and delivering anyway.' },
            { mono:'DT', name:'Dilani, 29', role:'Senior AR Analyst', place:'Colombo, family from the Eastern Province · Sri Lanka',
              meta:'5 years tenure · Tamil · Hindu · Supports a younger brother through university',
              front:'Sri Lankan Tamil, raised in the Eastern Province and now based in Colombo, working primarily in English and Sinhala. She is one of the strongest technical performers on L1-2 escalations and mentors two junior analysts informally. She is precise, evidence-driven, and notably reluctant to speculate in front of a group — when she speaks, she has already checked.',
              back:'Her caution in group settings is a professional standard, not diffidence: she will not state something she has not verified. Ask her for a considered read with a little lead time rather than an instant opinion on a call, and you get the best analysis on the team. Because she mentors informally, recognising her development of others — not only her own numbers — reflects what she actually contributes.',
              coach:'Sri Lanka is the largest team servicing L1-2, and its internal diversity deserves the same attention you would give India’s. Sinhalese and Tamil colleagues may carry different family histories of the civil war and its aftermath. Do not raise it as a topic of curiosity, and do not assume shared views on it; simply do not build team rituals that require anyone to perform a single national narrative.' } ],
          key:{ title:'Coaching Key Points', points:[
            'Every one of these six is managing something that does not appear in a status report, and all of it determines how your feedback lands.',
            'Read these as capability profiles, not hardship profiles. Rose Marie’s reliability, Jerome’s protectiveness of his team, Priya’s unvoiced analysis, Rajan’s institutional knowledge, Nimal’s conscientiousness and Dilani’s precision are all assets you are currently under-using.',
            'The question that does the work: what do you actually know about how each of your team members built the expertise they have now?',
            'Sri Lanka carries your largest L1-2 population and the most internally varied one. Two profiles is still a simplification.' ] } } },
      { type:'reflect', id:'r3-1',
        prompt:'Which of these six is most unlike anyone you have managed before — and what capability of theirs are you probably under-using?',
        hint:'There is no right answer. This one goes into your PDF export.' },
      { type:'smenote', text:'Sri Lanka content — pending SME review by Varun and Dilupa. Dilani’s profile and the Sri Lanka scenario material in Modules 8 and 11 have been drafted to give Sri Lanka parity with the Philippines and India, but should be validated by regional SMEs before this course goes to a live cohort.' }
    ]
  },

  /* ------------------------------------------------------------------ 4 */
  {
    id:'us-m4', title:'Reading What Is Not Said', minutes:14, stage:'core',
    tagline:'High-context communication, saving face, and the signals you are missing',
    blocks:[
      { type:'lead', text:'In all three cultures, what is NOT said is often more important than what is said. Your job is to build the channels where the unsaid can surface safely.' },
      { type:'compare',
        left:  { title:'Low-context (US default)', tone:'cool', items:[
          'Meaning is in the words. Say what you mean.',
          'Instructions should be explicit and written down',
          '"If you have a problem, tell me directly"',
          'Silence means nothing to say',
          'Disagreement is expressed clearly and directly',
          'Context and relationship matter less than content' ] },
        right: { title:'High-context (PH · India · Sri Lanka)', tone:'warm', items:[
          'Meaning lives in tone, relationship and context',
          'Much is implied — reading between the lines is expected',
          '"A good listener already knows what I need"',
          'Silence means discomfort, deference or disapproval',
          'Disagreement is softened, implied, or avoided publicly',
          'The relationship IS the context for every message' ] } },
      { type:'callout', variant:'rcm', title:'The same message, two systems',
        text:'Low-context: "The claim was denied — resubmit by Friday." High-context: a long pause, then "I will try my best" — meaning the claim has a problem they are not saying directly. In AR follow-up, a team member who says "the payer was not cooperative" may be telling you: I do not know how to handle this, I am stuck, I need help — but they cannot say that directly without it feeling like a failure.' },
      { type:'h', text:'Saving face' },
      { type:'p', text:'"Face" is a person’s social dignity, reputation and sense of honour — in their own eyes and in the eyes of others. It is earned through competence, seniority and respect. Losing face means being corrected in public, having your competence questioned openly, delivering bad news that reflects poorly on you, being asked a question you cannot answer publicly, or having your authority undermined in front of your team.' },
      { type:'callout', variant:'insight', title:'Saving face is not deception',
        text:'It is a sophisticated social system that protects everyone’s dignity and lets work continue without interpersonal rupture. Even in US culture you do not tell your boss "that is a terrible idea" in a meeting — you say "I want to make sure I understand the approach" and raise it privately. High-context cultures have simply formalised this much more deeply.' },
      { type:'activity', activity:{
          kind:'match', id:'a4-signals',
          title:'What they said, what it meant',
          instructions:'Seven signals you will hear from a high-context team. Connect each to what it usually means. Click one on the left, then its match on the right.',
          left:[
            { id:'s1', text:'"Yes" in a meeting' },
            { id:'s2', text:'A long silence' },
            { id:'s3', text:'"We will try our best"' },
            { id:'s4', text:'"That’s an interesting idea"' },
            { id:'s5', text:'Changing the subject' },
            { id:'s6', text:'Asking clarifying questions' },
            { id:'s7', text:'Bringing a colleague to the meeting' } ],
          right:[
            { id:'s1', text:'"I understand" — or "I will not embarrass you by disagreeing"' },
            { id:'s2', text:'"I disagree, but I cannot say so here"' },
            { id:'s3', text:'"This is unlikely, or impossible"' },
            { id:'s4', text:'A polite signal of scepticism' },
            { id:'s5', text:'Disagreement without confrontation' },
            { id:'s6', text:'Surfacing a concern without having to state it outright' },
            { id:'s7', text:'Seeking backup before raising something difficult' } ],
          key:{ title:'Coaching Key Points', points:[
            'None of these are lies. Each is a culturally skilled way of protecting a relationship while still transmitting information — if you are listening for it.',
            'The single highest-value habit: treat any hedge language ("may be", "seems like", "a few dependencies", "might be challenging") as a potential serious flag, and follow every one with "tell me more about that."',
            'When your coder says "I think there may be some challenges with that claim", they may be telling you the claim is unbillable.',
            'Normalise one standard question in every call: "What do you need from me to move this forward?"' ] } } },
      { type:'h', text:'How this differs by country' },
      { type:'activity', activity:{
          kind:'bucket', id:'a4-country',
          title:'Which country?',
          instructions:'Nine communication norms. Place each with the country it most specifically describes. Some feel close — that is the point; the differences matter.',
          buckets:[
            { id:'ph', label:'Philippines', hint:'🇵🇭' },
            { id:'in', label:'India',       hint:'🇮🇳' },
            { id:'sl', label:'Sri Lanka',   hint:'🇱🇰' } ],
          items:[
            { text:'"Pakikisama" — going along to keep group harmony', bucket:'ph' },
            { text:'"Hiya" (shame) gives errors deeper emotional weight', bucket:'ph' },
            { text:'Warmth and humour are trust signals, not time-wasters', bucket:'ph' },
            { text:'The head wobble can mean yes, maybe, or "I am listening"', bucket:'in' },
            { text:'Regional variation is huge — North, South and West differ sharply', bucket:'in' },
            { text:'Email tone stays very formal even with known contacts', bucket:'in' },
            { text:'Strong Buddhist values of patience and non-confrontation', bucket:'sl' },
            { text:'Trust builds slowly, but once established honesty flows freely', bucket:'sl' },
            { text:'Very high regard for politeness and preserving dignity', bucket:'sl' } ],
          key:{ title:'Coaching Key Points', points:[
            'Philippines: warmth is the channel. Humour and small talk are how trust gets built, and "hiya" means a small error can carry weight you would forget immediately.',
            'India: formality and regional diversity are the headline. Directness increases with trust and seniority — it is earned, not default.',
            'Sri Lanka: patience is the headline. Trust builds slowly and then holds. Silence in meetings signals discomfort, never agreement. Note also that Sri Lankan teams work across Sinhala, Tamil and English — a colleague’s third-language precision in writing is a skill, not stiffness.',
            'Universal across all three: criticism must be delivered privately. This is the one rule with no exceptions.' ] } } },
      { type:'h', text:'What works, and what damages trust' },
      { type:'activity', activity:{
          kind:'bucket', id:'a4-doavoid',
          title:'Do this, avoid that',
          instructions:'Twelve leadership behaviours. Sort them. The "avoid" column is not a list of failures — it is a list of behaviours that are effective in US culture and simply do not translate.',
          buckets:[
            { id:'do',    label:'Do this',    hint:'Builds trust' },
            { id:'avoid', label:'Avoid this', hint:'Damages trust' } ],
          items:[
            { text:'Ask open-ended check-ins: "What would make this harder for you?"', bucket:'do' },
            { text:'Follow up 1:1 after every group meeting with quiet members', bucket:'do' },
            { text:'Allow silence — it often holds the most important signal', bucket:'do' },
            { text:'Say "help me understand" rather than "you’re wrong"', bucket:'do' },
            { text:'Send async briefs before calls, to give preparation time', bucket:'do' },
            { text:'Open every call with a few minutes of genuine personal check-in', bucket:'do' },
            { text:'Putting people on the spot publicly in group calls', bucket:'avoid' },
            { text:'Reading politeness or nodding as genuine agreement', bucket:'avoid' },
            { text:'Expecting blunt pushback', bucket:'avoid' },
            { text:'Skipping small talk and going straight to the agenda', bucket:'avoid' },
            { text:'Critical feedback in public, or in writing with no private conversation first', bucket:'avoid' },
            { text:'Assuming silence in a meeting means no concerns', bucket:'avoid' } ],
          key:{ title:'Coaching Key Points', points:[
            'The goal is to expand your toolkit, not to feel bad about your defaults. Every "avoid" item is something that works well with a US team.',
            'The highest-leverage single item on the "do" list: follow up 1:1 with anyone who was quiet in a group meeting. "I value your perspective — anything come to mind since we spoke?"',
            'Practice prompt: pick ONE item from the do column and deliberately try it in your next team meeting.' ] } } },
      { type:'cfu', questions:[
        { q:'Your India team lead writes long, formal, carefully worded emails even for minor updates. You find it inefficient. How should you read it?',
          options:[
            'Poor written communication skills — coach them on brevity',
            'A sign of respect and conscientiousness, not inefficiency',
            'Padding to look busy',
            'Uncertainty about what you want' ],
          answer:1,
          why:'It is deference expressed in writing. If brevity genuinely helps your workflow, frame it positively — "I love the detail; for quick updates a few bullets works great for me" — rather than asking them to "just keep it short", which reads as a rebuke.' },
        { q:'Which phrase should most reliably trigger a follow-up question from you?',
          options:[
            '"That is done and submitted."',
            '"There may be some inconsistency in the payer responses."',
            '"I will send it by Thursday."',
            '"I have escalated this to Rajan."' ],
          answer:1,
          why:'Hedge language is the high-context flag. "There may be some inconsistency" is culturally appropriate phrasing for "this is a serious problem." Follow every "may be" and "seems like" with "tell me more about this."' } ] }
    ]
  },

  /* ------------------------------------------------------------------ 5 */
  {
    id:'us-m5', title:'Hierarchy & Decisions', minutes:10, stage:'core',
    tagline:'Why waiting is not the same as not caring',
    blocks:[
      { type:'lead', text:'What looks like slowness or indecision is often cultural deference — not a capability gap. What looks like an initiative deficit is often a very clear understanding of the cultural boundaries of one’s role.' },
      { type:'columns', cols:[
        { flag:'🇵🇭', title:'Philippines', items:[
          '"Yes" to a manager is rarely challenged — even when the deadline is impossible',
          '"Po" and "Opo" mark respect for seniors inside the language itself',
          'A team lead’s authority with their own team must be actively protected',
          'Decisions need group buy-in; rushing produces surface agreement only',
          'RCM: Jerome will not tell you about a denial backlog until he has tried to fix it himself' ] },
        { flag:'🇮🇳', title:'India', items:[
          'Even clear decisions may wait for senior confirmation',
          'Junior staff will not act outside their explicitly delegated mandate',
          'Ambiguity is tolerated — waiting for clarity from above is preferred',
          'Age plus demonstrated experience confers standing; Rajan’s seniority is a real asset',
          'RCM: Priya will route a coding discrepancy through Rajan rather than raise it with you' ] },
        { flag:'🇱🇰', title:'Sri Lanka', items:[
          'Teams prefer wide consultation before committing to action',
          'Unilateral decisions by junior staff cause genuine discomfort',
          'Silence after a decision is not approval — always check privately',
          'Once consensus is given, commitment is strong and sustained',
          'RCM: Nimal’s triple-checking before submission is hierarchy respect, not inefficiency' ] } ] },
      { type:'activity', activity:{
          kind:'sequence', id:'a5-seq',
          title:'Unblocking a stuck decision',
          instructions:'Your Sri Lanka team has not acted on a process change you announced four days ago. Put the five steps in the order that actually resolves it. Drag to reorder, or use the arrows.',
          steps:[
            'Ask "what would make it easier to move this forward?" — surfacing the missing sign-off rather than pressing for compliance',
            'Explain the WHY explicitly: the clinical and financial urgency driving the change',
            'Delegate the specific authority in writing: "you have full authority to approve X up to Y"',
            'Give the team runway to consult and reach internal consensus — two weeks minimum on a major change',
            'Add a standing agenda item: "what is stuck, and what needs a decision from me?"' ],
          key:{ title:'Coaching Key Points', points:[
            'Notice what is NOT in this sequence: chasing, escalating, or restating the deadline. None of those address the actual blocker.',
            'The order matters. Diagnose first (what would make this easier?), then supply the missing context, then remove the authority gap, then allow consultation time.',
            'Four days on a major process change is insufficient runway for a consensus culture. Two weeks minimum.',
            'The standing agenda item is the structural fix — it makes surfacing blockers a routine expectation rather than an admission of failure.',
            'And always: after a decision that affects a team lead, brief them privately first, before communicating to the group.' ] } } },
      { type:'cfu', questions:[
        { q:'You override a Philippines team lead’s decision in a group call, without briefing him first. What is the most likely consequence?',
          options:[
            'He will raise his disagreement with you afterwards',
            'Nothing — it was a routine business decision',
            'His authority with his team erodes, he will not tell you, and he becomes less proactive',
            'His team will respect your decisiveness' ],
          answer:2,
          why:'His ability to lead is tied to your visible respect for his authority. The cost is silent and delayed — reduced initiative — which is precisely why it is so often missed.' } ] }
    ]
  },

  /* ------------------------------------------------------------------ 6 */
  {
    id:'us-m6', title:'Teamwork, Faith & Difference Within', minutes:12, stage:'core',
    tagline:'Collective work, the working calendar, and why "the India team" is not one thing',
    blocks:[
      { type:'lead', text:'Collectivism is not the absence of individual ambition. It is a different expression of professional identity.' },
      { type:'activity', activity:{
          kind:'flip', id:'a6-explore',
          title:'Seven concepts worth knowing',
          instructions:'Independent ideas — turn them in any order.',
          cards:[
            { mono:'🇵🇭', name:'Bayanihan', role:'Philippines · teamwork',
              front:'Helping colleagues without being asked is a cultural expectation, not a personality trait. Team harmony ("kapwa") outranks individual recognition, and standing out can cause genuine discomfort.',
              back:'Your team members will naturally cover for each other. Honour this publicly. Celebrate team wins first, then individual contributions — praising one person without acknowledging the team creates friction.',
              coach:'"Kapwa" means your team’s sense of self is partly tied to the group’s reputation. How you treat one person is observed by all of them.' },
            { mono:'🇮🇳', name:'Jugaad', role:'India · teamwork',
              front:'Flexible ingenuity — creative workarounds under resource pressure. Strong individual ambition exists, but inside a team frame. Team loyalty often attaches to the manager as much as the organisation.',
              back:'When your India team solves a problem with a creative workaround, that is a skill to celebrate — not evidence of insufficient process. Cross-functional collaboration may still need explicit structure.',
              coach:'Regional and language diversity within a single India team is common. Manage it actively rather than assuming a shared default.' },
            { mono:'🇱🇰', name:'Harmony-first', role:'Sri Lanka · teamwork',
              front:'Avoiding interpersonal conflict is a high cultural priority. Team consensus is sought before action. Individual credit-taking can cause friction with peers.',
              back:'The patience before action is building commitment that, once given, is very durable. Strong loyalty follows once trust and stability are established.',
              coach:'Sri Lankan teams routinely operate across Sinhala, Tamil and English in a single working day. That is cognitive load your US-based team does not carry, and it is invisible on a call conducted entirely in English.' },
            { mono:'✝', name:'Faith is not background noise', role:'The working calendar',
              front:'Philippines: ~85% Catholic. Holy Week in April brings reduced energy and non-negotiable leave. All Saints’ Day (Nov 1–2) is a major observance. India: plural — Hindu, Muslim, Christian, Sikh; Diwali, Holi, Pongal, and Ramadan fasting that significantly affects energy. Sri Lanka: ~70% Theravada Buddhist; Vesak in May is a major national holiday, alongside Tamil Hindu observances such as Thai Pongal and Deepavali, and Eid for the Muslim community.',
              back:'Map the PH/IN/SL religious calendar against your billing deadlines and claims submission windows NOW — before Holy Week, Diwali or Vesak creates a surprise throughput drop.',
              coach:'From a composite India ops voice: "When my manager asked me how my Diwali was, I nearly cried. In five years, no one from the US team had ever asked." Sharing a combined holiday calendar in your team channel takes ten minutes and signals awareness immediately.' },
            { mono:'⚠', name:'"The Philippines team" is not one thing', role:'Within-country diversity',
              front:'Luzon, Visayas and Mindanao are not interchangeable. Tagalog-speaking Manila is the cultural and economic centre, but BPO workers often come from Visayas or Mindanao and navigate stereotypes about their region. Manila private university versus provincial state college creates real differences in social capital and perceived career ceiling.',
              back:'Internal migrants carry migration logistics and family separation on top of their day job. Jerome is the example: a regional outsider and a frontline leader simultaneously.',
              coach:'Would you treat someone from rural Mississippi and someone from Manhattan as culturally identical because they are both American? Let that land before you say "the Philippines team" again.' },
            { mono:'🇮🇳', name:'India is layered', role:'Within-country diversity',
              front:'North and South carry deep cultural, linguistic and sometimes political differences. Hindi speakers can unconsciously dominate shared workplaces, and a South Indian colleague may be working in their third language on your calls. Class, caste and regional identity intersect in ways that are rarely visible from outside.',
              back:'Do not treat "the India team" as a single audience. Check who is actually being heard on your calls, and in whose language the meeting is effectively running.',
              coach:'First-generation professionals describe a "code-switching tax" — the energy cost of performing workplace norms never modelled at home. It is real, it is tiring, and it is invisible on a dashboard.' },
            { mono:'🇱🇰', name:'Sri Lanka is layered too', role:'Within-country diversity',
              front:'The 26-year civil war ended in 2009 — within living memory for every team member. Sinhalese, Tamil and Muslim communities have distinct languages, observances and family histories. The Eastern and Northern Provinces have different post-war trajectories from Colombo. The 2022 economic crisis affected households very unevenly.',
              back:'Your Sri Lanka team is your largest L1-2 population and is internally varied. Build team rituals that do not require anyone to perform a single national narrative, and do not raise the war as a topic of curiosity.',
              coach:'The practical version of this is simple: use the multi-faith calendar rather than only the Buddhist one, avoid scheduling critical cutovers across Vesak or Thai Pongal, and let people volunteer their own background rather than asking.' } ],
          key:{ title:'Coaching Key Points', points:[
            'The reframe that does the most work: collectivism is not a lack of ambition, and consultation is not a lack of decisiveness.',
            'Two concrete actions from this module: share a combined PH/IN/SL multi-faith holiday calendar in your team channel this week, and map those dates against your claims submission windows.',
            'Stop saying "the India team" and "the Philippines team". Replace the collective noun with individual names — then notice who you have not spoken to in two weeks.' ] } } },
      { type:'cfu', questions:[
        { q:'Your Philippines team consistently covers each other’s work without being asked. How should you read this?',
          options:[
            'Poor role clarity that needs tightening',
            'Bayanihan — a cultural expectation of mutual help. Honour it publicly',
            'A few strong performers carrying weaker ones',
            'Avoidance of individual accountability' ],
          answer:1,
          why:'It is a cultural value, not a process gap. Naming and honouring it publicly reinforces exactly the behaviour that makes these teams resilient.' } ] }
    ]
  },

  /* ------------------------------------------------------------------ 7 */
  {
    id:'us-m7', title:'Culture in the Revenue Cycle', minutes:12, stage:'core',
    tagline:'Where these dynamics cost real money',
    blocks:[
      { type:'lead', text:'These patterns are happening on your team right now, with cultural roots you may not have seen. None of them are performance problems at their root. They are cultural responses to the work environment — and changing the environment changes the behaviour.' },
      { type:'activity', activity:{
          kind:'flip', id:'a7-rcm',
          title:'Six patterns, six roots, six fixes',
          instructions:'Front: the pattern and its cultural root. Back: what you do about it.',
          cards:[
            { mono:'🇵🇭', name:'Medical Coding', role:'Philippines',
              front:'Pattern: a coder finds a documentation gap but does not flag it to the US team. Why: fear of carrying bad news upward, plus hiya. They may fix it quietly, or leave it and hope it does not become a denial.',
              back:'Create a no-fault finding norm: "Flagging a gap is a quality contribution, not a failure. I want to hear about every one."',
              coach:'The behaviour is rational given the environment. Change what flagging costs them and the flagging appears.' },
            { mono:'🇮🇳', name:'Denial Management', role:'India',
              front:'Pattern: an AR specialist says "the payer was not cooperative" and closes the account. Why: it may mean "I do not know how to escalate", "I am stuck", or "this needs a supervisor" — but saying so directly feels like admitting incompetence.',
              back:'Ask "walk me through what you tried", then "what would it take to move this?" — two questions that create space to surface the real blocker without anyone having to admit failure.',
              coach:'Note the shape of both questions: neither requires the person to name their own gap. That is the design.' },
            { mono:'🇱🇰', name:'Claims Submission', role:'Sri Lanka',
              front:'Pattern: a team member triple-checks every claim before submission, slowing throughput. Why: conscientiousness plus a low tolerance for error in a high-stakes environment. Risk-aversion shaped by experience, not inefficiency.',
              back:'Acknowledge the accuracy first. If speed is genuinely needed, explain the clinical urgency explicitly: "this patient’s account needs to close by Friday — here is why."',
              coach:'Attack the throughput without acknowledging the accuracy and you get faster work and more errors — the opposite of what you wanted.' },
            { mono:'🇵🇭', name:'AR Follow-up Calls', role:'Philippines',
              front:'Pattern: a team member struggles to be assertive with payer reps. Why: indirect communication plus respect for authority makes confrontational calls culturally difficult, even after training.',
              back:'Role-play assertive call scripts explicitly. Frame assertiveness as professionalism, not aggression: "in this context, pushing back respectfully IS the respectful thing to do."',
              coach:'"Be less polite" will not work — it asks them to violate a value. "Here is what professional persistence sounds like in this specific context" gives them a new script without asking them to become someone else.' },
            { mono:'🇮🇳', name:'Escalation & Error Reporting', role:'India',
              front:'Pattern: a coding error is discovered internally but not reported to US leadership for three days. Why: shame plus hierarchy — the team tried to fix it first, and reporting felt like admitting failure to a senior.',
              back:'Celebrate early escalation explicitly and publicly: "Priya flagged a billing gap this week — that is exactly what good looks like. Thank you."',
              coach:'This is the one case where public recognition is the right instrument, because you are publicly re-pricing the act of escalating.' },
            { mono:'🌐', name:'Performance Reviews', role:'All three',
              front:'Pattern: individual performance feedback causes visible discomfort or withdrawal. Why: in a collectivist culture, individual assessment feels like being singled out, and public comparison is deeply uncomfortable.',
              back:'Frame reviews as team growth conversations: "here is how we are doing as a team — and here is where you specifically are contributing most."',
              coach:'Team huddles surface problems better than individual performance reviews in high-collectivist cultures. Build group accountability structures, not only individual ones.' } ],
          key:{ title:'Coaching Key Points', points:[
            'Every one of these six represents a real revenue risk with a cultural solution. These are not soft problems — they have hard financial consequences.',
            'The common shape of every fix: change what the behaviour costs the person, rather than instructing them to behave differently.',
            'Pick the one of these six you have actually seen on your team. Addressing that one this week will have more impact than understanding all six.' ] } } },
      { type:'activity', activity:{
          kind:'branch', id:'a7-sim',
          title:'Simulation — The Missed Signal',
          instructions:'A live decision sequence. Choose a response; wrong choices explain themselves and let you retry.',
          intro:'You are running a fast-paced virtual meeting with your India team about an urgent client request. You have walked the timeline. You ask whether everything is on track. The team responds positively and says they will do their best — though they mention there are "a few dependencies" and the timeline "might be challenging."',
          nodes:[
            { id:'n1', prompt:'What do you do with that answer?',
              options:[
                { text:'Take the positive response at face value and close the meeting — they said they would do their best.', ok:false,
                  fb:'This is exactly what went wrong in the real case. By the end of the week deliverables were late, testing was incomplete, and the client escalated. "A few dependencies" and "might be challenging" were the warning — delivered in the only register that felt respectful.' },
                { text:'Slow down and follow the hedge: "Tell me more about the dependencies — which one worries you most?"', ok:true,
                  fb:'Correct. You treated hedge language as a flag and asked a question that lets them name a specific risk without anyone having to say "this plan will not work."' },
                { text:'Restate the deadline firmly so everyone is clear on the commitment.', ok:false,
                  fb:'This raises the cost of admitting a problem, so it guarantees the concern stays buried. The team already knows the deadline — that was never the gap.' } ] },
            { id:'n2', prompt:'Rajan says there is a dependency on a payer file that "sometimes arrives late." Nobody else speaks. What next?',
              options:[
                { text:'Ask the group: "Does anyone else have concerns?" and wait for hands.', ok:false,
                  fb:'Silence in a group setting means people do not feel safe raising concerns in front of peers and seniors. Asking the same question louder produces the same silence.' },
                { text:'Thank Rajan, then follow up 1:1 with the quieter members after the call.', ok:true,
                  fb:'Correct. The real feedback rarely surfaces in the group call. "I value your perspective — anything come to mind since we spoke?" is where the second and third risks appear.' },
                { text:'Assign Rajan to own the dependency and move on — someone has raised it, so it is handled.', ok:false,
                  fb:'You have converted the one person brave enough to speak into the person who now carries the risk alone. That teaches everyone watching that speaking up costs you something.' } ] },
            { id:'n3', prompt:'In the 1:1, Priya says quietly that the testing window "may be a little tight." How do you respond?',
              options:[
                { text:'"Thanks — flag it if it becomes a real problem."', ok:false,
                  fb:'You have just told her the current signal was not enough, while giving her no clearer way to escalate. She already used the strongest phrasing available to her.' },
                { text:'"That is exactly the kind of thing I need to hear. Walk me through what a realistic window looks like."', ok:true,
                  fb:'Correct. You named the flag as valuable, then asked for her analysis rather than her agreement — the question that unlocks Priya specifically.' },
                { text:'"How tight? Can you still make Friday?"', ok:false,
                  fb:'A closed question invites the polite answer. She will say she will try, and you will be back where you started.' } ] } ],
          outro:'You surfaced two real risks before they became a client escalation, and you did it without anyone having to publicly contradict you.',
          key:{ title:'Coaching Key Points', points:[
            'The leader in the original case assumed alignment because nobody directly disagreed. Silence and polite agreement are not alignment.',
            'Hierarchy and respect for leadership make employees hesitant to openly challenge a decision in a meeting. That hesitancy is not a character flaw and cannot be trained away with an invitation to "speak freely."',
            'The mechanism that works is structural, not motivational: treat hedges as flags, follow up 1:1 after every group call, and ask for analysis rather than agreement.',
            'Effective global leadership requires listening beyond the words to context and tone — and then building the channel where the unsaid can be said safely.' ] } } }
    ]
  },

  /* ------------------------------------------------------------- 8 (NEW) */
  {
    id:'us-m8', title:'Under Pressure', minutes:14, stage:'core',
    tagline:'Month-end, audit season, and why cultural dynamics intensify exactly when they cost most',
    blocks:[
      { type:'lead', text:'Cultural dynamics are not constant. They intensify under pressure. Indirect communicators become more indirect, face-saving behaviours strengthen, and hierarchy-deference becomes more pronounced — which means your signal quality degrades precisely when the stakes are highest.' },
      { type:'callout', variant:'warn', title:'The compounding problem',
        text:'In a calm week, a hedge like "there may be an issue" is a soft signal you can afford to miss. During month-end close, the same hedge is the only warning you will get about a problem that will land in a client escalation on Monday — and the person delivering it is under more pressure not to say it plainly than they were last week.' },
      { type:'h', text:'The five pressure windows' },
      { type:'pressure', windows:[
        { name:'Month-end billing close', when:'Last 3–5 business days', effect:'Throughput targets peak, and so does the cost of stopping to flag a problem. Team members carry unresolved edge cases forward rather than raising them, because raising one now visibly slows the queue everyone can see.',
          fix:'Create an explicit "park it" channel: a place to log an unresolved account without stopping the line and without it reading as a failure. Review it the first day after close, not during.' },
        { name:'Payer audit season', when:'Varies by payer and contract', effect:'Documentation scrutiny raises the perceived personal risk of any past error surfacing. Face-saving intensifies sharply, and historic issues become much less likely to be volunteered.',
          fix:'Announce an explicit amnesty window before audit prep begins: "anything we find and fix now is a win, not a mark against anyone." Then honour it visibly the first time someone tests it.' },
        { name:'Client escalation windows', when:'Live, unpredictable', effect:'Urgency arrives already framed as displeasure. In a high-deference culture, a leader who is visibly under pressure becomes someone you protect from further bad news, not someone you bring more of it to.',
          fix:'Separate the escalation from your own affect. Say plainly: "The client is unhappy about X. I am not unhappy with you. I need the real picture in the next hour, including anything that looks bad."' },
        { name:'EOB posting deadlines', when:'Daily and cycle-end cutoffs', effect:'Short, hard cutoffs plus a high accuracy standard produce silent overtime and unreported backlogs — especially where thoroughness is a professional value and asking for help reads as incapacity.',
          fix:'Ask for the backlog number as a routine metric with no consequence attached, before the cutoff rather than after. A number you request is far easier to give than one someone must volunteer.' },
        { name:'Go-lives and process cutovers', when:'Planned, often compressed', effect:'A consensus-building culture given four days of runway will consult rather than act, and will look non-compliant while doing exactly what its own standard requires.',
          fix:'Two weeks minimum on any change affecting more than a quarter of the workflow, and a named decision-owner with authority delegated in writing.' } ] },
      { type:'activity', activity:{
          kind:'branch', id:'a8-sim',
          title:'Simulation — Month-End, Day 3',
          instructions:'A high-pressure sequence with a Sri Lanka team. Wrong turns explain the mechanism and let you retry.',
          intro:'It is day three of month-end close. Your Sri Lanka team is running L1-2 escalations and the queue is visibly behind. On the stand-up, Dilani mentions that a batch of secondary claims "has some differences from what we normally see." Nimal adds that they are "reviewing carefully." The client has already asked twice about the close date.',
          nodes:[
            { id:'n1', prompt:'You are under real time pressure. What do you do with "some differences"?',
              options:[
                { text:'Note it and push on — the priority right now is clearing the queue by the cutoff.', ok:false,
                  fb:'Under pressure, hedges get shorter and rarer, not clearer. "Some differences" during month-end is a stronger signal than the same phrase in a quiet week, because the cost of saying it just went up. You have just filed away your only warning.' },
                { text:'Ask Dilani for specifics now: "Which field is different, and on roughly how many of the batch?"', ok:true,
                  fb:'Correct — and note the shape of the question. It asks for a fact she has already verified, not a judgement she would have to defend. Dilani will not speculate in a group, but she will always answer a precise factual question.' },
                { text:'Tell the team to escalate anything unusual immediately and move to the next item.', ok:false,
                  fb:'A general instruction to escalate does not lower the specific cost of escalating during a visible queue crunch. The instruction is free; acting on it is not.' } ] },
            { id:'n2', prompt:'It is a payer-side remittance format change affecting roughly 400 claims. Nimal says the team has been reviewing each one manually to be certain. What now?',
              options:[
                { text:'Tell them to stop manual review and process at normal speed to protect the cutoff.', ok:false,
                  fb:'You have asked a team whose professional standard is accuracy to abandon it under pressure, without replacing it with anything. You will get compliance, a drop in confidence, and errors that surface next cycle.' },
                { text:'Acknowledge the accuracy call, then give explicit authority: "Your judgement on this is right. Spot-check 40, and if the pattern holds, batch the rest — I am authorising that in writing now."', ok:true,
                  fb:'Correct. You validated the standard, then removed the authority gap that was forcing them to be exhaustive. Under pressure, delegated authority in writing is what converts caution into speed.' },
                { text:'Escalate to the client to request a deadline extension before deciding anything internally.', ok:false,
                  fb:'Possibly needed later, but you do not yet know the size of the problem, and you have skipped the step that would have told you.' } ] },
            { id:'n3', prompt:'The close lands on time. In the retro, you want the team to surface this kind of thing earlier next cycle. What is most effective?',
              options:[
                { text:'Ask the team to commit to raising issues earlier in future.', ok:false,
                  fb:'A commitment to be braver does not change the conditions that made silence rational. Next month-end the same pressure produces the same hedge.' },
                { text:'Name what Dilani did as the thing that saved the close, and add a standing day-1 agenda item: "anything that looks different from normal this cycle?"', ok:true,
                  fb:'Correct. You made the behaviour publicly valuable and gave it a scheduled slot that does not require anyone to interrupt a visible queue to use it. Structure beats exhortation.' },
                { text:'Add a control requiring sign-off on any batch with format variances.', ok:false,
                  fb:'A useful control, but it catches the problem after someone has already decided to raise it. It does not address the point of failure.' } ] } ],
          outro:'You protected the cutoff without asking anyone to abandon the standard that makes them good at this work.',
          key:{ title:'Coaching Key Points', points:[
            'Under pressure, the cost of speaking up rises for the person and the value of hearing it rises for you. Those two curves move in opposite directions — that is the whole problem.',
            'Ask for facts, not judgements, when time is short. "Which field, and how many?" gets an answer; "is this a problem?" gets reassurance.',
            'The fastest way to convert caution into speed is delegated authority in writing, not encouragement.',
            'Never let your own visible stress become another thing your team has to manage. Say out loud who you are frustrated with, because they will otherwise assume it is them.',
            'Do the structural fix in the retro, when nobody is under pressure. Nothing you install during a crunch will survive it.' ] } } },
      { type:'cfu', questions:[
        { q:'During a client escalation you are visibly stressed on the call. What is the most likely effect on a high-deference team?',
          options:[
            'They will match your urgency and move faster',
            'They will bring you more information so you can act',
            'They will shield you from further bad news, reducing the information you get',
            'It will have no effect if the instructions are clear' ],
          answer:2,
          why:'A leader under visible pressure becomes someone to protect, not someone to burden. Separate the client’s displeasure from your own: "the client is unhappy about X. I am not unhappy with you."' },
        { q:'Why is a hedge like "there may be an issue" a stronger signal during month-end close than in a quiet week?',
          options:[
            'It is not — the phrase means the same thing regardless of timing',
            'Because the personal cost of saying it has risen, so it takes more concern to produce the same words',
            'Because month-end problems are always larger',
            'Because people are more tired and less precise' ],
          answer:1,
          why:'Signal strength should be read against the cost of sending it. The same words under higher cost indicate greater underlying concern.' } ] }
    ]
  },

  /* ------------------------------------------------------------- 9 (NEW) */
  {
    id:'us-m9', title:'Collaboration Protocols', minutes:14, stage:'core',
    tagline:'Awareness is not enough — these are the standing rules',
    blocks:[
      { type:'lead', text:'Everything so far has been diagnosis. This module is the protocol layer: the specific, written standards that make cross-cultural collaboration work without requiring anyone to read minds on the day. Awareness varies with how tired you are. Protocols do not.' },
      { type:'callout', variant:'insight', title:'Why protocols beat good intentions',
        text:'A well-intentioned manager under deadline pressure reverts to their cultural default. A protocol survives the pressure, because it was agreed when nobody was under any. Adopt these as team standards, publish them, and hold yourself to them first.' },
      { type:'h', text:'Protocol 1 — The pre-call client report' },
      { type:'p', text:'High-context communicators need processing time, and a shared written artefact removes the need to raise a concern spontaneously in front of a group. A standard pre-read is the single highest-return protocol in this module.' },
      { type:'protocol', title:'Standard: circulated 24 hours before any client-facing or decision-making call', items:[
        { l:'Status against commitment', d:'Each workstream marked green / amber / red against what was promised, with the number, not an adjective.' },
        { l:'What changed since last report', d:'Explicitly including anything that got worse. A named field for bad news means nobody has to decide whether to volunteer it.' },
        { l:'Open risks with an owner and a date', d:'Written risks do not require anyone to speak up on a call. This is the field where hedges become facts.' },
        { l:'Decisions needed from the US side', d:'Names the authority gap directly, so waiting-for-permission stops being invisible.' },
        { l:'What we need from the client', d:'Gives the offshore team a legitimate channel to ask upward without it reading as a complaint.' } ] },
      { type:'callout', variant:'rcm', title:'Why the "what changed, including anything worse" field matters',
        text:'Priya’s $40K write-off began as "there may be some inconsistency" buried in two emails. A standing field labelled "what got worse this week" converts that from a brave disclosure into a routine form entry. You are not asking for more courage — you are lowering the courage required.' },
      { type:'h', text:'Protocol 2 — Written versus verbal feedback' },
      { type:'p', text:'The channel matters more than the wording. Use this as a standing decision rule.' },
      { type:'matrix', headers:['Situation','Channel','Why'], rows:[
        ['Praise for an individual','Written, and visible to the team','Written recognition carries further and can be re-read. Frame the team contribution first.'],
        ['Praise for the team','Verbal on a call, then written','Team-first recognition is the norm that avoids creating internal ranking friction.'],
        ['Minor correction','Verbal, 1:1, same day','Small and private keeps it a process note rather than a dignity event.'],
        ['Significant performance feedback','Verbal 1:1 first, written summary after','Never the reverse. Written-first with no conversation reads as a formal record being built against them.'],
        ['Anything that could imply blame','Verbal, 1:1, never in a group','The one rule with no exceptions across all three countries.'],
        ['Process or policy change','Written pre-read, then verbal discussion','Gives processing time and lets objections form before anyone has to voice one live.'],
        ['Urgent correction mid-cycle','Verbal 1:1 immediately, written same day','Speed does not justify a public channel. It never does.'] ] },
      { type:'h', text:'Protocol 3 — Escalation windows that account for deference' },
      { type:'p', text:'A standard escalation SLA assumes people escalate when the threshold is met. In a high-deference culture they escalate when the threshold is met AND the personal cost of escalating has been paid down. If you do not design for the second condition, your SLA silently runs long.' },
      { type:'protocol', title:'Standard: time-triggered, not judgement-triggered', items:[
        { l:'Escalate on elapsed time, not on severity assessment', d:'"Anything unresolved after 48 hours comes to me" removes the need for a junior person to judge whether something is important enough to bother a senior with. That judgement is exactly where deference intervenes.' },
        { l:'Pre-authorise the escalation in writing', d:'"You have standing authority to escalate directly to me, without going through your team lead, on anything payer-side." Standing permission granted once removes the need to seek it each time.' },
        { l:'Make the first escalation of each cycle visible and welcomed', d:'The first person to test the rule determines whether anyone else uses it. Respond to that one publicly and warmly, whatever it contains.' },
        { l:'Track escalation volume as a health metric, not a defect metric', d:'A drop in escalations during a high-pressure window is a warning sign, not an improvement.' },
        { l:'Never route an escalation back through the person it concerns', d:'Doing this once will close the channel permanently, and nobody will tell you it happened.' } ] },
      { type:'activity', activity:{
          kind:'bucket', id:'a9-channel',
          title:'Choose the channel',
          instructions:'Ten real situations. Sort each into the channel the protocol calls for.',
          buckets:[
            { id:'w',  label:'Written first',   hint:'Pre-read, summary, or written recognition' },
            { id:'v',  label:'Verbal 1:1 first', hint:'Private conversation before anything is written' },
            { id:'g',  label:'Group call',      hint:'Appropriate for the whole team to hear' } ],
          items:[
            { text:'A coder’s error rate has risen for three consecutive weeks', bucket:'v' },
            { text:'A CPT code change affecting a third of submissions', bucket:'w' },
            { text:'Recognising the team for clearing month-end on time', bucket:'g' },
            { text:'Telling a team lead you are reversing his staffing decision', bucket:'v' },
            { text:'The agenda and open risks for tomorrow’s client call', bucket:'w' },
            { text:'Priya flagged a payer discrepancy early and correctly', bucket:'g' },
            { text:'An analyst has been quietly working unpaid overtime', bucket:'v' },
            { text:'Confirming a decision reached verbally last week', bucket:'w' },
            { text:'Asking why a specific account was closed without resolution', bucket:'v' },
            { text:'Announcing the combined multi-faith holiday calendar', bucket:'g' } ],
          key:{ title:'Coaching Key Points', points:[
            'Every item that could imply individual fault went to verbal 1:1. That is the whole rule, and it has no exceptions.',
            'Everything that benefits from processing time went to written-first. High-context communicators do their best thinking before the call, not during it.',
            'Only two things belong in a group call: recognition, and information that genuinely concerns everyone equally.',
            'Note the one that catches people out — "an analyst has been quietly working unpaid overtime" is a dignity conversation, not an operational one. Raising it in a group would guarantee it never surfaces again.' ] } } },
      { type:'cfu', questions:[
        { q:'Why should escalation triggers be based on elapsed time rather than on severity assessment?',
          options:[
            'Because time-based rules are easier to audit',
            'Because judging severity requires a junior person to decide whether to bother a senior — precisely where deference intervenes',
            'Because severity is difficult to define in RCM work',
            'Because it reduces the total number of escalations' ],
          answer:1,
          why:'A time trigger removes the judgement call that deference distorts. "Anything unresolved after 48 hours comes to me" needs no courage to act on.' },
        { q:'Escalation volume from your Sri Lanka team drops sharply during audit season. What is the most likely reading?',
          options:[
            'Process improvements are working',
            'The team is more experienced this cycle',
            'The perceived personal risk of surfacing an issue has risen — a warning sign, not an improvement',
            'Fewer issues occur during audit periods' ],
          answer:2,
          why:'Track escalation volume as a health metric. A drop during a high-pressure window almost always means suppression, not absence.' } ] }
    ]
  },

  /* ------------------------------------------------------------ 10 (NEW) */
  {
    id:'us-m10', title:'Cross-Cultural Virtual Meetings', minutes:12, stage:'core',
    tagline:'The call is where most of this is won or lost',
    blocks:[
      { type:'lead', text:'Your team collaborates primarily by video call. That format amplifies every dynamic in this course: silence is more ambiguous, hierarchy is more visible, and the cost of interrupting is higher. A well-run cross-cultural call is a designed thing, not a natural one.' },
      { type:'h', text:'Before the call' },
      { type:'protocol', title:'Design for processing time', items:[
        { l:'Send a pre-read 24 hours ahead', d:'High-context communicators prepare. A pre-read lets someone arrive having already decided to raise a concern, rather than having to generate the courage live.' },
        { l:'Name who will be asked to speak, in the agenda', d:'"Dilani will walk us through the L1-2 trend" turns a cold call-out into a prepared contribution. Never spring a request for analysis on someone in front of an audience.' },
        { l:'Ask for questions in advance, in writing', d:'The concerns that never surface on the call will often arrive by email the night before, if you open that door explicitly.' },
        { l:'Keep the invite list as small as the decision requires', d:'Every additional senior attendee raises the cost of disagreement for everyone junior to them.' } ] },
      { type:'h', text:'During the call' },
      { type:'protocol', title:'Handling silence, and creating room', items:[
        { l:'Wait longer than is comfortable', d:'Count to seven after asking a question. US meeting norms fill a three-second gap; the answer you want often arrives at second six.' },
        { l:'Never ask "does anyone have concerns?"', d:'It has one socially safe answer in a hierarchical setting. Ask instead: "what would make this harder to deliver?" or "what is the part of this you would push back on if I were not here?"' },
        { l:'Use the chat deliberately, not incidentally', d:'Chat lowers the cost of contributing enormously — it is asynchronous, less public, and does not require interrupting a senior. Ask a question and explicitly say "put it in chat, I will read them all out." Then actually read them out, without attributing names unless the person used theirs.' },
        { l:'Go round by name, in a fixed order, for status', d:'A predictable round removes the decision about whether to speak. Announce the order at the start so nobody is caught unprepared.' },
        { l:'Use breakouts for anything requiring genuine debate', d:'Three people in a room without the senior US leader will surface what twelve people with them will not. Give breakouts a written question and ask for a written answer back — that way one person reports the group’s view rather than their own.' },
        { l:'Have the most senior person speak last', d:'If you state your view first, you have ended the discussion. This costs you nothing and changes what you hear.' },
        { l:'Do not correct anyone on the call', d:'Ever, on any subject, however gently. Note it and take it to a 1:1.' } ] },
      { type:'h', text:'After the call' },
      { type:'protocol', title:'The part most people skip', items:[
        { l:'Follow up 1:1 with everyone who was quiet', d:'This is the single highest-return habit in the entire course. "I value your perspective — anything come to mind since we spoke?"' },
        { l:'Circulate written decisions and owners within the day', d:'Removes ambiguity about what was agreed, and gives anyone who disagreed a low-cost moment to say so in writing.' },
        { l:'Brief any team lead privately before their team hears a decision', d:'Non-negotiable. Their standing with their own team depends on not being surprised in front of it.' } ] },
      { type:'activity', activity:{
          kind:'sequence', id:'a10-seq',
          title:'Design the call',
          instructions:'You need a genuine decision from a mixed PH / India / Sri Lanka group on a workflow change. Put the seven steps into the order that will actually surface dissent.',
          steps:[
            'Send a written pre-read 24 hours ahead, with the proposal and the open questions named',
            'Invite written questions in advance, and read the anonymous ones out yourself',
            'Open the call with the agenda and the speaking order, so nobody is caught cold',
            'Ask "what would make this harder to deliver?" — never "does anyone have concerns?"',
            'Break into small groups without you present, with a written question and a written answer required',
            'Give your own view last, after every group has reported',
            'Follow up 1:1 with anyone who stayed quiet, then circulate decisions in writing the same day' ],
          key:{ title:'Coaching Key Points', points:[
            'Notice the shape: every step before the discussion lowers the cost of dissent, and every step after it captures what the call itself could not.',
            'The two steps people cut when short of time — the pre-read and the 1:1 follow-up — are the two that do most of the work.',
            'Speaking last is free and changes everything. If the senior US voice states a position first, the meeting is over and the remaining time is confirmation.',
            'Breakouts without you present are the most reliable way to surface genuine disagreement in a high-deference group. Ask for a written group answer so no individual owns the dissent.' ] } } },
      { type:'cfu', questions:[
        { q:'You ask your team a question on a call and get silence. What is the most effective immediate response?',
          options:[
            'Move on — nobody has anything to add',
            'Call on someone by name to break the silence',
            'Wait several more seconds, then invite chat responses you will read out yourself',
            'Repeat the question more simply' ],
          answer:2,
          why:'Silence is discomfort, not absence of view. Waiting past the US-norm three seconds, then offering a lower-cost channel, gets you the content without putting anyone on the spot.' },
        { q:'Why should the most senior person speak last in a cross-cultural decision meeting?',
          options:[
            'It is more efficient use of their time',
            'Because stating a senior view first effectively ends the discussion in a high-deference group',
            'It gives them time to assess the team',
            'It is a standard facilitation technique for all meetings' ],
          answer:1,
          why:'Once the senior view is on the record, disagreeing with it publicly carries a cost few will pay. Speaking last costs you nothing and materially changes what you hear.' } ] }
    ]
  },

  /* ----------------------------------------------------------------- 11 */
  {
    id:'us-m11', title:'Blind Spots & Practice', minutes:16, stage:'core',
    tagline:'A bias inventory, two simulations and a rewrite',
    blocks:[
      { type:'lead', text:'None of us consciously think these things. But they show up in how carefully we craft feedback, how often we check in, and how much benefit of the doubt we extend. Name them to change them.' },
      { type:'activity', activity:{
          kind:'flip', id:'a11-bias',
          title:'Six bias patterns',
          instructions:'Turn each card to see the counter-move.',
          cards:[
            { mono:'01', name:'The "always agreeable" trap', role:'Bias pattern',
              front:'Interpreting politeness as agreement. Problems compound silently until they become crises.',
              back:'Build private channels. Ask "what would make this harder?" rather than "do you agree?"',
              coach:'The second question has only one socially safe answer. The first one has many.' },
            { mono:'02', name:'Speed as a virtue', role:'Bias pattern',
              front:'Equating fast responses with competence. Deliberate consensus-seeking then looks like slowness.',
              back:'Distinguish "slow because unclear" — which you fix with context — from "slow because thorough", which is a feature.',
              coach:'Two very different diagnoses that produce identical-looking symptoms on a dashboard.' },
            { mono:'03', name:'The visibility illusion', role:'Bias pattern',
              front:'Assuming the performance you see most is the performance that exists most. Visibility and contribution are different variables, and they are distributed unevenly by culture and by role.',
              back:'Ask whose work is most visible to you, and why. Then look specifically at who is contributing through channels you do not routinely observe — mentoring, quality checks, institutional knowledge.',
              coach:'Rajan and Dilani are both examples: high contribution through low-visibility channels. Neither will make their own case to you.' },
            { mono:'04', name:'Treating the team as one block', role:'Bias pattern',
              front:'Communicating to "the India team" as if it were uniform, and missing regional, linguistic and class differences.',
              back:'Replace the collective noun with individual names. Then notice who you have not spoken to in two weeks.',
              coach:'The two-week audit is the practical test. Run it honestly and the pattern is usually obvious.' },
            { mono:'05', name:'Urgency without origin', role:'Bias pattern',
              front:'Passing on a deadline without passing on the reason for it. To you the urgency is self-evident; to a team several steps removed from the payer and the client, it arrives as an arbitrary demand.',
              back:'Never transmit a deadline without its driver. "Friday, because the payer’s timely-filing window closes and after that the claim is unbillable" produces genuine engagement. "Friday" produces compliance at best.',
              coach:'This is the single most common complaint from offshore teams about US leaders, and it is entirely fixable with one extra sentence. The companion track covers the same ground from the other side.' },
            { mono:'06', name:'Feedback without translation', role:'Bias pattern',
              front:'US-style blunt feedback — "this isn’t good enough" — lands as public humiliation.',
              back:'Critical feedback: always private, always framed as coaching, always followed up in writing.',
              coach:'You keep the accountability. You change the channel and the frame.' } ],
          key:{ title:'Coaching Key Points', points:[
            'These are cultural defaults, not character defects. Every one of them is adaptive in a US-only context.',
            'Bias 05 is the one with the largest gap between how much it costs and how easy it is to fix. One sentence of context, every time.',
            'The question worth sitting with: which of these six, if you addressed it consistently for ninety days, would most improve your relationship with your team?' ] } } },
      { type:'reflect', id:'r11-1',
        prompt:'Which bias do you recognise in yourself — and what will you say to yourself when you notice it next time?',
        hint:'Honest beats impressive. This goes into your PDF export.' },
      { type:'h', text:'Simulation — the 12% denial rate' },
      { type:'activity', activity:{
          kind:'branch', id:'a11-sim1',
          title:'Simulation — The 12% Denial Rate',
          instructions:'Choose your response at each step. Wrong turns explain the cultural mechanism and let you try again.',
          intro:'Rose Marie has had a 12% denial rate on orthopedic claims for three weeks. In your Monday call you ask, "Are things okay with the ortho accounts?" She says: "Yes, we are managing."',
          nodes:[
            { id:'n1', prompt:'How do you read "we are managing"?',
              options:[
                { text:'She has it under control — move to the next agenda item.', ok:false,
                  fb:'She is managing, in the Philippine sense: handling it internally and hoping not to surface bad news. Hiya makes a 12% denial rate feel like a personal failure rather than a process signal.' },
                { text:'Ask something specific and non-accusatory: "Walk me through your last five ortho denials — what reasons are you seeing?"', ok:true,
                  fb:'Correct. A specific, procedural question lets her share data rather than confess a problem. Nobody has to say "I am struggling."' },
                { text:'Tell her the 12% figure is too high and needs to come down.', ok:false,
                  fb:'Stating the number publicly, in a group call, converts a process issue into a dignity issue. She will agree, and you will learn nothing.' } ] },
            { id:'n2', prompt:'The denial reasons show a documentation gap that originates on the US provider side. Rose Marie has known this for two weeks. What do you say?',
              options:[
                { text:'"Why didn’t you tell me this two weeks ago?"', ok:false,
                  fb:'This punishes the disclosure you just successfully obtained. It guarantees the next gap stays hidden even longer.' },
                { text:'"This is really useful. I want to hear about denial trends early — flagging them is a quality contribution, not a failure."', ok:true,
                  fb:'Correct. You explicitly re-priced the act of flagging. That sentence is the intervention — it changes what disclosure costs her next time.' },
                { text:'Say nothing about the delay and quietly fix the provider-side gap yourself.', ok:false,
                  fb:'The gap gets fixed once, and the pattern that hid it for two weeks stays completely intact.' } ] } ],
          outro:'You now have the denial reason, the upstream cause, and a team member who has been told in plain language that early flagging is valued.',
          key:{ title:'Coaching Key Points', points:[
            '"We are managing" is one of the most expensive sentences in cross-cultural RCM. Treat it as the beginning of a conversation, never the end.',
            'Specific procedural questions ("walk me through the last five") outperform general wellbeing questions ("is everything okay?") because they do not require a confession.',
            'The durable fix is one explicit sentence: flagging a gap is a quality contribution, not a failure. Say it out loud, more than once.' ] } } },
      { type:'activity', activity:{
          kind:'branch', id:'a11-sim2',
          title:'Simulation — Feedback That Did Not Land',
          instructions:'A short, high-consequence sequence.',
          intro:'You gave direct performance feedback to an India team member during a weekly team call. They nodded and said "Understood, sir." Three weeks later, performance has not improved.',
          nodes:[
            { id:'n1', prompt:'What most likely happened?',
              options:[
                { text:'They did not agree with the feedback and quietly dismissed it.', ok:false,
                  fb:'Disagreement is possible, but it is not the primary mechanism here. The public setting is the variable that did the damage.' },
                { text:'The public correction caused loss of face. They were too embarrassed to ask questions and said "understood" to end the discomfort.', ok:true,
                  fb:'Correct. The nodding was self-protection, not comprehension. Loss of face in public shuts down learning entirely — the person is managing the moment, not processing the content.' },
                { text:'The feedback was not specific enough.', ok:false,
                  fb:'Specificity would not have helped. However precise the content, a public channel made it unreceivable.' } ] },
            { id:'n2', prompt:'What do you do now?',
              options:[
                { text:'Repeat the feedback in the next team call, more clearly this time.', ok:false,
                  fb:'The same channel produces the same result, plus the added weight of a second public correction. This is how a fixable performance issue becomes a disengagement.' },
                { text:'Follow up privately as soon as possible, reframed as coaching around their potential rather than the gap.', ok:true,
                  fb:'Correct. Private, framed around potential, followed up in writing. You keep the accountability and change the channel and the frame.' },
                { text:'Escalate to their manager, since direct feedback has not worked.', ok:false,
                  fb:'Escalation adds a second, larger audience to a problem caused by having an audience.' } ] } ],
          outro:'Feedback in India is most effective delivered privately, framed around potential, and confirmed in writing afterwards.',
          key:{ title:'Coaching Key Points', points:[
            '"Understood, sir" plus a nod is a signal that the interaction has become about dignity rather than about the work.',
            'The rule with no exceptions across all three countries: critical feedback is delivered privately.',
            'Written follow-up matters. It gives processing time and removes the pressure to respond correctly in the moment.' ] } } },
      { type:'h', text:'Rewrite the message' },
      { type:'p', text:'Here is a real US-default message. Read it carefully, then rewrite it.' },
      { type:'quote', text:'Team — I’ve reviewed this week’s denial report. The error rate on orthopedic coding is unacceptable at 14%. This needs to be fixed immediately. Rose Marie and Jerome, I need an explanation of what went wrong and a corrective action plan by EOD tomorrow. If this happens again there will be consequences. — US Manager' },
      { type:'checklist', id:'c11-rewrite', title:'Your rewrite should:', items:[
        'Protect dignity — remove public blame',
        'Acknowledge the relationship first',
        'Frame as problem-solving, not punishment',
        'Give a private channel for an honest response',
        'Keep the accountability — but change the tone',
        'Consider whether this should be a message at all, or a call' ] },
      { type:'reflect', id:'r11-2', lines:8,
        prompt:'Write your version of the message.',
        hint:'Take three minutes. Then reveal the model answer below and compare.',
        reveal:{ title:'A culturally aware version', text:'Jerome — I’d like to connect with you today or tomorrow for a quick call about the ortho denial numbers from this week. I know the team works hard and I want to understand what’s happening in the process so we can support you.\n\nPlease don’t feel like this is about blame — I see this as a team problem we need to solve together. Can we find 20 minutes?\n\n— [Manager]',
          note:'You kept the accountability. You changed the channel from group to private, and the frame from blame to problem-solving. The outcome you need is identical — the path is different. Leaders often fear that cultural awareness means losing authority; this version shows you keep the authority AND the relationship. Sent in its original form to a Filipino team, that message would cause Jerome to absorb blame privately, Rose Marie to experience shame, and the whole team to become less likely to report the next error early. The cost of the original is measured in future denial write-offs.' } }
    ]
  },

  /* ----------------------------------------------------------------- 12 */
  {
    id:'us-m12', title:'Empathy in Practice', minutes:10, stage:'follow',
    tagline:'Not principles — actions you can start this week',
    blocks:[
      { type:'lead', text:'Empathy is not a soft extra. It is how you unlock the full capability of the people you lead. It is the work.' },
      { type:'activity', activity:{
          kind:'flip', id:'a12-habits',
          title:'Five habits',
          instructions:'Front: the habit. Back: what it looks like on a Tuesday.',
          cards:[
            { mono:'01', name:'Build the relationship before you need it', role:'Habit',
              front:'The relationship is the channel. Without it, even clear instructions land poorly — and bad news never reaches you at all.',
              back:'Start every 1:1 with five minutes of genuine personal check-in. Remember key personal events: a sibling’s exam, a parent’s health, a religious festival. Learn three facts about where each team member is from.',
              coach:'Curiosity is the first act of respect.' },
            { mono:'02', name:'Create safety for honest communication', role:'Habit',
              front:'What is not said is the most important signal. Your job is building the channel where it can surface.',
              back:'After every group meeting, follow up 1:1 with anyone who was quiet. For sensitive feedback, ask in writing first to give processing time. When someone raises a concern indirectly, draw it out gently: "tell me more about that."',
              coach:'The 1:1 follow-up after group meetings is the single highest-return habit in this entire course.' },
            { mono:'03', name:'Protect dignity in every interaction', role:'Habit',
              front:'How you treat people in low moments defines your leadership more than how you treat them in good ones.',
              back:'Never correct, criticise or give developmental feedback in front of peers. Address the process before the person: "what happened here?" If you override a team lead’s decision, brief them privately first.',
              coach:'Public correction damages not only the individual but your trust relationship with everyone who witnessed it.' },
            { mono:'04', name:'Make recognition meaningful', role:'Habit',
              front:'In a collectivist context, recognition aimed only at individuals can create the friction it was meant to prevent.',
              back:'Recognise team wins as team wins first, then individuals. Write recognition down — a written note goes further than a verbal mention. Acknowledge institutional knowledge explicitly: "what you know about this account is something we genuinely depend on."',
              coach:'That last sentence is aimed at Rajan and Dilani, and people like them on every team.' },
            { mono:'05', name:'Know your team’s calendar and context', role:'Habit',
              front:'Religious and national holidays across PH, India and Sri Lanka are not edge cases — they are structural features of your throughput.',
              back:'Map them against your billing cycle and claims deadlines NOW, before a surprise. Then share the calendar with your team: "I see Vesak is coming up — how do you want to plan around it?"',
              coach:'This single act takes ten minutes and signals awareness more clearly than any statement of values.' } ],
          key:{ title:'Coaching Key Points', points:[
            'These are five actions, not five values. Each one can be done this week.',
            'If you only adopt one: follow up 1:1 with the quiet people after every group meeting.',
            'From a composite team-member voice: "The best manager I had from the US never pretended to understand everything about my life. But she always tried to. That trying was everything."' ] } } },
      { type:'h', text:'Your commitment' },
      { type:'p', text:'Take ninety seconds each. Write honestly — these are yours, and they go into your PDF export.' },
      { type:'reflect', id:'r12-1', prompt:'One person on my team I know least well — and one question I will ask them in my next 1:1.' },
      { type:'reflect', id:'r12-2', prompt:'One bias from this course I recognise in myself — and what I will say to myself when I notice it next.' },
      { type:'reflect', id:'r12-3', prompt:'One specific behaviour I will change in the next 30 days — and how I will know it is working.' },
      { type:'h', text:'Five things that matter most' },
      { type:'summary', items:[
        { t:'Your team members are whole people', d:'Shaped by region, class, language, faith and family. Not cultural types. The work starts with seeing them.' },
        { t:'Silence, politeness and agreement are different things', d:'Build structures for honest communication. What is not said is often the most important signal.' },
        { t:'Dignity is non-negotiable', d:'How you treat people in low moments defines your leadership more than how you treat them in good ones.' },
        { t:'US defaults are one operating system, not the universal one', d:'Directness, speed and individual accountability are effective at home, and sometimes damaging abroad.' },
        { t:'Empathy is a leadership skill', d:'It is not a soft extra. It is how you unlock the full capability of the people you lead. It is the work.' } ] },
      { type:'countrycards', cards:[
        { flag:'🇵🇭', name:'Philippines', text:'Lead with warmth. Build personal bonds first. Protect team leads’ authority. Never correct publicly.' },
        { flag:'🇮🇳', name:'India', text:'Lead with clarity and respect. Give feedback privately. Explicitly invite dissent. Acknowledge institutional knowledge.' },
        { flag:'🇱🇰', name:'Sri Lanka', text:'Lead with patience. Consensus builds loyalty. Silence is not approval. Consistency is what keeps them present.' } ] },
      { type:'callout', variant:'insight', title:'The close',
        text:'This course did not give you a set of rules. It gave you a set of people to think about, a set of protocols to run, and a set of questions to ask yourself. That is the practice. Come back to it — and encourage your offshore colleagues to take the companion track, so the translation runs both ways.' }
    ]
  }

  ],

  knowledgeCheck: [
    { q:'A Filipino team member says "Yes, no problem!" to a tight deadline but does not deliver. What is the most likely cause?',
      options:[ 'They forgot the commitment', 'Pakikisama — saying yes to maintain harmony, even while privately aware it was unlikely', 'They were never given a clear deadline', 'Poor time management' ],
      answer:1,
      why:'Pakikisama is the drive to keep group harmony. She knew it was unlikely but would not deliver bad news directly. Always ask "what might make this difficult?" to surface real concerns safely.' },
    { q:'Silence in a group meeting with your India team, after you ask for concerns, most likely means:',
      options:[ 'Everyone agrees', 'There are no concerns worth raising', 'People do not feel safe disagreeing publicly in a hierarchical setting', 'The team did not understand the question' ],
      answer:2,
      why:'Always follow up 1:1. The real feedback rarely surfaces in the group call.' },
    { q:'Your Sri Lanka team lead consults widely before acting on your instruction. This is:',
      options:[ 'Indecision that needs coaching', 'Cultural conscientiousness, building the consensus that makes commitment durable', 'A challenge to your authority', 'A sign the instruction was unclear' ],
      answer:1,
      why:'Not indecision. Brief him earlier so the consultation time does not delay your outcome — the consultation itself is producing the commitment you want.' },
    { q:'You publicly correct an India team member’s error in a team call. They nod and say "understood." What is your next step?',
      options:[ 'Nothing — they confirmed understanding', 'Send a written summary to the whole team', 'Follow up privately and immediately, reframing the feedback as coaching', 'Raise it again next week if nothing changes' ],
      answer:2,
      why:'Loss of face in public shuts down learning. The nodding was self-protection, not understanding.' },
    { q:'"Bayanihan" in the Philippine workplace means:',
      options:[ 'Deference to seniority', 'Communal unity — helping each other without being asked, as a cultural value', 'Avoiding conflict at all costs', 'Saving face in public settings' ],
      answer:1,
      why:'It explains why Filipino teams cover for colleagues well beyond their job descriptions. Honour it publicly.' },
    { q:'Which of these is the single highest-return habit for surfacing problems early?',
      options:[ 'Asking "does anyone have concerns?" at the end of every group call', 'Following up 1:1 with anyone who was quiet in a group meeting', 'Requiring written status updates from everyone', 'Setting clearer deadlines' ],
      answer:1,
      why:'The group setting is precisely what suppresses the concern. Changing the channel — not the question — is what works.' },
    { q:'Your Manila AR team has strong dial and talk-time metrics but flat payer resolution rates. Call recordings show agents being very polite even when payers give vague non-answers. The root cause is:',
      options:[ 'Inadequate product training', 'Indirect communication and respect for authority applied to payer reps, who require assertive follow-through', 'Low motivation', 'Poorly designed call scripts' ],
      answer:1,
      why:'The politeness is cultural, not a training failure. The fix is explicit scripted assertiveness framed as the professional standard for US payer calls — not "be less polite."' },
    { q:'A CPT code change affects 30% of your Sri Lanka team’s submissions. You announce it Friday with four days to implementation. Monday, workflows are unchanged. What went wrong?',
      options:[ 'The team ignored the instruction', 'Four days is insufficient runway for a consensus culture on a major change', 'The change was not communicated in writing', 'The team lead failed to delegate' ],
      answer:1,
      why:'Conscientiousness plus collectivist consensus means the team needed time to consult, understand and agree before acting. Give process changes two weeks minimum, and share the WHY explicitly.' },
    { q:'Priya signals a payer adjudication error across two emails using phrases like "there may be some inconsistency." Nothing is done; three months later it is a $40K write-off. The lesson is:',
      options:[ 'Priya should have escalated more forcefully', 'Email is the wrong channel for escalations', 'Treat hedge language as a potential serious flag and follow every one with "tell me more"', 'The team needs a formal escalation policy' ],
      answer:2,
      why:'"There may be some inconsistency" was her culturally appropriate way of saying "this is a serious problem." US managers miss these signals constantly.' },
    { q:'Why should escalation triggers be based on elapsed time rather than on a severity judgement?',
      options:[ 'Time-based rules are easier to audit', 'It removes the judgement call about whether to bother a senior — exactly where deference intervenes', 'Severity is hard to define in RCM work', 'It reduces total escalation volume' ],
      answer:1,
      why:'"Anything unresolved after 48 hours comes to me" requires no courage to act on. A severity assessment does.' },
    { q:'Escalation volume from your team drops sharply during payer audit season. The most likely reading is:',
      options:[ 'Process improvements are working', 'The team is more experienced this cycle', 'Perceived personal risk of surfacing an issue has risen — a warning sign', 'Fewer issues occur during audit periods' ],
      answer:2,
      why:'Under pressure, face-saving intensifies. Track escalation volume as a health metric; a drop during a high-pressure window usually means suppression.' },
    { q:'You need a genuine decision from a mixed PH/India/Sri Lanka group. Which single change most improves your chance of hearing real dissent?',
      options:[ 'Ask "does anyone have concerns?" twice', 'Give your own recommendation first so the team has something concrete to react to', 'Use small breakouts without you present, requiring a written group answer', 'Extend the meeting by fifteen minutes' ],
      answer:2,
      why:'Breakouts remove the senior audience and the written group answer means no individual owns the dissent. Stating your view first ends the discussion.' },
    { q:'A US leader sets a Friday deadline for AR follow-up without explaining why. What is the cost?',
      options:[ 'None, provided the deadline is clear', 'The team will miss it', 'The urgency arrives as arbitrary, producing compliance rather than genuine engagement', 'The team will escalate unnecessarily' ],
      answer:2,
      why:'Never transmit a deadline without its driver. "Friday, because the timely-filing window closes and after that the claim is unbillable" produces engagement; "Friday" produces compliance at best.' },
    { q:'Recognition in a collectivist team is most effective when:',
      options:[ 'Given to the top individual performer publicly, to set a standard', 'Given to team wins first, then individuals — and put in writing', 'Kept entirely private to avoid friction', 'Tied directly to individual performance metrics' ],
      answer:1,
      why:'Praising one individual without acknowledging the team creates friction, because it implicitly ranks within a group that values harmony.' },
    { q:'Which statement best captures the purpose of this course?',
      options:[ 'To provide rules for behaviour in three specific countries', 'To help you communicate more directly with overseas teams', 'To build a translation layer between two valid operating systems', 'To document cultural differences for compliance purposes' ],
      answer:2,
      why:'Neither operating system is wrong. The damage happens at the interface, and the work is translation — not replacing one default with another.' }
  ]
};
