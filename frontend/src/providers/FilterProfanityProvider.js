/* eslint-disable max-len */

import { createContext } from 'react';

export const FilterContext = createContext(null);

const FilterProfanityProvider = ({ children, filter }) => (<FilterContext.Provider value={filter}>{children}</FilterContext.Provider>);

export default FilterProfanityProvider;
