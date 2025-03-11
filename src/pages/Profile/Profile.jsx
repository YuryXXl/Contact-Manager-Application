import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import GlassCard from "../../components/glassCard/GlassCard";

import photo1 from "../../assets/images/img.1.jpeg";
import photo2 from "../../assets/images/img.2.jpeg";
import photo3 from "../../assets/images/img.3.jpeg";
import photo4 from "../../assets/images/img.4.jpeg";

const contactImages = [photo1, photo2, photo3, photo4];

function Profile() {
  const { store } = useGlobalStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const foundContact = store.contacts.find((c) => c.id.toString() === id);
    if (foundContact) {
      setContact(foundContact);
    } else {
      navigate("/home");
    }
  }, [id, store.contacts, navigate]);

  if (!contact) {
    return <p className="text-light text-center">Loading...</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <GlassCard>
        <h2 className="text-center text-light">{contact.full_name}</h2>
        <div className="text-center">
          <img
            className="profile-image"
            src={
              contact.base64_image ||
              contactImages[contact.id % contactImages.length]
            }
            alt="Profile"
          />
        </div>
        <div className="text-light mt-3">
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Phone:</strong> {contact.phone_number}
          </p>
          <p>
            <strong>City:</strong> {contact.city}
          </p>
          <p>
            <strong>Country:</strong> {contact.country}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/home")}>
          Back to Contacts
        </button>
      </GlassCard>
    </div>
  );
}

export default Profile;
