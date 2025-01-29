import googleplay from "../images/googleplay-svgrepo-com.svg";
import appstore from "../images/app-store-ios-svgrepo-com.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function OurApp() {
  return (
    <div className="flex flex-col items-start h-full">
      <div class="mb-5 text-white">Our App</div>
      <div className="flex flex-col items-start space-y-3">
        <Button
          size={"sm"}
          className="text-black bg-[#ffffff9e] hover:bg-[#FFFFFF4F]"
        >
          <Image src={googleplay.src} alt="Google Play" width={24} height={24} />
          Play Store
        </Button>
        <Button
          size={"sm"}
          className="text-black bg-[#ffffff9e] hover:bg-[#FFFFFF4F]"
        >
          <Image src={appstore.src} alt="app store" width={24} height={24} />
          App Store
        </Button>
      </div>
    </div>
  );
}
