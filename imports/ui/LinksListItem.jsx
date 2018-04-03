import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import  Clipboard from 'clipboard';
import moment from 'moment';
export default class LinksListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            justCopied:false
        }
    }
    setVisibility(){
        Meteor.call('links.setVisibility',this.props._id,!this.props.visible,(err,res)=>{
            if (err) {
                // console.log(err);
            }
            else{
                // console.log("updated",res);
            }
        })
    }
    deleteLink(){
        Meteor.call('links.delete',this.props._id,(err,res)=>{
            if (err) {
                // console.log(err);
            }
            else{
                // console.log("delete res", res);
            }
        })
    }
    componentDidMount(){
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success',()=>{
            this.setState({justCopied:true});
            setTimeout(()=>{
                this.setState({justCopied:false});
            },1000);
        });
        this.clipboard.on('error',()=>{
            alert('OOPS');
        })
    }
    componentWillUnmount(){
        this.clipboard.destroy();
    }
    renderStats(){
        const visitMsg = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMsg = null;
        if (typeof this.props.lastVisitedAt === 'number') {
            visitedMsg = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`
        }
        return <p className="item__msg">{this.props.visitedCount} {visitMsg} {visitedMsg}</p>;
    }
    render(){
        return (
            <div className="item">
                <div>
                    <h2>{this.props.url}</h2>
                    <p className="item__msg">{this.props.shortUrl}</p>
                    {this.renderStats()}
                    <div>
                        <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit</a>
                        <button className="button button--pill" ref="copy"  data-clipboard-text={this.props.shortUrl} >{this.state.justCopied ? "Copied" : "Copy"}</button>
                        <button className="button button--pill" onClick={this.setVisibility.bind(this)}>{this.props.visible ? "Hide" : "Unhide"}</button>
                        <button className="button button--pill" onClick={this.deleteLink.bind(this)}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    shortUrl:PropTypes.string.isRequired,
    userId:PropTypes.string.isRequired,
    visible:PropTypes.bool.isRequired,
    visitedCount:PropTypes.number.isRequired,
    lastVisitedAt:PropTypes.number
}