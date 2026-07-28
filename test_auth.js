async function runAuthTest() {
  console.log("Starting Auth tests...");
  const API_URL = 'http://localhost:5000/api';
  
  // 1. Delete without token
  console.log("1. Testing unauthorized DELETE /api/products/:id...");
  const deleteRes = await fetch(`${API_URL}/products/12345`, {
    method: 'DELETE'
  });
  
  console.log("Status:", deleteRes.status);
  if (deleteRes.status === 401) {
    console.log("PASS: Unauthorized request blocked.");
  } else {
    console.log("FAIL: Expected 401, got", deleteRes.status);
  }
}

runAuthTest();
