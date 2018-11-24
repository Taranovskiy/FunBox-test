import ProductView from "./productView";

export default (state, data) => {
    const product = new ProductView(state, data);
    return product.template;
};
