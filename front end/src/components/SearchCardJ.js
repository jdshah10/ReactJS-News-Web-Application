import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';
import { EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import { MdShare } from 'react-icons/md';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import Truncate from 'react-truncate';
import PropTypes from 'prop-types';
export default class SearchCardJ extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        };
        this.modaldummy = this.modaldummy.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    modaldummy(event){
        event.stopPropagation();
        event.preventDefault();        
    }
    handleShow(event) {
        event.stopPropagation();
        event.preventDefault();
        this.setState({ show: true });
    }
    handleClose() {
        this.setState({ show: false });
    }
    render(){
        const {
            width 
        } = this.props;
        const {expanded} = this.state;
        let newsData = this.props.newsData;
        const removingdecoration = {color:'black'}
        const cardimagestyle = {
            margin: '5px'
        }
        return(
                <Col lg={3} style={{ marginBottom:'10px', textDecoration:'none'}}>
                    <Link style={{textDecoration:'none'}} to={
                            {
                                pathname : `/article`,
                                search : `?id=${newsData.id}`,
                                hash: '',
                                key: 'abc123',
                                cardProperties : newsData
                            }} >
                    <Card style={{boxShadow:'4px 4px 4px 4px #c9c9c9'}}>
                        <Card.Body>
                            <Card.Title style={{fontStyle:'italic', color:'black', fontWeight:'bold'}}>
                              <Truncate width = {550}
                                        
                                        ellipsis={(
                                            <span>...</span>
                                        )}
                                         style={removingdecoration}>
                                        <span>{newsData.title}</span>
                                    </Truncate> 
                                <a > <MdShare onClick={this.handleShow} style={removingdecoration} /></a>
                                <div onClick={this.modaldummy}>
                                    <Modal show={this.state.show} onHide={this.handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title><p>{newsData.title}</p></Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        </Modal.Body>
                                        <div className="share-card-main-style" style={{fontSize:'20px'}}>Share via</div>
                                        <div className="share-card-main-style" >
                                            <FacebookShareButton className="m-4"
                                                hashtag="#CSCI_571_NewsApp" url={newsData.url}>
                                                <FacebookIcon size={65} round={true} />
                                            </FacebookShareButton>

                                            <TwitterShareButton className="m-4"
                                                hashtags={["#CSCI_571_NewsApp"]} url={newsData.url}>
                                                <TwitterIcon size={65} round={true} />
                                            </TwitterShareButton>

                                            <EmailShareButton className="m-4"
                                                subject="#CSCI_571_NewsApp" url={newsData.url}>
                                                <EmailIcon size={65} round={true} />
                                            </EmailShareButton>
                                        </div>
                                    </Modal>
                                </div>
                            </Card.Title>
                            <div>
                            {(function() {
                                    if(newsData.newsProvider == "guardian"){
                                        if (newsData.imagecheck != null ) {
                                            if(newsData.imagecheck.length - 1 > 0){
                                                return <Image style={cardimagestyle} src={newsData.imagecheck[newsData.imagecheck.length - 1].file} thumbnail />;
                                            }
                                            else{
                                                return  <Image style={cardimagestyle} src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" thumbnail/>;
                                            }
                                        } else {
                                            return  <Image style={cardimagestyle} src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" thumbnail/>;
                                        }
                                    }
                                    else if (newsData.newsProvider == "nytimes"){
                                        //console.log("reached at nytimes");
                                        if (newsData.imagecheck != null ) {
                                            for(var k = 0 ; k < newsData.imagecheck.length ; k++){
                                                if(newsData.imagecheck[k].width >= 2000){
                                                   // console.log("image with width found");
                                                    let imagetoconsider =  "https://www.nytimes.com/" + newsData.imagecheck[k].url;
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

                            <Card.Text style={{fontStyle:'italic', textDecoration:'none', color:'black', fontSize:'13px'}}>
                                <Row>
                                    <Col xs={4}>
                                        {newsData.date} 
                                    </Col >
                                    <Col xs={8} style={{textAlign:'right'}}>
                                    <span>
                                {(() => {
                                        if (newsData.badge.toUpperCase() == 'WORLD') {
                                            return <Badge style={{ textAlign:'right',
                                                color: 'white', backgroundColor: '#8c59cf'
                                            }}>
                                                {newsData.badge.toUpperCase()}
                                            </Badge>;

                                        }

                                        else if (newsData.badge.toUpperCase() == 'POLITICS') {
                                            return <Badge style={{ textAlign:'right',
                                                color: 'white', backgroundColor: '#308a5e'
                                            }}>
                                                {newsData.badge.toUpperCase()}
                                            </Badge>;
                                        }
                                        else if (newsData.badge.toUpperCase() == 'BUSINESS') {
                                            return <Badge style={{ textAlign:'right',
                                                color: 'white', backgroundColor: '#5896d6'
                                            }}>
                                                {newsData.badge.toUpperCase()}
                                            </Badge>;
                                        }
                                        else if (newsData.badge.toUpperCase() == 'TECHNOLOGY') {
                                            return <Badge style={{ textAlign:'right',
                                                color: 'black', backgroundColor: '#c2d62b'
                                            }}>
                                                {newsData.badge.toUpperCase()}
                                            </Badge>;
                                        }
                                        else if (newsData.badge.toUpperCase() == 'SPORT' || newsData.badge.toUpperCase() == 'SPORTS') {
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
                                                {newsData.badge.toUpperCase()}
                                            </Badge>;
                                        }
                                })()}

                            </span>
                                    </Col>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Card></Link>
                    </Col>
        );
    }
}

