var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var proxy = require('selenium-webdriver/proxy');
var firefox_path = require('geckodriver').path;
var logger = require('./logger');
const ClassName = "LaunchFirefox";

class LaunchFirefox{

    init(){
        return new Promise((resolve, reject) => {
            logger.info(ClassName+" - Initialized Successfully")
            resolve();
        });
    }

   launchFirefox(url, proxyIP){
        return new Promise(async(resolve, reject) => {
            try {
            logger.info(ClassName+" - Browser launch Initiated");
            var driver = new webdriver.Builder()
            .forBrowser('firefox')
            .setFirefoxService(
              new firefox.ServiceBuilder(firefox_path)
          )
          .setProxy(proxy.manual({https: proxyIP}))
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

module.exports = new LaunchFirefox();
