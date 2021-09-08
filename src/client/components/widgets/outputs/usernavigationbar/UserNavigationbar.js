import React, { useEffect } from 'react';

// own-component imports
import { getUserById } from '../../../utils/axios/user/UserFunctions';

// resux-toolkit imports
import { counterActions } from '../../../utils/redux/store/index';

// material-ui imports
import {
    Button,
    ButtonGroup
} from '@material-ui/core';

// third-party imports
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import "./UserNavigationbar.css";

function UserNavigationbar(props) {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);

    const incrementHandler = () => {
        dispatch(counterActions.increment());
    }

    const increaseHandler = () => {
        dispatch(counterActions.increase(5));
    }

    const decrementHandler = () => {
        dispatch(counterActions.decrement());
    }

    useEffect(() => {
        getUserById(props.userid).then((userResponse) => {
            const userData = userResponse[0];
            if (userData._id === props.userid) {
                // TODO
            }
        });
    }, [])

    return (
        <div className="user-navigationbar">
            <ButtonGroup variant="text" color="primary" >
                <Link to={{pathname: `/userprofile/${props.userid}`}}>
                    <Button>Profil</Button>
                </Link>
                <Link to={{pathname: `/profileSettings/${props.userid}`}}>
                    <Button>Einstellungen { counter }</Button>
                </Link>
                <Button onClick={incrementHandler}>+</Button>
                <Button onClick={increaseHandler}>+ 5</Button>
                <Button onClick={decrementHandler}>-</Button>
            </ButtonGroup>
        </div>
    )
}

export default UserNavigationbar;