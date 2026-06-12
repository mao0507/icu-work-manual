import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-TW',
  title: 'ICU 工作手冊',
  description: 'ICU 新人工作手冊 — 工作守則、三班常規、檢查處置、藥物與呼吸照護',
  base: '/',
  srcDir: 'src',
  themeConfig: {
    nav: [
      { text: '首頁', link: '/' },
      { text: '開始閱讀', link: '/guide/work-rules' },
    ],
    sidebar: [
      {
        text: '新人必讀',
        collapsed: false,
        items: [
          { text: '工作守則', link: '/guide/work-rules' },
          { text: '認識單位環境', link: '/guide/environment' },
          { text: 'ICU 三班常規', link: '/guide/shift-routine' },
          { text: '交接班注意事項', link: '/guide/handover' },
          { text: '各項點班', link: '/guide/inventory-check' },
        ],
      },
      {
        text: '日常作業',
        collapsed: false,
        items: [
          { text: '給藥與血糖監測時間', link: '/guide/medication-times' },
          { text: '溶液開封效期', link: '/guide/solution-expiry' },
          { text: '保護性約束', link: '/guide/restraint' },
        ],
      },
      {
        text: '病人進出',
        collapsed: false,
        items: [
          { text: '跨單位交班', link: '/guide/cross-unit-handover' },
          { text: '接新病人（病房／急診）', link: '/guide/new-patient' },
          { text: '手術前準備檢閱', link: '/guide/pre-op' },
          { text: '接下刀（術後）', link: '/guide/post-op' },
        ],
      },
      {
        text: '檢查與檢驗',
        collapsed: false,
        items: [
          { text: '常見檢查／處置', link: '/guide/examinations' },
          { text: '12 Lead EKG', link: '/guide/ekg' },
          { text: '採血順序與血液培養', link: '/guide/blood-sampling' },
          { text: '辨識培養結果', link: '/guide/culture-results' },
          { text: '常用抗生素', link: '/guide/antibiotics' },
        ],
      },
      {
        text: '照護重點',
        collapsed: false,
        items: [
          { text: '壓力性損傷', link: '/guide/pressure-injury' },
          { text: '隔離種類與 ANC 計算', link: '/guide/isolation' },
        ],
      },
      {
        text: '藥物',
        collapsed: false,
        items: [
          { text: '高警訊藥物泡製', link: '/guide/high-alert-drugs' },
          { text: '常用管制藥物', link: '/guide/controlled-drugs' },
          { text: '急救車藥物', link: '/guide/crash-cart' },
        ],
      },
      {
        text: '呼吸照護',
        collapsed: false,
        items: [
          { text: 'ABG 判讀', link: '/guide/abg' },
          { text: '各式氧氣療法', link: '/guide/oxygen-therapy' },
          { text: '常見呼吸器模式', link: '/guide/ventilator-modes' },
          { text: 'G5 呼吸器簡介', link: '/guide/ventilator-g5' },
          { text: '840 呼吸器簡介', link: '/guide/ventilator-840' },
          { text: '呼吸器警報判讀', link: '/guide/ventilator-alarms' },
          { text: '拔管指標（WEANS NOW）', link: '/guide/extubation' },
        ],
      },
      {
        text: '技術與評估',
        collapsed: false,
        items: [
          { text: '常用技術', link: '/guide/common-skills' },
          { text: '肋膜積液', link: '/guide/pleural-effusion' },
          { text: '鎮靜評估量表（RASS）', link: '/guide/sedation-scale' },
          { text: '常用評估量表（GCS）', link: '/guide/assessment-scales' },
        ],
      },
    ],
    outline: { label: '本頁目錄', level: [2, 3] },
    docFooter: { prev: '上一頁', next: '下一頁' },
    returnToTopLabel: '回到頂部',
    sidebarMenuLabel: '目錄',
    darkModeSwitchLabel: '深色模式',
    lastUpdated: { text: '最後更新' },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜尋', buttonAriaLabel: '搜尋' },
          modal: {
            noResultsText: '找不到結果',
            resetButtonTitle: '清除搜尋條件',
            footer: { selectText: '選擇', navigateText: '切換', closeText: '關閉' },
          },
        },
      },
    },
  },
})
