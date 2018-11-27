import AbstractView from "../../abstractView";
import PreloaderView from "./preloaderView";

export default class Preloader {
    constructor() {
        this.view = new PreloaderView();
    }

    init() {
        AbstractView.setActiveView(this.view.element);
        this.view.showLoading();
    }

    error() {
        AbstractView.setActiveView(this.view.element);
        this.view.showError();
    }
}

