import Link from "next/link";

const Home = () =>{
  return ( 
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
     
     <div className='flex justify-center items-center gap-4 bg-slate-100 min-h-80 min-w-100 rounded-lg shadow-white shadow-2xl border-2 border-blue-600'>
          <button className="text-white text-xl shadow-black shadow-md px-4 py-2 bg-blue-500 rounded-md transition duration-300 ease-in-out hover:translate-y-1 hover:scale-110 hover:bg-blue-700 ">
            <Link href="/sign-up">Sign-up</Link>
           
          </button>
          <button className="text-white text-xl shadow-black shadow-md px-4 py-2 bg-blue-500 rounded-md transition duration-300 ease-in-out hover:translate-y-1 hover:scale-110 hover:bg-blue-700 ">
            <Link href="/sign-in">Login</Link>
          </button>
        </div>
    </div>
  );
}

export default Home;