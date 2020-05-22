import React from 'react';
import GuardianCardJ from './GuardianCardFEModel';
import BounceLoader from 'react-spinners/BounceLoader';

class GuardianCard extends React.Component {
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
        var np = "guardian";
        fetch(`https://reactbackend-273804.wl.r.appspot.com/mainnews/${np}`)
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
    componentDidMount() {
        this.fetchNews();
    }

    render() { 
        const {cardObj} = this.state;
        const { isL, data, error, newsProvider } = this.state;
        const cards = data.map(newsData => {
            if(newsData.title!="" && newsData.blocks.body[0].bodyTextSummary != "" && newsData.webUrl!="" && newsData.blocks.main && newsData.webPublicationDate!=""){
            let cardObj = {id:newsData.id, title:newsData.webTitle, badge:newsData.sectionId,
                            description:newsData.blocks.body[0].bodyTextSummary,
                            url:newsData.webUrl, date:newsData.webPublicationDate.split('T')[0],
                            imagecheck:newsData.blocks.main.elements[0].assets, newsProvider:newsProvider}
            //console.log(cardObj.imagesrc);

            return (
                <GuardianCardJ newsData = {cardObj} />
            );
            }
        });
        return (
            <div>
                {error ? <p>{error.message}</p> : null}
                {!isL ? cards : <div style={{position:'absolute', top:'50%', bottom:'50%', marginLeft:'45%'}} ><BounceLoader size="60px" color={"#191563"} timeout={1500}/><p>Loading</p></div>}
            </div>
        );
    }

}

export default GuardianCard;