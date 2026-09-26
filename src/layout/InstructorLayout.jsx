import { Outlet } from 'react-router-dom'
import SideNavbar from '../components/layouts/SideNavbar';
import Footer from "../components/layouts/Footer";

const InstructorLayout = () => {

  return (
    <div className='w-full h-20 min-h-screen bg-green-300'>
      <div className='max-w-full text-white mx-auto flex-col items-center justify-center'>

        <div>
           <sidebar>
            <SideNavbar />
          </sidebar>

          <main>
              <Outlet />
          </main>
        </div>
       
        <footer>
            <Footer />
        </footer>

      </div>
    </div>
  )
}

export default InstructorLayout;
