import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Profile from '.Profile';

class ProfilePage extends React.Component {
// this goes with the profile page

    
};

function mapStateToProps(state) {
    return {
        pageState: state
    }
}
export default connect(mapStateToProps)(ProfilePage);