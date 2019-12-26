var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();
var logger = require('./lib/logger');
var routes = require('./routes/route');
var controller = require('./lib/controller');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(process.env.PORT || 3000, () => {
    logger.info("Initialization Start");
    controller.init().then(() => {
        logger.info("Bot running on port "+process.env.PORT || 3000);
        logger.info("Initialization End");
        logger.info("Customer request Initiated.");
            controller.generateHits().then(() => {
                logger.info("Customer request complete.");
                process.exit();
            }, (err) =>{
                logger.error("Customer request failed.");
                logger.error(err);
                process.exit(1);
            }).catch((err) =>{
                logger.error("Customer request failed.");
                logger.error(err);
                process.exit(1);
            });
    }, err =>{
        logger.error("Initialization Error");
        process.exit(1);
    });
    
});
// var webdriver = require('selenium-webdriver');
// var chrome = require('selenium-webdriver/chrome'),
//  firefox = require('selenium-webdriver/firefox'),
// proxy = require('selenium-webdriver/proxy');
// var chrome_path = require('chromedriver').path;
// var firefox_path = require('geckodriver').path;

// var p = '183.166.111.4:9999';
// var f_service = new firefox.ServiceBuilder(firefox_path).build();
// firefox.setDefaultService(f_service);

// (async function example() {
//     var driver = new webdriver.Builder()
//   .forBrowser('firefox')
//   .setFirefoxService(
//     new firefox.ServiceBuilder(firefox_path)
// )
// .setProxy(proxy.manual({https: p}))
// .build();
//   try {
//     await driver.get('https://naukrihack.wordpress.com/');
//   } finally {
//     await driver.quit();
    
//   }
// })();

// var service = new chrome.ServiceBuilder(chrome_path).build();
// chrome.setDefaultService(service);

// (async function example() {
//     var driver = new webdriver.Builder()
//     .withCapabilities(webdriver.Capabilities.chrome())
//     .setChromeOptions({"profile.default_content_settings":{images:2}})
//     .setProxy(proxy.manual({https:p}))
//     .build();
//   try {
//     await driver.get('https://naukrihack.wordpress.com/');
//   } finally {
//     await driver.quit();
//   }
// })();


// configure browser options ...


// var ie = require('selenium-webdriver/ie');
// var ie_path = require('iedriver').path;

//     (async function example() {

//         var driver = new webdriver.Builder()
//         .forBrowser('internet explorer')
//         .setIeOptions(new ie.Options().setExtractPath(ie_path))
//         .build();
//         try {
//             await driver.get('https://naukrihack.wordpress.com/');
//             //...............
//             //...............
//         } finally {
//             await driver.quit();
//         }
//     })();