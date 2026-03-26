import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, X } from 'lucide-react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

const timelineData = [
  {
    year: '1885',
    title: '初刊与开场',
    desc: '系列在秋天开始刊行，确立月下人物的整体基调。',
    intro: '最初几幅作品已经显出《月百姿》的核心气质：月色、停顿、人物与夜的距离。'
  },
  {
    year: '1886',
    title: '系列展开',
    desc: '题材逐渐丰富，月下人物开始形成群像。',
    intro: '这一阶段里，历史、传说与抒情场景逐渐并置，系列的观看方式开始变得更加多层。'
  },
  {
    year: '1887–1888',
    title: '人物群像渐丰',
    desc: '历史、女性、传说与诗意场景持续扩展。',
    intro: '《月百姿》逐渐不只是一个主题系列，而更像一座在月夜中展开的人物剧场。'
  },
  {
    year: '1889–1892',
    title: '晚期成熟与完成',
    desc: '系列在芳年晚年走向成熟，并最终完成。',
    intro: '晚期阶段的作品更显沉静、凝练，也让整套系列拥有了完整的终章感。'
  }
];

const phaseFromIndex = (idx) => {
  if (idx <= 20) return { phase: '1885', year: '1885' };
  if (idx <= 45) return { phase: '1886', year: '1886' };
  if (idx <= 75) return { phase: '1887–1888', year: idx % 2 === 0 ? '1887' : '1888' };
  return { phase: '1889–1892', year: `${1889 + ((idx - 76) % 4)}` };
};

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

const allWorks = Array.from({ length: 100 }, (_, i) => {
  const index = i + 1;
  const phaseMeta = phaseFromIndex(index);
  const imageCandidates = buildImageCandidates(index);

  return {
    id: `w${String(index).padStart(3, '0')}`,
    title: `月百姿 第${index}幅`,
    year: phaseMeta.year,
    phase: phaseMeta.phase,
    desc: `《月百姿》占位说明：第 ${index} 幅，后续可替换为正式作品标题与策展文本。`,
    imageCandidates,
    image: imageCandidates[0]
  };
});

const featuredWorks = allWorks.slice(0, 12);

const navItems = [
  ['首页', 'hero'],
  ['关于《月百姿》', 'about'],
  ['时间线', 'timeline'],
  ['阶段展开', 'detail'],
  ['精选作品', 'selected'],
  ['全部作品', 'all-works'],
  ['为什么是月', 'moon']
];

const sectionMotion = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const heroBackdropImages = [
  encodeURI('/images/works/moon -24.jpg')
];

function ArtworkImage({ src, srcList = [], alt, className }) {
  const candidates = srcList.length > 0 ? srcList : src ? [src] : [];
  const [index, setIndex] = useState(0);

  const currentSrc = candidates[index];
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
        <p className="text-xs text-gold">{work.phase}</p>
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
        <ArtworkImage srcList={work.imageCandidates} alt={work.title} className="mt-8 h-72" />
        <p className="mt-8 leading-8 text-moon/85">{work.desc}</p>
        <Link to="/" className="mt-8 inline-flex rounded-full border border-gold/40 px-5 py-2 text-sm hover:bg-gold/10">返回展览首页</Link>
      </div>
    </main>
  );
}

function HomePage() {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activePhase = timelineData[active];

  const phaseWorks = useMemo(
    () => allWorks.filter((item) => item.phase === activePhase.year).slice(0, 3),
    [activePhase.year]
  );

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
            {heroBackdropImages.map((src, idx) => (
              <div key={src} className="relative h-full min-h-[420px]">
                <img src={src} alt={`hero-bg-${idx + 1}`} className="h-full w-full object-cover opacity-32" loading="lazy" />
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
              <a href="#timeline" className="rounded-full border border-gold/60 bg-gold/10 px-5 py-2 text-sm">进入时间线</a>
              <a href="#selected" className="rounded-full border border-haze/40 px-5 py-2 text-sm">浏览精选</a>
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

        <motion.section id="timeline" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-24">
          <div className="mb-8 flex items-center gap-3">
            <Moon size={16} className="text-gold" />
            <h2 className="font-serifCn text-3xl">时间线</h2>
          </div>
          <div className="hidden gap-4 md:grid md:grid-cols-4">
            {timelineData.map((item, idx) => (
              <button key={item.year} onClick={() => setActive(idx)} className={`rounded-xl border p-4 text-left transition ${idx === active ? 'border-gold bg-gold/10 shadow-moon' : 'border-haze/25 bg-panel/50 hover:border-haze/50'}`}>
                <p className="text-xs tracking-[0.18em] text-haze">{item.year}</p>
                <h3 className="mt-2 font-serifCn text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-moon/70">{item.desc}</p>
                <div className="mt-4 h-20 rounded border border-haze/20 bg-gradient-to-b from-haze/15 to-panel" />
              </button>
            ))}
          </div>
          <div className="space-y-3 md:hidden">
            {timelineData.map((item, idx) => (
              <button key={item.year} onClick={() => setActive(idx)} className={`w-full rounded-xl border p-4 text-left ${idx === active ? 'border-gold bg-gold/10' : 'border-haze/25 bg-panel/50'}`}>
                <p className="text-xs text-haze">{item.year}</p>
                <h3 className="font-serifCn text-xl">{item.title}</h3>
                <p className="mt-1 text-sm text-moon/70">{item.desc}</p>
              </button>
            ))}
          </div>
        </motion.section>

        <motion.section id="detail" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 rounded-2xl border border-haze/20 bg-panel/50 p-8">
          <h3 className="font-serifCn text-2xl">{activePhase.year}｜{activePhase.title}</h3>
          <p className="mt-4 max-w-3xl leading-8 text-moon/80">{activePhase.intro}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {phaseWorks.map((work) => <WorkCard key={work.id} work={work} />)}
          </div>
          <a href="#all-works" className="mt-6 inline-flex rounded-full border border-haze/40 px-5 py-2 text-sm">查看更多</a>
        </motion.section>

        <motion.section id="selected" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-24">
          <h2 className="mb-6 font-serifCn text-3xl">精选作品（12）</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWorks.map((work) => <WorkCard key={work.id} work={work} />)}
          </div>
        </motion.section>

        <motion.section id="all-works" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-24">
          <h2 className="mb-6 font-serifCn text-3xl">全部作品（100）</h2>
          <p className="mb-6 text-sm text-moon/70">已自动尝试多种命名：moon -1.jpg、moon-1.jpg、w001.jpg / .jpeg / .png。</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {allWorks.map((work) => <WorkCard key={work.id} work={work} compact />)}
          </div>
        </motion.section>

        <motion.section id="moon" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-24 rounded-2xl border border-haze/20 bg-panel/50 p-8">
          <h2 className="font-serifCn text-3xl">为什么是月</h2>
          <div className="mt-5 max-w-4xl space-y-4 leading-8 text-moon/80">
            <p>在《月百姿》中，月不是背景装饰，而是组织叙事的结构。它把不同历史时期、不同身份人物放在同一片冷光之下，建立可比较的情绪场。</p>
            <p>月也让观看产生距离：人物并不直接向观者诉说，而是在侧身、回望、停顿之间保留余白。我们看到的不止是动作，更是动作之前与之后的静默。</p>
            <p>因此，这组作品可以被读成一部由月光串联的长卷。每一幅独立成立，每一幅又彼此回应，在时间里形成缓慢而持久的回声。</p>
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
