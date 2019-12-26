var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var proxy = require('selenium-webdriver/proxy');
var chrome_path = require('chromedriver').path;
var logger = require('./logger');
const ClassName = "LaunchChrome";

class LaunchChrome{

    init(){
        return new Promise((resolve, reject) => {
            var service = new chrome.ServiceBuilder(chrome_path).build();
            chrome.setDefaultService(service);
            logger.info(ClassName+" - Initialized Successfully")
            resolve();
        });
    }

   launchChrome(url, proxyIP){
        return new Promise(async(resolve, reject) => {
            try {
            logger.info(ClassName+" - Browser launch Initiated");
                var driver = new webdriver.Builder()
                .withCapabilities(webdriver.Capabilities.chrome())
                .setChromeOptions({"profile.default_content_settings":{images:2}})
                .setProxy(proxy.manual({https:proxyIP}))
                .build();
              
                await driver.get(url);
              } 
              catch(err){
                logger.error(err);
              }
              finally {
                await driver.quit();
                logger.info(ClassName+" - Browser request Completed");
                resolve();
              }
        }).catch((err) => {
            logger.error(ClassName+" - Browser request Completed");
            logger.error(ClassName+" "+ err);
        });
    }
}

module.exports = new LaunchChrome();
