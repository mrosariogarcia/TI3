import { Component } from "react";
export class SearchForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }
    handleInputChange(e) {
        //console.log(e)
        this.setState({
            query: e.target.value
        })
    }
    handleInputSubmit() {
        console.log('submit', this.props, this.state.query)
        this.props.history.push('/search', { query: this.state.query })
    }
    render() {
        return (
            <div>
                <input onChange={(e) => this.handleInputChange(e)}
                    type="text" name='query' value={this.state.query} />
                <button onClick={() => this.handleInputSubmit()}  >Buscar</button>
            </div>
        )

    }




}