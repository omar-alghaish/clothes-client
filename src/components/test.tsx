"use client"
import React from 'react';

const CavemanNotFound: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#FF7F2E] font-['Concert_One'] m-0 p-0 overflow-hidden">
      <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 text-center text-[30em] text-[rgba(19,36,44,0.1)]">
        <p>404</p>
      </div>
      
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] after:absolute after:content-[''] after:bg-[rgba(19,36,44,0.1)] after:rounded-xl after:bottom-10 after:h-3 after:left-20 after:w-[350px] after:-z-10 after:animate-shadow">
        {/* caveman left */}
        <div className="caveman h-[300px] absolute w-[250px] right-5">
          <div className="leg bg-[#B2524D] absolute rounded-md h-[55px] top-[200px] w-[10px] left-[95px] after:absolute after:content-[''] after:rounded-full after:h-[10px] after:left-[-5px] after:top-[15px] after:w-[10px] after:bg-[#B2524D]">
            <div className="foot bg-[#B2524D] absolute rounded-t-3xl h-[25px] left-[-38px] top-[30px] w-[50px] after:absolute after:bg-[#B2524D] after:rounded-full after:bottom-0 after:h-[15px] after:origin-bottom after:w-[15px] after:left-[-6px] after:content-[''] before:hidden">
              <div className="fingers absolute bg-[#EAB08C] rounded-full bottom-0 h-[15px] origin-bottom w-[15px] left-[15px] scale-[0.6] after:absolute after:bg-[#EAB08C] after:rounded-full after:bottom-0 after:h-[15px] after:origin-bottom after:w-[15px] after:left-[11px] after:content-['']"></div>
            </div>      
          </div>
          
          <div className="leg bg-[#D9766C] absolute rounded-md h-[55px] top-[200px] w-[10px] left-[115px] after:absolute after:content-[''] after:rounded-full after:h-[10px] after:left-[-5px] after:top-[15px] after:w-[10px] after:bg-[#D9766C]">
            <div className="foot bg-[#D9766C] absolute rounded-t-3xl h-[25px] left-[-38px] top-[30px] w-[50px] after:absolute after:bg-[#EAB08C] after:rounded-full after:bottom-0 after:h-[15px] after:origin-bottom after:w-[15px] after:left-[-6px] after:content-[''] before:absolute before:bg-[#EAB08C] before:rounded-full before:bottom-0 before:h-[15px] before:origin-bottom before:w-[15px] before:left-[8px] before:scale-[0.6] before:content-['']">
              <div className="fingers absolute bg-[#EAB08C] rounded-full bottom-0 h-[15px] origin-bottom w-[15px] left-[15px] scale-[0.6] after:absolute after:bg-[#EAB08C] after:rounded-full after:bottom-0 after:h-[15px] after:origin-bottom after:w-[15px] after:left-[11px] after:content-['']"></div>
            </div>      
          </div>
          
          <div className="shape bg-[#D13433] absolute rounded-full h-[140px] overflow-hidden top-[70px] w-[140px] left-1/2 -translate-x-1/2">
            <div className="circle bg-[#932422] absolute rounded-full h-[60px] w-[60px] left-[-12px] top-[80px] after:absolute after:content-[''] after:rounded-full after:h-[20px] after:w-[20px] after:bg-[#932422] after:left-[50px] after:top-[10px] before:absolute before:content-[''] before:rounded-full before:h-[20px] before:w-[20px] before:bg-[#932422] before:left-[60px] before:top-[45px]"></div>
            <div className="circle bg-[#932422] absolute rounded-full h-[60px] w-[60px] right-[10px] top-0 rotate-90 after:absolute after:content-[''] after:rounded-full after:h-[20px] after:w-[20px] after:bg-[#932422] after:left-[65px] after:top-[10px] before:hidden"></div>
          </div>
          
          <div className="head bg-[#13242C] absolute rounded-[50px] h-[140px] left-[60px] top-[25px] w-[65px] after:absolute after:content-[''] after:bg-[#13242C] after:rounded-md after:h-[20px] after:w-[7px] after:left-[35px] after:top-[-8px] after:rotate-[20deg] before:absolute before:content-[''] before:bg-[#13242C] before:rounded-md before:h-[20px] before:w-[7px] before:left-[30px] before:top-[-8px] before:rotate-[-20deg] animate-head">
            <div className="eye bg-[#EAB08C] absolute rounded-[50px] h-[16px] left-[45%] -translate-x-1/2 top-[40px] w-[48px] after:absolute after:content-[''] after:bg-[#13242C] after:rounded-full after:h-[5px] after:w-[5px] after:top-1/2 after:-translate-y-1/2 after:left-[5px] animate-eye before:absolute before:content-[''] before:bg-[#13242C] before:rounded-full before:h-[5px] before:w-[5px] before:top-1/2 before:-translate-y-1/2 before:right-[9px]">
              <div className="nose bg-[#D9766C] absolute rounded-md border-l-8 border-l-[rgba(19,36,44,0.1)] box-border h-[35px] left-[45%] top-[12px] w-[15px] -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
          
          <div className="arm-right bg-[#EAB08C] absolute border-l-8 border-l-[rgba(19,36,44,0.1)] rounded-[50px] box-border h-[180px] left-[135px] top-[80px] origin-[30px_30px] w-[60px] z-10 animate-arm">
            <div className="club absolute border-b-[110px] border-b-[#601513] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent h-0 left-[-60px] top-[120px] rotate-[70deg] w-[20px] after:absolute after:content-[''] after:bg-[#601513] after:rounded-full after:left-0 after:h-[20px] after:w-[20px] after:top-[-10px] before:absolute before:content-[''] before:bg-[#601513] before:rounded-full before:left-[-10px] before:h-[40px] before:w-[40px] before:top-[90px]"></div>
          </div>    
        </div>
        
        {/* caveman right */}
        <div className="caveman h-[300px] absolute w-[250px] left-5 scale-x-[-1]">
          <div className="leg bg-[#B2524D] absolute rounded-md h-[55px] top-[200px] w-[10px] left-[95px] after:absolute after:content-[''] after:rounded-full after:h-[10px] after:left-[-5px] after:top-[15px] after:w-[10px] after:bg-[#B2524D]">
            <div className="foot bg-[#B2524D] absolute rounded-t-3xl h-[25px] left-[-38px] top-[30px] w-[50px] after:absolute after:bg-[#B2524D] after:rounded-full after:bottom-0 after:h-[15px] after:origin-bottom after:w-[15px] after:left-[-6px] after:content-[''] before:hidden">
              <div className="fingers absolute bg-[#EAB08C] rounded-full bottom-0 h-[15px] origin-bottom w-[15px] left-[15px] scale-[0.6] after:absolute after:bg-[#EAB08C] after:rounded-full after:bottom-0 after:h-[15px] after:origin-bottom after:w-[15px] after:left-[11px] after:content-['']"></div>
            </div>      
          </div>
          
          <div className="leg bg-[#D9766C] absolute rounded-md h-[55px] top-[200px] w-[10px] left-[115px] after:absolute after:content-[''] after:rounded-full after:h-[10px] after:left-[-5px] after:top-[15px] after:w-[10px] after:bg-[#D9766C]">
            <div className="foot bg-[#D9766C] absolute rounded-t-3xl h-[25px] left-[-38px] top-[30px] w-[50px] after:absolute after:bg-[#EAB08C] after:rounded-full after:bottom-0 after:h-[15px] after:origin-bottom after:w-[15px] after:left-[-6px] after:content-[''] before:absolute before:bg-[#EAB08C] before:rounded-full before:bottom-0 before:h-[15px] before:origin-bottom before:w-[15px] before:left-[8px] before:scale-[0.6] before:content-['']">
              <div className="fingers absolute bg-[#EAB08C] rounded-full bottom-0 h-[15px] origin-bottom w-[15px] left-[15px] scale-[0.6] after:absolute after:bg-[#EAB08C] after:rounded-full after:bottom-0 after:h-[15px] after:origin-bottom after:w-[15px] after:left-[11px] after:content-['']"></div>
            </div>      
          </div>
          
          <div className="shape bg-[#932422] absolute rounded-full h-[140px] overflow-hidden top-[70px] w-[140px] left-1/2 -translate-x-1/2">
            <div className="circle bg-[#D13433] absolute rounded-full h-[60px] w-[60px] left-[-12px] top-[80px] after:absolute after:content-[''] after:rounded-full after:h-[20px] after:w-[20px] after:bg-[#D13433] after:left-[50px] after:top-[10px] before:absolute before:content-[''] before:rounded-full before:h-[20px] before:w-[20px] before:bg-[#D13433] before:left-[60px] before:top-[45px]"></div>
            <div className="circle bg-[#D13433] absolute rounded-full h-[60px] w-[60px] right-[10px] top-0 rotate-90 after:absolute after:content-[''] after:rounded-full after:h-[20px] after:w-[20px] after:bg-[#D13433] after:left-[65px] after:top-[10px] before:hidden"></div>
          </div>
          
          <div className="head bg-[#13242C] absolute rounded-[50px] h-[140px] left-[60px] top-[25px] w-[65px] after:absolute after:content-[''] after:bg-[#13242C] after:rounded-md after:h-[20px] after:w-[7px] after:left-[35px] after:top-[-8px] after:rotate-[20deg] before:absolute before:content-[''] before:bg-[#13242C] before:rounded-md before:h-[20px] before:w-[7px] before:left-[30px] before:top-[-8px] before:rotate-[-20deg] animate-head-delayed">
            <div className="eye bg-[#EAB08C] absolute rounded-[50px] h-[16px] left-[45%] -translate-x-1/2 top-[40px] w-[48px] after:absolute after:content-[''] after:bg-[#13242C] after:rounded-full after:h-[5px] after:w-[5px] after:top-1/2 after:-translate-y-1/2 after:left-[5px] animate-eye-delayed before:absolute before:content-[''] before:bg-[#13242C] before:rounded-full before:h-[5px] before:w-[5px] before:top-1/2 before:-translate-y-1/2 before:right-[9px]">
              <div className="nose bg-[#D9766C] absolute rounded-md border-l-8 border-l-[rgba(19,36,44,0.1)] box-border h-[35px] left-[45%] top-[12px] w-[15px] -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
          
          <div className="arm-right bg-[#EAB08C] absolute border-l-8 border-l-[rgba(19,36,44,0.1)] rounded-[50px] box-border h-[180px] left-[135px] top-[80px] origin-[30px_30px] w-[60px] z-10 animate-arm-delayed">
            <div className="club absolute border-b-[110px] border-b-[#601513] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent h-0 left-[-60px] top-[120px] rotate-[70deg] w-[20px] after:absolute after:content-[''] after:bg-[#601513] after:rounded-full after:left-0 after:h-[20px] after:w-[20px] after:top-[-10px] before:absolute before:content-[''] before:bg-[#601513] before:rounded-full before:left-[-10px] before:h-[40px] before:w-[40px] before:top-[90px]"></div>
          </div>    
        </div>
      </div>
      
      {/* Credit */}
      <a href="https://codepen.io/SofiaSergio/" target="_blank" rel="noopener noreferrer" className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center text-black opacity-20 hover:opacity-100">
        <i className="fab fa-codepen"></i>
        <p className="m-0 ml-1">watch other pens</p>
      </a>
      
      <style jsx>{`
        @keyframes arm-anima {
          0%    { transform: rotate(0) }
          100%  { transform: rotate(-360deg) }
        }
        
        @keyframes head-anima {
          0%    { top: 25px; }
          42%   { top: 25px; }
          45%   { top: 50px; }
          100%  { top: 25px; }
        }
        
        @keyframes eye-anima {
          0%    { height: 5px; }
          42%   { height: 5px; }
          45%   { height: 1px; }
          100%  { height: 5px; }
        }
        
        @keyframes shadow-anima {
          0%    { width: 350px; left: 80px; }
          25%   { width: 450px; left: 80px; }
          50%   { width: 350px; left: 80px; }
          75%   { width: 450px; left: 0px; }
          100%  { width: 350px; left: 80px; }
        }
        
        .animate-arm {
          animation: arm-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34);
        }
        
        .animate-arm-delayed {
          animation: arm-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34);
          animation-delay: 0.6s;
        }
        
        .animate-head {
          animation: head-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34);
          animation-delay: 0.6s;
        }
        
        .animate-head-delayed {
          animation: head-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34);
        }
        
        .animate-eye::after, 
        .animate-eye::before {
          animation: eye-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34);
          animation-delay: 0.6s;
        }
        
        .animate-eye-delayed::after, 
        .animate-eye-delayed::before {
          animation: eye-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34);
        }
        
        .animate-shadow {
          animation: shadow-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34);
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
};

export default CavemanNotFound;