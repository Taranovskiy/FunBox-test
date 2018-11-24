export default class AbstractView {

    static createElement(tagString) {
        // const container = document.createElement(`template`);
        const container = document.createElement(`div`);
        container.innerHTML = tagString;
        // return container.content;
        return container.children[0];
    }

    static setActiveView(element) {
        const mainScreen = document.querySelector(`main > .container`);
        mainScreen.innerHTML = ``;
        mainScreen.appendChild(element);
    }

    get template() {
        throw new Error(`You have to define template for view`);
    }

    render() {
        return AbstractView.createElement(this.template);
    }

    bind() {}

    get element() {
        if (!this._element) {
            this._element = this.render();
            this.bind();
        }
        return this._element;
    }
}
