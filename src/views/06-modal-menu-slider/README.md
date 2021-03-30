## Original README

### Modal & Menu Slider

Simple landing page with sliding menu and modal

### Project Specifications

- Create and style landing page
- Style side nav and modal
- Add functionality to make menu open/close on button click
- Add functionality to make modal open/close on button click

----
## 我的记录(My Logs)

### 遇到的问题
- 左侧导航栏在显示时如果向下滚动会随主页面一起滚动，并在下方留下空白位置

### 修改
- 左侧导航栏的position改为了`position:fixed`，随主页面滚动不再改变位置
- 在显示导航栏时，主页面添加了向右侧缩小的效果，替代之前向右移动，避免被遮挡部分内容
- 注册表单部分复用了第一个表单校验的页面代码
- 引用了封装的淡入淡出动画组件