const headerLinks = [
  {
    title: "Getting Started",
    path: "https://docs.nav2.org/getting_started/index.html",
  },
  {
    title: "Concepts",
    path: "#",
    children: [
      { title: "Navigation Concepts", path: "https://docs.nav2.org/concepts/index.html" },
      { title: "Behavior Trees", path: "https://docs.nav2.org/behavior_trees/index.html" },
    ],
  },
  {
    title: "Tutorials",
    path: "#",
    children: [
      { title: "First Time Robot Setup Guide", path: "https://docs.nav2.org/setup_guides/index.html" },
      { title: "General Tutorials", path: "https://docs.nav2.org/tutorials/index.html" },
      { title: "Plugin Tutorials", path: "https://docs.nav2.org/plugin_tutorials/index.html" }
    ],
  },
  {
    title: "Configuration",
    children: [
      { title: "Tuning", path: "https://docs.nav2.org/tuning/index.html" },
      { title: "Configuration", path: "https://docs.nav2.org/configuration/index.html", },
      { title: "Plugins", path: "https://docs.nav2.org/plugins/index.html" }
    ]
  },
  {
    title: "About",
    path: "#",
    children: [
      { title: "Contact", path: "https://docs.nav2.org/about/index.html" },
      { title: "Robots", path: "https://docs.nav2.org/about/robots.html" },
    ]
  },
];

export default headerLinks;