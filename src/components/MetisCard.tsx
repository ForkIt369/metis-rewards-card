import React, { useState } from 'react';
import { useMetisBalance } from '../hooks/useMetisBalance';
import '../styles/MetisCard.css';

// Placeholder SVG avatars
const anticipatingAvatar = "data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='60' cy='60' r='55' stroke='%2300C2FF' stroke-width='2'/%3E%3Ccircle cx='40' cy='50' r='8' fill='%2300C2FF'/%3E%3Ccircle cx='80' cy='50' r='8' fill='%2300C2FF'/%3E%3Cpath d='M40 80C50 90 70 90 80 80' stroke='%2300C2FF' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

const happyAvatar = "data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='60' cy='60' r='55' stroke='%2300C2FF' stroke-width='2'/%3E%3Ccircle cx='40' cy='50' r='8' fill='%2300C2FF'/%3E%3Ccircle cx='80' cy='50' r='8' fill='%2300C2FF'/%3E%3Cpath d='M40 75C50 95 70 95 80 75' stroke='%2300C2FF' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

const sadAvatar = "data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='60' cy='60' r='55' stroke='%2300C2FF' stroke-width='2'/%3E%3Ccircle cx='40' cy='50' r='8' fill='%2300C2FF'/%3E%3Ccircle cx='80' cy='50' r='8' fill='%2300C2FF'/%3E%3Cpath d='M40 85C50 75 70 75 80 85' stroke='%2300C2FF' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

interface CardProps {
  address: string;
  threshold: number;
}

const DISTRIBUTION_WALLET = "0x6Cb5365ADfC0fdFc2aD7C02151A04e9f0F9eBeCA";

const MetisCard: React.FC<CardProps> = ({ address = DISTRIBUTION_WALLET, threshold = 5000 }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { balance, loading } = useMetisBalance(address);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const balanceNum = parseFloat(balance.replace(/,/g, ''));
  const percentComplete = Math.min(100, (balanceNum / threshold) * 100);
  const remaining = Math.max(0, threshold - balanceNum);
  const isReady = balanceNum >= threshold;

  const getAvatarSrc = () => {
    if (!isFlipped) return anticipatingAvatar;
    return isReady ? happyAvatar : sadAvatar;
  };

  
  return (
    <div 
      className="zen-card"
      onClick={handleFlip}
      aria-label={isFlipped ? "Current reward status" : "Click to reveal reward status"}
    >
      <div className={`zen-card-inner ${isFlipped ? "zen-is-flipped" : ""}`}>
        <div className="zen-card-front">
          <img src={getAvatarSrc()} alt="Robit Avatar" className="zen-avatar" />
          <h2 className="zen-question">Are the rewards ready yet?</h2>
          <p className="zen-wallet-address">{address}</p>
          <div className="zen-flip-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="zen-card-back">
          {loading ? (
            <div className="zen-loading">
              <div className="zen-loading-indicator"></div>
            </div>
          ) : (
            <>
              <img src={getAvatarSrc()} alt="Robit Avatar" className="zen-avatar" />
              <p className="zen-balance">
                <span className="zen-balance-amount">{balance} METIS</span>
              </p>
              <div className="zen-progress-bar" role="progressbar" aria-valuenow={percentComplete} aria-valuemin={0} aria-valuemax={100}>
                <div 
                  className="zen-progress-fill"
                  style={{ width: `${percentComplete}%` }}
                ></div>
              </div>
              {isReady ? (
                <p className="zen-status zen-status-complete">Rewards are ready!</p>
              ) : (
                <p className="zen-status">{remaining.toLocaleString()} METIS to go</p>
              )}
            </>
          )}
          <div className="zen-flip-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5M12 5L18 11M12 5L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetisCard;
