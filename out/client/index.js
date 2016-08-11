"use strict";

var url = "http://171.101.236.255:3000/";

// Connect to the socket.io server
var socket = io.connect(url);
// Wait for data from the server

// imported via script file:
// var traffic = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//
// var tsec = [
//    {
//        "id": "4ca56d2e03d5",
//        "dname": "Nema",
//        "avatar": "img/Nema.jpg",
//        "traffic": traffic.slice(0),
//        "lastSeen": null
//    },... ];

function addPeriod(justIn) {
    // todo: deal with invalid json, e.g. '{'
    var total = 0;
    for (var i = 0; i < tsec.length - 1; i++) {
        // don't include TOTAL in loop
        if (justIn[tsec[i].macHex]) {
            tsec[i].traffic.unshift(justIn[tsec[i].macHex]);
            tsec[i].lastSeen = new Date();
        } else {
            tsec[i].traffic.unshift(0);
        }
        tsec[i].traffic.pop();
    }
    // add total of JustIn
    for (var x in justIn) {
        if (justIn.hasOwnProperty(x)) {
            total += justIn[x];
        }
    }
    tsec[tsec.length - 1].traffic.unshift(total);
    tsec[tsec.length - 1].lastSeen = new Date();
    tsec[tsec.length - 1].traffic.pop();
}

// from http://tristen.ca/hcl-picker/#/hlc/14/1/242937/E1FB75
var palette = ["#242937", "#285864", "#256970", "#257A7A", "#298B81", "#369D85", "#48AE86", "#60BF85", "#7BCF82", "#9ADF7D", "#BCEE79", "#E1FB75"].reverse();

function makeOne(color) {
    var cir = '<svg class="one" width="30" height="30"><circle cx="15" cy="15" r="13" stroke="';
    cir += palette[palette.length - 1] + '" stroke-width="1" fill="';
    cir += color + '" /></svg>';
    return cir;
}

function makeTen(colors) {
    var full = "";
    for (var i = 0; i < 10; i++) {
        full += makeOne(colors[i]);
    }
    return full;
}

var Bullets = React.createClass({
    displayName: "Bullets",
    render: function render() {
        var traffic = this.props.traffic;
        var colors = traffic.map(function (x) {
            if (x === 0) return palette[0];
            if (x <= 100) return palette[1];
            if (x <= 1000) return palette[2];
            if (x <= 3000) return palette[3];
            if (x <= 6000) return palette[4];
            if (x <= 10000) return palette[5];
            if (x <= 20000) return palette[6];
            if (x <= 50000) return palette[7];
            if (x <= 100000) return palette[8];
            if (x <= 500000) return palette[9];
            if (x <= 1500000) return palette[10];
            return palette[11];
        });

        function createMarkup() {
            return {
                __html: makeTen(colors)
            };
        };
        return React.createElement("div", { className: "bullets",
            dangerouslySetInnerHTML: createMarkup()
        });
    }
});

var Slot = React.createClass({
    displayName: "Slot",
    render: function render() {
        var lastSeen = "not yet";
        if (this.props.lastSeen) {
            var date = this.props.lastSeen;
            lastSeen = date.getHours() + ":";
            lastSeen += date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            if (date.getDate() === new Date().getDate()) {
                lastSeen += " today";
            } else {
                lastSeen += "on " + lastSeen.getFullYear() + "-" + lastSeen.getMonth() + "-" + lastSeen.getDay();
            }
        }

        return React.createElement(
            "div",
            { className: "media" },
            React.createElement(
                "div",
                { className: "media-left" },
                React.createElement(
                    "a",
                    { href: "#" },
                    React.createElement("img", { className: "media-object",
                        height: "75",
                        width: "75",
                        src: "../" + this.props.avatar,
                        alt: "" })
                )
            ),
            React.createElement(
                "div",
                { className: "media-body" },
                React.createElement(
                    "h4",
                    { className: "media-heading" },
                    " ",
                    this.props.dname,
                    " "
                ),
                " ",
                React.createElement(
                    Bullets,
                    { traffic: this.props.traffic },
                    " "
                ),
                React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "small",
                        null,
                        " last activity: ",
                        lastSeen,
                        " "
                    )
                )
            )
        );
    }
});

var Traffic = React.createClass({
    displayName: "Traffic",
    getInitialState: function getInitialState() {
        return {
            tsec: tsec
        };
    },
    componentDidMount: function componentDidMount() {
        var that = this;
        socket.on('output', function (data) {
            var justIn = JSON.parse(data);
            addPeriod(justIn);
            that.setState({
                tsec: tsec
            });
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            " ",
            this.state.tsec.map(function (person) {
                return React.createElement(
                    Slot,
                    { key: person.id,
                        dname: person.dname,
                        avatar: person.avatar,
                        lastSeen: person.lastSeen,
                        traffic: person.traffic },
                    " "
                );
            }),
            " "
        );
    }
});

ReactDOM.render(React.createElement(Traffic, null), document.getElementById('targets'));

////// history

var fromServer = fetch(url + "history/0/asdfasdf").then(function (response) {
    return response.json();
}).then(function (responseJson) {
    console.log(responseJson);
    return responseJson;
});

var History = React.createClass({
    displayName: "History",
    getInitialState: function getInitialState() {
        return {
            addr1: "notyet",
            addr2: "notyet",
            addr3: "notyet"
        };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        // var that = this;
        fetch(url + "history/0/asdfasdf").then(function (response) {
            return response.json();
        }).then(function (responseJson) {
            _this.setState({
                addr1: responseJson.addr1,
                addr2: responseJson.addr2,
                addr3: responseJson.addr3
            });
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement("br", null),
            React.createElement("br", null),
            "Second result with state variable: ",
            this.state.addr1
        );
    }
});

ReactDOM.render(React.createElement(History, null), document.getElementById('history'));