import HeaderSec from './HeaderSec';
import FormSec from './FormSec';
import ContactSec from './ContactSec'
import DownloadSec from './DownloadSec'


export default function MainContent() {
    return (
        <>

            <div className="container grid grid-cols-1 w-full mx-auto p-4 space-y-10 lg:grid-cols-2 lg:space-y-0 lg:space-x-44 lg:mt-32">

                <div className='lg:ml-24'>
                    <HeaderSec />
                    <FormSec />
                </div>
                <div>
                    <ContactSec />
                </div>
            </div>
            <DownloadSec />
        </>
    );
}