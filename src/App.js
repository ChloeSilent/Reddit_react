import React from 'react';
import './App.css';
//import Loader from 'react-loader-spinner'
import LoadingOverlay from 'react-loading-overlay';

let refresh;
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            headline: "Top commented.",
            imageItems: [],
            autoRefresh: false,
            rangeMin: "",
            rangeMax: "",
            rangeValue: ""

        }
    }
    ;

    getImages = () => {

        const link = "https://www.reddit.com/r/reactjs.json?limit=100";
        this.setState({
            isLoading: true
        });

        fetch(link)
            .then(response => {

                return response.json();
            })
            .then(data => {
                this.setState({
                    imageItems: data.data.children.sort(this.compare),
                    isLoading: false,
                    rangeMin: data.data.children.sort(this.compare)[data.data.children.length - 1].data.num_comments,
                    rangeMax: data.data.children.sort(this.compare)[0].data.num_comments
                });
            });
    };

    autoRefresh = () => {

        if(!this.state.autoRefresh){
            refresh = setInterval(() => this.getImages(), 3000);
            this.setState({
                autoRefresh: true
            });
        } else {
            clearInterval(refresh);
            refresh = null;
            this.setState({
                autoRefresh: false
            });
        }
    };

    compare = (a, b) => {
        return b.data.num_comments - a.data.num_comments;
    };

    componentDidMount() {
        this.getImages();
    }

    onRangeMove =(event) => {
        this.setState({
            rangeValue: event.target.value
        });
    };


    render() {

        const {imageItems, isLoading, rangeMin, rangeMax, headline, rangeValue} = this.state;
        console.log();
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
                        }
                    }),
                    content : ({
                        color: '#000000',
                        width: '290px',
                    })
                }}
            >

            <div className="gallery__container">
                <h1>{headline}</h1>
                <input type="range"
                       id="comments"
                       name="comments"
                       min={rangeMin}
                       max={rangeMax}
                       value={rangeValue}
                       step="10"
                onChange={this.onRangeMove}/>
                    <label htmlFor="comments">Current filter: </label>
                    <span>{rangeValue}</span>
                <input className="gallery__refresh-btn"
                type="button"
                value="Start auto-refresh"
                onClick={this.autoRefresh}/>
                <div className="gallery__gallery">
                            {
                                imageItems.map(item => {
                                    return (
                                        <div key= {item.data.id}
                                             className="gallery__image-container">
                                            <img src={item.data.thumbnail} alt=""/>
                                            <h2>{item.data.title}</h2>
                                            <p>Number of comments: {item.data.num_comments}</p>
                                            <a href={item.data.permalink}>Link</a>
                                        </div>
                                    );
                                })
                            }
                </div>
            </div>
            </LoadingOverlay>
        );
    }
}


