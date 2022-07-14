import type { NextPage } from 'next'
import Head from '../components/layout/default/head'
import Header from '../components/layout/default/header'
import Footer from '../components/layout/default/footer'
import Content from '../components/layout/default/content'
const Home: NextPage = () => {
  return (
    <div>
      <Head />
      <Header />
      <Content />
      <Footer />
    </div>
  )
}
export default Home
