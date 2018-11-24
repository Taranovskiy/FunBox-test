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

    delay() {
        console.log(`delay init`);
        AbstractView.setActiveView(this.view.element);
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        sleep(5000).then(() => {
            console.log(`delay`);
            return;
        });
    }
}

