import { Outlet } from 'react-router-dom'

function AuthLayout() {

  return (
    <div className='w-full h-20 min-h-screen bg-green-300'>
      <div className='max-w-full text-white mx-auto flex-col items-center justify-center'>

        <main>
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default AuthLayout;
