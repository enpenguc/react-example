# React生命周期介绍
[组件生命周期]

### 一、理论

组件本质上是状态机，输入确定，输出一定确定

生命周期的三个阶段，三者时间是不固定的，只是在逻辑上的分类。

#### 二、初始化阶段：

* getDefaultProps：获取实例的默认属性(即使没有生成实例，组件的第一个实例被初始化CreateClass的时候调用，只调用一次,)
* getInitialState：获取每个实例的初始化状态（每个实例自己维护）
* componentWillMount：组件即将被装载、渲染到页面上（render之前最好一次修改状态的机会）
* render：组件在这里生成虚拟的DOM节点（只能访问this.props和this.state；只有一个顶层组件，也就是说render返回值值职能是一个组件；不允许修改状态和DOM输出）
* componentDidMount：组件真正在被装载之后，可以修改DOM

### 三、运行中状态：

* componentWillReceiveProps：组件将要接收到属性的时候调用（赶在父组件修改真正发生之前,可以修改属性和状态）
* shouldComponentUpdate：组件接受到新属性或者新状态的时候（可以返回false，接收数据后不更新，阻止render调用，后面的函数不会被继续执行了）
* componentWillUpdate：不能修改属性和状态
* render：只能访问this.props和this.state；只有一个顶层组件，也就是说render返回值只能是一个组件；不允许修改状态和DOM输出
* componentDidUpdate：可以修改DOM

### 四、销毁阶段：

* componentWillUnmount：开发者需要来销毁（组件真正删除之前调用，比如计时器和事件监听器）
