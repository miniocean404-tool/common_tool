let await_gc: { data: string } | null = {
  data: "我是待回收的数据",
}

const clearup = new FinalizationRegistry((key) => {
  console.log("清理", key)
})

clearup.register(await_gc, "我是待回收的参数")
await_gc = null
