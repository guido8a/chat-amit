import React from 'react'
import {Routes ,Route} from 'react-router-dom'

export const MyRouter = ({routesIndex, add404=true}) => (
  <Routes>
    {
      routesIndex.map(
        ({exact, path, renderComponent, renderFunction}, key) => {
          const myProps = {
            key:key,
            exact:exact,
            path:path,
            ...(
              renderComponent ? {component:renderComponent} :
                renderFunction ? {render:renderFunction} : null
            )
          }
          return <Route {...myProps}/>
        })
    }
    <Route render={() => <h1>404 Error</h1>} />
  </Routes>
)
