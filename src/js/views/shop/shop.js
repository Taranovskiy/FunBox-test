
import App from "../../app";
import initialState from "../../data/initialState";
import ShopView from "./shopView";
import AbstractView from "../abstractView";

export default class Shop {

    constructor(state = initialState, data) {

        this.state = new Set(state);
        // this.data = data;
        this.view = new ShopView(this.state, data);
    }

    init() {
        AbstractView.setActiveView(this.view.element);

        this.view.onClickCartButton = (evt) => {
            evt.preventDefault();
            App.showCart(this.state);
        };

        this.view.onClickProductButton = (evt) => {
            const target = evt.currentTarget;
            const productName = target.name;
            const label = target.labels[0];

            label.classList.add(`no-hover`);
            label.addEventListener(`mouseleave`, () => label.classList.remove(`no-hover`));

            if (target.checked) {
                this.state.add(productName);
            } else {
                this.state.delete(productName);
            }

            this.view.updateProductCount(this.state.size);
            App.showShop(this.state);
        };
    }
}
