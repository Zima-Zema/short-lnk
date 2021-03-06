import React, {Component} from 'react';
import {Meteor} from "meteor/meteor";
import Modal from 'react-modal';

export default class AddLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:'',
            error: '',
            modalIsOpen: false
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let url = this.state.url; //this.refs.url.value.trim();
        let userId = Meteor.userId();

        Meteor.call('links.insert', url, (err, res) => {
            if (err) {
                this.setState({error: err.reason});
            } else {
                this.closeModal();
                // this.refs.url.value = '';
            }
        });

    }
    closeModal() {
        this.setState({modalIsOpen: false,error: '', url:''})
      }
    onChangeUrl(e){
        let theUrl = e.target.value;
        this.setState({
            url:theUrl
        })
    }
    render() {
        return (
            <div>
                <button className="button" onClick={()=> this.setState({modalIsOpen: true})}>+ Add Link</button>
                <Modal className="boxed-view__box" overlayClassName="boxed-view boxed-view--modal" ariaHideApp={false} onRequestClose={this.closeModal.bind(this)} onAfterOpen={()=> this.refs.url.focus()} isOpen={this.state.modalIsOpen} contentLabel="Add Link">
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : null}
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                        <input onChange={this.onChangeUrl.bind(this)} type="text" value={this.state.url} name="url" ref="url" id="txt_url" placeholder="URL"/>
                        <button className="button">Add Link</button>
                        <button type="button" className="button button--secondary" onClick={this.closeModal.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        )
    }
}