import React, { Component } from 'react'
import PropTypes from 'prop-types'
import theme from '../utils/theme'
import {connect} from 'react-redux'
import {editUserDetails} from '../redux/actions/userActions'

// Material UI
import withStyles from '@material-ui/core/styles/withStyles'
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton'

// Icons
import EditIcon from '@material-ui/icons/Edit'


const styles = theme 

export class EditDetail extends Component {
    state={
        bio:'',
        location:'',
        website:'',
        open: false
    }
    mapUserDetailsToState = credentials =>{
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location ? credentials.location : '',
            website: credentials.website ? credentials.website : ''
        })
    }
    componentDidMount(){
        const {credentials} = this.props
        this.mapUserDetailsToState(credentials)
    }
    handleOpen = () =>{
        this.setState({open:true})
        this.mapUserDetailsToState(this.props.credentials)
    }
    handleClose=()=>{
        this.setState({open:false})
    }
    handleSubmit=()=>{
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails)
        this.handleClose()
    }
    handleChange =(event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
  render() {
      const classes = this.props
    return (
      <>
        <Tooltip title="Edit details" placement="top">
        <IconButton onClick={this.handleOpen} className={classes.Button}>
            <EditIcon color="primary"/>
        </IconButton>
        </Tooltip>
        <Dialog open={this.state.open} onClose={this.handleClose}
        fullWidth maxWidth='sm'>
            <DialogTitle>Edit your details</DialogTitle>
            <DialogContent>
                <form>
                    <TextField name="bio" type="text" label="Bio" multiline rows='3' placeholder='A short bio about yourself'
                    className={classes.textField} value={this.state.bio} onChange={this.handleChange} fullWidth></TextField>
                    <TextField name="location" type="text" label="Location" placeholder='Where you live'
                    className={classes.textField} value={this.state.location} onChange={this.handleChange} fullWidth></TextField>
                    <TextField name="website" type="text" label="Website" placeholder='Your website'
                    className={classes.textField} value={this.state.website} onChange={this.handleChange} fullWidth></TextField>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">Cancel</Button>
                <Button onClick={this.handleSubmit} color='primary'>Submit</Button>
            </DialogActions>
        </Dialog>
      </>
    )
  }
}

EditDetail.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    credentials: state.user.credentials
})
export default connect(mapStateToProps, {editUserDetails})(EditDetail)
// (withStyles(styles)(EditDetail))
