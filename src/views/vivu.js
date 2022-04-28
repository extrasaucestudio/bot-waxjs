async function server_login() {
    try {
        account = await wax.login();
        // unityInstance.SendMessage('Controller', 'Server_Response_LoginData', userAccount);
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', readError(error.message));
    }
}

async function onGameLoaded() {
    try {
        gameLoaded = true;
        var platform = 'desktop';
        if (UnityLoader.SystemInfo.mobile) platform = 'mobile';
        // unityInstance.SendMessage('Controller', 'Server_Response_SetPlatformData', platform);
        // unityInstance.SendMessage('Controller', 'Server_Response_SetCardHash', hashStr);
        setInterval(checkScreenResolution, 1000);
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

function checkScreenResolution() {
    Resize();
}

async function agreeterms() {
    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'federation',
                name: 'agreeterms',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                data: {
                    account: wax.userAccount,
                    terms_id: 1,
                    terms_hash: 'e2e07b7d7ece0d5f95d0144b5886ff74272c9873d7dbbc79bc56f047098e43ad',
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 1200,
        });
        document.getElementById('status').innerHTML = "Agreeterms Success";
        document.getElementById('response').textContent = JSON.stringify(result, null, 2);
        toastr.success('Success', 'WAX Wallet');
    } catch (err) {
        document.getElementById('status').innerHTML = err.message;
        toastr.warning(err.message, 'WAX Wallet');
    }
}

async function server_agreeTerms(account, terms_id, terms_hash) {
    try {
        await agreeTerms(federation_account, account, terms_id, terms_hash, wax.api);
        // unityInstance.SendMessage('Controller', 'Server_Response_AgreeTerms', JSON.stringify({ terms_id: terms_id }));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_agreedTermsVersion(account) {
    try {
        var terms_id = await agreedTermsVersion(federation_account, account, wax.api.rpc);
        // unityInstance.SendMessage('Controller', 'Server_Response_AgreedTermsVersion', JSON.stringify({ terms_id: terms_id }));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function SetAvatar(account) {
    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'federation',
                name: 'setavatar',
                authorization: [{
                    actor: account,
                    permission: 'active',
                }],
                data: {
                    account: account,
                    avatar_id: 1,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 1200,
        });
        document.getElementById('status').innerHTML = "Set Avatar Success";
        toastr.success('Success', 'WAX Wallet');
    } catch (err) {
        document.getElementById('status').innerHTML = err.message;
        toastr.warning(err.message, 'WAX Wallet');
    }
}

async function SetTag(account, tag) {
    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'federation',
                name: 'settag',
                authorization: [{
                    actor: account,
                    permission: 'active',
                }],
                data: {
                    account: account,
                    tag: tag,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 1200,
        });
        document.getElementById('status').innerHTML = "Set Tag Success";
        toastr.success('Success', 'WAX Wallet');
    } catch (err) {
        document.getElementById('status').innerHTML = err.message;
        toastr.warning(err.message, 'WAX Wallet');
    }
}

async function server_setPlayerData(account, avatar_id, tag) {
    try {
        await setPlayerData(federation_account, account, wax.api, tag, avatar_id);
        // unityInstance.SendMessage('Controller', 'Server_Response_SetPlayerData', JSON.stringify({ tag: tag, avatar_id: avatar_id }));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_setTagData(account, tag) {
    try {
        await setTagData(federation_account, account, wax.api, tag);
        // unityInstance.SendMessage('Controller', 'Server_Response_SetTagData', JSON.stringify({ tag: tag }));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_getPlayerData(account) {
    try {
        var data = await getPlayerData(federation_account, account, wax.api.rpc, api_endpoints);
        // unityInstance.SendMessage('Controller', 'Server_Response_GetPlayerData', JSON.stringify(data));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function VSetLand() {
    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'm.federation',
                name: 'setland',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                data: {
                    account: wax.userAccount,
                    land_id: document.getElementById("setland").value,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 1200,
        });
        document.getElementById('status').innerHTML = "Set Land Success";
        document.getElementById('response').textContent = JSON.stringify(result, null, 2);
        toastr.success('Success', 'WAX Wallet');
    } catch (err) {
        document.getElementById('status').innerHTML = err.message;
        toastr.warning(err.message, 'WAX Wallet');
    }
}

async function server_setLand(account, land_id) {
    try {
        await setLand(mining_account, account, land_id, wax.api);
        // unityInstance.SendMessage('Controller', 'Server_Response_SetLand', land_id);
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_getLand(account) {
    try {
        var data = await getLand(mining_account, account, wax.api.rpc, api_endpoints);
        // unityInstance.SendMessage('Controller', 'Server_Response_GetLand', JSON.stringify(data));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_getAssetById(land_id) {
    try {
        var data = await getAssetById(land_id, api_endpoints, wax.api.rpc);
        // unityInstance.SendMessage('Controller', 'Server_Response_GetLandById', JSON.stringify(data));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_getLandById(land_id) {
    try {
        var data = await getAssetById(land_id, api_endpoints, wax.api.rpc);
        // unityInstance.SendMessage('Controller', 'Server_Response_GetLandById', JSON.stringify(data));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_getMap(planet_name) {
    try {
        var mapData = await getMap(federation_account, planet_name, wax.api);
        var map = [];
        for (var i = 0; i < 800; ++i) {
            map.push('');
        }
        mapData.forEach((elem, column) => {
            elem.forEach((land_id, row) => {
                var index = (row - 1) * 40 + (column - 1);
                map[index] = land_id;
            });
        });
        // unityInstance.SendMessage('Controller', 'Server_Response_GetMap', JSON.stringify({ planet: planet_name, map: map }));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_getPlanets() {
    try {
        var data = await getPlanets(federation_account, mining_account, wax.api.rpc);
        // unityInstance.SendMessage('Controller', 'Server_Response_GetPlanets', JSON.stringify(data));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function claimNFTs(account, miner) {
    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'm.federation',
                name: 'claimnfts',
                authorization: [{
                    actor: account,
                    permission: 'active',
                }],
                data: {
                    miner: miner
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 1200,
        });
        aw.status.mess = "Claim NFTs Success";
        toastr.success(aw.status.mess, 'WAX Wallet');
    } catch (err) {
        aw.status.mess = err.message;
        toastr.warning(err.message, 'WAX Wallet');
    }
}

async function server_setBag(account, bag) {
    try {
        var items = JSON.parse(bag).items;
        if (items === undefined) throw new Error('missing items');
        if (items.length < 1 || items.length > 3) throw new Error('bag size must be [1-3]');
        await setBag(mining_account, account, items, wax.api);
        // unityInstance.SendMessage('Controller', 'Server_Response_SetBag', bag);
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function SetBag() {
    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'm.federation',
                name: 'setbag',
                authorization: [{
                    actor: aw.wallet,
                    permission: 'active',
                }],
                data: {
                    account: aw.wallet,
                    items: aw.bag.items,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 1200,
        });
        document.getElementById('status').innerHTML = "Set Bag Success";
        toastr.success('Success', 'WAX Wallet');
    } catch (err) {
        document.getElementById('status').innerHTML = err.message;
        toastr.warning(err.message, 'WAX Wallet');
    }
}

async function server_getBag(account) {
    try {
        var data = await getBag(mining_account, account, wax.api.rpc, api_endpoints);
        // unityInstance.SendMessage('Controller', 'Server_Response_GetBag', JSON.stringify(data));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

const getMineDelay = async function (account) {
    try {
        aw.bag.res = await getBag(mining_account, account, wax.api.rpc, api_endpoints);
        aw.land.res = await getLand(mining_account, account, wax.api.rpc, api_endpoints);
        const params = getBagMiningParams(aw.bag.res);
        const land_params = getLandMiningParams(aw.land.res);
        params.delay *= land_params.delay / 10;
        params.difficulty += land_params.difficulty;
        var minedelay = await getNextMineDelay(mining_account, account, params, wax.api.rpc);

        aw.mine.next = minedelay;
        aw.mine.charge = params.delay;
        aw.mine.diff.bag = params.difficulty;
        aw.mine.diff.land = land_params;

        return minedelay;
    } catch (error) {
        return error;
    }
};

async function server_getMineDelay(account) {
    try {
        const minedelay = await getMineDelay(account);
        // unityInstance.SendMessage('Controller', 'Server_Response_GetMineDelay', minedelay.toString());
        return minedelay;
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

const getBagDifficulty = async function (account) {
    try {
        const bag = await getBag(mining_account, account, wax.api.rpc, api_endpoints);
        const params = getBagMiningParams(bag);
        return params.difficulty;
    } catch (error) {
        return error;
    }
};

const getLandDifficulty = async function (account) {
    try {
        const land = await getLand(mining_account, account, wax.api.rpc, api_endpoints);
        const params = getLandMiningParams(land);
        return params.difficulty;
    } catch (error) {
        return error;
    }
};

const background_mine = async (account) => {
    return new Promise(async (resolve, reject) => {
        const bagDifficulty = await getBagDifficulty(account);
        const landDifficulty = await getLandDifficulty(account);
        const difficulty = bagDifficulty + landDifficulty;
        // console.log('difficulty', difficulty);
        // console.log('start doWork = ' + Date.now());
        const last_mine_tx = await lastMineTx(mining_account, account, wax.api.rpc);
        doWorkWorker({
            mining_account,
            account,
            difficulty,
            last_mine_tx
        }).then((mine_work) => {
            // console.log('end doWork = ' + Date.now());
            resolve(mine_work);
        });
    });
};

async function server_getAccount(account) {
    try {
        var res = await $.ajax({
            type: "POST",
            url: "https://wax.eu.eosamsterdam.net/v1/chain/get_account",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            data: JSON.stringify({
                account_name: account
            }),
            success: function (res) {

            },
            error: function (error) {

            }
        });
    } catch (error) {

    }
    return res;
}

async function getTag() {
    $.ajax({
        type: "POST",
        url: "https://wax.eu.eosamsterdam.net/v1/chain/get_account",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            json: true,
            code: "",
            scope: "",
            table: "players",
            lower_bound: "xa1uc.wam",
            upper_bound: "xa1uc.wam"
        }),
        success: function (res) {
            document.getElementById('status').innerHTML = res;
            toastr.success('Success', 'Rest API');
        },
        error: function (err) {
            toastr.warning(err.message, 'Rest API');
        }
    });
}

async function server_getTransaction(account) {
    aw.mine.lancuoi.res = await getTransaction(account);
}

async function server_getTransaction2(account, tx) {
    tx = strTrue(tx) ? tx : await lastMineTx(mining_account, account, wax.api.rpc);
    let i = Random(0, apiClaim.length)
    const url = `${apiClaim[i]}/v2/history/get_transaction?id=${tx}`
    aw.mine.lancuoi.res = await Get(url);
}

async function getTransaction(account, tx) {
    if (strFalse(tx))
        tx = await lastMineTx(mining_account, account, wax.api.rpc);
    var res = await $.ajax({
        type: "POST",
        url: "https://wax.greymass.com/v1/history/get_transaction",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        data: JSON.stringify({
            id: tx,
            block_num_hint: 0
        }),
        success: function (res) {

        },
        error: function (error) {

        }
    });
    return res;
}

async function awLastMine(account) {
    await getLastMine(account)
        .then(res => {
            aw.mine.lancuoi.time = res?.rows[0]?.last_mine;
            aw.mine.lancuoi.tx = res?.rows[0]?.last_mine_tx;

            getTransaction5(aw.mine.lancuoi.tx)
                .then(res => {
                    aw.mine.lancuoi.res = res;
                    console.log(res);
                });
        });
}

async function getLastMine(account) {
    const res = await fetch("https://wax.greymass.com/v1/chain/get_table_rows", {
        "body": "{\"json\":true,\"code\":\"m.federation\",\"scope\":\"m.federation\",\"table\":\"miners\",\"lower_bound\":\"" + account + "\",\"upper_bound\":\"" + account + "\",\"index_position\":1,\"key_type\":\"\",\"limit\":10,\"reverse\":false,\"show_payer\":false}",
        "method": "POST"
    });
    return res.json();
}

async function getTransaction5(tx) {
    const res = await fetch("https://wax.greymass.com/v1/history/get_transaction", { "body": "{\"id\":\"" + tx + "\",\"block_num_hint\":0}", "method": "POST" });
    return res.json();
}

fetch("https://wax.greymass.com/v1/history/get_transaction", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "text/plain;charset=UTF-8",
        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
    },
    "referrer": "https://wax.bloks.io/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"id\":\"73945753189136c258b6a7e75071240963f12ba263f1d2f951518ff813420ce9\",\"block_num_hint\":0}",
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
});

async function server_getTLM(account) {
    try {
        let i = Random(0, base_api.length)
        const url = `${base_api[i]}/v1/chain/get_currency_balance`
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            data: JSON.stringify({
                code: "alien.worlds",
                account: account,
                symbol: "TLM"
            }),
            success: function (res) {
                aw.acc.tlm = Number(res[0].replace('TLM', ''));
                return res;
            },
            error: function (err) {
                return err;
            }
        });
    } catch (error) {
        toastr.warning(error.message, 'Rest API');
    }
}

async function checkNFTs(account) {
    let i = Random(0, base_api.length)
    const url = `${base_api[index]}/v1/chain/get_table_rows`
    let data = { json: true, code: "m.federation", scope: "m.federation", table: 'claims', lower_bound: account, upper_bound: account };
    let res = await $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        data: JSON.stringify(data),
        success: function (res) {

        },
        error: function (error) {

        }
    });
    return res;
}

async function fetchTLMPrice(exchange) {
    const url = exchange == "huobi" ? "https://api.huobi.pro/market/detail?symbol=waxpusdt'" : "";
    Get(url)
        .then(({ res }) => {
            console.log(res);
            return res.tick.close;
        })
        .catch((err) => {
            return 0;
        })
}

async function fetchWAXPrice(exchange) {
    const url = exchange == "binance" ? "https://api.binance.com/api/v3/avgPrice?symbol=TLMUSDT" : "";
    Get(url).then((res) => {
        console.log(res);
        return res.price;
    });
}

async function fetchSwapPrice() {
    const url = 'https://wax.greymass.com/v1/chain/get_table_rows';
    const data = { json: true, code: "alcorammswap", scope: "alcorammswap", table: "pairs", lower_bound: 0, upper_bound: 0, index_position: 1, key_type: "", limit: 1, reverse: false, show_payer: false };
    var res = await Post(url);
    return res;
}

async function Earned(account, date) {
    try {
        var dt = new Date();
        var month = (dt.getMonth() + 1).toString().padStart(2, "0");
        var from = dt.getFullYear() + "-" + month + "-" + (dt.getDate() + date - 1).toString().padStart(2, "0") + "T17:00:00.000Z";
        var to = date == 0 ? dt.toISOString() : dt.getFullYear() + "-" + month + "-" + (dt.getDate() + date).toString().padStart(2, "0") + "T16:59:59.999Z";
        let i = Random(0, apiEarned.length)
        const url = `${apiEarned[i]}/v2/history/get_actions?account=`
        var res = await $.ajax({
            type: "GET",
            url: url + account + "&skip=0&limit=400&sort=desc&transfer.to=" + account + "&transfer.from=m.federation&after=" + from + "&before=" + to,
            dataType: "json",
            success: function (res) {
                Status2("Get Data Success", "TLM Earned");
            },
            error: function (error) {
                Status2(error.message, "TLM Earned", "warning");
            }
        });
    } catch (error) {
        Status2(error.message, "TLM Earned", "danger");
    }
    return res;
}

async function EarnedByDate(account, date) {
    try {
        var d = new Date(date);
        var from = d.toISOString();
        d.setDate(d.getDate() + 1);
        var to = d.toISOString();
        let i = Random(0, apiEarned.length)
        const url = `${apiEarned[i]}/v2/history/get_actions?account=`
        var res = await $.ajax({
            type: "GET",
            url: url + account + "&skip=0&limit=400&sort=desc&transfer.to=" + account + "&transfer.from=m.federation&after=" + from + "&before=" + to,
            dataType: "json",
            success: function (res) {
                Status2("Get Data Success", "TLM Earned");
            },
            error: function (error) {
                Status2(error.message, "TLM Earned", "warning");
            }
        });
    } catch (error) {
        Status2(error.message, "TLM Earned", "danger");
    }
    return res;
}

async function getTools(account) {
    try {
        $.ajax({
            type: "GET",
            url: "https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=" + account + "&collection_name=alien.worlds&schema_name=tool.worlds&limit=100",
            dataType: "json",
            success: function (res) {
                aw.tool.res = res["data"].sort(function (a, b) {
                    return sum(b) - sum(a);
                });
            },
            error: function (error) {
                toastr.warning(error.message, 'Rest API');
            }
        });
    } catch (error) {
        toastr.warning(error.message, 'Rest API');
    }
}

async function Transfer(account, receiver, memo, quantity) {
    try {
        const result = await wax.api.transact({
            actions: [{
                account: "eosio.token",
                name: "transfer",
                authorization: [{ actor: account, permission: "active" }],
                data: {
                    from: account,
                    to: receiver,
                    quantity: quantity + ' WAX',
                    memo: memo,
                },
            },
            ],
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });
        document.getElementById('status').innerHTML = "Transfer " + document.getElementById("quantity").value + " WAX to " + document.getElementById("wallet").value + " Success";
        toastr.success('Success', 'WAX Wallet');
    } catch (err) {
        document.getElementById('status').innerHTML = err.message;
        toastr.warning(err.message, 'WAX Wallet');
    }
}

async function Stake(account, receiver, quantity) {
    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'eosio',
                name: 'delegatebw',
                authorization: [{ actor: account, permission: "active" }],
                data: {
                    from: account,
                    receiver: receiver,
                    stake_net_quantity: '0.00000000 WAX',
                    stake_cpu_quantity: quantity.toFixed(8) + ' WAX',
                    transfer: false,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });
        document.getElementById('status').innerHTML = "Stake " + document.getElementById("quantity").value + " WAX Success";
        toastr.success('Success', 'WAX Wallet');
    } catch (err) {
        document.getElementById('status').innerHTML = err.message;
        toastr.warning(err.message, 'WAX Wallet');
    }
}

async function awClaim(nonce) {
    let tx = null;
    try {
        aw.mine.nonce = "";
        const actions = [{
            account: mining_account,
            name: "mine",
            authorization: [{
                actor: wax.userAccount,
                permission: "active",
            },],
            data: {
                miner: wax.userAccount,
                nonce: nonce
            },
        },];
        tx = await wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        });
    } catch (error) {
        Status2(error.message, "Alien Worlds", "danger", 2);
        if (error.message.toLowerCase().includes("failed to fetch")) {
            Status2('Địa chỉ IP tạm thời bị chặn? Không sao bạn cứ để VIVUCoin xử lý.', "VIVUCoin", "warning", 2);
            await sleep(30000);
        }
        else if (error.message.includes("INVALID_HASH")) {
            Status2('Tài khoản này có thể đang chạy ở thiết bị khác?', "VIVUCoin", "warning", 2);
            await sleep(30000);
        }
    } finally {
        if (tx && tx.processed && tx.transaction_id) {
            success = true;
            aw.mine.success = success;
            firstTimer = true;
            try {
                Status2(`Claim Success`, 'Alien Worlds', 'success', 2);
                const claimBounty = await getBountyFromTx(tx, wax.userAccount, hyperion_endpoints);
                Status2(`Claim Success: ${claimBounty}`, 'Alien Worlds', 'success', 2);
                await getTransaction(account).then((res) => {
                    aw.mine.lancuoi.res = res;
                });

                await server_getBalance2(wax.userAccount);
                await sleep(3000);
            } catch (error) {
                console.log('After Success: ' + error.message);
            }
        }
        else
            aw.mine.success = false;
    }
}

async function awClaim3(nonce) {
    let status = ['Start Mining', 'Alien Worlds', 'info', 2];
    Status3(status);
    try {
        const actions = [{
            account: mining_account,
            name: 'mine',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active',
            }],
            data: {
                miner: wax.userAccount,
                nonce: nonce,
            }
        }];
        wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        }).then((result) => {
            console.log('result is=', result);
            if (result && result.processed) {
                aw.mine.lancuoi.res = result.processed;
                let mined_amount = 0;
                result.processed.action_traces[0].inline_traces.forEach((t) => {
                    if (t.act.account === 'alien.worlds' && t.act.name === 'transfer' && t.act.data.to === mine_work.account) {
                        const [amount_str] = t.act.data.quantity.split(' ');
                        mined_amount += parseFloat(amount_str);
                    }
                });
                status[0] = `Claim Success: +${mined_amount.toFixed(4)} TLM`;
                status[2] = 'success';
            }
        }).catch((err) => {
            status[0] = err.message;
            status[2] = 'warning';
        });
    } catch (error) {
        status[0] = error.message;
        status[2] = 'danger';
    }
    Status2(status);
}

async function server_mine(account) {
    try {
        background_mine(account).then((mine_work) => {
            // unityInstance.SendMessage('Controller', 'Server_Response_Mine', JSON.stringify(mine_work));
        });
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_claim(data) {
    var mine_work = JSON.parse(data);
    try {
        console.log(`${mine_work.account} Pushing mine results...`);
        const mine_data = {
            miner: mine_work.account,
            nonce: mine_work.rand_str,
        };
        console.log('mine_data', mine_data);
        const actions = [{
            account: mining_account,
            name: 'mine',
            authorization: [{
                actor: mine_work.account,
                permission: 'active',
            },],
            data: mine_data,
        },];
        wax.api.transact({
            actions,
        }, {
            blocksBehind: 3,
            expireSeconds: 90,
        }).then((result) => {
            console.log('result is=', result);
            var amounts = new Map();
            if (result && result.processed) {
                let mined_amount = 0;
                result.processed.action_traces[0].inline_traces.forEach((t) => {
                    if (t.act.account === 'alien.worlds' && t.act.name === 'transfer' && t.act.data.to === mine_work.account) {
                        const [amount_str] = t.act.data.quantity.split(' ');
                        mined_amount += parseFloat(amount_str);
                    }
                });
                // unityInstance.SendMessage('Controller', 'Server_Response_Claim', `${mined_amount.toFixed(4)} TLM`);
            }
        }).catch((err) => {
            // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', err.message);
        });
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_claim2(mining_account1, account, account_permission, mine_data1, hyperion_endpoints) {
    console.log(mining_account1);
    console.log(account);
    console.log(account_permission);
    console.log(mine_data1);
    console.log(hyperion_endpoints);
    try {
        var mine_work = JSON.parse(mine_data1);
        const mine_data = {
            miner: mine_work.account,
            nonce: mine_work.rand_str,
        };
        console.log("Claiming Now");
        const claimData = await claim(mining_account, account, 'active', mine_data, hyperion_endpoints, wax.api);
        console.log("Claim Data" + claimData);
        // unityInstance.SendMessage('Controller', 'Server_Response_Claim', claimData.toString());
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_getBounty(transaction_id, account, hyperion_endpoints) {
    try {
        const claimBounty = await getBountyFromTx(transaction_id, account, hyperion_endpoints);
        // unityInstance.SendMessage('Controller', 'Server_Response_GetBounty', claimBounty.toString());
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_getBalance(account) {
    try {
        var data = await getBalance(account, wax.api.rpc);
        // unityInstance.SendMessage('Controller', 'Server_Response_GetBalance', data);
        return data;
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_getBalance2(account) {
    try {
        var data = await getBalance(account, wax.api.rpc);
        aw.acc.tlm = parseFloat(data.split(' ')[0]);
        Status2(`Balance: ${aw.acc.tlm} TLM`, 'WAX Wallet', "info");
        return data;
    } catch (error) {
        Status2(error.message, "WAX Wallet", "danger");
    }
}

async function server_stake(account, planet_name, quantity) {
    try {
        if (planet_name === undefined || planet_name === '') throw new Error('missing planet name');
        if (quantity === undefined || quantity === '') throw new Error('missing quantity');
        await stake(token_account, federation_account, account, planet_name, quantity, wax.api);
        // unityInstance.SendMessage('Controller', 'Server_Response_Stake', JSON.stringify({ planet_name: planet_name, quantity: quantity }));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_unstake(account, planet_name, quantity) {
    try {
        if (planet_name === undefined || planet_name === '') throw new Error('missing planet name');
        if (quantity === undefined || quantity === '') throw new Error('missing quantity');
        await unstake(federation_account, "token.worlds", account, planet_name, quantity, wax.api);
        // unityInstance.SendMessage('Controller', 'Server_Response_Unstake', JSON.stringify({ planet_name: planet_name, quantity: quantity }));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_getStaked(account) {
    try {
        var data = await getStaked(federation_account, account, wax.api.rpc);
        // unityInstance.SendMessage('Controller', 'Server_Response_GetStaked', JSON.stringify(data));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_getUnstakes(account) {
    try {
        var data = await getUnstakes(federation_account, account, wax.api.rpc);
        // unityInstance.SendMessage('Controller', 'Server_Response_GetUnstakes', JSON.stringify(data));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_refund(account, refund_id) {
    try {
        await refund(federation_account, account, refund_id, wax.api);
        // unityInstance.SendMessage('Controller', 'Server_Response_GetUnstakes', refund_id);
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_subscribe(account) {
    try {
        console.log('subscribed for account:' + account);
        subscribe(account, function (data) {
            console.log('notification' + data);
            // unityInstance.SendMessage('Controller', 'Server_Response_Notification', JSON.stringify(data));
        });
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_getAssets(account, schema) {
    try {
        var assets = await getAssets(account, api_endpoints, wax.api.rpc, schema);
        var data = {
            schema: schema,
            assets: assets
        };
        // unityInstance.SendMessage('Controller', 'Server_Response_GetAssets', JSON.stringify(data));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function server_setLandCommission(account, land_id, commission) {
    try {
        await setLandCommission(federation_account, account, land_id, commission, wax.api);
        // unityInstance.SendMessage('Controller', 'Server_Response_SetLandCommission', JSON.stringify({ land_id, commission }));
    } catch (error) {
        // unityInstance.SendMessage('ErrorHandler', 'Server_Response_SetErrorData', error.message);
    }
}

async function add_event(Event) {
    try {
        log += Event + '\n';
    } finally {
        console.log(log);
    }
}

window.onerror = function (errMsg, url, line, column, error) {
    log += "Error= " + errMsg;
    if (!logDownloaded) {
        console.save(log);
        logDownloaded = true;
    }
    var suppressErrorAlert = true;
    return suppressErrorAlert;
};

console.save = function (data, filename) {
    if (!data) {
        console.error('console.save: NO DATA');
        return;
    }
    if (!filename) {
        var d = new Date();
        filename = d.toUTCString() + 'Log.txt';
    }
    if (typeof data === 'object') {
        data = JSON.stringify(data, undefined, 2);
    }
    var type = 'text/txt';
    var blob = new Blob([data], {
        type: type
    });
    var e = document.createEvent('MouseEvents');
    var a = document.createElement('a');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = [type, a.download, a.href].join(':');
    a.dispatchEvent(e);
};

function openURL(url) {
    window.open(url)
}