/**
 * 绘制圆环进度条
 * @param {string} el canvas节点
 * @param {number} percent 进度
 * @param {object} style 样式配置
 * @param {number} style.width 圆环宽度
 * @param {number} style.height 圆环高度
 * @param {string} style.bgColor 背景圆环的颜色
 * @param {string} style.foreColor 运动圆环的颜色
 * @param {number} style.lineWidth 环的宽度
 * @param {number} style.fontSize 字体大小
 * @param {string} style.fontFamily 字体
 * @param {boolean} style.lineCap 运动圆环是否圆角
 * @return {void}
 */
function drawCircle(el, percent, style = {}) {
    var defaultStyle = {
        width: style.width || 100,
        height: style.height || 100,
        bgColor: style.bgColor || '#ddd',
        foreColor: style.foreColor || '#ffa200',
        lineWidth: style.lineWidth || 5,
        fontSize: style.fontSize || 25,
        fontFamily: style.fontFamily || 'Arial',
        lineCap: style.lineCap || true,
        unit: style.unit || '',
        hidePercent: style.hidePercent
    }
    style = Object.assign(style, defaultStyle);
    // 设置容器大小
    var c = document.querySelector(el);
    c.style.width = style.width + 'px';
    c.style.height = style.height + 'px';
    // 创建一个canvas画布对象，设置宽高 (大小设为容器的两倍，防止绘制的内容模糊)
    var ctx = c.getContext('2d');
    ctx.canvas.width = style.width * 2;
    ctx.canvas.height = style.height * 2;

    var centerX = style.width;
    var centerY = style.height;
    var rad = Math.PI * 2 / 100;
    var speed = 0;

    var bgColor = style.bgColor;
    var foreColor = style.foreColor
    var lineWidth = style.lineWidth;
    var fontSize = style.fontSize;
    var fontFamily = style.fontFamily;
    var lineCap = style.lineCap;
    // 绘制背景圆环 
    function backgroundCircle() {
        //save和restore可以保证样式属性只运用于该段canvas元素  
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = lineWidth * 2;
        var radius = centerX - ctx.lineWidth;
        ctx.strokeStyle = bgColor;
        // arc()创建圆或曲线 arc(圆心x,圆心y,半径,开始角度,结束角度)
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    //绘制运动圆环  
    function foregroundCircle(n) {
        ctx.save();
        ctx.strokeStyle = foreColor;
        ctx.lineWidth = lineWidth * 2;
        // 运动圆环是否圆角
        ctx.lineCap = lineCap ? "round" : '';
        var radius = centerX - ctx.lineWidth;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + n * rad);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    //绘制文字  
    function text(n) {
        ctx.save();
        ctx.fillStyle = foreColor;
        ctx.font = fontSize * 2 + "px " + fontFamily;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        //var textWidth = ctx.measureText(n.toFixed(0)).width;
        ctx.fillText(n.toFixed(0) + style.unit, centerX, centerY);
        ctx.restore();
    }

    //执行动画  
    (function drawFrame() {
        var drawCircleAnimation = window.requestAnimationFrame(drawFrame);
        ctx.clearRect(0, 0, c.width, c.height);
        backgroundCircle();
        if (!style.hidePercent) {
            text(speed);
        }
        foregroundCircle(speed);
        if (speed >= percent) {
            window.cancelAnimationFrame(drawCircleAnimation);
            return;
        } else {
            speed += 1;
        }
    }());
}

export default drawCircle