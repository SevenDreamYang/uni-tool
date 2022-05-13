# UNI-TOOL

> version : 0.0.2
> status : 测试-未测试
> TS 化-未完成
> env:uni 项目

- 剪切版

  > 封装 uni 设置剪切板与获取剪切板 对 uni 的 setClipboardData 和 setClipboardData 重新封装、磨平 H5 没有的尴尬情况
  >
  > 小程序里使用 uni 提供方法

  - 使用方法

    ```
    // 待完善
    ```

  - setClipboardData

    > 使用 App 端 使用 plus 重新封装。H5 使用 document.execCommand('copy') 封装 并 Promise 化

    ```js
    setClipboardData('SevenDreamYang', true)
      .then((res) => {})
      .catch((err) => {});
    ```

    - params

    |    字段    |  类型   | 环境 |         描述         | 默认 | 是否必传 |
    | :--------: | :-----: | :--: | :------------------: | :--: | :------: |
    |    data    | string  |      |    需要复制的文字    |      |   yes    |
    | showToast  | boolean |      | 是否开启复制成功提示 |      |          |
    | successMsg | string  |      |     复制成功提示     |      |          |
    |  failMsg   | string  |      |     复制失败提示     |      |          |

    - then 返回

    | 字段 |  类型  | 环境 |               描述               |
    | :--: | :----: | :--: | :------------------------------: |
    | code | number |      |        成功 code 1 为成功        |
    | env  | string |      | 环境：ios ｜ android ｜ H5 ｜ MP |
    | text | string |      |            复制的文字            |

  - getClipboardData

    > 使用 App 端 使用 plus 重新封装。H5 使用 window.navigator.clipboard 封装 并 Promise 化
    >
    > 生产环境中H5 中使用协议必须是 HTTPS，且在用户事先授予网站或应用对剪切板的访问许可之后，才可有效。
    >
    > 开发阶段请使用 http://localhost 来进行测试和开发，ip无效。

    ```js
    getClipboardData()
      .then((res) => {
        console.log(res); // SevenDreamYang
      })
      .catch((err) => {});
    ```

- uni 跳转 router 化

  > 封装 uni 的路由与页面跳转 APi

  - 使用方法

    ```
    // 待完善
    ```

  - push(option:string | config )

    > 对应 [uni.navigateTo(OBJECT)](https://uniapp.dcloud.io/api/router.html#navigateto)
    >
    > 保留当前页面，跳转到应用内的某个页面，使用 uni.navigateBack 可以返回到原页面。
    >
    > 页面大于 10 无法继续跳转 navigateTo 将变换成 redirectTo

    ```js
    // 直接传入地址
    this.uRouter.push('/pages/test/test?id=1');
    // 传入对象
    this.uRouter.push({
      path: '/pages/test/test',
      params: { id: 1 },
      query: {},
    });
    ```

    - config

    |       字段        |  类型  | 环境 |                          描述                          | 是否必传 |
    | :---------------: | :----: | :--: | :----------------------------------------------------: | :------: |
    |       path        | string |      |                        跳转路径                        |   yes    |
    |      params       | object |      |       携带参数 与 query 选择使用，用哪个都可以。       |          |
    |       query       | object |      |      携带参数 与 params 选择使用，用哪个都可以。       |          |
    |      events       | object |      | 页面间通信接口，用于监听被打开页面发送到当前页面的数据 |          |
    |   animationType   | string | APP  |                   窗口显示的动画效果                   |          |
    | animationDuration | number | App  |              窗口动画持续时间，单位为 ms               |          |

  - replace(option:string | config );

    > 对应 [uni.redirectTo(OBJECT)](https://uniapp.dcloud.io/api/router.html#redirectTo)
    >
    > url 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。
    >
    > 关闭当前页面，跳转到应用内的某个页面。

    ```js
    this.uRouter.replace('/pages/test/test?id=1');
    // 传入对象
    this.uRouter.replace({
      path: '/pages/test/test',
      params: { id: 1 },
      query: {},
    });
    ```

    - config

    |  字段  |  类型  | 环境 |                    描述                     | 是否必传 |
    | :----: | :----: | :--: | :-----------------------------------------: | :------: |
    |  path  | string |      |                  跳转路径                   |   yes    |
    | params | object |      | 携带参数 与 query 选择使用，用哪个都可以。  |          |
    | query  | object |      | 携带参数 与 params 选择使用，用哪个都可以。 |          |

  - go(option: number ｜ config);

    > 对应 [uni.navigateback(OBJECT)](https://uniapp.dcloud.io/api/router.html#navigateback)
    >
    > 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层
    >
    > uni 中回退为正数 vue-router 习惯为负数 如果是 vue 习惯就找绝对值 两种任何形式传入都可以

    ```js
    this.uRouter.go(); // 回退1页
    this.uRouter.go(1); // 回退1页
    this.uRouter.go(-1); // 回退1页
    // go
    this.uRouter.replace({
      delta: 1,
    });
    ```

    - config

    |       字段        |  类型  | 环境 |                          描述                           | 默认 | 是否必传 |
    | :---------------: | :----: | :--: | :-----------------------------------------------------: | :--: | :------: |
    |       delta       | number |      | 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 |  1   |          |
    |   animationType   | string | APP  |                   窗口显示的动画效果                    |      |          |
    | animationDuration | number | App  |               窗口动画持续时间，单位为 ms               |      |          |

  - goTab(url:string);

    > 对应 [uni.switchtab(OBJECT)](https://uniapp.dcloud.io/api/router.html#switchtab)
    >
    > url 参数需要跳转的 tabBar 页面的路径（需在 pages.json 的 tabBar 字段定义的页面），路径后不能带参数
    >
    > 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。

    ```js
    this.uRouter.goTab('/pages/index/index');
    ```

  - reTo(option);

    > 对应 [uni.reLaunch(OBJECT)](https://uniapp.dcloud.io/api/router.html#reLaunch)
    >
    > 关闭所有页面，打开到应用内的某个页面。
    >
    > 需要跳转的应用内页面路径 , 路径后可以带参数。如果跳转的页面路径是 tabBar 页面则不能带参数
    >
    > H5 端调用 uni.reLaunch 之后之前页面栈会销毁，但是无法清空浏览器之前的历史记录

    ```js
    this.uRouter.reTo('/pages/test/test?id=1');
    // 传入对象
    this.uRouter.reTo({
      path: '/pages/test/test',
      params: { id: 1 },
      query: {},
    });
    ```

    - config

    |  字段  |  类型  | 环境 |                    描述                     | 是否必传 |
    | :----: | :----: | :--: | :-----------------------------------------: | :------: |
    |  path  | string |      |                  跳转路径                   |   yes    |
    | params | object |      | 携带参数 与 query 选择使用，用哪个都可以。  |          |
    | query  | object |      | 携带参数 与 params 选择使用，用哪个都可以。 |          |

- wxjssdk 二次封装

  >对微信小程序常用API进行封装
