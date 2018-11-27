import AbstractView from "../../abstractView";
import {declension} from "../../../ulils/declension";
import {BONUS_WORDS} from "../../../data/constants";

export default class ProductView extends AbstractView {

    constructor(state, product) {
        super();
        this.state = state;
        this.product = product;
    }

    get template() {
        const bonusDisplay = (bonusValue, words) => {
            if (bonusValue === 1) {
                return `мышь в подарок`;
            }
            if (bonusValue > 1) {
                return `<b>${bonusValue}</b> ${declension(bonusValue, words)} в подарок`;
            }
            return ``;
        };

        return `
                <li class="shop__products-item">
                    <label class="product">
                        <input type="checkbox"
                            name="${this.product.name}"
                            ${this.product.isDisabled ? `disabled` : ``}
                            ${this.isProductSelected([...this.state]) ? `checked` : ``}>
                        <svg class="icon icon-frame ">
                            <use xlink:href="img/svg/symbol/sprite.svg#frame"></use>
                        </svg>
                        <h3>Сказочное заморское яство</h3><span class="product__call-back">Котэ не одобряет?</span>
                        <h2>Нямушка</h2>
                        <b class="product__taste">${this.product.taste}</b>
                        <b class="product__info">${this.product.size ? `${this.product.size}<span>&nbsp;порций</span>` : ``}</b>
                        <span class="product__info">${bonusDisplay(this.product.bonus, BONUS_WORDS)}</span>
                        <span class="product__info">${this.product.extraInfo || ``}</span>
                        <div class="product__weight">
                            ${this.product.weight ? `<span>${this.product.weight}</span><small>кг</small>` : ``}
                        </div>
                        <span class="product__status product__status--available">Чего сидишь? Порадуй котэ,&nbsp;<b>купи.</b></span>
                        <span class="product__status product__status--unavailable">Печалька, ${this.product.taste} закончился.</span>
                        <span class="product__description">${this.product.description}</span>
                        <picture>
                            <source type="image/webp" srcset="../../img/${this.product.img}.webp 1x,../../img/${this.product.img}@2x.webp 2x">
                            <img class="product__img" src="../../img/${this.product.img}.png" srcset="../../img/${this.product.img}@2x.png 2x" width="316" height="270" alt="Картинка продукта">
                        </picture>
 
                    </label>
                </li>
            `.trim();
    }

    isProductSelected(namesOfSelectedProduct) {
        return namesOfSelectedProduct.includes(this.product.name);
    }
}
