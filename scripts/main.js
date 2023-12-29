$(function() {

    $('.js-truncate-1').truncateit({
        method: 1,
        afterInit: function(container){
            console.log('Init', container)
        },
        beforeOpen: function(container, item){
            console.log('before open', item)
        },
        afterOpen: function(container, item){
            console.log('after open', item) 
        },
        afterClose: function(container, item){
            console.log('before close', item)
        },
    })

    $('.js-truncate-2').truncateit({
        method: 2,
        afterInit: function(container){
            console.log('Init', container)
        },
        beforeOpen: function(container, item){
            console.log('before open', item)
        },
        afterOpen: function(container, item){
            console.log('after open', item) 
        },
        afterClose: function(container, item){
            console.log('before close', item)
        },
    })

})