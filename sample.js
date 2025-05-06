// This is a sample of Cascaded JavaScript (CJS)
// My newest invention.
// Now you can style your HTML with JS

// Its more complicated than CSS, but has new features
// E.g.: hooking to JavaScript items

STY_HANDLE = () => {

    var HTMLStyle = new Style({
        padding: px(0),
        background: [magenta, blue, red, green][Math.floor(Math.random()*4)],
        // script.js: "var color = '#bc6da4'""
        color: JSContextGlobal('--color'), // auto update - no setInterval!
        'font-size': px(
            (new JSBridge('--document')).title.length * 5
        )
    });

    HTMLStyle.Attach('html');

};
