const vivucoin = 'VIVUCoin',

    game = 'Farmers World',

    fwg = 'FWG',

    fww = 'FWW',

    fwf = 'FWF',

    gold = 'GOLD',

    wood = 'WOOD',

    food = 'FOOD';

var auto = false,

    first = true,

    reload = false,

    running = false,

    success = true;

var x = location.hostname;

var successCount = 0,

    errorCount = 0;

var startTime = Date.now();

window.addEventListener('load', async function () {

    getConfig();

    if (webDriver("auto").checked) start();

    webDriver("login").onclick = async function () {

        if (running) {

            Status('Bot Running');

            toastr.warning('Bot Running', vivucoin);

            return;

        }

        auto = true;

        start();

    };

    webDriver("auto").onclick = async function () {

        setConfig('config');

        if (webDriver("auto").checked) {

            auto = true;

            start();

        }

    };

    $(".close, .cancel, .overlay-bg").on("click", function () {

        $(".dashboard").removeClass("show")

        webDriver('dashboard', className).style = "display: none;";

        $(".overlay-bg").removeClass("show")

    })

    $('.settings').on("click", function (e) {

        clearActive();

        e.stopPropagation();

        $(".dashboard").addClass("show");

        webDriver('dashboard', className).style = "display: block;";

        $(".overlay-bg").addClass("show");

    });

    webDriver("withdraw-tab").onclick = async function () {

        clearActive();

    };

    webDriver("deposit-tab").onclick = async function () {

        clearActive();

    };

    function clearActive() {

        webDriver("config-tab").className = "btn btn-outline-primary";

        webDriver("withdraw-tab").className = "dropdown-item";

        webDriver("deposit-tab").className = "dropdown-item";

    }

    webDriver("resetConfig").onclick = async function () {

        if (setConfig('config', true)) {

            getConfig('config');

            toastr.success('Reset Success', vivucoin);

        } else toastr.warning('Reset Failded', vivucoin);

    };

    webDriver("saveConfig").onclick = async function () {

        if (setConfig('config')) {

            toastr.success('Save Success', vivucoin);

        } else toastr.warning('Save Failded', vivucoin);

    };

    webDriver("resetWithdraw").onclick = async function () {

        if (setConfig('withdraw', true)) {

            getConfig('withdraw');

            toastr.success('Reset Success', vivucoin);

        } else toastr.warning('Reset Failded', vivucoin);

    }

    $(".withdraw").on("click", function () {

        checkWithdraw(true);

    });

    webDriver("saveWithdraw").onclick = async function () {

        if (setConfig('withdraw')) toastr.success('Save Success', vivucoin);

        else toastr.warning('Save Failded', vivucoin);

    };

    webDriver("resetDeposit").onclick = async function () {

        if (setConfig('deposit', true)) {

            getConfig('deposit');

            toastr.success('Reset Success', vivucoin);

        } else toastr.warning('Reset Failded', vivucoin);

    }

    webDriver("deposit").onclick = async function () {

        checkDeposit(true);

    }

    webDriver("saveDeposit").onclick = async function () {

        if (setConfig('deposit')) toastr.success('Save Success', vivucoin);

        else toastr.warning('Save Failded', vivucoin);

    };

})

function getConfig(action = 'all') {

    try {

        data['cpuLoop'] = true;

        try {

            if (action == 'all' || action == 'config') {

                let config = window.localStorage.getItem('config');

                if (!config) {

                    setConfig('config', true)

                    config = window.localStorage.getItem('config');

                };

                config = JSON.parse(config);

                webDriver('auto').checked = config?.auto ?? false;

                webDriver('delay', className).value = config?.delay ?? 30;

                webDriver('cpuCheck', className).value = config?.cpuCheck ?? 100;

                webDriver("amountEnergy").value = config?.recover?.amount ?? 50;

                webDriver('recover').checked = config?.recover?.auto ?? true;

                webDriver('amountRepair').value = config?.repair?.amount ?? 10;

                webDriver("repair").checked = config?.repair?.auto ?? true;

            }

        } catch (error) {

            localStorage.removeItem('config');

            console.log(`#F01.1: ${error.message}`);

        }

        try {

            if (action == 'all' || action == 'withdraw') {

                let withdraw = window.localStorage.getItem('withdraw');

                if (!withdraw) {

                    setConfig('withdraw', true)

                    config = window.localStorage.getItem('withdraw');

                };

                withdraw = JSON.parse(withdraw);

                webDriver('numFee').value = withdraw?.fee ?? 5;

                webDriver('minWithdraw').value = withdraw?.min ?? 50;

                webDriver('withdrawGold').checked = withdraw?.gold?.auto ?? false;

                webDriver('amountGold').value = withdraw?.gold?.amount ?? 0;

                webDriver('withdrawWood').checked = withdraw?.wood?.auto ?? false;

                webDriver('amountWood').value = withdraw?.wood?.amount ?? 0;

                webDriver('withdrawFood').checked = withdraw?.food?.auto ?? false;

                webDriver('amountFood').value = withdraw?.food?.amount ?? 0;

            }

        } catch (error) {

            localStorage.removeItem('withdraw');

            console.log(`#F01.2: ${error.message}`);

        }

        try {

            if (action == 'all' || action == 'deposit') {

                let deposit = window.localStorage.getItem('deposit');

                if (!deposit) {

                    setConfig('deposit', true)

                    config = window.localStorage.getItem('deposit');

                };

                deposit = JSON.parse(deposit);

                webDriver('depositFWG').checked = deposit?.fwg?.auto ?? false;

                webDriver('amountFWG').value = deposit?.fwg?.amount ?? 20;

                webDriver('depositFWW').checked = deposit?.fww?.auto ?? false;

                webDriver('amountFWW').value = deposit?.fww?.amount ?? 0;

                webDriver('depositFWF').checked = deposit?.fwf?.auto ?? false;

                webDriver('amountFWF').value = deposit?.fwf?.amount ?? 100;

            }

        } catch (error) {

            localStorage.removeItem('deposit');

            console.log(`#F01.3: ${error.message}`);

        }

        return true;

    } catch (error) {

        localStorage.clear();

        console.log(`#F01: ${error.message}`);

    }

    return false;

}

function setConfig(action = 'all', reset = false) {

    try {

        if (action == 'all' || action == 'config') {

            let config = {

                auto: webDriver("auto").checked,

                delay: reset ? 30 : Number(webDriver('delay', className).value),

                cpuCheck: reset ? 100 : Number(webDriver('cpuCheck', className).value),

                recover: {

                    amount: reset ? 50 : Number(webDriver('amountEnergy').value),

                    auto: reset ? true : webDriver('recover').checked

                },

                repair: {

                    amount: reset ? 10 : Number(webDriver("amountRepair").value),

                    auto: reset ? true : webDriver('repair').checked

                }

            }

            localStorage.setItem('config', JSON.stringify(config));

        }

        if (action == 'all' || action == 'withdraw') {

            let withdraw = {

                fee: reset ? 5 : Number(webDriver('numFee').value),

                min: reset ? 50 : Number(webDriver("minWithdraw").value),

                gold: {

                    amount: reset ? 0 : Number(webDriver('amountGold').value),

                    auto: reset ? false : webDriver('withdrawGold').checked

                },

                wood: {

                    amount: reset ? 0 : Number(webDriver('amountWood').value),

                    auto: reset ? false : webDriver('withdrawWood').checked

                },

                food: {

                    amount: reset ? 0 : Number(webDriver('amountFood').value),

                    auto: reset ? false : webDriver('withdrawFood').checked

                }

            }

            localStorage.setItem('withdraw', JSON.stringify(withdraw));

        }

        if (action == 'all' || action == 'deposit') {

            let deposit = {

                fwg: {

                    amount: reset ? 20 : Number(webDriver('amountFWG').value),

                    auto: reset ? false : webDriver('depositFWG').checked

                },

                fww: {

                    amount: reset ? 0 : Number(webDriver('amountFWW').value),

                    auto: reset ? false : webDriver('depositFWW').checked

                },

                fwf: {

                    amount: reset ? 100 : Number(webDriver('amountFWF').value),

                    auto: reset ? false : webDriver('depositFWF').checked

                }

            }

            localStorage.setItem('deposit', JSON.stringify(deposit));

        }

        return true;

    } catch (error) {

        console.log(`#F02: ${error.message}`);

    }

    return false;

}

async function login(account = wax.userAccount) {

    if (!account) {

        try {

            account = await wax.loginViaEndpoint();

        } catch (error) {

            try {

                account = await wax.login();

            } catch (error) {

                console.log(`#F03: ${error.message}`);

            }

        }

    }

    try {

        if (account) {

            Status('Login Success');

            toastr.success('Login Success', game);

            webDriver("login").className = "btn btn-sm btn-outline-primary waves-effect d-none";

            webDriver("account").value = account;

            webDriver("url-assets").href = `https://wax.atomichub.io/profile/${account}#buyHistory`;

            webDriver("url-inventory").href = `https://wax.atomichub.io/profile/${account}`;

            webDriver("url-bloks").href = `https://wax.bloks.io/account/${account}`;

            webDriver("url-game").href = `https://play.farmersworld.io`;

            webDriver("url-market").href = 'https://wax.atomichub.io/market?collection_name=farmersworld&order=desc&sort=created&symbol=WAX';

            webDriver("url-swap").href = 'https://wax.alcor.exchange/swap?output=WAX-eosio.token&input=FWW-farmerstoken';

        } else {

            Status('Login Failure');

            toastr.warning('Login Failure', game);

        }

    } catch (error) {

        console.log(`#F04: ${error.message}`);

    }

    return account;

}

async function start() {

    if (webDriver("auto").checked) auto = true;

    if (running) return;

    running = true;

    account = await login();

    if (!account) {

        running = false;

        return;

    }

    Status('Bot Started');

    swiperToken(account);

    data['cardAssets'] = data['cardTools'] = await fwCardTools();

    data['cardMemberships'] = await fwCardMembers();

    if (data['cardMemberships'].rows.length > 0) {

        data['cardMemberships'].rows.forEach(function (row) {

            data['cardAssets'].rows.push(row);

        });

    }

    data['lastMine'] = Date.now();

    while (true) {

        await main();

        if (webDriver("auto").checked == false || auto == false || data['stop']) {

            first = true;

            auto = false;

            Status('Bot Stopped');

            toastr.warning('Bot Stopped', vivucoin);

            Status('Reload', 'login');

            webDriver("login").className = "btn btn-sm btn-outline-primary waves-effect";

            break;

        }

        await sleep(1000);

    }

    running = false;

}

async function main() {

    try {

        updateResources();

        await sleep(100);

        checkRecover();

        await sleep(100);

        checkRepair();

        await sleep(100);

        checkMine();

        await sleep(100);

        checkWithdraw();

        await sleep(100);

        onChangeMine();

    } catch (error) {

        console.log(`#F05: ${error.message}`);

    }

}

async function checkMine(asset = data['asset']) {

    try {

        if (!auto || !asset) return;

        if (data['mining'] || (data['charge'] ?? 0) == 0) return;

        if (success == false || data['charge'] == 0 || data['next'] > Date.now() / 1000) return;

        if (asset.current_durability == 0) {

            Status('Durability is zero, need repair to continue.');

            toastr.error('Durability is zero, need repair to continue.', game);

            return;

        }

        data['mining'] = true;

        let card = data['cardMemberships'].rows.filter(function (row) {

            return row.template_id == asset.template_id;

        });

        await loopResources();

        Status(`Claiming`);

        Status('Mining: ', 'statusMine');

        toastr.info('Start mining', game);

        let claim = await fwMine(asset.asset_id, card.length == 0 ? 'claim' : 'mbsclaim');

        let time = await timeMine(true, claim);

        if (claim && time) {

            Status(++successCount, 'fwSuccess');

            await updateResources(true);

            data['lastMine'] = data['timeWithdraw'] = Date.now();

        }

        Status('Next Mine: ', 'statusMine');

    } catch (error) {

        console.log(`#F06: ${error.message}`);

    }

    data['mining'] = false;

}

async function timeMine(flag = false, claim = false) {

    if (!flag && data['mining']) return;

    if (data['next'] > Date.now() / 1000) return true;

    try {

        let delay = Number(webDriver('delay', className).value);

        let time = Date.now() / 1000 + (claim == null ? 0 : claim ? 20 : delay);

        while (true) {

            data['assets'] = await fwTools(account);

            data['members'] = await fwMemberships(account);

            if (data['members'].length > 0) {

                data['members'].forEach(function (member) {

                    data['assets'].push(member);

                });

            }

            if (!data['assets']) return;

            if (data['assets'].length == 0) {

                auto = false;

                return;

            };

            data['asset'] = fwAssetMine(data['assets']);

            data['charge'] = getAssetCharge(data['asset']);

            data['next'] = data['asset'].next_availability;

            if (first) await onChangeSwiper(data['assets']);

            onChangeAssets(data['assets']);

            if (data['next'] > Date.now() / 1000) {

                Status("Next Mine: " + new Date(data['next'] * 1000).toLocaleString());

                break;

            }

            if (first || time < Date.now() / 1000) {

                first = false;

                break;

            }

            Status(`Delay: ${Math.floor(time - Date.now() / 1000)}s`);

            await sleep(3000);

        }

    } catch (error) {

        console.log(`#F07: ${error.message}`);

    }

    return data['next'] > Date.now() / 1000 ? true : false;

}

async function updateResources(now = false) {

    if (!now && (data['next'] > Date.now() / 1000 || data['mining'])) return;

    if (data['next'] <= Date.now() / 1000) await sleep(30000);

    data['waxPrice'] = await waxToUSDT();

    await onChangeResources(await getAccount(account));

    await timeMine()

    await onChangeBalances();

}

async function onChangeResources(res) {

    try {

        Status(toStr(data['waxStaked'] ?? 0, 2) + ' WAX', 'stakedWAX');

        Status(`${data['cpuUsed'] / 1000}ms / ${data['cpuMax'] / 1000}ms`, 'textCPU');

        Status(`${data['cpuChange'] ?? 0}%`, 'progressCPU');

        webDriver("progressCPU").className = data['cpuChange'] > 100 ? "progress-bar bg-danger" : data['cpuChange'] > 95 ? "progress-bar bg-warning" : "progress-bar bg-info";

        $('#progressCPU').css('width', (data['cpuChange'] < 10 ? 10 : data['cpuChange']) + '%');

        Status(`RAM: ${data['ramChange' ?? 0]}%`, 'progressRAM');

        $('#progressRAM').css('width', (data['ramChange'] < 25 ? 25 : data['ramChange']) + '%');

        Status(`NET: ${data['netChange'] ?? 0}%`, 'progressNET');

        $('#progressNET').css('width', (data['netChange'] < 25 ? 25 : data['netChange']) + '%');

    } catch (error) {

        console.log(`#F08: ${error.message}`);

    }

    return data['cpuChange'] < 100;

}

async function onChangeAssets(assets) {

    try {

        if (!assets) return;

        if (assets.length == 0) return;

        let total = 0;

        let assetPrice = await getAssetsPrice(assets);

        assets.forEach(async function (asset) {

            let temp = asset.template_id;

            total += assetPrice[temp].price;

            let card = data['cardMemberships'].rows.filter(function (row) {

                return row.template_id == temp;

            });

            if (card.length == 0) {

                let durability = webDriver(asset.asset_id);

                durability.textContent = "Durability: " + asset.current_durability + " / " + asset.durability;

                durability.className = asset.current_durability > 50 ? "text-info" : asset.current_durability > (webDriver('repair').checked ? Number(webDriver('amountRepair').value) : 10) ? "text-warning" : "text-danger";

            }

            Status(toStr(total, 2) + ' WAX', 'assetsWAX');

            Status(` (${toStr(total * data['waxPrice'], 2)} USDT)`, 'assetsUSDT');

            let count = assetPrice[temp].count;

            count = count == null ? '?' : count >= 99 ? '99+' : count;

            Status(count, 'count-' + asset.asset_id);

            Status(toStr(assetPrice[temp].price, 2) + ' WAX', 'wax-' + asset.asset_id);

            Status(toStr(assetPrice[temp].price * data['waxPrice'], 2) + ' USDT', 'usdt-' + asset.asset_id);

        });

        data['waxFWAssets'] = total;

    } catch (error) {

        console.log(`#F09: ${error.message}`);

    }

}

async function onChangeBalances() {

    try {

        await onChangeInfo(await fwInfo(account));

        data['balances'] = await swiperToken(account);

        data['fwgToWax'] = await getSwapPrice(503, 503);

        data['fwwToWax'] = await getSwapPrice(501, 501);

        data['fwfToWax'] = await getSwapPrice(489, 489);

        data['withdrawFee'] = await fwFee();

        let fwgToken = token(data['balances'], fwg);

        let fwwToken = token(data['balances'], fww);

        let fwfToken = token(data['balances'], fwf);

        data['waxAmount'] = parseFloat(token(data['balances'], 'WAX').amount);

        data['fwgAmount'] = parseFloat(fwgToken.amount);

        data['fwwAmount'] = parseFloat(fwwToken.amount);

        data['fwfAmount'] = parseFloat(fwfToken.amount);

        Status(fwgToken.amount + " " + fwgToken.currency, 'fwgToken');

        Status(fwgToken.amount + " " + fwgToken.currency, 'balanceFWG');

        Status(fwwToken.amount + " " + fwwToken.currency, 'fwwToken');

        Status(fwwToken.amount + " " + fwwToken.currency, 'balanceFWW');

        Status(fwfToken.amount + " " + fwfToken.currency, 'fwfToken');

        Status(fwfToken.amount + " " + fwfToken.currency, 'balanceFWF');



        let changeFee = 1 - data['withdrawFee'] / 100;

        let fwgWAX = (data['goldAmount'] * changeFee + data['fwgAmount']) * data['fwgToWax'];

        let fwwWAX = (data['woodAmount'] * changeFee + data['fwwAmount']) * data['fwwToWax'];

        let fwfWAX = (data['foodAmount'] * changeFee + data['fwfAmount']) * data['fwfToWax'];

        data['totalWAX'] = data['waxAmount'] + (data['waxStaked'] ?? 0) + (data['waxFWAssets'] ?? 0) + fwgWAX + fwwWAX + fwfWAX;

        Status(`${data['waxPrice']} WAX/USDT`, 'waxPrice');

        Status(`Fee: ${data['withdrawFee']}% (Deducted)`, 'withdrawFee');

        Status(`${toStr(data['fwgToWax'], 4)} FWG/WAX`, 'fwgPrice');

        Status(`${toStr(fwgWAX * data['waxPrice'], 2)} USDT`, 'fwgToUSDT');

        Status(`${toStr(data['fwwToWax'], 4)} FWW/WAX`, 'fwwPrice');

        Status(`${toStr(fwwWAX * data['waxPrice'], 2)} USDT`, 'fwwToUSDT');

        Status(`${toStr(data['fwfToWax'], 4)} FWF/WAX`, 'fwfPrice');

        Status(`${toStr(fwfWAX * data['waxPrice'], 2)} USDT`, 'fwfToUSDT');

        Status(`${toStr((fwgWAX + fwwWAX + fwfWAX) * data['waxPrice'], 2)} USDT`, 'fwProfit');

        Status(`${toStr(data['totalWAX'] * data['waxPrice'], 2)} USDT`, 'fwTotal');

    } catch (error) {

        console.log(`#F10: ${error.message}`);

    }

}

async function onChangeInfo(res) {

    try {

        if (!res) return;

        if (res.rows.length == 0) return;

        data['energy'] = res.rows[0].energy;

        data['energyMax'] = res.rows[0].max_energy;

        data['energyChange'] = Math.round((data['energy'] / data['energyMax']) * 100);

        for (var i = 0; i < res.rows[0].balances.length; i++) {

            let value = res.rows[0].balances[i];

            let amount = parseFloat(value?.split(" ")[0] ?? 0);

            if (value.toLowerCase().includes("gold")) {

                data['goldAmount'] = amount;

                Status(value, 'fwGold');

                Status(value, 'balanceGold');

                webDriver("fwGold").className = amount * 5 >= 100 - (data['asset']?.current_durability ?? 10) ? 'text-success' : 'text-danger';

            } else if (value.toLowerCase().includes("wood")) {

                data['woodAmount'] = amount;

                Status(value, 'fwWood');

                Status(value, 'balanceWood');

                webDriver("fwWood").className = amount >= Number(webDriver('amountWood')) ? 'text-success' : 'text-secondary';

            } else if (value.toLowerCase().includes("food")) {

                data['foodAmount'] = amount;

                Status(value, 'fwFood');

                Status(value, 'balanceFood');

                webDriver("fwFood").className = amount >= 0.2 ? 'text-success' : 'text-danger';

            }

        }

        Status(`${data['energy']} / ${data['energyMax']}`, 'textEnergy');

        Status(data['energyChange'] + '%', 'progressEnergy');

        webDriver("progressEnergy").className = data['energyChange'] > 30 ? "progress-bar bg-info" : data['energyChange'] > 20 ? "progress-bar bg-warning" : "progress-bar bg-danger";

        $('#progressEnergy').css('width', (data['energyChange'] < 10 ? 10 : data['energyChange']) + '%');

        if (data['next']) Status('Next Mine: ' + new Date(data['next'] * 1000).toLocaleString());

    } catch (error) {

        console.log(`#F11: ${error.message}`);

    }

}

async function onChangeMine() {

    try {

        if (first) await sleep(3000);

        let assets = data['assets']

        if (!assets) return;

        if (assets.length == 0) return;

        let asset = data['asset'];

        if (asset) {

            let delay = (data['next'] ?? Date.now() / 1000) - Date.now() / 1000;

            let percent = 100 - Math.floor((delay < 0 ? 0 : delay / data['charge']) * 100);

            Status(`${Math.round(delay)}s / ${data['charge'] ?? 0}s`, 'textMine');

            Status(`${moment(data['lastMine']).fromNow()}`, 'textLast');

            Status(asset.current_durability + " / " + asset.durability, 'textDur');

            webDriver("textDur").className = asset.current_durability > 50 ? "text-info" : asset.current_durability > (webDriver('repair').checked ? Number(webDriver('amountRepair').value) : 10) ? "text-warning" : "text-danger";

            Status(`${percent}%`, 'progressMine');

            webDriver("progressMine").className = delay > 0 ? "progress-bar bg-primary" : delay > -600 ? "progress-bar bg-info" : delay > -(data['charge'] ?? 3600) ? "progress-bar bg-warning" : "progress-bar bg-danger";

            $('#progressMine').css('width', percent + '%');

            Status(timeStamp((Date.now() - startTime) / 1000), 'startTime');

        }

        assets.forEach(async function (asset) {

            Status(`Delay: ${timeStamp(Math.round(asset.next_availability - Date.now() / 1000))}`, 'time-' + asset.asset_id);

        });

    } catch (error) {



    }

}

async function checkRecover() {

    try {

        if (!auto) return;

        if (success && webDriver("recover").checked) {

            if (data['isRecover'] || (data['timeRecover'] ?? Date.now()) > Date.now()) return;

            data['isRecover'] = true;

            let fwfAmount = data['fwfAmount'] ?? 0;

            let fwfDeposit = Number(webDriver('amountFWF').value);

            fwfDeposit = fwfDeposit > fwfAmount ? fwfAmount : fwfDeposit;

            let foodAmount = data['foodAmount'] ?? 0;

            let foodRecover = foodAmount + (webDriver("depositFWF").checked ? fwfDeposit : 0);

            let energy = data['energy'] ?? 500;

            if (energy <= Number(webDriver("amountEnergy").value) && foodRecover >= 0.2) {

                Status(`Energy is too low (${data['energy']}).`);

                if (webDriver("depositFWF").checked && fwfDeposit > 0 && foodAmount < foodRecover && foodAmount < 100) {

                    await loopResources();

                    await fwDeposit(0, fwfDeposit, 0);

                    await updateResources(true);

                }

                let energyRecover = energy < 500 ? 500 - energy : 0;

                if (data['foodAmount'] * 5 < energyRecover) energyRecover = data['foodAmount'] * 5;

                if (data['foodAmount'] >= 0.2) {

                    await loopResources();

                    Status('Recovering: ', 'statusEnergy');

                    await fwRecover(energyRecover);

                    Status('Energy: ', 'statusEnergy');

                    await updateResources(true);

                }

            }

            data['timeRecover'] = Date.now() + 60000;

        }

    } catch (error) {

        console.log(`#F12: ${error.message}`);

    }

    data['isRecover'] = false;

}

async function checkRepair(asset = data['asset']) {

    try {

        if (!auto || !asset) return;

        if (success && webDriver("repair").checked) {

            data['timeRepair'] = data['timeRepair'] ?? Date.now();

            if (data['isRepair'] || data['timeRepair'] > Date.now()) return;

            data['isRepair'] = true;



            data['fwgAmount'] = data['fwgAmount'] ?? 0;

            let fwgDeposit = Number(webDriver('amountFWG').value);

            if (fwgDeposit > data['fwgAmount']) fwgDeposit = data['fwgAmount'];

            data['goldAmount'] = data['goldAmount'] ?? 0;

            let goldRepair = data['goldAmount'] + (webDriver("depositFWG").checked ? fwgDeposit : 0);

            let check = nFormat(goldRepair * 5) - (100 - asset.current_durability);

            if ((goldRepair >= 20 && asset.current_durability <= Number(webDriver("amountRepair").value)) || (asset.current_durability < 100 && check <= 2 && check >= 0)) {

                if (webDriver("depositFWG").checked && fwgDeposit > 0 && data['goldAmount'] < goldRepair && data['goldAmount'] < 20) {

                    await loopResources();

                    await fwDeposit(fwgDeposit, 0, 0);

                    await updateResources(true);

                }

                check = nFormat(data['goldAmount'] * 5 - (100 - asset.current_durability));

                if (check > 0) {

                    await loopResources();

                    Status('Repairing: ', 'statusDur');

                    await fwRepair(asset.asset_id);

                    Status('Durability: ', 'statusDur');

                    await updateResources(true);

                }

                else {

                    Status('Not enough gold to repair.');

                }

            }

            data['timeRepair'] = Date.now() + 60000;

        }

    } catch (error) {

        console.log(`#F13: ${error.message}`);

    }

    data['isRepair'] = false;

}

async function checkWithdraw(now = false) {

    if (!auto && !now) return;

    if (!data['isWithdraw']) {

        if (success && (data['timeWithdraw'] ?? Date.now()) > Date.now()) return;

        data['isWithdraw'] = true;

        try {

            if (webDriver("withdrawGold").checked || webDriver("withdrawWood").checked || webDriver("withdrawFood").checked) {

                let gold = data['goldAmount'] - Number(webDriver("amountGold").value);

                let wood = data['woodAmount'] - Number(webDriver("amountWood").value);

                let food = data['foodAmount'] - Number(webDriver("amountFood").value);

                gold = webDriver("withdrawGold").checked ? gold > 0 ? gold : 0 : 0;

                wood = webDriver("withdrawWood").checked ? wood > 0 ? wood : 0 : 0;

                food = webDriver("withdrawFood").checked ? food > 0 ? food : 0 : 0;

                let sum = gold + wood + food;

                if ((!now && sum < Number(webDriver("minWithdraw").value)) || sum == 0) return data['isWithdraw'] = false;

                let fee = await fwFee();

                Status(`Withdraw Fee: ${fee}%`);

                if (now || (fee <= Number(webDriver("numFee").value) && sum >= Number(webDriver("minWithdraw").value))) {

                    await loopResources();

                    if (await fwWithdraw(gold, food, wood, fee)) {

                        await sleep(10000);

                        await onChangeInfo(await fwInfo(account));

                        updateResources(true);

                    }

                }

            }

        } catch (error) {

            console.log(`#F14: ${error.message}`);

        }

        data['isWithdraw'] = false;

        data['timeWithdraw'] = Date.now() + 60000;

    }

}

async function checkDeposit(now = false) {

    try {

        if (now || webDriver("depositFWG").checked || webDriver("depositFWW").checked || webDriver("depositFWF").checked) {

            let gold = Number(webDriver("amountFWG").value);

            let wood = Number(webDriver("amountFWW").value);

            let food = Number(webDriver("amountFWF").value);

            gold = gold > data['amountFWG'] ? data['amountFWG'] : gold;

            wood = wood > data['amountFWW'] ? data['amountFWW'] : wood;

            food = food > data['amountFWF'] ? data['amountFWF'] : food;

            gold = webDriver("depositFWG").checked ? gold : now ? gold : 0;

            wood = webDriver("depositFWW").checked ? wood : now ? wood : 0;

            food = webDriver("depositFWF").checked ? food : now ? food : 0;

            if ((gold + wood + food) > 0) {

                await loopResources();

                if (await fwDeposit(gold, food, wood)) {

                    await sleep(10000);

                    await onChangeInfo(await fwInfo(account));

                    onChangeBalances();

                    return true;

                }

            }

        }

    } catch (error) {

        console.log(`#F15: ${error.message}`);

    }

    return false;

}

function getAssetCharge(asset) {

    try {

        if (!asset) return;

        let card = data['cardAssets'].rows.filter(function (card) {

            return card.template_id == asset.template_id;

        });

        if (card.length == 0) return 0;

        return card[0].charged_time;

    } catch (error) {

        console.log(`#F16: ${error.message}`);

    }

    return 0;

}

async function clickRepair(e = window.event.target) {

    let assetId = e.id;

    if (data[assetId] || e.textContent.endsWith("100/100")) return;

    data[assetId] = true;

    if (data['cpuLoop']) await loopResources();

    toastr.info(`Repairing Asset: ${assetId}`, game);

    if (await fwRepair(assetId)) {

        await sleep(5000);

        onChangeInfo(await fwInfo(account));

        data['assets'] = await fwTools(account);

        await onChangeAssets(data['assets']);

    }

    data[assetId] = false;

}

async function onChangeSwiper(assets) {

    try {

        if (!assets) return;

        if (assets.length == 0) return;

        Status(assets?.length ?? 0, 'assets');

        let swiper = webDriver("swiper-assets", "className");

        for (let asset of assets) {

            try {

                if (eShow(asset.asset_id)) continue;

                let slide = document.createElement("div");

                slide.className = `swiper-slide ${asset.asset_id}`;

                swiper.appendChild(slide);

                let div = document.createElement("div");

                div.className = 'card';

                slide.appendChild(div);

                let header = document.createElement("div");

                header.className = 'card-header pt-50 pb-1';

                div.appendChild(header);

                let left = document.createElement("a");

                left.href = '#';

                left.className = '';

                left.id = asset.asset_id;

                left.setAttribute("data-bs-toggle", 'tooltip');

                left.setAttribute("title", 'Repair asset');

                left.setAttribute("onClick", 'clickRepair()');

                header.appendChild(left);

                let right = document.createElement("span");

                right.className = '';

                right.id = 'time-' + asset.asset_id;

                header.appendChild(right);

                let body = document.createElement("div");

                body.className = 'card-body pt-0 pb-0 mt-0 mb-0';

                div.appendChild(body);

                let row = document.createElement("div");

                row.className = 'd-flex justify-content-between';

                body.appendChild(row);

                let wax = document.createElement("a");

                wax.target = '_blank';

                wax.href = `https://wax.atomichub.io/market?template_id=${asset.template_id}&order=asc&sort=price&symbol=WAX`;

                wax.className = 'badge badge-light-success';

                wax.id = 'wax-' + asset.asset_id;

                wax.setAttribute("data-bs-toggle", 'tooltip');

                wax.setAttribute("title", 'Go to the market');

                row.appendChild(wax);

                let count = document.createElement("span");

                count.className = 'badge badge-light-secondary' + ` count-${asset.asset_id}`;

                count.setAttribute("data-bs-toggle", 'tooltip');

                count.setAttribute("title", 'Sales');

                row.appendChild(count);

                let usdt = document.createElement("a");

                usdt.target = '_blank';

                usdt.href = `https://wax.atomichub.io/explorer/asset/${asset.asset_id}`;

                usdt.className = 'badge badge-light-primary';

                usdt.id = 'usdt-' + asset.asset_id;

                usdt.setAttribute("data-bs-toggle", 'tooltip');

                usdt.setAttribute("title", 'Asset details');

                row.appendChild(usdt);

                try {

                    let card = data['cardAssets'].rows.filter(function (row) {

                        return row.template_id == asset.template_id;

                    });

                    let img = document.createElement("img");

                    img.className = 'card-img-bottom';

                    img.src = "https://mypinata.cloud/ipfs/" + card[0].img;

                    img.alt = 'Tool';

                    div.appendChild(img);

                } catch (error) {

                    console.log(`#F17: ${error.message}`);

                }

            } catch (error) {

                console.log(`#F18: ${error.message}`);

            }

        };

        let mySwiper = new Swiper('.swiper-coverflow', {

            effect: 'coverflow',

            grabCursor: false,

            centeredSlides: true,

            slidesPerView: 'auto',

            coverflowEffect: {

                rotate: 50,

                stretch: 1,

                depth: 100,

                modifier: 1,

                slideShadows: true

            },

            pagination: {

                el: '.swiper-pagination'

            }

        });

    } catch (error) {

        console.log(`#F19: ${error.message}`);

    }

}

toastr.options = {

    closeButton: true,

    newestOnTop: false,

    progressBar: true,

    positionClass: "toast-bottom-right",

    preventDuplicates: false,

    onclick: null,

    showDuration: "300",

    hideDuration: "1000",

    timeOut: "5000",

    extendedTimeOut: "1000",

    showEasing: "swing",

    hideEasing: "linear",

    showMethod: "fadeIn",

    hideMethod: "fadeOut"

};