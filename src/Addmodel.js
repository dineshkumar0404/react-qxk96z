import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import RegisterForm from './components/RegisterForm.js';

class Addmodel extends Component {
  state = {
    isOpen: false,
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  saveEmpDetail(e) {
    this.props.passemployee(e);
    this.closeModal(e);
  }

  cancelForm(e) {
    this.closeModal(e);
  }

  render() {
    return (
      <>
        <div>
          <h1 style={{ marginTop: '10px', textAlign: 'center' }}>
            {' '}
            Employee List
          </h1>
          <Button
            color="primary"
            style={{ float: 'right' }}
            onClick={this.openModal}
          >
            Add Employee
          </Button>

          <Modal show={this.state.isOpen} onHide={this.closeModal}>
            <RegisterForm
              saveEmpDetail={(e) => this.saveEmpDetail(e)}
              cancelForm={(e) => this.cancelForm(e)}
            />
          </Modal>
        </div>
      </>
    );
  }
}
export default Addmodel;
