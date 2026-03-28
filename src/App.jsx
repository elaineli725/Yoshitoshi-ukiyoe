import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

const buildImageCandidates = (index) => {
  const base = import.meta.env.BASE_URL;

  return [
    `${base}images/works/moon -${index}.jpg`,
    `${base}images/works/moon -${index}.jpeg`,
    `${base}images/works/moon -${index}.png`,
  ].map((item) => encodeURI(item));
};

const workMetadata = {};


const buildWorks = (metadataMap) => Array.from({ length: 100 }, (_, i) => {
  const index = i + 1;
  const imageCandidates = buildImageCandidates(index);
  const fileBase = `moon -${index}`;
  const meta = metadataMap[fileBase];

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

const navItems = [
  ['首页', 'hero'],
  ['关于《月百姿》', 'about'],
  ['作者简介', 'author'],
  ['结语', 'closing']
];

const sectionMotion = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const heroBackdropImage = encodeURI(`${import.meta.env.BASE_URL}images/works/moon -24.jpg`);


function WorkImage({ work, className = '', alt, fill = false }) {
  const [currentSrc, setCurrentSrc] = useState(work.imageCandidates[0]);
  const [fallbackIndex, setFallbackIndex] = useState(1);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (fallbackIndex < work.imageCandidates.length) {
      setCurrentSrc(work.imageCandidates[fallbackIndex]);
      setFallbackIndex((prev) => prev + 1);
      return;
    }

    setFailed(true);
  };

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-panel/40 px-4 text-center text-xs text-moon/60">
        图片未找到
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt ?? work.title}
      loading="lazy"
      onError={handleError}
      className={`${fill ? 'h-full w-full' : ''} object-contain ${className}`.trim()}
    />
  );
}

function WorkCard({ work }) {
  return (
    <Link
      to={`/works/${work.id}`}
      className="group overflow-hidden rounded-2xl border border-haze/30 bg-panel/35 transition hover:-translate-y-0.5 hover:shadow-moon"
    >
      <div className="w-full" style={{ aspectRatio: '2363 / 3443' }}>
        <WorkImage work={work} fill className="bg-panel/20 p-2" alt={work.title} />
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-moon/50">{work.year}</p>
        <h3 className="font-serifCn text-lg text-moon">{work.title}</h3>
        {work.jp ? <p className="line-clamp-2 text-sm text-moon/75">{work.jp}</p> : null}
      </div>
    </Link>
  );
}

function WorkDetail({ works }) {
  const { id } = useParams();
  const work = works.find((item) => item.id === id);

  if (!work) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-moon sm:px-6">
        <p className="text-sm text-moon/70">未找到对应作品。</p>
        <Link to="/" className="mt-4 inline-block rounded-full border border-haze/40 px-4 py-2 text-sm">
          返回首页
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-moon sm:px-6">
      <Link to="/" className="inline-flex items-center rounded-full border border-haze/40 px-4 py-2 text-sm">
        ← 返回首页
      </Link>

      <section className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-2xl border border-haze/30 bg-panel/30 p-2">
          <div className="w-full" style={{ aspectRatio: '2363 / 3443' }}>
            <WorkImage work={work} fill className="bg-panel/20" alt={work.title} />
          </div>
        </div>

        <article className="rounded-2xl border border-haze/20 bg-panel/35 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-moon/55">{work.year}</p>
          <h1 className="mt-2 font-serifCn text-3xl">{work.title}</h1>
          {work.jp ? <p className="mt-3 text-moon/75">{work.jp}</p> : null}
          <p className="mt-6 whitespace-pre-line leading-8 text-moon/85">{work.desc}</p>
        </article>
      </section>
    </main>
  );
}

function WorksGalleryPage({ works }) {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-10 text-moon sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serifCn text-3xl">作品展示（100）</h1>
        <Link to="/" className="inline-flex items-center rounded-full border border-haze/40 px-4 py-2 text-sm">
          ← 返回首页
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </main>
  );
}

function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-paper text-moon">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-haze/15 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#hero" className="font-serifCn text-2xl text-moon transition hover:text-gold">
            月百姿
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map(([label, itemId]) => (
              <a
                key={itemId}
                href={`#${itemId}`}
                className="text-sm text-moon/80 transition hover:text-gold"
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex rounded-full border border-haze/30 p-2 text-moon md:hidden"
            aria-label="切换导航菜单"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="border-t border-haze/20 bg-paper/95 p-3 md:hidden"
            >
              {navItems.map(([label, itemId]) => (
                <a
                  key={itemId}
                  href={`#${itemId}`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm text-moon/80"
                >
                  {label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 pb-20 pt-24 sm:px-6">
        <motion.section
          id="hero"
          variants={sectionMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-haze/20 px-8 py-20 sm:px-14"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(249, 201, 94, 0.86) 0%, rgba(249, 201, 94, 0.62) 45%, rgba(249, 201, 94, 0.9) 100%), url(${heroBackdropImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 28%',
            backgroundRepeat: 'no-repeat',
            minHeight: '720px',
            maxHeight: '750px'
          }}
        >
          <div className="relative max-w-3xl space-y-6">
            <p className="font-serifCn text-6xl leading-tight sm:text-7xl">月百姿</p>
            <p className="font-serifCn text-2xl text-moon/85">月冈芳年笔下的月夜人间</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/works"
                className="rounded-full border border-gold/60 bg-gold/10 px-5 py-2 text-sm"
              >
                Begin Wandering
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="about"
          variants={sectionMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-24 grid gap-8 rounded-2xl border border-haze/20 bg-panel/50 p-8 lg:grid-cols-3"
        >
          <h2 className="font-serifCn text-3xl">关于《月百姿》</h2>
          <div className="space-y-4 text-moon/80 lg:col-span-2">
            <p>《月百姿》是月冈芳年晚年的代表系列，共 100 幅，始于 1885 年秋，至 1892 年完成。</p>
            <p>它以“月”为线索，将历史人物、传说角色、女性形象、幽灵与诗意时刻编织成连续展开的夜之剧场。</p>
            <p>今天重新观看它，不是为了回到过去，而是在当代的速度里，重新学习慢下来观看光、情绪与留白。</p>
          </div>
        </motion.section>

        <motion.section
          id="author"
          variants={sectionMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-24 rounded-2xl border border-haze/20 bg-panel/50 p-8"
        >
          <h2 className="font-serifCn text-3xl">作者简介</h2>
          <div className="mt-5 max-w-5xl space-y-4 whitespace-pre-line leading-8 text-moon/80">
            <p>
              月冈芳年是歌川国芳的徒弟，被称为“最后的浮世绘师”。年轻时，芳年主要创作武者绘，展现幕府人物。曾一度热衷于“无惨绘”，与师兄落合芳几比拼，画面极为血腥令人不适，最终芳年获胜。芳年为此颇为得意，陆续创作了很多无惨绘的作品，被人称为“浑身是血的芳年”。
            </p>
            <p>
              晚年的芳年沉迷酗酒，身体多病，但也创造出了许多令后世称赞的作品，如讲述 100 个与月亮相关故事的《月百姿》系列。
            </p>
          </div>
        </motion.section>

        <motion.section
          id="closing"
          variants={sectionMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-24 rounded-2xl border border-haze/20 bg-panel/50 p-8"
        >
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
          <a href="#hero" className="rounded-full border border-haze/40 px-4 py-2">
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  const [works, setWorks] = useState(() => buildWorks(workMetadata));

  useEffect(() => {
    let cancelled = false;

    const loadExternalMetadata = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/workMetadata.json`, { cache: 'no-store' });
        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        const metadataMap = Array.isArray(payload)
          ? Object.fromEntries(payload.map((item) => [item.fileBase, item]))
          : payload;

        if (!cancelled && metadataMap && typeof metadataMap === 'object') {
          setWorks(buildWorks({ ...workMetadata, ...metadataMap }));
        }
      } catch (error) {
        // Ignore external metadata load errors and keep built-in data.
      }
    };

    loadExternalMetadata();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/works" element={<WorksGalleryPage works={works} />} />
      <Route path="/works/:id" element={<WorkDetail works={works} />} />
    </Routes>
  );
}
