import React, { Component } from 'react';

class AccountStatus extends Component {
  render() {
    if (this.props.userRejectedWeb3) {
      return (
        <div className="account-status account-status--error">
          You declined to connect an account!
        </div>
      )
    }

    if (!this.props.activeAccount) {
      return (
        <div className="account-status account-status--warning">
          Please connect an account to use this dapp!
        </div>
      )
    }

    return (
      <div className="account-status account-status--success">
        Successfully connected with account:<br/>
        <b>{`${this.props.activeAccount.slice(0, 7)}...${this.props.activeAccount.slice(-5)}`}</b>
      </div>
    );
  }
}

export default AccountStatus;
