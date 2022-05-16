import React from "react";
import * as waxjs from "@waxio/waxjs/dist";
import axios from "axios";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));


class Waxtest extends React.Component {



    state = {
        userName: 'xxx.wam',
        token: [],
        timeDelay: 0,
        cat: '0',
        catpin: '0',
        //timeNow: 
        wax: new waxjs.WaxJS({
            rpcEndpoint: 'https://wax.greymass.com'
        })
    }

    async componentDidMount() {

    }

    login = async () => {
        try {
            const wax = new waxjs.WaxJS({
                rpcEndpoint: 'https://wax.greymass.com'
            });

            let userAccount = await this.state.wax.login();
            let key = await this.state.wax.pubKeys;
            // let tets = await this.state.wax.rand_str;
            // console.log('ai day', tets);
            this.setState({
                userName: userAccount,
                token: key
            })
            await this.checkToken(userAccount);
        } catch (e) {
            console.log(e)
        }
    }

    SendWax = async () => {
        try {
            const result = await this.state.wax.api.transact({
                actions: [{
                    account: "eosio.token",
                    name: 'transfer',
                    authorization: [{
                        actor: this.state.wax.userAccount,
                        permission: 'active',
                    }],
                    data: {
                        from: this.state.wax.userAccount,
                        to: '21ujk.wam',
                        quantity: '0.0001000000 WAX',
                        memo: '',
                    },
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
        } catch (e) {
            console.log(e)
        }

    }

    CatClaim = async (slot) => {
        let tx = null;
        try {
            const actions = [{
                account: "funnycatgame",
                name: 'claim',
                authorization: [{
                    actor: this.state.wax.userAccount,
                    permission: "active",
                },],
                data: {
                    owner: this.state.wax.userAccount,
                    slot_id: slot
                },
            },];
            tx = await this.state.wax.api.transact({
                actions,
            }, {
                blocksBehind: 3,
                expireSeconds: 90,
            });
        } catch (e) {
        }
    }
    CatTools = async () => {
        const res = await this.state.wax.rpc.get_table_rows({
            code: "funnycatgame",
            index_position: 1,
            json: true,
            key_type: "",
            limit: 20,
            lower_bound: "",
            reverse: false,
            scope: this.state.wax.userAccount,
            show_payer: false,
            table: "staking",
            upper_bound: "",
        });
        try {
            console.log('so tool CAT : ', res.rows);
            if (res) return res.rows; // mảng chứa all tool fw
        } catch (error) {
            console.log(`#W3: ${error.message}`);
        }
        return false;
    }
    // fwTools = async () => {
    //     const res = await this.state.wax.rpc.get_table_rows({
    //         code: "farmersworld",
    //         scope: "farmersworld",
    //         table: 'tools',
    //         lower_bound: this.state.wax.userAccount,
    //         upper_bound: this.state.wax.userAccount,
    //         index_position: 2,
    //         key_type: 'i64',
    //         limit: 100
    //     });
    //     try {
    //         console.log('so tool fw : ', res.rows);
    //         if (res) return res.rows; // mảng chứa all tool fw
    //     } catch (error) {
    //         console.log(`#W3: ${error.message}`);
    //     }
    //     return false;
    // }
    checkId = async (Id) => {
        try {
            let res = await axios.get(`https://wax-aa.eu.eosamsterdam.net/atomicassets/v1/assets/${Id}`);
            if (res) {
                return res.data.data.name;
            }
        } catch (e) {
            console.log(e);
        }
    }

    checkTime = (time) => {
        var datum = Date.parse(time);
        return datum / 1000;
    }

    checkToken = async (account_name) => {

        try {
            let cat1 = await axios.post(`https://chain.wax.io/v1/chain/get_currency_balance`, { code: "funnycatsnft", account: account_name, symbol: "RMX" });
            let catnip1 = await axios.post(`https://chain.wax.io/v1/chain/get_currency_balance`, { code: "funnycatsnft", account: account_name, symbol: "WAX" });
            if (cat1) {
                this.setState({
                    cat: cat1.data[0],
                    catpin: catnip1.data[0],
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    mainCat = async () => {
        let timeNow = Date.now() / 1000 - 180;
        try {

            let allTools = await this.CatTools();
            if (allTools.length !== 0) {
                for (let i = 0; i < allTools.length; i++) {
                    //console.log(`d tool ${i} :`, allTools[i].asset_id);
                    let kq = await this.checkId(allTools[i].asset_id)
                    console.log('name ID: ', kq);
                    //Foxy
                    if (kq && kq === 'Foxy') {
                        let t = timeNow - (7 * 60 * 60);
                        let m = this.checkTime(allTools[i].start_time) + (3 * 60 * 60);
                        if (m < t) {
                            await this.CatClaim(allTools[i].slot_id);
                            await delay(30000);
                        }
                    }
                    //Bagira
                    if (kq && kq === 'Bagira') {
                        let t = timeNow - (7 * 60 * 60);
                        let m = this.checkTime(allTools[i].start_time) + (8 * 60 * 60);
                        if (m < t) {
                            await this.CatClaim(allTools[i].slot_id);
                            await delay(30000);
                        }
                    }
                    //Yoda
                    if (kq && kq === 'Yoda') {
                        let t = timeNow - (7 * 60 * 60);
                        let m = this.checkTime(allTools[i].start_time) + (16 * 60 * 60);
                        if (m < t) {
                            await this.CatClaim(allTools[i].slot_id);
                            await delay(30000);
                        }
                    }
                    //Loki
                    if (kq && kq === 'Loki') {
                        let t = timeNow - (7 * 60 * 60);
                        let m = this.checkTime(allTools[i].start_time) + (6 * 60 * 60);
                        if (m < t) {
                            await this.CatClaim(allTools[i].slot_id);
                            await delay(30000);
                        }
                    }
                    //Felix
                    if (kq && kq === 'Felix') {
                        let t = timeNow - (7 * 60 * 60);
                        let m = this.checkTime(allTools[i].start_time) + (4 * 60 * 60);
                        if (m < t) {
                            await this.CatClaim(allTools[i].slot_id);
                            await delay(30000);
                        }
                    }
                    //Luna
                    if (kq && kq === 'Luna') {
                        let t = timeNow - (7 * 60 * 60);
                        let m = this.checkTime(allTools[i].start_time) + (30 * 60);
                        if (m < t) {
                            await this.CatClaim(allTools[i].slot_id);
                            await delay(86000);
                        }
                    }

                }
                await this.checkToken(this.state.userName);
            }


        } catch (e) {
            console.log(e);
        }
    }
    main = () => {
        this.mainCat();
        setInterval(this.mainCat, 300000);
    }

    render() {
        return (
            <div>
                <button onClick={this.login}>Login Wax</button>
                <button onClick={this.main}>Auto CAT</button>
                <div> username account: </div>
                <p>{this.state.userName}</p>
                <div> ++++++:</div>
                <p>Token Cat: {this.state.cat} </p>
                <p>token Catpin: {this.state.catpin} </p>
            </div>

        )
    }
}

export default Waxtest;