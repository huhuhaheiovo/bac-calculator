import type { DrinkType, LegalLimit } from "@/types/calculator";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://baccalculator.me";

export const DRINK_TYPES: DrinkType[] = [
  {
    id: "beer",
    alcoholOz: 0.6,
    iconSrc: "/image/beer-icon.svg",
    showInSimpleMode: true,
    label: {
      en: "Regular Beer",
      zh: "普通啤酒",
    },
    description: {
      en: "12 oz, 5% ABV",
      zh: "355 mL，5% 酒精度",
    },
  },
  {
    id: "strong-beer",
    alcoholOz: 0.9,
    label: {
      en: "Strong Beer",
      zh: "高酒精啤酒",
    },
    description: {
      en: "12 oz, 7.5% ABV",
      zh: "355 mL，7.5% 酒精度",
    },
  },
  {
    id: "wine",
    alcoholOz: 0.6,
    iconSrc: "/image/wine-icon.svg",
    showInSimpleMode: true,
    label: {
      en: "Wine",
      zh: "葡萄酒",
    },
    description: {
      en: "5 oz, 12% ABV",
      zh: "150 mL，12% 酒精度",
    },
  },
  {
    id: "shot",
    alcoholOz: 0.6,
    iconSrc: "/image/liquor-icon.svg",
    showInSimpleMode: true,
    label: {
      en: "Shot / Spirits",
      zh: "烈酒 / Shot",
    },
    description: {
      en: "1.5 oz, 40% ABV",
      zh: "45 mL，40% 酒精度",
    },
  },
  {
    id: "double",
    alcoholOz: 1.2,
    label: {
      en: "Double Shot",
      zh: "双份烈酒",
    },
    description: {
      en: "3 oz, 40% ABV",
      zh: "90 mL，40% 酒精度",
    },
  },
  {
    id: "cocktail",
    alcoholOz: 0.75,
    label: {
      en: "Mixed Cocktail",
      zh: "调制鸡尾酒",
    },
    description: {
      en: "Average 1-1.5 oz spirits",
      zh: "平均含 30-45 mL 烈酒",
    },
  },
];

export const LEGAL_LIMITS: LegalLimit[] = [
  {
    id: "us",
    code: "US",
    name: {
      en: "United States",
      zh: "美国",
    },
    limitPercent: 0.08,
    notes: {
      en: "Utah: 0.05%. Zero tolerance under 21.",
      zh: "犹他州为 0.05%，21 岁以下通常零容忍。",
    },
  },
  {
    id: "uk-england-wales",
    code: "UK",
    name: {
      en: "UK (England & Wales)",
      zh: "英国（英格兰和威尔士）",
    },
    limitPercent: 0.08,
    notes: {
      en: "Separate threshold from Scotland.",
      zh: "与苏格兰适用不同阈值。",
    },
  },
  {
    id: "uk-scotland",
    code: "UK",
    name: {
      en: "UK (Scotland)",
      zh: "英国（苏格兰）",
    },
    limitPercent: 0.05,
    notes: {
      en: "Lower limit than England and Wales.",
      zh: "阈值低于英格兰和威尔士。",
    },
  },
  {
    id: "canada",
    code: "CA",
    name: {
      en: "Canada",
      zh: "加拿大",
    },
    limitPercent: 0.08,
    notes: {
      en: "Warning range starts at 0.05%.",
      zh: "部分地区 0.05% 起就会进入警示范围。",
    },
  },
  {
    id: "australia",
    code: "AU",
    name: {
      en: "Australia",
      zh: "澳大利亚",
    },
    limitPercent: 0.05,
    notes: {
      en: "0.00% for probationary drivers.",
      zh: "实习或临时驾照驾驶员可能适用 0.00%。",
    },
  },
  {
    id: "germany",
    code: "DE",
    name: {
      en: "Germany",
      zh: "德国",
    },
    limitPercent: 0.05,
    notes: {
      en: "Lower threshold for some drivers.",
      zh: "部分驾驶员适用更低标准。",
    },
  },
  {
    id: "france",
    code: "FR",
    name: {
      en: "France",
      zh: "法国",
    },
    limitPercent: 0.05,
    notes: {
      en: "Often stricter for novice drivers.",
      zh: "新手驾驶员往往更严格。",
    },
  },
  {
    id: "japan",
    code: "JP",
    name: {
      en: "Japan",
      zh: "日本",
    },
    limitPercent: 0.03,
    notes: {
      en: "Strict enforcement; near zero tolerance.",
      zh: "执法严格，接近零容忍。",
    },
  },
  {
    id: "china",
    code: "CN",
    name: {
      en: "China",
      zh: "中国",
    },
    limitPercent: 0.02,
    notes: {
      en: "Drunk driving threshold is higher, but this is the drink-driving line.",
      zh: "醉驾标准更高，但这里显示的是饮酒驾驶线。",
    },
  },
  {
    id: "sweden",
    code: "SE",
    name: {
      en: "Sweden",
      zh: "瑞典",
    },
    limitPercent: 0.02,
    notes: {
      en: "Among the strictest in Europe.",
      zh: "属于欧洲最严格的标准之一。",
    },
  },
  {
    id: "brazil",
    code: "BR",
    name: {
      en: "Brazil",
      zh: "巴西",
    },
    limitPercent: 0,
    notes: {
      en: "Zero tolerance policy.",
      zh: "零容忍政策。",
    },
  },
  {
    id: "hungary",
    code: "HU",
    name: {
      en: "Hungary",
      zh: "匈牙利",
    },
    limitPercent: 0,
    notes: {
      en: "Zero tolerance policy.",
      zh: "零容忍政策。",
    },
  },
  {
    id: "czech-republic",
    code: "CZ",
    name: {
      en: "Czech Republic",
      zh: "捷克共和国",
    },
    limitPercent: 0,
    notes: {
      en: "Zero tolerance policy.",
      zh: "零容忍政策。",
    },
  },
  {
    id: "india",
    code: "IN",
    name: {
      en: "India",
      zh: "印度",
    },
    limitPercent: 0.03,
    notes: {
      en: "Threshold varies in enforcement by state, but 0.03% is commonly cited.",
      zh: "不同地区执法存在差异，但常见参考值为 0.03%。",
    },
  },
  {
    id: "mexico",
    code: "MX",
    name: {
      en: "Mexico",
      zh: "墨西哥",
    },
    limitPercent: 0.08,
    notes: {
      en: "Local enforcement can vary.",
      zh: "不同地区执法可能存在差异。",
    },
  },
  {
    id: "new-zealand",
    code: "NZ",
    name: {
      en: "New Zealand",
      zh: "新西兰",
    },
    limitPercent: 0.05,
    notes: {
      en: "Lower alcohol-breath limit rules also apply.",
      zh: "同时还存在更细的呼气酒精标准。",
    },
  },
  {
    id: "south-africa",
    code: "ZA",
    name: {
      en: "South Africa",
      zh: "南非",
    },
    limitPercent: 0.05,
    notes: {
      en: "Professional drivers may face stricter rules.",
      zh: "职业驾驶员可能适用更严格规则。",
    },
  },
  {
    id: "south-korea",
    code: "KR",
    name: {
      en: "South Korea",
      zh: "韩国",
    },
    limitPercent: 0.03,
    notes: {
      en: "Penalties escalate quickly above the threshold.",
      zh: "超过阈值后处罚升级很快。",
    },
  },
  {
    id: "singapore",
    code: "SG",
    name: {
      en: "Singapore",
      zh: "新加坡",
    },
    limitPercent: 0.08,
    notes: {
      en: "Severe penalties and strict enforcement.",
      zh: "处罚严厉且执法严格。",
    },
  },
  {
    id: "norway",
    code: "NO",
    name: {
      en: "Norway",
      zh: "挪威",
    },
    limitPercent: 0.02,
    notes: {
      en: "Very strict threshold.",
      zh: "阈值非常严格。",
    },
  },
  {
    id: "poland",
    code: "PL",
    name: {
      en: "Poland",
      zh: "波兰",
    },
    limitPercent: 0.02,
    notes: {
      en: "Very strict threshold.",
      zh: "阈值非常严格。",
    },
  },
  {
    id: "russia",
    code: "RU",
    name: {
      en: "Russia",
      zh: "俄罗斯",
    },
    limitPercent: 0.035,
    notes: {
      en: "Often represented as 0.035%.",
      zh: "常见表示为 0.035%。",
    },
  },
];
