import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/rage.ico'
import { Link } from 'react-router-dom';
// Material
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { CircularProgress } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
// Redux
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userActions'

const styles= {
    palette: {
      primary: {
        light: '#f28933',
        main: '#ef6c00',
        dark: '#a74b00',
        contrastText: '#fafafa',
      },
      secondary: {
        light: '#67daff',
        main: '#03a9f4',
        dark: '#007ac1',
        contrastText: '#fafafa',
      },
    },form:{
      textAlign:'center'
    },
    image:{
      borderRadius:'5%',
      margin: '20px auto 20px auto',
      width: '150px'
    },
    pageTitle:{
      margin: '10px auto 10px auto'
    },
    textField:{
      margin: '10px auto 10px auto'
    },
    button:{
      marginTop: 20,
      position: 'relative'
    },
    customError:{
      color:'red',
      fontSize:'0.8rem'
    },
    progress:{
      position: 'absolute'
    },
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
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
          color: 'primary.main'
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
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }


export class signup extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            confirmPassword:'',
            loading: false,
            handle:'',
            error:{}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors)
        this.setState({error: nextProps.UI.errors})
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }        
    this.props.signupUser(newUserData, this.props.history)
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const {classes, UI:{loading}} = this.props
        const {error} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="RageyBoy" className={classes.image}/>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Sign up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name ="email" type="email" label="Email" className={classes.textField}
                        value={this.state.email} onChange={this.handleChange} fullWidth  helperText={error.email}
                        error={error.email ? true : false}/>
                        
                        <TextField id="password" name ="password" type="password" label="Password" className={classes.textField}
                        value={this.state.password} onChange={this.handleChange} fullWidth helperText={error.password} 
                        error={error.password ? true : false}/>

                        <TextField id="confirmPassword" name ="confirmPassword" type="password" label="Confirm Password" className={classes.textField}
                        value={this.state.confirmPassword} onChange={this.handleChange} fullWidth helperText={error.confirmPassword} 
                        error={error.confirmPassword ? true : false}/>

                        <TextField id="handle" name ="handle" type="text" label="Handle" className={classes.textField}
                        value={this.state.handle} onChange={this.handleChange} fullWidth helperText={error.handle} 
                        error={error.handle ? true : false}/>

                        {error.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {error.general}
                            </Typography>
                        )}

                        <Button type="submit" variant="contained" color="secondary" 
                        className={classes.button} disabled={loading}>
                            Sign up
                        {loading && (<CircularProgress size={30} className={classes.progress}/>)}</Button>

                        <br></br>
                        <small>Already have an account? Log in <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) =>({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup))
