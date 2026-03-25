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

## GitHub Pages 空白页排查（重点）

出现“页面完全空白（白屏）”最常见是部署未成功，而不是样式问题。

### 已修复项

- 路由使用 `HashRouter`，避免刷新子路由 404。
- Vite 使用 `base: './'`，打包资源路径为相对路径，适配项目站点/自定义域名。
- Pages 工作流改为 `npm install`（此前 `npm ci` 会因为缺少 `package-lock.json` 直接失败，导致页面不更新）。

### 你需要确认

1. GitHub → **Settings → Pages** → Source 选择 **GitHub Actions**。
2. push 到默认分支（`main` 或 `master`，工作流已兼容这两种命名）。
3. 打开 **Actions**，确认 `Deploy Vite site to GitHub Pages` 成功（绿色）。
4. 如果刚改完 Pages 设置但没有新提交，可在 Actions 里手动点 `Run workflow`。
5. 用这个地址打开：

```text
https://elaineli725.github.io/Yoshitoshi-ukiyoe/#/
```

详情页示例：

```text
https://elaineli725.github.io/Yoshitoshi-ukiyoe/#/works/w001
```

如果仍然空白：按 `Ctrl + F5` 强刷，或在浏览器开发者工具里查看 Console / Network 是否有 `assets/*.js` 404。

> 若运行时发生异常，页面会显示“页面加载失败”提示（而非纯白屏），请把该提示中的错误信息发出来。
