let initialState = {
  success: false,
  error: false,
  data: {}
};

export default function user(state = initialState, action) {
  switch (action.type) {

    case 'CHECK_PHONE_NUMBER_SUCCESS':
    return Object.assign({}, state, {
      success: true, error: false, data: action.data
    });

    case 'CHECK_PHONE_NUMBER_FAILED':
    return Object.assign({}, state, {
      success: false, error: true, data: {...state.data, status: action.data}
    })

    case 'RESET_ALL':
    return Object.assign({}, state, {
      success: false, error: false
    })

    default:
      return state;
  }
}
