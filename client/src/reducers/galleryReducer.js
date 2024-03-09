const initialState = {
    isOpen: false,
    filter: '',
  };
  
  const galleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "OTVORI":
            return {
            ...state,
            isOpen: true,
            filter: action.payload,
            };
        case "UGASI":
            return{
                ...state,
                isOpen: false,
                filter: ''
            }
      default:
        return state;
    }
  };
  
  export default galleryReducer;