document.addEventListener('DOMContentLoaded', function(){
    

    //serviceWorker
    if ('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registred', registration)
            })
            .catch(error => {
                console.log('SW failed', error)
            })
    }


})