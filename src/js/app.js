// @flow
import AbstractModel from "./models/abstractModel";
import Greeting from "./views/greeting/greeting";
import Shop from "./views/shop/shop";
import Cart from "./views/cart/cart";
import Preloader from "./views/blocks/preloader/preloader";
import {ControllerID} from "./data/enums";

interface Model {
    get urlRead():string;
    get urlWrite():string;
    load(): Promise<Data>;
    send(): Promise<JSON>;
};

type Data = {
    id: number,
    name: string,
    taste: string,
    size: number,
    bonus?: number,
    weight: number,
    isDisabled: boolean,
    img: string,
    description: string,
    extraInfo?: string
};

const getControllerIDFromHash = (hash: string): string => hash.replace(`#`, ``);
const sleep = (ms: number): Promise<mixed> => new Promise((resolve) => setTimeout(resolve, ms));

class App {
    model: Model;
    routes: {|
        [key: string]: Greeting|Shop|Cart
    |};

    constructor() {
        this.model = new class extends AbstractModel {
            get urlRead() {
                return `http://localhost:3000/products`;
            }
        }();
    }

    async init() {
        this.showPreloader();
        await sleep(2500);
        this.model.load()
        .then((data: Data) => {
            return this.setup(data);
        })
        .then((data: Data) => {
            const {newController, state}: {newController: string; state: ?string} = this._parseHashFromUrl();
            this.changeController(newController, state, data);
        })
        .catch((err: Error) => {
            this.showPreloaderError();
        });
    }

    setup(data: Data): Data {
        this.routes = {
            [ControllerID.GREETING]: Greeting,
            [ControllerID.SHOP]: Shop,
            [ControllerID.CART]: Cart
        };

        window.onhashchange = (evt: {oldURL: string}): void => {
            const oldController: string = this._getOldController(evt);
            const {newController, state}: {newController: string; state: ?string} = this._parseHashFromUrl();

            if (oldController!== newController) {
                this.changeController(newController, state, data);
            }
        };

        return data;
    }

    changeController(route: string = ``, state: ?string , data: Data): void {
        const Controller: Function = this.routes[route];
        if (Controller) {
            new Controller(state, data).init() ;
        }
    }

    _parseHashFromUrl(): {newController: string, state: ?string} {
        const hash: Array<string> = location.hash.split(`=`)
        const [controller: string, hashValue: string] = hash;
        return {
            newController: getControllerIDFromHash(controller),
            state: hashValue ? JSON.parse(decodeURIComponent(hashValue)) : null
        };
    }

    _getOldController(evt: {oldURL: string}): string {
        const oldHash: string = evt.oldURL.split(`#`)[1] ? (`#` + evt.oldURL.split(`#`)[1]) : ``;
        const [oldHashController: string] = oldHash.split(`=`);
        return getControllerIDFromHash(oldHashController);
    }

    showPreloader(): void {
        new Preloader().init();
    }

    showPreloaderError(): void {
        new Preloader().error();
    }

    showGreeting(): void {
        location.hash = ControllerID.GREETING;
    }

    showShop(state: Set<string>): void {
        const stateAsArray: ?Array<string> = (state.size !== 0) ? [...state] : null;
        const stringifyState: string = stateAsArray ? JSON.stringify(stateAsArray) : ``;
        location.hash = stringifyState ? `${ControllerID.SHOP}=${stringifyState}` : ControllerID.SHOP;
    }

    showCart(state: Set<string>): void {
        const stateAsArray: ?Array<string> = (state.size !== 0) ? [...state] : null;
        const stringifyState: string = stateAsArray ? JSON.stringify(stateAsArray) : ``;
        location.hash = stringifyState ? `${ControllerID.CART}=${stringifyState}` : ControllerID.CART;
    }
}

const app = new App();

export default app;


