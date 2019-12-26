var chrome = require('./launch-chorme');
var firefox = require('./launch-firefox');
var proxy = require('./get-proxy')
var logger = require('./logger');
var cp = require('child_process');
var bluebird = require('bluebird');
require('dotenv').config();
// var proxyList = require('../proxies/proxies.json');

const ClassName = "BotController";

class BotController{

    init(){
        return new Promise((resolve, reject) => {
            let inits = [chrome.init(), firefox.init(), proxy.init()];
            this.agents = process.env.AGENTS.split(',');
            Promise.all(inits).then(() => {
                logger.info(ClassName+" - Initialized Successfully.");
                resolve();
            }, (err) =>{
                logger.error(ClassName+" - Controller initialized failed");
                logger.error(err);
                reject(err);
            });
        });
    }

    generateHits(){
        var me = this;
        return new Promise(async(resolve, reject) => {
            proxy.getSSLProxy().then((proxyList) => {
                if(proxyList && proxyList.sslproxies && proxyList.sslproxies.length>0){
                    let promises = [];
                    for(let i=0;i<20;i++){
                        let IP = proxyList.sslproxies[Math.floor(Math.random()*proxyList.sslproxies.length)];
                        let agent = me.agents[Math.floor(Math.random()*me.agents.length)];
                            let args = {
                                ip: IP,
                                agent : agent,
                                url:"https://naukrihack.wordpress.com"
                            }
                            console.log(`${agent} - ${IP}`);
                            promises.push(args);
                    }

                    bluebird.map(promises, function(promise){
                        return me.selectAgent(promise);
                    },{
                        concurrency: 3
                    }).then(() => {
                        resolve();
                    });
                }
            },err => {
                logger.error(ClassName+" - Proxy refresh failed");
                logger.error(err);
                reject(err);
            }).catch(err => {
                logger.error(ClassName+" - Proxy refresh failed");
                logger.error(err);
                reject(err);
            });
        }).catch((err) => {
            logger.error(ClassName+" - Traffic send Error.");
            logger.error(ClassName+" "+ err);
            reject();
        });
    }

    selectAgent(promise){
        var me = this;
        return new Promise((resolve, reject) => {
            let args = [promise.ip, promise.url];
            if(promise.agent === "chrome"){
                me.launchChildChrome(args).then(() => {
                    resolve();
                });
            }else{
                me.launchChildFirefox(args).then(() => {
                    resolve();
                });
            }
        });
    }

    launchChildChrome(args){
        return new Promise((resolve, reject) => {
            var child = cp.fork('./lib/launch-chrome-child.js',args);
            child.on("error", ()=>{
                logger.error("Child process completed with error");
                resolve();
            })
            child.on("exit", ()=>{
                logger.info("Child process completed");
                resolve();
            });
        });
    }

    launchChildFirefox(args){
        return new Promise((resolve, reject) => {
            var child = cp.fork('./lib/launch-firefox-child.js',args);
            child.on("error", ()=>{
                logger.error("Child process completed with error");
                resolve();
            })
            child.on("exit", ()=>{
                logger.info("Child process completed");
                resolve();
            });
        });
    }

}

module.exports = new BotController();