import * as React from "react"
import { render } from "react-dom"
import { compose } from "recompose"

const Presentational = ({ data }) => <div>{JSON.stringify(data)}</div>

type Result = {
    username: string
    img: string
}

type State = {
    data: Result[]
}

// Component 1
class Container extends React.Component<{}, State> {
    constructor(props) {
        super(props)
        this.state = { data: [] }
    }

    public componentWillMount() {
        fetch("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
            .then<Result[]>(response => response.json())
            .then(data => this.setState({ data }))
    }

    public render() {
        return <Presentational data={this.state.data} />
    }
}

// Component 2
// tslint:disable-next-line:no-shadowed-variable
const container = Presentational =>
    // tslint:disable-next-line:max-classes-per-file
    class extends React.Component<{}, State> {
        constructor(props) {
            super(props);
            this.state = { data: [] }
        }
        public componentWillMount() {
            fetch("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
                .then<Result[]>(response => response.json())
                .then(data => this.setState({ data }))
        }
        public render() {
            return <Presentational data={this.state.data} />
        }
    }

const HigherOrderComponent = container(Presentational);

// Component 3
// tslint:disable-next-line:no-shadowed-variable
const container2 = endpoint => Presentational =>
    // tslint:disable-next-line:max-classes-per-file
    class extends React.Component<{}, State> {
        constructor(props) {
            super(props)
            this.state = { data: [] }
        }
        public componentWillMount() {
            fetch(endpoint)
                .then<Result[]>(response => response.json())
                .then(data => this.setState({ data }))
        }
        public render() {
            return <Presentational data={this.state.data} />
        }
    }

const HigherOrderComponent2 = container2("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")(Presentational)

// Recompose
const Presentational2 = ({ data }: { data: Result[] }) =>
    <ul>
        {data.map((v, k) =>
            <li key={k}>
                {/* {v.username} */}
                <img style={{ paddingLeft: "5px" }} src={v.img} width="80" />
            </li>
        )}
    </ul>

const HigherOrderComponent3 = compose(container2("https://fcctop100.herokuapp.com/api/fccusers/top/alltime"))
const FetchAddDisplayFCCData = HigherOrderComponent3(Presentational2)

render(<FetchAddDisplayFCCData />, document.getElementById("root"))