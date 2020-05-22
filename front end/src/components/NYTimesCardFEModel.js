import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Truncate from 'react-truncate';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';
import { EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import { MdShare } from 'react-icons/md';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class NYTimesCardJ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            truncated: false,
            expanded: false,
            show: false
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTruncate = this.handleTruncate.bind(this);
        this.modaldummy = this.modaldummy.bind(this);

    }
    handleTruncate(truncated) {
        if (this.state.truncated !== truncated) {
            this.setState({
                truncated
            });
        }
    }
    modaldummy(event){
        event.stopPropagation();
        event.preventDefault();        
    }

    handleShow(event) {
        event.stopPropagation();
        event.preventDefault();
        //alert('Hello!');
        this.setState({ show: true });
    }
    handleClose() {
        //alert('closed');
        this.setState({ show: false });
    }
    render(){
        const {
            lines 
        } = this.props;
 
        const {
            truncated,
            expanded
        } = this.state;

        const cardimagestyle = {
            margin: '20px'
        }
        const cardbody = {
            display: 'inline-block'
        }
        const removingdecoration = {color:'black'}
        let newsData = this.props.newsData;

        return (
            <div style={{padding:'20px', textDecoration:'none'}}> <Link to={
                {
                    pathname : `/article`,
                    search : `?id=${newsData.title}`,
                    hash: '',
                    key: 'abc123',
                    cardProps : newsData
                }} >
             
                <Card >
                    <Row>
                        <Col xs={3}>
                            {(function() {
                                if (newsData.multimedia != null ) {
                                    if(newsData.multimedia.length - 1 > 0){
                                        return <Image style={cardimagestyle} src={newsData.multimedia[newsData.multimedia.length - 1].url} thumbnail/>;
                                    }
                                    else{
                                        return <Image style={cardimagestyle} src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" thumbnail/>;
                                    }
                                } else {
                                    return  <Image style={cardimagestyle} src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" thumbnail/>;
                                }
                            })()}
                            
                        </Col>
                        <Col xs={9}>
                            <Card.Body style={cardbody}>
                                <Card.Title style={removingdecoration}>
                                    {newsData.title}

                                    <a > <MdShare onClick={this.handleShow} style={removingdecoration} /></a>
                                    <div onClick={this.modaldummy}>
                                        <Modal show={this.state.show} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>{newsData.title}</Modal.Title>
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
                                    <Truncate
                                        lines={!expanded && lines}
                                        ellipsis={(
                                            <span>...</span>
                                        )}
                                        onTruncate={this.handleTruncate} style={removingdecoration}>
                                        {newsData.abstract}
                                    </Truncate>
                                </div>

                                <Row>
                                    <Col xs={10}>
                                        <Card.Text style={removingdecoration}>
                                            {newsData.published_date.split('T')[0]}
                                        </Card.Text>
                                    </Col>
                                    <Col xs={2}>
                                    {(()=> {
                                        if (newsData.section.toUpperCase() == 'WORLD') {
                                            return <Badge style={{ textAlign:'right',
                                                color:'white', backgroundColor:'#591f8c'
                                            }}>
                                            {newsData.section.toUpperCase()}
                                            </Badge>;
                                        } 
                                        else if (newsData.section.toUpperCase() == 'POLITICS') {
                                            return <Badge style={{ textAlign:'right',
                                                color:'white', backgroundColor:'#3c9958'
                                            }}>
                                            {newsData.section.toUpperCase()}
                                            </Badge>;
                                        }
                                        else if (newsData.section.toUpperCase() == 'BUSINESS') {
                                            return <Badge style={{ textAlign:'right',
                                                color:'white', backgroundColor:'#09a6ba'
                                            }}>
                                            {newsData.section.toUpperCase()}
                                            </Badge>;
                                        }
                                        else if (newsData.section.toUpperCase() == 'TECHNOLOGY') {
                                            return <Badge style={{ textAlign:'right',
                                                color:'black', backgroundColor:'#87ad79'
                                            }}>
                                            {newsData.section.toUpperCase()}
                                            </Badge>;
                                        }
                                        else if (newsData.section.toUpperCase() == 'SPORT') {
                                            return <Badge style={{ textAlign:'right',
                                                color:'black', backgroundColor:'#d4a155'
                                            }}>
                                            {newsData.section.toUpperCase() + "S"}
                                            </Badge>;
                                        }
                                        else if (newsData.section == 'NY Times Favorite') {
                                            return <Badge style={{ textAlign:'right',
                                                color:'black', backgroundColor:'grey'
                                            }}>
                                            NYTIMES
                                            </Badge>;
                                        }
                                        else {
                                            return <Badge style={{ textAlign:'right',
                                                color:'white', backgroundColor:'grey'
                                            }}>
                                            {newsData.section.toUpperCase()}
                                            </Badge>;
                                        }
                                    })()}
                                        
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Link>
        </div>
        );
    }
}
                
export default NYTimesCardJ;
NYTimesCardJ.defaultProps = {
    lines: 3
};
 
NYTimesCardJ.propTypes = {
    lines: PropTypes.number,
};