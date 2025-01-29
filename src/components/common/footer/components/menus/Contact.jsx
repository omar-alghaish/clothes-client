import { Mail, Phone } from 'lucide-react'
export default function Contact() {
    return (
        <div className='flex flex-col items-start'>
            <div class="mb-5 text-white">Contact us</div>
            <div className='flex flex-col items-start space-y-3'>
                <a href="#" className="flex items-center text-gray-500 space-x-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>+562-987-179</span>
                </a>
                <a href="#" className="flex items-center text-gray-500 space-x-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>Glamora.com</span>
                </a>
            </div>
            {/* social */}
            <div className='flex space-x-5 mt-4'>
                <a href='#'>
                    <img src='../images/icon-facebook.svg' />
                </a>
                <a href='#'>
                    <img src='images/tiktok-color-icon.svg' />
                </a>
                <a href='#'>
                    <img src='images/icon-twitter.svg' />
                </a>
                <a href='#'>
                    <img src='images/icon-instagram.svg' />
                </a>
            </div>
        </div>
    )
}