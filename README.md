# cbtruncateit

Truncate text with line-clamp.

## Get Started

 ```html

    <div class="js-truncate">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    </div>

    <div class="js-truncate-2" data-truncatelines="3" data-onlytruncate="false" data-labelopen="open" data-labelclose="close">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    </div>

    $('.js-truncate').truncateit();
    $('.js-truncate-2').truncateit();

 ```
## Options
```js
{
    method: 2,
    /*  Values: 1 or 2
     *  Method 1 - Truncate by cell height
     *  Method 2 - Truncate by lines with line-clamp
     */
    heightclose: 24,
    /*   Values: number
     *   Method 1 height in px
     */
    lines: 3,
    /*  Values: number
     *  Method 2 visible lines 
     */
    duration: 250,
    /*  Values: number
     *  Open/Close Duration
     */
    labelopen: 'open',
    /*  Values: string
     *  Button label open
     */
    labelclose: 'close',
    /*  Values: string
     *  Button label close
     */
    onlytruncate: false,
    /*  Values: true, false
     *  Truncate without open/close buttons
     */
    autoCloseInContainer: false,
    /*  Values: true, false
     *  Truncate without open/close buttons
     */
}
```


## Events

### afterInit

Fired after init 

`afterInit: function(container){}`

### beforeOpen

Fired befor open

`beforeOpen: function(container, item){}`

### afterOpen

Fired after open

`afterOpen: function(container, item){}`

### afterClose

Fired after close

`afterClose: function(container, item){}`

## Methods

### update

Update truncated elements 

`$(js-truncate).('update')`
