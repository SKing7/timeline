~function () {
	var ui = {};
	ui. getComputedStyle = function(elem, pro) {
		if (!pro) return window.getComputedStyle(elem, null);
		return window.getComputedStyle(elem, null).getPropertyValue(pro);
	}
	var scrollPx = document.body.scrollTop;
	var action = '';
	var ndP0 = getElementsByClassName('parallax0')[0];
	var ndP1 = getElementsByClassName('parallax1')[0];
	var ndP2 = getElementsByClassName('parallax2')[0];
	var topEdge = 0;
	ndP0.style.top=0;
	ndP1.style.top=0;
	ndP2.style.top=0;
	var windowH = window.innerHeight;
	var cardinal = [1, 1.5, 1.8];
	window.clearRequestInterval = function(handle) {
		//window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
		//window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
		//window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
		//window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
		//window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
		//window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
		clearInterval(handle);
	}
	window.requestAnimFrame = window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame;

	avalon.define('www_uiguide', function (vm) {
		var index = 0;
		var months = [];
		var circles = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34]
		var nlNodeToScroll = [];
		var duration = 1000; 
		var timer;
		var storeScrollTop = document.body.scrollTop;
		for(var i in window.indexData) {
			if (indexData.hasOwnProperty(i)) {
				months.push({
					key: i,
					item: indexData[i]
				});
			}
		}
		vm.circles = circles;
		months.sort(function (a, b) {
			return b.key + a.key;
		})
		vm.months = months;
		vm.cb = cb;
		vm.circleCb = function () {
			var circles = getElementsByClassName('circle');
			for(var i = 0; i < circles.length; i++) {
				circles[i].style.top = (i + 1) * getRandom(270, 540) + 'px'
			}
		}
		vm.outerHeight =  ui.getComputedStyle(ndP0, 'height');
		setTimeout(function () {
			vm.outerHeight =  ui.getComputedStyle(ndP0, 'height');
		}, 500);
		var scrollEnd = true;
		var scrollTimer;
		var timingFun;
		timingFun = Bezier.unitBezier(0.13, 0.4, 0, 0.99);
		timerQ = [];
		avalon.bind(window, 'scroll', function () {
			var sTop  = document.body.scrollTop;
			var delta = storeScrollTop >  sTop ? -1 : 1; //-1  线上滚动
			storeScrollTop = sTop; 
			if (timer) {
				timerQ.push(timer);
				window.setTimeout(function() {
					for(var i = 0; i < timerQ.length; i++)
						window.clearRequestInterval(timerQ[i])
				}, 500)
			}
			var scrollTop = parseInt(sTop, 10);
			var top,
				diff,	
				step = 5,
				diffIndex,
				target,
				initTop = [],
				startTime = new Date().getTime(),
				nd;

			for (var i = 0; i < nlNodeToScroll.length; i++) {
				initTop[i] = parseInt(nlNodeToScroll[i].style.top, 10) || 0;
			}

			timer = setFrame(function () {
				for (var i = 0; i < nlNodeToScroll.length; i++) {
					nd = nlNodeToScroll[i];
					nd.style.top = getPx(initTop[i], i) * cardinal[i] + 'px' 
				}
			}, 2);
			function getPx(initTop, i) {
				if (isNaN(+initTop)) return;
				diffIndex = Math.min((new Date().getTime() - startTime) / duration, 1);
				target = initTop / cardinal[i] +  timingFun(diffIndex, duration) * (-scrollTop - initTop / cardinal[i]);
				return delta > 0 ? Math.max(target, -scrollTop) : Math.min(target, -scrollTop);
			}	
		});
		var nowIndex = 0;
		vm.nowIndex= {};
		for (var i = 0; i < months.length; i++) {
			vm.nowIndex[months[i].key] = nowIndex;
			nowIndex += months[i].item.length;
		}
		function cb() {
			var child = getFirstNode(this);
			if (!child) return;
			var monthNum = child.className.match(/tree__item--m(\d+)/)[1]
			var ndTarget = getElementsByClassName('month--m' + monthNum)[0];
			var oStyle = ui.getComputedStyle(child);
			var viewTop  = getElementViewTop(child);
			//根据月份下的第一个项目设置坐标位置
			if (hasClass(child, 'tree__item--right')) {
				ndTarget.style.left = getRandom(120, 250) + 'px';
			} else {
				ndTarget.style.left = (parseInt(oStyle.getPropertyValue('width'), 10) + getRandom(120, 250)) + 'px';
			}
			ndTarget.style.top =  (viewTop - topEdge) * (cardinal[1] -1) + 
				getRandom(viewTop, viewTop + parseInt(oStyle.getPropertyValue('height'), 10) - parseInt(ui.getComputedStyle(ndTarget, 'height'), 10)) + 'px';
			index++;
			nlNodeToScroll.push(ndP0);
			nlNodeToScroll.push(ndP1);
			nlNodeToScroll.push(ndP2);
		}
		function hasClass(nd, cn) {
			return new RegExp('(^|\s*)' + cn + '(\s*|$)').test(nd.className);
		}
		function getItemByMonth(m) {
			for(var i = 0; i < months.length; i++) {
				if (months[i].key == m) return months[i].item.length;
			}
		}
		function getRandom(from, to) {
			return from + Math.random() * (-from + to)
		}
		function getFirstNode(nd) {
			var nlChild = nd.childNodes;
			for(var i = 0; i < nlChild.length; i++) {
				if (nlChild.item(i).nodeType === 1) {
					return nlChild.item(i);
				}
			}

		}
		function getElementViewTop(element){
			var actualTop = element.offsetTop;
			var current = element.offsetParent;
	　　　　while (current !== null){
	　　　　　　actualTop += current. offsetTop;
	　　　　　　current = current.offsetParent;
	　　　　}

	　　　　return actualTop;
	　　}
		function scroll() {
			var nd,
				scrollTop = parseInt(document.body.scrollTop, 10);

			if (nlNodeToScroll.length < 1) return;
				for (var i = 0; i < nlNodeToScroll.length; i++) {
					nd = nlNodeToScroll[i]
					nd.style.top = -(scrollTop * cardinal[i]) + 'px' 
				}

		}
		function supportFeature(feature) { //不检查支持前缀的
			var b = document.body || document.documentElement;
			var style = b.style,
				//v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'],
				v = [],
				f = feature;

			if (typeof style[feature] === 'string') return true;
			f = f.charAt(0).toUpperCase() + f.substr(1);
			for (var i = 0 ; i <  v.length; i++) {
				if (typeof style[v[i] + f] === 'string') {
					return true;
				}
			}
			return false;
		}
		function setFrame(cb, time) {
			time = time || 1;
			//if (!requestAnimFrame) 
			return setInterval(cb, 1000/30)
			var handle = new Object();
			handle.time = 1;
			function loop() {
				if (handle.time % time === 0) {
					cb();
				}
				handle.value = requestAnimFrame(loop);
				handle.time++;
			};
			handle.value = requestAnimFrame(loop);
			return handle;
		}
	});
	avalon.scan();
	function getElementsByClassName(cn) {
		if ('querySelector' in document && typeof document.querySelector === 'function') {
				return document.querySelectorAll('.' + cn);
			} else if ( 'getElementsByClassName' in document && typeof document.getElementsByClassName === 'function') {
				return document.getElementsByClassName(cn);
			} else {
				elements = document.getElementsByTagName("*");
				pattern = new RegExp("(^|\\s)" + cn + "(\\s|$)");
				for (i = 0; i < elements.length; i++) {
					if (pattern.test(elements[i].className) ) {
						results.push(elements[i]);
					}
				}
			}
	}
}();
