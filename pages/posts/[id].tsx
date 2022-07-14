
import { FC } from "react";

const Post  = (post: any) => {
  return (
    <div>
      <div>文章id: {post?.post?.id}</div>
      <div>博客标题: {post?.post?.title}</div>
    </div>
  )
}
// 构建路由
export async function getStaticPaths() {
  console.log(34232343223);
  
  // 调用外部 API 获取博文列表
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const posts = await res.json()

  // 根据博文列表生成所有需要预渲染的路径
  const paths = posts.map((post: any) => `/posts/${post.id}`)

  // fallback为false，表示任何不在 getStaticPaths 的路径的结果将是 404 页面。
  return { paths, fallback: false }
}

// 获取单个页面博文数据
export async function getStaticProps(params: any) {
  console.log(11111111111111);
  // 如果路由是 /posts/1，那么 params.id 就是 1
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params?.params?.id}`)
  const post = await res.json()

  // 通过 props 参数向页面传递博文的数据
  return { props: { post } }
}

export default Post