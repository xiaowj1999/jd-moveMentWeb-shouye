// window.onload = function () {

// }

// 移动端一般很少使用on添加事件 使用最新的方式addEventListener的方法
// 有些H5C3里面新增的事件 只能使用 addEventListener方法添加
window.addEventListener('load', function() {
    /*1. 需求： 在滚动条滚动距离在轮播图高度范围内的时候实现顶部搜索的背景色透明度渐变
        rgba(255,0,0,0)
        rgba(255,0,0,1)
        rgba的最后一个值透明度从0-1的变化
    2. 思路： 计算当前的滚动条滚动到的距离的透明度的值
        1. 获取当前滚动条的距离 
        2. 获取当前轮播图的高度 
        3. 计算透明度 = 距离/高度
        4. 计算好后把透明度值 设置背景色的rgba里面把最后一个值改成计算的透明度*/
    // 3. 获取轮播图高度 
    var slideHeight = document.querySelector('#slide').offsetHeight;
    // 6. 获取顶部元素
    var header = document.querySelector('#header');
    // 1. 给window添加一个滚动条滚动的事件
    window.addEventListener('scroll', function() {
        setOpacity(slideHeight);
    });
    setOpacity(slideHeight);


    // 4. 调用JS的初始化函数初始化swiper
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项 会自动在轮播图所有图片容器的最前面和最后面多放一张  第一张就是最后一张 最后一张就是第一张
        //初始化自动轮播图 参数也是一个对象 
        autoplay: {
            delay: 3000, //间隔时间 
            stopOnLastSlide: false, //在最后一张是否要停止  如果开启loop模式无效
            disableOnInteraction: false, // 是否要当(交互的时候)滑动的时候禁用自动轮播图
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        // navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },

        // 如果需要滚动条
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
    })

    /* 
    1. 需求： 有一个未来的时间    还有当前的时间  使用未来的时间-当前的时间作为一个倒计时 把这个倒计时时间 设置到页面中显示 分别显示时分秒   每隔一秒倒计时总时间要--  页面时时更新
	 2. 思路
	    1. 获取到未来的时间
	    2. 获取当前的时间
	    3. 倒计时的总时间 = 使用未来时间-当前时间 
	    4. 定一个定时器(每隔1秒执行一次) 让总时间每秒--
	    5. 计算-- 完后的时间的 时 分 秒
	    6. 把时分秒的十位和个位分别设置到每个span里面
	*/
	// 获取未来时间 使用new Date函数 传递参数   年 月 日 时 分 秒   每个都是数字用逗号隔开 但是注意月份是0-11
	// getTime 函数是把时间转成毫秒数 从1970-1-1-0:00:00 - 2018,11-14-16:00:00
	var futureTime = new Date(2018,10,14,15,00,00).getTime(); 
	// console.log(futureTime);
	// 获取当前时间 使用new Date不传参表示当前时间
	var nowTime = new Date().getTime();
	// console.log(nowTime);
	// 求当前的总时间 =  未来时间 - 当前时间 
	// 但是这是一个毫秒数 我们倒计时需要的是秒数还要 / 1000 转成秒
	// console.log(futureTime-nowTime);
	var time = Math.floor((futureTime - nowTime ) / 1000);
	// 获取页面显示时分秒的所有span元素 所有元素带All
	var spans = document.querySelectorAll('.seckill-time span');
	// 定义定时器 让总时间 每隔1秒--
	setInterval(function () {
		//每隔1秒--
		time--;
		if(time <= 0){
			time = 7200;
		}
		// 求当前总时间的小时数  =  总时间 / 3600  因为1个小时是3600  2 小时 7200    7200/3600
		var hour = Math.floor(time / 3600);
		// console.log(hour);
		// 求分钟 使用总时间 / 60 因为1分钟60秒 但是时间可能超过1小时 把小时部分取模去掉 3660 / 60 = 61  % 60  == 1
		var minute = Math.floor(time / 60 % 60);
		// console.log(minute);
		// 求秒 总时间 % 60  70 % 60  = 10   130 % 60 = 10
		var second = Math.floor(time % 60);
		// console.log(second);
		//把小时的十位和个位显示到页面上  十位  小时 / 10   12 / 10 = 1    个位 小时 % 10  = 2
		spans[0].innerHTML = Math.floor(hour / 10);
		spans[1].innerHTML = Math.floor(hour % 10);
		spans[3].innerHTML = Math.floor(minute / 10);
		spans[4].innerHTML = Math.floor(minute % 10);
		spans[6].innerHTML = Math.floor(second / 10);
		spans[7].innerHTML = Math.floor(second % 10);
	}, 1000);
});

function setOpacity(slideHeight) {
    // 2. 获取滚动条滚动的距离  兼容性写法 浏览器版本不一样 属性不一样
    //  || 断路运算符 如果 || 前面的值为true 返回前面的值  前面的值为false 就返回后面的值
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 4. 计算透明度值   等于滚动条距离/轮播图高度
    var opacity = scrollTop / slideHeight;
    // 5. 判断当透明的值小于等于1 的时候就设置计算的透明度值
    if (opacity <= 1) {
        // 7. 设置头部的透明度值为当前计算的透明度值
        header.style.backgroundColor = 'rgba(222, 24, 27, ' + opacity + ')';
    } else {
        // 8. 如果透明度值超过了1 默认设置为1
        header.style.backgroundColor = 'rgba(222, 24, 27, 1 )';
    }
}
