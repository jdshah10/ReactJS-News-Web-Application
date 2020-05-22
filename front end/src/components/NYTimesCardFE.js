import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import GuardianCardJ from './GuardianCardFEModel';

class NYTimesCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isL: true,
            data: [],
            cardObj:{},
            newsProvider:''
        };
    }
    fetchNews() {
        var np = "nytimes";
        fetch(`https://reactbackend-273804.wl.r.appspot.com/mainnews/${np}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data.data.results,
                    isL: false,
                    newsProvider:'nytimes'
                })
            }
            )
            .catch(error => this.setState({ error, isL: false }));
    }
    componentDidMount() {
        this.fetchNews();
    }
    render() {
        const {cardObj} = this.state;
        const { isL, data, error, newsProvider } = this.state;

        const cards = data.map(newsData => {
            if(newsData.title!="" && newsData.abstract!="" && newsData.url!="" && newsData.published_date!="" && newsData.multimedia){
            let cardObj = {id:newsData.url, title:newsData.title, badge:newsData.section,
                description:newsData.abstract,
                url:newsData.url, date:newsData.published_date.split('T')[0],
                imagecheck:newsData.multimedia, newsProvider:newsProvider}
            return (
                <GuardianCardJ newsData = {cardObj} />
            );
            }
        });
        return(
            <div>
            {error ? <p>{error.message}</p> : null}
            {!isL ? cards : <div style={{position:'absolute', top:'50%', bottom:'50%', marginLeft:'45%'}} ><BounceLoader size="60px" color={"#191563"} timeout={1500}/><p>Loading</p></div>}
        </div>
        );
    }
}

export default NYTimesCard;