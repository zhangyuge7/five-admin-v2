export default {
  path: '/demo',
  name: 'Demo',
  meta: {
    title: 'menus.demo',
    isHide: false,
    hideChildren: false,
    roles: null,
    icon: 'mdi:ev-plug-chademo',
    sortNo: 12,
  },
  children: [
    {
      path: '/link',
      name: 'Link',
      meta: {
        title: 'menus.externalLink',
        isHide: false,
        icon: 'ph:link-light',
      },
      children: [
        {
          path: 'https://cn.vuejs.org/',
          name: 'VueDocs',
          meta: {
            title: 'Vue',
            isHide: false,
            icon: 'vscode-icons:file-type-vue',
          },
        },
        {
          path: 'https://cn.vitejs.dev/,_self',
          name: 'ViteDocs',
          meta: {
            title: 'Vite',
            isHide: false,
            icon: 'logos:vitejs',
          },
        },
      ],
    },
    {
      path: '/iframe-link',
      name: 'IfrmameLink',
      meta: {
        title: 'menus.iframeLink',
        isHide: false,
        icon: 'material-symbols:join-inner',
      },
      children: [
        {
          path: '/iframe-link/doc1',
          name: 'Doc1',
          meta: {
            title: 'ElementPlus',
            isHide: false,
            icon: 'logos:element',
            iframeLink: 'https://element-plus.org/zh-CN/',
          },
          component: () => import('@/layout/main/LayoutIframe.vue'),
        },
        {
          path: '/iframe-link/doc2',
          name: 'Doc2',
          meta: {
            title: 'menus.bilibili',
            isHide: false,
            icon: 'tabler:brand-bilibili',
            iframeLink: 'https://www.bilibili.com/',
          },
          component: () => import('@/layout/main/LayoutIframe.vue'),
        },
      ],
    },
    {
      path: '/screen',
      name: 'Screen',
      meta: {
        title: 'menus.dataBigScreen',
        icon: 'ph:monitor-thin',

      },
      children: [
        {
          path: '/screen/1',
          name: 'BigScreen1',
          meta: {
            title: 'menus.dataBigScreen1',
            icon: 'ph:monitor-thin',
            isOuter: true,
            isKeep: true,
          },
          component: () => import('@/views/demo/data-big-screen/BigScreen1.vue'),
        },
        {
          path: '/screen/2',
          name: 'BigScreen2',
          meta: {
            title: 'menus.dataBigScreen2',
            icon: 'ph:monitor-thin',
            isOuter: true,
          },
          component: () => import('@/views/demo/data-big-screen/BigScreen2.vue'),
        },
      ],

    },
    {
      path: '/demo/permission',
      name: 'Permission',
      meta: {
        title: 'menus.permission',
        icon: 'arcticons:permissionsmanager',
        sortNo: 1,
      },
      children: [
        {
          path: '/demo/permission/button',
          name: 'PermissionButton',
          meta: {
            title: 'menus.permissionButton',
            icon: 'ic:twotone-radio-button-unchecked',
          },
          component: () => import('@/views/demo/permission/ButtonPerm.vue'),
        },
        {
          path: '/demo/permission/page-admin',
          name: 'PermissionPageAdmin',
          meta: {
            title: 'menus.permissionPage',
            icon: 'streamline:interface-content-book-page-pages-content-books-book-open',
            roles: ['admin'],
            sortNo: 1,
          },
          component: () => import('@/views/demo/permission/PagePermAdmin.vue'),
        },
        {
          path: '/demo/permission/page-test',
          name: 'PermissionPageTest',
          meta: {
            title: 'menus.permissionPage',
            icon: 'streamline:interface-content-book-page-pages-content-books-book-open',
            roles: ['test'],
          },
          component: () => import('@/views/demo/permission/PagePermTest.vue'),
        },
      ],
    },
    {
      path: '/demo/page-keep',
      name: 'PageKeep1',
      meta: {
        title: 'menus.pageKeep',
        icon: 'material-symbols:360',
      },
      children: [
        {
          path: '/demo/page-keep/keep',
          name: 'PageKeep',
          meta: {
            title: 'menus.hasKeep',
            isKeep: true,
          },
          component: () => import('@/views/demo/page-keep/PageKeep.vue'),
        },
        {
          path: '/demo/page-keep/not-keep',
          name: 'NotPageKeep',
          meta: {
            title: 'menus.notKeep',
          },
          component: () => import('@/views/demo/page-keep/NotPageKeep.vue'),
        },
      ],
    },
    {
      path: '/demo/mitt',
      name: 'Mitt',
      meta: {
        title: 'menus.mitt',
        icon: 'material-symbols:airline-stops',
      },
      component: () => import('@/views/demo/mitt/index.vue'),
    },
    {
      path: '/demo/full-screen',
      name: 'FullScreen',
      meta: {
        title: 'menus.fullScreen',
        icon: 'ep:full-screen',
      },
      component: () => import('@/views/demo/full-screen/index.vue'),
    },
  ],
}
