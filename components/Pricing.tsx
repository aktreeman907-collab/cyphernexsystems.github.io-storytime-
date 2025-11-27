import React from 'react';

interface PricingCardProps {
  title: string;
  desc: string;
  paypalId: string;
}

// Renders the Standard Buy Now buttons exactly as the input HTML required, but wrapped in React
export const PricingCard: React.FC<PricingCardProps> = ({ title, desc, paypalId }) => {
  return (
    <div className="bg-[radial-gradient(circle_at_0_0,rgba(255,209,64,0.15),rgba(7,9,26,0.97))] border border-white/10 rounded-[18px] p-4 flex flex-col gap-2 shadow-[0_18px_38px_rgba(0,0,0,0.7)]">
      <h3 className="text-base font-bold m-0 text-white">{title}</h3>
      <div className="text-sm font-semibold text-[#ffeb8a]">{desc}</div>
      
      <div className="mt-2">
        <form action={`https://www.paypal.com/ncp/payment/${paypalId}`} method="post" target="_blank" className="inline-grid justify-items-center gap-2">
           <input 
             type="submit" 
             value="Buy Now" 
             className="text-center border-none rounded bg-[#ffd140] text-black font-bold text-base py-0 px-8 h-[2.625rem] min-w-[11.625rem] cursor-pointer hover:bg-[#ffc107] transition-colors"
           />
           <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" />
           <section className="text-xs text-[#a5b4cf]">
             Powered by <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="paypal" className="h-3.5 align-middle inline ml-1" />
           </section>
        </form>
      </div>
    </div>
  );
};

interface PricingBundleProps {
    title: string;
    desc: string;
    containerId: string;
}

// For the subscription buttons which were empty divs in the original HTML 
export const PricingBundle: React.FC<PricingBundleProps> = ({ title, desc, containerId }) => {
    return (
      <div className="bg-[radial-gradient(circle_at_0_0,rgba(255,209,64,0.15),rgba(7,9,26,0.97))] border border-white/10 rounded-[18px] p-4 flex flex-col gap-2 shadow-[0_18px_38px_rgba(0,0,0,0.7)]">
        <h3 className="text-base font-bold m-0 text-white">{title}</h3>
        <div className="text-sm font-semibold text-[#ffeb8a]">{desc}</div>
        <div className="mt-2 relative">
           {/* 
             We keep the ID here so if the PayPal SDK script is present in the parent page, it will find this container 
             and inject the real button, overwriting our fallback button.
           */}
           <div id={containerId} className="min-h-[40px] flex flex-col items-center justify-center gap-2">
               <button className="bg-[#ffd140] text-black font-bold py-2 px-8 rounded h-[2.625rem] w-full max-w-[200px] text-sm hover:bg-[#ffc107] transition-colors opacity-80 cursor-not-allowed" title="PayPal script missing">
                  Subscribe
               </button>
               <div className="flex items-center gap-1">
                 <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" className="h-4" />
               </div>
           </div>
           
        </div>
      </div>
    );
};