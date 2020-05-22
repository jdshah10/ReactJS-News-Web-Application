import commentBox from 'commentbox.io';
import React from 'react';
export default class CommentBox extends React.Component{
    constructor(props) {
        super(props);
        }
        
    componentDidMount() {
        this.removeCommentBox = commentBox('5750631042121728-proj');
    }
    componentWillUnmount() {
        this.removeCommentBox();
    }
    
    render(){
        let newsData = this.props.newsData;
        return(
            <div className="commentbox" id={newsData}></div>
        );
    }
}
