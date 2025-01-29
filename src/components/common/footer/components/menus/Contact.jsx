import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import insta from "../images/icon-instagram.svg"
import face from "../images/icon-facebook.svg"
import tiktok from "../images/tiktok-color-icon.svg"
import twitter from "../images/icon-twitter.svg"
 
export default function Contact() {
  return (
    <div className='flex flex-col items-start'>
      <div className="mb-5 text-white">Contact us</div>
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
      
      {/* Social Icons */}
      <div className='flex space-x-5 mt-4'>
        <a href='#'>
          <Image 
            src={face.src}
            alt="Facebook" 
            width={24} 
            height={24}
          />
        </a>
        <a href='#'>
          <Image 
            src={tiktok.src} 
            alt="TikTok" 
            width={24} 
            height={24}
          />
        </a>
        <a href='#'>
          <Image 
            src={twitter.src}
            alt="Twitter" 
            width={24} 
            height={24}
          />
        </a>
        <a href='#'>
          <Image 
            src={insta.src} 
            alt="Instagram" 
            width={24} 
            height={24}
          />
        </a>
      </div>
    </div>
  )
}