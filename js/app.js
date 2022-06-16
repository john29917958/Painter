'use strict';

import colors from './colors.js';
M.AutoInit();

(function () {
    const sideToolBar = document.querySelector('#side-tool-bar');
    const sidebar = document.querySelector('#sidebar');
    const canvas = document.querySelector('canvas');
    const canvasCtx = canvas.getContext('2d');
    const foreColorPanel = document.querySelector('#fore-color-panel');
    let colorCharts = [];    

    function getCursorPosition(canvas, e) {
        const area = canvas.getBoundingClientRect();
        const x = e.clientX - area.left;
        const y = e.clientY - area.top;

        return {    
            x: x,
            y: y
        };
    }

    function drawLine(canvasCtx, startPos, endPos) {        
        canvasCtx.moveTo(startPos.x, startPos.y);
        canvasCtx.lineTo(endPos.x, endPos.y);
        canvasCtx.stroke();
    }

    canvasCtx.canvas.width = document.body.offsetWidth - (sideToolBar.offsetWidth + sidebar.offsetWidth + 30);
    canvasCtx.canvas.height = document.body.offsetHeight - 68;    

    foreColorPanel.style.backgroundColor = colors[0];
    colors.forEach(function (color, index) {
        var colorChart = document.createElement('div');
        colorChart.classList.add('card-panel');
        colorChart.classList.add('color-chart');
        if (index === 0) {
            colorChart.classList.add('selected');
        }
        colorChart.style.backgroundColor = color;
        colorChart.addEventListener('mousedown', function () {
            var self = this;

            foreColorPanel.style.backgroundColor = color;
            canvasCtx.strokeStyle = color;
            colorCharts.forEach(function (colorChart) {
                colorChart.classList.remove('selected');
                self.classList.add('selected');
            });
        });
        sidebar.appendChild(colorChart);
        colorCharts.push(colorChart);
    });

    canvasCtx.strokeStyle = colors[0];
    canvasCtx.lineWidth = 1;
    let prevPos = { x: 0, y: 0 };
    let pressedPos = { x: 0, y: 0 };
    let isPressed = false;

    canvas.addEventListener('mousedown', function (e) {
        prevPos = getCursorPosition(canvas, e);
        pressedPos = prevPos;
        isPressed = true;
        drawLine(canvasCtx, prevPos, pressedPos);
    });
    canvas.addEventListener('mousemove', function (e) {
        if (isPressed) {
            prevPos = pressedPos;
            pressedPos = getCursorPosition(canvas, e);
            drawLine(canvasCtx, prevPos, pressedPos);
        }
    });
    canvas.addEventListener('mouseup', function (e) {
        isPressed = false;
        prevPos = pressedPos;
        pressedPos = getCursorPosition(canvas, e);
        drawLine(canvasCtx, prevPos, pressedPos);
        canvasCtx.beginPath();
    });
})();
