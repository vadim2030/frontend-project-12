/* eslint-disable max-len */
import { createContext } from 'react';

export const SocketContext = createContext(null);

const SocketProvider = ({ socket, children }) => (<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>);

export default SocketProvider;
