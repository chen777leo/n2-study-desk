# 发布到网络

网站静态页面部署在 GitHub Pages。要让同一账号在不同设备共享学习记录，还需要部署 Cloudflare Worker API 和 D1 数据库。

## GitHub Pages

仓库为 [chen777leo/n2-study-desk](https://github.com/chen777leo/n2-study-desk)，Pages 从 `main` 分支根目录发布。

## 云端同步部署

1. 在 Cloudflare 创建 D1 数据库，名称例如 `n2-study-desk`，运行 `backend/schema.sql`。
2. 创建 Worker 并发布 `backend/worker.js`，添加 D1 binding，binding 名称为 `DB`。
3. 设置 Worker 普通变量 `SITE_ORIGIN`，值为 `https://chen777leo.github.io`。
4. 将 Worker 的 HTTPS 地址填入 `account-config.js` 的 `window.N2_API_BASE`，再提交到 GitHub。
5. 等 Pages 更新后，用同一个用户名在不同设备选择账号，进度即从云端读取并自动保存。页面每 5 秒检查一次其他设备的新记录，答题及计划修改后约 0.5 秒开始上传。

账号只有用户名，没有密码。知道 `leo1`–`leo5` 名称的人都能读写对应学习记录；不要在记录里保存隐私信息。未部署 API 时，页面只保存本机记录。
