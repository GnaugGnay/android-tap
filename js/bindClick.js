//原生js绑定
function bindClick(className) {
    var nodes = document.getElementsByClassName(className);
    for (var i = 0; i < nodes.length; i++) {
        (function (i) {
            nodes[i].onclick = function (e) {
                _itemClick(e, nodes[i], 300);
            };
        })(i)
    }
}

function _itemClick(e, item, duration) {
    var fps = 60;
    var width = item.clientWidth;
    var height = item.clientHeight;
    // 要填充整个div背景所需的最小半径
    var radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

    //创建背景节点并初始化
    var circleNode = document.createElement('div');
    circleNode.setAttribute('class', 'circle');
    _setCss(circleNode, e.offsetY, e.offsetX, 0, 0);
    item.appendChild(circleNode);

    //根据fps和duration计算每一帧需要改变的宽度
    var deltaWidth = radius * 2 / duration * (1000 / fps);

    //开始动画
    var interval = setInterval(function (argument) {
        //当前宽度，并去除'px'转化为Number
        var nowWidth = Number(circleNode.style.width.replace(/[a-zA-Z]/g, ''));
        //结束判断
        if (nowWidth >= radius * 2) {
            clearInterval(interval);
            circleNode.remove();
        }
        //设置css 
        nowWidth += deltaWidth;
        _setCss(circleNode, e.offsetY, e.offsetX, nowWidth, nowWidth);
    }, 1000 / fps);

    function _setCss(node, centerY, centerX, width, height) {
        node.style.width = width + 'px';
        node.style.height = height + 'px';
        var topLeft = _getTopLeft(e.offsetY, e.offsetX, width, height);
        node.style.top = topLeft.top + 'px';
        node.style.left = topLeft.left + 'px';
    }

    function _getTopLeft(centerY, centerX, width, height) {
        return {
            top: centerY - height / 2,
            left: centerX - width / 2
        }
    }
}

