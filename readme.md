# LiveSearch

> Simple live search tool.
>
> For jQuery variant, see v1

## Quick usage with CDN
```html
<srcipt src="https://unpkg.com/livesearch/js/livesearch.min.js"><script>
```

See the usage part below for more options.

## Installation

```console
$ npm i livesearch
```

or with [Yarn](https://yarnpkg.com/lang/en/)

```console
$ yarn add livesearch
```

## Usage

You can access the component in 2 ways:
- node_modules/livesearch/js/livesearch.js <- uncompressed ES6 file
- node_modules/livesearch/js/livesearch.min.js <- compressed ES5 file

### Example usage

```javascript
// ...
var livesearch = new LiveSearch('/url/where/to/search', document.getElementById('search-response-container'));

document.getElementById('search-input').addEventListener('keyup', function(e) {
    var value = this.value;
    var currentKey = e.which;

    livesearch.search(value, currentKey);
});
// ...
```

## Important notes

You can add url and container parameters as 3rd and 4th parameters for the search function to override the default ones.

You can skip the constructor parameters if you want to add them only for the search function.

You can skip the 2nd (currentKey) parameter if you want your LiveSearch to run for every single keypress (no disallowed keys).

You can change the allowed keys:

```javascript
livesearch.allowedKeys = [8, 32, 46]; // these are the default ones: backspace, space and delete
```

You can change the delay between the keypress and the search with the typeDelay attribute the same way.
