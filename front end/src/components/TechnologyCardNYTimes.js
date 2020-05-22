import React from 'react';
//import SearchCardJ  from './SearchCardJ';
import BounceLoader from 'react-spinners/BounceLoader';
import GuardianCardJ from './GuardianCardFEModel';

export default class TechnologyCardNYTimes extends React.Component{
    constructor(props){
        super(props);
        this.state = {cardObj:{}, data: [], error: null, isL: true, newsProvider:''}
        
        this.fetchNYTimesTechnologyCard = this.fetchNYTimesTechnologyCard.bind(this);
    }

    componentDidMount(){
        this.fetchNYTimesTechnologyCard();
    }

    fetchNYTimesTechnologyCard(){
        var newsSection = "technology";
        var newsProvider = "nytimes";
        //console.log(newsSection + newsProvider);
        fetch("https://reactbackend-273804.wl.r.appspot.com/sectioncard?newsSection="+newsSection+"&newsProvider="+newsProvider)
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
            //console.log(this.state.data);
        }

    render(){
        const {cardObj} = this.state;
        const { isL, data, error, newsProvider } = this.state;
        //console.log("data here : ");
        
            const cards = data.slice(0, 10).map(newsData => {
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
            //console.log(cards);
        return(
            <div>
                {error ? <p>{error.message}</p> : null}
                {!isL ? cards : <div style={{position:'absolute', top:'50%', bottom:'50%', marginLeft:'45%'}} ><BounceLoader size="60px" color={"#191563"} timeout={1500}/><p>Loading</p></div>}
            </div> 
        );
    }
}

//imagecheck:newsData.blocks.main.elements[0]