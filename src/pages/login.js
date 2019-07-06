import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/rage.ico'
import { Link } from 'react-router-dom';
// Material
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { CircularProgress } from '@material-ui/core';
// Redux
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'
import theme from '../utils/theme';

// const styles={
//     form:{
//         textAlign:'center'
//     },
//     image:{
//         borderRadius:'5%',
//         margin: '20px auto 20px auto',
//         width: '150px'
//     },
//     pageTitle:{
//         margin: '10px auto 10px auto'
//     },
//     textField:{
//         margin: '10px auto 10px auto'
//     },
//     button:{
//         marginTop: 20,
//         position: 'relative'
//     },
//     customError:{
//         color:'red',
//         fontSize:'0.8rem',
//         marginTop: '10px'
//     },
//     progress:{
//     position: 'absolute'
//     }
// }

const styles = theme
export class login extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            error:{}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors)
        this.setState({error: nextProps.UI.errors})
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
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
                        Log in
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name ="email" type="email" label="Email" className={classes.textField}
                        value={this.state.email} onChange={this.handleChange} fullWidth  helperText={error.email}
                        error={error.email ? true : false}/>
                        
                        <TextField id="password" name ="password" type="password" label="Password" className={classes.textField}
                        value={this.state.password} onChange={this.handleChange} fullWidth helperText={error.password} 
                        error={error.password ? true : false}/>

                        {error.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {error.general}
                            </Typography>
                        )}

                        <Button type="submit" variant="contained" color="secondary" 
                        className={classes.button} disabled={loading}>
                            Login
                        {loading && (<CircularProgress size={30} className={classes.progress}/>)}</Button>

                        <br></br>
                        <small>Don't have an account? Sign up <Link to="/signup">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps={
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
