import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import shikshakProLogo from './Images/portalLogo_picture@2x.png';
import ReactDOM from 'react-dom';

class Popup extends Component {
    render() {
        return (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <p>{this.props.message}</p>
                    <button style={{ margin: '10px' }} onClick={this.props.onConfirm}>Confirm</button>
                    <button style={{ margin: '10px' }} onClick={this.props.onReject}>Reject</button>
                </div>
            </div>
        );
    }
}


class ShikshakPro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEmailContainer: false,
            showPopup: false,
            email: '',
        };
    }

    handleButton4Click = () => {
        this.setState({
            showEmailContainer: true,
        });
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
        });
    };

    handleSendClick = () => {
        const { email } = this.state;

        var basicAuth = "Basic " + btoa("c4econsumer".concat(":", "92i5L04g3P6Rk1qAe8v7m2N9b0cXjKwF"));

        fetch(`https://consumer-shikshakpro.care4edu.com/c4e/consumer/detail?id=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicAuth
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "failure") {
                    toast.error('Email not found in the database.');
                } else {
                    this.setState({
                        showPopup: true,
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    handleConfirm = () => {
        toast.success("Successfully deleted the user");
        this.setState({
            showPopup: false,
        });

        // const { email } = this.state;

        // // Make a DELETE API call to delete the email from the database
        // var basicAuth = "Basic " + btoa("c4econsumer".concat(":", "92i5L04g3P6Rk1qAe8v7m2N9b0cXjKwF"));

        // fetch(`https://consumer-shikshakpro.care4edu.com/c4e/consumer/delete?id=${email}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Authorization': basicAuth
        //     },
        // })
        //     .then((response) => {
        //         toast.success("Successfully deleted the user");
        //         // Handle confirm action
        //         this.setState({
        //             showPopup: false,
        //         });
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

    };

    handleReject = () => {
        // Handle reject action
        this.setState({
            showPopup: false,
        });
    };


    render() {
        return (
            <div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <div >
                        <img style={{ alignItems: 'center', height: '200px' }} src={shikshakProLogo} />
                    </div>
                    <Link to='/shikshakpro/terms-of-use'>
                        <button style={{ margin: '10px', width: '300px' }}>Terms of Use</button>
                    </Link>
                    <Link to='/shikshakpro/privacy-policy/user-data'>
                        <button style={{ margin: '10px', width: '300px' }}>Privacy Policy</button>
                    </Link>
                    <Link to='/shikshakpro/user-data'>
                        <button style={{ margin: '10px', width: '300px' }}>User Data Policy</button>
                    </Link>
                    <Link to='shikshakpro/payment-refund-policy'>
                        <button style={{ margin: '10px', width: '300px' }}>Payment Refund Policy</button>
                    </Link>

                    <button style={{ margin: '10px', width: '300px', backgroundColor: 'red' }} onClick={this.handleButton4Click}>Delete your Account</button>


                    {this.state.showEmailContainer && (
                        <div style={{ marginTop: '20px' }}>
                            <input type="email" placeholder="Enter your email" style={{ padding: '5px', marginRight: '10px' }}
                                value={this.state.email}
                                onChange={this.handleEmailChange} />
                            <button style={{ padding: '5px 10px' }} onClick={this.handleSendClick}>Delete</button>
                        </div>
                    )}

                    {this.state.showPopup && (
                        <Popup
                            message="It would take 30-60 days to completely remove all your credentials. Do you wish to continue?"
                            onConfirm={this.handleConfirm}
                            onReject={this.handleReject}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default ShikshakPro
