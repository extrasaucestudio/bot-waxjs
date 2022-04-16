import React from "react";
import * as waxjs from "@waxio/waxjs/dist";
import axios from "axios";



class Waxtest extends React.Component {



    state = {
        userName: 'xxx.wam',
        token: [],
        res_axio: [],
    }

    async componentDidMount() {

    }


    login1 = async () => {
        try {
            const wax = new waxjs.WaxJS({
                rpcEndpoint: 'https://wax.greymass.com'
            });
            let userAccount = await wax.login();
            let key = await wax.pubKeys;
            let api1 = await wax.api;
            let crom = await wax.rpc.get_table_rows;
            console.log('co j o day:', api1);
            console.log('cos co j:', crom);
            this.setState({
                userName: userAccount,
                token: key
            })
            let res = await axios.get(`https://atomicassets-api.alienworlds.io/atomicassets/v1/assets?page=1&limit=1000&owner=lgjsa.wam&collection_name=alien.worlds`);
            this.setState({
                res_axio: res
            })
            console.log('get info:', res);
            let req = await axios.post(`https://aw-guard.yeomen.ai/platform-guard`, { "account_name": "mj1mo.c.wam", "actions": [{ "account": "m.federation", "name": "mine", "authorization": [{ "actor": "mj1mo.c.wam", "permission": "active" }], "data": { "miner": "mj1mo.c.wam", "nonce": "ef6d1adb53468fd5" } }] })
            console.log('chack tlm', req.data);

        } catch (e) {
            console.log(e)
        }
    }
    render() {
        return (
            <div>
                <button onClick={this.login1}>CLICk</button>
                <div> username account: </div>
                <p>{this.state.userName}</p>
                <div> tokenAccout:</div>
                <p>token1: {this.state.token[1]}</p>
                <p>token2: {this.state.token[0]}</p>
            </div>

        )
    }
}

export default Waxtest;