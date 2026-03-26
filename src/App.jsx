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

const allWorks = Array.from({ length: 100 }, (_, i) => {
  const index = i + 1;
  const imageCandidates = buildImageCandidates(index);

  return {
    id: `w${String(index).padStart(3, '0')}`,
    title: `月百姿 第${index}幅`,
    year: index <= 20 ? '1885' : index <= 45 ? '1886' : index <= 75 ? '1887–1888' : '1889–1892',
    phase: index <= 20 ? '1885' : index <= 45 ? '1886' : index <= 75 ? '1887–1888' : '1889–1892',
    desc: `《月百姿》占位说明：第 ${index} 幅，后续可替换为正式作品标题与策展文本。`,
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
