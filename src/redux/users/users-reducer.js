import {users} from "./users.data";

const INITIAL_STATE = {
    users: [...users],
    loading: false,
    error: null,
    singleUser: {}
};

const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        default:
            return state;
    }
}

export default usersReducer;