# GitHub Pages 与跨设备同步

前端发布到 GitHub Pages；跨设备学习记录使用 MantleDB 免费匿名 JSON API，不需要注册或部署后端。

仓库： [chen777leo/n2-study-desk](https://github.com/chen777leo/n2-study-desk)

account-config.js 已预设专用 namespace。首次选择一个账号时，网页读取该账号云端记录；若尚无记录，会将当前设备该账号的本地进度写入云端。之后每次学习变更自动保存，并在页面显示时每 30 秒检查其他设备的更新。

## 公开与免费层说明

- 无需注册、密码或专属后端，数据可跨设备读写。
- 数据公开可读写；其他人只要知道网站和账号名，即可查看或覆盖记录。不要存放隐私内容。
- 每个 namespace 最多 100 条记录、每条最多 64 KB，每日 10,000 次请求；30 天无写入会被清理。
- 账号首次连接时，现有本地学习记录会上传到这个公开云端 namespace。

网页地址： https://chen777leo.github.io/n2-study-desk/
