// src/data/vocab.ts
import { VocabTopic } from "./types";

// helpers cho gọn
type Reg = "formal" | "neutral" | "informal";
type Sk = "W" | "S" | "R" | "L";
type Lv = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
const c = (id: string, word: string, pos: string, level: Lv, register: Reg, skills: Sk[], dv: string, de: string, example: string, synonyms: string[], antonyms: string[], phrases: string[], uv: string, ue: string) =>
  ({ id, word, pos, level, register, skills, def: { vi: dv, en: de }, example, synonyms, antonyms, phrases, useCase: { vi: uv, en: ue } });
const q = (qv: string, qe: string, options: string[], answer: number, ev: string, ee: string) =>
  ({ q: { vi: qv, en: qe }, options, answer, explain: { vi: ev, en: ee } });
const hi = (w: string) => `<span class='hi'>${w}</span>`;

export const VOCAB: VocabTopic[] = [
  {
    id: "environment", name: "Môi trường / Environment",
    cards: [
      c("mitigate", "mitigate", "verb", "C1", "formal", ["W", "S"], "làm giảm nhẹ tác hại", "to make something harmful less severe", `Planting trees can ${hi("mitigate")} climate change.`, ["alleviate", "reduce", "lessen"], ["aggravate", "worsen"], ["mitigate the impact", "mitigate the risk"], "Đề giải pháp: giảm nhẹ hậu quả", "Solution essays: reducing harm"),
      c("deplete", "deplete", "verb", "C1", "formal", ["W", "R"], "làm cạn kiệt (tài nguyên)", "to use up a resource until little remains", `Overfishing has ${hi("depleted")} fish stocks.`, ["exhaust", "drain"], ["replenish", "restore"], ["deplete resources", "rapidly depleted"], "Nói tài nguyên bị dùng hết", "Talking about resources running out"),
      c("sustainable", "sustainable", "adj", "B2", "neutral", ["W", "S"], "bền vững", "able to continue over the long term", `We need a ${hi("sustainable")} energy policy.`, ["viable", "eco-friendly"], ["unsustainable", "wasteful"], ["sustainable development", "environmentally sustainable"], "Hầu hết đề môi trường", "Most environment topics"),
      c("emissions", "emissions", "noun", "B2", "neutral", ["W", "S", "R"], "khí/chất thải ra", "gases released into the air", `Carbon ${hi("emissions")} must be cut.`, ["discharge", "pollutants"], [], ["carbon emissions", "cut emissions", "greenhouse gas emissions"], "Biến đổi khí hậu, giao thông", "Climate change, transport"),
      c("degradation", "degradation", "noun", "C1", "formal", ["W", "R"], "sự suy thoái", "the process of something declining in quality", `Environmental ${hi("degradation")} threatens wildlife.`, ["deterioration", "decline"], ["improvement"], ["environmental degradation", "soil degradation"], "Mô tả môi trường xấu đi", "Describing the environment worsening"),
      c("conserve", "conserve", "verb", "B1", "neutral", ["W", "S"], "bảo tồn, tiết kiệm", "to protect or use carefully", `We must ${hi("conserve")} water during droughts.`, ["preserve", "save"], ["waste", "squander"], ["conserve energy", "conserve resources"], "Giải pháp bảo vệ tài nguyên", "Solutions to protect resources"),
      c("renewable", "renewable", "adj", "B2", "neutral", ["W", "S"], "tái tạo được", "(of energy) naturally replenished", `Solar is a ${hi("renewable")} source of energy.`, ["sustainable"], ["finite", "non-renewable"], ["renewable energy", "renewable sources"], "Chủ đề năng lượng", "Energy topics"),
      c("pollutant", "pollutant", "noun", "B2", "neutral", ["W", "R"], "chất gây ô nhiễm", "a substance that pollutes", `Factories release harmful ${hi("pollutants")}.`, ["contaminant"], [], ["airborne pollutants", "industrial pollutants"], "Ô nhiễm không khí/nước", "Air/water pollution"),
      c("biodiversity", "biodiversity", "noun", "C1", "formal", ["W", "R"], "đa dạng sinh học", "the variety of living species", `Deforestation reduces ${hi("biodiversity")}.`, ["variety of life"], [], ["loss of biodiversity", "rich biodiversity"], "Bảo tồn thiên nhiên", "Nature conservation"),
      c("greenhouse", "greenhouse effect", "noun", "B2", "neutral", ["W", "R"], "hiệu ứng nhà kính", "warming caused by trapped gases", `The ${hi("greenhouse effect")} drives global warming.`, [], [], ["the greenhouse effect"], "Giải thích nóng lên toàn cầu", "Explaining global warming"),
      c("eco-friendly", "eco-friendly", "adj", "A2", "neutral", ["W", "S"], "thân thiện môi trường", "not harmful to the environment", `Many shoppers prefer ${hi("eco-friendly")} products.`, ["green", "sustainable"], ["harmful"], ["eco-friendly products"], "Tiêu dùng xanh", "Green consumption"),
    ],
    quiz: [
      q("'mitigate' gần nghĩa nhất với:", "'mitigate' is closest to:", ["aggravate", "reduce", "ignore"], 1, "mitigate = làm giảm nhẹ.", "mitigate = to lessen."),
      q("Trái nghĩa của 'deplete':", "Antonym of 'deplete':", ["replenish", "exhaust", "drain"], 0, "replenish = bổ sung lại.", "replenish = to refill."),
      q("'renewable energy' là năng lượng:", "'renewable energy' is energy that is:", ["có hạn", "tái tạo được", "gây ô nhiễm"], 1, "renewable = tái tạo, trái với finite.", "renewable = replenishable, opposite of finite."),
    ],
  },
  {
    id: "education", name: "Giáo dục / Education",
    cards: [
      c("foster", "foster", "verb", "C1", "formal", ["W", "S"], "nuôi dưỡng, thúc đẩy", "to encourage the development of", `Group work ${hi("fosters")} collaboration.`, ["cultivate", "nurture"], ["suppress", "hinder"], ["foster creativity", "foster independence"], "Lợi ích của phương pháp dạy", "Benefits of a teaching method"),
      c("curriculum", "curriculum", "noun", "B2", "neutral", ["W", "S", "R"], "chương trình giảng dạy", "the subjects taught in a course", `Coding was added to the ${hi("curriculum")}.`, ["syllabus"], [], ["school curriculum", "national curriculum"], "Đề bàn môn học nên dạy", "Debating subjects to teach"),
      c("rote-learning", "rote learning", "phrase", "C1", "neutral", ["W", "S"], "học vẹt", "memorising without understanding", `${hi("Rote learning")} rarely builds deep understanding.`, ["memorisation"], ["critical thinking"], ["rely on rote learning"], "Phê phán dạy truyền thống", "Criticising traditional teaching"),
      c("holistic", "holistic", "adj", "C2", "formal", ["W"], "toàn diện", "considering the whole person", `A ${hi("holistic")} education develops character too.`, ["comprehensive", "all-round"], ["narrow"], ["holistic approach"], "Lập luận giáo dục toàn diện", "Arguing for all-round education"),
      c("attainment", "attainment", "noun", "C1", "formal", ["W", "R"], "thành tích đạt được", "level of achievement", `Background affects academic ${hi("attainment")}.`, ["achievement"], ["failure"], ["academic attainment", "educational attainment"], "Bàn kết quả học tập", "Discussing results"),
      c("literacy", "literacy", "noun", "B2", "neutral", ["W", "R"], "khả năng đọc viết", "the ability to read and write", `Adult ${hi("literacy")} programmes reduce poverty.`, [], ["illiteracy"], ["digital literacy", "adult literacy"], "Chủ đề phổ cập giáo dục", "Access-to-education topics"),
      c("enroll", "enrol", "verb", "B1", "neutral", ["W", "S"], "ghi danh, nhập học", "to officially join a course", `More women now ${hi("enrol")} in universities.`, ["sign up", "register"], ["withdraw"], ["enrol in a course"], "Số liệu tuyển sinh", "Enrolment statistics"),
      c("tuition", "tuition", "noun", "B2", "neutral", ["W", "R"], "học phí; việc dạy kèm", "fees for teaching; instruction", `Rising ${hi("tuition")} fees deter applicants.`, ["fees"], [], ["tuition fees", "private tuition"], "Chi phí giáo dục", "Cost of education"),
      c("vocational", "vocational", "adj", "B2", "neutral", ["W", "S"], "hướng nghiệp, dạy nghề", "related to job skills", `${hi("Vocational")} training prepares students for work.`, ["job-related"], ["academic"], ["vocational training", "vocational course"], "So sánh học nghề vs hàn lâm", "Vocational vs academic"),
      c("discipline", "discipline", "noun", "A2", "neutral", ["W", "S"], "kỷ luật; bộ môn", "controlled behaviour; a field", `Strict ${hi("discipline")} can stifle creativity.`, ["self-control"], [], ["strict discipline", "self-discipline"], "Bàn kỷ luật học đường", "School discipline debates"),
      c("graduate", "graduate", "verb/noun", "A2", "neutral", ["W", "S"], "tốt nghiệp; người tốt nghiệp", "to finish a degree; a person who has", `She ${hi("graduated")} with honours.`, [], [], ["graduate from", "a recent graduate"], "Nói về học vấn", "Talking about qualifications"),
    ],
    quiz: [
      q("'foster collaboration' nghĩa là:", "'foster collaboration' means:", ["ngăn cản", "thúc đẩy", "đo lường"], 1, "foster = nuôi dưỡng/thúc đẩy.", "foster = to encourage."),
      q("'rote learning' là:", "'rote learning' is:", ["học sáng tạo", "học vẹt", "học nhóm"], 1, "rote learning = học thuộc lòng máy móc.", "rote learning = mechanical memorisation."),
      q("'vocational training' tập trung vào:", "'vocational training' focuses on:", ["lý thuyết hàn lâm", "kỹ năng nghề", "thể thao"], 1, "vocational = hướng nghề, trái academic.", "vocational = job-focused, opposite academic."),
    ],
  },
  {
    id: "technology", name: "Công nghệ / Technology",
    cards: [
      c("streamline", "streamline", "verb", "C1", "neutral", ["W", "S"], "tinh giản, làm hiệu quả hơn", "to make a process more efficient", `Automation has ${hi("streamlined")} production.`, ["optimise", "simplify"], ["complicate"], ["streamline the process"], "Lợi ích công nghệ với công việc", "Tech benefits for work"),
      c("disruptive", "disruptive", "adj", "C1", "neutral", ["W", "S"], "có tính đột phá", "radically changing an industry", `AI is a ${hi("disruptive")} technology.`, ["groundbreaking", "transformative"], ["conventional"], ["disruptive innovation"], "Công nghệ thay đổi cả ngành", "Industry-changing tech"),
      c("obsolete", "obsolete", "adj", "C1", "neutral", ["W", "S", "R"], "lỗi thời", "no longer used", `Many manual jobs have become ${hi("obsolete")}.`, ["outdated"], ["cutting-edge"], ["become obsolete", "render obsolete"], "Nghề/công nghệ bị thay thế", "Jobs/tech being replaced"),
      c("surveillance", "surveillance", "noun", "C1", "formal", ["W", "R"], "sự giám sát", "close watching of people", `Facial recognition raises ${hi("surveillance")} concerns.`, ["monitoring"], ["privacy"], ["mass surveillance", "under surveillance"], "Quyền riêng tư & công nghệ", "Privacy & technology"),
      c("automation", "automation", "noun", "B2", "neutral", ["W", "S", "R"], "tự động hoá", "use of machines to do work", `${hi("Automation")} threatens routine jobs.`, ["mechanisation"], [], ["increasing automation"], "Việc làm & robot", "Jobs & robots"),
      c("innovation", "innovation", "noun", "B2", "neutral", ["W", "S"], "sự đổi mới", "a new method or product", `${hi("Innovation")} drives economic growth.`, ["invention", "advance"], ["stagnation"], ["technological innovation", "drive innovation"], "Kinh tế, công nghệ", "Economy, technology"),
      c("device", "device", "noun", "A2", "neutral", ["W", "S", "R"], "thiết bị", "a piece of equipment", `People own multiple digital ${hi("devices")}.`, ["gadget"], [], ["mobile device", "digital device"], "Đời sống số", "Digital life"),
      c("addictive", "addictive", "adj", "B1", "neutral", ["W", "S"], "gây nghiện", "causing dependence", `Social media can be highly ${hi("addictive")}.`, ["habit-forming"], [], ["addictive apps"], "Mặt trái mạng xã hội", "Downsides of social media"),
      c("cutting-edge", "cutting-edge", "adj", "C1", "neutral", ["W", "S"], "tối tân", "most advanced", `The lab uses ${hi("cutting-edge")} equipment.`, ["state-of-the-art"], ["outdated", "obsolete"], ["cutting-edge technology"], "Khen công nghệ tiên tiến", "Praising advanced tech"),
      c("connectivity", "connectivity", "noun", "B2", "neutral", ["W", "R"], "khả năng kết nối", "the state of being connected", `Rural areas lack reliable ${hi("connectivity")}.`, ["access"], [], ["internet connectivity"], "Khoảng cách số", "The digital divide"),
    ],
    quiz: [
      q("Trái nghĩa của 'obsolete':", "Antonym of 'obsolete':", ["cutting-edge", "outdated", "old"], 0, "obsolete = lỗi thời; trái cutting-edge.", "obsolete = outdated; opposite cutting-edge."),
      q("'disruptive technology' là công nghệ:", "'disruptive technology' is technology that:", ["gây phiền", "mang tính đột phá", "dễ hỏng"], 1, "Ở đây nghĩa tích cực: thay đổi ngành.", "Here it is positive: it transforms an industry."),
      q("'surveillance' gắn với chủ đề:", "'surveillance' relates to:", ["quyền riêng tư", "ẩm thực", "thể thao"], 0, "surveillance = giám sát, gắn privacy.", "surveillance ties to privacy."),
    ],
  },
  {
    id: "society", name: "Xã hội / Society",
    cards: [
      c("disparity", "disparity", "noun", "C1", "formal", ["W", "R"], "sự chênh lệch", "a noticeable difference/inequality", `There is a widening income ${hi("disparity")}.`, ["inequality", "gap"], ["parity", "equality"], ["income disparity", "gender disparity"], "Bất bình đẳng", "Inequality topics"),
      c("marginalised", "marginalised", "adj", "C1", "formal", ["W"], "bị gạt ra bên lề", "treated as insignificant", `Policies should protect ${hi("marginalised")} groups.`, ["disadvantaged", "excluded"], ["privileged"], ["marginalised communities"], "Nhóm yếu thế", "Vulnerable groups"),
      c("cohesion", "cohesion", "noun", "C1", "formal", ["W"], "sự gắn kết", "the state of uniting well", `Shared values strengthen social ${hi("cohesion")}.`, ["unity", "solidarity"], ["division"], ["social cohesion"], "Gắn kết cộng đồng", "Community bonding"),
      c("alleviate", "alleviate", "verb", "C1", "formal", ["W", "S"], "làm dịu, giảm bớt", "to make a problem less severe", `Welfare programmes ${hi("alleviate")} poverty.`, ["ease", "relieve"], ["aggravate"], ["alleviate poverty", "alleviate pressure"], "Giải pháp xã hội", "Social solutions"),
      c("demographic", "demographic", "noun/adj", "C1", "formal", ["W", "R"], "thuộc dân số", "relating to population groups", `An ageing ${hi("demographic")} strains healthcare.`, ["population group"], [], ["ageing demographic", "demographic shift"], "Già hoá dân số", "Ageing population"),
      c("welfare", "welfare", "noun", "B2", "neutral", ["W", "R"], "phúc lợi", "support for people's wellbeing", `The ${hi("welfare")} system supports the unemployed.`, ["benefits"], [], ["welfare system", "social welfare"], "Chính sách an sinh", "Social policy"),
      c("urbanisation", "urbanisation", "noun", "C1", "formal", ["W", "R"], "đô thị hoá", "growth of cities", `Rapid ${hi("urbanisation")} strains housing.`, [], [], ["rapid urbanisation"], "Di cư về thành phố", "Migration to cities"),
      c("integrate", "integrate", "verb", "B2", "neutral", ["W", "S"], "hoà nhập", "to combine into a whole", `Migrants often struggle to ${hi("integrate")}.`, ["assimilate"], ["segregate"], ["integrate into society"], "Nhập cư, đa văn hoá", "Immigration, multiculturalism"),
      c("inequality", "inequality", "noun", "B2", "neutral", ["W", "S", "R"], "sự bất bình đẳng", "unfair difference in status", `Economic ${hi("inequality")} is widening.`, ["disparity"], ["equality"], ["social inequality", "tackle inequality"], "Công bằng xã hội", "Social justice"),
      c("community", "community", "noun", "A2", "neutral", ["W", "S"], "cộng đồng", "a group living in one place", `A strong ${hi("community")} supports its members.`, [], [], ["local community", "sense of community"], "Đời sống cộng đồng", "Community life"),
    ],
    quiz: [
      q("'alleviate poverty' nghĩa là:", "'alleviate poverty' means:", ["xoá hẳn nghèo", "giảm bớt nghèo", "đo mức nghèo"], 1, "alleviate = làm dịu/giảm bớt.", "alleviate = to ease."),
      q("Trái nghĩa của 'cohesion':", "Antonym of 'cohesion':", ["unity", "solidarity", "division"], 2, "division = chia rẽ.", "division = splitting apart."),
      q("'marginalised groups' là nhóm:", "'marginalised groups' are groups that are:", ["có đặc quyền", "bị gạt ra lề", "đông nhất"], 1, "marginalised = bị đẩy ra lề.", "marginalised = pushed to the edges."),
    ],
  },
  {
    id: "health", name: "Sức khỏe / Health",
    cards: [
      c("sedentary", "sedentary", "adj", "C1", "formal", ["W", "R"], "ít vận động", "involving much sitting", `A ${hi("sedentary")} lifestyle raises disease risk.`, ["inactive"], ["active"], ["sedentary lifestyle"], "Lối sống & bệnh tật", "Lifestyle & illness"),
      c("chronic", "chronic", "adj", "B2", "neutral", ["W", "S", "R"], "mãn tính", "lasting a long time", `${hi("Chronic")} illnesses burden hospitals.`, ["persistent"], ["acute"], ["chronic disease", "chronic pain"], "Phân biệt với cấp tính", "Contrast with acute"),
      c("epidemic", "epidemic", "noun", "B2", "neutral", ["W", "R"], "dịch bệnh lan rộng", "a widespread disease outbreak", `Obesity is a modern ${hi("epidemic")}.`, ["outbreak"], [], ["reach epidemic proportions"], "Nghĩa bóng cũng dùng được", "Also used figuratively"),
      c("well-being", "well-being", "noun", "B2", "neutral", ["W", "S"], "trạng thái khỏe mạnh", "the state of being healthy/happy", `Mental ${hi("well-being")} matters as much as physical.`, ["welfare"], [], ["mental well-being"], "Sức khỏe tinh thần", "Mental health"),
      c("preventive", "preventive", "adj", "C1", "formal", ["W"], "phòng ngừa", "intended to prevent illness", `${hi("Preventive")} care cuts long-term costs.`, ["precautionary"], ["reactive"], ["preventive care"], "Phòng bệnh hơn chữa", "Prevention over cure"),
      c("nutritious", "nutritious", "adj", "B1", "neutral", ["W", "S"], "bổ dưỡng", "providing good nourishment", `Schools should serve ${hi("nutritious")} meals.`, ["nourishing", "healthy"], ["junk"], ["nutritious diet"], "Chế độ ăn", "Diet topics"),
      c("immunity", "immunity", "noun", "B2", "neutral", ["W", "R"], "khả năng miễn dịch", "resistance to disease", `Vaccines build ${hi("immunity")}.`, ["resistance"], [], ["build immunity"], "Tiêm chủng, dịch bệnh", "Vaccination, disease"),
      c("outbreak", "outbreak", "noun", "B2", "neutral", ["W", "R"], "đợt bùng phát", "a sudden start of disease", `An ${hi("outbreak")} spread across the region.`, ["epidemic"], [], ["disease outbreak"], "Dịch bệnh", "Disease topics"),
      c("hygiene", "hygiene", "noun", "B1", "neutral", ["W", "S"], "vệ sinh", "practices that keep you healthy", `Good ${hi("hygiene")} prevents infection.`, ["cleanliness"], [], ["personal hygiene"], "Phòng bệnh", "Disease prevention"),
      c("healthy", "healthy", "adj", "A1", "neutral", ["W", "S"], "khỏe mạnh, lành mạnh", "in good health", `A ${hi("healthy")} diet improves mood.`, ["fit", "well"], ["unhealthy"], ["a healthy lifestyle"], "Cơ bản về sức khỏe", "Basic health vocabulary"),
    ],
    quiz: [
      q("'sedentary lifestyle' là lối sống:", "'sedentary lifestyle' is one that is:", ["năng động", "ít vận động", "lành mạnh"], 1, "sedentary = ít vận động.", "sedentary = inactive."),
      q("Trái nghĩa của 'chronic':", "Antonym of 'chronic':", ["acute", "persistent", "long-term"], 0, "acute = cấp tính.", "acute = short and severe."),
      q("'preventive care' là chăm sóc:", "'preventive care' means care that is:", ["sau khi bệnh nặng", "phòng ngừa", "khẩn cấp"], 1, "preventive = phòng ngừa.", "preventive = aimed at prevention."),
    ],
  },
  {
    id: "economy", name: "Kinh tế & Việc làm / Economy & Work",
    cards: [
      c("incentive", "incentive", "noun", "B2", "neutral", ["W", "S", "R"], "động lực, ưu đãi", "something that motivates", `Tax breaks are an ${hi("incentive")} to invest.`, ["motivation", "stimulus"], ["deterrent"], ["financial incentive"], "Chính sách khuyến khích", "Policies that encourage behaviour"),
      c("workforce", "workforce", "noun", "B2", "neutral", ["W", "S", "R"], "lực lượng lao động", "all the workers available", `Automation reshapes the ${hi("workforce")}.`, ["labour force"], [], ["skilled workforce", "enter the workforce"], "Việc làm, tự động hoá", "Jobs, automation"),
      c("recession", "recession", "noun", "B2", "neutral", ["W", "R"], "suy thoái kinh tế", "a period of economic decline", `Unemployment rises in a ${hi("recession")}.`, ["downturn", "slump"], ["boom"], ["economic recession"], "Chu kỳ kinh tế", "Economic cycles"),
      c("lucrative", "lucrative", "adj", "C1", "neutral", ["W", "S"], "sinh lời", "producing much profit", `Engineering is a ${hi("lucrative")} career.`, ["profitable"], ["unprofitable"], ["lucrative career"], "Nghề kiếm nhiều tiền", "Well-paid careers"),
      c("redundant", "redundant", "adj", "C1", "neutral", ["W", "S", "R"], "bị mất việc do cắt giảm", "no longer needed at work", `Hundreds were made ${hi("redundant")}.`, ["laid off"], ["hired"], ["made redundant", "redundancy package"], "Diễn đạt 'mất việc' trang trọng", "A formal way to say 'lose a job'"),
      c("entrepreneur", "entrepreneur", "noun", "B2", "neutral", ["W", "S"], "doanh nhân khởi nghiệp", "someone who starts a business", `Young ${hi("entrepreneurs")} drive innovation.`, ["business owner"], [], ["successful entrepreneur"], "Khởi nghiệp", "Start-ups"),
      c("revenue", "revenue", "noun", "B2", "neutral", ["W", "R"], "doanh thu", "income from business", `The firm's ${hi("revenue")} doubled.`, ["income"], ["expenditure"], ["generate revenue"], "Tài chính doanh nghiệp", "Business finance"),
      c("unemployment", "unemployment", "noun", "B1", "neutral", ["W", "S", "R"], "thất nghiệp", "the state of having no job", `${hi("Unemployment")} rose sharply.`, ["joblessness"], ["employment"], ["high unemployment", "youth unemployment"], "Thị trường lao động", "Labour market"),
      c("productivity", "productivity", "noun", "B2", "neutral", ["W", "R"], "năng suất", "rate of output", `Flexible hours boost ${hi("productivity")}.`, ["efficiency"], [], ["improve productivity"], "Hiệu quả công việc", "Work efficiency"),
      c("salary", "salary", "noun", "A2", "neutral", ["W", "S"], "lương", "regular pay for work", `A higher ${hi("salary")} attracts talent.`, ["pay", "wage"], [], ["competitive salary"], "Cơ bản về việc làm", "Basic work vocabulary"),
    ],
    quiz: [
      q("Trái nghĩa của 'incentive':", "Antonym of 'incentive':", ["deterrent", "motivation", "stimulus"], 0, "deterrent = thứ răn đe.", "deterrent = something that discourages."),
      q("Công việc 'lucrative' là:", "A 'lucrative' job is:", ["nhàm chán", "sinh lời cao", "tạm thời"], 1, "lucrative = hái ra tiền.", "lucrative = very profitable."),
      q("'made redundant' nghĩa là:", "'made redundant' means:", ["được thăng chức", "bị mất việc do cắt giảm", "được tăng lương"], 1, "made redundant = bị cho thôi việc.", "made redundant = let go due to cuts."),
    ],
  },
  {
    id: "media", name: "Truyền thông / Media",
    cards: [
      c("biased", "biased", "adj", "B2", "neutral", ["W", "S", "R"], "thiên vị", "unfairly favouring one side", `Some coverage is heavily ${hi("biased")}.`, ["partial", "one-sided"], ["impartial", "objective"], ["politically biased"], "Phê phán báo chí", "Criticising journalism"),
      c("credible", "credible", "adj", "C1", "neutral", ["W", "S", "R"], "đáng tin cậy", "able to be believed", `Find ${hi("credible")} sources online.`, ["reliable", "trustworthy"], ["dubious"], ["credible source"], "Độ tin cậy thông tin", "Information reliability"),
      c("misinformation", "misinformation", "noun", "C1", "neutral", ["W", "R"], "thông tin sai lệch", "false information spread", `Social media spreads ${hi("misinformation")}.`, ["falsehoods"], ["facts"], ["spread misinformation"], "Tin giả, mạng xã hội", "Fake news, social media"),
      c("sensationalism", "sensationalism", "noun", "C2", "formal", ["W"], "lối giật gân", "shocking style to attract attention", `${hi("Sensationalism")} distorts the news.`, ["scaremongering"], ["objectivity"], ["media sensationalism"], "Phê phán báo lá cải", "Criticising tabloids"),
      c("scrutiny", "scrutiny", "noun", "C1", "formal", ["W", "R"], "sự soi xét kỹ", "close examination", `Public figures face media ${hi("scrutiny")}.`, ["examination"], ["neglect"], ["under scrutiny", "public scrutiny"], "Người nổi tiếng & riêng tư", "Celebrities & privacy"),
      c("coverage", "coverage", "noun", "B2", "neutral", ["W", "R"], "việc đưa tin", "reporting of an event", `The story got wide ${hi("coverage")}.`, ["reporting"], [], ["news coverage", "media coverage"], "Cách truyền thông đưa tin", "How media reports"),
      c("influential", "influential", "adj", "B2", "neutral", ["W", "S"], "có ảnh hưởng", "having great effect", `Influencers are highly ${hi("influential")}.`, ["powerful"], [], ["influential figure"], "Sức ảnh hưởng truyền thông", "Media influence"),
      c("censorship", "censorship", "noun", "C1", "formal", ["W", "R"], "sự kiểm duyệt", "suppression of content", `${hi("Censorship")} limits free speech.`, ["suppression"], ["freedom"], ["media censorship"], "Tự do ngôn luận", "Free speech"),
      c("advertise", "advertise", "verb", "A2", "neutral", ["W", "S"], "quảng cáo", "to promote publicly", `Companies ${hi("advertise")} on social media.`, ["promote"], [], ["advertise a product"], "Quảng cáo cơ bản", "Basic advertising"),
      c("broadcast", "broadcast", "verb/noun", "B1", "neutral", ["W", "R"], "phát sóng", "to transmit a programme", `The match was ${hi("broadcast")} live.`, ["transmit", "air"], [], ["live broadcast"], "Phát thanh truyền hình", "TV & radio"),
    ],
    quiz: [
      q("Trái nghĩa của 'biased':", "Antonym of 'biased':", ["partial", "one-sided", "objective"], 2, "objective = khách quan.", "objective = unbiased."),
      q("'credible source' là nguồn:", "A 'credible source' is:", ["đáng tin cậy", "miễn phí", "ẩn danh"], 0, "credible = đáng tin.", "credible = believable."),
      q("'sensationalism' là lối đưa tin:", "'sensationalism' is reporting that is:", ["khách quan", "giật gân", "ngắn gọn"], 1, "sensationalism = giật gân câu khách.", "sensationalism = shocking to grab attention."),
    ],
  },
  {
    id: "globalisation", name: "Toàn cầu hóa / Globalisation",
    cards: [
      c("interconnected", "interconnected", "adj", "C1", "neutral", ["W", "S"], "liên kết chặt", "linked and interdependent", `Economies are deeply ${hi("interconnected")}.`, ["interdependent"], ["isolated"], ["interconnected world"], "Mở bài toàn cầu hoá", "Globalisation intros"),
      c("homogenise", "homogenise", "verb", "C2", "formal", ["W"], "làm đồng nhất", "to make uniform", `Globalisation may ${hi("homogenise")} cultures.`, ["standardise"], ["diversify"], ["homogenise culture"], "Mặt trái với văn hoá", "Cultural downsides"),
      c("multinational", "multinational", "adj/noun", "B2", "neutral", ["W", "S", "R"], "đa quốc gia", "operating in many countries", `${hi("Multinational")} firms wield huge power.`, ["transnational"], ["local"], ["multinational corporation"], "Tập đoàn xuyên biên giới", "Cross-border corporations"),
      c("outsourcing", "outsourcing", "noun", "C1", "neutral", ["W", "S", "R"], "thuê ngoài", "paying another firm to do work", `${hi("Outsourcing")} shifted millions of jobs.`, ["subcontracting"], [], ["labour outsourcing"], "Việc làm dịch chuyển", "Jobs moving abroad"),
      c("indigenous", "indigenous", "adj", "C1", "formal", ["W", "R"], "bản địa", "native to a place", `${hi("Indigenous")} traditions risk disappearing.`, ["native"], ["foreign"], ["indigenous people"], "Bảo tồn văn hoá bản địa", "Preserving native culture"),
      c("import", "import", "verb/noun", "A2", "neutral", ["W", "R"], "nhập khẩu", "to bring goods in from abroad", `The country ${hi("imports")} most of its oil.`, [], ["export"], ["import goods"], "Thương mại cơ bản", "Basic trade"),
      c("integration", "integration", "noun", "C1", "formal", ["W"], "sự hội nhập", "process of combining", `Economic ${hi("integration")} boosts trade.`, ["unification"], ["separation"], ["economic integration"], "Hội nhập kinh tế", "Economic union"),
      c("diverse", "diverse", "adj", "B1", "neutral", ["W", "S"], "đa dạng", "varied", `Cities are culturally ${hi("diverse")}.`, ["varied"], ["uniform"], ["culturally diverse"], "Đa văn hoá", "Multicultural topics"),
      c("identity", "identity", "noun", "B1", "neutral", ["W", "S"], "bản sắc, danh tính", "who or what someone is", `Migration can blur national ${hi("identity")}.`, ["character"], [], ["national identity", "cultural identity"], "Bản sắc văn hoá", "Cultural identity"),
      c("trade", "trade", "noun/verb", "A2", "neutral", ["W", "S", "R"], "thương mại, buôn bán", "buying and selling between countries", `Free ${hi("trade")} lowers prices.`, ["commerce"], [], ["free trade", "international trade"], "Giao thương quốc tế", "International commerce"),
    ],
    quiz: [
      q("'homogenise cultures' nghĩa là:", "'homogenise cultures' means to:", ["làm đa dạng hơn", "làm đồng nhất", "bảo tồn"], 1, "homogenise = san phẳng thành giống nhau.", "homogenise = make uniform."),
      q("Trái nghĩa của 'indigenous':", "Antonym of 'indigenous':", ["native", "local", "foreign"], 2, "foreign = ngoại lai.", "foreign = from elsewhere."),
      q("Trái nghĩa của 'import':", "Antonym of 'import':", ["export", "trade", "buy"], 0, "import nhập / export xuất.", "import in / export out."),
    ],
  },
  {
    id: "crime-law", name: "Tội phạm & Pháp luật / Crime & Law",
    cards: [
      c("deterrent", "deterrent", "noun", "C1", "formal", ["W", "S"], "yếu tố răn đe", "something that discourages action", `Harsh sentences act as a ${hi("deterrent")}.`, ["disincentive"], ["incentive"], ["act as a deterrent"], "Hình phạt & phòng ngừa", "Punishment & prevention"),
      c("rehabilitation", "rehabilitation", "noun", "C1", "formal", ["W"], "sự cải tạo", "restoring offenders to normal life", `Prisons should focus on ${hi("rehabilitation")}.`, ["reform"], ["punishment"], ["offender rehabilitation"], "Cải tạo thay vì trừng phạt", "Reform over punishment"),
      c("lenient", "lenient", "adj", "C1", "neutral", ["W", "S"], "khoan dung, nhẹ tay", "not strict in punishing", `The sentence was too ${hi("lenient")}.`, ["soft", "mild"], ["harsh", "strict"], ["a lenient sentence"], "Bình luận mức án", "Commenting on sentences"),
      c("offence", "offence", "noun", "B2", "neutral", ["W", "S", "R"], "hành vi phạm tội", "an illegal act", `Minor ${hi("offences")} should not mean prison.`, ["crime"], [], ["commit an offence"], "Phân loại vi phạm", "Classifying crimes"),
      c("law-abiding", "law-abiding", "adj", "C1", "neutral", ["W", "S"], "tuân thủ pháp luật", "obeying the law", `Most citizens are ${hi("law-abiding")}.`, ["compliant"], ["criminal"], ["law-abiding citizen"], "Công dân tốt vs tội phạm", "Good citizens vs criminals"),
      c("convict", "convict", "verb", "B2", "neutral", ["W", "R"], "kết tội", "to find guilty in court", `He was ${hi("convicted")} of fraud.`, ["find guilty"], ["acquit"], ["convict of a crime"], "Quá trình tố tụng", "Court process"),
      c("enforce", "enforce", "verb", "B2", "neutral", ["W", "S"], "thực thi (luật)", "to make sure a law is obeyed", `Police ${hi("enforce")} traffic laws.`, ["impose"], [], ["enforce the law"], "Thực thi pháp luật", "Law enforcement"),
      c("punishment", "punishment", "noun", "A2", "neutral", ["W", "S"], "hình phạt", "a penalty for wrongdoing", `Severe ${hi("punishment")} may not reduce crime.`, ["penalty"], ["reward"], ["capital punishment"], "Cơ bản về tội phạm", "Basic crime vocabulary"),
      c("victim", "victim", "noun", "A2", "neutral", ["W", "S", "R"], "nạn nhân", "someone harmed by crime", `Support for ${hi("victims")} is essential.`, [], ["offender"], ["crime victim"], "Tội phạm & nạn nhân", "Crime & victims"),
    ],
    quiz: [
      q("'a deterrent' là:", "'a deterrent' is:", ["thứ khuyến khích", "yếu tố răn đe", "hình phạt nhẹ"], 1, "deterrent = thứ răn đe.", "deterrent = something that discourages."),
      q("Trái nghĩa của 'lenient':", "Antonym of 'lenient':", ["soft", "mild", "harsh"], 2, "harsh = nghiêm khắc.", "harsh = severe."),
      q("'rehabilitation' nhấn vào:", "'rehabilitation' emphasises:", ["trừng phạt", "cải tạo & tái hoà nhập", "giám sát"], 1, "rehabilitation = cải tạo.", "rehabilitation = reform & reintegration."),
    ],
  },
  {
    id: "academic-verbs", name: "Động từ học thuật (AWL) / Academic verbs",
    cards: [
      c("analyse", "analyse", "verb", "B2", "formal", ["W", "S", "R"], "phân tích", "to examine in detail", `Researchers ${hi("analysed")} the data.`, ["examine", "evaluate"], [], ["analyse data", "analyse trends"], "Mọi đề; thay 'look at'", "Any topic; replaces 'look at'"),
      c("demonstrate", "demonstrate", "verb", "B2", "formal", ["W", "S"], "chứng minh, thể hiện", "to show clearly", `Results ${hi("demonstrate")} a link.`, ["show", "prove"], ["disprove"], ["demonstrate that"], "Dẫn bằng chứng", "Introducing evidence"),
      c("facilitate", "facilitate", "verb", "C1", "formal", ["W"], "tạo điều kiện", "to make easier", `Technology can ${hi("facilitate")} learning.`, ["enable", "ease"], ["hinder", "impede"], ["facilitate access"], "Công cụ/chính sách giúp gì dễ hơn", "Tools/policies that ease things"),
      c("implement", "implement", "verb", "B2", "formal", ["W", "S"], "triển khai", "to put a plan into action", `The government ${hi("implemented")} reforms.`, ["enact", "carry out"], ["abolish"], ["implement a policy"], "Phần giải pháp", "Solutions sections"),
      c("indicate", "indicate", "verb", "B2", "formal", ["W", "R"], "cho thấy, chỉ ra", "to show or suggest", `The survey ${hi("indicates")} a shift.`, ["suggest", "signal"], [], ["studies indicate"], "Dẫn số liệu thận trọng", "Introducing data cautiously"),
      c("evaluate", "evaluate", "verb", "B2", "formal", ["W", "S"], "đánh giá", "to judge the value of", `We must ${hi("evaluate")} the effects.`, ["assess", "appraise"], [], ["evaluate the impact"], "Đề cân nhắc lợi hại", "Weighing pros and cons"),
      c("emphasise", "emphasise", "verb", "B2", "formal", ["W", "S"], "nhấn mạnh", "to give special importance", `Experts ${hi("emphasise")} early education.`, ["stress", "highlight"], [], ["emphasise the need"], "Làm nổi bật một ý", "Highlighting a point"),
      c("derive", "derive", "verb", "C1", "formal", ["W", "R"], "có được, bắt nguồn", "to obtain from a source", `Benefits ${hi("derived")} from exercise are clear.`, ["obtain", "gain"], [], ["derive from", "derive benefit"], "Nói nguồn gốc/lợi ích", "Origins or benefits"),
      c("attribute", "attribute", "verb", "C1", "formal", ["W", "R"], "quy cho, cho là do", "to say something is caused by", `Success is ${hi("attributed")} to hard work.`, ["ascribe", "credit"], [], ["attribute X to Y"], "Nói nguyên nhân", "Stating causes"),
    ],
    quiz: [
      q("'demonstrate' gần nghĩa nhất:", "'demonstrate' is closest to:", ["disprove", "show/prove", "ignore"], 1, "demonstrate = chứng minh.", "demonstrate = to show clearly."),
      q("Trái nghĩa của 'facilitate':", "Antonym of 'facilitate':", ["enable", "ease", "hinder"], 2, "hinder = cản trở.", "hinder = to obstruct."),
      q("'implement a policy' nghĩa là:", "'implement a policy' means to:", ["bãi bỏ", "triển khai", "phản đối"], 1, "implement = thực thi.", "implement = to put into action."),
    ],
  },
  {
    id: "trends-data", name: "Mô tả xu hướng / Trends & data",
    cards: [
      c("surge", "surge", "verb/noun", "C1", "neutral", ["W", "S"], "tăng vọt", "to rise suddenly and strongly", `Online sales ${hi("surged")}.`, ["soar", "rocket"], ["plummet"], ["a surge in demand"], "Tăng mạnh (Task 1)", "Sharp rises (Task 1)"),
      c("plummet", "plummet", "verb", "C1", "neutral", ["W"], "giảm mạnh, lao dốc", "to fall steeply", `Prices ${hi("plummeted")} after the crash.`, ["plunge", "tumble"], ["soar", "surge"], ["plummet sharply"], "Sụt giảm đột ngột", "Sudden drops"),
      c("fluctuate", "fluctuate", "verb", "C1", "neutral", ["W"], "dao động lên xuống", "to rise and fall irregularly", `Temperatures ${hi("fluctuated")} all year.`, ["vary", "oscillate"], ["stabilise"], ["fluctuate wildly"], "Số liệu thất thường", "Erratic figures"),
      c("plateau", "plateau", "verb/noun", "C2", "neutral", ["W"], "chững lại, đi ngang", "to stop rising and stay level", `Growth ${hi("plateaued")} late in the year.`, ["level off"], ["surge"], ["reach a plateau"], "Tăng rồi đi ngang", "Rises then flattens"),
      c("steadily", "steadily", "adv", "B2", "neutral", ["W", "S"], "đều đặn, ổn định", "gradually and consistently", `Enrolment rose ${hi("steadily")}.`, ["gradually"], ["sharply"], ["rise steadily"], "Thay đổi từ từ", "Gradual change"),
      c("negligible", "negligible", "adj", "C1", "formal", ["W"], "không đáng kể", "too small to matter", `The difference was ${hi("negligible")}.`, ["insignificant"], ["substantial"], ["a negligible amount"], "Mức thay đổi rất nhỏ", "Very small change"),
      c("peak", "peak", "verb/noun", "B2", "neutral", ["W"], "đạt đỉnh", "to reach the highest point", `Sales ${hi("peaked")} in December.`, ["climax"], ["bottom out"], ["peak at", "reach a peak"], "Điểm cao nhất", "Highest point"),
      c("decline", "decline", "verb/noun", "B1", "neutral", ["W", "R"], "giảm, suy giảm", "to decrease", `Birth rates continue to ${hi("decline")}.`, ["fall", "drop"], ["rise"], ["a sharp decline"], "Xu hướng giảm", "Downward trends"),
      c("double", "double", "verb", "A2", "neutral", ["W"], "tăng gấp đôi", "to become twice as much", `Membership ${hi("doubled")} in a year.`, ["triple (x3)"], ["halve"], ["double in size"], "Mô tả bội số đơn giản", "Simple multiples"),
    ],
    quiz: [
      q("Trái nghĩa của 'surge':", "Antonym of 'surge':", ["soar", "plummet", "climb"], 1, "plummet = lao dốc.", "plummet = to fall steeply."),
      q("'plateau' (số liệu) nghĩa là:", "'plateau' (data) means to:", ["tăng vọt", "chững lại đi ngang", "giảm sâu"], 1, "plateau = đi ngang.", "plateau = to level off."),
      q("'negligible' nghĩa là:", "'negligible' means:", ["rất lớn", "không đáng kể", "tăng nhanh"], 1, "negligible = nhỏ tới mức bỏ qua.", "negligible = too small to matter."),
    ],
  },
  {
    id: "travel-culture", name: "Du lịch & Văn hóa / Travel & Culture",
    cards: [
      c("heritage", "heritage", "noun", "B2", "neutral", ["W", "S"], "di sản", "valued traditions/buildings from the past", `The city has rich cultural ${hi("heritage")}.`, ["legacy"], [], ["cultural heritage", "heritage site"], "Bảo tồn, du lịch di sản", "Conservation, heritage tourism"),
      c("immerse", "immerse", "verb", "C1", "neutral", ["W", "S"], "đắm mình vào", "to involve yourself deeply", `Travel lets you ${hi("immerse")} yourself in a culture.`, ["absorb"], [], ["immerse yourself in"], "Trải nghiệm sâu", "Deep experiences"),
      c("authentic", "authentic", "adj", "B2", "neutral", ["W", "S"], "đích thực, nguyên bản", "genuine, not fake", `Tourists seek ${hi("authentic")} experiences.`, ["genuine", "real"], ["fake"], ["authentic cuisine"], "Trải nghiệm thật", "Genuine experiences"),
      c("landmark", "landmark", "noun", "B2", "neutral", ["S", "R"], "địa danh nổi bật", "a famous building/place", `The tower is a famous ${hi("landmark")}.`, ["monument"], [], ["historic landmark"], "Speaking Part 2 tả nơi chốn", "Speaking Part 2 places"),
      c("commercialised", "commercialised", "adj", "C1", "neutral", ["W", "S"], "bị thương mại hoá", "made too focused on profit", `The town has become over-${hi("commercialised")}.`, ["commoditised"], ["unspoilt"], ["heavily commercialised"], "Mặt trái du lịch đại trà", "Downsides of mass tourism"),
      c("ubiquitous", "ubiquitous", "adj", "C2", "formal", ["W"], "có mặt khắp nơi", "found everywhere", `Fast food is now ${hi("ubiquitous")}.`, ["omnipresent"], ["rare"], ["a ubiquitous presence"], "Văn hoá toàn cầu lan rộng", "Spread of global culture"),
      c("destination", "destination", "noun", "A2", "neutral", ["W", "S"], "điểm đến", "a place you travel to", `Bali is a popular ${hi("destination")}.`, [], [], ["tourist destination"], "Du lịch cơ bản", "Basic travel"),
      c("customs", "customs", "noun", "B1", "neutral", ["W", "S"], "phong tục", "traditional practices", `Respect local ${hi("customs")} when abroad.`, ["traditions"], [], ["local customs"], "Văn hoá, ứng xử", "Culture, etiquette"),
      c("souvenir", "souvenir", "noun", "A2", "neutral", ["S"], "đồ lưu niệm", "an item kept to remember a trip", `She bought a ${hi("souvenir")} at the market.`, [], [], ["buy a souvenir"], "Speaking đời thường", "Everyday Speaking"),
    ],
    quiz: [
      q("Trái nghĩa của 'authentic':", "Antonym of 'authentic':", ["genuine", "real", "fake"], 2, "authentic = đích thực; trái fake.", "authentic = genuine; opposite fake."),
      q("'immerse yourself in a culture' là:", "'immerse yourself in a culture' means to:", ["tránh né", "hoà mình vào", "ghi chép"], 1, "immerse = đắm mình.", "immerse = to dive deeply into."),
      q("'ubiquitous' nghĩa là:", "'ubiquitous' means:", ["hiếm có", "có mặt khắp nơi", "đắt đỏ"], 1, "ubiquitous = khắp nơi.", "ubiquitous = everywhere."),
    ],
  },
  {
    id: "money-finance", name: "Tiền & Tài chính / Money & Finance",
    cards: [
      c("expenditure", "expenditure", "noun", "C1", "formal", ["W", "R"], "chi tiêu", "money spent", `Public ${hi("expenditure")} on health rose.`, ["spending", "outlay"], ["income"], ["public expenditure"], "Ngân sách, chi tiêu", "Budgets, spending"),
      c("frugal", "frugal", "adj", "C1", "neutral", ["W", "S"], "tằn tiện", "careful with money", `A ${hi("frugal")} lifestyle helps saving.`, ["thrifty"], ["extravagant"], ["frugal lifestyle"], "Thói quen chi tiêu", "Spending habits"),
      c("subsidy", "subsidy", "noun", "C1", "formal", ["W", "R"], "khoản trợ cấp", "money given by the state", `${hi("Subsidies")} keep transport affordable.`, ["grant"], ["tax"], ["government subsidy"], "Chính sách kinh tế", "Economic policy"),
      c("affordable", "affordable", "adj", "B2", "neutral", ["W", "S"], "vừa túi tiền", "not too expensive", `Cities need ${hi("affordable")} housing.`, ["reasonable"], ["expensive"], ["affordable housing"], "Nhà ở, chi phí sống", "Housing, cost of living"),
      c("lavish", "lavish", "adj", "C1", "neutral", ["W", "S"], "xa hoa", "very generous/extravagant", `They spent ${hi("lavish")} sums.`, ["extravagant", "opulent"], ["modest", "frugal"], ["lavish spending"], "Tiêu xài xa xỉ", "Extravagant spending"),
      c("accumulate", "accumulate", "verb", "C1", "formal", ["W"], "tích lũy dần", "to build up over time", `Small savings ${hi("accumulate")}.`, ["amass", "build up"], ["dissipate"], ["accumulate wealth"], "Tích luỹ tài sản/nợ", "Building wealth or debt"),
      c("budget", "budget", "noun/verb", "B1", "neutral", ["W", "S"], "ngân sách; lập ngân sách", "a plan for money", `Stick to a monthly ${hi("budget")}.`, [], [], ["on a tight budget"], "Quản lý tiền", "Managing money"),
      c("invest", "invest", "verb", "B1", "neutral", ["W", "S"], "đầu tư", "to put money to gain profit", `Governments should ${hi("invest")} in schools.`, [], [], ["invest in"], "Phần giải pháp", "Solutions"),
      c("debt", "debt", "noun", "A2", "neutral", ["W", "S", "R"], "khoản nợ", "money owed", `Many students fall into ${hi("debt")}.`, [], [], ["fall into debt", "national debt"], "Tài chính cá nhân", "Personal finance"),
    ],
    quiz: [
      q("Trái nghĩa của 'frugal':", "Antonym of 'frugal':", ["thrifty", "economical", "extravagant"], 2, "extravagant = phung phí.", "extravagant = wasteful."),
      q("'subsidy' là:", "'subsidy' is:", ["khoản thuế", "khoản trợ cấp", "khoản nợ"], 1, "subsidy = trợ cấp.", "subsidy = state support."),
      q("'affordable housing' là nhà ở:", "'affordable housing' is housing that is:", ["xa xỉ", "vừa túi tiền", "bỏ hoang"], 1, "affordable = trong khả năng chi trả.", "affordable = within budget."),
    ],
  },
  {
    id: "science-research", name: "Khoa học & Nghiên cứu / Science & Research",
    cards: [
      c("hypothesis", "hypothesis", "noun", "C1", "formal", ["W", "R"], "giả thuyết", "a proposed explanation to test", `The study tested a clear ${hi("hypothesis")}.`, ["theory", "premise"], [], ["test a hypothesis"], "Chủ đề nghiên cứu", "Research topics"),
      c("breakthrough", "breakthrough", "noun", "B2", "neutral", ["W", "S"], "bước đột phá", "an important discovery", `The vaccine was a major ${hi("breakthrough")}.`, ["advance"], ["setback"], ["a medical breakthrough"], "Thành tựu lớn", "Major achievements"),
      c("empirical", "empirical", "adj", "C2", "formal", ["W"], "dựa trên thực nghiệm", "based on observation/evidence", `There is little ${hi("empirical")} evidence.`, ["evidence-based"], ["anecdotal"], ["empirical evidence"], "Tăng độ học thuật", "Adds academic weight"),
      c("conduct", "conduct", "verb", "B2", "formal", ["W", "R"], "tiến hành (nghiên cứu)", "to carry out", `Scientists ${hi("conducted")} a study.`, ["carry out"], [], ["conduct research", "conduct a survey"], "Dẫn việc nghiên cứu", "Introducing studies"),
      c("innovation2", "innovation", "noun", "B2", "neutral", ["W", "S"], "sự đổi mới, sáng kiến", "a new idea or method", `${hi("Innovation")} drives progress.`, ["invention"], ["stagnation"], ["scientific innovation"], "Tiến bộ khoa học", "Scientific progress"),
      c("groundbreaking", "groundbreaking", "adj", "C1", "neutral", ["W", "S"], "tiên phong, mở đường", "highly original and important", `The study produced ${hi("groundbreaking")} findings.`, ["pioneering"], ["conventional"], ["groundbreaking research"], "Khen nghiên cứu đột phá", "Praising key research"),
      c("evidence", "evidence", "noun", "B1", "neutral", ["W", "R"], "bằng chứng", "facts that prove something", `There is strong ${hi("evidence")} for this.`, ["proof"], [], ["scientific evidence"], "Lập luận có dẫn chứng", "Evidence-based argument"),
      c("experiment", "experiment", "noun/verb", "A2", "neutral", ["W", "S", "R"], "thí nghiệm", "a scientific test", `They ran a controlled ${hi("experiment")}.`, ["trial", "test"], [], ["conduct an experiment"], "Khoa học cơ bản", "Basic science"),
    ],
    quiz: [
      q("'conduct research' nghĩa là:", "'conduct research' means to:", ["dừng nghiên cứu", "tiến hành nghiên cứu", "công bố"], 1, "conduct = tiến hành.", "conduct = to carry out."),
      q("'empirical evidence' là bằng chứng:", "'empirical evidence' is evidence based on:", ["thực nghiệm/quan sát", "cảm tính", "tin đồn"], 0, "empirical = dựa thực nghiệm.", "empirical = based on observation."),
      q("Trái nghĩa của 'breakthrough':", "Antonym of 'breakthrough':", ["advance", "discovery", "setback"], 2, "setback = bước lùi.", "setback = a reversal."),
    ],
  },
];

export const VOCAB_SOURCES: { name: string; url: string; note: { vi: string; en: string } }[] = [
  { name: "Academic Word List (AWL)", url: "https://www.victoria.ac.nz/lals/resources/academicwordlist", note: { vi: "570 word family hay gặp nhất trong văn học thuật (Coxhead) — nền tảng band 7+.", en: "The 570 most frequent academic word families (Coxhead) — a band-7+ foundation." } },
  { name: "British Council — Vocabulary", url: "https://learnenglish.britishcouncil.org/vocabulary", note: { vi: "Bài học từ vựng theo chủ đề, có ví dụ và bài tập.", en: "Topic-based vocabulary lessons with examples and exercises." } },
  { name: "Cambridge Dictionary", url: "https://dictionary.cambridge.org/", note: { vi: "Tra nghĩa, phát âm, collocation chuẩn Anh-Anh.", en: "Definitions, pronunciation and collocations (British English)." } },
  { name: "IELTS Liz — Vocabulary", url: "https://ieltsliz.com/ielts-vocabulary/", note: { vi: "Từ vựng theo chủ đề và theo dạng câu hỏi, do giáo viên IELTS soạn.", en: "Vocabulary by topic and question type, written by an IELTS teacher." } },
];
