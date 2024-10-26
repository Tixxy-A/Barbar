import "./App.css";
import { useState, useEffect } from "react";
import profile from "./photo/barbar.jpg";
import cutting from "./photo/cutting.webp";
import axios from "axios";
import { motion } from "framer-motion";
import Place from "./Place";

function App() {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState([
    { name:"XXX Salon",
      postCode: 422006,
    },
    { name:"Galaxy",
      postCode: 560011
    },
    { name:"Metro",
      postCode: 462021,
    },
    { name:"lassi da Salon",
      postCode: 495001,
    },
    { name:"Hairy Workshop",
      postCode: 781001,
    },
    { name:"Side cut Expert",
      postCode: 411001,
    }, 
    { name:"Cut every Inches",
      postCode: 440001,
    },
  ]);
  useEffect(() => {
    axios
      .get(
        "https://api.geoapify.com/v1/geocode/search?text=484661&apiKey=f6b2bef310f84e788bddc2775c667065"
      )
      .then((data) => setData(data.data.features[0].properties))
      .catch((e) => console.log(e));
  }, []);
  const container = (d) => ({
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: d } },
  });
  //console.log(data);
  return (
    <div className="overflow-x-hidden text-gray-200  selection:bg-gray-300 selection:text-black font-amaze">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-5 [background:radial-gradient(150%_125%_at_50%_20%,#000_50%,#63e_100%)]"></div>
      </div>
      <div className="mt-4 h-20 flex px-8 justify-between">
        <img
          className=" rounded-full  hover:rotate-180 duration-700 hover:-scale-90 border-8 border-blue-800"
          src={profile}
          alt="profile"
        />
        <div className="">
          <h1 className="text-2xl font-bold text-white">
            {data?.state_district}
          </h1>
          <p className="text-lg text-gray-200">{data?.address_line2}</p>
        </div>
      </div>
      {open ? (
        <Place  places={place} setPlace={setPlace} data={data}/>
      ) : (
        <div>
          <div className="border-b  border-neutral-800 pb-5 mt-10 px-5 ">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/2">
                <div className="flex flex-col items-center lg:items-start ml-5 mt-10">
                  <motion.span
                    variants={container(0.8)}
                    initial="hidden"
                    animate="visible"
                    className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent"
                  >
                    Barber's are shit
                  </motion.span>
                  <motion.p
                    variants={container(1.5)}
                    initial="hidden"
                    animate="visible"
                    className="my-2 backdrop:max-w-xl py-6 mt-5 font-light text-md tracking-wider"
                  >
                    Barbers can sometimes be notorious for not fully listening
                    to their clients’ requests, resulting in cuts that don’t
                    match what was asked for. Some might be overly chatty,
                    engaging in conversations that make the experience
                    uncomfortable or awkward for people who prefer silence.
                    Additionally, hygiene practices can be inconsistent; some
                    barbers may neglect to properly sanitize their tools or
                    clean their stations between clients. Wait times can also be
                    unpredictable, as appointments might not always be honored,
                    leading to long delays. The quality of service can vary
                    significantly depending on the barber's skill level, leaving
                    some clients dissatisfied with uneven or poorly executed
                    haircuts.
                  </motion.p>
                </div>
              </div>
              <div className="w-full lg:w-1/2 lg:p-8">
                <div className="flex justify-center">
                  <motion.img
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2 }}
                    src={cutting}
                    className="rounded-xl"
                    alt="fuck"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <motion.button
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="flex justify-center items-center px-6 py-2 rounded-xl gap-4 border-2 border-blue-700 shadow-full shadow-blue-600/55 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
              <p className="text-lg">Nearby Salon</p>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
