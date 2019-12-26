var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var logger = require('./logger');
require('dotenv').config();
const ClassName = "GetProxy";

class GetProxy{
    init(){
        return new Promise((resolve, reject) => {
            this.proxyFilePath = path.join(__dirname,'../','./proxies','/proxies.json');
            logger.info(ClassName+" - Path returned "+ this.proxyFilePath);
            logger.info(ClassName+" - Initialized Successfully");
            resolve();
        });
    }

    getSSLProxy(){
        var me = this;
        return new Promise((resolve, reject) =>{
            let ip_addresses = [];
            let port_numbers = [];

            request("https://sslproxies.org/", function(error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);

                $("td:nth-child(1)").each(function(index, value) {
                ip_addresses[index] = $(this).text();
                });

                $("td:nth-child(2)").each(function(index, value) {
                port_numbers[index] = $(this).text();
                });
            } else {
                logger.error("Error loading proxy, please try again");
                reject();
            }

            // ip_addresses.join(", ");
            // port_numbers.join(", ");
            let pxy={};
            let extractedProxies = [];
            for(let i=0,length=99;i<length;i++){
                extractedProxies.push(`${ip_addresses[i]}:${port_numbers[i]}`);
            }
            pxy["sslproxies"] = extractedProxies;
            fs.appendFileSync(me.proxyFilePath, JSON.stringify(pxy));
            logger.info(ClassName+" - Proxy refresh completed successfully");
            resolve(pxy);
            });
        });
    }
}

module.exports = new GetProxy();