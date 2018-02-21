import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  Clipboard from 'clipboard';

export default class LinksListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            justCopied:false
        }
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
    render(){
        return (
            <div>
                <div>
                    <h2>{this.props.url}</h2>
                    <p>{this.props.shortUrl}</p>
                    <p>visit</p>
                    <div>
                        <a href="#">VISIT</a>
                        <button ref="copy"  data-clipboard-text={this.props.shortUrl} >{this.state.justCopied ? "Copied" : "Copy"}</button>
                        <button>Hide</button>
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
    visible:PropTypes.bool.isRequired
}