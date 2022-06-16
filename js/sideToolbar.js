'use strict';

var sideToolbar = {
    view: null,

    setColor: function (color) {
        this.view.style.backgroundColor = color;
        console.log('setColor()');
    }
}

sideToolbar.view = document.createElement('div');
sideToolbar.view.classList.add('grey')
sideToolbar.view.classList.add('darken-2');
sideToolbar.view.id = 'side-tool-bar';

let panel = document.createElement('div');
panel.classList.add('card-panel');
panel.classList.add('color-chart');
panel.id = 'fore-color-panel';
sideToolbar.view.appendChild(panel);

export default sideToolbar;