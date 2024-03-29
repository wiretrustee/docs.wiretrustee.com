// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Wiretrustee Documentation',
  tagline: '',
  url: 'https://wiretrustee.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wiretrustee',
  projectName: 'wiretrustee',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl: 'https://github.com/wiretrustee/docs.wiretrustee.com/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/wiretrustee/wiretrustee-docs/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'Wiretrustee Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.svg',
          href: 'https://wiretrustee.com/',
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            position: 'right',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/wiretrustee/wiretrustee',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      announcementBar: {
        id: 'announcementBar-1',
        content:
            '⭐ If you like Wiretrustee, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/wiretrustee/wiretrustee">GitHub</a></a>',
        backgroundColor: '#e3e3e3',
        textColor: '#091E42',
        isCloseable: true,
      },
    }),
};

module.exports = config;
