 window.addEventListener('load', function() {
 	 // 初始化左侧分类swiper内容滚动
     var swiper = new Swiper('.category-left .swiper-container', {
         direction: 'vertical',
         slidesPerView: 'auto',
         freeMode: true,
     });
 	// 初始化右侧分类swiper内容滚动
     var swiper = new Swiper('.category-right .swiper-container', {
         direction: 'vertical',
         slidesPerView: 'auto',
         freeMode: true,
         scrollbar: {
             el: '.swiper-scrollbar',
         },
         mousewheel: true,
     });

     /* 
     实现分类左侧点击功能： 点击当前的菜单要位移到 当前菜单吸顶的位置
     1. 默认插件使用translate3d设置的位移
     2. 要位移多少距离 =  当前点击的li的下标 * li的高度
     3. 设置当前swiper-wrapper 元素的位移属性上
     实现思路
        1. 给所有li添加点击事件 拿到当前点击li的索引
        2. 拿到当前li的高度
        3. 计算位移距离 =  li的索引+li的高度
        4. 获取当前swiper-wrapper元素设置位移
        5. 判断当前位移的距离是否超过了最小位移的距离(往上位移负值) 如果超过了就 设置为最小位移的距离
        6. 如果需要过渡在给swiper-wrapper添加一个过渡效果
        7. 获取所有li删除active类名
        8. 给当前li添加一个active类名
     */
    // 1. 获取所有li元素
    var lis = document.querySelectorAll('.category-left ul li');
    // 8. 计算最小位移的值  父元素category-left的高度  - 子元素ul的高度
    var parentHeight = document.querySelector('.category-left').offsetHeight;
    var childrenHeight = document.querySelector('.category-left ul').offsetHeight;
    var minTranslateY = parentHeight - childrenHeight;
    // 获取滑动容器
    var swiperWrapper = document.querySelector('.swiper-wrapper');
    // 2. 遍历所有li
    for (var i = 0; i < lis.length; i++) {
        // 3. 给每个li添加一个索引 值就是当前循环i
        lis[i].index = i;//设置了看不见 JS属性
        // lis[i].setAttribute('index', i);//设置了页面能看见  标签属性
        // 4. 给每个li添加点击事件
        lis[i].addEventListener('click', function () {
            // 如果使用对象属性添加的索引 就使用对象属性获取 如果使用标签属性 使用获取标签属性方法获取
            // console.log(this.index);
            // console.log(this.getAttribute('index'));
            // 5. 获取当前点击li的索引
            var index = this.index;
            // 6. 获取当前点击li的高度
            var liHeight = this.offsetHeight;
            // 7. 计算当前需要位移的值 因为要往上走 往上走值是负值 计算的值都是正的所以要加一个负号
            var translateY = - index * liHeight;            
            // 9. 判断 如果当前计算的位移值的值 大于最小位移值 可以滑动 小于最小位移值就不能滑动 设置了最小位移值
            if(translateY < minTranslateY){
                // 如果小于就设置为最小位移值
                translateY = minTranslateY;
            }
            // 10. 把计算并判断好值 设置到滑动元素上 注意要带单位
            swiperWrapper.style.transform = 'translate3d(0px, '+translateY+'px, 0px)';
            // 11. 如果需要慢慢位移就可以给当前元素添加一个过渡 慢慢位移
            swiperWrapper.style.transition = 'all 0.3s';
            // 12. 把所有li的active删掉
            for (var i = 0; i < lis.length; i++) {
                lis[i].classList.remove('active');
            }
            // 13. 给当前点击li添加
            this.classList.add('active');
        }); 
    }
 })
