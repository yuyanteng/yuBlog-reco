import { defineUserConfig } from 'vuepress'
// import type { DefaultThemeOptions } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'

export default defineUserConfig({
  title: 'Martin的早晨 | 每一天',
  description: 'Just playing around',
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    catalogTitle: '拥抱变化 拥抱未来',
    logo: '/firegif.gif',
    author: 'Martin',
    authorAvatar: '/firegif.gif',
    docsRepo: 'https://github.com/yuyanteng',
    docsBranch: 'main',
    docsDir: 'example',
    lastUpdatedText: '',
    autoSetCategory: true,
    // series 为原 sidebar
    series: {
      // '/docs/theme-reco/': [
      //   {
      //     text: 'module one',
      //     children: ['home', 'theme']
      //   },
      //   {
      //     text: 'module two',
      //     children: ['api', 'plugin']
      //   }
      // ],
      '/docs/base/': [
        {
          text: '敲门的前端',
          children: ['arrayMethods', 'ES7-ES12-Knowledge']
        },
        {
          text: '进击的前端',
          children: ['handwriting']
        }
      ],
      '/docs/react/': [
        {
          text: 'React基础',
          children: ['reactRoad']
        },
        {
          text: 'React必备',
          children: ['redux']
        }
      ],
      '/docs/vue/': [
        {
          text: 'vue基础',
          children: ['vueRoad']
        }
      ],
      '/docs/miniProgram/': [
        {
          text: '小程序',
          children: ['miniRoad']
        }
      ],
      '/docs/moreKnow/': [
        {
          text: '必备知识',
          children: ['moreKnow', 'git', 'webpack']
        },
        {
          text: '装载知识',
          children: ['node']
        }
      ],
      '/docs/informalEssay/': [
        {
          text: '工作',
          children: ['webRoad', 'essay-road']
        },
      ]
    },
    navbar:
      [
        { text: '我的概述', link: '/' },
        { text: '前端基础', link: '/docs/base/arrayMethods' },
        // { text: '前端基础', link: '/categories/base' },
        { text: 'React', link: '/docs/react/reactRoad' },
        { text: 'Vue', link: '/docs/vue/vueRoad' },
        { text: '小程序', link: '/docs/miniProgram/miniRoad' },
        {
          text: '前端披荆斩棘',
          link: '/docs/moreKnow/moreKnow',
          // children: [
          //   { text: 'vuepress-reco', link: '/docs/theme-reco/theme' },
          //   { text: 'vuepress-theme-reco', link: '/blogs/other/guide' }
          // ]
        },
        { text: '工作and生活', link: '/docs/informalEssay/webRoad' },
        { text: 'Github', link: 'https://github.com/yuyanteng' },
      ],
    bulletin: {
      body: [
        {
          type: 'text',
          content: `
          <h6>🎉🎉🎉当下：大疆电商领域负责前端工作</h6>
          <p>🎉🎉🎉<strong>未来：</strong>暂时没有更换的想法，未来可能会寻求一份前端工作</p>
          <p>🎉🎉🎉大佬们，捞一捞我。门口站岗也是可以的呢。</p>
          `,
          style: 'font-size: 12px;'
        },
        {
          type: 'hr',
        },
        {
          type: 'title',
          content: '技术栈',
        },
        {
          type: 'text',
          content: `
          <ul>
            <li>React</li>
            <li>Webpack</li>
            <li>typescript</li>
          </ul>`,
          style: 'font-size: 12px;'
        },
        {
          type: 'hr',
        },
        {
          type: 'buttongroup',
          children: [
            {
              text: '打赏',
              link: '/docs/others/donate.html'
            }
          ]
        }
      ],
    },
    // valineConfig 配置与 1.x 一致
    // valineConfig: {
    //   appId: 'xxx',
    //   appKey: 'xxx',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
    //   verify: true, // 验证码服务
    //   // notify: true,
    //   recordIP: true,
    //   // hideComments: true // 隐藏评论
    // },
  }),
  // debug: true,
})
