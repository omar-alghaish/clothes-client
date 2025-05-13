'use client';

import { useState, useEffect } from 'react';

const UpdatedSection7 = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 8,
        hours: 4,
        minutes: 0,
        seconds: 26
    });

    useEffect(() => {
        // Timer countdown logic
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newSeconds = prevTime.seconds - 1;

                if (newSeconds >= 0) {
                    return { ...prevTime, seconds: newSeconds };
                }

                const newMinutes = prevTime.minutes - 1;
                if (newMinutes >= 0) {
                    return { ...prevTime, minutes: newMinutes, seconds: 59 };
                }

                const newHours = prevTime.hours - 1;
                if (newHours >= 0) {
                    return { ...prevTime, hours: newHours, minutes: 59, seconds: 59 };
                }

                const newDays = prevTime.days - 1;
                if (newDays >= 0) {
                    return { ...prevTime, days: newDays, hours: 23, minutes: 59, seconds: 59 };
                }

                // When countdown is finished
                clearInterval(timer);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Helper function to pad numbers with leading zero
    const padWithZero = (num: number) => {
        return num.toString().padStart(2, '0');
    };

    return (
        <div className="container mx-auto flex justify-center items-center py-4 sm:py-6 md:py-8 w-full px-2 sm:px-4">
            <div className="bg-black text-white w-full p-4 sm:p-5 md:p-6 rounded flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
                <div className="w-full md:w-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">SPECIAL OFFER</h2>
                    <p className="text-sm sm:text-base md:text-xl opacity-90 mb-4 sm:mb-5 md:mb-6">Limited-time deals you don `&apos;`t want to miss</p>

                    <div className="flex items-center justify-center md:justify-start space-x-1 sm:space-x-2">
                        <div className="flex flex-col items-center border border-white p-2 sm:p-3 w-12 sm:w-14 md:w-16">
                            <span className="text-lg sm:text-xl md:text-2xl font-bold">{padWithZero(timeLeft.days)}</span>
                            <span className="text-xxs sm:text-xs">D</span>
                        </div>

                        <span className="text-xl sm:text-2xl md:text-3xl font-bold">:</span>

                        <div className="flex flex-col items-center border border-white p-2 sm:p-3 w-12 sm:w-14 md:w-16">
                            <span className="text-lg sm:text-xl md:text-2xl font-bold">{padWithZero(timeLeft.hours)}</span>
                            <span className="text-xxs sm:text-xs">H</span>
                        </div>

                        <span className="text-xl sm:text-2xl md:text-3xl font-bold">:</span>

                        <div className="flex flex-col items-center bg-white text-black p-2 sm:p-3 w-12 sm:w-14 md:w-16">
                            <span className="text-lg sm:text-xl md:text-2xl font-bold">{padWithZero(timeLeft.seconds)}</span>
                            <span className="text-xxs sm:text-xs">S</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white text-black p-6 sm:p-8 md:p-10 rounded max-w-xs relative">
                    <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full -top-1 sm:-top-2 -left-1 sm:-left-2"></div>
                    <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full -top-1 sm:-top-2 -right-1 sm:-right-2"></div>
                    <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full -bottom-1 sm:-bottom-2 -left-1 sm:-left-2"></div>
                    <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full -bottom-1 sm:-bottom-2 -right-1 sm:-right-2"></div>

                    <div className="text-center mr-4 sm:mr-6">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold">#CLOTH 100</div>
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold mt-1 sm:mt-2">40% OFF</div>
                    </div>

                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 h-12 sm:h-16 w-6 sm:w-8">
                        <div className="h-1 bg-black mb-1"></div>
                        <div className="h-1 bg-black mb-1"></div>
                        <div className="h-1 bg-black mb-1"></div>
                        <div className="h-1 bg-black mb-1"></div>
                        <div className="h-1 bg-black mb-1"></div>
                        <div className="h-1 bg-black mb-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdatedSection7;