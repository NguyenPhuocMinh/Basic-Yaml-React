import { createContext } from 'react';

const ResourceContext = createContext(undefined);

const ResourceContextProvider = ({ children, value }) => {
  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  )
}

export {
  ResourceContext,
  ResourceContextProvider
};