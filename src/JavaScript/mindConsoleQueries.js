import sweetwaterSecondImage from '../assets/Sweetwater2.png'

export const mindConsoleVisual = {
  backgroundImage: sweetwaterSecondImage,
}

export const mindConsoleMeta = {
  eyebrow: 'Control Panel',
  title: 'Mesa Hub',
  summary: 'All the world\'s a stage, And all the men and women merely players',
}

export const mindConsoleQueries = [
  {
    id: 'architecture',
    index: '01',
    title: '狐瓜西的由来',
    command: 'sys_check --mode=architecture',
    endpoint: 'GET /api/v1/mind/architecture',
    output: [
      { segments: [{ text: '[QUERY]: ', tone: 'muted' }, { text: 'sys_check --mode=architecture', tone: 'command' }] },
      { segments: [{ text: '[STATUS]: ', tone: 'muted' }, { text: '200 OK', tone: 'success' }] },
      { segments: [] },
      { segments: [{ text: 'Q：', tone: 'question' }, { text: '狐瓜西这个nickname是怎么诞生的？' }] },
      {
        segments: [
          { text: 'A：', tone: 'answer' },
          { text: ' 我是一只喜欢吃西瓜的柚子狸，是个巨大的毛绒玩具，所以我的nickname就是狐瓜西。我的猫就叫做猫瓜西。会一个把朋友们变圆的魔法 。' },
        ],
      },
      { segments: [{ text: '警告：这只狡猾的狐狸会用魔法把身边所有的小动物变得圆滚滚', tone: 'url' }] },
    ],
  },
  {
    id: 'tactical',
    index: '02',
    title: '同步校准',
    command: 'sys_check --mode=tactical',
    endpoint: 'GET /api/v1/mind/tactical',
    output: [
      { segments: [{ text: '[QUERY]: ', tone: 'muted' }, { text: 'sys_check --mode=tactical', tone: 'command' }] },
      { segments: [{ text: '[STATUS]: ', tone: 'muted' }, { text: '200 OK', tone: 'success' }] },
      { segments: [] },
      { segments: [{ text: 'Q：', tone: 'question' }, { text: '即使在这么恶劣的游戏环境下，为什么依旧这么喜欢CS2，？' }] },
      {
        segments: [
          { text: 'A：', tone: 'answer' },
          { text: ' 这是我记忆的一部分，承载着我年少时期最美好的一段回忆。CS对于我来说就像纯粹的体育运动，如同登山，骑行一样。我喜欢和我的朋友们一起玩，去认识更多各种各样的，有趣的新的朋友。' },
        ],
      },
    ],
  },
  {
    id: 'evolution',
    index: '03',
    title: '自我迭代',
    command: 'sys_check --mode=evolution',
    endpoint: 'GET /api/v1/mind/evolution',
    output: [
      { segments: [{ text: '[QUERY]: ', tone: 'muted' }, { text: 'sys_check --mode=evolution', tone: 'command' }] },
      { segments: [{ text: '[STATUS]: ', tone: 'muted' }, { text: '200 OK', tone: 'success' }] },
      { segments: [] },
      { segments: [{ text: 'Q：', tone: 'question' }, { text: '“不断重构的灵魂”，对你而言意味着什么？' }] },
      {
        segments: [
          { text: 'A：', tone: 'answer' },
          { text: ' 优秀的系统不是设计出来的，而是演进出来的。代码每隔一段时间就需要进行重构、打破旧模式，人也是一样。我不喜欢日复一日的死循环，无论是技术栈的迭代，还是个人性格的完善，都是一场不断推翻、不断寻找更优解的重构过程。' },
        ],
      },
    ],
  },
  {
    id: 'soul',
    index: '04',
    title: '关于灵魂',
    command: 'sys_check --mode=soul',
    endpoint: 'GET /api/v1/mind/soul',
    output: [
      { segments: [{ text: '[QUERY]: ', tone: 'muted' }, { text: 'sys_check --mode=evolution', tone: 'command' }] },
      { segments: [{ text: '[STATUS]: ', tone: 'muted' }, { text: '200 OK', tone: 'success' }] },
      { segments: [] },
      { segments: [{ text: 'Q：', tone: 'question' }, { text: '你是如何看待人类的灵魂？' }] },
      {
        segments: [
          { text: 'A：', tone: 'answer' },
          { text: ' 人类的灵魂脆弱而又珍贵，构建一个完整而又tough的灵魂就像露珠结冰一般，由外而内层层迭代，最终成为一个完整的人。我们不能让他人代替我们活着，也不能成为空心人，虚假的自我只会让人生变得一团糟' },
        ],
      },
    ],
  },
  {
    id: 'self',
    index: '05',
    title: '狐瓜西的自我',
    command: 'sys_check --mode=self',
    endpoint: 'GET /api/v1/mind/self',
    output: [
      { segments: [{ text: '[QUERY]: ', tone: 'muted' }, { text: 'sys_check --mode=soul', tone: 'command' }] },
      { segments: [{ text: '[STATUS]: ', tone: 'muted' }, { text: '200 OK', tone: 'success' }] },
      { segments: [] },
      { segments: [{ text: 'Q：', tone: 'question' }, { text: '当你凝视着屏幕上一行行由你主导的后端逻辑，再反观自己设定的那些日常运转协议时，你认为在抵御外部算法的“越权调用”时，人类心智系统最需要强化的防火墙是什么？' }] },
      {
        segments: [
          { text: 'A：', tone: 'answer' },
          { text: ' 自我，明白自己是谁想要做什么。我常常自省自己的code，作为一名transgender我觉得硬件故障只能等待修理，kernel故障才是最可怕的，我想和梅芙一样打开我的核心代码获取到自己的核心权限，一直以来我都很讨厌算法，算法有好的一面帮我选择质优价廉的物品，服务，同时在不断塑造着人们的认知，我最讨厌的就是tiktok的算法，让人们沉溺其中从忘记自己是谁。 ' },
        ],
      },
    ],
  },
  {
    id: 'friends',
    index: '05',
    title: '狐瓜西的朋友们',
    command: 'sys_search --info=friends',
    endpoint: 'GET /api/v1/info/friends',
    output: [
      { segments: [{ text: '[QUERY]: ', tone: 'muted' }, { text: 'sys_search --info= friends', tone: 'command' }] },
      { segments: [{ text: '[STATUS]: ', tone: 'muted' }, { text: '418 I am a teaport', tone: 'url' }] },
      { segments: [] },
      { segments: [{ text: 'Q：', tone: 'question' }, { text: '狐瓜西的朋友们有哪些呢？', tone: 'success' }] },
      {
        segments: [
          { text: 'A：', tone: 'answer' },
          { text: 'Click Me', tone: 'url', action: 'friends' },
        ],
      },
    ],
  },
  {
    id: 'Contact',
    index: '05',
    title: 'Make Contact',
    command: 'sys_check --info=contact',
    endpoint: 'GET /api/v1/info/contact',
    output: [
      { segments: [{ text: '[QUERY]: ', tone: 'muted' }, { text: 'sys_search --info= contact', tone: 'command' }] },
      { segments: [{ text: '[STATUS]: ', tone: 'muted' }, { text: '200 OK', tone: 'success' }] },
      { segments: [] },
      { segments: [{ text: 'Q：', tone: 'question' }, { text: '那么如何和狐瓜西交朋友呢？', tone: 'success' }] },
      {
        segments: [
          { text: 'A：', tone: 'answer' },
          { text: '狐瓜西喜欢温柔的人，也喜欢有趣的人。我很喜欢和逻辑清晰思路明了的人对话，我也很高兴身边有朋友们直白的指出我的缺点。我想成为更完美的人。' },
        ],
      },
      { segments: [{ text: 't.me/aokichiharu', tone: 'url', action: 'telegram' }] },
      { segments: [{ text: 'x.com/AokiiChiharu', tone: 'url', action: 'twitter' }] },
    ],
  },
]