import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, X } from 'lucide-react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

const buildImageCandidates = (index) => {
  const id = String(index).padStart(3, '0');
  return [
    `/images/works/moon -${index}.jpg`,
    `/images/works/moon-${index}.jpg`,
    `/images/works/w${id}.jpg`,
    `/images/works/w${id}.jpeg`,
    `/images/works/w${id}.png`,
    `/images/works/${id}.jpg`,
    `/images/works/${id}.jpeg`,
    `/images/works/${id}.png`
  ].map((item) => encodeURI(item));
};


const workMetadata = {
  'moon -1': {
    title: '高尾太夫',
    jp: '君は今驹かたあたりほとゝきす　たか雄',
    desc: '高尾太夫，是吉原太夫的第一位源氏名（仿效源氏物语，为女性所取的名字）。高尾太夫是吉原最著名的游女（即妓女），名称世代相袭。图中所绘是第二代高尾太夫，她和服上散落的枫叶图案应是指高尾山，东京近郊的赏枫名所。诗句“你如今已近我马肩，如杜鹃般啼鸣”被认为是写给仙台藩第三代藩主伊达纲宗的，他曾打算赎回高尾的自由。诗中暗示纲宗的船刚刚告别，正驶向驹形。在“三俣的传闻”中，二代高尾虽被纲宗买断了契约，却为了心爱之人投江自尽，触怒了纲宗，最终被倒吊处死。'
  },
  'moon -2': {
    title: '祇园町',
    jp: '祇园まち',
    desc: '一位年轻的武士少年，刘海尚存，中间剃光的部分露出，他和服上绣着双勾玉纹样，羽织外套上的山形图案以及标题“祗园町”来看，这幅画描绘的应当是大石力也将一封密信送到京都祗园町的一力茶屋的情节。力也当时是大石藏之助的长子，年仅十六岁，因此画中他留着刘海，少年的模样也合情合理。这幅画作取材于歌舞伎剧《假名手本忠臣藏》。'
  },
  'moon -3': {
    title: '嫦娥奔月',
    jp: '嫦娥奔月',
    desc: '一个对中国人来说耳熟能详的故事。'
  },
  'moon -4': {
    title: '南屏山昇月',
    jp: '南屏山昇月',
    desc: '应是苏轼在《赤壁赋》中所描绘的：“酾酒临江，横槊赋诗”的场景。曹操于建安十三年前往赤壁之战途中，在赤壁东侧南屏山上眺望月亮升起的情景。这幅画的构图别具匠心，曹操站在船头，手持长矛，迎着西北风。此时的曹操对次日的胜利充满信心，向长江中斟酒祭祀神灵，并吟诵《短歌行》。'
  },
  'moon -5': {
    title: '名月映松影 / 月光洒落榻榻米，松影婆娑摇曳',
    jp: '名月や畳の上に松の影　其角',
    desc: '这幅画描绘了著名俳句大师宝井其角（1661-1707）的一首诗：“月光洒落榻榻米，松影婆娑摇曳”。描述农历中秋之月光将松影映照在榻榻米上的样子。其角作为松尾芭蕉门下十哲之一，作风奢侈，常带美人饮酒作乐。手持团扇、躺卧在榻榻米上的美人，身穿秋海棠纹路的和服，和屏风上的红叶图案，正对应着其角生活中真实的秋日之景。'
  },
  'moon -6': {
    title: '史家村月夜',
    jp: '史家村月夜',
    desc: '即《水浒传》中的著名英雄人物——九纹龙史进。他是《水浒传》中第一个出场的好汉，是中国传统文化中典型的有情有义、仗义疏财的侠客。史进出生在华阴县史家村，为当地富户史太公之子，因身上刺有九条龙而人称九纹龙。图中，史进正坐在故乡家中柳树环绕的藤椅上，手持蒲扇望月纳凉。'
  },
  'moon -7': {
    title: '稻叶山之月',
    jp: '稲叶山の月',
    desc: '画面中一位武士装扮的人正背负葫芦，攀登悬崖，背后是一轮满月。据标题《稻叶山之月》可知，这幅画描绘的应该是日本战国世代的稻叶山城之战，该战是织田氏攻击美浓国斋藤氏的战争，最后以织田信长的胜利告终。'
  },
  'moon -8': {
    title: '月下的斥候',
    jp: '月下の斥候　斎藤利三',
    desc: `“月下的斥候”指的是斋藤利三。“斥候”即侦察兵之意（多见于中国古籍）。利三是明智光秀的高级家臣，也是一位武士，在本能寺之变中，他为迫使织田信长和织田信忠自尽发挥了关键作用。他出身于与明智光秀有亲缘关系的美浓斋藤氏，但他更为人所知的身份可能是“福”（后被称为“春日局”）的父亲。
明智光秀与羽柴秀吉在京都山崎展开决战的前一天。当时，光秀和羽柴秀吉刚刚从对毛利氏的战役中凯旋而归。光秀和羽柴秀吉在道贺峠侦察羽柴秀吉的筒井顺庆的营地。画中人物静静地骑在马上，右手持薙刀，左手遮挡月光。对岸的晨曦象征着黎明的曙光。`
  },
  'moon -9': {
    title: '朝野川晴雪月',
    jp: '朝野川晴雪月　孝女ちか子',
    desc: '积雪朝野川，女孩双手紧握，裙裾翻舞，和纸四散。两只白鹭飞舞，似乎要将女孩的灵魂携往月亮。这是一副讲述一位名叫“千佳子”的女孩溺亡在朝野川的故事。在故事中，她是石川县金泽一带有名的商人善哉五兵卫的孙女，五兵卫因涉嫌走私而全家被捕。千佳子为了保全与祖父一同被囚禁的父亲而跳下朝野川溺亡。这是一个孝顺女儿的故事（但不提倡），类似于中国的《二十四孝》。'
  },
  'moon -10': {
    title: '四条纳凉',
    jp: '四条纳凉',
    desc: '此画描绘的是京都四条河原一带的傍晚时分，人们在此享受清凉的晚风。四条河原位于鸭川河岸，介于四条大桥和三条大桥附近。每年农历六月七日至十八日，祇园祭的移动神社都会出现在四条河原，此时正是享受清凉晚风的最佳时节。祇园祭期间，四条街一片繁荣，河岸边挤满了前来享受清凉的人们，他们从茶馆里摆放长凳开始，热闹非凡。'
  },
  'moon -11': {
    title: '雨后的山月',
    jp: '雨后の山月　时致',
    desc: '《曾我物语》是日本镰仓时代著名的军记物语，讲述了曾我十郎佑成和五郎时致两兄弟，在源赖朝的富士山狩猎场砍伐父仇人工藤佑经的报仇事件，该事件为日本三大复仇事件之一，宣扬了孝道、武士忠义与英雄主义。在该画中，一只杜鹃鸟凌驾于月亮之上，应是暗示此时的五月雨。'
  },
  'moon -12': {
    title: '吉野山夜半月',
    jp: '吉野山夜半月　伊贺局',
    desc: `这幅作品描绘的是南朝女官伊贺局在吉野月夜中遭遇“化物”的一幕。

故事见于室町时期说话集《吉野拾遺》“伊賀局化物に遇ふ事”。伊賀局侍奉新待贤门院，后醍醐天皇去世后，吉野一带不断传出有“化物”出没，宫中人心惶惶。

在一个炎热的夏夜，大约六月十日左右，伊贺局漫步于花园，见一棵高大的松树枝条低垂，明月高悬，便情不自禁地吟诵起一首诗：“被风吹散，渴望清凉，月光栖于袖中。”突然，从不该有人出现的松树顶端，传来一声古老诗句的吟诵：“心静则身清。”她抬头望去，只见一个形似恶魔的妖怪，双翼展开，双目比月光还要明亮，正俯视着伊贺夫人。她询问妖怪的名字，妖怪回答说“藤原基任”，说自己生前曾为新待贤门院尽心效力，却在死后长期未获追荐，因此怨念不散，才化作此形，夜夜作祟。他请求伊賀局代为转达，希望门院为自己修法超度，并说明《法华经》最为相宜。伊賀局回宫后如实禀报，门院听后深感惭愧，次日便命法师连续为其做《法华经》佛事。此后，吉野再无怪异。`
  },
  'moon -13': {
    title: '捣衣闻月',
    jp: 'から衣うつ音きけは月きよみ またねぬ人を空にしるかな　経信',
    desc: '图中人物是平安世代后期的公卿、歌人源经信，出身宇多源氏。他此刻正注视着一支巨大的、毛绒绒的右脚。这是一个流传在日本的佛教故事，这个庞大的怪物似乎是来自朱雀门的妖怪，人们祈祷请菩萨保佑时，妖怪就会消失。'
  },
  'moon -14': {
    title: '大物海上月',
    jp: '大物海上月　弁庆',
    desc: '图中描绘的是武藏坊弁庆在海上遇到狂风巨浪的画面。“狂风巨浪”是平知盛的亡灵在阻挡船只前行的表现。弁庆早年追随源义经讨伐平氏，战功累累。后来坛之浦一战，平氏覆灭。源义经却随之遭到兄长源赖朝的猜忌，不得不带着家臣远走。在前往九州的海上，平氏的亡灵袭击了源义经一行。'
  },
  'moon -15': {
    title: '吼哕',
    jp: '吼哕',
    desc: `“吼哕”一词来源于日语中狐狸的叫声，意指狐狸。该画取材于日本的稻荷神传说：一只老狐狸，或者说白狐，全家都被猎人捕获，于是化身为猎人的叔叔——少林寺的僧人白藏祖，前往猎人处。他以稻荷神的法力以及妖狐玉藻前的传说为依据，宣扬狐狸诅咒的恐怖，劝说猎人停止捕狐。在返回的路上，他发现了猎人丢弃的用来诱捕狐狸的豆腐，抵挡不住诱惑，卸下伪装，回到豆腐旁。猎人察觉到这一点，设下陷阱，狐狸显露真身，落入陷阱。但最终，他设法挣脱束缚，逃脱了。

这幅作品描绘了化身为白藏祖的老狐狸在返程途中，于弯月下观察着周围的环境。他或许是因为成功说服了猎人而沾沾自喜，又或许是因为找到了诱饵——炸豆腐，即将显露出真面目。环绕着白藏祖的蒲苇叶和羽毛并不写实，反而似乎是为了营造一种奇异而诱人的氛围。这或许是某个被猎人引诱而丧命的家庭的亡灵。他藏起的狐狸尾巴撑起长袍后摆的模样，以及他手持拐杖转身的动作，都颇具滑稽之感……弯月的明亮似乎恰到好处地衬托出老狐狸即将显露真面目的景象。`
  }
};

const allWorks = Array.from({ length: 100 }, (_, i) => {
  const index = i + 1;
  const imageCandidates = buildImageCandidates(index);
  const fileBase = `moon -${index}`;
  const meta = workMetadata[fileBase];

  return {
    id: `w${String(index).padStart(3, '0')}`,
    fileBase,
    title: meta?.title ?? `月百姿 第${index}幅`,
    year: index <= 20 ? '1885' : index <= 45 ? '1886' : index <= 75 ? '1887–1888' : '1889–1892',
    phase: index <= 20 ? '1885' : index <= 45 ? '1886' : index <= 75 ? '1887–1888' : '1889–1892',
    jp: meta?.jp ?? '',
    desc: meta?.desc ?? `《月百姿》占位说明：第 ${index} 幅，后续可替换为正式作品标题与策展文本。`,
    imageCandidates
  };
});

const featuredWorks = allWorks.slice(0, 12);

const navItems = [
  ['首页', 'hero'],
  ['关于《月百姿》', 'about'],
  ['精品图片', 'selected'],
  ['结语', 'closing']
];

const sectionMotion = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const heroBackdropImages = [encodeURI('/images/works/moon -24.jpg')];

function ArtworkImage({ srcList = [], alt, className }) {
  const [index, setIndex] = useState(0);
  const currentSrc = srcList[index];
  const exhausted = !currentSrc;

  return (
    <div className={`relative overflow-hidden rounded-lg border border-haze/30 bg-gradient-to-b from-paper to-panel/80 ${className}`}>
      {!exhausted ? (
        <img
          src={currentSrc}
          alt={alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setIndex((prev) => prev + 1)}
        />
      ) : (
        <div className="grid h-full w-full place-content-center text-center text-xs leading-6 text-haze">
          图片未找到
          <br />
          请检查 public/images/works 下文件名
        </div>
      )}
    </div>
  );
}

function WorkCard({ work, compact = false }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group rounded-xl border border-haze/20 bg-panel/65 p-4 transition-all duration-500 hover:border-gold/50 hover:shadow-moon"
    >
      <ArtworkImage srcList={work.imageCandidates} alt={work.title} className={compact ? 'mb-3 h-32' : 'mb-4 h-44'} />
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-serifCn text-lg">{work.title}</h3>
          <span className="text-xs text-haze">{work.year}</span>
        </div>
        {!compact && <p className="text-sm text-moon/80">{work.desc}</p>}
      </div>
      <Link
        to={`/works/${work.id}`}
        className="mt-4 inline-flex rounded-full border border-gold/40 px-4 py-2 text-xs tracking-[0.2em] text-moon transition hover:border-gold hover:bg-gold/10"
      >
        进入详情页
      </Link>
    </motion.article>
  );
}

function WorkDetail() {
  const { id } = useParams();
  const work = allWorks.find((item) => item.id === id);

  if (!work) {
    return (
      <main className="min-h-screen bg-ink px-6 py-20 text-moon">
        <p>未找到作品。</p>
        <Link to="/" className="mt-4 inline-block text-gold underline">返回首页</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink px-6 py-12 text-moon sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-haze/20 bg-panel/70 p-8">
        <p className="text-sm tracking-[0.2em] text-haze">{work.phase}</p>
        <h1 className="mt-3 font-serifCn text-4xl">{work.title}</h1>
        <p className="mt-2 text-moon/70">{work.year}</p>
        {work.jp && <p className="mt-2 text-sm text-haze">{work.jp}</p>}
        <ArtworkImage srcList={work.imageCandidates} alt={work.title} className="mt-8 h-72" />
        <p className="mt-8 leading-8 text-moon/85">{work.desc}</p>
        <Link to="/" className="mt-8 inline-flex rounded-full border border-gold/40 px-5 py-2 text-sm hover:bg-gold/10">返回展览首页</Link>
      </div>
    </main>
  );
}

function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-paper text-moon">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-haze/15 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#hero" className="font-serifCn text-lg">月百姿</a>
          <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="menu">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <nav className="hidden gap-5 text-xs md:flex">
            {navItems.map(([label, itemId]) => (
              <a key={itemId} href={`#${itemId}`} className="text-moon/70 transition hover:text-moon">{label}</a>
            ))}
          </nav>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="border-t border-haze/20 bg-paper/95 p-3 md:hidden">
              {navItems.map(([label, itemId]) => (
                <a key={itemId} href={`#${itemId}`} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-moon/80">{label}</a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6">
        <motion.section id="hero" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative overflow-hidden rounded-3xl border border-haze/20 bg-gradient-to-b from-panel via-paper to-paper px-8 py-20 sm:px-14">
          <div className="absolute inset-0">
            {heroBackdropImages.map((src) => (
              <div key={src} className="relative h-full min-h-[420px]">
                <img src={src} alt="hero-bg" className="h-full w-full object-cover opacity-32" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-paper/85 via-paper/70 to-paper/90" />
              </div>
            ))}
          </div>
          <div className="paper absolute inset-0 opacity-40" />
          <div className="relative max-w-3xl space-y-6">
            <p className="font-serifCn text-6xl leading-tight sm:text-7xl">月百姿</p>
            <p className="font-serifCn text-2xl text-moon/85">月冈芳年笔下的月夜人间</p>
            <p className="whitespace-pre-line text-moon/80">一百幅画，一百次月光落下的瞬间。{`\n`}这不是静止的全集，{`\n`}而是一部在岁月中逐渐展开的月夜长卷。</p>
            <div className="flex flex-wrap gap-3">
              <a href="#selected" className="rounded-full border border-gold/60 bg-gold/10 px-5 py-2 text-sm">浏览精品</a>
            </div>
          </div>
        </motion.section>

        <motion.section id="about" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-24 grid gap-8 rounded-2xl border border-haze/20 bg-panel/50 p-8 lg:grid-cols-3">
          <h2 className="font-serifCn text-3xl">关于《月百姿》</h2>
          <div className="space-y-4 text-moon/80 lg:col-span-2">
            <p>《月百姿》是月冈芳年晚年的代表系列，共 100 幅，始于 1885 年秋，至 1892 年完成。</p>
            <p>它以“月”为线索，将历史人物、传说角色、女性形象、幽灵与诗意时刻编织成连续展开的夜之剧场。</p>
            <p>今天重新观看它，不是为了回到过去，而是在当代的速度里，重新学习慢下来观看光、情绪与留白。</p>
          </div>
        </motion.section>

        <motion.section id="selected" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-24">
          <h2 className="mb-6 font-serifCn text-3xl">精品图片展示（12）</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWorks.map((work) => <WorkCard key={work.id} work={work} />)}
          </div>
        </motion.section>

        <motion.section id="closing" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-24 rounded-2xl border border-haze/20 bg-panel/50 p-8">
          <h2 className="font-serifCn text-3xl">结语</h2>
          <div className="mt-5 max-w-4xl space-y-4 leading-8 text-moon/80">
            <p>《月百姿》并非简单的图像汇总，而是由时间缓慢展开的观看路径。</p>
            <p>当人物、传说与情绪被放入同一轮月光下，历史便不再只是一条线，而成为可以被反复凝视的片刻。</p>
            <p>愿你在这些作品中，找到属于自己的那一束月色与停顿。</p>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-haze/20 px-6 py-10 text-sm text-moon/70">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-serifCn text-base text-moon">月百姿</p>
            <p>A digital exhibition on Tsukioka Yoshitoshi&apos;s moonlit world</p>
          </div>
          <a href="#hero" className="rounded-full border border-haze/40 px-4 py-2">Back to top</a>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/works/:id" element={<WorkDetail />} />
    </Routes>
  );
}
