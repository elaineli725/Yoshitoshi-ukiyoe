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
