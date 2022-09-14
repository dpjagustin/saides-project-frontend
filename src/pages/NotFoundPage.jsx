import React from "react";
import { Link } from "@chakra-ui/react";
import "../components/styles/NotFoundPage.css";
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';

export default function NotFoundPage() {

  const navigate = useNavigate();

  return(
    <>
      <div className="bodyNotFound">
        <div className="logoDescarContainer">
          <img src="/logoDescar.png.png" alt="Logo Descar" className="logoDescar" />
          {/* <img src="/logoDeplm.jpg" alt="Logo DePLM" className="logoDeplm" /> */}
        </div>

        <svg className="svgNotFound" width="380px" height="500px" viewBox="0 0 837 1045" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSketch="http://www.bohemiancoding.com/sketch/ns">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketchType="MSPage">
              <path d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" id="Polygon-1" stroke="#fec924" strokeWidth="6" sketchtType="MSShapeGroup"></path>
              <path d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" id="Polygon-2" stroke="#014290" strokeWidth="6" sketchtType="MSShapeGroup"></path>
              <path d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" id="Polygon-3" stroke="#014290" strokeWidth="6" sketchtType="MSShapeGroup"></path>
              <path d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" id="Polygon-4" stroke="#8cbd3a" strokeWidth="6" sketchtType="MSShapeGroup"></path>
              <path d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" id="Polygon-5" stroke="#fec924" strokeWidth="6" sketchtType="MSShapeGroup"></path>
          </g>
        </svg>  

        <div class="message-box">
          <h1>Error</h1>
         
          <p>Pagina no encontrada</p>
          
          <div class="buttons-con">
            <div class="action-link-wrap">
              <Link onClick={() => navigate(-1)} className="link-button link-back-button">Volver atrás</Link>
              <Link href="/index" className="link-button">Ir al inicio</Link>
            </div>
          </div>
        </div>    
      </div>      
    </>
)}