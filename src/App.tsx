// import React, { Children } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Sparkles } from "lucide-react";
import RegistrationForm from "./components/RegistrationForm";
export function App() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#02110A] font-['Inter']">
      {/* Flyer Background Layer */}
      <motion.div
        initial={{
          scale: 1.15,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://cdn.magicpatterns.com/uploads/6nTCqNyNyFppJvgJF1h9pB/ASWN-CONFMAIN-FLYER.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px) brightness(0.45) saturate(1.1)",
          }}
        />
      </motion.div>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#02110A]/85 via-[#02110A]/75 to-[#02110A]/95 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#02110A]/90 via-[#02110A]/40 to-[#02110A]/90 pointer-events-none" />

      {/* Animated glowing orbs */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[5%] w-[28rem] h-[28rem] bg-[#2EE541]/25 rounded-full blur-[120px] z-10 pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[5%] right-[5%] w-[32rem] h-[32rem] bg-[#ED5821]/20 rounded-full blur-[140px] z-10 pointer-events-none"
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#2EE541_1px,transparent_1px),linear-gradient(to_bottom,#2EE541_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.04] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex flex-col lg:flex-row">
        {/* Left - Hero text */}
        <div className="lg:w-1/2 flex items-center justify-center lg:justify-start p-6 lg:p-16 pt-12">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.4,
                },
              },
            }}
            className="max-w-xl text-center lg:text-left"
          >
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.6,
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ED5821] rounded-md text-white text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-lg shadow-[#ED5821]/30"
            >
              <Sparkles className="w-3.5 h-3.5" />
              ASWN × NACOS LMU
            </motion.div>

            <motion.h1
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.7,
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-['Oswald'] text-white uppercase leading-[0.9] tracking-tight mb-6"
            >
              The After School{" "}
              <motion.span
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 1.2,
                }}
                className="text-[#2EE541] [text-shadow:_3px_3px_0_#0A2818] inline-block"
              >
                What's Next
              </motion.span>{" "}
              Conference
            </motion.h1>

            <motion.p
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.6,
              }}
              className="text-lg text-emerald-50/80 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              Don't just graduate. Stand out. Skills over degrees — learn what
              matters.
            </motion.p>

            {/* Event meta */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.6,
              }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {[
                {
                  icon: Calendar,
                  label: "8 MAY 2026",
                },
                {
                  icon: Clock,
                  label: "12:00 PM",
                },
                {
                  icon: MapPin,
                  label: "ICC",
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{
                    y: -3,
                    scale: 1.04,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-[#2EE541]/30 shadow-lg"
                >
                  <item.icon className="w-4 h-4 text-[#2EE541]" />
                  <span className="text-xs font-bold text-white tracking-wider uppercase">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right - Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 pb-12">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full max-w-md"
          >
            <RegistrationForm />
          </motion.div>
        </div>
      </div>

      {/* Bottom accent bar echoing flyer */}
      <motion.div
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 1,
          ease: "easeOut",
        }}
        style={{
          transformOrigin: "left",
        }}
        className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2EE541] via-[#2EE541] to-[#ED5821] z-20"
      />
    </div>
  );
}
