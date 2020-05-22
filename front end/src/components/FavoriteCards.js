import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';
import { EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import { MdShare, MdDelete } from 'react-icons/md';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import BounceLoader from 'react-spinners/BounceLoader';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Truncate from 'react-truncate';

export default class FavoriteCards extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            shareshow: false,
            error: null,
            isL: true,
            delbookmark:''
        };
        this.modaldummy = this.modaldummy.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteFavourites = this.deleteFavourites.bind(this);
    }
    componentDidMount(){
        this.props.eventHandle();
        this.setState({isL:false})
    }
    deleteFavourites(cardData){
        toast(<span style={{ color:'black', fontWeight:'light' }} >Removing {cardData.title}</span>, {autoClose:1000, closeOnClick:true, hideProgressBar:true, transition:Zoom});
        localStorage.removeItem(cardData.id);
        var articletodelete = JSON.parse(localStorage.getItem('articles'));
        for(var i=0;i<articletodelete.length ;i++){
            if(articletodelete[i].id == cardData.id){
                articletodelete.splice(i,1);
            }
        }
        //localStorage.removeItem(articletodelete.id);
        localStorage.setItem('articles',JSON.stringify(articletodelete));
        this.setState({delbookmark:this.state.delbookmark});
    }
    modaldummy(event){
        event.stopPropagation();
        event.preventDefault();        
    }
    handleShow(event) {
        event.stopPropagation();
        event.preventDefault();
        this.setState({ shareshow: true });
    }
    handleClose() {
        this.setState({ shareshow: false });
    }
    render(){
        const {
            width 
        } = this.props;
        let d =  [];
        const {error, isL, delbookmark, expanded} = this.state
        const cardsd = JSON.parse(localStorage.getItem('articles'));
            //console.log(cardsd);
            //console.log(localStorage.getItem('articles'));
            const removingdecoration = {color:'black'}
            
            const cardimagestyle = {
                margin: '5px'
            }
        if(!localStorage.getItem('articles') || JSON.parse(localStorage.getItem('articles')).length == 0){
            return(
                <div style={{textAlign:'center', fontSize:'25px', fontWeight:'550'}}>You have no saved articles</div>
            )
        }
        else{
            
            d = cardsd.map(cardData => {
                return(
                    //<div>Favorites</div>
                    
                    <Col lg={3} style={{ marginBottom:'10px'}} key={cardData.id} >
                            <Link style={{textDecoration:'none'}} to={
                                    {
                                        pathname : `/article`,
                                        search : `?id=${cardData.id}`,
                                        hash: '',
                                        key: 'abc123',
                                        cardProperties : cardData
                                    }} >
                            <Card style={{boxShadow:'4px 4px 4px 4px #c9c9c9'}}>
                                <Card.Body>
                                    <Card.Title style={{fontStyle:'italic', color:'black', fontWeight:'bold'}}>
                                    <Truncate
                                        width={550}
                                        ellipsis={(
                                            <span>...</span>
                                        )}
                                         style={removingdecoration}>
                                        <span>{cardData.title}</span>
                                    </Truncate>
                                        
                                        <span><a > <MdShare onClick={this.handleShow} style={removingdecoration} /></a></span>
                                        <span onClick={this.modaldummy}>
                                            <Modal show={this.state.shareshow} onHide={this.handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>
                                                        <div>
                                                            {(() => {
                                                                if (cardData.newsProvider == 'guardian') {
                                                                        return <p style={{fontWeight:'bolder'}}>
                                                                            GUARDIAN
                                                                        </p>;
                                                                } else{
                                                                    return <p style={{fontWeight:'bolder'}}>
                                                                            NYTIMES
                                                                        </p>;
                                                                }
                                                            })()}
                                                        </div>
                                                        <p style={{fontWeight:'semi-bold'}}>{cardData.title}</p>
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                </Modal.Body>
                                                <div className="share-card-main-style" style={{fontSize:'20px'}}>Share via</div>
                                                <div className="share-card-main-style" >
                                                    <FacebookShareButton className="m-4"
                                                        hashtag="#CSCI_571_NewsApp" url={cardData.url}>
                                                        <FacebookIcon size={65} round={true} />
                                                    </FacebookShareButton>
        
                                                    <TwitterShareButton className="m-4"
                                                        hashtags={["#CSCI_571_NewsApp"]} url={cardData.url}>
                                                        <TwitterIcon size={65} round={true} />
                                                    </TwitterShareButton>
        
                                                    <EmailShareButton className="m-4"
                                                        subject="#CSCI_571_NewsApp" url={cardData.url}>
                                                        <EmailIcon size={65} round={true} />
                                                    </EmailShareButton>
                                                </div>
                                            </Modal><MdDelete onClick={() => this.deleteFavourites(cardData)} />
                                            
                                        </span>
                                        
                                    </Card.Title>
                                    <div>
                                    {(function() {
                                            if(cardData.newsProvider == "guardian"){
                                                if (cardData.imagecheck != null ) {
                                                    if(cardData.imagecheck.length - 1 > 0){
                                                        return <Image style={cardimagestyle} src={cardData.imagecheck[cardData.imagecheck.length - 1].file} thumbnail />;
                                                    }
                                                    else{
                                                        return  <Image style={cardimagestyle} src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" thumbnail/>;
                                                    }
                                                } else {
                                                    return  <Image style={cardimagestyle} src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" thumbnail/>;
                                                }
                                            }
                                            else if (cardData.newsProvider == "nytimes"){
                                                //console.log("reached at nytimes");
                                                if (cardData.imagecheck != null ) {
                                                    for(var k = 0 ; k < cardData.imagecheck.length ; k++){
                                                        if(cardData.imagecheck[k].width >= 2000){
                                                           // console.log("image with width found");
                                                            let imagetoconsider =  "https://www.nytimes.com/" + cardData.imagecheck[k].url;
                                                            return <Image style={cardimagestyle} src={imagetoconsider} thumbnail/>;   
                                                        }  
                                                    }return <Image style={cardimagestyle} src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" thumbnail/>;
                                                }
                                                
                                                else{
                                                    return <Image style={cardimagestyle} src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" thumbnail/>;
                                                }        
                                            }
                                    })()}
                                    </div>
        
                                    <Card.Text style={{fontStyle:'italic', color:'black', fontSize:'13px'}}>
                                        <Row>
                                            <Col xs={4}> 
                                                {cardData.date} 
                                            </Col >
                                            
                                            <Col xs={8} style={{textAlign:'right'}}>
                                            <span>
                                        {(() => {
                                                if (cardData.badge.toUpperCase() == 'WORLD') {
                                                    return <Badge style={{ textAlign:'right',
                                                        color: 'white', backgroundColor: '#8c59cf'
                                                    }}>
                                                        {cardData.badge.toUpperCase()}
                                                    </Badge>;
                                                }
                                                else if (cardData.badge.toUpperCase() == 'POLITICS') {
                                                    return <Badge style={{ textAlign:'right',
                                                        color: 'white', backgroundColor: '#308a5e'
                                                    }}>
                                                        {cardData.badge.toUpperCase()}
                                                    </Badge>;
                                                }
                                                else if (cardData.badge.toUpperCase() == 'BUSINESS') {
                                                    return <Badge style={{ textAlign:'right',
                                                        color: 'white', backgroundColor: '#5896d6'
                                                    }}>
                                                        {cardData.badge.toUpperCase()}
                                                    </Badge>;
                                                }
                                                else if (cardData.badge.toUpperCase() == 'TECHNOLOGY') {
                                                    return <Badge style={{ textAlign:'right',
                                                        color: 'black', backgroundColor: '#c2d62b'
                                                    }}>
                                                        {cardData.badge.toUpperCase()}
                                                    </Badge>;
                                                }
                                                else if (cardData.badge.toUpperCase() == 'SPORT' || cardData.badge.toUpperCase() == 'SPORTS') {
                                                    return <Badge style={{ textAlign:'right',
                                                        color: 'black', backgroundColor: '#fcc065'
                                                    }}>
                                                        SPORTS
                                                    </Badge>;
                                                }
                                                
                                                else {
                                                    return <Badge style={{ textAlign:'right',
                                                        color: 'white', backgroundColor: '#757575'
                                                    }}>
                                                        {cardData.badge.toUpperCase()}
                                                    </Badge>;
                                                }
                                        })()}
        
                                    </span>
                                            <span style={{marginLeft:'5px'}}>
                                            {(() => {
                                                if (cardData.newsProvider == 'guardian') {
                                                        return <Badge style={{ textAlign:'right',
                                                            color: 'white', backgroundColor: 'black'
                                                        }}>
                                                            GUARDIAN
                                                        </Badge>;
                                                } else{
                                                    return <Badge style={{ textAlign:'right',
                                                            color: 'black', backgroundColor: '#e3e3e3'
                                                        }}>
                                                            NYTIMES
                                                        </Badge>;
                                                }
                                            })()} </span>
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Card></Link>
                            </Col>
                );
            });
        }
        return (
            <div>
                {error ? <p>{error.message}</p> : null}
                {!isL ? <div><p style={{marginLeft:'20px', fontWeight:'semi-bold', fontSize:'30px'}}>Favorites</p><div className="d-flex flex-wrap" >{d}</div></div> : <div style={{position:'absolute', top:'50%', bottom:'50%', marginLeft:'45%'}} ><BounceLoader size="60px" color={"#191563"} timeout={1500}/><p>Loading</p></div>}
            </div>
        );
    }
}

