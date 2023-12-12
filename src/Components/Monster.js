import React from "react";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";
import monsterGif from "../assets/img/monster.gif";
import "./Game.css";

const Monster = () => {
  const monster = useSelector((state) => state.monster);
  console.log(monster);
  return (
    <section>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6 offset-sm-3'> 
            <img
              className='img-fluid monster-image' 
              src={monsterGif}
              alt='monster'
            />
          </div>

          <ProgressBar
            pv={monster.pv}
            pvMax={monster.pvMax}
            bgType='bg-danger'
            faType='fa-heart'
            barName=' : pv'
          />
        </div>
      </div>
    </section>
  );
};

export default Monster;
