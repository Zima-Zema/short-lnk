import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
    return (
        <div className="title-bar">
            <div className="wrapper title-bar__content">
                <h1 className="title-bar__title">{props.title}</h1>
                <button className="button button--link" onClick={()=> Accounts.logout()}>LogOut</button>
            </div>
        </div>
    );
}
PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PrivateHeader;