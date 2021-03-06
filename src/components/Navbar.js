import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import ShortButton from '../utils/shortButton'
// Redux
import {connect} from 'react-redux'

// Material-UI
import Appbar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
// Icons
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'

export class Navbar extends Component {
  render() {
    const {authenticated} = this.props
    return (
      <Appbar>
        <Toolbar className="nav-container">
          {authenticated? (<>
          <ShortButton tip="Create a post!">
            <AddIcon color="primary"/>
          </ShortButton>
          <ShortButton tip="Home">
            <HomeIcon color='primary'/>
          </ShortButton>
          <ShortButton tip='notification'>
            
          </ShortButton>
          </>):(
          <>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/signup">Signup</Button>
          </>)}
        </Toolbar>
      </Appbar>
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state =>({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
