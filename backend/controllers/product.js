import Product from "../models/Product";

export const addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product is added successfully.",
      product: savedProduct,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Product is updated successfully.",
      updatedProduct,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Product is deleted successfully.",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProducts = async (req, res) => {
  const newQuery = req.query.new;
  const categoryQuery = req.query.category;
  try {
    let products;
    if (newQuery) {
      products = await Product.find({}, { image: 1 })
        .sort({ createdAt: -1 })
        .limit(8);
    } else if (categoryQuery) {
      products = await Product.find(
        {
          category: categoryQuery,
        },
        { image: 1 }
      );
    } else {
      products = await Product.find({}, { image: 1 });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
