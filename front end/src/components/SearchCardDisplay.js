import React from 'react';
import SearchCardJ  from './SearchCardJ';
import BounceLoader from 'react-spinners/BounceLoader';
export default class SearchCardDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state = {queryword : this.props.location.search, cardObj:{}, data: [], error: null, isL: true, newsProvider:'', word:localStorage.getItem("inputValue")}
        this.fetchGuardianSearchCard = this.fetchGuardianSearchCard.bind(this);
        this.fetchNYTimesSearchCard = this.fetchNYTimesSearchCard.bind(this);
    }

    componentDidMount(){
        this.props.eventHandle();
        if(this.props.newsValue){
            this.fetchGuardianSearchCard();
        } else{
            this.fetchNYTimesSearchCard();
        }
    }
    
    fetchGuardianSearchCard(){
        console.log("guardian search for  : " + localStorage.getItem("inputValue"));
        var queryword = localStorage.getItem("inputValue");
        fetch("https://reactbackend-273804.wl.r.appspot.com/searchguardian?queryword="+queryword)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data.data.response.results,
                    isL: false,
                    newsProvider:'guardian',
                    queryword:localStorage.getItem("inputValue")   
                })
            })
            .catch(error => this.setState({ error, isL: false }));
    }
    fetchNYTimesSearchCard(){
        console.log("nytimes search for  : " + this.state.queryword);
        var queryword = localStorage.getItem("inputValue");
        fetch("https://reactbackend-273804.wl.r.appspot.com/searchnytimes?queryword="+queryword)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data.data.response.docs,
                    isL: false,
                    newsProvider:'nytimes',
                    queryword:localStorage.getItem("inputValue")
                })
            }
            )
            .catch(error => this.setState({ error, isL: false }));
    }
    render(){
        if(localStorage.getItem("inputValue")!=this.state.queryword){
            this.setState({
                queryword : localStorage.getItem("inputValue")
            })
            this.componentDidMount();
        }
        const {cardObj} = this.state;
        const { isL, data, error, newsProvider } = this.state;

        if(this.props.newsValue){
            var cards = data.map(newsData => {
                let cardObj = {id:newsData.id, title:newsData.webTitle, badge:newsData.sectionId,
                                url:newsData.webUrl, date:newsData.webPublicationDate.split('T')[0],
                                imagecheck:newsData.blocks.main.elements[0].assets, newsProvider:newsProvider}
                return (
                    <SearchCardJ newsData = {cardObj} />
                );
            });
        } else{
            var cards = data.map(newsData => {
                let cardObj = {id:newsData.web_url, title:newsData.headline.main, badge:newsData.news_desk, 
                    url:newsData.web_url, date:newsData.pub_date.split('T')[0],
                    imagecheck:newsData.multimedia, newsProvider:newsProvider}
                return (
                    <SearchCardJ newsData = {cardObj} />
                );
            });
        }  

        return(
            <div>
                {error ? <p>{error.message}</p> : null}
                {!isL ? <div ><div style={{fontSize:'30px', fontWeight:'semi-bold', marginLeft:'15px', textDecoration:'none'}}>Results</div><div className="d-flex flex-wrap" >{cards}</div></div> : <div style={{position:'absolute', top:'50%', bottom:'50%', marginLeft:'45%'}} ><BounceLoader size="60px" color={"#191563"} timeout={1500}/><p>Loading</p></div>}
             </div> 
        );
    }
}