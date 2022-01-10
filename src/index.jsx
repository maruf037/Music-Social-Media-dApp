import React from 'react'
import ReactDom from 'react-dom'
import './index.css';

class Main extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <h1>Welcome to Decentralized Social Music!</h1>
                <p>Setup your account, start adding musical recommendations for your friends and follow people that may interest you.</p>
                <div className="button-container">
                    <button>Setup Account</button>
                    <button>Add Music</button>
                    <button>Follow People</button>
                </div>
                <h3>Latest musical recommendations from people using the dApp</h3>
                <div ref="general-recommendations">
                    <Recommendation name="Maruf"
                    address="0x1a4B47A705030FfCd7718BFF94161CF83505c681"
                    song="Artcell - Oniket Prantor"
                    />
                    <Recommendation name="Sonia"
                    address="0x1a4B47A705030FfCd7718BFF94161CF83505c682"
                    song="James - Kobita"
                    />
                    <Recommendation name="Hossain"
                    address="0x1a4B47A705030FfCd7718BFF94161CF83505c683"
                    song="Shironamhin - Ai Obelay"
                    />
                    <Recommendation name="Sany"
                    address="0x1a4B47A705030FfCd7718BFF94161CF83505c684"
                    song="Aurthohin - Oshomapto-1"
                    />
                </div>
            </div>
        )
    }
}

class Recommendation extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className='recommendation'>
                <div className='recommendation-name'>{this.props.name}</div>
                <div className='recommendation-address'>{this.props.address}</div>
                <div className='recommendation-song'>{this.props.song}</div>
            </div>
        )
    }
}

ReactDom.render(<Main />, document.querySelector('#root'))