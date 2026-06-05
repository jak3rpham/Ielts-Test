// src/data/grammar.ts
import { GrammarLesson } from "./types";

// helper song ngữ
const B = (vi: string, en: string) => ({ vi, en });
const g = (kind: "good" | "bad" | "plain", vi: string, en: string) => ({ kind, html: { vi, en } });

export const GRAMMAR: GrammarLesson[] = [
  // ================= NỀN TẢNG =================
  {
    id: "articles",
    title: B("Mạo từ a / an / the / zero", "Articles: a / an / the / zero"),
    band: "b6",
    intro: B("Tiếng Việt không có mạo từ — đây là nguồn lỗi số 1 kéo điểm Grammar. Bài này đi sâu cả quy tắc lẫn ngoại lệ.", "Vietnamese has no articles — the number-one source of grammar errors. This lesson covers both rules and exceptions in depth."),
    points: [
      { rule: B("'a' hay 'an' theo ÂM, không theo chữ cái", "'a' vs 'an' by SOUND, not spelling"), examples: [
        g("good", "<span class='hi'>a</span> university, <span class='hi'>a</span> one-way street (âm /j/, /w/)", "<span class='hi'>a</span> university, <span class='hi'>a</span> one-way street (/j/, /w/)"),
        g("good", "<span class='hi'>an</span> hour, <span class='hi'>an</span> honest man, <span class='hi'>an</span> MBA (âm nguyên âm)", "<span class='hi'>an</span> hour, <span class='hi'>an</span> honest man, <span class='hi'>an</span> MBA (vowel sounds)"),
      ] },
      { rule: B("'a/an' — lần đầu nhắc, đếm được số ít; và nghề nghiệp", "'a/an' — first mention, singular countable; and jobs"), examples: [
        g("good", "She adopted <span class='hi'>a</span> dog. <span class='hi'>The</span> dog is now five. · She is <span class='hi'>a</span> doctor.", "She adopted <span class='hi'>a</span> dog. <span class='hi'>The</span> dog is now five. · She is <span class='hi'>a</span> doctor."),
      ] },
      { rule: B("'the' — đã xác định: nhắc lại, duy nhất, có cụm/mệnh đề giới hạn, hoặc cả hai bên đều biết", "'the' — specified: second mention, unique, limited by a phrase/clause, or known to both"), examples: [
        g("good", "<span class='hi'>the</span> sun, <span class='hi'>the</span> government · <span class='hi'>the</span> book on the table", "<span class='hi'>the</span> sun, <span class='hi'>the</span> government · <span class='hi'>the</span> book on the table"),
      ] },
      { rule: B("'the' bắt buộc: so sánh nhất, số thứ tự, 'the + tính từ' chỉ nhóm người", "'the' required: superlatives, ordinals, 'the + adjective' for groups"), examples: [
        g("good", "<span class='hi'>the</span> best solution, <span class='hi'>the</span> first step, <span class='hi'>the</span> rich, <span class='hi'>the</span> unemployed", "<span class='hi'>the</span> best solution, <span class='hi'>the</span> first step, <span class='hi'>the</span> rich, <span class='hi'>the</span> unemployed"),
      ] },
      { rule: B("Zero article — danh từ KHÔNG đếm được & số nhiều nghĩa CHUNG", "Zero article — uncountable & plural nouns in a GENERAL sense"), examples: [
        g("good", "<span class='hi'>Education</span> shapes society. <span class='hi'>Smartphones</span> have changed communication.", "<span class='hi'>Education</span> shapes society. <span class='hi'>Smartphones</span> have changed communication."),
        g("bad", "Society depends on <s>the</s> technology (thừa 'the')", "Society depends on <s>the</s> technology (extra 'the')"),
      ] },
      { rule: B("NGOẠI LỆ địa danh: 'the' với sông/biển/đại dương/sa mạc/dãy núi & tên nước số nhiều; KHÔNG với núi/hồ/nước đơn lẻ", "PLACE exceptions: 'the' with rivers/seas/oceans/deserts/ranges & plural countries; NOT single mountains/lakes/countries"), examples: [
        g("good", "<span class='hi'>the</span> Mekong, <span class='hi'>the</span> Alps, <span class='hi'>the</span> Netherlands · Ø Mount Everest, Ø France", "<span class='hi'>the</span> Mekong, <span class='hi'>the</span> Alps, <span class='hi'>the</span> Netherlands · Ø Mount Everest, Ø France"),
      ] },
      { rule: B("NGOẠI LỆ thành ngữ: go to school/bed/work (zero) ≠ the school (toà nhà); nhạc cụ đi với 'the'", "Idiomatic: go to school/bed/work (zero) ≠ the school (the building); instruments take 'the'"), examples: [
        g("good", "children go to <span class='hi'>school</span> · play <span class='hi'>the</span> piano · (BrE) in <span class='hi'>hospital</span>", "children go to <span class='hi'>school</span> · play <span class='hi'>the</span> piano · (BrE) in <span class='hi'>hospital</span>"),
      ] },
    ],
    vietMistake: B("Hai lỗi đỉnh: (1) thừa 'the' với danh từ nghĩa chung; (2) thiếu 'a' với đếm được số ít (<i>I have <s>Ø</s> car</i>). Nhớ <i>an</i> hour theo âm.", "Two top errors: (1) extra 'the' with general nouns; (2) missing 'a' with singular countables (<i>I have <s>Ø</s> car</i>). Remember <i>an</i> hour, by sound."),
    quiz: [
      { q: B("Theo ÂM: '___ university offers ___ honest assessment.'", "By SOUND: '___ university offers ___ honest assessment.'"), options: ["a / a", B("a / an", "a / an"), "an / an"], answer: 1, explain: B("'university' âm /j/ → a; 'honest' h câm → an.", "'university' /j/ → a; 'honest' silent h → an.") },
      { q: B("'___ unemployment remains ___ serious problem.'", "'___ unemployment remains ___ serious problem.'"), options: ["The / a", B("Ø / a", "Ø / a"), "The / the"], answer: 1, explain: B("Danh từ chung không đếm được → zero; 'a serious problem' đếm được số ít.", "General uncountable → zero; 'a serious problem' is singular countable.") },
      { q: B("Câu nào đúng?", "Which is correct?"), options: [B("Internet has transformed the business.", "Internet has transformed the business."), B("The internet has transformed business.", "The internet has transformed business."), B("Internet has transformed business.", "Internet has transformed business.")], answer: 1, explain: B("'the internet' (duy nhất) + 'business' nghĩa chung → zero.", "'the internet' (unique) + general 'business' → zero.") },
      { q: B("Địa danh nào đúng?", "Which place usage is correct?"), options: [B("She climbed the Mount Everest.", "She climbed the Mount Everest."), B("She sailed along the Mekong.", "She sailed along the Mekong."), B("He visited the France.", "He visited the France.")], answer: 1, explain: B("Sông dùng 'the'; núi/nước đơn lẻ không.", "Rivers take 'the'; single mountains/countries don't.") },
      { q: B("Chỗ nào cần 'the'?", "Which needs 'the'?"), options: [B("It was ___ best decision.", "It was ___ best decision."), B("I study ___ economics.", "I study ___ economics."), B("We had ___ lunch.", "We had ___ lunch.")], answer: 0, explain: B("So sánh nhất cần 'the'; môn học & bữa ăn zero.", "Superlatives need 'the'; subjects & meals take zero.") },
      { q: B("'go to school' khác 'go to the school' thế nào?", "How does 'go to school' differ from 'go to the school'?"), options: [B("Giống nhau", "They're the same"), B("'go to school' = đi học; 'the school' = tới toà nhà cụ thể", "'go to school' = attend; 'the school' = the specific building")], answer: 1, explain: B("Nghĩa mục đích dùng zero.", "Purpose meaning takes zero article.") },
    ],
  },
  {
    id: "countable-agreement",
    title: B("Đếm được/không đếm được & hoà hợp chủ–vị", "Countable/uncountable & subject–verb agreement"),
    band: "b6",
    intro: B("Hai lỗi kéo điểm Grammar nhiều nhất với người Việt: thêm 's' vào danh từ không đếm được, và chia sai động từ theo chủ ngữ.", "Two of the biggest grammar-score killers for Vietnamese learners: adding 's' to uncountable nouns, and mismatching the verb with its subject."),
    points: [
      { rule: B("Danh từ KHÔNG đếm được: không 's', không 'a/an'", "Uncountable nouns: no 's', no 'a/an'"), examples: [
        g("bad", "<s>informations, advices, researches, equipments, knowledges</s>", "<s>informations, advices, researches, equipments, knowledges</s>"),
        g("good", "<span class='hi'>information, advice, research, equipment, knowledge, furniture, luggage</span> (luôn số ít)", "<span class='hi'>information, advice, research, equipment, knowledge, furniture, luggage</span> (always singular)"),
      ] },
      { rule: B("Muốn đếm → mượn cụm định lượng", "To count them → use a unit phrase"), examples: [
        g("good", "a <span class='hi'>piece of</span> advice, two <span class='hi'>pieces of</span> information, an <span class='hi'>item of</span> furniture", "a <span class='hi'>piece of</span> advice, two <span class='hi'>pieces of</span> information, an <span class='hi'>item of</span> furniture"),
      ] },
      { rule: B("Định lượng đúng: much/little (không đếm được) vs many/few (đếm được); amount vs number", "Right quantifiers: much/little (uncountable) vs many/few (countable); amount vs number"), examples: [
        g("good", "<span class='hi'>much</span> information, <span class='hi'>little</span> progress · <span class='hi'>many</span> people, <span class='hi'>few</span> options", "<span class='hi'>much</span> information, <span class='hi'>little</span> progress · <span class='hi'>many</span> people, <span class='hi'>few</span> options"),
        g("good", "the <span class='hi'>amount of</span> water · the <span class='hi'>number of</span> students", "the <span class='hi'>amount of</span> water · the <span class='hi'>number of</span> students"),
      ] },
      { rule: B("Hoà hợp chủ–vị với chủ ngữ thật, không phải danh từ gần nhất", "Agree with the real subject, not the nearest noun"), examples: [
        g("bad", "The number of students <s>are</s> rising.", "The number of students <s>are</s> rising."),
        g("good", "The number of students <span class='hi'>is</span> rising. · A number of students <span class='hi'>are</span> absent.", "The number of students <span class='hi'>is</span> rising. · A number of students <span class='hi'>are</span> absent."),
      ] },
      { rule: B("each/every/either + danh từ số ít + động từ số ít", "each/every/either + singular noun + singular verb"), examples: [
        g("good", "<span class='hi'>Every</span> student <span class='hi'>has</span> a laptop. · <span class='hi'>Each</span> of the options <span class='hi'>is</span> valid.", "<span class='hi'>Every</span> student <span class='hi'>has</span> a laptop. · <span class='hi'>Each</span> of the options <span class='hi'>is</span> valid."),
      ] },
    ],
    vietMistake: B("Lỗi kinh điển: <i>many informations</i>, <i>a research</i>, và lẫn <b>'The number of … is'</b> (số ít) với <b>'A number of … are'</b> (số nhiều).", "Classic errors: <i>many informations</i>, <i>a research</i>, and confusing <b>'The number of … is'</b> (singular) with <b>'A number of … are'</b> (plural)."),
    quiz: [
      { q: B("Câu nào đúng?", "Which is correct?"), options: [B("She gave me many useful informations.", "She gave me many useful informations."), B("She gave me a lot of useful information.", "She gave me a lot of useful information."), B("She gave me an useful information.", "She gave me an useful information.")], answer: 1, explain: B("'information' không đếm được → không 's', không 'a'.", "'information' is uncountable → no 's', no 'a'.") },
      { q: B("'The number of applicants ___ increased.'", "'The number of applicants ___ increased.'"), options: ["have", "has", "are"], answer: 1, explain: B("'The number of…' số ít → has. (A number of… → have.)", "'The number of…' is singular → has. (A number of… → have.)") },
      { q: B("Cụm đúng để đếm 'advice':", "Correct way to count 'advice':"), options: [B("three advices", "three advices"), B("three pieces of advice", "three pieces of advice"), B("three advice", "three advice")], answer: 1, explain: B("Không đếm được → mượn 'pieces of'.", "Uncountable → borrow 'pieces of'.") },
      { q: B("Chọn định lượng đúng: '___ research has been done.'", "Choose the quantifier: '___ research has been done.'"), options: [B("Many", "Many"), B("Much", "Much"), B("A number of", "A number of")], answer: 1, explain: B("'research' không đếm được → much.", "'research' is uncountable → much.") },
      { q: B("'Every student ___ a unique ID.'", "'Every student ___ a unique ID.'"), options: ["have", "has"], answer: 1, explain: B("every + số ít → has.", "every + singular → has.") },
    ],
  },
  {
    id: "tenses",
    title: B("Thì & thể (tenses & aspect)", "Tenses & aspect"),
    band: "b7",
    intro: B("Chỗ hay sai: present perfect vs past simple, và dùng present perfect continuous cho xu hướng kéo dài. Văn học thuật chủ yếu dùng present simple cho nhận định chung.", "Common trouble: present perfect vs past simple, and present perfect continuous for ongoing trends. Academic writing mostly uses present simple for general claims."),
    points: [
      { rule: B("Present simple — sự thật chung, nhận định (xương sống của essay)", "Present simple — general truths & claims (the backbone of essays)"), examples: [
        g("good", "Pollution <span class='hi'>harms</span> public health. Governments <span class='hi'>play</span> a key role.", "Pollution <span class='hi'>harms</span> public health. Governments <span class='hi'>play</span> a key role."),
      ] },
      { rule: B("Present perfect — nối quá khứ với hiện tại, KHÔNG mốc thời gian cụ thể", "Present perfect — links past to now, NO specific past time"), examples: [
        g("good", "Air quality <span class='hi'>has deteriorated</span> over the past decade.", "Air quality <span class='hi'>has deteriorated</span> over the past decade."),
        g("bad", "Air quality <s>has deteriorated</s> last year.", "Air quality <s>has deteriorated</s> last year."),
      ] },
      { rule: B("Past simple — đã xong, có mốc rõ (ago, in 2019, yesterday)", "Past simple — finished, with a clear time (ago, in 2019, yesterday)"), examples: [
        g("good", "The law <span class='hi'>was passed</span> in 2019.", "The law <span class='hi'>was passed</span> in 2019."),
      ] },
      { rule: B("since vs for: since + mốc, for + khoảng", "since vs for: since + point, for + duration"), examples: [
        g("good", "<span class='hi'>since</span> 2020, <span class='hi'>for</span> three years", "<span class='hi'>since</span> 2020, <span class='hi'>for</span> three years"),
      ] },
      { rule: B("Present perfect continuous — xu hướng kéo dài đến hiện tại", "Present perfect continuous — an ongoing trend up to now"), examples: [
        g("good", "Cities <span class='hi'>have been expanding</span> rapidly, straining infrastructure.", "Cities <span class='hi'>have been expanding</span> rapidly, straining infrastructure."),
      ] },
    ],
    vietMistake: B("Sai kinh điển: <b>present perfect với mốc quá khứ rõ</b> (<i>has deteriorated last year</i>) — có 'last year', '2019', 'ago' thì phải past simple.", "Classic error: <b>present perfect with a clear past time</b> (<i>has deteriorated last year</i>) — with 'last year', '2019', 'ago', use past simple."),
    quiz: [
      { q: B("Chọn câu đúng:", "Choose the correct sentence:"), options: [B("The population has grown significantly since 2000.", "The population has grown significantly since 2000."), B("The population has grown significantly in 2000.", "The population has grown significantly in 2000."), B("The population grew significantly since 2000.", "The population grew significantly since 2000.")], answer: 0, explain: B("'since 2000' = đến nay → present perfect.", "'since 2000' = up to now → present perfect.") },
      { q: B("Điền: 'The factory ___ in 1995.'", "Fill: 'The factory ___ in 1995.'"), options: [B("has opened", "has opened"), B("opened", "opened"), B("has been opening", "has been opening")], answer: 1, explain: B("Mốc rõ 1995 → past simple.", "Clear time 1995 → past simple.") },
      { q: B("Xu hướng kéo dài đến hiện tại dùng:", "An ongoing trend up to now uses:"), options: [B("past simple", "past simple"), B("present perfect continuous", "present perfect continuous")], answer: 1, explain: B("'have been + V-ing' cho hành động kéo dài.", "'have been + V-ing' for continuing actions.") },
      { q: B("Nhận định chung trong essay nên dùng:", "General claims in essays should use:"), options: [B("present simple", "present simple"), B("present continuous", "present continuous")], answer: 0, explain: B("Sự thật chung → present simple.", "General truths → present simple.") },
      { q: B("'for' đi với:", "'for' goes with:"), options: [B("một mốc thời gian", "a point in time"), B("một khoảng thời gian", "a duration")], answer: 1, explain: B("for + khoảng (for ten years); since + mốc.", "for + duration (for ten years); since + point.") },
    ],
  },
  {
    id: "prepositions",
    title: B("Giới từ hay sai", "Prepositions (common errors)"),
    band: "b6",
    intro: B("Giới từ đi theo từ chứ không theo logic dịch. Đây là lỗi rải rác khắp bài của người Việt — học theo cụm cố định.", "Prepositions follow the word, not a translation logic. They are scattered errors for Vietnamese learners — learn them as fixed phrases."),
    points: [
      { rule: B("Thời gian: in (tháng/năm/buổi) · on (ngày/thứ) · at (giờ/đêm)", "Time: in (months/years/parts of day) · on (days/dates) · at (clock time/night)"), examples: [
        g("good", "<span class='hi'>in</span> July, <span class='hi'>in</span> 2020 · <span class='hi'>on</span> Monday, <span class='hi'>on</span> 5 May · <span class='hi'>at</span> 7 p.m., <span class='hi'>at</span> night", "<span class='hi'>in</span> July, <span class='hi'>in</span> 2020 · <span class='hi'>on</span> Monday, <span class='hi'>on</span> 5 May · <span class='hi'>at</span> 7 p.m., <span class='hi'>at</span> night"),
      ] },
      { rule: B("Nơi chốn: in (không gian) · on (bề mặt) · at (điểm)", "Place: in (enclosed) · on (surface) · at (point)"), examples: [
        g("good", "<span class='hi'>in</span> a room, <span class='hi'>on</span> the wall, <span class='hi'>at</span> the station", "<span class='hi'>in</span> a room, <span class='hi'>on</span> the wall, <span class='hi'>at</span> the station"),
      ] },
      { rule: B("Giới từ cố định theo động/tính từ — học cả cụm", "Dependent prepositions — learn the whole phrase"), examples: [
        g("good", "depend <span class='hi'>on</span>, result <span class='hi'>in</span>, consist <span class='hi'>of</span>, responsible <span class='hi'>for</span>, aware <span class='hi'>of</span>, good <span class='hi'>at</span>, interested <span class='hi'>in</span>", "depend <span class='hi'>on</span>, result <span class='hi'>in</span>, consist <span class='hi'>of</span>, responsible <span class='hi'>for</span>, aware <span class='hi'>of</span>, good <span class='hi'>at</span>, interested <span class='hi'>in</span>"),
      ] },
      { rule: B("Động từ KHÔNG cần giới từ (hay bị thêm thừa)", "Verbs that take NO preposition (often over-added)"), examples: [
        g("bad", "discuss <s>about</s>, emphasise <s>on</s>, marry <s>with</s>", "discuss <s>about</s>, emphasise <s>on</s>, marry <s>with</s>"),
        g("good", "discuss the issue · emphasise the point · marry someone · arrive <span class='hi'>at/in</span>", "discuss the issue · emphasise the point · marry someone · arrive <span class='hi'>at/in</span>"),
      ] },
    ],
    vietMistake: B("Điển hình: <i>discuss about</i>, <i>depend of</i>, <i>in Monday</i>. Học giới từ <b>cùng với từ</b>, đừng suy đoán theo nghĩa.", "Typical: <i>discuss about</i>, <i>depend of</i>, <i>in Monday</i>. Learn prepositions <b>with the word</b>, don't guess by meaning."),
    quiz: [
      { q: B("Câu nào đúng?", "Which is correct?"), options: [B("We discussed about the problem.", "We discussed about the problem."), B("We discussed the problem.", "We discussed the problem."), B("We discussed on the problem.", "We discussed on the problem.")], answer: 1, explain: B("'discuss' không cần giới từ.", "'discuss' needs no preposition.") },
      { q: B("'The outcome depends ___ several factors.'", "'The outcome depends ___ several factors.'"), options: ["of", "on", "to"], answer: 1, explain: B("Cụm cố định 'depend on'.", "Fixed phrase 'depend on'.") },
      { q: B("Giới từ thời gian: '___ Monday morning'", "Time preposition: '___ Monday morning'"), options: ["in", "on", "at"], answer: 1, explain: B("Ngày/thứ dùng 'on'.", "Days take 'on'.") },
      { q: B("'She is responsible ___ the budget.'", "'She is responsible ___ the budget.'"), options: ["of", "for", "to"], answer: 1, explain: B("'responsible for'.", "'responsible for'.") },
      { q: B("'They arrived ___ the airport.'", "'They arrived ___ the airport.'"), options: ["to", "at", "in"], answer: 1, explain: B("arrive at (địa điểm cụ thể) / arrive in (thành phố, nước).", "arrive at (specific place) / arrive in (city, country).") },
    ],
  },
  // ================= CÂU & MỆNH ĐỀ =================
  {
    id: "complex-sentences",
    title: B("Câu phức & liên từ phụ thuộc", "Complex sentences & subordinators"),
    band: "b7",
    intro: B("Band 7 cần đa dạng cấu trúc câu. Biết kết hợp mệnh đề chính–phụ giúp câu trôi và 'học thuật' hơn.", "Band 7 needs a range of sentence structures. Combining main and subordinate clauses makes writing flow and sound more academic."),
    points: [
      { rule: B("Liên từ phụ thuộc tạo mệnh đề phụ: although, while, whereas, because, since, when, if", "Subordinators create dependent clauses: although, while, whereas, because, since, when, if"), examples: [
        g("good", "<span class='hi'>Although</span> the policy was costly, it reduced emissions.", "<span class='hi'>Although</span> the policy was costly, it reduced emissions."),
      ] },
      { rule: B("'despite/in spite of' + DANH TỪ (hoặc V-ing) ≠ 'although' + MỆNH ĐỀ", "'despite/in spite of' + NOUN (or V-ing) ≠ 'although' + CLAUSE"), examples: [
        g("bad", "<s>Despite the cost was high</s>, it worked.", "<s>Despite the cost was high</s>, it worked."),
        g("good", "<span class='hi'>Despite the high cost</span>, it worked. / <span class='hi'>Although the cost was high</span>, it worked.", "<span class='hi'>Despite the high cost</span>, it worked. / <span class='hi'>Although the cost was high</span>, it worked."),
      ] },
      { rule: B("whereas/while để tương phản hai ý", "whereas/while to contrast two ideas"), examples: [
        g("good", "City wages are higher, <span class='hi'>whereas</span> living costs are also greater.", "City wages are higher, <span class='hi'>whereas</span> living costs are also greater."),
      ] },
      { rule: B("Dấu phẩy: mệnh đề phụ đứng TRƯỚC thì có phẩy; đứng SAU thường không", "Comma: subordinate clause FIRST → comma; LAST → usually none"), examples: [
        g("good", "Because it rained, we left. · We left because it rained.", "Because it rained, we left. · We left because it rained."),
      ] },
    ],
    vietMistake: B("Lỗi: ghép 'despite' với cả mệnh đề (<i>despite it was hard</i>). Sau 'despite/in spite of' phải là danh từ/V-ing.", "Error: pairing 'despite' with a full clause (<i>despite it was hard</i>). After 'despite/in spite of' use a noun/V-ing."),
    quiz: [
      { q: B("Câu nào đúng?", "Which is correct?"), options: [B("Despite the traffic was heavy, we arrived early.", "Despite the traffic was heavy, we arrived early."), B("Despite the heavy traffic, we arrived early.", "Despite the heavy traffic, we arrived early.")], answer: 1, explain: B("despite + danh từ.", "despite + noun.") },
      { q: B("Chọn từ tương phản: 'Wages rose, ___ prices stayed flat.'", "Choose the contrast word: 'Wages rose, ___ prices stayed flat.'"), options: ["because", "whereas", "so"], answer: 1, explain: B("whereas = tương phản.", "whereas = contrast.") },
      { q: B("'___ the report was detailed, it missed the deadline.'", "'___ the report was detailed, it missed the deadline.'"), options: ["Although", "Despite", "Because of"], answer: 0, explain: B("Although + mệnh đề.", "Although + clause.") },
      { q: B("Cần phẩy ở câu nào?", "Which needs a comma?"), options: [B("We stayed inside ___ it was raining.", "We stayed inside ___ it was raining."), B("Because it was raining ___ we stayed inside.", "Because it was raining ___ we stayed inside.")], answer: 1, explain: B("Mệnh đề phụ đứng trước → có phẩy.", "Subordinate clause first → comma.") },
    ],
  },
  {
    id: "relative-clauses",
    title: B("Mệnh đề quan hệ", "Relative clauses"),
    band: "b7",
    intro: B("Mệnh đề quan hệ giúp gộp ý, tránh câu cụt lủn. Phân biệt loại xác định (không phẩy) và không xác định (có phẩy).", "Relative clauses combine ideas and avoid choppy sentences. Distinguish defining (no commas) from non-defining (commas)."),
    points: [
      { rule: B("Xác định (defining) — thông tin cần thiết, KHÔNG phẩy; 'that' dùng được", "Defining — essential information, NO commas; 'that' is fine"), examples: [
        g("good", "The students <span class='hi'>who study abroad</span> often adapt quickly.", "The students <span class='hi'>who study abroad</span> often adapt quickly."),
      ] },
      { rule: B("Không xác định (non-defining) — thông tin thêm, CÓ phẩy; KHÔNG dùng 'that'", "Non-defining — extra information, WITH commas; NO 'that'"), examples: [
        g("good", "My manager, <span class='hi'>who joined last year</span>, is from Hanoi.", "My manager, <span class='hi'>who joined last year</span>, is from Hanoi."),
        g("bad", "My manager, <s>that</s> joined last year, …", "My manager, <s>that</s> joined last year, …"),
      ] },
      { rule: B("Chọn đại từ: who (người), which (vật), whose (sở hữu), where (nơi chốn)", "Choose the pronoun: who (people), which (things), whose (possession), where (places)"), examples: [
        g("good", "a company <span class='hi'>whose</span> profits soared · a town <span class='hi'>where</span> she grew up", "a company <span class='hi'>whose</span> profits soared · a town <span class='hi'>where</span> she grew up"),
      ] },
      { rule: B("Rút gọn mệnh đề quan hệ cho gọn (band 7+)", "Reduce relative clauses for concision (band 7+)"), examples: [
        g("good", "Students <span class='hi'>living</span> abroad… (= who live) · A report <span class='hi'>written</span> in 2020… (= which was written)", "Students <span class='hi'>living</span> abroad… (= who live) · A report <span class='hi'>written</span> in 2020… (= which was written)"),
      ] },
    ],
    vietMistake: B("Lỗi: dùng 'that' trong mệnh đề có phẩy, hoặc thêm phẩy cho mệnh đề xác định làm đổi nghĩa.", "Error: using 'that' in a comma clause, or adding commas to a defining clause and changing the meaning."),
    quiz: [
      { q: B("Câu nào đúng (non-defining)?", "Which is correct (non-defining)?"), options: [B("Paris, that is the capital, is busy.", "Paris, that is the capital, is busy."), B("Paris, which is the capital, is busy.", "Paris, which is the capital, is busy.")], answer: 1, explain: B("Mệnh đề có phẩy không dùng 'that'.", "Comma clauses don't use 'that'.") },
      { q: B("Điền: 'The author ___ book won the prize is young.'", "Fill: 'The author ___ book won the prize is young.'"), options: ["who", "whose", "which"], answer: 1, explain: B("Sở hữu → whose.", "Possession → whose.") },
      { q: B("Rút gọn 'a policy which was introduced in 2019':", "Reduce 'a policy which was introduced in 2019':"), options: [B("a policy introduced in 2019", "a policy introduced in 2019"), B("a policy introducing in 2019", "a policy introducing in 2019")], answer: 0, explain: B("Bị động → V3 (introduced).", "Passive → past participle (introduced).") },
      { q: B("Mệnh đề xác định có cần phẩy không?", "Do defining clauses need commas?"), options: [B("Có", "Yes"), B("Không", "No")], answer: 1, explain: B("Thông tin cần thiết → không phẩy.", "Essential info → no commas.") },
    ],
  },
  {
    id: "conditionals",
    title: B("Câu điều kiện", "Conditionals"),
    band: "b7",
    intro: B("Điều kiện giúp lập luận giả định — rất hợp phần giải pháp và Speaking Part 3. Nắm 4 loại + dạng trộn.", "Conditionals express hypotheticals — ideal for solutions and Speaking Part 3. Master the four types plus mixed forms."),
    points: [
      { rule: B("Loại 0 — sự thật chung: if + present, present", "Zero — general truth: if + present, present"), examples: [g("good", "If you heat ice, it <span class='hi'>melts</span>.", "If you heat ice, it <span class='hi'>melts</span>.")] },
      { rule: B("Loại 1 — tương lai có thật: if + present, will + V", "First — real future: if + present, will + V"), examples: [g("good", "If governments invest, congestion <span class='hi'>will</span> fall.", "If governments invest, congestion <span class='hi'>will</span> fall.")] },
      { rule: B("Loại 2 — giả định hiện tại/không có thật: if + past, would + V", "Second — present unreal: if + past, would + V"), examples: [g("good", "If I <span class='hi'>were</span> in charge, I would ban cars downtown.", "If I <span class='hi'>were</span> in charge, I would ban cars downtown.")] },
      { rule: B("Loại 3 — quá khứ không có thật: if + had + V3, would have + V3", "Third — past unreal: if + had + V3, would have + V3"), examples: [g("good", "If they <span class='hi'>had acted</span> sooner, the crisis would have been avoided.", "If they <span class='hi'>had acted</span> sooner, the crisis would have been avoided.")] },
      { rule: B("Biến thể: unless (= if not), provided that, as long as", "Variants: unless (= if not), provided that, as long as"), examples: [g("good", "<span class='hi'>Unless</span> action is taken, levels will rise.", "<span class='hi'>Unless</span> action is taken, levels will rise.")] },
    ],
    vietMistake: B("Lỗi: dùng 'will' ngay sau 'if' (<i>if it will rain</i>). Mệnh đề 'if' loại 1 dùng present, không 'will'.", "Error: using 'will' right after 'if' (<i>if it will rain</i>). The first-conditional 'if' clause uses present, not 'will'."),
    quiz: [
      { q: B("Loại 1 đúng:", "Correct first conditional:"), options: [B("If it will rain, we will cancel.", "If it will rain, we will cancel."), B("If it rains, we will cancel.", "If it rains, we will cancel.")], answer: 1, explain: B("Mệnh đề if dùng present.", "The if-clause uses present.") },
      { q: B("Giả định hiện tại không có thật dùng:", "Present unreal uses:"), options: [B("if + present, will", "if + present, will"), B("if + past, would", "if + past, would")], answer: 1, explain: B("Loại 2: if + past, would.", "Second: if + past, would.") },
      { q: B("'Unless' nghĩa là:", "'Unless' means:"), options: [B("if", "if"), B("if not", "if not"), B("because", "because")], answer: 1, explain: B("unless = if not.", "unless = if not.") },
      { q: B("Quá khứ không có thật:", "Past unreal:"), options: [B("If they had invested, it would have worked.", "If they had invested, it would have worked."), B("If they invested, it will work.", "If they invested, it will work.")], answer: 0, explain: B("Loại 3: had + V3, would have + V3.", "Third: had + V3, would have + V3.") },
    ],
  },
  {
    id: "passive",
    title: B("Câu bị động", "The passive voice"),
    band: "b7",
    intro: B("Bị động làm trọng tâm rơi vào hành động/kết quả, rất hợp văn học thuật và mô tả quy trình. Đừng lạm dụng.", "The passive shifts focus to the action/result — ideal for academic writing and process descriptions. Don't overuse it."),
    points: [
      { rule: B("Dạng: be + V3 (past participle)", "Form: be + V3 (past participle)"), examples: [g("good", "The data <span class='hi'>were collected</span> over a year. The clay <span class='hi'>is heated</span>.", "The data <span class='hi'>were collected</span> over a year. The clay <span class='hi'>is heated</span>.")] },
      { rule: B("Dùng khi tác nhân không quan trọng/không rõ, hoặc cần giọng khách quan", "Use when the agent is unimportant/unknown, or for an objective tone"), examples: [g("good", "Measures <span class='hi'>have been introduced</span> to curb pollution.", "Measures <span class='hi'>have been introduced</span> to curb pollution.")] },
      { rule: B("Nêu tác nhân bằng 'by' khi cần", "Name the agent with 'by' when needed"), examples: [g("good", "The policy was approved <span class='hi'>by</span> parliament.", "The policy was approved <span class='hi'>by</span> parliament.")] },
      { rule: B("Đừng bị động hoá mọi câu — xen chủ động cho tự nhiên", "Don't passivise everything — mix in active voice for naturalness"), examples: [g("bad", "It is believed by many people that it is thought that…", "It is believed by many people that it is thought that…")] },
    ],
    vietMistake: B("Lỗi: quên 'be' (<i>The law passed in 2019</i> khi muốn nói bị động → <i>was passed</i>), hoặc dùng sai V3.", "Error: dropping 'be' (<i>The law passed</i> when you mean passive → <i>was passed</i>), or wrong past participle."),
    quiz: [
      { q: B("Dạng bị động đúng:", "Correct passive form:"), options: [B("The bridge was build in 1990.", "The bridge was build in 1990."), B("The bridge was built in 1990.", "The bridge was built in 1990.")], answer: 1, explain: B("be + V3 (built).", "be + V3 (built).") },
      { q: B("Khi nào nên dùng bị động?", "When should you use the passive?"), options: [B("Khi tác nhân không quan trọng", "When the agent is unimportant"), B("Luôn luôn", "Always")], answer: 0, explain: B("Tác nhân không rõ/không quan trọng.", "Agent unknown/unimportant.") },
      { q: B("Đổi sang bị động: 'Researchers conducted a study.'", "Make passive: 'Researchers conducted a study.'"), options: [B("A study was conducted.", "A study was conducted."), B("A study is conducting.", "A study is conducting.")], answer: 0, explain: B("be + V3.", "be + V3.") },
    ],
  },
  {
    id: "punctuation",
    title: B("Dấu câu & lỗi nối câu", "Punctuation & sentence-joining errors"),
    band: "b7",
    intro: B("Comma splice (nối hai câu hoàn chỉnh bằng dấu phẩy) là lỗi rất phổ biến và làm tụt điểm dù ý đúng.", "The comma splice (joining two full sentences with just a comma) is very common and lowers your score even when the idea is right."),
    points: [
      { rule: B("KHÔNG nối hai mệnh đề độc lập chỉ bằng dấu phẩy", "Don't join two independent clauses with only a comma"), examples: [
        g("bad", "Pollution is rising, it harms health.", "Pollution is rising, it harms health."),
        g("good", "Pollution is rising<span class='hi'>, and</span> it harms health. / Pollution is rising<span class='hi'>;</span> it harms health.", "Pollution is rising<span class='hi'>, and</span> it harms health. / Pollution is rising<span class='hi'>;</span> it harms health."),
      ] },
      { rule: B("Cách sửa: liên từ, dấu chấm phẩy, hoặc tách câu", "Fixes: a conjunction, a semicolon, or splitting the sentence"), examples: [g("good", "Pollution is rising. <span class='hi'>This</span> harms health.", "Pollution is rising. <span class='hi'>This</span> harms health.")] },
      { rule: B("its (sở hữu) vs it's (= it is)", "its (possessive) vs it's (= it is)"), examples: [g("good", "The city improved <span class='hi'>its</span> transport. <span class='hi'>It's</span> a success.", "The city improved <span class='hi'>its</span> transport. <span class='hi'>It's</span> a success.")] },
      { rule: B("Dấu phẩy sau từ nối đầu câu (However, …)", "Comma after an opening linker (However, …)"), examples: [g("good", "<span class='hi'>However,</span> the costs are high.", "<span class='hi'>However,</span> the costs are high.")] },
    ],
    vietMistake: B("Comma splice và lẫn its/it's là hai lỗi 'ẩn' rất hay gặp. Hai câu hoàn chỉnh phải nối bằng liên từ, dấu chấm phẩy, hoặc tách ra.", "Comma splices and its/it's confusion are two very common hidden errors. Join two full sentences with a conjunction, a semicolon, or split them."),
    quiz: [
      { q: B("Câu nào KHÔNG mắc comma splice?", "Which avoids the comma splice?"), options: [B("The plan failed, it was costly.", "The plan failed, it was costly."), B("The plan failed because it was costly.", "The plan failed because it was costly.")], answer: 1, explain: B("Dùng liên từ 'because'.", "Use the conjunction 'because'.") },
      { q: B("Chọn đúng: '___ a remarkable result.'", "Choose: '___ a remarkable result.'"), options: ["Its", "It's"], answer: 1, explain: B("It's = it is.", "It's = it is.") },
      { q: B("'The company increased ___ revenue.'", "'The company increased ___ revenue.'"), options: ["its", "it's"], answer: 0, explain: B("Sở hữu → its.", "Possessive → its.") },
      { q: B("Cách sửa comma splice KHÔNG đúng:", "Which does NOT fix a comma splice?"), options: [B("thêm liên từ", "add a conjunction"), B("dùng dấu chấm phẩy", "use a semicolon"), B("giữ nguyên dấu phẩy", "keep the comma")], answer: 2, explain: B("Giữ phẩy là vẫn sai.", "Keeping the comma is still wrong.") },
    ],
  },
  // ================= MẠCH LẠC & HỌC THUẬT =================
  {
    id: "cohesion",
    title: B("Liên kết & mạch lạc (cohesion)", "Cohesion & coherence"),
    band: "b7",
    intro: B("Coherence & Cohesion chiếm 25% điểm. Band 7 liên kết tự nhiên bằng nhiều cách, không chỉ rải 'Moreover'.", "Coherence & Cohesion is 25% of the score. Band 7 links ideas naturally in varied ways, not by scattering 'Moreover'."),
    points: [
      { rule: B("Referencing — dùng đại từ thay vì lặp danh từ", "Referencing — use pronouns instead of repeating nouns"), examples: [
        g("bad", "The policy failed. The policy was poorly designed.", "The policy failed. The policy was poorly designed."),
        g("good", "The policy failed because <span class='hi'>it</span> was poorly designed.", "The policy failed because <span class='hi'>it</span> was poorly designed."),
      ] },
      { rule: B("'This/These/Such + danh từ' để nối ý mượt", "'This/These/Such + noun' to link smoothly"), examples: [g("good", "Many teens sleep poorly. <span class='hi'>This trend</span> harms their performance.", "Many teens sleep poorly. <span class='hi'>This trend</span> harms their performance.")] },
      { rule: B("Đa dạng từ nối, đặt đúng chỗ", "Vary linkers and place them well"), examples: [g("good", "<span class='hi'>As a result</span>, … · <span class='hi'>In contrast</span>, … · <span class='hi'>Consequently</span>, …", "<span class='hi'>As a result</span>, … · <span class='hi'>In contrast</span>, … · <span class='hi'>Consequently</span>, …")] },
    ],
    vietMistake: B("Band 7 KHÔNG thưởng cho số lượng từ nối. Mở mỗi câu bằng 'Moreover/Furthermore' nghe máy móc và bị trừ. Referencing (this/it/such) thường mượt hơn.", "Band 7 does NOT reward a quantity of linkers. Starting every sentence with 'Moreover/Furthermore' sounds mechanical and is penalised. Referencing (this/it/such) is usually smoother."),
    quiz: [
      { q: B("Cách liên kết tự nhiên nhất:", "The most natural way to link:"), options: [B("Lặp danh từ mỗi câu", "Repeat the noun each time"), B("Dùng it/this/such chỉ lại ý trước", "Use it/this/such to refer back"), B("Bắt đầu mọi câu bằng Moreover", "Start every sentence with Moreover")], answer: 1, explain: B("Referencing là cách nối 'band 7' nhất.", "Referencing is the most band-7 way to link.") },
      { q: B("Câu nào mạch lạc hơn?", "Which is more cohesive?"), options: [B("Pollution rises. Pollution harms health. Pollution costs money.", "Pollution rises. Pollution harms health. Pollution costs money."), B("Pollution is rising, and this not only harms health but also imposes costs.", "Pollution is rising, and this not only harms health but also imposes costs.")], answer: 1, explain: B("Gộp ý + 'this' + cấu trúc đa dạng.", "Combined ideas + 'this' + varied structure.") },
      { q: B("Lạm dụng từ nối thì:", "Overusing linkers:"), options: [B("tăng điểm", "raises the score"), B("có thể bị trừ", "can be penalised")], answer: 1, explain: B("Nhồi linking words bị trừ.", "Cramming linkers is penalised.") },
    ],
  },
  {
    id: "nominalisation",
    title: B("Danh từ hoá (nominalisation)", "Nominalisation"),
    band: "b7",
    intro: B("Biến động/tính từ thành danh từ làm câu cô đọng, khách quan, 'học thuật' — đặc trưng band 7+. Nhưng đừng lạm dụng tới mức khó đọc.", "Turning verbs/adjectives into nouns makes writing concise, objective and academic — a band-7+ feature. But don't overdo it to the point of opacity."),
    points: [
      { rule: B("Động từ → danh từ: decide→decision, pollute→pollution, reduce→reduction", "Verb → noun: decide→decision, pollute→pollution, reduce→reduction"), examples: [
        g("bad", "Because the government decided to act, things improved.", "Because the government decided to act, things improved."),
        g("good", "The government's <span class='hi'>decision</span> to act led to improvement.", "The government's <span class='hi'>decision</span> to act led to improvement."),
      ] },
      { rule: B("Tính từ → danh từ: able→ability, important→importance", "Adjective → noun: able→ability, important→importance"), examples: [g("good", "the <span class='hi'>importance</span> of education · the <span class='hi'>ability</span> to adapt", "the <span class='hi'>importance</span> of education · the <span class='hi'>ability</span> to adapt")] },
      { rule: B("Lợi ích: cô đọng & khách quan; Cảnh báo: nhồi quá thành khó hiểu", "Benefit: concise & objective; Caution: too much becomes hard to read"), examples: [g("bad", "The implementation of the reduction of the utilisation of cars…", "The implementation of the reduction of the utilisation of cars…")] },
    ],
    vietMistake: B("Người mới hay viết toàn câu động từ đơn giản. Thêm danh từ hoá ở những chỗ chính giúp 'học thuật' hơn — nhưng vừa phải.", "Beginners tend to write only simple verb sentences. Adding nominalisation at key points sounds more academic — but in moderation."),
    quiz: [
      { q: B("Bản danh từ hoá của 'They decided quickly':", "Nominalised form of 'They decided quickly':"), options: [B("Their quick decision", "Their quick decision"), B("They quickly decide", "They quickly decide")], answer: 0, explain: B("decide → decision.", "decide → decision.") },
      { q: B("Danh từ của 'important':", "Noun form of 'important':"), options: ["importantly", "importance"], answer: 1, explain: B("important → importance.", "important → importance.") },
      { q: B("Nominalisation quá mức thì:", "Excessive nominalisation:"), options: [B("luôn tốt", "is always good"), B("làm câu khó đọc", "makes writing hard to read")], answer: 1, explain: B("Vừa phải thôi.", "Use it in moderation.") },
    ],
  },
  {
    id: "modal-hedging",
    title: B("Giảm nhẹ khẳng định (hedging)", "Hedging (cautious language)"),
    band: "b7",
    intro: B("Văn học thuật tránh khẳng định tuyệt đối. Dùng modal và cụm giảm nhẹ để lập luận thận trọng, chừa đường lùi.", "Academic writing avoids absolute claims. Use modals and softeners to argue cautiously and leave room."),
    points: [
      { rule: B("Modal giảm độ chắc chắn: may, might, could, can", "Modals soften certainty: may, might, could, can"), examples: [
        g("bad", "Technology destroys jobs.", "Technology destroys jobs."),
        g("good", "Technology <span class='hi'>may</span> destroy <span class='hi'>some</span> jobs.", "Technology <span class='hi'>may</span> destroy <span class='hi'>some</span> jobs."),
      ] },
      { rule: B("Cụm hedging học thuật", "Academic hedging phrases"), examples: [g("good", "<span class='hi'>tend to</span>, <span class='hi'>it could be argued that</span>, <span class='hi'>arguably</span>, <span class='hi'>in many cases</span>", "<span class='hi'>tend to</span>, <span class='hi'>it could be argued that</span>, <span class='hi'>arguably</span>, <span class='hi'>in many cases</span>")] },
      { rule: B("Định lượng thận trọng: some, many, a tendency to", "Cautious quantifiers: some, many, a tendency to"), examples: [g("good", "<span class='hi'>Many</span> experts believe… (không 'All experts')", "<span class='hi'>Many</span> experts believe… (not 'All experts')")] },
    ],
    vietMistake: B("Khẳng định tuyệt đối (<i>X always causes Y</i>, <i>everyone agrees</i>) dễ bị bắt bẻ và nghe non. Giám khảo đánh giá cao lập luận chừng mực.", "Absolute claims (<i>X always causes Y</i>, <i>everyone agrees</i>) are easy to challenge and sound naive. Examiners reward measured argument."),
    quiz: [
      { q: B("Câu nào 'học thuật' và an toàn hơn?", "Which is more academic and safer?"), options: [B("Social media destroys real friendships.", "Social media destroys real friendships."), B("Social media can, in some cases, weaken real friendships.", "Social media can, in some cases, weaken real friendships.")], answer: 1, explain: B("'can' + 'in some cases' giảm nhẹ, khó bị phản bác.", "'can' + 'in some cases' hedges and is hard to refute.") },
      { q: B("Cụm nào là hedging?", "Which is a hedging phrase?"), options: [B("it could be argued that", "it could be argued that"), B("everyone knows that", "everyone knows that")], answer: 0, explain: B("'it could be argued' là giảm nhẹ.", "'it could be argued' is a softener.") },
      { q: B("Nên tránh từ nào?", "Which should you avoid?"), options: [B("tend to", "tend to"), B("always / never (tuyệt đối)", "always / never (absolutes)")], answer: 1, explain: B("Tránh tuyệt đối hoá.", "Avoid absolutes.") },
    ],
  },
  // ================= NÂNG CAO =================
  {
    id: "inversion-cleft",
    title: B("Đảo ngữ & câu chẻ", "Inversion & cleft sentences"),
    band: "b8",
    intro: B("Đảo ngữ và câu chẻ là điểm nhấn band 8 — gây ấn tượng nếu dùng đúng và tiết chế. Lạm dụng sẽ phản tác dụng.", "Inversion and cleft sentences are band-8 flourishes — impressive if used correctly and sparingly. Overuse backfires."),
    points: [
      { rule: B("Đảo ngữ sau trạng từ phủ định đầu câu: Not only…, Never…, Rarely…, Only then…", "Inversion after a fronted negative adverbial: Not only…, Never…, Rarely…, Only then…"), examples: [
        g("good", "<span class='hi'>Not only does</span> it cut costs, but it also improves safety.", "<span class='hi'>Not only does</span> it cut costs, but it also improves safety."),
        g("good", "<span class='hi'>Rarely has</span> a single policy had such an impact.", "<span class='hi'>Rarely has</span> a single policy had such an impact."),
      ] },
      { rule: B("Câu chẻ với 'It is/was … that' để nhấn mạnh", "Cleft with 'It is/was … that' for emphasis"), examples: [g("good", "<span class='hi'>It is</span> education <span class='hi'>that</span> drives long-term growth.", "<span class='hi'>It is</span> education <span class='hi'>that</span> drives long-term growth.")] },
      { rule: B("Câu chẻ với 'What … is' để nhấn ý", "Cleft with 'What … is' for emphasis"), examples: [g("good", "<span class='hi'>What</span> the city needs <span class='hi'>is</span> better transport.", "<span class='hi'>What</span> the city needs <span class='hi'>is</span> better transport.")] },
    ],
    vietMistake: B("Lỗi: quên đảo trợ động từ sau 'Not only' (<i>Not only it cuts…</i> → <i>Not only does it cut…</i>). Và đừng dùng đảo ngữ ở mọi câu.", "Error: forgetting to invert the auxiliary after 'Not only' (<i>Not only it cuts…</i> → <i>Not only does it cut…</i>). And don't use inversion in every sentence."),
    quiz: [
      { q: B("Đảo ngữ đúng:", "Correct inversion:"), options: [B("Not only it reduces cost, but also time.", "Not only it reduces cost, but also time."), B("Not only does it reduce cost, but also time.", "Not only does it reduce cost, but also time.")], answer: 1, explain: B("Sau 'Not only' phải đảo trợ động từ: does it reduce.", "After 'Not only' invert the auxiliary: does it reduce.") },
      { q: B("Câu chẻ nhấn 'education':", "Cleft emphasising 'education':"), options: [B("It is education that drives growth.", "It is education that drives growth."), B("Education is drives growth.", "Education is drives growth.")], answer: 0, explain: B("It is … that …", "It is … that …") },
      { q: B("'What the city needs ___ better transport.'", "'What the city needs ___ better transport.'"), options: ["are", "is"], answer: 1, explain: B("'What…' là chủ ngữ số ít → is.", "'What…' is a singular subject → is.") },
      { q: B("Nên dùng đảo ngữ:", "Inversion should be used:"), options: [B("ở mọi câu", "in every sentence"), B("tiết chế, làm điểm nhấn", "sparingly, as a flourish")], answer: 1, explain: B("Lạm dụng phản tác dụng.", "Overuse backfires.") },
    ],
  },
];

// Nhóm phân loại — Nền tảng lên đầu.
export const GRAMMAR_CATEGORIES: { name: string; note?: string; ids: string[] }[] = [
  { name: "Nền tảng", note: "Bắt đầu từ đây — sửa lỗi gốc trước", ids: ["articles", "countable-agreement", "tenses", "prepositions"] },
  { name: "Câu & mệnh đề", note: "Dựng câu phức, đa dạng cấu trúc", ids: ["complex-sentences", "relative-clauses", "conditionals", "passive", "punctuation"] },
  { name: "Mạch lạc & học thuật", note: "Chất văn band 7+", ids: ["cohesion", "nominalisation", "modal-hedging"] },
  { name: "Nâng cao (band 8)", note: "Điểm nhấn ấn tượng", ids: ["inversion-cleft"] },
];
