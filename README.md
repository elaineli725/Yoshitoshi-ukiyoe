# 月百姿（Yoshitoshi Ukiyo-e）

《月百姿》数字策展专题网站第一版（React + Tailwind CSS）。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 图片目录约定（100 幅）

请将作品图放在：

```text
public/images/works/
```

当前页面默认读取你已上传的命名格式：

```text
moon -1.jpg
moon -2.jpg
...
moon -100.jpg
```

对应路径写法为：

```text
/images/works/moon -1.jpg
```

> 备注：代码中已使用 `encodeURI` 处理文件名里的空格。

## GitHub Pages 空白页修复说明

出现“白屏/完全空白”通常有两个原因：

1. 把源码直接发布了（`index.html` 还在引用 `src/main.jsx`），浏览器无法直接运行 React 源码。
2. Vite 打包后的资源路径没有设置 repo base，导致 `/assets/...` 404。

本项目已修复：

- 使用 `HashRouter`（前端路由不依赖服务器 rewrite）。
- 新增 `vite.config.js` 并设置 `base: '/Yoshitoshi-ukiyoe/'`。
- 新增 GitHub Actions 自动构建与部署工作流：`.github/workflows/deploy-pages.yml`。

### 正确访问方式

```text
https://elaineli725.github.io/Yoshitoshi-ukiyoe/#/
```

作品详情页：

```text
https://elaineli725.github.io/Yoshitoshi-ukiyoe/#/works/w001
```

### 你还需要在 GitHub 仓库里确认

1. Settings → Pages → Source 选择 **GitHub Actions**。
2. push 到 `main` 后等待 Actions 里 `Deploy Vite site to GitHub Pages` 成功。
3. 成功后再刷新线上地址。
