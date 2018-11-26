// @flow

type LoadData = {
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

type SendData = {
    "order": string
}

const adapter = (data: string): {'order': string} => ({'order': data});

export default class abstractModel {
    get urlRead() {
        throw new Error(`Define the URL for model`);
    }

    get urlWrite() {
        throw new Error(`Define the URL for model`);
    }

    load(url: string = this.urlRead): Promise<LoadData> {
        return fetch(url)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error();
                }
                return resp.json();
            });
    }

    send(data: string): Promise<SendData> {
        const requestSettings = {
            body: JSON.stringify(adapter(data)),
            headers: {
                "Content-Type": `application/json`
            },
            method: `POST`
        };
        // console.log(requestSettings.body);
        return fetch(this.urlWrite, requestSettings)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error();
                }
                return resp.json();
            });
    }
}
