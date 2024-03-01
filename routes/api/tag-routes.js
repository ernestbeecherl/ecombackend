const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({
      include: [{ model:Product }]
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data =  await Tag.findByPk(req.params.id, {
      include:  [{ model:Product }]
    });
    //if tag is not found
    if(data === null) {
      return res.status(404).json(`Cannot proceed GET request`);
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag if tag name exists cancel request 
  try {
    const [tag, created] = await Tag.findOrCreate({
      where: { tag_name: req.body.tag_name },
      defaults: req.body
    });
    if (!created) {
      return res.status(400).json(`Tag ${req.body.tag_name} already exists`);
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    //if tag is not found
    if(updateTag === null) {
      return res.status(404).json(`Cannot proceed PUT request`);
    }
    res.status(200).json(updateTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const result = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    //if id was not found
    if (!result) {
      return res.status(404).json(`Issue occurred DELETE operation`);
    }
    res.status(200).json(`DELETED Tag ID: ${req.params.id}`);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;