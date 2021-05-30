import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import { addItem, getItems } from '../redux/listSlice';
// import { v4 as uuid } from "uuid";
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';

function ItemModal({ isAuthenticated }) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch()

  const handleToggle = () => setModal(!modal);

  const handleChangeName = (e) => setName(e.target.value);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      // id: uuid(),
      name
    };

    // Add item via addItem action
    //await 
    dispatch(addItem(newItem));
    //await 
    dispatch(getItems());
    // Close modal
    handleToggle();
  };

  return (
    <div>
        {isAuthenticated ? (
          <Button
              color="dark"
              style={{ marginBottom: '2rem' }}
              onClick={handleToggle}
          >
              Add Item
          </Button>
         ) : (
          <h4 className="mb-3 ml-4">Please log in to manage items</h4>
        )}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={handleChangeName}
              />
              <Button type="submit" color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};



const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(ItemModal);