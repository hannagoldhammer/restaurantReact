import React, { useState } from 'react';
import './Guests.scss';

interface IGuestsProps {
  sendTheNumber(theNumber: number): void;
}

export default function Guests(props: IGuestsProps) {
  const [showLastSix, setShowLastSix] = useState(false);
  const [hideButton, setHideButton] = useState(true);

  function handleOptions(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.className = 'guest-btn-style';
    sendToParent(Number(e.currentTarget.value));
  }

  function sendToParent(number: number) {
    props.sendTheNumber(number);
  }

  function handleShowLastSix() {
    setShowLastSix(true);
    setHideButton(false);
  }

  return (
    <>
      <div className='guestsConstainer'>
        <div className='firstSix'>
          <div className='buttonContainer'>
            <button
              value='1'
              onClick={handleOptions}
              type='button'
              className='unclicked-guest'
            >
              1
            </button>
          </div>
          <div className='buttonContainer'>
            <button
              value='2'
              onClick={handleOptions}
              type='button'
              className='unclicked-guest'
            >
              2
            </button>
          </div>
          <div className='buttonContainer'>
            <button
              value='3'
              onClick={handleOptions}
              type='button'
              className='unclicked-guest'
            >
              3
            </button>
          </div>

          <div className='buttonContainer'>
            <button
              value='4'
              onClick={handleOptions}
              type='button'
              className='unclicked-guest'
            >
              4
            </button>
          </div>

          <div className='buttonContainer'>
            <button
              value='5'
              onClick={handleOptions}
              type='button'
              className='unclicked-guest'
            >
              5
            </button>
          </div>

          <div className='buttonContainer'>
            <button
              value='6'
              onClick={handleOptions}
              type='button'
              className='unclicked-guest'
            >
              6
            </button>
          </div>
          {hideButton ? (
            <div className='moreButton'>
              <button type='button' onClick={handleShowLastSix}>
                fler gäster...
              </button>
            </div>
          ) : null}
        </div>
        {showLastSix ? (
          <div className='lastSix'>
            <div className='buttonContainer'>
              <button
                value='7'
                onClick={handleOptions}
                type='button'
                className='unclicked-guest'
              >
                7
              </button>
            </div>

            <div className='buttonContainer'>
              <button
                value='8'
                onClick={handleOptions}
                type='button'
                className='unclicked-guest'
              >
                8
              </button>
            </div>

            <div className='buttonContainer'>
              <button
                value='9'
                onClick={handleOptions}
                type='button'
                className='unclicked-guest'
              >
                9
              </button>
            </div>

            <div className='buttonContainer'>
              <button
                value='10'
                onClick={handleOptions}
                type='button'
                className='unclicked-guest'
              >
                10
              </button>
            </div>

            <div className='buttonContainer'>
              <button
                value='11'
                onClick={handleOptions}
                type='button'
                className='unclicked-guest'
              >
                11
              </button>
            </div>

            <div className='buttonContainer'>
              <button
                value='12'
                onClick={handleOptions}
                type='button'
                className='unclicked-guest'
              >
                12
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
