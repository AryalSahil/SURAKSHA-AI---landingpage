import React from 'react';
import { ShieldAlert, ArrowLeft, Home, Search, PhoneCall } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#F5F8FC] min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-5">
        
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
            Error 404 · Navigation Route Not Found
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Looking for Safety Guidance?
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
            The page or route you attempted to access does not exist or may have been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-[#123B70] text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home Overview</span>
          </button>

          <button
            onClick={() => navigate('/learn')}
            className="w-full py-2.5 bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Explore Cyber Safety Portal
          </button>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500">
            Encountered financial fraud? Call national helpline <a href="tel:1930" className="font-bold text-red-600 underline">1930</a> immediately.
          </div>
        </div>

      </div>
    </div>
  );
};
