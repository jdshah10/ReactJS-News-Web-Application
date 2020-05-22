import React from "react";
import Switch from 'react-switch';
import {BrowserRouter} from 'react-router-dom';


class NavSwitch extends React.Component {
    constructor(props) {
      super(props);
      this.state = { checked: localStorage.getItem("toggleValue")=="false" ? false:true };
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(checked) {
      this.setState({ checked },this.sendData);
    }
    sendData(){
        localStorage.setItem("toggleValue",this.state.checked); 
       this.props.onSwitchChange(this.state.checked);
    }

    render() {
      const {checked} = this.state;
      return (
        <div>
        <label>
          <Switch onChange={this.handleChange} checked={this.state.checked} 
            className="nav-switch" height={25}  width={48}
            uncheckedIcon={false} checkedIcon={false}
            onColor="#2693e6" onHandleColor="#ffffff" offColor="#e3e3e3" />
        </label>
        </div>
      );
    }
}

export default NavSwitch;