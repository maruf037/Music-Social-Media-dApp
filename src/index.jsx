import React from 'react'
import ReactDom from 'react-dom'
import myWEB3 from 'web3'
import './index.css'
import ABI from '..build/contracts/socialMusic.json'

class Main extends React.Component {
    constructor() {
        super()

        window.myWeb3 = new myWEB3(myWEB3.givenProvider)
        const contractAddress = '0x1a4B47A705030FfCd7718BFF94161CF83505c681'
        const abi = ABI.abi

        hideAllSections() {
            this.state = {
                isFormHidden: true,
                isAddMusicHidden: true
            }
        }

        this.setContractInstance()
        
    }

    async setContractInstance() {
        const contractAddress = ABI.networks['3'].address
        const abi = ABI.abi
        const contractInstance = new myWeb3.eth.Contract(abi, contractAddress, {
            from: await this.getAccount(),
            gasPrice: 2e9
        })
        await this.setState({contractInstance: contractInstance})
    }
       
    async setupAccount(name, age, status) {
        await this.state.contractInstance.methods.setup(this.fillBytes32WithSpaces(name), 
        age, status).send({from: '0x610048D5AEB5C1710Ef7c4C4c927990Cf3a6afc2'})
    }
    
    fillBytes32WithSpaces(name) {
        let nameHex = myWeb3.utils.toHex(name)
        for(let i = nameHex.length; i < 66; i++) {
            nameHex = nameHex + '0'
        }
        return nameHex;
    }
    
    async addMusic(music) {
        await this.state.contractInstance.methods.addSong(music).send(
            {from: '0x1a4B47A705030FfCd7718BFF94161CF83505c681'}
        )
    }

    render() {
        return (
            <div>
                <h1>Welcome to Decentralized Social Music!</h1>
                <p>Setup your account, start adding musical recommendations for your friends and follow people that may interest you.</p>
                <div className="button-container">
                    <button onClick={() => {this.hideAllSections()
                        if(this.state.isFormHidden)
                        this.setState({isFormHidden: false})
                        else this.setState({isFormHidden: true})}}>Setup Account</button>
                    <button onClick={() => {this.hideAllSections()
                        if(this.state.isAddMusicHidden)
                        this.setState({isAddMusicHidden: false})
                        else this.setState({isAddMusicHidden: true})}}>Add Music</button>
                    <button>Follow People</button>
                </div>

                <Form className={this.state.isFormHidden ? 'hidden' : ''}
                cancel={() => {this.setState({isFormHidden: true})
                            }}
                setupAccount={(name, age, status) => {this.setupAccount(name, age, status)
                            }}
                />

                <AddMusic className={this.state.isAddMusicHidden ? 'hidden': ''}
                cancel={() => {this.setState({isAddMusicHidden: true})
                            }}
                addMusic={music => {this.addMusic(music)
                            }}
                />

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

class Form extends React.Component {
    constructor() {
        super()
    }

    render () {
        return (
            <form className={this.props.className}>
                <input className='form-input' type='text' ref='form-name' placeholder='Your Name'/>
                <input className='form-input' type='number' ref='form-age' placeholder='Your age'/>
                <textarea className='form-input form-textarea' ref='form-state' placeholder='Your state, a description about yourself'></textarea>
                <div>
                    <button onClick={event => {event.preventDefault()
                    this.props.cancel()}} className='cancel-button'>
                    Cancel</button>
                    <button onClick={event => {event.preventDefault()
                    this.props.setupAccount(this.refs['form-name'].value, 
                    this.refs['form-age'].value, this.refs['form-state'].value)
                    }}>Submit</button>
                </div>
            </form>
        )
    }
}

class AddMusic extends React.Component {
    constructor() {
        super()
    }

    render() {
        return(
            <div className={this.props.className}>
                <input className='form-input' type='text' ref='add-music-input' placeholder='Your song recommendation.'/>
                <div>
                    <button onClick={event => {event.preventDefault()
                    this.props.cancel()}} className='cancel-button'>
                    Cancel</button>
                    <button onClick={event => {event.preventDefault()
                    this.props.addMusic(this.refs['add-music-input'].value)
                }}>Submit</button>
                </div>
            </div>
        )
    }
}

class FollowPeopleContainer extends React.Component {
    constructor() {
        super()
    }

    render() {
        let followData =  this.props.followUsersData;
        //Remove the users that you already follow so that you don't see them
        for(let i=0; i < followData.length; i++) {
            let indexOfFollowing = followData[i].following.indexOf(this.props.userAddress);
            if(indexOfFollowing != -1) {
                followData = followData.splice(indexOfFollowing, 1)
            }
        }
        return(
            <div className={this.props.className}>
                {followData.map(user => (
                    <FollowPeopleUnit
                        key={user.address}
                        address={user.address}
                        age={user.age}
                        name={user.name}
                        state={user.state}
                        recommendations={user.recommendations}
                        following={user.following}
                        followUser={() => {
                            this.props.followUser(user.address)
                        }}
                    />
                ))}
            </div>
        )
    }
}

class FollowPeopleUnit extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className='follow-people-unit'>
                <div className='follow-people-address'>{this.props.address}</div>
                <div className='follow-people-name'>{myWeb3.utils.toUtf8(this.props.name)}</div>
                <div className='follow-people-age'>{this.props.age}</div>
                <div className='follow-people-state'>{this.props.state}</div>
                <div className='follow-people-recommendation-container'>{this.props.recommendations.maps((message, index) => (
                    <div key={index} className='follow-people-recommendation'>{message}</div>
                ))}
                </div>
                <button className='follow-button' onClick={() => {this.props.followUser()
                }}>Follow</button>
            </div>
        )
    }
}


ReactDom.render(<Main />, document.querySelector('#root'))