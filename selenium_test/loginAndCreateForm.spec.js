const fs = require('fs');
const path = require('path');
const chai = require("chai");
const should = chai.should();
const JWebDriver = require('jwebdriver');
chai.use(JWebDriver.chaiSupportChainPromise);
const resemble = require('resemblejs-node');
resemble.outputSettings({
    errorType: 'flatDifferenceIntensity'
});

const rootPath = getRootPath();

module.exports = function(){

    let driver, testVars;

    before(function(){
        let self = this;
        driver = self.driver;
        testVars = self.testVars;
    });

    it('url: http://localhost:5000', async function(){
        await driver.url(_(`http://localhost:5000`));
    });

    it('waitBody: ', async function(){
        await driver.sleep(500).wait('body', 30000).html().then(function(code){
            isPageError(code).should.be.false;
        });
    });

    it('insertVar: username ( #username, {{LoginUsername}} )', async function(){
        await driver.sleep(300).wait('#username', 30000)
               .val(_(`{{LoginUsername}}`));
    });

    it('insertVar: password ( #password, {{LoginPassword}} )', async function(){
        await driver.sleep(300).wait('#password', 30000)
               .val(_(`{{LoginPassword}}`));
    });

    it('mouseUp: Sign in ( button, 375, 45, 0 )', async function(){
        await driver.sleep(300).wait('button', 30000)
               .sleep(300).mouseMove(375, 45).mouseMove(375, 45).mouseUp(0);
    });

    it('expect: displayed, button.btn.btn-signup, equal, true', async function(){
        await driver.sleep(300).wait('button.btn.btn-signup', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
    });

    it('click: Sign in ( button, 217, 21, 0 )', async function(){
        await driver.sleep(300).wait('button', 30000)
               .sleep(300).mouseMove(217, 21).click(0);
    });

    it('expect: displayed, div.new-button, equal, true', async function(){
        await driver.sleep(500).wait('div.new-button', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
    });

    it('expect: displayed, section.navbar.navbar-inverse, equal, true', async function(){
        await driver.sleep(300).wait('section.navbar.navbar-inverse', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
    });

    it('click: h4.fa, 76, 96, 0', async function(){
        await driver.sleep(300).wait('h4.fa', 30000)
               .sleep(300).mouseMove(76, 96).click(0);
    });

    it('sleep: 100', async function(){
        await driver.sleep(100);
    });

    it('expect: displayed, form[name="forms.createForm"], equal, true', async function(){
        await driver.sleep(300).wait('form[name="forms.createForm"]', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
    });

    it('× click: title ( input[name="title"], 115, 12, 0 )', async function(){
        await driver.sleep(300).wait('input[name="title"]', 30000)
               .sleep(300).mouseMove(115, 12).click(0);
    });

    it('× expect: attr, .form-item.create-new.new-form button.btn,disabled, equal, true', async function(){
        await driver.sleep(300).wait('.form-item.create-new.new-form button.btn', 30000)
            .attr('disabled')
            .should.not.be.a('error')
            .should.equal(_(`true`));
    });

    it('sendKeys: aeoaoe', async function(){
        await driver.sendKeys('aeoaoe');
    });

    it('× expect: attr, .form-item.create-new.new-form button.btn,disabled, equal, undefined', async function(){
        await driver.sleep(300).wait('.form-item.create-new.new-form button.btn', 30000)
            .attr('disabled')
            .should.not.be.a('error')
            .should.equal(_(null));
    });

    it('× click: Create this TellForm ( button, 57, 16, 0 )', async function(){
        await driver.sleep(300).wait('button', 30000)
               .sleep(300).mouseMove(57, 16).click(0);
    });

    it('× expect: displayed, i.status-light.status-light-on, equal, true', async function(){
        await driver.sleep(300).wait('i.status-light.status-light-on', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
    });

    it('× expect: displayed, .btn.btn-danger > .fa.fa-trash-o, equal, true', async function(){
        await driver.sleep(300).wait('.btn.btn-danger > .fa.fa-trash-o', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
    });

    it('× click: Create ( //a[text()="Create"], 163, 25, 2 )', async function(){
        await driver.sleep(300).wait('//a[text()="Create"]', 30000)
               .sleep(300).mouseMove(163, 25).click(2);
    });

    it('× mouseUp: aeoaoe ( section.admin-form, 467, 53, 0 )', async function(){
        await driver.sleep(300).wait('section.admin-form', 30000)
               .sleep(300).mouseMove(467, 53).mouseMove(467, 53).mouseUp(0);
    });

    it('× click: Short Text ( div:nth-child(1) > div.panel-default > div.panel-heading > span.ng-binding, 39, 4, 0 )', async function(){
        await driver.sleep(300).wait('div:nth-child(1) > div.panel-default > div.panel-heading > span.ng-binding', 30000)
               .sleep(300).mouseMove(39, 4).click(0);
    });

    it('× insertVar: title ( input[name="title"], {{ShortTextTitle}} )', async function(){
        await driver.sleep(300).wait('input[name="title"]', 30000)
               .val(_(`{{ShortTextTitle}}`));
    });

    it('mouseUp: 1  SeleniumShortText... ( body, 740, 97, 0 )', async function(){
        await driver.sleep(300).wait('body', 30000)
               .sleep(300).mouseMove(740, 97).mouseMove(740, 97).mouseUp(0);
    });

    it('× expect: text, field-directive .field-title h3, equal, 1 {{ShortTextTitle}}', async function(){
        await driver.sleep(300).wait('field-directive .field-title h3', 30000)
            .text()
            .should.not.be.a('error')
            .should.equal(_(`1 {{ShortTextTitle}}`));
    });

    it('× click: Save ( button.btn-signup, 33, 23, 0 )', async function(){
        await driver.sleep(300).wait('button.btn-signup', 30000)
               .sleep(300).mouseMove(33, 23).click(0);
    });

    it('× click: Delete Form ( span.hidden-sm, 55, 8, 0 )', async function(){
        await driver.sleep(300).wait('span.hidden-sm', 30000)
               .sleep(300).mouseMove(55, 8).click(0);
    });

    it('× dblClick: aeoaoe ( //strong[text()="aeoaoe"], 26, 4, 0 )', async function(){
        await driver.sleep(300).wait('//strong[text()="aeoaoe"]', 30000)
               .sleep(300).mouseMove(26, 4).click(0).click(0);
    });

    it('× click: input.input-block, 399, 3, 0', async function(){
        await driver.sleep(300).wait('input.input-block', 30000)
               .sleep(300).mouseMove(399, 3).click(0);
    });

    function _(str){
        if(typeof str === 'string'){
            return str.replace(/\{\{(.+?)\}\}/g, function(all, key){
                return testVars[key] || '';
            });
        }
        else{
            return str;
        }
    }

};

if(module.parent && /mocha\.js/.test(module.parent.id)){
    runThisSpec();
}

function runThisSpec(){
    // read config
    let webdriver = process.env['webdriver'] || '';
    let proxy = process.env['wdproxy'] || '';
    let config = require(rootPath + '/config.json');
    let webdriverConfig = Object.assign({},config.webdriver);
    let host = webdriverConfig.host;
    let port = webdriverConfig.port || 4444;
    let match = webdriver.match(/([^\:]+)(?:\:(\d+))?/);
    if(match){
        host = match[1] || host;
        port = match[2] || port;
    }
    let testVars = config.vars;
    let browsers = webdriverConfig.browsers;
    browsers = browsers.replace(/^\s+|\s+$/g, '');
    delete webdriverConfig.host;
    delete webdriverConfig.port;
    delete webdriverConfig.browsers;

    // read hosts
    let hostsPath = rootPath + '/hosts';
    let hosts = '';
    if(fs.existsSync(hostsPath)){
        hosts = fs.readFileSync(hostsPath).toString();
    }
    let specName = path.relative(rootPath, __filename).replace(/\\/g,'/').replace(/\.js$/,'');

    browsers.split(/\s*,\s*/).forEach(function(browserName){
        let caseName = specName + ' : ' + browserName;

        let browserInfo = browserName.split(' ');
        browserName = browserInfo[0];
        let browserVersion = browserInfo[1];

        describe(caseName, function(){

            this.timeout(600000);
            this.slow(1000);

            let driver;
            before(function(){
                let self = this;
                let driver = new JWebDriver({
                    'host': host,
                    'port': port
                });
                let sessionConfig = Object.assign({}, webdriverConfig, {
                    'browserName': browserName,
                    'version': browserVersion,
                    'ie.ensureCleanSession': true,
                    'chromeOptions': {
                        'args': ['--enable-automation']
                    }
                });
                if(proxy){
                    sessionConfig.proxy = {
                        'proxyType': 'manual',
                        'httpProxy': proxy,
                        'sslProxy': proxy
                    }
                }
                else if(hosts){
                    sessionConfig.hosts = hosts;
                }
                self.driver = driver.session(sessionConfig).maximize().config({
                    pageloadTimeout: 30000, // page onload timeout
                    scriptTimeout: 5000, // sync script timeout
                    asyncScriptTimeout: 10000 // async script timeout
                });
                self.testVars = testVars;
                let casePath = path.dirname(caseName);
                self.screenshotPath = rootPath + '/screenshots/' + casePath;
                self.diffbasePath = rootPath + '/diffbase/' + casePath;
                self.caseName = caseName.replace(/.*\//g, '').replace(/\s*[:\.\:\-\s]\s*/g, '_');
                mkdirs(self.screenshotPath);
                mkdirs(self.diffbasePath);
                self.stepId = 0;
                return self.driver;
            });

            module.exports();

            beforeEach(function(){
                let self = this;
                self.stepId ++;
                if(self.skipAll){
                    self.skip();
                }
            });

            afterEach(async function(){
                let self = this;
                let currentTest = self.currentTest;
                let title = currentTest.title;
                if(currentTest.state === 'failed' && /^(url|waitBody|switchWindow|switchFrame):/.test(title)){
                    self.skipAll = true;
                }
                if(!/^(closeWindow):/.test(title)){
                    let filepath = self.screenshotPath + '/' + self.caseName + '_' + self.stepId;
                    let driver = self.driver;
                    try{
                        // catch error when get alert msg
                        await driver.getScreenshot(filepath + '.png');
                        let url = await driver.url();
                        let html = await driver.source();
                        html = '<!--url: '+url+' -->\n' + html;
                        fs.writeFileSync(filepath + '.html', html);
                        let cookies = await driver.cookies();
                        fs.writeFileSync(filepath + '.cookie', JSON.stringify(cookies));
                    }
                    catch(e){}
                }
            });

            after(function(){
                return this.driver.close();
            });

        });
    });
}

function getRootPath(){
    let rootPath = path.resolve(__dirname);
    while(rootPath){
        if(fs.existsSync(rootPath + '/config.json')){
            break;
        }
        rootPath = rootPath.substring(0, rootPath.lastIndexOf(path.sep));
    }
    return rootPath;
}

function mkdirs(dirname){
    if(fs.existsSync(dirname)){
        return true;
    }else{
        if(mkdirs(path.dirname(dirname))){
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

function callSpec(name){
    try{
        require(rootPath + '/' + name)();
    }
    catch(e){
        console.log(e)
        process.exit(1);
    }
}

function isPageError(code){
    return code == '' || / jscontent="errorCode" jstcache="\d+"|diagnoseConnectionAndRefresh|dnserror_unavailable_header|id="reportCertificateErrorRetry"|400 Bad Request|403 Forbidden|404 Not Found|500 Internal Server Error|502 Bad Gateway|503 Service Temporarily Unavailable|504 Gateway Time-out/i.test(code);
}

function catchError(error){

}
