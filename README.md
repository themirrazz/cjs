# Cascade JavaScript (CJS)
Have you ever wish CSS had a bit more interactivity? I mean, sure you can manipulate inline styles from JavaScript, and you can also create a `<style>` element in JavaScript and manually load CSS, but at that point, you might as well just toggle classes. I decided to bridge the gap between them. This is the first stable version of Cascade JavaScript.

## Getting Your Website Ready
CJS is very non-standard, and, most likely, will never be a standard. So there's a few things that you have to do to get your website ready to use CJS.

### Step 1. Download the handler
Download the file [cjs-handler.js](/cjs-handler.js) and add it to the root of your website (or wherever you like, really - just make sure it's easy for you to access!)

### Step 2. Include it in your HTML file
```html
<!DOCTYPE html>
<html>
    <head>
        <title>My Cool Website</title>
    </head>
    <body>
        <h1>header</h1>
        <p>paragraph</p>
        <script src='./cjs-handler.js'></script>
    </body>
</html>
```

### Step 3. Add your stylesheet!
> [!NOTE]
> CJS stylesheets end in '.jsx', but they don't use REACT at all.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My Cool Website</title>
        <link rel="stylesheet" href="./styles.jsx" />
    </head>
    <body>
        <h1>header</h1>
        <p>paragraph</p>
        <script src='./cjs-handler.js'></script>
    </body>
</html>
```

## Documentation
TODO: Add full documentation.
