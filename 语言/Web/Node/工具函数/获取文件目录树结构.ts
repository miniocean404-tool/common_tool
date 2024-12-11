// 来自：https://github.com/zhucyi/project-tree/blob/master/src/traverse.ts

import { readdirSync, statSync, Stats } from "fs"
import path, { resolve } from "path"
let levInfos: LevInfo[] = []

export interface LevInfo {
  level: number // 层级
  ancestor: string // 祖先路径
  pathName: string // 本层名
  lasStatus: number[] // 节点自身及其全部上级节点的层级末尾状态 1尾节点
}

export class File {
  private ancestor!: string
  private pathName!: string
  private level!: number
  constructor(ancestor: string, pathName: string, level: number) {
    this.ancestor = ancestor
    this.pathName = pathName
    this.level = level
  }
  getAncestor() {
    return this.ancestor
  }
  getPathName() {
    return this.pathName
  }
  getLevel() {
    return this.level
  }
}

export class Folder {
  private ancestor: string
  private pathName: string
  private level: number
  private children: (Folder | File)[]

  constructor(ancestor: string = "", pathName: string = "", level: number = 0, children: (Folder | File)[] = []) {
    this.ancestor = ancestor
    this.pathName = pathName
    this.level = level
    this.children = children
  }
  getAncestor() {
    return this.ancestor
  }
  getPathName() {
    return this.pathName
  }
  getLevel() {
    return this.level
  }
  getChildren() {
    return this.children
  }
  addChild(child: Folder | File) {
    this.children.push(child)
  }
}

/**
 * 遍历文件夹下所有文件文件夹,构建文件树
 * @param ancestor 父级路径
 * @param pathName 当前层级名
 * @param level 当前层级数
 * @param folder 根
 * @param callback 每一层的回调
 */
export function traverseFolder(
  ancestor: string,
  pathName: string = "",
  level: number = 0,
  folder: Folder = new Folder(),
  callback: (ancestor: string, pathName: string, level: number) => void = function () {},
) {
  const acPath: string = resolve(ancestor, pathName)
  if (level === 0) {
    folder = new Folder(ancestor, pathName, level)
  }
  callback(ancestor, pathName, level)
  const files = readdirSync(acPath)

  files.forEach((item: string) => {
    const curLevel = level + 1
    const fileStat: Stats = statSync(resolve(acPath, item))
    const isDirectory: boolean = fileStat.isDirectory()

    if (isDirectory) {
      const childFolder: Folder = new Folder(acPath, item, curLevel)
      folder.addChild(childFolder)
      traverseFolder(acPath, item, curLevel, childFolder, callback)
    } else {
      folder.addChild(new File(acPath, item, curLevel))
      callback(acPath, item, curLevel)
    }
  })
  return folder
}

/**
 * 遍历文件树
 * @param folder 文件树节点
 * @param callback 每一层的回调
 * @param lasStatus 每层状态点
 */
export function traverse(
  folder: Folder,
  callback: (ancestor: string, pathName: string, level: number) => void = function () {},
  lasStatus: number[] = [],
) {
  const ancestor = folder.getAncestor(),
    pathName = folder.getPathName(),
    level = folder.getLevel()

  if (folder.getLevel() === 0) {
    lasStatus = [0]
    levInfos = [
      {
        ancestor,
        pathName,
        level,
        lasStatus,
      },
    ]
  }
  callback(ancestor, pathName, level)

  const files: Array<File | Folder> = folder.getChildren()

  files.forEach((item: File | Folder, index: number) => {
    const curLevel = item.getLevel()

    lasStatus = JSON.parse(JSON.stringify(lasStatus))

    lasStatus[curLevel] = Number(index === files.length - 1)
    levInfos.push({
      ancestor: item.getAncestor(),
      pathName: item.getPathName(),
      level: curLevel,
      lasStatus,
    })

    if (item instanceof Folder) {
      traverse(<Folder>item, callback, lasStatus)
    } else {
      callback(item.getAncestor(), item.getPathName(), curLevel)
    }
  })

  if (level === 0) {
    return levInfos
  }
}

const res = traverseFolder(path.join(process.cwd()), "src")

traverse(res, (ancestor, filepath, level) => {
  console.log(ancestor, filepath, level)
})
