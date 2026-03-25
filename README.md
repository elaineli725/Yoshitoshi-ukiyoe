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

## 图片目录约定（后续上传 100 幅）

请将作品图放在：

```text
public/images/works/
```

建议命名：

```text
w001.jpg
w002.jpg
...
w100.jpg
```

然后在 `src/App.jsx` 的 `works` 数组中将每条作品的 `image` 字段指向对应文件。
