
import App from "../../app";
import AbstractView from "../abstractView";
import AbstractModel from "../../models/abstractModel";
import CartView from "./cartView";
import Preloader from "../blocks/preloader/preloader";

export default class Cart {

    constructor(state, data) {
        this.state = new Set(state);
        this.data = data;
        const selectedProducts = this.getProductsInCart([...this.state]);
        this.view = new CartView(selectedProducts);
        this.model = new class extends AbstractModel {
            get urlWrite() {
                return `http://localhost:3000/orders/`;
            }
        }();
    }

    init() {
        AbstractView.setActiveView(this.view.element);

        if (this.state.size === 0) {
            this.view.showEmptyCart();
        }

        this.view.onClickDeleteButton = (evt) => {
            const elementId = evt.currentTarget.id;
            const productName = elementId.replace(`delete-`, ``);
            this.state.delete(productName);
            this.view.deleteProductInCart(this.state, productName);
            App.showCart(this.state);
        };

        this.view.onClickBackButton = (evt) => {
            App.showShop(this.state);
        };

        this.view.backAfterSubmitButton = (evt) => {
            this.state.clear();
            App.showShop(this.state);
        };

        this.view.onClickSubmitButton = () => this.model.send([...this.state])
            .then((respData) => {
                this.view.showSuccessSubmitNotice(respData);
                this.state.clear();
            })
            .catch(() => {
                new Preloader().error();
            });
    }

    getProductsInCart(namesOfSelectedProduct) {
        return this.data.filter((it) => namesOfSelectedProduct.includes(it.name));
    }
}
