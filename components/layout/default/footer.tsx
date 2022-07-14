import Image from 'next/image'

function FooterComponent() {
  return <footer>
  <a
    href="https://beian.miit.gov.cn/#/Integrated/index"
    target="_blank"
    rel="noopener noreferrer"
  >
    蜀ICP备2020028876号-2
    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
  </a>
</footer>
}
export default FooterComponent