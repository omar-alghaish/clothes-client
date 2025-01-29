import Logo from '../../../logo/index'
import Menu1 from './menu1'
import Menu2 from './menu2'
import OurApp from './OurApp'
import Contact from './Contact'
import Copyright from './Copeyright'

export default function Menus() {
    return (
        <footer className=" py-16 bg-background" >
            <div className="container flex items-center flex-col lg:flex-row gap-6 w-full mx-auto">
                <div className='flex flex-col'>
                    <Logo />
                </div>
                {/* menus container */}
                <div className='grid gap-8 flex-1 grid-cols-1 md:grid-cols-4'>
                    <Menu1 />
                    <Menu2 />
                    <OurApp />
                    <Contact />
                </div>
            </div>
            {/* copyright */}
            <div className='mx-auto mt-12 border-t border border-gray-500 w-80 md:w-[80%] lg:w-[90%]'></div>
            <Copyright />
        </footer >
    )
}