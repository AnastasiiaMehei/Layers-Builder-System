// Selector to get diagrams from the Redux store
export const selectDiagrams = (state) => state.diagrams.items; 

// Selector to get the loading state from the Redux store
export const selectLoading = (state) => state.diagrams.isLoading; 

// Selector to get any error state from the Redux store
export const selectError = (state) => state.diagrams.error; 
