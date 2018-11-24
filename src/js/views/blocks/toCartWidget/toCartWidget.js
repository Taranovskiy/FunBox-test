import ToCartWidgetView from "./toCartWidgetView";

export default (state) => {
    const product = new ToCartWidgetView(state);
    return product.template;
};
