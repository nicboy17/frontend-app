import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchToken, loginUser } from '../../actions/signInActions';
import { NavLink, Redirect } from 'react-router-dom';

import './SignIn.scss';

class SignIn extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            formValid: true,
            errors: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }

    handleSignIn(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        if(this.formValidator(user)) {
            this.props.loginUser(user);
        }
    }

    render(){
        let isSuccess, msg;

        if (this.props.UserStore.hasOwnProperty('response')) {
            if(this.props.UserStore.response !== undefined){
                isSuccess = true;
            } else {
                isSuccess = false;
                msg = 'please try again later';
            }
        }

        return (
            <div className="signin-container">
                <div >
                    <form onSubmit={this.handleSignIn} className="needs-validation" noValidate>
                        <div className="form-group">
                            <input type="text" className="form-control" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                        </div>

                        {!isSuccess ? <div>{msg}</div> : <Redirect to='dashboard' />}

                        {this.state.errors &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.errors.split("\n").map((i, key) => {
                                return <div key={key}>{i}</div>;
                            })}
                        </div>
                        }

                        <div>
                            <button type="submit" name="signIn" className="btn btn-info signin-btn">Login</button>
                        </div>
                    </form>
                </div>
                <div className="signup-options-container">
                    <NavLink to="/signup" className="signup-link">Sign Up</NavLink>
                    <NavLink to="/forgotpassword" className="forgot-password-link">Forgot</NavLink>
                </div>
            </div>
        );
    }

    formValidator({username, password}) {
        let errors = '';
        if (username === "" || !username) {
            errors += "Username must not be empty\n";
        }
        if (password === "" || !password) {
            errors += "Password must not be empty\n";
        }
        if(errors !== '') {
            this.setState({formValid: false});
            this.setState({errors});
        } else {
            this.setState({formValid: true})
        }
        return errors === '';
    }

}

function mapStateToProps(state){
    return {
        UserStore: state.UserStore
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchToken, loginUser
        },
        dispatch
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)
