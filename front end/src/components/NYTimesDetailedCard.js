import React from 'react';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';
import { EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import { Row, Col, Card, Button } from 'react-bootstrap';
import {FaRegBookmark,FaBookmark} from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import CommentBox from './CommentBox';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class NYTimesDetailedCard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            expanded: false,
            truncated: false,
            bookmarkedpage: false
        };
        this.storeFavourites = this.storeFavourites.bind(this);
        this.removeFavourites = this.removeFavourites.bind(this);
        this.handleTruncate = this.handleTruncate.bind(this);
        this.toggleLines = this.toggleLines.bind(this);
    }

    storeFavourites(id){
        toast(<span style={{color:'black'}} >Saving {id}</span>);
        localStorage.setItem('localstorage-status', true)
        this.setState({bookmarkedpage : true});
        
    }
    removeFavourites(id){
        toast(<span style={{ color:'black' }} >Removing - {id}</span>);
        localStorage.setItem('localstorage-status', true)
        this.setState({bookmarkedpage : false});
        
    }

    handleTruncate(truncated) {
        if (this.state.truncated !== truncated) {
            this.setState({
                truncated
            });
        }
    }
 
    toggleLines(event) {
        event.preventDefault();
 
        this.setState({
            expanded: !this.state.expanded
        });
    }
    /*componentDidMount() {
        if (typeof window !== 'undefined') {
            this.setState({status: localStorage.getItem('localstorage-status') ? true : false})
            window.addEventListener('storage', this.localStorageUpdated)
        }
    }*/

    render(){
        const {
            lines 
        } = this.props;
        
        const {
            expanded,
            truncated,
            bookmarkedpage
        } = this.state;
        let newsData = this.props.location.cardProps;
        const cardibodystyle = {
            margin: '10px'
        }
        // const cardimagestyle = {
        //     margin: '10px'
        // }
        return(
            <div style={cardibodystyle}>
                <Card style={{padding:'15px', paddingBottom:'0px'}}>
                    <Card.Title style={{fontSize:'30px'}}>
                        {newsData.title}
                    </Card.Title>
                    <Row style={{marginBottom:'10px'}}>
                        <Col xs={9}>
                            <Card.Text style={{fontSize:'20px'}} >
                                {newsData.published_date.split('T')[0]}
                            </Card.Text>
                        </Col>
                        <Col md="auto" style={{textAlign:'right', paddingBottom:'10px'}}>
                            <FacebookShareButton hashtag="#CSCI_571_NewsApp" url={newsData.url}>
                                <FacebookIcon size={35} round={true} style={{padding:'0px'}}/>
                            </FacebookShareButton>

                            <TwitterShareButton hashtags={["#CSCI_571_NewsApp"]} url={newsData.url}>
                                <TwitterIcon size={35} round={true} style={{padding:'0px'}}/>
                            </TwitterShareButton>

                            <EmailShareButton subject="#CSCI_571_NewsApp" url={newsData.url}>
                                <EmailIcon size={35} round={true} style={{padding:'0px'}}/>
                            </EmailShareButton>
                        </Col>
                        <Col>
                            {!bookmarkedpage ? <FaRegBookmark style={{color:'red'}} size={25} onClick={() => this.storeFavourites(newsData.title)}/>
                            : <FaBookmark style={{color:'red'}} size={25} onClick={() => this.removeFavourites(newsData.title)}/>}
                            <ToastContainer position="top-center" hideProgressBar="true" autoClose={2000} style={{textAlign:'left'}}
                            />
                                
                        </Col>
                        
                    </Row>
                    {(function() {
                                if (newsData.multimedia != null ) {
                                    if(newsData.multimedia.length - 1 > 0){
                                        return <div > <Card.Img src={newsData.multimedia[newsData.multimedia.length - 1].url} /></div>;
                                    }
                                    else{
                                        return <div > <Card.Img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" /></div>;
                                    }
                                } else {
                                    return <div > <Card.Img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" /></div>;
                                }
                            })()}
                    <div>
                        <Truncate
                            lines={!expanded && lines}
                            ellipsis={(
                                <span style={{textAlign:'right'}} > <a href='#' onClick={this.toggleLines}>
                                    <Row>
                                        <Col xs={11} ></Col>
                                        <Col>
                                            <IoIosArrowDown style={{color:'black'}} size={30}/>
                                        </Col>
                                    </Row>
                                    </a>
                                </span>
                            )}
                            onTruncate={this.handleTruncate} >
                            {newsData.abstract}
                                    
                        </Truncate>
                        {!truncated && expanded && (
                            <span style={{textAlign:'right'}} > <a href='#' onClick={this.toggleLines}>
                                <Row >
                                    <Col xs={11} ></Col>
                                    <Col>
                                        <IoIosArrowUp size={30} style={{color:'black'}} />
                                    </Col>
                                </Row>
                                </a>
                            </span>
                        )}
                    </div> 
                    {/*}        {(()=> {
                                var i = 0;
                                const para = newsData.blocks.body[0].bodyTextSummary;
                                const sp_para = para.split(".",4);
                                var a = "";
                                for (var j = 0 ; j < sp_para.length ; j++){
                                    a+= sp_para[j] + ".";
                                }
                                return <Card.Text>{a}</Card.Text>;
                                })()} 
                    <Row>
                        <Col xs={11} ></Col>
                        <Col>
                        <IoIosArrowDown onClick={this.expandCard} size={45}/>
                        </Col>
                            </Row>      */}


                           
                </Card>
                <div>
                    <CommentBox newsData={newsData}/> 
                </div>
            </div>
        );
    }
}

NYTimesDetailedCard.defaultProps = {
    lines: 4
};
 
NYTimesDetailedCard.propTypes = {
    lines: PropTypes.number,
};