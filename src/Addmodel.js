import { Button, Modal, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm.js';

function Addmodel(args) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function saveEmpDetail(e) {
    args.passEmployee(e);
  }

  function cancelForm(e) {
    toggle(e);
  }
  return (
    <div>
      <h1 style={{ marginTop: '10px', textAlign: 'center' }}> Employee List</h1>
      <Button color="primary" style={{ float: 'right' }} onClick={toggle}>
        Add Employee{' '}
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalBody>
          <button
            type="button"
            style={{ float: 'right' }}
            class="close"
            color="secondary"
            onClick={toggle}
          >
            {' '}
            X
          </button>

          <RegisterForm
            saveEmpDetail={(e) => saveEmpDetail(e)}
            cancelForm={(e) => cancelForm(e)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Addmodel;
