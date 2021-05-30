import React, { useEffect, useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { v4 as uuid } from "uuid";
import { useSelector, useDispatch } from 'react-redux'
import { getItems, deleteItem } from '../redux/listSlice';
import _ from 'lodash';
// import { connect } from 'react-redux';

// let items = [];
function ShoppingList() {

    // const [state, setState] = useState(
    // { 
    //     items: 
    //         [{ id: uuid(), name: "Eggs" },
    //             { id: uuid(), name: "Milk" },
    //             { id: uuid(), name: "Steak" },
    //             { id: uuid(), name: "Water" }]
    
    // });

    //const [compState, setState] = useState('initial');
    //const items = useRef([]);
    const items = useSelector((state) => state.list.items, _.isEqual);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated, _.isEqual);
    
    //shallowEqual); //() => JSON.stringify(items) !== compState);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     async function func() {
    //         await dispatch(getItems());
    //         setState(JSON.stringify(items.current));
    //     }
    //     func();
    //     //dispatch(getItems());
    // }, []);

    // const itemsString = JSON.stringify(items);

    // useEffect(() => {
    //     async function func() {
    //         //await 
    //         dispatch(getItems());
    //         // if (compState !== JSON.stringify(items))
    //         // {
    //         //     setState(JSON.stringify(items));
    //         // }    
    //     }
    //     func();
    //     //dispatch(getItems());
    // }, [dispatch]);
    
    useEffect(() => {
        async function func() {
            //await 
            
            dispatch(getItems());
            console.log("Render");
            // if (compState !== JSON.stringify(items))
            // {
            //     dispatch(getItems());
            //     setState(JSON.stringify(items));
            // }    
        }
        func();
        //dispatch(getItems());
    }, [dispatch])//, items]);

    // useEffect(() => {
    //     async function func() {
    //         //await 
            
    //         //dispatch(getItems());
    //         console.log("Render!");
    //         // if (compState !== JSON.stringify(items))
    //         // {
    //         //     dispatch(getItems());
    //         //     setState(JSON.stringify(items));
    //         // }    
    //     }
    //     func();
    //     //dispatch(getItems());
    // }, [items]);

    // useEffect(() => {
    //     async function func() {
    //         //await 
    //         await dispatch(getItems());
    //         //console.log("Rerender");
    //         // if (compState !== JSON.stringify(items))
    //         // {
    //         //     setState(JSON.stringify(items));
    //         // }    
    //     }
    //     func();
    //     //dispatch(getItems());
    // }, [dispatch, items]);

    //, [items]);
    //[dispatch]);
    
    const [inProp, setInProp] = useState(false);

    const onDeleteClick = async (id) => {
        await dispatch(deleteItem(id));
        await dispatch(getItems());
        setInProp(true);
    }

    // const { items } = state;

    return (

    <Container>
        {/* <Button
        color="dark"
        style={{ marginBottom: '2rem' }}
        onClick={ () => {
          const name = prompt('Enter Item');
          if (name) {
              setState(prevState => {
                return { items: [ ...prevState.items, { id: uuid(), name } ]}
              });
          }
        }}>
            Add Item
        </Button> */}

        <ListGroup>
            <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
                <CSSTransition key={_id} in={inProp} timeout={500} classNames="fade">
                <ListGroupItem>
                    {isAuthenticated ? (
                    <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => onDeleteClick(_id)}>
                        &times;
                    </Button>
                    ) : null}
                    {name}
                </ListGroupItem>
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ListGroup>
    </Container>
    );
}

export default ShoppingList;
