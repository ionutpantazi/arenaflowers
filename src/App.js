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
          <ul>
            <li id="Name" className="Name">
              Country Name
            </li>
            <li id="City" className="City">
              Capital City
            </li>
          </ul>
        </div>
        <div className="Results">
          {result &&
            Object.keys(result).map(function (element) {
              return (
                <ul style={{ backgroundColor: (element & 1) ? '#fafafa' : '#e3e1e1' }}>
                  <li id={result[element].countryName} className="Name">
                    {result[element].countryName}
                  </li>
                  <li id={result[element].capitalCity} className="City">
                    {result[element].capitalCity}
                  </li>
                </ul>
              )
            })
          }
        </div>

      </div>
    );
  }
}

export default App;
