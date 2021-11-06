const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    const course = await Course.create(req.body);
    
    res.status(201).json({
        status: 'success', 
        message: 'Kurs olusturuldu. ',
        data: course
    });
}


exports.getAllCourses = async (req, res) => {

    const categorySlug = req.query.category;
    let filter = {};

    if(categorySlug){
        const category = await Category.findOne({slug: categorySlug});
        filter = {category: category._id}
    }

    const courses = await Course.find(filter).sort('-createdAt');
    const categories = await Category.find({});
    res.status(200).render('courses', {
        page_name : 'courses', 
        courses : courses, 
        categories : categories
    });
}


exports.getCourse = async (req, res) => {
    try{
        const course = await Course.findOne({ slug: req.params.slug});
        const categories = await Category.find({});

        res.status(200).render('course', {
            page_name : 'course', 
            course : course,
            categories : categories
        });
    }catch(error){
        res.status(400).json({
            status: 'error',
            error,
          });
    }
    
}
