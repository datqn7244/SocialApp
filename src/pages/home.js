import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Scream from '../components/Scream'
import Profile from '../components/Profile'
export class home extends Component {
    state = {
        screams: null
    }
    componentDidMount(){
            axios.get('/screams')
            .then(res=>{
                this.setState({
                    screams: res.data
                })
            })
            .catch(error=>console.log(error))
    }
    render() {
        let recentScreamsMarkup = this.state.screams ?  (
            this.state.screams.map(scream=><Scream key={scream.screamId}scream={scream}/>)
        ) : <p>Loading...</p>
        return (
            <div>
                <Grid container spacing={10}>
                    <Grid item sm={8} xs={12}>
                        {recentScreamsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Profile/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default home
