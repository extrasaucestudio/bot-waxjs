const farmersworld = 'farmersworld';
const federation = 'federation';
const mfederation = 'm.federation';
var tokens = { balances: {}, prices: {} };
const apiWax = {
    wallet: '',
    chain: 'wax',
    node: [
        'https://wax.greymass.com',
        'https://api.wax.alohaeos.com',
        // 'https://api.waxsweden.org',
        // 'https://wax.pink.gg',
        // 'https://wax.dapplica.io', Chậm quá!
        // 'https://api.wax.greeneosio.com',
        'https://wax.cryptolions.io',
        'https://wax.eosphere.io',
    ],
    v1: [
        // 'https://api.wax.greeneosio.com',
        // 'https://api.waxsweden.org',
        // 'https://wax.greymass.com',
        // 'https://apiwax.3dkrender.com',
        // 'https://wax.pink.gg',
        // 'https://wax.cryptolions.io',
        // 'https://wax.dapplica.io',
        // 'https://api.wax.liquidstudios.io',
        // 'https://wax.eosn.io',
        'https://api.wax.alohaeos.com',
        // 'https://wax-bp.wizardsguild.one',
        'https://wax.eu.eosamsterdam.net',
        'https://wax.eoseoul.io',
        // 'https://wax.eosphere.io',
        // 'https://api.waxeastern.cn'
    ],
    v2: [
        'https://wax.eosrio.io',
        // 'https://api-wax.eosauthority.com',
        // 'https://wax.eu.eosamsterdam.net (Time?)',
        // 'https://wax.blacklusion.io',
        // 'https://api.wax.liquidstudios.io',
        // 'https://apiwax.3dkrender.com (Data?)',
        // 'https://wax.pink.gg (No Response)',
        // 'https://wax.cryptolions.io (No Response)',
        // 'https://wax.dapplica.io (No Response)',
        // 'https://wax.eosn.io (No Response)',
        // 'https://api.wax.alohaeos.com (No Response)',
        // 'https://wax.greymass.com (No Response)',
        // 'https://wax.eoseoul.io (No Response)',
        // 'https://waxapi.ledgerwise.io (No Response)',
        // 'https://wax-bp.wizardsguild.one (No Response)',
        // 'https://wax.csx.io (No Response)',
        // 'https://api.waxeastern.cn (No Response)'
        // 'https://api.waxsweden.org (Origin)',
        // 'https://wax.eosphere.io (Error)',
        // 'https://wax.blokcrafters.io (Error)',
        // 'https://api.wax.greeneosio.com (Error)'
    ]
};
const api = [
    'https://wax.eosphere.io',
    'https://api.waxsweden.org',
    'https://wax.pink.gg',
    'https://wax.cryptolions.io',
    'https://wax.dapplica.io',
    'https://wax.eosn.io',
    'https://api.wax.alohaeos.com',
    'https://wax.greymass.com',
    'https://wax.eoseoul.io',
    'https://wax.blacklusion.io',
    'https://waxapi.ledgerwise.io',
    'https://api.wax.liquidstudios.io',
    'https://wax-bp.wizardsguild.one',
    'https://apiwax.3dkrender.com',
    'https://wax.eu.eosamsterdam.net',
    'https://wax.csx.io',
    'https://api.waxeastern.cn'
];
const transactUrl = [
    'https://wax.eosrio.io/v2/history/get_transaction',
    'https://api.waxsweden.org/v2/history/get_transaction',
    'https://wax.eosphere.io/v2/history/get_transaction',
    'https://wax.blokcrafters.io/v2/history/get_transaction',
    'https://api.wax.greeneosio.com/v2/history/get_transaction',
    'https://wax.eu.eosamsterdam.net/v2/history/get_transaction',
    'https://api-wax.eosauthority.com/v2/history/get_transaction'
];
const v1 = [
    'https://wax.pink.gg',
    'https://wax.cryptolions.io',
    'https://wax.dapplica.io',
    'https://api.wax.liquidstudios.io',
    'https://wax.eosn.io',
    'https://api.wax.alohaeos.com',
    'https://wax.greymass.com',
    'https://wax-bp.wizardsguild.one',
    'https://apiwax.3dkrender.com',
    'https://wax.eu.eosamsterdam.net',
    'https://wax.csx.io',
    'https://wax.eoseoul.io',
    'https://wax.eosphere.io',
    'https://api.waxeastern.cn'
];
const tx_api = [
    'https://wax.greymass.com',
    'https://wax.cryptolions.io',
    'https://api.wax.alohaeos.com',
    'https://wax.blacklusion.io',
    'https://waxapi.ledgerwise.io',
];
const tx_api_v2 = [
    // 'https://api.wax.alohaeos.com',
    // 'https://wax.eu.eosamsterdam.net',
    // 'https://api.waxsweden.org',
    // 'https://wax.cryptolions.io',
    'https://api.waxsweden.org',
    'https://wax.eosphere.io',
    'https://wax.blokcrafters.io',
    'https://api.wax.greeneosio.com',
    'https://wax.eu.eosamsterdam.net',
    'https://api-wax.eosauthority.com'
];
var data = [];
var account;
var wax = new waxjs.WaxJS(apiWax.node.random());
class WAXBloks {
    static login = async () => {
        let account = wax?.userAccount;
        if (!account) {
            try {
                account = await wax.loginViaEndpoint();
            } catch (error) {
                try {
                    account = await wax.login();
                } catch (error) {
                    console.log('Login Error: #2');
                    console.log(error);
                    toastr.error(error.message, 'WAX Cloud');
                }
            }
        }
        return account;
    };
    static getAccount = async (account = wax.userAccount) => {
        let res = {};
        for (var i = 0; i < 3; i++) {
            res = await Request.fetch(apiWax.v1.random() + '/v1/chain/get_account', 'POST', JSON.stringify({ account_name: account }));
            if (res?.['created']) return res;
        }
    };
    static resources = async (obj) => {
        obj.loop = obj.loop ?? false;
        obj.cpu_check = obj.cpu_check ?? 100;
        obj.cpu_change = 0;
        obj.ram_change = 0;
        obj.net_change = 0;
        obj.cpu_available = 0;
        obj.cpu_used = 0;
        obj.cpu_max = 0;
        while (true) {
            let res = await this.getAccount();
            obj.cpu_available = res?.['cpu_limit']?.available;
            obj.cpu_used = res?.['cpu_limit']?.used;
            obj.cpu_max = res?.['cpu_limit']?.max;
            obj.cpu_change = obj.cpu_max > 0 ? nFormat((obj.cpu_used / obj.cpu_max) * 100) : 0;
            obj.ram_change = nFormat((res?.['ram_usage'] / res?.['ram_quota']) * 100);
            obj.net_change = res?.['net_limit']?.max == 0 ? 0 : nFormat((res?.['net_limit']?.used / res?.['net_limit']?.max) * 100);

            if (obj.cpu_change < obj.cpu_check || obj.loop == false) break;
            else toastr.warning(`CPU: ${obj.cpu_change}% (Wait until CPU is less than ${obj.cpu_check}%)`, 'WAX Bloks');
            await sleep(5000);
        }
        return obj.cpu_change < obj.cpu_check;
    };
    static getBalance = async (account, code, symbol) => {
        let res = await Request.fetch(apiWax.v1.random() + '/v1/chain/get_currency_balance', 'POST', JSON.stringify({ account: account, code: code, symbol: symbol }), { 'content-type': 'text/plain;charset=UTF-8' });
        return Number(res[0].replace(symbol, '').trim());
    };
    static getTables = async (obj) => await Request.fetch(apiWax.v1.random() + '/v1/chain/get_table_rows', 'POST', JSON.stringify(obj), { 'content-type': 'text/plain;charset=UTF-8' });
    static getActions = async (actions) => await Request.fetch(apiWax.v2.random() + '/v2/history/get_actions' + MyObject.queryString(actions));
    static transact = async (actions) => {
        let action = upperFirstLetter(actions[0].name);
        let res = wax.api.transact({
            actions
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        })
            .then((data) => { res = { ...{ success: true }, ...data?.processed ?? data.transaction_id } })
            .catch((error) => { res = { success: false, code: error?.code ?? 0, message: error?.message ?? 'Unknown Error' } });
        let t = Date.now() + 30000;
        while (Date.now() < t) {
            if (res?.success) {
                toastr.success(action + ' Success', actions[0].account);
            } else if (res?.success == false) {
                let message = res.message;
                if (message.includes('NetworkError') || message.includes('estimated CPU time (0 us) is not less than the maximum billable CPU time for the transaction (0 us)')) {
                    wax = new waxjs.WaxJS(apiWax.node.random());
                    await WAXBloks.login();
                }
                else if (message.toLowerCase().includes('failed to fetch')) message = 'Địa ch IP tm thời b chặn? Bạn th đi địa chỉ IP khác.';
                else if (message.includes('INVALID_HASH')) message = 'Tài khon này có thể đang chy ở thiết bị khác?';
                else if (message.includes('Countdown')) message = 'Tài khon ny có thể đang chạy  thit bị khác? Hoặc gi trn my của bạn không đng?';
                console.log(message);
            } else {
                await sleep(1000);
                continue;
            };
            return res;
        };
        return { success: false, code: 408, message: 'Request Timeout' };
    };
    static getTransaction = async (id) => {
        try {
            return await fetch('https://wax.greymass.com/v1/history/get_transaction', {
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8',
                },
                body: JSON.stringify({ id: id, block_num_hint: 0 }),
                method: 'POST'
            }).then(function (res) {
                return res.json();
            }).then(function (json) {
                return json;
            });
        } catch (error) {
            console.log(error.message);
        }
        return false;
    };
    static transfer = async (receiver, memo, quantity, symbol = ' WAX', account = wax.userAccount) => {
        if (account) return await this.transact([{
            account: symbol.includes('SEST') || symbol.includes('CBIT') ? 'farmingtoken' : 'eosio.token',
            name: 'transfer',
            authorization: [{
                actor: account,
                permission: 'active'
            }],
            data: {
                from: account,
                to: receiver,
                quantity: quantity + symbol,
                memo: memo
            }
        }]);
    };
};
const waxLogin = async (key = 'accounts', selector = 'accounts', auto = true) => {
    account = account ?? wax?.userAccount;
    let status = 'Unknown Error';
    if (auto && !account) {
        try {
            account = await wax.loginViaEndpoint();
        } catch (error) {
            try {
                account = await wax.login();
            } catch (error) {
                status = error.message;
            }
        }
    }
    if (account) {
        // toastr.success('Login Success', 'WAX Wallet');
        webDriver('account').value = account;
        webDriver('login').textContent = 'Reload';
        return [account];
    } else toastr.warning(status, 'WAX Wallet');

    let accounts = account ?? webDriver(selector).value;
    if (accounts) {
        accounts = accounts.trim().replaceAll('\r\n', ' ').replaceAll('\t', ' ').replaceAll('@', '.').replaceAll(':', ' ').replaceAll(',', ' ').replaceAll(';', ' ').replaceAll('  ', ' ').replaceAll('  ', ' ');
        localStorage.setItem(key, accounts);
    }
    accounts = window.localStorage.getItem(key);
    webDriver(selector).value = accounts;
    accounts = accounts ? accounts.split(' ').filter(a => a) : [];
    if (accounts[0] != wax?.userAccount) toastr.warning('You have not logged in WAX Wallet', 'WAX Wallet');
    return accounts;
};
async function transact(actions) {
    return await WAXBloks.transact(actions);
};
async function getTransaction(id) {
    return await WAXBloks.getTransaction(id);
};
async function getTransaction1(id) {
    try {
        const res = await Get(`${transactUrl.random()}?id=${id}`);
        const json = await res.json();
        console.log(json);
        return json.executed;
    } catch (error) {
        console.log(`#W1.1 ${action}: ${error.message}`);
    }
    return true;
};
async function stake(amount, type = 'CPU', receiver = wax.userAccount, account = wax.userAccount) {
    if (account) return await transact([{
        account: 'eosio',
        name: 'delegatebw',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            from: account,
            receiver: receiver,
            stake_net_quantity: toStr(type == 'NET' ? Number(amount) : 0, 8) + ' WAX',
            stake_cpu_quantity: toStr(type == 'CPU' ? Number(amount) : 0, 8) + ' WAX',
            transfer: false
        }
    }]);
};
async function transfer(receiver, memo, quantity, account = wax.userAccount) {
    if (account) return await transact([{
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            from: account,
            to: receiver,
            quantity: quantity + ' WAX',
            memo: memo
        }
    }]);
};
async function getTableRows(t, url = null) {
    for (let i = 0; i < 3; i++) {
        var e = t.json,
            r = void 0 === e || e,
            o = t.code,
            a = t.scope,
            s = t.table,
            u = t.table_key,
            c = void 0 === u ? '' : u,
            l = t.lower_bound,
            f = void 0 === l ? '' : l,
            h = t.upper_bound,
            p = void 0 === h ? '' : h,
            d = t.index_position,
            y = void 0 === d ? 1 : d,
            v = t.key_type,
            g = void 0 === v ? '' : v,
            b = t.limit,
            m = void 0 === b ? 10 : b,
            w = t.reverse,
            _ = void 0 !== w && w,
            A = t.show_payer,
            x = void 0 !== A && A;

        try {
            let res = await fetch(api[0] + '/v1/chain/get_table_rows', {
                'body': JSON.stringify({
                    json: r,
                    code: o,
                    scope: a,
                    table: s,
                    table_key: c,
                    lower_bound: f,
                    upper_bound: p,
                    index_position: y,
                    key_type: g,
                    limit: m,
                    reverse: _,
                    show_payer: x
                }),
                'method': 'POST'
            });
            return await res.json()
        } catch (error) {
            arrayMove(api);
        }
    }
};
async function getSwapPrice(token1, token2) {
    const res = await getTableRows({
        code: 'alcorammswap',
        scope: 'alcorammswap',
        table: 'pairs',
        lower_bound: token1,
        upper_bound: token2
    });
    try {
        if (res) return parseFloat(res.rows[0].pool1.quantity.split(' ')[0] / res.rows[0].pool2.quantity.split(' ')[0]);;
    } catch (error) {
        console.log(`#W19: ${error.message}`);
    }
    return 0;
};
async function swap(token, quantity, memo, account = wax.userAccount) {
    if (wax.userAccount) return await transact([{
        account: token,
        name: 'transfer',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            from: account,
            to: 'alcorammswap',
            quantity: quantity,
            memo: memo
        }
    }]);
};
async function drop(account = wax.userAccount, dropId, templateId, priceUSD, priceWAX) {
    if (wax.userAccount) return await transact([{
        account: 'res.pink',
        name: 'noop',
        authorization: [{
            actor: account,
            permission: 'active'
        }]
    },
    {
        account: 'atomicdropsx ',
        name: 'assertdrop',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            drop_id: dropId.toString(),
            assets_to_mint_to_assert: [{ 'template_id': templateId, 'tokens_to_back': [] }],
            listing_price_to_assert: priceUSD + ' USD',
            settlement_symbol_to_assert: '8,WAX'
        }
    },
    {
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            from: account,
            to: 'atomicdropsx',
            quantity: priceWAX + ' WAX',
            memo: 'deposit'
        }
    },
    {
        account: 'atomicdropsx ',
        name: 'claimdrop',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            claimer: account,
            drop_id: dropId.toString(),
            claim_amount: '1',
            intended_delphi_median: '2870',
            referrer: 'atomichub',
            country: 'VN'
        }
    }]);
};
async function getBalance(token = 'alien.worlds', account = wax.userAccount) {
    const res = await getTableRows({
        code: token,
        scope: account,
        table: 'accounts'
    });
    try {
        if (res) return res.rows[0].balance;
    } catch (error) {
    }
    return false;
};
async function getAccount(account) {
    let res, url;
    for (var i = 0; i < 3; i++) {
        try {
            // res = await wax.api.rpc.get_account(account);
            res = await fetch(api[0] + '/v1/chain/get_account', {
                body: `{\'account_name\':\'${account}\'}`,
                method: 'POST'
            });
            res = await res.json();
        } catch (error) {
            arrayMove(api);
        }
        if (res) break;
    }
    if (!res) return;
    if (res?.code == 500) return;
    try {
        data['account'] = res;
        data['cpuAvailable'] = res?.cpu_limit?.available;
        data['cpuUsed'] = res?.cpu_limit?.used;
        data['cpuMax'] = res?.cpu_limit?.max;
        data['cpuChange'] = data['cpuMax'] == 0 ? 0 : nFormat((data['cpuUsed'] / data['cpuMax']) * 100);
        data['ramChange'] = nFormat((res?.ram_usage / res?.ram_quota) * 100);
        data['netChange'] = res?.net_limit?.max == 0 ? 0 : nFormat((res?.net_limit?.used / res?.net_limit?.max) * 100);
        data['waxAmount'] = parseFloat(res?.core_liquid_balance?.split(' ')[0] ?? 0);
        data['waxStaked'] = res?.cpu_weight ? (parseFloat(res?.cpu_weight ?? 0) + parseFloat(res?.net_weight ?? 0)) / 100000000 : data['waxStaked'] ?? 0;
        data['created'] = res.created.split('T')[0];
    } catch (error) {

    }
    return data['account'];
};
async function waxToUSDT() {
    try {
        let res = await fetch('https://api.huobi.pro/market/detail?symbol=waxpusdt', {
            method: 'GET'
        })
            .then(waxpusdt => waxpusdt.json())
            .then(waxpusdt => waxpusdt)
            .catch((error) => {
                console.error('Error:', error.message);
            });
        return parseFloat(res?.tick?.close ?? 0);
    } catch (error) {
        console.log(`#W16: ${error.message}`);
    }
    return 0;
};
async function getToken(account) {
    return await Get('https://lightapi.eosamsterdam.net/api/balances/wax/' + account);
};
function token(balances, currency) {
    let data = balances.filter(function (token) {
        return token.currency == currency;
    });
    return data[0];
};
async function getAssetsPrice(assets) {
    let assetPrice = [];
    for (let asset of assets) {
        if ((asset.template_id ?? asset.template.template_id) in assetPrice)
            continue;
        try {
            let res = await getSalesByTempId(asset.template_id ?? asset.template.template_id, 99);
            assetPrice[asset.template_id ?? asset.template.template_id] = {
                price: res.data[0].price.amount / 100000000,
                count: res.data.length
            };
        } catch (error) {
            try {
                assetPrice[asset.template_id ?? asset.template.template_id] = {
                    price: await getLastPrice(asset.template_id ?? asset.template.template_id),
                    count: null
                };
            } catch (error) {
            }
        }
    }
    return assetPrice;
};
async function getLastPrice(id) {
    try {
        const res = await fetch('https://wax.api.aa.atomichub.io/atomicmarket/v1/prices/sales?symbol=WAX&template_id=' + id);
        const json = await res.json();
        return json.data[json.data.length - 1].price / 100000000;
    } catch (error) {
        console.log(error.message);
        return 0;
    }
};
async function postSales(game, schema, match, limit = 40) {
    try {
        let res = await fetch('https://wax.api.aa.atomichub.io/atomicmarket/v1/sales', {
            'headers': {
                'content-type': 'application/json',
            },
            'body': `{\'state\':\'1\',\'limit\':\'${limit}\',\'page\':\'1\',\'order\':\'asc\',\'sort\':\'price\',\'symbol\':\'WAX\',\'collection_name\':\'${game}\',\'match\':\'${match}\',\'schema_name\':\'${schema}\',\'collection_blacklist\':\'\'}`,
            'method': 'POST'
        })
            .then(res => res.json())
            .then(res => res)
            .catch((error) => {
                console.error('Error:', error.message);
            });
        return res;
    } catch (error) {
        console.log(`#W24: ${error.message}`);
    }
    return false;
};
async function getSalesByName(collection, schema, match, limit = 1) {
    return await Get(`https://wax.api.atomicassets.io/atomicmarket/v1/sales?collection_name=${collection}&schema_name=${schema}&match=${match.replace(' ', '%20')}&order=asc&sort=price&symbol=WAX&limit=${limit}&state=1`);
};
async function getSalesByTempId(tempId, limit = 1) {
    return await Get(`https://wax.api.aa.atomichub.io/atomicmarket/v1/sales?state=1&template_id=${tempId}&order=asc&sort=price&limit=${limit}&symbol=WAX`);
};
async function getAssetById(id) {
    if (!id) return;
    let res = await Get('https://wax.api.atomicassets.io/atomicassets/v1/assets/' + id);
    return res ? res?.data : res;
};
async function getAssetByIds(ids) {
    if (typeof ids === 'string') {
        ids = [ids];
    }
    try {
        const assets = [];
        for (let id of ids) {
            let asset = await getAssetById(id);
            assets.push(asset);
        }
        return assets;
    } catch (error) {
        console.log(error.message);
    }
};
async function loopResources(account = wax.userAccount, loop = true) {
    let cpuCheck = eShow('cpuCheck') ? Number(webDriver('cpuCheck', className).value) : 100;
    cpuCheck = cpuCheck > 100 ? 100 : cpuCheck;
    if (data['checking']) {
        while (true) {
            if (data['cpuChange'] < cpuCheck) break;
            await sleep(1000);
        }
    } else {
        data['checking'] = true;
        Status('Checking: ', 'statusCPU');
        while (true) {
            data['resources'] = await getAccount(account);
            if (typeof onChangeResources === 'function') {
                onChangeResources(data['resources']);
            }
            if (data['cpuChange'] < cpuCheck || data['stop'] || data['cpuLoop'] == false || loop == false) break;
            else toastr.warning(`CPU: ${data['cpuChange']}% (Wait until CPU is less than ${cpuCheck}%)`, 'WAX Bloks');
            await sleep(5000);
        }
        data['checking'] = false;
        Status('CPU: ', 'statusCPU');
    }
    return data['cpuChange'] < cpuCheck;
};
class NeftyBlocks {
    constructor() {
    };

    static accounts = async (account) => {
        fetch('https://aa.neftyblocks.com/atomicassets/v1/accounts/' + account);
    };
};
class NFTHive {
    static api = 'https://api.nfthive.io/api/';
    static stats = 'https://stats.hivebp.io/statistics/';
    constructor() {
    }

    static count = async (account) => await Request.fetch(this.stats + `user-assets?owner=${account}`);
    static totalBuys = async (account) => await Request.fetch(this.stats + `total-buys?buyer=${account}`);
    static totalSells = async (account) => await Request.fetch(this.stats + `total-sells?seller=${account}`);

    // https://api.nfthive.io/api/collections-overview/*?verified=true
    static collections = async () => await Request.fetch(this.api + 'authors/true');
    static schemas = async (collection) => await Request.fetch(this.api + 'author-categories?author=' + collection);
    static templates = async (schema) => await Request.fetch(this.api + 'author-categories?author=' + collection);
    static sales = async (account, limit = 9999, author = '*') => await Request.fetch(this.api + `search?owner=${account}&user=${account}&author=${author}&limit=${limit}&order_by=date&search_type=sales`);
    // return await Get(`https://api.nfthive.io/api/search?name=&owner=${account}&author=*&category=&rarity=&variant=&order_by=date&color=&type=&border=&order_dir=DESC&limit=${limit}&search_type=sales&exact_search=false&offer_type=sales&min_price=0&max_price=0&min_mint=0&max_mint=0&offset=0&attr7=&attr8=&attr9=&attr10=&verified=true&favorites=false&user=${account}&template_id=&asset_id=&number=&max_aether=&min_aether=`);
    static assets = async (account, limit = 9999, author = '*') => await Request.fetch(this.api + `search?owner=${account}&user=${account}&author=${author}&limit=${limit}&order_by=date`);
    // return await Get(`https://api.nfthive.io/api/search?name=&owner=${account}&author=*&category=&rarity=&variant=&order_by=date&color=&type=&border=&order_dir=DESC&limit=${limit}&search_type=assets&exact_search=false&offer_type=sales&min_price=0&max_price=0&min_mint=0&max_mint=0&offset=0&attr7=&attr8=&attr9=&attr10=&verified=true&favorites=false&user=${account}&template_id=&asset_id=&number=&max_aether=&min_aether=`);
    static tradingHistory = async (account) => await Request.fetch(this.api + 'trading-history/' + account);
    static buys = async (account, limit = 9999, author = '*') => await Request.fetch(this.api + `search?name=&owner=${account}&author=${author}&category=&rarity=&variant=&order_by=date&color=&type=&border=&order_dir=DESC&limit=${limit}&search_type=buys&exact_search=false&offer_type=sales&min_price=0&max_price=0&min_mint=0&max_mint=0&offset=0&attr7=&attr8=&attr9=&attr10=&verified=true&favorites=false&user=${account}&template_id=&asset_id=&number=&max_aether=&min_aether=`);
    static sells = async (account, limit = 9999, author = '*') => await Request.fetch(this.api + `search?name=&owner=${account}&author=${author}&category=&rarity=&variant=&order_by=date&color=&type=&border=&order_dir=DESC&limit=${limit}&search_type=sells&exact_search=false&offer_type=sales&min_price=0&max_price=0&min_mint=0&max_mint=0&offset=0&attr7=&attr8=&attr9=&attr10=&verified=true&favorites=false&user=${account}&template_id=&asset_id=&number=&max_aether=&min_aether=`);
    static async allAssets(account, limit = 9999, author = '*') {
        let assets = await this.assets(account, limit, author);
        let sales = await this.sales(account, limit, author);
        return [...(assets.success ? assets : []), ...(sales.success ? sales : [])];
    };
    static templateData = async (res) => {
        if (!res['data']) return null;
        let result = { assets: 0 };
        for (let data of res['data']) {
            if (data?.asset_id) result.assets++;
            let price = 0;
            if (data?.prices) {
                if (data.prices.length > 0) {
                    ['average', 'median', 'suggested_median', 'suggested_average'].forEach(item => {
                        if (data.prices[0][item]) {
                            price = Number(data.prices[0][item] ?? 0) / 100000000;
                            result[item] = { total: (result[item]?.total ?? 0) + 1, value: (result[item]?.value ?? 0) + price };
                        }
                    });
                }
            }
            if (nft && nft == data.name) {
                result['template'].count = (data['template']?.count ?? 0) + 1;
                result['template'].value = (data['template']?.count ?? 1) * price;
            }
        }
        console.log(result);
        return result;
    };
};
class AtomicHub {
    servers = [
        'https://wax.api.atomicassets.io',
        'https://wax.api.aa.atomichub.io',
        'https://atomic.hivebp.io'
    ];
    constructor(server = 2) {
        this.server = this.servers[server];
    };
    get = async (path, parameters) => await Request.get(this.server + path + MyObject.queryString(parameters));
    assets = async (parameters) => {
        parameters['limit'] = parameters['limit'] ?? 1000;
        parameters['order'] = parameters['order'] ?? 'desc';
        parameters['sort'] = parameters['sort'] ?? 'transferred';
        return await this.get('/atomicassets/v1/assets', parameters);
    };
    schemas = async (parameters = {}) => {
        parameters['page'] = parameters['page'] ?? 1;
        parameters['limit'] = parameters['limit'] ?? 1000;
        parameters['order'] = parameters['order'] ?? 'desc';
        parameters['sort'] = parameters['sort'] ?? 'created';
        return await this.get('/atomicassets/v1/schemas', parameters);
    };
    templates = async (parameters = {}) => {
        parameters['page'] = parameters['page'] ?? 1;
        parameters['limit'] = parameters['limit'] ?? 1000;
        parameters['order'] = parameters['order'] ?? 'desc';
        parameters['sort'] = parameters['sort'] ?? 'created';
        return await this.get('/atomicassets/v1/templates', parameters);
    };
    lowest = async (parameters = {}) => {
        parameters['symbol'] = parameters['symbol'] ?? 'WAX';
        parameters['page'] = parameters['page'] ?? 1;
        parameters['limit'] = parameters['limit'] ?? 100;
        parameters['order'] = parameters['order'] ?? 'desc';
        parameters['sort'] = parameters['sort'] ?? 'created';
        return await this.get('/atomicmarket/v1/sales/templates', parameters);
    };
    sales = async (parameters = {}) => {
        parameters['state'] = parameters['state'] ?? 1;
        parameters['page'] = parameters['page'] ?? 1;
        parameters['limit'] = parameters['limit'] ?? 100;
        parameters['order'] = parameters['order'] ?? 'desc';
        parameters['sort'] = parameters['sort'] ?? 'created';
        return await this.get('/atomicmarket/v1/sales', parameters);
    };
    static sales = async (obj) => { return await Request.get(this.servers[0] + '/atomicassets/v1/sales?' + MyObject.queryString(obj)); };
    static getAssetsByOwner = async (owner) => await Request.get(this.servers[0] + '/atomicassets/v1/assets?' + MyObject.queryString({ owner: owner, limit: 9999, sort: 'transferred' }));

    static collections = async () => { return await Request.fetch(this.servers[1] + '/atomicmarket/v1/stats/collections', 'POST', JSON.stringify({ collection_whitelist: '', sort: 'volume', order: 'desc', symbol: 'WAX', after: '1634392800000' })); };
    static collectionPrice = async (collection = 'farmingtales') => {
        let templates = [];
        await this.templates(collection).then((res) => {
            res?.data.forEach(function (template) {
                templates.push(template.template_id);
            });
        });
        let res = await this.listLowest(templates);
        console.log(res);
    };

    static getAssets = async (account, method = 'GET', limit = '999', page = '1') => { return method == 'GET' ? await Request.get(`https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${account}&limit=${limit}`) : await Request.fetch('https://wax.api.aa.atomichub.io/atomicmarket/v1/assets', 'POST', JSON.stringify({ collection_blacklist: '', limit: limit, order: 'desc', owner: account, sort: 'transferred', page: page })); };
    static getAssetDetails = async (assetId) => await Request.get(this.servers[0] + '/atomicassets/v1/assets/' + assetId);
    static assetValue = async (res) => {
        let result = { assets: 0 };
        for (let data of res['data']) {
            result.assets++;
            if (data?.prices && data.prices.length > 0) {
                ['average', 'median', 'suggested_median', 'suggested_average'].forEach(item => {
                    if (data.prices[0][item]) {
                        let price = Number(data.prices[0][item] ?? 0) / 100000000;
                        result[item] = { assets: (result[item]?.assets ?? 0) + 1, price: price, value: (result[item]?.value ?? 0) + price };
                    }
                });
            }
        }
        console.log(result);
        return result;
    };
    static getBought = async (account, page = 1, limit = 100) => { return await Request.fetch(this.servers[1] + '/atomicmarket/v1/sales', 'POST', JSON.stringify({ buyer: account, collection_blacklist: '', limit: limit, order: 'desc', page: page, sort: 'updated', state: '3', symbol: 'WAX' })); };
    static getTransfer = async (account, page = 1, limit = 10) => { return await Request.fetch(this.servers[1] + '/atomicassets/v1/transfers', 'POST', JSON.stringify({ account: account, collection_whitelist: '', hide_contracts: true, limit: limit, page: page })); };
    static async templateData(res) {
        let result = { assets: 0 };
        for (let data of res['data']) {
            if (data?.asset_id) result.assets++;
            let price = 0;
            if (data?.prices) {
                if (data.prices.length > 0) {
                    ['average', 'median', 'suggested_median', 'suggested_average'].forEach(item => {
                        if (data.prices[0][item]) {
                            price = Number(data.prices[0][item] ?? 0) / 100000000;
                            result[item] = { total: (result[item]?.total ?? 0) + 1, value: (result[item]?.value ?? 0) + price };
                        }
                    });
                }
            }
            if (nft && nft == data.name) {
                result['template'].count = (data['template']?.count ?? 0) + 1;
                result['template'].value = (data['template']?.count ?? 1) * price;
            }
        }
        console.log(result);
        return result;
    };
    static getPriceByTemp = async (templateId, page = 0, limit = null, sort = null, order = null, state = null) => {
        limit = limit ?? 100;
        sort = sort ?? 'price';
        state = state ?? sort == 'updated' ? 3 : 1;
        order = order ?? order == 'updated' ? 'desc' : 'asc';
        return await Get(this.servers[0] + `/atomicmarket/v1/sales?page=${page}&limit=100&order=${order}&sort=${sort}&state=${state}&template_id=${templateId}`);
    };
    static lowestPrice = async (templateId, page = 0, limit = null) => await this.getPriceByTemp(templateId, page, limit);
    static newestPrice = async (templateId, page = 0, limit = null, sort = 'updated') => await this.getPriceByTemp(templateId, page, limit, sort);
    static listLowest = async (arr) => {
        let promises = [], data = [], group = [];
        arr.forEach((id, i) => {
            let round = Math.floor(i / 5);
            group[round] = group[round] ?? [];
            group[round].push(id);
        });
        group.forEach((temps) => {
            promises.push(this.lowestPrice(temps.toString(), 0, 100)
                .then(res => {
                    if (res?.success && res.data.length > 0) {
                        data = data.concat(res.data);
                        return res.data;
                    }
                }).catch(err => {
                    return err;
                }))
        });
        await Promise.all(promises);
        return data;
    };
};
class AlcorExchange {
    static swapPrice = async (token1, token2) => {
        const res = await getTableRows({
            code: 'alcorammswap',
            scope: 'alcorammswap',
            table: 'pairs',
            lower_bound: token1,
            upper_bound: token2
        });
        try {
            if (res) return parseFloat(res.rows[0].pool1.quantity.split(' ')[0] / res.rows[0].pool2.quantity.split(' ')[0]);;
        } catch (error) {
            console.log(error.message);
        }
        return 0;
    };
    static swap = async (token, quantity, memo, account = wax.userAccount) => {
        return await transact([{
            account: token,
            name: 'transfer',
            authorization: [{
                actor: account,
                permission: 'active'
            }],
            data: {
                from: account,
                to: 'alcorammswap',
                quantity: quantity,
                memo: memo
            }
        }]);
    };
};
async function getAssets(account, limit = 1000) {
    return await AtomicHub.getAssets(account);
};
async function getBought(account, page = 1, limit = 100) {
    return await AtomicHub.getBought(account, page, limit);
};
async function getTransfer(account, page = 1, limit = 10) {
    return await AtomicHub.getTransfer(account, page, limit);
}
// BEGIN: Alien Worlds
async function setBag(items, account = wax.userAccount) {
    let bag = items.filter(function (item) {
        return item;
    });
    if (account) return await transact([{
        account: mfederation,
        name: 'setbag',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            account: account,
            items: bag
        }
    }]);
};
async function setLand(land, account = wax.userAccount) {
    if (account) return await transact([{
        account: mfederation,
        name: 'setland',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            account: account,
            land_id: land
        }
    }]);
};
async function claimNFTs(miner = wax.userAccount, account = wax.userAccount) {
    if (account) return await transact([{
        account: mfederation,
        name: 'claimnfts',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            miner: miner
        }
    }]);
};
const register = async (tag, account = wax.userAccount) => {
    if (account && tag) {
        await agreeTerms();
        await setAvatar();
        return await setTag(tag);
    }
};
const getPlayerData = async (account) => {
    const res = await getTableRows({
        code: federation,
        scope: federation,
        table: 'players',
        lower_bound: account,
        upper_bound: account
    });
    const player = data['player'] = {
        tag: '',
        avatar: ''
    };
    if (res) {
        if (res.rows.length) {
            player.tag = res.rows[0].tag;
            if (res.rows[0].avatar > 0) {
                player.avatar = await getAssetById(res.rows[0].avatar);
            }
        }
    }
    data['player'] = player;
    return player;
};
async function checkRegister(player = data['player']) {
    player = !player ? await getPlayerData(account = wax.userAccount) : player;
    if (player.tag != '') {
        toastr.info('You was create tag', 'Alien Worlds');
        return true;
    }
    return false;
};
async function setTag(tag, account = wax.userAccount, player = data['player']) {
    if (account) {
        player = !player?.tag ? await getPlayerData(account = wax.userAccount) : player;
        if (player.tag != '') {
            toastr.info('Already have an avatar', 'Alien Worlds');
            return true;
        }
        return await transact([{
            account: federation,
            name: 'settag',
            authorization: [{
                actor: account,
                permission: 'active'
            }],
            data: {
                account: account,
                tag: tag
            }
        }]);
    }
};
async function agreeTerms(account = wax.userAccount) {
    if (account) return await transact([{
        account: federation,
        name: 'agreeterms',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            account: account,
            terms_id: 1,
            terms_hash: 'e2e07b7d7ece0d5f95d0144b5886ff74272c9873d7dbbc79bc56f047098e43ad'
        }
    }]);
};
async function setAvatar(account = wax.userAccount, player = data['player']) {
    if (account) {
        player = !player?.avatar ? await getPlayerData(account = wax.userAccount) : player;
        if (player.avatar != '') {
            toastr.info('Already have an avatar', 'Alien Worlds');
            return true;
        }
        return await transact([{
            account: federation,
            name: 'setavatar',
            authorization: [{
                actor: account,
                permission: 'active'
            }],
            data: {
                account: account,
                avatar_id: 1
            }
        }]);
    }
};
async function awAssetsByOwner(account, limit = 100, collection = 'alien.worlds', schema = 'tool.worlds') {
    let strCollection = collection ? '&collection_name=' + collection : null;
    let strSchema = schema ? '&schema_name=' + schema : null;
    let res = await fetch(`https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${account}${strCollection}${strSchema}&limit=${limit}`);
    let json = await res.json();
    json = json['data'].sort(function (a, b) {
        return sum1(b) - sum1(a);
    });
    return json;
};
async function awBag(account = wax.userAccount) {
    const res = await getTableRows({
        code: mfederation,
        scope: mfederation,
        table: 'bags',
        lower_bound: account,
        upper_bound: account
    });
    let bag = [];
    try {
        if (res) {
            if (res.rows.length) {
                bag = data['awBag'] = await getAssetByIds(res.rows[0].items);
            }
        }
    } catch (error) {
    }
    return bag;
};
const awLand = async (account = wax.userAccount) => {
    try {
        const res = await getTableRows({
            code: mfederation,
            scope: mfederation,
            table: 'miners',
            lower_bound: account,
            upper_bound: account
        });
        if (res) {
            data['awLand'] = await getAssetById(res.rows.length === 0 ? null : res.rows[0].current_land);
            return data['awLand'];
        }
    } catch (error) {
        console.log(`${error.message}`);
    }
    return false;
};
// END: Alien Worlds
// BEGIN: Farmers World
async function fwRegister() {
    return await transact([{
        account: farmersworld,
        name: 'newuser',
        authorization: [{
            actor: wax.userAccount,
            permission: 'active'
        }],
        data: {
            owner: wax.userAccount
        },
    },]);
};
async function fwMine(assetId, type = 'claim', account = wax.userAccount) {
    if (assetId && account) return await transact([{
        account: farmersworld,
        name: type,
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            owner: account,
            asset_id: assetId,
        },
    },]);
};
async function fwRepair(assetId, account = wax.userAccount) {
    if (account && assetId) return Boolean(await transact([{
        account: farmersworld,
        name: 'repair',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            asset_owner: account,
            asset_id: assetId,
        },
    },]));
    return false;
};
async function fwRecover(amount = 0, account = wax.userAccount) {
    if (amount > 0) return Boolean(await transact([{
        account: farmersworld,
        name: 'recover',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            owner: account,
            energy_recovered: nFormat(amount)
        },
    },]));
    return false;
};
async function fwWithdraw(gold, food, wood, fee, account = wax.userAccount) {
    if (sum([gold, food, wood]) == 0) return false;
    let list = [{
        name: 'GOLD',
        value: gold
    },
    {
        name: 'FOOD',
        value: food
    },
    {
        name: 'WOOD',
        value: wood
    },
    ];
    let quantities = list
        .filter((item) => item.value > 0)
        .map((item) => ''.concat(toStr(item.value, 4), ' ').concat(item.name));
    return await transact([{
        account: farmersworld,
        name: 'withdraw',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            owner: account,
            quantities: quantities,
            fee: fee
        },
    },]);
};
async function fwDeposit(gold, food, wood) {
    if (sum([gold, food, wood]) == 0) return false;
    let list = [{
        name: 'FWG',
        value: gold
    },
    {
        name: 'FWF',
        value: food
    },
    {
        name: 'FWW',
        value: wood
    },
    ];
    let quantities = list
        .filter((item) => item.value > 0)
        .map((item) => `${toStr(item.value, 4)} ${item.name}`);
    let actions = [{
        account: 'farmerstoken',
        name: 'transfers',
        authorization: [{
            actor: wax.userAccount,
            permission: 'active'
        }],
        data: {
            from: wax.userAccount,
            to: farmersworld,
            quantities: quantities,
            memo: 'deposit',
        },
    },];
    return await transact(actions);
};
async function fwCardTools() {
    return await getTableRows({
        code: farmersworld,
        scope: farmersworld,
        table: 'toolconfs',
        limit: 100
    });
};
async function fwCardMembers() {
    return await getTableRows({
        code: farmersworld,
        scope: farmersworld,
        table: 'mbsconf',
        limit: 100
    });
};
async function fwTools(account) {
    const res = await getTableRows({
        code: farmersworld,
        scope: farmersworld,
        table: 'tools',
        lower_bound: account,
        upper_bound: account,
        index_position: 2,
        key_type: 'i64',
        limit: 100
    });
    try {
        if (res) return res.rows;
    } catch (error) {
        console.log(`#W3: ${error.message}`);
    }
    return false;
};
async function fwMemberships(account) {
    return await getTableRows({
        code: farmersworld,
        scope: farmersworld,
        table: 'mbs',
        lower_bound: account,
        upper_bound: account,
        index_position: 2,
        key_type: 'i64',
        limit: 100
    });
};
function fwAssetMine(assets) {
    try {
        let i = 0;
        assets.forEach(function (asset, j) {
            if (asset.next_availability < assets[i].next_availability) {
                i = j;
            }
        });
        return assets[i];
    } catch (error) {
        console.log(`#9: ${error.message}`);
    }
    return false;
};
async function fwInfo(account) {
    return await getTableRows({
        code: farmersworld,
        scope: farmersworld,
        table: 'accounts',
        lower_bound: account,
        upper_bound: account,
        index_position: 1,
        key_type: 'i64',
        limit: 100
    });
};
async function fwFee() {
    const res = await getTableRows({
        code: farmersworld,
        scope: farmersworld,
        table: 'config'
    });
    try {
        if (res) return res.rows[0].fee;
    } catch (error) {
        console.log(`#W6: ${error.message}`);
    }
    return 8;
};
// END: Farmers World
// BEGIN: NFT Panda
const getHeroes = async (account) => {
    return await fetch('https://chain.wax.io/v1/chain/get_table_rows', {
        headers: {
            'content-type': 'text/plain;charset=UTF-8',
        },
        body: JSON.stringify({
            json: true,
            code: 'nftpandawofg',
            scope: 'nftpandawofg',
            table: 'nftsongamec',
            table_key: '',
            lower_bound: account,
            upper_bound: account,
            index_position: 2,
            key_type: 'i64',
            limit: -1,
            reverse: true,
            show_payer: false
        }),
        method: 'POST'
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        return json.rows;
    });
};
const getTotalSum = async (account) => {
    return await fetch('https://chain.wax.io/v1/chain/get_table_rows', {
        headers: {
            'content-type': 'text/plain;charset=UTF-8',
        },
        body: JSON.stringify({
            json: true,
            code: 'nftpandawofg',
            scope: 'nftpandawofg',
            table: 'usersnew',
            table_key: '',
            lower_bound: account,
            upper_bound: account,
            index_position: 1,
            key_type: '',
            limit: 1,
            reverse: false,
            show_payer: false
        }),
        method: 'POST'
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        if (json?.error?.code == 3010000) return [];
        return json.rows[0];
    });
};
const getAssetInfo = async (assetId) => {
    return await AtomicHub.getAssetDetails(assetId);
};
async function nftPandaTransact(account, assetId, value) {
    return await transact([{
        account: 'nftpandawofg',
        name: 'printrand',
        authorization: [{
            actor: account,
            permission: 'active'
        }],
        data: {
            username: account,
            assoc_id: assetId,
            signing_value: value
        }
    }]);
};
// END: NFT Panda
// BEGIN: Farming Tales
class FarmingTales {
    static getBalance = async (symbol = 'SEST', account = wax.userAccount) => await WAXBloks.getBalance(account, 'farmingtoken', symbol);

    static marketplace = async () => await WAXBloks.getTables({ json: true, code: 'farminggames', scope: 'farminggames', table: 'marketplace', table_key: '', lower_bound: '', upper_bound: '', index_position: 1, key_type: '', limit: 1000, reverse: false, show_payer: false });
    static confbuilding = async () => await WAXBloks.getTables({ json: true, code: 'farminggames', scope: 'farminggames', table: 'confbuilding', lower_bound: null, upper_bound: null, index_position: 1, key_type: '', limit: 1000, reverse: false, show_payer: false });
    static confbuildout = async () => await WAXBloks.getTables({ json: true, code: 'farminggames', scope: 'farminggames', table: 'confbuildout', lower_bound: null, upper_bound: null, index_position: 1, key_type: '', limit: 1000, reverse: false, show_payer: false });
    static confanimal = async () => await WAXBloks.getTables({ json: true, code: 'farminggames', scope: 'farminggames', table: 'confanimal', lower_bound: null, upper_bound: null, index_position: 1, key_type: '', limit: 1000, reverse: false, show_payer: false });
    static confplant = async () => await WAXBloks.getTables({ json: true, code: 'farminggames', scope: 'farminggames', table: 'confplant', lower_bound: null, upper_bound: null, index_position: 1, key_type: '', limit: 1000, reverse: false, show_payer: false });
    static confflower = async () => await WAXBloks.getTables({ json: true, code: 'farminggames', scope: 'farminggames', table: 'confflower', lower_bound: null, upper_bound: null, index_position: 1, key_type: '', limit: 1000, reverse: false, show_payer: false });

    static getClaim = async (account) => {
        let res = await WAXBloks.getTables({ json: true, code: 'farminggames', scope: 'farminggames', table: 'claim', table_key: '', lower_bound: account, upper_bound: account, index_position: 1, key_type: '', limit: 1, reverse: false, show_payer: false });
        return res?.rows.length ? Number((res.rows[0]?.to_claim ?? 0) / 10000) : 0;
    };
    static wallet = async (account = wax.userAccount) => await WAXBloks.getTables({ json: true, code: 'farminggames', scope: 'farminggames', table: 'wallet', table_key: '', lower_bound: account, upper_bound: account, index_position: 1, key_type: '', limit: 1, reverse: false, show_payer: false });
    static resources = async (account = wax.userAccount) => await WAXBloks.getTables({ json: true, code: 'farminggames', scope: 'farminggames', table: 'resources', lower_bound: account, upper_bound: account, index_position: 1, key_type: '', limit: 1, reverse: false, show_payer: false });
    static building = async (account = wax.userAccount) => await WAXBloks.getTables({ code: 'farminggames', index_position: 2, json: true, key_type: 'i64', limit: 10000, lower_bound: account, reverse: false, scope: 'farminggames', show_payer: false, table: 'building', table_key: '', upper_bound: account });
    static buildout = async (account = wax.userAccount) => await WAXBloks.getTables({ code: 'farminggames', index_position: 2, json: true, key_type: 'i64', limit: 10000, lower_bound: account, reverse: false, scope: 'farminggames', show_payer: false, table: 'buildout', table_key: '', upper_bound: account });
    static animal = async (account = wax.userAccount) => await WAXBloks.getTables({ code: 'farminggames', index_position: 2, json: true, key_type: 'i64', limit: 10000, lower_bound: account, reverse: false, scope: 'farminggames', show_payer: false, table: 'animal', table_key: '', upper_bound: account });
    static plant = async (account = wax.userAccount) => await WAXBloks.getTables({ code: 'farminggames', index_position: 2, json: true, key_type: 'i64', limit: 10000, lower_bound: account, reverse: false, scope: 'farminggames', show_payer: false, table: 'plant', table_key: '', upper_bound: account });
    static flower = async (account = wax.userAccount) => await WAXBloks.getTables({ code: 'farminggames', index_position: 2, json: true, key_type: 'i64', limit: 10000, lower_bound: account, reverse: false, scope: 'farminggames', show_payer: false, table: 'flower', table_key: '', upper_bound: account });

    static stakebuild = async (assetId, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'stakebuild', authorization: [{ actor: account, permission: 'active' }], data: { account: account, asset_id: assetId } }]);
    static rmvbuild = async (assetId, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'rmvbuild', authorization: [{ actor: account, permission: 'active' }], data: { account: account, asset_id: assetId } }]);
    static stakeanimal = async (buildingId, assetId, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'stakeanimal', authorization: [{ actor: account, permission: 'active' }], data: { account: account, asset_id: assetId, building_id: buildingId } }]);
    static rmvanimal = async (assetId, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'rmvbuild', authorization: [{ actor: account, permission: 'active' }], data: { account: account, asset_id: assetId } }]);
    static harvestanim = async (assetId, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'harvestanim', authorization: [{ actor: account, permission: 'active' }], data: { account: account, asset_id: assetId } }]);
    static harvestbuild = async (assetId, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'harvestbuild', authorization: [{ actor: account, permission: 'active' }], data: { account: account, asset_id: assetId } }]);
    static harvestplant = async (plant_id, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'harvestplant', authorization: [{ actor: account, permission: 'active' }], data: { account: account, plant_id: plant_id } }]);
    static hvstflower = async (asset_id, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'hvstflower', authorization: [{ actor: account, permission: 'active' }], data: { account: account, asset_id: asset_id } }]);
    static harvestgardn = async (assetId, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'harvestgardn', authorization: [{ actor: account, permission: 'active' }], data: { account: account, asset_id: assetId } }]);
    static harvestmulti2 = async (anim_asset_ids, build_asset_ids, plant_asset_ids, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'harvestmulti2', authorization: [{ actor: account, permission: 'active' }], data: { account: account, anim_asset_ids: anim_asset_ids, build_asset_ids: build_asset_ids, plant_asset_ids: plant_asset_ids } }]);
    static harvestmulti = async (anim_asset_ids, build_asset_ids, grdn_asset_ids, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'harvestmulti', authorization: [{ actor: account, permission: 'active' }], data: { account: account, anim_asset_ids: anim_asset_ids, build_asset_ids: build_asset_ids, grdn_asset_ids: grdn_asset_ids } }]);
    static buyonmarket = async (templateId, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farmingtoken', name: 'buyonmarket', authorization: [{ actor: account, permission: 'active' }], data: { account: account, template_id: templateId } }]);
    static refillfood = async (account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'refillfood', authorization: [{ actor: account, permission: 'active' }], data: { account: account } }]);
    static refillwater = async (account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'refillwater', authorization: [{ actor: account, permission: 'active' }], data: { account: account } }]);
    static withdraw = async (value, symbol, account = wax.userAccount) => await WAXBloks.transact([{ account: 'farminggames', name: 'withdraw', authorization: [{ actor: account, permission: 'active' }], data: { account: account, value: MyNumber.toString(value, 4) + ' ' + symbol } }]);
    static getActions = async (contains, obj = {}) => {
        obj['account'] = obj['account'] ?? wax.userAccount; obj['filter'] = 'farminggames%3A' + (obj['filter'] ?? '*'); obj['skip'] = obj['skip'] ?? 0; obj['limit'] = obj['limit'] ?? 1000, obj['sort'] = obj['sort'] ?? 'desc';
        let staked = {}, res = { actions: [] };
        for (let i = 0; i < 5; i++) {
            res = await WAXBloks.getActions(obj);
            if (res['success']) break
        };
        for (let i = 0; i < res.actions.length; i++) {
            let action = res.actions[i];
            let asset_ids = action.act.name.includes('hvstmult') ? action.act.data?.asset_ids ?? action.act.data?.data?.asset_ids : [action.act.data?.asset_id ?? action.act.data?.data?.asset_id];
            if (asset_ids.length == 0) {
                console.log('History harvest not found: ' + action.trx_id)
            };
            asset_ids.forEach(asset_id => {
                if (!staked[asset_id]?.staked && contains.includes(action.act.name)) {
                    staked[asset_id] = staked[asset_id] ?? {};
                    staked[asset_id].asset_id = asset_id;
                    staked[asset_id].harvest = action.act.name;
                    let last_harvest = toUnixTime(action.timestamp) > (staked[asset_id]?.timer ?? 0) ? action.timestamp : staked[asset_id]?.last_harvest;
                    staked[asset_id].last_harvest = toUnixTime(last_harvest);
                    staked[asset_id].harvested_at_time = toLocalTime(last_harvest);
                    staked[asset_id].timer = toUnixTime(last_harvest);
                    staked[asset_id].staked = true;
                };
            });
        };
        return staked;
    };
    static staked = async (obj = {}) => {
        obj['account'] = obj['account'] ?? wax.userAccount; obj['filter'] = 'farminggames%3A' + (obj['filter'] ?? 'stakebuild'); obj['skip'] = obj['skip'] ?? 0; obj['limit'] = obj['limit'] ?? 1000, obj['sort'] = obj['sort'] ?? 'desc';
        let result = {}, res = { actions: [] };
        for (let i = 0; i < 5; i++) {
            res = await WAXBloks.getActions(obj);
            if (res['success']) break
        };
        for (let i = 0; i < res.actions.length; i++) {
            let action = res.actions[i],
                action_name = action.act.name,
                data = action.act.data?.data ?? action.act.data,
                asset_id = data?.asset_id,
                building_id = data?.building_id;
            if (result[asset_id]?.staked_at_time) continue;
            if (obj['filter'].includes(action_name) && (action_name == 'stakebuild') ? data?.x >= 0 : true) {
                result[asset_id] = { asset_id: asset_id, staked_at_time: toUnixTime(action.timestamp) };
                if (building_id) result[asset_id]['building_id'] = building_id;
            };
        };
        return result;
    };
    static removed = async (obj = {}) => {
        obj['account'] = obj['account'] ?? wax.userAccount; obj['filter'] = 'farminggames%3A' + (obj['filter'] ?? 'rmvbuild'); obj['skip'] = obj['skip'] ?? 0; obj['limit'] = obj['limit'] ?? 1000, obj['sort'] = obj['sort'] ?? 'desc';
        let result = {}, res = { actions: [] };
        for (let i = 0; i < 5; i++) {
            res = await WAXBloks.getActions(obj);
            if (res['success']) break
        };
        for (let i = 0; i < res.actions.length; i++) {
            let action = res.actions[i];
            let data = action.act.data?.data ?? action.act.data, asset_id = data?.asset_id;
            if (result[asset_id]?.removed_at_time) continue;
            if (obj['filter'].includes(action.act.name)) {
                result[asset_id] = { asset_id: asset_id, removed_at_time: toUnixTime(action.timestamp) };
            };
        };
        return result;
    };
    static stats = async (obj) => {
        let data = { data: [], count: {} }, i = 0;
        while (true) {
            let res = await WAXBloks.getActions({ account: obj.account, filter: 'farminggames%3A*', skip: i == 0 ? 0 : (i * 1000) - 1, limit: 1000, sort: 'desc' });
            if (res.actions.length == 0) break;
            res.actions.forEach(action => {
                if (['harvestanim', 'hvstmultanim', 'harvestgardn', 'hvstmultgrdn'].includes(action.act.name)) {
                    let action_ids = action.act.name.includes('hvstmult') ? action.act.data?.asset_ids ?? action.act.data?.data?.asset_ids : [action.act.data?.asset_id ?? action.act.data?.data?.asset_id];
                    obj.ids.forEach(id => {
                        if (action_ids.includes(id)) {
                            data.count[id] = (data.count[id] ?? 0) + 1;
                            data.data.push({ date: toLocalTime(action.timestamp), asset_id: id, action: action.act.name, tx: action.trx_id });
                        }
                    });
                };
            });
            i++;
        }
        console.log(data);
        return data;
    };
};
// END: Farming Tales
// BEGIN: Exchane
async function getBinance(token) {
    try {
        let res = await fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${token}USDT`);
        const json = await res.json();
        return json.price;
    } catch (error) {
        console.log(`${error.message}`);
    }
    return 0;
}
// END: Exchange
// BEGIN: View
async function swiperToken(account) {
    try {
        data['tokens'] = await getToken(account);
        if (!data['tokens']) return;
        let swiper = webDriver('swiper-token', 'className');
        if (eHide('stakedWAX')) {
            let slide = document.createElement('div');
            slide.className = 'swiper-slide rounded swiper-shadow py-1 px-3 d-flex';
            swiper.appendChild(slide);
            let text = document.createElement('div');
            text.className = 'swiper-text text-warning stakedWAX';
            slide.appendChild(text);
        }
        Status(toStr(data['waxStaked'] ?? 0, 2) + ' WAX', 'stakedWAX');
        for (let token of data['tokens'].balances) {
            try {
                let amount = parseFloat(token.amount);
                tokens['balances'][token.currency] = amount;
                if (eShow(`token${token.currency}`)) {
                    Status(`${toStr(amount, 2)} ${token.currency}`, `token${token.currency}`);
                    continue;
                }
                if (amount == 0) continue;
                let slide = document.createElement('div');
                slide.className = 'swiper-slide rounded swiper-shadow py-1 px-3 d-flex';
                swiper.appendChild(slide);
                let text = document.createElement('div');
                text.className = (token.currency == 'WAX' ? 'swiper-text text-success' : 'swiper-text') + ` token${token.currency}`;
                text.textContent = `${toStr(amount, 2)} ${token.currency}`;
                slide.appendChild(text);
                // <i data-feather='' class='mr-50 font-medium-3'></i>
            } catch (error) {
                console.log(`#W6: ${error.message}`);
            }
        };
        var swiperLength = $('.swiper-slide').length;
        if (swiperLength) {
            swiperLength = Math.floor(swiperLength / 2);
        }
        var mySwiperOpt = new Swiper('.swiper-centered-slides-2', {
            slidesPerView: 'auto',
            initialSlide: swiperLength,
            centeredSlides: true,
            spaceBetween: 10,
            slideToClickedSlide: true
        });
    } catch (error) {
        console.log(`#6: ${error.message}`);
    }
    return data['tokens'].balances;
};
function rarityColor(rarity) {
    return {
        mythic: 'badge-light-danger',
        mythical: 'badge-light-danger',
        legendary: 'badge-light-warning',
        epic: 'badge-light-primary',
        rare: 'badge-light-info',
        uncommon: 'badge-light-success',
        common: 'badge-light-secondary',
        abundant: 'badge-light-dark'
    }[(rarity ?? '').toLowerCase()] ?? '';
};
// document.getElementById('tokenTLM').onclick = async function() {
//     onChangeSwap(await getPriceSwap(0, 0));
// };
// document.getElementById('waxToken').onclick = async function() {
//     onChangeSwap(await getPriceSwap(0, 0));
// };
// document.getElementById('tlmToWAX').onclick = async function() {
//     if(Number(document.getElementById('fromTLM').value) > 0) {
//         loopAccount(account);
//         await sleep(1000);
//         while(true) {
//             onChangeSwap(await getPriceSwap(0, 0));
//             if(await swap('alien.worlds', document.getElementById('fromTLM').value + ' TLM', document.getElementById('toWAX').value + ' WAX@eosio.token')) {
//                 document.getElementById('autoSwapTLM').checked = false;
//                 break;
//             } else if(document.getElementById('autoSwapTLM').checked) await sleep(5000);
//             else break;
//         }
//     } else toastr.warning('Bạn chưa nhập số lưng Token.', 'Alcor Exchange');
// };
// document.getElementById('waxToTLM').onclick = async function() {
//     if(Number(document.getElementById('amountWAX').value) > 0) {
//         loopAccount(account);
//         await sleep(1000);
//         while(true) {
//             onChangeSwap(await getPriceSwap(0, 0));
//             if(await swap('eosio.token', document.getElementById('amountWAX').value + ' WAX', document.getElementById('amountTLM').value + ' TLM@alien.worlds')) {
//                 document.getElementById('autoSwapWAX').checked = false;
//                 break;
//             } else if(document.getElementById('autoSwapWAX').checked) await sleep(5000);
//             else break;
//         }
//     } else toastr.warning('Bn chưa nhập số lượng Token.', 'Alcor Exchange');
// };
// END: View

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
const fetchTLM = async (user) => {
    let api_index = getRandom(0, v1.length)
    let tries = 0
    let result = null
    while (tries < 3) {
        //console.log('TRY ',tries)
        await axios.post(`${v1[api_index % v1.length]}/v1/chain/get_currency_balance`,
            {
                'code': 'alien.worlds',
                'account': user,
                'symbol': 'TLM'
            })
            .then((resp) => {
                if (resp && resp.data) {
                    result = resp.data
                }
            })
            .catch((err) => {
                //console.log(err)
                tries++
                api_index++
            })
        if (result != null) {
            break;
        }
    }
    if (!result) {
        await axios.get(`https://api.alienworlds.fun/get_tlm/${user}`)
            .then((resp) => {
                if (resp && resp.data) {
                    result = resp.data
                }
            })
            .catch((err) => {
                if (err.response) {
                    //console.log(err.response)
                } else {
                    //console.log(err.message)
                }
            })
    }
    if (result && result.length > 0) {
        ////console.log(result)
        //setBalance(result[0].slice(0, -4))
        return result[0].slice(0, -4);
    }
}
const fetchAccountData = async (user) => {
    let api_index = getRandom(0, v1.length)
    let tries = 0
    let result = null
    while (tries < 3) {
        //console.log('TRY ',tries)
        await axios.post(`${v1[api_index % v1.length]}/v1/chain/get_account`,
            {
                'account_name': user
            })
            .then((resp) => {
                if (resp && resp.data) {
                    result = resp.data
                }
            })
            .catch((err) => {
                //console.log(err)
                tries++
                api_index++
            })
        if (result != null) {
            break;
        }
    }
    if (!result) {
        await axios.get(`https://api.alienworlds.fun/get_account/${user}`)
            .then((resp) => {
                if (resp && resp.data) {
                    result = resp.data
                }
            })
            .catch((err) => {
                if (err.response) {
                    //console.log(err.response)
                } else {
                    //console.log(err.message)
                }
            })
    }
    if (result) {
        //console.log('Setting data')
        //console.log(result)
        var ret = {};
        const newCpuState = {
            ...result.cpu_limit,
            cpu_weight: result.total_resources.cpu_weight
        }
        //setAccInfo(newCpuState)
        ret.newCpuState = newCpuState;
        //console.log(result.core_liquid_balance)
        if (result.core_liquid_balance) {
            //setWax(result.core_liquid_balance.slice(0, -4))
            ret.wax = result.core_liquid_balance.slice(0, -4);
        } else {
            //setWax('N/A')
            ret.wax = 'N/A';
        }
        return ret;
    }
}
const getMinerName = async (user) => {
    let api_index = getRandom(0, v1.length)
    let tries = 0
    let result = null
    while (tries < 3) {
        //console.log('TRY ',tries)
        await axios.post(`${v1[api_index % v1.length]}/v1/chain/get_table_rows`,
            { json: true, code: 'federation', scope: 'federation', table: 'players', lower_bound: user, upper_bound: user })
            .then((resp) => {
                if (resp && resp.data) {
                    result = resp.data
                }
            })
            .catch((err) => {
                //console.log(err)
                tries++
                api_index++
            })
        if (result != null) {
            break;
        }
    }
    if (!result) {
        await axios.get(`https://api.alienworlds.fun/get_tag/${user}`)
            .then((resp) => {
                if (resp && resp.data) {
                    result = resp.data
                }
            })
            .catch((err) => {
                if (err.response) {
                    //console.log(err.response)
                } else {
                    //console.log(err.message)
                }
            })
    }
    if (result.rows.length < 1) {
        alert(`${user} is not alien worlds account, please check your spelling!`)
        onDelete(acc)
        return
    }
    if (result) {
        //console.log('Setting Tag data')
        //console.log(result)
        //setMinerName(result.rows[0].tag)
        return result.rows[0].tag;
    }
}
const getLastMineInfo = async (user) => {
    let api_index = getRandom(0, v1.length)
    let tries = 0
    let result = null
    while (tries < 3) {
        //console.log('TRY ',tries)
        await axios.post(`${v1[api_index % v1.length]}/v1/chain/get_table_rows`,
            { json: true, code: 'm.federation', scope: 'm.federation', table: 'miners', lower_bound: user, upper_bound: user })
            .then((resp) => {
                if (resp && resp.data) {
                    result = resp.data
                }
            })
            .catch((err) => {
                //console.log(err)
                tries++
                api_index++
            })
        if (result != null) {
            break;
        }
    }
    if (!result) {
        await axios.get(`https://api.alienworlds.fun/get_lastmine/${user}`)
            .then((resp) => {
                if (resp && resp.data) {
                    result = resp.data
                }
            })
            .catch((err) => {
                if (err.response) {
                    //console.log(err.response)
                } else {
                    //console.log(err.message)
                }
            })
    }
    if (result.rows.length < 1) {
        return
    }
    if (result) {
        //console.log('Setting Lastmine data')
        //console.log(result)
        const lastMineString = result.rows[0].last_mine != 'None' ? luxon.DateTime.fromISO(result.rows[0].last_mine + 'Z').setZone('local').toRelative() : 'Error'
        const newLastMine = {
            last_mine: lastMineString,
            last_mine_tx: result.rows[0].last_mine_tx,
            currentLand: result.rows[0].current_land
        }
        //setLastMine(newLastMine)
        return { newLastMine };
    }
}
var his = [];
const fetchLastMineTx = async (tx, user) => {
    let api_index = getRandom(0, tx_api.length)
    let tries = 0
    let result = null
    while (tries < 3) {
        //console.log('TRY ',tries)
        await axios.post(`${tx_api[api_index % tx_api.length]}/v1/history/get_transaction`,
            {
                id: tx
            })
            .then((resp) => {
                if (resp && resp.data) {
                    ////console.log(resp.data)
                    if (tx_api[api_index % tx_api.length] == 'https://wax.greymass.com/v1/history/get_transaction') {
                        result = {
                            mined: parseFloat(resp.data.traces[1].act.data.quantity.slice(0, -4))
                        }
                    } else {
                        result = { mined: resp.data.traces[1].act.data.amount }
                    }
                }
            })
            .catch((err) => {
                //console.log(err)
                tries++
                api_index++
            })
        if (result != null) {
            break;
        }
    }
    if (!result) {
        // Try v2
        tries = 0
        api_index = getRandom(0, tx_api_v2.length)
        while (tries < 3) {
            //console.log('TRY ',tries)
            await axios.get(`${tx_api_v2[api_index % tx_api_v2.length]}/v2/history/get_transaction?id=${tx}`)
                .then((resp) => {
                    if (resp && resp.data) {
                        result = { mined: resp.data.actions[1].act.data.amount }
                    }
                })
                .catch((err) => {
                    //console.log(err)
                    tries++
                    api_index++
                })
            if (result != null) {
                break;
            }
        }
    }
    if (!result) {
        await axios.get(`https://api.alienworlds.fun/get_tx/${user}`)
            .then((resp) => {
                if (resp && resp.data) {
                    result = resp.data
                }
            })
            .catch((err) => {
                if (err.response) {
                    //console.log(err.response)
                } else {
                    //console.log(err.message)
                }
            })
    }
    if (result && result.mined) {
        //console.log('Setting TX data')
        //console.log(result)
        const newHistory = [...his]
        if (newHistory.length == 5) {
            newHistory.shift() //remove first member
        }
        if (his.length === 0 || his.pop().tx !== tx) {
            newHistory.push({
                tx: tx,
                amount: result.mined + ' TLM'
            })
            //setHistory(newHistory)
            return newHistory;
        }
    }
}
const checkNFT = async (user) => {
    let api_index = getRandom(0, v1.length)
    let tries = 0
    let result = null
    while (tries < 3) {
        //console.log('TRY ',tries)
        await axios.post(`${v1[api_index % v1.length]}/v1/chain/get_table_rows`,
            { json: true, code: 'm.federation', scope: 'm.federation', table: 'claims', lower_bound: user, upper_bound: user })
            .then((resp) => {
                if (resp && resp.data) {
                    result = resp.data
                }
            })
            .catch((err) => {
                //console.log(err)
                tries++
                api_index++
            })
        if (result != null) {
            break;
        }
    }
    if (!result) {
        await axios.get(`https://api.alienworlds.fun/check_nft/${user}`)
            .then((resp) => {
                if (resp && resp.data) {
                    result = resp.data
                }
            })
            .catch((err) => {
                if (err.response) {
                    //console.log(err.response)
                } else {
                    //console.log(err.message)
                }
            })
    }
    if (result.rows.length < 1) {
        //setNft([])
        return [];
    }
    if (result) {
        //console.log('Setting NFT data')
        //console.log(result)
        //setNft([...result.rows[0].template_ids])
        return [...result.rows[0].template_ids]
    }
}
const fetchTLMPrice = async () => {
    return axios.get('https://api.binance.com/api/v3/avgPrice?symbol=TLMUSDT')
        .then(({ data }) => {
            return data.price
        })
        .catch((err) => {
            // console.log('ERROR: cannot get TLM market price')
            // console.log(err)
            return 0
        })
}
const fetchWAXPrice = async () => {
    return axios.get('https://api.huobi.pro/market/detail?symbol=waxpusdt')
        .then(({ data }) => {
            return data.tick.close
        })
        .catch((err) => {
            // console.log('ERROR: cannot get WAX market price')
            // console.log(err)
            return 0
        })
}
