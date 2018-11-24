import AbstractView from "../../abstractView";
import {declension} from "../../../ulils/declension";
import {NYAMUSHKA_WORDS} from "../../../data/constants";


export default class PreloaderView extends AbstractView {

    constructor(state) {
        super();
        this.state = state;
    }

    get template() {
        const numProductsInCart = this.state.size;
        return `
            <a class="cart-widget cart-widget--empty">
                <svg class="icon icon-bag ">
                <use xlink:href="img/svg/symbol/sprite.svg#bag"></use>
                </svg><span class="cart-widget__empty-label">Корзина пуста</span>
                <div class="cart-widget__product-count">
                    <b>${numProductsInCart}</b><span>${declension(numProductsInCart, NYAMUSHKA_WORDS)}</span>
                </div>
            </a>
            `.trim();
    }
}
