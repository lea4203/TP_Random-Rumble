import React from "react";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";
import "./Game.css";

const Monster = () => {
  const monster = useSelector((state) => state.monster);
  console.log(monster);
  return (
    <section>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-2 offset-sm-3'>
            <img
              className='img-fluid'
              src='http://res.publicdomainfiles.com/pdf_view/67/13925387417373.png'
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
