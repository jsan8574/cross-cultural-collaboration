/* TRACK B — "Working with US Teams" (Philippines · India · Sri Lanka participants)
   The companion view: US working norms explained from the offshore side, including
   where downstream urgency actually originates. Written to mirror TRACK_US so the
   translation runs in both directions. */

const TRACK_OFFSHORE = {
  id: 'offshore',
  name: 'Working with US Teams',
  audience: 'For colleagues in the Philippines, India & Sri Lanka',
  subtitle: 'Understanding US working norms, and where the urgency actually comes from',
  regions: 'The US operating system, decoded',
  accent: 'teal',
  passMark: 75,

  modules: [

  /* ------------------------------------------------------------------ 1 */
  {
    id:'off-m1', title:'The Other Operating System', minutes:10, stage:'pre',
    tagline:'What US colleagues assume, and why it is not rudeness',
    blocks:[
      { type:'lead', text:'Your US colleagues are running a different set of defaults. Most of what can feel abrupt, impatient or impersonal is not directed at you personally, and is not a judgement of your work. It is a different operating system — and once you can read it, a great deal of the friction disappears.' },
      { type:'callout', variant:'insight', title:'This runs in both directions',
        text:'There is a companion course, Leading Offshore Teams, which teaches US-side leaders to read high-context communication, protect dignity, and stop misreading politeness as agreement. They are being asked to change too. This track is not about becoming American — it is about being read accurately, and reading them accurately in return.' },
      { type:'compare',
        left:  { title:'Familiar to you', tone:'warm', items:[
          'Meaning lives in tone, relationship and context',
          'Harmony within the group is protected',
          'Thoroughness signals competence and respect',
          'Hierarchy is how trust and respect are expressed',
          'Concerns are raised privately, or through a senior',
          'Public correction costs a person their standing' ] },
        right: { title:'The US default', tone:'cool', items:[
          'Meaning is in the words — say what you mean',
          'Individual contribution is named and credited',
          'Speed of response signals competence',
          'Flat hierarchy — disagreeing upward is expected',
          'Concerns are raised in the meeting, by whoever has them',
          'Correction is treated as information, not judgement' ] } },
      { type:'p', text:'Neither column is correct. Both work perfectly inside their own context. The difficulty is only ever at the interface — and most of the cost falls on whoever is being misread.' },
      { type:'activity', activity:{
          kind:'bucket', id:'ob1-read',
          title:'How will this be read?',
          instructions:'Ten behaviours that are entirely normal and professional in your context. Sort them by how a US colleague is likely to read them — not by whether they are correct.',
          buckets:[
            { id:'strong', label:'Reads as strong performance', hint:'Lands the way you intend' },
            { id:'misread', label:'Likely to be misread',        hint:'Means something different to them' } ],
          items:[
            { text:'Answering a message quickly, even just to acknowledge it', bucket:'strong' },
            { text:'Stating a problem plainly, early, with a number attached', bucket:'strong' },
            { text:'Offering your own analysis without being asked for it', bucket:'strong' },
            { text:'Saying "I disagree, and here is why" in a meeting', bucket:'strong' },
            { text:'Naming what you personally contributed to a team result', bucket:'strong' },
            { text:'Staying silent in a meeting because you have a concern you would rather raise privately', bucket:'misread' },
            { text:'Saying "I will try my best" when a deadline is not realistic', bucket:'misread' },
            { text:'Checking a batch exhaustively before reporting anything', bucket:'misread' },
            { text:'Routing a question upward through your team lead first', bucket:'misread' },
            { text:'Writing a long, carefully formal email for a small update', bucket:'misread' } ],
          key:{ title:'Coaching Key Points', points:[
            'Nothing in the second column is wrong. Every item is skilled, considerate professional behaviour in your own context.',
            'The problem is only that a low-context reader takes words at face value. Silence reads as "no concerns". "I will try my best" reads as "yes". Routing upward reads as "not taking ownership".',
            'You do not need to abandon these behaviours. You need to add one explicit sentence that makes your intent legible — the rest of this course is that sentence, in various forms.',
            'And note: your US colleagues are being taught the other half of this. You are not expected to carry the translation alone.' ] } } },
      { type:'cfu', questions:[
        { q:'You stay quiet in a group call because you would rather raise your concern with your team lead afterwards. How will a US leader most likely read this?',
          options:[
            'That you are being appropriately respectful',
            'That you have no concerns and agree with the plan',
            'That you did not understand the discussion',
            'That you are not confident in your work' ],
          answer:1,
          why:'In a low-context reading, silence means the absence of a view. Your concern will be recorded as agreement — and when the problem surfaces later, nobody will remember that you saw it coming.' } ] }
    ]
  },

  /* ------------------------------------------------------------------ 2 */
  {
    id:'off-m2', title:'Directness Decoded', minutes:12, stage:'core',
    tagline:'What US feedback actually means, and how to give it back',
    blocks:[
      { type:'lead', text:'US feedback is usually less severe than it sounds, and US praise is usually more literal than it sounds. Both are worth learning to read accurately, because misreading either one costs you.' },
      { type:'callout', variant:'insight', title:'The central point about US directness',
        text:'When a US colleague says "this needs work", they are almost always commenting on the work, not on you. In their frame, separating the two is automatic and requires no effort. They are frequently unaware that the same sentence, delivered in front of others, can land as a judgement on your competence. If it lands that way, that is information they need — and most of them would want to know.' },
      { type:'activity', activity:{
          kind:'match', id:'ob2-phrases',
          title:'What they said, what they meant',
          instructions:'Seven things US colleagues say often. Connect each to what it actually means. Click one on the left, then its match on the right.',
          left:[
            { id:'p1', text:'"This needs some work."' },
            { id:'p2', text:'"Can you send me an update?"' },
            { id:'p3', text:'"I have a few thoughts on this."' },
            { id:'p4', text:'"Let’s take this offline."' },
            { id:'p5', text:'"That’s a great question."' },
            { id:'p6', text:'"No worries — it happens."' },
            { id:'p7', text:'"What do you think?"' } ],
          right:[
            { id:'p1', text:'There is a real problem here; please revise it substantially' },
            { id:'p2', text:'A neutral request for information — not a complaint about you' },
            { id:'p3', text:'I disagree, and I am about to say so directly' },
            { id:'p4', text:'This is not for the whole group; we will discuss it separately' },
            { id:'p5', text:'Genuine acknowledgment — and often a moment bought to think' },
            { id:'p6', text:'Genuinely resolved — not politeness covering displeasure' },
            { id:'p7', text:'A real request for your opinion; silence will be read as having none' } ],
          key:{ title:'Coaching Key Points', points:[
            'The two that cost the most are the last two. "No worries" is literal — do not spend the next week carrying it. "What do you think?" is a genuine question, and answering with a summary of the facts rather than an opinion is a missed opportunity every time.',
            '"This needs some work" is stronger than it sounds. "I have a few thoughts" is much stronger than it sounds.',
            'US colleagues generally do not soften bad news with indirect phrasing, which means when they do soften something, it is worth asking about.',
            'If feedback lands badly because of where it was given, say so afterwards: "could we do that kind of feedback one-to-one? I take it in better." Most US managers will simply say yes.' ] } } },
      { type:'h', text:'Giving feedback upward' },
      { type:'p', text:'Disagreeing with a US manager is expected, and is read as engagement rather than disrespect. It does not have to feel confrontational to work. These four forms are direct enough to register clearly, without requiring you to be blunt.' },
      { type:'matrix', headers:['Instead of','Say','Why it works'], rows:[
        ['"I will try my best"','"I can commit to Wednesday. Friday is not realistic because of X."','Names a specific constraint. A US manager can act on this; they cannot act on "I will try."'],
        ['Staying silent about a risk','"I want to flag one risk before we commit: X."','"I want to flag" is a recognised, entirely safe opening in US workplaces. Use it freely.'],
        ['"There may be some inconsistency"','"There is a problem with the payer file. It affects about 400 claims."','A number converts a soft signal into an actionable fact. Hedging is read as low confidence, not politeness.'],
        ['Routing a question through your lead','"Copying you both — my read is X, and I wanted your view directly."','Keeps your lead informed while giving the US side the direct answer they expect.'],
        ['"Understood" when you are not sure','"Let me play that back to check I have it right."','Signals diligence, not confusion. This is a well-regarded move in US meetings.']] },
      { type:'reflect', id:'ob-r2',
        prompt:'Think of a recent moment when you had a concern you did not raise, or raised only indirectly. Write what you would say now, using one of the forms above.',
        hint:'Write the actual sentence, not a description of it. This goes into your PDF export.' },
      { type:'cfu', questions:[
        { q:'Your US manager says "this needs some work" about a report, in a one-to-one call. What is the appropriate reading?',
          options:[
            'Your position is at risk',
            'They are dissatisfied with you personally',
            'There is a real, substantive problem with the report that they want revised',
            'They are being polite about a minor issue' ],
          answer:2,
          why:'It is a genuine and fairly strong comment about the work, and almost never about you. The correct response is to ask which parts, then revise.' },
        { q:'Which phrasing is most likely to get a US manager to actually change a deadline?',
          options:[
            '"We will try our best to make Friday."',
            '"Friday may be a little challenging for the team."',
            '"I can commit to Wednesday. Friday is not realistic because the payer file arrives Thursday."',
            '"We will need to review the timeline internally."' ],
          answer:2,
          why:'A specific alternative plus a named constraint. The other three are all read as "yes, with some hesitation" — which is not what you meant.' } ] }
    ]
  },

  /* ------------------------------------------------------------------ 3 */
  {
    id:'off-m3', title:'Individual Credit', minutes:12, stage:'core',
    tagline:'Recognition, self-advocacy, and why "we" can cost you',
    blocks:[
      { type:'lead', text:'In a US workplace, describing your own contribution is not boasting. It is how information about who did what enters the system. If you consistently say "we", a US manager will often be genuinely unable to tell what you personally did — and career decisions are made on that information.' },
      { type:'activity', activity:{
          kind:'flip', id:'ob3-cards',
          title:'Five things worth understanding',
          instructions:'Turn each card.',
          cards:[
            { mono:'01', name:'"We" versus "I"', role:'Recognition',
              front:'Attributing a result to the team is generous and appropriate in your context. In a US frame, it is taken literally: the manager records a team outcome and no individual contribution.',
              back:'Use both. "The team closed the backlog — I rebuilt the follow-up sequence for the secondary claims." You keep the collective credit and add the specific fact your manager needs.',
              coach:'This single habit changes what your manager can say about you in a conversation you are not in.' },
            { mono:'02', name:'Self-advocacy is expected', role:'Recognition',
              front:'US managers generally assume that people who want something will ask for it. Waiting to be noticed is read as satisfaction with the current arrangement, not as patience.',
              back:'Say the thing plainly: "I would like to take on X" or "I would like to be considered for Y." This is completely normal and will not be read as pushy.',
              coach:'The absence of a request is read as the absence of interest. That is an expensive silence.' },
            { mono:'03', name:'Praise is literal', role:'Recognition',
              front:'When a US colleague says your work was excellent, they mean it and are usually not softening anything. They are also unlikely to repeat it — in their frame, saying it once is sufficient.',
              back:'Accept it directly: "Thank you — glad it was useful." Deflecting entirely onto the team can read as discomfort or as disagreement with the assessment.',
              coach:'You are allowed to simply accept a compliment. It is not immodest in that register.' },
            { mono:'04', name:'Visibility is not automatic', role:'Recognition',
              front:'A US manager several time zones away sees your output, not your work. Mentoring, quality checks, fixing things quietly and preventing problems are largely invisible to them.',
              back:'Report the invisible work as work. "I spent Tuesday with the two new analysts on denial coding" belongs in your update. So does a problem you prevented.',
              coach:'Prevented problems are the least visible and most valuable thing many of you do. If you do not name them, they did not happen as far as the record is concerned.' },
            { mono:'05', name:'Asking for help is not weakness', role:'Recognition',
              front:'In a US frame, asking for help early is read as good judgement and good communication. Struggling alone until a deadline is at risk is read as poor communication, regardless of the effort involved.',
              back:'"I am stuck on this and want to get it right — can we look at it together?" is a completely safe sentence, and lands as professionalism.',
              coach:'This inverts the instinct most strongly. The effort you put into not troubling anyone is often the exact thing your manager wishes you had not done.' } ],
          key:{ title:'Coaching Key Points', points:[
            'None of this requires you to become self-promoting. It requires you to state facts that would otherwise be missing from the record.',
            'The single highest-return habit: add one sentence naming your specific contribution to every team result you report.',
            'The second: report prevented problems and invisible work as work.',
            'Your US manager is not withholding recognition. In most cases they simply do not have the information, and are unaware they are missing it.' ] } } },
      { type:'reflect', id:'ob-r3',
        prompt:'Write one sentence naming something you personally did this month that your US manager probably does not know about.',
        hint:'Then consider sending it. This goes into your PDF export.' }
    ]
  },

  /* ------------------------------------------------------------------ 4 */
  {
    id:'off-m4', title:'Speed as Competence', minutes:12, stage:'core',
    tagline:'Why the pace feels relentless, and what actually needs to be fast',
    blocks:[
      { type:'lead', text:'In US workplaces, responsiveness is read as competence. This is genuinely a cultural default rather than a considered position, and it explains a great deal of behaviour that can otherwise feel impatient or dismissive of quality.' },
      { type:'callout', variant:'warn', title:'The trap this creates',
        text:'If you take two days to send a considered, complete, verified answer, and a colleague sends a partial answer in twenty minutes, the US default reads the second person as more on top of the work — even when your answer is better. This is not fair, and it is worth knowing about, because the fix is small.' },
      { type:'protocol', title:'What actually needs to be fast, and what does not', items:[
        { l:'Acknowledgement must be fast. The answer does not.', d:'"Got it — looking into this, I will come back to you by 4pm your time" takes fifteen seconds and completely removes the problem. The clock a US colleague is watching is the acknowledgement clock, not the answer clock.' },
        { l:'Partial answers are welcome, and are not a loss of face', d:'"Here is what I know so far; two items still open" is a normal, well-regarded update in a US frame. It does not read as incomplete work.' },
        { l:'Accuracy still wins where it matters', d:'On anything client-facing, compliance-related or financial, nobody sensible wants speed over accuracy. Say which one you are choosing and why: "I would rather take an extra day and be certain on these 400 claims."' },
        { l:'Silence is the one genuinely costly choice', d:'A US manager reading silence assumes nothing is happening. The work you are quietly doing during that silence is invisible, and the silence itself is what gets remembered.' },
        { l:'Time zones are not an excuse you need to make', d:'State your working hours plainly and hold them. "I will pick this up at 9am my time" is a complete and entirely acceptable answer.' } ] },
      { type:'activity', activity:{
          kind:'branch', id:'ob4-sim',
          title:'Simulation — The Thursday Request',
          instructions:'Choose your response at each step. Wrong turns explain what the US side is reading, and let you retry.',
          intro:'It is 6pm your time on Thursday. Your US client lead sends a message: "Can you get me the denial breakdown for the ortho accounts? Need it for a client call." Their call is Friday morning US time. The breakdown will take about three hours of careful work, and you have already finished for the day.',
          nodes:[
            { id:'n1', prompt:'What do you do first?',
              options:[
                { text:'Start the work now, and send the completed breakdown when it is finished late tonight.', ok:false,
                  fb:'You will deliver excellent work at a real personal cost — and they will not know either of those things. Worse, they spent the evening unsure whether it was coming, and may have started building a fallback.' },
                { text:'Reply immediately: "Got it. I will have this with you by 8am my time, which is well before your call. Confirming that works."', ok:true,
                  fb:'Correct. Fifteen seconds of acknowledgement removes all of their uncertainty, protects your evening, and reads as completely on top of the work. This is the single highest-return habit in this module.' },
                { text:'Wait until the morning and reply then, since it is outside your hours.', ok:false,
                  fb:'Your hours are legitimate and you are entitled to them. But an unanswered request reads as unseen, and by morning they may have escalated it — which costs you more time than the reply would have.' } ] },
            { id:'n2', prompt:'In the morning you find the ortho data has a payer-side inconsistency that will take another two hours to resolve properly. Their call is in four hours. What do you send?',
              options:[
                { text:'Nothing yet — resolve the inconsistency first, then send the complete and correct breakdown.', ok:false,
                  fb:'Your instinct to be certain is right, but silence for two more hours is the expensive part. They are preparing for a client call with no idea what they will have.' },
                { text:'Send what you have now, clearly marked: "Here is the breakdown. One caveat — the secondary payer figures need two more hours to verify. Everything else is solid."', ok:true,
                  fb:'Correct. A partial answer with the uncertainty clearly labelled is a strong professional move in a US frame. They can build the call around what is confirmed, and you have protected your accuracy standard by naming it rather than by delaying.' },
                { text:'Send the full breakdown including the unverified figures, and mention the issue if they ask.', ok:false,
                  fb:'This trades your real strength — accuracy — for speed you did not need to trade. Unlabelled uncertainty in a client-facing number is the one genuine risk in this scenario.' } ] },
            { id:'n3', prompt:'They reply: "This is great, thanks. What do you think is driving the ortho denials?" How do you answer?',
              options:[
                { text:'Summarise the figures again, since the data speaks for itself.', ok:false,
                  fb:'They already have the figures — they asked what you think. Restating data in place of an opinion is the most common missed opportunity in this whole course.' },
                { text:'Give your actual read: "My view is it is the documentation template on the US provider side. Three of the top five reasons trace back to it."', ok:true,
                  fb:'Correct. "What do you think?" is a genuine request for your judgement. Giving it is how you become someone whose analysis is sought rather than whose output is collected.' },
                { text:'Say you would need more time to analyse it properly before offering a view.', ok:false,
                  fb:'Sometimes true and entirely fine to say — but if you do have a working theory, offer it with the appropriate hedge: "my early read is X, and I would want another day to confirm."' } ] } ],
          outro:'You protected your evening, your accuracy standard, and delivered on time — and you moved from someone who produces data to someone who interprets it.',
          key:{ title:'Coaching Key Points', points:[
            'Acknowledge fast, deliver carefully. These are two separate clocks, and only the first one needs to be quick.',
            'Label uncertainty rather than hiding behind delay. "This part is confirmed, this part is not" is a strong move, not a weak one.',
            'When asked what you think, answer with what you think. Data restated in place of judgement is a missed opportunity every single time.',
            'Your working hours are legitimate. State them plainly rather than absorbing the cost silently.' ] } } },
      { type:'cfu', questions:[
        { q:'A US colleague sends a request at the end of your working day. What is the highest-value immediate action?',
          options:[
            'Begin the work immediately so it is ready overnight',
            'Send a fifteen-second acknowledgement with a specific time you will deliver',
            'Reply in the morning when you can give a complete answer',
            'Forward it to your team lead to allocate' ],
          answer:1,
          why:'Acknowledgement and delivery are two different clocks. Only the acknowledgement one needs to be fast, and it removes all of the other side’s uncertainty at almost no cost to you.' } ] }
    ]
  },

  /* ------------------------------------------------------------------ 5 */
  {
    id:'off-m5', title:'Where the Urgency Comes From', minutes:14, stage:'core',
    tagline:'The chain behind "I need this by Friday"',
    blocks:[
      { type:'lead', text:'When a US leader pushes for a Friday deadline on AR follow-up, there is almost always a client or payer reason driving it. That reason is frequently not explained — not because it is secret, but because to the person passing it on it feels too obvious to state. Seeing the chain makes the pressure legible rather than arbitrary.' },
      { type:'callout', variant:'insight', title:'Why this module exists',
        text:'The most common thing offshore teams report about US leaders is that deadlines arrive without reasons. The most common blind spot US leaders have, per the companion course, is exactly that — passing on urgency without its origin. Both sides are working on this. Understanding the chain means you can ask the right question when the reason is missing.' },
      { type:'h', text:'The chain' },
      { type:'p', text:'Your team processes claims and manages denials for US healthcare providers who are themselves under pressure — from payers, from compliance requirements, and from revenue targets. Here is how that pressure travels.' },
      { type:'activity', activity:{
          kind:'sequence', id:'ob5-chain',
          title:'Build the urgency chain',
          instructions:'Six links, from the origin of the pressure to the deadline that reaches you. Put them in causal order — drag, or use the arrows.',
          steps:[
            'A patient receives care, and the provider submits a claim to the payer',
            'The payer applies a timely-filing window — a hard deadline after which the claim can never be billed at all',
            'The provider’s cash position and revenue targets depend on claims closing inside that window',
            'Compliance and audit requirements add documentation deadlines the provider cannot move',
            'The US client commits to a date with their own leadership, and passes it to your US counterpart',
            'It reaches you as "I need the AR follow-up done by Friday"' ],
          key:{ title:'Coaching Key Points', points:[
            'The timely-filing window is the part most worth internalising. Once it closes, the claim is not late — it is unbillable, permanently, and the provider simply loses that revenue.',
            'That is why a Friday on AR follow-up is rarely arbitrary, even when it is delivered as though it were.',
            'By the time it reaches you, four layers of reasoning have been compressed into one word. The reasoning was not withheld; it was assumed.',
            'The question that recovers it: "What is driving the Friday date — is it a filing window or a client commitment?" This is a completely safe question to ask, and most US leaders will answer it gladly and be slightly embarrassed not to have said so.' ] } } },
      { type:'h', text:'What each pressure actually is' },
      { type:'pressure', windows:[
        { name:'Timely filing windows', when:'Payer-specific: often 90–365 days from service', effect:'A hard cliff. After it passes, the claim cannot be submitted at all and the provider writes off the full amount. There is no appeal on the basis of lateness alone.',
          fix:'When a deadline relates to filing, it is genuinely immovable. Ask early if you think it is at risk — that is exactly the escalation your US counterpart most wants and least often receives.' },
        { name:'Month-end and quarter-end close', when:'Last few business days of the period', effect:'The provider’s reported revenue depends on what has posted by the cutoff. Everything not closed moves into the next period and affects reported performance.',
          fix:'This is why the same task feels routine on the 10th and urgent on the 28th. The work did not change; the reporting boundary did.' },
        { name:'Payer audits', when:'Periodic, sometimes with little notice', effect:'The provider must produce documentation supporting past claims, often at speed. Gaps found during an audit can trigger repayment demands well beyond the individual claims.',
          fix:'Anything you find and flag before an audit is worth far more than the same finding during one. Your US counterpart would much rather hear it early.' },
        { name:'Client escalations', when:'Live and unpredictable', effect:'A provider’s own leadership has raised something with your US counterpart. The urgency you receive is often the tail end of a conversation that was already uncomfortable.',
          fix:'If your US counterpart seems short in an escalation, it is usually pressure arriving from above them rather than dissatisfaction with you. It is fair to ask directly: "Is this about our work, or is the client under pressure on something else?"' },
        { name:'Revenue targets', when:'Continuous', effect:'Providers operate on thin margins, and delayed collections have a direct cash-flow effect. AR days are watched closely and reported upward.',
          fix:'This is why AR follow-up feels perpetually urgent. Every day an account sits unresolved has a measurable cost that someone is being asked about.' } ] },
      { type:'callout', variant:'rcm', title:'The practical consequence',
        text:'Knowing the chain lets you make better decisions when you cannot do everything. If you must choose between two accounts, the one approaching a timely-filing limit outranks the one that is merely old — and you can say so, in those terms, to your US counterpart. That sentence will change how your judgement is regarded.' },
      { type:'reflect', id:'ob-r5',
        prompt:'Think of a recent deadline that felt arbitrary. Which link in the chain do you now think was driving it — and what would you ask to confirm?',
        hint:'This goes into your PDF export.' },
      { type:'cfu', questions:[
        { q:'What makes a timely-filing deadline different from an ordinary internal deadline?',
          options:[
            'It is set by the client rather than the provider',
            'Once it passes, the claim can never be billed and the revenue is permanently lost',
            'It carries a financial penalty proportional to the delay',
            'It can be extended by appeal if there is good reason' ],
          answer:1,
          why:'It is a hard cliff rather than a soft target. That is why it justifies genuine urgency, and why flagging a filing risk early is one of the most valuable things you can do.' },
        { q:'Your US counterpart is unusually short with you during a client escalation. What is the most useful interpretation?',
          options:[
            'They are dissatisfied with your team’s work',
            'They are usually under pressure arriving from above them — and it is fair to ask directly',
            'You should reduce communication until it passes',
            'The relationship has been damaged' ],
          answer:1,
          why:'Escalation pressure travels downward and rarely gets relabelled on the way. Asking "is this about our work, or is the client under pressure on something else?" is a completely reasonable question.' } ] }
    ]
  },

  /* ------------------------------------------------------------------ 6 */
  {
    id:'off-m6', title:'Practice & Commitment', minutes:12, stage:'follow',
    tagline:'Putting it together',
    blocks:[
      { type:'lead', text:'One simulation that combines everything, then three commitments of your own.' },
      { type:'activity', activity:{
          kind:'branch', id:'ob6-sim',
          title:'Simulation — The Deadline You Cannot Meet',
          instructions:'The hardest conversation in this course. Wrong turns explain what is being read, and let you retry.',
          intro:'Your US counterpart has asked for a full AR follow-up sweep on 600 accounts by Friday. You have assessed it honestly: it cannot be done properly by Friday. Doing it badly by Friday is possible. It is Tuesday.',
          nodes:[
            { id:'n1', prompt:'What do you do on Tuesday?',
              options:[
                { text:'Commit to Friday and put the team on overtime to get as close as possible.', ok:false,
                  fb:'This is the most common choice and the most expensive one. On Friday you deliver either incomplete or lower-quality work, having spent goodwill and hours, and your counterpart finds out at the last moment when they have no options left.' },
                { text:'Say on Tuesday: "Friday is not achievable at our quality standard. I can do 350 accounts properly by Friday, or all 600 by Wednesday next week. Which serves the client better?"', ok:true,
                  fb:'Correct, and the timing is the important part. Raising it on Tuesday gives your counterpart three days to manage the client. Offering two concrete options makes you a partner in the decision rather than the bearer of a problem.' },
                { text:'Reply "we will try our best" and reassess on Thursday.', ok:false,
                  fb:'"We will try our best" is read as yes. On Thursday you will be delivering bad news with no time left to act on it, and the earlier signal will not be remembered as a warning.' } ] },
            { id:'n2', prompt:'They reply: "It has to be Friday, the client committed to it." What now?',
              options:[
                { text:'Accept it and do what you can, without further discussion.', ok:false,
                  fb:'You have the information they need to make a good decision, and withholding it does not protect anyone. The question of which 600 accounts matters enormously.' },
                { text:'Ask: "Understood. Then help me prioritise — which accounts matter most? If any are approaching timely-filing limits, I will do those first."', ok:true,
                  fb:'Correct. You accepted the constraint and immediately made your expertise useful within it. Naming timely filing shows you understand what is actually at stake, and it will change how your judgement is regarded from that point on.' },
                { text:'Ask them to reduce the scope, since the deadline is fixed.', ok:false,
                  fb:'The right instinct, but stated as a demand rather than a contribution. The version that works offers your expertise on how to reduce it.' } ] },
            { id:'n3', prompt:'Friday arrives. You completed 380 of the 600, prioritised correctly, and every filing-critical account is clear. How do you report it?',
              options:[
                { text:'"We completed 380 of 600. We were not able to finish the remainder."', ok:false,
                  fb:'Accurate, and it undersells the work substantially. Reported this way it reads as a miss rather than as skilled triage under a constraint you flagged three days early.' },
                { text:'"380 of 600 complete, including all 47 approaching timely filing — nothing at risk of write-off. Remaining 220 are low-urgency and I will clear them by Wednesday."', ok:true,
                  fb:'Correct. Same facts, accurate framing. You have reported the outcome that matters — no revenue at risk — and given a firm date for the rest. This is what strong upward communication looks like in a US frame.' },
                { text:'"All the urgent accounts are done."', ok:false,
                  fb:'True but vague. Specific numbers are what make a US reader confident. "All 47 approaching timely filing" lands very differently from "all the urgent ones".' } ] } ],
          outro:'You flagged early, made your expertise useful inside the constraint, and reported the outcome in terms of what was actually at stake.',
          key:{ title:'Coaching Key Points', points:[
            'Raise an unachievable deadline as early as you know. Tuesday is a partner; Thursday is a problem.',
            'Never say "we will try our best" about something you do not believe is achievable. It is heard as yes.',
            'Always offer options rather than only the obstacle. Two concrete choices make you part of the decision.',
            'Report outcomes in terms of what was at risk, with numbers. "All 47 approaching timely filing are clear" is worth far more than "we did the urgent ones".' ] } } },
      { type:'h', text:'Your commitment' },
      { type:'reflect', id:'ob-r6-1', prompt:'One thing I will start acknowledging faster, even before I have the answer.' },
      { type:'reflect', id:'ob-r6-2', prompt:'One contribution of mine that my US counterpart probably cannot see — and how I will make it visible.' },
      { type:'reflect', id:'ob-r6-3', prompt:'One question I will ask the next time a deadline arrives without a reason attached.' },
      { type:'h', text:'Five things that matter most' },
      { type:'summary', items:[
        { t:'Acknowledge fast; deliver carefully', d:'Two different clocks. Fifteen seconds of acknowledgement removes all of the other side’s uncertainty.' },
        { t:'Say the number, not the hedge', d:'"There is a problem affecting 400 claims" is actionable. "There may be some inconsistency" is not heard as a warning.' },
        { t:'Name what you personally did', d:'"We" is generous and invisible. Add one sentence of specific contribution to every team result you report.' },
        { t:'Deadlines usually have a real driver', d:'Often a timely-filing window or a client commitment. Ask what it is — the question is entirely safe and usually welcomed.' },
        { t:'Directness is not disrespect', d:'Disagreeing with a US manager reads as engagement. "I want to flag one risk" is a completely safe sentence.' } ] },
      { type:'callout', variant:'insight', title:'The close',
        text:'None of this asks you to change who you are or how you work with your own colleagues. It asks you to add a small number of explicit sentences at the interface, so that what you already do well becomes visible to people running a different system. Your US counterparts are learning the other half of this in their own course.' }
    ]
  }

  ],

  knowledgeCheck: [
    { q:'You stay silent in a group call, intending to raise your concern with your team lead afterwards. How will a US leader most likely record it?',
      options:[ 'As appropriate respect for the group', 'As agreement with the plan', 'As a lack of understanding', 'As a concern to follow up on' ],
      answer:1,
      why:'In a low-context reading, silence means the absence of a view. Your concern will be recorded as agreement.' },
    { q:'"I have a few thoughts on this" from a US colleague usually means:',
      options:[ 'They have minor suggestions', 'They are broadly satisfied', 'They disagree and are about to say so directly', 'They want more time to consider' ],
      answer:2,
      why:'It is much stronger than it sounds. Treat it as the opening of a disagreement, not a soft comment.' },
    { q:'What is the highest-value response to a request arriving at the end of your working day?',
      options:[ 'Start the work immediately', 'A fifteen-second acknowledgement naming when you will deliver', 'A complete answer first thing tomorrow', 'Forward it to your team lead' ],
      answer:1,
      why:'Acknowledgement and delivery are separate clocks. Only the first needs to be fast, and it costs you almost nothing.' },
    { q:'A timely-filing deadline is different from an internal deadline because:',
      options:[ 'It is set by the client', 'Once it passes the claim can never be billed and the revenue is permanently lost', 'It carries a proportional financial penalty', 'It can be appealed with good reason' ],
      answer:1,
      why:'It is a hard cliff. That is why flagging a filing risk early is among the most valuable things you can do.' },
    { q:'You believe a Friday deadline is not achievable at your quality standard, and it is Tuesday. What is the strongest move?',
      options:[ 'Commit to Friday and use overtime to get as close as possible', 'Say "we will try our best" and reassess Thursday', 'Say so on Tuesday and offer two concrete alternatives', 'Deliver on Friday and note the quality caveats then' ],
      answer:2,
      why:'Tuesday gives your counterpart three days to manage the client. Two concrete options make you part of the decision rather than the bearer of a problem.' },
    { q:'Reporting a team result to a US manager, which is most effective?',
      options:[ '"We cleared the backlog this week."', '"The team cleared the backlog — I rebuilt the follow-up sequence for the secondary claims."', '"The backlog is now clear."', '"Everyone worked very hard on the backlog."' ],
      answer:1,
      why:'Keep the collective credit and add the specific fact your manager needs. Without it, no individual contribution enters the record.' },
    { q:'Which sentence is most likely to actually move a US manager’s deadline?',
      options:[ '"We will try our best to make Friday."', '"Friday may be a little challenging."', '"I can commit to Wednesday; Friday is not realistic because the payer file arrives Thursday."', '"We will review the timeline internally."' ],
      answer:2,
      why:'A specific alternative plus a named constraint. The other three are all heard as a hesitant yes.' },
    { q:'Your US counterpart says "no worries — it happens" after an error. You should:',
      options:[ 'Assume they are being polite and remain concerned', 'Take it literally — the matter is genuinely closed', 'Send a written apology to be safe', 'Raise it again at the next review' ],
      answer:1,
      why:'US colleagues generally do not use indirect phrasing to soften displeasure. When they say it is fine, it is usually fine.' },
    { q:'Asking a US manager for help early is generally read as:',
      options:[ 'A lack of capability', 'Good judgement and good communication', 'An attempt to shift responsibility', 'Something to be avoided before a deadline' ],
      answer:1,
      why:'This inverts the usual instinct. Struggling alone until a deadline is at risk is what reads poorly, regardless of the effort involved.' },
    { q:'You can only complete part of a large AR sweep. Which prioritisation will your US counterpart most value?',
      options:[ 'The oldest accounts first', 'The highest-value accounts first', 'Accounts approaching timely-filing limits first', 'An even sample across all account types' ],
      answer:2,
      why:'An account past its filing window is permanently unbillable. Saying so in those terms will change how your judgement is regarded.' },
    { q:'What is the main reason US deadlines often arrive without an explanation?',
      options:[ 'The reasoning is confidential', 'It is assumed to be obvious, and gets compressed as it travels down the chain', 'The US side does not know the reason either', 'It is a deliberate management technique' ],
      answer:1,
      why:'Four layers of reasoning compress into one word. Asking "what is driving this date?" recovers it, and the question is entirely safe.' },
    { q:'What does this course ask you to change?',
      options:[ 'To adopt US communication norms in all your work', 'To add explicit sentences at the interface so your existing strengths become visible', 'To be more direct with your local colleagues', 'To escalate more frequently' ],
      answer:1,
      why:'Nothing here asks you to change how you work with your own colleagues. It is about being read accurately across the interface — and the US side is learning the other half.' }
  ]
};

/* ---------------------------------------------------------------- registry */
const COURSE = {
  title: 'Cross-Cultural Collaboration',
  subtitle: 'A two-track programme for US and offshore teams',
  tracks: [ TRACK_US, TRACK_OFFSHORE ]
};
