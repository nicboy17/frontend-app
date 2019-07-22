import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { registerUser } from "../../services/userService";


import './SignUp.scss';

class SignUp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            referralCode: '',
            formValid: true,
            errors: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }

    async handleSignUp(e) {
        e.preventDefault();

        const signup = {
            code: this.state.referralCode,
            password: this.state.password,
            username: this.state.username,
            email: this.state.email
        };

        if(this.formValidator(signup)) {
            try {
                const res = await registerUser(signup);
                if (res.data.code === "Signup successful") {
                    this.props.history.push('/signIn');
                }
            }
            catch(err) {
                this.setState({errors:'Sign up failed, please try again later'});
            }
        }
    }

    render(){
        return <div className="signin-container">
                <div>
                    <form onSubmit={this.handleSignUp} className="needs-validation" noValidate>
                        <div className="form-group">
                            <input type="text" className="form-control" id="username" name="username" placeholder="Username" value={this.state.username.value} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={this.state.password.value} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={this.state.email.value} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="referralCode" name="referralCode" placeholder="Referral code" value={this.state.referralCode.value} onChange={this.handleChange} required />
                        </div>

                        {this.state.errors &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.errors.split("\n").map((i, key) => {
                                return <div key={key}>{i}</div>;
                            })}
                        </div>
                        }

                        <div >
                            <button type="submit" name="signup" className="btn btn-info signup-btn">Sign Up</button>
                        </div>
                    </form>
                </div>
                <div className="signin-options-container">
                    <NavLink to="/signIn" className="signup-link" >Sign In</NavLink>
                    <NavLink to="/forgotpassword" className="forgot-password-link">Forgot</NavLink>

                </div>
            </div>
    }

    formValidator({code, username, password, email}) {
        let errors = '';
        errors += SignUp.usernameValidator(username);
        errors += SignUp.passwordValidator(password);
        errors += SignUp.emailValidator(email);
        errors += SignUp.referralCodeValidator(code);
        if(errors !== '') {
            this.setState({formValid: false});
            this.setState({errors});
        } else {
            this.setState({formValid: true})
        }
        return errors === '';
    }

    static usernameValidator(username) {
        if (username === "" || !username) {
            return "Username must not be empty\n";
        }
        return '';
    }

    static passwordValidator(password) {
        if (password === "" || !password) {
            return "Password must not be empty\n";
        } else if(password.length < 8) {
            return "Password must be at least 8 characters long\n";
        }
        return '';
    }

    static emailValidator(email) {
        // eslint-disable-next-line no-useless-escape
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === "" || !email) {
            return "Email must not be empty\n";
        } else if(!emailPattern.test(email)) {
            return "Email must be valid\n";
        }
        return '';
    }

    static referralCodeValidator(code) {
        const reg = /^\d+$/;

        if(code === "" || !code ) {
            return "Referral code must not be empty\n";
        } else if(!reg.test(code)) {
            return "Referral code must be all digits\n";
        }
        return '';
    }

}

export default SignUp;
