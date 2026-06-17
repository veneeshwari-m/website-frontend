import React, { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import './AddProduct.css';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:2000/graphql';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      mrp
      discountPercentage
      images
      brand
      productCategoriesID
      variants {
        color
        size
        stock
      }
      createdAt
      updatedAt
    }
  }
`;

const GET_ALL_PRODUCT_CATEGORIES = gql`
  query GetAllProductCategories($search: String) {
    getAllProductCategories(search: $search) {
      id
      name
    }
  }
`;

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    mrp: '',
    discountPercentage: '',
    images: '',
    brand: '',
    productCategoriesID: ''
  });

  const [variants, setVariants] = useState([
    { color: '', size: '', stock: '' }
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const client = new GraphQLClient(GRAPHQL_ENDPOINT);
        const data = await client.request(GET_ALL_PRODUCT_CATEGORIES, { search: "" });
        if (data && data.getAllProductCategories) {
          setCategories(data.getAllProductCategories);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { color: '', size: '', stock: '' }]);
  };

  const removeVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const client = new GraphQLClient(GRAPHQL_ENDPOINT);
      // Format the input
      const input = {
        name: formData.name,
        price: parseFloat(formData.price) || 0,
        mrp: parseFloat(formData.mrp) || 0,
        discountPercentage: parseFloat(formData.discountPercentage) || 0,
        images: formData.images, // Passed directly as a string
        brand: formData.brand,
        productCategoriesID: formData.productCategoriesID, // Passed directly as a string
        variants: variants.map(v => ({
          color: v.color,
          size: v.size,
          stock: parseInt(v.stock) || 0
        }))
      };

      await client.request(CREATE_PRODUCT_MUTATION, { input });
      setSuccess(true);
      
      // Reset form on success
      setFormData({
        name: '', price: '', mrp: '', discountPercentage: '', images: '', brand: '', productCategoriesID: ''
      });
      setVariants([{ color: '', size: '', stock: '' }]);
      
    } catch (err) {
      console.error(err);
      setError('Failed to add product. Please check the inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h3>Add New Product</h3>
      {success && <div className="success-msg">Product added successfully!</div>}
      {error && <div className="error-msg">{error}</div>}
      
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>MRP</label>
            <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Discount %</label>
            <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Brand</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="productCategoriesID" value={formData.productCategoriesID} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Images (comma separated URLs)</label>
          <textarea name="images" value={formData.images} onChange={handleChange} rows="3" placeholder="http://image1.jpg, http://image2.jpg" required />
        </div>

        <div className="variants-section">
          <h4>Product Variants</h4>
          {variants.map((variant, index) => (
            <div key={index} className="variant-row">
              <input type="text" placeholder="Color" value={variant.color} onChange={(e) => handleVariantChange(index, 'color', e.target.value)} required />
              <input type="text" placeholder="Size" value={variant.size} onChange={(e) => handleVariantChange(index, 'size', e.target.value)} required />
              <input type="number" placeholder="Stock" value={variant.stock} onChange={(e) => handleVariantChange(index, 'stock', e.target.value)} required />
              {variants.length > 1 && (
                <button type="button" onClick={() => removeVariant(index)} className="remove-btn">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addVariant} className="add-btn">Add Variant</button>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
