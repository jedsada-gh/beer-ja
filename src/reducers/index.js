export default (
  state = {
    itemBeer: {},
    isShowDialog: false
  },
  action
) => {
  switch (action.type) {
    case 'click_item':
      return {
        isShowDialog: true,
        itemBeer: action.payload
      };
    case 'dismiss_dialog':
      return {
        isShowDialog: false,
        itemBeer: {}
      };
    default:
      return state;
  }
};
