const initialState = {
    name: '',
    loggedIn: false,
    isAuthenticated: false,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, name: action.payload.name, loggedIn: true };
      case 'LOGOUT':
        return { ...state, name: '', loggedIn: false };
      default:
        return state;
    }
  };
  
  export default userReducer;
  