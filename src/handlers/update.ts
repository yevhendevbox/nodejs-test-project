import prisma from "../db";

// Get all updates from the DB
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    }
  });
  // Avoid this things in the future, it means you have bad relation schema
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);
  res.json({ data: updates });
}

// Get update by ID
export const getUpdateById = async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    }
  });
  res.json({ data: update });
}

// Create new update
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    }
  });
  if (!product) {
    res.status(401);
    res.json({ message: "Product does not exist" });
    return;
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    }
  });
  res.json({ data: update });
}

// Update existed update
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    }
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find(update => update.id === req.params.id);

  if (!match) {
    res.status(400);
    return res.json({ message: "theres no updates matched this request" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
}

// Delete update
export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    }
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find(update => update.id === req.params.id);

  if (!match) {
    res.status(400);
    return res.json({ message: "theres no updates matched this request" });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    }
  });

  res.json({ data: deleted });
}
