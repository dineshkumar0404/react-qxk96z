import { Button, Modal, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm.js';

function Addmodel(args) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function saveEmpDetail(e) {
    args.passemployee(e);
    toggle();
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
      <Modal isOpen={modal} size="lg" toggle={toggle} {...args}>
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
            totalUsers={args.totalUsers}
            saveEmpDetail={(e) => saveEmpDetail(e)}
            cancelForm={(e) => cancelForm(e)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Addmodel;

// import React, { Component } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import RegisterForm from './components/RegisterForm.js';

// class Addmodel extends Component {
//   state = {
//     isOpen: false,
//   };

//   openModal = () => this.setState({ isOpen: true });
//   closeModal = () => this.setState({ isOpen: false });

//   saveEmpDetail(e) {
//     this.props.passemployee(e);
//     this.closeModal(e);
//   }

//   cancelForm(e) {
//     this.closeModal(e);
//   }

//   render() {
//     return (
//       <>
//         <div>
//           <h1 style={{ marginTop: '10px', textAlign: 'center' }}>
//             {' '}
//             Employee List
//           </h1>
//           <Button
//             color="primary"
//             style={{ float: 'right' }}
//             onClick={this.openModal}
//           >
//             Add Employee
//           </Button>

//           <Modal show={this.state.isOpen} onHide={this.closeModal}>
//             <RegisterForm
//               saveEmpDetail={(e) => this.saveEmpDetail(e)}
//               cancelForm={(e) => this.cancelForm(e)}
//             />
//           </Modal>
//         </div>
//       </>
//     );
//   }
// }
// export default Addmodel;
