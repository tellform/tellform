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

    it('insertVar: password ( #password, {{LoginUsername}} )', async function(){
        await driver.sleep(300).wait('#password', 30000)
               .val(_(`{{LoginUsername}}`));
    });

    it('expect: displayed, .btn-signup, equal, true', async function(){
        await driver.sleep(300).wait('.btn-signup', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
    });

    it('click: Sign in ( button, 174, 18, 0 )', async function(){
        await driver.sleep(300).wait('button.btn-signup', 30000)
               .sleep(300).click();
    });

    it('expect: displayed, div.new-button, equal, true', async function(){
        await driver.sleep(300).wait('div.new-button', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
    });

    it('expect: displayed, a.dropdown-toggle, equal, true', async function(){
        await driver.sleep(300).wait('a.dropdown-toggle', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
    });

    it('click: My Settings ( a.dropdown-toggle )', async function(){
        await driver.sleep(300).wait('a.dropdown-toggle', 30000)
               .sleep(300).click();
    });

    it('× expect: display, ul.dropdown-menu > li:nth-child(1) > a.ng-binding, equal, true', async function(){
        await driver.sleep(300).wait('ul.dropdown-menu > li:nth-child(1) > a.ng-binding', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
    });

    it('× expect: display, ul.dropdown-menu > li:nth-child(3) > a.ng-binding, equal, true', async function(){
        await driver.sleep(300).wait('ul.dropdown-menu > li:nth-child(3) > a.ng-binding', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
    });

    it('click: Edit Profile ( ul.dropdown-menu > li:nth-child(1) > a.ng-binding )', async function(){
        await driver.sleep(300).wait('ul.dropdown-menu > li:nth-child(1) > a.ng-binding', 30000)
               .sleep(300).click();
    });

    it('waitBody: ', async function(){
        await driver.sleep(500).wait('body', 30000).html().then(function(code){
            isPageError(code).should.be.false;
        });
    });

    it('× insertVar: firstName ( #firstName, {{Profile_NewFirstName}} )', async function(){
        await driver.sleep(300).wait('#firstName', 30000)
               .val(_(`{{Profile_NewFirstName}}`));
    });

    it('× insertVar: lastName ( #lastName, {{Profile_NewLastName}} )', async function(){
        await driver.sleep(300).wait('#lastName', 30000)
               .val(_(`{{Profile_NewLastName}}`));
    });

    it('× click: Save Changes ( button.btn-signup )', async function(){
        await driver.sleep(300).wait('button.btn-signup', 30000)
               .sleep(300).click();
    });

    it('× expect: displayed, div.text-success, equal, true', async function(){
        await driver.sleep(300).wait('div.text-success', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
    });

    it('× expect: displayed, .text-danger, notEqual, true', async function(){
        await driver.sleep(300).wait('.text-danger', 300)
            .displayed()
            .should.not.be.a('error')
            .should.not.equal(_(true));
    });

    /*
    ** Revert back to expected names
    */

    it('× insertVar: firstName ( #firstName, {{Profile_OldFirstName}} )', async function(){
        await driver.sleep(300).wait('#firstName', 30000)
               .val(_(`{{Profile_OldFirstName}}`));
    });

    it('× insertVar: lastName ( #lastName, {{Profile_OldLastName}} )', async function(){
        await driver.sleep(300).wait('#lastName', 30000)
               .val(_(`{{Profile_OldLastName}}`));
    });

    it('× click: Save Changes ( button.btn-signup, 95, 10, 0 )', async function(){
        await driver.sleep(300).wait('button.btn-signup', 30000)
               .sleep(300).click();
    });

    it('× expect: displayed, .text-danger, notEqual, true', async function(){
        await driver.sleep(300).wait('.text-danger', 300)
            .displayed()
            .should.not.be.a('error')
            .should.not.equal(_(true));
    });


    //Check that we can't save an invalid email
    it('× insertVar: email ( #email, {{Profile_NewInvalidEmail}} )', async function(){
        await driver.sleep(300).wait('#email', 30000)
               .val(_(`{{Profile_NewInvalidEmail}}`));
    });

    it('× click: Save Changes ( button.btn-signup )', async function(){
        await driver.sleep(300).wait('button.btn-signup', 30000)
               .sleep(300).click();
    });

    it('url: http://localhost:5000/#!/settings/profile', async function(){
        await driver.url(_(`http://localhost:5000/#!/settings/profile`));
    });

    it('waitBody: ', async function(){
        await driver.sleep(500).wait('body', 30000).html().then(function(code){
            isPageError(code).should.be.false;
        });
    });

    it('expect: text, #email, notEqual, {{Profile_NewInvalidEmail}}', async function(){
        await driver.sleep(300).wait('#email', 300)
            .text()
            .should.not.be.a('error')
            .should.not.equal(_(`{{Profile_NewInvalidEmail}}`));
    });


    /*
    ** Logout
    */
    it('click: Signout ( //a[text()="Signout"], 31, 31, 0 )', async function(){
        await driver.sleep(300).wait('//a[text()="Signout"]', 30000)
               .sleep(300).mouseMove(31, 31).click(0);
    });

    it('expect: displayed, button.btn-signup, equal, true', async function(){
        await driver.sleep(300).wait('button.btn-signup', 30000)
            .displayed()
            .should.not.be.a('error')
            .should.equal(_(true));
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
