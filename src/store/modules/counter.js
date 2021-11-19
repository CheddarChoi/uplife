const CHANGE_CATEGORY = 'counter/CHANGE_CATEGORY';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
const SET_GOAL = 'counter/SETGOAL';

export const changeCategory = category => ({ type: CHANGE_CATEGORY, category });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const setGoal = number => ({type:SET_GOAL, number })

const initialState = {
  category: 'SNS',
  number: 3,
  goals:[
      {
          id:0,
          name:'total',
          value:0
      }
  ]
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case INCREMENT:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREMENT:
      return {
        ...state,
        number: state.number - 1,
      };
    case SET_GOAL:
      return{
          ...state,
          number: action.number
      };
    default:
      return state;
  }
}