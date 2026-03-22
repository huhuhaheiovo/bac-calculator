import type {Locale} from "@/i18n/config";

export const blogPosts = {
  en: [
    {
      slug: "how-bac-is-calculated",
      title: "How BAC Is Calculated: The Widmark Formula Explained",
      excerpt:
        "A deep dive into the formula behind BAC estimates, what the variables mean, and where the model has limits.",
      date: "2025-01-15",
      readTime: "6 min",
    },
    {
      slug: "legal-bac-limits-by-state",
      title: "Legal BAC Limits by State: A Complete 2025 Guide",
      excerpt:
        "Selected US state limits, commercial driver thresholds, and under-21 zero tolerance policies.",
      date: "2025-01-20",
      readTime: "8 min",
    },
    {
      slug: "bac-calculator-vs-breathalyzer",
      title: "BAC Calculator vs Breathalyzer: Which Is More Accurate?",
      excerpt:
        "How BAC calculators compare with breathalyzers and blood tests for speed, accuracy, and legal use.",
      date: "2025-02-01",
      readTime: "5 min",
    },
  ],
  zh: [
    {
      slug: "how-bac-is-calculated",
      title: "BAC 是如何计算的：Widmark 公式解析",
      excerpt: "深入了解 BAC 估算公式、各个变量的意义，以及它的适用边界。",
      date: "2025-01-15",
      readTime: "6 分钟",
    },
    {
      slug: "legal-bac-limits-by-state",
      title: "美国各州法定 BAC 限制：2025 指南",
      excerpt: "整理美国部分州的 BAC 限值、商用驾驶标准和 21 岁以下零容忍政策。",
      date: "2025-01-20",
      readTime: "8 分钟",
    },
    {
      slug: "bac-calculator-vs-breathalyzer",
      title: "BAC 计算器 vs 呼气酒精测试仪：哪个更准确？",
      excerpt: "对比 BAC 计算器、呼气测试仪和血检在速度、准确度和法律效力上的差异。",
      date: "2025-02-01",
      readTime: "5 分钟",
    },
    {
      slug: "can-you-drive-after-one-beer",
      title: "喝了一罐啤酒能开车吗",
      excerpt: "从 BAC、代谢时间和个体差异出发，解释为什么一罐啤酒后也不能只靠感觉判断自己能不能开车。",
      date: "2025-03-22",
      readTime: "4 分钟",
    },
    {
      slug: "how-long-after-half-glass-baijiu-can-you-drive",
      title: "喝了半杯白酒多久能开车",
      excerpt: "按中国常见 52 度白酒、一杯 220 毫升来估算，半杯白酒后往往需要远比想象更长的时间，才更可能低于酒驾线。",
      date: "2025-03-22",
      readTime: "4 分钟",
    },
  ],
} as const;

export const legalStateRows = [
  { state: "Alabama", standard: "0.08%", cdl: "0.04%", under21: "0.02%" },
  { state: "Alaska", standard: "0.08%", cdl: "0.04%", under21: "0.00%" },
  { state: "Arizona", standard: "0.08%", cdl: "0.04%", under21: "0.00%" },
  { state: "California", standard: "0.08%", cdl: "0.04%", under21: "0.01%" },
  { state: "Colorado", standard: "0.08%", cdl: "0.04%", under21: "0.02%" },
  { state: "Florida", standard: "0.08%", cdl: "0.04%", under21: "0.02%" },
  { state: "Georgia", standard: "0.08%", cdl: "0.04%", under21: "0.02%" },
  { state: "Illinois", standard: "0.08%", cdl: "0.04%", under21: "0.00%" },
  { state: "New York", standard: "0.08%", cdl: "0.04%", under21: "0.02%" },
  { state: "Texas", standard: "0.08%", cdl: "0.04%", under21: "0.00%" },
  { state: "Utah", standard: "0.05%", cdl: "0.04%", under21: "0.00%" },
  { state: "Washington", standard: "0.08%", cdl: "0.04%", under21: "0.02%" },
];

export const comparisonRows = {
  en: [
    { aspect: "Method", calc: "Widmark formula", breath: "Breath sensor estimate", blood: "Laboratory blood test" },
    { aspect: "Accuracy", calc: "Approximate estimate", breath: "Better with certified devices", blood: "Most accurate" },
    { aspect: "Cost", calc: "Free", breath: "Device purchase required", blood: "Medical or lab fee required" },
    { aspect: "Legal use", calc: "Educational only", breath: "May be admissible depending on device and process", blood: "Strongest legal evidence" },
    { aspect: "Speed", calc: "Instant", breath: "Instant", blood: "Delayed" },
  ],

  zh: [
    { aspect: "方式", calc: "Widmark 公式", breath: "呼气传感器估算", blood: "实验室血液检测" },
    { aspect: "准确度", calc: "近似估算", breath: "认证设备更准确", blood: "最高" },
    { aspect: "成本", calc: "免费", breath: "需要购买设备", blood: "需要医疗或实验室费用" },
    { aspect: "法律用途", calc: "仅供参考", breath: "视设备和流程可能具有证据效力", blood: "法律效力最强" },
    { aspect: "速度", calc: "即时", breath: "即时", blood: "有延迟" },
  ],
} as const;

export function getBlogPosts(locale: Locale) {
  return blogPosts[locale];
}
