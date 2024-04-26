const headerLinks = [
  {
    title: "Getting Started",
    path: "https://navigation.ros.org/getting_started/index.html",
  },
  {
    title: "Concepts",
    path: "#",
    children: [
      { title: "Navigation Concepts", path: "https://navigation.ros.org/concepts/index.html" },
      { title: "Behavior Trees", path: "https://navigation.ros.org/behavior_trees/index.html" },
    ],
  },
  {
    title: "Tutorials",
    path: "#",
    children: [
      { title: "First Time Robot Setup Guide", path: "https://navigation.ros.org/setup_guides/index.html" },
      { title: "General Tutorials", path: "https://navigation.ros.org/tutorials/index.html" },
      { title: "Plugin Tutorials", path: "https://navigation.ros.org/plugin_tutorials/index.html" }
    ],
  },
  {
    title: "Configuration",
    children: [
      { title: "Tuning", path: "https://navigation.ros.org/tuning/index.html" },
      { title: "Configuration", path: "https://navigation.ros.org/configuration/index.html", },
      { title: "Plugins", path: "https://navigation.ros.org/plugins/index.html" }
    ]
  },
  {
    title: "About",
    path: "#",
    children: [
      { title: "Contact", path: "https://navigation.ros.org/about/index.html" },
      { title: "Robots", path: "https://navigation.ros.org/about/robots.html" },
    ]
  },
];

export default headerLinks;