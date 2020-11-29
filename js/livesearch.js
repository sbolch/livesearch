class LiveSearch {
    /**
     * @param url - url of the ajax backend service
     * @param container - container for the response
     * @param allowedKeys
     */
    constructor(url = null, container = null, allowedKeys = null) {
        this.lastValue = null;
        this.lsCall = null;
        this.timer = null;

        this.url = url;
        this.container = container;
        this.allowedKeys = allowedKeys ? allowedKeys : [8, 32, 46]; // [backspace, space, delete]
        this.typeDelay = 200;

        this.slideUp = e => e.style.height = '0';
        this.slideDown = e => e.style.height = `${e.scrollHeight}px`;
    }

    /**
     * @param value - actual search value
     * @param key - actual key pressed
     * @param url - url of the ajax backend service
     * @param container - container for the response
     */
    search(value, key = null, url = null, container = null) {
        if(!key || key >= 48 || key in this.allowedKeys) { // key is not given or key >= '0' or in allowedKeys array
            if(!this.lastValue || this.lastValue !== value) {
                if(this.lsCall) {
                    this.lsCall.abort(); // cancel ongoing call
                }
                if(this.timer) {
                    clearTimeout(this.timer); // reset timer
                }

                container = container ? container : this.container;
                if(container) {
                    this.slideUp(container);
                }

                url = url ? url : this.url;

                let ls = this;
                this.timer = setTimeout(() => {
                    ls.lsCall = fetch(url, {
                        method: 'POST',
                        body: JSON.stringify({
                            q: value
                        })
                    }).then(response => {
                        ls.lsCall = null; // close the call

                        if(container) {
                            container.innerHTML = response;
                            if(response.length > 0) {
                                ls.slideDown(container);
                            }
                        }

                        ls.lastValue = value;

                        return response;
                    });
                }, this.typeDelay);
            }
        }
    }
}

export default LiveSearch;
