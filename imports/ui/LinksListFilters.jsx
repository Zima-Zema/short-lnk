import React, {Component} from 'react';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session'
export default class LinksListFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showVisible: true
        }
    }
    componentDidMount() {
        this.visibleTracker = Tracker.autorun(() => {
            this.setState({
                showVisible: Session.get("showVisible")
            });
        });

    }
    componentWillUnmount() {
        this
            .visibleTracker
            .stop();
    }
    toggelCheckBox(e) {
        Session.set("showVisible", !e.target.checked);
    }
    render() {
        return (
            <div>
                <input
                    onChange={this.toggelCheckBox.bind(this)}
                    type="checkbox"
                    name="checkbox"
                    id="checkbox_id"
                    checked={!this.state.showVisible}/>
                <label htmlFor="checkbox_id">show hidden links</label>
            </div>
        );
    }
}
