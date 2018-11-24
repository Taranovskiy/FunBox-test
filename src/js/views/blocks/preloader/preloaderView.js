import AbstractView from "../../abstractView";


export default class PreloaderView extends AbstractView {

    get template() {
        return `
            <div class="preloader">
                <div class="preloader__wrap">
                    <div class="preloader__cube preloader__cube--1"></div>
                    <div class="preloader__cube preloader__cube--2"></div>
                    <div class="preloader__cube preloader__cube--4"></div>
                    <div class="preloader__cube preloader__cube--3"></div>
                </div>
                <span class="preloader__caption">Загружаем нямушки...</span>
            </div>
            `.trim();
    }

    showLoading() {
        const caption = this.element.querySelector(`.preloader__caption`);
        caption.textContent = `Загружаем нямушки...`;
    }

    showError() {
        const caption = this.element.querySelector(`.preloader__caption`);
        caption.textContent = `Что-то пошло не так =(`;
    }
}
