const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    //if category id is not found
    if(data === null) {
      return res.status(400).json(`Cannot proceed GET request`);
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category if new category name exist cancel request
  try {
    const [category, created] = await Category.findOrCreate({
      where: {category_name: req.body.category_name},
      defaults: req.body
    });
    if (!created) {
      return res.status(400).json(`Category ${req.body.category_name} already exists`);
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
  
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    //if category id is not found
    if(updateCategory === null) {
      return res.status(404).json(`Cannot proceed PUT request`);
    }
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json(error);
  }
  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const result = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    //if category id is not found
    if (!result) {
      return res.status(404).json(`Issue occurred DELETE operation`);
    }
    res.status(200).json(`DELETED Category ID: ${req.params.id}`);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;