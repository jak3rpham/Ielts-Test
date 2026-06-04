// src/data/reading.ts
import { ReadingTest } from "./types";

export const READING: ReadingTest[] = [
  {
    id: "coral-reefs",
    title: "The quiet engineering of coral reefs",
    paragraphs: [
      { label: "A", text: "Coral reefs are often described as the rainforests of the sea, yet the comparison undersells their peculiarity. A reef is not a single organism but a partnership: tiny animals called polyps build limestone skeletons, while microscopic algae living inside their tissue convert sunlight into food. Neither partner thrives alone. The algae supply the polyps with energy; the polyps, in return, offer the algae shelter and a steady supply of nutrients." },
      { label: "B", text: "This arrangement is also the reef's central vulnerability. When water grows too warm, the algae produce substances harmful to their hosts, and the polyps expel them. Stripped of their colourful tenants, the corals turn ghostly white — a phenomenon known as bleaching. Bleached coral is not dead, but it is starving, and if cool conditions do not return promptly, large stretches of reef may perish within weeks." },
      { label: "C", text: "What is less widely appreciated is the role reefs play far beyond their own boundaries. By absorbing the force of incoming waves, reefs shield coastlines from erosion, sparing coastal communities the expense of artificial barriers. Researchers have estimated that, were certain reefs to vanish, the cost of replacing this natural protection with engineered defences would run into billions. The reef, in effect, performs costly civil engineering for free." },
      { label: "D", text: "Restoration efforts have multiplied in recent years, ranging from coral nurseries to the selective breeding of heat-tolerant strains. Results are encouraging but modest in scale; no programme has yet matched the pace at which reefs are being lost. Most scientists agree that local restoration, however ingenious, cannot substitute for addressing the warming of the oceans themselves." },
    ],
    tfng: [
      { q: "Coral polyps and their algae can each survive perfectly well on their own.", answer: "False", explain: "Đoạn A: 'Neither partner thrives alone' — không bên nào sống tốt một mình." },
      { q: "Bleached coral is already dead.", answer: "False", explain: "Đoạn B: 'Bleached coral is not dead, but it is starving' — chưa chết, đang đói." },
      { q: "Reefs reduce coastal erosion by absorbing wave energy.", answer: "True", explain: "Đoạn C: 'By absorbing the force of incoming waves, reefs shield coastlines from erosion.'" },
      { q: "Most governments have already built artificial barriers to replace reefs.", answer: "Not Given", explain: "Đoạn C chỉ nói chi phí thay thế sẽ rất lớn, không nói chính phủ đã xây hay chưa." },
    ],
    mcq: [
      { q: "According to the passage, what causes coral bleaching?", options: ["The polyps stop building skeletons", "Warm water makes the algae harmful, so polyps expel them", "Algae eat the polyps"], answer: 1, explain: "Đoạn B: nước quá ấm → tảo sinh chất hại → polyp đẩy tảo ra → san hô trắng." },
      { q: "What is the author's view on local restoration efforts?", options: ["They have fully solved the problem", "They help but cannot replace tackling ocean warming", "They are pointless"], answer: 1, explain: "Đoạn D: kết quả 'encouraging but modest', không thay thế được việc xử lý nóng lên đại dương." },
      { q: "The phrase 'costly civil engineering for free' (paragraph C) suggests reefs…", options: ["are expensive to maintain", "provide valuable protection at no cost", "were built by engineers"], answer: 1, explain: "Reef làm 'công trình' bảo vệ bờ biển vốn rất tốn kém — nhưng miễn phí." },
    ],
  },
  {
    id: "urban-farming",
    title: "Growing food where people live",
    paragraphs: [
      { label: "A", text: "Urban farming — the practice of cultivating crops within cities — is often presented as a recent innovation, but its roots are old. During both world wars, governments encouraged citizens to grow vegetables in any available space to ease food shortages. What is new is the scale of ambition: rooftop greenhouses, vertical farms stacked inside warehouses, and community plots are now promoted not merely as a wartime stopgap but as a permanent feature of how cities feed themselves." },
      { label: "B", text: "Advocates point to several advantages. Food grown a few kilometres from where it is eaten travels less, reducing the emissions and spoilage associated with long supply chains. Vertical farms, which grow plants under controlled artificial light, can produce yields per square metre far higher than conventional fields, and they use a fraction of the water. They are also indifferent to weather, allowing year-round harvests in climates that would otherwise permit only one." },
      { label: "C", text: "The drawbacks, however, are significant. The artificial lighting that vertical farms depend on consumes large amounts of electricity, and unless that power comes from clean sources, the environmental savings can be wiped out. Critics also note that such farms tend to grow only high-value crops such as leafy greens and herbs; staple foods like grains remain stubbornly uneconomical to produce this way." },
      { label: "D", text: "Most analysts conclude that urban farming will complement rather than replace rural agriculture. Its real promise may lie less in tonnage than in its social effects: bringing fresh produce to neighbourhoods that lack it, and reconnecting city dwellers with the origins of their food." },
    ],
    tfng: [
      { q: "Urban farming was first practised only in the twenty-first century.", answer: "False", explain: "Đoạn A: đã có từ hai cuộc thế chiến — gốc rễ rất cũ." },
      { q: "Vertical farms can produce crops regardless of the outdoor weather.", answer: "True", explain: "Đoạn B: 'indifferent to weather, allowing year-round harvests'." },
      { q: "Vertical farms are well suited to growing grain crops cheaply.", answer: "False", explain: "Đoạn C: cây lương thực như ngũ cốc vẫn 'uneconomical' để trồng kiểu này." },
      { q: "Most urban farms in operation today are run by government agencies.", answer: "Not Given", explain: "Bài không nói ai vận hành phần lớn các nông trại đô thị." },
    ],
    mcq: [
      { q: "What is the main environmental risk of vertical farms?", options: ["They use too much land", "Their artificial lighting can consume dirty electricity", "They attract pests"], answer: 1, explain: "Đoạn C: đèn nhân tạo tốn điện; nếu điện không sạch thì xóa sạch lợi ích môi trường." },
      { q: "According to paragraph D, the greatest value of urban farming may be…", options: ["replacing rural farms entirely", "its social and community effects", "producing the most food per hectare"], answer: 1, explain: "Đoạn D: giá trị thật nằm ở tác động xã hội, không phải sản lượng." },
      { q: "The word 'stopgap' (paragraph A) most nearly means…", options: ["a permanent solution", "a temporary measure", "a financial cost"], answer: 1, explain: "'stopgap' = giải pháp tạm thời (đối lập với 'permanent feature' ngay sau đó)." },
    ],
  },
  {
    id: "habit-loop",
    title: "The architecture of habit",
    paragraphs: [
      { label: "A", text: "Much of what we do each day is not the product of deliberate decision but of habit. Psychologists describe a habit as a loop with three parts: a cue that triggers the behaviour, the routine itself, and a reward that the brain learns to associate with it. Over time, the loop becomes so automatic that the conscious mind barely registers it — which is precisely why habits are so difficult to break." },
      { label: "B", text: "This automation is not a flaw but an efficiency. If every action required full attention, the brain would quickly exhaust itself. By offloading repeated behaviours into automatic loops, the mind frees up capacity for novel problems. The cost is that the brain cannot easily tell a useful habit from a harmful one; it simply repeats whatever has been rewarded." },
      { label: "C", text: "Research suggests that the most effective way to change a habit is not to suppress the routine but to keep the cue and the reward while substituting a new routine between them. A person who snacks when stressed, for instance, might respond to the same stress cue with a short walk, still arriving at a sense of relief. The loop survives; only its middle has changed." },
      { label: "D", text: "None of this happens instantly. The popular claim that a habit forms in twenty-one days has little scientific basis; studies have found the period varies enormously, from a few weeks to the better part of a year, depending on the behaviour and the person." },
    ],
    tfng: [
      { q: "A habit loop consists of a cue, a routine, and a reward.", answer: "True", explain: "Đoạn A nêu rõ ba phần: cue, routine, reward." },
      { q: "The brain can easily distinguish good habits from bad ones.", answer: "False", explain: "Đoạn B: não 'cannot easily tell a useful habit from a harmful one'." },
      { q: "The best way to break a habit is to remove its cue entirely.", answer: "False", explain: "Đoạn C: giữ cue và reward, chỉ thay routine ở giữa." },
      { q: "Most people can form any new habit within exactly three weeks.", answer: "False", explain: "Đoạn D bác bỏ con số 21 ngày; thời gian biến thiên rất lớn." },
    ],
    mcq: [
      { q: "Why does the brain turn behaviours into automatic habits?", options: ["To make them harder to change", "To save mental energy for new problems", "To increase the reward"], answer: 1, explain: "Đoạn B: tự động hóa giúp tiết kiệm năng lượng tinh thần cho vấn đề mới." },
      { q: "In the snacking example (paragraph C), what stays the same?", options: ["The routine", "The cue and the reward", "Nothing"], answer: 1, explain: "Cue (stress) và reward (cảm giác nhẹ nhõm) giữ nguyên; chỉ routine đổi sang đi bộ." },
      { q: "What does the passage say about the '21 days' claim?", options: ["It is well supported by research", "It has little scientific basis", "It applies only to exercise"], answer: 1, explain: "Đoạn D: 'little scientific basis'." },
    ],
  },
  {
    id: "sleep-debt",
    title: "The hidden cost of lost sleep",
    paragraphs: [
      { label: "A", text: "Modern societies tend to treat sleep as a luxury rather than a necessity. Workers boast about how little they need, and late nights are worn as a badge of dedication. Yet a growing body of research suggests that chronic shortfalls in sleep accumulate into what scientists call a 'sleep debt' — a deficit that cannot simply be cleared with a single long lie-in at the weekend." },
      { label: "B", text: "The consequences extend well beyond feeling tired. Studies have linked persistent sleep loss to impaired memory, weakened immunity, and a higher risk of conditions such as heart disease and diabetes. Perhaps most striking is the effect on judgement: people who are sleep-deprived consistently rate their own performance as normal, even as objective tests show it declining sharply. In other words, the tired brain is a poor judge of its own tiredness." },
      { label: "C", text: "Why, then, do so many people deprive themselves? Part of the answer lies in artificial light, which delays the body's natural signals to sleep. Screens are particularly disruptive, as the blue light they emit suppresses melatonin, the hormone that prepares the body for rest. The result is a cycle in which technology both fills our evenings and undermines the sleep that should follow them." },
      { label: "D", text: "Some employers have begun to take note, introducing later start times or quiet rooms for napping. Early evidence suggests such measures improve both wellbeing and productivity. Still, researchers caution that workplace tweaks address only the symptoms; the deeper shift required is cultural — learning, once again, to value rest." },
    ],
    tfng: [
      { q: "Sleep debt can be fully repaid with one long sleep at the weekend.", answer: "False", explain: "Đoạn A: 'cannot simply be cleared with a single long lie-in'." },
      { q: "Sleep-deprived people tend to overestimate how well they are performing.", answer: "True", explain: "Đoạn B: họ tự đánh giá bình thường trong khi test cho thấy sa sút." },
      { q: "Blue light from screens increases melatonin production.", answer: "False", explain: "Đoạn C: ánh sáng xanh 'suppresses melatonin' (ức chế, không tăng)." },
      { q: "Napping rooms are now required by law in most countries.", answer: "Not Given", explain: "Bài chỉ nói một số nơi làm tự nguyện, không nói luật bắt buộc." },
    ],
    mcq: [
      { q: "What is the main point of paragraph B?", options: ["Sleep loss only makes people tired", "Sleep loss has serious effects, including poor self-judgement", "Sleep loss improves immunity"], answer: 1, explain: "Đoạn B liệt kê hậu quả nghiêm trọng + việc não mệt đánh giá sai chính nó." },
      { q: "According to paragraph D, workplace measures are…", options: ["a complete solution", "helpful but only address symptoms", "ineffective"], answer: 1, explain: "Đoạn D: cải thiện nhưng chỉ chữa triệu chứng; cần thay đổi văn hóa." },
      { q: "The phrase 'worn as a badge of dedication' (paragraph A) suggests people…", options: ["are ashamed of little sleep", "take pride in sleeping little", "sleep a lot"], answer: 1, explain: "Nghĩa: khoe ngủ ít như một niềm tự hào về sự tận tụy." },
    ],
  },
  {
    id: "vertical-cities",
    title: "Building upwards, living closer",
    paragraphs: [
      { label: "A", text: "As the world's population concentrates in cities, planners face a stark choice: spread outwards, consuming farmland and lengthening commutes, or build upwards, packing more people onto less land. Increasingly, the answer is height. The skyscraper, once a symbol of corporate prestige, is being reimagined as a tool for sustainable living." },
      { label: "B", text: "Density brings clear benefits. Compact cities require shorter journeys, making public transport, walking, and cycling more practical and cutting per-person emissions. Services from hospitals to broadband become cheaper to provide when users are clustered together. Studies repeatedly find that residents of dense, well-planned cities have smaller carbon footprints than their suburban counterparts." },
      { label: "C", text: "Yet height alone guarantees nothing. Towers built without parks, shops, or transport links can become isolating, and poorly designed high-rises have a long history of social problems. The success of dense living depends less on how tall buildings are than on what surrounds them — whether residents can meet daily needs without a car, and whether public spaces invite community rather than discourage it." },
      { label: "D", text: "The most promising developments therefore mix homes, offices, and greenery within walking distance, sometimes within a single building. Critics warn that such projects can be expensive and risk excluding lower-income residents. Designing density that is both green and fair, they argue, remains the central challenge of the modern city." },
    ],
    tfng: [
      { q: "Building cities upwards can reduce the loss of farmland.", answer: "True", explain: "Đoạn A: xây lên cao thay vì lan rộng 'consuming farmland'." },
      { q: "Residents of dense cities generally have larger carbon footprints than suburban residents.", answer: "False", explain: "Đoạn B: ngược lại — dấu chân carbon NHỎ hơn." },
      { q: "The height of a building is the main factor determining whether dense living succeeds.", answer: "False", explain: "Đoạn C: phụ thuộc vào thứ XUNG QUANH, không phải chiều cao." },
      { q: "Most governments now ban the construction of suburbs.", answer: "Not Given", explain: "Bài không nói gì về việc cấm xây ngoại ô." },
    ],
    mcq: [
      { q: "According to paragraph B, density makes services…", options: ["more expensive", "cheaper to provide", "unnecessary"], answer: 1, explain: "Đoạn B: dịch vụ rẻ hơn khi người dùng tập trung." },
      { q: "What does paragraph C argue?", options: ["Tall buildings always fail", "What surrounds a building matters more than its height", "Cars are essential in cities"], answer: 1, explain: "Trọng tâm đoạn C: yếu tố quyết định là môi trường xung quanh." },
      { q: "What is the 'central challenge' mentioned in paragraph D?", options: ["Building the tallest tower", "Making density both green and fair", "Removing all green space"], answer: 1, explain: "Đoạn D nêu rõ: density vừa xanh vừa công bằng." },
    ],
  },
];
