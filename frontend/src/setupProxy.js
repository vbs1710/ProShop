// Note - anytime you make a change to the setupProxy file you'll need to restart your server.
// ye wali file ka use mene stephen grider wale course mei seekha tha..... create react app apne aap iss naam ki proxy file ko dhundhta h .... iss file ko kahi bhi import krne ki zrurat nhi h
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api/*"],  // iska ye matlab ye h ki jab bhi /api or /auth/google pr get request denge hum toh usko aise proxy(treat) krenge(respectively) "http://localhost:5000/api" OR "http://localhost:5000/auth/google"... ab chahe ye request localhost:3000 se ho ya rockysprings wale domain se .... usko "http://localhost:5000/auth/google" ki tarah hi treat kra jaaayga... so proxy matlab ki humne jhuta behaviour krwaya uss link se(matlab uske natural bahaviour se usko different behave krwaya with help of proxy)...
    createProxyMiddleware({    //  jo upar square bracket lagaye h usmei hum multiple api laga skte h 
      target: "http://localhost:5000",
    })
  );
};


//*******below is the good explanation for how this createProxyMiddleware is working****
// Multi Path
// This will match paths starting with /api or /rest

// const { createProxyMiddleware } = require('http-proxy-middleware');

// const apiProxy = createProxyMiddleware(['/api', '/rest'], { target: 'http://localhost:3000' });

// `/api/foo/bar` -> `http://localhost:3000/api/foo/bar`
// `/rest/lorum/ipsum` -> `http://localhost:3000/rest/lorum/ipsum`
//https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/context-matching.md -->iss link pr se reference lia h
// *******                  END            **************