import React from 'react';
//import SearchCardJ  from './SearchCardJ';
import BounceLoader from 'react-spinners/BounceLoader';
import GuardianCardJ from './GuardianCardFEModel';

export default class TechnologyCardGuardian extends React.Component{
    constructor(props){
        super(props);
        this.state = {cardObj:{}, data: [], error: null, isL: true, newsProvider:''}
        this.fetchGuardianTechnologyCard = this.fetchGuardianTechnologyCard.bind(this);
    }

    componentDidMount(){
            this.fetchGuardianTechnologyCard();
        } 
        fetchGuardianTechnologyCard(){
        var newsSection = "technology";
        var newsProvider = "guardian";
        //console.log(newsSection + newsProvider);
        fetch("https://reactbackend-273804.wl.r.appspot.com/sectioncard?newsSection="+newsSection+"&newsProvider="+newsProvider)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data.data.response.results,
                    isL: false,
                    newsProvider:'guardian'
                })
            }
            )
            .catch(error => this.setState({ error, isL: false }));
    }

    render(){
        const {cardObj} = this.state;
        const { isL, data, error, newsProvider } = this.state;
        //console.log("data: ");
        //console.log(this.setState.data);
            var cards = data.slice(0, 10).map(newsData => {
                if(newsData.title!="" && newsData.blocks.body[0].bodyTextSummary != "" && newsData.webUrl!="" && newsData.blocks.main && newsData.webPublicationDate!=""){
                    let cardObj = {id:newsData.id, title:newsData.webTitle, badge:newsData.sectionId,
                        description:newsData.blocks.body[0].bodyTextSummary,
                        url:newsData.webUrl, date:newsData.webPublicationDate.split('T')[0],
                        newsProvider:newsProvider, imagecheck:newsData.blocks.main.elements[0].assets}
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
            //<div>world card</div>
        );
    }
}

//imagecheck:newsData.blocks.main.elements[0]