const CJS_DEBUG_MODE = true;

var RunStyle = function (handle) {
    if(!handle) { return };
    let convertJSValueToCSSValue = function (value, useSpacesOnArrays, property) {
        if(typeof value === 'function') {
            value = value();
        }
        if(value instanceof Cookie) {
            value = value.Get();
        };
        if(value instanceof Array) {
            (() => {
                let fixedItems = [];
                value.forEach((item) => fixedItems.push(convertJSValueToCSSValue(item, useSpacesOnArrays, property)));
                value = fixedItems.join(useSpacesOnArrays ? ' ' : ', ');
            })();
        }
        if(value === Infinity) {
            value = 'infinite';
        }
        if(value === undefined) {
            return null;
        }
        if(value === null) {
            value = 'auto';
        }
        if(typeof value === 'number') {
            if(property === 'font-size') {
                value = value+'px'; // default
            } else if([
                'animation-delay',
                'animation-duration'
            ].includes(property)) {
                value = value+'ms';
            } else if(value > 1 && property === 'opacity') {
                value = value + '%';
            }
        }
        if(value instanceof Animation) {
            value = value.__name__;
        }
        if(value instanceof JSGlobalVariable) {
            value = value.Get();
        }
        return String(value);
    };
    var px = (e) => e+'px';
    var pt = (e) => e+'pt';
    var inc = (e) => e+'in';
    var em = (e) => e+'em';
    var milli = (e) => e/1000 - Math.floor(e/1000) === 0 ? Math.floor(e/1000)+'s' : e+'ms';
    var sec = (e) => e+'s';
    var min = (e) => (e*60)+'s';
    var hour = (e) => (e*60*60)+'s';
    var $preferscolorscheme = {
        get light () {
            return matchMedia('(prefers-color-scheme: light)');
        },
        get dark () {
            return matchMedia('(prefers-color-scheme: dark)');
        }
    };
    var $maxwidth = width => window.innerWidth < width;
    var $maxheight = height => window.innerHeight < height;
    var $minwidth = width => window.innerWidth > width;
    var $minheight = height => window.innerHeight > height;
    var Arial = 'Arial';
    var Courier = 'Courier';
    var Lexend = 'Lexend';
    var Helvetica = 'Helvetica';
    var sans_serif = 'sans-serif';
    var serif = 'serif';
    var monospace = 'monospace';
    var initial = 'initial';
    var inherit = 'inherit';
    var auto = 'auto';
    var bold = 'bold';
    var bolder = 'bolder';
    var italic = 'italic';
    var infinite = 'infinite';
    var red = 'red', orange = 'orange', yellow = 'yellow',
        green = 'green', lime = 'lime', blue = 'blue', cyan = 'cyan',
        teal = 'teal', turqoise = 'turqoise', purple = 'purple',
        pink = 'pink', magenta = 'magenta', lavender = 'lavender';
    var url =  (text) => `url(${text})`;
    var filter =  (text) => `filter(${text})`;
    var JSGlobalVariable = function (variableName, fallback) {
        if(!(this instanceof JSGlobalVariable)) {
            return new JSGlobalVariable(variableName, fallback);
        }
        this.__variableName__ = variableName;
        this.__fallback__ = fallback;
    };
    JSGlobalVariable.prototype.Get = function () {
        if(window[this.__variableName__] instanceof Window) return null;
        if(window[this.__variableName__] instanceof File) return null;
        if(window[this.__variableName__] instanceof ArrayBuffer) return null;
        if(window[this.__variableName__] instanceof Uint8Array) return null;
        if(window[this.__variableName__] instanceof Uint16Array) return null;
        if(window[this.__variableName__] instanceof Uint32Array) return null;
        if(window[this.__variableName__] instanceof Blob) return null;
        if(window[this.__variableName__] instanceof Node) return null;
        if(window[this.__variableName__] instanceof Document) return null;
        if(window[this.__variableName__] instanceof Navigator) return null;
        if(window[this.__variableName__] instanceof Date) return null;
        if(window[this.__variableName__] instanceof Storage) return null;
        if(window[this.__variableName__] instanceof AudioNode) return null;
        if(window[this.__variableName__] instanceof CanvasRenderingContext2D) return null;
        if(window[this.__variableName__] instanceof WebGLRenderingContext) return null;
        if(window[this.__variableName__] instanceof WebGL2RenderingContext) return null;
        if(window[this.__variableName__] instanceof ImageBitmapRenderingContext) return null;
        if(window[this.__variableName__] instanceof OffscreenCanvasRenderingContext2D) return null;
        if(window[this.__variableName__] instanceof OffscreenCanvas) return null;
        if(window[this.__variableName__] instanceof Function) return null;
        if(window[this.__variableName__] === null) return 'auto';
        if(window[window[this.__variableName__]] === Infinity) return infinite;
        if(window[this.__variableName__] === undefined) {
            if(this.__fallback__ === undefined) return null;
            return this.__fallback__;
        }
        return window[this.__variableName__];
    }
    var JSBridge = function () {
        return JSGlobalVariable('window').Get();
    };
    var vars = function (e, k) {
        return k ? `var(${e}, ${k})` : `var(${e})`;
    };
    var rgb = function (r, g, b) {
        return `rgb(${r}, ${g}, ${b})`;
    };
    rgb.random = () => rgb(Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256));
    var rgba = function (r, g, b) {
        return `rgba(${r}, ${g}, ${b})`;
    };
    rgba.random = () => rgba(Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256));
    var Cookie = function (cookieName, type) {
        if(!(this instanceof Cookie)) {
            return new Cookie(cookieName, type);
        };
        if(!type) type = 'ls';
        if(!cookieName) cookieName = 'generic-cookie' && console.warn('CJS Error: Please don\'t use generic cookies.');
        this.__type__ = type;
        this.__name__ = name;
    };
    Cookie.prototype.Set = function (value) {
        if(this.__type__ === 'ls') {
            localStorage.setItem(this.__name__, value);
            return true;
        } else if(this.__type__ === 'cookie') {
            // Experimental!
            document.cookie = `${this.__name__}=${value}`;
            return true;
        }
        return false;
    };
    Cookie.prototype.Get = function () {
        var value;
        if(this.__type__ === 'ls') {
            value = localStorage.getItem(this.__name__);
            if(value === null) value = undefined;
        }
        return value;
    };
    Cookie.prototype.Remove = function () {
        if(this.__type__ === 'ls') {
            localStorage.removeItem(this.__name__);
            return true;
        }
        return false;
    };
    var CriticalError = function (message) {
        this.stack = (new Error).stack;
        this.name = 'CriticalError';
        this.message = message;
        this.toString = function () {
            return `CriticalError: ${message}`;
        }
    };
    var Animation = function (data, extraData) {
        if(!data) {
            throw new CriticalError('Animations may not be empty');
        }
        if(!(this instanceof Animation)) {
            return new Animation(data, extraData);
        }
        this.__name__ = this.__generateRandomizedName__();
        if(typeof data === 'string') {
            this.__name__ = data;
            data = extraData;
        }
        this.__keyframes__ = data;
        this.__element__ = document.createElement('style');
        document.head.appendChild(this.__element__);
        this.__ForcePaint__();
    };
    Animation.prototype.__ForcePaint__ = function () {
        var keyframe = [];
        Object.keys(this.__keyframes__).sort().forEach(pos => {
            keyframe.push(`    ${pos} {`);
            Style.prototype.__generate_css__.apply({
                __styles__: this.__keyframes__[pos],
                __attachedQuerySelector__: this.__name__
            }, [true]).forEach(sty => keyframe.push(`    ${sty}`));
            keyframe.push('    }');
        });
        this.__element__.innerHTML = `@keyframes ${this.__name__} {\n${keyframe.join('\n')}\n}`;
    };
    Animation.prototype.SetName = function (name) {
        this.name = String(name || this.__generateRandomizedName__()); 
    };
    Animation.prototype.__generateRandomizedName__ = () => {
        const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
        const rchar = () => char[Math.floor(Math.random() * char.length)];
        return 'animation-'+rchar()+rchar()+rchar()+rchar()+rchar()+'-'+rchar()+rchar()+rchar()+'-'+rchar()+rchar()+rchar()+rchar();
    };
    Animation.prototype.toString = function () { return this.__name__ };
    var Style = function (styleData, extraStyleData) {
        this.__attachedQuerySelector__ = null;
        if(typeof styleData === 'string') {
            this.__attachedQuerySelector__ = styleData;
            styleData = extraStyleData;
        }
        if(!(this instanceof Style)) {
            return new Style(styleData, extraStyleData);
        }
        if(!styleData) {
            console.warn("CJS Warning: Styles should not be empty");
        }
        let styleShortHands = {
            backgroundColor: 'background-color',
            backgroundImage: 'background-image',
            backgroundRepeat: 'background-repeat',
            backgroundPosition: 'background-position',
            backgroundSize: 'background-size',
            backdropFilter: 'backdrop-filter',
            fontSize: 'font-size',
            fontWeight: 'font-weight',
            boldness: 'font-weight',
            fontFamily: 'font-family',
            borderRadius: 'border-radius',
            borderColor: 'border-color',
            animationName: 'animation-name',
            animationObject: 'animation-name',
            'animation-object': 'animation-name',
            animationDuration: 'animation-duration',
            animationDelay: 'animation-delay',
            animationTimingFunction: 'animation-timing-function',
            animationIterationCount: 'animation-iteration-count'
        };
        let ssh_keys = Object.keys(styleShortHands)
        for(let z = 0; z < ssh_keys.length; z++) {
            if(styleData[ssh_keys[z]]) {
                styleData[styleShortHands[ssh_keys[z]]] = styleData[ssh_keys[z]];
                styleData[ssh_keys[z]] = undefined;
            }
        }
        this.__styles__ = styleData;
        this.__element__ = document.createElement('style');
        document.head.appendChild(this.__element__);
        this.ForcePaint();
    };
    Style.prototype.ForcePaint = function () {
        this.__element__.textContent = this.__generate_css__();
    };
    Style.prototype.__generate_css__ = function (returnRawArray) {
        if(!this.__attachedQuerySelector__) {
            return "";
        };
        var webKitPrefix = [
            'animation',
            'animation-name',
            'animation-delay',
            'animation-duration',
            'animation-timing-function',
            'animation-iteration-count',
            'line-clamp',
            'opacity',
            'backdrop-filter'
        ];
        var mozPrefix = [
            'animation',
            'animation-name',
            'animation-delay',
            'animation-duration',
            'animation-timing-function',
            'animation-iteration-count',
            'backdrop-filter'
        ];
        var styles = [];
        Object.keys(this.__styles__).forEach(async property => {
            var value = convertJSValueToCSSValue(this.__styles__[property], ['animation','padding','transition','margin','filter','background'].includes(property), property);
            if(value === null) return;
            styles.push(`    ${property}: ${value};`);
            if(webKitPrefix.includes(property)) styles.push(`    -webkit-${property}: ${value};`);
            if(mozPrefix.includes(property)) styles.push(`    -moz-${property}: ${value};`);
        });
        if(returnRawArray) return styles;
        return `${this.__attachedQuerySelector__} {\n${styles.join('\n')}\n}`;
    };
    Style.prototype.Detach = function () {
        this.__attachedQuerySelector__ = null;
        this.ForcePaint();
    };
    Style.prototype.Attach = function (query) {
        if(!query) return console.warn('CJS Warning: Select a query');
        this.__attachedQuerySelector__ = query;
        this.ForcePaint();
    };
    Style.prototype.Update = function (styleData) {
        let styleShortHands = {
            backgroundColor: 'background-color',
            backgroundImage: 'background-image',
            backgroundRepeat: 'background-repeat',
            backgroundPosition: 'background-position',
            backgroundSize: 'background-size',
            backdropFilter: 'backdrop-filter',
            fontSize: 'font-size',
            fontWeight: 'font-weight',
            boldness: 'font-weight',
            fontFamily: 'font-family',
            borderRadius: 'border-radius',
            borderColor: 'border-color',
            animationName: 'animation-name',
            animationObject: 'animation-name',
            'animation-object': 'animation-name',
            animationDuration: 'animation-duration',
            animationDelay: 'animation-delay',
            animationTimingFunction: 'animation-timing-function',
            animationIterationCount: 'animation-iteration-count'
        };
        let ssh_keys = Object.keys(styleShortHands)
        for(let z = 0; z < ssh_keys.length; z++) {
            if(styleData[ssh_keys[z]]) {
                styleData[styleShortHands[ssh_keys[z]]] = styleData[ssh_keys[z]];
                styleData[ssh_keys[z]] = undefined;
            }
        }
        Object.keys(styleData).forEach(key => this.__styles__[key] = styleData[key]);
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
})().catch(e=>{
    if(CJS_DEBUG_MODE) {
        alert(e.stack||e);
    };
    console.warn(`CJS Error: ${e.stack}\nFrom file "${kiddieScript.src}"\n\nThis stylesheet will be disabled`);
});
if(typeof module != 'undefined') { module.exports = RunStyle }
