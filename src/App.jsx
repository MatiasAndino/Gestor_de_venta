import { RouterProvider } from "react-router-dom"
import RootProviders from "./core/providers/root_providers"
import { appRouter } from "./core/routes/app_router"

function App() {

  return (
    <RootProviders>
      <RouterProvider
        router={appRouter}
      />
    </RootProviders>
  )
}

export default App
