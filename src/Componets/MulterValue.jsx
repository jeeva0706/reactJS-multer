import React, { useState, useEffect } from 'react';


const MulterValue = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  // Submit image to the server
  const onSubmitValue = async (e) => {
    e.preventDefault();

    if (!image) {
      setError('Image is required.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('http://localhost:8000/images', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Error uploading image');
      }
      setError('');
      fetchImages();
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Error uploading image');
    }
  };

  // Fetch images from the server
  const fetchImages = async () => {
    try {
      const res = await fetch('http://localhost:8000/images');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h1>Upload an Image</h1>
      <form onSubmit={onSubmitValue}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>

      <h2>Uploaded Images</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', borderRadius: '50%' }}>
        {images.map((img) => (
          <div key={img._id}>
            <img
              src={`http://localhost:8000/uploads/${img.image}`}
              alt="uploaded"
              width="200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MulterValue;