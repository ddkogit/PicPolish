import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [uploadedImg, setUploadedImg] = useState(null);
  const [filter, setFilter] = useState("normal");
  const imgRef = useRef(null);
  const filterClasses = [
    "Vintage",
    "PopArt",
    "Glow",
    "Underwater",
    "NightVision",
    "DramaticRed",
    "Greenery",
    "Sunset",
    "WarmGlow",
    "OldPaper",
    "Nostalgia",
    "MuchColor",
    "Negative",
    "RedToBlue",
    "Sepia",
    "Duotone",
    "Valencia",
    "Clarendon",
    "Lark",
    "Gingham",
    "Monochrome",
    "Noir",
    "BnW",
    "HighBnW",
  ];

  const handlImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const handleDownload = () => {
    if (imgRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const imageElement = imgRef.current;
  
    
      canvas.width = imageElement.naturalWidth;
      canvas.height = imageElement.naturalHeight;
  
     
      context.filter = getComputedStyle(imageElement).filter;

      context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
  

      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'filtered-image.png';
        link.click();
      });
    }
  };
  
  return (
    <>
      <div>
        <nav className="navbar">
          <div>Logo</div>
          <ul className="menu">
            <li>Home</li>
            <li>Blog</li>
            <li>Connect</li>
            <li>Login</li>
          </ul>
        </nav>
      </div>
      <div className="container">
        <div className="left">
          <h1>Filter Effect on Images Easy ad Fast</h1>
          <input type="file" accept="image/" onChange={handlImageUpload} />
          <p className="desc">Choose a image file (JPG, PNG, etc.)</p>
        </div>
        {uploadedImg && (
          <div className="right">
            <div className="imgContainer">

            <div className="uploadedImg ">
              <img className="img" 
              src={uploadedImg} alt="uploaded image" />
              <img
                className={` ${filter} img` }
                ref={imgRef}
                src={uploadedImg}
                alt="filtered image"
                />
              </div>
                </div>
              <div className="">
              <button className="downloadbtn"
                onClick={handleDownload} 
                >
                Download Image
              </button>
              
            </div>
            <div className="btnList">
              {filterClasses.map((filter) => (
                <button
                  key={filter}
                  className="filterBtn"
                  onClick={() => handleFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
