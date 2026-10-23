# 嘉豪／嘉欣测试：迁移与大陆分发

核查日期：2026-10-23。原始代码基线：11d519e1c23368c3aa0aa0c97c3df2c5760b9104。

## 交付与不变项

发布包 dist/ 可直接上传至任意支持 HTTPS、正确 MIME 类型的静态站点；上传 dist 内的全部文件，不要把 dist 目录再套一层。题目50道、五维计分、版本、浏览器存储键和隐私选择均保持原样。model.mjs 的发布副本字节不变；app 只替换 import 路径。没有新增分析、外部字体、API、答案收集或第三方 CDN。

生成物使用内容哈希文件名，模块从 .mjs 复制为 .js，降低对象存储未配置 .mjs MIME 时的空白页风险；仍需验证 .js 响应类型。首页增加加载提示和禁用 JavaScript 的说明。主分支现有网站不会因本分支的构建而改变。

源码没有基于 history 的路径路由；页面切换在内存中进行，刷新依赖原有会话存储恢复。不要配置“所有请求都返回 index.html”的 SPA 重写，否则缺失 JS 会被返回为 HTML。资源均相对路径，根目录与 /jiahao-jiaxin-reflection/ 子目录都可用。分发子目录地址必须带末尾 /；主机应将不带斜杠的目录入口 301/308 到带斜杠地址。#dim-* 只是报告中的锚点，不能作为独立报告分享地址；答案不在 URL 中。

## 构建与本地启动

需要 Node.js 22+、Python 3.12+，构建无需 npm 下载。

```sh
python3 scripts/build.py
python3 scripts/test-release.py
python3 -m http.server 8080 --directory dist
```

打开 http://localhost:8080/ 。不要双击 index.html 以 file:// 运行，浏览器会限制模块加载。

浏览器端到端验证（额外下载测试依赖，不进入发布包）：

```sh
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install --with-deps chromium
BROWSER_TEST=1 python3 scripts/test-release.py
```

GitHub Actions 文件仅构建、测试、上传构建产物，不发布、不修改 DNS、不使用云账户密钥。检查 Actions 成功后下载 jx50-static-release。浏览器测试使用合成答案，覆盖390px/1440px、分类/混合、50题、五维结果、14天建议、刷新恢复、报告下载、默认不写长期存储、无外部请求。

## 托管选择与实际条件

以下为官方资料核查结果，不是大陆网络实测。不要把国外默认域名、香港机房、全球 CDN 或域名备案视为“全网可达保证”。

| 条件与方案 | 账户、域名及部署条件 | 成本构成 | 限制 |
| --- | --- | --- | --- |
| 已有备案域名：EdgeOne Pages/Makers 大陆可用区 | 可用账户、域名 DNS 控制权、工信部备案；选大陆或含大陆区域，上传 dist，绑定域名与 HTTPS | 官方免费版标价 $0/月；域名续费另计；配额/资格以账户控制台为准 | 默认项目域名大陆访问需3小时有效预览链接，不作正式入口；免费版无本项目已确认 SLA |
| 已有备案域名：阿里云 OSS 大陆地域 | 开通 OSS、域名备案、绑定自定义域名和 DNS、配置 HTTPS；静态首页 index.html，错误页404.html | 存储、请求、外网流量；CDN、证书或其他附加服务另计 | 默认 bucket 域名访问 HTML 会强制下载；不能直接拿对象地址当网站；已备案也要核查接入服务商手续 |
| 未备案但有域名：EdgeOne 全球可用区（不含大陆） | 可用账户、域名 DNS 控制权；选择明确“不含中国大陆”的区域，绑定域名及证书 | 免费版 $0/月加域名；后续套餐/配额按控制台 | 不要求 ICP 备案，但走跨境链路，须测运营商与时段；默认域名同样不适合长期大陆分发 |
| 未备案但有域名：OSS 香港地域 | OSS 账户、香港 bucket、自定义域名、DNS 和 HTTPS；不能加需要备案的大陆 CDN 节点 | 存储、请求、香港公网流出费；按地域/账号站点报价 | 跨境链路波动；不因服务器在香港就保证国内访问；默认 bucket 下载限制仍需注意 |
| 无域名：先本地验收、准备购买/绑定域名 | 暂时使用本地 HTTP 服务或平台临时预览 | 本地无托管费；域名价格与续费另核 | 临时链接不是稳定正式入口；保留 GitHub Pages 作为备用和源码来源，不能当大陆直连已验收 |

CloudBase 可作为已有腾讯云环境的替代，但自定义域名需备案，默认域名仅供开发测试，存在访问提示中间页、下载响应及频率限制；按当前资源点/套餐规则计费，不引用旧推广页的“长期免费”额度作预算。

费用估算：整个发布站点约166KB（含96.8KB理论图，理论图不在首页加载）。按每次保守完整下载0.17MB估算，1万次约1.7GB，10万次约17GB；缓存和压缩可减少，重试和爬虫会增加。OSS 国内官网列出的部分大陆标准外网流出档位为闲时0.25元/GB、忙时0.50元/GB，仅据此算：1.7GB约0.43–0.85元、17GB约4.25–8.50元；这只是对应档位的流量示例，不是总账单或香港报价。购买前确认所选地域和账户站点的单价、存储/请求费、域名续费、备案所需资源成本；设置预算告警。

大陆正式上线通常优先“已备案自定义域名＋大陆托管”；尚无备案、希望先小范围分发时优先“自定义域名＋境外节点”并真实测试。网站内容、备案主体和服务类型应满足服务商及属地要求；不能借用他人备案或通过代理规避要求。

## 通用上传设置

1. 新建独立测试站点/前缀，保持旧站可用，先验证再切正式域名。
2. 上传 dist 所有文件；只允许公开读取网站资源，禁止匿名写入/删除/列举对象，账户密钥不进入网站。
3. 配置 index.html 首页、404.html 错误页（保留404状态）；绑定自定义域名，按控制台给出的真实 CNAME 配置 DNS，再配置匹配域名的 HTTPS 证书和 HTTP→HTTPS 跳转。
4. .html → text/html; charset=utf-8；.js → text/javascript 或 application/javascript；.css → text/css；.svg → image/svg+xml；.json → application/json。不得对站点文件加 Content-Disposition: attachment。
5. index.html、404.html、release-manifest.json 使用 Cache-Control: no-cache；带哈希的 JS/CSS/SVG 可用 public,max-age=31536000,immutable。不要对 index.html 使用 immutable。
6. 不需要跨域 CORS，因为所有资源同源；不要添加外部脚本、自动访客统计或答案上传。托管商普通访问日志与原 README 的说明一致。
7. 若大陆备案要求展示备案编号，只在核实真实编号后添加页脚及链接，不能编造编号；完成服务商要求的接入/审核后发布。
8. 更新时先传新哈希资源，再传 index.html 与 manifest；保留旧哈希资源至少覆盖旧页面缓存窗口。回滚同时恢复旧 index 与 manifest，不覆盖已发布的同名哈希资源。

可用仓库构建时，构建命令 python3 scripts/build.py、输出目录 dist；构建环境没有 Python 时直接上传预构建 dist，避免多余改造。

## 验收与分发

先在测试域名运行：

```sh
python3 scripts/check-url.py https://你的域名/
# 子目录须用完整路径和末尾斜杠
python3 scripts/check-url.py https://你的域名/jiahao-jiaxin-reflection/
node scripts/browser-test.mjs https://你的域名/
```

HTTP 检查验证每个发布资源的200状态、MIME、非附件和 SHA-256，不证明 JS 可运行，也不代表其他网络。浏览器脚本需要上述 Playwright 安装。

真实大陆验收至少包含：宁夏与广州各一个可用地点、移动/联通/电信能覆盖的网络、手机流量与家庭/校园 Wi-Fi，关闭 VPN/代理。使用 iPhone Safari、Android Chrome，及实际要分发的微信/QQ内置浏览器。分别在白天和晚高峰测冷启动3次。未覆盖的组合填“未测”，不要补成通过。

记录表（只写测试合成答案，不记录用户私人回答）：日期时间、城市、运营商、Wi-Fi/蜂窝、浏览器/版本、完整 URL、DNS/TLS 是否成功、首次可交互秒数、50题是否完成、五维报告/14天建议是否显示、刷新恢复/报告导出、错误截图或说明。

建议项目验收门槛（本项目自定，不是服务商承诺）：所有已测组合3次均成功；页面无白屏和脚本错误；正常网络冷启动10秒内可答题；50题均可提交，分类/混合结果一致，刷新后答案不丢，结果/导出正确。超时或失败查 DNS、TLS、HTTP、MIME、平台默认域名限制、浏览器兼容，再决定是否更换节点。

完成后宣传“已于某日，在某城市某运营商某浏览器测试通过”，而非“中国大陆全部网络保证可开”。正式链接与二维码使用自定义域名；源码及 GitHub Pages 链接可单独列作备用。不要用临时预览、短链或第三方跳转掩盖可达性。

换域名后，旧站 localStorage/sessionStorage 不会自动迁移；现有答案导出属于备份，本次不新增导入功能，不承诺可在新域名恢复。提醒正在作答者先完成并导出报告，再使用新站。

## 本次验证状态

- 通过：原始回归测试与生成后同一套回归测试，50题/五维结构、端点和中间分、类别切换、会话/长期恢复、导出事件、清除、旧问卷隔离。
- 通过：相对依赖存在性、模块语法、根目录与子目录下所有发布文件 HTTP/MIME/哈希检查。
- 待验证：真实浏览器390px/桌面完整操作。本次执行环境缺少浏览器，安装下载失败；提供脚本和 CI，不将其标为通过。模拟 DOM 回归不等于真实浏览器验收。
- 待验证：大陆多网络直连、真手机 Safari/Android/内置浏览器；当前无大陆探针或真机数据。
- 未完成新托管部署：没有已确认可用的目标托管账户、域名及 DNS 授权；未购买资源、修改 DNS 或覆盖现有 Pages。

## 官方资料（2026-10-23检索）

- EdgeOne 域名与3小时预览限制：https://pages.edgeone.ai/zh/document/domain-overview
- EdgeOne 免费版与配额政策：https://pages.edgeone.ai/zh/pricing
- OSS 静态网站、自定义域名及备案：https://www.alibabacloud.com/help/en/oss/user-guide/hosting-static-websites
- OSS 费用构成：https://help.aliyun.com/zh/oss/billing-overview
- OSS 中国站价格：https://www.aliyun.com/price/detail/oss
- CloudBase 默认域名限制：https://docs.cloudbase.net/service/alias
- CloudBase 资源点计费：https://docs.cloudbase.net/quick-start/resource-point
- CDN 大陆/全球备案要求：https://www.alibabacloud.com/help/en/cdn/use-cases/accelerate-the-retrieval-of-resources-from-an-oss-bucket-in-the-alibaba-cloud-cdn-console
