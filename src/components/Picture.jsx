import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mar1, Mar2, Mar3, Mar4 } from '../assets';
import { useNavigate } from 'react-router-dom';
import SectionWrapper from './SectionWrapper';
// Add your own images by putting them in the assets folder and import them.
const images = [
 Mar1,
 Mar2,
 Mar3,
 Mar4,
];
function Picture() {
  const [loadedImages, setLoadedImages] = useState(0);
  const [order, setOrder] = useState(images.map((_, i) => i)); // order[0] = la que esta hasta arriba
  const [vistas, setVistas] = useState(0); // cuantas fotos ya se quitaron de encima
  const [mostrarMensaje, setMostrarMensaje] = useState(false); // pantalla final con el texto
  const navigate = useNavigate();

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };
  const allImagesLoaded = loadedImages === images.length;

  const handleCardClick = (index) => {
    if (order[0] !== index) return; // solo reacciona si le picas a la de arriba

    const nuevasVistas = vistas + 1;
    setVistas(nuevasVistas);

    if (nuevasVistas >= images.length) {
      setMostrarMensaje(true); // ya vio todas: muestra el mensaje antes de avanzar
      return;
    }

    setOrder((prev) => [...prev.slice(1), prev[0]]);
  };

  if (mostrarMensaje) {
    return (
      <SectionWrapper>
        <motion.div
          className="absolute inset-0 flex items-center justify-center cursor-pointer px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          onClick={() => navigate('/card')}
        >
          <p className="text-4xl font-bold text-customBlue text-center transform rotate-6">
            Haz crecido mucho amor jsjs ◝(ᵔᗜᵔ)◜
          </p>
        </motion.div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      {!allImagesLoaded && (
        <div className="absolute inset-0 flex justify-center items-center">
          <p className="text-xl font-medium text-gray-500">Cargando imagenes...</p>
        </div>
      )}
      {images.map((image, index) => (
        <motion.div
          key={index}
          onClick={() => handleCardClick(index)}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            allImagesLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            zIndex: images.length - order.indexOf(index) + 1,
          }}
          initial={{
            scale: 1,
            rotate: Math.random() * 20 - 10,
          }}
          whileDrag={{
            scale: 1.05,
            rotate: Math.random() * 20 - 10,
          }}
          drag
          onDragEnd={() => handleCardClick(index)}
        >
          <img
            src={image}
            alt={`Stacked image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
            onLoad={handleImageLoad} // Increment the counter when the image loads
          />
        </motion.div>
      ))}
    </SectionWrapper>
  );
}

export default Picture;