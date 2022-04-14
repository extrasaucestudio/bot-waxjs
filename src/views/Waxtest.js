import React from "react";
import * as waxjs from "@waxio/waxjs/dist";



class Waxtest extends React.Component {
    state = {
        userName: 'xxx.wam',
        token: []
    }
    login1 = async () => {
        try {
            const wax = new waxjs.WaxJS({
                rpcEndpoint: 'https://wax.greymass.com'
            });
            let userAccount = await wax.login();
            let key = await wax.pubKeys
            console.log('co j o day:', userAccount);
            this.setState({
                userName: userAccount,
                token: key
            })
            alert("chan");
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