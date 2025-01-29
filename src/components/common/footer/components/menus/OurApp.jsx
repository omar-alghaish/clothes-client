import googleplay from '../images/googleplay-svgrepo-com.svg'
import appstore from '../images/app-store-ios-svgrepo-com.svg'
import { Button } from '@/components/ui/button'
export default function OurApp() {
    return (
        <div className='flex flex-col items-start h-full'>
            <div class="mb-5 text-white">Our App</div>
            <div className='flex flex-col items-start space-y-3'>
                <Button size={'sm'} className='text-black bg-[#ffffff9e] hover:bg-[#FFFFFF4F]'>
                    <a className=''>
                        <img src={googleplay} />
                    </a>
                    Play Store
                </Button>
                <Button size={'sm'} className='text-black bg-[#ffffff9e] hover:bg-[#FFFFFF4F]'>
                    <a className=''>
                        <img src={appstore} />
                    </a>
                    App Store
                </Button>
            </div>
        </div>
    )
}