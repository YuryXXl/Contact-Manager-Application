import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../glassCard/GlassCard";
import "./ContactCard.css";
import {
  BsFillBookmarkCheckFill,
  BsFillBookmarkDashFill,
} from "react-icons/bs";
import { FcEditImage, FcRemoveImage } from "react-icons/fc";
import { IoMdContact } from "react-icons/io";
import {
  addToFavorites,
  fetchContacts,
  deleteFromFavorites,
  deleteContact,
} from "../../utils/api";
import { useGlobalStore } from "../../hooks/useGlobalStore";

import photo1 from "../../assets/images/img.1.jpeg";
import photo2 from "../../assets/images/img.2.jpeg";
import photo3 from "../../assets/images/img.3.jpeg";
import photo4 from "../../assets/images/img.4.jpeg";

const contactImages = [photo1, photo2, photo3, photo4];

function ContactCard({
  base64_image,
  city,
  country,
  email,
  full_name,
  id,
  is_favorite,
  phone_number,
}) {
  const { store, dispatch } = useGlobalStore();
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(is_favorite);

  const handleDelete = async () => {
    if (
      !window.confirm(`Are you sure you want to delete contact: ${full_name}?`)
    )
      return;

    try {
      await deleteContact(id, store.user.user_id);
      const updatedContacts = await fetchContacts(store.user.user_id);
      dispatch({ type: "SET_CONTACTS", payload: updatedContacts });
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleFavorite = async () => {
    setIsFav((prev) => !prev);

    try {
      if (isFav) {
        await deleteFromFavorites(store.user.user_id, id);
      } else {
        await addToFavorites(store.user.user_id, id);
      }

      const updatedContacts = await fetchContacts(store.user.user_id);
      dispatch({ type: "SET_CONTACTS", payload: updatedContacts });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-contact/${id}`, {
      state: {
        id,
        full_name,
        email,
        phone_number,
        city,
        country,
        base64_image,
      },
    });
  };

  const handleProfile = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <GlassCard type="glass-contact-card">
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-start align-items-center">
          <button
            onClick={handleFavorite}
            className="btn border border-0 m-0 p-0"
          >
            {isFav ? (
              <BsFillBookmarkCheckFill className="fs-5 text-primary opacity-75" />
            ) : (
              <BsFillBookmarkDashFill className="fs-5 text-light opacity-25" />
            )}
          </button>
          <div className="image-container">
            <img
              className="profile-image ms-4"
              src={base64_image || contactImages[id % contactImages.length]}
              alt="Profile"
            />
          </div>
          <div className="text-light ms-5">
            <div
              className="fs-6 fw-bold cust-border text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleProfile}
            >
              {full_name}
            </div>
            <div className="card-info-secondary">{phone_number}</div>
            <div className="card-info-secondary">{email}</div>
            <div className="card-info-secondary">
              {city}, {country}
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <button
            className="btn border border-0 btn-sm m-0 p-0"
            onClick={handleEdit}
          >
            <FcEditImage className="fs-3" />
          </button>
          <button
            className="btn border border-0 btn-sm m-0 p-0"
            onClick={handleDelete}
          >
            <FcRemoveImage className="fs-3 text-danger" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

export default ContactCard;
