## Site Clearing Simulator 
A React app developed for the Oracle Aconex Techinical Challenge. 

### Description
User is asked to upload a txt file from their local machine which will be used to build the map of the site.
The file must be a txt file and can only contain strings of "o", "r", "t", "T" (representing the land types of the map).

A React app that renders a 2 Dimensional map of different land types. The user must clear the site by moving the bulldozer around the map without removing any protected trees (T) or navigating beyond the boundaries of the map. All squares of plain land (o) and rocky land (t) should be cleared.
The simulation ends when the user:
a) Clicks the quit button
b) Attempts to navigate beyond the boundaries of the map
c) Attempts to clear a map square that contains a protected tree (T).

When the simulation ends the user will be presented with an itemized report of the total cost accrewed from their simulation run.


### Technologies Used
Typescript
React
Redux
Uppy (file upload library)
MDBReact (UI Toolkit library)
Enzyme (React Component Testing Library)

### Structure of the solution
The App is split into various React components each handling a specific part of the logic and rendering.

#### Simulator.tsx
React component that handles the main logic of the simulator. It renders different react components depending on the SimulatorStatus property in the Redux Store.
If the `simulationStatus === notStarted` then it will render the `FileUpload.tsx` Component.
If the `simulationStatus === inProgress` then it will render the `SiteMap.tsx` and `UserControls.tsx` components.
If the `simulationStatus === ended` then it will render the `CostSummary.tsx` component.

The simulator also handles the moving of the bulldozer around the map. The `moveBulldozer()` function does a lot of the heavy lifting and is responsible for updating a lot of the relevant state in the Redux store.

#### FileUploader.tsx
React component that uses the Uppy File upload library to allow the user to upload the site map. It also does some error checking on the file that the user uploads to ensure it is of the correct structure.

#### SiteMap.tsx
React component that handles the rendering of the sitemap and the bulldozer. It will rerender the bulldozer every time the bulldozer position property in the redux store changes.

#### MapSquare.tsx
React component that handles the rendering of the individual squares on the map.

#### UserControls.tsx
React component that handles all user input to the simulator.

#### CostSummary
React component that displays the cost summary of the users actions.