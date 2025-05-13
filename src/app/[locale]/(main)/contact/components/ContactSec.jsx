import { Button } from '@/components/ui/button';
import Image from 'next/image';
import insta from '@/components/common/footer/components/images/icon-instagram.svg'
import face from "@/components/common/footer/components/images/icon-facebook.svg"
import tiktok from "@/components/common/footer/components/images/tiktok-color-icon.svg"
import twitter from "@/components/common/footer/components/images/icon-twitter.svg"

export default function ContactSec() {
    return (
        <div className="w-full flex flex-col flex-1 m-1 border border-input rounded-md p-6 items-center md:items-start lg:p-10 lg:w-[500px]">
            <div className='ml-8 md:ml-2 lg:ml-20'>
                <div className=' w-[350px] mt-6 text-gray-500 text-start items-center'>
                    <h3 className="text-primary text-3xl font-bold mb-2 md:text-4xl">Contact</h3>
                    <a href="#" className="flex text-gray-500 md:text-xl">
                        Phone: <span className="ml-2">+562-987-179</span>
                    </a>
                    <a href="#" className="flex text-gray-500 md:text-xl">
                        Email: <span className="ml-2">Glamora@gmail.com</span>
                    </a>
                </div>
                <div className="w-[350px] mt-10 text-gray-500 text-start items-center">
                    <h3 className="text-primary text-3xl font-bold mb-2 md:text-4xl">Live Chat</h3>
                    <p className='text-[15px] md:text-xl'>Sunday to Thursday, from 10:00 a.m. to 9:00 p.m.</p>
                    <Button className="w-40 mx-auto mt-2 bg-transparent text-primary text-xl font-bold border-2 border-primary hover:bg-primary hover:text-white md:w-48">
                        Begin chat
                    </Button>
                </div>
                <div className="w-[350px] mt-10 text-gray-500 text-start items-center">
                    <h3 className="text-primary text-3xl font-bold mb-2 md:text-4xl">Stay Connected</h3>
                    {/* Social Icons */}
                    <div className='flex space-x-5 mt-5'>
                        <a href='#'>
                            <Image
                                src={face.src}
                                alt="Facebook"
                                width={24}
                                height={24}
                                className="filter brightness-0" // Makes the image black
                            />
                        </a>
                        <a href='#'>
                            <Image
                                src={tiktok.src}
                                alt="TikTok"
                                width={24}
                                height={24}
                                className="filter brightness-0" // Makes the image black
                            />
                        </a>
                        <a href='#'>
                            <Image
                                src={twitter.src}
                                alt="Twitter"
                                width={24}
                                height={24}
                                className="filter brightness-0" // Makes the image black
                            />
                        </a>
                        <a href='#'>
                            <Image
                                src={insta.src}
                                alt="Instagram"
                                width={24}
                                height={24}
                                className="filter brightness-0" // Makes the image black
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}