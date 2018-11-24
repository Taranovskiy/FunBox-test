import AbstractView from "../abstractView";
import product from "../blocks/product/product";
import toCartWidget from "../blocks/toCartWidget/toCartWidget";
import {declension} from "../../ulils/declension";
import {NYAMUSHKA_WORDS} from "../../data/constants";
export default class ShopView extends AbstractView {

    constructor(state, data) {
        super();
        this.state = state;
        this.products = data;
        this.updateProductCount(this.state.size);
    }

    get template() {
        const productsContent = this.products.map((it) => product(this.state, it)).join(``);

        return `
            <div class="shop">
                <h1>Ты сегодня покормил кота?</h1>
                <div class="shop__to-cart">
                    ${toCartWidget(this.state)}
                </div>
                <form>
                        <ul class="shop__products">
                            ${productsContent}
                        </ul>
                </form>
            </div>
            `.trim();
    }

    get _goToCartButton() {
        return this.element.querySelector(`a.cart-widget`);
    }

    bind() {
        const productButtons = this.element.querySelectorAll(`input[type="checkbox"]`);
        [...productButtons].forEach((it) => it.addEventListener(`click`, (evt) => this.onClickProductButton(evt)));

        this._goToCartButton.addEventListener(`click`, (evt) => this.onClickCartButton(evt));
    }

    onClickCartButton(evt) {
        throw new Error(`Not implemented onClickCartButton`);
    }

    onClickProductButton(evt) {
        throw new Error(`Not implemented onClickProductButton`);
    }

    updateProductCount(num) {
        const productCount = this.element.querySelector(`.cart-widget__product-count b`);
        const productLabel = this.element.querySelector(`.cart-widget__product-count span`);

        if (num === 0) {
            this._goToCartButton.classList.add(`cart-widget--empty`);
        } else {
            this._goToCartButton.classList.remove(`cart-widget--empty`);
        }

        productCount.innerHTML = num;
        productLabel.innerHTML = declension(num, NYAMUSHKA_WORDS);
    }
}
