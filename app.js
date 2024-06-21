require("dotenv").config();
const axios = require("axios");
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const use_files = false;
const use_user_agent_list = false;
const registration_data = [
    "tow.np.o.rtalsc.roll479@gmail.com	64.137.42.127:5172:bnzdauvg:7rtcm36zgx1g	19	Servall	nk5IWmnbAi"
];
const options = {
    count: 0,
    used_markets: ["en"],
    proxy: [],
    generated_accounts: [],
    generated_emails: [],
    generated_passwords: [],
    validated_accounts: [],
    validated_emails: [],
    validated_passwords: [],
    validated_email_links: [],
    anticaptcha_key: process.env.ANTICAPTCHA_KEY,
    time_between_registrations: 60,
    market: {
        hu: {
            link: "https://www.klanhaboru.hu/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        en: {
            link: "https://www.tribalwars.net/en-dk/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        fr: {
            link: "https://www.guerretribale.fr/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        de: {
            link: "https://www.die-staemme.de/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        cs: {
            link: "https://www.divokekmeny.cz/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        ch: {
            link: "https://www.staemme.ch/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        nl: {
            link: "https://www.tribalwars.nl/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        pl: {
            link: "https://www.plemiona.pl/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        br: {
            link: "https://www.tribalwars.com.br/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        pt: {
            link: "https://www.tribalwars.com.pt/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        ro: {
            link: "https://www.triburile.ro/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        ru: {
            link: "https://www.voynaplemyon.com/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        gr: {
            link: "https://www.fyletikesmaxes.gr/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        sk: {
            link: "https://www.divoke-kmene.sk/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        it: {
            link: "https://www.tribals.it/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        tr: {
            link: "https://www.klanlar.org/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        es: {
            link: "https://www.guerrastribales.es/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        uk: {
            link: "https://www.tribalwars.co.uk/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
        us: {
            link: "https://www.tribalwars.us/",
            x_csrf: "",
            server: "",
            sitekey: ""
        },
    },
    scopes: {
        name: "name",
        password: "password",
        email: "email",
        all: "all"
    },
    actions: {
        generate: "generate",
        validate: "validate",
        register: "register"
    },
    characters: {
        password: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        name: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        fingerprint: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]
    },
    proxy_index: {
        "IP": 0,
        "PORT": 1,
        "USER": 2,
        "PASS": 3
    },
    registration_data_index: {
        "email": 0,
        "ip": 1,
        "profile": 2,
        "account": 3,
        "password": 4
    }
};
const user_agent_settings = {
    user_agent_start: "Mozilla/5.0 (",
    characters: {
        word: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        num: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    },
    OS: {
        windows: {
            name: "Windows NT",
            version: ["10.0", "11.0"],
            arch: "Win64; x64",
            webkit: "AppleWebKit/537.36 (KHTML, like Gecko)"
        },
        android: {
            name: "Linux; Android",
            version: [8, 9, 10, 11, 12, 13, 14],
            model: {
                brand: ["APPLE", "GOOGLE", "SAMSUNG", "XIAOMI", "OPPO", "VIVO", "REALME", "MOTOROLA", "HUAWEI", "ONEPLUS", "SONY", "NOKIA", "LG", "LENOVO", "HTC", "ZTE", "MEIZU", "VIVO", "ALCATEL", "TCL", "ASUS", "HONOR", "BLACK SHARK", "POCO", "TECNO", "INFINIX", "GOOGLE PIXEL"],
                code: function (brand) {
                    const model = [
                        `${user_agent_settings.get_random(user_agent_settings.characters.word)}`,
                        `${user_agent_settings.get_random(user_agent_settings.characters.num)}`,
                        `${user_agent_settings.get_random(user_agent_settings.characters.num)}`,
                        `${user_agent_settings.get_random(user_agent_settings.characters.num)}`,
                        `${user_agent_settings.get_random(user_agent_settings.characters.word)}`,
                    ].join("");
                    return `${brand.substring(0, 3)}-${model}`;
                },
                build: function () {
                    const oldest_build_date = new Date(Date.now() - 4 * 365 * 24 * 60 * 60 * 1000).getTime(); // 4 years
                    const build_date = new Date(Math.random() * (Date.now() - oldest_build_date) + oldest_build_date);
                    const build_date_formatted = `${build_date.getFullYear().toString().slice(2)}${build_date.getMonth() + 1 > 9 ? build_date.getMonth() + 1 : "0" + (build_date.getMonth() + 1)}${build_date.getDate() > 9 ? build_date.getDate() : "0" + build_date.getDate()}`;
                    const build_revision = `0${Math.round(Math.random() * 30)}`;
                    const build_code = [
                        user_agent_settings.get_random(user_agent_settings.characters.word),
                        user_agent_settings.get_random(user_agent_settings.characters.word),
                        user_agent_settings.get_random(user_agent_settings.characters.num),
                        user_agent_settings.get_random(user_agent_settings.characters.word),
                    ].join("");
                    return `Build/${build_code}.${build_date_formatted}.${build_revision}`;
                }
            },
            webkit: "AppleWebKit/537.36 (KHTML, like Gecko)"
        },
        iphone: {
            name: "iPhone; CPU iPhone OS",
            version: function () {
                const main_version = [15, 16, 17];
                const sub_verison = [0, 1, 2];
                const sub_version_levels = Math.floor(Math.random() * 3);
                const version = [main_version[Math.floor(Math.random() * main_version.length)]];
                for (let level = 0; level < sub_version_levels; level++) {
                    version.push(sub_verison[Math.floor(Math.random() * sub_verison.length)]);
                }
                return version.join("_");
            },
            arch: "like Mac OS X",
            webkit: "AppleWebKit/605.1.15 (KHTML, like Gecko)"
        }
    },
    browser: {
        chrome: {
            min_version: 115,
            max_version: 120
        },
        firefox: {
            min_version: 110,
            max_version: 119
        },
        edge: {
            min_version: 115,
            max_version: 120
        },
        safari: {
            min_version: 600,
            max_version: 610
        }
    },
    get_random_agent(type = false) {
        const agent = {
            OS: [],
            browser: []
        };
        switch (type) {
            case "windows":
                agent.OS = [
                    `${this.user_agent_start}`,
                    `${this.OS[type]["name"]} `,
                    `${this.get_random(this.OS[type]["version"])}; `,
                    `${this.OS[type]["arch"]}) `,
                    `${this.OS[type]["webkit"]} `
                ].join("");
                agent.browser = this.get_random_browser(type);
                return `${agent.OS}${agent.browser}`;
            case "android":
                const show_brand = Math.round(Math.random());
                const model_brand = user_agent_settings.get_random(user_agent_settings.OS[type]["model"]["brand"]);
                agent.OS = [
                    `${this.user_agent_start}`,
                    `${this.OS[type]["name"]} `,
                    `${this.get_random(this.OS[type]["version"])};${show_brand ? " " : ""}`,
                    `${show_brand ? model_brand : ""} `,
                    `${user_agent_settings.OS[type]["model"]["code"](model_brand)}${show_brand ? "" : " "}`,
                    `${show_brand ? "" : user_agent_settings.OS[type]["model"]["build"]()}) `,
                    `${this.OS[type]["webkit"]} `
                ].join("");
                agent.browser = this.get_random_browser(type);
                return `${agent.OS}${agent.browser}`;
            case "iphone":
                agent.OS = [
                    `${this.user_agent_start}`,
                    `${this.OS[type]["name"]} `,
                    `${user_agent_settings.OS[type]["version"]()} `,
                    `${this.OS[type]["arch"]}) `,
                    `${this.OS[type]["webkit"]} `
                ].join("");
                agent.browser = this.get_random_browser(type);
                return `${agent.OS}${agent.browser}`;
            default:
                return this.get_random_agent(this.get_random(Object.keys(this.OS)));
        }
    },
    get_random_browser(OS) {
        const use_edge = OS === "windows" && Math.round(Math.random());
        switch (OS) {
            case "windows":
            case "android":
                return [
                    `Chrome/${Math.round(this.browser.chrome.min_version + Math.random() * (this.browser.chrome.max_version - this.browser.chrome.min_version))}`,
                    `.0.${Math.round(Math.random() * 5000)}.${Math.round(Math.random() * 200)} `,
                    `${OS === "android" ? "Mobile " : ""}Safari/537.${Math.round(Math.random() * 8)}`,
                    `${use_edge ? " Edg/" + Math.round(this.browser.edge.min_version + Math.random() * (this.browser.edge.max_version - this.browser.edge.min_version)) : ""}`,
                    `${use_edge ? ".0." + Math.round(Math.random() * 5000) + "." + Math.round(Math.random() * 200) : ""}`
                ].join("");
            case "iphone":
                return [
                    `Version/${this.OS.iphone.version().replaceAll("_", ".")} Mobile/`,
                    `1${this.get_random(this.characters.num)}${this.get_random(this.characters.word)}${this.get_random(this.characters.num)}${this.get_random(this.characters.num)}${this.get_random(this.characters.num)}${this.get_random(this.characters.word)} `,
                    `Safari/${(this.browser.safari.min_version + Math.random() * (this.browser.safari.max_version - this.browser.safari.min_version)).toPrecision(4)}`
                ].join("");
        }
    },
    get_random(elem) {
        return elem[Math.floor(Math.random() * elem.length)];
    },
    custom_useragent: [],
    load_from_file() {
        if (!use_user_agent_list) { return this; }
        this.custom_useragent = fs.readFileSync(".//files/_user_agent_list.txt", "utf8").split("\n");
        return this;
    }
}.load_from_file();
if (use_files) {
    let generated_data = JSON.parse(fs.readFileSync("./files/_generated.json", "utf8"));
    options.generated_accounts = generated_data.name;
    options.generated_passwords = generated_data.pass;
    options.generated_emails = generated_data.email;
    options.validated_accounts = fs.readFileSync("./files/name.txt", "utf8").split("\n").map(elem => elem.endsWith("\r") ? elem.replaceAll("\r", "") : elem);
    options.validated_passwords = fs.readFileSync("./files/pass.txt", "utf8").split("\n").map(elem => elem.endsWith("\r") ? elem.replaceAll("\r", "") : elem);
    options.validated_emails = fs.readFileSync("./files/email.txt", "utf8").split("\n").map(elem => elem.endsWith("\r") ? elem.replaceAll("\r", "") : elem);
    options.proxy = fs.readFileSync("./files/proxy.txt", "utf8").split("\n").map(elem => elem.endsWith("\r") ? elem.replaceAll("\r", "") : elem);
    if (options.generated_accounts[0] === "") { options.generated_accounts = []; }
    if (options.generated_emails[0] === "") { options.generated_emails = []; }
    if (options.generated_passwords[0] === "") { options.generated_passwords = []; }
    if (options.validated_accounts[0] === "") { options.validated_accounts = []; }
    if (options.validated_passwords[0] === "") { options.validated_passwords = []; }
    if (options.validated_emails[0] === "") { options.validated_emails = []; }
    if (options.validated_email_links[0] === "") { options.validated_email_links = []; }
    if (options.proxy[0] === "") { options.proxy = []; }
}
else {
    for (let data of registration_data) {
        let splitted_data = data.split("\t");
        options.validated_accounts.push(splitted_data[options.registration_data_index.account]);
        options.validated_passwords.push(splitted_data[options.registration_data_index.password]);
        options.validated_emails.push(splitted_data[options.registration_data_index.email]);
        options.proxy.push(splitted_data[options.registration_data_index.ip]);
    }
}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
async function get_x_csrf(market, proxy) {
    const link = `${options.market[market].link}page/new`;
    const proxy_splitted = proxy ? proxy.split(':') : null;
    const config = proxy ? {
        proxy: {
            protocol: 'http',
            host: `${proxy_splitted[options.proxy_index.IP]}`,
            port: +`${proxy_splitted[options.proxy_index.PORT]}`,
            auth: {
                username: `${proxy_splitted[options.proxy_index.USER]}`,
                password: `${proxy_splitted[options.proxy_index.PASS]}`
            }
        }
    } : {};
    const xhr = await axios.get(link, config);
    const dom = new JSDOM(xhr.data);
    const x_csrf = dom.window.document.querySelectorAll("meta[name='csrf-token']")[0].content;
    const server = dom.window.document.querySelectorAll("input[name='server']")[0].value;
    options.market[market].x_csrf = x_csrf;
    options.market[market].server = server;
}
async function validate(market, type, value) {
    const link = `${options.market[market].link}page/register/validate`;
    const payload = `type=${type}&value=${value}`;
    const config = {
        headers: {
            "accept": "*/* ",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-CSRF-Token": `${options.market[market].x_csrf}`,
            "X-Requested-With": "XMLHttpRequest"
        },
    };
    const xhr = await axios.post(link, payload, config);
    return xhr.data.status;
}
async function generate(type) {
    let result = "";
    let xhr, link, payload, config;
    switch (type) {
        case "password":
            for (let i = 0; i < Math.ceil(Math.random() * 6 + 8); i++) {
                result = result + options.characters.password[Math.floor(Math.random() * options.characters.password.length)]
            }
            if (!result.match(/[0-9]/g)) {
                result = `${result}0`;
            }
            options.generated_passwords.push(result);
            break;
        case "name":
            link = "https://www.spinxo.com/services/NameService.asmx/GetNames";
            payload = {
                "snr": {
                    "category": 0,
                    "UserName": "",
                    "Hobbies": "",
                    "ThingsILike": "",
                    "Numbers": "",
                    "WhatAreYouLike": "",
                    "Words": "",
                    "Stub": "username",
                    "LanguageCode": "en",
                    "NamesLanguageID": "45",
                    "Rhyming": false,
                    "OneWord": false,
                    "UseExactWords": false,
                    "ScreenNameStyleString": "Any",
                    "GenderAny": false,
                    "GenderMale": false,
                    "GenderFemale": false
                }
            };
            config = {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "content-type": "application/json; charset=UTF-8"
                }
            };
            xhr = await axios.post(link, payload, config);
            for (name of xhr.data.d.Names) {
                if (Math.random() < 0.4) {
                    for (let i = 0; i < Math.ceil(Math.random() * 3); i++) {
                        name = name + options.characters.name[Math.floor(Math.random() * options.characters.name.length)]
                    }
                }
                options.generated_accounts.push(name);
            }
            break;
        case "email":
            link = "https://generator.email/";
            xhr = await axios.get(link);
            options.generated_emails.push(xhr.data.split(`id="email_ch_text">`)[1].split("</span>")[0]);
            break;
    }
}
function generate_fingerprint() {
    let fingerprint = "";
    for (let i = 0; i < 32; i++) {
        fingerprint = fingerprint + options.characters.fingerprint[Math.floor(Math.random() * options.characters.fingerprint.length)]
    }
    return fingerprint;
}
async function register(market, proxy) {
    const proxy_splitted = proxy ? proxy.split(':') : null;
    const register_page_link = `${options.market[market].link}page/new`;
    const register_post_link = `${options.market[market].link}page/register`;
    let cookies = {};
    const cookieJar = new CookieJar();
    const instance = await axios.create({
        jar: cookieJar,
        withCredentials: true,
        baseURL: register_page_link,
        proxy: {
            protocol: 'http',
            host: `${proxy_splitted[options.proxy_index.IP]}`,
            port: +`${proxy_splitted[options.proxy_index.PORT]}`,
            auth: {
                username: `${proxy_splitted[options.proxy_index.USER]}`,
                password: `${proxy_splitted[options.proxy_index.PASS]}`
            }
        }
    });
    wrapper(instance);
    await prepare_cookies();
    const hcaptcha_response = await solve_captcha(market);
    await do_register();
    return true;
    async function prepare_cookies() {
        const xhr = await instance.get(register_page_link);
        const dom = new JSDOM(xhr.data);
        const x_csrf = dom.window.document.querySelectorAll("meta[name='csrf-token']")[0].content;
        const server = dom.window.document.querySelectorAll("input[name='server']")[0].value;
        const sitekey = dom.window.document.getElementById("captcha").attributes["data-sitekey"].value;
        options.market[market].x_csrf = x_csrf;
        options.market[market].server = server;
        options.market[market].sitekey = sitekey;
        for (let cookie of xhr.headers["set-cookie"]) {
            const split_cookie = cookie.split("=");
            cookies[`${split_cookie[0]}`] = split_cookie[1].split(";")[0];
        }
    }
    async function do_register() {
        const fingerprint = generate_fingerprint();
        const server = options.market[market].server;
        const user = options.validated_accounts[options.count];
        const pass = options.validated_passwords[options.count];
        const email = encodeURIComponent(options.validated_emails[options.count]);
        const payload = `server=${server}&browser_id=${fingerprint}&register_username=${user}&register_password=${pass}&register_email=${email}&terms=on&captcha_response=${hcaptcha_response}`;
        const config = {
            headers: {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-CSRF-Token": options.market[market].x_csrf,
                "X-Requested-With": "XMLHttpRequest",
                "Cookie": Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; '),
                "User-Agent": use_user_agent_list ? user_agent_settings.custom_useragent[Math.floor(Math.random() * user_agent_settings.custom_useragent.length)].replaceAll("\r", "") : user_agent_settings.get_random_agent()
            }
        };
        const xhr = await instance.post(register_post_link, payload, config);

        if (xhr.status !== 200) {
            console.log(`Failed to register account: ${market}: user: ${user} password: ${pass} email: ${email} proxy: ${proxy}`);
            console.log(xhr);
        }
        else {
            console.log(`${xhr.data.errors || xhr.data.error ? "Failed to register account" : "Registered account"}: ${market}: user: ${user} password: ${pass} email: ${email} proxy: ${proxy}`);
            if (xhr.data.errors) { console.log(xhr.data.errors); }
            if (xhr.data.error) { console.log(xhr.data.error); }
        }
    }
}
async function solve_captcha(market) {
    const domain = `${options.market[market].link.split("//")[1].split("/")[0]}`;
    const sitekey = `${options.market[market].sitekey}`;
    const task = await createTask();
    if (task.errorId !== 0) {
        console.log(`Task error: ${task.errorId}, ${task.errorCode}`);
        return false;
    }
    return await result();
    async function result() {
        await sleep(5000);
        let hcaptcha_response = await getTaskResult();
        while (hcaptcha_response.status === "processing") {
            await sleep(5000);
            hcaptcha_response = await getTaskResult();
        }
        return hcaptcha_response.solution.gRecaptchaResponse;
    }
    async function createTask() {
        const link = "https://api.anti-captcha.com/createTask";
        const payload = {
            "clientKey": options.anticaptcha_key,
            "task": {
                "type": "HCaptchaTaskProxyless",
                "websiteURL": "http:\/\/" + domain + "\/",
                "websiteKey": sitekey
            }
        };
        const xhr = await axios.post(link, payload);
        return xhr.data;
    }
    async function getTaskResult() {
        const link = "https://api.anti-captcha.com/getTaskResult";
        payload = {
            'clientKey': options.anticaptcha_key,
            'taskId': task.taskId
        };
        const xhr = await axios.post(link, payload);
        return xhr.data;
    }
}
async function start(scope, action, use_proxy, count = 0) {
    switch (action) {
        case "generate":
            options.generated_accounts = [];
            options.generated_emails = [];
            options.generated_passwords = [];
            switch (scope) {
                case "name":
                    for (let i = 0; i < Math.ceil(count / 30); i++) {
                        await generate("name");
                    }
                    console.log(options.generated_accounts);
                    break;
                case "password":
                    for (let i = 0; i < count; i++) {
                        await generate("password");
                    }
                    console.log(options.generated_passwords);
                    break;
                case "email":
                    for (let i = 0; i < count; i++) {
                        await generate("email");
                    }
                    console.log(options.generated_emails);
                    break;
                case "all":
                    for (let i = 0; i < Math.ceil(count / 30); i++) {
                        await generate("name");
                    }
                    for (let i = 0; i < count; i++) {
                        await generate("password");
                    }
                    for (let i = 0; i < count; i++) {
                        await generate("email");
                    }
                    break;
            }
            fs.writeFileSync("./files/_generated.json", JSON.stringify({
                name: options.generated_accounts,
                pass: options.generated_passwords,
                email: options.generated_emails
            }));
            break;
        case "validate":
            options.validated_accounts = [];
            options.validated_passwords = [];
            options.validated_emails = [];
            options.validated_email_links = [];
            for (market of options.used_markets) {
                await get_x_csrf(market, use_proxy ? options.proxy[options.proxy_index] : null);
            }
            switch (scope) {
                case "email":
                    for (email of options.generated_emails) {
                        let temp_result = [];
                        for (market of options.used_markets) {
                            let result = await validate(market, "email", email);
                            temp_result.push(result);
                        }
                        if (!temp_result.includes("ERROR")) {
                            options.validated_emails.push(email);
                            options.validated_email_links.push(`https://generator.email/${email}`);
                        }
                        await sleep(1000);
                    }
                    console.log(options.validated_emails);
                    console.log(options.validated_email_links);
                    break;
                case "name":
                    for (name of options.generated_accounts) {
                        let temp_result = [];
                        for (market of options.used_markets) {
                            let result = await validate(market, "name", name);
                            temp_result.push(result);
                        }
                        if (!temp_result.includes("ERROR")) {
                            options.validated_accounts.push(name);
                        }
                        await sleep(1000);
                    }
                    console.log(options.validated_accounts);
                    break;
                case "password":
                    for (password of options.generated_passwords) {
                        let temp_result = [];
                        for (market of options.used_markets) {
                            let result = await validate(market, "password", password);
                            temp_result.push(result);
                        }
                        if (!temp_result.includes("ERROR")) {
                            options.validated_passwords.push(password);
                        }
                        await sleep(1000);
                    }
                    console.log(options.validated_passwords);
                    break;
                case "all":
                    for (email of options.generated_emails) {
                        let temp_result = [];
                        for (market of options.used_markets) {
                            let result = await validate(market, "email", email);
                            temp_result.push(result);
                        }
                        if (!temp_result.includes("ERROR")) {
                            options.validated_emails.push(email);
                            options.validated_email_links.push(`https://generator.email/${email}`);
                        }
                        await sleep(1000);
                    }
                    for (name of options.generated_accounts) {
                        let temp_result = [];
                        for (market of options.used_markets) {
                            let result = await validate(market, "name", name);
                            temp_result.push(result);
                        }
                        if (!temp_result.includes("ERROR")) {
                            options.validated_accounts.push(name);
                        }
                        await sleep(1000);
                    }
                    for (password of options.generated_passwords) {
                        let temp_result = [];
                        for (market of options.used_markets) {
                            let result = await validate(market, "password", password);
                            temp_result.push(result);
                        }
                        if (!temp_result.includes("ERROR")) {
                            options.validated_passwords.push(password);
                        }
                        await sleep(1000);
                    }
                    break;
            }
            fs.writeFileSync(".//files/_validated.json", JSON.stringify({
                name: options.validated_accounts,
                pass: options.validated_passwords,
                email: options.validated_emails,
                email_links: options.validated_email_links
            }));
            fs.writeFileSync("./files/validated_accounts.txt", options.validated_accounts.join("\n"));
            fs.writeFileSync("./files/validated_passwords.txt", options.validated_passwords.join("\n"));
            fs.writeFileSync("./files/validated_emails.txt", options.validated_emails.join("\n"));
            fs.writeFileSync("./files/validated_email_links.txt", options.validated_email_links.join("\n"));
            break;
        case "register":
            for (let proxy of options.proxy) {
                for (market of options.used_markets) {
                    await register(market, proxy);
                }
                options.count++;
                await sleep(Math.random() * options.time_between_registrations);
            }
            break;
    }
}
//start("all", "generate", false, 300);
//start("all", "validate", false)
start("", "register");