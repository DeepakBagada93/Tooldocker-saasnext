'use client'; // Mark this component as a client component

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [attributes, setAttributes] = useState([{ key: '', value: '' }]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(`products/${file.name}`, file);

      if (error) {
        console.error('Error uploading image:', error.message);
      } else {
        setImage(data.path);
      }
    }
  };

  // Handle attributes input
  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][field] = value;
    setAttributes(updatedAttributes);
  };

  const addAttributeField = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare attributes as a JSON object
    const attributesObject = attributes.reduce((acc, attr) => {
      if (attr.key && attr.value) {
        acc[attr.key] = attr.value;
      }
      return acc;
    }, {});

    // Insert product data into the `sn_products` table
    const { data, error } = await supabase
      .from('sn_products')
      .insert([
        {
          name,
          description,
          price: parseFloat(price),
          sku,
          stock_quantity: parseInt(stockQuantity),
          categories: categories.split(',').map((cat) => cat.trim()),
          tags: tags.split(',').map((tag) => tag.trim()),
          attributes: attributesObject,
          image_url: image ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${image}` : null,
        },
      ])
      .select();

    if (error) {
      console.error('Error adding product:', error.message);
    } else {
      console.log('Product added successfully:', data);
      router.push('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Add Product</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-4xl">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              id="stockQuantity"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
              Categories (comma-separated)
            </label>
            <input
              type="text"
              id="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="attributes" className="block text-sm font-medium text-gray-700">
              Attributes
            </label>
            {attributes.map((attr, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <input
                  type="text"
                  placeholder="Attribute Key"
                  value={attr.key}
                  onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Attribute Value"
                  value={attr.value}
                  onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addAttributeField}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Attribute
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageUpload}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}