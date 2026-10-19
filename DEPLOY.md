# 发布到网络

网站页面是静态文件，不需要构建步骤。若要跨设备登录，还需单独部署 API 和数据库。

## GitHub Pages

当前网站仓库为 [chen777leo/n2-study-desk](https://github.com/chen777leo/n2-study-desk)，Pages 从 `main` 分支的仓库根目录发布。更新 `outputs` 中的静态文件并提交到 `main`，网站会自动更新。

## 跨设备登录与同步

按 [backend/README.md](backend/README.md) 创建 Cloudflare Worker API 和 D1 数据库，再把 Worker HTTPS 地址写入 `account-config.js` 的 `window.N2_API_BASE`，随后将更新的静态文件提交到 `main`。

不要把密码、Cloudflare API Token、会话密钥或其他服务端密钥放进公开的网页文件。账号密码和会话密钥只能作为 Cloudflare Worker Secret 保存。未配置 API 时，页面继续本机保存，不会登录或上传学习数据。

## 本地打开

双击 `index.html` 可以在本机练习；服务工作线程和跨设备同步只会在 HTTPS/localhost 下启用。登录和同步需要网络连接。
