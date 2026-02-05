import { useProduct } from "@/hooks/useProduct";
import { useState } from "react";

export default function AddProduct({
  selectedItem,
  mode = "create",
  setOpen,
  fetchProduct,
}) {
  const [formData, setFormData] = useState({
    picture: selectedItem?.picture || "",
    productName: selectedItem?.name || "",
    unitPrice: selectedItem?.unitprice || "",
    typeProduct: selectedItem?.productcat || "",
  });

  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const { createProduct, editProduct } = useProduct();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitProduct = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("productName", formData.productName);
    data.append("unitPrice", formData.unitPrice);
    data.append("typeProduct", formData.typeProduct);
    data.append("picture", formData.picture);

    if (imageFile) {
      data.append("image", imageFile);
    }

    if (mode === "create") {
      await createProduct(data);
    } else {
      await editProduct(selectedItem?.productid, data);
    }

    console.log("fetchproduct");
    await fetchProduct();
    setOpen(false);
  };

  return (
    <form className='space-y-4' onSubmit={submitProduct}>
      {/* Type Option */}
      <div className='flex flex-col gap-1 p-1'>
        <label htmlFor='type' className='font-medium'>
          Type
        </label>
        <select
          id='type'
          name='typeProduct'
          onChange={handleInputChange}
          className='rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
          value={formData?.typeProduct}
          required>
          <option value=''>Select type</option>
          <option value='Product'>Product</option>
          <option value='Service'>Service</option>
        </select>
      </div>

      {/* Product / Service Name */}
      <div className='flex flex-col gap-1 p-1'>
        <label htmlFor='name' className='font-medium'>
          Name
        </label>
        <input
          id='name'
          name='productName'
          value={formData?.productName}
          type='text'
          onChange={handleInputChange}
          placeholder='Enter name'
          className='rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
          required
        />
      </div>

      {/* Unit Price */}
      <div className='flex flex-col gap-1 p-1'>
        <label htmlFor='price' className='font-medium'>
          Unit Price
        </label>
        <input
          id='price'
          name='unitPrice'
          value={formData?.unitPrice}
          type='number'
          onChange={handleInputChange}
          placeholder='Enter price'
          className='rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
          required
        />
      </div>
      <div className='flex flex-col gap-2 p-1'>
        <label className='font-medium'>Image</label>

        <div className='relative flex items-center justify-center rounded-lg border-2 border-dashed border-purple-400 bg-purple-50 p-4 hover:bg-purple-100 transition cursor-pointer'>
          <input
            type='file'
            name='image'
            accept='image/*'
            onChange={handleFileChange}
            className='absolute inset-0 opacity-0 cursor-pointer'
          />

          {preview ? (
            <img
              src={preview}
              alt='Preview'
              className='h-32 object-contain rounded'
            />
          ) : (
            <div className='flex flex-col items-center text-purple-600'>
              <p className='text-sm font-medium'>Click to upload image</p>
              <span className='text-xs text-gray-500'>PNG, JPG up to 2MB</span>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        className='w-full rounded-lg bg-purple-600 py-2 font-semibold text-white hover:bg-purple-700 transition'>
        Save
      </button>
    </form>
  );
}
