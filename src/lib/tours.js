import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { t } from '../locales.js';

export function startTour(view, lang) {
  const str = t[lang];

  const driverObj = driver({
    showProgress: true,
    nextBtnText: str.tourNext,
    prevBtnText: str.tourPrev,
    doneBtnText: str.tourDone,
    allowClose: true,
    overlayColor: 'rgba(0,0,0,0.85)',
    popoverClass: 'driver-premium-theme',
    steps: getStepsForView(view, str)
  });

  driverObj.drive();
}

function getStepsForView(view, str) {
  if (view === 'landing') {
    return [
      {
        element: '#tour-auditor-btn',
        popover: {
          title: str.tourLandingAuditorTitle,
          description: str.tourLandingAuditorDesc,
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#tour-issuer-btn',
        popover: {
          title: str.tourLandingIssuerTitle,
          description: str.tourLandingIssuerDesc,
          side: 'bottom',
          align: 'start'
        }
      }
    ];
  }

  if (view === 'auditor') {
    return [
      {
        element: '#tour-auditor-search',
        popover: {
          title: str.tourAuditorSearchTitle,
          description: str.tourAuditorSearchDesc,
          side: 'bottom',
          align: 'center'
        }
      }
    ];
  }

  if (view === 'issuer') {
    return [
      {
        element: '#tour-issuer-wallet',
        popover: {
          title: str.tourIssuerWalletTitle,
          description: str.tourIssuerWalletDesc,
          side: 'right',
          align: 'start'
        }
      },
      {
        element: '#tour-issuer-inputs',
        popover: {
          title: str.tourIssuerInputsTitle,
          description: str.tourIssuerInputsDesc,
          side: 'left',
          align: 'start'
        }
      }
    ];
  }

  return [];
}
