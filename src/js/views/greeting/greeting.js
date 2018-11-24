import App from "../../app";
import initialState from "../../data/initialState";
import GreetingView from "./greetingView";
import AbstractView from "../abstractView";

export default class Greeting {
    constructor() {
        this.state = initialState;
        this.view = new GreetingView();
    }

    init() {
        AbstractView.setActiveView(this.view.element);

        this.view.onClick = (evt) => {
            evt.preventDefault();
            App.showShop(this.state);
        };
    }
}
