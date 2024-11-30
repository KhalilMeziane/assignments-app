import { BrandName } from "@/lib/constants"
import Head from "@/components/Head"

import { Header, Layout, List } from "../components"

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | {BrandName}</title>
      </Head>
      <Layout>
        <Header />
        <main>
          <section>
            <List />
          </section>
        </main>
      </Layout>
    </>
  )
}
