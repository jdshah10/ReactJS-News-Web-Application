import React from 'react';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';
import { EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import { Row, Col, Card, Button } from 'react-bootstrap';
import {FaRegBookmark,FaBookmark, FaAlignJustify} from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import CommentBox from './CommentBox';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';
import {ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from 'react-spinners/BounceLoader';
import ReactTooltip from 'react-tooltip';
//import scrollToComponent from 'react-scroll-to-component';
import { Link, animateScroll as scroll } from "react-scroll";

export default class GuardianDetailedCard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            expanded: false,
            bookmarkedpage: false,
            guardianexdata : null,
           
        };
        this.nytimesDetailedCardDataFetch = this.nytimesDetailedCardDataFetch.bind(this);
        this.guardianDetailedCardDataFetch = this.guardianDetailedCardDataFetch.bind(this);
        this.storeFavourites = this.storeFavourites.bind(this);
        this.removeFavourites = this.removeFavourites.bind(this);
        //this.handleTruncate = this.handleTruncate.bind(this);
        this.toggleDown = this.toggleDown.bind(this);
        this.toggleUp = this.toggleUp.bind(this);
    }

    componentDidMount(){
        this.props.eventHandle();
        console.log("newsValue" + this.props.newsValue);
        console.log("newsProvider" + this.props.location.cardProperties.newsProvider);
        if(this.props.location.cardProperties.newsProvider=="guardian"){
            this.guardianDetailedCardDataFetch();
        }else if (this.props.location.cardProperties.newsProvider=="nytimes")
        {
            this.nytimesDetailedCardDataFetch();
        }
    }

    guardianDetailedCardDataFetch(){
        var articleid = this.props.location.cardProperties.id;
        console.log("g id : " + articleid);
        fetch("https://reactbackend-273804.wl.r.appspot.com/articleguardian?articleId="+articleid)
            .then(res => res.json())
            .then(guardianexdata => {
                this.setState({
                    bookmarkedpage : localStorage.getItem(this.props.location.cardProperties.id)?true : false,
                    guardianexdata: guardianexdata.data.response.content,
                })
            }
            )
            .catch(error => this.setState({ error, isL: false }));
    }

    nytimesDetailedCardDataFetch(){
        var articleid = this.props.location.cardProperties.id;
        console.log("ny id : " + articleid);
        fetch("https://reactbackend-273804.wl.r.appspot.com/articlenytimes?articleId="+articleid)
            .then(res => res.json())
            .then(guardianexdata => {
                this.setState({
                    bookmarkedpage : localStorage.getItem(this.props.location.cardProperties.id)?true : false,
                    guardianexdata: guardianexdata.data.response.docs[0],
                })
            }
            )
            .catch(error => this.setState({ error, isL: false }));
    }

    storeFavourites(excardObj){
        toast(<span style={{color:'black', fontWeight:'semi-bold'}} >Saving {excardObj.title}</span>,{autoClose:1000, closeOnClick:true, hideProgressBar:true, transition:Zoom});
        var articleIdArray = localStorage.getItem('articles') ? JSON.parse(localStorage.getItem('articles')) : []; //debugger;
        localStorage.setItem(this.props.location.cardProperties.id,{id:this.props.location.cardProperties.id});
        var a = excardObj.id;
        var b = excardObj.title;
        var c = excardObj.date;
        var d = excardObj.newsProvider;
        var e = excardObj.imagecheck;
        var f = excardObj.url;
        var g = this.props.location.cardProperties.badge;
        articleIdArray.push({id:a, title:b, date:c, newsProvider:d, imagecheck:e, badge:g, url:f});
        //alert(articleIdArray);
        localStorage.setItem('articles', JSON.stringify(articleIdArray));
        this.setState({bookmarkedpage : true});
    }

    removeFavourites(excardObj){
        toast(<span style={{ color:'black' }} >Removing - {excardObj.title}</span>, {autoClose:1000, closeOnClick:true, hideProgressBar:true, transition:Zoom});
       localStorage.removeItem(excardObj.id);
       var articletoremove = JSON.parse(localStorage.getItem('articles'));
       for(var i=0;i<articletoremove.length ;i++){
           if(articletoremove[i].id == excardObj.id){
               articletoremove.splice(i,1);
           }
       }
       localStorage.setItem('articles',JSON.stringify(articletoremove));
        this.setState({bookmarkedpage : false}); 
               
    }

    // handleTruncate(truncated) {
    //     if (this.state.truncated !== truncated) {
    //         this.setState({
    //             truncated
    //         });
    //     }
    // }
 
    toggleDown(event) {
        scroll.scrollToBottom();
        event.preventDefault();
        //scroll.toggleDown();
        
        this.setState({
            expanded: !this.state.expanded
        });
    }
    toggleUp(event){
        event.preventDefault();
        //scroll.toggleUp();
        scroll.scrollToTop();
        this.setState({
            expanded: !this.state.expanded
        });
    }
    render(){
        console.log("bookmark status : " + this.state.bookmarkedpage);
        if(!this.state.guardianexdata){
            //console.log(this.props);
            return(<div style={{position:'absolute', top:'50%', bottom:'50%', marginLeft:'50%'}} ><BounceLoader size="60px" color={"#191563"} timeout={1500}/><p>Loading</p></div>);
        }else{
        var excardObj = {};
        const {guardianexdata} = this.state;
        //console.log("data : ");
        //console.log(guardianexdata);
        
        if(this.props.location.cardProperties.newsProvider=="guardian"){
            //console.log(this.props.location.cardProperties.newsProvider);
            excardObj = {id:guardianexdata.id, title:guardianexdata.webTitle, url:guardianexdata.webUrl,
            imagecheck:guardianexdata.blocks.main.elements[0].assets, newsProvider:"guardian",
            date:guardianexdata.webPublicationDate.split('T')[0], description:guardianexdata.blocks.body[0].bodyTextSummary}
        }
        else if(this.props.location.cardProperties.newsProvider=="nytimes"){
            excardObj = {id:guardianexdata.web_url, title:guardianexdata.headline.main, url:guardianexdata.web_url,
            imagecheck:guardianexdata.multimedia, newsProvider:"nytimes",
            date:guardianexdata.pub_date.split('T')[0], description:guardianexdata.abstract}
        }
        //console.log(guardianexdata);
        const {
            lines 
        } = this.props;
        
        const {
            expanded,
            bookmarkedpage
        } = this.state;
        //let newsData = this.props.location.cardProperties;
        const cardibodystyle = {
            margin: '10px'
        }
        return(
            <div style={cardibodystyle}>
                <Card key={excardObj.id} style={{padding:'15px', paddingBottom:'0px'}}>
                    <Card.Title style={{fontSize:'35px', fontStyle:'italic'}}>
                        {excardObj.title}
                    </Card.Title>
                    <Row style={{marginBottom:'10px'}}>
                        <Col xs={5}>
                            <Card.Text style={{fontSize:'17px', fontStyle:'italic'}} >
                                {excardObj.date}
                            </Card.Text>
                        </Col>
                        <Col xs={5} style={{textAlign:'right'}}>
                           <FacebookShareButton hashtag="#CSCI_571_NewsApp" url={excardObj.url}>
                                <FacebookIcon size={35} round={true} data-tip="Facebook" data-for='test'/>
                            </FacebookShareButton> 

                             <TwitterShareButton hashtags={["#CSCI_571_NewsApp"]} url={excardObj.url}>
                                <TwitterIcon size={35} round={true} data-tip="Twitter" data-for='test'/>
                            </TwitterShareButton>

                        <EmailShareButton subject="#CSCI_571_NewsApp" url={excardObj.url}>
                                <EmailIcon size={35} round={true} data-tip="Email" data-for='test'/>
                            </EmailShareButton>
                        </Col>
                        <Col xs={2} style={{textAlign:'right'}}>
                            {!bookmarkedpage ? <a data-tip='Bookmark' data-for='test' style={{cursor:'pointer'}} ><FaRegBookmark style={{color:'red'}} size={25} onClick={() => this.storeFavourites(excardObj)} /></a>
                            : <a data-tip='Bookmark' data-for='test' style={{cursor:'pointer'}}><FaBookmark style={{color:'red'}} size={25} onClick={() => this.removeFavourites(excardObj)} /></a>}
                            <ReactTooltip id='test' className="tooltipclass" />  
                        </Col>
                    </Row>
                    {(function() {
                                if(excardObj.newsProvider == "guardian"){
                                    if (excardObj.imagecheck != null ) {
                                        if(excardObj.imagecheck.length - 1 > 0){
                                            return <Card.Img src={excardObj.imagecheck[excardObj.imagecheck.length - 1].file}/>;
                                        }
                                        else{
                                            return <Card.Img src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"/>;
                                        }
                                    } else {
                                        return <Card.Img src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"/>;
                                    }
                                }
                                else if (excardObj.newsProvider == "nytimes"){
                                    if (excardObj.imagecheck != null && excardObj.imagecheck.length > 0) {
                                        for(var k = 0 ; k < excardObj.imagecheck.length ; k++){
                                            if(excardObj.imagecheck[k].width >= 2000){
                                                //console.log("here for");
                                                let imagetoconsider = "https://www.nytimes.com/"+excardObj.imagecheck[k].url;
                                                return <Card.Img src={imagetoconsider}/>;
                                            }
                                        }
                                        return <Card.Img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"/>;
                                    }
                                    else{
                                        return <Card.Img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"/>;
                                    }        
                                }
                            })()}
                    
                       { /*<Card.Text style={{textAlign:'justify'}}>
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
                            onTruncate={this.handleTruncate} style={{textAlign:'justify'}} >
                            {excardObj.description}
                                    
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
                    </Card.Text> */}
                            {(()=> {
                                
                                const para = excardObj.description;
                                const sp_para = para.split(".",4);
                                var a = "";
                                for (var j = 0 ; j < sp_para.length ; j++){
                                    a+= sp_para[j] + ".";
                                }
                                const full_para = excardObj.description.split(".");
                                var b = ""; 
                                
                                for (var i = 0 ; i < full_para.length-1 ; i++){
                                    b += full_para[i] + ".";
                                    
                                }
                                var c = full_para[full_para.length-1];
                                b += c;
                                if(sp_para.length < 4){
                                    return <Card.Text style={{textAlign:'justify'}}>{excardObj.description} </Card.Text>
                                }
                                else{
                                    if(!expanded){
                                        return (<section id="godown"><Card.Text style={{textAlign:'justify'}} >{a}
                                            <span style={{textAlign:'right'}} > 
                                                <div >
                                                    <Row >
                                                        <Col xs={11} ></Col>
                                                        <Col>
                                                        <Link 
                                                            to="goup" smooth={true} duration={1500} offset={-400}>
                                                            <IoIosArrowDown size={30} style={{color:'black'}} onClick={this.toggleDown}/>
                                                            
                                                            </Link>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </span>
                                        </Card.Text></section>);
                                    }
                                    else{
                                    return (<section id="goup"><Card.Text style={{textAlign:'justify'}} id="section2">{b}
                                    <span style={{textAlign:'right'}}>
                                        <div >
                                            <Row>
                                                <Col xs={11}></Col>
                                                <Col>
                                                    <IoIosArrowUp size={30} style={{color:'black'}} onClick={this.toggleUp}/>
                                                    
                                                </Col>
                                            </Row>

                                        </div>
                                    </span>
                                    </Card.Text></section>);
                                    }
                                    
                                } 
                            })()}    


                           
                </Card>
                <div>
                    <CommentBox newsData={excardObj.id}/> 
                </div>
            </div>
        );
      }
    }
}

// GuardianDetailedCard.defaultProps = {
//     lines: 6
// };
 
// GuardianDetailedCard.propTypes = {
//     lines: PropTypes.number,
// };

