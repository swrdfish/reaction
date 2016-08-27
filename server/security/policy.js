import { BrowserPolicy } from "meteor/browser-policy-common";
import { WebApp } from "meteor/webapp";

/* eslint camelcase: 0 */

// this is the localhost/ ROOT_URL to trust
const rootUrl = __meteor_runtime_config__.ROOT_URL;

//
// external sites we trust
//
const trusted = [
  "assets.reactioncommerce.com",
  "*.facebook.com",
  "*.fbcdn.net",
  "connect.facebook.net",
  "*.googleusercontent.com",
  "fbcdn-profile-a.akamaihd.net",
  "secure.gravatar.com",
  "i0.wp.com",
  "cdnjs.cloudflare.com",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "enginex.kadira.io",
  "*.stripe.com"
];

/**
 * Set headers for Reaction CDN
 */
WebApp.rawConnectHandlers.use((req, res, next) => {
  if (req._parsedUrl.pathname.match(/\.(ttf|ttc|otf|eot|woff|svg|font\.css|css)$/)) {
    res.setHeader("Access-Control-Allow-Origin", "assets.reactioncommerce.com");
  }
  next();
});

//
// disallow policies
//
BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowFontDataUrl();
BrowserPolicy.content.disallowConnect();

//
// allow local ddp connection
//
BrowserPolicy.content.allowConnectOrigin(rootUrl);
BrowserPolicy.content.allowConnectOrigin(rootUrl.replace("http", "ws"));

//
// allow trusted origins
//
for (let origin of trusted) {
  origin = "https://" + origin;
  BrowserPolicy.content.allowOriginForAll(origin);
}
