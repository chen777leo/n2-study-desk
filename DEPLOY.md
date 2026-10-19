# 发布到网络

这个目录是纯静态网站，不需要服务器端程序、数据库或构建步骤。把 `outputs` 目录中的**全部文件**一起上传到支持 HTTPS 的静态托管空间即可。HTTPS 托管后可以通过公开网址访问、安装到手机主屏幕，并在首次打开后离线使用。

## GitHub Pages（自动发布）

1. 在自己的 GitHub 账号中新建一个仓库。若希望任何人都能访问，可设为 Public。
2. 将 `outputs` 目录中的全部文件（包括隐藏的 `.github` 和 `.nojekyll`）上传到仓库根目录并提交。
3. 在仓库设置中打开 **Pages**，将发布来源设为 **GitHub Actions**。
4. 推送到 `main` 后，仓库里的 Pages 工作流会自动发布；也可以在 Actions 页手动运行。
5. 等待 Pages 显示站点网址，再用该 HTTPS 网址打开。

GitHub Pages 托管在账号所有者自己的仓库下；本项目文件中不含账号、域名或访问令牌，因此当前还没有生成公开网址。免费版 GitHub Pages 要求仓库为公开仓库；发布后任何人都能访问网页。

## 已有网站空间

将 `outputs` 中所有文件放到网站的公开根目录。若放在子目录，也要保留整套文件的相对路径。`sw.js` 和 `manifest.webmanifest` 必须与 `index.html` 一起发布，PWA 离线缓存和安装功能需要 HTTPS（或本机 localhost）。

## 本地打开

双击 `index.html` 仍可在本机浏览；服务工作线程只会在 HTTPS/localhost 下启用。答题数据使用浏览器本机存储，换设备或换浏览器不会自动同步。
