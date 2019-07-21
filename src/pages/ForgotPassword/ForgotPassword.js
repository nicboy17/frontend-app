import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { resetPassword } from "../../services/userService";


import './ForgotPassword.scss';

class ForgotPassword extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            formValid: true,
            errors: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }

    async handleResetPassword(e) {
        e.preventDefault();

        const reset = {
            email: this.state.email
        };

        if(this.formValidator(reset)) {
            try {
                const res = resetPassword(reset);
                if (res.data.code === 'Reset successful') {
                    this.props.history.push('/signIn');
                }
            }
            catch(err) {
                this.setState({errors:'Reset password failed, please try again later'});
            }
        }
    }

    render(){
        return <div className="signin-container">
            <div >
              <form onSubmit={this.handleResetPassword} className="needs-validation" noValidate>
                <div className="form-group">
                  <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                </div>

                  {this.state.errors &&
                  <div className="alert alert-danger" role="alert">
                      {this.state.errors.split("\n").map((i, key) => {
                          return <div key={key}>{i}</div>;
                      })}
                  </div>
                  }

                <div >
                  <button type="submit" name="signIn" className=" btn btn-info fogotpwd btn">Forgot Password</button>
                </div>
              </form>
            </div>
            <div className="signup-options-container">
              <NavLink to="/signIn" className="signup-link">Sign In</NavLink>
              <NavLink to="/signUp" className="forgot-password-link">Sign Up</NavLink>

            </div>
          </div>
    }

    formValidator({email}) {
        let errors = '';
        errors += ForgotPassword.emailValidator(email);
        if(errors !== '') {
            this.setState({formValid: false});
            this.setState({errors});
        } else {
            this.setState({formValid: true})
        }
        return errors === '';
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
}

export default ForgotPassword;
