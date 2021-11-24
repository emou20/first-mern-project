import { useDispatch } from 'react-redux';
import clearUserId from '../actions/clearUserId';


const AutoLogout = () => {

  //let timeInactive = 900000;
  let timeInactive = 216000000;

  let delaisExpiration = Date.now() + timeInactive;
  const dispatch = useDispatch();

  window.addEventListener('mousemove', e => {
    delaisExpiration = Date.now() + timeInactive;
    localStorage.setItem("delaisExpiration", delaisExpiration);

  });

  window.addEventListener("scroll", e => {
    delaisExpiration = Date.now() + timeInactive;
    localStorage.setItem("delaisExpiration", delaisExpiration);

  });
  window.addEventListener("keydown", e => {
    delaisExpiration = Date.now() + timeInactive;
    localStorage.setItem("delaisExpiration", delaisExpiration);

  });

  setInterval(function () {
    let delaisExpirationGlobal = parseInt(localStorage.getItem('delaisExpiration'));
    if (Date.now() > delaisExpirationGlobal) {
      dispatch(clearUserId());

      window.location.href = "/login";
    }
  }, 10000);

};

export default AutoLogout;