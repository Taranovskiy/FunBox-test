import AbstractView from "../abstractView";

export default class GreetingView extends AbstractView {

    get template() {
        return `
            <div class="greeting" id="greeting">
                <h1>Добро пожаловать в магазин нямушек для ваших котэ!</h1>
                <svg class="icon icon-cat-silhouette ">
                    <use xlink:href="img/svg/symbol/sprite.svg#cat-silhouette"></use>
                </svg><a class="btn">К выбору нямушек!</a>
            </div>
       `.trim();
    }

    bind() {
        const goToShopButton = this.element.querySelector(`.greeting a.btn`);
        goToShopButton.addEventListener(`click`, (evt) => this.onClick(evt));
    }

    onClick(evt) {
        throw new Error(`Not implemented onClick`);
    }
}
