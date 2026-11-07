import { motion } from "framer-motion";
import { useRef, useState } from "react";
import "../assets/css/card.css";
import { Link } from 'react-router-dom'; 

function Card() {
  const [cardClass, setCardClass] = useState("");
  const [isCardOpened, setIsCardOpened] = useState(false);
  const timerRef = useRef(null);

  const toggleCard = () => {
    if (cardClass === "" || cardClass === "close-half") {
      setCardClass("open-half");
      setIsCardOpened(true); 
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCardClass("open-fully");
        timerRef.current = null;
      }, 1000);
    } else {
      setCardClass("close-half");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCardClass("");
        timerRef.current = null;
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-clip">
    <div className="w-[400px]  h-screen flex flex-col items-center justify-center">
      <motion.div  initial={{ opacity: 0, visibility: "hidden" }}
          animate={{ opacity: 1, visibility: "visible" }}
          transition={{duration: 1.2}}>
      <div id="card" className={`${cardClass}`} onClick={toggleCard}>     
        <div id="card-inside">
          <div className="wrap">
            <p>Feliz Cumpleaños, Mina! (੭ˊᵕˋ)੭🎂</p>
            <p>Gracias por dejarme pasar este dia especial a tu lado, por darme la oportunidad de que lo pasemos juntos y disfrutarlo unidos. ❤️</p>
            <p>
              ¡Espero que te la pases muy bien en tu cumpleaños!
            </p>
            <p>
             Y que siempre, pero siempre, sepas que me siento muy afortunado de tenerte en mi vida. ❤️
            </p>
            <p>
              Gracias por haber nacido y hacer mi vida más especial con tu existencia. ❤️
            </p>
            <p className="signed">Milito ❤️</p>
          </div>
        </div>

        <div id="card-front">
          <div className="wrap">
            <h1>¡Feliz Cumpleaños Amor de Mi Vida!
              (づ˶•༝•˶)づ♡
            </h1>
          </div>
        </div>
    </div>

      </motion.div>

    {/* prone to bugs */}
      {isCardOpened && (
        <motion.div className="-mt-[3rem]" initial={{ opacity: 0, visibility: "hidden" }}
        animate={{ opacity: 1, visibility: "visible" }}
        transition={{duration: 1.2}}> 
        <Link to ='/cake'>
        <p className="-mt-[4rem] px-7 py-3 bg-customBlue text-white font-medium text-base rounded-full hover:bg-blue-600">
            Pagina Siguiente
          </p>
        </Link>
            
        </motion.div>
         
        )}

    </div>
    
    </div>
    
  );
}

export default Card;