import AbstractView from "../abstractView";
import {declension} from "../../ulils/declension";
import {BONUS_WORDS} from "../../data/constants";

export default class CartView extends AbstractView {

    constructor(selectedProducts) {
        super();
        this.state = selectedProducts;
    }

    get template() {
        const products = this.state;
        const tambleContent = products.map((product) =>
            `
                <tbody class="cart__product cart__product--${product.name}" id="${product.name}">
                    <tr>
                        <td class="cart__thumbnail-cell" rowspan="3">
                            <img src="img/thumbnail.png" width="100" height="150">
                        </td>
                        <td><strong>${product.taste ? `Нямушка&nbsp;${product.taste}.` : ``}</strong><br>
                            ${product.description ? product.description : ``}
                        </td>
                        <td class="cart__delete-cell" rowspan="3">
                            <button type="button" class="cart__delete-btn" id="delete-${product.name}">
                                <svg class="icon icon-delete">
                                    <use xlink:href="img/svg/symbol/sprite.svg#delete"></use>
                                </svg>
                            </button>
                            <span>Котэ не одобряет?</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${product.size ? `<b>${product.size}&nbsp;</b>порций.` : ``}
                            ${product.weight ? `Вес:&nbsp;<b>${product.weight}</b>кг.` : ``}&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td class="cart__bonus-cell">
                            ${product.bonus ? `Подарок:&nbsp;<b>${product.bonus}</b>&nbsp;${declension(product.bonus, BONUS_WORDS)}` : ``}
                        </td>
                    </tr>
                    <tr>
                        <td class="cart__gap-row"></td>
                    </tr>
                </tbody>
            `).join(``);

        return `
            <div class="cart">
            <h1>Ваши нямушки:</h1>
            <a class="cart__go-back">
              <svg class="icon icon-back-arrow ">
                <use xlink:href="img/svg/symbol/sprite.svg#back-arrow"></use>
              </svg>
              <b>К выбору нямушек</b>
            </a>
                    <table>
                        ${tambleContent}
                    </table>
            <div class="cart__btn-wrap"><a class="btn">Оформить заказ</a></div>
            <div class="cart__success-notice">
                <span>Ваш заказ № <b></b> успешно отправлен!</span>
                <a class="btn">Вернуться в магазин</a>
            </div>
        </div>
       `.trim();
    }

    bind() {
        const deleteButtons = this.element.querySelectorAll(`button.cart__delete-btn`);
        const backButton = this.element.querySelector(`a.cart__go-back`);
        const submitButton = this.element.querySelector(`.cart__btn-wrap a.btn`);
        const backAfterSubmitButton = this.element.querySelector(`.cart__success-notice a.btn`);

        [...deleteButtons].forEach((it) => it.addEventListener(`click`, (evt) => this.onClickDeleteButton(evt)));
        backButton.addEventListener(`click`, (evt) => this.onClickBackButton(evt));
        submitButton.addEventListener(`click`, (evt) => this.onClickSubmitButton(evt));
        backAfterSubmitButton.addEventListener(`click`, (evt) => this.onClickBackButton(evt));
    }

    onClickDeleteButton(evt) {
        throw new Error(`Not implemented onClickDeleteButton`);
    }

    onClickBackButton(evt) {
        throw new Error(`Not implemented onClickBackButton`);
    }

    onClickSubmitButton(evt) {
        throw new Error(`Not implemented onClickSubmitButton`);
    }

    deleteProductInCart(state, productName) {
        const product = this.element.querySelector(`#${productName}`);
        product.remove();
        if (state.size === 0) {
            this.showEmptyCart();
        }
    }

    showEmptyCart() {
        const submitButton = this.element.querySelector(`.cart__btn-wrap a.btn`);
        const cartTitle = this.element.querySelector(`h1`);
        const backButton = this.element.querySelector(`a.cart__go-back`);

        submitButton.remove();
        cartTitle.textContent = `Корзина пуста =(`;
        backButton.style.transform = `translateX(200px) scale(1.5)`;
    }

    showSuccessSubmitNotice(respData) {
        const successNotice = this.element.querySelector(`.cart__success-notice`);
        const orderNumber = successNotice.querySelector(`b`);
        orderNumber.textContent = `${respData.id}`;
        successNotice.classList.add(`active`);
    }
}
