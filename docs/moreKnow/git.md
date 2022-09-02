---
title: git 的基础使用命令
date: 2022/08/17
tags:
 - moreKonw
categories:
 - 百家齐放
---

<!-- more -->

# git 的基础使用命令

## 1.基本介绍

工作区 -->暂存区--> 版本库 --> 远程版本库 

工作区：文件的增加，修改，删除操作都在工作区执行 

暂存区：文件修改后且add后，到暂存区 

版本库：文件commit后，到版本库 

远程仓库：本地版本库的文件push到远程仓库，从远程仓库pull/fetch文件到本地 



HEAD保存的是最后一次提交点（当前），指向当前工作的分支 

HEAD^上一个版本 

HEAD^^上上个版本 

HEAD~10上10个版本 

## 2.配置用户名及邮箱 

`git config --global user.name 'wudaxun' ` 使用域账号

 `git config --global user.email '522864637@qq.com' `使用公司邮箱

## 3.配置ssh

为了避免每次提交代码都需要 输入账户名和密码

运行以下命令

`ssh-keygen -t rsa -C '522864637@qq.com'` 一般建议，远程仓库的 绑定的邮箱账号

然后一路按回车

可以使用任何类型的软件打开该文件，推荐可以使用记事本， 复制其中的代码

打开gitee，找到设置 - 安全设置 - ssh公钥 - 填写信息即可

## 4.基本的操作

1.查看配置信息
`git config -l`

2.初始化仓库（本地仓库） 
`git init`

3.克隆远程代码
`git clone url`

3.拉取远程代码
`git pull` 相当于 git fetch 和git merge 

5.4.从其他分支合并代码到当前分支
`git merge branch-name`

4.比较文件
`git diff [filename]`

4.添加文件
`git add [.|filename]`

5.提交文件
`git commit -[a]m ‘备注信息’`

6.查看仓库状态git status
`git status`

```
On branch master 处于master分支Initial commit 初始化提交Untracked files: 未跟踪的文件
  (use "git add <file>..." to include in what will be committed) 使用add命令来添加文件
nothing added to commit but untracked files present (use "git add" to track) 没有提交但未添加文件
（用“git add”追踪）
```

7.查看日志
`git log`

```
commit cbc220915fa1039e475b7865cc05bc42c6a5e826 提交的编号Author: huz02 <huz02@vanke.com> 作 者
Date: Tue Nov 28 14:23:10 2017 +0800 提交日期
     add test.txt 提交的内容（添加test.txt文件） git log --pretty=oneline 格式化查看日志
```

8.查看某个提交修改的内容
`git show commitID`

12.查看某个文件修改记录
`git log -p filename `

## 5.分支管理

查看分支
`git branch -a` // all 全部分支
`git branch -r` // remote 远程分支
`git branch -l` // local 本地分支

创建分支
`git branch branch_name`

切换分支
`git checkout branch_name`

创建分支并切换到分支
`git checkout -b new_branch` （默认为空，从master分支拉取代码）

删除分支，如果正在当前分支，则不能删除
`git branch -d branch_name

删除远程分支
`git push origin --delete branch_name`

合并自分支代码，先切换到master分支
`git checkout master` 切换到主分支

`git merge sub_branch` 合并sub分支代码到主分支

`git merge sub`

```
Updating 5ce93f7..b59cc48 Fast-forward

 hahaha.txt | 17 ++---------------

 1 file changed, 2 insertions(+), 15 deletions(-)

注意：Fast-forward   表示快速合并（将master的指针指向brh），不会产生新的commit  id，只是利用了子分支 的commit id继续操作

注意：如果在子分支修改了代码，未commit就切换到master，master也会显示文件被修改了   推送分支代码到远程分支
```

git push origin master
git push origin sub_branch 推送sub分支

推送本地分支到远程，如果远程分支没有，则使用下面命令
`git push --set-upstream origin invoice`

## 5、代码回退

1. 修改本地文件，还未add操作，注意：所有修改将丢失
   `git checkout -- filename`    需要进一步验证
2. 添加新文件且执行了add，想返回未add状态，保留修改的把内容
   `git reset HEAD filename`
3. 如果文件被删除后，想要恢复源文件
   `git checkout HEAD -- filename`  需要验证
4. 文件执行了commit后，想回到上一个版本（log会被删除）
   `git reset --soft commit_id` 回退到制定版本，回到add后，commit前的代码
   `git reset cs`
5. `d` 回退到指定版本修改后，回到修改后，add前的代码（默认--mixed，可省略）
   `git reset --hard commit_id` 回退到指定版本，回到修改前的代码

## 6.如何团队操作

**组长第一次**

```nginx
// 1.创建一个项目  -- sz2108-git  - 初始化项目git
cd sz2108-git
git init

// 2.添加一个文件  common.js  ---   // 这里是公共的文件，组员都可以修改
git add .
git commit -m '初始化项目'
```

创建远程仓库 - sz2108-git (分为git协议和https协议，如果配置过ssh，默认就是选中ssh)

```nginx
git remote add origin git@gitee.com:daxunxun/sz2108-git.git

git push -u origin master  // -u 只有在第一次提交代码时才会添加
```

给当前的项目添加项目组成员

当前项目 - 管理 - 仓库成员管理 - 添加仓库成员 - 建议全部添加为 管理员，复制链接，发给队友，队友同意之后即可加入

**组员第一次**

```nginx
// 1.同意加入项目组
// 2.找到自己的代码管理文件夹
// 3.克隆远程的仓库   选择ssh 的克隆地址
git clone git@gitee.com:daxunxun/sz2108-git.git


// 4.git默认是master分支，开发人员不可以在master分支直接开发

git checkout -b 'adev'
git branch

// 5.编写代码  a.js   =====> a开发   common.js ----  aaaaa
// 6.提交代码
git add .
git commit -m 'a开发***功能'
// 7.提交到远程的adev分支
git push origin adev
// 8.第一天的活结束
```

如果组长也是要写代码，参考组员的操作 - 假设组长是b开发者

```nginx
git checkout -b 'bdev'
// 编写代码
// 提交代码
git add .
git commit -m 'b 开发的*** 功能实现'
git push origin bdev
```

**组长负责合并代码**

```nginx
// 一定要切换到master分支
git checkout master   
// 合并 自己分支代码----- 
git pull origin bdev 
git add .
git commit -m '合并bdev分支代码'
git push origin master


// 合并其他分支代码
git pull origin adev
// 此时可能会有代码的冲突问题，建议手动修改冲突
git add .
git commit -m '合并adev分支代码'
git push origin master

// 合并完成，切回自己的分支
git checkout bdev
// 拉取最新的代码
git pull origin master
// 开发 提交 合并 。。。。
```

**组员得知代码合并完成**

```nginx
git pull origin master

// 开发 提交
```

```
vi模式下
输入完成 按esc

输入 :wq!   保存并且退出
:q!  退出
```

