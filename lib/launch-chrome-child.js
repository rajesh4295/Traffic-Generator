var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var proxy = require('selenium-webdriver/proxy');
var chrome_path = require('chromedriver').path;
var logger = require('./logger');
const ClassName = "LaunchChrome";

var service = new chrome.ServiceBuilder(chrome_path).build();
chrome.setDefaultService(service);

var data = process.argv.slice(2);
var proxyIP = data[0];
var url = data[1];
(async function example() {
    logger.info(ClassName+"-"+proxyIP+" - Browser launch Initiated");
    var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions({"profile.default_content_settings":{images:2}})
    .setProxy(proxy.manual({https:proxyIP}))
    .build();
  try {
    await driver.get(url);
  } 
  catch(err){
    logger.error(err);
  }
  finally {
    logger.info(ClassName+"-"+proxyIP+" - Browser request Completed");
    await driver.quit();
  }
})();