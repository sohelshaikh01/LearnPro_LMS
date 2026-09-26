import { Outlet } from 'react-router-dom'
import Navbar from '../components/layouts/Navbar';
import Footer from "../components/layouts/Footer";

const StudentLayout = () => {

  return (
    <div className='w-full h-20 min-h-screen bg-green-300'>
      <div className='max-w-full text-white mx-auto flex-col items-center justify-center'>

        <header>
            <Navbar />
        </header>

        <main>
            <Outlet />
        </main>

        <footer>
            <Footer />
        </footer>

      </div>
    </div>
  )
}

export default StudentLayout;
