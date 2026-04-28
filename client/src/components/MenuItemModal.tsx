import React, { useState, useEffect } from 'react';
import './MenuItemModal.css';
import { MenuItem } from '../types';

interface MenuItemModalProps {
  item: MenuItem | null;
  isAdmin: boolean;
  onClose: () => void;
  onUpdate?: (id: string, data: Partial<MenuItem>) => void;
  onUploadVideo?: (file: File) => Promise<string>;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  isAdmin,
  onClose,
  onUpdate,
  onUploadVideo
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editVideoUrl, setEditVideoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (item) {
      setEditTitle(item.title);
      setEditContent(item.content);
      setEditVideoUrl(item.videoUrl || '');
    }
  }, [item]);

  if (!item) return null;

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(item.id, {
        title: editTitle,
        content: editContent,
        videoUrl: editVideoUrl
      });
    }
    setIsEditing(false);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadVideo) {
      setUploading(true);
      try {
        const url = await onUploadVideo(file);
        setEditVideoUrl(url);
      } catch (error) {
        alert('Lỗi khi upload video');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {isAdmin && isEditing ? (
          <div className="modal-edit">
            <h2>Chỉnh sửa: {item.title}</h2>
            <div className="form-group">
              <label>Tiêu đề:</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Nội dung:</label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={6}
              />
            </div>
            <div className="form-group">
              <label>Video:</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                disabled={uploading}
              />
              {uploading && <p>Đang upload...</p>}
              {editVideoUrl && <p className="video-info">✓ Video đã có</p>}
            </div>
            <div className="modal-actions">
              <button className="btn btn-success" onClick={handleSave}>
                Lưu
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-view">
            <h2>{item.title}</h2>
            <div className="modal-body">
              <p>{item.content}</p>
              {item.videoUrl && (
                <div className="video-container">
                  <video controls>
                    <source src={item.videoUrl} type="video/mp4" />
                    Trình duyệt không hỗ trợ video.
                  </video>
                </div>
              )}
            </div>
            {isAdmin && (
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                Chỉnh sửa
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemModal;
