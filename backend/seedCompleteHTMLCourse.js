const mongoose = require('mongoose');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Lesson = require('./models/Lesson');
const htmlCourseData = require('./COMPLETE_HTML_COURSE_SEED');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devnest';

const seedCompleteHTMLCourse = async () => {
  try {
    console.log('\nStarting HTML course seed...');

    const existingCourse = await Course.findOne({ slug: htmlCourseData.course.slug });
    if (existingCourse) {
      await Lesson.deleteMany({ course: existingCourse._id });
      await Module.deleteMany({ course: existingCourse._id });
      await Course.deleteOne({ _id: existingCourse._id });
      console.log('Existing HTML course removed.');
    }

    const totalLessons = htmlCourseData.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);

    const course = await Course.create({
      ...htmlCourseData.course,
      totalLessons
    });

    for (const moduleData of htmlCourseData.modules) {
      const moduleDoc = await Module.create({
        course: course._id,
        title: moduleData.title,
        description: moduleData.description,
        order: moduleData.order,
        isPublished: true
      });

      const lessonsToCreate = moduleData.lessons.map((lesson) => ({
        module: moduleDoc._id,
        course: course._id,
        title: lesson.title,
        content: lesson.content,
        codeExample: lesson.codeExample,
        order: lesson.order,
        duration: lesson.duration || '20',
        isPublished: true
      }));

      await Lesson.create(lessonsToCreate);
    }

    console.log(`HTML course seeded: ${course.title} (${totalLessons} lessons)`);
  } catch (error) {
    console.error('HTML course seed failed:', error);
  } finally {
    await mongoose.connection.close();
  }
};

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('MongoDB connected for HTML course seeding.');
    await seedCompleteHTMLCourse();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
