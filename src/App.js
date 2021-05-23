import React from "react"
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "",
      result: ""
    }
  }
  onSearch() {
    const check = () => {
      try {
        require(`./node/${this.state.input}.json`)
      }
      catch (e) {
        return (true)
      }
    }
    if (!check()) {
      const result = require(`./node/${this.state.input}.json`)
      this.setState({ result })
    } else {
      this.setState({ result: "" })
    }
  }
  render() {
    let result = this.state.result.results
    return (
      <div>
        <div className="Inputs">
          <input
            placeholder="Search"
            className="Search"
            value={this.state.input}
            onChange={({ target: { value: input } }) =>
              this.setState({ input })
            }
          />
          <button
            className="Button"
            onClick={() => this.onSearch()}
          >
            Search
          </button>
        </div>
        <br />
        <div className="Header">
          <span className="Name">Country Name</span>
          <span className="City">Capital City</span>
        </div>
        <div className="Results">
          {result &&
            Object.keys(result).map(function (element) {
              return (
                <div style={{ backgroundColor: (element & 1) ? '#fafafa' : '#e3e1e1' }}>
                  <ul className="List">
                    <li id={result[element].countryName}>
                      <span className="Name">{result[element].countryName}</span>
                    </li>
                    <li id={result[element].capitalCity}>
                      <span className="City">{result[element].capitalCity}</span>
                    </li>
                  </ul>
                </div>
              )
            })
          }
        </div>

      </div>
    );
  }
}

export default App;
