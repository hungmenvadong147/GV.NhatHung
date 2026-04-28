import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  phone: string;
  email: string;
  isAdmin: boolean;
  onUpdate?: (phone: string, email: string) => void;
}

const Header: React.FC<HeaderProps> = ({ phone, email, isAdmin, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editPhone, setEditPhone] = useState(phone);
  const [editEmail, setEditEmail] = useState(email);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editPhone, editEmail);
    }
    setIsEditing(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {isAdmin && isEditing ? (
            <div className="header-edit">
              <div className="edit-group">
                <label>Số điện thoại:</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                />
              </div>
              <div className="edit-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
              <div className="edit-actions">
                <button className="btn btn-success" onClick={handleSave}>
                  Lưu
                </button>
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <div className="header-info">
              <div className="contact-item">
                <span className="icon">📞</span>
                <span>{phone}</span>
              </div>
              <div className="contact-item">
                <span className="icon">✉️</span>
                <span>{email}</span>
              </div>
              {isAdmin && (
                <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                  Chỉnh sửa
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
