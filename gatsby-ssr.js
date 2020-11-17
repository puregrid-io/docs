// Import React so that you can use JSX in HeadComponents
const React = require("react")

const HeadComponents = [
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HZR85QLNRL"></script>,
  <script>{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HZR85QLNRL');
`}</script>
]

exports.onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes
}, pluginOptions) => {
  setHeadComponents(HeadComponents)
}