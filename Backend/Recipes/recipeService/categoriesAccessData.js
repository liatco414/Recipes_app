const Category = require("../Recipe/categoriesSchema");

const newCategories = async (newCategory) => {
    try {
        const category = new Category(newCategory);
        return await category.save();
    } catch (error) {
        throw new Error("Couldn't create new category " + error.message);
    }
};

const getAllCategories = async () => {
    try {
        const categories = await Category.find({});
        return categories;
    } catch (error) {
        throw new Error("Couldn;t get all categories " + error.message);
    }
};

const getCategoryById = async (categoryId) => {
    try {
        const category = await Category.findById(categoryId);
        return category;
    } catch (error) {
        throw new Error("Couldn't get category " + error.message);
    }
};

const deleteCategory = async (categoryId) => {
    try {
        const category = await Category.findByIdAndDelete(categoryId);
        return category;
    } catch (error) {
        throw new Error("Couldn't delete category " + error.message);
    }
};

const updateCategory = async (categoryId, newCategory) => {
    try {
        const category = await Category.findByIdAndUpdate(categoryId, newCategory);
        return await category.save();
    } catch (error) {
        throw new Error("Couldn't update category " + error.message);
    }
};

module.exports = { newCategories, getAllCategories, getCategoryById, deleteCategory, updateCategory };
