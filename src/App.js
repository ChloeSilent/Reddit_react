import React from 'react';
import './App.css';
import LoadingOverlay from 'react-loading-overlay';

import RangeFilter from "./RangeFilter";

import Item from "./Item";
const link = "https://www.reddit.com/r/reactjs.json?limit=100";

let refresh;
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            enableAutoRefresh: false,
            rangeMin: "0",
            rangeMax: "",
            rangeValue: "",
            isLoading: false

        }
    }
    ;

    getItems = () => {
        this.setState({
            isLoading: true
        });

        fetch(link)
            .then(response => response.json())
            .then(data => {

                this.setState({
                    items: data.data.children,
                    isLoading: false,
                    rangeMax: Math.max.apply(Math, data.data.children.map(function(item) { return item.data.num_comments; })) + 10
                });
            });
    };

    handleAutoRefreshBtn = () => {
        this.setState(state => ({
            enableAutoRefresh: !state.enableAutoRefresh
        }), () => {
            if (this.state.enableAutoRefresh) {
                    refresh = setInterval(() => {
                        this.getItems()
                    }, 3000);
            } else {
                clearInterval(refresh);
                refresh = null;
            }
        })
    };

    componentDidMount() {
        this.getItems();
    }

    onRangeMove = (event) => {
        this.setState({
            rangeValue: Number(event.target.value)
        });
    };

    getItemsByComments = (items, minComments) => {
        return items.filter(item => item.data.num_comments >= minComments).sort((a, b) => b.data.num_comments - a.data.num_comments);
    };


    render() {

        const {
            items,
            isLoading,
            rangeMin,
            rangeMax,
            rangeValue,
            enableAutoRefresh
        } = this.state;

        const itemsByComments = this.getItemsByComments(items, rangeValue);

        return (
            <LoadingOverlay
                active={isLoading}
                spinner
                text='Loading your content...'
                styles={{
                    spinner: (base) => ({
                        ...base,
                        width: '50px',
                        '& svg circle': {
                            stroke: '#000000'
                        },
                        position: 'absolute',
                        left: '50%',
                        transform: ' translate(-50%)',
                        top: '50%'
                    }),
                    content: ({
                        color: '#000000',
                        width: '290px',
                        padding: "50px",
                        margin: "70px auto"
                    })
                }}
            >
                <div className="gallery__container">
                    <h1>Top commented.</h1>
                    <RangeFilter rangeMin={rangeMin}
                                 rangeMax={rangeMax}
                                 rangeValue={rangeValue}
                                 onRangeMove={this.onRangeMove}
                    />
                    <span>{rangeValue}</span>
                    <button className="gallery__refresh-btn"
                            type="button"
                            onClick={this.handleAutoRefreshBtn}>
                        {`${enableAutoRefresh ? "Stop" : "Start"} auto-refresh`}
                    </button>
                    <div className="gallery__gallery">
                        {
                            itemsByComments.length ?
                                itemsByComments.map(item =>
                                    <Item data={item.data}
                                          key={item.data.id}
                                    />
                                ) : <p className="notMatchWarn">No results found matching your criteria</p>
                        }
                    </div>
                </div>
            </LoadingOverlay>
        );
    }
}


