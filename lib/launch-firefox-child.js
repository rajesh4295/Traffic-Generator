var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var proxy = require('selenium-webdriver/proxy');
var firefox_path = require('geckodriver').path;
var logger = require('./logger');

const ClassName = "LaunchFirefox";

var data = process.argv.slice(2);
var proxyIP = data[0];
var url = data[1];

(async function example() {
    logger.info(ClassName+"-"+proxyIP+" - Browser launch Initiated");
  
    var driver = new webdriver.Builder()
  .forBrowser('firefox')
  .setFirefoxService(
    new firefox.ServiceBuilder(firefox_path)
)
.setProxy(proxy.manual({https: proxyIP}))
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