import { useEffect, useState, useRef } from "react";
import "../assets/css/cake.css";
import { CakeSVG, confetti } from "../assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Cake() {
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);
  const candlesBlownOutRef = useRef(false);

  useEffect(() => {
    let audioContext;
    let analyser;
    let dataArray;
    let blowStartTime = null;
    let rafId = null;

    async function initBlowDetection() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);

        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        source.connect(analyser);

        detectBlow();
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    }

    function detectBlow() {
      if (candlesBlownOutRef.current) return; // ya se apagaron, dejar de escuchar
      if (!analyser || !dataArray) return;

      analyser.getByteFrequencyData(dataArray);
      const lowFrequencyValues = dataArray.slice(0, 15);
      const averageLowFrequency =
        lowFrequencyValues.reduce((sum, value) => sum + value, 0) /
        lowFrequencyValues.length;

      const blowThreshold = 55; // mas sensible que antes (era 100)
      const requiredDuration = 600; // mas rapido que antes (era 1500ms)

      if (averageLowFrequency > blowThreshold) {
        if (!blowStartTime) {
          blowStartTime = performance.now();
        } else if (performance.now() - blowStartTime > requiredDuration) {
          candlesBlownOutRef.current = true;
          setCandlesBlownOut(true);
        }
      } else {
        if (blowStartTime && performance.now() - blowStartTime > 200) {
          blowStartTime = null;
        }
      }

      rafId = requestAnimationFrame(detectBlow);
    }

    // Empieza a escuchar de inmediato, sin retraso
    initBlowDetection();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const handleManualBlow = () => {
    candlesBlownOutRef.current = true;
    setCandlesBlownOut(true);
  };

  return (
    <>
      <div className="bg-black/80 h-screen w-screen flex items-center justify-center overflow-hidden relative">
        {candlesBlownOut && (
          <div
            className="absolute inset-0 bg-cover bg-center z-50"
            style={{
              backgroundImage: `url(${confetti})`,
            }}
          />
        )}
        {candlesBlownOut && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[85%] max-w-[380px] z-50">
            <motion.div
              className="text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <p className="text-3xl font-bold leading-snug">
                ¡Feliz Cumpleaños Princesa! (˶˃ ᵕ ˂˶)
              </p>
              <Link to="/present" className="flex justify-center items-center mt-8">
                <p className="px-7 py-3 bg-customBlue text-white rounded-full hover:bg-blue-600 font-medium text-base text-center">
                  Pagina Siguiente
                </p>
              </Link>
            </motion.div>
          </div>
        )}
        <div className="relative z-10">
          <div className="absolute -top-48 left-1/2 transform -translate-x-1/2">
            <div
              className="candle"
              onClick={!candlesBlownOut ? handleManualBlow : undefined}
              style={{ cursor: !candlesBlownOut ? "pointer" : "default" }}
            >
              {!candlesBlownOut && (
                <div>
                  <div className="absolute -top-[200px] text-gray-200 text-3xl">
                    <motion.div
                      animate={{ opacity: [0, 0.25, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 2,
                      }}
                      className="block -translate-x-[60px] translate-y-[105px] -rotate-[30deg] text-gray-200 text-xl "
                    >
                      blow
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [0, 0.25, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 3,
                      }}
                      className="block translate-x-10 translate-y-[80px] rotate-[30deg] text-gray-200 text-xl"
                    >
                      blow
                    </motion.div>
                  </div>
                  <div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <CakeSVG />
        </div>

        {!candlesBlownOut && (
          <motion.button
            onClick={handleManualBlow}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-customBlue text-white font-medium text-sm rounded-full hover:bg-blue-600 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            ¿No funcionó el soplido? Toca aquí para apagar las velitas
          </motion.button>
        )}
      </div>
    </>
  );
}

export default Cake;