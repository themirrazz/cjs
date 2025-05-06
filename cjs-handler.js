var RunStyle = function (handle) {
    if(!handle) { alert('porque') }
    var px = (e) => e+'px';
    var pt = (e) => e+'pt';
    var inc = (e) => e+'in';
    var em = (e) => e+'em';
    var Arial = 'Arial';
    var Courier = 'Courier';
    var sans_serif = 'sans-serif';
    var serif = 'serif';
    var monospace = 'monospace';
    var initial = 'initial';
    var bold = 'bold';
    var bolder = 'bolder';
    var italic = 'italic';
    var red = 'red', orange = 'orange', yellow = 'yellow',
        green = 'green', lime = 'lime', blue = 'blue', cyan = 'cyan',
        teal = 'teal', turqoise = 'turqoise', purple = 'purple',
        pink = 'pink', magenta = 'magenta', lavender = 'lavender';
    var url =  (text) => `url(${text})`;
    var filter =  (text) => `filter(${text})`;
    var JSContextGlobal = function (e,k) {
        return (() => window[e.slice(2)]||k);
    };
    var JSBridge = function (e) {
        return JSContextGlobal(e)()
    };
    var vars = function (e, k) {
        return k ? `var(${e}, ${k})` : `var(${e})`;
    };
    var rgb = function (r, g, b) {
        return `rgb(${r}, ${g}, ${b})`;
    };
    var rgba = function (r, g, b) {
        return `rgb(${r}, ${g}, ${b})`;
    };
    var Style = function (d) {
        if(!d) {
            throw new TypeError('pick a plotline!!');
        }
        if(!this instanceof Style) {
            return new Style;
        }
        this.__styles__ = d;
        this.attachedElement = null;
    };
    Style.prototype.ForcePaint = function () {
        if(!this.attachedElement) return;
        Object.keys(this.__styles__).forEach(prop => {
            let value = this.__styles__[prop];
            if(typeof value === 'function') {
                value = value();
            }
            Array.from(document.querySelectorAll(this.attachedElement)).forEach(
                e => e.style[prop] = value instanceof Array ? value.join(', ') : String(value)
            );
        });
    }
    Style.prototype.Attach = function (query) {
        this.attachedElement = query;
        this.ForcePaint();
    };
    Style.prototype.Update = function (ns) {
        Object.keys(ns).forEach(key => this.__styles__[key] = ns[key]);
        this.ForcePaint();
    };
    eval('('+handle+')')();
};

(async () => {
    var styles = document.querySelectorAll('link');
    // Initalize
    for(var i = 0; i < styles.length; i++) {
        await (async (style) => {
            if(style.rel === 'stylesheet' && style.href.endsWith('.jsx')) {
                var kiddieScript = document.createElement('script');
                kiddieScript.src = style.href;
                kiddieScript.type = 'text/javascript';
                document.body.appendChild(kiddieScript);
                await new Promise(_ => {
                    setTimeout(() => _(), 100);
                });
                RunStyle(STY_HANDLE)
            }
        })(styles[i]);
    }
})().catch(e=>alert(e));
