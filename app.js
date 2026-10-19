const sets={
  '词汇':[
    {tag:'词汇辨析',prompt:'姉は毎朝、駅まで歩いて会社に＿＿。',choices:['通います','運びます','届きます','渡ります'],answer:0,explain:'「通う」表示定期往返某处，例如“通勤、上学”。句意是姐姐每天早上步行去车站，再去公司。'},
    {tag:'汉字读音',prompt:'下線の言葉の読み方を選んでください。',context:'この町は海産物が新鮮です。',choices:['かいさんぶつ','うみさんもの','かいざんぶつ','うみざんぶつ'],answer:0,explain:'「海産物」读作「かいさんぶつ」，意思是海产品。熟悉复合词中的音读组合有助于辨认读音。'},
    {tag:'语境选词',prompt:'会議の時間が変更になったので、予定を＿＿しました。',choices:['修理','確認','招待','準備'],answer:1,explain:'「予定を確認する」表示确认安排。句中说会议时间变了，因此需要重新确认日程。'}
  ],
  '语法':[
    {tag:'句型选择',prompt:'雨が降りそうなので、傘を持って＿＿ほうがいい。',choices:['行った','行く','行き','行って'],answer:0,explain:'「〜たほうがいい」用于提出建议，前接动词た形，所以选「持って行ったほうがいい」。'},
    {tag:'语法理解',prompt:'この薬を飲めば、すぐに＿＿わけではありません。',choices:['治る','治った','治って','治り'],answer:0,explain:'「〜わけではない」表示并非必然如此。这里的「すぐに治るわけではない」意思是并非马上就会痊愈。'},
    {tag:'助词选择',prompt:'駅に着いた＿＿、友だちから電話が来た。',choices:['ところ','ばかり','まま','ため'],answer:0,explain:'「〜たところ」可以表示刚做完某事时发生了另一件事。抵达车站时，朋友打来了电话。'}
  ],
  '阅读':[
    {tag:'短篇阅读',prompt:'文章を読んで、質問に答えてください。',context:'山田さんは先月から自転車で会社に通っています。電車より時間はかかりますが、朝の空気が気持ちよく、仕事の前に少し運動できるので続けています。',question:'山田さんが自転車通勤を続けている理由は何ですか。',choices:['電車より早く着くから','朝に運動ができるから','自転車が新しいから','会社に近いから'],answer:1,explain:'文中明确提到“工作前可以稍微运动一下”，这是他继续骑车通勤的理由。文章也说骑车比坐电车花的时间更多。'},
    {tag:'短篇阅读',prompt:'文章を読んで、質問に答えてください。',context:'図書館のお知らせ：来週の月曜日は館内整理のため休館します。本の返却は入口横の返却ポストをご利用ください。火曜日から通常どおり開館します。',question:'月曜日に本を返す場合、どうすればいいですか。',choices:['火曜日まで待つ','入口横に返却する','受付に預ける','郵便で送る'],answer:1,explain:'通知说周一闭馆，但可以使用入口旁的还书箱。'},
    {tag:'短篇阅读',prompt:'文章を読んで、質問に答えてください。',context:'新しいパン屋は朝七時に開店します。人気の食パンは午前中に売り切れることがあります。予約は前日の午後六時まで受け付けています。',question:'食パンを確実に買うには、どうしたらいいですか。',choices:['午後に店へ行く','当日の朝に電話する','前日の午後六時までに予約する','開店前に並ばない'],answer:2,explain:'店内提示可在前一天下午六点前预约。因为吐司可能上午售罄，提前预约最稳妥。'}
  ],
  '听力':[
    {tag:'听力情境 · 文本练习',prompt:'会話を読んで、男の人が次にすることを選んでください。',context:'女：会議の資料、もう印刷しましたか。\n男：まだです。先に部長に内容を確認してもらってから印刷します。',choices:['資料を印刷する','部長に内容を確認してもらう','会議を始める','資料を作り直す'],answer:1,explain:'男士会先请部长确认内容，之后再打印。此原型用对话文字演示听力题的交互形式。'},
    {tag:'听力情境 · 文本练习',prompt:'会話を読んで、二人は何時に会いますか。',context:'男：映画は六時からだね。何時に駅で会おうか。\n女：チケットを買いたいから、五時半にしよう。',choices:['五時','五時半','六時','六時半'],answer:1,explain:'女生提议为了买票在五点半见面。'},
    {tag:'听力情境 · 文本练习',prompt:'会話を読んで、女の人は何を持っていきますか。',context:'男：明日は公園でピクニックだね。飲み物は僕が持っていくよ。\n女：ありがとう。じゃあ、私はお弁当を作っていくね。',choices:['饮料','相机','便当','地图'],answer:2,explain:'男士负责带饮料，女生说她会准备便当。'}
  ]
};
// Original demonstration questions by level. These are written for this prototype.
const levelSets={
 'N5':{
  '词汇':[{tag:'基础词汇',prompt:'まいあさ、七時に＿＿。',choices:['おきます','ねます','あびます','かえります'],answer:0,explain:'「おきます」是起床。句意为“每天早上七点起床”。'},{tag:'汉字读音',prompt:'「水」の読み方を選んでください。',choices:['みず','ひ','つき','やま'],answer:0,explain:'「水」读作「みず」，意思是水。'}],
  '语法':[{tag:'助词入门',prompt:'わたし＿＿学生です。',choices:['は','を','で','に'],answer:0,explain:'「は」提示句子的主题。わたしは学生です：我是学生。'},{tag:'动词变形',prompt:'毎晩、本を＿＿。',choices:['読みます','読みましたか','読むです','読んでますた'],answer:0,explain:'描述日常习惯时使用ます形「読みます」。'}],
  '阅读':[{tag:'短篇阅读',prompt:'文章を読んでください。',context:'わたしはミカです。毎日、学校で日本語を勉強します。学校は九時に始まります。',question:'学校は何時に始まりますか。',choices:['八時','九時','十時','七時'],answer:1,explain:'文中写明学校九点开始上课。'}],
  '听力':[{tag:'听力情境 · 文本练习',prompt:'会話を読んで、何を買いますか。',context:'店員：いらっしゃいませ。\n客：りんごを二つください。',choices:['苹果两个','香蕉两个','苹果一个','橘子两个'],answer:0,explain:'顾客说「りんごを二つ」，要买两个苹果。'}]
 },
 'N4':{
  '词汇':[{tag:'词汇辨析',prompt:'電車に乗る前に、切符を＿＿ください。',choices:['買って','売って','借りて','習って'],answer:0,explain:'乘车前要“买车票”，使用「切符を買う」。'},{tag:'汉字读音',prompt:'「病院」の読み方を選んでください。',choices:['びょういん','びょうえん','びょいん','びょうえ'],answer:0,explain:'「病院」读作「びょういん」，意思是医院。'}],
  '语法':[{tag:'句型选择',prompt:'きのうは疲れていたので、何も食べ＿＿寝ました。',choices:['ないで','なくて','なく','ないと'],answer:0,explain:'「〜ないで」表示不做前项而做后项：什么也没吃就睡了。'},{tag:'句型选择',prompt:'日本へ行ったことが＿＿。',choices:['あります','います','なります','できます'],answer:0,explain:'「〜たことがある」表示曾有过某种经历。'}],
  '阅读':[{tag:'短篇阅读',prompt:'文章を読んでください。',context:'佐藤さんは土曜日に友だちと美術館へ行きました。雨が降っていたので、駅からバスに乗りました。美術館のあと、近くの喫茶店で昼ご飯を食べました。',question:'二人はどうしてバスに乗りましたか。',choices:['駅が遠かったから','雨が降っていたから','時間がなかったから','道が分からなかったから'],answer:1,explain:'文章说因为下雨，两人从车站坐了巴士。'}],
  '听力':[{tag:'听力情境 · 文本练习',prompt:'会話を読んで、男の人は何時に出ますか。',context:'女：もう出かけるの？\n男：うん。バスが十時十五分に来るから、十分前に家を出るよ。',choices:['十時','十時五分','十時十五分','十時二十五分'],answer:1,explain:'巴士十点十五分到，男士说提前十分钟出门，所以是十点零五分。'}]
 },
 'N2':{
  '词汇':[{tag:'词汇辨析',prompt:'新しい制度の導入に＿＿、利用者への説明会が開かれた。',choices:['先立ち','伴い','限り','比べ'],answer:0,explain:'「〜に先立ち」表示在某事之前。说明会在新制度引入前举行。'},{tag:'词语搭配',prompt:'彼は長年の努力が＿＿、ついに研究者として認められた。',choices:['実って','固まって','重なって','結んで'],answer:0,explain:'「努力が実る」是“努力取得成果”的常见搭配。'}],
  '语法':[{tag:'句型辨析',prompt:'この店は味＿＿、値段の安さでも人気がある。',choices:['はもちろん','に限って','に比べて','を通して'],answer:0,explain:'「〜はもちろん」表示某项自不必说，另一项也成立。'},{tag:'句型辨析',prompt:'説明書を読んだ＿＿、機械を動かしてください。',choices:['うえで','ばかりに','ところで','かわりに'],answer:0,explain:'「〜たうえで」表示先完成前项，再进行后项。'}],
  '阅读':[{tag:'短篇阅读',prompt:'文章を読んで、質問に答えてください。',context:'地域の商店街では、空き店舗を使った小さな図書室を始めた。新刊をそろえることは難しいが、住民が読み終えた本を持ち寄ることで、世代を超えた交流の場にもなっている。運営者は、本の数を増やすことより、人が気軽に立ち寄れる雰囲気を大切にしたいと話す。',question:'運営者が最も大切にしていることは何ですか。',choices:['新刊を多くそろえること','本を売って利益を出すこと','人が立ち寄りやすい場にすること','図書室を大きくすること'],answer:2,explain:'末句明确说，比起增加藏书数量，运营者更重视营造让人轻松来访的氛围。'}],
  '听力':[{tag:'听力情境 · 文本练习',prompt:'会話を読んで、発表資料をどう直しますか。',context:'同僚：グラフの数字は分かりやすいですが、説明文が少し長いですね。\n発表者：そうですね。内容は変えずに、要点だけ箇条書きにします。',choices:['图表数据全部删除','说明文字保留原样','说明文字改成要点列表','整个资料重新制作'],answer:2,explain:'发言者打算不改变内容，只把说明文浓缩成要点列表。'}]
 },
 'N1':{
  '词汇':[{tag:'语境选词',prompt:'彼の提案は理想的ではあるが、実現性という点では＿＿が残る。',choices:['疑問','予感','余裕','余白'],answer:0,explain:'「疑問が残る」表示仍有疑点。句意是方案虽理想，但可行性仍值得怀疑。'},{tag:'近义表达',prompt:'「計画を白紙に戻す」と最も近い意味を選んでください。',choices:['計画を最初から考え直す','計画を急いで実行する','計画を詳しく説明する','計画を少し変更する'],answer:0,explain:'「白紙に戻す」指回到起点重新考虑或作废重来。'}],
  '语法':[{tag:'句型辨析',prompt:'十分な検討を＿＿、この結論に至った。',choices:['重ねた末に','したところで','するまでもなく','したばかりに'],answer:0,explain:'「〜を重ねた末に」表示反复进行某事之后终于得出结果。'},{tag:'句型辨析',prompt:'専門家＿＿、今回の変化を正確に予測するのは難しかった。',choices:['をもってしても','にしては','といえども','にひきかえ'],answer:0,explain:'「〜をもってしても」表示即使凭借某种能力或手段也难以做到。'}],
  '阅读':[{tag:'短篇阅读',prompt:'文章を読んで、筆者の考えに最も近いものを選んでください。',context:'効率化は、同じ成果をより少ない時間や資源で得るための手段である。しかし、数値で測れる作業だけを効率化の対象とすると、相談や振り返りのように成果が見えにくい活動が削られかねない。短期的な処理量は増えても、組織が学び続ける力まで損なえば、長い目で見た効率化とは呼べないだろう。',question:'筆者は効率化について、どのように考えていますか。',choices:['測定しやすい作業だけを優先すべきだ','短期の処理量が増えれば十分だ','学びを支える活動も含め長期的に考えるべきだ','相談や振り返りは効率化と無関係だ'],answer:2,explain:'筆者は短期の数値だけで判断せず、組織が学び続ける力を保てるかという長期的視点を重視しています。'}],
  '听力':[{tag:'听力情境 · 文本练习',prompt:'会話から、二人が合意した方針を選んでください。',context:'A：調査結果をすべて載せると、報告書がかなり長くなります。\nB：ただ、重要な例外まで省くと誤解を招きますね。\nA：では、本文には全体傾向を示し、例外は注記にまとめましょう。\nB：それなら、読みやすさと正確さを両立できそうです。',choices:['例外だけを本文に載せる','全データを本文に並べる','全体傾向を本文にし例外は注記する','報告書の公開を延期する'],answer:2,explain:'两人达成的方案是正文呈现整体趋势，并把例外集中放在注释中。'}]
 }
};
levelSets.N2['词汇'].push(
 {tag:'近义词辨析',prompt:'「計画を見直す」と近い意味の表現を選んでください。',choices:['計画を再検討する','計画を中止する','計画を発表する','計画を延期する'],answer:0,explain:'「見直す」在此处是重新检查、重新评估，接近「再検討する」。'},
 {tag:'语境选词',prompt:'説明が不十分だったため、参加者に誤解を＿＿しまった。',choices:['招いて','呼んで','誘って','迎えて'],answer:0,explain:'「誤解を招く」是固定搭配，表示招致误解。'},
 {tag:'词语搭配',prompt:'この地域では、人口の減少に＿＿学校の統合が進んでいる。',choices:['伴って','関して','比べて','限って'],answer:0,explain:'「〜に伴って」表示随着某种变化而发生另一变化。'}
);
levelSets.N2['语法'].push(
 {tag:'句型辨析',prompt:'十分に準備した＿＿、本番では予想外の質問に戸惑った。',choices:['にもかかわらず','にしたがって','に先立って','とともに'],answer:0,explain:'「〜にもかかわらず」表示尽管如此，后项仍与预期相反。'},
 {tag:'句型辨析',prompt:'この施設は、年齢＿＿、誰でも利用できます。',choices:['を問わず','に限らずに','にかかわらずで','を通じて'],answer:0,explain:'「〜を問わず」表示不论……，常接年龄、性别、经验等。'},
 {tag:'句型辨析',prompt:'資料を確認＿＿、会議で説明する内容をまとめておいてください。',choices:['したうえで','したところで','する一方で','するどころか'],answer:0,explain:'「〜たうえで」表示完成前项后再做后项。'}
);
levelSets.N2['阅读'].push(
 {tag:'短篇阅读',prompt:'文章を読んで、質問に答えてください。',context:'市は、中心部の駐車場を減らし、その場所に自転車置き場と歩行者用の道を整備する計画を発表した。商店主からは来店者が減るとの懸念も出ている。一方、市の調査では、歩きやすさが向上した地域では滞在時間が延びる傾向が見られた。市はまず半年間試験的に実施し、利用者数や商店への影響を確認してから正式な計画を決めるという。',question:'市は今後どのように進める予定ですか。',choices:['駐車場をすぐにすべて廃止する','半年間試して影響を調べる','商店主の意見を聞かずに実施する','計画を取りやめる'],answer:1,explain:'文末说市将先试行半年，再根据使用人数和对商店的影响决定正式方案。'},
 {tag:'短篇阅读',prompt:'文章を読んで、筆者の意見に最も近いものを選んでください。',context:'仕事の連絡にチャットを使う会社が増えた。短い確認をすぐに行える点は便利だが、すべての連絡に即時の返事を求めると、集中して作業する時間が失われる。大切なのは、返信の速さだけを評価することではなく、緊急度や内容に応じて連絡手段と返答期限を使い分けることだ。',question:'筆者が大切だと考えていることは何ですか。',choices:['すべての連絡にすぐ返信すること','チャットを仕事で使わないこと','内容に応じて連絡方法や期限を調整すること','返信数で仕事の成果を評価すること'],answer:2,explain:'作者主张根据紧急程度和内容选择沟通方式及回复期限，而非要求所有消息都立即回复。'},
 {tag:'信息检索',prompt:'案内を読んで、申込者が注意すべきことを選んでください。',context:'公開講座のお知らせ：申込期間は5月1日から15日までです。定員を超えた場合は抽選を行い、結果は20日にメールでお知らせします。当選者は25日までに参加費をお支払いください。',question:'抽選に当たった人は、いつまでに支払いますか。',choices:['5月15日','5月20日','5月25日','6月1日'],answer:2,explain:'通知明确规定当选者需在25日前支付参加费。'}
);
levelSets.N2['听力'].push(
 {tag:'听力情境 · 文本练习',prompt:'会話を読んで、女性が資料に加えるものを選んでください。',context:'同僚：報告書の説明は分かりやすいですが、調査の対象人数が書かれていません。\n担当者：確かに。それがないと結果の規模が伝わりにくいですね。\n同僚：表の下に注記を入れてはどうでしょう。\n担当者：そうします。対象人数と調査期間を追記します。',choices:['调查对象人数和调查期间','报告书的标题和作者','调查问卷的全部答案','新的结论和建议'],answer:0,explain:'负责者最后确认会补上调查对象人数和调查期间。'},
 {tag:'听力情境 · 文本练习',prompt:'会話を読んで、二人はどの方法で会場へ行きますか。',context:'女：会場までは電車で行く予定でしたが、駅から歩くと少し遠いそうです。\n男：バスもありますが、開始時間に間に合うか分かりません。\n女：タクシーなら確実ですが、費用がかかりますね。\n男：二人で乗れば負担も小さいし、そうしましょう。',choices:['从车站步行','乘公交车','两人一起打车','改乘电车到另一站'],answer:2,explain:'两人讨论后决定共同乘坐出租车，分摊费用。'},
 {tag:'听力情境 · 文本练习',prompt:'会話を読んで、発表はどう変更されますか。',context:'学生：来週の発表ですが、調査結果がまだそろっていません。\n先生：発表日を延ばすこともできますが、全体の予定に影響します。\n学生：では、結果が出ている部分を中心に発表し、残りは今後の課題として説明します。\n先生：それなら予定どおり進められますね。',choices:['发表延期一周','取消发表','按原计划发表并说明尚未完成的部分','更换调查主题'],answer:2,explain:'学生提出按期发表现有结果，把未完成部分作为后续课题说明，老师同意。'}
);
levelSets.N2['词汇'].push(
 {tag:'词语搭配',prompt:'借りたお金は、来月までに必ず＿＿つもりです。',choices:['返す','戻る','返事する','渡る'],answer:0,explain:'「お金を返す」表示还钱；「返済する」是更正式的说法。'},
 {tag:'语境选词',prompt:'電車が遅れたため、会議の開始時刻を＿＿ことになった。',choices:['繰り下げる','取り替える','引き受ける','見送る'],answer:0,explain:'「開始時刻を繰り下げる」表示把开始时间推迟。'},
 {tag:'近义词辨析',prompt:'「仕事が順調に進んでいる」と近い意味を選んでください。',choices:['問題なく予定どおり進んでいる','予定より大幅に遅れている','内容を最初からやり直している','仕事を一時的に休んでいる'],answer:0,explain:'「順調」表示进展顺利、没有明显问题。'}
);
levelSets.N2['语法'].push(
 {tag:'句型辨析',prompt:'この図書館では、本＿＿、雑誌や新聞も自由に読める。',choices:['だけでなく','に限って','といっても','を通じて'],answer:0,explain:'「〜だけでなく」表示不仅……而且……。'},
 {tag:'句型辨析',prompt:'彼は料理が苦手だが、まったくできない＿＿。',choices:['わけではない','ことにならない','ものがある','にすぎない'],answer:0,explain:'「〜わけではない」表示并非完全如此；这里是“并不是完全不会做饭”。'},
 {tag:'句型辨析',prompt:'大雨が続くと、川の水があふれる＿＿がある。',choices:['おそれ','おかげ','かわり','はず'],answer:0,explain:'「〜おそれがある」用于表示可能发生不好的情况。'}
);
levelSets.N2['阅读'].push(
 {tag:'邮件阅读',prompt:'メールを読んで、山田さんがすることを選んでください。',context:'件名：資料の修正について\n山田さん\n先ほど送っていただいた資料を確認しました。内容は問題ありませんが、グラフの出典を明記してください。修正後、明日の正午までに共有フォルダへ保存してください。会議用の印刷はこちらで行います。\n佐藤',question:'山田さんがしなければならないことは何ですか。',choices:['資料を印刷して会議室へ持っていく','グラフの出典を加え、明日正午までに保存する','資料の内容をすべて書き直す','今日中に佐藤さんへ電話する'],answer:1,explain:'邮件要求山田补充图表来源，并在明天中午前保存到共享文件夹；打印由佐藤负责。'},
 {tag:'短篇阅读',prompt:'文章を読んで、筆者が伝えたいことを選んでください。',context:'「便利な道具を使えば時間が節約できる」とよく言われる。しかし、道具を使いこなすための準備や確認に時間がかかる場合もある。導入を決める前に、短期間試して実際の作業時間を比べることが大切だ。新しいものを取り入れること自体を目的にしてはいけない。',question:'筆者の考えに最も近いものはどれですか。',choices:['新しい道具は必ず導入すべきだ','便利さを実際に試し、効果を確かめてから導入する','準備に時間がかかる道具は使わない','作業時間を比べる必要はない'],answer:1,explain:'作者建议先短期试用，比较实际耗时，确认效果后再决定是否采用。'},
 {tag:'信息检索',prompt:'案内を読んで、参加できる人を選んでください。',context:'日本語交流会：6月12日（土）午後2時～4時。対象は日本語を学んでいる人と地域住民です。参加費は無料ですが、事前申込が必要です。申込は6月8日までにメールでお願いします。',question:'参加するために必要なことは何ですか。',choices:['6月8日までに申し込む','参加費を当日払う','日本語能力試験N2に合格する','午前中に会場へ行く'],answer:0,explain:'活动免费，但需要在6月8日前通过邮件提前报名。'}
);
levelSets.N2['听力'].push(
 {tag:'听力情境 · 文本练习',prompt:'会話を読んで、女性は何を先にしますか。',context:'男：昼休みに銀行へ行くんだよね。書類はもう準備できた？\n女：まだ住所を書くところが残っています。出かける前に書いておきます。\n男：じゃあ、終わったら一緒に行こう。',choices:['银行先关门前打电话','填写文件上的地址','午饭后整理办公桌','男士的资料代为提交'],answer:1,explain:'女生先补填文件上的地址，然后再和男士一起去银行。'},
 {tag:'听力情境 · 文本练习',prompt:'会話から、店の営業時間がどう変わるかを選んでください。',context:'客：この店は日曜日も開いていますか。\n店員：これまでは休みでしたが、来月から日曜日も営業します。そのかわり、火曜日を定休日にします。\n客：では、日曜日に来られますね。',choices:['下个月起周日营业、周二休息','下个月起周日和周二都休息','现在周日营业、下个月取消','营业时间每天都延长'],answer:0,explain:'店员说明从下个月起周日营业，改为周二固定休息。'},
 {tag:'听力情境 · 文本练习',prompt:'男の人はどうして会議に遅れますか。',context:'女：会議は三時からですよ。もう出発しないと間に合いません。\n男：申し訳ありません。来客の対応が長引いていて、今やっと終わったところです。すぐ向かいます。\n女：分かりました。先に始めておきます。',choices:['电车停止运行','忘记了会议时间','接待来访客人花了更多时间','会议资料还没有准备好'],answer:2,explain:'男士说接待来访客人的工作拖长了，所以会迟到。'}
);
const grammarCards=[{pattern:'〜に伴って',meaning:'表示随着前项变化，后项也随之发生变化。',example:'人口の増加に伴って、交通量も増えている。',translation:'随着人口增加，交通量也在上升。'},{pattern:'〜たうえで',meaning:'先完成前项，再进行后项；也可表示在某种前提下。',example:'内容を確認したうえで、署名してください。',translation:'确认内容之后，请签名。'},{pattern:'〜にもかかわらず',meaning:'表示尽管存在前项情况，后项仍然成立。',example:'雨にもかかわらず、多くの人が集まった。',translation:'尽管下雨，还是聚集了很多人。'},{pattern:'〜を問わず',meaning:'表示不论某项条件如何，后项都成立。',example:'経験の有無を問わず、応募できます。',translation:'无论是否有经验，都可以应聘。'},{pattern:'〜はもちろん',meaning:'表示某项自不必说，其他相关事项也成立。',example:'この店は味はもちろん、サービスも評判だ。',translation:'这家店味道自不必说，服务也很有口碑。'}];
let level='N2',category='词汇',index=0,selected=null,answered=false;
const byId=id=>document.getElementById(id);
const LOCAL_KEY='n2-study-desk-v1';
let studyData={solved:0,correct:0,mistakes:[],tasks:{}};
try{studyData={...studyData,...JSON.parse(localStorage.getItem(LOCAL_KEY)||'{}')}}catch{}
function saveStudy(){try{localStorage.setItem(LOCAL_KEY,JSON.stringify(studyData));byId('saved-hint').textContent='已保存在本机浏览器';}catch{byId('saved-hint').textContent='浏览器未开放本地保存';}refreshStats();}
function refreshStats(){byId('solved-count').textContent=studyData.solved||0;byId('accuracy').textContent=studyData.solved?`${Math.round(studyData.correct/studyData.solved*100)}%`:'—';byId('mistake-count').textContent=(studyData.mistakes||[]).length;}
function dateKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function updateCountdown(){const target=new Date(`${byId('exam-date').value||'2026-12-06'}T23:59:00`);const today=new Date();today.setHours(0,0,0,0);byId('days-left').textContent=Math.max(0,Math.ceil((target-today)/86400000));}
document.querySelectorAll('[data-task]').forEach(box=>{box.checked=Boolean(studyData.tasks?.[dateKey()]?.[box.dataset.task]);box.addEventListener('change',()=>{studyData.tasks||={};studyData.tasks[dateKey()]||={};studyData.tasks[dateKey()][box.dataset.task]=box.checked;saveStudy();});});
byId('exam-date').addEventListener('change',updateCountdown);byId('reset-day').addEventListener('click',()=>{document.querySelectorAll('[data-task]').forEach(x=>x.checked=false);studyData.tasks[dateKey()]={};saveStudy();});
function showMistakes(){const box=byId('mistake-list');if(!box.hidden){box.hidden=true;return}box.hidden=false;const mistakes=studyData.mistakes||[];box.innerHTML='<h3>错题回顾 · 先回忆，再看答案</h3>'+ (mistakes.length?mistakes.slice().reverse().map(m=>`<div class="mistake-item"><b>${m.level} · ${m.category} · ${m.tag}</b>${m.prompt}${m.context?`<br><small>${m.context}</small>`:''}<br><small>正确答案：${m.correctAnswer}　解析：${m.explain}</small></div>`).join(''):'<div class="mistake-empty">目前还没有错题。完成练习后，答错的题会自动收进这里。</div>');}
byId('review-mistakes').addEventListener('click',showMistakes);
function renderQuestion(){const list=level==='N3'?sets[category]:levelSets[level][category],q=list[index];selected=null;answered=false;byId('question-category')?.remove();byId('quiz-category').textContent=category;byId('question-count').textContent=`第 ${index+1} 题 / 共 ${list.length} 题`;byId('progress-bar').style.width=`${((index+1)/list.length)*100}%`;byId('question-tag').textContent=q.tag;byId('question-level').textContent=level;byId('aside-count').textContent=`${String(index+1).padStart(2,'0')} — ${String(list.length).padStart(2,'0')}`;
 document.querySelectorAll('.practice-card').forEach(card=>{const c=card.dataset.category,items=level==='N3'?sets[c]:levelSets[level][c];card.querySelector('.card-bottom span').textContent=`${items.length} 道原创练习`;});
 let body=`<p class="question-prompt">${q.prompt}</p>`;if(q.context)body+=`<div class="question-context">${q.context.replaceAll('\n','<br>')}</div>`;if(q.question)body+=`<p class="question-prompt" style="font-size:15px;margin-top:8px">${q.question}</p>`;byId('question-content').innerHTML=body;
 byId('options').innerHTML=q.choices.map((c,i)=>`<button class="option" data-choice="${i}"><small>${String.fromCharCode(65+i)}</small>${c}</button>`).join('');byId('options').querySelectorAll('.option').forEach(btn=>btn.addEventListener('click',()=>{if(answered)return;selected=Number(btn.dataset.choice);byId('options').querySelectorAll('.option').forEach(x=>x.classList.toggle('selected',x===btn));byId('next-question').disabled=false;byId('next-question').innerHTML='查看答案 <span>→</span>';}));byId('feedback').hidden=true;byId('next-question').disabled=true;byId('next-question').innerHTML='选择答案 <span>→</span>';}
function showAnswer(){const list=level==='N3'?sets[category]:levelSets[level][category],q=list[index];if(!answered){if(selected===null)return;answered=true;const correct=selected===q.answer;studyData.solved=(studyData.solved||0)+1;if(correct)studyData.correct=(studyData.correct||0)+1;else{studyData.mistakes||=[];const key=`${level}|${category}|${q.prompt}`;studyData.mistakes=studyData.mistakes.filter(m=>m.key!==key);studyData.mistakes.push({key,level,category,tag:q.tag,prompt:q.prompt,context:q.context||'',correctAnswer:q.choices[q.answer],explain:q.explain});}saveStudy();byId('options').querySelectorAll('.option').forEach((el,i)=>{el.disabled=true;if(i===q.answer)el.classList.add('correct');else if(i===selected)el.classList.add('incorrect')});const f=byId('feedback');f.hidden=false;f.className=`feedback ${correct?'':'wrong'}`;f.innerHTML=`<b>${correct?'回答正确 ✓':'再记一下 · 正确答案：'+q.choices[q.answer]}</b><br>${q.explain}`;byId('next-question').innerHTML=index===list.length-1?'再练一轮 <span>↻</span>':'下一题 <span>→</span>';}else{index=(index+1)%list.length;renderQuestion();}}
byId('next-question').addEventListener('click',showAnswer);
document.querySelectorAll('.practice-card').forEach(card=>card.addEventListener('click',()=>{document.querySelectorAll('.practice-card').forEach(c=>c.classList.toggle('active',c===card));category=card.dataset.category;index=0;renderQuestion();byId('quiz').scrollIntoView({behavior:'smooth'});}));
document.querySelectorAll('.level-buttons button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.level-buttons button').forEach(b=>b.classList.toggle('selected',b===btn));level=btn.dataset.level;index=0;byId('mock-level').textContent=level;renderQuestion();renderGrammar();}));
byId('mock-start').addEventListener('click',()=>{level='N2';document.querySelectorAll('.level-buttons button').forEach(b=>b.classList.toggle('selected',b.dataset.level===level));category='词汇';index=0;document.querySelectorAll('.practice-card').forEach(c=>c.classList.toggle('active',c.dataset.category===category));byId('mock-level').textContent=level;renderQuestion();byId('quiz').scrollIntoView({behavior:'smooth'});startFocusTimer();});
let focusSeconds=20*60,focusInterval=null;function paintTimer(){byId('focus-timer').textContent=`${String(Math.floor(focusSeconds/60)).padStart(2,'0')}:${String(focusSeconds%60).padStart(2,'0')}`;}function startFocusTimer(){if(focusInterval)return;byId('timer-toggle').textContent='暂停计时';focusInterval=setInterval(()=>{focusSeconds--;paintTimer();if(focusSeconds<=0){clearInterval(focusInterval);focusInterval=null;byId('timer-toggle').textContent='完成 · 再来一轮';byId('saved-hint').textContent='专注时段完成，记得复盘错题';}},1000);}byId('timer-toggle').addEventListener('click',()=>{if(focusInterval){clearInterval(focusInterval);focusInterval=null;byId('timer-toggle').textContent='继续计时';}else{if(focusSeconds<=0){focusSeconds=20*60;paintTimer();}startFocusTimer();}});
let grammarIndex=0;function renderGrammar(){const card=grammarCards[grammarIndex];byId('grammar-card').querySelector('.grammar-level').textContent=`${level} · ${card.meaning}`;byId('grammar-card').querySelector('h3').textContent=card.pattern;byId('grammar-card').querySelector('.grammar-example p').textContent=card.example;byId('grammar-card').querySelector('.grammar-example span').textContent=card.translation;}
byId('grammar-card').querySelector('.round-arrow').addEventListener('click',()=>{grammarIndex=(grammarIndex+1)%grammarCards.length;renderGrammar();});byId('grammar-search').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();const found=grammarCards.findIndex(c=>(c.pattern+c.meaning+c.example+c.translation).toLowerCase().includes(q));if(!q){byId('grammar-card').hidden=false;byId('grammar-empty').hidden=true;return}if(found<0){byId('grammar-card').hidden=true;byId('grammar-empty').hidden=false}else{grammarIndex=found;renderGrammar();byId('grammar-card').hidden=false;byId('grammar-empty').hidden=true}});
const toggle= document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));renderQuestion();renderGrammar();updateCountdown();refreshStats();
