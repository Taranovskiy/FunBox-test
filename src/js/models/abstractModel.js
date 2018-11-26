const adapter = (data) => ({'order': data});

export default class abstractModel {
    get urlRead() {
        throw new Error(`Define the URL for model`);
    }

    get urlWrite() {
        throw new Error(`Define the URL for model`);
    }

    load(url = this.urlRead) {
        return fetch(url)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error();
                }
                return resp.json();
            });
    }

    send(data) {
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
