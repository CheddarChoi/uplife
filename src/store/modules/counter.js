const CHANGE_CATEGORY = "counter/CHANGE_CATEGORY";
const SET_GOAL = "counter/SETGOAL";
const SET_CATEGORY_GOAL = "counter/SET_CATEGORY_GOAL";
const SET_RANGE_GOAL = "counter/SET_CATEGORY_GOAL";

export const changeCategory = (category) => ({
  type: CHANGE_CATEGORY,
  category,
});
export const setGoal = (Total) => ({ type: SET_GOAL, Total });
export const setCategoryGoal = (category, goal) => ({
  type: SET_CATEGORY_GOAL,
  category,
  goal,
});

const initialState = {
  category: "Total",
  Total: 0.3,
  Entertainment: 0.3,
  SNS: 0.3,
  Communication: 0.3,
  Productivity: 0.3,
  entertainment_range: [0, 0],
  sns_range: [0, 0],
  communication_range: [0, 0],
  productivity_range: [0, 0],
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case SET_GOAL:
      return {
        ...state,
        Total: action.Total,
      };
    case SET_CATEGORY_GOAL:
      switch (action.category) {
        case "Entertainment":
          return {
            ...state,
            Entertainment: action.goal,
          };
        case "SNS":
          return {
            ...state,
            SNS: action.goal,
          };
        case "Communication":
          return {
            ...state,
            Communication: action.goal,
          };
        case "Productivity":
          return {
            ...state,
            Productivity: action.goal,
          };
        case "Total":
          return {
            ...state,
            Total: action.goal,
          };
        default:
          return state;
      }
    default:
      return state;
  }
}
