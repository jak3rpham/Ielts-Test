// src/data/grammar.ts
import { GrammarLesson } from "./types";

export const GRAMMAR: GrammarLesson[] = [
  {
    id: "complex-sentences",
    title: "Câu phức & mệnh đề phụ thuộc",
    band: "b7",
    intro:
      "Band 6 viết toàn câu đơn nối bằng 'and / but / so'. Band 7 dùng mệnh đề phụ thuộc để xếp ý theo tầng quan trọng.",
    points: [
      {
        rule: "Dùng liên từ phụ thuộc để gắn ý phụ vào ý chính",
        examples: [
          { kind: "bad", html: "Pollution is a problem. The government should act." },
          { kind: "good", html: "Because pollution has become a pressing problem, the government should intervene." },
        ],
      },
      {
        rule: "Đặt mệnh đề phụ ở đầu để nhấn mạnh (nhớ dấu phẩy)",
        examples: [
          { kind: "good", html: "Although remote work boosts flexibility, it can erode team cohesion." },
        ],
      },
    ],
    vietMistake:
      "Người Việt hay quên: <b>although / because</b> đứng đầu thì giữa hai vế phải có dấu phẩy, và <b>không</b> dùng kèm 'but / so' (sai: <i>Although it rained, but we went out</i>).",
    quiz: [
      {
        q: "Câu nào ở trình độ band 7+?",
        options: [
          "Many people drive cars and this causes pollution and it is bad.",
          "Since private car use continues to rise, urban air quality has deteriorated markedly.",
          "Cars are bad. They make pollution. Government must act.",
        ],
        answer: 1,
        explain: "Đáp án dùng mệnh đề phụ ('Since…') để xếp quan hệ nhân–quả, thay vì nối câu đơn bằng 'and'.",
      },
      {
        q: "Lỗi trong: 'Although the policy was costly, but it succeeded.'",
        options: ["Thiếu dấu phẩy", "Dùng thừa 'but' sau mệnh đề 'although'", "Sai thì động từ"],
        answer: 1,
        explain: "'Although' đã làm nhiệm vụ nối tương phản, nên không dùng thêm 'but'. Bỏ 'but' là đúng.",
      },
    ],
  },
  {
    id: "relative-clauses",
    title: "Mệnh đề quan hệ (relative clauses)",
    band: "b7",
    intro:
      "Công cụ gộp hai câu thành một, vừa tăng độ phức tạp vừa tránh lặp. Phân biệt loại xác định và không xác định.",
    points: [
      {
        rule: "Defining — bổ nghĩa thiết yếu, KHÔNG dấu phẩy",
        examples: [{ kind: "good", html: "Students <span class='hi'>who study consistently</span> tend to outperform their peers." }],
      },
      {
        rule: "Non-defining — thông tin thêm, CÓ dấu phẩy, không dùng 'that'",
        examples: [
          { kind: "good", html: "Online learning, <span class='hi'>which exploded during the pandemic</span>, is now mainstream." },
          { kind: "bad", html: "Online learning, that exploded during the pandemic, is now mainstream." },
        ],
      },
      {
        rule: "Rút gọn bằng V-ing / V-ed để gọn câu (band 8)",
        examples: [{ kind: "good", html: "Policies <span class='hi'>aimed at</span> reducing emissions often face resistance." }],
      },
    ],
    vietMistake:
      "Hai lỗi kinh điển: dùng <b>'that'</b> trong mệnh đề có dấu phẩy (sai), và dùng <b>'which'</b> để chỉ người (phải dùng 'who').",
    quiz: [
      {
        q: "Chọn câu đúng:",
        options: ["My teacher, that lives nearby, helped me.", "My teacher, who lives nearby, helped me.", "My teacher who lives nearby, helped me."],
        answer: 1,
        explain: "Thông tin thêm về 'my teacher' → non-defining → dùng 'who' + đủ hai dấu phẩy.",
      },
      {
        q: "Dạng rút gọn đúng của 'a report which was written by experts':",
        options: ["a report writing by experts", "a report written by experts", "a report wrote by experts"],
        answer: 1,
        explain: "Bị động → rút thành quá khứ phân từ 'written'. Đây là cấu trúc band 8 rất gọn.",
      },
    ],
  },
  {
    id: "conditionals",
    title: "Câu điều kiện (conditionals)",
    band: "b7",
    intro: "Band 7+ không chỉ dùng if-câu thường mà còn dùng điều kiện loại 2, 3 và hỗn hợp để diễn đạt giả định.",
    points: [
      { rule: "Loại 2 — giả định hiện tại không có thật: if + past, would + V", examples: [{ kind: "good", html: "If governments invested more in rail, congestion <span class='hi'>would fall</span>." }] },
      { rule: "Loại 3 — giả định quá khứ: if + had + V3, would have + V3", examples: [{ kind: "good", html: "Had the warning been heeded, the disaster <span class='hi'>could have been averted</span>." }] },
      { rule: "Hỗn hợp — quá khứ ảnh hưởng hiện tại", examples: [{ kind: "good", html: "If she had taken the job, she would be living abroad now." }] },
    ],
    vietMistake: "Lỗi phổ biến: dùng <b>'would'</b> trong vế 'if' (sai: <i>If I would have time…</i>). 'would' chỉ đứng ở vế chính.",
    quiz: [
      { q: "Điền: 'If the company ___ its prices, sales would increase.'", options: ["will lower", "lowered", "would lower"], answer: 1, explain: "Điều kiện loại 2 (giả định) → vế if dùng quá khứ 'lowered', vế chính dùng 'would'." },
      { q: "Câu loại 3 đúng:", options: ["If they had acted sooner, they would have saved the forest.", "If they acted sooner, they would have saved the forest.", "If they would have acted sooner, they saved the forest."], answer: 0, explain: "Loại 3: if + had + V3 / would have + V3. Không dùng 'would' trong vế if." },
    ],
  },
  {
    id: "passive",
    title: "Bị động & khi nào dùng",
    band: "b7",
    intro: "Văn học thuật chuộng bị động khi chủ thể không quan trọng hoặc muốn nhấn vào kết quả/quá trình.",
    points: [
      { rule: "Nhấn vào hành động, ẩn chủ thể chung chung", examples: [{ kind: "good", html: "Considerable funding <span class='hi'>has been allocated</span> to renewable energy." }] },
      { rule: "Bị động + 'it is said/believed/argued' cho khách quan", examples: [{ kind: "good", html: "It is widely believed that early intervention yields the best outcomes." }] },
    ],
    vietMistake: "Đừng lạm dụng. Bị động <b>quá nhiều</b> làm câu nặng nề. Band 7 là biết <i>khi nào</i> dùng, không phải dùng càng nhiều càng tốt.",
    quiz: [
      { q: "Trong câu nào bị động là lựa chọn TỐT?", options: ["The dog was chased by the cat. (kể chuyện đời thường)", "Strict regulations were introduced to curb emissions. (văn học thuật)", "I was given a gift by my friend yesterday."], answer: 1, explain: "Bị động hợp lý khi chủ thể (ai ban hành) không quan trọng bằng hành động — đúng chất văn academic." },
    ],
  },
  {
    id: "articles",
    title: "Mạo từ a / an / the / zero",
    band: "b6",
    intro: "Tiếng Việt không có mạo từ, nên đây là nguồn lỗi số 1 kéo điểm Grammar. Sửa được mục này là tăng tỷ lệ câu không lỗi đáng kể.",
    points: [
      { rule: "'a/an' — lần đầu nhắc, đếm được, số ít", examples: [{ kind: "good", html: "She adopted <span class='hi'>a</span> dog. <span class='hi'>The</span> dog is now five." }] },
      { rule: "'the' — đã xác định, là duy nhất, hoặc cả hai bên đều biết", examples: [{ kind: "good", html: "<span class='hi'>The</span> sun, <span class='hi'>the</span> government, <span class='hi'>the</span> environment" }] },
      { rule: "Zero article — danh từ không đếm được / số nhiều mang nghĩa chung chung", examples: [{ kind: "good", html: "<span class='hi'>Education</span> shapes society. <span class='hi'>Smartphones</span> have changed communication." }] },
    ],
    vietMistake: "Lỗi điển hình: <i>Society depends on the technology</i> (thừa 'the' vì 'technology' ở đây mang nghĩa chung) → bỏ 'the'. Và <i>I have car</i> → thiếu 'a'.",
    quiz: [
      { q: "Điền: '___ unemployment remains ___ serious problem in many regions.'", options: ["The / a", "Ø (không) / a", "The / the"], answer: 1, explain: "'unemployment' chung chung, không đếm được → zero article; 'a serious problem' lần đầu nhắc, đếm được số ít → 'a'." },
      { q: "Câu nào đúng mạo từ?", options: ["Internet has transformed the business.", "The internet has transformed business.", "Internet has transformed business."], answer: 1, explain: "'the internet' (vật duy nhất, ai cũng biết) + 'business' nghĩa chung chung → zero article." },
    ],
  },
  {
    id: "tenses",
    title: "Thì & thể (tenses & aspect)",
    band: "b7",
    intro: "Hai chỗ hay sai: present perfect vs past simple, và dùng present perfect continuous để nói về xu hướng kéo dài.",
    points: [
      { rule: "Present perfect — nối quá khứ với hiện tại, không nêu mốc thời gian cụ thể", examples: [{ kind: "good", html: "Air quality <span class='hi'>has deteriorated</span> over the past decade." }, { kind: "bad", html: "Air quality has deteriorated last year." }] },
      { rule: "Past simple — hành động đã xong, có mốc rõ", examples: [{ kind: "good", html: "The law <span class='hi'>was passed</span> in 2019." }] },
      { rule: "Present perfect continuous — xu hướng kéo dài đến hiện tại", examples: [{ kind: "good", html: "Cities <span class='hi'>have been expanding</span> rapidly, straining infrastructure." }] },
    ],
    vietMistake: "Sai kinh điển: dùng <b>present perfect với mốc quá khứ rõ</b> (<i>has deteriorated last year</i>) — có 'last year', '2019', 'yesterday' thì phải past simple.",
    quiz: [
      { q: "Chọn câu đúng:", options: ["The population has grown significantly since 2000.", "The population has grown significantly in 2000.", "The population grew significantly since 2000."], answer: 0, explain: "'since 2000' = từ quá khứ đến nay → present perfect. 'in 2000' (mốc rõ, đã xong) thì dùng past simple." },
    ],
  },
  {
    id: "nominalisation",
    title: "Danh từ hóa (nominalisation)",
    band: "b7",
    intro: "Đặc trưng văn academic band 7+: biến động từ/tính từ thành danh từ để câu súc tích, khách quan hơn.",
    points: [
      { rule: "Động từ → danh từ làm chủ ngữ", examples: [{ kind: "bad", html: "They reduced costs and this improved profits." }, { kind: "good", html: "<span class='hi'>The reduction</span> in costs led to <span class='hi'>an improvement</span> in profits." }] },
      { rule: "Giúp mở đầu câu khách quan, đậm chất học thuật", examples: [{ kind: "good", html: "<span class='hi'>The implementation</span> of stricter laws has proven effective." }] },
    ],
    vietMistake: "Đừng nhầm nominalisation với viết dài dòng. Mục tiêu là <b>súc tích + khách quan</b>, không phải nhồi đuôi '-tion' khắp nơi.",
    quiz: [
      { q: "Bản nominalised của 'When they introduced the policy, traffic decreased':", options: ["The introduction of the policy led to a decrease in traffic.", "They introduce policy so traffic is decreased.", "Introducing they policy, traffic decrease."], answer: 0, explain: "'introduce'→'the introduction', 'decreased'→'a decrease': câu gọn, khách quan, đúng chuẩn academic." },
    ],
  },
  {
    id: "inversion-cleft",
    title: "Cấu trúc nhấn mạnh: đảo ngữ & cleft",
    band: "b8",
    intro: "Vũ khí band 8: đảo ngữ (inversion) và câu chẻ (cleft) tạo nhấn mạnh tinh tế. Dùng đúng 1–2 lần là đủ ấn tượng.",
    points: [
      { rule: "Đảo ngữ với trạng từ phủ định ở đầu câu", examples: [{ kind: "good", html: "<span class='hi'>Not only</span> does exercise improve health, <span class='hi'>but it also</span> boosts mood." }, { kind: "good", html: "<span class='hi'>Rarely</span> has a single technology reshaped society so quickly." }] },
      { rule: "Câu chẻ (cleft) để nhấn thành phần", examples: [{ kind: "good", html: "<span class='hi'>It is</span> education, not wealth, <span class='hi'>that</span> drives long-term mobility." }, { kind: "good", html: "<span class='hi'>What</span> matters most <span class='hi'>is</span> consistent practice." }] },
    ],
    vietMistake: "Đảo ngữ đòi hỏi <b>mượn trợ động từ</b> như câu hỏi: <i>Not only it improves…</i> sai → <i>Not only <b>does it</b> improve…</i>.",
    quiz: [
      { q: "Đảo ngữ đúng:", options: ["Never before people have had such access to information.", "Never before have people had such access to information.", "Never before people had such access."], answer: 1, explain: "Sau cụm phủ định đầu câu ('Never before') phải đảo trợ động từ lên trước chủ ngữ: 'have people had'." },
      { q: "Câu chẻ nhấn mạnh 'practice':", options: ["What you need is practice.", "You need practice only.", "Practice is what need you."], answer: 0, explain: "'What you need is…' là cấu trúc cleft chuẩn để nhấn vào 'practice'." },
    ],
  },
  {
    id: "cohesion",
    title: "Liên kết & mạch lạc (cohesion)",
    band: "b7",
    intro: "Coherence & Cohesion chiếm 25% điểm. Band 7 liên kết tự nhiên bằng nhiều cách, không chỉ rải 'Moreover' khắp nơi.",
    points: [
      { rule: "Referencing — dùng đại từ thay vì lặp danh từ", examples: [{ kind: "bad", html: "The policy failed. The policy was poorly designed." }, { kind: "good", html: "The policy failed because <span class='hi'>it</span> was poorly designed." }] },
      { rule: "'This/These/Such + danh từ' để nối ý mượt", examples: [{ kind: "good", html: "Many teenagers sleep poorly. <span class='hi'>This trend</span> harms their academic performance." }] },
      { rule: "Đa dạng từ nối, đặt đúng chỗ", examples: [{ kind: "good", html: "<span class='hi'>As a result</span>, …", }, { kind: "good", html: "<span class='hi'>In contrast</span>, …" }] },
    ],
    vietMistake: "Band 7 KHÔNG thưởng cho số lượng từ nối. Mở mỗi câu bằng một linking word ('Moreover… Furthermore… In addition…') nghe máy móc và còn bị trừ. Liên kết tốt nhất thường là <b>referencing</b> (this/it/such), không phải nhồi liên từ.",
    quiz: [
      { q: "Cách liên kết tự nhiên nhất:", options: ["Lặp lại danh từ ở mỗi câu", "Dùng 'it/this/such' để chỉ lại ý trước", "Bắt đầu mọi câu bằng 'Moreover'"], answer: 1, explain: "Referencing (this/it/such) là cách nối mượt và 'band 7' nhất; lặp từ và nhồi linking words đều bị trừ." },
      { q: "Chọn câu mạch lạc hơn:", options: ["Pollution rises. Pollution affects health. Pollution costs money.", "Pollution is rising, and this not only affects health but also imposes economic costs."], answer: 1, explain: "Câu sau gộp ý, dùng 'this' để nối và cấu trúc 'not only… but also' — mạch lạc và đa dạng hơn hẳn." },
    ],
  },
  {
    id: "countable-agreement",
    title: "Danh từ đếm được & hòa hợp chủ–vị",
    band: "b6",
    intro: "Hai lỗi kéo điểm Grammar nhiều nhất với người Việt: thêm 's' vào danh từ không đếm được, và chia sai động từ theo chủ ngữ.",
    points: [
      { rule: "Danh từ không đếm được KHÔNG thêm 's', KHÔNG dùng 'a'", examples: [{ kind: "bad", html: "informations, advices, researches, equipments" }, { kind: "good", html: "<span class='hi'>information, advice, research, equipment</span> (luôn số ít)" }] },
      { rule: "Muốn đếm thì thêm cụm định lượng", examples: [{ kind: "good", html: "a <span class='hi'>piece of</span> advice, two <span class='hi'>pieces of</span> information" }] },
      { rule: "Động từ hòa hợp với chủ ngữ thật", examples: [{ kind: "bad", html: "The number of students are rising." }, { kind: "good", html: "The number of students <span class='hi'>is</span> rising." }] },
    ],
    vietMistake: "Lỗi kinh điển: <i>many informations</i>, <i>some advices</i>, <i>a research</i> — đều sai vì đây là danh từ KHÔNG đếm được. Và <b>'The number of … is'</b> (số ít) còn <b>'A number of … are'</b> (số nhiều) — rất hay lẫn.",
    quiz: [
      { q: "Câu nào đúng?", options: ["She gave me many useful informations.", "She gave me a lot of useful information.", "She gave me an useful information."], answer: 1, explain: "'information' không đếm được → không 's', không 'a/an'. 'a lot of' dùng được với danh từ không đếm được." },
      { q: "Điền: 'The number of applicants ___ increased.'", options: ["have", "has", "are"], answer: 1, explain: "'The number of …' là chủ ngữ số ít → 'has'. (Khác 'A number of …' số nhiều → 'have'.)" },
      { q: "Cụm đúng để đếm 'advice':", options: ["three advices", "three pieces of advice", "three advice"], answer: 1, explain: "Danh từ không đếm được phải mượn cụm định lượng: 'pieces of advice'." },
    ],
  },
];
