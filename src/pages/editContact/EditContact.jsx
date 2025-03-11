import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import { updateContact, fetchContacts } from "../../utils/api";
import GlassCard from "../../components/glassCard/GlassCard";

function EditContact() {
  const { store, dispatch } = useGlobalStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const existingContact = store.contacts.find(
    (contact) => contact.id === Number(id)
  );

  const [contact, setContact] = useState(
    existingContact || {
      full_name: "",
      email: "",
      phone_number: "",
      city: "",
      country: "",
    }
  );

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!existingContact) {
      navigate("/home");
    }
  }, [existingContact, navigate]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    if (!contact.full_name || !contact.email || !contact.phone_number) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateContact(contact.id, store.user.user_id, contact);
      const updatedContacts = await fetchContacts(store.user.user_id);
      dispatch({ type: "SET_CONTACTS", payload: updatedContacts });
      navigate("/home");
    } catch (e) {
      console.error("Error updating contact:", e);
      setError("Failed to update contact. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-light d-flex justify-content-center align-items-center mt-5">
      <GlassCard>
        <h2 className="text-center text-light">Edit Contact</h2>
        <form onSubmit={handleUpdateContact} className="text-light">
          <div className="mb-3">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              className="form-control text-light"
              value={contact.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control text-light"
              value={contact.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              className="form-control text-light"
              value={contact.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="form-control text-light"
              value={contact.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="form-control text-light"
              value={contact.country}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Contact"}
          </button>
        </form>
      </GlassCard>
    </div>
  );
}

export default EditContact;
