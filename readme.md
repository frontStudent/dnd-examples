### 简介
本项目是对react-dnd官方文档部分Examples的拓展，使用cra搭建，并借助craco进行了别名设置

### 目录结构解释
在src/Examples/DropAndMove中
实现从一个物料区中拖拽元素到画布中，并可以在画布中四处拖动

在src/Examples/SortableAndMove中
实现从一个物料区中拖拽元素到列表项的内部，并可以在列表项内部四处拖动
当你拖拽列表项时，将带动其内部的所有元素

这两个案例都引用了src/Examples/Common中的一些公共组件
主要是物料区DragArea和drop之后生成的自由拖动盒子MoveBox