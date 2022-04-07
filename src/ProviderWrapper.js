import { BrowserRouter as Router } from "react-router-dom";
import {
  FilterProvider,
  AuthProvider,
  ToastProvider,
  NotesProvider,
} from "./context";
export const ProviderWrapper = ({ children }) => {
    return (
      <Router>
        <ToastProvider>
          <AuthProvider>
            <FilterProvider>
              <NotesProvider>
                {children}
              </NotesProvider>
            </FilterProvider>
          </AuthProvider>
        </ToastProvider>
      </Router>
    );
};
