import prisma from "../db"

// Get all products related to a user
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    }
  });
  res.json({ data: user.products });
}

// Get one product by ID
export const getProductById = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    }
  });
  res.json({ data: product });
}

// Create new product
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      }
    });
    res.json({ data: product });
  } catch (e) {
    next(e);
  }
}

// Update single product
export const updateProductById = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      }
    },
    data: {
      name: req.body.name,
    }
  });
  res.json({ data: updated });
}

// Delete product by ID
export const deleteProductById = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    }
  });
  res.json({ data: deleted });
}
