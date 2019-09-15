import tingle from 'tingle.js'
import 'tingle.js/dist/tingle.css';

export let modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Закрыть",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function () {
        
    },
    onClose: function () {
        
    },
    beforeClose: function () {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
    }
});

// set content


// add a button
modal.addFooterBtn('Закрыть', 'tingle-btn tingle-btn--primary', function () {
    // here goes some logic
    modal.close();
});