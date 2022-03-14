//图片轮播
//图片数量不定(span标签应该按照图片数量生成,小圆点span标签激活样式active)

(function(){
    //图片切换数据
    var datas = [
        {
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/15c05b32cf948b594477dfc3eb69fb69.jpg?w=2452&h=920',
          link: 'https://www.mi.com/mi11le-5g-ne',
        },
        {
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a532e33470d046b3f044d5ea49fc5e9e.png?thumb=1&w=2452&h=920&f=webp&q=90',
          link: 'https://www.mi.com/xiaomipad5',
        },
        {
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
          link: 'https://www.mi.com/a/h/22033.html?sign=b60a6ca9167bce2d1ed8ee319cf83c75',
        },
        {
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/af7be8f65065f405f57f46a02731f78d.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
          link: 'https://www.mi.com/a/h/22812.html?sign=aab397a7ecf2ae4c1765e9d11fdccca6',
        },
      ];

    //封装dom选择器
    function $(selector){
        return document.querySelector(selector)
    }

    //获取所需dom
    var banner=$('.banner')
    var img=$('.banner img')
    var imgA=$('.banner a')
    var bannerDotBox=$('.banner-dotbox')
    var prevBtn=$('.banner .banner-left-btn')
    var nextBtn=$('.banner .banner-right-btn')

    //循环生成小圆点span标签
    for(var i=0;i<datas.length;i++){
        var span=document.createElement('span')
        bannerDotBox.appendChild(span)
    }
    //定义一个定时器
    var timer=null
    //定义当前下标currentIndex
    var currentIndex=0
    function change(currentIndex){
        //获取对应数据
        var item=datas[currentIndex]
        //图片路径和a标签跳转链接
        img.src=item.img
        imgA.href=item.link
        //切换小圆点的激活状态
        //获取激活样式的span小圆点
        var activeDot=$('.banner-dotbox .active')
        //判断是否第一次加载
        if(!activeDot){
            bannerDotBox.children[currentIndex].className='active'
        }else{
            activeDot.className=''
            bannerDotBox.children[currentIndex].className='active'
        }
        
    }

    //左按钮的切换图片
    function prevImg(){
        //获取当前索引
        currentIndex--
        if(currentIndex<0){
            currentIndex=datas.length-1
        }
        //进行切换
        change(currentIndex)
    }

    //右按钮的切换图片
    function nextImg(){
        //获取当前索引
        currentIndex++
        if(currentIndex>datas.length-1){
            currentIndex=0
        }
        //进行切换
        change(currentIndex)
    }

    //轮播启动
    function start(){
        timer=setInterval(nextImg,2000)
    }
    //轮播关闭
    function stop(){
        clearInterval(timer)
        timer=null
    }

    //给按钮绑定事件
    prevBtn.addEventListener('click',prevImg)
    nextBtn.addEventListener('click',nextImg)
    //给轮播该区域绑定移入移出事件
    banner.addEventListener('mouseenter',stop)
    banner.addEventListener('mouseleave',start)

    //给小圆点绑定顶级事件(事件委托实现)
    bannerDotBox.addEventListener('click',function(e){
        //判断点击的是否是span标签
        if(e.target.tagName==='SPAN'){
            //获取当前点击源对象再bannerDotBox儿子数组中是第几项
            //获取bannerDotBox儿子数组
            var childrens=bannerDotBox.children
            //获取对应的下标
            var index=Array.prototype.indexOf.call(childrens,e.target)
            //将获取到的下标赋值给轮播当前索引
            currentIndex=index
            //切换图片
            change(currentIndex)
        }
    })


    //初始化代码
    function init(){
        change(currentIndex)
    }
    init()
    start()
})()