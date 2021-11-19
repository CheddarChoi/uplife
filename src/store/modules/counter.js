const CHANGE_CATEGORY = 'counter/CHANGE_CATEGORY';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
const SET_GOAL = 'counter/SETGOAL';

export const changeCategory = category => ({ type: CHANGE_CATEGORY, category });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const setGoal = total_goal => ({type:SET_GOAL, total_goal })

const initialState = {
  category: 'Total',
  total_goal: 3,
  enter_goal: 3,
  sns_goal:2,
  com_goal:1,
  pro_goal:5,
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
        total_goal: state.total_goal + 1,
      };
    case DECREMENT:
      return {
        ...state,
        total_goal: state.total_goal - 1,
      };
    case SET_GOAL:
      return{
          ...state,
          total_goal: action.total_goal
      };
    default:
      return state;
  }
}