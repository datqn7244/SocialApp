import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import EditDetail from './EditDetail'
// Redux
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser, uploadImage} from '../redux/actions/userActions'
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import theme from '../utils/theme'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
// Icon
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip } from '@material-ui/core';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

const styles = {
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '85%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    },
    '& button': {
      left: '80%'}
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
  }

export class Profile extends Component {
  //Avatar change function
  handleImageChange = (event) =>{
    const image = event.target.files[0]
    // send to server
    const formData = new FormData()
    formData.append('avatar', image, image.name)
    this.props.uploadImage(formData)
  }
  // function for Icon
  handleEditPicture = (event) =>{
    const fileInput = document.getElementById('newAvatar')
    fileInput.click()
  }
  // Logout function
  handleLogout = (event) =>{
    this.props.logoutUser()
  }
  render() {
    const {classes, 
      user: {credentials:{handle, createdAt, bio, website, location, imageUrl}, 
        loading, authenticated}} = this.props 
      // Profile display
    let profileMarkup = !loading ? (authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            {/* Showing user avatar */}
            <img src={imageUrl} alt="avatar" className="profile-image"/>
            {/* Upload new avatar */}
            <input type="file" id="newAvatar" onChange={this.handleImageChange} hidden="hidden"/>
            {/* Uploading Button */}
            <Tooltip title="Edit profile picture" placement ="top">
            <IconButton onClick={this.handleEditPicture} className="button">
              <EditIcon color = "primary"/>
            </IconButton>
            </Tooltip>
          </div>
          <hr/>
          <div className="profile-details">
            {/* User nickname or handle */}
            <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                    @{handle}
            </MuiLink>
            <hr/>
            {/* User bio */}
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr/>
            {/* User locatoion */}
            {location && (
                  <>
                  <LocationOn color="primary"/> <span>{location}</span>
                  <hr/>
                  </>
            )}
            {/* User website */}
            {website && (
                  <>
                  <LinkIcon color="primary"/>
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {''}{website}
                  </a>
                  <hr/>
                  </>
            )}
            {/* Joined date */}
            <CalendarToday color="primary"/>{''}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <Tooltip title="Log out" placement="top">
            <IconButton onClick={this.handleLogout} className="button">
              <KeyboardReturn color="primary"/>
            </IconButton>
          </Tooltip>

          <EditDetail/>
        </div>
      </Paper>
    ):(
      // When not logged in, show login and signup button
    <Paper className={classes.paper}>
      <Typography variant="body2" align="center">
          No profile found, please login
      </Typography>
      <div className={classes.buttons}>
        <Button variant="contained" color="primary" component={Link} to="/login"> 
            Login
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/signup">
            Signup
        </Button>
      </div>
    </Paper>)) : (<p>loading...</p>)
    return profileMarkup
    
  }
}
const mapStateToProps = (state) =>({
  user: state.user
})

const mapActionsToProps = {logoutUser, uploadImage}

Profile.propTypes={
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
