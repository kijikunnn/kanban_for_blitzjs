import { AppProps } from "blitz"

const App = (props: AppProps) => {
  const getLayout = props.Component.getLayout || ((page) => page)

  return getLayout(<props.Component {...props.pageProps} />)
}

export default App
