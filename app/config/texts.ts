export const practiceTexts = {
  fingerPractice: {
    beginner: [
      'asdf jkl;',
      'asdfjkl;',
      'asdf jkl; asdf jkl;',
      'fjfjfjfj dkdkdkdk',
      'jfjf kdkd slsl a;a;',
    ],
    intermediate: [
      'asdfjkl; qweruiop',
      'zxcvm,./ tyghbnm',
      'qazwsxedcrfvtgbyhnujmik,ol.p;/',
    ],
    advanced: [
      'The quick brown fox jumps over the lazy dog',
      'Pack my box with five dozen liquor jugs',
      'How vexingly quick daft zebras jump',
    ],
  },
  typingPractice: {
    beginner: [
      '春眠不觉晓，处处闻啼鸟。',
      '床前明月光，疑是地上霜。',
      '锄禾日当午，汗滴禾下土。',
    ],
    intermediate: [
      '人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。',
      '千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。',
      '众鸟高飞尽，孤云独去闲。相看两不厌，只有敬亭山。',
    ],
    advanced: [
      '床前明月光，疑是地上霜。举头望明月，低头思故乡。锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。',
      '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。海内存知己，天涯若比邻。无为在歧路，儿女共沾巾。',
      '千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。秦时明月汉时关，万里长征人未还。但使龙城飞将在，不教胡马度阴山。',
    ],
  },
};

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type PracticeType = 'fingerPractice' | 'typingPractice';

export const difficultyLabels: Record<Difficulty, string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
};