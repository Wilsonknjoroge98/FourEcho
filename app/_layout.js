/* the Slot component is used to create a placeholder in a 
 parent component where child components can be dynamically inserted. 
 It allows you to pass components as children to the parent 
 component and render them at specific locations. */
import { Slot } from 'expo-router';

const Layout = () => {
  return <Slot />;
};

export default Layout;
