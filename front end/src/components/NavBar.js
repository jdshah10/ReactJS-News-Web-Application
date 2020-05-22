import React from "react";
import {Navbar,Nav} from 'react-bootstrap';
import {FaRegBookmark, FaBookmark} from 'react-icons/fa';
import NavAutoSuggestData from './NavAutoSuggestData';
import NavSwitch from './NavSwitch';
import GuardianCard from './GuardianCardFE';
import NYTimesCard from './NYTimesCardFE';
import {HashRouter as Router,Switch,Route,Link} from "react-router-dom";
import GuardianDetailedCard from "./GuardianDetailedCard";
import ReactTooltip from 'react-tooltip';
import SearchCardDisplay from './SearchCardDisplay';
import WorldCardGuardian from './WorldCardGuardian';
import WorldCardNYTimes from './WorldCardNYTimes';
import PoliticsCardGuardian from './PoliticsCardGuardian';
import PoliticsCardNYTimes from './PoliticsCardNYTimes';
import BusinessCardGuardian from './BusinessCardGuardian';
import BusinessCardNYTimes from './BusinessCardNYTimes';
import TechnologyCardGuardian from './TechnologyCardGuardian';
import TechnologyCardNYTimes from './TechnologyCardNYTimes';
import SportsCardGuardian from './SportsCardGuardian';
import SportsCardNYTimes from './SportsCardNYTimes';
import FavoriteCards from "./FavoriteCards";
import {ToastContainer} from 'react-toastify';
class NavBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {uniqueid:0, newsValue: localStorage.getItem("toggleValue")=="false"?false:true, toggleShow:true, bookmarkicon:true}
    this.renderOnValue = this.renderOnValue.bind(this);
    this.handleState = this.handleState.bind(this);
    this.showAgain = this.showAgain.bind(this);
    this.handleBookmarkState = this.handleBookmarkState.bind(this);
    this.removeBookmarkToolTip = this.removeBookmarkToolTip.bind(this);
  }

  removeBookmarkToolTip(){
    ReactTooltip.hide();
  }

  renderOnValue(newsValue){
    window.location.reload();
    this.setState({
      newsValue:newsValue,
      toggleShow : true
    });
     //console.log("current state in child : " + newsValue);
  }

  handleState(){
    this.setState({
      toggleShow : false,
      bookmarkicon : true
    });
  }

  handleBookmarkState(){
    this.setState({
      toggleShow :  false,
      bookmarkicon : false

    });
  }

  showAgain(){

    this.setState({
      toggleShow : true,
      bookmarkicon : true,
      uniqueid: this.state.uniqueid+1
    })
  }

  render(){

    const {newsValue, toggleShow, bookmarkicon, uniqueid} = this.state;
    const hometoggle = newsValue ? <GuardianCard /> : <NYTimesCard/>;
    const worldtoggle = newsValue ? <WorldCardGuardian/> : <WorldCardNYTimes/>;
    const politicstoggle = newsValue ? <PoliticsCardGuardian/> : <PoliticsCardNYTimes/>
    const businesstoggle = newsValue ? <BusinessCardGuardian/> : <BusinessCardNYTimes/>
    const technologytoggle = newsValue ? <TechnologyCardGuardian/> : <TechnologyCardNYTimes/>
    const sportstoggle = newsValue ? <SportsCardGuardian/> : <SportsCardNYTimes/>
    return(
      <Router>
      <div>
        <div>
          <ToastContainer position="top-center" style={{textAlign:'left'}}/>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark"
            className="navbar-main">
              <NavAutoSuggestData key={this.state.uniqueid}/> 
        
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav key={this.state.uniqueid+100} className="mr-auto" >
                      <Nav.Link as={Link} onClick={this.showAgain} to="/" href="/" className={window.location.href.endsWith("#/")?"nav-link active":null}>Home</Nav.Link>
                      <Nav.Link as={Link} onClick={this.showAgain} className={window.location.href.indexOf("World")!=-1?"nav-link active":null} to="/World" href="/World">World</Nav.Link>
                      <Nav.Link as={Link} onClick={this.showAgain} className={window.location.href.indexOf("Politics")!=-1?"nav-link active":null} to="/Politics" href="/Politics">Politics</Nav.Link>
                      <Nav.Link as={Link} onClick={this.showAgain} className={window.location.href.indexOf("Business")!=-1?"nav-link active":null} to="/Business" href="/Business">Business</Nav.Link>
                      <Nav.Link as={Link} onClick={this.showAgain} className={window.location.href.indexOf("Technology")!=-1?"nav-link active":null} to="/Technology" href="/Technology">Technology</Nav.Link>
                      <Nav.Link as={Link} onClick={this.showAgain} className={window.location.href.indexOf("Sports")!=-1?"nav-link active":null} to="/Sports" href="/Sports">Sports</Nav.Link>
                  </Nav>
                  <Link data-place='bottom' data-tip='Bookmark' data-for='testnav' to={
                    {
                        pathname : `/favorites`,
                        //search : `?id=${newsData.id}`,
                        hash: '',
                        key: 'abc123',
                        //cardProperties : newsData
                    }}>
                    {bookmarkicon ? 
                     <FaRegBookmark className="nav-bookmark" size={25} onClick={this.removeBookmarkToolTip}/> 
                    : <FaBookmark className="nav-bookmark" size={25}/>} 
                    <ReactTooltip id='testnav'/> 
                  </Link>
             
                {toggleShow ? <p className="nav-nytimes"> NYTimes </p> : <p></p>}
                {toggleShow ? <NavSwitch onSwitchChange = {this.renderOnValue}/> : <p></p>} 
                {toggleShow ? <p className="nav-guardian"> Guardian </p>:<p></p>} 
                   
                </Navbar.Collapse>
            </Navbar>
        </div>
    </div>
    <Switch>
        <Route path="/" exact>{hometoggle}</Route>
        <Route path="/World" exact>{worldtoggle}</Route>
        <Route path="/Politics" exact>{politicstoggle}</Route>
        <Route path="/Business" exact>{businesstoggle}</Route>
        <Route path="/Technology" exact>{technologytoggle}</Route>
        <Route path="/Sports" exact>{sportstoggle}</Route>
        <Route path="/article" render={(props) => <GuardianDetailedCard {...props} eventHandle={this.handleState} newsValue={newsValue}/>} />
        <Route path="/search" render={(props) => <SearchCardDisplay {...props} eventHandle={this.handleState} newsValue={newsValue} />} />
        <Route path="/favorites" render={(props) => <FavoriteCards {...props} eventHandle={this.handleBookmarkState} />} />
    </Switch>
    </Router>
  );
  } 
}
export default NavBar;

