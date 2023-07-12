import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import homeImg from "../image/home-img.png";
import homeParallaxImg from "../image/home-parallax-img.png";
import cat1Img from "../image/cat-1.png";
import cat2Img from "../image/cat-2.png";
import cat3Img from "../image/cat-3.png";
import cat4Img from "../image/cat-4.png";
import cat5Img from "../image/cat-5.png";
import cat6Img from "../image/cat-6.png";
import "../styles/ui_home.css";
import { Row, Col } from 'antd';
import { BASE_URL } from "../helper"


const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"ALl Products - Best offers "}>
      {/* banner image */}
      {/* <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      /> */}
      {/* //Hero Section */}

      
      <section className="home" id="home">
        <div className="content">
          <span>welcome foodies</span>
          <h3>different spices for the different tastes 😋</h3>
          <p>
          Contactless ordering is a dine-in experience that involves no close contact with restaurant staff and 
minimal touching of shared surfaces.
          </p>
          {/* <a href="#ordernow" className="btn" style={{fontSize: "large"}}>
            order now
          </a> */}
        </div>

        <div className="image">
          <img src={homeImg} alt="" className="home-img" />
          <img src={homeParallaxImg} alt="" className="home-parallax-img" />
        </div>
      </section>
      
      {/* CATEGORY SECTION */}
      <section className="category">
      {categories?.map((c) => (
              <div className="box" >
               <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                <a>
                  {/* <img src={cat1Img} alt="" /> */}
                  <h3>{c.name}</h3>
                  
                </a>
                </Checkbox>
              </div>
              // <Checkbox
              //   key={c._id}
              //   onChange={(e) => handleFilter(e.target.checked, c._id)}
              // >
              //   {c.name}
              // </Checkbox>
            ))}
        {/* <a href="#" className="box">
          <img src={cat1Img} alt="" />
          <h3>combo</h3>
        </a>
       

        <a href="#" className="box">
          <img src={cat2Img} alt="" />
          <h3>pizza</h3>
        </a>

        <a href="#" className="box">
          <img src={cat3Img} alt="" />
          <h3>burger</h3>
        </a>

        <a href="#" className="box">
          <img src={cat4Img} alt="" />
          <h3>chicken</h3>
        </a>

        <a href="#" className="box">
          <img src={cat5Img} alt="" />
          <h3>dinner</h3>
        </a>

        <a href="#" className="box">
          <img src={cat6Img} alt="" />
          <h3>coffee</h3>
        </a> */}
      </section>
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">
            {/* Filter By Category */}
            </h4>
          <div className="d-flex flex-column">
          {/* {categories?.map((c) => (
          
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))} */}
          </div>

          {/* price filter */}
          <h4 className="text-center mt-4" id="#ordernow">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>

        </div>
      
        <div className="col-md-9 " >
          {/* <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
 <div className="row">
  {products?.map((p) => (
  <div className="card m-2 col-md-4 " key={p._id}>
    <img
      src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
      className="card-img-top"
      alt={p.name}
    />
    <div className="card-body">
      <div className="card-name-price">
        <h5 className="card-title">{p.name}</h5>
        <h5 className="card-title card-price">
          {((p.quantity || 1) * p.price).toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })}
        </h5>
      </div>
      <p className="card-text ">
        {p.description.substring(0, 60)}...
      </p>
      <div className="d-flex align-items-center">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            p.quantity = p.quantity > 1 ? p.quantity - 1 : 1;
            setProducts([...products]);
          }}
        >
          -
        </button>
        <span className="mx-2">{p.quantity || 1}</span>
        
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            p.quantity = (p.quantity || 1) + 1;
            setProducts([...products]);
          }}
        >
          +
        </button>
      </div>
      <div className="card-name-price">
        <button
          className="btn btn-info ms-1"
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          More Details
        </button>
        <button
          className="btn btn-dark ms-1"
          onClick={() => {
            const productIndex = cart.findIndex(
              (cartItem) => cartItem._id === p._id
            );

            if (productIndex !== -1) {
              cart[productIndex].quantity += p.quantity || 1;
            } else {
              p.quantity = p.quantity || 1;
              cart.push(p);
            }

            setCart([...cart]);
            localStorage.setItem("cart", JSON.stringify(cart));
            toast.success("Item Added to cart");
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  </div>
  
))}
</div>

          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
