module.exports = {
  // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
  arrowParens: "avoid", 
  // 每个tab相当于多少个空格（默认2）
  tabWidth: 2,
  // 每行代码长度 一行最多 240 字符
  printWidth: 120,
  // 行尾需要有分号
  semi: true,
  // 是否使用tab进行缩进（默认false）
  useTabs: false,
  // 使用单引号
  singleQuote: false,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格 对象字面量的大括号间使用空格（默认true）
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  jsxBracketSameLine: true,
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'never',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf',
  // 18. vue script和style标签中是否缩进,开启可能会破坏编辑器的代码折叠
  vueIndentScriptAndStyle: true,
};
