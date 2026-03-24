import '../styles/passport.css'
import { useState } from "react";
import passportPlaceholderImg from '../assets/passport_placeholder.svg'

function setPassport(passportURL) {
  return passportURL ? (
    <img src={passportURL} alt="Passport" className="passport" />
  ) : (
    <div className="passport_placeholder">
      <img
        src={passportPlaceholderImg}
        alt="Passport Placeholder"
        className="passport"
      />
      <p className="upload_passport_text">Click to upload your passport</p>
    </div>
  );
}

export function Passport() {
  const [passportURL, setPassportURL] = useState("");

  function updatePassportURL(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPassportURL(URL.createObjectURL(file));
  }

  return (
    <section className="passport">
      <div className="passport_wrapper">
        {setPassport(passportURL)}
        <input
          type="file"
          name="passport"
          id="passport"
          onChange={updatePassportURL}
        />
      </div>
    </section>
  );
}
