# MD文档 自定义用法
----------
## 框内文字

写法:

::: box {.warning}
*here be dragons*
:::

::: box {.inline}
::: box {.success}
*here be dragons*
:::

::: box {.inline}
::: box {.danger}
*here be dragons*
:::

::: box {.inline}
::: box {.info}
*here be dragons*
:::

> * ### 自定义了三个样式
> * **warning** 可以替换成 *success*  *danger* *info* 字面意思的主题颜色 
>  这里是P

## 链接

如果文字是网址或邮箱，会直接生成链接，
如： https://github.com/
address@example.com

## 表格

| Tables        | Are           | Cool  |
|-------------  |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| zebra stripes | are neat      |    $1 |

## 注脚

Here is a footnote reference,[^1] and another.[^another]

[^1]: here is the footnote.

[^another]: Here's one with multiple blocks.