import { Route, Routes } from 'react-router-dom';
import Homepage from './component/Homepage/Homepage';
import Blog from './component/Blog/Blog';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* <Route path="blog" element={<Blog />} /> */}
    </Routes>
  );
}

export default App;
