import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CourseList from './components/CourseList';
import Gallery from './components/Gallery';
import MenuItemModal from './components/MenuItemModal';
import { api } from './services/api';
import { SiteData, MenuItem } from './types';

function App() {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await api.getData();
      setSiteData(data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      alert('Không thể tải dữ liệu. Vui lòng kiểm tra kết nối server.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateContact = async (phone: string, email: string) => {
    try {
      await api.updateContact(phone, email);
      if (siteData) {
        setSiteData({
          ...siteData,
          contact: { phone, email }
        });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật liên hệ:', error);
      alert('Không thể cập nhật thông tin liên hệ');
    }
  };

  const handleUpdateMenuItem = async (id: string, data: Partial<MenuItem>) => {
    try {
      await api.updateMenuItem(id, data);
      if (siteData) {
        const updatedMenuItems = siteData.menuItems.map(item =>
          item.id === id ? { ...item, ...data } : item
        );
        setSiteData({ ...siteData, menuItems: updatedMenuItems });
        
        // Update selected item if it's the one being edited
        if (selectedMenuItem?.id === id) {
          setSelectedMenuItem({ ...selectedMenuItem, ...data });
        }
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật menu:', error);
      alert('Không thể cập nhật menu');
    }
  };

  const handleAddCourse = async (course: any) => {
    try {
      const result = await api.createCourse(course);
      if (siteData && result.data) {
        setSiteData({
          ...siteData,
          courses: [...siteData.courses, result.data]
        });
      }
    } catch (error) {
      console.error('Lỗi khi thêm khóa học:', error);
      alert('Không thể thêm khóa học');
    }
  };

  const handleUpdateCourse = async (id: string, course: any) => {
    try {
      await api.updateCourse(id, course);
      if (siteData) {
        const updatedCourses = siteData.courses.map(c =>
          c.id === id ? { ...c, ...course } : c
        );
        setSiteData({ ...siteData, courses: updatedCourses });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật khóa học:', error);
      alert('Không thể cập nhật khóa học');
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      await api.deleteCourse(id);
      if (siteData) {
        const updatedCourses = siteData.courses.filter(c => c.id !== id);
        setSiteData({ ...siteData, courses: updatedCourses });
      }
    } catch (error) {
      console.error('Lỗi khi xóa khóa học:', error);
      alert('Không thể xóa khóa học');
    }
  };

  const handleUpdateGalleryImage = async (id: string, data: any) => {
    try {
      await api.updateGalleryImage(id, data);
      if (siteData) {
        const updatedGallery = siteData.gallery.map(img =>
          img.id === id ? { ...img, ...data } : img
        );
        setSiteData({ ...siteData, gallery: updatedGallery });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật gallery:', error);
      alert('Không thể cập nhật hình ảnh');
    }
  };

  const handleUploadVideo = async (file: File): Promise<string> => {
    try {
      return await api.uploadVideo(file);
    } catch (error) {
      console.error('Lỗi khi upload video:', error);
      throw error;
    }
  };

  const handleUploadImage = async (file: File): Promise<string> => {
    try {
      return await api.uploadImage(file);
    } catch (error) {
      console.error('Lỗi khi upload ảnh:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!siteData) {
    return (
      <div className="error-state">
        <p>Không thể tải dữ liệu. Vui lòng thử lại sau.</p>
        <button className="btn btn-primary" onClick={loadData}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        phone={siteData.contact.phone}
        email={siteData.contact.email}
        isAdmin={isAdmin}
        onUpdate={handleUpdateContact}
      />
      
      <Navigation
        menuItems={siteData.menuItems}
        onMenuClick={setSelectedMenuItem}
      />

      <main className="main-content">
        <CourseList
          courses={siteData.courses}
          isAdmin={isAdmin}
          onAdd={handleAddCourse}
          onUpdate={handleUpdateCourse}
          onDelete={handleDeleteCourse}
          onUploadVideo={handleUploadVideo}
        />

        <Gallery
          images={siteData.gallery}
          isAdmin={isAdmin}
          onUpdate={handleUpdateGalleryImage}
          onUploadImage={handleUploadImage}
        />
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Website Học Tập Cá Nhân. All rights reserved.</p>
        </div>
      </footer>

      <button
        className={`admin-toggle ${isAdmin ? 'active' : ''}`}
        onClick={() => setIsAdmin(!isAdmin)}
        title={isAdmin ? 'Tắt chế độ Admin' : 'Bật chế độ Admin'}
      >
        {isAdmin ? '🔓 Admin' : '🔒 Admin'}
      </button>

      {selectedMenuItem && (
        <MenuItemModal
          item={selectedMenuItem}
          isAdmin={isAdmin}
          onClose={() => setSelectedMenuItem(null)}
          onUpdate={handleUpdateMenuItem}
          onUploadVideo={handleUploadVideo}
        />
      )}
    </div>
  );
}

export default App;
