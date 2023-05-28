const initialState = [];

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER_MESSAGE':
      return [...state, { sender: 'user', content: action.payload.content }];
    case 'ADD_BOT_MESSAGE':
      return [...state, { sender: 'bot', content: action.payload.content }];
    case 'CLEAR_MESSAGES':
      return [];
    default:
      return state;
  }
};

export default messagesReducer;
