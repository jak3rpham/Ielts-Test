// src/data/mocktests.ts
// Ngân hàng đề THI THỬ FULL-LENGTH — nội dung GỐC, tách riêng khỏi đề luyện.
// Mỗi đề = 1 bài thi hoàn chỉnh: Reading (3 passages ~40 câu) + Listening (4 sections ~40 câu)
//          + Writing (Task 1 + Task 2). "Mỗi lần thi một đề khác" do component chọn.
// Listening dùng transcript gốc + trình duyệt đọc to (Web Speech API) — KHÔNG chép đề thật.

export interface MockReadingQ {
  type: "TFNG" | "MCQ";
  q: string;
  options?: string[];
  answer: string | number; // TFNG: "True"|"False"|"Not Given" ; MCQ: index
}
export interface MockReadingPassage {
  title: string;
  passage: string[];
  questions: MockReadingQ[];
}

export interface MockListeningQ {
  type: "GAP" | "MCQ";
  q: string;
  options?: string[];
  answer: string | number; // GAP: từ/cụm cần điền (không phân biệt hoa/thường) ; MCQ: index
}
export interface MockListeningSection {
  title: string;
  transcript: string;
  questions: MockListeningQ[];
  youtubeId?: string; // nếu có: embed video thật thay cho giọng máy
  source?: string; // ghi công kênh
}

export interface MockWritingTask {
  task: 1 | 2;
  type: string;
  prompt: string;
  minWords: number;
  // Task 1 Academic: dữ liệu mô tả bằng bảng (vì app không render biểu đồ thật).
  table?: { caption: string; head: string[]; rows: string[][] };
}

export interface MockTest {
  id: string;
  label: { vi: string; en: string };
  reading: MockReadingPassage[];
  listening: MockListeningSection[];
  writing: { task1: MockWritingTask; task2: MockWritingTask };
}

/* ============================================================
   ĐỀ A
   ============================================================ */
const TEST_A: MockTest = {
  id: "A",
  label: { vi: "Đề A", en: "Test A" },
  reading: [
    {
      title: "Passage 1 — The slow comeback of the urban tram",
      passage: [
        "A century ago, electric trams were the backbone of transport in hundreds of cities. They were then dismantled almost everywhere, dismissed as obstacles to the rising motor car. Tracks were torn up, overhead wires removed, and the vehicles scrapped or sold abroad. For decades the tram was treated as a museum piece — a charming but obsolete relic of an earlier industrial age.",
        "That judgement is now being reversed. Faced with congestion, poor air quality and pressure to cut emissions, dozens of cities have laid new track and ordered sleek modern fleets. Unlike buses, trams run on dedicated lanes that are rarely blocked by traffic, and a single vehicle can carry far more passengers. Their predictability — arriving on a fixed route at fixed times — is precisely what makes them attractive to commuters who have grown tired of unreliable road transport.",
        "Critics point out that the costs are formidable. Building a single kilometre of track can absorb sums that would buy a large fleet of buses, and disruption during construction angers residents and traders alike. Supporters counter that trams last for decades, attract investment along their routes, and shift the public's behaviour in a way that cheaper options seldom achieve. Property values near new lines frequently rise, and some businesses report higher footfall once a stop opens nearby.",
        "What is clear is that the decision is rarely about transport alone. A tram line is also a statement about the kind of city its planners want to build — denser, less dependent on cars, and willing to spend now for benefits that may take a generation to appear. Whether voters accept that bargain varies enormously from one place to the next.",
      ],
      questions: [
        { type: "TFNG", q: "Electric trams were once common in many cities.", answer: "True" },
        { type: "TFNG", q: "Trams were removed mainly because they were unsafe.", answer: "False" },
        { type: "TFNG", q: "Every city that removed its trams has now rebuilt them.", answer: "Not Given" },
        { type: "TFNG", q: "Trams generally carry more passengers per vehicle than buses.", answer: "True" },
        { type: "TFNG", q: "Construction of new tram lines is always welcomed by local traders.", answer: "False" },
        { type: "MCQ", q: "Why are trams attractive to many commuters?", options: ["They are cheaper than all other transport", "They are predictable and run on dedicated lanes", "They never need maintenance"], answer: 1 },
        { type: "MCQ", q: "What do critics emphasise about trams?", options: ["Their high building costs", "Their slow speed", "Their small capacity"], answer: 0 },
        { type: "MCQ", q: "According to supporters, what effect can a tram line have on nearby property?", options: ["Values often fall", "Values frequently rise", "Values stay exactly the same"], answer: 1 },
        { type: "MCQ", q: "What does the final paragraph suggest about building a tram line?", options: ["It is purely a transport decision", "It reflects a wider vision for the city", "It is always rejected by voters"], answer: 1 },
        { type: "MCQ", q: "How long may the benefits of a tram line take to appear?", options: ["A few weeks", "About a generation", "Exactly five years"], answer: 1 },
        { type: "TFNG", q: "Modern tram fleets ordered by cities are described as old-fashioned in design.", answer: "False" },
        { type: "TFNG", q: "Acceptance of the cost of trams differs from city to city.", answer: "True" },
        { type: "TFNG", q: "Trams were sometimes sold to other countries after being removed.", answer: "True" },
      ],
    },
    {
      title: "Passage 2 — How plants warn each other",
      passage: [
        "When a caterpillar begins to chew a leaf, the damaged plant does not simply wait to be eaten. Within minutes it releases a cocktail of airborne chemicals, and these volatile compounds can be detected by neighbouring plants. Remarkably, those neighbours often respond by strengthening their own defences before any insect has reached them, as if they had been warned of an approaching threat.",
        "For a long time this phenomenon was treated with scepticism. Early experiments were criticised for being poorly controlled, and the idea that plants could 'communicate' sounded fanciful. More rigorous studies, however, have repeatedly confirmed the effect under laboratory and field conditions. Researchers now debate not whether it happens but exactly how, and what advantage, if any, the signalling plant gains from alerting its rivals.",
        "One leading explanation is that the chemicals are not really a message at all but a side effect of the plant's own internal repairs. Neighbours simply eavesdrop on signals that were never meant for them. An alternative view holds that warning genetically related plants nearby could improve the survival of shared genes, giving the behaviour an evolutionary purpose. The two ideas are not mutually exclusive, and the truth may differ between species.",
        "The practical implications are considerable. If crops could be encouraged to prime their defences in this way, farmers might rely less on chemical pesticides. Some agricultural trials have already explored spraying fields with the relevant compounds, though results so far have been mixed. As is often the case, a discovery that began as a curiosity is now being examined for its commercial value.",
      ],
      questions: [
        { type: "TFNG", q: "Damaged plants release chemicals into the air very quickly.", answer: "True" },
        { type: "TFNG", q: "Neighbouring plants can strengthen their defences before being attacked.", answer: "True" },
        { type: "TFNG", q: "Scientists immediately accepted the idea of plant signalling.", answer: "False" },
        { type: "TFNG", q: "Researchers now agree completely on why the signalling occurs.", answer: "False" },
        { type: "TFNG", q: "Spraying crops with the compounds has produced consistently excellent results.", answer: "Not Given" },
        { type: "MCQ", q: "What did early experiments on this topic suffer from?", options: ["Too many participants", "Poor control", "Excessive funding"], answer: 1 },
        { type: "MCQ", q: "What does the 'eavesdropping' explanation propose?", options: ["The chemicals are a deliberate warning", "Neighbours pick up signals not meant for them", "Plants cannot detect the chemicals"], answer: 1 },
        { type: "MCQ", q: "Why might warning related plants make evolutionary sense?", options: ["It helps shared genes survive", "It harms competitors", "It produces more chemicals"], answer: 0 },
        { type: "MCQ", q: "What practical benefit could this research bring to farming?", options: ["Larger fruit", "Less reliance on chemical pesticides", "Faster growth only"], answer: 1 },
        { type: "MCQ", q: "How does the passage describe the current status of the discovery?", options: ["Being examined for commercial value", "Completely abandoned", "Proven useless"], answer: 0 },
        { type: "TFNG", q: "The two explanations for the signalling cannot both be partly true.", answer: "False" },
        { type: "TFNG", q: "The signalling effect has been confirmed in field conditions.", answer: "True" },
        { type: "TFNG", q: "The mechanism may vary depending on the plant species.", answer: "True" },
      ],
    },
    {
      title: "Passage 3 — The trouble with measuring happiness",
      passage: [
        "Governments increasingly want to know not just how wealthy their citizens are but how happy. Surveys that ask people to rate their life satisfaction on a numerical scale have become a standard tool, and the resulting rankings of nations attract wide attention. Yet the apparent simplicity of these numbers conceals a host of difficult problems that researchers are still working to untangle.",
        "The first difficulty is language. A word translated as 'happy' in one culture may carry connotations of luck, contentment or even mild foolishness in another, so identical questions may not measure identical things. The second is the influence of mood and context: people asked on a sunny day, or just after recalling a pleasant memory, tend to report higher satisfaction than they otherwise would. Such fluctuations make a single snapshot unreliable.",
        "There is also the question of what the numbers are for. If a government treats raising the national happiness score as a goal in itself, it may be tempted to pursue policies that make people report contentment without actually improving their lives — encouraging lower expectations, for instance, rather than better conditions. Critics warn that any measure, once it becomes a target, tends to be distorted.",
        "None of this means the effort is worthless. Tracked carefully over long periods, and combined with other indicators, well-being data can reveal patterns that economic statistics miss entirely — the corrosive effect of long commutes, say, or the value of strong social ties. The lesson is not to abandon the measurement but to treat its results with appropriate caution.",
      ],
      questions: [
        { type: "TFNG", q: "Governments are interested only in the wealth of their citizens.", answer: "False" },
        { type: "TFNG", q: "National happiness rankings receive a lot of public attention.", answer: "True" },
        { type: "TFNG", q: "The word for 'happy' means exactly the same thing in every language.", answer: "False" },
        { type: "TFNG", q: "A person's reported satisfaction can be affected by the weather that day.", answer: "True" },
        { type: "TFNG", q: "All governments deliberately manipulate their happiness scores.", answer: "Not Given" },
        { type: "MCQ", q: "What is named as the first difficulty in measuring happiness?", options: ["The cost of surveys", "Differences in language and connotation", "The age of respondents"], answer: 1 },
        { type: "MCQ", q: "Why can a single survey snapshot be unreliable?", options: ["Mood and context shift people's answers", "People always lie", "Surveys are too long"], answer: 0 },
        { type: "MCQ", q: "What risk arises if a happiness score becomes a target?", options: ["It may be distorted", "It becomes more accurate", "It is ignored entirely"], answer: 0 },
        { type: "MCQ", q: "What hidden factor can well-being data reveal, according to the passage?", options: ["The effect of long commutes", "The price of housing only", "Average rainfall"], answer: 0 },
        { type: "MCQ", q: "What is the author's overall recommendation?", options: ["Abandon the measurement", "Treat the results with caution", "Trust the numbers completely"], answer: 1 },
        { type: "TFNG", q: "Well-being data is most useful when tracked over long periods.", answer: "True" },
        { type: "TFNG", q: "Economic statistics capture everything that well-being data does.", answer: "False" },
        { type: "TFNG", q: "Strong social ties are mentioned as something well-being data can highlight.", answer: "True" },
        { type: "TFNG", q: "The author believes happiness surveys should be the only measure a government uses.", answer: "False" },
      ],
    },
  ],
  listening: [
    {
      title: "Section 1 — Booking a community hall",
      transcript:
        "Good afternoon, Riverside Community Centre, how can I help? … Right, you'd like to book the main hall for a birthday party. Let me take some details. The hall holds up to eighty people, and the hire fee is forty pounds an hour, with a minimum booking of three hours. There's also a refundable deposit of fifty pounds, which we return within seven days after the event if there's no damage. The kitchen is included at no extra charge, but if you want to use the sound system that's an additional fifteen pounds. We do ask that all music stops by eleven o'clock, and the hall must be cleared by half past eleven. To confirm the booking we'll need a phone number and your full name. Payment can be made by card over the phone or in person at reception.",
      questions: [
        { type: "GAP", q: "The hall holds up to ___ people.", answer: "eighty" },
        { type: "GAP", q: "The hire fee is ___ pounds an hour.", answer: "forty" },
        { type: "GAP", q: "The minimum booking is ___ hours.", answer: "three" },
        { type: "GAP", q: "The refundable deposit is ___ pounds.", answer: "fifty" },
        { type: "MCQ", q: "How long after the event is the deposit returned?", options: ["Within three days", "Within seven days", "Within two weeks"], answer: 1 },
        { type: "MCQ", q: "What costs an extra fifteen pounds?", options: ["The kitchen", "The sound system", "Parking"], answer: 1 },
        { type: "MCQ", q: "By what time must all music stop?", options: ["Ten o'clock", "Eleven o'clock", "Midnight"], answer: 1 },
        { type: "GAP", q: "The hall must be cleared by half past ___.", answer: "eleven" },
        { type: "MCQ", q: "How can payment be made?", options: ["Only in cash", "By card over the phone or in person", "By cheque only"], answer: 1 },
        { type: "GAP", q: "The kitchen is included at no extra ___.", answer: "charge" },
      ],
    },
    {
      title: "Section 2 — A talk about a city cycling scheme",
      transcript:
        "Welcome everyone. I'd like to tell you about our city's bike-share scheme, which launched two years ago. We now have ninety docking stations spread across the centre, and the network has just over a thousand bicycles. To use a bike you download the app, scan the code on the handlebars, and ride to any station. The first thirty minutes of every trip are free; after that you pay a pound for each additional half hour. Most journeys, we've found, last under twenty minutes, so the great majority of riders pay nothing at all. The most popular station is outside the central railway station, especially on weekday mornings. One challenge has been keeping bikes evenly distributed, since they tend to pile up downhill, so a small van redistributes them overnight. Looking ahead, we plan to add electric bikes next spring and to extend the scheme to the university district.",
      questions: [
        { type: "GAP", q: "The scheme launched ___ years ago.", answer: "two" },
        { type: "GAP", q: "There are ___ docking stations in the centre.", answer: "ninety" },
        { type: "MCQ", q: "How many bicycles are in the network?", options: ["Just under a thousand", "Just over a thousand", "Exactly five hundred"], answer: 1 },
        { type: "GAP", q: "The first ___ minutes of every trip are free.", answer: "thirty" },
        { type: "MCQ", q: "What do you pay after the free period?", options: ["A pound per half hour", "A pound per hour", "Nothing more"], answer: 0 },
        { type: "MCQ", q: "Which is the most popular station?", options: ["Outside the university", "Outside the central railway station", "By the river"], answer: 1 },
        { type: "GAP", q: "Bikes tend to pile up at the bottom of hills, so a van redistributes them ___.", answer: "overnight" },
        { type: "MCQ", q: "What will be added next spring?", options: ["More docking stations", "Electric bikes", "A second app"], answer: 1 },
        { type: "GAP", q: "Most journeys last under ___ minutes.", answer: "twenty" },
        { type: "GAP", q: "The scheme will be extended to the ___ district.", answer: "university" },
      ],
    },
    {
      title: "Section 3 — Two students discuss a project",
      transcript:
        "So, about our presentation on renewable energy — have you decided which source to focus on? … I was thinking solar, but everyone does solar. Maybe we should look at tidal power instead; it's less common and the data is interesting. … Good point. The advantage of tidal is that it's very predictable — you know exactly when the tides will come, unlike wind or sun. The downside is the high construction cost and the limited number of suitable coastlines. … Right. I'll handle the section on how the technology works, and you take the environmental impact. Shall we aim for twelve slides? … Twelve feels like a lot for ten minutes. Let's keep it to eight, with clear visuals rather than text. … Agreed. And remember the tutor wants at least three academic sources cited, not just websites. I'll book the group study room for Thursday afternoon so we can rehearse. … Perfect. Let's also time ourselves; last time we ran two minutes over.",
      questions: [
        { type: "MCQ", q: "Which energy source do the students finally choose?", options: ["Solar", "Tidal", "Wind"], answer: 1 },
        { type: "MCQ", q: "What is given as the main advantage of tidal power?", options: ["It is cheap to build", "It is very predictable", "It works anywhere"], answer: 1 },
        { type: "MCQ", q: "What is named as a downside of tidal power?", options: ["High construction cost", "Unreliable supply", "It harms no wildlife"], answer: 0 },
        { type: "GAP", q: "The male student will cover how the ___ works.", answer: "technology" },
        { type: "GAP", q: "They decide to use ___ slides in total.", answer: "eight" },
        { type: "GAP", q: "They want clear ___ rather than text.", answer: "visuals" },
        { type: "MCQ", q: "How many academic sources does the tutor require?", options: ["At least two", "At least three", "At least five"], answer: 1 },
        { type: "GAP", q: "They book the group study room for ___ afternoon.", answer: "Thursday" },
        { type: "MCQ", q: "Why do they decide to time themselves?", options: ["They ran over time last presentation", "The room closes early", "The tutor told them to"], answer: 0 },
        { type: "GAP", q: "Last time they ran ___ minutes over.", answer: "two" },
      ],
    },
    {
      title: "Section 4 — Lecture on the history of coffee",
      transcript:
        "Today I want to trace how coffee spread around the world. The plant originated in the highlands of Ethiopia, where, according to legend, a goat herder noticed his animals becoming lively after eating certain berries. From there, cultivation moved across the Red Sea to Yemen in the fifteenth century, and the port of Mocha became so important that its name is still used for a type of coffee today. By the sixteenth century, coffee houses had appeared in cities across the Middle East, and they quickly became centres of conversation and debate. When coffee reached Europe, it met initial suspicion — some clergy regarded it as a foreign threat — but it was soon embraced, and London alone had hundreds of coffee houses by the late seventeenth century. These establishments earned the nickname 'penny universities', because for the price of a cup you could join discussions on politics, science and trade. The crop later spread to colonies in the Americas and Asia, and today Brazil is by far the largest producer.",
      questions: [
        { type: "GAP", q: "The coffee plant originated in the highlands of ___.", answer: "Ethiopia" },
        { type: "MCQ", q: "According to legend, who first noticed coffee's effect?", options: ["A merchant", "A goat herder", "A doctor"], answer: 1 },
        { type: "GAP", q: "Cultivation moved across the Red Sea to ___ in the fifteenth century.", answer: "Yemen" },
        { type: "GAP", q: "The port of ___ gave its name to a type of coffee.", answer: "Mocha" },
        { type: "MCQ", q: "How did coffee houses function in the Middle East?", options: ["As centres of conversation and debate", "Only as shops", "As government offices"], answer: 0 },
        { type: "MCQ", q: "How did some European clergy first regard coffee?", options: ["As a foreign threat", "As a medicine", "As a luxury gift"], answer: 0 },
        { type: "GAP", q: "London coffee houses were nicknamed 'penny ___'.", answer: "universities" },
        { type: "MCQ", q: "Why were they given that nickname?", options: ["They cost a penny to build", "For a cup's price you joined discussions", "They taught reading"], answer: 1 },
        { type: "GAP", q: "By the late seventeenth century London had ___ of coffee houses.", answer: "hundreds" },
        { type: "GAP", q: "Today the largest producer of coffee is ___.", answer: "Brazil" },
      ],
    },
  ],
  writing: {
    task1: {
      task: 1,
      type: "Task 1 — Table",
      minWords: 150,
      prompt:
        "The table below shows the number of visitors (in thousands) to four types of tourist attraction in a country in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      table: {
        caption: "Visitors (thousands) by attraction type",
        head: ["Attraction", "2010", "2020"],
        rows: [
          ["Museums", "420", "510"],
          ["Theme parks", "610", "880"],
          ["Historic sites", "350", "300"],
          ["Zoos & aquariums", "280", "260"],
        ],
      },
    },
    task2: {
      task: 2,
      type: "Task 2 — Opinion",
      minWords: 250,
      prompt:
        "Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?",
    },
  },
};

/* ============================================================
   ĐỀ B
   ============================================================ */
const TEST_B: MockTest = {
  id: "B",
  label: { vi: "Đề B", en: "Test B" },
  reading: [
    {
      title: "Passage 1 — The disappearing art of map-reading",
      passage: [
        "Not so long ago, a journey to an unfamiliar place began with a paper map spread out on a table. Routes were traced with a finger, distances estimated, and landmarks committed to memory. Today, for most people, that ritual has vanished. A phone in the pocket calculates the fastest route, speaks directions aloud, and recalculates instantly if a wrong turn is taken. The convenience is undeniable, but some researchers worry about what is being lost along the way.",
        "Studies of navigation suggest that actively working out a route exercises parts of the brain associated with spatial memory. When a device does the thinking, those regions are used less. In experiments, people who relied on turn-by-turn directions were noticeably worse at later sketching the area they had travelled through, or at pointing towards their starting position, than those who had navigated for themselves.",
        "Defenders of the technology argue that this is simply the latest example of a tool changing how the mind works, and not necessarily for the worse. Few of us can perform long division on paper as readily as our grandparents did, yet calculators have hardly made society less numerate in practical terms. Freed from the effort of route-finding, the argument goes, attention can be spent on more valuable things.",
        "The likeliest outcome is a compromise. Most people will continue to lean on their devices for everyday trips while occasionally choosing, or being forced by a flat battery, to find their own way. The skill of reading a landscape may become rarer and more specialised, much as map-making itself once did — valued by a few, unnecessary for the many.",
      ],
      questions: [
        { type: "TFNG", q: "People once memorised landmarks when planning a journey.", answer: "True" },
        { type: "TFNG", q: "Modern navigation apps cannot recalculate a route after a wrong turn.", answer: "False" },
        { type: "TFNG", q: "Active route-finding uses brain regions linked to spatial memory.", answer: "True" },
        { type: "TFNG", q: "Everyone in the experiments performed equally well at sketching the area.", answer: "False" },
        { type: "TFNG", q: "The author states that calculators have made society far less numerate.", answer: "False" },
        { type: "MCQ", q: "What did people who used turn-by-turn directions struggle with afterwards?", options: ["Speaking clearly", "Sketching the area and pointing to their start", "Reading aloud"], answer: 1 },
        { type: "MCQ", q: "How do defenders of the technology view it?", options: ["As a disaster", "As the latest tool reshaping the mind", "As completely useless"], answer: 1 },
        { type: "MCQ", q: "What does the author predict is the likeliest outcome?", options: ["A total ban on apps", "A compromise between devices and self-navigation", "A return to paper maps for everyone"], answer: 1 },
        { type: "MCQ", q: "To what does the author compare the future of landscape-reading?", options: ["To map-making becoming specialised", "To learning a language", "To driving a car"], answer: 0 },
        { type: "MCQ", q: "What might force someone to find their own way, according to the passage?", options: ["A flat battery", "A new phone", "A faster route"], answer: 0 },
        { type: "TFNG", q: "The author believes the convenience of navigation apps is real.", answer: "True" },
        { type: "TFNG", q: "The passage claims paper maps are now completely illegal.", answer: "Not Given" },
        { type: "TFNG", q: "The skill of reading a landscape may become rarer in future.", answer: "True" },
      ],
    },
    {
      title: "Passage 2 — Why some animals play",
      passage: [
        "Watch a young dog chase its own tail, or two otters tumble down a muddy bank again and again, and it is hard not to conclude that animals play. Yet for scientists, play has long been a puzzle. It burns energy, can expose the player to danger, and produces no obvious immediate reward. Why would evolution favour behaviour that looks, on the surface, so pointless?",
        "The most widely accepted answer is that play is practice. A kitten pouncing on a ball of wool is rehearsing the movements it will later use to hunt; young animals that wrestle are honing skills they will need in real contests. Supporting this, species with complex social lives and long childhoods, such as primates and dolphins, tend to play the most, while animals that mature quickly and live alone play little or not at all.",
        "But practice cannot be the whole story. Some play seems to have no clear payoff, and animals will play even when they are well fed and safe, conditions in which 'rehearsal' should matter least. An emerging view is that play also helps build flexible brains, allowing animals to cope with the unexpected. By trying out actions in a safe, low-stakes setting, the young may learn not a specific skill but a general capacity to improvise.",
        "There may also be a simpler element that scientists are increasingly willing to acknowledge: that play is, in some sense, enjoyable. Rats emit ultrasonic calls when tickled that resemble those they make during play, and they will seek out the experimenter who tickles them. If play feels good, that feeling may itself be the mechanism evolution uses to ensure the valuable practice gets done.",
      ],
      questions: [
        { type: "TFNG", q: "Play uses up energy and can put an animal at risk.", answer: "True" },
        { type: "TFNG", q: "Scientists have always found play easy to explain.", answer: "False" },
        { type: "TFNG", q: "Animals with long childhoods tend to play more.", answer: "True" },
        { type: "TFNG", q: "Animals only ever play when they are hungry and in danger.", answer: "False" },
        { type: "TFNG", q: "Rats avoid people who have tickled them in the past.", answer: "False" },
        { type: "MCQ", q: "What is the most widely accepted explanation for play?", options: ["It is practice for later skills", "It wastes time", "It cools the body"], answer: 0 },
        { type: "MCQ", q: "Which animals are said to play the most?", options: ["Those that live alone", "Those with complex social lives and long childhoods", "Those that mature quickly"], answer: 1 },
        { type: "MCQ", q: "What does the 'flexible brain' view suggest play teaches?", options: ["A general capacity to improvise", "One exact hunting move", "How to sleep"], answer: 0 },
        { type: "MCQ", q: "What evidence suggests play may be enjoyable?", options: ["Rats' calls when tickled", "Animals refusing food", "Longer lifespans"], answer: 0 },
        { type: "MCQ", q: "Why might enjoyment of play be evolutionarily useful?", options: ["It ensures valuable practice gets done", "It saves energy", "It reduces sleep"], answer: 0 },
        { type: "TFNG", q: "The author concludes that practice fully explains all animal play.", answer: "False" },
        { type: "TFNG", q: "A kitten pouncing on wool is described as rehearsing hunting movements.", answer: "True" },
        { type: "TFNG", q: "Solitary, quick-maturing animals play very little.", answer: "True" },
      ],
    },
    {
      title: "Passage 3 — The case for and against open-plan offices",
      passage: [
        "The open-plan office, with its long rows of desks and absence of walls, was once hailed as the future of work. Removing partitions, its champions argued, would tear down hierarchies, spark spontaneous collaboration and let ideas flow freely between colleagues who might otherwise never speak. For employers there was a further attraction that was rarely advertised: fitting more people into less space cut costs considerably.",
        "Reality has proved more complicated. A series of studies has found that when companies moved staff into open-plan layouts, face-to-face interaction often fell rather than rose. Deprived of privacy, employees retreated behind headphones and turned to email and messaging apps even to contact someone sitting nearby. Noise and constant interruption, meanwhile, were repeatedly linked to lower concentration and higher stress.",
        "This does not mean enclosed offices are simply better. Private rooms can isolate workers and entrench the very hierarchies that open plans sought to dissolve. The most thoughtful designers now argue that the question was wrongly framed from the start. What matters is not whether walls exist but whether the space offers a range of settings — quiet zones for focused work, comfortable areas for informal talk, and rooms that can be closed for meetings or calls.",
        "The pandemic added a further twist. With many staff now splitting their time between home and the office, some firms have concluded that the workplace should be designed less for solitary tasks, which can be done anywhere, and more for the activities that genuinely benefit from being together. Whether that insight survives the next swing of management fashion remains to be seen.",
      ],
      questions: [
        { type: "TFNG", q: "Open-plan offices were once seen as the future of work.", answer: "True" },
        { type: "TFNG", q: "Cost savings were always the most heavily advertised benefit of open plans.", answer: "False" },
        { type: "TFNG", q: "Some studies found face-to-face interaction fell after moving to open plans.", answer: "True" },
        { type: "TFNG", q: "Open-plan layouts were linked to higher concentration.", answer: "False" },
        { type: "TFNG", q: "The passage states exactly how many companies took part in the studies.", answer: "Not Given" },
        { type: "MCQ", q: "What did employees often do when they lost privacy?", options: ["Talk more loudly", "Retreat behind headphones and use messaging", "Leave their jobs"], answer: 1 },
        { type: "MCQ", q: "What problem can fully enclosed offices cause?", options: ["They isolate workers and entrench hierarchies", "They are always too noisy", "They cost nothing"], answer: 0 },
        { type: "MCQ", q: "What do thoughtful designers now argue?", options: ["Walls should always be removed", "The original question was wrongly framed", "Everyone should work from home"], answer: 1 },
        { type: "MCQ", q: "What kind of space do these designers favour?", options: ["One offering a range of settings", "Only quiet rooms", "Only large open halls"], answer: 0 },
        { type: "MCQ", q: "How did the pandemic change some firms' thinking?", options: ["Offices should focus on activities done better together", "Offices should be abolished", "Solitary work should be done in the office"], answer: 0 },
        { type: "TFNG", q: "Noise in open offices was linked to higher stress.", answer: "True" },
        { type: "TFNG", q: "The author claims enclosed offices are simply better than open plans.", answer: "False" },
        { type: "TFNG", q: "The author is certain the pandemic's lesson will last.", answer: "False" },
        { type: "TFNG", q: "Open plans were partly intended to reduce workplace hierarchies.", answer: "True" },
      ],
    },
  ],
  listening: [
    {
      title: "Section 1 — Enquiring about a language course",
      transcript:
        "Hello, Brightway Language School, how can I help? … You're interested in the evening Spanish course, that's right. We run three levels: beginner, intermediate and advanced. The beginner class meets on Mondays and Wednesdays from seven to half past eight. The full course lasts ten weeks and the fee is two hundred and forty pounds, which includes the textbook. If you book before the end of the month there's a ten per cent discount. Classes are kept small — no more than twelve students — and they're held at our branch on Park Street, not the main building. You'll need to do a short placement test online before you start, just so we put you in the right group. Oh, and there's free parking behind the building after six o'clock.",
      questions: [
        { type: "MCQ", q: "Which language course is the caller interested in?", options: ["French", "Spanish", "Italian"], answer: 1 },
        { type: "GAP", q: "The beginner class meets on Mondays and ___.", answer: "Wednesdays" },
        { type: "GAP", q: "The full course lasts ___ weeks.", answer: "ten" },
        { type: "GAP", q: "The fee is two hundred and ___ pounds.", answer: "forty" },
        { type: "MCQ", q: "What does the fee include?", options: ["The textbook", "A dictionary", "Lunch"], answer: 0 },
        { type: "MCQ", q: "What discount is offered for booking early?", options: ["Five per cent", "Ten per cent", "Twenty per cent"], answer: 1 },
        { type: "GAP", q: "Classes have no more than ___ students.", answer: "twelve" },
        { type: "GAP", q: "Classes are held at the branch on ___ Street.", answer: "Park" },
        { type: "MCQ", q: "What must the caller do before starting?", options: ["Pay in cash", "Take a placement test online", "Buy a uniform"], answer: 1 },
        { type: "GAP", q: "Parking behind the building is free after ___ o'clock.", answer: "six" },
      ],
    },
    {
      title: "Section 2 — Information about a nature reserve",
      transcript:
        "Welcome to Hartwell Nature Reserve. Before you set off, a few useful things. The reserve covers about three hundred hectares of woodland and wetland, and there are four marked trails. The shortest, the blue trail, takes around forty minutes and is suitable for wheelchairs. The red trail is the longest, at roughly two hours, and it's the best for spotting deer, especially early in the morning. Please keep dogs on a lead at all times, as we have ground-nesting birds. The bird hide near the lake is open from dawn until dusk, and it's a wonderful spot for photography. Our visitor café serves hot drinks and light meals until four o'clock, and the last entry to the reserve is at half past four. If you'd like a guided walk, they run every Saturday at ten and must be booked in advance.",
      questions: [
        { type: "GAP", q: "The reserve covers about ___ hectares.", answer: "three hundred" },
        { type: "GAP", q: "There are ___ marked trails.", answer: "four" },
        { type: "MCQ", q: "Which trail is suitable for wheelchairs?", options: ["The blue trail", "The red trail", "The green trail"], answer: 0 },
        { type: "MCQ", q: "Which trail is best for spotting deer?", options: ["The blue trail", "The red trail", "The yellow trail"], answer: 1 },
        { type: "GAP", q: "Dogs must be kept on a ___ at all times.", answer: "lead" },
        { type: "MCQ", q: "When is the bird hide open?", options: ["Only at midday", "From dawn until dusk", "Weekends only"], answer: 1 },
        { type: "GAP", q: "The café serves food until ___ o'clock.", answer: "four" },
        { type: "GAP", q: "The last entry to the reserve is at half past ___.", answer: "four" },
        { type: "MCQ", q: "When do guided walks take place?", options: ["Every Saturday at ten", "Every day at nine", "Sundays at noon"], answer: 0 },
        { type: "GAP", q: "Guided walks must be booked in ___.", answer: "advance" },
      ],
    },
    {
      title: "Section 3 — Tutorial about a dissertation",
      transcript:
        "Come in, take a seat. So, your dissertation on urban beekeeping — how's it going? … I've collected most of my survey responses, but I'm worried I don't have enough. … How many do you have? … About sixty. … That's actually a reasonable sample for an undergraduate project; I'd stop collecting now and start analysing. What's your main finding so far? … That beekeepers in the city report higher honey yields than they expected, possibly because of the variety of garden flowers. … Interesting. Make sure you don't overstate that — correlation isn't cause. You'll need to discuss other explanations too, like milder city temperatures. For the structure, I'd suggest keeping the literature review to about two thousand words and giving more space to your own analysis. And do reference the Hodgson study from twenty-nineteen; it's central to this field. When's your deadline? … The fifteenth of May. … Good, that gives you six weeks. Send me a draft of the methods chapter by the end of next week.",
      questions: [
        { type: "GAP", q: "The dissertation is about urban ___.", answer: "beekeeping" },
        { type: "GAP", q: "The student has collected about ___ survey responses.", answer: "sixty" },
        { type: "MCQ", q: "What does the tutor advise about the sample size?", options: ["Collect far more", "Stop collecting and start analysing", "Start again"], answer: 1 },
        { type: "MCQ", q: "What does the tutor warn the student not to do?", options: ["Overstate the cause of the finding", "Use any sources", "Write too little"], answer: 0 },
        { type: "GAP", q: "A possible alternative explanation is milder city ___.", answer: "temperatures" },
        { type: "MCQ", q: "How long should the literature review be?", options: ["About one thousand words", "About two thousand words", "About four thousand words"], answer: 1 },
        { type: "GAP", q: "The student should reference the ___ study from 2019.", answer: "Hodgson" },
        { type: "GAP", q: "The deadline is the ___ of May.", answer: "fifteenth" },
        { type: "MCQ", q: "How many weeks does the student have?", options: ["Four weeks", "Six weeks", "Eight weeks"], answer: 1 },
        { type: "GAP", q: "The student must send a draft of the ___ chapter by next week.", answer: "methods" },
      ],
    },
    {
      title: "Section 4 — Lecture on the science of sleep",
      transcript:
        "Today's lecture concerns why we sleep. For a long time sleep was seen almost as wasted time, but we now understand it to be remarkably active. During the night the brain cycles between several stages, the deepest of which is associated with physical restoration, while a later stage, known as REM sleep, is when most vivid dreaming occurs and when memories appear to be consolidated. One striking discovery is that during sleep the brain clears away waste proteins that build up during waking hours; the channels that allow this expand significantly at night. Lack of sleep has been linked to impaired concentration, weaker immune response and poorer mood, and chronic shortage may raise the long-term risk of several diseases. Adults are generally advised to aim for between seven and nine hours, though needs vary with age — newborns may sleep sixteen hours, while older adults often sleep less. Interestingly, the timing of sleep is governed by an internal clock that responds strongly to light, which is why screens late at night can make falling asleep harder.",
      questions: [
        { type: "MCQ", q: "How was sleep regarded for a long time?", options: ["As wasted time", "As dangerous", "As a hobby"], answer: 0 },
        { type: "GAP", q: "The deepest stage is associated with physical ___.", answer: "restoration" },
        { type: "MCQ", q: "What largely happens during REM sleep?", options: ["Vivid dreaming and memory consolidation", "Muscle growth only", "Nothing measurable"], answer: 0 },
        { type: "GAP", q: "During sleep the brain clears away waste ___.", answer: "proteins" },
        { type: "MCQ", q: "What has lack of sleep been linked to?", options: ["Better mood", "Impaired concentration and weaker immunity", "Faster reactions"], answer: 1 },
        { type: "GAP", q: "Adults are advised to aim for between seven and ___ hours.", answer: "nine" },
        { type: "GAP", q: "Newborns may sleep up to ___ hours.", answer: "sixteen" },
        { type: "MCQ", q: "What governs the timing of sleep?", options: ["An internal clock responding to light", "The seasons only", "Body weight"], answer: 0 },
        { type: "GAP", q: "Screens late at night can make falling ___ harder.", answer: "asleep" },
        { type: "MCQ", q: "What does the lecturer say about older adults' sleep?", options: ["They often sleep less", "They need sixteen hours", "They never dream"], answer: 0 },
      ],
    },
  ],
  writing: {
    task1: {
      task: 1,
      type: "Task 1 — Table",
      minWords: 150,
      prompt:
        "The table below shows the percentage of households with access to selected technologies in one country in 2005 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      table: {
        caption: "Households with access (%)",
        head: ["Technology", "2005", "2020"],
        rows: [
          ["Fixed broadband", "28%", "86%"],
          ["Smartphone", "4%", "92%"],
          ["Desktop computer", "55%", "34%"],
          ["Landline telephone", "78%", "41%"],
        ],
      },
    },
    task2: {
      task: 2,
      type: "Task 2 — Discussion",
      minWords: 250,
      prompt:
        "Some people think that the best way to reduce traffic in cities is to raise the cost of fuel, while others believe improving public transport is more effective. Discuss both views and give your own opinion.",
    },
  },
};

export const MOCK_TESTS: MockTest[] = [TEST_A, TEST_B];

// Tương thích ngược (nếu nơi nào còn import cũ).
export const READING_MOCKS = MOCK_TESTS.flatMap((t) => t.reading);
export const LISTENING_MOCKS = MOCK_TESTS.flatMap((t) => t.listening);
export const WRITING_MOCKS = MOCK_TESTS.map((t) => t.writing.task2);
