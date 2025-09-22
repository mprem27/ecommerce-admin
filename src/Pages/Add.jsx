import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { images } from '../assets/Assets';
import axios from 'axios'
import { BackendURL } from '../App';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(false);
  const [image6, setImage6] = useState(false);


  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [bestSeller, setBestSeller] = useState(false);
  const [todaysdeal, setTodaysdeal] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestSeller);
      formData.append("todaysdeal", todaysdeal);

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
      if (image5) formData.append("image5", image5);
      if (image6) formData.append("image6", image6);

      // console.log(formData)
      // console.log("sending token:",token)

      const response = await axios.post(BackendURL + "/api/Product/add", formData, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSubCategory("");
        setSizes([]);
        setBestSeller(false);
        setTodaysdeal(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setImage5(false);
        setImage6(false);
      }
      else {
        toast.error("Error: " + response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form className='flex flex-col items-start gap-3 w-[80%]' onSubmit={(e) => onSubmitHandler(e)}>
      <div>
        <p className='mb-2'>Upload Images</p>
        <div className='flex flex-wrap gap-5 mb-2'>
          {/* image1 */}
          <label htmlFor="image1">
            <img src={!image1 ? images.Upload : URL.createObjectURL(image1)} alt="upload image1" className={`w-[200px] h-[200px] object-contain  ${image1 ? "bg-gray-200 border-2 border-dotted border-gray-300" : ""}`} />
            <input type="file" id='image1' hidden onChange={(e) => { setImage1(e.target.files[0]) }} />
          </label>
          {/* image2 */}
          <label htmlFor="image2">
            <img src={!image2 ? images.Upload : URL.createObjectURL(image2)} alt="upload image2" className={`w-[200px] h-[200px] object-contain  ${image2 ? "bg-gray-200 border-2 border-dotted border-gray-300" : ""}`} />
            <input type="file" id='image2' hidden onChange={(e) => { setImage2(e.target.files[0]) }} />
          </label>
          {/* image3 */}
          <label htmlFor="image3">
            <img src={!image3 ? images.Upload : URL.createObjectURL(image3)} alt="upload image3" className={`w-[200px] h-[200px] object-contain  ${image3 ? "bg-gray-200 border-2 border-dotted border-gray-300" : ""}`} />
            <input type="file" id='image3' hidden onChange={(e) => { setImage3(e.target.files[0]) }} />
          </label>
          {/* image4 */}
          <label htmlFor="image4">
            <img src={!image4 ? images.Upload : URL.createObjectURL(image4)} alt="upload image4" className={`w-[200px] h-[200px] object-contain  ${image4 ? "bg-gray-200 border-2 border-dotted border-gray-300" : ""}`} />
            <input type="file" id='image4' hidden onChange={(e) => { setImage4(e.target.files[0]) }} />
          </label>
          {/* image5 */}
          <label htmlFor="image5">
            <img src={!image5 ? images.Upload : URL.createObjectURL(image5)} alt="upload image5" className={`w-[200px] h-[200px] object-contain  ${image5 ? "bg-gray-200 border-2 border-dotted border-gray-300" : ""}`} />
            <input type="file" id='image5' hidden onChange={(e) => { setImage5(e.target.files[0]) }} />
          </label>
          {/* image6 */}
          <label htmlFor="image6">
            <img src={!image6 ? images.Upload : URL.createObjectURL(image6)} alt="upload image6" className={`w-[200px] h-[200px] object-contain  ${image6 ? "bg-gray-200 border-2 border-dotted border-gray-300" : ""}`} />
            <input type="file" id='image6' hidden onChange={(e) => { setImage6(e.target.files[0]) }} />
          </label>
        </div>
        <div className='w-full '>
          <p className='mb-2'>Product Name</p>
          <input type="text" onChange={(e) => setName(e.target.value)} className='w-full max-w-[500px] px-3 py-2 border border-gray-400 rounded-lg bg-blue-100 outline-0  focus:border-2 focus:border-[#1e1c2ae5]' value={name} placeholder='Enter Product Name' />
        </div>

        <div className='w-full mt-3'>
          <p className='mb-2'>Product Description</p>
          <textarea type="text" onChange={(e) => setDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2 border border-gray-400 rounded-lg bg-blue-100 outline-0  focus:border-2 focus:border-[#1e1c2ae5]' value={description} placeholder='Enter Product Name' />
        </div>
        <div className='flex flex-col  mt-3 sm:flex-row gap-2 sm:gap-6 w-full'>
          <div>
            <p className='mb-2'>Product Category</p>
            <select onChange={(e) => setCategory(e.target.value)} className='w-full max-w-[500px] px-3 py-2 border border-gray-400 rounded-lg bg-blue-100 outline-0  focus:border-2 focus:border-[#1e1c2ae5]' value={category}>
              <option value="">Select Product Category</option>
              <option value="Men">Men</option>
              <option value="Women">Woman</option>
              <option value="Kids">Kids</option>
              <option value="Electronics">Electronics</option>
              <option value="Beauty">Beauty</option>
              <option value="Home">Home</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Product SubCategory</p>
            <select onChange={(e) => setSubCategory(e.target.value)} className='w-full max-w-[500px] px-3 py-2 border border-gray-400 rounded-lg bg-blue-100 outline-0  focus:border-2 focus:border-[#1e1c2ae5]' value={subCategory}>
              <option className='hover:bg-blue-300' value="">Select Product SubCategory</option>
              <option value="TopWear">Top Wear</option>
              <option value="BottomWear">Bottom Wear</option>
              <option value="WinterWear">Winter Wear</option>
              <option value="EthnicWear">EthnicWear</option>
              <option value="Accessories">Accessories</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Footwear">Footwear</option>
              <option value="Dresses">Dresses</option>
              <option value="Ethnic">Ethnic</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Laptops">Laptops</option>
              <option value="Audio">Audio</option>
              <option value="Wearables">Wearables</option>
              <option value="TV">TV</option>
              <option value="Headphones">Headphones</option>
              <option value="Cameras">Cameras</option>
              <option value="SmartHome">SmartHome</option>
              <option value="Networking">Networking</option>
              <option value="Storage">Storage</option>
              <option value="Tablet">Tablet</option>
            </select>
          </div>
        </div>

        <div className='w-full  mt-3'>
          <p className='mb-2'>Product Price</p>
          <input type="number" onChange={(e) => setPrice(e.target.value)} className='w-full max-w-[250px] px-3 py-2 border border-gray-400 rounded-lg bg-blue-100 outline-0  focus:border-2 focus:border-[#1e1c2ae5]' value={price} placeholder='Enter Product Price' />
        </div>

        <div className=' mt-3'>
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-2'>
            {/* size S */}
            <div onClick={(e) => setSizes(prev => prev.includes('S') ? prev.filter(item => (item !== "S")) : [...prev, "S"])}>
              <p className={`${sizes.includes('S') ? "bg-blue-400" : "bg-slate-300"} px-3 py-1 rounded cursor-pointer`}>S</p>
            </div>
            {/* Size M */}
            <div onClick={(e) => setSizes(prev => prev.includes('M') ? prev.filter(item => (item !== "M")) : [...prev, "M"])}>
              <p className={`${sizes.includes('M') ? "bg-blue-400" : "bg-slate-300"} px-3 py-1 rounded cursor-pointer`}>M</p>
            </div>

            {/* Size L */}
            <div onClick={(e) => setSizes(prev => prev.includes('L') ? prev.filter(item => (item !== "L")) : [...prev, "L"])}>
              <p className={`${sizes.includes('L') ? "bg-blue-400" : "bg-slate-300"} px-3 py-1 rounded cursor-pointer`}>L</p>
            </div>

            {/* Sizes XL */}
            <div onClick={(e) => setSizes(prev => prev.includes('XL') ? prev.filter(item => (item !== "XL")) : [...prev, "XL"])}>
              <p className={`${sizes.includes('XL') ? "bg-blue-400" : "bg-slate-300"} px-3 py-1 rounded cursor-pointer`}>XL</p>
            </div>

            {/* Sizes XXL */}
            <div onClick={(e) => setSizes(prev => prev.includes('XXL') ? prev.filter(item => (item !== "XXL")) : [...prev, "XXL"])}>
              <p className={`${sizes.includes('XXL') ? "bg-blue-400" : "bg-slate-300"} px-3 py-1 rounded cursor-pointer`}>XXL</p>
            </div>
          </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input type="checkbox" id="bestSeller" onChange={(e) => setBestSeller(prev => !prev)} checked={bestSeller} />
          <label htmlFor="bestSeller">Add to Best Seller</label>
        </div>


        <div className='flex gap-2 mt-2'>
          <input type="checkbox" id="todaysdeal" onChange={(e) => setTodaysdeal(prev => !prev)} checked={todaysdeal} />
          <label htmlFor="bestSeller">Add to Today's Deal</label>
        </div>

        <button type='submit' className='cursor-pointer w-30  py-3 mt-4 mb-10 rounded-xl bg-[#292639] text-white '>Add Item</button>
      </div>
    </form >
  )
}

export default Add