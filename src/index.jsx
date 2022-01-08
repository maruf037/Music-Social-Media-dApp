import React from 'react'
import ReactDom from 'react-dom'

class Main extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>The project have been setup.</div>
        )
    }
}

ReactDom.render(<Main />, document.querySelector('#root'))