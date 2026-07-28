import fs from 'fs';
import path from 'path';

async function runTest() {
  console.log("Starting tests...");
  const API_URL = 'http://localhost:5000/api';
  
  // 1. Upload image
  console.log("1. Uploading image...");
  const imagePath = path.resolve('./apps/storefront/public/raven_hoodie_back_1785054706044.png');
  const imageBuffer = fs.readFileSync(imagePath);
  const blob = new Blob([imageBuffer], { type: 'image/png' });
  
  const formData = new FormData();
  formData.append('image', blob, 'raven_hoodie.png');
  
  let uploadRes;
  try {
    uploadRes = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData
    });
  } catch (err) {
    console.error("Upload failed", err);
    return;
  }
  
  if (!uploadRes.ok) {
    console.error("Upload response not OK", await uploadRes.text());
    return;
  }
  
  const uploadData = await uploadRes.json();
  console.log("Uploaded Image:", uploadData);
  
  if (!uploadData.url || !uploadData.url.includes('cloudinary.com')) {
    console.error("Cloudinary URL not returned properly");
    return;
  }
  
  // 2. Create Product
  console.log("2. Creating product...");
  const productPayload = {
    name: 'Test Cloudinary Hoodie',
    price: 2000,
    category: 'Men',
    stock: 10,
    images: [uploadData]
  };
  
  const createRes = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productPayload)
  });
  
  if (!createRes.ok) {
    console.error("Product creation failed", await createRes.text());
    return;
  }
  
  const product = await createRes.json();
  console.log("Created Product ID:", product._id);
  
  // 3. Update Product / Image Replacement test
  console.log("3. Testing image replacement...");
  // Upload second image
  const imagePath2 = path.resolve('./apps/storefront/public/signature_zip_hoodie_1785054724510.png');
  const imageBuffer2 = fs.readFileSync(imagePath2);
  const blob2 = new Blob([imageBuffer2], { type: 'image/png' });
  const formData2 = new FormData();
  formData2.append('image', blob2, 'signature_hoodie.png');
  
  const uploadRes2 = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData2 });
  const uploadData2 = await uploadRes2.json();
  console.log("Uploaded Second Image:", uploadData2);
  
  // Delete old image
  const delOldRes = await fetch(`${API_URL}/upload`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicId: uploadData.publicId })
  });
  console.log("Delete old image response:", await delOldRes.json());
  
  // Update product with new image
  const updateRes = await fetch(`${API_URL}/products/${product._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ images: [uploadData2] })
  });
  const updatedProduct = await updateRes.json();
  console.log("Updated product images:", updatedProduct.images);
  
  // 4. Delete Product
  console.log("4. Deleting product...");
  const deleteRes = await fetch(`${API_URL}/products/${product._id}`, { method: 'DELETE' });
  console.log("Delete product response:", await deleteRes.json());
  
  console.log("TEST COMPLETED SUCCESFULLY");
}

runTest();
